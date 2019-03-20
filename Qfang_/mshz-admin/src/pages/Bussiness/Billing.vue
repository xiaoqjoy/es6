<template>
  <section class="house-box">
    <header class="house-header">
      <div class="filter-form-box">
        <el-form :inline="true"
          class="filter-form"
          size="mini">
          <el-form-item>
            <el-select v-model="billFinanceEnum"
              placeholder="账单状态"
              size="mini"
              @change="handleBillStatusChange">
              <el-option label="账单状态"
                value=""></el-option>
              <el-option label="待处理"
                value="PENDING"></el-option>
              <el-option label="已确认"
                value="CONFIRMED"></el-option>
              <el-option label="未到账"
                value="UNCOLLECTED"></el-option>
              <el-option label="已关闭"
                value="ALREADY_CLOSE_BILL"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input class="search-key"
              placeholder="输入账单编号搜索"
              v-model="billNo"
              clearable
              size="mini" />
          </el-form-item>
          <el-form-item>
            <el-input class="search-key"
              placeholder="输入小区／楼栋／房号搜索"
              v-model="roomInfo"
              clearable
              size="mini" />
          </el-form-item>
          <el-form-item>
            <el-date-picker class="date-range"
              v-model="receiptDate"
              type="daterange"
              size="mini"
              range-separator="至"
              start-placeholder="收款起始日期"
              end-placeholder="收款结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd" />
          </el-form-item>
          <el-form-item>
            <el-button type="success"
              size="mini"
              @click="handlePageChange(1)">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </header>
    <section class="house-list"
      v-loading="loading">
      <el-table :data="billingList"
        header-align="center"
        border
        stripe
        ref="multipleTable"
        size="small"
        height="100%"
        cell-class-name="default-color"
        @row-click="handleRow">
        <el-table-column prop="billNo"
          label="账单编号"
          min-width="100"
          align="center" />
        <el-table-column label="房间"
          min-width="140"
          align="center">
          <template slot-scope="scope">
            {{scope.row.gardenName}} <br>{{scope.row.buildingName}} {{scope.row.roomNumber}} {{scope.row.bedRoomNum}}
          </template>
        </el-table-column>
        <el-table-column prop="renterName"
          label="租客"
          min-width="60"
          align="center" />

        <el-table-column label="租期"
          min-width="115"
          align="center">
          <template slot-scope="scope">
            {{scope.row.startTimeDesc}}至{{scope.row.endTimeDesc}}
          </template>
        </el-table-column>

        <el-table-column prop="sumMoney"
          label="账单金额"
          min-width="60"
          align="center" />
        <el-table-column prop="payDateDesc"
          label="收款时间"
          min-width="60"
          align="center" />

        <el-table-column v-if="userInfo.manager"
          prop="managerName"
          label="管家"
          min-width="60"
          align="center" />
        <el-table-column prop="financeStatusEnumDesc"
          label="状态"
          min-width="60"
          align="center" />

        <el-table-column v-if="checkPermission('LONG_BILL_CONFIRM')"
          label="操作"
          width="80"
          align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.financeStatusEnum === 'PENDING' || (scope.row.financeStatusEnum === 'UNCOLLECTED' && scope.row.seneschalEnum === 'ALREADY_COLLECTING_RENT' )"
              type="text"
              size="small"
              @click.stop="handleRow(scope.row)">{{scope.row.sumMoney >= 0 ?'确认到账':'确认退款'}}</el-button>
            <br>
            <el-button v-if="scope.row.financeStatusEnum === 'PENDING'"
              type="text"
              size="small"
              @click.stop="handleRow(scope.row)">未到账</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="house-pagination">
        <el-pagination class="page"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
          :current-page.sync="currentPage"
          :page-sizes="[20, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="recordCount">
        </el-pagination>
      </div>
    </section>

    <!-- 详情页弹窗 -->

    <el-dialog v-if="billingDialogVisible"
      :title="'账单：' + currentBillNo"
      :visible.sync="billingDialogVisible"
      :close-on-click-modal="false"
      width="950px">
      <billing-detail @toggleBillingDialog="toggleBillingDialog"
        :billNo="currentBillNo" />
    </el-dialog>

  </section>
</template>

<script>
import { mapState } from 'vuex';
import BillingDetail from './components/BillingDetail';
import { handlePages } from '@/components/common/mixin';
export default {
  name: 'Billing',
  mixins: [handlePages],
  components: {
    BillingDetail
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  data() {
    return {
      loading: true,

      billingList: [], // 账单列表
      billInfo: {},
      billFinanceEnum: null,
      billNo: null,
      roomInfo: null,
      orderFinishTime: '',
      receiptDate: [],

      currentBillNo: '',
      billingDialogVisible: false
    };
  },
  mounted() {
    this.requestData();
  },
  methods: {
    requestData() {
      this.loading = true;
      this.$axios
        .get('security/bill/queryBillPage', {
          params: this.getParams()
        })
        .then(res => {
          this.loading = false;
          if (res.data.status === 'C0000') {
            let { result } = res.data;
            // this.currentPage = result.currentPage;
            this.pageCount = result.pageCount;
            this.recordCount = result.recordCount;
            this.billingList = result.items;
          } else {
            this.$message({
              type: 'warning',
              message: res.data.message
            });
          }
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
          this.$message.error(err.message || '服务器异常');
        });
    },
    getParams() {
      let [receiptStartDate, receiptEndDate] = this.receiptDate || [];
      return {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        billFinanceEnum: this.billFinanceEnum || undefined,
        billNo: this.billNo || undefined,
        roomInfo: this.roomInfo || undefined,
        receiptStartDate,
        receiptEndDate
      };
    },

    handleBillStatusChange(key, keyPath) {
      this.billFinanceEnum = key;
      this.handlePageChange(1);
    },

    // 打开账单详情
    handleRow(row, event, column) {
      this.currentBillNo = row.billNo;
      this.billingDialogVisible = true;
    },

    toggleBillingDialog(reload) {
      this.billingDialogVisible = false;

      // 是否需要重载列表
      reload && this.requestData();
    },
    closeDetail() {
      this.orderDialogVisible = false;
    }
  }
};
</script>
<style scoped>
.el-menu--horizontal {
  border-width: 0;
}

.filter-form-box .el-form-item--mini.el-form-item {
  margin-bottom: 10px !important;
}

.filter-form {
  padding-top: 10px;
}
.search-key {
  width: 177px;
}

.order-status {
  width: 85px;
}
.date-range {
  width: 210px !important;
}


.filter-form-box >>> .el-range-editor.el-input__inner {
  padding: 3px;
}
.filter-form-box >>> .el-input__icon.el-range__icon.el-icon-date {
  display: none;
}
.filter-form-box >>> .el-input__icon.el-range__close-icon {
  width: 18px;
}
.filter-form-box >>> .el-date-editor .el-range__close-icon {
  width: 16px;
}
.text-ellips {
  width: 100px;
}
</style>
