<template>
  <section>
    <div class="dialog-box">
      <div class="pd-20 bgc-f">
        <h3>{{roomData.gardenName}}，{{roomData.buildingName}}，{{roomData.roomNo}} {{roomData.bedRoomName}}</h3>
      </div>
      <div class="bgceee">
        <el-form ref="houseForm"
          :model="MeterData"
          :rules="MeterDataRules"
          size="mini">
          <div v-if="extrasInfo.electricCharges"
            class="model-border">
            <header class="model-header">电费（{{extrasInfo.electricCharges}}元/度）</header>
            <div class="pd-20">
              <div class="bd-ddd">
                <el-row class="line-h-30 bgc-fa bdb-ddd">
                  <el-col :span="6"
                    class="font-c">
                    次数
                  </el-col>
                  <el-col :span="6"
                    class="font-c">
                    抄表时间
                  </el-col>
                  <el-col :span="6"
                    style="padding-left:20px"
                    class="font-c">
                    抄表读数（度）
                  </el-col>
                  <el-col :span="6"
                    style="padding-left:20px"
                    class="font-c">
                    电费总额
                  </el-col>
                </el-row>
                <el-row class="line-h-40 bdb-ddd"
                  v-for="(electriItem,index) in this.historyList"
                  :key="index">
                  <el-col :span="6"
                    class="font-c">
                    {{index+1}}
                  </el-col>
                  <el-col :span="6"
                    class="font-c">
                    {{electriItem.electricityReadingTime ? (new Date(electriItem.electricityReadingTime)).toLocaleDateString().replace(/\//g, '-') : '无'}}
                  </el-col>
                  <el-col :span="6"
                    class="font-c">
                    {{electriItem.electricity}}
                  </el-col>
                  <el-col :span="6"
                    class="font-c">
                    {{electriItem.electricityMoney}}
                  </el-col>
                </el-row>
                <el-row class="line-h-60 bdb-ddd pdt-10">
                  <el-col :span="6"
                    class="font-c">
                    {{historyList.length + 1}}
                  </el-col>
                  <el-col :span="6"
                    class="font-c pdh-20">
                    <el-form-item prop="electricityReadingTime"
                      type="date"
                      size="mini"
                      :rules="[{ required: true, message: '抄表时间', trigger: 'blur' }]">
                      <el-date-picker v-model="MeterData.electricityReadingTime"
                        :picker-options="pickerOptions"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        type="date">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6"
                    class="font-c pdh-20">
                    <el-form-item prop="electricity">
                      <el-input placeholder="请输入读表数"
                        v-model="MeterData.electricity"
                        :maxlength="10">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6"
                    class="font-c pdh-20">
                    <el-form-item prop="managerElectricityMoney">
                      <el-input :maxlength="7"
                        v-model="MeterData.managerElectricityMoney">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div v-if="extrasInfo.waterCharges"
            class="model-border">
            <header class="model-header">水费（{{extrasInfo.waterCharges}}元/吨）</header>
            <div class="pd-20">
              <div class="bd-ddd">
                <el-row class="line-h-30 bgc-fa bdb-ddd">
                  <el-col :span="6"
                    class="font-c">
                    次数
                  </el-col>
                  <el-col :span="6"
                    class="font-c">
                    抄表时间
                  </el-col>
                  <el-col :span="6"
                    style="padding-left:20px"
                    class="font-c">
                    抄表读数（吨）
                  </el-col>
                  <el-col :span="6"
                    style="padding-left:20px"
                    class="font-c">
                    水费总额
                  </el-col>
                </el-row>
                <el-row class="line-h-40 bdb-ddd"
                  v-for="(waterItem,index) in this.historyList"
                  :key="index">
                  <el-col :span="6"
                    class="font-c">
                    {{index+1}}
                  </el-col>
                  <el-col :span="6"
                    class="font-c">
                    {{waterItem.waterReadingTime ? (new Date(waterItem.waterReadingTime)).toLocaleDateString().replace(/\//g, '-') : '无'}}
                  </el-col>
                  <el-col :span="6"
                    class="font-c">
                    {{waterItem.water}}
                  </el-col>
                  <el-col :span="6"
                    class="font-c">
                    {{waterItem.waterMoney}}
                  </el-col>
                </el-row>
                <el-row class="line-h-60 bdb-ddd pdt-10">
                  <el-col :span="6"
                    class="font-c">
                    {{historyList.length + 1}}
                  </el-col>
                  <el-col :span="6"
                    class="font-c pdh-20">
                    <el-form-item prop="waterReadingTime"
                      type="date"
                      size="mini"
                      :rules="[{ required: true, message: '请选择抄表时间', trigger: 'blur' }]">
                      <el-date-picker v-model="MeterData.waterReadingTime"
                        :picker-options="pickerOptions"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        type="date">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6"
                    class="font-c pdh-20">
                    <el-form-item prop="water">
                      <el-input placeholder="请输入读表数"
                        v-model="MeterData.water"
                        :maxlength="10">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6"
                    class="font-c pdh-20">
                    <el-form-item prop="managerWaterMoney">
                      <el-input :maxlength="7"
                        v-model="MeterData.managerWaterMoney">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div v-if="extrasInfo.gasCharges"
            class="model-border">
            <header class="model-header">燃气（{{extrasInfo.gasCharges}}元/立方）</header>
            <div class="pd-20">
              <div class="bd-ddd">
                <el-row class="line-h-30 bgc-fa bdb-ddd">
                  <el-col :span="6"
                    class="font-c">
                    次数
                  </el-col>
                  <el-col :span="6"
                    class="font-c">
                    抄表时间
                  </el-col>
                  <el-col :span="6"
                    style="padding-left:20px"
                    class="font-c">
                    抄表读数（立方）
                  </el-col>
                  <el-col :span="6"
                    style="padding-left:20px"
                    class="font-c">
                    燃气总额
                  </el-col>
                </el-row>
                <el-row class="line-h-40 bdb-ddd"
                  v-for="(gasItem,index) in this.historyList"
                  :key="index">
                  <el-col :span="6"
                    class="font-c">
                    {{index+1}}
                  </el-col>
                  <el-col :span="6"
                    class="font-c">
                    {{gasItem.gasReadingTime ? (new Date(gasItem.gasReadingTime)).toLocaleDateString().replace(/\//g, '-') : '无'}}
                  </el-col>
                  <el-col :span="6"
                    class="font-c">
                    {{gasItem.gas}}
                  </el-col>
                  <el-col :span="6"
                    class="font-c">
                    {{gasItem.gasMoney}}
                  </el-col>
                </el-row>
                <el-row class="line-h-60 bdb-ddd pdt-10">
                  <el-col :span="6"
                    class="font-c">
                    {{historyList.length + 1}}
                  </el-col>
                  <el-col :span="6"
                    class="font-c pdh-20">
                    <el-form-item prop="gasReadingTime"
                      type="date"
                      size="mini"
                      :rules="[{ required: true, message: '请选择抄表时间', trigger: 'blur' }]">
                      <el-date-picker v-model="MeterData.gasReadingTime"
                        :picker-options="pickerOptions"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        type="date">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6"
                    class="font-c pdh-20">
                    <el-form-item prop="gas">
                      <el-input placeholder="请输入读表数"
                        v-model="MeterData.gas"
                        :maxlength="10">
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6"
                    class="font-c pdh-20">
                    <el-form-item prop="managerGasMoney">
                      <el-input :maxlength="7"
                        v-model="MeterData.managerGasMoney">
                      </el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-form>

      </div>
    </div>
    <div class="dialog-footer">
      <el-button type="danger"
        size="mini"
        @click="handleSubmit">保存</el-button>
      <el-button size="mini"
        @click="closeDialog">取 消</el-button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    let waterReading = (rule, value, callback) => {
      if (+value > 0 && this.historyList.length >= 1) {
        if (this.historyList[this.historyList.length - 1].water > value) {
          callback(new Error('不能少于上次的抄表读数'));
        }
      } else {
        callback(new Error('请输入水表读数'));
      }
      callback();
    };
    let gasReading = (rule, value, callback) => {
      if (+value > 0 && this.historyList.length >= 1) {
        if (this.historyList[this.historyList.length - 1].gas > value) {
          callback(new Error('不能少于上次的抄表读数'));
        }
      } else {
        callback(new Error('请输入燃气表读数'));
      }
      callback();
    };
    let electricReading = (rule, value, callback) => {
      if (+value > 0 && this.historyList.length >= 1) {
        if (this.historyList[this.historyList.length - 1].electricity > value) {
          callback(new Error('不能少于上次的抄表读数'));
        }
      } else {
        callback(new Error('请输入电表读数'));
      }
      callback();
    };
    return {
      waterReading,
      gasReading,
      electricReading,
      MeterData: {
        electricity: 0,
        electricityReadingTime: '',
        gas: 0,
        gasReadingTime: '',
        water: 0,
        waterReadingTime: '',
        managerElectricityMoney: 0,
        managerGasMoney: 0,
        managerWaterMoney: 0
      },
      historyList: [
        {
          water: 0,
          electricity: 0,
          gas: 0
        }
      ],
      MeterDataRules: {
        gas: [
          { required: true, message: '请输入燃气读数', trigger: 'blur' },
          { pattern: /(^[0-9]{1,10}$)/, message: '最大可输入10位数字' },
          { validator: gasReading, trigger: 'change' }
        ],
        water: [
          { required: true, message: '请输入水表读数', trigger: 'blur' },
          { pattern: /(^[0-9]{1,10}$)/, message: '最大可输入10位数字' },
          { validator: waterReading, trigger: 'change' }
        ],
        electricity: [
          { required: true, message: '请输入电表读数', trigger: 'blur' },
          { pattern: /(^[0-9]{1,10}$)/, message: '最大可输入10位数字' },
          { validator: electricReading, trigger: 'change' }
        ],
        managerElectricityMoney: [{ pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[.]{1}[0-9]{1,2}$)/, message: '0~9999的数字,可输入两位小数' }],
        managerGasMoney: [{ pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[.]{1}[0-9]{1,2}$)/, message: '0~9999的数字,可输入两位小数' }],
        managerWaterMoney: [{ pattern: /(^[0-9]{1,4}$)|(^[0-9]{1,4}[.]{1}[0-9]{1,2}$)/, message: '0~9999的数字,可输入两位小数' }]
      },
      extrasInfo: {
        electricCharges: 0,
        extras: '',
        gasCharges: 0,
        internetCharges: 0,
        propertyCharges: 0,
        waterCharges: 0
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  props: ['billNo', 'orderNo', 'roomData'],
  created() {
    this.requestData();
    // this.requBaseData();
  },
  methods: {
    // 请求历史抄表
    // 'DD180531160401'
    requestData() {
      this.$axios.get(
        '/security/longOrder/queryMeterReadingPage', {
          params: {
            pageSize: 2,
            currentPage: 1,
            orderNo: this.orderNo
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.historyList = res.data.result.page.items.reverse();
          this.extrasInfo = res.data.result.extrasInfo;
          this.$set(this, 'extrasInfo', res.data.result.extrasInfo);
          if (res.data.result.currentMeterReadingModel) {
            this.MeterData = res.data.result.currentMeterReadingModel;
            this.MeterData.electricityReadingTime = (new Date(this.MeterData.electricityReadingTime)).toLocaleDateString().replace(/\//g, '-');
            this.MeterData.gasReadingTime = (new Date(this.MeterData.gasReadingTime)).toLocaleDateString().replace(/\//g, '-');
            this.MeterData.waterReadingTime = (new Date(this.MeterData.waterReadingTime)).toLocaleDateString().replace(/\//g, '-');
            // this.MeterData.managerWaterMoney = this.MeterData.waterMoney;
            // this.MeterData.managerGasMoney = this.MeterData.gasMoney;
            // this.MeterData.managerElectricityMoney = this.MeterData.electricityMoney;
            // delete this.MeterData.waterMoney;
            // delete this.MeterData.gasMoney;
            // delete this.MeterData.electricityMoney;
          }
        } else {
          this.historyList = [{
            water: 0,
            electricity: 0,
            gas: 0
          }];
          this.$message.error(res.data.message);
        }
      }).catch(err => {
        this.historyList = [];
        console.log(err);
      });
    },

    handleSubmit() {
      // this.MeterData.billNo = this.billNo;
      this.MeterData.longOrderNo = this.orderNo;
      this.$refs.houseForm.validate((valid) => {
        if (valid) {
          this.$axios
            .post('/security/longOrder/addMeterReading',
              this.MeterData)
            .then(res => {
              if (res.data.status === 'C0000') {
                this.$message({
                  type: 'success',
                  message: '添加成功'
                });
                this.$emit('refreshData');
                this.$emit('closeDialog', 'MeterReading');
              } else {
                this.$message({
                  type: 'warning',
                  message: res.data.message
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          // console.log('error submit!!');
          this.$message.warning('请完善表达信息');
          return false;
        }
      });
    },

    closeDialog() {
      this.$emit('closeDialog', 'MeterReading');
    }
  },
  // computed: {
  //   waterCost: {
  //     get() {
  //       console.log(this.historyList, '--------');
  //       let watchMeter = this.historyList[this.historyList.length - 1].water ? this.historyList[this.historyList.length - 1].water : 0;
  //       let waterPay = (this.extrasInfo.waterCharges * (this.MeterData.water - watchMeter)).toFixed(2);
  //       return waterPay > 0 ? waterPay : 0;
  //     },
  //     set(newVal) {
  //       console.log(newVal);
  //       this.MeterData.managerWaterMoney = newVal;
  //       this.$set(this.MeterData, 'managerWaterMoney', newVal);
  //     }
  //   },
  //   gasCost: {
  //     get() {
  //       let gasMeter = this.historyList[this.historyList.length - 1].gas ? this.historyList[this.historyList.length - 1].gas : 0;
  //       let gasPay = (this.extrasInfo.gasCharges * (this.MeterData.gas - gasMeter)).toFixed(2);
  //       return gasPay > 0 ? gasPay : 0;
  //     },
  //     set(newVal) {
  //       this.MeterData.managerGasMoney = newVal;
  //     }
  //   },
  //   electricityCost: {
  //     get() {
  //       let electricityMeter = this.historyList[this.historyList.length - 1].electricity ? this.historyList[this.historyList.length - 1].electricity : 0;
  //       let electPay = (this.extrasInfo.electricCharges * (this.MeterData.electricity - electricityMeter)).toFixed(2);
  //       return electPay > 0 ? electPay : 0;
  //     },
  //     set(newVal) {
  //       this.MeterData.managerElectricityMoney = newVal;
  //     }
  //   }
  // },
  watch: {
    'MeterData.water'(val) {
      if (this.MeterData.waterMoney) {
        this.MeterData.managerWaterMoney = this.MeterData.waterMoney;
        delete this.MeterData.waterMoney;
      } else {
        let watchMeter = this.historyList[this.historyList.length - 1].water ? this.historyList[this.historyList.length - 1].water : 0;
        let waterPay = (this.extrasInfo.waterCharges * (this.MeterData.water - watchMeter)).toFixed(2);
        this.$set(this.MeterData, 'managerWaterMoney', waterPay > 0 ? waterPay : 0);
      }
    },
    'MeterData.gas'(val) {
      if (this.MeterData.gasMoney) {
        this.MeterData.managerGasMoney = this.MeterData.gasMoney;
        delete this.MeterData.gasMoney;
      } else {
        let gasMeter = this.historyList[this.historyList.length - 1].gas ? this.historyList[this.historyList.length - 1].gas : 0;
        let gasPay = (this.extrasInfo.gasCharges * (this.MeterData.gas - gasMeter)).toFixed(2);
        this.$set(this.MeterData, 'managerGasMoney', gasPay > 0 ? gasPay : 0);
      }
    },
    'MeterData.electricity'(val) {
      if (this.MeterData.electricityMoney) {
        this.MeterData.managerElectricityMoney = this.MeterData.electricityMoney;
        delete this.MeterData.electricityMoney;
      } else {
        let electricityMeter = this.historyList[this.historyList.length - 1].electricity ? this.historyList[this.historyList.length - 1].electricity : 0;
        let electPay = (this.extrasInfo.electricCharges * (this.MeterData.electricity - electricityMeter)).toFixed(2);
        this.$set(this.MeterData, 'managerElectricityMoney', electPay > 0 ? electPay : 0);
      }
    }
  }
};
</script>
