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
    <div class="dialog-box" v-loading='loading'>
      <!-- 弹窗上部分 -->
      <div class="dialog-box__top">
        <h5 class="title_type">编辑</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <!-- 弹窗下部分 -->
      <div class="complete-product">
        <div class="dialog-box__middle-form">
            <div class="form__block bg__white border__radius-5" >
              <!-- 信息展示 -->
              <div class="info_show">
                <span class="info_item">
                  <i class="info_left">出账编号:&nbsp;</i>
                  <b class="info_right black_color">{{ rowData.loanNo }}</b>
                </span>
                <span class="info_item">
                  <i class="info_left">客户名称:&nbsp;</i>
                  <b class="info_right black_color">{{ rowData.customerName }}</b>
                </span>
                <span class="info_item">
                  <i class="info_left">身份证号码:&nbsp;</i>
                  <b class="info_right black_color">{{ rowData.certNo | certificateNum }}</b>
                </span>
                <span class="info_item">
                  <i class="info_left">扣款账号:&nbsp;</i>
                  <b class="info_right black_color">{{ rowData.deductAccNo }}</b>
                </span>
                <span class="info_item">
                  <i class="info_left">扣款总额:&nbsp;</i>
                  <b class="info_right black_color">{{ amt }}</b>
                </span>
              </div>
              <el-form :model="writeInfo" :rules="rules" ref="writeInfo">
                <!-- 选择填写框 -->
                <div class="select_box">
                   <!-- 扣款金额 -->
                  <div class="select_item">
                    <div class="select_title">
                      <span>扣款金额</span>
                    </div>
                    <el-form-item prop="actualCompound">
                      <el-input v-model="writeInfo.actualCompound" placeholder="请填写"></el-input>
                    </el-form-item>
                  </div>
                   <!-- 扣款渠道 -->
                  <div class="select_item">
                    <div class="select_title">
                      <span>扣款渠道</span>
                    </div>
                    <div class="select_input">
                      <el-form-item prop="ChanneCodeNo">
                        <el-select v-model="writeInfo.ChanneCodeNo" class="select_245" placeholder="请选择">
                          <el-option v-for="item in ChannelList"
                            :key="item.itemNo"
                            :label="item.itemName"
                            :value="item.itemNo">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </div>
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
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import fontHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 文字提示组件
import reportRules from "@/system/adjust-accounts/counter-deal/js/reportRules"; // 正则
export default {
  props: ["rowData"],
  data() {
    return {
      loading: false,
      fontHintFlag: false, // 文字提示开关
      fontHintMsg: '', // 文字提示内容
      ChannelList: [],
      amt: '0', // 扣款总额
      writeInfo: {
        ChanneCodeNo: '',
        actualCompound: ''
      },
      rules: {
        ChanneCodeNo: [
          { required: true, trigger: 'change', message: '请选择' }
        ],
        actualCompound: [
          { required: true, trigger: 'blur', message: '请填写' },
          { trigger: 'blur', validator: this.nonNegative },
          { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
        ]
      }
    };
  },
  created() {
    this.ChannelListApi({}); // 渠道列表接口
      let DeductAmountData = {
        loanNo: this.rowData.loanNo
      };
      // 总金额算出
      this.CalSingleDeductAmount(DeductAmountData)
      .then((data) => {
        this.amt = data;
      })
      .catch((err) => {
        this.$error(err);
      });
  },
  methods: {
    // shihuan
  nonNegative(rule, value, callback) {
    const valReg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
    if (String(value) === '0') {
      return callback(new Error('扣款金额不能为0！'));
    } else if (!valReg.test(value) && !!value) {
      return callback(new Error('请输入正确的金额！'));
    } else {
      if (Number(value) > Number(this.amt)) {
        callback(new Error('扣款金额不能大于扣款总额!'));
      } else {
        callback();
      }
    }
  },
    // 关闭文字提示组件
    fontHintClose() {
      this.fontHintFlag = false;
    },
    // 渠道列表
    ChannelListApi(res) {
      this.$MyFetch.get(counterDealApi.queryDeductChannelLists, res)
      .then((data = {}) => {
          this.ChannelList = data;
          })
      .catch((err) => {
          this.$error(err.message);
      });
    },
    // 单笔公共校验数据在途
      checkData(res) {
        return new Promise((resolve, reject) => {
          this.$MyFetch.post(counterDealApi.checkData, res)
            .then((data = {}) => {
              if (data.success) {
                resolve(data);
              } else {
                reject(data.msg);
              }
            })
            .catch((err) => {
                this.$error(err.message);
                this.loading = false;
            });
        });
      },
      // 单笔扣款保存
      deductManagementSingleDeductAmountUpdate(res) {
        return new Promise((resolve, reject) => {
          this.$MyFetch.post(counterDealApi.deductManagementSingleDeductAmountUpdate, res)
            .then((data = {}) => {
              if (data.success) {
                resolve(data);
              } else {
                reject(data.msg);
              }
            })
            .catch((err) => {
              this.loading = false;
              this.$error(err.message);
            });
        });
      },
      // 计算总额
      CalSingleDeductAmount(res) {
        return new Promise((resolve, reject) => {
          this.$MyFetch.post(counterDealApi.CalSingleDeductAmount, res)
            .then((data = {}) => {
              if (data.success) {
                resolve(data.amt);
              } else {
                reject(data.msg);
              }
            })
            .catch((err) => {
              this.$error(err);
            });
        });
      },
    close() {
      this.$emit("clsoe_windowAlert");
    },
    // 确认按钮
    finish() {
      let _this = this;
      // input验证方法
          this.$refs.writeInfo.validate((valid) => {
            if (valid) {
              if (String(this.amt) === '0') {
                  _this.fontHintMsg = '扣款总额为0,不允许发起代扣!';
                  _this.fontHintFlag = true;
              } else {
                this.loading = true;
                let checkRefData = {
                  loanNo: this.rowData.loanNo
                };
                _this.checkData(checkRefData)
                .then((data) => {
                  // 保存
                  let updataData = {
                    loanNo: this.rowData.loanNo,
                    transChannel: this.writeInfo.ChanneCodeNo,
                    deductAmount: this.writeInfo.actualCompound
                  };
                  _this.deductManagementSingleDeductAmountUpdate(updataData)
                  .then((data = {}) => {
                    _this.loading = false;
                    // _this.$emit("reload");
                    _this.$emit("alterMsg", data.msg);
                    // _this.$message.success("扣款成功!");
                    _this.close();
                  })
                  .catch((err) => {
                    _this.loading = false;
                    _this.fontHintMsg = err;
                    _this.fontHintFlag = true;
                  });
                })
                .catch((err) => {
                  this.loading = false;
                  this.fontHintMsg = err;
                  this.fontHintFlag = true;
                });
              }
            }
          });
    }
  },
  components: {
    fontHint // 文字提示组件
  }
};
</script>
