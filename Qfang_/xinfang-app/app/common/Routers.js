import ExternalHome from '../pages/Home/ExternalHome';
import InternalHome from '../pages/Home/InternalHome';

import Distribution from '../pages/Distribution/Distribution';
import TransationReport from '../pages/Distribution/TransactionReport';
import GardenList from '../pages/GardenList/GardenList';
import GardenSearch from '../pages/Search/GardenSearch';
import GardenSearch4Customer from '../pages/Search/GardenSearch4Customer';
import GardenSearch4Report from '../pages/Search/GardenSearch4Report';
import CustomerSearch from '../pages/Search/CustomerSearch';
import AgentSearch from '../pages/Search/AgentSearch';
import CustomerContactsSearch from '../pages/Search/CustomerContactsSearch';

import CustomerList from '../pages/CustomerList/CustomerList';

import GardenDetails from '../pages/GardenDetails/GardenDetails';
// 战况实报
import ReleaseDetails from '../pages/ReleaseDetails';
// 动态列表详情
import DynamicsListDetail from '../pages/GardenDetails/DynamicsListDetail';
// 参数详情
import Parameters from '../pages/GardenDetails/Parameters';
// 详情页分销说明
import DistributionDetail from '../pages/GardenDetails/DistributionDetail';
// 动态详情
import DynamicsDetail from '../pages/GardenDetails/DynamicsDetail';
// 楼盘卖点和项目介绍
import SellingPoint from '../pages/GardenDetails/SellingPoint';
// 报备详情
import AddReport from '../pages/Distribution/report/AddReport';
import ReportDetail from '../pages/Distribution/report/ReportDetail';
// 周边配套
import Surround from '../pages/GardenDetails/Surround';

// 客户详情
import CustomerDetails from '../pages/CustomerDetails/CustomerDetails';

// 分客列表
import PassCustomer from '../pages/CustomerDetails/PassCustomer';

// 报备录入
import ReportEntry from '../pages/CustomerDetails/ReportEntry';

// 报备录入分销公司选择
import SelectPickerGoBack from '../components/SelectPickerGoBack';

// 城市选择
import CityPicker from '../pages/CityAreaPicker/CityPicker';

// 区域选择
import AreaPicker from '../pages/CityAreaPicker/AreaPicker';

// 增加修改私客
import AddAndModifyCustomer from '../pages/AddAndModifyCustomer/AddAndModifyCustomer';

// 组件户型来源等
import FilterView from '../components/FilterBar/FilterView';

// 报备选择联系人
import ReportContacts from '../pages/ReportContacts';

const Routes = {
  ExternalHome: { screen: ExternalHome },
  InternalHome: { screen: InternalHome },
  GardenSearch: { screen: GardenSearch },
  GardenSearch4Customer: { screen: GardenSearch4Customer },
  GardenSearch4Report: { screen: GardenSearch4Report },
  CustomerSearch: { screen: CustomerSearch },
  AgentSearch: { screen: AgentSearch },
  CustomerContactsSearch: { screen: CustomerContactsSearch },

  GardenList: { screen: GardenList },
  CustomerList: { screen: CustomerList },

  Distribution: { screen: Distribution },
  AddReport: { screen: AddReport },
  'Distribution-ReportedDetail': { screen: ReportDetail },
  'Distribution-TransactionReport': { screen: TransationReport },

  ReleaseDetails: { screen: ReleaseDetails },

  GardenDetails: { screen: GardenDetails },
  SelectPickerGoBack: { screen: SelectPickerGoBack },
  'GardenDetails-Parameters': { screen: Parameters },
  'GardenDetails-DistributionDetail': { screen: DistributionDetail },
  'GardenDetails-SellingPoint': { screen: SellingPoint },
  'GardenDetails-Surround': { screen: Surround },
  DynamicsListDetail: { screen: DynamicsListDetail },
  DynamicsDetail: { screen: DynamicsDetail },

  CustomerDetails: { screen: CustomerDetails },
  PassCustomer: { screen: PassCustomer },
  ReportEntry: { screen: ReportEntry },
  CityPicker: { screen: CityPicker },
  AreaPicker: { screen: AreaPicker },
  AddAndModifyCustomer: { screen: AddAndModifyCustomer },
  FilterView: { screen: FilterView },
  ReportContacts: { screen: ReportContacts },
};

export default Routes;
