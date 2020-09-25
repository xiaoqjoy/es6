<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan{
    .dialog-box{
      padding-bottom: 30px;
      width: 580px;
      .dialog-box__top {
        margin-bottom: 32px;
      }
      .hintDiv {
        height: 30px;
        padding-top: 15px;
        box-sizing: border-box;
        .hint {
          text-align: left;
          font-size: 12px;
          color: #f55f5f;
        }
      }
      .title_type {
        background: #fff;
        padding-left: 20px;
        font-weight: bold;
        font-family: PingFangSC-Regular;
        font-size: 18px;
        color: #333333;
        letter-spacing: -1.38px;
        text-align: center;
        font-weight: normal;
      }
      .dialog-box__middle-form{
        height: auto;
        overflow-y: auto;
        .form__bottom {
          padding-bottom: 0;
          text-align: center;
          margin-top: 30px;
          .finish {
            width: 200px;
            height: 40px;
          }
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
        padding-left: 30px;
        .select_file {
          padding-bottom: 8px;
          span {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #BBBBBB;
            letter-spacing: 1.09px;
          }
        }
        // 浏览按钮
        .browse_btn {
          margin-left: 20px;
          width: 100px;
          height: 40px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #538BF1;
          letter-spacing: 1.07px;
          text-align: center;
          border: 1px solid #538BF1;
          cursor: pointer;
        }
      }
      .dial_cent > input {
        box-sizing: border-box;
        padding-left: 20px;
        border: 1px solid #d0d0d0;
        border-radius: 4px;
      }
      .text {
        border: 1px solid #d0d0d0;
        border-radius: 4px;
        width: 400px;
        height: 40px;
        background: #fff;
      }
      .file {
        margin-left: 20px;
        opacity: 0.01;
        width: 100px;
        height: 40px;
        position: absolute;
        cursor: pointer;
      }
      .content {
        height: 150px;
        overflow: scroll;
        padding: 0 40px;
        p {
          margin-bottom: 20px;
        }
      }
      .btn-wrap {
        text-align: center;
        .el-button {
          width: 100px;
          margin: 0 20px;
        }
      }
    }
  }
</style>
<template>
  <div class="drop_loan exclusive_box">
    <div class="dialog-mask"></div>
    <div class="dialog-box" v-loading='loading' v-if="!showResult">
      <div class="dialog-box__top">
        <h5 class="title_type">批量导入</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <div class="dial_cent">
            <div class="select_file">
              <span>请选择文件</span>
            </div>
            <input class="text" type="text" name="file" disabled :value="fileName" />
            <input class="file"  type="file" @change="tirggerFile" />
            <el-button class="browse_btn button ">浏览</el-button>
            <div class="hintDiv">
              <div class="hint" v-if="hint">{{fileMsg}}</div>
            </div>
          </div>
          <div class="form__bottom">
            <el-button class="add finish button " :disabled="isDisabled"  type="primary " @click="finish">确认</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog-box" v-else>
      <div class="dialog-box__top">
        <h5 class="title_type">检查结果</h5>
      </div>
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <div class="content">
            <p>
              <span>导入成功：</span>
              <span>{{ sucCount }}</span>
            </p>
            <p>
              <span>导入失败：</span>
              <span>{{ errCount }}</span>
            </p>
            <p>
              <span>导入失败的编号：</span>
              <span>{{ msg }}</span>
            </p>
          </div>
          <div class="btn-wrap">
            <el-button @click="cancelResult">取消</el-button>
            <el-button type="primary" @click="buybackBreakBatchSave">确定</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import { counterDealApi } from "../../../../js/server";
  import { fileCos } from "@/common/js/fileCos";
  import COS from 'cos-js-sdk-v5';
  export default{
    data() {
      return {
        isDisabled: false,
        accept: ['XLS', 'XLSX'], // 上传文件格式
        hint: false, // 提示信息
        fileName: "", // 绑定文本框的值
        fileId: "", // 文件ID
        file: "", // 上传文件的值
        fileMsg: "", // 提示信息文本的值
        filePostfix: [],
        loading: false,
        showResult: false,
        errCount: '',
        sucCount: '',
        msg: ''
      };
    },
    methods: {
      tirggerFile(event) {
        this.hint = false;
        this.file = event.target.files;
        this.fileName = "";
        this.filePostfix = [];
        for (var key in this.file) {
          if (this.file[key].name && typeof this.file[key] !== 'function') {
            this.fileName = this.file[key].name;
            let temp = this.file[key].name.slice(this.file[key].name.lastIndexOf(".") + 1);
            this.filePostfix.push(temp);
          }
        }
      },
      close() {
        this.file = "";
        this.fileName = "";
        this.$emit('close');
      },
      cancelResult() {
        this.showResult = false;
        this.close();
      },
      buybackBreakBatchSave() {
        this.$MyFetch.post(counterDealApi.buybackBreakBatchSave, {
          fileId: this.fileId,
          fileName: this.fileName,
          flowNo: "freePayBuyBackFlow"
        }).then((data) => {
          this.$message.success("导入成功条数为：" + data.sucCount);
          this.showResult = false;
          this.close();
        }).catch((err) => {
          this.$error(err.message);
        });
      },
      buybackBreakBatchCheck() {
        this.$MyFetch.post(counterDealApi.buybackBreakBatchCheck, {
          fileId: this.fileId,
          fileName: this.fileName,
          flowNo: "freePayBuyBackFlow"
        }).then((data) => {
          this.loading = false;
          this.errCount = data.errCount;
          this.sucCount = data.sucCount;
          this.msg = data.msg;
          this.showResult = true;
        }).catch((err) => {
          this.loading = false;
          this.$error(err.message);
        });
      },
      closeResult() {
        this.showResult = false;
      },
      finish() {
        let _that = this;
        if (this.fileName === null || this.fileName === "") {
          this.hint = true;
          this.fileMsg = "请选择一个文件";
          return;
        }
        for (var i = 0; i < this.filePostfix.length; i++) {
          if (this.accept.indexOf(this.filePostfix[i].toLocaleUpperCase()) < 0) {
            this.hint = true;
            this.fileMsg = "请选择正确的文件格式上传";
            return;
          }
        }
        if (!this.hint) {
          let filenames = this.file[0].name;
          this.$emit('getFileName', filenames);
          for (var j = 0; j < this.filePostfix.length; j++) {
            let _file = this.file[j];
            let url = counterDealApi.newFile;
            let extensionName = this.filePostfix[j];
            let data = {
              storageTime: "90d",
              extensionName: extensionName
            };
            _that.loading = true;
            // 异步获取签名
            this.$MyFetch
            .post(url, data)
            .then((res = {}) => {
              var Bucket = fileCos.getCos();
              var Region = "ap-guangzhou";
              var obj = {
                TmpSecretId: res.credentials.tmpSecretId,
                TmpSecretKey: res.credentials.tmpSecretKey,
                XCosSecurityToken: res.credentials.sessionToken,
                ExpiredTime: res.credentials.expiredTime
              };
              this.fileId = res.fileInfo.fileId;
              let _filePath = res.fileInfo.filePath;
              var cos = new COS({
                getAuthorization: function (options, callback) {
                  callback(obj);
                }
              });
              cos.putObject({
                Bucket: Bucket,
                Region: Region,
                Key: _filePath,
                StorageClass: 'STANDARD',
                Body: _file
              }, (err, data) => {
                if (err) {
                  this.$error(err.message);
                  this.loading = false;
                  return;
                }
                if (data.statusCode === 200) {
                  this.buybackBreakBatchCheck();
                }
              });
            }).catch((error) => {
              this.loading = false;
              this.$error(error.message);
            });
          }
        }
      }
    }
  };
</script>
