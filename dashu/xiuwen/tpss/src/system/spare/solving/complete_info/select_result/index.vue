<template>
  <div class="select-result">
    <div class="dialog-box__middle-1200 bg__white">
      <div class="top__message__list">
        <ul class="message__list clearfix">
          <li class="item f__left">
            <h5 class="title">申请编号:</h5>
            <p class="content">{{ sPInfo.applicationId }}</p>
          </li>
          <li class="item f__left">
            <h5 class="title">客户姓名:</h5>
            <p class="content">{{ sPInfo.custName }}</p>
          </li>
          <li class="item f__left">
            <h5 class="title">身份证号:</h5>
            <p class="content">{{ sPInfo.certificateNum  }}</p>
          </li>
          <li class="item f__left ">
            <h5 class="title">最高可贷额度:</h5>
            <p class="content font__yellow">{{ sPInfo.limitLoanAmt ? sPInfo.limitLoanAmt : 0}}</p>
          </li>
          <li class="item f__left">
            <h5 class="title">额度有效期:</h5>
            <p class="content">{{ sPInfo.limitExpiryDate ? sPInfo.limitExpiryDate : '/'  }}</p>
          </li>
          <li class="item f__left">
            <h5 class="title">评分等级:</h5>
            <p class="content">{{ sPInfo.riskLevelDesc ? sPInfo.riskLevelDesc : '/'  }}</p>
          </li>
        </ul>
      </div>
      <div class="dialog-box__table">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          cell-class-name="dialog__table__td"
          header-cell-class-name="dialog__table__th"
          height="452px"
          highlight-current-row
          @current-change="handleCurrentChange"
          class="dialog__table">
          <el-table-column
            prop="productId"
            label="产品ID"
          >
          </el-table-column>
          <el-table-column
            prop="productName"
            label="产品名称"
          >
          </el-table-column>
          <el-table-column
            prop="maxLimitAmt"
            label="单笔上限">
          </el-table-column>
          <el-table-column
            prop="loanTerm"
            label="贷款期限">
          </el-table-column>
          <el-table-column
            prop="riskRateLevel"
            label="定价档次"
            width="120">
          </el-table-column>
          <el-table-column
            prop="pricingGrade"
            label="定价类型"
            width="120">
          </el-table-column>
            <el-table-column
            label="合作机构年化利率%（年）"
            width="200">
            <template slot-scope="scope">
            <span v-if="scope.row.partnerAnnualRate !== null">{{scope.row.partnerAnnualRate  | rounding}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="担保费率%（月）"
            width="120"
            >
            <template slot-scope="scope">
            <span v-if="scope.row.guaranteeRate !== null">{{scope.row.guaranteeRate  | rounding2}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="评审费率%（一次性收取）"
            width="120">
            <template slot-scope="scope">
            <span v-if="scope.row.reviewRate !== null">{{scope.row.reviewRate  | rounding2}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="保费费率%（一次性收取）"
            width="100">
            <template slot-scope="scope">
            <span v-if="scope.row.premiumRate !== null">{{scope.row.premiumRate  | rounding2}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="咨询费率%（一次性收取）"
            width="100">
            <template slot-scope="scope">
            <span v-if="scope.row.consultingRate !== null">{{scope.row.consultingRate  | rounding2}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="管理费率%（月）"
            width="120">
            <template slot-scope="scope">
            <span v-if="scope.row.managementFeeRate !== null">{{scope.row.managementFeeRate  | rounding2}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {spareApi} from '../../../js/server.js';
  import pagination from '@components/pagination';
    export default{
      props: {
        applicationId: {
          type: String
        },
        isReadonly: {
          type: Boolean,
          default() {
            return false;
          }
        }
      },
      data() {
        return {
          sPInfo: {},
          pageConfig: {
                account: 0,
                currentPage: 1,
                pageSize: 10,
                showJumpButton: true
              },
          tableData: [],
          currentRow: null
        };
      },
      created() {
        this.getInfo(this.applicationId);
        this.getTableData(this.applicationId, 1);
      },
      methods: {
        nextStep() {
          this.$emit('next-step');
        },
        getInfo(id) {
          this.$MyFetch.get(spareApi.solving.completeInfo.selectProduction.productInfo + id)
            .then((data = {}) => {
              this.sPInfo = Object.assign({}, data);
            })
            .catch(err => {
              this.confirmFn(err.message, 'error');
            });
        },
        getTableData(id) {
          let url = this.isReadonly ? spareApi.solved.getDoneTaskProduct : spareApi.solving.completeInfo.selectProduction.getTableData;
          this.$MyFetch.get(url + id)
            .then((data = {}) => {
              this.tableData = [...data];
            })
            .catch(err => {
             this.confirmFn(err.message, 'error');
            });
        },
        handleCurrentChange(row) {
          this.currentRow = row;
        }
      },
      components: {
        pagination
      },
      filters: {
          rounding (value) {
          return value.toFixed(6);
          },
          rounding2 (value) {
          return value.toFixed(2);
          }
      }
    };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .pagination{
    margin-top: 20px;
  }
  .dialog-box__middle-1200{
    height: 542px;
    overflow-y: auto;
    margin: 0 20px;
    padding: 25px 30px;
    box-shadow:  0 1px 10px 0 rgba(0,0,0,0.05);
    .top__message__list{
      .message__list{
        .item{
          width: auto;
          padding-right: 50px;
        }
      }
    }
    .dialog-box__middle-top{
      padding: 20px 0;
      border-bottom: 1px solid  #E5E5E5;
      .title{
        font-size: 16px;
        .icon__gan{
          margin-right: 10px;
        }
      }
    }
    .dialog-box__table{
      /deep/ .dialog__table{
        /deep/ .dialog__table__td{
          padding: 9px 0;
        }
      }
    }
  }
</style>
