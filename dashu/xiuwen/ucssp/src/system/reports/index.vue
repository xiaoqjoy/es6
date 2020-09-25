<style lang="less" scoped>
  .pagination {
    margin-top: 20px;
  }
  .el-button--primary {
    background: #538bf1;
    border-color: #538bf1;
  }
  .el-input, .el-select {
    width: 250px;
  }
  .date-group .el-input {
    width: 118px;
    /deep/ .el-input__inner {
      padding-left: 12px;
    }
  }
  .el-date-editor.el-input__inner {
    width: 250px;
    /deep/ .el-range-separator {
      width: 10%;
    }
  }
  .el-form-item {
    /deep/ .el-form-item__label {
      width: 88px;
      text-align: right;
    }
    /deep/ .el-form-item__content {
      vertical-align: middle;
    }
  }
  .el-card {
    overflow: visible;
  }
</style>
<template>
  <div class="container">
    <el-form
      :inline="true"
      class="demo-form-inline">
      <el-form-item :label="item.name" v-for="(item, index) in formItems" :key="index">
        <template v-if="item.type.toUpperCase() === 'DATE'">
          <el-date-picker
            v-if="item.operator.toUpperCase() === 'EQ'"
            type="date"
            value-format="yyyy-MM-dd"
            v-model="form[item.code]"></el-date-picker>
          <template v-else>
            <div class="date-group">
              <el-date-picker
                placeholder="起始时间"
                type="date"
                value-format="yyyy-MM-dd"
                v-model="form[item.code][0]"></el-date-picker>
                -
              <el-date-picker
                placeholder="终止时间"
                type="date"
                value-format="yyyy-MM-dd"
                v-model="form[item.code][1]"></el-date-picker>
            </div>
          </template>
        </template>
        <template v-else-if="item.type.toUpperCase() === 'SELECT'">
          <template v-if="item.operator.toUpperCase() === 'BETWEEN'">
            <el-select filterable clearable v-model="form[item.code][0]">
              <el-option
                v-for="_item in options[item.code]"
                :key="_item.itemCode"
                :label="_item.itemDesc"
                :value="_item.itemCode"
              ></el-option>
            </el-select>
            -
            <el-select filterable clearable v-model="form[item.code][1]">
              <el-option
                v-for="_item in options[item.code]"
                :key="_item.itemCode"
                :label="_item.itemDesc"
                :value="_item.itemCode"
              ></el-option>
            </el-select>
          </template>
          <template v-else>
            <el-select filterable clearable v-model="form[item.code]">
              <el-option
                v-for="_item in options[item.code]"
                :key="_item.itemCode"
                :label="_item.itemDesc"
                :value="_item.itemCode"
              ></el-option>
            </el-select>
          </template>
        </template>
        <template v-else>
          <template v-if="item.operator === 'BETWEEN'">
            <el-input v-model="form[item.code][0]"></el-input>
            -
            <el-input v-model="form[item.code][1]"></el-input>
          </template>
          <template v-else>
            <el-input v-model="form[item.code]"></el-input>
          </template>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="queryLoading" @click="query">查询</el-button>
        <el-button type="primary" :loading="exportLoading" :disabled="exportDisabled" @click="exportData">导出</el-button>
      </el-form-item>
    </el-form>
    <el-card v-if="name">
      <div slot="header">
        <span>{{name}}</span>
      </div>
      <el-table :data="tableData">
        <el-table-column :prop="head.code" :label="head.name" v-for="(head, index) in headers" :key="index" :width="head.width"></el-table-column>
      </el-table>
      <pagination :page="pageConfig" class="pagination" @jump-page="getData"></pagination>
    </el-card>
  </div>
