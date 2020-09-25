<template>
    <div class="import-message">
      <div class="dialog-mask"></div>
      <div class="dialog-box" v-loading='loading'>
        <div class="dialog-box__top">
          <h5 class="title bg__white">{{title}}</h5>
          <span class="el-icon-close button button__close" @click="close"></span>
        </div>
        <div class="dialog-box__middle color_1">
          <div class="dial_title">
            <p>请选择文件作上传:</p>
          </div>
          <div class="dial_cent">
            <input class="text" type="text" disabled :value="fileName" />
            <input class="file"  type="file" :multiple="multiple" @change="tirggerFile" />
            <a>浏览</a>
          </div>
          <div class="hint" v-if="hint">{{fileMsg}}</div>
        </div>
        <div class="delete_submit">
          <div>
            <el-button class="t_button export_t button" @click="save">确定</el-button>
          </div>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { accountApi } from "../../../account/js/server";
import {fileCos} from "@/common/js/fileCos";
import COS from "cos-js-sdk-v5";
export default {
  props: {
    title: {
      type: String,
      default: function() {
        return "";
      }
    },
    accept: {
      type: Array,
      default: function() {
        return [];
      }
    },
    multiple: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    tableData: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      introductionList: true, // 关闭窗口
      hint: false, // 提示信息
      url: accountApi, // 下载模板方法
      fileName: "", // 绑定文本框的值
      fileId: "", // 文件ID
      file: "", // 上传文件的值
      fileMsg: "", // 提示信息文本的值
      SecretId: "",
      SecretKey: "",
      sessionToken: "",
      filePostfix: [],
      loading: false
    };
  },
  created() {
    console.log(fileCos.getCos());
    console.log(accountApi.newFile);
  },
  components: {},
  methods: {
    // 关闭窗口
    close() {
      this.$emit("clsoe_upload_s");
    },
    // 绑定file输入框事件
    tirggerFile(event) {
      // console.log(event);
      this.hint = false;
      this.file = event.target.files;
      this.fileName = "";
      this.filePostfix = [];
      for (var key in this.file) {
        if (this.file[key].name && typeof this.file[key] !== "function") {
          this.fileName += this.file[key].name + "；";
          // console.log(this.file[key].name);
          let temp = this.file[key].name.slice(
            this.file[key].name.lastIndexOf(".") + 1
          );
          // console.log(temp);
          this.filePostfix.push(temp);
        }
      }
      // console.log(this.file);
      // console.log(this.fileName);
      // console.log(this.filePostfix);
    },
    save() {
      let _that = this;
      if (this.fileName === null || this.fileName === "") {
        this.hint = true;
        this.fileMsg = "请选择一个文件";
        return;
      }
      for (var i = 0; i < this.filePostfix.length; i++) {
        // console.log(this.accept);
        if (this.accept.indexOf(this.filePostfix[i].toLocaleUpperCase()) < 0) {
          this.hint = true;
          this.fileMsg = "请选择正确的文件格式上传";
          return;
        }
      }
      let url = accountApi.newFile;
      const getFileId = index => {
        return new Promise((resolve, reject) => {
          let _file = this.file[index];
          let extensionName = this.filePostfix[index];
          // console.log(extensionName);
          let data = {
            storageTime: "f",
            extensionName: extensionName
          };
          _that.loading = true;
          // 异步获取签名
          this.$MyFetch
            .post(url, data)
            .then((res = {}) => {
              _that.loading = false;
              // console.log(res);
              var Bucket = fileCos.getCos();
              var Region = "ap-guangzhou";
              var obj = {
                TmpSecretId: res.credentials.tmpSecretId,
                TmpSecretKey: res.credentials.tmpSecretKey,
                XCosSecurityToken: res.credentials.sessionToken,
                ExpiredTime: res.credentials.expiredTime
              };
              let _filePath = res.fileInfo.filePath;
              var cos = new COS({
                getAuthorization: function(options, callback) {
                  callback(obj);
                }
              });
              cos.putObject(
                {
                  Bucket: Bucket,
                  Region: Region,
                  Key: _filePath,
                  StorageClass: "STANDARD",
                  Body: _file
                },
                function(err, data) {
                  // console.log(err);
                  // console.log(data);
                  // console.log(res.data.data.fileInfo.fileId);
                  if (err) {
                    reject(err.toString());
                  } else if (data) {
                    resolve(res.fileInfo.fileId);
                  }
                }
              );
            })
            .catch(err => {
              _that.loading = false;
              this.$error(err.message);
            });
        });
      };
      let fileIds = [];
      // console.log(this.filePostfix.length);
      if (!this.hint) {
        for (var j = 0; j < this.filePostfix.length; j++) {
          // console.log(Bucket);
          // console.log(Region);
          // console.log(this.file[j]);
          const fileId = getFileId(j).then(data => {
            console.log(data);
            return data;
          });
          fileIds.push(fileId);
        }
        Promise.all(fileIds)
          .then(id => {
            console.log(id);
            let ids = id.join(",");
            let obj = {
              fileId: ids,
              accountAllotId: _that.tableData.accountAllotId,
              applicationId: _that.tableData.applicationId
            };
            _that.$emit("getFileId", obj);
            _that.close();
          })
          .catch(error => {
            this.$error(error.toString());
            console.log(error);
          });
      }
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.import-message {
  .dialog-box {
    width: 570px;
    height: 280px;
    z-index: 1002;
    background: #FFFFFF;
    .dialog-box__middle {
      width: 510px;
      height: 120px;
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
  .dialog-mask {
    z-index: 1001;
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
.dial_title > p > a {
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
  height: 100%;
  width: 42px;
  right: 0;
  z-index: 1;
}
// 按钮颜色
.el-button--primary {
  background: #538bf1;
  color: #fff;
}
// 底部按钮
.delete_submit {
  width: 100%;
  display: flex;
  justify-content: center;
  // 提交公共样式
  .t_button {
    width: 200px;
    height: 40px;
  }
  .export_t {
    background: #538bf1;
    font-size: 14px;
    color: #ffffff;
    letter-spacing: 1.07px;
    text-align: center;
  }
}
</style>
