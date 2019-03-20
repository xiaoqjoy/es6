import React, { PureComponent } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  RefreshControl,
  InteractionManager,
} from 'react-native';

import axios from 'axios';

import baseStyles from '../../components/baseStyles';
import StatusView from '../../components/StatusView';
import TransationReport from './TransactionReport';

class MyDeal extends PureComponent {
  constructor() {
    super();

    this.state = {
      filtersTabType: 'all',
      isRefreshing: true,
      dataSource: [],
      status: '',
    };
  }

  filtersChangeTab(option) {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        filtersTabType: option.type,
        status: '',
      });

      this.requestData();
    });
  }

  componentDidMount() {
    this._onRefresh();
  }

  _onRefresh() {
    InteractionManager.runAfterInteractions(this.requestData.bind(this));
  }

  requestData() {
    axios.get('distribution/personal/deals', {
      params: {
        status: this.state.filtersTabType == 'all' ? '' : this.state.filtersTabType,
      },
    }).then((res) => {
      if (res.data.status == 'C0000') {
        this.setState({
          dataSource: res.data.result,
          isRefreshing: false,
          status: res.data.result.length ? '' : 'no-data-found',
        });
      } else {
        this.setState({
          dataSource: [],
          isRefreshing: false,
          status: 'request-failed',
        });
      }
    }).catch((err) => {
      this.setState({
        dataSource: [],
        isRefreshing: false,
        status: 'network-error',
      });
    });
  }

  _renderItem(data) {
    const dealItem = data.item;
    let statusStyleName = null;
    const { navigate } = this.props.navigation;

    // 根据状态来选择字体颜色
    const changeStyleName = {
      BARGAIN_NON_PAIED: 'colorEa5',
      BARGAIN_PAIED: 'colorA95',
      BARGAIN_PART_PAIED: 'colorAfe',
      BARGAIN_CANCEL: 'colorA8',
    };
    if (dealItem.status in changeStyleName) {
      statusStyleName = changeStyleName[dealItem.status];
    }

    dealItem.bargainTime = dealItem.bargainTime.slice(0, dealItem.bargainTime.indexOf(' ') + 1);

    return (
      <TouchableOpacity style={[styles.DealItemView]} onPress={() => navigate('Distribution-TransactionReport', { id: dealItem.id })} >
        <View style={styles.DealList}>
          <View style={[styles.DealListLi, styles.DealListLiStart]}>
            <Text style={[baseStyles.colorA8, baseStyles.fz16]}>成交楼盘：</Text>
            <Text style={[baseStyles.colorA3a, baseStyles.fz16]}>{dealItem.gardenName || ''}</Text>
          </View>
          <View style={[styles.DealListLi, styles.DealListLiEnd]}>
            <Text style={[
              baseStyles.fz14,
              statusStyleName ? baseStyles[statusStyleName] : '',
            ]}
            >{dealItem.statusDesc || ''}
            </Text>
          </View>
        </View>
        <View style={styles.DealList}>
          <View style={[styles.DealListLi, styles.DealListLiStart]}>
            <Text style={[baseStyles.colorA8, baseStyles.fz16]}>应结佣金：</Text>
            <Text style={[baseStyles.colorA3a, baseStyles.fz16]}>{dealItem.totalCommission || ''}</Text>
          </View>
        </View>
        <View style={[styles.DealList, styles.DealListLast]}>
          <View style={[styles.DealListLi, styles.DealListLiStart]}>
            <Text style={[baseStyles.colorA8, baseStyles.fz16]}>已结佣金：</Text>
            <Text style={[baseStyles.colorA3a, baseStyles.fz16]}>{dealItem.paidCommission || ''}</Text>
          </View>
          <View style={[styles.DealListLi, styles.DealListLiEnd]}><Text style={[baseStyles.fz14, baseStyles.colorA8]}>{dealItem.bargainTime}</Text></View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={[baseStyles.container]}>
        <View style={[baseStyles.rowCenter, styles.filterTab]}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#f9f9f9"
            style={[styles.filtersItem, this.state.filtersTabType == 'all' ? styles.filtersItemCur : '']}
            onPress={this.filtersChangeTab.bind(this, { type: 'all' })}
          >
            <Text style={[baseStyles.colorA8, baseStyles.fz14, this.state.filtersTabType == 'all' ? styles.filtersTextCur : '']}>全部</Text>
          </TouchableHighlight>

          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#f9f9f9"
            style={[styles.filtersItem, this.state.filtersTabType == 'BARGAIN_NON_PAIED' ? styles.filtersItemCur : '']}
            onPress={this.filtersChangeTab.bind(this, { type: 'BARGAIN_NON_PAIED' })}
          >
            <Text style={[baseStyles.colorA8, baseStyles.fz14, this.state.filtersTabType == 'BARGAIN_NON_PAIED' ? styles.filtersTextCur : '']}>待结算</Text>
          </TouchableHighlight>

          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#f9f9f9"
            style={[styles.filtersItem, this.state.filtersTabType == 'BARGAIN_PART_PAIED' ? styles.filtersItemCur : '', { flex: 1.4 }]}
            onPress={this.filtersChangeTab.bind(this, { type: 'BARGAIN_PART_PAIED' })}
          >
            <Text style={[baseStyles.colorA8, baseStyles.fz14, this.state.filtersTabType == 'BARGAIN_PART_PAIED' ? styles.filtersTextCur : '']}>部分结算</Text>
          </TouchableHighlight>

          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#f9f9f9"
            style={[styles.filtersItem, this.state.filtersTabType == 'BARGAIN_PAIED' ? styles.filtersItemCur : '']}
            onPress={this.filtersChangeTab.bind(this, { type: 'BARGAIN_PAIED' })}
          >
            <Text style={[baseStyles.colorA8, baseStyles.fz14, this.state.filtersTabType == 'BARGAIN_PAIED' ? styles.filtersTextCur : '']}>已结算</Text>
          </TouchableHighlight>

          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#f9f9f9"
            style={[styles.filtersItem, this.state.filtersTabType == 'BARGAIN_CANCEL' ? styles.filtersItemCur : '']}
            onPress={this.filtersChangeTab.bind(this, { type: 'BARGAIN_CANCEL' })}
          >
            <Text style={[baseStyles.colorA8, baseStyles.fz14, this.state.filtersTabType == 'BARGAIN_CANCEL' ? styles.filtersTextCur : '']}>已撤单</Text>
          </TouchableHighlight>
        </View>
        {this.state.dataSource.length ?
          <FlatList
            style={styles.listStyle}
            initialListSize={4}
            data={this.state.dataSource}
            renderItem={this._renderItem.bind(this)}
            keyExtractor={(item, index) => index}
            refreshControl={
              <RefreshControl
                tintColor="#ccc"
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh.bind(this)}
                enabled
              />
            }
          />
          : <StatusView status={this.state.status} />}
      </View >
    );
  }
}

const styles = StyleSheet.create({
  filterTab: {
    height: 44,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dedfe0',
  },

  filtersItem: {
    flex: 1,
    height: 43,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#f9f9f9',
    borderRightColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  filtersItemCur: {
    height: 45,
    backgroundColor: '#fff',
    borderBottomColor: '#fff',
    borderLeftColor: '#dedfe0',
    borderRightColor: '#dedfe0',
  },

  filtersTextCur: {
    color: '#ffa200',
  },

  DealItemView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: 8,
  },

  DealList: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginLeft: 15,
  },

  DealListLast: {
    borderBottomWidth: 0,
  },

  DealListLi: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 25,
  },

  DealListLiStart: {
    flex: 6.5,
    justifyContent: 'flex-start',
  },

  DealListLiEnd: {
    flex: 3.5,
    justifyContent: 'flex-end',
  },

  transactionReport: {
    flex: 2.5,
    height: 33,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f1f1f1',
    marginRight: 15,
    paddingRight: 0,
    shadowColor: '#ccc',
    shadowOpacity: 0.8,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
});

export default MyDeal;
