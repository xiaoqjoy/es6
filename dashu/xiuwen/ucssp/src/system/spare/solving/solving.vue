<template>
  <div class="table-area">
    <el-button class="button button__blue font__white add" @click="openImportInfo">+ 引入</el-button>
    <el-table
    :data="list"
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
    <div class="btn-area">
      <el-button class="button  button__width-200 button__blue font__white" @click="getCallInfo">叫号</el-button>
    </div>
    <import-info @close="closeImportInfo" v-if="openImportInfoDg" ></import-info>
    <complete-info @close="closeCompleteInfo" v-if="openCompleteInfoDg" :applicationId="currentApplicationId"></complete-info>
    <drop-loan
      v-if="openDropLoanDg"
      :application-id="currentApplicationId"
      @close="closeDropLoan"></drop-loan>
    <el-dialog class="call-number" title="" :visible="callNumberVisible" width="450px" :show-close="false">
      <div class="call-content">
        <p>号码：<span class="yellow">{{callInfo.queueNo}}</span></p>
        <p>客户姓名：{{callInfo.customerName}}</p>
        <p>第【<span class="yellow">{{callInfo.callTimes}}</span>】次叫号</p>
      </div>
      <div class="call-btn">
        <el-button type="primary" class="width100" @click="callAgain">重呼</el-button>
        <el-button type="warning" class="width100" @click="callCancel">过号</el-button>
        <el-button type="primary" class="width100" @click="callNumberVisible = false">确定</el-button>
      </div>
    </el-dialog>
    <check-bank
    v-if="openCheckBankDg"
    @close="closeCheckBank"
    :application-id="currentApplicationId"
    :product-list="productList"
    ></check-bank>
  </div>
</template>

<script type="text/ecmascript-6">
import importInfo from './import_message';
import completeInfo from './complete_info';
import {spareApi} from '../js/server.js';
import pagination from '@components/pagination';
import dropLoan from './drop_loan';
import checkBank from './check_bank';

export default {
  data() {
    return {
      productList: [],
      page: 1,
      size: 10,
      guarantorBox: false,
      list: [],
      openImportInfoDg: false,
      openCompleteInfoDg: false,
      openDropLoanDg: false,
      openCheckBankDg: false,
      pageConfig: {
        account: 0,
        currentPage: 1,
        pageSize: 10,
        showJumpButton: true
      },
      currentApplicationId: '',
      loading: null, // 提交loading
      // 叫号
      callNumberVisible: false, // 叫号弹框的显示与隐藏
      callLoading: false, // 点击叫号加载中
      callInfo: {}, // 叫号信息
      sMacAddr: '' // mac地址
    };
  },
  components: {
    importInfo,
    completeInfo,
    pagination,
    dropLoan,
    checkBank
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
      this.confirmFn('是否确定挂起？', 'warning').then(() => {
        this.$MyFetch.get(spareApi.solving.hangUp + obj.applicationId)
          .then(() => {
            this.confirmFn('挂起成功！', 'success');
            this.getTableList(1);
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    // 提交 这里提交要先预提交再最终提交
    submitLoan(obj) {
      this.currentApplicationId = obj.applicationId;
      this.confirmFn('是否提交？', 'warning')
        .then(() => {
          this.loadingOpen();
          return new Promise((resolve, reject) => {
            this.checkImage(this.currentApplicationId)
              .then(data => {
                if (data.checkMessage) {
                  this.loadingClose();
                  this.confirmFn(data.checkMessage, 'warning')
                    .then(() => {
                      this.loadingOpen();
                      resolve();
                    })
                    .catch(err => {
                      reject(err);
                    });
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
          return this.preSubmitApi(this.currentApplicationId);
        })
        .then((data) => {
          this.productList = data;
          this.loadingClose();
          if (data.length > 0) {
            this.openCheckBankDg = true;
          } else {
            this.confirmFn('提交成功！', 'success');
            this.getTableList(1);
          }
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
    // 预提交
    preSubmitApi(id) {
      return new Promise((resolve, reject) => {
        this.$MyFetch.get(spareApi.solving.preSubmit + id, {}, { timeout: 30000 })
          .then((data = {}) => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    closeCheckBank() {
      this.openCheckBankDg = false;
      this.getTableList(1);
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
    // 获取产品信息 主要是大地机构不需要填银行卡 如果没有银行卡要填 那么直接跳过这一步
    getProductList(id) {
      return this.$MyFetch.post(spareApi.solving.bankInfo.query + id);
    },
    // 叫号
    getCallInfo() {
      if (!this.sMacAddr) {
        this.$getMac(this);
        this.confirmFn('获取mac地址失败，请刷新重试或使用IE11浏览器', 'warning');
        return false;
      }
      this.callLoading = true;
      const data = {
        macAddress: localStorage.getItem("sMacAddr") || this.sMacAddr
      };
      this.$MyFetch
        .post(spareApi.callQueue, data)
        .then(res => {
          // console.log(res);

          this.callNumberVisible = true;
          this.callLoading = false;
          this.callInfo = res;

          // this.callOper(this.callInfo.callTimes);
        })
        .catch(err => {
          console.error(err);
          this.callLoading = false;
          this.confirmFn(err.message, "error");
        });
    },
    // 重呼
    callAgain() {
      this.$MyFetch
        .post(spareApi.callRepeat, { serialId: this.callInfo.serialId })
        .then(res => {
          // console.log(res);

          this.callInfo = res;

          // this.callOper(this.callInfo.callTimes);
        })
        .catch(err => {
          this.confirmFn(err.message, "error");
        });
    },
    // 过号
    callCancel() {
      this.confirmFn("是否确认客户已过号？", "warning")
        .then(() => {
          this.$MyFetch
            .post(spareApi.crossQueueNo, { serialId: this.callInfo.serialId })
            .then(res => {
              // console.log(res);

              this.callNumberVisible = false;
            })
            .catch(err => {
              console.error(err);
              this.confirmFn(err.message, "error");
            });
        })
        .catch(() => {
          // this.callNumberVisible = false;
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
    // 获取mac地址，这里必须将组件实例传入函数
    this.$getMac(this);
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
