<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-12 15:57:25
 * @LastEditTime: 2019-08-13 10:31:00
 * @LastEditors: Please set LastEditors
 -->
<style lang="less" scoped>
  .el-input, .el-select {
    width: 200px;
  }
  .pagination {
    margin-top: 20px;
  }
</style>
<template>
  <div class="container">
    <el-form :rules="rules" :inline="true" :model="form" ref="searchForm">
      <el-form-item prop="applicationId">
        <el-input v-model="form.applicationId" placeholder="申请编号"></el-input>
      </el-form-item>
      <el-form-item prop="primaryProductCode">
        <el-select
          filterable
          clearable
          v-model="form.primaryProductCode"
          placeholder="一级产品">
          <el-option
            v-for="item in products"
            :key="item.primaryProductCode"
            :label="item.primaryProductName"
            :value="item.primaryProductCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="taskDefKey">
        <el-select
          filterable
          clearable
          v-model="form.taskDefKey"
          placeholder="当前所处阶段">
          <el-option
            v-for="item in phases"
            :key="item.taskDefKey"
            :label="item.taskDefDesc"
            :value="item.taskDefKey">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="applicationSubmitAmt">
        <el-input v-model="form.applicationSubmitAmt" placeholder="申请金额"></el-input>
      </el-form-item>
      <el-form-item prop="custName">
        <el-input v-model="form.custName" placeholder="客户姓名"></el-input>
      </el-form-item>
      <el-form-item prop="custManagerName">
        <el-input v-model="form.custManagerName" placeholder="客户经理"></el-input>
      </el-form-item>
      <el-form-item prop="subcompanyName">
        <el-select
          filterable
          clearable
          v-model="form.subcompanyName"
          placeholder="分公司">
          <el-option
            v-for="item in subcompanys"
            :key="item.subcompanyId"
            :label="item.subcompanyName"
            :value="item.subcompanyId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="button__blue width100" @click="search">查询</el-button>
        <el-button type="primary" class="button__border-blue width100" @click="clear">清空</el-button>
      </el-form-item>
    </el-form>
    <div class="table-box">
      <el-table
        v-loading="loading"
        :data="tableData"
        class="common__table"
        header-cell-class-name="table-head"
        row-class-name="table-tr">
        <el-table-column fixed="left" width="200" prop="applicationId" label="申请编号"></el-table-column>
        <el-table-column fixed="left" prop="custName" label="客户姓名"></el-table-column>
        <el-table-column width="200" prop="certificateNum" label="证件号码"></el-table-column>
        <el-table-column width="200" prop="mobileNum" label="手机号码"></el-table-column>
        <el-table-column :formatter="businessTypeFormatter" prop="businessTypeCode" label="业务类型"></el-table-column>
        <el-table-column prop="primaryProductName" label="一级产品"></el-table-column>
        <el-table-column prop="taskDefKey" label="当前所处阶段"></el-table-column>
        <el-table-column prop="applicationSubmitAmt" label="申请金额"></el-table-column>
        <el-table-column prop="finalResultAmt" label="审批金额"></el-table-column>
        <el-table-column prop="custManagerName" label="客户经理"></el-table-column>
        <el-table-column width="100" prop="subcompanyName" label="分公司"></el-table-column>
        <el-table-column prop="channelCode" label="渠道"></el-table-column>
        <el-table-column prop="finalResult" label="评分结果"></el-table-column>
        <el-table-column prop="calCreditAmt" label="评分通过金额"></el-table-column>
        <el-table-column prop="riskLevel" label="风险等级"></el-table-column>
        <el-table-column width="200" prop="orgName1" label="产品一合作机构"></el-table-column>
        <el-table-column prop="putoutApproveStatus1" label="产品一放款状态"></el-table-column>
        <el-table-column prop="putoutApproveAmt1" label="产品一放款金额"></el-table-column>
        <el-table-column width="100" prop="loanTerm1" label="产品一贷款期限"></el-table-column>
        <el-table-column prop="remark1" label="产品一备注"></el-table-column>
        <el-table-column width="200" prop="orgName2" label="产品二合作机构"></el-table-column>
        <el-table-column prop="putoutApproveStatus2" label="产品二放款状态"></el-table-column>
        <el-table-column prop="putoutApproveAmt2" label="产品二放款金额"></el-table-column>
        <el-table-column width="100" prop="loanTerm2" label="产品二贷款期限"></el-table-column>
        <el-table-column prop="remark2" label="产品二备注"></el-table-column>
        <el-table-column
          fixed="right"
          width="250"
          label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="text" size="small" @click="showSpare(scope.row)">业务详情</el-button>
              <el-button type="text" size="small" @click="showRecord(scope.row)">流转记录</el-button>
              <el-button type="text" size="small" @click="showApproval(scope.row)">查看审批意见</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <pagination :page="pageConfig" class="pagination" @jump-page="getData"></pagination>
    </div>
    <transition name="fade">
      <record
        v-if="isRecord"
        :row="row"
        @close="closeRecord"></record>
    </transition>
    <transition name="fade">
      <approval
        v-if="isApproval"
        :row="row"
        @close="closeApproval"></approval>
    </transition>
    <spare
      :isReadonly="true"
      v-if="isSpare"
      @close="closeSpare"
      :applicationId="applicationId"></spare>
  </div>
