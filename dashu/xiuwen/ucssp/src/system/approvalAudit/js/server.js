// import { fileCos } from "@/common/js/fileCos";
let host = 'api/cpms';
let host2 = 'api/cpms';
// let host = 'http://10.3.113.81:8080'; // http://10.3.113.81 税务贷的接口
let host3 = 'api/cpms';
if (process.env.NODE_ENV !== 'production') {
  // host2 = 'http://dsapp13.intsit.dsfdc.com:8080/h5/api/cpms';
  // host2 = 'http://dsapp135.sit.dashuf.com/h5/api/cpms';
  // host2 = 'http://dsapp18.intuat.dsfdc.com/h5/api/cpms';
  // host = 'http://dsapp13.intsit.dsfdc.com:8080/h5/api/cpms';
  // host = 'http://dsapp135.sit.dashuf.com/h5/api/cpms';
  // host = 'http://dsapp18.intuat.dsfdc.com/h5/api/cpms';
// host = 'http://cpms.intdev.dsfdc.com:8080'; // 开发环境
  // host3 = 'http://10.21.0.13:8103';
  // host = fileCos.getHost()[1];
  // host2 = 'http://dsapp57.intsit.dsfdc.com:8080/h5/api/cpms';
  // host3 = 'http://dsapp57.intsit.dsfdc.com:8080/h5/api/cpms';
}
const aprAudApi = {
  // 取单状态
  dispatchStatus: host + "/apr/config/business/dispatch/status",
  // 审批
  taskList: host + "/apr/aprTaskList/taskList", // 待处理信息
  taskGainSwitch: host + "/apr/aprTaskList/taskGainSwitch", // 开始取单停止取单
  dispatch: host + "/apr/config/business/dispatch", // 取单
  commonSelect: host + '/common/selection/all',
  taskDetail: {
    taskDetail: host + "/apr/taskDetail", // 信息提示
    ruleDetection: host + "/apr/taskDetail/ruleDetection", // 规则检查
    imagePage: host + "/apr/taskDetail/imagePage", // 影像资料
    remarkPage: host + "/apr/taskDetail/remarkPage", // 备注
    remarkOper: host + "/apr/taskDetail/remarkOper", // 备注保存
    patchPage: host + "/apr/taskDetail/patchPage", // 补件
    patchOper: host + "/apr/taskDetail/patchOper", // 补件退回
    OperationConfig: host + "/apr/taskDetail/OperationConfig", // 原因配置
    OperationTranConfig: host + "/apr/taskDetail/OperationTranConfig", // 原因配置反显
    surveyOper: host + "/apr/taskDetail/surveyOper", // 发起调查
    surveyPage: host + "/apr/taskDetail/surveyPage", // 调查历史
    submitPage: host + "/apr/taskDetail/submitPage", // 提交
    submitOper: host + "/apr/taskDetail/submitOper", // 提交页面
    RejectReasonConfig: host + '/apr/taskDetail/RejectReasonConfig', // 提交否决原因
    submitTwiceOper: host + "/apr/taskDetail/submitTwiceOper", // 二次提交
    riskParaSaveOper: host + "/apr/taskDetail/riskPara", // 风险参数-操作
    threedataList: host + "/apr/taskDetail/threedata/list", // 第三方数据
    getRiskParaData: host + "/apr/taskDetail/riskPara/riskParaData", // 获取风险参数
    threedataNowday: host + "/apr/taskDetail/threedata/nowday", // 第三方数据操作--个人查询
    vagueNowday: host + "/apr/taskDetail/threedata/vagueNowday", // 第三方数据操作--公司查询
    creditReportRefresh: host + "/apr/taskDetail/creditReport/refresh", // 获取征信报告列表
    creditReportData: host + "/apr/taskDetail/creditReport/creditData",
    creditReport: host + "/creditReport/", // 征信报告详情
    phoneCheckOper: host + "/apr/taskDetail/phonecheck/phoneCheckOper", // 电核勾选弹框里的保存
    phonecheckCall: host + "/apr/taskDetail/phonecheck/call", // 电核勾选弹框里的拨打电话
    phonecheckRecord: host + "/apr/taskDetail/phonecheck/record", // 电核勾选弹框里的列表
    phonecheckDetail: host + "/apr/taskDetail/phonecheck/detail", // 电核勾选-查询录音
    contactInfoOper: host + "/apr/taskDetail/contactInfo/contactInfoOper", // 保存联系人
    saveOper: host + "/apr/taskDetail/saveOper", // 保存
    phoneCheckConfig: host + "/apr/taskDetail/PhoneCheckConfig",
    phoneCheckConclusion: host + "/apr/taskDetail/phonecheck/phoneCheckConclusion",
    attentionInfo: host + "/apr/taskDetail/attentionInfo/record", // 关注信息检测
    taskDetailReadonly: host + '/apr/taskDetail/taskDetailReadonly', // 只读
    riskParaDataReadonly: host + '/apr/taskDetail/riskPara/riskParaDataReadonly' // 风险参数只读
  },
  // 审计
  aud: {
    taskList: host + "/aud/aprTaskList/taskList", // 待处理信息
    taskGainSwitch: host + "/aud/aprTaskList/taskGainSwitch", // 开始取单停止取单
    dispatch: host + "/apr/config/business/dispatch", // 取单
    taskDetail: {
      taskDetail: host + "/aud/taskDetail", // 信息提示
      ruleDetection: host + "/aud/taskDetail/ruleDetection", // 规则检查
      imagePage: host + "/aud/taskDetail/imagePage", // 影像资料
      remarkPage: host + "/aud/taskDetail/remarkPage", // 备注
      remarkOper: host + "/aud/taskDetail/remarkOper", // 备注保存
      patchPage: host + "/aud/taskDetail/patchPage", // 补件
      patchOper: host + "/aud/taskDetail/patchOper", // 补件退回
      OperationTranConfig: host + "/aud/taskDetail/OperationTranConfig", // 原因配置反显
      surveyOper: host + "/aud/taskDetail/surveyOper", // 发起调查
      surveyPage: host + "/aud/taskDetail/surveyPage", // 调查历史
      submitPage: host + "/aud/taskDetail/submitPage", // 提交
      submitOper: host + "/aud/taskDetail/submitOper", // 提交页面
      submitTwiceOper: host + "/aud/taskDetail/submitTwiceOper", // 二次提交
      riskParaSaveOper: host + "/aud/taskDetail/riskPara", // 风险参数-操作
      threedataList: host + "/aud/taskDetail/threedata/list", // 第三方数据
      getRiskParaData: host + "/aud/taskDetail/riskPara/riskParaData", // 获取风险参数
      threedataNowday: host + "/aud/taskDetail/threedata/nowday", // 第三方数据操作--个人查询
      vagueNowday: host + "/aud/taskDetail/threedata/vagueNowday", // 第三方数据操作--公司查询
      creditReportRefresh: host + "/aud/taskDetail/creditReport/refresh", // 获取征信报告列表
      creditReportData: host + "/aud/taskDetail/creditReport/creditData",
      creditReport: host + "/creditReport/", // 征信报告详情
      phoneCheckOper: host + "/aud/taskDetail/phonecheck/phoneCheckOper", // 电核勾选弹框里的保存
      phonecheckCall: host + "/aud/taskDetail/phonecheck/call", // 电核勾选弹框里的拨打电话
      phonecheckRecord: host + "/aud/taskDetail/phonecheck/record", // 电核勾选弹框里的列表
      phonecheckDetail: host + "/aud/taskDetail/phonecheck/detail", // 电核勾选-查询录音
      contactInfoOper: host + "/aud/taskDetail/contactInfo/contactInfoOper", // 保存联系人
      saveOper: host + "/aud/taskDetail/saveOper", // 保存
      phoneCheckConfig: host + "/aud/taskDetail/PhoneCheckConfig",
      phoneCheckConclusion: host + "/aud/taskDetail/phonecheck/phoneCheckConclusion",
      sendBackPage: host + "/aud/taskDetail/sendBackPage", // 退回
      sendBackOper: host + "/aud/taskDetail/sendBackOper", // 确认退回
      taskDetailReadonly: host + '/aud/taskDetail/taskDetailReadonly', // 只读
      riskParaDataReadonly: host + '/aud/taskDetail/riskPara/riskParaDataReadonly', // 风险参数只读
      attentionInfo: host + "/aud/taskDetail/attentionInfo/record", // 关注信息检测
      aprInfo: host + "/cpms/v1/channel/ft/" // 飞钛审批信息查询
    }
  },
  completeProduct: {
    //   getInfo: xx + '/customer/basicInfo/',
    //   saveInfo: xx + '/customer/basicInfo/save', // 暂存信息
    //   submitInfo: xx + '/prepared/productIncome/submit', // 提交信息
    //   getSubmitStatus: xx + '/prepared/productCheckCnt/', // 是否已经提交过
    //   // 保单信息
    //   getPolicyMessage: xx + '/insuranceInfo/',
    //   getPolicyList: xx + '/insuranceInfo/list',
    //   deletePolicy: xx + '/insuranceInfo/delete/',
    //   addPolicy: xx + '/insuranceInfo/save',
    //   editPolicy: xx + '/insuranceInfo/update',
    //   // 车供信用卡
    getCarList: host2 + '/carLoanInfo/list',
    deleteCar: host2 + '/carLoanInfo/delete/',
    addCar: host2 + '/carLoanInfo/save',
    editCar: host2 + '/carLoanInfo/update',

    //   // 房产信息
    getHourseList: host2 + '/estateInfo/list',
    getHourseMessage: host2 + '/estateInfo/',
    getSl: host2 + '/estateInfo/worldUnion/sysQuery', // 世联查询
    getManual: host2 + '/estateInfo/worldUnion/manualQuery', // 世联结果查询
    deletCoowner: host + '/estateInfo/estateCoowner/delete/', // 删除房产信息
    //   // 保存房产信息新增
    addHouse: host2 + '/estateInfo/save/info',
    deleteHouse: host2 + '/estateInfo/delete/',
    editHouse: host2 + '/estateInfo/update',

    //   // 担保人信息
    addGuarantee: host2 + '/estateInfo/guarantee/save',
    getGuaranteeList: host2 + '/estateInfo/guarantee/list',
    deleteGuarantee: host + '/estateInfo/guarantee/delete/',
    getGuarantee: host2 + '/estateInfo/guarantee/',
    editGuarantee: host2 + '/estateInfo/guarantee/update'
  },
  LawxinServer: host + "/api/LawxinServer",
  taxConfig: {
    careerworkOrganizationList: host + '/taxLoan/careerwork/organization/info', // 获取客户所在地区域税务机构列表
    queryAuthory: host + '/taxLoan/authorization', // 获取税务授权信息
    queryTaxInfoApi: host + '/taxLoan/tax-information', // 查看税务信息
    checkTax: host + '/tax-loan/check-tax' // 获取税务信息
  },
  dadao: {
    businessSource: host3 + "/cpms/v1/channel/businessSource/{applicationId}",
    getAplCoborrowerInfos: host3 + "/cpms/v1/channel/dd/aplCoborrowerInfos/{applicationId}",
    getAplCoborrowerInfo: host3 + "/cpms/v1/channel/dd/aplCoborrowerInfo/{applicationId}",
    saveAplCoborrowerInfo: host3 + "/cpms/v1/channel/dd/aplCoborrowerInfo",
    delAplCoborrowerInfo: host3 + "/cpms/v1/channel/dd/delete/aplCoborrowerInfo/{applicationId}",
    aplEstateInfo: host3 + "/cpms/v1/channel/dd/aplEstateInfo",
    reconsiderationAmountValue: host3 + "/cpms/v1/channel/dd/reconsiderationAmountValue/{applicationId}",
    getHouseList: host3 + "/cpms/v1/channel/dd/aplEstateInfo/{applicationId}",
    getHourseMessage: host3 + "/cpms/v1/channel/dd/aplEstateInfo/{applicationId}/{estateNum}",
    deleteHouse: host3 + "/cpms/v1/channel/dd/delete/aplEstateInfos/{applicationId}/{estateNum}"
  }
};

const autoIc = {
  enterprise: host + "/autoApr/enterprise/queryLog",
  enterpriseIc: host + "/autoApr/enterprise/ic",
  manually: host + "/autoApr/query/ic/manually",
  icQueryApi: host + '/autoApr/personal/icQueryInd/'
};

export {
  aprAudApi,
  autoIc
};
