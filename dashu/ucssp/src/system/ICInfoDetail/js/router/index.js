module.exports = {
  name: 'ICInfoDetail',
  path: '/system/ICInfoDetail',
  component: resolve => require(['@system/ICInfoDetail'], resolve),
  redirect: '/system/ICInfoDetail/index',
  meta: {
    requireAuth: true,
    systemName: '工商详情信息'
  },
  children: [
    {
      name: 'ICInfo',
      path: 'index',
      meta: {
        requireAuth: true,
        systemName: '工商详情信息'
      },
      component: resolve => require(['@system/ICInfoDetail/index'], resolve)
    }
  ]
};
