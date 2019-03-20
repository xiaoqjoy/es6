var moment = require('moment');

//基础字典变量集
var dictionaryObjSet = {
  diabetesType: [], //糖尿病类型
  complications: [], //并发症列表
  job: [], //职业
  labourIntensity: [], //劳动强度
  smokingStatus: [], //吸烟情况
  peacetimeEmotion: [], //平时情绪
  drinkingStatus: [], //饮酒情况
  drinkingType: [], //饮酒类型
  exerciseFrequency: [], //运动 锻炼情况
  sleepStatus: [], //睡眠
  foodHabit: [], //饮食偏好
  maritalStatus: [], //婚姻情况
  meansInterven: [], //干预(/推送)方式:微信、QQ、电话
  interType: [], //干预类型
  followWay: [], //随访方式
  noSugarTestType: [], // 未测量时段类型(3天为测量、7天未测量)
  sugarType: [], //血糖状况(血糖正常/血糖偏高/血糖偏低)
  dataRange: [], //员工用户数据范围权限
  checkType: [], //检查报告类型
}

/*获取患者信息*/
function getPatientInfo(t, customerId) {
  t.$api.getPatientInfo({
    customerId: customerId
  }, res => {
    if (res.status == 200) {
      if (res.data.code == 0) {
        t.fileNumber = res.data.data.fileNumber; //档案号码
        t.patientInfo = res.data.data.patientBaseVo;
        t.patientSugarVo = res.data.data.patientSugarVo;
        if (t.patientInfo) {
          //时间戳转出生年月
          if (t.patientInfo.birthday) {
            t.patientInfo.birthday = t.patientInfo.birthday ? t.formatDate(t.patientInfo.birthday).replace(/\s[\x00-\xff]*/g, '') : '';
            //年龄
            if (typeof (t.age) != 'undefined') {
              t.age = t.jsGetAge(t.patientInfo.birthday);
            }
          }
          //性别
          if (t.patientInfo.sex) {
            t.patientInfo.sex = t.patientInfo.sex == 1 ? '男' : t.patientInfo.sex == 2 ? '女' : t.patientInfo.sex == 0 ? '未知' : '';
          }
        }
        if (t.patientSugarVo) {
          //并发症
          let complicationsRemark = t.patientSugarVo.complicationsRemark !== null ? t.patientSugarVo.complicationsRemark : ''; //其他并发症
          let complications = t.patientSugarVo.complications;
          let complicaTemp = complications !== null && complications !== '' ? complications.split(",") : []; //并发症
          complicaTemp = complicaTemp.map(Number); //string数组转int数组

          //并发症显示
          if (complicaTemp.length > 0) {
            if (complicaTemp.length == 1 && complicaTemp[0] == 0) { //并发症仅选中了其他项
              t.patientSugarVo.complications = complicationsRemark ? complicationsRemark : '无';
            } else {
              let temp = [];
              let isNotComplica = false;
              for (let i = 0, len = complicaTemp.length; i < len; i++) {
                if (complicaTemp[i] == 1) { //无并发症
                  isNotComplica = true;
                  break;
                } else if (complicaTemp[i] == 0) { //其他并发症
                  if (complicationsRemark) {
                    temp.push(complicationsRemark);
                  }
                } else {
                  let arr = t.complicationsArr;
                  for (let j = 0, le = arr.length; j < le; j++) {
                    if (complicaTemp[i] == 0) {
                      continue;
                    } else if (complicaTemp[i] == arr[j].itemKey) {
                      temp.push(arr[j].itemValue);
                      break;
                    }
                  }
                }
              }
              t.patientSugarVo.complications = isNotComplica ? '无' : temp.join(',');
            }
          } else {
            t.patientSugarVo.complications = '无';
          }

          //糖龄(格式转换)
          t.patientSugarVo.ensureDate = t.patientSugarVo.ensureDate ? t.jsGetAge(t.formatDate(t.patientSugarVo.ensureDate)) : '';
          //糖尿病类型
          let diabetesType = t.patientSugarVo.diabetesType;
          if (diabetesType != null) {

            //获取糖尿病类型值
            if (typeof (t.ruleForm) != 'undefined') {
              t.ruleForm.diabetesType = diabetesType;
            }

            // 根据糖尿病类型值获取糖尿病名称
            if (typeof (t.diabetesTypeName) != 'undefined') {
              let arr = t.diabetesTypeArr;
              for (let j = 0, le = arr.length; j < le; j++) {
                if (diabetesType == arr[j].itemKey) {
                  t.diabetesTypeName = arr[j].itemValue;
                  break;
                }
              }              
            }

            // 根据糖尿病类型获取健康随访模板
            if (typeof (t.followTemplates) != 'undefined') {
              t.changeDiabetesType(diabetesType);
            }

          }
        }

      }
    }
  }, res => {
    t.$message(res.data.errMsg || res.data.data);
  })
};

