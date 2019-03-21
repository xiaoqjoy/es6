import React, { PureComponent } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  InteractionManager,
} from 'react-native';

import axios from 'axios';

import Icon from '../../components/Icon/';

import detailStyles from './detail.styles';

import GoBack from '../../components/GoBack';
// 请求异常组件
import StatusView from '../../components/StatusView';
// 参数详情
class Parameter extends PureComponent {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: '楼盘参数',
    headerLeft: (<GoBack navigation={navigation} />),

  })

  constructor(props) {
    super(props);

    this.state = {};
  }


  render() {
    const { params } = this.props.navigation.state;
    let developerStr = '';
    const mainData = params.data;
    const companyLength = mainData.developers.length;

    if (companyLength == 0) {
      developerStr = '--';
    } else {
      for (let i = 0; i < companyLength; i++) {
        developerStr += mainData.developers[i].name;
      }
    }

    if (params.curStatus) {
      return <StatusView status={params.curStatus} />;
    }

    return (
      <ScrollView style={detailStyles.container}>
        {/* 第一部分 */}
        <View style={[detailStyles.block, detailStyles.mt10]}>
          <View style={[detailStyles.flexleftContainer]}>
            <Text style={[detailStyles.lists, styles.widths]}>开盘时间:</Text>
            <Text style={[detailStyles.lists, detailStyles.c3a3a3a]}>
              {mainData.openDateStr || '--'}
            </Text>
          </View>
          <View style={[detailStyles.flexleftContainer, detailStyles.borderTop]}>
            <Text style={[detailStyles.lists, styles.widths]}>入住时间:</Text>
            <Text style={[detailStyles.lists, detailStyles.c3a3a3a]}>
              {mainData.liveDateStr || '--'}
            </Text>
          </View>
          {/**/}
          {/* 地址 */}
          <View style={[detailStyles.flexleftContainer, detailStyles.borderTop]}>
            <View>
              <Text style={[detailStyles.lists, styles.widths]}>售楼地址:</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[detailStyles.lists, detailStyles.c3a3a3a, detailStyles.lh20]}>
                {mainData.sellAddress || '--'}
              </Text>
            </View>
          </View>
          {/* 地址 */}
          {/**/}
          <View style={[detailStyles.flexleftContainer, detailStyles.borderTop]}>
            <Text style={[detailStyles.lists, styles.widths]}>价格区间:</Text>
            <Text style={[detailStyles.lists, detailStyles.c3a3a3a]}>


              {(mainData.minPrice && mainData.maxPrice) ? `${mainData.minPrice}~${mainData.maxPrice}/㎡` : '--'}
            </Text>
          </View>
          {/**/}
        </View>
        {/* 第一部分 */}
        {/* 第二部分 */}
        <View style={[detailStyles.block, detailStyles.mt10]}>
          {/**/}
          <View style={[detailStyles.flexleftContainer]}>
            <Text style={[detailStyles.lists, styles.widths]}>物业类型:</Text>
            <Text style={[detailStyles.lists, detailStyles.c3a3a3a]}>
              {mainData.propertyTypeCodeStr || '--'}
            </Text>
          </View>
          {/**/}
          {/**/}
          <View style={[detailStyles.flexleftContainer, detailStyles.borderTop]}>
            <Text style={[detailStyles.lists, styles.widths]}>装修情况:</Text>
            <Text style={[detailStyles.lists, detailStyles.c3a3a3a]}>
              {mainData.decorationStr ? mainData.decorationStr : '--'}
            </Text>
          </View>
          {/**/}
          {/**/}
          <View style={[detailStyles.flexleftContainer, detailStyles.borderTop]}>
            <Text style={[detailStyles.lists, styles.widths]}>总 栋 数 :</Text>
            <Text style={[detailStyles.lists, detailStyles.c3a3a3a]}>
              {mainData.totalBuildings ? `${mainData.totalBuildings}栋` : '--'}
            </Text>
          </View>
          {/**/}
          {/**/}
          <View style={[detailStyles.flexleftContainer, detailStyles.borderTop]}>
            <Text style={[detailStyles.lists, styles.widths]}>总 户 数 :</Text>
            <Text style={[detailStyles.lists, detailStyles.c3a3a3a]}>
              {mainData.totalHouseHolds ? `${mainData.totalHouseHolds}户` : '--'}
            </Text>
          </View>
          {/**/}
          {/**/}
          <View style={[detailStyles.flexleftContainer, detailStyles.borderTop]}>
            <Text style={[detailStyles.lists, styles.widths]}>楼层状况:</Text>
            <View style={{ flex: 1 }}>
              <Text style={[detailStyles.lists, detailStyles.c3a3a3a, detailStyles.lh22]}>
                {mainData.floorStatus || '--'}
              </Text>
            </View>
          </View>
          {/**/}
          {/**/}
          <View style={[detailStyles.flexleftContainer, detailStyles.borderTop]}>
            <Text style={[detailStyles.lists, styles.widths]}>车 位 数 :</Text>
            <Text style={[detailStyles.lists, detailStyles.c3a3a3a]}>
              {mainData.parkingNum ? mainData.parkingNum : '--'}
            </Text>
          </View>
          {/**/}
          {/**/}
          <View style={[detailStyles.flexleftContainer, detailStyles.borderTop]}>
            <Text style={[detailStyles.lists, styles.widths]}>车 位 费 :</Text>
            <Text style={[detailStyles.lists, detailStyles.c3a3a3a]}>
              {mainData.parkingCharge ? `${mainData.parkingCharge}元/月` : '--'}
            </Text>
          </View>
          {/**/}
          {/**/}
          <View style={[detailStyles.flexleftContainer, detailStyles.borderTop]}>
            <Text style={[detailStyles.lists, styles.widths]}>建筑面积:</Text>
            <Text style={[detailStyles.lists, detailStyles.c3a3a3a]}>
              {mainData.buildingArea ? `${mainData.buildingArea}平米` : '--'}
            </Text>
          </View>
          {/**/}
          {/**/}
          <View style={[detailStyles.flexleftContainer, detailStyles.borderTop]}>
            <Text style={[detailStyles.lists, styles.widths]}>占地面积:</Text>
            <Text style={[detailStyles.lists, detailStyles.c3a3a3a]}>
              {mainData.coverArea ? `${mainData.coverArea}平米` : '--'}
            </Text>
          </View>
          {/**/}
          {/**/}
          <View style={[detailStyles.flexleftContainer, detailStyles.borderTop]}>
            <Text style={[detailStyles.lists, styles.widths]}>容 积 率 :</Text>
            <Text style={[detailStyles.lists, detailStyles.c3a3a3a]}>
              {mainData.plotRatio ? `${mainData.plotRatio}%` : '--'}
            </Text>
          </View>
          {/**/}
          {/**/}
          <View style={[detailStyles.flexleftContainer, detailStyles.borderTop]}>
            <Text style={[detailStyles.lists, styles.widths]}>绿 化 率 :</Text>
            <Text style={[detailStyles.lists, detailStyles.c3a3a3a]}>
              {mainData.greenRatio ? `${mainData.greenRatio}%` : '--'}
            </Text>
          </View>
          {/**/}
        </View>
        {/* 第二部分 */}
        {/* 第三部分 */}
        <View style={[detailStyles.block, detailStyles.mt10]}>
          {/**/}
          <View style={[detailStyles.flexleftContainer]}>
            <Text style={[detailStyles.lists, styles.widths]}>开 发 商 :</Text>
            <View style={{ flex: 1 }}>
              <Text style={[detailStyles.lists, detailStyles.c3a3a3a, detailStyles.lh22]}>
                {developerStr}
              </Text>
            </View>
          </View>
          {/**/}
        </View>
        {/* 第三部分 */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  // 公用
  widths: {
    width: 95,
  },
});

export default Parameter;
