import React, { PureComponent } from 'react';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  InteractionManager,
  DeviceEventEmitter,
} from 'react-native';

import axios from 'axios';

import UserInfo from '../../common/UserInfo';
import { QFReactHelper, UMNative } from '../../common/NativeHelper';

import Icon from '../../components/Icon/';

import RenderItem from '../../components/RenderItem';

import baseStyles from '../../components/baseStyles';

import detailStyles from './detail.styles';
//  附近楼盘
class AroundGarden extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(this.requestData.bind(this));
    this.refeshDataListener = DeviceEventEmitter.addListener('refeshSgarden', (data) => { this.requestData(data); });
  }

  componentWillUnmount() {
    this.refeshDataListener.remove();
  }

  requestData(data) {
    const expandId = data || this.props.navigation.state.params.id;
    axios.get('garden/queryNearByGardens', { params: { expandId, source: 'APP' } })
      .then((res) => {
        if (res.data.status !== 'C0000') {
          return;
        }
        this.setState({
          dataSource: res.data.result,
        });
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
            UMNative.onEvent('XF-GardenDetails-SurroundingGarden');
          }
        }
          showCommission={UserInfo.commissionRate}
        />
      </View>
    );
  }

  render() {
    if (this.state.dataSource.length === 0) {
      return null;
    }
    return (
      <View style={detailStyles.block}>
        <View style={[detailStyles.inner]}>
          <Text style={detailStyles.titletxt}>
            附近楼盘
          </Text>
        </View>
        <FlatList
          initialListSize={4}
          data={this.state.dataSource}
          renderItem={this._renderItem.bind(this)}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

export default AroundGarden;
