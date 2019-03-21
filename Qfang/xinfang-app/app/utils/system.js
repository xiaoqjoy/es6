import { Platform, Dimensions } from 'react-native';

const dimen = Dimensions.get('window');
export default {
  isIOS: Platform.OS === 'ios',
  isIphoneX: Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812),
};
