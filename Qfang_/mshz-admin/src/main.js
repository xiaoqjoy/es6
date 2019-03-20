// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import axios from 'axios';
import BaiduMap from 'vue-baidu-map';
import Viewer from 'v-viewer';

import App from './App';
import router from './router';
import store from './store';
import CheckPermission from './components/CheckPermission';
import './HTTPAdapter';
import './element-variables.scss';
import '../static/css/normalize.css';
import '../static/css/baseStyle.css';
// import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
Vue.use(CheckPermission);

Vue.use(Viewer);
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  // ak: 'yxMqF7GFWZlGUMNRNaC4t2Ie'
  ak: 'sRAW4s9H8ccgU2QFARzaQnl1WRoPsYb6'
});

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
