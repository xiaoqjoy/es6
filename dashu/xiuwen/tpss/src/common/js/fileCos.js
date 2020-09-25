
let fileCos = {
  getHost() {
    return ['api', 'api/cpms'];
    // return ['/sit3/api', '/sit3/api/cpms'];
  },
  getCos() {
    let host = window.location.host;
    if (host.indexOf("10.32.81.102") !== -1) {
      return 'xw-cos-prd-1252135996'; // 大数修文
    } else if (host.indexOf("mloan.dashuf.com") !== -1) {
      return 'cos-prd-1252135996'; // 大数二代
    } else {
      return 'cos-test-1252135996'; // 大数测试
    }
  },
  getFileHost() {
    let url = window.location.href.split("/");
    let uploadUrl = '';
    for (let i = 0; i < url.length; i++) {
      uploadUrl =
        url[0].toString() +
        "//" +
        url[2].toString();
    }
    return uploadUrl;
  },
  checkIdcard (idcard) {
      let Errors = [
        "验证通过!",
        "身份证号码位数不对!",
        "身份证号码出生日期超出范围或含有非法字符!",
        "身份证号码校验错误!",
        "身份证地区非法!"
      ];
      let area = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
      let Y, JYM;
      let S, M;
      let idcardArray = [];
      let ereg;
      idcardArray = idcard.split("");

      // 地区检验
      if (area[parseInt(idcard.substr(0, 2))] === null) {
        console.log(Errors[4]);
        return false;
      }

      // 身份号码位数及格式检验
      switch (idcard.length) {
        case 15:
        if ((parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0 || ((parseInt(idcard.substr(6, 2)) + 1900) % 100 === 0 && (parseInt(idcard.substr(6, 2)) + 1900) % 4 === 0)) {
          ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$/; // 测试出生日期的合法性
        } else {
          ereg = /^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$/; // 测试出生日期的合法性
        }

        if (ereg.test(idcard)) {
          console.log(Errors[0]);
          return true;
        } else {
          console.log(Errors[2]);
          return false;
        }
        case 18:
        // 18位身份号码检测
        // 出生日期的合法性检查
        if (parseInt(idcard.substr(6, 4)) % 4 === 0 || (parseInt(idcard.substr(6, 4)) % 100 === 0 && parseInt(idcard.substr(6, 4)) % 4 === 0)) {
          ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/;// 闰年出生日期的合法性正则表达式
        } else {
          ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/;// 平年出生日期的合法性正则表达式
        }
        if (ereg.test(idcard)) { // 测试出生日期的合法性
          // 计算校验位
          S = (parseInt(idcardArray[0]) + parseInt(idcardArray[10])) * 7 + (parseInt(idcardArray[1]) + parseInt(idcardArray[11])) * 9 + (parseInt(idcardArray[2]) + parseInt(idcardArray[12])) * 10 + (parseInt(idcardArray[3]) + parseInt(idcardArray[13])) * 5 + (parseInt(idcardArray[4]) + parseInt(idcardArray[14])) * 8 + (parseInt(idcardArray[5]) + parseInt(idcardArray[15])) * 4 + (parseInt(idcardArray[6]) + parseInt(idcardArray[16])) * 2 + parseInt(idcardArray[7]) * 1 + parseInt(idcardArray[8]) * 6 + parseInt(idcardArray[9]) * 3;
          Y = S % 11;
          M = "F";
          JYM = "10X98765432";
          M = JYM.substr(Y, 1); // 判断校验位
          if (M === idcardArray[17]) {
            return Errors[0]; // 检测ID的校验位
          } else {
            console.log(Errors[3]);
            return false;
          }
        } else {
          console.log(Errors[2]);
          return false;
        }
        default:
        console.log(Errors[1]);
        return false;
      }
  }
};
export { fileCos };
