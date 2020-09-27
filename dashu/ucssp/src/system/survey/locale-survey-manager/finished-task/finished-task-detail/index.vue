<template>
  <div>
    <div class="audit_box" id="audit_box" :class="{'no-scroll': reportDialog}">
      <div class="audit_top" id="audit_top">
        <div class="backAudit">
          <router-link to="/system/survey/locale-survey-manager/finished-task" v-if="isFinish">
            <span class="blue_font bold">已完成任务</span>
          </router-link>
          <router-link to="/system/survey/locale-survey-manager/limit-failure" v-else>
            <span class="blue_font bold">额度失效</span>
          </router-link>
          <span class="el-icon-arrow-left"></span>
          <span class="black_font">报告详情</span>
        </div>
        <div class="entry-report-wrap">
          <span class="entry-report icon_left_btn point" @click="openSurveyReport">调查报告查看</span>
        </div>
      </div>
      <survey-detail :nav-bardian="navBardian" @anchor="anchor" :insertNavBar="insertNavBar" @setCustInfo="setCustInfo">
          <div slot="survey-booking" class="content_border" :id="'#anchor-' + props.surveyReserveInfo.index" slot-scope="props">
            <div class="content_title_head" :class="{ content_title_on : activeBtn === props.surveyReserveInfo.index }">
              <span class="content_title_headA"></span>
              <span class="content_title_headB" id="surveyBooking">调查预约</span>
            </div>
            <div class="content">
              <div class="content_bottom_border content_top_padding">
                <div class="clearfloat topology_margin">
                  <div class="top_conten"><span class="top_conten_title">总预约数：</span><span class="top_content_font">{{props.surveyReserveInfo.info.reserveInfo.length}}</span></div>
                  <div class="top_conten"><span class="top_conten_title">计划调查时间：</span><span class="top_content_font">{{props.surveyReserveInfo.info.plannedSurveyTime}}</span></div>
                </div>
              </div>
              <div class="clearfloat" :class="{  content_top_padding : !index}" v-for="(item, index) in props.surveyReserveInfo.info.reserveInfo" :key="item.id">
                <div class="top_conten"><span class="top_conten_title">预约时间{{index+1}}：</span><span class="top_content_font">{{item.reserveTime}}</span></div>
                <div class="top_conten"><span class="top_conten_title">预约状态：</span><span class="top_content_font">{{item.reserveStatus}}</span></div>
                <div class="top_conten" v-show="item.isAbnormal"><span class="top_conten_title">异常情况说明：</span><span class="top_content_font">{{item.exceptionDesc}}</span></div>
                <div class="top_conten" v-show="!item.isAbnormal"><span class="top_conten_title">计划调查时间：</span><span class="top_content_font">{{item.plannedSurveyTime}}</span></div>
                <div class="top_conten" v-show="item.isAbnormal && item.hasRemark"><span class="top_conten_title">备注：</span><span class="top_content_font">{{item.otherRemark}}</span></div>
              </div>
            </div>
          </div>
          <div slot="recheck-report" class="content_border" :id="'#anchor-' + props.reportCheckInfo.index" style="padding-bottom: 300px" slot-scope="props">
            <div class="content_title_head" :class="{ content_title_on : activeBtn === props.reportCheckInfo.index }">
              <span class="content_title_headA"></span>
              <span class="content_title_headB" id="recheckReport">调查报告复核</span>
            </div>
            <div class="content">
              <div class="content_top_padding margin_left30">
                <!-- <div class="clearfloat topology_margin">
                  <div class="top_conten">
                    <span class="top_conten_title">调查距离：</span><span class="top_content_font">
                      {{props.reportCheckInfo.info.updatedDistance ? props.reportCheckInfo.info.updatedDistance : props.reportCheckInfo.info.initDistance}}
                    </span>
                  </div>
                  <div class="top_conten"><span class="top_conten_title">复核结果：</span><span class="top_content_font">{{props.reportCheckInfo.checkResult}}</span></div>
                  <div class="top_conten"><span class="top_conten_title">意见签署：</span><span class="top_content_font">{{props.reportCheckInfo.checkOpinion}}</span></div>
                </div> -->
                <div class="clearfloat svy_report_check topology_margin" v-for="(item, key) in props.reportCheckInfo.info" :key="item.id">
                  <div class="top_conten">
                    <span class="top_conten_title">调查距离{{props.reportCheckInfo.info.length - key}}：</span><span class="top_content_font">
                      {{item.updatedDistance ? item.updatedDistance : item.initDistance}}
                    </span>
                  </div>
                  <div class="top_conten"><span class="top_conten_title">复核结果{{props.reportCheckInfo.info.length - key}}：</span><span class="top_content_font">{{item.checkResult}}</span></div>
                  <div class="top_conten"><span class="top_conten_title">异常原因{{props.reportCheckInfo.info.length - key}}：</span><span class="top_content_font">{{item.abnormalReasonDesc}}</span></div>
                  <div class="top_conten"><span class="top_conten_title">意见签署{{props.reportCheckInfo.info.length - key}}：</span><span class="top_content_font">{{item.checkOpinion}}</span></div>
                </div>
              </div>
            </div>
          </div>
      </survey-detail>
      <survey-report v-if="reportDialog" @close="close" :isLookOver="isLookOver" :custInfo="custInfo"></survey-report>
    </div>
  </div>
</template>

<script>
import surveyDetail from './../../../survey-detail/survey-detail';
import surveyReport from './../../../survey-report/survey-report';
import {surveyMixin} from './../../../js/utils';
import { mapGetters } from 'vuex';
export default {
  mixins: [surveyMixin],
  data() {
    return {
      reportDialog: false, // 调查报告弹窗
      navBardian: ["调查预约", "调查报告复核"],
      insertNavBar: [],
      activeBtn: 0,
      isLookOver: true,
      custInfo: {},
      isFinish: false
    };
  },
  computed: {
    ...mapGetters([
      'surveyId',
      'applicationId',
      'surveySource'
    ])
  },
  mounted() {
    this.addNavBar(this.surveySource);
  },
  created() {
    if (this.$route.name.indexOf('finished-task-detail') !== -1) {
      this.isFinish = true;
    } else {
      this.isFinish = false;
    }
  },
  methods: {
    anchor(index) {
      this.activeBtn = index;
    },
    openSurveyReport() {
      this.reportDialog = true;
    },
    close() {
      this.reportDialog = false;
    },
    // 从详情接口取到客户信息 报告用
    setCustInfo(val) {
      this.custInfo = val;
      console.log(this.custInfo);
    }
  },
  components: {
    surveyReport,
    surveyDetail
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .audit_box .audit_top {
      padding: 0;
  }
  .margin_left30{
    margin-left:30px;
  }
</style>
