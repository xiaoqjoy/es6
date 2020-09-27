import {fileCos} from '@common/js/fileCos';
let host = 'api/cpms';
if (process.env.NODE_ENV !== 'production') {
  // host = 'http://10.1.114.216:8080'; // 本地
  // host = 'http://10.1.113.122:8080'; // 假开发环境
  // host = 'http://10.20.0.13:8080'; // 开发环境
  host = fileCos.getHost()[1]; // 测试环境
  // host = '/uat/api/cpms'; // uat环境
}

const baseApi = {
  image_scan_pendings: host + "/f2f/remote/image-scan/pendings", // 查询面签待处理列表
  image_scan_processeds: host + "/f2f/remote/image-scan/processeds", // 查询面签已处理列表
  image_scan_submit: host + "/f2f/remote/image-scan/" // 远程面签影像平台提交
};

export {
  baseApi
};
