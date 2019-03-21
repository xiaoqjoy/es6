<template>
  <section class="bgceee long-rent-dialog">
    <div class="model-border">
      <header class="model-header">预定信息</header>
      <div class="pd-20">
        <div class="bdb-ddd">
          <el-row :gutter="10">
            <el-col :offset="1"
              :span="10">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">预定客户</span>：
                </span>{{data.customerName}}
              </p>
            </el-col>
            <el-col :span="10">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">{{data.certTypeDesc}}</span>：
                </span>{{data.certNo}}
              </p>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :offset="1"
              :span="10">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">联系方式</span>：
                </span>{{data.customerPhone}}
              </p>
            </el-col>
            <el-col :span="10">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">起租日期</span>：
                </span>{{data.rentDateDesc}}
              </p>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :offset="1"
              :span="10">
              <p class="content-item-twelve">
                <span class="content-item-label-auto c-9">
                  <span class="content-item-label-justify-four">预定时间</span>：
                </span>{{data.createTimeDesc}}
              </p>
            </el-col>
          </el-row>
        </div>
        <div class="pd-ten">
          <!-- <div class="clearfix"
            v-for="(item, index) in data.pictures"
            :key="index">
            <img :src="item.url.replace('{size}', '160x120')">
          </div> -->
          <div v-if="data.pictures.length > 0"
            class="clearfix pdv-ten">
            <viewer :options="options"
              :images="data.pictures"
              @inited="inited"
              class="viewer"
              ref="viewer">
              <template slot-scope="scope">
                <div v-for="(imgItem, index) in data.pictures"
                  :key="index"
                  class="img-item-box">
                  <img :src="imgItem.url.replace('{size}', '160x120')"
                    :data-source="imgItem.url.replace('{size}', '800x600')+'?tailor=false'"
                    class="img-content">
                  <p v-if="scope.images.length> 0"
                    class="p-title">{{scope.images[index].pictureTypeDesc}}</p>
                </div>
              </template>
            </viewer>
          </div>
          <div v-else
            class="noimg">
            暂无图片
          </div>
        </div>

      </div>
    </div>

    <div class="model-border">
      <header class="model-header">定金账单</header>
      <div class="pd-20">
        <div class="bd-ddd">
          <el-table :data="arr"
            style="width: 100%"
            size="mini">
            <el-table-column label="账单周期"
              prop="bookingBillCycle"
              :min-width="100"
              align="center">
            </el-table-column>

            <el-table-column prop="bookingBillTypeDesc"
              label="账单类型"
              :min-width="100"
              align="center">
            </el-table-column>

            <el-table-column prop="money"
              label="账单金额"
              :min-width="100"
              align="center">
            </el-table-column>

            <el-table-column label="收款日期"
              prop="paymentTimeDesc"
              align="center">
            </el-table-column>

            <el-table-column prop="bookingStatusDesc"
              label="账单状态"
              align="center"
              :min-width="80">
            </el-table-column>

            <el-table-column label="操作"
              align="center"
              :min-width="100">
              <template slot-scope="scope">
                <el-button type="text"
                  v-if="scope.row.bookingStatus === 'UNPAY'"
                  @click="handleRental"
                  size="mini">催款</el-button>
                <el-button type="text"
                  @click="handleLook"
                  size="mini">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <el-dialog title="发送账单"
      append-to-body
      top="20vh"
      :visible.sync='moneyDialog'
      :close-on-click-modal="false"
      width="600px">
      <press-money v-if="moneyDialog"
        :msg="msg"
        :bookingNo="roomData.bookingNo"
        @closeDialog="closeDialog">
      </press-money>
    </el-dialog>

    <el-dialog title="租客账单"
      top="30vh"
      append-to-body
      :visible.sync='rentBillDialog'
      :close-on-click-modal="false"
      width="800px">
      <rent-bill v-if="rentBillDialog"
        :bill="bill"
        :manager="manager"
        @closeDialog="closeDialog">
      </rent-bill>
    </el-dialog>

  </section>
</template>
<script>
import pressMoney from './pressMoney';
import RentBill from './RentBill';

export default {
  name: 'ReserveInfo',
  props: ['roomData'],
  components: {
    pressMoney,
    RentBill
  },
  data() {
    return {
      data: {
        pictures: []
      },
      arr: [],
      moneyDialog: false,
      rentBillDialog: false,
      msg: '',
      bill: '',
      manager: '',

      options: {
        url: 'data-source',
        title: false,
        zIndex: 99999
      }
    };
  },
  methods: {
    closeDialog() {
      this.moneyDialog = false;
      this.rentBillDialog = false;
    },
    // 催款
    handleRental() {
      this.$axios.get('/security/longorder/booking/queryReminderMsgInfo',
        {
          params: { bookingNo: this.roomData.bookingNo }
        }
      ).then((res) => {
        if (res.data.result && res.data.status === 'C0000') {
          this.msg = res.data.result;
          this.moneyDialog = true;
        } else {
          this.$message.warning(res.data.message);
        }
      }).catch(err => {
        this.$message.error(err.message || '服务异常');
        console.log(err);
      });
    },
    // 查看
    handleLook() {
      this.$axios.get('/security/longorder/booking/queryBookingInfoByBookingNo',
        {
          params: { bookingNo: this.roomData.bookingNo }
        }
      ).then((res) => {
        if (res.data.result && res.data.status === 'C0000') {
          this.rentBillDialog = true;
          this.bill = res.data.result;
          this.manager = res.data.result.bookingManager;
        } else {
          this.$message.warning(res.data.message);
        }
      }).catch(err => {
        this.$message.error(err.message || '服务异常');
        console.log(err);
      });
    },
    requestData() {
      return this.$axios.get('/security/longorder/booking/queryBookingInfoByBookingNo',
        {
          params: { bookingNo: this.roomData.bookingNo }
        }
      ).then((res) => {
        const arrData = [];
        if (res.data.result && res.data.status === 'C0000') {
          this.data = res.data.result;
          arrData.push(res.data.result);
          this.arr = arrData;
        } else {
          this.data = {};
        }
      }).catch(err => {
        console.log(err);
      });
    },
    inited(viewer) {
      this.$viewer = viewer;
    },
    show() {
      this.$viewer.show();
    }
  },
  created() {
    this.requestData();
  }
};
</script>
<style scoped>
</style>
