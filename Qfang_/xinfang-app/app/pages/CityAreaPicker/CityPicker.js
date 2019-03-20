import React, { PureComponent } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  DeviceEventEmitter,
  TouchableOpacity,
  StyleSheet,
  InteractionManager,
} from 'react-native';

import axios from 'axios';

import baseStyles from '../../components/baseStyles';
import GoBack from '../../components/GoBack';

export default class CityPicker extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: '城市选择',
      headerLeft: (<GoBack navigation={navigation} />),
      headerRight: <Text />,
    };
  };

  state = {
    cityDataSource: [],
    currentCity: {},
    commonUseCity: [],
  };

  componentDidMount() {
    const _this = this;

    InteractionManager.runAfterInteractions(() => {
      this.requestCityData();
      storage.load({ key: 'commonUseCity' })
        .then((list) => {
          _this.setState({
            commonUseCity: list,
          });
        });
    });
  }

  requestCityData() {
    axios.get('/customer/basic/queryCity').then((res) => {
      if (res.data.status === 'C0000') {
        const result = res.data.result[0][0];
        this.setState({
          cityDataSource: res.data.result,
          currentCity: {
            name: result.name,
            id: result.internalId,
          },
        });
      }
    });
  }

  citySelectBack(param) {
    const _this = this;
    InteractionManager.runAfterInteractions(() => {
      if (param.type === 'city') {
        storage.load({ key: 'commonUseCity' }).then((list) => {
          const cacheList = list;

          // 过滤选过相同的记录
          list = list.filter((val) => param.internalObj.internalId != val.internalId);

          if ((cacheList.length == list.length) && list.length >= 3) {
            list.pop();
          }

          list.unshift(param.internalObj);

          storage.save({
            key: 'commonUseCity',
            data: list,
          });

          _this.setState({
            commonUseCity: list,
          });
        }).catch((err) => {
          // 未保存过历史记录，则追回一条
          storage.save({
            key: 'commonUseCity',
            data: [param.internalObj],
          });

          _this.setState({
            commonUseCity: [param.internalObj],
          });
        });
      }
      let { eventName, fieldName } = this.props.navigation.state.params;

      eventName = eventName || 'filterChoose';

      DeviceEventEmitter.emit(eventName, { field: fieldName, item: param.internalObj });

      this.props.navigation.goBack();
    });
  }

  cityListView() {
    const _this = this;
    return (
      this.state.cityDataSource.map((val, k) => {
        if (k != 0) { // 第一个是当前城市
          return (
            <View key={k}>
              <View style={[styles.cityListPublic, { backgroundColor: '#f5f5f9' }]}>
                <Text style={[baseStyles.colorA8, baseStyles.fz14]}>{val[0].simplePinyin}</Text>
              </View>
              <FlatList
                initialListSize={10}
                data={val}
                renderItem={_this._renderItem.bind(this)}
                keyExtractor={(item, index) => index}
              />
            </View>
          );
        }
      })
    );
  }

  commonUseCityView() {
    const _this = this;
    return (
      this.state.commonUseCity.map((v, k) => (
        <TouchableOpacity style={styles.cityListPublic} key={k} onPress={_this.citySelectBack.bind(_this, { internalObj: { internalId: v.internalId, name: v.name }, type: 'commonUseCity' })}>
          <Text style={[baseStyles.color333, baseStyles.fz16]}> {v.name} </Text>
        </TouchableOpacity>
      ))
    );
  }

  _renderItem(data) {
    const item = data.item;
    return (
      <TouchableOpacity style={styles.cityListPublic} onPress={this.citySelectBack.bind(this, { internalObj: { internalId: item.internalId, name: item.name }, type: 'city' })}>
        <Text style={[baseStyles.color333, baseStyles.fz16]}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ScrollView style={baseStyles.container}>
        <View style={[styles.cityListPublic, { backgroundColor: '#f5f5f9' }]}>
          <Text style={[baseStyles.colorA8, baseStyles.fz14]}>当前城市</Text>
        </View>
        <TouchableOpacity style={styles.cityListPublic} onPress={this.citySelectBack.bind(this, { internalObj: { internalId: this.state.currentCity.id, name: this.state.currentCity.name }, type: 'city' })}>
          <Text style={[baseStyles.color333, baseStyles.fz16]}>{this.state.currentCity.name || ''}</Text>
        </TouchableOpacity>
        {this.state.commonUseCity.length ?
          <View style={[styles.cityListPublic, { backgroundColor: '#f5f5f9' }]}>
            <Text style={[baseStyles.colorA8, baseStyles.fz14]}>常用城市</Text>
          </View>
          : null
        }
        {this.commonUseCityView.call(this)}
        {this.cityListView.call(this)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cityListPublic: {
    paddingLeft: 15,
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#e7e8ea',
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
  },
});
