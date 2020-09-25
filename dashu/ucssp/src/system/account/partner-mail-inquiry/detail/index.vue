<template>
  <div class="import-message" >
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 头部 -->
      <div class="dialog-box__top">
        <h5 class="title bg__white">{{formData.subject}}</h5>
        <span class="el-icon-close button button__close" @click="close_()"></span>
      </div>
      <!-- 主体部分 -->
      <div class="dialog-box__body">
        <div class="anti-fraud_dialog-box__middle">
          <div class="content clearfix">
            <div class="top_conten f__left">
              <span class="top_conten_title">发件人：</span>
              <span class="top_content_font">{{formData.userName}}</span>
            </div>
            <div class="top_conten f__left">
              <span class="top_conten_title">收件人：</span>
              <span class="top_content_font">{{formData.toAddress}}</span>
            </div>
            <div class="top_conten f__left">
              <span class="top_conten_title">抄送人：</span>
              <span class="top_content_font">{{formData.toCarBonCopy}}</span>
            </div>
          </div>
          <div class="content content_mid clearfix">
            <div class="top_conten f__left">
              <span class="top_conten_title">正文：</span>
              <span class="top_content_font">{{formData.content}}</span>
            </div>
          </div>
          <div class="content clearfix">
            <div class="top_conten">
              <span class="top_conten_title">深圳前海大数金融服务有限公司</span>
            </div>
            <div class="top_conten">
              <span class="top_conten_title">Email：service@dashuf.com</span>
            </div>
            <div class="top_conten">
              <span class="top_conten_title">Add：深圳市南山区铜鼓路大冲国际中心五号楼34楼</span>
            </div>
          </div>
          <div class="content clearfix">
          <div class="top_conten">
            <span class="top_conten_title exportEmail" @click="exportEmail">附件：{{formData.attachFilesName}}</span>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { accountApi } from "../../../account/js/server.js"; // 接口
// import axios from "axios";
import JSZip from "jszip";
import FileSaver from "file-saver";
export default {
  props: {
    formData: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  created() {
    // console.log(this.formData);
  },
  methods: {
    // 关闭弹窗
    close_() {
      this.$emit("clsoe_windowAlert");
    },
    // 导出
    exportEmail() {
      let _that = this;
      // console.log(this.checkedEmails);
      const getFile = url => {
        return new Promise((resolve, reject) => {
          _that.$MyFetch
            .get(url, "", "arraybuffer")
            .then((data = {}) => {
              // console.log(data);
              resolve(data);
            })
            .catch(err => {
              _that.$message.error(err.message);
              reject(err.toString());
              // console.log(err);
            });
        });
      };
      var fileList = [];
      fileList.push(this.formData);
      let url = accountApi.idToUrls;
      for (var j = 0; j < fileList.length; j++) {
        var asyncFunc = function(arr, i, zipList, zipName, zName) {
          return new Promise(function(resolve, reject) {
            // console.log(zipList[i]);
            _that.$MyFetch
              .post(url, { fileId: zipList[i] })
              .then((data = {}) => {
                // console.log(data);
                zName.name = zipName + ".zip";
                arr.push(data.fileUrl);
                resolve();
              })
              .catch(err => {
                _that.$message.error(err.message);
                reject(err.toString());
              });
          });
        };
        var box5 = async function() {
          var arr = [];
          var zName = {};
          var zipList = fileList[j].attachFiles.split(";");
          var zipName = fileList[j].subject;
          var attachFilesName = fileList[j].attachFilesName.split(";");
          zipList.pop();
          attachFilesName.pop();
          for (var i = 0; i < zipList.length; i++) {
            await asyncFunc(arr, i, zipList, zipName, zName);
          }
          // console.log(arr);
          // console.log(attachFilesName);
          const data = arr;
          const zip = new JSZip();
          const cache = {};
          const promises = [];
          data.forEach((item, index) => {
            const promise = getFile(item).then(data => {
              // 下载文件, 并存成ArrayBuffer对象
              // const arrName = item.split("/");
              // const fileName = arrName[arrName.length - 1]; // 获取文件名
              var fileName = attachFilesName[index];
              zip.file(fileName, data, { binary: true }); // 逐个添加文件
              cache[fileName] = data;
            });
            promises.push(promise);
          });
          Promise.all(promises)
            .then(() => {
              zip.generateAsync({ type: "blob" }).then(content => {
                // 生成二进制流
                FileSaver.saveAs(content, zName.name); // 利用file-saver保存文件
              });
            })
            .catch(error => {
              // console.log(promises);
              _that.confirmFn(error, "error");
            });
        };
        box5();
      }
      // console.log(this.checkedEmails);
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.import-message {
  .dialog-box {
    width: 800px;
    .el-form-item {
      margin-right: 0;
    }
    .dialog-box__body {
      overflow-y: auto;
      overflow-x: hidden;
      height: 628px;
    }
  }
}
//关闭按钮
.el-icon-close {
  position: absolute;
  font-size: 32px;
  top: 12px;
  right: 10px;
  cursor: pointer;
}
.anti-fraud_dialog-box__middle {
  height: initial;
  padding: 0 30px;
}
.content {
  margin-bottom: 20px;
  &.content_mid {
    min-height: 330px;
  }
  .top_conten {
    width: 80%;
    // margin-left: 50px;
    height: 30px;
  }
  .top_conten_title {
    text-align: center;
    line-height: 30px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #bbbbbb;
    letter-spacing: 0;
  }
  .top_content_font {
    line-height: 20px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #333333;
    letter-spacing: 0;
  }
  .top_content_money {
    color: orange;
  }
  .exportEmail {
    cursor: pointer;
    color: #538bf1;
  }
}
</style>
