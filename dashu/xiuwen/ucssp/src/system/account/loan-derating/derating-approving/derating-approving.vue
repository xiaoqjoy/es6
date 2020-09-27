<template>
  <div class="derating-approving">
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
        ref="tableData"
        >
          <el-table-column prop="orgName" min-width="120" label="合作机构"></el-table-column>
          <el-table-column prop="applicationId" min-width="160" label="申请编号"></el-table-column>
          <el-table-column prop="accountAllotId" min-width="160" label="出账编号"></el-table-column>
          <el-table-column prop="custName" min-width="98" label="客户姓名"></el-table-column>
          <el-table-column prop="certificateNum" min-width="180" label="身份证号">
            <template slot-scope="scope">
              <span>{{scope.row.certificateNum.slice(0,4)}}*********{{scope.row.certificateNum.slice(14)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="primaryProductName" min-width="100" label="一级产品"></el-table-column>
          <el-table-column prop="approveAmt" min-width="100" label="审批金额"></el-table-column>
          <el-table-column prop="reductionAmt" min-width="100" label="降额后金额"></el-table-column>
          <el-table-column prop="loanTerm" min-width="60" label="期限"></el-table-column>
          <el-table-column prop="custManager" min-width="98" label="客户经理"></el-table-column>
          <el-table-column label="操作" width="180" fixed='right'>
              <template slot-scope="slot">
                <el-button type="text" @click="showDialog(slot.row, slot.$index)">处理</el-button>
                <el-button type="text" @click="dataUpload(slot.row, slot.$index)">资料上传</el-button>
                <el-button type="text" @click="submitRepeal(slot.row, slot.$index)">提交</el-button>
              </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页组件 -->
      <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
      <!-- 资料上传 -->
      <introductionList v-if="uploadDialogVisible" :tableData='currentRow' @getFileId='getFileId' :title='title' :multiple='multiple' :accept="accept" @clsoe_upload_s='close_import' />
      <!-- 处理 -->
      <reductionApprove v-if="reductionDialogVisible" @changeApproveAmt='changeApproveAmt' :tableData='currentRow' :indexs='currentIndex' @clsoe_reductionApprove_s='close_reductionApprove'></reductionApprove>
      <!-- 校验复核人权限 -->
      <!-- <checkPermission v-if="checkDialogVisible" :tableData='currentRow' @clsoe_windowImport_s='clsoe_check_permission'></checkPermission> -->
      <!-- 底部按钮 -->
      <!-- <div class="delete_submit">
        <div>
          <el-button class="t_button export_t button" @click="submitRepeal">提交</el-button>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import "@common/css/dialog";
import { accountApi } from "../../../account/js/server.js"; // 接口
import introductionList from "../introductionList"; // 上传组件
import reductionApprove from "../reduction-approve"; // 处理组件
// import checkPermission from "../check-permission"; // 校验复核人权限组件
import pagination from "@components/pagination"; // 分页组件
export default {
  name: "derating-approving",
  components: {
    introductionList, // 上传组件
    reductionApprove, // 处理组件
    // checkPermission, // 校验复核人权限组件
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
      },
      reductionDialogVisible: false, // 处理组件的显示与隐藏
      multipleSelection: [],
      currentRow: null,
      currentIndex: "",
      // 资料上传
      uploadDialogVisible: false,
      checkDialogVisible: false, // 校验复核人权限组件的显示与隐藏
      title: "资料上传",
      accept: ["JPG", "PDF", "ZIP", "7Z", "PNG"],
      multiple: true // 上传组件是否可以多选
    };
  },
  created() {
    // 获取列表
    // this.refer(1);
  },
  methods: {
    // 获取数据列表（flag存在，则代表进行点击查询操作）
    refer(pageNum) {
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
          .post(accountApi.loan_derating.queryWaiteReductionInfo, para)
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
    },
    // 打开处理组件
    showDialog(row, index) {
      this.currentRow = Object.assign({}, row);
      this.currentIndex = index;
      // console.log(index);
      this.reductionDialogVisible = true;
    },
    changeApproveAmt(val) {
      // console.log(val);
      this.tableData[val.key].reductionAmt = val.value;
      this.$message({
        message: "处理成功",
        type: "success"
      });
    },
    // 关闭处理组件
    close_reductionApprove() {
      this.reductionDialogVisible = false;
    },
    // 资料上传
    dataUpload(row, index) {
      this.currentRow = Object.assign({}, row);
      this.uploadDialogVisible = true;
    },
    // 关闭资料上传
    close_import() {
      this.uploadDialogVisible = false;
    },
    // 保存fileId
    getFileId(val) {
      // console.log(val);
      let para = {
        accountAllotId: val.accountAllotId,
        applicationId: val.applicationId,
        fileIds: val.fileId.split(","),
        uploadMethod: "ar1"
      };
      // console.log(para);
      this.$MyFetch
        .post(accountApi.getFileToImage, para)
        .then((data = {}) => {
          // console.log(data);
          if (data === "success") {
            this.$message({
              message: "上传成功",
              type: "success"
            });
          } else {
            this.$error("上传失败");
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
      // this.$message({
      //   message: "上传成功",
      //   type: "success"
      // });
    },
    // 提交
    /***
     *     submitRepeal() {
      if (this.multipleSelection.length === 0) {
        this.confirmFn("您还没有选中放款交易", "error");
      } else if (this.multipleSelection.length > 1) {
        this.confirmFn("仅支持单笔业务操作", "error");
      } else {
        if (!this.multipleSelection[0].reductionAmt) {
          this.confirmFn("降额金额不能为空", "error");
        } else {
          this.checkDialogVisible = true;
        }
      }
    },
     */
    // 提交
    submitRepeal(row) {
      this.confirmFn(`确认降额处理吗？`, "warning")
      .then(() => {
        // let userId = this.formData.checkUserId;
        // let password = this.formData.checkByPwd;
        // console.log(userId.toUpperCase());
        // console.log(password);
        // let checkByPwd = hex_sha1(userId.toUpperCase() + password);
        let para = {
          accountId: row.accountAllotId,
          applicationId: row.applicationId,
          checkByPwd: "",
          checkUserId: "",
          reductionAmt: row.reductionAmt
        };
        // console.log(para);
        this.tableLoading = true;
        this.$MyFetch
          .post(accountApi.loan_derating.putoutReductionCommit, para)
          .then((data = {}) => {
            let msg = "";
            if (data) {
              msg = data;
            } else {
              msg = "降额成功";
            }
            this.$message({
              message: msg,
              type: "success"
            });
            this.tableLoading = false;
            // this.$parent.refer(1);
          })
          .catch(err => {
            // console.log(err);
            this.tableLoading = false;
            this.confirmFn(err.message, "error");
          });
      })
      .catch(() => {
        this.confirmFn("取消降额", "success");
      });
      // if (row.reductionAmt) {
      //   this.currentRow = Object.assign({}, row);
      //   this.checkDialogVisible = true;
      // } else {
      //   this.confirmFn("降额金额不能为空");
      // }
    },
    clsoe_check_permission() {
      this.checkDialogVisible = false;
    }
  }
};
</script>

<style lang="less">
.derating-approving {
  .dialog {
    .el-dialog {
      height: 245px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      margin: 0 !important;
      .el-form-item {
        .el-form-item__content {
          height: 40px;
          line-height: 40px;
        }
      }
    }
  }
}
</style>

<style lang="less" scoped>
.derating-approving {
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
