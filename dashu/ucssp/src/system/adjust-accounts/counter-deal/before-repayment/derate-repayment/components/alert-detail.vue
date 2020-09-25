<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 弹窗上部分 -->
      <div class="dialog-box__top">
        <h5 class="title_type">{{detailData.type|getTitle}}</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <!-- 弹窗内容区 -->
      <div class="dialog-box__content">
        <!-- 标题 -->
        <div class="header" v-if="detailData.type=='add'">
          <el-button class="btn" @click="leadin">+引入</el-button>
        </div>
        <!-- 信息 -->
        <div class="dialog-box_info">
          <div class="info_item">
            <span class="item_title">出账编号:&nbsp;&nbsp;</span>
            <i class="item_data">{{ dataList.loanNo }}</i>
          </div>
          <div class="info_item">
            <span class="item_title">客户姓名:&nbsp;&nbsp;</span>
            <i class="item_data">{{ dataList.customerName }}</i>
          </div>
          <div class="info_item">
            <span class="item_title">身份证号:&nbsp;&nbsp;</span>
            <i class="item_data">{{ dataList.certNo }}</i>
          </div>
          <div class="info_item">
            <span class="item_title">放款机构:&nbsp;&nbsp;</span>
            <i class="item_data">{{ dataList.lineName }}</i>
          </div>
          <div class="info_item">
            <span class="item_title">合作模式:&nbsp;&nbsp;</span>
            <i class="item_data">{{ dataList.collaborateName }}</i>
          </div>
          <div class="info_item">
            <span class="item_title">提前结清日期:&nbsp;&nbsp;</span>
            <i class="item_data">{{ dataList.finishDate|date_filters }}</i>
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
              <div class="tableHeaderTd">
                <span>实还金额</span>
              </div>
              <div class="tableHeaderTd">
                <span>减免金额</span>
              </div>
            </div>
            <!-- 表体 -->
            <div class="tableBody">
              <el-form
                :model="dataList"
                :disabled="(detailData.type=='add'||detailData.type=='edit')?false:true"
                ref="dataList"
              >
                <div class="tableBodyTr" v-for="(item, index) in dataList.amtList" :key="index">
                  <div class="tableBodyTd1">
                    <span class="spanStyle1">{{getTypeText(item.amtType)}}</span>
                  </div>
                  <div class="tableBodyTd2">
                    <el-form-item>
                      <el-input v-model="item.payAmount" :disabled="true"></el-input>
                    </el-form-item>
                  </div>
                  <div class="tableBodyTd3">
                    <el-form-item>
                      <el-input v-model="item.actualAmount" :disabled="true"></el-input>
                    </el-form-item>
                  </div>
                  <div class="tableBodyTd4">
                    <el-form-item :prop="'amtList.' + index + '.breakAmount'" :rules="rules">
                      <el-input v-model="item.breakAmount"></el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>
        <div
          class="dialog-box__footer"
          v-if="detailData.type=='add'||detailData.type=='edit'||detailData.type=='recheck'"
        >
          <div class="footerBtn">
            <el-button
              class="t_button affirm_t button"
              @click="save"
            >{{detailData.type=='recheck'?"保存":"确认提交"}}</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 引入弹窗 -->
    <alertLeadList v-if="alert_leadlist" @leadclose="lead_close" @leadcomfirn="lead_confirm"></alertLeadList>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import alertLeadList from "./alert-lead-list";
