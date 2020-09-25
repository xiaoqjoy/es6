<template>
  <div class="survey_config_list">
    <!-- 新增按钮 -->
    <button class="add" @click="addConfig()">+ 新增</button>
    <!-- 查询表单 -->
    <el-form class="search" :inline="true" :model="searchInfo" ref="searchInfo" :rules="searchRule">
      <el-form-item prop="itemDesc">
        <el-input v-model="searchInfo.itemDesc" clearable placeholder="行业名称" maxlength="20"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button class="width100" type="primary" @click="search">查询</el-button>
          <el-button class="width100" type="primary" plain @click="clearSearch">清空</el-button>
        </el-form-item>
    </el-form>

    <div class="table_box">
      <!-- 表格数据 -->
      <el-table class="feild_table" :data="pageData.list" style="100%">
        <el-table-column label="序号">
          <template slot-scope="scope"><span>{{scope.$index+1}} </span></template>
        </el-table-column>
        <el-table-column prop="itemCode" label="二级行业编号"></el-table-column>
        <el-table-column prop="itemDesc" label="二级行业名称"></el-table-column>
        <el-table-column prop="statusInd" label="是否正常使用">
          <template slot-scope="scope">
            <el-switch :width="50" v-model="scope.row.statusInd" :active-value="true" :inactive-value="false" @change="editStatus(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editConfig(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="page_box">
      <pagination @jump-page='handleCurrentChange' :page='searchInfo' class="pagination"></pagination>
    </div>

    <el-dialog class="dialog" :title="configDialog.title" :visible.sync="configDialog.dialogVisible" :before-close="handleClose" width="500px" center>
      <el-form class="search" :inline="true" :model="configInfo" :rules="configRule" ref="configInfo" label-position="top">
        <div class="dialog_con">
          <div class="top_conten"><span class="top_conten_title">二级行业编号：</span><span class="top_content_font">{{configInfo.itemCode}}</span></div>
        </div>
        <el-form-item label="二级行业名称" prop="itemDesc" placeholder="请填写商圈名称" class="width225">
          <el-input v-model="configInfo.itemDesc" placeholder="请填写行业名称" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="使用状态" prop="statusInd" class="width225">
          <el-select v-model="configInfo.statusInd" placeholder="请选择">
            <el-option label="失效" :value="false"></el-option>
            <el-option label="生效" :value="true"></el-option>
          </el-select>
        </el-form-item>
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
import {deepClone, parseTime} from "../../js/utils.js";
export default {
  name: "pending-task",
  data() {
    return {
      configInfo: {
        itemDesc: '',
        statusInd: '',
        parentCode: ''
      },
      configDialog: {
        title: '',
        dialogVisible: false
      },
      pageData: {},
      total: 5,
      // 查询信息
      searchInfo: {
        pageNum: 1,
        pageSize: 10,
        type: 'config',
        itemDesc: '',
        id: '', // 一级行业id
        parentCode: '',
        account: 0,
        currentPage: 1,
        showJumpButton: true
      },
      searchRule: {
        itemDesc: [
          { max: 20, trigger: 'blur', message: '请输入20字符以内' },
          { trigger: 'blur', validator: reportValidator.chineseRule }
        ]
      },
      configRule: {
        itemDesc: [
          { required: true, trigger: 'blur', message: '请填写' },
          { max: 20, trigger: 'blur', message: '请输入20字符以内' },
          { trigger: 'blur', validator: reportValidator.chineseRule }
        ],
        statusInd: [
          { required: true, trigger: 'change', message: '请选择' }
        ]
      }
    };
  },
  created() {
    // 获取数据列表
    this.searchInfo.parentCode = this.$route.params.parentCode;
    this.searchInfo.id = this.$route.params.id;
    this.getList();
  },
  methods: {
    // 获取数据列表（flag存在，则代表进行点击查询操作）
    getList() {
      this.$MyFetch.post(surveyApi.industrysConfig, this.searchInfo).then(data => {
        if (data.total === 0) {
          this.$message({
            showClose: true,
            message: '未查询到结果',
            type: 'warning'
          });
        }
        this.pageData = data;
        this.searchInfo.account = data.total;
      }).catch(err => {
        this.$error(err.message);
      });
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
    // 新增二级行业
    addConfig() {
      let time = parseTime(new Date());
      this.itemCodeNumber = 'HYS' + time.replace(/\D/g, '') + parseInt((Math.random() * 9 + 1) * 1000);
      this.configInfo = {
        itemCode: this.itemCodeNumber,
        itemDesc: '', // 行业名称
        statusInd: '', // 使用状态
        parentCode: this.searchInfo.parentCode
      };
      this.configDialog = {
        title: '新增行业配置',
        dialogVisible: true
      };
    },
    // 修改一级行业
    editConfig(item) {
      this.configInfo = deepClone(item);
      this.configDialog = {
        title: '新增行业配置',
        dialogVisible: true
      };
      this.$nextTick(() => {
        this.$refs.configInfo.clearValidate();
      });
    },
    handleClose(done) {
      this.$confirm('是否关闭弹窗？')
      .then(_ => {
        done();
      })
      .catch(_ => {});
    },
    validConfig() {
      return new Promise((resolve, reject) => {
        if (this.configDialog.dialogVisible) {
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
    editStatus(item) {
      this.configInfo = item;
      this.saveConfig();
    },
    saveConfig() {
      this.validConfig().then(() => {
        this.$MyFetch.post(surveyApi.industrysMeger, this.configInfo).then(data => {
          if (data) {
            this.$message({
              showClose: true,
              message: '保存成功',
              type: 'success'
            });
            this.configDialog.dialogVisible = false;
            this.getList();
          }
        }).catch(err => {
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
