import React, { PureComponent } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  DeviceEventEmitter,
  StyleSheet,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';

import axios from 'axios';

import baseStyles from '../../components/baseStyles';
import Icon from '../../components/Icon/';
import GoBack from '../../components/GoBack';

export default class AreaPicker extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: '片区选择',
      headerLeft: (<GoBack navigation={navigation} />),
      headerRight: <Text />,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      regionStyleId: '',
      regionDataSource: [],
      areaDataSourece: [],
      internalCityId: '',

    };
    this.areaRenderItem = this.areaRenderItem.bind(this);
  }


  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      // this.setState({
      //   internalCityId: this.props.navigation.state.params.internalCityId,
      // });

      this.state.internalCityId = this.props.navigation.state.params.internalCityId;

      this.requestRegion();
    });
  }

  requestRegion() {
    axios.get('/customer/basic/queryCounty', {
      params: {
        internalCityId: this.state.internalCityId,
      },
    }).then((res) => {
      if (res.data.status === 'C0000') {
        this.setState({
          regionDataSource: res.data.result,
        });
      }
    });
  }

  requestArea(regionId, regionName, index) {
    InteractionManager.runAfterInteractions(() => {
      let { eventName } = this.props.navigation.state.params;
      eventName = eventName || 'filterChoose';


      if (!regionId) {
        // 没有就传空
        DeviceEventEmitter.emit(eventName, {
          field: 'area',
          item: {
            regionId,
            regionName,
          },
        });
        this.props.navigation.goBack();

        return;
      }

      axios.get('/customer/basic/queryArea', {
        params: {
          internalCountyId: regionId,
        },
      }).then((res) => {
        if (res.data.status === 'C0000') {
          this.setState({
            areaDataSourece: res.data.result,
            regionStyleId: regionId,
            regionName,
          });
        }
      });
    });
  }

  areaPickerBack(areaId, areaName) {
    global.requestAnimationFrame(() => {
      let { eventName, fieldName } = this.props.navigation.state.params;
      eventName = eventName || 'filterChoose';


      DeviceEventEmitter.emit(eventName, {
        field: fieldName,
        item: {
          regionId: this.state.regionStyleId,
          areaId,
          regionName: this.state.regionName,
          areaName,
        },
      });

      this.props.navigation.goBack();
    });
  }

  areaRenderItem(data) {
    const { item } = data;

    return (
      <TouchableOpacity
        style={styles.publicList}
        onPress={() => {
          this.areaPickerBack(item.internalId, item.name);
        }}
      >
        <View><Text style={[baseStyles.fz16, baseStyles.colorA3a]}>{item.name}</Text></View>
        <View style={{ marginRight: 15 }}>
          <Icon name="arrow-right" size={12} color="#7e7e7e" style={styles.searchIcon} />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={[baseStyles.container, { flexDirection: 'row', backgroundColor: '#fff' }]}>
        <ScrollView style={{ flex: 5 }}>
          <TouchableOpacity
            style={styles.publicList}
            onPress={() => {
              this.requestArea('', '');
            }}
          >
            <View><Text style={baseStyles.fz16}>不限</Text></View>
          </TouchableOpacity>
          {this.state.regionDataSource.map((item, k) => (
            <TouchableOpacity
              key={k}
              style={styles.publicList}
              onPress={() => {
                this.requestArea(item.internalId, item.name);
              }}
            >
              <View><Text style={[baseStyles.fz16, this.state.regionStyleId === item.internalId ? baseStyles.colorFfa : baseStyles.colorA3a]}>{item.name}</Text></View>
              <View style={{ marginRight: 15 }}>
                <Icon name="arrow-right" size={12} color="#7e7e7e" style={styles.searchIcon} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ScrollView style={{ flex: 5 }}>
          <TouchableOpacity
            style={styles.publicList}
            onPress={() => {
              this.areaPickerBack('', '');
            }}
          >
            <View><Text style={[baseStyles.fz16, baseStyles.colorA3a]}>不限</Text></View>
          </TouchableOpacity>
          <FlatList
            initialListSize={10}
            data={this.state.areaDataSourece}
            renderItem={this.areaRenderItem}
            keyExtractor={(item, index) => index}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  publicList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 40,
    paddingLeft: 15,
    borderBottomColor: '#e7e8ea',
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
  },
});
