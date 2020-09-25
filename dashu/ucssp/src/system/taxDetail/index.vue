<template>
  <div>
    <div class="invoice">
      <el-container>
        <el-header>企业税务征信报告</el-header>
        <el-main>
          <el-card>
            <div slot="header">
              <h3>企业基本信息</h3>
            </div>
            <div class="content">
              <section>
                <el-row>
                  <el-col :span="8">
                    <label>企业名称：</label>
                    <span>{{ companyInfo.basic.entname }}</span>
                  </el-col>
                  <el-col :span="8">
                    <label>法人姓名：</label>
                    <span>{{ companyInfo.basic.frname }}</span>
                  </el-col>
                  <el-col :span="8">
                    <label>登记状态：</label>
                    <span class="yellow">{{ companyInfo.basic.entstatus }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <label>注册地址：</label>
                    <span>{{ companyInfo.basic.dom }}</span>
                  </el-col>
                  <el-col :span="8">
                    <label>企业类型：</label>
                    <span>{{ companyInfo.basic.enttype }}</span>
                  </el-col>
                  <el-col :span="8">
                    <label>行业：</label>
                    <span>{{ companyInfo.basic.industryphyname }} - {{ companyInfo.basic.industryconame }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <label>注册资金：</label>
                    <span class="yellow">{{ companyInfo.basic.regcap }}</span>
                  </el-col>
                  <el-col :span="8">
                    <label>经营期限起：</label>
                    <span>{{ companyInfo.basic.opfrom }}</span>
                  </el-col>
                  <el-col :span="8">
                    <label>经营期限止：</label>
                    <span>{{ companyInfo.basic.opto }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <label>经营范围：</label>
                    <span>{{ companyInfo.basic.zsopscope }}</span>
                  </el-col>
                </el-row>
              </section>
            </div>
          </el-card>
          <el-card>
            <div slot="header">
              <h3>法人&股东信息</h3>
            </div>
            <div class="content">
              <section>
                <h5>法人信息</h5>
                <el-table
                  :data="companyInfo.persons"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr">
                  <el-table-column prop="pername" label="高管姓名"></el-table-column>
                  <el-table-column prop="position" label="职务"></el-table-column>
                </el-table>
              </section>
              <section>
                <h5>股东出资情况</h5>
                <el-table
                  :data="companyInfo.shareholders"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr">
                  <el-table-column prop="shaname" label="股东名称"></el-table-column>
                  <el-table-column prop="subconam" label="投资金额"></el-table-column>
                  <el-table-column prop="fundedratio" label="投资比例"></el-table-column>
                  <el-table-column prop="invtype" label="股东性质"></el-table-column>
                </el-table>
              </section>
              <section>
                <h5>企业变更信息</h5>
                <el-table
                  :data="companyInfo.alters"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr">
                  <el-table-column type="index" width="50" label=" "></el-table-column>
                  <el-table-column prop="altitem" label="变更事项"></el-table-column>
                  <el-table-column prop="altbe" label="变更前内容"></el-table-column>
                  <el-table-column prop="altaf" label="变更后内容"></el-table-column>
                  <el-table-column prop="altdate" label="变更日期"></el-table-column>
                </el-table>
              </section>
            </div>
          </el-card>
          <el-card>
            <div slot="header">
              <h3>企业纳税数据信息</h3>
            </div>
            <div class="content">
              <section>
                <el-row>
                  <el-col :span="8">
                    <label>纳税评级：</label>
                    <span>{{ getTaxLevel(taxInfo.taxLevel) }}</span>
                  </el-col>
                  <el-col :span="8">
                    <label>最近12个月应纳税额（万）：</label>
                    <span>{{ getTaxAmt(taxInfo.taxAmtL12) }}</span>
                  </el-col>
                  <el-col :span="8">
                    <label>最近13-24个月销售收入（万）：</label>
                    <span>{{ getRevenuel(taxInfo.revenueL24) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <label>纳税类型：</label>
                    <span>{{ getTaxType(taxInfo.taxType) }}</span>
                  </el-col>
                  <el-col :span="8">
                    <label>最近12个月应纳增值税税额（万）：</label>
                    <span>{{ getTaxAmt(taxInfo.vatAmtL12) }}</span>
                  </el-col>
                  <el-col :span="8">
                    <label>近12个月销售同比比例：</label>
                    <span>{{ getRevenueTB(taxInfo.revenueTBL12) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <label>近24个月内稽查次数：</label>
                    <span>{{ getInspect(taxInfo.inspectL24) }}</span>
                  </el-col>
                  <el-col :span="8">
                    <label>最近12个月应纳所得税税额（万）：</label>
                    <span>{{ getTaxAmt(taxInfo.incomeTaxAmtL12) }}</span>
                  </el-col>
                  <el-col :span="8">
                    <label>最近一年年报净利润同比比例：</label>
                    <span>{{ getProfitTB(taxInfo.profitTBL12) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <label>近12个月出现应缴滞纳金的月份数：</label>
                    <span>{{ getFeeTax(taxInfo.lateFeeTaxL12) }}</span>
                  </el-col>
                  <el-col :span="8">
                    <label>最近12个月销售收入（万）：</label>
                    <span>{{ getRevenuel(taxInfo.revenueL12) }}</span>
                  </el-col>
                  <el-col :span="8">
                    <label>资产负债率近12个月：</label>
                    <span>{{ getRatio(taxInfo.aLRatioL12) }}</span>
                  </el-col>
                </el-row>
              </section>
            </div>
          </el-card>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import api from "./js/server/server";
export default {
  data() {
    return {
      companyInfo: {
        basic: {},
        persons: [],
        shareholders: [],
        alters: []
      },
      taxInfo: {}
    };
  },
  methods: {
    getTaxLevel(str) {
      let dict = {
        '1': 'A',
        '2': 'B',
        '3': 'C',
        '4': 'D',
        '5': 'M',
        '6': '空',
        '7': '其他',
        '8': 'Z',
        '-9999': '缺失'
      };
      return dict[str];
    },
    getTaxType(str) {
      let dict = {
        '1': '一般纳税人',
        '2': '小规模',
        '3': '其他(包括缺失和未知）',
        '-9999': ''
      };
      return dict[str];
    },
    getTaxAmt(str) {
      let dict = {
        '1': '0',
        '2': '(0,0.8),',
        '21': '(0,0.3)',
        '22': '[0.3,0.5)',
        '23': '[0.5,0.8)',
        '3': '[0.8,1)',
        '4': '[1,2)',
        '5': '[2,3)',
        '6': '[3,5)',
        '7': '[5,10)',
        '8': '[10,50)',
        '9': '[50,+)',
        '-9999': ''
      };
      return dict[str];
    },
    getRevenuel(str) {
      let dict = {
        '1': '(-,30)',
        '11': '(-,0)',
        '12': '0',
        '13': '(0,10)',
        '14': '[10,30)',
        '2': '[30,50)',
        '3': '[50,100)',
        '4': '[100,200)',
        '5': '[200,300)',
        '6': '[300,500)',
        '7': '[500,1000)',
        '8': '[1000,2000)',
        '9': '[2000,5000)',
        '10': '[5000,+)',
        '-9999': ''
      };
      return dict[str];
    },
    getRevenueTB(str) {
      let dict = {
        '1': '(-,-80%)',
        '2': '[-80%,-50%)',
        '3': '[-50%,-30%)',
        '4': '[-30%,-25%)',
        '5': '[-25%,-20%)',
        '6': '[-20%,-10%)',
        '7': '[-10%,0)',
        '8': '[0,10%)',
        '9': '[10%,20%)',
        '10': '[20%,30%)',
        '11': '[30%,+)',
        '-9999': ''
      };
      return dict[str];
    },
    getProfitTB(str) {
      let dict = {
        '1': '(-,-50%)',
        '2': '[-50%,-30%)',
        '3': '[-30%,-25%)',
        '4': '[-25%,-20%)',
        '5': '[-20%,-10%)',
        '6': '[-10%,0)',
        '7': '[0,10%)',
        '8': '[10%,20%)',
        '9': '[20%,30%)',
        '10': '[30%,+)',
        '-9999': '近第二年净利润为空',
        '-9998': '近一年净利润为空'
      };
      return dict[str];
    },
    getFeeTax(str) {
      let dict = {
        '1': '0',
        '2': '[1,2)',
        '3': '[2,4)',
        '4': '[4-6)',
        '5': '[6,+)',
        '6': '-9999',
        '-9999': ''
      };
      return dict[str];
    },
    getRatio(str) {
      let dict = {
        '1': '(-,10%)',
        '2': '[10%,20%)',
        '3': '[20%,30%)',
        '4': '[30%,50%)',
        '5': '[50%,70%)',
        '6': '[70%,90%)',
        '7': '[90%,+)',
        '8': '-9999',
        '-9999': ''
      };
      return dict[str];
    },
    getInspect(str) {
      let dict = {
        '1': '0',
        '2': '[1,2)',
        '3': '[2,4)',
        '4': '[4-6)',
        '5': '[6,+)',
        '6': '-9999',
        '-9999': ''
      };
      return dict[str];
    }
  },
  created() {
    let applicationId = this.$route.query.applicationId;
    if (applicationId) {
      this.$MyFetch.get(`${api.cbhb}/${applicationId}`)
      .then((data) => {
        data.companyInfo.shareholders = data.companyInfo.shareholders.sort((a, b) => {
          return b.fundedratio - a.fundedratio;
        });
        data.companyInfo.alters = data.companyInfo.alters.sort((a, b) => {
          return a.altdate > b.altdate ? -1 : 1;
        });
        this.companyInfo = data.companyInfo;
        this.taxInfo = data.taxInfo;
      })
      .catch((e) => {
        this.$error(e.message);
      });
    }
  }
};
</script>

<style lang="less" scoped>
  .invoice {
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: calc(100% - 60px);
    background: #fff;
    z-index: 999;
    overflow: auto;
  }
  .el-container {
    display: block;
  }
  .el-header {
    position: relative;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1.38px;
    color: #333333;
    background: #FFFFFF;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    z-index: 9;
  }
  .el-main {
    padding: 15px 15px 60px;
    background: #F9FAFB;
  }
  .el-card {
    margin-top: 20px;
    &:first-child {
      margin-top: 0;
    }
    /deep/ .el-card__header {
      margin: 0 20px;
      padding: 20px 0;
    }
    section {
      padding: 20px 0;
      border-bottom: 1px solid #E5E5E5;
      &:first-child {
        padding-top: 0;
      }
      &:last-child {
        border-bottom: 0;
        padding-bottom: 0;
      }
    }
    h3 {
      position: relative;
      font-size: 16px;
      font-weight: 600;
      padding-left: 12px;
      color: #333;
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
    h5 {
      color: #333;
      margin-bottom: 12px;
    }
    .content {
      font-size: 14px;
      color: #151515;
      .el-row {
        margin-bottom: 14px;
        &:last-child {
          margin-bottom: 0;
        }
      }
      label {
        color: #999;
        white-space: nowrap;
      }
      .el-col {
        display: flex;
        padding-right: 10px;
      }
      label, span {
        display: block;
      }
    }
  }
  .base-info {
    .content {
      color: #666;
    }
  }
</style>
