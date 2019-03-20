<template>
  <el-dialog title="抄表详情" :visible.sync='MeterReadDialog' :close-on-click-modal="false" width="950px">
    <section class="meter-details-dialog">
      <div class="dialog-header">
        <el-row type="flex" justify="space-between">
          <el-col :span="12">
            <p class="font-18">{{meterReadInfo.gardenName}}-{{meterReadInfo.buildingName}}-{{meterReadInfo.roomNumber}}</p>
          </el-col>
          <el-col :span="4" class="font-r">
            <a class="slide-btn" :class="{active:showDetails}" @click="showDetails=!showDetails">
              <i class="el-icon-arrow-down"></i>
            </a>
          </el-col>
        </el-row>
        <CollapseTransition>
          <div class="fixed-details-div" v-show="showDetails">
            <div class="pd-20">
              <el-table :data="publishDetailsData" height="109px" border size="mini">
                <el-table-column :width="100" prop="title" align="center">
                </el-table-column>
                <el-table-column label="电（读表数）" prop="electricity" :min-width="100" align="center">
                </el-table-column>
                <el-table-column label="水（读表数）" prop="water" :min-width="100" align="center">
                </el-table-column>
                <el-table-column label="燃气（读表数）" prop="gas" :min-width="100" align="center">
                </el-table-column>
                <el-table-column label="录入时间" prop="meterTimeDesc" :min-width="100" align="center">
                </el-table-column>
                <el-table-column label="抄表人" prop="meterName" :min-width="100" align="center">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </CollapseTransition>
      </div>
      <div class="dialog-box">
        <div class="dialog-body">
          <div class="model-border">
            <header class="model-header">
              <span>抄表明细</span>
            </header>
            <div>
              <el-table :data="extraDetailsData" border size="mini">
                <el-table-column label="类型" prop="type" :min-width="60" align="center">
                </el-table-column>
                <el-table-column label="计费时段" :min-width="150" align="center">
                  <template slot-scope="scope">
                    <span>{{scope.row.startDesc+'-'+scope.row.endDesc}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="上次读表" prop="last" :min-width="100" align="center" />
                <el-table-column label="本次读表" prop="current" :min-width="100" align="center" />
                <el-table-column label="使用数" prop="useDegree" :min-width="100" align="center">
                </el-table-column>
                <el-table-column label="费用" prop="money" :min-width="100" align="center">
                  <!-- <template slot-scope="scope">
                    <span>{{scope.row.money}}元</span>
                  </template> -->
                </el-table-column>
                <el-table-column label="抄表人" prop="people" :min-width="100" align="center">
                </el-table-column>
                <el-table-column label="录入时间" prop="readingTime" :min-width="100" align="center">
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="model-border">
            <header class="model-header">
              <span>分摊明细（{{meterReadInfo.longLeaseType==='SHARED_RENT'?'合租':'整租'}}）</span>
            </header>
            <div v-if="chargeDetailsData.length">
              <el-table :data="chargeDetailsData" border size="mini">
                <el-table-column label="类型" fixed prop="type" :width="80" align="center">
                </el-table-column>
                <el-table-column v-for="(v,k) in apportionItem" :key="k" :render-header="renderHeader" :label="v.title" :min-width="100" align="center">
                  <el-table-column label="天数" :prop="'day'+k" align="center"></el-table-column>
                  <el-table-column label="分摊金额" :prop="'money'+k" class-name="c-red" align="center">
                    <!-- <template slot-scope="scope">
                      <span class="c-red">{{scope.row['money'+k]}}</span>
                    </template> -->
                  </el-table-column>
                </el-table-column>
              </el-table>
              <div class="remark-div" v-if="meterReadInfo.longLeaseType==='SHARED_RENT'">
                <span class="c-red">注：</span>分摊公式=（费用金额 - 发房抄表前费用 - 退租已扣费用）／（计费时段内所有卧室居住天数之和）× 计费时段内卧室居住天数。 </div>
              <div class="remark-div" v-else-if="meterReadInfo.longLeaseType==='ENTIRE_RENT'">
                <span class="c-red">注：</span>分摊公式=费用金额 - 发布抄表费用 - 退租已扣费用。 </div>
            </div>
            <div v-else class="font-c pdv-20">
              <p>计费时段内房源空置或房源设置了免收生活费用</p>
            </div>
          </div>
        </div>
      </div>
      <div class="dialog-footer" v-if="extraModel.extraBillStatus==='WAIT_GENERATED'">
        <el-button type="primary" size="mini" @click="createBill">生成账单</el-button>
      </div>
    </section>
  </el-dialog>
</template>
<script>
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
export default {
  name: 'MeterReadDetails',
  data() {
    return {
      showDetails: false, // 下拉抄表展开
      meterReadInfo: {},
      apportionItem: [], // 分摊明细数据
      incomeRoomMeter: {}, // 交房数据
      outRoomMeter: {}, // 发布数据
      extraModel: {}
    };
  },
  components: { CollapseTransition },
  props: {
    value: Boolean,
    id: String
  },
  computed: {
    MeterReadDialog: {
      set(val) {
        this.$emit('input', val);
      },
      get() {
        return this.value;
      }
    },
    // 抄表明细
    extraDetailsData() {
      let extraModel = this.extraModel;
      let newList = [];
      if (extraModel.electricityMoney !== null) {
        newList.push({
          type: '电',
          startDesc: extraModel.electricityReadingStartDesc,
          endDesc: extraModel.electricityReadingEndDesc,
          last: extraModel.lastElectricity || '/',
          current: extraModel.electricity || '/',
          useDegree: extraModel.electricityUseDegree === null ? '/' : (extraModel.electricityUseDegree + '度'),
          money: extraModel.electricityMoney === null ? '/' : (extraModel.electricityMoney + '元'),
          people: extraModel.electricityPeople || '/',
          readingTime: extraModel.electricityReadingTimeDesc || '/'
        });
      }
      if (extraModel.waterMoney !== null) {
        newList.push({
          type: '水',
          startDesc: extraModel.waterReadingStartDesc,
          endDesc: extraModel.waterReadingEndDesc,
          last: extraModel.lastWater || '/',
          current: extraModel.water || '/',
          useDegree: extraModel.waterUseDegree === null ? '/' : (extraModel.waterUseDegree + '吨'),
          money: extraModel.waterMoney === null ? '/' : (extraModel.waterMoney + '元'),
          people: extraModel.waterPeople || '/',
          readingTime: extraModel.waterReadingTimeDesc || '/'
        });
      }
      if (extraModel.gasMoney !== null) {
        newList.push({
          type: '燃气',
          startDesc: extraModel.gasReadingStartDesc,
          endDesc: extraModel.gasReadingEndDesc,
          last: extraModel.lastGas || '/',
          current: extraModel.gas || '/',
          useDegree: extraModel.gasUseDegree === null ? '/' : (extraModel.gasUseDegree + '立方'),
          money: extraModel.gasMoney === null ? '/' : (extraModel.gasMoney + '元'),
          people: extraModel.gasPeople || '/',
          readingTime: extraModel.gasReadingTimeDesc || '/'
        });
      }
      return newList;
    },
    // 分摊明细
    chargeDetailsData() {
      let apportionItem = this.apportionItem;
      let newList = [];
      let electricityDays = {};
      let electricityMoneys = {};
      let gasDays = {};
      let gasMoneys = {};
      let waterDays = {};
      let waterMoneys = {};
      let totalMoneys = {};
      let isElectricity = false;
      let isWater = false;
      let isGas = false;
      apportionItem.forEach((e, i) => {
        if (e.electricityMoney !== null) {
          isElectricity = true;
        }
        if (e.waterMoney !== null) {
          isWater = true;
        }
        if (e.gasMoney !== null) {
          isGas = true;
        }
        electricityDays['day' + i] = e.electricityDay || '/';
        electricityMoneys['money' + i] = e.electricityMoney === null ? '/' : e.electricityMoney;
        gasDays['day' + i] = e.gasDay || '/';
        gasMoneys['money' + i] = e.gasMoney === null ? '/' : e.gasMoney;
        waterDays['day' + i] = e.waterDay || '/';
        waterMoneys['money' + i] = e.waterMoney === null ? '/' : e.waterMoney;
        totalMoneys['money' + i] = e.totalMoney || '/';
      });
      isElectricity && newList.push(Object.assign({ type: '电费' }, electricityDays, electricityMoneys));
      isWater && newList.push(Object.assign({ type: '水费' }, waterDays, waterMoneys));
      isGas && newList.push(Object.assign({ type: '燃气费' }, gasDays, gasMoneys));
      if (isElectricity || isWater || isGas) {
        newList.push(Object.assign({ type: '合计' }, totalMoneys));
      }
      return newList;
    },
    // 发布明细
    publishDetailsData() {
      if (Object.keys(this.incomeRoomMeter).length) {
        this.incomeRoomMeter.title = '交房抄表';
        this.incomeRoomMeter.electricity = this.incomeRoomMeter.electricity === null ? '/' : this.incomeRoomMeter.electricity;
        this.incomeRoomMeter.gas = this.incomeRoomMeter.gas === null ? '/' : this.incomeRoomMeter.gas;
        this.incomeRoomMeter.water = this.incomeRoomMeter.water === null ? '/' : this.incomeRoomMeter.water;
        this.outRoomMeter.title = '发布抄表';
        this.outRoomMeter.electricity = this.outRoomMeter.electricity === null ? '/' : this.outRoomMeter.electricity;
        this.outRoomMeter.gas = this.outRoomMeter.gas === null ? '/' : this.outRoomMeter.gas;
        this.outRoomMeter.water = this.outRoomMeter.water === null ? '/' : this.outRoomMeter.water;
        return [this.incomeRoomMeter, this.outRoomMeter];
      } else {
        return [];
      }
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.showDetails = false;
        this.getMeterReadInfo();
      }
    }
  },
  methods: {
    // 获取详情数据
    getMeterReadInfo() {
      this.$axios.get('/security/extraBill/extraRecordDetails', {
        params: {
          id: this.id
        }
      }).then((res) => {
        if (res.data.status === 'C0000') {
          let { apportionItem, extraModel, incomeRoomMeter, outRoomMeter } = res.data.result;
          this.apportionItem = apportionItem || [];
          this.extraModel = extraModel || {};
          this.incomeRoomMeter = incomeRoomMeter || {};
          this.outRoomMeter = outRoomMeter || {};
          this.meterReadInfo = res.data.result;
        } else {
          this.apportionItem = [];
          this.extraModel = {};
          this.meterReadInfo = {};
          this.incomeRoomMeter = {};
          this.outRoomMeter = {};
          this.$message.error(res.data.message);
        }
      });
    },
    // 分摊明细表头
    renderHeader(h, { column, $index }) {
      let row = this.apportionItem[$index - 1];
      let rentStatus;
      if (row.rentStatus) {
        rentStatus = (<span class="c-9">（{row.rentStatus}）</span>);
      }
      return (<p>{row.title}{rentStatus}</p>);
    },
    // 生成账单
    createBill() {
      let extraModel = this.extraModel;
      let apportionItem = this.apportionItem;
      let msg = '';
      if (apportionItem.length === 0) {
        msg = '房源为空置状态或所有类型的生活费都已设置为免收，没有账单可以生成，确定要完成抄表吗？';
      } else {
        if (extraModel.electricityMoney !== null && extraModel.waterMoney !== null && extraModel.gasMoney !== null) {
          msg = '生成账单后，本月抄表将不可以修改，并会自动发送账单给租客，确定要生成账单吗？';
        } else {
          let strAry = [];
          if (extraModel.electricityMoney === null) {
            strAry.push('电费');
          }
          if (extraModel.waterMoney === null) {
            strAry.push('水费');
          }
          if (extraModel.gasMoney === null) {
            strAry.push('燃气费');
          }
          msg = '当前房源本月' + strAry.join('，') + '未完成抄表，生成账单后，本月不能再进行抄表，并会自动发送账单给租客，确定要生成账单吗？';
        }
      }
      this.$confirm(msg, '生成账单', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            this.$axios.post('/security/extraBill/createExtraBill', {}, {
              params: {
                id: this.id
              }
            }).then(res => {
              if (res.data.status === 'C0000') {
                this.$message.success('生成账单成功');
                this.$emit('refreshData');
                this.MeterReadDialog = false;
                done();
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            done();
          }
        }
      });
    }
  }
};
</script>
<style lang="scss">
.meter-details-dialog {
  .dialog-box {
    background: #eee;
  }
  .dialog-header {
    padding: 20px;
    background: #fff;
    line-height: 18px;
    position: relative;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 100;
    p.font-18 {
      line-height: 24px;
    }
    .slide-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #ccc;
      color: #fff;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        opacity: 0.8;
      }
      &.active {
        transform: rotate(-180deg);
      }
    }
  }
  .dialog-body {
    margin: 10px;
    background: #fff;
    padding: 10px 0;
    .model-border {
      padding: 0 20px;
      border: none;
      margin: 0 0 20px;
      height: 100%;
      display: flex;
      flex-direction: column;
      .model-header {
        padding: 0;
        text-align: left;
        font-weight: 600;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #dddddd;
        color: #333;
        background: #fff;
        font-size: 14px;
        margin-bottom: 20px;
      }
    }
  }
  .remark-div {
    margin-top: 15px;
    font-size: 12px;
  }
  .fixed-details-div {
    position: absolute;
    width: 100%;
    left: 0;
    top: 64px;
    background: #fff;
    z-index: 100;
    border-top: 1px solid #eee;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }
  .el-table__header {
    .c-red {
      color: #000;
    }
  }
  .el-table__footer {
    .c-red {
      color: #d66666;
    }
  }
}
</style>

