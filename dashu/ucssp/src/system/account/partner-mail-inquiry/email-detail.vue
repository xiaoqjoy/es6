<template>
  <div class="content email-detail">
    <div class="content_top">
      <router-link to="partner-mail-inquiry">合作方邮件查询</router-link>
      <i class="el-icon-arrow-right"></i>
      <span>详情</span>
    </div>
    <div class="sponsor">
      <!-- 表格 -->
      <div class="dialog-box__body">
        <div class="anti-fraud_dialog-box__middle">
          <div class="content_info content_info_top clearfix">
            <div class="top_conten f__left">
              <h2 class="top_content_font">{{formData.subject}}</h2>
            </div>
            <div class="top_conten f__left">
              <span class="top_conten_title">发件人：</span>
              <span class="top_content_font">{{formData.userName}}</span>
            </div>
            <div class="top_conten f__left">
              <span class="top_conten_title">时间：</span>
              <span class="top_content_font">{{formData.updatedDate ? (new Date(formData.updatedDate)).normalizeTime().strTime : '-'}}</span>
            </div>
            <div class="top_conten f__left">
              <span class="top_conten_title">收件人：</span>
              <span class="top_content_font">{{formData.toAddress}}</span>
            </div>
            <div class="top_conten f__left">
              <span class="top_conten_title">抄送人：</span>
              <span class="top_content_font">{{formData.toCarBonCopy}}</span>
            </div>
            <div class="top_conten f__left">
              <span class="top_conten_title">附件：</span>
              <span class="top_content_font">{{files.length}}个</span>
              <ul class="clearfix" style="display: inline-block;width: calc(100% - 100px);overflow: hidden;white-space: nowrap;">
                <li style="display: inline-block;margin-left: 10px;" v-for="(item, index) in files" :key="index">
                  <span class="top_conten_title top_conten_f">
                    &lt;{{item.fileName}}&gt;
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="content_info content_mid clearfix">
            <div class="top_conten f__left">
              <span class="top_content_font">{{formData.content}}</span>
            </div>
          </div>
          <div v-if="false" class="content_info clearfix">
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
          <div class="content_info content_info_accessory clearfix">
            <div class="accessory_title">
              附件<span>({{files.length}}个)</span>
            </div>
            <div class="top_conten accessory_file">
              <div class="accessory_file_top">
                <span>普通附件</span>
              </div>
              <ul>
                <li v-for="(item, index) in files" :key="index" class="clearfix">
                  <img src="~@common/img/ic_file.png" alt="">
                  <div class="exportEmail_btn">
                    <span class="top_conten_title exportEmail_s">{{item.fileName}}</span>
                    <span style="cursor: pointer;" @click="exportEmail(item)">下载</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <a id="exportLog" style="display:none;" target="_blank"></a>
    </div>
  </div>
