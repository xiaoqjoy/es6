import { fileCos } from "@/common/js/fileCos";
let xx = "api/cpms";
let host = "api/cpms";
// let xx = 'http://10.3.114.195:8080'; //  本地地址
// let host2 = "";
if (process.env.NODE_ENV !== 'production') {
  // xx = 'http://dsapp13.intsit.dsfdc.com:8103'; // 测试地址
  // xx = 'http://dsapp18.intuat.dsfdc.com/h5/api/cpms'; // UAT地址
  // host = 'http://ds-ts-0457:8080';
  // host = 'http://dsapp23.intsit.dsfdc.com:8250/cpms';
  // xx = 'http://cpms.dev.dashuf.com:8080'; // 服务器地址
  // xx = 'http://10.3.114.211:8080'; // 本地地址
  // xx = host = "sit3/api/cpms";
  xx = host = fileCos.getHost()[1];
}

// let xx = "http://cpms.dev.dashuf.com:8080/cpms"; // 服务器地址
// let xx = "http://10.1.114.56:8080/cpms"; // 本地地址
const configApi = {
  multipleSelect: host + '/common/selection/all/params',
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
const aprAudApi = {
  dispatchStatus: host + "/apr/config/business/dispatch/status",
  // 审批
  taskList: host + "/collection/list", // 待处理信息
  taskGainSwitch: host + "/apr/aprTaskList/taskGainSwitch", // 开始取单停止取单
  dispatch: host + "/apr/config/business/dispatch", // 取单
  commonSelect: host + '/common/selection/all',
  detail: host + '/collection/detail/{applicationId}', // 获取
  attentionInfo: host + '/collection/attentionInfo/{applicationId}', // 关联信息检测
  taskDetail: {
    threedataList: host + "/apr/taskDetail/threedata/list", // 第三方数据
    threedataNowday: host + "/apr/taskDetail/threedata/nowday", // 第三方数据操作--个人查询
    vagueNowday: host + "/apr/taskDetail/threedata/vagueNowday", // 第三方数据操作--公司查询
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
    phoneCheckOper: host + "/apr/taskDetail/phonecheck/phoneCheckOper", // 电核勾选弹框里的保存
    phonecheckCall: host + "/apr/taskDetail/phonecheck/call", // 电核勾选弹框里的拨打电话
    phonecheckRecord: host + "/apr/taskDetail/phonecheck/record", // 电核勾选弹框里的列表
    phonecheckDetail: host + "/apr/taskDetail/phonecheck/detail", // 电核勾选-查询录音
    contactInfoOper: host + "/apr/taskDetail/contactInfo/contactInfoOper", // 保存联系人
    saveOper: host + "/apr/taskDetail/saveOper", // 保存
    phoneCheckConfig: host + "/apr/taskDetail/PhoneCheckConfig",
    phoneCheckConclusion: host + "/apr/taskDetail/phonecheck/phoneCheckConclusion",
    taskDetailReadonly: host + '/apr/taskDetail/taskDetailReadonly', // 只读
    riskParaDataReadonly: host + '/apr/taskDetail/riskPara/riskParaDataReadonly', // 风险参数只读

    rejectReasonNew: host + '/apr/config/operationConfig/reject_reason/levelList', // 否决原因树形
    levelList: host + '/apr/config/operationConfig' // 树形 查询双级配置联动列表
  },
  // 审计
  aud: {
    taskList: host + "/aud/aprTaskList/taskList", // 待处理信息
    taskGainSwitch: host + "/aud/aprTaskList/taskGainSwitch", // 开始取单停止取单
    dispatch: host + "/apr/config/business/dispatch", // 取单
    taskDetail: {
      threedataList: host + "/apr/taskDetail/threedata/list", // 第三方数据
      threedataNowday: host + "/aud/taskDetail/threedata/nowday", // 第三方数据操作--个人查询
      vagueNowday: host + "/aud/taskDetail/threedata/vagueNowday", // 第三方数据操作--公司查询
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
    getCarList: host + '/carLoanInfo/list',
    deleteCar: host + '/carLoanInfo/delete/',
    addCar: host + '/carLoanInfo/save',
    editCar: host + '/carLoanInfo/update',

    //   // 房产信息
    getHourseList: host + '/estateInfo/list',
    getHourseMessage: host + '/estateInfo/',
    getSl: host + '/estateInfo/worldUnion/sysQuery', // 世联查询
    getManual: host + '/estateInfo/worldUnion/manualQuery', // 世联结果查询
    deletCoowner: host + '/estateInfo/estateCoowner/delete/', // 删除房产信息
    //   // 保存房产信息新增
    addHouse: host + '/estateInfo/save/info',
    deleteHouse: host + '/estateInfo/delete/',
    editHouse: host + '/estateInfo/update',

    //   // 担保人信息
    addGuarantee: host + '/estateInfo/guarantee/save',
    getGuaranteeList: host + '/estateInfo/guarantee/list',
    deleteGuarantee: host + '/estateInfo/guarantee/delete/',
    getGuarantee: host + '/estateInfo/guarantee/',
    editGuarantee: host + '/estateInfo/guarantee/update'
  },
  LawxinServer: host + "/api/LawxinServer",
  taxConfig: {
    careerworkOrganizationList: host + '/taxLoan/careerwork/organization/info', // 获取客户所在地区域税务机构列表
    queryAuthory: host + '/taxLoan/authorization', // 获取税务授权信息
    queryTaxInfoApi: host + '/taxLoan/tax-information', // 查看税务信息
    checkTax: host + '/tax-loan/check-tax' // 获取税务信息
  },
  dadao: {
    businessSource: host + "/cpms/v1/channel/businessSource/{applicationId}",
    getAplCoborrowerInfos: host + "/cpms/v1/channel/dd/aplCoborrowerInfos/{applicationId}",
    getAplCoborrowerInfo: host + "/cpms/v1/channel/dd/aplCoborrowerInfo/{applicationId}",
    saveAplCoborrowerInfo: host + "/cpms/v1/channel/dd/aplCoborrowerInfo",
    delAplCoborrowerInfo: host + "/cpms/v1/channel/dd/delete/aplCoborrowerInfo/{applicationId}",
    aplEstateInfo: host + "/cpms/v1/channel/dd/aplEstateInfo",
    reconsiderationAmountValue: host + "/cpms/v1/channel/dd/reconsiderationAmountValue/{applicationId}",
    getHouseList: host + "/cpms/v1/channel/dd/aplEstateInfo/{applicationId}",
    getHourseMessage: host + "/cpms/v1/channel/dd/aplEstateInfo/{applicationId}/{estateNum}",
    deleteHouse: host + "/cpms/v1/channel/dd/delete/aplEstateInfos/{applicationId}/{estateNum}",
    detainees: host + "/cpms/v1/channel/dd/aplEstateInfo/detainees/{applicationId}", // 获取在押机构信息
    update: host + "/cpms/v1/channel/dd/detainees/update", // 更新在押机构信息
    delete: host + "/cpms/v1/channel/dd/detainees/delete/{id}", // 删除在押机构信息
    add: host + "/cpms/v1/channel/dd/detainees/add" // 新增在押机构信息
  },
  nuonuo: {
    getNuonuoMsg: host + "/channel/nuonuo/invoice-data"
  }
};
const autoIc = {
  enterprise: host + "/autoApr/enterprise/queryLog",
  enterpriseIc: host + "/autoApr/enterprise/ic",
  manually: host + "/autoApr/query/ic/manually",
  icQueryApi: host + '/autoApr/personal/icQueryInd/'
};
export {
  configApi,
  aprAudApi,
  autoIc
};
