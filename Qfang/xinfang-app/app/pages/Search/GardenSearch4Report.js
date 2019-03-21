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
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }
  _onSelect(item) {
    // 作为选择项回传数据到添回客户页
    requestAnimationFrame(() => {
      DeviceEventEmitter.emit('filterChoose', { field: 'reportGarden', item: item });
      this.props.navigation.goBack();
    });
  }

  render() {
    return (
      <SearchView
        itemKey="id"
        itemValue="name"
        placeholderText="请输入城市/楼盘名称"
        url="garden/queryGarden"
        historyKey="gardenList4Report"
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
