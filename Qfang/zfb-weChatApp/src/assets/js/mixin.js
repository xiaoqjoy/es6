// 全局的mixin
export default {
  data() {
    return {
      requestTask: {}, // http请求的requestTask
      baseURL: '', // http请求的base url,
      bmapWxAk: 'sRAW4s9H8ccgU2QFARzaQnl1WRoPsYb6' // 百度地图的ak
    };
  },
  methods: {
    // 返回小程序中的this对象
    $page() {
      return this.$root.$mp.page;
    },
    // 创建一个http请求token
    $createRequestToken() {
      let token = Math.random().toString(36).slice(2, 12);
      this.requestTask[token] = null;
      return token;
    },
    /**
     * http 请求封装
     * 接受和wx.request一样的参数(不含success，fail，complete)，返回一个Promise对象
     * 若传入requestToken则可以通过this.requestTask[requestToken]得到wx.request的RequestTask
     * @param {*} option
     * @returns Promise
     */
    $http(option) {
      let config = Object.assign({}, option);
      if (config.url.indexOf('http') !== 0) {
        config.url = this.baseURL + config.url;
      }
      return new Promise((resolve, reject) => {
        let requestTask = wx.request({
          ...config,
          success: resolve,
          fail: reject
        });
        if (config.requestToken) {
          this.requestTask[option.requestToken] = requestTask;
        }
      });
    },
    // http get 请求
    $get(url, data, other) {
      return this.$http({
        method: 'GET',
        url,
        data,
        ...other
      });
    },
    // http post 请求
    $post(url, data, other) {
      return this.$http({
        method: 'POST',
        url,
        data,
        ...other
      });
    },
    /**
     * wx导航处理
     * @param {*} method 跳转方式
     * @param {*} name 跳转的页面
     * @param {*} [params={}] 所需参数
     * @returns Promise
     */
    $wxRouter(method, name, params = {}) {
      let query = [];
      let queryUrl = '';
      if (method !== 'switchTab') {
        for (let i in params) {
          query.push(i + '=' + params[i]);
        }
        queryUrl = '?' + query.join('&');
      }
      return new Promise((resolve, reject) => {
        wx[method]({
          url: '/pages/' + name + '/main' + queryUrl,
          success: resolve,
          fail: reject
        });
      });
    },
    // wx.navigateTo
    $navigateTo(name, params) {
      return this.$wxRouter('navigateTo', name, params);
    },
    // wx.redirectTo
    $redirectTo(name, params) {
      return this.$wxRouter('redirectTo', name, params);
    },
    // wx.switchTab
    $switchTab(name) {
      return this.$wxRouter('switchTab', name);
    },
    // wx.reLaunch
    $reLaunch(name, params) {
      return this.$wxRouter('reLaunch', name, params);
    },
    /**
     * wx.navigateBack
     * 传入number时与wx.navigateBack功能一致
     * 传入string时可返回到具体的一个页面
     * @param {*} params
     * @returns Promise
     */
    $navigateBack(params) {
      if (typeof params === 'number' || params === undefined) {
        return new Promise((resolve, reject) => {
          wx.navigateBack({
            delta: params || 1,
            success: resolve,
            fail: reject
          });
        });
      } else if (typeof params === 'string') {
        /* globals getCurrentPages */
        let pageList = getCurrentPages();
        let backIndex = pageList.findIndex((e) => {
          return e.route === 'pages/' + params + '/main';
        });
        this.$navigateBack(pageList.length - 1 - backIndex);
      }
    }
  }
};
