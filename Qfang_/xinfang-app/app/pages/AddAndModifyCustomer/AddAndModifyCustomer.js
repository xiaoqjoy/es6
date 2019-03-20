// 添加和编辑客户
// 1. react, react-native
// 2. npm 引入的包
// 3. common 目录中的包
// 4. utils 目录中的包
// 5. components目录中的包
// 6. 当前页自定义的其它组件包
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  DeviceEventEmitter,
  ActivityIndicator,
} from 'react-native';

import axios from 'axios';

import { toJS, set } from 'mobx';
import { observer } from 'mobx-react/native';
// 调用原生app模块
import { QFReactHelper, UMNative } from '../../common/NativeHelper';

import AddOrModifyCustomerStore from '../../stores/AddOrModifyCustomer';

import { screen, system } from '../../utils';

import Icon from '../../components/Icon/';
import baseStyles from '../../components/baseStyles';
import GoBack from '../../components/GoBack';

import IntentionItem from './IntentionItem';
import * as FilterData from '../../components/FilterBar/FilterData';

// webview 样式 和高度问题
@observer
class AddAndModifyCustomer extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: params.id ? '修改客户' : '添加客户',
      headerRight: (
        <TouchableOpacity style={{ paddingRight: 15 }} onPress={() => params.save()}>
          <Text style={styles.saveTxt}>保存</Text>
        </TouchableOpacity>
      ),
      headerLeft: (<GoBack
        navigation={navigation}
        onBackPress={() => params.navigateBack && params.navigateBack()}
      />),
    };
  };


  // 默认为新增客户状态

  constructor(props) {
    super(props);
    // this.isEdit = false;
    // 存在 params.id 则代表是修改客户
    this.isEdit = !!(props.navigation.state.params && props.navigation.state.params.id);

    this.addOrModifyCustomerStore = new AddOrModifyCustomerStore(this.props);


    this.intentionArrItem = {
      intentionAreaId: '',
      intentionAreaName: '',
      intentionCityId: '',
      intentionCityName: '',
      intentionCountyId: '',
      intentionCountyName: '',
      intentionGardenId: '',
      intentionGardenName: '',
      intentionId: '',
      layout: '',
      maxArea: 0,
      maxPrice: 0,
      minArea: 0,
      minPrice: 0,
    };
  }


  componentDidMount() {
    this.bar = [
      {
        text: '客户来源',
        field: 'customerSource',
        dataList: FilterData.getSource(),
      }, {
        text: '分组',
        field: 'customerGroupName',
        dataList: FilterData.getGroup(),
      },
    ];

    this.intentionItemBar = [
      {
        text: '户型',
        field: 'layout',
        dataList: FilterData.getHouseStyle(),
      },

      {
        text: '面积',
        field: 'Area', // 首字符大写 是为了后面拼接
        dataList: FilterData.getArea(),
        customData: {
          placeHolderLow: '最低面积',
          placeHolderHigh: '最高面积',
        },
      },
      {
        text: '价格',
        field: 'Price', // 首字符大写 是为了后面拼接
        dataList: FilterData.getPrice(),
        customData: {
          placeHolderLow: '最低价格',
          placeHolderHigh: '最高价格',
          unit: '万元',
        },
      },
    ];

    // 重新绑定后退按钮的事件
    this.props.navigation.setParams({
      save: this.save.bind(this),
      navigateBack: this.navigateBack.bind(this),
    });

    if (this.isEdit) {
      this.addOrModifyCustomerStore.getData();
    }

    // 组件获取值
    this.subField = DeviceEventEmitter.addListener('filterChoose', (data) => {
      if (!data.item) {
        // 城市区域那里需要处理
        return;
      }

      const { item, field } = data;
      const { submitParams } = this.addOrModifyCustomerStore;
      switch (field) {
        // 客户分组
        case 'customerGroupName':
          set(submitParams, {
            customerGroupId: item.key,
            customerGroupName: item.value,
          });
          break;
        default:
          // 来源发送 id显示str
          set(submitParams, {
            customerSource: item.key,
            customerSourceDesc: item.value,
          });
          break;
      }
    });
  }

  componentWillUnmount() {
    this.subField.remove();
  }

  navigateBack() {
    // 若存在 screenProps.expandId ，则代表当前添加页面是从原生 APP 中直接进入。
    // 若是直接从 APP 中进入的，当点击后退，则返回 APP。
    global.requestAnimationFrame(() => {
      if (this.props.screenProps.target === 'AddAndModifyCustomer') {
        QFReactHelper.navPop();
      } else {
        this.props.navigation.goBack();
      }
    });
  }

  // 保存客户
  save() {
    const { addOrModifyCustomerStore } = this;
    const { submitParams } = addOrModifyCustomerStore;
    const { customerIntentionList } = submitParams;
    // 防止重新请求
    if (addOrModifyCustomerStore.submit) {
      return;
    }

    if (!submitParams.customerName) {
      QFReactHelper.show('请输入客户姓名', 3);
      return;
    }

    if (!submitParams.id) {
      if (!(submitParams.phone) || !(/^(\d{11})$/).test(submitParams.phone)) {
        QFReactHelper.show('请输入11位手机号码', 3);
        return;
      }
    }

    if (!submitParams.customerSource) {
      QFReactHelper.show('请选择客户来源', 3);
      return;
    }

    let isHasTempIntention = false;
    let tempIntentionIndex = 0;

    customerIntentionList.forEach((item, index) => {
      let tmpIntentionFlag = true;
      Object.values(item).forEach((subItem) => {
        if (subItem) {
          tmpIntentionFlag = false;
        }
      });
      if (tmpIntentionFlag) {
        isHasTempIntention = true;
        tempIntentionIndex = index;
      }
    });

    if (isHasTempIntention) {
      if (tempIntentionIndex) {
        QFReactHelper.show(`第${tempIntentionIndex + 1}个意向为空，请补充或者删除！`, 3);
      } else {
        QFReactHelper.show('意向内容不能全部为空', 3);
      }
      return;
    }

    addOrModifyCustomerStore.changeSubmit(true);
    addOrModifyCustomerStore.changeLoading(true);

    const myParams = toJS(submitParams);

    // 删掉后台不要的字段，不然报错
    delete myParams.advisoryTime;
    delete myParams.registerDate;
    delete myParams.privateSourceStr;
    delete myParams.notFollowNum;
    delete myParams.customerSourceDesc;
    delete myParams.lastFollowDate;


    axios.post('customer/private/save', myParams)
      .then((res) => {
        addOrModifyCustomerStore.changeLoading(false);
        if (res.data.status === 'C0000') {
          let tipStr = '添加成功';
          let eventId = 'XF-CustomerList-AddCustomer';

          if (this.isEdit) {
            tipStr = '修改成功';
            eventId = 'XF-Customer-EditCustomer';
            DeviceEventEmitter.emit('customerDetailsRefresh');
          }
          if (this.props.screenProps.target !== 'AddAndModifyCustomer') {
            DeviceEventEmitter.emit('customerListRefresh');
          }
          UMNative.onEvent(eventId);

          QFReactHelper.show(tipStr, 3);
          this.props.navigation.state.params.navigateBack();
        } else {
          addOrModifyCustomerStore.changeSubmit(true);
          QFReactHelper.show(res.data.message, 3);
        }
      }).catch(() => {
        addOrModifyCustomerStore.changeLoading(false);
        addOrModifyCustomerStore.changeSubmit(false);
        QFReactHelper.show('服务器异常', 3);
      });
  }

  addIntention() {
    const { customerIntentionList } = this.addOrModifyCustomerStore.submitParams;
    if (customerIntentionList.slice().length === 4) {
      this.container.setNativeProps({
        style: {
          paddingBottom: 0,
        },
      });
    }

    customerIntentionList.push({ ...this.intentionArrItem });

    // 延时是因为 新增意向DOM操作 为异步
    setTimeout(() => {
      this.scrollView.scrollToEnd();
    }, 500);
  }


  deleteIntention(index) {
    const { customerIntentionList } = this.addOrModifyCustomerStore.submitParams;
    if (customerIntentionList.slice().length === 5) {
      this.container.setNativeProps({
        style: {
          paddingBottom: 40,
        },
      });
    }

    customerIntentionList.remove(customerIntentionList[index]);
  }

  render() {
    const { navigation } = this.props;
    const { params = {} } = navigation.state;
    const { bar, addOrModifyCustomerStore } = this;
    const { submitParams } = addOrModifyCustomerStore;

    return (
      <View
        ref={(c) => { this.container = c; }}
        style={[baseStyles.container, { paddingBottom: system.isIphoneX ? 64 : 44 }]}
      >
        <ScrollView ref={(c) => { this.scrollView = c; }} style={baseStyles.container} >
          {/* 基本信息 */}
          <View style={styles.formTitleBox}>
            <Text style={styles.formTitleTxt}>基本信息（必填）</Text>
          </View>
          <View style={styles.formBox}>
            {/* 姓名start */}
            <View style={styles.formItem}>
              <Text style={styles.paramTxt}>姓名<Text style={styles.impTxt}>*</Text>:</Text>
              <TextInput
                style={styles.formInput}
                maxLength={20}
                placeholder="输入客户姓名"
                placeholderTextColor="#a8a8a8"
                underlineColorAndroid="transparent"
                onChangeText={(text) => {
                  submitParams.customerName = text;
                }}
                defaultValue={submitParams.customerName}
              />
              <TouchableOpacity
                onPress={() => {
                  global.requestAnimationFrame(() => {
                    submitParams.customerName = '';
                  });
                }}
              >
                <Icon name="jiaocha" size={12} color="#7e7e7e" style={styles.clearIcon} />
              </TouchableOpacity>
            </View>
            {/* 姓名end */}

            {/* 手机号 修改不展示手机号start */}
            {!params.id ?
              <View style={[styles.formItem, styles.borderTop]}>
                <Text style={styles.paramTxt}>手机<Text style={styles.impTxt}>*</Text>:</Text>
                <TextInput
                  style={styles.formInput}
                  minLength={11}
                  maxLength={11}
                  placeholder="请输入11位数号码"
                  placeholderTextColor="#a8a8a8"
                  underlineColorAndroid="transparent"
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    submitParams.phone = text;
                  }}
                  value={submitParams.phone}
                />
                <TouchableOpacity
                  onPress={() => {
                    submitParams.phone = '';
                  }}
                >
                  <Icon name="jiaocha" size={12} color="#7e7e7e" style={styles.clearIcon} />
                </TouchableOpacity>
              </View>
              : null}
            {/* 手机号end */}

            {/* 来源start */}
            <TouchableOpacity
              onPress={() => {
                if (submitParams.customerSourceDesc !== '集团分配') {
                  navigation.navigate('FilterView', {
                    entityList: bar[0].dataList,
                    customData: bar[0].customData,
                    field: bar[0].field,
                    title: '客户来源',
                  });
                }
              }}
            >
              <View style={[styles.formItem, styles.borderTop]}>
                <Text style={styles.paramTxt}>来源<Text style={styles.impTxt}>*</Text>:</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="选择客户来源"
                  placeholderTextColor="#a8a8a8"
                  underlineColorAndroid="transparent"
                  editable={false}
                  value={submitParams.customerSourceDesc}
                />
                {
                  submitParams.customerSourceDesc !== '集团分配' ? (
                    <Icon name="arrow-right" size={16} color="#a8a8a8" style={styles.rightIcon} />

                  ) : null
                }
              </View>
            </TouchableOpacity>
            {/* 来源end */}
            {/* 分组start */}
            <TouchableOpacity
              onPress={() => navigation.navigate('FilterView', {
                entityList: bar[1].dataList,
                customData: bar[1].customData,
                field: bar[1].field,
                title: '客户分组',
              })}
            >
              <View style={[styles.formItem, styles.borderTop]}>
                <Text style={styles.paramTxt}>分组:</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="选择分组"
                  placeholderTextColor="#a8a8a8"
                  underlineColorAndroid="transparent"
                  editable={false}
                  value={this.addOrModifyCustomerStore.submitParams.customerGroupName}
                />
                <Icon name="arrow-right" size={16} color="#a8a8a8" style={styles.rightIcon} />
              </View>
            </TouchableOpacity>
            {/* 分组：end */}

            {/* 备注start */}
            <View style={[styles.formItem, styles.borderTop, { height: 'auto', paddingVertical: 20, marginRight: 15 }]}>
              <Text style={[styles.paramTxt, { height: 50, paddingTop: 5 }]}>备注:</Text>
              <TextInput
                style={[styles.formInput, { alignSelf: 'flex-start', height: 50, textAlignVertical: 'top' }]}
                multiline
                maxLength={60}
                placeholder="可输入60个字"
                placeholderTextColor="#a8a8a8"
                underlineColorAndroid="transparent"
                onChangeText={(text) => {
                  submitParams.remark = text;
                }}
                value={submitParams.remark}
              />
            </View>
            {/* 备注end */}
          </View>
          {/* 客户意向 */}
          {
            submitParams.customerIntentionList.slice().map((item, index) => (
              <View key={Math.random()} >
                <View style={styles.intentionTitleContainer} >
                  <Text style={styles.formTitleTxt}>
                    客户意向
                    {index ? index + 1 : ''}
                  </Text>
                  {
                    submitParams.customerIntentionList.slice().length !== 1 ?
                      <TouchableOpacity
                        style={styles.deleteBtn}
                        onPress={() => { this.deleteIntention(index); }}
                      >
                        <Text style={[baseStyles.fz14, baseStyles.colorF91]}>删除</Text>
                      </TouchableOpacity>
                      : null
                  }

                </View>
                <IntentionItem
                  intentionItemObj={item}
                  index={index}
                  intentionItemBar={this.intentionItemBar}
                  navigation={this.props.navigation}
                  parent={this}
                />
              </View>

            ))
          }


          {addOrModifyCustomerStore.loading ?
            (
              <View style={styles.overlay} >
                <ActivityIndicator size="large" color="white" style={{ marginTop: -150 }} />
              </View>
            )
            : null}
        </ScrollView>
        {
          submitParams.customerIntentionList.slice().length < 5 ?

            <TouchableOpacity
              style={styles.addIntentionBtn}
              onPress={() => {
                this.addIntention();
              }}
            >
              <View style={styles.addIntentionContainer}>
                <Text style={{ color: '#fff', fontSize: 14 }}>添加客户意向</Text>
              </View>
            </TouchableOpacity>
            : null
        }
      </View >
    );
  }
}

const styles = StyleSheet.create({
  saveTxt: {
    color: '#3a3a3a',
    fontSize: 16,
  },
  formTitleBox: {
    margin: 15,
  },
  intentionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    paddingVertical: 10,
  },
  formTitleTxt: {
    fontSize: 16,
    color: '#a8a8a8',
  },
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
  clearIcon: {
    padding: 18,
    paddingRight: 17,
  },
  rightIcon: {
    paddingRight: 15,
  },
  impTxt: {
    color: '#ff0000',
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
  overlay: {
    justifyContent: 'center',
    backgroundColor: '#999',
    opacity: 0.4,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    elevation: 99,
  },
  addIntentionBtn: {
    position: 'absolute',
    bottom: 0,
    width: screen.width,
    height: system.isIphoneX ? 64 : 44,
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#e7e8ea',
  },
  addIntentionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff9911',
    height: 44,
  },
  deleteBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#e7e8ea',
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export default AddAndModifyCustomer;
