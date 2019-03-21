<template>
  <section class="follow-box dialog-box">
    <div class="border-ddd">
      <el-table :data="CustRentLogData"
        style="width: 100%"
        size="mini"
        v-loading="loading">
        <el-table-column prop="houseResource"
          label="房源"
          align="left"
          :min-width="250">
        </el-table-column>
        <el-table-column prop="pattern"
          label="模式"
          :min-width="80">
        </el-table-column>
        <el-table-column prop="leaseTerm"
          label="租赁期"
          :min-width="150">
        </el-table-column>
        <el-table-column prop="houseType"
          label="户型"
          :min-width="100">
        </el-table-column>
        <el-table-column prop="managerName"
          label="管家"
          :min-width="80">
        </el-table-column>
        <el-table-column
          label="面积"
          :min-width="80">
          <template slot-scope="scope">
            {{scope.row.area}}㎡
          </template>
        </el-table-column>
        <el-table-column prop="rentPrice"
          label="租金"
          :min-width="100">
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      followInfo: '',
      CustRentLogData: [
        {
          'area': 'string',
          'houseResource': 'string',
          'houseType': 'string',
          'id': '',
          'leaseTerm': 'string',
          'managerName': 'string',
          'pattern': 'string',
          'rentPrice': 0
        }
      ]
    };
  },
  props: ['custId'],
  created() {
    this.requestData();
  },
  methods: {
    // 获取
    requestData() {
      this.loading = true;
      this.$axios.get(
        '/security/customer/queryLeaseRecord',
        {
          params: {
            id: this.custId
          }
        }
      ).then((res) => {
        this.loading = false;
        if (res.data.result && res.data.status === 'C0000') {
          this.CustRentLogData = res.data.result;
        } else {
          this.CustRentLogData = [];
        }
      }).catch((err) => {
        this.loading = false;
        console.log(err.message || '服务异常');
      });
    }
  }
};
</script>
<style scoped>
.follow-box {
  padding: 20px;
  background-color: #eeeeee;
  box-sizing: border-box;
}
</style>

