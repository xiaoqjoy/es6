// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import "@common/css/reset";
import "@common/css/common";
import "@common/font/iconfont.css";
// import 'font-awesome/css/font-awesome.min.css';
import $lodash from "lodash";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import MyFetch from "./common/js/myFetch.js";
import store from "./store";
import Moment from "moment";
import global from "./common/js/global";
import config from './config';

// 全局管道
import * as filters from "@common/js/filters.js";

// 全局引入详情组件，使用递归组件
import face2faceDetail from './system/face2face/face2face-detail';
import face2faceDetailRemote from './system/face2face-remote/face2face-detail';
import selectCascader from "@components/selectCascader";
Vue.component('face2faceDetail', face2faceDetail);
Vue.component('face2faceDetailRemote', face2faceDetailRemote);
Vue.component('selectCascader', selectCascader);

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.use(global);
Vue.use(Element);

Vue.prototype.$lodash = $lodash;
Vue.prototype.$MyFetch = MyFetch;
Vue.prototype.$Moment = Moment;
Vue.config.productionTip = false;

Vue.prototype.isXiuwen = config.isXiuwen;

// 设置eventbus
window.eventBus = new Vue();

/* eslint-disable no-new */
const vm = new Vue({
  el: "#app",
  router,
  store,
  components: {
    App
  },
  template: "<App/>"
});

export default vm;
