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
    // height: 780px;
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
      // height: 720px;
      overflow-y: auto;
      // 中间内容区域
      .form__block {
        // height: 720px;
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
    // height: 720px;
    // 表格
    .table_box {
        width: 100%;
        height: 630px;
        overflow: auto;
        .el-table__row {
          height: 60px;
        }
    }
    // 分页条
    .pagination {
      margin-top: 20px;
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
                  style="width: 100%; border: 1px solid #E9E9E9;">
                    <el-table-column
                        prop="batchNo"
                        width="200px"
                        label="批次号">
                    </el-table-column>
                    <el-table-column
                        prop="loanNo"
                        width="180px"
                        label="出账编号">
                    </el-table-column>
                    <el-table-column
                        prop="customerName"
                        label="客户姓名">
                    </el-table-column>
                    <el-table-column
                        prop="lineName"
                        width="150px"
                        label="合作机构">
                    </el-table-column>
                    <el-table-column
                        prop="accDay"
                        width="180px"
                        label="记账日期">
                    </el-table-column>
                    <el-table-column
                        prop="inputAmount"
                        width="100px"
                        label="录入总金额">
                    </el-table-column>
                    <el-table-column
                        prop="transAmount"
                        width="100px"
                        label="记账总金额">
                    </el-table-column>
                    <!-- <el-table-column
                        prop="normalBalance"
                        label="剩余正常本金">
                    </el-table-column> -->
                    <el-table-column
                        prop="payCorp"
                        width="100px"
                        label="应还本金">
                    </el-table-column>
                    <el-table-column
                        prop="actualCorp"
                        width="100px"
                        label="实还本金">
                    </el-table-column>
                    <el-table-column
                        prop="payInte"
                        width="100px"
                        label="应还利息">
                    </el-table-column>
                    <el-table-column
                        prop="actualInte"
                        width="100px"
                        label="实还利息">
                    </el-table-column>
                    <el-table-column
                        prop="payFine"
                        width="100px"
                        label="应还罚息">
                    </el-table-column>
                    <el-table-column
                        prop="actualFine"
                        width="100px"
                        label="实还罚息">
                    </el-table-column>
                    <el-table-column
                        prop="payCompound"
                        width="100px"
                        label="应还复利">
                    </el-table-column>
                    <el-table-column
                        prop="actualCompound"
                        width="100px"
                        label="实还复利">
                    </el-table-column>
                    <el-table-column
                        prop="payAmount"
                        width="100px"
                        label="应还费用">
                    </el-table-column>
                    <el-table-column
                        prop="actualAmount"
                        width="100px"
                        label="实还费用">
                    </el-table-column>
                    <el-table-column
                        prop="channelName"
                        width="180px"
                        label="扣款渠道">
                    </el-table-column>
                        <el-table-column
                        prop="operateBy"
                        width="180px"
                        label="操作用户">
                    </el-table-column>
                  </el-table>
              </div>
              <!-- 分页条 -->
            <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import pagination from "@components/pagination"; // 分页条
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
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
      pageConfig: {
          account: 5, // 总条数
          pageSize: 5, // 当前多少条数据
          currentPage: 1, // 当前页
          showJumpButton: true // 显示跳转按钮
      }, // 分页
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
            if (data) {
                var date = new Date(data * 1000); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000;
                let Y = date.getFullYear() + '-';
                let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                let D = change(date.getDate());
                return Y + M + D;
            } else {
                return "---";
            }
        }
  },
  created() {
    let queryData = {
        batchNo: this.tetail_data.batchNo
    };
    this.batchPrepaymentDetail(queryData);
  },
  methods: {
    // 批量单笔明细
    batchPrepaymentDetail(res, current) {
        res = res || {};
        current = current || 1;
        let url = counterDealApi.batchPrepaymentDetail + "?current=" + current + "&size=10";
        this.$MyFetch.post(url, res)
        .then((data = {}) => {
            this.for_ = data.records;
            // 总条数
            this.pageConfig.account = data.total || 1;
            // 当前页
            this.pageConfig.currentPage = data.current || 1;
            // 一页有几条数据 pageSize
            this.pageConfig.pageSize = data.size || 10;
        })
        .catch((err) => {
            this.$error(err.message);
        });
    },
    // 关闭弹窗
    close() {
      this.$emit("clsoe_windowDetail");
    },
    jump(pageNum) { // 分页
    let queryData = {
        batchNo: this.tetail_data.batchNo
    };
    let current = this.pageConfig.currentPage;
    this.batchPrepaymentDetail(queryData, current);
    }
  },
  components: {
    pagination
  }
};
</script>
