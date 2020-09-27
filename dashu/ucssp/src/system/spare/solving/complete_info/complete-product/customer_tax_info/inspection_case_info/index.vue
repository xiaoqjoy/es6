<template>
  <div>
    <tax-table :columnList="commoneColList" :api="inspection" :tabTitle="'稽查案件信息'"></tax-table>
  </div>
</template>
<script>
  import taxTable from './../table';
  import {spareApi} from '../../../../../js/server.js';
  export default {
     props: {
      taxInspData: {
        type: Array,
        default: () => {
          return [];
        }
      }
    },
    data() {
      return {
        xx: '稽查案件信息',
        inspection: spareApi.checkTaxLoan.inspection,
        commoneColList: [
          { label: '序号', prop: 'num', width: 80 },
          { label: '检查所属期间起', prop: 'belongToStartDt', width: 185 },
          { label: '检查所属期间止', prop: 'belongToEndDt', width: 185 },
          { label: '纳税人名称', prop: 'taxpayerName' },
          { label: '案件名称', prop: 'caseName' },
          { label: '大要案标志', prop: 'bigCaseMarkerVal' },
          { label: '实缴罚款总额', prop: 'payForfeitTotalAmt', width: '200' },
          { label: '结案日期', prop: 'settleCaseDt' }
        ],
        comDeclareInfoData: [
          { num: 1, startDate: '2018/1/22' }
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
