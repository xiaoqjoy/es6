import React, { PureComponent } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Linking,
  DeviceEventEmitter,
} from 'react-native';
import axios from 'axios';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';

import { QFReactHelper, UMNative } from '../../common/NativeHelper';
import UserInfo from '../../common/UserInfo';

import DialogBox from '../../components/react-native-dialogbox';

import BottomBar from '../../components/BottomBar/BottomBar';
import GoBack from '../../components/GoBack';

import Deal from './Deal';
import FollowUp from './FollowUp';
import LookWith from './LookWith';
// import Material from './Material';
import Intentions from './Intentions';
import Reported from './Reported';

import baseStyles from '../../components/baseStyles';
import Icon from '../../components/Icon';

// import placeholderImage from '../../assets/img/head.png';


let selectToggleFlag = false;

export default class customerDetails extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: '客户详情',
      headerLeft: (<GoBack navigation={navigation} onBackPress={() => params.navigateBack && params.navigateBack()} />),
      headerRight: (
        <TouchableOpacity onPress={() => { params.selectToggle(); }} style={{ paddingHorizontal: 15, paddingVertical: 10 }}>
          <Text style={{ fontSize: 25 }}>&#8230;</Text>
        </TouchableOpacity>
      ),
    };
  }

  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      toPublicSubmitFlag: true, // 转公 navigation
      id: params.privateCustomerId || params.id, // 原生和 rn传来的参数命名不一致
      customerId: params.customerId,
      phone: params.phone,
      intentionsCount: 0,
      dataSource: {
        customerIntentionList: [],
      },
      customerCount: {}, // 报备、带看、成交 、客服 跟进 总数
      followContent: '', // 添加跟进内容
      followSubmitFlag: false,
      showHeadDetail: true, // 是否显示顶部私客详情，用户滚动ScrollView时需要隐藏或显示此部分内容
    };
  }


  componentDidMount() {
    this.props.navigation.setParams({
      selectToggle: this.selectToggle.bind(this),
      navigateBack: this.navigateBack.bind(this),
    });

    // 修改资料后重新刷新客户信息
    this.subRefresh = DeviceEventEmitter.addListener(
      'customerDetailsRefresh',
      this.requestData.bind(this),
    );

    // 报备和带看请求到数据时更新tab上的数量总数
    this.tabCountDataFresh = DeviceEventEmitter.addListener(
      'tabCountDataFresh',
      (params) => {
        const { customerCount } = this.state;

        if (params.type === 'reported') {
          this.setState({
            customerCount: { ...customerCount, reservationCount: params.countData },
          });
        } else if (params.type === 'lookWith') {
          this.setState({
            customerCount: { ...customerCount, guideCount: params.countData },
          });
          // } else if (params.type === 'followUp') {
          //   this.setState({
          //     customerCount: { ...customerCount, bargainCount: params.countData },
          //   });
        } else if (params.type === 'customServiceFollowUp') {
          this.setState({
            customerCount: { ...customerCount, followRecords: params.countData },
          });
        }
      },
    );

    this.requestData(); // 获取私客详情
  }

  componentWillUnmount() {
    // 移除
    this.subRefresh.remove();
    this.tabCountDataFresh.remove();
  }


  onRequestClose() {
    this.setState({
      reportedText: '',
    });
  }


  getHeadDetailView() {
    if (!this.state.showHeadDetail) return null;
    const details = {
      customerSourceDesc: '来源',
      customerGroupName: '分组',
      advisoryTime: {
        label: '咨询日期',
        convert: (date) => (date ? date.substring(0, 10) : ''),
      },
      remark: '备注',
    };
    return (
      <View style={styles.headDetail}>
        {Object.keys(details).map((key) => (
          <View style={styles.detailTextView} key={`details-${key}`}>
            <Text style={[key === 'remark' ? styles.detailRemarkLabel : styles.detailLabelText, baseStyles.fz12]}>{this.getLabel(key, details)}:</Text>
            {/* 备注（remark）内容长度不固定，需要加一个特殊的style, styles.longDetailText */}
            <Text style={[styles.normalDetailText, key === 'remark' ? styles.longDetailText : {}, baseStyles.fz12]}>
              {this.getDetail(key, details) || ''}
            </Text>
          </View>
        ))}
      </View>
    );
  }

  getLabel(key, details) {
    if (typeof details[key] === 'string') {
      return details[key];
    } else if (this.isObject(details[key])) {
      return details[key].label;
    }
    return '';
  }

  getDetail(key, details) {
    if (typeof details[key] === 'string') {
      return this.state.dataSource[key] || '';
    } else if (this.isObject(details[key])) {
      return details[key].convert(this.state.dataSource[key]);
    }
    return '';
  }

  navigateBack() {
    // 若存在 screenProps.privateCustomerId ，则代表当前详情页是从原生 APP 中直接进入。
    // 若是直接从 APP 中进入的，当点击后退，则返回 APP。
    global.requestAnimationFrame(() => {
      if (this.props.screenProps.target === 'customerDetail') {
        QFReactHelper.navPop();
      } else {
        this.props.navigation.goBack();
      }
    });
  }

  // 判断是否为对象
  isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }

  // 添加跟进弹窗
  reportedEntry() {
    const _this = this;
    this.dialogbox.confirm({
      title: '添加跟进',
      content: (
        <View style={styles.reportedEntryPop}>
          <TextInput
            onChangeText={(value) => {
              this.setState({ followContent: value });
            }}
            placeholder="请输入跟进信息"
            placeholderTextColor="#a8a8a8"
            style={styles.reportedEntryPopInput}
            maxLength={100}
            multiline
          />
        </View>
      ),
      cancel: {
        text: '取消',
        style: {
          color: '#3a3a3a',
          fontSize: 14,
        },
      },
      ok: {
        text: '提交',
        style: {
          color: '#ffa200',
          fontSize: 14,
        },
        callback: () => {
          if (!this.state.followContent) {
            QFReactHelper.show('跟进信息不能为空', 3);
          }

          if (!this.state.followSubmitFlag) {
            this.setState({
              followSubmitFlag: true,
            });

            axios.get('customer/private/saveFollow', {
              params: {
                id: this.state.id,
                customerId: this.state.customerId,
                content: this.state.followContent,
              },
            }).then((res) => {
              if (res.data.status === 'C0000') {
                QFReactHelper.show('跟进成功!', 3);
                this.dialogbox.close();
                DeviceEventEmitter.emit('refreshFollowData'); // 刷新跟进列表
                if (this.state.dataSource.customerSourceDesc === '集团分配') {
                  // DeviceEventEmitter.emit('customerListRefresh'); // 刷新客列表
                  DeviceEventEmitter.emit(this.props.navigation.state.params.eventName); // 刷新客列表的item
                }
                UMNative.onEvent('XF-Customer-FollowUp');
              } else {
                QFReactHelper.show(res.data.message);
              }

              this.setState({
                followSubmitFlag: false,
              });
            }).catch((error) => {
              console.log('error=', error);
              this.setState({
                followSubmitFlag: false,
              });

              QFReactHelper.show('服务器异常', 3);
            });
          }
        },
      },
    });
  }

  // 私客转公客
  turnPublic() {
    this.dialogbox.confirm({
      content: (
        <View style={{ height: 60, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={[baseStyles.fz20, { fontWeight: 'bold' }, baseStyles.colorA3a]}>确定要转为公客吗？</Text>
        </View>
      ),
      cancel: {
        text: '取消',
        style: {
          color: '#3a3a3a',
          fontSize: 14,
        },
      },
      ok: {
        text: '确定',
        style: {
          color: '#ffa200',
          fontSize: 14,
        },
        callback: () => {
          if (this.state.toPublicSubmitFlag) {
            this.setState({
              toPublicSubmitFlag: false,
            });
            axios.get('customer/private/toPublic', {
              params: {
                id: this.state.id,
              },
            }).then((res) => {
              if (res.data.status === 'C0000') {
                QFReactHelper.show('成功转为公客', 2);
                this.dialogbox.close();

                DeviceEventEmitter.emit('customerListRefresh');
                setTimeout(() => {
                  // this.props.navigation.goBack();
                  this.navigateBack();
                }, 1500);

                UMNative.onEvent('XF-Customer-PrivateToPublic');
                this.setState({
                  toPublicSubmitFlag: false,
                });
              } else {
                this.setState({
                  toPublicSubmitFlag: true,
                });

                QFReactHelper.show(res.data.message, 3);
              }
            }).catch((error) => {
              console.log('error=', error);
              this.setState({
                followSubmitFlag: true,
              });

              QFReactHelper.show('服务器异常', 3);
            });
          }
        },
      },
    });
  }

  // 无效驳回
  rebut() {
    this.dialogbox.confirm({
      content: (
        <View style={{ height: 60, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={[baseStyles.fz20, { fontWeight: 'bold' }, baseStyles.colorA3a]}>确定要驳回吗？</Text>
        </View>
      ),
      cancel: {
        text: '取消',
        style: {
          color: '#3a3a3a',
          fontSize: 14,
        },
      },
      ok: {
        text: '确定',
        style: {
          color: '#ffa200',
          fontSize: 14,
        },
        callback: () => {
          axios.get('customer/private/reject', {
            params: {
              privateCustomerId: this.state.id,
            },
          }).then((res) => {
            if (res.data.status === 'C0000') {
              QFReactHelper.show('成功驳回', 2);
              this.dialogbox.close();

              DeviceEventEmitter.emit('customerListRefresh');
              setTimeout(() => {
                // this.props.navigation.goBack();
                this.navigateBack();
              }, 1500);
            } else {
              QFReactHelper.show(res.data.message, 3);
            }
          }).catch((error) => {
            console.log('error=', error);
            QFReactHelper.show('服务器异常', 3);
          });
        },
      },
    });
  }


  requestData() {
    axios.get('customer/private/getItem', {
      params: {
        id: this.state.id,
      },
    }).then((res) => {
      if (res.data.status === 'C0000') {
        const dataSource = res.data.result.detail;
        const { customerIntentionList = [] } = dataSource;
        this.setState({
          dataSource,
          intentionsCount: customerIntentionList.length,
        });
        // 写在内部是为了避免2个接口请求成功后，同时刷新ScrollableTabView产生抖动
        axios.get('customer/private/queryCustomerCount', {
          params: {
            passengerID: this.state.customerId,
            passengerPrivateID: this.state.id,
            cellphoneNumber: this.state.phone,
          },
        }).then((res) => {
          if (res.data.status === 'C0000') {
            this.setState({
              customerCount: res.data.result,
            });
          }
        });
      }
    });
  }


  // 编辑或者转公
  selectToggle(type) {
    if (type === 'modify') {
      this.props.navigation.navigate('AddAndModifyCustomer', {
        customerId: this.state.customerId,
        id: this.state.id,
      });
    } else if (type === 'turnPublic') {
      this.turnPublic();
    } else if (type === 'rebut') {
      this.rebut();
    } else if (type === 'passCustomer') {
      this.props.navigation.navigate('PassCustomer', {
        customerId: this.state.customerId,
        id: this.state.id,
        name: this.state.dataSource.customerName,
      });
    }

    if (selectToggleFlag) {
      this.selectRef.setNativeProps({
        style: {
          left: -999,
        },
      });

      selectToggleFlag = false;
    } else {
      this.selectRef.setNativeProps({
        style: {
          left: 0,
        },
      });

      selectToggleFlag = true;
    }
  }

  addFollowUpRecord(item) {
    axios.get('customer/private/saveFollow', {
      params: {
        id: item.id,
        customerId: item.customerId,
        content: '已联系此客户',
      },
    })
      .then((res) => {
        if (res.data.status === 'C0000') {
          QFReactHelper.show('已帮您自动添加一条跟进记录', 2);
          DeviceEventEmitter.emit('refreshFollowData'); // 刷新跟进列表
          if (this.state.dataSource.customerSourceDesc === '集团分配') {
            DeviceEventEmitter.emit(this.props.navigation.state.params.eventName); // 刷新客列表的item
          }
        } else {
          QFReactHelper.show(res.data.message);
        }
      })
      .catch((error) => {
        QFReactHelper.show('服务器异常', 3);
      });
  }

  callCustomer(item) {
    const url = `tel:${item.phone}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          QFReactHelper.show('当前版本不支持拨打号码', 5);
        } else {
          UMNative.onEvent('XF-Customer-TelTo');
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.log(`未知错误${err}`));
  }

  sendMsgToCustomer(item) {
    const url = `sms:${item.phone}`;
    Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        QFReactHelper.show('当前版本不支持发送短信', 5);
      } else {
        UMNative.onEvent('XF-Customer-SMSTo');
        return Linking.openURL(url);
      }
    }).catch((err) => console.log(`未知错误${err}`));
  }

  // 弹窗提示 是否添加跟进
  followUpDialog(item) {
    this.dialogbox.confirm({
      title: null,
      content: (
        <View style={styles.modelBox}>
          <View style={styles.modelTilteBox}>
            <Icon
              name="jinggao"
              size={20}
              color="#ff9911"
              style={styles.tipIcon}
            />
            <Text style={styles.modelTilte}>是否添加一条跟进记录?</Text>
          </View>
        </View>
      ),
      cancel: {
        text: '否',
        style: {
          color: '#3a3a3a',
          fontSize: 14,
        },
        callback: () => {
          this.dialogbox.close();
        },
      },
      ok: {
        text: '是',
        style: {
          color: '#ffa200',
          fontSize: 14,
        },
        callback: () => {
          this.dialogbox.close();
          this.addFollowUpRecord(item.params);
        },
      },
    });
  }

  render() {
    const { state } = this;
    const { customerCount = {}, dataSource = {}, intentionsCount } = this.state;

    const customer = [
      {
        phone: this.state.phone,
        params: { id: dataSource.id, customerId: dataSource.customerId },
        showContent: <Text>拨打电话</Text>,
        type: 'func',
        func: (item) => {
          this.callCustomer(item);
          this.followUpDialog(item);
        },
      },
      {
        phone: this.state.phone,
        params: { id: dataSource.id, customerId: dataSource.customerId },
        showContent: <Text>发送短信</Text>,
        type: 'func',
        func: (item) => {
          this.sendMsgToCustomer(item);
          this.followUpDialog(item);
        },
      },
    ];

    const bar = [
      {
        icon: 'phone',
        text: '联系客户',
        events: customer,
      },
      {
        icon: 'tianxiegenjin',
        text: '填写跟进',
        func: this.reportedEntry.bind(this),
      },
      {
        icon: 'baobeikehu',
        text: '报备客户',
        func: () => {
          const { state } = this;
          this.props.navigation.navigate('ReportEntry', {
            phone: state.dataSource.phone,
            customerName: state.dataSource.customerName,
            id: state.id,
            customerId: state.customerId,
          });
        },
      },
    ];

    const params = {
      passengerPrivateID: state.id,
    };

    return (
      <View style={[baseStyles.container, { position: 'relative' }]}>
        <View style={styles.headInfo}>
          <View style={[styles.userDetail, { marginTop: 15 }]}>
            <Icon name="gerenziliao" color="#f91" size={16} />
            <Text style={[baseStyles.fz16, baseStyles.colorA3a, { marginLeft: 5, fontWeight: 'bold' }]}>
              {dataSource.customerName || ''}
            </Text>
          </View>
          <View style={[styles.userDetail, { marginBottom: 15, marginTop: 10 }]}>
            <Text style={[baseStyles.fz16, { color: '#3a3a3a' }]}>
              {dataSource.phone || ''}
            </Text>
          </View>
          {this.getHeadDetailView()}
        </View >

        <ScrollableTabView
          style={[baseStyles.marginT10]}
          tabBarBackgroundColor="#fff"
          tabBarActiveTextColor="#ffa200"
          tabBarInactiveTextColor="#a8a8a8"
          initialPage={0}
          tabBarTextStyle={{ fontSize: 14, fontWeight: 'normal' }}
          tabBarUnderlineStyle={{ backgroundColor: '#ffa200', height: 2, borderBottomWidth: 0 }}
          locked={false}
          renderTabBar={() => <ScrollableTabBar style={{ borderBottomColor: '#dedfe0' }} />}
        >

          <Intentions
            tabLabel={`意向(${intentionsCount})`}
            dataSource={dataSource.customerIntentionList}
          />

          <FollowUp
            tabLabel={`客服跟进(${customerCount.followRecords || 0})`}
            params={{
              passengerID: state.customerId,
              cellphoneNumber: state.phone,
              passengerPrivateID: state.id,
            }}
            type="customServiceFollowUp"
            url="customer/private/queryCustomerServiceFollows"
          />

          <FollowUp
            tabLabel="跟进"
            params={{ id: state.id, customerId: state.customerId }}
            type="followUp"
            notFollowNum={dataSource.notFollowNum}
            url="customer/private/getFollows"
          />

          <Reported
            tabLabel={`报备(${customerCount.reservationCount || 0})`}
            params={params}
          />

          <LookWith
            tabLabel={`带看(${customerCount.guideCount || 0})`}
            params={params}
          />

          <Deal
            tabLabel={`成交(${customerCount.bargainCount || 0})`}
            params={params}
          />


        </ScrollableTabView>

        <BottomBar items={bar} />

        <DialogBox ref={(dialogbox) => { this.dialogbox = dialogbox; }} />

        <View
          style={[baseStyles.overlay, {
            left: -999, position: 'absolute', zIndex: 990, elevation: 990, opacity: 1, backgroundColor: 'rgba(150, 150, 150, 0)',
          }]}
          ref={(c) => { this.selectRef = c; }}
        >
          <TouchableHighlight
            onPress={() => this.selectToggle()}
            style={[baseStyles.overlay, {
              zIndex: 999, elevation: 999, opacity: 1, backgroundColor: 'rgba(150, 150, 150, 0)',
            }]}
          >
            <View style={styles.headerList}>
              <TouchableOpacity value="modify" onPress={() => this.selectToggle('modify')} style={[styles.headerListLi, { borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#dedfe0' }]}>
                <Text style={{ fontSize: 16, color: '#7e7e7e' }}>修改</Text>
              </TouchableOpacity>
              {UserInfo.positionName === '店长' && dataSource.customerSource === 'JTFP' ?
                <TouchableOpacity value="modify" onPress={() => this.selectToggle('passCustomer')} style={[styles.headerListLi, { borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#dedfe0' }]}>
                  <Text style={{ fontSize: 16, color: '#7e7e7e' }}>分客</Text>
                </TouchableOpacity>
                : null
              }
              {
                UserInfo.companyType !== 'OUTREACH' && UserInfo.companyType !== 'SITE' ?
                  <TouchableOpacity
                    onPress={() => this.selectToggle('turnPublic')}
                    style={[styles.headerListLi, { borderBottomWidth: StyleSheet.hairlineWidth, borderColor: '#dedfe0' }]}
                  >
                    <Text style={{ fontSize: 16, color: '#7e7e7e' }}>转公</Text>
                  </TouchableOpacity>
                  : null
              }
              {
                dataSource.customerSource === 'JTFP' && dataSource.betweenCanRejectDays ?
                  <TouchableOpacity
                    onPress={() => this.selectToggle('rebut')}
                    style={[styles.headerListLi, { paddingLeft: 0, paddingRight: 0 }]}
                  >
                    <Text style={{ fontSize: 16, color: '#7e7e7e' }}>无效驳回</Text>
                  </TouchableOpacity>
                  : null
              }
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  reportedEntryPop: {
    borderTopColor: '#e7e8ea',
    borderTopWidth: StyleSheet.hairlineWidth,
    height: 85,
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
  },

  reportedEntryPopInput: {
    width: '100%',
    height: 85,
    color: '#a8a8a8',
    fontSize: 16,
  },

  headerList: {
    width: 80,
    backgroundColor: '#f5f5f9',
    borderColor: '#dedfe0',
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 999,
    zIndex: 999,
    position: 'absolute',
    right: 20,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerListLi: {
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
  },

  headInfo: {
    flexDirection: 'column',
    height: 'auto',
    backgroundColor: '#fff',
    marginTop: 10,
    marginLeft: 8,
    marginRight: 8,
    alignContent: 'center',
    borderRadius: 4,
    shadowColor: '#000', // 设置阴影，目前只支持iOS平台
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  userDetail: {
    height: 20,
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  headDetail: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#e7e8ea',
  },

  detailTextView: {
    width: '100%',
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
  },

  detailLabelText: {
    flex: 1,
    // marginTop: 10,
    marginTop: 5,
    color: '#a8a8a8',
  },

  detailRemarkLabel: {
    flex: 1,
    height: 'auto',
    // marginTop: 10,
    marginTop: 5,
    marginBottom: 10,
    lineHeight: 16,
    color: '#a8a8a8',
  },

  normalDetailText: {
    flex: 4,
    // marginTop: 10,
    marginTop: 5,
    color: baseStyles.colorA3a.color,
    overflow: 'hidden',
  },

  longDetailText: {
    height: 'auto',
    marginTop: 5,
    marginBottom: 10,
    lineHeight: 16,
    justifyContent: 'flex-start',
  },

  headPhoto: {
    width: 62,
    height: 62,
    borderRadius: 30,
    marginLeft: 15,
    overflow: 'hidden',
  },

  modelBox: {
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  tipIcon: {
    width: 34,
  },
  modelTilteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  modelTilte: {
    fontSize: 16,
    color: '#3a3a3a',
  },
});
