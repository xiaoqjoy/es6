module.exports = {
  name: 'spare',
  path: '/system/spare',
  redirect: '/system/spare/solving',
  component: resolve => require(['@system/spare'], resolve),
  meta: {
    requireAuth: true,
    systemName: '收件备签系统'
  },
  children: [
    {
      name: 'spareSolving',
      path: '/system/spare/solving',
      component: resolve => require(['@system/spare/solving/solving'], resolve)
    },
    {
      name: 'spareSolved',
      path: '/system/spare/solved',
      component: resolve => require(['@system/spare/solved/solved'], resolve)
    },
    {
      name: 'sparePassed',
      path: '/system/spare/passed',
      component: resolve => require(['@system/spare/passed/passed'], resolve)
    }
  ]
};
