<template>
    <div class="page-company">
      <el-button type="primary" class="button button__blue btn__add width100" icon="el-icon-plus" @click="openAddCompany()">新增</el-button>
      <el-form :inline="true"
               :model="queryData"
               ref="checkForm"
               class="demo-form-inline">
        <el-form-item prop="organizationName">
          <el-input v-model="queryData.organizationName" placeholder="请输入分公司名称" class="width160"></el-input>
        </el-form-item>
        <el-form-item prop="organizationId">
          <el-input v-model="queryData.organizationId" placeholder="请输入分公司编号" class="width160"></el-input>
        </el-form-item>
        <el-form-item prop="statusCode">
          <el-select
            v-model="queryData.statusCode"
            collapse-tags
            class="width160"
            clearable
            placeholder="启用状态">
            <el-option label="正常" value="N"></el-option>
            <el-option label="停用" value="U"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="checkData" class="button width100 button__blue">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="reset('checkForm')" class="button__border-blue button width100">清除</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="tableData"
        class="common__table"
        header-cell-class-name="table-head"
        row-class-name="table-tr"
        style="width: 100%">
        <el-table-column
          prop="organizationName"
          label="分公司名称">
        </el-table-column>
        <el-table-column
          prop="organizationId"
          label="分公司编号">
        </el-table-column>
        <el-table-column
          prop="updatedBy"
          label="更新人">
        </el-table-column>
        <el-table-column
          prop="updatedDate"
          label="更新时间">
          <template slot-scope="scope">
            <span>{{scope.row.updatedDate ? (new Date(scope.row.updatedDate)).normalizeTime().strTime : '/'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="启用状态">
          <template slot-scope="scope">
            <span>{{(scope.row.statusCode === 'U') ? '停用':'正常'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template  slot-scope="scope">
            <span class="cursor__pointer font__blue" @click="openAddCompany(scope.row)">编辑</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination :page="pageConfig" class="pagination" @jump-page="queryApi"></pagination>
      <transition name="fade">
        <add-company
          v-if="addCompanyDg"
          :edit-obj="editObj"
          @close="closeAddCompany"></add-company>
      </transition>
    </div>
</template>
<script type="text/ecmascript-6">
  import pagination from '@components/pagination';
  import addCompany from './add_company';
  import api from '../js/server/server';
  export default{
    data() {
      return {
        tableData: [], // 存放表单数据
        queryData: { // 绑定的查询值
          organizationName: '',
          organizationId: '',
          statusCode: ''
        },
        currentQuery: {}, // 存放当前查询的条件
        pageConfig: {
          account: 1,
          currentPage: 1,
          pageSize: 10,
          showJumpButton: true
        },
        addCompanyDg: false, // 分公司编辑或新增弹出层显示
        editObj: {},
        initEditObj: {
          organizationName: '',
          statusCode: 'U',
          parentOrganizationId: '',
          organizationLevelCode: 'C',
          leaderName: '',
          leaderPostName: '',
          phoneNum: '',
          area: [],
          addressTxt: '',
          service: []
        }
      };
    },
    components: {
      pagination,
      addCompany
    },
    methods: {
      openAddCompany(editObj = this.initEditObj) {
        this.editObj = JSON.parse(JSON.stringify(editObj));
        this.addCompanyDg = true;
      },
      closeAddCompany(update) {
        this.addCompanyDg = false;
        if ((!this.currentQuery.organizationName && !this.currentQuery.organizationId && !this.currentQuery.statusCode) || !update) {
          return;
        }
        this.queryApi(1);
      },
      reset(formName) {
        this.$refs[formName].resetFields();
      },
      // 按钮点击查询
      checkData() {
        if (!this.queryData.organizationName && !this.queryData.organizationId && !this.queryData.statusCode) {
          this.confirmFn('请输入查询条件', 'error');
        } else {
          this.currentQuery = JSON.parse(JSON.stringify(this.queryData));
          this.queryApi(1);
        }
      },
      queryApi(pageNum) {
        this.currentQuery = Object.assign(this.currentQuery, {pageNum: pageNum, pageSize: 10});
        this.$MyFetch.get(api.company.queryCompany, this.currentQuery)
          .then((data) => {
            this.tableData = [...data.list];
            this.pageConfig.account = data.total ? data.total : 1;
            this.pageConfig.currentPage = data.pageNum;
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
      }
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .page-company{
    position: relative;
    min-height: 820px;
    .boxShadow(0,0);
    padding: 20px 31px;
    .btn__add{
      /deep/ .el-icon-plus{
        line-height: 1.2;
        font-weight: 600;
      }
      margin-bottom: 20px;
    }
    .pagination{
      position:absolute;
      bottom: 40px;
      right: 31px;
    }
    .common__table{
      /deep/.el-table__body-wrapper{
        max-height: 550px;
        overflow-y: auto;
      }
    }
  }
</style>
