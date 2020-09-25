module.exports = {
  name: 'adjust-accounts',
  path: '/system/adjust-accounts',
  redirect: '/system/adjust-accounts/advance-money',
  component: resolve => require(['@system/adjust-accounts'], resolve),
  meta: {
    requireAuth: true,
    systemName: '核算系统'
  },
  children: [{ // 台账
    name: 'standing-book',
    path: '/system/adjust-accounts/standing-book',
    redirect: '/system/adjust-accounts/standing-book/standing-book-home',
    component: resolve => require(['@system/adjust-accounts/standing-book'], resolve),
    children: [{
      name: 'standing-book-home',
      path: 'standing-book-home',
      component: resolve => require(['@system/adjust-accounts/standing-book/standing-book-home'], resolve)
    },
    {
      name: 'debt-detail',
      path: 'debt-detail',
      component: resolve => require(['@system/adjust-accounts/standing-book/debt-detail'], resolve)
    }
    ]
  },
  // { // 代垫
  //   name: 'advance-money',
  //   path: '/system/adjust-accounts/advance-money',
  //   component: resolve => require(['@system/adjust-accounts/advance-money'], resolve),
  //   redirect: '/system/adjust-accounts/advance-money/single-advance-money',
  //   children: [
  //     { // 单笔垫付还款
  //       name: 'single-advance-money',
  //       path: 'single-advance-money',
  //       component: resolve => require(['@system/adjust-accounts/advance-money/single-advance-money'], resolve),
  //       redirect: '/system/adjust-accounts/advance-money/single-advance-money/single-advance-money-sponsor',
  //       children: [{ // 发起
  //           name: 'single-advance-money-sponsor',
  //           path: 'single-advance-money-sponsor',
  //           component: resolve => require(['@system/adjust-accounts/advance-money/single-advance-money/single-advance-money-sponsor'], resolve)
  //         },
  //         { // 复核
  //           name: 'single-advance-money-re-check',
  //           path: 'single-advance-money-re-check',
  //           component: resolve => require(['@system/adjust-accounts/advance-money/single-advance-money/single-advance-money-re-check'], resolve)
  //         },
  //         { // 完成
  //           name: 'single-advance-money-accomplish',
  //           path: 'single-advance-money-accomplish',
  //           component: resolve => require(['@system/adjust-accounts/advance-money/single-advance-money/single-advance-money-accomplish'], resolve)
  //         }
  //       ]
  //     },
  //     { // 批量垫付还款
  //       name: 'batch-advance-money',
  //       path: 'batch-advance-money',
  //       component: resolve => require(['@system/adjust-accounts/advance-money/batch-advance-money'], resolve),
  //       redirect: '/system/adjust-accounts/advance-money/batch-advance-money/batch-advance-money-sponsor',
  //       children: [{ // 发起
  //           name: 'batch-advance-money-sponsor',
  //           path: 'batch-advance-money-sponsor',
  //           component: resolve => require(['@system/adjust-accounts/advance-money/batch-advance-money/batch-advance-money-sponsor'], resolve)
  //         },
  //         { // 复核
  //           name: 'batch-advance-money-re-check',
  //           path: 'batch-advance-money-re-check',
  //           component: resolve => require(['@system/adjust-accounts/advance-money/batch-advance-money/batch-advance-money-re-check'], resolve)
  //         },
  //         { // 完成
  //           name: 'batch-advance-money-accomplish',
  //           path: 'batch-advance-money-accomplish',
  //           component: resolve => require(['@system/adjust-accounts/advance-money/batch-advance-money/batch-advance-money-accomplish'], resolve)
  //         }
  //       ]
  //     }
  //   ]
  // },
  { // 柜面交易
    name: 'counter-deal',
    path: '/system/adjust-accounts/counter-deal',
    component: resolve => require(['@system/adjust-accounts/counter-deal'], resolve),
    redirect: '/system/adjust-accounts/counter-deal/loan-pass',
    children: [
      { // 代垫
        name: 'advance-money',
        path: '/system/adjust-accounts/counter-deal/advance-money',
        component: resolve => require(['@system/adjust-accounts/counter-deal/advance-money'], resolve),
        redirect: '/system/adjust-accounts/counter-deal/advance-money/single-advance-money',
        children: [
          { // 单笔垫付还款
            name: 'single-advance-money',
            path: 'single-advance-money',
            component: resolve => require(['@system/adjust-accounts/counter-deal/advance-money/single-advance-money'], resolve),
            redirect: '/system/adjust-accounts/counter-deal/advance-money/single-advance-money/single-advance-money-sponsor',
            children: [{ // 发起
              name: 'single-advance-money-sponsor',
              path: 'single-advance-money-sponsor',
              component: resolve => require(['@system/adjust-accounts/counter-deal/advance-money/single-advance-money/single-advance-money-sponsor'], resolve)
            },
            { // 复核
              name: 'single-advance-money-re-check',
              path: 'single-advance-money-re-check',
              component: resolve => require(['@system/adjust-accounts/counter-deal/advance-money/single-advance-money/single-advance-money-re-check'], resolve)
            },
            { // 完成
              name: 'single-advance-money-accomplish',
              path: 'single-advance-money-accomplish',
              component: resolve => require(['@system/adjust-accounts/counter-deal/advance-money/single-advance-money/single-advance-money-accomplish'], resolve)
            }
            ]
          },
          { // 批量垫付还款
            name: 'batch-advance-money',
            path: 'batch-advance-money',
            component: resolve => require(['@system/adjust-accounts/counter-deal/advance-money/batch-advance-money'], resolve),
            redirect: '/system/adjust-accounts/counter-deal/advance-money/batch-advance-money/batch-advance-money-sponsor',
            children: [{ // 发起
              name: 'batch-advance-money-sponsor',
              path: 'batch-advance-money-sponsor',
              component: resolve => require(['@system/adjust-accounts/counter-deal/advance-money/batch-advance-money/batch-advance-money-sponsor'], resolve)
            },
            { // 复核
              name: 'batch-advance-money-re-check',
              path: 'batch-advance-money-re-check',
              component: resolve => require(['@system/adjust-accounts/counter-deal/advance-money/batch-advance-money/batch-advance-money-re-check'], resolve)
            },
            { // 完成
              name: 'batch-advance-money-accomplish',
              path: 'batch-advance-money-accomplish',
              component: resolve => require(['@system/adjust-accounts/counter-deal/advance-money/batch-advance-money/batch-advance-money-accomplish'], resolve)
            }
            ]
          }
        ]
      },
      { // 代偿
        name: 'compensatory',
        path: '/system/adjust-accounts/counter-deal/compensatory',
        component: resolve => require(['@system/adjust-accounts/counter-deal/compensatory'], resolve),
        redirect: '/system/adjust-accounts/counter-deal/compensatory/sponsor',
        children: [
          { // 发起
            name: 'sponsor',
            path: 'sponsor',
            component: resolve => require(['@system/adjust-accounts/counter-deal/compensatory/sponsor'], resolve),
            redirect: '/system/adjust-accounts/counter-deal/compensatory/sponsor/apply-for',
            children: [{ // 申请
              name: 'apply-for',
              path: 'apply-for',
              component: resolve => require(['@system/adjust-accounts/counter-deal/compensatory/sponsor/apply-for'], resolve)
            },
            { // 财务初审
              name: 'financial-first-trial',
              path: 'financial-first-trial',
              component: resolve => require(['@system/adjust-accounts/counter-deal/compensatory/sponsor/financial-first-trial'], resolve)
            },
            { // 复核
              name: 'check',
              path: 'check',
              component: resolve => require(['@system/adjust-accounts/counter-deal/compensatory/sponsor/check'], resolve)
            },
            { // 已处理
              name: 'processed',
              path: 'processed',
              component: resolve => require(['@system/adjust-accounts/counter-deal/compensatory/sponsor/processed'], resolve)
            }
            ]
          },
          { // 收回
            name: 'withdraw',
            path: 'withdraw',
            component: resolve => require(['@system/adjust-accounts/counter-deal/compensatory/withdraw'], resolve),
            redirect: '/system/adjust-accounts/counter-deal/compensatory/withdraw/apply-for-withdraw',
            children: [{ // 申请
              name: 'apply-for-withdraw',
              path: 'apply-for-withdraw',
              component: resolve => require(['@system/adjust-accounts/counter-deal/compensatory/withdraw/apply-for-withdraw'], resolve)
            },
            { // 财务初审
              name: 'financial-first-trial-withdraw',
              path: 'financial-first-trial-withdraw',
              component: resolve => require(['@system/adjust-accounts/counter-deal/compensatory/withdraw/financial-first-trial-withdraw'], resolve)
            },
            { // 复核
              name: 'check-withdraw',
              path: 'check-withdraw',
              component: resolve => require(['@system/adjust-accounts/counter-deal/compensatory/withdraw/check-withdraw'], resolve)
            },
            { // 已处理
              name: 'processed-withdraw',
              path: 'processed-withdraw',
              component: resolve => require(['@system/adjust-accounts/counter-deal/compensatory/withdraw/processed-withdraw'], resolve)
            }
            ]
          },
          { // 减免
            name: 'punishment',
            path: 'punishment',
            component: resolve => require(['@system/adjust-accounts/counter-deal/compensatory/punishment'], resolve),
            redirect: '/system/adjust-accounts/counter-deal/compensatory/punishment/apply-for-punishment',
            children: [{ // 申请
              name: 'apply-for-punishment',
              path: 'apply-for-punishment',
              component: resolve => require(['@system/adjust-accounts/counter-deal/compensatory/punishment/apply-for-punishment'], resolve)
            },
            { // 财务初审
              name: 'financial-first-trial-punishment',
              path: 'financial-first-trial-punishment',
              component: resolve => require(['@system/adjust-accounts/counter-deal/compensatory/punishment/financial-first-trial-punishment'], resolve)
            },
            { // 复核
              name: 'check-punishment',
              path: 'check-punishment',
              component: resolve => require(['@system/adjust-accounts/counter-deal/compensatory/punishment/check-punishment'], resolve)
            },
            { // 已处理
              name: 'processed-punishment',
              path: 'processed-punishment',
              component: resolve => require(['@system/adjust-accounts/counter-deal/compensatory/punishment/processed-punishment'], resolve)
            }
            ]
          },
          { // 转让
            name: 'assignment',
            path: 'assignment',
            component: resolve => require(['@system/adjust-accounts/counter-deal/compensatory/assignment'], resolve),
            redirect: '/system/adjust-accounts/counter-deal/compensatory/assignment/apply-for-assignment',
            children: [{ // 申请
              name: 'apply-for-assignment',
              path: 'apply-for-assignment',
              component: resolve => require(['@system/adjust-accounts/counter-deal/compensatory/assignment/apply-for-assignment'], resolve)
            },
            { // 复核
              name: 'check-assignment',
              path: 'check-assignment',
              component: resolve => require(['@system/adjust-accounts/counter-deal/compensatory/assignment/check-assignment'], resolve)
            },
            { // 已处理
              name: 'processed-assignment',
              path: 'processed-assignment',
              component: resolve => require(['@system/adjust-accounts/counter-deal/compensatory/assignment/processed-assignment'], resolve)
            }
            ]
          },
          { // 代偿客户扣款配置
            name: 'deduction-config',
            path: 'deduction-config',
            component: resolve => require(['@system/adjust-accounts/counter-deal/compensatory/deduction-config'], resolve)
          }
        ]
      },
      { // 放款
        name: 'loan-pass',
        path: '/system/adjust-accounts/counter-deal/loan-pass',
        component: resolve => require(['@system/adjust-accounts/counter-deal/loan-pass'], resolve)
        // component: () => import('@system/counter-deal/loan-pass/index')
      },
      { // 一般还款
        name: 'ordinary-repayment',
        path: '/system/adjust-accounts/counter-deal/ordinary-repayment',
        component: resolve => require(['@system/adjust-accounts/counter-deal/ordinary-repayment'], resolve),
        // redirect: '/system/counter-deal/loan-pass',
        children: [
          { // 单笔还款
            name: 'single-repayment',
            path: 'single-repayment',
            component: resolve => require(['@system/adjust-accounts/counter-deal/ordinary-repayment/single-repayment'], resolve),
            redirect: '/system/adjust-accounts/counter-deal/ordinary-repayment/single-repayment/sponsor',
            children: [
              { // 发起
                name: 'single-sponsor',
                path: 'sponsor',
                component: resolve => require(['@system/adjust-accounts/counter-deal/ordinary-repayment/single-repayment/sponsor'], resolve)
              },
              { // 复核
                name: 'single-re-check',
                path: 're-check',
                component: resolve => require(['@system/adjust-accounts/counter-deal/ordinary-repayment/single-repayment/re-check'], resolve)
              },
              { // 完成
                name: 'single-accomplish',
                path: 'accomplish',
                component: resolve => require(['@system/adjust-accounts/counter-deal/ordinary-repayment/single-repayment/accomplish'], resolve)
              }
            ]
          },
          { // 批量单笔还款
            name: 'batch-single-repayment',
            path: 'batch-single-repayment',
            component: resolve => require(['@system/adjust-accounts/counter-deal/ordinary-repayment/batch-single-repayment'], resolve),
            redirect: '/system/adjust-accounts/counter-deal/ordinary-repayment/batch-single-repayment/sponsor',
            children: [
              { // 发起
                name: 'batch-single-sponsor',
                path: 'sponsor',
                component: resolve => require(['@system/adjust-accounts/counter-deal/ordinary-repayment/batch-single-repayment/sponsor'], resolve)
              },
              { // 复核
                name: 'batch-single-re-check',
                path: 're-check',
                component: resolve => require(['@system/adjust-accounts/counter-deal/ordinary-repayment/batch-single-repayment/re-check'], resolve)
              },
              { // 完成
                name: 'batch-single-accomplish',
                path: 'accomplish',
                component: resolve => require(['@system/adjust-accounts/counter-deal/ordinary-repayment/batch-single-repayment/accomplish'], resolve)
              }
            ]
          },
          { // 代垫后本息维护
            name: 'maintenance',
            path: 'maintenance',
            component: resolve => require(['@system/adjust-accounts/counter-deal/ordinary-repayment/maintenance'], resolve),
            redirect: '/system/adjust-accounts/counter-deal/ordinary-repayment/maintenance/sponsor',
            children: [
              { // 发起
                name: 'maintenance-sponsor',
                path: 'sponsor',
                component: resolve => require(['@system/adjust-accounts/counter-deal/ordinary-repayment/maintenance/sponsor'], resolve)
              },
              { // 复核
                name: 'maintenance-re-check',
                path: 're-check',
                component: resolve => require(['@system/adjust-accounts/counter-deal/ordinary-repayment/maintenance/re-check'], resolve)
              },
              { // 完成
                name: 'maintenance-accomplish',
                path: 'accomplish',
                component: resolve => require(['@system/adjust-accounts/counter-deal/ordinary-repayment/maintenance/accomplish'], resolve)
              }
            ]
          },
          { // 拆分还款
            name: 'split-repayment',
            path: 'split-repayment',
            component: resolve => require(['@system/adjust-accounts/counter-deal/ordinary-repayment/split-repayment'], resolve),
            redirect: '/system/adjust-accounts/counter-deal/ordinary-repayment/split-repayment/sponsor',
            children: [
              { // 发起
                name: 'split-sponsor',
                path: 'sponsor',
                component: resolve => require(['@system/adjust-accounts/counter-deal/ordinary-repayment/split-repayment/sponsor'], resolve)
              },
              { // 复核
                name: 'split-re-check',
                path: 're-check',
                component: resolve => require(['@system/adjust-accounts/counter-deal/ordinary-repayment/split-repayment/re-check'], resolve)
              },
              { // 完成
                name: 'split-accomplish',
                path: 'accomplish',
                component: resolve => require(['@system/adjust-accounts/counter-deal/ordinary-repayment/split-repayment/accomplish'], resolve)
              }
            ]
          },
          { // 批量拆分还款
            name: 'batch-split-repayment',
            path: 'batch-split-repayment',
            component: resolve => require(['@system/adjust-accounts/counter-deal/ordinary-repayment/batch-split-repayment'], resolve),
            redirect: '/system/adjust-accounts/counter-deal/ordinary-repayment/batch-split-repayment/sponsor',
            children: [
              { // 发起
                name: 'batch-split-sponsor',
                path: 'sponsor',
                component: resolve => require(['@system/adjust-accounts/counter-deal/ordinary-repayment/batch-split-repayment/sponsor'], resolve)
              },
              { // 复核
                name: 'batch-split-re-check',
                path: 're-check',
                component: resolve => require(['@system/adjust-accounts/counter-deal/ordinary-repayment/batch-split-repayment/re-check'], resolve)
              },
              { // 完成
                name: 'batch-split-accomplish',
                path: 'accomplish',
                component: resolve => require(['@system/adjust-accounts/counter-deal/ordinary-repayment/batch-split-repayment/accomplish'], resolve)
              }
            ]
          }
        ]
        // component: () => import('@system/counter-deal/loan-pass/index')
      },
      { // 减免
        name: 'mitigate',
        path: '/system/adjust-accounts/counter-deal/mitigate',
        component: resolve => require(['@system/adjust-accounts/counter-deal/mitigate'], resolve),
        redirect: '/system/adjust-accounts/counter-deal/mitigate/single-overdue',
        children: [
          { // 单笔逾期减免
            name: 'single-overdue',
            path: 'single-overdue',
            component: resolve => require(['@system/adjust-accounts/counter-deal/mitigate/single-overdue'], resolve),
            redirect: '/system/adjust-accounts/counter-deal/mitigate/single-overdue/sponsor',
            children: [
              { // 发起
                path: 'sponsor',
                component: resolve => require(['@system/adjust-accounts/counter-deal/mitigate/single-overdue/sponsor'], resolve)
              },
              { // 复核
                path: 're-check',
                component: resolve => require(['@system/adjust-accounts/counter-deal/mitigate/single-overdue/re-check'], resolve)
              },
              { // 完成
                path: 'accomplish',
                component: resolve => require(['@system/adjust-accounts/counter-deal/mitigate/single-overdue/accomplish'], resolve)
              }
            ]
          },
          { // 单笔罚息复利调整
            name: 'single-adjust',
            path: 'single-adjust',
            component: resolve => require(['@system/adjust-accounts/counter-deal/mitigate/single-adjust'], resolve),
            redirect: '/system/adjust-accounts/counter-deal/mitigate/single-adjust/sponsor',
            children: [
              { // 发起
                path: 'sponsor',
                component: resolve => require(['@system/adjust-accounts/counter-deal/mitigate/single-adjust/sponsor'], resolve)
              },
              { // 复核
                path: 're-check',
                component: resolve => require(['@system/adjust-accounts/counter-deal/mitigate/single-adjust/re-check'], resolve)
              },
              { // 完成
                path: 'accomplish',
                component: resolve => require(['@system/adjust-accounts/counter-deal/mitigate/single-adjust/accomplish'], resolve)
              }
            ]
          },
          { // 批量罚息复利调整
            name: 'batch-adjust',
            path: 'batch-adjust',
            component: resolve => require(['@system/adjust-accounts/counter-deal/mitigate/batch-adjust'], resolve),
            redirect: '/system/adjust-accounts/counter-deal/mitigate/batch-adjust/sponsor',
            children: [
              { // 发起
                path: 'sponsor',
                component: resolve => require(['@system/adjust-accounts/counter-deal/mitigate/batch-adjust/sponsor'], resolve)
              },
              { // 发起明细
                path: 'sponsor-detail',
                meta: { detail: true },
                component: resolve => require(['@system/adjust-accounts/counter-deal/mitigate/batch-adjust/sponsor/sponsor-detail'], resolve)
              },
              { // 复核
                path: 're-check',
                component: resolve => require(['@system/adjust-accounts/counter-deal/mitigate/batch-adjust/re-check'], resolve)
              },
              { // 复核明细
                path: 're-check-detail',
                meta: { detail: true },
                component: resolve => require(['@system/adjust-accounts/counter-deal/mitigate/batch-adjust/re-check/re-check-detail'], resolve)
              },
              { // 完成
                path: 'accomplish',
                component: resolve => require(['@system/adjust-accounts/counter-deal/mitigate/batch-adjust/accomplish'], resolve)
              },
              { // 完成明细
                path: 'accomplish-detail',
                meta: { detail: true },
                component: resolve => require(['@system/adjust-accounts/counter-deal/mitigate/batch-adjust/accomplish/accomplish-detail'], resolve)
              }
            ]
          }
        ]
      },
      { // 费用收取
        name: 'fees-charged',
        path: '/system/adjust-accounts/counter-deal/fees-charged',
        component: resolve => require(['@system/adjust-accounts/counter-deal/fees-charged'], resolve),
        redirect: '/system/adjust-accounts/counter-deal/fees-charged/sponsor',
        children: [
          { // 发起
            name: 'fees-charged-sponsor',
            path: 'sponsor',
            component: resolve => require(['@system/adjust-accounts/counter-deal/fees-charged/sponsor'], resolve)
          },
          { // 复核
            name: 'fees-charged-re-check',
            path: 're-check',
            component: resolve => require(['@system/adjust-accounts/counter-deal/fees-charged/re-check'], resolve)
          },
          { // 完成
            name: 'fees-charged-accomplish',
            path: 'accomplish',
            component: resolve => require(['@system/adjust-accounts/counter-deal/fees-charged/accomplish'], resolve)
          }
        ]
      },
      { // 冲销管理
        name: 'charge-against',
        path: '/system/adjust-accounts/counter-deal/charge-against',
        component: resolve => require(['@system/adjust-accounts/counter-deal/charge-against'], resolve),
        redirect: '/system/adjust-accounts/counter-deal/charge-against/sponsor',
        children: [
          { // 发起
            name: 'charge-against-sponsor',
            path: 'sponsor',
            component: resolve => require(['@system/adjust-accounts/counter-deal/charge-against/sponsor'], resolve)
          },
          { // 复核
            name: 'charge-against-re-check',
            path: 're-check',
            component: resolve => require(['@system/adjust-accounts/counter-deal/charge-against/re-check'], resolve)
          },
          { // 完成
            name: 'charge-against-accomplish',
            path: 'accomplish',
            component: resolve => require(['@system/adjust-accounts/counter-deal/charge-against/accomplish'], resolve)
          }
        ]
      },
      { // 提前还款counter-deal/before-repayment/repayment-reserve
        name: 'before-repayment',
        path: '/system/adjust-accounts/counter-deal/before-repayment',
        component: resolve => require(['@system/adjust-accounts/counter-deal/before-repayment'], resolve),
        redirect: '/system/adjust-accounts/counter-deal/before-repayment/repayment-reserve',
        children: [
          { // 还款试算
            name: 'repayment-trial',
            path: 'repayment-trial',
            component: resolve => require(['@system/adjust-accounts/counter-deal/before-repayment/repayment-trial'], resolve)
          },
          { // 提前还款减免
            name: 'derate-repayment',
            path: 'derate-repayment',
            component: resolve => require(['@system/adjust-accounts/counter-deal/before-repayment/derate-repayment'], resolve),
            redirect: '/system/adjust-accounts/counter-deal/before-repayment/batch-repayment/sponsor',
            children: [
              { // 发起
                name: 'derate-repayment-sponsor',
                path: 'sponsor',
                component: resolve => require(['@system/adjust-accounts/counter-deal/before-repayment/derate-repayment/sponsor'], resolve)
              },
              { // 复核
                name: 'derate-repayment-re-check',
                path: 're-check',
                component: resolve => require(['@system/adjust-accounts/counter-deal/before-repayment/derate-repayment/re-check'], resolve)
              },
              { // 完成
                name: 'derate-repayment-accomplish',
                path: 'accomplish',
                component: resolve => require(['@system/adjust-accounts/counter-deal/before-repayment/derate-repayment/accomplish'], resolve)
              }
            ]
          },
          { // 批量提前还款
            name: 'batch-repayment',
            path: 'batch-repayment',
            component: resolve => require(['@system/adjust-accounts/counter-deal/before-repayment/batch-repayment'], resolve),
            redirect: '/system/adjust-accounts/counter-deal/before-repayment/batch-repayment/sponsor',
            children: [
              { // 发起
                name: 'batch-repayment-sponsor',
                path: 'sponsor',
                component: resolve => require(['@system/adjust-accounts/counter-deal/before-repayment/batch-repayment/sponsor'], resolve)
              },
              { // 复核
                name: 'batch-repayment-re-check',
                path: 're-check',
                component: resolve => require(['@system/adjust-accounts/counter-deal/before-repayment/batch-repayment/re-check'], resolve)
              },
              { // 完成
                name: 'batch-repayment-accomplish',
                path: 'accomplish',
                component: resolve => require(['@system/adjust-accounts/counter-deal/before-repayment/batch-repayment/accomplish'], resolve)
              }
            ]
          },
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
          { // 待办任务
            name: 'backlog-task',
            path: 'backlog-task',
            component: resolve => require(['@system/adjust-accounts/counter-deal/before-repayment/backlog-task'], resolve)
          },
          { // 复核任务
            name: 're-check-task',
            path: 're-check-task',
            component: resolve => require(['@system/adjust-accounts/counter-deal/before-repayment/re-check-task'], resolve)
          },
          { // 办结任务 - 财务
            name: 'success-task',
            path: 'success-task',
            component: resolve => require(['@system/adjust-accounts/counter-deal/before-repayment/success-task'], resolve)
          },
          { // 办结任务 - 前台(流程查询)
            name: 'success-task-front',
            path: 'success-task-front',
            component: resolve => require(['@system/adjust-accounts/counter-deal/before-repayment/success-task-front'], resolve)
          },
          {
            name: 'reserve-task-remote',
            path: 'reserve-task-remote',
            component: resolve => require(['@system/adjust-accounts/counter-deal/before-repayment/reserve-task-remote'], resolve)
          },
          {
            name: 'backlog-task-remote',
            path: 'backlog-task-remote',
            component: resolve => require(['@system/adjust-accounts/counter-deal/before-repayment/backlog-task-remote'], resolve)
          },
          {
            name: 'refund-task-remote',
            path: 'refund-task-remote',
            component: resolve => require(['@system/adjust-accounts/counter-deal/before-repayment/refund-task-remote'], resolve)
          },
          {
            name: 'phoneRecord',
            path: 'phoneRecord',
            component: resolve => require(['@system/approvalAudit/dialogCom/phone-video'], resolve)
          }
        ]
      },
      { // 贷款咨询
        name: 'loan-consult',
        path: '/system/adjust-accounts/counter-deal/loan-consult',
        component: resolve => require(['@system/adjust-accounts/counter-deal/loan-consult'], resolve),
        redirect: '/system/adjust-accounts/counter-deal/loan-consult/before-repayment-trial',
        children: [
          { // 还款试算
            name: 'before-repayment-trial',
            path: 'before-repayment-trial',
            component: resolve => require(['@system/adjust-accounts/counter-deal/loan-consult/before-repayment-trial'], resolve)
          }
        ]
      },
      { // 扣款管理
        name: 'withhold-manage',
        path: '/system/adjust-accounts/counter-deal/withhold-manage',
        component: resolve => require(['@system/adjust-accounts/counter-deal/withhold-manage'], resolve),
        redirect: '/system/adjust-accounts/counter-deal/withhold-manage/channel-alter',
        children: [
          { // 扣款渠道修改
            name: 'channel-alter',
            path: 'channel-alter',
            component: resolve => require(['@system/adjust-accounts/counter-deal/withhold-manage/channel-alter'], resolve)
          },
          { // 银行预留手机号管理
            name: 'reserved-phone',
            path: 'reserved-phone',
            component: resolve => require(['@system/adjust-accounts/counter-deal/withhold-manage/reserved-phone'], resolve)
          },
          { // 还款卡变更管理
            name: 'payment-card',
            path: 'payment-card',
            component: resolve => require(['@system/adjust-accounts/counter-deal/withhold-manage/payment-card'], resolve)
          },
          { // 影像查看
            name: 'image-look',
            path: 'image-look',
            component: resolve => require(['@system/adjust-accounts/counter-deal/withhold-manage/image-look'], resolve)
          },
          { // 个人征信报告查询
            name: 'credit-investigation',
            path: 'credit-investigation',
            component: resolve => require(['@system/adjust-accounts/counter-deal/withhold-manage/credit-investigation'], resolve)
          },
          { // 催收代扣
            name: 'collection',
            path: 'collection',
            component: resolve => require(['@system/adjust-accounts/counter-deal/withhold-manage/collection'], resolve)
          },
          { // 单笔代扣
            name: 'single-withholding',
            path: 'single-withholding',
            component: resolve => require(['@system/adjust-accounts/counter-deal/withhold-manage/single-withholding'], resolve)
          },
          { // 发起扣款
            name: 'sponsor-withhold',
            path: 'sponsor-withhold',
            component: resolve => require(['@system/adjust-accounts/counter-deal/withhold-manage/sponsor-withhold'], resolve)
          },
          { // 扣款状态查询
            name: 'query-withhold-state',
            path: 'query-withhold-state',
            component: resolve => require(['@system/adjust-accounts/counter-deal/withhold-manage/query-withhold-state'], resolve)
          },
          { // 线下扣款管理
            name: 'offline-withholding',
            path: 'offline-withholding',
            component: resolve => require(['@system/adjust-accounts/counter-deal/withhold-manage/offline-withholding'], resolve)
          },
          { // 简版还款卡变更
            name: 'change-bank-card',
            path: 'change-bank-card',
            component: resolve => require(['@system/adjust-accounts/counter-deal/withhold-manage/change-bank-card'], resolve)
          }
        ]
      }
    ]
  },
  {
    name: 'set-aside',
    path: '/system/adjust-accounts/set-aside',
    component: resolve => require(['@system/adjust-accounts/set-aside'], resolve),
    redirect: '/system/adjust-accounts/set-aside/subject-map',
    children: [
      { // 减值计算表
        name: 'anImpairment-table',
        path: 'anImpairment-table',
        component: resolve => require(['@system/adjust-accounts/set-aside/anImpairment-table'], resolve)
      },
      { // 合作方核算信息管理表
        name: 'Information-management',
        path: '/system/adjust-accounts/set-aside/Information-management',
        component: resolve => require(['@system/adjust-accounts/set-aside/Information-management'], resolve)
      },
      { // 科目映射表
        name: 'subject-map',
        path: '/system/adjust-accounts/set-aside/subject-map',
        component: resolve => require(['@system/adjust-accounts/set-aside/subject-map'], resolve)
      }
    ]
  },
  { // 财务配置counter-deal/financial-allocation/repayment-reserve
    name: 'financial-allocation',
    path: '/system/adjust-accounts/counter-deal/financial-allocation',
    component: resolve => require(['@system/adjust-accounts/counter-deal/financial-allocation'], resolve),
    redirect: '/system/adjust-accounts/counter-deal/financial-allocation/close-account-management',
    children: [
      { // 封账管理
        name: 'close-account-management',
        path: 'close-account-management',
        component: resolve => require(['@system/adjust-accounts/counter-deal/financial-allocation/close-account-management'], resolve)
      },
      { // 信贷EAS映射配置
        name: 'loan-eas',
        path: 'loan-eas',
        component: resolve => require(['@system/adjust-accounts/counter-deal/financial-allocation/loan-eas'], resolve)
      }
    ]
  },
  {
    name: 'yqzl',
    path: '/system/adjust-accounts/counter-deal/yqzl/index',
    component: resolve => require(['@system/adjust-accounts/counter-deal/yqzl/index.vue'], resolve)
  },
  {
    name: 'yqzl-config',
    path: '/system/adjust-accounts/counter-deal/yqzl/config',
    component: resolve => require(['@system/adjust-accounts/counter-deal/yqzl/config.vue'], resolve)
  }
  ]
};
