// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import axios from 'axios';
import router from './router';
import '../theme/index.css';
import ElementUI from 'element-ui';
import store from './store';
import '../static/css/baseStyle.css';
import './HTTPAdapter';
import './interface/mainInterface';
import './utils/utils.js';

Vue.prototype.$axios = axios;

Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
