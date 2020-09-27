<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 400px;
    height: 502px;
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
      height: 626px;
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
      height: 626px;
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
      height: 626px;
      overflow-y: auto;
      padding: 0 20px;
      .form__block {
        padding: 20px 30px;
        // margin-bottom: 20px;
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
        height: 626px;
        width: 590px;
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
          padding-top: 12px;
          height: 626px;
          /deep/ .avatar-uploader .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
          }
          /deep/ .avatar-uploader .el-upload:hover {
            border-color: #409eff;
          }
          /deep/ .avatar-uploader-icon {
            font-size: 25px;
            color: #8c939d;
            width: 60px;
            height: 60px;
            line-height: 57px;
            text-align: center;
          }
          /deep/ .avatar {
            width: 60px;
            height: 60px;
            display: block;
          }
          .user {
            margin-bottom: 21px;
            margin-top: 3px;
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
          .el-form-item {
            .el-form-item__label .el-form-item__label {
              padding-bottom: 8px;
            }
            width: 245px;
            // margin-left: 20px;
            margin-right: -14px;
            margin-bottom: 7px;
          }
          .number {
            display: block;
          }
          .investigate {
            width: 340px;
            // height: 100px;
            // margin: 0;
            .el-form-item__content {
              width: 340px;
              // height: 40px;
            }
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
        <h5 class="title_type">编辑</h5>
        <span class="el-icon-close button button__close" @click="close(compareData)"></span>
      </div>
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <el-form
            :model="form"
            ref="form"
            label-width="100px"
            class="demo-form-inline"
            label-position="top"
          >
            <div class="form__block bg__white border__radius-5">
              <div class="dialog-box__form__group">
                <div class="user">
                  <label>机构名称：</label>
                  <span v-html="list_.partnerName"></span>
                </div>
                <div class="user">
                  <label>机构编码：</label>
                  <span v-html="list_.partnerNo"></span>
                </div>
                <el-form-item class="investigate" label="报告类型">
                  <el-select class="investigate" v-model="list_.parseId" placeholder="请选择">
                    <el-option
                      v-for="item in list_bglx"
                      :key="item.roleId"
                      :label="item.roleName"
                      :value="item.roleId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="文件级加密">
                  <el-switch @change="change" v-model="list_.isEncryptBoolean" :width="50"></el-switch>
                  {{message}}
                </el-form-item>
                <el-form-item label="页面风格">
                  <el-color-picker v-model="list_.partnerStyle"></el-color-picker>
                </el-form-item>
                <el-form-item label="logo">
                  <el-upload
                    class="avatar-uploader"
                    :action="URL.uploadImage"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div class="form__bottom">
            <el-button class="add finish" type="primary" :disabled="!compareData" @click="save">确认</el-button>
          </div>
        </div>
      </div>
    </div>
    <toSave :save="save" v-if="saveS" @close_s="close_"/>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import toSave from "../editBlackBox/toSave/index";
import { creditApi } from "../../js/server";
export default {
  data() {
    return {
      saveS: false, // 是否保存编辑的修改默认是false
      res: "", // 上传图片的字段
      message: this.list_.isEncryptBoolean ? "是" : "否",
      URL: creditApi, // 定义接口
      pageStyle: "", // 颜色选择器默认为无色
      imageUrl: `${creditApi.showImage}${"?fileId="}${
        this.list_.logoFileId
      }`,
      list_bglx: [
        { roleId: "001", roleName: "银行标准word" },
        { roleId: "002", roleName: "银行标准html" },
        { roleId: "003", roleName: "个人标准html" }
      ],
      form: {
        delivery: "", // 文件级加密
        bglx: "" // 报告类型
      }
    };
  },
  components: {
    toSave
  },
  methods: {
    // 编辑接口
    save() {
      let data = {
        id: this.list_.partnerNo, // 机构编码
        name: this.list_.partnerName, // 机构名称
        parseId: this.list_.parseId, // 报告类型
        style: this.list_.partnerStyle, // 页面风格
        isEncryptBoolean: this.list_.isEncryptBoolean, // 文件级加密
        logoId: this.res // 上传文件
      };
      let url = creditApi.savePartner;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.confirmFn("修改成功");
          this.refer(1);
          this.$emit("close_s");
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 切换文件级加密显示是和否
    change() {
      if (this.list_.isEncryptBoolean) {
        this.message = "是";
      } else {
        this.message = "否";
      }
    },
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        "image/PNG" ||
        "image/gif" ||
        "image/jpg" ||
        "image/jpG" ||
        "image/jpeg" ||
        "image/GIF";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$error("上传logo图片格式错误!");
      }
      if (!isLt2M) {
        this.$error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      this.res = res.data;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // 关闭是否保存已编辑的修改
    close_() {
      this.saveS = false;
      this.$emit("close_s");
    },
    // 判断误操作
    close(compareData) {
      if (compareData) {
        this.saveS = true;
      } else {
        this.$emit("close_s");
      }
    }
  },
  computed: {
    compareData() {
      var isChange = false;
      if (
        JSON.stringify(this.list_) !== JSON.stringify(this.current_list) ||
        this.imageUrl !==
          `${creditApi.showImage}${"?fileId="}${
            this.list_.logoFileId
          }`
      ) {
        isChange = true;
      }
      return isChange;
    }
  },
  props: ["list_", "current_list", "refer"]
};
</script>
