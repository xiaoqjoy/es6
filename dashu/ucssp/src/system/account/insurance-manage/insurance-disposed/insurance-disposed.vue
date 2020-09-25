<template>
  <div class="insurance-disposed">
    <div class="table-area">
      <!-- 查询表单 -->
      <el-form class="search" :inline="true" :model="searchInfo" ref="searchInfo">
        <el-form-item prop="orgId">
          <el-select v-model="searchInfo.orgId" placeholder="合作机构" clearable filterable>
            <el-option
            v-for="item in partnerList"
            :key="item.partnerCd"
            :value="item.partnerCd"
            :label="item.partnerName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="applicationId">
          <el-input v-model="searchInfo.applicationId" placeholder="申请编号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="accountAllotId">
          <el-input v-model="searchInfo.accountAllotId" placeholder="出账编号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="cusName">
          <el-input v-model="searchInfo.cusName" placeholder="客户姓名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="subcompanyId">
          <el-select v-model="searchInfo.subcompanyId" placeholder="分公司" clearable filterable>
            <el-option
            v-for="item in subcompanyList"
            :key="item.organizationId"
            :value="item.organizationId"
            :label="item.organizationName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="cusManager">
          <el-input v-model="searchInfo.cusManager" placeholder="客户经理" clearable></el-input>
        </el-form-item>
        <el-form-item prop="approveStatus" class="el-form-item-last">
          <el-select v-model="searchInfo.approveStatus" placeholder="审批状态" clearable filterable>
            <el-option v-for="item in approveStatuss" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
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
        v-loading='tableLoading'
        header-cell-class-name="table-head"
        row-class-name="table-tr"
        style="100%"
        ref="tableData">
          <el-table-column prop="orgName" width="120" label="合作机构"></el-table-column>
          <el-table-column prop="accountAllotId" width="160" label="出账编号"></el-table-column>
          <el-table-column prop="applicationId" width="160" label="申请编号"></el-table-column>
          <el-table-column prop="cusName" label="客户姓名"></el-table-column>
          <el-table-column prop="subcompanyName" width="120" label="分公司"></el-table-column>
          <el-table-column prop="approveStatus" label="审批状态"></el-table-column>
          <el-table-column prop="approveAmt" label="审批金额"></el-table-column>
          <el-table-column prop="loanTerm" label="期限"></el-table-column>
          <el-table-column prop="primaryProductName" label="一级产品"></el-table-column>
          <el-table-column prop="custManager" width="98" label="客户经理"></el-table-column>
          <el-table-column prop="arrivelDate" width="160" label="任务到达时间"></el-table-column>
          <el-table-column prop="endDate" width="160" label="完成时间"></el-table-column>
          <el-table-column prop="rejectReason" width="120" label="否决原因"></el-table-column>
          <el-table-column prop="otherReason" label="其他原因"></el-table-column>
        </el-table>
      </div>
      <div class="page_box">
        <div class="moneyInfo f__left">
          <span>合计笔数：</span>
          <span class="warning">{{tableNum}}</span>
          <span>笔</span>
          <span class="total-money">合计金额：</span>
          <span class="warning">{{tableTotal}}</span>
          <span>元</span>
        </div>
        <!-- 分页条 -->
        <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { accountApi } from "../../../account/js/server.js"; // 接口
import pagination from "@components/pagination"; // 分页组件
export default {
  name: "insurance-disposed",
  components: {
    pagination // 分页组件
  },
  data() {
    return {
      // 查询信息
      searchInfo: {
        orgId: "",
        applicationId: "",
        accountAllotId: "",
        cusName: "",
        subcompanyId: "",
        cusManager: "",
        approveStatus: ""
      },
      partnerList: [], // 合作机构
      subcompanyList: [], // 分公司
      approveStatuss: [
        { label: "通过", value: "SUCCESS" },
        { label: "否决", value: "VETO" }
      ],
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
      },
      tableNum: 0, // 合计笔数
      tableTotal: 0, // 合计金额
      total: 50 // 数据总数
    };
  },
  created() {
    // 获取列表
    // this.refer(1);
    // 获取合作机构
    this.changeCondition();
    // 获取分公司
    this.getOrganizations();
  },
  methods: {
    // 获取数据列表（flag存在，则代表进行点击查询操作）
    refer(pageNum) {
      // let req = Object.assign({}, this.searchInfo);
      if (
        this.searchInfo.orgId ||
        this.searchInfo.applicationId ||
        this.searchInfo.accountAllotId ||
        this.searchInfo.subcompanyId ||
        this.searchInfo.cusManager ||
        this.searchInfo.approveStatus ||
        this.searchInfo.cusName
      ) {
        let para = {
          orgId: this.searchInfo.orgId,
          applicationId: this.searchInfo.applicationId,
          accountAllotId: this.searchInfo.accountAllotId,
          subcompanyId: this.searchInfo.subcompanyId,
          cusManager: this.searchInfo.cusManager,
          approveStatus: this.searchInfo.approveStatus,
          cusName: this.searchInfo.cusName,
          pageNum: pageNum,
          pageSize: this.pageConfig.pageSize
        };
        this.tableLoading = true;
        this.$MyFetch
          .post(accountApi.insurance_manage.queryInsuranceBusinessHis, para)
          .then((data = {}) => {
            this.tableLoading = false;
            // console.log(data);
            this.pageConfig.account = data.total;
            this.pageConfig.currentPage = data.pageNum;
            this.tableData = data.list;
            // 统计
            this.tableNum = this.tableData.length;
            let money = 0;
            this.tableData.forEach((item, index) => {
              money += item.approveAmt;
            });
            this.tableTotal = money;
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
      this.tableData = [];
      this.pageConfig = {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      };
      this.tableNum = 0; // 合计笔数
      this.tableTotal = 0; // 合计金额
    },
    // 获取合作机构
    changeCondition() {
      let para = {};
      this.$MyFetch
        .post(accountApi.queryPartnerInfoList, para)
        .then((data = {}) => {
          // console.log(data);
          this.partnerList = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 获取分公司
    getOrganizations() {
      this.$MyFetch
        .get(accountApi.Organizations)
        .then((data = {}) => {
          this.subcompanyList = data.list;
        })
        .catch(err => {
          this.$error(err.message);
        });
    }
  },
  mounted() {}
};
</script>

<style>
</style>

<style lang="less" scoped>
.insurance-disposed {
  min-height: calc(100% - 74px);
  height: calc(100% - 74px);
  .el-table td {
    padding: 18px 0;
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
      width: 170px;
      height: 40px;
      margin-right: 15px;
      &.dateRange {
        width: auto;
        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
          width: 360px;
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
  // 统计金额
  .moneyInfo {
    margin-top: 4px;
    span {
      font-size: 12px;
    }
    .total-money {
      margin-left: 30px;
    }
  }
  // 按钮颜色
  .el-button--primary {
    background: #538bf1;
    color: #fff;
  }
  // 清空按钮
  .claer_btn {
    border: 1px solid #538bf1;
    background-color: #ffffff;
    color: #538bf1;
  }
  //分页样式
  .pagination {
    margin-top: 20px;
  }
}
</style>
