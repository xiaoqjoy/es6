<template>
  <el-dialog title="抄表" :visible.sync='MeterReadDialog' :close-on-click-modal="false" width="520px">
    <section class="meter-read-dialog">
      <div class="dialog-header">
        <el-row>
          <el-col :span="4">
            <div class="c-red">
              <i class="el-icon-warning"></i>提示：</div>
          </el-col>
          <el-col :span="20" class="font-12">
            <p>1、按水／电／燃气公司账单真实抄写。</p>
            <p>2、计算时会自动减去房源交房和验收前的数据。</p>
          </el-col>
        </el-row>
      </div>
      <div class="dialog-box">
        <div class="dialog-body">
          <el-form size="mini" :model="meterReadForm" :rules="meterReadRule" ref="meterReadForm" label-position="right">
            <el-row>
              <el-col :offset="4" :span="3">
                <div class="div-jusity">
                  <span>楼盘</span>：</div>
              </el-col>
              <el-col :span="14">
                <el-form-item prop="gardenName">
                  <el-select v-model="meterReadForm.gardenName" :disabled="type=='EDIT'" filterable remote placeholder="请输入关键字" :remote-method="searchGarden" clearable :loading="gardenSearchLoading">
                    <el-option v-for="(item, index) in gardenSearchList" :key="index" :label="item.gardenName" :value="item.gardenName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="4" :span="3">
                <div class="div-jusity">
                  <span>楼栋</span>：</div>
              </el-col>
              <el-col :span="14">
                <el-form-item prop="buildingName">
                  <el-select v-model="meterReadForm.buildingName" placeholder="请选择楼栋" filterable clearable :disabled="!meterReadForm.gardenName||type=='EDIT'" :loading="buildingSearchLoading">
                    <el-option v-for="(item, index) in buildingSearchList" :key="index" :label="item.buildingName" :value="item.buildingName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="4" :span="3">
                <div class="div-jusity">
                  <span>房号</span>：</div>
              </el-col>
              <el-col :span="14">
                <el-form-item prop="roomId">
                  <el-select v-model="meterReadForm.roomId" placeholder="请选择房号" filterable clearable :disabled="!meterReadForm.buildingName||type=='EDIT'" :loading="roomSearchLoading">
                    <el-option v-for="(item, index) in roomSearchList" :key="index" :label="item.number" :value="item.roomId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="4" :span="3">
                <div class="div-jusity">
                  <span>抄表类型</span>：</div>
              </el-col>
              <el-col :span="14">
                <el-form-item>
                  <el-select v-model="meterReadForm.extraType" placeholder="请选择抄表类型">
                    <el-option label="电抄表" value="ELECTRIC_CHARGES" />
                    <el-option label="水抄表" value="WATER_CHARGES" />
                    <el-option label="燃气抄表" value="GAS_CHARGES" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="4" :span="3">
                <div class="div-jusity">
                  <span>计费时段</span>：</div>
              </el-col>
              <el-col :span="14">
                <el-row type="flex" justify="space-between">
                  <el-col :span="11">
                    <el-form-item prop="readingStart">
                      <el-date-picker :disabled="lastRecordDisabled" :picker-options="pickerOptions" v-model="meterReadForm.readingStart" type="date" placeholder="开始日期" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="1" class="font-c">
                    <div class="pdt-5">-</div>
                  </el-col>
                  <el-col :span="11">
                    <el-form-item prop="readingEnd">
                      <el-date-picker v-model="meterReadForm.readingEnd" :picker-options="pickerOptions" type="date" placeholder="结束日期" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="4" :span="3">
                <div class="div-jusity">
                  <span>上次读表</span>：</div>
              </el-col>
              <el-col :span="14">
                <el-form-item prop="lastRecord">
                  <el-input :disabled="lastRecordDisabled" @focus="isInput=true" @blur="isInput=false" v-model="meterReadForm.lastRecord" :placeholder="lastRecordPlaceholder" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="4" :span="3">
                <div class="div-jusity">
                  <span>本次读表</span>：</div>
              </el-col>
              <el-col :span="14">
                <el-form-item prop="currentRecord">
                  <el-input v-model="meterReadForm.currentRecord" @focus="isInput=true" @blur="isInput=false" placeholder="请填写本次读表数" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="4" :span="3">
                <div class="div-jusity">
                  <span>使用数</span>：</div>
              </el-col>
              <el-col :span="14">
                <el-form-item>
                  <el-input disabled v-model="degree" placeholder="">
                    <template slot="append" v-if="meterReadForm.extraType=='ELECTRIC_CHARGES'">度</template>
                    <template slot="append" v-else-if="meterReadForm.extraType=='WATER_CHARGES'">吨</template>
                    <template slot="append" v-else-if="meterReadForm.extraType=='GAS_CHARGES'">立方</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="4" :span="3">
                <div class="div-jusity">
                  <span>金额</span>：</div>
              </el-col>
              <el-col :span="14">
                <el-form-item prop="money">
                  <el-input v-model="meterReadForm.money" placeholder="请填写金额">
                    <template slot="append">元</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="type=='ADD'">
              <el-col :offset="4" :span="3">
                <div class="div-jusity">
                  <span></span>
                </div>
              </el-col>
              <el-col :span="14">
                <el-form-item>
                  <el-checkbox v-model="saveStatus" class="c-6">保存并继续</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="dialog-footer">
        <el-button type="primary" size="mini" :loading="saveLoading" @click="saveMeterRead">保存</el-button>
        <el-button size="mini" @click="MeterReadDialog=false">取消</el-button>
      </div>
    </section>
  </el-dialog>
