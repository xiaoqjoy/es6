<template>
  <div class="import-message" >
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 头部 -->
      <div class="dialog-box__top">
        <h5 class="title bg__white">流转记录</h5>
        <span class="el-icon-close button button__close" @click="close_()"></span>
      </div>
      <!-- 主体部分 -->
      <div class="dialog-box__body" v-loading='tableLoading'>
        <el-table
        class="common__table"
        :data="tableData"
        header-cell-class-name="table-head"
        row-class-name="table-tr"
        style="width:883px;margin:10px auto 0px;"
        ref="transferData">
          <el-table-column prop="stageName" min-width="120" label="阶段名称"></el-table-column>
          <el-table-column prop="undertakeInstitution" min-width="140" label="承办机构"></el-table-column>
          <el-table-column prop="approveResult" min-width="130" label="选择动作"></el-table-column>
          <el-table-column prop="beginDate" min-width="160" label="任务到达时间"></el-table-column>
          <el-table-column prop="endDate" min-width="160" label="完成时间"></el-table-column>
        </el-table>
      </div>
      <!-- 分页组件 -->
      <!-- <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination> -->
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { accountApi } from "../../../account/js/server.js"; // 接口
// import pagination from "@components/pagination"; // 分页组件
export default {
  // 组件
  // components: {
  //   pagination // 分页组件
  // },
  data() {
    return {
      ruleForm: {},
      // 表格信息
      tableData: [],
      tableLoading: false,
      // 分页
      pageConfig: {
        account: 0, // 总条数
        pageSize: 6, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }
    };
  },
  props: ["accountAllotId"],
  created() {
    // 获取数据列表
    this.refer(1);
  },
  methods: {
    // 关闭弹窗
    close_() {
      this.$emit("clsoe_windowAlert2");
    },
    // 获取数据列表（flag存在，则代表进行点击查询操作）
    refer(pageNum) {
      let para = {
        accountAllotId: this.accountAllotId,
        pageNum: pageNum,
        pageSize: this.pageConfig.pageSize
      };
      this.tableLoading = true;
      this.$MyFetch
        .post(accountApi.bussiness_progress.queryHisBusinessProgress, para)
        .then((data = {}) => {
          this.tableLoading = false;
          // console.log(data);
          this.pageConfig.account = data.total;
          this.pageConfig.currentPage = data.pageNum;
          this.tableData = data;
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
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.import-message {
  .dialog-box {
    width: 946px;
    background-color: #FFFFFF;
    .el-form-item {
      margin-right: 0;
    }
    .dialog-box__body {
      overflow-y: auto;
      overflow-x: hidden;
      height: 628px;
    }
  }
}
//关闭按钮
.el-icon-close {
  position: absolute;
  font-size: 32px;
  top: 12px;
  right: 10px;
  cursor: pointer;
}
</style>
