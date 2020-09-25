/**
 * Created by liuzhe on 2018/12/17.
 */
module.exports = {
  name: 'system_page',
  path: '/system/system_page',
  component: resolve => require(['@system/system_page'], resolve),
  meta: {
    requireAuth: true,
    systemName: '二代系统'
  }
};
