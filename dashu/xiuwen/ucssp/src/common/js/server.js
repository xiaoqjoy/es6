import { fileCos } from "@/common/js/fileCos";
let host = "api/cpms";
// let host1 = '/api/cpms/common/selection/all';
let host2 = "api/cpms";
if (process.env.NODE_ENV !== "production") {
  // host = 'http://10.3.113.121:8080'; // 开发环境

  host = fileCos.getHost()[1]; // 测试环境
  // host = '/uat/api/cpms'; // uat环境
  // host = '/sit3/api/cpms'; // sit3环境

  // host2 = "http://cpms.intdev.dsfdc.com:8080";
  host2 = fileCos.getHost()[1];// 测试环境
  // host2 = '/uat/api/cpms'; // uat环境
  // host2 = '/sit3/api/cpms'; // sit3环境

  // host = "http://10.1.114.216:8080"; // 本地
  // host = 'http://10.1.113.169:8080'; // 李建龙本地测试
  // host1 = 'http://yapi.dev.dashuf.com/mock/31/cpms/common/selection/all';
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

  // 获取特殊字段产品字典公共接口
  getOrgSpecial: host + "/common/" // 获取借款人行业名称（industryCode），获取贷款用途（loanPurpostCode），获取贷款期限（loanTerm）
};

export { baseApi };
