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
        @click="closeDialog">取消</el-button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      // messagesInfo: '',
      type: 1,
      myRequestUrl: '/security/longOrder/sendRentMessageByOrder'
    };
  },
  props: {
    orderNo: {
      type: String
    },
    billNo: {
      type: String
    },
    source: {
      type: String
    },
    messagesInfo: {
      type: String,
      default: ''
    },
    requestUrl: {
      type: String,
      default: '/security/longOrder/sendRentMessageByOrder'
    }
  },
  // created() {
  //   this.requestData();
  // },
  methods: {
    handleSendMessage() {
      // v1.12.0 后 使用订单号催款（租金，生活账单）
      // /security/longOrder/sendRentMessageByOrder 此接口仅用于房态列表催租
      let params = {};
      if (this.source === 'houseStatus') {
        params = { orderNo: this.orderNo };
        this.myRequestUrl = '/security/longOrder/sendRentMessageByOrder';
      } else {
        params = {
          keyword: this.billNo,
          type: 1
        };
        this.myRequestUrl = this.requestUrl;
      }
      // let params = this.source === 'houseStatus' ? this.orderNo : this.billNo;
      this.$axios.get(this.myRequestUrl, {
        params: params
      }).then((res) => {
        if (res.data.status === 'C0000') {
          this.$message.success('短信发送成功');
          this.closeDialog();
        } else {
          this.$message.error(res.data.message);
        }
      }).catch(err => {
        this.message.error(err.message || '服务异常');
        console.log(err);
      });
    },

    closeDialog() {
      this.$emit('closeDialog', 'speedrental');
    }
  }
};
</script>
