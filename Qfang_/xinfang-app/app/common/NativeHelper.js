import { NativeModules } from 'react-native';

let umeng = NativeModules.UmengNativeModule;
let helper = NativeModules.QFReactHelper;

if (__DEV__) {
  function fakeNative() {
    console.log(arguments);
  }

  if (!helper) {
    helper = {};
    let methods = ['navPop', 'logout', 'show', 'statistical', 'hideDialog', 'showMainTabbar', 'showPage'];
    methods.forEach((method) => helper[method] = fakeNative);
  }

  if (!umeng) {
    umeng = {};

    let methods = ['onEvent', 'onPageBegin', 'onPageEnd'];
    methods.forEach((method) => umeng[method] = fakeNative);
  }
}

export const QFReactHelper = helper;

export const UMNative = umeng;
