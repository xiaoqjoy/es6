// 选中 返回(item); 单选组件；
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  DeviceEventEmitter,
} from 'react-native';

/**  参数说明： 参数均从 导航传入
 * title: (str) 传入的页面title, 必需
 * data:  (arr) 传入的数据 必需 , 每一项为str 或者obj ,obj 必须包含（selectId selectValue）这2个key，其他key 不限
 *      如： {
 *            selectId:
 *            selectValue:
 *            other:
 *          }
 *
 * selected:(str) 传入的默认值，非必须 selectValue
 * eventName: (str) eventName为页面取值监听方法名，必需，整个应用中唯一，不应该重复
*/

export default class SelectPickerGoback extends PureComponent {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
    headerRight: <Text />,
  });

  componentWillMount() {
    // const { params } = this.props.navigation.state;
  }

  render() {
    const { navigation } = this.props;
    const { goBack } = navigation;
    const { params } = navigation.state;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.wrapper}>
          {
            params.data.map((item) => (
              <TouchableOpacity
                style={styles.btn}
                key={Math.random()}
                onPress={() => {
                  DeviceEventEmitter.emit(params.eventName, item);
                  goBack();
                }}
              >
                {
                  typeof (item) === 'string' ?
                    (<Text style={[styles.name, params.selected === item ? styles.current : null]}>{item}</Text>)
                    :
                    (
                      <Text style={[styles.name, params.selected === item.selectValue ? styles.current : null]}>
                        {item.selectValue}
                      </Text>
                    )
                }
              </TouchableOpacity>))
          }
        </ScrollView >
      </View >
    );
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: '#f5f5f9',
  },
  wrapper: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  btn: {
    height: 56,
    justifyContent: 'center',
    borderBottomColor: '#dedede',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  name: {
    fontSize: 16,
    color: '#3a3a3a',
  },
  current: {
    color: '#ffc601',
  },
});
