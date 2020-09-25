/**
 * Created by liuzhe on 2018/10/29.
 */
module.exports = {
  name: 'authority',
  path: '/system/authority',
  redirect: '/system/authority/user',
  component: resolve => require(['@system/authority'], resolve),
  meta: {
    requireAuth: true,
    systemName: '权限管理系统'
  },
  children: [
    {
      name: 'authority_user',
      path: '/system/authority/user',
      component: resolve => require(['@system/authority/user'], resolve),
      meta: { requireAuth: true }
    },
    {
      name: 'authority_company',
      path: '/system/authority/company',
      component: resolve => require(['@system/authority/company'], resolve),
      meta: { requireAuth: true }
    },
    {
      name: 'authority_role',
      path: '/system/authority/role',
      component: resolve => require(['@system/authority/role'], resolve),
      meta: { requireAuth: true }
    },
    {
      name: 'authority_server-center',
      path: '/system/authority/server_center',
      component: resolve => require(['@system/authority/server_center'], resolve),
      meta: { requireAuth: true }
    }
  ]
};
