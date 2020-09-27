<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title bg__white">完善资料</h5>
        <span class="right__btn" @click="$showImage(applicationId, '第三方备签')"><i class="icon icon__video"></i>上传影像资料</span>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="dialog-box__step-box">
        <el-tabs v-model="currentStep" @tab-click="handleClick">
          <el-tab-pane label="机构选择结果" name="first">机构选择结果</el-tab-pane>
          <el-tab-pane label="客户信息完善" name="second">客户信息完善</el-tab-pane>
          <el-tab-pane label="产品特殊信息" name="third">产品特殊信息</el-tab-pane>
        </el-tabs>
      </div>
      <select-result
        :is-readonly="isReadonly"
        :applicationId="applicationId"
        v-if="currentStep === 'first'"></select-result>
      <complete-product
        :is-readonly="isReadonly"
        v-if="currentStep === 'second'"
        :applicationId="applicationId"></complete-product>
      <complete-customer-info
        @close="close"
        v-if="currentStep === 'third'"
        :is-readonly="isReadonly"
        :applicationId="applicationId"></complete-customer-info>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import '@common/css/dialog';
  import pagination from '@components/pagination';
  import completeProduct from './complete-product';
  import selectResult from './select_result';
  import completeCustomerInfo from './complete_customer_info';
  export default{
    props: {
      applicationId: {
        type: String
      },
      isReadonly: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.activeName = to.name;
      next();
    },
    data() {
      return {
        currentStep: 'first',
        imageVisible: false
      };
    },
    created() {},
    methods: {
      close() {
        this.$emit('close');
      },
      handleClick() {}
    },
    components: {
      pagination,
      completeProduct,
      selectResult,
      completeCustomerInfo
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan{
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
            background: #E5E5E5;
          }
        }
      }
    }
    .dialog-box__step-box{
      margin: 0;
      text-align: center;
      /deep/ .el-tabs{
        display: inline-block;
      }
    }
    .margin-top__20{
      margin-top: 20px;
    }
    .pagination{
      margin-top: 20px;
    }
  }
</style>
