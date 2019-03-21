// 主要信息页
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

import Icon from '../../components/Icon/';

import detailStyles from './detail.styles';
// 调用原生app模块
import { QFReactHelper, UMNative } from '../../common/NativeHelper';

// 基本信息 从详情页取关注字段带过来 地图需和app联调
class BasicInfo extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      info: {},
      buildParams: {},
      expandId: '',
      status: '',
    };
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(this.requestData.bind(this));
    this.refeshDataListener = DeviceEventEmitter.addListener('refeshBasicInfo', (data) => { this.requestData(data); });
  }

  componentWillReceiveProps(props) {
    this.setState({
      info: props.info,
      expandId: props.expandId,
    });
  }
  componentWillUnmount() {
    this.refeshDataListener.remove();
  }


  requestData(data) {
    this.state.expandId = data || this.props.navigation.state.params.id;
    axios.get('garden/basicInformation', { params: { expandId: this.state.expandId } })
      .then((res) => {
        if (res.data.status !== 'C0000') {
          this.setState({
            status: 'request-failed',
          });
          return;
        }
        this.setState({
          buildParams: res.data.result,
        });
      }).catch(() => {
        this.setState({
          status: 'network-error',
        });
        QFReactHelper.show('服务器开小差了~', 5);
      });
  }

  // NEWHOUSE_MAP：title:楼盘名 longitude: 经纬度 latitude
  viewMap = () => {
    const basicInfo = this.state.info;
    const mapParams = {
      longitude: basicInfo.longitude,
      latitude: basicInfo.latitude,
      title: basicInfo.name,
      address: basicInfo.address,
    };
    QFReactHelper.showPage('NEWHOUSE_MAP', mapParams);
  }

  render() {
    const { navigation } = this.props;
    const { params } = this.props.navigation.state;
    const { info, buildParams } = this.state;
    const { status } = this.state;
    const distributionStartDate = info.distributionStartDate ? (info.distributionStartDate.split('-').join('.')) : null;
    const distributionEndDate = info.distributionEndDate ? (info.distributionEndDate.split('-').join('.')) : null;

    return (
      <View>
        <View style={detailStyles.block}>
          <View style={[detailStyles.textView, detailStyles.borderTop, { height: 80 }]}>
            <View style={{ height: 35, justifyContent: 'center', paddingTop: 20 }}>
              <Text style={{ fontSize: 18 }}>{params.name}</Text>
            </View>
            <View style={{ height: 35, justifyContent: 'center', paddingTop: 10 }}>
              <Text style={{ color: '#a8a8a8' }}>
                    均价：
                <Text style={[detailStyles.orange, detailStyles.f14]} >
                  {info.avgPrice ? `${info.avgPrice}元/㎡` : '均价待定'}
                  {
                        info.avgPriceMax !== 0 ?
                          <Text style={[detailStyles.titletip]}>
                            {`(${info.avgPriceMin}~${info.avgPriceMax}元/㎡)`}
                          </Text>
                          : null
                      }
                </Text>
              </Text>
            </View>
          </View>
          <View style={detailStyles.agentContent}>
            <View style={detailStyles.agentMain}>
              <View>
                <Text style={[detailStyles.txt, detailStyles.txtRight]}>合作经纪人</Text>
              </View>
              <View>
                <Text>{info.distributionNum}</Text>
              </View>
            </View>
            <View style={[detailStyles.agentMain,{paddingLeft:30}]}>
              <View>
                <Text style={[detailStyles.txt, detailStyles.txtRight]}>意向客户</Text>
              </View>
              <View>
                <Text>{info.intentUser}</Text>
              </View>
            </View>
          </View>
          {/* 地址和人数 */}
          <View style={detailStyles.borderTop}>
            <View style={[detailStyles.innerMargin, { position: 'relative', marginRight: 0 }]}>
              <View style={[detailStyles.flexRow, detailStyles.flexPadd]} >
                <View style={detailStyles.leftText}>
                  <Text style={detailStyles.txt}>分销时间</Text>
                </View>
                <View style={detailStyles.rightText}>
                  <Text style={detailStyles.subtxt}>{distributionStartDate || ''}-{distributionEndDate || ''}</Text>
                </View>
              </View>
              <View style={[detailStyles.flexRow, detailStyles.flexPadd]} >
                <View style={detailStyles.leftText}>
                  <Text style={detailStyles.txt}>开盘时间</Text>
                </View>
                <View style={detailStyles.rightText}>
                  <Text style={detailStyles.subtxt}>{info.openDate || '--'}</Text>
                </View>
              </View>
              <View style={[detailStyles.flexRow, detailStyles.flexPadd]} >
                <View style={detailStyles.leftText}>
                  <Text style={detailStyles.txt}>入住时间</Text>
                </View>
                <View style={detailStyles.rightText}>
                  <Text style={detailStyles.subtxt}>{info.liveDate || '--'}</Text>
                </View>
              </View>
              <View style={[detailStyles.flexRow, detailStyles.flexPadd]} >
                <View style={detailStyles.leftText}>
                  <Text style={detailStyles.txt}>预售证号</Text>
                </View>
                <View style={detailStyles.rightText}>
                  <Text style={detailStyles.subtxt} numberOfLines={1}>{info.preSaleLicence}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={this.viewMap}>
                <View style={[detailStyles.flexRow, detailStyles.flexPadd, { paddingBottom: 15 }]} >
                  <View style={detailStyles.leftText}>
                    <Text style={detailStyles.txt}>楼盘地址</Text>
                  </View>
                  <View style={detailStyles.rightText}>
                    <Text style={[detailStyles.address, { color: '#00afec' }]} numberOfLines={1}>{info.address}</Text>
                    <Icon style={{ position: 'absolute', right: 0, top: 2 }} name="mendianjuli" size={15} color="#00afec" />
                  </View>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={this.viewMap}>
                <Text style={[detailStyles.address, { paddingLeft: 15 }]}>地址：</Text>
                <Text style={[detailStyles.address, { color: '#00afec' }]} numberOfLines={1}>{info.address}</Text>
                <Icon style={{ position: 'absolute', right: 15, top: 0 }} name="arrow-right" size={16} color="#a8a8a8" />
              </TouchableOpacity> */}
              <View style={[detailStyles.block, detailStyles.borderTop, {
                      marginBottom: 0, justifyContent: 'center', height: 53, paddingLeft: 0, paddingRight: 15,
}]}
              >
                <TouchableOpacity onPress={() => navigation.navigate('GardenDetails-Parameters', { data: buildParams, curStatus: status })}>
                  <View style={[detailStyles.moreView, detailStyles.flexPadd]} >
                    <Text style={detailStyles.cffc601}>更多楼盘参数</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default BasicInfo;
