<!-- 提示窗 == 删除 -->
<template>
  <div class="import-message">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-msgbox__top">
        <span class="el-icon-close button button__close" @click="delete_close"></span>
      </div>
      <div class="text-center">{{message}}</div>
      <div class="affirm_select">
        <el-button class="t_button cancel_t button" @click="delete_close">取消</el-button>
        <el-button class="t_button affirm_t button" @click="save">确认</el-button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  methods: {
    delete_close() {
      this.$emit("close_s");
    },
    save() {
      if (this.message === "是否退回选中的申请") {
        this.deleteInterface();
      } else {
        this.deleteInterface_();
      }
    }
  },
  props: ["deleteInterface", "message", "deleteInterface_"]
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.import-message {
  .dialog-box {
    width: 340px;
    height: 170px;
    .dialog-msgbox__top {
      height: 40px;
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
    .text-center {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
      letter-spacing: 1.07px;
      text-align: center;
    }
    // 确认选择
    .affirm_select {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 40px;
      .t_button {
        width: 100px;
        height: 40px;
      }
      .cancel_t {
        // 取消
        background: #f8f8f8;
        border: 1px solid #dddddd;
        font-size: 14px;
        color: #666;
        letter-spacing: 1.07px;
        text-align: center;
      }
      .affirm_t {
        // 确认
        background: #538bf1;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 1.07px;
        text-align: center;
      }
    }
  }
}
</style>
