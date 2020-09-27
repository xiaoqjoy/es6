<template>
  <div class="page-company">
    <!-- 输入框和下拉框 -->
    <div class="b_content">
      <el-input
        class="select_72"
        v-model="importFileName"
        placeholder="导入文件名"
        clearable
      ></el-input>
      <el-date-picker
        class="select_72"
        type="datetime"
        placeholder="开始导入时间"
        v-model="importStartDate"
        value-format="yyyy-MM-dd HH:mm:ss"
      ></el-date-picker>
      <el-date-picker
        class="select_72"
        type="datetime"
        placeholder="结束导入时间"
        v-model="importEndDate"
        value-format="yyyy-MM-dd HH:mm:ss"
      ></el-date-picker>
      <el-select
        class="select_72"
        v-model="status"
        placeholder="导入状态"
        filterable
        clearable
      >
        <el-option
          v-for="item in import_status"
          :key="item.value"
          :label="item.show"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        class="b_button query"
        @click="refer_f(1)"
      >查询</el-button>
      <el-button
        class="b_button empty"
        @click="empty()"
      >清空</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      class="common__table"
      header-cell-class-name="table-head"
      row-class-name="table-tr"
      style="width: 100%"
    >
      <el-table-column
        prop="impBatchNo"
        label="文件名"
      >
      </el-table-column>
      <el-table-column
        prop="userType"
        label="用户角色"
      >
      </el-table-column>
      <el-table-column
        prop="srcChannel"
        label="所属公司"
      >
      </el-table-column>
      <el-table-column
        prop="mobileNo"
        label="手机号码"
      >
      </el-table-column>
      <el-table-column
        prop="srcUmNo"
        label="所属客户经理"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        label="导入状态"
      >
      </el-table-column>
      <el-table-column
        prop="importMsg"
        label="失败原因"
      >
      </el-table-column>
      <el-table-column
        prop="importDate"
        label="导入时间"
      >
      </el-table-column>
    </el-table>
    <pagination
      :page="pageConfig"
      class="pagination"
      @jump-page="jump"
    ></pagination>
    <div class="text__center">
      <el-button
        class="t_button dead_t"
        @click="theImport"
      >导入</el-button>
    </div>
    <theImport
      v-if="alert"
      :refer="refer"
      @clsoe_windowAlert='close'
    />
  </div>
</template>
<script type="text/ecmascript-6">
import pagination from "@components/pagination";
import theImport from "../theImport"; // 调整组件
import { partnerApi } from "../../../js/server.js";
export default {
  data() {
    return {
      importFileName: "", // 导入文件名
      importStartDate: "", // 导入开始时间
      importEndDate: "", // 导入结束时间
      status: "", // 导入状态
      tableData: [],
      alert: false, // 默认关闭调整页面
      alert_t: false, // 默认关闭恢复页面
      compile_data: "", // 传入调整页的数据
      edit_data: "", // 删除的数据
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      import_status: [] //
    };
  },
  components: {
    pagination,
    theImport
  },
  methods: {
    // 清空查询条件
    empty() {
      this.importFileName = ""; // 导入文件名
      this.importStartDate = null; // 导入开始时间
      this.importEndDate = null; // 导入结束时间
      this.status = ""; // 导入状态
    },
    // 调整关闭
    close() {
      this.alert = false;
    },
    select_user() {
      let url = partnerApi.initDataDict;
      this.$MyFetch
        .post(url)
        .then((data = {}) => {
          console.log(data);
          this.import_status = data.dict.select_import_user_status_type;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 上传开启
    theImport() {
      this.alert = true;
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
      // this.defaultList(this.pageConfig.currentPage);
    },
    refer_f(pageNum) {
      console.log(111);
      if (
        this.importFileName !== "" || // 导入文件名
        this.importStartDate !== null || // 导入开始时间
        this.importEndDate !== null || // 导入结束时间
        this.status !== "" // 导入状态
      ) {
        if (this.importStartDate === null || this.importEndDate === null) {
          this.refer(pageNum);
        } else if (this.importStartDate <= this.importEndDate) {
          this.refer(pageNum);
        } else {
          this.$message({
            message: "查询失败,请输入正确的查询区间",
            type: "warning"
          });
        }
      } else {
        this.$error("请输入查询条件");
      }
    },
    // 查询列表
    refer(pageNum) {
        let data = {
          importFileName: this.importFileName, // 导入文件名
          importStartDate: this.importStartDate, // 导入开始时间
          importEndDate: this.importEndDate, // 导入结束时间
          status: this.status, // 导入状态
          pageNum: pageNum, // 当前页
          pageSize: this.pageConfig.pageSize // 当前多少条数据
        };
        console.log(data);
        let url = partnerApi.userImportRef_getPager;
        this.$MyFetch
          .post(url, data)
          .then((data = {}) => {
            console.log(data);
            this.tableData = data.userImportBeanPage.list;
            for (let index = 0; index < this.tableData.length; index++) {
              this.tableData[index].status = this.import_status[this.import_status.findIndex(i => i.value === this.tableData[index].status)].show;
            }
            this.pageConfig.account = data.userImportBeanPage.total;
            this.pageConfig.currentPage = data.userImportBeanPage.pageNum;
          })
          .catch(err => {
            this.$error(err.message);
          });
    }
  },
  mounted() {
    this.select_user();
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
    margin-top: 20px;
  }
  .common__table {
    /deep/.el-table__body-wrapper {
      height: 500px;
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
  .b_content {
    text-align: left;
    height: 60px;
    // 输入框和下拉框172*40
    .select_72 {
      width: 172px;
      height: 40px;
      margin-right: 15px;
    }
    // 查询和清空的公有样式
    .b_button {
      width: 100px;
      height: 40px;
      border-radius: 4px;
      font-size: 14px;
    }
    // 查询单独样式
    .query {
      background: #538bf1;
      color: #ffffff;
      border: 1px solid #538bf1;
    }
    // 清空单独样式
    .empty {
      background: #ffffff;
      color: #538bf1;
      border: 1px solid #538bf1;
    }
  }
  .text__center {
    margin-top: 40px;
    .t_button {
      width: 200px;
      height: 40px;
      background: #538bf1;
    }
    .dead_t {
      border: 1px solid #538bf1;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 1.07px;
      text-align: center;
    }
  }
}
</style>
