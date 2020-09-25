<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 340px;
    height: 170px;
    background: #fff;
    .title_type {
      width: 400px;
      height: 60px;
      text-align: center;
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
          background: #d0d0d0;
        }
      }
    }
    .dialog-box__middle-1200 {
      height: 442px;
      overflow-y: auto;
      margin: 0 20px;
      padding: 25px 30px;
      box-shadow: 0 2px 6px 0 #d0d0d0;
      .dialog-box__middle-top {
        padding: 20px 0;
        border-bottom: 1px solid #d0d0d0;
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
        box-shadow: 0 2px 6px 0 #d0d0d0;
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
    .form__bottom {
      display: inline-block;
      .el-button {
        width: 100px;
        height: 40px;
      }
    }
    .no {
      position: absolute;
      left: 45px;
      bottom: 30px;
    }
    .yes {
      position: absolute;
      right: 45px;
      bottom: 30px;
    }
    .title_type {
      width: 340px;
      span {
        font-size: 14px;
        color: #333333;
        text-align: left;
        line-height: 14px;
      }
    }
    .dialog-box__top {
      box-shadow: 0px;
    }
  }
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <div class="title_type"><span>是否删除该数据？</span></div>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="form__bottom no">
            <el-button class="add finish" @click="close">否</el-button>
        </div>
        <div class="form__bottom yes">
            <el-button class="add finish" type="primary" @click="finish">是</el-button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { partnerApi } from "../../../../js/server.js"; // 接口
export default {
  props: ["del_data", "refer"],
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("clsoe_windowAlert_s");
    },
    finish() {
      let url = `${partnerApi.poster}${this.del_data.id}`;
      this.$MyFetch
        .delete(url)
        .then((data = {}) => {
          this.confirmFn("删除成功", "success");
          this.refer(1);
          this.$emit("clsoe_windowAlert_s");
        })
        .catch(err => {
          this.$error(err.message);
        });
    }
  }
};
</script>
