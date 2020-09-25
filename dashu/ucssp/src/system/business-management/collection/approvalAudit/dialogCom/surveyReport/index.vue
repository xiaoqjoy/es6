<template>
  <div class="apraut">
    <!-- <survey-report class="aprautReport" v-if="reportDialog" :isAprAut="isAprAut" :disabled="disabled" :notApprovalAudit="notApprovalAudit" :isLookOver="isLookOver"></survey-report> -->
    <survey-report class="aprautReport" v-if="reportDialog" @close="close" :notApprovalAudit="showBtn" :isLookOver="isLookOver" :disabled="disabled" :custInfo="custInfo"></survey-report>
  </div>
</template>

<script>
import surveyReport from "../../../../../survey/survey-report/survey-report";
  export default {
    data() {
      return {
        close: false,
        isAprAut: true,
        reportDialog: true,
        notApprovalAudit: this.$route.query.notApprovalAudit,
        disabled: true,
        isLookOver: true
      };
    },
    created() {
      if (this.notApprovalAudit === 'true') {
        this.notApprovalAudit = true;
      } else {
        this.notApprovalAudit = false;
      }
      // if (this.disabled === 'true') {
      //   this.disabled = true;
      // } else {
      //   this.disabled = false;
      // }
    },
    components: {
      surveyReport
    }
};
</script>

<style lang="less" scoped>
  /deep/.aprautReport.drop_loan {
    .dialog-box{
      text-align: left;
      height: 970px;
      width: 100%;
      .report_content{
        height: 800px;
      }
      .icon_btn_line_title{
        font-size: 14px;
        color: #666;
      }
      .icon_btn_line_content{
        font-size: 14px;
        color: #000;
      }
    }
  }
</style>
