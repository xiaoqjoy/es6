<template>
  <div class="login">
    <div class="content">
      <div class="left_cont">
        <img src="../../../static/img/logo.png">
      </div>
      <div class="right_cont">
        <div class="info">
          <p>你好，欢迎登陆！</p>
          <div class="user">
            <span>身份证/手机号码</span>
            <input type="text" value v-model="userName" placeholder="number">
          </div>
          <div class="password">
            <span>密码</span>
            <input type="password" value v-model="password" placeholder="number">
          </div>
          <input type="button" :class="{active: isActive}" value="登陆" @click="loginSubmit">
        </div>
      </div>
    </div>
    <div class="footer">
      <p>建议使用1280*1024分辨率，达到最佳浏览效果</p>
      <ul>
        <li>
          <a href>Q房首页</a> |
        </li>
        <li>
          <a href>关于我们</a> |
        </li>
        <li>
          <a href>联系方式</a> |
        </li>
        <li>
          <a href>客服中心</a> |
        </li>
        <li>
          <a href>网站地图</a>
        </li>
      </ul>
      <p>Copyright 2009-2011 Q房网 版权所有 粤ICP备10202274号</p>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
  name: "login",
  data() {
    return {
      userName: "",
      password: "",
      isActive: true
    };
  },
  methods: {
    loginSubmit() {
      var that = this;
      this.isActive = false;
      var data = {
        userName: this.userName,
        password: this.password,
        wxOpenId: "",
        loading: true
      };
      this.$interface.login(data, res => {
        if (res.data.status == "C0000") {
          Cookie.set("userinfos", "true");
          setTimeout(function() {
            that.$router.push({ path: "/Home" });
          }, 0);
        } else {
          this.isActive = true;
        }
      });
    }
  },
  created() {}
};
</script>

<style scoped lang="less">
.login {
  width: 100%;
  height: 100%;
  background: url(../../../static/img/bg.png) no-repeat;
  background-size: 100% 100%;
  display: inline-block;
  .content {
    width: 840px;
    height: 500px;
    border-radius: 20px;
    display: flex;
    margin-top: 150px;
    margin: 150px auto 0;
    .left_cont {
      width: 50%;
      height: 100%;
      background: #0f67af;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      img {
        margin: 225px 100px;
      }
    }
    .right_cont {
      width: 50%;
      height: 100%;
      background: white;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      .info {
        margin-top: 70px;
        margin-left: 60px;
        div {
          display: flex;
          flex-direction: column;
        }
        p {
          font-size: 18px;
          margin-bottom: 30px;
        }
        span {
          font-size: 14px;
          color: #999999;
          margin-bottom: 10px;
        }
        input {
          width: 300px;
          height: 30px;
          margin-bottom: 20px;
          border: solid 1px #eeeeee;
          border-radius: 5px;
          text-indent: 12px;
        }
        input.active {
          background: #0e64ad;
        }
        input:focus {
          outline: none;
          border: 1px solid #0f67af;
        }
        input[type="button"] {
          color: white;
          font-size: 18px;
          height: 40px;
          border: none;
          margin-top: 20px;
        }
      }
    }
  }
  .footer {
    text-align: center;
    margin-top: 50px;
    p:first-child {
      color: #106ab1;
    }
    ul {
      color: #106ab1;
      display: flex;
      justify-content: center;
      margin: 5px 0;
      li {
        margin: 0 5px;
        a {
          text-decoration: underline;
          color: #106ab1;
        }
      }
    }
    p:last-child {
      color: #103c66;
    }
  }
}
</style>
