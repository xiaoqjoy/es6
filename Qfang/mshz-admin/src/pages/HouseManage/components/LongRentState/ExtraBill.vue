<template>
  <section>
    <div class="dialog-box">
      <div class="pd-20 bgc-f">
        <h3 class="pdb-10">{{billDatas.gardenName}}，{{billDatas.buildingName}}，{{billDatas.roomNumber}} {{billDatas.chamberNumber}}</h3>

        <el-row class="font-l">
          <el-col :span="12">
            <span class="font-12 c-9">账单编号：</span>{{billNo}}
          </el-col>
          <el-col :span="12">
            <span class="font-12 c-9">状态：</span>
            <span :class="{'c-green' : billDatas.billSeneschalStatus === 'ALREADY_COLLECTING_RENT', 'c-red' :billDatas.billSeneschalStatus !== 'ALREADY_COLLECTING_RENT'}">{{billDatas.billSeneschalEnumDesc}}</span>
          </el-col>
        </el-row>
        <el-row class="font-l pdt-5">
          <el-col :span="12">
            <span class="font-12 c-9">账单生成日：</span>{{billDatas.createDateDesc}}
          </el-col>
          <el-col :span="12">
            <span class="font-12 c-9">客户：</span>
            <span>{{billDatas.renter.renter}}
              <span class="c-9 font-12">({{billDatas.renter.phone}})</span>
            </span>
          </el-col>
        </el-row>
      </div>
      <div class="bgceee">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="bgc-f bd-ddd bill-height">
              <el-row v-if="billDatas.waterMoney"
                class="font-14 bdb-ddd line-h-40">
                <el-col :span="4"
                  class="font-r">水费：</el-col>
                <el-col :span="7"
                  class="font-l pdl-20">{{billDatas.waterMoney}}元</el-col>
                <el-col :span="13"
                  class="c-9 font-12">计费时段：{{billDatas.extraModel.waterReadingStartDesc}} ~ {{billDatas.extraModel.waterReadingEndDesc}}</el-col>
              </el-row>
              <el-row v-if="billDatas.electricityMoney"
                class="font-14 bdb-ddd line-h-40">
                <el-col :span="4"
                  class="font-r">电费：</el-col>
                <el-col :span="7"
                  class="font-l pdl-20">{{billDatas.electricityMoney}}元</el-col>
                <el-col :span="13"
                  class="c-9 font-12">计费时段：{{billDatas.extraModel.electricityReadingStartDesc}} ~ {{billDatas.extraModel.electricityReadingEndDesc}}</el-col>
              </el-row>
              <el-row v-if="billDatas.gasMoney"
                class="font-14 bdb-ddd line-h-40">
                <el-col :span="4"
                  class="font-r">燃气：</el-col>
                <el-col :span="7"
                  class="font-l pdl-20">{{billDatas.gasMoney}}元</el-col>
                <el-col :span="13"
                  class="c-9 font-12">计费时段：{{billDatas.extraModel.gasReadingStartDesc}} ~ {{billDatas.extraModel.gasReadingEndDesc}}</el-col>
              </el-row>
              <el-row class="font-16 font-w line-h-40">
                <el-col :span="4"
                  class="font-r">合计：</el-col>
                <el-col :span="6"
                  class="font-l pdl-20 c-green">{{billDatas.totalPrice || 0}}元</el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="bgc-f bd-ddd h-280">
              <slot>
                <el-row v-if="billDatas.payMethodEnumDesc"
                  class="font-14 bdb-ddd line-h-40">
                  <el-col :span="5"
                    class="font-r">支付方式：</el-col>
                  <el-col :span="16"
                    class="font-l pdl-20">{{billDatas.payMethodEnumDesc}}</el-col>
                </el-row>
                <el-row v-if="billDatas.payChannelEnum"
                  class="font-14 bdb-ddd line-h-40">
                  <el-col :span="5"
                    class="font-r">支付渠道：</el-col>
                  <el-col :span="16"
                    class="font-l pdl-20">
                    <span v-if="billDatas.payChannelEnum === 'WECHAT'">微信
                    </span>
                    <span v-else-if="billDatas.payChannelEnum === 'ALIPAY'">支付宝
                    </span>
                    <span v-else>银行转账
                    </span>
                    <!-- <span label="银行转账"
                      value="BANKTRANSFER">
                    </span> -->
                  </el-col>
                </el-row>
                <el-row v-if="billDatas.paymentNumber"
                  class="font-14 bdb-ddd line-h-40">
                  <el-col :span="5"
                    class="font-r">支付单号：</el-col>
                  <el-col :span="16"
                    class="font-l pdl-20">{{billDatas.paymentNumber}}</el-col>
                </el-row>
                <el-row v-if="billDatas.paymentPeople"
                  class="font-14 bdb-ddd line-h-40">
                  <el-col :span="5"
                    class="font-r">承租人：</el-col>
                  <el-col :span="16"
                    class="font-l pdl-20">{{billDatas.paymentPeople}}</el-col>
                </el-row>
                <el-row v-if="billDatas.paymentDate"
                  class="font-14 bdb-ddd line-h-40">
                  <el-col :span="5"
                    class="font-r">付款日期：</el-col>
                  <el-col :span="16"
                    class="font-l pdl-20">{{(new Date(billDatas.paymentDate)).toLocaleDateString().replace(/\//g, '-')}}</el-col>
                </el-row>
              </slot>

            </div>
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
      requestId: '',
      isCollection: false,
      billDatas: {
        renter: {}
      }
    };
  },
  props: {
    billNo: {
      type: String,
      default: ''
    }
  },
  created() {
    this.requestUrl = '/security/extraBill/selectExtraBillDetails';
    this.requestId = this.billNo;
    this.requestData();
  },
  methods: {
    requestData() {
      this.$axios.get(
        this.requestUrl,
        {
          params: {
            id: this.requestId
          }
        }
      ).then((res) => {
        // longSituationList里的longChamberId关联longChamberList的id
        if (res.data.result && res.data.status === 'C0000') {
          this.billDatas = res.data.result;
        } else {
          this.isCollection = true;
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  }
};
</script>

<style scoped>
div.dialog-box {
  height: auto;
}
.bill-height {
  min-height: 280px;
}
.h-280 {
  height: 280px;
  box-sizing: border-box;
}
</style>
