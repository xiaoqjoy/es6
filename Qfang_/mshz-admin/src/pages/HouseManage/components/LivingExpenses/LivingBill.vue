
<template>
  <section class="LivingBill mart-10">
    <div class="live-search-box">
      <el-row :gutter="10" type="flex" justify="end">
        <el-col :span="5">
          <el-select v-model="filtrateForm.state" placeholder="账单状态" size="mini" @change="handlePageChange(1)">
            <el-option label="全部" :value="null"></el-option>
            <el-option label="待付款" value="WAIT_COLLECTING_RENT"></el-option>
            <el-option label="已付款" value="ALREADY_COLLECTING_RENT"></el-option>
            <el-option label="已关闭" value="ALREADY_CLOSE_BILL"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <MonthRang size="mini" v-model="monthDate" placeholder="选择账单生成时间" />
        </el-col>
        <el-col :span="8">
          <el-input v-model="filtrateForm.keyword" placeholder="输入小区/楼栋/房号/账单编号搜索" size="mini" clearable></el-input>
        </el-col>
        <el-col :span="1.5">
          <el-button type="primary" size="mini" @click="handlePageChange(1)">搜索</el-button>
        </el-col>
        <el-col :span="1.5">
          <div style="width:66px"></div>
        </el-col>
      </el-row>
    </div>
    <div class="house-list">
      <el-table :data="tableData" stripe header-align="center" :span-method="spanMethod" border ref="houseReleaseTable" size="small" height="100%" cell-class-name="default-color" class="talbe-box" @row-click="handleRow" v-loading="loading">
        <el-table-column type="index" class-name="c-9" label-class-name="c-3" label="序号" :min-width="50" align="center" />
        <el-table-column prop="billNo" label="账单编号" :min-width="100" align="center" />
        <el-table-column prop="gardenName" label="楼盘" :min-width="100" align="center" />
        <el-table-column prop="buildingName" label="楼栋" :min-width="80" align="center" />
        <el-table-column label="房号" :min-width="80" align="center">
          <template slot-scope="scope">
            <span class="c-green font-w font-14">{{scope.row.roomNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="chamberNumber" label="房间" :min-width="80" align="center" />
        <el-table-column prop="createDateDesc" label="账单生成" :min-width="80" align="center" />
        <el-table-column label="租客" :min-width="80" align="center">
          <template slot-scope="scope">
            {{scope.row.renter?scope.row.renter.renter:''}}
          </template>
        </el-table-column>
        <el-table-column label="账单金额" :min-width="80" align="center">
          <template slot-scope="scope">
            <span class="c-red">{{scope.row.totalPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="billSeneschalEnumDesc" label="支付状态" :min-width="80" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.overdueDay&&scope.row.billSeneschalStatus==='WAIT_COLLECTING_RENT'" class="c-red">
              <p>{{scope.row.billSeneschalEnumDesc}}</p>
              <p>（逾期{{scope.row.overdueDay}}天）</p>
            </div>
            <span v-else>{{scope.row.billSeneschalEnumDesc}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="payChannelEnumDesc" label="支付渠道" :min-width="80" align="center" />
        <el-table-column prop="payDateDesc" label="支付时间" :min-width="80" align="center" />
        <el-table-column label="操作" :min-width="80" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="checkPermission('EXTRA_BILL_MESSAGE')&&scope.row.billSeneschalStatus==='WAIT_COLLECTING_RENT'" @click.stop="handleBillRent(scope.row)">
              催款
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="house-pagination">
        <el-pagination class="page" @size-change="handleSizeChange" @current-change="handlePageChange" :current-page.sync="currentPage" :page-sizes="[20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :page-count="pageCount" :total="recordCount">
        </el-pagination>
      </div>
    </div>
    <LivingBillDetails v-model="LivingBillDialog" :id="LivingBillDetailsId" />
  </section>
</template>
<script>
import { handlePages } from '@/components/common/mixin';
import MonthRang from '@/components/MonthRang';
import LivingBillDetails from './LivingBillDetails';
import { $formDate } from '@/assets/js/utils';
export default {
  name: 'LivingBill',
  mixins: [handlePages],
  data() {
    return {
      // 筛选表单
      filtrateForm: {
        state: null,
        startTime: '',
        endTime: '',
        keyword: ''
      },
      loading: false,
      tableData: [],
      monthDate: [],
      LivingBillDialog: false,
      LivingBillDetailsId: ''
    };
  },
  props: {
    isShow: Boolean
  },
  created() {
    // this.requestData();
  },
  watch: {
    isShow(val) {
      if (val) {
        this.requestData();
      }
    }
  },
  methods: {
    requestData() {
      let recordTime;
      let recordTimeEnd;
      let monthDate = this.monthDate;
      if (monthDate.length === 1) {
        recordTime = $formDate(new Date(monthDate[0].year, monthDate[0].month - 1, 1), 'yyyy-MM-dd');
        recordTimeEnd = $formDate(new Date(monthDate[0].year, monthDate[0].month, 0), 'yyyy-MM-dd');
      } else if (monthDate.length === 2) {
        recordTime = $formDate(new Date(monthDate[0].year, monthDate[0].month - 1, 1), 'yyyy-MM-dd');
        recordTimeEnd = $formDate(new Date(monthDate[1].year, monthDate[1].month, 0), 'yyyy-MM-dd');
        if ((monthDate[1].year - monthDate[0].year) * 12 + monthDate[1].month - monthDate[0].month > 6) {
          this.$message.error('筛选时间跨度不得超过6个月');
          return;
        }
      }
      this.loading = true;
      this.$axios.get('/security/extraBill/queryExtraBillPage', {
        params: {
          billSeneschalEnum: this.filtrateForm.state,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          createDate: recordTime,
          createDateEnd: recordTimeEnd,
          keyword: this.filtrateForm.keyword
        }
      }).then(res => {
        this.loading = false;
        if (res.data.status === 'C0000') {
          this.pageCount = res.data.result.pageCount;
          this.recordCount = res.data.result.recordCount;
          this.tableData = res.data.result.items;
        } else {
          this.tableData = [];
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.loading = false;
        this.tableData = [];
        this.$message.error(err.message || '服务器异常');
      });
    },
    handleRow(row) {
      this.LivingBillDetailsId = row.billNo;
      this.LivingBillDialog = true;
    },
    // 催租
    handleBillRent(row) {
      this.$axios.get('/security/extraBill/billRent', {
        params: {
          keyword: row.billNo,
          type: 1
        }
      }).then(res => {
        if (res.data.status === 'C0000') {
          let msg = res.data.result;
          let reg = /http[\w\W]*/g;
          msg = msg.replace(reg, (val) => {
            return '<a href="' + val + '" target="_blank" class="c-red">' + val + '</a>';
          });
          this.$confirm(msg, '发送生活费账单', {
            confirmButtonText: '发送',
            cancelButtonText: '取消',
            dangerouslyUseHTMLString: true,
            beforeClose: (action, instance, done) => {
              if (action === 'confirm') {
                this.$axios.get('/security/extraBill/sendRentMessage', {
                  params: {
                    keyword: row.billNo,
                    type: 1
                  }
                }).then(res => {
                  if (res.data.status === 'C0000') {
                    this.$message.success('发送账单短信成功');
                    done();
                  } else {
                    this.$message.error(res.data.message);
                  }
                });
              } else {
                done();
              }
            }
          });
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 行合并
    spanMethod({ row, column, rowIndex, columnIndex }) {
      // if (columnIndex <= 4) {
      //   if (rowIndex % 3 === 0) {
      //     return {
      //       rowspan: 3,
      //       colspan: 1
      //     };
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 0
      //     };
      //   }
      // }
    }
  },
  components: {
    MonthRang, LivingBillDetails
  }
};
</script>
<style lang="scss">
.LivingBill {
  display: flex;
  flex-direction: column;
  height: 100%;
}
// .search-box {
//   width: 80%;
//   padding: 21px 20px 15px 0px;
//   position: absolute;
//   top: 0;
//   right: 0;
//   z-index: 10;
//   margin-top: -71px;
// }
</style>

