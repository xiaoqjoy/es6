import { fileCos } from "@/common/js/fileCos";
let host = 'api/cpms';
// let host2 = 'api/ftb'; // 文件平台
let host2 = fileCos.getFileHost() + "/ftb/api"; // 文件平台
let host3 = 'api/pm-requestredirect/BusinessMailPlatform'; // 邮件平台
let host4 = 'api/blri-bankloanrepayapi'; // 邮件配置
let host6 = 'api/ucss'; // http://10.20.0.4:8080;
// let host4 = 'http://10.21.0.86:8025'; // 影像平台
if (process.env.NODE_ENV !== 'production') {
  // host = 'http://DS-TS-0491:8080';
  // host = 'http://10.3.113.210:8080';
  // host = 'http://cpms.intdev.dsfdc.com:8080'; // 测试地址
  // host = 'http://dsapp13.intsit.dsfdc.com:8103';
  // host = 'http://dsapp13.intsit.dsfdc.com:8080/h5/api/cpms'; // sit环境
  // host = 'http://dsapp18.intuat.dsfdc.com/h5/api/cpms'; // uat环境
  // host2 = 'http://10.1.114.214:8113'; // 文件平台
  // host2 = 'http://dsapp17.dev.dashuf.com:8113';
  // host2 = 'http://dsapp13.intsit.dsfdc.com:8113';
  // host2 = 'http://dsapp13.intsit.dsfdc.com:8080/ftb/api';
  // host2 = 'http://dsapp18.intuat.dsfdc.com:8113';
  // host3 = 'http://10.1.105.135:8090'; // 邮件平台
  // host3 = 'http://10.21.0.23:8156'; // 邮件平台
  // host3 = 'http://dsapp13.intsit.dsfdc.com:8113'; // 邮件平台
  // host4 = 'http://10.1.114.198:8088'; // 邮件配置
  // host4 = 'http://dsapp13.intsit.dsfdc.com:8080/h5/api/blri-bankloanrepayapi'; // 邮箱配置
  // host4 = 'http://10.21.0.23:8139'; // 邮件配置
  // host = 'http://10.1.114.72:8080'; // 风险定价锁配置
  // host = 'http://dsapp13.intsit.dsfdc.com:8103'; // 风险定价锁配置测试地址
  // host = 'http://10.3.114.246:8080';
  // host = '/uat/api/cpms';
  // host2 = '/uat/api/ftb'; // 文件平台
  // host3 = '/uat/api/pm-requestredirect/BusinessMailPlatform'; // 邮件平台
  // host4 = '/uat/api/blri-bankloanrepayapi'; // 邮件配置
  // host = '/uat/api/cpms';
  // host6 = '/uat/api/ucss'; // http://10.20.0.4:8080;
  // host = '/uat/api/cpms'; // http://10.3.113.81
  // host = 'http://ds-ts-0531:8080';
  host = fileCos.getHost()[1];
  host6 = fileCos.getHost()[4];
}
const accountApi = {
  queryPartnerInfoList: host + '/partner/queryPartnerInfoList', // 获取合作机构
  multipleSelect: host + '/common/selection/all/params',
  queryPartnerInfoPageList: host + '/partner/queryPartnerInfoPageList', // 获取合作机构(分页)
  areaSelection: host + '/common/selection/all', // 公共类-操作原因
  Organizations: host6 + '/v1/UserAuthorizationSystem/Organizations', // 分公司
  newFile: host2 + "/ftb/v1/newfile", // 上传/文件
  idToUrls: host2 + '/ftb/v1/id-to-url', // 文件ID转换URL/文件总线对外接口
  getFileToImage: host + '/account/getFileToImage', // 下载文件上传影像平台
  sendEmail: host + '/account/sendPutoutEmail',
  productList: host + '/product/topBusinessType/list', // 一级产品
  // 业务处理进度
  bussiness_progress: {
    queryBusinessProgressInfo: host + '/account/queryBusinessProgressInfo', // 业务处理进度查询列表查询接口
    queryHisBusinessProgress: host + '/account/queryHisBusinessProgress', // 业务处理进度流转记录查询接口
    exportBusinessInfo: host + '/account/exportBusinessInfo', // 导出业务查询数据
    getAccountApproveStatus: host + '/account/getAccountApproveStatus', // 获取出账流程状态列举值（审批状态）
    getPrintLetter: host + '/account/getPrintLetter' // 担保确认函接口
    },
  // 保险业务处理
  insurance_manage: {
    queryInsuranceBusinessHis: host + '/account/queryInsuranceBusinessHis', // 保险业务处理-已处理查询接口
    queryInsuranceBusinessDeal: host + '/account/queryInsuranceBusinessDeal', // 保险业务处理-审批中查询接口
    saveAprInsuranceReceiptBatch: host + '/account/saveAprInsuranceReceiptBatch' // 保险业务处理-审批中-批量保险回执录入
  },
  // 系统对接异常
  system_docking_abnormal: {
    allexception: host + '/account/allexception', // 返回所有系统对接异常信息列表
    allexceptionByReq: host + '/account/allexceptionByReq', // 返回符合条件的系统对接异常信息
    updateById: host + '/account/updateById', // 软删除更新
    getSysIterfaceExceptionCode: host + '/account/getSysIterfaceExceptionCode' // 保存系统对接异常数据
  },
  // 合作方邮件查询
  partner_mail_inquiry: {
    getEmailList: host3 + "/api/dsmp/getEmailList.do", // 查询邮箱发送记录
    getReceiveEmailList: host3 + "/api/dsmp/getReceiveEmailList.do" // 查询邮箱接收记录
  },
  // 放款操作
  expenditure_manage: {
    queryPutoutPendingInfo: host + '/account/queryPutoutPendingInfo', // 出账管理待放款业务查询
    exportPutoutFile: host + '/account/exportPutoutFile', // 导出放款文件
    collaborate: host + '/product/collaborate/', // 通过业务模式编码获取合作机构
    dictionary: host + '/product/dictionary/CollaborateMode', // 产品工厂字典数据（一级产品：FirstProduct|合作机构：PartnerName|资金方：FundName|合作模式：BusinessModel）
    saveAprPutoutReceiptBatch: host + '/account/saveAprPutoutReceiptBatch', // 放款批量回执录入
    sendPutoutApprove: host + '/account/sendPutoutApprove', // 发送审批接口
    sendPutoutSupplementApprove: host + '/account/sendPutoutSupplementApprove', // 发送补件审批接口
    getCollaborateSendStatus: host + '/account/getCollaborateSendStatus', // 获取发送合作方的发送状态列举值
    sendPutoutLoanApprove: host + '/account/sendPutoutLoanApprove', // 发送银行放款
    sendPutoutOrderApprove: host + '/account/sendPutoutOrderApprove' // 发送放款指令
  },
  // 邮箱配置
  email_config: {
    queryLoanSendSet: host4 + '/api/queryLoanSendSet.do', // 邮箱配置查询接口
    addLoanSendSet: host4 + '/api/addLoanSendSet.do', // 邮箱配置增改接口
    deleteLoanSendSet: host4 + '/api/deleteLoanSendSet.do' // 邮箱配置删除接口
  },
  // 放款降额处理
  loan_derating: {
    queryProcessedReductionInfo: host + '/account/queryProcessedReductionInfo', // 已处理业务查询
    queryWaiteReductionInfo: host + '/account/queryWaiteReductionInfo', // 待处理业务查询
    receiveReductionApprove: host + '/account/receiveReductionApprove', // 降额审批反馈接口
    putoutReductionCommit: host + '/account/putoutReductionCommit' // 放款降额处理提交按钮
  },
  // 银行卡校验规则维护
  bankCard_check_rule_maintain: {
    bankCardCheckAll: host + '/account/bankCardCheck', // 获取全部的银行卡校验规则信息列表 GET
    bankCardCheck: host + '/account/bankCardCheck', // 根据合作机构编码获取银行卡校验规则信息列表 POST
    saveBankCardCheckInfo: host + '/account/saveBankCardCheckInfo', // 保存银行卡校验规则信息
    updateBankCardCheckInfo: host + '/account/updateBankCardCheckInfo', // 修改银行卡校验规则信息
    partnerList: host + '/product/partner/list', // 产品工厂--合作机构
    topBusinessType: host + '/product/topBusinessType/list' // 产品工厂--一级产品
  },
  // 风险定价锁配置
  pricing_lock_controller: {
    pricingLock_list: host + '/pricing/pricingLock/list', // 获取定价锁开关配置信息列表
    pricingLock_save: host + '/pricing/pricingLock/save', // 新增定价锁配置信息
    pricingLock_delete: host + '/pricing/pricingLock/delete', // 根据id删除定价锁配置信息
    pricingLock_update: host + '/pricing/pricingLock/update', // 根据id作为条件，修改定价锁配置信息
    common_subcompanies: host + '/common/subcompanies', // 获取分公司列表
    pricing_pricingLock: host + '/pricing' // 根据id获取定价锁配置信息
  },
  taxConfig: {
    // area_tax_organization_list: host + '/cpms/v1/tax-loan/area-tax-organization-list', // 获取区域税务机构列表
    // area_tax_organization_list: host + '/taxLoan/Organization/list'
    area_tax_organization_list: host + '/taxLoan/areaTaxOrganization/list', // 获取区域税务机构列表
    tax_loan_organization_list: host + '/taxLoan/Organization/list', // 获取税务接入下拉框下拉框
    tax_loan_area_save: host + '/taxLoan/areaTaxOrganization/info/save', // /taxLoan/areaTaxOrganization/info/save
    tax_loan_area_update: host + '/taxLoan/areaTaxOrganization/info/update', // /taxLoan/areaTaxOrganization/info/update
    tax_loan_area_del: host + '/taxLoan/areaTaxOrganization/info/del' // /taxLoan/areaTaxOrganization/info/del
  },
  f2fRemoteCfg: {
    cutoverTime: host + '/f2f/cutover/cfg'
  },
  autoAccount: {
    query: host + '/account/autoAllotAccount/config/query',
    productList: host + '/product/list',
    channelList: host + '/cpms/v1/marketing-management/innovate-channels/list',
    saveOrupdate: host + '/account/autoAllotAccount/config/saveOrupdate'
  }
};
export {
  accountApi
};
