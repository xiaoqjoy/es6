import Vue from 'vue'
import Router from 'vue-router'
import logo from '@/components/logo'
import common from '@/components/common/common'
import baseModel from '@/components/common/baseModel'
import top from '@/components/common/top'
import 'element-ui/lib/theme-chalk/index.css'
//import meng from '@/components/common/mengLayer'
import patientManage from '@/components/patient/patientManage'
import system from '@/components/system/system'
import agencyInfor from '@/components/system/agencyInfor/agencyInfor'
import agenInfor from '@/components/system/agencyInfor/agenInfor'
import manageDepart from '@/components/system/agencyInfor/manageDepart'
import roleManage from '@/components/system/agencyInfor/roleManage'
import staffManage from '@/components/system/agencyInfor/staffManage'
import meansInterven from '@/components/system/basedDiction/meansInterven'
import basedDiction from '@/components/system/basedDiction/basedDiction'
import checkType from '@/components/system/basedDiction/checkType'
import compliName from '@/components/system/basedDiction/compliName'
import template_postfix from '@/components/system/basedDiction/warnSet'
import followWay from '@/components/system/basedDiction/followWay'
import interType from '@/components/system/basedDiction/interType'
import patientsType from '@/components/system/basedDiction/patientsType'
import temManage from '@/components/system/temManage/temManage'
import followTemplate from '@/components/system/temManage/followTemplate'
import interTemplate from '@/components/system/temManage/interTemplate'
import addPatient from '@/components/patient/addPatient'
import homePage from '@/components/homepage/homePage'
import followUp from '@/components/followup/followUp'
import total from '@/components/total/total'
import patientDetail from '@/components/patient/patientDetail'
import edit from '@/components/patient/edit'
import information from '@/components/dataSuger/information'
import sugerHighLow from '@/components/homepage/sugerHighLow'
import sugarWarningPage from '@/components/dataSuger/sugarWarningPage'
import parameter from '@/components/system/parameter/parameter'
import scope from '@/components/system/parameter/scope'
import axios from 'axios'
import API_ROOT from '../api/index'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'logos',
      component: logo
    },
    {
      path: '/common/baseModel',
      name: 'baseModel',
      component: baseModel
    },
    {
      path: '/common',
      name: 'commons',
      component: common
    },
    {
      path: '/top',
      name: 'tops',
      component: top
    },
    {
      path: '/homePage',
      name: 'homePage',
      component: homePage
    },
    {
      path: '/patientManage',
      name: 'patientManage',
      component: patientManage,
    },
    {
      path: '/patientManage/patientDetail',
      name: 'patientDetail',
      component: patientDetail,
    },
    {
      path: '/patientManage/addPatient',
      name: 'addPatient',
      component: addPatient
    },
    {
      path: '/patientManage/edit',
      name: 'edit',
      component: edit
    },
    {
      path: '/followUp',
      name: 'followUp',
      component: followUp
    },

    /*{
        path: '/interacTive',
        name: 'interacTive',
        component: interacTive
    },
    {
        path: '/query',
        name: 'query',
        component: query
    },*/
    {
      path: '/system',
      name: 'system',
      component: system,
    },
    {
      path: '/agencyInfor',
      name: 'agencyInfor',
      component: agencyInfor,
      children: [{
          path: 'agenInfor',
          component: agenInfor,
        },
        {
          path: 'manageDepart',
          component: manageDepart,
        },
        {
          path: 'roleManage',
          component: roleManage,
        },
        {
          path: 'staffManage',
          component: staffManage,
        }
      ]
    },
    {
      path: '/basedDiction',
      component: basedDiction,
      children: [{
          path: 'meansInterven',
          component: meansInterven
        },
        {
          path: 'checkType',
          component: checkType
        },
        {
          path: 'compliName',
          component: compliName
        },
        {
          path: 'template_postfix',
          component: template_postfix
        },
        {
          path: 'followWay',
          component: followWay
        },
        {
          path: 'interType',
          component: interType
        },
        {
          path: 'diabetes_type',
          component: patientsType
        }
      ]
    },
    {
      path: '/temManage',
      component: temManage,
      children: [{
          path: 'interTemplate',
          component: interTemplate
        },
        {
          path: 'followTemplate',
          component: followTemplate
        }
      ]
    },
    {
      path: '/parameter',
      component: parameter,
      children: [{
        path: 'scope',
        component: scope
      }]
    },
    {
      path: '/information',
      component: information
    },
    {
      path: '/total',
      name: 'total',
      component: total
    },
    {
      path: '/sugerHighLow',
      component: sugerHighLow
    },
    {
      path: '/sugarWarningPage',
      component: sugarWarningPage
    }
  ]
});

