/* module.exports = {
  name: 'invoiceCreditReport',
  path: '/system/invoiceCreditReport/:channel',
  component: resolve => require(['@system/invoiceCreditReport/common'], resolve),
  meta: {
    requireAuth: true,
    systemName: '发票报告信贷'
  }
}; */
module.exports = {
  name: 'invoiceCreditReport',
  path: '/system/invoiceCreditReport',
  component: resolve => require(['@system/invoiceCreditReport'], resolve),
  redirect: '/system/invoiceCreditReport/nuonuo',
  meta: {
    requireAuth: true,
    systemName: '发票报告信贷'
  },
  children: [
    {
      name: 'nuonuoInvoice',
      path: 'nuonuo',
      meta: {
        requireAuth: true,
        systemName: '诺诺发票报告信贷'
      },
      component: resolve => require(['@system/invoiceCreditReport/nuonuo'], resolve)
    },
    {
      name: 'kingdeeInvoice',
      path: 'kingdee',
      meta: {
        requireAuth: true,
        systemName: '金蝶发票报告信贷'
      },
      component: resolve => require(['@system/invoiceCreditReport/kingdee'], resolve)
    },
    {
      name: 'chanjetInvoice',
      path: 'chanjet',
      meta: {
        requireAuth: true,
        systemName: '畅捷通发票报告信贷'
      },
      component: resolve => require(['@system/invoiceCreditReport/chanjet'], resolve)
    },
    {
      name: 'dcgInvoice',
      path: 'dcg',
      meta: {
        requireAuth: true,
        systemName: '大查柜税务征信、发票报告'
      },
      component: resolve => require(['@system/invoiceCreditReport/dcg'], resolve)
    },
    {
      name: 'sfolInvoice',
      path: 'sfol',
      meta: {
        requireAuth: true,
        systemName: '顺丰金融发票报告信贷'
      },
      component: resolve => require(['@system/invoiceCreditReport/sfol'], resolve)
    },
    {
      name: 'invoice',
      path: 'invoice',
      meta: {
        requireAuth: true,
        systemName: '发票报告'
      },
      component: resolve => require(['@system/invoiceCreditReport/common'], resolve)
    },
    {
      name: 'hxdFinance',
      path: 'hxd',
      meta: {
        requireAuth: true,
        systemName: '慧算账财务报告'
      },
      component: resolve => require(['@system/invoiceCreditReport/hxd'], resolve)
    },
    {
      name: 'sjzsInvoice',
      path: 'sjzs',
      meta: {
        requireAuth: true,
        systemName: '世纪中税税务报告'
      },
      component: resolve => require(['@system/invoiceCreditReport/sjzs'], resolve)
    },
    {
      name: 'kingDeeInvoice',
      path: 'kingDeeInvoice',
      meta: {
        requireAuth: true,
        systemName: '发票报告'
      },
      component: resolve => require(['@system/invoiceCreditReport/kingDeeCommon'], resolve)
    },
    {
      name: 'jcolInvoice',
      path: 'jcol',
      meta: {
        requireAuth: true,
        systemName: '金财线上企业税务征信报告'
      },
      component: resolve => require(['@system/invoiceCreditReport/jcol'], resolve)
    },
    {
      name: 'kryInvoice',
      path: 'kry',
      meta: {
        requireAuth: true,
        systemName: '客如云餐饮经营信息'
      },
      component: resolve => require(['@system/invoiceCreditReport/kry'], resolve)
    },
    {
      name: 'ydzInvoice',
      path: 'ydz',
      meta: {
        requireAuth: true,
        systemName: '企业税务征信报告'
      },
      component: resolve => require(['@system/invoiceCreditReport/ydz'], resolve)
    },
    {
      name: 'hllInvoice',
      path: 'hll',
      meta: {
        requireAuth: true,
        systemName: '哗啦啦餐饮经营信息'
      },
      component: resolve => require(['@system/invoiceCreditReport/hll'], resolve)
    }
  ]
};
