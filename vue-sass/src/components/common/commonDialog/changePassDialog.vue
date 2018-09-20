<template>
  <div class="commonDialog">

    <!-- 修改密码弹窗 -->
    <el-dialog class="changePwd" title="修改密码" width="350px" :visible.sync="isShowChangePassDialog" :append-to-body="true" :close-on-click-modal="false" @close="changePasswordCancel('changePassword')">
      <el-form :model="changePassword" :rules="changePasswordRules" ref="changePassword" label-width="80px">
        <!-- prop属性必须要有 -->
        <el-form-item label="旧密码" prop="oldPass" v-if="isOldPwd">
          <el-input type="password" v-model="changePassword.oldPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="changePassword.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPass">
          <el-input type="password" v-model="changePassword.confirmPass" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changePasswordCancel('changePassword')">取 消</el-button>
        <el-button type="primary" @click="changePasswordSubmit('changePassword')">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: 'changePassDialog',
    props: ['source', 'isOldPwd', 'userId'],
    data() {
      //验证密码
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!(/[a-zA-Z0-9]{6,16}/.test(value))) {
          callback(new Error('密码为6到16位的英文或数字'));
        } else if (value.replace(/(^\s*)|(\s*$)/g, "") === '') {
          callback(new Error('密码不能为空格'));
        } else {
          callback();
        }
      };
      //修改密码：验证新密码
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!(/[a-zA-Z0-9]{6,16}/.test(value))) {
          callback(new Error('密码为6到16位的英文或数字'));
        } else if (value.replace(/(^\s*)|(\s*$)/g, "") === '') {
          callback(new Error('密码不能为空格'));
        } else {
          if (this.changePassword.confirmPass !== '') {
            this.$refs.changePassword.validateField('confirmPass');
          }
          callback();
        }
      };
      //修改密码：验证确认密码
      var validateConfirmPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (!(/[a-zA-Z0-9]{6,16}/.test(value))) {
          callback(new Error('密码为6到16位的英文或数字'));
        } else if (value.replace(/(^\s*)|(\s*$)/g, "") === '') {
          callback(new Error('密码不能为空格'));
        } else if (value !== this.changePassword.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        isShowChangePassDialog: false,
        changePassword: {
          oldPass: '',
          pass: '',
          confirmPass: ''
        },
        changePasswordRules: {
          oldPass: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              validator: validatePassword,
              trigger: 'blur'
            }
          ],
          pass: [{
              required: true,
              message: '请输入新密码',
              trigger: 'blur'
            },
            {
              validator: validatePass,
              trigger: 'blur'
            }
          ],
          confirmPass: [{
              required: true,
              message: '请确认密码',
              trigger: 'blur'
            },
            {
              validator: validateConfirmPass,
              trigger: 'blur'
            }
          ]
        },
      }
    },
    methods: {
      // 修改密码确认
      changePasswordSubmit(formName) {
        let vm = this;
        vm.$refs[formName].validate((valid) => {
          if (valid) {
            vm.openLoading();
            switch (vm.source) {
              case 'userChangePassword': //当前用户密码修改
                vm.userChangePassword(formName);
                break;
              case 'updatePassword': //子机构、员工密码修改
                vm.updatePassword(formName);
                break;
            }
          }
        })
      },
      //子机构、员工密码修改
      updatePassword(formName) {
        let vm = this;
        vm.openLoading();
        let data = {
          userId: vm.userId,
          password: vm.changePassword.pass
        }
        vm.$api.updatePassword(data, res => {
          vm.changePasswordCancel(formName);
          vm.$message.success(res.data.errMsg || res.data.data);
          vm.closeLoading();
        }, res => {
          vm.$message(res.data.errMsg);
          vm.closeLoading();
        });
      },
      //顶部导航条密码修改
      userChangePassword(formName) {
        let vm = this;
        vm.openLoading();
        let data = {
          userId: vm.userId,
          oldPassword: vm.changePassword.oldPass,
          password: vm.changePassword.confirmPass
        }
        vm.$api.userChangePassword(data, res => {
          vm.changePasswordCancel(formName);
          vm.$message.success(res.data.data);
          vm.closeLoading();
        }, res => {
          vm.$message(res.data.errMsg);
          vm.closeLoading();
        });
      },
      // 修改密码取消
      changePasswordCancel(formName) {
        this.isShowChangePassDialog = false;
        this.$refs[formName].resetFields();
        this.changePassword.oldPass = "";
        this.changePassword.pass = "";
        this.changePassword.confirmPass = "";
      },
    }
  }
</script>

<style>
  .changePwd {
    z-index: 10;
  }
</style>