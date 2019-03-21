<template>
  <section>
    <div class="pd-20">
      <el-row>
        <el-col :offset="6"
          :span="10">
          <el-form size="mini"
            ref="rentIncrease"
            label-position="right"
            :model="rentData"
            label-width="90px">
            <el-form-item label="递增方式：">
              <el-radio-group v-model="increaseType">
                <el-radio label="RADIO_INCREASE">百分比</el-radio>
                <el-radio label="PRICE_INCREASE">金额</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-for="(item, index) in rentData.rentIncreaseList"
              :key="index"
              :prop="'rentIncreaseList.' +index + '.amount'"
              :rules="[{ validator: increaseRules, trigger: 'change' }]">
              <slot slot="label">
                <span class="el-form-item__label"
                  style="width: 90px;">
                  第{{index+2}}年：</span>
              </slot>
              <el-input placeholder="请输入增长"
                v-model.number="item.amount"
                :maxlength='6'>
                <template slot="append">{{increaseType === 'RADIO_INCREASE' ? '%' : '元'}}</template>
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div class="dialog-footer">
      <el-button type="primary"
        @click="handleSetData"
        size="mini">确定
      </el-button>
      <el-button size="mini"
        @click="handleCloseDialog">取 消</el-button>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    const increaseRules = (rule, value, callback) => {
      if (value) {
        if (this.increaseType === 'RADIO_INCREASE' && !(/^(([0-9]|[1][0-9]|20)|(([0-9]|[1][0-9])\.[0-9]{0,1}))$/).test(value)) {
          callback(new Error('请输入不能超过20的数字，支持一位小数'));
        } else if (this.increaseType === 'PRICE_INCREASE' && !(/^[0-9]{0,5}$/).test(value)) {
          callback(new Error('输入数字长度在 0 到 5 位'));
        }
      }
      callback();
    };
    return {
      increaseRules,
      houseInfo: {
        roomType: '',
        floor: ''
      },
      increaseType: 'RADIO_INCREASE',
      rentData: {
        rentIncreaseList: []
      }
    };
  },
  props: {
    leaseDays: {
      type: Number,
      default: 0
    },
    myIncreaseType: {
      type: String,
      default: ''
    },
    increaseData: {
      type: String,
      default: ''
    }
  },
  created() {
    let increaseDataList = [];
    if (this.myIncreaseType) {
      this.increaseType = this.myIncreaseType;
      increaseDataList = this.increaseData.split(',');
    }
    let myleaseDays = this.leaseDays - 1;
    for (let i = 0; i < myleaseDays; i++) {
      this.rentData.rentIncreaseList.push({
        amount: increaseDataList[i] ? increaseDataList[i] : 0
      });
    }
  },
  methods: {
    // 以百分率递增","key":"RADIO_INCREASE"},{"value":"以金额递增","key":"PRICE_INCREASE"}

    handleSetData() {
      this.$refs.rentIncrease.validate((valid) => {
        // console.log(this);
        if (valid) {
          let myExtras = '';
          let myAmount = 0;
          for (let i = 0; i < this.rentData.rentIncreaseList.length; i++) {
            myAmount = myAmount + (+this.rentData.rentIncreaseList[i].amount);
            myExtras = myExtras + ',' + this.rentData.rentIncreaseList[i].amount;
          }
          // 去掉一个逗号
          // console.log(myAmount);
          myExtras = myExtras.trim().slice(1);
          if (this.increaseType === 'RADIO_INCREASE') {
            this.$emit('updateLeasePriceRate', { 'RADIO_INCREASE': myExtras });
          } else {
            this.$emit('updateLeasePriceRate', { 'PRICE_INCREASE': myExtras });
          }
          this.handleCloseDialog();
        } else {
          this.$message.error('请正确填表单信息！');
        }
      });
    },
    handleCloseDialog() {
      this.$emit('update:rentIncreaseDialog', false);
    }
  }
};
</script>
<style scoped>
</style>


