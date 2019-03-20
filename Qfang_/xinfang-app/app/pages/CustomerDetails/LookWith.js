import React, { PureComponent } from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import baseStyles from '../../components/baseStyles';

import Pagination from '../../components/Pagination';

export default class LookWith extends PureComponent {
  _renderItem(data) {
    const Item = data.item;

    return (
      <View style={styles.listStyle}>
        <View style={{ marginTop: 20, marginBottom: 15, flexDirection: 'row' }}>
          {/* <Text style={[baseStyles.fz16, baseStyles.colorA8]}>带看楼盘：</Text> */}
          <Text style={[baseStyles.fz16, baseStyles.colorA3a, baseStyles.ftBold]}>{Item.garden.registerName || ''}</Text>
        </View>
        <View style={styles.listCont}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={[baseStyles.colorA8, baseStyles.fz14]}>带看人：</Text>
            <Text style={[baseStyles.colorA8, baseStyles.fz14]}>{Item.brokerName || ''}</Text>
          </View>
          <View>
            <Text style={[baseStyles.colorA8, baseStyles.fz14]}>{Item.guideTime || ''}</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={baseStyles.container}>
        {/* <Pagination url="customer/basic/guides" renderItem={this._renderItem} params={this.state.param} statisticaType="lookWith" refreshCountType="lookWith" dataStructure="res.data.result.items" /> */}
        <Pagination
          url="customer/private/queryReservationGuide"
          renderItem={this._renderItem}
          params={this.props.params}
          statisticaType="lookWith"
          refreshCountType="lookWith"
          dataStructure="res.data.result.items"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  followUpDateTip: {
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
  },

  listStyle: {
    paddingLeft: 15,
    height: 84,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderBottomColor: '#e7e8ea',
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
  },

  listCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 20,
  },
});
