<template>
  <div class="box">
    <div class="logo">
      <img src="../login.png">
    </div>
    <div class="form">
      <div class="line title">
        <div id="title">修改密码</div>
      </div>
      <div class="line input">
        <span class="fa-user fa"></span>
        <input type="text" size="20" v-model="userId" placeholder="用户名">
      </div>
      <div class="line input oldPwd">
        <span class="fa-lock fa"></span>
        <input type="password" v-model="currentPassword" size="20" placeholder="旧密码">
      </div>
      <div class="line input newPwd">
        <span class="fa-check-square-o fa"></span>
        <input type="password" v-model="newPassword" size="20" placeholder="新密码">
      </div>
      <div class="line input newPwd2">
        <span class="fa-check-square-o fa"></span>
        <input type="password" v-model="newPassword2" size="20" placeholder="重复新密码">
      </div>
      <div class="line message">
        <span id="msg">{{message}}&nbsp;</span>
      </div>

      <!--<a style="position: relative;top: -5px;left: -28px;font-size: 8px;">提示：</a>-->
      <!--<p class="p1">1.密码必须包含数字、字母、特殊符号三者，且长度大于8位</p>-->
      <!--<p class="p2">2.不能使用用户名作为密码</p>-->
      <div class="line button changePwd">
        <button @click="changePwd()" type="button">
          提 交
          <span id="loading" class="fa fa-refresh fa-spin" style="display:none"></span>
        </button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import api from '../server';
  /* eslint-disable */
  import { hex_sha1 } from '../she/sha1.js';
  import JSEncrypt from 'jsencrypt';
  export default{
    data() {
      return {
        currentPassword: '',
        newPassword: '',
        newPassword2: '',
        userId: '',
        message: '',
        pubKey: ''
      };
    },
    created() {
      this.getPubKey();
    },
    methods: {
      changePwd() {
        this.message = '';
        if (!this.userId) {
          this.message = '请输入用户名';
          return;
        }
        if (!this.currentPassword) {
          this.message = '请输入原密码';
          return;
        }
        if (!this.newPassword) {
          this.message = '请输入新密码';
          return;
        }
        if (this.newPassword2 !== this.newPassword) {
          this.message = '两次密码输入不一致';
          return;
        }
        if(!/[A-Z]+/.test(this.newPassword)) {
          this.message = '新密码必须包含大写字母';
          return;
        }
        if(!/[a-z]+/.test(this.newPassword)) {
          this.message = '新密码必须包含小写字母';
          return;
        }
        if(!/[0-9]+/.test(this.newPassword)) {
          this.message = '新密码必须包含数字';
          return;
        }
        if(this.newPassword.length < 6 || this.newPassword.length > 20) {
          this.message = '新密码长度需要6~20位';
          return;
        }
        // 加密处理
        let encrypt = new JSEncrypt();
        encrypt.setPublicKey(this.pubKey);
        this.$MyFetch.post(api.changePsd, {
          currentPassword: hex_sha1(this.userId.toUpperCase() + this.currentPassword),
          newPassword: encrypt.encrypt(this.newPassword),
          userId: this.userId
        })
          .then((data) => {
            this.confirmFn('密码修改成功!3秒后自动跳转至登录页面', 'success');
            setTimeout(() => {
              this.$router.push({path: '/login'});
            }, 3000);
          })
          .catch(err => {
            this.confirmFn(err.message);
          })
        ;
      },
      getPubKey() {
        this.$MyFetch.get(api.getPublicKey)
          .then(data => {
            this.pubKey = data;
          })
      }
    },
    components: {}
    };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  body {
    background: rgb(235, 235, 235);
    position: relative;
  }

  .box {
    position: fixed;
    left: 50%;
    top: 160px;
    transform: translate(-50%, 0);
    width: 380px;
    margin: 0px auto;
    box-shadow: 0 0 15px #555;
    border-radius: 2px;
    z-index: 999;
    background: #FFFFFF;
    padding: 10px;
  }

  .logo {
    background: white;
    display: block;
    overflow: hidden;
    padding: 30px;
    text-align: center;
  }

  .logo img {
    width: 80%;
  }

  .form {
    padding: 10px 30px 20px;
    background: #fff;
    display: block;
    position: relative;
  }

  .line {
    position: relative;
    font-size: 15px;
  }

  .line + .line {
    margin-top: 10px;
  }

  .title {
    color: #777;
    display: block;
    font-size: 15px;
    margin-bottom: 20px;
    text-align: center;
  }

  .title::before {
    background: #e4e4e4;
    content: "";
    display: block;
    height: 1px;
    left: 0;
    position: absolute;
    right: 0;
    top: 50%;
  }

  .title div {
    padding: 0 20px;
    background: #FFFFFF;
    display: inline-block;
    position: relative;
  }

  input {
    box-sizing: border-box;
    box-shadow: none;
    line-height: 1.33;
    border-radius: 6px;
    color: #555;
    background: #fff none;
    border: 1px solid #ccc;
    border-top-color: #c2c2c2;
    display: block;
    width: 100%;
    height: 46px;
    padding: 10px 16px 10px 56px;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }

  input:focus {
    border-color: #41b1c2;
    outline: 0;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(65, 177, 194, .6);
  }

  .input .fa {
    border-right: 1px solid #d6d6d6;
    bottom: 9px;
    color: #d6d6d6;
    display: block;
    font-size: 14px;
    left: 0;
    line-height: 27px;
    position: absolute;
    text-align: center;
    top: 9px;
    width: 40px;
    z-index: 1002;
    transition: all .3s;
  }
  .changePwd{
    display: block;
    margin-top: 10px;
  }
  button {
    border: none;
    font-size: 13px;
    font-weight: 600;
    line-height: 19px;
    outline: 0 !important;
    padding: 10px 0;
    text-align: center;
    width: 100%;
    transition: all .3s;
    border-radius: 6px;
    cursor: pointer;
    color: #fff;
    background-color: #2a9cad;
  }
  button:active{
    background: #41b1c2;
  }
  button:hover {
    background-color: #41b1c2;
  }

  .message {
    margin-top: 10px;
    color: #E00000;
    font-size: 0.9em;
    text-align: center;
  }

  #umlogo {
    position: absolute;
    right: 9px;
    top: 9px;
    height: 28px;
    width: 40px;
    border-radius: 3px;
  }
  .p1,.p2{
    font-size: 8px;
    line-height: 16px;
  }
</style>
