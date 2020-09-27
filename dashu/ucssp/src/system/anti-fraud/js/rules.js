import store from '@/store';
import { fileCos } from '../../../common/js/fileCos.js';
// 正则验证
const rules = {
  // 姓名
  nameRule: (rule, value, callback) => {
    const valReg = /^[A-Za-z0-9\u4e00-\u9fa5·]+$/;
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
  // 以上统一
  // 此处将被删除 start
  // 姓名
  nameRule1: (rule, value, callback) => {
    const valReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{1,15}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入15个字符以内的数字/字母/汉字'));
    } else {
      callback();
    }
  },
  // 20个字的名称
  nameRule2: (rule, value, callback) => {
    const valReg = /^[A-Za-z0-9\u4e00-\u9fa5]{1,20}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入20个字符以内的数字/字母/汉字'));
    } else {
      callback();
    }
  },
  // 30个字的名称
  nameRule30: (rule, value, callback) => {
    const valReg = /^[A-Za-z0-9\u4e00-\u9fa5]{1,30}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入30个字符以内的数字/字母/汉字'));
    } else {
      callback();
    }
  },
  // 50个字的名称
  nameRule3: (rule, value, callback) => {
    const valReg = /^[A-Za-z0-9\u4e00-\u9fa5]{1,50}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入50个字符以内的数字/字母/汉字'));
    } else {
      callback();
    }
  },
  // 100个字的名称
  nameRule4: (rule, value, callback) => {
    const valReg = /^[A-Za-z0-9\u4e00-\u9fa5]{1,100}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入100个字符以内的数字/字母/汉字'));
    } else {
      callback();
    }
  },
  // 30个字符以内的字母/汉字（姓名通用规则）
  nameRule5: (rule, value, callback) => {
    const valReg = /^[A-Za-z\u4e00-\u9fa5]{1,30}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入30个字符以内的字母/汉字'));
    } else {
      callback();
    }
  },
  // 此处将被删除 end

  //
  // 中文名 + ·
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
  // 10个字符以内的汉字
  chineseRule: (rule, value, callback) => {
    const valReg = /^[\u4e00-\u9fa5]{1,10}$/;
    if (!valReg.test(value)) {
      return callback(new Error('请输入10个字符以内的汉字'));
    } else {
      callback();
    }
  },
  // 数字+字母
  numberEnglishRule: (rule, value, callback) => {
    const valReg = /^[A-Za-z0-9]{0,100}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入正确的申请编号'));
    } else {
      callback();
    }
  },
  // 固话电话 区号必要
  fix_phoneRule: (rule, value, callback) => {
    const valReg = /^((\d{3,4}-)|\d{3,4}-)?\d{7,8}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入正确的固话号码'));
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
  // 手机号码
  phoneRule: (rule, value, callback) => {
    const valReg = /^1[3456789]\d{9}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入正确的手机号码'));
    } else {
      callback();
    }
  },

  // 固话+手机 （一定要填写区号）
  allPhoneRule: (rule, value, callback) => {
    const valReg = /^1[3456789]\d{9}$/;
    const valReg1 = /^\d{3,4}-\d{7,8}$/;
    if (!valReg.test(value) && !valReg1.test(value) && !!value) {
      return callback(new Error('请输入正确的电话号码'));
    } else {
      callback();
    }
  },
  // 军官证
  officialCardRule: (rule, value, callback) => {
    const valReg = /[\u4e00-\u9fa5](字第){1}(\d{4,8})(号?)$/; // 军官证
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入正确的军官证号码'));
    } else {
      callback();
    }
  },
  // 港澳居民来往内地通行证
  HKMCardRule: (rule, value, callback) => {
    const valReg = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/; // 港澳通行证
    if (!valReg.test(value) && !!value) {
      return callback(new Error('港澳居民来往内地通行证号不正确'));
    } else {
      callback();
    }
  },
  // 台湾通行证
  TWCardRule: (rule, value, callback) => {
    const valReg = /^([0-9]{8})|([0-9]{10})$/; // 台湾通行证
    if (!valReg.test(value) && !!value) {
      return callback(new Error('台湾同胞往来内地通行证号不正确'));
    } else {
      callback();
    }
  },
  // 护照
  passportRule: (rule, value, callback) => {
    const valReg = /^1[45][0-9]{7}|([P|p|S|s]\d{7})|([S|s|G|g]\d{8})|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8})|([H|h|M|m]\d{8,10})$/; // 护照
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入正确的护照号'));
    } else {
      callback();
    }
  },
  certificateRule: (rule, value, callback) => {
    let func, type;
    switch (store.state.commonSelect.certificateTypeCode) {
      case 'Ind01':
        func = rules.identityCardRule;
        type = "身份证";
        break;
        case 'Ind04':
        func = rules.officialCardRule;
        type = "军官证";
        break;
        case 'Ind06':
        func = rules.HKMCardRule;
        type = "港澳居民往来内地通行证";
        break;
        case 'Ind07':
        func = rules.TWCardRule;
        type = "台湾同胞往来内地通行证";
        break;
        case 'Ind15':
        func = rules.passportRule;
        type = "护照";
        break;
      default:
        return callback(new Error("请先选择证件类型"));
    }
    if (!value) {
      callback(new Error('请输入' + type));
    } else {
      func(rule, value, callback);
    }
  },
  // 非负整数
  nonNegative: (rule, value, callback) => {
    const valReg = /^[0-9]{1,8}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入数字，不能超过8位'));
    } else {
      callback();
    }
  },
  // 数字
  number: (rule, value, callback) => {
    const valReg = /^[0-9]+$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入数字'));
    } else {
      callback();
    }
  },
  // 非负整数
  nonNegative1: (rule, value, callback) => {
    const valReg = /^[0-9]{1,20}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入整数，不能超过20位'));
    } else {
      callback();
    }
  },
  // 正整数
  nonNegative2: (rule, value, callback) => {
    const valReg = /^[1-9]\d*$/;
    if (!valReg.test(value)) {
      return callback(new Error('请输入非零开头的正整数'));
    } else {
      callback();
    }
  },
  // 正数
  nonNegative3: (rule, value, callback) => {
    const valReg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入正确的信息！'));
    } else {
      callback();
    }
  },
  // 非负整数 - 最多3位
  nonNegative4: (rule, value, callback) => {
    const valReg = /^[0-9]{1,3}$/;
    if (!valReg.test(value) && value) {
      return callback(new Error('请输入不能超过3位的整数'));
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
  // 两位小数且允许负数
  numTwoBitAndNegative: (rule, value, callback) => {
    var valReg = /^[-+]?(((\d+)$)|(\d+\.\d{2}$))/;
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
  // 国际区号
  houseInternationalCode: (rule, value, callback) => {
    // const valReg = /^[(\d{3,4})]$|^([1-9]-[1-9]{2,3})$|^([1-9]{3}-)$/;
    const valReg = /(^00[123456789]\d{1,2}$)|((^(\d{3,4})$)|^([1-9]-[1-9]{2,3})$|^([1-9]{3}-)$)/; // 前两个必须00，第三个不为0的数字，后面2位为0-9的数字
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入正确的国际区号！'));
    } else {
      callback();
    }
  },
  // 国际区号（要按需求来）
  houseInternationalCode1: (rule, value, callback) => {
    const valReg = /^[\d-]{0,5}$/; // 允许输入数字和“-”，最多可输入5个字符
    if (!valReg.test(value)) {
      return callback(new Error('请输入数字和“-”，最多可输入5个字符！'));
    } else {
      callback();
    }
  },
  fiveNumPhone: (rule, value, callback) => {
    // const valReg = /^[(\d{3,4})]$|^([1-9]-[1-9]{2,3})$|^([1-9]{3}-)$/;
    const valReg = /(^[\d-]{5}$)/; // 5个数字可以-
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入正确的国际区号！'));
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

  // 只能输入8个字符
  numberRule: (rule, value, callback) => {
    if (String(value).length > 8) {
      return callback(new Error('不能超过8位字符'));
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
