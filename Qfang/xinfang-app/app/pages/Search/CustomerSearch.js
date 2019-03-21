/**
 * qfang.com xinfang
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  DeviceEventEmitter,
  StyleSheet,
  Keyboard,
  Linking,
  Alert,
} from 'react-native';
import axios from 'axios';
import { QFReactHelper, UMNative } from '../../common/NativeHelper';

import SearchView from '../../components/SearchView/SearchView';


import { screen, system } from '../../utils';

import RenderItem from '../CustomerList/RenderItem';

import DialogBox from '../../components/react-native-dialogbox';
import Icon from '../../components/Icon/';

class CustomerSearch extends PureComponent {
  static navigationOptions = {
    header: null,
  };

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
        },
      },
    });
  }

  _renderItem(item) {
    return (
      <RenderItem
        ref={(c) => { this.renderItem = c; }}
        item={item}
        onSelect={() => { this._onSelect.call(this, item); }}
        parent={this}
      />
    );
  }

  _onSelect(item) {
    Keyboard.dismiss();
    requestAnimationFrame(() => {
      this.props.navigation.navigate('CustomerDetails', {
        customerId: item.customerId,
        id: item.id,
        phone: item.phone,
        eventName: this.renderItem.eventName,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchView

          itemValue="gardenName"
          placeholderText="请输入姓名/手机号"
          url="customer/private/list"
          historyKey="customerList"
          renderItem={this._renderItem.bind(this)}
          onSelect={this._onSelect.bind(this)}
          transform={(data) => {
              let items = [];
              if (data.result.items) {
                items = data.result.items;
              }
              console.log('items=', items);
              return items;
            }}
          {...this.props}
        />
        <DialogBox ref={(dialogbox) => { this.dialogbox = dialogbox; }} />
      </View>
    );
  }
}
let styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listStyle: {
    width: screen.width,
    height: screen.height - 60,
    backgroundColor: '#f5f5f9',
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

export default CustomerSearch;
