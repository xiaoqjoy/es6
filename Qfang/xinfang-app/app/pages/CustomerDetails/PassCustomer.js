import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';

import axios from 'axios';
import UltimateListView from 'react-native-ultimate-listview';
import StatusView from '../../components/StatusView';
import GoBack from '../../components/GoBack';
import { QFReactHelper } from '../../common/NativeHelper';
import DialogBox from '../../components/react-native-dialogbox';
import Icon from '../../components/Icon/';

import { system, screen } from '../../utils';

export default class passCustomer extends PureComponent {
    static navigationOptions = ({ navigation }) => ({
      title: '选择经纪人',
      headerLeft: (<GoBack navigation={navigation} onBackPress={() => navigation.goBack()} />),
      headerRight: (
        <View style={styles.search}>
          <TouchableOpacity
            onPress={() => {
              global.requestAnimationFrame(() => {
                navigation.navigate('AgentSearch', {
                  customerPrivateId: navigation.state.params.id,
                });
              });
            }}
          >
            <Icon style={{ marginRight: 20 }} name="magnifier" size={20} color="#7e7e7e" />
          </TouchableOpacity>
        </View>
      ),
    });
    constructor(props) {
      super(props);
      this.params = { page: 1 };
      this.onFetch = this.onFetch.bind(this);
      this.renderItem = this.renderItem.bind(this);
      this.onRefresh = this.onRefresh.bind(this);
    }

    async onFetch(page = 1, startFetch, abortFetch) {
      try {
        this.params.page = page;
        const res = await this.requestData();
        startFetch(res, 10);
      } catch (err) {
        abortFetch();
        console.log(err);
      }
    }

    onRefresh() {
      this.onFetch();
    }

    requestData() {
      return axios.get('customer/private/store/queryEmployees', { params: this.params || {} })
        .then((res) => {
          if (res.data.status === 'C0000') {
            return res.data.result;
          }
          return { items: [] };
        }).catch((error) => {
          console.log('error=', error);
          return { items: [] };
        });
    }
    // 分客
    passCustomer(item) {
      const { params } = this.props.navigation.state;
      axios.get('customer/private/store/transfer', {
        params: {
          customerPrivateId: params.id,
          attributionBrokerInternalId: item.id,
          customerPrivateName: params.name,
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
          text: ' 取消',
          style: {
            color: '#3a3a3a',
            fontSize: 14,
          },
          callback: () => {
            this.dialogbox.close();
          },
        },
        ok: {
          text: '确认',
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

    renderItem(item) {
      return (
        <TouchableOpacity
          activeOpacity={0.6}
          underlayColor="#fff"
          onPress={() => {
                this.passDialog(item);
            }}
        >
          <View style={styles.contentLine}>
            <Text>{item.name}</Text>
          </View>
        </TouchableOpacity>
      );
    }

    render() {
      return (
        <View style={styles.newEstateBox}>
          <UltimateListView
            style={system.isIOS ? { marginTop: 5 } : { marginTop: 3 }}
            onFetch={this.onFetch}
            ref={(ref) => { this.listView = ref; }}
            keyExtractor={(item, index) => index}
            refreshable
            item={this.renderItem}
            numColumns={1}
            pagination={false}
            autoPagination={false}
            paginationFetchingView={() => (
              <View style={styles.center}>
                <StatusView styles={{ backgroundColor: '#f6f5fa' }} />
                <Text style={{ color: '#7e7e7e', marginLeft: 10, fontSize: 14 }}>加载中</Text>
              </View>
          )}
            refreshControl={
              <RefreshControl
                tintColor="#ccc"
                refreshing={false}
                onRefresh={this.onRefresh}
              />
          }
            paginationAllLoadedView={() => (
              <View style={[styles.pageAllLoad]} />
          )}
            paginationWaitingView={() => (<StatusView />)}
          />
          <DialogBox ref={(dialogbox) => { this.dialogbox = dialogbox; }} />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  search: {
    width: 40,
    height: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newEstateBox: {
    paddingTop: 5,
    backgroundColor: '#f6f5fa',
    zIndex: 1,
    flex: 1,
  },
  center: {
    height: screen.height - 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentLine: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderTopColor: '#e7e8ea',
    height: 50,
    paddingLeft: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
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
