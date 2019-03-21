import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';

import { QFReactHelper, UMNative } from '../../common/NativeHelper';
import Icon from '../../components/Icon/';
import baseStyles from '../../components/baseStyles';
import UserInfo from '../../common/UserInfo';
import MarqueeBox from './MarqueeBox';
import NewGarden from './NewGarden';
import Commissions from './Commissions';
import { system } from '../../utils';
import axios from 'axios';

class Home extends PureComponent {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();

    this.state = {
      userPosition: {},
    };

    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    axios.post('info/positionList')
      .then((res) => {
        if (res.data.status === 'C0000') {
          Object.assign(UserInfo, res.data.result[0]);
        }
      }).catch((error) => {
        console.log('error=', error);
      });
  }

  onScroll(event) {
    const top = event.nativeEvent.contentOffset.y;

    global.requestAnimationFrame(() => {
      let opacity = 0;
      let backgroundColor = 'transparent';
      let borderBottomColor = 'transparent';

      if (top > 10) {
        opacity = (top - 10) / 100;
        backgroundColor = `rgba(246, 245, 250, ${opacity})`;
        borderBottomColor = `rgba(223, 224, 226, ${opacity})`;
      }
      this.searchBar.setNativeProps({
        style: {
          backgroundColor,
          borderBottomColor,
        },
      });
    });
  }

  navigateTo(route) {
    global.requestAnimationFrame(() => {
      this.props.navigation.navigate(route);
    });
  }

  render() {
    const { companyType } = UserInfo;
    const isInline = companyType === 'INLINE';
    return (


      <View style={baseStyles.container}>
        <ScrollView
          style={baseStyles.container}
          onScroll={this.onScroll}
          scrollEventThrottle={16}
          bounces={false}
        >

          <Image style={styles.bannerImg} source={require('../../assets/img/banner.jpg')} />

          <MarqueeBox />

          <View style={styles.quickEntry}>
            <TouchableOpacity style={styles.entryItem} onPress={() => this.navigateTo('GardenList')} >
              <View style={[baseStyles.centerContainer, styles.entryIcon, { backgroundColor: '#ff9911' }]}>
                <Icon name="loupan1" size={20} color="#fff" />
              </View>
              <Text style={styles.entryText}>楼盘</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.entryItem} onPress={() => this.navigateTo('Distribution')}>
              <View style={[baseStyles.centerContainer, styles.entryIcon, { backgroundColor: '#4ed5a4' }]}>
                <Icon name="fenxiao1" size={20} color="#fff" />
              </View>
              <Text style={styles.entryText}>分销</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.entryItem} onPress={() => this.navigateTo('CustomerList')}>
              <View style={[baseStyles.centerContainer, styles.entryIcon, { backgroundColor: '#ffc601' }]}>
                <Icon name="kehu" size={20} color="#fff" />
              </View>
              <Text style={styles.entryText}>客户</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.entryItem}
              onPress={() => {
                QFReactHelper.showPage('NEWHOUSE_CALC', {});
              }}
            >
              <View style={[baseStyles.centerContainer, styles.entryIcon, { backgroundColor: '#62ceff' }]}>
                <Icon name="gongju" size={20} color="#fff" />
              </View>
              <Text style={styles.entryText}>工具</Text>
            </TouchableOpacity>
          </View>

          <Commissions />

          <NewGarden navigation={this.props.navigation} />

        </ScrollView>

        {/* // searchBar */}
        <View
          ref={(c) => { this.searchBar = c; }}
          style={[styles.searchBar, isInline ? { paddingRight: 12 } : { paddingRight: 0 }]}
        >
          {/* 内联返回按钮 */}
          {
            isInline ?
              (

                <TouchableOpacity
                  style={styles.iconPress}
                  onPress={() => {
                    QFReactHelper.navPop();
                  }}
                >
                  <Icon name="navigate-go-back" size={20} color="#3a3a3a" />
                </TouchableOpacity>

              )
              : null
          }

          <TouchableOpacity
            onPress={() => {
              UMNative.onEvent('XF-ExternalHome-GardenSearch');
              this.navigateTo('GardenSearch');
            }}
            style={styles.searchBox}
          >
            <View style={styles.searchView}>
              <Icon name="magnifier" size={18} color="#7e7e7e" style={styles.searchIcon} />
              <Text style={[baseStyles.fz14, styles.searchText]}>请输入楼盘名</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View >
    );
  }
}
const styles = StyleSheet.create({

  bannerImg: {
    width: '100%',
    height: 200,
    // resizeMode: 'cover',
  },

  searchBar: {
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 3,
    ...Platform.select({
      android: {
        height: 60,
        paddingTop: 10,
      },
      ios: {
        height: 70,
        paddingTop: system.isIphoneX ? 60 : 20,
      },
    }),
    paddingRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(223, 224, 226, 0)', // '#dedfe1',
  },

  searchBox: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 6,
  },

  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },

  searchIcon: {
    marginLeft: 10,
    marginRight: 10,
  },

  searchText: {
    color: '#7e7e7e',
  },

  marqueeBox: {
    height: 40,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    paddingLeft: 15,
    backgroundColor: '#fefdf8',
  },

  marqueeCont: {
    height: 20,
    width: '100%',
    overflow: 'scroll',
    marginLeft: 5,
  },

  marqueeTextBox: {
    flex: 1,
    ...Platform.select({
      android: {
        height: 30,
      },
      ios: {
        height: 25,
      },
    }),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 5,
  },

  quickEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },

  entryItem: {
    flex: 1,
    alignItems: 'center',
  },

  entryIcon: {
    width: 45,
    height: 45,
    borderRadius: 45,
  },

  entryText: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
    color: '#7e7e7e',
  },
  iconPress: {
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
