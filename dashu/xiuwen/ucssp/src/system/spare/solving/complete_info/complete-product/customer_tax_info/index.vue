<template>
  <div class="drop_loan1">
    <div class="dialog-mask1"></div>
    <div class="dialog-box1">
      <div class="dialog-box__top">
        <h5 class="title">税务贷信息</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="tax_info_main">
        <div class="tax_info_main_tabs">
          <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
            <el-tab-pane v-for="(item, key) in tabsList" :key="key"
              :label="item.value" :name="item.name"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="tax_info">
          <transition name="fade">
            <div v-if="tabShow === '0'">
              <tax-base></tax-base>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="tabShow === '1'">
              <declare-tax></declare-tax>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="tabShow === '2'">
              <invoice-info></invoice-info>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="tabShow === '3'">
              <finance-info></finance-info>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="tabShow === '4'">
              <tax-vio-info></tax-vio-info>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="tabShow === '5'">
              <insp-case-info></insp-case-info>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="tabShow === '6'">
              <tax-owed-info></tax-owed-info>
            </div>
          </transition>
          <transition name="fade">
            <div v-if="tabShow === '7'">
              <taxp-cred-lv-info></taxp-cred-lv-info>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '@common/css/dialog';
  // import myRule from '@common/js/rules';
  import taxBase from './base_info';
  import declareTax from './declare_info';
  import invoiceInfo from './invoice_info';
  import financeInfo from './finance_info';
  import taxVioInfo from './tax_violation_info';
  import inspCaseInfo from './inspection_case_info';
  import taxOwedInfo from './tax_owed_info';
  import taxpCredLvInfo from './taxpayer_credit_level_info';
  import { spareApi } from '../../../../js/server.js';
  export default {
    props: {
      taxPayerNum: {
        type: String,
        default: () => {
          return '1';
        }
      }
    },
    data() {
      return {
        tabsList: [
          { key: 0, value: '基本信息', name: 'base-info', api: spareApi.checkTaxLoan.basicInfo },
          { key: 1, value: '申报信息', name: 'declare-info', api: spareApi.checkTaxLoan.declareInfo },
          { key: 2, value: '发票信息', name: 'invoice-info', api: spareApi.checkTaxLoan.invoice },
          { key: 3, value: '财务信息', name: 'finance-info', api: spareApi.checkTaxLoan.financial },
          { key: 4, value: '税收违法信息', name: 'tax-violation-info', api: spareApi.checkTaxLoan.illegal },
          { key: 5, value: '稽查案件信息', name: 'inspection-case-info', api: spareApi.checkTaxLoan.inspection },
          { key: 6, value: '欠税信息', name: 'tax-owed-info', api: spareApi.checkTaxLoan.owingtax },
          { key: 7, value: '纳税人信用评级信息', name: 'taxpayer-credit-level-info', api: spareApi.checkTaxLoan.crilvl }
        ],
        activeName: 'base-info',
        tabShow: '0',
        baseData: {},
        baseDataList: []
      };
    },
    methods: {
      handleClick(_tab, _event) {
        this.tabShow = _tab.index;
        // this.$router.push({ name: _tab.name });
        // this.$MyFetch.get(this.tabsList[_tab.index].api, {
        //   taxpayerNum: this.taxPayerNum
        // }).then(_data => {
        //   // console.log(_data);
        //   if (_data instanceof Array) {
        //     this.baseDataList = _data;
        //   } else {
        //     this.baseData = _data;
        //   }
        //   if (_data.tltaxpayerBasicInfo === null) {
        //     _data.tltaxpayerBasicInfo = {};
        //   }
        // }).catch(_erro => {
        //   this.$error(_erro.message);
        //   console.log(_erro);
        // });
      },
      close() {
        this.$emit('close');
      }
    },
    components: {
      taxBase,
      declareTax,
      invoiceInfo,
      financeInfo,
      taxVioInfo,
      inspCaseInfo,
      taxOwedInfo,
      taxpCredLvInfo
    },
    created() {
      this.handleClick({index: '0'});
    },
    mounted() {
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan1.solving_tax {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
    .dialog-box1 {
      width: 1200px;
      padding-bottom: 0px;
      background: #F9FAFB;
      .mgtop {
        margin-top: 20px;
      }
      .title {
        background: #ffffff;
      }
      .tax_info_main {
        padding:0 20px;
        background: #F9FAFB;
        height: 630px;
        min-height: 400px;
        overflow: auto;
        .tax_info {
          font-size: 16px;
        }
      }
      .tax_info_main_tabs {
        width: 1160px;
      }
    }
  }
  // drop_loan1 face2face_tax
  .drop_loan1.face2face_tax, .drop_loan1.audit_and_approval_tax {
    .dialog-mask1 {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,.3);
      z-index: 1000;
    }
    .dialog-box1 {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding-bottom: 50px;
      border-radius: 5px;
      background: #f9fafb;
      z-index: 1001;
      overflow: hidden;
      .dialog-box__top{
        position: relative;
        height: 60px;
        margin-bottom: 10px;
        line-height: 60px;
        box-shadow: 0 1px 10px 0 rgba(0,0,0,0.05);
        .title {
          text-align: center;
          font-size: 18px;
          font-weight: normal;
        }
        .button__close {
          position: absolute;
          top: 9px;
          right: 0;
          width: 42px;
          height: 42px;
          line-height: 42px;
          border-radius: 50%;
          font-size: 16px;
          text-align: center;
          color: #666;
          font-weight: 600;
        }
      }
      .tax_info_main {
        padding:0 20px;
        background: #F9FAFB;
        height: 630px;
        min-height: 400px;
        overflow: auto;
        .tax_info {
          font-size: 16px;
        }
      }
      .tax_info_main_tabs {
        width: 1160px;
      }
    }
  }
  /deep/ .el-tabs__nav-wrap {
    background: #fff;
    -webkit-box-shadow: 0 2px 6px 0 rgba(0,0,0,0.08);
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.08);
    padding-left: 30px;
    padding-top: 10px;
    border-radius: 4px;
  }
  /deep/ .el-tabs__nav-wrap .el-tabs__item.is-active {
    font-family: PingFangSC-Semibold;
    font-size: 18px;
    color: #538bf1;
    letter-spacing: 1.38px;
  }
  /deep/ .el-tabs__active-bar.is-top {
    height: 3px;
  }
  /deep/ .el-tabs__item.is-top, /deep/ .el-tabs__item is-t.is-active {
    height: 50px;
  }
  /deep/ .el-tabs__item.is-top {
    font-size: 16px;
  }
  /deep/ .el-tabs__nav-wrap .el-tabs__item.is-active .el-tabs__item {
    font-family: PingFangSC-Semibold !important;
    font-size: 18px;
    color: #333333;
    letter-spacing: 1.22px;
    text-align: center;
  }
</style>
