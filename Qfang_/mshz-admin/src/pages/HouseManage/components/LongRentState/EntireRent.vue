
<template>
  <section class="house-list joint-rent-sec">
    <header class="house-header">
      <div class="filter-form-box">
        <el-form :inline="true"
          class="filter-form"
          size="mini">
          <!-- 城市 -->
          <el-form-item>
            <el-select v-model="city"
              @change="requestAreaList"
              placeholder="城市"
              size="mini">
              <el-option v-for="(item,index) in cityList"
                :key="index"
                :label="item[0]"
                :value="item[1]">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 区域片区 -->
          <el-form-item>
            <el-cascader :options="areaList"
              :disabled="!city"
              placeholder="区域/片区"
              v-model="areaOption"
              change-on-select
              :props="orgProps"
              clearable>
            </el-cascader>
          </el-form-item>
          <!-- 价格 -->
          <el-form-item>
            <el-select v-model="price"
              @change="priceChange"
              placeholder="价格"
              size="mini">
              <el-option label="不限"
                value="none">
              </el-option>
              <el-option label="1500元以下"
                value="one">
              </el-option>
              <el-option label="1500-2500元"
                value="two">
              </el-option>
              <el-option label="2500-3500元"
                value="three">
              </el-option>
              <el-option label="3500-5000元"
                value="four">
              </el-option>
              <el-option label="5000元及以上"
                value="five">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 独立阳卫电 -->
          <el-form-item>
            <el-checkbox v-model="balcony">独立阳台</el-checkbox>
            <el-checkbox v-model="toilet">独立卫生间</el-checkbox>
            <el-checkbox v-model="elevator">电梯房</el-checkbox>
          </el-form-item>
          <!-- searchKey -->
          <el-form-item class="search-key">
            <el-input placeholder="输入小区/楼栋/房号/租客姓名/手机搜索"
              v-model="searchKey"
              size="mini"
              @keyup.enter.native="handlePageChange(1)"
              clearable>
            </el-input>
          </el-form-item>
          <!-- button -->
          <el-form-item>
            <el-button type="success"
              size="mini"
              @click="handlePageChange(1)">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </header>
    <section class="joint-rent"
      v-loading="loading">
      <div class="content">
        <slot v-if="EntireRentList.length > 0">
          <el-collapse v-model="activeNames">
            <el-collapse-item v-for="(buildItem,index) in EntireRentList"
              :key="index"
              :name="index+1">
              <template slot="title">
                <div class="item-header">
                  <span class="font-w">{{handelCutGardenName(buildItem.gardenName)}}</span>
                  <span class="c-green">{{buildItem.buildingName}}</span>
                  <span class="inb pdl-ten c-green"
                    v-if="buildItem.roomStatusModelList.length > 0 && buildItem.roomStatusModelList[0].elevator > 0">
                    <i class="icon iconfont icon-dianti font-16"></i>
                  </span>
                </div>
              </template>
              <div class="house-number-item flex-start pdt-20">
                <div class="house-room flex-start pdl-20">
                  <div class="house-room-item"
                    v-for="(numberItem,j) in buildItem.roomStatusModelList"
                    :key="j">
                    <div @click="handleDetail(buildItem,numberItem)"
                      class="room-item-top">
                      <span v-if="numberItem.booking"
                        class="label-item float-r bgc-blue">定</span>
                      <span v-if="numberItem.roomStatus === 'ALREADY_RENT'"
                        class="label-item float-r"
                        :class="{'bgc-green':(!numberItem.haveRentStatus || numberItem.haveRentStatus === 'RECIVE' ) || numberItem.roomStatus === 'ALREADY_RENT','bgc-red':numberItem.haveRentStatus&&numberItem.haveRentStatus !== 'RECIVE'}">租</span>
                      <span v-else
                        class="label-item float-r annulus"></span>
                      <p class="font-w">{{numberItem.roomNo}}</p>
                      <slot v-if="numberItem.roomStatus === 'WAIT_TO_RENT'">
                        <p class="c-blue room-notification">已经空置{{numberItem.emptyDays}}天</p>
                      </slot>
                      <slot v-else-if="numberItem.haveRentStatus && numberItem.roomStatus === 'ALREADY_RENT'">
                        <slot v-if="numberItem.existBill || numberItem.existExtraBill">
                          <p v-if="numberItem.haveRentStatus.indexOf('RECIVE') !== -1"
                            class="c-red room-notification">
                            收租：{{numberItem.existBill ? numberItem.rentTime : numberItem.extraTime}}
                          </p>
                          <p v-else-if="numberItem.haveRentStatus.indexOf('OVERDUE') !== -1"
                            class="c-red room-notification">
                            <!-- 如是租金账单逾期（existBill = true），则展示租金账单逾期的天数（overdueDays）否就生活账单 -->
                            账单逾期{{numberItem.existBill ? numberItem.overdueDays : numberItem.extraOverdueDays}}天</p>
                        </slot>
                        <p class="c-red room-notification"
                          v-if="(numberItem.haveRentStatus.indexOf('WILL_EXPIRE') !== -1) && numberItem.renew !== 1">
                          合同：{{numberItem.concractEndDays ===0 ? '今日到期': Math.abs(numberItem.concractEndDays) +'天后到期'}}
                        </p>
                        <p class="c-red room-notification"
                          v-else-if="numberItem.haveRentStatus === 'EXPIRE'">合同：{{numberItem.concractEndDays ===0 ? '今日到期': '已过期' +Math.abs(numberItem.concractEndDays) +'天'}}
                        </p>
                        <p class="c-red room-notification"
                          v-else-if="numberItem.haveRentStatus === 'NOW_EXPIRE'">合同：{{numberItem.haveRentStatusDesc}}
                        </p>
                      </slot>
                    </div>
                    <div class="room-item-bottom flex-between font-12 c-9 bdt-ddd">
                      <span class="pdr-5 inb">￥{{numberItem.monthRent}}{{numberItem.roomStatus === 'WAIT_TO_RENT' ? `，${numberItem.area}㎡` : ''}}</span>
                      <span class="ellips">{{numberItem.renterName}}
                        <slot v-if="!numberItem.renterName">
                          <span v-if="numberItem.chamberAttached.indexOf('TOILET') !== -1"
                            class="label-item bgc-6">卫</span>
                          <span v-if="numberItem.chamberAttached.indexOf('BALCONY') !== -1"
                            class="label-item bgc-6">阳</span>
                        </slot>
                      </span>
                    </div>
                    <div class="room-item-handle flex-around font-12 c-9">
                      <slot v-if="numberItem.roomStatus === 'ALREADY_RENT'  && numberItem.haveRentStatus">
                        <slot v-if="(numberItem.haveRentStatus.indexOf('RECIVE') !== -1 || numberItem.haveRentStatus.indexOf('OVERDUE') !== -1)">

                          <el-button type="text"
                            v-if="(numberItem.existBill || numberItem.existExtraBill) && checkPermission('RENT_BILL_MESSAGE')"
                            @click="handleRental(numberItem)"
                            size="mini">催款</el-button>

                        </slot>
                        <slot v-else-if="(numberItem.haveRentStatus.indexOf('EXPIRE') !== -1)">
                          <!-- <el-button @click="handleRenew(numberItem)"
                            :disabled="numberItem.renew === 1 || numberItem.haveRentStatus === 'EXPIRE'"
                            type="text"
                            v-if="checkPermission('LONG_RENT_RENEW')"
                            size="mini">续租</el-button> -->
                          <el-button type="text"
                            v-if="checkPermission('LONG_REFUND_EDIT')"
                            @click="handleCheckout(numberItem)"
                            size="mini">退租</el-button>
                        </slot>
                      </slot>
                      <slot v-if="checkPermission('CONTRACT_NEW_ADD') && numberItem.roomStatus === 'WAIT_TO_RENT'">
                        <!-- <el-button @click="handleAddcont(buildItem,numberItem)"
                          type="text"
                          v-if="(numberItem.booking ? userInfo.id === numberItem.bookingManagerId : true)"
                          size="mini">签约</el-button> -->
                        <el-button @click="handleReserve(buildItem, numberItem)"
                          v-if="numberItem.booking === false"
                          type="text"
                          size="mini">预定</el-button>
                      </slot>
                    </div>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </slot>
        <slot v-else>
          <div class="flex-center hg-100 bgc-f">
            暂无数据
          </div>
        </slot>

      </div>
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

      <el-dialog :title="myroomCode"
        :visible.sync='detailDialog'
        :close-on-click-modal="false"
        top="10vh"
        width="950px">
        <long-rent-house-detail ref="ERlongRentDetail"
          v-if="detailDialog"
          @refreshData="requestData"
          :detailDialog.sync="detailDialog"
          :roomCode.sync="myroomCode"
          :propsLeaseType="'ENTIRE_RENT'"
          :roomData="roomData">
        </long-rent-house-detail>
      </el-dialog>

      <el-dialog title="租客账单"
        :visible.sync='rentBillDialog'
        :close-on-click-modal="false"
        width="950px">
        <long-rent-bill v-if="rentBillDialog"
          @closeDialog="closeDialog"
          @refreshData="requestData"
          :orderNo="orderNo"
          :source="'houseStatus'">
        </long-rent-bill>
      </el-dialog>

      <el-dialog title="抄表"
        :visible.sync='meterDialog'
        :close-on-click-modal="false"
        width="950px">
        <meter-reading v-if="meterDialog"
          @closeDialog="closeDialog"
          :roomData="roomData"
          :orderNo="orderNo">
        </meter-reading>
      </el-dialog>

      <el-dialog title="发送账单"
        top="20vh"
        :visible.sync='rentalDialog'
        :close-on-click-modal="false"
        width="600px">
        <speed-rental v-if="rentalDialog"
          @closeDialog="closeDialog"
          :source="'houseStatus'"
          :messagesInfo="messagesInfo"
          :orderNo="orderNo">
        </speed-rental>
      </el-dialog>

      <add-contarct v-if="AddContDialog"
        :AddContDialog="AddContDialog"
        :source="'LRhouseStatus'"
        :DialogType="DialogType"
        :roomData="roomData"
        :contractId="contractId"
        :propsLeaseType="'ENTIRE_RENT'"
        v-on:changeDialog="getChange"
        @refreshData="requestData">
      </add-contarct>
      <!-- SHARED_RENT 合租 -->

      <el-dialog title="租客退租"
        :visible.sync='ckeckoutDialog'
        :close-on-click-modal="false"
        append-to-body
        width="950px">
        <long-rent-checkout v-on:closeDialog="closeDialogCheckout"
          @refreshData="requestData"
          :orderNo="orderNo"
          :closeBill="closeBill"
          :closeBillData="closeBillData"
          :source="'LRhouseStatus'"
          :propsLeaseType="'ENTIRE_RENT'"
          v-if="ckeckoutDialog">
        </long-rent-checkout>
      </el-dialog>

      <el-dialog title="房源预定"
        :visible.sync='reserveDialog'
        :close-on-click-modal="false"
        append-to-body
        width="800px">
        <reserve-house :reserveDialog.sync="reserveDialog"
          @refreshData="requestData"
          @refreshCount="refreshCount"
          :reserve="reserve"
          :info="info"
          :source="'LRhouseStatus'"
          :propsLeaseType="'SHARED_RENT'"
          v-if="reserveDialog">
        </reserve-house>
      </el-dialog>

    </section>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import LongRentHouseDetail from './LongRentHouseDetail'; // 房态详情
