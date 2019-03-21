<template>
  <section style="height:730px;"
    class="dialog-box">
    <div class="house-status-base-info bgc-f">
      <div class="flex-between">
        <div>
          <span class="font-16 font-w">
            {{handelCutGardenName(roomData.gardenName || headInfo.gardenName)}}
          </span>
          <span class="inb pdl-ten">
            {{roomData.buildingName || headInfo.building}}，{{roomData.roomNo || headInfo.premisesNumber}} {{roomData.bedRoomName || headInfo.chamberName}}
          </span>
          <span class="inb pdl-ten c-green"
            v-if="roomData.elevator > 0">
            <i class="icon iconfont icon-dianti"></i>
          </span>
        </div>
        <div>
          <el-button size="small"
            @click="mapDialog=true"
            type="text">
            <i class="icon iconfont icon-dizhi"></i>{{positionInfo || '地址'}}</el-button>
        </div>
      </div>
      <el-row>
        <el-col :span="6">
          <p class="content-item-twelve">
            <span class="content-item-label-auto c-9">
              <span class="content-item-label-justify-four">楼层</span>：
            </span>{{headInfo.floor || '--'}}/{{headInfo.maxFloor || '--'}}
          </p>
        </el-col>
        <el-col :span="6">
          <p class="content-item-twelve">
            <span class="content-item-label-auto c-9">
              <span class="content-item-label-justify-four">户型</span>：
            </span>
            <span>{{ headInfo.bedRoom }}房</span>
            <span>{{ headInfo.livingRoom }}厅</span>
          </p>
        </el-col>
        <el-col :span="6">
          <p class="content-item-twelve">
            <span class="content-item-label-auto c-9">
              <span class="content-item-label-justify-four">房源面积</span>：
            </span>{{headInfo.roomArea || '--'}}㎡
          </p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6"
          v-if="roomData.roomStatus === 'ALREADY_RENT'">
          <p class="content-item-twelve">
            <span class="content-item-label-auto c-9">
              <span class="content-item-label-justify-four">客户</span>：
            </span>{{roomData.renterName}}
          </p>
        </el-col>
        <el-col :span="6">
          <p class="content-item-twelve">
            <span class="content-item-label-auto c-9">
              <span class="content-item-label-justify-four">状态</span>：
            </span>
            <span class="c-red"
              v-if="roomData.haveRentStatus && !downOver">（{{roomData.haveRentStatus === 'WILL_EXPIRE_AND_RECIVE' || roomData.haveRentStatus === 'WILL_EXPIRE_AND_OVERDUE'? (roomData.renew === 1? '收款' : `合同即将到期${ roomData.existBill ?'、收款': ''}`) : roomData.haveRentStatusDesc}}）
            </span>
            <span v-else>{{headInfo.status}}</span>
          </p>
        </el-col>
        <el-col :span="6">
          <p class="content-item-twelve">
            <span class="content-item-label-auto c-9">
              <span class="content-item-label-justify-four">综合管家</span>：
            </span>{{headInfo.compositeManager || '--'}}{{headInfo.compositeOrg ? `(${headInfo.compositeOrg})` : ''}}
          </p>
        </el-col>
        <el-col :span="6">
          <p class="content-item-twelve">
            <span class="content-item-label-auto c-9">
              <span class="content-item-label-justify-four">服务管家</span>：
            </span>{{headInfo.serviceManager || '--'}}{{headInfo.serviceOrg ? `(${headInfo.serviceOrg})` : ''}}
          </p>
        </el-col>
      </el-row>
      <!-- <div class="pdr-20 font-12">
          <span class="c-9">客户：</span>{{roomData.renterName}}</div>
        <div class="pdr-20 font-12">
          <span class="c-9">状态：</span>{{roomData.roomStatusDesc}}
          <span class="c-red"
            v-if="roomData.haveRentStatus">（{{roomData.haveRentStatus === 'WILL_EXPIRE_AND_RECIVE' || roomData.haveRentStatus === 'WILL_EXPIRE_AND_OVERDUE'? (roomData.renew === 1? '收款' : `合同即将到期${ roomData.existBill ?'、收款': ''}`) : roomData.haveRentStatusDesc}}）</span>
        </div>
        <div class="pdr-20 font-12">
          <span class="c-9">发房管家：</span>{{roomData.managerName}}（{{roomData.managerPhone}}）
          <span v-if="signManagerName"
            class="c-9">签约管家：</span>{{signManagerName}}
        </div> -->
    </div>
    <div class="house-status-info">
      <div v-if="showDownTime"
        class="down-time line-h-40 c-red font-14">
        <p>
          请在
          <span class="font-w">
            <span v-if="downD > 0">{{downD}}天</span>
            <span v-if="downH > 0">{{downH > 9 ? downH : '0'+ downH}}:</span>{{downM > 9 ? downM : '0' + downM}}:{{downS > 9 ? downS : '0' + downS}}</span>
          时间内完成支付
        </p>
      </div>
      <el-tabs v-model="activeName">
        <slot v-if="(roomData.roomStatus === 'ALREADY_RENT' && !downOver) || headInfo.status.indexOf('空置') === -1">
          <el-tab-pane label="租客账单"
            name="first">
            <bills-list ref="BillList"
              :orderNo="roomData.orderId"
              :unpaid.sync="unpaid"
              :source="'houseDetail'"
              :propsLeaseType="propsLeaseType"
              :roomData="roomData"
              v-if="roomData.roomStatus!=='WAIT_TO_RENT'">
            </bills-list>
            <div class="flex-center flex-c font-14 bgceee long-rent-dialog"
              v-else>
              <p>房间空置，无账单需要处理</p>
            </div>
          </el-tab-pane>
          <el-tab-pane label="租房合同"
            name="second"
            lazy>
            <div class="bgceee contarct-box"
              v-if="(roomData.roomStatus!=='WAIT_TO_RENT' && roomData.contractId)">
              <!-- <div class="model-header contarct-head">
                <el-row>
                  <el-col :span="12">
                    <span>当前合同</span>
                  </el-col>
                  <el-col :span="12">
                    <div class="float-r">
                      <el-button type="text"
                        :disabled="roomData.renew === 1 || (roomData.haveRentStatus !== 'WILL_EXPIRE_AND_RECIVE' && roomData.haveRentStatus !== 'WILL_EXPIRE_AND_OVERDUE' && roomData.haveRentStatus !== 'WILL_EXPIRE')"
                        @click="handleRenew"
                        size="mini">续租</el-button>
                      <el-button @click="handleCheckout"
                        type="text"
                        v-if="checkPermission('LONG_REFUND_EDIT')"
                        size="mini">退租</el-button>
                    </div>
                  </el-col>
                </el-row>
              </div> -->
              <div class="bd-ddd bgc-f">
                <contarct-info :contractId="roomData.contractId"
                  ref="contInfo"
                  :source="'houseDetail'"
                  :showOldList="false"
                  :contractData="contractData"
                  @setManager="getManagerName"
                  v-on:setOldcontractId="getOldcontractId">
                </contarct-info>
              </div>
            </div>
            <div class="flex-center flex-c font-14 bgceee long-rent-dialog"
              v-else>
              <p>房间空置，暂无生效合同</p>
              <p>
                <!-- <el-button type="text"
                  @click="AddContDialog= true,DialogType='add'"
                  size="small">添加合同
                </el-button> -->
              </p>
            </div>
          </el-tab-pane>
        </slot>
        <el-tab-pane label="房间信息"
          name="third">
          <room-info :longRoomId="roomData.longRoomId"
            :roomName="roomData.bedRoomName"
            :id="roomData.id"
            :propsLeaseType="propsLeaseType">
          </room-info>
        </el-tab-pane>

        <el-tab-pane v-if="roomData.booking"
          label="预定信息"
          name="fourth">
          <reserve-info :roomData="roomData"></reserve-info>
        </el-tab-pane>

      </el-tabs>
    </div>
    <div v-if="source==='LRhouseStateList'"
      class="dialog-footer">
      <!-- 首单 并未支付 “取消租约” -->
      <slot v-if="roomData.firstOrder && unpaid && roomData.existBill">
        <el-button v-if="checkPermission('LONG_CANCEL_RENEW')"
          size="mini"
          type="danger"
          @click="handleCancelLease">取消租约
        </el-button>
      </slot>
      <!-- 倒计时结束 使用 headInfo.status 判断房子是否已租 -->
      <slot v-else-if="(roomData.roomStatus === 'ALREADY_RENT' && !downOver) || headInfo.status.indexOf('空置') === -1">
        <el-button @click="handleCheckout"
          type="danger"
          v-if="checkPermission('LONG_REFUND_EDIT')"
          size="mini">退租
        </el-button>
        <!-- 没有权限直接不展示改按钮 -->
        <!-- renew === 1 已经续签过， -->
        <!-- !== 'WILL_EXPIRE_AND_RECIVE' && roomData.haveRentStatus !== 'WILL_EXPIRE_AND_OVERDUE' && roomData.haveRentStatus !== 'WILL_EXPIRE' -->
        <!-- <slot v-if="checkPermission('LONG_RENT_RENEW') && !roomData.booking && (roomData.haveRentStatus && roomData.haveRentStatus.indexOf('WILL_EXPIRE') !== -1)">
          <el-button type="primary"
            :disabled="roomData.renew === 1"
            @click="handleRenew"
            size="mini">续租
          </el-button>
        </slot> -->
      </slot>

      <!-- <slot v-if="checkPermission('CONTRACT_NEW_ADD') && (roomData.booking ? userInfo.id === roomData.bookingManagerId : true)">
        <el-button type="primary"
          v-if="(roomData.roomStatus === 'WAIT_TO_RENT' && !downOver) || headInfo.status.indexOf('空置') !== -1"
          @click="AddContDialog= true,DialogType='add'"
          size="mini">签约
        </el-button>
      </slot> -->
      <!-- || (roomData.haveRentStatus && roomData.haveRentStatus.indexOf('EXPIRE') !== -1) -->
      <slot v-if="!roomData.booking && (roomData.roomStatus === 'WAIT_TO_RENT') && checkPermission('CONTRACT_NEW_ADD')">
        <el-button @click="handleReserve()"
          size="small">预定房源
        </el-button>
      </slot>
    </div>

    <el-dialog title="租客退租"
      :visible.sync='ckeckoutDialog'
      :close-on-click-modal="false"
      append-to-body
      width="950px">
      <long-rent-checkout v-on:closeDialog="closeDialogCheckout"
        :orderNo="orderNo"
        :closeBill="closeBill"
        :closeBillData="closeBillData"
        :propsLeaseType="propsLeaseType"
        :source="'houseDetail'"
        v-if="ckeckoutDialog">
      </long-rent-checkout>
    </el-dialog>

    <add-contarct v-if="AddContDialog"
      :AddContDialog="AddContDialog"
      :roomData="roomData"
      :source="'LRhouseDetail'"
      :contractId="contractId"
      :propsLeaseType="propsLeaseType"
      :DialogType="DialogType"
      @closeParentDialog="closeParentDialog"
      v-on:changeDialog="getChange">
    </add-contarct>

    <el-dialog title="合同详情"
      :visible.sync='OldcontractDialog'
      :close-on-click-modal="false"
      width="950px"
      append-to-body>
      <div class="cont-detail">
        <contarct-info v-if="OldcontractDialog"
          :contractId="OldcontractId"
          :showOldList="true">
        </contarct-info>
      </div>
    </el-dialog>

    <el-dialog :visible.sync='mapDialog'
      :title="handelCutGardenName(roomData.gardenName || headInfo.gardenName)"
      :close-on-click-modal="false"
      width="950px"
      append-to-body>
      <house-map :city="headInfo.city"
        :gardenName="handelCutGardenName(roomData.gardenName || headInfo.gardenName)"
        :address="positionInfo"
        :coordinateProp="coordinate"
        roomCount="0">
      </house-map>
    </el-dialog>

    <el-dialog title="房源预定"
      :visible.sync='reserveDialog'
      :close-on-click-modal="false"
      append-to-body
      width="800px">
      <reserve-house :reserveDialog.sync="reserveDialog"
        v-on="$listeners"
        :reserve="reserve"
        :info="info"
        :source="'LRhouseDetail'"
        :propsLeaseType="propsLeaseType"
        @closeParentDialog="closeParentDialog"
        v-if="reserveDialog">
      </reserve-house>
    </el-dialog>

  </section>
