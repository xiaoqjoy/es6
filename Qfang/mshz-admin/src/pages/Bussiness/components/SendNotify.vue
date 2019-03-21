<template>
  <section>
    <div class="pd-20">
      <p v-html="messagesInfo.split('http://')[0]"></p>
      <p>{{messagesInfo.split('http://')[1] ? 'http://' + messagesInfo.split('http://')[1] : ''}}</p>
    </div>
    <div class="dialog-footer">
      <el-button type="primary"
        size="mini"
        @click="handleSendMessage">发送</el-button>
      <el-button type="danger"
        size="mini"
        @click="closeRentalDialog">取消</el-button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // messagesInfo: '',
      type: 1
    };
  },
  props: {
    refundLeaseNo: {
      type: String
    },
    messagesInfo: {
      type: String,
      default: ''
    }
  },
  // created() {
  //   this.requestData();
  // },
  methods: {
    // requestData() {
    //   this.$axios.get(
    //     '/security/refundlease/billRent', {
    //       params: {
    //         refundLeaseNo: this.refundLeaseNo
    //       }
    //     }
    //   ).then((res) => {
    //     if (res.data.status === 'C0000') {
    //       this.messagesInfo = res.data.result;
    //     } else {
    //       this.$message.warning(res.data.message);
    //     }
    //   }).catch(err => {
    //     // debugger;
    //     this.message.warning(err.message || '服务异常');
    //     console.log(err);
    //   });
    // },

    handleSendMessage() {
      this.$axios.get(
        '/security/refundlease/sendRentMessage', {
          params: {
            refundLeaseNo: this.refundLeaseNo
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.$message.success('短信发送成功');
          this.closeRentalDialog();
        } else {
          this.$message.error('短信发送失败');
        }
      }).catch(err => {
        this.message.error(err.message || '服务异常');
        console.log(err);
      });
    },

    closeRentalDialog() {
      this.$emit('closeRentalDialog');
    }
  }
};
</script>
