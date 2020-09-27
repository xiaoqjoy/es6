import systemPage from '@system/system_page/js/router';
import businessSchedule from '@system/business-schedule/js/router';
import spare from '@system/spare/js/router/index';
// import systemPage from '@system/system_page/js/router';

export default {
  name: 'system',
  path: '/system',
  component: resolve => require(['@system/index'], resolve),
  meta: { requireAuth: true },
  children: [
    systemPage,
    businessSchedule,
    spare
    // systemPage
  ]
};
