<template>
  <div>
    <div class="query-form">
      <div class="choose-box">
        <el-input v-model="queryForm.orgName" placeholder="请选择" class="width-140"></el-input>
        <el-input v-model="queryForm.orgId" placeholder="请选择" style="display:none;"></el-input>
        <span class="choose" @click="selectOrg(true)">选</span>
      </div>
      <el-input v-model="queryForm.accountName" placeholder="账户名称" class="width-140"></el-input>
      <el-select v-model="queryForm.accountType" placeholder="账户类型" class="width-160">
        <el-option
          v-for="item in accountTypeEnums"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-select v-model="queryForm.status" placeholder="状态" class="width-100">
        <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button type="primary" @click="fundAccountPageQuery()">查询</el-button>
      <el-button @click="reset">清空</el-button>
      <el-button type="success" class="rf" @click="editCapitalAccount({operateType:'add'})">+ 新增账号</el-button>
    </div>
    <el-table :data="tableData.itemList" border row-key="id" :max-height="tableHeight">
      <el-table-column prop="accountName" label="账户名称" align="center"></el-table-column>
      <el-table-column prop="accountType" label="类别" align="center"></el-table-column>
      <el-table-column prop="fundProviderName" label="银行" align="center"></el-table-column>
      <el-table-column prop="accountBank" label="开户行" align="center"></el-table-column>
      <el-table-column prop="accountNumber" label="账号" align="center"></el-table-column>
      <el-table-column prop="statusDesc" label="状态" align="center"></el-table-column>
      <el-table-column class-name="table-operate-btn" label="操作" align="center" min-width="160">
        <template slot-scope="scope">
          <span
            type="text"
            @click="editCapitalAccount(Object.assign(scope.row, {operateType:'edit'}))"
          >修改</span>
          <span
            type="text"
            @click="fundAccountStatusChange(Object.assign(scope.row, {operateStatus:scope.row.status==='ENABLED'?'DISABLED':'ENABLED'}))"
          >{{scope.row.status==='ENABLED'?'禁用':'启用'}}</span>
          <span type="text" @click="fundAccountDeleteById(scope.row)">删除</span>
        </template>
      </el-table-column>
    </el-table>
    <add-capital-account
      :editCapitalAccountShow="editCapitalAccountShow"
      :capitalAccountInfo="capitalAccountInfo"
      @showEditCapitalAccount="showEditCapitalAccount"
    ></add-capital-account>
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
    <el-dialog
      title="选择组织"
      :visible.sync="orgSelectVisible"
      width="660px"
      :before-close="orgSelectBeforeClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-tree
        :data="data"
        :props="defaultProps"
        unselectable="on"
        show-checkbox
        check-strictly
        @check="handleCurrentData"
        :render-content="renderContent"
        @node-click="handleNodeClick"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveTree">保 存</el-button>
        <el-button @click="selectOrg(false)">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import addCapitalAccount from "./components/addCapitalAccount";
export default {
  data() {
    return {
      orgSelectVisible: false,
      defaultProps: {
        children: "children",
        label: "name"
      },
      orgs: [],
      data: [],
      queryForm: {
        orgId: "",
        accountType: "",
        accountName: "",
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
      accountTypeEnums: [],
      tableData: [],
      editCapitalAccountShow: false,
      capitalAccountInfo: {},
      tableHeight: window.innerHeight - 180,
      pageSize: 20,
      currentPage: 1
    };
  },
  components: {
    addCapitalAccount
  },
  created() {
    this.accountTypeEnum();
    this.fundAccountPageQuery();
    this.getTree();
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.fundAccountPageQuery();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fundAccountPageQuery();
    },
    reset() {
      for (var key in this.queryForm) {
        this.queryForm[key] = "";
      }
      this.pageSize = 20;
      this.currentPage = 1;
    },
    getTree() {
      this.$interface.queryOrgTree({}, res => {
        this.data = res.data.result;
      });
    },
    selectOrg(bool) {
      this.orgSelectVisible = bool;
    },
    saveTree() {
      var orgName = [];
      var orgId = [];
      this.orgs.forEach(function(item) {
        orgName.push(item.name);
        orgId.push(item.id);
      });
      this.queryForm.orgId = orgId.join(",");
      this.queryForm.orgName = orgName.join(",");
      this.selectOrg(false);
    },
    orgSelectBeforeClose() {
      this.orgSelectVisible = false;
    },
    accountTypeEnum() {
      this.$interface.accountTypeEnum({}, res => {
        this.accountTypeEnums = res.data.result;
      });
    },
    fundAccountPageQuery() {
      var queryForm = JSON.parse(JSON.stringify(this.queryForm));
      queryForm.pageSize = this.pageSize;
      queryForm.currentPage = this.currentPage;
      delete queryForm.orgName;
      this.$interface.fundAccountPageQuery(queryForm, res => {
        this.tableData = res.data.result;
      });
    },
    fundAccountStatusChange(row) {
      this.$interface.fundAccountStatusChange(
        { status: row.operateStatus, id: row.id },
        res => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.fundAccountPageQuery();
        }
      );
    },
    fundAccountDeleteById(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$interface.fundAccountDeleteById({ id: row.id }, res => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.fundAccountPageQuery();
        });
      });
    },
    editCapitalAccount(row) {
      this.capitalAccountInfo = row;
      this.editCapitalAccountShow = true;
    },
    showEditCapitalAccount(v) {
      this.editCapitalAccountShow = v;
      this.fundAccountPageQuery();
    },
    handleCurrentData(data) {
      this.orgs.push(data);
    },
    handleNodeClick(data) {
      if (!data.leaf) {
        data.leaf = 1;
      } else if (data.leaf === 1) {
        data.leaf = false;
      } else {
        return;
      }
    },
    renderContent(h, { node, data, store }) {
      let html;
      if (!data.leaf) {
        html = (
          <span>
            <i class="icon iconfont icon-jia" />
            <span>{node.label}</span>
          </span>
        );
      } else if (data.leaf === 1) {
        html = (
          <span>
            <i class="icon iconfont icon-jian" />
            <span>{node.label}</span>
          </span>
        );
      } else if (data.leaf) {
        html = (
          <span>
            <i class="icon iconfont icon-fuhao" />
            <span>{node.label}</span>
          </span>
        );
      }
      return <div>{html}</div>;
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
  .choose-box {
    display: inline-block;
    line-height: 40px;
    .el-input {
      margin-right: 0;
    }
    .choose {
      font-size: 14px;
      display: inline-block;
      width: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #eee;
      margin-right: 10px;
    }
  }
}
.el-table {
  min-height: 300px;
}
</style>
