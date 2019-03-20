// 动态详情页
import React, { PureComponent } from 'react';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  WebView,
  InteractionManager,
} from 'react-native';

import axios from 'axios';

import Icon from '../../components/Icon/';

import detailStyles from './detail.styles';

import GoBack from '../../components/GoBack';
// 请求异常组件
import StatusView from '../../components/StatusView';
// 卖点
class SellPoint extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.titleName,
    headerLeft: (<GoBack navigation={navigation} />),
    headerRight: <Text />,
  });

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { params } = this.props.navigation.state;
    if (params.curStatus) {
      return <StatusView status={params.curStatus} />;
    }
    return (
      <ScrollView style={[detailStyles.block, { marginBottom: 0 }]}>
        <View style={{ paddingTop: 15, paddingBottom: 15 }} >
          <View style={[{ paddingRight: 15 }]}>
            <Text style={[styles.pointTxt]} >
              {params.curData}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  pointTxt: {
    lineHeight: 22,
    fontSize: 14,
    color: '#3a3a3a',
  },
});

export default SellPoint;
