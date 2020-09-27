<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-mask {
    z-index: 1001;
  }
  .dialog-box {
    width: 340px;
    height: 170px;
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: bold;
    }
    .mgtop {
      margin-top: 20px;
    }
    .el-form-item {
      width: 28%;
      margin-right: 40px;
    }
    .el-form-item .el-select {
      width: 245px;
    }
    .dialog-box__middle {
      height: 495px;
      .middle {
        .el-select {
          display: block;
        }
        .el-textarea__inner {
          background: #e5e5e5;
        }
      }
    }
    .dialog-box__middle-1200 {
      height: 442px;
      overflow-y: auto;
      margin: 0 20px;
      padding: 25px 30px;
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
      .dialog-box__middle-top {
        padding: 20px 0;
        border-bottom: 1px solid #e5e5e5;
        .title {
          font-size: 16px;
          .icon__gan {
            margin-right: 10px;
          }
        }
      }
    }
    .dialog-box__middle-form {
      overflow-y: auto;
      padding: 0 20px;
      .form__block {
        padding: 20px 30px;
        margin-bottom: 20px;
        box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
        .dialog-box__middle-top {
          padding-bottom: 20px;
          border-bottom: 1px solid #e9e9e9;
          .title {
            font-size: 16px;
            .icon__gan {
              margin-right: 10px;
            }
          }
        }
      }
    }
    .form__button {
      background: #f8f8f8;
      border: 1px solid #dddddd;
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
    }
    .yes {
      right: 60px;
    }
    .title_type {
      font-size: 14px;
      color: #333333;
      letter-spacing: 1.07px;
      text-align: center;
    }
  }
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <div class="title_type">是否保存已修改的状态？</div>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="form__button no">
        <el-button type="primary" @click="close">否</el-button>
      </div>
      <div class="form__button yes">
        <el-button type="primary" @click="save(savea)">是</el-button>
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
  methods: {
    close() {
      this.$emit("clsoe_windowused");
      // this.refer();
    },
    save(savea) {
      console.log(savea);
      if (
        savea.certificate_type_code &&
        // save_a.certificate_type_code &&
        savea.contact_num.length &&
        savea.certificate_type_code &&
        savea.mun2 &&
        savea.mun1 !== ""
      ) {
        if (savea.mun1 <= savea.mun2) {
          this.finish("form", savea);
        } else {
          this.confirmFn("第一金额必须小于或者等于第二金额");
          this.$emit("clsoe_windowused_a");
        }
      } else {
        // this.fn();
        // this.refer();
        console.log(222);
        this.$emit("clsoe_windowused_a");
      }
    }
  },
  props: ["refer", "savea", "finish"]
};
</script>
