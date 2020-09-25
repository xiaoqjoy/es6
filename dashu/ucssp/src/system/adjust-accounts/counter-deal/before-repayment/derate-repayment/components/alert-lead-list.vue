<template>
  <div class="lead-list">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 弹窗上部分 -->
      <div class="dialog-box__top">
        <h5 class="title_type">引入</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <!-- 弹窗内容区 -->
      <div class="dialog-box__content">
        <div class="serach_row">
          <el-form :inline="true" ref="checkForm" label-width="100px" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="queryData.customerName" placeholder="客户姓名" maxlength="50"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="queryData.loanNo" placeholder="出账编号" maxlength="50"></el-input>
            </el-form-item>
            <el-form-item>
              <el-date-picker
                v-model.trim="queryData.finishDate"
                placeholder="提前还款日期"
                value-format="yyyy-MM-dd"
                clearable
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button class="b_button query button" @click="search(1)">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button class="b_button empty button" @click="reset">清除</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table_box">
          <el-table
            :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
            ref="singleTable"
            max-height="625"
            :data="dataList"
            highlight-current-row
            tooltip-effect="dark"
            style="width: 100%; border: 1px solid #E9E9E9;"
            @current-change="handleCurrentChange"
          >
            <el-table-column label="选择" width="50" center>
              <template slot-scope="scope">
                <el-radio
                  class="radio"
                  :label="scope.row.loanNo"
                  v-model="checked"
                  @change.native="getCurrentRow(scope.row)"
                >&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="loanNo" width="180" label="出账编号"></el-table-column>
            <el-table-column prop="customerName" width="100" label="客户姓名"></el-table-column>
            <el-table-column prop="businessSum" width="100" label="放款金额"></el-table-column>
            <el-table-column prop="lineIdName" width="200" label="放款机构">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top" v-if="scope.row.lineIdName">
                  <p class="ellipsis">{{scope.row.lineIdName}}</p>
                  <div slot="reference">
                    <p class="yincan ellipsis">{{scope.row.lineIdName}}</p>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="certNo" width="100" label="身份证号码"></el-table-column>
            <el-table-column prop="putoutDate" label="放款日期"></el-table-column>
            <el-table-column prop="loanTerm" label="贷款期限"></el-table-column>
            <el-table-column prop="finishDate" label="提前还款日期"></el-table-column>
          </el-table>
        </div>
        <div class="dialog-box__footer">
          <div class="footerBtn">
            <el-button class="t_button affirm_t button" @click="confirm">确定</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { prepaymentBreak } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
export default {
  data() {
    return {
      queryData: {
        customerName: "",
        loanNo: "",
        finishDate: ""
      },
      selectdata: null,
      checked: null,
      dataList: []
    };
  },
  methods: {
    search(current) {
      if (
        !this.queryData.customerName &&
        !this.queryData.loanNo &&
        !this.queryData.finishDate
      ) {
        this.$message("请至少输入一项查询条件");
        return "";
      }
      current = current || 1;
      let url =
        prepaymentBreak.queryRefLoan;
      this.$MyFetch
        .post(url, this.queryData)
        .then((data = {}) => {
          if (data.records.length < 1) {
            this.$message("查询结果为空！");
          }
          this.dataList = data.records;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    jump(pageNum) {
      this.search(pageNum);
    },
    reset() {
      this.queryData = {
        customerName: "",
        loanNo: "",
        finishDate: ""
      };
    },
    handleCurrentChange(val) {
      this.selectdata = val;
      this.checked = val.loanNo;
      console.log("selectdata", this.selectdata);
    },
    close() {
      this.$emit("leadclose");
    },
    confirm() {
      if (!this.selectdata) {
        this.$message("请选择需要引入的数据");
        return "";
      }
      this.$MyFetch
        .post(prepaymentBreak.queryRefDetail, {
          loanNo: this.selectdata.loanNo
        })
        .then((data = {}) => {
          if (data.length < 1) {
            this.$message("查询结果为空！");
          } else {
            this.$emit("leadcomfirn", data);
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.lead-list {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .dialog-mask {
    z-index: 1001;
  }
  .dialog-box {
    width: 1230px;
    background: #ffffff;
    font-size: 0;
    transform: none;
    position: absolute;
    left: 0;
    top: 50px;
    right: 0;
    margin: auto;
    margin-bottom: 80px;
    .dialog-box__top {
      margin: 0px;
    }
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
      margin-left: 18px;
    }
    // 清空单独样式
    .empty {
      background: #ffffff;
      color: #538bf1;
      border: 1px solid #538bf1;
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
    }
    .serach_row {
      margin-top: 20px;
    }
    // 表格
    .table_box {
      width: 100%;
      height: 130px;
      margin-top: 21px;
      overflow: auto;
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
        .affirm_t {
          background: #538bf1;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
