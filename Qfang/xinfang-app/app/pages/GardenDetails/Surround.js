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
} from 'react-native';
// tab插件
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import axios from 'axios';

import Icon from '../../components/Icon/';

import detailStyles from './detail.styles';

import screen from '../../utils/screen';

import GoBack from '../../components/GoBack';
// 请求异常组件
import StatusView from '../../components/StatusView';
// 周边配套 每个类别里面有好几个子类别
class SurroundList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
      dataSource: [],
    };
  }
  componentDidMount() {
    InteractionManager.runAfterInteractions(this.requestData.bind(this));
  }

  requestData() {
    const typeDetailName = {
      BUS: '公交站',
      METRO: '地铁站',
      KINDERGARTEN: '幼儿园',
      PRIMARY_SCHOOL: '小学',
      JUNIOR_SCHOOL: '中学',
      HIGH_SCHOOL: '高中',
      HOSPITAL: '医院',
      PHARMACY: '药店',
      BANK: '银行',
      ATM: 'ATM',
      SUPERMARKET: '超市',
      MALL: '商场',
      CONVENIENCE_STORE: '便利店',
      RESTAURANT: '餐馆',
    };

    axios.get('garden/gardenMap', {
      params: {
        expandId: this.props.expandId,
        type: this.props.type,
      },
    }).then((res) => {
      if (res.data.status !== 'C0000') {
        this.setState({
          status: 'request-failed',
        });
        return;
      }
      let surroundListArr = [];
      if (res.data.result.datas) {
        for (const obj in res.data.result.datas) {
          if (!typeDetailName[obj]) {
            return;
          }
          const items = res.data.result.datas[obj];
          surroundListArr = surroundListArr.concat(items);
        }
        if (surroundListArr.length === 0) {
          this.setState({
            dataSource: [],
            loading: false,
            status: 'no-data-found',
          });
        } else {
          this.setState({
            dataSource: surroundListArr,
            sum: surroundListArr.length,
            status: '',
          });
        }
      } else {
        this.setState({
          dataSource: [],
          loading: false,
          status: 'no-data-found',
        });
      }
    }).catch((error) => {
      this.setState({
        dataSource: [],
        loading: false,
        status: 'network-error',
      });
    });
  }

  _renderItem({ item, index }) {
    return (
      <View>
        {/* 判断第一个有没有线 */}
        {index ? <View style={[detailStyles.borderTop]} /> : null}
        <View style={[detailStyles.inner]}>
          <View style={[detailStyles.flexContainer]}>
            <View style={{ flex: 1 }}><Text style={[styles.headTxt]} numberOfLines={1}>{item.name}</Text></View>
            {item.distance ?
              <View style={[detailStyles.flexleftContainer, detailStyles.vc]}>
                <Text>
                  <Icon name="mendianjuli" size={12} color="#7e7e7e" />
                </Text>
                <Text style={[styles.tipTxt]}>  {(item.distance.toFixed(2)) * 1000}米</Text>
              </View>
              : null}
          </View>
          <Text style={[styles.lightTxt, { marginTop: 10 }]}>{item.address}</Text>
        </View>
      </View>
    );
  }
  render() {
    const length = this.state.dataSource.length;
    if (length === 0) {
      return <StatusView status={this.state.status} />;
    }
    return (
      <FlatList
        style={{ paddingLeft: 15 }}
        initialNumToRender={length}
        maxToRenderPerBatch={length}
        data={this.state.dataSource}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index}
      />
    );
  }
}

class Surround extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: '周边配套',
    headerLeft: (<GoBack navigation={navigation} />),
  })
  render() {
    const expandId = this.props.navigation.state.params.id;
    return (
      <View style={[detailStyles.block, {
        height: screen.height - 65,
        backgroundColor: '#fff',
paddingLeft: 0,
      }]}
      >
        <ScrollableTabView
          tabBarActiveTextColor="#ffa200"
          tabBarInactiveTextColor="#a8a8a8"
          tabBarUnderlineStyle={styles.lineStyle}
          renderTabBar={() => (<ScrollableTabBar style={{
            borderColor: '#e7e8ea',
            borderBottomWidth: 1,
          }}
          />)}
        >
          <SurroundList type="BUS" expandId={expandId} tabLabel="公交站" />
          <SurroundList type="METRO" expandId={expandId} tabLabel="地铁站" />
          <SurroundList type="EDUCATION" expandId={expandId} tabLabel="教育机构" />
          <SurroundList type="MEDICAL" expandId={expandId} tabLabel="医疗设施" />
          <SurroundList type="BUSINESS_SUPER" expandId={expandId} tabLabel="商场超市" />
          <SurroundList type="BANK" expandId={expandId} tabLabel="银行" />
          <SurroundList type="FOOD_BEVERAGE" expandId={expandId} tabLabel="餐饮" />
        </ScrollableTabView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  lightTxt: {
    fontSize: 14,
    lineHeight: 22,
    color: '#a8a8a8',
  },
  headTxt: {
    color: '#3a3a3a',
    fontSize: 16,
    height: 20,
    lineHeight: 20,
  },
  tipTxt: {
    color: '#7e7e7e',
    fontSize: 14,
    height: 20,
    lineHeight: 20,
  },
  // tab底线
  lineStyle: {
    height: 1,
    backgroundColor: '#ffa200',
  },
  textStyle: {
    flex: 1,
    fontSize: 14,
    textAlign: 'center',
  },
  noTip: {
    justifyContent: 'center',
    marginTop: 60,
  },
});

export default Surround;
