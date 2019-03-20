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
        <slot v-if="JointRentList.length>0">
          <el-collapse v-model="activeNames">
            <el-collapse-item v-for="(buildItem,index) in JointRentList"
              v-if="buildItem.length"
              :key="index"
              :name="index+1">
              <template slot="title">
                <div class="item-header">
                  <span class="font-w">{{handelCutGardenName(buildItem[0].gardenName)}}</span>
                  <span class="c-green">{{buildItem[0].buildingName}}</span>
                  <span class="inb pdl-ten c-green"
                    v-if="buildItem[0].chamberStatusModelList.length > 0 && buildItem[0].chamberStatusModelList[0].elevator > 0">
                    <i class="icon iconfont icon-dianti"></i>
                  </span>
                </div>
              </template>
              <div class="house-number-item flex-start pdt-20"
                v-for="(numberItem,i) in buildItem"
                :key="i">
                <div class="house-number-info flex-center font-w">
                  {{numberItem.roomNo}}
                </div>
                <div class="house-room flex-start">
                  <div class="house-room-item-box"
                    v-for="(roomItem,j) in numberItem.chamberStatusModelList"
                    :key="j">
                    <div class="house-room-item">
                      <div @click="handleDetail(numberItem, roomItem)"
                        class="room-item-top">
                        <!-- 空置 haveRentStatus 值为空 。房子状态（roomStatus）是“已租”展示 “租” -->
                        <span v-if="roomItem.booking"
                          class="label-item float-r bgc-blue">定</span>
                        <span v-if="roomItem.roomStatus === 'ALREADY_RENT'"
                          class="label-item float-r"
                          :class="{'bgc-green':(!roomItem.haveRentStatus || roomItem.haveRentStatus === 'RECIVE' )&&roomItem.roomStatus === 'ALREADY_RENT','bgc-red':roomItem.haveRentStatus&&roomItem.haveRentStatus !== 'RECIVE'}">租</span>
                        <span v-else
                          class="label-item float-r annulus">
                        </span>
                        <p class="font-w">{{roomItem.bedRoomName}}</p>
                        <!-- 房态文案 -->
                        <slot v-if="roomItem.roomStatus === 'WAIT_TO_RENT'">
                          <p class="c-blue room-notification">已经空置{{roomItem.emptyDays}}天</p>
                        </slot>
                        <!-- existBill： false（没有未收租的账单） 不展示 收租提示文案 -->
                        <slot v-else-if="roomItem.haveRentStatus && roomItem.roomStatus === 'ALREADY_RENT'">
                          <!-- 租金相关的提示 -->
                          <slot v-if="roomItem.existBill || roomItem.existExtraBill">
                            <!-- === 'RECIVE' || roomItem.haveRentStatus === 'WILL_EXPIRE_AND_RECIVE' -->
                            <p v-if="roomItem.haveRentStatus.indexOf('RECIVE') !== -1"
                              class="c-red room-notification">
                              收租：{{roomItem.existBill ? roomItem.rentTime : roomItem.extraTime}}
                            </p>
                            <!-- === 'OVERDUE' || roomItem.haveRentStatus === 'WILL_EXPIRE_AND_OVERDUE' -->
                            <p v-else-if="roomItem.haveRentStatus.indexOf('OVERDUE') !== -1"
                              class="c-red room-notification">
                              账单逾期{{roomItem.existBill ? roomItem.overdueDays : roomItem.extraOverdueDays}}天
                            </p>
                          </slot>

                          <!-- 合同相关的提示 -->
                          <!-- roomItem.haveRentStatus === 'WILL_EXPIRE' || ((roomItem.haveRentStatus === 'WILL_EXPIRE_AND_RECIVE' || roomItem.haveRentStatus === 'WILL_EXPIRE_AND_OVERDUE') &&  -->
                          <p class="c-red room-notification"
                            v-if="(roomItem.haveRentStatus.indexOf('WILL_EXPIRE') !== -1) && roomItem.renew !== 1">
                            合同：{{roomItem.concractEndDays}}天后到期
                          </p>
                          <p class="c-red room-notification"
                            v-else-if="roomItem.haveRentStatus === 'EXPIRE'">
                            合同：{{roomItem.concractEndDays ===0 ? '今日到期': '已过期' +Math.abs(roomItem.concractEndDays) +'天'}}
                          </p>
                          <p class="c-red room-notification"
                            v-else-if="roomItem.haveRentStatus === 'NOW_EXPIRE'">
                            合同：{{roomItem.haveRentStatusDesc}}
                          </p>
                        </slot>
                        <!-- <p :class="{'room-notification': true,'c-red':roomItem.haveRentStatus === 'OVERDUE','c-blue':roomItem.roomStatus === 'WAIT_TO_RENT'}">{{roomItem.hint}}</p> -->
                      </div>
                      <div class="room-item-bottom flex-between font-12 c-9 bdt-ddd">
                        <!-- chamberAttached -->
                        <span class="inb pdr-5">￥{{roomItem.monthRent}}{{roomItem.roomStatus === 'WAIT_TO_RENT' ? `，${roomItem.area}㎡` : ''}}</span>
                        <span class="ellips">{{roomItem.renterName}}
                          <slot v-if="!roomItem.renterName">
                            <span v-if="roomItem.chamberAttached.indexOf('TOILET') !== -1"
                              class="label-item bgc-6">卫</span>
                            <span v-if="roomItem.chamberAttached.indexOf('BALCONY') !== -1"
                              class="label-item bgc-6">阳</span>
                          </slot>
                        </span>
                      </div>
                      <div class="room-item-handle flex-around font-12 c-9">
                        <slot v-if="roomItem.roomStatus === 'ALREADY_RENT' && roomItem.haveRentStatus">
                          <!-- (roomItem.haveRentStatus ==='RECIVE' || roomItem.haveRentStatus === 'OVERDUE' || roomItem.haveRentStatus === 'WILL_EXPIRE_AND_RECIVE' || roomItem.haveRentStatus === 'WILL_EXPIRE_AND_OVERDUE')  -->
                          <slot v-if="roomItem.haveRentStatus.indexOf('RECIVE') !== -1 || roomItem.haveRentStatus.indexOf('OVERDUE') !== -1">
                            <!-- 首单不需要抄表 -->
                            <!-- <el-button @click="handleMeter(numberItem, roomItem)"
                          type="text"
                          :disabled="roomItem.firstOrder || !roomItem.setExtras"
                          size="mini">抄表</el-button> -->
                            <!-- <span class="line"></span> -->
                            <el-button type="text"
                              v-if="(roomItem.existBill || roomItem.existExtraBill) && checkPermission('RENT_BILL_MESSAGE')"
                              @click="handleRental(roomItem)"
                              size="mini">催款</el-button>
                            <!-- <span class="line"></span>
                          <el-button @click="handleReceipt(roomItem)" type="text" size="mini">收款</el-button> -->
                          </slot>
                          <!-- (roomItem.haveRentStatus ==='WILL_EXPIRE' || roomItem.haveRentStatus === 'EXPIRE' || roomItem.haveRentStatus == 'NOW_EXPIRE') -->
                          <slot v-else-if="(roomItem.haveRentStatus.indexOf('EXPIRE') !== -1)">
                            <!-- <el-button @click="handleRenew(roomItem)"
                              type="text"
                              :disabled="roomItem.renew === 1 || roomItem.haveRentStatus === 'EXPIRE'"
                              v-if="checkPermission('LONG_RENT_RENEW')"
                              size="mini">续租</el-button> -->
                            <el-button type="text"
                              v-if="checkPermission('LONG_REFUND_EDIT')"
                              @click="handleCheckout(roomItem)"
                              size="mini">退租</el-button>
                          </slot>
                        </slot>

                        <!-- 如是已预订，就判断预定管家id 和 当前登录人的id 是否相等 -->
                        <!-- 有签约权限的才有预约权限 -->
                        <slot v-if="checkPermission('CONTRACT_NEW_ADD') && roomItem.roomStatus === 'WAIT_TO_RENT'">
                          <!-- <el-button @click="handleAddcont(numberItem, roomItem)"
                            type="text"
                            v-if="(roomItem.booking ? userInfo.id === roomItem.bookingManagerId : true)"
                            size="mini">签约</el-button> -->

                          <el-button @click="handleReserve(numberItem, roomItem)"
                            v-if="!roomItem.booking"
                            type="text"
                            size="mini">预定</el-button>
                        </slot>
                        <!-- <slot v-else-if="roomItem.roomStatus === 'ALREADY_RENT' && !roomItem.haveRentStatus">
                        <el-button @click="handleDetail(numberItem, roomItem)"
                          type="text"
                          size="mini">查看</el-button>
                        </slot> -->
                        <!-- || (roomItem.haveRentStatus && roomItem.haveRentStatus.indexOf('EXPIRE') !== -1) -->
                      </div>
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
        top="5vh"
        width="950px">
        <long-rent-house-detail ref="JRlongRentDetail"
          v-if="detailDialog"
          v-on="$listeners"
          @refreshData="requestData"
          :detailDialog.sync="detailDialog"
          :roomCode.sync="myroomCode"
          :propsLeaseType="'SHARED_RENT'"
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
          :source="'houseStatus'"
          :orderNo="orderNo">
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
          :orderNo="orderNo"
          :messagesInfo="messagesInfo">
        </speed-rental>
      </el-dialog>

      <add-contarct v-if="AddContDialog"
        :AddContDialog="AddContDialog"
        :DialogType="DialogType"
        :source="'LRhouseStatus'"
        :roomData="roomData"
        :contractId="contractId"
        :propsLeaseType="'SHARED_RENT'"
        v-on:changeDialog="getChange"
        @refreshData="requestData">
      </add-contarct>

      <!--  合租 -->
      <el-dialog title="租客退租"
        :visible.sync='ckeckoutDialog'
        :close-on-click-modal="false"
        append-to-body
        width="950px">
        <long-rent-checkout v-on:closeDialog="closeDialogCheckout"
          @refreshData="requestData"
          :closeBill="closeBill"
          :closeBillData="closeBillData"
          :orderNo="orderNo"
          :source="'LRhouseStatus'"
          :propsLeaseType="'SHARED_RENT'"
          v-if="ckeckoutDialog">
        </long-rent-checkout>
      </el-dialog>

      <el-dialog title="房源预定"
        :visible.sync='reserveDialog'
        :close-on-click-modal="false"
        append-to-body
        width="800px">
        <reserve-house :reserveDialog.sync="reserveDialog"
          v-on="$listeners"
          @refreshData="requestData"
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
import reserveHouse from './Reserve'; // 预定
import LongRentBill from './LongRentBill'; // 账单
import MeterReading from './MeterReading'; // 抄表
import SpeedRental from './SpeedRental';
import AddContarct from '@/pages/OrdersManage/components/TenantContract/AddContarct';
import { handlePages, truncateGardenName } from '@/components/common/mixin';
import { HouseListHandle } from './HouseStatusListMixns';
export default {
  name: 'JointRent',
  mixins: [handlePages, HouseListHandle, truncateGardenName],
  components: {
    LongRentHouseDetail,
    LongRentCheckout,
    LongRentBill,
    MeterReading,
    AddContarct,
    SpeedRental,
    reserveHouse
  },
  data() {
    return {
      DialogType: '',
      activeNames: [],
      loading: false,
      messagesInfo: '',

      detailDialog: false, // 房态详情弹框
      ckeckoutDialog: false, // 租客退租弹框
      rentBillDialog: false, // 账单弹框
      meterDialog: false, // 抄表弹框

      reserveDialog: false,    // 预定弹窗
      APPCodecontractDialog: false, // 签约
      rentalDialog: false,
      AddContDialog: false,
      JointRentList: [],
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
    if (this.freshenJointHouseStatus) {
      this.requestData('vuexRF');
    }
  },
  methods: {

    // 获取楼盘基本信息
    requestData(source) {
      this.loading = true;
      this.$axios.get(
        '/security/roomStatus/queryJointRentStatusPage',
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
          this.$store.commit('freshenLRJointHouseStataus', false);
        }
        if (res.data.result && res.data.status === 'C0000') {
          const { result } = res.data;
          this.recordCount = result.recordCount;
          // 把楼盘+楼栋相同的合围一个 arry
          let resList = result.items;
          let JointRentObj = {};
          for (let i = 0; i < resList.length; i++) {
            let valueItem = resList[i].buildingName + resList[i].gardenName;
            // resList[i].chamberStatusModelList.length 空房间不渲染。
            // if (!resList[i].chamberStatusModelList || !resList[i].chamberStatusModelList.length) {
            //   continue;
            // }
            // 如果没有该属性，新增
            if (!JointRentObj[valueItem]) {
              JointRentObj[valueItem] = [];
              JointRentObj[valueItem].push(resList[i]);
            } else {
              JointRentObj[valueItem].push(resList[i]);
            }
          }
          // 把对象转为数组
          // this.JointRentList.push(Object.values(JointRentObj));
          this.JointRentList = Object.values(JointRentObj);
          for (let i = 0; i < this.JointRentList.length; i++) {
            this.activeNames.push(i + 1);
          }
        } else {
          this.JointRentList = [];
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
      roomData.roomNo = buildData.roomNo;
      this.roomId = roomData.roomId;
      this.roomData = roomData;
      this.detailDialog = true;
    },

    // 抄表
    handleMeter(buildData, roomData) {
      roomData.roomNo = buildData.roomNo;
      roomData.gardenName = buildData.gardenName;
      roomData.buildingName = buildData.buildingName;
      this.orderNo = roomData.orderId;
      this.roomData = roomData;
      this.meterDialog = true;
    },

    // 签约
    handleAddcont(buildData, roomData) {
      roomData.roomNo = buildData.roomNo;
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
          this.reserveDialog = false;
        } else {
          this.reserveDialog = true;
          this.reserve = data;
          this.info = info;
        }
      });
    }

    // // 催款
    // handleRental(data) {
    //   // v1.12.0 之前 /security/longOrder/billRent
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
    //   this.ckeckoutDialog = false;
    //   (data === 'refresh') && this.requestData();
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

    // //  选择价格
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

    // // 请求筛选区域片区数据
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
    // closeDialog(data) {
    //   if (data === 'LongRentBill') {
    //     this.rentBillDialog = false;
    //   } else if (data === 'MeterReading') {
    //     this.meterDialog = false;
    //   } else if (data === 'speedrental') {
    //     this.rentalDialog = false;
    //   } else if (data === 'ReserveHouse') {
    //     this.reserveDialog = false;
    //   }
    // }

    // closeChild(done) {
    //   this.$refs.JRlongRentDetail.closeAllDialog();
    //   done();
    // }

  },
  computed: {
    ...mapState([
      'freshenJointHouseStatus',
      'userInfo'
    ]),
    myparent() {
      return this.$parent;
    }
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

    freshenJointHouseStatus(val) {
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
.house-room-item-box {
  margin-right: 20px;
  margin-bottom: 20px;
  border: 1px solid #dddddd;
}
/* sdfdf */
.house-room-item {
  width: 160px;
  height: 110px;
  background-color: #fff;
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

/* adfadsfd */
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
  padding: 2px 5px;
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
  margin-top: 3px;
}
/* adafd */
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

