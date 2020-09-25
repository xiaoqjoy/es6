<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 590px;
    height: 346px;
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
    .dialog-box__top {
      margin: 0px;
    }
    .complete-product {
      .dialog-box__middle-form {
        height: 285px;
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
          height: 285px;
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
            // height: 100px;
            /deep/ .el-textarea__inner{
              height: 100px;
            }
            margin: 0;
            .el-form-item__content {
              width: 530px;
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
        <h5 class="title_type">编辑</h5>
        <span class="el-icon-close button button__close" @click="close(compareData)"></span>
      </div>
      <div class="complete-product">
        <div class="dialog-box__middle-form">
            <el-form
              ref="form"
              label-width="100px"
              class="demo-form-inline" label-position="top" >
              <div class="form__block bg__white border__radius-5">
                <div class="dialog-box__form__group">
                  <div class="user">
                    <label>编号：</label><span v-html="list_.codeLevelOne"></span>
                  </div>
                  <el-form-item class="investigate" label="退回原因">
                    <el-input maxlength="200" type="textarea" resize="none" v-model="list_.titleLevelOne"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form>
            <div class="form__bottom">
              <el-button class="add finish" type="primary" :disabled="!compareData" @click="finish">保存</el-button>
            </div>
          </div>
      </div>
    </div>
    <saveChanges v-if="alert_" @clsoe_windowused='close_1' />
    <whetherSaveX :refer="cause_x" :fn="finish" v-if="alert_1" @close_window="close_3" @clsoe_windowused='close_2' />
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import saveChanges from "../../../rule-config/save-changes/"; // 保存修改配置组件
import whetherSaveX from "../../whetherSaveX/"; // 是否保存修改配置组件
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
      if (compareData) {
        this.alert_1 = true;
      } else {
        this.$emit("clsoe_windowAlert_e");
      }
    },
    // 打开保存修改配置
    finish() {
      let data = {
        configCode: this.list_.codeLevelOne,
        configTitle: this.list_.titleLevelOne,
        idLevelOne: this.list_.idLevelOne
      };
      let url = `${
        configApi.operationConfig_save
      }/${"aud_return_reason"}/oneLevel/save`;
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
  props: ["current_list", "list_", "cause_x"],
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
