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

import GoBack from '../../components/GoBack';
// 请求异常组件
import StatusView from '../../components/StatusView';
// 卖点
export default class IntroductionSell extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.titleName,
    headerLeft: (<GoBack navigation={navigation} />),
    headerRight: <Text />,
  });

  constructor(props) {
    super(props);

    this.state = {
      status: '',
      data: {},
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
      }).catch((error) => {
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
              <Text style={detailStyles.titletxt}>楼盘卖点</Text>
            </View>
            {data.sellPoint ?
              <View style={[detailStyles.borderTop, { paddingTop: 15, paddingBottom: 15 }]}>
                <Text style={[detailStyles.subTxt, { lineHeight: 20 }]} numberOfLines={4}>
                  {data.sellPoint}
                </Text>
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
                        curData: data.sellPoint,
                        titleName: '楼盘卖点',
                        curStatus: this.state.status,
                    },
                )}
            >
              <View style={[detailStyles.moreView, detailStyles.flexPadd]} >
                <Text style={detailStyles.cffc601}>{data.sellPoint ? '更多楼盘卖点' : '对不起,暂无信息'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
