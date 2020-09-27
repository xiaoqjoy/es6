<template>
  <!-- 还款计划 -->
  <div class='product_cart'>
    <!-- 还款计划主体 -->
     <div class="product_cart_main">
       <!-- 还款计划头部 -->
       <div class="product_cart_top">
         <div style="width:30px;height:30px" @click='linkTo("/product-income")'>
           <div class="p_i_left"><img :src="back_img" alt=""></div>
         </div>
         <div class="p_i_com">还款计划</div>
         <div class="p_i_right"><img :src="cancel_img" alt=""></div>
       </div>
       <!-- 还款计划的信息 -->
       <div class="product_cart_userInfo">
           <div class="product_cart_userInfo_main" ref="product_cart_userInfo_main">
             <div v-if="isConfirm" class="Product_warranties_userInfo_shade" ref="Product_warranties_userInfo_shade"></div>
                <div class="md-example-child md-example-child-date-picker md-example-child-date-picker-3">
                  <!-- 贷款金额 -->
                  <div class="product_cart_item_box">
                    <div class="product_cart_item">
                      <!-- item左边 -->
                      <div class="product_cart_item_left"><span>贷款金额</span></div>
                      <!-- item右边 -->
                      <div class="warranties_input_box">
                        <span class="warranties_input">{{thousand(repaymentdata.businessSum)}}元</span>
                      </div>
                    </div>
                  </div>
                   <!-- 已还期数 -->
                  <div class="product_cart_item_box">
                    <div class="product_cart_item">
                      <!-- item左边 -->
                      <div class="product_cart_item_left"><span>已还期数</span></div>
                      <!-- item右边 -->
                      <div class="warranties_input_box">
                        <span class="warranties_input">{{repaymentdata.repayedSterm}}期</span>
                      </div>
                    </div>
                  </div>
                  <!-- 贷款期限 -->
                  <div class="product_cart_item_box">
                    <div class="product_cart_item">
                      <!-- item左边 -->
                      <div class="product_cart_item_left"><span>贷款期限</span></div>
                      <!-- item右边 -->
                      <div class="warranties_input_box">
                        <span class="warranties_input">{{repaymentdata.loanSterm}}月</span>
                      </div>
                    </div>
                  </div>
                  <!-- 贷款本金余额 -->
                  <div class="product_cart_item_box">
                    <div class="product_cart_item">
                      <!-- item左边 -->
                      <div class="product_cart_item_left"><span>贷款本金余额</span></div>
                      <!-- item右边 -->
                      <div class="warranties_input_box">
                        <span class="warranties_input">{{thousand(repaymentdata.normalBalance)}}元</span>
                      </div>
                    </div>
                  </div>
                  <!-- 本期应还金额 -->
                  <div id="product_cart_item_boxb" class="product_cart_item_box">
                    <div class="product_cart_item">
                      <!-- item左边 -->
                      <div class="product_cart_item_left"><span>本期应还金额</span></div>
                      <!-- item右边 -->
                      <div class="warranties_input_box">
                        <span class="warranties_input">{{thousand(repaymentdata.currentRepaymentAmt)}}元</span>
                      </div>
                    </div>
                  </div>
           </div>
        </div>
        <div class="prompt" v-if="repaymentdata.message">
          <p>温馨提示：</p>
          <p>{{repaymentdata.message}}<span style="color: #538BF1;">{{repaymentdata.phone}}</span></p>
        </div>
      </div>
       <!-- 还款操作指引按钮 -->
       <div class="product_cart_submit">
         <div class="p_i_s_main">
           <button class="submit" @click="submit" ref='productWarrantiesButton'>还款操作指引</button>
         </div>
       </div>
     </div>
  </div>
