<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 750px;
    height: 770px;
    border-radius: 4px;
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      letter-spacing: 1.3px;
      // padding-left: 20px;
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
      height: 680px;
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
      height: 680px;
      overflow-y: auto;
      margin: 0 20px;
      padding: 25px 30px;
      // box-shadow: 0 2px 6px 0 #d0d0d0;
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
        // box-shadow: 0 2px 6px 0 #d0d0d0;
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
      position: static;
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
        width: 750px;
        // height: 200px;
        padding: 0px;
        .form__block {
          // width: 750px;
          padding: 0px;
          margin: 0px;
        }
        .dialog-box__form__group {
          padding-left: 30px;
          padding-top: 20px;
          height: 680px;
          .el-form-item {
            .el-form-item__label .el-form-item__label {
              padding-bottom: 8px;
            }
            .el-textarea {
              width: 680px;
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
            width: 88%;
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
/deep/ .ql-snow .ql-picker-label {
  margin-top: -25px !important;
}
/deep/ .ql-snow .ql-picker.ql-expanded .ql-picker-options{
  margin-top: 8px;
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
                  label="公告标题"
                  class="notice"
                  prop="title"
                >
                  <el-input
                    v-model="form.title"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="公告内容"
                  class="notice"
                  prop="summary"
                >
                  <el-input
                    v-model="form.summary"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="文本内容"
                  class="notice"
                  prop="content"
                >
                  <vue-editor id="editor"
                    useCustomImageHandler
                    v-model="form.content"
                    :editor-toolbar="customToolbar">
                  </vue-editor>
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
import { VueEditor } from "vue2-editor";
import { partnerApi } from "../../../../js/server.js"; // 接口
export default {
  props: ["refer"],
  components: {
    VueEditor
  },
  data() {
    return {
      form: {
        title: "", // 公告标题
        summary: "", // 公告内容
        content: ""
      },
      customToolbar: [
        ["bold", "italic", "underline"],
        // [{"header": [false, 1, 2, 3]}],
        [{'align': ''}, {'align': 'center'}, {'align': 'right'}],
        [{'background': []}, {'color': []}],
        [{ list: "ordered" }, { list: "bullet" }]
      ],
      rules: {
        title: [
          // 现在输入长度
          // { validator: reportRules.special_character, trigger: "change" }
          { required: true, message: "请填写公告标题", trigger: "change" }
        ],
        summary: [
          // 现在输入长度
          // { validator: reportRules.special_character, trigger: "change" }
          { required: true, message: "请填写公告内容", trigger: "change" }
        ],
        content: [
          { required: true, message: "请填写文本内容", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 关闭新增页面
    close() {
      this.$emit("clsoe_windowAlert");
    },
    // 新增保存
    finish(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let url = partnerApi.notes;
          this.$MyFetch
            .post(url, this.form)
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
  }
};
</script>
