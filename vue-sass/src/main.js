// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import promise from 'es6-promise'
import "babel-polyfill"
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './api'
import './assets/css/common.css'
import './assets/css/dialog.css'
import common from '@/components/common/common'
import top from '@/components/common/top'
import system from '@/components/system/system'
//import mengLayer from '@/components/common/mengLayer'
import axios from 'axios'
import '../commonJS/jquery-1.8.3.min.js'
import loading from '@/components/common/LoadingView'

promise.polyfill();
Vue.prototype.$ajax = axios;
Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.component('left-nav', common);
Vue.component('top-nav', top);
Vue.component('sys-tem', system);
//Vue.component('meng-ceng', mengLayer);
Vue.component('my-load', loading);

(function() {
    if (!sessionStorage.getItem('token')) {
        router.replace({
            path: '/',
            query: { redirect: router.currentRoute.fullPath }
        })
    }
})()
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})

//全局回车
//document.onkeydown=function(e){
//	var e = e || event;
//	var currKey = e.keyCode || e.which || e.charCode;//支持IE,FireFox
//	if (currKey == 13) {
//	    return false;
//	}
//}

// global.https = "http://192.168.8.120:10003";
//医疗机构ID

//获取机构ID

/*获取session信息*/
if (sessionStorage.getItem('user')) {
    var useInfo = sessionStorage.getItem('user');
    //获取机构ID
    var organizationId = JSON.parse(useInfo).organizationId;
    var userId = JSON.parse(useInfo).userId;
    window.organizationId = organizationId;
    window.userId = userId;
    // global.organizationId = organizationId;
    // global.userId = userId;
}

//干预类型(0.待建议，1.成功 2.失败)
global.status = 0;
//templateType: 类别（0:私有，1:公有）
global.templateType = 0;
//type: 干预类型(1.微信 2.电话，3.短信)
global.type = 1;
//页数
global.pageSize = 1000;
//公共ajax请求
Vue.prototype.$dist = function(type, value, sort, des) {
        var that = this;
        this.$ajax({
            method: 'post',
            async: false,
            url: 'http://192.168.8.120:10003/dictionary/item/add',
            data: {
                typeCode: type,
                itemValue: value,
                itemSort: sort,
                organId: -1,
                description: des
            }
        }).then(function(res) {
            //		that.$set(mes,'code','true')
        }).err(function(err) {
            return (err)
        })
    }
    //监听浏览器宽度
    // $(window).resize(function() { //当浏览器大小变化时
    //     console.log($(window).width()); //浏览器时下窗口可视区域高度
    //     // alert($(document).height()); //浏览器时下窗口文档的高度
    //     // alert($(document.body).height()); //浏览器时下窗口文档body的高度
    //     // alert($(document.body).outerHeight(true)); //浏览器时下窗口文档body的总高度 包括border padding margin
    // });
    // 根据生日计算出年龄
Vue.prototype.funcName = function(strBirthday) {
        var returnAge;
        strBirthday = strBirthday.replace(/\s[\x00-\xff]*/g, '')
        var strBirthdayArr = strBirthday.split("-");

        var birthYear = strBirthdayArr[0];
        var birthMonth = strBirthdayArr[1];
        var birthDay = strBirthdayArr[2];

        var d = new Date();
        var nowYear = d.getFullYear();
        var nowMonth = d.getMonth() + 1;
        var nowDay = d.getDate();

        if (nowYear == birthYear) {
            //      returnAge = 0;//同年 则为0岁
            returnAge = nowMonth - birthMonth + '个月';
        } else {
            var ageDiff = nowYear - birthYear; //年之差
            if (ageDiff > 0) {
                if (nowMonth == birthMonth) {
                    var dayDiff = nowDay - birthDay; //日之差
                    if (dayDiff < 0) {
                        returnAge = ageDiff - 1 + '岁';
                    } else {
                        returnAge = ageDiff + '岁';
                    }
                } else {
                    var monthDiff = nowMonth - birthMonth; //月之差
                    if (monthDiff < 0) {
                        returnAge = ageDiff - 1 + '岁';
                    } else {
                        returnAge = ageDiff + '岁';
                    }
                }
            } else {
                returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
            }
        }
        return returnAge; //返回周岁年龄
    }
    //时间格式
var formatTen = function(num) {
    return num > 9 ? (num + "") : ("0" + num);
}
Vue.prototype.formatDate = function(date) {
        if (date) {
            date = new Date(date);

            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hour = date.getHours();
            if (hour < 10) {
                hour = "0" + hour;
            }
            var minute = date.getMinutes();
            if (minute < 10) {
                minute = "0" + minute;
            }
            var second = date.getSeconds();
            if (second < 10) {
                second = "0" + second;
            }
            return year + "-" + formatTen(month) + "-" + formatTen(day) + ' ' + hour + ':' + minute + ':' + second;
        }

    }
    //日期转年龄
Vue.prototype.jsGetAge = function(strBirthday) {
        var returnAge;
        if (strBirthday) {
            var strBirthdayArr = strBirthday.split("-");

            var birthYear = strBirthdayArr[0];
            var birthMonth = strBirthdayArr[1];
            var birthDay = strBirthdayArr[2];

            var d = new Date();
            var nowYear = d.getFullYear();
            var nowMonth = d.getMonth() + 1;
            var nowDay = d.getDate();

            if (nowYear == birthYear) {
                //	        returnAge = 0;//同年 则为0岁
                //不足一个月按一个月
                returnAge = nowMonth - birthMonth == 0 ? '1个月' : nowMonth - birthMonth + '个月'
            } else {
                var ageDiff = nowYear - birthYear; //年之差
                if (ageDiff > 0) {
                    if (nowMonth == birthMonth) {
                        var dayDiff = nowDay - birthDay; //日之差
                        if (dayDiff < 0) {
                            returnAge = ageDiff - 1 + '岁';
                        } else {
                            returnAge = ageDiff + '岁';
                        }
                    } else {
                        var monthDiff = nowMonth - birthMonth; //月之差
                        if (monthDiff < 0) {
                            if (ageDiff - 1 == 0) {
                                returnAge = 12 - birthMonth + nowMonth + '个月';
                            } else {
                                returnAge = ageDiff - 1 + '岁';
                            }
                        } else {
                            returnAge = ageDiff + '岁';
                        }
                    }
                } else {
                    returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
                }
            }
        }

        return returnAge; //返回周岁年龄
    }
    //出生日期格式
Vue.prototype.yourBirth = function(strBirthday) {
        return strBirthday.getFullYear() + "/" + strBirthday.getMonth() + '/' + strBirthday.getDate()
    }
    // alert弹出框
window.alert = function(name) {
    var iframe = document.createElement("IFRAME");
    iframe.style.display = "none";
    iframe.setAttribute("src", 'data:text/plain,');
    document.documentElement.appendChild(iframe);
    window.frames[0].window.alert(name);
    iframe.parentNode.removeChild(iframe);
}
