module.exports = {
  name: "face2face",
  path: "/system/face2face",
  redirect: "/system/face2face/face2face-undisposed",
  component: resolve => require(["@system/face2face/index"], resolve),
  meta: { requireAuth: true, systemName: "面签系统" },
  children: [
    {
      name: "face2face-undisposed",
      path: "face2face-undisposed",
      component: resolve =>
        require(["@system/face2face/face2face-undisposed/index"], resolve),
      children: [
        {
          name: "customers-info",
          path: "customers-info",
          component: resolve =>
            require([
              "@system/face2face/face2face-undisposed/customers-info/index"
            ], resolve)
        },
        {
          name: "product-info",
          path: "product-info",
          component: resolve =>
            require([
              "@system/face2face/face2face-undisposed/product-info/index"
            ], resolve)
        },
        {
          name: "loans-records",
          path: "loans-records",
          component: resolve =>
            require([
              "@system/face2face/face2face-undisposed/loans-records/index"
            ], resolve)
        },
        {
          name: "check-bank",
          path: "check-bank",
          component: resolve =>
            require([
              "@system/face2face/face2face-undisposed/check-bank/index"
            ], resolve)
        }
      ]
    },
    {
      name: "face2face-disposed",
      path: "face2face-disposed",
      component: resolve =>
        require(["@system/face2face/face2face-disposed/index"], resolve)
    }
  ]
};

// [
//   {
//    menuName: '面签',
//    iconVal: null,
//    page: null,
//    data: [
//     {
//       menuName: '柜面面签',
//       iconVal: 'face2face',
//       page: {
//         pageName: "柜面面签页面",
//         pageUrlVal: "face2face/face2face-undisposed"
//       }
//     },
//     {
//       menuName: '远程面签',
//       iconVal: 'face2face_remote',
//       page: {
//         pageName: "远程面签页面",
//         pageUrlVal: "face2face-remote/face2face-undisposed"
//       }
//     },
//     {
//       menuName: '影像扫描工作台',
//       iconVal: 'scan_image',
//       page: {
//         pageName: "影像扫描工作台页面",
//         pageUrlVal: "scan-image/scan-image-undisposed"
//       }
//     }
//   ]
//   }
// ]

// [
//   {
//    menuName: '处理中心经理及中台管理岗',
//    iconVal: null,
//    page: null,
//    data: [
//     {
//       menuName: '征信授权任务查询',
//       iconVal: 'manager_credit_auths',
//       page: {
//         pageName: "征信授权任务查询页面",
//         pageUrlVal: "manager/credit-auths"
//       }
//     },
//     {
//       menuName: '面签面核任务查询',
//       iconVal: 'manager_counter_f2f',
//       page: {
//         pageName: "面签面核任务查询页面",
//         pageUrlVal: "manager/counter-f2f"
//       }
//     },
//     {
//       menuName: '远程面签任务查询',
//       iconVal: 'manager_remote_f2f',
//       page: {
//         pageName: "远程面签任务查询页面",
//         pageUrlVal: "manager/remote-f2f"
//       }
//     }
//   ]
//   }
// ];