import { prepaymentBreak } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import reportRules from "@/system/adjust-accounts/counter-deal/js/reportRules"; // 正则
export default {
  props: {
    detailData: {
      type: Object,
      default: () => null
    }
  },
  components: {
    alertLeadList
  },
  data() {
    let limitLength = (rule, value, callback) => {
      if (value && value >= 10000000000) {
        callback(new Error("录入数字应小于等于10位"));
      } else {
        callback();
      }
    };
    return {
      alert_leadlist: false,
      dataList: {
        amtList: []
      },
      rules: [
        { required: true, trigger: "blur", message: "请填写" },
        { trigger: "blur", validator: reportRules.nonNegative3 },
        {
          trigger: "blur",
          validator: reportRules.surpassNumTwoBitAndNegative
        },
        { trigger: "blur", validator: limitLength }
      ]
    };
  },
  computed: {},
  filters: {
    date_filters(data) {
      function change(t) {
        if (t < 10) {
          return "0" + t;
        } else {
          return t;
        }
      }
      if (data) {
        let Y = data[0] + "-";
        let M = change(data[1]) + "-";
        let D = change(data[2]);
        return Y + M + D;
      } else {
        return "";
      }
    },
    getTitle(val) {
      if (val) {
        let text = "";
        switch (val) {
          case "add":
            text = "新增";
            break;
          case "edit":
            text = "明细";
            break;
          case "recheck":
            text = "复核";
            break;
          case "done":
            text = "已完成";
            break;
        }
        return text;
      } else {
        return "";
      }
    }
  },
  watch: {
    detailData: {
      handler(newVal, oldVal) {
        console.log("newVal", newVal);
        this.detailData = newVal;
        if (newVal && newVal.type !== "add") {
          this.reviewDetail();
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getTypeText(val) {
      if (!val) {
        return "";
      } else {
        let text = "";
        switch (val) {
          case "BANK_CORP":
            text = "银行本金";
            break;
          case "BANK_INTE":
            text = "银行利息";
            break;
          case "DDCORP":
            text = "大数本金";
            break;
          case "DDINTE":
            text = "大数利息";
            break;
          case "DSFFINE":
            text = "大数罚息";
            break;
          case "DSFCOMP":
            text = "大数复利";
            break;
          case "004":
            text = "担保费";
            break;
          case "1010":
            text = "提前还款违约金";
            break;
        }
        return text;
      }
    },
    leadin() {
      this.alert_leadlist = true;
    },
    lead_close() {
      this.alert_leadlist = false;
    },
    lead_confirm(data) {
      console.log("lead_confirm", data);
      this.alert_leadlist = false;
      this.dataList = data;
    },
    save() {
      if (this.detailData.type === "recheck") {
        this.close();
      } else {
        this.$refs.dataList.validate(valid => {
          if (valid) {
            let url = "";
            let params = {};
            if (this.detailData.type === "add") {
              if (!this.dataList.amtList.length) {
                this.$error("请先引入数据");
                return "";
              }
              params = {
                loanNo: this.dataList.loanNo,
                flowNo: "RepaymentBreakFlow",
                amtList: this.dataList.amtList
              };
              url = prepaymentBreak.saveInitFlow;
            } else if (this.detailData.type === "edit") {
              params = {
                loanNo: this.dataList.loanNo,
                transSerialNo: this.detailData.transSerialNo,
                flowNo: "RepaymentBreakFlow",
                amtList: this.dataList.amtList
              };
              url = prepaymentBreak.updateBreakInfo;
            }
            let ischeck = true;
            for (let item of this.dataList.amtList) {
              if (
                item.payAmount < item.breakAmount &&
                item.amtType !== "DDINTE" &&
                item.amtType !== "DSFCOMP" &&
                item.amtType !== "DSFFINE" &&
                item.amtType !== "DDCORP"
              ) {
                ischeck = false;
                this.$error(
                  `${this.getTypeText(item.amtType)}减免金额不能大于应还金额`
                );
                break;
              }
            }
            if (ischeck) {
              this.$MyFetch
                .post(url, params)
                .then((data = {}) => {
                  if (data.success) {
                    this.$emit("save", params.loanNo);
                  } else {
                    this.$error(data.msg);
                  }
                })
                .catch(err => {
                  this.$error(err.message);
                });
            }
          }
        });
      }
    },
    reviewDetail() {
      this.$MyFetch
        .post(prepaymentBreak.queryBreakDetail, this.detailData)
        .then((data = {}) => {
          this.dataList = data;
        })
        .catch(err => {
          console.log(err);
          this.$error(err.message);
        });
    },
    // 关闭弹窗
    close() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
/deep/.el-form-item {
  margin: 10px;
  // width: 180px;
  .el-input__inner {
    box-sizing: border-box;
    // width: 180px;
    line-height: 38px;
    // background: #ffffff;
    border: 1px solid #d0d0d0;
    border-radius: 4px;
    padding-left: 10px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #333333;
    letter-spacing: 0;
  }
}
// 弹窗总box
.drop_loan {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .dialog-mask {
    z-index: 1000;
  }
  .dialog-box {
    width: 946px;
    background: #ffffff;
    font-size: 0;
    transform: none;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    margin: auto;
    margin-bottom: 80px;
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
    // 弹窗内容区域
    .dialog-box__content {
      padding: 0 30px 30px 30px;
      // 基本信息
      .header {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        .btn {
          background: #538bf1;
          color: #ffffff;
        }
      }
      // 信息
      .dialog-box_info {
        margin-top: 20px;
        height: 100px;
        .info_item {
          float: left;
          width: 292px;
          height: 40px;
          line-height: 40px;
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
      }
      // 表格
      .tableBox {
        width: 100%;
        height: auto;
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
              padding-left: 20px;
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
                height: 60px;
                align-items: center;
                padding-left: 20px;
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
