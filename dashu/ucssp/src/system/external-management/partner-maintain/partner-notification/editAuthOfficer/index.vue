<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 590px;
    height: 660px;
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
          display: block;
          width: 245px;
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
          height: 600px;
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
          .select {
            margin-bottom: 10px;
            span {
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #333333;
              letter-spacing: 0;
              line-height: 22px;
            }
          }
          .uploading {
            display: inline-block;
          }
          .upload-demo {
            width: 100px;
            height: 43px;
            .el-button--primary {
              color: #538bf1;
              background-color: #fff;
              width: 100px;
              height: 40px;
              border: 1px solid #538bf1;
              margin-bottom: 20px;
              // margin-top: 4px;
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
                  label="模板ID"
                  prop="msgTemplate"
                >
                  <el-select
                    class="selectionbar"
                    v-model="form.msgTemplate"
                    placeholder="请选择"
                    :disabled="compareData"
                  >
                    <el-option
                      v-for="item in msgTemplate"
                      :key="item.templateId"
                      :label="item.templateTitle"
                      :value="item.templateId"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="消息类型"
                  prop="msgType"
                >
                  <el-select
                    :disabled="compareData"
                    class="selectionbar"
                    v-model="form.msgType"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.show"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="消息标题"
                  prop="msgTitle"
                  class="uploading"
                >
                  <el-input
                    :disabled="compareData"
                    placeholder="请输入内容"
                    v-model="form.msgTitle"
                    maxlength="20"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="消息内容"
                  prop="msgContent"
                  class="time-quantum"
                >
                  <el-input
                    :disabled="compareData"
                    type="textarea"
                    :rows="2"
                    resize="none"
                    placeholder="请输入内容"
                    v-model="form.msgContent"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="推送时间"
                  prop="pushTime"
                >
                  <el-date-picker
                    :disabled="compareData"
                    type="datetime"
                    placeholder="选择开始推送时间"
                    v-model="form.pushTime"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
                </el-form-item>
                <div class="select">
                  <el-radio
                    v-model="radio"
                    @change="switch1"
                    :label="true"
                  >推送对象</el-radio>
                  <el-radio
                    v-model="radio"
                    @change="switch2"
                    :label="false"
                  >上传名单</el-radio>
                </div>
                <el-form-item v-if="radio">
                  <el-select
                    :disabled="compareData"
                    class="selectionbar"
                    multiple
                    v-model="form.pushObject"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in compnayList"
                      :key="item.companyCode"
                      :label="item.companyName"
                      :value="item.companyCode"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  v-if="!radio"
                  class="uploading"
                >
                  <el-input
                    v-model="contact_num"
                    :disabled="compareData"
                    placeholder="请选择上传文件"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-upload
                  :disabled="compareData"
                    v-if="!radio"
                    class="upload-demo uploading"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    :show-file-list="false"
                    name="importFile"
                    :on-success="handleSuccess"
                    :on-error="beDefeated"
                    :before-upload="beforeAvatarUpload"
                    :action="uploadUrl()"
                    :headers="headers()"
                  >
                    <el-button
                      size="small"
                      type="primary"
                      :disabled="compareData"
                    >点击上传</el-button>
                  </el-upload>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div class="form__bottom">
            <el-button
              :disabled="compareData"
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
import { partnerApi } from "../../../js/server.js"; // 接口
import rules from "../../../../../common/js/rules.js"; // 规则验证
import { token } from "../../../../../common/js/localStorage.js"; // 接口
export default {
  props: ["refer", "options", "compile_data", "compnayList"],
  data() {
    return {
      information: [], // 消息操作下拉内容
      radio: true,
      contact_num: "",
      form: this.compile_data,
      compareData: false,
      pushObjType: "push_onSelect",
      filePath: "",
      msgTemplate: [], // 微信模板ID
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > this.date_interval();
        }
      },
      rules: {
        msgType: [
          { required: true, message: "请选择消息类型", trigger: "change" }
        ],
        msgTitle: [
          { required: true, message: "请填写消息标题", trigger: "change" },
          { validator: rules.chineseChart, trigger: "change" }
        ],
        msgContent: [
          // { validator: reportRules.chineseRule_50, trigger: "change" },
          { required: true, message: "请填写消息内容", trigger: "change" }
        ],
        pushTime: [
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
        msgTemplate: [
          { required: true, message: "请选择模板ID", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 关闭新增页面
    close() {
      this.$emit("clsoe_windowAlert_b");
    },
    // 消息类型
    msgtitle() {
      let url = partnerApi.getTemplateIdList;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          console.log(data);
          this.msgTemplate = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    uploadUrl() {
      // var url = "http://10.20.0.17:9087/dpms/appWeb/pushMsgManagerRef/import";
      var url = partnerApi.pushMsgManagerRef_import;
      return url;
    },
    beDefeated() {
      console.log(2222);
    },
    headers() {
      let header = {
        "DSF-token": token.getToken()
      };
      return header;
    },
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      this.contact_num = "";
      if (file.response.success) {
        this.contact_num = file.name; // 拿到文件名称
        this.fileId = file.response.data.fileId;
        this.filePath = response.data.filePath;
        this.$message({
          message: "上传成功",
          type: "success"
        });
      } else {
        this.$message({
          message: "上传失败,请重新上传",
          type: "error"
        });
      }
    },
    disable() {
      if (this.compile_data.status === "push_success" || "push_fail") {
        this.compareData = true;
      }
    },
    switch1() {
      this.filePath = "";
      this.form.contact_num = "";
      this.pushObjType = "push_onSelect";
    },
    switch2() {
      this.form.pushObject = [];
      this.pushObjType = "upload_name";
    },
    // 下拉框数据查询
    drop_down() {
      if (this.form.pushObject[0] === "upload_name") {
        this.radio = false;
      }
    },
    // 新增保存
    finish(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.form);
          let pushObj = [];
          for (let i = 0; i < this.form.pushObject.length; i++) {
            console.log(this.form.pushObject[i]);
            if (this.form.pushObject[i] === "0000") {
              pushObj.push(this.form.pushObject[i]);
              break;
            } else {
              pushObj = this.form.pushObject;
            }
          }
          let data = {
            id: this.form.id,
            pushObjectList: pushObj, // 推送对象
            msgType: this.form.msgType, // 消息类型
            msgContent: this.form.msgContent, // 消息内容
            pushTime: this.form.pushTime, // 开始推送时间
            msgTitle: this.form.msgTitle, // 消息标题
            filePath: this.filePath,
            pushObjType: this.pushObjType,
            msgNo: this.form.msgNo,
            msgTemplate: this.form.msgTemplate
          };
          // 调取接口
          let url = partnerApi.pushMsgManagerRef_modifyMsg;
          console.log(data);
          this.$MyFetch
            .post(url, data)
            .then((data = {}) => {
              console.log(data);
              this.confirmFn("创建成功", "success");
              this.refer(1);
              this.$emit("clsoe_windowAlert_b");
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
    this.disable();
    this.msgtitle();
  }
};
</script>
