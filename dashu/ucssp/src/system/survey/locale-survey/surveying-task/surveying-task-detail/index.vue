<template>
  <div>
    <div class="audit_box" id="audit_box" :class="{'no-scroll': reportDialog}">
      <div class="audit_top" id="audit_top">
        <div class="backAudit">
          <router-link to="/system/survey/locale-survey/surveying-task">
            <span class="blue_font bold">调查中任务</span>
          </router-link>
          <span class="el-icon-arrow-left"></span>
          <span class="black_font">调查报告</span>
        </div>
        <div class="entry-report-wrap">
          <span class="entry-report icon_left_btn point" @click="openSurveyReport">调查报告填写</span>
        </div>
      </div>
      <survey-detail :insertNavBar="insertNavBar" :surveyStatus='surveyStatus' :nav-bardian="navBardian" @anchor="anchor" @setCustInfo="setCustInfo">
          <div slot="survey-booking" class="content_border" :style="{'padding-bottom':(reportDialog ? '2500px' : '300px')}" :id="'#anchor-' + props.surveyReserveInfo.index" slot-scope="props">
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
              <div class="clearfloat" :class="{ content_top_padding : !index }" v-for="(item, index) in props.surveyReserveInfo.info.reserveInfo" :key="item.id">
                <div class="top_conten"><span class="top_conten_title">预约时间{{index+1}}：</span><span class="top_content_font">{{item.reserveTime}}</span></div>
                <div class="top_conten"><span class="top_conten_title">预约状态：</span><span class="top_content_font">{{item.reserveStatus}}</span></div>
                <div class="top_conten" v-show="item.isAbnormal"><span class="top_conten_title">异常情况说明：</span><span class="top_content_font">{{item.exceptionDesc}}</span></div>
                <div class="top_conten" v-show="!item.isAbnormal"><span class="top_conten_title">计划调查时间：</span><span class="top_content_font">{{item.plannedSurveyTime}}</span></div>
                <div class="top_conten" v-show="item.isAbnormal && item.hasRemark"><span class="top_conten_title">备注：</span><span class="top_content_font">{{item.otherRemark}}</span></div>
              </div>
            </div>
          </div>
      </survey-detail>
    </div>
    <survey-report v-if="reportDialog" @close="close" :custInfo="custInfo"></survey-report>
  </div>
</template>

<script>
import surveyDetail from './../../../survey-detail/survey-detail';
import surveyReport from './../../../survey-report/survey-report';
import {surveyMixin} from './../../../js/utils';
import { mapGetters } from 'vuex';
export default {
  mixins: [surveyMixin],
  props: {
    surveyStatus: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      reportDialog: false, // 调查报告弹窗
      upAudioDialog: false,
      navBardian: ["调查预约"],
      insertNavBar: [],
      activeBtn: 0,
      custInfo: {}
    };
  },
  computed: {
    ...mapGetters([
      'surveyId',
      'applicationId',
      'surveySource'
    ])
  },
  created() {},
  mounted() {
    this.addNavBar(this.surveySource);
  },
  methods: {
    // 固定导航锚链接
    anchor(index) {
      this.activeBtn = index;
    },
    // 调查报告填写
    openSurveyReport() {
      this.reportDialog = true;
    },
    close() {
      this.$confirm('是否关闭弹窗？')
      .then(_ => {
        this.reportDialog = false;
      })
      .catch(_ => {});
    },
    // 从详情接口取到客户信息 报告用
    setCustInfo(val) {
      this.custInfo = val;
      if (this.$route.query && this.$route.query.surveyTypeST01) {
        let surveyTypeST01 = window.atob(this.$route.query.surveyTypeST01).indexOf('ST01') >= 0;
        this.custInfo.surveyTypeST01 = surveyTypeST01;
      }
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
