<template>
    <div class="bank-info__page dialog-box__middle-form">
      <div
        v-for="(bankInfo, index) in bankInfoList"
        class="form__block bg__white border__radius-5"
        :key="index"
      >
        <div class="dialog-box__middle-top">
          <h5 class="title"><span class="icon icon__gan"></span>ID{{bankInfo.sortNum}}收款账户信息</h5>
        </div>
        <div class="dialog-box__form__group margin-top__20" >
          <el-form :model="bankInfo" label-width="100px" class="demo-form-inline" label-position="top" >
            <el-form-item label="支付方式" prop="paymentModeCode" class="el-form-item__33" >
              <DQuerySelect v-model="bankInfo.paymentModeCode" alias="payment_mode_code" :disabled="true"></DQuerySelect>
            </el-form-item>
            <el-form-item :label="labelMap[index].accountNameLabel" prop="accountName" class="el-form-item__33" >
              <el-input v-model="bankInfo.accountName" disabled maxlength="20" placeholder="请填写收款账户户名"></el-input>
            </el-form-item>
            <el-form-item :label="labelMap[index].accountNumLabel" prop="accountNum" class="el-form-item__33" >
              <el-input v-model="bankInfo.accountNum" disabled placeholder="请填写收款卡号/账户"></el-input>
            </el-form-item>
            <el-form-item :label="labelMap[index].subbankNameLabel" prop="subbankName" class="el-form-item__33" >
              <el-input v-model="bankInfo.subbankName" disabled placeholder="请填写收款卡号/账户"></el-input>
            </el-form-item>
            <el-form-item :label="labelMap[index].bankNameLabel" prop="bankName" class="el-form-item__33" >
              <el-input v-model="bankInfo.bankName" disabled placeholder="请填写收款行名称"></el-input>
            </el-form-item>
            <el-form-item :label="labelMap[index].subbankCodeLabel" prop="subbankCode" class="el-form-item__33"  >
              <el-input v-model="bankInfo.subbankCode" disabled placeholder="请填写开户行行号"></el-input>
            </el-form-item>
            <el-form-item :label="labelMap[index].mobileNumLabel" prop="mobileNum" class="el-form-item__33">
              <el-input v-model="bankInfo.mobileNum" disabled placeholder="请填写预留手机号"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <template v-if="bankInfo.bindingModeCodeR === 'EP_C'">
          <receive-account
            v-show="bankInfo.paymentModeCode === '1'"
            :receiveAccountData="bankInfo"
            :businessParms="businessParms"
            :disabled="true"
          ></receive-account>
        </template>
        <template v-else>
          <repay-account
            v-if="bankInfo.showPayAccountInd"
            ref="repayAccount1"
            :businessParms="businessParms"
            :repayAccountData="bankInfo"
            :disabledInd="true">
          </repay-account>
        </template>
      </div>
      <div v-if="bankInfoList.length === 0" class="form__block bg__white border__radius-5 no_data">
        <p class="text__center">~暂无数据</p>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import { mapActions } from 'vuex';
  import repayAccount from '@components/businessComponents/repayAccount';
  import receiveAccount from '@components/businessComponents/receiveAccount';
  import DQuerySelect from '@components/DQuerySelect';

  export default {
    components: { repayAccount, receiveAccount, DQuerySelect },
    props: ['applicationId'],
    data() {
      const labelName = {
        accountNameLabel: '收款账户名称',
        accountNumLabel: '收款卡号/账户',
        subbankNameLabel: '开户行',
        bankNameLabel: '收款行名称',
        subbankCodeLabel: '开户行行号',
        mobileNumLabel: '预留手机号'
      };
      return {
        labelMap: [labelName, labelName],
        bankInfo: {},
        bankInfoList: []
      };
    },
    created() {
      this.getInfo();
    },
    computed: {
      businessParms() {
        const { productId, paymentModeCode } = this.bankInfo;
        return { applicationId: this.applicationId, productId, paymentModeCode };
      }
    },
    methods: {
      ...mapActions('bankInfo', ['fetchQueryBankCardList']),
      async getInfo() {
        const map = {
          accountNameLabel: '绑定电子户的实体卡户名',
          accountNumLabel: '绑定电子户的实体卡卡号/账号',
          subbankNameLabel: '绑定电子户的实体卡开户行',
          bankNameLabel: '绑定电子户的实体卡银行名称',
          subbankCodeLabel: '绑定电子户的实体卡银行行号',
          mobileNumLabel: '绑定电子户的实体卡预留手机号'
        };
        const { cardInfoList, aplMobileNum } = await this.fetchQueryBankCardList({ applicationId: this.applicationId });
        this.bankInfoList = cardInfoList;
        this.bankInfoList.forEach(v => {
          this.$set(v, 'mobileNum', v.mobileNum ? v.mobileNum : aplMobileNum);
          if (v.accountNum) {
            v.accountNum = v.accountNum.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
          }
          if (v.showElectronicAccountDescInd) {
            this.labelMap[v.sortNum - 1] = map;
          }
          if (v.repaymentCardInd && v.paymentModeCode === '1') {
            v.showPayAccountInd = true;
          }
        });
      }
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .bank-info__page{
    height: 542px;
    overflow-y: auto;
    padding: 0 20px;
    .form__block{
      padding: 20px 30px;
      margin-bottom: 20px;
      box-shadow: 0 2px 6px 0 #d0d0d0;
      .dialog-box__middle-top{
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid  #E9E9E9;
        .title{
          font-size: 16px;
          .icon__gan{
            margin-right: 10px;
          }
        }
      }
      .message__list{
        .item{
          margin-right: 60px;
          padding-bottom: 20px;
          font-size: 0;
          .title{
            display: inline-block;
            margin-right: 5px;
            font-size: 14px;
            color: #666;
          }
          .content{
            font-size: 14px;
            display: inline-block;
          }
        }
        .item:last-child{
          margin-right: 0;
        }
      }
      .dialog-box__form__group{
        margin-right: -40px;
        font-size:0;
      }
    }
    .no_data{
      font-size: 16px;
      line-height: 200px;
    }
  }
</style>

<style lang="less">
  .bank-info__page.dialog-box__middle-form {
    .repay_account {
      .el-form .el-form-item{
        margin-right: 0;
      }
    }
  }
</style>
