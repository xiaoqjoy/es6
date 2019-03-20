import React, { PureComponent } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  InteractionManager,
} from 'react-native';

import axios from 'axios';
import baseStyles from '../../components/baseStyles';

import StatusView from '../../components/StatusView';
import { toThousands } from '../../utils/tool';

import { system } from '../../utils/';

import { QFReactHelper, UMNative } from '../../common/NativeHelper';

export default class Deal extends PureComponent {
  state = {
    dataSource: {},
  }

  componentDidMount() {
    this.onRefresh();
  }


  onRefresh() {
    InteractionManager.runAfterInteractions(this.requestData.bind(this));
  }

  requestData() {
    axios.get('customer/private/dealLog', {
      params: this.props.params,
    }).then((res) => {
      if (res.data.status === 'C0000') {
        this.setState({
          dataSource: res.data.result.items,
          isRefreshing: false,
          status: res.data.result.length ? '' : 'no-data-found',
        });
        UMNative.onEvent('XF-Customer-DealRecord');
      } else {
        this.setState({
          dataSource: [],
          isRefreshing: false,
          status: 'request-failed',
        });
      }
    }).catch((error) => {
      console.log('error=', error);

      this.setState({
        dataSource: [],
        isRefreshing: false,
        status: 'network-error',
      });
    });
  }


  _renderItem(data) {
    const Item = data.item;
    Item.dealTime = Item.dealTime.slice(0, Item.dealTime.indexOf(' ') + 1);
    return (
      <View style={styles.listStyle}>
        <View style={styles.listCont}>
          <View style={{ flexDirection: 'row', flex: 7, marginRight: 5 }}>
            {/* <Text style={[baseStyles.colorA8, baseStyles.fz14]}>成交楼盘：</Text> */}
            <Text style={[baseStyles.colorA3a, baseStyles.fz16, baseStyles.ftBold]}>{Item.gardenName || ''}</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={[baseStyles.colorA8, baseStyles.fz14]}>{Item.dealTime || ''}</Text>
          </View>
        </View>
        <View style={[styles.dealDetais]}>
          <View style={styles.dealPrice}>
            <View style={styles.dealPriceLine}>
              <Text style={[baseStyles.colorA8, baseStyles.fz14]}>成交价格：</Text>
              <Text style={[baseStyles.colorA3a, baseStyles.fz14]}>{toThousands(Item.price || '')}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[baseStyles.colorA8, baseStyles.fz14, { flex: 1 }]}>户型：</Text>
              <Text style={[baseStyles.colorA3a, baseStyles.fz14, { flex: 1 }]}>{Item.doorModel || ''}</Text>
            </View>
          </View>
          <View>
            <View style={styles.dealPriceLine}>
              <Text style={[baseStyles.colorA8, baseStyles.fz14]}>经纪人：</Text>
              <Text style={[baseStyles.colorA3a, baseStyles.fz14]}>{Item.employee || ''}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[baseStyles.colorA8, baseStyles.fz14, { flex: 1 }]}>面积：</Text>
              <Text style={[baseStyles.colorA3a, baseStyles.fz14, { flex: 1 }]}>{Item.area || ''}㎡</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View>
        {
          this.state.dataSource.length ?
            <FlatList
              initialListSize={4}
              data={this.state.dataSource}
              renderItem={this._renderItem.bind(this)}
              keyExtractor={(item, index) => index}
              refreshControl={
                <RefreshControl
                  tintColor="#ccc"
                  refreshing={this.state.isRefreshing}
                  onRefresh={this.onRefresh.bind(this)}
                  enabled
                />
              }
            />
            : <StatusView status={this.state.status} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  followUpDateTip: {
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
  },

  listStyle: {
    paddingLeft: 15,
    paddingRight: 15,
    height: 140,
    // marginTop: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },

  listCont: {
    height: 55,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#e7e8ea',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  dealDetais: {
    flexDirection: 'row',
  },

  dealPriceLine: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
  },

  dealPrice: {
    height: 78,
    paddingRight: 20,
    marginRight: 20,
    borderRightColor: '#e7e8ea',
    borderRightWidth: StyleSheet.hairlineWidth,
  },
});
