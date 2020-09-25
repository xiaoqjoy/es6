/**
 * Created by liuzhe on 2018/12/29.
 */
module.exports = {
  name: 'loanCounseling',
  path: '/system/loan_counseling',
  component: resolve => require(['@system/loan_counseling'], resolve),
  meta: {
    requireAuth: true,
    systemName: '收件备签系统'
  }
};
