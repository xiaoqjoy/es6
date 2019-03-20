import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  DeviceEventEmitter,
} from 'react-native';
import { observable, toJS, action, extendObservable, set } from 'mobx';
import { observer } from 'mobx-react/native';
// 调用原生app模块
import { QFReactHelper, UMNative } from '../../common/NativeHelper';

import Icon from '../../components/Icon/';


import { screen, system } from '../../utils';

@observer
class IntentionItem extends Component {
  constructor(props) {
    super(props);
    this.eventName = `filterChoose${Math.random()}`;
  }


  componentDidMount() {

    // 组件获取值
    this.subField = DeviceEventEmitter.addListener(this.eventName, (data) => {
      if (!data.item) {
        // 城市区域那里需要处理
        return;
      }
      const intentionItemObj = {};
      const { item, field } = data;
      switch (field) {
        // 城市
        case 'intentionCity':
          intentionItemObj.intentionCityName = item.name;
          intentionItemObj.intentionCityId = item.internalId;
          // 切换了城市后 楼盘、区域和片区都要清空重新再来
          intentionItemObj.intentionGardenName = '';
          intentionItemObj.intentionGardenId = '';
          intentionItemObj.intentionCountyName = '';
          intentionItemObj.intentionCountyId = '';
          intentionItemObj.intentionAreaName = '';
          intentionItemObj.intentionAreaId = '';
          break;
        // 区域+片区
        case 'intentionArea':
          intentionItemObj.intentionCountyName = item.regionName;
          intentionItemObj.intentionCountyId = item.regionId || '';
          intentionItemObj.intentionAreaName = item.areaName;
          intentionItemObj.intentionAreaId = item.areaId || '';
          break;
        // 楼盘
        case 'intentionGarden':
          intentionItemObj[`${field}Name`] = item.name;
          intentionItemObj[`${field}Id`] = item.gardenErpId;
          break;
        // 户型
        case 'layout':
          intentionItemObj.layout = item.value;
          break;
        // 价格面积
        case 'Area':
        case 'Price': {
          const { key, value } = item;

          let sendMin = parseInt(key[0], 10);
          let sendMax = parseInt(key[1], 10);

          if (field === 'Price') {
            sendMin *= 10000;
            sendMax *= 10000;
          }

          let tmpNum = 0;
          if (sendMin > sendMax) {
            tmpNum = sendMin;
            sendMin = sendMax;
            sendMax = tmpNum;
          };

          intentionItemObj[`min${field}`] = sendMin;
          intentionItemObj[`max${field}`] = sendMax;

          break;
        }

        default:
          break;
      }
      set(this.props.intentionItemObj, intentionItemObj);
    });
  }


  componentWillUnmount() {
    this.subField.remove();
  }


