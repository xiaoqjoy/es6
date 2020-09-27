<template>
  <div class="import-message">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <span class="title">退回</span>
        <span class="el-icon-close button button__close" @click="close_()"></span>
      </div>
      <div class="scrollbar">
      <div class="anti-fraud_dialog-box__middle" v-for="(item, index) in comebackHis" :key="index">
        <div class="anti-fraud_dialog-box__middle_title">第{{index+1}}次退回</div>
          <div class="clearfix">
            <div class="top_conten"><span class="top_conten_title">审计人员：</span><span class="top_content_font">{{item.createdBy}}</span></div>
            <div class="top_conten"><span class="top_conten_title">退回时间：</span><span class="top_content_font">{{item.createdDate}}</span></div>
          </div>
          <div class="clearfix">
            <div class="top_conten"><span class="top_conten_title">退回原因：</span><span class="top_content_font"  v-for="(i, k) in content" :key="k">{{i.configTitle}}</span></div>
          </div>
          <div>
            <div class="f__left top_conten"><span class="top_conten_title">备注：</span><span class="top_content_font">{{item.opinionTxt}}</span></div>
          </div>
      </div>
      <div class="product-content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top" label-width="100px" class="demo-ruleForm" hide-required-asterisk>
          <el-form-item label="退回原因" prop="region">
            <el-select :disabled='disabled' class="form__select" v-model="ruleForm.region" placeholder="请选择">
              <el-option  v-for="item in comebackReasonCode"
            :key="item.configCode"
            :label="item.configTitle"
            :value="item.configCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" class="el-form__remark">
            <el-input :disabled="disabled" class="form__textarea" type="textarea" v-model="remarkTxt" maxlength="200" resize="none"></el-input>
          </el-form-item>
        </el-form>
      </div>
      </div>
      <el-button :disabled="disabled" type="primary" class="remark_btn" @click="submitForm">确认退回</el-button>
    </div>
  </div>
</template>

<script>
import { aprAudApi } from "../../js/server.js";

