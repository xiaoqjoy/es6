<template>
  <section>
    <div class="dialog-r">
      <h3 class="h-title">测算模型</h3>
      <p class="p-tip">结果根据通用核算模型计算，只供参考</p>
      <div class="tip-box">
        <h2 class="h-profit">月盈利：
          <span class="profit">{{form.profit}}元</span>
        </h2>
        <!-- <p class="decorate">装修费用：{{form.data}}</p> -->

      </div>
      <el-form size="mini" :model="form" :rules="formRules" ref="formRules" label-position="right" label-width="100px">
        <el-form-item label="预计出房价：" prop="expectHousePrice">
          <el-input placeholder="请输入内容" v-model="form.expectHousePrice" @change="reckInfo" :disabled="type === 'readonly'">
            <template slot="append">元/天</template>
          </el-input>
        </el-form-item>
        <el-form-item label="预计入住率：" prop="expectLiveRate">
          <el-input placeholder="请输入内容" v-model.number="form.expectLiveRate" @change="reckInfo" :disabled="type === 'readonly'">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="租金成本：">
          <input class="calculate-input" v-model="this.rentMoney" readonly="true" />
        </el-form-item>
        <el-form-item label="装修成本：">
          <input class="calculate-input" v-model="this.decoration" readonly="true" />
        </el-form-item>
        <!-- <el-form-item label="保洁成本:">
          <input class="calculate-input" v-model="form.date1" readonly="true" />
        </el-form-item> -->
        <el-form-item label="平台成本：">
          <input class="calculate-input" v-model="form.Platform" readonly="true" />
        </el-form-item>
        <el-form-item label="税收成本：">
          <input class="calculate-input" v-model="form.revenue" readonly="true" />
        </el-form-item>
        <el-form-item label="维修基金：">
          <input class="calculate-input" v-model="form.repair" readonly="true" />
        </el-form-item>
        <el-form-item label="水电物业：">
          <input class="calculate-input" v-model="form.property" readonly="true" />
        </el-form-item>
        <el-form-item label="人员成本：">
          <input class="calculate-input" v-model="form.personnel" readonly="true" />
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      form: {
        expectHousePrice: 100, // 预计出房价
        expectLiveRate: 100, // 预计住房率
        Platform: '20%',
        revenue: '5%',
        repair: '2%',
        property: '8%',
        personnel: '7%',
        profit: ''
      },
      formRules: {
        expectHousePrice: [
          { required: true, message: '预计出房价', trigger: 'blur' },
          { pattern: /^[0-9]\d*$/, message: '请输入正整数' },
          { pattern: /^[0-9]{2,5}$/, message: '输入长度在 2 到 5 位' }
        ],
        expectLiveRate: [
          { required: true, message: '预计入住率', trigger: 'blur' },
          { pattern: /^\d\.([1-9]{1,2}|[0-9][1-9])$|^[1-9]\d{0,1}(\.\d{1,2}){0,1}$|^100(\.0{1,2}){0,1}$/, message: '范围在0-100' }
        ]
      }
    };
  },
  props: ['decoration', 'rentMoney', 'expectHouse', 'expectLive', 'type'],
  mounted() {
    this.form.expectHousePrice = this.expectHouse; // 预计出房价
    this.form.expectLiveRate = this.expectLive; // 预计住房率
    // 月盈利：30*入住率*（出房价-装修成本-平台成本-税收成本-维修基金-水电物业-人员成本）-月租金，保留整数
    this.handleCalculate();
  },
  // beforeUpdate() {
  //   this.reckInfo();
  //   // this.handelRules();
  // },

  methods: {
    reckInfo() {
      this.handleCalculate();
      this.$emit('setRckInfo', {
        expectHousePrice: this.form.expectHousePrice,
        expectLiveRate: this.form.expectLiveRate
      });
    },
    handleCalculate() {
      if (this.form.expectHousePrice > 0 && this.form.expectLiveRate > 0 && this.decoration) {
        let dacorationData = +this.decoration.replace(/%/g, '');
        this.form.profit = (30 * this.form.expectLiveRate * (this.form.expectHousePrice * (58 - dacorationData)) / 10000 - this.rentMoney).toFixed(2);
      } else {
        this.form.profit = '';
      }
    },
    handelRules() {
      this.$refs.formRules.validate((valid) => {
        if (valid) {
          this.reckInfo();
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    }
  },
  watch: {
    decoration(val) {
      // console.log(val);
      this.reckInfo();
    }
  }
};
</script>
<style scoped>
.dialog-r {
  background-color: #fff;
  padding: 20px;
}

h3,
p {
  margin: 0;
}
.h-title {
  text-align: left;
  margin: 0;
}
.p-tip {
  text-align: left;
  margin: 0;
  color: #ccc;
  /* color: #b68d6e; */
}
.tip-box {
  /* height: 80px; */
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin: 20px 0px;
}
.h-profit {
  padding: 10px 0;
}
.profit {
  color: #d66666;
  font-weight: 600;
}
/* .h-profit {
  font-size: 20px;
  height: 50px;
  line-height: 50px;
} */
.calculate-input {
  -webkit-appearance: none;
  background-color: #eeeeee;
  border-radius: 4px;
  border: 1px solid #d8dce5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #5a5e66;
  display: inline-block;
  font-size: inherit;
  line-height: 1;
  outline: 0;
  padding: 0 10px !important;
  width: 100%;
  height: 30px;
  cursor: default;
}
</style>

