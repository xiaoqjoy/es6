<template>
  <div class="patientsType">
    <div class="manage_T">
      <div class="newAdd" @click="newAdd()">新增并发症</div>
    </div>
    <div class="list_box">
      <!--表格-->
      <el-table ref="multipleTable" :data="complicationsArr.slice((currentPage4-1)*pagesize,currentPage4*pagesize)" tooltip-effect="dark" @selection-change="handleSelectionChange">
        <el-table-column fixed label="排序" align="center">
          <template slot-scope="scope">{{ scope.row.itemSort }}</template>
        </el-table-column>
        <el-table-column label="并发症" align="center">
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
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 15, 20]" :page-size="pagesize" background layout="total, sizes, prev, pager, next, jumper" :total="compliName.length">
      </el-pagination>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        multipleSelection: [],
        currentPage4: 1,
        pagesize: 15
      }
    },
    props: {
      complicationsArr: {}
    },
    methods: {
      //新增编辑并发症
      newAdd() {
        this.$emit("newCompli", "新增");
      },
      handleClick(row) {
        this.$emit("newCompli", "编辑", row);
      },
      //删除并发症
      intermeddle(row) {
        this.$emit("delCompli", row)
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
    }
    //	  watch:{
    //	  	this.$router.path
    //	  }
  }
</script>