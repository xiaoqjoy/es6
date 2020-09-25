<template>
  <div class="receive_account">
    <div class="form_top">
      <h5 class="title"><span class="icon icon__gan"></span> 收款账户信息</h5>
    </div>
    <el-form
      ref="receiveAccountForm"
      label-position="top"
      class="demo-form-inline"
      label-width="80px"
      :model="receiveAccountData"
      :rules="repayAccountRules"
      :disabled="disabled"
    >
      <el-form-item label="是否为公司账户" prop="isCompanyAccount" class="el-form-item__33">
        <el-select v-model="receiveAccountData.isCompanyAccount" placeholder="请选择" @change="onChange">
          <el-option label="否" :value="false"></el-option>
          <el-option label="是" :value="true"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收款账户名称" prop="repaymentAccountName" class="el-form-item__33">
        <el-input v-model="receiveAccountData.repaymentAccountName" maxlength="30"></el-input>
      </el-form-item>
      <el-form-item label="收款卡号/账户" prop="repaymentAccountNum" class="el-form-item__33">
        <el-input v-model="receiveAccountData.repaymentAccountNum" maxlength="20" @blur="changeAccountNum" @focus="onAccountNumFocus"></el-input>
      </el-form-item>
      <el-form-item label="收款卡开户行" prop="repaymentBankName" class="el-form-item__33">
        <DBankPicker
          refName="receiveBank"
          :disabled="disabled"
          :title="receiveBankName"
          :api="bankPickerApi"
          :productId="receiveAccountData.productId"
          :applicationId="applicationId"
          @change="onReceiveBankChange"></DBankPicker>
      </el-form-item>
      <el-form-item label="收款卡行名称" prop="repaymentSubbankName" class="el-form-item__33">
        <el-input v-model="receiveAccountData.repaymentSubbankName" disabled></el-input>
      </el-form-item>
      <el-form-item label="收款卡开户行行号" prop="repaymentSubbankCode" class="el-form-item__33">
        <el-input v-model="receiveAccountData.repaymentSubbankCode" disabled></el-input>
      </el-form-item>
      <el-form-item label="预留手机号" prop="repaymentMobileNum" class="el-form-item__33">
        <el-input v-model="receiveAccountData.repaymentMobileNum"></el-input>
      </el-form-item>
      <el-form-item v-if="!disabled" label="" class="el-form-item__33" style="margin-top: 25px;">
        <el-button class="width100 button-defaul" style="border: 1px solid #538BF1;color:#538BF1;" @click="checkBank">验证</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { spareApi } from '@system/spare/js/server.js';
import DBankPicker from '@components/DBankPicker';
import myRules from '@common/js/rules.js';
import { setCursorsPosition } from '@common/js/util.js';

// 这个组件专门用于收款账户，因为原来只有还款账户，后来一个bankInfo对象里面
// 既包含收款账户又包含还款账户， 用字段区分，但是收款账户信息还是存在还款字段里面
// yapi: http://yapi.dashuf.com/project/30/interface/api/23351
export default {
  components: { DBankPicker },
  props: {
    receiveAccountData: {
      type: Object,
      default: () => ({})
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    applicationId: {
      type: String,
      default: ''
    },
    productId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      repayAccountRules: {
        repaymentAccountName: [
          { required: true, message: '请填写收款账户名称', trigger: 'blur' },
          { validator: myRules.nameRule, trigger: 'blur' }
        ],
        repaymentAccountNum: [
          { required: true, message: '请填写收款卡号/账户', trigger: 'blur' },
          { validator: myRules.bankCountRule, trigger: 'blur' }
        ],
        repaymentMobileNum: [
          { required: true, message: '请填写预留手机号', trigger: 'blur' },
          { validator: myRules.phoneRule, trigger: 'blur' }
        ],
        repaymentSubbankName: [{ required: true, message: '选择开户行后自动带出', trigger: 'blur' }],
        repaymentSubbankCode: [{ required: true, message: '选择开户行后自动带出', trigger: 'blur' }]
      },
      bankPickerApi: spareApi.solving.bankInfo.list,
      receiveBankName: ''
    };
  },
  mounted() {
    this.receiveAccountData.repaymentMobileNum = this.receiveAccountData.repaymentMobileNum || this.repayAccountData.ownMobileNum;
    this.receiveBankName = this.receiveAccountData.repaymentBankName;
    this.$forceUpdate();
  },
  methods: {
    ...mapActions("bankInfo", ["fetchCheckBankInfo"]),
    changeAccountNum() {
      let str = this.receiveAccountData.repaymentAccountNum;
      this.receiveAccountData.repaymentAccountNum = str.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    },
    onAccountNumFocus(e) {
      this.receiveAccountData.repaymentAccountNum = this.receiveAccountData.repaymentAccountNum.replace(/\s/g, '');
      if (e && e.target) {
        setCursorsPosition(e.target, this.receiveAccountData.repaymentAccountNum.length);
      }
    },
    async checkBank() {
      if (typeof this.receiveAccountData.isCompanyAccount !== 'boolean') {
        this.confirmFn('请选择是否为公司账户');
        return;
      }
      let query = {
        isCompanyAccount: this.receiveAccountData.isCompanyAccount,
        accountName: this.receiveAccountData.repaymentAccountName,
        accountNum: this.receiveAccountData.repaymentAccountNum,
        applicationId: this.applicationId,
        mobileNum: this.receiveAccountData.repaymentMobileNum,
        productId: this.productId,
        subbankName: this.receiveAccountData.repaymentSubbankName, // 开户行
        subbankCode: this.receiveAccountData.repaymentSubbankCode, // 开户行行号
        bankName: this.receiveAccountData.repaymentBankName, // 总行名称
        bankCode: this.receiveAccountData.repaymentBankCode, // 总行行号
        paymentModeCode: this.receiveAccountData.paymentModeCode,
        bindingModeCode: 'EP_C'
      };
      const valid = await this.$refs.receiveAccountForm.validate();
      if (valid) {
        this.loadingOpen();
        const { success, errorMsg } = await this.fetchCheckBankInfo(query);
        this.loadingClose();
        if (success) {
          this.confirmFn('验证成功！', 'success');
        } else {
          this.confirmFn(errorMsg);
        }
      }
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
    },
    onChange(value) {
      this.$forceUpdate();
    },
    onReceiveBankChange({ bankName, bankCode, parentBankName, parentBankCode }) {
      this.receiveAccountData.repaymentSubbankName = bankName; // 开户行
      this.receiveAccountData.repaymentSubbankCode = bankCode; // 开户行行号
      this.receiveAccountData.repaymentBankName = parentBankName; // 收款行名称
      this.receiveAccountData.repaymentBankCode = parentBankCode; // 收款行行号
      this.receiveBankName = parentBankName;
    }
  }
};
</script>

<style lang="less">
  .receive_account {
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
