<template>
  <div class="import-message">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title bg__white">配置</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="dialog-box__middle content_x">
        <div class="b_content"></div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("close_s");
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.import-message {
  .dialog-box {
    width: 900px;
    height: 662px;
    .dialog-box__middle {
      .b_content {
        text-align: left;
        width: 813px;
        height: 40px;
        margin-left: -16px;
      }
    }
    .content_x {
      width: 862px;
      height: 580px;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
      border-radius: 4px;
      margin-left: 20px;
    }
  }
}
</style>
