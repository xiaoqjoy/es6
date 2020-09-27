<template>
    <div class="page-user">
      <el-form :inline="true"
               :model="queryData"
               ref="checkForm"
               class="demo-form-inline">
        <el-form-item prop="roleName">
          <el-input v-model="queryData.roleName" placeholder="请输入角色名" class="width160"></el-input>
        </el-form-item>
        <el-form-item prop="roleId">
          <el-input v-model="queryData.roleId" placeholder="请输入角色编号" class="width160"></el-input>
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
          <el-button type="primary" @click="reset('checkForm')" class="button button__border-blue width100">清除</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="roleList"
        class="common__table"
        header-cell-class-name="table-head"
        row-class-name="table-tr"
        style="width: 100%">
        <el-table-column
          prop="roleName"
          label="角色名">
        </el-table-column>
        <el-table-column
          prop="roleId"
          label="角色编号">
        </el-table-column>
        <el-table-column
          prop="updatedBy"
          label="更新人">
        </el-table-column>
        <el-table-column
          prop="updatedDate"
          label="更新时间">
          <template slot-scope="scope">
            <span>{{(new Date(scope.row.updatedDate)).normalizeTime().strTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="statusCode"
          label="启用状态">
          <template slot-scope="scope">
            <span>{{(scope.row.statusCode === 'U') ? '停用':'正常'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template  slot-scope="scope">
            <span class="cursor__pointer font__blue" @click="openRoleDetail(scope.row.roleId)">详情</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination :page="pageConfig" class="pagination" @jump-page="queryRole"></pagination>
      <transition name="fade">
        <role-detail
          :role-id="currentRoleId"
          @close="closeRoleDetail"
          v-if="roleDetailDg"></role-detail>
      </transition>
    </div>
</template>
<script type="text/ecmascript-6">
  import pagination from '@components/pagination';
  import roleDetail from './role_detail';
  import api from '../js/server/server';
  export default{
    data() {
      return {
        roleList: [],
        form: {},
        // 页面表单中绑定对象
        queryData: {
          roleName: '',
          roleId: '',
          statusCode: ''
        },
        currentQuery: {}, // 存放当前查询的条件
        pageConfig: {
          account: 1,
          currentPage: 1,
          pageSize: 10,
          showJumpButton: true
        },
        roleDetailDg: false, // 角色详情
        currentRoleId: '' // 当前弹窗展示的角色详情id
      };
    },
    methods: {
      // 打开角色详情
      openRoleDetail(id) {
        this.roleDetailDg = true;
        this.currentRoleId = id;
      },
      closeRoleDetail() {
        this.roleDetailDg = false;
      },
      // 按钮点击查询
      checkData() {
        if (!this.queryData.roleName && !this.queryData.roleId && !this.queryData.statusCode) {
          this.confirmFn('请输入查询条件', 'error');
        } else {
          this.currentQuery = JSON.parse(JSON.stringify(this.queryData));
          this.queryRole(1);
        }
      },
      reset(formName) {
        this.$refs[formName].resetFields();
      },
      // 查询接口
      queryRole(pageNum) {
        this.currentQuery = Object.assign(this.currentQuery, {pageNum: pageNum, pageSize: 10});
        this.$MyFetch.get(api.role.queryRole, this.currentQuery)
          .then((data) => {
            this.roleList = data.list;
            this.pageConfig.currentPage = data.pageNum;
            this.pageConfig.account = data.total ? data.total : 1;
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
      }
    },
    components: {
      pagination,
      roleDetail
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .page-user{
    min-height: 820px;
    position: relative;
    .boxShadow(20px,31px);
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
