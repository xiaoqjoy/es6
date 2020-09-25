import {
  MessageBox, Loading
} from 'element-ui';
import MyFetch from './myFetch';
import {
  baseApi
} from './server';
import router from '@/router/index';
import {codeDependent} from '@common/js/localStorage';
// import {
//   configApi
// } from "../../system/config-manager/js/server";
import { userInfo } from './localStorage';

// 获取中国省市区三级联级联选择器格式化
let getLocations = (locations) => {
  // console.log(locations);
  let regionOptions = [];
  for (let x of locations) {
    // 获取省份
    let city = [];
    if (x.children) {
      for (let y of x.children) {
        // 获取城市
        let area = [];
        if (y.children) {
          for (let z of y.children) {
            // 获取地区
            area.push({
              value: z.itemCode,
              label: z.itemDesc
            });
          }
          // 有地区
          city.push({
            value: y.itemCode,
            label: y.itemDesc,
            children: area
          });
        } else {
          // 无地区
          city.push({
            value: y.itemCode,
            label: y.itemDesc
          });
        }
      }
      // 有市级
      regionOptions.push({
        value: x.itemCode,
        label: x.itemDesc,
        children: city
      });
    } else {
      // 无市级
      regionOptions.push({
        value: x.itemCode,
        label: x.itemDesc
      });
    }
  }
  return regionOptions;
};
// eslint-disable-next-line
Date.prototype.normalizeTime = function (option = {}) {
  let obj = {};
  // console.log(this);

  let expectFormat = {};
  obj.format = option.format ? option.format : "/";
  let Y = this.getFullYear();
  let M = (this.getMonth() + 1 < 10 ? '0' + (this.getMonth() + 1) : this.getMonth() + 1);
  // let D = this.getDate() + ' ';
  let D = (this.getDate() < 10 ? '0' + (this.getDate()) : this.getDate());
  let h = ((this.getHours() < 10) ? ('0' + this.getHours()) : this.getHours());
  let m = ((this.getMinutes() < 10) ? ('0' + this.getMinutes()) : this.getMinutes());
  let s = ((this.getSeconds() < 10) ? ('0' + this.getSeconds()) : this.getSeconds());
  let time = this.valueOf();
  expectFormat.time = time; // 返回时间戳
  expectFormat.strDate = Y + obj.format + M + obj.format + D; // 返回年份
  expectFormat.strTime = Y + obj.format + M + obj.format + D + obj.format + ' ' + h + ':' + m + ':' + s; // 返回年月日时
  expectFormat.strTime1 = `${Y}${M}${D}`; // 返回年月日数字形式
  expectFormat.objDate = {
    Y: Y,
    M: M,
    D: D,
    h: h,
    m: m,
    s: s
  };
  return expectFormat;
};

