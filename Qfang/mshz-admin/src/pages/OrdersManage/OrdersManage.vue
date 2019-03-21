<template>
  <div class="bgc-eeeeee">
    <section class="order-list" v-loading="loading">
      <div class="container-wrap">
        <header class="search-head">
          <el-row type="flex" justify="start" :gutter="10">
            <el-col :span="6" style="width:250px">
              <el-row>
                <el-col :span="6">
                  <span class="font-12 c-6" style="line-height:32px">订单状态：</span>
                </el-col>
                <el-col :span="18">
                  <el-select class="font-12 c-6" @change="search" v-model="orderState" placeholder="全部" clearable size="mini">
                    <el-option class="font-12 c-6" v-for="(val,key) in orderStateEnum" :key="key" :label="val" :value="key">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="6" style="width:250px">
              <el-row>
                <el-col :span="5">
                  <span class="font-12 c-6 pdl-ten" style="line-height:32px">渠道：</span>
                </el-col>
                <el-col :span="18">
                  <el-select class="font-12 c-6" @change="search" v-model="orderChannel" placeholder="全部" clearable size="mini">
                    <el-option class="font-12 c-6" v-for="(val,key) in orderChannelEnumAll" :key="key" :label="val" :value="key">
                    </el-option>
                  </el-select>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12" style="width:340px">
              <el-row type="flex" justify="start">
                <el-col>
                  <el-input class="search-inp font-12 c-6 " placeholder="姓名／手机／订单号／房间号" v-model="searchKey" clearable size="mini">
                  </el-input>
                </el-col>
                <el-col>
                  <el-button style="margin-left:20px" @click="search" type="success" size="mini">搜索</el-button>
                </el-col>
              </el-row>
            </el-col>

          </el-row>
        </header>
        <slot v-if="this.orderListData.items&&this.orderListData.items.length>0">
          <div class="container bd-ddd mgr-20" @click="openDetail(item.orderNo)" v-for="(item, index) in orderListData.items" :key="index">
            <header class="head font-12 c-6">
              <div class="head-left">
                <span>订单编号：</span>
                <span>{{item.orderNo}}</span>

                <span class="pdl-20">来源：</span>
                <span>{{item.orderChannelDesc}}</span>
                <span v-if="item.channelNo">({{item.channelNo}})</span>

                <span class="pdl-20">下单时间：</span>
                <span>{{item.createTimeDesc}}</span>
              </div>
              <div class="head-right">
                <span class="c-6">订单状态：</span>
                <span class="c-red">{{item.orderStateDesc}}</span>
              </div>
            </header>
            <section class="main bdt-ddd pdl-20">
              <div class="main-grow">
                <img v-if="item.roomMainPic&&item.roomMainPic.length > 0" class="img border-ddd" :src="item.roomMainPic.replace('{size}', '120x90')" alt="" width="120" height="90">
                <div v-else class="img border-ddd">暂无图片</div>
                <div class="detail pdl-20">
                  <p class="font-18 c-3 ta-l">{{item.gardenName}}</p>
                  <p class="font-12 line-h-20 c-9 ta-l pdt-20">{{item.gardenName}}，{{item.buildingName}}，{{item.roomNo}}</p>
                  <p class="font-12 line-h-20 c-9 ta-l">入住时间：{{item.startTime}}至{{item.endTime}}，共{{item.bookedDays}}天</p>
                </div>
              </div>
              <div class="main-nogrow bdl-eee flex-center flex-c">
                <p class="font-12 c-9">住客</p>
                <!-- <p class="font-14 c-3 pdt-20" v-for="(item, index) in item.custModelList " :key="index"> -->
                <p class="font-14 c-3 pdt-20">
                  {{item.custName}}
                </p>
              </div>
              <div class="main-nogrow bdl-eee flex-center flex-c">
                <p class="font-12 c-9">总房费</p>
                <p class="font-14 c-red pdt-20">{{item.roomRate}}元</p>
              </div>
              <div class="main-nogrow bdl-eee flex-center flex-c">
                <p class="font-12 c-9">押金</p>
                <p class="font-14 c-red pdt-20">{{item.roomDeposit}}元</p>
              </div>
              <div class="main-nogrow bdl-eee flex-center flex-c" v-if="(item.orderState==='CHECKED_OUT'||item.orderState==='EARLY_CHECKED_OUT'||item.orderState==='CANCELL_REFUND') && (item.refund)">
                <p class="font-12 c-9">退款金额</p>
                <p class="font-14 c-red pdt-20">{{item.refund}}元({{item.refundStateDesc}})</p>
              </div>
            </section>
          </div>
        </slot>
        <slot v-else>
          <div class="no-data-found flex-center">
            暂无数据！
          </div>
        </slot>
      </div>
      <div class="btm">
        <div class="ored-pagination border-ddd">
          <el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :current-page="currentPage" :page-sizes="[5, 10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="orderListData.recordCount">
          </el-pagination>
        </div>
      </div>
    </section>
    <!-- 详情页弹窗 -->
    <order-detail v-if="detailVisible" @closeDetail="closeDetail" :orderNo="orderNo">
    </order-detail>

  </div>
