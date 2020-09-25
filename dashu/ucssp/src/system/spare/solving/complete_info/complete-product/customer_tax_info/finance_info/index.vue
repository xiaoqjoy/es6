<template>
  <div>
    <tax-table :columnList="commoneColList" :api="balanceCompany" :tabTitle="'资产负债表（适用执行企业会计制度的企业）'"></tax-table>
    <tax-table :columnList="commoneColList" :api="balanceSmallCompany" :tabTitle="'资产负债表（适用执行小企业会计制度的企业）'"></tax-table>
    <tax-table :columnList="commoneColList" :api="balanceGeneralCompany" :tabTitle="'资产负债表（适用执行一般企业会计制度的企业）'"></tax-table>
    <tax-table :columnList="profitCompanyColList" :api="profitCompany" :tabTitle="'利润表（适用执行企业会计制度的企业）'"></tax-table>
    <tax-table :columnList="generalColList" :api="profitGeneralCompany" :tabTitle="'利润表（适用执行一般企业会计制度的企业）'"></tax-table>
    <tax-table :columnList="smallFilmColList" :api="profitSmallCompany" :tabTitle="'利润表（适用执行小企业会计制度的企业）'"></tax-table>
    <tax-table :columnList="smallFilmAnReColList" :api="profitSmallCompanyByYear" :tabTitle="'利润表（适用执行小企业会计制度的企业-（年报））'"></tax-table>
  </div>
</template>
<script>
  import taxTable from './../table';
  import {spareApi} from '../../../../../js/server.js';
  export default {
    props: {
      taxFinaceData: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    data() {
      return {
        xx: '财务信息',
        balanceCompany: spareApi.checkTaxLoan.financial.balanceCompany,
        balanceGeneralCompany: spareApi.checkTaxLoan.financial.balanceGeneralCompany,
        balanceSmallCompany: spareApi.checkTaxLoan.financial.balanceSmallCompany,
        profitCompany: spareApi.checkTaxLoan.financial.profitCompany,
        profitGeneralCompany: spareApi.checkTaxLoan.financial.profitGeneralCompany,
        profitSmallCompany: spareApi.checkTaxLoan.financial.profitSmallCompany,
        profitSmallCompanyByYear: spareApi.checkTaxLoan.financial.profitSmallCompanyByYear,
        commoneColList: [
          { label: '序号', prop: 'num', width: 80 },
          { label: '所属期起', prop: 'belongToStartDt', width: 185 },
          { label: '所属期止', prop: 'belongToEndDt', width: 185 },
          { label: '资产项目名称', prop: 'assetItemName' },
          { label: '期末数_资产', prop: 'termEndAssetAmt' },
          { label: '年初数_资产', prop: 'yearStartAssetAmt' },
          { label: '负债和所有项目权益名称', prop: 'liabilitiesEquityItemName', width: '200' },
          { label: '期末数_权益', prop: 'termEndEquityAmt' },
          { label: '年初数_权益', prop: 'yearStartEquityAmt' }
        ],
        comDeclareInfoData: [
          { num: 1, startDate: '2018/1/22' }
        ],
        baseColList: [
          { label: '序号', prop: 'num', width: 80 },
          { label: '所属期起', prop: 'belongToStartDt', width: 185 },
          { label: '所属期止', prop: 'belongToEndDt', width: 185 },
          { label: '行名称', prop: 'lineName' }
        ]
      };
    },
    components: {
      taxTable
    },
    computed: {
      profitCompanyColList() {
        let arry = [{ label: '本月金额', prop: 'thisMonthAmt' }, { label: '本年累计金额', prop: 'thisYearAccumAmt' }];
        return this.baseColList.concat(arry);
      },
      generalColList() {
        let arry = [{ label: '本月金额', prop: 'thisMonthAmt' }, { label: '上期金额', prop: 'lastTermAmt' }];
        return this.baseColList.concat(arry);
      },
      smallFilmColList() {
        let arry = [{ label: '本月累计金额', prop: 'thisMonthAmtPrice' }, { label: '本月金额', prop: 'thisMonthAmt' }];
        return this.baseColList.concat(arry);
      },
      smallFilmAnReColList() {
        let arry = [{ label: '上年金额', prop: 'lastYearAmt' }, { label: '本年累计金额', prop: 'thisYearAccumAmt' }];
        return this.baseColList.concat(arry);
      }
    }
  };
</script>
<style lang="less">
  .xx {
    width: 111px;
  }
</style>
