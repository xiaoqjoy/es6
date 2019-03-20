<template>
  <div class="manageDepart">
    <div class="manage_T">
      <el-input placeholder="模板名称" v-model="followUpTypeName" size="small" class="searchWidth"></el-input>
      <el-select v-model="followUpTypeContent" placeholder="适用类型" size="small" class="searchWidth">
        <el-option v-for="item in diabetesTypeArr" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">
          {{item.itemValue}}
        </el-option>
      </el-select>
      <div class="search" @click="searchFollowTemp()">搜索</div>
      <div class="clear" @click="clearFollowTemp()">清空</div>
      <div class="newAdd" @click="newAdd()">新增模板</div>
    </div>
    <div class="list_box">
      <!--表格-->
      <el-table ref="multipleTable" :data="followUpTempList.slice((currentPage4-1)*pagesize,currentPage4*pagesize)" tooltip-effect="dark"  @selection-change="handleSelectionChange">
        <el-table-column fixed label="模板名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column prop="diabetesTypeReview" label="适用患者类型" align="center">
        </el-table-column>
        <el-table-column prop="createUserName" label="创建人" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="searchs(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="intermeddle(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--分页-->
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[10, 15, 20]" :page-size="pagesize" background layout="total, sizes, prev, pager, next, jumper" :total="followUpTempList.length">
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
        followUpTempList: [],
        multipleSelection: [],
        currentPage4: 1,
        pagesize: 15,
        followUpTypeContent: '',
        followUpTypeName: '',
        diabetesTypeArr: [], // 适用类型(糖尿病类型)
      }
    },
    created: function () {
      this.followUpTemplateList()
      funBus.getDictionarysByTypeCode(this, 'diabetes_type'); //糖尿病类型列表
    },
    methods: {
      //搜索随访模板
      searchFollowTemp() {
        let user = JSON.parse(sessionStorage.getItem('user'))
        var data = {
          userId: user.userId,
          name: this.followUpTypeName.replace(/(^\s*)|(\s*$)/g, ""),
          diabetesType: this.followUpTypeContent
        }
        this.$api.followUpTemplate(data, res => {
          if (res.data.code == 0) {
            this.followUpTempList = res.data.data
            for (let i = 0; i < res.data.data.length; i++) {
              this.followUpTempList[i].createTime = this.formatDate(res.data.data[i].followUpCreateTime)
            }
          }
        })
      },
      //清空
      clearFollowTemp() {
        this.followUpTypeName = ''
        this.followUpTypeContent = ''
        this.followUpTemplateList();
      },
      //随访模板列表
      followUpTemplateList(name, diabetesType) {
        if (name == undefined) {
          name = ""
        }
        if (diabetesType == undefined) {
          diabetesType = ''
        }
        let user = JSON.parse(sessionStorage.getItem('user'))
        var data = {
          userId: user.userId,
          name: name,
          diabetesType: diabetesType
        }
        this.$api.followUpTemplate(data, res => {
          if (res.data.code == 0) {
            this.followUpTempList = res.data.data
            for (let i = 0; i < res.data.data.length; i++) {
              this.followUpTempList[i].createTime = this.formatDate(res.data.data[i].followUpCreateTime)
            }
          }
        })
      },
      //查看模板
      searchs(row) {
        this.$emit("searchss", row);
      },
      //新增模板
      newAdd() {
        this.$emit("newFolTemplate", "新增");
      },
      //编辑模板
      handleClick(row) {
        this.$emit("newFolTemplate", "编辑", row);
      },
      //健康干预
      //删除模板
      intermeddle(row) {
        this.$emit("delFolTem", row);
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
  }
</script>
