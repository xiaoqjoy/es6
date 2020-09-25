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
      color: #333;
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
        padding: 20px 30px;
        box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
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
  /*按钮*/
  .form__bottom {
    text-align: center;
        left: 50%;
        padding-bottom: 30px;
        padding-top: 20px;
        background-color: rgba(255, 255, 255);
        .add {
          width: 200px;
        }
        .look_info {
          background: #EEB352;
          border: none;
        }
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
      // line-height: 40px;
      margin-top: 10px;
      .info_ul {
        width: 100%;
        overflow: hidden;
        .info_li {
          float: left;
          width: 294px;
          height: 40px;
          display: flex;
          align-items: center;
          .li_title {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #666;
          }
          .li_content {
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            color: #EEB352;
            line-height: 20px;
          }
          .black_color {
            color: #151515;
          }
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
        margin-top: 10px;
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
        }
      }
      // 开始试算
      .start_count_btn {
        display: inline-block;
        width: 100px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #538BF1;
        background: #FFFFFF;
        border-radius: 4px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #538BF1;
        letter-spacing: 1.07px;
        text-align: center;
        margin-top: 12px;
        margin-left: 20px;
        cursor: pointer;
        user-select:none;
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
        <h5 class="title_type">详情</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <!-- 弹窗下部分 -->
      <div class="complete-product">
        <div class="dialog-box__middle-form">
            <div class="form__block bg__white border__radius-5" >
              <!-- 信息展示 -->
              <div class="info_show">
                <ul class="info_ul">
                  <li class="info_li">
                    <span class="li_title">
                      出账编号:&nbsp;&nbsp;
                    </span>
                    <span class="li_content black_color">
                      {{loan_no}}
                    </span>
                  </li>
                  <li class="info_li">
                    <span class="li_title">
                      期次:&nbsp;&nbsp;
                    </span>
                    <span class="li_content black_color">
                      {{trialInfo.sterm}}
                    </span>
                  </li>
                  <li class="info_li">
                    <span class="li_title">
                      还款申请日期:&nbsp;&nbsp;
                    </span>
                    <span class="li_content black_color">
                      {{ trialInfo.applyDate | date_filters }}
                    </span>
                  </li>
                  <li class="info_li">
                    <span class="li_title">
                      应还剩余本金:&nbsp;
                    </span>
                    <span class="li_content">
                      {{trialInfo.balance}}
                    </span>
                  </li>
                  <li class="info_li">
                    <span class="li_title">
                      应还当前利息：&nbsp;
                    </span>
                    <span class="li_content">
                      {{trialInfo.payInte}}
                    </span>
                  </li>
                  <li class="info_li">
                    <span class="li_title">
                      总计还款金额：&nbsp;
                    </span>
                    <span class="li_content">
                      {{trialInfo.totAmt}}
                    </span>
                  </li>
                  <li class="info_li">
                    <span class="li_title">
                      提前还款本金：&nbsp;
                    </span>
                    <span class="li_content">
                      {{trialInfo.payCorp}}
                    </span>
                  </li>
                  <li class="info_li">
                    <span class="li_title">
                      总计应还大数金额：&nbsp;
                    </span>
                    <span class="li_content">
                      {{trialInfo.totDashufFee}}
                    </span>
                  </li>
                  <li class="info_li">
                    <span class="li_title">
                      应还未结清利息：&nbsp;
                    </span>
                    <span class="li_content">
                      {{trialInfo.ddPayInte}}
                    </span>
                  </li>
                  <li class="info_li">
                    <span class="li_title">
                      应还未结清罚息：&nbsp;
                    </span>
                    <span class="li_content">
                      {{trialInfo.ddPayFine}}
                    </span>
                  </li>
                  <li class="info_li">
                    <span class="li_title">
                      应还未结清复利：&nbsp;
                    </span>
                    <span class="li_content">
                      {{trialInfo.ddPayCompound}}
                    </span>
                  </li>
                  <li class="info_li" v-for="item of trialInfo.feeMap" :key="item.feeType">
                    <span class="li_title">
                      {{ item.feeName }}：&nbsp;
                    </span>
                    <span class="li_content">
                      {{item.feeAmount}}
                    </span>
                  </li>
                </ul>
              </div>
              <!-- 选择填写框 -->
              <div class="select_box">
                <!-- 记账日期 -->
                <div class="select_item">
                  <div class="select_title">
                    <span><span style="font-size: 12px;color: #FF1313;padding-right: 2px;">*</span>预计结清日期</span>
                  </div>
                  <div class="select_input">
                    <el-date-picker
                    v-model="tally_date"
                    class="select_245"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择">
                    </el-date-picker>
                  </div>
                </div>
                <!-- 开始试算按钮 -->
                <div class="start_count_btn button" @click="prepaymentTrialFun">
                  开始试算
                </div>
              </div>
            </div>
            <div class="form__bottom">
              <el-button class="add look_info button " type="primary" @click="look_info()" v-if="false">查看贷款信息</el-button>
              <el-button class="add finish button " type="primary" @click="finish()">提交确认</el-button>
            </div>
        </div>
      </div>
    </div>
    <!-- 简单提示 组件 -->
    <simplenessHint v-if="simplenessHintFlag" @close='simplenessHintClose' :massage="simplenessHintData"></simplenessHint>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import simplenessHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 简单提示
export default {
  // 负组件传来的值
  props: {
    tetailData: {
      type: Object,
      required: {}
    }
  },
  data() {
    return {
      isTrial: false,
      loan_no: '', // 出帐编号
      trialInfo: {}, // 试算信息
      simplenessHintFlag: false, // 简单提示开关
      simplenessHintData: '请输入出账编号和预计结清日期', // 简单提示的内容
      tally_date: '' // 预计结清日期
    };
  },
  filters: {
        // 日期转换
        date_filters(data) {
            function change(t) {
                if (t < 10) {
                    return "0" + t;
                } else {
                    return t;
                }
            };
            if (data) {
                var date = new Date(data * 1000); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000;
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                let D = change(date.getDate());
                return Y + M + D;
            } else {
                return "";
            }
        }
    },
  created() {
    console.log(this.tetailData, "detailCreated", this.date_style(this.tetailData.estimated_payoff_date));
    this.loan_no = this.tetailData.loan_no;
    this.tally_date = this.date_style(this.tetailData.estimated_payoff_date);
    // 开始试算接口
    this.prepaymentTrial()
    .then((data) => {
      this.trialInfo = data;
    })
    .catch((err) => {
      this.$error(err);
    });
  },
  methods: {
    // 毫秒转成日期格式
    date_style(data) {
      function change(t) {
          if (t < 10) {
              return "0" + t;
          } else {
              return t;
          }
      };
      var date = new Date(data * 1000); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000;
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let D = change(date.getDate());
      return Y + M + D;
    },
    // 开始试算按钮
    prepaymentTrialFun() {
      console.log(this.tally_date);
      if (!this.tally_date) {
        this.simplenessHintData = '请输入出账编号和预计结清日期!';
        this.simplenessHintFlag = true;
      } else {
        this.prepaymentTrial()
        .then((data) => {
          this.trialInfo = data;
          this.isTrial = true;
        })
        .catch((err) => {
          this.$error(err);
        });
      }
    },
    // 开始试算接口
    prepaymentTrial() {
      return new Promise((resolve, reject) => {
        this.$MyFetch.post(counterDealApi.prepaymentTrial, {
              loan_no: this.loan_no,
              estimated_payoff_date: this.tally_date
            })
            .then((data = {}) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err.message);
            });
      });
    },
    // 试算保存接口
    savePrepayment() {
      return new Promise((resolve, reject) => {
        this.$MyFetch.post(counterDealApi.savePrepayment, {
              loan_no: this.loan_no,
              isTrial: this.isTrial,
              estimated_payoff_date: this.tally_date
            })
            .then((data = {}) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            });
      });
    },
    close() {
      this.$emit("clsoe_windowDetail");
    },
    // 点击 查看贷款信息按钮
    look_info() {
      if (!this.loan_no) {
        this.simplenessHintData = '请输入出账编号和预计结清日期!';
        this.simplenessHintFlag = true;
      } else {
        let routeData = this.$router.resolve({ path: '/system/adjust-accounts/standing-book/debt-detail', query: { loan_no: this.loan_no } });
        window.open(routeData.href, '_blank');
      }
    },
    // 点击保存修改配置
    finish(formName) {
      if (!this.tally_date) {
        this.simplenessHintData = '请输入出账编号和预计结清日期!';
        this.simplenessHintFlag = true;
      } else {
        this.savePrepayment()
        .then((data) => {
          this.$emit("reload");
          this.$emit("clsoe_windowDetail");
        })
        .catch((err) => {
          this.$error(err.message);
          this.$emit("reload");
          this.$emit("clsoe_windowDetail");
        });
      }
    },
    // 关闭简单提示
    simplenessHintClose() {
      this.simplenessHintFlag = false;
    }
  },
  components: {
    simplenessHint // 简单提示
  }
};
</script>
