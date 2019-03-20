import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  DeviceEventEmitter,
  InteractionManager,
} from 'react-native';
import Pagination from '../../components/Pagination';

import baseStyles from '../../components/baseStyles';

class MyReported extends PureComponent {
  constructor() {
    super();

    this.state = {
      filtersTabType: 'BACKLOG',
      param: {
        status: 'BACKLOG',
      },
    };
  }

  componentWillMount() {
    this.initParamFlag = false;
  }

  componentDidMount() {
    this.subRefresh = DeviceEventEmitter.addListener('refreshReportData', this.filtersChangeTab({ type: 'BACKLOG' }));
  }

  componentWillUnmount() {
    this.subRefresh.remove();
  }

  filtersChangeTab(option) {
    InteractionManager.runAfterInteractions(() => {
      this.initParamFlag = true;

      this.Pagination.page = 1;
      this.Pagination.loadMoreInitFlag = false;

      this.setState({
        filtersTabType: option.type,
        param: {
          status: option.type,
        },
      });

      this.Pagination.requestData();
    });
  }

  _renderItem(data) {
    const { navigate } = this.props.navigation;
    const dealItem = data.item;
    dealItem.submitTime = dealItem.submitTime.slice(0, dealItem.submitTime.indexOf(' ') + 1);

    return (
      <TouchableOpacity onPress={() => navigate('Distribution-ReportedDetail', { reservationId: dealItem.reservationId })}>
        <View style={[styles.DealItemView]}>
          <View style={styles.DealList}>
            <View style={[styles.DealListLi, styles.DealListLiStart]}>
              <Text style={[baseStyles.colorA8, baseStyles.fz16]}>楼        盘：</Text>
              <Text style={[baseStyles.colorA3a, baseStyles.fz16, { flex: 7, marginLeft: -4 }]} numberOfLines={1}>{dealItem.gardenName || ''}</Text>
            </View>
            <View style={[styles.DealListLi, styles.DealListLiEnd]}>
              <Text style={[baseStyles.fz14, baseStyles.colorFfa]}>{dealItem.status || ''}</Text>
            </View>
          </View>
          <View style={styles.DealList}>
            <View style={[styles.DealListLi, styles.DealListLiStart]}>
              <Text style={[baseStyles.colorA8, baseStyles.fz16]}>客       户：</Text>
              <Text style={[baseStyles.colorA3a, baseStyles.fz16]}>{dealItem.customerName || ''} ({dealItem.customerPhone || ''})</Text>
            </View>
          </View>
          <View style={[styles.DealList, styles.DealListLast]}>
            <View style={[styles.DealListLi, styles.DealListLiStart]}>
              <Text style={[baseStyles.colorA8, baseStyles.fz16]}>报备时间：</Text>
              <Text style={[baseStyles.colorA8, baseStyles.fz16]}>{dealItem.submitTime || ''}</Text>
            </View>
            {dealItem.guideProtectRemainingDays ?
              <View style={[styles.DealListLi, styles.DealListLiEnd]}>
                <Text style={[baseStyles.fz14, baseStyles.colorA8]}>待看保护还有</Text>
                <Text style={[baseStyles.fz14, baseStyles.colorEa5]}>{dealItem.guideProtectRemainingDays}</Text>
                <Text style={[baseStyles.fz14, baseStyles.colorA8]}>天</Text>
              </View> : null
            }
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={[baseStyles.container]}>
        <View style={[baseStyles.rowCenter, styles.filterTab]}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#f9f9f9"
            style={[styles.filtersItem, this.state.filtersTabType === 'BACKLOG' ? styles.filtersItemCur : '']}
            onPress={this.filtersChangeTab.bind(this, { type: 'BACKLOG' })}
          >
            <Text style={[baseStyles.colorA8, baseStyles.fz14, this.state.filtersTabType === 'BACKLOG' ? styles.filtersTextCur : '']}>待确认</Text>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#f9f9f9"
            style={[styles.filtersItem, this.state.filtersTabType === 'NO' ? styles.filtersItemCur : '']}
            onPress={this.filtersChangeTab.bind(this, { type: 'NO' })}
          >
            <Text style={[baseStyles.colorA8, baseStyles.fz14, this.state.filtersTabType === 'NO' ? styles.filtersTextCur : '']}>待带看</Text>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#f9f9f9"
            style={[styles.filtersItem, this.state.filtersTabType === 'GUIDE' ? styles.filtersItemCur : '']}
            onPress={this.filtersChangeTab.bind(this, { type: 'GUIDE' })}
          >
            <Text style={[baseStyles.colorA8, baseStyles.fz14, this.state.filtersTabType === 'GUIDE' ? styles.filtersTextCur : '']}>已带看</Text>
          </TouchableHighlight>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#f9f9f9"
            style={[styles.filtersItem, this.state.filtersTabType === 'OVERDUE' ? styles.filtersItemCur : '']}
            onPress={this.filtersChangeTab.bind(this, { type: 'OVERDUE' })}
          >
            <Text style={[baseStyles.colorA8, baseStyles.fz14, this.state.filtersTabType === 'OVERDUE' ? styles.filtersTextCur : '']}>已过期</Text>
          </TouchableHighlight>
        </View>
        <Pagination
          ref={(c) => { this.Pagination = c; }}
          url="distribution/personal/myReservations"
          filtersTabFalg
          getItemLayoutH={40}
          initParamFlag={this.initParamFlag}
          renderItem={this._renderItem.bind(this)}
          params={this.state.param}
          dataStructure="res.data.result.items"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filterTab: {
    height: 44,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dedfe0',
  },

  filtersItem: {
    flex: 1,
    height: 43,
    borderRightWidth: StyleSheet.hairlineWidth,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: '#f9f9f9',
    borderRightColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  filtersItemCur: {
    height: 45,
    backgroundColor: '#fff',
    borderBottomColor: '#fff',
    borderLeftColor: '#dedfe0',
    borderRightColor: '#dedfe0',
  },

  filtersTextCur: {
    color: '#ffa200',
  },

  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },

  DealItemView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: 8,
  },

  DealList: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginLeft: 15,
  },

  DealListLast: {
    borderBottomWidth: 0,
  },

  DealListLi: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingRight: 15,
  },

  DealListLiStart: {
    flex: 7,
    justifyContent: 'flex-start',
  },

  DealListLiEnd: {
    flex: 3,
    justifyContent: 'flex-end',
  },

  noDataTipStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
});

export default MyReported;
