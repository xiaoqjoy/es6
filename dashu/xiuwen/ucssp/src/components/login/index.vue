<template>
  <div class="login-page">
    <div class="box">
      <div class="logo">
        <img src="../../../static/loginlogo.png" width="200px">
      </div>
      <div class="form">
        <div class="line title">
          <div id="title">二代系统统一登录入口</div>
        </div>
        <div class="line input">
          <span class="fa-user fa"></span>
          <input type="text" size="20" v-model="loginData.userId" placeholder="用户名"/>
        </div>
        <div class="line input">
          <span class="fa-lock fa"></span>
          <input id="password" type="password" v-model="loginData.password" size="20" placeholder="密码" @keyup.enter="login()"/>
        </div>
        <div class="line message">
          <span id="msg">{{hint}}</span>
        </div>
        <div class="line login">
          <button id="loginButton" @click="login()">
            登 录
            <span id="loading" class="fa fa-refresh fa-spin" style="display:none"></span>
          </button>
        </div>
        <div class="line link">
          <router-link to="/change_password" class="cursor__pointer" style="font-size: 12px; color:#666; float: right;">修改密码</router-link>
          <div>&nbsp;</div>
        </div>
      </div>
    </div>
    <el-dialog title="选择部门" :visible.sync="dialogFormVisible" width="320px">
      <el-form
        :inline="true"
        :model="form"
        :rules="rules"
        ref="departmentForm"
        label-position="top"
        class="demo-form-inline form">
        <el-form-item label="请选择部门" prop="department" >
          <el-select v-model="form.department" clearable >
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :value="item.departmentId"
              :label="item.departmentName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer width100 text__center">
        <el-button type="primary" class="width100" @click="submitFn">确认</el-button>
      </div>
    </el-dialog>
    <el-dialog title="选择个贷服务中心" :visible.sync="dialogServiceVisible" width="320px">
      <el-form
        :inline="true"
        :model="formService"
        :rules="rulesService"
        ref="serviceForm"
        label-position="top"
        class="demo-form-inline form">
        <el-form-item label="请选择个贷服务中心" prop="serviceId" >
          <el-select v-model="formService.serviceId" clearable >
            <el-option
              v-for="(item, index) in optionService"
              :key="index"
              :value="item.serviceId"
              :label="item.serviceName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer width100 text__center">
        <el-button type="primary" class="width100" @click="submitFn">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import api from './server';
  import {token, menu, userInfo} from '@common/js/localStorage';
  /* eslint-disable */
  import { hex_sha1 } from './she/sha1.js';
  export default{
    data() {
      return {
        loginData: {
          userId: '',
          password: ''
        },
        sMacAddr: '',
        hint: '',
        dialogFormVisible: false,
        dialogServiceVisible: false,
        options: [],
        optionService: [],
        form: {
          department: ''
        },
        rules: {
          department: [
            {required: true, message: '请选择部门', trigger: 'change'}
          ]
        },
        formService: {
          serviceId: ''
        },
        rulesService: {
          serviceId: [
            {required: true, message: '请选择个贷服务中心', trigger: 'change'}
          ]
        }
      };
    },
    created() {
      if (this.$route.params) {
        this.loginData.userId = this.$route.params.userId;
      }
      menu.removeMenu();
    },
    methods: {
      login() {
        var input = document.getElementById("password");
        input.blur();
        if (!this.loginData.userId) {
          this.hint = '请输入用户名!';
          return;
        }
        if (!this.loginData.password) {
          this.hint = '请输入密码!';
          return;
        }
        let sendData = JSON.parse(JSON.stringify(this.loginData));
        sendData.password = hex_sha1(sendData.userId.toUpperCase() + sendData.password);
        this.hint = '';
        this.$MyFetch.post(api.login, sendData)
          .then((data) => {
            token.setToken(data.token);
            this.options = data.department;
            this.dialogFormVisible = true;
            // 获取mac地址
            this.$getMac(this);
          })
          .catch(err => {
            this.confirmFn(err.message);
          });
      },
      submitFn() {
        this.$refs.departmentForm.validate((valid) => {
          let data = {
            departmentId: this.form.department
          };
          if (this.formService.serviceId) {
            data.serviceId = this.formService.serviceId;
          }
          if (valid) {
            this.$MyFetch.post(api.setDepartment, data)
              .then(data => {
                menu.setMenu(JSON.stringify(data.menu));
                token.setToken(data.token);
                userInfo.setUserInfo(JSON.stringify(data));
                this.$router.push({path: '/'});
                // 判断是否是中台管理管位
                this.cpms_r_manager_0003Change(userInfo.getUserInfo());
              })
              .catch(err => {
                if (err.code === 'SS100001') {
                  this.dialogFormVisible = false;
                  this.dialogServiceVisible = true;
                  this.optionService = err.data.serviceList;
                } else {
                  this.confirmFn(err.message);
                }
              });
          }
        });
      }
    }
  };
</script>
<style lang="less" scoped rel="stylesheet/less">
 .login-page{
   .dialog-footer{
     display: inline-block;
   }
   /deep/.el-form-item {
     width: 100%;
     .el-select {
       width: 100%;
     }
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

   button:hover {
     background-color: #41b1c2;
   }

   .message {
     margin-top: 10px;
     color: #E00000;
     font-size: 0.9em;
     text-align: center;
     height: 20px;
   }

   .link span {
     font-size: 0.8em;
     color: #8D8D8D;
     position: absolute;
     cursor: pointer;
     transition: all .2s;
   }
   .link span:hover {
     color: #0044cc;
   }
   .left {
     left: 0;
   }
   .right {
     right: 0;
   }

   #umlogo {
     position: absolute;
     right: 9px;
     top: 9px;
     height: 28px;
     width: 40px;
     border-radius: 3px;
   }
   .select_service{
     width: 100%;
     height: 100%;
     padding: 10px 20px;
     border-radius: 6px;
     text-align: center;
   }
 }
</style>
