<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 580px;
    height: 650px;
    padding: 0px;
    background: #fff;
    .dialog-box .dialog-box__top {
      margin: 0px;
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
        height: 501px;
        .form__bottom {
          position: absolute;
          left: 50%;
          margin-left: -100px;
          bottom: 21px;
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
          // .patchReason {
          //   width: 525px;
          // }
          .patchClassification {
            display: block;
            .patchClassification_input {
              width: 525px;
            }
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
          padding-left: 25px;
          padding-top: 18px;
          height: 501px;
          .whether {
            display: block;
            .spanP {
              margin-left: 10px;
            }
            .el-switch__core {
              width: 50px !important ;
            }
          }
          .el-form-item {
            .el-form-item__label .el-form-item__label {
              padding-bottom: 8px;
            }
            .el-form-item__content {
              border: 1px solid #d0d0d0;
              border-radius: 4px;
            }
            width: 245px;
            // margin-left: 20px;
            margin-right: 30px;
            margin-bottom: 20px;
          }
          .finally {
            width: 525px;
            margin: 0px;
           /deep/ .el-textarea__inner {
              height: 100px;
            }
          }
        }
        .el-form {
          height: 270px;
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
        <h5 class="title_type">新增补件原因</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <el-form :model="form"
            :rules="rules"
            ref="form"
            label-width="100px"
            class="demo-form-inline" label-position="top" >
            <div class="form__block bg__white border__radius-5" >
              <div class="dialog-box__form__group">
                <el-form-item class="whether" label="是否新增一级编号" prop="delivery">
                  <el-switch @change="whetherNew" v-model="form.delivery" class='common__switch' :width="50"></el-switch><span class="spanP">{{whetherAdd}}</span>
                </el-form-item>
                <el-form-item v-if="number_s" label="一级编号" prop="number_1">
                  <el-input @change="levelNum" maxlength="10" v-model.trim="form.number_1" placeholder="请输入一级编号"></el-input>
                </el-form-item>
                <el-form-item v-if="number_x" label="一级编号" prop="number_x">
                  <el-select @change="matchingComp"  v-model="form.number_x" placeholder="请选择一级编号">
                    <el-option v-for="item in list_input"
                      :key="item.codeLevelOne"
                      :label="item.codeLevelOne"
                      :value="item.codeLevelOne">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-if="componentClass_" label="补件分类" prop="fill_class">
                  <el-input maxlength="20" @change="MatchComplement" v-model.trim="form.fill_class" placeholder="请输入补件分类"></el-input>
                </el-form-item>
                <el-form-item class="user" v-if="componentClass">
                  <label>补件分类：</label><span v-html="aa"></span>
                </el-form-item>
                <el-form-item label="二级编号" prop="number_2">
                  <el-input @change="secondNumber" v-model.trim="form.number_2" placeholder="请输入二级编号"></el-input>
                </el-form-item>
                <el-form-item class="patchClassification" label="补件分类详情" prop="fill_class_x">
                  <el-input class="patchClassification_input" v-model.trim="form.fill_class_x" placeholder="请输入补件分类详情"></el-input>
                </el-form-item>
                <el-form-item  class="finally" label="对应补件原因">
                  <el-input type="textarea" resize="none" v-model.trim="forReason" placeholder="请输入补件原因"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div class="form__bottom">
            <el-button  type="primary" class="add"  @click="finish('form')">保存</el-button>
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
      whetherAdd: "是", // 提醒是否新增一级编号
      alert_: false, // 保存修改配置
      alert_1: false, // 是否保存修改配置
      forReason: "", // 对应补件原因
      number_x: false, // 默认是否新增一级编号为是
      number_s: true, // 一级编号默认为输入框
      componentClass: false, // 补件分类默认为否
      componentClass_: true, // 补件分类可输入框默认为是
      aa: "", // 当一级编号为下拉框的时候，补件分类自动代入
      list_input: [], // 一级编号下拉框
      form: {
        delivery: true,
        number_1: "",
        number_2: "",
        fill_class: "",
        fill_class_x: "",
        number_x: ""
      },
      rules: {
        delivery: [{ required: true, message: "请选择", trigger: "blur" }],
        number_1: [
          { required: true, message: "请输入一级编号", trigger: "blur" }
        ],
        number_x: [
          { required: true, message: "请输入一级编号", trigger: "blur" }
        ],
        number_2: [
          { required: true, message: "请输入二级编号", trigger: "blur" }
        ],
        fill_class: [
          { required: true, message: "请输入补件分类", trigger: "blur" }
        ],
        fill_class_x: [
          { required: true, message: "请输入补件分类详情", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 匹配输入的二级编号与系统的不能重复
    secondNumber() {
      for (var i = 0; i < this.for.length; i++) {
        if (this.form.number_2 === this.for[i].codeLevelTwo) {
          this.form.number_2 = "";
        }
      }
    },
    // 匹配输入的补件分类与系统的不能重复
    MatchComplement() {
      for (var i = 0; i < this.for.length; i++) {
        if (this.form.fill_class === this.for[i].titleLevelOne) {
          this.form.fill_class = "";
        }
      }
    },
    // 匹配输入的一级编号与系统的不能重复
    levelNum() {
      for (var i = 0; i < this.for.length; i++) {
        if (this.form.number_1 === this.for[i].codeLevelOne) {
          this.form.number_1 = "";
        }
      }
    },
    // 选择的一级编号自动带入补件分类
    matchingComp() {
      for (var i = 0; i < this.list_input.length; i++) {
        if (this.form.number_x === this.list_input[i].codeLevelOne) {
          this.aa = this.list_input[i].titleLevelOne;
        }
      }
    },
    // 根据是否新增一级编号来判断一级编号是输入框还是下拉框
    whetherNew() {
      if (this.form.delivery) {
        this.number_s = true;
        this.number_x = false;
        this.componentClass = false;
        this.componentClass_ = true;
        this.$refs["form"].clearValidate();
        this.whetherAdd = "是";
      } else {
        this.number_s = false;
        this.number_x = true;
        this.componentClass = true;
        this.componentClass_ = false;
        let url = `${
          configApi.levelone_effectiveLevelOne
        }/${"patch_reason"}/effectiveLevelOne/list`;
        this.$MyFetch
          .get(url)
          .then((data = {}) => {
            console.log(data);
            this.list_input = data;
          })
          .catch(err => {
            this.$error(err.message);
          });
        this.$refs["form"].clearValidate();
        this.whetherAdd = "否";
      }
    },
    // 打开是否保存修改
    close() {
      if (
        this.form.number_1 === "" &&
        this.form.number_x === "" &&
        this.form.fill_class === "" &&
        this.form.number_2 === "" &&
        this.form.fill_class_x === "" &&
        this.forReason === ""
      ) {
        this.$emit("clsoe_windowAlert");
      } else {
        this.alert_1 = true;
      }
    },
    // 打开是否保存点击是的操作
    save_s() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.delivery) {
            let data = {
              codeLevelOne: this.form.number_1,
              codeLevelTwo: this.form.number_2,
              descLevelTwo: this.forReason,
              idLevelTwo: "",
              newLevelOne: true,
              titleLevelOne: this.form.fill_class,
              titleLevelTwo: this.form.fill_class_x
            };
            let url = `${
              configApi.operationConfig_twoLevel
            }/${"patch_reason"}/twoLevel/save`;
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
            let data = {
              codeLevelOne: this.form.number_x,
              codeLevelTwo: this.form.number_2,
              descLevelTwo: this.forReason,
              idLevelTwo: "",
              newLevelOne: false,
              titleLevelOne: this.aa,
              titleLevelTwo: this.form.fill_class_x
            };
            let url = `${
              configApi.operationConfig_twoLevel
            }/${"patch_reason"}/twoLevel/save`;
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
          }
        } else {
          this.alert_1 = false;
        }
      });
    },
    // 新增接口
    finish(form) {
      console.log(11111);
      if (this.form.delivery) {
        this.$refs[form].validate(valid => {
          if (valid) {
            let data = {
              codeLevelOne: this.form.number_1,
              codeLevelTwo: this.form.number_2,
              descLevelTwo: this.forReason,
              idLevelTwo: "",
              newLevelOne: true,
              titleLevelOne: this.form.fill_class,
              titleLevelTwo: this.form.fill_class_x
            };
            let url = `${
              configApi.operationConfig_twoLevel
            }/${"patch_reason"}/twoLevel/save`;
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
          } else {
            console.log(111111);
            return false;
          }
        });
      } else {
        this.$refs[form].validate(valid => {
          if (valid) {
            let data = {
              codeLevelOne: this.form.number_x,
              codeLevelTwo: this.form.number_2,
              descLevelTwo: this.forReason,
              idLevelTwo: "",
              newLevelOne: false,
              titleLevelOne: this.aa,
              titleLevelTwo: this.form.fill_class_x
            };
            let url = `${
              configApi.operationConfig_twoLevel
            }/${"patch_reason"}/twoLevel/save`;
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
          } else {
            console.log(11111);
            return false;
          }
        });
      }
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
    // 关闭是否保存页面
    close_2_() {
      this.alert_1 = false;
    }
  },
  components: {
    saveChanges,
    whetherSave
  },
  props: ["for", "cause_x"]
};
</script>
