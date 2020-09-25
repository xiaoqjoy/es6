<template>
  <div>
    <div class="audit_box" id="audit_box">
      <div class="audit_top" id="audit_top" ref="auditTop">
        <div class="backAudit">
          <router-link to="/system/survey/locale-survey-manager/under-investigation">
            <span class="blue_font bold">调查中任务</span>
          </router-link>
          <span class="el-icon-arrow-left"></span>
          <span class="black_font">任务分配</span>
        </div>
        <div class="content">
          <div class="content_head_title" :class="{'head_border_bottom' : isShowInfo}">调查任务调整<div class="btn_select" :class="{'btn_select_clicked' : isShowInfo}" @click="showInfo"></div> </div>
          <div v-if="isShowInfo">
            <el-form class="search" :inline="true" :model="searchInfo" :rules="searchRule" ref="searchInfo">
              <el-form-item prop="userName">
                <el-input v-model="searchInfo.userName" clearable placeholder="用户名称" maxlength="20"></el-input>
              </el-form-item>
              <el-form-item prop="directorName">
                <el-input v-model="searchInfo.directorName" clearable placeholder="调查主管" maxlength="20"></el-input>
              </el-form-item>
              <el-form-item prop="serviceName">
                <el-input v-model="searchInfo.serviceName" clearable placeholder="处理中心" maxlength="20"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button class="width100" type="primary" @click="search">查询</el-button>
                  <el-button class="width100" type="primary" plain @click="clearSearch">清空</el-button>
                </el-form-item>
            </el-form>

            <div class="content_table_wrap">
              <div class="check_mask"></div>
              <el-table :data="distributionList" height="136" ref="singleTable" style="width:100%" highlight-current-row @row-click="rowCheck" @select="setCurrent" :header-row-class-name="headStyle" :row-class-name="rowStyle">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="userId" label="用户编码"></el-table-column>
                <el-table-column prop="userName" label="用户名称"></el-table-column>
                <el-table-column prop="directorName" label="调查主管"></el-table-column>
                <el-table-column prop="serviceName" label="处理中心"></el-table-column>
                <el-table-column prop="surveyCount" label="处理中任务数"></el-table-column>
              </el-table>
            </div>

            <div class="page_box">
              <pagination @jump-page='handleCurrentChange' :page='searchInfo' class="pagination"></pagination>
            </div>

          <!-- 保存提交按钮 -->
            <div class="tail_btn clearfloat">
                <el-button type="primary" style="width:140px" @click="sureDistribution">确定</el-button>
            </div>
          </div>
        </div>
      </div>
      <survey-detail :nav-bardian="navBardian" @anchor="anchor" :audit-top="auditTop" ref="surveyDeatil">
          <div slot="survey-booking" class="content_border" :style="{'padding-bottom':'300px'}" id="#anchor-7" slot-scope="props">
            <div class="content_title_head" :class="{ content_title_on : activeBtn === 7 }">
              <span class="content_title_headA"></span>
              <span class="content_title_headB" id="surveyBooking">调查预约</span>
            </div>
            <div class="content">
              <div class="content_bottom_border content_top_padding">
                <div class="clearfloat topology_margin">
                  <div class="top_conten"><span class="top_conten_title">总预约数：</span><span class="top_content_font">{{props.surveyReserveInfo.reserveInfo.length}}</span></div>
                  <div class="top_conten"><span class="top_conten_title">计划调查时间：</span><span class="top_content_font">{{props.surveyReserveInfo.plannedSurveyTime}}</span></div>
                </div>
              </div>
              <div class="clearfloat" :class="{  content_top_padding : !index}" v-for="(item, index) in props.surveyReserveInfo.reserveInfo" :key="item.id">
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
  </div>
</template>

