<template>
  <div class="import-message">
    <div class="dialog-mask" @click="close_()"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <span class="product_title_head strong_font">发起调查</span>
        <span class="el-icon-close button button__close" @click="close_()"></span>
      </div>
      <div class="anti-fraud_dialog-box__middle">
        <div class="anti-fraud_dialog-box__middle_title">调查一</div>
          <div class="clearfloat">
            <div class="top_conten"><span class="top_conten_title">发起人：</span><span class="top_content_font">张三</span></div>
            <div class="top_conten"><span class="top_conten_title">补件时间：</span><span class="top_content_font">2018/04/18</span></div>
          </div>
          <div class="clearfloat">
            <div class="top_conten"><span class="top_conten_title">发起调查原因：</span><span class="top_content_font">房产查档单位客户本人提供，非我司人员陪同查询</span></div>
          </div>
          <div class="clearfloat">
            <div class="top_conten"><span class="top_conten_title">其他备注：</span><span class="top_content_font">房产查档打啥都会就看见萨达哈还是打卡刷卡机多少卡</span></div>
          </div>
      </div>
      <div class="product-content">
        <p>退回原因</p>
        <el-select placeholder="请选择" class="select">
          <el-option>
          </el-option>
        </el-select>
        <div class="product-content-title">
          <span></span>
          备注
        </div>
        <textarea>房产查档单位客户本人提供，非我司人员陪同查询</textarea>
      </div>
      <el-button type="primary">主要按钮</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      close_() {
      this.$emit("clsoe_windowAlert");
    }
  }
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .dialog-box{
    width: 946px;
    height: 616px;
    .anti-fraud_dialog-box__middle {
      width: 886px;
      height: 200px;
      overflow: hidden;
      padding: 10px 0;
      background: #fff;
      border-radius: 4px;
      margin: 10px auto 20px auto;
      border: 1px solid #E9E9E9;
      .anti-fraud_dialog-box__middle_title{
        border-bottom: 1px solid #E9E9E9;
        line-height: 40px;
      }
  }
  .product-content{
    margin: 9px;
    width: 886px;
    margin: 20px auto;
    > p {
      text-align: left;
      line-height: 40px;
      font-size: 12px;
      color: #BBBBBB;
      letter-spacing: 1.09px;
    }
    > .select {
      width: 886px;
      text-align: left;
    }
    > textarea {
      border: 1px solid #E5E5E5;
      border-radius: 4px;
      resize: none;
      width: 886px;
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
}
</style>
