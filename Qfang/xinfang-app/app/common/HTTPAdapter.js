import axios from 'axios';
import { QFReactHelper, UMNative } from './NativeHelper';

const defaults = {};

function setup(params, callback) {
  Object.assign(defaults, params);

  // 初始化所有请求的默认参数
  axios.defaults.baseURL = params.baseUrl;
  axios.defaults.params = {
    source: 'APP',
    // 将 app sessionId 作为每一个请求的默认参数
    appSid: params.sessionId,
  };

  initInterceptors();

  callback && callback();
}

function initInterceptors() {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  // 添加请求拦截器
  axios.interceptors.request.use((config) => {
    // 在发送请求之前，加入 cancelToke，以备后续中止请求
    config.cancelToken = source.token;
    config.source = source;
    return config;
  }, (error) =>
  // 请求错误时
    Promise.reject(error));

  // 添加响应拦截器
  axios.interceptors.response.use((res) => {
    console.log(`url=${res.request.responseURL}`, res);

    // 对响应数据进行判断用户是否有效
    if (res.data.status === 'E0009' || // sesssion 无效
      res.data.status === 'E0004' || // 无权访问
      res.data.status === 'INFO18' || // 用户信息不存在
      res.data.status === 'INFO02') { // 经纪人未同步账号平台
      res.config.source.cancel(`中止请求，原因：${res.data.message}`);
      // 退出到登录界面
      QFReactHelper.show(res.data.message, 2);
      QFReactHelper.logout();

      return Promise.reject(res.data.message);
    }
    return res;
  }, (error) => {
    // 响应错误时
    console.log('response error=', error);
    console.log('response error.request=', error.request);
    console.log('response error.response=', error.response);
    return Promise.reject(error);
  });
}

export default {
  setup,
};
