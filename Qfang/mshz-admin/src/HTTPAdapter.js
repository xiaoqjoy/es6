import axios from 'axios';
import Cookie from 'js-cookie';
import router from './router';
import store from './store';

let myRequester = null;
let myResponser = null;

// 初始化所有请求的默认参数
axios.defaults.baseURL = '/mshz-mgr/';
// axios.defaults.params = {
//   source: ''
// };

function initInterceptors() {
  // 确保重新初始化拦截器之前，生成全新的promise对象
  const source = axios.CancelToken.source();

  // 重新初始化拦截器之前，先移除旧的拦截器
  if (myRequester !== null && myResponser !== null) {
    axios.interceptors.request.eject(myRequester);
    axios.interceptors.response.eject(myResponser);
  }

  // 添加请求拦截器
  myRequester = axios.interceptors.request.use(
    (config) => {
      // 在发送请求之前，加入 cancelToke，以备后续中止请求
      const cfg = config;

      // 在搜索组件为了取消快速输入的无意义请求，已经增加了cancelToken参数，全局的cancelToken不应该重新定义
      if (!cfg.cancelToken) {
        cfg.cancelToken = source.token;
      }
      // cfg.source 在搜索组件使用时，session失效了 还可以全局拦截到
      cfg.source = source;
      return cfg;
    },
    (error) => {
      // 请求错误时
      Promise.reject(error);
    }
  );

  function redirect(res) {
    res.config.source.cancel(res.data.message);
    // 退出到登录界面
    Cookie.remove('mgrSid');
    initInterceptors();
    store.dispatch('wipeData').then(() => {
      router.replace('/Login');
      // location.reload();
    });
  }

  // 添加响应拦截器
  myResponser = axios.interceptors.response.use(
    (res) => {
      // console.log(`url=${res.request.responseURL}`, res);
      // 对响应数据进行判断用户是否有效
      if (
        res.data.status === 'E0008' // sesssion 无效
      ) {
        redirect(res);
        return Promise.reject(res.data.message);
      }
      return res;
    },
    (error) => {
      // // 响应错误时
      // var sc = (error + '').match(/\b\d{3}\b/);
      // var statusCode = 0;
      // if (sc) {
      //   statusCode = +sc[0];
      // }
      // // 服务端错误
      // if (statusCode >= 500) {
      //   Cookie.remove('mgrSid');
      //   router.replace('/Login');
      // } else {
      //   router.replace('/Logout');
      // }
      // console.log('response error=', error);
      if (error.response) {
        redirect(error.response);
        return Promise.reject(error.response.data);
      } else {
        return Promise.reject(error);
      }
    }
  );
}

initInterceptors();
// export default {
//   initInterceptors,
//   setup
// };
