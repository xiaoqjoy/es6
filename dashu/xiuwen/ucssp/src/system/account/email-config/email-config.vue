<template>
  <div class="content email-config">
    <!-- 标题 -->
    <div class="content_top">
      <span>邮箱配置</span>
    </div>
      <div class="sponsor">
        <!-- 查询这一行 -->
        <div class="serach_row">
          <el-form class="search" :inline="true">
            <el-form-item class="el-form-item-btn">
                <el-button
                class="width100 add-btn"
                type="primary"
                icon="el-icon-plus"
                @click="addDialogVisible = true">
                新增</el-button>
              </el-form-item>
          </el-form>
        </div>
        <!-- 表格 -->
        <div class="tables">
          <el-table
          class="common__table"
          :data="tableData"
          header-cell-class-name="table-head"
          row-class-name="table-tr"
          style="100%"
          v-loading='tableLoading'>
            <el-table-column type="index" width="60" label='序号'></el-table-column>
            <el-table-column prop="linkBranchDs" width="160" :formatter="formatterLinkBranchDs" label="所属分公司"></el-table-column>
            <el-table-column prop="partnerName" width="160" label="合作方名称"></el-table-column>
            <el-table-column
            prop="bankReceiverAddresses"
            min-width="210"
            label="合作方收件人">
              <template slot-scope="scope">
                <el-tooltip effect="dark" :content="scope.row.bankReceiverAddresses" placement="top">
                  <div class="ellipsis">
                    {{scope.row.bankReceiverAddresses}}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="senderAddress" min-width="210" label="我司发件人"></el-table-column>
            <el-table-column prop="copyToAddresses" min-width="210" label="抄送人">
              <template slot-scope="scope">
                <el-tooltip effect="dark" :content="scope.row.copyToAddresses" placement="top">
                  <div class="ellipsis">
                    {{scope.row.copyToAddresses}}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="130" fixed="right">
              <template slot-scope="slot">
              <el-button type="text" @click="detail(slot.row)">详情</el-button>
              <el-button type="text" style="color: #F55F5F;" @click="handleDel(slot.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 新增邮箱 -->
        <addEmail
        v-if="addDialogVisible"
        @clsoe_windowAlert='close_1'>
        </addEmail>
        <!-- 详情 -->
        <emailDetail
        v-if="detailDialogVisible"
        :formData='detailFormData'
        :linkBranch='subcompanyList'
        @clsoe_windowAlert2='close_2'>
        </emailDetail>
    </div>
  </div>
</template>
<script>
import addEmail from "./add-email"; // 新增邮箱组件
import emailDetail from "./email-detail"; // 邮箱详情组件
import { accountApi } from "../../account/js/server.js"; // 接口
import "@common/css/dialog";
export default {
  name: "email-config",
  components: {
    addEmail, // 新增邮箱组件
    emailDetail // 邮箱详情组件
  },
  data() {
    return {
      partnerList: [],
      subcompanyList: [],
      pageNum: 1,
      pageSize: 6,
      total: 5, // 数据总数
      // 表格加载状态
      tableLoading: false,
      // 表格信息
      tableData: [],
      addDialogVisible: false, // 新增邮箱的显示与隐藏
      detailDialogVisible: false, // 邮箱详情的显示与隐藏
      detailFormData: {},
      lineId: ""
      // linkBranchDs: ""
    };
  },
  created() {
    // 获取分公司
    this.getOrganizations();
    // 获取合作机构
    this.changeCondition();
    // 获取数据列表
    this.getList();
  },
  methods: {
    formatterLinkBranchDs(row) {
      for (var i = 0; i < this.subcompanyList.length; i++) {
        if (
          row.linkBranchDs &&
          row.linkBranchDs === this.subcompanyList[i].organizationId
        ) {
          return this.subcompanyList[i].organizationName;
        }
      }
    },
    // 获取数据列表（flag存在，则代表进行点击查询操作）
    getList(flag) {
      let para = {
        systemCode: "DSPM", // 必输 信贷系统:DSPM；核算系统：ACCT; 前端：front
        lineId: this.lineId,
        // linkBranchDs: this.linkBranchDs,
        stageType: "CZ" // 必输 待放款出账CZ/贷后DH
      };
      this.tableLoading = true;
      // console.log(data);
      this.$MyFetch
        .post(accountApi.email_config.queryLoanSendSet, para)
        .then((data = {}) => {
          this.tableLoading = false;
          // console.log(data);
          this.tableData = data.list ? data.list : data;
          this.tableData = this.tableData.sort((a, b) => {
            return a["partnerName"].localeCompare(b["partnerName"], "zh");
          });
        })
        .catch(err => {
          this.tableLoading = false;
          this.$error(err.message);
        });
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    },
    // 关闭新增邮箱组件
    close_1() {
      this.addDialogVisible = false;
    },
    // 关闭邮箱详情组件
    close_2() {
      this.detailDialogVisible = false;
    },
    // 详情
    detail(row) {
      this.detailDialogVisible = true;
      this.detailFormData = Object.assign({}, row);
      // console.log(row);
    },
    // 删除列表
    handleDel(row) {
      // console.log(row);
      let msg = row.partnerName;
      this.confirmFn(
        `确认删除<span class="warning">【${msg}】</span>的邮箱配置吗？`,
        "warning"
      )
        .then(() => {
          let data = {
            lineId: row.lineId,
            linkBranchDs: row.linkBranchDs,
            stageType: row.stageType,
            systemCode: row.systemCode
          };
          // console.log(data);
          this.tableLoading = true;
          this.$MyFetch
            .post(accountApi.email_config.deleteLoanSendSet, data)
            .then((res = {}) => {
              this.tableLoading = false;
              // console.log(res);
              this.confirmFn(res, "success");
              this.getList(1);
            })
            .catch(err => {
              this.tableLoading = false;
              this.$error(err);
              this.getList();
              // console.log(err);
            });
        })
        .catch(() => {});
    },
    // 获取合作机构
    changeCondition() {
      let para = {};
      this.$MyFetch
        .post(accountApi.queryPartnerInfoList, para)
        .then((data = {}) => {
          // console.log(data);
          this.partnerList = data;
          this.loading = false;
        })
        .catch(err => {
          this.$error(err.message);
          this.loading = false;
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
<style lang="less">
.email-config .sponsor .add-btn {
  .el-icon-plus {
    font-weight: 600;
  }
}
</style>

<style lang="less" scoped>
.content {
  background-color: #ffffff;
  min-height: 100%;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  overflow-y: auto;
  padding: 0px 30px;
  margin-bottom: 20px;
  .content_top {
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #e5e5e5;
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
    // height: 100%;
    padding: 20px 0;
    height: calc(100% - 60px);
    .tables {
      height: calc(100% - 82px);
    }
    .el-icon-plus {
      font-weight: 600;
    }
  }
  // 按钮颜色
  .el-button--primary {
    background: #538bf1;
    color: #fff;
  }
}
.email-config {
  .upload-export {
    position: absolute;
    top: 20px;
    right: 50px;
  }
}
.el-select-dropdown__item {
  height: 40px;
  line-height: 40px;
  font-family: PingFang-SC-Regular;
  font-size: 14px;
  color: #333333;
  letter-spacing: 0;
  text-align: center;
}
</style>
