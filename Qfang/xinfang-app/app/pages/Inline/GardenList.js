import React, { PureComponent } from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Platform,
  TouchableOpacity
} from 'react-native';

import { QFReactHelper, UMNative } from '../../common/NativeHelper';

import { screen, system } from '../../utils';

import Icon from '../../components/Icon/';
import GoBack from '../../components/GoBack';
import GardenAll from '../GardenList/GardenAll';

export default class GardenList extends PureComponent {

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: '全部楼盘',
      headerLeft: (<GoBack navigation={navigation} onBackPress={() => params.navigateBack && params.navigateBack()} />),
      headerRight: (<TouchableOpacity
        style={[styles.iconPress, styles.iconSearch]}
        onPress={() => {
          navigation.navigate('GardenSearch');
        }}>
        <View><Icon name='magnifier' size={20} color='#7e7e7e' /></View>
      </TouchableOpacity>)
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false
    }
  }

  navigateBack() {
    QFReactHelper.navPop();
  }

  componentDidMount() {
    // 重新绑定后退按钮的事件
    this.props.navigation.setParams({
      navigateBack: this.navigateBack.bind(this)
    });
    Platform.OS === 'ios' && StatusBar.setBarStyle('dark-content');
  }

  render() {
    return (
      <GardenAll navigation={this.props.navigation}></GardenAll>
    );
  }
};

let styles = StyleSheet.create({

  iconPress: {
  },
  iconBack: {
    left: 0,
    height: 44
  },
  iconSearch: {
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: screen.width,
    position: 'absolute'
  }

});
