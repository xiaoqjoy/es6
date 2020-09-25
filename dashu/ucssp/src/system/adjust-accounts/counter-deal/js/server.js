/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 09:47:23
 * @LastEditTime: 2019-08-20 17:38:08
 * @LastEditors: Please set LastEditors
 */
import { fileCos } from "@/common/js/fileCos";
let host = "api/caes";
let host2 = fileCos.getFileHost() + "/ftb/api"; // 文件平台
let host3 = "api/cpms"; // 征信平台
// let host4 = "api/bdcs"; // 银企直连
// let host3 = "http://filestore1.intsit.dsfdc.com" // 一代文件平台
if (process.env.NODE_ENV !== 'production') {
  // host = "http://dsapp13.intsit.dsfdc.com:8080/h5/api"; // sit
  host = fileCos.getHost()[0] + "/caes"; // sit3
  // host = "http://111.230.162.174:4180/ucssp/api/caes"; // sit3
  // host = 'http://10.3.113.228:8088'; // ST3环境
  // host = 'http://10.3.113.196:8088';
  // host = "http://dsapp18.intuat.dsfdc.com/h5/api/caes"; // uat
  // host = "http://10.20.0.4:8080";
  // host = "http://10.3.113.70:8088"; // 许飞亚
  // host = "sit3/api/caes";
  // host = "http://10.3.114.75:8088"; // 吴林燃
  // host = "http://10.3.114.118:8088"; // 黄保华
  // host = "http://10.3.114.130:8080"; // 陈成
  // host = "http://10.3.114.29:8088"; // 樊鑫
  // host = "http://10.3.113.114:8088"; // 齐学庆
  // host = "http://10.3.113.138:8088"; // 魏学林
  // host3 = "http://10.3.114.198:8080"; // 程冠祎
  // host = "http://10.3.114.104:8088"; // 唐佳林
  // host2 = 'http://dsapp17.dev.dashuf.com:8113'; // 文件平台dev环境
  // host2 = 'http://dsapp13.intsit.dsfdc.com:8113'; // 文件平台sit环境
  // host2 = 'http://dsapp18.intuat.dsfdc.com:8113'; // 文件平台uat环境
  host2 = fileCos.getFileHost() + "/ftb/api"; // 文件平台
  host3 = fileCos.getHost()[0] + "/cpms"; // 征信平台
}
const counterDealApi = {
  // 减免冲销-----------------
  // xiezhangrui
  // 单笔罚息复利列表   冲销发起查询
  queryPayInteFineAdjustList: host + "/caes/webapi/queryPayInteFineAdjustList",
  // 单笔罚息复利明细
  queryPayInteFineBackBill: host + "/caes/webapi/queryPayInteFineBackBill",
  // 单笔罚息复利引入
  importPayInteFineAdjustList: host + "/caes/webapi/importPayInteFineAdjustList",
  // 单笔罚息复利计算
  calPayInteFine: host + "/caes/webapi/calPayInteFine",
  // 单笔罚息复利制单
  createBackBill: host + "/caes/webapi/createBackBill",
  // 单笔罚息复利删除
  PayInteFineAdjustDelete: host + "/caes/webapi/PayInteFineAdjustDelete",
  // 单笔罚息复厉记账
  PayInteFineAdjustAccount: host + "/caes/webapi/PayInteFineAdjustAccount",
  // 单笔逾期减免引入
  reductionPlans: host + "/caes/webapi/reductionPlans",
  // 单笔逾期减免制单  //冲销保存
  reversalSave: host + "/caes/webapi/reversal/save",
  // 单笔逾期减免制单
  reductionSave: host + "/caes/webapi/reductionSave",
  // 单笔逾期减免记账
  webapiAccounting: host + "/caes/webapi/accounting",
  // 单笔逾期减免记账
  loanAccountQueryBillLists: host + "/caes/webapi/queryBackBillList",
  // zhouxiaozheng
  // 批量罚息复利记账
  batchPayInteFineAdjustAccount: host + '/caes/webapi/batchPayInteFineAdjustAccount',
  // 批量罚息复利编辑
  batchPayInteFineAdjustEditor: host + '/caes/webapi/batchPayInteFineAdjustEditor',
  // 冲销引入
  reversalIntroduce: host + '/caes/webapi/reversal/introduce',
  // 冲销记账
  reversalbookKeep: host + '/caes/webapi/reversal/bookKeep',
  // 批量罚息复利列表
  batchQueryPayInteFineAdjustList: host + '/caes/webapi/batchQueryPayInteFineAdjustList',
  // 批量罚息复利明细
  batchPayInteFineAdjustDetail: host + '/caes/webapi/batchPayInteFineAdjustDetail',
  // 批量罚息复利导入校验
  batchPayInteFineAdjustCheck: host + '/caes/webapi/batchPayInteFineAdjustCheck',
  // 批量罚息复利导入
  batchPayInteFineAdjustImport: host + '/caes/webapi/batchPayInteFineAdjustImport',
  // 减免冲销-----------------
  // 影像权限
  imagePermission: host3 + "/image/urge-receipt/permission",
  // 征信报告地址
  getCreditReport: host3 + "/api/v1/creditReport/url", // 获得征信报告url
  newFile: host2 + "/ftb/v1/newfile", // 上传/文件
  upload: host2 + "/ftb/v1/upload", // 上传/文件
  // 贷款咨询-提前还款试算
  prepaymentPreTrial: host + "/caes/webapi/prepayment/preTrial",
  // 批量提前还款----------------------------------------------------------------
  // 提前还款代办渠道校验
  prepaymentCheckChannel: host + "/caes/webapi/prepayment/checkChannel",
  // 提前还款代办金额校验
  prepaymentCheckAmt: host + "/caes/webapi/prepayment/checkAmt",
  // 批量提前还款总单查询
  batchPrepaymentTransRepayment: host + "/caes/webapi/batchPrepayment/transRepayment",
  // 批量提前还款明细
  batchPrepaymentDetail: host + "/caes/webapi/batchPrepayment/detail",
  // 批量提前还款文件保存
  batchPrepaymentFileSave: host + "/caes/webapi/batchPrepayment/fileSave",
  // 批量提前还款记账
  batchPrepaymentFileAcct: host + "/caes/webapi/batchPrepayment/acct",
  // 提前还款待复核-详情修改保存
  prepaymentSaveDetail: host + "/caes/webapi/prepayment/saveDetail",
  // 提前还款试算 - 列表
  prepaymentTrialQuery: host + "/caes/webapi/prepayment/trialQuery",
  // 扣款管理------------------------------------------------------------------------------
  // 批量扣款查询列表
  deductManagementBatchDeductList: host + "/caes/webapi/deductManagement/BatchDeductList",
  // 批量扣款导入模板校验
  deductManagementBatchCheckExcelDeduct: host + "/caes/webapi/deductManagement/BatchCheckExcelDeduct",
  // 批量扣款导入
  deductManagementBatchDeductFileSave: host + "/caes/webapi/deductManagement/BatchDeductFileSave",
  // 批量扣款删除
  deductManagementBatchDeductDelete: host + "/caes/webapi/deductManagement/BatchDeductDelete",
  // 批量扣款 - 扣款
  deductManagementBatchDeductPayment: host + "/caes/webapi/deductManagement/BatchDeductPayment",
  // 批量扣款 - 扣款状态查询
  deductManagementQureyBatchDeductStatus: host + "/caes/webapi/deductManagement/QureyBatchDeductStatus",
  // 案件状态下拉
  PhaseNameList: host + "/caes/webapi/PhaseNameList",
  // 扣款渠道查询列表
  QueryDeductChannelList: host + "/caes/webapi/deductManagement/QueryDeductChannelList",
  // 扣款渠道手动变更校验
  BatchCheckDeductChannel: host + "/caes/webapi/deductManagement/BatchCheckDeductChannel",
  // 扣款渠道批量导入更新处理
  BatchUpdateExcelDeductChannel: host + "/caes/webapi/deductManagement/BatchUpdateExcelDeductChannel",
  // 扣款渠道批量勾选变更
  BatchUpdateDeductChannel: host + "/caes/webapi/deductManagement/BatchUpdateDeductChannel",
  // 扣款渠道下拉
  queryDeductChannelLists: host + "/caes/webapi/queryDeductChannelLists",
  // 扣款渠道下拉----新增
  deductChannelLists: host + "/caes/webapi/deductChannelLists",
  // 扣款银行下拉
  BankCodeNameList: host + "/caes/webapi/BankInfoHoList",
  // 分公司下拉
  BranchNameList: host + "/caes/webapi/BranchNameList",
  // 合作模式下拉
  CollaborateNameList: host + "/caes/webapi/CollaborateNameList",
  // 合作方下拉
  FundOrgNameList: host + "/caes/webapi/FundOrgNameList",
  // 资金方下拉
  LineIdNameList: host + "/caes/webapi/LineIdNameList",
  // 扣款渠道导入文件校验
  BatchCheckExcelDeductChannel: host + "/caes/webapi/deductManagement/BatchCheckExcelDeductChannel",
  // 还款卡变更列表支持分页
  RepayCardChangeList: host + "/caes/webapi/deductManagement/RepayCardChangeList",
  // 还款卡变更--新增
  RepayCardChangeSave: host + "/caes/webapi/deductManagement/RepayCardChangeSave",
  // 还款卡变更--引入
  RepayCardChangeImport: host + "/caes/webapi/deductManagement/RepayCardChangeImport",
  // 还款卡变更--删除
  RepayCardChangeDelete: host + "/caes/webapi/deductManagement/RepayCardChangeDelete",
  // 银行预留手机号管理支持分页
  BanksReservePhoneList: host + "/caes/webapi/deductManagement/BanksReservePhoneList",
  // 银行预留手机号修改
  BanksReservePhoneSave: host + "/caes/webapi/deductManagement/BanksReservePhoneSave",
  // 银行预留手机号 - 批量导入文件校验
  BatchCheckExcelBanksReservePhone: host + "/caes/webapi/deductManagement/BatchCheckExcelBanksReservePhone",
  // 银行预留手机号 - 批量导入
  BatchUpdateExcelBanksReservePhone: host + "/caes/webapi/deductManagement/BatchUpdateExcelBanksReservePhone",
  // 单笔代扣查询列表
  deductManagementSingleDeductList: host + "/caes/webapi/deductManagement/SingleDeductList",
  // 单笔扣款保存
  deductManagementSingleDeductAmountUpdate: host + "/caes/webapi/deductManagement/SingleDeductAmountUpdate",
  // 单笔扣款 - 扣款总额计算
  CalSingleDeductAmount: host + "/caes/webapi/deductManagement/CalSingleDeductAmount",
  // 催收代扣列表查询
  CollectionPaymentList: host + "/caes/webapi/deductManagement/CollectionPaymentList",
  // 催收代扣删除
  CollectionPaymentDelete: host + "/caes/webapi/deductManagement/CollectionPaymentDelete",
  // 催收代扣文件校验
  BatchCheckExcelCollectionPayment: host + "/caes/webapi/deductManagement/BatchCheckExcelCollectionPayment",
  // 催收代扣文件导入
  BatchUpdateExcelCollectionPayment: host + "/caes/webapi/deductManagement/BatchUpdateExcelCollectionPayment",
  // 一般还款------------------------------------------------------------------------------
  // 获取用户名和时间
  callUserID: host + "/caes/webapi/callUserID",
  // 放款查询接口
  LoanSearch: host + "/caes/webapi/queryPutoutList",
  // 单笔还款查询总单
  SingleRepayment: host + "/caes/webapi/queryLoanTransInfoList",
  // 渠道列表
  ChannelList: host + "/caes/webapi/queryChannelList",
  // 一般还款应还的还款计划查询  -- 引入
  RepayPlanList: host + "/caes/webapi/queryRepayPlanList",
  // 单笔一般还款引入点击确定查询接口  -- 引入
  PlanDetails: host + "/caes/webapi/planDetails",
  // 生成业务编码
  CreateBusinessNumbers: host + "/caes/webapi/createBusinessNumbers",
  // 一般还款保存按钮接口
  SaveRepayment: host + "/caes/webapi/saveRepayment",
  // 查询子单详情
  BackBillList: host + "/caes/webapi/queryBackBillList",
  // 单笔公共校验数据在途
  checkData: host + "/caes/webapi/checkData",
  thirdDeductCheck: host + "/caes/webapi/thirdDeductCheck", // 核算系统-单笔代扣-单笔公共校验数据在途-接口替换
  // 一般还款总单删除(支持单笔/批量)
  deleteRepay: host + "/caes/webapi/deleteRepay",
  // 单笔还款提交复核（支持批量/单笔）
  submitReview: host + "/caes/webapi/submitReview",
  // 单笔还款复核退回（支持批量/单笔）
  reviewReturn: host + "/caes/webapi/reviewReturn",
  // 单笔还款记账
  transPayInfo: host + "/caes/webapi/transPayInfo",
  // 拆分还款引入查询接口  -- 引入
  SplitRepaymentLists: host + "/caes/webapi/SplitRepaymentLists",
  // 拆分还款新增保存接口  -- 发起 - 新增
  splitRepaymentSave: host + "/caes/webapi/splitRepayment/save",
  // 批量单笔总单查询 及代垫本息维护功能总单查询
  transRepayment: host + "/caes/webapi/batchRepayment/transRepayment",
  // 批量拆分明细导出
  loanAccountExportPayPlanLists: host + "/caes/webapi/loanAccount/exportPayPlanLists",
  // 批量空单保存
  batchSave: host + "/caes/webapi/batchSave",
  // 批量单笔删除 及代垫本息维护功能删除
  batchRepaymentDeleteRepay: host + "/caes/webapi/batchRepayment/deleteRepay",
  // 批量单提交 及代垫本息维护功能提交
  batchRepaymentSubmitReview: host + "/caes/webapi/batchRepayment/submitReview",
  // 文件下载保存 批量单笔
  batchRepaymentFileSave: host + "/caes/webapi/batchRepayment/fileSave",
  // 文件下载保存 批量拆分
  batchSplitRepaymentFileSave: host + "/caes/webapi/batchSplitRepayment/fileSave",
  // 文件下载保存 费用收取 /caes/webapi/partnerFee/fileSave
  partnerFeeFileSave: host + "/caes/webapi/partnerFee/fileSave",
  // 批量单笔复核退回 及代垫本息维护功能退回
  batchRepaymentReviewReturn: host + "/caes/webapi/batchRepayment/reviewReturn",
  // 批量单笔复核记账 及代垫本息维护功能记账
  batchRepaymentBookkeep: host + "/caes/webapi/batchRepayment/bookkeep",
  // 费用收取复核记账
  partnerFeeBookkeep: host + "/caes/webapi/partnerFee/bookkeep",
  // 批量单笔明细 及代垫本息维护功能明细
  batchRepaymentBackBill: host + "/caes/webapi/batchRepayment/backBill",
  // 第四批优化-批量单笔明细
  queryBatchSplitRepaymentDetails: host + "/caes/webapi/queryBatchSplitRepaymentDetails",
  // 提前还款---------------------------------------------------------------------
  // 提前还款-预约查询
  prepaymentList: host + "/caes/webapi/prepaymentList",
  processQuery: host + "/caes/webapi/prepayment/processQuery",
  // 提前还款-判断是否上传影像
  prepaymentCheckUploan: host + "/caes/webapi/prepayment/checkUploan",
  // 提前还款-预约引入
  prepaymentImport: host + "/caes/webapi/prepayment/import",
  // 提前还款-开始试算
  prepaymentTrial: host + "/caes/webapi/prepayment/trial",
  // 提前还款-开始试算保存
  savePrepayment: host + "/caes/webapi/savePrepayment",
  // 提前还款-删除
  deletePrepaymentn: host + "/caes/webapi/deletePrepaymentn",
  // 提前还款-提交
  submitPrepayment: host + "/caes/webapi/submitPrepayment",
  // 提前还款-待办查询
  pendingPrepay: host + "/caes/webapi/prepayment/pending/prepay",
  // 提前还款-待办试算
  pendingTrial: host + "/caes/webapi/prepayment/pending/trial",
  // 提前还款-待办保存
  pendingSave: host + "/caes/webapi/prepayment/pending/save",
  // 提前还款-待办删除
  pendingRemove: host + "/caes/webapi/prepayment/pending/remove",
  // 提前还款-待复核记账
  reviewAcct: host + "/caes/webapi/prepayment/review/acct",
  // 提前还款-待复核详情
  reviewDetail: host + "/caes/webapi/prepayment/review/detail",
  // 提前还款-待复核退回
  rollback: host + "/caes/webapi/prepayment/review/back",
  // 提前还款-退回任务 退回原因
  rollbackReason: host + "/caes/webapi/prepayment/rollback/reason",
  // 查询线上列表
  prepaymentOnLineList: host + "/caes/webapi/prepayment/onLineList",
  // 发送邮件
  prepaymentSendEMail: host + "/caes/webapi/prepayment/sendEMail",
  // 打印预览
  viewApplication: host + "/caes/webapi/prepayment/viewApplication",
  // 代偿--------------------------------------------------------------------------
  // 计算逾期总额
  checkTrialSave: host + "/caes/webapi/buyBack/checkTrialSave",
  // 代偿申请列表 /caes/webapi/buyBack/queryList
  buybackQueryList: host + "/caes/webapi/buyBack/queryList",
  // 代偿申请新增
  buyBackQueryCustomerInfo: host + "/caes/webapi/buyBack/queryCustomerInfo",
  // 代偿发起-新增-保存
  buyBackSave: host + "/caes/webapi/buyBack/save",
  // 代偿(发起，减免，转让)-校验是否存在交易
  buyBackIsExist: host + "/caes/webapi/buyBack/isExist",
  // 代偿（发起，减免，收回）-删除
  buyBackDelete: host + "/caes/webapi/buyBack/delete",
  // 代偿（发起，收回，收回-复核，减免-初审，减免-复核）提交
  buyBackSubmitToFinancialAudit: host + "/caes/webapi/buyBack/submitToFinancialAudit",
  // 代偿发起-退回
  buyBackReviewReturn: host + "/caes/webapi/buyBack/reviewReturn",
  // 代偿发起-发起扣款
  buyBackDeduct: host + "/caes/webapi/buyBack/deduct",
  // 代偿发起-查询扣款状态
  buyQueryDeductionStatus: host + "/caes/webapi/buyBack/queryDeductionStatus",
  // 代偿发起-记账
  buyBackBookkeep: host + "/caes/webapi/buyBack/bookkeep",
  // 代偿发起-测算
  buyBackTrial: host + "/caes/webapi/buyBack/trial",
  // 代偿发起-测算-保存
  buyBackTrialSave: host + "/caes/webapi/buyBack/trialSave",
  // 代偿发起-财务初审-提交
  buyBackSubmitToReview: host + "/caes/webapi/buyBack/submitToReview",
  // 代偿发起-财务初审-批量导出
  exportTrialList: host + "/caes/webapi/buyBack/exportTrialList",
  // 代偿发起-财务初审-批量导入验证
  batchCheckExcelBuyBackTrial: host + "/caes/webapi/buyBack/batchCheckExcelBuyBackTrial",
  // 代偿发起-财务初审-批量导入更新
  batchUpdateExcelBuyBackTrial: host + "/caes/webapi/buyBack/batchUpdateExcelBuyBackTrial",
  // 代偿收回申请
  BuybackRecoverInfos: host + "/caes/webapi/buyBackRecoverInfos",
  // 代偿收回申请-新增
  buyBackRecoverSave: host + "/caes/webapi/buyBack/buyBackRecoverSave",
  // 代偿收回-测算
  recoverPayTrail: host + "/caes/webapi/recoverPayTrail",
  // 代偿收回-还款详情
  payBuybackDetails: host + "/caes/webapi/payBuybackDetails",
  // 批量代偿发起文件校验
  CheckBuybackFile: host + "/caes/webapi/CheckBuybackFile",
  // 批量代偿发起文件保存
  CheckBuybackFileSave: host + "/caes/webapi/buybackFileSave",
  // 代偿回收 - 新增保存校验数据是否在途
  recoverPayinTransit: host + "/caes/webapi/buyBack/recoverPayinTransit",
  // 代偿收回 - 记账
  buyBackAccounting: host + "/caes/webapi/buyBack/accounting",
  // 代垫后本息维护文件导入
  advancedCorpInterestMaintenanceSave: host + "/caes/webapi/batchRepayment/advancedCorpInterestMaintenanceSave",
  // 代偿客户扣款配置-列表展示
  deductBuybackLists: host + "/caes/webapi/deductBuybackLists",
  // 代偿客户扣款配置-文件导入
  importDeductBuybackFile: host + "/caes/webapi/thirdDeductFileImport",
  // 代偿客户扣款配置-批量参与批扣
  deductBuybackEdit: host + "/caes/webapi/deductBuybackEdit",
  // 代偿客户扣款配置-删除
  deductBuybackDel: host + "/caes/webapi/deductBuybackDel",
  // 财务配置--------------------------------------------------------------------------
  // 封账管理列表
  closeAccountList: host + "/caes/webapi/easPushList",
  // 封账新增/修改
  closeAccountSave: host + "/caes/webapi/easPushSave",
  // 封账校验
  closeAccountCheck: host + "/caes/webapi/easPushCheck",
  // 封账删除校验
  closeAccountDeleteCheck: host + "/caes/webapi/easPushDelCheck",
  // 封账删除任务
  closeAccountDeleteTask: host + "/caes/webapi/easPushRemoveTask",

  webQuerySubAccountList: host + "/caes/webapi/webQuerySubAccountList",
  distributionSubAcc: host + "/caes/webapi/distributionSubAcc",
  webSendSubAccountMessage: host + "/caes/webapi/webSendSubAccountMessage",
  webCheckApplySubAccount: host + "/caes/webapi/webCheckApplySubAccount",

  configSubAccount: host + "/caes/webapi/configSubAccount",
  querySubAccountTransInfoLocal: host + "/caes/webapi/querySubAccountTransInfoLocal",
  querySubAccountTransInfoBank: host + "/caes/webapi/querySubAccountTransInfoBank",
  // 拨打电话
  phonecheckCall: host + "/apr/taskDetail/phonecheck/call", // 电核勾选弹框里的拨打电话
  buybackBreakBatchCheck: host + "/caes/webapi/buyBack/buybackBreakBatchCheck",
  buybackBreakBatchSave: host + "/caes/webapi/buyBack/buybackBreakBatchSave"
};

