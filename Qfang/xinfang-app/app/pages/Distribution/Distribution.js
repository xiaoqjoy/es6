import React, { PureComponent } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  ScrollView,
  DeviceEventEmitter,
  InteractionManager,
} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import axios from 'axios';

import { QFReactHelper, UMNative } from '../../common/NativeHelper';
import UserInfo from '../../common/UserInfo';

import { toThousands } from '../../utils/tool';

import baseStyles from '../../components/baseStyles';
import LoadingView from '../../components/LoadingView';
import GoBack from '../../components/GoBack';

import MyDeal from './MyDeal';
import MyReported from './MyReported';

class Distribution extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: '分销',
      headerLeft: (<GoBack navigation={navigation} onBackPress={() => params.navigateBack && params.navigateBack()} />),
      headerRight: <Text />,
    };
  };

  constructor() {
    super();
    this.state = {
      isLoading: true,
      commissionData: [],
      statisticsData: [],
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
    });

    // 重新绑定后退按钮的事件
    this.props.navigation.setParams({
      navigateBack: this.navigateBack.bind(this),
    });

    InteractionManager.runAfterInteractions(() => {
      axios.get('info/commission')
        .then((res) => {
          if (res.data.status == 'C0000') {
            UserInfo.commissionData = res.data.result.commission;
            this.setState({
              commissionData: res.data.result.commission,
            });
          }
        }).catch((err) => {
          console.log(err);
        });

      this.requestData();
    });
  }

  navigateBack() {
    // const { companyType } = UserInfo;
    // if (companyType === 'INLINE') {
    //   QFReactHelper.navPop();
    // } else {
    //   this.props.navigation.goBack();
    //   DeviceEventEmitter.emit('refresh');
    // }
    this.props.navigation.goBack();
    DeviceEventEmitter.emit('refresh');
  }

  requestData() {
    axios.get('distribution/personal/statistics').then((res) => {
      if (res.data.status == 'C0000') {
        this.setState({
          statisticsData: res.data.result,
        });
      }
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <LoadingView />
      );
    }

    const { navigation } = this.props;

    return (
      <View style={baseStyles.container}>
        <View style={styles.distributionHead}>
          <View style={[baseStyles.marginL15, baseStyles.marginT10]}>
            <Text style={[styles.distributionTip, baseStyles.fz10]}>佣金已包含现金奖，个人应得佣金需按实际合同确定</Text>
          </View>
          <View style={styles.commission}>
            <View style={styles.commissionMoneyBox}>
              <View style={styles.moneyItem}>
                <Text style={[baseStyles.fz12, baseStyles.colorFff]}>应结佣金</Text>
                <Text numberOfLines={1} style={[baseStyles.colorFff, baseStyles.marginT10, baseStyles.fz18]}>
                  <Text>{toThousands(this.state.commissionData.total) || 0}</Text>
                  <Text style={baseStyles.fz12}>元</Text>
                </Text>
              </View>
              <View style={[styles.moneyItem, styles.moneyItemLine]}>
                <Text style={[baseStyles.fz12, baseStyles.colorFff]}>已结佣金</Text>
                <Text numberOfLines={1} style={[baseStyles.marginT10, baseStyles.colorFff, baseStyles.fz18]}>
                  <Text>{toThousands(this.state.commissionData.paid) || 0}</Text>
                  <Text style={baseStyles.fz12}>元</Text>
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.countBox}>
            <View style={styles.countItem}><Text style={baseStyles.colorFff}>报备: {this.state.statisticsData.RESERVATION_SUCCESSFUL || 0}</Text></View>
            <View style={styles.countItem}><Text style={baseStyles.colorFff}>带看: {this.state.statisticsData.GUIDE_SUCCESSFUL || 0}</Text></View>
            <View style={styles.countItem}><Text style={baseStyles.colorFff}>成交: {this.state.statisticsData.BARGAIN || 0}</Text></View>
          </View>
        </View>
        <ScrollableTabView
          style={[styles.tabView, baseStyles.marginT10]}
          tabBarBackgroundColor="#fff"
          tabBarActiveTextColor="#3a3a3a"
          tabBarInactiveTextColor="#a8a8a8"
          tabBarTextStyle={{ fontSize: 18, fontWeight: 'normal' }}
          tabBarUnderlineStyle={{ backgroundColor: '#ffa200', height: 2, borderBottomWidth: 0 }}
          locked={false}
          onChangeTab={(obj) => {
            if (obj.i === 0) {
              UMNative.onEvent('XF-Distribution-MyDeal');
            } else {
              UMNative.onEvent('XF-Distribution-MyReported');
            }
          }}
          renderTabBar={() => <DefaultTabBar style={{ borderBottomColor: '#dedfe0', borderBottomWidth: StyleSheet.hairlineWidth }} />}
        >
          <MyDeal tabLabel="我的成交" navigation={navigation} />
          <MyReported tabLabel="我的报备" navigation={navigation} />
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  distributionHead: {
    ...Platform.select({
      android: {
        height: 185,
      },
      ios: {
        height: 175,
      },
    }),
    backgroundColor: '#fd9e4a',
  },

  distributionTip: {
    color: '#ffd9be',
  },

  commission: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 10,
    paddingBottom: 30,
    marginTop: 30,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ffa778',
  },

  commissionMoneyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  moneyItem: {
    flex: 1,
    alignSelf: 'flex-start',
    paddingLeft: '4%',
  },

  moneyItemLine: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#ffa778',
    marginLeft: 10,
  },

  countBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
  },

  countItem: {
    alignItems: 'center',
    flex: 1,
  },
});

export default Distribution;
