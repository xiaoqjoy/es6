import {fileCos} from '@common/js/fileCos';
let host = 'api/cpms';
if (process.env.NODE_ENV !== 'production') {
  // host = 'http://10.1.114.216:8080'; // 本地
  // host = 'http://10.1.113.122:8080'; // 假开发环境
  // host = 'http://10.20.0.13:8080'; // 开发环境
  // host = "/api/cpms"; // 测试环境
  // host = '/uat/api/cpms'; // uat环境
  // host = '/sit3/api/cpms'; // sit3环境
  // host = 'http://ds-ts-0531:8080';
  host = fileCos.getHost()[1];
}

const baseApi = {
  counter_f2f_list: host + "/manager/f2f/counter", // 查询柜面面签列表
  counter_f2f_amount: host + "/manager/f2f/counter/un-claim-amount", // 查询柜面面签剩余数量
  counter_f2f_video: host + "/manager/f2f/counter/video/", // 查询柜面面签视频列表
  // counter_f2f_video_link: host + "/manager/f2f/counter/video/{videoId}/url", // 柜面面签视频链接
  counter_f2f_video_download: host + "/manager/f2f/counter/video/download", // 下载柜面面签视频
  credit_auths: host + "/manager/credit-auths", // 查询征信授权任务列表
  remoter_f2f_list: host + "/manager/f2f/remote", // 查询远程面签列表
  remoter_f2f_amount: host + "/manager/f2f/remoter/un-claim-amount" // 查询远程面签剩余数量

};
const counterToR = {
  pool: host + '/f2f/counter/cutover/pool', // 查询柜面面签任务调单
  cutover: host + '/f2f/counter/cutover' // 柜面面签切换远程面签
};
const remoteToC = {
  pool: host + '/f2f/remote/cutover/pool', // 查询远程面签任务调单池
  cutover: host + '/f2f/remote/cutover' // 远程面签切换柜面面签
};
export {
  baseApi, counterToR, remoteToC
};
