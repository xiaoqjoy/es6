let host = "api/cpms";
if (process.env.NODE_ENV !== 'production') {
  // host = 'http://10.3.114.160:8089'; // 服务器地址
  // host = 'http://dsapp13.intsit.dsfdc.com:8080'; // 测试地址
  // host = 'http://10.3.114.42:8080'; // 本地地址
  host = 'http://10.3.114.8:8080'; // 本地地址
}
const configApi = {
  // 已处理
  specialBusiness_done: host + "/specialBusiness/list/done", // 查询已处理列表
  // 待处理列表
  specialBusiness_todo: host + "/specialBusiness/list/todo", // 待处理列表
  checkSubmit: host + "/specialBusiness/checkSubmit", // 提交校验
  lastRejectApl: host + "/specialBusiness/lastRejectApl", // 引入客户信息查询
  pullin: host + "/specialBusiness/pullin", // 引入
  authReason: host + "/specialBusiness/authReason/check", // 校验授权原因
  saveAuthReason: host + "/specialBusiness/saveAuthReason", // 保存授权原因并建档
  submit: host + "/specialBusiness/submit", // 提交
  cancel: host + "/specialBusiness/cancel" // 取消
};

export {
  configApi
};
