
const reportValidator = {
  // 实还金额不能大于应还金额
  actualAmount: (actualAmount) => {
    return (rule, value, callback) => {
      const valReg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
      if (!valReg.test(value) && !!value) {
        return callback(new Error('请输入正确的金额！'));
      } else {
        value = Number(value);
        actualAmount = Number(actualAmount);
        if (value > actualAmount) {
          callback(new Error('实还金额不能大于应还金额!'));
        }
      }
    };
  },
  // 邮箱 针对可输入多个邮箱 ，用；隔开
  emailRuls: (rule, value, callback) => {
    if (value !== '') {
      const valReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
      let valueStr = value.split(";");
      let flag = false;
      valueStr.forEach(element => {
        if (!valReg.test(element)) {
          flag = true;
        }
      });
      if (flag) {
        return callback(new Error('请输入正确的邮箱,多个邮箱用“;”隔开'));
      } else {
        callback();
      }
    } else {
      callback();
    }
  },
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
  // 姓名 关系 法人 全汉字规则
  chineseRule: (rule, value, callback) => {
    const valReg = /^(?!.*?[\u3000-\u303F\u4DC0-\u4DFF\u2800-\u28FF\u3200-\u32FF\u3300-\u33FF\u2700-\u27BF\u2600-\u26FF\uFE10-\uFE1F\uFE30-\uFE4F])[\u4e00-\u9fbb\u2E80-\uFE4F]+$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入汉字'));
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
  },
  // 字母数字长度20
  alphanumeric: (rule, value, callback) => {
    const valReg = /^\w{1,20}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入编号'));
    } else {
      callback();
    }
  },
  // 两位小数
  numTwoBit: (rule, value, callback) => {
    const valReg = /^\d+((?=\.{0,1}\d{1,2}$)|$)/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入两位小数！'));
    } else {
      callback();
    }
  },
  // 两位小数且允许负数
  numTwoBitAndNegative: (rule, value, callback) => {
    var valReg = /^[-+]?(((\d+)$)|(\d+\.\d{2}$))/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入两位小数！'));
    } else {
      callback();
    }
  },
  // 不能超过两位小数
  surpassNumTwoBitAndNegative: (rule, value, callback) => {
    var valReg = /^\d+(\.\d{1,2})?$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('不能超过两位小数！'));
    } else {
      callback();
    }
  },
  // 正数
  nonNegative3: (rule, value, callback) => {
    const valReg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入正确的金额！'));
    } else {
      callback();
    }
  },
  // 金额不能为0
  noZero: (rule, value, callback) => {
    value = Number(value);
    if (value === 0) {
      return callback(new Error('金额不能为0！'));
    } else {
      callback();
    }
  }
};

export default reportValidator;
