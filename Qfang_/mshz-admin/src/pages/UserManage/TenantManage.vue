<template>
  <section class="house-box">
    <header class="house-header">
      <div class="search-box filter-form-box">
        <el-row :gutter="10">
          <el-col :span="3">
            <el-select v-model="source"
              placeholder="用户来源"
              size="mini"
              @change="handlePageChange(1)">
              <el-option label="全部"
                value=""></el-option>
              <el-option label="线下客人"
                value="OFFLINE_GUEST"></el-option>
              <el-option label="携程"
                value="CTRIP"></el-option>
              <el-option label="去哪儿"
                value="QUNAR"></el-option>
              <el-option label="美团"
                value="MEITUAN"></el-option>
              <el-option label="途家"
                value="TUJIA"></el-option>
              <el-option label="小猪"
                value="XIAOZHU"></el-option>
              <el-option label="Airbnb"
                value="AIRBNB"></el-option>
              <el-option label="民宿好住app"
                value="MSHZ_APP"></el-option>
              <el-option label="民宿好住wap站"
                value="MSHZ_WAP"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-input v-model="keyword"
              placeholder="输入用户姓名/手机号搜索"
              size="mini"
              clearable></el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary"
              size="mini"
              @click="handlePageChange(1)">搜索</el-button>
          </el-col>

        </el-row>
      </div>
    </header>
    <div class="house-list">
      <el-table :data="userList"
        border
        header-align="center"
        ref="UserTable"
        size="small"
        height="100%"
        cell-class-name="default-color"
        @row-click="handleRow"
        v-loading="loading">
        <el-table-column prop="name"
          label="姓名"
          :min-width="80"
          align="center">
        </el-table-column>
        <el-table-column prop="phone"
          label="手机"
          :min-width="150"
          align="center">
        </el-table-column>
        <el-table-column prop="userSourceEnumDesc"
          label="来源"
          :min-width="80"
          align="center">
        </el-table-column>
        <el-table-column prop="lastStayTimeDesc"
          label="最后入住时间"
          :min-width="150"
          align="center">
        </el-table-column>
        <el-table-column prop="guestCount"
          label="入住次数"
          :min-width="100"
          align="center">
        </el-table-column>

        <!-- <el-table-column label="操作" :min-width="150" align="center"> -->
        <!-- <template scope="scope">
            <el-button v-if="scope.row.status === 'NORMAL'" size="mini" type="text" @click.stop="OpenFreeze(scope.$index, scope.row)">冻结</el-button>
            <el-button v-else size="mini" type="text" @click.stop="OpenFreeze(scope.$index, scope.row)">解冻</el-button>
          </template> -->
        <!-- </el-table-column> -->
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

    </div>
    <!-- 弹框 -->
    <el-dialog title="住客详情"
      :visible.sync='detailsDialog'
      :close-on-click-modal="false"
      width="950px">
      <tenant-details v-if="detailsDialog"
        :id="id"></tenant-details>
    </el-dialog>

  </section>
</template>

<script>
import TenantDetails from './components/TenantDetails';
import { handlePages } from '@/components/common/mixin';
export default {
  name: 'TenantManage',
  mixins: [handlePages],
  data() {
    return {
      loading: true,
      // Contract
      // 后台返回的数据结构
      message: '冻结',
      operation: 'UNFREEZE',
      userName: '',
      remark: '',
      source: '',
      keyword: '',
      'result': {
        'currentPage': 1,
        'currentPageStartIndex': 0,
        'items': [
          {
            'address': '',
            'allOrderMoney': 0,
            'birthday': null,
            'createOperatorId': '',
            'createTime': 1516101048000,
            'createTimeDesc': '2018-01-16 19:10',
            'headPortrait': '',
            'id': '888888',
            'identityCard': '',
            'integral': 0,
            'lastlyTime': '2018-01-16 19:10',
            'nickname': '小小',
            'orderCount': 0,
            'password': '',
            'phone': '1235689',
            'realName': '',
            'sex': null,
            'source': 'PC',
            'status': 'NORMAL',
            'updateOperatorId': '',
            'updateTime': null,
            'weixin': ''
          }
        ],
        'nextPage': 2,
        'pageCount': 7,
        'pageSize': 1,
        'pageTemplate': '',
        'previousPage': 1,
        'queryRecordCount': true,
        'queryString': '',
        'recordCount': 7,
        'sort': 'DESC',
        'sortField': '',
        'uri': ''
      },

      detailsDialog: false, //
      innerVisible: false,
      id: '',
      userList: []
    };
  },
  created() {
    this.requestData();
  },
  methods: {
    // 获取列表数据
    requestData() {
      this.loading = true;
      this.$axios.get('/security/guest/queryGuestPage', {
        params: {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          source: this.source,
          keyword: this.keyword
        }
      }
      ).then((res) => {
        this.loading = false;
        if (res.data.status === 'C0000') {
          let { result } = res.data;
          this.currentPage = result.currentPage;
          this.pageCount = result.pageCount;
          this.recordCount = result.recordCount;
          this.userList = result.items;
        } else {
          this.$message.error('请求数据失败！');
        }
      }).catch((err) => {
        this.loading = false;
        this.$message.error(err.message || '服务器异常');
        console.log(err);
      });
    },

    // 子组件传来的
    getChange(data) {
      this.dialogVisible = data;
    },

    // 点击当前行
    handleRow(row, event, column) {
      this.id = row.id;
      this.detailsDialog = true;
    },

    OpenFreeze(index, row) {
      this.innerVisible = true;
      this.userName = row.nickname;
      this.id = row.id;
      if (row.status === 'FREEZE') {
        this.message = '解冻';
        this.operation = 'UNFREEZE';
      }
    },

    handleFreeze() {
      // this.$confirm('此操作将冻结' + this.userName + ', 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      this.$axios.post('/security/user/freeze', {
        userId: this.id,
        reason: this.remark,
        operation: this.operation
      }).then((res) => {
        if (res.data.status === 'C0000') {
          if (res.data.result) {
            this.$message({
              type: 'success',
              message: '处理成功'
            });
          } else {
            this.$message({
              type: 'error',
              message: '处理失败'
            });
          }
        } else {
          this.$message({
            type: 'error',
            message: res.data.message
          });
        }
      }).catch((e) => {
        console.log(e);
        this.$message({
          type: 'error',
          message: '服务异常'
        });
      });
      // }).catch(() => {

      // });
    }

  },
  components: {
    TenantDetails
  }
};
</script>


<style scoped>
.search-box {
  line-height: 50px;
}

.default-color {
  background-color: #333;
}

</style>
