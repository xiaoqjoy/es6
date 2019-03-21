// 通讯录列表
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  DeviceEventEmitter,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';

import Contacts from 'react-native-contacts';

import GoBack from './GoBack';

import system from '../utils/system';


export default class PhoneContacts extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: '手机通讯录',
    headerLeft: <GoBack navigation={navigation} />,
    headerRight: <Text />,
  });

  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    };
  }

  componentDidMount() {
    // const param = {
    //   pageName: 'ContactsList',
    // };
    if (system.isIOS) {
      this.getContacts();
    } else {
      this.requestContactsPermission();
    }
  }

  getContacts() {
    Contacts.getAll((err, contacts) => {
      if (err === 'denied') {
        // error
      } else {
        this.setState({
          contacts,
        });
      }
    });
  }

  async requestContactsPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: '系统消息',
          message: '该功能需要获取您的通讯录权限，才可以使用！',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.getContacts();
      } else {
        console.log('通讯录权限获取失败！');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: '#fff' }}>
        <View
          style={{
            backgroundColor: '#efefef',
            height: 50,
            justifyContent: 'center',
            paddingLeft: 10,
          }}
        >
          <Text>联系人：{this.state.contacts.length}</Text>
        </View>
        <ScrollView style={{ marginBottom: 40 }}>
          {this.state.contacts.map((el) => (
            <View style={styles.item} key={el.recordID}>
              <Image
                style={styles.photo}
                source={
                  el.thumbnailPath
                    ? { uri: el.thumbnailPath }
                    : require('../assets/img/head.png')
                }
              />
              <View>
                <Text style={{ fontSize: 16, color: '#3a3a3a' }}>
                  {el.familyName ? el.familyName : el.givenName}
                </Text>
                {el.phoneNumbers.map((ele) => (
                  <TouchableOpacity
                    style={styles.btn}
                    key={ele.number}
                    onPress={() => {
                      DeviceEventEmitter.emit('chooseReportContact', {
                        customerName: el.familyName
                          ? el.familyName
                          : el.givenName,
                        customerPhone: ele.number.replace(/[-()+]/g, ''),
                      });
                      this.props.navigation.goBack();
                    }}
                  >
                    <Text style={{ fontSize: 14, color: '#a8a8a8' }}>{ele.number}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomColor: '#dedede',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
  },
  photo: {
    width: 50,
    height: 50,
    marginRight: 30,
    borderRadius: 25,
  },
  btn: {
    marginTop: 10,
    marginBottom: 10,
  },
});
