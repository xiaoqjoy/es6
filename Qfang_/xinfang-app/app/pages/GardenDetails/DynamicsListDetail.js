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

import { StackNavigator } from 'react-navigation';

import axios from 'axios';

import Icon from '../../components/Icon/';
import detailStyles from './detail.styles';

import GoBack from '../../components/GoBack';
// 请求异常组件
import StatusView from '../../components/StatusView';

class DynamicsListDetail extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: '楼盘动态',
    headerLeft: (<GoBack navigation={navigation} />)
  });

  constructor(props) {
    super(props);

    this.state = {
      dataSource: []
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.requestData.bind(this));
  }

  requestData() {
    const { params } = this.props.navigation.state;
    axios.get('garden/dynamic', { params: { expandId: params.id, pageSize: 50 } })
      .then((res) => {
        if (res.data.status !== 'C0000') {
          this.setState({
            status: 'request-failed'
          });
          return;
        }
        this.setState({
          dataSource: res.data.result.items,
          status: res.data.result.items.length ? '' : 'no-data-found'
        });
      }).catch((error) => {
        this.setState({
          status: 'network-error'
        });
      });
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.props.navigation.navigate('DynamicsDetail', { id: item.id })}>
      <View style={[detailStyles.mtblock]}>
        <View style={detailStyles.inner}>
          <Text style={[styles.dthead]}>
            {item.title}
          </Text>
          <Text style={[detailStyles.ca8a8a8, detailStyles.f12]}>
            {item.createTimeStr && item.createTimeStr.substring(0, 10)}
          </Text>
        </View>
        {/*<View style={[detailStyles.borderTop, detailStyles.inner]}>
          <Text style={[styles.dtmaintxt]} numberOfLines={2}>.....</Text>
        </View>*/}
      </View>
    </TouchableOpacity>
  );

  render() {
    const { navigate } = this.props.navigation;
    let length = this.state.dataSource.length;
    if (this.state.status) {
      return <StatusView status={this.state.status} />
    }
    return (
      <FlatList style={detailStyles.container}
        initialListSize={1}
        initialNumToRender={length}
        maxToRenderPerBatch={length}
        data={this.state.dataSource}
        renderItem={this._renderItem.bind(this)}
        keyExtractor={(item, index) => {
          return index;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  //公用
  dtmaintxt: {
    color: '#3a3a3a',
    fontSize: 14,
    lineHeight: 22
  },
  dthead: {
    fontSize: 18,
    color: '#3a3a3a',
    marginBottom: 5,
    fontWeight: 'bold'
  }
});

export default DynamicsListDetail;
