import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
  Platform,
  DeviceEventEmitter,
  NativeEventEmitter,
  InteractionManager,
} from 'react-native';

import axios from 'axios';

import UserInfo from '../../common/UserInfo';
import { QFReactHelper, UMNative } from '../../common/NativeHelper';

import RenderItem from '../../components/RenderItem';
import Icon from '../../components/Icon/';
import baseStyles from '../../components/baseStyles';

class NewGarden extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();

    this.state = {
      newGarden: [],
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.requestData.bind(this));

    this.subRefresh = DeviceEventEmitter.addListener('refresh', this.requestData.bind(this));

    try {
      // 监听原生 APP 中的设置中是否切换了显示佣金比例和现金奖的开关，若是，则更新 UserInfo
      const myNativeEmitter = new NativeEventEmitter(QFReactHelper);
      this.subConfigChange = myNativeEmitter.addListener('configchange', (data) => {
        UserInfo.commissionRate = data.commissionRate;
        UserInfo.reward = data.reward;

        InteractionManager.runAfterInteractions(this.requestData.bind(this));
      });
    } catch (e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    this.subRefresh.remove();
    this.subConfigChange && this.subConfigChange.remove();
  }

  requestData() {
    // 新楼盘数据
    axios.get('index/newGarden')
      .then((res) => {
        if (res.data.status == 'C0000') {
          this.setState({
            newGarden: res.data.result,
          });
        }
      }).catch(() => {
        QFReactHelper.show('服务器开小差了~', 5);
      });
  }

  _renderItem(data) {
    return (
      <View style={{ paddingLeft: 5 }}>
        <RenderItem
          item={data.item}
          navigation={this.props.navigation}
          onAfterSelect={
          () => {
            UMNative.onEvent('XF-ExternalHome-NewGarden');
          }
        }
          showCommission={UserInfo.commissionRate}
        />
      </View>
    );
  }

  render() {
    const { newGarden } = this.state;
    if (newGarden.length === 0) {
      return null;
    }

    return (
      <View style={styles.newEstateBox}>
        <View style={styles.newTitle}>
          <View><Text style={baseStyles.fz18}>新上盘</Text></View>
          <View style={styles.newTips}><Text style={[baseStyles.fz12, baseStyles.colorF91]}>new</Text></View>
        </View>
        <FlatList
          data={newGarden}
          renderItem={this._renderItem.bind(this)}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  newEstateBox: {
    backgroundColor: '#fff',
    paddingLeft: 15,
    marginBottom: 50,
  },

  newTitle: {
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
  },

  newTips: {
    marginLeft: 2,
    marginTop: -6,
  },
});
export default NewGarden;
