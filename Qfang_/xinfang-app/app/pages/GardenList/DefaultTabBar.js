import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { screen } from '../../utils';
import { QFReactHelper, UMNative } from '../../common/NativeHelper';

export default class DefaultTabBar extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          {
            this.props.tabs.map((tab, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  if (i === 0) {
                    UMNative.onEvent('XF-GardenAll');
                  } else {
                    UMNative.onEvent('XF-GardenFocus');
                  }
                  this.props.goToPage(i);
                }
                }
                style={[styles.button, this.props.activeTab === i ? styles.curButton : styles.unCurButton]}
              >
                <Text style={this.props.activeTab === i ? styles.curFont : styles.unCurFont}>{tab}</Text>
              </TouchableOpacity>))}
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    borderBottomColor: '#dedfe0',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  curButton: {
    borderBottomColor: '#f91',
    borderBottomWidth: 1,
  },
  unCurButton: {
    borderBottomWidth: 0,
  },
  curFont: {
    color: '#333',
    fontSize: 16,
  },
  unCurFont: {
    color: '#c3c3c3',
    fontSize: 16,
  },
  button: {
    width: screen.width / 3,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
