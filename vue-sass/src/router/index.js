import Vue from 'vue'
import Router from 'vue-router'
import logo from '@/components/logo'
import common from '@/components/common/common'
import baseModel from '@/components/common/baseModel'
import top from '@/components/common/top'
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
import followWay from '@/components/system/basedDiction/followWay'
import interType from '@/components/system/basedDiction/interType'
import patientsType from '@/components/system/basedDiction/patientsType'
import temManage from '@/components/system/temManage/temManage'
import followTemplate from '@/components/system/temManage/followTemplate'
import interTemplate from '@/components/system/temManage/interTemplate'
import addPatient from '@/components/patient/addPatient'
import homePage from '@/components/homepage/homePage'
import followUp from '@/components/followup/followUp'
import interacTive from '@/components/interactive/interacTive'
import query from '@/components/query/query'
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
        {
            path: '/interacTive',
            name: 'interacTive',
            component: interacTive
        },
        {
            path: '/query',
            name: 'query',
            component: query
        },
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
            path: '/sugerHighLow',
            component: sugerHighLow
        },
        {
            path: '/sugarWarningPage',
            component: sugarWarningPage
        }
    ]
})

var websocket = null;
if (!('WebSocket' in window)) { 
    alert('该浏览器不支持websocket');
}
//加载机构列表
router.beforeEach((to, from, next) => {
    if (to.path == '/patientManage') {
        axios.get('/organization/v1/queryOrganAndCustomerCountList')
            .then(function(res) {
                var ds = res.data.data;
                if (ds && ds.length > 0) {
                    ds.map(function(e) {
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
router.afterEach((to, from) => {
    // console.log(this);
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
            setTimeout(() => {
                let user = sessionStorage.getItem('user');
                let id = (JSON.parse(user)).userId;
                let url = 'ws:' + API_ROOT.API_ROOT.substring(5, API_ROOT.API_ROOT.length) + '/webSocket?userId=' + id;
                websocket = new WebSocket(url);
                openWebsocket();
            }, 100);
        }
    }

    function openWebsocket() {
        websocket.onopen = function(event) { 
            sendmessage('发送信息给后台'); 
        }
        websocket.onmessage = function(event) {  
            let data = JSON.parse(event.data);
            if (Object.prototype.toString.call(data) == '[object Array]') {
                if (!router.apps[0].$children[0].$refs.sugarWarningTips.tipsShow) {
                    router.apps[0].$children[0].$refs.sugarWarningTips.tipsShow = true;
                    router.apps[0].$children[0].patientName = data[0].patientName;
                    router.apps[0].$children[0].getUnreadSum();
                }
            }
        }
        websocket.onclose = function() {
            websocket.close();
        };
    }

    function sendmessage(message) {     websocket.send(message);   }
})
export default router;