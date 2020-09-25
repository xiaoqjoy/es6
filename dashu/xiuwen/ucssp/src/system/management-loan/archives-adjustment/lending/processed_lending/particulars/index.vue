<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-mask {
    z-index: 1001;
  }
  .dialog-box {
    width: 340px;
    height: 210px;
    .dialog-box__top {
      height: 210px;
    }
    .title_type {
      font-weight: bold;
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #333333;
      letter-spacing: 1.22px;
      text-align: center;
    }
    .confirm {
      display: block;
      width: 144px;
      height: 44px;
      margin-left: 99px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
      letter-spacing: 1.38px;
      text-align: center;
    }
    .form__button {
      // background: #f8f8f8;
      // border: 1px solid #dddddd;
      width: 100px;
      height: 40px;
      display: inline-block;
      position: absolute;
      bottom: 30px;
      .el-button {
        width: 100px;
        height: 40px;
      }
    }
    .no {
      left: 60px;
      .button {
        background: #f8f8f8;
        border: 1px solid #dddddd;
        color: #333333;
      }
    }
    .yes {
      right: 60px;
    }
  }
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <div class="title_type">提示</div>
        <span class="confirm">确认提交该笔任务？</span>
        <span
          class="el-icon-close button button__close"
          @click="close"
        ></span>
      </div>
      <div class="form__button no">
        <el-button
          class="button"
          type="primary"
          @click="close"
        >取消</el-button>
      </div>
      <div class="form__button yes">
        <el-button
          type="primary"
          @click="save"
        >确认</el-button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
export default {
  props: ["form_a", "orgForm_a", "ruleForm"],
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("clsoe_windowAlert");
      // this.refer();
    },
    save() {
      // if (this.ruleForm.date1 !== "") {
      //   if (this.form_a.length !== 0 || this.orgForm_a.length !== 0) {
      //     this.$emit("clsoe_windowused_b");
      //     this.$emit("clsoe_windowused");
      //     console.log(11111);
      //     console.log(this.ruleForm.date1);
      //   } else {
      //     this.confirmFn("请填写一条审计条件");
      //     this.$emit("clsoe_windowused");
      //     console.log(this.ruleForm.date1);
      //   }
      // } else {
      //   this.confirmFn("请选择生效日期");
      //   this.$emit("clsoe_windowused");
      // }
    }
  }
};
</script>
