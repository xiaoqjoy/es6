<template>
  <div class="credit_report_wrap content">
    <el-row class="content_mian">
      <el-button
        :disabled="isEdit"
        class="small-btn"
        @click="getCreditReport(true)"
      >刷新</el-button>
    </el-row>
    <div class="herBox">
      <el-table
        class="tables_width"
        max-height="340"
        :data="aprRelatedCredit"
        style="margin:0 0 20px 20px">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column prop="creditQueryName" label="姓名"></el-table-column>
        <el-table-column prop="certificateNum" label="身份证号码"></el-table-column>
        <el-table-column prop="contactRelationCode" label="与借款人关系"></el-table-column>
        <!-- <el-table-column prop="badCreditInd" label="是否为信用不良"></el-table-column>需求变更删除字段 -->
        <el-table-column prop="generatedTime" label="查询时间"></el-table-column>
        <el-table-column prop="reportSource" label="来源"></el-table-column>
        <el-table-column prop="creditVersionLabel" label="类型"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="checkCreditReport(scope.row.reportNum, scope.row.creditVersion)"
              type="text"
              size="small"
              class="sytCBlue"
            >信用报告明细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { aprAudApi } from "../../js/server.js";
export default {
  props: {
    isEdit: {
      type: [Boolean],
      default: false
    },
    moduleCode: {
      type: String,
      default: 'counterF2F' // 柜面面签
    },
    taskNode: {
      type: String,
      default: 'approval'
    },
    applicationId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      msg: 'xxx',
      aprRelatedCredit: [],
      creditReport: ''
    };
  },
  methods: {
    getCreditReport(fresh) {
      let url = '';
      if (this.taskNode === 'approval') {
        if (fresh) {
          url = `${aprAudApi.taskDetail.creditReportRefresh}/${this.applicationId}`;
        } else {
          url = `${aprAudApi.taskDetail.creditReportData}/${this.applicationId}`;
        }
      }
      if (this.taskNode === 'audit') {
        if (fresh) {
          url = `${aprAudApi.aud.taskDetail.creditReportRefresh}/${this.applicationId}`;
        } else {
          url = `${aprAudApi.aud.taskDetail.creditReportData}/${this.applicationId}`;
        }
      }
      this.$getDictCode("credit_version").then(res => {
        let creditVersionLib = {};
        res.forEach(_v => {
          creditVersionLib[_v.itemCode] = _v.itemDesc;
        });
        this.$MyFetch.get(url).then((data = []) => {
          let obj = {
            '001': '合作方',
            '002': '第三方',
            '003': '陪同征信',
            '004': '自带征信'
          };
          data.forEach(_v => {
            _v.reportSource = obj[_v.reportSourceCode];
            _v.badCreditInd = _v.badCreditInd === 1 ? '是' : '否';
            _v.creditVersionLabel = creditVersionLib[_v.creditVersion];
          });
          this.aprRelatedCredit = data;
          if (fresh) {
            this.$message({
              message: '刷新成功',
              center: true
            });
          }
        });
      }).catch(err => {
        this.$error(err.message);
      });
    },
    checkCreditReport(reportNum, creditVersion) {
      this.$getCreditReport(this.moduleCode, reportNum, {
        creditReportId: reportNum
      }).then(res => {
        this.creditReport = res;
        let name = this.appOrAud ? 'creditReportMsgA' : 'creditReportMsgB';
        let relevanceData = this.$router.resolve({
          name,
          query: {
            url: this.creditReport
          }
        });
        window.open(relevanceData.href, "_blank");
        // this.isShowCredit = true;
      });
    }
  },
  mounted() {
    this.getCreditReport();
  }
};
</script>

<style lang="less">
  .credit_report_wrap {
    .content_mian {
      text-align: left;
      margin: 20px;
    }
    .small-btn {
      width: 80px;
      height: 30px;
      background: #fff;
      color: #538Bf1;
      border: 1px solid #538Bf1;
      padding: 0;
      margin-top: 5px;
    }
    .herBox {
      margin-bottom: 20px;
      .el-table thead tr th {
        padding: 6px 0;
        background: #ececec;
      }
    }
    .tables_width {
      width: 97.5%;
      border: 1px solid #d0d0d0;
    }
  }
</style>
