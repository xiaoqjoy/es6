
import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Modal,
} from 'react-native';

import { screen } from '../utils';
import Icon from '../components/Icon/';

const statusText = {
  'no-data-found': '暂无数据',
  'request-failed': '服务请求失败\n请稍后再试',
  'network-error': '当前网络异常\n请检查您的网络',
};

export default class StatusView extends PureComponent {
  render() {
    const { status, page } = this.props;

    // 页面应用
    if (page) {
      if (!status) { // 像 linux命令行 一样，不传值 即表示成功
        return null;
      }

      if (status === 'loading') {
        return (
          <View style={[styles.pageLoadingContainer]}>
            <ActivityIndicator
              style={[styles.pageLoading, this.props.styles]}
              size="small"
              color="#ccc"
              animating
            />
          </View>
        );
      }

      return (
        <View style={[styles.errorWrapper, { height: screen.height }, this.props.styles]}>
          <Icon name={status} size={60} color="#d6d7da" />
          <Text style={styles.errorText}>{statusText[status]}</Text>
        </View>
      );
    }

    // 列表应用
    if (!status) {
      return (<ActivityIndicator
        style={[{ height: 40, backgroundColor: '#f5f5f9', transform: [{ scale: 1.2 }] }, this.props.styles]}
        size="small"
        color="#ccc"
        animating
      />);
    }
    return (
      <View style={styles.errorWrapper}>
        <Icon name={status} size={60} color="#d6d7da" />
        <Text style={styles.errorText}>{statusText[status]}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageLoadingContainer: {
    backgroundColor: 'rgba(56, 56, 56, .8)',
    justifyContent: 'center',
    position: 'absolute',
    width: screen.width,
    height: screen.height,
    left: 0,
    top: 0,
    zIndex: 99,
    elevation: 99,
  },
  pageLoading: {
    height: screen.height,
    transform: [{ scale: 1.2 }],
  },
  errorWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '70%',
  },
  errorText: {
    color: '#d6d7da',
    textAlign: 'center',
    lineHeight: 20,
  },
});
