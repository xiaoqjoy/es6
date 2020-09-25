<style lang="less" rel="stylesheet/less" scoped>
  .box {
    display: inline-block;
    padding-right: 5px;
  }

  .hover-color:hover {
    color: #538BF1;
    cursor: pointer;
  }
  .contain .add.middle {
    width: 200px;
  }
  .bottom {
    text-align: center;
    padding-top: 10px;
  }
  /deep/ .el-button--text {
    color: #538bf1;
  }
  /deep/ .quota-configuration-dialog .dialog-box .dialog-box__top{
    margin-bottom:20px!important;
  }
  /deep/ .drop_loan .dialog-box .dialog-box__middle-form .form__bottom{
    margin-top:30px!important;
  }
  /deep/ .quota-configuration-dialog .dialog-box{
    padding-bottom: 10px!important;
    background: #fff;
  }
  /deep/ .quota-configuration-dialog .complete-product{
    background: #fff;
  }
</style>
<template>
  <div class="contain quota-configuration">
    <el-form
    :inline="true"
    :model="form"
    ref="form"
    class="demo-form-inline"
    :rules="commonRules">
      <el-form-item prop="corpCode">
        <el-select clearable v-model="form.corpCode" @change="changeCondition" filterable placeholder="合作方名称" :disabled="disable">
          <el-option
            v-for="item in corp"
            :key="item.corpCode"
            :label="item.corpName"
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
      <el-form-item prop="productTypeCode">
        <el-select clearable v-model="form.productTypeCode" filterable placeholder="产品类别" @change="changeCondition" :disabled="disable">
          <el-option
            v-for="item in types"
            :key="item.productTypeCode"
            :label="item.productTypeName"
            :value="item.productTypeCode">
          </el-option>
        </el-select>
      </el-form-item>
      <button type="button" @click="getData('form')" class="add check">查询</button>
      <button type="button" @click="clear" class="add check clear">清空</button>
    </el-form>
    <el-table
    :data="tableData"
    style="width: 100%">
      <el-table-column
        prop="corpName"
        label="合作方名称">
      </el-table-column>
      <el-table-column
        prop="fundName"
        label="资金方名称">
      </el-table-column>
      <el-table-column
        prop="businessName"
        label="业务模式">
      </el-table-column>
      <el-table-column
        prop="productTypeName"
        label="产品类型">
      </el-table-column>
      <el-table-column
        label="是否配置">
        <template slot-scope="scope">
        <el-popover trigger="hover" placement="top" v-if="scope.row.exist">
          <span class="box" v-for="(items, index) in scope.row.quotaList" :key="index">{{ items.branchName}}</span>
          <div slot="reference" class="name-wrapper hover-color">
            {{ (scope.row.exist)?"是":"否" }}
          </div>
        </el-popover>
        <span v-if="!scope.row.exist">
          {{ (scope.row.exist)?"是":"否" }}
        </span>
      </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">配置</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="bottom">
      <el-button class="add check middle" @click="importFile">批量导入</el-button>
    </div>
    <!-- <pagination @jump-page='changePage' :page='pageConfig' class="pagination"></pagination> -->
    <info-details v-if="details" :data="row"  @getNewData="getAllData"  @close="closeInfoDetails"></info-details>
    <upload class="quota-configuration-dialog" v-if="uploadBox"  @getNewData="getAllData" @close="closeUpload"></upload>
  </div>
</template>

<script type="text/ecmascript-6">
import {quotaApi} from '../js/server.js';
import infoDetails from './info-details/info-details.vue';
import upload from './upload/index.vue';
// import pagination from "@components/pagination"; // 分页条

export default {
  data() {
    return {
      uploadBox: false,
      details: false,
      row: {},
      corp: [],
      fund: [],
      models: [],
      types: [],
      disable: false,
      commonRules: {
        corpName: [
          { required: true, message: '请选择合作方名称', trigger: 'change' }
        ],
        corpCode: [
          { required: true, message: '请选择合作方编号', trigger: 'change' }
        ],
        fundCode: [
          { required: true, message: '请选择资金方名称', trigger: 'change' }
        ],
        businessCode: [
          { required: true, message: '请选择业务模式', trigger: 'change' }
        ],
        productTypeCode: [
          { required: true, message: '请选择产品类型', trigger: 'change' }
        ]
      },
      // pageConfig: {
      //   account: 0,
      //   pageSize: 10,
      //   currentPage: 1,
      //   showJumpButton: true
      // },
      tableData: [],
      form: {
        "businessCode": "",
        "corpCode": "",
        "fundCode": "",
        "productTypeCode": ""
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  components: {
    infoDetails,
    upload
    // pagination
  },
  methods: {
    importFile () {
      this.uploadBox = true;
    },
    closeInfoDetails () {
      this.details = false;
    },
    closeUpload () {
      this.uploadBox = false;
    },
    clear () {
      this.form = {
        "businessCode": "",
        "corpCode": "",
        "fundCode": "",
        "productTypeCode": ""
      };
      this.changeCondition();
    },
    // changePage (page) {
    //   this.pageConfig.currentPage = page;
    //   this.getData(page, this.pageSize);
    // },
    changeCondition () {
      let data = JSON.parse(JSON.stringify(this.form));
      let type = data.productTypeCode;
      if (type === "") {
        data.productTypeCode = [];
      } else {
        data.productTypeCode = [type];
      }
      this.disable = true;
      this.$MyFetch.post(quotaApi.ProductsElements, data)
      .then((data = {}) => {
        this.corp = data.partners;
        this.fund = data.funds;
        this.models = data.models;
        this.types = data.types;
        this.disable = false;
      })
      .catch((err) => {
        this.$error(err.message);
        this.disable = false;
      });
    },
    getData (formName) {
    // getData (page, pageSize) {
      // let data = {
      //   page,
      //   pageSize,
      //   ...this.form
      // };
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$MyFetch.post(quotaApi.BranchCombinations, this.form)
          .then((data = {}) => {
            this.tableData = data;
            // this.pageConfig.account = data.total;
          })
          .catch((err) => {
            this.$error(err.message);
          });
        }
      });
    },
    edit (row) {
      this.row = row;
      this.details = true;
    },
    getAllData () {
      let data = {
        "businessCode": "",
        "corpCode": "",
        "fundCode": "",
        "productTypeCode": ""
      };
      this.$MyFetch.post(quotaApi.BranchCombinations, data)
      .then((data = {}) => {
        this.tableData = data;
        // this.pageConfig.account = data.total;
      })
      .catch((err) => {
        this.$error(err.message);
      });
    },
    init () {
      this.getAllData();
      this.changeCondition();
    }
  },
  created() {
    this.init();
  }
};
</script>
