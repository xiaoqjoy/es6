<style lang="less" rel="stylesheet/less" scoped>
  .el-form--inline {
    // margin-bottom: 21px;
  }
  .del {
    color: #f55f5f;
  }
  .pagination {
    padding-top: 20px;
  }
</style>
<template>
  <div class="contain">
    <button class="add" @click="add()">+ 新增</button>
    <el-form  :inline="true" :model="form" class="demo-ruleForm">
      <el-form-item prop="corpName">
        <el-select clearable v-model="form.corpName" @change="changeCorp" filterable placeholder="合作方名称" :disabled="disable">
          <el-option
            v-for="item in corp"
            :key="item.corpCode"
            :label="item.corpName"
            :value="item.corpName">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="corpCode">
        <el-select clearable v-model="form.corpCode" @change="changeCorpCode" filterable placeholder="合作方编号" :disabled="disable">
          <el-option
            v-for="item in corp"
            :key="item.corpCode"
            :label="item.corpCode"
            :value="item.corpCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="fundCode">
        <el-select clearable v-model="form.fundCode" filterable placeholder="资金方名称" @change="changeCondition" :disabled="disable">
          <el-option
            v-for="item in fund"
            :key="item.fundCode"
            :label="item.fundName"
            :value="item.fundCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="businessCode">
        <el-select clearable v-model="form.businessCode" filterable placeholder="业务模式" @change="changeCondition" :disabled="disable">
          <el-option
            v-for="item in models"
            :key="item.businessCode"
            :label="item.businessName"
            :value="item.businessCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="search" class="add check">查询</el-button>
      <el-button type="primary" @click="clear" class="add check clear">清空</el-button>
    </el-form>
    <el-table
      class="tables"
      :data="tableData"
      :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#F9FAFB'}">
      <el-table-column
        prop="corpCode"
        label="合作方编号"
        width="160">
      </el-table-column>
      <el-table-column
        prop="corpName"
        label="合作方名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="fundName"
        label="资金方名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="businessName"
        label="业务模式"
        width="200">
        <template slot-scope="scope">
          <el-tooltip effect="dark" :content="scope.row.businessName" placement="top">
            <div class="ellipsis">
              {{scope.row.businessName}}
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="productTypeName"
        label="产品类型"
        width="130">
      </el-table-column>
      <el-table-column
        label="可用额度统计口径"
        width="120">
        <template slot-scope="scope">
          {{(scope.row.quotaType === 1)?"发放额":"余额"}}
        </template>
      </el-table-column>
      <el-table-column
        prop="limitQuota"
        label="总额度"
        width="200">
      </el-table-column>
      <el-table-column
        prop="grantQuota"
        label="发放额"
        width="120">
      </el-table-column>
      <el-table-column
        prop="lastQuota"
        label="剩余额度"
        width="200">
      </el-table-column>
      <el-table-column
        prop="repaymentQuota"
        label="客户已还额度"
        width="120">
      </el-table-column>
      <el-table-column
        prop="available"
        label="可用额度"
        width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        width="140"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">配置</el-button>
          <el-button class="del" @click="del(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
  <addList  v-if="newList"  @close="closeNewList" @getNewData="getNewData"/>
  <info-details v-if="details" :data="row"  @close="closeInfoDetails"  @getNewData="getNewData"></info-details>
  </div>
</template>

<script>
import addList from "./addList"; // 新增
import pagination from "@components/pagination"; // 分页条
// import multipleSelect from "@components/multiple-select";
import {quotaApi} from '../js/server.js';
import infoDetails from './info-details/info-details.vue';

export default {
  data() {
    return {
      disable: false,
      corp: [],
      fund: [],
      models: [],
      form: {
        businessCode: "",
        corpCode: "",
        // corpName: "",
        fundCode: ""
      },
      value: "",
      tableData: [],
      pageConfig: {
        account: 0,
        pageSize: 10,
        currentPage: 1,
        showJumpButton: true
      },
      details: false,
      newList: false,
      row: {}
    };
  },
  methods: {
    availableToFixed (val) {
      let outval;
      if (val % 1 > 0) {
        outval = val.toFixed(2);
      } else {
        outval = val;
      }
      return outval;
    },
    clearSel () {
      this.form.corpName = [];
    },
    close() {
      this.$emit('close');
    },
    clear () {
      this.form = {
        businessCode: "",
        corpCode: "",
        corpName: "",
        fundCode: ""
      };
      this.changeCondition();
    },
    search () {
      this.pageConfig.currentPage = 1;
      this.pageConfig.pageSize = 10;
      this.getData(this.pageConfig.currentPage, this.pageConfig.pageSize);
    },
    edit (row) {
      this.row = row;
      this.details = true;
    },
    changeCondition () {
      let data = {
        businessCode: this.form.businessCode,
        corpCode: this.form.corpCode,
        fundCode: this.form.fundCode,
        productTypeCode: []
      };
      this.disable = true;
      this.$MyFetch.post(quotaApi.ProductsElements, data)
      .then((data = {}) => {
        this.corp = data.partners;
        this.fund = data.funds;
        this.models = data.models;
        this.disable = false;
      })
      .catch((err) => {
        this.$error(err.message);
        this.disable = false;
      });
    },
    getNewData () {
      this.getData(this.pageConfig.currentPage, this.pageConfig.pageSize);
    },
    closeNewList () {
      this.newList = false;
    },
    closeInfoDetails () {
      this.details = false;
    },
    add() {
      this.newList = true;
    },
    changeCorp (value) {
      for (let i = this.corp.length - 1; i >= 0; i--) {
        if (this.corp[i].corpName === value) {
          this.form.corpCode = this.corp[i].corpCode;
        }
      }
      this.changeCondition();
    },
    changeCorpCode (value) {
      for (let i = this.corp.length - 1; i >= 0; i--) {
        if (this.corp[i].corpCode === value) {
          this.form.corpName = this.corp[i].corpName;
        }
      }
      this.changeCondition();
    },
    del (row) {
      let url = `${quotaApi.Groups}/${row.id}`;
      this.$confirm('确认删除该数据吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$MyFetch.delete(url, {})
        .then((data = {}) => {
          this.$message({
            message: '删除成功',
            center: true,
            onClose: this.close()
          });
          this.getNewData();
        })
        .catch((err) => {
          this.$error(err.message);
        });
      }).catch(() => {});
    },
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.getData(this.pageConfig.currentPage, this.pageConfig.pageSize);
    },
    getData (page, pageSize) {
      let data = {
        pageNum: page,
        pageSize,
        ...this.form
      };
      delete data.corpName;
      this.$MyFetch.get(quotaApi.Groups, data)
      .then((data = {}) => {
        for (let i = data.list.length - 1; i >= 0; i--) {
          if (data.list[i].quotaType === 1) {
            data.list[i].available = this.availableToFixed(data.list[i].limitQuota - data.list[i].grantQuota);
          } else {
            data.list[i].available = this.availableToFixed(data.list[i].limitQuota - data.list[i].grantQuota + data.list[i].repaymentQuota);
          }
          data.list[i].lastQuota = data.list[i].limitQuota - data.list[i].grantQuota;
        }
        this.tableData = data.list;
        this.pageConfig.account = data.total;
        this.pageConfig.currentPage = data.pageNum;
      })
      .catch((err) => {
        this.$error(err.message);
      });
    },
    init () {
      this.changeCondition();
    }
  },
  components: {
    pagination,
    addList,
    infoDetails
    // multipleSelect
  },
  created() {
    this.init();
    this.getData(1, this.pageConfig.pageSize);
  }
};
</script>
