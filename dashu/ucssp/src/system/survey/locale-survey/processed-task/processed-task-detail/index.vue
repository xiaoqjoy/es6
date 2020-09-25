<template>
  <div>
    <div class="audit_box" id="audit_box" :class="{'no-scroll': reportDialog}">
      <div class="audit_top" id="audit_top">
        <div class="backAudit">
          <router-link to="/system/survey/locale-survey/processed-task" v-if="isFinish">
            <span class="blue_font bold">已处理任务</span>
          </router-link>
          <router-link to="/system/survey/locale-survey/line-failure" v-else>
            <span class="blue_font bold">额度失效</span>
          </router-link>
          <span class="el-icon-arrow-left"></span>
          <span class="black_font">调查报告</span>
        </div>
        <div class="entry-report-wrap">
          <span class="entry-report icon_left_btn point" @click="openSurveyReport">调查报告查看</span>
        </div>
      </div>
      <survey-detail :insertNavBar="insertNavBar" :nav-bardian="navBardian" @anchor="anchor" @setCustInfo="setCustInfo">
        <div slot="survey-booking" class="content_border" :style="{'padding-bottom':(reportDialog ? '1800px' : '300px')}" :id="'#anchor-' + props.surveyReserveInfo.index" slot-scope="props">
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
      navBardian: ["调查预约"],
      activeBtn: 0,
      insertNavBar: [],
      isLookOver: true,
      custInfo: {},
      isFinish: false // 是否已处理
    };
  },
  computed: {
    ...mapGetters([
      'surveyId',
      'applicationId',
      'surveySource'
    ])
  },
  created() {
    if (this.$route.name.indexOf('processed-task-detail') !== -1) {
      this.isFinish = true;
    } else {
      this.isFinish = false;
    }
  },
  mounted() {
    this.addNavBar(this.surveySource);
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
</style>
