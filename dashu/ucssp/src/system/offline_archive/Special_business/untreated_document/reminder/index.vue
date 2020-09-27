<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 340px;
    height: 210px;
    .title_type {
      text-align: center;
      background: #fff;
      padding-top: 10px;
      span {
        font-size: 16px;
        font-size: 16px;
        color: #333333;
        letter-spacing: 1.22px;
        font-weight: 900;
      }
    }
    .form__bottom {
      display: inline-block;
      .el-button {
        width: 100px;
        height: 40px;
      }
    }
    .no {
      position: absolute;
      left: 60px;
      bottom: 30px;
    }
    .yes {
      position: absolute;
      right: 60px;
      bottom: 30px;
    }
    .title_type {
      font-size: 14px;
      color: #333333;
      letter-spacing: 1.07px;
      text-align: center;
    }
    .content {
      width: 100%;
      height: 20px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
      letter-spacing: 1.38px;
      text-align: center;
      line-height: 20px;
      margin-top: 20px;
    }
    .dialog-box__top {
      box-shadow: 0 0 0 0;
    }
  }
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <div class="title_type">
          <span>提示</span>
        </div>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="content">
        <span v-if="hint_content === 'submit'">是否确认提交？</span>
        <span v-if="hint_content === 'abandon'">是否确认放弃操作？</span>
      </div>
      <div class="form__bottom no">
        <el-button class="add finish" @click="close">取消</el-button>
      </div>
      <div class="form__bottom yes">
        <el-button class="add finish" type="primary" @click="finish">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
export default {
  data() {
    return {};
  },
  props: ["hint_content", "confirm"],
  methods: {
    close() {
      this.$emit("clsoe_windowAlert");
    },
    finish() {
      this.confirm(this.hint_content);
    }
  }
};
</script>
