<template>
  <section class="bgceee long-rent-dialog">
    <div class="model-border">
      <header class="model-header">当期账单</header>
      <div class="pd-20">
        <div class="bd-ddd">
          <el-table :data="currentBill"
            style="width: 100%"
            size="mini">
            <!-- 5-300字 -->
            <el-table-column label="账单周期"
              :min-width="100"
              align="center">
              <template slot-scope="scope">
                <slot v-if="scope.row.billTypeEnum === 'FIRST_BILL'">
                  {{scope.row.rentMoney}}元
                  <span class="c-9 font-12">(租金)</span>
                  <span v-if="scope.row.depositMoney"
                    class="font-12">/{{scope.row.depositMoney}}元
                    <span class="c-9 "> (押金)</span>
                  </span>
                </slot>
                <slot v-else>
                  <span>{{scope.row.cycleDate}}</span>
                </slot>

              </template>
            </el-table-column>

            <el-table-column prop="orderTypeDesc"
              label="账单类型"
              :min-width="100"
              align="center">
            </el-table-column>

            <el-table-column prop="totalMoney"
              label="账单金额"
              :min-width="100"
              align="center">
            </el-table-column>

            <el-table-column label="最后付款日期"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.dateDesc}}</span>
              </template>
            </el-table-column>

            <el-table-column prop="billSeneschalEnumDesc"
              label="账单状态"
              align="center"
              :min-width="80">
            </el-table-column>

            <el-table-column label="操作"
              align="center"
              :min-width="100">
              <template slot-scope="scope">
                <!-- <el-button type="text"
                  :disabled="scope.row.billTypeEnum === 'FIRST_BILL' || !scope.row.meterReading || (scope.row.meterReading&&scope.$index !== 0)"
                  @click="handleMeter(scope.row)"
                  size="mini">抄表</el-button> -->
                <!-- <span class="line"></span> -->
                <!-- EXTRA_BILL_MESSAGE 生活账单催款 -->
                <el-button type="text"
                  v-if="checkPermission('RENT_BILL_MESSAGE')"
                  :disabled="!scope.row.totalMoney"
                  @click="handleRental(scope.row)"
                  size="mini">催款</el-button>
                <!-- <span class="line"></span> -->
                <slot v-if="scope.row.orderType === 'RENT_BILL'">
                  <el-button type="text"
                    @click="handleCollect(scope.row, scope.row.orderType)"
                    size="mini">查看</el-button>
                </slot>
                <slot v-else>
                  <el-button type="text"
                    @click="handleLiveOrder(scope.row, scope.row.orderType)"
                    size="mini">查看</el-button>
                </slot>

              </template>

            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="model-border">
      <header class="model-header">历史账单</header>
      <div class="pd-20">
        <div class="bd-ddd">
          <el-table :data="historyBill"
            style="width: 100%"
            size="mini">
            <!-- 5-300字 -->
            <el-table-column label="账单周期"
              :min-width="100"
              align="center">
              <template slot-scope="scope">
                <slot v-if="scope.row.billTypeEnum === 'FIRST_BILL'">
                  {{scope.row.rentMoney}}元
                  <span class="c-9 font-12">(租金)</span>/{{scope.row.depositMoney}}元
                  <span class="c-9 font-12">(押金)</span>
                </slot>
                <slot v-else>
                  <span>{{scope.row.cycleDate}}</span>
                </slot>
              </template>
            </el-table-column>

            <el-table-column prop="orderTypeDesc"
              label="账单类型"
              :min-width="100"
              align="center">
            </el-table-column>

            <el-table-column prop="totalMoney"
              label="账单金额"
              :min-width="100"
              align="center">
            </el-table-column>

            <el-table-column label="支付日期"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.dateDesc}}</span>
              </template>
            </el-table-column>

            <el-table-column prop="billSeneschalEnumDesc"
              label="账单状态"
              align="center"
              :min-width="80">
            </el-table-column>

            <el-table-column label="操作"
              align="center"
              :min-width="100">
              <template slot-scope="scope">
                <slot v-if="scope.row.orderType === 'RENT_BILL'">
                  <el-button type="text"
                    @click="handleCollect(scope.row, scope.row.orderType)"
                    size="mini">查看</el-button>
                </slot>
                <slot v-else>
                  <el-button type="text"
                    @click="handleLiveOrder(scope.row, scope.row.orderType)"
                    size="mini">查看</el-button>
                </slot>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <el-dialog title="租客账单"
      append-to-body
      :visible.sync='rentBillDialog'
      :close-on-click-modal="false"
      width="950px">
      <long-rent-bill v-if="rentBillDialog"
        :billType="billType"
        :billNo="billNo"
        :source="'houseDetail'"
        :propsLeaseType="propsLeaseType"
        @closeDialog="closeDialog">
      </long-rent-bill>
    </el-dialog>

    <el-dialog title="生活账单"
      append-to-body
      :visible.sync='extraBillDialog'
      :close-on-click-modal="false"
      width="950px">
      <extra-bill v-if="extraBillDialog"
        :billNo="billNo"
        :extraBillDialog.sync="extraBillDialog">
      </extra-bill>
    </el-dialog>

    <el-dialog title="抄表"
      append-to-body
      :visible.sync='meterDialog'
      :close-on-click-modal="false"
      width="950px">
      <meter-reading v-if="meterDialog"
        @closeDialog="closeDialog"
        @refreshData="requestCurrentBill"
        :billNo="billNo"
        :roomData="roomData"
        :orderNo="orderNo">
      </meter-reading>
    </el-dialog>

    <el-dialog title="发送账单"
      append-to-body
      top="20vh"
      :visible.sync='rentalDialog'
      :close-on-click-modal="false"
      width="600px">
      <speed-rental v-if="rentalDialog"
        @closeDialog="closeDialog"
        :source="'houseDetail'"
        :messagesInfo="messagesInfo"
        :orderNo="orderNo"
        :requestUrl="requestUrl"
        :billNo="billNo">
      </speed-rental>
    </el-dialog>

    <el-dialog title="租客账单"
      top="30vh"
      append-to-body
      :visible.sync='rentFirstBillDialog'
      :close-on-click-modal="false"
      width="800px">
      <rent-bill v-if="rentFirstBillDialog"
        :bill="bill"
        :manager="manager"
        @closeDialog="closeDialog">
      </rent-bill>
    </el-dialog>

  </section>
