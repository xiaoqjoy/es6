let host = 'api/cpms';
let host2 = 'api/cpms';
if (process.env.NODE_ENV !== 'production') {
  // host = 'http://dsapp13.intsit.dsfdc.com:8080/tpss/api/cpms';
   host = 'http://10.3.114.23:8080';
  host2 = 'http://10.3.114.23:8080';
}
const spareApi = {
  getLettersTSResult: host + "/enp/poa/letters/getLettersTSResult",
  getPersonalTaskList: host + "/api/v1/getPersonalTaskList",
  getAreaList: '/static/area_list.json',
  commonSelect: host + '/common/selection',
  commonSelectAll: host + '/common/selection/all',
  multipleSelect: host + '/common/selection/all/params',
  solving: {
    getTableList: host + '/thirdPrepared/personalTask/list', // 获取待处理列表
    hangUp: host + '/thirdPrepared/hangUpTask/', // 挂起任务
    dropLoan: host + '/thirdPrepared/abandonTask', // 放弃贷款
    callQueueNoForPre: host + '/v1/queue/callQueueNoForPrepared',
    callRepeat: host + '/v1/queue/callRepeat',
    crossQueueNo: host + '/v1/queue/crossQueueNo',
    checkSubmit: host + '/thirdPrepared/submitTaskCheck/',
    preSubmit: host + '/thirdPrepared/preSubmitTask/', // 预提交
    lastSubmit: host + '/thirdPrepared/submitTask', // 最终提交
    detailInfoCheck: host + '/thirdPrepared/detailInfoCheck/', // 打开完善资料前先调用接口是否可以填表
    importInfo: { // 引入
      getTableData: host + "/thirdPrepared/task/list",
      import: host + '/thirdPrepared/climeTask/'
    },
    completeInfo: {
      selectProduction: {
        productInfo: host + '/thirdPrepared/preProduct/', // 产品信息
        getTableData: host + '/thirdPrepared/preProduct/list/', // 获取产品列表
        productSelectList: host + '/thirdPrepared/product/list/', // 查询产品下拉待处理
        productSelectListHasDone: host + '/thirdPrepared/products/', // 查询产品下拉已处理
        saveProductSelect: host + '/prepared/product/save' // 保存产品选择
      },
      completeProduct: {
        getInfo: host + '/thirdPrepared/customerInfo/', // 获取用户基本信息
        saveInfo: host + '/thirdPrepared/customerInfo/save', // 暂存信息
        submitInfo: host + '/thirdPrepared/customerInfo/submit', // 提交信息
        getSubmitStatus: host + '/thirdPrepared/productCheckCnt/', // 是否已经提交过
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
        getHourseList: host + '/thirdPrepared/estateInfo/list',
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
        checkTableList: host + '/thirdPrepared/infoCheck'
      },
      completeCustomerInfo: {
        getInfo: host + '/thirdPrepared/productSpecialInfo/', // 查询信息待已处理
        getInfoHasDone: host + '/thirdPrepared/doneTask/productSpecialInfo/', // 查询信息已处理
        queryChannel: host2 + '/cpms/v1/marketing-management/exclusive-channels/available',
        queryPersonalChannel: host2 + '/cpms/v1/marketing-management/personal-channels/available',
        queryCompanyChannel: host2 + '/cpms/v1/marketing-management/organization-channels/available',
        queryManangeChannnel: host2 + '/cpms/v1/marketing-management/members/available',
        queryAllChannel: host2 + '/cpms/v1/marketing-management/exclusive-channels/',
        queryAllPersonalChannel: host2 + '/cpms/v1/marketing-management/personal-channels/',
        queryAllCompanyChannel: host2 + '/cpms/v1/marketing-management/organization-channels/',
        queryAllManangeChannnel: host2 + '/cpms/v1/marketing-management/members/',
        getHasSubmit: host + '/thirdPrepared/reselectInd/', // 是否需要重选产品
        submit: host + '/thirdPrepared/productSpecialInfo/submit', // 提交信息
        save: host + '/thirdPrepared/productSpecialInfo/save', // 保存信息,
        getBankList: host + '/bankCard/bankInfo/list', // 获取银行信息
        checkBank: host + '/bankCard/bankInfo/check', // 验证银行信息
        specialInfo: host + '/organization/specialInfo', // 获取特殊字段模板
        getIndustryCode: host + '/common/industryCode/', // 获取借款人行业下拉项
        getLoanTerm: host + '/common/loanTerm/', // 获取贷款期限下拉
        getLoanPurpose: host + '/common/loanPurposeCode/', // 获取贷款用途下拉
        getSpecialVal: host + '/thirdPrepared/specialInfoValues', // 切换产品时 重新给模板赋值
        getPricingPlanCode: host + '/thirdPrepared/pricingPlan/list/', // 获取定价方案下拉列表
        deleteSpecialValue: host + '/thirdPrepared/productSpecialInfo/delete/' // 删除特殊产品字段
      }
    }
  },
  solved: {
    getTableData: host + '/thirdPrepared/doneTask/list',
    getDoneTaskProduct: host + '/thirdPrepared/doneTaskProduct/list/'
  },
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

export {
  spareApi
};
