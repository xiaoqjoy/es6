<template>
<div class="drop_loan">
	<div class="dialog-mask"></div>
  <div class="dialog-box">
		<div class="dialog-box__top">
			<h5 class="title bg__white">{{reportType===1 ? '自雇调查报告' : '受薪调查报告'}}</h5>
      <div class="icon_btn_line" v-if="isSurveying && !isPreview">
        <div class="icon_left_btn point" @click="toImage">影像上传</div>
        <div class="icon_left_btn point" @click="upAudio">录音上传</div>
      </div>
      <div class="aprManager" v-if="isAprAut">
        <span class="icon_btn_line_title">调查经理：</span>
        <span class="icon_btn_line_content">{{surveyManagerId}}</span>
      </div>
      <div class="icon_btn_line" v-if="!isSurveying && isPreview && notApprovalAudit">
        <div class="icon_lf_btn point" @click="toImage">影像查看</div>
        <div class="icon_lf_btn point" @click="lookRecord" v-if="isSurvey">录音查看</div>
      </div>
			<span class="el-icon-close button button__close" v-if="!isAprAut" @click="closeReport"></span>
		</div>
		<self-employed v-if="reportType===1 && !isPreview" @changeReportType="changeReportType" @viewToPreview="viewToPreview" ref="reportContent" :reportData="reportData" :custInfo="custInfo"></self-employed>
    <salaried-personnel v-if="reportType===2 && !isPreview" @changeReportType="changeReportType" @viewToPreview="viewToPreview" ref="reportContent" :reportData="reportData" :custInfo="custInfo"></salaried-personnel>
    <report-preview v-if="isPreview" :reportData="reportData"></report-preview>
    <div class="btn_group" v-if="!isPreview">
			<el-button type="primary" plain @click="preview">预览</el-button>
			<el-button type="warning" style="width:140px" @click="save">保存</el-button>
			<el-button type="primary" style="width:140px" @click="submit">提交</el-button>
		</div>
  </div>
  <up-audio v-if="upAudioDialog" @close="closeAudio"></up-audio>
  <look-audio v-if="lookAudioDialog" @close="closeAudio"></look-audio>
</div>
</template>

