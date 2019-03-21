<template>
  <section class="house-box">
    <header class="house-header"
      style="background: #fff;">
      <el-menu :default-active="activeIndex"
        @select="handleMenuSelect"
        class="el-menu-demo"
        mode="horizontal"
        active-text-color="#008842">
        <el-menu-item index="jointRent">合租</el-menu-item>
        <el-menu-item index="entireRent">整租</el-menu-item>
      </el-menu>
      <!-- <el-row>
        <el-col :span="16">

        </el-col>
        <el-col :span="6">
          <div class="mart-10">
            <el-input placeholder="输入小区/楼栋/房号/租客姓名/手机搜索"
              v-model="searchKey"
              size="mini"
              @keyup.enter.native="handleRquerst"
              @input="changeSearchKey"
              clearable></el-input>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="mart-10 mgl-20">
            <el-button type="primary"
              @click="handleRquerst"
              size="mini">搜索</el-button>
          </div>
        </el-col>
      </el-row> -->
    </header>

    <keep-alive>
      <joint-rent :queryType="queryType"
        :cityList="cityList"
        ref="JointRent"
        @refreshCount="requestData(2)"
        v-if="activeIndex==='jointRent'">
      </joint-rent>
      <entire-rent :queryType="queryType"
        :cityList="cityList"
        ref="EntireRent"
        @refreshCount="requestData(1)"
        v-if="activeIndex==='entireRent'">
      </entire-rent>
    </keep-alive>

    <footer class="footer">
      <el-form ref="form"  label-width="80px">
      <el-form-item label="快速查看：">
      <el-radio-group v-model="queryType">
        <el-radio :label="''">全部（{{this.bottomData.empty+this.bottomData.rent}}）</el-radio>
        <el-radio :label="'EMPTY'">空置（{{this.bottomData.empty}}）</el-radio>
        <el-radio :label="'BOOKING'">已预定({{ this.bottomData.booking }})</el-radio>
        <el-radio :label="'RENT'">已租（{{this.bottomData.rent}}）</el-radio>
        <el-radio :label="'EXPIRE'">租约到期（{{this.bottomData.expire}}）</el-radio>
        <el-radio :label="'DUE'">即将到期（{{this.bottomData.due}}）</el-radio>
        <el-radio :label="'OVERDUE'">租金逾期（{{this.bottomData.overDue}}）</el-radio>
        <el-radio :label="'HAS_RENT'">收租（{{this.bottomData.hasRent}}）</el-radio>
      </el-radio-group>
      </el-form-item>
      </el-form>
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
import { mapState } from 'vuex';
export default {
  name: 'LongEntireRentHouseStatus',
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
      ERsearchKey: '',
      JRsearchKey: '',
      detailDialog: false, // 房态详情弹框
      ckeckoutDialog: false, // 租客退租弹框
      rentBillDialog: false, // 账单弹框
      meterDialog: false,
      cityList: []
    };
  },
  mounted() {
    if (this.activeIndex === 'entireRent') {
      this.requestData('1');
    } else {
      this.requestData('2');
    }
    this.requestCityList();
  },
  methods: {
    requestData(key) {
      this.$axios.get(
        '/security/roomStatus/queryRoomCount',
        {
          params: {
            queryType: key,
            searchKey: this.searchKey
          }
        }
      ).then((res) => {
        // longSituationList里的longChamberId关联longChamberList的id
        if (res.data.result && res.data.status === 'C0000') {
          this.bottomData = res.data.result;
        } else {
          this.bottomData = {
            hasRent: 0,
            expire: 0,
            due: 0,
            empty: 0,
            rent: 0,
            overDue: 0
          };
          // if (!res.data.result) {
          //   this.$message.error('无该账单数据');
          // } else {
          // }
          // this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.bottomData = {
          hasRent: 0,
          expire: 0,
          due: 0,
          empty: 0,
          rent: 0,
          overDue: 0
        };
        console.log(err);
      });
    },
    // 切换房源状态
    handleMenuSelect(key, keyPath) {
      this.activeIndex = key;
      if (this.activeIndex === 'entireRent') {
        this.requestData('1');
        // this.searchKey = this.ERsearchKey;
      } else {
        this.requestData('2');
        // this.searchKey = this.JRsearchKey;
      }
    },

    requestCityList() {
      this.$axios.get('/security/roomStatus/contract/queryCityOrgLongNumber',
        {
          params: {
            orgLongNumber: this.userInfo.orgLongNumber
          }
        }).then((res) => {
          if (res.data.status === 'C0000') {
            this.cityList = res.data.result;
          } else {

          }
        }).catch(err => {
          console.log(err);
          this.$message.warning(`获取城市信息${err.message || '服务异常'}`);
        });
    }

    // handleRquerst() {
    //   if (this.activeIndex === 'entireRent') {
    //     this.requestData('1');
    //     this.$refs.EntireRent.handlePageChange(1);
    //   } else {
    //     this.requestData('2');
    //     this.$refs.JointRent.handlePageChange(1);
    //   }
    // },
    // changeSearchKey() {
    //   if (this.activeIndex === 'entireRent') {
    //     this.ERsearchKey = this.searchKey;
    //   } else {
    //     this.JRsearchKey = this.searchKey;
    //   }
    // }

  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  }

};
</script>
<style scoped>
.el-menu-demo {
  padding: 0 170px 0 20px;
}
.footer {
  background-color: #fff;
  border-top: 1px solid #ddd;
  height: 50px;
  width: 100%;
  line-height: 50px;
  text-align: left;
  padding-left: 20px;
}
</style>

