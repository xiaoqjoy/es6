<template>
  <div class="content business-progress">
    <!-- 标题 -->
    <div class="content_top">
      <span>业务处理进度</span>
      <div class="upload-export theme" @click="showImageDownload()">
        <i class="iconfont icon-video"></i>
        <span>影像下载</span>
        <input style="width:0px;height:0px;border:none;" type="text" id="path">
      </div>
    </div>
    <!-- 中间部分 -->
    <div class="sponsor">
      <!-- 查询这一行 -->
      <div class="serach_row">
        <el-form class="search" :inline="true" :model="searchInfo" ref="searchInfo">
          <el-form-item prop="collaborateModeCode">
            <el-select v-model="searchInfo.collaborateModeCode" placeholder="合作模式" clearable filterable>
              <el-option
              v-for="item in collaborateModeCodes"
              :key="item.itemCode"
              :value="item.itemCode"
              :label="item.itemDesc">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="orgName">
            <el-input v-model="searchInfo.orgName" placeholder="合作机构" clearable></el-input>
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
          <el-form-item prop="approveStatus">
            <el-select v-model="searchInfo.approveStatus" placeholder="审批状态" clearable filterable>
              <el-option
              v-for="item in approveStatuss"
              :key="item.value"
              :value="item.value"
              :label="item.desc">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="cusManager">
            <el-input v-model="searchInfo.cusManager" placeholder="客户经理" clearable></el-input>
          </el-form-item>
          <el-form-item class="dateRange" prop="arrivalDate" label="">
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
          <el-form-item class="dateRange el-form-item-last" prop="putputDate" label="">
            <el-date-picker
            v-model="searchInfo.putputDate"
            align="left"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="放款日期(起)"
            end-placeholder="放款日期(终)">
            </el-date-picker>
          </el-form-item>
          <!-- <el-form-item prop="putputDate">
            <el-date-picker
            v-model="searchInfo.putputDate"
            align="left"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="放款日期">
            </el-date-picker>
          </el-form-item> -->
          <el-form-item class="el-form-item-btn">
            <el-button class="width100" type="primary" @click="refer(1)">查询</el-button>
            <el-button class="width100 claer_btn" type="primary" plain @click="clearSearch">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 表格 -->
      <div class="tables">
        <el-table
        ref="multipleTable"
        class="common__table"
        :data="tableData"
        v-loading='tableLoading'
        header-cell-class-name="table-head"
        row-class-name="table-tr"
        style="100%"
        @row-click="rowClick"
        @selection-change="handleSelectionChange">
          <el-table-column type="selection" min-width="38"></el-table-column>
          <el-table-column prop="currentStage" label="当前阶段"></el-table-column>
          <el-table-column prop="collaborateModeCode" label="合作模式" :formatter="formatterCollMode"></el-table-column>
          <el-table-column prop="orgName" width="160" label="合作机构"></el-table-column>
          <el-table-column prop="accountAllotId" width="160" label="出账编号"></el-table-column>
          <el-table-column prop="applicationId" width="160" label="申请编号"></el-table-column>
          <el-table-column prop="cusName" label="客户姓名"></el-table-column>
          <el-table-column prop="subcompanyName" width="120" label="分公司"></el-table-column>
          <el-table-column prop="approveStatus" width="140" label="审批状态"></el-table-column>
          <el-table-column prop="approveAmt" label="审批金额"></el-table-column>
          <el-table-column prop="loanTerm" label="期限"></el-table-column>
          <el-table-column prop="primaryProductName" label="一级产品"></el-table-column>
          <el-table-column prop="cusManager" label="客户经理"></el-table-column>
          <el-table-column prop="arrivalDate" width="160" label="业务到达时间"></el-table-column>
          <el-table-column prop="sendDate" width="160" label="发送资料时间"></el-table-column>
          <el-table-column prop="sendStatus" width="120" label="发送资料状态"></el-table-column>
          <el-table-column prop="finishDate" width="160" label="完成日期"></el-table-column>
          <el-table-column prop="putputDate" width="160" label="放款日期"></el-table-column>
          <el-table-column prop="remark" width="200" label="备注">
            <template slot-scope="scope">
              <el-tooltip effect="dark" :content="scope.row.remark" placement="top">
                <div class="ellipsis">
                  {{scope.row.remark}}
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <template slot-scope="slot">
              <el-button type="text" @click.stop="openTransferRecord(slot.row)">流转记录</el-button>
              <el-button
              type="text"
              @click.stop="$showImage(slot.row.applicationId, '出账系统', {productId: slot.row.productId, menuId: 'account/business-progress'} )">影像查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="page_box">
        <!-- 分页条 -->
        <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
      </div>
      <!-- 流转记录 -->
      <transferRecord v-if="transferDialogVisible" :accountAllotId='accountAllotId' @clsoe_windowAlert2='close_2'></transferRecord>
      <!-- 底部按钮 -->
      <div class="delete_submit">
        <div>
          <el-button class="t_button export_t button" @click="exportReport">导出报表</el-button>
          <el-button class="t_button lg_t button" @click="printLG">担保确认函</el-button>
        </div>
      </div>
      <!-- 导出报表用的a标签 -->
      <a id="exportLog" style="display:none;"></a>
      <iframe id="export_iframe" name="export_iframe" style="display:none;"></iframe>
    </div>
  </div>
