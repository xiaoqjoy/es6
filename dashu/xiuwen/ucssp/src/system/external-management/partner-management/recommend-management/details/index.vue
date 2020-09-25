<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 1200px;
    height: 750px;
    border-radius: 4px;
    background: #f9fafb;
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: bold;
    }
    .dialog-box__bottom {
      width: 1160px;
      height: 200px;
      margin: 0 auto;
      overflow: auto;
      margin-top: 20px;
      // 中间内容总体样式
      .tables {
        overflow-y: auto;
        overflow-x: hidden;
        height: 200px;
        width: 1158px;
        // margin: 0px auto;
        // border: 1px solid #e5e5e5;
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
          width: 1100px;
          height: 20px;
          // margin: 0px auto;
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
                color: #666;
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
        .topBox {
          height: 60px;
          border-bottom: 1px solid #f9fafb;
          span {
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #333333;
            line-height: 60px;
          }
          .border {
            border-left: 2px solid #538bf1;
            margin-right: 5px;
          }
        }
      }
    }
    .policy {
      height: 246px;
      .tables {
        height: 246px;
        .titte {
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #666;
          margin-top: 10px;
        }
        .row-bg {
          background: #f9fafb;
          border-radius: 4px;
          height: 40px;
          line-height: 40px;
          padding-left: 20px;
        }
      }
    }
    .credit {
      height: 120px;
      .tables {
        height: 120px;
      }
    }
    .boxbottom {
      height: 352px;
      .tables {
        position: relative;
        height: 352px;
        .progress {
          position: absolute;
          width: 300px;
          height: 100px;
          bottom: 80px;
          span {
            display: block;
            height: 14px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            margin-top: 5px;
          }
          .line {
            border-bottom: 2px solid #05838e;
            margin-top: 20px;
            height: 0px;
          }
          .complete {
            position: absolute;
            width: 18px;
            height: 18px;
            top: 50px;
          }
        }
        .box {
          width: 200px;
          height: 160px;
          border: 2px solid #05838e;
          border-right: 0px;
          position: absolute;
          top: 149px;
          left: 568px;
          border-radius: 10px;
          .complete {
            position: absolute;
            width: 18px;
            height: 18px;
            top: -10px;
            right: 0px;
          }
          .complete2 {
            position: absolute;
            width: 18px;
            height: 18px;
            bottom: -10px;
            right: 0px;
          }
        }
        .progress2 {
          left: 330px;
          width: 240px;
        }
        .progress3 {
          left: 552px;
          width: 240px;
        }
        .product {
          position: absolute;
          width: 300px;
          height: 100px;
          left: 700px;
          /* bottom: 158px; */
          top: 90px;
          span {
            display: block;
            height: 14px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            margin-top: 5px;
          }
        }
        .coverplate {
          position: absolute;
          width: 294px;
          height: 110px;
          top: 232px;
          left: 568px;
          z-index: 999;
          background-color: #fff;
        }
        .product2 {
          position: absolute;
          width: 300px;
          height: 100px;
          left: 700px;
          /* bottom: 158px; */
          top: 246px;
          span {
            display: block;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            margin-top: 5px;
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
      }
    }
    .contentbox {
      width: 1200px;
      height: 666px;
      overflow-y: scroll;
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
      <div class="contentbox">
        <!-- 表格 -->
        <div class="dialog-box__bottom">
          <div class="tables">
            <div class="topBox"><span class="border"></span><span>基本信息</span></div>
            <el-row
              type="flex"
              class="row-bg"
            >
              <el-col :span="8">
                <div class="grid-content"><span class="left">真实姓名：</span><span>{{compile_data.clientBaseInfoResp.clientName}}</span></div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content"><span class="left">是否有寿险保单：</span><span>{{(compile_data.insuranceInfoResp.length > 0) ? '是':'否'}}</span></div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content"><span class="left">身份证号码：</span><span>{{compile_data.pushOrder}}</span></div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content"><span class="left">客户手机：</span><span>{{compile_data.clientBaseInfoResp.mobileNo}}</span></div>
              </el-col>
            </el-row>
            <el-row
              type="flex"
              class="row-bg"
            >
              <el-col :span="16">
                <div class="grid-content"><span class="left">工作地址：</span><span>{{compile_data.clientBaseInfoResp.workAddress}}</span></div>
              </el-col>
              <el-col :span="16">
                <div class="grid-content"><span class="left">房产地址：</span><span>{{compile_data.clientBaseInfoResp.liveAddress}}</span></div>
              </el-col>
            </el-row>
            <el-row
              type="flex"
              class="row-bg"
            >
              <el-col :span="8">
                <div class="grid-content"><span class="left">期望贷款金额：</span><span>{{compile_data.clientBaseInfoResp.expectLoanAmt}}</span></div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content"><span class="left">期望贷款期数：</span><span>{{compile_data.clientBaseInfoResp.expectLoanPeriod}}</span></div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content"><span class="left"></span><span></span></div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content"><span class="left"></span><span></span></div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="dialog-box__bottom policy">
          <div class="tables">
            <div class="topBox"><span class="border"></span><span>寿险保单</span></div>
            <div
              v-for="(item, index) in compile_data.insuranceInfoResp"
              :key="index"
            >
              <div class="titte">寿险保单{{index+1}}</div>
              <el-row
                type="flex"
                class="row-bg"
              >
                <el-col :span="8">
                  <div class="grid-content"><span class="left">寿险公司：</span><span>{{item.insuranceCompanyName}}</span></div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content"><span class="left">年缴保费：</span><span>{{item.premiumAnnualAmt}}</span></div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content"><span class="left">最早保单生效日期：</span><span>{{item.effectiveDate}}</span></div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="dialog-box__bottom credit">
          <div class="tables">
            <div class="topBox"><span class="border"></span><span>信用卡分期车贷</span></div>
            <el-row
              type="flex"
              class="row-bg"
            >
              <el-col :span="8">
                <div class="grid-content"><span class="left">月供金额：</span><span>{{compile_data.monthlyAmt}}</span></div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="dialog-box__bottom policy">
          <div class="tables">
            <div class="topBox"><span class="border"></span><span>房产</span></div>
            <div
            v-if="compile_data.houseInfoResp.length > 0"
              v-for="(item, index) in compile_data.houseInfoResp"
              :key="index"
            >
              <div class="titte">房产{{index+1}}</div>
              <el-row
                type="flex"
                class="row-bg"
              >
                <el-col :span="16">
                  <div class="grid-content"><span class="left">房产地址：</span><span v-if="item.houseAddress !== null">{{item.houseAddress}}</span></div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content"><span class="left">房产性质：</span><span v-if="item.estatesTypeCode !== null">{{item.estatesTypeCode}}</span></div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content"><span class="left">房产价值：</span><span v-if="item.totalPriceAmt !== null">{{item.totalPriceAmt}}</span></div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="dialog-box__bottom boxbottom">
          <div class="tables">
            <div class="topBox"><span class="border"></span><span>进度明细</span></div>
            <div class="coverplate" v-if="!compile_data.productSecond.length > 0"></div>
            <div class="product" v-if="compile_data.productFirst.length !== 0">
              <span v-if="compile_data.productFirst.length > 0">产品一：{{compile_data.productFirst[0].orderStatus}}</span>
              <span v-if="compile_data.productFirst.length > 0">{{compile_data.productFirst[0].processDate}}</span>
            </div>
            <div class="product2" v-if="compile_data.productSecond.length > 0">
              <span v-if="compile_data.productSecond.length > 0">产品二：{{compile_data.productSecond[0].orderStatus}}</span>
              <span v-if="compile_data.productSecond.length > 0">{{compile_data.productSecond[0].processDate}}</span>
            </div>
            <div class="progress" v-if="compile_data.localProcess.length > 0">
              <span v-if="compile_data.localProcess.length > 0">{{compile_data.localProcess[0].orderStatus}}</span>
              <span v-if="compile_data.localProcess.length > 0">{{compile_data.localProcess[0].processDate}}</span>
              <img
                class="complete"
                src="../../../../../common/img/complete.png"
                alt=""
              >
              <span class="line"></span>
            </div>
            <div
              class="progress progress2"
              v-if="compile_data.localProcess.length > 1"
              >
              <span v-if="compile_data.localProcess.length > 1">{{compile_data.localProcess[1].orderStatus}}</span>
              <span v-if="compile_data.localProcess.length > 1">{{compile_data.localProcess[1].processDate}}</span>
              <img
                class="complete"
                src="../../../../../common/img/complete.png"
                alt=""
              >
              <span class="line"></span>
            </div>
            <div
              class="progress progress3"
              v-if="compile_data.localProcess.length > 2"
              >
              <span v-if="compile_data.localProcess.length > 2">{{compile_data.localProcess[2].orderStatus}}</span>
              <span v-if="compile_data.localProcess.length > 2">{{compile_data.localProcess[2].processDate}}</span>
              <img
                class="complete"
                src="../../../../../common/img/complete.png"
                alt=""
              >
              <!-- <span class="line"></span> -->
            </div>
            <div class="box" v-if="compile_data.productFirst.length > 0">
              <img
                class="complete"
                src="../../../../../common/img/complete.png"
                alt=""
              >
              <img
                v-if="compile_data.productFirst[0].orderStatus === '审批中'"
                class="complete"
                src="../../../../../common/img/ongoing.png"
                alt=""
              >
              <img
                class="complete2"
                src="../../../../../common/img/complete.png"
                alt=""
              >
              <div v-if="compile_data.productSecond.length > 0">
              <img
                v-if="compile_data.productSecond[0].orderStatus === '审批中'"
                class="complete2"
                src="../../../../../common/img/ongoing.png"
                alt=""
              >
              </div>
            </div>
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
    }
  },
  props: ["compile_data"]
};
</script>
