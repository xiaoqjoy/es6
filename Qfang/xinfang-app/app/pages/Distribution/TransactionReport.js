import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  FlatList,
  Animated,
  Easing,
  Platform,
  InteractionManager,
} from 'react-native';

import axios from 'axios';
import { toThousands } from '../../utils/tool';
import * as Constants from '../../common/Constants';

import baseStyles from '../../components/baseStyles';
import LoadingView from '../../components/LoadingView';
import GoBack from '../../components/GoBack';
import Icon from '../../components/Icon/';

const cellW = Constants.STANDARD_WIDTH;

class TransationReport extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: '交易报告',
      headerLeft: (<GoBack navigation={navigation} />),
      headerRight: <Text />,
    };
  };

  constructor() {
    super();

    this.state = {
      dataSource: [],
      paidCashArry: [],
      commissionData: {},
      totalCommission: '',
      totalCash: '',
      isLoading: true,
      iconUpFlag: true,
      distributionH: 130,
      distriEndbutionH: 260,
      showText: '展开',
      initOpacity: new Animated.Value(0),
      // initTop: new Animated.Value(0),
      // accountFalistH: new Animated.Value(0),
      headHeight: new Animated.Value(0),
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.requestData(this.props.navigation.state.params);
    });
  }

  requestData(param) {
    axios.get('distribution/personal/report', { params: { id: param.id } }).then((res) => {
      if (res.data.status == 'C0000') {
        const resultArry = []; // FlatList 数据只支持数组
        const resultData = res.data.result;
        let paidCashArry = [];
        const paidArry = [];
        const cashArry = [];

        for (const i in resultData.paidCommissionDetail) {
          resultData.paidCommissionDetail[i].type = 'paid';
          paidArry.push(resultData.paidCommissionDetail[i]);
        }

        for (const i in resultData.paidCashDetail) {
          resultData.paidCashDetail[i].type = 'cash';
          cashArry.push(resultData.paidCashDetail[i]);
        }

        paidCashArry = paidArry.concat(cashArry);

        resultArry.push(res.data.result);
        this.setState({
          dataSource: resultArry,
          paidCashArry,
          totalCash: resultData.totalCash,
          totalCommission: resultData.totalCommission,
          distributionH: paidCashArry.length > 0 ? 130 : 100,
          distriEndbutionH: Constants.OS === 'ios' ? (this.state.distriEndbutionH + (paidCashArry.length - 1) * 25) : (this.state.distriEndbutionH + (paidCashArry.length - 1) * 25 + 10),
          commissionData: {
            paidAmount: res.data.result.paidAmount,
            totalAmount: res.data.result.totalAmount,
          },
          isLoading: false,
        });
      }
    });
  }

  showAnimated() {
    const _this = this;

    if (this.state.iconUpFlag) {
      this.downAnimated();

      this.refs.headAnimatedRef.setNativeProps({
        style: {
          ...Platform.select({
            ios: {
              marginBottom: 25,
            },
            android: {
              marginBottom: 15,
            },
          }),
        },
      });

      this.setState({
        iconUpFlag: false,
        showText: '收起',
      });
    } else {
      this.upAnimated();
      this.refs.headAnimatedRef.setNativeProps({
        style: {
          marginBottom: 8,
        },
      });

      this.setState({
        iconUpFlag: true,
        showText: '展开',
      });
    }
  }

  upAnimated() {
    const that = this;
    const spring = Animated.spring;

    Animated.parallel(['initOpacity', 'headHeight'].map((property) => spring(that.state[property], {
        toValue: 0
      }))).start();
  }

  downAnimated() {
    const that = this;
    const spring = Animated.spring;

    Animated.parallel(['initOpacity', 'headHeight'].map((property) => spring(that.state[property], {
        toValue: 1
      }))).start();
  }

  _renderItem(data) {
    const dealData = data.item;
    return (
      <View style={styles.dealForSale}>
        <View style={styles.saleItem}>
          <Text style={[baseStyles.fz16, baseStyles.colorA8]}>成 交 楼 盘: </Text>
          <Text style={[baseStyles.fz16, baseStyles.colorA3a]}>{dealData.gardenName || ''}</Text>
        </View>
        <View style={styles.saleItem}>
          <Text style={[baseStyles.fz16, baseStyles.colorA8]}>成 交 客 户: </Text>
          <Text style={[baseStyles.fz16, baseStyles.colorA3a]}>{dealData.dealCustomer || ''}</Text>
        </View>
        <View style={styles.saleItem}>
          <Text style={[baseStyles.fz16, baseStyles.colorA8]}>成 交 价 格: </Text>
          <Text style={[baseStyles.fz16, baseStyles.colorA3a]}>{dealData.dealPrice || ''}</Text>
        </View>
        <View style={styles.saleItem}>
          <Text style={[baseStyles.fz16, baseStyles.colorA8]}>上 数 日 期: </Text>
          <Text style={[baseStyles.fz16, baseStyles.colorA3a]}>{dealData.subscribeCreateDate || ''}</Text>
        </View>
        <View style={styles.saleItem}>
          <Text style={[baseStyles.fz16, baseStyles.colorA8]}>成交确认人: </Text>
          <Text style={[baseStyles.fz16, baseStyles.colorA3a]}>{dealData.dealUser || ''}</Text>
        </View>
        <View style={styles.saleItem}>
          <Text style={[baseStyles.fz16, baseStyles.colorA8]}>案场负责人: </Text>
          <Text style={[baseStyles.fz16, baseStyles.colorA3a]}>{dealData.siteUser || ''}</Text>
        </View>
      </View>
    );
  }

  render() {
    if (this.state.isLoading) {
      return (
        <LoadingView />
      );
    }

    return (
      <View style={baseStyles.container}>
        <Animated.View
ref="headAnimatedRef"
style={[styles.distributionHead, {
          marginBottom: 8, height: this.state.headHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [this.state.distributionH, this.state.distriEndbutionH]
          })
        }]}
        >
          <View style={styles.commission}>
            <View style={styles.commissionMoneyBox}>
              <View style={styles.moneyItem}>
                <Text style={[baseStyles.fz12, baseStyles.colorFff]}>应结佣金</Text>
                <Text numberOfLines={1} style={[baseStyles.colorFff, baseStyles.marginT10, baseStyles.fz18]}>
                  <Text>{toThousands(this.state.commissionData.totalAmount) || 0}</Text>
                  <Text style={baseStyles.fz12}>元</Text>
                </Text>
              </View>
              <View style={[styles.moneyItem, styles.moneyItemLine]}>
                <Text style={[baseStyles.fz12, baseStyles.colorFff]}>已结佣金</Text>
                <Text numberOfLines={1} style={[baseStyles.marginT10, baseStyles.colorFff, baseStyles.fz18]}>
                  <Text>{toThousands(this.state.commissionData.paidAmount) || 0}</Text>
                  <Text style={baseStyles.fz12}>元</Text>
                </Text>
              </View>
            </View>
          </View>
          {this.state.paidCashArry.length ?
            <View style={styles.settleAccountsDitail}>
              <TouchableHighlight onPress={this.showAnimated.bind(this)} activeOpacity={0.6} underlayColor="#fd9e4a">
                <View style={styles.openUpBtn}>
                  <Text style={[baseStyles.colorFff, baseStyles.fz14]}>{this.state.showText} </Text>
                  <Icon name={this.state.iconUpFlag ? 'arrow-up' : 'arrow-down'} size={14} color="#fff" style={styles.iconUpDown} />
                </View>
              </TouchableHighlight>
              <Animated.View style={[styles.settleAccountsItemCont, {
                opacity: this.state.initOpacity,
              }]}
              >
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
                    <Text style={[baseStyles.fz14, baseStyles.colorA8]}>佣金：</Text>
                    <Text style={[baseStyles.fz16, baseStyles.color333, baseStyles.ftBold]}>{toThousands(this.state.totalCommission)}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[baseStyles.fz14, baseStyles.colorA8]}>现金奖：</Text>
                    <Text style={[baseStyles.fz16, baseStyles.color333, baseStyles.ftBold]}>{toThousands(this.state.totalCash)}</Text>
                  </View>
                </View>
                <View style={[styles.tabRow, styles.tabHead]}>
                  <View style={[styles.tabRowTd, { flex: 2 }]}><Text style={[styles.alginStart, baseStyles.colorF7e, baseStyles.fz14]}>类型</Text></View>
                  <View style={[styles.tabRowTd, { flex: 4 }]}><Text style={[styles.alginStart, baseStyles.colorF7e, baseStyles.fz14]}>结算金额</Text></View>
                  <View style={[styles.tabRowTd, { borderRightWidth: 0, flex: 4 }]}><Text style={[styles.alginEnd, baseStyles.colorF7e, baseStyles.fz14]}>结算日期</Text></View>
                </View>
                <View style={styles.paidCashTable}>
                  {this.state.paidCashArry.map((v, k) => {
                    v.paidTime = v.paidTime.slice(0, v.paidTime.indexOf(' ') + 1);
                    if (v.type === 'paid') {
                      return (
                        <View style={styles.tabRow} key={k}>
                          <View style={[styles.tabRowTd, { flex: 2 }]}><Text style={[styles.alginStart, baseStyles.colorF7e, baseStyles.fz14]}> 佣金</Text></View>
                          <View style={[styles.tabRowTd, { flex: 4 }]}><Text style={[styles.alginStart, baseStyles.colorA3a, baseStyles.fz16]}>{toThousands(v.commission) || 0}</Text></View>
                          <View style={[styles.tabRowTd, { borderRightWidth: 0, flex: 4 }]}><Text style={[styles.alginEnd, baseStyles.colorA3a, baseStyles.fz16]}>{v.paidTime || ''}</Text></View>
                        </View>
                      );
                    } else if (v.type === 'cash') {
                      return (
                        <View style={styles.tabRow} key={k}>
                          <View style={[styles.tabRowTd, { flex: 2 }]}><Text style={[styles.alginStart, baseStyles.colorF7e, baseStyles.fz14]}> 现金奖</Text></View>
                          <View style={[styles.tabRowTd, { flex: 4 }]}><Text style={[styles.alginStart, baseStyles.colorA3a, baseStyles.fz16]}>{toThousands(v.commission) || 0}</Text></View>
                          <View style={[styles.tabRowTd, { borderRightWidth: 0, flex: 4 }]}><Text style={[styles.alginEnd, baseStyles.colorA3a, baseStyles.fz16]}>{v.paidTime || ''}</Text></View>
                        </View>
                      );
                    }
                  })}
                </View>
              </Animated.View>
            </View>
            : null}
        </Animated.View>
        <FlatList
          initialListSize={4}
          data={this.state.dataSource}
          renderItem={this._renderItem.bind(this)}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  distributionHead: {
    width: '100%',
    backgroundColor: '#fd9e4a',
  },

  commission: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: 30,
    marginTop: 30,
  },

  commissionMoneyBox: {
    flexDirection: 'row',
    justifyContent: 'center',
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

  settleAccountsDitail: {
    width: '100%',
    marginTop: -10,
    justifyContent: 'center',
  },

  openUpBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },

  settleAccountsItemCont: {
    padding: 20,
    marginLeft: 10,
    backgroundColor: '#fff',
    // shadowColor: '#ccc',
    // shadowOpacity: .8,
    // shadowOffset: { width: 0, height: 2 },
    // shadowRadius: 3,
    position: 'absolute',
    top: 30,
    zIndex: 100,
    elevation: 99,
    width: cellW - 20,
  },

  settleAccountsItem: {
    flexDirection: 'row',
    flex: 1,
    height: 25,
  },

  alginStart: {
    flex: 1,
    textAlign: 'center',
  },

  alginEnd: {
    flex: 1,
    textAlign: 'center',
  },

  dealForSale: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 8,
  },

  saleItem: {
    marginLeft: 15,
    height: 50,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e8e9ea',
    flexDirection: 'row',
    alignItems: 'center',
  },

  paidCashTable: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e8e9ea',
    borderTopWidth: 0,
  },

  tabHead: {
    borderBottomWidth: 0,
    borderLeftColor: '#e8e9ea',
    borderLeftWidth: 1,
    borderRightColor: '#e8e9ea',
    borderRightWidth: 1,
  },

  tabRow: {
    flexDirection: 'row',
  },

  tabRowTd: {
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#e8e9ea',
    alignSelf: 'center',
    borderTopColor: '#e8e9ea',
    borderTopWidth: 1,
  },
});

export default TransationReport;
