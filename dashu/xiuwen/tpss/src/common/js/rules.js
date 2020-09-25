import { fileCos } from './fileCos.js';
// 正则验证
const rules = {

  // 姓名
  nameRule: (rule, value, callback) => {
    const valReg = /^[\u4e00-\u9fa5·]+$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('非法字符，请重新输入!'));
    } else {
      callback();
    }
  },
  // 地址
  addressRule: (rule, value, callback) => {
    const valReg = /^[A-Za-z0-9\u4e00-\u9fa5（）-]+$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('非法字符，请重新输入!'));
    } else {
      callback();
    }
  },
  // 单位名称
  companyNameRule: (rule, value, callback) => {
    const valReg = /^[A-Za-z0-9\u4e00-\u9fa5（）-]+$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('非法字符，请重新输入!'));
    } else {
      callback();
    }
  },
  // 汉字加·
  chineseName: (rule, value, callback) => {
    const valReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·]+$/gi;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入正确的中文名'));
    } else {
      callback();
    }
  },
  // 仅汉字
  chineseChart: (rule, value, callback) => {
    const valReg = /^[\u4e00-\u9fa5]+$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('只能输入汉字字符'));
    } else {
      callback();
    }
  },
  // 其他类型的证件
  otherCardRule: (rule, value, callback) => {
    const valReg = /^[a-zA-Z0-9]{1,50}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入正确的证件号码'));
    } else {
      callback();
    }
  },
  // 国际区号（要按需求来）
  internationalCode: (rule, value, callback) => {
    const valReg = /^[\d-]{0,5}$/; // 允许输入数字和“-”，最多可输入5个字符
    if (!valReg.test(value)) {
      return callback(new Error('请输入数字和“-”，最多可输入5个字符！'));
    } else {
      callback();
    }
  },
  // 区号
  areaNumRule: (rule, value, callback) => {
    const valReg = /^\d{3,4}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入正确的区号！'));
    } else {
      callback();
    }
  },
  // 字母数字汉字符号
  allChart: (rule, value, callback) => {
    const valReg = /^[\u4e00-\u9fa5a-zA-Z0-9（）-]+$/;
    if (!valReg.test(value)) {
      return callback(new Error('仅能输入汉字，字母，数字以及（）-'));
    } else {
      callback();
    }
  },
  // 以上统一
  // 姓名
  // 中文名 + ·

  // 仅数字
  number: (rule, value, callback) => {
    const valReg = /^[0-9]{1,10}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入10个字符以内的数字'));
    } else {
      callback();
    }
  },
   // 100个字的名称
   nameRule4: (rule, value, callback) => {
    const valReg = /^[A-Za-z0-9\u4e00-\u9fa5(),（），-]{1,100}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入100个字符以内的数字/字母/汉字'));
    } else {
      callback();
    }
  },
  // 不要区号
  fix_only_phoneRule: (rule, value, callback) => {
    const valReg = /^\d{7,8}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入正确的固话号码'));
    } else {
      callback();
    }
  },

  // 固话电话
  fix_phoneRule: (rule, value, callback) => {
    const valReg = /^(\d{3,4}-)\d{7,8}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入正确的固话号码'));
    } else {
      callback();
    }
  },

  // 手机号码
  phoneRule: (rule, value, callback) => {
    const valReg = /^1[3456789]\d{9}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入正确的手机号码'));
    } else {
      callback();
    }
  },

  // 固话+手机
  allPhoneRule: (rule, value, callback) => {
    const valReg = /^1[3456789]\d{9}$/;
    const valReg1 = /^((\d{3,4}-)|(\d{3,4}-)?)\d{7,8}$/;
    if (!valReg.test(value) && !valReg1.test(value) && !!value) {
      return callback(new Error('请输入正确的电话号码'));
    } else {
      callback();
    }
  },

  // 非负整数
  nonNegative: (rule, value, callback) => {
    const valReg = /^[0-9]*$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入正确的信息！'));
    } else {
      callback();
    }
  },
  // 两位小数
  numTwoBit: (rule, value, callback) => {
    const valReg = /^\d+((?=\.{0,1}\d{1,2}$)|$)/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入正确的信息！'));
    } else {
      callback();
    }
  },
  // 百分数
  percentRule: (rule, value, callback) => {
    const valReg = /(^[1-9][0-9]$)|(^100$)|(^[1-9]$)$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入0-100的整数！'));
    } else {
      callback();
    }
  },
  // 带两位小数的百分数
  percentTwoBitRule: (rule, value, callback) => {
    const valReg = /(^[1-9][0-9](\.[0-9]{1,2})?$)|(^100(\.[0]{1,2})?$)|(^[0-9](\.[0-9]{1,2})?$)/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入0-100的数（最多两位小数）！'));
    } else {
      callback();
    }
  },
  // 国际区号
  houseInternationalCode: (rule, value, callback) => {
    const valReg = /(^00[123456789]\d{1,2}$)|((^(\d{3,4})$)|^([1-9]-[1-9]{2,3})$|^([1-9]{3}-)$)/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入正确的国际区号！'));
    } else {
      callback();
    }
  },
  // 邮编
  postRule: (rule, value, callback) => {
    const valReg = /^[0-9]{6}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入正确的邮编！'));
    } else {
      callback();
    }
  },
  // 可输入非负数（包括小数）
  positiveRule: (rule, value, callback) => {
    const valReg = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入正确的数据！'));
    } else {
      callback();
    }
  },
  // 身份证
  identityCardRule: (rule, value, callback) => {
    // const valReg = /^[1-9][0-9]{5}(19[0-9]{2}|2[0-9]{3})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/;
    if (!fileCos.checkIdcard(value) && !!value) {
      return callback(new Error('请输入正确的身份证号码'));
    } else {
      callback();
    }
  }
};

export default rules;
