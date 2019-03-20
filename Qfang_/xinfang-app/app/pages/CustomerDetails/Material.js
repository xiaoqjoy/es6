// 业务由 资料 改为 意向，具体请看 Intentions 组件
// 此组件准备弃用,

import React, { PureComponent } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import axios from 'axios';

import baseStyles from '../../components/baseStyles';

export default class Material extends PureComponent {
  switchStr(min, max, typeStr, splitStr) {
    // 价格面积 只有最小值没有最大值显示多少以上，只有最大值没有最小值显示0-最大值
    const minStr = min || max;
    const maxStr = (min && max) ? (splitStr || '-') + max + typeStr : typeStr;
    if (!(min || max)) {
      return null;
    }
    if (max && (typeStr === '万' || typeStr === '平方')) {
      return `${min || 0}-${max}${typeStr}/`;
    }
    if (min && (!max) && (typeStr === '万' || typeStr === '平方')) {
      return `${min + typeStr}以上/`;
    }
    return minStr + maxStr;
  }

  render() {
    const item = this.props.dataSource;
    return (
      <ScrollView style={baseStyles.container}>
        <View style={styles.listStyle}>
          <Text style={[baseStyles.colorF7e, baseStyles.fz16, { flex: 3 }]}>客户名称: </Text>
          <Text style={[baseStyles.colorA3a, baseStyles.fz16, { flex: 7 }]}>{item.customerName || ''}</Text>
        </View>
        <View style={styles.listStyle}>
          <Text style={[baseStyles.colorF7e, baseStyles.fz16, { flex: 3 }]}>手机: </Text>
          <Text style={[baseStyles.colorA3a, baseStyles.fz16, { flex: 7 }]}>{item.phone || ''}</Text>
        </View>
        <View style={styles.listStyle}>
          <Text style={[baseStyles.colorF7e, baseStyles.fz16, { flex: 3 }]}>来源: </Text>
          <Text style={[baseStyles.colorA3a, baseStyles.fz16, { flex: 7 }]}>{item.source || ''}</Text>
        </View>
        <View style={styles.listStyle}>
          <Text style={[baseStyles.colorF7e, baseStyles.fz16, { flex: 3 }]}>分组: </Text>
          <Text style={[baseStyles.colorA3a, baseStyles.fz16, { flex: 7 }]}>{item.customerGroupName || ''}</Text>
        </View>
        <View style={styles.listStyle}>
          <Text style={[baseStyles.colorF7e, baseStyles.fz16, { flex: 3 }]}>登记日期: </Text>
          <Text style={[baseStyles.colorA3a, baseStyles.fz16, { flex: 7 }]}>{item.registerDate || ''}</Text>
        </View>
        <View style={[styles.listStyle, { height: 'auto', minHeight: 54 }]}>
          <View style={{ flex: 3 }}><Text style={[baseStyles.colorF7e, baseStyles.fz16, { flex: 3 }]}>意向: </Text></View>
          <View style={{ flex: 7 }}><Text style={[baseStyles.colorA3a, baseStyles.fz16, { flex: 7 }]}>
            {item.intentionCityName ? `${item.intentionCityName}/` : ''}
            {item.intentionCountyName ? `${item.intentionCountyName}/` : ''}
            {item.intentionAreaName ? `${item.intentionAreaName}/` : ''}
            {item.intentionGardenName ? `${item.intentionGardenName}/` : ''}
            {item.intentionLayout ? `${item.intentionLayout}/` : ''}
            {this.switchStr(item.minArea, item.maxArea, '平方')}
            {this.switchStr(item.minPrice / 10000, item.maxPrice / 10000, '万')}
            {item.layout || ''}
          </Text>
          </View>
        </View>
        <View style={[styles.listStyle, { height: 'auto', minHeight: 54 }]}>
          <View style={{ flex: 3 }}><Text style={[baseStyles.colorF7e, baseStyles.fz16]}>备注: </Text></View>
          <View style={{ flex: 7 }}><Text style={[baseStyles.colorA3a, baseStyles.fz16]}>{item.remark || ''}</Text></View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  listStyle: {
    height: 54,
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e7e8ea',
    backgroundColor: '#fff',
  },
});
