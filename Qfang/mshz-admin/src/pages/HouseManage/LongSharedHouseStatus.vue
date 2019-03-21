<template>
  <section class="houseing">
    <header class="header">
      <el-row>
        <!-- <el-col :span="16">
          <el-menu :default-active="activeIndex"
            @select="handleMenuSelect"
            class="el-menu-demo"
            mode="horizontal"
            active-text-color="#008842">
            <el-menu-item index="jointrent">合租</el-menu-item>
            <el-menu-item index="allrent">整租</el-menu-item>
          </el-menu>
        </el-col> -->
        <el-col :span="6" :offset="16">
          <div class="hd-buttom">
            <el-input v-model="searchKey" placeholder="输入小区/楼栋/房号/租客姓名/手机搜索" size="mini" clearable></el-input>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="hd-buttom">
            <el-button type="primary" @click="handleRquerst" size="mini">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </header>

    <div class="houseing-table">
      <keep-alive>
        <joint-rent :queryType="queryType" :searchKey="searchKey" ref="JointRent" v-if="activeIndex==='jointRent'">
        </joint-rent>
      </keep-alive>
      <!-- <keep-alive>
        <entire-rent v-if="activeIndex==='entireRent'"></entire-rent>
      </keep-alive> -->
    </div>

    <footer class="footer">
      <span class="c-9">快速查看：</span>
      <el-radio-group v-model="queryType">
        <el-radio :label="''">全部（{{this.bottomData.empty+this.bottomData.rent}}）</el-radio>
        <el-radio :label="'EMPTY'">空置（{{this.bottomData.empty}}）</el-radio>
        <el-radio :label="'RENT'">已租（{{this.bottomData.rent}}）</el-radio>
        <el-radio :label="'EXPIRE'">租约到期（{{this.bottomData.expire}}）</el-radio>
        <el-radio :label="'DUE'">即将到期（{{this.bottomData.due}}）</el-radio>
        <el-radio :label="'OVERDUE'">租金逾期（{{this.bottomData.overDue}}）</el-radio>
        <el-radio :label="'HAS_RENT'">收租（{{this.bottomData.hasRent}}）</el-radio>
      </el-radio-group>
      <!-- <span v-for="(item,index) in footerStatus"
        :key="index">

        <span @click="openLog(item)"
          class="footer-item c-9"
          :class="{'c-blue':item.count}">
          {{item.title}} ({{item.count}})
        </span>

      </span> -->
    </footer>

  </section>
</template>
<script>
import EntireRent from './components/LongRentState/EntireRent'; // 整租
import JointRent from './components/LongRentState/JointRent'; // 合租
import LongRentHouseDetail from './components/LongRentState/LongRentHouseDetail'; // 房态详情
import LongRentCheckout from './components/LongRentState/LongRentCheckout'; // 退租
import LongRentBill from './components/LongRentState/LongRentBill'; // 账单
import MeterReading from './components/LongRentState/MeterReading'; // 抄表
export default {
  name: 'LongSharedHouseStatus',
  components: {
    EntireRent,
    JointRent,
    LongRentHouseDetail,
    LongRentCheckout,
    LongRentBill,
    MeterReading
  },
  data() {
    return {
      bottomData: {
        hasRent: 0,
        expire: 0,
        due: 0,
        empty: 0,
        rent: 0,
        overDue: 0
      },
      activeIndex: 'jointRent',
      queryType: '',
      searchKey: '',
      detailDialog: false, // 房态详情弹框
      ckeckoutDialog: false, // 租客退租弹框
      rentBillDialog: false, // 账单弹框
      meterDialog: false
    };
  },
  mounted() {
    this.requestData();
  },
  methods: {
    requestData() {
      this.$axios.get(
        '/security/roomStatus/queryRoomCount',
        {
          params: {
            queryType: '2',
            searchKey: this.searchKey
          }
        }
      ).then((res) => {
        // longSituationList里的longChamberId关联longChamberList的id
        if (res.data.result && res.data.status === 'C0000') {
          this.bottomData = res.data.result;
        } else {
          // if (!res.data.result) {
          //   this.$message.error('无该账单数据');
          // } else {
          // }
          // this.$message.error(res.data.message);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    // 切换房源状态
    handleMenuSelect(key, keyPath) {
      this.activeIndex = key;
      // this.requestData();
    },

    handleRquerst() {
      this.requestData();
      this.$refs.JointRent.requestData();
    }

  }

};
</script>
<style scoped>
.houseing {
  padding-top: 80px;
  padding-bottom: 50px;
  box-sizing: border-box;
  height: 100%;
  position: relative;
}
.header {
  display: block;
  margin-top: -80px;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  background-color: #fff;
}
.el-menu-demo {
  padding: 0 170px 0 20px;
}
.hd-buttom {
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* border-bottom: solid 1px #e6e6e6; */
}
.houseing-table {
  position: relative;
  margin: 10px 10px 0 10px;
  height: 100%;
  box-sizing: border-box;
  /* border: 1px solid #cccccc; */
  background-color: #eeeeee;
}
.talbe-box {
  width: 100%;
  height: 100%;
}
.default-color {
  background-color: #333;
}

.green {
  border-color: #008842;
  color: #008842;
}
.red {
  border-color: #c55454;
  color: #c55454;
}
.state-green {
  color: #008842;
}
.state-black {
  color: #000;
}
.room-number {
  font-size: 14px;
  font-weight: 600;
  color: #008842;
}
.pagination {
  /* display: none; */
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 50px;
  /* padding-top: 9px; */
  box-sizing: border-box;
  background-color: #fff;
}
.page {
  margin-top: 8px;
  margin-left: 20px;
  float: left;
}

.filtrate-box {
  padding: 20px;
}
.filtrate-button {
  height: 50px;
  margin: 0;
  text-align: right;
  line-height: 50px;
  border-top: 1px solid #ccc;
}
.footer {
  position: fixed;
  bottom: 0;
  background-color: #fff;
  height: 50px;
  width: 100%;
  line-height: 50px;
  text-align: left;
  padding-left: 20px;
}
.footer-item {
  padding-right: 40px;
}
.footer-item:hover {
  cursor: pointer;
}
.c-blue {
  color: #4b8daf;
}
.height-light {
  color: #fff;
  background-color: #4b8daf;
}
</style>

