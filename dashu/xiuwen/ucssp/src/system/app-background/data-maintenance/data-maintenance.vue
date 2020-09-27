<template>
  <div class="page-company">
    <div class="data-box"><span class="maintenance">数据维护</span></div>
    <el-button
      type="primary"
      class="button button__blue btn__add width100"
      icon="el-icon-plus"
      @click="add_alert()"
    >新增</el-button>
    <div class="tables">
      <el-table
        :default-sort="{prop: 'date', order: 'descending'}"
        :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#F9FAFB'}"
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="defaultSelect" @select-all="all"
        @row-click="clickRow"
      >
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="产品"
        >
        </el-table-column>
        <el-table-column
          prop="operationGuideName"
          label="收还款操作指引"
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
    </div>
    <pagination
      :page="pageConfig"
      class="pagination"
      @jump-page="jump"
    ></pagination>
    <div class="butto">
      <el-button
        class="delete"
        type="warning"
        @click="remove"
      >删除</el-button>
    </div>
    <newlyIncreased
      :refer="refer"
      v-if="alert_"
      @clsoe_windowAlert='close_1'
    />
    <compile
      :refer="refer"
      :compile_data="compile_data"
      v-if="alert_b"
      @clsoe_windowAlert_b='close_3'
    />
    <deleted
      v-if="alert_c"
      :remove_data="remove_data"
      @clsoe_windowAlert_c='close_2'
    />
  </div>
</template>
<script type="text/ecmascript-6">
import { configApi } from "../js/server.js";
import pagination from "@components/pagination";
import newlyIncreased from "./newly-increased"; // 新增组件
import compile from "./compile"; // 编辑组件
import deleted from "./deleted";
export default {
  data() {
    return {
      tableData: [], // 列表数据
      alert_: false, // 打开新增页面
      alert_c: false, // 打开删除页面
      alert_b: false, // 打开编辑页面
      compile_data: "", // 传给编辑页的数据
      ids: [], // 删除数据id
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      } // 分页
    };
  },
  components: {
    pagination,
    newlyIncreased,
    deleted,
    compile
  },
  methods: {
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
      // this.defaultList(this.pageConfig.currentPage);
    },
    // 打开新增页面
    add_alert() {
      this.alert_ = true;
    },
    // 关闭新增页面
    close_1() {
      this.alert_ = false;
    },
    // 关闭删除页面
    close_2() {
      this.alert_c = false;
    },
    // 打开删除页面
    remove() {
      console.log(this.ids);
      if (this.ids.length !== 0) {
        this.alert_c = true;
      } else {
        this.confirmFn("请选择一条数据", "success");
      }
    },
    // 打开编辑页面
    compile(data) {
      this.compile_data = data;
      this.alert_b = true;
    },
    close_3() {
      this.alert_b = false;
    },
    // 查询数据
    refer(pageNum) {
      let data = {
        pageNum: pageNum, // 当前页
        pageSize: this.pageConfig.pageSize // 当前多少条数据
      };
      let url = configApi.repaymentOperationGuide_list;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.tableData = data.list;
          this.pageConfig.account = data.total;
          this.pageConfig.currentPage = data.pageNum;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 删除数据
    remove_data() {
      let idList = [];
      for (let i = 0; i < this.ids.length; i++) {
        idList.push(this.ids[i].id);
      }
      console.log(idList);
      let data = {
        idList: idList
      };
      let url = configApi.repaymentOperationGuide_remove;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          this.confirmFn("删除成功", "success");
          this.refer(1);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 多选
    defaultSelect(selection, row) {
      console.log(selection);
      this.ids = selection;
    },
    clickRow(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 全选
    all(selection) {
      this.ids = selection;
    }
  },
  mounted() {
    this.refer(1);
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.page-company {
  position: relative;
  min-height: 869px;
  .boxShadow(0, 0);
  padding: 0px 30px 20px 30px;
  .btn__add {
    /deep/ .el-icon-plus {
      line-height: 1.2;
      font-weight: 600;
    }
    margin-bottom: 20px;
  }
  .pagination {
    // position: absolute;
    bottom: 100px;
    right: 31px;
  }
  .common__table {
    /deep/.el-table__body-wrapper {
      max-height: 450px;
      overflow-y: auto;
    }
  }
  .data-box {
    height: 60px;
    border-bottom: 1px solid #e5e5e5;
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
  // 删除按钮样式
  .butto {
    width: 100%;
    text-align: center;
    margin-top: 20px;
    .delete {
      background: #eeb352;
      border-radius: 4px;
      width: 200px;
      height: 40px;
    }
  }
  .tables {
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 541px;
    // width: 97%;
    margin: 0px auto;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    margin-bottom: 20px;
    .pushObject {
      margin-left: 5px;
    }
  }
}
</style>
