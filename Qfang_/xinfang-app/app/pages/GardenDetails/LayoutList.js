import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';


import ImageLoad from 'react-native-image-placeholder';


import detailStyles from './detail.styles';
import baseStyles from '../../components/baseStyles';

import { QFReactHelper, UMNative } from '../../common/NativeHelper';

class LayoutList extends PureComponent {
  render() {
    const placeholderImage = require('../../assets/img/img-placeholder.png');
    const { item } = this.props;


    const { totalPriceFrom, totalPriceTo, area } = item;

    let price = 0;
    if (totalPriceFrom === 0) {
      if (totalPriceFrom !== totalPriceTo) {
        price = totalPriceTo / 10000;
      }
    } else {
      price = `${totalPriceFrom / 10000}~${totalPriceTo / 10000}`;
    }


    item.pictureUrl = item.url.replace('{size}', '200x150');
    const params = { expandId: this.props.expandId, type: 'p9', index: this.props.index };

    let tagArr = item.tags.split(',');

    if (tagArr.length > 0) {
      if (tagArr.length === 1 && tagArr[0] === '') {
        tagArr = [];
      }
      if (tagArr.length > 3) {
        tagArr.splice(3);
      }
    }


    // 点击需要调用app查看户型图
    return (
      <TouchableOpacity
        onPress={() => {
          QFReactHelper.showPage('NEWHOUSE_ALBUM', params);
        }}
      >

        <View style={[detailStyles.flexleftContainer, detailStyles.borderTop, detailStyles.inner, styles.paddingLf]}>
          {/* 左边 图片 和 销售状态 */}
          <View style={styles.touchList} >
            <ImageLoad
              style={styles.listImg}
              loadingStyle={{ size: 'small', color: 'white' }}
              placeholderSource={placeholderImage}
              placeholderStyle={{ backgroundColor: '#dedfe1', width: 100, height: 75 }}
              source={item.pictureUrl ? { uri: item.pictureUrl } : placeholderImage}
            />
            {
              item.sellStatusDesc ?
                <View style={styles.statusContainer}>
                  <View style={styles.triangleContainer}>
                    <View style={item.sellStatusDesc === '在售' ? [styles.triangle, styles.saleTriangle] : styles.triangle} />
                  </View>
                  <View style={item.sellStatusDesc === '在售' ? [styles.statusTips, styles.saleStatusTips] : styles.statusTips} >
                    <Text style={[baseStyles.fz10, baseStyles.colorFff]}>{item.sellStatusDesc}</Text>
                  </View>
                </View>
                :
                null
            }
          </View>

          {/* 右边 楼盘文字 描述 */}
          <View style={styles.rightCon}>

            <View style={[detailStyles.flexleftContainer, { width: 230 }]}>
              { item.bedroomNum ?
                <Text style={styles.rightTitle} >
                  {item.bedroomNum}室{item.livingroomNum}厅{item.bathroomNum}卫
                </Text>
                : null
              }
              {
                area ?
                  <Text style={styles.rightTitle}>{area}㎡</Text>
                  : null
              }
              {
                item.orientationDesc ?
                  <Text style={[baseStyles.fz14, baseStyles.colorA8]} >
                    {item.orientationDesc}朝向
                  </Text>
                  : null
              }
            </View>

            {item.describe ?
              <View>
                <Text style={styles.layoutTip} numberOfLines={2}>
                  {item.describe}
                </Text>
              </View>
              : null
            }

            <View style={[detailStyles.flexleftContainer, { paddingTop: 5 }]}>
              <Text style={[baseStyles.colorA8, baseStyles.fz12]} >
                均价：
              </Text>
              {price === 0 ?
                <Text style={[baseStyles.colorFfa, baseStyles.fz12]}>
                  待定
                </Text>
                :
                <View style={[detailStyles.flexleftContainer]}>
                  <Text style={[baseStyles.colorFfa, baseStyles.fz12]}>
                    {price}
                  </Text>
                  <Text style={[baseStyles.colorA8, baseStyles.fz12]}>
                    万/套
                  </Text>
                </View>
              }

            </View>

            <View style={[detailStyles.flexleftContainer, { paddingTop: 5 }]}>
              {item.popularizeTypeDesc === '主推' ?
                <View style={{ backgroundColor: '#ffdfdf', padding: 3, marginRight: 5 }}>
                  <Text style={[{ color: '#ff7e7e' }, baseStyles.fz10]} >
                    {item.popularizeTypeDesc}
                  </Text>
                </View>
                : null
              }
              {
                tagArr.length > 0 ?
                  tagArr.map((val, index) => {
                    let color = '';
                    let bgColor = '';
                    switch (index) {
                      case 0:
                        color = 'blue';
                        bgColor = '#e5fff8';
                        break;
                      case 1:
                        color = 'green';
                        bgColor = '#e5fff8';
                        break;
                      default:
                        color = 'yellow';
                        bgColor = '#fff9d9';
                    }
                    return (
                      <View
                        style={{ backgroundColor: bgColor, padding: 3, marginRight: 5 }}
                        key={Math.random()}
                      >
                        <Text style={[baseStyles[color], baseStyles.fz10]} >
                          {val}
                        </Text>
                      </View>
                    );
                  })
                  : null
              }


            </View>

          </View>

        </View>

      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  touchList: {
    position: 'relative',
  },

  rightCon: {
    marginLeft: 15,
    flex: 1,
  },
  paddingLf: {
    paddingLeft: 5,
  },
  layoutNum: {
    color: '#7e7e7e',
    backgroundColor: '#f5f5f9',
    fontSize: 14,
    height: 20,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  layoutTip: {
    flex: 1,
    color: '#a8a8a8',
    fontSize: 12,
    paddingTop: 5,
  },
  listImg: {
    width: 100,
    height: 75,
    // resizeMode: 'cover'
  },
  rightTitle: {
    color: '#3a3a3a',
    fontSize: 14,
    marginRight: 10,
  },

  statusContainer: {
    position: 'absolute',
    top: 5,
    left: -5,
    width: 30,
    height: 25,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 10,
  },

  triangleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 5,
    height: 5,
    zIndex: 99999,
  },

  statusTips: {
    position: 'absolute',
    left: 0,
    top: 5,
    width: 30,
    height: 20,
    backgroundColor: '#ffa200',
    zIndex: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },

  saleStatusTips: {
    backgroundColor: '#65c560',
  },
  triangle: {
    width: 0,
    height: 0,
    borderBottomWidth: 5,
    borderLeftWidth: 5,
    borderBottomColor: '#e89709',
    borderLeftColor: 'transparent',
  },
  saleTriangle: {
    borderBottomColor: '#49a158',
  },
});
export default LayoutList;
