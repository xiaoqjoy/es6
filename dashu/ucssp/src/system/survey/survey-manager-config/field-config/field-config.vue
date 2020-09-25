<template>
  <div class="survey_config_list">
    <!-- 查询表单 -->
    <el-form class="search" :inline="true" :model="searchInfo" ref="searchInfo" :rules="searchRule">
      <el-form-item prop="categoryDesc">
        <el-input v-model="searchInfo.categoryDesc" clearable placeholder="所属阶段" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item prop="itemDesc">
        <el-input v-model="searchInfo.itemDesc" clearable placeholder="字段名称" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button class="width100" type="primary" @click="search">查询</el-button>
          <el-button class="width100" type="primary" plain @click="clearSearch">清空</el-button>
        </el-form-item>
    </el-form>

    <div class="table_box">
      <!-- 表格数据 -->
      <el-table class="feild_table" :data="pageData.list" style="100%">
        <el-table-column prop="categoryDesc" label="所属阶段"></el-table-column>
        <el-table-column prop="itemDesc" label="字段名称"></el-table-column>
        <el-table-column prop="statusInd" label="是否启用">
          <template slot-scope="scope">
            <el-switch :width="50" v-model="scope.row.statusInd" :active-value="true" :inactive-value="false" @change="editFirstField(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editConfig(scope.row)">配置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="page_box">
      <pagination @jump-page='handleCurrentChange' :page='searchInfo' class="pagination"></pagination>
    </div>

    <el-dialog class="dialog" title="配置" :visible.sync="dialogVisible" :before-close="handleClose" width="380px" center>
      <el-form class="search" :inline="true" :model="configInfo" :rules="configRule" ref="configInfo" label-position="top">

        <div class="dialog_field" v-for="(item, index) in configInfo.children" :key="index">
          <div class="" v-if="!item.isAdd">{{item.itemDesc}}</div>
          <el-form-item v-if="item.isAdd" :prop="'children.' + index + '.itemDesc'" :rules="configRule.itemDesc">
            <el-input v-model="item.itemDesc"></el-input>
          </el-form-item>
          <el-form-item prop="statusInd">
            <el-switch :width="50" v-model="item.statusInd" :active-value="true" :inactive-value="false"></el-switch>
          </el-form-item>
        </div>
        <div class="dialog_field_btn">
          <el-button type="primary" size="mini" style="width:100px;border:1px solid #538bf1" plain @click="addFieldItem"><span class="icon_plus">+</span>新增</el-button>
        </div>

        <div class="dialog_btn_group">
          <el-button type="primary" style="width:200px" @click="saveConfig">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import pagination from "@components/pagination"; // 分页条
import reportValidator from "../../js/reportRules.js";
import {surveyApi} from "../../js/server.js";
export default {
  name: "pending-task",
  data() {
    return {
      dialogVisible: false,
      configInfo: {},

      pageData: {},

      // 查询信息
      searchInfo: {
        pageNum: 1,
        pageSize: 10,
        categoryDesc: "",
        itemDesc: "",
        account: 0,
        currentPage: 1,
        showJumpButton: true
      },
      searchRule: {
        categoryDesc: [
          { max: 20, trigger: 'blur', message: '请输入20字符以内' },
          { trigger: 'blur', validator: reportValidator.chineseRule }
        ],
        itemDesc: [
          { max: 20, trigger: 'blur', message: '请输入20字符以内' },
          { trigger: 'blur', validator: reportValidator.chineseRule }
        ]
      },
      configRule: {
        itemDesc: [
          { max: 20, trigger: 'blur', message: '请输入20字符以内' },
          { trigger: 'blur', validator: reportValidator.chineseRule }
        ]
      },
      requestPramas: []
    };
  },
  created() {
    // 获取数据列表
    this.getList();
  },
  methods: {
    // 获取数据列表
    getList() {
      this.$MyFetch.post(surveyApi.fieldsConfig, this.searchInfo).then(data => {
        this.pageData = data;
        this.searchInfo.account = data.total;
      }).catch((err) => {
        this.$error(err.message);
      });
    },
    // 编辑配置
    editConfig(item) {
      this.configInfo = item;
      this.dialogVisible = true;
    },
    // 查询
    search() {
      this.$refs.searchInfo.validate(valid => {
        if (valid) {
          this.searchInfo.pageNum = 1;
          this.searchInfo.currentPage = 1;
          this.getList();
        }
      });
    },
    // 清空查询信息
    clearSearch() {
      this.$refs["searchInfo"].resetFields();
      this.searchInfo.pageNum = 1;
      this.searchInfo.currentPage = 1;
      this.getList();
    },
    handleCurrentChange(val) {
      this.searchInfo.pageNum = val;
      this.searchInfo.currentPage = val;
      this.getList();
    },
    addFieldItem() {
      let addFieldConfig = {
        isAdd: true,
        categoryCode: this.configInfo.categoryCode,
        itemCode: null,
        itemDesc: null,
        parentCode: this.configInfo.itemCode,
        statusInd: false
      };
      this.configInfo.children.push(addFieldConfig);
    },
    // 修改一级字段状态
    editFirstField(item) {
      this.requestPramas = [item];
      this.sendUpdate();
    },
    saveConfig() {
      // 将新增项与原有项组合，准备发送后台
      this.requestPramas = [...this.configInfo.children];
      for (let i = 0, len = this.requestPramas.length; i < len; i++) {
        if (!this.requestPramas[i].itemDesc) {
          this.requestPramas.splice(i, 1);
          i--;
          len--;
          continue;
        }
        if (!this.requestPramas[i].itemCode) {
          this.requestPramas[i].itemCode = Number(this.requestPramas[i - 1].itemCode) + 10 + '';
        } else {
          delete this.requestPramas[i].categoryDesc;
          delete this.requestPramas[i].children;
          delete this.requestPramas[i].remarkTxt;
          delete this.requestPramas[i].sortNum;
        }
      }
      // 重置新增项数组
      this.sendUpdate();
    },
    handleClose(done) {
      this.$confirm('是否关闭弹窗？')
      .then(_ => {
        let i = this.configInfo.children.length - 1;
        while (!this.configInfo.children[i].itemDesc) {
          this.configInfo.children.pop(this.configInfo.children[i]);
          i--;
        }
        done();
      })
      .catch(_ => {});
    },
    validConfig() {
      return new Promise((resolve, reject) => {
        if (this.dialogVisible) {
          this.$refs.configInfo.validate(valid => {
            if (valid) {
              resolve();
            } else {
              reject(Error);
            }
          });
        } else {
          resolve();
        }
      });
    },
    // 修改或添加 发送给后台
    sendUpdate() {
      this.validConfig().then(() => {
        this.$MyFetch.post(surveyApi.fieldsUpdate, this.requestPramas).then(data => {
          this.$message({
            showClose: true,
            message: '保存成功',
            type: 'success'
          });
          this.requestPramas = null;
          this.dialogVisible = false; // 关闭配置弹窗
          this.getList();
        }).catch(err => {
          this.requestPramas = null;
          this.$error(err.message);
        });
      });
    }
  },
  components: {
    pagination
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.dialog_field{
  margin:10px 12px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .el-form-item{
    margin:0;
  }
}
.dialog_field_btn{
  margin:20px 0 30px 12px;
  .icon_plus{
    display: inline-block;
    font-size: 24px;
    height: 10px;
    line-height: 5px;
    margin-right: 8px;
  }
}
</style>
