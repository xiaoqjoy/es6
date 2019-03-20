<template>
  <el-dialog
    title="选择节点"
    custom-class="surety-tree"
    :visible.sync="dialogVisible"
    width="860px"
    :before-close="close"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="tree-content">
      <div class="tree">
        <el-tree
          :data="data"
          :props="defaultProps"
          unselectable="on"
          show-checkbox
          check-strictly
          :default-checked-keys="checkedNode"
          @check="handleCurrentData"
          :render-content="renderContent"
          @node-click="handleNodeClick"
        ></el-tree>
      </div>
      <div class="content-box">
        <div class="content">
          <el-input v-model="queryFormuser" placeholder="岗位名称" class="width-180"></el-input>
          <el-button type="primary" @click="searchData">查询</el-button>
          <el-table :data="tableData.itemList" border @selection-change="handleSelectionChange">
            <el-table-column type="selection" align="center" width="80"></el-table-column>
            <el-table-column prop="positionName" label="岗位" align="center"></el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[20, 30, 50,100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.recordCount"
          ></el-pagination>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save()">保 存</el-button>
      <el-button @click="close({})">取 消</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      dialogVisible: true,
      id: "", //挂职岗位id
      queryForm: {},
      data: [], //组件树
      checkedNode: [],
      tableData: [],
      multipleSelection: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      pageSize: 20,
      currentPage: 1
    };
  },
  created() {
    this.getTreeData();
  },
  mounted() {},
  methods: {
    //获取 账号管理 数据
    getData(id) {
      let data = {
        orgId: id ? id : this.id,
        positionName: this.user,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      this.$interface.pageQueryPositionLink(data, res => {
        this.tableData = res.data.result;
      });
    },
    //获取 组织树
    getTreeData() {
      this.$interface.queryOrgTree({}, res => {
        this.data = res.data.result;
        let id = res.data.result[0].id;
        this.id = id;
        this.getData(id);
      });
    },
    searchData() {
      this.getData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    save() {
      this.$emit("guardPersonHide", this.multipleSelection);
    },
    close(arr) {
      this.$emit("guardPersonHide", arr);
    },
    //组织树
    handleCurrentData(data) {
      this.getData(data.id);
      this.id = data.id;
    },
    handleSelectionChange() {
      this.multipleSelection = val;
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

<style lang="less">
.surety-tree {
  .el-dialog__body {
    padding: 15px;
    height: 600px;
  }
  .el-pagination {
    bottom: -40px;
  }
}
.tree-content {
  display: flex;
  height: 100%;
  .tree {
    width: 240px;
    overflow: auto;
  }
  .content-box {
    flex: 1;
    height: 100%;
    padding: 0 10px 0 20px;
    .content {
      height: calc(100% - 40px);
      position: relative;
    }
  }
}
.el-tree {
  min-width: 240px;
  background-color: #f3f3f3;
  border: solid 1px #e5e5e5;
}
.el-table {
  margin-top: 10px;
}
</style>