import LongRentCheckout from './LongRentCheckout'; // 退租
import LongRentBill from './LongRentBill'; // 账单
import ReserveHouse from './Reserve'; // 预定
import MeterReading from './MeterReading'; // 抄表
import SpeedRental from './SpeedRental';
import AddContarct from '@/pages/OrdersManage/components/TenantContract/AddContarct';
import { handlePages, truncateGardenName } from '@/components/common/mixin';
import { HouseListHandle } from './HouseStatusListMixns';
export default {
  name: 'EntireRent',
  mixins: [handlePages, HouseListHandle, truncateGardenName],
  components: {
    LongRentHouseDetail,
    LongRentCheckout,
    LongRentBill,
    MeterReading,
    AddContarct,
    SpeedRental,
    ReserveHouse
  },
  data() {
    return {
      activeNames: [],
      loading: false,
      messagesInfo: '',
      reserveDialog: false,    // 预定弹窗
      detailDialog: false, // 房态详情弹框
      ckeckoutDialog: false, // 租客退租弹框
      rentBillDialog: false, // 账单弹框
      meterDialog: false, // 抄表弹框
      rentalDialog: false,
      AddContDialog: false,
      EntireRentList: [],
      roomData: {},
      roomId: '',
      orderNo: '',
      contractId: '',
      myroomCode: '房态详情',

      price: undefined,
      searchKey: undefined,
      billFinanceEnum: null,
      balcony: undefined,
      toilet: undefined,
      elevator: undefined,
      onPrice: undefined,
      offPrice: undefined,
      city: undefined

      // areaList: [],
      // orgProps: {
      //   value: 'id',
      //   label: 'name',
      //   children: 'children'
      // },
      // areaOption: []
    };
  },
  props: {
    queryType: {
      type: String,
      default: ''
    },
    cityList: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.requestData();
  },
  activated() {
    if (this.freshenEntireHouseStatus) {
      this.requestData('vuexRF');
    }
  },
  methods: {

    // 获取楼盘基本信息
    requestData(source) {
      this.loading = true;
      this.$axios.get(
        '/security/roomStatus/queryEntireRentStatusPage',
        {
          params: {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            queryType: this.queryType,
            searchKey: this.searchKey || undefined,
            balcony: this.balcony,
            toilet: this.toilet,
            elevator: this.elevator,
            city: this.city,
            area: this.areaOption[0] || undefined,
            geographyArea: this.areaOption[1] || undefined,
            onPrice: this.onPrice,
            offPrice: this.offPrice
          }
        }
      ).then((res) => {
        this.loading = false;
        if (source === 'vuexRF') {
          this.detailDialog = false;
          this.$store.commit('freshenLREntireHouseStataus', false);
        }
        if (res.data.result && res.data.status === 'C0000') {
          const { result } = res.data;
          this.recordCount = result.recordCount;
          this.EntireRentList = result.items;
          for (let i = 0; i < this.EntireRentList.length; i++) {
            this.activeNames.push(i + 1);
          }
        } else {
          this.EntireRentList = [];
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        if (source === 'vuexRF') {
          this.detailDialog = false;
        }
        this.loading = false;
        this.$message.error(err.message || '服务器异常');
        console.log(err);
      });
    },

    // 打开房态详情
    handleDetail(buildData, roomData) {
      roomData.gardenName = buildData.gardenName;
      roomData.buildingName = buildData.buildingName;
      this.roomData = roomData;
      this.detailDialog = true;
    },

    // 抄表
    handleMeter(buildData, roomData) {
      roomData.gardenName = buildData.gardenName;
      roomData.buildingName = buildData.buildingName;
      this.roomData = roomData;
      this.orderNo = roomData.orderId;
      this.meterDialog = true;
    },

    // 签约
    handleAddcont(buildData, roomData) {
      roomData.gardenName = buildData.gardenName;
      roomData.buildingName = buildData.buildingName;
      this.roomData = roomData;
      this.roomId = roomData.roomId;
      this.DialogType = 'add';
      this.AddContDialog = true;
    },

    // 预定
    handleReserve(info, data) {
      this.getRentTime(info, data);
    },
    getRentTime(info, data) {
      const self = this;
      this.$axios.get('/security/longorder/booking/queryBookingDateLimit', {
        params: {
          roomId: data.roomId,
          longSituationId: data.situationId
        }
      }).then((res) => {
        if (res.data.status === 'C0001') {
          this.$message({
            message: '该房源暂时不能预定',
            type: 'warning'
          });
          self.reserveDialog = false;
        } else {
          self.reserveDialog = true;
          self.reserve = data;
          self.info = info;
        }
      });
    }

    // 收款
    // handleReceipt(data) {
    //   this.orderNo = data.orderId;
    //   this.rentBillDialog = true;
    // },

    // 催款
    // handleRental(data) {
    //   this.orderNo = data.orderId;
    //   this.$axios.get(
    //     '/security/longOrder/billRentByOrder', {
    //       params: {
    //         orderNo: this.orderNo
    //         // type: 2
    //       }
    //     }
    //   ).then((res) => {
    //     if (res.data.status === 'C0000') {
    //       this.messagesInfo = res.data.result;
    //       this.rentalDialog = true;
    //     } else {
    //       this.$message.warning(res.data.message);
    //     }
    //   }).catch(err => {
    //     this.message.warning(err.message || '服务异常');
    //     console.log(err);
    //   });
    // },

    // // 退房
    // handleCheckout(data) {
    //   this.ckeckoutDialog = true;
    //   this.orderNo = data.orderId;
    // },

    // // 续签
    // handleRenew(data) {
    //   this.contractId = data.contractId;
    //   this.AddContDialog = true;
    //   this.DialogType = 'Renew';
    // },

    // getChange(data) {
    //   this.AddContDialog = data;
    // },

    // closeDialogCheckout(data) {
    //   (data === 'refresh') && this.requestData();
    //   this.ckeckoutDialog = false;
    // },

    // closeDialog(data) {
    //   if (data === 'LongRentBill') {
    //     this.rentBillDialog = false;
    //   } else if (data === 'MeterReading') {
    //     this.meterDialog = false;
    //   } else if (data === 'speedrental') {
    //     this.rentalDialog = false;
    //   }
    // },

    //  //  选择价格
    // priceChange(val) {
    //   switch (val) {
    //     case 'none':
    //       this.onPrice = undefined;
    //       this.offPrice = undefined;
    //       break;
    //     case 'one':
    //       this.onPrice = undefined;
    //       this.offPrice = 1500;
    //       break;
    //     case 'two':
    //       this.onPrice = 1500;
    //       this.offPrice = 2500;
    //       break;
    //     case 'three':
    //       this.onPrice = 2500;
    //       this.offPrice = 3500;
    //       break;
    //     case 'four':
    //       this.onPrice = 3500;
    //       this.offPrice = 5000;
    //       break;
    //     case 'five':
    //       this.onPrice = 5000;
    //       this.offPrice = undefined;
    //       break;
    //     default:
    //       this.onPrice = undefined;
    //       this.offPrice = undefined;
    //   }
    // },

    // requestAreaList(val) {
    //   this.$axios.get(
    //     '/security/roomStatus/contract/queryArea',
    //     {
    //       params: {
    //         city: val
    //       }
    //     }
    //   ).then((res) => {
    //     if (res.data.status === 'C0000') {
    //       this.areaList = res.data.result;
    //     } else {
    //       this.$message.warning('区域信息：' + res.data.message);
    //     }
    //   }).catch(err => {
    //     console.log(err);
    //   });
    // }

    // closeChild(done) {
    //   this.$refs.ERlongRentDetail.closeAllDialog();
    //   done();
    // }

  },
  computed: {
    ...mapState([
      'freshenEntireHouseStatus',
      'userInfo'
    ])

  },
  watch: {
    queryType(val) {
      this.requestData();
    },
    // searchKey(val) {
    //   console.log(val);
    //   // 输入关键字，自动请求，限制一秒请求一次
    //   let myTimer = false;
    //   if (!myTimer) {
    //     myTimer = true;
    //     setTimeout(() => {
    //       this.requestData();
    //       myTimer = false;
    //     }, 1000);
    //   }
    // },
    freshenEntireHouseStatus(val) {
      if (val) {
        this.requestData('vuexRF');
      }
    }
  }

};
</script>

<style scoped>
.joint-rent-sec {
  margin-top: 10px;
  border-top: none;
}
.joint-rent {
  /* position: relative;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box; */
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
/* 修改 elm-UI 组件样式 */
.joint-rent >>> .el-collapse-item__content {
  border: 1px solid #dddddd;
  border-left: 0 none;
  /* border-right: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd; */
}
.joint-rent >>> .el-collapse-item {
  margin-bottom: 10px;
}
.joint-rent >>> .el-collapse-item__content {
  padding: 0;
}
.joint-rent >>> .el-collapse-item__wrap {
  background-color: #eeeeee;
}
.content {
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.content >>> .el-collapse {
  border-top: none;
}
.content >>> .el-collapse-item__header.focusing:focus:not(:hover) {
  color: #000;
}
.content >>> .el-collapse-item__arrow {
  margin-right: 20px;
}
/* .content >>> .el-collapse-item__header {
  height: 38px;
  line-height: 38px;
} */
.item-header {
  height: 48px;
  line-height: 48px;
  padding: 0 20px;
  text-align: left;
  /* font-size: 12px; */
  /* font-weight: 600; */
  border: 1px solid #dddddd;
  border-left: 0 none;
  background-color: #fafafa;
}
.house-number-item {
  background-color: #fff;
  transition: background 1s;
  border-bottom: 1px solid #eee;
}
.house-number-item:hover {
  background-color: #fafafa;
  transition: background 1s;
}
.house-number-info {
  width: 100px;
}
.house-room {
  flex: 1;
  flex-wrap: wrap;
}
.house-room-item {
  width: 160px;
  height: 110px;
  margin-right: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid #dddddd;
  overflow: hidden;
}
.house-room-item:hover {
  border-color: #999;
}
.room-item-top {
  padding: 10px;
  height: 80px;
  background-color: #fff;
  box-sizing: border-box;
  transition: background 0.3s;
  cursor: pointer;
}
.house-room-item:hover .room-item-top {
  background-color: #dbffe7;
  transition: background 0.3s;
}
.room-notification {
  line-height: 18px;
}
.house-room-item:hover .room-notification {
  color: #333333;
}
.house-room-item:hover .room-item-handle {
  transform: translateY(-30px);
}
/* .house-room-item:hover .room-item-bottom {
  transition: opacity 0.3s;
  opacity: 0;
} */
.room-item-bottom {
  padding: 0 10px;
  height: 31px;
  line-height: 30px;
  background-color: #fafafa;
  box-sizing: border-box;
  opacity: 1;
  transition: opacity 0.3s;
}
.room-item-handle {
  padding: 0 10px;
  /* height: 30px; */
  line-height: 30px;
  background-color: #fafafa;
  box-sizing: border-box;
  position: relative;
  z-index: 99;
  transition-duration: 0.3s;
  transition-property: transform;
}
.label-item {
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: inline-block;
  font-size: 12px;
  text-align: center;
  color: #ffffff;
  border-radius: 3px;
  margin: 0 3px;
}
.line {
  display: inline-block;
  width: 1px;
  height: 15px;
  background-color: #cccccc;
}
.btm {
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  bottom: 0px;
  left: 0;
  z-index: 200;
}
.ored-pagination {
  width: 100%;
  padding: 7px 5px;
  background-color: #fafafa;
  box-sizing: border-box;
}
span.label-item.annulus {
  width: 10px;
  height: 10px;
  box-sizing: border-box;
  padding: 0;
  border-radius: 50%;
  border: 2px solid #4b8daf;
}
.hg-100 {
  height: 100%;
}
.filter-form-box >>> .el-checkbox__label {
  width: auto;
}
.filter-form-box >>> .search-key .el-input__inner {
  width: 270px;
}
</style>

