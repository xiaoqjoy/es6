/**
 * qfang.com xinfang
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  DeviceEventEmitter,
  InteractionManager,
} from 'react-native';

import axios from 'axios';

import UserInfo from '../../common/UserInfo';

import Icon from '../../components/Icon/';

// 调用原生app模块
import { QFReactHelper, UMNative } from '../../common/NativeHelper';
import GoBack from '../../components/GoBack';

// 导航栏下拉筛选
import HeaderTitle from '../../components/SelectTitle/HeaderTitle';
import SelectDialog from '../../components/SelectTitle/SelectDialog';

// 请求异常组件
import StatusView from '../../components/StatusView';

import detailStyles from './detail.styles';
// 基本信息
import BasicInfo from './BasicInfo';
// 户型
import Layout from './Layout';
// 轮播图
import Album from './Album';

// 附近楼盘
import SurroundingGarden from './SurroundingGarden';
import ProjectIntroduction from './ProjectIntroduction';
import IntroductionSell from './IntroductionSell';
import SurroundPart from './SurroundPart';
// 佣金和现金奖
import Distribution from './Distribution';
// 动态
import Dynamics from './Dynamics';
import DetailBar from './DetailBar';


class GardenDetails extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const showTitle = params.defaultTitle || '';
    const headerTitle = params.filterData && params.filterData.length > 1 ?
      (<HeaderTitle params={params} />) : showTitle;
    return {
      headerTitle,
      headerRight: (
        <View style={[{ paddingRight: 15 }, detailStyles.flexleftContainer]}>
          <TouchableOpacity
            onPress={params.pressAttentioned}
            style={{ paddingRight: 15 }}
          >
            <Icon name={params.iconName} size={20} color="#7e7e7e" />
          </TouchableOpacity>
          <TouchableOpacity onPress={params.pressShare}>
            <Icon name="share" size={20} color="#7e7e7e" />
          </TouchableOpacity>
        </View>
      ),
      headTitleStyle: {
        alignSelf: 'center',
      },
      headerLeft: (<GoBack navigation={navigation} onBackPress={() => params.navigateBack && params.navigateBack()} />),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      filterData: [],
      pageStatus: 'loading',
      basicInfo: {},
      expandId: props.navigation.state.params.id,
    };
    this.selectCompanyName = '';
  }

  componentDidMount() {
    // 重新绑定后退按钮的事件;
    this.props.navigation.setParams({
      navigateBack: this.navigateBack.bind(this),
    });

    this.getFilterData();

    // InteractionManager.runAfterInteractions(this.requestData.bind(this));
  }

  async getFilterData() {
    let { filterData } = this.state;

    const { navigation } = this.props;

    await axios.get('garden/getExpandsByExpandId', { params: { expandId: navigation.state.params.id } })
      .then((res) => {
        if (res.data.status !== 'C0000') {
          this.setState({
            pageStatus: 'request-failed',
          });
          return;
        }

        filterData = res.data.result.map((item) => ({
          selectDialogName: item.orgunit.name,
          id: item.id,
        }));

        this.selectCompanyName = filterData.length ? filterData[0].selectDialogName : '';

        if (filterData.length) {
          this.requestData(filterData[0]);
        } else {
          this.setState({
            pageStatus: 'no-data-found',
          });
          this.props.navigation.setParams({
            defaultTitle: navigation.state.params.name,
          });
        }
      })
      .catch(() => {
        this.setState({
          pageStatus: 'network-error',
        });

        QFReactHelper.show('服务器开小差了~', 5);
      });
  }


  navigateBack() {
    // 若存在 screenProps.expandId ，则代表当前详情页是从原生 APP 中直接进入。
    // 若是直接从 APP 中进入的，当点击后退，则返回 APP。
    global.requestAnimationFrame(() => {
      if (this.props.screenProps.expandId) {
        QFReactHelper.navPop();
      } else {
        this.props.navigation.goBack();
        DeviceEventEmitter.emit('refresh');
      }
    });
  }


  // 页面主体数据需要根据请求回来的头部城市id来获取
  requestData(val) {
    let { expandId } = this.state;

    const { filterData } = this.state;

    const { navigation } = this.props;

    // 请求页面主体数据
    if (val) {
      expandId = val.id;
    } else {
      expandId = filterData ? filterData[0].id : expandId;
    }

    axios.get('garden/mainInformation', { params: { expandId } })
      .then((res) => {
        if (res.data.status !== 'C0000') {
          this.setState({
            pageStatus: 'request-failed',
          });
          return;
        }

        this.setState({
          pageStatus: '',
          basicInfo: res.data.result,
          filterData,
          expandId,
        });


        const { isAttentioned } = res.data.result;
        // bookmark2是实心图标
        const iconName = isAttentioned ? 'bookmark2' : 'bookmark1';

        this.props.navigation.setParams({
          defaultTitle: filterData.length > 1 ? filterData[0].selectDialogName : navigation.state.params.name,
          filterData,
          pressAttentioned: this.pressAttentioned.bind(this),
          pressShare: this.pressShare.bind(this),
          iconName,
        });
      })
      .catch(() => {
        this.setState({
          pageStatus: 'network-error',
        });
        QFReactHelper.show('服务器开小差了~', 5);
      });
  }

  pressShare() {
    const { params } = this.props.navigation.state;
    const { expandId } = this.state;
    // 分享参数app需要title: 标题，content:内容， imageUrl:缩略图图 link:分享的链接
    InteractionManager.runAfterInteractions(() => {
      axios.get('garden/share', { params: { expandId } })
        .then((res) => {
          if (res.data.status !== 'C0000') {
            return;
          }
          // 接口给的分享需要的参数
          const shareData = res.data.result;
          QFReactHelper.showPage('NEWHOUSE_SHARE', {
            expandId,
            title: shareData.title,
            content: shareData.content,
            imageUrl: shareData.imageUrl && shareData.imageUrl.replace('{size}', '300x300'),
            link: shareData.shortLink || shareData.longLink,
          });
        }).catch(() => {
          QFReactHelper.show('服务器开小差了~', 5);
        });
    });
  }

  pressAttentioned() {
    let { isAttentioned } = this.state.basicInfo;

    const ajaxUrl = isAttentioned ? 'cancelAttention' : 'attention';

    const { params } = this.props.navigation.state;

    const { expandId } = this.state;

    InteractionManager.runAfterInteractions(() => {
      axios.get(`garden/${ajaxUrl}`, { params: { expandId } })
        .then((res) => {
          if (res.data.status !== 'C0000') {
            return;
          }

          isAttentioned = !isAttentioned;
          let showStr = '取消关注成功！';
          let iconName = 'bookmark1';

          if (isAttentioned) {
            showStr = '关注成功！';
            iconName = 'bookmark2';
            UMNative.onEvent('XF-GardenDetails-Attention');
          }

          QFReactHelper.show(showStr, 5);

          this.state.basicInfo.isAttentioned = isAttentioned;
          this.props.navigation.setParams({
            iconName,
          });
          DeviceEventEmitter.emit('focusRefresh');
        }).catch(() => {
          QFReactHelper.show('服务器开小差了~', 5);
        });
    });
  }

  // 下拉导航title 筛选后  保存筛选参数和触发刷新事件
  filterDo(val) {
    if (val) {
      this.requestData(val);
      this.selectCompanyName = val.selectDialogName;
      DeviceEventEmitter.emit('refeshBasicInfo', val.id);
      DeviceEventEmitter.emit('refeshLayout', val.id);
      DeviceEventEmitter.emit('refeshDistribution', val.id);
      DeviceEventEmitter.emit('refeshSgarden', val.id);
      DeviceEventEmitter.emit('refeshSellPoint', val.id);
      DeviceEventEmitter.emit('refeshSurround', val.id);
    }
  }


  render() {
    const showCommission = UserInfo.commissionRate; // 是否显示佣金信息
    const { params } = this.props.navigation.state;
    const { expandId, filterData } = this.state;

    const { reportPhone, customerRequirements, spotDiscipline } = this.state.basicInfo;
    const gardenName = params.name;
    const { contacters, directRoomCount, directRoomShareUrl } = this.state.basicInfo;

    const detailBarData = {
      expandId,
      gardenName,
      contacters,
      directRoomCount,
      directRoomShareUrl,
      companyName: this.selectCompanyName,
    };

    const takeLook = {
      reportPhone,
      customerRequirements,
      spotDiscipline,
    };

    return (


      <View style={[detailStyles.container, { justifyContent: 'space-between', flex: 1 }]}>

        <StatusView page status={this.state.pageStatus} />


        {/* 导航下拉弹窗 */}
        <SelectDialog selectData={filterData} parent={this} />

        <ScrollView>
          <Album expandId={expandId} navigation={this.props.navigation} />

          <BasicInfo navigation={this.props.navigation} info={this.state.basicInfo} expandId={expandId} />

          {/* 佣金和现金奖 */}
          {
            showCommission ?
              <Distribution navigation={this.props.navigation} expandId={expandId} info={this.state.basicInfo} takeLook={takeLook} />
              : null
          }

          <Dynamics navigation={this.props.navigation} />

          {/* 户型 */}
          <Layout expandId={expandId} navigation={this.props.navigation} />

          {/* 楼盘卖点和项目介绍 */}
          <ProjectIntroduction navigation={this.props.navigation} expandId={expandId} />

          {/* 楼盘卖点和项目介绍 */}
          <IntroductionSell navigation={this.props.navigation} expandId={expandId} />

          {/* 周边配套 */}
          <SurroundPart navigation={this.props.navigation} expandId={expandId} />
          {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate('GardenDetails-Surround', { id: expandId })}
          >
            <View style={[detailStyles.block, detailStyles.inner]}>
              <View style={detailStyles.flexContainer}>
                <Text style={detailStyles.titletxt}>
                  周边配套
                </Text>
                <Text style={[detailStyles.orange, detailStyles.rslink]}>
                  <Icon name="arrow-right" size={16} color="#a8a8a8" />
                </Text>
              </View>
            </View>
          </TouchableOpacity> */}

          {/* 附近楼盘 */}
          <SurroundingGarden navigation={this.props.navigation} />
        </ScrollView>


        {
          (!this.state.pageStatus) ?
            (
              <DetailBar detailBarData={detailBarData} navigation={this.props.navigation} />
            ) : null
        }
      </View>
    );
  }
}

export default GardenDetails;
