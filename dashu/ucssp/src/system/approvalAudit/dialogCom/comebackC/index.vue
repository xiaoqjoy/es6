<template>
  <div class="import-message">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <span class="title">退回</span>
        <span class="el-icon-close button button__close" @click="close_()"></span>
      </div>
      <div class="scrollbar">
      <div class="anti-fraud_dialog-box__middle">
        <div class="anti-fraud_dialog-box__middle_title">第一次退回</div>
          <div class="clearfix">
            <div class="top_conten"><span class="top_conten_title">审计人员：</span><span class="top_content_font">{{comebackHis[0].createdBy}}</span></div>
            <div class="top_conten"><span class="top_conten_title">退回时间：</span><span class="top_content_font">{{comebackHis[0].createdDate}}</span></div>
          </div>
          <div class="clearfix">
            <div class="top_conten"><span class="top_conten_title">退回原因：</span><span v-for="(i, k) in content0" :key="k" class="top_content_font">{{i.configTitle}}</span></div>
          </div>
          <div>
            <div class="f__left top_conten"><span class="top_conten_title">备注：</span><span class="top_content_font">{{comebackHis[0].opinionTxt}}</span></div>
          </div>
      </div>
      <div class="anti-fraud_dialog-box__middle">
        <div class="anti-fraud_dialog-box__middle_title">第二次退回</div>
          <div class="clearfix">
            <div class="top_conten"><span class="top_conten_title">审计人员：</span><span class="top_content_font">{{comebackHis[1].createdBy}}</span></div>
            <div class="top_conten"><span class="top_conten_title">退回时间：</span><span class="top_content_font">{{comebackHis[1].createdDate}}</span></div>
          </div>
          <div class="clearfix">
            <div class="top_conten"><span class="top_conten_title">退回原因：</span><span v-for="(i, k) in content1" :key="k" class="top_content_font">{{i.configTitle}}</span></div>
          </div>
          <div>
            <div class="f__left top_conten"><span class="top_conten_title">备注：</span><span class="top_content_font">{{comebackHis[1].opinionTxt}}</span></div>
          </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { aprAudApi } from "../../js/server.js";

export default {
  data() {
    return {
      rejectReasonList: [],
      rejectReasonCode: '',
      InitiationShow: false,
      showBtn: true,
      surveyReasonCode: [],
      content0: [],
      content1: [],
      label: '',
      value: '',
      remarkTxt: '',
      InitiationSend: false,
      ruleForm: {
        region: [],
        desc: ''
      },
      rules: {
        region: [
          { required: true, message: '分类内容不能为空', trigger: 'change' }
        ]
      }
    };
  },
  props: ['comebackHis', 'appOrAud'],
  created() {
    for (let i = 0; i < this.comebackHis.length; i++) {
      this.getValue(this.comebackHis[i].rejectReasonCode, i);
    }
  },
  methods: {
    getValue(item, index) {
      return new Promise((resolve, reject) => {
        var data = {
        configType: "aud_return_reason",
        configValue: item
      };
      this.$MyFetch.get(aprAudApi.taskDetail.OperationTranConfig, data)
      .then(data => {
        if (index) {
          this.content1 = data;
        } else {
          this.content0 = data;
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
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.dialog-box {
  width: 600px;
  height: 520px;
  .dialog-box__top{
    box-shadow: none;
    margin-bottom: 0;
  }
  .scrollbar{
    max-height: 480px;
    overflow-y: auto;
  }
  .product-title-img {
    > img {
      width: 20px;
      height: 20px;
      // margin: 10px auto;
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
    padding: 0 0 10px 0;
    background: #fff;
    border-radius: 4px;
    margin: 0 auto 20px auto;
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
    line-height: 60px;
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
      border: 1px solid #d0d0d0;
      border-radius: 4px;
      resize: none;
      width: 480px;
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
      width: 480px;
    }
    .form__textarea{
      width: 480px;
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
