let host = 'api/cpms';

if (process.env.NODE_ENV !== 'production') {
  // host = "http://yapi.dashuf.com/mock/30";
  // host = "http://dsapp57.intsit.dsfdc.com:8080/h5/api/cpms";
  // host = "uat/api/cpms";
}

const businessApi = {
  getInfo: host + "/business/deal-progress/list",
  getRecord: host + "/business/record/list",
  getApproval: host + "/business/flow-opinion/info",
  getProduct: host + "/business/primary-product/list",
  getStage: host + "/business/task-def-key/list",
  getSubcompany: host + "/business/subcompany/list",
  isPrepare: host + "/business/determine/prepare"
};

export {
  businessApi
};
