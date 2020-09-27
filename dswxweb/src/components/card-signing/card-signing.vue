<template>
  <!-- 还款计划 -->
  <div class="product_cart">
    <!-- 还款计划主体 -->
    <div class="product_cart_main">
      <!-- 还款计划头部 -->
      <div class="product_cart_top">
        <div style="width:30px;height:30px" @click="linkTo">
          <div class="p_i_left">
            <img :src="back_img" alt />
          </div>
        </div>
        <div class="p_i_com">银行卡签约</div>
        <div class="p_i_right"></div>
      </div>
      <!-- 还款计划的信息 -->
      <div class="product_cart_userInfo">
        <div class="product_cart_userInfo_main" ref="product_cart_userInfo_main">
          <div
            v-if="isConfirm"
            class="Product_warranties_userInfo_shade"
            ref="Product_warranties_userInfo_shade"
          ></div>
          <div class="md-example-child md-example-child-date-picker md-example-child-date-picker-3">
            <!-- 手机号 -->
            <div class="product_cart_item_box">
              <div class="product_cart_item">
                <!-- item左边 -->
                <div class="product_cart_item_left">
                  <span>预留手机号</span>
                </div>
                <!-- item右边 -->
                <div class="warranties_input_box">
                  <span class="warranties_input">{{signingPageData?signingPageData.phone:''}}</span>
                </div>
                <!-- <div class="warranties_input_box">
                        <input class="warranties_input" @change="verifyMobile" type="text" v-model="phoneNumber" placeholder="请输入手机号" >
                </div>-->
              </div>
            </div>
            <!-- 图形验证码 -->
            <div class="product_cart_item_box">
              <div class="product_cart_item">
                <!-- item左边 -->
                <div class="product_cart_item_left">
                  <span>图形验证码</span>
                </div>
                <!-- item右边 -->
                <div class="warranties_input_box">
                  <input
                    id="warranties_note"
                    class="warranties_input"
                    type="text"
                    v-model="imgCode"
                    placeholder="请输入图形验证码"
                  />
                  <span style="color:#A7A9A7">|</span>
                  <img :src="imgUrl" alt="图形验证码" @click="getImgCode" class="imgCode" />
                </div>
              </div>
            </div>
            <!-- 验证码 -->
            <div id="product_cart_item_boxb" class="product_cart_item_box">
              <div class="product_cart_item">
                <!-- item左边 -->
                <div class="product_cart_item_left">
                  <span>验证码</span>
                </div>
                <!-- item右边 -->
                <div class="warranties_input_box">
                  <input
                    id="warranties_note"
                    class="warranties_input"
                    type="text"
                    v-model="messageCode"
                    placeholder="请输入短信验证码"
                  />
                  <span style="color:#A7A9A7">|</span>
                  <span
                    v-show="show"
                    @click="getCode"
                    style="color:#1199ED"
                    class="warranties_input"
                  >获取动态码</span>
                  <span v-show="!show" style="color:#4FBFBD" class="warranties_input">{{count}} s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 还款操作指引按钮 -->
      <div class="product_cart_submit">
        <div class="p_i_s_main">
          <button class="submit" @click="submit" ref="productWarrantiesButton">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import axios from "axios";
