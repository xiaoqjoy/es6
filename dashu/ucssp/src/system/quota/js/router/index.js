module.exports = {
    name: 'quota',
    path: '/system/quota',
    redirect: '/system/quota/quota-list',
    component: resolve => require(['@system/quota'], resolve),
    meta: { requireAuth: true },
    children: [
      {
        name: 'quota-list',
        path: '/system/quota/quota-list',
        component: resolve => require(['@system/quota/quota-list/quota-list'], resolve)
      },
      {
        name: 'quota-inquire',
        path: '/system/quota/quota-inquire',
        component: resolve => require(['@system/quota/quota-inquire/quota-inquire'], resolve)
      },
      {
        name: 'quota-configuration',
        path: '/system/quota/quota-configuration',
        component: resolve => require(['@system/quota/quota-configuration/quota-configuration'], resolve)
      },
      {
        name: 'quota-earlywarning',
        path: '/system/quota/quota-earlywarning',
        component: resolve => require(['@system/quota/quota-earlywarning/quota-earlywarning'], resolve)
      },
      {
        name: 'quota-priority',
        path: '/system/quota/quota-priority',
        component: resolve => require(['@system/quota/quota-priority/quota-priority'], resolve)
      }
    ]
  };
