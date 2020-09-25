<template>
  <div class="page-company">
    <el-button
      type="primary"
      class="button button__blue btn__add width100"
      icon="el-icon-plus"
      @click="add_alert()"
    >新增</el-button>
    <div class="tables">
    <el-table
      :default-sort="{prop: 'date', order: 'descending'}"
          :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
    >
      <el-table-column
        prop="noticeTitle"
        label="公告标题"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="noticeContent"
        label="公告内容"
        width="1200"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span
            class="cursor__pointer font__blue"
            @click="compile(scope.row)"
          >编辑</span>
          <span
            class="cursor__pointer font__blue del"
            @click="del_alert(scope.row)"
          >删除</span>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <pagination
      :page="pageConfig"
      class="pagination"
      @jump-page="jump"
    ></pagination>
    <newlyIncreased
      v-if="alert_"
      @clsoe_windowAlert='close_1'
      :refer="refer"
    />
    <compile
      v-if="alert_c"
      :refer="refer"
      :compile_data="compile_data"
      @clsoe_windowAlert_c='close_2'
    />
    <delRuleConfig
      v-if="alert_s"
      :refer="refer"
      :del="del"
      @clsoe_windowAlert_s='close_3'
    />
  </div>
</template>
<script type="text/ecmascript-6">
import pagination from "@components/pagination";
import delRuleConfig from "./delRuleConfig";
import { partnerApi } from "../../../js/server.js";
import newlyIncreased from "./newly-increased";
import compile from "./compile";
export default {
  data() {
    return {
      tableData: [], // 列表数据
      alert_: false, // 打开新增页面
      alert_c: false, // 打开编辑页面
      alert_s: false, // 打开删除页面
      compile_data: "", // 传给编辑页面数据
      del_data: "", // 传给删除页面数据
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
    compile,
    delRuleConfig
  },
  methods: {
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
      // this.defaultList(this.pageConfig.currentPage);
    },
    // 打开编辑页面
    compile(datab) {
      let url = `${partnerApi.notice}/${datab.id}`;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          this.compile_data = data;
          this.alert_c = true;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 删除数据
    del_alert(data) {
      this.del_data = data;
      this.alert_s = true;
    },
    // 删除接口
    del() {
      let url = `${partnerApi.notice}${this.del_data.id}`;
      this.$MyFetch
        .delete(url)
        .then((data = {}) => {
          this.confirmFn("删除成功", "success");
          this.refer(1);
          this.close_3();
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    add_alert() {
      this.alert_ = true;
    },
    close_1() {
      this.alert_ = false;
    },
    close_2() {
      this.alert_c = false;
    },
    close_3() {
      this.alert_s = false;
    },
    // 查询列表
    refer(pageNum) {
      let data = {
        orderBy: "",
        pageNum: pageNum, // 当前页
        pageSize: this.pageConfig.pageSize // 当前多少条数据
      };
      let url = partnerApi.notice;
      this.$MyFetch
        .get(url, data)
        .then((data = {}) => {
          console.log(data);
          this.tableData = data.list;
          this.pageConfig.account = data.total;
          this.pageConfig.currentPage = data.pageNum;
        })
        .catch(err => {
          this.$error(err.message);
        });
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
  min-height: 805px;
  .boxShadow(0, 0);
  padding: 20px 31px;
  .btn__add {
    /deep/ .el-icon-plus {
      line-height: 1.2;
      font-weight: 600;
    }
    // margin-bottom: 20px;
  }
  .pagination {
    position: absolute;
    bottom: 20px;
    right: 31px;
  }
    /deep/.el-table__body-wrapper {
      height: 603px;
      overflow-y: auto;
      .del {
        color: #f55f5f;
        margin-left: 20px;
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
.tables {
    overflow-y: auto;
    overflow-x: hidden;
    height: 653px;
    // width: 97%;
    margin: 0px auto;
    border: 1px solid #d0d0d0;
    margin-top: 21px;
    border-radius: 4px;
    margin-bottom: 20px;
    .pushObject {
      margin-left: 5px;
    }
  }
  /deep/ .cell {
    text-align: left;
    margin-left: 20px;
  }
</style>
