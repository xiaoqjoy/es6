<template>
  <div class="house_out">
    <div class="house_out_header">
      <h3 class="font-18">出房预估</h3>
      <p>结果根据通用核算模型计算，只供参考</p>
    </div>
    <div v-if="Object.keys(reckonData).length"
      class="profit-box">
      <slot v-if="checkPermission('ROOM_CAL_HIGH')">
        <div class="content-item">
          <span class="content-item-label">
            <span class="content-item-label-justify">总租期</span>：</span>
          <span class="font-w">{{reckonData.lease || '--'}}月</span>
        </div>
        <div class="content-item flex-between">
          <div>
            <span class="content-item-label">
              <span class="content-item-label-justify">回收期</span>：</span>
            <span class="font-w">{{isFinite(reckonData.payback) && Math.round(reckonData.payback) || '--'}}月</span>
            <span class="font-w">（{{isFinite(reckonData.paybackPer) && (reckonData.paybackPer * 100).toFixed(2) || '--'}}%）</span>
          </div>
          <div>
            <span v-if="reckonData.paybackPerPass"
              class="c-green">
              <i class="el-icon-success"></i>
            </span>
            <i v-else
              class="el-icon-warning c-red"></i>
          </div>
        </div>
        <div class="content-item flex-between">
          <div>
            <span class="content-item-label">
              <span class="content-item-label-justify">租差率</span>：</span>
            <span class="font-w">{{(reckonData.rent * 100).toFixed(2) || '--'}}%</span>
          </div>

          <!-- <div>
            <span v-if="reckonData.rentPass"
              class="c-green">
              <i class="el-icon-success"></i>
            </span>
            <i v-else
              class="el-icon-warning c-red"></i>
          </div> -->
        </div>
        <div class="content-item">
          <span class="content-item-label">
            <span class="content-item-label-justify">投资回报率</span>：</span>
          <span class="font-w">{{(reckonData.invest * 100).toFixed(2) || '--'}}%</span>
        </div>
        <div class="content-item">
          <span class="content-item-label">
            <span class="content-item-label-justify">毛利润率</span>：</span>
          <span class="font-w">{{(reckonData.mprofit * 100).toFixed(2) || '--'}}%</span>
        </div>
        <div class="content-item flex-between">
          <div>
            <span class="content-item-label">
              <span class="content-item-label-justify">净利润率</span>：</span>
            <span class="font-w">{{(reckonData.jprofit * 100).toFixed(2) || '--'}}%</span>
          </div>
          <span>
            <span v-if="reckonData.jprofitPass"
              class="c-green">
              <i class="el-icon-success"></i>
            </span>
            <i v-else
              class="el-icon-warning c-red"></i>
          </span>
        </div>
      </slot>

      <slot v-else>
        <div class="content-item">
          <span class="content-item-label">
            <span class="content-item-label-justify">回收期</span>：</span>
          <span v-if="reckonData.paybackPerPass"
            class="c-green font-w">通过</span>
          <span v-else
            class="c-red font-w">未通过</span>
        </div>
        <div class="content-item">
          <span class="content-item-label">
            <span class="content-item-label-justify">净利润率</span>：</span>
          <span v-if="reckonData.jprofitPass"
            class="c-green font-w">通过</span>
          <span v-else
            class="c-red font-w">未通过</span>
        </div>
      </slot>
    </div>
    <div v-else
      class="profit">

      <div class="font-16 c-9">
        暂无测算结果
      </div>
      <!-- <div class="profit_item">
        <h4 class="font-24">{{getProfit}}</h4>
        <p class="font-12">毛利润</p>
      </div>
      <div class="profit_item">
        <h4 class="font-24">{{recoverTime}}</h4>
        <p class="font-12">成本回收周期</p>
      </div> -->
    </div>
    <div class="count_profit">
      <p class="content-item">
        <span class="content-item-label">
          <span class="content-item-label-justify">出租方式</span>：</span>
        <span class="font-b">{{houseInfo.chambersTypeDesc}}</span>
      </p>
      <p class="content-item clearfix">
        <span class="content-item-label">
          <span class="content-item-label-justify">出房价</span>：</span>
        <span class="font-b">{{houseInfo.expectHousePrice}}元/月</span>
        <span class="collapse_span"
          v-if="houseInfo.chambersType==='SHARED_RENT'&&houseInfo.chamberList.length">
          <a class="float-r collapse_a"
            @click="isShow=!isShow">{{isShow?'收起':'展开'}}
            <i class="el-icon-arrow-right"
              :class="{active:isShow}"></i>
          </a>
        </span>
      </p>
      <collapse-transition v-if="houseInfo.chambersType==='SHARED_RENT'">
        <div class="collapse_div"
          v-show="isShow">
          <p class="content-item"
            v-for="(v,k) in houseInfo.chamberList"
            v-if="v.canPublish"
            :key="k">
            <span class="content-item-label">
              <span class="content-item-label-justify">{{v.name}}</span>：</span>
            <span class="content-item-label-right">
              <b>{{v.expectRoomPrice}}元/月</b>
              <span class="wrap-span"
                v-if="countStr(v)">
                （
                <span class="details-span"
                  :title="countStr(v)">{{countStr(v)}}</span> ）
              </span>
            </span>
          </p>
        </div>
      </collapse-transition>
    </div>
  </div>
