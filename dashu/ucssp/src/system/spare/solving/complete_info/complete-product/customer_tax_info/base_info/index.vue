<template>
  <div class="base_tax_info">
    <tax-table :tabTitle="'纳税人基本信息'" :baseInfoLabel="baseInfoLabel" :labelFliterMap="labelFliterMap" :api="basicInfo" :comTabShow="false"></tax-table>
    <tax-table :columnList="investColumnList" :tabTitle="'投资方信息'" :api="investors"></tax-table>
    <tax-table :columnList="contactInfoColumnList" :api="contacts" :tabTitle="'联系人信息'"></tax-table>
    <tax-table :columnList="headOrgInfoColumnList" :api="headOrganizations" :tabTitle="'总机构信息'"></tax-table>
    <tax-table :columnList="branchInfoColList" :api="branchOrganizationsinfo" :tabTitle="'分机构信息'"></tax-table>
    <tax-table :columnList="taxpayerInfoColList" :api="qualification" :tabTitle="'纳税人资格类型登记信息'"></tax-table>
    <tax-table :columnList="modifyInfoColList" :api="changeRegisterInfo" :tabTitle="'变更登记信息'"></tax-table>
  </div>
</template>
<script>
import taxTable from './../table';
import {spareApi} from '../../../../../js/server.js';
export default {
  props: {
    taxBaseData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      basicInfo: spareApi.checkTaxLoan.basic.basicInfo,
      branchOrganizationsinfo: spareApi.checkTaxLoan.basic.branchOrganizationsinfo,
      changeRegisterInfo: spareApi.checkTaxLoan.basic.changeRegisterInfo,
      contacts: spareApi.checkTaxLoan.basic.contacts,
      headOrganizations: spareApi.checkTaxLoan.basic.headOrganizations,
      investors: spareApi.checkTaxLoan.basic.investors,
      qualification: spareApi.checkTaxLoan.basic.qualification,
      xx: '基本信息',
      baseInfoLabel: [
        'taxpayerName',
        'taxpayerNum',
        'organizationNum',
        'socialCreditNum',
        'businessSitePhoneNum',
        'industryTypeName',
        'orgRegisterTypeNum',
        'taxpayerStatusName',
        'btToAtTaxpayerTypeName',
        'employeeQty',
        'registeredCapitalAmt',
        'businessSiteAreaName',
        'registerDt',
        'orgRelationshipTypeName',
        'applAccountingSystemName',
        'chiefTaxOfficerName',
        'chiefTaxOrganizationName',
        'businessAddressDesc',
        'registerAddressDesc'
      ],
      labelFliterMap: {
        taxpayerName: '纳税人名称',
        taxpayerNum: '纳税人识别号',
        organizationNum: '组织机构代码',
        socialCreditNum: '社会信用代码',
        businessSitePhoneNum: '经营地址联系电话',
        industryTypeName: '所属行业',
        orgRegisterTypeNum: '企业登记注册类型',
        taxpayerStatusName: '纳税人状态',
        btToAtTaxpayerTypeName: '营改增纳税人类型',
        employeeQty: '从业人数',
        registeredCapitalAmt: '注册资本及币种',
        businessSiteAreaName: '行政区别',
        registerDt: '登记日期',
        orgRelationshipTypeName: '隶属关系',
        applAccountingSystemName: '适用会计制度',
        chiefTaxOfficerName: '主管税务人员',
        chiefTaxOrganizationName: '主管税务机关',
        businessAddressDesc: '生产经营地址',
        registerAddressDesc: '注册地址'
      },
      tltaxpayerBasicInfo: {
        taxpayerName: '王传兵',
        taxpayerNum: '32xxxx',
        organizationNum: '666666',
        socialCreditNum: '2222',
        businessSitePhoneNum: '0597-2086666',
        industryTypeName: '食品',
        orgRegisterTypeNum: '个体户',
        taxpayerStatusName: '正常纳税中',
        btToAtTaxpayerTypeName: '增税人',
        employeeQty: '50',
        registeredCapitalAmt: 'RMB',
        businessSiteAreaName: '2222',
        registerDt: '1970-1-1',
        orgRelationshipTypeName: '直营',
        applAccountingSystemName: '直营',
        chiefTaxOfficerName: '深圳税务机关',
        chiefTaxOrganizationName: '深圳税务机关',
        businessAddressDesc: '大冲国际商务中心',
        registerAddressDesc: '大冲国际商务中心'
      },
      investColumnList: [
        { label: '序号', prop: 'num', width: 80 },
        { label: '有效期起', prop: 'validPeriodStartDt', width: 185 },
        { label: '有效期止', prop: 'validPeriodEndDt', width: 185 },
        { label: '投资方名称', prop: 'investorName' },
        { label: '投资方经济性质', prop: 'invstEconomicPropertyName' },
        { label: '投资比例（%）', prop: 'investmentPct' },
        { label: '投资方证件种类', prop: 'invstPaperTypeName' },
        { label: '投资方证件号码', prop: 'invstPaperNum', width: 200 }
      ],
      tlInvestor: [
        { num: 1, validPeriodStartDt: '2018/1/22' }
      ],
      contactInfoColumnList: [
        { label: '联系人类型', prop: 'contactType' },
        { label: '姓名', prop: 'contactName' },
        { label: '证件种类', prop: 'contactPaperTypeName' },
        { label: '证件号码', prop: 'contactPaperNum', width: 245 },
        { label: '固定电话', prop: 'contactPhoneNum' },
        { label: '移动电话', prop: 'contactMobilePhoneNum' },
        { label: '电子邮箱', prop: 'contactEmailNum' }
      ],
      tlContact: [],
      headOrgInfoColumnList: [
        { label: '序号', prop: 'num', width: 80 },
        { label: '总机构纳税人识别码', prop: 'taxpayerNum', width: 150 },
        { label: '总机构名称', prop: 'headOrgName' },
        { label: '总机构法人代表姓名', prop: 'corpRepName', width: 150 },
        { label: '总机构联系电话', prop: 'phoneNum' },
        { label: '总机构注册地址', prop: 'registerAddressDesc' },
        { label: '总机构邮政编码', prop: 'zipCodeNum' },
        { label: '总机构经营范围', prop: 'businessScopeTxt' }
      ],
      tlHeadOrganization: [
        { contactType: '1', name: '2018', certificateSort: '大数金融', cetificateNum: '韩梅梅', fixedPhone: '3575-23452345', mobilephone: '大冲国际商务中心', headOrgBusinessScope: '枪支弹药' }
      ],
      branchInfoColList: [
        { label: '序号', prop: 'num', width: 80 },
        { label: '有效期起', prop: 'validPeriodStartDt', minWidth: 185 },
        { label: '有效期止', prop: 'validPeriodEndDt', minWidth: 185 },
        { label: '分支机构（分店）纳税人识别码', prop: 'taxpayerNum', width: 200 },
        { label: '分支机构（分店）名称', prop: 'branchOrganizationName', width: 200 },
        { label: '分支机构（分店）联系电话', prop: 'phoneNum', width: 200 },
        { label: '分支机构（分店）地址', prop: 'registerAddressDesc', width: 200 },
        { label: '分支机构（分店）等级序号', prop: 'headOrgBusinessScope', width: 200 } // lost
      ],
      tlBranchOrganization: [
        { contactType: '1', name: '2018/08/08', certificateSort: '2018/08/08', cetificateNum: '韩梅梅', fixedPhone: '3575-23452345', mobilephone: '大冲国际商务中心', headOrgBusinessScope: '枪支弹药' }
      ],
      taxpayerInfoColList: [
        { label: '序号', prop: 'num', width: 80 },
        { label: '有效期起', prop: 'validPeriodStartDt', minWidth: 185 },
        { label: '有效期止', prop: 'validPeriodEndDt', minWidth: 185 },
        { label: '纳税人资格类型代码', prop: 'tlTaxpayerQualTypeNum' },
        { label: '纳税人资格类型名称', prop: 'tlTaxpayerQualTypeName' },
        { label: '数据终止日期', prop: 'dataEndDt' }
      ],
      tlTaxpayerQualification: [
        { contactType: '1', name: '2018/08/08', certificateSort: '2018/08/08', cetificateNum: '韩梅梅', fixedPhone: '3575-23452345', mobilephone: '大冲国际商务中心' }
      ],
      modifyInfoColList: [
        { label: '序号', prop: 'contactType', width: 80 },
        { label: '变更日期', prop: 'changeDt', minWidth: 185 },
        { label: '变更项目代码', prop: 'changeItemNum', width: 200 },
        { label: '变更项目名称', prop: 'changeItemName', width: 200 },
        { label: '变更前内容', prop: 'contentBeforeChangeDesc', width: 200 },
        { label: '变更后内容', prop: 'contentAfterChangeDesc', width: 200 }
      ],
      tlChangeRegisterInfo: [
        { contactType: '1', name: '2018/08/08', certificateSort: '2018/08/08', cetificateNum: '韩梅梅', fixedPhone: '3575-23452345', mobilephone: '大冲国际商务中心', headOrgBusinessScope: '枪支弹药' }
      ]
    };
  },
  components: {
    taxTable
  },
  created() {
    if (!this.taxBaseData.tltaxpayerBasicInfo) {
      this.taxBaseData.tltaxpayerBasicInfo = {};
    }
  },
  mounted() {
  }
};
</script>
<style lang="less" scoped>
  .base_tax_info:last-child {
    margin-bottom: 0px;
  }
</style>
