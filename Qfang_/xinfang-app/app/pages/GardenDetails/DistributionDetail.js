// 分销说明页
import React, { PureComponent } from 'react';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  InteractionManager,
} from 'react-native';

import axios from 'axios';

import Icon from '../../components/Icon/';

import detailStyles from './detail.styles';
import GoBack from '../../components/GoBack';
// 列表
class RenderComCashList extends PureComponent {
  render() {
    const item = this.props.item;
    const index = this.props.index;
    const topValue = !index ? 10 : 0;
    return (
      <View style={[detailStyles.block, { marginTop: topValue, marginBottom: 10 }]}>
        {/* 标题 */}
        <View style={detailStyles.inner}>
          <Text style={detailStyles.titletxt}>
            佣金方案<Text style={detailStyles.ca8a8a8}>{index + 1}</Text>
          </Text>
        </View>
        {/* 标题 */}
        <View style={[detailStyles.borderTop]}>
          {/* 方案说明 */}
          {item.programDescription ?
            <View style={{ paddingVertical: 18, paddingRight: 15 }}>
              <Text style={[styles.infoText, detailStyles.c3a3a3a]}>
                <Text style={detailStyles.ca8a8a8}>方案说明：</Text>
                {item.programDescription}
              </Text>
            </View> : null}
          <View style={[detailStyles.borderTop, detailStyles.inner, detailStyles.flexContainer]}>
            {item.retioMoney ?
              <View>
                <Text style={detailStyles.ca8a8a8}>佣金比例：<Text style={detailStyles.orange} >{item.retioMoney}</Text>%</Text>
              </View>
              : null}

            {item.fixedMoney ?
              <View>
                <Text style={detailStyles.ca8a8a8}>定佣：<Text style={detailStyles.orange} >{item.fixedMoney}</Text>元</Text>
              </View>
              : null}

            {item.cashMoney ?
              <View>
                <Text style={detailStyles.ca8a8a8}>现金奖：<Text style={detailStyles.orange} >{item.cashMoney}</Text>元</Text>
              </View>
              : null}
          </View>
        </View>
      </View>
    );
  }
}
// cash
class Cash extends PureComponent {
  _renderItem(data) {
    return (
      <RenderComCashList item={data.item} />
    );
  }
  render() {
    if (this.props.cash && !this.props.cash.length) {
      return null;
    }
    return (
      <View style={detailStyles.block}>
        {/* 标题 */}
        <View style={detailStyles.inner}>
          <Text style={detailStyles.titletxt}>
            现金奖说明
          </Text>
        </View>
        <FlatList
          data={this.props.cash}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}
// 佣金方案
class Commission extends PureComponent {
  _renderItem(data) {
    return (
      <RenderComCashList item={data.item} index={data.index} />
    );
  }
  render() {
    if (this.props.commissionPrograms && !this.props.commissionPrograms.length) {
      return (
        <View style={detailStyles.block}>
          {/* 标题 */}
          <View style={detailStyles.inner}>
            <Text style={detailStyles.titletxt}>
              佣金说明
            </Text>
          </View>
          {/* 标题 */}
          <View style={[detailStyles.borderTop]}>
            <Text style={[detailStyles.lists]}>佣金参阅分销规则或联系案场</Text>
          </View>
        </View>);
    }
    return (
      <FlatList
        data={this.props.commissionPrograms}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => index}
      />
    );
  }
}

class DistributionDetail extends PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: '分销说明',
    headerLeft: (<GoBack navigation={navigation} />),
  })

  constructor(props) {
    super(props);

    this.state = {
      dataSource: { customerReferral: { contacters: [] }, promotes: [] },
      responseaStatus: false,
    };
  }

  _renderItem(data) {
    return (
      <RenderComCashList item={data.item} />
    );
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.requestData.bind(this));
  }

  requestData() {
    const navigation = this.props.navigation;
    axios.get('garden/getCommissionRule', { params: { expandId: navigation.state.params.id } })
      .then((res) => {
        if (res.data.status !== 'C0000') {
          return;
        }
        const result = res.data.result;
        this.setState({
          dataSource: result,
          responseaStatus: true,
        });
      });
  }

  render() {
    const { reportPhone, customerRequirements, spotDiscipline } = this.props.navigation.state.params.takeLook;
    return (
      <ScrollView style={detailStyles.container}>
        {/* 佣金说明start */}
        <Commission commissionPrograms={this.state.dataSource.commissions} />
        {/* 佣金说明end */}

        {/* 佣金方案备注 */}
        {this.state.dataSource.commissionRemark ?
          <View style={[detailStyles.flexleftContainer, {
            paddingVertical: 10, marginBottom: 10, paddingHorizontal: 15, backgroundColor: '#fff',
          }]}
          >
            <Text style={[styles.nplists]}>
              备注：{this.state.dataSource.commissionRemark}
            </Text>
          </View>
          : null}
        {/* 备注 */}

        {/* 客户转介start */}
        <View style={detailStyles.block}>
          <View style={detailStyles.inner}>
            <Text style={detailStyles.titletxt}>
              客户转介
            </Text>
          </View>
          {/* 标题 */}
          <View style={[detailStyles.borderTop, detailStyles.inner]}>
            <View style={[detailStyles.flexleftContainer]}>
              <View style={[{ width: 105 }]}>
                <Text style={[styles.cusItem, detailStyles.ca8a8a8]}>
                  报 备 联 系 人:
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                {this.state.dataSource.customerReferral.contacters.map((item, index) => (
                  <Text style={styles.cusItem} key={index}>{`${item.name.split('-')[0]}-${item.phone}`}</Text>
                ))}
                {!this.state.dataSource.customerReferral.contacters.length && this.state.responseaStatus ? <Text style={styles.cusItem} >对不起，暂无信息</Text> : null}
              </View>
            </View>
            {/**/}
            <View style={[detailStyles.flexleftContainer, { marginTop: 5 }]}>
              <View style={[{ width: 105 }]}>
                <Text style={[styles.cusItem, detailStyles.ca8a8a8]}>
                  报备注意事项:
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cusItem}>{this.state.dataSource.customerReferral.reserveAttention || (this.state.responseaStatus && '对不起，暂无信息') || ''}</Text>
              </View>
            </View>
            {/**/}
            {/**/}
            <View style={[detailStyles.flexleftContainer, { marginTop: 5 }]}>
              <View style={{ width: 105 }}>
                <Text style={[styles.cusItem, detailStyles.ca8a8a8]}>
                  带 看 保 护 期:
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cusItem}>{this.state.dataSource.customerReferral.protectionPeriod ? `${this.state.dataSource.customerReferral.protectionPeriod}天` : (this.state.responseaStatus) && '对不起，暂无信息'}</Text>
              </View>
            </View>
            {/**/}
          </View>
        </View>
        {/* end */}

        {/* 结算佣金说明start */}
        <View style={detailStyles.block}>
          {/* 标题 */}
          <View style={detailStyles.inner}>
            <Text style={detailStyles.titletxt}>
              结算佣金说明
            </Text>
          </View>
          {/* 标题 */}
          <View style={[detailStyles.inner, detailStyles.borderTop]}>
            <Text style={[detailStyles.c3a3a3a, { lineHeight: 22 }]}>
              {this.state.dataSource.paidCommissionRemark || (this.state.responseaStatus && '对不起，暂无信息') || ''}
            </Text>
          </View>
        </View>
        {/* 结算佣金说明 */}

        {/* 带看流程start */}
        <View style={detailStyles.block}>
          {/* 标题 */}
          <View style={detailStyles.inner}>
            <Text style={detailStyles.titletxt}>
              带看流程
            </Text>
          </View>
          {/* 标题 */}
          <View style={[detailStyles.inner, detailStyles.borderTop]}>
            {reportPhone ?
              (<View style={styles.flexRow}>
                <View style={styles.alignCenter}>
                  <Text style={[detailStyles.c3a3a3a, { lineHeight: 22 }]}>投诉电话：{reportPhone}</Text>
                </View>
               </View>)
              : null
            }
            {customerRequirements ?
              (<View style={styles.flexRow}>
                <View style={styles.alignCenter}>
                  <Text style={[detailStyles.c3a3a3a, { lineHeight: 22 }]}>客户界定：{customerRequirements}</Text>
                </View>
               </View>)
              : null
            }
            {spotDiscipline ?
              (<View style={styles.flexRow}>
                <View style={styles.alignCenter}>
                  <Text style={[detailStyles.c3a3a3a, { lineHeight: 22 }]}>现场纪律：{spotDiscipline}</Text>
                </View>
               </View>)
              : null
            }
            <Text style={[detailStyles.c3a3a3a, { lineHeight: 22 }]}>
              {this.state.dataSource.lookProcess || (this.state.responseaStatus && '对不起，暂无信息') || ''}
            </Text>
          </View>
        </View>
        {/* 带看流程 */}

        {/* CALL客词start */}
        <View style={detailStyles.block}>
          {/* 标题 */}
          <View style={detailStyles.inner}>
            <Text style={detailStyles.titletxt}>
              CALL客词
            </Text>
          </View>
          {/* 标题 */}
          <View style={[detailStyles.inner, detailStyles.borderTop]}>
            <Text style={[detailStyles.c3a3a3a, { lineHeight: 22 }]}>
              {this.state.dataSource.callWords || (this.state.responseaStatus && '对不起，暂无信息') || ''}
            </Text>
          </View>
        </View>
        {/* CALL客词 */}

        {/* 推广语start */}
        <View style={detailStyles.block}>
          {/* 标题 */}
          <View style={detailStyles.inner}>
            <Text style={detailStyles.titletxt}>
              推广语
            </Text>
          </View>
          {/* 标题 */}
          <View style={[detailStyles.inner, detailStyles.borderTop]}>
            <Text style={[detailStyles.c3a3a3a, { lineHeight: 22 }]}>
              {this.state.dataSource.promotes.map((item, index) => {
                if (item) {
                  return (
                    `${item}  `
                  );
                }
              })}
              {(!this.state.dataSource.promotes.length || !this.state.dataSource.promotes[0]) ? <Text style={[detailStyles.c3a3a3a, { lineHeight: 22 }]}>{(this.state.responseaStatus) && '对不起，暂无信息'}</Text> : null}
            </Text>
          </View>
        </View>
        {/* 推广语 */}

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  infoText: {
    fontSize: 16,
    lineHeight: 20,
  },
  nplists: {
    fontSize: 12,
    color: '#a8a8a8',
    backgroundColor: '#fff',
    lineHeight: 20,
  },
  cusItem: {
    fontSize: 14,
    lineHeight: 22,
    color: '#3a3a3a',
  },
});
export default DistributionDetail;
