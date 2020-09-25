import {fileCos} from '../../../common/js/fileCos';
// let host = 'http://dsapp13.intsit.dsfdc.com:8103';
let host = 'api/cpms';
let host3 = "api/cpms"; // 获取爬虫 - 授权状态
if (process.env.NODE_ENV !== 'production') {
  host = 'http://10.3.113.66:8080';
  // host = 'http://dsapp18.intuat.dsfdc.com/h5/api/cpms';
  // host = 'http://dsapp13.intsit.dsfdc.com:8080/h5/api/cpms';
  // host = 'http://10.3.113.66:8080';

  // host = '/sit3/api/cpms'; // sit3环境
  // host = '/sit3/api/cpms'; // sit3环境
  // host3 = '/sit3/api/cpms'; // sit3环境
  host = fileCos.getHost()[1];
  host3 = fileCos.getHost()[1];
  // host = 'http://10.3.113.158:8080'; // 本地
}
const spareApi = {
  getLettersTSResult: host + "/enp/poa/letters/getLettersTSResult",
  getPersonalTaskList: host + "/api/v1/getPersonalTaskList",
  getAreaList: '/static/area_list.json',
  commonSelect: host + '/common/selection',
  commonSelectAll: host + '/common/selection/all',
  commonRepayment: host + '/common/repaymentMode/{applicationId}/{productId}',
  commonAmorization: host + '/common/amortizationMonth/{applicationId}/{productId}',
  multipleSelect: host + '/common/selection/all/params',
  userInfoList: host + '/user/userInfo/list',
  solving: {
    getTableList: host + '/prepared/personalTask/list',
    hangUp: host + '/prepared/hangUpTask/',
    dropLoan: host + '/prepared/abandonTask',
    callQueueNoForPre: host + '/v1/queue/callQueueNoForPrepared',
    callRepeat: host + '/v1/queue/callRepeat',
    crossQueueNo: host + '/v1/queue/crossQueueNo',
    checkSubmit: host + '/prepared/submitTaskCheck/',
    preSubmit: host + '/prepared/preSubmitTask/', // 预提交
    lastSubmit: host + '/prepared/submitTask', // 最终提交
    detailInfoCheck: host + '/prepared/detailInfoCheck/', // 打开完善资料前先调用接口是否可以填表
    uploadImgEnabel: host + '/prepared/getUploadImageInd/', // 查询能否上传影像
    bankInfo: {
      query: host + '/prepared/bankCard/list/', // 查询
      save: host + '/prepared/bankCard/save', // 保存
      list: host + '/bankCard/bankInfo/list', // 获取银行信息接口
      check: host + '/bankCard/bankInfo/check' // 账户验证接口
    },
    importInfo: {
      getTableData: host + "/prepared/task/list",
      import: host + '/prepared/climeTask/'
    },
    completeInfo: {
      selectProduction: {
        productInfo: host + '/prepared/preProduct/',
        getTableData: host + '/prepared/preProduct/list/',
        productSelectList: host + '/prepared/product/list/', // 待处理调用
        productSelectListHasDone: host + '/prepared/products/', // 已处理调用
        saveProductSelect: host + '/prepared/product/save',
        getReselectInd: host + '/prepared/reselectInd/' // 是否重新选产品
      },
      completeProduct: {
        getInfo: host + '/prepared/basicInfo/',
        saveInfo: host + '/prepared/productIncome/save', // 暂存信息
        submitInfo: host + '/prepared/productIncome/submit', // 提交信息
        getSubmitStatus: host + '/prepared/productCheckCnt/', // 是否已经提交过
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
        getHourseList: host + '/prepared/estateInfo/list',
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
        editGuarantee: host + '/estateInfo/guarantee/update',

        // 检测表格中app带过来的信息是否齐全
        checkTableList: host + '/prepared/infoCheck',

        // 获取定价方案下拉列表
        getPricingPlanCode: host + '/common/pricingPlan/list/'
      },
      completeCustomerInfo: {
        getInfo: host + '/prepared/perfectionInfo/', // 待处理页面获取信息
        getInfoHasDone: host + '/prepared/taskDone/perfectionInfo/', // 已处理页面获取信息
        queryChannel: host + '/cpms/v1/marketing-management/exclusive-channels/available', // 获取可用渠道1
        queryAllChannel: host + '/cpms/v1/marketing-management/exclusive-channels/', // 获取全部渠道1
        queryPersonalChannel: host + '/cpms/v1/marketing-management/personal-channels/available', // 获取其他可用个人渠道2
        queryAllPersonalChannel: host + '/cpms/v1/marketing-management/personal-channels/', // 获取其他全部个人渠道2
        queryCompanyChannel: host + '/cpms/v1/marketing-management/organization-channels/available', // 获取可用公司渠道3
        queryAllCompanyChannel: host + '/cpms/v1/marketing-management/organization-channels/', // 获取全部公司渠道3
        queryManangeChannnel: host + '/cpms/v1/marketing-management/members/available', // 获取可用客户经理4
        queryAllManangeChannnel: host + '/cpms/v1/marketing-management/members/', // 获取全部客户经理4
        getHasSubmit: host + '/prepared/detailInfoInd/', // 是否提交过
        submit: host + '/prepared/perfectionInfo/submit', // 提交信息
        save: host + '/prepared/perfectionInfo/save', // 保存信息,
        specialInfo: host + '/organization/specialInfo', // 获取特殊字段模板
        getIndustryCode: host + '/common/industryCode/', // 获取借款人行业下拉项
        getLoanTerm: host + '/common/loanTerm/', // 获取贷款期限下拉
        getLoanPurpose: host + '/common/loanPurposeCode/', // 获取贷款用途下拉

        getSpiderStatus: host3 + "/crawler/getTaskStatus/" // 获取爬虫 - 授权状态
      }
    }
  },
  solved: {
    getTableData: host + '/prepared/doneTask/list'
  },
  callQueue: host + "/v1/queue/callQueueNoForPrepared", // 叫号
  callRepeat: host + "/v1/queue/callRepeat", // 重呼
  crossQueueNo: host + "/v1/queue/crossQueueNo", // 过号
  taxConfig: {
    // area_tax_organization_list: host + '/cpms/v1/tax-loan/area-tax-organization-list', // 获取区域税务机构列表
    // area_tax_organization_list: host + '/taxLoan/Organization/list'
    area_tax_organization_list: host + '/taxLoan/areaTaxOrganization/list', // 获取区域税务机构列表
    tax_loan_organization_list: host + '/taxLoan/Organization/list', // 获取税务接入下拉框下拉框
    careerworkOrganizationList: host + '/taxLoan/careerwork/organization/info', // 获取客户所在地区域税务机构列表
    queryAuthory: host + '/taxLoan/authorization', // 获取税务授权信息
    queryTaxInfoApi: host + '/taxLoan/tax-information', // 获取税务信息
    checkTax: host + '/tax-loan/check-tax' // 获取税务信息
  },
  checkTaxLoan: {
    basicInfo: host + '/taxLoan/prepared/basic/info', // 查询基础信息
    declareInfo: host + '/taxLoan/prepared/declare/info', // 申报
    crilvl: host + '/taxLoan/prepared/crlvl/info', // 信用评价
    illegal: host + '/taxLoan/prepared/illegal/info', // 违法信息
    inspection: host + '/taxLoan/prepared/inspection/info', // 稽查案件
    // invoice: host + '/taxLoan/prepared/invoice/info', // 发票
    owingtax: host + '/taxLoan/prepared/owingtax/info', // 欠税
    // financial: host + '/taxLoan/prepared/financial/info', // 财务
    basic: {
      basicInfo: host + '/taxLoan/prepared/basic/info', // 查询税务贷基本信息-纳税人基本信息
      branchOrganizationsinfo: host + '/taxLoan/prepared/basic/branchOrganizations/info', // 查询税务贷基本信息-分支机构信息
      changeRegisterInfo: host + '/taxLoan/prepared/basic/changeRegisterInfo/info', // 查询税务贷基本信息-变更登记信息
      contacts: host + '/taxLoan/prepared/basic/contacts/info', // 查询税务贷基本信息-联系人信息
      headOrganizations: host + '/taxLoan/prepared/basic/headOrganizations/info', // 查询税务贷基本信息-总机构信息
      investors: host + '/taxLoan/prepared/basic/investors/info', // 查询税务贷基本信息-投资方信息
      qualification: host + '/taxLoan/prepared/basic/qualification/info' // 查询税务贷基本信息-纳税人资格类型登记信息
    },
    declare: {
      detail: host + '/taxLoan/prepared/declare/detail/info', // 查询税务贷申报信息-申报明细信息
      mult: host + '/taxLoan/prepared/declare/mult/info' // 查询税务贷申报信息-申报综合信息
    },
    financial: {
      balanceCompany: host + '/taxLoan/prepared/financial/balanceCompany/info', // 查询税务财务信息-资产负债-适用执行企业会计制度的企业
      balanceGeneralCompany: host + '/taxLoan/prepared/financial/balanceGeneralCompany/info', // 查询税务财务信息-资产负债-适用执行一般企业会计制度的企业
      balanceSmallCompany: host + '/taxLoan/prepared/financial/balanceSmallCompany/info', // 查询税务财务信息-资产负债-适用执行小企业会计制度的企业
      profitCompany: host + '/taxLoan/prepared/financial/profitCompany/info', // 查询税务财务信息-资产负债-适用执行小企业会计制度的企业
      profitGeneralCompany: host + '/taxLoan/prepared/financial/profitGeneralCompany/info', // 查询税务财务信息-利润-适用执行一般企业会计制度的企业
      profitSmallCompany: host + '/taxLoan/prepared/financial/profitSmallCompany/info', // 查询税务财务信息-利润-适用执行小企业会计制度的企业
      profitSmallCompanyByYear: host + '/taxLoan/prepared/financial/profitSmallCompanyByYear/info' // 查询税务财务信息-利润-适用执行小企业会计制度的企业-（年报）
    },
    invoice: {
      commercials: host + '/taxLoan/prepared/invoice/commercials/info', // 查询税务发票信息-普通发票
      electronics: host + '/taxLoan/prepared/invoice/electronics/info', // 查询税务发票信息-电子发票
      freights: host + '/taxLoan/prepared/invoice/freights/info', // 查询税务发票信息-货运发票
      motorVehicles: host + '/taxLoan/prepared/invoice/motorVehicles/info', // 查询税务发票信息-机动车发票
      specials: host + '/taxLoan/prepared/invoice/specials/info' // 查询税务发票信息-专用发
    }
  }
};
const easyLoan = {
  query: host + '/easyLoan/estateInfo/',
  delete: host + '/easyLoan/estateInfo/delete/',
  save: host + '/easyLoan/estateInfo/save',
  update: host + '/easyLoan/estateInfo/update'
};
const pulsLoan = {
  query: host + '/plusLoan/estateInfo/',
  delete: host + '/plusLoan/estateInfo/delete/',
  save: host + '/plusLoan/estateInfo/save',
  update: host + '/plusLoan/estateInfo/update'
};
export {
  spareApi,
  easyLoan,
  pulsLoan
};
