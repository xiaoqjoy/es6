<template>
  <section class="realhouse-box" ref="sectionContainer" @scroll="containerScroll($event)" v-loading="loading">
    <div class="list-content">
      <div class="realhouse model-border" v-for="(item, index) in orderRoomSituation.items" :key="index">
        <header class="real-header font-w">
          <span>{{item.gardenName}}</span>
          <span class="pdl-ten">{{item.buildingName}}</span>
        </header>
        <div class="real-content">
          <ul class="list clearfix">
            <li class="list-item" v-for="(list ,i) in item.roomSituationModelList" :key="i">
              <slot v-if="list.stateList.length>1">
                <el-popover v-for="(stateItem,j) in list.stateList" :key="j" v-if="stateItem.roomState === 'BOOKED' || stateItem.roomState === 'CHECKED_IN'" :disabled="!!list.stateList.length" placement="bottom" width="60" trigger="click" popper-class="Hstate-poper">
                  <div class="item-content" :class="{'bgc' : stateItem.roomState === 'FIXED' && stateItem.isNotUseable === 'YES'}" slot="reference" @click="openDetail(list,j)">
                    <p class="font-bold pdb-5">
                      {{list.roomNo}}
                      <span class="font-default">
                        （{{list.roomCount}}房 {{list.bedCount}}床）
                      </span>
                    </p>
                    <p class="c-3 hg-18" v-if="list.stateList[j]">
                      {{list.stateList[j].custName}}
                    </p>
                    <p class="font-default hg-18 c-9" v-if="list.stateList[j]">
                      {{list.stateList[j].orderChannelDesc}}
                    </p>
                    <div class="house-labels" v-if="list.stateList[j]">
                      <span v-if="list.stateList[j].roomState==='BOOKED'" class="label-item reserve">预</span>
                      <span v-if="list.stateList[j].roomState==='CHECKED_IN'" class="label-item live">住</span>
                      <span v-if="list.stateList[j].roomState==='FIXED'" class="label-item repair">修</span>
                    </div>
                  </div>
                  <ul v-if="checkPermission('ORDER_EDIT')">
                    <li class="handle-item" @click="openAddOrder(list,index)">预约</li>
                    <li class="handle-item" @click="openAddOrder(list,index)">入住</li>
                    <li class="handle-item" @click="openManintain(list,index)">维修</li>
                  </ul>
                </el-popover>
              </slot>
              <slot v-else>
                <el-popover :disabled="(list.stateList.length>0 &&list.stateList[0].roomState ==='FIXED' && list.stateList[0].isNotUseable === 'YES') || (list.stateList.length>0 &&list.stateList[0].roomState !=='FIXED')" placement="bottom" width="60" trigger="click" popper-class="Hstate-poper">
                  <div class="item-content" :class="{'bgc' : list.stateList.length>0 && list.stateList[0].roomState ==='FIXED' && list.stateList[0].isNotUseable === 'YES'}" slot="reference" @click="openDetail(list, 0)">
                    <p class="font-bold pdb-5">
                      {{list.roomNo}}
                      <span class="font-default">
                        （{{list.roomCount}}房 {{list.bedCount}}床）
                      </span>
                    </p>
                    <p class="c-3 hg-18" v-if="list.stateList[0]">
                      {{list.stateList[0].custName}}
                    </p>
                    <p class="font-default hg-18 c-9" v-if="list.stateList[0]">
                      {{list.stateList[0].orderChannelDesc}}
                    </p>
                    <div class="house-labels" v-if="list.stateList[0]">
                      <span v-if="list.stateList[0].roomState==='BOOKED'" class="label-item reserve">预</span>
                      <span v-if="list.stateList[0].roomState==='CHECKED_IN'" class="label-item live">住</span>
                      <span v-if="list.stateList[0].roomState==='FIXED'" class="label-item repair">修</span>
                    </div>
                  </div>
                  <ul v-if="checkPermission('ORDER_EDIT')">
                    <li class="handle-item" @click="openAddOrder(list,index)">预约</li>
                    <li class="handle-item" @click="openAddOrder(list,index)">入住</li>
                    <li class="handle-item" @click="openManintain(list,index)">维修</li>
                  </ul>
                </el-popover>
              </slot>
              <!-- <el-popover :disabled="!!list.stateList.length" placement="bottom" width="60" trigger="click" popper-class="Hstate-poper">
                <div class="item-content" slot="reference" @click="openDetail(list)">
                  <p class="font-bold pdb-5">
                    {{list.roomNo}}
                    <span class="font-default">
                      （{{list.roomCount}}房 {{list.bedCount}}床）
                    </span>
                  </p>
                  <p class="c-3 hg-18" v-if="list.stateList[0]">
                    {{list.stateList[0].custName}}
                  </p>
                  <p class="font-default hg-18 c-9" v-if="list.stateList[0]">
                    {{list.stateList[0].orderChannelDesc}}
                  </p>
                  <div class="house-labels" v-if="list.stateList[0]">
                    <span v-if="list.stateList[0].roomState==='BOOKED'" class="label-item reserve">预</span>
                    <span v-if="list.stateList[0].roomState==='CHECKED_IN'" class="label-item live">住</span>
                    <span v-if="list.stateList[0].roomState==='FIXED'" class="label-item repair">修</span>
                  </div>
                </div>
                <ul v-if="checkPermission('ORDER_EDIT')">
                  <li class="handle-item" @click="openAddOrder(list,index)">预约</li>
                  <li class="handle-item" @click="openAddOrder(list,index)">入住</li>
                  <li class="handle-item" @click="openManintain(list,index)">维修</li>
                </ul>
              </el-popover> -->
            </li>
          </ul>
        </div>
      </div>
      <p class="model-border" style="text-align:center" v-if="this.orderRoomSituation.items&&this.orderRoomSituation.items.length===0">暂无数据</p>

    </div>

    <div class="btm">
      <div class="ored-pagination border-ddd">
        <el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="orderRoomSituation.recordCount">
        </el-pagination>
      </div>
    </div>

    <addHouse-maintain v-if="addHouseMaintainVisible" @closeAddHouseMaintain="closeAddHouseMaintain" :addOrderParams="addOrderParams">
    </addHouse-maintain>

    <house-maintain-detail v-if="houseMaintainDetailVisible" @closeHouseMaintainDetail="closeHouseMaintainDetail" :fixedId="fixedId">
    </house-maintain-detail>

    <add-order v-if="addOrder" :addOrder="addOrder" @closeAddOrder="closeAddOrder" :addOrderParams="addOrderParams">
    </add-order>

    <order-detail v-if="detailVisible" :detailVisible="detailVisible" @closeDetail="closeDetail" :orderNo="orderNo">
    </order-detail>
  </section>
