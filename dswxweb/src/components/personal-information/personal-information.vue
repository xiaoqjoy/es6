<template>
  <!-- 还款计划 -->
  <div class="product_cart">
    <!-- 还款计划主体 -->
    <div v-if="isShow" class="product_cart_main">
      <!-- 还款计划头部 -->
      <div class="product_cart_top">
        <div style="width:30px;height:30px">
          <div class="p_i_left">
            <img :src="back_img" alt />
          </div>
        </div>
        <div class="p_i_com">个人信息认证</div>
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
            <!-- 姓名 -->
            <div class="product_cart_item_box">
              <div class="product_cart_item">
                <!-- item左边 -->
                <div class="product_cart_item_left">
                  <span>姓名</span>
                </div>
                <!-- item右边 -->
                <div class="warranties_input_box">
                  <input class="warranties_input" type="text" v-model="name" placeholder="请输入姓名" />
                </div>
              </div>
            </div>
            <!-- 证件号 -->
            <div class="product_cart_item_box">
              <div class="product_cart_item">
                <!-- item左边 -->
                <div class="product_cart_item_left">
                  <span>证件号</span>
                </div>
                <!-- item右边 -->
                <div class="warranties_input_box">
                  <input
                    class="warranties_input"
                    @change="checkCard"
                    type="text"
                    v-model="identityCard"
                    placeholder="请输入身份证号"
                  />
                </div>
              </div>
            </div>
            <!-- 手机号 -->
            <div class="product_cart_item_box">
              <div class="product_cart_item">
                <!-- item左边 -->
                <div class="product_cart_item_left">
                  <span>手机号</span>
                </div>
                <!-- item右边 -->
                <div class="warranties_input_box">
                  <input
                    class="warranties_input"
                    @change="verifyMobile"
                    type="text"
                    v-model="phoneNumber"
                    placeholder="请输入手机号"
                  />
                </div>
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
                    style="color:#4FBFBD"
                    class="warranties_input"
                  >获取动态码</span>
                  <span v-show="!show" style="color:#4FBFBD" class="warranties_input">{{count}} s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 客户隐私保护政策 -->
      <div class="tips">
        <protocol ref="protocol" name="客户隐私保护政策" :imgPaths="imgPaths" :selected="privacySelected" @callback="privacyState" left/>
      </div>
      <!-- 还款操作指引按钮 -->
      <div class="product_cart_submit">
        <div class="p_i_s_main">
          <button class="submit" @click="submit" ref="productWarrantiesButton">认证</button>
        </div>
      </div>
      <!-- 提示语 -->
      <div class="marked">
        <p>为了保证您的信息安全，请先进行身份验证</p>
        <p>完成认证后可查询业务信息</p>
      </div>
      <p class="link" @click="guidelines">
        <span>协议支付签约指引</span>
      </p>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator } from "mint-ui";
