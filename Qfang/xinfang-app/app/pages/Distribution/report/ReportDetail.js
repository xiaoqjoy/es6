/**
 * Created by yoara on 2017/6/9.
 */
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ListView,
  InteractionManager,
} from 'react-native';

import axios from 'axios';

import BottomBar from '../../../components/BottomBar/BottomBar';
import LoadingView from '../../../components/LoadingView';
import * as Constants from '../../../common/Constants';
import { QFReactHelper, UMNative } from '../../../common/NativeHelper';

import GoBack from '../../../components/GoBack';


const cellW = Constants.STANDARD_WIDTH;
const itemInnerActive = '#ffa200';
const itemInner = '#dedede';
const urlReportDetail = '/distribution/personal/reservationDetail';


export default class ReportDetail extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: '报备详情',
    headerLeft: (<GoBack navigation={navigation} />),
    headerRight: <Text />,
  });

  constructor() {
    super();
    this.state = { loading: true };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.requestData.bind(this));
  }

  requestData() {
    axios.get(urlReportDetail, {
      params: {
        reservationId: this.props.navigation.state.params.reservationId,
      },
      timeout: 3000,
    }).then((res) => {
      if (res.data.status === 'C0000') {
        this.setState({ data: res.data.result, loading: false });
      }
    }).catch((err) => {
      console.log(err);
      QFReactHelper.show('服务器开小差了~', 5);
    });
  }

  showItem(rowData, sectionID, rowID) {
    const firstItem = rowID == 0;
    return (
      <View style={[styles.historyItem, firstItem && { marginTop: 10 }]}>
        <View style={[styles.historyItemIcon, firstItem && styles.historyItemIconActive]}>
          <View style={[styles.historyItemIconInner, firstItem && styles.historyItemIconInnerActive]} />
        </View>
        {firstItem ? <Image /> : <View style={styles.historyItemIconLine} />}
        <Text style={[styles.historyItemInfo, firstItem && styles.historyItemInfoActive]}>{rowData.operationType}</Text>
        <Text style={styles.historyItemTime}>{rowData.operationTime}</Text>
        <Text style={styles.historyItemOperator}>{rowData.operationUser}</Text>
      </View>
    );
  }


  containerView() {
    const infos = this.state.data ? this.state.data.reservationRecord : [];
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const items = ds.cloneWithRows(infos);


    const {
      customerName,
      customerId = '',
      privateCustomerId = '',
      customerPhone,
      expandId,
      gardenName,
      contacters,
    } = this.state.data;

    const events = [];

    contacters.forEach((c) => {
      const cs = c.split(',');
      events.push({
        name: cs[0],
        phone: cs[1],
        type: 'tel',
      });
    });

    const report = () => {
      this.props.navigation.navigate('AddReport', {
        expandId,
        gardenName,
        customerPhone,
        customerName,
        privateCustomerId,
        customerId,
      });
    };

    const customer = [
      {
        name: customerName,
        phone: customerPhone,
        type: 'tel',
        showContent: <Text>拨打电话</Text>,
      },
      {
        name: customerName,
        phone: customerPhone,
        type: 'sms',
        showContent: <Text>发送短信</Text>,
      },
    ];

    const bar = [
      {
        icon: 'ear-phone',
        text: '联系案场',
        events,
      },
      {
        icon: 'phone',
        text: '联系客户',
        events: customer,
      },
      {
        icon: 'chongxinbaobei',
        text: '重新报备',
        func: report,
      },
    ];
    const infosLength = infos.length === 0 ? 1 : infos.length;
    const historyRadio = infos.length > 4 ? 4 : infosLength;
    const historyHeight = Constants.culHeight(76) * historyRadio;
    const historyMarginTop = Constants.culHeight(-440) + historyHeight;

    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.infoText}>楼盘：{gardenName}</Text>
          <View style={styles.infoSeparator} />
          <Text style={styles.infoText}>客户：{customerName}</Text>
        </View>
        <View
          style={[styles.historyContainer, { height: historyHeight, marginTop: historyMarginTop }]}
        >
          <ListView
            dataSource={items}
            renderRow={(rowData, sectionID, rowID) => this.showItem(rowData, sectionID, rowID)}
          />
        </View>
        <BottomBar items={bar} />
      </View>
    );
  }

  render() {
    if (this.state.loading) {
      return <LoadingView />;
    }
    return this.containerView();
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#f5f5f9',
  },
  info: {
    flexDirection: 'column',
    height: 163,
    backgroundColor: '#fd9e4a',
    paddingTop: 10,
    paddingLeft: 15,
  },
  infoSeparator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#dedfe0',
  },
  infoText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 16,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  historyContainer: {
    backgroundColor: '#fff',
    width: cellW * 0.92,
    marginLeft: cellW * 0.04,
    elevation: 20,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: '#bababa',
    shadowOpacity: 16,
    shadowRadius: 4,
  },
  historyItem: {
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  historyItemIcon: {
    width: 16,
    height: 16,
    marginLeft: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    borderColor: itemInner,
  },
  historyItemIconActive: {
    borderColor: itemInnerActive,
  },
  historyItemIconInner: {
    marginLeft: 3.5,
    marginTop: 3.5,
    width: 8,
    height: 8,
    borderRadius: 5,
    borderColor: itemInner,
    backgroundColor: itemInner,
  },
  historyItemIconInnerActive: {
    borderColor: itemInnerActive,
    backgroundColor: itemInnerActive,
  },
  historyItemIconLine: {
    width: 0,
    height: Constants.culHeight(58),
    marginLeft: 22,
    marginTop: Constants.culHeight(-58),
    borderRightWidth: StyleSheet.hairlineWidth,
    borderColor: itemInner,
    position: 'absolute',
  },
  historyItemInfo: {
    marginLeft: 10,
    marginTop: Constants.OS === 'ios' ? 0 : -2,
    width: cellW * 0.7,
    height: Constants.culHeight(26),
    color: '#a8a8a8',
    fontSize: 16,
    textAlignVertical: 'center',
  },
  historyItemInfoActive: {
    color: itemInnerActive,
  },
  historyItemTime: {
    width: cellW * 0.4,
    height: Constants.culHeight(22),
    marginTop: 5,
    marginLeft: 44,
    color: '#a8a8a8',
    fontSize: 12,
  },
  historyItemOperator: {
    width: cellW * 0.25,
    height: Constants.culHeight(24),
    marginTop: 2,
    paddingTop: 2,
    marginLeft: 35,
    color: '#a8a8a8',
    textAlign: 'right',
    fontSize: 16,
  },
  bottomBar: {
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'space-around',
  },
});
