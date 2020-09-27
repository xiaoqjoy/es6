<template>
  <div>
    <tax-table :columnList="colList" :api="commercials" :tabTitle="'普通发票'"></tax-table>
    <tax-table :columnList="colList" :api="specials" :tabTitle="'专用发票'"></tax-table>
    <tax-table :columnList="colList" :api="electronics" :tabTitle="'电子发票'"></tax-table>
    <tax-table :columnList="colList" :api="motorVehicles" :tabTitle="'机动车发票'"></tax-table>
    <tax-table :columnList="colList" :api="freights" :tabTitle="'货运发票'"></tax-table>
  </div>
</template>
<script>
  import taxTable from './../table';
  import {spareApi} from '../../../../../js/server.js';
  export default {
    props: {
      taxInvoiceData: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    data() {
      return {
        xx: '发票信息',
        commercials: spareApi.checkTaxLoan.invoice.commercials,
        electronics: spareApi.checkTaxLoan.invoice.electronics,
        freights: spareApi.checkTaxLoan.invoice.freights,
        motorVehicles: spareApi.checkTaxLoan.invoice.motorVehicles,
        specials: spareApi.checkTaxLoan.invoice.specials,
        colList: [
          { label: '序号', prop: 'num', width: 80 },
          { label: '开票日期', prop: 'invoiceCreateDttm', width: 185 },
          { label: '购方纳税人识别号', prop: 'buyerNum' },
          { label: '购方名称', prop: 'buyerName' },
          { label: '销方纳税人识别码', prop: 'sellerNum' },
          { label: '企业名称', prop: 'sellerName' }, // lost
          { label: '金额', prop: 'saleAmt' },
          { label: '税额', prop: 'taxAmt' },
          { label: '发票名称', prop: 'investCertificateNum' }, // lost
          { label: '发票代码', prop: 'investCertificateNum' } // lost
        ],
        ordinaryData: [
          { num: 1, startDate: '2018/1/22' }
        ],
        specialData: [
          { num: 1, startDate: '2018/1/22' }
        ],
        digitalData: [
          { num: 1, startDate: '2018/1/22' }
        ],
        motorData: [
          { num: 1, startDate: '2018/1/22' }
        ],
        freightData: [
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
