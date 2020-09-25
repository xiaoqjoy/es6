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
      // background: #f8f8f8;
      // border: 1px solid #dddddd;
      width: 100px;
      height: 40px;
      display: inline-block;
      position: absolute;
      bottom: 30px;
      .dead_t {
        border: 1px solid #538bf1;
        font-size: 14px;
        color: #538bf1;
        letter-spacing: 1.07px;
        text-align: center;
      }
      .initiate_t {
        background: #538bf1;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 1.07px;
        text-align: center;
      }
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
        <div class="title_type">{{msg}}</div>
        <span class="el-icon-close button button__close" @click="close_q"></span>
      </div>
      <div class="form__button no">
          <el-button class="t_button dead_t" @click="close">否</el-button>
      </div>
      <div class="form__button yes">
          <el-button class="t_button initiate_t" @click="save">是</el-button>
      </div>
    </div>
    <review :reexamine="reexamine" v-if="review_" @close="close_"/>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { configApi } from "../../../js/server"; // 接口
import review from "../../reason-config/review/index";
export default {
  data() {
    return {
      review_: false
    };
  },
  methods: {
    close_q() {
      this.$emit("clsoe_sf");
    },
    // 复核接口
    reexamine(checkBy, checkByPwd) {
      if (this.value3 === "phone_check_code_salary") {
        let data = {
          checkBy: checkBy,
          checkByPwd: checkByPwd
        };
        let url = `${
          configApi.levelone_checkAndSave
        }/${"phone_check_code"}/checkAndSave`;
        this.$MyFetch
          .post(url, data)
          .then((data = {}) => {
            console.log(data);
            this.confirmFn("复核成功", "success");
            this.$router.push({name: JSON.parse(localStorage.getItem("changeName"))});
            this.review_ = false;
            this.cause_x(1);
            this.$emit("clsoe_sf");
          })
          .catch(err => {
            this.$error(err.message);
          });
      } else {
        let data = {
          checkBy: checkBy,
          checkByPwd: checkByPwd
        };
        let url = `${
          configApi.levelone_checkAndSave
        }/${"phone_check_code"}/checkAndSave`;
        this.$MyFetch
          .post(url, data)
          .then((data = {}) => {
            console.log(data);
            this.confirmFn("复核成功", "success");
            this.$router.push({name: JSON.parse(localStorage.getItem("changeName"))});
            this.review_ = false;
            this.cause_(1);
            this.$emit("clsoe_sf");
          })
          .catch(err => {
            this.$error(err.message);
          });
      }
    },
    close_() {
      this.review_ = false;
    },
    close() {
      if (this.value3 === "phone_check_code_salary") {
        let url = `${
          configApi.operationConfig_revokeSave
        }/${"phone_check_code"}/revokeSave`;
        this.$MyFetch
          .post(url)
          .then((data = {}) => {
            console.log(data);
            this.confirmFn("数据保存不成功", "err");
            this.$router.push({name: JSON.parse(localStorage.getItem("changeName"))});
            this.$emit("clsoe_sf");
            this.$emit("jump");
            this.cause_x(1);
          })
          .catch(err => {
            this.$error(err.message);
          });
      } else {
        let url = `${
          configApi.operationConfig_revokeSave
        }/${"phone_check_code"}/revokeSave`;
        this.$MyFetch
          .post(url)
          .then((data = {}) => {
            console.log(data);
            this.confirmFn("数据保存不成功", "err");
            this.$router.push({name: JSON.parse(localStorage.getItem("changeName"))});
            this.$emit("clsoe_sf");
            this.$emit("jump");
            this.cause_(1);
          })
          .catch(err => {
            this.$error(err.message);
          });
      }
    },
    save() {
      this.review_ = true;
    }
  },
  props: ["msg", "cause_x", "cause_", "value3"],
  components: {
    review
  }
};
</script>
