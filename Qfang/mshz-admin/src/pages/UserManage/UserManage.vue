<template>
  <section class="house-box">
    <header class="house-header">
      <div class="search-box pdl-ten">
        <el-row :gutter="10">
          <el-col :span="3">
            <el-select v-model="source"
              placeholder="用户来源"
              size="mini"
              @change="handlePageChange(1)">
              <el-option label="PC"
                value=" PC"></el-option>
              <el-option label="WAP"
                value="WAP"></el-option>
              <el-option label="APP"
                value="APP"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-input v-model="keyword"
              placeholder="输入用户/昵称/手机号搜索"
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
        stripe
        header-align="center"
        ref="UserTable"
        size="small"
        height="100%"
        cell-class-name="default-color"
        @row-click="handleRow"
        v-loading="loading">
        <!-- <el-table-column prop="realName" label="姓名" :min-width="80" align="center">
        </el-table-column> -->
        <!-- <el-table-column prop="nickname" label="昵称" :min-width="80" align="center">
        </el-table-column> -->
        <el-table-column prop="phone"
          label="手机"
          :min-width="150"
          align="center">
        </el-table-column>
        <el-table-column prop="createTimeDesc"
          label="注册时间"
          :min-width="150"
          align="center">
        </el-table-column>
        <el-table-column prop="lastlyTime"
          label="最后登录时间"
          :min-width="150"
          align="center">
        </el-table-column>
        <el-table-column prop="source"
          label="来源"
          :min-width="80"
          align="center">
        </el-table-column>
        <el-table-column prop="integral"
          label="积分"
          :min-width="100"
          align="center">
        </el-table-column>
        <el-table-column prop="orderCount"
          label="订单量"
          :min-width="100"
          align="center">
        </el-table-column>
        <el-table-column prop="status"
          label="状态"
          :min-width="100"
          align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 'NORMAL'">正常</span>
            <span v-else>冻结</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
          :min-width="150"
          align="center">
          <template slot-scope="scope">
            <el-button v-if="checkPermission('USER_USER_FREEZE') && scope.row.status === 'NORMAL'"
              size="mini"
              type="text"
              @click.stop="OpenFreeze(scope.$index, scope.row)">冻结</el-button>
            <el-button v-else-if="checkPermission('USER_USER_FREEZE')"
              size="mini"
              type="text"
              @click.stop="OpenFreeze(scope.$index, scope.row)">解冻</el-button>
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

    </div>
    <!-- 弹框 -->
    <el-dialog title="用户详情"
      :visible.sync='detailsDialog'
      :close-on-click-modal="false"
      width="950px">
      <user-details v-if="detailsDialog"
        :id="id"></user-details>
    </el-dialog>

    <el-dialog width="50%"
      :title="message"
      :visible.sync="innerVisible"
      :close-on-click-modal="false">
      <div class="pd-20">
        <h3></h3>
        <el-input type="textarea"
          :rows="7"
          v-model="remark"
          :max="100"
          :min="10"
          placeholder="请输入冻结的原因"></el-input>
      </div>
      <div class="dialog-footer">
        <el-button type="primary"
          size="mini"
          @click="handleFreeze">确定</el-button>
        <el-button size="mini"
          @click="innerVisible = false,remark='' ">取消</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
import UserDetails from './components/UserDetails';
import { handlePages } from '@/components/common/mixin';
export default {
  name: 'UserManage',
  mixins: [handlePages],
  data() {
    return {
      // Contract
      // 后台返回的数据结构
      loading: true,
      message: '冻结',
      operation: 'FREEZE',
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
      this.$axios.get('/security/user/queryUserInfoPage', {
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
      this.userName = row.nickname;
      this.id = row.id;
      if (row.status === 'NORMAL') {
        this.innerVisible = true;
        this.message = '冻结';
        this.operation = 'FREEZE';
      } else {
        this.message = '解冻';
        this.operation = 'UNFREEZE';
        this.handleFreeze();
      }
    },

    handleFreeze() {
      // this.$confirm('此操作将冻结' + this.userName + ', 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      if (this.operation === 'FREEZE' && this.remark.trim().length < 10) {
        this.$message.error('请输入冻结原因，至少10个字');
        return false;
      }
      this.$axios.post(
        '/security/user/freeze', {
          userId: this.id,
          reason: this.remark,
          operation: this.operation
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          if (res.data.result) {
            this.requestData();
            this.innerVisible = false;
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
    }
  },
  components: {
    UserDetails
  }
};
</script>


<style scoped>
.search-box {
  height: 50px;
  line-height: 50px;
}

.el-menu-demo {
  padding: 0 170px 0 20px;
}

.default-color {
  background-color: #333;
}

</style>
