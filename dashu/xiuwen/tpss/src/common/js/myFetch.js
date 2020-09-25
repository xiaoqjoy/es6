import axios from 'axios';
import { token, menu } from './localStorage';
import router from '../../router';
import {MessageBox} from 'element-ui';

const MyFetch = {};
// MyFetch.host = host;
let hasloginOut = false; // 是否已经强制退出
let urlList = []; // 防止重复提交
const passUrl = ['code/get/dictionarylist', 'organization/specialInfo', '/ftb/v1/id-to-url']; // 不需要拦截的url
const doFetch = (url, init) => new Promise((resolve, reject) => {
  let urlIsPassList = false;
  if (urlList.indexOf(url) > -1) {
    return;
  }
  for (var i = 0; i < passUrl.length; i++) {
    if (url.indexOf(passUrl[i]) > -1) {
      urlIsPassList = true;
    }
  }
  !urlIsPassList && urlList.push(url);
  let timeout = init.responseType && init.responseType.timeout ? init.responseType.timeout : 15000;
  axios({
    url: url,
    method: init.method,
    timeout: timeout,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      taskName: 'f2f',
      'DSF-token': token.getToken(),
      "X-REQ-NAME": "ucssp"
    },
    data: init.body
  }).then((response) => {
      let urlIndex = urlList.indexOf(url);
      if (urlIndex > -1) {
        urlList.splice(urlIndex, 1);
      }
      if (response.data.code === "200") {
        resolve(response.data.data);
      } else if (response.data.code.slice(0, 7) === 'RELOGIN') {
        if (hasloginOut) {
          return;
        }
        // ccc
        hasloginOut = true;
        MessageBox.confirm(response.data.message, '', {
          confirmButtonText: "确定",
          cancelButtonText: '',
          showCancelButton: false,
          showClose: false,
          closeOnClickModal: false,
          type: 'error'
        }).then(() => {
          hasloginOut = false;
          token.removeToken();
          menu.removeMenu();
          router.push({path: '/login'});
        });
      } else {
        if (response.data.code === "500") {
          let data = JSON.parse(JSON.stringify(response.data));
          data.message = "系统异常," + response.data.message;
          reject(data);
        } else {
          reject(response.data);
        }
      }
    })
    .catch((err) => {
      let urlIndex = urlList.indexOf(url);
      if (urlIndex > -1) {
        urlList.splice(urlIndex, 1);
      }
      if (err.message.includes('timeout')) {
        err.message = '接口请求超时';
        console.error(`接口---${url}---请求超时`);
      }
      reject(err);
    });
});

MyFetch.get = (url, params = "") => {
  if (params) {
    const paramsArray = [];
    Object.keys(params).forEach(key => paramsArray.push(`${key}=${encodeURI(params[key])}`));
    if (url.search(/\?/) === -1) {
      url += `?${paramsArray.join("&")}&time=${Math.random()}`;
    } else {
      url += `&${paramsArray.join("&")}&time=${Math.random()}`;
    }
  } else {
    url += `?time=${Math.random()}`;
  }

  return doFetch(url, { method: "GET" });
};

MyFetch.delete = (url, body = {}) => {
  let option = { method: "DELETE", body };
  if (body === "{}") {
    option = { method: "DELETE" };
  }
  return doFetch(url, option);
};

MyFetch.post = (url, body = {}) => {
  let option = { method: "POST", body };
  if (body === "{}") {
    option = { method: "POST" };
  }
  return doFetch(url, option);
};

MyFetch.put = (url, body = {}) => {
  body = JSON.stringify(body);
  let option = { method: "PUT", body };
  if (body === "{}") {
    option = { method: "PUT" };
  }
  return doFetch(url, option);
};
export default MyFetch;
