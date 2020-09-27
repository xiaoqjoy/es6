module.exports = {
  name: 'survey',
  path: '/system/survey',
  redirect: '/system/survey/locale-surver',
  component: () => import('@system/survey/index'),
  meta: {
    requireAuth: true,
    systemName: '调查管理系统'
  },
  children: [
    {
      name: 'locale-survey',
      path: 'locale-survey',
      redirect: '/system/survey/locale-survey/pending-task',
      component: resolve => require(['@system/survey/locale-survey/index'], resolve),
      children: [
        {
          name: 'pending-task',
          path: 'pending-task',
          component: resolve => require(['@system/survey/locale-survey/pending-task/pending-task'], resolve)
        },
        {
          name: 'surveying-task',
          path: 'surveying-task',
          component: resolve => require(['@system/survey/locale-survey/surveying-task/surveying-task'], resolve)
        },
        {
          name: 'processed-task',
          path: 'processed-task',
          component: resolve => require(['@system/survey/locale-survey/processed-task/processed-task'], resolve)
        },
        {
          name: 'line-failure',
          path: 'line-failure',
          component: resolve => require(['@system/survey/locale-survey/line-failure/line-failure'], resolve)
        },
        {
          name: 'pending-task-detail',
          path: 'pending-task-detail',
          component: resolve => require(['@system/survey/locale-survey/pending-task/pending-task-detail'], resolve)
        },
        {
          name: 'surveying-task-detail',
          path: 'surveying-task-detail',
          component: resolve => require(['@system/survey/locale-survey/surveying-task/surveying-task-detail'], resolve)
        },
        {
          name: 'processed-task-detail',
          path: 'processed-task-detail',
          component: resolve => require(['@system/survey/locale-survey/processed-task/processed-task-detail'], resolve)
        },
        {
          name: 'line-failure-detail',
          path: 'line-failure-detail',
          component: resolve => require(['@system/survey/locale-survey/processed-task/processed-task-detail'], resolve)
        }
      ]
    },
    {
      name: 'locale-survey-manager',
      path: 'locale-survey-manager',
      redirect: '/system/survey/locale-survey-manager/assigning-task',
      component: resolve => require(['@system/survey/locale-survey-manager/index'], resolve),
      children: [
      {
        name: 'assigning-task',
        path: 'assigning-task',
        component: resolve => require(['@system/survey/locale-survey-manager/assigning-task/assigning-task'], resolve)
      },
      {
        name: 'under-investigation',
        path: 'under-investigation',
        component: resolve => require(['@system/survey/locale-survey-manager/under-investigation/under-investigation'], resolve)
      },
      {
        name: 'recheck-task',
        path: 'recheck-task',
        component: resolve => require(['@system/survey/locale-survey-manager/recheck-task/recheck-task'], resolve)
      },
      {
        name: 'finished-task',
        path: 'finished-task',
        component: resolve => require(['@system/survey/locale-survey-manager/finished-task/finished-task'], resolve)
      },
      {
        name: 'limit-failure',
        path: 'limit-failure',
        component: resolve => require(['@system/survey/locale-survey-manager/limit-failure/limit-failure'], resolve)
      },
      {
        name: 'rule-configuration',
        path: 'rule-configuration',
        component: resolve => require(['@system/survey/locale-survey-manager/rule-configuration/rule-configuration'], resolve)
      },
      {
        name: 'assigning-task-detail',
        path: 'assigning-task-detail',
        component: resolve => require(['@system/survey/locale-survey-manager/assigning-task/assigning-task-detail'], resolve)
      },
      {
        name: 'under-investigation-detail',
        path: 'under-investigation-detail',
        component: resolve => require(['@system/survey/locale-survey-manager/under-investigation/under-investigation-detail'], resolve)
      },
      {
        name: 'recheck-task-detail',
        path: 'recheck-task-detail',
        component: resolve => require(['@system/survey/locale-survey-manager/recheck-task/recheck-task-detail'], resolve)
      },
      {
        name: 'finished-task-detail',
        path: 'finished-task-detail',
        component: resolve => require(['@system/survey/locale-survey-manager/finished-task/finished-task-detail'], resolve)
      },
      {
        name: 'limit-failure-detail',
        path: 'limit-failure-detail',
        component: resolve => require(['@system/survey/locale-survey-manager/finished-task/finished-task-detail'], resolve)
      }
    ]
    },
    {
      name: 'survey-manager-config',
      path: 'survey-manager-config',
      redirect: '/system/survey/survey-manager-config/survey-rule-config',
      component: resolve => require(['@system/survey/survey-manager-config/index'], resolve),
      children: [
        {
          name: 'survey-rule-config',
          path: 'survey-rule-config',
          component: resolve => require(['@system/survey/survey-manager-config/survey-rule-config/survey-rule-config'], resolve)
        },
        {
          name: 'business-config',
          path: 'business-config',
          component: resolve => require(['@system/survey/survey-manager-config/business-config/business-config'], resolve)
        },
        {
          name: 'industry-config',
          path: 'industry-config',
          component: resolve => require(['@system/survey/survey-manager-config/industry-config/industry-config'], resolve)
        },
        {
          name: 'second-industry-config',
          path: 'second-industry-config',
          component: resolve => require(['@system/survey/survey-manager-config/industry-config/second-industry-config'], resolve)
        },
        {
          name: 'field-config',
          path: 'field-config',
          component: resolve => require(['@system/survey/survey-manager-config/field-config/field-config'], resolve)
        }
      ]
    }
  ]
};
