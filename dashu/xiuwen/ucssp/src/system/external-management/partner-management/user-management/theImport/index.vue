<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 580px;
    height: 258px;
    background: #fff;
    .title_type {
      width: 580px;
      height: 60px;
      text-align: center;
      span {
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #333333;
        letter-spacing: 1.38px;
        text-align: center;
        font-weight: 900;
      }
    }
    .mgtop {
      margin-top: 20px;
    }
    .el-form-item {
      width: 28%;
      margin-right: 40px;
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
    .uploading {
      width: 400px;
      height: 65px;
      margin-top: 32px;
      margin-left: 30px;
      display: inline-block;
      .text {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #333333;
        letter-spacing: 1.09px;
        margin-bottom: 8px;
      }
    }
    .upload-demo {
      width: 100px;
      height: 40px;
      margin-top: 46px;
      margin-left: 20px;
      .el-button {
        width: 100px;
        height: 40px;
        border: 1px solid #538bf1;
        background: #fff;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #538bf1;
        letter-spacing: 1.07px;
        text-align: center;
      }
      .confirm {
        position: absolute;
        width: 200px;
        height: 40px;
        background: #538bf1;
        border-radius: 4px;
        left: 190px;
        bottom: 30px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 1.07px;
        text-align: center;
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
        <div class="title_type"><span>导入</span></div>
        <span
          class="el-icon-close button button__close"
          @click="close"
        ></span>
      </div>
      <div class="uploading">
        <div class="text">上传附件</div>
        <el-input
          :disabled="true"
          v-model="contact_num"
        ></el-input>
      </div>
      <el-upload
        class="upload-demo uploading"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        :show-file-list="false"
        name="importFile"
        ref="upload"
        :auto-upload="false"
        :on-success="handleSuccess"
        :on-error="beDefeated"
        :on-change="beforeAvatarUpload"
        :action="uploadUrl()"
        :headers="headers()"
      >
        <el-button
          slot="trigger"
          size="small"
          type="primary"
        >点击上传</el-button>
        <el-button
          class="confirm"
          size="small"
          type="success"
          @click="submitUpload"
        >确认</el-button>
      </el-upload>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { partnerApi } from "../../../js/server.js"; // 接口
import { token } from "../../../../../common/js/localStorage.js"; // 接口
export default {
  props: ["refer"],
  data() {
    return {
      contact_num: ""
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    beforeAvatarUpload(file, fileList) {
      console.log(file, fileList);
      this.contact_num = "";
      this.contact_num = file.name; // 拿到文件名称
      const isPDF =
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        "application/vnd.ms-excel";
      if (!isPDF) {
        this.$error("上传文件只能是 pdf 格式!");
        this.contact_num = "";
      }
      return isPDF;
    },
    uploadUrl() {
       var url = partnerApi.userImportRef_import;
      return url;
    },
    headers() {
      let header = {
        "DSF-token": token.getToken()
      };
      return header;
    },
    beDefeated() {
      console.log(2222);
    },
    handleSuccess(response, file, fileList) {
      console.log(response, file, fileList);
      if (file.response.success) {
         this.$alert('导入完成，请返回查看导入结果', '标题名称', {
          confirmButtonText: '确定',
          center: true
        });
        this.close();
      } else {
        this.$message({
          message: response.message,
          type: "error"
        });
      }
    },
    close() {
      this.$emit("clsoe_windowAlert");
    }
  }
};
</script>
