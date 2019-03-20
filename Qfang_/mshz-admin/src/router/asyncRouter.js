const Layout = () => import('../pages/Layout/Layout');
const ShortRentHouseStatus = () => import('../pages/HouseManage/ShortRentHouseStatus'); // 房态管理
const TurnoutAreaManage = () => import('../pages/HouseManage/TurnoutAreaManage'); // 责任盘
const Housing = () => import('../pages/HouseManage/Housing'); // 房源
const HouseRelease = () => import('../pages/HouseManage/HouseRelease'); // 房间发布
const OwnerContract = () => import('../pages/OrdersManage/OwnerContract'); // 业主合同
const TenantContract = () => import('../pages/OrdersManage/TenantContract'); // 租客合同
const OrdersManage = () => import('../pages/OrdersManage/OrdersManage');
const RefundManage = () => import('../pages/OrdersManage/RefundManage');
const UserManage = () => import('../pages/UserManage/UserManage');
const TenantManage = () => import('../pages/UserManage/TenantManage');
const CommentManage = () => import('../pages/ServiceCenter/CommentManage');
// const DataCenter = () => import('../pages/DataCenter/DataCenter');
// const OperatingManage = () => import('../pages/OperatingManage/OperatingManage');

const Advertisting = () => import('../pages/OperatingManage/Advertisting');
const CompanyNotice = () => import('../pages/OperatingManage/CompanyNotice');
const RecommendHouse = () => import('../pages/OperatingManage/RecommendHouse');

// const HumanResources = () => import('../pages/HumanResources/HumanResources');
// const ChannelManage = () => import('../pages/ChannelManage/ChannelManage');
const SetCity = () => import('../pages/System/SetCity');
const SetCityCompany = () => import('../pages/System/SetCityCompany');
// const LongSharedHouseStatus = () => import('../pages/HouseManage/LongSharedHouseStatus'); // 长租合租房态
const LongEntireRentHouseStatus = () => import('../pages/HouseManage/LongEntireRentHouseStatus'); // 长租整租

const HouseTotal = () => import('../pages/HouseManage/HouseTotal'); // 库存统计


const LongRentRelease = () => import('../pages/HouseManage/LongRentRelease');
const RentService = () => import('../pages/ServiceCenter/RentService');

const Billing = () => import('../pages/Bussiness/Billing');
const RefundLease = () => import('../pages/Bussiness/RefundLease');
const Booking = () => import('../pages/Bussiness/Booking');

const LongRentCustomerManage = () => import('../pages/CustomerManage/LongRentCustomerManage');
const TakeWatchManage = () => import('../pages/CustomerManage/TakeWatchManage');
const LandlordEntrust = () => import('../pages/OutsideScreen/LandlordEntrust');
const RelationalDictionary = () => import('../pages/DataCenter/RelationalDictionary');
const HouseSourceDetails = () => import('../pages/DataCenter/HouseSourceDetails');
const LongSentPrice = () => import('../pages/DataCenter/LongSentPrice');
const ChannelManage = () => import('../pages/ChannelManage/ChannelManage');
const LivingExpenses = () => import('../pages/HouseManage/LivingExpenses');
const BusinessParams = () => import('../pages/System/BusinessParams');

const AllInventory = () => import('../pages/InventoryControl/AllInventory');
const BookingPage = () => import('../pages/InventoryControl/BookingPage');
const DeployPage = () => import('../pages/InventoryControl/DeployPage');
const FirstDeployPage = () => import('../pages/InventoryControl/FirstDeployPage');
const FirstNotRentPage = () => import('../pages/InventoryControl/FirstNotRentPage');
const NotRentPage = () => import('../pages/InventoryControl/NotRentPage');
const RentPage = () => import('../pages/InventoryControl/RentPage');

/*
 meta: { keepAlive: true, elementName: 'HouseState' }
 keepAlive： 是否缓存
 elementName： 使用缓存 'keep-alive' 需要，且要和组件内的 ‘name’ 相等，保证是唯一值。
*/

