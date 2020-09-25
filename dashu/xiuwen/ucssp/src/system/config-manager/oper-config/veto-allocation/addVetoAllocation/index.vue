<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 590px;
    height: 710px;
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
        height: 355px;
        .form__bottom {
          text-align: center;
          margin-bottom: 45px;
          margin-top: -16px;
          // position: absolute;
          // left: 50%;
          // margin-left: -100px;
          // bottom: 31px;
          .add {
            width: 200px;
          }
        }
        width: 590px;
        height: 680px;
        padding: 0px;
        .form__block {
          width: 590px;
          padding: 0px;
          margin: 0px;
        }
        .dialog-box__form__group {
          padding-left: 30px;
          padding-top: 20px;
          // height: 670px;
          .noteStyle {
            width: 530px;
            height: 60px;
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
          .whether {
            .spanP {
              margin-left: 10px;
            }
            display: block;
            .el-switch__core {
              width: 50px !important ;
            }
          }
          .el-form-item {
            .el-form-item__label .el-form-item__label {
              padding-bottom: 8px;
            }
            .el-form-item__content {
              border: 1px solid #e5e5e5;
              border-radius: 4px;
            }
            width: 245px;
            // margin-left: 20px;
            margin-right: 30px;
            margin-bottom: 25px;
          }
          .finally {
            width: 530px;
            margin: 0px;
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
        <h5 class="title_type">新增否决原因</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
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
                <el-form-item class="whether" label="是否新增一级编号" prop="delivery">
                  <el-switch
                    @change="whetherNew"
                    v-model="form.delivery"
                    class="common__switch"
                    :width="50"
                  ></el-switch><span class="spanP">{{whetherAdd}}</span>
                </el-form-item>
                <el-form-item v-if="number_s" label="一级编号" prop="number_1">
                  <el-input
                    @change="levelNum"
                    maxlength="10"
                    v-model.trim="form.number_1"
                    placeholder="请输入一级编号"
                  ></el-input>
                </el-form-item>
                <el-form-item v-if="number_x" label="一级编号" prop="number_x">
                  <el-select @change="matchingComp" v-model="form.number_x" placeholder="请选择一级编号">
                    <el-option
                      v-for="item in list_input"
                      :key="item.codeLevelOne"
                      :label="item.codeLevelOne"
                      :value="item.codeLevelOne"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-if="componentClass_" label="一级否决原因" prop="fill_class">
                  <el-input
                    maxlength="20"
                    @change="MatchComplement"
                    v-model.trim="form.fill_class"
                    placeholder="请输入一级否决原因"
                  ></el-input>
                </el-form-item>
                <el-form-item class="user" v-if="componentClass">
                  <label>一级否决原因：</label>
                  <span v-html="aa"></span>
                </el-form-item>
                <el-form-item label="二级编号">
                  <el-input
                    maxlength="10"
                    @change="secondNumber"
                    v-model.trim="form.number_2"
                    placeholder="请输入二级编号"
                  ></el-input>
                </el-form-item>
                <el-form-item label="二级否决原因">
                  <el-input v-model.trim="forReason" placeholder="请输入二级否决原因"></el-input>
                </el-form-item>
                <el-form-item class="whether" label="是否可重报" prop="restated">
                  <el-switch
                    @change="whetherRestated"
                    v-model="form.restated"
                    class="common__switch"
                    :width="50"
                  ></el-switch><span class="spanP">{{whetherRestatement}}</span>
                </el-form-item>
                <el-form-item label="重报时长（单位：天）" prop="heavyTime">
                  <el-input
                    :disabled="disableDuration"
                    v-model.trim="form.heavyTime"
                    placeholder="请输入重报时长"
                  ></el-input>
                </el-form-item>
                <el-form-item label="提示内容" prop="promptContent">
                  <el-select
                    clearable
                    :disabled="disableContent"
                    v-model="form.promptContent"
                    placeholder="请选择提示内容"
                  >
                    <el-option
                      v-for="item in contentsPrompt"
                      :key="item"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input class="noteStyle" v-model.trim="comment" placeholder="请输入备注"></el-input>
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
    <saveChanges v-if="alert_" @clsoe_windowused="close_1"/>
    <whetherSave
      :save_s="save_s"
      v-if="alert_1"
      @clsoe_windowused="close_2"
      @clsoe_windowused_="close_2_"
    />
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import saveChanges from "../../../rule-config/save-changes/"; // 保存修改配置组件
import whetherSave from "../../whetherSave/index"; // 是否保存修改配置组件
import { configApi } from "../../../js/server"; // 接口
import reportValidator from "../../../js/reportRules";
export default {
  data() {
    return {
      whetherAdd: "是", // 提醒是否新增一级编号
      whetherRestatement: "是", // 提醒是否可重报
      disableDuration: false, // 重报时长默认是fasle
      disableContent: false, // 提示内容默认是false
      alert_: false, // 保存修改配置
      alert_1: false, // 是否保存修改配置
      number_s: true, // 一级编号默认为输入框
      number_x: false, // 默认是否新增一级编号为是
      list_input: [], // 一级编号下拉框
      contentsPrompt: [], // 提示内容下拉框数据
      componentClass: false, // 一级否决原因默认为否
      componentClass_: true, // 一级否决原因可输入框默认为是
      aa: "", // 当一级编号为下拉框的时候，补件分类自动代入
      forReason: "", // 二级否决原因
      comment: "", // 备注
      form: {
        delivery: true,
        restated: true, // 是否可重报
        heavyTime: "", // 重报时长
        promptContent: "需邮件咨询", // 提示内容
        number_1: "",
        number_2: "",
        fill_class: "",
        fill_class_x: "",
        number_x: ""
      },
      rules: {
        delivery: [
          {
            required: true,
            message: "请选择是否新增一级编号",
            trigger: "change"
          }
        ],
        restated: [
          {
            required: true,
            message: "请选择是否可重报",
            trigger: "change"
          }
        ],
        number_1: [
          { required: true, message: "请输入一级编号", trigger: "blur" }
        ],
        heavyTime: [
          { required: true, message: "请输入重报时长", trigger: "blur" },
          { validator: reportValidator.nonNegative3, trigger: "blur" }
        ],
        number_x: [
          { required: true, message: "请输入一级编号", trigger: "blur" }
        ],
        fill_class: [
          // { validator: reportValidator.chineseRule, trigger: "blur" },
          { required: true, message: "请输入一级否决原因", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.contentsOfPrompt();
  },
  methods: {
    // 匹配输入的一级否决原因与系统的不能重复
    MatchComplement() {
      for (var i = 0; i < this.for.length; i++) {
        if (this.form.fill_class === this.for[i].titleLevelOne) {
          // this.$error("输入的一级否决原因系统中已经存在");
          this.form.fill_class = "";
        }
      }
    },
    // 匹配输入的二级编号与系统的不能重复
    secondNumber() {
      for (var i = 0; i < this.for.length; i++) {
        if (this.form.number_2 === this.for[i].codeLevelTwo) {
          this.form.number_2 = "";
        }
      }
    },
    // 选择的一级编号自动带入一级否决原因
    matchingComp() {
      for (var i = 0; i < this.list_input.length; i++) {
        if (this.form.number_x === this.list_input[i].codeLevelOne) {
          this.aa = this.list_input[i].titleLevelOne;
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
    // 根据是否重报来确定重报时长和提示内容可不可以编辑
    whetherRestated() {
      if (this.form.restated) {
        this.whetherRestatement = "是";
        this.disableDuration = false;
        this.disableContent = false;
        this.rules.heavyTime[0].required = true;
      } else {
        this.whetherRestatement = "否";
        this.disableDuration = true;
        this.disableContent = true;
        this.rules.heavyTime[0].required = false;
        this.form.heavyTime = "";
        this.form.promptContent = "";
      }
      this.$refs["form"].clearValidate();
    },
    // 根据是否新增一级编号来判断一级编号是输入框还是下拉框
    whetherNew() {
      if (this.form.delivery) {
        this.whetherAdd = "是";
        this.number_s = true;
        this.number_x = false;
        this.componentClass = false;
        this.componentClass_ = true;
        this.$refs["form"].clearValidate();
      } else {
        this.whetherAdd = "否";
        this.number_s = false;
        this.number_x = true;
        this.componentClass = true;
        this.componentClass_ = false;
        let url = `${
          configApi.levelone_effectiveLevelOne
        }/${"reject_reason"}/effectiveLevelOne/list`;
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
      }
    },
    // 提示内容下拉框数据
    contentsOfPrompt() {
      let url = `${configApi.levelone_effect}/${"reject_reason"}/promptContent`;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          console.log(data);
          this.contentsPrompt = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    close() {
      if (
        this.form.number_1 === "" &&
        this.form.number_x === "" &&
        this.form.fill_class === "" &&
        this.form.number_2 === "" &&
        this.forReason === "" &&
        this.form.heavyTime === "" &&
        this.form.promptContent === "需邮件咨询" &&
        this.comment === ""
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
          if (this.form.delivery && this.form.restated) {
            let data = {
              codeLevelOne: this.form.number_1,
              codeLevelTwo: this.form.number_2,
              idLevelTwo: "",
              newLevelOne: true,
              titleLevelOne: this.form.fill_class,
              titleLevelTwo: this.forReason,
              reEnterInd: true, // 是否可重报
              reEnterDays: this.form.heavyTime, // 重报时长
              promptContent: this.form.promptContent, // 提示内容
              remarkTxt: this.comment // 备注
            };
            let url = `${
              configApi.operationConfig_twoLevel
            }/${"reject_reason"}/twoLevel/save`;
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
          } else if (this.form.delivery && this.form.restated === false) {
            let data = {
              codeLevelOne: this.form.number_1,
              codeLevelTwo: this.form.number_2,
              idLevelTwo: "",
              newLevelOne: true,
              titleLevelOne: this.form.fill_class,
              titleLevelTwo: this.forReason,
              reEnterInd: false, // 是否可重报
              // reEnterDays: this.form.heavyTime, // 重报时长
              // promptContent: this.form.promptContent, // 提示内容
              remarkTxt: this.comment // 备注
            };
            let url = `${
              configApi.operationConfig_twoLevel
            }/${"reject_reason"}/twoLevel/save`;
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
          } else if (this.form.delivery === false && this.form.restated) {
            let data = {
              codeLevelOne: this.form.number_x,
              codeLevelTwo: this.form.number_2,
              idLevelTwo: "",
              newLevelOne: false,
              titleLevelOne: this.aa,
              titleLevelTwo: this.forReason,
              reEnterInd: true, // 是否可重报
              reEnterDays: this.form.heavyTime, // 重报时长
              promptContent: this.form.promptContent, // 提示内容
              remarkTxt: this.comment // 备注
            };
            let url = `${
              configApi.operationConfig_twoLevel
            }/${"reject_reason"}/twoLevel/save`;
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
              idLevelTwo: "",
              newLevelOne: false,
              titleLevelOne: this.aa,
              titleLevelTwo: this.forReason,
              reEnterInd: false, // 是否可重报
              // reEnterDays: this.form.heavyTime, // 重报时长
              // promptContent: this.form.promptContent, // 提示内容
              remarkTxt: this.comment // 备注
            };
            let url = `${
              configApi.operationConfig_twoLevel
            }/${"reject_reason"}/twoLevel/save`;
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
    finish() {
      if (this.form.delivery && this.form.restated) {
        this.$refs["form"].validate(valid => {
          if (valid) {
            let data = {
              codeLevelOne: this.form.number_1,
              codeLevelTwo: this.form.number_2,
              idLevelTwo: "",
              newLevelOne: true,
              titleLevelOne: this.form.fill_class,
              titleLevelTwo: this.forReason,
              reEnterInd: true, // 是否可重报
              reEnterDays: this.form.heavyTime, // 重报时长
              promptContent: this.form.promptContent, // 提示内容
              remarkTxt: this.comment // 备注
            };
            let url = `${
              configApi.operationConfig_twoLevel
            }/${"reject_reason"}/twoLevel/save`;
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
      } else if (this.form.delivery && this.form.restated === false) {
        this.$refs["form"].validate(valid => {
          if (valid) {
            let data = {
              codeLevelOne: this.form.number_1,
              codeLevelTwo: this.form.number_2,
              idLevelTwo: "",
              newLevelOne: true,
              titleLevelOne: this.form.fill_class,
              titleLevelTwo: this.forReason,
              reEnterInd: false, // 是否可重报
              // reEnterDays: this.form.heavyTime, // 重报时长
              // promptContent: this.form.promptContent, // 提示内容
              remarkTxt: this.comment // 备注
            };
            let url = `${
              configApi.operationConfig_twoLevel
            }/${"reject_reason"}/twoLevel/save`;
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
      } else if (this.form.delivery === false && this.form.restated) {
        this.$refs["form"].validate(valid => {
          if (valid) {
            let data = {
              codeLevelOne: this.form.number_x,
              codeLevelTwo: this.form.number_2,
              idLevelTwo: "",
              newLevelOne: false,
              titleLevelOne: this.aa,
              titleLevelTwo: this.forReason,
              reEnterInd: true, // 是否可重报
              reEnterDays: this.form.heavyTime, // 重报时长
              promptContent: this.form.promptContent, // 提示内容
              remarkTxt: this.comment // 备注
            };
            let url = `${
              configApi.operationConfig_twoLevel
            }/${"reject_reason"}/twoLevel/save`;
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
      } else {
        this.$refs["form"].validate(valid => {
          if (valid) {
            let data = {
              codeLevelOne: this.form.number_x,
              codeLevelTwo: this.form.number_2,
              idLevelTwo: "",
              newLevelOne: false,
              titleLevelOne: this.aa,
              titleLevelTwo: this.forReason,
              reEnterInd: false, // 是否可重报
              // reEnterDays: this.form.heavyTime, // 重报时长
              // promptContent: this.form.promptContent, // 提示内容
              remarkTxt: this.comment // 备注
            };
            let url = `${
              configApi.operationConfig_twoLevel
            }/${"reject_reason"}/twoLevel/save`;
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
      }
    },
    // 关闭保存修改配置
    close_1() {
      this.alert_ = false;
    },
    // 关闭是否保存修改配置
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
