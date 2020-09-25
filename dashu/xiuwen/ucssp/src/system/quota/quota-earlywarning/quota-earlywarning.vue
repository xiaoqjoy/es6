<style lang="less" rel="stylesheet/less" scoped>
.quota-earlywarning{
    height: 100%;
    min-height: 500px;

  .content-contain {
    height: 100px;
    padding-top: 20px;
    margin-left: 30px;
    .mid {
      margin-top: 32px;
      float: left;
    }
    .add {
      margin-top: 21px;
      float: left;
    }

    .demo-form-inline {
      float: left;
      // width: 60%;
      padding-top: 0;
      margin-bottom: 0;
      // display: flex;
    }
    .item {
      // min-width: 200px;
      font-size: 14px;
      color: #666;
      margin-right: 40px;
      display: inline-block;
      // width: 171px;
      span {
        color: #151515;
      }
      .small-text {
        color: #666;
        font-size: 12px;
        text-align: left;
      }
    }
    .quota {
      width: 171px;
      .small-text{
        display: block;
        margin-bottom: 10px;
      }
    }
  }
  /deep/ .el-form--inline .el-form-item{
    margin-right: 0;
  }
  }
</style>
<template>
  <div class="contain quota-earlywarning">
    <div class="content-contain">
      <div class="item mid">发件人： <span>{{data.sendEmailAddress}}</span></div>
      <div class="item mid">发送频率：  <span>{{data.frequency}}次/每天</span></div>
      <el-form
      :inline="true"
      :model="form"
      ref="form"
      class="demo-form-inline"
      :rules="commonRules">
        <div class="item quota">
          <span class="small-text">额度预警百分比</span>
           <el-form-item prop="warnPercent">
              <el-input type="text" v-model="form.warnPercent" placeholder="请填写"></el-input>
           </el-form-item>
        </div>
        <div class="item quota">
          <span class="small-text">收件人</span>
          <el-form-item prop="receiveEmailAddress">
            <el-input type="text" v-model="form.receiveEmailAddress" placeholder="请填写"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <button class="add" @click="onSubmit" style="width: 170px">保存</button>
    </div>
  </div>
</template>

<script>
import {quotaApi} from '../js/server.js';
import myRule from '@common/js/rules';
export default {
  data() {
    return {
      data: {
        "sendEmailAddress": "",
        "frequency": 0
      },
      form: {
        "warnPercent": 0,
        "receiveEmailAddress": ""
      },
      commonRules: {
        warnPercent: [
          { required: true, message: '请填写额度预警百分比', trigger: 'blur' },
          { validator: myRule.percentRule, trigger: 'blur' }
        ],
        receiveEmailAddress: [
          { required: true, message: '请填写收件人邮箱', trigger: 'blur' },
          { validator: myRule.emaiRule, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    getData () {
      this.$MyFetch.get(quotaApi.warningConfigs)
      .then((data = {}) => {
        this.data = data;
        this.form = data;
      })
      .catch((err) => {
        this.$error(err.message);
      });
    },
    onSubmit() {
      let data = {...this.form, ...this.data};

       this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$MyFetch.post(quotaApi.warningConfigs, data)
          .then((data = {}) => {
            this.$message({
              message: '保存成功',
              center: true
            });
          })
          .catch((err) => {
            this.$error(err.message);
          });
        }
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>
