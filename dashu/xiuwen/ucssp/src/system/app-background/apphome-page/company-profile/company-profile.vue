<template>
  <div>
    <div class="content">
      <div class="brief-box">
        <el-form
          :model="form"
          :rules="rules"
          ref="form"
          label-width="100px"
          class="demo-form-inline"
          label-position="top"
        >
          <el-form-item
            label="文本内容"
            prop="content_text"
            class="uploading"
          >
            <el-input
              placeholder="请输入内容"
              v-model="form.content_text"
              type="textarea"
            resize="none"
            clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="标题"
            prop="company_text"
            class="uploading"
          >
            <el-input
              placeholder="请输入内容"
              :disabled="title"
              v-model="form.company_text"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item
            label="文本图片"
            prop="headline"
            class="uploading"
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
          </el-form-item>
          <el-form-item
            label="链接网址"
            class="uploading"
          >
            <el-input
              v-model="form.input"
              class="website"
              placeholder="请输入内容"
              clearable
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            @click="finish('form')"
          >保存</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import "@common/css/dialog";
import reportRules from "../../js/reportRules.js"; // 规则验证
import { configApi } from "../../js/server.js"; // 接口
export default {
  data() {
    return {
      form: {
        company_text: "", // 标题
        input: "", // 链接网址
        content_text: "" // 文字内容
      },
      imageUrl: "", // 上传成功后显示的图片
      title: true,
      uploadUrl: "",
      rules: {
        company_text: [
          { required: true, message: "请填写文本内容", trigger: "change" }
        ],
        input: [
          { required: true, message: "请填写链接网址", trigger: "change" }
        ],
        content_text: [
          // 验证是否是500以内的汉字
          { validator: reportRules.chineseRule_500, trigger: "change" },
          { required: true, message: "请填写文本内容", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 文本图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 上传图片请求头
    headers() {
      let header = {
        "X-REQ-NAME": "laapp"
      };
      return header;
    },
    // 上传成功后的钩子
    handleAvatarSuccess(response, file, fileList) {
      this.imageUrl = response.data.fileUrl;
      this.$message({
        message: "上传成功",
        type: "success"
      });
    },
    uploadurl() {
      // this.uploadUrl = "https://mloan.dashuf.com/ftb/api/ftb/v1/simple-upload";
      let url = window.location.href.split("/");
      for (let i = 0; i < url.length; i++) {
        this.uploadUrl =
          url[0].toString() +
          "//" +
          url[2].toString() +
          "/ftb/api/ftb/v1/simple-upload";
      }
    },
    // 上传失败后的钩子
    beDefeated() {
      this.$error("上传失败请重新上传");
    },
    // 上传前验证上传文件的格式
    beforeAvatarUpload(file) {
      // 判断图片格式
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      // 判断图片大小
      const isLt2M = (file.size / 500 / 1024) <= 1;
      if (!isJPG) {
        this.$error("上传图片格式是 JPG/png ");
        return isJPG;
      }
      if (!isLt2M) {
        this.$error("上传的图片不大于500K!");
      }
      return isJPG && isLt2M;
    },
    // 查询
    refer() {
      let url = configApi.banner_list;
      this.$MyFetch
        .post(url)
        .then((data = {}) => {
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            // 判断获取公司简介数据
            if (data[i].bannerType === "company_profile") {
              this.form.company_text = data[i].bannerTitle;
              this.form.input = data[i].websiteUrl;
              this.imageUrl = data[i].bannerImgUrl;
              this.form.content_text = data[i].bannerContent;
            }
          }
          console.log(this.form.content_text);
          if (this.form.content_text === "") {
            this.title = false;
          } else {
            this.title = true;
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 保存
    finish(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            bannerTitle: this.form.company_text, // 文字标题
            bannerContent: this.form.content_text, // 文字内容
            bannerImgUrl: this.imageUrl, // 文本图片
            websiteUrl: this.form.input, // 链接网址
            bannerType: "company_profile"
          };
          // 调取接口
          let url = configApi.banner_save;
          console.log(data);
          this.$MyFetch
            .post(url, data)
            .then((data = {}) => {
              this.confirmFn("公司简介新增成功", "success");
              this.refer(); // 保存后刷新页面
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
    this.refer(); // 页面打开查询数据
    this.uploadurl();
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
/deep/ .el-tabs__nav-wrap {
  -webkit-box-shadow: 1px 2px 20px #ccc;
  box-shadow: 1px 2px 20px #ccc;
  padding-left: 30px;
  padding-top: 10px;
  border-radius: 4px;
}
/deep/ .el-tabs__nav-wrap .el-tabs__item.is-active {
  font-family: PingFangSC-Semibold;
  font-size: 18px;
  color: #538bf1;
  letter-spacing: 1.38px;
}
/deep/ .el-tabs__nav-wrap .el-tabs__item.is-active .el-tabs__item {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #333333;
  letter-spacing: 1.22px;
  text-align: center;
}
// 中间部分
.content {
  height: 794px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  overflow: hidden;
  .brief-box {
    margin: 20px 30px;
    position: relative;
    height: 760px;
    // 去掉element表格的默认全选按钮
    .tables /deep/ th .el-checkbox {
      display: none;
    }
    .text {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #bbbbbb;
      letter-spacing: 1.09px;
      margin-top: 20px;
      margin-bottom: 8px;
    }
    // 文字输入框样式
    .el-textarea {
      width: 1140px;
      height: 180px;
      // margin-bottom: 20px;
      /deep/ .el-textarea__inner {
        width: 1140px;
        height: 180px;
      }
    }
    // 文本图片样式
    /deep/ .el-upload--picture-card {
      width: 245px;
      height: 150px;
      border: 1px solid #ebebeb;
    }
    .el-input {
      width: 245px;
      height: 40px;
    }
    .website {
      width: 490px;
    }
    .el-button {
      background: #538BF1;
      position: absolute;
      left: 50%;
      bottom: 30px;
      width: 200px;
      height: 40px;
      margin-left: -100px;
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
  width: 245px;
  height: 150px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  // width: 245px;
  height: 150px;
  display: block;
}
</style>
