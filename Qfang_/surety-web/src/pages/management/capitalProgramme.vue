<template>
  <div>
    <div class="query-form">
      <el-input v-model="queryForm.ruleName" placeholder="方案名称" class="width-140"></el-input>
      <el-input v-model="queryForm.fundProviderName" placeholder="资金方" class="width-140"></el-input>
      <el-date-picker
        class="date"
        v-model="queryForm.minEffectiveDate"
        type="date"
        :editable="false"
        placeholder="生效日期"
      ></el-date-picker>
      <el-date-picker
        class="date"
        v-model="queryForm.minExpirationDate"
        type="date"
        :editable="false"
        placeholder="失效日期"
      ></el-date-picker>
      <el-select v-model="queryForm.status" placeholder="状态" class="width-60">
        <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button type="primary" @click="fundRulePageQuery()">查询</el-button>
      <el-button @click="reset">清空</el-button>
      <el-button type="success" class="rf" @click="editProgramme({operateType:'add'})">+ 新增方案</el-button>
    </div>
    <el-table :data="tableData.itemList" border row-key="id" :max-height="tableHeight">
      <el-table-column prop="ruleName" label="方案名称" align="center"></el-table-column>
      <el-table-column prop="fundProviderName" label="资金方" align="center"></el-table-column>
      <el-table-column prop="rate" label="利率" align="center"></el-table-column>
      <el-table-column prop="fixInsuranceRate" label="保险费" align="center"></el-table-column>
      <el-table-column prop="effectiveDate" label="生效日期" align="center"></el-table-column>
      <el-table-column prop="expirationDate" label="失效日期" align="center"></el-table-column>
      <el-table-column prop="statusDesc" label="状态" align="center"></el-table-column>
      <el-table-column class-name="table-operate-btn" label="操作" align="center" min-width="160">
        <template slot-scope="scope">
          <span
            type="text"
            @click="editProgramme(Object.assign(scope.row, {operateType:'edit'}))"
          >修改</span>
          <span
            type="text"
            @click="fundRuleStatusChange(Object.assign(scope.row, {operateStatus:scope.row.status==='ENABLED'?'DISABLED':'ENABLED'}))"
          >{{scope.row.status==='ENABLED'?'禁用':'启用'}}</span>
          <span type="text" @click="fundRuleDeleteById(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <add-Programme
      :editProgrammeShow="editProgrammeShow"
      :programmeInfo="programmeInfo"
      @showEditProgramme="showEditProgramme"
    ></add-Programme>
    <el-pagination
      class="surety-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 30, 50,100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.recordCount"
    ></el-pagination>
  </div>
</template>
<script>
import addProgramme from "./components/addProgramme";
export default {
  data() {
    return {
      queryForm: {
        ruleName: "",
        fundProviderName: "",
        minEffectiveDate: "",
        maxEffectiveDate: "",
        minExpirationDate: "",
        maxExpirationDate: "",
        status: ""
      },
      states: [
        {
          label: "启用",
          value: "ENABLED"
        },
        {
          label: "禁用",
          value: "DISABLED"
        }
      ],
      tableData: [],
      editProgrammeShow: false,
      programmeInfo: {},
      tableHeight: window.innerHeight - 180,
      pageSize: 20,
      currentPage: 1
    };
  },
  components: {
    addProgramme
  },
  created() {
    this.fundRulePageQuery();
  },
  methods: {
    reset() {
      for (var key in this.queryForm) {
        this.queryForm[key] = "";
      }
      this.pageSize = 20;
      this.currentPage = 1;
    },
    fundRulePageQuery() {
      var queryForm = JSON.parse(JSON.stringify(this.queryForm));
      queryForm.minEffectiveDate = this.formatDate(
        this.queryForm.minEffectiveDate
      );
      queryForm.minExpirationDate = this.formatDate(
        this.queryForm.minExpirationDate
      );
      queryForm.currentPage = this.currentPage;
      queryForm.pageSize = this.pageSize;
      this.$interface.fundRulePageQuery(queryForm, res => {
        this.tableData = res.data.result;
      });
    },
    fundRuleStatusChange(row) {
      this.$interface.fundRuleStatusChange(
        { status: row.operateStatus, id: row.id },
        res => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.fundRulePageQuery();
        }
      );
    },
    fundRuleDeleteById(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$interface.fundRuleDeleteById({ id: row.id }, res => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.fundRulePageQuery();
        });
      });
    },
    editProgramme(row) {
      this.programmeInfo = row;
      this.editProgrammeShow = true;
    },
    showEditProgramme(v) {
      this.editProgrammeShow = v;
      this.fundRulePageQuery();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fundRulePageQuery();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fundRulePageQuery();
    }
  }
};
</script>
<style scoped lang="less">
.query-form {
  min-width: 840px;
  margin-bottom: 10px;
  font-size: 0;

  .el-select,
  .el-input,
  .date {
    margin-right: 10px;
  }

  .date {
    width: 100px !important;
  }
}
.el-table {
  min-height: 300px;
}
</style>
