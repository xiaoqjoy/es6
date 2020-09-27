<template>
    <div class="import-message">
      <div class="dialog-mask"></div>
      <div class="dialog-box">
        <div class="dialog-msgbox__top">
          <span class="el-icon-close button button__close" @click="close"></span>
        </div>
        <div class="text-center">请填写一条审计条件</div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    // 关闭窗口
    close() {
      this.$emit("clsoe_windowIsSelect");
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.import-message {
  .dialog-mask{
    z-index: 1001
  }
  .dialog-box {
    width: 340px;
    height: 90px;
    .dialog-msgbox__top {
      height:40px;
     .button__close {
      position: absolute;
      top: -5px;
      right: -5px;
      width: 42px;
      height: 42px;
      line-height: 42px;
      border-radius: 50%;
      font-size: 16px;
      text-align: center;
      color: #666;
      font-weight: 600;
      }
    }
    .text-center{
      text-align: center;
    }
  }
}
</style>
