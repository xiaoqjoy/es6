module.exports = {
  name: 'reports',
  path: '/system/reports/:reportCode',
  meta: { systemName: "ʵʱ����" },
  component: resolve => require(['@system/reports'], resolve)
};
