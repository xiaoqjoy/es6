<template>
  <section class="houseing">
    <header class="header">
      <el-menu :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        active-text-color="#008842"
        @select="handleSelect">
        <el-menu-item index="forwardHousing">远期房态</el-menu-item>
        <el-menu-item index="realHouse">实时房态</el-menu-item>
      </el-menu>
      <div class="hd-buttom">
        <el-popover ref="popover"
          placement="bottom"
          width="510px"
          v-model="filtrateVisible"
          popper-class="filtrate">
          <div class="filtrate-box">
            <div class="filtrateInfo">
              <el-form ref="myFiltrateForm"
                :model="myFiltrateForm"
                size="small">
                <el-form-item>
                  <el-input v-model="myFiltrateForm.searchKey"
                    placeholder="楼盘/楼栋/房间号"
                    clearable
                    :maxlength="10"></el-input>
                </el-form-item>

                <!-- <el-form-item >
                  <el-autocomplete class="inline-input" @select="SelectManagerId" v-model="myFiltrateForm.managerId" :fetch-suggestions="queryManagerList" placeholder="请输入 管家姓名/编码/证件号">

                  </el-autocomplete>
                </el-form-item> -->

                <el-form-item>
                  <el-input v-model="myFiltrateForm.custOrPhone"
                    placeholder="住客姓名或者手机号"
                    clearable
                    :maxlength="11"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-radio-group v-model="myFiltrateForm.roomCount"
                    size="mini">
                    <el-radio-button label="">不限</el-radio-button>
                    <el-radio-button label="1">一房</el-radio-button>
                    <el-radio-button label="2">二房</el-radio-button>
                    <el-radio-button label="3">三房</el-radio-button>
                    <el-radio-button label="4">四房以上</el-radio-button>
                  </el-radio-group>
                </el-form-item>

              </el-form>

            </div>
            <div class="filtrate-button">
              <el-button type="primary"
                size="mini"
                @click="requestData">查询</el-button>
              <el-button type="primary"
                size="mini"
                @click="resetForm">清空</el-button>
              <el-button size="mini"
                @click="filtrateVisible = false">关闭</el-button>
            </div>
          </div>

        </el-popover>
        <el-button :type="this.hadFilter?'primary':''"
          size="mini"
          v-popover:popover>筛选
          <i class="el-icon-arrow-down"></i>
        </el-button>
      </div>
    </header>

    <div class="houseing-table">
      <keep-alive>
        <forward-housing v-if="activeIndex==='forwardHousing'"
          :filterParams="filterParams"></forward-housing>
      </keep-alive>

      <keep-alive>
        <real-house v-if="activeIndex==='realHouse'"
          :filterParams="filterParams"></real-house>
      </keep-alive>
    </div>

    <footer class="footer">
      <span class="c-9">快速查看：</span>
      <span v-for="(item,index) in footerStatus"
        :key="index">

        <span @click="openLog(item)"
          class="footer-item c-9"
          :class="{'c-blue':item.count}">
          {{item.title}} ({{item.count}})
        </span>

      </span>
    </footer>
    <footer-status-log v-if="logVisible"
      :logData="logData"
      @closeLog="closeLog"></footer-status-log>
  </section>
