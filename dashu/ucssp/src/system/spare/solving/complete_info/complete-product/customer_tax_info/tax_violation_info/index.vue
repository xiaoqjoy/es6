<template>
  <div>
    <tax-table :columnList="commoneColList" :api="illegal" :tabTitle="'税收违法信息'"></tax-table>
  </div>
</template>
<script>
  import taxTable from './../table';
  import {spareApi} from '../../../../../js/server.js';
  export default {
     props: {
      taxVioData: {
        type: Array,
        default: () => {
          return [];
        }
      }
    },
    data() {
      return {
        xx: '税收违法信息',
        illegal: spareApi.checkTaxLoan.illegal,
        commoneColList: [
          { label: '序号', prop: 'num', width: 80 },
          { label: '所属期起', prop: 'belongToStartDt', width: 185 },
          { label: '所属期止', prop: 'belongToEndDt', width: 185 },
          { label: '登记日期', prop: 'registerDt', width: 185 },
          { label: '违法事实', prop: 'mainIllegalFactDesc', width: 185 },
          { label: '税收违法手段', prop: 'mainIllegalMeanName' },
          { label: '税收违法类型', prop: 'mainIllegalTypeName', width: '200' },
          { label: '税收违法行为处理状态', prop: 'mainIllegalStatusName' }
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
