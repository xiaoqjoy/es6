import React, { PureComponent } from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  InteractionManager,
} from 'react-native';
import ImageLoad from 'react-native-image-placeholder';

import Icon from './Icon/';
import baseStyles from './baseStyles';

class RenderItem extends PureComponent {
  // onAfterSelect 作为点击列表单项后的回调

  _onPress(item) {
    InteractionManager.runAfterInteractions(() => {
      this.props.navigation.push('GardenDetails', {
        name: item.name,
        id: item.id,
      });

      this.props.onAfterSelect && this.props.onAfterSelect();
    });
  }

  render() {
    const { showCommission } = this.props; // 是否显示佣金信息
    const placeholderImage = require('../assets/img/img-placeholder.png');
    const item = this.props.item;
    item.pictureUrl = item.pictureUrl.replace('{size}', '200x150');
    let showText = '';
    if (item.maxRetio === 0 && item.fixed === 0) {
      showText = '佣金参阅分销规则或联系案场';
    } else if (item.maxRetio !== 0 && item.fixed !== 0) {
      showText = `${item.maxRetio}%` + `+${item.fixed}元`;
    } else if (item.maxRetio === 0 && item.fixed !== 0) {
      showText = `${item.fixed}元`;
    } else {
      showText = `${item.maxRetio}%`;
    }
    return (
      <TouchableHighlight
        style={styles.touchList}
        activeOpacity={0.6}
        underlayColor="#fff"
        onPress={() => this._onPress(item)}
      >
        <View style={styles.ListOfListings}>
          <View style={styles.ListImageBox}>
            <ImageLoad
              style={styles.listImg}
              loadingStyle={{ size: 'small', color: 'white' }}
              placeholderSource={placeholderImage}
              placeholderStyle={{ backgroundColor: '#dedfe1', width: 100, height: 75 }}
              source={item.pictureUrl ? { uri: item.pictureUrl } : placeholderImage}
            />
            <View style={styles.listpriceBox}>
              {item.avgPrice ?
                <Text style={styles.avgPrice}>{item.avgPrice || ''} 元/平米</Text>
              :
                <Text style={styles.avgPrice}>均价待定</Text>
              }
            </View>
            {
              item.sellStatusStr ?
                <View style={styles.statusContainer}>
                  <View style={styles.triangleContainer}>
                    <View style={item.sellStatusStr === '在售' ? [styles.triangle, styles.saleTriangle] : styles.triangle} />
                  </View>
                  <View style={item.sellStatusStr === '在售' ? [styles.statusTips, styles.saleStatusTips] : styles.statusTips} >
                    <Text style={[baseStyles.fz10, baseStyles.colorFff]}>{item.sellStatusStr}</Text>
                  </View>
                </View>
                :
                null
            }
          </View>
          <View style={styles.listDetail}>
            <View>
              <Text numberOfLines={1} style={baseStyles.fz16}>
                {item.name.length > 15 ? `${item.name.substring(0, 13)}...` : item.name}
              </Text>
            </View>
            <View style={[baseStyles.marginB8, baseStyles.marginT8]}><Text style={baseStyles.colorF7e}>{item.cityName || ''} · {item.countyName || ''}</Text></View>
            <View style={styles.saleLayout}>
              <View style={styles.saleTips}>
                <Text style={styles.saleText}>售</Text>
              </View>
              <View style={styles.layoutsStr}>
                <Text numberOfLines={1} style={[baseStyles.fz12, baseStyles.colorF7e]}>{item.layoutsStr || ''}</Text>
              </View>
            </View>
            {showCommission ?
              (
                <View>
                  <View style={[styles.saleLayout]}>
                    <View style={[styles.saleTips, styles.commissionTips]}>
                      <Text style={[styles.saleText, styles.commission]}>佣</Text>
                    </View>
                    <View style={styles.commissionPrice}>
                      <Text style={[baseStyles.colorF91, baseStyles.fz12]}>
                        {showText}
                      </Text>
                      <Text style={[baseStyles.fz12, baseStyles.colorF91]}>
                        {item.cash ? `+现金奖${item.cash}元` : ''}
                      </Text>
                    </View>
                  </View>

                  {
                    item.commissionProgramsCount ?
                      (
                        <View style={styles.programView}>
                          <Text style={[baseStyles.colorF7e, baseStyles.fz12]}>{item.commissionProgramsCount} 套方案</Text>
                        </View>
                      )
                      : null
                  }
                </View>
              ) : null}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  touchList: {
    marginBottom: 15,
    borderTopColor: '#e7e8ea',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 15,
    paddingLeft: 5,
  },

  ListOfListings: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  ListImageBox: {
    position: 'relative',
    width: 100,
    height: 75,
    alignSelf: 'flex-start',
  },

  listImg: {
    width: 100,
    height: 75,
    // resizeMode: 'cover',
  },

  listpriceBox: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    width: '100%',
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  avgPrice: {
    color: '#fff',
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 4,
    fontSize: 12,
  },

  listDetail: {
    flexDirection: 'column',
    marginLeft: 15,
  },

  saleLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  saleTips: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#5dbac9',
    borderRadius: 4,
    width: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },

  commissionTips: {
    borderColor: '#ffa200',
  },

  saleText: {
    fontSize: 10,
    color: '#5dbac9',
    // paddingTop: 2
  },

  layoutsStr: {
    width: '70%',
  },

  commission: {
    color: '#ffa200',
  },

  commissionPrice: {
    flexDirection: 'row',
    alignItems: 'center',
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
  programView: {
    marginLeft: 22,
  },
  saleTriangle: {
    borderBottomColor: '#49a158',
  },

});

export default RenderItem;
