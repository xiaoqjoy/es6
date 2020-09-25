<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title bg__white">收款账户信息管理</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="dialog-box__middle">
        <div class="top">
          <el-tabs v-model="activeName">
            <el-tab-pane v-if="bankInfo1.productId" label="ID1收款账户信息" name="first">ID1收款账户信息</el-tab-pane>
            <el-tab-pane v-if="bankInfo2.productId" label="ID2收款账户信息" name="second">ID2收款账户信息</el-tab-pane>
          </el-tabs>
        </div>
        <div class="middle">
          <el-form
            v-show="activeName === 'first'"
            ref="bankInfo1Form"
            :model="bankInfo1"
            :rules="bankInfoRule1"
            label-width="100px"
            class="demo-form-inline"
            label-position="top">
            <el-form-item label="支付方式" prop="paymentModeCode" class="el-form-item__33" >
              <el-select
                v-model="bankInfo1.paymentModeCode"
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
                maxlength="30"
                v-model="bankInfo1.accountName"
                placeholder="请填写收款账户户名"></el-input>
            </el-form-item>
            <el-form-item label="收款卡号/账户" prop="accountNum" class="el-form-item__33" >
              <el-input
                @change="changeAccountNum1"
                v-model="bankInfo1.accountNum"
                placeholder="请填写收款卡号/账户"></el-input>
            </el-form-item>
            <div class="drop__select-box el-form-item__33">
              <p class="lab"><span class="icon icon__star">*</span>开户行</p>
              <button class="button__wrap ellipsis"
                      :title="bankInfo1.subbankName"
                      type="button"
                      @click="dropSelectShow1=!dropSelectShow1;"
                      :class="{isactive:dropSelectShow1}"> {{bankInfo1.subbankName? bankInfo1.subbankName: '请选择开户行'}} <i class="icon el-select__caret el-input__icon el-icon-arrow-up"></i> </button>
              <transition name="el-zoom-in-top">
                <div class="wrap table__wrap-max" v-show="dropSelectShow1">
                  <el-form :model="bank1"
                           ref="bank1Form"
                           label-width="100px"
                           class="demo-form-inline" label-position="top" >
                    <el-form-item
                      :rules="[
                           { required: true, message: '请输入银行名称', trigger: 'blur' }
                      ]"
                      prop="bankName"
                      style="margin-right:10px">
                      <el-input placeholder="输入银行名称" v-model.trim="bank1.bankName"></el-input>
                    </el-form-item>
                    <el-form-item
                      :rules="[
                           { required: true, message: '请输入城市', trigger: 'blur' }
                      ]"
                      prop="cityName"
                      style="margin-right:10px">
                      <el-input placeholder="输入城市" v-model.trim="bank1.cityName"></el-input>
                    </el-form-item>
                    <el-button type="primary" class="button button__blue width100" @click="queryBank('bank1Form', bank1)">查询</el-button>
                  </el-form>
                  <el-table
                    :data="bank1.bankList"
                    height="200"
                    border
                    highlight-current-row
                    style="width: 100%"
                    cell-class-name="dialog__table__td"
                    header-cell-class-name="dialog__table__th"
                    @row-click="selectedBank1"
                    class="dialog__table">
                    <el-table-column
                      prop="bankName"
                      label="银行名称"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="bankCode"
                      label="银行编号"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="parentBankName"
                      label="总行名称">
                    </el-table-column>
                    <el-table-column
                      prop="parentBankCode"
                      label="总行编号">
                    </el-table-column>
                  </el-table>
                  <pagination :page="bank1FormPageConfig" style="margin-top: 10px" @jump-page="jump1"></pagination>
                </div>
              </transition>
            </div>
            <el-form-item label="收款行名称" prop="bankName" class="el-form-item__33" >
              <el-input
                readonly
                v-model="bankInfo1.bankName"
                placeholder="请填写收款行名称"></el-input>
            </el-form-item>
            <el-form-item label="开户行行号" prop="subbankCode" class="el-form-item__33"  >
              <el-input
                readonly
                v-model="bankInfo1.subbankCode"
                placeholder="请填写开户行行号"></el-input>
            </el-form-item>
            <el-form-item label="预留手机号" prop="mobileNum" class="el-form-item__33">
              <el-input
                v-model="bankInfo1.mobileNum"
                placeholder="请填写预留手机号"></el-input>
            </el-form-item>
            <el-form-item  class="el-form-item__33" style="margin-top: 25px;">
              <el-button type="primary" class="button button__blue width100" @click="checkBank1">验证</el-button>
            </el-form-item>
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
              <el-select
                v-model="bankInfo2.paymentModeCode"
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
                maxlength="30"
                v-model="bankInfo2.accountName"
                placeholder="请填写收款账户户名"></el-input>
            </el-form-item>
            <el-form-item label="收款卡号/账户" prop="accountNum" class="el-form-item__33" >
              <el-input
                @change="changeAccountNum2"
                v-model="bankInfo2.accountNum"
                placeholder="请填写收款卡号/账户"></el-input>
            </el-form-item>
            <div class="drop__select-box el-form-item__33">
              <p class="lab"><span class="icon icon__star">*</span>开户行</p>
              <button class="button__wrap ellipsis"
                      :title="bankInfo2.subbankName"
                      type="button"
                      @click="dropSelectShow2=!dropSelectShow2;"
                      :class="{isactive:dropSelectShow2}"> {{bankInfo2.subbankName? bankInfo2.subbankName: '请选择开户行'}} <i class="icon el-select__caret el-input__icon el-icon-arrow-up"></i> </button>
              <transition name="el-zoom-in-top">
                <div class="wrap table__wrap-max" v-show="dropSelectShow2">
                  <el-form :model="bank2"
                           ref="bank2Form"
                           label-width="100px"
                           class="demo-form-inline" label-position="top" >
                    <el-form-item
                      :rules="[
                           { required: true, message: '请输入银行名称', trigger: 'blur' }
                      ]"
                      prop="bankName"
                      style="margin-right:10px">
                      <el-input placeholder="输入银行名称" v-model.trim="bank2.bankName"></el-input>
                    </el-form-item>
                    <el-form-item
                      :rules="[
                           { required: true, message: '请输入城市', trigger: 'blur' }
                      ]"
                      prop="cityName"
                      style="margin-right:10px">
                      <el-input placeholder="输入城市" v-model.trim="bank2.cityName"></el-input>
                    </el-form-item>
                    <el-button type="primary" class="button button__blue width100" @click="queryBank('bank2Form', bank2)">查询</el-button>
                  </el-form>
                  <el-table
                    :data="bank2.bankList"
                    height="200"
                    border
                    highlight-current-row
                    style="width: 100%"
                    cell-class-name="dialog__table__td"
                    header-cell-class-name="dialog__table__th"
                    @row-click="selectedBank2"
                    class="dialog__table">
                    <el-table-column
                      prop="bankName"
                      label="银行名称"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="bankCode"
                      label="银行编号"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="parentBankName"
                      label="总行名称">
                    </el-table-column>
                    <el-table-column
                      prop="parentBankCode"
                      label="总行编号">
                    </el-table-column>
                  </el-table>
                  <pagination :page="bank2FormPageConfig" style="margin-top: 10px" @jump-page="jump2"></pagination>
                </div>
              </transition>
            </div>
            <el-form-item label="收款行名称" prop="bankName" class="el-form-item__33" >
              <el-input
                readonly
                v-model="bankInfo2.bankName"
                placeholder="请填写收款行名称"></el-input>
            </el-form-item>
            <el-form-item label="开户行行号" prop="subbankCode" class="el-form-item__33"  >
              <el-input
                readonly
                v-model="bankInfo2.subbankCode"
                placeholder="请填写开户行行号"></el-input>
            </el-form-item>
            <el-form-item label="预留手机号" prop="mobileNum" class="el-form-item__33">
              <el-input
                v-model="bankInfo2.mobileNum"
                placeholder="请填写预留手机号"></el-input>
            </el-form-item>
            <el-form-item class="el-form-item__33" style="margin-top: 25px;">
              <el-button type="primary" class="button button__blue width100" @click="checkBank2">验证</el-button>
            </el-form-item>
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
  import '@common/css/dialog';
  import {spareApi} from '../../js/server';
  import myRules from '@common/js/rules.js';
  import pagination from '@components/pagination';
  export default{
    props: ['applicationId', 'productList'],
    data() {
      return {
        // 支付方式字典
        paymentModeCodeLibrary: [],
        dropSelectShow1: false,
        dropSelectShow2: false,
        reasonList: [],
        result: [],
        bankInfo1: {
          accountName: null,
          accountNum: null,
          bankCode: null,
          mobileNum: null,
          paymentModeCode: null,
          productId: null,
          subbankCode: null,
          subbankName: null,
          bankName: null
        },
        bankInfo2: {
          accountName: null,
          accountNum: null,
          bankCode: null,
          mobileNum: null,
          paymentModeCode: null,
          productId: null,
          subbankCode: null,
          subbankName: null,
          bankName: null
        },
        bankInfoRule1: {
          paymentModeCode: [
            { required: true, message: '请选择支付方式', trigger: 'change' }
          ],
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
          bankName: [
            { required: true, message: '选择开户行后自动带出', trigger: 'change' }
          ],
          subbankCode: [
            { required: true, message: '选择开户行后自动带出', trigger: 'change' }
          ],
          mobileNum: [
            { required: true, message: '请填写预留手机号', trigger: 'blur' },
            { validator: myRules.phoneRule, trigger: 'blur' }
          ]
        },
        bankInfoRule2: {
          paymentModeCode: [
            { required: true, message: '请选择支付方式', trigger: 'change' }
          ],
          accountName: [
            { required: true, message: '请填写账户名', trigger: 'blur' }
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
          bankName: [
            { required: true, message: '选择开户行后自动带出', trigger: 'change' }
          ],
          subbankCode: [
            { required: true, message: '选择开户行后自动带出', trigger: 'change' }
          ],
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
    created() {
      this.productList.forEach(v => {
        if (v.sortNum === 1) {
          this.bankInfo1.productId = v.productId;
        } else {
          this.bankInfo2.productId = v.productId;
        }
      });
      this.getInfo();
      this.getSelectValue('payment_mode_code')
        .then((data) => {
          this.paymentModeCodeLibrary = data;
        });
    },
    methods: {
      close() {
        this.$emit('close');
      },
      getInfo() {
        this.$MyFetch.post(spareApi.solving.bankInfo.query + this.applicationId)
          .then((data) => {
            this.$set(this.bankInfo1, 'mobileNum', data.aplMobileNum);
            this.$set(this.bankInfo2, 'mobileNum', data.aplMobileNum);
            data.cardInfoList.forEach(v => {
              if (v.productId === this.bankInfo1.productId) {
                this.bankInfo1 = Object.assign(this.bankInfo1, v);
                this.$set(this.bankInfo1, 'mobileNum', (this.bankInfo1.mobileNum ? this.bankInfo1.mobileNum : data.aplMobileNum));
              } else {
                this.bankInfo2 = Object.assign(this.bankInfo2, v);
                this.$set(this.bankInfo2, 'mobileNum', (this.bankInfo2.mobileNum ? this.bankInfo2.mobileNum : data.aplMobileNum));
              }
            });
            if (!this.bankInfo1.productId && this.bankInfo2.productId) {
              this.activeName = 'second';
            }
          })
          .catch(err => {
            console.log(err.message);
          });
      },
      getReasonList(type) {
        return new Promise((resolve, reject) => {
          this.$MyFetch.get(spareApi.commonSelect, {categoryCode: type})
            .then((data = {}) => {
              resolve(data);
            })
            .catch(err => {
              reject(err);
            });
        });
      },
      // 提交接口
      submit() {
        let hasPass = 0;
        let data = {
          applicationId: this.applicationId,
          cardInfoList: []
        };
         if (this.bankInfo1.productId) {
          this.$refs.bankInfo1Form.validate((valid) => {
            if (!valid) {
              hasPass += 1;
            } else {
              data.cardInfoList.push(this.bankInfo1);
            }
          });
         }
         if (this.bankInfo2.productId) {
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
         this.$MyFetch.post(spareApi.solving.lastSubmit, data)
           .then(res => {
             this.confirmFn('提交成功！', 'success');
             this.close();
           })
           .catch(err => {
             this.confirmFn(err.message, 'error');
           });
       },
      save() {
        let data = {
          applicationId: this.applicationId,
          cardInfoList: []
        };
        if (this.bankInfo1.productId) {
          data.cardInfoList.push(this.bankInfo1);
        }
        if (this.bankInfo2.productId) {
          data.cardInfoList.push(this.bankInfo2);
        }
        this.$MyFetch.post(spareApi.solving.bankInfo.save, data)
          .then((res = {}) => {
            this.confirmFn('保存成功!', 'success');
          })
          .catch(err => {
            this.confirmFn(err.message);
          });
      },
      // 下拉项字典api
      getSelectValue(name) {
        return new Promise((resolve, reject) => {
          this.$MyFetch.get(spareApi.commonSelect, {categoryCode: name})
            .then((data = {}) => {
              resolve(data);
            })
            .catch(err => {
              console.log(err);
            });
        });
      },
      changeAccountNum1() {
        this.bankInfo1.accountNum = this.bankInfo1.accountNum.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
      },
      changeAccountNum2() {
        this.bankInfo2.accountNum = this.bankInfo2.accountNum.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
      },
      // 查询银行信息
      queryBank(formName, query) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              bankName: query.bankName,
              cityName: query.cityName,
              pageNum: 1,
              pageSize: 10
            };
            this[formName + 'Current'] = JSON.parse(JSON.stringify(data));
            this.queryBankApi(data)
              .then((res) => {
                query.bankList = res.list;
                this[(formName + 'PageConfig')].account = res.total;
                this[(formName + 'PageConfig')].currentPage = res.pageNum;
              });
          } else {
            console.log('error');
          }
        });
      },
      queryBankApi(data) {
        return new Promise((resolve) => {
          this.$MyFetch.post(spareApi.solving.bankInfo.list, data)
            .then((data) => {
              resolve(data);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      },
      jump1(index) {
        this.bank1FormCurrent.pageNum = index;
        this.queryBankApi(this.bank1FormCurrent)
          .then((res) => {
            this.bank1.bankList = res.list;
            this.bank1FormPageConfig.account = res.total;
            this.bank1FormPageConfig.currentPage = res.pageNum;
          });
      },
      selectedBank1(data) {
        // let reg = /^([\s\S]*银行)/;
        // this.bankInfo1.bankName = data.parentBankName.match(reg)[1]; // 收款行名称
        this.bankInfo1.bankName = data.parentBankName;
        this.bankInfo1.subbankName = data.bankName; // 开户行
        this.bankInfo1.subbankCode = data.bankCode; // 开户行行号
        this.bankInfo1.bankCode = data.parentBankCode; // 收款行行号 页面不展示
        this.dropSelectShow1 = false;
      },
      jump2(index) {
        this.bank2FormCurrent.pageNum = index;
        this.queryBankApi(this.bank2FormCurrent)
          .then((res) => {
            this.bank2.bankList = res.list;
            this.bank2FormPageConfig.account = res.total;
            this.bank2FormPageConfig.currentPage = res.pageNum;
          });
      },
      selectedBank2(data) {
        // let reg = /^([\s\S]*银行)/;
        // this.bankInfo2.bankName = data.parentBankName.match(reg)[1]; // 收款行名称
        this.bankInfo2.bankName = data.parentBankName;
        this.bankInfo2.subbankName = data.bankName; // 开户行
        this.bankInfo2.subbankCode = data.bankCode; // 开户行行号
        this.dropSelectShow2 = false;
      },
      // 验证银行信息
      checkBank1() {
        let query = {
          accountName: this.bankInfo1.accountName,
          accountNum: this.bankInfo1.accountNum,
          applicationId: this.applicationId,
          mobileNum: this.bankInfo1.mobileNum,
          productId: this.bankInfo1.productId
        };
        this.$refs.bankInfo1Form.validate((valid) => {
          if (valid) {
            this.checkBankApi(query)
              .then(data => {
                this.confirmFn('验证成功！', 'success');
              });
          }
        });
      },
      checkBank2() {
        let query = {
          accountName: this.bankInfo2.accountName,
          accountNum: this.bankInfo2.accountNum,
          applicationId: this.applicationId,
          mobileNum: this.bankInfo2.mobileNum,
          productId: this.bankInfo2.productId
        };
        this.$refs.bankInfo2Form.validate((valid) => {
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
    components: {
      pagination
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan{
    .dialog-box{
      width: 946px;
      padding-bottom: 0;
      overflow: visible;
      .dialog-box__middle{
        height: 450px;
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
          margin-right: -40px;
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
            position: relative;
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
          bottom: 30px;
        }
      }
    }
  }
</style>
