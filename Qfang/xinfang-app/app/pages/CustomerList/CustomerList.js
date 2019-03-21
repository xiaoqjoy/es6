import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  DeviceEventEmitter,
  TouchableOpacity,
  PixelRatio,
  Platform,
  TextInput,
  InteractionManager,
  Linking,
  Alert,
} from 'react-native';

import axios from 'axios';

import UltimateListView from 'react-native-ultimate-listview';

import { QFReactHelper, UMNative } from '../../common/NativeHelper';
import UserInfo from '../../common/UserInfo';
import * as Constants from '../../common/Constants';
import baseStyles from '../../components/baseStyles';
import Icon from '../../components/Icon/';
import GoBack from '../../components/GoBack';
import FilterBar from '../../components/FilterBar/FilterBar';
import StatusView from '../../components/StatusView';
import * as FilterData from '../../components/FilterBar/FilterData';
import DialogBox from '../../components/react-native-dialogbox';

import { screen } from '../../utils';

import RenderItem from './RenderItem';

export default class CustomerList extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: '我的客户',
      headerLeft: (<GoBack navigation={navigation} />),
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => {
              requestAnimationFrame(() => {
                navigation.navigate('CustomerSearch');
                UMNative.onEvent('XF-CustomerList-CustomerSearch');
              });
            }}
          >
            <Icon style={{ marginLeft: 5 }} name="magnifier" size={20} color="#7e7e7e" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              requestAnimationFrame(() => {
                navigation.navigate('AddAndModifyCustomer');
              });
            }}
          >
            <Icon style={{ marginLeft: 10, marginRight: 15 }} name="tianjia" size={20} color="#7e7e7e" />
          </TouchableOpacity>
        </View>
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      recordCount: 0,
      isLoading: true,
    };
    this.params = { page: 1 };
    this.showFlag = false;
    this.onFetch = this.onFetch.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    this.subRefresh = DeviceEventEmitter.addListener('customerListRefresh', () => { this.listView.refresh(); });

    this.subscription = DeviceEventEmitter.addListener('queryCustomer', (data) => {
      const { field } = data;
      let value = data.item.key;
      if (value instanceof Array) {
        value = value.join(',');
      }

      if (field === 'price') {
        const priceArr = value.split(',');
        this.params.intentionMinPrice = priceArr[0] * 1e4;
        this.params.intentionMaxPrice = priceArr[1] * 1e4;
      } else {
        this.params[field] = value;
      }
      this.refreshAndHideSort();

      const eventName = {
        waySource: 'XF-CustomerList-SourceFilter',
        intentionLayout: 'XF-CustomerList-LayoutFilter',
        price: 'XF-CustomerList-PriceFilter',
        customerGroupId: 'XF-CustomerList-GroupFilter',
      };
      UMNative.onEvent(eventName[field]);
    });
  }

  componentWillUnmount() {
    // 移除
    this.subRefresh.remove();
    this.subscription.remove();
  }

  async onFetch(page, startFetch, abortFetch) {
    try {
      this.params.page = page || 1;
      const res = await this.requestData();
      this.sortButton.setNativeProps({
        style: {
          right: 20,
        },
      });
      startFetch(res.items, 10);
    } catch (err) {
      abortFetch();
      console.log(err);
    }
  }

  getCustomView() {
    return (
      <View style={{ height: Constants.HEIGHT_RATIO * 57 }}>
        <TextInput
          style={{ height: Constants.HEIGHT_RATIO * 57, width: Constants.STANDARD_WIDTH }}
          onSubmitEditing={(event) => {
            DeviceEventEmitter.emit('filterViewSubmit', event.nativeEvent.text);
          }}
        />
      </View>
    );
  }

  getBar() {
    const customView = this.getCustomView();
    return [
      {
        text: '来源',
        field: 'waySource',
        dataList: FilterData.getSourceAll('query'),
      },
      {
        text: '户型',
        field: 'intentionLayout',
        dataList: FilterData.getHouseStyle('query'),
      },
      {
        text: '价格',
        field: 'price',
        dataList: FilterData.getPrice('query'),
        customData: {
          placeHolderLow: '最低价格',
          placeHolderHigh: '最高价格',
          customView,
        },
      },
      {
        text: '分组',
        field: 'customerGroupId',
        dataList: FilterData.getGroup('query'),
      },
    ];
  }

  requestData() {
    return axios.get('customer/private/list', { params: this.params || {} })
      .then((res) => {
        if (res.data.status === 'C0000') {
          if (res.data.result.recordCount > 0) {
            this.setState({
              recordCount: res.data.result.recordCount,
              isLoading: false,
            });
          } else {
            this.setState({
              status: 'no-data-found',
              recordCount: res.data.result.recordCount,
              isLoading: false,
            });
          }
          return res.data.result;
        }
        this.setState({
          status: 'request-failed',
          recordCount: 0,
          isLoading: false,
        });
        // return { items: [] };
      }).catch((error) => {
        console.log('error=', error);
        this.setState({
          recordCount: 0,
          status: 'network-error',
          isLoading: false,
        });
        // return { items: [] };
      });
  }

  refreshAndHideSort() {
    InteractionManager.runAfterInteractions(() => {
      this.listView.refresh();
      if (this.listView.getRows().length > 0) {
        this.listView.scrollToIndex({ animated: false, viewPosition: 0, index: 0 });
      }
      this.toggleSortContainer(null, true);
    });
  }

  toggleSortContainer(proxy, forceHide) {
    this.sortContainer.setNativeProps({
      style: {
        right: (forceHide || this.showFlag) ? -999 : 20,
      },
    });

    this.showFlag = forceHide === undefined ? !this.showFlag : !forceHide;
  }

  addFollowUpRecord(item, child) {
    axios.get('customer/private/saveFollow', {
      params: {
        id: item.id,
        customerId: item.customerId,
        content: '已联系此客户',
      },
    })
      .then((res) => {
        if (res.data.status === 'C0000') {
          QFReactHelper.show('已帮您自动添加一条跟进记录', 2);
          item.unFollowed = false;
          child.setState({
            refresh: Math.random(),
          });
          // this.listView.refresh();// 刷新列表有延迟 所以用上面3行代码
        } else {
          QFReactHelper.show(res.data.message);
        }
      })
      .catch((error) => {
        QFReactHelper.show('服务器异常', 3);
      });
  }

  callCustomer(item) {
    Linking.canOpenURL(`tel:${item.phone}`)
      .then((supported) => {
        if (!supported) {
          Alert.alert('当前版本不支持拨打号码');
        } else {
          UMNative.onEvent('XF-CustomerList-Dial');
          Linking.openURL(`tel:${item.phone}`);
        }
      })
      .catch((err) => console.log(`未知错误${err}`));
  }

  // 弹窗提示 是否添加跟进
  followUpDialog(item, child) {
    this.dialogbox.confirm({
      title: null,
      content: (
        <View style={styles.modelBox}>
          <View style={styles.modelTilteBox}>
            <Icon
              name="jinggao"
              size={20}
              color="#ff9911"
              style={styles.tipIcon}
            />
            <Text style={styles.modelTilte}>是否添加一条跟进记录?</Text>
          </View>
        </View>
      ),
      cancel: {
        text: '否',
        style: {
          color: '#3a3a3a',
          fontSize: 14,
        },
        callback: () => {
          this.dialogbox.close();
          // this.callCustomer(item);
        },
      },
      ok: {
        text: '是',
        style: {
          color: '#ffa200',
          fontSize: 14,
        },
        callback: () => {
          this.dialogbox.close();
          this.addFollowUpRecord(item, child);
          // this.callCustomer(item);
        },
      },
    });
  }

  renderItem(item) {
    return (
      <RenderItem item={item} navigation={this.props.navigation} parent={this} />
    );
  }

  render() {
    const bar = this.getBar();
    return (
      <View style={[styles.customerContainer, { flex: 1, flexDirection: 'column-reverse', justifyContent: 'flex-end' }]}>
        <UltimateListView
          onFetch={this.onFetch}
          getItemLayout={(data, index) => ({ length: 132, offset: 132 * index, index })}
          ref={(ref) => { this.listView = ref; }}
          keyExtractor={(item, index) => index}
          refreshable={false}
          item={this.renderItem}
          numColumns={1}
          pagination
          paginationFetchingView={() => (
            <View style={styles.center}>
              <StatusView status={this.state.status} />
              <Text style={{ color: '#7e7e7e', marginLeft: 10, fontSize: 14 }}>加载中</Text>
            </View>
          )}
          paginationAllLoadedView={() => (
            <View style={[styles.customerCount, { backgroundColor: '#f5f5f9', borderBottomWidth: 0 }]}>
              <Text style={{ color: '#7e7e7e' }}>没有更多数据了</Text>
            </View>
          )}
          paginationWaitingView={() => (<StatusView status={this.state.status} />)}
        />

        <View style={styles.sortContainer} ref={(c) => { this.sortContainer = c; }}>
          <TouchableOpacity
            style={styles.sortItem}
            onPress={() => {
              this.params.orderByField = 'createTime';
              this.params.orderByType = 'desc';
              this.refreshAndHideSort();
              UMNative.onEvent('XF-CustomerList-Sort');
            }}
          >
            <Text style={styles.sortText}>添加时间由近到远</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sortItem}
            onPress={() => {
              this.params.orderByField = 'createTime';
              this.params.orderByType = 'asc';
              this.refreshAndHideSort();
              UMNative.onEvent('XF-CustomerList-Sort');
            }}
          >
            <Text style={styles.sortText}>添加时间由远到近</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sortItem}
            onPress={() => {
              this.params.orderByField = 'lastFollowDate';
              this.params.orderByType = 'desc';
              this.refreshAndHideSort();
              UMNative.onEvent('XF-CustomerList-Sort');
            }}
          >
            <Text style={styles.sortText}>跟进时间由近到远</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sortItem}
            onPress={() => {
              this.params.orderByField = 'lastFollowDate';
              this.params.orderByType = 'asc';
              this.refreshAndHideSort();
              UMNative.onEvent('XF-CustomerList-Sort');
            }}
          >
            <Text style={styles.sortText}>跟进时间由远到近</Text>
          </TouchableOpacity>
        </View>

        {/*  排序按钮 */}
        <TouchableOpacity
          style={styles.cicleButton}
          ref={(c) => { this.sortButton = c; }}
          onPress={() => this.toggleSortContainer(this)}
        >
          <Icon name="shengxujiangxu" size={16} color="#fff" />
          <Text style={{ color: '#fff' }}>排序</Text>
        </TouchableOpacity>

        <View style={styles.redPointTip} >
          <View style={styles.redPoint} />
          <View>
            <Text style={[baseStyles.colorA8, baseStyles.fz10]}>
              表示当天分配且未联系的客户，
              <Text style={baseStyles.colorA3a}>
                24点
              </Text>
              前无联系则收回，请及时联系
            </Text>
          </View>
        </View>

        <View style={styles.customerCount}>
          <Text style={{ color: '#7e7e7e' }}>当前私客人数：</Text>
          {
            !this.state.isLoading ? <Text>{this.state.recordCount}人</Text> : null
          }
        </View>


        <FilterBar items={bar} emitName="queryCustomer" />

        <DialogBox ref={(dialogbox) => { this.dialogbox = dialogbox; }} />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  customerContainer: {
    width: screen.width,
    height: screen.height,
    backgroundColor: '#f5f5f9',
  },
  customerCount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: screen.width,
    height: 40,
    backgroundColor: '#fff',
    borderBottomColor: '#dedfe0',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: screen.height - 200,
  },
  sortContainer: {
    justifyContent: 'center',
    position: 'absolute',
    bottom: 100,
    right: -999,
    width: 165,
    height: 165,
    backgroundColor: '#f0f0f0',
    borderColor: '#dedfe0',
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
  },
  sortItem: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 41,
    borderBottomColor: '#dedfe0',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sortText: {
    color: '#7e7e7e',
    fontSize: 16,
  },
  cicleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    right: -999,
    width: 48,
    height: 48,
    backgroundColor: '#616161',
    borderColor: '#616161',
    borderRadius: 25,
    borderWidth: (Platform.OS === 'ios' ? 1.0 : 1.5) / PixelRatio.get(),
  },
  redPointTip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  redPoint: {
    width: 8,
    height: 8,
    marginHorizontal: 5,
    backgroundColor: '#ff0101',
    borderRadius: 4,
  },
  modelBox: {
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  tipIcon: {
    width: 34,
  },
  modelTilteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  modelTilte: {
    fontSize: 16,
    color: '#3a3a3a',
  },
});
