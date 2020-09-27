<template>
  <div class="import-message">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <span class="title">备注</span>
        <span class="el-icon-close button button__close" @click="close_()"></span>
      </div>
      <div class="double_num"><span class="black_font">备注内容：</span></div>
      <div class="remark_content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
         <el-form-item prop="remarkTxt">
          <el-input :disabled="disabled" type="textarea" v-model="ruleForm.remarkTxt"></el-input>
         </el-form-item>
        </el-form>
        <el-button v-if="!disabled" type="primary" class="remark_btn" @click="submitForm('ruleForm')">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import "@common/css/dialog";
import {aprAudApi} from "../../js/server.js";

  export default {
    data() {
      return {
        ruleForm: {
        remarkTxt: ""
      },
      rules: {
          remarkTxt: [
            { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
          ]},
        url: '',
        remarkTxt: ''
      };
    },
    props: ['disabled', 'appOrAud', 'isPre'],
    // props: {
    //   disabled: Boolean
    // },
    methods: {
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.remark();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      remark() {
        if (this.appOrAud) {
            this.url = `${aprAudApi.taskDetail.remarkOper}/${this.$route.query.appID}`;
          } else {
            this.url = `${aprAudApi.aud.taskDetail.remarkOper}/${this.$route.query.appID}`;
          };
        let data = {
          "remarkTxt": this.ruleForm.remarkTxt
        };
        this.$MyFetch
          .post(this.url, data)
          .then(res => {
            console.log(res);
            this.$message({
          message: '保存成功',
          type: 'success'
        });
          })
          .catch(err => {
            this.$error(err.message);
          });
      },
      close_() {
        this.$emit("clsoe_windowAlert");
      }
    },
    created() {
      let isPre = this.isPre ? 'pre' : '';
       if (this.appOrAud) {
            this.url = `${aprAudApi.taskDetail[`${isPre}remarkPage`]}/${this.$route.query.appID}`;
          } else {
            this.url = `${aprAudApi.aud.taskDetail[`${isPre}remarkPage`]}/${this.$route.query.appID}`;
          };
      this.$MyFetch.get(this.url)
      .then((data = {}) => {
        if (data.remarkTxt) {
          this.ruleForm.remarkTxt = data.remarkTxt;
        }
        console.log(data);
      })
      .catch(err => {
        this.$error(err.message);
      });
    },
    updated() {
      console.log(this.remarkTxt);
    }
};
</script>

<style lang="less" scoped>
  .dialog-box{
    width: 440px;
    height: 330px;
   /deep/ .el-form-item__error{
     line-height: 0;
     left: 22px;
    }
  }
   /* 字体 */
  .strong_font {
    font-weight: bold;
  }
  .gray_font {
    color: #666;
    font-size: 14px;
  }
  .blue_font{
    font-size: 14px;
    color: #538bf1;
  }
  .black_font {
    font-size: 14px;
    color: #151515;
  }
  /* 标题 */
  .product-title{
    height: 60px;
  }
  .product_title_head{
    line-height: 80px;
  }
  .el-icon-close {
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
    width: 12.4px;
    font-weight: bold;
  }
  .double_num{
    text-align: left;
    margin-left: 20px;
    font-size: 12px;
    color: #333333;
    letter-spacing: 1.38px;
  }
  /deep/.el-textarea__inner{
    height: 120px;
    width: 400px;
    margin: 10px 10px 10px 20px;
    border: 1px solid #E9E9E9;
    border-radius: 4px;
    resize: none;
  }
  .remark_btn{
    width: 200px;
    height: 40px;
  }
</style>