let global = {
  install(Vue, options) {
    // 是否是中台管理岗
    Vue.prototype.isCpms_r_manager_0003 = false;

    Vue.prototype.cpms_r_manager_0003Change = (userInfo) => {
      if (userInfo) {
        let role = JSON.parse(userInfo).role;
        if (role) {
          Vue.prototype.isCpms_r_manager_0003 = role.some(v => {
            return v.roleId === 'cpms_r_manager_0003';
          });
          console.log('是否是中台管理岗：', Vue.prototype.isCpms_r_manager_0003);
        }
      }
    };
    Vue.prototype.cpms_r_manager_0003Change(userInfo.getUserInfo());

    // 弹出提示（参数说明：msg：提示信息，类型type：失败为'error'，是否继续操作为'warning'，成功为'success'，showCancelButton：是否显示取消按钮）
    Vue.prototype.confirmFn = (msg, type = 'info', showCancelButton = true) => {
      if (type === 'warning') {
        return new Promise((resolve, reject) => {
          MessageBox.confirm(msg, "", {
              confirmButtonText: "确认",
              cancelButtonText: '取消',
              showCancelButton,
              type,
              // center: true,
              showClose: false,
              dangerouslyUseHTMLString: true
            })
            .then(() => {
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        });
      } else {
        return new Promise((resolve, reject) => {
          MessageBox.confirm(msg, "", {
              confirmButtonText: "确定",
              cancelButtonText: '',
              showCancelButton: false,
              type,
              // center: true,
              showClose: false
            })
            .then(() => {
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
          });
        }
    };

    Vue.prototype.$error = (msg) => {
      return Vue.prototype.confirmFn(msg, 'error');
    };

    // 获取省市区
    Vue.prototype.getArea = (obj) => {
      let getAll = (obj && obj.getAll) ? obj.getAll : false;
      const data = {
        categoryCode: "area_code", // 必传
        getAll
      };
      return new Promise((resolve, reject) => {
        MyFetch
          .get(baseApi.allSelection, data)
          .then(res => {
            // 获取中国省市区三级联级联选择器格式化
            resolve(getLocations(res));
          })
          .catch(err => {
            reject(err);
          });
      });
    };
    // 根据最后一位地区编码返回数组 code 后端返回的字符, option地区字典
    Vue.prototype.getAddressArr = (code = '', library = []) => {
      let arr = [];
      let hasFind = false;
      let findFn = function(code, data) {
        if (hasFind) return;
        arr.push(data.value);
        if (code === data.value) {
          hasFind = true;
        } else if (!data.children) {
          arr.splice(arr.length - 1, 1);
        } else {
          data.children.forEach((v, index) => {
            findFn(code, v);
            if (index === (data.children.length - 1) && !hasFind) {
              arr.splice(arr.length - 1, 1);
            }
          });
        }
      };
      library.forEach(v => {
        if (hasFind) return;
        findFn(code, v);
      });
      return arr;
    };
    // 根据地址编码返回地址
    Vue.prototype.getAddressStr = (code = '', library = []) => {
      let arr = [];
      let hasFind = false;
      let findFn = function(code, data) {
        if (hasFind) return;
        arr.push(data.label);
        if (code === data.value) {
          hasFind = true;
        } else if (!data.children) {
          arr.splice(arr.length - 1, 1);
        } else {
          data.children.forEach((v, index) => {
            findFn(code, v);
            if (index === (data.children.length - 1) && !hasFind) {
              arr.splice(arr.length - 1, 1);
            }
          });
        }
      };
      library.forEach(v => {
        if (hasFind) return;
        findFn(code, v);
      });
      return arr.join('/');
    };
    // 获取码值依赖
    Vue.prototype.$getCodeDependentApi = () => {
      return new Promise((resolve, reject) => {
        MyFetch.get(baseApi.codeDependent)
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    };
    Vue.prototype.$getCodeDependent = () => {
      return JSON.parse(codeDependent.getCodeDependent());
    };

    // 获取字典表  obj为一个对象,getAll选填
    Vue.prototype.$getDictCode = (categoryCode, obj) => {
      let getAll = (obj && obj.getAll) ? obj.getAll : false;
      const data = {
        categoryCode, // 必传，根据字典表code说明
        getAll // 选填，获取历史数据的，还是当前的
      };
      return new Promise((resolve, reject) => {
        MyFetch
          .get(baseApi.allSelection, data)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    };
    // 获取特殊字段产品字典公共接口：获取借款人行业名称（industryCode），获取贷款用途（loanPurposeCode），获取贷款期限（loanTerm）
    Vue.prototype.$getOrgSpecial = (orgSpecialCode, applicationId, productId) => {
      return new Promise((resolve, reject) => {
        const url = `${baseApi.getOrgSpecial}${orgSpecialCode}/${applicationId}/${productId}`;
        MyFetch
          .get(url)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            Vue.prototype.confirmFn(err.message, 'error');
            reject(err);
          });
      });
    };

    // 弹出影像平台（applicationId：申请编号，menuDesc：菜单编码，imageUrl：影像上传成功回调的影像平台提交接口（可选），parameterData：接口参数（可选）,
    // ReadOnly：影像是否只读'0':只读，'':可编辑（可选））
    Vue.prototype.$showImage = (applicationId, menuDesc, {ReadOnly = '', selectProductId = undefined, productId = undefined, menuId = undefined} = {}) => {
      if (!applicationId) {
        Vue.prototype.confirmFn('申请编号不能为空', 'error');
        return;
      }
      if (!menuDesc) {
        Vue.prototype.confirmFn('菜单编码不能为空', 'error');
        return;
      }
      ReadOnly = ReadOnly || '';
      // console.log(router.history.current.path);
      let path = router.history.current.path;
      let pathArr = path.split('/');
      pathArr.splice(0, 2);
      // console.log(pathArr);
      if (pathArr) {
        pathArr[pathArr.length - 1] = pathArr[pathArr.length - 1].split("?")[0];
      }
      // console.log(pathArr);
      // 柜面，远程，柜面面签业务查询，远程面签业务查询添加了子路由，特殊处理
      if (pathArr.length >= 3 && (pathArr[0].indexOf("face2face") > -1 || pathArr[0].indexOf("manager") > -1)) {
        pathArr.splice(2, 1);
      }
      console.log(pathArr);

      // let path1 = pathArr[pathArr.length - 2];
      // let path2 = pathArr[pathArr.length - 1];
      if (!menuId) {
        menuId = pathArr.join('/');
      }
      // console.log(menuId, 'url');
      // parameterData = JSON.stringify(parameterData);

      let href = router.resolve({
        name: 'image',
        query: {applicationId, menuDesc, menuId, ReadOnly, productId, selectProductId}
      });
      // console.log(window.screen.width, window.screen.height);
      window.open(href.href, '_blank', `width=${window.screen.availWidth},height=${window.screen.availHeight},resizable=yes,scrollbars=yes,left=0,top=0`);
    };

    // 查询贷款申请征信报告编码
    Vue.prototype.$getCreditId = (applicationId) => {
      return new Promise((resolve, reject) => {
        MyFetch
          .get(`${baseApi.getCreditId}${applicationId}/id`)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            console.error(err);
            Vue.prototype.confirmFn(err.message, 'error');
          });
      });
    };

    // 获取征信报告URL（pageNume:模块编码(柜面面签:counterF2F,远程面签:remoteF2F,审批审计:apraud,调查：survey)，creditReportId:报告编号）
    Vue.prototype.$getCreditReport = (pageName, applicationId, obj) => {
      return new Promise(async (resolve, reject) => {
        // console.log('征信报告参数：', pageName, applicationId, obj);
        if (!pageName) {
          Vue.prototype.confirmFn('模块编码不能为空', 'error');
          return;
        }
        let creditReportId = "";
        if (obj && obj.creditReportId) {
          creditReportId = obj.creditReportId;
        } else {
          creditReportId = await Vue.prototype.$getCreditId(applicationId);
        }
        if (!creditReportId) {
          Vue.prototype.confirmFn('征信报告不存在！', 'error');
          return;
        }
        const data = `${baseApi.getCreditReport}${pageName}/${creditReportId}`;
        let loading = Loading.service({
          text: "",
          spinner: "",
          background: "transparent"
        });
        MyFetch
          .get(data)
          .then(res => {
            // let img = new Image();
            // img.src = res;
            // // 图片加载成功
            // img.onload = () => {
            //   resolve(res);
            // };
            // // 图片加载失败
            // img.onerror = (err) => {
            //   console.error(err);
            //   Vue.prototype.confirmFn('征信报告加载异常');
            // };
            loading.close();
            resolve(res);
          })
          .catch(err => {
            console.error(err);
            loading.close();
            Vue.prototype.confirmFn(err.message, 'error');
          });
      });
    };

    // 提示需要使用IE11浏览器
    // Vue.prototype.$useIE11Fn = () => {
    //   if (process.env.NODE_ENV === 'production') {
    //     if (!(navigator.userAgent.indexOf(".NET") > -1 && navigator.userAgent.indexOf("NT 10.0") > -1)) {
    //       Vue.prototype.confirmFn('请使用IE11浏览器，否则叫号，录像，影像平台等功能无法使用', 'error');
    //     }
    //   }
    // };

    // 是否获取到mac地址和ip地址 废弃函数，不再使用
    Vue.prototype.$macipFn = (_that) => {
      // 调用$getMac函数获取Mac地址，具体使用请看getMac函数
      Vue.prototype.$getMac(_that);
      if ((navigator.userAgent.indexOf(".NET") > -1 && navigator.userAgent.indexOf("NT 10.0") > -1)) {
        // 不从缓存获取mac地址
        // 用前先销毁上一个eventBus
        // window.eventBus.$off('getMac');
        // window.eventBus.$on('getMac', (_mac) => {
        //   console.log(`from global---${_mac}`);
        //   if (!_mac) {
        //     Vue.prototype.confirmFn('获取mac地址失败，请刷新重试或使用IE11浏览器', 'warning').then(() => {
        //       location.reload();
        //     }).catch(() => {
        //       location.reload();
        //     });
        //   }
        // });
      }
    };

    // 下载文件（fileInfo：包含data：blob文件，filename：文件名）
    Vue.prototype.$download = (fileInfo) => {
      // console.log(fileInfo);
      if ("msSaveBlob" in navigator) {
        window.navigator.msSaveBlob(fileInfo.data, fileInfo.filename);
      } else if ("download" in document.createElement("a")) {
        if (!fileInfo.data) {
          return;
        }
        let url = window.URL.createObjectURL(new Blob([fileInfo.data]));
        // console.log(url);
        let link = document.createElement("a");
        link.style.display = "none";
        link.href = url;
        link.setAttribute("download", fileInfo.filename);
        document.body.appendChild(link);
        link.click();
      }
    };

    Vue.prototype.$saveFile = (res) => {
      let filenameStr;
      let disposition = res.headers["content-disposition"];
      if (disposition) {
        filenameStr = decodeURIComponent(
          disposition.split("filename=")[1]
        );
      } else {
        filenameStr = new Date().normalizeTime().strTime1;
      }
      let filenameArr = filenameStr.split("");
      if (filenameArr[0] === '"') {
        filenameArr.shift();
      }
      if (filenameArr[filenameArr.length - 1] === '"') {
        filenameArr.pop();
      }
      let filename = filenameArr.join("");
      if ("msSaveBlob" in navigator) {
        window.navigator.msSaveBlob(res.data, filename);
      } else {
        let blob = res.data;
        let a = document.getElementById("exportLog");
        if (!a) {
          a = document.createElement("a");
          a.id = "exportLog";
          document.body.appendChild(a);
        }
        let url = window.URL.createObjectURL(blob);
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", false, false);
        a.href = url;
        a.download = filename;
        a.dispatchEvent(evt);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    };
    /**
     * 自动补全数字小数函数
     * @param {string, number} _value 想要转换的数字
     * @param {number} _length 保留几位小数
     * @param {bollon} _empty 允许返回空字符串，可选
     * @returns {string} 返回一个string
     */
    Vue.prototype.$returnFloat = (_value, _length, _empty = false) => {
      if (isNaN(Number(_value))) {
        throw new Error(`${_value} is not a number`);
      }
      if (_empty && _value === '') {
        return _value;
      }
      let f = Math.round(_value * Math.pow(10, _length)) / Math.pow(10, _length);
      let s = f.toString();
      let rs = s.indexOf('.');
      if (rs < 0) {
        s += '.';
      }
      for (let i = s.length - s.indexOf('.'); i <= _length; i++) {
        s += '0';
      }
      return s;
    };
    /**
     * @param {object} _that vue组件实例！！！
     * 使用此函数，必须在vue组件的data中申明并初始化sMacAddr属性！！！
     * @returns {undefined} 没有返回值
     */
    Vue.prototype.$getMac = function(_that) {
      // 用于获取网卡MAC地址，每次调用这条函数都会获取一遍，注意:
      // 控件里为异步操作
      var userAgent = navigator.userAgent;
      // 将组件实例赋予全局变量;具体作用在index.html文件说明
      window.componentThis = _that;
      if (userAgent.indexOf(".NET") > -1 && userAgent.indexOf("NT 10.0") > -1) {
        // locator和foo 为ie active 控件，具体看index.html文件中<object>
        var service = locator.ConnectServer(); // eslint-disable-line
        service.Security_.ImpersonationLevel = 3;
        service.InstancesOfAsync(foo, "Win32_NetworkAdapterConfiguration"); // eslint-disable-line
      }
    };
    // // 检查是否有新增或者修改接口
    // Vue.prototype.examine = (param) => {
    //   let url = `${
    //   configApi.levelone_checkModify
    // }/${param}/checkModify`;
    //   return new Promise((resolve, reject) => {
    //     MyFetch
    //       .get(url)
    //       .then((res = {}) => {
    //         resolve(res);
    //       })
    //       .catch(err => {
    //         reject(err);
    //       });
    //   });
    // };

    // // 撤销保存接口
    // Vue.prototype.annul = (param) => {
    //   let url = `${
    //   configApi.operationConfig_revokeSave
    // }/${param}/revokeSave`;
    //   return new Promise((resolve, reject) => {
    //     MyFetch
    //       .post(url)
    //       .then((res = {}) => {
    //         resolve(res);
    //       })
    //       .catch(err => {
    //         reject(err);
    //       });
    //   });
    // };
  }
};

export default global;
