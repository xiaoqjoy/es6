import { accountApi } from '@system/account/js/server';
import MyFetch from "@common/js/myFetch.js";

export default {
  namespaced: true,
  state() {
    return {};
  },
  mutations: {
  },
  actions: {
    async fetchCollaborateList({ state }, collaborateCode) {
      try {
        const result = await MyFetch.get(accountApi.expenditure_manage.collaborate + collaborateCode);
        return result;
      } catch (e) {
        console.log('获取合作机构列表信息出错: ' + e);
      }
    },
    async sendPutoutOrderApprove({ state }, accountList) {
      const url = accountApi.expenditure_manage.sendPutoutOrderApprove;
      try {
        const result = await MyFetch.post(url, accountList);
        return result;
      } catch (e) {
        console.log('发送放款指令出错: ' + e);
      }
      return [];
    },
    async fetchSendStatus({ state }) {
      const url = accountApi.expenditure_manage.getCollaborateSendStatus;
      let errorMsg = '';
      try {
        const result = await MyFetch.get(url);
        return { result, success: true };
      } catch (e) {
        console.log('获取发送状态出错: ' + e);
        errorMsg = e.message;
      }
      return { success: false, errorMsg };
    },
    async fetchCollaborateCompanyList({ state }, collaborateCode) {
      const url = accountApi.expenditure_manage.collaborate;
      let errorMsg = '';
      try {
        const result = await MyFetch.get(url + collaborateCode);
        return { result, success: true };
      } catch (e) {
        console.log('获取发送状态出错: ' + e);
        errorMsg = e.message;
      }
      return { success: false, errorMsg };
    }
  }
};
