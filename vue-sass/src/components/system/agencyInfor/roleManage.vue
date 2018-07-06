<template>
  <div class="roleManage">
    <div class="manage_R">
      <el-input size="small" v-model="searchRoleVaule" placeholder="角色名称/说明" class="searchWidth"></el-input>
      <div class="search" @click="searchRole">搜索</div>
      <div class="clear" @click="clearRole">清空</div>
      <div class="newAdd ipts" @click="newAdd_R()">新增角色</div>
    </div>
    <!--表格-->
    <el-table
      ref="multipleTable"
      :data="tableData3.slice((currentPage4-1)*pagesize,currentPage4*pagesize)"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        fixed
        label="角色名称"
        align="center">
        <template slot-scope="scope">{{ scope.row.roleName }}</template>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="说明"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button v-show="scope.row.isOnlyRead != 1" @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button v-show="scope.row.isOnlyRead != 1" @click="intermeddle(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 15, 20]"
        :page-size="pagesize"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData3.length">
      </el-pagination>
    </div>

  </div>
</template>
<script>

  export default {
    inject: ['reload'],
    data() {
      return {
        multipleSelection: [],
        currentPage4: 1,
        pagesize: 15,
        searchRoleVaule: '',
        tableData3: []
      }
    },
    // props: {
    //   tableDataRole: {}
    // },
    methods: {
      getRoleList () {
        let user = JSON.parse(sessionStorage.getItem('user'))
        let data = {
          currentPage: this.currentPage4,
          pageSize: 1000,
          parentId: user.organizationId,
          type: 2
        };
        this.$api.role(data, res => {
          this.tableData3 = res.data.data.items
          // this.tableDataRole = this.tableData3
        })
      },
      clearRole: function () {
        this.searchRoleVaule = ""
        let user = JSON.parse(sessionStorage.getItem('user'))
        let data = {
          currentPage: this.currentPage4,
          pageSize: 1000,
          parentId: user.organizationId,
          type: 2
        };
        this.$api.role(data, res => {
          this.tableData3 = res.data.data.items
          // this.tableDataRole = this.tableData3
        })
        this.reload();
      },
      //搜索角色
      searchRole: function () {
        let that = this
        if (this.searchRoleVaule) {
          let data = {
            roleName:that.searchRoleVaule.replace(/(^\s*)|(\s*$)/g, ""),
            currentPage:1,
            pageSize:100
          };
          that.$api.searchRole(data, res => {
            that.tableData3 = res.data.data.items
            // that.tableDataRole = that.tableData3
          })
        } else {
          this.clearRole()
        }
      },
      //新增角色
      newAdd_R() {
        this.$emit("newRole", "true", "新增");
      },
      //删除角色
      intermeddle(row) {
        this.$emit("delRole", "true", row)
      },
      handleClick(row) {
        this.$emit("newRole", "true", "编辑", row)
      },
      handleSizeChange(val) {
        this.pagesize = val;
      },
      handleCurrentChange(val) {
        this.currentPage4 = val;
      },
      //表格
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //清空
      clear() {
        $(".name").val("");
        $(".styles").val("全部类型");
        $(".sex").val("全部性别");
        $(".age").val("");
        $(".ages").val("");
        $(".time_1").val("");
        $(".time_2").val("");
        $(".time_3").val("");
        $(".time_4").val("");
      }
    },
    created () {
      this.getRoleList();
    }
  }
</script>

