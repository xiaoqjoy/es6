import { fileCos } from "@/common/js/fileCos";
let host = 'api/cpms';
let host1 = 'api/cpms'; // 这个暂时请不要改 这个后续我来改（liuzhe）
// let host = 'http://dsapp13.intsit.dsfdc.com:8103';
// let host1 = 'http://dsapp13.intsit.dsfdc.com:8103';
// let host = 'http://10.3.113.81:8080'; // http://10.3.113.81 税务贷的接口
let host2 = "api/cpms"; // 获取爬虫 - 授权状态
if (process.env.NODE_ENV !== 'production') {
  // host = 'http://10.1.114.216:8080'; // 本地
  // host = 'http://10.1.113.122:8080'; // 假开发环境
  // host = 'http://10.20.0.13:8080'; // 开发环境

  // host = "/api/cpms"; // 测试环境
  // host = "http://10.3.113.153:8080";
  // host = '/uat/api/cpms'; // uat环境
  // host = '/sit3/api/cpms'; // ST3环境
  // host = 'http://ds-ts-0531:8080';

  // host1 = 'api/cpms';
  // host1 = "http://10.3.113.153:8080";
  // host1 = '/uat/api/cpms'; // uat环境
  // host1 = '/sit3/api/cpms'; // ST3环境
  // host1 = 'http://ds-ts-0531:8080';

  // host2 = "/api/cpms"; // 测试环境
  // host2 = '/uat/api/cpms'; // uat环境
  // host2 = '/sit3/api/cpms'; // ST3环境
  // host2 = "http://10.3.113.153:8080";
  // host2 = "http://yapi.dashuf.com/mock/30"; // 获取爬虫 - 授权状态
  // host2 = 'http://ds-ts-0531:8080';
  // host = 'http://10.3.113.66:8080';
  // host1 = 'http://10.3.113.66:8080';
  // host2 = 'http://10.3.113.66:8080';
  host = fileCos.getHost()[1];
  host1 = fileCos.getHost()[1];
  host2 = fileCos.getHost()[1];
}

