/**
 * qfang.com xinfang
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent } from 'react';
import { AppRegistry } from 'react-native';

import Root from './app/root';

export default class XinFang extends PureComponent {
  render() {
    return (
      <Root {...this.props} />
    );
  }
}

AppRegistry.registerComponent('xinfang', () => XinFang);