</template>

<script>
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      isShow: true,
      // 赋上测试默认值，
      reckonData: {
        invest: 0,
        jprofit: 0,
        jprofitPass: false,
        jprofitStandard: 0,
        lease: 0,
        mprofit: 0,
        payback: 0,
        paybackPer: 0,
        paybackPerPass: false,
        paybackPerStandard: 0,
        rent: 0,
        rentPerPerStandard: 0
      },
      compartmentCount: 0
    };
  },
  props: ['houseInfo'],
  created() {
  },

  computed: {
    ...mapState([
      'userInfo'
    ]),
    // 毛利润
    getProfit() {
      let proift = Math.round((this.houseInfo.expectHousePrice - this.houseInfo.leaseholdModel.rentMoney) / this.houseInfo.leaseholdModel.rentMoney * 100);
      return isFinite(proift) ? (proift + '%') : '未知';
    },
    // 回收成本周期
    recoverTime() {
      let time = Math.round(this.houseInfo.leaseholdModel.expectDecorationCost / (this.houseInfo.expectHousePrice - this.houseInfo.leaseholdModel.rentMoney));
      return isFinite(time) ? (time + '个月') : '未知';
    }
  },
  components: { CollapseTransition },
  methods: {
    handleSelectCompartState(val) {
      switch (val) {
        case 'ONE_COMPARTMENT':
          this.compartmentCount = 1;
          break;
        case 'TWO_COMPARTMENT':
          this.compartmentCount = 2;
          break;
        default:
          this.compartmentCount = 0;
      }
    },
    handleReckon() {
      let { leaseholdModel } = this.houseInfo;
      let houseRentIncrease = [];
      let increaseDataList = [];
      this.handleSelectCompartState(leaseholdModel.compartState);
      if (Object.keys(leaseholdModel.leasePriceRateDesc).length) {
        // 租金递增设置正常情况下。
        increaseDataList = Object.values(leaseholdModel.leasePriceRateDesc)[0].split(',');
        increaseDataList.unshift(0);

        // 如果 租金递增的值，与租期不对应。
        if (increaseDataList.length < leaseholdModel.leaseDays) {
          let interpolation = leaseholdModel.leaseDays - increaseDataList.length;
          for (let j = 0; j < interpolation; j++) {
            increaseDataList.push(0);
          }
        }
      } else {
        for (let j = 0; j < leaseholdModel.leaseDays; j++) {
          increaseDataList.push(0);
        }
      }
      if (Object.keys(this.houseInfo.leaseholdModel.leasePriceRateDesc)[0] === 'RADIO_INCREASE') {
        for (let i = 0; i < increaseDataList.length; i++) {
          if (i === 0) {
            houseRentIncrease[i] = +this.houseInfo.leaseholdModel.rentMoney;
            continue;
          }
          houseRentIncrease[i] = +(houseRentIncrease[i - 1] * (1 + increaseDataList[i] / 100)).toFixed(2);
        }
      } else {
        for (let i = 0; i < increaseDataList.length; i++) {
          if (i === 0) {
            houseRentIncrease[i] = +this.houseInfo.leaseholdModel.rentMoney;
            continue;
          }
          houseRentIncrease[i] = (+houseRentIncrease[i - 1]) + (+increaseDataList[i]);
        }
      }
      let reckOnUrl;
      if (this.checkPermission('ROOM_CAL_HIGH')) {
        reckOnUrl = '/security/room/manage/cashCalRoomHigh';
      } else {
        reckOnUrl = '/security/room/manage/cashCalRoom';
      }
      this.$axios.post(reckOnUrl, {
        area: this.houseInfo.area || 0,
        decorateDay: this.houseInfo.leaseholdModel.decorateDays || 0,
        houseRentIncrease: houseRentIncrease,
        // decorateLevel: 'THREE' || 0,
        decoration: this.houseInfo.decoration,
        houseDepose: this.houseInfo.leaseholdModel.depositMoney || 0,
        // houseInYear: this.houseInfo.area || 0,
        houseRent: this.houseInfo.leaseholdModel.rentMoney || 0,
        houseTime: this.houseInfo.leaseholdModel.leaseDays || 0,
        n: this.houseInfo.leaseholdModel.leaseDays || 0,
        rent: this.houseInfo.expectHousePrice || 0,
        rentFreeDay: this.houseInfo.leaseholdModel.rentFreeDays || 0,
        roomCount: (+this.houseInfo.bedRoom) + (+this.compartmentCount) || 0
      }).then((res) => {
        // console.log(res);
        if (res.data.status === 'C0000') {
          const { result } = res.data;
          this.reckonData = result || {};
          // console.log(isFinite(this.reckonData.payback));
          this.reckonDialog = true;
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.$message.error(err.message || '服务异常！！');
      });
    },

    countStr(v) {
      let str = '';
      if (v.area) {
        str = v.area + '㎡';
      }
      if (v.attachedChamberDesc.length) {
        str += ',' + v.attachedChamberDesc.join(',');
      }
      return str;
    }
  },
  watch: {
    houseInfo: {
      deep: true,
      handler(val, oldVal) {
        this.handleReckon();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.house_out {
  padding: 20px 10px 20px 20px;
  .content-item {
    font-size: 12px;
    display: flex;
    .content-item-label {
      width: auto;
      .content-item-label-justify {
        display: inline-block;
        width: 62px;
        text-align: justify;
        text-align-last: justify;
      }
    }
    .content-item-label-right {
      color: #999;
      flex: 1;
      display: flex;
      b {
        color: #333;
        font-weight: 400;
      }
      .wrap-span {
        flex: 1;
        display: flex;
        max-width: 110px;
      }
      .details-span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .house_out_header {
    h3 {
      color: #333;
      margin-bottom: 10px;
    }
    p {
      font-size: 12px;
      color: #999;
    }
  }
  .profit-box {
    padding: 20px 0;
    margin: 20px 0;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
  }
  .profit {
    padding: 20px 0;
    margin: 20px 0;
    border: 1px solid #e5e5e5;
    border-left: none;
    border-right: none;
    display: flex;
    align-items: center;
    justify-content: center;
    .profit_item {
      text-align: center;
      padding: 0 25px;
      &:first-child {
        border-right: 1px solid #e5e5e5;
      }
      h4 {
        color: #fa5555;
        margin-bottom: 5px;
      }
      p {
        color: #666;
      }
    }
  }
  .count_profit {
    .font-b {
      font-weight: bold;
    }
    .collapse_span {
      flex: 1;
      text-align: right;
    }
    .collapse_a {
      color: #137ebb;
      font-size: 12px;
      cursor: pointer;
      user-select: none;
    }
    .el-icon-arrow-right {
      transition: all 0.2s;
      &.active {
        transform: rotate(90deg);
      }
    }
  }
}
</style>

