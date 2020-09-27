module.exports = {
  name: 'offline_archive',
  path: '/system/offline_archive',
  redirect: '/system/offline_archive/Special_business',
  component: resolve => require(['@system/offline_archive'], resolve),
  meta: {
    requireAuth: true,
    systemName: "线下建档"
  },
  children: [
    {
      name: 'Special_business',
      path: '/system/offline_archive/Special_business',
      component: resolve => require(['@system/offline_archive/Special_business/index'], resolve),
      redirect: '/system/offline_archive/Special_business/processed_document',
      children: [
        {
          name: 'processed_document',
          path: 'processed_document',
          component: resolve => require(['@system/offline_archive/Special_business/processed_document/processed_document'], resolve)
        },
        {
          name: 'untreated_document',
          path: 'untreated_document',
          component: resolve => require(['@system/offline_archive/Special_business/untreated_document/untreated_document'], resolve)
        }
      ]
    }
  ]
};
