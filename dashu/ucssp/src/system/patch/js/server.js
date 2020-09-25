import { fileCos } from "@/common/js/fileCos";
let host = 'api/cpms';

if (process.env.NODE_ENV !== 'production') {
  // host = 'http://cpms.intdev.dsfdc.com:8080';
  // host = 'http://dsapp13.intsit.dsfdc.com:8106/cpms';
  // host = 'http://dsapp13.intsit.dsfdc.com:8103';
  // host = 'http://10.20.0.13:8080';
  // host = 'http://10.3.113.222:8080';
  host = fileCos.getHost()[1];
  // host = '/sit3/api/cpms'; // sit3环境
}
const patchApi = {
  multipleSelect: host + '/common/selection/all/params',
  commonSelect: host + '/common/selection/all', // 获取字典
  dispose: {
    newTasks: host + '/cpms/v1/supplement-information/new-tasks', // 获取待处理任务
    handledTasks: host + '/cpms/v1/supplement-information/handled-tasks', // 获取已处理任务
    patchReview: host + '/cpms/v1/supplement-information/patchReview/info', // 获取补件信息
    coowner: host + '/cpms/v1/supplement-information/estate-coowner-information', // 共有产权人
    guarantees: host + '/cpms/v1/supplement-information/estate-guarantees-information', // 担保人
    estate: host + '/cpms/v1/supplement-information/estate-num-list' // 获取房产证号
  },
  review: {
    pending: host + '/cpms/v1/supplement-information/pending/list', // 待处理列表
    processed: host + '/cpms/v1/supplement-information/processed/list', // 已处理列表
    rollback: host + '/cpms/v1/supplement-information/rollback/info', // 提交退回原因
    submit: host + '/cpms/v1/supplement-information/submit/info', // 提交
    patchReview: host + '/cpms/v1/supplement-information/patchReview/save' // 详情按钮
  },
  selfEmployed: {
    submit: host + '/v1/supplement-information/selfEmployed/patchInfo/submit',
    query: host + '/v1/supplement-information/selfEmployed/patchInfo/',
    getIndustryCode: host + '/common/industryCode/', // 获取借款人行业下拉项
    getLoanPurpose: host + '/common/loanPurposeCode/', // 获取贷款用途下拉
    specialInfo: host + '/organization/specialInfo' // 获取特殊字段模板
  },
  print: {
    contractList: host + '/cpms/v1/supplement-information/patchReview/contracts/list', // 补件复核-查询产品打印合同清单
    printerList: host + '/cpms/v1/supplement-information/patchReview/contracts/centerPrinters', // 补件复核-查询打印机
    printContract: host + '/cpms/v1/supplement-information/patchReview/contracts/print', // 补件复核-打印合同
    queryPrintStatus: host + '/cpms/v1/supplement-information/patchReview/contracts/queryPrintStatus' // 补件复核-查询打印状态
  }
};
export {
  patchApi
};
