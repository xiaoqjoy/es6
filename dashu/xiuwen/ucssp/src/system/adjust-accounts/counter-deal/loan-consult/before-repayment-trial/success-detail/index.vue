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
    .dialog-box__middle-form {
      // height: 495px;
      overflow-y: auto;
      .form__block {
        // height: 425px;
        padding: 20px 30px;
        box-shadow: 0 2px 6px 0 #d0d0d0;
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
      // .info_item {
      //   display: inline-block;
      //   white-space: nowrap;
      //   margin-right: 60px;
      //   margin-bottom: 20px;
      //   .info_left {
      //     font-style: normal;
      //     font-family: PingFangSC-Regular;
      //     font-size: 14px;
      //     color: #666;
      //   }
      //   .info_right {
      //     font-family: PingFangSC-Regular;
      //     font-size: 14px;
      //     color: #151515;
      //     line-height: 20px;
      //   }
      // }
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
        <h5 class="title_type">试算</h5>
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
                      {{tetailData.loanNo}}
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
                      {{ trialInfo.settleDate }}
                    </span>
                  </li>
                  <!-- 逾期 -->
                  <!-- <li class="info_li" style="width: 100%;">
                    <span class="li_title">
                      逾期
                    </span>
                  </li> -->
                  <li class="info_li">
                    <span class="li_title">
                      应还未结清本金:&nbsp;&nbsp;
                    </span>
                    <span class="li_content">
                      {{ overdueCorpTypeList.CORP.payAmount | zeroSetting }}
                    </span>
                  </li>
                  <li class="info_li">
                    <span class="li_title">
                      应还未结清利息:&nbsp;&nbsp;
                    </span>
                    <span class="li_content">
                      {{ overdueCorpTypeList.INTE.payAmount | zeroSetting  }}
                    </span>
                  </li>
                  <li class="info_li">
                    <span class="li_title">
                      应还未结清罚息:&nbsp;&nbsp;
                    </span>
                    <span class="li_content">
                      {{ (overdueCorpTypeList.FINE.payAmount || 0) + (overdueCorpTypeList.BANK_FINE.payAmount || 0) }}
                    </span>
                  </li>
                  <li class="info_li">
                    <span class="li_title">
                      应还未结清复利:&nbsp;&nbsp;
                    </span>
                    <span class="li_content">
                      {{ (overdueCorpTypeList.COMPOUND.payAmount || 0) + (overdueCorpTypeList.BANK_COMPOUND.payAmount || 0) }}
                    </span>
                  </li>
                  <li class="info_li" v-for="(overItem, overIndex) of trialInfo.overdueFeeTypeList" :key="'over'+overIndex">
                    <span class="li_title">
                      应还未结清{{ overItem.describe }}:&nbsp;&nbsp;
                    </span>
                    <span class="li_content">
                      {{ overItem.payAmount }}
                    </span>
                  </li>
                  <li class="info_li" style="width: 100%;">
                    <span class="li_title">
                      应还未结清小计金额:&nbsp;&nbsp;
                    </span>
                    <span class="li_content">
                      {{ Number(overdueTotalAmt) }}
                    </span>
                  </li>
                  <!-- 正常 -->
                  <!-- <li class="info_li" style="width: 100%;">
                    <span class="li_title">
                      正常
                    </span>
                  </li> -->
                  <li class="info_li">
                    <span class="li_title">
                      提前还款本金:&nbsp;&nbsp;
                    </span>
                    <span class="li_content">
                      {{ preCorpTypeList.CORP.payAmount | zeroSetting  }}
                    </span>
                  </li>
                  <li class="info_li">
                    <span class="li_title">
                      当期利息:&nbsp;&nbsp;
                    </span>
                    <span class="li_content">
                      {{ preCorpTypeList.INTE.payAmount | zeroSetting  }}
                    </span>
                  </li>
                  <li class="info_li" v-for="(preItem, preIndex) of trialInfo.preFeeTypeList" :key="'pre'+preIndex">
                    <span class="li_title">
                      {{ preItem.describe }}:&nbsp;&nbsp;
                    </span>
                    <span class="li_content">
                      {{ preItem.payAmount }}
                    </span>
                  </li>
                  <li class="info_li" style="width: 100%;">
                    <span class="li_title">
                      提前还款总计应还总额:&nbsp;&nbsp;
                    </span>
                    <span class="li_content">
                      {{ Number(settleTotalAmt) }}
                    </span>
                  </li>
                  <li class="info_li" style="width: 100%;">
                    <span class="li_title" style="color: red;">
                      提还试算结果受合作方限制，数值仅供参考，实际还款金额以还款当日计算为准！
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
                <div class="start_count_btn button" @click="trialStart">
                  开始试算
                </div>
              </div>
            </div>
            <!-- <div class="form__bottom">
              <el-button class="add look_info button " type="primary" @click="look_info()">查看贷款信息</el-button>
              <el-button class="add finish button " type="primary" @click="finish()">确认</el-button>
            </div> -->
        </div>
      </div>
    </div>
    <simplenessHint v-if="simplenessHintFlag" @close='simplenessHintClose' :massage="simplenessHintData"></simplenessHint>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import simplenessHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 简单提示
export default {
  props: ['tetailData'],
  data() {
    return {
      trialInfo: {}, // 试算信息
      overdueTotalAmt: 0, // 逾期的和
      settleTotalAmt: 0, // 正常的和
      overdueCorpTypeList: {
        CORP: {},
        INTE: {},
        FINE: {},
        COMPOUND: {},
        BANK_FINE: {},
        BANK_COMPOUND: {}
      },
      preCorpTypeList: {
        CORP: {},
        INTE: {}
      },
      alert_2: false, // 引入单笔还款 组件开关
      simplenessHintFlag: false, // 简单提示开关
      simplenessHintData: '请输入出账编号和预计结清日期', // 简单提示的内容
      tally_date: '' // 记账日期
    };
  },
  filters: {
    // 后台返回空，或者没这字段时，让金额为展示为0；
    zeroSetting(data) {
      if (!data) {
        return 0;
      }
      return data;
    }
  },
  methods: {
    // 开始试算接口
    prepaymentPreTrial(res) {
      this.$MyFetch.post(counterDealApi.prepaymentPreTrial, res)
        .then((data = {}) => {
          this.trialInfo = data;
          // 逾期
          this.overdueCorpTypeList.CORP = data.overdueCorpTypeList.CORP || {};
          this.overdueCorpTypeList.INTE = data.overdueCorpTypeList.INTE || {};
          this.overdueCorpTypeList.FINE = data.overdueCorpTypeList.FINE || {};
          this.overdueCorpTypeList.COMPOUND = data.overdueCorpTypeList.COMPOUND || {};
          this.overdueCorpTypeList.BANK_FINE = data.overdueCorpTypeList.BANK_FINE || {};
          this.overdueCorpTypeList.BANK_COMPOUND = data.overdueCorpTypeList.BANK_COMPOUND || {};
          // 正常
          this.preCorpTypeList.CORP = data.preCorpTypeList.CORP || {};
          this.preCorpTypeList.INTE = data.preCorpTypeList.INTE || {};
          this.overdueTotalAmt = data.overdueTotalAmt || 0; // 逾期的合
          this.settleTotalAmt = data.settleTotalAmt || 0; // 正常的合
        })
        .catch((err) => {
          this.$error(err.message);
        });
    },
    // 开始试算
    trialStart() {
      console.log(this.tetailData);
      // 出账编号和预计结清日期为空 提示，否则试算
      if (!(this.tally_date)) {
        this.simplenessHintData = '选择预计结清日期！';
        this.simplenessHintFlag = true;
      } else {
        // 开始试算接口
        let trialData = {
          loanNo: this.tetailData.loanNo,
          payoffDate: this.tally_date
        };
        this.prepaymentPreTrial(trialData);
      }
    },
    // 子传父 引入传来的交易号
    trialData(data) {
      this.loan_no = data;
    },
    close() {
      this.$emit("clsoe_windowDetail");
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
