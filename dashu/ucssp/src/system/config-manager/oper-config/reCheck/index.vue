<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-mask {
    z-index: 1001;
  }
  .dialog-box {
    width: 390px;
    height: 288px;
    border-radius: 4px;
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: bold;
      box-shadow: 0 2px 6px 0 #d0d0d0;
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
        .selectionbar {
          width: 245px;
          // margin-left: 40px;
          border-radius: 4px;
        }
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
    .dialog-box__top {
      margin: 0px;
    }
    .complete-product {
      .dialog-box__middle-form {
        height: 200px;
        .form__bottom {
          margin-left: 86px;
          margin-top: -44px;
          .finish {
            border: 1px solid #538bf1;
            font-size: 14px;
            color: #538bf1;
            letter-spacing: 1.07px;
            text-align: center;
          }
          .add {
            width: 100px;
          }
        }
        width: 390px;
        // height: 200px;
        padding: 0px;
        .form__block {
          width: 390px;
          padding: 0px;
          margin: 0px;
        }
        .dialog-box__form__group {
          padding-left: 34px;
          padding-top: 20px;
          height: 200px;
          .el-form-item {
            .el-form-item__content {
              display: inline-block;
              .activity {
                display: inline-block;
              }
              .el-input {
                display: inline-block;
                width: 261px;
              }
            }
            width: 300px;
            // margin-left: 20px;
            margin-right: 30px;
            margin-bottom: 20px;
          }
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
        <h5 class="title_type">复核</h5>
        <span class="el-icon-close button button__close" @click="cancel()"></span>
      </div>
      <!-- 新增模型配置 -->
      <div class="complete-product">
        <div class="dialog-box__middle-form">
            <el-form :model="form"
              ref="form"
              :rules="rules"
              label-width="100px"
              class="demo-form-inline" label-position="top" >
              <div class="form__block border__radius-5">
                <div class="dialog-box__form__group">
                  <el-form-item  prop="guarantee_name">
                    <div class="activity">账号</div>
                    <el-input v-model="form.guarantee_name"></el-input>
                  </el-form-item>
                  <el-form-item prop="certificate_type_code">
                    <div class="activity">密码</div>
                    <el-input v-model="form.certificate_type_code" type="password"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form>
            <div class="form__bottom">
              <el-button class="add finish" @click="cancel()">取消</el-button>
              <el-button class="add" type="primary" @click="finish()">保存</el-button>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
/* eslint-disable */
import { hex_sha1 } from '../../../../components/login/she/sha1.js';
export default {
  data() {
    return {
      alert_: false, // 保存修改配置
      alert_1: false, // 是否保存修改配置
      form: {
        guarantee_name: "",
        certificate_type_code: ""
      },
      rules: {
        guarantee_name: [
          { required: true, message: "请输入账号", trigger: "change" }
        ],
        certificate_type_code: [
          { required: true, message: "请输入密码", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    cancel() {
      this.$emit("close_r");
    },
    finish() {
      let sendData = JSON.parse(JSON.stringify(this.form));
      sendData.certificate_type_code = hex_sha1(sendData.guarantee_name.toUpperCase() + sendData.certificate_type_code);
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.reexamine(
            sendData.guarantee_name,
            sendData.certificate_type_code
          );
        }
      });
      // if (
      //   this.form.guarantee_name !== "" &&
      //   this.form.certificate_type_code !== ""
      // ) {
      //   this.confirmFn("保存成功", "success");
      //   this.$emit("close_r");
      // } else {
      //   this.confirmFn("请输入账号和密码", "success");
      // }
    }
  },
  props: ["reexamine"]
};
</script>
