<template>
  <el-dialog title="账单详情" :visible.sync='LivingBillDetails' :close-on-click-modal="false" width="950px">
    <section class="bill-details-dialog">
      <div class="dialog-header">
        <el-row type="flex" justify="space-between">
          <el-col :span="12">
            <p class="font-18">{{billInfo.gardenName}}-{{billInfo.buildingName}}-{{billInfo.roomNumber}}</p>
          </el-col>
          <el-col :span="4" class="font-r">
            <p class="status">{{billInfo.billSeneschalEnumDesc}}</p>
          </el-col>
        </el-row>
      </div>
      <div class="dialog-box">
        <div class="dialog-body">
          <div class="model-border">
            <div class="info-box">
              <el-row :gutter="10">
                <el-col :span="8">
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">账单编号</span>：</span>{{billInfo.billNo}}
                  </p>
                </el-col>
                <el-col :span="8">
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">账单生成</span>：</span>{{billInfo.createDateDesc}}
                  </p>
                </el-col>
                <el-col :span="8">
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">租客</span>：</span> <span v-if="billInfo.renter">{{billInfo.renter.renter}}{{billInfo.renter.phone?'（'+billInfo.renter.phone+'）':''}}</span>
                  </p>
                </el-col>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="8">
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">支付渠道</span>：</span>{{billInfo.payChannelEnumDesc}}
                  </p>
                </el-col>
                <el-col :span="8">
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">支付单号</span>：</span>{{billInfo.paymentNumber}}
                  </p>
                </el-col>
                <el-col :span="8">
                  <p class="content-item">
                    <span class="content-item-label">
                      <span class="content-item-label-justify">支付时间</span>：</span>{{billInfo.payDateDesc}}
                  </p>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="model-border">
            <div>
              <el-table :data="chargeDetailsData" border size="mini">
                <el-table-column label="账单金额" prop="type" :width="80" align="center">
                </el-table-column>
                <el-table-column :label="billInfo.totalPrice+'元'" label-class-name="c-red font-w" prop="money" :width="120" align="center">
                </el-table-column>
                <el-table-column align="left" label="计费时段">
                  <template slot-scope="scope">
                    <span>{{scope.row.startDesc+'-'+scope.row.endDesc}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div v-if="billInfo.billSeneschalStatus === 'ALREADY_CLOSE_BILL'" class="model-border">
            <div class="model-header">账单关闭原因</div>
            <div class="pd-20">
            {{billInfo.closeCause}}
            </div>
          </div>
        </div>
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
      showDetails: false,
      billInfo: {
        renter: {}
      },
      extraModel: {}
    };
  },
  components: { CollapseTransition },
  props: {
    value: Boolean,
    id: String
  },
  computed: {
    LivingBillDetails: {
      set(val) {
        this.$emit('input', val);
      },
      get() {
        return this.value;
      }
    },
    chargeDetailsData() {
      let extraModel = this.extraModel;
      let billInfo = this.billInfo;
      let newList = [];
      if (billInfo.electricityMoney !== null) {
        newList.push({
          type: '电费',
          startDesc: extraModel.electricityReadingStartDesc,
          endDesc: extraModel.electricityReadingEndDesc,
          money: billInfo.electricityMoney + '元'
        });
      }
      if (billInfo.waterMoney !== null) {
        newList.push({
          type: '水费',
          startDesc: extraModel.waterReadingStartDesc,
          endDesc: extraModel.waterReadingEndDesc,
          money: billInfo.waterMoney + '元'
        });
      }
      if (billInfo.gasMoney !== null) {
        newList.push({
          type: '燃气费',
          startDesc: extraModel.gasReadingStartDesc,
          endDesc: extraModel.gasReadingEndDesc,
          money: billInfo.gasMoney + '元'
        });
      }
      return newList;
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.getBillInfo();
      }
    }
  },
  methods: {
    getBillInfo() {
      this.$axios.get('/security/extraBill/selectExtraBillDetails', {
        params: {
          id: this.id
        }
      }).then((res) => {
        if (res.data.status === 'C0000') {
          this.billInfo = res.data.result;
          this.extraModel = res.data.result.extraModel;
        } else {
          this.extraModel = {};
          this.billInfo = {};
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.$message.error(err.message || '账单服务异常！');
        console.log(err);
      });
    }
  }
};
</script>
<style lang="scss">
.bill-details-dialog {
  .dialog-box {
    background: #eee;
  }
  .dialog-header {
    padding: 20px;
    background: #fff;
    line-height: 18px;
    position: relative;
    p.status {
      color: #fa5555;
    }
  }
  .dialog-body {
    margin: 10px;
    background: #fff;
    padding: 20px 0 10px 0;
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
  .content-item {
    font-size: 12px;
    .content-item-label {
      width: auto;
      .content-item-label-justify {
        display: inline-block;
        width: 48px;
        text-align: justify;
        text-align-last: justify;
      }
    }
  }
}
</style>

