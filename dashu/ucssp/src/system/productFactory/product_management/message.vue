<template>
  <div class="err-message">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <span class="msg-data">
        <i class="el-icon-error"></i>
        {{msgData}}
      </span>
    </div>
  </div>
</template>

<script>

  export default {
    props: {
    msgData: {
      type: String,
      default: ''
    }
  },
    data() {
      return {
      };
    },
    methods: {
      selfClose() {
        setTimeout(() => {
          this.close_();
        }, 3000);
      },
      close_() {
        this.$emit("clsoe_windowAlert");
      }
    },
    created() {
      this.selfClose();
    }
};
</script>

<style lang="less" scoped>
  .err-message{
    .dialog-box{
      height: 100px;
      width: 600px;
      .msg-data{
        max-width: 600px;
        font-size: 14px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding-bottom: 20px;
        overflow: hidden;
      }
    }
  }
</style>
