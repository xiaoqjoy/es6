module.exports = {
  name: 'product',
  path: '/system/product/index',
  meta: { requireAuth: true },
  component: (resolve) => require(['@system/productFactory/index'], resolve),
  children: [
    {
      name: 'product_parameter',
      path: '/system/product/parameter',
      component: resolve => require(['@system/productFactory/configure/parameter'], resolve)
    },
    {
      name: 'product_element',
      path: '/system/product/element',
      component: resolve => require(['@system/productFactory/configure/element'], resolve)
    },
    {
      name: 'element_configure',
      path: '/system/product/element_configure',
      component: resolve => require(['@system/productFactory/configure/element_configure'], resolve)
    },
    {
      name: 'dictionaries',
      path: '/system/product/dictionaries',
      component: resolve => require(['@system/productFactory/configure/dictionaries'], resolve)
    },
    {
      name: 'dictionaries_configure',
      path: '/system/product/dictionaries_configure',
      component: resolve => require(['@system/productFactory/configure/dictionaries_configure'], resolve)
    },
    {
      name: 'template',
      path: '/system/product/template',
      component: resolve => require(['@system/productFactory/configure/template'], resolve)
    },
    {
      name: 'template_configure',
      path: '/system/product/template_configure',
      component: resolve => require(['@system/productFactory/configure/template_configure'], resolve)
    },
    {
      name: 'product_parts',
      path: '/system/product/product_parts',
      component: resolve => require(['@system/productFactory/parts/parts'], resolve)
    },
    {
      name: 'productList',
      path: '/system/product/productList',
      component: resolve => require(['@system/productFactory/product_management/productList'], resolve)
    },
    {
      name: 'productConfigure',
      path: '/system/product/productConfigure',
      component: resolve => require(['@system/productFactory/product_management/productConfigure'], resolve)
    },
    {
      name: 'productRelease',
      path: '/system/product/productRelease',
      component: resolve => require(['@system/productFactory/product_management/productRelease'], resolve)
    }
  ]
};
