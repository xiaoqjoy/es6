<template>
  <div class="page-company">
    <!-- 输入框和下拉框 -->
    <div class="b_content">
      <!-- <el-input
        class="select_72"
        v-model="company"
        placeholder="请输入内容"
      ></el-input> -->
      <el-select
        class="select_72"
        v-model="organizationId"
        placeholder="进件分公司"
        filterable
        clearable
      >
        <el-option
          v-for="item in filiale_data"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select
        class="select_72"
        v-model="serviceId"
        placeholder="个贷服务中心"
        filterable
        clearable
      >
        <el-option
          v-for="item in pricing_lock"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        class="b_button query"
        @click="refer(1)"
      >查询</el-button>
      <el-button
        class="b_button empty"
        @click="empty()"
      >清空</el-button>
    </div>
    <!-- 表格 -->
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
        prop="organizationName"
        label="进件分公司"
      >
      </el-table-column>
      <el-table-column
        prop="serviceName"
        label="档案归属个贷服务中心"
      >
      </el-table-column>
      <el-table-column
        prop="archivesServiceName"
        label="调整后档案归属个贷服务中心"
      >
        <!-- <template slot-scope="scope">
          <span>{{(scope.row.statusCode === 'U') ? '停用':'正常'}}</span>
        </template> -->
      </el-table-column>
      <el-table-column
        prop="effectiveDate"
        label="调整生效时间"
      >
      </el-table-column>
      <el-table-column
        prop="createdBy"
        label="操作人"
      >
      </el-table-column>
      <el-table-column
        prop="createDate"
        label="操作时间"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="compile_alert(scope.row)"
          >调整</el-button>
          <el-button
            type="text"
            size="small"
            @click="edit_alert(scope.row)"
          >恢复</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <pagination
      :page="pageConfig"
      class="pagination"
      @jump-page="jump"
    ></pagination>
    <adjust
      v-if="alert"
      :refer="refer"
      :compile_data="compile_data"
      @clsoe_windowAlert='close'
    />
    <recover
      v-if="alert_t"
      :recover="recover"
      :compile_data="compile_data"
      @clsoe_windowAlert_t='close_t'
    />
  </div>
</template>
<script type="text/ecmascript-6">
import pagination from "@components/pagination";
import adjust from "./adjust"; // 调整组件
import { loanApi } from "../js/server.js";
import recover from "./recover";
// import deleted from "./deleted";
// import compile from "./compile";
export default {
  data() {
    return {
      organizationId: "", // 分公司Id
      serviceId: "", // 个贷处理中心Id
      tableData: [],
      alert: false, // 默认关闭调整页面
      alert_t: false, // 默认关闭恢复页面
      compile_data: "", // 传入调整页的数据
      edit_data: "", // 删除的数据
      // recover_id: "", // 恢复数据id
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      }, // 分页
      pricing_lock: [], // 个贷处理中心下拉框数据
      filiale_data: [] // 分公司下拉框数据
    };
  },
  components: {
    pagination,
    adjust,
    recover
  },
  methods: {
    // 清空查询条件
    empty() {
      this.organizationId = ""; // 分公司Id
      this.serviceId = ""; // 个贷处理中心Id
      this.refer(1);
    },
    // 分公司下拉框
    filiale(id) {
      let data = {
        serviceId: id || ""
      };
      let url = loanApi.archives_org;
      console.log(data);
      this.$MyFetch
        .get(url, data)
        .then((data = {}) => {
          console.log(data);
          if (data !== null) {
            data.forEach(i => {
              this.filiale_data.push({
                value: i.organizationId,
                label: i.organizationName
              });
            });
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 个贷服务中心下拉框
    pricing(id) {
      let data = {
        orgId: id || ""
      };
      let url = loanApi.archives_service;
      this.$MyFetch
        .get(url, data)
        .then((data = {}) => {
          if (data !== null) {
            data.forEach(i => {
              this.pricing_lock.push({
                value: i.serviceId,
                label: i.serviceName
              });
            });
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 调整关闭
    close() {
      this.alert = false;
    },
    // 恢复关闭
    close_t() {
      this.alert_t = false;
    },
    // 恢复开启
    edit_alert(data) {
      // console.log(data);
      this.compile_data = data;
      // this.recover_id = data.id;
      this.alert_t = true;
    },
    // 调整开启
    compile_alert(data) {
      this.compile_data = data;
      console.log(this.compile_data);
      this.alert = true;
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
      // this.defaultList(this.pageConfig.currentPage);
    },
    // 恢复接口
    recover(id) {
      console.log(id);
      if (id !== null) {
        let url = `${loanApi.archives_config_restore}/${id}`;
        this.$MyFetch
          .delete(url)
          .then((data = {}) => {
            console.log(data);
            this.alert_t = false;
            this.refer(1);
          })
          .catch(err => {
            this.$error(err.message);
          });
      } else {
        this.alert_t = false;
      }
    },
    // 查询列表
    refer(pageNum) {
      let data = {
        pagination: {
          pageNum: pageNum, // 当前页
          pageSize: this.pageConfig.pageSize // 当前多少条数据
        },
        organizationId: this.organizationId, // 分公司Id
        serviceId: this.serviceId // 个贷处理中心Id
      };
      console.log(data);
      let url = loanApi.archives_configs;
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
    }
  },
  mounted() {
    this.refer(1);
    this.filiale();
    this.pricing();
  },
  watch: {
    // 监控分公司下拉框变化更改个贷处理中心数据
    organizationId: {
      handler() {
        this.pricing_lock = [];
        // console.log(this.field_numbers[this.form.certificate_type_code].label);
        this.pricing(this.organizationId);
      }
    },
    // 监控个贷处理中心下拉框变化更改分公司数据
    "serviceId": {
      handler() {
        this.filiale_data = [];
        this.filiale(this.serviceId);
      }
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.page-company {
  position: relative;
  min-height: 800px;
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
    // position: absolute;
    // : 20px;
    margin: 30px 0 0 0;
    // right: 31px;
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
}
.tables {
    overflow-y: auto;
    overflow-x: hidden;
    min-height: 600px;
    // width: 97%;
    margin: 0px auto;
    border: 1px solid #d0d0d0;
    // margin-top: 21px;
    border-radius: 4px;
    .editor {
      font-size: 14px;
      color: #4a90e2;
      letter-spacing: 0;
    }
    .delete {
      font-size: 14px;
      color: #f55f5f;
      letter-spacing: 0;
      margin-left: 20px;
    }
  }
</style>
