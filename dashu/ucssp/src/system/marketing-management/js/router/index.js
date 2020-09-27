module.exports = {
  name: 'marketingManagement',
  path: '/system/marketing-management',
  redirect: '/system/marketing-management/marketing-group',
  component: () => import('@system/marketing-management/index'),
  meta: { systemName: "营销管理系统" },
  children: [
    {
      name: 'marketing-group',
      path: '/system/marketing-management/marketing-group',
      component: () => import('@system/marketing-management/marketing-group/marketing-group')
    },
    {
      name: 'marketing-person',
      path: '/system/marketing-management/marketing-person',
      component: () => import('@system/marketing-management/marketing-person/marketing-person')
    },
    {
      name: 'exclusive-channel',
      path: '/system/marketing-management/exclusive-channel',
      component: () => import('@system/marketing-management/exclusive-channel/exclusive-channel')
    },
    {
      name: 'personal-channel',
      path: '/system/marketing-management/personal-channel',
      component: () => import('@system/marketing-management/personal-channel/personal-channel')
    },
    {
      name: 'organization-channel',
      path: '/system/marketing-management/organization-channel',
      component: () => import('@system/marketing-management/organization-channel/organization-channel')
    },
    {
      name: 'marketers',
      path: '/system/marketing-management/marketers',
      component: () => import('@system/marketing-management/marketers/marketers')
    }
  ]
};
