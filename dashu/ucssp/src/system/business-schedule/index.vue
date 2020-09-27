<style lang="less" scoped>
  .el-input, .el-select, .el-date-editor--daterange {
    width: 250px;
  }
  .pagination {
    margin-top: 20px;
  }
</style>
<style lang="less">
  .busSchedule {
    .el-range-separator {
      padding: 0;
    }
    .el-table .is-left .cell {
      text-align: left;
      padding-left: 30px;
    }
    .el-table .el-table__header .cell {
      text-align: center;
      padding-left: 10px;
    }
  }
</style>
<template>
  <div class="container busSchedule">
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
      <el-form-item>
        <el-date-picker
          v-model="form.applicationTime"
          type="daterange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始申请日期"
          end-placeholder="结束申请日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="form.f2fTime"
          type="daterange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始面签日期"
          end-placeholder="结束面签日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="form.putOutTime"
          type="daterange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始放款日期"
          end-placeholder="结束放款日期">
        </el-date-picker>
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
      <el-form-item prop="custServiceName">
        <el-input v-model="form.custServiceName" maxlength="15" placeholder="属地客服"></el-input>
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
      <el-form-item prop="authReasonCode">
        <el-select
          filterable
          clearable
          v-model="form.authReasonCode"
          placeholder="授权原因">
          <el-option
            v-for="item in authReason"
            :key="item.itemCode"
            :label="item.itemDesc"
            :value="item.itemCode"></el-option>
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
        <el-table-column prop="authReasonCode" label="授权原因"></el-table-column>
        <el-table-column :formatter="businessTypeFormatter" prop="businessTypeCode" label="业务类型"></el-table-column>
        <el-table-column prop="primaryProductName" label="一级产品"></el-table-column>
        <el-table-column width="100" prop="taskDefKey" label="当前所处阶段"></el-table-column>
        <el-table-column width="100" prop="riskLevel" label="风险等级"></el-table-column>
        <el-table-column width="200" prop="applicationTime" label="申请日期"></el-table-column>
        <el-table-column width="200" prop="pricingPlanCode" label="定价方案"></el-table-column>
        <el-table-column width="200" prop="f2fTypeDesc" label="面签类型"></el-table-column>
        <el-table-column width="200" prop="f2fTime" label="面签日期"></el-table-column>
        <el-table-column width="200" prop="putOutTime1" label="产品一放款日期"></el-table-column>
        <el-table-column width="200" prop="putOutTime2" label="产品二放款日期"></el-table-column>
        <el-table-column prop="applicationSubmitAmt" label="申请金额"></el-table-column>
        <el-table-column prop="finalResultAmt" label="审批金额"></el-table-column>
        <el-table-column prop="custManagerName" label="客户经理"></el-table-column>
        <el-table-column prop="custServiceName" label="属地客服"></el-table-column>
        <el-table-column width="100" prop="subcompanyName" label="分公司"></el-table-column>
        <el-table-column width="200" prop="orgName1" label="产品一合作机构"></el-table-column>
        <el-table-column prop="riskLevel1" label="产品1评分等级" width="120"></el-table-column>
        <el-table-column prop="putoutApproveStatus1" label="产品一放款状态"></el-table-column>
        <el-table-column prop="putoutApproveAmt1" label="产品一放款金额"></el-table-column>
        <el-table-column width="100" prop="loanTerm1" label="产品一贷款期限"></el-table-column>
        <el-table-column width="100" prop="policyNum1" label="产品一保单号"></el-table-column>
        <el-table-column width="100" prop="electronAccountNum1" label="产品一电子账户（二类户）账号"></el-table-column>
        <el-table-column label="产品一备注" width="200">
          <template slot-scope="scope">
            <div>
              {{scope.row.specialAllotCode1}}
            </div>
            <div>
              {{scope.row.platformReturnTxt1}}
            </div>
            <div>{{scope.row.rejectCode1}}</div>
            <div v-if="!scope.row.specialAllotCode1 && !scope.row.platformReturnTxt1 && !scope.row.rejectCode1">{{scope.row.vetoReason1}}</div>
          </template>
        </el-table-column>
        <el-table-column width="200" prop="orgName2" label="产品二合作机构"></el-table-column>
        <el-table-column prop="riskLevel2" label="产品2评分等级" width="120"></el-table-column>
        <el-table-column prop="putoutApproveStatus2" label="产品二放款状态"></el-table-column>
        <el-table-column prop="putoutApproveAmt2" label="产品二放款金额"></el-table-column>
        <el-table-column width="100" prop="loanTerm2" label="产品二贷款期限"></el-table-column>
        <el-table-column width="100" prop="policyNum2" label="产品二保单号"></el-table-column>
        <el-table-column width="100" prop="electronAccountNum2" label="产品二电子账户（二类户）账号"></el-table-column>
        <el-table-column label="产品二备注" width="200">
          <template slot-scope="scope">
            <div>
              {{scope.row.specialAllotCode2}}
            </div>
            <div>
              {{scope.row.platformReturnTxt2}}
            </div>
            <div>{{scope.row.rejectCode2}}</div>
            <div v-if="!scope.row.specialAllotCode2 && !scope.row.platformReturnTxt2 && !scope.row.rejectCode2">{{scope.row.vetoReason2}}</div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          align="left"
          width="320"
          label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="text" size="small" @click="showSpare(scope.row)">业务详情</el-button>
              <el-button type="text" size="small" @click="showRecord(scope.row)">流转记录</el-button>
              <el-button type="text" size="small" @click="showApproval(scope.row)">查看审批意见</el-button>
              <el-button style="color:red;" v-if="(status ==='all' || status ==='no-finish') && scope.row.cusGiveUpStatus" type="text" size="small" @click="showGiveup(scope.row)">客户放弃</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <pagination :page="pageConfig" class="pagination" @jump-page="getData"></pagination>
    </div>
    <!-- <transition name="fade"> -->
      <record
        v-if="isRecord"
        :row="row"
        @close="closeRecord"></record>
    <!-- </transition> -->
    <!-- <transition name="fade"> -->
      <approval
        v-if="isApproval"
        :row="row"
        @close="closeApproval"></approval>
    <!-- </transition> -->
    <spare
      :isReadonly="true"
      v-if="isSpare"
      @close="closeSpare"
      :applicationId="applicationId"></spare>
      <giveup
        v-if="isGiveup"
        :row="row"
        @close="closeGiveup"></giveup>
  </div>
