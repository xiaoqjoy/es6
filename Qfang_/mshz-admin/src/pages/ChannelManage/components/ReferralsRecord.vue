<template>
  <section class="dialog-box referrals-record">
    <div class="border-ddd">
      <el-table :data="tableData" style="width: 100%" size="mini" v-loading="loading">
        <!-- 5-300字 -->
        <el-table-column prop="area" label="区域" :min-width="80" align="center">
        </el-table-column>
        <el-table-column prop="gardenName" label="小区" :min-width="120" align="center">
        </el-table-column>
        <el-table-column prop="buildeingName" label="楼栋" :min-width="120" align="center">
        </el-table-column>
        <el-table-column prop="roomNumber" label="房号" :min-width="80" align="center">
        </el-table-column>
        <el-table-column prop="createTimeDesc" label="转介日期" :min-width="80" align="center">
        </el-table-column>
        <el-table-column prop="introduceStatusDesc" label="房源状态" :min-width="80" align="center">
        </el-table-column>
        <el-table-column prop="dealTimeDesc" label="成交日期" :min-width="80" align="center">
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
      tableData: []
    };
  },
  props: ['id'],
  created() {
    this.requestData();
  },
  methods: {
    // 获取
    requestData() {
      this.loading = true;
      this.$axios.get('/security/broker/manage/queryIntroduceDetail', {
        params: {
          brokerId: this.id
        }
      }).then((res) => {
        this.loading = false;
        if (res.data.status === 'C0000') {
          this.tableData = res.data.result;
        } else {
          this.tableData = [];
        }
      }).catch((res) => {
        console.log(res);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.referrals-record {
  padding: 10px;
  background: #eee;
  box-sizing: border-box;
}
</style>

