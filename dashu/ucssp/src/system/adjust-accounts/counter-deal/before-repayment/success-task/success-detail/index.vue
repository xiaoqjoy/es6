<style lang="less" rel="stylesheet/less" scoped>
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
      padding: 0 30px;
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
          background: #538BF1;
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
        height: 140px;
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
      .select_item {
        display: inline-block;
        width: 245px;
        white-space: nowrap;
        margin-bottom: 20px;
        .select_title {
          span {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #BBBBBB;
            letter-spacing: 1.09px;
          }
        }
        .select_input {
          padding-top: 10px;
          .select_245 {
            display: inline-block;
            background-color: #fff;
            border-radius: 4px;
            border: 1px solid #d0d0d0;
            box-sizing: border-box;
            color: #000;
            font-size: 12px;
            width: 245px;
            height: 40px;
            line-height: 40px;
            padding: 0 15px;
          }
        }
      }
      // 表格
      .tableBox {
        width: 100%;
        height: auto;
        .tables {
          // padding: 0 30px;
          border: 1px solid #E9E9E9;
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
              .tableBodyTd1, .tableBodyTd2, .tableBodyTd3, .tableBodyTd4 {
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
                color: #BBBBBB;
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
              // padding-left: 20px;
              span {
                display: inline-block;
                width: 220px;
                padding-left: 30px;
                box-sizing: border-box;
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
      <!-- 弹窗内容区 -->
      <div class="dialog-box__content">
        <!-- 标题 -->
        <div class="content_top">
          <span>基本信息</span>
        </div>
        <!-- 信息 -->
        <div class="dialog-box_info">
          <div class="info_item">
            <span class="item_title">出账编号:&nbsp;&nbsp;</span>
            <i class="item_data">{{ loan_no }}</i>
          </div>
          <div class="info_item">
            <span class="item_title">客户姓名:&nbsp;&nbsp;</span>
            <i class="item_data">{{ customer_name }}</i>
          </div>
          <div class="info_item">
            <span class="item_title">身份证号:&nbsp;&nbsp;</span>
            <i class="item_data">{{ cert_no | certificateNum }}</i>
          </div>
          <div class="info_item">
            <span class="item_title">放款机构:&nbsp;&nbsp;</span>
            <i class="item_data">{{ line_id }}</i>
          </div>
          <div class="info_item">
            <span class="item_title">合作模式:&nbsp;&nbsp;</span>
            <i class="item_data">{{ collaborate }}</i>
          </div>
          <div class="info_item">
            <span class="item_title">预约上门时间:&nbsp;&nbsp;</span>
            <i class="item_data">{{ applyDate | date_filters }}</i>
          </div>
          <div class="info_item">
            <span class="item_title">单据号:&nbsp;&nbsp;</span>
            <i class="item_data">{{ trans_serial_no }}</i>
          </div>
          <div class="info_item">
            <span class="item_title">是否逾期:&nbsp;&nbsp;</span>
            <i class="item_data">{{ loan_status }}</i>
          </div>
          <div class="info_item">
            <span class="item_title">期次:&nbsp;&nbsp;</span>
            <i class="item_data">{{ loan_term }}</i>
          </div>
        </div>
        <!-- 扣款渠道 -->
        <div class="select_item">
          <div class="select_title">
            <span>扣款渠道</span>
          </div>
          <div class="select_input">
            <span class="select_245">{{ trans_channel }}</span>
          </div>
        </div>
        <!-- 表格 -->
        <div class="tableBox">
          <div class="tables">
            <!-- 表头 -->
            <div class="tableHeader">
              <div class="tableHeaderTd"></div>
              <div class="tableHeaderTd"><span>应还金额</span></div>
              <div class="tableHeaderTd"><span>实还金额</span></div>
              <div class="tableHeaderTd"><span>减免金额</span></div>
            </div>
            <!-- 表体 -->
            <div class="tableBody">
              <div class="tableBodyTr">
                <div class="tableBodyTd1"><span class="spanStyle1">剩余本金</span></div>
                <div class="tableBodyTd2"><span class="spanStyle1">{{ corp.payAmount }}</span></div>
                <div class="tableBodyTd3"><span class="spanStyle1">{{ corp.actualAmount }}</span></div>
                <div class="tableBodyTd4"><span class="spanStyle1">{{ corp.reductAmount }}</span></div>
              </div>
              <div class="tableBodyTr">
                <div class="tableBodyTd1"><span class="spanStyle1">当前利息</span></div>
                <div class="tableBodyTd2"><span class="spanStyle1">{{ inte.payAmount }}</span></div>
                <div class="tableBodyTd3"><span class="spanStyle1">{{ inte.actualAmount }}</span></div>
                <div class="tableBodyTd4"><span class="spanStyle1">{{ inte.reductAmount }}</span></div>
              </div>
              <div class="tableBodyTr">
                <div class="tableBodyTd1"><span class="spanStyle1">未结清本金</span></div>
                <div class="tableBodyTd2"><span class="spanStyle1">{{ ddcorp.payAmount }}</span></div>
                <div class="tableBodyTd3"><span class="spanStyle1">{{ ddcorp.actualAmount }}</span></div>
                <div class="tableBodyTd4"><span class="spanStyle1">{{ ddcorp.reductAmount }}</span></div>
              </div>
              <div class="tableBodyTr">
                <div class="tableBodyTd1"><span class="spanStyle1">未结清利息</span></div>
                <div class="tableBodyTd2"><span class="spanStyle1">{{ ddinte.payAmount }}</span></div>
                <div class="tableBodyTd3"><span class="spanStyle1">{{ ddinte.actualAmount }}</span></div>
                <div class="tableBodyTd4"><span class="spanStyle1">{{ ddinte.reductAmount }}</span></div>
              </div>
              <div class="tableBodyTr">
                <div class="tableBodyTd1"><span class="spanStyle1">未结清罚息</span></div>
                <div class="tableBodyTd2"><span class="spanStyle1">{{ ddfind.payAmount }}</span></div>
                <div class="tableBodyTd3"><span class="spanStyle1">{{ ddfind.actualAmount }}</span></div>
                <div class="tableBodyTd4"><span class="spanStyle1">{{ ddfind.reductAmount }}</span></div>
              </div>
              <div class="tableBodyTr">
                <div class="tableBodyTd1"><span class="spanStyle1">未结清复利</span></div>
                <div class="tableBodyTd2"><span class="spanStyle1">{{ ddcompound.payAmount }}</span></div>
                <div class="tableBodyTd3"><span class="spanStyle1">{{ ddcompound.actualAmount }}</span></div>
                <div class="tableBodyTd4"><span class="spanStyle1">{{ ddcompound.reductAmount }}</span></div>
              </div>
              <div class="tableBodyTr" v-for="(feeItem, feeIndex) of feeList" :key="feeIndex">
                <div class="tableBodyTd1"><span class="spanStyle1">{{ feeItem.feeName }}</span></div>
                <div class="tableBodyTd2"><span class="spanStyle1">{{ feeItem.payAmount }}</span></div>
                <div class="tableBodyTd3"><span class="spanStyle1">{{ feeItem.actualAmount }}</span></div>
                <div class="tableBodyTd4"><span class="spanStyle1">{{ feeItem.reductAmount }}</span></div>
              </div>
            </div>
           <!-- 表尾 -->
            <div class="tableFooter">
              <div class="tableFooterTd1">
                <span>总计大数费用</span>
              </div>
              <div class="tableFooterTd2">
                <span>{{ dsAmountSum }}</span>
                <span>{{ dsActualSum }}</span>
                <span>{{ dsReduceSum }}</span>
              </div>
            </div>
            <div class="tableFooter">
              <div class="tableFooterTd1">
                <span>总计合作方费用</span>
              </div>
              <div class="tableFooterTd2">
                <span>{{ coAmSum }}</span>
                <span>{{ coReSum }}</span>
                <span>{{ coAcSum }}</span>
              </div>
            </div>
            <div class="tableFooter">
              <div class="tableFooterTd1">
                <span>总计费用</span>
              </div>
              <div class="tableFooterTd2">
                <span>{{ amSum }}</span>
                <span>{{ acSum }}</span>
                <span>{{ reSum }}</span>
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
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
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
       corpRule: [],
      feeRule: [],
      ruleFlag: '0', // 是否按规则，1按规则
      dataInfo: {},
      trans_serial_no: "", // 交易号
      loan_no: "", // 申请编号
      customer_name: "胡歌", // 客户姓名
      cert_no: "112233665544778899", // 身份证号
      line_id: null, // 放款机构
      collaborate: null, // 合作模式
      applyDate: '', // 预约上门时间
      loan_status: "", // 逾期标志
      loan_term: 7, // 期次
      totAmt: '0', // 总计应还费用
      trans_channel: '', // 扣款渠道
      // 剩余本金
      corp: {},
      // 当前利息
      inte: {},
      // 未结清本金
      ddcorp: {},
      // 未结清利息
      ddinte: {},
      // 未结清罚息
      ddfind: {},
      // 未结清复利
      ddcompound: {},
      // 费用列表
      feeList: []
    };
  },
  filters: {
    date_filters(data) {
        if (!data) return "---";
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
    }
  },
  computed: {
    // 大数应还
    dsAmountSum() {
      let sum1 = 0; // 应还金额总计
      let sum2 = 0; // 应还费用总计
      let typeSet = new Set(['001', '002', '003', '004', '005', '006', '007', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009', '1010', '1011', '1012', '1013']);
      if (this.ruleFlag === '1') {
        this.corpRule.forEach((element) => {
            switch (element) {
              case "CORP": sum1 += Number(this.corp.payAmount); break;
              case "INTE": sum1 += Number(this.inte.payAmount); break;
            }
        });
        this.feeRule.forEach((feeElement) => {
          if (typeSet.has(feeElement)) {
            this.feeList.forEach(feeMapItem => {
              if (feeMapItem.feeType === feeElement) {
                sum2 += Number(feeMapItem.payAmount);
              }
            });
          }
        });
      } else {
        let feeSum = 0;
        console.log(this.feeList, 'feelist');
        this.feeList.forEach(element => {
          feeSum += Number(element.payAmount);
        });
        return feeSum.toFixed(2);
      }
      return (sum1 + sum2).toFixed(2);
    },
    // 大数实还
    dsActualSum() {
      let sum1 = 0; // 应还金额总计
      let sum2 = 0; // 应还费用总计
      let typeSet = new Set(['001', '002', '003', '004', '005', '006', '007', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009', '1010', '1011', '1012', '1013']);
      if (this.ruleFlag === '1') {
        this.corpRule.forEach((element) => {
            switch (element) {
              case "CORP": sum1 += Number(this.corp.actualAmount); break;
              case "INTE": sum1 += Number(this.inte.actualAmount); break;
            }
        });
        this.feeRule.forEach((feeElement) => {
          if (typeSet.has(feeElement)) {
            this.feeList.forEach(feeMapItem => {
              if (feeMapItem.feeType === feeElement) {
                sum2 += Number(feeMapItem.actualAmount);
              }
            });
          }
        });
      } else {
        let feeSum = 0;
        console.log(this.feeList, 'feelist');
        this.feeList.forEach(element => {
          feeSum += Number(element.actualAmount);
        });
        return feeSum.toFixed(2);
      }
      return (sum1 + sum2).toFixed(2);
    },
    // 大数减免
    dsReduceSum() {
      let sum1 = 0; // 应还金额总计
      let sum2 = 0; // 应还费用总计
      let typeSet = new Set(['001', '002', '003', '004', '005', '006', '007', '1001', '1002', '1003', '1004', '1005', '1006', '1007', '1008', '1009', '1010', '1011', '1012', '1013']);
      if (this.ruleFlag === '1') {
        this.corpRule.forEach((element) => {
            switch (element) {
              case "CORP": sum1 += Number(this.corp.reductAmount); break;
              case "INTE": sum1 += Number(this.inte.reductAmount); break;
            }
        });
        this.feeRule.forEach((feeElement) => {
          if (typeSet.has(feeElement)) {
            this.feeList.forEach(feeMapItem => {
              if (feeMapItem.feeType === feeElement) {
                sum2 += Number(feeMapItem.reductAmount);
              }
            });
          }
        });
      } else {
        let feeSum = 0;
        console.log(this.feeList, 'feelist');
        this.feeList.forEach(element => {
          feeSum += Number(element.reductAmount);
        });
        return feeSum.toFixed(2);
      }
      return (sum1 + sum2).toFixed(2);
    },
    // 合作方总计应还
    coAmSum() {
      return (this.amSum - this.dsAmountSum).toFixed(2);
    },
    // 合作方总计实还
    coReSum() {
      return (this.acSum - this.dsActualSum).toFixed(2);
    },
    // 合作方总计减免
    coAcSum() {
      return (this.reSum - this.dsReduceSum).toFixed(2);
    },
    // 总计应还
    amSum () {
      let feeSum = 0;
      this.feeList.forEach(element => {
        feeSum += Number(element.payAmount);
      });
      return (feeSum + Number(this.corp.payAmount) + Number(this.inte.payAmount) + Number(this.ddcorp.payAmount) + Number(this.ddinte.payAmount) + Number(this.ddfind.payAmount) + Number(this.ddcompound.payAmount)).toFixed(2);
    },
    acSum () {
      let feeSum = 0;
      this.feeList.forEach(element => {
        feeSum += Number(element.actualAmount);
      });
      return (feeSum + Number(this.corp.actualAmount) + Number(this.inte.actualAmount) + Number(this.ddcorp.actualAmount) + Number(this.ddinte.actualAmount) + Number(this.ddfind.actualAmount) + Number(this.ddcompound.actualAmount)).toFixed(2);
    },
    reSum () {
      let feeSum = 0;
      this.feeList.forEach(element => {
        feeSum += Number(element.reductAmount);
      });
      return (feeSum + Number(this.corp.reductAmount) + Number(this.inte.reductAmount) + Number(this.ddcorp.reductAmount) + Number(this.ddinte.reductAmount) + Number(this.ddfind.reductAmount) + Number(this.ddcompound.reductAmount)).toFixed(2);
    }
  },
  created() {
    console.log(this.tetailData);
    this.trans_serial_no = this.tetailData.trans_serial_no;
    let data = {
      trans_serial_no: this.trans_serial_no
    };
    this.reviewDetail(data);
  },
  methods: {
    // 赋值
    getDate(data) {
      this.corpRule = data.corpRule || []; // 相加金额
      this.feeRule = data.feeRule || []; // 相加费用
      this.ruleFlag = data.ruleFlag || '0'; // 是否按规则，1按规则
      // 剩余本金
      this.corp = data.corp;
      // 当前利息
      this.inte = data.inte;
      // 未结清本金
      this.ddcorp = data.ddcorp;
      // 未结清利息
      this.ddinte = data.ddinte;
      // 未结清罚息
      this.ddfind = data.ddfind;
      // 未结清复利
      this.ddcompound = data.ddcompound;
      // 费用列表
      this.feeList = data.feeList;
      // 基本信息
      this.loan_no = data.loan_no; // 申请编号
      this.cert_no = data.cert_no; // 身份证号
      this.collaborate = data.collaborate; // 合作模式
      this.customer_name = data.customer_name; // 客户姓名
      this.line_id = data.line_id; // 放款机构
      this.loan_term = data.loan_term; // 期次
      this.trans_channel = data.trans_channel; // 扣款渠道
      this.applyDate = data.appointDate; // 提前还款日期
      this.totAmt = data.totAmt; // 总计应还费用
      this.loan_status = data.loan_status;// 费用数组
    },
    // 提前还款-待复核详情
    reviewDetail(res) {
        this.$MyFetch.post(counterDealApi.reviewDetail, res)
        .then((data = {}) => {
            this.getDate(data);
        })
        .catch((err) => {
            console.log(err);
            this.$error(err.message);
        });
    },
    // 关闭弹窗
    close() {
      this.$emit("clsoe_windowDetail");
    },
    // 打印提前还款申请表
    print_fun() {
      console.log("打印提前还款申请表");
    },
    // 上传影像
    upload_fun() {
      console.log("上传影像");
    },
    // 试算
    count_fun() {
      console.log("试算");
    },
    // 确认
    affirm_fun() {
      console.log("确认");
    }
  },
  components: {
    // composite,
    // stateOfPreservation
  },
  mounted() {
    // this.field_numbers_c(); // 调取优先配置字段列表接口
  }
};
</script>
