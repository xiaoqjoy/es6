import React, { PureComponent } from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';


import Icon from '../../components/Icon/';
import baseStyles from '../../components/baseStyles';

import { screen, system } from '../../utils';

class RenderItem extends PureComponent {
  render() {
    const { item } = this.props;

    return (
      <View style={styles.item}>
        <Icon name="ren" size={20} color="#f39800" />
        <View style={styles.right}>
          <Text style={[baseStyles.fz16, baseStyles.colorA3a]}>{item.contactNames}</Text>
          <Text style={[baseStyles.fz16, baseStyles.colorA8, { paddingTop: 15 }]}>{item.contactMobiles}</Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginHorizontal: 15,
    paddingVertical: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e7e8ea',
  },
  right: {
    paddingLeft: 10,
  },

});

export default RenderItem;
