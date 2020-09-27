<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 340px;
    height: 170px;
    border-radius: 4px;
    .dialog-box__top {
      line-height: 14px;
      height: 170px;
      margin: 0;
      padding: 0;
      .button__close {
        top: 0px;
      }
      // 上部文字样式
      .title_type {
        width: 244px;
        height: 20px;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
        letter-spacing: 1.07px;
        text-align: center;
        position: absolute;
        top: 40px;
        left: 48px;
      }
      .form__bottom {
        position: absolute;
        left: 60px;
        bottom: 30px;
        .finish {
          width: 100px;
          height: 40px;
        }
        // 取消按钮样式
        .cancel {
          background: #f8f8f8;
          border: 1px solid #dddddd;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #666;
          letter-spacing: 1.07px;
          text-align: center;
        }
        // 确认按钮样式
        .notarize {
          margin-left: 20px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #ffffff;
          letter-spacing: 1.07px;
          text-align: center;
        }
      }
    }
  }
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title_type">确认要删除选中的记录？</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
        <div class="form__bottom">
          <el-button class="cancel finish" type="primary" @click="cancel()">取消</el-button>
          <el-button class="notarize finish" type="primary" @click="finish()">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
export default {
  props: ["remove_data"],
  data() {
    return {
      id: "10021",
      alert_: false, // 保存修改配置
      alert_1: false // 是否保存修改配置
    };
  },
  methods: {
    // 关闭页面
    close() {
      this.$emit("clsoe_windowAlert_c");
    },
    // 确定删除
    finish() {
      this.remove_data();
      this.$emit("clsoe_windowAlert_c");
    },
    // 取消删除
    cancel() {
      this.$emit("clsoe_windowAlert_c");
    }
  }
};
</script>
