module.exports = {
  name: 'reports',
  path: '/system/reports/:reportCode',
  meta: { systemName: "实时报表" },
  component: resolve => require(['@system/reports'], resolve)
};