import axios from "axios";
import filer from "../../common/js/filters.js";
import { laappApi } from "../js/server.js"; // 接口
import protocol from '../../common/views/ProtocolBanner';
export default {
  name: "Product-cart",
  data() {
    return {
      // 进页面默认元素不显示
      isShow: false,
      // url后面的参数
      parameters: {},
      // 控制显示倒计时还是文字
      show: true,
      // 倒计时60s
      count: "",
      // 倒计时初始值
      timer: null,
      // 姓名
      name: "",
      // 手机号
      phoneNumber: "",
      // 身份证号
      identityCard: "",
      // 图形验证码
      imgUrl: "",
      // 图形验证码
      imgId: "",
      // 图形验证码
      imgCode: "",
      // 短信验证码
      messageCode: "",
      // 是否提交过
      isConfirm: false,
      // ‘取消’图片
      cancel_img: require("@/assets/ic_close_2@3x.png"),
      // ‘返回’图片
      back_img: require("@/assets/ic_back@2x.png"),
      // 向右图标
      toRight: require("@/assets/ic_arrow_right_2@2x.png"),
      canSubmit: true,
      privacySelected: false,
      imgPaths:[],
    };
  },
  created() {
    this.getTheParam();
    this.getImgCode();
    this.getPrivacyUrl();
  },
  components: {
    protocol
  },
  methods: {
    privacyState(res){
      this.privacySelected = res.selected;
    },
    getPrivacyUrl(){
      axios({
        method: "get",
        url: `${laappApi.getPrivacyFileUrl}`
      }).then(res => {
        this.imgPaths = res.data.data;
      });
    },
    getImgCode() {
      axios({
        method: "post",
        url: `${laappApi.getImgCode}`
      }).then(res => {
        this.imgUrl = res.data.data.imageurl;
        this.imgId = res.data.data.id;
      });
    },
    guidelines() {
      this.$router.push("/alipay-guidelines");
    },
    getTheParam() {
      if (this.getTheParameters("token") && this.getTheParameters("putOutNo")) {
        console.log(this.getTheParameters("putOutNo"));
        localStorage.setItem(
          "useTokenMsg",
          JSON.stringify(this.getTheParameters("token"))
        );
        localStorage.setItem(
          "useputOutNoMsg",
          JSON.stringify(this.getTheParameters("putOutNo"))
        );
        axios({
          method: "get",
          url: `${laappApi.repaymentSchedule}${"?"}${"putOutNo="}${JSON.parse(
            localStorage.getItem("useputOutNoMsg")
          )}`,
          // 请求头
          headers: {
            token: JSON.parse(localStorage.getItem("useTokenMsg"))
          }
        }).then(res => {
          if (!res.data.data.isOverDue) {
            this.$router.push({ path: "/repayment-schedule" });
          } else if (res.data.data.isOverDue && res.data.data.state === "N") {
            this.$router.push({ path: "/repayment-scheduleTen" });
          } else {
            this.$router.push({ path: "/Product-cart" });
          }
          localStorage.setItem("planData", JSON.stringify(res.data.data));
          localStorage.setItem(
            "incorrect",
            JSON.stringify(res.data.data.productId)
          );
        });
        return;
      } else if (
        this.getTheParameters("token") &&
        this.getTheParameters("state") == "login"
      ) {
        localStorage.setItem(
          "useToken",
          JSON.stringify(this.getTheParameters("token"))
        );
        this.$router.push({ path: "/product-income" });
      } else if (
        this.getTheParameters("token") &&
        this.getTheParameters("state") == "bindCard"
      ) {
        localStorage.setItem(
          "useTokenBank",
          JSON.stringify(this.getTheParameters("token"))
        );
        this.$router.push({ path: "/card-list" });
      }
      this.isShow = true;
    },
    // 获取url后面的参数
    getTheParameters(name) {
      var reg = new RegExp("(^|&|\\?)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.href.substr(1).match(reg);
      if (r != null) {
        return unescape(r[2]);
      } else {
        return "";
      }
    },
    // 身份证号正则校验
    checkCard() {
      if (!filer.checkIdcard(this.identityCard)) {
        Toast({
          message: "请填写正确的身份证号码",
          position: "top",
          duration: 5000
        });
      }
    },
    // 手机号正则校验
    verifyMobile() {
      if (!/^1[3456789]\d{9}$/.test(this.phoneNumber)) {
        Toast({
          message: "请填写正确的手机号码",
          position: "top",
          duration: 5000
        });
      }
    },
    // 获取短信验证码的接口
    captchaInterface() {
      axios({
        method: "get",
        url: `${laappApi.sendCode}?phone=${this.phoneNumber}&imageCode=${this.imgCode}&imageId=${this.imgId}`
      }).then(res => {
        Toast({
          message: res.data.message,
          position: "middle",
          duration: 2000
        });
        if (res.data.code == "1012") {
          this.show = true;
          clearInterval(this.timer);
          this.timer = null;
          this.getImgCode();
        }
      });
    },
    // 短信验证码60s倒计时方法
    getCode() {
      if (!this.imgCode) {
        Toast({
          message: "请先输入图形验证码",
          position: "middle",
          duration: 2000
        });
        return;
      }
      if (
        this.phoneNumber &&
        /^1[3456789]\d{9}$/.test(this.phoneNumber) &&
        this.identityCard &&
        /^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2010)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/.test(
          this.identityCard
        ) &&
        this.name
      ) {
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
      this.$router.push({ path: href });
    },
    // 认证按钮
    submit() {
      if (!this.canSubmit) {
        return
      }
      this.canSubmit = false;
      if (
        this.name == "" ||
        this.phoneNumber == "" ||
        this.identityCard == "" ||
        this.messageCode == ""
      ) {
        Toast({
          message: "姓名/证件号/手机号/验证码不能为空",
          position: "middle",
          duration: 5000
        });
        this.canSubmit = true;
      } else if (
        !/^1[3456789]\d{9}$/.test(this.phoneNumber) ||
        !filer.checkIdcard(this.identityCard)
      ) {
        Toast({
          message: "请检查证件号/手机号格式是否正确",
          position: "middle",
          duration: 5000
        });
        this.canSubmit = true;
      } else if(!this.privacySelected){
        Toast({
          message: '请查阅并同意《客户隐私保护政策》',
          position: "middle",
          duration: 3000
        });
        this.canSubmit = true;
      } else {
        Indicator.open('加载中...')
        axios({
          method: "post",
          url: `${laappApi.accountLogin}`,
          // 请求头
          headers: {
            "Content-Type": "application/json"
          },
          // 参数
          data: {
            name: this.name, // 姓名
            idno: this.identityCard, // 身份证号码
            phone: this.phoneNumber, // 手机号
            msgValideCode: this.messageCode, // 短信验证码
            openid: this.getTheParameters("openid") // 微信openId
          }
        }).then(res => {
          if (res.data.code == "0000") {
            if (this.getTheParameters("state") == "login") {
              localStorage.setItem(
                "useToken",
                JSON.stringify(res.data.data.token)
              );
              this.$router.push({ path: "/product-income" });
            } else if (this.getTheParameters("state") == "bindCard") {
              localStorage.setItem(
                "useTokenBank",
                JSON.stringify(res.data.data.token)
              );
              // localStorage.setItem("useTokenBank", JSON.stringify(this.getTheParameters("token")));
              // this.$router.push({ path: "/credit-card" });
              Indicator.close();
              this.canSubmit = true;
              this.$router.push({ path: "/card-list" });
            }
          } else {
            Indicator.close();
            this.canSubmit = true;
            Toast({
              message: res.data.message,
              position: "middle",
              duration: 5000
            });
          }
        }).catch(fail => {
          Indicator.close();
          this.canSubmit = true;
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
          display: none;
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
    .link {
      margin-top: 0.2rem;
      text-align: center;
      font-size: 0.16rem;
      color: #4fbfbd;
      letter-spacing: -0.68px;
    }
    .tips{
      margin-left: 15px;
      margin-top: 0.2rem;
    }
    // 产品收入信息(信用卡供车)提交按钮
    .product_cart_submit {
      @include rect(100%, auto);
      // margin-top: 0.2rem;
      padding: 0.15rem;
      .p_i_s_main {
        .submit {
          @include rect(100%, 0.49rem);
          @include border-radius(0.05rem);
          background: #4fbfbd;
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
