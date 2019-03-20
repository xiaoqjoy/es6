// 户型
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  InteractionManager,
  DeviceEventEmitter,
} from 'react-native';

import axios from 'axios';

import Icon from '../../components/Icon/';

import LayoutList from './LayoutList';

import detailStyles from './detail.styles';
import baseStyles from '../../components/baseStyles';

import { QFReactHelper, UMNative } from '../../common/NativeHelper';

// 点击需要调用app查看户型图，更多的点击事件


class Layout extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      Num: 0,
      moreFlag: false,
    };
    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.requestData.bind(this));
    this.refeshDataListener = DeviceEventEmitter.addListener('refeshLayout', (data) => { this.requestData(data); });
  }
  componentWillUnmount() {
    this.refeshDataListener.remove();
  }

  requestData(data) {
    const expandId = data || this.props.navigation.state.params.id;
    axios.get('garden/getLayoutsByExpandId', { params: { expandId } })
      .then((res) => {
        if (res.data.status !== 'C0000') {
          return;
        }

        const dataSource = res.data.result;
        const Num = dataSource.length;
        if (Num > 3) {
          this.allData = dataSource;
          this.setState({
            dataSource: dataSource.slice(0, 3),
            Num,
            moreFlag: true,
          });
        } else {
          this.setState({
            dataSource,
            Num,
            moreFlag: false,
          });
        }
      });
  }

  renderItem(data) {
    return (
      <LayoutList item={data.item} expandId={this.props.expandId} index={data.index} />
    );
  }

  render() {
    if (this.state.Num === 0) {
      return null;
    }

    return (
      <View>
        {/* 标题 */}
        <View style={detailStyles.block}>
          <View style={detailStyles.inner}>
            <View>
              <Text style={detailStyles.titletxt}>
                在售户型 <Text style={detailStyles.titletip}>({this.state.Num}个户型）</Text>
              </Text>
            </View>
          </View>
          {/* 标题 */}
          {/**/}
          <FlatList
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index}
          />
          {/* 更多 */}
          {this.state.moreFlag ?
            <TouchableOpacity onPress={() => {
              this.setState({
                moreFlag: false,
                dataSource: this.allData,
              });
            }}
            >
              <View style={[detailStyles.flexleftContainer, detailStyles.more]} >
                <Text style={[baseStyles.fz14, detailStyles.cffc601]}>更多户型</Text>
                <Icon name="arrow-down" size={14} color="#ffa200" style={{ paddingLeft: 5 }} />
              </View>
            </TouchableOpacity> : null
          }
        </View>
      </View>
    );
  }
}


export default Layout;
