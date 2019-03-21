import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import { QFReactHelper, UMNative } from '../../common/NativeHelper';
import UserInfo from '../../common/UserInfo';

import { screen, system } from '../../utils';

import Icon from '../../components/Icon/';
import GoBack from '../../components/GoBack';
import DefaultTabBar from './DefaultTabBar';
import GardenAll from './GardenAll';
import GardenFocus from './GardenFocus';

export default class GardenList extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
    };
  }

  navigateBack() {
    global.requestAnimationFrame(() => {
      this.gardenList.query.params = {};
      this.props.navigation.goBack();
    });
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
          <GardenAll
            tabLabel="全部楼盘"
            ref={(c) => { this.gardenList = c; }}
            navigation={this.props.navigation}
          />
          <GardenFocus ref={(c) => { this.houseFoucs = c; }} tabLabel="关注盘" navigation={this.props.navigation} />
        </ScrollableTabView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.iconPress, styles.iconSearch]}
            onPress={() => {
              UMNative.onEvent('XF-GardenList-GardenSearch');
              this.props.navigation.navigate('GardenSearch');
            }}
          >
            <View><Icon name="magnifier" size={20} color="#7e7e7e" /></View>
          </TouchableOpacity>
          <GoBack
            navigation={this.props.navigation}
            iconPress={[styles.iconPress, styles.iconBack]}
            onBackPress={this.navigateBack.bind(this)}
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
    // height: screen.height,
    flex: 1,
    backgroundColor: '#fff',
  },
  iconPress: {
    position: 'absolute',
    // top: 5,
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
