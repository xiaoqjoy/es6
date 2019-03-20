import React, { PureComponent } from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import baseStyles from '../../components/baseStyles';
import { system } from '../../utils/';

export default class Intentions extends PureComponent {
  switchStr(min, max, typeStr, splitStr) {
    // 价格面积 只有最小值没有最大值显示多少以上，只有最大值没有最小值显示0-最大值
    const minStr = min || max;
    const maxStr = (min && max) ? (splitStr || '-') + max + typeStr : typeStr;
    if (!(min || max)) {
      return null;
    }
    if (max && (typeStr === '万元' || typeStr === '平方')) {
      // return `${min || 0}-${max}${typeStr}/`;
      return `${min || 0}-${max}${typeStr}`;
    }
    if (min && (!max) && (typeStr === '万元' || typeStr === '平方')) {
      // return `${min + typeStr}以上/`;
      return `${min + typeStr}以上`;
    }
    return minStr + maxStr;
  }

  // 初始化意向详情数据,
  // 其中 value 类型为string的表示普通意向详情 key 必须与后端数据接口的字段相同，
  // value 即意向详情的 LabelName
  initIntentionDetail() {
    if (this.intentionDetail) return;

    this.intentionDetail = {
      intentionCityName: '城市',
      intentionCountyName: '区域',
      intentionAreaName: '片区',
      intentionGardenName: '楼盘',
      layout: '户型',
      // 特殊意向详情请自定义字段名
      area: {
        labelName: '面积', // 必须包含此字段
        cell: '平方', // 单位
        minKey: 'minArea', // 后端数据接口上的最小值字段名
        maxKey: 'maxArea', // 后端数据接口上的最大值字段名
      },
      price: {
        labelName: '价格',
        cell: '万元',
        minKey: 'minPrice',
        maxKey: 'maxPrice',
        convert: (price) => (price / 10000), // 最大值、最小值的前端显示转换方法，此字段非必须
      },
    };
  }

  // 开始渲染一个意向
  renderOneIntention(index) {
    this.initIntentionDetail();
    return (
      <View style={{ marginBottom: 10 }} key={`intention-${index}`}>
        {this.renderSubTitle(index)}
        {Object.keys(this.intentionDetail).map((key) => this.renderIntentionDetail(key, index))}
      </View>
    );
  }

  renderSubTitle(index) {
    if (this.props.dataSource && this.props.dataSource.length > 1) {
      return (
        <View style={styles.listStyle}>
          <Text style={[baseStyles.colorA3a, baseStyles.fz16, { flex: 3 }]}>{`意向信息${index + 1}`}</Text>
        </View>
      );
    }
    return null;
  }

  // 普通、特殊意向详情分开处理
  renderIntentionDetail(key, index) {
    if (!key) return null;

    if (typeof this.intentionDetail[key] === 'string') {
      return this.renderNormalOne(key, index);
    } else if (typeof this.intentionDetail[key] === 'object') {
      return this.renderSpacialOne(key, index);
    }
    return null;
  }

  // 普通意向详情直接渲染
  renderNormalOne(key, index) {
    return this.renderOneDetail(key, index, this.intentionDetail[key], this.props.dataSource[index][key]);
  }

  // 特殊意向详情处理（包含最小值、最大值）的数据处理；
  // 如：面积、价格等
  renderSpacialOne(key, index) {
    const keyData = this.intentionDetail[key] || {};
    let minValue = this.props.dataSource[index][keyData.minKey] || 0;
    let maxValue = this.props.dataSource[index][keyData.maxKey] || 0;
    const convert = this.intentionDetail[key].convert || null;
    if (convert && typeof convert === 'function') {
      minValue = convert(minValue);
      maxValue = convert(maxValue);
    }
    const realValue = this.switchStr(minValue, maxValue, keyData.cell, '-') || '';
    return this.renderOneDetail(key, index, keyData.labelName, realValue);
  }

  // 渲染一条意向详情
  renderOneDetail(key, index, label, value) {
    return (
      <View style={styles.listStyle} key={`intentions-${index}-${key}`}>
        <Text style={[baseStyles.colorF7e, baseStyles.fz16, { flex: 2 }]}>{label || ''}: </Text>
        <Text style={[baseStyles.colorA3a, baseStyles.fz16, { flex: 8 }]}>{value || ''}</Text>
      </View>
    );
  }

  render() {
    const items = this.props.dataSource || [];

    return (
      <ScrollView style={baseStyles.container} >
        {items.map((item, index) => this.renderOneIntention(index))}
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
