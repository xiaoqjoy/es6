<template>
  <section class="house-box">
    <header class="house-header pdb-10">
      <div class="tab-pane">
        <el-menu
          :default-active="isShelves"
          class="el-menu-demo"
          mode="horizontal"
          active-text-color="#008842"
          @select="handleToggleShelveStatus">
          <el-menu-item index="1">已上架</el-menu-item>
          <el-menu-item index="2">已下架</el-menu-item>
        </el-menu>
        <div class="house-add">
          <el-button type="success" size="mini" @click="handleAddAd">添加广告</el-button>
        </div>
      </div>
    </header>
      <section class="house-list">
        <el-table :data="adList" stripe border header-align="center" ref="multipleTable" size="small" height="100%" cell-class-name="default-color" v-loading="loading">
          <el-table-column label="图片" width="130" align="center">
            <template slot-scope="scope">
              <img :src="scope.row.image.replace('{size}', '120x100')" class="img-size" />
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" :min-width="150" align="center" />
          <el-table-column label="链接" :min-width="200" align="center">
            <template slot-scope="scope">
              <a :href="scope.row.advertUrl" target="_blank">{{scope.row.advertUrl}}</a>
            </template>
          </el-table-column>
          <el-table-column prop="position" label="广告位置" :width="80" align="center" />
          <el-table-column v-if="isShelves === '1'" label="上架日期" :width="100" align="center">
            <template slot-scope="scope">
              {{scope.row.startTimeDesc}}
            </template>
          </el-table-column>
          <el-table-column v-else label="下架日期" :width="100" align="center">
            <template slot-scope="scope">
              {{scope.row.endTimeDesc}}
            </template>
          </el-table-column>
          <el-table-column label="状态" :width="isShelves === '1'? 100 : 200" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.upShelves === 1" size="mini">已上架</span>
              <span v-if="scope.row.upShelves === 2" size="mini">已下架</span>
            </template>
          </el-table-column>

          <el-table-column v-if="isShelves === '1'" label="排序" :width="80" align="center">
            <template slot-scope="scope">
              <el-button type="text" v-if="scope.$index > 0" size="mini" @click.stop="handleSwapPosition(scope.$index, scope.row, 'up')">
                <i class="icon iconfont icon-shangjiantou"></i>
              </el-button>
              <el-button type="text" v-if="scope.$index < adList.length-1" size="mini" @click.stop="handleSwapPosition(scope.$index, scope.row, 'down')">
                <i class="icon iconfont icon-xiajiantou"></i>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" :min-width="130" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button type="text" v-if="scope.row.upShelves === 2" size="mini" @click.stop="handleChangeShelveStatus(scope.$index, scope.row, 1)">上架</el-button>
              <el-button type="text" v-if="scope.row.upShelves === 1" size="mini" @click.stop="handleChangeShelveStatus(scope.$index, scope.row, 2)">下架</el-button>
              <el-button type="text" size="small" @click.stop="handleRemoval(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="house-pagination">
          <el-pagination class="page" @size-change="handleSizeChange" @current-change="handlePageChange" :current-page="currentPage" :page-sizes="[20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="recordCount">
          </el-pagination>
        </div>

      </section>
    <el-dialog v-if="addAdDialogVisible" :title="adDialogTitle" :visible.sync="addAdDialogVisible" :close-on-click-modal="false" width="950px">
      <add-ad :adId="currentAdId" :adUrl="adUrl" v-on:toggleAddAdDialog="toggleAddAdDialog" />
    </el-dialog>

  </section>
</template>

<script>
import AddAd from './components/AddAd';
import { handlePages } from '@/components/common/mixin';
export default {
  name: 'Advertisting',
  mixins: [handlePages],
  components: {
    AddAd
  },
  data() {
    return {
      loading: true,

      isShelves: '1',
      adList: [], // 广告列表
      currentAdId: -1,
      adUrl: '',
      adDialogTitle: '',
      addAdDialogVisible: false
    };
  },
  mounted() {
    this.requestData();
  },
  methods: {
    requestData() {
      this.loading = true;
      this.$axios
        .get('security/oms/advertManager/queryAdvertPage', {
          params: {
            pageSize: this.pageSize,
            currentPage: this.currentPage,
            isShelves: this.isShelves
          }
        })
        .then(res => {
          this.loading = false;
          if (res.data.status === 'C0000') {
            let { result } = res.data;
            this.currentPage = result.currentPage;
            this.pageCount = result.pageCount;
            this.recordCount = result.recordCount;
            this.adList = result.items;
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
    handleSwapPosition(index, row, direction) {
      let initiativeId = row.id;
      let passivityId;
      if (direction === 'up') {
        passivityId = this.adList[index - 1].id;
      } else if (direction === 'down') {
        passivityId = this.adList[index + 1].id;
      } else {
        return;
      }

      this.$axios
        .post('security/oms/advertManager/changeAdvertPriority', {
          initiativeId: initiativeId,
          passivityId: passivityId
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
    handleToggleShelveStatus(key, keyPath) {
      this.isShelves = key;
      this.handlePageChange(1);
    },
    handleChangeShelveStatus(index, row, status) {
      this.$confirm('是否' + (status === 1 ? '上架' : '下架') + '此广告?', '提示', {
        confirmButtonText: ' 是 ',
        cancelButtonText: ' 否 ',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post('security/oms/advertManager/changeShelves', {
            id: row.id,
            shelvesStatus: status
          })
          .then(res => {
            if (res.data.status === 'C0000') {
              this.$message({
                type: 'success',
                message: '成功!'
              });
              this.requestData();
            } else {
              let msg = res.data.status === 'S0602'
                ? '已有5个上架广告，请先下架一部分广告，再进行上架操作。'
                : res.data.message;
              this.$message({
                type: 'warning',
                message: msg
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    // 打开“发布广告”
    handleAddAd() {
      this.currentAdId = -1; // 清空上一次打开的编辑过的广告。
      this.adDialogTitle = '添加广告';
      this.adUrl = 'security/oms/advertManager/addAdvert';
      this.addAdDialogVisible = true;
    },

    // 编辑广告
    handleEdit(index, row) {
      this.currentAdId = row.id;
      this.adDialogTitle = '编辑广告';
      this.adUrl = 'security/oms/advertManager/updateAdvert';
      this.addAdDialogVisible = true;
    },

    // 删除广告
    handleRemoval(index, row) {
      this.$confirm('是否删除此广告?', '提示', {
        confirmButtonText: ' 是 ',
        cancelButtonText: ' 否 ',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post('security/oms/advertManager/deleteAdvert', {
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
              this.$message({ type: 'warning', message: res.data.message });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }).catch(() => {
      });
    },

    toggleAddAdDialog(reload) {
      this.addAdDialogVisible = false;

      // 是否需要重载列表
      reload && this.requestData();
    }
  }
};
</script>
<style scoped="scoped">

.search-key {
  width: 100%;
}
>>> .el-table td > .cell {
  height: 120px;
  line-height: 120px;
}

.img-size {
  max-width: 100%;
  vertical-align:middle;
}

</style>
