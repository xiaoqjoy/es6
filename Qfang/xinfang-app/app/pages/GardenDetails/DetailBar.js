/**
 * qfang.com xinfang
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent } from 'react';
import { Linking, View, Text, StyleSheet } from 'react-native';

import axios from 'axios';

// 底部bar
import BottomBar from '../../components/BottomBar/BottomBar';
// 调用原生app模块
import { QFReactHelper, UMNative } from '../../common/NativeHelper';


class DetailBar extends PureComponent {
  constructor() {
    super();
    this.state = {
      redPoint: 0,
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const { expandId } = this.props.detailBarData;
    axios.get('garden/report/queryReportsForExpand', { params: { expandId } })
      .then((res) => {
        if (res.data.status === 'C0000') {
          this.setState({
            redPoint: res.data.result.recordCount,
          });
        }
      });
  }

  render() {
    const { navigation } = this.props;
    const {
      expandId, gardenName, contacters, directRoomCount, companyName, directRoomShareUrl,
    } = this.props.detailBarData;

    const events = [];

    if (contacters) {
      contacters.forEach((c) => {
        const cs = c.split(',');
        let remarks;
        if (cs[3]) {
          [remarks] = [cs[3]];
        }

        events.push({
          name: cs[1],
          phone: cs[2],
          showContent: (
            <View style={{
              flex: 1, paddingVertical: 5, height: 60, justifyContent: 'center',
            }}
            >
              <View>
                <Text style={styles.tipText}>
                  {`${cs[1].split('(')[0]}-${cs[2]}`}
                </Text>
              </View>
              {
                remarks ?
                  (
                    <View style={{ alignItems: 'center' }}>
                      <Text style={{ color: '#7e7e7e', fontSize: 14, paddingTop: 3 }}>（{remarks}）</Text>
                    </View>
                  )
                  : null
              }
            </View>
          ),
          type: 'func',
          func: (item) => {
            const url = `tel:${item.phone}`;

            Linking.canOpenURL(url)
              .then((supported) => {
                if (!supported) {
                  QFReactHelper.show('当前版本不支持拨打号码或发送短信', 5);
                } else {
                  UMNative.onEvent('XF-GardenDetails-Contact');
                  return Linking.openURL(url);
                }
              })
              .catch((err) => console.log(`未知错误${err}`));
          },
        });
      });
    }

    const bar = [
      {
        icon: 'ear-phone',
        text: '联系案场',
        events,
      },
      {
        icon: 'baobeikehu',
        text: '报备客户',
        func: () => {
          // 跳转到报备页面
          navigation.navigate('AddReport', {
            expandId,
            gardenName,
            companyName, // 默认所属分公司
          });
        },
      },
    ];

    // 如果有直推房源 canshare:是否需要分享 title:标题 url: 链接
    if (directRoomCount) {
      bar.push({
        icon: 'zhituifangyuan',
        text: '直推房源',
        func: () => {
          QFReactHelper.showPage('NEWHOUSE_WEBVIEW', {
            canshare: false,
            title: gardenName,
            url: directRoomShareUrl,
          });
        },
      });
    }

    bar.push({
      icon: 'zhanbaoshikuang',
      text: '战报实况',
      redPoint: this.state.redPoint,
      func: () => {
        // 跳转到报备页面
        navigation.navigate('ReleaseDetails', {
          expandId,
          gardenName,
        });
      },
    });
    return <BottomBar items={bar} />;
  }
}

const styles = StyleSheet.create({

  tipText: {
    color: '#ffa200',
    fontSize: 17,
    textAlign: 'center',
  },
});


export default DetailBar;
