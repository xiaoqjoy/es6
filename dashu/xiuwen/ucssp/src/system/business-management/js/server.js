let xx = "api/cpms";
// let xx = 'http://10.3.114.195:8080'; //  本地地址
// let host2 = "";
if (process.env.NODE_ENV !== 'production') {
  // xx = 'http://dsapp13.intsit.dsfdc.com:8103'; // 测试地址
  // xx = 'http://dsapp18.intuat.dsfdc.com:8103'; // UAT地址
  // xx = 'http://cpms.dev.dashuf.com:8080'; // 服务器地址
  // xx = 'http://10.1.114.56:8080'; // 本地地址
}

// let xx = "http://cpms.dev.dashuf.com:8080/cpms"; // 服务器地址
// let xx = "http://10.1.114.56:8080/cpms"; // 本地地址
const configApi = {
  // 审批审计业务清单查询
  apprRecord: xx + "/apr/businessList/circulationRecord", // 流转记录
  apprDecision: xx + "/apr/businessList/decision", // 查看各阶段结论
  apprList: xx + "/apr/businessList/done/list", // 已完成业务列表
  appronTheWay: xx + "/apr/businessList/onTheWay/list", // 在途业务列表
  appronRepay: xx + "/apr/businessList/repaySituation", // 还款情况
  appronRisklevel: xx + "/apr/businessList/risklevel/list", // 评分列表
  appronService: xx + "/apr/businessList/serviceCenter/list", // 所属服务中心
  appronTask: xx + "/apr/businessList/task/list", // 当前阶段列表
  // 产品工厂
  found: xx + "/product/found/list", // 产品工厂-资金方
  partner: xx + "/product/partner/list" // 产品工厂-合作方
  // topBusinessType: xx + "/product/topBusinessType/list" // 产品工厂-一级产品
};

export {
  configApi
};
