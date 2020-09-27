module.exports = {
  name: 'account',
  path: '/system/account',
  redirect: '/system/account/business-progress',
  component: () => import('@system/account/index'),
  meta: {
    requireAuth: true,
    systemName: '出账系统'
  },
  children: [
    // {
    //   name: 'bankCard-check-rule-maintain',
    //   path: 'bankCard-check-rule-maintain',
    //   component: resolve => require(['@system/account/bankCard-check-rule-maintain/bankCard-check-rule-maintain'], resolve)
    // },
    {
      name: 'pricing-lock',
      path: 'pricing-lock',
      component: resolve => require(['@system/account/pricing-lock/pricing-lock'], resolve)
    },
    {
      name: 'business-progress',
      path: 'business-progress',
      component: resolve => require(['@system/account/business-progress/business-progress'], resolve)
    },
    // {
    //   name: 'insurance-manage',
    //   path: 'insurance-manage',
    //   redirect: '/system/account/insurance-manage/insurance-approving',
    //   component: resolve => require(['@system/account/insurance-manage/insurance-manage'], resolve),
    //   children: [
    //     {
    //       name: 'insurance-approving',
    //       path: 'insurance-approving',
    //       component: resolve => require(['@system/account/insurance-manage/insurance-approving/insurance-approving'], resolve)
    //     },
    //     {
    //       name: 'insurance-disposed',
    //       path: 'insurance-disposed',
    //       component: resolve => require(['@system/account/insurance-manage/insurance-disposed/insurance-disposed'], resolve)
    //     }
    //   ]
    // },
    {
      name: 'system-docking-abnormal',
      path: 'system-docking-abnormal',
      component: resolve => require(['@system/account/system-docking-abnormal/system-docking-abnormal'], resolve)
    },
    // {
    //   name: 'partner-mail-inquiry',
    //   path: 'partner-mail-inquiry',
    //   component: resolve => require(['@system/account/partner-mail-inquiry/partner-mail-inquiry'], resolve)
    // },
    // {
    //   name: 'email-detail',
    //   path: 'email-detail',
    //   component: resolve => require(['@system/account/partner-mail-inquiry/email-detail'], resolve)
    // },
    {
      name: 'expenditure-manage',
      path: 'expenditure-manage',
      component: resolve => require(['@system/account/expenditure-manage/expenditure-manage'], resolve)
    },
    // {
    //   name: 'email-config',
    //   path: 'email-config',
    //   component: resolve => require(['@system/account/email-config/email-config'], resolve)
    // },
    {
      name: 'loan-derating',
      path: 'loan-derating',
      redirect: '/system/account/loan-derating/derating-approving',
      component: resolve => require(['@system/account/loan-derating/loan-derating'], resolve),
      children: [
        {
          name: 'derating-approving',
          path: 'derating-approving',
          component: resolve => require(['@system/account/loan-derating/derating-approving/derating-approving'], resolve)
        },
        {
          name: 'derating-disposed',
          path: 'derating-disposed',
          component: resolve => require(['@system/account/loan-derating/derating-disposed/derating-disposed'], resolve)
        }
      ]
    },
    {
      name: 'tax-data-config',
      path: 'tax-data-config',
      component: resolve => require(['@system/account/tax-data-config/tax-data-config'], resolve)
    }
  ]
};
