import axios from "axios";
import global from './global'; 

// axios.defaults.baseURL = "http://10.1.114.7:8081/"; // 创建axios默认请求

axios.defaults.timeout = 100000; // 配置超时时间

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    console.log(response);
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

/**
 * get请求
 * @method get
 * @param {url, params, loading} 请求地址，请求参数，是否需要加载层
 */
var get = function(url, data, loading) {
  return new Promise((resolve, reject) => {
    axios
      .get(global.IP + url, {params:data})
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
/**
 * post请求
 * @method post
 * @param {url, params} 请求地址，请求参数，是否需要加载层
 */
var post = function(url, data) {
  return new Promise((resolve, reject) => {
    axios
      .post(global.IP + url, data)
      .then(res => {
        console.log(res) ;
        resolve(res) ;
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {get,post};
