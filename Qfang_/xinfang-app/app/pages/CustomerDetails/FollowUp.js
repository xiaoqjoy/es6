import React, { PureComponent } from 'react';

import {
  View,
  Text,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native';

import axios from 'axios';
import baseStyles from '../../components/baseStyles';

import Pagination from '../../components/Pagination';

export default class FollowUp extends PureComponent {
  // constructor(props) {
  //   super(props);

  // }


  componentDidMount() {
    // 如组件type 为 followUp 则需监听事件
    if (this.props.type === 'followUp') {
      this.subRefresh = DeviceEventEmitter.addListener('refreshFollowData', () => {
        this.pagination.loadMoreInitFlag = false;
        this.pagination.requestData();
      });
    }
  }

  componentWillUnmount() {
    if (this.props.type === 'followUp') {
      this.subRefresh.remove();
    }
  }

  renderItem(data) {
    const Item = data.item;
    const timeStr = Item.followTime || Item.createTime || '';
    const nameStr = Item.followUser || Item.followName || '';
    return (
      <View style={styles.listStyle}>
        <Text style={[baseStyles.fz16, baseStyles.colorA3a, { marginTop: 20, marginBottom: 15 }]}>
          {Item.content || ''}
        </Text>
        <View style={styles.listCont}>
          <View style={{ flex: 7 }}>
            <Text style={[baseStyles.colorA8, baseStyles.fz14]}>
              {nameStr}
            </Text>
          </View>
          <View style={{ flex: 3, paddingLeft: '10%' }}>
            <Text style={[baseStyles.colorA8, baseStyles.fz14]}>
              {timeStr ? timeStr.substring(0, 10) : ''}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { props } = this;

    return (
      <View style={baseStyles.container}>
        {
          props.notFollowNum > 30 ?
            <View style={styles.followUpDateTip}>
              <Text style={[baseStyles.colorA8, baseStyles.fz14]}>
                已超过{props.notFollowNum || 0}天未跟进过该客户，现在联系一下吧
              </Text>
            </View>
            : null
        }
        <Pagination
          ref={(pagination) => { this.pagination = pagination; }}
          url={props.url}
          renderItem={this.renderItem}
          initParamFlag
          params={props.params}
          refreshCountType={props.type}
          statisticaType={props.type}
          dataStructure="res.data.result.items"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  followUpDateTip: {
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
  },

  listStyle: {
    paddingLeft: 15,
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderBottomColor: '#e7e8ea',
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  listCont: {
    flexDirection: 'row',
    paddingRight: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingBottom: 20,
    flex: 1,
  },
});