var websocket = null;
var url = null;
var lockReconnect = false; //避免重复连接
var ws;
var num = 1;

//加载机构列表
router.beforeEach((to, from, next) => {
  if (to.path == '/patientManage') {
    axios.get('/organization/v1/queryOrganAndCustomerCountList')
      .then(function (res) {
        var ds = res.data.data;
        if (ds && ds.length > 0) {
          ds.map(function (e) {
            e.name += '（' + e.count + '）';
          });
        }
        sessionStorage.setItem('orgList', JSON.stringify(ds));
        next();
      });
  } else {
    next();
  }
})

router.afterEach((to, from, next) => {
  if (to.path == '/') {
    if (router.apps[0]) {
      router.apps[0].$children[0].$refs.showWarningInfoList.sugarWarningTableShow = false;
      router.apps[0].$children[0].$refs.sugarWarningSetDialog.dialogVisible = false;
      router.apps[0].$children[0].$refs.sugarWarningTips.tipsShow = false;
    }
    if (websocket && websocket.readyState == '1') {
      websocket.onclose();
    }
  } else {
    if (!websocket || websocket.readyState != '1') {
      num++;
      if(num > 2){
        return
      }else{
        createWebSocket();
      }
    }
  }

  function createWebSocket() {
    setTimeout(() => { //设置时间获取user值
      var user = sessionStorage.getItem('user');
      if (user) {
        var id = (JSON.parse(user)).userId;
      } else {
        return //没有登录时返回
      }
      var url = 'ws:' + API_ROOT.API_ROOT.substring(5, API_ROOT.API_ROOT.length) + '/webSocket?userId=' + id;
      ws = new WebSocket(url);
      initEventHandle();
    }, 100);
  }

  function initEventHandle() {
    ws.onclose = function () {
      reconnect(url);
      ws = null;
    };
    ws.onerror = function () {
      reconnect(url);
    };
    ws.onopen = function () {
      //心跳检测重置
      ws.send('发送信息给后台');
      heartCheck.reset().start(ws);
    };
    ws.onmessage = function (event) {
      //如果获取到消息，心跳检测重置
      //拿到任何消息都说明当前连接是正常的
      heartCheck.reset().start(ws);
      let data = JSON.parse(event.data);
      if (Object.prototype.toString.call(data) == '[object Array]') {
        if (!router.apps[0].$children[0].$refs.sugarWarningTips.tipsShow) {
          router.apps[0].$children[0].$refs.sugarWarningTips.tipsShow = true;
          router.apps[0].$children[0].patientName = data[0].patientName;
          router.apps[0].$children[0].getUnreadSum();
        }
      }
    }
  }

  function reconnect(url) {
    if (lockReconnect) return;
    lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    setTimeout(function () {
      createWebSocket();
      num++; //时间超过2分钟还是连接不上就暂停请求，直到刷新页面再重新开始请求
      if (num > 60) {
        return
      }
      lockReconnect = false;
    }, 2000);
  }

  //心跳检测
  var heartCheck = {
    timeout: 60000,
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function () {
      clearTimeout(this.timeoutObj);
      clearTimeout(this.serverTimeoutObj);
      return this;
    },
    start: function (ws) {
      var _this = this;
      this.timeoutObj = setTimeout(function () {
        //这里发送一个心跳，后端收到后，返回一个心跳消息，
        //onmessage拿到返回的心跳就说明连接正常
        ws.send("HeartBeat");
        _this.serverTimeoutObj = setTimeout(function () { //如果超过一定时间还没重置，说明后端主动断开了
          ws.close(); //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
        }, _this.timeout)
      }, this.timeout)
    }
  }

})
export default router;
