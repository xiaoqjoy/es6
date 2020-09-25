module.exports = {
  name: 'external-management',
  path: '/system/external-management',
  redirect: '/system/external-management/partner-maintain',
  component: resolve => require(['@system/external-management'], resolve),
  meta: {
    requireAuth: true,
    systemName: "外部渠道综合管理平台"
  },
  children: [
    {
      name: 'partner-maintain',
      path: '/system/external-management/partner-maintain',
      component: resolve => require(['@system/external-management/partner-maintain'], resolve),
      redirect: '/system/external-management/partner-maintain/home-management',
      children: [
        {
          name: 'home-management',
          path: 'home-management',
          redirect: '/system/external-management/partner-maintain/home-management/poster',
          component: resolve => require(['@system/external-management/partner-maintain/home-management'], resolve),
          children: [
            {
              name: 'poster',
              path: 'poster',
              component: resolve => require(['@system/external-management/partner-maintain/home-management/poster/poster'], resolve)
            },
            {
              name: 'notice',
              path: 'notice',
              component: resolve => require(['@system/external-management/partner-maintain/home-management/notice/notice'], resolve)
            }
          ]
        },
        {
          name: 'partner-notification',
          path: '/system/external-management/partner-maintain/partner-notification',
          component: resolve => require(['@system/external-management/partner-maintain/partner-notification/partner-notification'], resolve)
        }
      ]
    },
    {
      name: 'partner-management',
      path: '/system/external-management/partner-management',
      component: resolve => require(['@system/external-management/partner-management'], resolve),
      redirect: '/system/external-management/partner-management/role-management',
      children: [
        // {
        //   name: 'role-management',
        //   path: '/system/external-management/partner-management/role-management',
        //   component: resolve => require(['@system/external-management/partner-management/role-management/role-management'], resolve)
        // },
        {
          name: 'user-management',
          path: 'user-management',
          redirect: '/system/external-management/partner-management/user-management/user-control',
          component: resolve => require(['@system/external-management/partner-management/user-management'], resolve),
          children: [
            {
              name: 'user-control',
              path: 'user-control',
              component: resolve => require(['@system/external-management/partner-management/user-management/user-control/user-control'], resolve)
            },
            {
              name: 'import-users',
              path: 'import-users',
              component: resolve => require(['@system/external-management/partner-management/user-management/import-users/import-users'], resolve)
            }
          ]
        },
        {
          name: 'recommend-management',
          path: '/system/external-management/partner-management/recommend-management',
          component: resolve => require(['@system/external-management/partner-management/recommend-management/recommend-management'], resolve)
        },
        {
          name: 'credit-management',
          path: '/system/external-management/partner-management/credit-management',
          component: resolve => require(['@system/external-management/partner-management/credit-management/credit-management'], resolve)
        }
      ]
    }
  ]
};