//根据typeCode获取字典接口对应的数组
function getDictionaryItemArray(t, typeCode) {
  let dataSet = dictionaryObjSet; //全局变量，存储字典所有数据
  t.$api.dictionarys({
    typeCode: typeCode
  }, res => {
    if (res.status == 200) {
      let data = res.data.data;
      if (data) {
        switch (typeCode) {
          case 'diabetes_type': //糖尿病类型
            dataSet.diabetesType = data;
            t.diabetesTypeArr = data;
            break;
          case 'job': //职业
            dataSet.job = data;
            t.jobArr = data;
            break;
          case 'labour_intensity': //劳动强度
            dataSet.labourIntensity = data;
            t.labourIntensityArr = data;
            break;
          case 'smoking_status': //吸烟情况
            dataSet.smokingStatus = data;
            t.smokingStatusArr = data;
            break;
          case 'moodType': //平时情绪
            dataSet.peacetimeEmotion = data;
            t.peacetimeEmotionArr = data;
            break;
          case 'drinking_status': //饮酒情况
            dataSet.drinkingStatus = data;
            t.drinkingStatusArr = data;
            break;
          case 'drinking_type': //饮酒类型
            dataSet.drinkingType = data;
            t.drinkingTypeArr = data;
            break;
          case 'exercise_frequency': //运动 锻炼情况
            dataSet.exerciseFrequency = data;
            t.exerciseFrequencyArr = data;
            break;
          case 'sleep_status': //睡眠
            dataSet.sleepStatus = data;
            t.sleepStatusArr = data;
            break;
          case 'food_habit': //饮食偏好
            dataSet.foodHabit = data;
            t.foodHabitArr = data;
            break;
          case 'complications': //并发症列表
            dataSet.complications = data;
            t.complicationsArr = data;
            break;
          case 'meansInterven': //干预(/推送)方式:微信、QQ、电话
            dataSet.meansInterven = data;
            t.meansIntervenArr = data;
            break;
          case 'interType': //干预类型
            dataSet.interType = data;
            t.interTypeArr = data;
            break;
          case 'followWay': //随访方式
            dataSet.followWay = data;
            t.followWayArr = data;
            break;
          case 'noSugarTestType': // 未测量时段类型(3天为测量、7天未测量)
            dataSet.noSugarTestType = data;
            t.noSugarTestTypeArr = data;
            break;
          case 'sugarType': //血糖状况(血糖正常/血糖偏高/血糖偏低)
            dataSet.sugarType = data;
            t.sugarTypeArr = data;
            break;
          case 'dataRange': //员工用户数据范围权限
            dataSet.dataRange = data;
            t.dataRangeArr = data;
            break;
          case 'checkType': //检查报告类型
            dataSet.checkType = data;
            t.checkTypeArr = data;
            break;
          case 'marital_status': //婚姻情况
            dataSet.maritalStatus = data;
            t.maritalStatusArr = dataSet.maritalStatus;
            break;
        }

      }
    }
  }, res => {
    t.$message(res.data.errMsg || res.data.data);
  })
}

