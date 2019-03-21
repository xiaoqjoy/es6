import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  DeviceEventEmitter,
  TouchableOpacity,
} from 'react-native';

import UltimateListView from 'react-native-ultimate-listview';

import axios from 'axios';

import StatusView from '../../components/StatusView';

import CustomerContactItem from './CustomerContactItem';
import baseStyles from '../../components/baseStyles';
import { screen } from '../../utils';

export default class CustomerContacts extends PureComponent {
  constructor(props) {
    super(props);

    this.params = { page: 1 };
    this.onFetch = this.onFetch.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }

  async onFetch(page, startFetch, abortFetch) {
    try {
      this.params.page = page || 1;
      const res = await this.requestData();

      startFetch(res.items, 15);
    } catch (err) {
      abortFetch();
      console.log(err);
    }
  }

  requestData() {
    return axios.get('customer/private/fuzzySearch', {
      params: this.params || {},
    })
      .then((res) => {
        if (res.data.status === 'C0000') {
          const { items = [] } = res.data.result;
          if (items && items.lenght) {
            return { items };
          }

          this.setState({
            status: 'no-data-found',
          });

          return { items };
        }

        this.setState({
          status: 'request-failed',
        });

        return { items: [] };
      }).catch((error) => {
        console.log('error=', error);
        this.setState({
          status: 'network-error',
        });
        return { items: [] };
      });
  }

  renderItem(item) {
    // const arr = item.name.split(',');
    return (
      <TouchableOpacity
        style={{ backgroundColor: '#fff', marginTop: 10 }}
        onPress={() => {
          DeviceEventEmitter.emit(this.props.emitName, {
            customerName: item.contactNames,
            customerPhone: item.contactMobiles,
            customerId: item.customerId,
            id: item.id,
          });
          this.props.navigation.goBack();
        }}
      >
        <CustomerContactItem item={item} />
      </TouchableOpacity>
    );
  }


  render() {
    return (
      <View style={[baseStyles.container]}>
        <UltimateListView
          onFetch={this.onFetch}
          ref={(ref) => { this.listView = ref; }}
          keyExtractor={(item, index) => index}
          refreshable={false}
          item={this.renderItem}
          numColumns={1}
          pagination
          paginationFetchingView={() => (
            <View style={styles.center}>
              <StatusView />
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: '#dedede',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
  },
  photo: {
    width: 50,
    height: 50,
    marginRight: 30,
    borderRadius: 25,
  },
  btn: {
    marginTop: 10,
    marginBottom: 10,
  },
  customerCount: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
});
