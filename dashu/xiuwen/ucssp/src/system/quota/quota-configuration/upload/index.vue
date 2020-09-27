<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan{
    .dialog-box{
      width: 540px;
      .title_type {
        text-align: center;
        background: #fff;
        font-size: 18px;
        letter-spacing: 1.3px;
        padding-left: 20px;
        font-weight: bold;
      }
      .dialog-box__middle-form{
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
        border: 1px solid #e5e5e5;
        border-radius: 4px;
      }
      .text {
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        width: 449px;
        height: 40px;
        background: #fff;
      }
      .file {
        opacity: 0.01;
        position: absolute;
        cursor: pointer;
        height: 100%;
      }
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
          <div class="dial_cent">
            <input class="text" type="text" name="file" disabled :value="fileName" />
            <input class="file"  type="file" @change="tirggerFile" />
            <a>浏览</a>
          </div>
          <div class="form__bottom">
            <el-button class="add finish" :disabled="isDisabled"  type="primary " @click="finish">确认</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import '@common/css/dialog';
  import {quotaApi} from '../../js/server.js';

  export default{
    data() {
      return {
        isDisabled: false,
        fileName: "",
        file: ""
      };
    },
    props: {
      data: Object
    },
    methods: {
      tirggerFile(event) {
        this.file = event.target.files[0];
        this.fileName = this.file.name;
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
        let data = new FormData();
        data.append("file", this.file); // 文件
        if (this.file === "") {
          this.$error("请选择文件");
          return false;
        }
        this.isDisabled = true;
        this.$MyFetch.post(quotaApi.BranchImportfile, data)
        .then((data = {}) => {
          this.$message({
            message: '保存成功',
            center: true,
            onClose: this.getNewData()
          });
          this.isDisabled = false;
          this.close();
        })
        .catch((err) => {
          this.$error(err.message);
          this.isDisabled = false;
        });
      }
    }
  };
</script>