//根据code获取本地字典对应数组
function getDictionarysByTypeCode(t, typeCode) {
  let dataSet = dictionaryObjSet; //全局变量，存储字典所有数据
  let objArr = [];
  switch (typeCode) {
    case 'diabetes_type': //糖尿病类型
      objArr = dataSet.diabetesType;
      t.diabetesTypeArr = dataSet.diabetesType;
      break;
    case 'job': //职业
      objArr = dataSet.job;
      t.jobArr = dataSet.job;
      break;
    case 'labour_intensity': //劳动强度
      objArr = dataSet.labourIntensity;
      t.labourIntensityArr = dataSet.labourIntensity;
      break;
    case 'smoking_status': //吸烟情况
      objArr = dataSet.smokingStatus;
      t.smokingStatusArr = dataSet.smokingStatus;
      break;
    case 'moodType': //平时情绪
      objArr = dataSet.peacetimeEmotion;
      t.peacetimeEmotionArr = dataSet.peacetimeEmotion;
      break;
    case 'drinking_status': //饮酒情况
      objArr = dataSet.drinkingStatus;
      t.drinkingStatusArr = dataSet.drinkingStatus;
      break;
    case 'drinking_type': //饮酒类型
      objArr = dataSet.drinkingType;
      t.drinkingTypeArr = dataSet.drinkingType;
      break;
    case 'exercise_frequency': //运动 锻炼情况
      objArr = dataSet.exerciseFrequency;
      t.exerciseFrequencyArr = dataSet.exerciseFrequency;
      break;
    case 'sleep_status': //睡眠
      objArr = dataSet.sleepStatus;
      t.sleepStatusArr = dataSet.sleepStatus;
      break;
    case 'food_habit': //饮食偏好
      objArr = dataSet.foodHabit;
      t.foodHabitArr = dataSet.foodHabit;
      break;
    case 'complications': //并发症列表
      objArr = dataSet.complications;
      t.complicationsArr = dataSet.complications;
      break;
    case 'meansInterven': //干预(/推送)方式:微信、QQ、电话
      objArr = dataSet.meansInterven;
      t.meansIntervenArr = dataSet.meansInterven;
      break;
    case 'interType': //干预类型
      objArr = dataSet.interType;
      t.interTypeArr = dataSet.interType;
      break;
    case 'followWay': //随访方式
      objArr = dataSet.followWay;
      t.followWayArr = dataSet.followWay;
      break;
    case 'noSugarTestType': // 未测量时段类型(3天为测量、7天未测量)
      objArr = dataSet.noSugarTestType;
      t.noSugarTestTypeArr = dataSet.noSugarTestType;
      break;
    case 'sugarType': //血糖状况(血糖正常/血糖偏高/血糖偏低)
      objArr = dataSet.sugarType;
      t.sugarTypeArr = dataSet.sugarType;
      break;
    case 'dataRange': //员工用户数据范围权限
      objArr = dataSet.dataRange;
      t.dataRangeArr = dataSet.dataRange;
      break;
    case 'checkType': //检查报告类型
      objArr = dataSet.checkType;
      t.checkTypeArr = dataSet.checkType;
      break;
    case 'marital_status': //婚姻情况
      objArr = dataSet.maritalStatus;
      t.maritalStatusArr = dataSet.maritalStatus;
      break;
  }

  if (objArr.length == 0) {
    getDictionaryItemArray(t, typeCode);
  }
}

//患者编辑：初始化加载字典项目数组
function initLoadDictionaryItem(t) {
  //字典关键词(糖尿病类型、并发症、职业、劳动强度、吸烟情况、平时情绪、饮酒情况、饮酒类型、锻炼情况、睡眠、饮食偏好、婚姻情况)
  let dictionarys = ['diabetes_type', 'complications', 'job', 'labour_intensity', 'smoking_status', 'moodType', 'drinking_status', 'drinking_type', 'exercise_frequency', 'sleep_status', 'food_habit', 'marital_status'];
  for (let i = 0, len = dictionarys.length; i < len; i++) {
    getDictionarysByTypeCode(t, dictionarys[i]);
  }
}