</template>
<script>
import OrderDetail from '../../components/OrderForm/OrderDetail';
export default {
  name: 'OrdersManage',
  components: {
    OrderDetail
  },
  data() {
    return {
      loading: true,
      orderNo: '',
      orderListData: [], // 订单列表
      detailVisible: false,
      innerVisible: false,
      pageSize: 5,
      currentPage: 1,
      orderState: '',
      orderChannel: '',
      searchKey: '',
      // 订单状态枚举
      orderStateEnum: {},
      // 订单渠道枚举
      orderChannelEnumAll: {},
      payChannelEnum: {}, // 支付方式
      refundWayEnum: {}

    };
  },

  mounted() {
    // 获取 所有的枚举状态
    this.$axios.get('security/order/getAllEnum')
      .then((res) => {
        const { result } = res.data;
        this.orderStateEnum = result.OrderStateEnum;
        this.orderChannelEnumAll = result.OrderChannelEnumAll;
        this.payChannelEnum = result.PayChannelEnum;
        this.refundWayEnum = result.RefundWayEnum;
      });
    this.search();
  },

  methods: {
    handleSizeChange(val) {
      this.pageSize = val;
      this.search();
    },
    handlePageChange(val) {
      this.currentPage = val;
      this.search();
    },
    search() {
      this.loading = true;
      this.$axios.get('security/order/queryOrderInfoPage', {
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage,
          orderState: this.orderState,
          orderChannel: this.orderChannel,
          searchKey: this.searchKey
        }
      })
        .then((res) => {
          this.loading = false;
          if (res.data.status === 'C0000') {
            this.orderListData = res.data.result;
          } else {
            this.$message({
              type: 'warning',
              message: res.data.message
            });
            this.orderListData.items = [];
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
          this.$message.error(err.message || '服务器异常');
          this.orderListData.items = [];
        });
    },
    openDetail(data) {
      this.orderNo = data;
      this.detailVisible = true;
    },
    closeDetail(s) {
      this.detailVisible = false;
      if (s === 'success') {
        this.search();
      }
    }
  }
};
</script>
<style scoped>
.bgc-eeeeee {
  min-width: 900px;
  height: 100%;
  padding-left: 10px;
}
.search-head {
  margin: 20px 0;
}
.bt-green {
  height: 30px;
  width: 60px;
  font-size: 12px;
  border-radius: 3px;
}

.order-list {
  position: relative;
  height: 100%;
}

.foot {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  height: 50px;
}
.container-wrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 70px;
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
}

.container {
  margin-bottom: 10px;
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fafafa;
  height: 40px;
  padding: 0 20px;
}
.main {
  display: flex;
  align-items: center;
  height: 128px;
  background-color: #fff;
}
.main-grow {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 90px;
}
.img {
  width: 120px;
  height: 90px;
  display: block;
  line-height: 90px;
  text-align: center;
  color: #ddd;
  font-size: 12px;
}
.main-nogrow {
  height: 128px;
  width: 120px;
}
.bt-green {
  height: 30px;
  width: 60px;
  font-size: 12px;
  border-radius: 3px;
}
.search-inp {
  width: 250px;
}
.btm {
  height: 54px;
  box-sizing: border-box;
  position: absolute;
  bottom: 18px;
  left: 0;
  right: 20px;
}
.ored-pagination {
  width: 100%;
  padding: 10px;
  background-color: #fafafa;
  box-sizing: border-box;
}
.no-data-found {
  position: absolute;
  top: 65px;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  margin-right: 20px;
  font-size: 14px;
  text-align: center;
  background-color: #fff;
  border: 1px solid #dddddd;
}
</style>
