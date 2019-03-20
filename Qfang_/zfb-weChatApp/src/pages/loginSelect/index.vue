<template>
  <div class="login-select">
    <img class="login-bg" src="../../assets/img/login-bg@2x.png" alt="">
    <div class="select-div">
      <van-button round block class="mb20" custom-class="default-btn" @click="$navigateTo('loginPhone')">手机号登录</van-button>
      <van-button round block open-type="getUserInfo" @getuserinfo="getUserInfo" custom-class="border-btn">微信登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  onShow() {
  },
  mounted() {

  },
  methods: {
    getUserInfo(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="less">
.login-select {
  padding: 100px 0 0 0;
  .login-bg {
    display: block;
    width: 226px;
    height: 157px;
    margin: 0 auto 100px auto;
  }
  .select-div {
    padding: 0 40px;
    .mb20 {
      margin-bottom: 20px;
      display: block;
    }
  }
}
</style>
