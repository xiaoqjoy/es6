<template>
    <div class="bank-info__page dialog-box__middle-form">
      <div
        class="form__block bg__white border__radius-5"
        v-for="(bankInfo, index) in bankInfoList"
        :key="index"
      >
        <div class="dialog-box__middle-top">
          <h5 class="title"><span class="icon icon__gan"></span>ID{{bankInfo.sortNum}}收款账户信息</h5>
        </div>
        <div class="dialog-box__form__group margin-top__20" >
          <el-form :model="bankInfo"
                   label-width="100px"
                   class="demo-form-inline" label-position="top" >
            <el-form-item label="支付方式" prop="paymentModeCode" class="el-form-item__33" >
              <el-select
                disabled
                v-model="bankInfo.paymentModeCode"
                placeholder="请选择支付方式">
                <el-option
                  v-for="(item, index) in paymentModeCodeLibrary"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收款账户名称" prop="accountName" class="el-form-item__33" >
              <el-input
                disabled
                maxlength="20"
                v-model="bankInfo.accountName"
                placeholder="请填写收款账户户名"></el-input>
            </el-form-item>
            <el-form-item label="收款卡号/账户" prop="accountNum" class="el-form-item__33" >
              <el-input
                disabled
                v-model="bankInfo.accountNum"
                placeholder="请填写收款卡号/账户"></el-input>
            </el-form-item>
            <el-form-item label="开户行" prop="subbankName" class="el-form-item__33" >
              <el-input
                disabled
                v-model="bankInfo.subbankName"
                placeholder="请填写收款卡号/账户"></el-input>
            </el-form-item>
            <el-form-item label="收款行名称" prop="bankName" class="el-form-item__33" >
              <el-input
                disabled
                v-model="bankInfo.bankName"
                placeholder="请填写收款行名称"></el-input>
            </el-form-item>
            <el-form-item label="开户行行号" prop="subbankCode" class="el-form-item__33"  >
              <el-input
                disabled
                v-model="bankInfo.subbankCode"
                placeholder="请填写开户行行号"></el-input>
            </el-form-item>
            <el-form-item label="预留手机号" prop="mobileNum" class="el-form-item__33">
              <el-input
                disabled
                v-model="bankInfo.mobileNum"
                placeholder="请填写预留手机号"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div
        class="form__block bg__white border__radius-5 no_data"
        v-if="bankInfoList.length === 0"
      >
        <p class="text__center">~暂无数据</p>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import { spareApi } from '../../../js/server.js';
  export default{
    props: ['applicationId'],
    data() {
      return {
        paymentModeCodeLibrary: [],
        bankInfo: {},
        bankInfoList: []
      };
    },
    created() {
      this.getInfo();
      this.getSelectValue('payment_mode_code')
        .then((data) => {
          this.paymentModeCodeLibrary = data;
        });
    },
    methods: {
      getInfo() {
        this.$MyFetch.post(spareApi.solving.bankInfo.query + this.applicationId)
          .then((data) => {
            this.bankInfoList = data.cardInfoList;
            this.bankInfoList.forEach(v => {
              this.$set(v, 'mobileNum', v.mobileNum ? v.mobileNum : data.aplMobileNum);
              v.accountNum = v.accountNum.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
            });
          })
          .catch(err => {
            this.confirmFn(err.message);
          });
      },
      getSelectValue(name) {
        return new Promise((resolve) => {
          this.$MyFetch.get(spareApi.commonSelect, {categoryCode: name})
            .then((data = {}) => {
              resolve(data);
            })
            .catch(err => {
              console.log(err);
            });
        });
      }
    },
    components: {}
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
      box-shadow:  0 1px 10px 0 rgba(0,0,0,0.05);
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
