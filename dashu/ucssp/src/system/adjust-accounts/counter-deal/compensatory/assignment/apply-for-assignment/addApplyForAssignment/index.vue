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
                    <p>转让日期</p>
                    <el-form-item prop="dateTransfer">
                      <el-date-picker
                        class="select_245"
                        v-model="ruleForm.dateTransfer"
                        type="date"
                        value-format="yyyy-MM-dd"
                        format="yyyy-MM-dd"
                      ></el-date-picker>
                    </el-form-item>
                  </li>
                  <li>
                    <p>转让金额</p>
                    <el-form-item prop="transferAmount">
                      <el-input
                        v-model="ruleForm.transferAmount"
                        class="select_245"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </li>
                  <li>
                    <p>债权方名称</p>
                    <el-form-item prop="creditorName">
                      <el-input
                        v-model="ruleForm.creditorName"
                        class="select_245"
                        placeholder="请输入"
                      ></el-input>
                    </el-form-item>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <!-- 底部 -->
      <div class="text__center text__centerBottom">
        <el-button type="primary" @click="dataChecking">确认</el-button>
      </div>
    </div>
    <!-- 文字提示组件 -->
    <fontHint v-if="fontHintFlag" massage="请检查出账编号" @close="fontHintClose"></fontHint>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/common.less";
import reportValidator from "../../../../../js/reportRules";
import fontHint from "@/system/adjust-accounts/counter-deal/components/font-hint"; // 文字提示组件
import { checkingApi } from "../../../../../js/server"; // 接口
export default {
  data() {
    return {
      customerName: "", // 客户姓名
      certNo: "", // 身份证号码
      lineidName: "", // 合作机构
      fontHintFlag: false, // 出账编号提示默认不显示
      ruleForm: {
        chuZhangNumber: "", // 出账编号
        dateTransfer: "", // 转让日期
        transferAmount: "", // 转让金额
        creditorName: "" // 债权方名称
      },
      rules: {
        chuZhangNumber: [
          { required: true, message: "出账编号不能为空", trigger: "blur" }
        ],
        dateTransfer: [
          { required: true, message: "转让日期不能为空", trigger: "blur" }
        ],
        transferAmount: [
          { required: true, message: "转让金额不能为空", trigger: "blur" },
          { validator: reportValidator.surpassNumTwoBitAndNegative }
        ],
        creditorName: [
          { required: true, message: "债权方名称不能为空", trigger: "blur" }
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
    // 转让数据检验
    dataChecking() {
      if (this.ruleForm.transferAmount > 100000000000000) {
        this.confirmFn("转让金额整数部分最大位数为14位");
      } else {
        let url = checkingApi.transPaye;
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
      }
    },
    // 关闭文字提示组件
    fontHintClose() {
      this.fontHintFlag = false;
    },
    // 代偿减免新增保存
    save() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          let res = {
            customerName: this.customerName, // 客户姓名
            loanNo: this.ruleForm.chuZhangNumber, // 出账编号
            certNo: this.certNo, // 身份证号码
            lineidName: this.lineidName, // 合作机构
            transferDate: this.ruleForm.dateTransfer, // 转让日期
            transferAmount: this.ruleForm.transferAmount, // 转让金额
            operatorName: this.ruleForm.creditorName, // 债权方名称
            flowNo: "buybackTransferFlow" // 流程编号
          };
          let url = checkingApi.transPayb;
          this.$MyFetch
            .post(url, res)
            .then((data = {}) => {
              console.log(data, "代偿转让新增保存");
              this.$emit("close_add");
              this.compensatoryRelief();
            })
            .catch(err => {
              this.$error(err.message);
            });
        }
      });
    },
    // 输入出账编号带出字段
    queryAccounts() {
      if (this.ruleForm.chuZhangNumber !== "") {
        this.deductionNewQuery();
      }
    },
    // 代偿转让新增查询
    deductionNewQuery() {
      let res = {
        loanNo: this.ruleForm.chuZhangNumber
      };
      let url = checkingApi.transPaya;
      this.$MyFetch
        .get(url, res)
        .then((data = {}) => {
          console.log(data, "代偿转让新增查询");
          if (!data) {
            this.fontHintFlag = true;
            this.certNo = ""; // 身份号码
            this.customerName = ""; // 客户姓名
            this.lineidName = ""; // 合作机构
          } else {
            this.certNo = data.certNo; // 身份号码
            this.customerName = data.customerName; // 客户姓名
            this.lineidName = data.lineidName; // 合作机构
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
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
    width: 590px;
    background: #fff;
    .text__centerBottom {
      margin-top: -43px;
    }
    .el-form-item {
      margin-right: 0;
    }
    .dialog-box__body {
      overflow-y: auto;
      overflow-x: hidden;
      height: 350px;
    }
    // 个人信息
    .anti-fraud_dialog-box__middle {
      width: 590px;
      overflow: hidden;
      padding: 10px 0;
      //   background: #fff;
      border-radius: 4px;
      margin: 0px auto 20px auto;
      //   box-shadow: 0 2px 6px #ccc;
      .anti-fraud_dialog-box__middle_one {
        height: 40px;
        font-weight: 900;
        // line-height: 60px;
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
.center > .moude > ul > li:nth-child(3) {
  clear: both;
}
.center {
  text-align: left;
  overflow: hidden;
  margin: 13px -6px;
  .select_245 {
    width: 245px;
    // height: 40px;
  }
  .moude {
    clear: both;
    ul {
      margin-left: 30px;
      li {
        float: left;
        margin-right: 32px;
        padding: 3px 0;
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
