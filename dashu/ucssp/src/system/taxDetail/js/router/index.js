module.exports = {
  name: 'taxDetail',
  path: '/system/taxDetail',
  component: resolve => require(['@system/taxDetail'], resolve),
  redirect: '/system/taxDetail/index',
  meta: {
    requireAuth: true,
    systemName: '企业税务征信报告'
  },
  children: [
    {
      name: 'taxDetailIndex',
      path: 'index',
      meta: {
        requireAuth: true,
        systemName: '企业税务征信报告'
      },
      component: resolve => require(['@system/taxDetail/index'], resolve)
    }
  ]
};
