export function isString(obj) {
  return Object.prototype.toString.apply(obj) === '[object String]';
};
export function isFunction(obj) {
  return Object.prototype.toString.apply(obj) === '[object Function]';
};
export function isArray(obj) {
  return Object.prototype.toString.apply(obj) === '[object Array]';
};
export function isNumber(obj) {
  return Object.prototype.toString.apply(obj) === '[object Number]';
};
export function isBoolean(obj) {
  return Object.prototype.toString.apply(obj) === '[object Boolean]';
};
export function isRegExp(obj) {
  return Object.prototype.toString.apply(obj) === '[object RegExp]';
};
export function isObject(obj) {
  return Object.prototype.toString.apply(obj) === '[object Object]';
};
export function isDate(obj) {
  return Object.prototype.toString.apply(obj) === '[object Date]';
};

export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone');
  }
  if (source) {
    const targetObj = source.constructor === Array ? [] : {};
    Object.keys(source).forEach((keys) => {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      } else {
        targetObj[keys] = source[keys];
      }
    });
    return targetObj;
  }
};

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}/{m}/{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) {
      time = parseInt(time) * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') {
      return '一二三四五六日'.charAt(value);
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return timeStr;
};
export function parseSongTime(time) {
  if (arguments.length === 0) {
    return null;
  }
  let m = parseInt(Math.round(time) / 60);
  let s = parseInt(Math.round(time) % 60);
  if (m >= 0 && m < 10) {
    m = '0' + m;
  }
  if (s >= 0 && s < 10) {
    s = '0' + s;
  }
  return m + ':' + s;
};
// 根据地址编号，全地址库，查询对应的省市区
export function parseAddress(code, addressMap) {
  let municipalitiesArr = ['1101', '1201', '3101', '5001'];
  let addressObj = {
    province: '',
    city: '',
    area: '',
    areaCode: code
  };
  if (!code) {
    return addressObj;
  }
  for (let p of addressMap) {
    if (code.substr(0, 2) === p.value.substr(0, 2)) {
      addressObj.province = p.label;
      if (code === p.value) {
        return addressObj;
      } else if (p.children) {
        for (let c of p.children) {
          if (code.substr(0, 4) === c.value.substr(0, 4) || municipalitiesArr.indexOf(code.substr(0, 4)) !== -1) {
            addressObj.city = c.label;
            if (code === c.value) {
              addressObj.city = c.label;
              return addressObj;
            } else if (c.children) {
              for (let a of c.children) {
                if (code === a.value) {
                  addressObj.area = a.label;
                  return addressObj;
                }
              }
            }
          }
        }
      }
    }
  }
};

export function getSystemName() {
  return window.location.hash.split('/')[2];
}

// 多选数据格式转换
export function multipleChoice(value) {
  if (isArray(value)) {
    return value.join('||');
  } else if (isString(value)) {
    if (value !== '') {
      return value.split('||');
    } else {
      return [];
    }
  } else if (!value) {
    return [];
  } else {
    return Error;
  }
};

// 是否选择字段提交时转化类型
export function yesNo(value) {
  if (isString(value)) {
    return value === '1';
  } else if (isBoolean(value)) {
    return value ? '1' : '0';
  }
}

// 客户类型转展示
export function careerTypeCodeShow(value) {
  return value === '060' ? '自雇' : '受薪';
}

// 预约状态转换
export function reserveStatusConversion(value) {
  switch (value) {
    case '0': return '正常';
    case '1': return '异常';
    case '正常': return '0';
    case '异常': return '1';
  }
}

// 报告复核状态转换
export function checkResultConversion(value) {
  switch (value) {
    case '00': return '复核通过';
    case '01': return '复核异常';
  }
}

// 工作状态解析
export function reserveWorkState(value) {
  switch (value) {
    case '1': return '工作中';
    case '2': return '休假中';
  }
}

// 调查结论解析
export function reserveConclusion(value) {
  switch (value) {
    case 'S': return '通过';
    case 'D': return '存疑';
    case 'F': return '否决';
    default: return value;
  }
}
