module.exports = {
  name: 'scan-image',
  path: '/system/scan-image',
  redirect: '/system/scan-image/scan-image-undisposed',
  component: resolve => require(['@system/scan-image/index'], resolve),
  meta: { requireAuth: true, systemName: '面签系统' },
  children: [
    {
      name: 'scan-image-undisposed',
      path: 'scan-image-undisposed',
      component: resolve => require(['@system/scan-image/scan-image-undisposed/index'], resolve)
    },
    {
      name: 'scan-image-disposed',
      path: 'scan-image-disposed',
      component: resolve => require(['@system/scan-image/scan-image-disposed/index'], resolve)
    }
  ]
};
