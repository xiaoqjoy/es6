module.exports = {
  name: 'third_spare',
  path: '/system/third_spare',
  redirect: '/system/third_spare/solving',
  component: resolve => require(['@system/spare'], resolve),
  meta: {
    requireAuth: true,
    systemName: '第三方收件备签系统'
  },
  children: [
    {
      name: 'spareSolving',
      path: '/system/third_spare/solving',
      component: resolve => require(['@system/spare/solving/solving'], resolve)
    },
    {
      name: 'spareSolved',
      path: '/system/third_spare/solved',
      component: resolve => require(['@system/spare/solved/solved'], resolve)
    },
    {
      name: 'sparePassed',
      path: '/system/third_spare/passed',
      component: resolve => require(['@system/spare/passed/passed'], resolve)
    }
  ]
};
