
<template>
  <section class="houseing">
    <header class="header">
      <el-row>
        <el-col :span="16">
          <el-menu :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            active-text-color="#008842"
            @select="handleMenuSelect">
            <el-menu-item index="ENABLED">已上架</el-menu-item>
            <el-menu-item index="DISABLED">已下架</el-menu-item>
            <el-menu-item index="EDITING">
              待发布
              <el-badge v-if="editingNubmer > 0"
                :value="editingNubmer"
                class="editingNubmer">
              </el-badge>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="6">
          <div class="search-btn">
            <el-input v-model="queryKey"
              placeholder="输入标题/小区/楼栋/房号搜索"
              size="mini"
              clearable></el-input>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="search-btn">
            <el-button type="primary"
              size="mini"
              @click="handlePageChange(1)">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </header>
    <div class="houseing-table">
      <el-table :data="HouseData"
        header-align="center"
        ref="houseReleaseTable"
        size="small"
        height="100%"
        cell-class-name="default-color"
        class="talbe-box"
        @row-click="handleRow"
        v-loading="loading">
        <el-table-column prop="title"
          label="房源标题"
          :min-width="150"
          align="center"
          v-if="activeIndex !== 'EDITING'" />
        <el-table-column prop="room.gardenName"
          label="楼盘"
          :min-width="100"
          align="center" />
        <el-table-column prop="room.buildingName"
          label="楼栋"
          :min-width="80"
          align="center" />
        <el-table-column prop="room.number"
          label="房号"
          :min-width="80"
          align="center">
          <template slot-scope="scope">
            <span class="room-number">{{ scope.row.room.number }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="doorModel"
          label="户型"
          :min-width="80"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.room.bedRoom }}房</span>
            <span>{{ scope.row.room.livingRoom }}厅</span>
          </template>
        </el-table-column>
        <el-table-column prop="price"
          label="平日价"
          :min-width="80"
          align="center"
          class-name="columSimple" />
        <el-table-column prop="priceWeekend"
          label="周末价"
          :min-width="80"
          align="center"
          class-name="columSimple" />
        <el-table-column prop="managersDesc"
          label="管家"
          :min-width="80"
          align="center"
          class-name="columSimple">
          <!-- <template slot-scope="scope">
            <span v-if="scope.row.managers.length > 0">{{scope.row.managers[0].name}}</span>
          </template> -->
        </el-table-column>
        <el-table-column v-if="activeIndex === 'ENABLED'"
          label="上架日期"
          :min-width="100"
          align="center"
          class-name="columSimple">
          <template slot-scope="scope">
            {{scope.row.upTimeDesc}}
          </template>
        </el-table-column>
        <el-table-column v-else-if="activeIndex === 'DISABLED'"
          label="下架日期"
          :min-width="100"
          align="center"
          class-name="columSimple">
          <template slot-scope="scope">
            {{scope.row.downTimeDesc}}
          </template>
        </el-table-column>
        <el-table-column v-else
          label="交房日期"
          :min-width="100"
          align="center"
          class-name="columSimple">
          <template slot-scope="scope">
            {{scope.row.commitHouseTimeDesc}}
          </template>
        </el-table-column>
        <el-table-column label="操作"
          :width="150"
          align="center">
          <template slot-scope="scope">
            <el-button v-if="checkPermission('SITUATION_EDIT')"
              type="text"
              size="small"
              @click.stop="handelPrice(scope.$index, scope.row)">价格日历</el-button>
            <el-button v-if="checkPermission('SITUATION_EDIT')"
              type="text"
              size="small"
              @click.stop="handleEdit(scope.$index, scope.row)">
              <span v-if="activeIndex === 'EDITING'">发布房源</span>
              <span v-else>编辑</span>
            </el-button>
            <el-button type="text"
              size="small"
              v-if="checkPermission('SITUATION_EDIT') && activeIndex ==='ENABLED'"
              @click.stop="handleSoldOut(scope.$index, scope.row, 'down')">下架</el-button>
            <el-button type="text"
              size="small"
              v-else-if=" checkPermission('SITUATION_DOWN') && activeIndex === 'DISABLED'"
              @click.stop="handleSoldOut(scope.$index, scope.row, 'up')">上架</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination class="page"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
          :current-page.sync="currentPage"
          :page-sizes="[20, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :page-count="pageCount"
          :total="recordCount">
        </el-pagination>
      </div>
    </div>
    <!-- 弹框 -->
    <el-dialog title="编辑房源"
      :visible.sync='detailsDialog'
      :close-on-click-modal="false"
      width="950px">
      <house-edit :id="id"
        :roomId="roomId"
        v-if="detailsDialog"
        v-on:changeDialog="getChange"
        v-on:refreshData="requestData"></house-edit>
    </el-dialog>

    <el-dialog title="房源详情"
      :visible.sync='dialogVisible'
      :close-on-click-modal="false"
      width="950px">
      <house-release-info :id="id"
        :roomId="roomId"
        v-if="dialogVisible"
        v-on:changeDialog="getChange"></house-release-info>
    </el-dialog>

    <el-dialog :visible.sync='priceDialog'
      :close-on-click-modal="false"
      width="500px">
      <price-calendar :id="id"
        :roomId="roomId"
        v-if="priceDialog"
        :baseData="baseData"
        v-on:changeDialog="priceDialog = true"></price-calendar>
    </el-dialog>

  </section>
