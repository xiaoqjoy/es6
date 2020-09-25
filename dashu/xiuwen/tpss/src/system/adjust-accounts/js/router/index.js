module.exports = {
  name: 'adjust-accounts',
  path: '/system/adjust-accounts',
  redirect: '/system/adjust-accounts/advance-money',
  component: resolve => require(['@system/adjust-accounts'], resolve),
  meta: {
    requireAuth: true,
    systemName: '核算系统'
  },
  children: [
    { // 柜面交易
      name: 'counter-deal',
      path: '/system/adjust-accounts/counter-deal',
      component: resolve => require(['@system/adjust-accounts/counter-deal'], resolve),
      children: [
        { // 提前还款counter-deal/before-repayment/repayment-reserve
          name: 'before-repayment',
          path: '/system/adjust-accounts/counter-deal/before-repayment',
          component: resolve => require(['@system/adjust-accounts/counter-deal/before-repayment'], resolve),
          redirect: '/system/adjust-accounts/counter-deal/before-repayment/repayment-reserve',
          children: [
            { // 还款预约
              name: 'repayment-reserve',
              path: 'repayment-reserve',
              component: resolve => require(['@system/adjust-accounts/counter-deal/before-repayment/repayment-reserve'], resolve)
            },
            { // 退回任务
              name: 'back-task',
              path: 'back-task',
              component: resolve => require(['@system/adjust-accounts/counter-deal/before-repayment/back-task'], resolve)
            },
            { // 办结任务 - 财务
              name: 'success-task',
              path: 'success-task',
              component: resolve => require(['@system/adjust-accounts/counter-deal/before-repayment/success-task'], resolve)
            }
          ]
        }
      ]
    }
  ]
};
