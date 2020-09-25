<template>
  <div class="table-area">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="form.id" placeholder="登记编号"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.user" placeholder="客户名称"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="form.userId" placeholder="证件编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="check" class="add check">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
    :data="tableData"
    style="width: 100%">
      <el-table-column
        prop="date"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="address"
        label="身份证号">
      </el-table-column>
      <el-table-column
        prop="address"
        label="手机号码">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="reIntroduction(scope.row)" type="text" size="small">重新引入</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination class="pagination"></pagination>
  </div>
</template>

<script type="text/ecmascript-6">
  import pagination from '@components/pagination';
export default {
  data() {
    return {
      tableData: [],
      form: {
        id: '',
        user: '',
        userId: ''
      }
    };
  },
  methods: {
    check() {
      console.log(this.form);
    },
    reIntroduction (row) {
      this.$confirm('确认重新进入待处理流程？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        // 调用放弃贷款弹窗
      }).catch(() => {});
    }
  },
  created() {},
  components: {
    pagination
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .pagination{
    margin-top: 20px;
  }
</style>
