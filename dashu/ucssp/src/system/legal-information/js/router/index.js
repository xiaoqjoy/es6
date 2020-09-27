module.exports = {
  name: 'legal-information',
  path: '/system/legal-information',
  redirect: '/system/legal-information/information-query',
  component: resolve => require(['@system/legal-information/index'], resolve),
  meta: {
    requireAuth: true,
    systemName: '法务信息查询'
  },
  children: [
    {
      name: 'information-query',
      path: '/system/legal-information/information-query',
      component: resolve => require(['@system/legal-information/information-query'], resolve),
      meta: { requireAuth: true }
    }
  ]
};
