<style lang="less" rel="stylesheet/less" scoped>
.dialog-box {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  width: 1200px;
  .title_type {
    text-align: center;
    background: #fff;
    font-size: 18px;
    letter-spacing: 1.3px;
    padding-left: 20px;
    font-weight: bold;
    box-shadow: 0 2px 6px 0 #d0d0d0;
  }
  .tip {
    color: #f00;
  }
  .info {
    margin-top: 20px;
    span {
      font-weight: bold;
    }
  }
  .table_box {
    margin-top: 20px;
  }
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title_type">{{ typeStr }}</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="dialog-box__middle">
        <p class="tip" v-if="isHistory">此页面展示数据为大数收到的流水，可能有缺失，以银行实际交易为准。</p>
        <p class="tip" v-else>此页面展示数据受行方服务限制，仅含最近6个月内流水。</p>
        <div class="info">
          <el-row>
            <el-col :span="6">
              <span>客户姓名：{{ row.customerName }}</span>
            </el-col>
            <el-col :span="6">
              <span>子账户：{{ row.subAccount }}</span>
            </el-col>
          </el-row>
        </div>
        <div class="table_box">
          <el-table
            v-loading="loading"
            :data="records"
            class="common__table"
            header-cell-class-name="table-head"
            row-class-name="table-tr">
            <el-table-column
              type="index"
              :index="indexMethod"
              label="序号">
            </el-table-column>
            <el-table-column
              label="日期">
              <template slot-scope="scope">
                <span v-if="scope.row.transTime">{{scope.row.transTime}}</span>
                <span v-else>{{scope.row.AccountDate}} {{scope.row.TranTime}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="汇款方姓名">
              <template slot-scope="scope">
                {{ scope.row.OppAccountName || scope.row.oppAccountName }}
              </template>
            </el-table-column>
            <el-table-column
              label="汇款方银行">
              <template slot-scope="scope">
                {{ scope.row.OppBankName || scope.row.oppBankName }}
              </template>
            </el-table-column>
            <el-table-column
              label="汇款方账号">
              <template slot-scope="scope">
                {{ scope.row.OppAccountNo || scope.row.oppAccountNo }}
              </template>
            </el-table-column>
            <el-table-column
              label="交易金额">
              <template slot-scope="scope">
                {{ scope.row.TranAmount || scope.row.transAmt }}
              </template>
            </el-table-column>
            <el-table-column
              label="备注">
              <template slot-scope="scope">
                {{ scope.row.Remark || scope.row.remark }}
              </template>
            </el-table-column>
            <el-table-column
              v-if="isHistory"
              prop="accountAmt"
              label="入账金额">
            </el-table-column>
            <el-table-column
              v-if="isHistory"
              prop="accountDate"
              label="入账日期">
            </el-table-column>
          </el-table>
          <pagination @jump-page="jump" :page="pageConfig" class="pagination" v-if="isHistory"></pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server";
import pagination from "@components/pagination";
export default {
  data() {
    return {
      loading: true,
      records: [],
      pageConfig: {
        account: 0, // 总条数
        pageSize: 100, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }
    };
  },
  props: {
    row: Object,
    isHistory: Boolean
  },
  computed: {
    typeStr() {
      if (this.isHistory) {
        return "子账户流水（历史）";
      } else {
        return "子账户流水（6月内）";
      }
    }
  },
  components: {
    pagination
  },
  methods: {
    close() {
      this.$emit("close");
    },
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.querySubAccountTransInfoLocal(pageNum);
    },
    indexMethod(index) {
      return index + 1;
    },
    querySubAccountTransInfoLocal(page = 1) {
      this.loading = true;
      this.$MyFetch.post(`${counterDealApi.querySubAccountTransInfoLocal}?current=${page}&size=${this.pageConfig.pageSize}`, {
        subAccount: this.row.subAccount
      }).then((data) => {
        this.loading = false;
        this.records = data.records;
        this.pageConfig.account = data.total || 1;
        this.pageConfig.currentPage = data.pageNum || 1;
        this.pageConfig.pageSize = data.pageSize || 100;
      }).catch((err) => {
        this.loading = false;
        this.$error(err.message);
      });
    },
    querySubAccountTransInfoBank() {
      this.loading = true;
      let StartDate = this.$Moment().subtract(6, 'months').format("YYYYMMDD");
      let EndDate = this.$Moment().format("YYYYMMDD");
      this.$MyFetch.post(counterDealApi.querySubAccountTransInfoBank, {
        ReqSubAccount: this.row.subAccount,
        StartDate,
        EndDate
      }).then((data) => {
        this.loading = false;
        this.records = data.list;
        console.log(data);
      }).catch((err) => {
        this.loading = false;
        this.$error(err.message);
      });
    }
  },
  mounted() {
    if (this.isHistory) {
      this.querySubAccountTransInfoLocal();
    } else {
      this.querySubAccountTransInfoBank();
    }
  }
};
</script>
