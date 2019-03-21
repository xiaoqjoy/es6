<template>
  <div class="warn-set">
    <div class="switch">显示开关
      <el-switch v-model="status" @change="switchStatus" active-color="#13ce66" inactive-color="#ff4949">
      </el-switch>
    </div>
    <div class="table">
      <table border="1" cellspacing="0" cellpadding="0" width="100%">
        <tr>
          <th width="50%">内容</th>
          <th width="50%">操作</th>
        </tr>
        <tr>
          <td>
            <el-form :model="datas" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm" onsubmit="return false;">
              <el-form-item label="联系电话" prop="phone">
                <el-input v-model.trim="datas.phone" :disabled="showInput"></el-input>
              </el-form-item>
              <el-form-item label="地址：" prop="address">
                <el-input v-model.trim="datas.address" :disabled="showInput"></el-input>
              </el-form-item>
            </el-form>
          </td>
          <td rowspan="2">
            <el-button @click="handle('ruleForm')">{{ this.showInput?'编辑':'保存' }}</el-button>
          </td>
        </tr>
      </table>
    </div>
    <div class="css">
      <p>参考样式:</p>
      <div class="box">
        <h4>诊疗计划提醒</h4>
        <span>7月5号</span>
        <p>您好，这里是南山卫生局</p>
        <p>姓名: 张三</p>
        <p>时间: 2018年7月10号 12时12分12秒</p>
        <p>计划内容:</p>
        <p>注意多测量空腹血糖</p>
        <p>联系电话: 13555665566</p>
        <p>地址: 南山街道科技园88号</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'warn-set',
    data() {
      return {
        edit: '编辑',
        showInput: true,
        status: false,
        datas: {
          address: "",
          id: "",
          phone: "",
        },
        rules: {
          address: [{
              required: false,
              message: '请输入地址',
              trigger: 'blur'
            },
            {
              max: 50,
              message: '地址不能超过50个字',
              trigger: 'blur'
            }
          ],
          phone: [{
            required: false,
            message: '请输入手机号',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      //公共请求数据方法
      requestData() {
        let data = {
          id: this.datas.id,
          status: this.status ? 1 : 2,
          phone: this.datas.phone,
          address: this.datas.address
        }
        this.$api.modifyRemind(data, res => {
          if (res.data.code == 0) {
            //this.$message(res.data.data)
            this.showInput = true;
            this.rules.phone[0].required = false;
            this.rules.address[0].required = false;
          }else {
            this.$message(res.data.errMsg)
          }
        }, res => {
          this.$message(res.data.errMsg)
        })
      },
      //开关事件
      switchStatus() {
        this.requestData();
      },
      //编辑
      handle(formName) {
        if (!this.showInput) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.requestData();
            }
          });
        } else {
          this.showInput = false;
          this.rules.phone[0].required = true;
          this.rules.address[0].required = true;
        }
      }
    },
    created() {
      let user = JSON.parse(sessionStorage.getItem('user'));
      let data = {
        organizationId: user.organizationId
      }
      this.$api.queryByOrganizationId(data, res => {
        if (res.data.code == 0) {
          this.datas = res.data.data;
          this.status = res.data.data.status == 1 ? true : false;
        }
      }, res => {
        this.$message(res.data.errMsg)
      })
    }
  }
</script>
<style scoped>
  .switch {
    border-bottom: 1px solid #eff2f5;
    padding: 20px;
    height: 30px;
    text-align: right;
  }
  .switch .el-switch {
    float: right;
    margin-top: 2px;
    margin-left: 10px;
  }
  .table {
    margin: 20px;
  }
  .css {
    margin: 20px;
  }
  .box {
    border: 15px solid #ebebeb;
    width: 280px;
    min-height: 165px;
    display: inline-block;
    margin-top: 10px;
    padding: 10px 5px;
  }
  .box span {
    color: #b4b4b4;
  }
  table {
    border-collapse: collapse;
    font-size: 14px;
  }
  table tr {
    border: 1px solid #eff2f5;
    height: 40px;
  }
  table tr td {
    text-align: center;
  }
  .demo-ruleForm {
    width: 93%;
    margin: 10px auto;
  }
</style>