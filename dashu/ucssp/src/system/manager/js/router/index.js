module.exports = {
  name: 'manager',
  path: '/system/manager',
  redirect: '/system/manager/credit-auths',
  component: resolve => require(['@system/manager/index'], resolve),
  meta: { requireAuth: true, systemName: '处理中心经理及中台管理系统' },
  children: [
    {
      name: 'credit-auths',
      path: 'credit-auths',
      component: resolve => require(['@system/manager/credit-auths/index'], resolve)
    },
    {
      name: 'counter-f2f',
      path: 'counter-f2f',
      component: resolve => require(['@system/manager/counter-f2f/index'], resolve)
    },
    {
      name: 'remote-f2f',
      path: 'remote-f2f',
      component: resolve => require(['@system/manager/remote-f2f/index'], resolve)
    },
    {
      name: 'counter-to-remote',
      path: 'counter-to-remote',
      component: resolve => require(['@system/manager/counter-remote/index'], resolve)
    },
    {
      name: 'remote-to-counter',
      path: 'remote-to-counter',
      component: resolve => require(['@system/manager/remote-counter/index'], resolve)
    }
  ]
};
