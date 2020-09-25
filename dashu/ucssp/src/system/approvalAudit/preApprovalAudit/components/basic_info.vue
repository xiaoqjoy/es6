<template>
  <div class="basis_info">
    <el-form
      :model="custBasicInfo" :rules="custBasicRule"
      ref="custBasicForm" label-width="100px"
      label-position="top"
      :disabled="isDetail">
        <div>
          <el-form-item label="人物性别">
            <el-radio-group v-model="custBasicInfo.genderCode">
              <el-radio-button
                v-for="(item, index) in gender_code"
                :key="index"
                :label="item.itemCode"
                :disabled="custBasicInfo.genderCode !== item.itemCode">{{item.itemDesc}}</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="婚姻状况" prop="maritalStatusCode" class="width190">
            <el-select v-model="custBasicInfo.maritalStatusCode" placeholder="请选择婚姻状况" @change="maritalStatusChange">
              <el-option v-for="item in marital_status_code" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="配偶姓名" prop="spouseName" class="width190">
            <el-input v-model="custBasicInfo.spouseName"
              :disabled="!(custBasicInfo.maritalStatusCode === '20' || custBasicInfo.maritalStatusCode === '22')||isDetail">
            </el-input>
            <!-- <input type="hidden" v-model="custBasicInfo.spouseName"> -->
          </el-form-item>
          <el-form-item label="配偶证件类型" prop="spouseIDTypeCode">
            <el-select v-model="custBasicInfo.spouseIDTypeCode"
              placeholder="" clearable
              :disabled="!(custBasicInfo.maritalStatusCode === '20' || custBasicInfo.maritalStatusCode === '22')||isDetail">
              <el-option
                v-for="item in certificateType"
                :key="item.itemCode"
                :label="item.itemDesc"
                :value="item.itemCode">
              </el-option>
            </el-select>
            <!-- <input type="hidden" v-model="custBasicInfo.spouseIDTypeCode"> -->
          </el-form-item>
          <el-form-item label="配偶证件号码" prop="spouseID" class="width190">
            <el-input v-model="custBasicInfo.spouseID" maxlength="50"
              :disabled="!(custBasicInfo.maritalStatusCode === '20' || custBasicInfo.maritalStatusCode === '22')||isDetail">
            </el-input>
            <!-- <input type="hidden" v-model="custBasicInfo.spouseID"> -->
          </el-form-item>
          <el-form-item label="居住状况" prop="houseConditionCode" class="width190">
            <el-select v-model="custBasicInfo.houseConditionCode" placeholder="请选择居住状况">
              <el-option v-for="item in house_condition_code" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="有无本地房产" class="width82">
            <el-switch v-model="custBasicInfo.localEstateInd"
              :width="50" active-text="有"
              inactive-text="无" :active-value="true"
              :inactive-value="false">
            </el-switch>
          </el-form-item>
          <el-form-item label="户籍地址" prop="registeredAddressCode" class="width310">
            <select-cascader v-model="custBasicInfo.registeredAddressCode" :options="options"></select-cascader>
          </el-form-item>
          <el-form-item label="户籍详细地址" prop="registeredAddressDesc" class="width660">
            <el-input v-model="custBasicInfo.registeredAddressDesc" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="身份证签发机关" prop="certificateGrantorName" class="width310">
            <el-input v-model="custBasicInfo.certificateGrantorName" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="居住地址" prop="houseAddressCode" class="width310">
            <select-cascader v-model="custBasicInfo.houseAddressCode" :options="options"></select-cascader>
          </el-form-item>
          <el-form-item label="居住详细地址" prop="houseAddressDesc" class="width660">
            <el-input v-model="custBasicInfo.houseAddressDesc" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="单位名称" prop="workplaceName" class="width310">
            <el-input v-model="custBasicInfo.workplaceName" maxlength="100"></el-input>
          </el-form-item>
          <el-form-item label="单位地址" prop="workAddressCode" class="width310">
            <select-cascader v-model="custBasicInfo.workAddressCode" :options="options"></select-cascader>
          </el-form-item>
          <el-form-item label="客户类型" class="width310">
            <el-select v-model="custBasicInfo.careerTypeCode" placeholder="请选择客户类型" @change="removeValue" :disabled="true">
              <el-option v-for="item in career_type_code" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="占股情况" prop="sharePercent" class="width310">
            <el-select v-model="custBasicInfo.sharePercent" placeholder="请选择占股情况" :disabled="custBasicInfo.careerTypeCode !== dCode.careerTypeCode.boss">
              <el-option v-for="item in share_percent" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
            </el-select>
          </el-form-item>
          <div class="radio-group">
            <el-form-item label="6个月内是否正常缴纳公积金" prop="houseFund6mInd"  >
              <el-switch v-model="custBasicInfo.houseFund6mInd"
                :width="50" active-text="是"
                inactive-text="否" :active-value="true"
                :inactive-value="false">
              </el-switch>
            </el-form-item>
            <el-form-item label="是否注册" prop="registeredInd">
              <el-switch v-model="custBasicInfo.registeredInd"
                :width="50" active-text="是"
                @change="custBasicInfo.foundDate = null"
                inactive-text="否" :active-value="true"
                :inactive-value="false"
                :disabled="custBasicInfo.careerTypeCode !== dCode.careerTypeCode.boss"
                ></el-switch>
            </el-form-item>
          </div>
          <el-form-item label="成立日期" prop="foundDate" class="width310">
            <el-date-picker
              v-model="custBasicInfo.foundDate"
              type="date"
              value-format="yyyy-MM-dd hh:mm:ss"
              placeholder="选择日期"
              :disabled="custBasicInfo.careerTypeCode !== dCode.careerTypeCode.boss || !custBasicInfo.registeredInd"
              :editable="false">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="定价方案" prop="pricingPlanCode" class="width310">
            <el-select
              v-model="custBasicInfo.pricingPlanCode"
              placeholder="请选择" :disabled="true">
                <el-option
                  v-for="(item, index) in pricingPlanLibrary"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode">
                </el-option>
            </el-select>
          </el-form-item>
        </div>
    </el-form>
  </div>
