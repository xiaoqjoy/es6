import Vue from 'vue';
import axios from 'axios';
import { error } from 'util';
import router from "../router";

const codeErr = {
  tokenTimeOut: '-3'
};

const apiGet = function (url, data, success, fail) {
  let path;
  if (Object.prototype.toString.call(data) === '[object Object]') {
    let tempArr = Object.keys(data);
    if (tempArr.length > 0) {
      path = url + '?';
      tempArr.forEach(function (item) {
        if ((data[item].toString()).length > 0) {
          path = path + item + '=' + data[item] + '&';
        }
      });
      path = path.substring(0, path.length - 1);
    } else {
      path = url;
    }
    return axios.get(path).then(function (res) {
      //token 过期
      if (res.data.code == codeErr.tokenTimeOut) {
        let refreshToken = {
          refreshToken: sessionStorage.getItem("refreshToken")
        }
        axios.post('/token/v1/refresh', JSON.stringify(refreshToken)).then(function (response) {
          if (response.data.code == '0') {
            sessionStorage.setItem("token", response.data.data.token);
            sessionStorage.setItem("refreshToken", response.data.data.refreshToken);
            axios.get(path).then(function (result) { // 刷新token之后重新发送之前发送失败的请求
              if (result.data.code == '0') { // 成功
                success(result);
              } else {
                if (fail) { // 判断是否传入错误处理回调
                  fail(res);
                }
              }
            });
            //}else if (response.data.code == '-3') {
          } else {
            sessionStorage.setItem("token", "")
            sessionStorage.setItem("refreshToken", "")
            router.replace({
              path: '/',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }
        });
      } else if (res.data.code == '0') {
        success(res);
      } else {
        if (fail) {
          fail(res);
        }
      }
    }).catch(err => {
      console.log(err);
    });
  } else {
    throw new Error('Data Must be a Object');
  }
};

const apiPost = function (url, data, success, fail) {
  if (Object.prototype.toString.call(data) === '[object Object]') {
    return axios.post(url, JSON.stringify(data)).then(function (res) {
      if (res.data.code == codeErr.tokenTimeOut) {
        let refreshToken = {
          refreshToken: sessionStorage.getItem("refreshToken")
        }
        // axios.post
        axios.post('/token/v1/refresh', JSON.stringify(refreshToken)).then(function (response) {
          if (response.data.code == '0') {
            sessionStorage.setItem("token", response.data.data.token);
            sessionStorage.setItem("refreshToken", response.data.data.refreshToken);
            axios.post(url, JSON.stringify(data)).then(function (result) {
              if (result.data.code == '0') {
                success(result);
              } else {
                if (fail) { // 判断是否传入错误处理回调
                  fail(res);
                }
              }
            });
          } else {
            sessionStorage.setItem("token", "")
            sessionStorage.setItem("refreshToken", "")
            router.replace({
              path: '/',
              query: {
                redirect: router.currentRoute.fullPath
              }
            })
          }
        });
      } else if (res.data.code == '0') {
        success(res);
      } else {
        if (fail) {
          fail(res);
        }
      }
    }).catch(err => {
      console.log(err);
    });
  }
};

Vue.prototype.$api = {
  login: function (data) {
    var url = '/token/v1/create';
    var data = JSON.stringify(data);
    return axios.post(url, data);
  },
  //查询所有
  queryAll: function (data, success, fail) {
    var url = '/dictionary/type/v1/queryAll';
    return apiGet(url, data, success, fail);
  },

  //查询用户所属的健康随访模板
  queryByIds_: function (data, success, fail) {
    var url = '/template/followUp/queryById';
    return apiGet(url, data, success, fail);
  },
  //根据id查询随访信息
  queryFollowInfoById: function (data, success, fail) {
    var url = '/follow/up/v1/queryById';
    return apiGet(url, data, success, fail);
  },
  //条件查询字典接口
  dictionary_: function (data, success, fail) {
    var url = '/dictionary/item/v1/queryList';
    return apiGet(url, data, success, fail);
  },
  //查看干预类型
  dictionarys: function (data, success, fail) {
    var url = '/dictionary/item/v1/queryListByCode';
    return apiGet(url, data, success, fail);
  },
  //分页查询健康干预
  pagedQuery: function (data, success, fail) {
    var url = '/intervention/v1/pagedQueryList';
    return apiGet(url, data, success, fail);
  },
  //根据手机号查询单个患者
  getPatientByPhone: function (data, success, fail) {
    var url = '/user/customer/queryPatientInfoByKeyName';
    return apiGet(url, data, success, fail);
  },
  //根据姓名或手机号获取患者
  queryExistPatientInfoByKeyName: function (data, success, fail) {
    var url = '/user/customer/queryExistPatientInfoByKeyName';
    return apiGet(url, data, success, fail);
  },
  //获取customerId获取患者信息
  getPatientInfo: function (data, success, fail) {
    var url = '/user/customer/getPatientInfo';
    return apiGet(url, data, success, fail);
  },
  //验证手机号是否在公众号存在
  byPhoneExist: function (data, success, fail) {
    var url = '/user/customer/queryCustomerByPhone';
    return apiGet(url, data, success, fail)
  },
  //分页查询健康随访接口
  followPaged: function (data, success, fail) {
    var url = '/follow/up/v1/pagedQueryList';
    return apiGet(url, data, success, fail);
  },
  //分页查询健康提醒接口
  remindPaged: function (data, success, fail) {
    var url = '/remind/v1/pagedQueryList';
    return apiGet(url, data, success, fail);
  },
  //患者管理分页查询（搜索）
  pagedQueryPatientList: function (data, success, fail) {
    var url = '/user/customer/pagedQueryList';
    return apiGet(url, data, success, fail);
  },
  //修改健康随访接口
  followUpdate: function (data, success, fail) {
    var url = '/follow/up/v1/update';
    return apiPost(url, data, success, fail);
  },
  //批量提醒
  batchAdd: function (data, success, fail) {
    var url = '/remind/v1/batchAdd';
    return apiPost(url, data, success, fail);
  },
  //批量提醒(全部患者)
  remindAll: function (data, success, fail) {
    var url = '/remind/v1/remindAll';
    return apiPost(url, data, success, fail);
  },
  //新增干预
  intervenAdd: function (data, success, fail) {
    var url = '/intervention/v1/add';
    return apiPost(url, data, success, fail);
  },
  //新增干预模板
  addInterTemplate: function (data, success, fail) {
    var url = '/template/intervention/v1/add';
    return apiPost(url, data, success, fail);
  },
  //新增提醒模板
  remindAdd: function (data, success, fail) {
    var url = '/remind/v1/add';
    return apiPost(url, data, success, fail);
  },
  //批量干预
  intervenBatchAdd: function (data, success, fail) {
    var url = '/intervention/v1/batchAdd';
    return apiPost(url, data, success, fail);
  },
  //批量干预(全部患者)
  interventionAll: function (data, success, fail) {
    var url = '/intervention/v1/interventionAll';
    return apiPost(url, data, success, fail);
  },
  //删除快捷回复标签
  deleteById_: function (data, success, fail) {
    var url = '/template/reply/v1/deleteById';
    return apiPost(url, data, success, fail);
  },
  //新增快捷回复
  replyAdd: function (data, success, fail) {
    var url = '/template/reply/v1/add';
    return apiPost(url, data, success, fail);
  },
  //快捷回复接口
  queryTemplate: function (data, success, fail) {
    var url = '/template/reply/v1/queryUserReplyTemplate';
    return apiGet(url, data, success, fail);
  },
  //新建计划确定
  followAdd: function (data, success, fail) {
    var url = '/follow/up/v1/add';
    return apiPost(url, data, success, fail);
  },
  //执行健康随访接口
  followExecute: function (data, success, fail) {
    var url = '/follow/up/v1/execute';
    return apiPost(url, data, success, fail);
  },
  //取消健康随访
  followCancel: function (data, success, fail) {
    var url = '/follow/up/v1/cancel';
    return apiPost(url, data, success, fail);
  },
  //新增用户患者关联接口
  customerAdd: function (data, success, fail) {
    var url = '/user/customer/add';
    return apiPost(url, data, success, fail);
  },
  //编辑患者
  customerEdit: function (data, success, fail) {
    var url = '/user/customer/edit';
    return apiPost(url, data, success, fail);
  },
  //查询用户所拥有的患者标签接口
  queryUserTag: function (data, success, fail) {
    var url = '/tag/v1/queryUserTag';
    return apiGet(url, data, success, fail);
  },
  //删除用户所拥有的患者标签接口
  delUserTag: function (data, success, fail) {
    var url = '/tag/v1/deleteById';
    return apiPost(url, data, success, fail);
  },
  //添加用户所拥有的患者标签接口
  addUserTag: function (data, success, fail) {
    var url = '/tag/v1/add';
    return apiPost(url, data, success, fail);
  },
  //根据ID查询干预模板接口
  queryById: function (data, success, fail) {
    var url = '/template/intervention/v1/queryById';
    return apiGet(url, data, success, fail);
  },
  //根据ID查询健康干预接口
  queryByinte: function (data, success, fail) {
    var url = '/intervention/v1/queryById';
    return apiGet(url, data, success, fail);
  },
  //根据ID查询干预模板接口
  queByOrganId: function (data, success, fail) {
    var url = '/user/v1/queryListByOrganizationId';
    return apiGet(url, data, success, fail);
  },
  //首页接口:获取今日数据
  queryUserTodayCustomerCount: function (data, success, fail) {
    var url = '/statistics/v1/queryUserTodayCustomerCount'
    return apiGet(url, data, success, fail);
  },
  //统计接口
  customerIndex: function (data, success, fail) {
    var url = '/stat/v1/hospital/total'
    return apiPost(url, data, success, fail);
  },
  // 根据日期获取机构统计数据
  OrgStatisticByDay(data, success, fail) {
    var url = '/stat/v1/hospital/hospitalTotalStatToTitle';
    return apiPost(url, data, success, fail);
  },
  //统计 详细数据
  detailData: function (data, success, fail) {
    var url = '/stat/v1/hospital/hospitalTotalStatListToOrganName';
    return apiPost(url, data, success, fail);
  },
  //用户糖尿病类型占比
  userSugarType: function (data, success, fail) {
    var url = '/stat/v1/querySugerPatientTypeRate';
    return apiGet(url, data, success, fail);
  },
  //性别比例
  sexProp: function (data, success, fail) {
    var url = '/stat/v1/querySexDistribution';
    return apiGet(url, data, success, fail);
  },
  //用户年龄段分布
  userYearType: function (data, success, fail) {
    var url = '/stat/v1/queryAgeDistribution'
    return apiGet(url, data, success, fail);
  },
  //干预接口
  intervention: function (data, success, fail) {
    var url = '/user/customer/queryTodayInterventionList';
    return apiGet(url, data, success, fail);
  },
  //随访模板
  followUp: function (data, success, fail) {
    var url = '/user/customer/queryTodayFollowUpList';
    return apiGet(url, data, success, fail);
  },
  //机构信息
  organizationId: function (data, success, fail) {
    var url = '/organization/v1/queryById';
    return apiGet(url, data, success, fail);
  },
  //修改机构
  updateOrganization: function (data, success, fail) {
    var url = '/organization/v1/updateById';
    return apiPost(url, data, success, fail);
  },
  //获取科室列表——系统页(可带关键字查询)
  getDepartmentList: function (data, success, fail) {
    var url = '/department/v1/pagedQueryList';
    return apiGet(url, data, success, fail);
  },
  //获取科室列表：管理员新增患者 (无关键字)
  queryDepartmentList: function (data, success, fail) {
    var url = '/department/v1/queryDepartmentList';
    return apiGet(url, data, success, fail);
  },
  //新增科室
  addorg: function (data, success, fail) {
    var url = '/department/v1/add';
    return apiPost(url, data, success, fail)
  },
  //编辑科室
  changOrg: function (data, success, fail) {
    var url = '/department/v1/updateById';
    return apiPost(url, data, success, fail);
  },
  //删除科室
  deleteById: function (data, success, fail) {
    var url = '/department/v1/deleteById';
    return apiGet(url, data, success, fail);
  },
  //获取用户角色列表
  getRoleList: function (data, success, fail) {
    //var url = '/role/v1/pagedQueryList';
    var url = '/role/v1/queryList';
    return apiGet(url, data, success, fail);
  },
  //新增角色
  addRole: function (data, success, fail) {
    var url = '/role/v1/add';
    return apiPost(url, data, success, fail);
  },
  //编辑角色
  changeRole: function (data, success, fail) {
    var url = '/role/v1/updateById';
    return apiPost(url, data, success, fail);
  },
  //删除角色
  delRoleApi: function (data, success, fail) {
    var url = '/role/v1/deleteById';
    return apiPost(url, data, success, fail);
  },
  //角色详情
  roleById: function (data, success, fail) {
    var url = '/role/v1/queryById';
    return apiGet(url, data, success, fail);
  },
  //搜索员工
  searchUser: function (data, success, fail) {
    var url = '/user/v1/pagedQueryList';
    return apiGet(url, data, success, fail);
  },
  /*
  //新增员工
  addUser: function (data, success, fail) {
    var url = '/user/v1/add';
    return apiPost(url, data, success, fail);
  },
  //编辑员工
  changeUser: function (data, success, fail) {
    var url = '/user/v1/updateInfoById';
    return apiPost(url, data, success, fail);
  },
  */
  //新增/编辑员工保存提交
  saveUser: function (data, success, fail) {
    var url = '/user/v1/save';
    return apiPost(url, data, success, fail);
  },
  //修改员工密码
  changePass: function (data, success, fail) {
    var url = '/user/v1/updateById';
    return apiPost(url, data, success, fail);
  },
  //机构管理修改密码
  updatePassword: function (data, success, fail) {
    var url = '/userAuth/v1/updatePassword';
    return apiPost(url, data, success, fail);
  },
  //修改当前用户密码
  userChangePassword: function (data, success, fail) {
    var url = '/userAuth/v1/updatePersonalPassword';
    return apiPost(url, data, success, fail);
  },
  //删除员工
  deleUser: function (data, success, fail) {
    var url = '/user/v1/deleteById';
    return apiPost(url, data, success, fail);
  },
  //通过Id查询用户
  queryByIdUser: function (data, success, fail) {
    var url = '/user/v1/queryById';
    return apiGet(url, data, success, fail);
  },
  //字典模块
  dictionary: function (data, success, fail) {
    var url = '/dictionary/type/v1/queryList';
    return apiGet(url, data, success, fail);
  },
  //新增字典
  addDictionary: function (data, success, fail) {
    var url = '/dictionary/item/v1/add';
    return apiPost(url, data, success, fail);
  },
  //编辑字典
  updataDictionary: function (data, success, fail) {
    var url = '/dictionary/item/v1/updateById';
    return apiPost(url, data, success, fail);
  },
  //删除字典
  deleDictionary: function (data, success, fail) {
    var url = '/dictionary/item/v1/deleteById';
    return apiPost(url, data, success, fail);
  },
  /*模板管理*/
  //干预模板列表
  interventionTemplate: function (data, success, fail) {
    var url = '/template/intervention/v1/queryUserInterventionTemplate';
    return apiGet(url, data, success, fail);
  },
  //编辑干预模板
  editInterTemplate: function (data, success, fail) {
    var url = '/template/intervention/v1/edit';
    return apiPost(url, data, success, fail);
  },
  //删除干预模板
  deleteInterTemp: function (data, success, fail) {
    var url = '/template/intervention/v1/deleteById';
    return apiPost(url, data, success, fail);
  },
  //搜索干预模板列表接口
  //随访列表
  followUpTemplate: function (data, success, fail) {
    var url = '/template/followUp/queryUserFollowUpTemplate';
    return apiGet(url, data, success, fail);
  },
  //新增随访模板
  addfollowUp: function (data, success, fail) {
    var url = '/template/followUp/add';
    return apiPost(url, data, success, fail);
  },
  //编辑随访模板
  editFollowUpTemp: function (data, success, fail) {
    var url = '/template/followUp/edit';
    return apiPost(url, data, success, fail);
  },
  //删除随访模板
  deleteFollowUpTemp: function (data, success, fail) {
    var url = '/template/followUp/deleteById';
    return apiPost(url, data, success, fail);
  },
  /************权限***********/
  // 菜单列表
  resourceMenu: function (data, success, fail) {
    var url = '/resourceMenu/v1/pagedQueryList';
    return apiGet(url, data, success, fail);
  },
  //  角色——菜单列表
  queryRoleAuthorizeTree: function (data, success, fail) {
    var url = '/resourceMenu/v1/queryRoleAuthorizeTree';
    return apiGet(url, data, success, fail);
  },
  //血糖数据打印
  countCustomerSugerInfoPrint: function (data, success, fail) {
    var url = '/statistics/v1/countCustomerSugerInfoPrint';
    return apiGet(url, data, success, fail);
  },

  //干预、提醒后缀设置
  queryByOrganizationId: function (data, success, fail) {
    var url = '/templatePostfix/v1/queryByOrganizationId';
    return apiGet(url, data, success, fail);
  },

  //干预、提醒后缀设置 修改电话地址接口
  modifyRemind: function (data, success, fail) {
    var url = '/templatePostfix/v1/updateById ';
    return apiPost(url, data, success, fail);
  },

  //  饼图趋势图
  countCustomerSugerInfo: function (data, success, fail) {
    var url = '/statistics/v1/countCustomerSugerInfo';
    return apiGet(url, data, success, fail);
  },
  //  时段字典
  querySugarDictionaryList: function (data, success, fail) {
    // var url = '/dictionary/item/v1/querySugarDictionaryList';
    var url = '/sugar/dictionary/v1/queryList';
    return apiGet(url, data, success, fail);
  },
  //  手动添加血糖
  addSugarTest: function (data, success, fail) {
    var url = '/user/customer/addSugarTest';
    return apiPost(url, data, success, fail);
  },
  //   表格信息
  countCustomerSugerTableInfo: function (data, success, fail) {
    var url = '/statistics/v1/countCustomerSugerTableInfo';
    return apiGet(url, data, success, fail);
  },
  //   测量数据
  pagedQuerySugerTestList: function (data, success, fail) {
    var url = 'statistics/v1/pagedQuerySugerTestList';
    return apiGet(url, data, success, fail);
  },
  //新增机构
  addOrganization: function (data, success, fail) {
    var url = '/organization/v1/add';
    return apiPost(url, data, success, fail);
  },
  //子机构列表
  queryChildList: function (data, success, fail) {
    var url = '/organization/v1/queryChildList';
    return apiGet(url, data, success, fail);
  },
  //血糖参数范围设置列表
  sugarQueryList: function (data, success, fail) {
    var url = '/sugar/dictionary/v1/queryList'
    return apiGet(url, data, success, fail)
  },
  //编辑血糖参数范围设置
  editSugerScope: function (data, success, fail) {
    var url = '/sugar/dictionary/v1/updateById'
    return apiPost(url, data, success, fail)
  },
  //血糖偏高，偏低患者分页查询
  pagedQuerySugerHighLowCustomerList: function (data, success, fail) {
    var url = '/statistics/v1/pagedQuerySugerHighLowCustomerList';
    return apiGet(url, data, success, fail);
  },
  queryOrganAndCustomerCountList: function (data, success, fail) {
    var url = '/organization/v1/queryOrganAndCustomerCountList';
    return apiGet(url, data, success, fail);
  },
  // 批量随访
  addBatchFollow: function (data, success, fail) {
    var url = '/follow/up/v1/batchAdd';
    return apiPost(url, data, success, fail);
  },
  // 批量随访(全部患者)
  followUpAll: function (data, success, fail) {
    var url = '/follow/up/v1/followUpAll';
    return apiPost(url, data, success, fail);
  },
  // 7天未测量总数
  getWeekNoGaugedCount: function (data, success, fail) {
    var url = '/statistics/v1/querySevenDayNoTestCustomerCount';
    return apiGet(url, data, success, fail);
  },
  // 获取用户血糖预警设置
  getSugarWarningSet: function (data, success, fail) {
    var url = '/sugar/abnormal/info/queryByScope';
    return apiGet(url, data, success, fail);
  },
  // 设置血糖预警阀值
  setSugarWarningValue: function (data, success, fail) {
    var url = '/sugar/abnormal/info/add';
    return apiPost(url, data, success, fail);
  },
  // 获取血糖预警数据列表
  getSugarWarningDataList: function (data, success, fail) {
    var url = '/sugar/abnormal/warning/pagedQueryList';
    return apiGet(url, data, success, fail);
  },
  signSugarWarningReaded: function (data, success, fail) {
    var url = '/sugar/abnormal/warning/signWarning';
    return apiPost(url, data, success, fail);
  },
  signAllReaded: function (data, success, fail) {
    var url = '/sugar/abnormal/warning/signAll';
    return apiPost(url, data, success, fail);
  },

  deletePatientById: function (data, success, fail) {
    var url = '/user/customer/deleteCustomerByIds';
    return apiPost(url, data, success, fail);
  },
  //血糖数据备注
  getSugarTestByTestId: function (data, success, fail) {
    var url = '/statistics/v1/getSugarTagGroupByTestId';
    return apiGet(url, data, success, fail);
  },
  //首页所有患者数统计
  queryCustomerCount: function (data, success, fail) {
    var url = '/statistics/v1/queryCustomerCount';
    return apiGet(url, data, success, fail);
  },
  //获取服务医生、教育护士
  queryUserList: function (data, success, fail) {
    //var url = '/user/v1/queryListByDepartmentId';
    var url = '/user/v1/queryUserList';
    return apiGet(url, data, success, fail);
  },
  //修改患者的服务医生、教育护士
  updateByDoctor: function (data, success, fail) {
    var url = '/user/customer/updateByDoctor';
    return apiPost(url, data, success, fail);
  },
  //删除员工时的修改医生护士
  updateByDoctorByUserIds: function (data, success, fail) {
    var url = '/user/customer/updateByDoctorByUserIds';
    return apiPost(url, data, success, fail);
  },
  //根据用户获取患者
  queryListByUserId: function (data, success, fail) {
    var url = '/user/customer/queryListByUserId';
    return apiGet(url, data, success, fail);
  },
  //患者页面：获取全选后的患者
  queryListToCustomerId: function (data, success, fail) {
    var url = '/user/customer/queryListToCustomerId';
    return apiGet(url, data, success, fail);
  },
  //高低血糖页面：获取全选后的患者
  querySugerHighLowCustomerListToCustomerId: function (data, success, fail) {
    var url = '/statistics/v1/querySugerHighLowCustomerListToCustomerId';
    return apiGet(url, data, success, fail);
  },
  //数据页面：获取全选后的患者
  querySugerTestListToCustomerId: function (data, success, fail) {
    var url = '/statistics/v1/querySugerTestListToCustomerId';
    return apiGet(url, data, success, fail);
  },

};
