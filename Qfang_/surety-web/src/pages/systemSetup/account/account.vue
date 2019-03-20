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
      <el-input v-model="user" placeholder="姓名/账户" class="width-180"></el-input>
      <el-button type="primary" @click="searchData">查询</el-button>

      <el-table
        :data="tableData.itemList"
        height="95%"
        border
        :header-cell-style="{background:'#eeeeee'}"
        style="width: 100%;"
      >
        <el-table-column prop="phone" label="账户" align="center" width="140"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center" width="90"></el-table-column>
        <el-table-column prop="orgName" label="岗位" align="center" width="160"></el-table-column>
        <el-table-column prop="orgName" label="所在组织" align="center" width="160"></el-table-column>
        <el-table-column prop="suretyStatus" label="状态" align="center" width="90"></el-table-column>
        <el-table-column label="操作" align="center" width="240">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">禁用</el-button> -->
            <el-button
              type="text"
              size="small"
              @click="suretyStatusChange(scope.row)"
            >{{scope.row.status=="ENABLED"?'禁用': '启用'}}</el-button>
            <el-button type="text" size="small">岗位授权</el-button>
            <!-- <el-button type="text" size="small">数据授权</el-button>
            <el-button type="text" size="small">登录</el-button>-->
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
      tableData: [], //账号管理
      data: [], //组件树
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  methods: {
    suretyStatusChange(row) {
      this.$interface.suretyStatusChange(
        {
          id: row.id,
          status: row.status == "ENABLED" ? "DISABLED" : "ENABLED"
        },
        res => {
          this.getData();
          this.$message({
            type: "success",
            message: "操作成功!"
          });
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
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    handleCurrentData(data) {
      console.log(data);
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
      console.log(this.id);
      let data = {
        orgId: id ? id : this.id,
        searchName: this.user,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      };
      this.$interface.queryPersonLink(data, res => {
        console.log(res.data.result.itemList);
        this.tableData = res.data.result;
      });
    },
    //获取 组织树
    getTreeData() {
      this.$interface.queryOrgTree({}, res => {
        console.log(res.data.result);
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
</style>
