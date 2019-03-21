<template>
  <section class="realhouse-box"
    v-loading="loading">
    <div class="custom-header">
      <div class="btn"
        @click="turnPage(-29)">
        <i class="icon iconfont icon-zuojiantou"></i>
      </div>
      <div class="date-container">
        <el-date-picker @change="datePickerChange"
          v-model="datePicker"
          :picker-options="pickerOptions"
          :clearable="false"
          format="MM-dd"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="日期"
          size="mini">
        </el-date-picker>
      </div>
      ~
      <div class="c-9">
        {{datePickerTwo}}
      </div>
      <div class="btn"
        @click="turnPage(29)">
        <i class="icon iconfont icon-youjiantou"></i>
      </div>
    </div>

    <el-table height="100%"
      class="talbe-box"
      :data="orderRoomSituation.items"
      header-align="center"
      :span-method="arraySpanMethod"
      border
      style="width: 100%;"
      :highlight-current-row="false">
      <el-table-column width="120"
        label="楼盘名"
        fixed>
        <template slot-scope="scope">
          <div class="fixed-left">
            <p class="c-0 font-12"> {{scope.row.gardenName}}</p>
            <p class="c-9 font-12"> {{scope.row.buildingName}}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="100"
        label="房号"
        fixed>
        <template slot-scope="scope">
          <div class="fixed-left">
            <p class="font-bold-18"> {{scope.row.roomNo}}</p>
            <p class="c-9 font-14">
              <span> {{scope.row.roomCount}}房</span>
              <span> {{scope.row.bedCount}}床</span>
            </p>
          </div>
        </template>
      </el-table-column>

      <el-table-column v-for="(item,index) in dateArr"
        :key="index"
        :label="item.date"
        min-width="120"
        :render-header="renderHeader">
        <template slot-scope="scope">
          <el-popover :disabled="(scope.row.stateList[index].roomState === 'FIXED' && scope.row.stateList[index].isNotUseable === 'YES') || scope.row.stateList[index].roomState !== ''&&scope.row.stateList[index].roomState !== 'FIXED' || new Date(scope.row.stateList[index].recordTime).getTime() < today || new Date(scope.row.stateList[index].recordTime).getTime() > ninetyDay"
            placement="bottom"
            trigger="click"
            popper-class="Hstate-poper"
            :open-delay="200">
            <div class="item-content"
              :class="{bgc:(scope.row.stateList[index].roomState==='FIXED' && scope.row.stateList[index].isNotUseable==='YES')|| new Date(scope.row.stateList[index].recordTime).getTime() < yestodayTime || new Date(scope.row.stateList[index].recordTime).getTime() > ninetyDay,'left-border':scope.column.label=== ymdToday}"
              slot="reference"
              @click="toggleSelected(scope,index)">
              <p class="font-12 font-w hg-18 ellips"
                :title="scope.row.stateList[index].custName">
                {{ scope.row.stateList[index].custName }}
              </p>

              <p class="font-default hg-18"> {{ scope.row.stateList[index].orderChannelDesc }}</p>
              <div class="house-labels">
                <span class="label-item reserve"
                  v-if="scope.row.stateList[index].roomState==='BOOKED'">{{'预'}}</span>
                <span class="label-item live"
                  v-if="scope.row.stateList[index].roomState==='CHECKED_IN'">{{'住'}}</span>
                <span class="label-item repair"
                  v-if="scope.row.stateList[index].roomState==='FIXED'">{{'修'}}</span>

              </div>
            </div>
            <ul v-if="checkPermission('ORDER_EDIT')">
              <li class="handle-item"
                @click="handleBook(scope.row.stateList[index],'book')">预定</li>
              <li class="handle-item"
                @click="handleBook(scope.row.stateList[index],'book')">入住</li>
              <li class="handle-item"
                @click="handleBook(scope.row.stateList[index],'fixed')">维修</li>
            </ul>
          </el-popover>
        </template>

      </el-table-column>

    </el-table>

    <div class="btm">
      <div class="ored-pagination border-ddd">
        <el-pagination @size-change="handleSizeChange"
          @current-change="handlePageChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="orderRoomSituation.recordCount">
        </el-pagination>
      </div>
    </div>

    <add-house-maintain v-if="addHouseMaintainVisible"
      @closeAddHouseMaintain="closeAddHouseMaintain"
      :addOrderParams="addOrderParams">
    </add-house-maintain>

    <house-maintain-detail v-if="houseMaintainDetailVisible"
      @closeHouseMaintainDetail="closeHouseMaintainDetail"
      :fixedId="fixedId">
    </house-maintain-detail>

    <add-order v-if="addOrder"
      :addOrder="addOrder"
      @closeAddOrder="closeAddOrder"
      :addOrderParams="addOrderParams">
    </add-order>

    <Order-detail v-if="detailVisible"
      :detailVisible="detailVisible"
      @closeDetail="closeDetail"
      :orderNo="orderNo"
      :overdue="overdue">
    </Order-detail>

  </section>
