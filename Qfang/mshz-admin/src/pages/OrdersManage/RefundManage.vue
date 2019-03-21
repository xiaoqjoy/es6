<template>
  <section class="house-box">
    <header class="house-header">
      <div class="tab-pane">
          <el-menu class="el-menu-demo" :default-active="refundStatus" mode="horizontal" active-text-color="#008842" @select="handleToggleRefundStatus">
            <el-menu-item index="REFUND_WAIT,BACKSTAGE">待退款（后台）</el-menu-item>
            <el-menu-item index="REFUND_WAIT,USER_ON_LINE">待退款（在线）</el-menu-item>
            <el-menu-item index="REFUND_FINISH">已退款</el-menu-item>
          </el-menu>
        <div class="house-add">
          <el-button v-if="checkPermission('REFUND_MANAGER')" type="success" size="mini" @click="handleExport">导出</el-button>
        </div>
      </div>
      <div class="filter-form-box">
        <el-form :inline="true" class="filter-form" size="mini">
          <el-form-item label="订单状态：">
            <el-select class="order-status" v-model="orderStatus" placeholder="订单状态" size="mini" @change="handleOrderStatusChange">
              <el-option label="全部" value=""></el-option>
              <el-option label="已取消" value="CANCEL"></el-option>
              <el-option label="已退房" value="CHECK_OUT"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单完成日期：">
            <el-date-picker class="date-range" v-model="orderFinishTime" type="daterange" size="mini" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <slot v-if="refundStatus === 'REFUND_FINISH'">
            <el-form-item label="退款日期：">
              <el-date-picker class="date-range" v-model="refundTime" type="daterange" size="mini" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </slot>
          <el-form-item>
            <el-input class="search-key" placeholder="住客／手机／管家／订单号" v-model="keyword" clearable size="mini" />
          </el-form-item>
          <el-form-item>
            <el-button type="success" size="mini" @click="handlePageChange(1)">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </header>
    <section class="house-list" v-loading="loading">
      <el-table :data="refundList" border stripe header-align="center" ref="multipleTable" size="small" height="100%" cell-class-name="default-color" class="table-body" @row-click="handleRow">
        <el-table-column prop="orderNo" label="订单号" min-width="140" align="center" />
        <el-table-column prop="custName" label="住客" min-width="80" align="center" />
        <el-table-column prop="orderChannelDesc" label="渠道" min-width="100" align="center" />
        <el-table-column prop="payChannelDesc" label="支付方式" min-width="80" align="center" />
        <el-table-column prop="orderAmount" label="订单金额" min-width="80" align="center" />
        <el-table-column prop="deposit" label="押金" min-width="80" align="center" />
        <el-table-column prop="refundMoney" label="退款金额" min-width="80" align="center" />
        <el-table-column prop="refundWayDesc" label="退款方式" min-width="100" align="center">
          <template slot-scope="scope">
            {{(scope.row.refundWay === 'ON_LINE' ? scope.row.payChannelDesc : '') + scope.row.refundWayDesc}}
          </template>
        </el-table-column>

        <!-- wait -->
        <slot v-if="refundStatus !== 'REFUND_FINISH'">
          <el-table-column label="退款备注" min-width="100" align="center">
            <template slot-scope="scope">
              <el-tooltip placement="bottom-start">
                <div slot="content">{{scope.row.refundRemark}}</div>
                <div class="text-ellips">{{scope.row.refundRemark}}</div>
              </el-tooltip>
            </template>
          </el-table-column>
        </slot>

        <el-table-column label="状态" min-width="100" align="center">
          <template slot-scope="scope">
            {{scope.row.orderStatusDesc}}
          </template>
        </el-table-column>
        <el-table-column label="管家" min-width="100" align="center">
          <template slot-scope="scope">
            {{scope.row.manager}}
          </template>
        </el-table-column>

        <!-- finish -->
        <slot v-if="refundStatus === 'REFUND_FINISH'">
          <el-table-column label="财务备注" min-width="100" align="center">
            <template slot-scope="scope">
              <el-tooltip :content="scope.row.financeRemark" placement="bottom">
                <div class="text-ellips">{{scope.row.financeRemark}}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="操作人" min-width="100" align="center">
            <template slot-scope="scope">
              {{scope.row.checkOperator}}
            </template>
          </el-table-column>
          <el-table-column label="退款日期" min-width="100" align="center">
            <template slot-scope="scope">
              {{scope.row.refundTime}}
            </template>
          </el-table-column>
        </slot>

        <slot v-else>
          <!-- wait -->
          <el-table-column label="订单完成日期" min-width="100" align="center">
            <template slot-scope="scope">
              {{scope.row.orderFinishTime}}
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="100" align="center">
            <template slot-scope="scope">
              <el-button v-if="checkPermission('REFUND_MANAGER')" type="text" size="small" @click.stop="handleEdit(scope.$index, scope.row)">退款</el-button>
            </template>
          </el-table-column>
        </slot>
      </el-table>
      <div class="house-pagination">
        <el-pagination class="page" @size-change="handleSizeChange" @current-change="handlePageChange" :current-page="currentPage" :page-sizes="[20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="recordCount">
        </el-pagination>
      </div>
    </section>

    <el-dialog v-if="refundDialogVisible" title="退款" :visible.sync="refundDialogVisible" :close-on-click-modal="false" width="950">
      <refund :orderInfo="orderInfo" v-on:toggleRefundDialog="toggleRefundDialog" />
    </el-dialog>

    <!-- 详情页弹窗 -->
    <order-detail v-if="orderDialogVisible" :detailVisible.sync="orderDialogVisible" @closeDetail="closeDetail" :orderNo="currentOrderNo" :orderChannelEnum="orderChannelEnum" :payChannelEnum="payChannelEnum" />

  </section>
