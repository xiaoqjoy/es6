<template>
  <div class="repay_account">
    <div class="form_top">
      <h5 class="title">
        <span class="icon icon__gan"></span>
        还款账号信息
      </h5>
    </div>
    <el-form ref="repayAccountForm" label-position="top"
      :model="repayAccountData" label-width="80px"
      :rules="repayAccountRules" :disabled="disabledInd">
      <el-form-item label="还款账户名称" prop="repaymentAccountName">
        <el-input v-model="repayAccountData.repaymentAccountName" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="还款卡号/账户" prop="repaymentAccountNum">
        <el-input v-model="repayAccountData.repaymentAccountNum" @blur="changeAccountNum"></el-input>
      </el-form-item>
      <el-form-item label="还款卡开户行" prop="repaymentBankName">
        <el-input v-model="repayAccountData.repaymentBankName" disabled></el-input>
      </el-form-item>
      <el-form-item label="还款行名称" prop="repaymentSubbankName">
        <el-input v-model="repayAccountData.repaymentSubbankName" disabled></el-input>
      </el-form-item>
      <el-form-item label="还款卡开户行行号" prop="repaymentSubbankCode">
        <el-input v-model="repayAccountData.repaymentSubbankCode" disabled></el-input>
      </el-form-item>
      <el-form-item label="预留手机号" prop="repaymentMobileNum">
        <el-input v-model="repayAccountData.repaymentMobileNum"></el-input>
      </el-form-item>
      <el-form-item v-if="!disabledInd">
        <el-button type="primary" class="width100" @click="checkBank">验证</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import myRules from '@common/js/rules.js';
import {spareApi} from '@system/spare/js/server';
export default {
  props: {
    disabledInd: {
      type: Boolean,
      default: false
    },
    repayAccountData: {
      type: Object,
      default: () => ({})
    },
    businessParms: {
      type: Object,
      default: () => {
        return {
          applicationId: '',
          productId: '',
          paymentModeCode: ''
        };
      }
    }
  },
  data() {
    return {
      msg: 'xxx',
      loading: false,
      // repayAccountData: {
      //   repaymentAccountName: '',
      //   repaymentAccountNum: '',
      //   repaymentBankCode: '',
      //   repaymentBankName: '宁波通商银行股份有限公司',
      //   repaymentSubbankCode: '313332090019',
      //   repaymentMobileNum: '',
      //   repaymentSubbankName: '城市商业银行(包括上海银行、宁波银行等城市银行)'
      // },
      repayAccountRules: {
        repaymentAccountName: [
          { required: true, message: '请填写还款账户名称', trigger: 'blur' }
        ],
        repaymentAccountNum: [
          { required: true, message: '请填写还款卡号/账户', trigger: 'blur' },
          { validator: (rule, value, callback) => {
              let val = value.replace(/\s/g, '');
              if (val.length < 10 || val.length > 20) {
                return callback(new Error('长度限制为 10 到 20 位！'));
              } else {
                return callback();
              }
          },
          trigger: 'blur' }
        ],
        repaymentMobileNum: [
          { required: true, message: '请填写预留手机号', trigger: 'blur' },
          { validator: myRules.phoneRule, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    init() {
      this.repayAccountData.repaymentMobileNum = this.repayAccountData.repaymentMobileNum || this.repayAccountData.ownMobileNum;
    },
    changeAccountNum() {
      let str = this.repayAccountData.repaymentAccountNum;
      this.repayAccountData.repaymentAccountNum = str.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    },
    checkBank() {
      let query = {
        accountName: this.repayAccountData.repaymentAccountName,
        accountNum: this.repayAccountData.repaymentAccountNum,
        applicationId: this.businessParms.applicationId,
        mobileNum: this.repayAccountData.repaymentMobileNum,
        productId: this.businessParms.productId,
        subbankName: this.repayAccountData.repaymentSubbankName, // 开户行
        subbankCode: this.repayAccountData.repaymentSubbankCode, // 开户行行号
        bankName: this.repayAccountData.repaymentBankName, // 总行名称
        bankCode: this.repayAccountData.repaymentBankCode, // 总行行号
        paymentModeCode: this.businessParms.paymentModeCode,
        bindingModeCode: 'PI_R'
      };
      this.$refs.repayAccountForm.validate(valid => {
        if (valid) {
          this.checkBankApi(query)
            .then(data => {
              this.confirmFn('验证成功！', 'success');
            });
        }
      });
    },
    checkBankApi(data) {
      this.loadingOpen();
      return new Promise((resolve) => {
        this.$MyFetch.post(spareApi.solving.bankInfo.check, data)
          .then(data => {
            this.loadingClose();
            resolve(data);
          })
          .catch(err => {
            this.loadingClose();
            this.confirmFn(err.message);
          });
      });
    },
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
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less">
  .repay_account {
    font-size: 14px;
    .form_top {
      margin-bottom: 15px;
    }
    form {
      display: flex;
      flex-wrap: wrap;
      > div {
        width: 33.3%;
        padding-right: 40px;
      }
    }
  }
</style>