</template>

<script>
import ContarctInfo from '@/pages/OrdersManage/components/TenantContract/ContarctInfo';
import AddContarct from '@/pages/OrdersManage/components/TenantContract/AddContarct';
import LongRentCheckout from './LongRentCheckout'; // 退租
import BillsList from './BillsList'; // 账单列表
import RoomInfo from './RoomInfo';
import HouseMap from '@/pages/HouseManage/components/Housing/HouseMap';
import { truncateGardenName } from '@/components/common/mixin';
import { mapState } from 'vuex';
import { $jsonp } from '@/assets/js/utils.js';
import ReserveHouse from './Reserve'; // 预定
import ReserveInfo from './ReserveInfo';   // 预定信息
import { $downloadFile } from '@/assets/js/utils';
export default {
  name: 'LongRentHouseDetail',
  mixins: [truncateGardenName],
  mounted() {
    // this.requestData();
  },
  data() {
    return {
      signManagerName: '',
      OldcontractId: '',
      OldcontractDialog: false,
      reserveDialog: false, // 预定
      APPCodecontractDialog: false, // 签约
      billList: true,
      activeName: 'first',
      DialogType: '',
      orderNo: '',
      contractId: '',
      ckeckoutDialog: false, // 退租
      AddContDialog: false,
      mapDialog: false,
      unpaid: false, // 未支付账单
      oldContractForm: [
        {
          contractNumber: 1
        }
      ], // 暂时数据
      headInfo: {
        status: '',
        gardenName: ''
      },
      positionInfo: '',
      downD: 0,
      downH: 0,
      downM: 0,
      downS: 0,
      showDownTime: false, // 展示倒计时
      downOver: false, // 倒计时结束
      myTime: null,
      // hideCont: false,
      coordinate: {}, // 地图组件的经纬度
      closeBill: false,
      closeBillData: {
        billModels: []
      },
      contractData: {}
    };
  },
  props: {
    roomData: {
      type: Object,
      default: () => ({})
    },
    propsLeaseType: {
      type: String,
      default: ''
    },
    roomCode: {
      type: String
    },
    detailDialog: {
      type: Boolean
    },
    source: {
      // 调用的组件
      type: String,
      default: 'LRhouseStateList'
    }
  },
  created() {
    this.requestHeadInfo();
    (this.roomData.contractId) && this.getData();
    this.activeName = 'third';
    // 如果是已租才请求时间接口
    // roomStatus === 'ALREADY_RENT' 已租状态
    if (this.roomData.roomStatus === 'ALREADY_RENT') {
      this.activeName = 'first';
      // this.roomData.firstOrder 首单  this.roomData.existCurentBill 当前周期有账单
      (this.roomData.firstOrder && (this.roomData.existCurentBill && this.roomData.existBill)) && this.requestPayTime();
    }
  },
  beforeDestroy() {
    this.ckeckoutDialog = false; // 退租
    this.AddContDialog = false;
  },
  methods: {
    // 预定
    handleReserve() {
      this.getRentTime();
    },

    getRentTime(info, data) {
      // let infoInit = {
      //   gardenName: this.roomData.gardenName,
      //   buildingName: this.roomData.buildingName,
      //   roomNo: this.roomData.roomNo
      // };
      let reserveInit = {
        roomId: this.roomData.roomId,
        situationId: this.roomData.situationId,
        roomStatus: this.roomData.roomStatus,
        managerName: this.roomData.managerName
      };
      this.$axios.get('/security/longorder/booking/queryBookingDateLimit', {
        params: {
          roomId: reserveInit.roomId,
          longSituationId: reserveInit.situationId
        }
      }).then((res) => {
        if (res.data.status === 'C0001') {
          this.$message({
            message: '该房源暂时不能预定',
            type: 'warning'
          });
        } else {
          this.reserveDialog = true;
          this.info = this.roomData;
          this.reserve = reserveInit;
        }
      }).catch(err => {
        console.log(err);
      });
    },

    closeDialog() {
      this.reserveDialog = false;
      // this.detailDialog = false;
    },
    // 切换房源状态
    handleMenuSelect(key, keyPath) {
      this.activeIndex = key;
      // this.requestData();
    },

    // 退房
    handleCheckout() {
      // LONG_REFUND_BILL_CLOSE 关闭账单权限
      // 有未支付的生活账单或租金账单
      if (this.roomData.existBill || this.roomData.existExtraBill) {
        // 是否有权限
        if (this.checkPermission('LONG_REFUND_BILL_CLOSE')) {
          this.handleCheckPurviewBill(this.roomData.orderId, this.roomData.contractId);
        } else {
          this.$message('该租客有未支付账单待关闭，您没有该操作权限哦~');
        }
      } else {
        this.closeBill = false;
        this.ckeckoutDialog = true;
        this.orderNo = this.roomData.orderId;
      }
    },

    getChange(data) {
      this.AddContDialog = false;
    },

    closeDialogCheckout(data) {
      if (data === 'refresh') { this.closeParentDialog(); };
      this.ckeckoutDialog = false;
    },

    // 续签
    handleRenew() {
      this.contractId = this.roomData.contractId;
      this.AddContDialog = true;
      this.DialogType = 'Renew';
    },

    getOldcontractId(data) {
      this.OldcontractId = data.oldContractId;
      this.OldcontractDialog = true;
    },

    getManagerName(data) {
      this.signManagerName = data;
    },

    // 请求头部信息
    requestHeadInfo(myDownOver = false) {
      this.$axios.get(
        '/security/roomStatus/contract/selectRoomOtherInfo',
        {
          params: {
            id: this.roomData.situationId
          }
        }).then((res) => {
          if (res.data.status === 'C0000') {
            let { result } = res.data;
            result.roomCode && this.$emit('update:roomCode', result.roomCode);
            this.coordinate = {
              lat: result.lat,
              lng: result.log
            };
            this.$set(this, 'headInfo', result);
            if (!myDownOver) {
              // 倒计时结束刷新时，不刷位置信息
              let errorCount = 0;
              let options = {
                url: 'http://api.map.baidu.com/place/v2/search',
                data: {
                  query: '地铁站',
                  location: result.lat + ',' + result.log,
                  radius: 2000,
                  output: 'json',
                  scope: 2,
                  filter: 'sort_name:distance|sort_rule:1',
                  ak: 'sRAW4s9H8ccgU2QFARzaQnl1WRoPsYb6'
                },
                callback: 'callback',
                success: (data) => {
                  if (data.results.length) {
                    let address = data.results[0];
                    let subway = address.address.split(';')[0];
                    this.positionInfo = '距离' + subway + address.name + address.detail_info.distance + '米';
                  } else {
                    this.positionInfo = this.headInfo.area;
                  }
                },
                fail: (err) => {
                  // 失败后会再次请求，超出3次后将不再请求
                  console.log(err);
                  errorCount++;
                  if (errorCount < 3) {
                    setTimeout(() => {
                      $jsonp(options);
                    }, 100);
                  }
                }
              };

              $jsonp(options);
            } else {
              // 倒计时结束/手动取消租约，刷新状态后 使用 headInfo.status 判断房子是否已租
              this.downOver = true;
            }
          } else {
            this.$message.error(res.data.message);
          }
        }).catch((err) => {
          console.log(err);
          this.$message.warning(err.message || '获取房源基本信息异常');
        });
    },

    // 付款时间
    requestPayTime(handle = 'startDown') {
      this.$axios.get(
        '/security/longOrder/selectFirstBillPayTime',
        {
          params: {
            orgLongNumber: this.userInfo.orgLongNumber,
            orderNo: this.roomData.orderId
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          const resultTime = +res.data.result;
          // 2.0495935E7
          if (resultTime && isFinite(resultTime) && (parseInt(resultTime, 10) > 0)) {
            this.handleCountdown(resultTime);
            // 展示倒计时；
            this.showDownTime = true;
          } else {

          }
        }
      }).catch(err => {
        console.log(err);
      });
    },

    // 倒计时
    handleCountdown(tiem) {
      const showTime = (downTime) => {
        this.downD = Math.floor(downTime / 1000 / 60 / 60 / 24);
        this.downH = Math.floor(downTime / 1000 / 60 / 60 % 24);
        this.downM = Math.floor(downTime / 1000 / 60 % 60);
        this.downS = Math.floor(downTime / 1000 % 60);
      };
      // 传进 时间戳差值
      let downTime = parseInt(+tiem, 10);
      console.log(downTime);
      showTime(downTime);
      this.myTime = setInterval(() => {
        // 时间差
        downTime = downTime - 1000;
        // console.log(downTime);
        // 定义变量 d,h,m,s保存倒计时的时间
        if (downTime >= 0) {
          // let d = Math.floor(downTime / 1000 / 60 / 60 / 24);
          showTime(downTime);
        } else {
          clearInterval(this.myTime);
          this.showDownTime = false;
          // 到时间接口自动取消订单
          // 刷新账单，合同，头部信息
          this.countDownOver();
        }
      }, 1000);

      this.$once('hook:beforeDestroy', () => {
        clearInterval(this.myTime);
      });
    },

    countDownOver() {
      this.$alert('账单支付超时！!', {
        showClose: false,
        confirmButtonText: '确定',
        callback: action => {
          this.activeName = 'third';
          this.requestHeadInfo(true);
          this.$refs['BillList'] && this.$refs['BillList'].requestCurrentBill();
          this.$refs['contInfo'] && this.$refs['contInfo'].requestData();
          // this.requestPayTime();
          this.$emit('refreshData');
        }
      });
    },

    // 取消订单
    handleCancelLease() {
      this.$confirm('此操作将取消该租约, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.requestCancelLease();
      }).catch((err) => {
        console.log(err);
      });
    },

    requestCancelLease() {
      this.$axios.post(
        '/security/roomStatus/contract/processNotPayContract',
        {
          contract: this.roomData.contractId
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          // this.hideCont = true;
          this.activeName = 'third';
          // 隐藏“取消租约”按钮
          this.unpaid = false;
          this.$message.success('取消成功！');
          this.requestHeadInfo(true);
          // this.requestPayTime();
          clearInterval(this.myTime);
          this.showDownTime = false;
          this.$emit('refreshData');
        } else {
          this.$message.warning(res.data.message);
        }
      }).catch(err => {
        console.log(err);
        this.$message.warning('租约取消：' + err.message);
      });
    },

    closeParentDialog() {
      this.$emit('update:detailDialog', false);
    },

    // 待关闭账单信息-通过订单号
    handleCheckPurviewBill(orderNo, contractNo) {
      this.$axios.get('/security/refundlease/queryAndCheckPurviewBill', {
        params: {
          orderNo: orderNo,
          contractNo: contractNo
        }
      }).then((res) => {
        console.log(res);
        if (res.data.status === 'C0000') {
          this.closeBillData = res.data.result;

          this.closeBill = true;
          this.ckeckoutDialog = true;
          this.orderNo = this.roomData.orderId;
        } else {
          this.$message.error(`查询未支付账单:${res.data.message}`);
        }
      }).catch(err => {
        console.log(err);
      });
    },
    getData() {
      this.$axios.get('/security/roomStatus/contract/queryContractDetail', {
        params: {
          id: this.roomData.contractId
        }
      }).then(({ data }) => {
        if (data.status === 'C0000') {
          this.contractData = data.result;
        } else {
          this.$message.error(data.message);
        }
      }).catch((err) => {
        this.$message.error(err.message || '服务器异常');
      });
    },
    // 获取pdf下载地址
    getDownloadUrl(fdfsUrl, fileName = '') {
      return fdfsUrl ? this.$axios.defaults.baseURL + 'security/roomStatus/contract/downloadSignedPDF?url=' + fdfsUrl + '&fileName=' + fileName + '.pdf' : '';
    },
    downloadPdfFile(url, fileName) {
      $downloadFile(this.getDownloadUrl(url, fileName), fileName + '.pdf');
    }
  },
  provide() {
    return {
      getDownloadUrl: this.getDownloadUrl,
      downloadPdfFile: this.downloadPdfFile
    };
  },
  components: {
    ContarctInfo,
    LongRentCheckout,
    BillsList,
    RoomInfo,
    AddContarct,
    HouseMap,
    ReserveInfo,
    ReserveHouse
  },
  computed: {
    ...mapState(['userInfo'])

  },
  watch: {
    roomData: {
      deep: true,
      handler(curVal, oldVal) {
      }
    }
  }

};
</script>

