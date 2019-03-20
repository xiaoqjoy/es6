<template>
  <section>
    <div class="pd-20">
      {{ msg }}
    </div>
    <div class="dialog-footer">
      <el-button type="primary"
        size="mini"
        @click="handleSendMessage">发送</el-button>
      <el-button type="danger"
        size="mini"
        @click="closeDialog">取消</el-button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  props: ['msg', 'bookingNo'],
  methods: {
    handleSendMessage() {
      this.$axios.get('/security/longorder/booking/sendReminderMsgInfo',
        {
          params: { bookingNo: this.bookingNo }
        }
      ).then((res) => {
        if (res.data.result && res.data.status === 'C0000') {
          this.$message.success('短信发送成功!');
          this.closeDialog();
        }
      }).catch(err => {
        console.log(err);
      });
    },
    closeDialog() {
      this.$emit('closeDialog', 'pressMoney');
    }
  }
};
</script>
<style scoped>
</style>
