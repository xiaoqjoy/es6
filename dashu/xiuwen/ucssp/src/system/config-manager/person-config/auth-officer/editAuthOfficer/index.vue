<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 590px;
    height: 330px;
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
        height: 270px;
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
          height: 270px;
          .el-form-item {
            .el-form-item__label .el-form-item__label {
              padding-bottom: 8px;
            }
            width: 245px;
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
        <h5 class="title_type">编辑</h5>
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
                  <el-form-item label="用户编码" prop="guarantee_name">
                    <el-input v-model="form.guarantee_name" placeholder="00001111"></el-input>
                  </el-form-item>
                  <el-form-item label="用户名" prop="guarantee_name">
                    <el-input v-model="form.guarantee_name" placeholder="*************"></el-input>
                  </el-form-item>
                  <el-form-item label="联系电话" prop="guarantee_name">
                    <el-select class="selectionbar" v-model="form.region" placeholder="审核岗">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
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
        date: ""
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
    // 关闭是否保存修改配置
    close_2() {
      this.alert_1 = false;
      this.$emit("clsoe_windowAlert_e");
    }
  },
  components: {
    saveChanges,
    stateOfPreservation
  }
};
</script>
