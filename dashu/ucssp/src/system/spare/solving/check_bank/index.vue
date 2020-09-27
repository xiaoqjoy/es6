<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title bg__white">收款账户信息管理</h5>
        <span class="el-icon-close button button__close" @click="onClose"></span>
      </div>
      <div class="dialog-box__middle">
        <div class="top">
          <el-tabs v-model="activeName">
            <el-tab-pane v-if="bankInfo1.productId" label="ID1收款账户信息" name="first">ID1收款账户信息{{bankInfo1.productId}}</el-tab-pane>
            <el-tab-pane v-if="bankInfo2.productId" label="ID2收款账户信息" name="second">ID2收款账户信息{{bankInfo2.productId}}</el-tab-pane>
          </el-tabs>
        </div>
        <div class="middle">
          <el-form
            v-show="activeName === 'first'"
            ref="bankInfo1Form"
            label-width="100px"
            class="demo-form-inline"
            label-position="top"
            :model="bankInfo1"
            :rules="bankInfoRule1"
          >
            <el-form-item label="支付方式" prop="paymentModeCode" class="el-form-item__33" >
              <DQuerySelect
                v-model="bankInfo1.paymentModeCode"
                placeholder="请选择支付方式"
                alias="payment_mode_code"
                :disabled="bankInfo1.paymentModeDefaultInd"
                @change="showPayAccount(bankInfo1.paymentModeCode, 0)">
              </DQuerySelect>
            </el-form-item>
            <el-form-item :label="labelMap[0].accountNameLabel" prop="accountName" class="el-form-item__33" >
              <el-input v-model="bankInfo1.accountName" maxlength="30" placeholder="请填写收款账户户名"></el-input>
            </el-form-item>
            <el-form-item :label="labelMap[0].accountNumLabel" prop="accountNum" class="el-form-item__33" >
              <el-input v-model="bankInfo1.accountNum" @change="changeAccountNum1" placeholder="请填写收款卡号/账户"></el-input>
            </el-form-item>
            <div class="drop__select-box el-form-item__33">
              <p class="lab"><span class="icon icon__star">*</span>{{labelMap[0].subbankNameLabel}}</p>
              <DBankPicker
                refName="bank1Form"
                :title="bankInfo1.subbankName"
                :api="bankPickerApi"
                :productId="bankInfo1.productId"
                :applicationId="applicationId"
                @change="data => onRepayBankChange(data, 'bankInfo1')"></DBankPicker>
            </div>
            <el-form-item :label="labelMap[0].bankNameLabel" prop="bankName" class="el-form-item__33" >
              <el-input v-model="bankInfo1.bankName" readonly placeholder="请填写收款行名称"></el-input>
            </el-form-item>
            <el-form-item :label="labelMap[0].subbankCodeLabel" prop="subbankCode" class="el-form-item__33"  >
              <el-input v-model="bankInfo1.subbankCode" readonly placeholder="请填写开户行行号"></el-input>
            </el-form-item>
            <el-form-item :label="labelMap[0].mobileNumLabel" prop="mobileNum" class="el-form-item__33">
              <el-input v-model="bankInfo1.mobileNum" placeholder="请填写预留手机号"></el-input>
            </el-form-item>
            <el-form-item  class="el-form-item__33" style="margin-top: 25px;">
              <el-button type="primary" class="button button__blue width100" @click="checkBankInfo('bankInfo1')">验证</el-button>
            </el-form-item>
            <template v-if="bankInfo1.bindingModeCodeR === 'EP_C'">
              <receive-account
                v-if="bankInfo1.paymentModeCode === '1'"
                ref="receiveAccount1"
                :receiveAccountData="bankInfo1"
                :productId="bankInfo1.productId"
                :applicationId="applicationId"
              ></receive-account>
            </template>
            <template v-else>
              <repay-account
                v-if="bankInfo1.showPayAccountInd"
                ref="repayAccount1"
                :repayAccountData="bankInfo1"
                :businessParms="businessParms1">
              </repay-account>
            </template>
          </el-form>
          <el-form
            v-show="activeName === 'second'"
            ref="bankInfo2Form"
            :model="bankInfo2"
            :rules="bankInfoRule2"
            label-width="100px"
            class="demo-form-inline"
            label-position="top">
            <el-form-item label="支付方式" prop="paymentModeCode" class="el-form-item__33" >
              <DQuerySelect
                v-model="bankInfo2.paymentModeCode"
                placeholder="请选择支付方式"
                alias="payment_mode_code"
                :disabled="bankInfo2.paymentModeDefaultInd"
                @change="showPayAccount(bankInfo2.paymentModeCode, 1)">
              </DQuerySelect>
            </el-form-item>
            <el-form-item :label="labelMap[1].accountNameLabel" prop="accountName" class="el-form-item__33" >
              <el-input maxlength="30" v-model="bankInfo2.accountName" placeholder="请填写收款账户户名"></el-input>
            </el-form-item>
            <el-form-item :label="labelMap[1].accountNumLabel" prop="accountNum" class="el-form-item__33" >
              <el-input v-model="bankInfo2.accountNum" placeholder="请填写收款卡号/账户" @change="changeAccountNum2"></el-input>
            </el-form-item>
            <div class="drop__select-box el-form-item__33">
              <p class="lab"><span class="icon icon__star">*</span>{{labelMap[1].subbankNameLabel}}</p>
              <DBankPicker
                refName="bank1Form"
                :title="bankInfo2.subbankName"
                :api="bankPickerApi"
                :productId="bankInfo2.productId"
                :applicationId="applicationId"
                @change="data => onRepayBankChange(data, 'bankInfo2')"></DBankPicker>
            </div>
            <el-form-item :label="labelMap[1].bankNameLabel" prop="bankName" class="el-form-item__33" >
              <el-input v-model="bankInfo2.bankName" readonly placeholder="请填写收款行名称"></el-input>
            </el-form-item>
            <el-form-item :label="labelMap[1].subbankCodeLabel" prop="subbankCode" class="el-form-item__33"  >
              <el-input v-model="bankInfo2.subbankCode" readonly placeholder="请填写开户行行号"></el-input>
            </el-form-item>
            <el-form-item :label="labelMap[1].mobileNumLabel" prop="mobileNum" class="el-form-item__33">
              <el-input v-model="bankInfo2.mobileNum" placeholder="请填写预留手机号"></el-input>
            </el-form-item>
            <el-form-item class="el-form-item__33" style="margin-top: 25px;">
              <el-button type="primary" class="button button__blue width100" @click="checkBankInfo('bankInfo2')">验证</el-button>
            </el-form-item>
            <template v-if="bankInfo2.bindingModeCodeR === 'EP_C'">
              <receive-account
                v-if="bankInfo2.paymentModeCode === '1'"
                ref="receiveAccount2"
                :receiveAccountData="bankInfo2"
                :productId="bankInfo2.productId"
                :applicationId="applicationId"
              ></receive-account>
            </template>
            <template v-else>
              <repay-account
                v-if="bankInfo2.showPayAccountInd"
                ref="repayAccount2"
                :repayAccountData="bankInfo2"
                :businessParms="businessParms2">
              </repay-account>
            </template>
          </el-form>
        </div>
        <div class="bottom">
          <el-button class="button button__yellow" @click="save">保存</el-button>
          <el-button type="primary" class="button" @click="submit">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { mapActions } from 'vuex';
  import '@common/css/dialog';
  import {spareApi} from '../../js/server';
  import myRules from '@common/js/rules.js';
  import DBankPicker from '@components/DBankPicker';
  import pagination from '@components/pagination';
  import repayAccount from '@components/businessComponents/repayAccount';
  import receiveAccount from '@components/businessComponents/receiveAccount';
  import DQuerySelect from '@components/DQuerySelect';

  const generateBankInfoModel = () => {
    return {
      accountName: null,
      accountNum: null,
      bankCode: null,
      mobileNum: null,
      paymentModeCode: null,
      productId: null,
      subbankCode: null,
      subbankName: null,
      bankName: null,
      repaymentAccountName: '',
      repaymentAccountNum: '',
      repaymentBankCode: '',
      repaymentBankName: '',
      repaymentSubbankCode: '',
      repaymentMobileNum: '',
      repaymentSubbankName: '',
      showPayAccountInd: false,
      repaymentCardInd: false
    };
  };
  // const phoneList = [];
  export default {
    components: { pagination, repayAccount, receiveAccount, DQuerySelect, DBankPicker },
    props: ['applicationId', 'productList'],
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
        businessParms1: {
          applicationId: this.applicationId,
          productId: '',
          paymentModeCode: ''
        },
        businessParms2: {
          applicationId: this.applicationId,
          productId: '',
          paymentModeCode: ''
        },
        labelMap: [labelName, labelName],
        bankPickerApi: spareApi.solving.bankInfo.list,
        bankInfo1: { ...generateBankInfoModel(), repaymentCardInd: true },
        bankInfo2: generateBankInfoModel(),
        bankInfoRule1: {
          paymentModeCode: [{ required: true, message: '请选择支付方式', trigger: 'change' }],
          accountName: [
            { required: true, message: '请填写账户名', trigger: 'blur' },
            { validator: myRules.nameRule, trigger: 'blur' }
          ],
          accountNum: [
            { required: true, message: '请填写收款卡号/账户', trigger: 'blur' },
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
          bankName: [{ required: true, message: '选择开户行后自动带出', trigger: 'change' }],
          subbankCode: [{ required: true, message: '选择开户行后自动带出', trigger: 'change' }],
          mobileNum: [
            { required: true, message: '请填写预留手机号', trigger: 'blur' },
            { validator: myRules.phoneRule, trigger: 'blur' }
          ]
        },
        bankInfoRule2: {
          paymentModeCode: [{ required: true, message: '请选择支付方式', trigger: 'change' }],
          accountName: [{ required: true, message: '请填写账户名', trigger: 'blur' }],
          accountNum: [
            { required: true, message: '请填写收款卡号/账户', trigger: 'blur' },
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
          bankName: [{ required: true, message: '选择开户行后自动带出', trigger: 'change' }],
          subbankCode: [{ required: true, message: '选择开户行后自动带出', trigger: 'change' }],
          mobileNum: [
            { required: true, message: '请填写预留手机号', trigger: 'blur' },
            { validator: myRules.phoneRule, trigger: 'blur' }
          ]
        },
        activeName: 'first',
        bank1: {
          bankName: '', // 银行名称
          cityName: '', // 城市名称
          bankList: [] // 搜索列表,
        },
        bank1FormCurrent: {},
        bank1FormPageConfig: {
          currentPage: 1,
          account: 0,
          pageSize: 10,
          showJumpButton: false
        },
        bankRule: {
          bankName: [{ required: true, message: "请输入银行名称", trigger: "blur" }],
          cityName: [{ required: true, message: "请输入城市", trigger: "blur" }]
        },
        bank2FormCurrent: {},
        bank2: {
          bankName: '', // 银行名称
          cityName: '', // 城市名称
          bankList: [] // 搜索列表,
        },
        bank2FormPageConfig: {
          currentPage: 1,
          account: 0,
          pageSize: 10,
          showJumpButton: false
        },
        loading: false
      };
    },
    async created() {
      const map = {
        accountNameLabel: '绑定电子户的实体卡户名',
        accountNumLabel: '绑定电子户的实体卡卡号/账号',
        subbankNameLabel: '绑定电子户的实体卡开户行',
        bankNameLabel: '绑定电子户的实体卡银行名称',
        subbankCodeLabel: '绑定电子户的实体卡银行行号',
        mobileNumLabel: '绑定电子户的实体卡预留手机号'
      };
      this.productList.forEach((v, i) => {
        if (v.sortNum === 1) {
          this.bankInfo1.productId = v.productId;
          this.businessParms1.productId = v.productId;
        } else {
          this.bankInfo2.productId = v.productId;
          this.businessParms2.productId = v.productId;
        }
        if (v.showElectronicAccountDescInd) {
          this.labelMap[i] = map;
        }
      });
      await this.getInfo();
    },
    methods: {
      ...mapActions('bankInfo', ['fetchQueryBankCardList', 'fetchSubmitTask', 'fetchCheckBankInfo', 'saveBankInfo']),
      onClose() {
        this.$emit('close');
      },
      showPayAccount(_val, _index) {
        let key = `bankInfo${_index + 1}`;
        if (this[key].repaymentCardInd) {
          this[`businessParms${_index + 1}`].paymentModeCode = _val;
          this[key].showPayAccountInd = _val === '1';
        }
        this[key].mobileNum = _val === '1' ? this[key].otherMobileNum : this[key].ownMobileNum;
      },
      async getInfo() {
        const { cardInfoList, aplMobileNum } = await this.fetchQueryBankCardList({ applicationId: this.applicationId });
        cardInfoList.forEach((v, index) => {
          let key = `bankInfo${v.sortNum}`;
          let form = `bankInfo${v.sortNum}Form`;
          // this[key] = Object.assign(this[key], v);
          if (v.productId === this.bankInfo1.productId) {
            this.bankInfo1 = Object.assign(this.bankInfo1, v);
          } else {
            this.bankInfo2 = Object.assign(this.bankInfo2, v);
          }
          if (v.paymentModeDefaultInd) {
            this[key].paymentModeCode = '0';
          }
          if (v.repaymentCardInd && v.paymentModeCode === '1') {
            this[key].showPayAccountInd = true;
          }
          // if (v.repaymentCardInd || v.bindingModeCodeR === 'EP_C') {
          //   }
          this[key] = {
            ...this[key],
            ownMobileNum: this[key].mobileNum || aplMobileNum,
            otherMobileNum: ''
          };
          let sub = this.productList.findIndex(_item => {
            return _item.sortNum === v.sortNum;
          });
          if (sub !== -1 && this.productList[sub].showElectronicAccountDescInd) {
            this[key].otherMobileNum = aplMobileNum;
            this[key].ownMobileNum = aplMobileNum;
          }
          if (this[key].paymentModeCode === '0') {
            // 自主支付收款账号预留手机号取借款人手机号
            this[key] = {
              ...this[key],
              mobileNum: this[key].mobileNum === '' ? '' : this[key].mobileNum || aplMobileNum,
              ownMobileNum: this[key].mobileNum === '' ? '' : this[key].mobileNum
            };
          }
          if (this[key].paymentModeCode === '1') {
            // 受托支付收款账号初始值为空
            this[key] = {
              ...this[key],
              mobileNum: this[key].mobileNum || '',
              otherMobileNum: this[key].mobileNum || '',
              ownMobileNum: ''
            };
            if (this.productList[index].showElectronicAccountDescInd) {
              this[key].ownMobileNum = aplMobileNum;
              this[key].otherMobileNum = this[key].mobileNum === '' ? '' : this[key].mobileNum || aplMobileNum;
            }
          }
          // this[key].mobileNum = _val === '1' ? this[key].otherMobileNum : this[key].ownMobileNum;
          // if (!(v.repaymentCardInd || v.bindingModeCodeR === 'EP_C')) {
          //   this[key] = {
          //     ...this[key],
          //     mobileNum: this[key].mobileNum ? this[key].mobileNum : aplMobileNum
          //   };
          // }
          this.$nextTick(() => {
            this.$refs[form].clearValidate();
          });
        });
        if (!this.bankInfo1.productId && this.bankInfo2.productId) {
          this.activeName = 'second';
        }
      },
      // 提交接口
      async submit() {
        let hasPass = 0;
        let data = { applicationId: this.applicationId, cardInfoList: [] };
         if (this.bankInfo1.productId) {
          if (this.$refs.repayAccount1 && this.$refs.repayAccount1.$refs.repayAccountForm) {
            this.$refs.repayAccount1.$refs.repayAccountForm.validate(valid => {
              if (!valid) {
                hasPass += 1;
                return;
              }
              let repayAccountForm = this.$refs.repayAccount1.repayAccountData;
              Object.assign(this.bankInfo1, repayAccountForm);
            });
          }
          if (this.$refs.receiveAccount1 && this.$refs.receiveAccount1.$refs.receiveAccountForm) {
            this.$refs.receiveAccount1.$refs.receiveAccountForm.validate(valid => {
              if (!valid) {
                hasPass += 1;
                return;
              }
              let receiveAccountForm = this.$refs.receiveAccount1.receiveAccountData;
              Object.assign(this.bankInfo1, receiveAccountForm);
            });
          }
          this.$refs.bankInfo1Form.validate((valid) => {
            if (!valid) {
              hasPass += 1;
            } else {
              data.cardInfoList.push(this.bankInfo1);
            }
          });
        }
        if (this.bankInfo2.productId) {
          if (this.$refs.repayAccount2 && this.$refs.repayAccount2.$refs.repayAccountForm) {
            this.$refs.repayAccount2.$refs.repayAccountForm.validate(valid => {
              if (!valid) {
                hasPass += 1;
                return;
              }
              let repayAccountForm = this.$refs.repayAccount2.repayAccountData;
              Object.assign(this.bankInfo2, repayAccountForm);
            });
          }
          if (this.$refs.receiveAccount2 && this.$refs.receiveAccount2.$refs.receiveAccountForm) {
            this.$refs.receiveAccount2.$refs.receiveAccountForm.validate(valid => {
              if (!valid) {
                hasPass += 1;
                return;
              }
              let receiveAccountForm = this.$refs.receiveAccount2.receiveAccountData;
              Object.assign(this.bankInfo2, receiveAccountForm);
            });
          }
          this.$refs.bankInfo2Form.validate((valid) => {
            if (!valid) {
              hasPass += 1;
            } else {
              data.cardInfoList.push(this.bankInfo2);
            }
          });
        }
        if (hasPass) {
          this.confirmFn('请检查错误！', 'error');
          return;
        }
        this.loadingOpen();
        const { success, errorMsg } = await this.fetchSubmitTask(data);
        this.loadingClose();
        if (success) {
          this.confirmFn('提交成功！', 'success');
          this.onClose();
        } else {
          this.confirmFn(errorMsg, 'error');
        }
      },
      async save() {
        let data = { applicationId: this.applicationId, cardInfoList: [] };
        if (this.bankInfo1.productId) {
          if (this.$refs.repayAccount1 && this.$refs.repayAccount1.$refs.repayAccountForm) {
            let repayAccountForm = this.$refs.repayAccount1.repayAccountData;
            Object.assign(this.bankInfo1, repayAccountForm);
          }
          data.cardInfoList.push(this.bankInfo1);
        }
        if (this.bankInfo2.productId) {
          if (this.$refs.repayAccount2 && this.$refs.repayAccount2.$refs.repayAccountForm) {
            let repayAccountForm = this.$refs.repayAccount2.repayAccountData;
            Object.assign(this.bankInfo2, repayAccountForm);
          }
          data.cardInfoList.push(this.bankInfo2);
        }
        this.loadingOpen();
        const { success, errorMsg } = await this.saveBankInfo(data);
        this.getInfo();
        this.loadingClose();
        if (success) {
          this.confirmFn('保存成功!', 'success');
        } else {
          this.confirmFn(errorMsg);
        }
      },
      changeAccountNum1() {
        this.bankInfo1.accountNum = this.bankInfo1.accountNum.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
      },
      changeAccountNum2() {
        this.bankInfo2.accountNum = this.bankInfo2.accountNum.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
      },
      async checkBankInfo(bank) { // 验证银行信息
        const { accountName, accountNum, mobileNum, productId, subbankName, subbankCode, bankName, bankCode, paymentModeCode } = this[bank];
        let query = {
          accountName,
          accountNum,
          applicationId: this.applicationId,
          mobileNum,
          productId,
          subbankName, // 开户行
          subbankCode, // 开户行行号
          bankName, // 总行名称
          bankCode, // 总行行号
          paymentModeCode,
          bindingModeCode: 'C'
        };
        const valid = await this.$refs[`${bank}Form`].validate();
        if (valid) {
          this.loadingOpen();
          const { success, errorMsg } = await this.fetchCheckBankInfo(query);
          this.loadingClose();
          if (success) {
            this.confirmFn('验证成功');
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
      onRepayBankChange({ bankName, bankCode, parentBankName, parentBankCode }, item) {
        this[item].subbankName = bankName; // 开户行
        this[item].subbankCode = bankCode; // 开户行行号
        this[item].bankName = parentBankName; // 收款行名称
        this[item].bankCode = parentBankCode; // 收款行行号
      }
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan{
    .dialog-box{
      // width: 946px;
      // padding-bottom: 0;
      overflow: visible;
      .dialog-box__middle{
        // height: 450px;
        font-size: 0;
        .top{
          /deep/.el-tabs__header{
            border-bottom: 1px solid @line-color;
          }
          /deep/ .el-tabs__item{
            font-size: 12px;
            letter-spacing: 1px;
          }
        }
        .middle{
          // margin-right: -40px;
          /deep/.el-form-item{
            margin-right: 0;
            margin-bottom: 20px;
          }
          .drop__select-box{
            vertical-align: top;
            .lab{
              padding: 0 0 10px;
              line-height: 17px;
              font-size: 12px;
              color: @font-gray;
              .icon__star{
                color: @red;
                margin-right: 5px;
              }
            }
          }
          .drop__select-box{
            // position: relative;
            .button__wrap{
              position: relative;
              min-width: 100%;
              height: 42px;
              padding: 0 20px;
              line-height: 40px;
              border: 1px solid @line-color;
              text-align: left;
              background: none;
              color: @font-light;
              transition: all 0.3s;
              .icon{
                position:absolute;
                transform: rotateZ(180deg);
                right: 5px;
              }
            }
            .button{
              vertical-align: top;
            }
            .wrap{
              position: absolute;
              top: 70px;
              min-width: 100%;
              padding: 20px;
              border: 1px solid @line-color;
              border-radius: 4px;
              background: #fff;
              z-index: 10;
              font-size: 12px;
              .list{
                max-height: 220px;
                overflow-y: auto;
                .item{
                  position: relative;
                  padding-left: 60px;
                  line-height: 60px;
                  text-align: center;
                  cursor: pointer;
                  .num{
                    position: absolute;
                    left: 0;
                    width: 60px;
                    display: inline-block;

                  }
                }
                .item:hover{
                  background: @blue-hover;
                }
              }
            }
            .wrap /deep/ .el-input{
              max-width: 242px;
              margin-right: 10px;
            }
            .wrap /deep/ .el-select{
              width: 242px;

            }
            .table__wrap-max{
              width: 710px;
            }
            .table__wrap-min{
              width: 466px;
            }
          }
          .drop__select-box .button__wrap.isactive{
            border-color: @blue-light;
            .icon{
              transform: rotateZ(0);
            }
          }
          .drop__select-box .button__wrap.disabled{
            background: #f5f7fa;
            cursor: not-allowed;
          }
        }
        .bottom{
          position: static;
          bottom: 30px;
        }
      }
    }
    // 恢复IE浏览器下.dialog-box { overflow: hidden; }
    @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
      .dialog-box { overflow: hidden; }
    }
  }
</style>
