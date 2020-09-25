import { fileCos } from "@/common/js/fileCos";
let host = "api/caes";
let host2 = fileCos.getFileHost() + "/ftb/api"; // 文件平台
let host1 = "api/caes";
if (process.env.NODE_ENV !== 'production') {
  // host = "http://10.3.113.102:8088"; // 许飞亚
  // host = "http://10.3.114.90:8088"; // 吴林燃
  // host = "http://dsapp18.intuat.dsfdc.com/h5/api/caes";
  // host1 = "http://dsapp13.intsit.dsfdc.com:8112"; // 拨备
  // host = host1 = "api/caes";
}
const checkingApi = {
  newFile: host2 + "/ftb/v1/newfile", // 上传/文件
  // 案件状态下拉
  PhaseNameList: host + "/caes/webapi/PhaseNameList",
  // 查询贷款台账
  LoanSearch: host + "/caes/webapi/loanAccount/queryBalanceLists",
  // 台账还款计划导出
  LoanSearchaaa: host + "/caes/webapi/loanAccount/exportPayPlanLists",
  // 台账借据信息查询
  LoanSearchh: host + "/caes/webapi/loanAccount/querySingleLoanBalance",
  // 台账交易明细查询
  LoanSearchw: host + "/caes/webapi/loanAccount/queryBillLists",
  // 台账交易明细分录信息
  LoanSearchk: host + "/caes/webapi/loanAccount/queryLedgerDetailLasByBillNo",
  // 台账交易总单查询
  LoanSearchz: host + "/caes/webapi/loanAccount/queryleLoanTransInfoLists",
  // 台账交易总单明细查询
  LoanSearchzm: host + "/caes/webapi/advancePayment/queryBackBill",
  // 台账交易总单查询分录详情
  LoanSearchi: host + "/caes/webapi/loanAccount/ledgerDetailsByLoanTrans",
  // 台账交易财务科目余额信息列表查询
  LoanSearcha: host + "/caes/webapi/loanAccount/queryLedgerGeneralFin",
  // 台账交易财务科目余额信息分录详情列表查询
  LoanSearchaa: host + "/caes/webapi/loanAccount/queryLedgerDetailFin",
  // 台账交易贷款科目余额信息列表查询
  LoanSearchb: host + "/caes/webapi/loanAccount/queryLedgerGeneralLas",
  // 台账交易贷款科目余额信息分录详情列表查询
  LoanSearchba: host + "/caes/webapi/loanAccount/queryLedgerDetailLas",
  // 台账还款计划查询
  LoanSearchc: host + "/caes/webapi/loanAccount/queryPayPlanLists",
  // 代垫（单笔垫付还款发起,复核,完成列表查询接口）
  SingleRepayment: host + "/caes/webapi/advancePayment/queryLoanTransInfo",
  // 代垫（批量垫付还款发起,复核,完成列表查询接口）
  SingleRepaymenta: host + "/caes/webapi/batchRepayment/transRepayment",
  // 代垫（批量垫付文件流操作保存接口）
  SingleRepaymentaa: host + "/caes/webapi/batchAdvancePayment/fileSave",
  // 代垫（单笔垫付还款发起，复核，完成明细接口）
  ChannelList: host + "/caes/webapi/queryBackBillList",
  // 代垫（批量垫付还款发起，复核，完成明细接口）
  ChannelLista: host + "/caes/webapi/batchRepayment/backBill",
  // 代垫（单笔代垫还款发起的新增接口）
  RepayPlanList: host + "/caes/webapi/advancePayment/create",
  // 代垫（单笔代垫还款发起的新增保存数据检验接口）
  RepayPlanLih: host + "/caes/webapi/checkAdvance",
  // 代垫（批量代垫还款发起的新增接口）
  RepayPlanLista: host + "/caes/webapi/batchSave",
  // 代垫（批量代垫还款发起的新增获取用户ID接口）
  RepayPlanListb: host + "/caes/webapi/callUserID",
  // 代垫（单笔代垫还款发起的新增页面的交易号接口）
  PlanDetails: host + "/caes/webapi/createBusinessNumbers",
  // 代垫（单笔代垫还款发起的新增页面的记账渠道接口）
  CreateBusinessNumbers: host + "/caes/webapi/queryChannelList",
  //  代垫（单笔代垫还款发起的新增页面的引入页面的查询列表接口）
  SaveRepayment: host + "/caes/webapi/advancePayment/queryRepayPlan",
  //  代垫（单笔代垫还款发起的新增页面的引入页面的点击确定查询接口）
  BackBillList: host + "/caes/webapi/planDetails",
  //  代垫（单笔代垫还款发起页面的删除接口）
  deleteRepay: host + "/caes/webapi/advancePayment/deleteLoanTransInfo",
  //  代垫（批量代垫还款发起页面的删除接口）
  deleteRepaya: host + "/caes/webapi/batchRepayment/deleteRepay",
  //  代垫（单笔代垫还款发起页面的提交接口）
  submitReview: host + "/caes/webapi/advancePayment/reviewSubmit",
  //  代垫（批量代垫还款发起页面的提交接口）
  submitReviewa: host + "/caes/webapi/batchRepayment/submitReview",
  //  代垫（单笔代垫还款复核页面的退回接口）
  reviewReturn: host + "/caes/webapi/advancePayment/reviewBack",
  //  代垫（批量代垫还款复核页面的退回接口）
  reviewReturna: host + "/caes/webapi/batchRepayment/reviewReturn",
  // 代垫（单笔代垫还款复核页面的记账接口）
  transPayInfo: host + "/caes/webapi/advancePayment/bookkeep",
  // 代垫（批量代垫还款复核页面的记账接口）
  transPayInfoa: host + "/caes/webapi/batchAdvancePayment/bookkeep",
  // 代偿（代偿减免申请查询列表）
  transPayInfob: host + "/caes/webapi/buyBack/queryBuyBackFreeList",
  // 代偿（代偿减免申请新增查询）
  transPayInfoc: host + "/caes/webapi/buyBack/queryFreePayInfo",
  // 代偿（代偿减免申请新增保存）
  transPayInfod: host + "/caes/webapi/buyBack/addFreePay",
  // 代偿（代偿减免申请删除）
  transPayInfoe: host + "/caes/webapi/buyBack/delete",
  // 代偿（代偿减免申请提交）
  transPayInfof: host + "/caes/webapi/buyBack/submitToFinancialAudit",
  // 代偿（代偿减免财务初审编辑保存）
  transPayInfog: host + "/caes/webapi/buyBack/freePayEditSave",
  // 代偿（代偿减免财务初审退回接口）
  transPayInfoh: host + "/caes/webapi/buyBack/reviewReturn",
  // 代偿（代偿减免财务初审提交接口）
  transPayInfoi: host + "/caes/webapi/buyBack/submitToFinancialAudit",
  // 代偿（代偿减免记账接口）
  transPayInfofa: host + "/caes/webapi/buyBack/freePayBookkeep",
  // 代偿（代偿转让申请列表接口）
  transPay: host + "/caes/webapi/buyBack/buyBackTransfer",
  // 代偿（代偿转让申请新增查询接口）
  transPaya: host + "/caes/webapi/buyBack/queryCustomerInfo",
  // 代偿（代偿转让申请新增保存接口）
  transPayb: host + "/caes/webapi/buyBack/buyBackTransferSave",
  // 代偿（代偿转让记账接口）
  transPayk: host + "/caes/webapi/buyBack/transferBookkeep",
  // 代偿（代偿转让文件检验）
  transPayd: host + "/caes/webapi/CheckBuybackFile",
  // 代偿（代偿转让文件保存接口）
  transPayc: host + "/caes/webapi/buybackFileSave",
  // 代偿（代偿转让检验数据接口）
  transPaye: host + "/caes/webapi/buyBack/checkBuyBackTransfer",
  // 代偿（代偿减免检验接口）
  transPayg: host + "/caes/webapi/buyBack/checkFreePayBuy",
  // 拨备（减值准备费用映射关系列表接口）
  queryPrivisionConfigList: host1 + "/caes/webapi/privisionConfig/queryPrivisionConfigList",
  // 拨备（减值准备费用映射关系列表接口）
  privisionConfig_update: host1 + "/caes/webapi/privisionConfig/update",
  // 拨备（科目费用映射列表接口）
  queryImpairmentFeeTypeMapList: host1 + "/caes/webapi/impairmentFeeTypeMap/queryImpairmentFeeTypeMapList",
  // 拨备（科目费用映射获取费用类型接口）
  financeFeeType: host1 + "/caes/webapi/impairmentFeeTypeMap/financeFeeType",
  // 拨备（科目费用映射编辑接口）
  update: host1 + "/caes/webapi/impairmentFeeTypeMap/update",
  // 拨备（科目费用映射导出接口）
  export: host1 + "/caes/webapi/impairmentFeeTypeMap/export"
};

export {
  checkingApi
};
