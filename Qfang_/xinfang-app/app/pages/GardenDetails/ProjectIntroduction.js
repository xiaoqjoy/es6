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

export default class ProjectIntroduction extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      status: '',
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.requestData.bind(this));
    this.refeshDataListener = DeviceEventEmitter.addListener('refeshSellPoint', (data) => { this.requestData(data); });
  }

  componentWillUnmount() {
    this.refeshDataListener.remove();
  }

  requestData(data) {
    const expandId = data || this.props.expandId;
    axios.get('garden/sellPoint', { params: { expandId } })
      .then((res) => {
        if (res.data.status !== 'C0000') {
          this.setState({
            status: 'request-failed',
          });
          return;
        }
        this.setState({
          data: res.data.result,
        });
      }).catch(() => {
        this.setState({
          status: 'network-error',
        });
      });
  }

  render() {
    const { params } = this.props.navigation.state;
    const data = this.state.data;
    return (
      <View>
        <View style={[detailStyles.block, detailStyles.inner, { paddingBottom: 0 }]}>
          <View style={[detailStyles.flexContainer, { flexDirection: 'column' }]}>
            <View style={{ paddingBottom: 15 }}>
              <Text style={detailStyles.titletxt}> 项目介绍</Text>
            </View>
            {data.projectProfile ?
              <View style={[detailStyles.borderTop, { paddingTop: 15, paddingBottom: 15 }]}>
                <Text style={[detailStyles.subTxt, { lineHeight: 20 }]} numberOfLines={4}>{data.projectProfile}</Text>
              </View>
                : null
            }
          </View>
          <View style={[detailStyles.block, detailStyles.borderTop, {
                      marginBottom: 0, justifyContent: 'center', height: 53, paddingLeft: 0, paddingRight: 15,
}]}
          >
            <TouchableOpacity onPress={() => this.props.navigation.navigate(
                    'GardenDetails-SellingPoint',
                    {
                        curData: data.projectProfile,
                        curStatus: this.state.status,
                        titleName: '项目介绍',
                    },
                )}
            >
              <View style={[detailStyles.moreView, detailStyles.flexPadd]} >
                <Text style={detailStyles.cffc601}>{data.projectProfile ? '更多项目介绍' : '对不起，暂无信息'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