</template>
<script>
import { accountApi } from "../../account/js/server.js"; // 接口
// import JSZip from "jszip";
// import FileSaver from "file-saver";
import "@common/css/dialog";
export default {
  name: "email-detail",
  data() {
    return {
      formData: {},
      files: []
    };
  },
  created() {
    let query = this.$route.query;
    // console.log(query);
    let json = query.json;
    if (json) {
      this.formData = JSON.parse(decodeURIComponent(json));
      let fileName = this.formData.attachFilesName.split(";");
      let fileId = this.formData.attachFiles.split(";");
      for (var i = 0; i < fileName.length; i++) {
        if (fileName[i] && fileId[i]) {
          let temp = {
            fileId: fileId[i],
            fileName: fileName[i]
          };
          this.files.push(temp);
        }
      }
    }
    // console.log(this.formData);
    // console.log(this.files);
  },
  mounted() {},
  methods: {
    // exportEmails() {
    //   let _that = this;
    //   // console.log(this.checkedEmails);
    //   const getFile = url => {
    //     return new Promise((resolve, reject) => {
    //       _that.$MyFetch
    //         .get(url, "", "arraybuffer")
    //         .then((data = {}) => {
    //           // console.log(data);
    //           resolve(data);
    //         })
    //         .catch(err => {
    //           _that.$message.error(err.message);
    //           reject(err.toString());
    //           // console.log(err);
    //         });
    //     });
    //   };
    //   var fileList = [];
    //   fileList.push(this.formData);
    //   let url = accountApi.idToUrls;
    //   for (var j = 0; j < fileList.length; j++) {
    //     var asyncFunc = function(arr, i, zipList, zipName, zName) {
    //       return new Promise(function(resolve, reject) {
    //         // console.log(zipList[i]);
    //         _that.$MyFetch
    //           .post(url, { fileId: zipList[i] })
    //           .then((data = {}) => {
    //             // console.log(data);
    //             zName.name = zipName + ".zip";
    //             arr.push(data.fileUrl);
    //             resolve();
    //           })
    //           .catch(err => {
    //             _that.$message.error(err.message);
    //             reject(err.toString());
    //           });
    //       });
    //     };
    //     var box5 = async function() {
    //       var arr = [];
    //       var zName = {};
    //       var zipList = fileList[j].attachFiles.split(";");
    //       var zipName = fileList[j].subject;
    //       var attachFilesName = fileList[j].attachFilesName.split(";");
    //       zipList.pop();
    //       attachFilesName.pop();
    //       for (var i = 0; i < zipList.length; i++) {
    //         await asyncFunc(arr, i, zipList, zipName, zName);
    //       }
    //       // console.log(arr);
    //       // console.log(attachFilesName);
    //       const data = arr;
    //       const zip = new JSZip();
    //       const cache = {};
    //       const promises = [];
    //       data.forEach((item, index) => {
    //         const promise = getFile(item).then(data => {
    //           // 下载文件, 并存成ArrayBuffer对象
    //           // const arrName = item.split("/");
    //           // const fileName = arrName[arrName.length - 1]; // 获取文件名
    //           var fileName = attachFilesName[index];
    //           zip.file(fileName, data, { binary: true }); // 逐个添加文件
    //           cache[fileName] = data;
    //         });
    //         promises.push(promise);
    //       });
    //       Promise.all(promises)
    //         .then(() => {
    //           zip.generateAsync({ type: "blob" }).then(content => {
    //             // 生成二进制流
    //             FileSaver.saveAs(content, zName.name); // 利用file-saver保存文件
    //           });
    //         })
    //         .catch(error => {
    //           // console.log(promises);
    //           _that.confirmFn(error, "error");
    //         });
    //     };
    //     box5();
    //   }
    //   // console.log(this.checkedEmails);
    // },
    // exportEmail(items) {
    //   let _that = this;
    //   const getFile = url => {
    //     // console.log(url);
    //     return new Promise((resolve, reject) => {
    //       _that.$MyFetch
    //         .get(url, "", "arraybuffer")
    //         .then((data = {}) => {
    //           // console.log(data);
    //           resolve(data);
    //         })
    //         .catch(err => {
    //           _that.$message.error(err.message);
    //           reject(err.toString());
    //           // console.log(err);
    //         });
    //     });
    //   };
    //   _that.$MyFetch
    //     .post(accountApi.idToUrls, { fileId: items.fileId })
    //     .then((res = {}) => {
    //       const data = []; // 需要下载打包的路径, 可以是本地相对路径, 也可以是跨域的全路径
    //       data.push(res.fileUrl);
    //       const zip = new JSZip();
    //       const cache = {};
    //       const promises = [];
    //       data.forEach(item => {
    //         // console.log(item);
    //         const promise = getFile(item).then(data => {
    //           // 下载文件, 并存成ArrayBuffer对象
    //           zip.file(items.fileName, data, { binary: true }); // 逐个添加文件
    //           cache[items.fileName] = data;
    //         });
    //         promises.push(promise);
    //       });
    //       Promise.all(promises).then(() => {
    //         zip.generateAsync({ type: "blob" }).then(content => {
    //           // 生成二进制流
    //           // console.log(content);
    //           FileSaver.saveAs(content, items.fileName + ".zip"); // 利用file-saver保存文件
    //         });
    //       });
    //     })
    //     .catch(err => {
    //       _that.$message.error(err.message);
    //     });
    // }
    // 下载不打包
    exportEmail(items) {
      let _that = this;
      _that.$MyFetch
        .post(accountApi.idToUrls, { fileId: items.fileId })
        .then((res = {}) => {
          // console.log(res);
          /*
          let a = document.getElementById("exportLog");
          a.download = items.fileName;
          a.href = res.fileUrl;
          a.click();
          */
          _that.$MyFetch
            .get(res.fileUrl, {}, "arraybuffer")
            .then(data => {
              // console.log(data);
              var blob = new Blob([data]);
              // console.log(blob);
              if ("msSaveBlob" in navigator) {
                window.navigator.msSaveBlob(blob, items.fileName);
              } else {
                let a = document.getElementById("exportLog");
                let url = window.URL.createObjectURL(blob);
                a.download = items.fileName;
                a.href = url;
                a.dispatchEvent(new MouseEvent("click"));
              }
            })
            .catch(err => {
              _that.$message.error(err.message);
            });
        })
        .catch(err => {
          _that.$message.error(err.message);
        });
    }
  }
};
</script>

