<template>
  <section class="add-orders">

    <div class="border-ddd pd-20">
      <el-table :data="logData" border style="width: 100%" size="mini">
        <el-table-column prop="content" label="内容">
        </el-table-column>
        <el-table-column prop="createTime" label="时间" width="180">
        </el-table-column>
        <el-table-column prop="operatorName" label="操作人" width="180">
        </el-table-column>
      </el-table>

    </div>
  </section>
</template>
<script>
export default {
  props: ['orderNo'],
  data() {
    return {
      logData: []
    };
  },
  mounted() {
    this.getLogData();
  },
  methods: {
    getLogData() {
      this.$axios.get('security/order/queryOrderLog', { params: { orderNo: this.orderNo } })
        .then((res) => {
          // console.log(res, '订单 日志');
          if (res.data.status === 'C0000') {
            this.logData = res.data.result;
          }
        });
    }
  }

};
</script>
<style scoped>
/* el-select el-select--mini */
</style>
