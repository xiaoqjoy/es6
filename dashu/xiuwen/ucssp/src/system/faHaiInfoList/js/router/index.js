module.exports = {
  name: 'faHaiInfo',
  path: '/system/faHaiInfoList',
  component: resolve => require(['@system/faHaiInfoList'], resolve),
  redirect: '/system/faHaiInfoList/list',
  meta: {
    requireAuth: true
  },
  children: [
    {
      name: 'faHaiInfoDetail',
      path: 'detail',
      component: resolve => require(['@system/faHaiInfoList/detail'], resolve)
    },
    {
      name: 'faHaiInfoList',
      path: 'list',
      component: resolve => require(['@system/faHaiInfoList/list'], resolve)
    }
  ]
};
