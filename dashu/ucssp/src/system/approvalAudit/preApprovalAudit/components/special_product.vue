<template>
  <div class="form__block bg__white border__radius-5" >
    <el-tabs v-model="activeName" class="tab-box">
      <el-tab-pane v-for="item in orgSpecialInfo" :key="item.sortNum"
        :label="'特殊字段产品' + transformNum(item.sortNum)" :name="transformNum(item.sortNum)">
      </el-tab-pane>
      <!-- <el-tab-pane label="特殊字段产品一" name="first"></el-tab-pane>
      <el-tab-pane label="特殊字段产品二" name="second" v-if="!!creditInfo.productTow"></el-tab-pane> -->
    </el-tabs>
    <!-- <div>{{industryCodeLibrary}}</div> -->
    <div class="dialog-box__form__group margin-top__20" v-show="activeName === transformNum(item.sortNum)"
      v-for="item in orgSpecialInfo" :key="item.sortNum">
      <el-form :model="sliceStr('orgSpecialInfo', item.sortNum)"
          :rules="sliceStr('orgSpecialInfoRule', item.sortNum)"
          :ref="`orgSpecialInfo${item.sortNum}Form`"
          label-width="100px" :disabled="isDetail"
          class="demo-form-inline" label-position="top" >
          <!-- orgSpecialInfo1Form -->
        <el-form-item label="借款人职业名称" prop="careerCode" class="el-form-item__25" >
          <el-select
            :disabled="isDetail"
            v-model="sliceStr('orgSpecialInfo', item.sortNum)['careerCode']"
            placeholder="请选择借款人职业名称">
            <el-option
              v-for="(item,index) in carrerCodeLibrary"
              :key="index"
              :label="item.itemDesc" :value="item.itemCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="借款人行业名称" prop="industryCode" class="el-form-item__25" >
          <el-select
            :disabled="isDetail"
            v-model="sliceStr('orgSpecialInfo', item.sortNum)['industryCode']"
            placeholder="请选择借款人行业名称">
            <el-option
              v-for="(item,index) in industryCodeLibrary[item.sortNum - 1]"
              :key="index"
              :label="item.itemDesc" :value="item.itemCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="贷款用途" prop="loanPurposeCode" class="el-form-item__25" >
          <el-select
            @change="loanPurposeCodeChange(sliceStr('orgSpecialInfo', item.sortNum)['loanPurposeCode'], item.sortNum)"
            v-model="sliceStr('orgSpecialInfo', item.sortNum)['loanPurposeCode']"
            placeholder="请选择贷款用途" :disabled="isDetail">
            <el-option
              v-for="(item,index) in loanPurposeCodeLibrary[item.sortNum - 1]"
              :key="index"
              :label="item.itemDesc" :value="item.itemCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="其他贷款用途说明" prop="loanOtherPurpose" class="el-form-item__25"  >
          <el-input
            maxlength="10"
            :disabled="!(sliceStr('orgSpecialInfo', item.sortNum).loanPurposeCode === dCode.loanPurposeCode.other || sliceStr('orgSpecialInfo', item.sortNum).loanPurposeCode === dCode.loanPurposeCode.other1) || isDetail"
            v-model="sliceStr('orgSpecialInfo', item.sortNum)['loanOtherPurpose']"
            placeholder="请填写其他贷款用途说明"></el-input>
        </el-form-item>
        <el-form-item label="贷款用途性质" prop="loanPurposeType" class="el-form-item__25" >
          <el-select
            @change="clearValidateName(item.sortNum)"
            :disabled="isDetail"
            v-model="sliceStr('orgSpecialInfo', item.sortNum)['loanPurposeType']"
            placeholder="请选择贷款用途性质">
            <el-option
              v-for="(item) in loanPurposeTypeLibrary"
              :key="item.itemCode"
              :label="item.itemDesc"
              :value="item.itemCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="还款方式" prop="repaymentModeCode" class="el-form-item__25">
          <!-- <DQuerySelect
            v-model="sliceStr('orgSpecialInfo', item.sortNum).repaymentModeCode"
            placeholder="请选择还款方式"
            alias="repayment_mode_code"
            :filterDict="(option) => repaymentModeFilter(option, sliceStr('orgSpecialInfo', item.sortNum).productId)"
            :disabled="changeProduct"
            @change="onRepaymentModeCodeChange(item.sortNum)">
          </DQuerySelect> -->
          <el-select
            v-model="sliceStr('orgSpecialInfo', item.sortNum).repaymentModeCode"
            placeholder="请选择还款方式"
            @change="onRepaymentModeCodeChange(item.sortNum)">
            <el-option
              v-for="(item) in sliceStr('orgSpecialInfo', item.sortNum).repaymentList"
              :key="item.itemCode"
              :label="item.itemDesc"
              :value="item.itemCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="贷款期限" prop="loanTerm" class="el-form-item__25" >
          <el-select
            :disabled="isDetail"
            v-model="sliceStr('orgSpecialInfo', item.sortNum)['loanTerm']"
            placeholder="请选择贷款期限">
            <el-option
              v-for="(item,index) in loanTermLibrary[item.sortNum - 1]"
              :key="index"
              :label="item.itemDesc" :value="item.itemCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="sliceStr('orgSpecialInfo', item.sortNum).repaymentModeCode === '6'"
          label="摊还期限（月）"
          prop="amortizationMonth"
          class="el-form-item__25"
        >
          <el-select :disabled="isDetail || amortizationDisabled" v-model="sliceStr('orgSpecialInfo', item.sortNum).amortizationMonth">
            <el-option
              v-for="item in amortizationMonthList[item.sortNum - 1]"
              :key="item.itemCode"
              :label="item.itemDesc"
              :value="item.itemCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="还款周期" prop="repaymentCycleCode" class="el-form-item__25">
          <el-select
            :disabled="changeProduct"
            v-model="sliceStr('orgSpecialInfo', item.sortNum).repaymentCycleCode"
            placeholder="请选择还款周期">
            <el-option
              v-for="(item, index) in repaymentCycleCodeLibrary"
              :key="index"
              :label="item.itemDesc" :value="item.itemCode"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="more-message"></div>
    <special-form
      v-if="specialTemplate1.length > 0"
      v-show="activeName === '一'"
      :render-arr="specialTemplate1"
      form-name="formMore1"
      class="special-form"
      ref="formMore1"
      :set-value="specialData1"
      :has-submit="isDetail"
    ></special-form>
    <special-form
      v-if="specialTemplate2.length > 0"
      v-show="activeName === '二'"
      :render-arr="specialTemplate2"
      form-name="formMore2"
      class="special-form"
      ref="formMore2"
      :set-value="specialData2"
      :has-submit="isDetail"
    ></special-form>
  </div>
