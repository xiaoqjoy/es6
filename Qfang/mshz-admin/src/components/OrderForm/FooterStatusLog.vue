<template>
  <section>

    <el-dialog :title="logData.title+logData.count" :visible="myLogVisible" :before-close="handleClose" width="950px" :close-on-click-modal="false">
      <div style="padding-bottom:50px;">
        <el-table v-if="logData.title!=='维修'" :data="tableData.items" border style="width: 100%" header-align="center">
          <el-table-column prop="orderChannelDesc" label="渠道">
          </el-table-column>

          <el-table-column label="房间">
            <template slot-scope="scope">
              <p>
                {{ scope.row.gardenName }}
              </p>
              <p class="c-9 font-12">{{ scope.row.buildingName }} {{ scope.row.roomNo }}</p>
            </template>
          </el-table-column>

          <el-table-column label="住客">
            <template slot-scope="scope">
              <p>
                {{ scope.row.custName }}
              </p>
              <p class="c-9 font-12">{{ scope.row.custPhone }}</p>
            </template>
          </el-table-column>

          <el-table-column label="日期" width="200">
            <template slot-scope="scope">
              <span>
                {{ scope.row.startTime }} 至{{ scope.row.endTime }}
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="orderPrice" label="金额(元)">
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button v-if="logData.title==='在住'||logData.title==='今天预离'" size="mini" type="primary" @click="openDetail(scope.row.orderNo)">
                办理退房
              </el-button>
              <el-button v-if="logData.title==='今天预到'" size="mini" type="primary" @click="openDetail(scope.row.orderNo)">
                办理入住
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-table v-else :data="fixedTableData.items" border style="width: 100%" header-align="center">
          <el-table-column label="房间">
            <template slot-scope="scope">
              <p>
                {{ scope.row.roomModel.gardenName}}
              </p>

              <p class="c-9">{{ scope.row.roomModel.buildingName}} {{ scope.row.roomModel.number}}</p>
            </template>
          </el-table-column>

          <el-table-column label="维修类型">
            <template slot-scope="scope">
              {{ scope.row.roomRepairTypeDesc }}
            </template>
          </el-table-column>

          <el-table-column label="房间停用">
            <template slot-scope="scope">
              {{ scope.row.isUseable==='YES'?'是':'否' }}
            </template>
          </el-table-column>

          <el-table-column label="维修时间">
            <template slot-scope="scope">
              {{ scope.row.repairStartTimeDesc }}至{{ scope.row.repairEndTimeDesc }}
            </template>
          </el-table-column>

          <el-table-column label="维修说明" prop="repairRemark" width="200">
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- <el-button size="mini" type="primary" @click="finishFixedConfirm(scope.row.id)">维修完成</el-button> -->
              <el-button size="mini" type="primary" @click="openManintainDetail(scope.row.id)">维修完成</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :current-page="currentPage" :page-sizes="[5, 10]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="logData.title!=='维修'?tableData.recordCount:fixedTableData.recordCount">
        </el-pagination>
      </div>

    </el-dialog>

    <house-maintain-detail v-if="houseMaintainDetailVisible" @closeHouseMaintainDetail="closeHouseMaintainDetail" :fixedId="fixedId">
    </house-maintain-detail>

    <!-- 详情页弹窗 -->
    <order-detail v-if="detailVisible" @closeDetail="closeDetail" :orderNo="orderNo">
    </order-detail>

  </section>
</template>

<script>
import OrderDetail from './OrderDetail';
import HouseMaintainDetail from '../../pages/HouseManage/components/HouseState/HouseMaintainDetail';
export default {
  components: {
    OrderDetail,
    HouseMaintainDetail
  },
  props: ['logData'],

  data() {
    return {
      houseMaintainDetailVisible: false,
      detailVisible: false, // 订单详情
      tableData: {},
      rules: {
        cancelReason: [
          { required: true, message: '请选择取消原因', trigger: 'change' }
        ],
        refundWay: [
          { required: true, message: '请选择退款方式', trigger: 'change' }
        ],
        refundFlag: [
          { required: true, message: '请选择是否退款', trigger: 'change' }
        ]
      },
      cancelOrderData: {},
      myCancelOrderData: {},
      cancelReasonEnum: {},
      refundWayEnum: {},
      myLogVisible: true,
      allIncome: 0,
      fixedTableData: {},
      orderNo: '',
      fixedId: '',
      pageSize: 5,
      currentPage: 1
    };
  },

  mounted() {
    // 根据类型请求表格数据 类型有：维修日志和订单日志 两种
    this.getDataAccordingAsType();
  },
  methods: {

    handleSizeChange(val) {
      this.pageSize = val;
      this.getDataAccordingAsType();
    },
    handlePageChange(val) {
      this.currentPage = val;
      this.getDataAccordingAsType();
    },
    // 根据类型请求表格数据 类型有：维修日志和订单日志 两种
    getDataAccordingAsType() {
      if (this.logData.type !== 'FIXED') {
        this.getOrderCustPage();
      } else {
        this.getRoomRepairData();
      }
    },

    // 维修日志请求
    getRoomRepairData() {
      this.$axios.get('security/room/fix/queryRoomRepairPage', {
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage
        }
      })
        .then((res) => {
          // console.log(res, '维修列表 数据');
          this.fixedTableData = res.data.result;
        });
    },

    // 订单日志请求
    getOrderCustPage() {
      this.$axios.get('security/order/queryOrderCustPage', {
        params: {
          queryType: this.logData.type,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        }
      })
        .then((res) => {
          // console.log(res, 'security/order/queryOrderCustPage');
          this.tableData = res.data.result;
        });
    },

    // 关闭日志弹窗
    handleClose() {
      this.$emit('closeLog');
    },

    finishFixedConfirm(id) {
      this.$confirm('确认完成维修?')
        .then(() => {
          this.finishFixed(id);
        });
    },

    finishFixed(id) {
      this.$axios.get('security/room/fix/roomRepairComplete', { params: { id } })
        .then((res) => {
          // console.log(res, '完成维修 提交 返回结果');

          if (res.data.status === 'C0000') {
            this.getDataAccordingAsType();

            this.$message({
              message: '完成维修成功',
              type: 'success'
            });
          } else {
            this.$message.error('完成维修失败');
          };
        })
        .catch((err) => {
          console.log(err, '完成维修 err ');
        });
    },

    // 打开 维修详情
    openManintainDetail(fixedId) {
      this.fixedId = fixedId;
      this.houseMaintainDetailVisible = true;

      // console.log(fixedId, '==========');
    },

    // 关闭 维修详情
    closeHouseMaintainDetail(s) {
      this.houseMaintainDetailVisible = false;
      if (s === 'success') {
        this.getDataAccordingAsType();
      }
    },

    // 打开订单详情
    openDetail(orderNo) {
      this.orderNo = orderNo;
      this.detailVisible = true;
    },

    // 关闭订单详情
    closeDetail(s) {
      this.detailVisible = false;
      if (s === 'success') {
        this.getDataAccordingAsType();
      }
    }
  }

};
</script>
<style scoped>
.pagination {
  padding: 10px 0;
  text-align: center;
}
</style>
