let host = 'api/cpms';
let host2 = 'api/cpms';
if (process.env.NODE_ENV !== 'production') {
  // host = 'http://10.20.0.13:8080';
  // host = "http://10.3.113.112:8080";
  // host2 = "http://10.3.113.112:8080";
  host = "http://10.3.114.23:8080";
  // host1 = 'http://yapi.dev.dashuf.com/mock/31/cpms/common/selection/all';
  // host2 = "http://cpms.intdev.dsfdc.com:8080";
  host2 = "http://10.3.114.23:8080";
}

const baseApi = {
  areaSelection: host + '/common/selection/all', // 省市区
  dictSelection: host + "/common/selection", // 查询字典表
  imageInit: host2 + "/image/init", // 影像平台接口
  image_scan_submit: host + "/f2f/remote/image-scan/", // 远程面签影像平台提交

  viedelRecording: host + "/viedelRecording/config", // 获取网络摄像头配置信息
  viedelRecording_open: host + "/viedelRecording/history/open", // 开启一个视频录像业务单
  viedelRecording_close: host + "/viedelRecording/history/close", // 关闭一个视频录像业务单

  batchInit: host2 + '/image/batchInit', // 影像平台批量下载控件初始化接口
  codeDependent: './static/code.json' // 码值依赖
};

export {
  baseApi
};
