// 动态详情页
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
// 详情页佣金列表 新的需求方案说明：佣金+现金奖
class RenderComCashList extends PureComponent {
  render() {
    const item = this.props.item;
    const topVlalue = (item.retioMoney && !item.fixedMoney && !item.cashMoney) ? 1 : 0;
    const showStr = (item.retioMoney && item.fixedMoney) ? '+' : '';
    return (
      <View style={[detailStyles.flexContainer, detailStyles.borderTop]}>
        {item.programDescription ?
          <View style={{ maxWidth: 120, marginTop: topVlalue }}>
            <Text style={[detailStyles.lists, { paddingRight: 10, paddingTop: 18 }]} numberOfLines={1}>{item.programDescription}
            </Text>
          </View> :
          null
        }
        <View style={{ flex: 1 }}>
          <Text style={[detailStyles.lists, detailStyles.orange]}>
            {/* 100000元/套+现金奖100000元 */}
            {item.retioMoney ? `${item.retioMoney}%` : null}
            {item.fixedMoney ? `${showStr + item.fixedMoney}元` : null}
            {item.cashMoney ? `+现金奖${item.cashMoney}元` : null}
          </Text>
        </View>
      </View>
    );
  }
}

// cash
class MaxCash extends PureComponent {
  render() {
    if (!this.props.maxCash) {
      return null;
    }
    return (
      <View style={[detailStyles.block]}>
        <Text style={[detailStyles.lists]}>
          <Text style={[detailStyles.c3a3a3a]}>最高现金奖: </Text>
          <Text style={[detailStyles.orange]}>{this.props.maxCash}</Text>元/套
        </Text>
      </View>
    );
  }
}

// 佣金方案
class Commission extends PureComponent {
  _renderItem(data) {
    return (
      <RenderComCashList item={data.item} />
    );
  }
  render() {
    const navigation = this.props.navigation;
    const { params } = this.props.navigation.state;
    if (this.props.commissionPrograms && !this.props.commissionPrograms.length) {
      return (
        <View style={[detailStyles.borderTop]}>
          <Text style={[detailStyles.lists]}>佣金参阅分销规则或联系案场</Text>
        </View>);
    }
    return (
      <FlatList
        data={this.props.commissionPrograms}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index}
      />
    );
  }
}

//
class Distribution extends PureComponent {
  constructor() {
    super();

    this.state = {
      dataSource: [],
      commissionPrograms: [],
      maxCash: null,
      info: {},
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      info: props.info,
    });
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.requestData.bind(this));
    this.refeshDataListener = DeviceEventEmitter.addListener('refeshDistribution', (data) => { this.requestData(data); });
  }

  componentWillUnmount() {
    this.refeshDataListener.remove();
  }

  requestData(data) {
    const navigation = this.props.navigation;
    const expandId = data || navigation.state.params.id;
    axios.get('garden/queryCommissionPrograms', { params: { expandId } })
      .then((res) => {
        if (res.data.status !== 'C0000') {
          return;
        }
        const result = res.data.result;
        this.setState({
          commissionPrograms: result.commissions,
          sum: result.commissions && result.commissions.length,
          maxCash: result.maxCash,
        });
      });
  }

  render() {
    const navigation = this.props.navigation;
    const { info } = this.state.info;
    const id = this.props.expandId;
    const takeLook = this.props.takeLook;
    return (
      <View>
        <View style={detailStyles.block}>
          <View style={detailStyles.inner}>
            <View style={detailStyles.flexContainer}>
              <View>
                <Text style={detailStyles.titletxt}>
                佣金规则 {this.state.sum ? <Text style={detailStyles.titletip}>({this.state.sum || 0}套方案)</Text> : null}
                </Text>
              </View>
            </View>
          </View>
          <Commission commissionPrograms={this.state.commissionPrograms} navigation={this.props.navigation} sum={this.state.sum} />
          <View style={[detailStyles.block, detailStyles.borderTop, {
                    marginBottom: 0, justifyContent: 'center', height: 53, paddingLeft: 0, paddingRight: 15,
}]}
          >
            <TouchableOpacity onPress={() => navigation.navigate('GardenDetails-DistributionDetail', { id, takeLook })}>
              <View style={[detailStyles.moreView, detailStyles.flexPadd, { paddingRight: 15 }]} >
                <Text style={detailStyles.cffc601}>更多分销详情</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* <MaxCash maxCash={this.state.maxCash} /> */}
      </View>
    );
  }
}

export default Distribution;
