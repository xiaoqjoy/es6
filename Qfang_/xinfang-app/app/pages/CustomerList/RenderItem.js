import React, { PureComponent } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  DeviceEventEmitter,
  Linking,
  Alert,
} from 'react-native';


import { QFReactHelper, UMNative } from '../../common/NativeHelper';

import Icon from '../../components/Icon/';
import baseStyles from '../../components/baseStyles';

import { screen, system } from '../../utils';

import { parseIntention } from '../../utils/IntentionParse';

class RenderItem extends PureComponent {
  constructor() {
    super();
    this.eventName = `customerListItem${Math.random()}`;
  }
  componentDidMount() {
    this.refresh = DeviceEventEmitter.addListener(
      this.eventName,
      () => {
        this.props.item.unFollowed = false;
        this.setState({
          refresh: Math.random(),
        });
      },
    );
  }

  componentWillUnmount() {
    // 移除
    this.refresh.remove();
  }

  callCustomer(item) {
    Linking.canOpenURL(`tel:${item.phone}`)
      .then((supported) => {
        if (!supported) {
          Alert.alert('当前版本不支持拨打号码');
        } else {
          UMNative.onEvent('XF-CustomerList-Dial');
          Linking.openURL(`tel:${item.phone}`);
        }
      })
      .catch((err) => console.log(`未知错误${err}`));
  }

  render() {
    const { item } = this.props;
    let groupBorderColor;
    let groupText;
    let groupTextBg;

    if (item.customerGroupName === '主攻') {
      groupBorderColor = {
        borderColor: '#ffdfdf',
      };
      groupTextBg = {
        backgroundColor: '#ffdfdf',
      };
      groupText = {
        color: '#ff0101',
      };
    }
    if (item.customerGroupName === '已成交') {
      groupBorderColor = {
        borderColor: '#e7e8ea',
      };
      groupTextBg = {
        backgroundColor: '#e7e8ea',
      };
      groupText = {
        color: '#7e7e7e',
      };
    }

    let { onSelect } = this.props;

    if (!onSelect) {
      onSelect = () => {
        requestAnimationFrame(() => {
          this.props.navigation.navigate('CustomerDetails', {
            customerId: item.customerId,
            id: item.id,
            phone: item.phone,
            eventName: this.eventName,
          });
        });
      };
    }
    const showCustomerGroupName = item.customerGroupName === '主攻' || item.customerGroupName === '已成交';
    const isRedPoint = item.customerSourceDesc === '集团分配' && item.unFollowed;
    const { customerIntentionList = [] } = item;
    const customerIntentionListLength = customerIntentionList.length;

    return (
      <TouchableOpacity
        style={styles.touchList}
        activeOpacity={0.6}
        underlayColor="#fff"
        onPress={onSelect.bind(this)}
      >
        <View style={[styles.item, { paddingRight: 30 }]}>
          {/* 分组 */}
          {
            showCustomerGroupName ?
              <View style={[styles.groupContainer]}>
                <View style={[groupBorderColor, styles.triangle]} />
                <View style={[groupTextBg, {
                  position: 'absolute', top: system.isIOS ? 5 : 3, right: 0, transform: [{ rotateZ: '45deg' }],
                }]}
                >
                  <Text style={[{ fontSize: 10 }, groupText]}>
                    {item.customerGroupName === '已成交' ? '成交' : item.customerGroupName}
                  </Text>
                </View>
              </View>
              : null
          }

          <View style={styles.lineView}>
            {
              isRedPoint ? <View style={styles.redPoint} /> : null
            }

            <Text style={{ color: '#3a3a3a', fontSize: 16 }}>
              {item.customerName}
            </Text>

            {
              item.customerSourceDesc === '集团分配' ?
                <View style={styles.source}>
                  <Text style={[{ fontSize: 12, color: '#7e7e7e' }]}>
                    {item.customerSourceDesc}
                  </Text>
                </View>
                : null
            }

          </View>

          <View style={styles.lineView}>
            {
              item.notFollowNum ?
                <Text style={{ fontSize: 14 }}>
                  <Text style={{ color: '#3a3a3a' }}>{item.notFollowNum}天</Text>
                  <Text style={{ color: '#7e7e7e' }}>未跟进</Text>
                </Text>
                : null
            }

            <TouchableOpacity
              onPress={() => {
                this.callCustomer(item);
                this.props.parent.followUpDialog(item, this);
              }}
            >
              <Icon style={{ marginLeft: 5 }} name="dianhua" size={30} color="#f91" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.split} />

        {
          customerIntentionListLength > 0 ? (
            <View style={{ flexDirection: 'column', paddingVertical: 15, paddingHorizontal: 12 }}>
              {
                customerIntentionListLength === 1 ?
                  (
                    <View style={{ paddingVertical: 5 }}>
                      <Text style={{ color: '#7e7e7e' }} numberOfLines={1}>
                        意向: {parseIntention(item.customerIntentionList[0])}
                      </Text>
                    </View>
                  )
                  :
                  (
                    item.customerIntentionList && item.customerIntentionList.map((val, i) => (
                      <View style={{ paddingVertical: 5 }} key={Math.random()}>
                        <Text style={{ color: '#7e7e7e' }} numberOfLines={1}>
                          意向{i + 1}: {parseIntention(val)}
                        </Text>
                      </View>
                    ))
                  )
              }
            </View>
          ) : null
        }


      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  touchList: {
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  item: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  lineView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  split: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#dedfe0',
    marginTop: 20,
    marginLeft: 12,
    marginRight: 12,
  },
  source: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 20,
    marginLeft: 5,
    backgroundColor: '#f5f5f9',
    borderColor: '#e7e8ea',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 2,
  },
  redPoint: {
    width: 8,
    height: 8,
    marginHorizontal: 5,
    backgroundColor: '#ff0101',
    borderRadius: 4,
  },
  triangle: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 0,
    height: 0,
    borderWidth: 15,
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
  },
});

export default RenderItem;
