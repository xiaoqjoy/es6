import { fileCos } from "@/common/js/fileCos";
let host = "api/cpms";
// let host1 = '/api/cpms/common/selection/all';
let host2 = "api/cpms";
let host3 = fileCos.getFileHost() + '/ftb/api';
if (process.env.NODE_ENV !== "production") {
  //  host = 'http://10.3.114.136:8080'; // 开发环境李文焕
  //  host2 = 'http://10.3.114.136:8080'; // 开发环境李文焕
  // host = "/api/cpms"; // 测试环境
  // host = '/uat/api/cpms'; // uat环境
  // host = '/sit3/api/cpms'; // sit3环境

  // host2 = "http://cpms.intdev.dsfdc.com:8080";
  // host2 = "/api/cpms"; // 测试环境
  // host2 = '/uat/api/cpms'; // uat环境
  // host2 = '/sit3/api/cpms'; // sit3环境

  // host = "http://ds-ts-0531:8080"; // 本地
  // host1 = 'http://yapi.dev.dashuf.com/mock/31/cpms/common/selection/all';
  // host3 = "http://dsapp13.intsit.dsfdc.com:8080/ftb/api";
  // host = 'http://10.30.89.115:2180/ucssp/api'; // 预生产
  // host3 = "http://10.20.0.17:8113";
  // host3 = "http://dsapp17.dev.dashuf.com:8113";
  host = fileCos.getHost()[1];
  host2 = fileCos.getHost()[1];
  host3 = '/sit6/ftb/api';
}
const baseApi = {
  multipleSelect: host + '/common/selection/all/params',
  allSelection: host + "/common/selection/all", // 获取公共码表
  getCreditReport: host + "/creditReport/url/", // 获得征信报告url
  getCreditId: host + "/f2f/credit/", // 查询贷款申请征信报告编码

  viedelRecording: host + "/viedelRecording/config", // 获取网络摄像头配置信息
  viedelRecording_open: host + "/viedelRecording/history/open", // 开启一个视频录像业务单（改成了一个接口）
  viedelRecording_close: host + "/viedelRecording/history/close", // 关闭一个视频录像业务单（改成了一个接口）
  recordVideo: host + "/video/record", // 记录一笔视频录像业务单
  videoSwitch: host + "/f2f/video/switch", // 查询处理中心千里眼开关

  imageInit: host2 + "/image/init", // 影像平台接口
  batchInit: host2 + "/image/batchInit", // 影像平台批量下载控件初始化接口
  initByProduct: host2 + '/image/initByProduct', // 影像控件目录初始化接口（指定产品）
  codeDependent: './static/code.json', // 码值依赖
  // 担保确认函接口
  getPrintLetter: host + '/account/getPrintLetter',
  // 获取特殊字段产品字典公共接口
  getOrgSpecial: host + "/common/", // 获取借款人行业名称（industryCode），获取贷款用途（loanPurpostCode），获取贷款期限（loanTerm）
  getServicerList: host + '/common/service', // 获取处理中心
  newFile: host3 + "/ftb/v1/newfile" // 上传/文件
};

export { baseApi };