</template>

<script>
import OrderDetail from '../../components/OrderForm/OrderDetail';
import Refund from './components/Refund';
import { handlePages } from '@/components/common/mixin';
export default {
  name: 'RefundManage',
  mixins: [handlePages],
  components: {
    OrderDetail,
    Refund
  },
  data() {
    return {
      loading: true,

      refundList: [], // 退款列表
      orderInfo: {},
      currentOrderNo: -1,
      refundStatus: 'REFUND_WAIT,BACKSTAGE',
      orderStatus: '',
      keyword: '',
      orderFinishTime: '',
      refundTime: '',
      refundDialogVisible: false,
      orderDialogVisible: false,

      // 订单状态枚举
      orderStateEnum: {},
      // 订单渠道枚举
      orderChannelEnum: {},
      payChannelEnum: {}, // 支付方式
      refundWayEnum: {}

    };
  },
  mounted() {
    // 获取 所有的枚举状态
    this.$axios.get('security/order/getAllEnum')
      .then((res) => {
        const { result } = res.data;
        this.orderStateEnum = result.OrderStateEnum;
        this.orderChannelEnum = result.OrderChannelEnum;
        this.payChannelEnum = result.PayChannelEnum;
        this.refundWayEnum = result.RefundWayEnum;
      })
      .catch((err) => {
        this.$message.error(err.message || '服务器异常');
      });

    this.requestData();
  },
  methods: {
    requestData() {
      this.loading = true;
      this.$axios
        .get('security/order/refund/queryRefundList', {
          params: this.getParams()
        })
        .then(res => {
          this.loading = false;
          if (res.data.status === 'C0000') {
            let { result } = res.data;
            this.currentPage = result.currentPage;
            this.pageCount = result.pageCount;
            this.recordCount = result.recordCount;
            this.refundList = result.items;
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
      let refundStatus = this.refundStatus.split(',');
      let orderFinishTime = this.orderFinishTime || [];
      let refundTime = this.refundTime || [];
      return {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        refundStatus: refundStatus[0],
        source: refundStatus[1] || '',
        orderStatus: this.orderStatus,
        keyword: this.keyword,
        orderFinishTimeStart: orderFinishTime[0] || '',
        orderFinishTimeEnd: orderFinishTime[1] || '',
        refundTimeStart: refundTime[0] || '',
        refundTimeEnd: refundTime[1] || ''
      };
    },
    handleExport() {
      // convert the object to url string
      let params = this.getParams();
      let p = [];
      for (let key in params) {
        p.push(key + '=' + params[key]);
      }
      location.href = '/mshz-mgr/security/order/refund/exportExcel?' + p.join('&');
    },
    handleToggleRefundStatus(key, keyPath) {
      this.refundStatus = key;
      this.handlePageChange(1);
    },
    handleOrderStatusChange(key, keyPath) {
      this.orderStatus = key;
      this.handlePageChange(1);
    },

    // 打开订单详情
    handleRow(row, event, column) {
      this.currentOrderNo = row.orderNo;
      this.orderDialogVisible = true;
    },

    // 打开退款弹窗
    handleEdit(index, row) {
      this.orderInfo = row;
      this.refundDialogVisible = true;
    },

    toggleRefundDialog(reload) {
      this.refundDialogVisible = false;

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

.filter-form-box>>>.el-range-editor.el-input__inner {
  padding: 3px;
}
.filter-form-box>>>.el-input__icon.el-range__icon.el-icon-date {
  display: none;
}
.filter-form-box>>>.el-input__icon.el-range__close-icon {
  width: 18px;
}
.filter-form-box>>>.el-date-editor .el-range__close-icon {
  width: 16px;
}
.text-ellips {
  width: 100px;
}
</style>
