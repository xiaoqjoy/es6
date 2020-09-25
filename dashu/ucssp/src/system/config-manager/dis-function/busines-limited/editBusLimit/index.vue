<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 590px;
    height: 286px;
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
      /deep/ .el-input-number .el-input__inner {
        text-align: left;
      }
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
    .dialog-box__top {
      margin: 0px;
    }
    .complete-product {
      .dialog-box__middle-form {
        height: 225px;
        .form__bottom {
          position: absolute;
          left: 50%;
          margin-left: -100px;
          bottom: 30px;
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
          height: 225px;
          .el-form-item {
            .el-form-item__label .el-form-item__label {
              padding-bottom: 8px;
            }
            .el-input-number {
              width: 245px;
            }
            width: 245px;
            // margin-left: 20px;
            margin-right: 30px;
            margin-bottom: 20px;
            .el-form-item__content {
              height: 20px;
              line-height: 20px;
              position: relative;
              font-size: 14px;
            }
          }
          .crew {
            width: 100%;
          }
          .loan-review {
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
        <h5 class="title_type">编辑</h5>
        <span class="el-icon-close button button__close" @click="close(compareData)"></span>
      </div>
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <el-form
            :model="list_"
            :rules="rules"
            ref="list_"
            label-width="100px"
            class="demo-form-inline"
            label-position="top"
          >
            <div class="form__block bg__white border__radius-5">
              <div class="dialog-box__form__group">
                <div class="loan-review">{{list_.limitType}}</div>
                <el-form-item label="名下业务量限制笔数" prop="businessLimitCnt">
                  <el-input-number
                    :controls="false"
                    :min="0"
                    :max="999"
                    v-model="list_.businessLimitCnt"
                    placeholder="请输入"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="名下调查量限制笔数" prop="investigationLimitCnt">
                  <el-input-number
                    :controls="false"
                    :min="0"
                    :max="999"
                    v-model="list_.investigationLimitCnt"
                    placeholder="请输入"
                  ></el-input-number>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div class="form__bottom">
            <el-button class="add finish" type="primary" @click="edit" :disabled="!compareData">保存</el-button>
          </div>
        </div>
      </div>
    </div>
    <stateOfPreservation :refer="refer" :fn="edit" v-if="alert_1" @close_window="close_3" @clsoe_windowused="close_2"/>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import rules from "@common/js/rules"; // 引入校验规则
import stateOfPreservation from "../../../rule-config/state-of-preservation/"; // 是否保存修改配置组件
import { configApi } from "../../../js/server"; // 接口
export default {
  data() {
    return {
      alert_1: false, // 是否保存修改配置
      rules: {
        businessLimitCnt: [{ validator: rules.nonNegative4, trigger: "blur" }],
        investigationLimitCnt: [
          { validator: rules.nonNegative4, trigger: "blur" }
        ]
      }
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
    // 编辑接口
    edit() {
      this.$refs["list_"].validate(valid => {
        if (valid) {
          let data = {
            businessLimit: this.list_.businessLimitCnt,
            effectiveStartDate: "2018-10-26",
            id: this.current_data,
            investigationLimit: this.list_.investigationLimitCnt,
            listItem: [
              {
                columnNum: "string",
                detailIds: "string",
                id: 0,
                itemSort: 0,
                priorityReason: "string"
              }
            ]
          };
          let url = configApi.businessLimit_save;
          this.$MyFetch
            .post(url, data)
            .then((data = {}) => {
              this.$emit("clsoe_windowAlert_e");
              this.confirmFn("保存成功", "success");
              this.refer(1);
              this.alert_1 = false;
            })
            .catch(err => {
              this.$error(err.message);
            });
        }
      });
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
  props: ["list_", "current_list", "current_data", "refer"],
  components: {
    stateOfPreservation
  },
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
