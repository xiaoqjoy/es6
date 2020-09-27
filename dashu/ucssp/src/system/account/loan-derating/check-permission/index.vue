<template>
  <div class="import-message">
    <div class="dialog-mask"></div>
    <div class="dialog-box" v-loading='tableLoading'>
      <!-- 头部 -->
      <div class="dialog-box__top">
        <h5 class="title bg__white">校验复核人权限</h5>
        <span class="el-icon-close button button__close" @click="close_()"></span>
      </div>
      <!-- 主体部分 -->
      <div class="dialog-box__body">
        <!-- 单位信息 -->
        <div class="anti-fraud_dialog-box__middle">
          <el-form class="form" :inline="true" :model="formData" ref="ruleForm" :rules="rules" size="medium">
            <el-form-item label="用户名" prop="checkUserId" style="width:200px;margin-right:20px;">
              <el-input v-model="formData.checkUserId" placeholder="请填写复核人账户"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="checkByPwd" style="width:200px;margin-right:10px;">
              <el-input v-model="formData.checkByPwd" type="password" placeholder="请填写复核人密码"></el-input>
            </el-form-item>
          </el-form>
          <div class="bottom-btn" style="margin: 0px;margin-top:20px;">
            <el-button type="primary" class="width200" @click="submitRepeal">确定</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
/* eslint-disable */
import { accountApi } from "../../../account/js/server.js"; // 接口
import { hex_sha1 } from '../../../../components/login/she/sha1.js'; // 加密
import "@common/css/dialog";
export default {
  data() {
    return {
      formData: {
        checkUserId: "",
        checkByPwd: ""
      },
      // 正则验证
      rules: {
        checkUserId: [
          { required: true, message: "请输入复核人账户", trigger: "blur" }
        ],
        checkByPwd: [
          { required: true, message: "请输入复核人密码", trigger: "blur" }
        ]
      },
      tableLoading: false
    };
  },
  props: {
    tableData: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  created() {
    // console.log(this.tableData);
  },
  methods: {
    // 关闭弹窗
    close_() {
      this.$emit("clsoe_windowImport_s");
    },
    // 提交
    submitRepeal() {
      // console.log(this.tableData);
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.confirmFn(`确认降额处理吗？`, "warning")
            .then(() => {
              let userId = this.formData.checkUserId;
              let password = this.formData.checkByPwd;
              // console.log(userId.toUpperCase());
              // console.log(password);
              let checkByPwd = hex_sha1(userId.toUpperCase() + password);
              let para = {
                accountId: this.tableData.accountAllotId,
                applicationId: this.tableData.applicationId,
                checkByPwd: checkByPwd,
                checkUserId: userId,
                reductionAmt: this.tableData.reductionAmt
              };
              // console.log(para);
              this.tableLoading = true;
              this.$MyFetch
                .post(accountApi.loan_derating.putoutReductionCommit, para)
                .then((data = {}) => {
                  let msg = "";
                  if (data) {
                    msg = data;
                  } else {
                    msg = "降额成功";
                  }
                  this.$message({
                    message: msg,
                    type: "success"
                  });
                  this.tableLoading = false;
                  this.$parent.refer(1);
                  this.close_();
                })
                .catch(err => {
                  // console.log(err);
                  this.tableLoading = false;
                  this.confirmFn(err.message, "error");
                  this.close_();
                });
            })
            .catch(() => {
              this.confirmFn("取消降额", "success");
              this.close_();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less">
.import-message {
  .el-form-item__label {
    display: block;
    text-align: left;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #bbbbbb;
    letter-spacing: 1.09px;
  }
  .el-input__inner {
    background: #ececec;
  }
  .el-input--suffix .el-input__inner {
    background: #ffffff;
  }
}
</style>

<style lang="less" rel="stylesheet/less" scoped>
.import-message {
  .dialog-box {
    width: 497px;
    background: #ffffff;
    .el-form-item {
      margin-right: 20px;
      margin-bottom: 20px;
    }
    .dialog-box__body {
      // overflow-y: auto;
      // overflow-x: hidden;
      height: 172px;
    }
  }
}
//关闭按钮
.el-icon-close {
  position: absolute;
  font-size: 32px;
  top: 12px;
  right: 10px;
  cursor: pointer;
}
.anti-fraud_dialog-box__middle {
  width: 437px;
  overflow: hidden;
  padding: 10px 0;
  border-radius: 4px;
  margin: 0px auto 0px auto;
}
</style>