</template>

<script>
import "@common/css/dialog";
import { aprAudApi } from "../../js/server";
import DQuerySelect from '@components/DQuerySelect';
import specialForm from "@system/spare/solving/complete_info/complete_customer_info/special_form";
export default {
  components: { specialForm, DQuerySelect },
  props: {
    isDetail: [Boolean],
    orgSpecialInfo: {
      type: Array,
      default: () => ([])
    },
    applicationId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      activeName: '一',
      patchMsg: {},
      industryClass: [],
      productIdOne: '',
      productIdTwo: '',
      // 特殊字段
      orgSpecialInfo1: {
        careerCode: null,
        industryCode: null,
        loanPurposeType: null,
        loanPurposeCode: null,
        loanOtherPurpose: null,
        orgSpecialFieldList: []
      },
      orgSpecialInfo2: {
        careerCode: null,
        industryCode: null,
        loanPurposeType: null,
        loanPurposeCode: null,
        loanOtherPurpose: null,
        orgSpecialFieldList: []
      },
      orgSpecialInfoRule1: {
        careerCode: [{ required: true, message: '请选择借款人职业', trigger: 'change' }],
        industryCode: [{ required: true, message: '请选择借款人行业', trigger: 'change' }],
        loanPurposeType: [{ required: true, message: '请选择贷款用途性质', trigger: 'change' }],
        loanPurposeCode: [{ required: true, message: '请选择贷款用途', trigger: 'change' }],
        loanOtherPurpose: [{ validator: this.checkloanOtherPurpose1, trigger: 'blur' }]
      },
      orgSpecialInfoRule2: {
        careerCode: [{ required: true, message: '请选择借款人职业', trigger: 'change' }],
        industryCode: [{ required: true, message: '请选择借款人行业', trigger: 'change' }],
        loanPurposeType: [{ required: true, message: '请选择贷款用途性质', trigger: 'change' }],
        loanPurposeCode: [{ required: true, message: '请选择贷款用途', trigger: 'change' }],
        loanOtherPurpose: [{ validator: this.checkloanOtherPurpose2, trigger: 'blur' }]
      },
      // 模板
      specialTemplate1: [],
      specialTemplate2: [],
      // 表单字段值
      specialData1: {},
      specialData2: {},
      // 贷款期限字典
      loanTermLibrary: [],
      // 贷款用途性质字典
      loanPurposeTypeLibrary: [],
      loanPurposeCodeLibrary: [],
      carrerCodeLibrary: [],
      industryCodeLibrary: [],
      repaymentCycleCodeLibrary: [],
      careerClass: {},
      changeProduct: false, // 即便是提交过了 但这时候又修改了产品 这时候下面的产品字段可以修改（false值可以修改）
      dCode: this.$getCodeDependent(),
      amortizationMonthList: [], // 贷款期限字典
      amortizationDisabled: false
    };
  },
  created() {
    this.init(this.orgSpecialInfo);
    this.getLibraryApi();
  },
  methods: {
    repaymentModeFilter(item, productId) {
      if (item.itemCode === '6') {
        return productId === 'P20200513000001'; // 只有华夏太保易贷产品有'气球贷'选项
      }
      return true;
    },
    onRepaymentModeCodeChange(sortNum) {
      if (this.sliceStr('orgSpecialInfo', sortNum).repaymentModeCode === '6' &&
          this.sliceStr('orgSpecialInfo', sortNum).productId === 'P20200513000001') {
        this.sliceStr('orgSpecialInfo', sortNum).amortizationMonth = 60;
        this.amortizationDisabled = true;
      } else {
        this.sliceStr('orgSpecialInfo', sortNum).amortizationMonth = null;
        this.amortizationDisabled = false;
      }
    },
    checkForm(_name) {
      let flag = true;
      let formEle = this.$refs[_name];
      if (formEle) {
        if (formEle instanceof Array) {
          formEle = this.$refs[_name][0];
        }
        formEle.validate((_valid) => {
          flag = _valid;
        });
      }
      return flag;
    },
    getFormData() {
      let formList = ['orgSpecialInfo1Form', 'orgSpecialInfo2Form'];
      if (this.$refs.orgSpecialInfo1Form) {
        // 特殊字段里的动态表单
        if (this.specialTemplate1.length > 0) {
          formList.push('formMore1');
          this.orgSpecialInfo1.orgSpecialFieldList = this.getSpecialFormData(1);
          this.orgSpecialInfo[0].orgSpecialFieldList = this.orgSpecialInfo1.orgSpecialFieldList;
        }
      }
      if (this.$refs.orgSpecialInfo2Form) {
        if (this.specialTemplate2.length > 0) {
          formList.push('formMore2');
          this.orgSpecialInfo2.orgSpecialFieldList = this.getSpecialFormData(2);
          this.orgSpecialInfo[1].orgSpecialFieldList = this.orgSpecialInfo2.orgSpecialFieldList;
        }
      }
      // 添加行业名与职业名给后端用
      this.orgSpecialInfo.forEach((item, index) => {
        if (item.careerCode) {
          item.careerName = this.careerClass[item.careerCode];
          item.industryName = this.industryClass[index][item.industryCode];
        }
      });
      // 表单校验
      for (let i = 0; i <= formList.length; i++) {
        if (!this.checkForm(formList[i])) {
          return false;
        }
      }
      // 校验通过
      return true;
    },
    /**
     * @param {Number} 第几个特殊字段的表单
     * @returns {Array} 获取特殊字段动态表单里的值
     */
    getSpecialFormData(num) {
      let str = 'formMore' + num;
      let list = [];
      Object.keys(this.$refs[str].formData).forEach(_v => {
        if (_v.indexOf('_cascader') !== -1) {
          return;
        }
        list.push({
          orgItemCode: _v,
          orgItemVal: this.$refs[str].formData[_v]
        });
      });
      return list;
    },
    transformNum(_num) {
      let list = ['', '一', '二'];
      return list[_num];
    },
    sliceStr(_str, num, _strform) {
      if (_strform) {
        return this[`${_str}${num}${_strform}`];
      }
      return this[`${_str}${num}`];
    },
    // 获取下拉菜单
    getLibraryApi(name) {
      let list = ['repayment_cycle_code', 'self_employed_personal_type_cd', 'career_type_code', 'organization_type_cd', 'share_percent', 'position_type_cd', 'career_code', 'loan_purpose_type', 'loan_purpose_code', 'amortization_month'];
      let data = { categoryCodes: list, getAll: true };
      this.$MyFetch.get(aprAudApi.multipleSelect, data)
        .then(data => {
          this.customerTypeList = data.career_type_code;
          this.personalTypeCdList = data.self_employed_personal_type_cd;
          this.carrerCodeLibrary = data.career_code;
          // this.amortizationMonthList = data.amortization_month;
          this.carrerCodeLibrary.forEach(v => {
            this.$set(this.careerClass, v.itemCode, v.itemDesc);
          });
          this.loanPurposeTypeLibrary = data.loan_purpose_type;
          this.organizationTypeCdList = data.organization_type_cd;
          this.positionTypeCdList = data.position_type_cd;
          this.sharePercentList = data.share_percent;
          this.repaymentCycleCodeLibrary = data.repayment_cycle_code;
        }).catch(err => {
          this.confirmFn(err.message);
        });
    },
    async init(orgSpecialInfo) {
      this.getSpecialValue(orgSpecialInfo);
      if (orgSpecialInfo[0]) {
        let sortNum = orgSpecialInfo[0].sortNum;
        this[`orgSpecialInfo${sortNum}`] = orgSpecialInfo[0];
        this.productIdOne = orgSpecialInfo[0].productId;
        this.activeName = this.transformNum(orgSpecialInfo[0].sortNum);
        this.$nextTick(() => {
          this.$refs[`orgSpecialInfo${sortNum}Form`][0].clearValidate();
        });
        let repaymentList = await this.$getOrgSpecial('repaymentMode', this.applicationId, this.orgSpecialInfo[0].productId);
        // let arry = repaymentList.filter((item) => {
        //   return this.repaymentModeFilter(item, this[`orgSpecialInfo${sortNum}`].productId);
        // });
        this.$set(this[`orgSpecialInfo${sortNum}`], 'repaymentList', repaymentList);
        // 依据所选产品调用对应动态表单模板1
        this.getSpecialApi(this[`orgSpecialInfo${sortNum}`], `specialTemplate${sortNum}`, `specialData${sortNum}`);
      }
      if (orgSpecialInfo[1]) {
        this.orgSpecialInfo2 = orgSpecialInfo[1];
        this.productIdTwo = orgSpecialInfo[1].productId;
        this.$nextTick(() => {
          this.$refs.orgSpecialInfo2Form[0].clearValidate();
        });
        let repaymentList = await this.$getOrgSpecial('repaymentMode', this.applicationId, this.orgSpecialInfo[0].productId);
        // let arry = repaymentList.filter((item) => {
        //   return this.repaymentModeFilter(item, this.orgSpecialInfo2.productId);
        // });
        this.$set(this.orgSpecialInfo2, 'repaymentList', repaymentList);
        // 依据所选产品调用对应动态表单模板1
        this.getSpecialApi(this.orgSpecialInfo2, 'specialTemplate2', 'specialData2');
      }
    },
    // 获取特定下拉字段
    getSpecialValue(data) {
      // 行业字典获取
      data.forEach((v, index) => {
        this.$MyFetch.get(aprAudApi.getIndustryCode + this.applicationId + '/' + v.productId + '/')
          .then(res => {
            this.$set(this.industryCodeLibrary, v.sortNum - 1, res);
            let obj = {};
            res.forEach(v => {
              obj[v.itemCode] = v.itemDesc;
            });
            this.$set(this.industryClass, index, obj);
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
      });
      // 贷款用途字典获取
      data.forEach((v, index) => {
        this.$MyFetch.get(aprAudApi.getLoanPurpose + this.applicationId + '/' + v.productId + '/')
          .then(res => {
            console.log(res, '贷款用途');
            this.$set(this.loanPurposeCodeLibrary, v.sortNum - 1, res);
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
      });
      // 贷款期限字典获取
      data.forEach(async(v, index) => {
        this.$MyFetch.get(aprAudApi.getLoanTerm + this.applicationId + '/' + v.productId + '/')
          .then(data => {
            this.$set(this.loanTermLibrary, v.sortNum - 1, data);
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
        let loanTerms = await this.$getOrgSpecial("amortizationMonth", this.applicationId, v.productId);
        if (!(loanTerms instanceof Array)) {
          this.confirmFn('数据格式不对', 'error');
          return;
        }
        loanTerms.sort((itemA, itemB) => {
          return parseInt(itemB.itemCode) - parseInt(itemA.itemCode);
        });
        this.$set(this.amortizationMonthList, v.sortNum - 1, loanTerms);
      });
    },
    // 获取下拉特殊字段数据
    getSpecialApi(orgSpecialInfo, templateName, specialDataName) {
      let orgSpecialFieldList = orgSpecialInfo.orgSpecialFieldList;
      // 回显特殊字段
      if (orgSpecialFieldList instanceof Array && orgSpecialFieldList.length > 0) {
        orgSpecialFieldList.forEach(v => {
          this.$set(this[specialDataName], v.orgItemCode, v.orgItemVal);
        });
      }
      // 获取动态表单模板
      this.$MyFetch.post(aprAudApi.specialInfo, {
          applicationId: this.applicationId,
          productId: orgSpecialInfo.productId
        }).then(res => {
          // 动态表单里需要渲染的项
          this[templateName] = [...res.orgSpecialColumnList];
        }).catch(err => {
          this.confirmFn(err.message, 'error');
        });
    },
    loanPurposeCodeChange(_val, formNum) {
      this.$refs[`orgSpecialInfo${formNum}Form`][0].validateField('loanOtherPurpose');
      if (_val !== this.dCode.loanPurposeCode.other || _val !== this.dCode.loanPurposeCode.other1) {
        _val = '';
        this[`orgSpecialInfo${formNum}`].loanOtherPurpose = '';
      }
    },
    checkloanOtherPurpose1(rule, value, callback) {
      const reg = /^[\u4E00-\u9FA5]+$/;
      if ((this.orgSpecialInfo1.loanPurposeCode === this.dCode.loanPurposeCode.other || this.orgSpecialInfo1.loanPurposeCode === this.dCode.loanPurposeCode.other1) && !value) {
        callback(new Error('请填写其他贷款用途说明'));
      } else if ((this.orgSpecialInfo1.loanPurposeCode === this.dCode.loanPurposeCode.other || this.orgSpecialInfo1.loanPurposeCode === this.dCode.loanPurposeCode.other1) && !reg.test(value)) {
        callback(new Error('只能输入汉字'));
      } else {
        callback();
      }
    },
    checkloanOtherPurpose2(rule, value, callback) {
      const reg = /^[\u4E00-\u9FA5]+$/;
      if ((this.orgSpecialInfo2.loanPurposeCode === this.dCode.loanPurposeCode.other || this.orgSpecialInfo2.loanPurposeCode === this.dCode.loanPurposeCode.other1) && !value) {
        callback(new Error('请填写其他贷款用途说明'));
      } else if ((this.orgSpecialInfo2.loanPurposeCode === this.dCode.loanPurposeCode.other || this.orgSpecialInfo2.loanPurposeCode === this.dCode.loanPurposeCode.other1) && !reg.test(value)) {
        callback(new Error('只能输入汉字'));
      } else {
        callback();
      }
    }
  }
};
</script>

<style lang="less" scoped>
  .form__block.bg__white.border__radius-5 {
    text-align: left;
    form.el-form.demo-form-inline.el-form--label-top, /deep/ .special_form-page.special-form > form {
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      padding: 10px;
      > div {
        margin-right: 25px;
        /deep/ .el-input__inner {
          width: 217px;
        }
      }
    }
    /deep/ .special_form-page.special-form {
      margin-right: 0;
    }
  }
</style>
