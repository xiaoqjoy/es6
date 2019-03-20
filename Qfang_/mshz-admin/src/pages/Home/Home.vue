
<template>
  <section class="home">
    <div class="flex-start-grow-c talbe-box">
      <div class="image-box-w">
        <div class="image-box"></div>
      </div>
      <div v-if="checkPermission('OMS_FAD_QUERY')"
        class="notice">
        <div class="headline">
          公司公告
        </div>
        <div class="notice-info">
          <el-row :gutter="20">
            <el-col :span="8"
              v-for="(item, index) in noticeList"
              :key="index"
              class="ellips pdl-20">
              <div class="message ellips"
                @click="openNoticeDetail(item.id)">{{item.title}}
                <span class="pdl-ten c-9">{{item.publishTimeDesc}}</span>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="notice-button">
          <router-link to="/CompanyNotice"> 更多>></router-link>
        </div>
      </div>
      <div class="commission">
        <el-menu :default-active="activeIndex"
          mode="horizontal"
          background-color="#eee"
          active-text-color="#008842"
          @select="handleSelect">
          <el-menu-item index="backlog">待办事项（{{num}}）</el-menu-item>
          <el-menu-item index="information">消息</el-menu-item>
        </el-menu>
        <!-- <div class="inform">
        <i class="icon iconfont icon-xiaoxi font-red"></i>你有
        <span class="inform-num">{{num}}</span> 条待办事项
      </div> -->
        <!-- <div class="inform-button"> -->
        <!-- <router-link to="/OperatingManage/CompanyNotice"> 更多>></router-link> -->
        <!-- </div> -->
      </div>
      <div class="house-list" style="margin: 0;">
        <el-table :data="informData"
          stripe
          border
          header-align="center"
          ref="informTable"
          size="small"
          @selection-change="handleSelectionChange"
          height="100%"
          class="talbe-box"
          v-loading="loading">
          <el-table-column label="内容"
            :min-width="200"
            align="left">
            <template slot-scope="scope">
              <div class="info-content">
                <i class="inform-icon icon iconfont icon-shenhe"></i>
                <div class="inb inform-info ellips">
                  <p class="inform-info-item font-14 ellips">{{scope.row.title}}</p>
                  <p class="inform-info-item c-9 ellips">{{activeIndex === 'backlog'? scope.row.context : scope.row.content}}</p>
                </div>
              </div>
            </template>
          </el-table-column>
          <slot v-if="activeIndex === 'backlog'">
            <el-table-column label="时间"
              :min-width="100"
              align="center"
              class-name="columSimple">
              <template slot-scope="scope">
                {{scope.row.createTimeDesc}}
              </template>
            </el-table-column>
            <el-table-column label="发起人"
              :min-width="100"
              align="center"
              class-name="columSimple">
              <template slot-scope="scope">
                {{scope.row.initiatorName}}
              </template>
            </el-table-column>
          </slot>
          <slot v-else>
            <el-table-column label="时间"
              :min-width="100"
              align="center"
              class-name="columSimple">
              <template slot-scope="scope">
                {{scope.row.notifyTimeDesc}}
              </template>
            </el-table-column>
          </slot>

          <el-table-column label="操作"
            :min-width="100"
            align="center">
            <template slot-scope="scope">
              <slot v-if="activeIndex === 'backlog'">
                <el-button size="small"
                  v-if="scope.row.type === 'ROOM'&&checkPermission('ROOM_AUDIT')"
                  plain
                  @click="handleTransact(scope.$index, scope.row)">立刻办理
                </el-button>
                <el-button size="small"
                  v-else-if="scope.row.type === 'ROOM_REAUDIT'&&checkPermission('ROOM_REAUDIT')"
                  plain
                  @click="handleTransact(scope.$index, scope.row)">立刻办理
                </el-button>
                <el-button size="small"
                  v-else-if="scope.row.type === 'CONTRACT'&&checkPermission('CONTRACT_AUDIT')"
                  plain
                  @click="handleTransact(scope.$index, scope.row)">立刻办理
                </el-button>
                <el-button size="small"
                  v-else-if="scope.row.type === 'LEAD'&&checkPermission('CUSTOMER_LOOK_QUERY')"
                  plain
                  @click="handleTaking(scope.row)">查看
                </el-button>
              </slot>
              <slot v-else-if="scope.row.type === 'BILL_PAY'">
                <el-button size="small"
                  v-if="checkPermission('LONG_BILL_QUERY')"
                  @click="handlePayBill(scope.row)">查看
                </el-button>
              </slot>
              <slot v-else-if="scope.row.type === 'BOOKING_PAY'">
                <el-button size="small"
                  @click="handleBookingBill(scope.row)">查看
                </el-button>
              </slot>
              <slot v-else-if="scope.row.type === 'CONTRACT_EXPIRE'">
                <el-button size="small"
                  @click="handleHouseState(scope.row)">查看
                </el-button>
              </slot>

            </template>
          </el-table-column>
        </el-table>
        <div class="house-pagination">
          <el-pagination class="page"
            @size-change="oRhandleSizeChange"
            @current-change="oRhandlePageChange"
            :current-page.sync="orcurrentPage"
            :page-sizes="[5, 10, 20]"
            :page-size="orpageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :page-count="orpageCount"
            :total="ortotal">
          </el-pagination>
        </div>
      </div>

    </div>

    <el-dialog :title="HouseTitle"
      :visible.sync='houseDialog'
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      width="950px">
      <!-- <house-details :roomId="roomId"
        v-if="houseDialog"
        :readOnly="readOnly"
        v-on:refreshData="requestData">
      </house-details> -->
      <house-details :roomId="roomId"
        :auditState="auditState"
        v-if="houseDialog"
        :readOnly="readOnly"
        v-on:refreshData="requestData">
      </house-details>
    </el-dialog>

    <el-dialog title="合同详情"
      :visible.sync='contractDialog'
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      width="950px">
      <contarct-detail :roomId="roomId"
        :contractId="contractId"
        v-if="contractDialog"
        :readOnly="readOnly"
        :bdName="bdName"
        v-on:refreshData="requestData">
      </contarct-detail>
    </el-dialog>

    <el-dialog v-if="noticeDetailDialog"
      title="公告详情"
      :visible.sync="noticeDetailDialog"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      width="950px">
      <notice-detail :noticeId="currentNoticeId" />
    </el-dialog>

    <el-dialog :title="leadLookNo"
      :visible.sync="takingDetailDialogVisible"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      width="950px">
      <taking-detail :leadLookNo="leadLookNo"
        :myLeadLookStatusEnum="myLeadLookStatusEnum"
        v-if="takingDetailDialogVisible">
      </taking-detail>
    </el-dialog>

    <el-dialog title="租客账单"
      append-to-body
      :visible.sync='rentBillDialog'
      :close-on-click-modal="false"
      width="950px">
      <long-rent-bill v-if="rentBillDialog"
        :billNo="billNo"
        :source="'houseDetail'">
      </long-rent-bill>
    </el-dialog>

    <el-dialog v-if="BookingDialogVisible"
      :title="'定金：' + currentBookingNo"
      :visible.sync="BookingDialogVisible"
      :close-on-click-modal="false"
      width="950px">
      <booking-detail :bookingNo="currentBookingNo" />
    </el-dialog>

    <el-dialog :title="myroomCode"
      :visible.sync='houseDetailDialog'
      :close-on-click-modal="false"
      top="5vh"
      width="950px">
      <long-rent-house-detail v-if="houseDetailDialog"
        :detailDialog.sync="houseDetailDialog"
        :roomCode.sync="myroomCode"
        source='Home'
        :propsLeaseType="'SHARED_RENT'"
        :roomData="roomData">
      </long-rent-house-detail>
    </el-dialog>

  </section>
