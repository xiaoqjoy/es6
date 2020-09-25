/**
 * Created by liuzhe on 2018/9/8.
 */
import spare from '@system/spare/js/router/index';
import antiFraud from '@system/anti-fraud/js/router/index';
import businessManagement from '@system/business-management/js/router/index';
import face2face from '@system/face2face/js/router/index';
import face2faceRemote from '@system/face2face-remote/js/router/index';
import manager from '@system/manager/js/router/index';
import scanImage from '@system/scan-image/js/router/index';
import marketingManagement from '@system/marketing-management/js/router/index';
import account from '@system/account/js/router/index';
import quota from '@system/quota/js/router/index';
import approvalAudit from '@system/approvalAudit/js/router/index';
import product from '@system/productFactory/js/router/index';
import configManager from '@system/config-manager/js/router/index';
import survey from '@system/survey/js/router/index';
import autority from '@system/authority/js/router';
// import counterDeal from '@system/counter-deal/js/router/index';
import adjustAccounts from '@system/adjust-accounts/js/router/index';
import credit from '@system/credit/js/router/index';
import appBackground from '@system/app-background/js/router/index';
import tsapwChannel from '@system/tsapw-channel/js/router/index';
import authorization from '@system/credit-authorization/js/router/index';
import patch from '@system/patch/js/router/index';
import FieldManagement from '@system/FieldManagement/js/router/index';
import accompanyControl from '@system/accompany_control/js/router';
import managementLoan from '@system/management-loan/js/router/index';
import systemPage from '@system/system_page/js/router';
import loanCounseling from '@system/loan_counseling/js/router';
import externalManagement from '@system/external-management/js/router';
import reports from '@system/reports/js/router';
import businessSchedule from '@system/business-schedule/js/router';
import invoiceCreditReport from '@system/invoiceCreditReport/js/router';
import offlineArchive from '@system/offline_archive/js/router';
import taxDetail from '@system/taxDetail/js/router';
import icInfoDetail from '@system/ICInfoDetail/js/router';
import localCustomerService from '@system/local-customer-service/js/router';
import collateralManage from '@system/collateral_manage/js/router';
import legalInformation from '@system/legal-information/js/router';
import faHaiInfoList from '@system/faHaiInfoList/js/router';

export default {
  name: 'system',
  path: '/system',
  component: resolve => require(['@system/index'], resolve),
  meta: { requireAuth: true },
  children: [
    spare,
    antiFraud,
    businessManagement,
    face2face,
    face2faceRemote,
    manager,
    scanImage,
    marketingManagement,
    account,
    quota,
    approvalAudit,
    product,
    configManager,
    survey,
    autority,
    // counterDeal,
    adjustAccounts,
    credit,
    appBackground,
    tsapwChannel,
    authorization,
    patch,
    FieldManagement,
    accompanyControl,
    managementLoan,
    systemPage,
    loanCounseling,
    externalManagement,
    reports,
    businessSchedule,
    invoiceCreditReport,
    offlineArchive,
    taxDetail,
    icInfoDetail,
    localCustomerService,
    collateralManage,
    legalInformation,
    faHaiInfoList
  ]
};
