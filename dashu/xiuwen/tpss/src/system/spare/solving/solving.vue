<template>
  <div class="table-area">
    <el-button class="button button__blue font__white add" @click="openImportInfo">+ 引入</el-button>
    <el-table
    :data="list"
    highlight-current-row
    style="width: 100%">
      <el-table-column
        prop="applicationId"
        label="申请编号">
      </el-table-column>
      <el-table-column
        prop="custName"
        label="客户姓名">
      </el-table-column>
      <el-table-column
        prop="certificateNum"
        label="身份证号">
      </el-table-column>
      <el-table-column
        prop="mobileNum"
        label="手机号码">
      </el-table-column>
      <el-table-column
        label="备注">
        <template slot-scope="scope">
          {{scope.row.remark ? scope.row.remark : '/'}}
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="openCompleteInfo(scope.row)" type="text" size="small">完善资料</el-button>
          <el-button @click="submitLoan(scope.row)" type="text" size="small">提交</el-button>
          <el-button @click="hungUp(scope.row)" type="text" size="small">挂起</el-button>
          <el-button @click="forgiveLoan(scope.row)" type="text" size="small">放弃贷款</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :page="pageConfig" class="pagination" @jump-page="jump"></pagination>
    <import-info @close="closeImportInfo" v-if="openImportInfoDg" ></import-info>
    <complete-info @close="closeCompleteInfo" v-if="openCompleteInfoDg" :applicationId="currentApplicationId"></complete-info>
    <drop-loan
      v-if="openDropLoanDg"
      :application-id="currentApplicationId"
      @close="closeDropLoan"></drop-loan>
  </div>
</template>
<script type="text/ecmascript-6">
import importInfo from './import_message';
import completeInfo from './complete_info';
import {spareApi} from '../js/server.js';
import pagination from '@components/pagination';
import dropLoan from './drop_loan';

export default {
  data() {
    return {
      page: 1,
      size: 10,
      guarantorBox: false,
      list: [],
      openImportInfoDg: false,
      openCompleteInfoDg: false,
      openDropLoanDg: false,
      pageConfig: {
        account: 0,
        currentPage: 1,
        pageSize: 10,
        showJumpButton: true
      },
      currentApplicationId: '',
      loading: null
    };
  },
  components: {
    importInfo,
    completeInfo,
    pagination,
    dropLoan
  },
  methods: {
    // 放弃贷款
    forgiveLoan(obj) {
      this.currentApplicationId = obj.applicationId;
      this.confirmFn('确认放弃贷款？', 'warning')
        .then(() => {
           this.openDropLoanDg = true;
        });
    },
    // 挂起
    hungUp (obj) {
      this.$confirm('是否确定挂起？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$MyFetch.get(spareApi.solving.hangUp + obj.applicationId)
          .then(() => {
            this.confirmFn('挂起成功！', 'success');
            this.getTableList(1);
          })
          .catch(err => {
            console.log(err);
          });
      }).catch(() => {});
    },
    // 提交
    submitLoan(obj) {
      let id = obj.applicationId;
      this.confirmFn('确认提交该条信息？', 'warning')
        .then(() => {
          this.loadingOpen();
          return new Promise((resolve, reject) => {
            this.checkImage(id)
              .then(data => {
                if (data.checkMessage) {
                  this.loadingClose();
                  this.confirmFn(data.checkMessage, 'warning')
                    .then(() => {
                      this.loadingOpen();
                      resolve();
                    })
                    .catch((err) => reject(err));
                } else {
                  resolve();
                }
              })
              .catch(err => {
                reject(err);
              });
          });
        })
        .then(() => {
          return this.lastSubmitApi(id);
        })
        .then(() => {
          this.loadingClose();
        })
        .catch(err => {
          this.loadingClose();
          this.getTableList(this.pageConfig.currentPage);
          if (err.code === 'CPMS700040' || err.code === 'CPMS700027') {
            this.confirmFn(err.message);
          } else {
            !!err.message && this.confirmFn(err.message, 'error');
          }
        });
    },
    // 检查影像
    checkImage(id) {
      return new Promise((resolve, reject) => {
        this.$MyFetch.get(spareApi.solving.checkSubmit + id)
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 最终提交
    lastSubmitApi(id) {
      return new Promise((resolve, reject) => {
        this.$MyFetch.get(spareApi.solving.lastSubmit + '/' + id, {}, { timeout: 30000 })
          .then((data = {}) => {
            this.confirmFn('提交成功！', 'success');
            this.getTableList(1);
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    openImportInfo() {
      this.openImportInfoDg = true;
    },
    closeImportInfo() {
      this.openImportInfoDg = false;
      this.getTableList(1);
    },
    openCompleteInfo(data) {
      this.currentApplicationId = data.applicationId;
      this.$MyFetch.get(spareApi.solving.detailInfoCheck + this.currentApplicationId)
        .then(data => {
          this.openCompleteInfoDg = true;
        })
        .catch(err => {
          this.confirmFn(err.message, 'error');
        });
    },
    closeCompleteInfo() {
      this.openCompleteInfoDg = false;
      this.getTableList(1);
    },
    closeDropLoan() {
      this.openDropLoanDg = false;
      this.getTableList(1);
    },
    jump(num) {
      this.getTableList(num);
    },
    getTableList(currentPage) {
      this.$MyFetch.get(spareApi.solving.getTableList, { pageSize: 10, pageNum: currentPage })
        .then((data = {}) => {
          this.list = [...data.list];
          this.pageConfig.currentPage = data.pageNum;
          this.pageConfig.account = data.total;
        })
        .catch((err) => {
          this.confirmFn(err.message, 'error');
        });
    },
    loadingOpen() {
      this.loading = this.$loading({
        lock: true,
        text: '处理中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    loadingClose() {
      this.loading && this.loading.close();
    }
  },
  created() {
    this.getTableList(1);
  },
  beforeDestroy() {
     this.loadingClose();
  }

};
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .table-area{
    .add{
      margin-bottom: 20px;
    }
    .pagination{
      margin:20px 0;
    }
    .btn-area{
      margin-top: 30px;
      width: 100%;
      text-align: center;
    }
    .call-number {
      text-align: center;
      .call-content {
        margin-top: -20px;
        p {
          margin-bottom: 25px;
          &:nth-child(2) {
            border-bottom: 1px solid #eee;
            padding-bottom: 25px;
          }
        }
      }
      .call-btn {
        .el-button {
          &:first-child {
            background-color: @green;
          }
        }
      }
    }
  }
</style>
