<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title bg__white">完善资料</h5>
        <!--<span class="right__btn" v-if="currentStep === 4 && !isReadonly" @click="$showImage(applicationId, '柜面备签')"><i class="icon icon__video"></i>上传影像资料</span>-->
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="dialog-box__step-box" :class="{check: isReadonly}">
        <el-tabs v-model="readStep" v-if="isReadonly" @tab-click="handleClick">
          <el-tab-pane label="客户信息完善" name="1">客户信息完善</el-tab-pane>
          <el-tab-pane label="机构选择结果" name="2">机构选择结果</el-tab-pane>
          <el-tab-pane label="产品特殊信息" name="3">产品特殊信息</el-tab-pane>
          <el-tab-pane label="收款账户信息" name="4">收款账户信息</el-tab-pane>
        </el-tabs>
        <steps :step-arr="step" :current-step="currentStep" v-if="!isReadonly"></steps>
      </div>
      <select-result :applicationId="applicationId" v-if="currentStep === 1 && !isReadonly" @next-step="nextStep1"></select-result>
      <complete-product
        v-if="currentStep === 2 - (isReadonly ? 1 : 0)"
        :is-readonly="isReadonly"
        :applicationId="applicationId"
        @pre-step="preStep1"
        @next-step="nextStep2"
      ></complete-product>
      <select-product
        v-if="currentStep === 3 - (isReadonly ? 1 : 0)"
        :is-readonly="isReadonly"
        :applicationId="applicationId"
        @pre-step="nextStep1"
        @next-step="nextStep3"
      ></select-product>
      <complete-customer-info
        v-if="currentStep === 4 - (isReadonly ? 1 : 0)"
        :is-readonly="isReadonly"
        :applicationId="applicationId"
        @pre-step="nextStep2"
        @close="close"
      ></complete-customer-info>
      <bank-info
        v-if="currentStep === 4 && isReadonly"
        :applicationId="applicationId"
      ></bank-info>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import '@common/css/dialog';
  import steps from '@components/steps';
  import pagination from '@components/pagination';
  import selectResult from './select_result';
  import completeProduct from './complete-product';
  import selectProduct from './select_product';
  import completeCustomerInfo from './complete_customer_info';
  import bankInfo from './bankInfo';
  export default {
    components: {
      steps,
      pagination,
      selectResult,
      completeProduct,
      selectProduct,
      completeCustomerInfo,
      bankInfo
    },
    props: {
      applicationId: {
        type: String
      },
      isReadonly: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        currentStep: 1,
        imageVisible: false,
        step: [{ title: '机构选择' }, { title: '填写产品信息' }, { title: '选择产品' }, { title: '完善客户信息' }],
        readStep: '1'
      };
    },
    created() {
      if (this.isReadonly) {
        this.step = [{ title: '填写产品信息' }, { title: '选择产品' }, { title: '完善客户信息' }];
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      nextStep1() {
        this.currentStep = 2 - (this.isReadonly ? 1 : 0);
      },
      nextStep2() {
        this.currentStep = 3 - (this.isReadonly ? 1 : 0);
      },
      nextStep3() {
        this.currentStep = 4 - (this.isReadonly ? 1 : 0);
      },
      preStep1() {
        this.currentStep = 1;
      },
      openImage() {
        this.imageVisible = true;
      },
      handleClick() {
        this.currentStep = this.readStep - 0;
      }
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan{
    position: static;
    .dialog-box{
      width: 1500px;
      font-size: 0;
      .dialog-box__middle{
        height: 495px;
        .middle{
          .el-select{
            display: block;
          }
          .el-textarea__inner{
            background: #d0d0d0;
          }
        }
      }
    }
    .margin-top__20{
      margin-top: 20px;
    }
    .pagination{
      margin-top: 20px;
    }
    .dialog-box__step-box.check{
      margin: 0;
      text-align: center;
      /deep/ .el-tabs{
        display: inline-block;
      }
    }
  }
</style>