const baseApi = {

  saveCustomerInfo: host + "/f2f/customer-info",
  saveProductInfo: host + "/f2f/product-info",
  multipleSelect: host + '/common/selection/all/params',
  getContractList: host + "/f2f/remote/product-info/contracts", // 726需求，查询产品需打印的合同列表
  contractDownload: host + "/f2f/remote/productContract/download",
  userInfoList: host + '/user/userInfo/list',
  commonRepayment: host + '/common/repaymentMode/{applicationId}/{productId}',
  commonAmorization: host + '/common/amortizationMonth/{applicationId}/{productId}',

  pending: {
    getCustomerInfo: host + "/f2f/pending/customer-info/",
    getCreditInfo: host + "/f2f/pending/product-info/credit/",
    getPricingInfo: host + "/f2f/pending/product-info/pricing/",
    getInsuranceInfo: host + "/f2f/pending/product-info/insurance/",
    getCarLoan: host + "/f2f/pending/product-info/car-loan/",
    getEstateInfo: host + "/f2f/pending/product-info/estate/",
    getTaxLoan: host + "/f2f/pending/product-info/tax-loan/",
    getSpecialInfo: host + "/f2f/pending/product-info/org-special/",
    getBankCards: host + "/f2f/pending/product-info/bank-cards/",
    // 获取定价方案下拉列表
    getPricingPlanCode: host + '/common/pricingPlan/list/'
  },

  processed: {
    getCustomerInfo: host + "/f2f/processed/customer-info/",
    getCreditInfo: host + "/f2f/processed/product-info/credit/",
    getPricingInfo: host + "/f2f/processed/product-info/pricing/",
    getInsuranceInfo: host + "/f2f/processed/product-info/insurance/",
    getCarLoan: host + "/f2f/processed/product-info/car-loan/",
    getEstateInfo: host + "/f2f/processed/product-info/estate/",
    getTaxLoan: host + "/f2f/processed/product-info/tax-loan/",
    getSpecialInfo: host + "/f2f/processed/product-info/org-special/",
    getBankCards: host + "/f2f/processed/product-info/bank-cards/"
  },

  processed_list: host + "/f2f/remote/processed/list", // 查询面签已处理列表
  pending_amount: host + "/f2f/remote/pending/amount", // 查询面签剩余数量
  pending_list: host + "/f2f/remote/pending/list", // 查询面签待处理列表
  waitingF2F_list: host + "/f2f/remote/waitingF2F/list", // 查询待引入面签列表
  introduce: host + "/f2f/remote/introduce/", // 引入面签
  pending_start: host + "/f2f/remote/pending/", // 开始处理面签待处理项
  // callQueueNoForF2F: host + "/v1/queue/callQueueNoForF2F", // 叫号
  callQueueNoForF2F: host + "/v1/queue/f2f/remote/callQueueNo", // 叫号 5.31优化项，将叫号接口拆成两个，分别是柜面和远程
  callRepeat: host + "/v1/queue/callRepeat", // 重呼
  crossQueueNo: host + "/v1/queue/crossQueueNo", // 过号
  cloudroomAccessInfo: host + "/f2f/remote/cloudroomAccessInfo", // 查询云屋远程面签视频用户名和密码
  reconnect: host + "/v1/queue/remote-f2f/reconnect", // 远程面签视频重连时使用
  recordVideo: host + "/video/record", // 记录一笔视频录像业务单
  hangUp: host + "/f2f/hang-up/",
  f2fProgressNode: host + "/f2f/remote/f2fProgressNode/", // 查询面核面签页面当前进度条节点
  // queryIDCardAndfaceRecognition: host + "/f2f/remote/queryIDCardAndfaceRecognition/", // 查看身份证图片和人脸识别结果（远程面签不需要）
  IDAuth: host + "/f2f/remote/IDAuth/", // 身份识别认证
  queryIdAuthInfo: host + "/f2f/remote/queryIdAuthInfo/", // 身份证图片和人脸识别结果为App端采集
  loanHistory: host + "/f2f/remote/loanHistory/", // 查询历史贷款记录
  creditReport: host + "/creditReport/", // 显示征信报告
  faceCheckOpinionLibrary: host + "/f2f/remote/faceCheck/", // 查询面签意见话术库
  faceCheck_submit: host + "/f2f/remote/faceCheck/submit", // 面核提交
  faceSignCommit: host + "/v1/queue/faceSignCommit", // 释放房间 - 远程面签成功提交时调用（远程面签调用）
  IDAuthDeny: host + "/f2f/remote/IDAuthDeny/", // 远程面签核身不通过否决

  is_submit: host + "/manager/f2f/is-submit/", // 查看面签是否已经提交
  commonSelect: host + '/common/selection',
  commonSelectAll: host + '/common/selection/all',
  selectProduction: {
    // productInfo: host + '/f2f/customer/preProduct/',
    // getTableData: host + '/f2f/customer/preProduct/list',
    // productSelectList: host + '/f2f/customer/product/list/' // 产品下拉字典
    // saveProductSelect: host + '/f2f/customer/product/save'
  },

  // 产品信息
  completeProduct: {
    getInfo: host + '/f2f/customer/basicInfo/',
    saveInfo: host + '/f2f/customer/basicInfo/save', // 暂存信息（已遗弃）
    submitInfo: host + '/f2f/customer/basicInfo/submit', // 保存客户基本信息接口
    // submitInfo: host + '/f2f/customer/productIncome/submit', // 提交信息
    // getSubmitStatus: host + '/f2f/customer/productCheckCnt/', // 是否已经提交过
    // 保单信息
    getPolicyMessage: host + '/insuranceInfo/',
    getPolicyList: host + '/insuranceInfo/list',
    deletePolicy: host + '/insuranceInfo/delete/',
    addPolicy: host + '/insuranceInfo/save',
    editPolicy: host + '/insuranceInfo/update',
    // 车供信用卡
    getCarList: host + '/carLoanInfo/list',
    deleteCar: host + '/carLoanInfo/delete/',
    addCar: host + '/carLoanInfo/save',
    editCar: host + '/carLoanInfo/update',

    // 房产信息
    getHourseList: host + '/estateInfo/list',
    getHourseMessage: host + '/estateInfo/',
    getSl: host + '/estateInfo/worldUnion/sysQuery', // 世联查询
    getManual: host + '/estateInfo/worldUnion/manualQuery', // 世联结果查询
    deletCoowner: host + '/estateInfo/estateCoowner/delete/', // 删除房产信息
    // 保存房产信息新增
    addHouse: host + '/estateInfo/save/info',
    deleteHouse: host + '/estateInfo/delete/',
    editHouse: host + '/estateInfo/update',

    // 担保人信息
    addGuarantee: host + '/estateInfo/guarantee/save',
    getGuaranteeList: host + '/estateInfo/guarantee/list',
    deleteGuarantee: host + '/estateInfo/guarantee/delete/',
    getGuarantee: host + '/estateInfo/guarantee/',
    editGuarantee: host + '/estateInfo/guarantee/update'
  },

  // 客户信息
  completeCustomerInfo: {
    getInfo: host + '/f2f/customer/perfectionInfo/', // 查询完善客户信息页面
    submit: host + '/f2f/customer/perfectionInfo/submit', // 提交完善客户页面信息
    // save: host + '/f2f/customer/perfectionInfo/save', // 暂存完善客户页面信息（已遗弃）
    // getHasSubmit: host + '/f2f/customer/detailInfoInd/', // 是否提交过（面签没有，备签有）

    // queryChannel: host1 + '/cpms/v1/marketing-management/exclusive-channels/available', // 查询渠道
    // queryPersonalChannel: host1 + '/cpms/v1/marketing-management/personal-channels/available', // 查询其他渠道
    // queryCompanyChannel: host1 + '/cpms/v1/marketing-management/organization-channels/available', // 查询其他渠道
    // queryManangeChannnel: host1 + '/cpms/v1/marketing-management/members/available', // 查询经理渠道
    queryChannel: host1 + '/cpms/v1/marketing-management/exclusive-channels/available', // 获取可用渠道1
    queryAllChannel: host1 + '/cpms/v1/marketing-management/exclusive-channels/', // 获取全部渠道1
    queryPersonalChannel: host1 + '/cpms/v1/marketing-management/personal-channels/available', // 获取其他可用个人渠道2
    queryAllPersonalChannel: host1 + '/cpms/v1/marketing-management/personal-channels/', // 获取其他全部个人渠道2
    queryCompanyChannel: host1 + '/cpms/v1/marketing-management/organization-channels/available', // 获取可用公司渠道3
    queryAllCompanyChannel: host1 + '/cpms/v1/marketing-management/organization-channels/', // 获取全部公司渠道3
    queryManangeChannnel: host1 + '/cpms/v1/marketing-management/members/available', // 获取可用客户经理4
    queryAllManangeChannnel: host1 + '/cpms/v1/marketing-management/members/', // 获取全部客户经理4

    specialInfo: host + '/organization/specialInfo', // 获取特殊字段模板

    getSpiderStatus: host2 + "/crawler/getTaskStatus/" // 获取爬虫 - 授权状态
  },
  // 产品收入信息
  productList: {
    submit: host + '/f2f/product-income-info'
  },
  // 收款账户信息管理
  // lastSubmit: host + '/prepared/submitTask', // 最终提交
  bankInfo: {
    query: host + '/f2f/bank-cards/', // 查询收款卡信息
    save: host + '/f2f/bank-cards/save', // 保存收款卡信息
    list: host + '/bankCard/bankInfo/list', // 获取银行信息接口
    check: host + '/bankCard/bankInfo/check' // 收款卡账户验证接口
  },

  faceCheckTime: host + "/f2f/remote/faceCheckTime/", // 查询面核次数
  productInterview: host + "/f2f/remote/productInterview/", // 查询产品面签列表
  // productContract: host + "/f2f/remote/productContract/", // 查询产品合同列表
  productContract: host + "/f2f/remote/product-print-contract/", // 查询产品需打印的合同列表
  // centerPrinters: host + "/f2f/remote/centerPrinters", // 查询处理中心打印机列表
  centerPrinters: host + "/f2f/remote/", // 查询处理中心打印机列表
  productContract_print: host + "/f2f/remote/productContract/print", // 打印合同
  loanProductDeny: host + "/f2f/remote/loanProductDeny", // 拒绝产品申请
  faceInterview: host + "/f2f/remote/faceInterview", // 资料签署完成
  f2fConfirmInfo: host + "/f2f/remote/f2fConfirmInfo/", // 查询面核面签确认页面信息

  face_submit: host + "/f2f/remote/", // 面核面签提交
  taxConfig: {
    // area_tax_organization_list: host + '/cpms/v1/tax-loan/area-tax-organization-list', // 获取区域税务机构列表
    // area_tax_organization_list: host + '/taxLoan/Organization/list'
    area_tax_organization_list: host + '/taxLoan/areaTaxOrganization/list', // 获取区域税务机构列表
    tax_loan_organization_list: host + '/taxLoan/Organization/list', // 获取税务接入下拉框下拉框
    careerworkOrganizationList: host + '/taxLoan/careerwork/organization/info', // 获取客户所在地区域税务机构列表
    queryAuthory: host + '/taxLoan/authorization', // 获取税务授权信息
    queryTaxInfoApi: host + '/taxLoan/tax-information', // 获取税务信息
    checkTax: host + '/tax-loan/check-tax' // 获取税务信息
  }
};

const easyLoan = {
  query: host + '/easyLoan/estateInfo/',
  delete: host + '/easyLoan/estateInfo/delete/',
  save: host + '/easyLoan/estateInfo/save',
  update: host + '/easyLoan/estateInfo/update',
  isEasyLoan: host + '/apl/easyLoanInd/'
};

const autoIc = {
  enterprise: host + "/autoApr/enterprise/queryLog",
  enterpriseIc: host + "/autoApr/enterprise/ic",
  manually: host + "/autoApr/query/ic/manually",
  icQueryApi: host + '/autoApr/personal/icQueryInd/'
};

export {
  baseApi,
  easyLoan,
  autoIc
};