  render() {
    const { navigation, intentionItemObj } = this.props;

    const { intentionItemBar } = this.props;

    const intentionAreaText = intentionItemObj.intentionCountyName || intentionItemObj.intentionAreaName ?
      `${intentionItemObj.intentionCountyName}  ${intentionItemObj.intentionAreaName}`
      : '';

    const areaText = intentionItemObj.minArea === intentionItemObj.maxArea ?
      intentionItemObj.minArea
      : `${intentionItemObj.minArea}-${intentionItemObj.maxArea}`;

    const priceText = intentionItemObj.minPrice === intentionItemObj.maxPrice ?
      intentionItemObj.minPrice / 10000
      : `${intentionItemObj.minPrice / 10000}-${intentionItemObj.maxPrice / 10000}`;

    return (
      <View style={styles.item}>
        <View style={styles.formBox}>
          {/* 客户意向城市start */}
          <TouchableOpacity
            onPress={() => navigation.navigate('CityPicker', { eventName: this.eventName, fieldName: 'intentionCity' })}
          >
            <View style={styles.formItem}>
              <Text style={styles.paramTxt}>城市:</Text>
              <TextInput
                style={styles.formInput}
                placeholder="选择客户意向城市"
                placeholderTextColor="#a8a8a8"
                underlineColorAndroid="transparent"
                editable={false}
                value={intentionItemObj.intentionCityName}
              />
              <Icon name="arrow-right" size={16} color="#a8a8a8" style={styles.rightIcon} />
            </View>
          </TouchableOpacity>
          {/* 客户意向城市end */}

          {/* 区域+片区： start */}
          <TouchableOpacity
            onPress={() => {
              const { intentionCityId } = intentionItemObj;
              if (!intentionCityId) {
                QFReactHelper.show('请先选择城市', 3);
                return;
              }

              navigation.navigate('AreaPicker', {
                internalCityId: intentionCityId,
                eventName: this.eventName,
                fieldName: 'intentionArea',
              });
            }}
          >
            <View style={[styles.formItem, styles.borderTop]}>
              <Text style={styles.paramTxt}>区域:</Text>
              <TextInput
                style={styles.formInput}
                placeholder="选择客户意向区域"
                placeholderTextColor="#a8a8a8"
                underlineColorAndroid="transparent"
                editable={false}
                value={intentionAreaText}
              />
              <Icon name="arrow-right" size={16} color="#a8a8a8" style={styles.rightIcon} />
            </View>
          </TouchableOpacity>
          {/* 区域+片区：end */}

          {/* 楼盘start */}
          <TouchableOpacity
            onPress={() => {
              const { intentionCityId } = intentionItemObj;
              if (!intentionCityId) {
                QFReactHelper.show('请先选择城市', 3);
                return;
              }
              navigation.navigate(
                'GardenSearch4Customer',
                { internalCityId: intentionCityId, eventName: this.eventName, fieldName: 'intentionGarden' },
              );
            }}
          >
            <View style={[styles.formItem, styles.borderTop]}>
              <Text style={styles.paramTxt}>楼盘:</Text>
              <TextInput
                style={styles.formInput}
                placeholder="选择客户意向楼盘"
                placeholderTextColor="#a8a8a8"
                underlineColorAndroid="transparent"
                editable={false}
                value={intentionItemObj.intentionGardenName}
              />
              <Icon name="arrow-right" size={16} color="#a8a8a8" style={styles.rightIcon} />
            </View>
          </TouchableOpacity>
          {/* 楼盘end */}

          {/* 户型start */}
          <TouchableOpacity onPress={() => navigation.navigate(
            'FilterView',
            {
              entityList: intentionItemBar[0].dataList,
              customData: intentionItemBar[0].customData,
              field: intentionItemBar[0].field,
              title: '户型选择',
              eventName: this.eventName,
            },
          )}
          >
            <View style={[styles.formItem, styles.borderTop]}>
              <Text style={styles.paramTxt}>户型:</Text>
              <TextInput
                style={styles.formInput}
                placeholder="选择户型"
                placeholderTextColor="#a8a8a8"
                underlineColorAndroid="transparent"
                editable={false}
                value={intentionItemObj.layout}
              />
              <Icon name="arrow-right" size={16} color="#a8a8a8" style={styles.rightIcon} />
            </View>
          </TouchableOpacity>
          {/* 户型end */}
          {/* 面积start */}
          <TouchableOpacity onPress={() => navigation.navigate('FilterView', {
            entityList: intentionItemBar[1].dataList,
            customData: intentionItemBar[1].customData,
            field: intentionItemBar[1].field,
            title: '面积选择',
            eventName: this.eventName,
          })}
          >
            <View style={[styles.formItem, styles.borderTop]}>
              <Text style={styles.paramTxt}>面积:</Text>
              <TextInput
                style={styles.formInput}
                placeholder="选择面积"
                placeholderTextColor="#a8a8a8"
                underlineColorAndroid="transparent"
                editable={false}
                value={areaText ? areaText : ''}
              />
              <Icon name="arrow-right" size={16} color="#a8a8a8" style={styles.rightIcon} />
            </View>
          </TouchableOpacity>
          {/* 面积end */}
          {/* 价格start */}
          <TouchableOpacity onPress={() => navigation.navigate('FilterView', {
            entityList: intentionItemBar[2].dataList,
            customData: intentionItemBar[2].customData,
            field: intentionItemBar[2].field,
            title: '价格选择',
            eventName: this.eventName,
          })}
          >
            <View style={[styles.formItem, styles.borderTop]}>
              <Text style={styles.paramTxt}>价格:</Text>
              <TextInput
                style={styles.formInput}
                placeholder="选择价格"
                placeholderTextColor="#a8a8a8"
                underlineColorAndroid="transparent"
                editable={false}
                value={priceText ? priceText : ''}
              />
              <Icon name="arrow-right" size={16} color="#a8a8a8" style={styles.rightIcon} />
            </View>
          </TouchableOpacity>
          {/* 价格end */}
        </View>
        {/* 客户意向 */}
      </View>
    );
  }
}

const styles = StyleSheet.create({

  formBox: {
    backgroundColor: '#fff',
    paddingLeft: 15,
  },
  formItem: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
  },
  paramTxt: {
    width: 54,
    fontSize: 16,
    color: '#7e7e7e',
  },

  rightIcon: {
    paddingRight: 15,
  },

  formInput: {
    fontSize: 16,
    padding: 0,
    margin: 0,
    flex: 1,
    color: '#3a3a3a',
  },
  borderTop: {
    borderTopColor: '#e7e8ea',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  borderBottom: {
    borderBottomColor: '#e7e8ea',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },


});

export default IntentionItem;
