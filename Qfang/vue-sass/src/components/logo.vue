<template>
  <div class="my_logs">
    <div class="logss">
      <div class="logoss">
        <div class="bgImg loginLogo"></div>
      </div>
      <div class="accountNum">
        <h4>账号登录</h4>
        <input type="text" v-model="phone" placeholder="请输入手机号码" class="account" @keyup.enter="$refs.pw.focus()" />
        <input type="password" v-model="Pw" @keydown="show($event)" @keyup.enter="logSuccess" ref='pw' placeholder="请输入密码" class="pass" />
        <!-- <input type="checkbox" v-model="checked" name="" id="" value="" class="check"/><span>记住账号</span> -->
        <el-checkbox v-model="checked" class="check">记住账号</el-checkbox>
        <span class="tips">{{Tips}}</span>
        <!--<div class="buttons" @click="logSuccess">登录</div>-->
        <el-button type="primary" size="medium" :loading="logining" class="buttons" @click="logSuccess">{{logining?'登录中':'登录'}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'logo',
    data() {
      return {
        msg: '登录页',
        Tips: '',
        phone: '',
        Pw: '',
        checked: true,
        logining: false, //登录时等待状态
      }
    },
    //页面加载调用获取cookie值
    mounted() {
      this.getCookie();
    },
    //账号密码
    //13812345678
    //123456
    methods: {
      show(ev) {
        if (ev.keyCode == 13) {
          this.logSuccess()
        }
      },
      //设置cookie
      setCookie(c_name, exdays) {
        var exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "phone=" + c_name + ";expires=" + exdate.toGMTString();
      },
      //读取cookie
      getCookie: function () {
        if (document.cookie.length > 0) {
          var arr = document.cookie.split('; ');
          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('='); //再次切割
            //判断查找相对应的值
            if (arr2[0] == 'phone') {
              this.phone = arr2[1]; //保存到保存数据的地方
            }
          }
        }
      },
      //清除cookie
      clearCookie: function () {
        this.setCookie("", -1); //修改2值都为空，天数为负1天就好了
      },
      //登录
      logSuccess() {
        var vm = this;
        vm.Tips = '';
        if (vm.phone == '') {
          vm.Tips = '请输入用户名'
          //} else if (!/^1[345678]\d{9}$/.test(vm.phone)) {
        } else if (!/^1\d{10}$/.test(vm.phone)) {
          vm.Tips = '请输入正确的手机号'
        } else if (vm.Pw == '') {
          vm.Tips = '请输入密码'
        } else if (!(/\w{6,16}$/.test(vm.Pw))) {
          vm.Tips = '请输入6-16位密码'
        } else {
          if (vm.checked == true) {
            vm.setCookie(vm.phone, 7);
          } else {
            //清空Cookie
            vm.clearCookie();
            vm.checked = false
          }

          vm.logining = true; //设置成登录时等待状态

          let data = {
            identityType: 'phone',
            credential: vm.phone,
            password: vm.Pw
          }
          vm.$api.login(data).then(res => {
            if (res.data.code == 0) {
              // 判断当前登陆用户的功能(菜单)权限
              if (res.data.data.resources.length != 0) {
                var AllUrl = res.data.data.resources[0].url; // 获取功能权限的第一项的页面url;
                vm.$router.push(AllUrl);
                sessionStorage.setItem("user", JSON.stringify(res.data.data.user));
                sessionStorage.setItem("token", res.data.data.token);
                sessionStorage.setItem("refreshToken", res.data.data.refreshToken);

                sessionStorage.setItem("meunList", JSON.stringify(res.data.data.resources))
                this.$parent.showBaseModel = true;
              } else {
                vm.$message.error('无菜单权限，请联系管理员！')
                console.log('菜单权限resources长度为0')
                vm.logining = false;
              }

            } else {
              vm.Tips = res.data.errMsg;
              vm.logining = false;
            }
          }).catch(err=>{
            vm.logining = false;
            console.log(err);
          })
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .buttons {
    color: white;
    /*line-height: 40px;*/
    text-align: center;
    cursor: pointer;
    margin-top: 54px;
    width: 300px;
    height: 40px;
    background-color: #267bf7;
    border-radius: 4px;
  }
  .check {
    cursor: pointer;
    width: 16px;
    height: 16px;
    margin-top: 12px;
    vertical-align: middle;
  }
  .accountNum span {
    color: #41454b;
    font-size: 14px;
    display: inline-block;
    margin-top: 12px;
    vertical-align: middle;
  }
  .accountNum .tips {
    display: block;
    color: #ff6372;
    margin-top: 2rem;
    position: absolute;
    font-size: 16px;
    width: 300px;
    text-align: center;
  }
  .account {
    outline: none;
    margin-top: 30px;
    width: 300px;
    height: 40px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px rgba(206, 206, 206, 0.7);
    padding-left: 11px;
    box-sizing: border-box;
  }
  .pass {
    padding-left: 11px;
    box-sizing: border-box;
    outline: none;
    margin-top: 20px;
    width: 300px;
    height: 40px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px rgba(206, 206, 206, 0.7);
  }
  .accountNum h4 {
    font-size: 16px;
  }
  .accountNum {
    padding: 50px 51px;
  }
  .my_logs {
    width: 100%;
    height: 100%;
    position: fixed;
    /*min-width: 1300px;*/
    z-index: 100;
    background-image: url(../assets/images/log_background.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
  }
  .logss {
    position: absolute;
    top: 50%;
    margin-top: -225px;
    right: 18%;
    width: 400px;
    height: 450px;
    background-color: #ffffff;
  }
  .logoss {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #e5e5e5;
    box-sizing: border-box;
    padding: 12px 0 0 8px;
  }
  .loginLogo {
    background-position: -375px 0;
    width: 150px;
    height: 35px;
  }
</style>