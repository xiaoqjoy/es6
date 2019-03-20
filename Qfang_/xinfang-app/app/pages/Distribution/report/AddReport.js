/**
 * Created by yoara on 2017/6/20.
 */
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import axios from 'axios';
import Icon from '../../../components/Icon/';
import * as Constants from '../../../common/Constants';
import { QFReactHelper, UMNative } from '../../../common/NativeHelper';
import GoBack from '../../../components/GoBack';
import baseStyles from '../../../components/baseStyles';
import MyDatePicker from '../../../components/MyDatePicker';

const urlAddReport = '/garden/report';
/**
 * navigation params :
 *  companyName, 默认所属分公司 选填  string
 *  expendId:扩展楼盘ID，必填
 *  gardenName:楼盘名，必填
 *
 *  customerName:客户名，选填
 *  customerPhone:客户手机号，选填
 *
 */
export default class AddReport extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: '楼盘报备',
    headerLeft: <GoBack navigation={navigation} />,
    headerRight: <Text />,
  });

  constructor() {
    super();
    this.state = {};
    this.submit = this.submit.bind(this);
  }

  componentWillMount() {
    const { params } = this.props.navigation.state;

    this.state = {
      id: params.expandId,
      newId: params.expandId,
      customerPhone: params.customerPhone,
      customerName: params.customerName,
      gardenName: params.gardenName,
      companyName: params.companyName,
      privateCustomerId: params.privateCustomerId,
      customerId: params.customerId,
      appointmentTime: '',
      companyList: [],
    };
  }

  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener('filterChoose', (data) => {
      if (data.field === 'reportGarden') {
        this.setState(
          {
            gardenName: data.item.name,
            newId: data.item.id,
          },
          this.filterChooseCb(data.item.id),
        );
      }
    });

    this.chooseContactsListener = DeviceEventEmitter.addListener('chooseReportContact', (data) => {
      this.setState({
        privateCustomerId: data.id,
        customerId: data.customerId,
        customerPhone: data.customerPhone,
        customerName: data.customerName,
      });
    });

    this.chooseCompanyListener = DeviceEventEmitter.addListener('chooseCompanyList', (data) => {
      this.setState({
        newId: data.selectId,
        companyName: data.selectValue,
      });
    });

    this.getCompanyList(this.state.newId)
      .then((res) => {
        if (res.data.status === 'C0000') {
          const { result } = res.data;

          if (result.length) {
            const companyList = result.map((item) => ({
              selectValue: item.orgunit.name,
              selectId: item.id,
            }));

            // 判断楼盘是否在售
            this.gardenIsOnSell = companyList.find((item) => item.selectId === this.state.newId);

            if (this.gardenIsOnSell) { // 在售
              this.setState({
                companyList,
                companyName: this.gardenIsOnSell.selectValue,
              });
            } else { // 已下架
              this.setState({
                companyName: '',
                newId: '',
              });
            }
          }
        } else {
          QFReactHelper.show(res.data.message, 5);
        }
      })
      .catch((e) => {
        console.log('didMount 时，getExpandsByExpandId 接口err=', e);
        QFReactHelper.show('服务器开小差了~', 5);
      });
  }

  componentWillUnmount() {
    // 移除
    this.subscription.remove();
    this.chooseContactsListener.remove();
    this.chooseCompanyListener.remove();
  }


  getCompanyList(expandId) {
    return axios.get('garden/getExpandsByExpandId', { params: { expandId } });
  }

  filterChooseCb(expandId) {
    this.getCompanyList(expandId)
      .then((res) => {
        if (res.data.status === 'C0000') {
          const { result } = res.data;

          let companyList = [];

          if (result.length) {
            companyList = result.map((item) => ({
              selectValue: item.orgunit.name,
              selectId: item.id,
            }));
          }

          const companyName = companyList.length === 1 ? companyList[0].selectValue : '';
          const newId = companyList.length === 1 ? companyList[0].selectId : '';

          // switch (companyList.length) {
          //   case 0:
          //     companyName = '';
          //     break;
          //   case 1:
          //     companyName = companyList[0].selectValue;
          //     newId = companyList[0].selectId;
          //     break;

          //   default:
          //     companyName = '';
          //     newId = '';
          //     break;
          // }

          this.setState({
            companyList,
            companyName,
            newId,
          });
        } else {
          QFReactHelper.show(res.data.message, 5);
        }
      })
      .catch((e) => {
        console.log('修改楼盘 时，getExpandsByExpandId 接口err=', e);
        QFReactHelper.show('服务器开小差了~', 5);
      });
  }

  address() {
    QFReactHelper.showPage('NEWHOUSE_ADDRESS', { eventname: 'addressEvent' });
  }

  rnAddress() {
    this.props.navigation.navigate('ReportContacts');
  }

  submit() {
    const {
      companyList, companyName, newId, customerPhone, customerName, privateCustomerId, customerId, appointmentTime,
    } = this.state;

    if (!newId) {
      QFReactHelper.show('该楼盘已下架', 5);
      return;
    }

    if (companyList && companyList.length > 1 && (!companyName)) {
      QFReactHelper.show('请选择分公司', 5);
      return;
    }

    if (!customerName) {
      QFReactHelper.show('请输入客户姓名', 5);
      return;
    }

    if (
      !customerPhone ||
      !(
        customerPhone.length === 11 ||
        customerPhone.length === 13
      )
    ) {
      QFReactHelper.show('请输入11位或13位手机', 5);
      return;
    }

    this.setState({ submitFlag: true });

    axios.get(urlAddReport, {
      params: {
        id: newId,
        mobileNo: customerPhone,
        customerName,
        privateCustomerId,
        customerId,
        appointmentTime,
      },
      timeout: 3000,
    })
      .then((res) => {
        this.setState({ submitFlag: false });
        if (res.data.status === 'C0000') {
          UMNative.onEvent('XF-GardenDetails-Reported');
          QFReactHelper.show('报备成功', 5);

          this.props.navigation.goBack();
          // DeviceEventEmitter.emit('refreshReportData');
        } else {
          QFReactHelper.show(`报备失败${res.data.message}`, 5);
        }
      })
      .catch((e) => {
        console.log(e);
        QFReactHelper.show('服务器开小差了xxxxxx~', 5);
      });
  }

  renderCompanySelect(companyList) {
    if (companyList.length === 1) {
      return (
        <View
          style={styles.reportList}
        >
          <View style={styles.rowContainer}>
            <Text style={[baseStyles.fz16, baseStyles.colorF7e]}>分销公司：</Text>
            <Text style={[baseStyles.fz14, baseStyles.colorA3a]}>
              {this.state.companyName}
            </Text>
          </View>
        </View>
      );
    }
    if (companyList.length > 1) {
      return (
        <TouchableOpacity
          style={styles.reportList}
          onPress={() => {
            this.props.navigation.navigate('SelectPickerGoBack', {
              title: '分销公司',
              id: this.state.newId,
              data: companyList,
              eventName: 'chooseCompanyList',
            });
          }}
        >

          <View style={styles.rowContainer}>
            <Text style={[baseStyles.fz16, baseStyles.colorA8]}>分销公司：</Text>
            <Text style={[baseStyles.fz14, baseStyles.colorA3a]}>
              {this.state.companyName}
            </Text>
          </View>

          <View style={[styles.rowContainer, { marginRight: 15 }]}>
            <Icon
              name="arrow-right"
              size={18}
              color="#7e7e7e"
              style={styles.searchIcon}
            />
          </View>

        </TouchableOpacity>
      );
    }
    return null;
  }

  render() {
    const editFlag = !this.props.navigation.state.params.customerName;
    const { companyList } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={styles.reportList}
            onPress={() =>
              this.props.navigation.navigate('GardenSearch4Report')
            }
          >
            <View style={styles.rowContainer}>
              <Text style={styles.inputViewText}>楼盘：</Text>
              <Text style={[baseStyles.fz14, baseStyles.colorA3a]}>
                {this.state.gardenName.length > 14 ? `${this.state.gardenName.substring(0, 14)}...` : this.state.gardenName}
              </Text>
            </View>
            <View style={[styles.rowContainer, { marginRight: 15 }]}>
              <Icon
                name="arrow-right"
                size={18}
                color="#7e7e7e"
                style={styles.searchIcon}
              />
            </View>
          </TouchableOpacity>

          {this.renderCompanySelect(companyList)}

          <View style={styles.inputView}>
            <View style={styles.rowContainer}>
              <Text style={styles.inputViewText}>客户：</Text>
              <TextInput
                onChangeText={(text) =>
                  this.setState({
                    customerName: text,
                  })
                }
                editable={editFlag}
                style={[styles.inputViewInput]}
                placeholder="请输入客户姓名"
                value={this.state.customerName}
                maxLength={10}
                underlineColorAndroid="transparent"
              />
            </View>

            <View style={styles.rowContainer}>
              {
                !editFlag ?
                  (
                    <View />
                  )
                  :
                  (
                    <TouchableHighlight
                      underlayColor="#f0f0f0"
                      // onPress={() => this.address()}
                      onPress={() => this.rnAddress()}
                    >
                      <View>
                        <Icon name="address-list" size={20} color="#f39800" />
                      </View>
                    </TouchableHighlight>
                  )
              }
            </View>
          </View>

          <View style={styles.inputView}>
            <View style={styles.rowContainer}>
              <Text style={styles.inputViewText}>手机：</Text>
              <TextInput
                onChangeText={(text) =>
                  this.setState({
                    customerPhone: text,
                  })
                }
                editable={editFlag}
                style={[styles.inputViewInput]}
                placeholder="请输入客户手机号"
                value={this.state.customerPhone}
                maxLength={13}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>
          <View style={styles.inputView}>
            <Text style={[styles.inputViewText, { width: 120 }]}>
              预计到访时间：
            </Text>
            <MyDatePicker
              mode="datetime"
              format="YYYY-MM-DD H:m"
              minDate
              maxDate
              onChangeText={(text) => {
                this.setState({ appointmentTime: `${text}:00` });
              }}
            />
          </View>
        </View>
        <View style={[styles.inputTip]}>
          <Text style={styles.inputTipText}>
            手机号码必须为11或13位数字，格式如下：
          </Text>
          <Text style={[styles.inputTipText, { marginTop: 3 }]}>
            内地： 13688888888 港澳： 00852888888
          </Text>
        </View>
        <TouchableHighlight
          style={[
            styles.button,
            this.state.submitFlag && { backgroundColor: '#7e7e7e' },
          ]}
          onPress={this.submit}
          underlayColor="#E1F6FF"
        >
          <Text style={styles.buttonText}>提交</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: '#f5f5f9',
  },
  inputContainer: {
    backgroundColor: '#fff',
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 15,
    borderBottomColor: '#e7e8ea',
  },
  inputViewText: {
    width: 50,
    fontSize: 16,
    color: '#7e7e7e',
  },
  inputViewInput: {
    fontSize: 14,
    width: 160,
    marginTop: 2,
  },
  inputTip: {
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 50,
  },

  inputTipText: {
    fontSize: 12,
    color: '#a8a8a8',
  },
  button: {
    backgroundColor: '#f39800',
    width: Constants.STANDARD_WIDTH * 0.92,
    height: Constants.STANDARD_HEIGHT * 0.065,
    marginLeft: Constants.STANDARD_WIDTH * 0.04,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
  reportList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 54,
    paddingLeft: 15,
    borderBottomColor: '#e7e8ea',
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
