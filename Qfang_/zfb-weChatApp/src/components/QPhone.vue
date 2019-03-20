<template>
  <div class="q-phone">
    <q-input :border="false" clearable :maxlength="13" :verifyReg="regPhone" :value.sync="phone" type="number" :title="title" :placeholder="placeholder" />
    <div class="right-div">
      <div class="q-input-title" v-if="phone"></div>
      <div class="get_code" :class="{disabled:!codeButtonStatus}" @click="getCode">{{codeText}}</div>
    </div>
    <van-toast id="van-toast" />
    <QStringCode :value.sync="codeVisible" :codeUrl="imgCodeUrl" :onConfirm="codeOnConfirm" />
  </div>
</template>

<script>
import QInput from './QInput';
import QStringCode from './QStringCode';
export default {
  name: 'QPhone',
  data() {
    return {
      regPhone: /^(13|14|15|16|17|18|19)[0-9]{9,11}$/, // 手机号正则
      isGetCodeing: false, // 验证码是否已发送
      codeVisible: false, // 控制图片验证码弹窗
      count: 60, // 倒计时
      codeText: '获取验证码'
    };
  },
  components: {
    QInput, QStringCode
  },
  props: {
    clearable: Boolean, // 是否显示清除按钮
    value: String, // input的值
    phoneCodeUrl: String, // 发送手机验证码的接口
    imgCodeUrl: String, // 获取图片验证码的接口
    // 标题
    title: {
      type: String,
      default: '手机号'
    },
    placeholder: {
      type: String,
      default: '请输入手机号'
    }
  },
  computed: {
    // 获取验证码按钮状态
    codeButtonStatus() {
      if (this.regPhone.test(this.phone)) {
        return !this.isGetCodeing;
      } else {
        return false;
      }
    },
    phone: {
      set(val) {
        this.$emit('update:value', val);
      },
      get() {
        return this.value;
      }
    }
  },
  methods: {
    // 发送验证码
    sendCode(cb) {
      let status = false;
      this.$axios.get(this.phoneCodeUrl, {
        params: {
          phone: this.phone,
          code: this.stringCode
        }
      }).then(({ data }) => {
        if (data.status === 'C0000') {
          status = true;
          this.isGetCodeing = true;
          this.countdown();
          this.Toast('发送验证码成功');
          let phoneCookie = this.$cookie.getJSON(this.phone);
          this.$cookie.set(this.phone, {
            count: phoneCookie ? (phoneCookie.count + 1) : 1
          }, { expires: 1 });
        } else {
          this.Toast(data.message);
        }
        cb && cb(status);
      }).catch(() => {
        this.Toast('发送验证码失败，请稍后再试');
        cb && cb(status);
      });
    },
    // 点击获取验证码弹出图片验证码
    getCode() {
      if (!this.codeButtonStatus) {
        if (this.isGetCodeing) {
          this.Toast('验证码已发送');
        } else {
          if (this.phone) {
            this.Toast('请输入正确格式的手机号');
          } else {
            this.Toast('请先输入手机号');
          }
        }
        return;
      }
      this.codeVisible = true;
      // let phoneCookie = this.$cookie.getJSON(this.phone);
      // if (phoneCookie && phoneCookie.count >= 5000) {
      //   Toast('验证码发送过于频繁，请明天再试哟');
      // } else {
      //   this.codeVisible = true;
      //   // this.$nextTick(() => {
      //   //   this.$refs.qStringCode.$focus();
      //   // });
      // }
    },
    // 验证码倒计时
    countdown() {
      if (this.isGetCodeing) {
        setTimeout(() => {
          this.count--;
          this.codeText = '重新发送(' + this.count + ')';
          if (this.count === 0) {
            this.isGetCodeing = false;
            this.count = 60;
            this.codeText = '获取验证码';
          } else {
            this.countdown();
          }
        }, 1000);
      }
    },
    // 图片验证码弹窗点击确认后的回调
    codeOnConfirm(code) {
      return new Promise(resolve => {
        this.stringCode = code;
        this.sendCode((status) => {
          resolve(status);
        });
      });
    }
  }
};
</script>

<style lang="less">
.q-phone {
  background: #fff;
  display: flex;
  position: relative;
  .right-div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px 15px 10px 0;
    box-sizing: border-box;
    .q-input-title {
      height: 20px;
    }
  }
  .q-input {
    flex: 1;
  }
  .get_code {
    font-size: 15px;
    color: #008842;
    display: block;
    width: 100px;
    text-align: right;
    height: 24px;
    line-height: 24px;
    &.disabled {
      color: #999;
    }
  }
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 15px;
    right: 15px;
    height: 1px;
    background: #d7d7d7;
    transform: scale(1, 0.5);
  }
}
</style>