const asyncRouter = [
  {
    path: '/asyncRouter',
    component: Layout,
    children: [],
    meta: { keepAlive: false }
  },
  {
    path: '/',
    redirect: '/Home',
    hidden: true,
    meta: { keepAlive: false }
  },
  {
    path: '/Housing',
    component: Housing,
    name: '收房管理',
    meta: { keepAlive: true, elementName: 'Housing' },
    abc: 'abc'
  },
  {
    path: '/OwnerContract',
    component: OwnerContract,
    name: '收房合同',
    meta: { keepAlive: true, elementName: 'OwnerContract' }
  },
  {
    path: '/TenantContract',
    component: TenantContract,
    name: '租客合同',
    meta: { keepAlive: true, elementName: 'TenantContract' }
  },
  {
    path: '/ShortRentHouseStatus',
    component: ShortRentHouseStatus,
    name: '短租房态',
    meta: { keepAlive: true, elementName: 'ShortRentHouseStatus' }
  },
  {
    path: '/HouseRelease',
    component: HouseRelease,
    name: '短租发布',
    meta: { keepAlive: true, elementName: 'HouseRelease' }
  },
  {
    path: '/OrdersManage',
    component: OrdersManage,
    name: '订单管理',
    meta: { keepAlive: true, elementName: 'OrdersManage' }
  },
  {
    path: '/RefundManage',
    component: RefundManage,
    name: '退款管理',
    meta: { keepAlive: true, elementName: 'RefundManage' }
  },
  {
    path: '/Advertisting',
    component: Advertisting,
    name: '广告管理',
    meta: { keepAlive: true, elementName: 'Advertisting' }
  },
  {
    path: '/CompanyNotice',
    component: CompanyNotice,
    name: '公告列表',
    meta: { keepAlive: true, elementName: 'CompanyNotice' }
    // hidden: true
  },
  {
    path: '/RecommendHouse',
    component: RecommendHouse,
    name: '首页推荐',
    meta: { keepAlive: true, elementName: 'RecommendHouse' }
    // hidden: true
  },
  {
    path: '/CommentManage',
    component: CommentManage,
    name: '评论管理',
    meta: { keepAlive: true, elementName: 'CommentManage' }
  },
  {
    path: '/UserManage',
    component: UserManage,
    name: '用户管理',
    meta: { keepAlive: true, elementName: 'UserManage' }
  },
  {
    path: '/TenantManage',
    component: TenantManage,
    name: '短租住客管理',
    meta: { keepAlive: true, elementName: 'TenantManage' }
  },
  {
    path: '/SetCity',
    component: SetCity,
    name: '城市设置',
    meta: { keepAlive: true, elementName: 'SetCity' }
  },
  {
    path: '/LongRentRelease',
    component: LongRentRelease,
    name: '长租发布',
    meta: { keepAlive: true, elementName: 'LongRentRelease' }
  },
  // {
  //   path: '/LongSharedHouseStatus',
  //   component: LongSharedHouseStatus,
  //   name: '长租房态（合租）',
  //   meta: { keepAlive: true, elementName: 'LongSharedHouseStatus' }
  // },

  {
    path: '/LongRentHouseStatus',
    component: LongEntireRentHouseStatus,
    name: '长租房态',
    meta: { keepAlive: true, elementName: 'LongEntireRentHouseStatus' }
  },
  {
    path: '/HouseTotal',
    component: HouseTotal,
    name: '库存统计',
    meta: { keepAlive: true, elementName: 'HouseTotal' }
  },
  {
    path: '/RentService',
    component: RentService,
    name: '租后服务',
    meta: { keepAlive: true, elementName: 'RentService' }
  },
  {
    path: '/Billing',
    component: Billing,
    name: '长租账单管理',
    meta: { keepAlive: true, elementName: 'Billing' }
  },
  {
    path: '/RefundLease',
    component: RefundLease,
    name: '长租退租管理',
    meta: { keepAlive: true, elementName: 'RefundLease' }
  },
  {
    path: '/Booking',
    component: Booking,
    name: '长租定金管理',
    meta: { keepAlive: true, elementName: 'Booking' }
  },
  {
    path: '/LongRentCustomerManage',
    component: LongRentCustomerManage,
    name: '长租客户管理',
    meta: { keepAlive: true, elementName: 'LongRentCustomerManage' }
  },
  {
    path: '/TakeWatchManage',
    component: TakeWatchManage,
    name: '带看管理',
    meta: { keepAlive: true, elementName: 'TakeWatchManage' }
  },
  {
    path: '/LandlordEntrust',
    component: LandlordEntrust,
    name: '业主委托',
    meta: { keepAlive: true, elementName: 'landlordEntrust' }
  },
  {
    path: '/LivingExpenses',
    component: LivingExpenses,
    name: '生活费账单管理',
    meta: { keepAlive: true, elementName: 'LivingExpenses' }
  },
  {
    path: '/BusinessParams',
    component: BusinessParams,
    name: '参数设置',
    meta: { keepAlive: true, elementName: 'BusinessParams' }
  },
  {
    path: '/TurnoutAreaManage',
    component: TurnoutAreaManage,
    name: '责任盘',
    meta: { keepAlive: true, elementName: 'TurnoutAreaManage' }
  },
  {
    path: '/SetCityCompany',
    component: SetCityCompany,
    name: '分公司设置',
    meta: { keepAlive: true, elementName: 'SetCityCompany' }
  },
  {
    path: '/RelationalDictionary',
    component: RelationalDictionary,
    name: '关系字典管理',
    meta: { keepAlive: true, elementName: 'RelationalDictionary' }
  },
  {
    path: '/HouseSourceDetails',
    component: HouseSourceDetails,
    name: '房源明细管理',
    meta: { keepAlive: true, elementName: 'HouseSourceDetails' }
  },
  {
    path: '/LongSentPrice',
    component: LongSentPrice,
    name: '长租价格管理',
    meta: { keepAlive: true, elementName: 'LongSentPrice' }
  },
  {
    path: '/ChannelManage',
    component: ChannelManage,
    name: '转介',
    meta: { keepAlive: true, elementName: 'ChannelManage' }
  },
  {
    path: '/AllInventory',
    component: AllInventory,
    name: '全部库存',
    meta: { keepAlive: true, elementName: 'AllInventory' }
  },
  {
    path: '/BookingPage',
    component: BookingPage,
    name: '已下定',
    meta: { keepAlive: true, elementName: 'BookingPage' }
  },
  {
    path: '/DeployPage',
    component: DeployPage,
    name: '二次配置中',
    meta: { keepAlive: true, elementName: 'DeployPage' }
  },
  {
    path: '/FirstDeployPage',
    component: FirstDeployPage,
    name: '首次配置中',
    meta: { keepAlive: true, elementName: 'FirstDeployPage' }
  },
  {
    path: '/FirstNotRentPage',
    component: FirstNotRentPage,
    name: '首次待租',
    meta: { keepAlive: true, elementName: 'FirstNotRentPage' }
  },
  {
    path: '/NotRentPage',
    component: NotRentPage,
    name: '二次待租',
    meta: { keepAlive: true, elementName: 'NotRentPage' }
  },
  {
    path: '/RentPage',
    component: RentPage,
    name: '已租',
    meta: { keepAlive: true, elementName: 'RentPage' }
  }
];

export default asyncRouter;
