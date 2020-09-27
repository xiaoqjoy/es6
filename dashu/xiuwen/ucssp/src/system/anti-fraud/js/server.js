let xx = "api/cpms"; // 反欺诈引入功能接口测试地址
let host = "api/afs/blacklist"; // 测试地址
if (process.env.NODE_ENV !== 'production') {
  // host = "http://10.3.114.65:8080/blacklist"; // 本地地址
  host = "http://10.21.0.13:8105/blacklist"; // 测试地址
  host = "http://dsapp18.intuat.dsfdc.com:8105/blacklist"; // UAT测试地址
  xx = "http://dsapp13.intsit.dsfdc.com:8103"; // 反欺诈引入功能接口测试地址
  xx = 'http://dsapp18.intuat.dsfdc.com:8103'; // 反欺诈引入功能UAT地址;
}
const fqzApi = {
  // 反欺诈接口
  addBlacklist: host + "/addblacklist", // 新增黑名单接口
  failure: host + "/failure", // 黑名单批量失效接口
  getblacklistList: host + "/getblacklistlist", // 渲染表格的内容(包含分页,查询)接口
  getblacklistInfo: host + "/getblacklistinfo", // 黑名单详情接口
  getCodeLibrary: host + "/getcodelibrary", // 黑名单下拉选项接口
  downloadTemplate: host + "/downloadtemplate", // 黑名单批量导入下载模板接口
  downloadErrorFile: host + "/downloaderrorfile", // 下载黑名单错误文件接口
  updateBlacklist: host + "/updateblacklist", // 黑名单更新接口
  importExcel: host + "/importexcel", // 黑名单批量导入接口
  // 反欺诈引入功能接口
  watchRoll: xx + "/antifraud/v1/watchRoll/detail", // 关注黑名单引入页面
  managerBlack: xx + "/antifraud/v1/managerBlack/detail", // 客户经理黑名单引入页面
  channelBlack: xx + "/antifraud/v1/channelBlack/detail" // 渠道黑名单引入页面
};

export {
  fqzApi
};