/*获取干预方案(干预模板)*/
function getIntervenTemplateArr(t, data) {
  let user = JSON.parse(sessionStorage.getItem('user'));
  data.userId = user.userId;

  t.$api.interventionTemplate(data, res => {
    if (res.status == 200) {
      if (res.data.data) {
        let datas = res.data.data;
        for (let i = 0, len = datas.length; i < len; i++) {
          datas[i].tempCreateTime = t.formatDate(datas[i].tempCreateTime).split(':').slice(0, 2, 1).join(':');
        }
        t.interTempArr = datas;
        if (typeof(t.cacheInterTemplates) != 'undefined') {
        	t.cacheInterTemplates = datas;
        }
      }
    }
  }, res => {
    t.$message(res.data.errMsg || res.data.data);
  })
}

/*获取快捷回复标签*/
function dynamic(t) {
  let user = JSON.parse(sessionStorage.getItem('user'));
  t.$api.queryTemplate({
    userId: user.userId
  }, res => {
    if (res.status == 200) {
      if (res.data.code == 0) {
        t.dynamicTags = res.data.data;
      }
    }
  }, res => {
    t.$message(res.data.errMsg || res.data.data);
  })
}

/*获取患者标签*/
function getPatientTags(t) {
  let user = JSON.parse(sessionStorage.getItem('user'));
  t.$api.queryUserTag({
    userId: user.userId
  }, res => {
    if (res.status == 200) {
      if (res.data.code == 0) {
        t.patientTags = res.data.data;
      }
    }
  }, res => {
    t.$message(res.data.errMsg || res.data.data);
  })
}

/*获取随访计划人员*/
function geFollowplaners(t, data) {
  t.$api.queByOrganId(data, res => {
    if (res.status == 200) {
      if (res.data.code == 0) {
        t.Executor = res.data.data;
      }
    }
  }, res => {
    t.$message(res.data.errMsg || res.data.data);
  })
}

/*获取随访信息*/
function queryFollowInfoById(t, followUpId) {
  t.$api.queryFollowInfoById({
    followUpId: followUpId
  }, res => {
    if (res.status == 200) {
      if (res.data.code == 0) {
        t.foldet = res.data.data;
        t.foldet.planTime = t.foldet.planTime ? t.formatDate(t.foldet.planTime) : '';
        t.foldet.realTime = t.foldet.realTime ? t.formatDate(t.foldet.realTime) : '';
        if (t.foldet.type !== null) {
          let followWay = t.foldet.type;
          let type = ' ';
          let arr = t.followWayArr;
          for (let j = 0, le = arr.length; j < le; j++) {
            if (followWay == arr[j].itemKey) {
              type = arr[j].itemValue;
              break;
            }
          }
          t.foldet.type = type;
        }
      }
    }
  }, res => {
    t.$message(res.data.errMsg || res.data.data);
  })
}

/*获取医生或护士列表*/
function queryUserList(t, data) {
  t.$api.queryUserList(data, res => {
    if (res.status == 200) {
      if (res.data.code == 0) {
        let doctorList = [],
          nurseList = [];
        let data = res.data.data;
        if (data.length > 0) {
          for (let i = 0, len = data.length; i < len; i++) {
            //角色类型roleType: 1-医生, 2-护士
            if (data[i].roleType == 1) {
              doctorList.push(data[i]);
            } else if (data[i].roleType == 2) {
              nurseList.push(data[i]);
            }
          }
        }
        t.doctorList = doctorList;
        t.nurseList = nurseList;
      }
    }
  }, res => {
    t.$message(res.data.errMsg || res.data.data);
  })
}

//批量随访
function batchFollowUp(t) {
  let target = t.$parent.$refs.batchFollowUp;
  target.ifBatchFollow = true;
  target.origin = t;
  target.diabetesTypeArr = t.diabetesTypeArr;
  t.passingPatient(target); // 传参(患者)到批量处理
  let user = JSON.parse(sessionStorage.getItem('user'));
  let data = {
    organizationId: user.organizationId
  }
  geFollowplaners(target, data); //获取随访计划人员
  target.getFollowTemplate({});
}

