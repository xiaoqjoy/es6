<template>
  <section class="MeterRead">
    <div class="live-search-box">
      <el-row :gutter="10" type="flex" justify="end">
        <el-col :span="5">
          <el-select v-model="filtrateForm.state" placeholder="抄表状态" size="mini" @change="handlePageChange(1)">
            <el-option label="全部" :value="null"></el-option>
            <el-option label="已生成账单" value="ALREADY_GENERATED"></el-option>
            <el-option label="未生成账单" value="WAIT_GENERATED"></el-option>
            <el-option label="房源空置" value="ROOM_VACANT"></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <MonthRang size="mini" v-model="monthDate" placeholder="选择抄表开始时间" />
        </el-col>
        <!-- <el-col :span="4">
          <el-date-picker v-model="filtrateForm.startTime" type="month" size="mini" placeholder="选择抄表开始时间">
          </el-date-picker>
        </el-col> -->
        <el-col :span="8">
          <el-input v-model="filtrateForm.keyword" placeholder="输入小区/楼栋/房号搜索" size="mini" clearable></el-input>
        </el-col>
        <el-col :span="1.5">
          <el-button type="primary" size="mini" @click="handlePageChange(1)">搜索</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="danger" size="mini" v-if="checkPermission('EXTRA_READING_RECORD')" @click="addMeterRead">抄表</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="living-statistics-list">
      <div class="living-statistics">
        <div class="left">
          电费
        </div>
        <div class="right">
          <div class="right-top">
            <h4>合计：
              <span>{{statisticsData.electricityTotalMoney}}元</span>
            </h4>
          </div>
          <div class="right-bottom">
            <p>分摊：
              <span>{{statisticsData.electricityRentMoney}}元</span>
            </p>
            <p>未分摊：
              <span class="c-red">{{statisticsData.electricityDegree}}元</span>
            </p>
          </div>
        </div>
      </div>
      <div class="living-statistics">
        <div class="left">
          水费
        </div>
        <div class="right">
          <div class="right-top">
            <h4>合计：
              <span>{{statisticsData.waterTotalMoney}}元</span>
            </h4>
          </div>
          <div class="right-bottom">
            <p>分摊：
              <span>{{statisticsData.waterRentMoney}}元</span>
            </p>
            <p>未分摊：
              <span class="c-red">{{statisticsData.waterDegree}}元</span>
            </p>
          </div>
        </div>
      </div>
      <div class="living-statistics">
        <div class="left">
          燃气费
        </div>
        <div class="right">
          <div class="right-top">
            <h4>合计：
              <span>{{statisticsData.gasTotalMoney}}元</span>
            </h4>
          </div>
          <div class="right-bottom">
            <p>分摊：
              <span>{{statisticsData.gasRentMoney}}元</span>
            </p>
            <p>未分摊：
              <span class="c-red">{{statisticsData.gasDegree}}元</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="house-list">
      <el-table :data="tableData" stripe border header-row-class-name="bgc-fa" header-align="center" ref="houseReleaseTable" size="small" height="100%" :span-method="spanMethod" @row-click="handleRow" @cell-mouse-enter="tableMouseEnter" @cell-click="cellClick" :row-class-name="rowClassName" @cell-mouse-leave="tableMouseLeave" v-loading="loading">
        <el-table-column label="序号" :width="50" align="center">
          <template slot-scope="scope">
            <span class="c-9">{{ scope.row.index+1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="gardenName" label="楼盘" :min-width="100" align="center" />
        <el-table-column prop="buildingName" label="楼栋" :min-width="100" align="center" />
        <el-table-column prop="roomNumber" label="房号" :width="100" align="center">
          <template slot-scope="scope">
            <span class="c-green font-w font-14">{{scope.row.roomNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" :width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type=='electricity'">电</span>
            <span v-else-if="scope.row.type=='water'">水</span>
            <span v-else-if="scope.row.type=='gas'">燃气</span>
          </template>
        </el-table-column>
        <el-table-column prop="houseStyle" label="计费时段" :min-width="180" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type=='electricity'">{{scope.row.electricityReadingStartDesc+'-'+scope.row.electricityReadingEndDesc}}</span>
            <span v-else-if="scope.row.type=='water'">{{scope.row.waterReadingStartDesc+'-'+scope.row.waterReadingEndDesc}}</span>
            <span v-else-if="scope.row.type=='gas'">{{scope.row.gasReadingStartDesc+'-'+scope.row.gasReadingEndDesc}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="houseStyle" label="使用数" :min-width="100" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type=='electricity'">{{scope.row.electricityUseDegree===null?'':scope.row.electricityUseDegree+'度'}}</span>
            <span v-else-if="scope.row.type=='water'">{{scope.row.waterUseDegree===null?'':scope.row.waterUseDegree+'吨'}}</span>
            <span v-else-if="scope.row.type=='gas'">{{scope.row.gasUseDegree===null?'':scope.row.gasUseDegree+'立方'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="houseStyle" label="费用金额" :width="100" align="right">
          <template slot-scope="scope">
            <span v-if="scope.row.type=='electricity'" class="c-red">{{scope.row.electricityMoney}}</span>
            <span v-else-if="scope.row.type=='water'" class="c-red">{{scope.row.waterMoney}}</span>
            <span v-else-if="scope.row.type=='gas'" class="c-red">{{scope.row.gasMoney}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="houseStyle" label="录入时间" :min-width="100" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type=='electricity'" class="c-9">{{scope.row.electricityReadingTimeDesc}}</span>
            <span v-else-if="scope.row.type=='water'" class="c-9">{{scope.row.waterReadingTimeDesc}}</span>
            <span v-else-if="scope.row.type=='gas'" class="c-9">{{scope.row.gasReadingTimeDesc}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" :min-width="120" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.extraBillStatus==='ALREADY_GENERATED'" class="c-9">已生成账单</p>
            <p v-else-if="scope.row.extraBillStatus==='ROOM_VACANT'" class="c-9">房源空置</p>
            <div v-else-if="scope.row.extraBillStatus==='WAIT_GENERATED'">
              <el-button type="text" size="small" v-if="checkPermission('EXTRA_READING_RECORD')" @click.stop="handleEdit(scope.row)">
                编辑
              </el-button>
              <el-button type="text" size="small" v-if="checkPermission('EXTRA_BILL_CREATE')" @click.stop="handleRow(scope.row)">
                生成账单
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="house-pagination">
        <el-pagination class="page" @size-change="handleSizeChange" @current-change="handlePageChange" :current-page.sync="currentPage" :page-sizes="[20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :page-count="pageCount" :total="recordCount">
        </el-pagination>
      </div>
    </div>
    <MeterReadDialog v-model="MeterReadDialog" :id="MeterReadDialogId" @refreshData="requestData" :type="MeterReadDialogType" />
    <MeterReadDetails :id="MeterReadDetailsId" v-model="MeterReadDetails" @refreshData="requestData" />
  </section>
</template>
<script>
import { handlePages } from '@/components/common/mixin';
import MonthRang from '@/components/MonthRang';
import MeterReadDialog from './MeterReadDialog';
import MeterReadDetails from './MeterReadDetails';
import { $formDate } from '@/assets/js/utils';
export default {
  name: 'MeterRead',
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
      // 统计数据
      statisticsData: {},
      loading: false,
      tableData: [], // 表格数据
      monthDate: [], // 月份筛选数据
      MeterReadDialog: false,
      MeterReadDialogType: 'ADD',
      MeterReadDialogId: '',
      MeterReadDetails: false,
      MeterReadDetailsId: ''
    };
  },
  props: {
    isShow: Boolean
  },
  computed: {

  },
  created() {
    this.requestData();
  },
  watch: {
    isShow(val) {
      if (val) {
        this.requestData();
      }
    }
  },
  methods: {
    // 获取数据
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
      this.$axios.get('/security/extraBill/extraRecordPage', {
        params: {
          extraBillStatus: this.filtrateForm.state,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          recordTime: recordTime,
          recordTimeEnd: recordTimeEnd,
          keyword: this.filtrateForm.keyword
        }
      }).then(res => {
        this.loading = false;
        if (res.data.status === 'C0000') {
          this.pageCount = res.data.result.pageCount;
          this.recordCount = res.data.result.recordCount;
          this.tableData = this.formatData(res.data.result.items);
        } else {
          this.tableData = [];
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.loading = false;
        this.tableData = [];
        this.$message.error(err.message || '服务器异常');
      });
      this.getExtraFeeStatistics(recordTime, recordTimeEnd);
    },
    // 格式化数据
    formatData(data) {
      let newList = [];
      data.forEach((e, i) => {
        e.index = i;
        e.rowSpan = { length: 0 };
        let isFirst = '';
        if (e.electricity !== null) {
          isFirst = 'electricity';
          e.rowSpan.length++;
          newList.push(Object.assign({
            type: 'electricity',
            isFirst: true
          }, e));
        }
        if (e.water !== null) {
          isFirst = isFirst || 'water';
          e.rowSpan.length++;
          newList.push(Object.assign({
            type: 'water',
            isFirst: isFirst === 'water'
          }, e));
        }
        if (e.gas !== null) {
          isFirst = isFirst || 'gas';
          e.rowSpan.length++;
          newList.push(Object.assign({
            type: 'gas',
            isFirst: isFirst === 'gas'
          }, e));
        }
        // newList.push(...[e, e, e]);
      });
      return newList;
    },
    // 添加抄表
    addMeterRead() {
      this.MeterReadDialogId = '';
      this.MeterReadDialog = true;
      this.MeterReadDialogType = 'ADD';
    },
    //  编辑
    handleEdit(row) {
      this.MeterReadDialogId = row.id;
      this.MeterReadDialogType = 'EDIT';
      this.MeterReadDialog = true;
    },
    handleRow(row) {
      this.MeterReadDetailsId = row.id;
      this.MeterReadDetails = true;
    },
    // 获取统计数据
    getExtraFeeStatistics(start, end) {
      this.$axios.get('/security/extraBill/selectExtraFeeStatistics', {
        params: {
          date: start,
          dateEnd: end,
          extraBillStatus: this.filtrateForm.state
        }
      }).then((res) => {
        if (res.data.status === 'C0000') {
          this.statisticsData = res.data.result;
        } else {
          this.statisticsData = {};
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.statisticsData = {};
        this.$message.error(err.message || '服务器异常');
      });
    },
    // 点击时为合并的表格统一样式
    cellClick(row, column, cell) {
      let tr = cell.parentNode;
      let classStr = '.' + [...tr.classList].join('.');
      [...document.querySelectorAll('tr.current-row')].forEach((e) => {
        e.classList.remove('current-row');
      });
      [...document.querySelectorAll(classStr)].forEach(e => {
        e.classList.add('current-row');
      });
    },
    // 斑马线样式应用
    rowClassName({ row, rowIndex }) {
      if (row.index % 2 === 0) {
        return 'bgc-fa el-tr-' + row.index;
      } else {
        return 'el-tr-' + row.index;
      }
    },
    // 行合并
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex <= 3 || columnIndex === 9) {
        if (row.isFirst) {
          return {
            rowspan: row.rowSpan.length,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
        // if (rowIndex % 3 === 0) {
        //   return {
        //     rowspan: 3,
        //     colspan: 1
        //   };
        // } else {
        //   return {
        //     rowspan: 0,
        //     colspan: 0
        //   };
        // }
      }
    },
    // 找到需要高亮的tr
    // findHoverTr(td) {
    //   let tr = td.parentNode;
    //   let tbody = tr.parentNode;
    //   let trs = tbody.querySelectorAll('tr');
    //   let indexAry = [];
    //   [...trs].find((el, i) => {
    //     if (el === tr) {
    //       if (i % 3 === 0) {
    //         indexAry = [i, i + 1, i + 2];
    //       } else if (i % 3 === 1) {
    //         indexAry = [i - 1, i, i + 1];
    //       } else {
    //         indexAry = [i - 2, i - 1, i];
    //       }
    //       return true;
    //     }
    //   });
    //   return indexAry.map(e => trs[e]);
    // },
    // td mouseEnter
    tableMouseEnter(row, column, cell, event) {
      let tr = cell.parentNode;
      let classStr = '.' + [...tr.classList].join('.');
      [...document.querySelectorAll(classStr)].forEach(e => {
        e.classList.add('tr-hover');
      });
      // this.findHoverTr(cell).forEach(e => {
      //   e.classList.add('tr-hover');
      // });
    },
    // td mouseLeave
    tableMouseLeave(row, column, cell, event) {
      [...document.querySelectorAll('tr.tr-hover')].forEach((e) => {
        e.classList.remove('tr-hover');
      });
    }
  },
  components: {
    MonthRang, MeterReadDialog, MeterReadDetails
  }
};
</script>
<style lang="scss" scoped>
.MeterRead {
  display: flex;
  flex-direction: column;
  height: 100%;
  .living-statistics-list {
    display: -webkit-box;
    margin: 10px;
  }
  .living-statistics {
    flex: 1;
    display: flex;
    margin-right: 10px;
    background: #fff;
    &:last-child {
      margin-right: 0;
    }
    .left {
      width: 24px;
      word-break: break-all;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      background: #4fa579;
      font-size: 12px;
      font-weight: bold;
      color: #fff;
      padding: 0 2px;
      box-sizing: border-box;
    }
    .right {
      flex: 1;
      .right-top {
        height: 40px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        padding: 0 20px;
        font-size: 12px;
        color: #333;
        span {
          font-size: 16px;
        }
      }
      .right-bottom {
        height: 35px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        font-size: 12px;
        p {
          flex: 1;
          color: #999;
          span {
            color: #333;
            &.c-red {
              color: #fa5555;
            }
          }
        }
      }
    }
  }
  .c-red {
    color: #fa5555;
  }
}

</style>
<style lang="scss">
.MeterRead {
  tr.tr-hover {
    td {
      background-color: #f5f7fa;
    }
  }
  .bgc-fa {
    th {
      background: #fafafa;
    }
  }
  tr.bgc-fa {
    background: #fafafa;
  }
  // .el-table__body {
  //   tr:nth-child(6n + 4),
  //   tr:nth-child(6n + 5),
  //   tr:nth-child(6n + 6) {
  //     background: #fafafa;
  //   }
  // }
}
</style>

