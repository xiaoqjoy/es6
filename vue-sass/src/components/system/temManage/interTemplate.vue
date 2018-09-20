<template>
  <div class="manageDepart">
    <div class="manage_T">
      <el-input v-model.trim="name" placeholder="模板名称" size="small" class="searchWidth"></el-input>
      <el-select v-model="interType" placeholder="干预类型" size="small" class="searchWidth">
        <el-option
          v-for="item in interTypeArr"
          :key="item.itemKey"
          :label="item.itemValue"
          :value="item.itemKey">
          {{item.itemValue}}
        </el-option>
      </el-select>

      <div class="search" @click="searchInterTemp()">搜索</div>
      <div class="clear" @click="clearInterTemp">清空</div>
      <div class="newAdd" @click="newAdd()">新增模板</div>
    </div>
    <div class="list_box">
      <!--表格-->
      <el-table
      ref="multipleTable"
      :data="interTempArr.slice((currentPage4-1)*pagesize,currentPage4*pagesize)"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange">
      <el-table-column label="模板名称" fixed align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column prop="interventionType" label="干预类型" align="center">
      </el-table-column>
      <el-table-column prop="createUserName" label="创建人" align="center">
      </el-table-column>
      <el-table-column prop="tempCreateTime" label="创建时间" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button @click="search(scope.row)" type="text" size="small">查看</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="intermeddle(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
      
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
        :total="interTempArr.length">
      </el-pagination>
    </div>

  </div>
</template>
<script>
import funBus from '../../../assets/js/funBus'

  export default {
    data() {
      return {
        //表格
        interTempArr: [],
        interType: '',
        name: '',
        inType: '',
        multipleSelection: [],
        currentPage4: 1,
        pagesize: 15,
        interTypeArr: [], //干预类型
      }
    },
    created: function () {
      this.searchInterTemp();
      funBus.getDictionarysByTypeCode(this,'interType'); //获取干预类型
    },
    methods: {
      //搜索干预模板
      searchInterTemp() {
        let data = {
          name: this.name.replace(/(^\s*)|(\s*$)/g, ""),
          type: this.interType
        }
        
        funBus.getIntervenTemplateArr(this, data);  //获取干预方案(干预模板)

      },
      //清空
      clearInterTemp() {
        this.name = '';
        this.interType = '';
        this.searchInterTemp();
      },
      //查看模板
      search(row) {
        this.$emit("searchTem", row);
      },
      //新增模板
      newAdd() {
        this.$emit("newTemplate", this.interTempArr.length, "新增");
      },
      //编辑模板
      handleClick(row) {
        this.$emit("newTemplate", 0, "编辑", row);
      },
      //删除模板
      intermeddle(row) {
        this.$emit("delTemplate", row);
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
        this.multipleSelection = val;
      },

    },
  }
</script>


<style>
</style>
