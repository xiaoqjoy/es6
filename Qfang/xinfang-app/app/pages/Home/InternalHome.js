import React, { PureComponent } from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import TabBarItem from '../../components/TabBarItem';
import Icon from '../../components/Icon/';

import Distribution from '../Distribution/Distribution';
import GardenSearch from '../Search/GardenSearch';
import GardenList from '../Inline/GardenList';
import GardenFocus from '../Inline/GardenFocus';

const Home = TabNavigator(
  {
    GardenTab: {
      screen: GardenList,
      path: '/garden-tab',
      navigationOptions: {
        tabBarLabel: '楼盘',
        tabBarIcon: ({ tintColor, focused }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage='loupan'
            selectedImage='loupan'
            size={18}
          />
        )
      }
    },
    FocusTab: {
      screen: GardenFocus,
      path: '/garden-focus',
      navigationOptions: {
        tabBarLabel: '关注盘',
        tabBarIcon: ({ tintColor, focused }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage='bookmark1'
            selectedImage='bookmark1'
            size={18}
          />
        )
      }
    },
    DistributionTab: {
      screen: Distribution,
      path: '/distribution',
      navigationOptions: {
        tabBarLabel: '分销',
        tabBarIcon: ({ tintColor, focused }) => (
          <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage='fenxiao'
            selectedImage='fenxiao'
            size={18}
          />
        )
      }
    }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: false,
    lazy: true,
    tabBarOptions: {
      activeTintColor: '#f91',
      inactiveTintColor: '#979797',
      style: { backgroundColor: '#fff' },
    }
  }
);

export default Home;
