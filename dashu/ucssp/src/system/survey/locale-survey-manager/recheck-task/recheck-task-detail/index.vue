<template>
  <div>
    <div class="audit_box" id="audit_box" :class="{'no-scroll': reportDialog}">
      <div class="audit_top" id="audit_top">
        <div class="backAudit">
          <router-link to="/system/survey/locale-survey-manager/recheck-task">
            <span class="blue_font bold">待复核任务</span>
          </router-link>
          <span class="el-icon-arrow-left"></span>
          <span class="black_font">复核</span>
        </div>
        <div class="content">
          <div class="content_title">调查报告复核</div>
          <div class="top_content_full_line"><span class="top_conten_title">目前调查距离（KM）：</span><span class="top_content_font">{{recheckModel.initDistance}}</span></div>
          <el-form :model="recheckModel" :rules="recheckRules" ref="recheckModel" label-width="100px" class="input_box text_left" label-position="top">
            <el-form-item label="修改后的距离" prop="updatedDistance">
              <el-input v-model="recheckModel.updatedDistance" placeholder="请填写"></el-input>
            </el-form-item>
            <el-form-item label="复核结果" prop="checkResult">
              <el-select v-model="recheckModel.checkResult" placeholder="请选择" v-if="fieldConfig.check_result" @change="clearAbnormalReason">
                <el-option v-for="item in fieldConfig.check_result.children" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="异常原因" prop="abnormalReason">
              <el-select multiple collapse-tags clearable v-model="recheckModel.abnormalReason" placeholder="请选择" :disabled="recheckModel.checkResult === '00'">
                <el-option v-for="item in abnormalReasonList" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="input_box_last" label="意见签署" prop="checkOpinion">
              <el-input v-model="recheckModel.checkOpinion" placeholder="请填写" maxlength="100"></el-input>
            </el-form-item>
          </el-form>

        <!-- 保存提交按钮 -->
          <div class="tail_btn">
            <el-button type="warning" style="width:140px" @click="doSave">保存</el-button>
            <el-button type="primary" style="width:140px" @click="doSend">提交</el-button>
          </div>
        </div>

        <div class="entry-report-wrap">
          <span class="entry-report icon_left_btn point" @click="openSurveyReport">调查报告查看</span>
        </div>
      </div>

      <survey-detail :insertNavBar="insertNavBar" @setRecheckModel="setRecheckModel" :nav-bardian="navBardian" @anchor="anchor" ref="surveyDeatil">
          <div slot="survey-booking" class="content_border" style="padding-bottom:300px" :id="'#anchor-' + props.surveyReserveInfo.index" slot-scope="props">
            <!-- :surveyReserveInfo="{info:pageData.surveyReserveInfo, 'index':index, title: item}" -->
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
import surveyDetail from "./../../../survey-detail/survey-detail";
import surveyReport from "./../../../survey-report/survey-report";
import { surveyApi } from "./../../../js/server.js";
import { mapGetters } from 'vuex';
import {surveyMixin} from './../../../js/utils';
import reportValidator from "./../../../js/reportRules.js";
export default {
  mixins: [surveyMixin],
  data() {
    return {
      reportDialog: false, // 调查报告弹窗
      insertNavBar: [],
      navBardian: ["调查预约"],
      activeBtn: 0,
      isLookOver: true,
      custInfo: {},
      abnormalReasonList: [],
      recheckModel: {
        applicationId: "",
        checkOpinion: "",
        checkResult: [],
        flag: "",
        surveyId: "",
        updatedDistance: "",
        abnormalReason: []
      },
      recheckRules: {
        updatedDistance: [
          { trigger: "blur", validator: reportValidator.numberValid(0, NaN, '调查距离') }
        ],
        checkResult: [
          { required: true, message: "请选择复核结果", trigger: "change" }
        ],
        checkOpinion: [
          { required: true, message: "请填写意见签署", trigger: "blur" },
          { max: 100, trigger: 'change', message: '字数超限' }
          // { trigger: 'blur', validator: reportValidator.chineseRule }
        ],
        abnormalReason: [
          { required: false, message: "请选择异常原因", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters([
      'surveyId', // vuex 传参
      'applicationId',
      'fieldConfig',
      'surveySource'
    ])
  },
  created() {
    this.recheckModel.surveyId = this.surveyId;
    this.recheckModel.applicationId = this.applicationId;
    this.getAbnomalReason();
  },
  mounted() {
    this.addNavBar(this.surveySource);
  },
  methods: {
    clearAbnormalReason(_item) {
      this.recheckRules.abnormalReason[0].required = true;
      if (_item === '00') {
        this.recheckRules.abnormalReason[0].required = false;
        this.recheckModel.abnormalReason = [];
        this.$refs.recheckModel.clearValidate('abnormalReason');
      }
    },
    getAbnomalReason() {
      let data = {
        status: true
      };
      this.$MyFetch.get(surveyApi.queryAbnormal, data).then(data => {
        this.abnormalReasonList = data.list;
      }).catch((err) => {
        this.$error(err.message);
      });
    },
    // 固定导航锚链接
    anchor(index) {
      this.activeBtn = index;
    },
    // 调查报告填写
    openSurveyReport() {
      this.reportDialog = true;
    },
    // 关闭调查报告弹窗
    close() {
      this.reportDialog = false;
    },
    // 从详情接口取到客户信息 报告用
    setCustInfo(val) {
      this.custInfo = val;
    },
    // 设置复核信息
    setRecheckModel(val) {
      if (val) {
        this.recheckModel.checkOpinion = val[0].checkOpinion;
        this.recheckModel.checkResult = val[0].checkResult;
        if (this.recheckModel.checkResult === '01') {
          this.recheckRules.abnormalReason[0].required = true;
        }
        this.recheckModel.initDistance = val[0].initDistance;
        this.recheckModel.updatedDistance = val[0].updatedDistance;
        this.recheckModel.abnormalReason = [...val[0].abnormalReason];
        this.custInfo = val;
      }
      this.$nextTick(() => {
        this.$refs.recheckModel.clearValidate();
      });
    },
    clearSearch() {
      this.$refs["searchInfo"].resetFields();
      this.getList(true);
    },
    // 保存复核
    doSave() {
      this.recheckModel.flag = false;
      this.request();
    },
    // 提交复核
    doSend() {
      this.recheckModel.flag = true;
      this.request();
    },
    // 校验调查复核信息表单
    validRecheck() {
      return new Promise((resolve, reject) => {
        this.$refs.recheckModel.validate(valid => {
          if (valid) {
            resolve();
          } else {
            reject(Error);
          }
        });
      });
    },
    // 发提交或保存的请求
    request() {
      this.validRecheck().then(() => {
        this.$MyFetch.post(surveyApi.surveyCheck, this.recheckModel).then(data => {
          if (data && this.recheckModel.flag) {
            this.$message({
              showClose: true,
              message: '任务复核通过',
              type: 'success'
            });
            this.$router.push({
              path: 'recheck-task'
            });
          } else {
            this.$message({
              showClose: true,
              message: '复核保存成功',
              type: 'success'
            });
            this.$refs.surveyDeatil.getData();
            console.log(this.$refs.surveyDeatil.getData());
          }
        }).catch((err) => {
          this.$error(err.message);
        });
      });
    },

    headStyle({ row, rowIndex }) {
      return "my_table_head";
    },
    rowStyle({ row, rowIndex }) {
      return "my_table_body";
    }
  },
  components: {
    surveyDetail,
    surveyReport
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.audit_box .audit_top {
    padding: 0;
}
.audit_top {
  .entry-report-wrap {
    background:none;
    margin:0;
    height:40px;
    line-height:40px;
    text-align: left;
    text-indent: 30px;
  }
  .content_title {
    margin-bottom: 10px;
  }
  .top_content_full_line {
    margin-left: 30px;
    margin-bottom: 10px;
    padding-top: 10px;
  }
  .input_box {
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-right:30px;

    .el-form-item {
      width: 245px;
      margin-left:30px;
    }
    .input_box_last{
      flex-grow: 1;
    }
  }
  .tail_btn{
    clear:both;
  }
  .icon_btn_line {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height:44px;
    margin:0 30px 0 30px;
    background: none;
  }
}
</style>
