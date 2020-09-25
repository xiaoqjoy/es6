<style lang="less" rel="stylesheet/less" scoped>
// 公共样式
.margin_r_30 {
  margin-right: 25px;
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
    width: 590px;
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
    .dialog-box__middle-form {
      // height: 495px;
      overflow-y: auto;
      .form__block {
        // height: 425px;
        padding: 20px 0px;
        padding-left: 30px;
        padding-right: 0;
        box-shadow: 0 2px 6px 0 #d0d0d0;
      }
      .form__bottom {
        left: 50%;
        // padding-bottom: 30px;
        background-color: rgba(255, 255, 255);
        .add {
          width: 200px;
        }
      }
    }
  }
  // 弹窗下部分
  .complete-product {
    width: 100%;
    // 信息展示
    .info_show {
      // line-height: 40px;
      .info_item {
        display: inline-block;
        white-space: nowrap;
        margin-right: 20px;
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
        height: 70px;
        white-space: nowrap;
        // margin-right: 60px;
        margin-bottom: 10px;
        .select_title {
          span {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #BBBBBB;
            letter-spacing: 1.09px;
          }
        }
        .select_input {
          margin-top: 8px;
          .select_245 {
            width: 245px;
          }
        /deep/.el-input__inner {
            width: 245px;
        }
        }
        // 日期控件padding
        /deep/.el-input--prefix .el-input__inner {
          padding-left: 15px;
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
              <!-- 信息展示 -->
              <div class="info_show">
                <span class="info_item">
                  <i class="info_left">客户姓名:&nbsp;</i>
                  <b class="info_right">{{ customerName }}</b>
                </span>
                <span class="info_item">
                  <i class="info_left">合作机构:&nbsp;</i>
                  <b class="info_right">{{ lineidName }}</b>
                </span>
              </div>
              <!-- 选择填写框 -->
              <el-form :model="writeInfo" :rules="rules" ref="writeInfo">
                <div class="select_box">
                  <!-- 出账编号 -->
                  <div class="select_item margin_r_30">
                    <div class="select_title">
                      <span>出账编号</span>
                    </div>
                    <div class="select_input">
                      <el-form-item prop="loanNo">
                        <el-input v-model="writeInfo.loanNo" placeholder="请输入" @change="loanNoChange"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <!-- 记账渠道 -->
                    <div class="select_item margin_r_60">
                      <div class="select_title">
                        <span>记账渠道</span>
                      </div>
                      <div class="select_input" style="margin-top: 8px;">
                      <el-form-item prop="transChannel">
                          <el-select v-model="writeInfo.transChannel" class="select_245" placeholder="记账渠道">
                            <el-option v-for="item in ChannelList"
                              :key="item.itemNo"
                              :label="item.itemName"
                              :value="item.itemNo">
                            </el-option>
                          </el-select>
                      </el-form-item>
                      </div>
                    </div>
                  <!-- 转账人姓名 -->
                  <div class="select_item margin_r_30">
                    <div class="select_title">
                      <span>转账人姓名</span>
                    </div>
                    <div class="select_input">
                      <el-form-item prop="operatorName">
                        <el-input v-model="writeInfo.operatorName" placeholder="请输入"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <!-- 存款日期 -->
                  <div class="select_item">
                    <div class="select_title">
                      <span>存款日期</span>
                    </div>
                    <div class="select_input">
                      <el-form-item prop="inputDate">
                      <el-date-picker
                      v-model="writeInfo.inputDate"
                      class="select_245"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="请选择">
                      </el-date-picker>
                      </el-form-item>
                    </div>
                  </div>
                  <!-- 存款金额 -->
                  <div class="select_item margin_r_30">
                    <div class="select_title">
                      <span>存款金额</span>
                    </div>
                    <div class="select_input">
                      <!-- <el-input class="select_245" placeholder="请输入" v-model="inputAmount"></el-input> -->
                      <el-form-item prop="inputAmount">
                        <el-input v-model="writeInfo.inputAmount" placeholder="请输入"></el-input>
                      </el-form-item>
                    </div>
                  </div>
                  <!-- 记账日期 -->
                  <div class="select_item">
                    <div class="select_title">
                      <span>记账日期</span>
                    </div>
                    <div class="select_input">
                      <el-form-item prop="accDate">
                        <el-date-picker
                        v-model="writeInfo.accDate"
                        class="select_245"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="请选择">
                        </el-date-picker>
                      </el-form-item>
                    </div>
                  </div>
                </div>
              </el-form>
            </div>
            <div class="form__bottom">
              <el-button class="add button " type="primary" :disabled="loanNoIs" @click="finish">确认</el-button>
            </div>
        </div>
      </div>
    </div>
    <!-- 文字提示组件 -->
    <fontHint v-if="fontHintFlag" :massage="massage" @close="fontHintClose"></fontHint>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import fontHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 文字提示组件
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import reportRules from "@/system/adjust-accounts/counter-deal/js/reportRules"; // 正则
export default {
  props: ["refer"],
  data() {
    return {
      form: {
        codeNo: "", // 渠道标识
        itemName: "", // 渠道名称
        itemNo: "" // 渠道编码
      },
        customerName: '', // 用户名
        lineidName: '', // 合作机构
      // 填写信息
      writeInfo: {
        loanNo: '', // 出账编号
        inputDate: '', // 存款日期
        accDate: '', // 记账日期
        operatorName: '', // 转账人姓名
        inputAmount: '', // 存款金额
        transChannel: '' // 扣款渠道
      },
      // 渠道列表
      ChannelList: [],
      fontHintFlag: false, // 文字提示开关
      massage: '请检查出账编号',
      loanNoIs: true, // 出战编号是否有效
      rules: {
        loanNo: [ // 出账编号
          { required: true, trigger: 'blur', message: '请填写' }
        ],
        inputDate: [ // 存款日期
          { required: true, message: '请选择存款日期', trigger: 'change' }
        ],
        accDate: [ // 记账日期
          { required: true, message: '请选择记账日期', trigger: 'change' }
        ],
        operatorName: [ // 转账人姓名
          { required: false, trigger: 'blur', message: '请填写' }
        ],
        inputAmount: [ // 存款金额
          { required: true, trigger: 'blur', message: '请填写' },
          { trigger: 'blur', validator: reportRules.nonNegative3 },
          { trigger: 'blur', validator: reportRules.surpassNumTwoBitAndNegative }
        ],
        transChannel: [ // 扣款渠道
          { required: true, trigger: 'change', message: '请选择扣款渠道' }
        ]
      }

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
  },
  methods: {
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
    // 代偿申请新增
    buyBackQueryCustomerInfo(res) {
        res = res || {
          loanNo: 'RL00101812271011'
        };
        let url = counterDealApi.buyBackQueryCustomerInfo;
        this.$MyFetch.get(url, res)
        .then((data = {}) => {
            if (!data) {
              this.massage = '请检查出账编号';
              this.fontHintFlag = true;
              this.loanNoIs = true;
            } else {
              // this.certNo = data.certNo; // 身份号码
              this.customerName = data.customerName; // 用户名
              this.lineidName = data.lineidName; // 合作机构
              // this.orgName = data.orgName; // 分公司
              this.loanNoIs = false;
            }
        })
        .catch((err) => {
            this.$error(err);
        });
    },
    // 代偿发起-新增-保存
    buyBackRecoverSave(res) {
      return new Promise((resolve, reject) => {
        res = res || {};
        let url = counterDealApi.buyBackRecoverSave;
        this.$MyFetch.post(url, res)
        .then((data = {}) => {
            resolve(data);
        })
        .catch((err) => {
            this.$error(err);
            reject(err);
        });
      });
    },
     // 代偿新增保存校验数据是否在途
     recoverPayinTransit(res) {
       return new Promise((resolve, reject) => {
          let url = counterDealApi.recoverPayinTransit;
          this.$MyFetch.post(url, res)
          .then((data = {}) => {
            if (data.success) {
              resolve(data);
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
    // 出战编号失焦事件
    loanNoChange() {
      console.log("shijiao");
      // this.certNo = ''; // 身份号码
      this.customerName = ''; // 用户名
      this.lineidName = ''; // 合作机构
      // this.orgName = ''; // 分公司
      let res = {
          loanNo: this.writeInfo.loanNo
        };
      this.buyBackQueryCustomerInfo(res);
    },
    // 关闭文字提示组件
    fontHintClose() {
      this.fontHintFlag = false;
    },
    // 保存
    finish() {
      let _that = this;
      this.$refs.writeInfo.validate((valid) => {
        if (valid) {
              let regData = {
                loanNo: this.writeInfo.loanNo,
                inputAmount: this.writeInfo.inputAmount,
                transChannel: this.writeInfo.transChannel
              };
              this.recoverPayinTransit(regData)
              .then((data) => {
                let submitData = {
                  customerName: this.customerName,
                  lineidName: this.lineidName,
                  loanNo: this.writeInfo.loanNo,
                  inputDate: this.writeInfo.inputDate,
                  accDate: this.writeInfo.accDate,
                  operatorName: this.writeInfo.operatorName,
                  inputAmount: this.writeInfo.inputAmount,
                  transChannel: this.writeInfo.transChannel,
                  flowNo: 'payBuyBackFlow'
                };
                _that.buyBackRecoverSave(submitData)
                .then((data) => {
                  console.log("保存成功");
                  _that.$emit("reload");
                  _that.$emit("clsoe_windowAlert");
                })
                .catch((data) => {
                    _that.massage = data.message;
                    _that.fontHintFlag = true;
                });
              })
              .catch((err) => {
                this.massage = err;
                this.fontHintFlag = true;
              });
        }
      });
    },
    // 关闭引入单笔还款
    close_2() {
      this.alert_2 = false;
    },
     // 引入传来得数据
    importSendData(data) {
      console.log(data, "importdata");
      this.importData = data || {};
    }
  },
  components: {
    fontHint // 文字提示组件
  }
};
</script>
