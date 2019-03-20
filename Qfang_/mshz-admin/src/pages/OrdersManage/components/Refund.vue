<template>
  <section>
    <section class="refund-box">
      <el-form ref="refund" label-width="100px" class="refund-form">
        <el-form-item label="退款金额：">
          <el-input v-model="orderInfo.refundMoney" disabled />
        </el-form-item>

        <el-form-item label="退款日期：">
          <el-date-picker v-model="refundTime" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" :disabled="orderInfo.refundWay === 'ON_LINE'" />
        </el-form-item>

        <el-form-item label="退款方式：">
          <el-input :value="(orderInfo.refundWay === 'ON_LINE' ? orderInfo.payChannelDesc : '')+orderInfo.refundWayDesc" disabled />
        </el-form-item>
        <el-form-item label="财务备注：">
          <el-input type="textarea" v-model="financeRemark" placeholder="输入备注说明" :autosize="{ minRows: 5, maxRows: 5}" :minlength="1" :maxlength="300" />
        </el-form-item>
      </el-form>
    </section>
    <section class="dialog-footer">
      <el-button type="primary" size="mini" @click="handleSubmit('refund')">确 定</el-button>
      <el-button size="mini" @click="closeDialog">取 消</el-button>
    </section>
  </section>
</template>
<script>
export default {
  data() {
    let curDate = new Date();
    let refundTime = curDate.getFullYear() + '-' + ('0' + (curDate.getMonth() + 1)).substring(-2) + '-' + curDate.getDate();
    return {
      refundTime: refundTime,
      financeRemark: ''
    };
  },
  props: ['orderInfo'],

  methods: {
    closeDialog() {
      this.$emit('toggleRefundDialog', false);
    },
    handleSubmit(formName) {
      this.$axios
        .post('security/order/refund/operate', {
          refundId: this.orderInfo.id,
          refundTime: this.refundTime,
          financeRemark: this.financeRemark
        })
        .then(res => {
          if (res.data.status === 'C0000') {
            this.$message({
              type: 'success',
              message: '退款成功！'
            });
            this.$emit('toggleRefundDialog', true);
          } else {
            this.$message({
              type: 'warning',
              message: res.data.message
            });
            if (res.data.status === 'F0115') { // 已退款，勿重复退款，刷新列表
              this.$emit('toggleRefundDialog', true);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.refund-form {
  margin-top: 1rem;
  margin-right: 2rem;
}
.message {
  color: #e6a23c;
}
</style>
