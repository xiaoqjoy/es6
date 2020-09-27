<template>
    <div class="import-message">
      <div class="dialog-mask"></div>
      <div class="dialog-box">
        <div class="dialog-box__top">
          <h5 class="title bg__white">批量导入</h5>
          <span class="el-icon-close button button__close" @click="close"></span>
        </div>
        <div class="dialog-box__middle color_1">
          <div class="dial_title">
            <!-- <p>请选择一个文件作为附件上传:<a :href="url.downloadTemplate + '?customertype=' + customertype" target="_blank">下载模板</a></p> -->
            <p>请选择一个文件作为附件上传:<span @click="downloadFile">下载模板</span></p>
          </div>
          <div class="dial_cent">
            <input class="text" type="text" name="file" disabled :value="fileName" />
            <input class="file"  type="file" @change="tirggerFile" />
            <a>浏览</a>
          </div>
          <div class="hint" v-if="hint">{{fileMsg}}</div>
        </div>
        <div>
          <el-button type="primary"  @click="save">确定</el-button>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
import { fqzApi } from "../../../anti-fraud/js/server";
export default {
  data() {
    return {
      hint: false, // 提示信息
      url: fqzApi, // 下载模板方法
      fileName: "", // 绑定文本框的值
      file: "", // 上传文件的值
      fileMsg: "" // 提示信息文本的值
    };
  },
  components: {},
  props: ["fn_s"],
  computed: {
    customertype() {
      return this.$store.getters.customertype;
    }
  },
  methods: {
    // 关闭窗口
    close() {
      this.$emit("clsoe_windowImport_s");
    },
    // 绑定file输入框事件
    tirggerFile(event) {
      this.hint = false;
      this.file = event.target.files[0];
      this.fileName = this.file.name;
    },
    downloadFile() {
      this.$MyFetch
        .get(this.url.downloadTemplate, { customertype: this.customertype })
        .then((data = {}) => {
          this.$download(data);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 确定按钮事件
    save() {
      if (this.fileName === null || this.fileName === "") {
        this.hint = true;
        this.fileMsg = "请选择一个文件";
        return;
      }
      var fileSuffix = this.fileName.substring(
        this.fileName.lastIndexOf(".") + 1
      );
      if (
        fileSuffix !== "excel" &&
        fileSuffix !== "xls" &&
        fileSuffix !== "xlsx"
      ) {
        this.hint = true;
        this.fileMsg = "请选择正确的文件格式上传";
        return;
      }
      this.fn_s(this.file);
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
/deep/ .el-button--primary {
  width: 200px;
  height: 40px;
  background: #538bf1;
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 1.07px;
  text-align: center;
  margin-top: -12px;
}
.import-message {
  .dialog-box {
    width: 570px;
    height: 280px;
    .dialog-box__middle {
      width: 510px;
      height: 130px;
      margin-left: 30px;
      margin-top: 40px;
      box-shadow: 0 0 0 #fff;
      .hint {
        text-align: left;
        margin-left: -31px;
        margin-top: 17px;
        font-size: 12px;
        color: #f55f5f;
        letter-spacing: 0;
      }
    }
    .color_1 {
      background: none;
    }
  }
}
.dial_title {
  text-align: left;
  margin-top: -36px;
  margin-left: -34px;
}
.dial_title > p {
  font-size: 14px;
  color: #333333;
  margin-bottom: 23px;
}
.dial_title > p > span {
  cursor: pointer;
  margin-left: 20px;
  font-size: 12px;
  color: #538bf1;
}
.dial_cent a {
  text-decoration: none;
  font-size: 14px;
  color: #538bf1;
}
.dial_cent {
  overflow: hidden;
  position: relative;
  margin-left: -34px;
}
.dial_cent > input {
  border: 1px solid #e5e5e5;
  border-radius: 4px;
}
.text {
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  width: 440px;
  height: 40px;
  background: #fff;
}
.file {
  opacity: 0.01;
  position: absolute;
  cursor: pointer;
}
</style>
