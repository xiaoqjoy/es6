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
      <el-form-item prop="surveyManagerName">
        <el-input v-model.trim="searchInfo.surveyManagerName" clearable placeholder="调查经理" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item prop="subcompanyName" v-if="role">
        <el-input v-model.trim="searchInfo.subcompanyName" clearable placeholder="所属分公司" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item prop="taskTriggerStartTime">
        <el-date-picker v-model="searchInfo.taskTriggerTime" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" start-placeholder="任务触发时间(起)" end-placeholder="任务触发时间(终)" @change="changeTime"></el-date-picker>
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
        <el-table-column prop="custName" label="客户名称" width="150"></el-table-column>
        <el-table-column prop="organizationName" label="所属分公司" width="90"></el-table-column>
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
        <el-table-column prop="reserveStatus" label="异常标识" width="150"></el-table-column>
        <el-table-column prop="taskTriggerTime" label="任务触发时间" width="160"></el-table-column>
        <el-table-column prop="taskArrivalTime" label="任务到达时间" width="160"></el-table-column>
        <el-table-column prop="surveyReserveTime" label="调查预约发起时间" width="160"></el-table-column>
        <el-table-column prop="plannedSurveyTime" label="计划调查时间" width="160"></el-table-column>
        <el-table-column prop="padStartLocateTime" label="PAD起点定位时间" width="160"></el-table-column>
        <el-table-column prop="padEndLocateTime" label="PAD终点定位时间" width="160"></el-table-column>
        <el-table-column prop="surveyManagerId" label="调查经理" width="150"></el-table-column>
        <el-table-column prop="surveyOrganizationName" label="调查分公司" width="150" v-if="role"></el-table-column>
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
import { userInfo } from '@common/js/localStorage';
export default {
  name: "under-investigation",
  data() {
    return {
      // 列表页数据,后台取
      pageData: {},
      searchInfo: {
        applicationId: '',
        custName: '',
        pageNum: 1,
        pageSize: 10,
        subcompanyName: '',
        surveyStatus: 'doSurveyTask',
        surveyManagerName: '',
        taskTriggerStartTime: '', // 任务触发时间（起）
        taskTriggerEndTime: '',
        taskTriggerTime: [],
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
        surveyManagerName: [
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
  computed: {
    role() {
      let roleList = JSON.parse(userInfo.getUserInfo()).role;
      for (let x of roleList) {
        if (x.roleId === 'cpms_survey_r_003') {
          return true;
        }
      }
      return false;
    }
  },
  created() {
    // 获取数据列表
    this.getList();
  },
  methods: {
    // 选择任务触发时间
    changeTime(val) {
      if (val) {
        this.searchInfo.taskTriggerStartTime = val[0];
        this.searchInfo.taskTriggerEndTime = val[1];
      } else {
        this.searchInfo.taskTriggerStartTime = '';
        this.searchInfo.taskTriggerEndTime = '';
      }
    },
    getList() {
      this.$MyFetch.post(surveyApi.allocatingList, this.searchInfo)
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
      this.searchInfo.taskTriggerTime = [];
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
        name: 'under-investigation-detail',
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
