import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import { SafeAreaView } from 'react-navigation';

import { QFReactHelper, UMNative } from '../../common/NativeHelper';
import { screen, system } from '../../utils';

import Icon from '../../components/Icon/';
import GoBack from '../../components/GoBack';
import PhoneContacts from '../../components/PhoneContacts';

import CustomerContacts from './CustomerContacts';
import DefaultTabBar from './DefaultTabBar';
import baseStyles from '../../components/baseStyles';


export default class ReportContacts extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  componentDidMount() {
    this.currentContactsListener = DeviceEventEmitter.addListener('toggleReportContacts', (data) => {
      this.customerContactSearchBtn.setNativeProps({
        style: {
          right: data.tab === '私客列表' ? 0 : -1000,
        },
      });
    });
  }

  componentWillUnmount() {
    // 移除
    this.currentContactsListener.remove();
  }

  render() {
    return (
      <View style={styles.houseContainer}>
        <ScrollableTabView
          renderTabBar={() => <DefaultTabBar />}
          tabBarActiveTextColor="#333"
          tabBarTextStyle={{ fontSize: 16 }}
          tabBarInactiveTextColor="#a8a8a8"
          tabBarUnderlineStyle={{
            backgroundColor: '#f91',
            height: 1,
          }}
          scrollWithoutAnimation
        >
          <CustomerContacts
            ref={(c) => { this.customerContacts = c; }}
            tabLabel="私客列表"
            navigation={this.props.navigation}
            emitName="chooseReportContact"
          />

          <PhoneContacts
            tabLabel="手机通讯录"
            ref={(c) => { this.phoneContacts = c; }}
            navigation={this.props.navigation}
            emitName="chooseReportContact"
          />

        </ScrollableTabView>

        <View style={styles.buttonContainer}>

          <TouchableOpacity
            ref={(c) => { this.customerContactSearchBtn = c; }}
            style={[styles.iconPress, styles.iconSearch]}
            onPress={() => {
              this.props.navigation.navigate('CustomerContactsSearch', {
                keys: { AddReport: this.props.navigation.state.key },
              });
            }}
          >
            <View><Icon name="magnifier" size={20} color="#7e7e7e" /></View>
          </TouchableOpacity>


          <GoBack
            navigation={this.props.navigation}
            iconPress={[styles.iconPress, styles.iconBack]}
          />
        </View>
      </View>
    );
  }
}

const iosPaddingTop = system.isIphoneX ? 35 : 15;
const iosTop = system.isIphoneX ? 40 : 20;

let styles = StyleSheet.create({
  houseContainer: {
    paddingTop: system.isIOS ? iosPaddingTop : 0,
    flex: 1,
    backgroundColor: '#fff',
  },
  iconPress: {
    position: 'absolute',
    top: system.isIOS ? iosTop : 5,
  },

  iconBack: {
    left: 0,
    height: 44,
  },
  iconSearch: {
    width: 60,
    height: 40,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: screen.width,
    position: 'absolute',
  },


});
