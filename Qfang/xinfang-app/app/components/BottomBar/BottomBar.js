/**
 * Created by yoara on 2017/6/14.
 */

/**
 * BottomBar组件接受按钮参数，可为按钮自定义显示、行为等
 * props:
 *  items:数组对象，格式如下：
 *       icon:图标
 *       redPoint:红点提示，暂时为number类型，后期可以改为布尔
 *       text:文字描述
 *       textColor:文字默认颜色
 *       func:点击回调函数
 *       events:弹出框事件触发机制，包括三类事件tel,sms,func回调函数
 *            name:姓名
 *            phone:电话
 *            showContent:弹出框现实内容，不填则显示[（电话） 姓名]
 *            type:(tel/sms/func)
 *            func:仅当type为func类型时，才会执行的回调函数
 */
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import * as Constants from '../../common/Constants';
import { system } from '../../utils';
import Icon from '../Icon/';
import BottomEvent from './BottomEvent';

export default class BottomBar extends PureComponent {
  constructor() {
    super();
    this.state = {
    };
  }

  componentWillMount() {
    this.props.items.forEach((item, index) => {
      this.state[`${index}active`] = false;
    });
  }


  // item被点击后触发函数
  onPress(activeIndex, item) {
    this.active(activeIndex);
    if (item.func != null) {
      item.func();
    }
    if (item.events != null) {
      this.bottomEvent.show(item.text, item.events);
    }
  }

  // 激活效果
  active(activeIndex) {
    const active = {};
    this.props.items.forEach((item, index) => {
      active[`${index}active`] = false;
    });

    active[activeIndex] = true;
    this.setState(active);
  }

  renderRedPoint(count) {
    if (count === 0) {
      return null;
    }
    return (
      <View style={styles.redPoint}>
        <Text style={{ fontSize: 10, color: '#ffa200' }}>{count > 99 ? '99' : count}</Text>
      </View>
    );
  }


  render() {
    return (
      <View>
        <View style={styles.container}>
          {
            this.props.items.map((item, index) => {
              const refIndex = `${index}icon`;
              const activeIndex = `${index}active`;
              const textColor = item.textColor ? item.textColor : '#3a3a3a';
              return (
                <TouchableHighlight
                  key={Math.random()}
                  underlayColor="#f0f0f0"
                  onPress={() => this.onPress(activeIndex, item)}
                >
                  <View style={styles.item}>
                    {item.redPoint ? this.renderRedPoint(item.redPoint) : null}
                    <Icon
                      ref={refIndex}
                      style={styles.itemIcon}
                      name={item.icon}
                      size={20}
                      color={this.state[activeIndex] ? '#ffa200' : textColor}
                    />
                    <Text style={[styles.itemText, this.state[activeIndex] && styles.itemTextActive]}>{item.text}</Text>
                  </View>
                </TouchableHighlight>
              );
            })
          }
        </View>
        <BottomEvent ref={(c) => { this.bottomEvent = c; }} />
      </View>
    );
  }
}
const bottomBarHeight = Constants.STANDARD_HEIGHT * 0.08;

const styles = StyleSheet.create({
  container: {
    height: system.isIphoneX ? bottomBarHeight + 20 : bottomBarHeight,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#b4b4b4',
    backgroundColor: '#fff',
    ...system.isIphoneX ? { paddingBottom: 20 } : {},
  },
  item: {
    position: 'relative',
    alignItems: 'center',
    width: 60,
  },
  redPoint: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 15,
    height: 15,
    borderRadius: 15,
    borderColor: '#ffa200',
    borderWidth: StyleSheet.hairlineWidth,
  },
  itemIcon: {
    marginBottom: Constants.STANDARD_HEIGHT * 0.008,
  },
  itemText: {
    fontSize: 10,
    color: '#7e7e7e',
  },
  itemTextActive: {
    color: '#ffa200',
  },
});
