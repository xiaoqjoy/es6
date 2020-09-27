<template>
  <div id="insurance-table" class="dialog__table-box">
    <div class="table-form-box">
      <ul class="table__box table_box1">
        <li class="table__head">
          <ul class="table__tr">
            <li class="table__th" v-for="item in policyColList" :key="item.pops">{{item.label}}</li>
            <li class="table__th" v-if="!isDetail&&!ydApproveMode2">操作</li>
          </ul>
        </li>
        <li class="table__body">
          <div class="table__tr" v-for="(item, index) in policyList" :key="item.id">
            <ul class="table__tr__top-list" v-show="!item.showFormEle">
              <li class="table__td">{{policyCompanyName(item.insuranceCompanyCode)}}</li>
              <li class="table__td" :title="item.mainRiskName">{{item.mainRiskName}}</li>
              <li class="table__td" :title="item.policyNum">{{item.policyNum}}</li>
              <li class="table__td">{{getTime(item.effectiveDate)}}</li>
              <li class="table__td">{{(item.policyStatusInd)?'有效': (item.policyStatusInd === null ? '' : '其他')}}</li>
              <li class="table__td">{{insPaymentModeCodeClass[item.paymentModeCode]}}</li>
              <li class="table__td">{{item.premiumCycleAmt}}元</li>
              <li class="table__td">{{item.premiumAnnualAmt}}元</li>
              <li class="table__td">{{item.premiumTermCnt}}</li>
              <li class="table__td">{{item.premiumTimesCnt}}</li>
              <li class="table__td">{{item.holderSwitchInd ? '是' : '否'}}</li>
              <li class="table__td">{{item.availableInd ? '是' : '否'}}</li>
              <li class="table__td" v-if="!isDetail&&!ydApproveMode2">
                <div class="operate-box">
                  <i class="icon el-icon-plus cursor__pointer"
                      v-show="index === (policyList.length-1) && !policyEditDg"
                    @click="openAddPolicy"></i>
                  <i class="icon el-icon-minus cursor__pointer" @click="deletePolicy(item.id)"></i>
                  <i class="icon icon__edit cursor__pointer" @click="editPolicyELe(item)"></i>
                </div>
              </li>
            </ul>
            <el-form :model="policyEdit"
                :rules="policyRule" :ref="'policyEditForm' + index"
                label-width="100px" class="demo-form-inline"
                label-position="top" v-if="item.showFormEle"
                :disabled="isDetail || !openVideo || ydApproveMode2">
              <div class="table__tr__bottom-list" >
                <el-form-item label="" prop="insuranceCompanyCode" class="table__form-item">
                  <el-select v-model="policyEdit.insuranceCompanyCode" placeholder="请选择">
                    <el-option v-for="(item) in policyCompanyList"
                      :label="item.itemDesc" :value="item.itemCode"
                      :key="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="" prop="mainRiskName" class="table__form-item">
                  <el-input v-model="policyEdit.mainRiskName"></el-input>
                </el-form-item>
                <el-form-item label="" prop="policyNum" class="table__form-item">
                  <el-input v-model="policyEdit.policyNum" maxlength="30"></el-input>
                </el-form-item>
                <el-form-item label="" prop="effectiveDate" class="table__form-item">
                  <el-date-picker
                    v-model="policyEdit.effectiveDate"
                    type="date" format="yyyy/MM/dd"
                    value-format="timestamp" placeholder="选择日期"
                    :editable="false">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="" prop="policyStatusInd" class="table__form-item">
                  <el-select v-model="policyEdit.policyStatusInd" placeholder="请选择">
                    <el-option label="有效" :value="true"></el-option>
                    <el-option label="其他" :value="false"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="" prop="paymentModeCode" class="table__form-item">
                  <el-select v-model="policyEdit.paymentModeCode" placeholder="请选择">
                    <el-option v-for="item in insPaymentModeCodeLibrary" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="" prop="premiumCycleAmt" class="table__form-item">
                  <el-input
                    @blur="formatMoney('policyEdit', 'premiumCycleAmt')"
                    v-model="policyEdit.premiumCycleAmt">
                  </el-input>
                </el-form-item>
                <el-form-item label="" class="table__form-item">
                  <el-input v-model="premiumAnnualAmt" readonly></el-input>
                </el-form-item>
                <el-form-item label="" prop="paymentTermCnt" class="table__form-item">
                  <el-input v-model="premiumTermCnt" readonly></el-input>
                </el-form-item>
                <el-form-item label="" prop="premiumTimesCnt" class="table__form-item">
                  <el-input v-model="policyEdit.premiumTimesCnt" maxlength="3"></el-input>
                </el-form-item>
                <el-form-item  class="table__form-item text__center">
                  <el-switch v-model="policyEdit.holderSwitchInd"
                    :width="50" :active-value="true"
                    :inactive-value="false"></el-switch>
                </el-form-item>
                <el-form-item class="table__form-item text__center">
                  <el-switch v-model="isPolicyEffective"
                    :width="50" :active-value="true"
                    :inactive-value="false"
                    disabled></el-switch>
                </el-form-item>
                <div class="operate-box text__center">
                  <i class="icon el-icon-check cursor__pointer" @click="saveEditPolicy('policyEditForm' + index, item)"></i>
                  <i class="icon el-icon-minus cursor__pointer" @click="closeEditPolicy(item)"></i>
                </div>
              </div>
            </el-form>
          </div>
        </li>
        <li class="table__body" v-if="policyList.length === 0 || policyEditDg">
          <div class="table__tr">
            <el-form :model="policyEdit"
                :rules="policyRule" ref="policyAddForm"
                label-width="100px" :disabled="isDetail || !openVideo || ydApproveMode2"
                class="demo-form-inline" label-position="top">
              <div class="table__tr__bottom-list" >
                <el-form-item label="" prop="insuranceCompanyCode" class="table__form-item">
                  <el-select v-model="policyEdit.insuranceCompanyCode" placeholder="请选择">
                    <el-option
                      v-for="(item) in policyCompanyList"
                      :label="item.itemDesc" :value="item.itemCode"
                      :key="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="" prop="mainRiskName" class="table__form-item">
                  <el-input v-model="policyEdit.mainRiskName"></el-input>
                </el-form-item>
                <el-form-item label="" prop="policyNum" class="table__form-item">
                  <el-input v-model="policyEdit.policyNum" maxlength="30"></el-input>
                </el-form-item>
                <el-form-item label="" prop="effectiveDate" class="table__form-item">
                  <el-date-picker
                    v-model="policyEdit.effectiveDate"
                    type="date" format="yyyy/MM/dd"
                    value-format="timestamp"
                    :editable="false" placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="" prop="policyStatusInd" class="table__form-item">
                  <el-select v-model="policyEdit.policyStatusInd" placeholder="请选择">
                    <el-option label="有效" :value="true"></el-option>
                    <el-option label="其他" :value="false"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="" prop="paymentModeCode" class="table__form-item">
                  <el-select v-model="policyEdit.paymentModeCode" placeholder="请选择">
                    <el-option v-for="item in insPaymentModeCodeLibrary" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="" prop="premiumCycleAmt" class="table__form-item">
                  <el-input @blur="formatMoney('policyEdit', 'premiumCycleAmt')"
                    v-model="policyEdit.premiumCycleAmt"
                    maxlength="8"></el-input>
                </el-form-item>
                <el-form-item label="" class="table__form-item">
                  <el-input v-model="premiumAnnualAmt" readonly></el-input>
                </el-form-item>
                <el-form-item label="" prop="paymentTermCnt" class="table__form-item">
                  <el-input v-model="premiumTermCnt" readonly></el-input>
                </el-form-item>
                <el-form-item label="" prop="premiumTimesCnt" class="table__form-item">
                  <el-input v-model="policyEdit.premiumTimesCnt" maxlength="3"></el-input>
                </el-form-item>
                <el-form-item  class="table__form-item text__center">
                  <el-switch v-model="policyEdit.holderSwitchInd"
                    :width="50" :active-value="true"
                    :inactive-value="false"></el-switch>
                </el-form-item>
                <el-form-item class="table__form-item text__center">
                  <el-switch v-model="isPolicyEffective"
                    :width="50" :active-value="true"
                    :inactive-value="false"
                    disabled></el-switch>
                </el-form-item>
                <div class="operate-box text__center" v-if="!isDetail&&!ydApproveMode2">
                  <i class="icon el-icon-check cursor__pointer" @click="addPolicy"></i>
                  <i class="icon el-icon-minus cursor__pointer" @click="closeAddPolicy"></i>
                </div>
              </div>
            </el-form>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {baseApi} from '@system/face2face/js/server';
