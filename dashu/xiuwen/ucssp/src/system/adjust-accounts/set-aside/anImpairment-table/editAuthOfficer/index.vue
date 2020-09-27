<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 590px;
    height: 370px;
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
    // 内容输入框整体样式
    .complete-product {
      .dialog-box__middle-form {
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
          height: 566px;
          .el-form-item {
            .el-form-item__label .el-form-item__label {
              padding-bottom: 8px;
            }
            .el-textarea {
              width: 530px;
              height: 100px;
              /deep/ .el-textarea__inner {
                height: 100px;
                width: 525px;
              }
            }
            width: 245px;
            margin-right: 30px;
            margin-bottom: 20px;
          }
          .time-quantum {
            display: block;
          }
          .end_time {
            margin-top: 27px;
          }
          .uploading {
            display: inline-block;
          }
          .title {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #666;
            margin-bottom: 20px;
            div {
              margin-bottom: 10px;
            }
            .maintain {
              margin-left: 40px;
            }
            .black {
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #151515;
              line-height: 17px;
            }
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
        <h5 class="title_type">编辑</h5>
        <span
          class="el-icon-close button button__close"
          @click="close"
        ></span>
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
                <div class="title">
                  <div><span>贷款分类级别： <span
                        v-if="form.loanLevelDesc !== 'null'"
                        class="black"
                      >{{form.loanLevelDesc}}</span></span>
                      <span class="maintain">维护人：<span v-if="form.updatedBy !== 'null'" class="black">{{form.updatedBy}}</span></span>
                      <span class="maintain">维护日期：<span class="black">{{this.date}}</span></span></div>
                </div>
                  <el-form-item label="本息迁徙率（%）" prop="prinIntMigrationrate">
                    <el-input v-model="form.prinIntMigrationrate" :disabled="compareData" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="本息费迁徙率（%）" prop="prinIntFeeMigrationrate">
                    <el-input v-model="form.prinIntFeeMigrationrate" :disabled="compareData" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="本息损失率（%）" prop="prinIntLossRate">
                    <el-input v-model="form.prinIntLossRate" :disabled="compareData" placeholder="请输入"></el-input>
                  </el-form-item>
                  <el-form-item label="本息费损失率（%）" prop="prinIntFeeLossRate">
                    <el-input v-model="form.prinIntFeeLossRate" :disabled="compareData" placeholder="请输入"></el-input>
                  </el-form-item>
              </div>
            </div>
          </el-form>
          <div class="form__bottom">
            <el-button
              :disabled="compareData"
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
import { checkingApi } from "../../../js/server.js"; // 接口
import rules from "../../../../../common/js/rules.js"; // 规则验证
export default {
  props: ["refer", "compile_data"],
  data() {
    return {
      id: "10021",
      alert_: false, // 保存修改配置
      alert_1: false, // 是否保存修改配置
      userName: "", // 维护人员
      srcUmName: [],
      compareData: false,
      date: "",
      form: {
            // effectiveDt: this.compile_data.effectiveDt, // 生效日期
            loanLevelDesc: this.compile_data.loanLevelDesc, // 贷款级别描述
            prinIntFeeLossRate: this.compile_data.prinIntFeeLossRate, // 本息费损失率
            prinIntFeeMigrationrate: this.compile_data.prinIntFeeMigrationrate, // 本息费迁徙率
            prinIntLossRate: this.compile_data.prinIntLossRate, // 本息损失率
            prinIntMigrationrate: this.compile_data.prinIntMigrationrate, // 本息迁徙率
            privisionConfigId: this.compile_data.privisionConfigId // 主键ID
      },
      rules: {
        prinIntMigrationrate: [
          { required: true, message: "请填写本息迁徙率", trigger: "change" },
          { validator: rules.percentTwoBitRule, trigger: "change" }
        ],
        prinIntFeeMigrationrate: [
          { required: true, message: "请填写本息费迁徙率", trigger: "change" },
          { validator: rules.percentTwoBitRule, trigger: "change" }
          ],
        prinIntLossRate: [
          { validator: rules.percentTwoBitRule, trigger: "change" },
          { required: true, message: "请填写本息损失率", trigger: "change" }
        ],
        prinIntFeeLossRate: [
          { required: true, message: "请填写本息费损失率", trigger: "change" },
          { validator: rules.percentTwoBitRule, trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 关闭新增页面
    close() {
      this.$emit("clsoe_windowAlert_b");
    },
    // 获取当前时间
    getNowFormatDate() {
      var date = new Date();
      var seperator1 = "/";
      // var seperator2 = ":";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate =
        year +
        seperator1 +
        month +
        seperator1 +
        strDate;
        // " " +
        // date.getHours() +
        // seperator2 +
        // date.getMinutes() +
        // seperator2 +
        // date.getSeconds();
      this.date = currentdate;
    },
    // 新增保存
    finish(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
          //   effectiveDt: this.form.effectiveDt, // 生效日期
            // loanLevelDesc: this.form.loanLevelDesc, // 贷款级别描述
            prinIntFeeLossRate: this.form.prinIntFeeLossRate, // 本息费损失率
            prinIntFeeMigrationrate: this.form.prinIntFeeMigrationrate, // 本息费迁徙率
            prinIntLossRate: this.form.prinIntLossRate, // 本息损失率
            prinIntMigrationrate: this.form.prinIntMigrationrate, // 本息迁徙率
            privisionConfigId: this.form.privisionConfigId // 主键ID
          };
          // 调取接口
          let url = checkingApi.privisionConfig_update;
          console.log(data);
          this.$MyFetch
            .post(url, data)
            .then((data = {}) => {
              this.confirmFn("编辑成功", "success");
              this.close();
              this.refer(1);
            })
            .catch(err => {
              this.$error(err.message);
            });
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    this.getNowFormatDate();
  }
};
</script>
