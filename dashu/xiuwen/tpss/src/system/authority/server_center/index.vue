<template>
  <div  class="page-server-center">
    <el-button type="primary" class="button button__blue btn__add width100" icon="el-icon-plus" @click="openDg()">新增</el-button>
    <el-form :inline="true"
             :model="queryData"
             ref="checkForm"
             class="demo-form-inline">
      <el-form-item prop="serviceName">
        <el-input v-model="queryData.serviceName" class="width160" placeholder="个贷服务中心名称"></el-input>
      </el-form-item>
      <el-form-item prop="serviceId">
        <el-input v-model="queryData.serviceId" class="width160" placeholder="个贷服务中心编号"></el-input>
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
        <el-button type="primary" @click="resetForm('checkForm')" class="button__border-blue button width100">清除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      class="common__table"
      header-cell-class-name="table-head"
      row-class-name="table-tr"
      style="width: 100%">
      <el-table-column
        prop="serviceName"
        label="个贷服务中心">
      </el-table-column>
      <el-table-column
        prop="serviceId"
        label="个贷服务中心编号">
      </el-table-column>
      <el-table-column
        prop="updatedBy"
        label="更新人">
      </el-table-column>
      <el-table-column
        label="更新时间">
        <template slot-scope="scope">
          <span>{{scope.row.updatedDate ? (new Date(scope.row.updatedDate)).normalizeTime().strTime : '/'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="mobileNum"
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
      <add-center
        :edit-obj="editObj"
        v-if="addDg"
        @close="closeDg"></add-center>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import pagination from '@components/pagination';
  import addCenter from './add_center';
  import api from '../js/server/server';
  export default{
    data() {
      return {
        tableData: [], // 表格数据
        // 查询条件
        queryData: {
          serviceName: '',
          serviceId: '',
          statusCode: ''
        },
        currentQuery: {}, // 存放当前查询的条件（点击分页时应该使用上一次点击查询时的条件）
        pageConfig: {
          account: 1,
          currentPage: 1,
          pageSize: 10,
          showJumpButton: true
        },
        addDg: false,
        // 打开新增个贷服务中心时 传入的初始化数据
        initEditObj: {
          addressTxt: '',
          area: [],
          statusCode: 'N',
          leaderName: '',
          phoneNum: '', // 联系电话
          serviceName: '',
          serviceMobilePhoneNum: '', // 手机号码,
          oneClickPrintContractCode: 'T', // 是否一键打印
          preparedSignCallNumCode: 'T', // 是否排队
          remotelySignContractCode: 'T' // 是否远程面签
        },
        editObj: {} // 传入到新增（编辑窗口的对象）
      };
    },
    components: {
      pagination,
      addCenter
    },
    methods: {
      // 打开新增或编辑
      openDg(editObj = this.initEditObj) {
        this.editObj = JSON.parse(JSON.stringify(editObj));
        this.addDg = true;
      },
      closeDg(update) {
        this.addDg = false;
        if ((!this.queryData.serviceId && !this.queryData.serviceName && !this.queryData.statusCode) || !update) {
          return;
        }
        this.queryApi(1);
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 按钮点击查询
      checkData() {
        if (!this.queryData.serviceId && !this.queryData.serviceName && !this.queryData.statusCode) {
          this.confirmFn('请输入查询条件', 'error');
        } else {
          this.currentQuery = JSON.parse(JSON.stringify(this.queryData));
          this.queryApi(1);
        }
      },
      queryApi(pageNum) {
        this.currentQuery = Object.assign(this.currentQuery, {pageNum: pageNum, pageSize: 10});
        this.$MyFetch.get(api.serviceCenter.queryService, this.currentQuery)
          .then((data) => {
            this.tableData = [...data.list];
            this.pageConfig.currentPage = data.pageNum;
            this.pageConfig.account = data.total ? data.total : 1;
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
      }
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .page-server-center{
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
