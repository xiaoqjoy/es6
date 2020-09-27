<template>
  <div>
    <tax-table :columnList="comDeclareInfoColList" :tabTitle="'综合申报信息'" :api="declareMult"></tax-table>
    <tax-table :columnList="detailDeclareInfoColList" :tabTitle="'申报详细信息'" :api="declareDetail"></tax-table>
  </div>
</template>
<script>
  //  申报组件
  import taxTable from './../table';
  import {spareApi} from '../../../../../js/server.js';
  export default {
    props: {
      taxDeclareData: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    data() {
      return {
        xx: '申报信息',
        declareDetail: spareApi.checkTaxLoan.declare.detail,
        declareMult: spareApi.checkTaxLoan.declare.mult,
        comDeclareInfoColList: [
          { label: '序号', prop: 'num', width: 80 },
          { label: '税款所属期起', prop: 'taxSubStartDt', width: 185 },
          { label: '税款所属期止', prop: 'taxSubEndDt', width: 185 },
          { label: '征收项目名称', prop: 'levyItemName' },
          { label: '申报期限', prop: 'declareEndDt' },
          { label: '全部销售收入', prop: 'totalSaleAmt' },
          { label: '应税销售收入', prop: 'taxSaleAmt' },
          { label: '应纳税额', prop: 'taxAmt' },
          { label: '申报日期', prop: 'declareDt' },
          { label: '预缴税款', prop: 'preTaxAmt' },
          { label: '应补退税额', prop: 'returnTaxAmt' }
        ],
        detailDeclareInfoColList: [
          { label: '序号', prop: 'num', width: 80 },
          { label: '税款所属期起', prop: 'belongToStartDt', width: 185 },
          { label: '税款所属期止', prop: 'belongToEndDt', width: 185 },
          { label: '电子税票号码', prop: 'taxReceiptNum', width: 200 },
          { label: '征收项目名称', prop: 'levyItemName' },
          { label: '税款种类名称', prop: 'taxTypeName' },
          { label: '实缴金额', prop: 'payTaxAmt' },
          { label: '计税依据', prop: 'taxBaseAmt' },
          { label: '缴款日期', prop: 'payTaxDt', width: 185 },
          { label: '入库日期', prop: 'putInDt', width: 185 }
        ]
      };
    },
    components: {
      taxTable
    }
  };
</script>
<style lang="less">
  .xx {
    width: 111px;
  }
</style>
