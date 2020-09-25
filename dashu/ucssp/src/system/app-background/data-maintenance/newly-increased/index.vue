<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 520px;
    height: 330px;
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
    .complete-product {
      .dialog-box__middle-form {
        height: 270px;
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
          height: 270px;
          .el-form-item {
            .el-form-item__label .el-form-item__label {
              padding-bottom: 8px;
            }
            width: 245px;
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
                  label="产品名称"
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
                  label="收还款操作指引"
                  prop="contact_num"
                  class="uploading"
                >
                  <el-input v-model="form.contact_num"></el-input>
                </el-form-item>
                <el-upload
                  class="upload-demo uploading"
                  accept="application/pdf"
                  :show-file-list="false"
                  name="uploadFile"
                  :on-success="handleSuccess"
                  :on-error="beDefeated"
                  :before-upload="beforeAvatarUpload"
                  :action="uploadUrl()"
                  :headers="headers()"
                >
                  <el-button
                    size="small"
                    type="primary"
                  >点击上传</el-button>
                </el-upload>
              </div>
            </div>
          </el-form>
          <div class="form__bottom">
            <el-button
              class="add finish"
              type="primary"
              @click="finish('form')"
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
// import { token } from "../../../../common/js/localStorage.js"; // 接口
export default {
  props: ["refer"],
  data() {
    return {
      id: "10021",
      alert_: false, // 保存修改配置
      alert_1: false, // 是否保存修改配置
      role: [], // 产品名称数据
      fileId: "", // 上传文件后反回的值
      form: {
        class: "category",
        contact_num: "", // 收还款操作指引
        certificate_type_code: "" // 产品名称
      },
      options: [],
      rules: {
        certificate_type_code: [
          { required: true, message: "请选择产品名称", trigger: "change" }
        ],
        contact_num: [
          { required: true, message: "请填写收还款操作指引", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    close() {
      this.$emit("clsoe_windowAlert");
    },
    // 上传图片请求头
    // headers() {
    //   let header = {
    //     "DSF-token": token.getToken()
    //   };
    //   return header;
    // },
    beforeAvatarUpload(file) {
      const isPDF = file.type === "application/pdf";
      if (!isPDF) {
        this.$error("上传文件只能是 pdf 格式!");
        this.form.contact_num = "";
      }
      return isPDF;
    },
    // 查询产品名称
    product_name() {
      let url = configApi.repaymentOperationGuide_getProductList;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          for (let i = 0; i < data.length; i++) {
            this.role.push({
              label: data[i].productName,
              value: data[i].productId
            });
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    uploadUrl() {
      let url = window.location.href.split("/");
      let uploadurl = "";
      // let uploadurl = "http://10.21.0.13:8113/ftb/v1/simple-upload";
      for (let i = 0; i < url.length; i++) {
        uploadurl =
          url[0].toString() +
          "//" +
          url[2].toString() +
          "/ftb/api/ftb/v1/simple-upload";
      }
      return uploadurl;
    },
    // 上传图片请求头
    headers() {
      let header = {
        "X-REQ-NAME": "laapp"
      };
      return header;
    },
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      this.form.contact_num = "";
      if (file.response.success) {
        this.form.contact_num = file.name; // 拿到文件名称
        this.fileId = file.response.data.fileId;
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
    beDefeated() {
      console.log(2222);
    },
    // 新增保存
    finish(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 取到产品名称对应的文字
          let productName = this.role[this.role.findIndex(i => i.value === this.form.certificate_type_code)].label;
          let data = {
            productName: productName,
            productId: this.form.certificate_type_code,
            operationGuideName: this.form.contact_num,
            fileId: this.fileId
          };
          // 调取接口
          let url = configApi.repaymentOperationGuide_save;
          console.log(data);
          this.$MyFetch
            .post(url, data)
            .then((data = {}) => {
              this.confirmFn("保存成功", "success");
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
    this.product_name(); // 获取产品名称数据
  }
};
</script>