</template>
<script>
import { mapState } from 'vuex';
import HouseDetails from '../HouseManage/components/Housing/HouseDetails';
// import ContarctDetail from '../HouseManage/components/ContractManage/ContarctDetail';
import ContarctDetail from '../OrdersManage/components/OwnerContract/ContarctDetail';
import NoticeDetail from '../OperatingManage/components/NoticeDetail';
import TakingDetail from '../CustomerManage/Taking/TakingDetail';
import LongRentBill from '../HouseManage/components/LongRentState/LongRentBill';
import bookingDetail from '../Bussiness/components/BookingDetail';
import longRentHouseDetail from '../HouseManage/components/LongRentState/LongRentHouseDetail';

//     ROOM("房源初审"),
//     ROOM_REAUDIT("房源复审"),
//     CONTRACT("合同"),
//     LEAD("带看"),;

export default {
  name: 'Home',
  data() {
    return {
      readOnly: false,
      roomId: '',
      contractId: '',
      currentNoticeId: '',
      bdName: '',
      houseDialog: false,
      contractDialog: false,
      noticeDetailDialog: false,
      BookingDialogVisible: false,
      houseDetailDialog: false,
      currentBookingNo: '',
      noticeList: [],
      num: 0,
      informData: [],
      pageSize: 3,
      pageCount: 1,
      recordCount: 0,
      currentPage: 1,

      ortotal: 0, // 数据总数
      orpageSize: 20, // 每页的数据量
      orcurrentPage: 1,
      orpageCount: null, /// 总页数

      activeIndex: 'backlog',
      billNo: '',
      auditState: 'firstReview',
      HouseTitle: '初审房源',

      takingDetailDialogVisible: false,
      rentBillDialog: false,
      leadLookNo: '',
      myLeadLookStatusEnum: '',
      myroomCode: ''

    };
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  created() {
    this.requestData();

    // 若有查看公告的权限则请求数据
    this.checkPermission('OMS_FAD_QUERY') && this.requestNoticeData();
  },
  methods: {

    // 获取列表数据
    requestData() {
      this.loading = true;
      this.$axios.get(
        '/security/oms/schedule/queryUserSchedule', {
          params: {
            state: 'WAIT_CHECK',
            pageSize: this.orpageSize,
            currentPage: this.orcurrentPage
          }
        }
      ).then((res) => {
        this.loading = false;
        if (res.data.status === 'C0000') {
          this.informData = res.data.result.items;
          this.num = res.data.result.recordCount;
          this.orpageCount = res.data.result.pageCount;
          this.ortotal = res.data.result.recordCount;
        } else {
          this.informData = [];
        }
      }).catch((res) => {
        this.loading = false;
        this.informData = [];
        console.log(res);
      });
    },

    // 消息
    requestMessagesData() {
      this.loading = true;
      this.$axios.get(
        '/security/message/queryMessage', {
          params: {
            managerId: this.userInfo.id,
            pageSize: this.orpageSize,
            currentPage: this.orcurrentPage,
            type: 'BILL_PAY,BOOKING_PAY,CONTRACT_EXPIRE'
          }
        }
      ).then((res) => {
        // console.log(res, '------消息');
        this.loading = false;
        if (res.data.status === 'C0000') {
          this.informData = res.data.result.items;
          this.orpageCount = res.data.result.pageCount;
          this.ortotal = res.data.result.recordCount;
        } else {
          this.informData = [];
        }
      }).catch((res) => {
        this.loading = false;
        this.informData = [];
        console.log(res);
      });
    },

    handleSelect(key, keyPath) {
      this.activeIndex = key;
      if (this.activeIndex === 'backlog') {
        this.requestData();
      } else {
        this.requestMessagesData();
      }
    },

    requestNoticeData() {
      this.$axios
        .get('security/oms/firmAdvert/queryFirmAdvertPage', {
          params: {
            pageSize: this.pageSize,
            currentPage: this.currentPage,
            title: ''
          }
        })
        .then(res => {
          if (res.data.status === 'C0000') {
            let { result } = res.data;
            this.noticeList = result.items;
          } else {
            this.$message({
              type: 'warning',
              message: res.data.message
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.message || '服务器异常');
        });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleTransact(index, row) {
      if (row.type === 'ROOM') {
        this.roomId = row.toAuditInfoId;
        this.auditState = 'firstReview';
        this.HouseTitle = '初审房源';
        this.houseDialog = true;
      } else if (row.type === 'ROOM_REAUDIT') {
        this.roomId = row.toAuditInfoId;
        this.auditState = 'review';
        this.HouseTitle = '复审房源';
        this.houseDialog = true;
      } else if (row.type === 'CONTRACT') {
        this.contractId = row.toAuditInfoId;
        this.roomId = row.contractRoomId;
        this.contractDialog = true;
      }
    },

    openNoticeDetail(id) {
      this.currentNoticeId = id;
      this.noticeDetailDialog = true;
    },

    handleTaking(row) {
      this.leadLookNo = row.toAuditInfoId;
      // this.myLeadLookStatusEnum = row.leadLookStatusEnum;
      this.takingDetailDialogVisible = true;
    },

    handlePayBill(row) {
      this.rentBillDialog = true;
      let { relateInfoDetail } = row;

      if (relateInfoDetail.relateInfoDetail) {
        this.billNo = relateInfoDetail.relateInfoDetail.billNo;
      } else {
        this.billNo = relateInfoDetail.billNo;
      }
    },

    handleBookingBill(row) {
      // relateInfoDetail
      this.BookingDialogVisible = true;
      let { relateInfoDetail } = row;

      if (relateInfoDetail.relateInfoDetail) {
        this.currentBookingNo = relateInfoDetail.relateInfoDetail.bookingNo;
      } else {
        this.currentBookingNo = relateInfoDetail.bookingNo;
      }
      // this.currentBookingNo = row.relateInfoDetail.relateInfoDetail.bookingNo;
    },

    handleHouseState(row) {
      let { relateInfoDetail } = row;

      if (relateInfoDetail.relateInfoDetail) {
        this.roomData = Object.assign({
          roomStatus: 'WAIT_TO_RENT',
          haveRentStatus: null,
          booking: true
        }, relateInfoDetail.relateInfoDetail);
        this.roomData.situationId = this.roomData.longSituationId;
        this.roomData.longRoomId = this.roomData.roomLongId;
        this.houseDetailDialog = true;
      }
    },

    // 分页每页几条
    oRhandleSizeChange(val) {
      this.orpageSize = val;
      if (this.activeIndex === 'backlog') {
        this.requestData();
      } else {
        this.requestMessagesData();
      }
    },

    // 跳到第几页
    oRhandlePageChange(val) {
      this.orcurrentPage = val;
      if (this.activeIndex === 'backlog') {
        this.requestData();
      } else {
        this.requestMessagesData();
      }
    }
  },
  components: {
    HouseDetails,
    ContarctDetail,
    NoticeDetail,
    TakingDetail,
    LongRentBill,
    bookingDetail,
    longRentHouseDetail
  }
};
</script>

<style scoped>
.flex-start-grow-c {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.home {
  padding: 20px;
  position: relative;
  height: 100%;
  box-sizing: border-box;
}
.image-box-w {
  display: block;
  width: 100%;
  height: 100px;
}
.image-box {
  display: block;
  width: 100%;
  height: 100px;
  border-radius: 5px;
  overflow: hidden;
  background: url("../../../static/img/logo.jpg") no-repeat center center;
}
.logo-image {
  display: block;
  width: 100%;
  height: 100%;
}
.notice {
  margin-top: 20px;
  /* margin-bottom: 7px; */
  width: 100%;
  height: 50px;
  position: relative;
  border: 1px solid #dddddd;
}
.headline {
  height: 50px;
  width: 100px;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 14px;
  text-align: center;
  line-height: 50px;
  background-color: #fafafa;
  border-right: 1px solid #dddddd;
}
.notice-info {
  width: 100%;
  height: 50px;
  padding: 0 80px 0 120px;
  box-sizing: border-box;
  background-color: #fff;
}
.notice-button {
  width: 80px;
  height: 40px;
  margin: 5px 0;
  position: absolute;
  right: 0px;
  top: 0;
  text-align: center;
  line-height: 40px;
  background-color: #fff;
  border-left: 1px solid #ccc;
  font-size: 12px;
}
.message {
  width: 100%;
  height: 50px;
  font-size: 12px;
  line-height: 50px;
  cursor: pointer;
}

.message::before {
  content: "";
  background: #999;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin-right: 8px;
}
.commission {
  width: 100%;
  height: 50px;
  position: relative;
}
.inform {
  float: left;
  font-size: 14px;
  line-height: 50px;
}
.inform-button {
  width: 80px;
  height: 40px;
  margin: 5px 0;
  position: absolute;
  right: 0px;
  top: 0;
  text-align: center;
  line-height: 40px;
}
.inform-num {
  font-weight: 600;
  color: #d66666;
}
.inform-table {
  flex: 1;
  background-color: #fff;
  border: 1px solid #ddd;
  border-bottom: 0 none;
}
.inform-table >>> tr th .cell {
  padding-left: 20px;
}
.talbe-box {
  width: 100%;
  height: 100%;
}
.inform-icon {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  font-size: 20px;
  text-align: center;
  line-height: 40px;
  border-radius: 3px;
  color: #fff;
  background-color: #008842;
}
.info-content {
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.icon-xiaoxi {
  padding-right: 10px;
}
.inform-info-item {
  line-height: 1.5;
}
.inform-info {
  flex: 1;
  height: 40px;
  vertical-align: top;
}
.user-pagination {
  width: 100%;
  left: 0;
  bottom: 0;
  height: 36px;
  box-sizing: border-box;
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-top: 0 none;
}
.user-page {
  float: left;
  padding-left: 10px;
  padding-top: 5px;
}

>>> .el-table td > .cell {
  min-height: 60px;
  line-height: 60px;
}
</style>
