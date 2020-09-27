<style lang="less" scoped>
  .face2face-preview {
    position: fixed;
    width: 100%;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    top: 60px;
    left: 0;
    z-index: 3;
    background: #fff;
    .btn-right {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .button-text {
      cursor: pointer;
    }
    /deep/ .title {
      font-size: 16px;
    }
    /deep/ .dialog-box__middle-form {
      height: auto;
      padding-bottom: 60px;
      .form__block {
        padding: 20px;
      }
    }
  }
</style>
<template>
  <div class="face2face-preview">
    <div class="btn-right remote-check-tabs-btn">
      <!-- <span class="button-text" @click="showCredit">查看征信报告</span> -->
      <view-credit-report :moduleCode="'counterF2F'" :applicationId="applicationId" :isEdit="isDetail" @showCredit="showCredit1"></view-credit-report>
    </div>

    <!-- 客户信息 -->
    <customers-Info :applicationIdDetail="applicationId" :isDetail="true" :icDisabled="false"></customers-Info>

    <div class="shade" v-show="isShowCredit"></div>
    <!-- 查看征信报告 -->
    <popup :isShowDialog="isShowCredit" :url="creditReport" :isReport="true" :applicationId="applicationId" menuDesc="柜面面签" :iframe="true" :center="true" :width="800" :height="700" @closeDialog="isShowCredit = false"></popup>
  </div>
</template>

<script>
import customersInfo from "../face2face-undisposed/customers-info/index"; // 客户信息组件
import popup from "@components/popup/index";
import viewCreditReport from '@components/viewCreditReport/index';
export default {
  name: "face2face-preview",
  components: {
    customersInfo,
    popup,
    viewCreditReport
  },
  data() {
    return {
      applicationId: this.$route.query.applicationId,
      isShowCredit: false,
      creditReport: ''
    };
  },
  created() {

  },
  methods: {
    showCredit() {
      this.$getCreditReport("counterF2F", this.applicationId).then(res => {
        this.creditReport = res;
        this.isShowCredit = true;
      });
    },
    showCredit1(_data) {
      this.creditReport = _data.creditReport;
      this.isShowCredit = _data.isShowCredit;
    }
  }
};
</script>

<style lang="less">
</style>

<style lang="less" scoped>
  .shade {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 9999;
  }
</style>

<style lang="less">
  .btn-right.remote-check-tabs-btn {
    > div {
      > ul.hover_down {
        top: 15px;
      }
    }
  }
</style>
