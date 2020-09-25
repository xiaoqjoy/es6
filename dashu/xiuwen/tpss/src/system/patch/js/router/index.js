module.exports = {
  name: 'patch',
  path: '/system/third_patch',
  redirect: '/system/patch/dispose',
  component: resolve => require(['@system/patch'], resolve),
  meta: {
    requireAuth: true,
    systemName: '补件系统'
  },
  children: [{
      name: 'dispose',
      path: 'dispose',
      redirect: '/system/patch/dispose/pending',
      component: resolve => require(['@system/patch/dispose'], resolve),
      children: [{
        name: 'dispose-pending',
        path: 'dispose-pending',
        component: resolve => require(['@system/patch/dispose/pending/pending'], resolve)
      }, {
        name: 'dispose-processed',
        path: 'dispose-processed',
        component: resolve => require(['@system/patch/dispose/processed/processed'], resolve)
      }
    ]
    },
    {
      name: 'review',
      path: 'review',
      component: resolve => require(['@system/patch/review'], resolve),
      children: [{
        name: 'review-pending',
        path: 'review-pending',
        component: resolve => require(['@system/patch/review/pending/pending'], resolve)
      }, {
        name: 'review-processed',
        path: 'review-processed',
        component: resolve => require(['@system/patch/review/processed/processed'], resolve)
      }
    ]
    }
  ]
};
