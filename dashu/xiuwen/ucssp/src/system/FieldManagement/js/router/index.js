/**
 * Created by liuzhe on 2018/10/29.
 */
module.exports = {
  name: 'FieldManagement',
  path: '/system/FieldManagement',
  redirect: '/system/FieldManagement/user',
  component: resolve => require(['@system/FieldManagement'], resolve),
  meta: {
    requireAuth: true,
    systemName: '权限管理系统'
  },
  children: [
    {
      name: 'FieldManagement_user',
      path: '/system/FieldManagement/user',
      component: resolve => require(['@system/FieldManagement/user'], resolve),
      meta: { requireAuth: true }
    }
  ]
};
