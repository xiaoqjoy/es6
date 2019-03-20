import React, { PureComponent } from 'react';

import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  InteractionManager,
} from 'react-native';

import axios from 'axios';
import ImageLoad from 'react-native-image-placeholder';
import Swiper from 'react-native-swiper';

import { QFReactHelper, UMNative } from '../../common/NativeHelper';

import Icon from '../../components/Icon/';

// 封面图
class SlideList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: { photoIntroList: [] },
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(this.requestData.bind(this));
  }

  requestData() {
    axios.get('garden/photoIntro', { params: { expandId: this.props.navigation.state.params.id } })
      .then((res) => {
        if (res.data.status !== 'C0000') {
          return;
        }
        this.setState({
          dataSource: res.data.result,
        });
      });
  }

  render() {
    // { /* 相册参数待定 */ }

    return (
      <View style={{ height: 200, position: 'relative', width: '100%' }}>

        {!this.state.dataSource.photoIntroList.length ?
          (
            <View style={styles.slide}>
              <Image source={require('../../assets/img/img-placeholder.png')} style={{ width: '100%', height: 200 }} />
            </View>
          )
          :
          (
            <Swiper showsButtons={false} showsPagination={false} height={200}>
              {this.state.dataSource.photoIntroList.map((item, index) => {
                item.pictureUrl = item.url.replace('{size}', '750x400');
                return (
                  <TouchableHighlight
                    style={{ width: '100%', height: 200 }}
                    key={Math.random()}
                    onPress={() => {
                      // { /* params.type=item.type; */ }
                      const params = { expandId: this.props.expandId, index: 0, type: item.type };
                      UMNative.onEvent('XF-GardenDetails-Album');
                      QFReactHelper.showPage('NEWHOUSE_ALBUM', params);
                    }}
                  >
                    <View style={styles.slide} >
                      <ImageLoad
                        style={styles.listImg}
                        loadingStyle={{ size: 'small', color: 'white' }}
                        placeholderSource={require('../../assets/img/img-placeholder.png')}
                        placeholderStyle={{ backgroundColor: '#dedfe1', width: '100%', height: 200 }}
                        source={{ uri: item.pictureUrl }}
                      />
                    </View>
                  </TouchableHighlight>
                );
              })}
            </Swiper>
          )
        }
        {this.state.dataSource.amount ?
          <View>
            <View style={styles.sumOpBox}><Text style={styles.sumTxt}>{this.state.dataSource.amount}</Text></View>
            <View style={styles.sumBox}><Text style={styles.sumTxt}>{this.state.dataSource.amount}</Text></View>
          </View> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  sumOpBox: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    paddingHorizontal: 15,
    backgroundColor: '#3a3a3a',
    opacity: 0.5,
    borderRadius: 9,
  },
  sumBox: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    paddingHorizontal: 15,
    backgroundColor: 'transparent',
    borderRadius: 9,
  },
  sumTxt: {
    fontSize: 12,
    color: '#fff',
    lineHeight: 18,
  },
  listImg: {
    width: '100%',
    height: 200,
    // resizeMode: 'cover',
  },
});

export default SlideList;