import { policyRule } from '@system/face2face/js/mind';
const policyEdit = {
  applicationId: null,
  availableInd: true,
  createdBy: null,
  createdDate: null,
  effectiveDate: null,
  fromCrawlerInd: null,
  holderSwitchInd: false,
  id: null,
  insuranceCompanyCode: null,
  mainRiskName: null,
  maxEffectiveCode: null,
  paymentModeCode: null,
  paymentRecord: null,
  paymentTermCnt: null,
  policyNum: null,
  policyStatusInd: true,
  premiumAnnualAmt: null,
  premiumAnnualCode: null,
  premiumCycleAmt: null,
  premiumTermCnt: null,
  premiumTimesCnt: null,
  reinstatementInfo: null,
  showFormELe: false,
  updatedBy: null,
  updatedDate: null
};
const policyColList = [
  { label: '寿险公司', prop: 'companyName' },
  { label: '主险名称', prop: 'mainRiskName' },
  { label: '保单号', prop: 'policyNum' },
  { label: '生效日期', prop: 'effectiveDate' },
  { label: '保单状态', prop: 'policyStatusInd' },
  { label: '缴费方式', prop: 'insPaymentModeCodeClass' },
  { label: '期缴保费（元）', prop: 'premiumCycleAmt' },
  { label: '年缴保费（元）', prop: 'premiumAnnualAmt' },
  { label: '应缴次数', prop: 'premiumTermCnt' },
  { label: '缴费次数', prop: 'premiumTimesCnt' },
  { label: '两年内变更投保人', prop: 'holderSwitchInd' },
  { label: '保单是否有效', prop: 'availableInd' }
];
export default {
  name: 'insurance-table',
  props: {
    dictLib: {
      type: Object,
      default: () => ({})
    },
    isDetail: {
      type: Boolean,
      default: false
    },
    // 易贷面核面签（除收款账户信息）不可编辑
    ydApproveMode2: {
      type: Boolean,
      default: false
    },
    applicationId: {
      type: String,
      default: ''
    }
  },
  data() {
    const mixRule = {
      policyNum: [
        { required: true, message: "请填写保单号", trigger: "blur" },
        { validator: this.checkPolicyNum, trigger: "blur" }
      ]
    };
    return {
      policyColList,
      policyRule: Object.assign({}, policyRule, mixRule),
      policyEdit: Object.assign({}, policyEdit),
      policyList: [],
      insPaymentModeCodeLibrary: [],
      policyCurrentEdit: {}, // 当前正被编辑保险项
      insPaymentModeCodeClass: {},
      policyEditDg: false
    };
  },
  methods: {
    addPolicy() {
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      this.$refs.policyAddForm.validate(valid => {
        if (valid) {
          this.policyEdit.premiumTermCnt = this.premiumTermCnt;
          this.policyEdit.availableInd = this.isPolicyEffective;
          this.policyEdit.applicationId = this.applicationId;
          this.policyEdit.premiumAnnualAmt = this.premiumAnnualAmt;
          this.addPolicyApi(this.policyEdit).then(() => {
            this.policyEditDg = false;
            this.getPolicyList();
            this.confirmFn('保单添加成功！', 'success');
          });
        }
      });
    },
    addPolicyApi(data) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .post(baseApi.completeProduct.addPolicy, data)
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            console.error(err);
            this.confirmFn(err.message, "error");
          });
      });
    },
    // 删除保单信息
    deletePolicy(id) {
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      if (this.policyCurrentEdit.id) {
        this.confirmFn("请先完成正在编辑的表格", "error");
        return;
      }
      this.confirmFn("是否删除该条信息!", "warning").then(() => {
          return this.deletePolicyApi(id);
        }).then(() => {
          this.getPolicyList();
        });
    },
    deletePolicyApi(id) {
      return new Promise((resolve, reject) => {
        this.$MyFetch.get(baseApi.completeProduct.deletePolicy + id)
          .then((data = {}) => {
            this.confirmFn('删除成功！', 'success');
            this.policyEdit = Object.assign({}, policyEdit);
            resolve(data);
          }).catch(err => {
            this.confirmFn(err.message, "error");
          });
      });
    },
    isEditing(_list) {
      let flag = false;
      for (let i = 0; i < _list.length; i++) {
        if (_list[i].showFormEle) {
          flag = true;
          break;
        }
      }
      return flag;
    },
    // 编辑保单表格
    editPolicyELe(obj) {
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      let isEdit = this.isEditing(this.policyList);
      if (this.policyEditDg || isEdit) {
        this.confirmFn('请先完成正在编辑的表格', 'error');
        return;
      };
      this.$set(obj, 'showFormEle', true);
      this.policyEdit = Object.assign({}, obj);
      this.policyCurrentEdit = Object.assign({}, obj);
    },
     // 保存表单编辑
    saveEditPolicy(formName, obj) {
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      this.$refs[formName][0].validate(valid => {
        if (valid) {
          this.policyEdit.applicationId = this.applicationId;
          this.policyEdit.premiumTermCnt = this.premiumTermCnt;
          this.policyEdit.availableInd = this.isPolicyEffective;
          this.policyEdit.premiumAnnualAmt = this.premiumAnnualAmt;
          this.policyEdit.holderSwitchInd = this.policyEdit.holderSwitchInd ? this.policyEdit.holderSwitchInd : false;
          this.saveEditPolicyApi(this.policyEdit, obj);
        }
      });
    },
    // 关闭表单修改
    closeEditPolicy(obj) {
      this.policyCurrentEdit = {};
      this.policyEdit = {};
      this.$set(obj, "showFormEle", false);
    },
    saveEditPolicyApi(data, obj) {
      // console.log(data);
      this.$MyFetch
        .post(baseApi.completeProduct.editPolicy, data)
        .then((data = {}) => {
          this.getPolicyList();
          this.confirmFn("修改成功", "success");
          this.closeEditPolicy(obj);
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    openAddPolicy() {
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      if (this.policyCurrentEdit.id) {
        this.confirmFn("请先完成正在编辑的表格", "error");
        return;
      }
      this.policyEdit = Object.assign({}, policyEdit);
      if (this.policyList.length >= 3) {
        this.confirmFn("保单满三份，无法继续新增！", "error");
        return;
      }
      this.policyEditDg = true;
    },
    // 关闭保单新增
    closeAddPolicy() {
      this.policyEditDg = false;
    },
    getPolicyList() {
      this.$MyFetch
        .post(baseApi.completeProduct.getPolicyList, {applicationId: this.applicationId}).then((data) => {
          data = data || {};
          this.policyList = data.list;
          this.policyList.forEach((v) => {
            // 新增
            v.premiumCycleAmt = v.premiumCycleAmt && v.premiumCycleAmt.toFixed(2);
            v.premiumAnnualAmt = v.premiumAnnualAmt && v.premiumAnnualAmt.toFixed(2);
            if (v.effectiveDate) {
              v.effectiveDate = (new Date(v.effectiveDate.replace(/-/g, "/"))).getTime(); // 传回来的变成了时间字符串 转成时间搓
            }
            this.policyEdit.availableInd = this.policyEdit.availableInd ? this.policyEdit.availableInd : false;
            this.policyEdit.holderSwitchInd = this.policyEdit.holderSwitchInd ? this.policyEdit.holderSwitchInd : false;
            this.$set(v, 'showFormELe', false);
            // v.showFormEle = false;
          });
        }).catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 根据code获取保险公司名称
    policyCompanyName(code) {
      let name = "";
      this.policyCompanyList.forEach(v => {
        if (v.itemCode === code) {
          name = v.itemDesc;
        }
      });
      return name;
    },
    // 根据时间搓返回时间
    getTime(time) {
      var str = "/";
      if (time) {
        time = typeof time === "string" ? time.replace(/-/g, "/") : time;
        str = new Date(time).normalizeTime().strDate;
      }
      return str;
    },
    // 检查保单号是否存在
    checkPolicyNum(rule, value, callback) {
      var isExist = false;
      this.policyList.forEach(v => {
        if (v.policyNum === value && this.policyCurrentEdit.policyNum !== value) {
          isExist = true;
        }
      });
      if (isExist) {
        return callback(new Error("该保单号已经存在"));
      } else {
        callback();
      }
    },
    // 输入的数字自动补00
    formatMoney(objName, key) {
      this[objName][key] = this.$returnFloat(this[objName][key], 2);
    },
    // 获取多个下拉项
    getMultipleLibrary(arr, isReadonly = false) {
      let data = {
        categoryCodes: arr,
        getAll: isReadonly
      };
      return this.$MyFetch.get(baseApi.multipleSelect, data);
    }
  },
  mounted() {
    this.getPolicyList();
  },
  created() {
    let selectArr = [
      "ins_payment_mode_code"
    ];
    this.getMultipleLibrary(selectArr, this.isDetail)
      .then(data => {
        this.insPaymentModeCodeLibrary = data.ins_payment_mode_code;
        this.insPaymentModeCodeLibrary.forEach(v => {
          this.$set(this.insPaymentModeCodeClass, v.itemCode, v.itemDesc);
        });
      })
      .catch(err => {
        this.confirmFn(err.message);
      });
  },
  computed: {
    ...mapGetters(['openVideo']),
    policyCompanyList() {
      return this.dictLib.insurance_company;
    },
    // 计算缴费次数
    premiumTermCnt() {
      let num = 0;
      let nowDate = new Date().normalizeTime().objDate;
      let setDate = new Date(this.policyEdit.effectiveDate).normalizeTime().objDate;
      if (this.policyEdit.effectiveDate && this.policyEdit.paymentModeCode) {
        switch (this.policyEdit.paymentModeCode) {
          case '1':
            num = getMonthTimes();
            break;
          case '2':
            num = getQuarterTimes();
            break;
          case '3':
            num = getHalfTimes();
            break;
          case '4':
            num = getFullTimes();
            break;
        }
      }
      if (num <= 0) { num = 0; }
      function getMonthTimes() {
        return (((nowDate.Y - setDate.Y) * 12) + ((nowDate.M - setDate.M) + (((nowDate.D - setDate.D) >= 0) ? 1 : 0)));
      }
      function getQuarterTimes() {
        return Math.ceil((((nowDate.Y - setDate.Y) * 12) + ((nowDate.M - setDate.M) + (((nowDate.D - setDate.D) >= 0) ? 1 : 0))) / 3);
      }
      function getHalfTimes() {
        return Math.ceil((((nowDate.Y - setDate.Y) * 12) + ((nowDate.M - setDate.M) + (((nowDate.D - setDate.D) >= 0) ? 1 : 0))) / 6);
      }
      function getFullTimes() {
        return Math.ceil((((nowDate.Y - setDate.Y) * 12) + ((nowDate.M - setDate.M) + (((nowDate.D - setDate.D) >= 0) ? 1 : 0))) / 12);
      }
      return num;
    },
    // 判断保单是否有效
    isPolicyEffective() {
      let effect = false;
      let nowDate = new Date().normalizeTime().objDate;
      let setDate = new Date(this.policyEdit.effectiveDate).normalizeTime().objDate;
      let fullTowYears = Math.floor((((nowDate.Y - setDate.Y) * 12) + ((nowDate.M - setDate.M) + (((nowDate.D - setDate.D) >= 0) ? 0 : -1)))) >= 24;
      if (!this.policyEdit.holderSwitchInd && this.premiumTermCnt <= this.policyEdit.premiumTimesCnt && fullTowYears) {
        effect = true;
      }
      return effect;
    },
    // 计算年缴保费
    premiumAnnualAmt() {
      let num = 0;
      let map = {
        '1': (12 * (this.policyEdit.premiumCycleAmt * 1000000)) / 1000000,
        '2': (4 * (this.policyEdit.premiumCycleAmt) * 1000000) / 1000000,
        '3': (2 * (this.policyEdit.premiumCycleAmt) * 1000000) / 1000000,
        '4': this.policyEdit.premiumCycleAmt
      };
      if (this.policyEdit.paymentModeCode && this.policyEdit.premiumCycleAmt) {
        num = map[this.policyEdit.paymentModeCode];
      }
      return num;
    }
  }
};
</script>

<style lang="less">
  #insurance-table {
    .el-form-item {
      margin-bottom: 0px;
    }
    .table__head .table__tr {
      display: flex;
      justify-content: space-around;
      align-items: center;
      min-width: 100%;
      border-bottom: 1px solid #d0d0d0;
      background: #f5f5f5;
      .table__th {
        // min-width: 83px;
        line-height: 60px;
        width: 100%;
        display: block;
      }
    }
    .table__tr__bottom-list, .table__tr__top-list {
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: #fff;
      .table__form-item {
        padding: 0 4px;
        .el-date-editor, .el-cascader, .el-select {
          width: 100%;
        }
      }
      li.table__td {
        line-height: 50px;
        // min-width: 83px;
        // max-width: 90px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
        display: block;
      }
    }
  }
</style>
