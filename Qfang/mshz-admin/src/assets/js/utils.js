module.exports = {
  /**
   * 日期格式化
   * @param {date} date
   * @param {string} [fmt='yyyy-MM-dd hh:mm:ss']
   * @returns {string}
   */
  $formDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
    let o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;
  },
  /**
   * 文件下载
   * @param {string} src
   * @param {string} [fileName='']
   */
  $downloadFile(src, fileName = '') {
    if (src) {
      let $a = document.createElement('a');
      $a.setAttribute('href', src);
      $a.setAttribute('download', fileName);
      let evObj = document.createEvent('MouseEvents');
      evObj.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
      $a.dispatchEvent(evObj);
    }
  },

  /**
   * jsonp 请求
   *  options {
   *  url
   *  data
   *  callback
   *  success function
   *  fail    function
   *
   * }
   *
   */

  $jsonp(options) {
    options = options || {};
    if (!options.url || !options.callback) {
      return;
    }
    // 创建 script 标签并加入到页面中
    let callbackName = ('jsonp_' + Math.random()).replace('.', '');
    let oHead = document.getElementsByTagName('head')[0];
    options.data[options.callback] = callbackName;
    let params = formatParams(options.data);
    let oS = document.createElement('script');
    oHead.appendChild(oS);
    // 创建jsonp回调函数
    window[callbackName] = (json) => {
      oHead.removeChild(oS);
      clearTimeout(oS.timer);
      window[callbackName] = null;
      options.success && options.success(json);
    };
    // 请求失败
    oS.onerror = (err) => {
      window[callbackName] = null;
      oHead.removeChild(oS);
      options.fail && options.fail(err);
    };
    // 发送请求
    oS.src = options.url + '?' + params;
    // 超时处理
    if (options.time) {
      oS.timer = setTimeout(() => {
        window[callbackName] = null;
        oHead.removeChild(oS);
        options.fail && options.fail({ message: '超时' });
      }, options.time);
    }
    // 格式化参数
    function formatParams(data) {
      let arr = [];
      for (let name in data) {
        arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
      }
      return arr.join('&');
    }
  }
};
