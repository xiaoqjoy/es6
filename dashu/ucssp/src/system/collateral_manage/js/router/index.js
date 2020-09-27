module.exports = {
  name: 'collateral-manage',
  path: '/system/collateral-manage',
  redirect: '/system/collateral-manage/mortgage-review/unprocessed',
  component: resolve => require(['@system/collateral_manage/index'], resolve),
  meta: {
    requireAuth: true,
    systemName: '押品管理'
  },
  children: [
    {
      name: 'mortgage-review',
      path: 'mortgage-review',
      redirect: '/system/collateral-manage/mortgage-review/unprocessed',
      component: resolve => require(['@system/collateral_manage/mortgage_review'], resolve),
      children: [
        {
          name: 'mortgage-review-unprocessed',
          path: 'unprocessed',
          component: resolve => require(['@system/collateral_manage/mortgage_review/unprocessed'], resolve)
        },
        {
          name: 'mortgage-review-processed',
          path: 'processed',
          component: resolve => require(['@system/collateral_manage/mortgage_review/processed'], resolve)
        }
      ]
    },
    {
      name: 'other-items-upload',
      path: 'other-items-upload',
      redirect: '/system/collateral-manage/other-items-upload/unprocessed',
      component: resolve => require(['@system/collateral_manage/other_items_upload'], resolve),
      children: [
        {
          name: 'other-items-upload-unprocessed',
          path: 'unprocessed',
          component: resolve => require(['@system/collateral_manage/other_items_upload/unprocessed'], resolve)
        },
        {
          name: 'other-items-upload-processed',
          path: 'processed',
          component: resolve => require(['@system/collateral_manage/other_items_upload/processed'], resolve)
        }
      ]
    }
  ]
};
