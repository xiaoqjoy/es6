<style lang="less" rel="stylesheet/less" scoped>
// 中间部分
.content {
  height: 780px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  overflow: auto;
  // 输入框和下拉框部分样式
  .b_content {
    margin-top: 30px;
    text-align: left;
    // height: 60px;
    margin-left: 28px;
    // 输入框和下拉框172*40
    .select_72 {
      width: 160px;
      height: 40px;
      margin-right: 15px;
      margin-bottom: 20px;
    }
    .select_240 {
      width: 240px;
      height: 40px;
      margin-right: 15px;
      margin-bottom: 20px;
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
  .table_box {
    // height: 680px;
    // margin-top: 30px;
    margin-left: 20px;
    margin-right: 20px;
  }
  // 表格总体样式
  .tables {
    overflow-y: auto;
    overflow-x: hidden;
    width: 97%;
    margin: 0px auto;
    border: 1px solid #d0d0d0;
    margin-top: 21px;
    border-radius: 4px;
  }
  // 去掉element表格的默认全选按钮
  .tables /deep/ th .el-checkbox {
    display: none;
  }
  .pagination {
    margin-bottom: 20px;
    margin-top: 40px;
    margin-right: 30px;
  }
  .referEmptyDiv {
    display: inline-flex;
    margin-left: 20px;
    margin-bottom: 20px;
  }
}
</style>

<template>
  <div>
    <div class="content">
      <div class="b_content">
        <el-input class="select_72" v-model="loanNo" placeholder="出账编号" clearable></el-input>
        <el-input class="select_72" v-model="customerName" placeholder="姓名" clearable></el-input>
        <el-input class="select_72" v-model="certID" placeholder="身份证号码" clearable></el-input>
        <el-input class="select_72" v-model="phoneNo" placeholder="手机号" clearable></el-input>
        <div class="referEmptyDiv"><el-button class="b_button query button" @click="refer">查询</el-button></div>
        <div class="referEmptyDiv"><el-button class="b_button empty button" @click="empty">清空</el-button></div>
      </div>
      <div class="table_box">
        <el-table
          v-loading="loading"
          :data="data"
          class="common__table"
          header-cell-class-name="table-head"
          row-class-name="table-tr">
          <el-table-column
            prop="loanNo"
            label="出账编号">
          </el-table-column>
          <el-table-column
            prop="customerName"
            label="姓名">
          </el-table-column>
          <el-table-column
            prop="certID"
            label="身份证号">
          </el-table-column>
          <el-table-column
            prop="phoneNo"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="subAccount"
            label="专属对公子账户">
            <template slot-scope="scope">
              {{ scope.row.subAccount ||  待申请 }}
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="distributionSubAcc(scope.row)">子账户申请</el-button>
              <el-button type="text" size="small" @click="record6Mon(scope.row)">子账户流水（近6月）</el-button>
              <el-button type="text" size="small" @click="recordHistory(scope.row)">子账户流水（历史）</el-button>
              <el-button type="text" size="small" @click="webSendSubAccountMessage(scope.row)">发送短信</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <record :isHistory="isHistory" :row="row" v-if="isRecord" @close="close"></record>
    </div>
  </div>
</template>

<script>
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server";
import record from "./record";
export default {
  name: 'yqzl',
  data() {
    return {
      loanNo: '',
      customerName: '',
      certID: '',
      phoneNo: '',
      data: [],
      loading: false,
      isRecord: false,
      isHistory: false,
      row: {}
    };
  },
  methods: {
    close() {
      this.isRecord = false;
    },
    refer() {
      if (!(this.loanNo || this.customerName || this.certID || this.phoneNo)) {
        this.$message("请输入至少一项查询条件!");
      } else {
        this.getData();
      }
    },
    empty() {
      this.loanNo = '';
      this.customerName = '';
      this.certID = '';
      this.phoneNo = '';
    },
    _distributionSubAcc() {
      this.$MyFetch.post(counterDealApi.distributionSubAcc, {
        loanNo: this.loanNo
      })
      .then((data) => {
        this.getData();
        this.$message.success("已分配");
      }).catch((err) => {
        this.$error(err.message);
      });
    },
    distributionSubAcc(row) {
      this.$MyFetch.post(counterDealApi.webCheckApplySubAccount + `?loanNo=${this.loanNo}`)
        .then((data) => {
          this._distributionSubAcc();
        }).catch((err) => {
          this.$msgbox.confirm(err.message, "", {
            confirmButtonText: "确认",
            cancelButtonText: '取消',
            showCancelButton: true,
            type: 'info',
            showClose: false,
            dangerouslyUseHTMLString: true
          })
          .then(() => {
            this._distributionSubAcc();
          })
          .catch(() => {});
        });
    },
    record6Mon(row) {
      this.row = row;
      this.isHistory = false;
      this.isRecord = true;
    },
    recordHistory(row) {
      this.row = row;
      this.isHistory = true;
      this.isRecord = true;
    },
    webSendSubAccountMessage(row) {
      this.$MyFetch.post(counterDealApi.webSendSubAccountMessage + `?loanNo=${this.loanNo}`).then((data) => {
        this.$message.success("已发送，请提示客户将在2-10分钟后收到。");
      }).catch((err) => {
        this.$error(err.message);
      });
    },
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.reload(pageNum);
    },
    getData() {
      this.loading = true;
      this.$MyFetch.post(counterDealApi.webQuerySubAccountList, {
        loanNo: this.loanNo,
        customerName: this.customerName,
        certID: this.certID,
        phoneNo: this.phoneNo
      })
      .then((data = {}) => {
        this.loading = false;
        this.data = data;
      })
      .catch((err) => {
        this.loading = false;
        this.$error(err.message);
      });
    }
  },
  components: {
    record
  }
};
</script>
