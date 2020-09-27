<template>
  <div class="survey_task_list">
    <!-- 查询表单 -->
    <el-form class="search" :inline="true" :model="searchInfo" ref="searchInfo" :rules="searchRule">
      <el-form-item prop="applicationId">
        <el-input v-model.trim="searchInfo.applicationId" clearable placeholder="申请编号" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item prop="custName">
        <el-input v-model.trim="searchInfo.custName" clearable placeholder="客户名称" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item prop="subcompanyName">
        <el-input v-model.trim="searchInfo.subcompanyName" clearable placeholder="所属分公司" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="width100" type="primary" @click="search">查询</el-button>
        <el-button class="width100" type="primary" plain @click="clearSearch">清空</el-button>
      </el-form-item>
    </el-form>
    <div class="table_box">
      <!-- 表格数据 -->
      <el-table :data="pageData.list" style="100%">
        <el-table-column label="序号">
          <template slot-scope="scope"><span>{{scope.$index+1}} </span></template>
        </el-table-column>
        <el-table-column prop="applicationId" label="申请编号" width="200"></el-table-column>
        <el-table-column prop="custName" label="客户名称" width="100"></el-table-column>
        <el-table-column prop="organizationName" label="所属分公司" width="150"></el-table-column>
        <el-table-column prop="careerTypeCode" label="客户类型" width="100"></el-table-column>
        <el-table-column prop="applicationSubmitAmt" label="贷款申请金额（元）" width="150"></el-table-column>
        <el-table-column prop="workplaceName" label="经营实体名称" width="220">
          <template slot-scope="scope">
            <el-popover width="400" trigger="hover" placement="top">
              <p>{{scope.row.workplaceName}}</p>
              <div slot="reference">
                <p class="yincan ellipsis">
                  {{scope.row.workplaceName}}
                </p>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="workAddressDesc" label="区域" width="200"></el-table-column>
        <el-table-column prop="triggerFlag" label="任务触发标识" width="150"></el-table-column>
        <el-table-column prop="triggerUserId" label="面签人员" width="150"></el-table-column>
        <el-table-column prop="taskTriggerTime" label="任务触发时间" width="160"></el-table-column>
        <el-table-column prop="plannedSurveyTime" label="计划调查时间" width="160"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="jumpToDetail(scope.row)"> 任务详情 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="page_box">
      <pagination @jump-page='handleCurrentChange' :page='searchInfo' class="pagination"></pagination>
    </div>
  </div>
</template>

<script>
import pagination from "@components/pagination"; // 分页条
import reportValidator from "../../js/reportRules.js";
import {surveyApi} from '../../js/server.js';
import {careerTypeCodeShow} from '../../js/utils.js';
export default {
  name: "processed-task",
  data() {
    return {
      pageData: {},
      // 查询表单信息
      searchInfo: {
        applicationId: '',
        custName: '',
        pageNum: 1,
        pageSize: 10,
        subcompanyName: '',
        surveyStatus: 'surveyCheckTask',
        account: 0,
        currentPage: 1,
        showJumpButton: true
      },
      searchRule: {
        applicationId: [
          { max: 20, trigger: 'blur', message: '请输入20字符以内' },
          { trigger: 'blur', validator: reportValidator.alphanumeric }
        ],
        custName: [
          { max: 20, trigger: 'blur', message: '请输入20字符以内' },
          { trigger: 'blur', validator: reportValidator.chineseRule }
        ],
        subcompanyName: [
          { max: 20, trigger: 'blur', message: '请输入20字符以内' },
          { trigger: 'blur', validator: reportValidator.chineseRule }
        ]
      }
    };
  },
  created() {
    // 获取数据列表
    this.getList();
  },
  methods: {
    getList() {
      this.$MyFetch.post(surveyApi.managerList, this.searchInfo)
        .then((data = {}) => {
          if (data.total === 0) {
            this.$message({
              showClose: true,
              message: '未查询到结果',
              type: 'warning'
            });
          }
          this.pageData = this.init(data);
          this.searchInfo.account = data.total;
        })
        .catch((err) => {
          this.$error(err.message);
        });
    },
    // 数据处理
    init(data) {
      for (let x of data.list) {
        x.careerTypeCode = careerTypeCodeShow(x.careerTypeCode);
      }
      return data;
    },
    // 查询
    search() {
      this.$refs.searchInfo.validate(valid => {
        if (valid) {
          this.searchInfo.pageNum = 1;
          this.searchInfo.currentPage = 1;
          this.getList();
        }
      });
    },
    // 清空查询信息
    clearSearch() {
      this.$refs["searchInfo"].resetFields();
      this.searchInfo.pageNum = 1;
      this.searchInfo.currentPage = 1;
      this.getList();
    },
    handleCurrentChange(val) {
      this.searchInfo.pageNum = val;
      this.searchInfo.currentPage = val;
      this.getList();
    },
    jumpToDetail(row) {
      this.$store.commit('set_surveyId', row.surveyId);
      this.$store.commit('set_applicationId', row.applicationId);
      this.$router.push({
        name: 'processed-task-detail',
        params: {
          surveyId: row.surveyId,
          applicationId: row.applicationId
        }
      });
    }
  },
  components: {
    pagination
  }
};
</script>