</template>
<script>
import axios from 'axios'
import { laappApi } from "../js/server.js"; // 接口
export default {
  name: 'Product-cart',
  data () {
    return {
      // 还款计划数据
      repaymentdata: {},
      // 是否提交过
      isConfirm: false,
      // ‘取消’图片
      cancel_img: require("@/assets/ic_close_2@3x.png"),
      // ‘返回’图片
      back_img: require("@/assets/ic_back@2x.png"),
      // 向右图标
      toRight: require("@/assets/ic_arrow_right_2@2x.png")
    }
  },
  created() {
    this.repaymentPlan();
  },
  methods: {
    // 还款计划数据
    repaymentPlan() {
      this.repaymentdata = JSON.parse(localStorage.getItem("planData"));
    },
    // 千分位过滤
    thousand(a) {
      var arr = new Array(); 
      var xiaoshu = "";  //用来记录参数小数数值包括小数点
      var zhengshu ="";  //用来记录参数录整数数值
      if(a<1000) {    //当参数小于1000的时候直接返回参数
        return a;
      } else {
       var t = a.toString();   //将整数转换成字符串
        if(t.indexOf('.')>0){   //如果参数存在小数，则记录小数部分与整数部分
            var index = t.indexOf('.');
            xiaoshu = t.slice(index,t.length);
            zhengshu = t.slice(0,index);
        } else {   //否则整数部分的值就等于参数的字符类型
          zhengshu = t;
        }
        var num = parseInt(zhengshu.length/3);   //判断需要插入千位分割符的个数
        //将整数1234567890部分拆分为2部分，变量head:1   变量body:123456789
        var head = zhengshu.slice(0,zhengshu.length-num*3);  
        if(head.length>0){  //如果head存在，则在head后面加个千位分隔符，
            head += ',';
        }
        var body = zhengshu.slice(zhengshu.length-num*3,zhengshu.length);
        //将body字符串123456789转换成一个字符数组arr2 = ['123','456','789']
        var arr2 = new Array();   
        for(var i=0;i<num;i++){
            arr2.push(body.slice(i*3,i*3+3));
        }
        body = arr2.join(',');   //将数组arr2通过join(',')   方法，拼接成一个以逗号为间隔的字符串
        zhengshu = head + body;  //拼接整数部分
        var result = zhengshu + xiaoshu;   //最后拼接整数和小数部分
        return result;   //返回结果
      }
    },
    // 点击跳转到指定页面
	  linkTo(href) {
		  window.history.back()
	  },
    // 还款操作指引按钮
    submit() {
      this.$router.push({path: '/repayment-guidelines'});
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '@/lib/reset.scss'; 
  
  //  产品收入信息(信用卡供车) 
  .product_cart {
    @include rect(100%, 100%);
    @include background-color(#F0F4F7);
    position: relative;
    // 产品收入信息(信用卡供车)主体
    .product_cart_main {
      @include rect(100%, 100%);
      @include flexbox();
      @include flex-direction(column);
      // 产品收入信息(信用卡供车)头部
      .product_cart_top {
        @include rect(100%, .44rem);
        @include background-color(#fff);
        @include flexbox();
        @include justify-content(space-between);
        @include align-items(center);
        padding: 0 .15rem;
        border-bottom: 1px solid #D3D3D3;
        .p_i_left {
          img {
            @include rect(.1rem, .16rem);
          }
        }
        .p_i_com {
          margin-left: -10%;
          @include font-size(.18rem);
          @include text-color(#04223D);
          font-family: 'PingFang-SC-Medium';
          @include font-weight(bold);
        }
        .p_i_right {
          img {
            display: none;
            @include rect(.155rem, .155rem);
          }
        }
      }
      // 产品收入信息(信用卡供车)客户的信息
      .product_cart_userInfo {
        @include flex();
        @include rect(100%, auto);
        @include background-color(#F0F4F7);
        padding-top: .1rem;
        overflow: visible;
        .prompt{
          padding: .15rem .1rem;
          font-size: .14rem;
          p:nth-child(1){
            color: #4FBFBD;
          }
          p:nth-child(2){
            color: #A7A9A7;
          }
        }
         // 遮罩
        .Product_warranties_userInfo_shade {
          @include rect(100%, 100%);
          position: absolute;
          top: 0;
          left: 0;
          background: #A7A9A7;
          opacity: .5;
          z-index: 99;
        }
        // 产品收入信息(信用卡供车)客户信息主体
        .product_cart_userInfo_main {
          position: relative;
          @include rect(100%, auto);
          padding-left: .15rem;
          @include background-color(#fff);
          border-bottom: 1px solid #D3D3D3;
          #product_cart_item_boxb {
            @include rect(100%, .5rem);
            padding-right: .15rem;
            border-bottom: 0px solid #D3D3D3;
            position: relative;
            // 日期遮罩
            .loans_settle_date_shade {
              background: #eee;
              opacity: 0.5;
              @include rect(100%, 100%);
              position: absolute;
              top: 0;
              left: 0;
              z-index: 99;
              display: none;
            }
            .product_cart_item {
              @include rect(100%, 100%);
              @include flexbox();
              @include justify-content(space-between);
              @include align-items(center);
              .product_cart_item_left {
                span {
                  @include text-color(#A7A9A7);
                  @include font-size(.15rem);
                }
              }
              .product_cart_item_right {
                @include flexbox();
                .placeSelect {
                  span {
                    @include font-size(.15rem);
                  }
                }
                .toRight {
                  margin-left: .1rem;
                  @include flexbox();
                  @include justify-content();
                  @include align-items();
                  img {
                    @include rect(.06rem, .11rem);
                  }
                }
              }
            }
          }
          .product_cart_item_box {
            @include rect(100%, .5rem);
            padding-right: .15rem;
            border-bottom: 1px solid #D3D3D3;
            position: relative;
            // 日期遮罩
            .loans_settle_date_shade {
              background: #eee;
              opacity: 0.5;
              @include rect(100%, 100%);
              position: absolute;
              top: 0;
              left: 0;
              z-index: 99;
              display: none;
            }
            .product_cart_item {
              @include rect(100%, 100%);
              @include flexbox();
              @include justify-content(space-between);
              @include align-items(center);
              .product_cart_item_left {
                span {
                  @include text-color(#A7A9A7);
                  @include font-size(.15rem);
                }
              }
              .product_cart_item_right {
                @include flexbox();
                .placeSelect {
                  span {
                    @include font-size(.15rem);
                  }
                }
                .toRight {
                  margin-left: .1rem;
                  @include flexbox();
                  @include justify-content();
                  @include align-items();
                  img {
                    @include rect(.06rem, .11rem);
                  }
                }
              }
            }
          }
            // 日期遮罩
            .loans_settle_date_shade {
              background: #eee;
              opacity: 0.5;
              @include rect(100%, 100%);
              position: absolute;
              top: 0;
              left: 0;
              z-index: 99;
              display: none;
            }
          .firm_tax_item_box {
            @include rect(100%, .49rem);
            padding-right: .15rem;
            border-bottom: 1px solid #D3D3D3;
            position: relative;
            // mint ui 中 cell样式修改
            .mint-cell {
              color: #7D859B;
              background-image: none;
              .mint-cell-wrapper {
                padding: 0;
                background-image: none;
                font-size: .15rem;
                .mint-cell-value {
                  color: #A7A9A7;
                  .place-show {
                    margin-right: .1rem;
                    text-align: right;
                  }
                }
              }
            }
            .firm_tax_item {
              @include rect(100%, 100%);
              @include flexbox();
              @include justify-content(space-between);
              @include align-items(center);
              .firm_tax_item_left {
                span {
                  @include text-color(#7D859B);
                  @include font-size(.15rem);
                }
              }
              .firm_tax_item_right {
                @include flexbox();
                .placeSelect {
                  text-align: right;
                  span {
                    @include font-size(.15rem);
                  }
                }
                .toRight {
                  margin-left: .1rem;
                  @include flexbox();
                  @include justify-content();
                  @include align-items();
                  img {
                    @include rect(.06rem, .11rem);
                  }
                }
              }
            }
          }
        }
      }
      // 产品收入信息(信用卡供车)提交按钮
      .product_cart_submit {
        @include rect(100%, auto);
        padding: .15rem;
        .p_i_s_main {
          .submit {
            @include rect(100%, .49rem);
            @include border-radius(.05rem);
           background: #4fbfbd;
            // background: url('../../assets/btn_1@2x.png') no-repeat;
            // background: url('../../assets/btn_1@2x.png') no-repeat;
            border: none;
            @include font-size(.16rem);
            @include text-color(#fff);
            font-weight: bold;
            
          }
        }
      }
    }
    
    
  }

  //  点击‘请选择’ 出现的遮罩弹窗 
  .checkShade {
    display: none;
    @include rect(100%, 100%);
    position: absolute;
    top: 0;
    left: 0;
    .checkShade_main {
      @include rect(100%, 100%);
      position: relative;
      .checkShade_warp {
        @include rect(100%, 100%);
        @include background-color(#333);
        position: absolute;
        top: 0;
        left: 0;
        opacity: .4;
      }
      .checkShade_content {
        z-index: 999;
        @include rect(100%, 3.74rem);
        @include background-color(#F0F4F7);
        position: absolute;
        bottom: 0;
        left: 0;
        @include flexbox();
        @include flex-direction(column);
        .checkShade_con_top {
          @include rect(100%, .49rem);
          @include background-color(#fff);
          @include flexbox();
          @include justify-content(center);
          @include align-items(center);
          position: relative;
          .checkShade_cancel {
            position: absolute;
            top: 0;
            left: 0;
            @include rect(.45rem, 100%);
            @include flexbox();
            @include justify-content(center);
            @include align-items(center);
            img {
              @include rect(.15rem, .15rem);
            }
          }
          .checkShade_userType {
            span {
              @include font-size(.18rem);
              @include text-color(#032238);
            }

          }
        }
        .checkShade_con_con_wrap {
          @include flex();
          @include rect(100%, auto);
          padding: .1rem 0;
          overflow: hidden;
          .checkShade_con_con {
            @include rect(100%, 100%);
            @include background-color(#F0F4F7);
            overflow: auto;
            .checkShade_item {
              @include rect(100%, .49rem);
              @include background-color(#fff);
              border-bottom: 1px solid #D3D3D3;
              padding: 0 .15rem;
              .checkShade_item_main {
                @include rect(100%, 100%);
                @include flexbox();
                @include justify-content(space-between);
                @include align-items();
                .checkShade_item_left {
                  span {
                    @include text-color(#032238);
                    @include font-size(.16rem);
                  }
                }
                .checkShade_item_right {
                  display: none;
                  img {
                    @include rect(.18rem, .13rem);
                  }
                }
              }
            }
          }
        }
        .checkShade_con_buttom {
          @include rect(100%, .49rem);
          @include background-color(#fff);
          @include flexbox();
          @include justify-content();
          @include align-items();
          span {
            @include text-color(#4fbfbd);
            @include font-size(.16rem); 
          }
        }
      }
    }
    
  }

  // 公共样式
     // 输入框input的样式
     .warranties_span {
       @include rect(1.6rem, .48rem);
       @include text-color(#D60D0D);
       @include font-size(.24rem);
       border: none;
       text-align: right;
      //  padding-right: .16rem;
       &::-webkit-input-placeholder{ /*WebKit browsers*/
          font-size: 0.15rem;
          color: #A7A9A7;
       }
       &::-moz-input-placeholder{ /*Mozilla Firefox*/
          font-size: 0.15rem;
          color: #A7A9A7;
        }
       &::-ms-input-placeholder{ /*Internet Explorer*/ 
          font-size: 0.15rem;
          color: #A7A9A7;
       }
     }
     .warranties_input {
       @include rect(1.6rem, .48rem);
       @include text-color(#04223D);
       @include font-size(.15rem);
       border: none;
       text-align: right;
      //  padding-right: .16rem;
       &::-webkit-input-placeholder{ /*WebKit browsers*/
          font-size: 0.15rem;
          color: #A7A9A7;
       }
       &::-moz-input-placeholder{ /*Mozilla Firefox*/
          font-size: 0.15rem;
          color: #A7A9A7;
        }
       &::-ms-input-placeholder{ /*Internet Explorer*/ 
          font-size: 0.15rem;
          color: #A7A9A7;
       }
     }
     // 字体颜色加深 color: #04223D
     .color_deepen {
       @include text-color(#04223D);
     }
     // 字体颜色浅灰色 color: #A7A9A7
     .color_thin {
       @include text-color(#A7A9A7);
     }
</style>
