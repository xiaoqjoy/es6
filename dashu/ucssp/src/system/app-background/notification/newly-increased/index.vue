<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 590px;
    height: 560px;
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
          height: 500px;
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
                  label="消息类型"
                  prop="certificate_type_code"
                >
                  <el-select
                    class="selectionbar"
                    v-model="form.certificate_type_code"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in role"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="推送对象"
                  prop="contact_num"
                  class="uploading"
                >
                  <el-select
                    class="selectionbar"
                    v-model="form.contact_num"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in contact_num"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="消息内容"
                  prop="push_object"
                  class="time-quantum"
                >
                  <el-input
                    type="textarea"
                    :rows="2"
                    resize="none"
                    placeholder="请输入内容"
                    v-model="form.push_object"
                    maxlength="50"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="时间段"
                  prop="value1"
                >
                  <el-date-picker
                    type="datetime"
                    placeholder="选择开始推送时间"
                    v-model="form.value1"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item
                  prop="value2"
                  class="end_time"
                >
                  <el-date-picker
                    v-model="form.value2"
                    type="datetime"
                    placeholder="选择结束推送时间"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item
                  label="消息操作"
                  prop="information"
                >
                  <el-select
                    class="selectionbar"
                    v-model="form.information"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in information"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="链接网址"
                >
                  <el-input v-model="form.website"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div class="form__bottom">
            <el-button
              class="add finish"
              type="primary"
              @click="finish('form',form)"
            >保存</el-button>
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
  props: ["refer"],
  data() {
    return {
      id: "10021",
      alert_: false, // 保存修改配置
      alert_1: false, // 是否保存修改配置
      role: [], // 消息类型下拉内容
      information: [], // 消息操作下拉内容
      contact_num: [], // 推送对象下拉内容
      form: {
        contact_num: "", // 推送对象
        certificate_type_code: "", // 消息类型
        push_object: "", // 消息内容
        value1: "", // 开始推送时间
        value2: "", // 结束推送时间
        information: "", // 消息操作
        website: "" // 链接网址
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > this.date_interval();
        }
      },
      options: [],
      rules: {
        certificate_type_code: [
          { required: true, message: "请选择消息类型", trigger: "change" }
        ],
        contact_num: [
          { required: true, message: "请选择推送对象", trigger: "change" }
        ],
        push_object: [
          // { validator: reportRules.chineseRule_50, trigger: "change" },
          { required: true, message: "请填写消息内容", trigger: "change" }
        ],
        value1: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        value2: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        information: [
          { required: true, message: "请选择消息操作", trigger: "change" }
        ],
        website: [{ validator: reportRules.website, trigger: "change" }]
      }
    };
  },
  methods: {
    // 关闭新增页面
    close() {
      this.$emit("clsoe_windowAlert");
    },
    // 下拉框数据查询
    drop_down() {
      let data = {
        confType: "dict"
      };
      let url = configApi.config_init;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          // 消息类型下拉内容
          for (let i = 0; i < data.dict.select_app_message_type.length; i++) {
            this.role.push({
              value: data.dict.select_app_message_type[i].value,
              label: data.dict.select_app_message_type[i].show
            });
          }
          // 推送对象下拉内容
          for (let i = 0; i < data.dict.select_app_message_object.length; i++) {
            this.contact_num.push({
              value: data.dict.select_app_message_object[i].value,
              label: data.dict.select_app_message_object[i].show
            });
          }
          // 消息操作下拉内容
          for (let i = 0; i < data.dict.select_app_message_handle.length; i++) {
            this.information.push({
              value: data.dict.select_app_message_handle[i].value,
              label: data.dict.select_app_message_handle[i].show
            });
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 新增保存
    finish(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            messageType: this.form.certificate_type_code, // 消息类型
            messageContent: this.form.push_object, // 消息内容
            messageOperate: this.form.information, // 消息操作
            pushObject: this.form.contact_num, // 推送对象
            timeSectionStartDttm: this.form.value1, // 开始推送时间
            timeSectionEndDttm: this.form.value2, // 结束推送时间
            url: this.form.website
          };
          // 调取接口
          let url = configApi.appMessage_save;
          console.log(data);
          this.$MyFetch
            .post(url, data)
            .then((data = {}) => {
              this.confirmFn("创建成功", "success");
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
  },
  mounted() {
    this.drop_down();
  }
};
</script>
