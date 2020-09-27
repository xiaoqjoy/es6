/**
 * Created by liuzhe on 2018/9/8.
 */
import spare from '@system/spare/js/router/index';
import autority from '@system/authority/js/router';
import systemPage from '@system/system_page/js/router';
import patch from '@system/patch/js/router';
import scanImage from '@system/scan-image/js/router';
import adjustAccounts from '@system/adjust-accounts/js/router/index'; // 核算

export default {
  name: 'system',
  path: '/system',
  component: resolve => require(['@system/index'], resolve),
  meta: { requireAuth: true },
  children: [
    spare,
    autority,
    systemPage,
    patch,
    scanImage,
    adjustAccounts
  ]
};
