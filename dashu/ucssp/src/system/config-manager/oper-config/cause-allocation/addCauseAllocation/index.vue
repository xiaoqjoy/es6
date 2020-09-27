<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 590px;
    height: 346px;
    border-radius: 4px;
    background-color: #fff;
    .el-textarea__inner {
      height: 100px;
      background: #d0d0d0;
    }
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
          height: 100px;
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
      .el-textarea__inner {
        height: 100px;
        background: #d0d0d0;
      }
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
    .dialog-box__top {
      margin: 0px;
    }
    .complete-product {
      .dialog-box__middle-form {
        height: 270px;
        .form__bottom {
          position: absolute;
          left: 50%;
          margin-left: -100px;
          bottom: 22px;
          .add {
            width: 200px;
          }
        }
        width: 590px;
        // height: 200px;
        padding: 0px;
        .form__block {
          width: 590px;
          padding: 0px;
          margin: 0px;
        }
        .dialog-box__form__group {
          padding-left: 30px;
          padding-top: 20px;
          height: 270px;
          .user {
            margin-bottom: 30px;
            label {
              font-size: 14px;
              color: #666;
            }
            span {
              font-size: 14px;
              color: #151515;
              line-height: 20px;
            }
            .username {
              margin-left: 40px;
            }
          }
          .el-form-item {
            .el-form-item__label .el-form-item__label {
              padding-bottom: 8px;
            }
            width: 245px;
            // margin-left: 20px;
            margin-right: 30px;
            margin-bottom: 20px;
          }
          .number {
            display: block;
          }
          .investigate {
            width: 530px;
            margin: 0;
            .el-textarea__inner {
              height: 100px;
              background: #d0d0d0;
            }
            .el-form-item__content {
              width: 530px;
              height: 100px;
            }
            /deep/ .el-textarea__inner{
              height: 100px;
            }
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
        <h5 class="title_type">新增调查原因</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="complete-product">
        <div class="dialog-box__middle-form">
            <el-form :model="form"
              :rules="rules"
              ref="form"
              label-width="100px"
              class="demo-form-inline" label-position="top">
              <div class="form__block bg__white border__radius-5">
                <div class="dialog-box__form__group">
                  <div class="user">
                    <label>编号：</label><span>{{systemNum}}</span>
                  </div>
                  <el-form-item class="investigate" label="调查原因" prop="investig">
                    <el-input @change="causeInvestig" type="textarea" resize="none" v-model.trim="form.investig"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form>
            <div class="form__bottom">
              <el-button class="add finish" type="primary" @click="finish">保存</el-button>
            </div>
          </div>
      </div>
    </div>
    <saveChanges v-if="alert_" @clsoe_windowused='close_1' />
    <whetherSave :save_s="save_s" v-if="alert_1" @clsoe_windowused='close_2' @clsoe_windowused_='close_2_' />
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import saveChanges from "../../../rule-config/save-changes/"; // 保存修改配置组件
import whetherSave from "../../whetherSave/index"; // 是否保存修改配置组件
import { configApi } from "../../../js/server"; // 接口
export default {
  data() {
    return {
      alert_: false, // 保存修改配置
      alert_1: false, // 是否保存修改配置
      form: {
        investig: ""
      },
      rules: {
        investig: [
          { required: true, message: "请输入调查原因", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 判断调查原因是否与系统中的调查原因相同
    causeInvestig() {
      for (var i = 0; i < this.for.length; i++) {
        if (this.form.investig === this.for[i].descLevelOne) {
          this.form.investig = "";
        }
      }
    },
    close() {
      if (this.form.investig === "") {
        this.$emit("clsoe_windowAlert");
      } else {
        this.alert_1 = true;
      }
    },
    // 打开是否保存点击是的操作
    save_s() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let data = {
            configCode: this.systemNum,
            configTitle: this.form.investig,
            idLevelOne: ""
          };
          let url = `${
            configApi.operationConfig_save
          }/${"investigation_reason"}/oneLevel/save`;
          this.$MyFetch
            .post(url, data)
            .then((data = {}) => {
              console.log(data);
              this.cause_x(1);
              this.confirmFn("新增成功", "success");
              this.$emit("clsoe_windowAlert");
              this.alert_1 = false;
            })
            .catch(err => {
              this.$error(err.message);
              this.alert_1 = false;
            });
        } else {
          this.alert_1 = false;
        }
      });
    },
    // 新增接口
    finish() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let data = {
            configCode: this.systemNum,
            configTitle: this.form.investig,
            idLevelOne: ""
          };
          let url = `${
            configApi.operationConfig_save
          }/${"investigation_reason"}/oneLevel/save`;
          this.$MyFetch
            .post(url, data)
            .then((data = {}) => {
              console.log(data);
              this.cause_x(1);
              this.confirmFn("新增成功", "success");
              this.$emit("clsoe_windowAlert");
            })
            .catch(err => {
              this.$error(err.message);
            });
        }
      });
    },
    // 关闭保存修改配置
    close_1() {
      this.alert_ = false;
    },
    // 关闭是否保存页面和新增页面
    close_2() {
      this.alert_1 = false;
      this.$emit("clsoe_windowAlert");
    },
    // 关闭是否保存修改配置
    close_2_() {
      this.alert_1 = false;
    }
  },
  components: {
    saveChanges,
    whetherSave
  },
  props: ["for", "systemNum", "cause_x"]
};
</script>
