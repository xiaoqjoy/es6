<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan{
    .dialog-box{
      width: 916px;
      background: #fff;
      .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: bold;
      box-shadow: 0 2px 6px 0 #d0d0d0;
    }
      .complete-product {
        margin: 20px 30px;
        min-height: 628px;
      }
    }
  }
  .pagination {
    margin-top: 20px;
  }
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title_type">移交记录</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="complete-product">
        <el-table
        :data="tableData"
        style="width: 100%">
          <el-table-column
            prop="qrProductName"
            label="二维码产品">
          </el-table-column>
          <el-table-column
            prop="oldUmAccount"
            label="原营销人员UM">
          </el-table-column>
          <el-table-column
            prop="oldUmName"
            label="原营销人员姓名">
          </el-table-column>
          <el-table-column
            prop="nowUmAccount"
            label="现营销人员UM">
          </el-table-column>
          <el-table-column
            prop="nowUmName"
            label="现营销人员姓名">
          </el-table-column>
          <el-table-column
            prop="handleOverAccount"
            label="移交人">
          </el-table-column>
          <el-table-column
            prop="handleOverTime"
            label="移交时间">
          </el-table-column>
        </el-table>
        <pagination :page="pageConfig" class="pagination" @jump-page="getData"></pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import '@common/css/dialog';
  import pagination from '@components/pagination';
  import {marketingApi} from '../../js/server.js';
  export default{
    props: {
      umAccount: String,
      teamNo: String
    },
    data() {
      return {
        pageConfig: {
          account: 0,
          currentPage: 1,
          pageSize: 10,
          showJumpButton: true
        },
        tableData: []
      };
    },
    components: {
      pagination
    },
    methods: {
      close() {
        this.$emit('close');
      },
      getData(pageNum) {
        if (!pageNum || typeof pageNum !== "number") {
          pageNum = this.pageConfig.currentPage;
        }
        let form = Object.assign({
          umAccount: this.umAccount,
          teamNo: this.teamNo
        }, {
          pageSize: this.pageConfig.pageSize,
          pageNum
        });
        this.$MyFetch.get(marketingApi.handleOverLog, form)
        .then((data) => {
          data = data || {};
          this.pageConfig.account = data.total || 0;
          this.pageConfig.currentPage = data.pageNum || 0;
          this.tableData = data.list;
        })
        .catch((e) => {
          this.$error(e.message);
        });
      }
    },
    mounted() {
      this.getData();
    }
  };
</script>
