<template>
  <div>
    <tax-table :columnList="commoneColList" :api="crilvl" :tabTitle="'纳税人信用评级信息'"></tax-table>
  </div>
</template>
<script>
  import taxTable from './../table';
  import {spareApi} from '../../../../../js/server.js';
  export default {
     props: {
      taxCrlvlData: {
        type: Array,
        default: () => {
          return [];
        }
      }
    },
    data() {
      return {
        xx: '纳税人信用评级信息',
        crilvl: spareApi.checkTaxLoan.crilvl,
        commoneColList: [
          { label: '序号', prop: 'num', width: 80 },
          { label: '纳税人识别号', prop: 'taxpayerNum' },
          { label: '纳税人电子档案号', prop: 'taxpayerErecordNum' },
          { label: '评级时间', prop: 'taxCreditGradeDt', width: 185 },
          { label: '纳税人信用级别', prop: 'taxCreditLevelCd' }
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