</template>
<script>
import { mapState } from 'vuex';
import AddHouseMaintain from './AddHouseMaintain'; // 新增维修
import HouseMaintainDetail from './HouseMaintainDetail'; // 维修 详情

import AddOrder from '../../../../components/OrderForm/AddOrder'; // 新增订单
import OrderDetail from '../../../../components/OrderForm/OrderDetail'; // 订单详情
export default {
  components: {
    AddOrder,
    OrderDetail,
    AddHouseMaintain,
    HouseMaintainDetail
  },

  props: ['filterParams'],

  data() {
    return {
      loading: true,
      flag: false,
      fixedId: '',
      houseMaintainDetailVisible: false,
      addHouseMaintainVisible: false,
      addOrder: false,
      addOrderParams: {},
      detailVisible: false,
      orderRoomSituation: {},
      title: '',
      DialogType: '',
      realHouseDialog: false,
      realhouseData: [
        {
          title: '大冲城市花园1号楼',
          houseList: [
            {
              roomNum: 10001,
              type: '1房2床',
              name: '李',
              source: '民宿',
              labels: '住'
            },
            {
              roomNum: 10002,
              type: '1房2床',
              name: '李',
              source: '民宿',
              labels: '住'
            }
          ]
        }
      ],
      currentPage: 1,
      pageSize: 10,
      searchKey: '',
      custOrPhone: '',
      managerId: '',
      roomCount: '',
      totalPage: 0
    };
  },

  mounted() {
    this.getRoomStatePackage();
  },

  watch: {

    filterParams(newVal) {
      this.totalPage = 0;
      this.currentPage = 1;
      this.searchKey = newVal.searchKey;
      this.custOrPhone = newVal.custOrPhone;
      this.managerId = newVal.managerId;
      this.roomCount = newVal.roomCount;
      this.getRoomStatePackage();
    },

    needRefresh(newVal) {
      if (newVal) {
        this.getRoomStatePackage('vuex');
      }
    }
  },
  computed: {
    ...mapState([
      'refreshHouseStatusS'
    ]),

    needRefresh() {
      return this.refreshHouseStatusS;
    }

  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.getRoomStatePackage();
    },
    handlePageChange(val) {
      this.currentPage = val;
      this.getRoomStatePackage();
    },

    // 请求实时房态打包数据
    getRoomStatePackage(vuex) {
      this.loading = true;
      let today = (new Date()).toLocaleDateString().replace(/\//g, '-');
      today = this.transferCouponValueTime(today, 0);

      this.$axios.get('security/order/queryGardenAndBuildingPage', {
        params: {
          startTime: today,
          endTime: today,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          searchKey: this.searchKey,
          custOrPhone: this.custOrPhone,
          managerId: this.managerId,
          roomCount: this.roomCount
        }
      })
        .then((res) => {
          // console.log(res, '---------------实时');
          this.loading = false;
          if (res.data.status === 'C0000') {
            const { result } = res.data;
            // 如果 vex === 'vuex',则是操作了需要刷新实时房态，则远期房态也要刷新
            if (vuex === 'vuex') {
              // true 是“实时”通知要改远期的
              this.$store.commit('handleisRealHose', true);

              this.$store.commit('handleRefreshHouseStatusS', false);
            }

            this.totalPage = result.pageCount;

            this.orderRoomSituation = JSON.parse(JSON.stringify(result));

            // const roomSituationList = this.orderRoomSituation.items;
            // let roomSituationCount = roomSituationList.length;

            // for (let i = 0; i < roomSituationCount; i++) {

            // }
            // console.log(this.orderRoomSituation.items.length, '=============');
          } else {
            this.$message({
              type: 'warning',
              message: res.data.message
            });
          }
        }).catch(err => {
          console.log(err);
          this.loading = false;
          this.$message.error(err.message || '服务器异常');
        });
    },

    // 处理请求的打包数据
    handleInitData(valArr) {
      let newValArr = [];
      let obj = {};
      valArr.forEach((item, index) => {
        this.$set(item, 'rowIndex', index);
        // 没信息的，先补充空房间数据
        if (item.stateList.length === 0) {
          item.stateList[0] = {
            roomId: item.roomId,
            roomNo: item.roomNo,
            roomCount: item.roomCount,
            bedCount: item.bedCount,
            roomState: '',
            columnIndex: 0
          };
        } else {
          this.$set(item.stateList[0], 'columnIndex', 0);
          this.$set(item.stateList[0], 'roomCount', item.roomCount);
          this.$set(item.stateList[0], 'bedCount', item.bedCount);
        }

        // 按楼栋补充房间
        const key = item.gardenName + item.buildingName;
        if (!obj[key]) {
          obj[key] = item;
        } else {
          this.$set(item.stateList[0], 'columnIndex', item.stateList[0].columnIndex + 1);
          obj[key].stateList.push(item.stateList[0]);
        }
      });

      Object.entries(obj).forEach((item) => {
        newValArr.push(item[1]);
      });
      // console.log(newValArr, '改造后的items');

      return newValArr;
    },

    // 打开 订单或者维修详情
    openDetail(list, j) {
      // console.log(list, '点击时的 传参');
      if (list.stateList.length === 0 || (list.stateList.length === 1 && list.stateList[0].roomState === 'FIXED' && list.stateList[0].isNotUseable === 'NO')) {
        return;
      }
      // else if (list.stateList.length > 1 && list.stateList[0].roomState === 'FIXED' && list.stateList[0].isNotUseable === 'NO') {
      //   this.orderNo = list.stateList[j].orderNo;
      //   this.detailVisible = true;
      //   return false;
      // }

      if (list.stateList[j].roomState !== '' && list.stateList[j].roomState !== null) {
        if (list.stateList[j].roomState === 'FIXED') {
          this.fixedId = list.stateList[j].fixedId;
          this.houseMaintainDetailVisible = true;
        } else {
          this.orderNo = list.stateList[j].orderNo;
          this.detailVisible = true;
        }
      }
    },

    // 关闭 维修详情
    closeHouseMaintainDetail() {
      this.houseMaintainDetailVisible = false;
    },

    // 关闭订单详情
    closeDetail(s) {
      this.detailVisible = false;
    },

    // 打开新增维修
    openManintain(obj, rowIndex) {
      // 如果 “stateList” 有值则是 维修可用，打开维修详情
      if (obj.stateList.length > 0) {
        this.fixedId = obj.stateList[0].fixedId;
        this.houseMaintainDetailVisible = true;
        return false;
      }
      let today = (new Date()).toLocaleDateString().replace(/\//g, '-');
      today = this.transferCouponValueTime(today, 0);

      this.addOrderParams = {
        roomId: obj.roomId,
        startTime: today,
        endTime: this.transferCouponValueTime(today, 1),
        type: 'RealHouse'
      };
      this.addHouseMaintainVisible = true;
    },

    // 关闭新增维修
    closeAddHouseMaintain() {
      this.addHouseMaintainVisible = false;
    },

    // 打开 新增订单 弹窗
    openAddOrder(obj, rowIndex) {
      let today = (new Date()).toLocaleDateString().replace(/\//g, '-');
      today = this.transferCouponValueTime(today, 0);

      this.addOrderParams = {
        roomId: obj.roomId,
        startTime: today,
        endTime: this.transferCouponValueTime(today, 1),
        type: 'RealHouse'
      };

      this.addOrder = true;

      // this.willBeReplaced = { ...obj, rowIndex };

      // console.log(this.willBeReplaced, ' 位置记录');
    },

    // 关闭 新增订单 弹窗
    closeAddOrder(obj) {
      this.addOrder = false;
      // if (obj && obj.type === 'RealHouse' && obj.status === 'success') { // 如果办理成功把数据插入到表格中
      //   let willBeReplaceObj = this.orderRoomSituation.items[this.willBeReplaced.rowIndex].stateList[this.willBeReplaced.columnIndex];

      //   Object.assign(willBeReplaceObj, obj.params, { roomState: obj.name, orderNo: obj.orderNo });
      //   willBeReplaceObj.custName = obj.params.custFormList[0].custName;
      //   console.log(obj, '===============', willBeReplaceObj);
      // }
      // this.willBeReplaced = {};
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
p {
  text-align: left;
  /* padding: 5px 0; */
}
.realhouse-box {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 30px;
}
.list-content {
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: auto;
}
.real-header {
  padding: 0 20px;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
  text-align: left;
  background-color: #fafafa;
}
.real-content {
  background-color: #fff;
}
/* .realhouse {
  margin-bottom: 20px;
} */

.list {
  overflow: hidden;
  list-style: none;
  padding: 20px;
  border-top: 1px solid #dddddd;
}
.list-item {
  float: left;
  width: 160px;
  text-align: center;
  height: 120px;
  /* line-height: 120px; */
  color: #666;
  font-size: 13px;
  transition: color 0.15s linear;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  margin-right: -1px;
  overflow: hidden;
  /* margin-bottom: -1px; */
}
.list-item:hover {
  cursor: pointer;
}
.item-content {
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
  position: relative;
}
.house-labels {
  padding-bottom: 10px;
  position: absolute;
  bottom: 5px;
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
}
.live {
  background-color: #008842;
}
.reserve {
  background-color: #d66666;
}
.repair {
  background-color: #4b83af;
}
.dirty {
  background-color: #b68d6e;
}
.handle-item {
  /* width: 80px; */
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.handle-item:hover {
  background-color: #eeeeee;
}
.el-popper {
  padding: 0 !important;
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
  background-color: #fafafa;
  box-sizing: border-box;
}
.hg-18 {
  line-height: 18px;
  height: 18px;
}
.pdb-5 {
  padding-bottom: 5px;
}
.bgc {
  /* 有状态下的 不需要背景色 */
  background-color: #eee;
}
</style>
