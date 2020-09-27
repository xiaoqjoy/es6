import { spareApi } from '@system/spare/js/server.js';
import MyFetch from "@common/js/myFetch.js";
import { getLS, setLS, getAllLSDicts } from "@common/js/util.js";

const dictCache = new Map(); // 解决重复调用同一接口同一参数(这个问题会导致重复的接口直接被取消，所以设置全局变量)
window.dictCache = dictCache;
window.dictCacheKeyList = getAllLSDicts();
window.cacheTimer = window.setInterval(() => {
  window.dictCacheKeyList.splice(0);
}, 1 * 60 * 60 * 1000); // 每隔1小时刷新一次字典的缓存

export default {
  namespaced: true,
  state() {
    return {
      dicts: {},
      categoryCodeList: ['repayment_mode_code', 'customer_tax_cd', 'personal_type_cd', 'certificate_type',
                         'certificate_type_code', 'position_type_cd', 'organization_type_cd', 'registered_area_cd',
                         'education_level_cd', 'car_loan_status_code', 'non_family_relationship_code', 'family_relationship_code',
                         'report_source_code', 'business_type_code', 'career_code', 'loan_purpose_type', 'repayment_cycle_code']
    };
  },
  getters: {},
  mutations: {},
  actions: {
    async getBaseConfig({dispatch}, { categoryCode }) {
      const dictAlias = 'dict|' + categoryCode;
      let dict = getLS(dictAlias);
      if (dict && dict.length && window.dictCacheKeyList.find(item => item === dictAlias)) {
        return dict;
      }
      // 以下是解决重复调用接口问题
      let cachePromise = dictCache.get(categoryCode);
      if (!cachePromise) {
        let params = { categoryCode };
        cachePromise = dispatch('fetchBaseConfig', params);
        dictCache.set(categoryCode, cachePromise);
      }
      let result = await cachePromise;
      setLS(dictAlias, result);
      window.dictCacheKeyList.push(dictAlias);
      dictCache.delete(categoryCode);
      return result;
    },
    async fetchBaseConfig({ state }, { categoryCode }) {
      try {
        const data = await MyFetch.get(spareApi.commonSelect, { categoryCode });
        return data;
      } catch (e) {
        console.log('获取字典列表出错: ' + e);
      }
      return [];
    },
    async getMutipleBaseConfig({ dispatch }, { categoryCodeList = [], getAll = false }) {
      let finalRequestCodeList = [];
      categoryCodeList.forEach(code => {
        if (!window.dictCacheKeyList.find(item => item === `dict|${code}`)) {
          finalRequestCodeList.push(code);
        }
      });
      if (!finalRequestCodeList.length) {
        return [];
      }
      const data = await dispatch('fetchMutipleBaseConfig', { categoryCodeList, getAll });
      if (data && Object.keys(data).length) {
        categoryCodeList.forEach(item => {
          if (data[item]) {
            const dictAlias = 'dict|' + item;
            setLS(dictAlias, data[item]);
            window.dictCacheKeyList.push(item);
          }
        });
      }
    },
    async fetchMutipleBaseConfig({ state }, { categoryCodeList = [], getAll = false }) {
      try {
        const data = await MyFetch.get(spareApi.multipleSelect, { categoryCodes: categoryCodeList, getAll });
        return data;
      } catch (e) {
        console.log('获取多个字典列表出错: ' + e);
      }
      return {};
    }
  }
};
