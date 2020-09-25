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
        height: 570px;
        overflow: auto;
        .el-table__row {
          height: 60px;
        }
    }
    .enable {
      width: 100%;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      // 删除提交公共样式
        .t_button {
            width: 200px;
            height: 40px;
        }
        .dead_t {
            border: 1px solid #538bf1;
            font-size: 14px;
            color: #538bf1;
            letter-spacing: 1.07px;
            text-align: center;
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
                  style="width: 100%; border: 1px solid #E9E9E9;">
                    <el-table-column
                        style="height: 60px"
                        prop="relationTransNo"
                        width="180px"
                        label="批次号">
                    </el-table-column>
                    <el-table-column
                        style="height: 60px"
                        prop="loanNo"
                        width="180px"
                        label="出账编号">
                    </el-table-column>
                    <el-table-column
                        prop="customerName"
                        width="100"
                        label="客户姓名">
                    </el-table-column>
                    <el-table-column
                        prop="inputAmount"
                        width="130px"
                        label="录入总金额">
                    </el-table-column>
                    <el-table-column
                        width="130px"
                        prop="transAmount"
                        label="记账总金额">
                    </el-table-column>
                    <el-table-column
                        prop="balance"
                        width="130px"
                        label="剩余金额">
                    </el-table-column>
                    <el-table-column
                        prop="accDate"
                        width="150px"
                        label="记账日期">
                    </el-table-column>
                        <el-table-column
                        prop="transChannel"
                        width="200px"
                        label="扣款渠道">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top" v-if="scope.row.transChannel">
                                <p class="ellipsis">
                                    {{scope.row.transChannel}}
                                </p>
                                <div slot="reference">
                                    <p class="yincan ellipsis">
                                    {{scope.row.transChannel}}
                                    </p>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="createdBy"
                        width="180px"
                        label="操作用户">
                    </el-table-column>
                        <el-table-column
                        prop="lineName"
                        width="200px"
                        label="合作机构">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="top" v-if="scope.row.lineName">
                                <p class="ellipsis">
                                    {{scope.row.lineName}}
                                </p>
                                <div slot="reference">
                                    <p class="yincan ellipsis">
                                    {{scope.row.lineName}}
                                    </p>
                                </div>
                            </el-popover>
                        </template>
                    </el-table-column>
                  </el-table>
              </div>
              <!-- 分页条 -->
              <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
              <!-- 底部 -->
              <div class="enable">
                <el-button class="t_button dead_t button" @click="exportFun">导出</el-button>
              </div>
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
// import { counterDealApi } from "../../../../js/server"; // 接口
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
  created() {
    let queryData = {
        relationTransNo: this.tetail_data.related_id
    };
    this.batchRepaymentBackBill(queryData);
  },
  methods: {
    // 导出
    exportFun() {
      let queryData = {
        "parameter": this.tetail_data.related_id,
        "type": "splitrepayment_details"
      };
      this.loanAccountExportPayPlanLists(queryData)
      .then((data) => {
          window.open(data.downUrl);
        })
        .catch((err) => {
          this.$error(err);
        });
    },
    // 导出请求地址
    loanAccountExportPayPlanLists(res) {
      return new Promise((resolve, reject) => {
        this.$MyFetch.post(counterDealApi.loanAccountExportPayPlanLists, res)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err.message);
        });
      });
    },
    // 批量单笔明细
    batchRepaymentBackBill(res, current) {
        res = res || {};
        current = current || 1;
        let url = counterDealApi.queryBatchSplitRepaymentDetails + "?current=" + current + "&size=10";
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
        relationTransNo: this.tetail_data.related_id
    };
    let current = this.pageConfig.currentPage;
    this.batchRepaymentBackBill(queryData, current);
    }
  },
  components: {
    pagination
  }
};
</script>
