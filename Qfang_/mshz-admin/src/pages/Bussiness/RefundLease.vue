<template>
  <section class="house-box">
    <header class="house-header">
      <div class="filter-form-box">
        <el-form :inline="true"
          class="filter-form"
          size="mini">
          <el-form-item>
            <el-select v-model="refundLeaseStatus"
              placeholder="退租状态"
              size="mini"
              @change="handleBillStatusChange">
              <el-option label="退租状态"
                value=""></el-option>
              <el-option label="待支付"
                value="WAIT_PAY"></el-option>
              <el-option label="待处理"
                value="WAIT_CHECK"></el-option>
              <el-option label="已确认"
                value="ALREADY_CONFIRM"></el-option>
              <!-- <el-option label="转租退租"
                value="TRANSFORM_RENT"></el-option> -->
              <el-option label="未到账"
                value="NOT_REFUND"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input class="search-key"
              placeholder="输入退租编号搜索"
              v-model="refundLeaseNo"
              clearable
              size="mini" />
          </el-form-item>
          <el-form-item>
            <el-input class="search-key"
              placeholder="输入小区／楼栋／房号搜索"
              v-model="keyWord"
              clearable
              size="mini" />
          </el-form-item>
          <el-form-item>
            <el-date-picker class="date-range"
              v-model="refundLeaseDate"
              type="daterange"
              size="mini"
              range-separator="至"
              start-placeholder="退租起始日期"
              end-placeholder="退租结束日期"
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
      <el-table :data="refundLeaseList"
        border
        stripe
        header-align="center"
        ref="multipleTable"
        size="small"
        height="100%"
        cell-class-name="default-color"
        @row-click="handleRow">
        <el-table-column prop="refundLeaseNo"
          label="退租编号"
          min-width="110"
          align="center" />
        <el-table-column label="房间"
          min-width="140"
          align="center">
          <template slot-scope="scope">
            {{scope.row.gardenName}}<br>{{scope.row.buildingName}} {{scope.row.roomNumber}} {{scope.row.bedRoomNum}}
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
            {{scope.row.startTime}}至{{scope.row.endTime}}
          </template>
        </el-table-column>
        <el-table-column label="方式"
          min-width="60"
          align="center">
          <template slot-scope="scope">
            {{scope.row.sumMoney >= 0 ? '应收' : '应退'}}
          </template>
        </el-table-column>
        <el-table-column prop="sumMoney"
          label="金额"
          min-width="60"
          align="center">
          <template slot-scope="scope">
            {{Math.abs(scope.row.sumMoney)}}
          </template>
        </el-table-column>
        <el-table-column prop="time"
          label="退租日期"
          min-width="60"
          align="center" />

        <el-table-column v-if="userInfo.manager"
          prop="managerName"
          label="管家"
          min-width="60"
          align="center" />
        <el-table-column prop="statusDesc"
          label="状态"
          min-width="60"
          align="center" />

        <el-table-column v-if="checkPermission('LONG_REFUND_CONFIRM') || checkPermission('LONG_REFUND_NOTIFY')"
          label="操作"
          min-width="60"
          align="center">
          <template slot-scope="scope">
            <el-button v-if="checkPermission('LONG_REFUND_CONFIRM') && scope.row.status !== 'ALREADY_CONFIRM' && scope.row.status !== 'WAIT_PAY'"
              @click.stop="handleRow(scope.row)"
              type="text"
              size="small">{{scope.row.sumMoney >= 0 ? '确认到账' : '确认退款'}}</el-button>
            <el-button v-if="checkPermission('LONG_REFUND_CONFIRM') && scope.row.status === 'WAIT_CHECK'"
              @click.stop="handleRow(scope.row)"
              type="text"
              size="small">{{scope.row.sumMoney >= 0 ? '未到账' : '不退款'}}</el-button>
            <!-- 当前登录人是管家，账单是“应收”且租客未支付才显示“催款”按钮 -->
            <el-button @click.stop="handleNotify(scope.row)"
              v-if="checkPermission('LONG_REFUND_NOTIFY') && scope.row.sumMoney > 0 && scope.row.status === 'WAIT_PAY'"
              type="text"
              size="small">催款</el-button>
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

    <el-dialog v-if="refundLeaseDialogVisible"
      :title="'退租：' + currentRefundLeaseNo"
      :visible.sync="refundLeaseDialogVisible"
      :close-on-click-modal="false"
      width="950px">
      <refund-lease-detail @toggleBillingDialog="toggleBillingDialog"
        :refundLeaseNo="currentRefundLeaseNo" />
    </el-dialog>

    <el-dialog title="发送账单"
      append-to-body
      top="20vh"
      :visible.sync="rentalDialogVisible"
      :close-on-click-modal="false"
      width="600px">
      <send-notify v-if="rentalDialogVisible"
        @closeRentalDialog="closeRentalDialog"
        :messagesInfo="messagesInfo"
        :refundLeaseNo="currentRefundLeaseNo">
      </send-notify>
    </el-dialog>

  </section>