</template>
<script>
import record from './record';
import giveup from './giveup'; // 客户放弃弹框
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
    },
    "form.applicationTime"(newVal, oldVal) {
      if (!newVal) {
        this.pickerOptions = Object.assign({}, this.pickerOptions, {
          disabledDate: function() {
            return false;
          }
        });
      }
    },
    "form.f2fTime"(newVal, oldVal) {
      if (!newVal) {
        this.pickerOptions = Object.assign({}, this.pickerOptions, {
          disabledDate: function() {
            return false;
          }
        });
      }
    },
    "form.putOutTime"(newVal, oldVal) {
      if (!newVal) {
        this.pickerOptions = Object.assign({}, this.pickerOptions, {
          disabledDate: function() {
            return false;
          }
        });
      }
    }
  },
  data() {
    return {
      row: {},
      form: {},
      tableData: [],
      applicationId: '',
      products: [],
      authReason: [],
      phases: [],
      subcompanys: [],
      loading: false,
      isShow: false,
      isRecord: false,
      isApproval: false,
      isSpare: false,
      isGiveup: false, // 客户放弃弹框 true or false
      status: '',
      pickerOptions: { // 限制时间间隔30天内
        onPick(obj) {
          if (obj.minDate) {
            this.disabledDate = function(date) {
              let range = 30 * 24 * 3600 * 1000;
              return Math.abs(obj.minDate.getTime() - date.getTime()) > range;
            };
          } else {
            this.disabledDate = function(date) {
              return false;
            };
          }
        }
      },
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
    pagination,
    giveup
  },
  methods: {
    search() {
      this.getData();
    },
    clear() {
      // this.$refs.searchForm.resetFields();
      this.form = {};
      this.pageConfig = {
        account: 0,
        currentPage: 1,
        pageSize: 10,
        showJumpButton: true
      };
    },
    //   || row.productCategoryCd === "04"
    showSpare(row) {
      if (row.primaryProductCode === "150" || row.primaryProductCode === "160" || row.primaryProductCode === "204" || row.primaryProductCode === "208" || row.productCategoryCd === "04") {
        this.applicationId = row.applicationId;
        this.isSpare = true;
      } else {
        this.$MyFetch.get(businessApi.isPrepare, {
          processInstanceId: row.processInstanceId
        }).then((data) => {
          this.applicationId = row.applicationId;
          this.isSpare = true;
        }).catch((e) => {
          this.confirmFn("该客户未达到此阶段，暂无数据");
        });
      }
    },
    showRecord(row) {
      this.row = row;
      this.isRecord = true;
    },
    showGiveup(row) { // 客户放弃弹框
      this.row = row;
      this.isGiveup = true;
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
    closeGiveup() {
      this.isGiveup = false;
      this.getConfig();
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
      this.$getDictCode(" auth_reason_code").then(res => {
        this.authReason = res;
        console.log(res);
      })
      .catch(err => {
        this.$error(err.message);
      });
      this.$MyFetch.get(businessApi.getProduct)
      .then((data) => {
        this.products = data;
      })
      .catch((e) => {
        this.$error(e.message);
      });
      this.$MyFetch.get(businessApi.getStage)
      .then((data) => {
        this.phases = data;
      })
      .catch((e) => {
        this.$error(e.message);
      });
      this.$MyFetch.get(businessApi.getSubcompany)
      .then((data) => {
        this.subcompanys = data;
      })
      .catch((e) => {
        this.$error(e.message);
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
          if (!form.custServiceName && !form.applicationId && !form.primaryProductCode && !form.authReasonCode && !form.taskDefKey && !form.applicationTime && !form.f2fTime && !form.putOutTime && !form.applicationSubmitAmt && !form.custName && !form.custManagerName && !form.subcompanyName) {
            this.confirmFn("请至少填写或选择一项查询条件");
            return;
          }
          if (form.applicationTime && form.applicationTime.length === 2) {
            form.applicationStartTime = form.applicationTime[0] + " 00:00:00";
            form.applicationEndTime = form.applicationTime[1] + " 23:59:59";
          }
          if (form.f2fTime && form.f2fTime.length === 2) {
            form.f2fStartTime = form.f2fTime[0] + " 00:00:00";
            form.f2fEndTime = form.f2fTime[1] + " 23:59:59";
          }
          if (form.putOutTime && form.putOutTime.length === 2) {
            form.putOutStartTime = form.putOutTime[0] + " 00:00:00";
            form.putOutEndTime = form.putOutTime[1] + " 23:59:59";
          }
          delete form.applicationTime;
          delete form.f2fTime;
          delete form.putOutTime;
          this.loading = true;
          this.$MyFetch.post(businessApi.getInfo, form, {timeout: 300000})
          .then((data) => {
            this.loading = false;
            this.pageConfig.account = data.total || 1;
            this.pageConfig.currentPage = data.pageNum || 1;
            data.list.forEach(_e => {
              if (_e.riskLevel1 || _e.riskLevel2) {
                delete _e.riskLevel;
              }
            });
            this.tableData = data.list;
          })
          .catch((e) => {
            this.loading = false;
            this.$error(e.message);
          });
        }
      });
    }
  },
  mounted() {
    this.getConfig();
  }
};
</script>
