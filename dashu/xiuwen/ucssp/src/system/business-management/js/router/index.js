module.exports = {
  name: 'business-management',
  path: '/system/business-management',
  redirect: '/system/business-management/completed-query',
  component: resolve => require(['@system/business-management'], resolve),
  meta: {
    requireAuth: true,
    systemName: "业务管理系统"
  },
  children: [{
      name: 'completed-query',
      path: '/system/business-management/completed-query',
      component: resolve => require(['@system/business-management/completed-query'], resolve)
    },
    // {
    //   name: 'approval-pending-start',
    //   path: '/system/business-management/completed-query/approval-pending-start/:id',
    //   component: resolve => require(['@system/approvalAudit/approval/approval-pending/approval-pending-start'], resolve)
    // },
    {
      name: 'business-inquiry',
      path: '/system/business-management/business-inquiry',
      component: resolve => require(['@system/business-management/business-inquiry'], resolve)
    }
  ]
};
