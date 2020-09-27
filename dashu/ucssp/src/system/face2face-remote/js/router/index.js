module.exports = {
  name: 'face2face-remote',
  path: '/system/face2face-remote',
  redirect: '/system/face2face-remote/face2face-undisposed',
  component: resolve => require(['@system/face2face-remote/index'], resolve),
  meta: { requireAuth: true, systemName: '面签系统' },
  children: [
    {
      name: 'face2face-remote-undisposed',
      path: 'face2face-undisposed',
      // redirect: "/system/face2face/face2face-undisposed/customers-info",
      component: resolve => require(['@system/face2face-remote/face2face-undisposed/index'], resolve),
      children: [
        {
          name: "remote-customers-info",
          path: "customers-info",
          component: resolve =>
            require([
              "@system/face2face-remote/face2face-undisposed/customers-info/index"
            ], resolve)
        },
        {
          name: "remote-product-list",
          path: "remote-product-list",
          component: resolve =>
            require([
              "@system/face2face-remote/face2face-undisposed/product_list/index"
            ], resolve)
        },
        {
          name: "remote-product-info",
          path: "product-info",
          component: resolve =>
            require([
              "@system/face2face-remote/face2face-undisposed/product-info/index"
            ], resolve)
        },
        {
          name: "remote-loans-records",
          path: "loans-records",
          component: resolve =>
            require([
              "@system/face2face-remote/face2face-undisposed/loans-records/index"
            ], resolve)
        }
        // {
        //   name: "remote-check-bank",
        //   path: "check-bank",
        //   component: resolve =>
        //     require([
        //       "@system/face2face-remote/face2face-undisposed/check-bank/index"
        //     ], resolve)
        // }
      ]
    },
    {
      name: 'face2face-remote-disposed',
      path: 'face2face-disposed',
      component: resolve => require(['@system/face2face-remote/face2face-disposed/index'], resolve)
    }
  ]
};
