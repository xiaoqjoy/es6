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
          display: flex;
          justify-content: center;
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
    }
  }
</style>
<template>
  <div class="drop_loan exclusive_box">
    <div class="dialog-mask"></div>
    <div class="dialog-box" v-loading='loading'>
      <div class="dialog-box__top">
        <h5 class="title_type">导入还款文件</h5>
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
  </div>
</template>
<script type="text/ecmascript-6">
  import '@common/css/dialog';
  // import axios from 'axios';
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
  import { fileCos } from "@/common/js/fileCos";
  import COS from 'cos-js-sdk-v5';
  export default{
    data() {
      return {
        isDisabled: false,
        accept: ['XLS', 'XLSX'], // 上传文件格式
        hint: false, // 提示信息
        url: counterDealApi, // 下载模板方法
        fileName: "", // 绑定文本框的值
        fileId: "", // 文件ID
        file: "", // 上传文件的值
        fileMsg: "", // 提示信息文本的值
        SecretId: '',
        SecretKey: '',
        sessionToken: "",
        filePostfix: [],
        loading: false
      };
    },
    props: {
      data: Object
    },
    methods: {
      tirggerFile(event) {
        console.log(event, "event");
        // this.file = event.target.files[0];
        // this.fileName = this.file.name;
        this.hint = false;
        this.file = event.target.files;
        this.fileName = "";
        this.filePostfix = [];
        for (var key in this.file) {
          if (this.file[key].name && typeof this.file[key] !== 'function') {
            this.fileName = this.file[key].name;
            // console.log(this.file[key].name);
            let temp = this.file[key].name.slice(this.file[key].name.lastIndexOf(".") + 1);
            // console.log(temp);
            this.filePostfix.push(temp);
          }
        }
        console.log(this.filePostfix, "filepostfix");
      },
      close() {
        this.file = "";
        this.fileName = "";
        this.$emit('close');
      },
      getNewData() {
        this.$emit('getNewData');
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
        let fileIds = '';
        // console.log(this.filePostfix.length);
        if (!this.hint) {
          // console.log(this.file[0].name, this.filePostfix, "this.file");
          // 把文件名传给负组件
          let filenames = this.file[0].name;
          this.$emit('getFileName', filenames);
          for (var j = 0; j < this.filePostfix.length; j++) {
            // console.log(Bucket);
            // console.log(Region);
            // console.log(this.file[j]);
            let _file = this.file[j];
            let url = counterDealApi.newFile;
            let extensionName = this.filePostfix[j];
            // console.log(extensionName);
            let data = {
              storageTime: "30d",
              extensionName: extensionName
            };
            _that.loading = true;
            // 异步获取签名
            // axios({
            //   headers: {
            //     "Content-Type": "application/json;charset=UTF-8",
            //     "Accept": "application/json;charset=UTF-8",
            //     "X-REQ-NAME": "ucssp"
            //   },
            //   method: "POST",
            //   url,
            //   data: data
            // })
            this.$MyFetch
            .post(url, data)
            .then((res) => {
              var Bucket = fileCos.getCos();
              var Region = 'ap-guangzhou';
              var obj = {
                TmpSecretId: res.credentials.tmpSecretId,
                TmpSecretKey: res.credentials.tmpSecretKey,
                XCosSecurityToken: res.credentials.sessionToken,
                ExpiredTime: res.credentials.expiredTime
              };
              fileIds = res.fileInfo.fileId;
              console.log(res, obj, fileIds, "res");
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
                Body: _file,
                onProgress: function(progressData) {
                  // console.log(JSON.stringify(progressData));
                  // console.log(progressData.percent);
                  if (progressData.percent === 1) {
                    _that.loading = false;
                    _that.fileName = "";
                    _that.filePostfix = [];
                    let fileId = fileIds;
                    console.log(fileId, "file id name..........");
                    _that.$emit('getFileId', fileId);
                    _that.$emit("FileSaveFun");
                    // _that.confirmFn("上传成功", "success");
                    _that.close();
                  }
                }
              }, function(err, data) {
                  console.log(err || data);
                  _that.close();
              });
            }).catch((error) => {
              console.log(error);
              this.$error(error.message);
              _that.loading = false;
            });
          }
        }
      }
    }
  };
</script>
