module.exports = {
  name: 'app-background',
  path: '/system/app-background',
  redirect: '/system/app-background/data-maintenance',
  component: resolve => require(['@system/app-background'], resolve),
  meta: {
    requireAuth: true,
    systemName: "APP后台管理"
  },
  children: [
    {
      name: 'data-maintenance',
      path: '/system/app-background/data-maintenance',
      component: resolve => require(['@system/app-background/data-maintenance/data-maintenance'], resolve)
    },
    {
      name: 'apphome-page',
      path: '/system/app-background/apphome-page',
      component: resolve => require(['@system/app-background/apphome-page/apphome-page'], resolve),
      redirect: '/system/app-background/apphome-page/company-profile',
      children: [
        {
          name: 'app-banner',
          path: 'app-banner',
          component: resolve => require(['@system/app-background/apphome-page/app-banner/app-banner'], resolve)
        },
        {
          name: 'company-profile',
          path: 'company-profile',
          component: resolve => require(['@system/app-background/apphome-page/company-profile/company-profile'], resolve)
        },
        {
          name: 'information-privacy',
          path: 'information-privacy',
          component: resolve => require(['@system/app-background/apphome-page/information-privacy/information-privacy'], resolve)
        }
      ]
    },
    {
      name: 'notification',
      path: '/system/app-background/notification',
      // redirect: '/system/app-background/notification/prior-match',
      component: resolve => require(['@system/app-background/notification/notification'], resolve)
    },
    {
      name: 'upgrade-package',
      path: '/system/app-background/upgrade-package',
      component: resolve => require(['@system/app-background/upgrade-package/upgrade-package'], resolve)
      // redirect: '/system/app-background/upgrade-package/reason-config'
    }
  ]
};
