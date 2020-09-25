import { fileCos } from "@/common/js/fileCos";
let host = "api/caes";
let host2 = fileCos.getFileHost() + "/ftb/api"; // 文件平台
let host3 = "api/cpms"; // 征信平台
// let host3 = "http://filestore1.intsit.dsfdc.com" // 一代文件平台
if (process.env.NODE_ENV !== 'production') {
  // host = "http://dsapp13.intsit.dsfdc.com:8080/h5/api/caes"; // sit
  // host = "http://dsapp135.sit.dashuf.com/h5/api/caes"; // sit3
  // host = "http://dsapp18.intuat.dsfdc.com/h5/api/caes"; // uat
  // host = "http://10.20.0.4:8080";
  // host = "http://10.3.113.182:8088"; // 许飞亚
  // host = "http://10.3.114.75:8088"; // 吴林燃
  host = "http://10.3.114.78:8080"; // 黄保华
  // host = "http://10.3.114.130:8080"; // 陈成
  // host = "http://10.3.113.179:8088"; // 樊鑫
  // host = "http://10.3.113.114:8088"; // 齐学庆
  // host = "http://10.3.114.154:8088"; // 魏学林
  // host3 = "http://10.3.114.198:8080"; // 程冠祎
  host2 = 'http://dsapp17.dev.dashuf.com:8113'; // 文件平台dev环境
  // host2 = 'http://dsapp13.intsit.dsfdc.com:8113'; // 文件平台sit环境
  // host2 = 'http://dsapp18.intuat.dsfdc.com:8113'; // 文件平台uat环境
}
const counterDealApi = {
  // 影像权限
  imagePermission: host3 + "/image/urge-receipt/permission",
  // 征信报告地址
  getCreditReport: host3 + "/api/v1/creditReport/url", // 获得征信报告url
  newFile: host2 + "/ftb/v1/newfile", // 上传/文件
  upload: host2 + "/ftb/v1/upload", // 上传/文件
  // 批量提前还款----------------------------------------------------------------
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
  // 批量单笔总单查询
  transRepayment: host + "/caes/webapi/batchRepayment/transRepayment",
  // 批量拆分明细导出
  loanAccountExportPayPlanLists: host + "/caes/webapi/loanAccount/exportPayPlanLists",
  // 批量空单保存
  batchSave: host + "/caes/webapi/batchSave",
  // 批量单笔删除
  batchRepaymentDeleteRepay: host + "/caes/webapi/batchRepayment/deleteRepay",
  // 批量单提交
  batchRepaymentSubmitReview: host + "/caes/webapi/batchRepayment/submitReview",
  // 文件下载保存 批量单笔
  batchRepaymentFileSave: host + "/caes/webapi/batchRepayment/fileSave",
  // 文件下载保存 批量拆分
  batchSplitRepaymentFileSave: host + "/caes/webapi/batchSplitRepayment/fileSave",
  // 文件下载保存 费用收取 /caes/webapi/partnerFee/fileSave
  partnerFeeFileSave: host + "/caes/webapi/partnerFee/fileSave",
  // 批量单笔复核退回
  batchRepaymentReviewReturn: host + "/caes/webapi/batchRepayment/reviewReturn",
  // 批量单笔复核记账
  batchRepaymentBookkeep: host + "/caes/webapi/batchRepayment/bookkeep",
  // 费用收取复核记账
  partnerFeeBookkeep: host + "/caes/webapi/partnerFee/bookkeep",
  // 批量单笔明细
  batchRepaymentBackBill: host + "/caes/webapi/batchRepayment/backBill",
  // 第四批优化-批量单笔明细
  queryBatchSplitRepaymentDetails: host + "/caes/webapi/queryBatchSplitRepaymentDetails",
  // 提前还款---------------------------------------------------------------------
  // 提前还款-预约查询
  prepaymentList: host + "/caes/webapi/prepaymentList",
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
  buyBackAccounting: host + "/caes/webapi/buyBack/accounting"
};

export {
  counterDealApi
};
