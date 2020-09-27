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
    },
    {
      name: 'collectionList',
      path: '/system/business-management/collection',
      component: resolve => require(['@system/business-management/collection'], resolve)
    },
    {
      name: 'approvalCollection',
      path: 'approval-pending-start',
      component: resolve => require(['@system/business-management/collection/approvalAudit/approval/approval-pending/approval-pending-start'], resolve)
    },
    {
      name: 'approvalSurveyReport',
      path: 'surveyReport',
      component: resolve => require(['@system/business-management/collection/approvalAudit/dialogCom/surveyReport'], resolve)
    },
    {
      name: 'approvalRelevanceInformation',
      path: 'relevanceInformation',
      component: resolve => require(['@system/business-management/collection/approvalAudit/dialogCom/relevanceInformation'], resolve)
    },
    {
      name: 'auditCollection',
      path: 'audit-pending-start',
      component: resolve => require(['@system/business-management/collection/approvalAudit/audit/audit-pending/audit-pending-start'], resolve)
    },
    {
      name: 'auditSurveyReport',
      path: 'surveyReport',
      component: resolve => require(['@system/business-management/collection/approvalAudit/dialogCom/surveyReport'], resolve)
    },
    {
      name: 'auditRelevanceInformation',
      path: 'relevanceInformation',
      component: resolve => require(['@system/business-management/collection/approvalAudit/dialogCom/relevanceInformation'], resolve)
    },
    {
      name: 'huifaA',
      path: 'huifa',
      component: resolve => require(['@system/approvalAudit/dialogCom/huifa'], resolve)
    }
  ]
};
