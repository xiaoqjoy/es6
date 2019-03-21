import React, { PureComponent } from 'react';

import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  InteractionManager,
  DeviceEventEmitter,
} from 'react-native';

import axios from 'axios';
import baseStyles from './baseStyles';
import StatusView from './StatusView';

import { system } from '../utils/';

import { QFReactHelper, UMNative } from '../common/NativeHelper';

export default class Pagination extends PureComponent {
  state = {
    isRefreshing: false,
    loadMore: false,
    dataSource: [],
    status: '',
  }

  componentWillMount() {
    this.loadComplete = false;
    this.page = 1;
    this.loadMoreInitFlag = false;
  }

  componentDidMount() {
    if (this.props.filtersTabFalg) { // 默认tab标签选中时避免重复请求数据
      return;
    }

    InteractionManager.runAfterInteractions(this.requestData.bind(this));
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  // 为了让 onScrollEndDrag 和 onTouchEnd 只触发一次，暂时使用这种不优雅的写法
  onceScrollOrTouch(e, isScroll) {
    if (this.canScroll && !isScroll) {
      this.canScroll = false;
      return;
    }
    this.canScroll = !!isScroll;
    this.props.scrollHandle && this.props.scrollHandle(e, this.canScroll);
  }

  requestData() {
    const {
      initParamFlag,
      url,
      params,
      statisticaType,
      dataStructure,
      refreshCountType,
    } = this.props;

    if (initParamFlag && !this.loadMoreInitFlag) { // tab切换请求数据的时候初始化参数值
      this.setState({
        status: '',
        dataSource: [],
      });

      this.page = 1;
    }

    axios.get(url, {
      params: {
        ...params,
        currentPage: this.page,
        pageSize: 10,
      },
    }).then((res) => {
      if (res.data.status === 'C0000') {
        let dataAcount = [];
        let loadMoreFlag = true;

        if (this.page === 1) {
          switch (statisticaType) {
            case 'followUp':
              UMNative.onEvent('XF-Customer-FollowUpRecord');
              break;
            case 'customServiceFollowUp':
              UMNative.onEvent('XF-Customer-CustomServiceFollowUpRecord');
              break;
            case 'reported':
              UMNative.onEvent('XF-Customer-ReportedRecord');
              break;
            case 'lookWith':
              UMNative.onEvent('XF-Customer-TakeALook');
              break;
            default:
              break;
          }
        }

        if (this.page >= res.data.result.pageCount) {
          loadMoreFlag = false;
        }

        dataAcount = this.state.dataSource.concat(eval(dataStructure));

        if (refreshCountType) {
          // 报备和带看请求到数据时更新tab上的数量总数
          DeviceEventEmitter.emit('tabCountDataFresh', {
            type: refreshCountType,
            countData: res.data.result.recordCount,
          });
        }

        this.setState({
          dataSource: dataAcount,
          isRefreshing: false,
          loadMore: loadMoreFlag, // 加载更多
          status: dataAcount.length ? '' : 'no-data-found',
        });

        this.loadComplete = true; // 加载完成
      } else {
        this.setState({
          dataSource: [],
          isRefreshing: false,
          status: 'request-failed',
        });
      }
    }).catch((error) => {
      console.log('error=', error);
      this.setState({
        dataSource: [],
        isRefreshing: false,
        status: 'network-error',
      });
    });
  }

  _onRefresh() {
    this.setState({
      dataSource: [],
    });

    this.page = 1;
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(this.requestData.bind(this), 0);
  }

  _onScrollEnd() {
    if (!this.state.loadMore || !this.loadComplete) {
      return;
    }

    InteractionManager.runAfterInteractions((() => {
      this.setState({
        page: this.page += 1,
        loadMore: true,
      });

      this.loadComplete = false;
      this.loadMoreInitFlag = true;
      this.requestData();
    }));
  }

  _footer() {
    return (
      this.state.loadMore ?
        <ActivityIndicator
          style={{ height: 40, backgroundColor: '#f5f5f9', transform: [{ scale: 1.2 }] }}
          size="small"
          animating
        /> :
        (
          <View style={styles.noDataTipStyle}>
            <Text style={baseStyles.colorA8}>没有更多数据了</Text>
          </View>
        )
    );
  }

  render() {
    return (
      <View>
        {this.state.dataSource.length ?
          <FlatList
            ref={(flatList) => { this._flatList = flatList; }}
            initialListSize={4}
            data={this.state.dataSource}
            renderItem={this.props.renderItem.bind(this)}
            keyExtractor={(item, index) => index}
            ListFooterComponent={this._footer.bind(this)}
            onEndReachedThreshold={0.2}
            onEndReached={this._onScrollEnd.bind(this)}
            refreshControl={
              <RefreshControl
                tintColor="#ccc"
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh.bind(this)}
                enabled
              />
            }
            onScrollEndDrag={(event) => (this.onceScrollOrTouch(event, true))}
          />
          : <StatusView
            status={this.state.status}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noDataTipStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
});
