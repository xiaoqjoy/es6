/**
 * Created by liuzhe on 2018/12/6.
 */
module.exports = {
  name: 'accompanyControl',
  path: '/system/accompany_control',
  component: resolve => require(['@system/accompany_control'], resolve),
  meta: {
    requireAuth: true,
    systemName: "陪查征信系统"
  }
};
