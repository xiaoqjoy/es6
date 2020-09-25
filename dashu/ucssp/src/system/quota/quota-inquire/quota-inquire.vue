<template>
  <div class="contain">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item>
        <el-select clearable v-model="form.branchName" filterable placeholder="分公司">
          <el-option
            v-for="(item, index) in branch"
            :key="index"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="quotaMonth">
        <el-date-picker
          v-model="form.quotaMonth"
          type="month"
          value-format="yyyy-MM"
          placeholder="额度月份">
        </el-date-picker>
      </el-form-item>
      <el-button type="primary" @click="search" class="add check">查询</el-button>
      <el-button type="primary" @click="clear" class="add check clear">清空</el-button>
    </el-form>
    <el-table
    :data="tableData"
    style="width: 100%">
      <el-table-column
        prop="quotaMonth"
        label="额度月份">
      </el-table-column>
      <el-table-column
        prop="branchName"
        label="分公司">
      </el-table-column>
      <el-table-column
        prop="groupFinal"
        width="200"
        label="组合">
        <template slot-scope="scope">
          <el-tooltip effect="dark" :content="scope.row.groupFinal" placement="top">
            <div class="ellipsis">
              {{scope.row.groupFinal}}
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="limitQuota"
        label="总额度">
      </el-table-column>
      <el-table-column
        prop="grantQuota"
        label="发放额">
      </el-table-column>
      <el-table-column
        prop="result"
        label="可用额度">
      </el-table-column>
    </el-table>
    <pagination @jump-page='changePage' :page='pageConfig' class="pagination"></pagination>
  </div>
</template>

<script type="text/ecmascript-6">
import {quotaApi} from '../js/server.js';
import pagination from "@components/pagination"; // 分页条

export default {
  data() {
    return {
      branch: [],
      type: "",
      pageConfig: {
        account: 0,
        pageSize: 10,
        currentPage: 1,
        showJumpButton: true
      },
      tableData: [{}],
      form: {
        quotaMonth: '',
        branchName: ''
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  components: {
    pagination
  },
  methods: {
    clear () {
      this.form = {
        quotaMonth: '',
        branchName: ''
      };
    },
    changePage (page) {
      this.pageConfig.currentPage = page;
      this.getData(page, this.pageConfig.pageSize);
    },
    search () {
      this.pageConfig.currentPage = 1;
      this.pageConfig.pageSize = 10;
      this.getData(1, 10);
    },
    getData (page, pageSize) {
      let data = {
        pagination: {
          pageNum: page,
          pageSize: pageSize
        },
        ...this.form
      };
      this.$MyFetch.post(quotaApi.CompanyList, data)
      .then((data = {}) => {
        this.tableData = data.list;
        for (var i = 0; i < data.list.length; i++) {
          this.tableData[i].groupFinal = (data.list[i].corpName) ? data.list[i].corpName + '+' : "";
          this.tableData[i].groupFinal += (data.list[i].businessName) ? data.list[i].businessName + '+' : "";
          this.tableData[i].groupFinal += (data.list[i].productTypeName) ? data.list[i].productTypeName : "";
          this.tableData[i].groupFinal += (data.list[i].fundName) ? "+" + data.list[i].fundName : "";
          this.tableData[i].limitQuota = (data.list[i].isLimit === 0) ? "不限额" : this.tableData[i].limitQuota;
          this.tableData[i].result = (data.list[i].isLimit === 0) ? "不限额" : (data.list[i].limitQuota - data.list[i].grantQuota);
        }
        this.pageConfig.account = data.total;
        this.pageConfig.currentPage = data.pageNum;
        // this.pageConfig.pageSize = data.pageSize;
      })
      .catch((err) => {
        this.$error(err.message);
      });
    },
    init () {
      this.$MyFetch.get(quotaApi.BranchCompanys)
      .then((data = {}) => {
        this.branch = data;
      })
      .catch((err) => {
        this.$error(err.message);
      });
    }
  },
  created() {
    this.init();
    this.getData(1, this.pageConfig.pageSize);
  }
};
</script>
