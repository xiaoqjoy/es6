module.exports = {
  name: 'credit',
  path: '/system/credit',
  redirect: '/system/credit/credit-authority-management',
  component: resolve => require(['@system/credit'], resolve),
  meta: {
    requireAuth: true,
    systemName: "征信权限管理"
  },
  children: [{
      name: 'credit-authority-management',
      path: '/system/credit/credit-authority-management',
      component: resolve => require(['@system/credit/credit-authority-management/credit-authority-management'], resolve)
    },
    {
      name: 'black-box-cm',
      path: '/system/credit/black-box-cm',
      component: resolve => require(['@system/credit/black-box-cm/black-box-cm'], resolve)
    }
  ]
};
