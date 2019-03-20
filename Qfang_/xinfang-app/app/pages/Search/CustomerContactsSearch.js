/**
 * qfang.com xinfang
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { PureComponent } from 'react';
import {
  DeviceEventEmitter,
  Keyboard,
  TouchableOpacity,
} from 'react-native';

import SearchView from '../../components/SearchView/SearchView';

// import styles from '../../components/SearchView/Search.style';

import { screen, system } from '../../utils';

import CustomerContactItem from '../ReportContacts/CustomerContactItem';

class CustomerContactsSearch extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }
  // onSelect(item) {
  //   Keyboard.dismiss();
  //   global.requestAnimationFrame(() => {
  //     this.props.navigation.navigate('CustomerDetails', {
  //       customerId: item.customerId,
  //       id: item.id,
  //       phone: item.phone,
  //     });
  //   });
  // }
  renderItem(item) {
    return (
      <TouchableOpacity
        style={{ backgroundColor: '#fff', marginTop: 10 }}
        onPress={() => {
          Keyboard.dismiss();
          DeviceEventEmitter.emit('chooseReportContact', {
            customerName: item.contactNames,
            customerPhone: item.contactMobiles,
            customerId: item.customerId,
            id: item.id,
          });
          this.props.navigation.navigate('AddReport');
        }}
      >
        <CustomerContactItem item={item} />
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <SearchView
        listStyle={customerStyle.listStyle}
        placeholderText="请输入姓名/手机号"
        url="customer/private/fuzzySearch"
        renderItem={this.renderItem}
        // onSelect={() => this.onSelect}
        transform={(data) => {
          let items = [];
          if (data.result.items) {
            items = data.result.items;
          }

          return items;
        }}
        {...this.props}
      />
    );
  }
}

let customerStyle = {
  listStyle: {
    width: screen.width,
    height: screen.height - 60,
    backgroundColor: '#f5f5f9',
  },
};

export default CustomerContactsSearch;
