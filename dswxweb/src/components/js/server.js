let host = "api/dswx/dswx";
if (process.env.NODE_ENV !== 'production') {
  // host = "http://dswxuat.dashuf.com/dswx";  // uat接口
  // host = 'http://10.3.114.87:8080/dswx' // 何源的本地地址接口
  // host = 'http://wx-dsjf.sit.dashuf.com/dswx' // sit接口
  host = 'http://111.230.162.174:4180/dswxweb/api/dswx/dswx' // sit接口 
  // host = 'http://10.3.113.77:8080/dswx' // 吴淑文本地接口
  // host = 'http://10.21.0.8:8080/dswx/'
}

const laappApi = {
  // 获取图形验证码
  getImgCode: host + "/refund/getImageCode.do",
  // 微信公众号发送验证码
  sendCode: host + "/refund/sendsmg.do",
  // 微信公众号登陆
  accountLogin: host + "/refund/login.do",
  // 我的贷款
  myloanInterface: host + "/refund/loan.do",
  // 还款计划
  repaymentSchedule: host + "/refund/plan/show.do",
  // 查看还款指引
  reimbursementGuidelines: host + "/refund/options/show.do",
  // 协议支付绑卡指引
  alipayGuidelines: host + "/weixin/pdfdownload.do",
  // 我的还款卡
  myCredit: host + "/agreement/getRepaymentCard.do",
  // 检查验证码
  myCreditCode: host + "/refund/checkVerifyCode.do",
  // 协议支付申请页面
  agreementPayment: host + "/agreement/apply.do",
  // 协议支付确认页面
  paymentAgreement: host + "/agreement/confirm.do",
  // 首页请求
  supplementQuery: host + "/v1/creditLoanApply/supplement/query",
  // 下拉框 + 城市
  configInit: host + "/v1/config/init",
  // 车贷保存
  carLoanSave: host + "/v1/creditLoanApply/supplement/carLoan/save",
  // 房产保存
  houseEstateSave: host + "/v1/creditLoanApply/supplement/houseEstate/save",
  // 房产修改
  houseEstateUpdate: host + "/v1/creditLoanApply/supplement/houseEstate/update",
  // 首页提交
  supplementConfirm: host + "/v1/creditLoanApply/supplement/confirm",
  // 保单保存
  insuranceSave: host + "/v1/creditLoanApply/supplement/insurance/save",
  // 保单修改
  insuranceUpdate: host + "/v1/creditLoanApply/supplement/insurance/update",
  // 企业税保存
  firmTaxSave: host + '/v1/creditLoanApply/supplement/taxLoan/save',
  // 获取隐私条款
  getPrivacyFileUrl: host + '/refund/getPrivacyFileUrl',
};

export {
  laappApi
};