<style scoped>
.house-status-base-info {
  border-bottom: 1px solid #dddddd;
  padding: 10px 20px 0 20px;
}
p.content-item-twelve {
  padding: 4px 0;
}
.house-status-info {
  position: relative;
}
.down-time {
  position: absolute;
  top: 0;
  right: 20px;
  z-index: 5000;
}
.long-rent-dialog {
  height: 550px;
  overflow: hidden;
  overflow-y: auto;
  box-sizing: border-box;
}
/* .house-status-info>>>.el-tab-pane .dialog-box {
  height: 370px;
} */
.house-status-info .contarct-box.bgceee >>> .dialog-box {
  height: 500px;
  background-color: #fff;
}
.contarct-box.bgceee >>> .bgceee {
  padding: 0;
}
.signContact {
  text-align: center;
  font-size: 16px;
  margin-top: 50px;
  padding-bottom: 50px;
}
.APPCode {
  width: 220px;
  height: 220px;
}
.line {
  display: inline-block;
  width: 1px;
  height: 15px;
  background-color: #cccccc;
}
div.contarct-head {
  position: relative;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-bottom: none;
}
.status-house-info-item {
  height: 40px;
  line-height: 40px;
}
.info-item-left {
  width: 80px;
  text-align: center;
}
.info-item-right {
  flex: 1;
}

.flex-grow-1 {
  flex-grow: 1;
  height: 100%;
}
</style>
