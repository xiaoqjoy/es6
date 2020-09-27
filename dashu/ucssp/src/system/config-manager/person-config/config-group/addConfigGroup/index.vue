<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 590px;
    height: 435px;
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
        height: 375px;
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
          height: 375px;
          .el-form-item {
            .el-form-item__label .el-form-item__label {
              padding-bottom: 8px;
            }
            width: 245px;
            // margin-left: 20px;
            margin-right: 30px;
            margin-bottom: 20px;
            display: block;
            .el-form-item__content {
              height: 20px;
              line-height: 20px;
              position: relative;
              font-size: 14px;
            }
          }
          .take-effect {
            display: inline-block;
          }
          .crew {
            width: 100%;
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
        <h5 class="title_type">新增配置分组</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="complete-product">
        <div class="dialog-box__middle-form">
            <el-form :model="form"
              :rules="rules"
              ref="form"
              label-width="100px"
              class="demo-form-inline" label-position="top" >
              <div class="form__block bg__white border__radius-5">
                <div class="dialog-box__form__group">
                  <el-form-item class="grouping" label="分组：审批分组" prop="guarantee_name">
                  </el-form-item>
                  <el-form-item class="business" label="业务小组" prop="guarantee_name">
                    <el-input v-model="form.guarantee_name" placeholder="审批一组"></el-input>
                  </el-form-item>
                  <el-form-item class="crew" label="组员" prop="guarantee_name">
                    <el-radio v-model="form.radio" label="1">李娜 lina</el-radio>
                    <el-radio v-model="form.radio" label="2">洪金 hongjin</el-radio>
                    <el-radio v-model="form.radio" label="3">张三 zhangsan</el-radio>
                  </el-form-item>
                  <el-form-item class="take-effect" label="生效日期" prop="guarantee_name">
                    <el-date-picker
                      v-model="form.date"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item class="take-effect" label="生效日期" prop="guarantee_name">
                    <el-date-picker
                      v-model="form.date"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </el-form-item>
                </div>
              </div>
            </el-form>
            <div class="form__bottom">
              <el-button class="add finish" type="primary" @click="finish">确认</el-button>
            </div>
          </div>
      </div>
    </div>
    <saveChanges v-if="alert_" @clsoe_windowused='close_1' />
    <stateOfPreservation v-if="alert_1" @clsoe_windowused='close_2' />
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import saveChanges from "../../../rule-config/save-changes/"; // 保存修改配置组件
import stateOfPreservation from "../../../rule-config/state-of-preservation/"; // 是否保存修改配置组件
export default {
  data() {
    return {
      id: "10021",
      alert_: false, // 保存修改配置
      alert_1: false, // 是否保存修改配置
      form: {
        guarantee_name: "",
        certificate_type_code: "",
        contact_num: "",
        house_area_num: "",
        house_branch_num: "",
        house_address: "",
        date: "",
        radio: "1"
      },
      orgForm: {
        org_contract_name: "",
        org_name: "",
        org_area_num: "",
        org_address: "",
        org_phone_num: "",
        org_branch_num: ""
      },
      rules: {
        guarantee_name: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        certificate_type_code: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        contact_num: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        house_area_num: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        house_branch_num: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        house_address: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ]
      },
      orgRules: {
        org_contract_name: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        org_name: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        org_area_num: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        org_address: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        org_phone_num: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        org_branch_num: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    close() {
      this.alert_1 = true;
    },
    // 打开保存修改配置
    finish() {
      this.alert_ = true;
      // this.$emit("clsoe_windowAlert");
    },
    // 关闭保存修改配置
    close_1() {
      this.alert_ = false;
    },
    close_2() {
      this.alert_1 = false;
       this.$emit("clsoe_windowAlert");
    }
  },
  components: {
    saveChanges,
    stateOfPreservation
  }
};
</script>
