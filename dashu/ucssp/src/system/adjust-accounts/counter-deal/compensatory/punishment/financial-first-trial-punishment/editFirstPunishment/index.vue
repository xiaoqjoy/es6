<template>
  <div class="import-message">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 头部 -->
      <div class="dialog-box__top">
        <h5 class="title bg__white">编辑</h5>
        <span class="el-icon-close button button__close" @click="close_"></span>
      </div>
      <!-- 主体 -->
      <div class="dialog-box__body">
        <!-- 基本信息 -->
        <div class="anti-fraud_dialog-box__middle">
          <p class="anti-fraud_dialog-box__middle_one">
            <span></span>基本信息
          </p>
          <ul class="anti-fraud_dialog-box__middle_two">
            <li>
              <p>
                <span>客户姓名:</span>
                <span>{{editDetails.customerName}}</span>
              </p>
            </li>
            <li>
              <p>
                <span>合作机构:</span>
                <span>{{editDetails.lineidName}}</span>
              </p>
            </li>
            <li>
              <p>
                <span>身份证号码:</span>
                <span>{{editDetails.certNo}}</span>
              </p>
            </li>
            <li>
              <p>
                <span>出账编号:</span>
                <span>{{editDetails.loanNo}}</span>
              </p>
            </li>
          </ul>
          <div class="center">
            <div class="moude">
              <ul>
                <li>
                  <p>记账日期</p>
                  <el-date-picker
                    class="select_245"
                    v-model="editDetails.accDate"
                    type="date"
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                  ></el-date-picker>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 减免金额信息 -->
        <div class="anti-fraud_dialog-box__middle">
          <p class="anti-fraud_dialog-box__middle_one">
            <span></span>减免金额信息
          </p>
          <ul class="anti-fraud_dialog-box__middle_two">
            <li>
              <p>
                <span>减免合计:</span>
                <span id="reducedTotal">{{editDetails.sumMoney}}</span>
              </p>
            </li>
          </ul>
          <ul class="anti-fraud_dialog-box__middle_two">
            <li>
              <p>
                <span>减免本金:</span>
                <span id="reducedTotal">{{editDetails.buyCorp}}</span>
              </p>
            </li>
            <li>
              <p>
                <span>减免利息:</span>
                <span id="reducedTotal">{{editDetails.buyInte}}</span>
              </p>
            </li>
            <li>
              <p>
                <span>减免罚息:</span>
                <span id="reducedTotal">{{editDetails.buyFine}}</span>
              </p>
            </li>
            <li>
              <p>
                <span>减免复利:</span>
                <span id="reducedTotal">{{editDetails.buyCompound}}</span>
              </p>
            </li>
            <li>
              <p>
                <span>减免保险费:</span>
                <span id="reducedTotal">{{editDetails.buyInsurance}}</span>
              </p>
            </li>
            <li>
              <p>
                <span>减免咨询费（评审费）:</span>
                <span id="reducedTotal">{{editDetails.buyDsfConsult}}</span>
              </p>
            </li>
            <li>
              <p>
                <span>减免管理费（担保费）:</span>
                <span id="reducedTotal">{{editDetails.buyDsfGuarantee}}</span>
              </p>
            </li>
            <li>
              <p>
                <span>减免资金占用费:</span>
                <span id="reducedTotal">{{editDetails.payMoney}}</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 底部 -->
      <div class="text__center">
        <el-button type="primary" @click="affirm">确认</el-button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/common.less";
