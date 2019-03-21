<template>
  <section>
    <div class="dialog-box">
      <div class="pd3-20 pdb-14 bgc-f">
        <h3 class="pdb-10">{{baseInfo.gardenName}}，{{baseInfo.buildingName}}，{{baseInfo.roomNumber}} {{baseInfo.bedRoom}}
        </h3>
        <el-row class="font-l">
          <el-col :span="12">
            <span class="font-12 c-9">客户：</span>
            <span v-for="(renterItem,index) in baseInfo.renters"
              :key="index">{{renterItem.renterName}}（{{renterItem.phone}}）</span>
          </el-col>
          <el-col :span="12">
            <span class="font-12 c-9">合同租期：</span>{{baseInfo.startTime}} ~ {{baseInfo.endTime}}
          </el-col>
        </el-row>
        <el-row class="font-l pdt-5">
          <el-col :span="12">
            <span class="font-12 c-9">合同租金：</span>{{baseInfo.contractRent}}元/月
          </el-col>
          <el-col :span="12">
            <span class="font-12 c-9">合同押金：</span>{{baseInfo.contractDeposit}}元
          </el-col>
        </el-row>
      </div>
      <div class="bgceee">
        <slot v-if="showPurviewBill">
          <div class="model-border">
            <div class="pd-20">
              <p class="c-red pdb-10">当前房间有未支付账单，需要关闭账单才能退租</p>
              <div class="bd-ddd">
                <el-table :data="closeBillData.billModels"
                  @row-click="handleClickRow"
                  border
                  show-summary
                  style="width: 100%"
                  size="mini">
                  <el-table-column label="账单周期"
                    prop="cycleDate"
                    :min-width="100"
                    align="center">
                  </el-table-column>

                  <el-table-column prop="orderTypeDesc"
                    label="账单类型"
                    :min-width="100"
                    align="center">
                  </el-table-column>

                  <el-table-column prop="totalMoney"
                    label="账单金额"
                    :min-width="100"
                    align="center">
                  </el-table-column>

                  <el-table-column label="最后付款日期"
                    align="center">
                    <template slot-scope="scope">
                      <span>{{scope.row.dateDesc}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column prop="billSeneschalEnumDesc"
                    label="账单状态"
                    align="center"
                    :min-width="80">
                  </el-table-column>

                </el-table>
              </div>
            </div>
          </div>
          <div class="model-border pd-20">
            <header class="font-w pdb-10">关闭账单原因</header>
            <my-textarea :model.sync="checkoutData.closeBillForm.remark"
              placeholder="请输入关闭账单原因"
              :rows="7"
              :minlength="5"
              :maxlength="100">
            </my-textarea>
          </div>
        </slot>
        <transition name="fade-transform"
          mode="out-in">
          <slot v-if="!showPurviewBill">
            <el-form ref="checkoutForm"
              :model="checkoutData"
              :rules="checkoutRules"
              size="mini"
              label-position="right"
              label-width="85px">
              <div class="pd-20 model-border">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="退租类型："
                      prop="type">
                      <el-select v-model="checkoutData.type"
                        placeholder="请选择退租类型"
                        clearable>
                        <el-option value="CONTRACT_EMPIRE"
                          label="合同到期"></el-option>
                        <el-option value="TRANSFORM_RENT"
                          label="转租退租"></el-option>
                        <el-option value="MIDDLE"
                          label="中途退租"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="退租日期："
                      type="date"
                      size="mini">
                      <el-date-picker v-model="today"
                        disabled
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions"
                        type="date">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item label="退租原因："
                      prop="reason">
                      <el-input type="textarea"
                        :maxlength="30"
                        :autosize="{ minRows: 2}"
                        placeholder="请输入你要备注的内容"
                        v-model="checkoutData.reason">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div class="model-border">
                <div class="pd-20">
                  <el-row>

                    <el-col :span="12">
                      <el-form-item label="租金："
                        prop="rent">
                        <el-row :gutter="10">
                          <el-col :span="10">
                            <el-select v-model="returnRent"
                              clearable>
                              <el-option :value="true"
                                label="应收"></el-option>
                              <el-option :value="false"
                                label="应退"></el-option>
                            </el-select>
                          </el-col>
                          <el-col :span="12">
                            <el-input v-model.number="checkoutData.rent"
                              :maxlength="6">
                              <template slot="append">元</template>
                            </el-input>
                          </el-col>
                        </el-row>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-row :gutter="10"
                        v-if="baseInfo.extras.search('WATER_CHARGES') !== -1">
                        <el-col :span="18">
                          <el-form-item label="水费："
                            prop="waterCharges">
                            <el-input v-model.number="checkoutData.waterCharges"
                              :maxlength="9">
                              <template slot="append">元</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="押金："
                        class="mgrt-18"
                        prop="deposit">
                        <el-row :gutter="10">
                          <el-col :span="10">
                            <el-select v-model="returnDeposit"
                              @change="changeDeposit"
                              clearable>
                              <el-option :value="true"
                                label="不退"></el-option>
                              <el-option :value="false"
                                label="应退"></el-option>
                            </el-select>
                          </el-col>
                          <el-col :span="12">
                            <el-input v-model.number="checkoutData.deposit"
                              :maxlength="6"
                              :disabled="returnDeposit">
                              <template slot="append">元</template>
                            </el-input>
                          </el-col>
                        </el-row>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-row :gutter="10"
                        v-if="baseInfo.extras.search('GAS_CHARGES') !== -1">
                        <el-col :span="18">
                          <el-form-item label="燃气："
                            prop="gasCharges">
                            <el-input v-model="checkoutData.gasCharges"
                              :maxlength="9">
                              <!-- <template slot="prefix">
                            <span style="line-height:30px;">
                              抄表
                            </span>
                          </template> -->
                              <template slot="append">元</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="服务费："
                        class="mgrt-18"
                        prop="servicePrice">
                        <el-row :gutter="10">
                          <el-col :span="10">
                            <el-select v-model="returnServicePrice"
                              clearable>
                              <el-option :value="true"
                                label="应收"></el-option>
                              <el-option :value="false"
                                label="应退"></el-option>
                            </el-select>
                          </el-col>
                          <el-col :span="12">
                            <el-input v-model.number="checkoutData.servicePrice">
                              <template slot="append">元</template>
                            </el-input>
                          </el-col>
                        </el-row>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-row :gutter="10"
                        v-if="baseInfo.extras.search('ELECTRIC_CHARGES') !== -1">
                        <el-col :span="18">
                          <el-form-item label="电费："
                            prop="electricCharges">
                            <el-input v-model="checkoutData.electricCharges"
                              :maxlength="9">
                              <template slot="append">元</template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                  <!-- <el-row>
                    <el-col :span="12">
                      <el-form-item v-if="baseInfo.extras.search('INTERNET_CHARGES') !== -1"
                        label="宽带费："
                        class="mgrt-18"
                        prop="internetCharges">
                        <el-row :gutter="10">
                          <el-col :span="12">
                            <el-input v-model.number="checkoutData.internetCharges"
                              :disabled="true">
                              <template slot="append">元</template>
                            </el-input>
                          </el-col>
                        </el-row>
                      </el-form-item>
                    </el-col>
                  </el-row> -->
                </div>
                <div class="checkout-amout bgc-fa mgrt-18">
                  <span class="font-14 font-w">合计：</span>
                  <span class="c-9">（{{this.allAccount > 0 ? '应收' : '应退'}}）</span> {{Math.abs(this.allAccount).toFixed(2)}}元</div>
              </div>
              <div v-if="this.allAccount < 0"
                class="pd-20 model-border">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="收款人："
                      prop="renterName">
                      <el-select v-model="checkoutData.renterName"
                        placeholder="请选择收款人"
                        clearable>
                        <el-option :label="item.renterName"
                          :value="item.renterName"
                          v-for="(item, index) in baseInfo.renters"
                          :key="index"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="收款账号："
                      prop="account">
                      <el-input placeholder="请输入收款的银行账号"
                        v-model="checkoutData.account">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="收款银行："
                      prop="bank">
                      <el-input placeholder="请输入收款银行"
                        v-model="checkoutData.bank">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </slot>
        </transition>
      </div>
    </div>
    <div class="dialog-footer">
      <slot v-if="showPurviewBill">
        <el-button type="primary"
          @click="handleNextStep"
          size="mini">下一步
        </el-button>
      </slot>
      <slot v-else>
        <el-button type="primary"
          @click="handleSumit"
          :disabled="isSubmit"
          size="mini">确认退租
        </el-button>
      </slot>
      <el-button size="mini"
        @click="closeDialog">取 消</el-button>
    </div>

    <el-dialog title="租客账单"
      append-to-body
      :visible.sync='rentBillDialog'
      :close-on-click-modal="false"
      width="950px">
      <long-rent-bill v-if="rentBillDialog"
        :billType="billType"
        :billNo="billNo"
        :source="'houseDetail'"
        :propsLeaseType="propsLeaseType"
        @closeDialog="closeDialog">
      </long-rent-bill>
    </el-dialog>

    <el-dialog title="生活账单"
      append-to-body
      :visible.sync='extraBillDialog'
      :close-on-click-modal="false"
      width="950px">
      <extra-bill v-if="extraBillDialog"
        :billNo="billNo"
        :extraBillDialog.sync="extraBillDialog">
      </extra-bill>
    </el-dialog>

    <el-dialog title="租客账单"
      top="30vh"
      append-to-body
      :visible.sync='rentFirstBillDialog'
      :close-on-click-modal="false"
      width="800px">
      <rent-bill v-if="rentFirstBillDialog"
        :bill="bill"
        :manager="manager"
        @closeDialog="closeDialog">
      </rent-bill>
    </el-dialog>
  </section>
</template>
<script>
import myTextarea from '@/components/MyTextarea';
import LongRentBill from './LongRentBill';
import extraBill from './ExtraBill';
import RentBill from './RentBill';
export default {
  data() {
    const today = (new Date()).toLocaleDateString().replace(/\//g, '-');
    // let serviceRulet = (rule, value, callback) => {
    //   if()
    // }
    let rentRulet = (rule, value, callback) => {
      if (isNaN(+value)) {
        callback(new Error('正确请输入租金'));
      } else if (value > this.baseInfo.contractRent && !this.returnRent) {
        callback(new Error('退的租金不能大于合同租金'));
      }
      callback();
    };
    let depositRules = (rule, value, callback) => {
      if (!this.returnDeposit) {
        if (!(+value)) {
          callback(new Error('退的押金至少大于 1'));
        } else if (+value <= 1) {
          callback(new Error('退的押金至少大于 1'));
        } else if (value > this.baseInfo.contractDeposit) {
          callback(new Error('退的押金不能大于合同押金'));
        }
      }
      callback();
    };
    let ServicePriceRulet = (rule, value, callback) => {
      if (isNaN(+value)) {
        callback(new Error('正确请输入服务费'));
      } else if (value > this.baseInfo.lastBillInfo.servicePrice && !this.returnServicePrice) {
        callback(new Error('退的服务费不能大于上次账单收取的服务费'));
      }
      callback();
    };
    return {
      isSubmit: false,
      today,
      rentRulet,
      depositRules,
      ServicePriceRulet,
      baseInfo: {
        extras: ''
      },
      checkoutData: {
        closeBillForm: {
          orderNo: undefined,
          price: 0,
          remark: ''
        },
        account: '',
        bank: '',
        deposit: 0,
        electric: 0,
        electricCharges: 0,
        gas: 0,
        gasCharges: 0,
        internetCharges: 0,
        propertyCharges: 0,
        leaseContractId: '',
        reason: '',
        rent: 0,
        renterName: '',
        roomId: '',
        servicePrice: 0,
        type: '',
        water: 0,
        waterCharges: 0
      },
      checkoutRules: {
        type: [{ required: true, message: '请选择退租类型', trigger: 'blur' }],
        collectMoney: [{ required: true, message: '请选择收付款人', trigger: 'change' }],
        bank: [
          { required: true, message: '请输入开户银行', trigger: 'blur' },
          { min: 2, max: 12, message: ' 长度在 2 到 30 个字符 ', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入银行账户', trigger: 'blur' },
          { pattern: /^[0-9]*$/, message: '请输入数字' },
          { pattern: /^[0-9]{6,20}$/, message: '输入长度在 6 到 20 位' }
        ],
        servicePrice: [
          { validator: ServicePriceRulet, trigger: 'change' }
        ],
        renterName: [
          { required: true, message: '请选择付款人', trigger: 'blur' }
        ],
        rent: [
          // { pattern: /[0-9]\d*$/g, message: '请输入数字' },
          { validator: rentRulet, trigger: 'change' }
        ],
        deposit: [
          { validator: depositRules, trigger: 'change' }
        ],
        water: [
          { required: true, message: '请输入水表', trigger: 'blur' },
          { pattern: /(^[0-9]{1,10}$)/, message: '最大可输入10位数字' }
        ],
        gas: [
          { required: true, message: '请输入燃气读数', trigger: 'blur' },
          { pattern: /(^[0-9]{1,10}$)/, message: '最大可输入10位数字' }
        ],
        electric: [
          { required: true, message: '请输入电表读数', trigger: 'blur' },
          { pattern: /(^[0-9]{1,10}$)/, message: '最大可输入10位数字' }
        ],
        propertyCharges: [
          { required: true, message: '请输入物业费', trigger: 'blur' }
        ],
        electricCharges: [
          { pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[.]{1}[0-9]{1,2}$)/, message: '0~9999的数字,可输入两位小数' }
        ],
        gasCharges: [
          { pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[.]{1}[0-9]{1,2}$)/, message: '0~9999的数字,可输入两位小数' }
        ],
        waterCharges: [
          { pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[.]{1}[0-9]{1,2}$)/, message: '0~9999的数字,可输入两位小数' }
        ]
        // internetCharges: [
        //   { required: true, message: '物业费', trigger: 'blur' }
        // ]
      },
      returnRent: false,
      returnDeposit: false,
      returnServicePrice: true,
      returnInternetCharges: false,
      refurnPropertyCharges: false,

      myCloseBillData: {},
      showPurviewBill: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < (Date.now() - 60000 * 60 * 24);
        }
      },
      rentBillDialog: false,
      rentFirstBillDialog: false,
      extraBillDialog: false
    };
  },
  props: {
    orderNo: {
      type: String,
      default: '',
      required: true
    },
    source: {
      type: String
    },
    propsLeaseType: {
      type: String
    },
    closeBill: {
      // 是否展示关闭账单
      type: Boolean,
      default: false
    },
    closeBillData: {
      type: Object,
      default: () => {
        return {
          billModels: []
        };
      }
    }
  },
  created() {
    this.showPurviewBill = this.closeBill;
    this.checkoutData.closeBillForm.orderNo = this.orderNo;
    this.requestData();
    // if (this.closeBill) {

    // }
  },
  methods: {
    // 获取退租的基本信息
    requestData() {
      this.$axios.get(
        '/security/refundlease/pickRefundInfo',
        { params: { longOrderNo: this.orderNo } }
      ).then((res) => {
        // console.log(res, '-----------退租基本信息');
        if (res.data.status === 'C0000') {
          this.baseInfo = res.data.result;
          this.handleReckonExtras();
          if (!this.baseInfo.lastBillInfo) {
            // this.baseInfo.lastBillInfo['servicePrice'] = this.baseInfo.contractRent * 0.5;
            this.$set(this.baseInfo, 'lastBillInfo', {
              servicePrice: this.baseInfo.contractRent * 0.08
            });
          }
          // console.log(this.baseInfo);
          // (this.baseInfo.extras.search('PROPERTY_CHARGES') !== -1) && this.handleCalCost('PROPERTY_CHARGES');
          // (this.baseInfo.extras.search('INTERNET_CHARGES') !== -1) && this.handleCalCost('INTERNET_CHARGES');
        } else {
          this.isSubmit = true;
          this.$message.error(res.data.message);
        }
      }).catch(err => {
        console.log(err);
      });
    },

    handleSumit() {
      // this.payRent + this.payDeposit + this.payService
      this.$refs.checkoutForm.validate((valid) => {
        if (valid) {
          const myCheckoutData = JSON.parse(JSON.stringify(this.checkoutData));
          myCheckoutData.roomId = this.baseInfo.roomId;
          myCheckoutData.leaseContractId = this.baseInfo.contractId;
          myCheckoutData.rent = this.payRent;
          myCheckoutData.deposit = this.payDeposit;
          myCheckoutData.servicePrice = this.payService;
          // 如是正常退租（不操作关闭账单） closeBillForm 传 null；
          if (!this.closeBill) {
            myCheckoutData.closeBillForm = null;
          }
          this.$axios.post(
            '/security/refundlease/add',
            myCheckoutData
          ).then((res) => {
            // console.log(res, '-----------退租提交后');
            if (res.data.status === 'C0000' && res.data.result) {
              this.$message.success('操作成功');
              // 刷新列表页
              // this.$emit('refreshData');
              if (this.source === 'houseDetail') {
                if (this.propsLeaseType === 'ENTIRE_RENT') {
                  this.$store.commit('freshenLREntireHouseStataus', true);
                } else {
                  this.$store.commit('freshenLRJointHouseStataus', true);
                }
              }
              this.closeDialog('refresh');
              // 如是 合租 则刷新合租房态列表 整租 则刷整租
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          this.$message.error('请完善表单信息！');
          // console.log('error submit!!');
          return false;
        }
      });
    },

    handleReckonExtras() {
      this.$axios.get(
        '/security/refundlease/calCost',
        {
          params: {
            contractId: this.baseInfo.contractId,
            returnDate: this.today
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          let { result } = res.data;
          this.checkoutData.electricCharges = (this.baseInfo.extras.search('ELECTRIC_CHARGES') !== -1 && result.electricityMoney) || 0;
          this.checkoutData.gasCharges = (this.baseInfo.extras.search('GAS_CHARGES') !== -1 && result.gasMoney) || 0;
          this.checkoutData.waterCharges = (this.baseInfo.extras.search('WATER_CHARGES') !== -1 && result.waterMoney) || 0;
          this.checkoutData.internetCharges = (this.baseInfo.extras.search('INTERNET_CHARGES') !== -1 && result.internetMoney) || 0;
        } else {
          this.$message.warning('获取生活费用异常');
        }
      }).catch(err => {
        this.$message.error(err.message || '服务异常');
        console.log(err);
      });
    },

    handleNextStep() {
      if (this.rentBillCount > 1) {
        this.$message.warning('未支付的租金账单已超量，不能关闭');
        return;
      }
      let remarkLength = this.checkoutData.closeBillForm.remark.trim().length;
      if (remarkLength < 5 || remarkLength > 100) {
        this.$message.warning('关闭账单原因限5-100个字符');
        return;
      }
      this.$confirm('该操作会关闭以上的账单，是否继续？', '提示', {
        confirmButtonText: ' 是 ',
        cancelButtonText: ' 否 ',
        type: 'warning'
      }).then(() => {
        this.showPurviewBill = false;
      }).catch((err) => {
        console.log(err);
      });
    },

    handleClickRow(row) {
      if (row.orderType === 'RENT_BILL') {
        this.rentBillDialog = true;
        this.billNo = row.billNo;
        this.billType = row.orderType;
      } else if (row.orderType === 'BOOKING_BILL') {
        this.$axios.get('/security/longorder/booking/queryBookingInfoByBookingNo',
          {
            params: { bookingNo: row.billNo }
          }
        ).then((res) => {
          const { result } = res.data;
          if (result && res.data.status === 'C0000') {
            this.rentFirstBillDialog = true;
            this.bill = result;
            this.manager = result.bookingManager.managerName;
          }
        }).catch(err => {
          console.log(err);
        });
      } else {
        this.extraBillDialog = true;
        this.billNo = row.billNo;
      }
    },
    // handleCalCost(type, degree) {
    //   this.$axios.get(
    //     '/security/refundlease/calCost', {
    //       params: {
    //         contractId: this.baseInfo.contractId,
    //         extrasTypeEnum: type,
    //         degree: degree,
    //         returnDate: this.today
    //       }
    //     }
    //   ).then((res) => {
    //     if (res.data.status === 'C0000') {
    //       if (type === 'WATER_CHARGES') {
    //         this.checkoutData.waterCharges = (+res.data.result);
    //       } else if (type === 'ELECTRIC_CHARGES') {
    //         this.checkoutData.electricCharges = (+res.data.result);
    //       } else if (type === 'GAS_CHARGES') {
    //         this.checkoutData.gasCharges = (+res.data.result);
    //       } else if (type === 'PROPERTY_CHARGES') {
    //         this.checkoutData.propertyCharges = (+res.data.result);
    //       } else if (type === 'INTERNET_CHARGES') {
    //         this.checkoutData.internetCharges = (+res.data.result);
    //       }
    //     }
    //   }).catch(err => {
    //     console.log(err);
    //   });
    // },

    changeDeposit(val) {
      if (val) {
        this.checkoutData.deposit = 0;
      }
    },
    // 关闭表格
    closeDialog(data) {
      this.$emit('closeDialog', data);
    }
  },
  computed: {
    payRent: {
      get() {
        return this.returnRent ? Math.abs(this.checkoutData.rent) : -Math.abs(this.checkoutData.rent);
      }
    },
    payDeposit: {
      get() {
        return this.returnDeposit ? 0 : -Math.abs(this.checkoutData.deposit);
      }
    },
    payService: {
      get() {
        return this.returnServicePrice ? Math.abs(this.checkoutData.servicePrice) : -Math.abs(this.checkoutData.servicePrice);
      }
    },
    // payPropertyCharges: {
    //   get() {
    //     return this.returnPropertyCharges ? Math.abs(this.checkoutData.propertyCharges) : -Math.abs(this.checkoutData.propertyCharges);
    //   }
    // },
    // payInternetCharges: {
    //   get() {
    //     return this.returnInternetCharges ? Math.abs(this.checkoutData.internetCharges) : -Math.abs(this.checkoutData.internetCharges);
    //   }
    // },
    allAccount: {
      get() {
        let allCont = (+this.payRent) + (+this.payDeposit) + (+this.payService) + (+this.checkoutData.propertyCharges) + (+this.checkoutData.internetCharges) +
          (+this.checkoutData.waterCharges) + (+this.checkoutData.gasCharges) + (+this.checkoutData.electricCharges);
        return +allCont.toFixed(2);
      }
    },
    rentBillCount: {
      get() {
        let count = 0;
        let closeBillAmont = 0;
        this.closeBillData.billModels.forEach((element, index) => {
          element.orderType === 'RENT_BILL' && count++;
          closeBillAmont += element.totalMoney;
        });
        this.checkoutData.closeBillForm.price = closeBillAmont;
        return count;
      }
    }
  },
  components: {
    myTextarea,
    LongRentBill,
    RentBill,
    extraBill
  }
};
</script>

<style scoped>
.pdb-14 {
  padding-bottom: 14px;
}
.input-center >>> .el-input--prefix > input {
  text-align: center;
}
.checkout-amout {
  height: 44px;
  line-height: 44px;
  padding-left: 30px;
}
</style>
