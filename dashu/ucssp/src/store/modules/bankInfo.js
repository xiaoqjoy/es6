import { spareApi } from '@system/spare/js/server.js';
import MyFetch from "@common/js/myFetch.js";

let receiveBankInfoModel = {
  accountName: '',
  accountNum: '',
  bankCode: '',
  mobileNum: '',
  paymentModeCode: '',
  productId: '',
  subbankCode: '',
  subbankName: '',
  bankName: '',
  repaymentAccountName: '',
  repaymentAccountNum: '',
  repaymentBankCode: '',
  repaymentBankName: '',
  repaymentSubbankCode: '',
  repaymentMobileNum: '',
  repaymentSubbankName: '',
  showPayAccountInd: false,
  repaymentCardInd: false
};

export default {
  namespaced: true,
  state() {
    return {
      receiveBankInfo: { ...receiveBankInfoModel }
    };
  },
  mutations: {
    SET_RECEIVE_BANK_INFO(state, receiveBankInfo) {
      state.receiveBankInfo = { ...state.receiveBankInfo, ...receiveBankInfo };
    }
  },
  actions: {
    async fetchQueryBankCardList({ state }, { applicationId }) {
      try {
        const { cardInfoList = [], aplMobileNum } = await MyFetch.post(spareApi.solving.bankInfo.query + applicationId);
        return { cardInfoList, aplMobileNum };
      } catch (e) {
        console.log('获取银行卡列表信息出错: ' + e);
      }
      return [];
    },
    async fetchSelectDictList({ state }, { categoryCode }) {
      console.log('开始获取下拉列表字典列表');
      try {
        const data = await MyFetch.get(spareApi.commonSelect, { categoryCode });
        return data;
      } catch (e) {
        console.log('获取下拉列表字典列表出错: ' + e);
      }
      return [];
    },
    async fetchQueryBankInfo({ state }, { bankName, cityName, pageNum, pageSize }) {
      try {
        const result = await MyFetch.post(spareApi.solving.bankInfo.list, { bankName, cityName, pageNum, pageSize });
        return { list: result.list, total: result.total, pageNum: result.pageNum };
      } catch (e) {
        console.log('查询银行信息出错: ' + e);
      }
      return [];
    },
    async fetchSubmitTask({ state }, data) {
      try {
        const result = await MyFetch.post(spareApi.solving.lastSubmit, data);
        return { success: true, ...result };
      } catch (e) {
        console.log('获取银行信息列表信息出错: ' + e);
        return { success: false, errorMsg: e.message };
      }
    },
    async fetchCheckBankInfo({ state }, bankInfo) {
      let errorMsg = '';
      try {
        await MyFetch.post(spareApi.solving.bankInfo.check, bankInfo);
        return { success: true };
      } catch (e) {
        console.log('检查银行信息接口出错: ' + e);
        errorMsg = e.message;
      }
      return { success: false, errorMsg };
    },
    async saveBankInfo({ state }, bankInfo) {
      try {
        const result = await MyFetch.post(spareApi.solving.bankInfo.save, bankInfo);
        console.log(result, '保存');
        return { success: true };
      } catch (e) {
        console.log('保存银行信息接口出错: ' + e);
        return { success: false, errorMsg: (e + '') };
      }
    }
  }
};
