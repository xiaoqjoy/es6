<template>
  <div class="manageDepart">
    <div class="manage_T">
      <el-input v-model="interTempTypeName" placeholder="模板名称" size="small" class="searchWidth"></el-input>
      <el-select v-model="interTempTypeContent" placeholder="干预类型" size="small" class="searchWidth">
        <el-option
          v-for="item in interTypes"
          :key="item.itemKey"
          :label="item.itemValue"
          :value="item.itemKey">
          {{item.itemValue}}
        </el-option>
      </el-select>


      <div class="search" @click="searchInterTemp()">搜索</div>
      <div class="clear" @click="clearInterTemp">清空</div>
      <div class="newAdd ipts" @click="newAdd()">新增模板</div>
    </div>
    <!--表格-->
    <el-table
      ref="multipleTable"
      :data="interTemp.slice((currentPage4-1)*pagesize,currentPage4*pagesize)"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        label="模板名称"
        fixed
        align="center">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column
        prop="interventionType"
        label="干预类型"
        align="center">
      </el-table-column>
      <el-table-column
        prop="createUserName"
        label="创建人"
        align="center">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button @click="search(scope.row)" type="text" size="small">查看</el-button>
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
        :total="interTemp.length">
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
        interTemp: [],
        interTempTypeContent: '',
        interTempTypeName: '',
        inType: '',
        multipleSelection: [],
        currentPage4: 1,
        pagesize: 15,
        interTypes: [] //干预类型
      }
    },
    created: function () {
      this.interventionTemplate();
      funBus.getInterType(this); //获取干预类型
    },
    methods: {
      //搜索干预类型
      searchInterTemp() {
        // console.log(this.interTempTypeContent)
        let user = JSON.parse(sessionStorage.getItem('user'))
        var data = {
          userId:user.userId,
          name: this.interTempTypeName.replace(/(^\s*)|(\s*$)/g, ""),
          type: this.interTempTypeContent
        }
        this.$api.interventionTemplate(data, res => {
          if (res.data.code == 0) {
            this.interTemp = res.data.data
            for (let i = 0; i < res.data.data.length; i++) {
              this.interTemp[i].createTime = this.formatDate(res.data.data[i].tempCreateTime)
              // .replace(/\s[\x00-\xff]*/g,'')
            }
          }
        })
      },
      //清空
      clearInterTemp() {
        this.interTempTypeName = ''
        this.interTempTypeContent = ''
        this.interventionTemplate();
      },
      //查看模板
      search(row) {
        this.$emit("searchTem", "true", row);
      },
      //新增模板
      newAdd() {
        this.$emit("newTemplate", "新增", "true");
      },
      //删除模板
      intermeddle(row) {
        this.$emit("delTemplate", "true", row);
      },
      //编辑模板
      handleClick(row) {
        // console.log(row);
        this.$emit("newTemplate", "编辑", "true", row);
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
      },
      //interventionTemplateList
      interventionTemplate(name, type) {
        if (name == undefined) {
          name = "";
        }
        if (type == undefined) {
          type = "";
        }
        let user = JSON.parse(sessionStorage.getItem('user'))
        var data = {
          userId: user.userId,
          name: name,
          type: type
        }
        this.$api.interventionTemplate(data, res => {
          if (res.data.code == 0) {
            this.interTemp = res.data.data
            for (let i = 0; i < res.data.data.length; i++) {
              this.interTemp[i].createTime = this.formatDate(res.data.data[i].tempCreateTime)
              // .replace(/\s[\x00-\xff]*/g,'')
            }
          }
        })
      }
    },
  }
</script>


<style>
</style>
