import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  Modal,
  // InteractionManager,
  DeviceEventEmitter,

} from 'react-native';
import axios from 'axios';
import ImageViewer from 'react-native-image-zoom-viewer';

// 友盟统计
import { QFReactHelper, UMNative } from '../../common/NativeHelper';
import GoBack from '../../components/GoBack';
import Icon from '../../components/Icon/';
import baseStyles from '../../components/baseStyles';

// 成交详情页面

class ReleaseDetailsItem extends PureComponent {
  // static propTypes = {
  //   navigation: PropTypes.object,
  // };

  static defaultProps = {
    navigation: {},
  };

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: params.expandName,
      headerLeft: <GoBack navigation={navigation} />,

    };
  };

  constructor(props) {
    super(props);
    this.state = {
      foldFlag: false, // 标题字数超过400 折叠
      hadFold: false, // 是否有 展开、收起 按钮
      likeFlag: false,
      likeCount: 0,
      commentArr: [],
      modalVisiable: false, // 看大图
      modalKey: 0,
    };
    this.reportId = '';
    this.titleHeight = 0;
    this.onLayout = this.onLayout.bind(this);
  }

  componentWillMount() {
    const { item } = this.props;

    const likeArr = item.comments.filter((val) => val.type === 'LIKE');
    const likeCount = likeArr.length;

    const commentArr = item.comments.filter((val) => val.type !== 'LIKE');

    this.setState({
      likeFlag: this.props.item.ifLike,
      likeCount,
      commentArr,
    });
  }

  componentDidMount() {
    this.commentListenner = DeviceEventEmitter.addListener('Comment', (data) => {
      if (this.reportId) {
        this.postComment(data);
      }
    });
  }

  componentWillUnmount() {
    // 移除
    this.commentListenner.remove();
  }

  onLayout(event) {
    const { height } = event.nativeEvent.layout;

    if (this.titleHeight === 0) {
      this.titleText.setNativeProps({
        numberOfLines: Math.ceil(height / 20),
        style: { height },
      });

      this.titleHeight = height;

      if (height > 80) {
        this.titleText.setNativeProps({
          numberOfLines: 4,
          style: { height: 82 },
        });
        this.setState({
          foldFlag: true, // 标题 超过4行 折叠
          hadFold: true, // 是否有 展开、收起 按钮
        });
      }
    }
  }


  // 点赞
  addLike(item) {
    const reportId = item.id;
    if (!this.state.likeFlag) {
      axios.get('garden/report/like', { params: { reportId } })
        .then((res) => {
          if (res.data.status !== 'C0000') {
            return;
          }
          // DeviceEventEmitter.emit('RefreshReleaseList');
          this.setState({
            likeCount: this.state.likeCount + 1,
            likeFlag: true,
          });
        })
        .catch(() => {
          QFReactHelper.show('服务器开小差了~', 5);
        });
    }
  }

  // 评论按钮
  addComment(item) {
    this.props.parent.textInputModal.switchDisplay();
    this.reportId = item.id;
  }

  // 提交评论
  postComment(data) {
    const { reportId } = this;

    const comment = data;

    axios.get('garden/report/addComment', { params: { reportId, comment } })
      .then((res) => {
        if (res.data.status !== 'C0000') {
          return;
        }
        const tempArr = [{
          comment,
          operatorName: res.data.result,
        }];

        this.setState({
          commentArr: tempArr.concat(this.state.commentArr),
        });
        // DeviceEventEmitter.emit('RefreshReleaseList');
      })
      .catch(() => {
        QFReactHelper.show('服务器开小差了~', 5);
      });
  }


  render() {
    const { item } = this.props;


    const { commentArr } = this.state;

    let photosArr = item.photos.split(',');
    if (photosArr.length === 1 && photosArr[0] === '') {
      photosArr = [];
    }

    const len = photosArr.length;

    let images = [];
    let myImages = [];

    if (len > 0) {
      if (len === 1) {
        images.push(photosArr[0].replace('{size}', '1000x1000'));
      } else {
        images = photosArr.map((val) => val.replace('{size}', '1000x1000'));
      }
      myImages = photosArr.map((val) => ({ url: val.replace('{size}', '400x600') }));
    }


    return (
      <View>
        {/* 内容 */}
        <View style={[baseStyles.container, styles.releaseContainer]}>
          {/* 姓名 电话 类型 */}
          <View style={baseStyles.rowCenter}>
            <View style={baseStyles.rowCenter}>
              <View style={baseStyles.rowCenter}>
                <Icon name="gerenziliao" size={18} color="#dfdfdf" />
                <Text style={[baseStyles.fz18, baseStyles.colorA3a, { paddingLeft: 5 }]}>{item.userName}</Text>
              </View>

              <TouchableOpacity
                style={{
                  paddingLeft: 5, paddingVertical: 15, width: 50, height: '100%',
                }}
                onPress={() => {
                  Linking.canOpenURL(`tel:${item.userPhone}`)
                    .then((supported) => {
                      if (!supported) {
                        Alert.alert('当前版本不支持拨打号码');
                      } else {
                        Linking.openURL(`tel:${item.userPhone}`);
                      }
                    })
                    .catch((err) => console.log(`未知错误${err}`));
                }}
              >
                <Icon name="dianhuatubiao" size={18} color="#4ed5a4" />
              </TouchableOpacity>
            </View>

            <View style={{ backgroundColor: '#f5f5f9', padding: 5, borderRadius: 5 }}>
              <Text style={[baseStyles.lightGray, baseStyles.fz10]}>{item.templateTypeDesc}</Text>
            </View>
          </View>

          {/* 标题 */}
          <View style={{ minHeight: 20 }}>
            <Text
              ref={((titleText) => { this.titleText = titleText; })}
              style={[baseStyles.fz14, baseStyles.colorA3a, { lineHeight: 20 }]}
              ellipsizeMode="tail"
              onLayout={this.onLayout}
            >
              {item.title}
            </Text>
          </View>

          {/* 标题 折叠按钮 */}
          {
            this.state.hadFold &&
            <TouchableOpacity
              style={{ paddingTop: 5, flexDirection: 'row' }}
              onPress={() => {
                this.setState({
                  foldFlag: !this.state.foldFlag,
                });

                if (this.state.foldFlag) {
                  this.titleText.setNativeProps({
                    numberOfLines: Math.ceil(this.titleHeight / 20),
                    style: { height: this.titleHeight },
                  });
                } else {
                  this.titleText.setNativeProps({
                    numberOfLines: 4,
                    style: { height: 82 },
                  });
                }
              }}
            >
              {
                this.state.foldFlag ?
                  <Text style={baseStyles.colorFfa}>展开</Text>
                  :
                  <Text style={baseStyles.colorFfa}>收起</Text>
              }
              {
                this.state.foldFlag ?
                  <Icon name="arrow-down" size={16} color="#ffc601" />
                  :
                  <Icon name="arrow-up" size={16} color="#ffc601" />
              }

            </TouchableOpacity>
          }

          {/* 图片 */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {
              images.length ?
                images.map((val, key) => (
                  <TouchableOpacity
                    key={val}
                    style={{ paddingTop: 5, paddingRight: 5 }}
                    onPress={() => {
                      this.setState({
                        modalVisiable: true,
                        modalKey: key,
                      });
                    }}
                  >
                    <Image
                      style={{ height: images.length === 1 ? 200 : 100, width: images.length === 1 ? 200 : 100 }}
                      resizeMode="cover"
                      source={{ uri: val }}
                    />
                  </TouchableOpacity>
                ))
                :
                null
            }
          </View>

          {/* 图片放大查看组件  */}
          {
            (item.photos) ?
              <Modal
                visible={this.state.modalVisiable}
                onRequestClose={() => { }}
              >
                <ImageViewer
                  imageUrls={myImages}
                  index={this.state.modalKey}
                  onClick={() => {
                    this.setState({
                      modalVisiable: false,
                      modalKey: 0,
                    });
                  }}
                />
              </Modal>
              :
              null
          }

          {/* 发布时间  点赞、评论按钮 */}
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10,
          }}
          >
            {/* 发布时间 */}
            <View>
              <Text style={[baseStyles.fz12, baseStyles.colorA8]}>
                {item.releaseTime && item.releaseTime.substring(0, 10)}
              </Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {/* 点赞 */}
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => {
                  this.addLike(item);
                }}
              >
                {
                  this.state.likeFlag ?
                    <Icon name="dianzan" size={20} color="#ff9831" /> :
                    <Icon name="dianzan" size={20} color="#dfdfdf" />
                }

                <Text style={{ paddingLeft: 5, paddingRight: 10 }}>
                  {this.state.likeCount}
                </Text>
              </TouchableOpacity>

              {/* 评论 */}
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() => {
                  this.addComment(item);
                }}
              >
                <Icon name="pinglun" size={20} color="#dfdfdf" />
                <Text style={{ paddingHorizontal: 5 }}>评论</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 评论start */}
        <View style={[baseStyles.container, { backgroundColor: '#fff', position: 'relative' }]}>
          <View style={styles.triangleUp} />
          {
            commentArr.length > 0 ?
              <View style={styles.commentContainer}>
                {
                  commentArr.map((val) => (
                    <View style={styles.commentMain} key={Math.random()}>
                      <View style={styles.commentLeft}>
                        {/* <Icon name="gerenziliao" size={12} color="#dfdfdf" style={{ marginRight: 2, lineHeight: 20 }} /> */}
                        <Text style={[baseStyles.fz12, baseStyles.colorA8, { lineHeight: 20 }]}>
                          {val.operatorName.substring(0, 5) || '未知姓名'}：
                        </Text>
                        <Text style={[baseStyles.fz12, baseStyles.colorA3a, { maxWidth: '87%', lineHeight: 20 }]}>{val.comment}</Text>
                      </View>
                    </View>
                  ))
                }
              </View>
              :
              null
          }
        </View>
        {/* 评论end */}


      </View>
    );
  }
}

const styles = StyleSheet.create({
  releaseContainer: {
    backgroundColor: '#fff',
    marginTop: 10,
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
  commentContainer: {
    paddingVertical: 10,
  },
  commentMain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 34,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    backgroundColor: '#f5f5f9',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#dedfe0',
    paddingVertical: 5,
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
  // 小三角
  triangleUp: {
    position: 'absolute',
    right: 25,
    zIndex: 5,
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderBottomWidth: 12,
    borderBottomColor: '#f5f5f9',
  },
});

export default ReleaseDetailsItem;
