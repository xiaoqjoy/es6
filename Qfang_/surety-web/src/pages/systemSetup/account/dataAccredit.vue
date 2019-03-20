<template>
  <div class="account">
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
    <div class="content">
      <el-input v-model="user" placeholder="岗位名称" class="width-180"></el-input>
      <el-button type="primary" @click="searchData">查询</el-button>

      <el-table
        :data="tableData.itemList"
        height="95%"
        border
        :header-cell-style="{background:'#eeeeee'}"
        style="width: 100%;"
      >
        <el-table-column prop="positionName" label="岗位" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="240">
          <template slot-scope="scope">
            <el-button type="text" @click="dataAccredit(scope.row.id)" size="small">数据授权</el-button>
          </template>
        </el-table-column>
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
    <el-dialog
      custom-class="add-data"
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="410px"
    >
      <el-tree
        :data="accredit"
        :props="defaultProps"
        unselectable="on"
        show-checkbox
        :check-strictly="false"
        ref="tree"
        node-key="id"
        :default-checked-keys="checked"
        :render-content="renderContent"
        @node-click="handleNodeClick"
      ></el-tree>
      <div class="btn">
        <el-button type="primary" @click="save">保 存</el-button>
        <el-button @click="close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      user: "",
      pageSize: 20,
      currentPage: 1,
      checked: [],

      id: "", //挂职岗位id
      orgIds: [],
      tableData: [], //数据授权
      data: [], //组件树
      accredit: [], //授权组件树
      dialogTitle: "选择授权组织",
      dialogVisible: false,
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  methods: {
    save() {
      let id = this.$refs.tree.getCheckedKeys();

      this.$interface.savePositionLinkDataAuth(
        {
          positionLinkId: this.id,
          orgIds: id.join(",")
        },
        res => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        }
      );
    },
    close() {
      this.dialogVisible = false;
    },

    //递归遍历树
    traverseTree(data) {
      if (!data) {
        return;
      }
      if (data.children && data.children.length > 0) {
        if (data.checked) {
          this.checked.push(data.id);
        }
        var i = 0;
        for (i = 0; i < data.children.length; i++) {
          this.traverseTree(data.children[i]);
          if (data.children[i].checked) {
            this.checked.push(data.children[i].id);
          }
        }
      }
    },
    //数据授权
    dataAccredit(id) {
      this.checked = [];
      this.dialogVisible = true;
      this.id = id; //挂职岗位id
      this.$interface.queryDataAuthTree(
        {
          positionLinkId: this.id
        },
        res => {
          var data = res.data.result;
          this.accredit = data;
          this.traverseTree(data[0]);
          this.$refs.tree.setCheckedKeys(this.checked);
        }
      );
    },
    searchData() {
      this.getData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    //组织树
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    handleCurrentData(data) {
      this.getData(data.id);
      this.id = data.id;
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
    }
  },
  created() {
    this.getTreeData();
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.account {
  display: flex;
  flex-direction: row;
  height: 100%;
}
.el-tree {
  min-width: 240px;
  background-color: #f3f3f3;
  border: solid 1px #e5e5e5;
}
.content {
  width: 100%;
  height: 100%;
  margin-left: 15px;
  position: relative;
}
.el-table {
  margin-top: 10px;
}
.btn {
  float: right;
  margin: 20px 0;
}
</style>
