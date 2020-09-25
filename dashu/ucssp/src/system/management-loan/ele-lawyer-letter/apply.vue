<template>
  <div class="lawyer-letter-apply">
    <div class="data-box">
      <span class="maintenance">律师函申请</span>
      <span class="tip">(律师函为发送短信时实时生成，批量时可能耗时较长。)</span>
    </div>
    <el-table
      height="620"
      :data="tableData"
      class="common__table"
      header-cell-class-name="table-head"
      row-class-name="table-tr"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="putoutNo" label="出账编号"></el-table-column>
      <el-table-column prop="custName" label="发函对象"></el-table-column>
      <el-table-column prop="telphone" label="手机号码"></el-table-column>
      <el-table-column prop="address" label="联系地址"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="deleteItem(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="btn_wrap">
      <el-button type="success" class="btn b_button width200" @click="openUpload">批量导入</el-button>
      <el-button type="primary" class="btn b_button query width200" @click="sendConfirm">发送律师函短信</el-button>
    </div>
    <pagination :page="pageConfig" class="pagination" @jump-page="getTabData"></pagination>
    <upload
      :author="author"
      class="quota-configuration-dialog"
      v-if="uploadBox"
      @getNewData="getTabData(1)"
      @close="closeUpload"
    ></upload>
  </div>
</template>

<script>
import pagination from "@components/pagination";
import upload from "./upload/index";
import { lawyerApi } from "../js/server"; // 接口
import { userInfo } from '../../../common/js/localStorage';
export default {
  data() {
    return {
      author: "",
      isCharge: false,
      tableData: [],
      uploadBox: false,
      multipleSelection: [],
      pageConfig: {
        account: 0, // 总条数
        pageSize: 20, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }
    };
  },
  components: {
    pagination,
    upload
  },
  methods: {
    getTabData(pageNum) {
      this.pageConfig.currentPage = pageNum;
      let params = {
        sendflag: "0",
        author: this.isCharge ? "" : this.author, // 权限控制主管不传
        pageNum: this.pageConfig.currentPage,
        pageSize: this.pageConfig.pageSize
      };
      this.$MyFetch
        .post(lawyerApi.vaguelySearch, params)
        .then((res = {}) => {
          this.tableData = res.list;
          this.pageConfig.account = res.pages.rowNumers;
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteCallBack() {
      this.getTabData(this.pageConfig.currentPage);
    },
    deleteItem(row) {
      this.$confirm("是否删除当前记录", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        center: true,
        type: "warning"
      }).then(() => {
        this.$MyFetch
          .post(lawyerApi.delById, { id: row.id })
          .then((res = {}) => {
            this.$message({
              onClose: this.deleteCallBack(),
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(err => {
            this.$message.error(err.message);
          });
      });
    },
    closeUpload() {
      this.getTabData(1);
      this.uploadBox = false;
    },
    openUpload() {
      this.uploadBox = true;
    },
    sendCallBack() {
      this.loadingClose();
      this.getTabData(this.pageConfig.currentPage);
    },
    sendConfirm() {
      if (!this.multipleSelection.length) {
        return;
      }
      this.$confirm(
        "是否确认生成律师函并发送短信，律师函为实时生成，批量耗时较长。",
        "提示",
        {
          confirmButtonText: "是",
          cancelButtonText: "否",
          center: true
        }
      ).then(() => {
        this.sendCheck();
      });
    },
    sendCheck() {
      let ids = [];
      this.multipleSelection.map(item => {
        ids.push(item.id);
      });
      this.$MyFetch
        .post(lawyerApi.sendValidity, { ids: ids })
        .then((res = {}) => {
          let list1 = res.list1;
          let list2 = res.list2;
          let str1, str2;
          if (list1.length) {
            str1 = list1.map(item => {
              return item.putoutNo;
            });
            str1 = str1.join("，") + "有多条申请";
          }
          if (list2.length) {
            str2 = list2.map(item => {
              return item.putoutNo;
            });
            str2 = str2.join("，") + "本月已有发送记录";
          }
          if (str1 || str2) {
            const h = this.$createElement;
            this.$msgbox({
              title: '确认信息',
              message: h('p', null, [
                h('p', null, str1),
                h('p', null, str2)
              ]),
              showCancelButton: true,
              center: true,
              confirmButtonText: '仍然发送',
              cancelButtonText: '取消发送'
            }).then(() => {
              this.sendMsgList(ids);
            }).catch(action => {
              this.$message({
                type: "info",
                message: "已取消"
              });
            });
          } else {
            this.sendMsgList(ids);
          }
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    sendMsg(ids) {
      return new Promise(resolve => {
        this.$MyFetch
          .post(lawyerApi.sendlawyerlettersms, { ids: ids }, { timeout: 60000 })
          .then((res = {}) => {
            resolve(res);
          })
          .catch(err => {
            // this.$message.error(err.message);
            this.$alert(err.message, '提示', {
              confirmButtonText: '确定',
              center: true,
              callback: () => {
                this.sendCallBack();
              }
            });
          });
      });
    },
    async sendMsgList(ids) {
      this.loadingOpen();
      let failItems = [];
      let arr = this.splitData(ids); //  20页，每次分10次发送
      for (let i = 0; i < arr.length; i++) {
        let result = await this.sendMsg(arr[i]);
        if (result && result.list) {
          failItems.push(...result.list);
        }
      }
      if (failItems.length) {
        let str = failItems.join(", ");
        this.$alert(`出账编号${str}的申请律师函生成失败。`, '提示', {
          confirmButtonText: '确定',
          center: true,
          callback: () => {
            this.sendCallBack();
          }
        });
      } else {
        this.$message({
          onClose: this.sendCallBack(),
          type: "success",
          message: "发送成功!"
        });
      }
    },
    splitData(list) {
      var res = [];
      for (var i = 0, len = list.length; i < len; i += 10) {
        res.push(list.slice(i, i + 10));
      }
      return res;
    },
    loadingOpen() {
      this.loading = this.$loading({
        lock: true,
        text: '处理中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    loadingClose() {
      this.loading && this.loading.close();
    }
  },
  mounted() {
    let userData = JSON.parse(userInfo.getUserInfo());
    let role = userData ? userData.role : [];
    this.isCharge = role.some(v => {
      return v.roleId === 'ellesignature_0001';
    });
    this.author = userData.userId;
    this.getTabData(1);
  }
};
</script>
<style lang="less">
.lawyer-letter-apply {
  .boxShadow(0, 0);
  padding: 10px 31px;
  min-height: 820px;
  .el-dialog__header {
    box-shadow: 0 2px 6px 0 #d0d0d0;
  }
  .el-dialog__body {
    text-align: left;
  }
  .data-box {
    height: 60px;
    border-bottom: 1px solid #d0d0d0;
    margin-bottom: 20px;
    .maintenance {
      border-left: 2px solid #538bf1;
      padding-left: 5px;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #333333;
      line-height: 60px;
    }
    .tip {
      font-size: 14px;
    }
  }
  .clearfix.pagination {
    margin-top: 30px;
  }
  .btn_wrap {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
