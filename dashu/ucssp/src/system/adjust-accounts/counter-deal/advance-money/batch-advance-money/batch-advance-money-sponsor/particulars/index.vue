<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 1200px;
    height: 688px;
    border-radius: 4px;
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
    // 表格总体样式
    .tables {
      overflow-y: auto;
      overflow-x: hidden;
      height: 400px;
      width: 1160px;
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
      /deep/ .el-collapse {
        border-top: #ebeef5;
        border-bottom: #ebeef5;
      }
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
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title_type">明细</h5>
        <span class="el-icon-close button button__close" @click="close_"></span>
      </div>
      <!-- 表格 -->
      <div class="tables">
        <el-table
          :default-sort="{prop: 'date', order: 'descending'}"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
          ref="multipleTable"
          max-height="398"
          :data="for_"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <!-- <el-table-column width="200" prop="trans_channel" label="交易渠道"></el-table-column> -->
          <el-table-column width="200" prop="bill_no" label="单据号"></el-table-column>
          <el-table-column width="200" prop="bill_type" label="单据类型"></el-table-column>
          <el-table-column width="200" prop="related_id" label="批次号"></el-table-column>
          <el-table-column width="200" prop="loan_no" label="出账编号"></el-table-column>
          <el-table-column prop="sterm" label="期次"></el-table-column>
          <el-table-column prop="pay_corp" label="应还本金"></el-table-column>
          <el-table-column prop="actual_corp" label="实还本金"></el-table-column>
          <el-table-column prop="pay_inte" label="应还利息"></el-table-column>
          <el-table-column prop="actual_inte" label="实还利息"></el-table-column>
          <el-table-column width="100" prop="dd_pay_fine" label="应还代垫罚息"></el-table-column>
          <el-table-column width="100" prop="dd_actual_fine" label="实还代垫罚息"></el-table-column>
          <el-table-column width="100" prop="dd_pay_compound" label="应还代垫复利"></el-table-column>
          <el-table-column width="100" prop="dd_actual_compound" label="实还代垫复利"></el-table-column>
          <el-table-column width="100" prop="pay_bank_fine" label="应还银行罚息"></el-table-column>
          <el-table-column width="100" prop="actual_bank_fine" label="实还银行罚息"></el-table-column>
          <el-table-column width="100" prop="pay_bank_compound" label="应还银行复利"></el-table-column>
          <el-table-column width="100" prop="actual_bank_compound" label="实还银行复利"></el-table-column>
          <!-- <el-table-column prop="pay_corp" label="应还本金"></el-table-column>
          <el-table-column prop="actual_corp" label="实还本金"></el-table-column>
          <el-table-column prop="pay_inte" label="应还利息"></el-table-column>
          <el-table-column prop="actual_inte" label="实还利息"></el-table-column>
          <el-table-column prop="pay_fine" label="应还罚息"></el-table-column>
          <el-table-column prop="actual_fine" label="实还罚息"></el-table-column>
          <el-table-column width="100" prop="pay_bank_fine" label="应还银行罚息"></el-table-column>
          <el-table-column width="100" prop="actual_bank_fine" label="实还银行罚息"></el-table-column>
          <el-table-column prop="pay_compound" label="应还复利"></el-table-column>
          <el-table-column prop="actual_compound" label="实还复利"></el-table-column>
          <el-table-column width="100" prop="pay_bank_compound" label="应还银行复利"></el-table-column>
          <el-table-column width="100" prop="actual_bank_compound" label="实还银行复利"></el-table-column> -->
          <el-table-column width="100" prop="pay_date" label="应还日期">
            <!-- <template slot-scope="scope">
              <span>{{date_filters(scope.row.pay_date)}}</span>
            </template>-->
          </el-table-column>
          <el-table-column prop="pay_amount" label="应还费用"></el-table-column>
          <el-table-column prop="actual_amount" label="实还费用"></el-table-column>
          <el-table-column prop="fee_name" label="费用类型"></el-table-column>
          <el-table-column width="100" prop="acc_date" label="记账日期">
            <!-- <template slot-scope="scope">
              <span>{{date_filters(scope.row.acc_date)}}</span>
            </template>-->
          </el-table-column>
        </el-table>
      </div>
      <pagination @jump-page="jump" :page="pageConfig" class="pagination"></pagination>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页组件
import { checkingApi } from "../../../../../js/server"; // 接口
import "@common/css/dialog";
export default {
  data() {
    return {
      searchData: {
        eq: {}
      },
      for_: [],
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  created() {
    this.refer();
  },
  methods: {
    // 发起查询列表接口
    loanParameter(res, current) {
      res = res || {};
      current = current || 1;
      let url =
        checkingApi.ChannelLista + "?current=" + current + "&size=10";
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
      this.searchData.eq.related_id = this.batchNumberIntroduced;
      this.loanParameter(this.searchData);
      console.log(this.searchData);
      // }
    },
    // 分页
    jump(pageNum) {
      this.loanParameter(this.searchData, pageNum);
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
    //     var date = new Date(data * 1000); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000;
    //     let Y = date.getFullYear() + "-";
    //     let M =
    //       (date.getMonth() + 1 < 10
    //         ? "0" + (date.getMonth() + 1)
    //         : date.getMonth() + 1) + "-";
    //     let D = change(date.getDate()) + " ";
    //     let h = change(date.getHours()) + ":";
    //     let m = change(date.getMinutes()) + ":";
    //     let s = change(date.getSeconds());
    //     return Y + M + D + h + m + s;
    //   } else {
    //     return "---";
    //   }
    // },
    // 关闭各阶段结论
    close_() {
      this.$emit("close_m");
    }
  },
  props: ["batchNumberIntroduced"],
  components: {
    pagination
  }
};
</script>
