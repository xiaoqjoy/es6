<template>
  <section class="follow-box dialog-box">
    <div class="border-ddd">
      <el-table :data="followData" style="width: 100%" size="mini" v-loading="loading">
        <!-- 5-300字 -->
        <el-table-column prop="content" label="操作内容" align="left">
        </el-table-column>
        <el-table-column prop="operatorName" label="操作人" align="left" width="180">
        </el-table-column>
        <el-table-column prop="createTimeDesc" label="操作时间" align="left" width="180">
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
      followData: []
    };
  },
  props: ['id', 'managerId', 'orgId'],
  created() {
    this.requestData();
  },
  methods: {
    // 获取
    requestData() {
      this.loading = true;
      this.$axios.get('/security/broker/manage/queryBrokerModify', {
        params: {
          brokerId: this.id,
          managerId: this.managerId,
          orgId: this.orgId
        }
      }).then((res) => {
        this.loading = false;
        if (res.data.status === 'C0000') {
          this.followData = res.data.result;
        } else {
          this.followData = [];
        }
      }).catch((res) => {
        console.log(res);
      });
    }
  }
};
</script>
<style scoped>
.follow-box {
  padding: 10px;
  background-color: #eeeeee;
  box-sizing: border-box;
}
</style>

