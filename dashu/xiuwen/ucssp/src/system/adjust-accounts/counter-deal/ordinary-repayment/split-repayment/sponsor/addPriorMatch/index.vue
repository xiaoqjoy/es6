<style lang="less" rel="stylesheet/less" scoped>
// 公共样式
.margin_r_60 {
  margin-right: 60px;
}
.drop_loan {
  .dialog-mask {
    z-index: 1000;
  }
  .dialog-box {
    // height: 555px;
    .dialog-box__top {
      margin: 0px;
    }
    width: 945px;
    // height: 765px;
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
    .mgtop {
      margin-top: 20px;
    }
    .el-form-item {
      width: 28%;
      margin-right: 40px;
    }
    .el-form-item .el-select {
      width: 245px;
    }
    .dialog-box__middle {
      // height: 495px;
      .middle {
        .el-select {
          display: block;
        }
        .el-textarea__inner {
          background: #d0d0d0;
        }
      }
    }
    .dialog-box__middle-1200 {
      // height: 709px;
      overflow-y: auto;
      margin: 0 20px;
      padding: 25px 30px;
      box-shadow: 0 2px 6px 0 #d0d0d0;
      .dialog-box__middle-top {
        padding: 20px 0;
        border-bottom: 1px solid #d0d0d0;
        .title {
          font-size: 16px;
          .icon__gan {
            margin-right: 10px;
          }
        }
      }
    }
    .dialog-box__middle-form {
      // height: 495px;
      overflow-y: auto;
      .form__block {
        // height: 425px;
        padding: 20px 30px;
        box-shadow: 0 2px 6px 0 #d0d0d0;
      }
      .form__bottom {
        left: 50%;
        padding-bottom: 30px;
        background-color: rgba(255, 255, 255);
        .add {
          width: 200px;
        }
      }
    }
    .el-form-item {
      width: 118px;
      height: 30px;
      // margin-left: 20px;
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
      padding-bottom: 20px;
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
          height: 41px;
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
      // line-height: 40px;
      margin-top: 20px;
      .info_item {
        display: inline-block;
        white-space: nowrap;
        margin-right: 60px;
        margin-bottom: 20px;
        .info_left {
          font-style: normal;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #666;
        }
        .info_right {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #151515;
          line-height: 20px;
        }
      }
    }
    // 选择填写框
    .select_box {
      .select_item {
        display: inline-block;
        width: 245px;
        height: 65px;
        white-space: nowrap;
        // margin-right: 60px;
        margin-bottom: 20px;
        .el-form-item {
          margin-top: 8px;
          /deep/.el-input__inner {
            width: 245px;
          }
        }
        .select_title {
          span {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #BBBBBB;
            letter-spacing: 1.09px;
          }
        }
        .select_input {
          // margin-top: 8px;
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
        <h5 class="title_type">新增</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <!-- 弹窗下部分 -->
      <div class="complete-product">
        <div class="dialog-box__middle-form">
            <div class="form__block bg__white border__radius-5" >
              <!-- 引入按钮 -->
              <div class="import_btn">
                <button class="add button " @click="import_alert">+ 引入</button>
              </div>
              <!-- 信息展示 -->
              <div class="info_show">
                <span class="info_item">
                  <i class="info_left">交易号:&nbsp;</i>
                  <b class="info_right">{{businessCode}}</b>
                </span>
                <span class="info_item">
                  <i class="info_left">出账编号:&nbsp;</i>
                  <b class="info_right">{{importData.loan_no}}</b>
                </span>
                <span class="info_item">
                  <i class="info_left">记账金额:&nbsp;</i>
                  <b class="info_right" style="color: #EEB352">{{importData.trans_amount}}</b>
                </span>
                <span class="info_item" style="margin-right: 0px;">
                  <i class="info_left">申请时间:&nbsp;</i>
                  <b class="info_right">{{importData.occ_date}}</b>
                </span>
              </div>
              <el-form :model="writeInfo" :rules="rules" ref="writeInfo">
                <!-- 选择填写框 -->
                <div class="select_box">
                  <!-- 记账日期 -->
                    <div class="select_item margin_r_60">
                      <div class="select_title">
                        <span>记账日期</span>
                      </div>
                      <div class="select_input">
                        <el-form-item prop="tally_date">
                        <el-date-picker
                        v-model="writeInfo.tally_date"
                        class="select_245"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择">
                        </el-date-picker>
                        </el-form-item>
                      </div>
                    </div>
                  <!-- 扣款渠道 -->
                  <div class="select_item margin_r_60">
                    <div class="select_title">
                      <span>扣款渠道</span>
                    </div>
                    <div class="select_input">
                      <el-form-item prop="ChanneCodeNo">
                        <el-select v-model="writeInfo.ChanneCodeNo" class="select_245" placeholder="扣款渠道">
                          <el-option v-for="item in ChannelList"
                            :key="item.itemNo"
                            :label="item.itemName"
                            :value="item.itemNo">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <!-- 录入金额 -->
                  <div class="select_item">
                    <div class="select_title">
                      <span>录入金额</span>
                    </div>
                    <el-form-item prop="inputAmount">
                      <el-input v-model="writeInfo.inputAmount" placeholder="请填写"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-form>
            </div>
            <div class="form__bottom">
              <el-button class="add finish button " type="primary" @click="finish">确认</el-button>
            </div>
        </div>
      </div>
    </div>
    <!-- 引入单笔还款 组件 -->
    <importPriorMatch v-if="alert_2" @clsoe_windowAlert2='close_2' @importSendData='importSendData'></importPriorMatch>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import importPriorMatch from "../../sponsor/importPriorMatch/"; // 引入单笔还款
import { counterDealApi } from "../../../../js/server.js"; // 接口
import reportRules from "@/system/adjust-accounts/counter-deal/js/reportRules"; // 正则
export default {
  props: ["refer"],
  data() {
    return {
      // 交易号
      businessCode: "",
      alert_2: false, // 引入单笔还款 组件开关
      // 引入带入的信息， 交易号后面的选项
      importData: {},
      form: {
        codeNo: "", // 渠道标识
        itemName: "", // 渠道名称
        itemNo: "" // 渠道编码
      },
      // 填写信息
      writeInfo: {
        ChanneCodeNo: '', // 扣款渠道
        inputAmount: '', // 录入金额
        tally_date: '' // 记账日期
      },
      // rules
      rules: {
        tally_date: [
          { required: true, trigger: 'blur', message: '请填写' }
        ],
        ChanneCodeNo: [
          { required: true, trigger: 'change', message: '请填写' }
        ],
        inputAmount: [
          { required: true, trigger: 'blur', message: '请填写' },
          { trigger: 'blur', validator: reportRules.nonNegative3 },
          { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative },
          { trigger: 'blur', validator: reportRules.noZero }
        ]
      },
      // 渠道列表
      ChannelList: []
    };
  },
  filters: {
    // 加密 -- 用 * 代替
    encrypt: function(data) {
      let str = '';
      for (let i = 0; i < data.length; i++) {
        str += '*';
      }
      return str;
    }
  },
  mounted() {
    this.ChannelListApi({}); // 渠道列表接口
    this.CreateBusinessNumbers({
      "prefix": "LT"
    }); // 生成业务编码
  },
  methods: {
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
          });
      });
    },
    // 拆分还款新增保存接口  -- 发起 - 新增
    splitRepaymentSave(res) {
      return new Promise((resolve, reject) => {
        this.$MyFetch.post(counterDealApi.splitRepaymentSave, res)
        .then((data = {}) => {
            resolve(data);
            })
        .catch((err) => {
            console.log(err);
            this.$error(err.message);
            reject(err);
        });
      });
    },
    // 生成业务编码
    CreateBusinessNumbers(res) {
      this.$MyFetch.post(counterDealApi.CreateBusinessNumbers, res)
      .then((data = {}) => {
          this.businessCode = data.businessCode;
          })
      .catch((err) => {
          console.log(err);
          this.$error(err.message);
      });
    },
    // 渠道列表
    ChannelListApi(res) {
      this.$MyFetch.get(counterDealApi.ChannelList, res)
      .then((data = {}) => {
          this.ChannelList = data;
          })
      .catch((err) => {
          console.log(err);
          this.$error(err.message);
      });
    },
    close() {
      this.$emit("clsoe_windowAlert");
    },
    // 保存
    finish() {
      let _this = this;
        if (this.importData.loan_no) {
          this.$refs.writeInfo.validate((valid) => {
            if (valid) {
              let checkQueryData = {
                loanNo: _this.importData.loan_no,
                transChannel: _this.writeInfo.ChanneCodeNo
              };
              // 校验接口
              _this.checkData(checkQueryData)
              .then((res) => {
                let splitRepaymentSaveData = {
                  transSerialNo: _this.businessCode, // 交易号
                  loanNo: _this.importData.loan_no, // 贷款编号
                  transAmount: _this.importData.pay_amount, // 记账金额
                  accDate: _this.writeInfo.tally_date, // 记账日期
                  transChannel: _this.writeInfo.ChanneCodeNo, // 扣款渠道
                  inputAmount: _this.writeInfo.inputAmount, // 录入金额
                  processName: "splitPayFlow",
                  transType: "20"
                };
                _this.splitRepaymentSave(splitRepaymentSaveData)
                .then((data) => {
                  _this.$emit("SingleRepayment");
                  _this.$emit("clsoe_windowAlert");
                })
                .catch((err) => {
                  console.log(err);
                });
              })
              .catch((err) => {
                    this.$error(err);
                });
            }
          });
        } else {
          this.$message("请引入出账编号");
        }
    },
    // 关闭引入单笔还款
    close_2() {
      this.alert_2 = false;
    },
     // 引入传来得数据
    importSendData(data) {
      console.log(data, "importdata");
      this.importData = data || {};
    },
    // 点击引入按钮
    import_alert() {
      this.alert_2 = true;
    }
  },
  components: {
    importPriorMatch
    // composite,
    // stateOfPreservation
  }
};
</script>
