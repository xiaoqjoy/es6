import {aprAudApi} from './server';
const mixin = {
  data() {
    return {
      isPhoneCheckSave: true // 用于检测电核结论修改后是否保存
    };
  },
  methods: {
    openImagePlatform(urlDesc, readOnly = false, menuDesc) {
      // 2020-7-21 目前只支持审批审计的业务（加成贷不支持），预审批预审计不支持
      let str = '/readOnly';
      let menuIdMap = {
        approval: 'approvalAudit/approval/approval-pending-start',
        audit: 'approvalAudit/audit/audit-pending-start'
      };
      let menuId = readOnly ? menuIdMap[urlDesc] + str : menuIdMap[urlDesc];
      this.$showImage(this.applicationId, menuDesc, {menuId: menuId});
    },
    // 获取电核结论里面的配置
    getPhoneCheckConfig(type, code) {
      let codeList = code.split('|');
      let url = aprAudApi.operaConfig.replace('{configType}', 'phone_check_code');
      this.$MyFetch.get(url, {modifyInd: !this.isEdit}).then((data) => {
          this.riskResult = data;
          let needToGetOld = false;
          let list = [];
          for (let i = 0; i < codeList.length; i++) {
            let res = this.$mathPath(codeList[i], data);
            if (!res) {
              needToGetOld = !res;
              break;
            }
            list.push(res);
          }
          this.aprPhoneCheckInfo.decisionCode = list;
          // 不可编辑页面匹配不到的时候需要取请求旧配置
          if (needToGetOld && this.isEdit && code !== '') {
            this.getOldPhoneCheckConfig(type, code);
          }
        }).catch(err => {
          this.$error(err.message);
        });
    },
    getOldPhoneCheckConfig(type, code) {
      let codeList = code.split('|');
      let configType = "phone_check_code_self_employed";
      if (type !== '060') {
        configType = "phone_check_code_salary";
      }
      let url = aprAudApi.operaConfig.replace('{configType}', configType);
      this.$MyFetch.get(url).then((data) => {
          this.riskResult = data;
          let list = codeList.map(_item => {
            return this.$mathPath(_item, data);
          });
          this.aprPhoneCheckInfo.decisionCode = list;
        }).catch(err => {
          this.$error(err.message);
        });
    },
    checkPhoneCheckDecision() {
      // 获取所选的一级维度合集
      let level1 = this.aprPhoneCheckInfo.decisionCode.map(item => item[0]);
      // 获取所选二级维度合集
      let level2 = this.aprPhoneCheckInfo.decisionCode.map(item => item[1]);
      let level3 = this.aprPhoneCheckInfo.decisionCode.map(item => item[item.length - 1]);
      // 去重并简单排序
      level1 = [...new Set(level1)].sort();
      level2 = [...new Set(level2)].sort();
      level3 = [...new Set(level3)].sort();
      let level1Str = level1.join('');
      let level3Str = level3.join('');
      let level2Str = level2.join('');
      let combinationListLevel1 = this.getCombination(level1);
      let combinationListLevel3 = this.getCombination(['A01_01', 'A02_01', 'A03_01']);
      let combinationListLevel2Four = this.getCombination(['C03', 'C04']);
      // 维度大类A、B、C三类不能同时勾选。
      const A = this.checkRepetition(level1Str, combinationListLevel1);
      // A类：A01_01、A02_01、A03_01不能同时勾选。
      const B = this.checkRepetition(level3Str, combinationListLevel3);
      // C类：二级分类C03与C04不能同时勾选。
      const C = this.checkRepetition(level2Str, combinationListLevel2Four);
      // C类：二级分类C01与C02、C03、C04、C05、C06、C07不能同时勾选。
      const D = this.checkLevelC01(level2Str);
      console.log(A, B, C, D);
      return (A || B || C || D);
    },
    // 获取list中的组合
    getCombination(list) {
      let str = [];
      for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
          str.push(list[i] + list[j]);
        }
      }
      return str;
    },
    checkRepetition(str, list) {
      let repetition = false;
      for (let i = 0; i < list.length; i++) {
        if (str.includes(list[i])) {
          repetition = true;
          break;
        }
      }
      return repetition;
    },
    // 检测
    checkLevelC01(str) {
      if (!str.includes('C01')) return false;
      let list = ['C02', 'C03', 'C04', 'C05', 'C06', 'C07'];
      for (let i = 0; i < list.length; i++) {
        if (str.includes(list[i])) return true;
      }
      return false;
    },
    changePhoneCheck(_data) {
      this.isPhoneCheckSave = false;
    }
  },
  computed: {
    opnionCode: function () {
      let msgMap = {
        P: "建议通过",
        D: "建议否决",
        R: '建议谨慎'
      };
      if (this.phoneCheckConclusion.opnionCode) {
        return msgMap[this.phoneCheckConclusion.opnionCode];
      }
      return msgMap.R;
    }
  }
};

// checkPhoneCheckDecision() {
//   // let data = this.aprPhoneCheckInfo.decisionCode.map(group => group[group.length - 1]).join('|');
// }
export default mixin;
