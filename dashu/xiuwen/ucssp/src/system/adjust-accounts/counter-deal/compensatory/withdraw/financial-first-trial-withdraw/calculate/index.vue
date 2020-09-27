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
        height: 600px;
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
        <h5 class="title_type">测算</h5>
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
                  max-height="600"
                  :data="for_"
                  tooltip-effect="dark"
                  style="width: 100%; border: 1px solid #E9E9E9;">
                    <el-table-column
                        prop="billNo"
                        label="单据号">
                    </el-table-column>
                    <el-table-column
                        prop="sterm"
                        sortable
                        label="期次">
                    </el-table-column>
                    <el-table-column
                        prop="payDate"
                        label="应还日期">
                    </el-table-column>
                    <el-table-column
                        prop="accDate"
                        label="记账日期">
                    </el-table-column>
                    <el-table-column
                        prop="payCorp"
                        label="应还本金">
                    </el-table-column>
                    <el-table-column
                        prop="actualCorp"
                        label="实还本金">
                    </el-table-column>
                    <el-table-column
                        prop="payInte"
                        label="应还利息">
                    </el-table-column>
                    <el-table-column
                        prop="actualInte"
                        label="实还利息">
                    </el-table-column>
                    <el-table-column
                        prop="payFine"
                        label="应还罚息">
                    </el-table-column>
                    <el-table-column
                        prop="actualFine"
                        label="实还罚息">
                    </el-table-column>
                    <el-table-column
                        prop="payCompound"
                        label="应还复利">
                    </el-table-column>
                    <el-table-column
                        prop="actualCompound"
                        label="实还复利">
                    </el-table-column>
                    <el-table-column
                        prop="payBankFine"
                        label="应还银行罚息">
                    </el-table-column>
                    <el-table-column
                        prop="actualBankFine"
                        label="实还银行罚息">
                    </el-table-column>
                    <el-table-column
                        prop="payBankCompound"
                        label="应还银行复利">
                    </el-table-column>
                    <el-table-column
                        prop="actualBankCompound"
                        label="实还银行复利">
                    </el-table-column>
                    <el-table-column
                        prop="ddPayFine"
                        label="应还代垫罚息">
                    </el-table-column>
                    <el-table-column
                        prop="ddActualFine"
                        label="实还代垫罚息">
                    </el-table-column>
                    <el-table-column
                        prop="ddPayCompound"
                        label="应还代垫复利">
                    </el-table-column>
                    <el-table-column
                        prop="ddActualCompound"
                        label="实还代垫复利">
                    </el-table-column>
                    <el-table-column
                        prop="payAmount"
                        label="应还费用">
                    </el-table-column>
                    <el-table-column
                        prop="actualAmount"
                        label="实还费用">
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
    calculateDatail: {
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
    console.log(this.calculateDatail, "detaildata");
    let queryData = {
      loanNo: this.calculateDatail.loanNo,
      relateId: this.calculateDatail.relateId
    };
    this.recoverPayTrail(queryData);
  },
  methods: {
    // 批量单笔明细
    recoverPayTrail(res, current) {
        res = res || {};
        current = current || 1;
        let url = counterDealApi.recoverPayTrail + "?current=" + current + "&size=30";
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
      this.$emit("close_calculate");
    },
    jump(pageNum) { // 分页
    let queryData = {
      loanNo: this.calculateDatail.loanNo,
      relateId: this.calculateDatail.relateId
    };
    let current = pageNum;
    this.recoverPayTrail(queryData, current);
    }
  },
  components: {
    pagination
  }
};
</script>
