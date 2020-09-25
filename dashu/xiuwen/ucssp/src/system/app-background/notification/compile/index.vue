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
        <h5 class="title_type">编辑</h5>
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
                  prop="messageType"
                >
                  <el-select
                    class="selectionbar"
                    v-model="form.messageType"
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
                  prop="pushObject"
                  class="uploading"
                >
                  <el-select
                    class="selectionbar"
                    v-model="form.pushObject"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in pushObject"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="消息内容"
                  prop="messageContent"
                  class="time-quantum"
                >
                  <el-input
                    type="textarea"
                    :rows="2"
                    resize="none"
                    placeholder="请输入内容"
                    maxlength="50"
                    v-model="form.messageContent"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="时间段"
                  prop="timeSectionStartDttm"
                >
                  <el-date-picker
                    type="datetime"
                    v-model="form.timeSectionStartDttm"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item
                  prop="timeSectionEndDttm"
                  class="end_time"
                >
                  <el-date-picker
                    v-model="form.timeSectionEndDttm"
                    type="datetime"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  >
                  </el-date-picker>
                </el-form-item>
                <el-form-item
                  label="消息操作"
                  prop="messageOperate"
                >
                  <el-select
                    class="selectionbar"
                    v-model="form.messageOperate"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in messageOperate"
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
                  <el-input v-model="form.url"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div class="form__bottom">
            <el-button
              class="add finish"
              type="primary"
              :disabled="!compareData"
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
  props: ["refer", "compile_data"],
  data() {
    return {
      id: "10021",
      alert_: false, // 保存修改配置
      alert_1: false, // 是否保存修改配置
      role: [], // 消息类型下拉内容
      messageOperate: [], // 消息操作下拉内容
      pushObject: [], // 推送对象下拉内容
      compareData: false, // 保存按钮默认置灰
      form: {},
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > this.date_interval();
        }
      },
      options: [],
      rules: {
        messageType: [
          { required: true, message: "请选择消息类型", trigger: "change" }
        ],
        pushObject: [
          { required: true, message: "请选择推送对象", trigger: "change" }
        ],
        messageContent: [
          // { validator: reportRules.chineseRule_50, trigger: "change" },
          { required: true, message: "请填写消息内容", trigger: "change" }
        ],
        timeSectionStartDttm: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        timeSectionEndDttm: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        messageOperate: [
          { required: true, message: "请选择消息操作", trigger: "change" }
        ],
        website: [{ validator: reportRules.strRegex, trigger: "change" }]
      }
    };
  },
  methods: {
    // 关闭新增页面
    close() {
      this.$emit("clsoe_windowAlert_c");
      this.refer(1);
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
            this.pushObject.push({
              value: data.dict.select_app_message_object[i].value,
              label: data.dict.select_app_message_object[i].show
            });
          }
          // 消息操作下拉内容
          for (let i = 0; i < data.dict.select_app_message_handle.length; i++) {
            this.messageOperate.push({
              value: data.dict.select_app_message_handle[i].value,
              label: data.dict.select_app_message_handle[i].show
            });
          }
          this.form = this.compile_data;
          this.form.messageType = this.role[this.role.findIndex(index => index.label === this.form.messageType)].value;
          this.form.pushObject = this.pushObject[this.pushObject.findIndex(index => index.label === this.form.pushObject)].value;
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
            id: this.compile_data.id,
            messageType: this.form.messageType, // 消息类型
            messageContent: this.form.messageContent, // 消息内容
            messageOperate: this.form.messageOperate, // 消息操作
            pushObject: this.form.pushObject, // 推送对象
            timeSectionStartDttm: this.form.timeSectionStartDttm, // 开始推送时间
            timeSectionEndDttm: this.form.timeSectionEndDttm, // 结束推送时间
            url: this.form.url
          };
          // 调取接口
          let url = configApi.appMessage_update;
          console.log(data);
          this.$MyFetch
            .post(url, data)
            .then((data = {}) => {
              this.confirmFn("创建成功", "success");
              this.refer(1);
              this.$emit("clsoe_windowAlert_c");
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
  watch: {
    form: {
      // 这监听对象值的改变 和上面的不一样。
      handler(curVal, curVal1) {
        if (curVal !== curVal1) {
          this.compareData = false;
          // this.alert_1 = false;
        } else {
          this.compareData = true;
          // console.log("失败");
        }
      },
      deep: true
    }
  },
  mounted() {
    this.drop_down();
  }
};
</script>
