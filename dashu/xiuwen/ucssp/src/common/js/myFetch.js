import axios from 'axios';
import {
  token,
  menu
} from './localStorage';
import router from '../../router';
import {
  MessageBox
} from 'element-ui';

let readAsTextFn = (response) => {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader();
    fileReader.readAsText(response.data); // 开始读取指定的Blob中内容，result属性中将包含一个字符串以表示所读取的文件内容
    fileReader.onload = function() {
      let res = JSON.parse(fileReader.result);
      resolve(res);
    };
  });
};

let urlList = []; // 防止重复提交
const passUrl = ['code/get/dictionarylist', 'organization/specialInfo', 'ftb/v1/newfile', '/ftb/v1/id-to-url']; // 不需要拦截的url
const MyFetch = {};
// MyFetch.host = host;
let hasloginOut = false; // 是否已经强制退出
const downloadList = ['/manager/f2f/counter/video/download'];
/**
 * 用于监测可配置的arry里是否包含url
 * @param {String} url 想要判断是否包含的url
 * @param {Array<String>} arry urlList数组
 * @returns {Bollon} true为包含，false为不包含
 */
const includeStr = (url, arry) => {
  let flag = false;
  let urlStr = url.toLowerCase();
  for (let i = 0; i < arry.length; i++) {
    if (urlStr.includes(arry[i])) {
      flag = true;
      break;
    } else {
      continue;
    }
  }
  return flag;
};
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
  let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    'DSF-token': token.getToken()
  };
  if (url.indexOf('/ftb/') !== -1) {
    headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      'DSF-token': token.getToken(),
      "X-REQ-NAME": "ucssp"
    };
    if (url.indexOf('v1/upload') !== -1) {
      headers = {
        "Content-Type": false,
        "Accept": "application/json",
        'DSF-token': token.getToken(),
        "X-REQ-NAME": "ucssp"
      };
    }
  }
  let params = {
    url: url,
    method: init.method,
    timeout: timeout,
    headers: headers,
    data: init.body
  };
  if (init.responseType) {
    params = {
      url: url,
      method: init.method,
      timeout: timeout,
      headers: headers,
      data: init.body,
      responseType: init.responseType
    };
  }

  // 判断是否是下载柜面面签视频
  if (url.indexOf('/video/download') > -1 || url.indexOf('/appWeb/userManagerRef/export') > -1 || url.indexOf("/appWeb/creditInvestRef/export") > -1 || url.indexOf("/downloadtemplate") > -1 || url.indexOf("/downloaderrorfile") > -1 || url.indexOf('/caes/webapi/impairmentFeeTypeMap/export') > -1) {
    params.responseType = 'blob';
  }

  axios(params).then(async (response) => {
      let urlIndex = urlList.indexOf(url);
      if (urlIndex > -1) {
        urlList.splice(urlIndex, 1);
      }
      // 云屋音视频接口特殊处理
      // 打包文件url特殊处理
      if (response.config.url.includes('ali6.cloudroom.com') || response.config.url.includes('111.230.86.150')) {
        resolve(response.data);
        return;
      }
      let isVideo = url.indexOf("/account/exportBusinessInfo") > -1 || url.indexOf("/account/exportPutoutFile") > -1 || url.indexOf('/video/download') > -1 || url.indexOf('/appWeb/userManagerRef/export') > -1 || url.indexOf("/appWeb/creditInvestRef/export") > -1 || url.indexOf("/downloadtemplate") > -1 || url.indexOf("/downloaderrorfile") > -1 || (url.indexOf("/reports") > -1 && url.indexOf("/export") > -1) || url.indexOf("/productContract/download") > -1 || url.indexOf("/caes/webapi/impairmentFeeTypeMap/export") > -1;
      // 判断是否是下载柜面面签视频
      if (isVideo) {
        // console.log(response);
        // console.log(response.data);
        // console.log(response.data.code);

        // 下载成功，response.data.type和reponse.headers['content-type']谷歌返回"application/octet-stream"，IE返回"application/octet-stream;charset=UTF-8"
        // 下载失败，response.data.type和reponse.headers['content-type']谷歌返回"application/json"，IE返回"application/octet-stream;charset=UTF-8"
        let disposition = response.headers['content-disposition'] || response.headers['Content-Disposition'];
        if (disposition) {
          let filename = disposition ? decodeURIComponent(disposition.split(';')[1].split('=')[1]) : new Date().getTime() + ".xls";
          if (filename[0] === '"') {
            filename = filename.substring(1);
          }
          if (filename[filename.length - 1] === '"') {
            filename = filename.substring(0, filename.length - 1);
          }
          console.log(response);
          resolve({
            data: response.data,
            filename
          });
          return;
        }

        response.data = await readAsTextFn(response);
        console.log(response);
      }

      if (url.indexOf('/api/dsmp/getReceiveEmailList') !== -1 || url.indexOf('/api/dsmp/getEmailList') !== -1) {
        if (response.data.code === "00") {
          resolve(response.data.data);
          return;
        }
      }

      if (params.responseType === 'blob' && response.data.code === "200") {
        resolve(response);
        return;
      }
      if (params.responseType === 'arraybuffer') {
        resolve(response.data);
        return;
      }
      if (response.data.code === "200") {
        resolve(response.data.data);
      } else if (response.data.code && response.data.code.slice(0, 7) === 'RELOGIN') {
        if (hasloginOut) {
          return;
        }
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
          router.push({
            path: '/login'
          });
        });
      } else {
        let urlIndex = urlList.indexOf(url);
        if (urlIndex > -1) {
          urlList.splice(urlIndex, 1);
        }
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

MyFetch.get = (url, params = "", responseType) => {
  if (params) {
    const paramsArray = [];
    Object.keys(params).forEach(key => paramsArray.push(`${key}=${encodeURIComponent(params[key])}`));
    if (url.search(/\?/) === -1) {
      url += `?${paramsArray.join("&")}&time=${Math.random()}`;
    } else {
      url += `&${paramsArray.join("&")}&time=${Math.random()}`;
    }
  } else {
    if (!responseType) {
      url += `?time=${Math.random()}`;
    }
  }
  if (includeStr(url, downloadList)) {
    url = url.slice(0, url.indexOf('?time'));
  }
  let methods = {
    method: "GET"
  };
  if (responseType) {
    methods = {
      method: "GET",
      responseType: responseType
    };
  }
  return doFetch(url, methods);
};

MyFetch.delete = (url, body = {}) => {
  let option = {
    method: "DELETE",
    body
  };
  if (body === "{}") {
    option = {
      method: "DELETE"
    };
  }
  return doFetch(url, option);
};

MyFetch.post = (url, body = {}, responseType) => {
  let option = {
    method: "POST",
    body
  };
  if (body === "{}") {
    option = {
      method: "POST"
    };
  }
  if (responseType) {
    option.responseType = responseType;
  }
  return doFetch(url, option);
};

MyFetch.put = (url, body = {}) => {
  body = JSON.stringify(body);
  let option = {
    method: "PUT",
    body
  };
  if (body === "{}") {
    option = {
      method: "PUT"
    };
  }
  return doFetch(url, option);
};
export default MyFetch;
