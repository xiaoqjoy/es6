import React, { PureComponent } from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import screen from '../../utils/screen';
import Icon from '../../components/Icon/';
//设定内置的属性 选中项，例如：_type_0_2 表示第一个Tab选中，并且第二个Tab中的第三项选中
var prefixType = '_type_';

//选中项样式，例如：_style_0_2 表示第一个Tab选中，并且第二个Tab中的第三项选中时的样式
var prefixStyle = '_style_';

//默认左侧选中的背景颜色
var defaultBackgroundColor = {
  backgroundColor: '#fff'
};

var FilterTab = React.createClass({
  getInitialState: function () {
    var data = this.props.data;
    //左侧选择的index
    var nSelected = this.props.nSelected;
    //头部选择的index
    var tabSelected = this.props.tabSelected;
    var obj = {};
    var kIndex = 0;
    for (var k in data) {
      var childData = data[k];
      var cIndex = 0;
      for (var c in childData) {
        var type = prefixType + k + '_' + c;
        var style = prefixStyle + k + '_' + c;
        obj[type] = false;
        obj[style] = {};
        //设定默认选中项
        if (nSelected === cIndex && tabSelected === kIndex) {
          obj[type] = true;
          obj[style] = defaultBackgroundColor;
        }
        cIndex++;
      }
      kIndex++;
    }
    obj.tabSelected = tabSelected;
    obj.nSelected = nSelected;
    return obj;
  },

  render: function () {
    var header = this.renderlHeader();
    var left = this.renderLeft();
    var right = this.renderRight();

    var data = this.props.data;
    var singleTab = this.props.singleTab.tab;
    var renderSingle;

    if (this.state.tabSelected == -1) {
      return (
        <View style={[styles.container, { height: screen.height * 0.06 }]} ref={(c) => this._refContainer = c}>
          <View style={[styles.row, styles.header]}>
            {header}
          </View>
        </View>
      );
    }

    if (singleTab.indexOf('' + this.state.tabSelected) > -1) {
      let index = 0;
      for (let i in data) {
        if (index === this.state.tabSelected) {
          renderSingle = data[i].render;
        }
        index++;
      }
    }

    if (renderSingle) {
      let single = renderSingle(styles, this.rightPress);
      return (
        <View style={[styles.container]} ref={(c) => this._refContainer = c}>
          <View style={[styles.row, styles.header]}>
            {header}
          </View>
          <View
            ref={(c) => this._refView = c}
            style={[styles.row, styles.flex_1, styles.footer, { paddingLeft: 0 }]}>
            <ScrollView style={[styles.flex_1]}>{single}</ScrollView>
          </View>
          <TouchableOpacity
            activeOpacity={0}
            style={styles.opacity}
            onPress={() => this.setState({ tabSelected: -1 })}></TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.container} ref={(c) => this._refContainer = c}>
          <View style={[styles.row, styles.header]}>
            {header}
          </View>
          <View
            ref={(c) => this._refView = c}
            style={[styles.row, styles.flex_1, styles.footer]}>
            <ScrollView style={[styles.flex_1, styles.left_pannel, { height: screen.height * 0.495  }]}>
              {left}
            </ScrollView>
            <ScrollView style={[styles.flex_1, styles.right_pannel, { height: screen.height * 0.495 }]}>
              {right}
            </ScrollView>
            <View style={[styles.row, styles.button]}>
              <TouchableOpacity style={[styles.queryButton, styles.reset]} onPress={this.cancelPress.bind(null, 'resetBtn')}>
                <Text style={styles.cancelText} id={'resetBtn'}>重置</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.queryButton, styles.ensure]} onPress={this.ensurePress.bind(null, 'ensureBtn')}>
                <Text style={styles.ensureText} id={'ensureBtn'}>确定</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0}
            style={styles.opacity}
            onPress={() => this.setState({ tabSelected: -1 })}></TouchableOpacity>
        </View>
      );
    }
  },

  //渲染头部TabBar
  renderlHeader: function () {
    var data = this.props.data;
    var tabSelected = this.state.tabSelected;
    var header = [];
    var tabIndex = 0;
    for (var i in data) {
      var tabStyle = null;
      if (tabIndex === tabSelected) {
        tabStyle = [styles.header_text, styles.active_blue];
      } else {
        tabStyle = [styles.header_text];
      }

      let iconName = tabSelected === tabIndex
        ? 'triangle-up'
        : 'triangle-down';
      let iconColor = tabSelected === tabIndex
        ? '#f91'
        : '#a8a8a8';
      let currentText = '';
      let headerWidth = '';
      if (tabIndex === 0) {
        currentText = this.props.parent.params && this.props.parent.params.cityName
          ? this.props.parent.params.cityName
          : i;
      } else if (tabIndex === 2) {
        currentText = this.props.parent.params && this.props.parent.params.sortName
          ? this.props.parent.params.sortName
          : i;
        currentText = currentText.length > 6 ? currentText.substring(0, 6) + '...' : currentText;
      } else {
        currentText = i;
      }

      header.push(
        <TouchableOpacity
          style={[styles.flex_1, styles.row, styles.center]}
          key={i}
          onPress={this
            .headerPress
            .bind(null, i)}>
          <Text numberOfLines={1}>{currentText}</Text><Icon ref='iconRef' name={iconName} size={18} color={iconColor} />
        </TouchableOpacity>
      );
      tabIndex++;
    }
    return header;
  },

  //渲染左侧
  renderLeft: function () {
    var data = this.props.data;
    var tabSelected = this.state.tabSelected;
    var leftPannel = [];
    var index = 0;
    for (var i in data) {
      if (index === tabSelected) {
        for (var k in data[i]) {
          var style = this.state[prefixStyle + i + '_' + k];
          let hightLight = '#3a3a3a';
          if (this.state['_type_区域_区域'] && k === '区域') {
            hightLight = '#f91';
          } else if (this.state['_type_区域_类型'] && k === '类型') {
            hightLight = '#f91';
          } else if (this.state['_type_区域_均价'] && k === '均价') {
            hightLight = '#f91';
          } else if (this.state['_type_区域_状态'] && k === '状态') {
            hightLight = '#f91';
          }

          leftPannel.push(
            <TouchableOpacity onPress={this.leftPress.bind(null, i, k)} style={[styles.singleRow]} key={k}>
              <Text style={[styles.left_row, { color: hightLight }]}>{k}</Text>
            </TouchableOpacity>
          );
        }
        break;
      }
      index++;
    }
    return leftPannel;
  },
  //渲染右边，二级菜单
  renderRight: function () {
    var data = this.props.data;
    var tabSelected = this.state.tabSelected;
    var nSelected = this.state.nSelected;
    var index = 0;
    var rightPannel = [];
    for (let i in data) {
      if (tabSelected === index) {
        for (let k in data[i]) {
          if (this.state[prefixType + i + '_' + k]) {
            for (let j in data[i][k]) {
              let currentHight = this.props.parent.params;
              let hight = currentHight[data[i][k][j].key] === data[i][k][j].id
                ? styles.active_blue
                : {
                  color: '#3a3a3a'
                };
              rightPannel.push(
                <TouchableOpacity
                  style={styles.rightSingleRow}
                  key={j}
                  onPress={
                    this.rightPress.bind(null, {
                      text: k,
                      data: {
                        id: data[i][k][j].id,
                        name: data[i][k][j].text,
                        key: data[i][k][j].key
                      }
                    })
                  }>
                  <Text style={[styles.left_row, hight]}>{data[i][k][j].text}</Text>
                </TouchableOpacity>
              );
            }
            break;
          }
        }
      }
      index++;
    }
    return rightPannel;
  },

  rightPress: function (val) {
    if (val.type === 'city' || val.type === 'sort') {
      this.setState({ tabSelected: -1 });
    }
    this.props.click.call(this, val);
  },

  ensurePress: function () {
    let params = this.props.parent.params;
    let _this = this;
    this.setState({ tabSelected: -1 });
    //刷新楼盘列表
    let gardenAll = this.props.parent.props.parent;
    gardenAll.params = Object.assign(gardenAll.params,params);
    gardenAll.listView.refresh();
    if (gardenAll.listView.getRows().length > 0) {
      gardenAll.listView.scrollToIndex({ animated: false, viewPosition: 0, index: 0 });
    }
  },

  cancelPress: function () {
    let _this = this;
    let currentComponent = this.props.parent;
    let cityId = currentComponent.params.cityId;
    let cityName = currentComponent.params.cityName;
    let orderBy = currentComponent.params.orderBy;
    let sort = currentComponent.params.sort;
    let sortName = currentComponent.params.sortName;
    currentComponent.params = {
      cityId: cityId,
      orderBy: orderBy,
      sort: sort,
      sortName: sortName,
      cityName: cityName
    };
    this.setState({ tabSelected: -1 });
    //刷新楼盘列表
    let gardenAll = currentComponent.props.parent;
    gardenAll.params = currentComponent.params;
    gardenAll.listView.refresh();
    if (gardenAll.listView.getRows().length > 0) {
      gardenAll.listView.scrollToIndex({ animated: false, viewPosition: 0, index: 0 });
    }
  },

  //点击左侧，展示右侧二级菜单
  leftPress: function (tabIndex, nIndex) {
    var obj = {};
    for (var k in this.state) {
      //将prefixType或者prefixStyle类型全部置false
      if (k.indexOf(prefixType) > -1) {
        var obj = {};
        obj[k] = false;
        this.setState(obj);
      }
      if (k.indexOf(prefixStyle) > -1) {
        var obj = {};
        obj[k] = {};
        this.setState(obj);
      }
    }
    obj[prefixType + tabIndex + '_' + nIndex] = true;
    obj[prefixStyle + tabIndex + '_' + nIndex] = defaultBackgroundColor;
    this.setState(obj);
  },
  //头部点击事件即Tab切换事件
  headerPress: function (title) {

    if (this.state.tabSelected != -1) {
      this.setState({ tabSelected: -1 });
    } else {
      var data = this.props.data;
      var index = 0;
      for (var i in data) {
        if (i === title) {
          this.setState({ tabSelected: index });
          var obj = {};
          var n = 0;
          for (var k in data[i]) {
            if (n !== 0) {
              obj[prefixType + i + '_' + k] = false;
              obj[prefixStyle + i + '_' + k] = {};
            } else {
              obj[prefixType + i + '_' + k] = true;
              obj[prefixStyle + i + '_' + k] = defaultBackgroundColor;
            }
            n++;
          }
          this.setState(obj);
        }
        index++;
      }
    }
  }
});

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10001,
    width: screen.width,
    height: screen.height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  footer: {
    backgroundColor: '#fff',
    position: 'absolute',
    zIndex: 10001,
    top: screen.height * 0.06,
    width: screen.width,
    height: screen.height * 0.55
  },
  header: {
    height: screen.height * 0.06,
    backgroundColor: '#fafafa',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#dedfe0'
  },
  button: {
    position: 'absolute',
    zIndex: 10001,
    bottom: 0,
    flexDirection: 'row'
  },
  opacity: {
    top: screen.height * 0.55,
    height: screen.height - screen.height * 0.55
  },
  row: {
    flexDirection: 'row'
  },
  flex_1: {
    flex: 1
  },
  header_text: {
    color: '#3a3a3a',
    fontSize: 14
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  left_pannel: {
    paddingLeft: 15
  },
  left_row: {
    fontSize: 16,
    color: '#3a3a3a'
  },
  right_pannel: {
    backgroundColor: '#f2f2f6',
    paddingLeft: 15
  },
  active_blue: {
    color: '#f91'
  },
  active_fff: {
    backgroundColor: '#fff'
  },
  singleRow: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#eaeaea',
    height: screen.height * 0.055,
    justifyContent: 'center'
  },
  rightSingleRow: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    flex: 1,
    height: screen.height * 0.055,
    borderColor: '#eaeaea',
    justifyContent: 'center'
  },
  ensureText: {
    fontSize: 16,
    color: '#fff'
  },
  cancelText: {
    fontSize: 16,
    color: '#333'
  },
  queryButton: {
    width: screen.width / 2,
    height: screen.height * 0.055,
    justifyContent: 'center',
    alignItems: 'center'
  },
  reset: {
    backgroundColor: '#f5f5f9',
  },
  ensure: {
    backgroundColor: '#f91',
  }
});

module.exports = FilterTab;
