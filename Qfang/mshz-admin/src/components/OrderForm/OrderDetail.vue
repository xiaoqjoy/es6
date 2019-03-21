<template>
  <section class="add-orders">
    <el-dialog :title="'订单编号-'+ orderNo"
      :visible="true"
      :before-close="handleClose"
      width="950px"
      :close-on-click-modal="false">
      <el-tabs v-model="activeName"
        @tab-click="tabActive">
        <el-tab-pane label="订单详情"
          name="order">
          <div class="dialog-box bgceee">
            <el-form ref="orderDetailform"
              :model="detailData"
              size="mini"
              label-position="right"
              label-width="90px">
              <div class="model-border">
                <header class="model-header">
                  <el-row>
                    <el-col :span="12">
                      <span>订单信息</span>
                    </el-col>
                    <el-col :span="12">
                      <span class="float-r"
                        style="color:red">{{detailData.orderStateDesc}}</span>
                    </el-col>
                  </el-row>
                </header>
                <div class="pdt-20">
                  <el-row :gutter="10">
                    <el-col :span="8">
                      <el-form-item label="订单号：">
                        <el-input :disabled="isEdit"
                          v-model="orderNo"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="订单来源：">
                        <el-input v-model="detailData.orderChannelDesc"
                          :disabled="isEdit"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="9">
                      <el-form-item v-if="(/民宿|线下/g).test(detailData.orderChannelDesc)?false:true"
                        :label="detailData.orderChannelDesc+'订单号：'"
                        label-width="100px">
                        <el-input v-model="detailData.channelNo"
                          :disabled="isEdit"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="model-border">
                <header class="model-header">房间信息</header>
                <div class="pdt-20">
                  <el-row>
                    <el-col :span="5">
                      <el-form-item label="房间：">
                        <el-input v-model="detailData.roomNo"
                          :disabled="isEdit"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7"
                      label-width="60px">
                      <el-form-item label="日期：">
                        <el-input style="width:190px"
                          :placeholder="detailData.startTime+'至'+detailData.endTime"
                          :disabled="isEdit"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="5">
                      <el-form-item label="天数：">
                        <el-input-number :disabled="isEdit"
                          v-model="detailData.bookedDays"
                          :min="1"
                          :max="90"
                          label="天数"></el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6"
                      class="pdl-20">
                      <el-form-item label="房费：">
                        <el-input :disabled="isEdit"
                          placeholder="请输入"
                          v-model.number="detailData.roomRate">
                          <template slot="append">元</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="model-border">
                <header class="model-header">住客信息</header>
                <div class="pdt-20 pdr-20">
                  <el-row :gutter="20"
                    v-for="(custModel, index) in detailData.custModelList"
                    :key="index">
                    <el-col :span="8">
                      <el-form-item label="姓名：">
                        <el-input :disabled="isEdit"
                          v-model="custModel.custName"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="身份证：">
                        <el-input :disabled="isEdit"
                          v-model="custModel.custIdCard"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="手机：">
                        <el-input :disabled="isEdit"
                          v-model="custModel.custPhone"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="model-border">
                <header class="model-header">收款信息</header>
                <div class="pdt-20">
                  <div>
                    <el-row :gutter="20"
                      v-if="fundsModel.recordState!=='DELETED'"
                      v-for="(fundsModel, index) in detailData.fundsModelList"
                      :key="index">
                      <el-col :span="10">
                        <el-form-item label-width="30px"
                          label=" ">
                          <el-input :disabled="isEdit"
                            placeholder="请输入收款金额类型"
                            v-model="fundsModel.itemName">
                            <template v-if="fundsModel.remark"
                              slot="suffix">({{fundsModel.remark}})</template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label-width="60px"
                          label="金额：">
                          <el-input :disabled="isEdit"
                            placeholder="请输入收款金额"
                            v-model.number="fundsModel.itemMoney">
                            <template slot="append">元</template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="支付渠道："
                          v-if="fundsModel.itemMoney>0||fundsModel.payType==='INCOME'">
                          <el-select :disabled="isEdit"
                            placeholder="请选择支付渠道"
                            v-model="fundsModel.payChannelDesc">
                            <el-option :label="item"
                              :value="item"
                              v-for="(item, index) in fundsModel.payChannel"
                              :key="index"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>

                  <div class="funds-info border-t pdr-20">
                    <p class="funds-info-item">
                      订单金额：
                      <span class="font-red font-w">{{detailData.orderPrice}}</span> 元
                    </p>
                    <p class="funds-info-item">
                      押金：
                      <span class="font-red font-w">{{myDeposit===0?'无':myDeposit}}</span> {{myDeposit===0?'':'元'}}
                    </p>
                    <p class="funds-info-item">
                      已收金额：
                      <span class="font-red">{{detailData.amountReceived}}</span> 元
                    </p>
                    <p v-if="detailData.orderState==='CHECKED_OUT'||detailData.orderState==='EARLY_CHECKED_OUT'||detailData.orderState==='CANCELL_REFUND'"
                      class="funds-info-item">
                      退款金额：
                      <span class="font-red">{{detailData.refund}}</span>元
                      <span v-if="detailData.refund > 0"
                        class="font-red">({{detailData.refundStateDesc}})</span>
                    </p>
                    <div v-else
                      class="funds-info-item">
                      <!-- <span>{{detailData.amountReceived-detailData.orderPrice-myDeposit>=0?'应退金额：':'未收金额：'}}</span> -->
                      <!-- <span>{{this.refund >=0?'应退金额：':'未收金额：'}}</span> -->
                      <p v-if="detailData.amountReceived-detailData.orderPrice-myDeposit>=0">
                        应退金额：
                        <span class="font-red">{{Math.abs(detailData.amountReceived-detailData.orderPrice)}}</span> 元
                      </p>
                      <p v-else>
                        未收金额：
                        <span class="font-red">{{Math.abs(detailData.amountReceived-detailData.orderPrice-myDeposit)}}</span> 元
                      </p>
                      <!-- <span class="font-red">{{Math.abs(this.refund)}}</span> -->
                    </div>
                  </div>

                  <div class="funds-info pdr-20 pdb-20"
                    v-if="detailData.orderState==='CHECKED_OUT'||detailData.orderState==='EARLY_CHECKED_OUT'||detailData.orderState==='CANCELL_REFUND'">
                    <p v-if="detailData.orderState !== 'EARLY_CHECKED_OUT' && detailData.orderState !== 'CHECKED_OUT'"
                      class="funds-info-item">
                      订单取消原因：
                      <span v-if="detailData.cancelReasonDesc.trim().length > 0"
                        class="font-red font-w">{{detailData.cancelReasonDesc}}</span>
                      <span v-else
                        class="font-red font-w">无</span>
                    </p>
                    <p class="funds-info-item">
                      退款方式：
                      <span class="font-red">{{detailData.refundWayDesc}}</span>
                    </p>
                    <p class="funds-info-item">
                      退款备注：
                      <span class="font-red">{{detailData.refundRemark.length>0?detailData.refundRemark:'无'}}</span>
                    </p>
                  </div>

                </div>
              </div>
              <div class="model-border">
                <header class="model-header">订单备注
                  <span class="font-default">(300字内)</span>
                </header>
                <div class="detail-remark">
                  <el-input :disabled="isEdit"
                    type="textarea"
                    :maxlength="300"
                    :autosize="{ minRows: 2}"
                    v-model="detailData.remark">
                  </el-input>
                </div>
              </div>
            </el-form>
          </div>

          <div class="dialog-footer"
            v-if="(this.detailData.orderStateDesc==='已预订'||this.detailData.orderStateDesc==='已入住') && (!overdue)">

            <el-button v-if="this.detailData.orderStateDesc==='已预订' && !isExpiration"
              type="primary"
              size="mini"
              @click="checkinConfirm">办理入住</el-button>
            <el-button v-if="this.detailData.orderStateDesc==='已入住'"
              type="primary"
              size="mini"
              @click="openCheckout">办理退房</el-button>
            <el-button v-if="checkPermission('ORDER_EDIT') && !isExpiration"
              size="mini"
              @click="openEditOrder">修改订单</el-button>
            <el-button v-if="checkPermission('ORDER_CANCEL') && this.detailData.orderStateDesc==='已预订'"
              size="mini"
              @click="openCancelOrder">取消订单</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="日志"
          name="log">
          <order-log v-if="logVisible"
            :orderNo="orderNo"></order-log>
        </el-tab-pane>
      </el-tabs>

    </el-dialog>
    <edit-order v-if="editOrderVisible"
      @closeEditOrder="closeEditOrder"
      :detailData="detailData"
      :isMiddle="isMiddle"></edit-order>
    <cancel-order v-if="cancelOrderVisible"
      @closeCancelOrder="closeCancelOrder"
      :orderNo="orderNoCancel"></cancel-order>
    <checkout v-if="checkoutVisible"
      @closeCheckout="closeCheckout"
      :orderNo="orderNoCheckout"></checkout>
  </section>
