/**
 * Created by luo.
 */

/*获取患者信息*/
function getPatientInfo(t, customerId) {
    t.$api.patientInfo({customerId:customerId}, res => {
      if (res.status == 200) {
        if (res.data.data) {
          t.fileNumber = res.data.data.fileNumber; //档案号码
          t.patientInfo = res.data.data.patientBaseVo;
          t.patientSugarVo = res.data.data.patientSugarVo;
          if (t.patientInfo) {
            //时间戳转出生年月
            if (t.patientInfo.birthday) {
              t.patientInfo.birthday = t.patientInfo.birthday ? t.formatDate(t.patientInfo.birthday).replace(/\s[\x00-\xff]*/g, '') : '';
            }
            //性别
            if (t.patientInfo.sex) {
              t.patientInfo.sex = t.patientInfo.sex == 1 ? '男' : t.patientInfo.sex == 2 ? '女' : t.patientInfo.sex == 0 ? '未知' : '';
            }
          }
          if (t.patientSugarVo) {
            //并发症
            t.patientSugarVo.complications = t.patientSugarVo.complications ? t.patientSugarVo.complications : '';
            //糖龄(格式转换)
            t.patientSugarVo.ensureDate = t.patientSugarVo.ensureDate ? t.jsGetAge(t.formatDate(t.patientSugarVo.ensureDate)) : '';
            //糖尿病类型
            if (t.patientSugarVo.diabetesType) {

              // 根据糖尿病类型获取健康随访模板
              if (t.patientSugarVo.diabetesType !== "") {
                t.$api.queryUsers_({diabetesType:t.patientSugarVo.diabetesType}, re=> {
                  if (re.status == 200) {
                    if (re.data.data) {
                      t.followTemplates = re.data.data;
                    }
                  }
                }).catch(function (err) {
                  console.log(err)
                })
              } else {
                t.followTemplates = '';
              }

              // 根据key
              t.$api.dictionary_({typeCode:'diabetes_Type', itemKey:t.patientSugarVo.diabetesType},re=> {
                if (re.status == 200) {
                  if (re.data.data) {
                    t.patientSugarVo.diabetesType = re.data.data[0].itemValue;
                  }
                }
              }).catch(function (err) {
                console.log(err)
              })
            }
          }
          // 获取随访模板
          if(t.followTemplates){
            t.$api.queryUsers_({diabetesType:t.patientSugarVo.diabetesType},res=> {
                if (res.data.data.length > 0) {
                    t.followTemplates = res.data.data;
                } else {
                    t.followTemplates = [];
                }
            })
          }
        }
      }
    }).catch(function (err) {
        console.log(err)
    })
};

/*获取随访计划人员*/
function geFollowplaners(t, orgId) {
    t.$api.queByOrganId({organizationId: orgId}, res => {
        if (res.status == 200) {
            if (res.data.data) {
                t.Executor = res.data.data;
            }
        }
    })
}

/*获取干预类型*/
function getInterType(t) {
  t.$api.dictionarys({typeCode:'interType'},res=> {
    if (res.status == 200) {
      if (res.data.data) {
        t.interTypes = res.data.data;
      }
    }
  }).catch(function (err) {
    console.log(err)
  })
}

/*获取随访方式*/
function getFollowWays(t) {
  t.$api.dictionarys({typeCode:'followWay'},res=> {
    if (res.status == 200) {
      if (res.data.data) {
        t.FollowMethod = res.data.data;
      }

    }
  }).catch(function (err) {
    t.message = err;
    console.log(err)
  })
}

/*获取(干预/推送)方式:微信、QQ、电话*/
function getTypeWays(t) {
  t.$api.dictionarys({typeCode:'meansInterven'},res=> {
    if (res.status == 200) {
      if (res.data.data) {
        t.m_typeWays = res.data.data;
      }
    }
  }).catch(function (err) {
    t.message = err;
    console.log(err)
  })
}

