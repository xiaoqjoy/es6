<template>
  <div>
    <el-form :inline="true" :model="formInline" class="query-form demo-form-inline">
      <el-form-item>
        <el-select v-model="formInline.region" placeholder="默认团队">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-select v-model="formInline.region" placeholder="业务部门">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-select v-model="formInline.region" placeholder="客户经理">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-select v-model="formInline.region" placeholder="业务类别">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-select v-model="formInline.region" placeholder="接受状态">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-select v-model="formInline.region" placeholder="查征信状态">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-select v-model="formInline.region" placeholder="还款申请进度">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <div class="query-date">
        <el-form-item>
          <el-date-picker type="date" placeholder="创建开始日期"></el-date-picker>
          <el-date-picker type="date" placeholder="创建结束日期"></el-date-picker>
          <el-form-item>
            <el-input class="intertion-id" placeholder="单据号/物业/买卖双方/房产证号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="info">清空</el-button>
          </el-form-item>
        </el-form-item>
        <el-form-item class="add-intention">
          <el-button type="success">新增意向单</el-button>
        </el-form-item>
      </div>
    </el-form>

    <el-table :data="tableData" border row-key="id" :height="tableHeight">
      <el-table-column prop="id" label="单据编号" align="center" width="180"></el-table-column>
      <el-table-column prop="name" label="业主" align="center"></el-table-column>
      <el-table-column prop="name" label="买家" align="center"></el-table-column>
      <el-table-column prop="code" label="客户经理" align="center"></el-table-column>
      <el-table-column prop="code" label="业务类型" align="center"></el-table-column>
      <el-table-column prop="code" label="创建日期" align="center"></el-table-column>
      <el-table-column prop="code" label="查询征信进度" align="center"></el-table-column>
      <el-table-column prop="code" label="还款申请进度" align="center"></el-table-column>
      <el-table-column prop="code" label="接收状态" align="center"></el-table-column>
      <el-table-column prop="code" label="是否已转单" align="center"></el-table-column>
      <el-table-column class-name="table-operate-btn" label="操作" align="center" min-width="160">
        <template slot-scope="scope">
          <span
            type="text"
            @click="editProgramme(Object.assign(scope.row, {operateType:'edit'}))"
          >接收</span>
          <!-- <span type="text" @click="fundRuleDeleteById(scope.row)">接受</span> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
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
      tableData: [
        {
          id: "XJ20181025001",
          processName: "",//流程标题
          processGroupe: "", //流程分组
          code: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 100 弄",
          processStatus: 1 //流程状态
        },
        {
          id: "2",
          code: "2016-05-04",
          name: "王小虎2",
          address: "上海市普陀区金沙江路 200 弄",
          state: 2
        },
        {
          id: "3",
          code: "2016-05-01",
          name: "王小虎3",
          address: "上海市普陀区金沙江路 300 弄",
          state: 3
        },
        {
          id: "4",
          code: "2016-05-03",
          name: "王小虎4",
          address: "上海市普陀区金沙江路 400 弄",
          state: 4
        }
      ],
      editProgrammeShow: false,
      programmeInfo: {},
      tableHeight: window.innerHeight - 180,
      pageSize: 20,
      currentPage: 1
    };
  },
  components: {

  },
  created() {
    // this.fundRulePageQuery();
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    },
    reset() {
      this.queryForm.ruleName = "";
      this.queryForm.fundProviderName = "";
      this.queryForm.minEffectiveDate = "";
      this.queryForm.maxEffectiveDate = "";
      this.queryForm.minExpirationDate = "";
      this.queryForm.maxExpirationDate = "";
      this.queryForm.status = "";
      this.pageSize = 20;
      this.currentPage = 1;
    },
    // fundRulePageQuery() {
    //   var queryForm = JSON.parse(JSON.stringify(this.queryForm));
    //   queryForm.minEffectiveDate = this.formatDate(
    //     this.queryForm.minEffectiveDate
    //   );
    //   queryForm.minExpirationDate = this.formatDate(
    //     this.queryForm.minExpirationDate
    //   );
    //   (queryForm.currentPage = this.currentPage),
    //     (queryForm.pageSize = this.pageSize),
    //     this.$api.fundRulePageQuery(queryForm, res => {
    //       this.tableData = res.data.result;
    //     });
    // },
    //   fundRuleStatusChange(row) {
    //     this.$api.fundRuleStatusChange(
    //       { status: row.operateStatus, id: row.id },
    //       res => {
    //         this.$message({
    //           type: "success",
    //           message: "操作成功!"
    //         });
    //         this.fundRulePageQuery();
    //       }
    //     );
    //   },
    //   fundRuleDeleteById(row) {
    //     this.$confirm("此操作将永久删除, 是否继续?", "提示", {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning"
    //     }).then(() => {
    //       this.$api.fundRuleDeleteById({ id: row.id }, res => {
    //         this.$message({
    //           type: "success",
    //           message: "操作成功!"
    //         });
    //         this.fundRulePageQuery();
    //       });
    //     });
    //   },
    //   editProgramme(row) {
    //     this.programmeInfo = row;
    //     this.editProgrammeShow = true;
    //   },
    //   showEditProgramme(v) {
    //     this.editProgrammeShow = v;
    //     this.fundRulePageQuery();
    //   },
    //   handleSizeChange(val) {
    //     this.pageSize = val;
    //     this.fundRulePageQuery();
    //   },
    //   handleCurrentChange(val) {
    //     this.currentPage = val;
    //     this.fundRulePageQuery();
    //   }
  }
};
</script>
<style lang="less">
.el-select,
.el-input {
  margin-right: 10px;
}
.query-form {
  min-width: 940px;
  .intertion-id {
    width: 390px !important;
    margin-right: 0px;
  }
  .add-intention {
    float: right;
  }
}
</style>