</template>
<script>
import router from "@/router/index";
import "@common/css/dialog";
// import JSZip from "jszip";
// import FileSaver from "file-saver";
import { accountApi } from "../../account/js/server.js"; // 接口
import transferRecord from "./transfer-record"; // 流转记录组件
import pagination from "@components/pagination"; // 分页组件
export default {
  name: "business-progress",
  components: {
    transferRecord, // 流转记录组件
    pagination // 分页组件
  },
  data() {
    return {
      // 查询信息
      searchInfo: {
        collaborateModeCode: "",
        orgName: "",
        applicationId: "",
        accountAllotId: "",
        cusName: "",
        subcompanyId: "",
        approveStatus: "",
        cusManager: "",
        arrivalDate: null,
        putputDate: null
      },
      collaborateModeCodes: [], // 担保机构
      subcompanyList: [], // 分公司
      approveStatuss: [], // 审批状态
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
      // 流转记录
      transferDialogVisible: false, // 流转记录的显示与隐藏
      multipleSelection: [], // 选择行
      // 按钮加载
      btnLoading: false
    };
  },
  created() {
    // 获取列表
    // this.refer(1);
    // 获取合作模式
    this.getCollaborate();
    // 获取分公司
    this.getOrganizations();
    // 获取审批状态
    this.getApproveStatus();
  },
  methods: {
    // 清空查询信息
    clearSearch() {
      this.$refs["searchInfo"].resetFields();
      this.searchInfo.arrivalDate = null;
      this.searchInfo.putputDate = null;
      // this.refer(1);
      this.tableData = [];
      this.pageConfig = {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      };
    },
    // 获取数据列表（flag存在，则代表进行点击查询操作）
    refer(pageNum) {
      // console.log(this.searchInfo);
      if (
        this.searchInfo.applicationId ||
        this.searchInfo.accountAllotId ||
        this.searchInfo.approveStatus ||
        this.searchInfo.arrivalDate ||
        this.searchInfo.cusManager ||
        this.searchInfo.cusName ||
        this.searchInfo.orgName ||
        this.searchInfo.putputDate ||
        this.searchInfo.subcompanyId ||
        this.searchInfo.collaborateModeCode
      ) {
        let para = {
          applicationId: this.searchInfo.applicationId,
          accountAllotId: this.searchInfo.accountAllotId,
          approveStatus: this.searchInfo.approveStatus,
          arrivalDate: this.searchInfo.arrivalDate,
          cusManager: this.searchInfo.cusManager,
          cusName: this.searchInfo.cusName,
          orgName: this.searchInfo.orgName,
          putputDate: this.searchInfo.putputDate,
          subcompanyId: this.searchInfo.subcompanyId,
          collaborateModeCode: this.searchInfo.collaborateModeCode,
          pageNum: pageNum,
          pageSize: this.pageConfig.pageSize
        };
        this.tableLoading = true;
        // console.log(para);
        this.$MyFetch
          .post(accountApi.bussiness_progress.queryBusinessProgressInfo, para)
          .then((data = {}) => {
            this.tableLoading = false;
            // console.log(data);
            this.pageConfig.account = data.total;
            this.pageConfig.currentPage = data.pageNum;
            this.tableData = data.list;
            if (data.list.length < 1) {
              this.$error("无查询到符合条件的数据");
            }
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
    // 打开流转记录组件
    openTransferRecord(row) {
      this.accountAllotId = row.accountAllotId;
      this.transferDialogVisible = true;
    },
    // 关闭流转记录组件
    close_2() {
      this.transferDialogVisible = false;
    },
    // 打开批量下载组件
    showImageDownload() {
      if (this.multipleSelection.length < 1) {
        this.$error("您还没有选中业务");
      } else {
        let path = window.browseFolder("path");
        // console.log(path);
        path = path.slice(0, path.length - 1);
        // console.log(path);
        let newPath = path.replace(new RegExp(/\\/g), "\\\\");
        // console.log(newPath);
        let applicationList = this.multipleSelection
          .map(item => item.applicationId)
          .toString();
        let names = this.multipleSelection
          .map(
            item =>
              item.productId +
              "_" +
              item.cusName +
              "_" +
              item.orgName +
              "_" +
              item.applicationId
          )
          .toString();
        // console.log(newPath);
        // console.log(applicationList);
        // console.log(names);
        let href = router.resolve({
          name: "imageDownload",
          query: {
            applicationList: applicationList,
            names: names,
            path: newPath
          }
        });
        // console.log(href);
        window.open(
          href.href,
          "_blank",
          "width=1200,height=800,left=200,top=100"
        );
      }
    },
    handleSelectionChange(val) {
      // console.log(val);
      this.multipleSelection = val; // 选中行
    },
    rowClick(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 导出报表
    exportReport() {
      let _that = this;
      let params = {
        applicationId: this.searchInfo.applicationId,
        approveStatus: this.searchInfo.approveStatus,
        arrivalDate: this.searchInfo.arrivalDate,
        cusManager: this.searchInfo.cusManager,
        cusName: this.searchInfo.cusName,
        orgName: this.searchInfo.orgName,
        putputDate: this.searchInfo.putputDate,
        subcompanyId: this.searchInfo.subcompanyId,
        collaborateModeCode: this.searchInfo.collaborateModeCode
      };
      this.btnLoading = true;
      this.$MyFetch
        .post(accountApi.bussiness_progress.exportBusinessInfo, params, "blob")
        .then((res = {}) => {
          // console.log(res);
          var card = res.filename.replace(/"/g, ""); // 正则去掉字符串中所多余的引号
          res.filename = card;
          // console.log(res);
          this.$download(res);
        })
        .catch(err => {
          _that.btnLoading = false;
          this.$error(err.message);
        });
    },
    // 担保确认涵
    printLG() {
      if (this.multipleSelection.length < 1) {
        this.$error("您还没有选中业务");
      } else {
        let flag = true;
        let arr = [];
        this.multipleSelection.map(item => {
          // 只能选择东营银行且放款通过的数据。
          if (
            item.orgName !== "东营银行" ||
            item.approveStatus !== "放款通过"
          ) {
            this.$error("所选记录不符合条件，无法打印担保确认函");
            flag = false;
          }
          if (arr.indexOf(item.collaborateModeCode) < 0) {
            arr.push(item.collaborateModeCode);
          }
        });
        if (arr.length > 1) {
          // 只能选择同一个合作模式的数据
          flag = false;
          this.$error("所选记录不符合条件，无法打印担保确认函");
        }
        // console.log(arr);
        if (flag) {
          let accountAllotIds = this.multipleSelection
            .map(item => item.accountAllotId)
            .toString(",");
          let href = router.resolve({
            name: "accountPrint",
            query: {
              accountAllotIds: accountAllotIds,
              collaborateModeCode: this.multipleSelection[0].collaborateModeCode
            }
          });
          window.open(
            href.href,
            "_blank",
            "width=680,height=960, toolbar =no, menubar=no, scrollbars=no, resizable=no, location=no, status=no, left=200,top=0"
          );
        }
      }
    },
    // 获取合作模式
    getCollaborate() {
      this.$getDictCode("collaborate_mode_code")
        .then(res => {
          this.collaborateModeCodes = res;
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
    // 获取审批状态
    getApproveStatus() {
      this.$MyFetch
        .get(accountApi.bussiness_progress.getAccountApproveStatus)
        .then((data = {}) => {
          // console.log(data);
          this.approveStatuss = data;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 格式化列表数据
    formatterCollMode(row) {
      // console.log(row);
      // console.log(this.collaborateModeCodes);
      for (var i = 0; i < this.collaborateModeCodes.length; i++) {
        if (
          row.collaborateModeCode &&
          row.collaborateModeCode === this.collaborateModeCodes[i].itemCode
        ) {
          return this.collaborateModeCodes[i].itemDesc;
        }
      }
    }
  }
};
</script>

<style lang="less">
</style>

<style lang="less" scoped>
.content.business-progress {
  background-color: #ffffff;
  // height: 100%;
  min-height: 100%;
  border-radius: 4px;
  background: #fff;
  box-shadow: 1px 2px 20px #ccc;
  padding: 0px 30px;
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
    // overflow: hidden;
    .serach_row {
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
  }
  //分页样式
  .pagination {
    margin-top: 20px;
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
    padding-bottom: 20px;
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
}
</style>
