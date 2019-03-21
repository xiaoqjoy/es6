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
  StyleSheet,
  View,
} from 'react-native';
import axios from 'axios';
import SearchView from '../../components/SearchView/SearchView';
import DialogBox from '../../components/react-native-dialogbox';
import { QFReactHelper, UMNative } from '../../common/NativeHelper';
import Icon from '../../components/Icon/';

export default class AgentSearch extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  // 分客
  passCustomer(item) {
    const { params } = this.props.navigation.state;
    axios.get('customer/private/store/transfer', {
      params: {
        customerPrivateId: params.customerPrivateId,
        attributionBrokerInternalId: item.id,
        customerPrivateName: item.name,
      },
    }).then((res) => {
      if (res.data.status === 'C0000') {
        QFReactHelper.show('分客成功', 2);
        this.dialogbox.close();
        DeviceEventEmitter.emit('customerListRefresh');
        setTimeout(() => {
          this.props.navigation.navigate('CustomerList');
        }, 1500);
      } else {
        QFReactHelper.show(res.data.message, 3);
      }
    }).catch((error) => {
      console.log('error=', error);
      QFReactHelper.show('服务器异常', 3);
    });
  }
  // 弹窗提示 是否进行分客
  passDialog(data) {
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
            <Text style={styles.modelTilte}>确定分配线索给{data.name}?</Text>
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
          this.passCustomer(data);
        },
      },
    });
  }

  _renderItem(item) {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        underlayColor="#fff"
        onPress={() => {
                this.passDialog(item);
            }}
      >
        <View style={styles.contentLine}>
          <Text style={styles.txt}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchView
          placeholderText="请输入经纪人姓名"
          url="customer/private/store/queryEmployees"
          historyKey="agentList"
          renderItem={this._renderItem.bind(this)}
          transform={(data) => {
            let items = [];
            if (data.result.length > 0) {
              items = data.result;
            }
            return items;
          }}
          {...this.props}
        />
        <DialogBox ref={(dialogbox) => { this.dialogbox = dialogbox; }} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentLine: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    height: 50,
    paddingLeft: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e7e8ea',
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
  txt: {
    fontSize: 16,
  },
});
