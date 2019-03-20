// 动态详情页
import React, { PureComponent } from 'react';

import {
  View,
  Text,
  DeviceEventEmitter,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';

import axios from 'axios';

import detailStyles from './detail.styles';

export default class SurroundPart extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      status: '',
      education: '',
      shop: '',
      hospital: '',
      bus: '',
      curID: '',
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.requestData.bind(this));
    this.refeshDataListener = DeviceEventEmitter.addListener('refeshSurround', (data) => { this.requestData(data); });
  }

  componentWillUnmount() {
    this.refeshDataListener.remove();
  }

  requestData(data) {
    const expandId = data || this.props.expandId;
    // 学校
    let cureducation = '';
    // 购物
    let curshop = '';
    // 医院
    let curhospital = '';
    // 交通
    let curbus = '';
    axios.get('garden/gardenMaps', { params: { expandId } })
      .then((res) => {
        if (res.data.status !== 'C0000') {
          this.setState({
            status: 'request-failed',
          });
          return;
        }
        const busData = res.data.result.BUS.BUS;
        const metroData = res.data.result.METRO.METRO;
        const busDataL = busData.length;
        const metroDataL = metroData.length;
        for (let i = 0; i < busDataL; i++) {
          curbus += `${busData[i].name}、`;
        }
        for (let i = 0; i < metroDataL; i++) {
          curbus += `${metroData[i].name}、`;
        }
        Object.keys(res.data.result.EDUCATION).forEach((key) => {
          const curData = res.data.result.EDUCATION[key];
          const curLength = curData.length;
          for (let i = 0; i < curLength; i++) {
            cureducation += `${curData[i].name}、`;
          }
        });
        Object.keys(res.data.result.BUSINESS_SUPER).forEach((key) => {
          const curData = res.data.result.BUSINESS_SUPER[key];
          const curLength = curData.length;
          for (let i = 0; i < curLength; i++) {
            curshop += `${curData[i].name}、`;
          }
        });
        Object.keys(res.data.result.MEDICAL).forEach((key) => {
          const curData = res.data.result.MEDICAL[key];
          const curLength = curData.length;
          for (let i = 0; i < curLength; i++) {
            curhospital += `${curData[i].name}、`;
          }
        });
        this.setState({
          data: res.data.result,
          education: cureducation,
          shop: curshop,
          hospital: curhospital,
          bus: curbus,
          curId: expandId,
        });
      }).catch(() => {
        this.setState({
          status: 'network-error',
        });
      });
  }

  render() {
    const {
      bus, education, shop, hospital,
    } = this.state;
    return (
      <View>
        <View style={[detailStyles.block, detailStyles.inner, { paddingBottom: 0 }]}>
          <View style={[detailStyles.flexContainer, { flexDirection: 'column', flex: 1 }]}>
            <View style={{ paddingBottom: 15 }}>
              <Text style={detailStyles.titletxt}> 周边配套</Text>
            </View>
            {bus || education || shop || hospital ?
              <View>
                <View style={[detailStyles.borderTop, { paddingTop: 15, paddingBottom: 5 }]}>
                 <Text style={[detailStyles.subTxt, { paddingLeft: 5, lineHeight: 20 }]} numberOfLines={1}>交通：{bus}</Text>
               </View>
                <View style={{ paddingBottom: 5 }}>
                 <Text style={[detailStyles.subTxt, { paddingLeft: 5, lineHeight: 20 }]} numberOfLines={1}>学校：{education}</Text>
               </View>
                <View style={{ paddingBottom: 5 }}>
                 <Text style={[detailStyles.subTxt, { paddingLeft: 5, lineHeight: 20 }]} numberOfLines={1}>购物：{shop}</Text>
               </View>
                <View style={{ paddingBottom: 15 }}>
                 <Text style={[detailStyles.subTxt, { paddingLeft: 5, lineHeight: 20 }]} numberOfLines={1}>医院：{hospital}</Text>
               </View>
              </View>
            : null
           }
          </View>
          <View style={[detailStyles.block, detailStyles.borderTop, {
                      marginBottom: 0, justifyContent: 'center', height: 53, paddingLeft: 0, paddingRight: 15,
}]}
          >
            <TouchableOpacity onPress={() => this.props.navigation.navigate('GardenDetails-Surround', { id: this.state.curId })}>
              <View style={[detailStyles.moreView, detailStyles.flexPadd]} >
                <Text style={detailStyles.cffc601}>{bus || education || shop || hospital ? '更多周边配套' : '对不起，暂无信息'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
