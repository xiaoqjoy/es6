<template>
  <div>
    <div class="import-message3">
      <div class="dialog-mask"></div>
      <div class="dialog-box">
        <div class="dialog-box__top">
          <h5 class="title bg__white">退回</h5>
          <span class="el-icon-close button button__close" @click="close_()"></span>
        </div>
        <div class="title_span">
          <div><span class="blue_title"></span>
          <span class="title_font">备注</span></div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
         <el-form-item prop="siReturnDesc">
          <el-input type="textarea" v-model="ruleForm.siReturnDesc"></el-input>
         </el-form-item>
        </el-form>
        </div>
      <div class="dialog-box-div">
        <el-button type="primary" @click="submitForm('ruleForm')">确认退回</el-button>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { patchApi } from '../../../js/server.js';
  export default {
    props: ['isDispose', 'siTaskId', 'remark', 'refresh', 'siBusinessId'],
    data() {
      return {
        rules: {
          siReturnDesc: [
            { required: true, message: '请输入退回原因', trigger: 'blur' },
            { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
          ]},
        url: '',
        ruleForm: {
          siReturnDesc: ''
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submit();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      submit() {
          let rollbackInfoReq = {
            // applicationId: this.applicationId,
            siBusinessId: this.siBusinessId,
            siTaskId: this.siTaskId,
            siReturnDesc: this.ruleForm.siReturnDesc
          };
          this.$MyFetch.post(patchApi.review.rollback, rollbackInfoReq)
          .then(data => {
            this.refresh(1, 10);
            this.close_();
            this.close_AB();
        })
        .catch(err => {
          this.$error(err.message);
        });
      },
      close_AB() {
        this.$emit("close_AB");
      },
      close_() {
        this.$emit("clsoe_windowAlert");
      }
    },
    created() {
      // console.log(this.remark, remark);
    }
  };
</script>

<style lang="less" scoped>
  .import-message3{
  .dialog-mask{
    z-index: 1004;
  }
  .dialog-box{
    z-index: 1005;
    width: 946px;
    height: 350px;
    .dialog-box__top{
      box-shadow: none;
      .title{
        font-weight: bold;
      }
    }
    .money{
      margin: 5px;
      color: @yellow;
    }
    .dialog-box-div{
      // margin: 20px 0;
    }
    .dialog-box-div > button {
        width: 100px;
        height: 40px;
      }
    .dialog-box-btn{
        background: #F8F8F8;
        border: 1px solid #DDDDDD;
      }
      .title_span{
        text-align: left;
        margin: 0 30px;
        > div {
          margin: 5px 0;
        }
        .blue_title{
          display: inline-block;
          background: #538bf1;
          width: 2px;
          height: 16px;
        }
        .title_font{
          font-size: 14px;
          color: #333333;
          letter-spacing: 0;
        }
       /deep/.el-textarea__inner{
          background: #ececec;
            border: 1px solid #d0d0d0;
            border-radius: 4px;
            width: 886px;
            height: 140px;
            resize: none;
            margin: 20px 0;
        }
      }
  }
}
</style>
