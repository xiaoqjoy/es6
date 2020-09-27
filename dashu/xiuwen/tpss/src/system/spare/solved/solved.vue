<template>
  <div class="table-area">
    <el-form :inline="true"
             :model="form"
             :rules="rules"
             class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="form.applicationId" placeholder="申请编号"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.custName" placeholder="客户名称"></el-input>
      </el-form-item>
      <el-form-item prop="certificateNum">
        <el-input v-model="form.certificateNum" placeholder="证件编号"></el-input>
      </el-form-item>
      <el-form-item>
        <button type="button" @click="getData(1)" class="button button__blue font__white width100">查询</button>
      </el-form-item>
    </el-form>
    <el-table
    :data="tableData"
    style="width: 100%">
      <el-table-column
        prop="applicationId"
        label="申请编号">
      </el-table-column>
      <el-table-column
        prop="custName"
        label="客户姓名">
      </el-table-column>
      <el-table-column
        prop="certificateNum"
        label="身份证号">
      </el-table-column>
      <el-table-column
        prop="mobileNum"
        label="手机号码">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="checkDetail(scope.row.applicationId)" type="text" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :page="pageConfig" class="pagination" @jump-page="jump"></pagination>
    <complete-info
      :isReadonly="true"
      @close="closeCompleteInfo"
      v-if="openCompleteInfoDg"
      :applicationId="currentApplicationId"></complete-info>
  </div>
</template>

<script type="text/ecmascript-6">
  import { spareApi } from '../js/server';
  import myRule from '@common/js/rules';
  import pagination from '@components/pagination';
  import completeInfo from '../solving/complete_info';
export default {
  data() {
    return {
      tableData: [],
      form: {
        applicationId: '',
        custName: '',
        certificateNum: ''
      },
      rules: {
        certificateNum: [
          { validator: myRule.identityCardRule, trigger: 'blur' }
        ]
      },
      pageConfig: {
        account: 0,
        currentPage: 1,
        pageSize: 10,
        showJumpButton: true
      },
      openCompleteInfoDg: false,
      currentApplicationId: ''
    };
  },
  methods: {
    getData(pageNum) {
//      if (!this.form.applicationId && !this.form.custName && !this.form.certificateNum) {
//        this.confirmFn('请输入查询条件！', 'error');
//        return;
//      }
      let data = this.form;
      data.pageNum = pageNum;
      data.pageSize = 10;
      this.$MyFetch.post(spareApi.solved.getTableData, data)
        .then((data = {}) => {
          this.tableData = [...data.list];
          this.pageConfig.currentPage = data.pageNum;
          this.pageConfig.account = data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    jump(index) {
      this.getData(index);
    },
    checkDetail(id) {
      this.currentApplicationId = id;
      this.openCompleteInfoDg = true;
    },
    closeCompleteInfo() {
      this.openCompleteInfoDg = false;
    }
  },
  created() {
    console.log(this.$route);
  },
  components: {
    pagination,
    completeInfo
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .pagination{
    margin:20px 0;
  }
</style>
