import { fileCos } from '../../../common/js/fileCos.js';
let host = 'api/cpms';

if (process.env.NODE_ENV !== 'production') {
  host = fileCos.getHost()[0] + '/cpms';
  // host = "http://DS-TS-0493:8080";
  // host = "sit3/api/cpms";
  // host = "uat/api/cpms";
}

const businessApi = {
  getInfo: host + "/business/deal-progress/list",
  getRecord: host + "/business/record/list",
  getApproval: host + "/business/flow-opinion/info",
  getProduct: host + "/business/primary-product/list",
  getStage: host + "/business/task-def-key/list",
  getSubcompany: host + "/business/subcompany/list",
  isPrepare: host + "/business/determine/prepare",
  giveUpList: host + "/business/cus-product/give-up/list", // 客户放弃列表
  giveUp: host + "/business/cus-product/give-up" // 客户放弃

};

export {
  businessApi
};
