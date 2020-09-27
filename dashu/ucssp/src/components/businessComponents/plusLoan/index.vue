<template>
  <div class="puls_loan">
    <div>
      <div class="puls_loan_top">
        <h3>加成贷</h3>
        <el-form ref="plusLoanForm"
          :model="plusLoanMap"
          :rules="plusLoanRule"
          inline label-position="left"
          label-width="160px">
          <div class="plus_loan_first">
            <el-form-item label="大数初审结论" prop="firstApproveResultCode">
              <el-radio-group :disabled="externalDisabled" v-model="plusLoanMap.firstApproveResultCode" @change="changeFirstRes">
                <el-radio label="P">同意</el-radio>
                <el-radio label="D">否决</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="el-form-item">
              <el-button type="primary" size="mini" @click="sendEmail" :disabled="externalDisabled">发送审批结果</el-button>
              <span class="email_status">发送状态：</span>
              <span class="email_status">{{sendStatsMap[plusLoanMap.sendEmailStatusCode]}}</span>
            </div>
          </div>
          <div class="plus_loan_main" v-if="showMain">
            <div class="plus_loan_main_res">
              <el-form-item label="银行终审结论" prop="finalApproveResultCode">
                <el-radio-group v-model="plusLoanMap.finalApproveResultCode" @change="changeFinalApproveRes" :disabled="comeFrom !== 'pending' && externalDisabled">
                  <el-radio label="P">同意</el-radio>
                  <el-radio label="D">否决</el-radio>
                  <el-radio label="G">客户放弃</el-radio>
                </el-radio-group>
              </el-form-item>
            </div>
            <div class="plus_loan_main_top" v-if="plusLoanMap.finalApproveResultCode === 'P'">
              <div v-if="plusLoanType === '1'">
                <el-form-item label="银行一押授信金额（元）" prop="bankCreditAmt">
                  <el-input v-model="plusLoanMap.bankCreditAmt" minlength="6" maxlength="10" show-word-limit :disabled="comeFrom !== 'pending' && externalDisabled"></el-input>
                </el-form-item>
                <el-form-item label="银行一押贷款金额（元）" prop="bankLoanAmt">
                  <el-input v-model="plusLoanMap.bankLoanAmt" maxlength="10" show-word-limit :disabled="comeFrom !== 'pending' && externalDisabled"></el-input>
                </el-form-item>
                <el-form-item label="银行一押贷款年利率（%）" prop="bankAnnualRate">
                  <el-input v-model="plusLoanMap.bankAnnualRate" :disabled="comeFrom !== 'pending' && externalDisabled"></el-input>
                </el-form-item>
                <el-form-item label="银行一押还款方式" prop="bankRepaymentCd">
                  <el-select v-model="plusLoanMap.bankRepaymentCd" @change="backRepayChange" :disabled="comeFrom !== 'pending' && externalDisabled">
                    <el-option v-for="item in repaymentCdList"
                      :key="item.itemCode"
                      :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="银行一押贷款期限（年）" prop="bankMortgageTermYear">
                  <el-select v-model="plusLoanMap.bankMortgageTermYear" :disabled="comeFrom !== 'pending' && externalDisabled">
                    <el-option v-for="item in bankMortgageTermYearList()" :key="item"
                      :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="摊还期限（年）" prop="bankBalloonTermYear" v-if="showBankBalloonTermYear">
                  <el-select v-model="plusLoanMap.bankBalloonTermYear" :disabled="comeFrom !== 'pending' && externalDisabled">
                    <el-option v-for="item in bankMortgageTermYearList()" :key="item"
                      :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="加成贷授信金额（元）" prop="plusLoanCreditAmt">
                  <el-input v-model="plusLoanMap.plusLoanCreditAmt" maxlength="8" show-word-limit :disabled="comeFrom !== 'pending' && externalDisabled"></el-input>
                </el-form-item>
                <el-form-item label="加成贷款金额（元）" prop="plusLoanLoanAmt">
                  <el-input v-model="plusLoanMap.plusLoanLoanAmt" maxlength="8" show-word-limit :disabled="comeFrom !== 'pending' && externalDisabled"></el-input>
                </el-form-item>
                <el-form-item label="加成贷款年利率（%）" prop="plusLoanAnnualRate">
                  <el-input v-model="plusLoanMap.plusLoanAnnualRate" show-word-limit :disabled="comeFrom !== 'pending' && externalDisabled"></el-input>
                </el-form-item>
                <el-form-item label="加成贷还款方式" prop="plusLoanRepaymentCd">
                  <el-select v-model="plusLoanMap.plusLoanRepaymentCd" @change="plusLoanRepaymentChange" :disabled="comeFrom !== 'pending' && externalDisabled">
                    <el-option :key="item.optionCode"
                      v-for="item in plusLoanRepayments" :label="item.optionDesc" :value="item.optionCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="加成贷款期限（月）" prop="plusLoanMortgageTerm">
                  <el-select v-model="plusLoanMap.plusLoanMortgageTerm" :disabled="comeFrom !== 'pending' && externalDisabled">
                    <el-option
                      v-for="item in loanTerms" :key="item"
                    :label="item" :value="item"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="摊还期限（月）" prop="plusLoanBalloonTerm" v-if="showPlusLoanBalloonTerm">
                  <el-select v-model="plusLoanMap.plusLoanBalloonTerm" :disabled="comeFrom !== 'pending' && externalDisabled">
                    <el-option v-for="item in plusLoanBalloonTermList" :key="item.itemCode"
                      :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="还款卡账号" prop="paybackAccountNo">
                  <el-input v-model="plusLoanMap.paybackAccountNo" maxlength="20" show-word-limit :disabled="comeFrom !== 'pending' && externalDisabled"></el-input>
                </el-form-item>
                <el-form-item label="还款卡开户行" prop="paybackSubbankName">
                  <el-input v-model="plusLoanMap.paybackSubbankName" maxlength="30" show-word-limit :disabled="comeFrom !== 'pending' && externalDisabled"></el-input>
                </el-form-item>
                <div class="el-form-item">
                  <div class="guarantor_wrapper" v-for="(item, index) in guarantors" :key="index">
                    <label class="guarantor el-form-item__label" :for="'guarantor' + index">
                      保证人
                    </label><div class="el-form-item__content">
                      <input type="text" class="el-input__inner" v-model="guarantors[index]"  maxlength="30" show-word-limit :disabled="comeFrom !== 'pending' && externalDisabled">
                    </div>
                    <i class="icon icon_position_bottom el-icon-plus cursor__pointer" @click="addGuarantor" v-if="index + 1 === guarantors.length"></i>
                    <i class="icon icon_position_bottom el-icon-minus cursor__pointer" @click="removeGuarantor(index)" v-if="guarantors.length > 1"></i>
                    <span>
                    </span>
                  </div>
                </div>
                <el-form-item label="加成贷借款合同编号" prop="plusLoanContractNum">
                  <el-input v-model="plusLoanMap.plusLoanContractNum" maxlength="50" show-word-limit :disabled="comeFrom !== 'pending' && externalDisabled"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
        <!-- <div>
          <el-button type="primary" @click="formValidate">formValidate</el-button>
        </div> -->
      </div>
    </div>
    <submitPrompt
      v-if="necessityTips"
      :applicationId="applicationId"
      @clsoe_windowAlert="necessityTips = false"
      @sendStatusFn="catchSendStatus"
      :submitOper="submitOper"
      :isSuper="aplRiskPara.switchHighScoreInd"
      :firstApproveResultCode="plusLoanMap.firstApproveResultCode"
    />
  </div>
