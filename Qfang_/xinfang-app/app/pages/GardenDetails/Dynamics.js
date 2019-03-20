//动态详情页
import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ListView,
  FlatList,
  Button,
  TouchableOpacity,
  ScrollView,
  InteractionManager,
} from 'react-native';

import axios from 'axios';

import Icon from '../../components/Icon/';
import detailStyles from './detail.styles';
// 最新一条动态和动态标题
class Dynamics extends PureComponent {
  constructor() {
    super();

    this.state = {
      dynamicData: {}
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.requestData.bind(this));
  }

  requestData() {
    const { params } = this.props.navigation.state;
    axios.get('garden/newDynamic', { params: { expandId: params.id } })
      .then((res) => {
        if (res.data.status != 'C0000') {
          return;
        }
        this.setState({
          dynamicData: res.data.result
        });
      });
  }


  render() {
    const navigation = this.props.navigation;
    if (!this.state.dynamicData) {
      return null;
    }
    return (
      <View>
        {/*动态*/}
        <View style={detailStyles.block}>
          <TouchableOpacity onPress={() => navigation.navigate('DynamicsListDetail', { id: navigation.state.params.id })}>
            <View style={detailStyles.inner}>
              <View style={detailStyles.flexContainer}>
                <View >
                  <Text style={detailStyles.titletxt}>
                    楼盘动态
                  </Text>
                </View>
                <View >
                  <Text style={[detailStyles.orange, detailStyles.rslink]}>
                    <Icon name="arrow-right" size={16} color="#a8a8a8" />
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('DynamicsDetail', { id: this.state.dynamicData.id })}>
            <View style={[detailStyles.flexContainer, detailStyles.borderTop]}>
              <View style={{ flex: 1 }} >
                <Text style={[detailStyles.lists, detailStyles.c3a3a3a, detailStyles.f14]} numberOfLines={1}>
                  {this.state.dynamicData.title}
                </Text>
              </View>
              <View>
                <Text style={[detailStyles.lists, detailStyles.f12]}>{this.state.dynamicData.createTime && this.state.dynamicData.createTime.substring(0, 10)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {/*动态*/}
      </View>
    );
  }
}

export default Dynamics;
