/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-15 14:27:02
 * @LastEditTime: 2019-08-22 16:00:03
 * @LastEditors: Please set LastEditors
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import mandMobile from 'mand-mobile'
import App from './App'
import router from './router'
import $lodash from 'lodash'
import filters from './common/js/filters.js'
import 'mint-ui/lib/style.css'
import 'mand-mobile/lib/mand-mobile.css'
import axios from './axios/axios'
import './common/css/global.css'
import VConsole from 'vconsole'
// let vConsole = new VConsole();
// 移动端console 插件 注意在打包部署时需要注释掉
// require('./assets/util/vconsole.js')

router.beforeEach((to, from, next) => {
  if('repayment-guidelines'==to.name || 'alipay-guidelines'==to.name){
    document.getElementsByName('viewport')[0].content = 'width=device-width,initial-scale=1.0,user-scalable=1.0'
  }
  next()
});

Vue.prototype.$lodash = $lodash
Vue.prototype.axios = axios

Vue.config.productionTip = false
// Vue.use(MintUI)
Vue.use(mandMobile)
// 全局管道
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