</template>

<script>
import { mapState } from 'vuex';
import AddHouseMaintain from './AddHouseMaintain'; // 新增 维修
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
    let today = (new Date()).toLocaleDateString();

    const yestoday = this.transferCouponValueTime(today, -1);
    const ninetyDay = this.transferCouponValueTime(today, 90);
    return {
      loading: true,
      today: new Date(today).getTime(),
      yestodayTime: new Date(yestoday).getTime(),
      ymdToday: this.transferCouponValueTime(today, 0), // yyyy-MM-dd
      ninetyDay: new Date(ninetyDay).getTime(),
      datePicker: yestoday,
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }
        ]
      },
      fixedId: '',
      addHouseMaintainVisible: false,
      houseMaintainDetailVisible: false,
      currentPage: 1,
      pageSize: 10,
      searchKey: '',
      custOrPhone: '',
      managerId: '',
      roomCount: '',
      totalPage: 0,
      detailVisible: false,
      addOrderParams: {}, // 传给新增订单和新增维修 弹窗的参数
      addOrder: false,
      cancelOrder: false,
      selectedArr: [],
      dateArr: [],
      firstSelect: {
        rowIndex: '',
        columnLabel: '',
        firstSelectFlag: false
      },
      orderRoomSituation: {},
      HouseMaintainParams: {},
      isRange: false,
      overdue: false,
      dragging: null
    };
  },

  mounted() {
    this.initDateArr();

    this.getRoomStatePackage();
  },
  activated() {
    // console.log(this.refreshHouseStatusF);
    if (this.isRealHose) {
      this.getRoomStatePackage('isRealHose');
    }
  },

  watch: {
    filterParams(newVal) {
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
      'refreshHouseStatusF',
      'isRealHose'
    ]),
    datePickerTwo: {
      get() {
        return this.transferCouponValueTime(this.datePicker, 29).substring(5, 10);
      }
    },

    needRefresh() {
      return this.refreshHouseStatusF;
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

    // 初始化表头日期数据
    initDateArr(start) { // start 参数：如果不传，则默认是 昨天
      let today = (new Date()).toLocaleDateString();
      today = this.transferCouponValueTime(today, 0);

      const yestoday = this.transferCouponValueTime(today, -1);

      this.dateArr = [];

      if (!start) {
        start = yestoday;
      }

      for (let i = 0; i < 30; i++) {
        const itemDate = this.transferCouponValueTime(start, i);
        if (itemDate === today) {
          this.dateArr.push({
            date: itemDate,
            room: 0,
            week: this.transferWeek(today),
            special: '今天'
          });
        } else if (itemDate === yestoday) {
          this.dateArr.push({
            date: itemDate,
            room: 0,
            week: this.transferWeek(yestoday),
            special: '昨天'
          });
        } else {
          this.dateArr.push({
            date: itemDate,
            room: 0,
            week: this.transferWeek(itemDate),
            special: ''
          });
        }
      }

      this.startday = this.dateArr[0].date;
      this.endDay = this.dateArr[this.dateArr.length - 1].date;
    },

    // 获取远期房态 表格 数据
    getRoomStatePackage(vuex) {
      this.loading = true;
      this.$axios.get('security/order/queryRoomStatePackage', {
        params: {
          startTime: this.startday,
          endTime: this.endDay,
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          searchKey: this.searchKey,
          custOrPhone: this.custOrPhone,
          managerId: this.managerId,
          roomCount: this.roomCount
        }
      })
        .then((res) => {
          // console.log(res, '-----------------远期');
          this.loading = false;
          if (res.data.status === 'C0000') {
            if (vuex === 'vuex') {
              this.$store.commit('handleRefreshHouseStatusF', false);
            } else if (vuex === 'isRealHose') {
              // “实时房态通知刷新的”
              this.$store.commit('handleisRealHose', false);
            }
            const { result } = res.data;

            if (!result || result.page.items.length === 0) {
              this.$message({
                type: 'warning',
                message: '筛选无结果！'
              });
              return false;
            }

            this.dateArr.forEach((item, index) => {
              // 计算表头剩下的房间数
              if (result.headCount[item.date]) {
                item.room = result.page.recordCount - result.headCount[item.date];
              } else {
                item.room = result.page.recordCount;
              }
            });

            this.orderRoomSituation = JSON.parse(JSON.stringify(result.page));
            const myItems = this.handleInitData(this.orderRoomSituation.items);
            this.$set(this.orderRoomSituation, 'items', myItems);
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

    handleInitData(needInitArr) {
      const finalArr = JSON.parse(JSON.stringify(needInitArr));
      // 几套房
      const outLen = needInitArr.length;
      // 30个自制空数据
      const dateLen = this.dateArr.length;
      for (let i = 0; i < outLen; i++) {
        // 把房间对应的 状态清空
        finalArr[i].stateList = [];

        for (let j = 0; j < dateLen; j++) {
          // 每个房间每天的状态初始值
          let itemTemp = {
            price: needInitArr[i].price,
            priceWeekend: needInitArr[i].priceWeekend,
            recordTime: this.dateArr[j].date,
            roomState: '',
            roomId: needInitArr[i].roomId,
            roomNo: needInitArr[i].roomNo,
            rowIndex: i, // 行号
            i: j // 排除左侧固定两列开始的列号
          };
          // 获取对应房间请求回来的状态列表
          const myStateList = needInitArr[i].stateList;
          const inLen = myStateList.length;
          // 遍历请求回来的状态表
          for (let k = 0; k < inLen; k++) {
            // if (myStateList[k].recordCount === 0) {
            //   myStateList[k].recordCount = 1;
            // }
            // 房态数据日期 = 空状态日期
            if (myStateList[k].recordTime === this.dateArr[j].date) {
              // let hoseStates = itemTemp.roomState;
              // 房态列表对应的索引合并
              itemTemp = Object.assign(itemTemp, myStateList[k]);

              // 如果房源是 ”维修可用“，被”入住“或是”预定“了，远期房态就展示”入住“，或”预定“，就覆盖掉”维修“
              // if (hoseStates !== '' && hoseStates !== itemTemp.roomState) {
              //   if (hoseStates === 'BOOKED' || hoseStates === 'CHECKED_IN') {
              //     itemTemp.roomState = hoseStates;
              //   }
              // }
              // console.log(itemTemp);
            }
          }
          // 添加“状态”数据
          // finalArr[i].stateList.push(JSON.parse(JSON.stringify(itemTemp)));
          finalArr[i].stateList.push(itemTemp);
        }
      }
      // console.log(finalArr);
      return finalArr;
    },

    // 计算valueTime天后的日期
    transferCouponValueTime(startDate, valueTime) {
      const date = new Date(startDate);
      const newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + valueTime);
      const year2 = newDate.getFullYear();
      const month2 = newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1;
      const day2 = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
      return year2 + '-' + month2 + '-' + day2;
    },

    // 转换是周几
    transferWeek(value) {
      const date = new Date(value);
      const week = date.getDay();
      let str;
      switch (week) {
        case 1:
          str = '一';
          break;
        case 2:
          str = '二';
          break;
        case 3:
          str = '三';
          break;
        case 4:
          str = '四';
          break;
        case 5:
          str = '五';
          break;
        case 6:
          str = '六';
          break;
        default:
          str = '日';
      }
      return '周' + str;
    },

    renderHeader(createElement, { column, $index }) {
      return createElement(
        'div',
        {

          style: {
            padding: 0,
            height: '60px',
            'border-left': column.label === this.ymdToday ? '1px solid #999' : ''
          }
        },
        [
          createElement('p', {

            style: {
              height: '20px',
              textAlign: 'center',
              width: '120px',
              fontSize: '12px'
            }
          },
            [
              this.dateArr[$index - 2] && this.dateArr[$index - 2].special
                ? this.dateArr[$index - 2].special + '（' + this.dateArr[$index - 2].week + '）'
                : column.label.substring(5, 10) + '（' + this.dateArr[$index - 2].week + '）'
            ]
          ),

          createElement('p', {
            style: {
              height: '30px',
              textAlign: 'center',
              width: '120px',
              fontSize: '12px',
              color: '#666'
            }
          },
            [
              this.dateArr[$index - 2] ? '剩余' + this.dateArr[$index - 2].room + '间' : '剩余' + ' ' + '间'
            ])
        ]
      );
    },

    datePickerChange(val) {
      this.initDateArr(val);
      this.getRoomStatePackage();
    },

    turnPage(x) {
      this.datePicker = this.transferCouponValueTime(this.datePicker, x);
      this.initDateArr(this.datePicker);
      this.getRoomStatePackage();
    },

    // 选中房态的格子
    toggleSelected(scope, i) {
      const selectNow = scope.row.stateList[i]; // 当前选中的对象
      // console.log(selectNow);
      const selectTime = new Date(scope.column.label).getTime();
      if (selectTime < this.yestodayTime || selectTime > this.ninetyDay) {
        this.overdue = true;
        if (!selectNow.roomState.trim().length > 0) {
          this.$message({
            message: '所选日期不在可预定时间范围内',
            type: 'error'
          });
          return;
        }
      } else {
        this.overdue = false;
      }
      if (selectNow.roomState) {
        if (selectNow.roomState === 'FIXED' && selectNow.isNotUseable && selectNow.isNotUseable === 'YES') {
          this.openManintainDetail(selectNow);
          return;
        }
        // 维修状态 可用
        // if (selectNow.roomState === 'FIXED' && selectNow.isNotUseable && selectNow.isNotUseable === 'NO') {
        //   this.handleBook(selectNow, 'book');
        //   return;
        // }
        if (selectNow.roomState === 'BOOKED') {
          this.openDetail(selectNow);
          return;
        }
        if (selectNow.roomState === 'CHECKED_IN') {
          this.openDetail(selectNow);
        }
      }
    },

    // 合并单元格
    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex > 1) {
        const rowObj = row.stateList[columnIndex - 2];
        // console.log(rowObj.roomNo, rowObj.roomState, rowObj.recordCount);
        // (rowObj.roomState === 'FIXED' && rowObj.isNotUseable === 'YES') ||
        // 维修可用，多天不合并
        if (rowObj.roomState !== '' && rowObj.roomState !== 'FIXED') {
          if (rowObj.recordStartTime === rowObj.recordTime) {
            return [1, rowObj.recordCount];
          } else if (rowObj.startTime !== rowObj.recordTime) {
            return [0, 0];
          }
        }
      }
    },

    openHouseInfo(i, roomNum) {
      console.log(i, roomNum);
    },

    // popover 打开新增订单,或者新增维修
    handleBook(obj, type) {
      // console.log(obj, '点击的对象');

      this.addOrderParams = {
        roomId: obj.roomId,
        startTime: obj.recordTime,
        endTime: this.transferCouponValueTime(obj.recordTime, 1)
      };

      if (type === 'book') {
        this.addOrder = true;
      } else if (type === 'fixed') {
        if (obj.roomState === 'FIXED' && obj.isNotUseable && obj.isNotUseable === 'NO') {
          this.fixedId = obj.fixedId;
          this.houseMaintainDetailVisible = true;
          return;
        }
        this.addHouseMaintainVisible = true;
      }
    },

    // 关闭新增订单
    closeAddOrder(obj) {
      this.addOrder = false;
    },

    // 关闭新增房屋维修
    closeAddHouseMaintain() {
      this.addHouseMaintainVisible = false;
    },

    // 打开 维修详情
    openManintainDetail(obj) {
      this.fixedId = obj.fixedId;
      this.houseMaintainDetailVisible = true;
    },

    // 关闭 维修详情
    closeHouseMaintainDetail(s) {
      this.houseMaintainDetailVisible = false;
      if (s === 'success') {
        this.getRoomStatePackage();
      }
    },

    openDetail(data) {
      this.orderNo = data.orderNo;
      this.detailVisible = true;
    },
    closeDetail(s) {
      this.detailVisible = false;
    }
  }

};
</script>