</template>
<script>
import RealHouse from './components/HouseState/RealHouse';
import ForwardHousing from './components/HouseState/ForwardHousing';
import FooterStatusLog from '../../components/OrderForm/FooterStatusLog';
export default {
  name: 'ShortRentHouseStatus',
  components: {
    RealHouse,
    ForwardHousing,
    FooterStatusLog
  },
  data() {
    return {

      logVisible: false,
      footerStatus: [
        { type: 'LIVE_IN', title: '在住', count: 0 },
        { type: 'PRE_LEAVE', title: '今天预离', count: 0 },
        { type: 'PRE_LIVE', title: '今天预到', count: 0 },
        { type: 'FIXED', title: '维修', count: 0 }
      ],
      activeIndex: 'forwardHousing',

      // footerStatusTimer: null,
      houseTitle: '',
      loading: false,
      id: '',
      typeOf: '',
      readOnly: '',
      DialogType: '', // 弹框类型
      currentPage: 1, // 分页当前第几页
      total: 0, // 数据总数
      pageSize: 20, // 每页的数据量
      pageCount: null, /// 总页数
      dialogVisible: false, // 弹框
      detailsDialog: false, // 房源详情
      contractVisible: false, // 添加合同
      filtrateVisible: false, // 搜索
      baseData: {},
      data: [],
      hadFilter: false,
      filterParams: {
        searchKey: '', // 楼盘，楼栋，房间号 关键字
        custOrPhone: '', // 顾客或者手机号 关键字
        roomCount: '', // 房间数量
        managerId: ''
      },
      myFiltrateForm: {
        searchKey: '', // 楼盘，楼栋，房间号 关键字
        custOrPhone: '', // 顾客或者手机号 关键字
        roomCount: '', // 房间数量
        managerId: ''
      },
      tempFiltrateForm: {
        searchKey: '', // 楼盘，楼栋，房间号 关键字
        custOrPhone: '', // 顾客或者手机号 关键字
        roomCount: '', // 房间数量
        managerId: ''
      },
      restaurants: [],
      options: [],
      optionsBuild: [],
      optionsRoomNum: []
    };
  },
  activated() {
    this.getAllFooterData();
    this.footerTimes();
  },
  // beforeDestroy() {
  //   console.log('-----------');
  //   // clearInterval(this.footerStatusTimer);
  // },
  methods: {
    queryManagerList() {
      this.$axios.get('security/order/queryManagerList', {
        params: {
          personKey: this.myFiltrateForm.managerId
        }
      })
        .then((res) => { });
    },
    footerTimes() {
      const self = this;
      let footerStatusTimer = null;
      footerStatusTimer = setInterval(() => {
        self.getAllFooterData();
      }, 60000);

      this.$once('hook:deactivated', () => {
        clearInterval(footerStatusTimer);
        // console.log(footerStatusTimer);
      });
    },

    getAllFooterData() {
      this.footerStatus.forEach((item) => {
        if (item.type !== 'FIXED') {
          this.getOrderCustPage(item.type);
        } else {
          this.getRoomRepairData();
        }
      });
    },

    getOrderCustPage(type) {
      this.$axios.get('security/order/queryOrderCustPage', {
        params: { queryType: type }
      })
        .then((res) => {
          // console.log(res, 'footer列表 数据');
          this.footerStatus.forEach((item) => {
            if (item.type === type) {
              item.count = res.data.result.recordCount;
            }
          });
        });
    },

    getRoomRepairData() {
      this.$axios.get('security/room/fix/queryRoomRepairPage')
        .then((res) => {
          // console.log(res, '维修列表 数据');
          this.footerStatus[3].count = res.data.result.recordCount;
        });
    },

    // 切换房源状态
    handleSelect(key, keyPath) {
      this.activeIndex = key;
    },

    openLog(item) {
      if (item.count === 0) {
        return false;
      }
      this.logVisible = true;
      this.logData = item;
    },

    closeLog() {
      this.logVisible = false;
    },

    // 触发远期房态和实时房态 筛选请求
    requestData() {
      this.filtrateVisible = false;
      this.hadFilter = true;
      this.filterParams = JSON.parse(JSON.stringify(this.myFiltrateForm));
      if (JSON.stringify(this.tempFiltrateForm) === JSON.stringify(this.filterParams)) {
        this.hadFilter = false;
      }
    },

    resetForm() {
      this.myFiltrateForm = {
        searchKey: '', // 楼盘，楼栋，房间号 关键字
        custOrPhone: '', // 顾客或者手机号 关键字
        roomCount: '', // 房间数量
        managerId: ''
      };
      this.filterParams = JSON.parse(JSON.stringify(this.myFiltrateForm));
      this.hadFilter = false;
    },

    // BD联想
    querySearchBD(queryString, cb) {
      this.$axios.get(
        '/security/room/queryReturnBd',
        {
          params: {
            personKey: this.filtrateForm.bdName
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          res.data.result.forEach((item) => {
            item.value = item.bdName;
          });
          this.restaurants = res.data.result;
          var restaurants = this.restaurants;
          var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
          // 调用 callback 返回建议列表的数据
          cb(results);
          // console.log(results);
        }
      }).catch((res) => {
        console.log(res);
      });
    },

    // 楼盘联想
    remoteMethod(query) {
      // console.log(query);
      if (query !== '') {
        this.$axios.get(
          '/security/room/manage/searchGarden',
          {
            params: {
              searchName: query
            }
          }
        ).then((res) => {
          console.log(res);
          if (res.data.status === 'C0000') {
            this.restaurants = res.data.result.map((item) => {
              return {
                value: item.gardenName,
                label: item.gardenName
              };
            });
            // console.log(this.restaurants);
            this.options = this.restaurants.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          } else {

          }
        }).catch((res) => {
          console.log(res);
        });
      } else {
        this.options = [];
      }
    },

    selectData(data, type) {
      this.$axios.post(
        '/security/room/manage/pickRoomId',
        data
      ).then((res) => {
        if (res.data.status === 'C0000') {
          if (type === 'getBuild') {
            this.optionsBuild = res.data.result;
          } else if (type === 'getRoom') {
            this.optionsRoomNum = res.data.result;
          } else if (type === 'getRoomId') {
            console.log(res);
          }
        }
      }).catch((res) => {
        console.log(res);
      });
    },

    selectGardenName(val) {
      this.$axios.get(
        '/security/room/manage/searchBuilding',
        {
          params: {
            gardenName: this.filtrateForm.gardenName
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.optionsBuild = res.data.result;
        } else {
          this.optionsBuild = [];
        }
      });
    },

    selectBuild(val) {
      this.$axios.get(
        '/security/room/manage/searchRoomNum',
        {
          params: {
            gardenName: this.filtrateForm.gardenName,
            buildingName: this.filtrateForm.buildingName
          }
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.optionsRoomNum = res.data.result;
        } else {
          this.optionsRoomNum = [];
        }
      });
    },

    selectRoomNum(val) {
      // this.getHouseInfo(this.AddContract.roomId);
    },

    // 筛选下拉框数据
    requestBaseData() {
      this.$axios.get(
        '/security/room/queryReturn'
      ).then((res) => {
        this.baseData = JSON.parse(res.data.result);
        // JSON.stringify(jsonobj)
        // console.log(res.data.result.Direction);
      }).catch((e) => {
        console.log(e);
      });
    }

  }

};
</script>
<style scoped>
.houseing {
  padding-top: 50px;
  padding-bottom: 50px;
  box-sizing: border-box;
  height: 100%;
  position: relative;
}
.header {
  display: block;
  margin-top: -50px;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
}
.el-menu-demo {
  padding: 0 170px 0 20px;
}
.hd-buttom {
  width: 170px;
  height: 60px;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.houseing-table {
  position: relative;
  margin: 10px 10px 0 10px;
  padding-bottom: 20px;
  height: 100%;
  box-sizing: border-box;
  border: none;
  background-color: #eeeeee;
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

