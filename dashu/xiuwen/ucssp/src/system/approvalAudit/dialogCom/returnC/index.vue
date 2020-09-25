<template>
  <div class="import-message">
    <div class="dialog-mask" @click="close_()"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <span class="product_title_head strong_font">退回</span>
        <span class="el-icon-close button button__close" @click="close_()"></span>
      </div>
      <div class="anti-fraud_dialog-box__middle">
        <div class="anti-fraud_dialog-box__middle_title">第一次退回</div>
          <div class="clearfloat">
            <div class="top_conten"><span class="top_conten_title">发审计人员：</span><span class="top_content_font">张三</span></div>
            <div class="top_conten"><span class="top_conten_title">补件退回时间：</span><span class="top_content_font">2018/04/18</span></div>
          </div>
          <div class="clearfloat">
            <div class="top_conten"><span class="top_conten_title">退回原因：</span><span class="top_content_font">房产查档单位客户本人提供，非我司人员陪同查询</span></div>
          </div>
          <div class="clearfloat">
            <div class="top_conten"><span class="top_conten_title">备注：</span><span class="top_content_font">房产查档打啥都会就看见萨达哈还是打卡刷卡机多少卡</span></div>
          </div>
      </div>
      <div class="anti-fraud_dialog-box__middle">
        <div class="anti-fraud_dialog-box__middle_title">第二次退回</div>
          <div class="clearfloat">
            <div class="top_conten"><span class="top_conten_title">审计人员：</span><span class="top_content_font">张三</span></div>
            <div class="top_conten"><span class="top_conten_title">退回时间：</span><span class="top_content_font">2018/04/18</span></div>
          </div>
          <div class="clearfloat">
            <div class="top_conten"><span class="top_conten_title">退回原因：</span><span class="top_content_font">房产查档单位客户本人提供，非我司人员陪同查询</span></div>
          </div>
          <div class="clearfloat">
            <div class="top_conten"><span class="top_conten_title">备注：</span><span class="top_content_font">房产查档打啥都会就看见萨达哈还是打卡刷卡机多少卡</span></div>
          </div>
      </div>
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
  .import-message{
    .dialog-box{
      height: 520px;
      .dialog-box__top{
        box-shadow: 0 1px 6px 0 rgba(239,239,239,0.74);
      }
      width: 600px;
      .anti-fraud_dialog-box__middle {
        width: 560px;
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
