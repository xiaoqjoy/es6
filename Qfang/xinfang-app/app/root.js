import React, { PureComponent } from 'react';
import { Platform, StatusBar, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import { QFReactHelper, UMNative } from './common/NativeHelper';
import HTTPAdapter from './common/HTTPAdapter';
import './common/Storage'; // 需引入，并将 storage 引用于 global 下
import Routers from './common/Routers';
import UserInfo from './common/UserInfo';
import { system } from './utils';


const navigatorConfig = {
  initialRouteName: 'ExternalHome',
  navigationOptions: {
    headerBackTitle: null,
    headerTintColor: '#333',
    showIcon: true,
    headerStyle: {
      backgroundColor: '#fff',
      borderBottomWidth: StyleSheet.hairlineWidth, // 和iPhone的默认底部边框线保持一致
      borderBottomColor: '#d9d8d9',
      elevation: 999,
      zIndex: 999,
    },
    headerTitleStyle: {
      // alignSelf: 'center',
      // flex: 1,
      textAlign: 'center',
      width: system.isIOS ? '100%' : '89%',
      fontWeight: 'normal',
      color: '#3a3a3a',
      fontSize: 18,
    },
  },
};

let MyNavigator = null;

// 通过 navigationState 获取当前路由名称
function getRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];

  if (route.routes) {
    // console.log('route.routes', route.routes);
    return getRouteName(route);
  }
  // console.log('route.routeName = ' + route.routeName);
  return route.routeName;
}

// 对于不同平台和页面设置不同的状态栏颜色和底部TAB
function renderStatusBar(page) {
  if (page === 'ExternalHome' && UserInfo.companyType !== 'INLINE') {
    QFReactHelper.showMainTabbar(true);
  } else {
    QFReactHelper.showMainTabbar(false);
  }

  if (Platform.OS === 'ios') {
    StatusBar.setBarStyle('dark-content');
  }
}

class Root extends PureComponent {
  constructor(props) {
    super(props);

    if (Platform.OS !== 'ios') {
      StatusBar.setBarStyle('default');
      StatusBar.setBackgroundColor('#000');
    }
    this.getParamsFromNative(props);
    this.initNavigator();
    renderStatusBar(navigatorConfig.initialRouteName);
  }

  componentWillMount() {
    UMNative.onPageBegin(navigatorConfig.initialRouteName);
  }

  componentWillUnmount() {
    UMNative.onPageEnd(navigatorConfig.initialRouteName);
  }

  // 获取原生 APP 传入的用户信息，并初始化接口请求默认参数
  getParamsFromNative(props) {
    this.params = {
      baseUrl: props.baseUrl,
      sessionId: props.sessionId,
      accountId: props.accountId,
      companyType: props.companyType,
      expandId: props.expandId,
      gardenName: props.gardenName,
      commissionRate: props.commissionRate, // 是否显示佣金比例
      reward: props.reward, // 是否显示带看奖，
      target: props.target,
      privateCustomerId: props.privateCustomerId, // 跳转客户详情用的id
    };

    if (__DEV__) {
      // this.params.baseUrl = 'http://172.16.72.124:8088/newhouse-web';// 泽源 电脑
      this.params.baseUrl = 'http://xf.qfang.com/newhouse-web/';
      this.params.sessionId = 'ae37ce62-af7c-4441-b546-55b7dc5943e2';
      // this.params.companyType = 'INLINE';// OUTTER INLINE
      this.params.commissionRate = true;
      // this.params.expandId= 30;
      // this.params.gardenName='abc';
    }

    // this.params = {
    //   "baseUrl": "http://xf.qfang.com/newhouse-web/",
    //   "sessionId": "06946430-1626-45d8-aaed-2566e083b729",
    //   "accountId": "18188610505",
    //   "companyType": "OUTREACH",
    //   "commissionRate": true,
    //   "reward": true
    // };

    Object.assign(UserInfo, this.params); // 缓存用户信息

    if (!this.params.sessionId) {
      console.log('用户未登录');
      QFReactHelper.show('数据异常，请联系管理员！', 2);
      QFReactHelper.navPop();
    }

    console.log(`当前用户 ${JSON.stringify(this.params)}`);

    HTTPAdapter.setup(this.params);
  }

  params = {};


  // 根据用户类型定义路由入口
  initNavigator() {
    if (this.params.expandId) {
      navigatorConfig.initialRouteName = 'GardenDetails';

      // 若传入 expandId ，则默认打开楼盘详情页，并将楼盘参数传入
      navigatorConfig.initialRouteParams = {
        id: this.params.expandId,
        name: this.params.gardenName,
      };
      QFReactHelper.showMainTabbar(false);
    } else if (this.params.target === 'AddAndModifyCustomer') {
      // 直接从原生app那边某处进去添加私客
      navigatorConfig.initialRouteName = 'AddAndModifyCustomer';
      QFReactHelper.showMainTabbar(false);
    } else if (this.params.target === 'customerDetail') {
      // 直接从原生app那边某处进去私客详情
      navigatorConfig.initialRouteName = 'CustomerDetails';
      navigatorConfig.initialRouteParams = {
        privateCustomerId: this.params.privateCustomerId,
      };
      QFReactHelper.showMainTabbar(false);
    } else {
      QFReactHelper.showMainTabbar(true);
    }
    MyNavigator = createStackNavigator(Routers, navigatorConfig);
  }

  // 外联用户首页隐藏原生 APP 底部 TAB，并设置状态栏文字颜色
  navigationChange(prevState, currentState) {
    const prevPage = getRouteName(prevState);
    const currentPage = getRouteName(currentState);

    if (prevPage !== currentPage) {
      UMNative.onPageEnd(`XF-${prevPage}`);
      UMNative.onPageBegin(`XF-${currentPage}`);

      console.log(`prevPage=${prevPage}, currentPage=${currentPage}`);

      renderStatusBar(currentPage);
    }
  }


  render() {
    return (
      <MyNavigator
        onNavigationStateChange={this.navigationChange}
        screenProps={{ expandId: this.params.expandId, target: this.params.target }}
      />
    );
  }
}

export default Root;