export default {
  data() {
    return {
      rejectReasonCode: '',
      isAddComeback: false,
      InitiationShow: false,
      showBtn: true,
      surveyReasonCode: [],
      content: [],
      label: '',
      value: '',
      remarkTxt: '',
      InitiationSend: false,
      ruleForm: {
        region: '',
        desc: ''
      },
      rules: {
        region: [
          { required: true, message: '分类内容不能为空', trigger: 'change' }
        ]
      }
    };
  },
  props: ['comebackReasonCode', 'comebackHis', 'appOrAud', 'disabled', 'surveyStatusCode'],
  created() {
    console.log(this.comebackHis, '退回历史值');
    this.getValue(this.comebackHis[0].rejectReasonCode, 0);
    this.isShowBtn();
  },
  methods: {
    getValue(item, index) {
        var data = {
        configType: "aud_return_reason",
        configValue: item
      };
      this.$MyFetch.get(aprAudApi.taskDetail.OperationTranConfig, data)
      .then(data => {
        this.content = data;
      })
      .catch(err => {
        this.$error(err.message);
      });
    },
    addComeback() {
      this.isAddComeback = false;
    },
    submitForm() {
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            let data = {
            remarkTxt: this.remarkTxt,
            sendBackReasonCode: [this.ruleForm.region]
          };
          this.$MyFetch.post(`${aprAudApi.aud.taskDetail.sendBackOper}/${this.$route.query.appID}`, data)
          .then((data = {}) => {
            console.log('发起调查成功');
            this.$emit("surveyStatusCodeChange");
            this.$router.push({name: 'audit-pending', path: '/audit-pending'});
          })
          .catch(err => {
            this.$error(err.message);
          });
          this.close_();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    isShowBtn() {
      if (this.surveyStatusCode === 'Underway') {
          this.showBtn = false;
        }
    },
    InitiationTo() {
      this.InitiationShow = true;
      this.InitiationSend = true;
    },
    getReason(data) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .get(aprAudApi.taskDetail.OperationConfig, data)
          .then((data = {}) => {
            resolve(data);
          })
          .catch(err => {
            this.$error(err.message);
          });
      });
    },
    getTreeValue() {
      return new Promise((resolve, reject) => {
        var query = {
        configType: "aud_return_reason"
      };
      this.getReason(query)
        .then(data => {
          resolve(data);
          this.surveyReasonCode = data;
          console.log(this.surveyReasonCode, '888');
          if (this.surveyHis.length === 1) {
            let obj = this.surveyReasonCode.filter(v => {
              return v.configCode === this.surveyHis[0].surveyReasonCode;
            });
            this.surveyHis[0].surveyReasonCode = obj[0].configDesc;
            this.showBtn = true;
          } else if (this.surveyHis.length === 2) {
            this.showBtn = false;
            let obj = this.surveyReasonCode.filter(v => {
              return v.configCode === this.surveyHis[0].surveyReasonCode;
            });
            this.surveyHis[0].surveyReasonCode = obj[0].configDesc;
            let obj2 = this.surveyReasonCode.filter(v => {
              return v.configCode === this.surveyHis[1].surveyReasonCode;
            });
            this.surveyHis[1].surveyReasonCode = obj2[1].configDesc;
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
      });
    },
    close_() {
      this.$emit("clsoe_windowAlert");
    }
  },
  computed: {
    isShow() {
      if (this.surveyStatusCode === "Underway") {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.dialog-box {
  width: 600px;
  height: 540px;
  /deep/.el-form-item{
    margin-right: 0;
  }
  .scrollbar{
    max-height: 410px;
    overflow-y: auto;
  }
  .product-title-img {
    > img {
      width: 20px;
      height: 20px;
      position: absolute;
      right: 100px;
      top: 20px;
    }
  }
  .dialog-box-group {
    position: absolute;
    right: 40px;
  }
  .anti-fraud_dialog-box__middle {
    width: 560px;
    height: 200px;
    overflow: hidden;
    padding: 10px 0;
    background: #fff;
    border-radius: 4px;
    margin: 10px auto 20px auto;
    border: 1px solid #e9e9e9;
    .anti-fraud_dialog-box__middle_title {
      border-bottom: 1px solid #e9e9e9;
      line-height: 40px;
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
  .blue_font {
    font-size: 14px;
    color: #538bf1;
  }
  .black_font {
    font-size: 14px;
    color: #151515;
  }
  /* 标题 */
  .product-title {
    height: 60px;
  }
  .product_title_head {
    line-height: 80px;
  }
  .el-icon-close {
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
    // width: 12.4px;
    font-weight: bold;
  }
  .product-content{
    margin: 9px;
    width: 560px;
    margin: 20px auto;
    > p {
      text-align: left;
      line-height: 40px;
      font-size: 12px;
      color: #BBBBBB;
      letter-spacing: 1.09px;
    }
    > .select {
      width: 480px;
      text-align: left;
    }
    .textareaRemak {
      border: 1px solid #E5E5E5;
      border-radius: 4px;
      resize: none;
      width: 556px;
      height: 102px;
    }
    .product-content-title{
      font-size: 14px;
      color: #333333;
      text-align: left;
      > span {
        border: 1px solid #538BF1;
        margin-right: 10px;
      }
      line-height: 50px;
    }
    .el-scrollbar__viewOPT{
      width: 500px;
      .el-scrollbar__view .el-select-dropdown__list{
        > li {
          overflow: hidden;
          width: 500px;
        }
      }
    }
  }
  .el-form{
      text-align: left;
        .form__select{
      width: 556px;
    }
    .form__textarea{
      width: 556px;
    }
    .text__center{
      text-align: center;
    }
    .el-form__remark{
      /deep/  .el-form-item__label{
        border-left: 2px solid #538BF1;
        font-size: 14px;
        color: #333333;
        margin-bottom: 10px;
        padding: 0 0 0 5px;
    }
    }
    }
    .remark_btn{
      width: 200px;
    }
}
.top_conten {
  float: left;
  margin-left: 20px;
  margin-right: 50px;
  padding-top: 10px;
}
.top_conten_title {
  font-size: 14px;
  color: #666;
  text-align: center;
  line-height: 20px;
}
.top_content_font {
  font-size: 14px;
  color: #000000;
  letter-spacing: 0.86px;
  line-height: 20px;
}
/deep/ .dialog-box .el-select .el-select__tags {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 30px;
  }
</style>
