<style lang="less" scoped>
  .dialog-wrap {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 100;
  }
  .dialog-box {
    width: 1200px;
  }
  .el-table {
    min-height: 500px;
  }
  .pagination {
    margin-top: 20px;
  }
</style>
<template>
  <div class="dialog-wrap">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title bg__white">流转记录</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="dialog-box__middle">
        <div class="table-box">
          <el-table
            v-loading="loading"
            :data="tableData"
            class="common__table"
            header-cell-class-name="table-head"
            row-class-name="table-tr">
            <el-table-column prop="phaseName" label="阶段名称"></el-table-column>
            <el-table-column prop="assignOrg" label="承办机构"></el-table-column>
            <el-table-column prop="startTime" label="任务获取时间"></el-table-column>
            <el-table-column prop="firstOperateTime" label="开始操作时间"></el-table-column>
            <el-table-column prop="endTime" label="提交时间"></el-table-column>
            <el-table-column prop="duration" label="当前阶段处理时间（秒）"></el-table-column>
          </el-table>
        </div>
        <pagination :page="pageConfig" class="pagination" @jump-page="getData"></pagination>
      </div>
    </div>
  </div>
</template>
<script>
import pagination from '@components/pagination';
import { businessApi } from '../js/server.js';
export default {
  props: {
    row: Object
  },
  data() {
    return {
      pageConfig: {
        account: 0,
        currentPage: 1,
        pageSize: 10,
        showJumpButton: true
      },
      loading: true,
      tableData: []
    };
  },
  components: {
    pagination
  },
  methods: {
    close() {
      this.$emit("close");
    },
    getData(pageNum = 1) {
      let form = {
        pageSize: 10,
        pageNum,
        applicationId: this.row.applicationId
      };
      this.$MyFetch.get(businessApi.getRecord, form)
      .then((data) => {
        this.loading = false;
        this.pageConfig.account = data.total || 1;
        this.pageConfig.currentPage = data.pageNum || 1;
        this.tableData = data.list;
      })
      .catch((e) => {
        this.$error(e.message);
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
