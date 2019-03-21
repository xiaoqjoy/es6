import Vue from 'vue';
import common from './common';
import system from './system';
import flowCore from './flowCore';

var totalInterface = Object.assign(common, system, flowCore);
Vue.prototype.$interface = totalInterface

