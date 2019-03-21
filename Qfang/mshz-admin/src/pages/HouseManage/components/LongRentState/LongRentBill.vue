<template>
  <section>
    <div class="dialog-box">
      <div class="pd-20 bgc-f">

        <h3 class="pdb-10">{{billDatas.gardenName}}，{{billDatas.building}}，{{billDatas.premisesNumber}} {{billDatas.roomChamber}}</h3>
        <el-row class="font-l">
          <el-col :span="12">
            <slot v-if="billDatas.billTypeEnum === 'FIRST_BILL'">
              {{billDatas.rentMoney}}元
              <span class="c-9 font-12">(租金)</span>
              <span v-if="billDatas.deposit"
                class="font-12">/{{billDatas.deposit}}元
                <span class="c-9">(押金)</span>
              </span>
            </slot>
            <slot v-else>
              <span class="font-12 c-9">账单周期：</span>{{billDatas.cycle}}
            </slot>
          </el-col>
          <el-col :span="12">
            <span class="font-12 c-9">客户：</span>
            <span v-if="billDatas.renter">{{billDatas.renter.renter}}
              <span class="c-9 font-12">({{billDatas.renter.phone}})</span>
            </span>
          </el-col>
        </el-row>
        <el-row class="font-l pdt-5">
          <el-col :span="12">
            <span class="font-12 c-9">收租日期：</span>{{billDatas.revenueDateDesc}}
          </el-col>
          <el-col :span="12">
            <span class="font-12 c-9">管家：</span>{{billDatas.seneschalName}}
            <span class="c-9 font-12">（{{billDatas.seneschalPhone}})</span>
          </el-col>
        </el-row>
      </div>
      <div class="bgceee">
        <el-row :gutter="20">
          <el-col :span="12">
            <div class="bgc-f bd-ddd bill-height">
              <el-row v-if="billDatas.rentMoney"
                class="font-14 bdb-ddd line-h-40">
                <el-col :span="4"
                  class="font-r">租金：</el-col>
                <el-col :span="7"
                  class="font-l pdl-20">{{billDatas.rentMoney}}元</el-col>
                <el-col :span="13"
                  class="c-9 font-12">{{billDatas.rentMoneyCycle}}</el-col>
              </el-row>
              <el-row v-if="billDatas.billTypeEnum === 'FIRST_BILL' && billDatas.deposit"
                class="font-14 bdb-ddd line-h-40">
                <el-col :span="4"
                  class="font-r">押金：</el-col>
                <el-col :span="7"
                  class="font-l pdl-20">{{billDatas.deposit}}元</el-col>
                <!-- <el-col :span="12"
                  class="c-9 font-12">{{billDatas.cycleDate}}</el-col> -->
              </el-row>
              <!-- <el-row v-if="billDatas.propertyMoney"
                class="font-14 bdb-ddd line-h-40">
                <el-col :span="4"
                  class="font-r">物业费：</el-col>
                <el-col :span="7"
                  class="font-l pdl-20">{{billDatas.propertyMoney}}元
                </el-col>
                <el-col v-if="propsLeaseType !== 'ENTIRE_RENT'"
                  :span="12"
                  class="c-9 font-12">
                  {{billDatas.propertyMoneyTotal}}元
                  <span v-if="billDatas.apportionmentCount">，{{billDatas.apportionmentCount}}间房间分摊</span>
                </el-col>
              </el-row> -->
              <el-row v-if="billDatas.billTypeEnum == 'FIRST_BILL' && billDatas.booking == true"
                class="font-14 bdb-ddd line-h-40">
                <el-col :span="4"
                  class="font-r">定金(抵扣)</el-col>
                <el-col :span="7"
                  class="font-l pdl-20">-{{billDatas.bookingMoney}}元</el-col>
                <el-col :span="13"
                  class="c-9 font-12">{{billDatas.bookingPaymentDateDesc}}收取</el-col>
              </el-row>

              <el-row v-if="billDatas.serviceFee"
                class="font-14 bdb-ddd line-h-40">
                <el-col :span="4"
                  class="font-r">服务费：</el-col>
                <el-col :span="7"
                  class="font-l pdl-20">{{billDatas.serviceFee}}元</el-col>
                <el-col :span="13"
                  class="c-9 font-12">月租金{{billDatas.serverFeeRatio}}%
                  <span class="inb pdl-ten">{{billDatas.serviceFeeMethodEnumDesc}}</span>
                  </el-col>
              </el-row>
              <el-row v-if="billDatas.promotionAmount > 0"
                class="font-14 bdb-ddd line-h-40">
                <el-col :span="4"
                  class="font-r">活动减免：</el-col>
                <el-col :span="7"
                  class="font-l pdl-20">-{{billDatas.promotionAmount}}元
                </el-col>
                <el-col :span="12"
                  class="c-9 font-12">
                  {{billDatas.promotionName}}
                </el-col>
              </el-row>
              <!-- <el-row v-if="billDatas.waterCharges"
                class="font-14 bdb-ddd line-h-40">
                <el-col :span="4"
                  class="font-r">水费：</el-col>
                <el-col :span="7"
                  class="font-l pdl-20">{{billDatas.waterCharges}}元
                </el-col>
                <el-col :span="13"
                  v-if="billDatas.meterReadingModel && propsLeaseType !== 'ENTIRE_RENT'"
                  class="c-9 font-12">
                  {{billDatas.meterReadingModel.waterUseDegree}}吨， {{billDatas.meterReadingModel.waterMoney}}元
                  <span v-if="billDatas.apportionmentCount">，{{billDatas.apportionmentCount}}间房间分摊</span>
                </el-col>
              </el-row>
              <el-row v-if="billDatas.gasCharges"
                class="font-14 bdb-ddd line-h-40">
                <el-col :span="4"
                  class="font-r">燃气：</el-col>
                <el-col :span="7"
                  class="font-l pdl-20">{{billDatas.gasCharges}}元
                </el-col>
                <el-col :span="13"
                  v-if="billDatas.meterReadingModel && propsLeaseType !== 'ENTIRE_RENT'"
                  class="c-9 font-12">
                  {{billDatas.meterReadingModel.gasUseDegree}}立方， {{billDatas.meterReadingModel.gasMoney}}元
                  <span v-if="billDatas.apportionmentCount">，{{billDatas.apportionmentCount}}间房间分摊</span>
                </el-col>
              </el-row>
              <el-row v-if="billDatas.electricCharges"
                class="font-14 bdb-ddd line-h-40">
                <el-col :span="4"
                  class="font-r">电费：</el-col>
                <el-col :span="7"
                  class="font-l pdl-20">{{billDatas.electricCharges}}元
                </el-col>
                <el-col :span="13"
                  v-if="billDatas.meterReadingModel && propsLeaseType !== 'ENTIRE_RENT'"
                  class="c-9 font-12">
                  {{billDatas.meterReadingModel.electricityUseDegree}}度， {{billDatas.meterReadingModel.electricityMoney}}元
                  <span v-if="billDatas.apportionmentCount">，{{billDatas.apportionmentCount}}间房间分摊</span>
                </el-col>
              </el-row> -->
              <el-row v-if="billDatas.broadbandMoney"
                class="font-14 bdb-ddd line-h-40">
                <el-col :span="4"
                  class="font-r">宽带：</el-col>
                <el-col :span="7"
                  class="font-l pdl-20">{{billDatas.broadbandMoney}}元
                </el-col>
                <el-col :span="13"
                  v-if="propsLeaseType !== 'ENTIRE_RENT'"
                  class="c-9 font-12">
                  {{billDatas.broadbandMoneyTotal}}元/月
                  <span v-if="billDatas.apportionmentCount">，{{billDatas.apportionmentCount}}间房间分摊</span>
                </el-col>
              </el-row>
              <el-row class="font-16 font-w line-h-40">
                <el-col :span="4"
                  class="font-r">合计：</el-col>
                <el-col :span="20"
                  class="font-l pdl-20">{{billDatas.totalPrice || 0}}元</el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="bgc-f bd-ddd h-280">
              <!-- 目前只做展示 -->
              <!-- <slot v-if="billType !== 'onlyView'">
                <el-form ref="billForm"
                  class="pd-20"
                  :model="billForm"
                  :rules="checkoutRules"
                  size="mini"
                  label-position="right"
                  label-width="90px">
                  <el-form-item label="支付方式："
                    prop="payChannelEnum">
                    <el-select v-model="billForm.payChannelEnum"
                      clearable>
                      <el-option label="微信"
                        value="WECHAT">
                      </el-option>
                      <el-option label="支付宝"
                        value="ALIPAY">
                      </el-option>
                      <el-option label="银行转账"
                        value="BANKTRANSFER">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="支付单号："
                    prop="payOrderNo">
                    <el-input placeholder="请输入支付或转账单号"
                      v-model="billForm.payOrderNo">
                    </el-input>
                  </el-form-item>
                  <el-form-item label="付款人："
                    prop="payPeople">
                    <el-select v-model="billForm.payPeople"
                      placeholder="请选择付款人"
                      clearable>
                      <el-option :label="item.renter"
                        :value="item.renter"
                        v-for="(item, index) in billDatas.renters"
                        :key="index"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="付款日期："
                    prop="payDate"
                    type="date"
                    size="mini">
                    <el-date-picker v-model="billForm.payDate"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      type="date">
                    </el-date-picker>
                  </el-form-item>
                </el-form>
              </slot> -->
              <slot>
                <el-row class="font-14 bdb-ddd line-h-40">
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
                <el-row v-if="billDatas.payee"
                  class="font-14 bdb-ddd line-h-40">
                  <el-col :span="5"
                    class="font-r">承租人：</el-col>
                  <el-col :span="16"
                    class="font-l pdl-20">{{billDatas.payee}}</el-col>
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
    <!-- <div class="dialog-footer"
      v-if="billType !== 'onlyView'">
      <el-button type="primary"
        :disabled="isCollection"
        @click="handleCollection"
        size="mini">确认收款</el-button>
      <el-button size="mini"
        @click="closeDialog">取 消</el-button>
    </div> -->
  </section>
