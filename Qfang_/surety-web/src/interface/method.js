import Vue from 'vue';
import axios from 'axios';
import { Loading } from 'element-ui';
const post = function (url, data, success, fail) {
  if (Object.prototype.toString.call(data) !== '[object Object]') return
  let loadingInstance = null
  if (!data.loading) { // 默认都有loading
    loadingInstance = Loading.service({ fullscreen: true })
    delete data.loading
  }
  return axios.post(url, data).then(function (res) {
    loadingInstance && loadingInstance.close()
    if (res.data.status === "C0000") {
      success(res);
    } else if (fail) {
      fail(res)
    } else {
      Vue.prototype.$message({ message: res.data.message, type: 'error' });
    }
  }).catch(err => {
    console.log(err);
  });
};
const get = function (url, data, success, fail) {
  if (Object.prototype.toString.call(data) !== '[object Object]') return
  let loadingInstance = null
  if (data.loading) { // 默认没有loading
    loadingInstance = Loading.service({ fullscreen: true })
    delete data.loading
  }
  return axios.get(url, {
    params: data
  }).then(function (res) {
    loadingInstance && loadingInstance.close()
    if (res.data.status === "C0000") {
      success(res);
    } else if (fail) {
      fail(res)
    } else {
      Vue.prototype.$message({ message: res.data.message, type: 'error' });
    }
  }).catch(err => {
    console.log(err);
  });
};
export default { post: post, get: get };