</template>
<script>
import EditOrder from './EditOrder';
import CancelOrder from './CancelOrder';
import OrderLog from './OrderLog';
import Checkout from './Checkout';
export default {
  components: {
    EditOrder,
    CancelOrder,
    OrderLog,
    Checkout
  },
  props: ['orderNo', 'overdue'],
  data() {
    return {
      logVisible: false,
      checkinConfirmVisible: false,
      checkoutData: {},
      detailData: {},
      checkoutVisible: false,
      editOrderVisible: false,
      cancelOrderVisible: false,
      isEdit: true, // true为开启disabled
      payDeposit: true, // 是否已付押金
      num1: 1,
      isHandleSuccess: false,
      activeName: 'order',
      depositFlag: false,
      isExpiration: false, // 订单过时
      isMiddle: false

    };
  },
  mounted() {
    this.getOrderDetailData();
  },
  computed: {
    // 订单金额
    orderPrice: {
      get() {
        let allMoney = 0;
        if (this.detailData.fundsModelList) {
          this.detailData.fundsModelList.forEach((val, key) => {
            if (val.itemType !== 'DEPOSIT') {
              allMoney += val.itemMoney;
            }
          });
        }

        return allMoney;
      }
    },
    // 押金
    myDeposit: {
      get() {
        let deposit = 0;
        if (this.detailData.fundsModelList) {
          this.detailData.fundsModelList.forEach((val, key) => {
            if (val.itemType === 'DEPOSIT') {
              deposit = val.itemMoney;
              this.depositFlag = true;

              // if (val.payChannel === 'NONE') {
              //   this.payDeposit = false;
              // } else {
              //   this.payDeposit = true;
              // }
            }
          });
        }
        // console.log(this.payDeposit);
        return deposit;
      }
    },
    // 已收金额
    amountReceived: {
      // 已收金额调整，判断计算条件 val.payType !== 'EXPENDITURE' ==> val.payChannel !== 'NONE'
      get() {
        let allMoney = 0;
        if (this.detailData.fundsModelList) {
          this.detailData.fundsModelList.forEach((val, key) => {
            if (val.payChannel !== 'NONE') {
              allMoney += val.itemMoney;
            }
          });
        }
        return allMoney;
      }
    },
    // 大于0为退款 小于0为未收金额
    refund: {
      get() {
        return this.amountReceived - this.orderPrice - this.myDeposit;

        // // 如果押金付了
        // if (this.payDeposit) {
        //   // return this.detailData.amountReceived - this.orderPrice;
        //   return this.amountReceived - this.orderPrice;
        // } else {
        //   // 没付押金
        //   // return this.detailData.amountReceived - this.orderPrice - this.myDeposit;
        //   return this.amountReceived - this.orderPrice - this.myDeposit;
        // }
      }
    }

  },
  methods: {

    getOrderDetailData() {
      this.$axios.get('security/order/queryOrderDetail', { params: { orderNo: this.orderNo } })
        .then((res) => {
          if (res.data.status === 'C0000') {
            this.detailData = res.data.result;
            // 遍历收款信息
            this.detailData.fundsModelList.forEach((item) => {
              // 如是退款项（EXPENDITURE），则为负值
              if (item.payType === 'EXPENDITURE') {
                item.itemMoney = -Math.abs(item.itemMoney);
                item.disablePayChannel = true;
              }
              // 押金（DEPOSIT）
              if (item.itemType === 'DEPOSIT' && item.itemMoney === 0) {
                item.recordState = 'DELETED';
              }

              // 是否已过期
              let startTimeList = this.detailData.startTime.split('-');
              let endTimeList = this.detailData.endTime.split('-');
              let MSnowTime = new Date().getTime();
              let MSstartTime = (new Date(+startTimeList[0], (+startTimeList[1] - 1), +startTimeList[2], 14, 0, 0)).getTime();
              let MSLastTime = (new Date(+endTimeList[0], (+endTimeList[1] - 1), +endTimeList[2], 12, 0, 0)).getTime();
              // console.log(endTimeList, MSnowTime, MSLastTime);
              if (MSnowTime > MSLastTime) {
                this.isExpiration = true;
              } else {
                this.isExpiration = false;
              }
              if (MSnowTime > MSstartTime && MSnowTime < MSLastTime) {
                this.isMiddle = true;
                // console.log('------------超了，但还没到');
              } else {
                this.isMiddle = false;
              }
            });
          } else {
            this.$message({
              message: res.data.message,
              type: 'error'
            });
          }
        }).catch(err => {
          console.log(err);
          this.$message.error(err.message || '服务器异常');
        });
    },
    // 办理入住
    checkinConfirm() {
      // 如有未支付金额，不允许入住
      if (this.refund < 0) {
        this.$message({
          message: '收款信息包含:未支付项金额=' + Math.abs(this.refund) + '，不能办理入住，请先支付再办理入住！',
          type: 'error'
        });
        return;
      }
      let canCheckin = true;
      this.detailData.fundsModelList.forEach((item) => {
        if (item.itemMoney > 0 && item.payChannel === 'NONE') {
          // 如收款信息中，有未支付项，不允许办理入住
          canCheckin = false;
        }
      });
      if (canCheckin) {
        this.$confirm('确认办理入住？')
          .then(() => {
            this.checkin();
          });
      } else {
        this.$message({
          message: '收款信息包含未支付项，不能办理入住，请先支付再办理入住！',
          type: 'error'
        });
      }
    },
    checkin() {
      this.$axios.post('security/order/handleCheckIn', { orderNo: this.orderNo, startTime: this.detailData.startTime })
        .then((res) => {
          // console.log(res, '办理入住');
          if (res.data.status === 'C0000') {
            this.$message({
              message: '办理入住成功',
              type: 'success'
            });
            this.getOrderDetailData();
            // 刷新订单管理列表
            this.isHandleSuccess = true;
            // 刷新 房态页面
            let today = this.transferCouponValueTime((new Date()).toLocaleDateString(), 0);
            if (today === this.detailData.startTime) {
              this.$store.commit('handleRefreshHouseStatusS', true);
            }
            this.$store.commit('handleRefreshHouseStatusF', true);
          } else {
            this.$message({
              message: '办理入住失败,' + res.data.message,
              type: 'error'
            });
          }
        })
        .catch(() => {
          this.$message.error('办理入住失败');
        });
    },
    handleClose() {
      this.detailVisible = false;
      if (this.isHandleSuccess) {
        // 刷新订单管理列表
        this.$emit('closeDetail', 'success');
      } else {
        this.$emit('closeDetail');
      }
    },
    openEditOrder() {
      this.editOrderVisible = true;
    },

    closeEditOrder(s) {
      this.editOrderVisible = false;
      if (s === 'success') {
        this.isHandleSuccess = true;
        this.getOrderDetailData();
      }
    },
    openCancelOrder() {
      this.orderNoCancel = this.orderNo;
      this.cancelOrderVisible = true;
    },
    closeCancelOrder(s) {
      this.cancelOrderVisible = false;
      if (s === 'success') {
        this.isHandleSuccess = true;
        this.getOrderDetailData();
        // 刷新 房态页面
        let today = this.transferCouponValueTime((new Date()).toLocaleDateString(), 0);
        if (today === this.detailData.startTime) {
          this.$store.commit('handleRefreshHouseStatusS', true);
        }
        this.$store.commit('handleRefreshHouseStatusF', true);
      }
    },
    openCheckout() {
      this.orderNoCheckout = this.orderNo;
      this.checkoutVisible = true;
    },
    closeCheckout(s) {
      this.checkoutVisible = false;
      if (s === 'success') {
        this.isHandleSuccess = true;
        this.getOrderDetailData();
        // 刷新 房态页面
        let today = this.transferCouponValueTime((new Date()).toLocaleDateString(), 0);
        if (today === this.detailData.startTime) {
          this.$store.commit('handleRefreshHouseStatusS', true);
        }
        this.$store.commit('handleRefreshHouseStatusF', true);
      }
    },
    tabActive(vm) {
      if (vm.name === 'log') {
        this.logVisible = true;
      } else {
        this.logVisible = false;
      }
    },
    // 计算90天后的日期
    transferCouponValueTime(startDate, valueTime) {
      const date = new Date(startDate);
      const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + valueTime);
      const year2 = newDate.getFullYear();
      const month2 = newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1;
      const day2 = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
      return year2 + '-' + month2 + '-' + day2;
    }
  }

};
</script>
<style scoped>
/* el-select el-select--mini */
.funds-info {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
  line-height: 40px;
}
.border-t {
  border-top: 1px solid #dddddd;
}
.border-b {
  border-bottom: 1px solid #dddddd;
}
.funds-info-item {
  margin-left: 10px;
}
.detail-remark>>>.el-textarea .el-textarea__inner {
  border: none;
}
</style>
