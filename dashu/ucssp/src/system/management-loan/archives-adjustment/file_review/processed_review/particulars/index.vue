<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 800px;
    height: 380px;
    border-radius: 4px;
    background: #fff;
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: bold;
      box-shadow: 0 2px 6px 0 #d0d0d0;
    }
    .dialog-box__bottom {
      width: 800px;
      height: 250px;
      margin: 0 auto;
      overflow: auto;
      // 中间内容总体样式
      .tables {
        overflow-y: auto;
        overflow-x: hidden;
        height: 250px;
        width: 800px;
        margin: 0px auto;
        // border: 1px solid #d0d0d0;
        padding-left: 30px;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
        // 中间内容头部样式
        .tables-head {
          width: 800px;
          height: 60px;
          margin: 0px auto;
          border-bottom: 1px solid #e9e9e9;
          line-height: 60px;
          font-family: PingFang-SC-Regular;
          span {
            font-size: 14px;
            line-height: 20px;
            color: #333333;
          }
        }
        .row-bg {
          width: 800px;
          height: 20px;
          margin: 0px auto;
          margin-top: 20px;
          .el-col {
            .grid-content {
              span {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #151515;
                line-height: 20px;
              }
              .left {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #9b9b9b;
                letter-spacing: 0;
              }
            }
          }
        }
        .el-input {
          width: 120px;
          height: 30px;
          /deep/.el-input__inner {
            height: 30px;
            line-height: 30px;
          }
        }
        .box {
          width: 800px;
          height: 20px;
          margin: 0px auto;
          .content {
            float: left;
            width: 33.33%;
            margin-top: 20px;
            font-size: 14px;
            .left {
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #9b9b9b;
              letter-spacing: 0;
            }
          }
        }
      }
    }
    .dialog-box__top {
      margin-bottom: 0px;
    }
    .form__bottom {
      position: absolute;
      left: 50%;
      margin-left: -100px;
      // bottom: 30px;
      padding-bottom: 30px;
      background-color: rgba(255, 255, 255);
      .add {
        width: 200px;
        margin-top: 30px;
      }
    }
  }
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title_type">详情</h5>
        <span
          class="el-icon-close button button__close"
          @click="close_"
        ></span>
      </div>
      <!-- 表格 -->
      <div class="dialog-box__bottom">
        <div class="tables">
          <el-row
            type="flex"
            class="row-bg"
          >
            <el-col :span="8">
              <div class="grid-content"><span class="left">一级产品：</span><span>{{compile_data.primaryProductName}}</span></div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content"><span class="left">授权原因：</span><span>{{compile_data.authReasonCode}}</span></div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content"><span class="left">放款金额：</span><span></span>{{compile_data.allotAmt}}</div>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            class="row-bg"
          >
            <el-col :span="8">
              <div class="grid-content"><span class="left">贷款利率（年利率）：</span><span>{{compile_data.partnerAnnualRate}}%</span></div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content"><span class="left">贷款期限（月）：</span><span>{{compile_data.loanTerm}}</span></div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content"><span class="left">到期日：</span><span>{{compile_data.loanEndDt}}</span></div>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            class="row-bg"
          >
            <el-col :span="8">
              <div class="grid-content"><span class="left">付款账号：</span><span>{{compile_data.accountNum}}</span></div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content"><span class="left">贷款用途：</span><span>{{compile_data.loanPurposeCode}}</span></div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content"><span class="left">其他用途说明：</span><span>{{compile_data.loanOtherPurpose}}</span></div>
            </el-col>
          </el-row>
          <el-row
            type="flex"
            class="row-bg"
          >
            <el-col :span="8">
              <div class="grid-content"><span class="left">客户类型：</span><span>{{compile_data.careerType}}</span></div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content"><span class="left">保险金额：</span><span>{{compile_data.insuranceAmount}}</span></div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content"><span class="left">保险费：</span><span>{{compile_data.insurance}}</span></div>
            </el-col>
          </el-row>
          <div class="box">
            <div
              class="content grid-content"
              v-if="compile_data.feeListDtos.length > 0 && item.itemDesc !== null"
              v-for="(item, index) in compile_data.feeListDtos"
              :key="index"
            >
              <span v-if="item.itemDesc !== null" class="left">{{item.itemDesc}}：</span>
              <span v-if="item.itemDesc !== null">{{item.payAmount || ""}}</span>
            </div>
            <div
              class="content grid-content"
              v-if="compile_data.feeLists.length > 0 && item.itemDesc !== null"
              v-for="(item, index) in compile_data.feeLists"
              :key="index"
            >
              <span v-if="item.itemDesc !== null" class="left">{{item.itemDesc}}：</span>
              <span v-if="item.itemDesc !== null">{{item.feesrate || ""}}</span>
            </div>
            <div class="content grid-content"><span class="left">档案制作人：</span><span>{{compile_data.arcProducer || ""}}</span></div>
            <div class="content grid-content"><span class="left">档案复核人：</span><span>{{compile_data.arcReviewer || ""}}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
// import { loanApi } from "../../../../js/server.js"; // 接口
export default {
  data() {
    return {};
  },
  methods: {
    // 关闭详情
    close_() {
      this.$emit("clsoe_windowAlert");
      console.log(111);
    }
  },
  props: ["compile_data", "refer"]
};
</script>
