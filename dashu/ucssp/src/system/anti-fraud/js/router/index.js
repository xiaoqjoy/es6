module.exports = {
  name: 'anti-fraud',
  path: '/system/anti-fraud',
  redirect: '/system/anti-fraud/watch-list-management',
  component: resolve => require(['@system/anti-fraud'], resolve),
  meta: {
    requireAuth: true,
    systemName: "黑名单系统"
   },
  children: [
    {
      name: 'watch-list-management',
      path: '/system/anti-fraud/watch-list-management',
      component: resolve => require(['@system/anti-fraud/watch-list-management/watch-list-management'], resolve)
    },
    {
      name: 'blacklist-management',
      path: '/system/anti-fraud/blacklist-management',
      component: resolve => require(['@system/anti-fraud/blacklist-management/blacklist-management'], resolve)
    },
    {
      name: 'customer-manager-blacklist-management',
      path: '/system/anti-fraud/customer-manager-blacklist-management',
      component: resolve => require(['@system/anti-fraud/customer-manager-blacklist-management/customer-manager-blacklist-management'], resolve)
    },
    {
      name: 'channel-blacklist-management',
      path: '/system/anti-fraud/channel-blacklist-management',
      component: resolve => require(['@system/anti-fraud/channel-blacklist-management/channel-blacklist-management'], resolve)
    }
  ]
};
