<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 590px;
    height: 486px;
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
          height: 424px;
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
          /deep/.notice {
            width: 530px;
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
                <el-form-item
                  label="公告标题"
                  class="notice"
                  prop="noticeTitle"
                >
                  <el-input
                    v-model="form.noticeTitle"
                    maxlength="10"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="公告内容"
                  class="time-quantum"
                  prop="noticeContent"
                >
                  <el-input
                    type="textarea"
                    :rows="2"
                    resize="none"
                    placeholder="请输入内容"
                    v-model="form.noticeContent"
                    maxlength="100"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item label="滚动时间">
                  <el-date-picker
                    type="datetime"
                    placeholder="滚动开始时间"
                    v-model="form.startDate"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item class="end_time">
                  <el-date-picker
                    v-model="form.endDate"
                    type="datetime"
                    placeholder="滚动结束时间"
                    style="width: 100%;"
                    value-format="yyyy-MM-dd HH:mm:ss"
                  >
                  </el-date-picker>
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
import { partnerApi } from "../../../../js/server.js"; // 接口
// import reportRules from "../../js/reportRules.js"; // 规则验证
export default {
  props: ["refer", "compile_data"],
  data() {
    return {
      id: "10021",
      alert_: false, // 保存修改配置
      alert_1: false, // 是否保存修改配置
      form: this.compile_data,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > this.date_interval();
        }
      },
      rules: {
        noticeTitle: [
          { required: true, message: "请填写公告标题", trigger: "change" }
        ],
        noticeContent: [
          { required: true, message: "请填写公告内容", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 关闭编辑页面
    close() {
      this.$emit("clsoe_windowAlert_c");
    },
    // 编辑保存
    finish(formName) {
      console.log(this.form);
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            noticeTitle: this.form.noticeTitle, // 公告标题
            noticeContent: this.form.noticeContent, // 公告内容
            startDate: this.form.startDate, // 开始时间
            endDate: this.form.endDate, // 结束时间
            id: this.form.id
          };
          // 调取接口
          let url = partnerApi.notice;
          console.log(data);
          this.$MyFetch
            .put(url, data)
            .then((data = {}) => {
              this.confirmFn("编辑成功", "success");
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
  }
};
</script>
