module.exports = {
  name: 'business-schedule',
  path: '/system/business-schedule/:status',
  component: () => import('@system/business-schedule/index'),
  meta: {
    requireAuth: true,
    systemName: '业务处理进度'
  }
};
