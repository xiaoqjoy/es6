<template>
  <section class="house-box">
    <header class="house-header">
      <div class="filter-form-box pdt-20">
        <el-form :inline="true"
          class="filter-form"
          size="mini">
          <el-form-item>
            <el-select v-model="bookingStatus"
              placeholder="定金状态"
              size="mini"
              @change="handleBookingStatusChange">
              <el-option label="定金状态"
                value=""></el-option>
              <el-option label="已支付"
                value="PAID"></el-option>
              <el-option label="已扣除"
                value="DEDUCTED"></el-option>
              <el-option label="已抵扣"
                value="CREDITED"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input class="search-key"
              placeholder="输入定金编号搜索"
              v-model="bookingNo"
              clearable
              size="mini" />
          </el-form-item>
          <el-form-item>
            <el-input class="search-key"
              placeholder="输入小区／楼栋／房号搜索"
              v-model="searchKey"
              clearable
              size="mini" />
          </el-form-item>
          <el-form-item>
            <el-date-picker class="date-range"
              v-model="paymentTime"
              type="daterange"
              size="mini"
              range-separator="至"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              start-placeholder="收款起始日期"
              end-placeholder="收款结束日期" />
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
      <el-table :data="bookingNoList"
        border
        stripe
        header-align="center"
        ref="multipleTable"
        size="small"
        height="100%"
        cell-class-name="default-color"
        @row-click="handleRow">
        <el-table-column prop="bookingNo"
          label="定金编号"
          min-width="110"
          align="center" />
        <el-table-column label="房间"
          min-width="140"
          align="center">
          <template slot-scope="scope">
            {{scope.row.gardenName}}，{{scope.row.building}}，{{scope.row.premisesNumber}}，{{scope.row.roomChamber}}
          </template>
        </el-table-column>
        <el-table-column prop="customerName"
          label="预定人"
          min-width="60"
          align="center" />
        <el-table-column prop="money"
          label="账单金额"
          min-width="60"
          align="center">
          <template slot-scope="scope">
            {{Math.abs(scope.row.money)}}
          </template>
        </el-table-column>
        <el-table-column prop="paymentTimeDesc"
          label="收款时间"
          min-width="60"
          align="center" />
        <el-table-column v-if="userInfo.manager"
          prop="managerName"
          label="管家"
          min-width="60"
          align="center" />
        <el-table-column prop="bookingStatusDesc"
          label="预定状态"
          min-width="60"
          align="center" />
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

    <el-dialog v-if="BookingDialogVisible"
      :title="'定金：' + currentBookingNo"
      :visible.sync="BookingDialogVisible"
      :close-on-click-modal="false"
      width="950px">
      <booking-detail @toggleDialog="toggleDialog"
        :bookingNo="currentBookingNo" />
    </el-dialog>

  </section>
</template>

<script>
import { mapState } from 'vuex';
import BookingDetail from './components/BookingDetail';
import { handlePages } from '@/components/common/mixin';
export default {
  name: 'Booking',
  mixins: [handlePages],
  components: {
    BookingDetail
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

      bookingNoList: [], // 定金列表
      bookingInfo: {},
      bookingStatus: null,
      bookingNo: null,
      paymentTime: [],
      searchKey: null,
      currentBookingNo: '',
      BookingDialogVisible: false
    };
  },
  mounted() {
    this.requestData();
  },
  methods: {
    requestData() {
      this.loading = true;
      this.$axios
        .get('security/longorder/booking/queryBookingList', {
          params: this.getParams()
        })
        .then(res => {
          this.loading = false;
          if (res.data.status === 'C0000') {
            let { result } = res.data;
            this.currentPage = result.currentPage;
            this.pageCount = result.pageCount;
            this.recordCount = result.recordCount;
            this.bookingNoList = result.items;
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
      let [paymentTimeBegin, paymentTimeEnd] = this.paymentTime || [];
      return {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        bookingStatus: this.bookingStatus || undefined,
        bookingNo: this.bookingNo || undefined,
        searchKey: this.searchKey || undefined,
        paymentTimeBegin,
        paymentTimeEnd
      };
    },

    handleBookingStatusChange(key, keyPath) {
      this.bookingStatus = key;
      this.handlePageChange(1);
    },

    // 打开详情
    handleRow(row, event, column) {
      this.currentBookingNo = row.bookingNo;
      this.BookingDialogVisible = true;
    },

    toggleDialog(reload) {
      this.BookingDialogVisible = false;
      // 是否需要重载列表
      reload && this.requestData();
    }
  }
};
</script>


<style scoped>
.search-box-top {
  line-height: 50px;
}
.el-menu-demo {
  padding: 0 170px 0 20px;
}

.default-color {
  background-color: #333;
}
/* 类型 */
.type-item {
  border-width: 1px;
  border-style: solid;
  border-color: #008842;
  border-radius: 3px;
  color: #008842;
}
.state-green {
  color: #008842;
}
.state-black {
  color: #000;
}
.room-number {
  font-size: 14px;
  font-weight: 600;
  color: #008842;
}
</style>
