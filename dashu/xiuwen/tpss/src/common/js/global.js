import {
  MessageBox
} from 'element-ui';
import MyFetch from './myFetch';
import {codeDependent} from '@common/js/localStorage';
import {
  baseApi
} from './server';
import router from '@/router/index';

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
        MessageBox.confirm(msg, "", {
            confirmButtonText: "确定",
            cancelButtonText: '',
            showCancelButton: false,
            type,
            // center: true,
            showClose: false
          })
          .then(() => {})
          .catch(() => {});
      }
    };

    // 获取省市区
    Vue.prototype.getArea = () => {
      const data = {
        categoryCode: "area_code" // 必传
      };
      return new Promise((resolve, reject) => {
        MyFetch
          .get(baseApi.areaSelection, data)
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
    Vue.prototype.getAddressArr = (code = '', options = []) => {
      let arr = [];
      options.forEach((p) => {
        let currentArr = [p.value];
        if (p.value === code) {
          arr = [...currentArr];
        } else if (p.children) {
          p.children.forEach((c) => {
            currentArr[1] = c.value;
            if (c.value === code) {
              arr = [...currentArr];
            } else if (c.children) {
              c.children.forEach((a) => {
                currentArr[2] = a.value;
                if (a.value === code) {
                  arr = [...currentArr];
                }
              });
            }
          });
        }
      });
      return arr;
    };
    // 根据地址编码返回地址
    Vue.prototype.getAddressStr = (code = '', options = []) => {
      let str = '';
      let arr = [];
      options.forEach((p) => {
        let currentArr = [p.label];
        if (p.value === code) {
          arr = [...currentArr];
        } else if (p.children) {
          p.children.forEach((c) => {
            currentArr[1] = c.label;
            if (c.value === code) {
              arr = [...currentArr];
            } else if (c.children) {
              c.children.forEach((a) => {
                currentArr[2] = a.label;
                if (a.value === code) {
                  arr = [...currentArr];
                }
              });
            }
          });
        }
      });
      str = arr.join('/');
      return str;
    };

    Vue.prototype.$getDictCode = (categoryCode) => {
      const data = {
        categoryCode // 必传，根据字典表code说明
      };
      return new Promise((resolve, reject) => {
        MyFetch
          .get(baseApi.dictSelection, data)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    };

    // 弹出影像平台（applicationId：申请编号，menuDesc：菜单编码，imageUrl：影像上传成功回调的影像平台提交接口（可选），parameterData：接口参数（可选）,
    // ReadOnly：影像是否只读'0':只读，'':可编辑（可选））,selectProductId 为选择的产品id，每个产品只能看它自身
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
      // console.log(router);
      let path = router.history.current.path;
      let pathArr = path.split('/');
      pathArr.splice(0, 2);
      if (pathArr) {
        pathArr[pathArr.length - 1] = pathArr[pathArr.length - 1].split("?")[0];
      }
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
      window.open(href.href, '_blank', `width=${window.screen.availWidth},height=${window.screen.availHeight},resizable=yes,scrollbars=yes,left=0,top=0`);
    };
    // 获取征信报告URL（pageNume:模块编码(柜面面签:counterF2F,远程面签:remoteF2F,审批审计:apraud)，applicationId:申请编号）
    Vue.prototype.$getCreditReport = (pageName, applicationId) => {
      // applicationId = 'RL791331506374311936';
      const data = `${baseApi.getCreditReport}${pageName}/${applicationId}/url`;
      // console.log(data);
      return new Promise((resolve, reject) => {
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
            resolve(res);
          })
          .catch(err => {
            reject(err);
            Vue.prototype.confirmFn(err.message, 'error');
          });
      });
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

    Vue.prototype.$error = (msg) => {
      return Vue.prototype.confirmFn(msg, 'error');
    };

    /**
     * 自动补全数字小数函数
     * @param {string, number} _value 想要转换的数字
     * @param {number} _length 保留几位小数
     * @param {Bloon} _empty 是否允许返回空字符串，可选
     * @returns {string} 返回一个string
     */
    Vue.prototype.$returnFloat = (_value, _length, _empty) => {
      if (isNaN(Number(_value))) {
        throw new Error(`${_value} is not a number`);
      }
      if (_empty === true && _value === '') {
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
  }
};

export default global;
