import Vue from 'vue';
import App from './App';
import mixin from './assets/js/mixin';
import vant from './assets/js/vant';
Vue.mixin(mixin);
Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();
// globalData是全局的数据，可以跨页面使用
Vue.prototype.globalData = getApp().globalData;
Object.assign(Vue.prototype, vant);
