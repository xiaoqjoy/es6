const reportValidator = {
  // 无特殊符号无标点符号输入框通用规则 限制20字符
  notSpecial: (rule, value, callback) => {
    const valReg = /^(?!.*?[\u3000-\u303F\u4DC0-\u4DFF\u2800-\u28FF\u3200-\u32FF\u3300-\u33FF\u2700-\u27BF\u2600-\u26FF\uFE10-\uFE1F\uFE30-\uFE4F])[\u4e00-\u9fbb\u2E80-\uFE4Fa-zA-Z0-9]{1,20}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入20字以内字母/数字/中文'));
    } else {
      callback();
    }
  },
  // 无特殊符号无标点符号其他长度
  noLengthSpecial: (rule, value, callback) => {
    const valReg = /^(?!.*?[\u3000-\u303F\u4DC0-\u4DFF\u2800-\u28FF\u3200-\u32FF\u3300-\u33FF\u2700-\u27BF\u2600-\u26FF\uFE10-\uFE1F\uFE30-\uFE4F])[\u4e00-\u9fbb\u2E80-\uFE4Fa-zA-Z0-9]+$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入字母/数字/中文'));
    } else {
      callback();
    }
  },
  // 全汉字规则 限制10字符
  chineseRule: (rule, value, callback) => {
    const valReg = /^(?!.*?[\u3000-\u303F\u4DC0-\u4DFF\u2800-\u28FF\u3200-\u32FF\u3300-\u33FF\u2700-\u27BF\u2600-\u26FF\uFE10-\uFE1F\uFE30-\uFE4F])[\u4e00-\u9fbb\u2E80-\uFE4F]{1,10}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入10字内汉字'));
    } else {
      callback();
    }
  },
  // 全汉字规则 限制50字符
  chineseRule_50: (rule, value, callback) => {
    const valReg = /^(?!.*?[\u3000-\u303F\u4DC0-\u4DFF\u2800-\u28FF\u3200-\u32FF\u3300-\u33FF\u2700-\u27BF\u2600-\u26FF\uFE10-\uFE1F\uFE30-\uFE4F])[\u4e00-\u9fbb\u2E80-\uFE4F]{1,50}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入50字内汉字'));
    } else {
      callback();
    }
  },
  chineseRule_500: (rule, value, callback) => {
    const valReg = /^.{0,500}$/;
    if (!valReg.test(value)) {
      return callback(new Error('请输入500字内汉字'));
    } else {
      callback();
    }
  },
  // 固话电话
  fix_phoneRule: (rule, value, callback) => {
    const valReg = /^((\d{3,4}-)|\d{3,4}-)?\d{7,8}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入正确的固话号码'));
    } else {
      callback();
    }
  },
  // 20字以内非特殊字符
  special_character: (rule, value, callback) => {
    const valReg = /^[\u4e00-\u9fa5\da-zA-Z\-._]{1,20}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入20字以内非特殊字符'));
    } else {
      callback();
    }
  },
  // 20字以内非特殊字符
  // strRegex: (rule, value, callback) => {
  //   const valReg = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/;
  //   if (!valReg.test(value) && !!value) {
  //     return callback(new Error('请输入正确格式的网站'));
  //   } else {
  //     callback();
  //   }
  // },
  // 网址验证
  website: (rule, value, callback) => {
    const valReg = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入正确格式的网站'));
    } else {
      callback();
    }
  },
  // 整数规则
  numberValid: (minNum, maxNum, text) => {
    return (rule, value, callback) => {
      value = Number(value);
      if (typeof value === 'number' && !isNaN(value)) {
        if (isNaN(minNum) && isNaN(maxNum)) {
          if (value % 1 !== 0) {
            callback(new Error(text + '为整数'));
          }
        }
        if (isNaN(minNum) && !isNaN(maxNum)) {
          if (value > maxNum || value % 1 !== 0) {
            callback(new Error(text + '为不大于' + maxNum + ' 的整数'));
          }
        }
        if (!isNaN(minNum) && isNaN(maxNum)) {
          if (value < minNum || value % 1 !== 0) {
            callback(new Error(text + '为不小于' + minNum + ' 的整数'));
          }
        }
        if (value < minNum || value > maxNum || value % 1 !== 0) {
          callback(new Error(text + '为 ' + minNum + ' 至' + maxNum + ' 之间的整数'));
        } else {
          callback();
        }
      } else {
        callback(new Error(text + '必须为数字'));
      }
    };
  }
};

export default reportValidator;
