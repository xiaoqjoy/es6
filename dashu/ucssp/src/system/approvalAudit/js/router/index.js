module.exports = {
  name: 'approvalAudit',
  path: '/system/approvalAudit',
  redirect: '/system/approvalAudit/approval',
  component: resolve => require(['@system/approvalAudit'], resolve),
  meta: {
    requireAuth: true,
    systemName: '审批审计系统'
  },
  children: [
    {
      name: 'approval',
      path: 'approval',
      redirect: '/system/approvalAudit/approval/approval-pending',
      component: resolve => require(['@system/approvalAudit/approval'], resolve),
      children: [{
          name: 'approval-pending',
          path: 'approval-pending',
          component: resolve => require(['@system/approvalAudit/approval/approval-pending/approval-pending'], resolve)
        }, {
          name: 'approval-pending-start',
          path: '/system/approvalAudit/approval/approval-pending-start',
          component: resolve => require(['@system/approvalAudit/approval/approval-pending/approval-pending-start'], resolve)
        },
        {
          name: 'pre-approval',
          path: 'pre-approval',
          component: resolve => require(['@system/approvalAudit/preApprovalAudit/preApproval'], resolve)
        },
        {
          name: 'threedataNowdayA',
          path: 'threedataNowdayB',
          component: resolve => require(['@system/approvalAudit/dialogCom/threedataNowdayB'], resolve)
        },
        {
          name: 'huifaA',
          path: 'huifa',
          component: resolve => require(['@system/approvalAudit/dialogCom/huifa'], resolve)
        },
        {
          name: 'relevanceInformationA',
          path: 'relevanceInformation',
          component: resolve => require(['@system/approvalAudit/dialogCom/relevanceInformation'], resolve)
        },
        {
          name: 'creditReportMsgA',
          path: 'creditReportMsg',
          component: resolve => require(['@system/approvalAudit/dialogCom/creditReportMsg'], resolve)
        },
        {
          name: 'surveyReportA',
          path: 'surveyReport',
          component: resolve => require(['@system/approvalAudit/dialogCom/surveyReport'], resolve)
        },
        {
          name: 'phoneVideoA',
          path: 'phoneVideo',
          component: resolve => require(['@system/approvalAudit/dialogCom/phone-video'], resolve)
        },
        {
          name: 'closeTheTipA',
          path: 'closeTheTip',
          component: resolve => require(['@system/approvalAudit/dialogCom/closeTheTip'], resolve)
        }
      ]
    },
    {
      name: 'audit',
      path: 'audit',
      redirect: '/system/approvalAudit/audit/audit-pending',
      component: resolve => require(['@system/approvalAudit/audit'], resolve),
      children: [{
          name: 'audit-pending',
          path: 'audit-pending',
          component: resolve => require(['@system/approvalAudit/audit/audit-pending/audit-pending'], resolve)
        }, {
          name: 'audit-pending-start',
          path: '/system/approvalAudit/audit/audit-pending-start',
          component: resolve => require(['@system/approvalAudit/audit/audit-pending/audit-pending-start'], resolve)
        },
        {
          name: 'pre-audit',
          path: 'pre-audit',
          component: resolve => require(['@system/approvalAudit/preApprovalAudit/preAudit'], resolve)
        },
        {
          name: 'threedataNowdayB',
          path: 'threedataNowdayB',
          component: resolve => require(['@system/approvalAudit/dialogCom/threedataNowdayB'], resolve)
        },
        {
          name: 'huifaB',
          path: 'huifa',
          component: resolve => require(['@system/approvalAudit/dialogCom/huifa'], resolve)
        },
        {
          name: 'relevanceInformationB',
          path: 'relevanceInformation',
          component: resolve => require(['@system/approvalAudit/dialogCom/relevanceInformation'], resolve)
        },
        {
          name: 'creditReportMsgB',
          path: 'creditReportMsg',
          component: resolve => require(['@system/approvalAudit/dialogCom/creditReportMsg'], resolve)
        },
        {
          name: 'surveyReportB',
          path: 'surveyReport',
          component: resolve => require(['@system/approvalAudit/dialogCom/surveyReport'], resolve)
        },
        {
          name: 'phoneVideoB',
          path: 'phoneVideo',
          component: resolve => require(['@system/approvalAudit/dialogCom/phone-video'], resolve)
        },
        {
          name: 'closeTheTipB',
          path: 'closeTheTip',
          component: resolve => require(['@system/approvalAudit/dialogCom/closeTheTip'], resolve)
        }
      ]
    }
  ]
};
