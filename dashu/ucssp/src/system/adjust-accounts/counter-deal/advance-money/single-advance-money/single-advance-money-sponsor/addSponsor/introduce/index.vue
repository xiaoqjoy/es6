<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  // z-index: 1001;
  .dialog-box {
    width: 1200px;
    height: 780px;
    border-radius: 4px;
    background-color:#fff;
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: bold;
      box-shadow: 0 2px 6px 0 #d0d0d0;
    }
    .mgtop {
      margin-top: 20px;
    }
    .el-form-item {
      width: 28%;
      margin-right: 40px;
    }
    .el-form-item .el-select {
      width: 245px;
    }
    .dialog-box__middle {
      height: 495px;
      .middle {
        .el-select {
          display: block;
        }
        .el-textarea__inner {
          background: #d0d0d0;
        }
      }
    }
    .dialog-box__middle-1200 {
      height: 442px;
      overflow-y: auto;
      margin: 0 20px;
      padding: 25px 30px;
      box-shadow: 0 2px 6px 0 #d0d0d0;
      .dialog-box__middle-top {
        padding: 20px 0;
        border-bottom: 1px solid #d0d0d0;
        .title {
          font-size: 16px;
          .icon__gan {
            margin-right: 10px;
          }
        }
      }
    }
    .dialog-box__middle-form {
      overflow-y: auto;
      padding: 0 20px;
      .form__block {
        padding: 20px 30px;
        margin-bottom: 20px;
        box-shadow: 0 2px 6px 0 #d0d0d0;
        .dialog-box__middle-top {
          padding-bottom: 20px;
          border-bottom: 1px solid #e9e9e9;
          .title {
            font-size: 16px;
            .icon__gan {
              margin-right: 10px;
            }
          }
        }
      }
    }
    .dialog-box__middle-form {
      overflow-y: auto;
      padding: 0 20px;
      .form__block {
        padding: 20px 30px;
        margin-bottom: 20px;
        box-shadow: 0 2px 6px 0 #d0d0d0;
        .dialog-box__middle-top {
          padding-bottom: 20px;
          border-bottom: 1px solid #e9e9e9;
          .title {
            font-size: 16px;
            .icon__gan {
              margin-right: 10px;
            }
          }
        }
      }
    }
    .dialog-box__top {
      margin: 0px;
    }
    // 输入框和下拉框部分样式
    .b_content {
      margin-top: 30px;
      text-align: left;
      height: 60px;
      margin-left: 28px;
      // 输入框和下拉框172*40
      .select_72 {
        width: 160px;
        height: 40px;
        margin-right: 15px;
      }
      .select_722 {
        width: 240px;
        height: 40px;
        margin-right: 15px;
        /deep/.el-date-editor {
          width: 18%;
        }
        /deep/.el-range-separator {
          width: 18%;
        }
      }
      // 查询和清空的公有样式
      .b_button {
        width: 100px;
        height: 40px;
        border-radius: 4px;
        font-size: 14px;
      }
      // 查询单独样式
      .query {
        background: #538bf1;
        color: #ffffff;
      }
      // 清空单独样式
      .empty {
        background: #ffffff;
        color: #538bf1;
        border: 1px solid #538bf1;
      }
    }
    .pagination {
      margin-top: 40px;
      margin-right: 30px;
    }
    .button_d {
      width: 200px;
      height: 40px;
      background: #538bf1;
      border-radius: 4px;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 1.07px;
      margin-top: 36px;
      margin-left: 500px;
    }
    // 表格总体样式
    .tables {
      overflow-y: auto;
      overflow-x: hidden;
      height: 400px;
      width: 1146px;
      margin: 0px auto;
      border: 1px solid #d0d0d0;
      margin-top: 21px;
      border-radius: 4px;
      .headline_t {
        height: 40px;
        border: 0px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        line-height: 40px;
      }
    }
    // 去掉element表格的默认全选按钮
    .tables /deep/ th .el-checkbox {
      display: none;
    }
    .pagination {
      margin-top: 40px;
      margin-right: 30px;
    }
  }
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box bg__white">
      <div class="dialog-box__top">
        <h5 class="title_type">引入</h5>
        <span class="el-icon-close button button__close" @click="close_"></span>
      </div>
      <!-- 输入框和下拉框 -->
      <div class="b_content">
        <el-input clearable class="select_72" v-model="czbh" placeholder="出账编号"></el-input>
        <el-input clearable class="select_72" v-model="khxm" placeholder="客户姓名"></el-input>
        <el-date-picker
          class="select_722"
          v-model="yhrq"
          type="date"
          placeholder="应还日期"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <el-button class="b_button query" @click="refer">查询</el-button>
        <el-button class="b_button empty" @click="empty">清空</el-button>
      </div>
      <!-- 表格 -->
      <div class="tables">
        <el-table
          :default-sort="{prop: 'date', order: 'descending'}"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
          ref="multipleTable"
          max-height="398"
          :data="for_"
          @row-click="clickRow"
          @select="select"
          @selection-change="handleSelectionChange"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column width="200" prop="loan_no" label="出账编号"></el-table-column>
          <el-table-column prop="customer_name" label="客户姓名"></el-table-column>
          <el-table-column prop="sterm" label="期次"></el-table-column>
          <el-table-column prop="pay_corp" label="应还本金"></el-table-column>
          <el-table-column prop="pay_inte" label="应还利息"></el-table-column>
          <el-table-column prop="pay_fine" label="应还罚息"></el-table-column>
          <el-table-column prop="pay_compound" label="应还复利"></el-table-column>
          <el-table-column prop="pay_date" label="应还日期">
            <!-- <template slot-scope="scope">
              <span>{{date_filters(scope.row.pay_date)}}</span>
            </template> -->
          </el-table-column>
          <el-table-column prop="pay_amount" label="应还总费用"></el-table-column>
        </el-table>
      </div>
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
      <!-- 底部 -->
      <el-button class="button_d" @click="goAhead">确认</el-button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import { checkingApi } from "../../../../../../js/server";