</template>
<script>
import HouseEdit from './components/HouseRelease/HouseEdit';
import HouseReleaseInfo from './components/HouseRelease/HouseReleaseInfo';
import PriceCalendar from './components/HouseRelease/PriceCalendar';
import { handlePages } from '@/components/common/mixin';
export default {
  name: 'HouseRelease',
  mixins: [handlePages],
  data() {
    return {
      editingNubmer: 0,
      baseData: {},
      id: '',
      roomId: '',
      queryKey: '',
      loading: true,
      handleInfo: '下架',
      handleUrl: '/security/room/situation/down',
      handlemesg: '不在',
      activeIndex: 'ENABLED',

      dialogVisible: false, // 弹框
      detailsDialog: false, // 房源详情
      priceDialog: false, // 房源详情
      HouseData: [],
      result: {
        'items': [
          {
            'bedCount': 0,
            'bedDesc': '1.8*1.2',
            'cancelAble': false,
            'cancelDays': 0,
            'cancelRemark': '',
            'createOperatorId': '',
            'createTime': null,
            'customerCount': 1,
            'deposit': 0,
            'desc': '',
            'furnitures': [],
            'id': '',
            'inTime': '14:00',
            'managers': [],
            'managersDesc': '',
            'outTime': '12:00',
            'pictures': [],
            'price': '',
            'priceWeekend': '',
            'remark': '',
            'room': {
              'area': 0,
              'balcony': 0,
              'bdName': '',
              'bedRoom': 0,
              'totalFloor': 0,
              'buildingName': '',
              'city': '',
              'createOperatorId': '',
              'createTime': null,
              'createTimeDesc': '',
              'dataState': null,
              'decoration': null,
              'decorationDesc': '',
              'direction': null,
              'directionDesc': '',
              'expectHousePrice': 0,
              'expectLiveRate': 0,
              'floor': 0,
              'gardenId': '',
              'gardenName': '',
              'id': 'bbb8a648-e181-4e68-8862-1b750faf1380',
              'kitchen': 0,
              'leaseholdID': '',
              'livingRoom': 0,
              'number': '',
              'ownerID': '',
              'ownerName': '',
              'pictureID': '',
              'rentUseType': null,
              'rentUseTypeDesc': '',
              'roomDescription': '',
              'roomType': null,
              'roomTypeDesc': '',
              'state': null,
              'stateDesc': '',
              'toilet': 0,
              'updateOperatorId': '',
              'updateTime': null,
              'updateTimeDesc': ''
            },
            'roomId': 'bbb8a648-e181-4e68-8862-1b750faf1380',
            'status': 'ENABLED',
            'title': '',
            'upTime': null,
            'updateOperatorId': '',
            'updateTime': null,
            'weekend': '5,6'
          }
        ]
      }
    };
  },
  created() {
    this.requestData();
    this.geteditingNubmer();
  },
  methods: {

    // 获取列表数据
    requestData() {
      this.loading = true;
      this.geteditingNubmer();
      this.$axios.get(
        '/security/room/situation/querySituation',
        {
          params: {
            status: this.activeIndex,
            currentPage: this.currentPage,
            pageSize: this.pageSize,
            queryKey: this.queryKey
          }
        }
      ).then((res) => {
        this.loading = false;
        if (res.data.status === 'C0000') {
          this.pageCount = res.data.result.pageCount;
          this.recordCount = res.data.result.recordCount;
          this.HouseData = res.data.result.items;
        } else {
          this.HouseData = [];
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.loading = false;
        this.HouseData = [];
        this.$message.error(err.message || '服务器异常');
      });
    },

    // 获取待发布的数据量
    geteditingNubmer() {
      this.$axios.get(
        '/security/room/situation/querySituationNum'
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.editingNubmer = res.data.result;
        } else {

        }
      }).catch((res) => {

      });
    },

    // 上下架
    handleSoldOut(index, row, type) {
      if (type === 'up') {
        this.handlemesg = '在';
        this.handleInfo = '上架';
        this.handleUrl = '/security/room/situation/up';
      } else {
        this.handlemesg = '不在';
        this.handleInfo = '下架';
        this.handleUrl = '/security/room/situation/down';
      }
      this.id = row.id;
      const h = this.$createElement;
      this.$msgbox({
        message: h('div', null, [
          h('p', null, '确定要' + this.handleInfo + '房源 （' + row.room.gardenName + '-' + row.room.buildingName + '-' + row.room.number + ') 吗?'),
          h('p', null, this.handleInfo + '后，房源将' + this.handlemesg + '房态及民宿好住平台展示。')
        ]),
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';

            this.$axios.post(
              this.handleUrl,
              {
                id: row.id
              }
            ).then((res) => {
              instance.confirmButtonLoading = false;
              // instance.confirmButtonText = '确定';
              if (res.data.status === 'C0000') {
                if (res.data.result) {
                  this.$message.success('操作成功');
                  this.requestData();
                } else {
                  this.$message.error('操作失败');
                }
              }
              done();
            }).catch((e) => {
              instance.confirmButtonLoading = false;
              this.$message.error('操作失败!!!');
              done();
            });
          } else {
            instance.confirmButtonLoading = false;
            done();
          }
        }
      }).then(action => {
        // console.log(action);
      }).catch((e) => {
        console.log(e);
      });
    },

    // 子组件传来的
    getChange(data) {
      this.detailsDialog = data;
    },

    // 点击当前行
    handleRow(row, event, column) {
      this.id = row.id;
      this.roomId = row.room.id;
      this.dialogVisible = true;
    },

    // 编辑
    handleEdit(index, row) {
      this.id = row.id;
      this.roomId = row.room.id;
      this.detailsDialog = true;
    },

    // 切换房源状态
    handleMenuSelect(key, keyPath) {
      this.activeIndex = key;
      this.handlePageChange(1);
    },
    // 搜索
    // handleSearch() {
    //   this.loading = true;

    //   this.$axios.get(
    //     '/security/room/situation/querySituation',
    //     {
    //       params: {
    //         status: this.activeIndex,
    //         currentPage: this.currentPage,
    //         pageSize: this.pageSize,
    //         queryKey: this.queryKey
    //       }
    //     }
    //   ).then((res) => {
    //     console.log(res);
    //     this.loading = false;
    //     if (res.data.status === 'C0000') {
    //       this.pageCount = res.data.result.pageCount;
    //       this.HouseData = res.data.result.items;
    //     } else {
    //       this.HouseData = [];
    //       this.releaseOpen('服务器异常', 'error');
    //     }
    //   }).catch((res) => {
    //     this.loading = false;
    //     this.HouseData = [];
    //     this.releaseOpen('网络异常', 'error');
    //     console.log(res);
    //   });
    // },

    // 设置价格
    handelPrice(index, row) {
      this.roomId = row.roomId;
      this.baseData = row;
      this.priceDialog = true;
    }

    // 提示框
    // releaseOpen(message, type) {
    //   this.$message({
    //     showClose: true,
    //     duration: 2,
    //     message: message,
    //     type: type
    //   });
    // }
  },
  components: {
    HouseEdit,
    HouseReleaseInfo,
    PriceCalendar
  }
};
</script>
<style scoped>
.houseing {
  padding-top: 80px;
  padding-bottom: 20px;
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
.search-btn {
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: solid 1px #e6e6e6;
}

.talbe-box {
  width: 100%;
  height: 100%;
}
.default-color {
  background-color: #333;
}
.room-number {
  font-size: 14px;
  font-weight: 600;
  color: #008842;
}
.editingNubmer {
  top: -10px;
  left: -10px;
}
</style>