</template>

<script>
import { mapState } from 'vuex';
import RefundLeaseDetail from './components/RefundLeaseDetail';
import SendNotify from './components/SendNotify';
import { handlePages } from '@/components/common/mixin';
export default {
  name: 'RefundLease',
  mixins: [handlePages],
  components: {
    RefundLeaseDetail,
    SendNotify
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  data() {
    return {
      loading: true,
      messagesInfo: '',

      refundLeaseList: [], // 账单列表
      refundLeaseInfo: {},
      refundLeaseStatus: null,
      refundLeaseNo: null,
      refundLeaseDate: [],
      keyWord: null,

      currentRefundLeaseNo: '',
      refundLeaseDialogVisible: false,
      rentalDialogVisible: false
    };
  },
  mounted() {
    this.requestData();
  },
  methods: {
    requestData() {
      this.loading = true;
      this.$axios
        .get('security/refundlease/queryByPage', {
          params: this.getParams()
        })
        .then(res => {
          this.loading = false;
          if (res.data.status === 'C0000') {
            let { result } = res.data;
            this.currentPage = result.currentPage;
            this.pageCount = result.pageCount;
            this.recordCount = result.recordCount;
            this.refundLeaseList = result.items;
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
      let [refundLeaseDateStart, refundLeaseDateEnd] = this.refundLeaseDate || [];
      return {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        refundLeaseStatus: this.refundLeaseStatus || undefined,
        refundLeaseNo: this.refundLeaseNo || undefined,
        keyWord: this.keyWord || undefined,
        refundLeaseDateStart,
        refundLeaseDateEnd
      };
    },

    handleBillStatusChange(key, keyPath) {
      this.refundLeaseStatus = key;
      this.handlePageChange(1);
    },

    // 打开账单详情
    handleRow(row, event, column) {
      this.currentRefundLeaseNo = row.refundLeaseNo;
      this.refundLeaseDialogVisible = true;
    },

    handleNotify(row) {
      this.currentRefundLeaseNo = row.refundLeaseNo;
      this.$axios.get(
        '/security/refundlease/billRent', {
          params: {
            refundLeaseNo: this.currentRefundLeaseNo
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.messagesInfo = res.data.result;
          this.rentalDialogVisible = true;
        } else {
          this.$message.warning(res.data.message);
        }
      }).catch(err => {
        // debugger;
        this.message.warning(err.message || '服务异常');
        console.log(err);
      });
    },

    closeRentalDialog() {
      this.rentalDialogVisible = false;
    },

    toggleBillingDialog(reload) {
      this.refundLeaseDialogVisible = false;

      // 是否需要重载列表
      reload && this.requestData();
    }
  }
};
</script>
<style scoped>
.el-menu--horizontal {
  border-width: 0;
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

.filter-form-box .el-form-item--mini.el-form-item {
  margin-bottom: 10px !important;
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
