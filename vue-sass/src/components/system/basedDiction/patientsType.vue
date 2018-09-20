<template>
  <div class="patientsType">
    <div class="manage_T">
      <div class="newAdd" @click="newAdd()">新增类型</div>
    </div>
    <div class="list_box">
      <!--表格-->
      <el-table ref="multipleTable" :data="diabetesTypeArr.slice((currentPage4-1)*pagesize,currentPage4*pagesize)" tooltip-effect="dark" @selection-change="handleSelectionChange">
        <el-table-column label="排序" fixed align="center">
          <template slot-scope="scope">{{ scope.row.itemSort }}</template>
        </el-table-column>
        <el-table-column label="患者类型" align="center">
          <template slot-scope="scope">{{ scope.row.itemValue }}</template>
        </el-table-column>
        <el-table-column label="操作" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="intermeddle(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--分页-->
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 15, 20]" :page-size="pagesize" background layout="total, sizes, prev, pager, next, jumper" :total="diabetesTypeArr.length">
      </el-pagination>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        //表格
        multipleSelection: [],
        currentPage4: 1,
        pagesize: 15
      }
    },
    props: {
      diabetesTypeArr: {}
    },
    methods: {
      //新增类型
      newAdd() {
        this.$emit("newType", "新增");
      },
      // 编辑
      handleClick(row) {
        this.$emit("newType", "编辑", row);
      },
      //删除
      intermeddle(row) {
        this.$emit("delType", row)
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
        this.pagesize = val;
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage4 = val;
      },

      //表格
      handleSelectionChange(val) {
        // console.log(val)
        this.multipleSelection = val;
      },
    }
    //	  watch:{
    //	  	this.$router.path
    //	  }
  }
</script>