<style scoped>
.custom-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 220px;
  height: 60px;
  box-sizing: border-box;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  z-index: 999;
  background-color: #fff;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}
.btn {
  width: 25px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
.btn:hover {
  cursor: pointer;
}
.date-container {
  width: 100px;
}
.talbe-box {
  width: 100%;
  height: 100%;
  border: none;
}
.arrow {
  color: red;
}
.arrow:hover {
  cursor: pointer;
}
.bgc {
  /* 有状态下的 不需要背景色 */
  background-color: #eee;
}
.titlePR {
  padding-right: 15px;
  color: red;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
  right: 10px;
  bottom: 10px;
  height: 16px;
}
.table {
  position: relative;
  background-color: #4b83af;
  height: 400px;
}
.range-title {
  position: absolute;
  top: 0;
  left: 0;
  width: 220px;
  height: 60px;
  line-height: 60px;
}
.range {
  position: absolute;
  top: 0;
  left: 220px;
  height: 60px;
  display: flex;
  line-height: 60px;
}
.range-item {
  width: 120px;
  height: 60px;
  background-color: #d66666;
}
.table-left {
  position: absolute;
  top: 60px;
  left: 0;
  display: flex;
  width: 220px;
  height: 240px;
  justify-content: space-around;
  align-items: center;
}
.table-right {
  position: absolute;
  top: 60px;
  left: 220px;
  width: 1080px;
  height: 300px;
  overflow: hidden;
  overflow: auto;
}
.main-item {
  width: 120px;
  height: 80px;
}

.realhouse-box {
  border: 1px solid #ddd;
  position: relative;
  height: 100%;
  padding-bottom: 30px;
  box-sizing: border-box;
}
.realhouse-box >>> .el-table td > .cell {
  height: auto;
}
.table-container {
  position: relative;
  margin: 20px 20px 0 20px;
  padding-bottom: 50px;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #dddddd;
  background-color: #eeeeee;
}
.real-header {
  padding: 0 20px;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  text-align: left;
  background-color: #fafafa;
}
.real-content {
  padding: 10px;
  background-color: #fff;
}
.realhouse {
  margin-bottom: 20px;
}

.list {
  overflow: hidden;
  list-style: none;
  padding: 0;
  border-left: 1px solid #dddddd;
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
  border-right: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  box-sizing: border-box;
  margin-right: -1px;
  overflow: hidden;
  /* margin-bottom: -1px; */
}
.item-content {
  position: relative;
  height: 80px;
  padding: 10px;
  /* margin: 2px; */
}
.item-content:hover {
  background-color: #dbffe7;
  cursor: pointer;
}
.house-labels {
  /* padding-bottom: 10px; */
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
  background-color: #eee;
  cursor: pointer;
}
.el-popper {
  padding: 0 !important;
}

.talbe-box>>>.el-table__row td .cell {
  padding: 0;
}
.talbe-box>>>tbody .el-table__row td {
  padding: 0;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}
.talbe-box>>>.el-table__header th {
  padding: 0;
  height: 60px;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background-color: #fafafa;
}

.talbe-box>>>.el-table__header th .cell {
  padding: 0;
  height: 59px;
}

.fixed-left {
  background-color: #fafafa;
  height: 80px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
.left-border {
  border-left: 1px solid #999;
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
.poper {
  widows: 190px;
}
/* .poper */
.el-popper[x-placement^="bottom"] {
  margin-top: 0px;
}
.w-100 {
  width: 100%;
}
</style>
