// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import '@common/css/reset';
import '@common/css/common';
import '@common/font/iconfont.css';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import MyFetch from './common/js/myFetch.js';
import store from './store';
import global from './common/js/global';
import $lodash from "lodash";

Vue.use(global);
Vue.use(Element);

Vue.prototype.$MyFetch = MyFetch;
Vue.config.productionTip = false;
Vue.prototype.$lodash = $lodash;

// 设置eventbus
window.eventBus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
});