</template>

<script>
import {custBasicRule} from '@system/face2face/js/mind.js';
import { fileCos } from "@/common/js/fileCos";
import { aprAudApi } from "../../js/server";
import myRule from "@common/js/rules";
export default {
  props: {
    isDetail: {
      type: Boolean,
      default: false
    },
    dict: {
      type: Object,
      default: () => ({})
    },
    custBasicInfo: {
      type: Object,
      default: () => ({})
    },
    applicationId: {
      type: String,
      default: ''
    },
    customerContactsInfo: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const custBasicMixRule = {
      sharePercent: [{ validator: this.sharePercentRule, trigger: 'visible-change' }],
      foundDate: [{ validator: this.foundDateRule, trigger: 'blur' }],
      spouseIDTypeCode: [{ validator: this.checkspouseIdTypeCode }],
      spouseID: [{ validator: this.checkSpouseID, trigger: 'blur' }],
      spouseName: [
        {validator: this.checkSpouseName, trigger: 'blur'},
        {validator: myRule.chineseName, trigger: 'blur'}
      ]
    };
    return {
      dCode: this.$getCodeDependent(),
      pricingPlanLibrary: [], // 定价方式，0614项目
      options: [],
      custBasicRule: Object.assign(custBasicRule(), custBasicMixRule)
    };
  },
  methods: {
    getAddress() {
      let addressData = JSON.parse(localStorage.getItem('address'));
      if (!addressData) {
        this.getArea().then(_res => {
          this.options = _res;
        });
        return;
      }
      this.options = addressData;
    },
    getPricingPlanApi() {
      this.$MyFetch.get(aprAudApi.getPricingPlanCode + this.applicationId)
        .then(data => {
          this.pricingPlanLibrary = data;
        }).catch((err) => {
          !!err.message && this.confirmFn(err.message, 'error');
        });
    },
    sharePercentRule(rule, value, callback) {
      if (this.custBasicInfo.registeredInd && !value) {
        return callback(new Error('请选择占股情况'));
      } else {
        callback();
      }
    },
    foundDateRule(rule, value, callback) {
      if ((this.custBasicInfo.careerTypeCode === this.dCode.careerTypeCode.boss) && !value && this.custBasicInfo.registeredInd) {
        return callback(new Error('请选择成立日期'));
      } else {
        callback();
      }
    },
    // 验证配偶姓名
    checkSpouseName(rule, value, callback) {
      if ((this.custBasicInfo.maritalStatusCode === '22' || this.custBasicInfo.maritalStatusCode === '20') && !value) {
        callback(new Error('请输入配偶姓名！'));
      } else {
        callback();
      }
    },
    // 验证配偶证件类型
    checkspouseIdTypeCode(rule, value, callback) {
      if ((this.custBasicInfo.maritalStatusCode === '22' || this.custBasicInfo.maritalStatusCode === '20') && !value) {
        callback(new Error('请选择配偶证件类型！'));
      } else {
        callback();
      }
    },
    // 验证配偶证件号
    checkSpouseID(rule, value, callback) {
      let errMsg = '请输入正确的';
      let valReg;
      switch (this.custBasicInfo.spouseIDTypeCode) {
        case 'Ind01':
          errMsg += '身份证';
          valReg = fileCos.checkIdcard(value);
          break;
        case 'Ind04':
          errMsg += '军官证';
          valReg = true;
          break;
        case 'Ind06':
          errMsg += '港澳居民往来内地通行证';
          valReg = true;
          break;
        case 'Ind07':
          errMsg += '台湾同胞往来内地通行证';
          valReg = true;
          break;
        case 'Ind15':
          errMsg += '护照';
          valReg = true;
          break;
        default:
          break;
      }
      if ((this.custBasicInfo.maritalStatusCode === '20' || this.custBasicInfo.maritalStatusCode === '22')) {
        if (!this.custBasicInfo.spouseIDTypeCode) {
          callback(new Error('请先选择配偶证件类型！'));
        } else if (!value) {
          callback(new Error('请填写配偶证件号码！'));
        } else if (!valReg) {
          callback(new Error(errMsg));
        } else {
          callback();
        }
      } else {
        callback();
      }
    },
    maritalStatusChange(value) {
      if (value !== "20" && value !== "22") {
        this.custBasicInfo.spouseName = "";
        this.custBasicInfo.spouseIDTypeCode = "";
        this.custBasicInfo.spouseID = "";
        this.customerContactsInfo.spouseName = "";
        this.customerContactsInfo.spouseIDTypeCode = "";
        this.customerContactsInfo.spouseID = "";
      }
      this.$refs.custBasicForm.clearValidate(['spouseName', 'spouseIDTypeCode', 'spouseID']);
    },
    // 选择标准授薪时应该去掉 占股情况， 成立日期， 是否注册
    removeValue(value) {
      if (value === this.dCode.careerTypeCode.boss) {
        this.custBasicInfo.foundDate = '';
        this.custBasicInfo.sharePercent = '';
        this.custBasicInfo.registeredInd = false;
      }
    }
  },
  computed: {
    gender_code() { // 性别字典
      return this.dict.gender_code;
    },
    marital_status_code() { // 婚姻状况字典
      return this.dict.marital_status_code;
    },
    house_condition_code() { // 居住状况字典
      return this.dict.house_condition_code;
    },
    career_type_code() { // 客户类型字典
      return this.dict.career_type_code;
    },
    share_percent() { // 占股情况字典
      return this.dict.share_percent;
    },
    certificateType() {
      return this.dict.certificate_type_code;
    }
  },
  created() {
    this.getAddress();
  },
  mounted() {
    this.getPricingPlanApi();
  }
};
</script>

<style lang="less" scoped>
  .basis_info {
    .el-form-item {
      text-align: left;
      margin-right: 40px;
      display: inline-block;
      .el-select, .el-date-editor {
        width: 100%;
      }
    }
    > form.el-form.el-form--label-top {
      > div {
        padding: 0 20px;
        text-align: left;
      }
    }
    .width82 {
      width: 82px;
    }
    .width150 {
      width: 24%;
    }
    .width190 {
      // width: 190px;
      width: 13.2%;
    }
    .width220 {
      width: 220px;
    }
    .width310 {
      // width: 310px;
      width: 21.5%;
    }
    .width660 {
      // width: 660px;
      width: 46.3%;
    }
    .radio-group {
      display: inline-block;
      width: 310px;
      margin-right: 40px;
    }
  }
</style>
