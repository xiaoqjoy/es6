module.exports = {
  name: 'management-loan',
  path: '/system/management-loan',
  redirect: '/system/management-loan/archives-management',
  component: resolve => require(['@system/management-loan'], resolve),
  meta: {
    requireAuth: true,
    systemName: "贷后管理"
  },
  children: [
    {
      name: 'archives-management',
      path: '/system/management-loan/archives-management',
      component: resolve => require(['@system/management-loan/archives-management/archives-management'], resolve)
    },
    {
      name: 'archives-adjustment',
      path: '/system/management-loan/archives-adjustment',
      component: resolve => require(['@system/management-loan/archives-adjustment'], resolve),
      redirect: '/system/management-loan/archives-adjustment/file_make',
      children: [
        {
          name: 'file_make',
          path: 'file_make',
          redirect: '/system/management-loan/archives-adjustment/file_make/pending_make',
          component: resolve => require(['@system/management-loan/archives-adjustment/file_make'], resolve),
          children: [
            {
              name: 'pending_make',
              path: 'pending_make',
              component: resolve => require(['@system/management-loan/archives-adjustment/file_make/pending_make/pending_make'], resolve)
            },
            {
              name: 'processed_make',
              path: 'processed_make',
              component: resolve => require(['@system/management-loan/archives-adjustment/file_make/processed_make/processed_make'], resolve)
            }
          ]
        },
        {
          name: 'file_review',
          path: 'file_review',
          redirect: '/system/management-loan/archives-adjustment/file_review/pending_review',
          component: resolve => require(['@system/management-loan/archives-adjustment/file_review'], resolve),
          children: [
            {
              name: 'pending_review',
              path: 'pending_review',
              component: resolve => require(['@system/management-loan/archives-adjustment/file_review/pending_review/pending_review'], resolve)
            },
            {
              name: 'processed_review',
              path: 'processed_review',
              component: resolve => require(['@system/management-loan/archives-adjustment/file_review/processed_review/processed_review'], resolve)
            }
          ]
        },
        {
          name: 'lending',
          path: 'lending',
          redirect: '/system/management-loan/archives-adjustment/lending/pending_lending',
          component: resolve => require(['@system/management-loan/archives-adjustment/lending'], resolve),
          children: [
            {
              name: 'pending_lending',
              path: 'pending_lending',
              component: resolve => require(['@system/management-loan/archives-adjustment/lending/pending_lending/pending_lending'], resolve)
            },
            {
              name: 'processed_lending',
              path: 'processed_lending',
              component: resolve => require(['@system/management-loan/archives-adjustment/lending/processed_lending/processed_lending'], resolve)
            }
          ]
        }
      ]
    }
  ]
};
