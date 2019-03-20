<template>
  <section class="house-box">
    <header class="house-header">
      <div class="filter-form-box">
        <el-form :inline="true"
          class="filter-form"
          size="mini">
          <el-form-item>
            <el-select v-model="entrustSource"
              placeholder="来源"
              size="mini"
              @change="handleEntrustSourceChange">
              <el-option label="来源"
                value=""></el-option>
              <el-option label="Q房网"
                value="QFANG_APP">
              </el-option>
              <!-- <el-option label="Q房PC站"
                value="QFANG_WEB">
              </el-option>
              <el-option label="Q房移动站"
                value="QFANG_WAP">
              </el-option>
              <el-option label="Q房网公众号"
                value="WECHAT_OFFICIAL_ACCOUNT">
              </el-option>
              <el-option label="Q房网_400电话"
                value="CALL_400">
              </el-option> -->
              <el-option label="H5活动页面"
                value="H5_PAGE">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <!-- <el-date-picker class="date-range"
              placeholder="委托日期"
              v-model="entrustDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              size="mini" /> -->
            <el-date-picker class="date-range"
              v-model="entrustDate"
              type="daterange"
              size="mini"
              range-separator="至"
              start-placeholder="委托日期始"
              end-placeholder="委托日期终"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>

          <!-- <el-form-item>
            <el-date-picker class="date-range"
              placeholder="核查日期"
              v-model="checkDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              size="mini" />
          </el-form-item> -->

          <el-form-item>
            <!-- <el-date-picker class="date-range"
              placeholder="跟进日期"
              v-model="lastFollowDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              size="mini" /> -->
            <el-date-picker class="date-range"
              v-model="lastFollowDate"
              type="daterange"
              size="mini"
              range-separator="至"
              start-placeholder="跟进日期始"
              end-placeholder="跟进日期终"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-input class="search-key"
              placeholder="输入房源标题 / 房源编码关键字搜索"
              v-model="keyWord"
              clearable
              size="mini" />
          </el-form-item>

          <el-form-item>
            <el-button type="success"
              size="mini"
              @click="handlePageChange(1)">搜索</el-button>
          </el-form-item>

        </el-form>
      </div>
    </header>
    <section class="house-list"
      v-loading="loading">
      <el-table :data="entrustList"
        border
        stripe
        header-align="center"
        ref="entrustList"
        size="mini"
        height="100%"
        cell-class-name="default-color"
        class="table-body"
        @row-click="handleRow">

        <el-table-column prop="roomCode"
          show-overflow-tooltip
          label="房源编码"
          min-width="120"
          align="center" />

        <!-- <el-table-column prop="nickname"
          label="客户姓名"
          min-width="80"
          align="center">
        </el-table-column> -->

        <el-table-column label="区域"
          show-overflow-tooltip
          prop="areaName"
          min-width="100"
          align="center">
          <template slot-scope="scope">
            {{scope.row.areaName}}
          </template>
        </el-table-column>

        <el-table-column label="楼盘"
          show-overflow-tooltip
          min-width="110"
          align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.gardenName.indexOf('，') !== -1">{{scope.row.gardenName.split('，')[0]}}</span>
            <span v-else>{{scope.row.gardenName.split(',')[0]}}</span>
          </template>
        </el-table-column>

        <el-table-column label="楼栋"
          show-overflow-tooltip
          min-width="100"
          align="center">
          <template slot-scope="scope">
            <span> {{scope.row.buildingName}}</span>
          </template>
        </el-table-column>

        <el-table-column label="房号"
          min-width="80"
          align="center">
          <template slot-scope="scope">
            {{scope.row.roomNumber}}
          </template>
        </el-table-column>

        <el-table-column prop="managerName"
          label="户型"
          min-width="100"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.bedRoom}}房</span>
            <span>{{scope.row.livingRoom}}厅</span>
            <!-- <span v-if="scope.row.kitchen">{{scope.row.kitchen}}厨</span>
            <span v-if="scope.row.toilet">{{scope.row.toilet}}卫</span> -->
          </template>
        </el-table-column>

        <el-table-column prop="area"
          label="面积"
          min-width="60"
          align="center" />

        <el-table-column prop="rent"
          label="期望租金"
          min-width="80"
          align="center">
        </el-table-column>

        <el-table-column prop="entrustDateDesc"
          label="委托日期"
          min-width="100"
          align="center">
        </el-table-column>

        <!-- <el-table-column prop="checkDateDesc"
          label="核查日期"
          min-width="100"
          align="center">
        </el-table-column> -->

        <el-table-column prop="followDateDesc"
          label="跟进日期"
          min-width="100"
          align="center">
        </el-table-column>

        <el-table-column prop="entrustStatusDesc"
          label="状态"
          min-width="90"
          align="center">
        </el-table-column>

        <el-table-column prop="entrustSourceDesc"
          label="来源"
          min-width="100"
          align="center">
        </el-table-column>

        <el-table-column label="操作"
          min-width="100"
          fixed="right"
          align="center">
          <template slot-scope="scope">
            <!-- ENTRUST_QUERY("业主委托查看权限及委托相关") -->
            <!-- v-if="checkPermission('CUSTOMER_LOOK_EDIT')  && scope.row.entrustSource === 'NO_LEAD_LOOK' && (scope.row.reserveDate > + new Date())" -->
            <el-button type="text"
              size="small"
              v-if="checkPermission('ENTRUST_CONVERT') && scope.row.entrustStatus === 'WANT_CONFIRM'"
              @click.stop="handleChangeStatus(scope.row)">转意向</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="house-pagination">
        <el-pagination class="page"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
          :current-page="currentPage"
          :page-sizes="[20, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="recordCount">
        </el-pagination>
      </div>
    </section>
    
    <!-- 详情页弹窗 -->

    <el-dialog title="委托详情"
      :visible.sync="entrustDetailDialogVisible"
      :close-on-click-modal="false"
      width="950px">
      <entrust-detail ref="entrustDialog"
        v-if="entrustDetailDialogVisible"
        :entrustId="entrustId"
        :refreshListData.sync="refreshListData"
        :entrustDetailDialogVisible.sync="entrustDetailDialogVisible">
      </entrust-detail>
    </el-dialog>

    <el-dialog title="编辑房源"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="950px">
      <add-house DialogType="Editor"
        source="entrust"
        :roomId="roomId"
        v-if="dialogVisible"
        v-on:changeDialog='getChange'>
      </add-house>
    </el-dialog>

  </section>
