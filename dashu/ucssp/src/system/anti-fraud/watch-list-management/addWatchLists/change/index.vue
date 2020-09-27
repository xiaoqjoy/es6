<template>
    <div class="import-message2">
      <div class="dialog-mask"></div>
      <div class="dialog-box">
        <div class="dialog-box__top">
          <h5 class="title bg__white">变更</h5>
          <span class="el-icon-close button button__close" @click="close"></span>
        </div>
        <div id="reason">变更原因</div>
        <el-input type="textarea" @change="removeFailureReason" maxlength="100" placeholder="请输入变更原因" v-model="text"></el-input>
        <div style="position:relative">
          <div class="chang_reason" v-if="chang_reason">"变更原因"不能为空,数据保存不成功！</div>
        </div>
        <div class="text-center">
          <el-button class="introductionList_button" type="primary" @click="save">确定</el-button>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
export default {
  data() {
    return {
      chang_reason: false, // 变更提示信息
      text: "" // 变更原因
    };
  },
  components: {},
  props: ["fn"],
  methods: {
    // 当输入框输入变更原因后去掉提示
    removeFailureReason() {
      this.chang_reason = false;
    },
    close() {
      this.$emit("clsoe_windowIsChange");
    },
    save() {
      if (this.text) {
        this.fn(this.text);
        // this.$emit("clsoe_windowIsChange");
        // this.$emit("isChange_s");
        // this.confirmFn('变更成功', "success");
      } else {
        this.chang_reason = true;
      }
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.import-message {
  .dialog-box {
    /deep/ .el-textarea .el-textarea__inner {
      margin-left: 28px;
      margin-top: 10px;
      width: 510px;
      height: 120px;
    }
    width: 570px;
    height: 372px;
    .chang_reason {
      position: absolute;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #f55f5f;
      letter-spacing: 0;
      width: 260px;
      margin-top: 10px;
    }
    #reason {
      font-size: 12px;
      color: #bbbbbb;
      text-align: left;
      margin-left: 32px;
      margin-top: 25px;
    }
    .introductionList_button {
      width: 200px;
      height: 40px;
      background: #538bf1;
      margin-left: 10px;
      margin-top: 50px;
    }
  }
}
</style>
