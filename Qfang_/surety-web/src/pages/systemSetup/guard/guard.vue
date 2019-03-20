<template>
  <div class="guard">
    <div class="query-form">
      <el-select
        v-model="queryForm.orgId"
        @change="pageQueryPosition"
        placeholder="请选择"
        class="width-180"
      >
        <el-option
          v-for="(item,index) in orgLists"
          :selected="index===0"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-input v-model="queryForm.positionName" placeholder="岗位名称" class="width-180"></el-input>
      <el-button type="primary" @click="pageQueryPosition">查询</el-button>
    </div>
    <div id="free-table">
      <el-table :data="tableData.itemList" border align="left" :max-height="tableHeight">
        <el-table-column prop="number" align="center" label="编码"></el-table-column>
        <el-table-column prop="name" align="center" label="名称"></el-table-column>
        <el-table-column class-name="table-operate-btn" align="center" label="操作">
          <template slot-scope="scope">
            <span @click="menuSet(scope.row)">菜单设置</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
      custom-class="add-menu"
      title="菜单设置"
      :visible.sync="dialogVisible"
      width="540px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-tree
        ref="guardtree"
        :data="data"
        :props="defaultProps"
        unselectable="on"
        show-checkbox
        :check-strictly="false"
        @check="handleCurrentData"
        :render-content="renderContent"
        @node-click="handleNodeClick"
        :getCheckedNodes="getCheckedNodes"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save()">保 存</el-button>
        <el-button @click="close()">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryForm: {
        orgId: "",
        positionName: ""
      },
      orgLists: [],
      tableData: [],
      data: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      dialogVisible: false,
      orgs: [],
      currentGuard: {},
      tableHeight: window.innerHeight - 180,
      pageSize: 20,
      currentPage: 1
    };
  },
  created() {
    this.queryOrgTree();
  },
  methods: {
    getCheckedNodes(a, b) {
      console.log(132, a, b);
    },
    pageQueryPosition() {
      this.queryForm.pageSize = this.pageSize;
      this.queryForm.currentPage = this.currentPage;
      this.$interface.pageQueryPosition(this.queryForm, res => {
        this.tableData = res.data.result;
      });
    },
    queryOrgTree() {
      this.$interface.queryOrgTreeByPosition(
        {
          positionLinkId: this.$store.state.userInfo.positionLinkId,
          orgTypes: "CITY"
        },
        res => {
          var org = res.data.result;
          var orgs = org.concat(org[0].children);
          orgs.forEach(function(item) {
            item.children = [];
          });
          this.orgLists = orgs;
          this.queryForm.orgId = this.orgLists[0].id;
          this.pageQueryPosition();
        }
      );
    },
    queryAuthTree(row) {
      this.$interface.queryAuthTree({ positionId: row.id }, res => {
        this.data = res.data.result[0].children;
      });
    },
    menuSet(row) {
      this.currentGuard = row;
      this.dialogVisible = true;
      this.queryAuthTree(row);
    },
    save() {
      var selectedNodes = this.$refs["guardtree"].getCheckedNodes(true, false);
      var authIds = selectedNodes.map(function(item) {
        return item.id;
      });
      var param = {
        positionId: this.currentGuard.id,
        authIds: authIds.join(",")
      };
      this.$interface.savePositionAuth(param, res => {
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        this.dialogVisible = false;
      });
    },
    close() {
      this.dialogVisible = false;
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
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageQueryPosition();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.pageQueryPosition();
    }
  }
};
</script>
<style lang="scss">
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
.guard {
  .el-dialog__body {
    height: 400px;
    overflow: auto;
  }
}
</style>
