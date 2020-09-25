module.exports = {
  name: 'local-customer-service',
  path: '/system/local-customer-service',
  redirect: '/system/local-customer-service/customer-config',
  component: resolve => require(['@system/local-customer-service/index'], resolve),
  meta: {
    requireAuth: true,
    systemName: '属地客服管理'
  },
  children: [
    {
      name: 'customer-config',
      path: '/system/local-customer-service/customer-config',
      component: resolve => require(['@system/local-customer-service/customer-config'], resolve),
      meta: { requireAuth: true }
    }
  ]
};
