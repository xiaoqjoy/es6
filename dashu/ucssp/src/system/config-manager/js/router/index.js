module.exports = {
  name: 'config-manager',
  path: '/system/config-manager',
  redirect: '/system/config-manager/rule-config',
  component: resolve => require(['@system/config-manager'], resolve),
  meta: {
    requireAuth: true,
    systemName: "配置管理系统"
  },
  children: [{
      name: 'rule-config',
      path: '/system/config-manager/rule-config',
      component: resolve => require(['@system/config-manager/rule-config/rule-config'], resolve)
    },
    {
      name: 'person-config',
      path: '/system/config-manager/person-config',
      component: resolve => require(['@system/config-manager/person-config/person-config'], resolve),
      redirect: '/system/config-manager/person-config/model-config',
      children: [
        {
          name: 'model-config',
          path: 'model-config',
          component: resolve => require(['@system/config-manager/person-config/model-config/model-config'], resolve)
        },
        {
          name: 'auth-officer',
          path: 'auth-officer',
          component: resolve => require(['@system/config-manager/person-config/auth-officer/auth-officer'], resolve)
        },
        {
          name: 'config-group',
          path: 'config-group',
          component: resolve => require(['@system/config-manager/person-config/config-group/config-group'], resolve)
        }
      ]
    },
    {
      name: 'dis-function',
      path: '/system/config-manager/dis-function',
      redirect: '/system/config-manager/dis-function/prior-match',
      component: resolve => require(['@system/config-manager/dis-function/dis-function'], resolve),
      children: [
        {
          name: 'prior-match',
          path: 'prior-match',
          component: resolve => require(['@system/config-manager/dis-function/prior-match/prior-match'], resolve)
        },
        {
          name: 'busines-limited',
          path: 'busines-limited',
          component: resolve => require(['@system/config-manager/dis-function/busines-limited/busines-limited'], resolve)
        },
        {
          name: 'staff-status',
          path: 'staff-status',
          component: resolve => require(['@system/config-manager/dis-function/staff-status/staff-status'], resolve)
        }
      ]
    },
    {
      name: 'oper-config',
      path: '/system/config-manager/oper-config',
      component: resolve => require(['@system/config-manager/oper-config/oper-config'], resolve),
      redirect: '/system/config-manager/oper-config/reason-config',
      children: [
        {
          name: 'reason-config',
          path: 'reason-config',
          component: resolve => require(['@system/config-manager/oper-config/reason-config/reason-config'], resolve)
        },
        {
          name: 'cause-allocation',
          path: 'cause-allocation',
          component: resolve => require(['@system/config-manager/oper-config/cause-allocation/cause-allocation'], resolve)
        },
        {
          name: 'check-config',
          path: 'check-config',
          component: resolve => require(['@system/config-manager/oper-config/check-config/check-config'], resolve)
        },
        {
          name: 'veto-allocation',
          path: 'veto-allocation',
          component: resolve => require(['@system/config-manager/oper-config/veto-allocation/veto-allocation'], resolve)
        },
        {
          name: 'back-allocation',
          path: 'back-allocation',
          component: resolve => require(['@system/config-manager/oper-config/back-allocation/back-allocation'], resolve)
        },
        {
          name: 'derate-allocation',
          path: 'derate-allocation',
          component: resolve => require(['@system/config-manager/oper-config/derate-allocation/derate-allocation'], resolve)
        }
      ]
    }
  ]
};
