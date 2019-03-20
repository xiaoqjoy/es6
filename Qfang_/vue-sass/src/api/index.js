// 引用axios
import axios from 'axios';
import qs from 'qs';

require('./isApi')
var dev = (function f() {
  if (typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'production') {
    return false
  }
  return true
})()

// 配置API接口地址
// 开发 测试(http://120.79.195.58)
const API_ROOT = dev ? 'http://120.79.195.58:10600/saas' : 'http://120.79.195.58:10600/saas'
//欧阳本地
//const API_ROOT = dev ? 'http://192.168.8.239:10600/saas' : 'http://192.168.8.239:10600/saas'
//现网(http://120.77.182.40)
//const API_ROOT = dev ? 'http://120.77.182.40:10600/saas' : 'http://120.77.182.40:10600/saas'
//金义
//const API_ROOT = dev ? 'http://192.168.8.46:10600/saas' : 'http://192.168.8.46:10600/saas'
//胡兵斌
//const API_ROOT = dev ? 'http://192.168.8.34:10600/saas' : 'http://192.168.8.34:10600/saas'

sessionStorage.setItem('API_ROOT', API_ROOT);
axios.defaults.baseURL = API_ROOT;

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
      if (typeof (config.data) !== 'string') {
        config.data = JSON.stringify(qs.stringify(config.data))
      }
      config.headers['Content-Type'] = "application/json"
    }
    if (sessionStorage.getItem("token")) {
      config.headers['token'] = sessionStorage.getItem("token")
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// 返回在vue模板中的调用接口
export default {
  API_ROOT: API_ROOT,
}
