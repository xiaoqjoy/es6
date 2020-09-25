<template>
  <div class="insurance-approving">
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
        <el-form-item class="dateRange el-form-item-last" prop="arrivalDate" label="">
          <el-date-picker
          v-model="searchInfo.arrivalDate"
          align="left"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="业务到达时间(起)"
          end-placeholder="业务到达时间(终)">
          </el-date-picker>
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
        ref="multipleTable"
        @row-click="rowClick"
        @selection-change="handleSelectionChange">
          <el-table-column type="selection" ></el-table-column>
          <el-table-column prop="orgName" label="合作机构"></el-table-column>
          <el-table-column prop="accountAllotId" width="160" label="出账编号"></el-table-column>
          <el-table-column prop="applicationId" width="160" label="申请编号"></el-table-column>
          <el-table-column prop="cusName" label="客户姓名"></el-table-column>
          <el-table-column prop="subcompanyName" width="120" label="分公司"></el-table-column>
          <el-table-column prop="approveAmt" label="审批金额"></el-table-column>
          <el-table-column prop="loanTerm" label="期限"></el-table-column>
          <el-table-column prop="primaryProductName" label="一级产品"></el-table-column>
          <el-table-column prop="custManager" label="客户经理"></el-table-column>
          <el-table-column prop="arrivelDate" width="160" label="业务到达时间"></el-table-column>
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
      <!-- 保险批量回执录入 -->
      <batchInsuranceEntry v-if="dialogVisible" :tableData='multipleSelection' @clsoe_windowAlert='close_1'></batchInsuranceEntry>
      <!-- 底部按钮 -->
      <div class="delete_submit">
        <div>
          <el-button class="t_button export_t button" @click="showDialog">保险批量回执录入</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "@common/css/dialog";
import { accountApi } from "../../../account/js/server.js"; // 接口
import batchInsuranceEntry from "../batch-insurance-entry"; // 保险批量回执录入组件
import pagination from "@components/pagination"; // 分页组件
export default {
  name: "insurance-approving",
  components: {
    batchInsuranceEntry, // 保险批量回执录入组件
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
        arrivalDate: null
      },
      partnerList: [], // 合作机构
      subcompanyList: [], // 分公司
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
      // 保险批量回执录入
      dialogVisible: false, // 保险批量回执录入的显示与隐藏
      formData: {
        insurance_approval_status: "产品审批否决"
      },
      multipleSelection: [] // 选择行
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
      if (
        this.searchInfo.orgId ||
        this.searchInfo.applicationId ||
        this.searchInfo.accountAllotId ||
        this.searchInfo.cusName ||
        this.searchInfo.subcompanyId ||
        this.searchInfo.cusManager ||
        this.searchInfo.arrivalDate
      ) {
        let para = {
          orgId: this.searchInfo.orgId,
          applicationId: this.searchInfo.applicationId,
          accountAllotId: this.searchInfo.accountAllotId,
          cusName: this.searchInfo.cusName,
          subcompanyId: this.searchInfo.subcompanyId,
          cusManager: this.searchInfo.cusManager,
          arrivalDate: this.searchInfo.arrivalDate,
          pageNum: pageNum,
          pageSize: this.pageConfig.pageSize
        };
        this.tableLoading = true;
        this.$MyFetch
          .post(accountApi.insurance_manage.queryInsuranceBusinessDeal, para)
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
    rowClick(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 选中触发事件
    handleSelectionChange(val) {
      // console.log(val);
      // this.tableNum = val.length;
      // let money = 0;
      // val.forEach((item, index) => {
      //   money += item.approveAmt;
      // });
      // this.tableTotal = money;
      this.multipleSelection = val;
    },
    // 清空查询信息
    clearSearch() {
      this.$refs["searchInfo"].resetFields();
      this.searchInfo.arrivalDate = null;
      // this.refer(1);
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
    // 显示保险批量回执录入
    showDialog() {
      if (this.multipleSelection.length === 0) {
        this.$error("您还没有选中保险业务");
      } else {
        this.dialogVisible = true;
      }
    },
    // 关闭保险批量回执录入组件
    close_1() {
      this.dialogVisible = false;
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
  }
};
</script>

<style>
</style>

<style lang="less" scoped>
.insurance-approving {
  min-height: calc(100% - 74px);
  height: calc(100% - 74px);
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
  .el-table td {
    padding: 18px 0;
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
  // 底部按钮
  .delete_submit {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 20px 0;
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
