<template>
  <div class="login-phone">
    <div class="center-container">
      <div class="tips-div">
        <h4>手机快捷登录</h4>
      </div>
      <QPhone :value.sync="phone" type="number" placeholder="请输入手机号" clearable title="手机号" />
      <QInput :value.sync="code" type="text" placeholder="请输入验证码" title="验证码" />
      <div class="login-btn">
        <van-button round block custom-class="default-btn">确定</van-button>
      </div>
    </div>
    <p class="tip-link">使用协议</p>
  </div>
</template>

<script>
import QInput from '../../components/QInput';
import QPhone from '../../components/QPhone';
export default {
  data() {
    return {
      phone: '',
      code: ''
    };
  },
  components: {
    QInput, QPhone
  },
  onShow() {

  },
  mounted() {

  },
  methods: {

  }
};
</script>

<style lang="less">
.login-phone {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  height: 100vh;
  .tips-div {
    padding: 40px 15px 50px 15px;
    h4 {
      font-size: 24px;
      font-weight: bold;
    }
  }
  .login-btn {
    margin: 75px 0;
    padding: 0 15px;
  }
  .tip-link {
    font-size: 14px;
    color: #999999;
    text-align: center;
    margin: 40px 0;
  }
}
</style>
