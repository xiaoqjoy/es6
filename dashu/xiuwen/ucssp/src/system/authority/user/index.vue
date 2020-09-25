<template>
  <div class="page-user">
    <el-button type="primary" class="button button__blue btn__add width100" icon="el-icon-plus" @click="openDg()">新增</el-button>
    <el-form :inline="true"
             :model="queryData"
             ref="checkForm"
             class="demo-form-inline">
      <el-form-item prop="userId">
        <el-input v-model="queryData.userId" placeholder="um账号" class="width160"></el-input>
      </el-form-item>
      <el-form-item prop="departments">
        <el-cascader
          placeholder="所属部门"
          clearable
          class="width160"
          :options="departments"
          :props="dataConfig"
          v-model="queryData.departments"
        ></el-cascader>
      </el-form-item>
      <el-form-item prop="statusCode">
        <el-select
          v-model="queryData.statusCode"
          collapse-tags
          clearable
          class="width160"
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
      :data="tableData"
      class="common__table"
      header-cell-class-name="table-head"
      row-class-name="table-tr"
      style="width: 100%">
      <el-table-column
        prop="userId"
        label="用户编号">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="用户姓名">
      </el-table-column>
      <el-table-column
        prop="departmentName"
        label="部门">
      </el-table-column>
      <el-table-column
        prop="mobilePhoneNum"
        label="手机号">
      </el-table-column>
      <el-table-column
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
          <span class="cursor__pointer font__blue" @click="openDg(scope.row)">编辑</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination :page="pageConfig" class="pagination" @jump-page="queryApi"></pagination>
    <transition name="fade">
      <add-user
        :edit-obj="editObj"
        :departments="departments"
        @close="closeDg"
        v-if="addUserDg"></add-user>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import pagination from '@components/pagination';
  import addUser from './add_user';
  import api from '../js/server/server';
  export default{
    data() {
      return {
        tableData: [],
        // 部门级联 数据关系字典
        dataConfig: {
          label: 'departmentName',
          children: 'children',
          value: 'departmentId'
        },
        // 绑定的查询值
        queryData: {
          userId: '',
          statusCode: '',
          departments: []
        },
        currentCheck: null, // 存放当前查询的条件
        pageConfig: {
          account: 1,
          currentPage: 1,
          pageSize: 10,
          showJumpButton: true
        },
        addUserDg: false,
        departments: [], // 所有部门,
        editObj: {}, // 传入到窗口中的数据
        initEditObj: {
          userId: '',
          userName: '',
          statusCode: 'N',
          mobilePhoneNum: '',
          type: 'add'
        }
      };
    },
    created() {
     this.getAllDepartment();
    },
    methods: {
      openDg(editObj = this.initEditObj) {
        this.editObj = JSON.parse(JSON.stringify(editObj));
        this.addUserDg = true;
      },
      closeDg(update) {
        this.addUserDg = false;
        if (update && !!this.currentCheck) {
          this.queryApi(1);
        }
      },
      reset(formName) {
        this.$refs[formName].resetFields();
      },
      // 获取所有部门
      getAllDepartment() {
        this.$MyFetch.get(api.user.getAllDepartments)
          .then(data => {
            data.list.forEach((v) => {
              this.dealDepartments(v);
            });
            this.departments = data.list;
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
      },
      // 部门数据中的data（子集没有时 为空数组造成渲染级联时白板）
      dealDepartments(obj) {
        if (obj.data.length > 0) {
          obj.children = obj.data;
          obj.children.forEach((v) => {
            this.dealDepartments(v);
          });
        }
      },
      // 按钮点击查询
      checkData() {
        if (!this.queryData.userId && (this.queryData.departments.length === 0) && !this.queryData.statusCode) {
          this.confirmFn('请输入查询条件', 'error');
        } else {
          this.currentCheck = {
            userId: this.queryData.userId,
            departmentId: (this.queryData.departments.length > 0) ? this.queryData.departments[this.queryData.departments.length - 1] : '',
            statusCode: this.queryData.statusCode
          };
          this.queryApi(1);
        }
      },
      queryApi(pageNum) {
        this.currentCheck = Object.assign(this.currentCheck, {pageNum: pageNum, pageSize: 10});
        this.$MyFetch.get(api.user.queryUser, this.currentCheck)
          .then((data) => {
            if (data.list) {
              if (data.list.length !== 0) {
                data.list.forEach((v) => {
                  let departmentName = '';
                  if (v.department) {
                    v.department.forEach((p) => {
                      departmentName += p.departmentName + ',';
                    });
                    departmentName = departmentName.slice(0, -1);
                  }
                  v.departmentName = !departmentName ? '/' : departmentName;
                });
                this.tableData = [...data.list];
              } else {
                this.confirmFn('未查询到相关记录');
                this.tableData = [];
              }
            } else {
              this.confirmFn('未查询到相关记录');
              this.tableData = [];
            }
            this.pageConfig.account = data.total;
            this.pageConfig.currentPage = data.pageNum;
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
      }
    },
    components: {
      pagination,
      addUser
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .page-user{
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
