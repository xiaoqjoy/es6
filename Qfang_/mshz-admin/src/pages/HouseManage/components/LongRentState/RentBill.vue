<template>
  <section>
    <div class="dialog-box">
      <div class="pd-20 bgc-f">
        <h3 class="pdb-10">{{bill.gardenName}}，{{bill.building}}，{{bill.premisesNumber}} {{bill.roomChamber}}</h3>
        <el-row class="font-l">
          <el-col :span="12">
            <span class="font-12 c-9">账单周期：</span>{{ bill.bookingBillCycle }}
          </el-col>
          <el-col :span="12">
            <span class="font-12 c-9">客户：</span>{{ bill.customerName }}
          </el-col>
        </el-row>
        <el-row class="font-l pdt-5">
          <el-col :span="12">
            <span class="font-12 c-9">收租日期：</span>{{ bill.deadline }}
            <span v-if="bill.payNumber == ''"
              class="collect">(待收取)</span>
          </el-col>
          <el-col :span="12">
            <span class="font-12 c-9">管家：</span>{{ manager.managerName || (bill.bookingManager &&bill.bookingManager.managerName)}}
            <span class="c-9 font-12">{{ manager.managerPhone || (bill.bookingManager && bill.bookingManager.managerPhone)}}</span>
          </el-col>
        </el-row>
      </div>

      <div class="bgceee">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-col class="myli">
              <span class="c-9">定金：</span>
              <span>{{ bill.money }}元</span>
            </el-col>
            <el-col class="myli">
              <span>合计：</span>
              <span class="collect">{{bill.money || 0}}元</span>
            </el-col>
          </el-col>
          <el-col :span="12"
            v-if="bill.payNumber !== ''">
            <el-col class="myli">
              <span class="c-9">支付渠道：</span>
              <span>{{ bill.payChannelDesc }}</span>
            </el-col>
            <el-col class="myli break-all">
              <span class="c-9">支付单号：</span>
              <span>{{ bill.payNumber }}</span>
            </el-col>
            <el-col class="myli">
              <span class="c-9">客户：</span>
              <span>{{ bill.customerName }}</span>
            </el-col>
            <el-col class="myli">
              <span class="c-9">付款日期：</span>
              <span>{{ bill.paymentTimeDesc }}</span>
            </el-col>
          </el-col>
        </el-row>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    bill: {
      type: Object,
      default: () => {
        return {};
      }
    },
    manager: {
      type: String,
      default: ''
    }
  },
  created() {
  },
  methods: {
  }
};
</script>

<style scoped>
.collect {
  color: #ff9b07;
}
div.dialog-box {
  height: auto;
}

.myli {
  border-bottom: 1px solid #eeeeee;
  background-color: #fff;
  height: 40px;
  line-height: 40px;
}
</style>
