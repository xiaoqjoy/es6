import {surveyApi} from '@/system/survey/js/server.js';
import MyFetch from '@/common/js/myFetch.js';

const survey = {
  state: {
    surveyId: localStorage.getItem('surveyId') || '',
    applicationId: localStorage.getItem('applicationId') || '',
    fieldConfig: JSON.parse(localStorage.getItem('fieldConfig')) || {},
    surveySource: localStorage.getItem('surveySource') || ''
  },
  mutations: {
    set_surveySource(state, msg) {
      localStorage.setItem('surveySource', msg);
      state.surveySource = msg;
    },
    set_surveyId(state, msg) {
      localStorage.setItem('surveyId', msg);
      state.surveyId = msg;
    },
    set_applicationId(state, msg) {
      localStorage.setItem('applicationId', msg);
      state.applicationId = msg;
    },
    set_surveyFieldConfig(state, msg) {
      let notBeforeSurveyReject = {
        itemCode: "0",
        itemDesc: "请选择",
        sortNum: "0"
      };
      // 设置调查前否决状态可改
      msg.before_survey_reject.children.unshift(notBeforeSurveyReject);
      localStorage.setItem('fieldConfig', JSON.stringify(msg));
      state.fieldConfig = msg;
    },
    set_industrysConfig(state, msg) {
      state.fieldConfig.industrysConfig = msg;
      localStorage.setItem('fieldConfig', JSON.stringify(state.fieldConfig));
    },
    set_secondIndustrysConfig(state, msg) {
      state.fieldConfig.secondIndustrysConfig = msg;
      localStorage.setItem('fieldConfig', JSON.stringify(state.fieldConfig));
    },
    set_businessArea(state, msg) {
      state.fieldConfig.businessArea = msg;
      localStorage.setItem('fieldConfig', JSON.stringify(state.fieldConfig));
    }
  },
  actions: {
    // 设置surveyId
    setSurveyId({
      commit
    }, surveyId) {
      localStorage.setItem('surveyId', surveyId);
      commit('set_surveyId', surveyId);
    },
    // 设置applicationId
    setApplicationId({
      commit
    }, surveyId) {
      localStorage.setItem('applicationId', surveyId);
      commit('set_applicationId', surveyId);
    },
    // 获取标准字段配置
    getSurveyFieldConfig({
      dispatch,
      commit
    }) {
      return new Promise((resolve, reject) => {
        MyFetch.post(surveyApi.surveyFieldConfig).then(data => {
          commit('set_surveyFieldConfig', data);
          return dispatch('getIndustrysConfig');
        }).then(industrys => {
          return dispatch('getBussinessArea');
        }).then(area => {
          resolve(area);
        }).catch(err => {
          reject(err);
        });
      });
    },
    // 获取一级行业列表
    getIndustrysConfig({
      commit
    }) {
      let searchInfo = {
        pageNum: 1,
        pageSize: 500
      };
      return new Promise((resolve, reject) => {
        MyFetch.post(surveyApi.industrysConfig, searchInfo).then((data = {}) => {
          commit('set_industrysConfig', data.list);
          resolve(data);
          }).catch((err) => {
            reject(err);
          });
      });
    },
    // 获取二级行业列表
    getSecIndustrysConfig({
      commit
    }, parentCode) {
      let searchInfo = {
        pageNum: 1,
        pageSize: 500,
        parentCode: parentCode
      };
      return new Promise((resolve, reject) => {
        MyFetch.post(surveyApi.industrysConfig, searchInfo).then((data = {}) => {
          commit('set_secondIndustrysConfig', data.list);
          resolve(data);
          }).catch((err) => {
            reject(err);
          });
      });
    },
    // 获取商圈列表
    getBussinessArea({
      commit
    }) {
      let searchInfo = {
        pageNum: 1,
        pageSize: 500
      };
      return new Promise((resolve, reject) => {
        MyFetch.post(surveyApi.surveyAreas, searchInfo).then((data = {}) => {
          commit('set_businessArea', data.list);
          resolve(data);
          }).catch((err) => {
            reject(err);
          });
      });
    }
  }
};

export default survey;