import { laappApi } from "../js/server.js"; // 接口
export default {
  name: "Product-cart",
  data() {
    return {
      // 银行卡签约数据（1）
      captchaInterfaceData: {},
      // 银行卡签约数据
      signingPageData: {},
      // url后面的参数
      parameters: {},
      // 控制显示倒计时还是文字
      show: true,
      // 图形验证码
      imgUrl: "",
      // 图形验证码
      imgId: "",
      // 图形验证码
      imgCode: "",
      // 倒计时60s
      count: "",
      // 倒计时3s
      count_s: "",
      // 倒计时初始值
      timer: null,
      // 倒计时3秒初始值
      timer_s: null,
      // 手机号
      phoneNumber: "",
      // 短信验证码
      messageCode: "",
      // 是否提交过
      isConfirm: false,
      // ‘照相机’图片
      camera_img: require("@/assets/ic_camera@2x.png"),
      // ‘取消’图片
      cancel_img: require("@/assets/ic_close_2@3x.png"),
      // ‘返回’图片
      back_img: require("@/assets/ic_back@2x.png"),
      // 向右图标
      toRight: require("@/assets/ic_arrow_right_2@2x.png")
    };
  },
  created() {
    this.getTheParam();
    this.getImgCode();
  },
  methods: {
    getImgCode() {
      axios({
        method: "post",
        url: `${laappApi.getImgCode}`
      }).then(res => {
        this.imgUrl = res.data.data.imageurl;
        this.imgId = res.data.data.id;
      });
    },
    // 把银行卡签约的数据带过来
    getTheParam() {
      this.signingPageData = JSON.parse(localStorage.getItem("myDataMent"));
    },
    // 获取短信验证码的接口
    captchaInterface() {
      axios({
        method: "post",
        url: `${laappApi.agreementPayment}`,
        // 请求头
        headers: {
          "Content-Type": "application/json"
        },
        data: {
          accountOwner: this.signingPageData.accountOwner,
          imageCode: this.imgCode,
          imageId: this.imgId,
          phone: this.signingPageData.phone, // 手机号
          idNo: this.signingPageData.idNo, // 身份证号
          name: this.signingPageData.name, // 姓名
          accountNo: this.signingPageData.accountNo // 银行卡号
        }
      }).then(res => {
        if (res.data.code == "0000") {
          console.log(res);
          this.captchaInterfaceData = res.data.data;
        } else {
          Toast({
            message: res.data.message,
            position: "middle",
            duration: 3000
          });
          if (res.data.code == "1012") {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
            this.getImgCode();
          }
        }
      });
    },
    // 短信验证码60s倒计时方法。
    getCode() {
      if (!this.imgCode) {
        Toast({
          message: "请先输入图形验证码",
          position: "middle",
          duration: 2000
        });
        return;
      }
      if (this.signingPageData.phone) {
        this.captchaInterface();
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
      }
    },
    // 点击跳转到指定页面
    linkTo(href) {
      this.$router.push({ path: "/card-list" });
    },
    // 倒计时三秒进入指定的页面
    threeGo() {
      const TIME_COUNT_COUNT = 3;
      if (!this.timer_s) {
        this.count_s = TIME_COUNT_COUNT;
        // this.show = false;
        this.timer_s = setInterval(() => {
          if (this.count_s > 0 && this.count_s <= TIME_COUNT_COUNT) {
            this.count_s--;
          } else {
            // this.show = true;
            clearInterval(this.timer_s);
            this.timer_s = null;
            this.$router.push({ path: "/card-list" });
          }
        }, 1000);
      }
    },
    // 认证按钮
    submit() {
      if (this.messageCode == "") {
        Toast({
          message: "验证码不能为空",
          position: "middle",
          duration: 5000
        });
      } else {
        axios({
          method: "post",
          url: `${laappApi.paymentAgreement}`,
          // 请求头
          headers: {
            "Content-Type": "application/json"
          },
          // 参数
          data: {
            accountOwner: this.signingPageData.accountOwner,
            phone: this.signingPageData.phone, // 手机号
            idNo: this.signingPageData.idNo, // 身份证号
            name: this.signingPageData.name, // 姓名
            accountNo: this.signingPageData.accountNo, // 银行卡号
            msgValideCode: this.messageCode, // 短信验证码
            orderNo: this.captchaInterfaceData.orderNo, // 订单号（流水号）
            agreementNo: this.captchaInterfaceData.agreementNo, // 协议号
            smsSeq: this.captchaInterfaceData.smsSeq // 短信流水号
          }
        }).then(res => {
          console.log(res);
          if (res.data.code == "0000" && res.data.data.hasNext == false) {
            // this.$router.push({path: '/credit-card'});
            Toast({
              message: "签约绑卡成功",
              position: "middle",
              duration: 3000
            });
            this.threeGo();
          } else if (res.data.data.hasNext == true) {
            localStorage.setItem("myDataMent", JSON.stringify(res.data.data));
            // this.$router.push({path: '/card-signing'});
            location.reload();
          } else {
            Toast({
              message: res.data.message,
              position: "middle",
              duration: 3000
            });
            this.threeGo();
          }
        });
      }
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/lib/reset.scss";

//  产品收入信息(信用卡供车)
.product_cart {
  @include rect(100%, 100%);
  @include background-color(#f0f4f7);
  position: relative;
  // 产品收入信息(信用卡供车)主体
  .product_cart_main {
    @include rect(100%, 100%);
    @include flexbox();
    @include flex-direction(column);
    // 产品收入信息(信用卡供车)头部
    .product_cart_top {
      @include rect(100%, 0.44rem);
      @include background-color(#fff);
      @include flexbox();
      @include justify-content(space-between);
      @include align-items(center);
      padding: 0 0.15rem;
      border-bottom: 1px solid #d3d3d3;
      .p_i_left {
        img {
          // display: none;
          @include rect(0.1rem, 0.16rem);
        }
      }
      .p_i_com {
        margin-left: -10%;
        @include font-size(0.18rem);
        @include text-color(#04223d);
        font-family: "PingFang-SC-Medium";
        @include font-weight(bold);
      }
      .p_i_right {
        img {
          @include rect(0.155rem, 0.155rem);
        }
      }
    }
    // 产品收入信息(信用卡供车)客户的信息
    .product_cart_userInfo {
      // @include flex();
      @include rect(100%, auto);
      @include background-color(#f0f4f7);
      padding-top: 0.1rem;
      overflow: visible;
      // 遮罩
      .Product_warranties_userInfo_shade {
        @include rect(100%, 100%);
        position: absolute;
        top: 0;
        left: 0;
        background: #a7a9a7;
        opacity: 0.5;
        z-index: 99;
      }
      // 产品收入信息(信用卡供车)客户信息主体
      .product_cart_userInfo_main {
        position: relative;
        @include rect(100%, auto);
        padding-left: 0.15rem;
        @include background-color(#fff);
        border-bottom: 1px solid #d3d3d3;
        #product_cart_item_boxb {
          @include rect(100%, 0.5rem);
          padding-right: 0.15rem;
          border-bottom: 0px solid #d3d3d3;
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
                @include text-color(#7d859b);
                @include font-size(0.15rem);
              }
            }
            .product_cart_item_right {
              @include flexbox();
              .placeSelect {
                span {
                  @include font-size(0.15rem);
                }
              }
              .toRight {
                margin-left: 0.1rem;
                @include flexbox();
                @include justify-content();
                @include align-items();
                img {
                  @include rect(0.06rem, 0.11rem);
                }
              }
            }
          }
        }
        .product_cart_item_box {
          @include rect(100%, 0.5rem);
          padding-right: 0.15rem;
          border-bottom: 1px solid #d3d3d3;
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
                @include text-color(#7d859b);
                @include font-size(0.15rem);
              }
            }
            .product_cart_item_right {
              @include flexbox();
              .placeSelect {
                span {
                  @include font-size(0.15rem);
                }
              }
              .toRight {
                margin-left: 0.1rem;
                @include flexbox();
                @include justify-content();
                @include align-items();
                img {
                  @include rect(0.06rem, 0.11rem);
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
          @include rect(100%, 0.49rem);
          padding-right: 0.15rem;
          border-bottom: 1px solid #d3d3d3;
          position: relative;
          // mint ui 中 cell样式修改
          .mint-cell {
            color: #7d859b;
            background-image: none;
            .mint-cell-wrapper {
              padding: 0;
              background-image: none;
              font-size: 0.15rem;
              .mint-cell-value {
                color: #a7a9a7;
                .place-show {
                  margin-right: 0.1rem;
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
                @include text-color(#7d859b);
                @include font-size(0.15rem);
              }
            }
            .firm_tax_item_right {
              @include flexbox();
              .placeSelect {
                text-align: right;
                span {
                  @include font-size(0.15rem);
                }
              }
              .toRight {
                margin-left: 0.1rem;
                @include flexbox();
                @include justify-content();
                @include align-items();
                img {
                  @include rect(0.06rem, 0.11rem);
                }
              }
            }
          }
        }
      }
    }
    .marked {
      text-align: center;
      font-size: 0.14rem;
      color: #a7a9a7;
      letter-spacing: -0.68px;
    }
    // 产品收入信息(信用卡供车)提交按钮
    .product_cart_submit {
      @include rect(100%, auto);
      margin-top: 0.2rem;
      padding: 0.15rem;
      .p_i_s_main {
        .submit {
          @include rect(100%, 0.49rem);
          @include border-radius(0.05rem);
          background: #1199ed;
          // background: url('../../assets/btn_1@2x.png') no-repeat;
          // background: url('../../assets/btn_1@2x.png') no-repeat;
          border: none;
          @include font-size(0.16rem);
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
      opacity: 0.4;
    }
    .checkShade_content {
      z-index: 999;
      @include rect(100%, 3.74rem);
      @include background-color(#f0f4f7);
      position: absolute;
      bottom: 0;
      left: 0;
      @include flexbox();
      @include flex-direction(column);
      .checkShade_con_top {
        @include rect(100%, 0.49rem);
        @include background-color(#fff);
        @include flexbox();
        @include justify-content(center);
        @include align-items(center);
        position: relative;
        .checkShade_cancel {
          position: absolute;
          top: 0;
          left: 0;
          @include rect(0.45rem, 100%);
          @include flexbox();
          @include justify-content(center);
          @include align-items(center);
          img {
            @include rect(0.15rem, 0.15rem);
          }
        }
        .checkShade_userType {
          span {
            @include font-size(0.18rem);
            @include text-color(#032238);
          }
        }
      }
      .checkShade_con_con_wrap {
        @include flex();
        @include rect(100%, auto);
        padding: 0.1rem 0;
        overflow: hidden;
        .checkShade_con_con {
          @include rect(100%, 100%);
          @include background-color(#f0f4f7);
          overflow: auto;
          .checkShade_item {
            @include rect(100%, 0.49rem);
            @include background-color(#fff);
            border-bottom: 1px solid #d3d3d3;
            padding: 0 0.15rem;
            .checkShade_item_main {
              @include rect(100%, 100%);
              @include flexbox();
              @include justify-content(space-between);
              @include align-items();
              .checkShade_item_left {
                span {
                  @include text-color(#032238);
                  @include font-size(0.16rem);
                }
              }
              .checkShade_item_right {
                display: none;
                img {
                  @include rect(0.18rem, 0.13rem);
                }
              }
            }
          }
        }
      }
      .checkShade_con_buttom {
        @include rect(100%, 0.49rem);
        @include background-color(#fff);
        @include flexbox();
        @include justify-content();
        @include align-items();
        span {
          @include text-color(#4fbfbd);
          @include font-size(0.16rem);
        }
      }
    }
  }
}

// 公共样式
// 输入框input的样式
.warranties_span {
  @include rect(1.6rem, 0.48rem);
  @include text-color(#d60d0d);
  @include font-size(0.24rem);
  border: none;
  text-align: right;
  //  padding-right: .16rem;
  &::-webkit-input-placeholder {
    /*WebKit browsers*/
    font-size: 0.15rem;
    color: #a7a9a7;
  }
  &::-moz-input-placeholder {
    /*Mozilla Firefox*/
    font-size: 0.15rem;
    color: #a7a9a7;
  }
  &::-ms-input-placeholder {
    /*Internet Explorer*/
    font-size: 0.15rem;
    color: #a7a9a7;
  }
}
#warranties_message {
  border-right: 1px solid #d3d3d3;
}
#warranties_note {
  @include rect(1.2rem, 0.48rem);
}
.imgCode {
  width: 1rem;
  height: 0.26rem;
}
.warranties_input {
  @include rect(1.6rem, 0.48rem);
  @include text-color(#04223d);
  @include font-size(0.15rem);
  border: none;
  text-align: right;
  //  padding-right: .16rem;
  &::-webkit-input-placeholder {
    /*WebKit browsers*/
    font-size: 0.15rem;
    color: #a7a9a7;
  }
  &::-moz-input-placeholder {
    /*Mozilla Firefox*/
    font-size: 0.15rem;
    color: #a7a9a7;
  }
  &::-ms-input-placeholder {
    /*Internet Explorer*/
    font-size: 0.15rem;
    color: #a7a9a7;
  }
}
// 字体颜色加深 color: #04223D
.color_deepen {
  @include text-color(#04223d);
}
// 字体颜色浅灰色 color: #A7A9A7
.color_thin {
  @include text-color(#a7a9a7);
}
@media screen and (max-width: 374px) {
  .imgCode {
    width: 0.6rem;
  }
}
</style>
