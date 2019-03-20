import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  DeviceEventEmitter,
  InteractionManager,
} from 'react-native';

import axios from 'axios';

import UserInfo from '../../common/UserInfo';

import { toThousands } from '../../utils/tool';
import { screen } from '../../utils/index';
import Icon from '../../components/Icon/';
import baseStyles from '../../components/baseStyles';
import MarqueeLamp from './MarqueeLamp';
// import MarqueeLamp from '../../components/MarqueeLamp'

class MarqueeBox extends PureComponent {
  state = {
    dealHorseRaceLamp: [],
  }

  componentDidMount() {
    this.subRefresh = DeviceEventEmitter.addListener('refresh', this.requestData.bind(this));
    InteractionManager.runAfterInteractions(this.requestData.bind(this));
  }

  componentWillUnmount() {
    this.subRefresh.remove();
  }

  requestData() {
    // 首页公告
    axios.get('index/dealHorseRaceLamp')
      .then((res) => {
        if (res.data.status == 'C0000') {
          const data = res.data.result;
          if (data.length > 1) {
            data.push(data[0]);
          }

          this.setState({
            dealHorseRaceLamp: data,
          });
        }
      }).catch((err) => {
        console.log('error=', err);
      });
  }

  _lampRenderItem(item, i) {
    if (screen.width >= 320) {
      if (item.gardenName.length >= 10) {
        item.gardenName = `${item.gardenName.substring(0, 8)}...`;
      }
    } else if (item.gardenName.length >= 8) {
      item.gardenName = `${item.gardenName.substring(0, 7)}...`;
    }

    return (
      <View style={[styles.marqueeTextBox]} numberOfLines={1} key={i}>
        <Text style={[baseStyles.colorF7e]}>{item.name || ''}</Text>
        <Text style={{ marginLeft: 10, marginRight: 10 }} numberOfLines={1} >{item.gardenName || ''}</Text>
        <Text style={[{ textAlign: 'center' }]} numberOfLines={1}> 收佣 <Text style={baseStyles.colorF91}> {toThousands(item.totalPrice) || ''}</Text></Text>
      </View>
    );
  }

  marqueeItem() {
    return this.state.dealHorseRaceLamp.map((item, i) => this._lampRenderItem(item, i));
  }

  render() {
    const { dealHorseRaceLamp } = this.state;
    if (dealHorseRaceLamp.length) {
      return (
        <View style={styles.marqueeBox}>
          <Image style={styles.placardIcon} source={require('../../assets/img/gonggao.png')} />
          {
            dealHorseRaceLamp.length > 1 ?
              <View style={styles.marqueeCont}>
                <MarqueeLamp children={this.marqueeItem.call(this)} />
              </View>
              :
              <View style={[styles.marqueeTextBox]} numberOfLines={1}>
                <Text style={[baseStyles.colorF7e]}>{dealHorseRaceLamp[0].name || ''}</Text>
                <Text style={{ marginLeft: 10, marginRight: 10 }} numberOfLines={1} >{dealHorseRaceLamp[0].gardenName || ''}</Text>
                <Text style={[{ textAlign: 'center' }]} numberOfLines={1}> 收佣 <Text style={baseStyles.colorF91}> {toThousands(dealHorseRaceLamp[0].totalPrice) || ''}</Text></Text>
              </View>
          }
        </View>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  marqueeBox: {
    height: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#fefdf8',
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    paddingLeft: 15,
  },

  marqueeCont: {
    height: 25,
    width: '100%',
    overflow: 'scroll',
    marginLeft: 5,
  },

  marqueeTextBox: {
    flex: 1,
    height: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 5,
  },

});

export default MarqueeBox;
