<template>
  <div class="derating-disposed">
    <div class="table-area">
      <!-- 查询表单 -->
      <el-form class="search" :inline="true" :model="searchInfo" ref="searchInfo">
        <el-form-item prop="applicationId">
          <el-input v-model="searchInfo.applicationId" placeholder="申请编号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="accountAllotId">
          <el-input v-model="searchInfo.accountAllotId" placeholder="出账编号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="custName">
          <el-input v-model="searchInfo.custName" placeholder="客户姓名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="certificateNum" class="el-form-item-last">
          <el-input v-model="searchInfo.certificateNum" placeholder="身份证号" clearable></el-input>
        </el-form-item>
        <el-form-item class="el-form-item-btn">
          <el-button class="width100" type="primary" @click="refer(1)">查询</el-button>
          <el-button class="width100 claer_btn" type="primary" plain @click="clearSearch">清空</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格数据 -->
      <div class="tables">
        <el-table
        class="common__table"
        :data="tableData"
        header-cell-class-name="table-head"
        row-class-name="table-tr"
        style="100%"
        v-loading='tableLoading'
        ref="tableData">
          <el-table-column prop="orgName" min-width="120" label="合作机构"></el-table-column>
          <el-table-column prop="applicationId" width="160" label="申请编号"></el-table-column>
          <el-table-column prop="custName" width="98" label="客户姓名"></el-table-column>
          <el-table-column prop="certificateNum" width="180" label="身份证">
            <template slot-scope="scope">
              <span>{{scope.row.certificateNum.slice(0,4)}}*********{{scope.row.certificateNum.slice(14)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="primaryProductName" label="一级产品"></el-table-column>
          <el-table-column prop="loanTerm" label="期限"></el-table-column>
          <el-table-column prop="custManager" width="98" label="客户经理"></el-table-column>
          <el-table-column prop="approveAmt" label="审批金额"></el-table-column>
          <el-table-column prop="updateAmt" label="更改金额"></el-table-column>
          <el-table-column prop="approveStatus" label="放款状态"></el-table-column>
          <el-table-column prop="changeDate" width="160" label="变更时间"></el-table-column>
          <el-table-column prop="applyUser" label="申请人"></el-table-column>
          <el-table-column prop="checkUser" label="复核人"></el-table-column>
        </el-table>
      </div>
      <!-- 分页组件 -->
      <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
    </div>
  </div>
</template>

<script>
import "@common/css/dialog";
import { accountApi } from "../../../account/js/server.js"; // 接口
import pagination from "@components/pagination"; // 分页组件
export default {
  name: "derating-disposed",
  components: {
    pagination // 分页组件
  },
  data() {
    return {
      // 查询信息
      searchInfo: {
        applicationId: "",
        accountAllotId: "",
        custName: "",
        certificateNum: ""
      },
      // 表格加载状态
      tableLoading: false,
      // 表格信息
      tableData: [],
      // 分页
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }
    };
  },
  created() {
    // 获取列表
    // this.refer(1);
  },
  methods: {
    // 获取数据列表（flag存在，则代表进行点击查询操作）
    refer(pageNum) {
      // let req = Object.assign({}, this.searchInfo);
      if (
        this.searchInfo.applicationId ||
        this.searchInfo.accountAllotId ||
        this.searchInfo.certificateNum ||
        this.searchInfo.custName
      ) {
        let para = {
          applicationId: this.searchInfo.applicationId,
          accountAllotId: this.searchInfo.accountAllotId,
          certificateNum: this.searchInfo.certificateNum,
          custName: this.searchInfo.custName,
          pageNum: pageNum,
          pageSize: this.pageConfig.pageSize
        };
        this.tableLoading = true;
        this.$MyFetch
          .post(accountApi.loan_derating.queryProcessedReductionInfo, para)
          .then((data = {}) => {
            this.tableLoading = false;
            // console.log(data);
            this.pageConfig.account = data.total;
            this.pageConfig.currentPage = data.pageNum;
            this.tableData = data.list;
          })
          .catch(err => {
            this.tableLoading = false;
            this.$error(err.message);
          });
      } else {
        this.$error("请至少输入一个查询条件");
      }
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
    },
    // 清空查询信息
    clearSearch() {
      this.$refs["searchInfo"].resetFields();
      // this.refer(1);
      this.tableData = [];
      this.pageConfig = {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      };
    }
  }
};
</script>

<style lang="less">
</style>

<style lang="less" scoped>
.derating-disposed {
  height: calc(100% - 74px);
  min-height: calc(100% - 74px);
  .search {
    margin-top: 0;
  }
  .table-area {
    background-color: #FFFFFF;
    padding: 20px 30px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
    min-height: 100%;
    margin-bottom: 20px;
  }
  // 搜索栏样式
  .search {
    .el-form-item {
      width: 170px;
      height: 40px;
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
  .claer_btn {
    border: 1px solid #538BF1;
    background-color: #FFFFFF;
    color: #538BF1;
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
