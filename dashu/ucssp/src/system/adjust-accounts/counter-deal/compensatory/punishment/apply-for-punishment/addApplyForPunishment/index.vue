<template>
  <div class="import-message">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 头部 -->
      <div class="dialog-box__top">
        <h5 class="title bg__white">新增</h5>
        <span class="el-icon-close button button__close" @click="close_"></span>
      </div>
      <!-- 主体 -->
      <div class="dialog-box__body">
        <el-form
          :inline="true"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 基本信息 -->
          <div class="anti-fraud_dialog-box__middle">
            <p class="anti-fraud_dialog-box__middle_one">
              <span></span>基本信息
            </p>
            <ul class="anti-fraud_dialog-box__middle_two">
              <li>
                <p>
                  <span>客户姓名:</span>
                  <span>{{customerName}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>合作机构:</span>
                  <span>{{lineidName}}</span>
                </p>
              </li>
              <li>
                <p>
                  <span>身份证号码:</span>
                  <span>{{certNo}}</span>
                </p>
              </li>
            </ul>
            <div class="center">
              <div class="moude">
                <ul>
                  <li>
                    <p>出账编号</p>
                    <el-form-item prop="chuZhangNumber">
                      <el-input
                        @change="queryAccounts"
                        v-model="ruleForm.chuZhangNumber"
                        class="select_245"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <p>记账日期</p>
                    <el-form-item prop="accountingDate">
                      <el-date-picker
                        class="select_245"
                        v-model="ruleForm.accountingDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                      ></el-date-picker>
                    </el-form-item>
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
                  <span id="reducedTotal">{{reductionTotal}}</span>
                </p>
              </li>
            </ul>
            <div class="center">
              <div class="moude">
                <ul>
                  <li>
                    <p>减免本金</p>
                    <!-- <el-form-item prop="reductionPrincipal"> -->
                    <el-input
                      disabled
                      v-model="ruleForm.reductionPrincipal"
                      class="select_245"
                      placeholder="请输入"
                    ></el-input>
                    <!-- </el-form-item> -->
                  </li>
                  <li>
                    <p>减免利息</p>
                    <!-- <el-form-item prop="cutInterestRates"> -->
                    <el-input
                      disabled
                      v-model="ruleForm.cutInterestRates"
                      class="select_245"
                      placeholder="请输入"
                    ></el-input>
                    <!-- </el-form-item> -->
                  </li>
                  <li>
                    <p>减免罚息</p>
                    <!-- <el-form-item prop="breaksPenalty"> -->
                    <el-input
                      disabled
                      v-model="ruleForm.breaksPenalty"
                      class="select_245"
                      placeholder="请输入"
                    ></el-input>
                    <!-- </el-form-item> -->
                  </li>
                  <li>
                    <p>减免复利</p>
                    <!-- <el-form-item prop="reductionInterest"> -->
                    <el-input
                      disabled
                      v-model="ruleForm.reductionInterest"
                      class="select_245"
                      placeholder="请输入"
                    ></el-input>
                    <!-- </el-form-item> -->
                  </li>
                  <li>
                    <p>减免保险费</p>
                    <!-- <el-form-item prop="waiverPremium"> -->
                    <el-input
                      disabled
                      v-model="ruleForm.waiverPremium"
                      class="select_245"
                      placeholder="请输入"
                    ></el-input>
                    <!-- </el-form-item> -->
                  </li>
                  <li>
                    <p>减免咨询费（评审费）</p>
                    <!-- <el-form-item prop="consultingWaiver"> -->
                    <el-input
                      disabled
                      v-model="ruleForm.consultingWaiver"
                      class="select_245"
                      placeholder="请输入"
                    ></el-input>
                    <!-- </el-form-item> -->
                  </li>
                  <li>
                    <p>减免管理费（担保费）</p>
                    <!-- <el-form-item prop="managementExemption"> -->
                    <el-input
                      disabled
                      v-model="ruleForm.managementExemption"
                      class="select_245"
                      placeholder="请输入"
                    ></el-input>
                    <!-- </el-form-item> -->
                  </li>
                  <li>
                    <p>减免资金占用费</p>
                    <!-- <el-form-item prop="reductionOccupation"> -->
                    <el-input
                      disabled
                      v-model="ruleForm.reductionOccupation"
                      class="select_245"
                      placeholder="请输入"
                    ></el-input>
                    <!-- </el-form-item> -->
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <!-- 底部 -->
      <div class="text__center">
        <el-button type="primary" @click="dataChecking">保存</el-button>
      </div>
    </div>
    <!-- 文字提示组件 -->
    <fontHint v-if="fontHintFlag" massage="请检查出账编号" @close="fontHintClose"></fontHint>
  </div>
</template>
<script type="text/ecmascript-6">
import { checkingApi } from "../../../../../js/server"; // 接口
import fontHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 文字提示组件
import "@common/css/common.less";
export default {
  data() {
    return {
      fontHintFlag: false,
      customerName: "", // 客户姓名
      certNo: "", // 身份证号码
      lineidName: "", // 合作机构
      reductionTotal: "", // 减免合计
      ruleForm: {
        chuZhangNumber: "", // 出账编号
        accountingDate: "", // 记账日期
        reductionPrincipal: 0, // 减免本金
        cutInterestRates: 0, // 减免利息
        breaksPenalty: 0, // 减免罚息
        reductionInterest: 0, // 减免复利
        waiverPremium: 0, // 减免保险费
        consultingWaiver: 0, // 减免咨询费
        managementExemption: 0, // 减免管理费
        reductionOccupation: 0 // 减免资金占用费
      },
      rules: {
        chuZhangNumber: [
          { required: true, message: "出账编号不能为空", trigger: "blur" }
        ],
        accountingDate: [
          { required: true, message: "记账日期不能为空", trigger: "blur" }
        ]
      }
    };
  },
  props: ["compensatoryRelief"],
  // 组件
  components: {
    fontHint
  },
  methods: {
    // 减免数据检验
    dataChecking() {
      let url = checkingApi.transPayg;
      let data = {
        loanNo: this.ruleForm.chuZhangNumber
      };
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          if (data.success) {
            this.save();
          } else {
            this.confirmFn(data.msg);
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 输入出账编号带出字段
    queryAccounts() {
      if (this.ruleForm.chuZhangNumber !== "") {
        this.deductionNewQuery();
      }
    },
    // 代偿减免新增查询
    deductionNewQuery() {
      let res = {
        loanNo: this.ruleForm.chuZhangNumber
      };
      let url = checkingApi.transPayInfoc;
      this.$MyFetch
        .get(url, res)
        .then((data = {}) => {
          console.log(data, "代偿减免新增查询");
          if (!data) {
            this.fontHintFlag = true;
            this.certNo = ""; // 身份号码
            this.customerName = ""; // 客户姓名
            this.lineidName = ""; // 合作机构
          } else {
            this.certNo = data.certNo; // 身份号码
            this.customerName = data.customerName; // 客户姓名
            this.lineidName = data.lineidName; // 合作机构
            this.reductionTotal = data.sumMoney; // 减免合计
            this.ruleForm.reductionPrincipal = data.buyCorp; // 减免本金
            this.ruleForm.cutInterestRates = data.buyInte; // 减免利息
            this.ruleForm.breaksPenalty = data.buyFine; // 减免罚息
            this.ruleForm.reductionInterest = data.buyCompound; // 减免复利
            this.ruleForm.waiverPremium = data.buyInsurance; // 减免保险费
            this.ruleForm.consultingWaiver = data.buyDsfConsult; // 减免咨询费
            this.ruleForm.managementExemption = data.buyDsfGuarantee; // 减免管理费
            this.ruleForm.reductionOccupation = data.payMoney; // 减免资金占用费
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 代偿减免新增保存
    save() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          if (this.customerName === "") {
            this.fontHintFlag = true;
          } else {
            let res = {
              customerName: this.customerName, // 客户姓名
              loanNo: this.ruleForm.chuZhangNumber, // 出账编号
              certNo: this.certNo, // 身份证号码
              lineidName: this.lineidName, // 合作机构
              accDate: this.ruleForm.accountingDate, // 记账日期
              sumMoney: this.reductionTotal, // 减免合计
              buyCorp: this.ruleForm.reductionPrincipal, // 减免本金
              buyInte: this.ruleForm.cutInterestRates, // 减免利息
              buyFine: this.ruleForm.breaksPenalty, // 减免罚息
              buyCompound: this.ruleForm.reductionInterest, // 减免复利
              buyInsurance: this.ruleForm.waiverPremium, // 减免保险费
              buyDsfConsult: this.ruleForm.consultingWaiver, // 减免咨询费
              buyDsfGuarantee: this.ruleForm.managementExemption, // 减免管理费
              payMoney: this.ruleForm.reductionOccupation, // 减免资金占用费
              flowNo: "freePayBuyBackFlow" // 流程编号
            };
            let url = checkingApi.transPayInfod;
            this.$MyFetch
              .post(url, res)
              .then((data = {}) => {
                console.log(data, "代偿减免新增保存");
                this.$emit("close_add");
                this.compensatoryRelief();
              })
              .catch(err => {
                this.$error(err.message);
              });
          }
        }
      });
    },
    // 关闭文字提示组件
    fontHintClose() {
      this.fontHintFlag = false;
    },
    // 关闭窗口
    close_() {
      this.$emit("close_add");
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
      height: 630px;
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
