<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 394px;
    height: 594px;
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
      width: 334px;
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
        .form__bottom {
          position: absolute;
          left: 50%;
          margin-left: -100px;
          bottom: 30px;
          .add {
            width: 200px;
          }
        }
        width: 394px;
        // height: 200px;
        padding: 0px;
        .form__block {
          width: 394px;
          padding: 0px;
          margin: 0px;
        }
        .dialog-box__form__group {
          padding-left: 30px;
          padding-top: 20px;
          height: 534px;
          .el-form-item {
            .el-form-item__label .el-form-item__label {
              padding-bottom: 8px;
            }
            /deep/ .el-form-item__content {
              line-height: 20px;
            }
            width: 334px;
            // margin-left: 20px;
            margin-right: 30px;
            margin-bottom: 20px;
            display: block;
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
          .require {
            font-family: PingFang-SC-Regular;
            font-size: 12px;
            color: #bbbbbb;
            letter-spacing: -0.29px;
          }
        }
      }
    }
  }
}
// Element上传样式
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  width: 334px;
  height: 188px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  // width: 245px;
  height: 188px;
  display: block;
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
                  label="海报"
                >
                  <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    name="uploadFile"
                    :headers="headers()"
                    :on-error="beDefeated"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img
                      v-if="imageUrl"
                      :src="imageUrl"
                      class="avatar"
                    >
                    <i
                      v-else
                      class="el-icon-plus avatar-uploader-icon"
                    ></i>
                  </el-upload>
                  <span class="require">要求：格式为jpg、png，分辨大小为750*420px</span>
                </el-form-item>
                <el-form-item
                  label="海报标题"
                  prop="title"
                  class="uploading"
                >
                  <el-input
                    v-model="form.title"
                    maxlength="20"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="海报网址"
                  class="uploading"
                  prop="webSite"
                >
                  <el-input v-model="form.webSite"></el-input>
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
    <stateOfPreservation
      :savea="form"
      :finish="finish"
      v-if="alert_1"
      @clsoe_windowused='close_2'
      @clsoe_windowused_a='close_3'
    />
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { partnerApi } from "../../../../js/server.js"; // 接口
import rules from "../../../../../../common/js/rules.js"; // 规则验证
export default {
  props: ["refer", "compile_data", "uploadUrl"],
  data() {
    return {
      id: "10021",
      alert_: false, // 保存修改配置
      alert_1: false, // 是否保存修改配置
      imageUrl: this.compile_data.imgUrl,
      form: this.compile_data,
      rules: {
        title: [
          // 现在输入长度
          // { validator: reportRules.special_character, trigger: "change" }
          { required: true, message: "请填写海报标题", trigger: "change" }
        ],
        imageUrl: [
          // 现在输入长度
          // { validator: reportRules.special_character, trigger: "change" }
          { required: true, message: "请填写海报标题", trigger: "change" }
        ],
        webSite: [{ validator: rules.website, trigger: "change" }]
      }
    };
  },
  methods: {
    close() {
      this.$emit("clsoe_windowAlert_b");
    },
    // 上传图片请求头
    headers() {
      let header = {
        "X-REQ-NAME": "111"
      };
      return header;
    },
    // 文件上传成功时的钩子
    handleAvatarSuccess(response, file, fileList) {
      this.imageUrl = response.data.fileUrl;
      this.$message({
        message: "上传成功",
        type: "success"
      });
    },
    beDefeated() {
      this.$error("上传失败请重新上传");
    },
    beforeAvatarUpload(file) {
      console.log(file);
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      // const isLt2M = file.size / 500 / 1024 <= 1;
      if (!isJPG) {
        this.$error("上传图片格式是 JPG/png ");
        return isJPG;
      }
      const isSize = new Promise(function(resolve, reject) {
        let width = 750;
        let height = 420;
        let _URL = window.URL || window.webkitURL;
        let img = new Image();
        img.onload = function() {
          let valid = img.width === width && img.height === height;
          console.log(valid);
          valid ? resolve() : reject(new Error("asjdka"));
        };
        img.src = _URL.createObjectURL(file);
      }).then(
        () => {
          return file;
        },
        () => {
          this.$error("上传的图片分辨大小必须为750*420px!");
          return Promise.reject(new Error("asjdka"));
        }
      );
      return isJPG && isSize;
    },
    // 保存按钮
    finish(formName) {
      if (this.imageUrl) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            let data = {
              id: this.form.id,
              title: this.form.title,
              imgUrl: this.imageUrl,
              webSite: this.form.webSite
            };
            // 调取接口
            let url = partnerApi.poster;
            console.log(data);
            this.$MyFetch
              .put(url, data)
              .then((data = {}) => {
                this.confirmFn("保存成功", "success");
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
      } else {
        this.$error("请上传图片");
      }
    }
  }
};
</script>
