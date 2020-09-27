module.exports = {
  name: 'tsapw-channel',
  path: '/system/tsapw-channel',
  redirect: '/system/tsapw-channel/partner-maintain',
  component: resolve => require(['@system/tsapw-channel'], resolve),
  meta: {
    requireAuth: true,
    systemName: "创新渠道管理平台"
  },
  children: [
    {
      name: 'tsapw-partner-maintain',
      path: '/system/tsapw-channel/partner-maintain',
      component: resolve => require(['@system/tsapw-channel/partner-maintain'], resolve),
      redirect: '/system/tsapw-channel/partner-maintain/home-management',
      children: [
        {
          name: 'home-management',
          path: 'home-management',
          redirect: '/system/tsapw-channel/partner-maintain/home-management/poster',
          component: resolve => require(['@system/tsapw-channel/partner-maintain/home-management'], resolve),
          children: [
            {
              name: 'poster',
              path: 'poster',
              component: resolve => require(['@system/tsapw-channel/partner-maintain/home-management/poster/poster'], resolve)
            },
            {
              name: 'notice',
              path: 'notice',
              component: resolve => require(['@system/tsapw-channel/partner-maintain/home-management/notice/notice'], resolve)
            },
            {
              name: 'notes',
              path: 'notes',
              component: resolve => require(['@system/tsapw-channel/partner-maintain/home-management/notes/notes'], resolve)
            }
          ]
        }
      ]
    },
    {
      name: 'channel-management',
      path: '/system/tsapw-channel/channel-management',
      component: resolve => require(['@system/tsapw-channel/channel-management'], resolve),
      redirect: '/system/tsapw-channel/channel-management/list',
      children: [
        {
          name: 'channel-management-list',
          path: 'list',
          component: resolve => require(['@system/tsapw-channel/channel-management/list'], resolve)
        },
        {
          name: 'channel-management-detail',
          path: 'info-detail',
          component: resolve => require(['@system/tsapw-channel/channel-management/info-detail/index'], resolve)
        }
      ]
    }
  ]
};
