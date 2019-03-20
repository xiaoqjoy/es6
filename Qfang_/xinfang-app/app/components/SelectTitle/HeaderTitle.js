import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { system } from '../../utils';

export default class headerTitle extends PureComponent {
  render() {
    const { params = {} } = this.props;
    return (
      <TouchableOpacity
        style={styles.headerTitle}
        onPress={() => {
          params.filterViewShow();
        }}
      >
        <Text style={styles.headerTitleText}>
          {params.defaultTitle}
        </Text>
        {
          params.triangleDirection ?
            <View style={[styles.triangleUp, { marginLeft: 5 }]} />
            :
            <View style={[styles.triangleDown, { marginLeft: 5 }]} />
        }
      </TouchableOpacity >
    );
  }
}
const styles = StyleSheet.create({
  headerTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 屏幕顶部navigation内部的headerTitle文字样式
  headerTitleText: {
    color: '#3a3a3a',
    fontSize: 18,
  },
  // 小三角
  triangleUp: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderBottomWidth: 8,
    borderBottomColor: '#3a3a3a',
  },
  triangleDown: {
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderLeftColor: 'transparent',
    borderRightWidth: 5,
    borderRightColor: 'transparent',
    borderTopWidth: 8,
    borderTopColor: '#3a3a3a',
  },
});