</template>

<script>
import myRule from '@common/js/rules';
import {plusLoanApi} from '@system/approvalAudit/js/server.js';
import {baseApi} from '@common/js/server.js';
import submitPrompt from "./submitPrompt"; // 提交
export default {
  props: {
    plusLoanType: {
      type: [String, Object],
      default: '' // 默认加成贷
    },
    applicationId: {
      type: String,
      default: ''
    },
    aplRiskPara: {
      type: Object,
      default: () => ({})
    },
    externalDisabled: {
      type: Boolean,
      default: false
    },
    // 页面跳转来源，默认为noPending，为不可编辑跳转过来，pending为可编辑跳来
    comeFrom: {
      type: String,
      default: 'noPending'
    }
  },
  data() {
    return {
      plusLoanMapJson: '',
      sendStatsMap: {
        wait_to_send: '待发送',
        send_success: '发送成功',
        send_fail: '发送失败'
      },
      plusEmailStatus: false,
      submitOper: {
        firstApproveResultCode: '',
        finalApproveResultCode: '',
        bankCreditAmt: '',
        bankLoanAmt: '',
        bankRepaymentCd: '',
        bankMortgageTermYear: '',
        bankBalloonTermYear: '',
        plusLoanCreditAmt: '',
        plusLoanLoanAmt: '',
        bankAnnualRate: '',
        plusLoanRepaymentCd: '',
        plusLoanMortgageTerm: '',
        plusLoanContractNum: '',
        plusLoanBalloonTerm: '',
        paybackSubbankName: '',
        paybackAccountNo: ''
      },
      showMain: false,
      necessityTips: false,
      showBankBalloonTermYear: false,
      showPlusLoanBalloonTerm: false,
      repaymentCdList: [],
      plusLoanBalloonTermList: [],
      loanTerms: [],
      plusLoanRepayments: [], // 加成贷还款方式下拉框
      guarantors: [''],
      plusLoanMap: {},
      plusLoanRule: {
        firstApproveResultCode: [
          { required: true, message: '请先勾选初审结论' }
        ],
        finalApproveResultCode: [
          { required: true, message: '请先勾选银行终审结论' }
        ],
        bankCreditAmt: [
          { required: true, message: '请填写银行一押授信金额（元）', trigger: 'blur' },
          { validator: myRule.nonNegative2, trigger: 'blur' },
          { validator: this.moneyValidate, trigger: 'blur' }
        ],
        bankLoanAmt: [
          { required: true, message: '请填写银行一押贷款金额（元）', trigger: 'blur' },
          { validator: myRule.nonNegative2, trigger: 'blur' },
          { validator: this.moneyValidate, trigger: 'blur' }
        ],
        bankRepaymentCd: [
          { required: true, message: '请填写银行一押还款方式', trigger: 'change' }
        ],
        bankMortgageTermYear: [
          { required: true, message: '请选择银行一押贷款期限（年）', trigger: 'change' }
        ],
        bankBalloonTermYear: [
          { required: true, message: '请选择摊还期限（年）', trigger: 'change' }
        ],
        plusLoanCreditAmt: [
          { required: true, message: '请填写加成贷授信金额（元）', trigger: 'blur' },
          { validator: myRule.nonNegative2, trigger: 'blur' },
          { validator: this.moneyValidate, trigger: 'blur' }
        ],
        plusLoanLoanAmt: [
          { required: true, message: '请填写加成贷款金额（元）', trigger: 'blur' },
          { validator: myRule.nonNegative2, trigger: 'blur' },
          { validator: this.moneyValidate, trigger: 'blur' }
        ],
        bankAnnualRate: [
          { required: true, message: '请填写银行一押贷款年利率（%）', trigger: 'blur' },
          { validator: this.rateLimit, trigger: 'blur' },
          { validator: myRule.numSixBit, trigger: 'blur' }
        ],
        plusLoanAnnualRate: [
          { required: true, message: '请填写加成贷款年利率（%）', trigger: 'blur' },
          { validator: this.rateLimit, trigger: 'blur' },
          { validator: myRule.numSixBit, trigger: 'blur' }
        ],
        plusLoanRepaymentCd: [
          { required: true, message: '请选择加成贷还款方式', trigger: 'change' }
        ],
        plusLoanMortgageTerm: [
          { required: true, message: '请选择加成贷款期限（月）', trigger: 'change' }
        ],
        plusLoanBalloonTerm: [
          { required: true, message: '请选择摊还期限（月）', trigger: 'change' }
        ],
        paybackAccountNo: [
          { required: true, message: '请填写还款卡账号', trigger: 'blur' },
          { validator: myRule.nonNegative2, trigger: 'blur' }
        ],
        paybackSubbankName: [
          { required: true, message: '请填写还款卡开户行', trigger: 'blur' }
        ],
        plusLoanContractNum: [
          { required: true, message: '请填写加成贷借款合同编号', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    loadingOpen() {
      this.loading = this.$loading({
        lock: true,
        text: '处理中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    loadingClose() {
      this.loading && this.loading.close();
    },
    bankMortgageTermYearList() {
      let list = [];
      for (let i = 1; i <= 20; i++) {
        list.push(i);
      }
      return list;
    },
    formValidate() {
      console.log(this.plusLoanMap);
      window.opener.location.reload();
      let flag = false;
      this.$refs.plusLoanForm.validate((valid) => {
        flag = valid;
      });
      return flag;
    },
    moneyValidate(rule, value, callback) {
      // 校验录入金额需≥10万
      if (!!value && value.length < 6) {
        return callback(new Error('金额不得小于10万'));
      } else {
        callback();
      }
    },
    rateLimit(rule, value, callback) {
      if (!!value && (value > 100)) {
        return callback(new Error('利率不得大于100'));
      } else {
        callback();
      }
    },
    changeFinalApproveRes(_v) {
      let list = [
        'bankCreditAmt',
        'bankLoanAmt',
        'bankRepaymentCd',
        'bankMortgageTermYear',
        'bankBalloonTermYear',
        'plusLoanCreditAmt',
        'plusLoanLoanAmt',
        'bankAnnualRate',
        'plusLoanRepaymentCd',
        'plusLoanAnnualRate',
        'plusLoanBalloonTerm',
        'paybackAccountNo',
        'paybackSubbankName',
        'plusLoanContractNum',
        'plusLoanMortgageTerm'
      ];
      if (_v !== 'P') {
        // this.plusLoanMapJson = JSON.stringify(this.plusLoanMap);
        list.forEach(item => {
          this.plusLoanMap[item] = '';
        });
        this.plusLoanMap.guarantors = [];
        this.guarantors = [''];
      } else {
        // if (this.plusLoanMapJson) {
        //   this.plusLoanMap = JSON.parse(this.plusLoanMapJson);
        // }
      }
    },
    queryPlusLoanInfo(applicationId) {
      // /plusLoan/plusloanInfo/
      this.$MyFetch.get(plusLoanApi.queryPlusLoanInfo + applicationId)
        .then(_data => {
          // 去掉金额中的.00
          _data.bankCreditAmt = _data.bankCreditAmt ? parseInt(_data.bankCreditAmt) : _data.bankCreditAmt;
          _data.bankLoanAmt = _data.bankLoanAmt ? parseInt(_data.bankLoanAmt) : _data.bankLoanAmt;
          _data.plusLoanCreditAmt = _data.plusLoanCreditAmt ? parseInt(_data.plusLoanCreditAmt) : _data.plusLoanCreditAmt;
          _data.plusLoanLoanAmt = _data.plusLoanLoanAmt ? parseInt(_data.plusLoanLoanAmt) : _data.plusLoanLoanAmt;
          _data.bankAnnualRate = _data.bankAnnualRate ? parseFloat(_data.bankAnnualRate) : _data.bankAnnualRate;
          _data.plusLoanAnnualRate = _data.plusLoanAnnualRate ? parseFloat(_data.plusLoanAnnualRate) : _data.plusLoanAnnualRate;
          this.plusLoanMap = _data;
          this.plusLoanMap.applicationId = this.applicationId;
          // 加成贷还款方式下拉
          this.plusLoanRepayments = _data.plusLoanRepayments;
          // 加成贷款期限（月）下拉
          this.loanTerms = _data.loanTerms || [];
          this.plusEmailStatus = this.plusLoanMap.sendEmailStatusCode === 'send_success';
          this.$emit('plusEmailStatusFn', this.plusLoanMap.sendEmailStatusCode);
          this.showMain = this.plusEmailStatus && (this.plusLoanMap.firstApproveResultCode === 'P');
          this.guarantors = _data.guarantors.length > 0 ? _data.guarantors : [''];
          // this.changeResultCode(_data.finalApproveResultCode);
          this.$nextTick(() => {
            this.$refs.plusLoanForm.clearValidate();
          });
        }).catch(_err => {
          this.$error(_err.message);
        });
    },
    sendEmail() {
      this.$refs.plusLoanForm.validateField('firstApproveResultCode', (valid) => {
        if (!valid) {
          this.loadingOpen();
          this.$MyFetch.post(plusLoanApi.sendEmail, {
            applicationId: this.applicationId,
            firstApproveResultCode: this.plusLoanMap.firstApproveResultCode
          }).then(_data => {
            _data.firstApproveResultCode = this.plusLoanMap.firstApproveResultCode;
            this.submitOper = _data;
            this.necessityTips = true;
            this.loadingClose();
          }).catch(_err => {
            this.$error(_err.message);
            this.loadingClose();
          });
          // setTimeout(() => {
          //   this.plusEmailStatus = false;
          //   this.showMain = true;
          //   this.$emit('plusEmailStatusFn', this.plusEmailStatus);
          // }, 1000);
        }
      });
    },
    catchSendStatus(_data) {
      this.showMain = _data.status && (this.plusLoanMap.firstApproveResultCode === 'P');
      this.$emit('plusEmailStatusFn', _data.sendEmailStatusCode);
      this.$set(this.plusLoanMap, 'sendEmailStatusCode', _data.sendEmailStatusCode);
    },
    addGuarantor() {
      //  :disabled="plusEmailStatus && externalDisabled"
      if (this.comeFrom !== 'pending' && this.externalDisabled) return;
      this.guarantors.push('');
    },
    backRepayChange(_value) {
      this.showBankBalloonTermYear = _value === '6';
    },
    plusLoanRepaymentChange(_value) {
      this.showPlusLoanBalloonTerm = _value === '6';
    },
    removeGuarantor(index) {
      if (this.comeFrom !== 'pending' && this.externalDisabled) return;
      this.$confirm('是否删除该条信息', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.guarantors.splice(index, 1);
      }).catch(() => {});
    },
    changeFirstRes(_res) {
      // 否决可以父组件可提交 or 同意而且邮件发送成功可提交
      // let status = _res === 'D' && (_res === 'P' && this.plusEmailStatus);
      // this.$emit('plusEmailStatusFn', status);
    },
    // changeResultCode(_res) {
    //   let list = [
    //     'bankCreditAmt',
    //     'bankLoanAmt',
    //     'bankRepaymentCd',
    //     'bankMortgageTermYear',
    //     'bankBalloonTermYear',
    //     'plusLoanCreditAmt',
    //     'plusLoanLoanAmt',
    //     'bankAnnualRate',
    //     'plusLoanRepaymentCd',
    //     'plusLoanBalloonTerm',
    //     'paybackAccountNo',
    //     'paybackSubbankName',
    //     'plusLoanContractNum',
    //     'plusLoanMortgageTerm'
    //   ];
    //   let form = {form: 'plusLoanForm', rule: 'plusLoanRule', model: 'plusLoanMap'};
    //   this.changeRequire(_res === 'P', form, list);
    // },
    // changeRequire(_flag, formConfig, keyList = []) {
    //   let rule = formConfig.rule;
    //   let form = formConfig.form;
    //   // let model = formConfig.model;
    //   if (keyList instanceof Array && keyList.length > 0) {
    //     for (let i = 0; i < keyList.length; i++) {
    //       this[rule][keyList[i]][0].required = _flag;
    //       if (!_flag) {
    //         // 去掉校验提示
    //         this.$refs[form].clearValidate(keyList[i]);
    //       }
    //     }
    //   }
    // },
    // 获取多个下拉项
    getMultipleLibrary(isReadonly = false) {
      let data = {
        categoryCodes: ['payment_method', 'plus_loan_balloon_term'],
        getAll: isReadonly
      };
      this.$MyFetch.get(baseApi.multipleSelect, data).then(_data => {
        this.repaymentCdList = _data.payment_method;
        this.plusLoanBalloonTermList = _data.plus_loan_balloon_term;
      }).catch(_err => {
        this.$error(_err.message);
      });
    }
  },
  created() {
    this.queryPlusLoanInfo(this.applicationId);
    this.getMultipleLibrary(this.externalDisabled);
  },
  components: {
    submitPrompt
  },
  watch: {
    guarantors: {
      handler: function(newVal, oldVal) {
        this.plusLoanMap.guarantors = newVal;
      }
    }
  },
  computed: {
    plusLoanRealConfig() {
      return this.plusLoanConfig;
    }
  }
};
</script>
<style lang="less">
  .puls_loan {
    padding: 10px 30px;
    .puls_loan_top {
      text-align: left;
      h3 {
        font-weight: 700;
        margin-bottom: 10px;
      }
    }
    .el-form {
      .plus_loan_first {
        display: flex;
        background-color: rgba(242, 242, 242, 0.6);
        .el-form-item {
          margin-bottom: 0px;
          display: flex;
          align-items: center;
          .email_status {
            font-size: 14px;
            padding: 0 5px;
          }
          .el-form-item__error {
            top: 64%;
          }
          label {
            line-height: 40px;
          }
        }
        > div:first-child {
          flex-basis: 20%;
        }
        > div:last-child {
          flex-basis: 50%;
        }
      }
      .plus_loan_main {
        .plus_loan_main_res {
          .el-form-item {
            display: flex;
            align-items: center;
          }
        }
        .plus_loan_main_top > div {
          display: flex;
          flex-wrap: wrap;
          > div.el-form-item {
            flex-basis: 33%;
            .guarantor_wrapper {
              margin-bottom: 10px;
            }
            label.guarantor {
              width: 160px;
            }
            .icon.icon_position_bottom {
              vertical-align: bottom;
            }
          }
          .el-form-item__content {
            width: 220px;
            > .el-select {
              width: 100%;
            }
          }
        }
      }
    }
  }
</style>
