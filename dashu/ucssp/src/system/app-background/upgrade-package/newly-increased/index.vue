<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 590px;
    height: 530px;
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
          height: 40px;
          z-index: 999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          // margin-left: 40px;
          border-radius: 4px;
          .el-select__tags {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
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
        // height: 270px;
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
          height: 468px;
          .el-form-item {
            .el-form-item__label .el-form-item__label {
              padding-bottom: 8px;
            }
            width: 245px;
            // margin-left: 20px;
            margin-right: 30px;
            margin-bottom: 20px;
          }
          .money {
            .el-input {
              display: inline-block;
              width: 117px;
            }
          }
          .uploading {
            display: inline-block;
          }
          .upload-demo {
            width: 100px;
            height: 40px;
            .el-button--primary {
              color: #538bf1;
              background-color: #fff;
              width: 100px;
              height: 40px;
              border: 1px solid #538bf1;
              margin-top: 4px;
            }
          }
          .switch {
            display: block;
          }
          .el-textarea{
            width: 520px;
          }
        }
      }
    }
  }
}
</style>
<style lang="less" scoped>
/deep/ .form__block .el-select .el-select__tags {
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title_type">新增</h5>
        <span
          class="el-icon-close button button__close"
          @click="close"
        ></span>
      </div>
      <!-- 新增模型配置 -->
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <el-form
            :model="form"
            :rules="rules"
            ref="form"
            label-width="100px"
            class="demo-form-inline"
            label-position="top"
          >
            <div class="form__block bg__white border__radius-5">
              <div class="dialog-box__form__group">
                <el-form-item
                  label="升级包名称"
                  prop="upgradePackageName"
                >
                  <el-input v-model="form.upgradePackageName"></el-input>
                </el-form-item>
                <el-form-item
                  label="版本号"
                  prop="versionNum"
                >
                  <el-input v-model="form.versionNum"></el-input>
                </el-form-item>
                <el-form-item
                  label="发布时间"
                  prop="date1"
                >
                  <el-date-picker
                    v-model="form.date1"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item
                  label="类型"
                  prop="sysType"
                >
                  <el-select
                    class="selectionbar"
                    v-model="form.sysType"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in systemtype"
                      :key="item.value"
                      :label="item.show"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  class="switch"
                  label="是否强制更新"
                  prop="isCompelUpdateInd"
                >
                  <!-- <el-input v-model="form.update"></el-input> -->
                  <el-switch
                    v-model="form.isCompelUpdateInd"
                    :width=50
                  ></el-switch>
                </el-form-item>
                <el-form-item
                  label="URL"
                  prop="apkUrl"
                >
                  <el-input v-model="form.apkUrl" type="textarea" :rows="2" resize="none"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div class="form__bottom">
            <el-button
              class="add finish"
              type="primary"
              @click="finish('form')"
            >确认</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { configApi } from "../../js/server.js"; // 接口
import reportRules from "../../js/reportRules.js"; // 规则验证
export default {
  props: ["refer", "systemtype"],
  data() {
    return {
      id: "10021",
      alert_: false, // 保存修改配置
      alert_1: false, // 是否保存修改配置
      // systemtype: [],
      // 新增页面填写的数据
      form: {
        upgradePackageName: "", // 升级包名称
        versionNum: "", // 版本号
        date1: "", // 发布时间
        isCompelUpdateInd: true, // 是否强制更新\
        sysType: "",
        apkUrl: ""
      },
      //  表单验证
      rules: {
        upgradePackageName: [
          { validator: reportRules.chineseRule, trigger: "change" },
          { required: true, message: "请填写升级包名称", trigger: "change" }
        ],
        versionNum: [
          { validator: reportRules.special_character, trigger: "change" },
          { required: true, message: "请填写版本号", trigger: "change" }
        ],
        date1: [
          {
            required: true,
            message: "请选择发布时间",
            trigger: "change"
          }
        ],
        isCompelUpdateInd: [
          { required: true, message: "请选择是否强制更新", trigger: "change" }
        ],
        sysType: [
          {
            required: true,
            message: "请选择类型",
            trigger: "change"
          }
        ],
        apkUrl: [
          {
            required: true,
            message: "请填写URL",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    close() {
      this.$emit("clsoe_windowAlert");
    },
    // // 获取类型分类
    // system() {
    //   let data = {
    //     confType: "dict"
    //   };
    //   let url = configApi.config_init;
    //   this.$MyFetch
    //     .post(url, data)
    //     .then((data = {}) => {
    //       this.systemtype = data.dict.select_uppackage_sys;
    //       console.log(data.dict.select_uppackage_sys);
    //     })
    //     .catch(err => {
    //       this.$error(err.message);
    //     });
    // },
    // 新增保存
    finish(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            upgradePackageName: this.form.upgradePackageName,
            versionNum: this.form.versionNum,
            sendingDttm: this.form.date1,
            isCompelUpdateInd: this.form.isCompelUpdateInd,
            apkUrl: this.form.apkUrl,
            sysType: this.form.sysType
          };
          // 调取接口
          let url = configApi.upgradePackage_save;
          this.$MyFetch
            .post(url, data)
            .then((data = {}) => {
              this.confirmFn("保存成功", "success");
              this.refer(1);
              this.$emit("clsoe_windowAlert");
            })
            .catch(err => {
              this.$error(err.message);
            });
        } else {
          return false;
        }
      });
    }
  }
  // created() {
  //   this.system();
  // }
};
</script>
