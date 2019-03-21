import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableHighlight,
} from 'react-native';

import axios from 'axios';
import UltimateListView from 'react-native-ultimate-listview';
import Swiper from 'react-native-swiper';
import ImageLoad from 'react-native-image-placeholder';

import UserInfo from '../../common/UserInfo';
import RenderItem from '../../components/RenderItem';
import StatusView from '../../components/StatusView';

import { system, screen } from '../../utils';
import Filter from './Filter';

export default class GardenList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imgList: [],
    };
    this.params = { page: 1 };
    this.onFetch = this.onFetch.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }


  componentDidMount() {
    this.requestImg({});
  }

  async onFetch(page = 1, startFetch, abortFetch) {
    try {
      this.params.page = page;
      const res = await this.requestData();
      startFetch(res.list, 15);
    } catch (err) {
      abortFetch();
      console.log(err);
    }
  }

  onRefresh() {
    this.onFetch();
  }
  requestImg(opts) {
    axios.get('index/ad', { params: { cityId: opts.cityId || '' } }).then((res) => {
      if (res.data.status === 'C0000') {
        this.setState({ imgList: res.data.result.list });
      }
    }).catch(() => {
      this.setState({
        imgList: [],
      });
    });
  }
  requestData() {
    return axios.get('garden/list', { params: this.params || {} }).then((res) => {
      if (res.data.status === 'C0000') {
        return res.data.result;
      }
      return { list: [] };
    }).catch((error) => {
      console.log('error=', error);
      return { list: [] };
    });
  }

  renderItem(item) {
    return (
      <View style={{ paddingLeft: 15 }}>
        <RenderItem item={item} navigation={this.props.navigation} showCommission={UserInfo.commissionRate} />
      </View>

    );
  }

  render() {
    return (
      <View style={styles.newEstateBox}>
        <UltimateListView
          style={system.isIOS ? { marginTop: 38 } : { marginTop: 35 }}
          onFetch={this.onFetch}
          ref={(ref) => { this.listView = ref; }}
          keyExtractor={(item, index) => index}
          refreshable
          item={this.renderItem}
          numColumns={1}
          pagination
          paginationFetchingView={() => (
            <View style={styles.center}>
              <StatusView styles={{ backgroundColor: '#fff' }} />
              <Text style={{ color: '#7e7e7e', marginLeft: 10, fontSize: 14 }}>加载中</Text>
            </View>
          )}
          refreshControl={
            <RefreshControl
              tintColor="#ccc"
              refreshing={false}
              onRefresh={this.onRefresh}
            />
          }
          paginationAllLoadedView={() => (
            <View style={[styles.pageAllLoad]}>
              <Text style={{ color: '#7e7e7e' }}>没有更多数据了</Text>
            </View>
          )}
          header={() => {
            const ele = this.state.imgList.length ?
              (
                <Swiper
                  activeDotColor="#fff"
                  dotStyle={{ top: 20 }}
                  activeDotStyle={{ top: 20 }}
                  showsButtons={false}
                  showsPagination
                  autoplay
                  autoplayTimeout={1.5}
                  height={162}
                >
                  {
                    this.state.imgList.map((item) => {
                      item.pictureUrl = item.picUrl.replace('{size}', '750x324');
                      return (
                        <TouchableHighlight
                          style={{ width: '100%', height: 162 }}
                          key={Math.random()}
                          onPress={() => {
                            console.log(item.expandId, item.gardenName);
                            /* UMNative.onEvent('XF-GardenDetails-Album');
                            QFReactHelper.showPage('NEWHOUSE_ALBUM', params); */
                            this.props.navigation.navigate('GardenDetails', {
                              id: item.expandId,
                              name: item.gardenName,
                            });
                          }}
                        >
                          <View style={styles.slide} >
                            <ImageLoad
                              style={styles.listImg}
                              loadingStyle={{ size: 'small', color: 'white' }}
                              placeholderSource={require('../../assets/img/img-placeholder.png')}
                              placeholderStyle={{ backgroundColor: '#dedfe1', width: '100%', height: '100%' }}
                              source={{ uri: item.pictureUrl }}
                            />
                          </View>
                        </TouchableHighlight>
                      );
                    })}
                </Swiper>) : null;
            return ele;
          }
          }
          paginationWaitingView={() => (<StatusView />)}
        />
        <Filter
          fetch={this.requestData}
          ref={(c) => { this.query = c; }}
          parent={this}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  newEstateBox: {
    paddingTop: 10,
    backgroundColor: '#fff',
    zIndex: 1,
    flex: 1,
  },
  noDataTipStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 40,
  },
  center: {
    height: screen.height - 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageAllLoad: {
    backgroundColor: '#fff',
    width: screen.width,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  listImg: {
    width: '100%',
    height: '100%',
    // resizeMode: 'cover'
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