/*获取糖尿病类型*/
function getDiabetesType(t) {
  t.$api.dictionarys({typeCode:'diabetes_type'},res=> {
      if (res.status == 200) {
          if (res.data.data) {
              t.diabetesType = res.data.data;
          }
      }
  }).catch(function (err) {
      t.message = err;
      console.log(err)
  })
}



/*获取干预方案名称*/
function getInterven(t, type) {
  if (sessionStorage.getItem('user')) {
    var user = JSON.parse(sessionStorage.getItem('user'));
    t.$api.interven({userId:user.userId, type:type},res=> {
      if (res.status == 200) {
        if (res.data.data) {
          t.options = res.data.data;
        }
      }
    }).catch(function (err) {
      console.log(err)
    })
  }
}

/*获取快捷回复标签*/
function dynamic(t) {
  if (sessionStorage.getItem('user')) {
    var user = JSON.parse(sessionStorage.getItem('user'));
    t.$api.queryTemplate({userId:user.userId},res=> {
      if (res.status == 200) {
        if (res.data.data) {
          t.dynamicTags = res.data.data;
        }
      }
    }).catch(function (err) {
      console.log(err)
    })
  }
}

/*获取患者标签*/
function getPatientTags(t) {
  if (sessionStorage.getItem('user')) {
    var user = JSON.parse(sessionStorage.getItem('user'));
    t.$api.queryUserTag({userId:user.userId}, res => {
      if (res.status == 200) {
        if (res.data.data) {
          t.patientTags = res.data.data;
        }
      }
    }).catch(function (err) {
      console.log(err)
    })
  }
}

/*获取随访的计划人员*/
function getPlanePer(t, organizationId) {
  t.$api.queByOrganId({organizationId:organizationId}, res => {
    if (res.status == 200) {
      if (res.data.data) {
        t.Executor = res.data.data;
      }
    }
  }).catch(function (err) {
    console.log(err)
  })
}

/*获取随访人员*/
function getFollowPer(t, pageSize) {
  if (sessionStorage.getItem('user')) {
    var user = JSON.parse(sessionStorage.getItem('user'));
    t.$api.queByOrganId({organizationId:user.organizationId}, res => {
      if (res.status == 200) {
        if (res.data.data) {
          t.FollowPersonnel = res.data.data;
        }
      }
    }).catch(function (err) {
      console.log(err)
    })
  }
}

/*获取随访明细内容*/
function queByFol(t, followUpId) {
  t.$api.queryByfoIds_({followUpId:followUpId},res=> {
    if (res.status == 200) {
      if (res.data.data) {
        t.foldet = res.data.data;
        t.foldet.planTime = t.foldet.planTime ? t.formatDate(t.foldet.planTime) : '';
        t.foldet.realTime = t.foldet.realTime ? t.formatDate(t.foldet.realTime) : '';
      }
    }
  }).catch(function (err) {
    console.log(err)
  })
}


/*验证模块*/
/*验证内容是否为空格*/
var validateIsNull = (rule, value, callback) => {
    if (value.trim() === '') {
        callback(new Error('请输入内容'));
    } else {
        callback();
    }
};


export default {
  validateIsNull: validateIsNull, //验证内容是否为空格

  getPatients: getPatientInfo, //获取患者信息
  getInterType: getInterType, //获取干预类型
  getFollowPer: getFollowPer, //获取随访人员
  getTypeWays: getTypeWays, //获取干预方式
  getDiabetesType: getDiabetesType, //获取糖尿病类型
  geFollowplaners: geFollowplaners, //获取随访计划人员

  dynamic: dynamic, //获取快捷回复标签
  getPatientTags: getPatientTags, //获取患者标签

  getInterven: getInterven, //获取干预方案名称
  getPlanePer: getPlanePer, //获取随访的计划人员
  queByFol: queByFol, //获取随访明细内容
  getFollowWays: getFollowWays, //获取随访方式
}