</template>
<script>
import record from './record';
import approval from './approval';
import spare from '@system/spare/solving/complete_info';
import pagination from '@components/pagination';
import { businessApi } from "./js/server.js";
import myRule from "@common/js/rules";
export default {
  watch: {
    "$route": {
      handler: function() {
        this.status = this.$route.params.status;
        this.tableData = [];
        this.clear();
      },
      immediate: true
    }
  },
  data() {
    return {
      row: {},
      form: {},
      tableData: [],
      applicationId: '',
      products: [],
      phases: [],
      subcompanys: [],
      loading: false,
      isShow: false,
      isRecord: false,
      isApproval: false,
      isSpare: false,
      status: '',
      pageConfig: {
        account: 0,
        currentPage: 1,
        pageSize: 10,
        showJumpButton: true
      },
      rules: {
        applicationSubmitAmt: [
          { validator: myRule.numTwoBit, message: '请输入正确的金额格式', trigger: 'blur' }
        ]
      }
    };
  },
  components: {
    record,
    approval,
    spare,
    pagination
  },
  methods: {
    search() {
      this.getData();
    },
    clear() {
      // this.$refs.searchForm.resetFields();
      this.form = {};
    },
    showSpare(row) {
      this.$MyFetch.get(businessApi.isPrepare, {
        processInstanceId: row.processInstanceId
      }).then((data) => {
        this.applicationId = row.applicationId;
        this.isSpare = true;
      }).catch((e) => {
        this.confirmFn("该客户未达到此阶段，暂无数据");
      });
    },
    showRecord(row) {
      this.row = row;
      this.isRecord = true;
    },
    showApproval(row) {
      this.row = row;
      this.isApproval = true;
    },
    closeSpare() {
      this.isSpare = false;
    },
    closeRecord() {
      this.isRecord = false;
    },
    closeApproval() {
      this.isApproval = false;
    },
    timeFormatter(row, column, cellValue, index) {
      return cellValue ? this.$Moment(cellValue).format("YYYY-MM-DD") : "";
    },
    businessTypeFormatter(row, column, cellValue, index) {
      switch (cellValue) {
        case 'NL':
          return '正常贷款';
        case 'EC':
          return '挖掘中心';
      }
    },
    getConfig() {
      this.$MyFetch.get(businessApi.getProduct)
      .then((data) => {
        this.products = data;
      });
      this.$MyFetch.get(businessApi.getStage)
      .then((data) => {
        this.phases = data;
      });
      this.$MyFetch.get(businessApi.getSubcompany)
      .then((data) => {
        this.subcompanys = data;
      });
    },
    getData(pageNum = 1) {
      this.isShow = true;
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          let form = Object.assign({}, this.form, {
            status: this.status,
            pageSize: 10,
            pageNum
          });
          this.loading = true;
          this.$MyFetch.post(businessApi.getInfo, form)
          .then((data) => {
            this.loading = false;
            this.pageConfig.account = data.total || 1;
            this.pageConfig.currentPage = data.pageNum || 1;
            data.list.forEach((item) => {
              item.channelCode = item.channelCode ? item.channelCode : item.otherChannelCode;
            });
            this.tableData = data.list;
          })
          .catch((e) => {
            this.$error(e.message);
          });
        }
      });
    }
  },
  mounted() {
    // debugger;
    this.getConfig();
    // this.getData();
  }
};
</script>