</template>

<script>
export default {
  data() {
    return {
      requestId: '',
      isCollection: false,
      billForm: {
        billNo: '',
        payChannelEnum: '',
        payDate: '',
        payOrderNo: '',
        payPeople: ''
      },
      billDatas: {
        renter: {}
        // 'allDay': 0,
        // 'apportionmentCount': 0,
        // 'billFinanceStatus': 'string',
        // 'billNo': 'string',
        // 'billQueue': 0,
        // 'billSeneschalStatus': 'WAIT_COLLECTING_RENT',
        // 'billSeneschalStatusDesc': 'string',
        // 'broadbandMoney': 0,
        // 'building': 'string',
        // 'cycle': 'string',
        // 'cycleDate': 'string',
        // 'deposit': 0,
        // 'depositMoney': 0,
        // 'electricCharges': 0,
        // 'gardenName': 'string',
        // 'gasCharges': 0,
        // 'id': 'string',
        // 'leaseType': 'SHARED_RENT',
        // 'longOrderNo': 'string',
        // 'longSituationId': 'string',
        // 'meterReadingModel': {
        //   'billNo': 'string',
        //   'electricity': 0,
        //   'electricityMoney': 0,
        //   'electricityReadingTime': '2018-04-23T03:26:52.846Z',
        //   'electricityUseDegree': 0,
        //   'gas': 0,
        //   'gasMoney': 0,
        //   'gasReadingTime': '2018-04-23T03:26:52.846Z',
        //   'gasUseDegree': 0,
        //   'id': {},
        //   'longOrderNo': 'string',
        //   'water': 0,
        //   'waterMoney': 0,
        //   'waterReadingTime': '2018-04-23T03:26:52.846Z',
        //   'waterUseDegree': 0
        // },
        // 'payChannelEnum': 'WECHAT',
        // 'payMethodEnum': 'MONTH_PAY',
        // 'payee': 'string',
        // 'paymentDate': '2018-04-23T03:26:52.846Z',
        // 'paymentNumber': 'string',
        // 'premisesNumber': 'string',
        // 'propertyMoney': 0,
        // 'rentMoney': 0,
        // 'rentMoneyCycle': 'string',
        // 'renters': [
        //   {
        //     'certType': 'IDCARD',
        //     'certTyprDesc': 'string',
        //     'id': 'string',
        //     'idCard': 'string',
        //     'phone': 'string',
        //     'renter': 'string'
        //   }
        // ],
        // 'revenueDate': 0,
        // 'revenueDateDesc': 'string',
        // 'roomChamber': 'string',
        // 'roomId': 'string',
        // 'roomLongChamberId': 'string',
        // 'selfDay': 0,
        // 'seneschalName': 'string',
        // 'seneschalPhone': 'string',
        // 'serviceFee': 0,
        // 'totalPrice': 0,
        // 'waterCharges': 0
      },
      checkoutRules: {
        payChannelEnum: [{ required: true, message: '请选择方式', trigger: 'change' }],
        payPeople: [{ required: true, message: '请选择收付款人', trigger: 'change' }],
        payOrderNo: [
          { required: true, message: '请输入支付单号', trigger: 'blur' }
        ],
        payDate: [
          { required: true, message: '请输入付款日期', trigger: 'blur' }
        ]
      }
    };
  },
  props: {
    billNo: {
      type: String,
      default: ''
    },
    // 查看的账单类型：RENT_BILL 租金账单，EXTRA_BILL 生活账单
    billType: {
      type: String,
      default: 'RENT_BILL'
    },
    // 哪个组件调用
    source: {
      type: String
    },
    // 订单id
    orderNo: {
      type: String
    },
    // 该房源是 合租还是整租
    propsLeaseType: {
      type: String
    }
  },
  created() {
    if (this.source === 'houseDetail') {
      this.requestUrl = '/security/longOrder/selectTenantBillByNo';
      this.requestId = this.billNo;
    } else if (this.source === 'houseStatus') {
      this.requestUrl = '/security/longOrder/selectUncollectedBillDetail';
      this.requestId = this.orderNo;
    }
    this.requestData();
  },
  methods: {
    // /security/longOrder/selectCurrentUncollectedBill 当前未收账单基本信息
    // /security/longOrder/selectUncollectedBillDetail 用于房态操作收款
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
          // if (!res.data.result) {
          //   this.$message.error('无该账单数据');
          // } else {
          // }
          this.isCollection = true;
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log(err);
      });
    },

    // requestCurrentData() {
    //   this.$axios.get(
    //     '/security/longOrder/selectCurrentUncollectedBill',
    //     {
    //       params: {
    //         id: this.orderNo
    //       }
    //     }
    //   ).then((res) => {
    //     if (res.data.result && res.data.status === 'C0000') {
    //     } else {
    //       this.$message.error(res.data.message);
    //     }
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    // },

    handleCollection() {
      this.billForm.billNo = this.billDatas.billNo;
      this.$refs.billForm.validate((valid) => {
        if (valid) {
          this.$axios.post(
            '/security/longOrder/confirmRentCollection',
            this.billForm
          ).then((res) => {
            if (res.data.status === 'C0000') {
              this.$message.success('操作成功');
              if (this.source === 'houseDetail') {
                if (this.propsLeaseType === 'ENTIRE_RENT') {
                  this.$store.commit('freshenLREntireHouseStataus', true);
                } else {
                  this.$store.commit('freshenLRJointHouseStataus', true);
                }
              } else {
                this.$emit('refreshData');
              }
              this.closeDialog();
            } else {
              this.isCollection = true;
              this.$message.error(res.data.message);
            }
          }).catch(err => {
            this.$message.error('服务异常');
            console.log(err);
          });
        } else {
          // console.log('error submit!!');
          this.$message.warning('请完善表单信息');
          return false;
        }
      });
    },

    closeDialog() {
      this.$emit('closeDialog', 'LongRentBill');
    }
  },
  components: {

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
