<template>
  <div class="page-company">
    <el-button
      type="primary"
      class="button button__blue btn__add width100"
      icon="el-icon-plus"
      @click="add_alert()"
    >新增</el-button>
    <el-table
      :data="tableData"
      class="common__table"
      header-cell-class-name="table-head"
      row-class-name="table-tr"
      style="width: 100%"
    >
      <el-table-column
        prop="messageType"
        label="ID"
      >
      </el-table-column>
      <el-table-column
        prop="messageContent"
        label="角色名称"
      >
      </el-table-column>
      <el-table-column
        prop="pushObject"
        label="角色描述"
      >
      </el-table-column>
      <el-table-column
        prop="messageState"
        label="状态"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span
            class="cursor__pointer font__blue"
            @click="compile(scope.row)"
          >编辑</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :page="pageConfig"
      class="pagination"
      @jump-page="jump"
    ></pagination>
  </div>
</template>
<script type="text/ecmascript-6">
import pagination from "@components/pagination";
export default {
  data() {
    return {
      tableData: [], // 列表数据
      alert_: false, // 打开新增页面
      alert_c: false, // 打开编辑页面
      compile_data: "", // 传给编辑页面数据
      role: [], // 消息类型下拉内容
      contact_num: [], // 推送对象下拉内容
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  components: {
    pagination
  },
  methods: {
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
      // this.defaultList(this.pageConfig.currentPage);
    },
    // 打开编辑页面
    compile(data) {
      console.log(data);
      this.compile_data = data;
      this.alert_c = true;
    },
    add_alert() {
      this.alert_ = true;
    },
    close_1() {
      this.alert_ = false;
    },
    close_2() {
      this.alert_c = false;
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.page-company {
  position: relative;
  min-height: 820px;
  .boxShadow(0, 0);
  padding: 20px 31px;
  .btn__add {
    /deep/ .el-icon-plus {
      line-height: 1.2;
      font-weight: 600;
    }
    margin-bottom: 20px;
  }
  .pagination {
    position: absolute;
    bottom: 20px;
    right: 31px;
  }
  .common__table {
    /deep/.el-table__body-wrapper {
      max-height: 550px;
      overflow-y: auto;
    }
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
  }
}
</style>
