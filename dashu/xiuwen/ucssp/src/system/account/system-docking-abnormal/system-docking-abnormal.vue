<template>
  <div class="content system-docking-abnormal">
    <!-- 标题 -->
    <div class="content_top">
      <span>系统对接异常查询</span>
    </div>
    <!-- 中间部分 -->
    <div class="sponsor">
      <!-- 查询这一行 -->
      <div class="serach_row">
        <el-form class="search" :inline="true" :model="searchInfo" ref="searchInfo">
          <el-form-item prop="orgName">
            <el-select v-model="searchInfo.orgName" placeholder="合作机构" clearable filterable>
              <el-option
              v-for="item in partnerList"
              :key="item.partnerCd"
              :value="item.partnerName"
              :label="item.partnerName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="subcompanyId">
            <el-select
            v-model="searchInfo.subcompanyId"
            placeholder="分公司"
            clearable
            filterable>
              <el-option
              v-for="item in subcompanyList"
              :key="item.organizationId"
              :value="item.organizationId"
              :label="item.organizationName"></el-option>
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
          <el-form-item class="dateRange" prop="dataParsingDate" label="">
            <el-date-picker
            v-model="searchInfo.dataParsingDate"
            align="left"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="数据解析开始时间"
            end-placeholder="数据解析结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="dateRange" prop="putDate" label="">
            <el-date-picker
            v-model="searchInfo.putDate"
            align="left"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="放款日期(起)"
            end-placeholder="放款日期(终)">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="abnormalStatusCode" class="el-form-item-last">
            <el-select v-model="searchInfo.abnormalStatusCode" placeholder="异常状态" clearable filterable>
              <el-option
              v-for="item in abnormalStatusCodes"
              :key="item.itemCode"
              :value="item.itemCode"
              :label="item.itemDesc">
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
        header-cell-class-name="table-head"
        row-class-name="table-tr"
        style="100%"
        v-loading='tableLoading'>
          <el-table-column prop="sendDate" width="180" label="资料发送时间"></el-table-column>
          <el-table-column prop="orgName" width="140" label="合作机构"></el-table-column>
          <el-table-column prop="cusName" label="客户姓名"></el-table-column>
          <el-table-column prop="applicationId" width="160" label="申请编号"></el-table-column>
          <el-table-column prop="subcompanyId" width="140" label="分公司"></el-table-column>
          <el-table-column prop="primaryProductName" label="一级产品"></el-table-column>
          <el-table-column prop="putDate" width="180" label="放款日期"></el-table-column>
          <el-table-column prop="approveAmt" label="审批金额"></el-table-column>
          <el-table-column prop="loanTerm" width="80" label="期限"></el-table-column>
          <el-table-column prop="dataParsingDate"  width="180" label="数据解析时间"></el-table-column>
          <el-table-column prop="abnormalStatusName" width="200" label="异常状态">
            <template slot-scope="scope">
              <el-tooltip effect="dark" :content="scope.row.abnormalStatusName" placement="top">
                <div class="ellipsis">
                  {{scope.row.abnormalStatusName}}
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed='right'>
            <template slot-scope="slot">
            <el-button class="delete_t" type="text" @click="handleDel(slot.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页组件 -->
      <div class="page_box">
        <!-- 分页条 -->
        <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { accountApi } from "../../account/js/server.js"; // 接口
