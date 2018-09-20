<template>
  <div class="interType">
    <div class="manage_T">
      <div class="newAdd" @click="newAdd()">新增类型</div>
    </div>
    <div class="list_box">
      <!--表格-->
      <el-table ref="multipleTable" :data="interTypeArr.slice((currentPage4-1)*pagesize,currentPage4*pagesize)" tooltip-effect="dark" @selection-change="handleSelectionChange">
        <el-table-column fixed label="排序" align="center">
          <template slot-scope="scope">{{ scope.row.itemSort }}</template>
        </el-table-column>
        <el-table-column label="干预类型" align="center">
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
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 15,20]" :page-size="pagesize" background layout="total, sizes, prev, pager, next, jumper" :total="interTypeArr.length">
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
      interTypeArr: {}
    },
    methods: {
      //新增编辑干预类型
      newAdd() {
        this.$emit("newInterType", "新增");
      },
      handleClick(row) {
        this.$emit("newInterType", "编辑", row);
      },
      //删除角色
      intermeddle(row) {
        this.$emit("delIntType", row)
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
        //console.log(val)
        this.multipleSelection = val;
      },
    }
    //	  watch:{
    //	  	this.$router.path
    //	  }
  }
</script>