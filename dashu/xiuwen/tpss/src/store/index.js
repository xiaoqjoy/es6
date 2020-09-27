import Vue from 'vue';
import Vuex from 'vuex';
import face2face from './modules/face2face'; // 面核面签模块
import antifraud from './modules/antifraud'; // 反欺诈
import token from './modules/token'; // token
import getters from './getters';
import systemName from './modules/systemName';
import taxLoan from './modules/taxLoan';
Vue.use(Vuex);
// require("babel-polyfill");
// require("es6-promise").polyfill();

const store = new Vuex.Store({
  modules: {
    face2face,
    antifraud,
    token,
    systemName,
    taxLoan
  },
  getters
});

export default store;