import pagination from "@components/pagination"; // 分页组件
export default {
  name: "system-docking-abnormal",
  components: {
    pagination // 分页组件
  },
  data() {
    return {
      // 查询信息
      searchInfo: {
        orgName: "",
        subcompanyId: "",
        applicationId: "",
        accountAllotId: "",
        cusName: "",
        dataParsingDate: null,
        putDate: null,
        abnormalStatusCode: ""
      },
      // 合作机构
      partnerList: [],
      // 分公司
      subcompanyList: [],
      // 异常状态
      abnormalStatusCodes: [
        // {
        //   itemCode: "01",
        //   itemDesc: "放款回执-客户姓名及证件号码无法匹配"
        // },
        // {
        //   itemCode: "02",
        //   itemDesc: "放款回执-身份证无法匹配"
        // },
        // {
        //   itemCode: "03",
        //   itemDesc: "放款回执-放款金额无法匹配"
        // },
        // {
        //   itemCode: "04",
        //   itemDesc: "放款回执-放款期次无法匹配"
        // },
        // {
        //   itemCode: "05",
        //   itemDesc: "放款回执-放款日期不能大于当前系统日期"
        // },
        // {
        //   itemCode: "06",
        //   itemDesc: "还款比计划表-客户姓名及身份证无法匹配"
        // },
        // {
        //   itemCode: "07",
        //   itemDesc: "还款计划表-身份证无法匹配"
        // },
        // {
        //   itemCode: "08",
        //   itemDesc: "还款计划表每期本金之和-放款金额无法匹配"
        // },
        // {
        //   itemCode: "09",
        //   itemDesc: "还款计划表-放款期次无法匹配"
        // },
        // {
        //   itemCode: "11",
        //   itemDesc: "还款计划表核查异常"
        // },
        // {
        //   itemCode: "12",
        //   itemDesc: "放款回执无对应还款计划表"
        // }
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
      }
    };
  },
  created() {
    // 获取数据列表
    this.refer(1);
    // 获取合作机构
    this.changeCondition();
    // 获取分公司
    this.getOrganizations();
    // 获取异常状态
    this.getSysIterfaceExceptionCode();
  },
  methods: {
    // 清空查询信息
    clearSearch() {
      this.$refs["searchInfo"].resetFields();
      this.searchInfo.dataParsingDate = null;
      this.searchInfo.putDate = null;
      this.refer(1);
    },
    refer(pageNum) {
      // let req = Object.assign({}, this.searchInfo);
      // if (
      //   this.searchInfo.abnormalStatusCode ||
      //   this.searchInfo.applicationId ||
      //   this.searchInfo.cusName ||
      //   this.searchInfo.dataParsingDate ||
      //   this.searchInfo.orgName ||
      //   this.searchInfo.putDate ||
      //   this.searchInfo.subcompanyId
      // ) {
      let para = {
        abnormalStatusCode: this.searchInfo.abnormalStatusCode,
        applicationId: this.searchInfo.applicationId,
        accountAllotId: this.searchInfo.accountAllotId,
        cusName: this.searchInfo.cusName,
        dataParsingDate: this.searchInfo.dataParsingDate,
        orgName: this.searchInfo.orgName,
        putDate: this.searchInfo.putDate,
        subcompanyId: this.searchInfo.subcompanyId,
        pageNum: pageNum,
        pageSize: this.pageConfig.pageSize
      };
      this.tableLoading = true;
      this.$MyFetch
        .post(accountApi.system_docking_abnormal.allexceptionByReq, para)
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
      // } else {
      //   this.confirmFn("请至少输入一个查询条件");
      // }
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
    },
    // 删除列表
    handleDel(row) {
      // console.log(row);
      let msg = row.cusName;
      let exceptionId = row.id;
      this.confirmFn(
        `确认删除<span class="warning">【${msg}】</span>的异常数据吗？`,
        "warning"
      )
        .then(() => {
          let para = {
            exceptionId: exceptionId
          };
          this.$MyFetch
            .post(accountApi.system_docking_abnormal.updateById, para)
            .then((data = {}) => {
              // console.log(data);
              if (data.failNum < 1) {
                this.confirmFn("删除成功", "success");
              } else {
                this.confirmFn("非【无此客户信息】类异常，不允许删除", "error");
              }
              this.tableLoading = false;
              this.refer();
              // console.log(res);
            })
            .catch(err => {
              this.tableLoading = false;
              this.$error(err.message);
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
    },
    // 获取异常数据类型列表
    getSysIterfaceExceptionCode() {
      this.$MyFetch
        .get(accountApi.system_docking_abnormal.getSysIterfaceExceptionCode)
        .then((data = {}) => {
          this.abnormalStatusCodes = data.list;
        })
        .catch(err => {
          this.$error(err.message);
        });
    }
  }
};
</script>

<style lang="less">
</style>

<style lang="less" scoped>
.content.system-docking-abnormal {
  background-color: #ffffff;
  // height: 100%;
  min-height: 100%;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  padding: 0px 30px;
  position: relative;
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
    padding-top: 20px;
    height: calc(100% - 60px);
    min-height: calc(100% - 60px);
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
  }
  //分页样式
  .pagination {
    margin-top: 20px;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
  // 按钮颜色
  .el-button--primary {
    background: #538bf1;
    color: #fff;
  }
  .delete_t {
    color: #f55f5f;
  }
  // 清空按钮
  .claer_btn {
    border: 1px solid #538bf1;
    background-color: #ffffff;
    color: #538bf1;
  }
}
</style>
