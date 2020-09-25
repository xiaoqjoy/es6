<template>
  <div class="ic_info_detail_wrap" style="padding:0px">
    <el-header>工商信息</el-header>
    <el-main>
      <div class="business_lic">
        <h3>营业执照信息</h3>
        <div class="business_lic_main">
          <div v-for="(item, key) in bussinesslist" :key="key">
            <span>{{item}}: </span>
            <span>{{basic[key]}}</span>
          </div>
        </div>
      </div>
      <div class="shareholder">
        <h3>股东及出资信息</h3>
        <div>
          <el-table
            :data="shareholdersData"
            style="width: 100%">
            <el-table-column :type="item.prop"
              v-for="item in shareholderList"
              :key="item.prop" :prop="item.prop"
              :label="item.label" :width="item.width">
            </el-table-column>
          </el-table>
        </div>
      </div>
       <div class="shareholder">
        <h3>列入经营异常名录信息</h3>
        <div>
          <el-table
            :data="exceptionsData"
            style="width: 100%">
            <el-table-column
              v-for="item in exceptionsList"
              :key="item.prop" :prop="item.prop"
              :label="item.label" :width="item.width"
              :type="item.prop">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
export default {
  name: 'ICInfoDetail',
  props: {
    title: {
      type: String,
      default: () => 'title'
    }
  },
  data() {
    return {
      msg: '',
      bussinesslist: {
        creditcode: '统一社会信用代码',
        entname: '企业名称',
        enttype: '类型',
        frname: '法定代表人',
        regcap: '注册资本',
        esdate: '成立日期',
        opfrom: '营业期限自',
        opto: '营业期限至',
        regorg: '登记机关',
        apprdate: '核准日期',
        entstatus: '登记状态',
        dom: '住所',
        yearReportBasicsTel1: '最近第1年年报单位电话',
        yearReportBasicsTel2: '最近第2年年报单位电话',
        zsopscope: '经营范围'
      },
      basic: {},
      bussinessKeyList: [],
      shareholderList: [
        {prop: 'index', label: '序号', width: ''},
        {prop: 'shaname', label: '股东名称', width: ''},
        {prop: 'invtype', label: '股东类型', width: ''}
      ],
      shareholdersData: [],
      exceptionsList: [
        {prop: 'index', label: '序号', width: ''},
        {prop: 'inreason', label: '列入经营异常名录原因', width: ''},
        {prop: 'indate', label: '列入日期', width: ''},
        {prop: 'yrregorg', label: '作出决定机关（列入）', width: ''},
        {prop: 'outreason', label: '列出经营异常名录原因', width: ''},
        {prop: 'outdate', label: '移出日期', width: ''},
        {prop: 'ycregorg', label: '做出决定机关（移出）', width: ''}
      ],
      exceptionsData: []
    };
  },
  methods: {
    init() {
      let data = JSON.parse(localStorage.getItem('companyInfo'));
      if (!data) {
        this.confirmFn('无数据', 'error');
        return;
      }
      let yearReportBasics = data.yearReportBasics;
      yearReportBasics.sort((first, second) => {
        return second.ancheyear - first.ancheyear;
      });
      if (yearReportBasics && yearReportBasics[0]) {
        data.basic.yearReportBasicsTel1 = yearReportBasics[0].tel;
      }
      if (yearReportBasics && yearReportBasics[1]) {
        data.basic.yearReportBasicsTel2 = yearReportBasics[1].tel;
      }
      this.basic = data.basic;
      this.shareholdersData = data.shareholders;
      this.exceptionsData = data.exceptions;
      localStorage.removeItem('companyInfo');
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="less">
  .ic_info_detail_wrap {
    .business_lic {
      .business_lic_main {
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-around;
        text-align: left;
        > div {
          flex-basis: 33%;
          height: 35px;
          line-height: 35px;
          font-size: 14px;
          span:first-child {
            color: #999;
            white-space: nowrap;
          }
        }
        > div:nth-last-child(1) {
          flex-basis: 100%;
        }
      }
    }
    .business_lic, .shareholder{
      h3 {
        position: relative;
        font-size: 16px;
        font-weight: 600;
        padding-left: 12px;
        color: #000;
        margin-bottom: 20px;
        text-align: left;
        &:before {
          content: "";
          position: absolute;
          top: 50%;
          margin-top: -8px;
          left: 0;
          width: 2px;
          height: 16px;
          background: #538BF1;
        }
      }
      > div {
        border-top: 1px solid #ebeef5;
      }
    }
  }
</style>