//批量干预
function batchInter(t) {
  let target = t.$parent.$refs.batchInter;
  target.ifBaInter = true;
  target.origin = t;
  target.checkedss = false; //默认保存模板为不勾选
  target.ruleForm.temName = ""; //清空模板名称
  target.radio4 = 1; //默认立即发送
  target.options = ""; // 清空方案名称
  target.ruleForm.type = ""; // 清空干预类型
  target.ruleForm.typeWay = ""; //默认干预方式为微信
  t.passingPatient(target); // 传参(患者)到批量处理
  getDictionarysByTypeCode(target, 'interType'); //干预类型接口
  getDictionarysByTypeCode(target, 'meansInterven'); //获取干预方式 微信、电话、qq
}

//批量 提醒
function batchRemind(t) {
  let target = t.$parent.$refs.batchRemind;
  target.origin = t;
  target.ifBatchRemind = true;
  target.newAdds = false; // 隐藏新增快捷回复按钮
  target.ruleForm.typeWay = ""; //默认干预方式为微信
  getDictionarysByTypeCode(target, 'meansInterven'); //获取干预方式 微信、电话、qq
  t.passingPatient(target); // 传参(患者)到批量处理
  dynamic(target); //快捷回复

  //清空内容和模板Id
  target.radio_ = "";
  target.templateId_ = "";
  target.ruleForm.recont = "";

}

//时间格式
var formatTen = function (num) {
  return num > 9 ? (num + "") : ("0" + num);
}
var formatDate = function (date) {
  if (date) {
    date = new Date(date);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    if (hour < 10) {
      hour = "0" + hour;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
      minute = "0" + minute;
    }
    let second = date.getSeconds();
    if (second < 10) {
      second = "0" + second;
    }
    return year + "-" + formatTen(month) + "-" + formatTen(day) + ' ' + hour + ':' + minute + ':' + second;
  }
}
// 获取当前时间之前的n天00:00:00为开始时间 , 今天23:59:59为结束时间
function getDaySomedayAgo(number) {
  let startTime = moment().subtract(number, 'days').format('YYYY-MM-DD') + ' 00:00:00';
  let endTime = moment().subtract(1, 'days').format('YYYY-MM-DD') + ' 23:59:59';
  return {
    startTime: new Date(startTime).getTime(),
    endTime: new Date(endTime).getTime()
  };
}
getDaySomedayAgo(7);

/*验证模块*/
/*验证内容是否为空格*/
var validateIsNull = (rule, value, callback) => {
  if (value.trim() === '') {
    callback(new Error('请输入内容'));
  } else {
    callback();
  }
};

//验证密码
var validatePWD = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'));
  } else if (!(/[a-zA-Z0-9]{6,16}/.test(value))) {
    callback(new Error('密码为6到16位的英文或数字'));
  } else if (value.replace(/(^\s*)|(\s*$)/g, "") === '') {
    callback(new Error('密码不能为空格'));
  } else {
    callback();
  }
};

//邮箱号
var validateMail = (rule, value, callback) => {
  if (value != '' && !/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(value)) {
    callback(new Error('请输入正确的邮箱号'));
  } else {
    callback();
  }
};

export default {
  validateIsNull: validateIsNull, //验证内容是否为空格
  validatePWD: validatePWD, //验证密码

  formatDate: formatDate, // 日期格式转换

  getPatients: getPatientInfo, //获取患者信息
  geFollowplaners: geFollowplaners, //获取随访计划人员

  dynamic: dynamic, //获取快捷回复标签
  //getPatientTags: getPatientTags, //获取患者标签

  getIntervenTemplateArr: getIntervenTemplateArr, //获取干预方案(干预模板)
  queryFollowInfoById: queryFollowInfoById, //获取随访信息
  queryUserList: queryUserList, //获取医生或护士列表
  getDaySomedayAgo: getDaySomedayAgo, // 获取当前时间之前n天的开始时间和结束时间
  getDictionarysByTypeCode: getDictionarysByTypeCode, // 获取字典对应的数组
  batchFollowUp: batchFollowUp, //批量随访
  batchInter: batchInter, //批量干预
  batchRemind: batchRemind, //批量提醒
  initLoadDictionaryItem: initLoadDictionaryItem, //初始化加载字典项目
}