<template>
  <section class="house-box">
    <header class="house-header">
      <div class="tab-pane pdl-ten bgc-e">
        <div class="search-content">
            <el-input class="search-key" placeholder="输入关键字搜索" v-model="searchKey" clearable size="mini" />
            <span class="mgl-20"><el-button type="success" size="mini" @click="handlePageChange(1)">搜索</el-button></span>
        </div>
        <div class="house-add">
          <el-button type="success" size="mini" @click="handlePublishNotice">发布公告</el-button>
        </div>
      </div>
    </header>
    <section class="house-list">
      <el-table :data="noticeList" border stripe header-align="center" ref="multipleTable" size="small" height="100%" cell-class-name="default-color" @row-click="handleRow" v-loading="loading">
        <el-table-column prop="title" label="标题" min-width="280px" align="center" />
        <el-table-column prop="publishTimeDesc" label="发布时间" min-width="100px" align="center" />
        <el-table-column prop="views" label="浏览次数" min-width="80px" align="center" />
        <el-table-column prop="publisherName" label="发布人" min-width="80px" align="center" />
        <el-table-column label="操作" width="100px" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click.stop="handleRemoval(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="house-pagination">
        <el-pagination class="page" @size-change="handleSizeChange" @current-change="handlePageChange" :current-page="currentPage" :page-sizes="[20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="recordCount">
        </el-pagination>
      </div>
    </section>
    <el-dialog v-if="publishNoticeDialog" :title="noticeDialogTitle" :visible.sync="publishNoticeDialog" :close-on-click-modal="false" width="950px">
      <publish-notice :noticeId="currentNoticeId" :noticeUrl="noticeUrl" v-on:togglePublishNotieDialog="togglePublishNotieDialog" />
    </el-dialog>
    <el-dialog v-if="noticeDetailDialog" title="公告详情" :visible.sync="noticeDetailDialog" :close-on-click-modal="false" width="950px">
      <notice-detail :noticeId="currentNoticeId" />
    </el-dialog>
  </section>
</template>

<script>
import PublishNotice from './components/PublishNotice';
import NoticeDetail from './components/NoticeDetail';
import { handlePages } from '@/components/common/mixin';
export default {
  name: 'CompanyNotice',
  mixins: [handlePages],
  components: {
    PublishNotice,
    NoticeDetail
  },
  data() {
    return {
      loading: true,
      noticeDialogTitle: '发布公告',
      noticeUrl: '',
      currentNoticeId: -1,
      noticeList: [], // 公告列表

      searchKey: '',
      publishNoticeDialog: false,
      noticeDetailDialog: false

    };
  },
  mounted() {
    this.requestData();
  },
  methods: {
    requestData() {
      this.loading = true;
      this.$axios
        .get('security/oms/firmAdvert/queryFirmAdvertPage', {
          params: {
            pageSize: this.pageSize,
            currentPage: this.currentPage,
            title: this.searchKey
          }
        })
        .then(res => {
          this.loading = false;
          if (res.data.status === 'C0000') {
            let { result } = res.data;
            this.currentPage = result.currentPage;
            this.pageCount = result.pageCount;
            this.recordCount = result.recordCount;
            this.noticeList = result.items;
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
    // 打开“发布公告”
    handlePublishNotice() {
      this.currentNoticeId = -1; // 清空上一次查看的公告 ID
      this.noticeDialogTitle = '发布公告';
      this.noticeUrl = 'security/oms/firmAdvert/addFirmAdvert';
      this.publishNoticeDialog = true;
    },
    // 打开公告详情页
    handleRow(row, event, column) {
      this.currentNoticeId = row.id;
      this.noticeDetailDialog = true;
    },

    // 编辑公告
    handleEdit(index, row) {
      this.currentNoticeId = row.id;
      this.noticeDialogTitle = '编辑公告';
      this.noticeUrl = 'security/oms/firmAdvert/updateFirmAdvert';
      this.publishNoticeDialog = true;
    },

    // 删除公告
    handleRemoval(index, row) {
      this.$confirm('是否删除此公告?', '提示', {
        confirmButtonText: ' 是 ',
        cancelButtonText: ' 否 ',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post('security/oms/firmAdvert/deleteFirmAdvert', {
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

    togglePublishNotieDialog(reload) {
      this.publishNoticeDialog = false;

      // 是否需要重载列表
      reload && this.requestData();
    }
  }
};
</script>
<style lang="scss" scoped>
.bgc-e {
  background: #eee !important;
  .search-content {
    width: 400px;
    display: inline-flex;
    line-height: 50px;
  }
}

.search-key {
  width: 100%;
}
</style>
