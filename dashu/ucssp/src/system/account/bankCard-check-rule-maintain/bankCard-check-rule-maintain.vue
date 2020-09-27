<template>
  <div class="content bankCard-check-rule-maintain">
    <!-- 标题 -->
    <div class="content_top">
      <span>银行卡校验规则维护</span>
    </div>
    <!-- 中间部分 -->
    <div class="sponsor">
      <!-- 查询这一行 -->
      <div class="serach_row">
        <el-form class="search add-form" :inline="true">
          <el-form-item class="el-form-item-btn">
            <el-button
            class="width100 add-btn"
            type="primary"
            icon="el-icon-plus"
            @click="addFormVisible = true">
            新增</el-button>
          </el-form-item>
        </el-form>
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
          <el-form-item class="el-form-item-btn">
            <el-button class="width100" type="primary" @click="refer(1)">查询</el-button>
            <el-button class="width100 claer_btn" type="primary" plain @click="clearSearch">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 表格 -->
      <div class="tables">
        <el-table
        class="common__table"
        :data="tableData"
        v-loading='tableLoading'
        header-cell-class-name="table-head"
        row-class-name="table-tr"
        style="100%"
        @selection-change="handleSelectionChange">
          <el-table-column prop="orgName" label="合作机构"></el-table-column>
          <el-table-column prop="primaryProductName" label="一级产品"></el-table-column>
          <el-table-column prop="checkBin" width="130" label="收款卡卡bin校验">
            <template slot-scope="scope">
              <span>{{(scope.row.checkBin === 'Y') ? '是' : '否'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="checkElement" width="130" label="收款卡四要素校验">
            <template slot-scope="scope">
              <span>{{(scope.row.checkElement === 'Y') ? '是' : '否'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="remark" width="300" label="备注">
            <template slot-scope="scope">
              <el-tooltip effect="dark" :content="scope.row.remark" placement="top">
                <div class="ellipsis">
                  {{scope.row.remark}}
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80" fixed="right">
            <template slot-scope="slot">
              <el-button type="text" @click="handEdit(slot.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="page_box">
        <!-- 分页条 -->
        <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
      </div>
      <!-- 新增组件 -->
      <addBankCardCheck v-if="addFormVisible" :partnerList='partnerList' :topBusinessType='topBusinessType' @clsoe_windowAlert='close_1'></addBankCardCheck>
      <!-- 修改组件 -->
      <editBankCardCheck v-if="editFormVisible" :partnerList='partnerList' :topBusinessType='topBusinessType' :editForm='editForm' @clsoe_windowAlert2='close_2'></editBankCardCheck>
    </div>
  </div>
</template>
<script>
import "@common/css/dialog";
import { accountApi } from "../../account/js/server.js"; // 接口
import addBankCardCheck from "./add-bankCard-check"; // 新增组件
import editBankCardCheck from "./edit-bankCard-check"; // 修改组件
import pagination from "@components/pagination"; // 分页组件
export default {
  name: "bankCard-check-rule-maintain",
  components: {
    addBankCardCheck, // 新增组件
    editBankCardCheck, // 修改组件
    pagination // 分页组件
  },
  data() {
    return {
      // 查询信息
      searchInfo: {
        orgName: "",
        orgId: ""
      },
      partnerList: [], // 合作机构
      topBusinessType: [], // 一级产品
      // 表格加载
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
      addFormVisible: false, // 新增组件显示、隐藏
      editFormVisible: false, // 修改组件显示、隐藏
      editForm: {} // 列表选中列
    };
  },
  created() {
    // 获取数据列表
    this.getList(1);
    this.changeCondition();
    this.getTopBusinessType();
  },
  methods: {
    getList(pageNum) {
      let para = {
        pageNum: pageNum,
        pageSize: this.pageConfig.pageSize
      };
      this.tableLoading = true;
      this.$MyFetch
        .get(accountApi.bankCard_check_rule_maintain.bankCardCheckAll, para)
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
          // console.log(err);
        });
    },
    // 获取数据列表（flag存在，则代表进行点击查询操作）
    refer(pageNum) {
      let para = {
        pageNum: pageNum,
        pageSize: this.pageConfig.pageSize,
        orgId: this.searchInfo.orgId
      };
      let url = this.searchInfo.orgId ? "/" + this.searchInfo.orgId : "";
      this.tableLoading = true;
      this.$MyFetch
        .get(accountApi.bankCard_check_rule_maintain.bankCardCheck + url, para)
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
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
    },
    // 清空查询信息
    clearSearch() {
      this.$refs["searchInfo"].resetFields();
      this.refer(1);
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
    // 产品工厂--一级产品
    getTopBusinessType() {
      this.$MyFetch
        .get(accountApi.bankCard_check_rule_maintain.topBusinessType)
        .then(res => {
          this.topBusinessType = res;
          // console.log(res);
        })
        .catch(err => {
          // console.log(err);
          this.$error(err.message);
        });
    },
    // 关闭新增组件
    close_1() {
      this.addFormVisible = false;
    },
    // 打开修改组件
    handEdit(row) {
      // console.log(row);
      this.editForm = row;
      this.editFormVisible = true;
    },
    // 关闭修改组件
    close_2() {
      this.editFormVisible = false;
    },
    handleSelectionChange(val) {
      // console.log(val);
      this.multipleSelection = val; // 选中行
    }
  }
};
</script>

<style lang="less">
// 备注
.bankCard {
  .el-textarea__inner {
    width: 200px;
    height: 80px;
  }
}
.bankCard-check-rule-maintain .sponsor .add-btn {
  .el-icon-plus {
    font-weight: 600;
  }
}
</style>

<style lang="less" scoped>
.content.bankCard-check-rule-maintain {
  background-color: #ffffff;
  min-height: 100%;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  padding: 0px 30px;
  position: relative;
  .content_top {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #d0d0d0;
    display: flex;
    align-items: center;
    position: relative;
    &::before {
      content: "";
      width: 2px;
      height: 16px;
      background: #538bf1;
    }
    span {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #333333;
      font-weight: bold;
      margin-left: 7px;
    }
    .upload-export {
      cursor: pointer;
      position: absolute;
      top: 20px;
      right: 0px;
      z-index: 1;
      color: #538bf1;
      span {
        color: #538bf1;
        font-weight: 400;
      }
    }
  }
  .sponsor {
    width: 100%;
    height: calc(100% - 60px);
    min-height: calc(100% - 60px);
    padding-top: 20px;
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
        margin-left: 20px;
        margin-right: 0;
      }
      &.add-form .el-form-item {
        margin-left: 0;
      }
    }
    //分页样式
    .pagination {
      margin: 20px 0px;
      padding-bottom: 20px;
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
  }
}
</style>
