let host = "api/appms";
if (process.env.NODE_ENV !== 'production') {
  // host = 'http://10.3.114.160:8089'; // 服务器地址
  host = 'http://dsapp13.intsit.dsfdc.com:8281'; // 测试地址
  // host = 'http://dsapp18.intuat.dsfdc.com:8281'; // 测试地址
}
const configApi = {
  // 升级包管理
  upgradePackage_list: host + "/appms/v1/appWeb/upgradePackage/list", // 查询升级包
  upgradePackage_save: host + "/appms/v1/appWeb/upgradePackage/save", // 保存升级包
  upgradePackage_update: host + "/appms/v1/appWeb/upgradePackage/update", // 升级包修改
  // 数据维护
  repaymentOperationGuide_update: host + "/appms/v1/appWeb/repaymentOperationGuide/update", // 编辑数据维护
  repaymentOperationGuide_remove: host + "/appms/v1/appWeb/repaymentOperationGuide/remove", // 删除数据维护
  repaymentOperationGuide_list: host + "/appms/v1/appWeb/repaymentOperationGuide/list", // 查询数据维护
  repaymentOperationGuide_save: host + "/appms/v1/appWeb/repaymentOperationGuide/save", // 保存数据维护
  repaymentOperationGuide_upload: host + "/appms/v1/appWeb/repaymentOperationGuide/upload", // 上传文件接口
  repaymentOperationGuide_getProductList: host + "/appms/v1/appWeb/repaymentOperationGuide/getProductList", // 获取产品下拉框
  // 消息推送
  appMessage_list: host + "/appms/v1/appWeb/appMessage/list", // 查询消息推送
  appMessage_save: host + "/appms/v1/appWeb/appMessage/save", // 保存消息推送
  config_init: host + "/appms/v1/config/init", // 下拉框的值
  appMessage_update: host + "/appms/v1/appWeb/appMessage/update", // 修改消息推送
  // Banner
  banner_save: host + "/appms/v1/appWeb/banner/save", // 保存Banner
  banner_list: host + "/appms/v1/appWeb/banner/list", // 查询Banner
  banner_remove: host + "/appms/v1/appWeb/banner/remove", // 删除Banner
  banner_update: host + "/appms/v1/appWeb/banner/update" // 编辑Banner
};

export {
  configApi
};