const changeBank = {
  query: host + '/caes/webapi/simpleRepayCardChange/query',
  detail: host + '/caes/webapi/simpleRepayCardChange/detail',
  import: host + '/caes/webapi/simpleRepayCardChange/import',
  addQuery: host + '/caes/webapi/simpleRepayCardChange/addQuery',
  add: host + '/caes/webapi/simpleRepayCardChange/add',
  bankQuery: host + '/caes/webapi/simpleRepayCardChange/bankQuery'

};

const eas = {
  query: host + '/caes/webapi/queryListByCaesEasMap',
  isDisableCaesEasMap: host + '/caes/webapi/isDisableCaesEasMap',
  createdCaesEasMap: host + '/caes/webapi/createdCaesEasMap',
  updateCaesEasMap: host + '/caes/webapi/updateCaesEasMap',
  exportAllCaesEasMap: host + '/caes/webapi/exportAllCaesEasMap'
};

const prepayment = {
  // 客户信息查询
  queryCustInfo: host + '/caes/webapi/prepayment/onLine/queryCustInfo',
  cancelOrder: host + '/caes/webapi/prepayment/onLine/cancelOrder',
  subToPendFlow: host + '/caes/webapi/prepayment/onLine/subToPendFlow',
  updateRemark: host + '/caes/webapi/prepayment/onLine/updateRemark',
  callPhone: host + '/caes/webapi/prepayment/onLine/call',
  cancelCustomer: host + '/caes/webapi/prepayment/onLine/cancelCustomer',
  queryRecording: host + '/caes/webapi/prepayment/onLine/queryRecording',
  saveDetail: host + '/caes/webapi/prepayment/saveDetail',
  subStatusFlow: host + '/caes/webapi/prepayment/onLine/subStatusFlow',
  queryDetailInfoByTrial: host + '/caes/webapi/prepayment/onLine/queryDetailInfoByTrial'
};

// 提前还款减免
const prepaymentBreak = {
  queryFlowStatus: host + '/caes/webapi/prepaymentBreak/queryFlowStatus',
  queryRefLoan: host + '/caes/webapi/prepaymentBreak/queryRefLoan',
  queryRefDetail: host + '/caes/webapi/prepaymentBreak/queryRefDetail',
  queryBreakDetail: host + '/caes/webapi/prepaymentBreak/queryBreakDetail',
  processFlow: host + '/caes/webapi/prepaymentBreak/processFlow',
  saveInitFlow: host + '/caes/webapi/prepaymentBreak/saveInitFlow',
  updateBreakInfo: host + '/caes/webapi/prepaymentBreak/updateBreakInfo',
  bookBatch: host + '/caes/webapi/prepaymentBreak/bookBatch'
};

export {
  counterDealApi,
  changeBank,
  eas,
  prepayment,
  prepaymentBreak
};
