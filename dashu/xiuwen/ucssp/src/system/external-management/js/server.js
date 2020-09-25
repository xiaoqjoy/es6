let xx = "api/dpms/dpms";
if (process.env.NODE_ENV !== 'production') {
  //  xx = 'http://10.20.0.17:9087/dpms'; // 测试地址
  xx = 'http://dsapp13.intsit.dsfdc.com:8285/dpms'; // 测试地址
  // xx = 'http://dsapp13.intuat.dsfdc.com:8285/dpms'; // 测试地址
  // xx = 'http://10.3.113.99:8099/dpms'; // 测试地址
  // xx = "/dpms";
}
const partnerApi = {
  poster: xx + "/poster/", // 海报列表
  notice: xx + "/notice/", // 公告管理
  recommend: xx + "/recommend/", // 推荐管理
  // 用户管理相关页面
  userManagerRef_addUser: xx + "/appWeb/userManagerRef/addUser", // 添加用户
  userManagerRef_export: xx + "/appWeb/userManagerRef/export", // 导出用户管理页面列表
  userManagerRef_getPage: xx + "/appWeb/userManagerRef/getPage", // 获取用户管理页面列表
  userManagerRef_getUserDetail: xx + "/appWeb/userManagerRef/getUserDetail", // 查询用户详情
  userManagerRef_modifyUser: xx + "/appWeb/userManagerRef/modifyUser", // 修改用户
  userImportRef_getPager: xx + "/appWeb/userImportRef/getPage", // 获取用户导入页面列表
  userImportRef_import: xx + "/appWeb/userImportRef/import", // 用户导入
  // 征信管理
  creditInvestRef_export: xx + "/appWeb/creditInvestRef/export", // 导出征信管理页面列表
  creditInvestRef_getPage: xx + "/appWeb/creditInvestRef/getPage", // 获取征信管理页面列表
  // 消息管理
  pushMsgManagerRef_addMsg: xx + "/appWeb/pushMsgManagerRef/addMsg", // 新增推送消息
  pushMsgManagerRef_deleteMsg: xx + "/appWeb/pushMsgManagerRef/deleteMsg", // 删除消息
  pushMsgManagerRef_getDetail: xx + "/appWeb/pushMsgManagerRef/getDetail", // 获取消息详情
  pushMsgManagerRef_getPage: xx + "/appWeb/pushMsgManagerRef/getPage", // 消息列表
  pushMsgManagerRef_import: xx + "/appWeb/pushMsgManagerRef/import", // 消息导入
  pushMsgManagerRef_modifyMsg: xx + "/appWeb/pushMsgManagerRef/modifyMsg", // 修改推送消息
  initDataDict: xx + "/appWeb/common/initDataDict", // 初始化数据字典
  getCompany: xx + "/appWeb/common/getCompany", // 获取分公司
  getLoginUserInfo: xx + "/appWeb/common/getLoginUserInfo", // 查询当前登录的用户信息
  getCompanyOfUm: xx + "/appWeb/common/getTeamOfUm", // 查询客户经理是否正确
  getAvailableUmList: xx + "/appWeb/common/getAvailableUmList", // 查询客户经理
  findByMobileNo: xx + "/appWeb/common/findByMobileNo", // 查询手机号码是否注册
  getExclusiveChannel: xx + "/appWeb/common/getExclusiveChannel", // 验证所属公司
  getTemplateIdList: xx + "/appWeb/pushMsgManagerRef/getTemplateIdList" // 消息类型
};

export {
  partnerApi
};
