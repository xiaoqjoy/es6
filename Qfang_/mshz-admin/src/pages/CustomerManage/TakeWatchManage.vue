<template>
  <section class="house-box">
    <header class="house-header">
      <div class="filter-form-box">
        
        <el-form :inline="true"
          class="mart-10"
          size="mini">
          <el-form-item>
            <el-select v-model="leadLookStatusEnum"
              placeholder="带看状态"
              size="mini"
              @change="handleLeadLookStatusEnumChange">
              <el-option label="带看状态"
                value=""></el-option>
              <el-option label="未带看"
                value="NO_LEAD_LOOK">
              </el-option>
              <el-option label="已完成"
                value="ALREADY_LEAD_LOOK">
              </el-option>
              <el-option label="已取消"
                value="CANCEL_LEAD_LOOK">
              </el-option>
              <el-option label="带看过期"
                value="EXPIRED_LEAD_LOOK">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker class="date-range"
              placeholder="带看日期"
              v-model="lookDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              size="mini" />
          </el-form-item>
          <el-form-item>
            <el-input class="search-key"
              placeholder="输入客户姓名／手机号搜索"
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
        <div v-if="!userInfo.manager"
          class="mgr-20">
          <el-button v-if="checkPermission('CUSTOMER_LOOK_EDIT')"
            type="success"
            @click="addType='add',addTakingDialogVisible = true,takingTitle='预约带看'"
            size="mini">预约带看
          </el-button>
          <el-button v-if="checkPermission('CUSTOMER_LOOK_EDIT')"
            type="success"
            @click="addType='trcking',addTakingDialogVisible = true,takingTitle='录带看'"
            size="mini">录带看
          </el-button>
        </div>
      </div>
    </header>
    <section class="house-list"
      v-loading="loading">
      <el-table :data="TakingLeaseList"
        border
        header-align="center"
        ref="TakingLeaseList"
        size="small"
        height="100%"
        cell-class-name="default-color"
        @row-click="handleRow">
        <el-table-column prop="leadLookNo"
          label="带看编号"
          min-width="110"
          align="center" />
        <el-table-column prop="userName"
          label="客户姓名"
          min-width="80"
          align="center">

        </el-table-column>
        <el-table-column label="带看日期"
          min-width="80"
          align="center">
          <template slot-scope="scope">
            {{scope.row.leadLookStatusEnum === 'ALREADY_LEAD_LOOK' ? scope.row.leadLookDateDesc : scope.row.reserveDateDesc}}
          </template>
        </el-table-column>
        <el-table-column label="带看物业"
          min-width="200"
          align="center">
          <template slot-scope="scope">
            <p v-for="(item,index) in scope.row.roomModels"
              :key="index">{{item.gardenName}} {{item.buildingName}} {{item.roomNumber}} {{item.bedRoomNum}}
            </p>
          </template>
        </el-table-column>
        <!-- v-if="userInfo.manager" -->
        <el-table-column
          prop="managerName"
          label="带看人"
          min-width="60"
          align="center">
        </el-table-column>

        <el-table-column prop="leadLookStatusEnumDesc"
          label="带看状态"
          min-width="60"
          align="center" />

        <el-table-column label="操作"
          min-width="100"
          align="center">
          <template slot-scope="scope">
            <slot v-if="scope.row.leadLookStatusEnum === 'NO_LEAD_LOOK' && !userInfo.manager">
              <el-button type="text"
                v-if="checkPermission('CUSTOMER_LOOK_EDIT')  && scope.row.leadLookStatusEnum === 'NO_LEAD_LOOK' && (scope.row.reserveDate > + new Date())"
                size="small"
                @click.stop="handleEdit(scope.row)">编辑</el-button>
              <el-button type="text"
                v-if="checkPermission('CUSTOMER_LOOK_EDIT')"
                size="small"
                @click.stop="handleComplete(scope.row)">完成</el-button>
              <el-button type="text"
                v-if="checkPermission('CUSTOMER_LOOK_EDIT')"
                size="small"
                @click.stop="handleCancel(scope.row)">取消</el-button>
            </slot>

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
          :total="recordCount">
        </el-pagination>
      </div>
    </section>

    <!-- 详情页弹窗 -->

    <el-dialog v-if="addTakingDialogVisible"
      :title="takingTitle"
      :visible.sync="addTakingDialogVisible"
      :close-on-click-modal="false"
      width="950px">
      <add-taking ref="addTaking"
        :addType="addType"
        :source="'takeList'"
        :leadLookNo="leadLookNo"
        :addTakingDialogVisible.sync="addTakingDialogVisible"
        @refreshData="requestData">
      </add-taking>
    </el-dialog>

    <el-dialog :title="leadLookNo"
      :visible.sync="takingDetailDialogVisible"
      :close-on-click-modal="false"
      width="950px">
      <taking-detail :leadLookNo="leadLookNo"
        :myLeadLookStatusEnum="myLeadLookStatusEnum"
        v-if="takingDetailDialogVisible">
      </taking-detail>
    </el-dialog>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import AddTaking from './Taking/AddTaking';