</template>
<script>
import { reportsApi } from "./js/server";
import pagination from '@components/pagination';
// import FileSaver from "file-saver";
export default {
  watch: {
    "$route": {
      handler: function() {
        this.reportCode = this.$route.params.reportCode;
        this.reset();
        this.getConfig();
      },
      immediate: true
    }
  },
  computed: {
    exportDisabled() {
      return this.tableData.length === 0;
    }
  },
  data() {
    return {
      pageConfig: {
        account: 0,
        currentPage: 1,
        pageSize: 20,
        showJumpButton: true
      },
      reportCode: '',
      form: {},
      formItems: [],
      name: '',
      tableData: [],
      headers: [],
      options: {},
      queryLoading: false,
      exportLoading: false
    };
  },
  components: {
    pagination
  },
  methods: {
    reset() {
      this.form = {};
      this.formItems = [];
      this.name = "";
      this.tableData = [];
      this.headers = [];
    },
    getConfig() {
      this.$MyFetch.get(reportsApi.query.replace("{reportCode}", this.reportCode))
      .then((data) => {
        if (data && data.length > 0) {
          data.forEach((item) => {
            if (item.operator !== "EQ") {
              this.$set(this.form, item.code, []);
            }
            if (item.type.toUpperCase() === "SELECT") {
              this.getOptions(item.code);
            }
          });
        }
        this.formItems = data;
      })
      .catch((e) => {
        this.$error(e.message);
      });
    },
    getOptions(code) {
      this.$MyFetch.get(reportsApi.select.replace("{categoryCode}", code))
      .then((data) => {
        this.$set(this.options, code, data);
      })
      .catch((e) => {
        this.$error(e.message);
      });
    },
    getOperator(key) {
      for (let i = 0; i < this.formItems.length; i++) {
        if (this.formItems[i].code === key) {
          return this.formItems[i].operator;
        }
      }
    },
    makeFormArr() {
      let form = Object.assign({}, this.form);
      let formArr = [];
      for (let key in form) {
        if (form[key].length > 0) {
          let code = key;
          let operator = "EQ";
          let value = form[key];
          operator = this.getOperator(key);
          if (operator !== "BETWEEN") {
            value = [form[key]];
          } else {
            let start = form[key][0];
            let end = form[key][1];
            if (start && end) {
              start += " 00:00:00";
              end += " 23:59:59";
            }
            if (!start && end) {
              start = '';
              end += " 23:59:59";
            }
            if (!end && start) {
              end = '';
              start += " 00:00:00";
            }
            value = [start, end];
            if (!start && !end) {
              value = [];
            }
          }
          formArr.push({
            code,
            operator,
            value
          });
        }
      }
      return formArr;
    },
    getData(pageNum = 1) {
      this.queryLoading = true;
      let formArr = this.makeFormArr();
      this.$MyFetch.post(`${reportsApi.reports}?pageNum=${pageNum}&pageSize=${this.pageConfig.pageSize}`.replace("{reportCode}", this.reportCode), formArr)
      .then((data = {}) => {
        if (data) {
          this.pageConfig.account = data.body.total || 0;
          this.pageConfig.currentPage = data.body.pageNum || 0;
          this.name = data.name;
          data.titles.unshift({
            code: 'index',
            width: 50,
            name: '序号'
          });
          let codeArr = ["application_id", "loan_no", "apply_no", "serial_no", "deduct_result", "out_serial_no", "dsf_to_Bank_id"];
          data.titles.forEach((title) => {
            if (codeArr.includes(title.code)) {
              title.width = 200;
            }
          });
          this.headers = data.titles;
          data.body.list.forEach((list, index) => {
            list.index = index + 1;
          });
          this.tableData = data.body.list;
        }
        this.queryLoading = false;
      })
      .catch((e) => {
        this.queryLoading = false;
        this.$error(e.message);
      });
    },
    query() {
      let formArr = this.makeFormArr();
      if (!formArr || formArr.length === 0) {
        this.confirmFn("请至少输入一个查询条件");
        return;
      }
      this.getData();
    },
    exportData() {
      let loading = this.$loading({
        text: "",
        spinner: "",
        background: "transparent"
      });
      this.$MyFetch.post(reportsApi.export.replace("{reportCode}", this.reportCode), this.makeFormArr(), "blob")
      .then((res) => {
        this.$download(res);
        loading.close();
      })
      .catch(err => {
        this.$error(err.message);
        loading.close();
      });
    }
  }
};
</script>
