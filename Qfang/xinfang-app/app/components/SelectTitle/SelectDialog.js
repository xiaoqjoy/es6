// 展示字段 为 selectDialogName, 记得 传进来的 selectData 里要有

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { screen } from '../../utils';

export default class SelectDialog extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filterData: [],
    };
    this.dialogSwitch = true;
  }

  componentDidMount() {
    // 在static navigationOptions中使用this方法
    const { parent } = this.props;

    /* 添加定时器 是因为 该组件的父组件 如果也在componentDidMount函数内，
     * 调用navigation.setParams。 会导致 冲突；
    */
    this.timer = setTimeout(() => {
      parent.props.navigation.setParams({
        filterViewShow: this.filterViewShow.bind(this),
      });
    }, 300);
  }

  componentWillReceiveProps(data) {
    // selectData 数据为异步传入过来时，第一次接收到为 undefined

    if (!data.selectData) {
      return;
    }

    // const filterData = data.selectData || [];
    this.state.filterData = data.selectData || [];
    // this.setState({
    //   filterData,
    // });
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  filterViewShow(val) {
    const { parent } = this.props;
    if (this.dialogSwitch) {
      this.selectRef.setNativeProps({
        style: {
          left: 0,
        },
      });
    } else {
      this.selectRef.setNativeProps({
        style: {
          left: -999,
        },
      });
    }
    this.dialogSwitch = !this.dialogSwitch;

    // setParams 连续设置2次 以第二次 生效
    if (val) {
      this.selectRef.setNativeProps({
        style: {
          left: -999,
        },
      });
      parent.props.navigation.setParams({
        defaultTitle: val.selectDialogName,
        triangleDirection: !parent.props.navigation.state.params.triangleDirection,
      });
      parent.filterDo(val); // 让使用该组件的父组件自己去处理页面刷新内容的事情
    } else {
      parent.props.navigation.setParams({
        triangleDirection: !parent.props.navigation.state.params.triangleDirection,
      });
    }
  }

  filterViewClose() {
    const { parent } = this.props;
    this.selectRef.setNativeProps({
      style: {
        left: -999,
      },
    });
    this.dialogSwitch = true;
    parent.props.navigation.setParams({
      triangleDirection: !parent.props.navigation.state.params.triangleDirection,
    });
  }

  filterviewEle() {

  }


  render() {
    const { filterData } = this.state;

    return (
      <View style={styles.container} ref={(c) => { this.selectRef = c; }}>
        {
          filterData.length ?
            (
              <ScrollView
                bounces={false}
                style={{ width: '100%' }}
              >
                {/* 遮罩层底部的按钮，点击关闭遮罩层 */}
                <TouchableOpacity
                  style={styles.pressContainer}
                  onPress={() => {
                    this.filterViewClose();
                  }}
                />
                {/* 遮罩层列表容器 */}
                <View style={styles.listContainer}>
                  {
                    filterData.map((val) => (
                      <TouchableOpacity
                        key={Math.random()}
                        style={styles.listItem}
                        onPress={() => {
                          this.filterViewShow(val);
                        }}
                      >
                        <Text style={{ fontSize: 16, color: '#3a3a3a' }}>{val.selectDialogName}</Text>
                      </TouchableOpacity>
                    ))
                  }
                </View>
              </ScrollView>
            )
            : null
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: screen.height - 60,
    zIndex: 900,
    left: -999,
  },
  pressContainer: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#000',
    opacity: 0.3,
    width: '100%',
    height: screen.height - 60,
    flex: 1,
    zIndex: 991,
  },
  listContainer: {
    width: '100%',
    backgroundColor: '#fff',
    zIndex: 999,
    paddingVertical: 10,
  },
  listItem: {
    height: 46,
    width: '100%',
    marginLeft: 15,
    justifyContent: 'center',
    borderColor: '#e7e8ea',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerTitle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

