/**
 * qfang.com xinfang
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { PureComponent } from 'react';
import {
  Text,
  DeviceEventEmitter,
  TouchableOpacity,
  Keyboard,
} from 'react-native';

import SearchView from '../../components/SearchView/SearchView';

import styles from '../../components/SearchView/Search.style';

class GardenSearch extends PureComponent {
  static navigationOptions = {
    header: null
  };

  _renderItem(item) {
    return (
      <TouchableOpacity style={styles.itemRow} onPress={() => { this._onSelect(item) }}>
        <Text style={styles.itemText} numberOfLines={1}>
          {item.gardenName} ({item.cityName})
        </Text>
      </TouchableOpacity>
    );
  }

  _onSelect(item) {
    Keyboard.dismiss();
    // 跳转楼盘详情页
    requestAnimationFrame(() => {
      this.props.navigation.navigate('GardenDetails', {
        id: item.expandId,
        name: item.gardenName
      });
    });
  }

  render() {
    return (
      <SearchView
        itemKey="expandId"
        itemValue="gardenName"
        placeholderText="请输入楼盘名称"
        url="garden/autoGardenSearch"
        historyKey="gardenList"
        renderItem={this._renderItem.bind(this)}
        onSelect={this._onSelect.bind(this)}
        transform={(data) => {
          let items = [];
          if (data.result.length > 0) {
            items = data.result;
          }
          console.log('items=', items);
          return items;
        }}
        {...this.props}
      />
    );
  }
}

export default GardenSearch;
