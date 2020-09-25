<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 540px;
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: bold;
    }
    .dialog-box__middle-form {
      height: auto;
      overflow-y: auto;
      padding: 0 20px;
      .form__bottom {
        padding-bottom: 0;
        text-align: center;
        margin-top: 10px;
      }
    }
    .dial_cent a {
      text-decoration: none;
      font-size: 14px;
      color: #538bf1;
      cursor: pointer;
    }
    .dial_cent {
      overflow: hidden;
      position: relative;
    }
    .dial_cent > input {
      border: 1px solid #d0d0d0;
      border-radius: 4px;
    }
    .text {
      border: 1px solid #d0d0d0;
      border-radius: 4px;
      width: 400px;
      height: 36px;
      background: #fff;
    }
    .file {
      opacity: 0.01;
      position: absolute;
      cursor: pointer;
      height: 100%;
      font-size: 0;
      width: 70px;
    }
    .upload_tips {
      padding-bottom: 8px;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #bbbbbb;
      letter-spacing: 1.09px;
    }
  }
  .import_info {
    > div > p {
      line-height: 20px;
    }
  }
  .title {
    color: #666;
  }
  .content {
    color: #000;
    letter-spacing: 0.86px;
  }
}
</style>
<template>
  <div class="drop_loan exclusive_box">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title_type">批量导入</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <div class="upload_tips">请选择文件</div>
          <div class="dial_cent">
            <input class="text" type="text" name="file" disabled :value="fileName" />
            <input class="file" type="file" @change="tirggerFile" />
            <a class="btn el-button">浏览</a>
          </div>
          <div class="form__bottom">
            <el-button
              class="add finish width140"
              :disabled="isDisabled"
              type="primary "
              @click="finish"
            >确认</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="导入结果"
      :visible.sync="dialogVisible"
      width="540px"
      :close-on-click-modal="false"
      :before-close="dialogBeforeClose"
      center
    >
      <div class="import_info">
        <div v-if="isSuccess">
          <p>
            <span class="title">检查通过:</span>
            <span class="content">{{successCount}} 条</span>
          </p>
        </div>
        <div v-if="!isSuccess">
          <p>
            <span class="title">检查不通过:</span>
            <span class="content">{{failureCount}} 条</span>
          </p>
          <p>
            <span class="title">检查错误的出账编号:</span>
            <span class="content">{{failureLines}}</span>
          </p>
        </div>
      </div>
      <div slot="footer">
        <el-button type="primary" class="width140" @click="importInfoComfirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { lawyerApi } from "../../js/server";

export default {
  props: ["author"],
  data() {
    return {
      isDisabled: false,
      fileName: "",
      file: "",
      dialogVisible: false,
      isSuccess: false,
      successCount: 0,
      failureCount: 0,
      failureLines: ""
    };
  },
  methods: {
    tirggerFile(event) {
      let accept = ["xlsx", "xls"];
      this.file = event.target.files[0];
      if (!this.file) {
        this.fileName = null;
        return;
      }
      this.fileName = this.file.name;
      let fileFormat = this.fileName.substring(
        this.fileName.lastIndexOf(".") + 1
      );
      if (!accept.includes(fileFormat.toLocaleLowerCase())) {
        this.$error("请选择xlsx或xls格式的文件");
        this.file = null;
        this.fileName = null;
      }
    },
    close() {
      this.file = "";
      this.fileName = "";
      this.$emit("close");
    },
    importExcel(fileid) {
      let loading = this.$loading({
        lock: true,
        text: "处理中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      let params = {
        fileid: fileid,
        author: this.author
      };
      this.$MyFetch
        .post(lawyerApi.uploadfile, params, { timeout: 60000 })
        .then(res => {
          loading.close();
          if (res.sucess === "true") {
            this.isSuccess = true;
            this.successCount = res.count;
          } else {
            this.isSuccess = false;
            this.failureCount = res.count;
            let failureItems = res.list.map(item => {
              return item.putoutno + `(${item.message})`;
            });
            this.failureLines = failureItems.join("，");
          }
          this.dialogVisible = true;
        })
        .catch(_err => {
          loading.close();
          this.$error(_err.message);
        });
    },
    importInfoComfirm() {
      this.close();
      this.dialogVisible = false;
    },
    dialogBeforeClose() {
      this.importInfoComfirm();
    },
    finish() {
      if (!this.file) return;
      this.$upload(this.file, "7d")
        .then(res => {
          console.log("res", res);
          this.importExcel(res.fileId);
        })
        .catch(_err => {
          console.log(_err);
        });
    }
  }
};
</script>
