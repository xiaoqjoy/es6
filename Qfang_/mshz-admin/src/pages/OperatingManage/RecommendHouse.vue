<template>
  <section class="house-box">
    <header class="house-header">
      <el-row :gutter="10" class="line-h-50">
        <el-col :span="2" :offset="22">
          <el-button type="success" size="mini" @click="handleAddRecommendHouse">添加房源</el-button>
        </el-col>
      </el-row>
    </header>
    <section class="house-list">
      <el-table :data="recommendList" border stripe header-align="center" ref="multipleTable" size="small" height="100%" cell-class-name="default-color" class="table-body" v-loading="loading">
        <el-table-column label="图片" :min-width="140" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.mainPicture.replace('{size}', '120x100')" width="120" height="100" />
          </template>
        </el-table-column>
        <el-table-column label="房源" :min-width="100" align="center">
          <template slot-scope="scope">
            {{scope.row.title}}
            <div class="garden-name">
              {{scope.row.gardenName}}, {{scope.row.buildingName}}, {{scope.row.roomNumber}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="houseType" label="房型" :min-width="100" align="center" />
        <el-table-column prop="price" label="价格" :min-width="100" align="center" />
        <el-table-column prop="createTimeDesc" label="添加日期" :min-width="100" align="center" />
        <el-table-column label="排序" :min-width="80" align="center">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.$index > 0" size="mini" @click.stop="handleSwapPosition(scope.$index, scope.row, 'up')">
              <i class="icon iconfont icon-shangjiantou"></i>
            </el-button>
            <el-button type="text" v-if="scope.$index < recommendList.length - 1" size="mini" @click.stop="handleSwapPosition(scope.$index, scope.row, 'down')">
              <i class="icon iconfont icon-xiajiantou"></i>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.stop="handleRemoval(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="house-pagination">
        <el-pagination class="page" @size-change="handleSizeChange" @current-change="handlePageChange" :current-page="currentPage" :page-sizes="[20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="recordCount">
        </el-pagination>
      </div>
    </section>
    <el-dialog v-if="recommendHouseDialogVisible" title="添加房源" :visible.sync="recommendHouseDialogVisible" :close-on-click-modal="false" width="950px">
      <add-recommend-house v-on:toggleHouseDialog="toggleHouseDialog" :remainingCount="MAX_HOUSE_COUNT - recordCount" />
    </el-dialog>
  </section>
</template>

<script>
import AddRecommendHouse from './components/AddRecommendHouse';
import { handlePages } from '@/components/common/mixin';
export default {
  name: 'RecommendHouse',
  mixins: [handlePages],
  components: {
    AddRecommendHouse
  },
  data() {
    return {
      loading: true,

      MAX_HOUSE_COUNT: 5,
      recommendList: [], // 楼盘列表
      recommendHouseDialogVisible: false
    };
  },
  mounted() {
    this.requestData();
  },
  methods: {
    requestData() {
      this.loading = true;
      this.$axios
        .get('security/room/recommend/selectRoomPage', {
          params: {
            pageSize: this.pageSize,
            currentPage: this.currentPage
          }
        })
        .then(res => {
          this.loading = false;
          if (res.data.status === 'C0000') {
            let { result } = res.data;
            this.currentPage = result.currentPage;
            this.pageCount = result.pageCount;
            this.recordCount = result.recordCount;
            this.recommendList = result.items;
          } else {
            this.$message({
              type: 'warning',
              message: res.data.message
            });
          }
        })
        .catch(err => {
          this.loading = false;
          this.$message.error(err.message || '服务器异常');
          console.log(err);
        });
    },
    // 打开“添加房源”
    handleAddRecommendHouse() {
      if (this.MAX_HOUSE_COUNT - this.recordCount > 0) {
        this.recommendHouseDialogVisible = true;
      } else {
        this.$message({
          type: 'warning',
          message: '最多只可添加 ' + this.MAX_HOUSE_COUNT + ' 个推荐房源！'
        });
      }
    },

    // 调整位置
    handleSwapPosition(index, row, direction) {
      let initiativeId = row.id;
      let initPriority = row.priority;
      let passitiveId;
      let passPriority = 0;

      if (direction === 'up') {
        index--;
      } else if (direction === 'down') {
        index++;
      }

      passitiveId = this.recommendList[index].id;
      passPriority = this.recommendList[index].priority;

      this.$axios
        .post('security/room/recommend/changeRoom', {
          initiativeId,
          initPriority,
          passitiveId,
          passPriority
        })
        .then(res => {
          if (res.data.status === 'C0000') {
            this.$message({
              type: 'success',
              message: '交换成功!'
            });
            this.requestData();
          } else {
            this.$message({
              type: 'warning',
              message: res.data.message
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 移除房源
    handleRemoval(index, row) {
      this.$confirm('确定要删除此房源的首页推荐吗?', '提示', {
        confirmButtonText: ' 是 ',
        cancelButtonText: ' 否 ',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post('security/room/recommend/deleteRoom', {
            id: row.id
          })
          .then(res => {
            if (res.data.status === 'C0000') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.requestData();
            } else {
              this.$message({
                type: 'warning',
                message: res.data.message
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }).catch(() => {
      });
    },

    toggleHouseDialog(reload) {
      this.recommendHouseDialogVisible = false;

      // 是否需要重载列表
      reload && this.requestData();
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
  line-height: 60px;
  padding: 0 10px;
  margin-top: -80px;
  text-align: left;
}

.table-body {
  width: 100%;
  height: 100%;
}
.search-key {
  width: 100%;
}

.garden-name {
  color: #999;
}
</style>
