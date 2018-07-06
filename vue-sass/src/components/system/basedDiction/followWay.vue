<template>
  <div class="followWay">
    <div class="manage_R">
      <div class="newAdd_R ipts" @click="newAdd()">新增方式</div>
    </div>
    <!--表格-->
    <el-table
      ref="multipleTable"
      :data="followWay.slice((currentPage4-1)*pagesize,currentPage4*pagesize)"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        fixed
        label="排序	"
        align="center">
        <template slot-scope="scope">{{ scope.row.itemSort }}</template>
      </el-table-column>
      <el-table-column
        label="随访方式	"
        align="center">
        <template slot-scope="scope">{{ scope.row.itemValue }}</template>
      </el-table-column>
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
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 15, 20]"
        :page-size="pagesize"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="followWay.length">
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
      followWay: {}
    },
    methods: {
      //新增编辑方式
      newAdd() {
        this.$emit("newFolWay", "true", "新增");
      },
      handleClick(row) {
        this.$emit("newFolWay", "true", "编辑", row);
      },
      //删除方式
      intermeddle(row) {
        this.$emit("delFolWay", "true", row)
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
      //清空
      clear() {
//	 		console.log($(".name").val())
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
    }
//	  watch:{
//	  	this.$router.path
//	  }
  }
</script>

<style>
  .block {
    text-align: right;
    margin-top: 20px;
  }

  .newAdd_R {
    display: inline-block;
    float: right;
    color: white;
    background-color: #24bdaf;
  }

  .CharaName {
    padding-left: 6px;
    color: #999999;
    width: 320px;
    height: 28px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px rgba(206, 206, 206, 0.7);
    margin-right: 10px;
  }

  .ipts {
    font-size: 14px;
    line-height: 28px;
    display: inline-block;
    width: 80px;
    height: 28px;
    border-radius: 4px;
    text-align: center;
    border: solid 1px rgba(206, 206, 206, 0.7);
    cursor: pointer;
  }

  .selects {
    margin-right: 20px;
    color: #999999;
    width: 110px;
    height: 28px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px rgba(206, 206, 206, 0.7);
  }

  .searchs_R {
    color: white;
    background-color: #267bf7;
    margin-right: 20px;
  }

  .clears_R {
    background-color: #ffffff;
  }

  .followWay {
    min-width: 1100px;
    width: 89%;
    min-height: 830px;
    /*position: absolute;*/
    /*left: 160px;*/
    float: left;
    border-left: 1px solid #eff2f5;
  }

  .manage_R {
    padding: 20px;
    height: 30px;
    border-bottom: 1px solid #f1f1f1;
  }
</style>
