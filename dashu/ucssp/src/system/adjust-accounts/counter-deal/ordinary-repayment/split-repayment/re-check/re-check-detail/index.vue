<style lang="less" rel="stylesheet/less" scoped>
// 公共样式
.height_60 {
  height: 60px;
}
// 弹窗总box
.drop_loan {
  .dialog-mask {
    z-index: 1000;
  }
  .dialog-box {
    height: 780px;
    width: 1200px;
    padding: 0px;
    .dialog-box__top {
      margin: 0px;
    }
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
      height: 720px;
      overflow-y: auto;
      // 中间内容区域
      .form__block {
        height: 720px;
        padding: 20px 30px;
        box-shadow: 0 2px 6px 0 #d0d0d0;
      }
      // 按钮部分
      .form__bottom {
        left: 50%;
        padding-bottom: 30px;
        background-color: rgba(255, 255, 255);
        .add {
          width: 200px;
        }
      }
    }
  }
  /*表单区块*/
  .dialog-box__middle-form {
    .form__bottom {
      text-align: center;
      padding-bottom: 20px;
    }
  }
  // 弹窗下部分
  .complete-product {
    width: 100%;
    height: 720px;
    // 表格
    .table_box {
        width: 100%;
        height: 630px;
        overflow: auto;
        .el-table__row {
          height: 60px;
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
        <h5 class="title_type">明细</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <!-- 弹窗下部分 -->
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <!-- 内容区 -->
            <div class="form__block bg__white border__radius-5" >
              <!-- 带全选的表格 -->
              <div class="table_box">
                  <el-table
                  :default-sort = "{prop: 'date', order: 'descending'}"
                  :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
                  ref="multipleTable"
                  max-height="630"
                  :data="for_"
                  tooltip-effect="dark"
                  style="width: 100%; border: 1px solid #E9E9E9;"
                  @selection-change="handleSelectionChange">
                    <el-table-column
                        style="height: 60px"
                        prop="bill_no"
                        width="200px"
                        label="单据号">
                    </el-table-column>
                    <el-table-column
                        prop="loan_no"
                        style="height: 60px"
                        width="180px"
                        label="出账编号">
                    </el-table-column>
                    <el-table-column
                        prop="sterm"
                        label="期次">
                    </el-table-column>
                        <el-table-column
                        prop="pay_date"
                        width="150px"
                        label="应还日期">
                    </el-table-column>
                    <el-table-column
                        prop="acc_date"
                        width="150px"
                        label="记账日期">
                    </el-table-column>
                        <el-table-column
                        prop="trans_channel_name"
                        width="200px"
                        label="交易渠道">
                    </el-table-column>
                    <el-table-column
                        prop="pay_corp"
                        label="应还本金">
                    </el-table-column>
                    <el-table-column
                        prop="actual_corp"
                        label="实还本金">
                    </el-table-column>
                    <el-table-column
                        prop="pay_inte"
                        label="应还利息">
                    </el-table-column>
                    <el-table-column
                        prop="actual_inte"
                        label="实还利息">
                    </el-table-column>
                     <el-table-column
                        prop="pay_fine"
                        label="应还罚息">
                    </el-table-column>
                     <el-table-column
                        prop="actual_fine"
                        label="实还罚息">
                    </el-table-column>
                    <el-table-column
                        prop="pay_compound"
                        label="应还复利">
                    </el-table-column>
                     <el-table-column
                        prop="actual_compound"
                        label="实还复利">
                    </el-table-column>
                    <el-table-column
                        prop="dd_pay_fine"
                        label="应还代垫罚息">
                    </el-table-column>
                    <el-table-column
                        prop="dd_actual_fine"
                        label="实还代垫罚息">
                    </el-table-column>
                    <el-table-column
                        prop="dd_pay_compound"
                        label="应还代垫复利">
                    </el-table-column>
                    <el-table-column
                        prop="dd_actual_compound"
                        label="实还代垫复利">
                    </el-table-column>
                    <!-- <el-table-column
                        prop="pay_bank_fine"
                        width="100px"
                        label="应还银行罚息">
                    </el-table-column>
                     <el-table-column
                        prop="actual_bank_fine"
                        width="100px"
                        label="实还银行罚息">
                    </el-table-column>
                    <el-table-column
                        prop="pay_bank_compound"
                        width="100px"
                        label="应还银行复利">
                    </el-table-column>
                     <el-table-column
                        prop="actual_bank_compound"
                        width="100px"
                        label="实还银行复利">
                    </el-table-column> -->
                    <el-table-column
                        prop="pay_amount"
                        label="应还费用">
                    </el-table-column>
                     <el-table-column
                        prop="actual_amount"
                        label="实还费用">
                    </el-table-column>
                    <el-table-column
                        prop="fee_name"
                        label="费用类型">
                    </el-table-column>
                  </el-table>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { counterDealApi } from "../../../../js/server.js"; // 接口
export default {
  // 负组件传来的值
  props: {
    tetail_data: {
      type: Object,
      required: {}
    }
  },
  data() {
    return {
      user_name: '', // 客户姓名
      charge_Off_num: '', // 出账编号
      repayment_num: '', // 还款期次
      value1: '', // 应还日期
      for_: [] // 渲染数据列表
    };
  },
  filters: {
    date_filters(data) {
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
        let D = change(date.getDate()) + ' ';
        let h = change(date.getHours()) + ':';
        let m = change(date.getMinutes()) + ':';
        let s = change(date.getSeconds());
        return Y + M + D + h + m + s;
    }
  },
  created() {
    console.log("res");
    let res = {
      "eq": {
        "trans_serial_no": this.tetail_data.trans_serial_no
      }
    };
    // 查询子单详情
    this.BackBillList(res);
  },
  methods: {
    // 查询子单详情
    BackBillList(res) {
      this.$MyFetch.post(counterDealApi.BackBillList, res)
      .then((data = {}) => {
          this.for_ = data.records;
      })
      .catch((err) => {
          console.log(err);
          this.$error(err.message);
      });
    },
    // 选择框选中
    handleSelectionChange (data) {
        console.log(data);
    },
    // 关闭弹窗
    close() {
      this.$emit("clsoe_windowDetail");
    }
  }
};
</script>
