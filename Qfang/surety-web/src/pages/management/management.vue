<template>
  <div>
    <div class="query-form">
      <el-input v-model="queryForm.searchName" placeholder="银行名称" class="width-120"></el-input>
      <el-select v-model="queryForm.status" placeholder="状态" class="width-120">
        <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button type="primary" @click="fundProviderPageQuery">查询</el-button>
      <el-button type="success" class="rf" @click="editBank({operateType:'add'})">+ 新增银行</el-button>
    </div>
    <el-table id="surety-table" :data="tableData" border row-key="id" :max-height="tableHeight">
      <el-table-column prop="code" label="编号" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" align="center"></el-table-column>
      <!-- <el-table-column label="排序" align="center" width="60">
        <template slot-scope="scope">
          <i style="display:none;">{{scope.row.code}}</i>
          <span class="sort icon iconfont icon-caidan-shouqi"></span>
        </template>
      </el-table-column>-->
      <el-table-column prop="statusDesc" label="状态" align="center"></el-table-column>
      <el-table-column class-name="table-operate-btn" label="操作" align="center" min-width="160">
        <template slot-scope="scope">
          <span type="text" @click="editBank(Object.assign(scope.row, {operateType:'edit'}))">修改</span>
          <span
            type="text"
            @click="fundProviderStatusChange(Object.assign(scope.row, {operateStatus:scope.row.status==='ENABLED'?'DISABLED':'ENABLED'}))"
          >{{scope.row.status==='ENABLED'?'禁用':'启用'}}</span>
          <span type="text" @click="showBranch(Object.assign(scope.row, {branchShow:true}))">分支管理</span>
          <span type="text" @click="fundProviderDeleteById(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="surety-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 30, 50,100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="recordCount"
    ></el-pagination>
    <add-bank
      :editBankShow="editBankShow"
      :bankEditInfo="bankEditInfo"
      @showEditBank="showEditBank"
    ></add-bank>
    <branch :branchShow="branchShow" :bankInfo="bankInfo" @hideBranch="hideBranch"></branch>
  </div>
</template>
<script>
import Sortable from "sortablejs";
import addBank from "./components/addBank";
import branch from "./components/branch";
export default {
  data() {
    return {
      queryForm: {
        searchName: "",
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
      editBankShow: false,
      branchShow: false,
      bankInfo: {},
      bankEditInfo: null,
      tableHeight: window.innerHeight - 180,
      recordCount: 0,
      pageSize: 20,
      currentPage: 1
    };
  },
  components: {
    addBank,
    branch
  },
  created() {
    this.fundProviderPageQuery();
  },
  mounted() {
    this.rowDrop();
  },
  methods: {
    fundProviderPageQuery() {
      var queryForm = JSON.parse(JSON.stringify(this.queryForm));
      queryForm.pageSize = this.pageSize;
      queryForm.currentPage = this.currentPage;
      this.$interface.baseconfigFundProviderPageQuery(queryForm, res => {
        this.tableData = res.data.result.itemList;
        this.recordCount = res.data.result.recordCount;
      });
    },
    fundProviderStatusChange(row) {
      this.$interface.fundProviderStatusChange(
        { id: row.id, status: row.operateStatus },
        res => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.fundProviderPageQuery();
        }
      );
    },
    fundProviderDeleteById(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$interface.fundProviderDeleteById({ id: row.id }, res => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.fundProviderPageQuery();
        });
      });
    },
    editBank(row) {
      this.bankEditInfo = row;
      this.editBankShow = true;
    },
    showEditBank(v) {
      this.editBankShow = v;
      this.fundProviderPageQuery();
    },
    showBranch(row) {
      this.bankInfo = row;
      this.branchShow = row.branchShow;
    },
    hideBranch(b) {
      this.branchShow = b;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fundProviderPageQuery();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fundProviderPageQuery();
    },
    rowDrop() {
      this.$nextTick(function() {
        const that = this;
        const ele = document.querySelector("#surety-table tbody");
        Sortable.create(ele, {
          onEnd({ newIndex, oldIndex }) {
            const currRow = that.tableData.splice(oldIndex, 1)[0];
            that.tableData.splice(newIndex, 0, currRow);
          }
        });
      });
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
}
.sort {
  text-align: center;
  cursor: n-resize !important;
}
</style>
