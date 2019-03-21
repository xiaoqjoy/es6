
<template>
  <section class="house-box">
    <header class="house-header">
      <div class="search-box">
        <el-row :gutter="10">
          <el-col :span="3">
            <el-select v-model="filtrateForm.state" placeholder="参数类型" size="mini" @change="handlePageChange(1)">
              <el-option label="全部" :value="null"></el-option>
              <el-option :label="v.type" :value="v.type" v-for="(v,k) in baseData" :key="k"></el-option>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-input v-model="filtrateForm.keyword" placeholder="输入参数名称" size="mini" clearable></el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" size="mini" @click="handlePageChange(1)">搜索</el-button>
          </el-col>
          <el-col :span="2" :offset="12">
            <el-button type="success" size="mini" @click="addDialogShow">新增</el-button>
          </el-col>
        </el-row>
      </div>
    </header>
    <div class="house-list">
      <el-table :data="tableData" border stripe header-align="center" ref="houseReleaseTable" size="small" height="100%" @row-click="handleRow" :loading="loading">
        <el-table-column label="序号" type="index" :width="50" align="center">
        </el-table-column>
        <el-table-column prop="code" label="参数编码" :min-width="100" align="center" />
        <el-table-column prop="codeType" label="参数类型" :min-width="100" align="center" />
        <el-table-column prop="codeName" label="参数名称" :min-width="200" align="center" />
        <el-table-column prop="valueDesc" label="参数值" :min-width="100" align="center">
          <template slot-scope="scope">
            <p class="pre-p">{{scope.row.valueDesc}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="statusDesc" label="参数状态" :min-width="100" align="center" />
        <el-table-column prop="orgNames" label="应用城市公司" :min-width="100" align="center">
        </el-table-column>
        <el-table-column prop="codeRemark" label="备注" :min-width="200" align="center" />
        <el-table-column label="操作" :min-width="80" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="checkPermission('OMS_SYSTEMCONFIG_EDIT')" @click.stop="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-button type="text" size="small" v-if="checkPermission('OMS_SYSTEMCONFIG_DELETE')" @click.stop="handleDelete(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="house-pagination">
        <el-pagination class="page" @size-change="handleSizeChange" @current-change="handlePageChange" :current-page.sync="currentPage" :page-sizes="[20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :page-count="pageCount" :total="recordCount">
        </el-pagination>
      </div>
    </div>
    <AddBusinessParams v-model="addDialogVisible" :type="addType" :baseData="baseData" :id="addId" @refreshData="requestData" />
  </section>
</template>
<script>
import { handlePages } from '@/components/common/mixin';
import AddBusinessParams from './components/AddBusinessParams';
export default {
  name: 'BusinessParams',
  data() {
    return {
      // 筛选表单
      filtrateForm: {
        state: null,
        keyword: ''
      },
      loading: false,
      tableData: [],
      addDialogVisible: false,
      addType: 'ADD',
      addId: '',
      baseData: []
    };
  },
  mixins: [handlePages],
  created() {
    this.getBaseData();
    this.requestData();
  },
  methods: {
    // 获取基础数据
    getBaseData() {
      this.$axios.get('/security/oms/systemConfig/queryMeta').then(({ data }) => {
        if (data.status === 'C0000') {
          this.baseData = data.result;
        } else {
          this.baseData = [];
          this.$message.error(data.message);
        }
      });
    },
    // 获取数据
    requestData() {
      if (!this.checkPermission('OMS_SYSTEMCONFIG_QUERY')) return;
      this.loading = true;
      this.$axios.get('/security/oms/systemConfig/querySystemConfig', {
        params: {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          codeType: this.filtrateForm.state,
          codeName: this.filtrateForm.keyword
        }
      }).then(res => {
        this.loading = false;
        if (res.data.status === 'C0000') {
          this.pageCount = res.data.result.pageCount;
          this.recordCount = res.data.result.recordCount;
          this.tableData = res.data.result.items;
        } else {
          this.tableData = [];
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.loading = false;
        this.tableData = [];
        this.$message.error(err.message || '服务器异常');
      });
    },
    // 新增参数
    addDialogShow() {
      this.addType = 'ADD';
      this.addDialogVisible = true;
    },
    // 编辑参数
    handleEdit(row) {
      this.addId = row.id;
      this.addType = 'EDIT';
      this.addDialogVisible = true;
    },
    // 删除参数
    handleDelete(row) {
      this.$confirm('您确定删除此业务配置参数吗？', '删除业务配置', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            this.$axios.post('/security/oms/systemConfig/deleteConfig', {
              id: row.id
            }).then(res => {
              if (res.data.status === 'C0000') {
                this.$message.success('删除成功');
                this.requestData();
              } else {
                this.$message.error(res.data.message);
              }
              done();
            });
          } else {
            done();
          }
        }
      });
    },
    handleRow() {

    }
  },
  components: {
    AddBusinessParams
  }
};
</script>
<style lang="scss" scoped>
.search-box {
  padding: 10px 10px;
  z-index: 10;
}
.pre-p {
  white-space: pre-line;
}
</style>

