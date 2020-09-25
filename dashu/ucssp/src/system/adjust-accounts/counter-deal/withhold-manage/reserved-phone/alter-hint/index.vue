<style lang="less" rel="stylesheet/less" scoped>
// 公共样式
/deep/ .el-input__inner {
      width: 245px;
  }
  /deep/ .el-form-item__error {
    margin-top: 10px;
  }
.drop_loan {
  .dialog-mask {
    z-index: 1000;
  }
  .dialog-box {
    .dialog-box__top {
      margin: 0px;
    }
    width: 945px;
    padding: 0px;
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      color: #000;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: normal;
      font-family: PingFangSC-Regular;
    }
    .el-form-item {
      width: 28%;
      margin-right: 40px;
    }
    .el-form-item .el-select {
      width: 245px;
    }
    .dialog-box__middle {
      .middle {
        .el-select {
          display: block;
        }
        .el-textarea__inner {
          background: #d0d0d0;
        }
      }
    }
    .dialog-box__middle-form {
      // height: 495px;
      overflow-y: auto;
      .form__block {
        box-shadow: 0 2px 6px 0 #d0d0d0;
      }
      .form__bottom {
        left: 50%;
        background-color: rgba(255, 255, 255);
        .add {
          width: 200px;
          height: 41px;
        }
      }
    }
    .el-form-item {
      width: 118px;
      height: 30px;
      margin-left: 20px;
      .el-form-item__content {
        width: 118px;
        height: 30px;
        // 不进审计详情分类 文字溢出隐藏
        .classification {
          width: 118px;
          height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .el-form-item__content {
        width: 118px;
        height: 30px;
        .el-input-number {
          width: 118px;
          height: 30px;
        }
        .el-input {
          width: 118px;
          height: 30px;
        }
        .el-select {
          width: 118px;
          height: 30px;
          .el-input {
            width: 118px;
            height: 30px;
          }
        }
      }
    }
  }
  /*表单区块*/
  .dialog-box__middle-form {
    .form__bottom {
      text-align: center;
    }
  }
  // 弹窗下部分
  .complete-product {
    width: 100%;
    // height: 495px;
    // 引入按钮
    .import_btn {
      // 新增按钮
      .add {
          width: 100px;
          height: 40px;
          border: none;
          background: #538bf1;
          border-radius: 4px;
          color: #fff;
          display: block;
          cursor: pointer;
          // margin: 20px 30px;
      }
    }
    // 信息展示
    .info_show {
      padding: 20px 30px;
      padding-bottom: 0;
      .info_item {
        display: inline-block;
        width: 290px;
        margin-bottom: 20px;
        // white-space: nowrap;
        .info_left {
          font-style: normal;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #666;
        }
        .info_right {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #EEB352;
          line-height: 20px;
        }
        .black_color {
            color: #151515;
          }
      }
    }
    // 选择填写框
    .select_box {
      .el-form-item {
        margin: 0;
        .el-input__inner {
          width: 245px;
        }
      }
      .select_item {
        display: inline-block;
        width: 245px;
        height: 66px;
        white-space: nowrap;
        margin-left: 30px;
        margin-bottom: 20px;
        .select_title {
          span {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #BBBBBB;
            letter-spacing: 1.09px;
          }
        }
        .select_input {
          .select_245 {
            width: 245px;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 弹窗上部分 -->
      <div class="dialog-box__top">
        <h5 class="title_type">修改</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <!-- 弹窗下部分 -->
      <div class="complete-product">
        <div class="dialog-box__middle-form">
            <div class="form__block bg__white border__radius-5" >
              <!-- 信息展示 -->
              <div class="info_show">
                <!-- <span class="info_item">
                  <i class="info_left">申请编号:&nbsp;</i>
                  <b class="info_right black_color">{{ rowData.loanNo }}</b>
                </span> -->
                <span class="info_item">
                  <i class="info_left">出账编号:&nbsp;</i>
                  <b class="info_right black_color">{{ rowData.loanNo }}</b>
                </span>
                <span class="info_item">
                  <i class="info_left">姓名:&nbsp;</i>
                  <b class="info_right black_color">{{ rowData.customerName }}</b>
                </span>
                <span class="info_item">
                  <i class="info_left">身份证号码:&nbsp;</i>
                  <b class="info_right black_color">{{ rowData.certNo }}</b>
                </span>
                <span class="info_item">
                  <i class="info_left">扣款银行卡号:&nbsp;</i>
                  <b class="info_right black_color">{{ rowData.deductAccNo }}</b>
                </span>
                <span class="info_item">
                  <i class="info_left">扣款银行:&nbsp;</i>
                  <b class="info_right black_color">{{ rowData.bankName }}</b>
                </span>
                <span class="info_item">
                  <i class="info_left">当前扣款渠道:&nbsp;</i>
                  <b class="info_right black_color">{{ rowData.oldValueName }}</b>
                </span>
                <span class="info_item">
                  <i class="info_left">入账机构:&nbsp;</i>
                  <b class="info_right black_color">{{ rowData.branchName }}</b>
                </span>
                <!-- <span class="info_item">
                  <i class="info_left">客户经理:&nbsp;</i>
                  <b class="info_right black_color">{{ rowData.loanNo }}</b>
                </span> -->
                <span class="info_item">
                  <i class="info_left">合作模式:&nbsp;</i>
                  <b class="info_right black_color">{{ rowData.collaborateName }}</b>
                </span>
              </div>
              <el-form :model="writeInfo" :rules="rules" ref="writeInfo">
                <!-- 选择填写框 -->
                <div class="select_box">
                   <!-- 银行预留手机号 -->
                  <div class="select_item">
                    <div class="select_title">
                      <span>银行预留手机号</span>
                    </div>
                    <el-form-item prop="phone">
                      <el-input v-model="writeInfo.phone" placeholder="请填写"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-form>
            </div>
            <div class="form__bottom">
              <el-button class="add finish button" type="primary" @click="finish">确认</el-button>
            </div>
        </div>
      </div>
    </div>
    <!-- 文字提示组件 -->
    <fontHint v-if="fontHintFlag" :massage="fontHintMsg" @close="fontHintClose"></fontHint>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import fontHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 文字提示组件
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
export default {
  props: ["rowData"],
  data() {
    return {
      fontHintFlag: false, // 文字提示开关
      fontHintMsg: '', // 文字提示内容
      writeInfo: {
        phone: ''
      },
      rules: {
        phone: [
          { required: false, trigger: 'blur', message: '请选择' },
          {validator: this.phoneRule, trigger: 'blur'}
        ]
      }
    };
  },
  mounted() {
    this.writeInfo.phone = this.rowData.phone;
  },
  methods: {
    // 关闭文字提示组件
    fontHintClose() {
      this.fontHintFlag = false;
    },
  // 手机号码
  phoneRule: (rule, value, callback) => {
    const valReg = /^1[3456789]\d{9}$/;
    if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入正确的手机号码'));
    } else {
      callback();
    }
  },
    // 代偿发起-提交
    BanksReservePhoneSave(res) {
       return new Promise((resolve, reject) => {
            res = res || {};
            let url = counterDealApi.BanksReservePhoneSave;
            this.$MyFetch.post(url, res)
            .then((data = {}) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
       });
    },
    close() {
      this.$emit("clsoe_windowAlert");
    },
    // 确认按钮
    finish() {
      let _this = this;
      if (this.writeInfo.phone === this.rowData.phone) {
        this.fontHintMsg = "请修改手机号";
        this.fontHintFlag = true;
      } else {
        // input验证方法
        this.$refs.writeInfo.validate((valid) => {
          if (valid) {
            let queryData = {
              loanNo: this.rowData.loanNo,
              collaborateName: this.rowData.collaborateName,
              customerName: this.rowData.customerName,
              certNo: this.rowData.certNo,
              deductAccNo: this.rowData.deductAccNo,
              bankCode: this.rowData.bankCode,
              branchCode: this.rowData.branchCode,
              oldValue: this.rowData.oldValue,
              phone: this.rowData.phone,
              putoutDate: this.rowData.putoutDate,
              newValue: this.writeInfo.phone
            };
            _this.BanksReservePhoneSave(queryData)
            .then((res) => {
              _this.close();
              _this.$message.success("修改成功");
              _this.$emit("reload");
            })
            .catch((err) => {
                this.$error(err);
            });
          }
        });
      }
    }
  },
  components: {
    fontHint
  }
};
</script>
