import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
  Platform,
  DeviceEventEmitter,
  NativeEventEmitter,
  InteractionManager,
} from 'react-native';

import axios from 'axios';

import UserInfo from '../../common/UserInfo';
import { QFReactHelper, UMNative } from '../../common/NativeHelper';

import { toThousands } from '../../utils/tool';

import Icon from '../../components/Icon/';
import baseStyles from '../../components/baseStyles';

class Commissions extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();

    this.state = {
      commissionData: {},
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.requestData.bind(this));

    this.subRefresh = DeviceEventEmitter.addListener('refresh', this.requestData.bind(this));

    try {
      // 监听原生 APP 中的设置中是否切换了显示佣金比例和现金奖的开关，若是，则更新 UserInfo
      const myNativeEmitter = new NativeEventEmitter(QFReactHelper);
      this.subConfigChange = myNativeEmitter.addListener('configchange', (data) => {
        UserInfo.commissionRate = data.commissionRate;
        UserInfo.reward = data.reward;

        if (UserInfo.commissionRate) {
          InteractionManager.runAfterInteractions(this.requestData.bind(this));
        } else {
          this.forceUpdate();
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    this.subRefresh.remove();
    this.subConfigChange && this.subConfigChange.remove();
  }

  requestData() {
    // 分销佣金
    axios.get('info/commission') // 佣金会经常更新
      .then((res) => {
        if (res.data.status == 'C0000') {
          this.setState({
            commissionData: res.data.result.commission,
          });
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (!UserInfo.commissionRate) {
      return null;
    }

    return (
      <View style={styles.commission}>
        <View style={styles.commissionTitle}>
          <Text style={baseStyles.fz18}>分销佣金</Text>
        </View>
        <View style={styles.commissionMoneyBox}>
          <View style={styles.moneyItem}>
            <Text style={[baseStyles.fz14, baseStyles.colorA8]}>应结佣金</Text>
            <Text
              style={[baseStyles.colorF91, baseStyles.marginT10, baseStyles.fz18]}
              numberOfLines={1}
            >
              {toThousands(this.state.commissionData.total) || 0}
              <Text style={[baseStyles.colorA3a, baseStyles.fz12]}>元</Text>
            </Text>
          </View>
          <View style={[styles.moneyItem, styles.moneyItemLine]}>
            <Text style={[baseStyles.fz14, baseStyles.colorA8]}>已结佣金</Text>
            <Text
              style={[baseStyles.marginT10, baseStyles.fz18]}
              numberOfLines={1}
            >
              {toThousands(this.state.commissionData.paid) || 0}
              <Text style={[baseStyles.colorA3a, baseStyles.fz12]}>元</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  commission: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    paddingLeft: 15,
    marginBottom: 10,
    ...Platform.select({
      android: {
        height: 130,
      },
      ios: {
        height: 120,
      },
    }),
  },
  commissionTitle: {
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomColor: '#e7e8ea',
    marginBottom: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  commissionMoneyBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  moneyItem: {
    flex: 1,
    alignSelf: 'flex-start',
  },
  moneyItemLine: {
    borderLeftColor: '#e7e8ea',
    borderLeftWidth: StyleSheet.hairlineWidth,
    paddingLeft: 20,
  },
});
export default Commissions;