<script>
import pagination from "@components/pagination"; // 分页条
import surveyDetail from "./../../../survey-detail/survey-detail";
import {surveyApi} from './../../../js/server.js';
import reportValidator from "./../../../js/reportRules.js";
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      // 待分配列表数据,后台取
      distributionList: [],
      // 查询表单信息
      searchInfo: {
        surveyId: '',
        userName: '',
        directorName: '',
        serviceName: '',
        pageNum: 1,
        pageSize: 10,
        account: 0,
        currentPage: 1,
        showJumpButton: true
      },
      searchRule: {
        userName: [
          { max: 20, trigger: 'blur', message: '请输入20字符以内' },
          { trigger: 'blur', validator: reportValidator.chineseRule }
        ],
        directorName: [
          { max: 20, trigger: 'blur', message: '请输入20字符以内' },
          { trigger: 'blur', validator: reportValidator.chineseRule }
        ],
        serviceName: [
          { max: 20, trigger: 'blur', message: '请输入20字符以内' },
          { trigger: 'blur', validator: reportValidator.chineseRule }
        ]
      },
      checkedRow: {},
      navBardian: ["调查预约"],
      activeBtn: 0,
      auditTop: 0, // top信息框动态高度
      isShowInfo: true
    };
  },
  computed: {
    ...mapGetters([
      'surveyId' // vuex 传参
    ])
  },
  created() {
    // 获取分配列表
    this.getList();
  },
  mounted() {
    this.getAuditTopHeight();
  },
  methods: {
    // 获取auditTop 动态高度
    getAuditTopHeight() {
      this.$nextTick(() => {
        if (this.isShowInfo) {
          this.auditTop = 435; // 此处offsetHeight不准，不得已使用元素实际高度,
        } else {
          this.auditTop = 125;
        }
      });
    },
    // 切换待预约信息的显示状态
    showInfo() {
      this.isShowInfo = !this.isShowInfo;
      this.getAuditTopHeight();
    },
    getList() {
      this.searchInfo.surveyId = this.surveyId;
      this.$MyFetch.post(surveyApi.taskAllacats, this.searchInfo)
      .then((data = {}) => {
          if (data.total === 0) {
            this.$message({
              showClose: true,
              message: '未查询到结果',
              type: 'warning'
            });
          }
          this.distributionList = data.list;
          this.searchInfo.account = data.total;
        })
        .catch((err) => {
          this.$error(err.message);
        });
    },
    search() {
      this.$refs.searchInfo.validate(valid => {
        if (valid) {
          this.searchInfo.pageNum = 1;
          this.searchInfo.currentPage = 1;
          this.getList();
        }
      });
    },
    clearSearch() {
      this.$refs["searchInfo"].resetFields();
      this.searchInfo.pageNum = 1;
      this.searchInfo.currentPage = 1;
      this.getList();
    },
    // 确认分配
    sureDistribution() {
      this.checkedRow.surveyId = this.surveyId;
      this.checkedRow.surveyStatus = 'doSurveyTask';
      this.$MyFetch.post(surveyApi.taskAllocatSubmit, this.checkedRow)
      .then((data = {}) => {
          if (data) {
            this.$message({
              showClose: true,
              message: '任务分配成功',
              type: 'success'
            });
          }
          this.$router.push({
            path: 'under-investigation'
          });
        })
        .catch((err) => {
          this.$error(err.message);
        });
    },
    setCurrent(selection, row) {
      this.checkedRow = row;
      if (selection.length > 1) {
        this.$refs.singleTable.clearSelection();
        this.$refs.singleTable.toggleRowSelection(row);
      }
    },
    rowCheck(row, column, e) {
      this.checkedRow = row;
      this.$refs.singleTable.clearSelection();
      this.$refs.singleTable.toggleRowSelection(row);
    },
    anchor(index) {
      this.activeBtn = index;
    },
    handleCurrentChange(val) {
      this.searchInfo.pageNum = val;
      this.searchInfo.currentPage = val;
      this.getList();
    },
    headStyle({row, rowIndex}) {
      return 'my_table_head';
    },
    rowStyle({row, rowIndex}) {
      return 'my_table_body';
    }
  },
  components: {
    surveyDetail,
    pagination
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.content_table_wrap{
  position: relative;
  .check_mask{
    width: 30px;
    height: 20px;
    position: absolute;
    left: 15px;
    top: 7px;
    background: #F9FAFB;
    z-index: 10;
  }
}
.el-form-item {
  margin-top: 10px;
  margin-bottom: 20px;
}
.pagination{
  float: right;
  margin-bottom: 10px;
  margin-right: 30px;
}
.clearfloat{
  clear:both;
}
</style>
