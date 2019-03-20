<template>
  <el-dialog title="测算结果"
    top="20vh"
    width="420px"
    append-to-body
    @closed="reckonData={}"
    :close-on-clcik-modal="false"
    :visible.sync="reckonDialog">
    <div class="pd-20">
      <slot v-if="checkPermission('ROOM_CAL_HIGH')">
        <div class="line-h-50 bdb-dashed">
          <span class="content-item-label">总租期：</span>
          <span class="font-w">{{reckonData.lease || '--'}} 月</span>
        </div>
        <div class="line-h-50 bdb-dashed flex-between">
          <span>
            <span class="content-item-label">回收期：</span>
            <span class="font-w">
              {{reckonData.payback && Math.round(reckonData.payback) || '--'}}月 （{{ reckonData.paybackPer && (reckonData.paybackPer * 100).toFixed(2) || '--'}}%）
            </span>
          </span>

          <el-tooltip effect="dark"
            :content="'回收期占比通过标准：小于' + (reckonData.paybackPerStandard * 100).toFixed(2) +'%'"
            placement="top">
            <el-tag v-if="reckonData.paybackPerPass"
              type="success">
              <i class="el-icon-success"></i> 通过
            </el-tag>
            <el-tag v-else
              type="danger">
              <i class="el-icon-warning"></i>
              未通过
            </el-tag>
          </el-tooltip>
        </div>
        <div class="line-h-50 bdb-dashed">
          <span class="content-item-label">租差率：</span>
          <span class="font-w">
            {{reckonData.rent && (reckonData.rent * 100).toFixed(2) || '--'}}%
          </span>
        </div>
        <div class="line-h-50 bdb-dashed">
          <span class="content-item-label">投资回报率：</span>
          <span class="font-w">
            {{ reckonData.invest && (reckonData.invest * 100).toFixed(2) || '--'}}%
          </span>
        </div>
        <div class="line-h-50 bdb-dashed">
          <span class="content-item-label">毛利润率：</span>
          <span class="font-w">
            {{ reckonData.mprofit && (reckonData.mprofit * 100).toFixed(2) || '--'}}%
          </span>
        </div>
        <div class="line-h-50 bdb-dashed flex-between">
          <span>
            <span class="content-item-label">净利润率：</span>
            <span class="font-w">
              {{ reckonData.jprofit && (reckonData.jprofit * 100).toFixed(2) || '--'}}%
            </span>
          </span>

          <el-tooltip class="item"
            effect="dark"
            :content="'净利润率通过标准：大于' + (reckonData.jprofitStandard * 100).toFixed(2) +'%'"
            placement="top">
            <el-tag v-if="reckonData.jprofitPass"
              type="success">
              <i class="el-icon-success"></i> 通过
            </el-tag>
            <el-tag v-else
              type="danger">
              <i class="el-icon-warning"></i>
              未通过
            </el-tag>
          </el-tooltip>
        </div>
      </slot>
      <slot v-else>
        <div class="line-h-50 bdb-dashed">
          <span>
            <span class="content-item-label">回收期：</span>
          </span>
          <el-tag v-if="reckonData.paybackPerPass"
            type="success">
            <i class="el-icon-success"></i> 通过
          </el-tag>
          <el-tag v-else
            type="danger">
            <i class="el-icon-warning"></i>
            未通过
          </el-tag>
        </div>
        <div class="line-h-50 bdb-dashed">
          <span>
            <span class="content-item-label">净利润率：</span>
          </span>
          <el-tag v-if="reckonData.jprofitPass"
            type="success">
            <i class="el-icon-success"></i> 通过
          </el-tag>
          <el-tag v-else
            type="danger">
            <i class="el-icon-warning"></i>
            未通过
          </el-tag>
        </div>
      </slot>
    </div>
    <div class="dialog-footer">
      <el-button type="primary"
        size="mini"
        :loading="auditting"
        @click="handleAudit">{{auditting? '执行中...' : '确定提交'}}
      </el-button>
      <el-button size="mini"
        @click="clouseReckon">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      reckonDialog: false,
      auditting: false,
      reckonData: {}
    };
  },
  props: {
    houseInfo: {
      type: Object,
      required: true,
      default: () => ({})
    },
    compartmentCount: {
      type: Number,
      default: 0
    }
  },

  methods: {

    // 提价测算
    handleReckon() {
      let { leaseholdModel } = this.houseInfo;
      let houseRentIncrease = [];
      let increaseDataList = [];
      if (Object.keys(leaseholdModel.leasePriceRateDesc).length) {
        // 租金递增设置正常情况下。
        let leaseDesc = Object.values(leaseholdModel.leasePriceRateDesc)[0] || '';
        increaseDataList = (leaseDesc && leaseDesc.split(',')) || [];
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

      // 百分比递增
      if (Object.keys(leaseholdModel.leasePriceRateDesc)[0] === 'RADIO_INCREASE') {
        for (let i = 0; i < increaseDataList.length; i++) {
          if (i === 0) {
            houseRentIncrease[i] = +leaseholdModel.rentMoney;
            continue;
          }
          houseRentIncrease[i] = +(houseRentIncrease[i - 1] * (1 + increaseDataList[i] / 100)).toFixed(2);
        }
      } else {
        // 现金递增
        for (let i = 0; i < increaseDataList.length; i++) {
          if (i === 0) {
            houseRentIncrease[i] = +leaseholdModel.rentMoney;
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
        // decorateLevel: 'THREE' || 0,
        houseRentIncrease: houseRentIncrease,
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
          this.reckonDialog = true;
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.$message.error(err.message || '服务异常！！');
      });
    },

    clouseReckon() {
      this.$emit('handleCancelRequest');
      this.reckonData = {};
      this.reckonDialog = false;
    },
    handleAudit() {
      this.$emit('handleAuditHouse');
    }

  }
};
</script>
<style scoped>
.bdb-dashed {
  border-bottom: 1px dashed #ddd;
}
</style>


