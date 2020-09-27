<template>
  <div>
    <tax-table :columnList="commoneColList" :api="owingtax" :tabTitle="'欠税信息'"></tax-table>
  </div>
</template>
<script>
  import taxTable from './../table';
  import {spareApi} from '../../../../../js/server.js';
  export default {
     props: {
      taxOwingtaxData: {
        type: Array,
        default: () => {
          return [];
        }
      }
    },
    data() {
      return {
        title: '欠税信息',
        owingtax: spareApi.checkTaxLoan.owingtax,
        commoneColList: [
          { label: '序号', prop: 'num', width: 80 },
          { label: '税款所属期起', prop: 'belongToStartDt', width: 185 },
          { label: '税款所属期止', prop: 'belongToEndDt', width: 185 },
          { label: '应征凭证序号', prop: 'investName' }, // lost
          { label: '征收项目名称', prop: 'levyItemName' },
          { label: '计税依据', prop: 'taxBaseAmt', width: '200' },
          { label: '应纳税款', prop: 'taxAmt' },
          { label: '缴款期限', prop: 'payTaxEndDt', width: 185 },
          { label: '入库日期', prop: 'putInDt', width: 185 }
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
