import React, { PureComponent } from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  DeviceEventEmitter,
} from 'react-native';
import axios from 'axios';
import baseStyles from '../../components/baseStyles';
import Icon from '../../components/Icon/';
import RenderFocusItem from './RenderFocusItem';
import StatusView from '../../components/StatusView';

export default class GardenFocus extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      dataSource: [],
      isRefreshing: false,
    };
  }

  componentDidMount() {
    this.requestData();
    this.subscription = DeviceEventEmitter.addListener('focusRefresh', this.requestData.bind(this));
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  requestData() {
    axios.get('index/mainGarden').then((res) => {
      if (res.data.status == 'C0000') {
        if (res.data.result.gardenList) {
          this.setState({
            dataSource: res.data.result.gardenList,
            isRefreshing: true,
          });
        } else {
          this.setState({
            dataSource: [],
            status: 'no-data-found',
          });
        }
      } else {
        this.setState({
          dataSource: [],
          status: 'request-failed',
        });
      }
    }).catch((error) => {
      console.log('error=', error);
      this.setState({
        dataSource: [],
        pageCount: 1,
        status: 'network-error',
      });
    });
  }

  _onRefresh() {
    this.setState({
      dataSource: [],
    });
    this.requestData();
  }

  _renderItem(data) {
    return (
      <RenderFocusItem item={data.item} navigation={this.props.navigation} />
    );
  }

  render() {
    return (
      <View style={styles.newEstateBox}>
        {
          this.state.dataSource.length ?
            <FlatList
              initialListSize={4}
              data={this.state.dataSource}
              renderItem={this._renderItem.bind(this)}
              keyExtractor={(item, index) => index}
              refreshControl={
                <RefreshControl
                  tintColor="#ccc"
                  refreshing={false}
                  onRefresh={this._onRefresh.bind(this)}
                />
              }
            />
            : <StatusView status={this.state.status} styles={{ backgroundColor: '#fff' }} />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  newEstateBox: {
    backgroundColor: '#fff',
    paddingTop: 10,
    flex: 1,
  },
});
