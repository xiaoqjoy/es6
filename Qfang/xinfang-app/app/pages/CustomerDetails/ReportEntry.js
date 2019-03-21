import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  DeviceEventEmitter,
} from 'react-native';

import axios from 'axios';
import baseStyles from '../../components/baseStyles';
import Icon from '../../components/Icon/';
import DialogBox from '../../components/react-native-dialogbox';
import MyDatePicker from '../../components/MyDatePicker';
import { QFReactHelper, UMNative } from '../../common/NativeHelper';
import GoBack from '../../components/GoBack';

export default class ReportEntry extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: '报备录入',
    headerLeft: <GoBack navigation={navigation} />,
    headerRight: <Text />,
  });

  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      gardenName: '',
      id: '',
      appointmentTime: '',
      customerName: params.customerName,
      customerId: params.customerId,
      privateCustomerId: params.id,
      mobileNo: params.phone,
      loadingFlag: false,
      submitFlag: true,
    };

    this.reportSubmit = this.reportSubmit.bind(this);
  }

  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener('filterChoose', (data) => {
      if (data.field === 'reportGarden') {
        this.setState(
          {
            gardenName: data.item.name,
            id: data.item.id,
          },
          this.getCompanyList(data.item.id),
        );
      }
    });

    this.chooseCompanyListener = DeviceEventEmitter.addListener('chooseCompanyList', (data) => {
      this.setState({
        id: data.selectId,
        company: data.selectValue,
      });
    });
  }

  componentWillUnmount() {
    this.subscription.remove();
    this.chooseCompanyListener.remove();
  }

  getCompanyList(expandId) {
    axios.get('garden/getExpandsByExpandId', { params: { expandId } })
      .then((res) => {
        if (res.data.status === 'C0000') {
          let companyList = [];
          if (res.data.result.length) {
            companyList = res.data.result.map((item) => ({
              selectValue: item.orgunit.name,
              selectId: item.id,
            }));


            this.setState({
              companyList,
              company: companyList.length === 1 ? companyList[0].selectValue : '',
            });
          } else {
            this.setState({
              companyList: [],
              id: '',
              company: '',
            });
          }
        } else {
          QFReactHelper.show(res.data.message, 5);
        }
      })
      .catch(() => {
        QFReactHelper.show('服务器开小差了~', 5);
      });
  }


  reportSubmit() {
    const {
      companyList, company, id, mobileNo, customerName, privateCustomerId, customerId, appointmentTime, submitFlag,
    } = this.state;

    if (!id) {
      QFReactHelper.show('请选择楼盘', 5);
      return;
    }

    if (companyList.length > 1 && (!company)) {
      QFReactHelper.show('请选择分公司', 5);
      return;
    }

    if (!submitFlag) {
      return;
    }

    this.setState({ submitFlag: false, loadingFlag: true });

    axios
      .get('/garden/report', {
        params: {
          id,
          customerName,
          privateCustomerId,
          customerId,
          mobileNo,
          appointmentTime,
        },
      })
      .then((res) => {
        if (res.data.status === 'C0000') {
          QFReactHelper.show(res.data.message, 3);
          UMNative.onEvent('XF-Customer-Reported');
          this.setState({ submitFlag: false, loadingFlag: false });
          this.props.navigation.goBack();
        } else {
          this.setState({ submitFlag: true, loadingFlag: false });
          QFReactHelper.show(res.data.message, 3);
        }
      })
      .catch((error) => {
        console.log('error=', error);
        this.setState({
          submitFlag: true,
          loadingFlag: false,
        });

        QFReactHelper.show('服务器异常', 3);
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
              {this.state.company}
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
              id: this.state.id,
              data: companyList,
              eventName: 'chooseCompanyList',
            });
          }}
        >

          <View style={styles.rowContainer}>
            <Text style={[baseStyles.fz16, baseStyles.colorA8]}>分销公司：</Text>
            <Text style={[baseStyles.fz14, baseStyles.colorA3a]}>
              {this.state.company}
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
    const { navigate } = this.props.navigation;
    const { companyList = [] } = this.state;
    return (
      <View style={[baseStyles.container, { marginTop: 10 }]}>
        <TouchableOpacity
          style={styles.reportList}
          onPress={() => navigate('GardenSearch4Report')}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text style={[baseStyles.fz16, baseStyles.colorF7e]}>楼盘：</Text>
            <Text style={[baseStyles.fz16, baseStyles.colorA3a]}>
              {this.state.gardenName}
            </Text>
          </View>
          <View style={{ marginRight: 15 }}>
            <Icon
              name="arrow-right"
              size={18}
              color="#7e7e7e"
              style={styles.searchIcon}
            />
          </View>
        </TouchableOpacity>
        {/* 分销公司选择 */}
        {this.renderCompanySelect(companyList)}

        <View style={styles.reportList}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[baseStyles.fz16, baseStyles.colorA8]}>客户：</Text>
            <Text
              style={[baseStyles.fz16, baseStyles.colorA8, { width: '100%' }]}
            >
              {this.state.customerName || ''}
            </Text>
          </View>
          <View style={{ marginRight: 15 }}>
            <Icon
              name="arrow-right"
              size={18}
              color="#7e7e7e"
              style={styles.searchIcon}
            />
          </View>
        </View>
        <View style={styles.reportList}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[baseStyles.fz16, baseStyles.colorA8]}>电话：</Text>
            <Text
              style={[baseStyles.fz16, baseStyles.colorA8, { width: '100%' }]}
            >
              {this.state.mobileNo || ''}
            </Text>
          </View>
        </View>
        <View style={styles.reportList}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[baseStyles.fz16, baseStyles.colorA8]}>
              预计到访时间：
            </Text>
            <MyDatePicker
              mode="datetime"
              format="YYYY-MM-DD H:m"
              minDate
              maxDate
              onChangeText={(text) => {
                this.setState({
                  appointmentTime: `${text}:00`,
                });
              }}
            />
          </View>
        </View>
        <View style={{ paddingLeft: 15, marginTop: 10 }}>
          <Text style={[baseStyles.fz12, { color: '#f39800' }]}>
            注：提交后手机号码会做部分隐藏，保护您的隐私
          </Text>
        </View>
        <TouchableOpacity
          style={styles.reportSubmit}
          onPress={this.reportSubmit}
        >
          <Text style={[baseStyles.colorFff, baseStyles.fz18]}>提交</Text>
        </TouchableOpacity>
        <DialogBox
          ref={(dialogbox) => {
            this.dialogbox = dialogbox;
          }}
        />
        {this.state.loadingFlag ? (
          <View style={baseStyles.overlay}>
            <ActivityIndicator
              size="large"
              color="white"
              style={{ marginTop: -150 }}
            />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  reportSubmit: {
    height: 43,
    marginRight: 15,
    marginLeft: 15,
    backgroundColor: '#f39800',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
