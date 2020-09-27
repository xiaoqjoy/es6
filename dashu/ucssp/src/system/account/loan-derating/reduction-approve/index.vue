<template>
  <div class="import-message">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 头部 -->
      <div class="dialog-box__top">
        <h5 class="title bg__white">处理</h5>
        <span class="el-icon-close button button__close" @click="close_()"></span>
      </div>
      <!-- 主体部分 -->
      <div class="dialog-box__body" v-loading='dialogLoading'>
        <!-- 单位信息 -->
        <div class="anti-fraud_dialog-box__middle">
          <el-form class="form" :inline="true" :model="formData" :rules="rules" ref="formData" size="medium">
            <div style="margin-top: 48px;margin-right:90px;margin-left:40px;display:inline-block;font-size: 14px;">
              <span style="color: #666;">原审批金额：</span><span class="info">{{tableData.approveAmt}}</span>
            </div>
            <el-form-item label="变更后审批金额：" style="width:200px;margin-right:10px;" prop="reductionAmt">
              <el-input v-model.number="formData.reductionAmt" placeholder="请填写"></el-input>
            </el-form-item>
          </el-form>
          <div class="bottom-btn" style="margin: 0px;margin-top:24px;">
            <el-button type="primary" class="width200" @click="submitChange">确定</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
export default {
  data() {
    var checkReductionAmt = (rule, value, callback) => {
      if (value === null || value === "") {
        return callback(new Error("审批金额不能为空"));
      }
      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        if (value >= this.tableData.approveAmt) {
          callback(new Error("必须小于原审批金额"));
        } else if (value <= 0) {
          callback(new Error("请输入正数"));
        } else {
          callback();
        }
      }
    };
    return {
      formData: {
        reductionAmt: ""
      },
      // 表格加载状态
      dialogLoading: false,
      // 正则验证
      rules: {
        reductionAmt: [
          { required: true, validator: checkReductionAmt, trigger: "blur" }
        ]
      }
    };
  },
  props: {
    tableData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    indexs: {
      type: Number,
      default: function() {
        return 0;
      }
    }
  },
  // 组件
  components: {},
  methods: {
    // 关闭弹窗
    close_() {
      this.$emit("clsoe_reductionApprove_s");
    },
    // 提交变更
    submitChange() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          let msg = this.formData.reductionAmt;
          this.dialogLoading = true;
          this.confirmFn(
            `确认降额为<span class="warning">【${msg}元】</span>吗？`,
            "warning"
          )
            .then(() => {
              this.$emit("changeApproveAmt", { key: this.indexs, value: msg });
              this.close_();
            })
            .catch(() => {
              this.confirmFn("取消降额", "success");
              this.close_();
            });
        }
      });
    }
  },
  created() {}
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
    width: 498px;
    background: #ffffff;
    .el-form-item {
      margin-right: 20px;
      margin-bottom: 0px;
    }
    .dialog-box__body {
      overflow-y: auto;
      overflow-x: hidden;
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
  overflow: hidden;
  padding: 10px 0;
  border-radius: 4px;
  .info {
    color: #eeb352;
  }
}
</style>