</template>

<script>
import { mapState } from 'vuex';
import { handlePages } from '@/components/common/mixin';
import entrustDetail from './landlordEntrust/entrustDetail';
import addHouse from '@/pages/HouseManage/components/Housing/Addhouse';
export default {
  name: 'landlordEntrust',
  mixins: [handlePages],
  components: {
    entrustDetail,
    addHouse
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  data() {
    return {
      roomId: '',
      loading: true,
      refreshListData: false,
      dialogVisible: false,

      entrustList: [],
      entrustSource: null,
      refundLeaseNo: null,
      entrustDate: [],
      // checkDate: '',
      lastFollowDate: [],
      keyWord: null,

      entrustDetailDialogVisible: false,
      entrustId: ''
    };
  },
  mounted() {
    this.requestData();
  },
  methods: {

    requestData() {
      this.loading = true;
      this.$axios
        .get('/security/room/entrust/selectEntrustPage', {
          params: this.getParams()
        })
        .then(res => {
          this.loading = false;
          if (res.data.status === 'C0000') {
            let { result } = res.data;
            // this.currentPage = result.currentPage;
            this.pageCount = result.pageCount;
            this.recordCount = result.recordCount;
            this.entrustList = result.items;
          } else {
            this.$message({
              type: 'warning',
              message: res.data.message
            });
          }
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
          this.$message.error(err.message || '服务器异常');
        });
    },
    getParams() {
      let entrustDate = this.entrustDate || [];
      let lastFollowDate = this.lastFollowDate || [];
      return {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        entrustSource: this.entrustSource || undefined,
        keyWord: this.keyWord || undefined,
        entrustDate: entrustDate[0] || undefined,
        entrustDateEnd: entrustDate[1] || undefined,
        // checkDate: checkDate || undefined,
        lastFollowDate: lastFollowDate[0] || undefined,
        lastFollowDateEnd: lastFollowDate[1] || undefined
      };
    },

    handleEntrustSourceChange(key, keyPath) {
      this.entrustSource = key;
      this.handlePageChange(1);
    },

    handleRow(row, event, column) {
      this.refreshListData = false;
      this.entrustId = row.id;
      this.entrustDetailDialogVisible = true;
    },

    // handleChangeStatus(data) {
    //   this.roomId = data.id;
    //   this.dialogVisible = true;
    // },
    // 取消
    handleChangeStatus(data) {
      const h = this.$createElement;
      this.$msgbox({
        message: h('div', null, [
          h('p', null, '确定把该房源转为意向房源？')
        ]),
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';

            this.$axios.post(
              '/security/room/entrust/convertIntent',
              {
                entrustId: data.id,
                entrustStatusEnum: 'INTENT_ROOM'
              }
            ).then((res) => {
              instance.confirmButtonLoading = false;
              // instance.confirmButtonText = '确定';
              if (res.data.status === 'C0000') {
                this.roomId = res.data.result || undefined;
                this.requestData();
                // 如果没有返回 roomId 则是该房已在意向房源。
                if (!this.roomId) {
                  this.$message.warning('意向房源库里已存在该房源。');
                } else {
                  this.$message.success('转意向成功');
                  this.dialogVisible = true;
                }
              } else {
                this.$message.error(res.data.message || '操作失败!');
              }
              done();
            }).catch((err) => {
              console.log(err);
              instance.confirmButtonLoading = false;
              this.$message.error(err.message || '操作失败!!!');
              done();
            });
          } else {
            done();
          }
        }
      }).then(action => {
        // console.log(action);
      }).catch((e) => {
        console.log(e);
      });
    },

    getChange(data) {
      this.dialogVisible = data;
    }

  },
  watch: {
    refreshListData(val) {
      // console.log(val);
      if (val) {
        this.requestData();
      }
    }
  }
};
</script>
<style scoped>
.list-wrapper {
  position: relative;
  padding-bottom: 20px;
  box-sizing: border-box;
  height: 100%;
  padding-top: 80px;
}
.list-header {
  position: relative;
  display: block;
  height: 60px;
  margin-top: -80px;
  text-align: left;
  background-color: #fff;
}
.list-header-row {
  line-height: 60px;
  padding-right: 20px;
}

.table-body {
  width: 100%;
  height: 100%;
}

.filter-form {
  min-width: 1010px;
  padding-top: 20px;
}
.search-key {
  width: 250px;
}

.date-range {
  width: 240px !important;
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
.text-ellips {
  width: 100px;
}
</style>
