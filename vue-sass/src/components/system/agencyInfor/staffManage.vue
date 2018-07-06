<template>
  <div class="staffManage">
    <div class="staf_T">
      <el-input type="text" size="small" v-model="userNickNama" value="" placeholder="姓名/手机号" class="searchWidth"/>
      <el-select size="small" v-model="organizationId" placeholder="全部科室" class="searchWidth">
        <el-option
          v-for="item in sectionListNum"
          :key="item.organizationId"
          :label="item.name"
          :value="item.organizationId">
        </el-option>
      </el-select>
      <!-- <select name="" class="selects" v-model="organizationId">
        <option value="" disabled selected>全部科室</option>
        <option :value="i.organizationId" v-for="i in sectionListNum">{{i.name}}</option>
			</select> -->
      <div class="search" @click="searchUser">搜索</div>
      <div class="clear" @click="emptyUser()">清空</div>
      <div class="newAdd ipts" @click="newAdd()">新增员工</div>
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
        label="姓名"
        align="center">
        <template slot-scope="scope">{{ scope.row.nickname }}</template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号码"
        align="center">
      </el-table-column>
      <el-table-column
        prop="job"
        label="职位"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="organName"
        label="所属科室"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="intermeddle(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="resetPass(scope.row)" type="text" size="small">修改密码</el-button>
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
        userNickNama: '',
        sectionListNum: [],
        organizationId: '',
        tableData3: []
      }
    },
    // props: [
    //   'tableDataUser'
    // ],
    created: function () {
      this.getStaffList();
      this.sectionList();
    },
    methods: {
      getStaffList () {
        let that = this;
        let data = {
          currentPage:1,
          pageSize:1000,
          nickname: that.userNickNama.replace(/(^\s*)|(\s*$)/g, ""),
          organizationId: that.organizationId
        };
        this.$api.searchUser(data, res => {
          that.tableData3 = res.data.data.items
        })
      },
      //科室列表
      sectionList() {
        let user = JSON.parse(sessionStorage.getItem('user'))
        let data = {
          organizationId:user.organizationId
        };
        this.$api.organizationId(data, res => {
          var org = res.data.data
          let dataPagedList = {
            currentPage: 1,
            pageSize: 1000,
            parentId: org.organizationId,
            type: 2
          };
          this.$api.pagedList(dataPagedList, re => {
            if (re.data.code == 0) {
              this.sectionListNum = re.data.data.items
              this.organizationId = ""
            }
          },res=>{
              this.$message(res.data.errMsg)
          })
        })
      },
      //清空
      emptyUser: function () {
        this.userNickNama = ""
        this.organizationId = ""
        let user = JSON.parse(sessionStorage.getItem('user'))
        let data = {
          currentPage: this.currentPage4,
          pageSize: 1000,
          organizationId: user.organizationId
        };
        this.$api.userList(data, res => {
          this.tableData3 = res.data.data.items
        })
        this.reload();
      },
      //搜索员工
      searchUser: function () {
        let that = this
        if (this.userNickNama || this.organizationId) {
          let data = {
            currentPage:1,
            pageSize:1000,
            nickname: that.userNickNama.replace(/(^\s*)|(\s*$)/g, ""),
            organizationId: that.organizationId
          };
          that.$api.searchUser(data, res => {
            if (that.userNickNama || that.organizationId) {
              that.tableData3 = res.data.data.items
            }
          })
        } else {
          this.emptyUser()
        }
      },
      //新增员工
      newAdd() {
        this.$emit("newEmploy", "true", "新增");
      },
      //删除员工
      intermeddle(row) {
        this.$emit("delStaff", "true", row);
      },
      //重置密码
      resetPass(row) {
        this.$emit("resetPass", "true", row);
      },
      //编辑员工
      handleClick(row) {
        this.$emit("newEmploy", "true", "编辑", row);
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        this.pagesize = val;
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
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
  }
</script>
