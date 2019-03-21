//动态详情页
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

import screen from '../../utils/screen';

import GoBack from '../../components/GoBack';
// 请求异常组件
import StatusView from '../../components/StatusView';

import system from '../../utils/system';

// webview 样式 和高度问题
class DynamicsListDetail extends PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: '楼盘动态',
    headerLeft: (<GoBack navigation={navigation} />)
  });

  constructor(props) {
    super(props);

    this.state = {
      dynamicDetail: {}
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.requestData.bind(this));
  }

  requestData() {
    const { params } = this.props.navigation.state;
    axios.get('garden/dynamic/detail', { params: { dynamicId: params.id } })
      .then((res) => {
        if (res.data.status !== 'C0000') {
          this.setState({
            status: 'request-failed'
          });
          return;
        }
        this.setState({
          dynamicDetail: res.data.result
        });
      }).catch((error) => {
        this.setState({
          status: 'network-error'
        });
      });
  }

  render() {
    if (this.state.status) {
      return <StatusView status={this.state.status} />
    }
    return (
      <ScrollView style={[detailStyles.block, { marginBottom: 0 }]}>
        <View style={[detailStyles.inner]}>
          <Text style={[styles.dthead]}>
            {this.state.dynamicDetail.title}
          </Text>
          <Text style={[detailStyles.ca8a8a8, detailStyles.f12]}>
            发布时间： {this.state.dynamicDetail.createTimeStr}
          </Text>
        </View>
        <View style={[detailStyles.borderToporange, detailStyles.inner]}>
          {/*<Text style={[styles.dtmaintxt]}>
           {this.state.dynamicDetail.content}
             </Text>*/}
          {/*需要自定义 source={{ html: this.state.dynamicDetail.content }}*/}
          {this.state.dynamicDetail.content ? <WebView
            scalesPageToFit={system.isIOS ? false : true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            style={[{ height: (screen.height - 200) }]}
            source={{ html: `<html><head><style>html,body{padding:0;margin:0;font-size:14px;color:#3a3a3a;line-height:1.4;}img{width:100%!important;height:auto}</style><body>${this.state.dynamicDetail.content}</body></html>` }}
          /> : null}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