<style lang="less">
.email-detail-autocomplete {
  width: auto !important;
}
.email-detail {
}
</style>

<style lang="less" scoped>
.content {
  background-color: #ffffff;
  // height: 100%;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  // overflow-y: auto;
  padding: 0px 30px;
  position: relative;
  padding-bottom: 30px;
  .content_top {
    > a {
      text-decoration: none;
      font-size: 14px;
      color: #538bf1;
      letter-spacing: -0.34px;
      font-family: PingFang-SC-Regular;
    }
    > span {
      letter-spacing: -0.34px;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #333333;
    }
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #d0d0d0;
    display: flex;
    align-items: center;
    position: relative;
    &::before {
      content: "";
      width: 2px;
      height: 16px;
      // background: #538bf1;
    }
    span {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #333333;
      font-weight: bold;
      margin-left: 7px;
    }
  }
  .sponsor {
    width: 100%;
    height: calc(100% - 60px);
    padding-top: 20px;
    // overflow-y: hidden;
    // .tables {
    //   max-height: 550px;
    //   overflow-y: auto;
    // }
    .dialog-box__body {
      height: 100%;
      .anti-fraud_dialog-box__middle {
        height: 100%;
      }
    }
  }
}
.content_info {
  // margin-bottom: 20px;
  border-radius: 4px;
  &.content_mid {
    padding-top: 20px;
    min-height: 330px;
    .top_conten {
      height: auto;
      .top_content_font {
        text-indent: 24px;
        font-size: 14px;
      }
    }
  }
  &.content_info_top {
    padding: 20px;
    background: #ececec;
    border-radius: 4px;
    .top_conten {
      height: 38px;
      line-height: 38px;
    }
  }
  &.content_info_accessory {
    background: #ececec;
    border: 1px solid #dddddd;
    border-radius: 0px 0px 4px 4px;
    min-height: 125px;
    .accessory_title {
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
      border-bottom: 1px solid #d0d0d0;
      font-family: PingFang-SC-Medium;
      font-size: 14px;
      color: #333333;
      span {
        font-size: 12px;
        margin-left: 10px;
        color: #333333;
      }
    }
    .accessory_file {
      padding-left: 20px;
      height: auto;
      li {
        margin-bottom: 10px;
        img {
          width: 32px;
          height: 32px;
          float: left;
          margin-top: 15px;
        }
        .exportEmail_btn {
          float: left;
          margin-left: 10px;
          span {
            color: #538bf1;
            display: inline-block;
            margin-right: 20px;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #538bf1;
            &.exportEmail_s {
              color: #333333;
              display: block;
            }
          }
        }
      }
      .accessory_file_top {
        margin-top: 10px;
        span {
          font-size: 12px;
        }
      }
    }
  }
  .top_conten {
    width: calc(100% - 60px);
    // margin-left: 50px;
    height: 30px;
  }
  .top_conten_title {
    text-align: center;
    line-height: 30px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #666;
    letter-spacing: 0;
    &.top_conten_f {
      color: #538bf1;
      font-size: 12px;
    }
  }
  h2.top_content_font {
    font-size: 16px;
    font-weight: 600;
  }
  .top_content_font {
    line-height: 20px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #666666;
    letter-spacing: 0;
  }
  .top_content_money {
    color: orange;
  }
  .exportEmail {
    cursor: pointer;
  }
}
</style>
