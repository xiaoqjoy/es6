import React, { PureComponent } from 'react';
import {
  View,
  Animated,
  Easing,
  // LayoutAnimation,
  // Platform,
  // UIManager
} from 'react-native';

export default class MarqueeLamp extends PureComponent {
  componentWillMount() {
    this.animatedTransformY = new Animated.Value(0);
    this.endAnimatedTransformY = 0;
    this.animatedStart = true;
    // if (Platform.OS === 'android') {
    //   UIManager.setLayoutAnimationEnabledExperimental(true);
    // }
    // LayoutAnimation.easeInEaseOut();
  }

  componentDidMount() {
    requestAnimationFrame(this.marqueeLamp.bind(this));
  }

  componentWillUnmount() {
    this.animatedStart = false;
    this.timer && clearTimeout(this.timer);
  }

  marqueeLamp() {
    clearTimeout(this.timer);

    if (!this.animatedStart) {
      return;
    }

    if (-(this.layoutHeight - 25) > this.endAnimatedTransformY) { // 初始化动画值
      this.animatedTransformY.setValue(0);
      this.endAnimatedTransformY = -25;
      this.lampAnimated();
      this.marqueeLamp()
    } else {
      this.timer = setTimeout(() => {
        this.animatedTransformY.setValue(this.endAnimatedTransformY);
        this.endAnimatedTransformY -= 25;
        this.lampAnimated();
        this.marqueeLamp()
      }, 3000);
    }
  }

  lampAnimated() {
    Animated.timing(this.animatedTransformY, {
      toValue: this.endAnimatedTransformY,
      easing: Easing.linear
    }).start();
  }

  containerHOnLayout(e) {
    this.layoutHeight = e.nativeEvent.layout.height;
  }

  render() {
    const { children } = this.props;
    return (
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'scroll'
      }}>
        <Animated.View style={[{ transform: [{ translateY: this.animatedTransformY }] }]} onLayout={(event) => { return this.containerHOnLayout(event) }}>
          {children}
        </Animated.View>
      </View>
    )
  }
}