<script>
import "@common/css/dialog";
import { Loading } from 'element-ui';
import {surveyApi} from '../js/server.js';
import {multipleChoice, yesNo} from '../js/utils.js';
import selfEmployed from "./self-employed-survey-report"; // 自雇报告组件
import salariedPersonnel from "./salaried-survey-report"; // 受薪报告组件
import reportPreview from "./report-preview"; // 报告预览
import upAudio from './../audio-oparation/up-audio'; // 录音上传
import lookAudio from './../audio-oparation/look-audio'; // 录音查看
import { mapGetters } from 'vuex';
export default {
  props: {
    isAprAut: { // 是否审批审计
      type: Boolean,
      default: false
    },
    notApprovalAudit: { // 审计审批调用 是否有影像按钮
      type: Boolean,
      default: true
    },
		isLookOver: {
      type: Boolean,
      default: false
    },
    disabled: { // 审批审计调用组件 控制报告影像入口状态
      type: Boolean,
      default: true
    },
    custInfo: {
      type: Object,
      default: function() {
        return {
          custName: '',
          careerTypeCode: '',
          initDistance: '',
          workplaceName: ''
        };
      }
    }
  },
  data() {
    return {
      isSurvey: true, // 判断是否调查模块调用
      isSurveying: false, // 判断是否调查中
      upAudioDialog: false,
      lookAudioDialog: false,
      reportType: 0, // 报告类型 1自雇 2受薪
      isPreview: false, // 预览状态
      reportData: null, // 报告数据
      surveyManagerId: '' // 调查经理
    };
  },
  computed: {
    ...mapGetters([
      'surveyId',
			'applicationId',
      'fieldConfig'
    ])
  },
  created() {
    if (this.$route.name === 'surveying-task-detail') {
      this.isSurveying = true;
    }
    if (this.$route.path.indexOf('/survey/') === -1) {
      this.isSurvey = false;
    }
    // 获取报告信息
    this.getReportData();
	},
  methods: {
    // 获取报告数据
    getReportData() {
      let loadingInstance = Loading.service({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let url = surveyApi.getsurveyReport + this.surveyId + '/edit';
      if (this.isLookOver) {
        url = surveyApi.getsurveyReport + this.surveyId + '/browse'; // 报告预览
      }
      this.$MyFetch.get(url).then(data => {
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        });
        this.reportData = data;
        if (this.reportData.svyBossReport) {
          this.surveyManagerId = this.reportData.svyBossReport.surveyManagerId;
        } else if (this.reportData.svyStaffReport) {
          this.surveyManagerId = this.reportData.svyStaffReport.surveyManagerId;
        }
        this.reportDataFormat(); // 处理多选字段

        this.initReport();
      }).catch(err => {
        this.$error(err.message);
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
        });
      });
    },
    // 确定报告初始状态
    initReport() {
      // 根据报告所存放的内容确定报告类型
      if (this.reportData.svyBossReport && !this.reportData.svyStaffReport) {
        this.reportType = 1;
      } else if (!this.reportData.svyBossReport && this.reportData.svyStaffReport) {
        this.reportType = 2;
      } else {
        // 根据客户类型确定报告类型
        if (!this.custInfo.careerTypeCode || this.custInfo.careerTypeCode.indexOf('自雇') !== -1) {
          this.reportType = 1;
        } else {
          this.reportType = 2;
        }
      }
      if (this.isLookOver) {
        this.isPreview = true;
      }
    },
		// 报告数据格式处理
		reportDataFormat() {
      if (this.reportData && this.reportData.svyBossReport) {
        this.reportData.svyBossReport.hiddenRisk = multipleChoice(this.reportData.svyBossReport.hiddenRisk);
        this.reportData.svyBossReport.cashFlow = multipleChoice(this.reportData.svyBossReport.cashFlow);
				this.reportData.svyBossReport.operateStability = multipleChoice(this.reportData.svyBossReport.operateStability);
        this.reportData.svyBossReport.otherException = multipleChoice(this.reportData.svyBossReport.otherException);
        this.reportData.svyBossReport.shareholdersChangeInd = yesNo(this.reportData.svyBossReport.shareholdersChangeInd);
        this.reportData.svyBossReport.industryChangeInd = yesNo(this.reportData.svyBossReport.industryChangeInd);
      }
      if (this.reportData && this.reportData.svyStaffReport) {
        this.reportData.svyStaffReport.hiddenRisk = multipleChoice(this.reportData.svyStaffReport.hiddenRisk);
        this.reportData.svyStaffReport.jobStability = multipleChoice(this.reportData.svyStaffReport.jobStability);
        this.reportData.svyStaffReport.otherException = multipleChoice(this.reportData.svyStaffReport.otherException);
      }
		},
    toImage() {
      if (this.isSurveying || !this.disabled) {
        this.$showImage(this.applicationId, "调查");
      } else {
        this.$showImage(this.applicationId, "调查", {ReadOnly: '0'});
      }
    },
    // 录音上传
    upAudio() {
      this.upAudioDialog = true;
    },
    lookRecord() {
      this.lookAudioDialog = true;
    },
    closeReport() {
      if (!this.isLookOver && this.isPreview) {
        this.isPreview = false;
      } else {
        this.$emit("close");
      }
    },
    closeAudio() {
      this.upAudioDialog = false;
      this.lookAudioDialog = false;
    },
    changeReportType(value) {
      this.reportType = Number(value);
    },
    viewToPreview(val) {
      this.reportData = val;
      this.isPreview = true;
      document.getElementById('audit_box').scrollTop = 0;
    },
		// 预览报告
		preview() {
			this.$refs.reportContent.previewReport();
		},
		// 保存报告
		save() {
      this.$refs.reportContent.saveReport();
		},
		// 提交报告
		submit() {
      this.$refs.reportContent.submitReport();
		}
  },
  components: {
    selfEmployed,
    salariedPersonnel,
		reportPreview,
    upAudio,
    lookAudio
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
	position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1999;
  .dialog-box {
    width: 1230px;
    .dialog-box__top .title {
      font-weight: bold;
    }
    .aprManager{
      position: absolute;
      top: 0;
      right: 180px;
    }
  }
  .icon_btn_line{
    position:absolute;
    top: 0;
    right: 80px;

    .icon_left_btn{
      float: left;
      padding-left: 20px;
      font-size: 14px;
      color: #538BF1;
      cursor: pointer;
      &:nth-child(1){
        background:url('../../../assets/img/Group10.png') no-repeat left center;
        background-size: 16px;
      }
      &:nth-child(2){
        margin-left:59px;
          background:url('../../../assets/img/icon_record.png') no-repeat left center;
        background-size: 16px;
      }
    }

    .icon_lf_btn{
      float: left;
      padding-left: 20px;
      font-size: 14px;
      color: #538BF1;
      cursor: pointer;
      &:nth-child(1){
        background:url('../../../assets/img/icon_winfo.png') no-repeat left center;
        background-size: 16px;
      }
      &:nth-child(2){
        margin-left:59px;
        background:url('../../../assets/img/icon_eye.png') no-repeat left center;
        background-size: 16px;
      }
    }
  }
  .margin-top__20 {
    margin-top: 20px;
  }
  .pagination {
    margin-top: 20px;
  }
}
/deep/.report_content {
  padding: 0 19px;
  height: 635px;
  overflow-y: scroll;
  .report-type {
    padding-top: 10px;
    padding-bottom: 40px;

    .self-employed, .salaried {
      float: left;
      position: relative;
      width: 100px;
      height:20px;
      line-height: 20px;
    }
    .self-custom, .salaried-custom {
      position: relative;
      float: left;
      margin-top: 1px;
      width: 17px;
      height: 17px;
      border-radius: 50%;
      border:1px solid #666;
    }
		.active {
			border:1px solid #538BF1;
		}
    .active:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom:0;
      margin: auto;
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background: #538BF1;
    }
    label {
      float: left;
      display: block;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      text-indent: 9px;

    }
    input {
      margin: 0;
      position:absolute;
      left: 0;
      top: 0;
      width: 100px;
      height: 20px;
      cursor: pointer;
      opacity: 0;
    }
  }

  .card_box {
    background: #fff;
    margin-bottom: 20px;
    padding-left: 27px;
    padding-right: 23px;
		&:last-child {
			margin-bottom: 0;
		}
    .card_title {
      padding: 19px 0;
      font-size: 14px;
      color: #333333;
      letter-spacing: 0;
      text-indent: 6px;
      border-bottom: 1px solid #e5e5e5;
      font-weight: bold;
      position: relative;
      &:before {
        content: "";
        width: 2px;
        height: 16px;
        position: absolute;
        left: -2px;
        top: 19px;
        background: #538bf1;
      }
    }
    .card_item_box {
      clear: both;
      overflow: hidden;
      .card_item {
        line-height: 30px;
        .card_item_font {
          font-size: 14px;
          color: #151515;
          letter-spacing: 0;
          line-height: 30px;
        }
      }
      .card_content {
        float: left;
        margin-right: 100px;
        margin-bottom: 10px;
        padding-top: 10px;
      }
      .card_content_title {
        font-size: 14px;
        color: #666;
        text-align: center;
        line-height: 20px;
      }
      .card_content_font {
        font-size: 14px;
        color: #000000;
        letter-spacing: 0;
        line-height: 20px;
      }
      .orange{
        color: orange;
      }
      .adress-control-select{
        width:300px;
        .adress-control{
          width:90px;
        }
      }
      .margin_right0{
        margin-right: 0;
      }
    }
    .items_padding10 {
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .items_padding_top20 {
      padding-top: 20px;
    }

    .items_padding_bottom20 {
      padding-bottom: 20px;
    }

    .margin0 {
      margin: 0;
    }
    .margin_right0{
      margin-right: 0;
    }
    .margin_bottom10 {
      margin-bottom: 10px;
    }
    .margin_bottom0 {
      margin-bottom: 0;
    }
    .margin200 {
      margin-right: 200px;
    }
    .width211 {
      width: 211px;
    }
    .width245 {
      width: 245px;
    }
    .width530 {
      width: 530px;
    }
    .width790 {
      width: 790px;
    }
    .width815 {
      width: 815px;
    }
    .text_area {
      width: 100%;
      // height: 102px;
    }
    .text_left {
      text-align: left;
    }
  }

  .padding_bottom20{
    padding-bottom:20px;
  }

  .operation_btn_group {
    width: 132px;
    height: 20px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    & > div {
      box-sizing: content-box;
      width: 14px;
      height: 14px;
      padding: 15px;
      cursor: pointer;
    }
    .plus {
      background: url(../../../assets/img/icon_plus.png) no-repeat center;
      background-size: 14px;
    }
    .minus {
      background: url(../../../assets/img/icon_minus.png) no-repeat center;
      background-size: 14px;
    }
    .edit {
      background: url(../../../assets/img/icon_edit.png) no-repeat center;
      background-size: 14px;
    }
    .sure {
      background: url(../../../assets/img/icon_sure.png) no-repeat center;
      background-size: 14px;
    }
  }
  .card_panel {
    margin-top: 20px;
    border: 1px solid #e9e9e9;
    .gray_font {
      color: #666;
    }
    .card_panel_title {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 30px;
      font-size: 14px;
      color: #333;
      line-height: 30px;
      background: #f9fafb;
      border-bottom: 1px solid #e9e9e9;
      .panel_title_text {
        flex-grow: 1;
        text-align: center;
      }
      .panel_title_provisos {
        width: 100px;
      }
    }
    .card_panel_body {
      padding: 20px 0;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      .panel_content_left {
        width: 543px;
        padding-left: 32px;
        border-right: 1px solid #e9e9e9;
      }
      .panel_content_right {
        width: 573px;
        padding-left: 38px;
      }
    }
    .panel_body_item {
      padding: 20px 32px 10px;
    }
  }
  .card_panel_reset {
    .el-form-item {
        margin-right: 80px;
    }
    .margin_right370{
      margin-right: 370px;
    }
    .total-expenditure {
      display: inline-block;
      font-size: 14px;
      color: #666;
    }
    .orange {
      color: orange;
    }
  }
  .el-table .cell{
    display:flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
	.el-table::before{
		background: none;
	}
	.hidden{
		display:none;
	}
}
.btn_group{
	padding-top: 20px;
	height:62px;
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .el-button--primary.is-plain {
    width:140px;
    height:40px;
  }
}
</style>