</template>
<script>
import MeterReading from './MeterReading'; // 抄表
import LongRentBill from './LongRentBill';
import SpeedRental from './SpeedRental';
import extraBill from './ExtraBill';
import RentBill from './RentBill';
export default {
  name: 'BillList',
  data() {
    return {
      rentBillDialog: false, // 账单弹框
      extraBillDialog: false,
      rentFirstBillDialog: false,
      meterDialog: false, // 抄表弹框
      rentalDialog: false,
      currentBill: [],
      historyBill: [],
      billNo: '',
      billType: '',
      messagesInfo: '',
      requestUrl: undefined // 催信息接口
    };
  },
  props: {
    orderNo: {
      type: String,
      default: ''
    },
    roomData: {
      type: Object,
      default: () => ({})
    },
    propsLeaseType: {
      // 用于区分长短租
      type: String,
      default: ''
    },
    unpaid: {
      type: Boolean
    }
  },
  created() {
    this.requestCurrentBill();
    this.requestHistoryBill();
  },
  beforeDestroy() {
    this.rentBillDialog = false; // 账单弹框
    this.meterDialog = false; // 抄表弹框
    this.rentalDialog = false;
  },
  methods: {
    // 请求当前订单
    // 'DD180531160401'
    requestCurrentBill() {
      return this.$axios.get('/security/longOrder/selectCurrentUncollectedBill',
        {
          params: { id: this.orderNo }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.currentBill = res.data.result;
          if (this.currentBill.length > 0) {
            this.$emit('update:unpaid', true);
          } else {
            this.$emit('update:unpaid', false);
          }
        } else {
          this.currentBill = [];
          this.$emit('update:unpaid', false);
          // this.$message.warning(res.data.message);
        }
      }).catch(err => {
        console.log(err);
      });
    },

    // 请求历史订单
    requestHistoryBill() {
      return this.$axios.get('/security/longOrder/queryHistoryBillByOrderNo',
        {
          params: { orderNo: this.orderNo }
        }
      ).then((res) => {
        // console.log(res.data.result.items);
        if (res.data.result && res.data.status === 'C0000') {
          // this.historyBill.push(res.data.result);
          this.historyBill = res.data.result.items;
        } else {
          this.historyBill = [];
          // this.$message.warning(res.data.message);
        }
      }).catch(err => {
        console.log(err);
      });
    },

    handleMeter(data) {
      this.meterDialog = true;
      this.billNo = data.billNo;
    },

    handleCollect(data, type) {
      this.rentBillDialog = true;
      this.billNo = data.billNo;
      this.billType = type;
    },

    closeDialog(data) {
      if (data === 'LongRentBill') {
        this.rentBillDialog = false;
      } else if (data === 'MeterReading') {
        this.meterDialog = false;
      } else if (data === 'speedrental') {
        this.rentalDialog = false;
      }
    },
    // 催款
    handleRental(data) {
      let url;
      // 生活账单催租
      if (data.orderType === 'EXTRA_BILL') {
        url = '/security/extraBill/billRent';
        this.requestUrl = '/security/extraBill/sendRentMessage';
      } else {
        // 租金账单催租
        url = '/security/longOrder/billRent';
        this.requestUrl = '/security/longOrder/sendRentMessage';
      }
      this.billNo = data.billNo;
      // this.orderNo = data.orderNo;
      this.$axios.get(
        url, {
          params: {
            keyword: this.billNo,
            type: 1
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.messagesInfo = res.data.result;
          this.rentalDialog = true;
        } else {
          this.$message.warning(res.data.message);
        }
      }).catch(err => {
        this.message.warning(err.message || '服务异常');
        console.log(err);
      });
    },

    // 生活账单
    handleLiveOrder(data) {
      if (data.orderType === 'BOOKING_BILL') {   // 打开预定信息页的弹窗
        this.$axios.get('/security/longorder/booking/queryBookingInfoByBookingNo',
          {
            params: { bookingNo: data.billNo }
          }
        ).then((res) => {
          const { result } = res.data;
          if (result && res.data.status === 'C0000') {
            this.rentFirstBillDialog = true;
            this.bill = result;
            this.manager = result.bookingManager.managerName;
          }
        }).catch(err => {
          console.log(err);
        });
      } else {    // 打开原先的弹窗
        this.extraBillDialog = true;
        this.billNo = data.billNo;
      }
    }

    // closeAllDialog() {
    //   this.rentBillDialog = false; // 账单弹框
    //   this.meterDialog = false; // 抄表弹框
    //   this.rentalDialog = false;
    //   return true;
    // }
    // refreshData() {
    //   this.requestCurrentBill();
    //   this.requestHistoryBill();
    // }
  },
  components: {
    LongRentBill,
    MeterReading,
    SpeedRental,
    RentBill,
    extraBill
  }
};
</script>
<style scoped>
.line {
  display: inline-block;
  width: 1px;
  height: 15px;
  background-color: #cccccc;
}
.long-rent-dialog {
  height: 550px;
  overflow: hidden;
  overflow-y: auto;
  box-sizing: border-box;
}
</style>
