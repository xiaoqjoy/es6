/**
 * qfang.com xinfang
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native';

import axios from 'axios';
import { SafeAreaView } from 'react-navigation';

import UltimateListView from 'react-native-ultimate-listview';

import StatusView from '../../components/StatusView';


import ReleaseDetailsItem from './ReleaseDetailsItem';

import TextInputModal from '../../components/TextInputModal';


// 调用原生app模块
import { QFReactHelper } from '../../common/NativeHelper';
import GoBack from '../../components/GoBack';

import { system, screen } from '../../utils';
import baseStyles from '../../components/baseStyles';


class ReleaseDetails extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: '战报实况',
      headerLeft: (<GoBack navigation={navigation} />),
      headerRight: <Text />,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      // loading: true,
      // releaseData: {},
    };

    this.onFetch = this.onFetch.bind(this);
    this.releaseDetailsItem = this.releaseDetailsItem.bind(this);
  }

  componentDidMount() {
    // InteractionManager.runAfterInteractions(this.requestData.bind(this));
    this.listener = DeviceEventEmitter.addListener('RefreshReleaseList', () => {
      this.listView.refresh();
    });
  }

  componentWillUnmount() {
    // UMNative.onPageEnd('REPORT_MANAGER');
    this.listener.remove();
  }

  async onFetch(page = 1, startFetch, abortFetch) {
    try {
      this.params.page = page;
      const res = await this.requestData();
      startFetch(res, 5);
    } catch (err) {
      abortFetch();
    }
  }


  requestData() {
    const { params } = this.props.navigation.state;

    return axios.get('garden/report/queryReportsForExpand', {
      params: {
        ...this.params,
        expandId: params.expandId,
        pageSize: 10,
      },
    })
      .then((res) => {
        if (res.data.status !== 'C0000') {
          return [];
        }

        return res.data.result.items;
      }).catch(() => {
        QFReactHelper.show('服务器开小差了~', 5);
        return [];
      });
  }

  params = { page: 1 }

  releaseDetailsItem(item) {
    return (
      <ReleaseDetailsItem item={item} parent={this} />
    );
  }

  render() {
    return (
      <View style={[baseStyles.container]}>

        <TextInputModal
          ref={(textInputModal) => {
            this.textInputModal = textInputModal;
          }}
        />

        <UltimateListView
          refreshable
          refreshableMode={system.isIOS ? 'advanced' : 'basic'}
          refreshableTitlePull="下拉刷新"
          refreshableTitleRelease="释放加载"
          refreshableTitleRefreshing="加载中"
          displayDate
          dateTitle="上次加载时间："
          onFetch={this.onFetch}
          ref={(ref) => { this.listView = ref; }}
          keyExtractor={(item, index) => index}
          item={this.releaseDetailsItem}
          numColumns={1}
          pagination
          autoPagination
          paginationFetchingView={() => (
            <View style={styles.center}>
              <StatusView styles={{ backgroundColor: '#fff' }} />
              <Text style={{ color: '#7e7e7e', marginLeft: 10, fontSize: 14 }}>
                加载中
              </Text>
            </View>)}
          paginationAllLoadedView={() => (
            <View style={[styles.pageAllLoad]}>
              <Text style={{ color: '#7e7e7e' }}>没有更多数据了</Text>
            </View>)}
          paginationWaitingView={() => (<StatusView />)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    height: screen.height - 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  pageAllLoad: {
    backgroundColor: '#fff',
    width: screen.width,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  releaseContainer: {
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 10,
  },
  commonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 66,
  },
  leftYellow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderLeftWidth: 3,
    borderLeftColor: '#ffc601',
  },
  commonTitle: {
    paddingLeft: 12,
    fontSize: 18,
    color: '#3a3a3a',
  },
  commentMain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 54,
    paddingHorizontal: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#e7e8ea',
  },
  commentLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  modelBox: {
    paddingHorizontal: 40,
    paddingVertical: 20,
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

export default ReleaseDetails;
