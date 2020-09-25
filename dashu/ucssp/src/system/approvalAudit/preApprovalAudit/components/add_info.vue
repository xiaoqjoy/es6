<template>
  <div class="add_info">
    <el-form :model="custDetailedInfo"
      :rules="custDetailedRule"
      ref="custDetailedForm"
      label-width="100px"
      class="demo-form-inline" label-position="top"
      :disabled="isDetail">
      <div class="dialog-box__form__group">
        <el-form-item label="所在部门" prop="departmentName" class="width310" >
          <el-input v-model="custDetailedInfo.departmentName" placeholder="请填写所在部门" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="职务" prop="jobTitle" class="width310" >
          <el-input v-model="custDetailedInfo.jobTitle" placeholder="请填写职务" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="微信号" prop="wechat" class="width310" >
          <el-input v-model="custDetailedInfo.wechat" placeholder="请填写微信号" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="单位详细地址" prop="workAddressDesc" class="width660">
          <el-input v-model="custDetailedInfo.workAddressDesc" placeholder="请填写单位详细地址" maxlength="100"></el-input>
        </el-form-item>
        <el-form-item label="月收入" prop="monthlyIncomeAmt" class="width310">
          <el-input v-model="custDetailedInfo.monthlyIncomeAmt" placeholder="请填写月收入" maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="工作电话区号" prop="workAreaNum" class="width310">
          <el-input v-model="custDetailedInfo.workAreaNum" placeholder="请填写工作电话区号"></el-input>
        </el-form-item>
        <el-form-item label="单位固话" prop="workPhoneNum" class="width310">
          <el-input v-model="custDetailedInfo.workPhoneNum" placeholder="请填写单位固话"></el-input>
        </el-form-item>
        <el-form-item label="人事部联系人" prop="hrContactName" class="width310">
          <el-input v-model="custDetailedInfo.hrContactName" placeholder="请填写人事部联系人" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item label="人事部联系人手机号码" prop="hrContactNum" class="width310">
          <el-input v-model="custDetailedInfo.hrContactNum" placeholder="请填写人事部联系人手机号"></el-input>
        </el-form-item>
        <el-form-item label="住宅邮编" prop="houseZipcode" class="width310">
          <el-input v-model="custDetailedInfo.houseZipcode" placeholder="请填写人住宅邮编"></el-input>
        </el-form-item>
        <el-form-item label="单位邮编" prop="zipcode" class="width310">
          <el-input v-model="custDetailedInfo.zipcode" placeholder="请填写单位邮邮编"></el-input>
        </el-form-item>
        <el-form-item label="教育程度" prop="educationLevelCd" class="width310">
          <el-select
            v-model="custDetailedInfo.educationLevelCd"
            placeholder="请选择">
            <el-option
              v-for="(item, index) in education_level_cd"
              :key="index"
              :label="item.itemDesc"
              :value="item.itemCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="户口所在地" prop="registeredAreaCd" class="width310">
          <el-select
            v-model="custDetailedInfo.registeredAreaCd"
            placeholder="请选择">
            <el-option
              v-for="(item, index) in registered_area_cd"
              :key="index"
              :label="item.itemDesc"
              :value="item.itemCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有无子女" prop="haveChildInd" class="width310">
          <el-select
            v-model="custDetailedInfo.haveChildInd"
            placeholder="请选择">
            <el-option label="有" :value="true"></el-option>
            <el-option label="无" :value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="个人税收客户类型" prop="customerTaxCd" class="width310">
          <el-select
            v-model="custDetailedInfo.customerTaxCd"
            :disabled="isDetail"
            placeholder="请选择">
            <el-option
              v-for="(item, index) in customer_tax_cd"
              :key="index"
              :label="item.itemDesc"
              :value="item.itemCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位性质" prop="organizationTypeCd" class="width310">
          <el-select
            v-model="custDetailedInfo.organizationTypeCd"
            placeholder="请选择">
            <el-option
              v-for="(item, index) in organization_type_cd"
              :key="index"
              :label="item.itemDesc"
              :value="item.itemCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="现工作单位年限" prop="presentWorkYearCnt" class="width310">
          <el-input v-model="custDetailedInfo.presentWorkYearCnt" placeholder="请填写现工作单位年限"></el-input>
        </el-form-item>
        <el-form-item label="职务类型" prop="positionTypeCd" class="width310">
          <el-select
            v-model="custDetailedInfo.positionTypeCd"
            placeholder="请选择">
            <el-option
              v-for="(item, index) in position_type_cd"
              :key="index"
              :label="item.itemDesc"
              :value="item.itemCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="个人类型" prop="personalTypeCd" class="width310">
          <el-select
            v-model="custDetailedInfo.personalTypeCd"
            placeholder="请选择">
            <el-option
              v-for="(item, index) in personal_type_cd"
              :key="index"
              :label="item.itemDesc"
              :value="item.itemCode"></el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import {custDetailedRule} from '@system/face2face/js/mind.js';
import myRule from "@common/js/rules";
export default {
  props: {
    custDetailedInfo: {
      type: Object,
      default: () => ({})
    },
    isDetail: {
      type: Boolean,
      default: false
    },
    dict: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    const custDetailedMixRule = {
      hrContactName: [{ validator: this.checkHr, trigger: "blur" }],
      hrContactNum: [{ validator: this.checkHrPhone, trigger: "blur" }],
      zipcode: [
        { required: true, message: "请输入邮编", trigger: "blur" },
        { validator: myRule.postRule, trigger: "blur" }
      ]
    };
    return {
      custDetailedRule: Object.assign(custDetailedRule(), custDetailedMixRule),
      dCode: this.$getCodeDependent()
    };
  },
  methods: {
    // 验证人事部联系人
    checkHr(rule, value, callback) {
      console.log(this.custDetailedInfo.careerTypeCode);
      console.log(this.dCode.careerTypeCode.boss);
      if (this.custDetailedInfo.careerTypeCode !== this.dCode.careerTypeCode.boss) {
        if (value) {
          myRule.nameRule(rule, value, callback);
        } else {
          callback(new Error('请输入人事部联系人姓名'));
        }
      } else {
        callback();
      }
    },
    // 验证人事部联系人手机
    checkHrPhone(rule, value, callback) {
      const valReg = /^1[3456789]\d{9}$/;
      if (this.custDetailedInfo.careerTypeCode !== this.dCode.careerTypeCode.boss && !value) {
        callback(new Error("请输入人事部联系人手机号码！"));
      } else if (value && !valReg.test(value)) {
        callback(new Error("请输入正确的手机号码！"));
      } else {
        callback();
      }
    }
  },
  computed: {
    education_level_cd() { // 教育程度字典
      return this.dict.education_level_cd;
    },
    registered_area_cd() { // 户口所在地字典
      return this.dict.registered_area_cd;
    },
    customer_tax_cd() { // 客户下拉类型
      return this.dict.customer_tax_cd;
    },
    organization_type_cd() { // 单位性质字典
      return this.dict.organization_type_cd;
    },
    position_type_cd() { // 职务类型字典
      return this.dict.position_type_cd;
    },
    personal_type_cd() { // 个人类型字典
      return this.dict.personal_type_cd;
    }
  }
};
</script>

<style lang="less" scoped>
  .add_info {
    .el-form-item {
      text-align: left;
      margin-right: 40px;
      display: inline-block;
      .el-select {
        width: 100%;
      }
    }
    > form.el-form.el-form--label-top {
      > div {
        padding: 20px;
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
      width: 45.8%;
    }
    .radio-group {
      display: inline-block;
      width: 310px;
      margin-right: 40px;
    }
  }
</style>
