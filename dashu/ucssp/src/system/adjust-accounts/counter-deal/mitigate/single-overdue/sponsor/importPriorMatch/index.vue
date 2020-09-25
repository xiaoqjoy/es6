<style lang="less" rel="stylesheet/less" scoped>
// 公共样式
.margin_r_60 {
  margin-right: 60px;
}
// 去掉element表格的默认全选按钮
/deep/ th .el-checkbox {
      display: none;
}
// 弹窗总box
.drop_loan {
  .dialog-mask {
    z-index: 1000;
  }
  .dialog-box {
    // height: 780px;
    width: 1200px;
    padding-bottom: 10px;
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
      height: auto;
      // 中间内容区域
      .form__block {
        height: auto;
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
    // 输入框和下拉框部分样式
    .b_content {
      text-align: left;
      height: 40px;
      // margin-left: 28px;
      // margin-top: 20px;
      // 输入框和下拉框170*40
      .select_7 {
        width: 170px;
        height: 40px;
        margin-right: 15px;
      }
      // 输入框和下拉框172*40
      .select_72 {
        width: 160px;
        height: 40px;
        margin-right: 15px;
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
      .span {
        position: absolute;
      }
      .effective {
        left: 25.3%;
        top: 8%;
        font-size: 12px;
        color: #bbbbbb;
        letter-spacing: 1.09px;
      }
      .transverse {
        left: 35.1%;
        top: 12.5%;
        color: #bbbbbb;
      }
    }
    // 表格
    .table_box {
        width: 100%;
        height: 530px;
        margin: 20px 0;
        overflow: auto;
    }
  }
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask" style="z-index: 1001"></div>
    <div class="dialog-box">
      <!-- 弹窗上部分 -->
      <div class="dialog-box__top">
        <h5 class="title_type">引入</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <!-- 弹窗下部分 -->
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <!-- 内容区 -->
            <div class="form__block bg__white border__radius-5" >
              <!-- 输入框和下拉框 -->
              <div class="b_content">
                <el-input class="select_72" v-model="loanNo" placeholder="出账编号"></el-input>
                <el-input class="select_72" v-model="customerName" placeholder="客户姓名"></el-input>
                <div class="referEmptyDiv"><el-button class="b_button query button" @click="refer()">查询</el-button></div>
                <div class="referEmptyDiv"><el-button class="b_button empty button" @click="empty()">清空</el-button></div>
              </div>
              <!-- 带全选的表格 -->
              <div class="table_box">
                  <el-table
                  :default-sort = "{prop: 'date', order: 'descending'}"
                  :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
                  ref="multipleTable"
                  :data="for_"
                  tooltip-effect="dark"
                  style="width: 100%; border: 1px solid #E9E9E9;"
                  @select-all="clickSelectAll"
                  @select="select"
                  @row-click="rowCheck">
                    <el-table-column
                        type="selection">
                    </el-table-column>
                    <el-table-column
                        prop="loanNo"
                        label="出账编号">
                    </el-table-column>
                    <el-table-column
                        prop="customerName"
                        label="客户姓名">
                    </el-table-column>
                    <el-table-column
                        prop="payCorp"
                        label="应还本金">
                    </el-table-column>
                    <el-table-column
                        prop="payInte"
                        label="应还利息">
                    </el-table-column>
                        <el-table-column
                        prop="payTotalAmount"
                        label="应还费用">
                    </el-table-column>
                    <el-table-column
                        prop="payFine"
                        label="应还罚息">
                    </el-table-column>
                    <el-table-column
                        prop="payCompound"
                        label="应还复利">
                    </el-table-column>
                    <el-table-column
                        prop="ddPayFine"
                        label="应还代垫罚息">
                    </el-table-column>
                    <el-table-column
                        prop="ddPayCompound"
                        label="应还代垫复利">
                    </el-table-column>
                  </el-table>
              </div>
              <!-- 分页条 -->
              <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
            </div>
            <div class="form__bottom">
              <el-button class="add finis button h" type="primary" @click="finish">确认</el-button>
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
  data() {
    return {
      selectedData: "", // 单选选择的那条数据
      loanNo: '',
      customerName: '',
      user_name: '', // 客户姓名
      charge_Off_num: '', // 出账编号
      repayment_num: '', // 还款期次
      value1: '', // 应还日期
      form: {
        guarantee_name: "",
        certificate_type_code: "",
        contact_num: "",
        house_area_num: ""
      },
      for_: [], // 渲染数据列表
      pageConfig: {
        account: 5, // 总条数
        pageSize: 5, // 一页有几条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  mounted() {
    // this.reductionPlans();
  },
  methods: {
     // 一般还款查询总单接口
    reductionPlans(res = {}, current = 1) {
      let url = counterDealApi.reductionPlans + "?current=" + current + "&size=10";
      this.$MyFetch.post(url, res)
      .then((data = {}) => {
          if (data.records.length < 1) {
              this.$message("查询结果为空！");
          }
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
    // 分页
    jump(pageNum) {
      let queryData = {
        loanNo: this.loanNo,
        customerName: this.customerName
      };
      this.reductionPlans(queryData, pageNum);
    },
    // 清空按钮
    empty() {
      this.loanNo = '';
      this.customerName = '';
    },
    // 查询按钮
    refer() {
      if ((!this.loanNo || this.customerName)) {
        this.$message("请输入查询条件！");
        return;
      }
      let queryData = {
        loanNo: this.loanNo,
        customerName: this.customerName
      };
      this.reductionPlans(queryData);
    },
    // 关闭弹窗
    close() {
      this.$emit("clsoe_import");
    },
    // 保存
    finish() {
      if (!this.selectedData) {
        this.$message("请选择一条引入数据!");
        return;
      }
      this.$emit("getImportData", this.selectedData);
      this.$emit("clsoe_import");
    },
    clickSelectAll(selection, row) {
      if (selection.length > 0) {
        selection.splice(1, selection.length);
      }
      console.log("12", selection);
      // 单选选中的数据
      this.selectedData = selection[0];
    },
    select(selection, row) {
     if (selection.length === 0) {
            this.selectedData = '';
        } else if (selection.length === 1) {
            this.selectedData = row;
        } else {
            selection.shift();
            this.rowCheck(row);
        }
    },
    rowCheck(row, column, e) {
      console.log(row);
      if (!this.selectedData) {
        this.$refs.multipleTable.toggleRowSelection(row);
        this.selectedData = row;
      } else if (this.selectedData && row.loanNo === this.selectedData.loanNo) {
        this.$refs.multipleTable.clearSelection();
        this.selectedData = '';
      } else {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(row);
        this.selectedData = row;
      }
    }
  },
  components: {
    pagination
  }
};
</script>
