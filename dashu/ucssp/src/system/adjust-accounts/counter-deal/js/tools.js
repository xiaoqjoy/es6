const tools = {
  dateFormat(_str) {
    if (_str === null || _str === undefined) {
      return '';
    }
    if (!(_str * 1000)) {
      return _str;
    }
    function change(t) {
      if (t < 10) {
          return "0" + t;
      } else {
          return t;
      }
    };
    var date = new Date(_str * 1000); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000;
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = change(date.getDate());
    return Y + M + D;
  }
};

export {
  tools
};
