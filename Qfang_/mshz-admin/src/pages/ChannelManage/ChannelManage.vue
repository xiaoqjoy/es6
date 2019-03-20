
<template>
  <section class="houseing channelManage">
    <header class="header">
      <el-row type="flex" justify="space-between" align="center">
        <el-col :span="12">
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" active-text-color="#008842" @select="handleMenuSelect">
            <el-menu-item v-if="checkPermission('BROKER_MANAGER_QUERY')" index="1">有归属渠道</el-menu-item>
            <el-menu-item v-if="checkPermission('BROKER_UNMANAGER_QUERY')" index="2">无归属渠道</el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="12">
          <div class="statistics-div">
            <p>转介中：
              <span>{{statisticsData.sumIntroducing}}</span>
            </p>
            <p>总成交：
              <span>{{statisticsData.sumDeal}}</span>
            </p>
            <p>总渠道：
              <span>{{statisticsData.sumChannel}}</span>
            </p>
          </div>
        </el-col>
      </el-row>
      <div class="filter-form-box">
        <el-form :inline="true" class="filter-form" size="mini">
          <el-form-item>
            <SelectOrganization v-model="filterForm.orgId" @change="orgsChange" style="width:200px" placeholder="组织" />
          </el-form-item>
          <el-form-item>
            <el-select class="order-status" clearable filterable v-model="filterForm.bdId" placeholder="管家" size="mini">
              <el-option :label="v.name" :value="v.id" v-for="v in bdList" :key="v.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker class="date-range" v-model="filterForm.lastDate" type="daterange" size="mini" range-separator="至" start-placeholder="最后转介始" end-placeholder="最后转介终" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-date-picker class="date-range" v-model="filterForm.lastFollow" type="daterange" size="mini" range-separator="至" start-placeholder="最后跟进始" end-placeholder="最后跟进终" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-input class="search-key" placeholder="请输入经纪人姓名或手机号" v-model="filterForm.keyword" clearable size="mini" />
          </el-form-item>
          <el-form-item>
            <el-button type="success" size="mini" @click="handlePageChange(1)">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
    </header>
    <div class="houseing-table">
      <el-table :data="tableData" header-align="center" border stripe ref="channelTable" size="small" height="100%" cell-class-name="default-color" class="talbe-box" @row-click="handleRow" v-loading="loading">
        <el-table-column prop="brokerName" label="姓名" :min-width="100" align="center" />
        <el-table-column prop="area" label="区域" :min-width="150" align="center" />
        <el-table-column prop="phone" label="手机号" :min-width="100" align="center" />
        <el-table-column prop="managerName" label="管家" :min-width="80" align="center" />
        <el-table-column prop="introducingAmount" label="转介中" :min-width="80" align="center" />
        <el-table-column prop="dealAmount" label="成交量" :min-width="80" align="center" />
        <el-table-column prop="totalAmount" label="转介量" :min-width="80" align="center" />
        <el-table-column prop="lastDateDesc" label="最后转介" :min-width="100" align="center" />
        <el-table-column prop="lastFollowDateDesc" label="最后跟进" :min-width="100" align="center" />
        <el-table-column label="操作" :width="150" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.rollOut" class="c-9">该渠道已转出</p>
            <el-button v-else type="text" size="small" @click.stop="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination class="page" @size-change="handleSizeChange" @current-change="handlePageChange" :current-page.sync="currentPage" :page-sizes="[20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :page-count="pageCount" :total="recordCount">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="渠道详情" :visible.sync='detailsDialog' :close-on-click-modal="false" width="950px">
      <channel-details :id="Dialogid" :detailsData="detailsData" v-if="detailsDialog"></channel-details>
    </el-dialog>
    <el-dialog title="编辑渠道" :visible.sync='editDialog' :close-on-click-modal="false" width="950px">
      <channel-edit :id="Dialogid" :detailsData="detailsData" @refreshData="requestData" @changeDialog="editDialogchange" v-if="editDialog"></channel-edit>
    </el-dialog>
  </section>
</template>
<script>
import { handlePages } from '@/components/common/mixin';
import SelectOrganization from './components/SelectOrganization';
import ChannelDetails from './components/ChannelDetails';
import ChannelEdit from './components/ChannelEdit';
export default {
  name: 'ChannelManage',
  mixins: [handlePages],
  data() {
    return {
      loading: false,
      activeIndex: '1',
      detailsDialog: false, // 详情弹窗
      editDialog: false, // 编辑弹窗
      Dialogid: '', // 弹窗id
      filterForm: { // 筛选表单
        orgId: '', // 组织id
        bdId: '', // 管家id
        lastDate: '',
        lastDateBegin: '', // 最后转介开始
        lastDateEnd: '', // 最后转介结束
        lastFollow: '',
        lastFollowBegin: '', // 最后跟进开始
        lastFollowEnd: '', // 最后跟进结束
        keyword: '' // 关键字
      },
      bdList: [], // 管家List
      statisticsData: { // 统计数据
        sumChannel: 0,
        sumDeal: 0,
        sumIntroducing: 0
      },
      detailsData: {}, // 渠道详情数据
      tableData: [] // 表格数据
    };
  },
  watch: {
    'filterForm.bdId'() {
      this.handlePageChange(1);
    }
  },
  created() {
    if (this.checkPermission('BROKER_MANAGER_QUERY')) {
      this.activeIndex = '1';
    } else if (this.checkPermission('BROKER_UNMANAGER_QUERY')) {
      this.activeIndex = '2';
    }
    this.requestData();
  },
  methods: {
    // 获取列表数据
    requestData() {
      this.loading = true;
      let url = '/security/broker/manage/queryBrokerList';
      if (this.activeIndex === '2') {
        url = '/security/broker/manage/querBrokerListNoManager';
      }
      let lastDateBegin = this.filterForm.lastDate ? this.filterForm.lastDate[0] : undefined;
      let lastDateEnd = this.filterForm.lastDate ? this.filterForm.lastDate[1] : undefined;
      let lastFollowBegin = this.filterForm.lastFollow ? this.filterForm.lastFollow[0] : undefined;
      let lastFollowEnd = this.filterForm.lastFollow ? this.filterForm.lastDate[1] : undefined;
      this.$axios.get(url, {
        params: {
          orgId: this.filterForm.orgId || undefined,
          managerId: this.filterForm.bdId || undefined,
          lastDateBegin,
          lastDateEnd,
          lastFollowBegin,
          lastFollowEnd,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          nameOrPhone: this.filterForm.keyword || undefined
        }
      }).then((res) => {
        this.loading = false;
        if (res.data.status === 'C0000') {
          if (res.data.result.page) {
            this.pageCount = res.data.result.page.pageCount;
            this.recordCount = res.data.result.page.recordCount;
            this.tableData = res.data.result.page.items;
          } else {
            this.tableData = [];
            this.statisticsData = {
              sumChannel: 0,
              sumDeal: 0,
              sumIntroducing: 0
            };
          }
          this.statisticsData = {
            sumChannel: res.data.result.sumChannel,
            sumDeal: res.data.result.sumDeal,
            sumIntroducing: res.data.result.sumIntroducing
          };
        } else {
          this.tableData = [];
          this.statisticsData = {
            sumChannel: 0,
            sumDeal: 0,
            sumIntroducing: 0
          };
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.loading = false;
        this.tableData = [];
        this.statisticsData = {
          sumChannel: 0,
          sumDeal: 0,
          sumIntroducing: 0
        };
        this.$message.error(err.message || '服务器异常');
      });
    },
    // 点击当前行
    handleRow(row, event, column) {
      this.Dialogid = row.brokerId;
      row.isManager = this.activeIndex === '1';
      this.detailsData = row;
      this.detailsDialog = true;
    },
    // 选择组织变化时
    orgsChange(id) {
      if (id) {
        this.$axios.get('/security/org/queryPersonPage', {
          params: {
            orgId: id
          }
        }).then((res) => {
          this.bdList = res.data.items;
        });
      } else {
        this.bdList = [];
        this.filterForm.bdId = '';
      }
      this.handlePageChange(1);
    },
    // 编辑弹窗关闭
    editDialogchange(res) {
      this.editDialog = res;
    },
    // 编辑
    handleEdit(row) {
      this.Dialogid = row.brokerId;
      this.detailsData = row;
      this.editDialog = true;
    },
    // 切换房源状态
    handleMenuSelect(key, keyPath) {
      this.activeIndex = key;
      // console.log(this.$refs.searchForm);
      this.filterForm = { // 筛选表单
        orgId: '', // 组织id
        bdId: '', // 管家id
        lastDate: '',
        lastDateBegin: '', // 最后转介开始
        lastDateEnd: '', // 最后转介结束
        lastFollow: '',
        lastFollowBegin: '', // 最后跟进开始
        lastFollowEnd: '', // 最后跟进结束
        keyword: '' // 关键字
      };
      this.handlePageChange(1);
    }
  },
  components: {
    SelectOrganization, ChannelDetails, ChannelEdit
  }
};
</script>
<style lang="scss" scoped>
.houseing {
  padding-top: 130px;
  padding-bottom: 10px;
  box-sizing: border-box;
  height: 100%;
  position: relative;
}
.header {
  display: block;
  margin-top: -130px;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  background-color: #fff;
  .filter-form-box {
    padding: 18px 0 0 10px;
    background-color: #eee;
  }
  .filter-form-box >>> .el-range-editor.el-input__inner {
    padding: 3px;
  }
  .filter-form-box >>> .el-input__icon.el-range__icon.el-icon-date {
    display: none;
  }
  .filter-form-box >>> .el-input__icon.el-range__close-icon {
    width: 18px;
  }
  .filter-form-box >>> .el-date-editor .el-range__close-icon {
    width: 16px;
  }
  .statistics-div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 14px;
    color: #fa5555;
    height: 100%;
    padding: 20px 20px 0 20px;
    box-sizing: border-box;
    p {
      margin-left: 20px;
    }
    span {
      font-weight: bold;
    }
  }
}
.date-range {
  width: 240px !important;
}
.search-key {
  width: 240px;
}
.el-menu-demo {
  padding: 0 170px 0 20px;
}
.hd-buttom {
  // height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: solid 1px #e6e6e6;
}
.houseing-table {
  position: relative;
  margin: 0px 10px 0 10px;
  padding-bottom: 50px;
  height: 100%;
  box-sizing: border-box;
  background-color: #eeeeee;
  .el-table--border {
    border: 1px solid #ddd;
  }
}
.talbe-box {
  width: 100%;
  height: 100%;
}
.default-color {
  background-color: #333;
}
</style>
<style lang="scss">
.channelManage {
  .el-table__header {
    th {
      background: rgba(250, 250, 250, 1);
    }
  }
}
</style>

