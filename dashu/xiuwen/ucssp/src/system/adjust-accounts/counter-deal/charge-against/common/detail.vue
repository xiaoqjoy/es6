
<style lang="less" rel="stylesheet/less" scoped>
/deep/ .el-table--scrollable-x .el-table__body-wrapper{
  max-height: 550px;
  overflow: auto;
}
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
        overflow: hidden;
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
        <h5 class="title_type">{{title}}</h5>
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
                  :data="for_"
                  tooltip-effect="dark"
                  style="width: 100%; border: 1px solid #E9E9E9;"
                  @selection-change="handleSelectionChange">
                    <el-table-column
                        style="height: 60px"
                        prop="trans_serial_no"
                        label="总单号">
                    </el-table-column>
                    <el-table-column
                        prop="bill_no"
                        style="height: 60px"
                        label="单据号">
                    </el-table-column>
                    <el-table-column
                        prop="sterm"
                        label="期次">
                    </el-table-column>
                        <el-table-column
                        prop="bill_type"
                        label="单据类型">
                    </el-table-column>
                    <el-table-column
                        prop="bill_status"
                        label="单据状态">
                    </el-table-column>
                        <el-table-column
                        prop="pay_date"
                        label="应还日期">
                    </el-table-column>
                    <el-table-column
                        prop="acc_date"
                        label="记账日期">
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
                        width="100"
                        prop="pay_bank_fine"
                        label="应还银行罚息">
                    </el-table-column>
                    <el-table-column
                        width="100"
                        prop="actual_bank_fine"
                        label="实还银行罚息">
                    </el-table-column>
                    <el-table-column
                        width="100"
                        prop="pay_bank_compound"
                        label="应还银行复利">
                    </el-table-column>
                    <el-table-column
                        width="100"
                        prop="actual_bank_compound"
                        label="实还银行复利">
                    </el-table-column>
                    <el-table-column
                        width="100"
                        prop="dd_pay_fine"
                        label="应还代垫罚息">
                    </el-table-column>
                    <el-table-column
                        width="100"
                        prop="dd_actual_fine"
                        label="实还代垫罚息">
                    </el-table-column>
                    <el-table-column
                        width="100"
                        prop="dd_pay_compound"
                        label="应还代垫复利">
                    </el-table-column>
                    <el-table-column
                        width="100"
                        prop="dd_actual_compound"
                        label="实还代垫复利">
                    </el-table-column>
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
                    <el-table-column
                        prop="acc_user"
                        label="制单人">
                    </el-table-column>
                  </el-table>
              </div>
              <div class="page_box" style="margin-top:'20px'">
                <!-- 分页条 -->
                <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import pagination from "@components/pagination"; // 分页条
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
import "@common/css/dialog";
export default {
  // 父组件传来的值
  props: ["tetail_data", "title"],
  data() {
    return {
      form: {
        guarantee_name: "",
        certificate_type_code: "",
        contact_num: "",
        house_area_num: ""
      },
      for_: [], // 渲染数据列表
      pageConfig: {
          account: 1, // 总条数
          pageSize: 1, // 当前多少条数据
          currentPage: 1, // 当前页
          showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  components: {
    pagination
  },
  methods: {
    // 选择框选中
    handleSelectionChange (data) {
        console.log(data);
    },
    // 关闭弹窗
    close() {
      this.$emit("clsoe_windowDetail");
    },
    detail(res, current) {
      // 明细
      res = res || {eq: {trans_serial_no: this.tetail_data}};
      current = current || 1;
      this.$MyFetch.post(counterDealApi.BackBillList + '?current=' + current + '&size=10', res)
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
      console.log(err);
      this.$error(err.message);
      });
    },
    jump(pageNum) { // 分页
        this.pageConfig.currentPage = pageNum;
        var queryDate = {eq: {trans_serial_no: this.tetail_data}};
        this.detail(queryDate, this.pageConfig.currentPage);
    }
  },
  mounted() {
    this.detail();
  }
};
</script>
