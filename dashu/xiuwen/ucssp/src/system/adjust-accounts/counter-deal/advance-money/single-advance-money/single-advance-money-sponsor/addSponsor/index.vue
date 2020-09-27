<style lang="less" rel="stylesheet/less" scoped>
/deep/.el-form-item {
  margin: 0px;
  width: 180px;
  .el-input__inner {
    box-sizing: border-box;
    // width: 180px;
    line-height: 38px;
    background: #ececec;
    border: 1px solid #d0d0d0;
    border-radius: 4px;
    padding-left: 10px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    // color: #bbbbbb;
    letter-spacing: 0;
  }
}
// 公共样式
.height_60 {
  height: 60px;
}
// 弹窗总box
.drop_loan {
  margin-top: 80px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .dialog-mask {
    z-index: 1000;
  }
  .dialog-box {
    width: 946px;
    // height: 700px;
    background: #ffffff;
    font-size: 0;
    transform: none;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    margin: auto;
    .dialog-box__top {
      margin: 0px;
    }
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      color: #000;
      padding-left: 20px;
      font-weight: normal;
      font-family: PingFangSC-Regular;
      letter-spacing: 1.38px;
    }
    /*按钮*/
    .form__bottom {
      text-align: center;
      left: 50%;
      padding-bottom: 30px;
      padding-top: 70px;
      background-color: rgba(255, 255, 255);
      .add {
        width: 200px;
      }
      .look_info {
        background: #eeb352;
      }
    }
    // 弹窗内容区域
    .dialog-box__content {
      padding: 0 30px;
      .button_d {
        width: 200px;
        height: 40px;
        background: #538bf1;
        border-radius: 4px;
        font-size: 14px;
        color: #ffffff;
        letter-spacing: 1.07px;
        margin-top: 36px;
        margin-left: 327px;
      }
      // 基本信息
      .content_top {
        width: 100%;
        height: 60px;
        border-bottom: 1px solid #d0d0d0;
        display: flex;
        align-items: center;
        position: relative;
        &::before {
          content: "";
          width: 2px;
          height: 16px;
          background: #538bf1;
        }
        span {
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #333333;
          font-weight: bold;
          margin-left: 7px;
        }
      }
      // 信息
      .dialog-box_info {
        height: 150px;
        // 引入按钮
        .add {
          width: 100px;
          height: 40px;
          border: none;
          background: #538bf1;
          border-radius: 4px;
          color: #fff;
          display: block;
          cursor: pointer;
          margin-top: 20px;
          margin-left: -3px;
        }
        #info_itemc {
          width: 226px;
        }
        .info_item {
          float: left;
          width: 220px;
          height: 40px;
          line-height: 62px;
          #item_dat {
            font-size: 14px;
            color: #e6a23c;
            line-height: 20px;
          }
          .item_title {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #666;
          }
          .item_data {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #151515;
            line-height: 20px;
            font-style: normal;
          }
        }
        // #select_item_l {
        //   margin-left: 120px;
        // }
        .select_item {
          // margin-left: 112px;
          float: left;
          margin-top: 20px;
          width: 245px;
          height: 65px;
          white-space: nowrap;
          // margin-right: 60px;
          margin-bottom: 20px;
          .select_title {
            .span_r {
              font-size: 12px;
              color: #ff0101;
              letter-spacing: 1.09px;
            }
            b {
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #ff0101;
              letter-spacing: 1.09px;
            }
            span {
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #bbbbbb;
              letter-spacing: 1.09px;
            }
          }
          .select_input {
            margin-top: 8px;
            .select_2455 {
              width: 240px;
              height: 40px;
              // margin-right: 15px;
              // /deep/.el-date-editor {
              //   width: 18%;
              // }
              // /deep/.el-range-separator {
              //   width: 18%;
              // }
            }
            .select_245 {
              width: 245px;
            }
          }
        }
      }
      // 表格
      .tableBox {
        width: 100%;
        height: auto;
        margin-top: 40px;
        .tables {
          // padding: 0 30px;
          border: 1px solid #e9e9e9;
          border-radius: 4px;
          // 表头
          .tableHeader {
            display: flex;
            background: #ececec;
            box-shadow: 0 1px 0 0 #d0d0d0;
            .tableHeaderTd {
              flex: 1;
              display: flex;
              height: 39px;
              align-items: center;
              padding-left: 80px;
              span {
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #666;
                letter-spacing: 0;
                text-align: center;
              }
            }
          }
          // 表体
          .tableBody {
            .tableBodyTr {
              display: flex;
              .tableBodyTd1,
              .tableBodyTd2,
              .tableBodyTd3,
              .tableBodyTd4 {
                flex: 1;
                display: flex;
                height: 73px;
                align-items: center;
                padding-left: 80px;
              }
              .tableBodyTd1 {
                border-right: 1px solid #d0d0d0;
              }
              .spanStyle1 {
                display: inline-block;
                font-family: PingFang-SC-Regular;
                font-size: 14px;
                color: #333333;
                letter-spacing: 0;
              }
              .spanStyle2 {
                display: inline-block;
                box-sizing: border-box;
                width: 180px;
                line-height: 38px;
                background: #ececec;
                border: 1px solid #d0d0d0;
                border-radius: 4px;
                padding-left: 10px;
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #bbbbbb;
                letter-spacing: 0;
              }
            }
          }
          // 表尾
          .tableFooter {
            border-top: 1px solid #d0d0d0;
            width: 100%;
            display: flex;
            .tableFooterTd1 {
              width: 221px;
              height: 59px;
              display: flex;
              align-items: center;
              padding-left: 20px;
              border-right: 1px solid #d0d0d0;
              span {
                font-family: PingFang-SC-Regular;
                font-size: 14px;
                color: #333333;
                letter-spacing: 0;
              }
            }
            .tableFooterTd2 {
              flex: 1;
              height: 60px;
              display: flex;
              align-items: center;
              padding-left: 20px;
              span {
                font-family: PingFang-SC-Regular;
                font-size: 14px;
                color: #333333;
                letter-spacing: 0;
              }
            }
          }
        }
      }
    }
    // 底部
    .dialog-box__footer {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-top: 30px;
      // 底部按钮
      .footerBtn {
        .t_button {
          width: 200px;
          height: 40px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          letter-spacing: 1.07px;
          text-align: center;
        }
        .print_t {
          border: 1px solid #538bf1;
          color: #538bf1;
        }
        .upload_t {
          background: #eeb352;
          color: #ffffff;
        }
        .count_t {
          background: #05838e;
          color: #ffffff;
        }
        .affirm_t {
          background: #538bf1;
          color: #ffffff;
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
      <!-- 弹窗内容区 -->
      <div class="dialog-box__content">
        <el-form :model="form" :rules="rules" ref="form">
          <!-- 信息 -->
          <div class="dialog-box_info">
            <!-- 引入按钮 -->
            <button class="add" type="button" @click="inductive">+ 引入</button>
            <div class="info_item">
              <span class="item_title">交易号:&nbsp;&nbsp;</span>
              <i class="item_data">
                <span v-html="transactionNumber"></span>
              </i>
            </div>
            <div id="info_itemc" class="info_item">
              <span class="item_title">出账编号:&nbsp;&nbsp;</span>
              <i class="item_data">
                <span v-html="form.chuZhangNumber"></span>
              </i>
            </div>
            <div class="info_item">
              <span class="item_title">期次:&nbsp;&nbsp;</span>
              <i id="item_dat" class="item_data">
                <span v-html="form.issueQ"></span>
              </i>
            </div>
            <div class="info_item">
              <span class="item_title">应还日期:&nbsp;&nbsp;</span>
              <i class="item_data">
                <span v-html="form.dateShould"></span>
              </i>
            </div>
            <!-- 记账渠道 -->
            <!-- <div class="select_item margin_r_60">
              <div class="select_title">
                <span>
                  <span class="span_r">*</span>记账渠道
                </span>
              </div>
              <div class="select_input" style="margin-top: 8px;">
                <el-form-item prop="jzqd">
                  <el-select class="select_2455" v-model="form.jzqd" placeholder="请选择">
                    <el-option
                      v-for="item in state_"
                      :key="item.itemNo"
                      :label="item.itemName"
                      :value="item.itemNo"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div> -->
            <!-- 记账日期 -->
            <div class="select_item margin_r_60">
              <div class="select_title">
                <span>
                  <span class="span_r">*</span>记账日期
                </span>
              </div>
              <div class="select_input" style="margin-top: 8px;">
                <el-form-item prop="jzrq">
                  <el-date-picker
                    class="select_2455"
                    v-model="form.jzrq"
                    type="date"
                    placeholder="记账日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </div>
          </div>
          <!-- 表格 -->
          <div class="tableBox">
            <div class="tables">
              <!-- 表头 -->
              <div class="tableHeader">
                <div class="tableHeaderTd"></div>
                <div class="tableHeaderTd">
                  <span>应还金额</span>
                </div>
                <!-- <div class="tableHeaderTd">
                  <span>实还金额</span>
                </div> -->
              </div>
              <!-- 表体 -->
              <div class="tableBody">
                <div class="tableBodyTr">
                  <div class="tableBodyTd1">
                    <span class="spanStyle1">垫付本金</span>
                  </div>
                  <div class="tableBodyTd2">
                    <span class="spanStyle1">
                      <span v-html="form.thePrincipal"></span>
                    </span>
                  </div>
                  <!-- <div class="tableBodyTd3">
                    <el-form-item prop="actual_payCorp">
                      <el-input v-model="dfbj"></el-input>
                    </el-form-item>
                  </div> -->
                </div>
                <div class="tableBodyTr">
                  <div class="tableBodyTd1">
                    <span class="spanStyle1">垫付利息</span>
                  </div>
                  <div class="tableBodyTd2">
                    <span class="spanStyle1">
                      <span v-html="form.interest"></span>
                    </span>
                  </div>
                  <!-- <div class="tableBodyTd3">
                    <el-form-item prop="actual_payInte">
                      <el-input v-model="dflx"></el-input>
                    </el-form-item>
                  </div> -->
                </div>
                <div class="tableBodyTr">
                  <div class="tableBodyTd1">
                    <span class="spanStyle1">应还代垫罚息</span>
                  </div>
                  <div class="tableBodyTd2">
                    <el-form-item prop="penalty">
                      <el-input v-model="form.penalty"></el-input>
                    </el-form-item>
                    <!-- <span class="spanStyle1"> -->
                      <!-- <span v-html="intoTheField.penalty"></span> -->
                    <!-- </span> -->
                  </div>
                  <!-- <div class="tableBodyTd3">
                    <el-form-item prop="actual_ddPayCorp">
                      <el-input v-model="fx"></el-input>
                    </el-form-item>
                  </div> -->
                </div>
                <div class="tableBodyTr">
                  <div class="tableBodyTd1">
                    <span class="spanStyle1">应还代垫复利</span>
                  </div>
                  <div class="tableBodyTd2">
                    <el-form-item prop="interestF">
                      <el-input v-model="form.interestF"></el-input>
                    </el-form-item>
                    <!-- <span class="spanStyle1">
                      <span v-html="intoTheField.interestF"></span>
                    </span> -->
                  </div>
                  <!-- <div class="tableBodyTd3">
                    <el-form-item prop="actual_ddPayInte">
                      <el-input v-model="fl"></el-input>
                    </el-form-item>
                  </div> -->
                </div>
                <div class="tableBodyTr" v-for="(item, index) in listMaps" :key="index">
                  <div class="tableBodyTd1">
                    <span class="spanStyle1">{{ item.fee_type_name }}</span>
                  </div>
                  <div class="tableBodyTd2">
                    <span class="spanStyle1">
                      <span>{{ item.pay_amount }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 底部 -->
        </el-form>
        <el-button class="button_d" @click="theNewInterface">确认</el-button>
      </div>
    </div>
    <introduce :intoTheField="form" v-if="show_y" @close_="close_y"/>
  </div>
</template>
<script type="text/ecmascript-6">
import { checkingApi } from "../../../../../js/server";
import reportValidator from "../../../../../js/reportRules";
import introduce from "./introduce/index"; // 引入页面
import "@common/css/dialog";
export default {
  data() {
    return {
      listMaps: [],
      form: {
        jzrq: "", // 记账日期
        // jzqd: "" // 记账渠道
        chuZhangNumber: "", // 出账编号
        issueQ: "", // 期次
        dateShould: "", // 应还日期
        thePrincipal: "", // 垫付本金应还金额
        interest: "", // 垫付利息应还金额
        penalty: "", // 罚息应还金额
        interestF: "" // 复利应还金额
      },
      rules: {
        jzrq: [
          { required: true, trigger: "blur", message: "记账日期为必填项" }
        ],
        penalty: [
          { validator: reportValidator.surpassNumTwoBitAndNegative, trigger: "blur" }
        ],
        interestF: [
          { validator: reportValidator.surpassNumTwoBitAndNegative, trigger: "blur" }
        ]
        // jzqd: [
        //   { required: true, trigger: "change", message: "记账渠道为必填项" }
        // ]
      },
      show_y: false, // 引入组件默认不显示
      transactionNumber: "" // 交易号
      // state_: [], // 记账渠道下拉框
      // intoTheField: {
      //   chuZhangNumber: "", // 出账编号
      //   issueQ: "", // 期次
      //   dateShould: "", // 应还日期
      //   thePrincipal: "", // 垫付本金应还金额
      //   interest: "", // 垫付利息应还金额
      //   penalty: "", // 罚息应还金额
      //   interestF: "" // 复利应还金额
      // }
      // dfbj: 0, // 垫付本金
      // dflx: 0, // 垫付利息
      // fx: 0, // 罚息
      // fl: 0 // 复利
    };
  },
  created() {
    this.transaction();
    // this.accountingChannel();
  },
  props: ["refer"],
  methods: {
    // 新增保存接口已经引入信息
    newSaveInterface() {
      let url = checkingApi.RepayPlanList;
      let listFee = this.listMaps.map((fee) => {
        return {
          feeType: fee.fee_type,
          payAmount: fee.pay_amount
        };
      });
      let data = {
        transSerialNo: this.transactionNumber, // 交易号
        loanNo: this.form.chuZhangNumber, // 出账编号
        sterm: this.form.issueQ, // 期次
        currency: "RMB", // 币种
        payCorp: this.form.thePrincipal, // 应还本金
        // actualCorp: this.dfbj, // 实还本金
        payInte: this.form.interest, // 应还利息
        // actualInte: this.dflx, // 实还利息
        ddPayFine: this.form.penalty, // 应还罚息
        // actualFine: this.fx, // 实还罚息
        ddPayCompound: this.form.interestF, // 应还复利
        // actualCompound: this.fl, // 实还复利
        accDate: this.form.jzrq, // 记账日期
        // transChannel: this.form.jzqd, // 交易渠道
        processName: "advancePayFlow", // 流程名称
        payDate: this.form.dateShould, // 应还日期
        listFee,
        billType: "11" // 还款类型
      };
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.$emit("close_a");
          this.confirmFn("新增成功");
          this.refer();
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 新增接口
    theNewInterface() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (
            this.form.chuZhangNumber === "" ||
            this.form.issueQ === "" ||
            this.form.dateShould === "" ||
            this.form.thePrincipal === "" ||
            this.form.interest === ""
          ) {
            this.confirmFn("请先引入部分信息");
          } else {
            // 新增保存数据检验
            let url = checkingApi.RepayPlanLih;
            let data = {
              loanNo: this.form.chuZhangNumber,
              sterm: this.form.issueQ,
              payDate: this.form.dateShould,
              accDate: this.form.jzrq, // 记账日期
              ddType: this.form.ddType // 代垫类型
            };
            this.$MyFetch
              .post(url, data)
              .then((data = {}) => {
                console.log(data);
                if (data.success) {
                  this.newSaveInterface();
                } else {
                  this.confirmFn(data.msg);
                }
              })
              .catch(err => {
                this.$error(err.message);
              });
          }
        }
      });
    },
    // 打开引入组件
    inductive() {
      this.show_y = true;
    },
    // 关闭引入组件
    close_y(data) {
      if (data) {
        this.listMaps = data.listMaps || [];
        this.form.ddType = data.dd_type;
      }
      this.show_y = false;
    },
    // 记账渠道接口
    // accountingChannel() {
    //   let url = checkingApi.CreateBusinessNumbers;
    //   this.$MyFetch
    //     .get(url)
    //     .then((data = {}) => {
    //       console.log(data);
    //       this.state_ = data;
    //     })
    //     .catch(err => {
    //       this.$error(err.message);
    //     });
    // },
    // 交易号接口
    transaction() {
      let url = checkingApi.PlanDetails;
      let data = {
        prefix: "LT"
      };
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.transactionNumber = data.businessCode;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 关闭弹窗
    close() {
      this.$emit("close_a");
    }
  },
  components: {
    introduce
  },
  mounted() {}
};
</script>
