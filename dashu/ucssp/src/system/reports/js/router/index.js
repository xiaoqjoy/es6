module.exports = {
  name: 'reports',
  path: '/system/reports/:reportCode',
  meta: { systemName: "实时报表" },
  component: resolve => require(['@system/reports'], resolve),
  children: [{
    name: 'data-monitoring',
    path: '/system/reports/data-monitoring',
    component: resolve => require(['@system/reports/data-monitoring/index'], resolve)
  }]
};