import { checkingApi } from "../../../../../js/server"; // 接口
export default {
  data() {
    return {
      chuZhangNumber: "", // 出账编号
      accountingDate: "", // 记账日期
      reductionPrincipal: "", // 减免本金
      cutInterestRates: "", // 减免利息
      breaksPenalty: "", // 减免罚息
      reductionInterest: "", // 减免复利
      waiverPremium: "", // 减免保险费
      consultingWaiver: "", // 减免咨询费
      managementExemption: "", // 减免管理费
      reductionOccupation: "" // 减免资金占用费
    };
  },
  props: ["editDetails", "compensatoryRelief"],
  // 组件
  components: {},
  methods: {
    // 编辑保存接口
    affirm() {
      if (this.editDetails.accDate === null) {
        this.confirmFn("记账日期不能为空");
      } else {
        let url = checkingApi.transPayInfog;
        let data = {
          loanTransInfoId: this.editDetails.loanTransInfoId, // 交易ID
          loanNo: this.editDetails.loanNo, // 出账编号
          buyCorp: this.editDetails.buyCorp, // 减免本金
          buyInte: this.editDetails.buyInte, // 减免利息
          buyFine: this.editDetails.buyFine, // 减免罚息
          buyCompound: this.editDetails.buyCompound, // 减免复利
          buyInsurance: this.editDetails.buyInsurance, // 减免保险费
          buyDsfConsult: this.editDetails.buyDsfConsult, // 减免咨询费
          buyDsfGuarantee: this.editDetails.buyDsfGuarantee, // 减免担保费
          payMoney: this.editDetails.payMoney, // 减免资金占用费
          sumMoney: this.editDetails.sumMoney, // 减免合计
          customerName: this.editDetails.customerName, // 客户姓名
          lineidName: this.editDetails.lineidName, // 合作机构
          certNo: this.editDetails.certNo, // 身份证号码
          accDate: this.editDetails.accDate, // 记账日期
          relateId: this.editDetails.relateId // 业务交易号
        };
        this.$MyFetch
          .post(url, data)
          .then((data = {}) => {
            console.log(data);
            this.$emit("close_edit");
            this.compensatoryRelief();
          })
          .catch(err => {
            this.$error(err.message);
          });
      }
    },
    close_() {
      this.compensatoryRelief();
      this.$emit("close_edit");
    }
  },
  mounted() {},
  created() {}
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.import-message {
  .dialog-box {
    width: 1200px;
    .el-form-item {
      margin-right: 0;
    }
    .dialog-box__body {
      overflow-y: auto;
      overflow-x: hidden;
      height: 530px;
    }
    // 个人信息
    .anti-fraud_dialog-box__middle {
      width: 1150px;
      overflow: hidden;
      padding: 10px 0;
      background: #fff;
      border-radius: 4px;
      margin: 0px auto 20px auto;
      box-shadow: 0 2px 6px #ccc;
      .anti-fraud_dialog-box__middle_one {
        height: 60px;
        font-weight: 900;
        line-height: 60px;
        text-align: left;
        margin: 0 20px;
        border-bottom: solid 1px #d0d0d0;
        > span {
          border-left: solid 2px #538bf1;
          width: 2px;
          margin-right: 6px;
        }
      }
      .anti-fraud_dialog-box__middle_two {
        overflow: hidden;
        padding: 0 -2px;
        #reducedTotal {
          color: rgb(238, 177, 10);
        }
      }
      .anti-fraud_dialog-box__middle_two > li {
        float: left;
        width: 248px;
        height: 50px;
        margin-left: 27px;
        line-height: 50px;
        text-align: left;
      }
      .anti-fraud_dialog-box__middle_two > li > p {
        font-size: 14px;
        color: #151515;
      }
      .anti-fraud_dialog-box__middle_two > li > p > span {
        color: #666;
        margin-right: 10px;
      }
      .anti-fraud_dialog-box__middle_two > li > p > span:nth-child(2) {
        color: #000;
        margin-right: 10px;
      }
    }
  }
}
// 其他信息
.center {
  text-align: left;
  overflow: hidden;
  margin: 0 -6px;
  .select_245 {
    width: 245px;
  }
  .moude {
    clear: both;
    ul {
      margin-left: 30px;
      li {
        float: left;
        margin-right: 32px;
        padding: 20px 0;
      }
    }
    p {
      color: #bbbbbb;
      font-size: 12px;
      padding-bottom: 10px;
      span {
        color: #f00;
        display: inline-block;
        margin-right: 15px;
      }
    }
  }
}
// 备注
.input > input {
  width: 520px;
  height: 40px;
  border: solid 1px #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  padding-left: 15px;
  margin-left: 15px;
}
.Remarks {
  overflow: hidden;
  margin: 20px 0;
}
.Remarks > input {
  width: 851px;
}
// 保存按钮
.el-button--primary {
  text-align: center;
  width: 200px;
  height: 40px;
  margin: 10px 0px;
  background: #538bf1;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #fff;
}
</style>