</template>
<script>
export default {
  name: 'MeterReadDialog',
  data() {
    // 日期校验
    const dateRules = (rule, value, callback) => {
      if (value) {
        if (this.meterReadForm.readingStart && value <= this.meterReadForm.readingStart) {
          callback(new Error('结束日期要大于开始日期'));
        } else {
          return callback();
        }
      } else {
        callback(new Error('请选择计费结束日期'));
      }
    };
    // 本次读表
    const currentRecordRules = (rule, value, callback) => {
      if (this.meterReadForm.lastRecord && parseFloat(value) < parseFloat(this.meterReadForm.lastRecord)) {
        callback(new Error('本次读表数不得小于上次读表数'));
      } else {
        return callback();
      }
    };

    // 上次读表，当第一次抄表时，发房时间在抄表时间范围内时，上次读表数不得大于发房的抄表数
    const lastRecordRules = (rule, value, callback) => {
      if (!this.lastRecordDisabled) {
        if (value) {
          let key = '';
          switch (this.meterReadForm.extraType) {
            case 'ELECTRIC_CHARGES':
              key = 'electricity';
              break;
            case 'WATER_CHARGES':
              key = 'water';
              break;
            case 'GAS_CHARGES':
              key = 'gas';
              break;
            default:
              break;
          }
          if (this.outMeterData.meterTime && this.meterReadForm.readingStart && this.meterReadForm.readingEnd) {
            if (this.meterReadForm.readingStart.getTime() <= this.outMeterData.meterTime && this.outMeterData.meterTime <= this.meterReadForm.readingEnd.getTime()) {
              if (this.outMeterData[key] !== null && parseFloat(value) < this.outMeterData[key]) {
                callback(new Error('计费时段包含发房抄表，不能小于发房抄表数' + this.outMeterData[key]));
              } else {
                return callback();
              }
            } else {
              return callback();
            }
          } else {
            return callback();
          }
        }
      } else {
        return callback();
      }
    };

    return {
      // 表单校验规则
      meterReadRule: {
        gardenName: [{ required: true, message: '请选择楼盘', trigger: 'change' }],
        buildingName: [{ required: true, message: '请选择楼栋', trigger: 'change' }],
        roomId: [{ required: true, message: '请选择房号', trigger: 'change' }],
        readingStart: [{ required: true, message: '请选择计费开始日期', trigger: 'change' }],
        readingEnd: [{ validator: dateRules, trigger: 'change' }],
        lastRecord: [
          { required: true, message: '请输入上次读表数', trigger: 'change' },
          { pattern: /^[0-9]{0,8}(\.\d{0,2})?$/, message: '请输入合法数字，不得超过8位，最多两位小数' },
          { validator: lastRecordRules, trigger: 'change' }
        ],
        currentRecord: [
          { required: true, message: '请输入本次读表数', trigger: 'change' },
          { pattern: /^[0-9]{0,8}(\.\d{0,2})?$/, message: '请输入合法数字，不得超过8位，最多两位小数' },
          { validator: currentRecordRules, trigger: 'change' }
        ],
        money: [
          { required: true, message: '请输入金额', trigger: 'change' },
          { pattern: /^[0-9]{0,8}(\.\d{0,2})?$/, message: '请输入合法数字，不得超过8位，最多两位小数' }
        ]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      saveLoading: false,
      saveStatus: false, // 保存并继续
      gardenSearchLoading: false, // 楼盘筛选加载
      gardenSearchList: [], // 楼盘数据
      buildingSearchLoading: false, // 楼栋筛选加载
      buildingSearchList: [], // 楼栋数据
      roomSearchLoading: false, // 房号筛选加载
      roomSearchList: [], // 房号数据
      // 抄表表单
      meterReadForm: {
        gardenName: '', // 楼盘名
        buildingName: '', // 楼栋名
        roomId: '', // 房号id
        readingStart: '', // 开始时间
        readingEnd: '', // 结束时间
        money: '', // 金额
        lastRecord: '', // 上次抄表数
        extraType: 'ELECTRIC_CHARGES', // 抄表的类型
        // degree: '', // 度数
        currentRecord: '', // 本次抄表数
        createOperatorId: '' // 抄表人
      },
      isInput: false,
      lastRecordPlaceholder: '请填写上次读表数',
      outMeterData: {}, // 房源的发房数据
      lastRecordData: {}, // 房源的上次抄表记录
      currentRecordData: {} // 房源的本次抄表记录
    };
  },
  props: {
    value: Boolean,
    // 'ADD'or'EDIT'
    type: {
      type: String,
      default: 'ADD'
    },
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
    // 使用数
    degree() {
      let degree = parseFloat(this.meterReadForm.currentRecord) - parseFloat(this.meterReadForm.lastRecord);
      return isFinite(degree) && degree >= 0 ? degree.toFixed(2) : '';
    },
    lastRecordDisabled() {
      let disabled = false;
      let key = '';
      switch (this.meterReadForm.extraType) {
        case 'ELECTRIC_CHARGES':
          disabled = this.lastRecordData.lastElectricity !== undefined;
          key = 'electricity';
          break;
        case 'WATER_CHARGES':
          disabled = this.lastRecordData.lastWater !== undefined;
          key = 'water';
          break;
        case 'GAS_CHARGES':
          disabled = this.lastRecordData.lastGas !== undefined;
          key = 'gas';
          break;
        default:
          break;
      }
      let placeholder = '请填写上次读表数';
      if (!disabled && this.outMeterData[key] !== null && this.outMeterData.meterTime && this.meterReadForm.readingStart && this.meterReadForm.readingEnd) {
        if (this.meterReadForm.readingStart.getTime() <= this.outMeterData.meterTime && this.outMeterData.meterTime <= this.meterReadForm.readingEnd.getTime()) {
          placeholder = '请填写上次读表数，不得大于发房抄表数' + this.outMeterData[key];
        }
      }
      this.lastRecordPlaceholder = placeholder;
      return disabled;
    }
  },
  watch: {
    'meterReadForm.gardenName'(val) {
      if (this.type === 'ADD') {
        this.meterReadForm.buildingName = '';
        val && this.searchBuilding();
      }
    },
    'meterReadForm.buildingName'(val) {
      if (this.type === 'ADD') {
        this.meterReadForm.roomId = '';
        val && this.searchRoom();
      }
    },
    'meterReadForm.roomId'(val) {
      // roomId变化时，重置上次抄表数据和本次抄表数据
      this.lastRecordData = {};
      this.currentRecordData = {};
      val && this.getRoomMeterRead();
    },
    // 抄表类型变化
    'meterReadForm.extraType'(val) {
      this.extraTypeChange();
    },
    // 根据使用数变化实时计算金额
    degree(val) {
      if (this.isInput && this.outMeterData.roomExtrasInfoModel) {
        let money;
        let roomExtrasInfoModel = this.outMeterData.roomExtrasInfoModel;
        switch (this.meterReadForm.extraType) {
          case 'ELECTRIC_CHARGES':
            money = roomExtrasInfoModel.electricCharges * val;
            break;
          case 'WATER_CHARGES':
            money = roomExtrasInfoModel.waterCharges * val;
            break;
          case 'GAS_CHARGES':
            money = roomExtrasInfoModel.gasCharges * val;
            break;
          default:
            break;
        }
        this.meterReadForm.money = isFinite(money) && money >= 0 ? money.toFixed(2) : '';
      }
    },
    value(val) {
      if (val && this.type === 'EDIT') {
        this.getMeterReadInfo();
      }
      if (!val) {
        this.clearData();
      }
    }
  },
  created() {

  },
  methods: {
    // 清空数据
    clearData() {
      this.$refs.meterReadForm.resetFields();
      this.meterReadForm.extraType = 'ELECTRIC_CHARGES';
      this.gardenSearchList = [];
      this.buildingSearchList = [];
      this.roomSearchList = [];
      this.saveStatus = false;
    },
    // 保存
    saveMeterRead() {
      this.$refs.meterReadForm.validate((valid) => {
        if (valid) {
          this.submitForm((status) => {
            if (status) {
              if (this.saveStatus) {
                this.getRoomMeterRead();
                this.changeExtraType();
              } else {
                this.MeterReadDialog = false;
              }
              this.$emit('refreshData');
            }
          });
        }
      });
    },
    // 切换到下一个抄表类型
    changeExtraType() {
      switch (this.meterReadForm.extraType) {
        case 'ELECTRIC_CHARGES':
          this.meterReadForm.extraType = 'WATER_CHARGES';
          break;
        case 'WATER_CHARGES':
          this.meterReadForm.extraType = 'GAS_CHARGES';
          break;
        case 'GAS_CHARGES':
          this.meterReadForm.extraType = 'ELECTRIC_CHARGES';
          break;
        default:
          break;
      }
    },
    // 提交表单
    submitForm(cb) {
      if (this.saveLoading) return;
      this.saveLoading = true;
      let status = false;
      let url = '/security/extraBill/addMeterReading';
      let extraId;
      if (this.type === 'EDIT') {
        url = '/security/extraBill/editReadingRecord';
        extraId = this.id;
      }
      this.$axios.post(url, {
        createOperatorId: this.$store.state.createOperatorId,
        currentRecord: +this.meterReadForm.currentRecord,
        degree: +this.degree,
        extraId: extraId,
        extraType: this.meterReadForm.extraType,
        lastRecord: +this.meterReadForm.lastRecord,
        money: +this.meterReadForm.money,
        readingEnd: this.meterReadForm.readingEnd,
        readingStart: this.meterReadForm.readingStart,
        roomId: this.meterReadForm.roomId
      }).then(res => {
        this.saveLoading = false;
        if (res.data.status === 'C0000') {
          status = true;
          this.$message.success('保存成功');
        } else {
          this.$message.error(res.data.message);
        }
        cb && cb(status);
      }).catch(err => {
        this.saveLoading = false;
        this.$message.error(err.message || '保存失败');
        cb && cb(status);
      });
    },
    // 搜索楼盘
    searchGarden(keyword) {
      if (keyword.trim() === '') {
        this.gardenSearchList = [];
        return;
      }
      this.gardenSearchLoading = true;
      this.$axios.get('/security/room/longSituation/searchGarden', {
        params: {
          searchName: keyword
        }
      }).then(res => {
        this.gardenSearchLoading = false;
        if (res.data.status === 'C0000') {
          this.gardenSearchList = res.data.result;
        } else {
          this.gardenSearchList = [];
        }
      });
    },
    // 搜索楼栋
    searchBuilding() {
      this.buildingSearchLoading = true;
      this.$axios.get('/security/room/longSituation/searchBuilding', {
        params: {
          gardenName: this.meterReadForm.gardenName
        }
      }).then(res => {
        this.buildingSearchLoading = false;
        if (res.data.status === 'C0000') {
          this.buildingSearchList = res.data.result;
        } else {
          this.buildingSearchList = [];
        }
      });
    },
    // 搜索房号
    searchRoom() {
      this.roomSearchLoading = true;
      this.$axios.get('/security/room/longSituation/searchNum', {
        params: {
          gardenName: this.meterReadForm.gardenName,
          buildingName: this.meterReadForm.buildingName
        }
      }).then(res => {
        this.roomSearchLoading = false;
        if (res.data.status === 'C0000') {
          this.roomSearchList = res.data.result;
        } else {
          this.roomSearchList = [];
        }
      });
    },
    // 获取房源发房记录
    getRoomOutMeter() {
      return this.$axios.get('/security/extraBill/selectOutRoomMeter', {
        params: {
          roomId: this.meterReadForm.roomId
        }
      });
    },
    // 获取房源上次抄表记录
    getRoomLastRecord() {
      return this.$axios.get('/security/extraBill/selectBeforeExtraRecord', {
        params: {
          id: this.meterReadForm.roomId
        }
      });
    },
    // 获取房源本次抄表记录
    getRoomCurrentRecord() {
      return this.$axios.get('/security/extraBill/selectExtraBill', {
        params: {
          roomId: this.meterReadForm.roomId,
          extraBillStatus: 'WAIT_GENERATED'
        }
      });
    },
    // 获取房源抄表记录
    getRoomMeterRead() {
      this.$axios.all([this.getRoomLastRecord(), this.getRoomCurrentRecord(), this.getRoomOutMeter()]).then(this.$axios.spread((lastResult, currentResult, outResult) => {
        if (lastResult.data.status === 'C0000') {
          this.lastRecordData = lastResult.data.result;
        } else {
          this.lastRecordData = {};
        }
        if (currentResult.data.status === 'C0000') {
          this.currentRecordData = currentResult.data.result;
        } else {
          this.currentRecordData = {};
        }
        if (outResult.data.status === 'C0000') {
          this.outMeterData = outResult.data.result;
        } else {
          this.outMeterData = {};
        }
        this.extraTypeChange();
      })).catch(err => {
        this.$message.error(err.message);
      });
    },
    // 抄表类型变化时
    extraTypeChange() {
      let currentRecordData = this.currentRecordData;
      let lastRecordData = this.lastRecordData;
      let readingStart;
      switch (this.meterReadForm.extraType) {
        case 'ELECTRIC_CHARGES':
          this.meterReadForm.lastRecord = lastRecordData.lastElectricity || currentRecordData.lastElectricity || '';
          this.meterReadForm.currentRecord = currentRecordData.electricity || '';
          readingStart = lastRecordData.electricityReadingEnd || currentRecordData.electricityReadingStart;
          this.meterReadForm.readingStart = readingStart ? new Date(readingStart) : '';
          this.meterReadForm.readingEnd = currentRecordData.electricityReadingEnd ? new Date(currentRecordData.electricityReadingEnd) : '';
          this.meterReadForm.money = currentRecordData.electricityMoney || '';
          break;
        case 'WATER_CHARGES':
          this.meterReadForm.lastRecord = lastRecordData.lastWater || currentRecordData.lastWater || '';
          this.meterReadForm.currentRecord = currentRecordData.water || '';
          readingStart = lastRecordData.waterReadingEnd || currentRecordData.waterReadingStart;
          this.meterReadForm.readingStart = readingStart ? new Date(readingStart) : '';
          this.meterReadForm.readingEnd = currentRecordData.waterReadingEnd ? new Date(currentRecordData.waterReadingEnd) : '';
          this.meterReadForm.money = currentRecordData.waterMoney || '';
          break;
        case 'GAS_CHARGES':
          this.meterReadForm.lastRecord = lastRecordData.lastGas || currentRecordData.lastGas || '';
          this.meterReadForm.currentRecord = currentRecordData.gas || '';
          readingStart = lastRecordData.gasReadingEnd || currentRecordData.gasReadingStart;
          this.meterReadForm.readingStart = readingStart ? new Date(readingStart) : '';
          this.meterReadForm.readingEnd = currentRecordData.gasReadingEnd ? new Date(currentRecordData.gasReadingEnd) : '';
          this.meterReadForm.money = currentRecordData.gasMoney || '';
          break;
        default:
          break;
      }
    },
    // 编辑时获取已有的房源抄表信息
    getMeterReadInfo() {
      this.$axios.get('/security/extraBill/extraRecordDetails', {
        params: {
          id: this.id
        }
      }).then((res) => {
        if (res.data.status === 'C0000') {
          let extraModel = res.data.result.extraModel;
          this.meterReadForm.gardenName = extraModel.gardenName;
          this.meterReadForm.buildingName = extraModel.buildingName;
          this.meterReadForm.roomId = extraModel.roomId;
          this.roomSearchList = [{ number: extraModel.roomNumber, roomId: extraModel.roomId }];
        } else {
          this.$message.error(res.data.message);
        }
      });
    }
  }
};
</script>
<style lang="scss">
.meter-read-dialog {
  .dialog-box {
    background: #eee;
  }
  .dialog-header {
    padding: 20px;
    background: #fff;
    line-height: 18px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 10;
    .c-red {
      i {
        margin-right: 10px;
      }
    }
  }
  .dialog-body {
    margin: 10px;
    background: #fff;
    padding: 20px 0 0 0;
  }
  .div-jusity {
    display: flex;
    align-items: center;
    line-height: 30px;
    height: 30px;
    font-size: 12px;
    span {
      width: 50px;
      text-align: justify;
      text-align-last: justify;
    }
  }
  .el-input__inner {
    padding-right: 25px;
  }
  .el-checkbox__label {
    font-size: 12px;
  }
  .el-form-item__error {
    width: 110%;
  }
}
</style>