import TakingDetail from './Taking/TakingDetail';
import TakingEscort from './Taking/TakingEscort';
import { handlePages } from '@/components/common/mixin';
export default {
  name: 'TakeWatchManage',
  mixins: [handlePages],
  components: {
    AddTaking,
    TakingDetail,
    TakingEscort
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  data() {
    return {
      loading: true,

      TakingLeaseList: [], // 账单列表
      leadLookStatusEnum: null,
      refundLeaseNo: null,
      lookDate: '',
      keyWord: null,

      currentRefundLeaseNo: '',
      addTakingDialogVisible: false,
      takingDetailDialogVisible: false,
      myLeadLookStatusEnum: '',

      takingTitle: '预约带看',
      addType: 'add',
      leadLookNo: ''
    };
  },
  mounted() {
    this.requestData();
  },
  methods: {

    requestData() {
      this.loading = true;
      this.$axios
        .get('/security/leadLook/queryLeadLookPage', {
          params: this.getParams()
        })
        .then(res => {
          this.loading = false;
          if (res.data.status === 'C0000') {
            let { result } = res.data;
            // this.currentPage = result.currentPage;
            this.pageCount = result.pageCount;
            this.recordCount = result.recordCount;
            this.TakingLeaseList = result.items;
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
      return {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        leadLookStatusEnum: this.leadLookStatusEnum || undefined,
        keyWord: this.keyWord || undefined,
        lookDate: this.lookDate || undefined
      };
    },

    handleLeadLookStatusEnumChange(key, keyPath) {
      this.leadLookStatusEnum = key;
      this.handlePageChange(1);
    },

    // 打开账单详情
    handleRow(row, event, column) {
      this.leadLookNo = row.leadLookNo;
      this.myLeadLookStatusEnum = row.leadLookStatusEnum;
      this.takingDetailDialogVisible = true;
    },

    // 编辑
    handleEdit(data) {
      this.takingTitle = '编辑带看';
      this.leadLookNo = data.leadLookNo;
      this.addType = 'edit';
      this.addTakingDialogVisible = true;
    },

    // 完成
    handleComplete(data) {
      this.takingTitle = '完成带看';
      this.leadLookNo = data.leadLookNo;
      this.addType = 'complete';
      this.addTakingDialogVisible = true;
    },

    // 取消
    handleCancel(data) {
      this.leadLookNo = data.leadLookNo;
      const h = this.$createElement;
      this.$msgbox({
        message: h('div', null, [
          h('p', null, '确定取消本次带看？')
        ]),
        showCancelButton: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = '执行中...';

            this.$axios.post(
              '/security/leadLook/modifyLeadLookStatus',
              {
                leadLookNo: this.leadLookNo,
                leadLookStatusEnum: 'CANCEL_LEAD_LOOK'
              }
            ).then((res) => {
              instance.confirmButtonLoading = false;
              // instance.confirmButtonText = '确定';
              if (res.data.status === 'C0000') {
                this.$message.success('操作成功');
                this.requestData();
              } else {
                this.$message.error('操作失败');
              }
              done();
            }).catch((e) => {
              this.$message.error('操作失败!!!');
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

    toggleBillingDialog(reload) {
      this.addTakingDialogVisible = false;

      // 是否需要重载列表
      reload && this.requestData();
    },
    closeDetail() {
      this.orderDialogVisible = false;
    }
  },
  beforeRouteLeave(to, from, next) {
    // 离开组件的时候触发
    // handleCloseAllDialog()
    (async () => {
      try {
        if (this.addTakingDialogVisible) {
          await this.$refs.addTaking.handleCloseAllDialog();
        }
        this.addTakingDialogVisible = false;
        this.takingDetailDialogVisible = false;
        next();
      } catch (e) {
        console.log(e);
      }
    })();
  }
};
</script>
<style scoped>
.el-menu--horizontal {
  border-width: 0;
}

.filter-form-box {
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
}

.search-key {
  width: 200px;
}

.order-status {
  width: 85px;
}
.date-range {
  width: 210px !important;
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
