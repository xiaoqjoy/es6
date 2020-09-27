<style lang="less" scoped>
.auto-account {
  height: calc(100% - 74px);
  min-height: calc(100% - 74px);
  .search {
    margin-top: 0;
  }
  .table-area {
    background-color: #ffffff;
    padding: 20px 30px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
    min-height: 100%;
    margin-bottom: 20px;
  }
  // 搜索栏样式
  .search {
    .el-form-item {
      margin-right: 15px;
      &.dateRange {
        width: auto;
        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
          width: 355px;
        }
        .el-range-separator {
          width: 8%;
        }
        .el-form-item__label {
          margin-top: 10px;
        }
      }
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 170px;
    }
    .el-input--prefix .el-input__inner {
      padding: 0 15px;
    }
    .el-form-item-btn {
      width: auto;
      margin-right: 0;
    }
    .el-form-item-last {
      margin-right: 35px;
    }
  }
  // 按钮颜色
  .el-button--primary {
    background: #538bf1;
    color: #fff;
  }
  // 清空按钮
  .clear_btn {
    border: 1px solid #538bf1;
    background-color: #ffffff;
    color: #538bf1;
  }
  // 底部按钮
  .delete_submit {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    // 删除提交公共样式
    .t_button {
      width: 200px;
      height: 40px;
    }
    .lg_t {
      border: 1px solid #538bf1;
      font-size: 14px;
      color: #538bf1;
      letter-spacing: 1.07px;
      text-align: center;
    }
    .export_t {
      background: #538bf1;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 1.07px;
      text-align: center;
    }
  }
  //分页样式
  .pagination {
    margin-top: 20px;
  }
}
</style>

<template>
  <div class="auto-account">
    <div class="table-area">
      <el-form class="search" :inline="true" :model="searchInfo" ref="searchInfo">
        <el-form-item>
          <el-button icon="el-icon-plus" type="primary" @click="add">新增</el-button>
        </el-form-item>
        <el-form-item prop="productName">
          <el-input v-model="searchInfo.productName" placeholder="产品名称"></el-input>
        </el-form-item>
        <el-form-item prop="channelName">
          <el-input v-model="searchInfo.channelName" placeholder="渠道名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button class="clear_btn" @click="reset">清空</el-button>
        </el-form-item>
      </el-form>
      <div class="tables">
        <el-table
          class="common__table"
          :data="tableData"
          header-cell-class-name="table-head"
          row-class-name="table-tr"
          style="100%"
          v-loading="tableLoading"
          ref="tableDData">
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="productId" label="产品ID"></el-table-column>
          <el-table-column prop="productName" label="产品名称"></el-table-column>
          <el-table-column prop="channelCode" label="渠道编码"></el-table-column>
          <el-table-column prop="channelName" label="渠道名称"></el-table-column>
          <el-table-column label="自动出账">
            <template slot-scope="scope">
              {{ scope.row.isAutoAllotAccount ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column prop="updatedDate" label="维护日期"></el-table-column>
          <el-table-column prop="updatedBy" label="维护人员"></el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="detail(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination @jump-page='getData' :page='pageConfig' class="pagination"></pagination>
      <info-detail v-if="isDetail" :productList="productList" :channelList="channelList" :row="row" @close="close"></info-detail>
    </div>
  </div>
</template>

<script>
import { accountApi } from "../../account/js/server.js";
import pagination from "@components/pagination";
import infoDetail from "./info-details/info-details";
export default {
  name: 'autoAccount',
  data() {
    return {
      searchInfo: {},
      tableData: [],
      tableLoading: false,
      pageConfig: {
        account: 0,
        pageSize: 10,
        currentPage: 1,
        showJumpButton: true
      },
      productList: [],
      channelList: [],
      row: {},
      isDetail: false
    };
  },
  components: {
    pagination,
    infoDetail
  },
  methods: {
    add() {
      this.isDetail = true;
      this.row = {};
    },
    detail(row) {
      this.isDetail = true;
      this.row = row;
    },
    close(flag) {
      this.isDetail = false;
      if (flag) {
        this.getData();
      }
    },
    getData(pageNum = 1) {
      this.tableLoading = true;
      let params = Object.assign({}, this.searchInfo, {
        pageNum,
        pageSize: this.pageConfig.pageSize
      });
      for (let key in params) {
        if (!params[key]) {
          delete params[key];
        }
      }
      this.$MyFetch.get(accountApi.autoAccount.query, params).then((data) => {
        this.tableLoading = false;
        this.tableData = data.list;
        this.pageConfig.account = data.total || 1;
        this.pageConfig.currentPage = data.pageNum || 1;
      }).catch((err) => {
        this.tableLoading = false;
        this.$error(err.message);
      });
    },
    search() {
      this.getData();
    },
    reset() {
      this.$refs.searchInfo.resetFields();
    },
    getProductList() {
      this.$MyFetch.get(accountApi.autoAccount.productList).then((data) => {
        this.productList = data;
      }).catch((err) => {
        this.$error(err.message);
      });
    },
    getChannelList() {
      this.$MyFetch.get(accountApi.autoAccount.channelList).then((data) => {
        this.channelList = data;
      }).catch((err) => {
        this.$error(err.message);
      });
    }
  },
  mounted() {
    this.getData();
    this.getProductList();
    this.getChannelList();
  }
};
</script>
