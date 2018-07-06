<template>
  <div class="manageDepart">
    <div class="manage_T">
      <el-input size="small" v-model="departName" placeholder="科室编号/名称" class="searchWidth"></el-input>
      <div class="search" @click="searchDepart">搜索</div>
      <div class="clear" @click="empty()">清空</div>
      <div class="newAdd ipts" @click="newAdd()">新增科室</div>
    </div>
    <!--表格-->
    <el-table
      ref="multipleTable"
      :data="defaultListke"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        fixed
        label="科室编号"
        align="center">
        <template slot-scope="scope">{{ scope.row.code}}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="科室名称"
        align="center">
      </el-table-column>
      <!--<el-table-column-->
      <!--prop="departmentType"-->
      <!--label="科室类别"-->
      <!--align="center"-->
      <!--width="350"-->
      <!--&gt;-->
      <!--</el-table-column>-->
      <el-table-column
        label="操作"
        align="center"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="intermeddle(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChanges"
        :current-page="currentPage4"
        :page-sizes="[10, 15, 20]"
        :page-size="pagesize"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNums">
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
        departName: '',
        defaultListke: [],
        tableDatake: [],
        org: '',
        totalNums: 0,
      }
    },
    // props: {
    //   defaultList: {},
    // },
    mounted() {
      let user = JSON.parse(sessionStorage.getItem('user'))
      let that = this
      let data = {
          organizationId:user.organizationId
        };
      this.$api.organizationId(data, res => {
        that.org = res.data.data.organizationId;
        this.DepartData(that.currentPage4, that.pagesize, that.org);
      })
    },
    methods: {
      // 科室管理列表数据
      DepartData(currentPage4, pagesize, organizationId) {
        var that = this;
        let data = {
            name: this.departName.replace(/(^\s*)|(\s*$)/g, ""),
            currentPage: currentPage4,
            pageSize: pagesize,
            parentId: organizationId,
            type: 2
          };
        this.$api.pagedQueryList(data, res => {
          if (res.data.code == 0) {
            this.defaultListke = [];
            this.defaultList = [];
            this.totalNums = res.data.data.totalNum;
            if (res.data.data.items) {
              for (let i = 0; i < res.data.data.items.length; i++) {
                let dataObj = {};
                dataObj.code = res.data.data.items[i].code
                dataObj.name = res.data.data.items[i].name
                dataObj.address = res.data.data.items[i].type
                dataObj.organizationId = res.data.data.items[i].organizationId
                dataObj.departmentType = res.data.data.items[i].departmentType
                that.defaultListke.push(dataObj);
                // that.defaultList = that.defaultListke
              }
            }
          }
        },res=>{
            this.$message(res.data.errMsg)
        })

      },
      //清空
      empty() {
        this.departName = ""
        let that = this;

        // 清空时跑到第一页、
        that.currentPage4 = 1;
        that.DepartData(that.currentPage4, that.pagesize, that.org)
        this.reload();
      },
      //搜索
      searchDepart() {
        let that = this
        // 清空时跑到第一页、
        if (this.departName) {
          that.currentPage4 = 1;
          that.DepartData(that.currentPage4, that.pagesize, that.org)
        } else {
          this.empty()
        }

      },
      //新增科室
      newAdd() {
        this.$emit("newDepart", "true", "新增", '', this.currentPage4, this.pagesize, this.departName);
      },
      //健康干预
      //删除科室
      intermeddle(row) {
        this.$emit("delDepart", "true", row, this.currentPage4, this.pagesize, this.departName);
      },
      //
      handleClick(row) {
        this.$emit("newDepart", "true", "编辑", row, this.currentPage4, this.pagesize, this.departName);
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pagesize = val;
        var that = this;
        that.DepartData(that.currentPage4, that.pagesize, that.org)
      },
      handleCurrentChanges(val) {
        // console.log(`当前页: ${val}`);
        var that = this;
        this.currentPage4 = val;
        that.DepartData(that.currentPage4, that.pagesize, that.org)
      },

      //表格
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    }
  }
</script>