import "@common/css/dialog";
export default {
  data() {
    return {
      selectedRow_: [], // 复选框是否选中
      numberC: "", // 出账编号
      issue: "", // 期次
      for_: [], // 列表
      czbh: "", // 出账编号
      khxm: "", // 客户姓名
      yhrq: "", // 应还日期
      // 查询数据
      searchData: {
        eq: {}
      },
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  methods: {
    // 引入点击确定查询接口
    goAhead() {
      if (this.selectedRow_.length > 0) {
        let url = checkingApi.BackBillList;
        let data = {
          loan_no: this.numberC, // 出账编号
          sterm: this.issue, // 期次
          trans_type: "AdvancePayment"
        };
        this.$MyFetch
          .post(url, data)
          .then((data = {}) => {
            console.log(data);
            this.$emit("close_", data);
            this.intoTheField.chuZhangNumber = data.loan_no; // 出账编号
            this.intoTheField.issueQ = data.sterm; // 期次
            this.intoTheField.dateShould = data.pay_date; // 应还日期
            this.intoTheField.thePrincipal = data.pay_corp; // 垫付本金应还金额
            this.intoTheField.interest = data.pay_inte; // 垫付利息应还金额
            this.intoTheField.penalty = data.pay_fine; // 罚息应还金额
            this.intoTheField.interestF = data.pay_compound; // 复利应还金额
          })
          .catch(err => {
            this.$error(err.message);
          });
      } else {
        this.confirmFn("请先选择一条你需要引入的数据", "err");
      }
    },
    handleSelectionChange(data) {
      this.multipleSelection = data;
      if (this.multipleSelection.length > 1) {
          this.$refs.multipleTable.toggleRowSelection(this.multipleSelection[0]);
      }
      this.selectedRow_ = data;
    },
    // 行选中
    clickRow(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
      this.numberC = row.loan_no;
      this.issue = row.sterm;
    },
    // 只能选择其中一个复选框事件
    select(selection, row) {
      if (selection.length > 1) {
        selection.shift();
      }
      this.numberC = row.loan_no;
      this.issue = row.sterm;
    },
    // 毫秒格式化
    // date_filters(data) {
    //   function change(t) {
    //     if (t < 10) {
    //       return "0" + t;
    //     } else {
    //       return t;
    //     }
    //   }
    //   if (data) {
    //     var date = new Date(data); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000;
    //     let Y = date.getFullYear() + "/";
    //     let M =
    //       (date.getMonth() + 1 < 10
    //         ? "0" + (date.getMonth() + 1)
    //         : date.getMonth() + 1) + "/";
    //     let D = change(date.getDate());
    //     return Y + M + D;
    //   } else {
    //     return "---";
    //   }
    // },
    // 发起查询列表接口
    loanParameter(res, current) {
      res = res || {};
      current = current || 1;
      let url = checkingApi.SaveRepayment + "?current=" + current + "&size=10";
      this.$MyFetch
        .post(url, res)
        .then((data = {}) => {
          this.for_ = data.records;
          // 总条数
          this.pageConfig.account = data.total || 1;
          // 当前页
          this.pageConfig.currentPage = data.current || 1;
          // 一页有几条数据 pageSize
          this.pageConfig.pageSize = data.size || 10;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 查询
    refer() {
      if (this.czbh === "" && this.khxm === "" && this.yhrq === "") {
        this.confirmFn("请至少选择一个查询条件输入");
        this.for_ = [];
      } else {
        this.searchData.eq["loan.loan_no"] = this.czbh;
        this.searchData.eq["customerinfo.customer_name"] = this.khxm;
        this.searchData.eq["bankplan.pay_date"] = this.yhrq;
        this.loanParameter(this.searchData);
        console.log(this.searchData);
      }
    },
    // 清空
    empty() {
      this.czbh = "";
      this.khxm = "";
      this.yhrq = "";
    },
    // 分页
    jump(pageNum) {
      this.loanParameter(this.searchData, pageNum);
    },
    // 关闭引入
    close_() {
      this.$emit("close_");
    }
  },
  props: ["intoTheField"],
  components: {
    pagination
  }
};
</script>
