<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 590px;
    // height: 286px;
    border-radius: 4px;
    padding: 0px;
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
    .dialog-box__top {
      margin: 0px;
    }
    .dialog-box__middle-form {
      overflow-y: auto;
      padding: 0 20px;
      .form__block {
        padding: 20px 30px;
        margin-bottom: 20px;
        // box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
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
        // height: 225px;
        .form__bottom {
          text-align: center;
          margin-top: 10px;
          margin-bottom: 30px;
          // position: absolute;
          // left: 50%;
          // margin-left: -100px;
          // bottom: 21px;
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
          // height: 225px;
          #dimensional {
            display: block;
            width: 560px;
          }
          #secondary {
            width: 530px;
          }
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
          .the-secondary-number {
            position: relative;
            top: -35px;
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
        <h5 class="title_type">编辑</h5>
        <span class="el-icon-close button button__close" @click="close(compareData)"></span>
      </div>
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <el-form ref="form" label-width="100px" class="demo-form-inline" label-position="top">
            <div class="form__block bg__white border__radius-5">
              <div class="dialog-box__form__group">
                <el-form-item class="user">
                  <label>一级编号：</label>
                  <span v-html="list_.codeLevelOne"></span>
                </el-form-item>
                <el-form-item class="user">
                  <label>二级编号：</label>
                  <span v-html="list_.codeLevelTwo"></span>
                </el-form-item>
                <el-form-item id="dimensional" class="user">
                  <label>一级维度：</label>
                  <span v-html="list_.titleLevelOne"></span>
                </el-form-item>
                <el-form-item id="secondary" label="二级维度">
                  <el-input maxlength="100" placeholder="请输入二级维度" v-model="list_.titleLevelTwo"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div class="form__bottom">
            <el-button class="add finish" type="primary" @click="finish" :disabled="!compareData">保存</el-button>
          </div>
        </div>
      </div>
    </div>
    <saveChanges v-if="alert_" @clsoe_windowused="close_1"/>
    <whetherSaveX :listLL="list_.titleLevelTwo" :refer="cause_x" :fn="finish" v-if="alert_1" @close_window="close_3" @clsoe_windowused="close_2"/>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import saveChanges from "../../../rule-config/save-changes/"; // 保存修改配置组件
import whetherSaveX from "../../whetherSaveX/index"; // 是否保存修改配置组件
import { configApi } from "../../../js/server"; // 接口
export default {
  data() {
    return {
      alert_: false, // 保存修改配置
      alert_1: false // 是否保存修改配置
    };
  },
  methods: {
    close(compareData) {
      // if (this.list_.titleLevelTwo === "") {
      //   this.confirmFn("二级维度不能为空");
      // } else {
        if (compareData) {
          this.alert_1 = true;
        } else {
          this.$emit("clsoe_windowAlert_e");
        }
      // }
    },
    // 打开保存修改配置
    finish() {
      if (this.list_.titleLevelTwo === "") {
        this.confirmFn("二级维度不能为空");
      } else {
        if (this.value3 === "phone_check_code_salary") {
          let data = {
            codeLevelOne: this.list_.codeLevelOne,
            codeLevelTwo: this.list_.codeLevelTwo,
            idLevelTwo: this.list_.idLevelTwo,
            newLevelOne: false,
            titleLevelOne: this.list_.titleLevelOne,
            titleLevelTwo: this.list_.titleLevelTwo
          };
          let url = `${
            configApi.operationConfig_twoLevel
          }/${"phone_check_code_salary"}/twoLevel/save`;
          this.$MyFetch
            .post(url, data)
            .then((data = {}) => {
              console.log(data);
              this.cause_x(1);
              this.confirmFn("修改成功", "success");
              this.$emit("clsoe_windowAlert_e");
              this.alert_1 = false;
            })
            .catch(err => {
              this.$error(err.message);
            });
        } else {
          let data = {
            codeLevelOne: this.list_.codeLevelOne,
            codeLevelTwo: this.list_.codeLevelTwo,
            idLevelTwo: this.list_.idLevelTwo,
            newLevelOne: false,
            titleLevelOne: this.list_.titleLevelOne,
            titleLevelTwo: this.list_.titleLevelTwo
          };
          let url = `${
            configApi.operationConfig_twoLevel
          }/${"phone_check_code_self_employed"}/twoLevel/save`;
          this.$MyFetch
            .post(url, data)
            .then((data = {}) => {
              console.log(data);
              this.cause_x1(1);
              this.confirmFn("修改成功", "success");
              this.$emit("clsoe_windowAlert_e");
            })
            .catch(err => {
              this.$error(err.message);
            });
        }
      }
    },
    // 关闭保存修改配置
    close_1() {
      this.alert_ = false;
    },
    // 单独关闭是否保存修改配置
    close_3() {
      this.alert_1 = false;
    },
    // 关闭是否保存修改配置
    close_2() {
      this.alert_1 = false;
      this.$emit("clsoe_windowAlert_e");
    }
  },
  components: {
    saveChanges,
    whetherSaveX
  },
  props: ["list_", "current_list", "value3", "cause_x", "cause_x1"],
  computed: {
    compareData() {
      var isChange = false;
      if (JSON.stringify(this.list_) !== JSON.stringify(this.current_list)) {
        isChange = true;
      }
      return isChange;
    }
  }
};
</script>
