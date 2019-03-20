const Layout = () => import('../pages/Layout/Layout');
const menu = () => import('@/pages/SystemSetup/menu/menu');
const account = () => import('@/pages/SystemSetup/account/account');
const guard = () => import('@/pages/SystemSetup/guard/guard');
const billDistribution = () => import('@/pages/Management/billDistribution');
const Management = () => import('@/pages/Management/Management');
const capitalProgramme = () => import('@/pages/Management/capitalProgramme');
const capitalAccount = () => import('@/pages/Management/capitalAccount');
const partnerManage = () => import('@/pages/Management/partnerManage');
const dataSet = () => import('@/pages/Management/dataSet');
const orderSet = () => import('@/pages/Management/orderSet');
const suretyNav = () => import('@/pages/SuretyBusiness/suretyNav');
const discountApply = () => import('@/pages/SuretyBusiness/discountApply');
const IntentionAdmin = () => import('@/pages/SuretyBusiness/IntentionAdmin');
const flowConfigure = () => import('@/pages/FlowCore/flowConfigure');
const flowApproval = () => import('@/pages/FlowCore/flowApproval');
const dataAccredit = () => import('@/pages/SystemSetup/account/dataAccredit');
const nodeManagement = () => import('@/pages/flowCore/nodeManagement');
const businessSetting = () => import('@/pages/suretyBusiness/businessSetting');
const asyncRouter = [
  {
    path: '/asyncRouter',
    component: Layout,
    children: [],
    meta: { keepAlive: false }
  },
  {
    path: '/SystemSetup/menu',
    component: menu,
    name: '菜单管理',
    meta: { keepAlive: false }
  },
  {
    path: '/SystemSetup/account',
    component: account,
    name: '账号管理',
    meta: { keepAlive: false }
  },
  {
    path: '/SystemSetup/dataAccredit',
    component: dataAccredit,
    name: '数据授权',
    meta: { keepAlive: false }
  },
  {
    path: '/SystemSetup/guard',
    component: guard,
    name: '岗位管理',
    meta: { keepAlive: false }
  },
  {
    path: '/billDistribution',
    component: billDistribution,
    name: '单据分配设置',
    meta: { keepAlive: false }
  },
  {
    path: '/Management',
    component: Management,
    name: '资方管理',
    meta: { keepAlive: false }
  },
  {
    path: '/capitalProgramme',
    component: capitalProgramme,
    name: '资金方案管理',
    meta: { keepAlive: false }
  },
  {
    path: '/capitalAccount',
    component: capitalAccount,
    name: '资金账号管理',
    meta: { keepAlive: false }
  },
  {
    path: '/partnerManage',
    component: partnerManage,
    name: '合作方管理',
    meta: { keepAlive: false }
  },
  {
    path: '/dataSet',
    component: dataSet,
    name: '资料设置',
    meta: { keepAlive: false }
  },
  {
    path: '/orderSet',
    component: orderSet,
    name: '指令配置',
    meta: { keepAlive: false }
  },
  {
    path: '/suretyNav',
    component: suretyNav,
    name: '担保导航',
    meta: { keepAlive: false }
  },
  {
    path: '/discountApply',
    component: discountApply,
    name: '打折申请',
    meta: { keepAlive: false }
  },
  {
    path: '/IntentionAdmin',
    component: IntentionAdmin,
    name: '意向单管理',
    meta: { keepAlive: false }
  },
  {
    path: '/FlowCore/flowConfigure',
    component: flowConfigure,
    name: '流程配置',
    meta: { keepAlive: false }
  },
  {
    path: '/FlowCore/flowApproval',
    component: flowApproval,
    name: '展期审批',
    meta: { keepAlive: false }
  },
  {
    path: '/FlowCore/nodeManagement ',
    component: nodeManagement,
    name: '节点管理',
    meta: { keepAlive: false }
  },
  {
    path: '/suretyBusiness/businessSetting',
    component: businessSetting,
    name: '业务类型设置',
    meta: { keepAlive: false }
  },
];

export default asyncRouter;
