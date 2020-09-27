<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 400px;
    height: 548px;
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
          // .formatTips {
          //   color: #666;
          //   font-size: 5px;
          // }
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
            margin-bottom: 20px;
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
        <h5 class="title_type">新增</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
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
                <el-form-item class="investigate" label="机构名称" prop="jgmc">
                  <el-select
                    class="investigate"
                    @change="matchingComp"
                    v-model="form.jgmc"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in list_jgmc"
                      :key="item.codeValue"
                      :label="item.codeText"
                      :value="item.codeText"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <div class="user">
                  <label>机构编码：</label>
                  <span v-html="form.code"></span>
                </div>
                <el-form-item class="investigate" label="报告类型">
                  <el-select class="investigate" v-model="form.bglx" placeholder="请选择">
                    <el-option
                      v-for="item in list_bglx"
                      :key="item.roleId"
                      :label="item.roleName"
                      :value="item.roleId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="文件级加密">
                  <el-switch @change="change" v-model="form.delivery" :width="50"></el-switch>
                  {{message}}
                </el-form-item>
                <el-form-item label="页面风格">
                  <el-color-picker v-model="pageStyle"></el-color-picker>
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
                  <!-- <span class="formatTips">限制图片宽高最大为60px*60px</span> -->
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div class="form__bottom">
            <el-button class="add finish" type="primary" @click="increased">确认</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { creditApi } from "../../js/server"; // 接口
export default {
  data() {
    return {
      URL: creditApi,
      for: [], // 所有机构名称列表
      res: "", // 上传图片的字段
      pageStyle: "", // 颜色选择器默认为红色
      message: "是", // 文件级加密默认为是
      imageUrl: "",
      list_jgmc: [], // 机构名称
      list_bglx: [
        { roleId: "001", roleName: "银行标准word" },
        { roleId: "002", roleName: "银行标准html" },
        { roleId: "003", roleName: "个人标准html" }
      ],
      form: {
        code: "", // 机构编码
        delivery: true, // 文件级加密
        bglx: "", // 报告类型
        jgmc: "" // 机构名称
      },
      rules: {
        jgmc: [{ required: true, message: "请选择机构名称", trigger: "change" }]
      }
    };
  },
  methods: {
    // 查询所有列表数据接口
    referS() {
      let url = creditApi.partnerBbm;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          console.log(data);
          this.for = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 选择机构名称自动带入机构编码
    matchingComp() {
      for (var i = 0; i < this.list_jgmc.length; i++) {
        if (this.form.jgmc === this.list_jgmc[i].codeText) {
          this.form.code = this.list_jgmc[i].codeValue;
        }
      }
      for (var K = 0; K < this.for.length; K++) {
        if (this.form.code === this.for[K].partnerNo) {
          this.form.jgmc = "";
          this.confirmFn("选择的机构名称系统中已经有了");
        }
      }
    },
    // 机构名称接口
    zationCode() {
      let url = creditApi.partner;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          console.log(data);
          this.list_jgmc = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 新增接口
    increased() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let data = {
            id: this.form.code, // 机构编码
            name: this.form.jgmc, // 机构名称
            parseId: this.form.bglx, // 报告类型
            style: this.pageStyle, // 页面风格
            isEncryptBoolean: this.form.delivery, // 文件级加密
            logoId: this.res // 上传文件
          };
          let url = creditApi.savePartner;
          this.$MyFetch
            .post(url, data)
            .then((data = {}) => {
              console.log(data);
              this.confirmFn("新增成功");
              this.refer(1);
              this.$emit("close_s");
            })
            .catch(err => {
              this.$error(err.message);
            });
        }
      });
    },
    // 切换文件级加密显示是和否
    change() {
      if (this.message === "是") {
        this.message = "否";
      } else {
        this.message = "是";
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
        this.$error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleAvatarSuccess(res, file) {
      console.log(res, file);
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res);
      this.res = res.data;
    },
    close() {
      this.$emit("close_s");
    }
  },
  props: ["refer"],
  created() {
    this.zationCode();
    this.referS();
  }
};
</script>
