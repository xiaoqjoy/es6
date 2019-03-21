
<template>
  <section class="house-box">
    <header class="house-header">
      <el-row style="background: #fff;">
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
              <el-badge v-if="editingNubmer > 0" :value="editingNubmer"
                class="editingNubmer">
              </el-badge>
            </el-menu-item>
          </el-menu>
        </el-col>
        <el-col :span="6">
          <div class="mart-10">
            <el-input v-model="queryKey"
              placeholder="输入标题/小区/楼栋/房号搜索"
              size="mini"
              clearable></el-input>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="mart-10 mgl-20">
            <el-button type="primary"
              size="mini"
              @click="handlePageChange(1)">搜索</el-button>
          </div>
        </el-col>
      </el-row>
    </header>
    <div class="house-list mart-10">
      <el-table :data="HouseData"
        border
        stripe
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
        <el-table-column prop="gardenName"
          label="楼盘"
          :min-width="100"
          align="center" />
        <el-table-column prop="buildingName"
          label="楼栋"
          :min-width="80"
          align="center" />
        <el-table-column prop="number"
          label="房号"
          :min-width="80"
          align="center">
          <template slot-scope="scope">
            <span class="room-number">{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="houseStyle"
          label="户型"
          :min-width="80"
          align="center">
        </el-table-column>
        <el-table-column prop="managerName"
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
            {{scope.row.commitHouseDesc}}
          </template>
        </el-table-column>
        <el-table-column label="操作"
          :width="150"
          align="center">
          <template slot-scope="scope">
            <el-button v-if="checkPermission('LONG_SITUATION_EDIT')"
              type="text"
              size="small"
              @click.stop="handleEdit(scope.$index, scope.row)">
              <span v-if="activeIndex === 'EDITING'">发布房源</span>
              <span v-else>编辑</span>
            </el-button>
            <el-button type="text"
              size="small"
              v-if="checkPermission('LONG_SITUATION_DOWN') && activeIndex ==='ENABLED'"
              @click.stop="handleSoldOut(scope.$index, scope.row, 'down')">下架</el-button>
            <el-button type="text"
              size="small"
              v-else-if=" checkPermission('LONG_SITUATION_EDIT') && activeIndex === 'DISABLED'"
              @click.stop="handleSoldOut(scope.$index, scope.row, 'up')">上架</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="house-pagination">
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
      :visible.sync='houseEditDialog'
      :close-on-click-modal="false"
      width="950px">
      <long-rent-house-edit v-if="houseEditDialog"
        :houseItemData="houseItemData"
        v-on:changeDialog="getChange"
        v-on:refreshData="requestData"></long-rent-house-edit>
    </el-dialog>

    <el-dialog title="房源详情"
      :visible.sync='houseInfoDialog'
      :close-on-click-modal="false"
      width="950px">
      <long-rent-house-info v-if="houseInfoDialog"
        :houseItemData="houseItemData"></long-rent-house-info>
    </el-dialog>

  </section>
</template>
<script>
import LongRentHouseEdit from './components/HouseRelease/LongRentHouseEdit';
import LongRentHouseInfo from './components/HouseRelease/LongRentHouseInfo';
import { handlePages } from '@/components/common/mixin';
export default {
  name: 'LongRentRelease',
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

      houseEditDialog: false, // 弹框
      houseInfoDialog: false, // 房源详情
      houseItemData: {},
      HouseData: []
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
        '/security/room/longSituation/queryLongSituation',
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
        '/security/room/longSituation/querySituationNum'
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
        this.handleUrl = '/security/room/longSituation/up';
      } else {
        this.handlemesg = '不在';
        this.handleInfo = '下架';
        this.handleUrl = '/security/room/longSituation/down';
      }
      this.id = row.id;
      const h = this.$createElement;
      this.$msgbox({
        message: h('div', null, [
          h('p', null, '确定要' + this.handleInfo + '房源 （' + row.gardenName + '-' + row.buildingName + '-' + row.number + ') 吗?'),
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
              if (res.data.status === 'C0000') {
                if (res.data.result) {
                  this.$message.success('操作成功');
                  // 操作上下架 刷新房态
                  this.$store.commit('freshenLREntireHouseStataus', true);
                  this.$store.commit('freshenLRJointHouseStataus', true);

                  this.requestData();
                } else {
                  this.$message.error('操作失败');
                }
              } else {
                this.$message.error(res.data.message);
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
      this.houseEditDialog = data;
    },

    // 点击当前行
    handleRow(row, event, column) {
      this.houseItemData = row;
      this.houseInfoDialog = true;
    },

    // 编辑
    handleEdit(index, row) {
      this.houseItemData = row;
      this.houseEditDialog = true;
    },

    // 切换房源状态
    handleMenuSelect(key, keyPath) {
      this.activeIndex = key;
      this.handlePageChange(1);
    }

  },
  components: {
    LongRentHouseEdit,
    LongRentHouseInfo
  }
};
</script>
<style scoped>

.mart-10 {
  margin-top: 10px !important;
}

.talbe-box {
  width: 100%;
  height: 100%;
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

