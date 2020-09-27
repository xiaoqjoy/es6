<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 945px;
    height: 340px;
    border-radius: 4px;
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: bold;
    }
    .dialog-box__bottom {
      width: 910px;
      height: 220px;
      margin: 0 auto;
      overflow :auto;
      // 中间内容总体样式
      .tables {
        overflow-y: auto;
        overflow-x: hidden;
        height: 200px;
        width: 905px;
        margin: 0px auto;
        border: 1px solid #e5e5e5;
        margin-top: 20px;
        border-radius: 4px;
        background-color: #fff;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
        // 中间内容头部样式
        .tables-head {
          width: 845px;
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
          width: 845px;
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
                color: #666;
              }
            }
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
      <div class="dialog-box__top">
        <h5 class="title_type">还款情况</h5>
        <span class="el-icon-close button button__close" @click="close_"></span>
      </div>
      <!-- 表格 -->
      <div class="dialog-box__bottom">
        <div class="tables" v-for="(item, index) in refundlist" :key="index">
            <div class="tables-head">
              <span>产品{{item.sortNum}}:</span>
              <span>{{item.productName}}</span>
            </div>
            <el-row type="flex" class="row-bg">
              <el-col :span="5"><div class="grid-content"><span class="left">还款状态：</span><span v-if="item.repayStatus !== 'null'">{{item.repayStatus}}</span></div></el-col>
              <el-col :span="5"><div class="grid-content"><span class="left">贷款金额：</span><span v-if="item.loanAmt !== 'null'">{{item.loanAmt}}</span></div></el-col>
              <el-col :span="5"><div class="grid-content"><span class="left">贷款期限：</span><span v-if="item.loanTerm !== 'null'">{{item.loanTerm}}</span></div></el-col>
              <el-col :span="5"><div class="grid-content"><span class="left">发放日期：</span><span v-if="item.payDate !== 'null'">{{item.payDate}}</span></div></el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="6"><div class="grid-content"><span class="left">正常本金余款：</span><span v-if="item.normalRepayPrincipal !== 'null'">{{item.normalRepayPrincipal}}</span></div></el-col>
              <el-col :span="6"><div class="grid-content"><span class="left">欠款本金：</span><span v-if="item.overduePrincipal !== 'null'">{{item.overduePrincipal}}</span></div></el-col>
              <el-col :span="6"><div class="grid-content"><span class="left">下次还款日期：</span><span v-if="item.nextRepayDate !== 'null'">{{item.nextRepayDate}}</span></div></el-col>
              <el-col :span="6"><div class="grid-content"><span class="left">本息逾期天数：</span><span v-if="item.bxOverdueDays !== 'null'">{{item.bxOverdueDays}}</span></div></el-col>
            </el-row>
            <el-row type="flex" class="row-bg">
              <el-col :span="7"><div class="grid-content"><span class="left">首次本息逾期日期：</span><span v-if="item.firstBxOverdueDate !== 'null'">{{item.firstBxOverdueDate}}</span></div></el-col>
              <el-col :span="7"><div class="grid-content"><span class="left">当期逾期天数：</span><span v-if="item.currentOverdueDays !== 'null'">{{item.currentOverdueDays}}</span></div></el-col>
              <el-col :span="7"><div class="grid-content"><span class="left">首次逾期日期：</span><span v-if="item.firstOverdueDate !== 'null'">{{item.firstOverdueDate}}</span></div></el-col>
            </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
export default {
  data() {
    return {};
  },
  methods: {
    // 关闭流转记录
    close_() {
      this.$emit("close_transfer");
    }
  },
  props: ["refundlist"],
  components: {}
};
</script>
