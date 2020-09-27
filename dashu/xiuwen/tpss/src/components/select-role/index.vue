<template>
    <div class="selectRole bg__white">
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
        <el-button type="primary" class="width100" @click="submitFn">确认</el-button>
      </el-form>
    </div>
</template>
<script type="text/ecmascript-6">
  import { departments, menu, token } from '@common/js/localStorage';
  import api from './server';
    export default{
      data() {
        return {
          options: [],
          form: {
            department: ''
          },
          rules: {
            department: [
              {required: true, message: '请选择部门', trigger: 'change'}
            ]
          }
        };
      },
      created() {
        if (menu.getMenu()) {
          this.$router.push({path: '/'});
        }
        this.options = JSON.parse(departments.getDepartments());
      },
      components: {},
      methods: {
        submitFn() {
          this.$refs.departmentForm.validate((valid) => {
            if (valid) {
              this.$MyFetch.post(api.setDepartment, {departmentId: this.form.department})
                .then(data => {
                  menu.setMenu(JSON.stringify(data.menu));
                  token.setToken(data.token);
                  console.log(JSON.stringify(data.token));
                  this.$router.push({path: '/'});
                })
                .catch(err => {
                  this.confirmFn(err.message);
                });
            }
          });
        }
      }
    };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .selectRole{
    width: 100%;
    height: 100%;
    .form{
      width: 220px;
      padding-top: 100px;
      margin: 0px auto;
    }
  }
</style>
