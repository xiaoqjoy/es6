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
                  <el-col :span="6">
                    <label>企业名称：</label>
                    <span>{{ invoiceInfo.dsjrJbxx.baseinfoVo.nsrmc }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>法人姓名：</label>
                    <span>{{ companyInfo.basic.frname }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>纳税人状态：</label>
                    <span>{{ invoiceInfo.dsjrJbxx.baseinfoVo.nsrzt }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>纳税人识别号：</label>
                    <span>{{ invoiceInfo.dsjrJbxx.baseinfoVo.nsrsbh }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>注册地址：</label>
                    <span>{{ invoiceInfo.dsjrJbxx.baseinfoVo.zcdz }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>当前是否欠税：</label>
                    <span>{{ invoiceInfo.dsjrJbxx.baseinfoVo.taxCurrPayUpSys }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>企业类型：</label>
                    <span>{{ companyInfo.basic.enttype }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>行业：</label>
                    <span>{{ companyInfo.basic.industryphyname }} - {{ companyInfo.basic.industryconame }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>注册资金：</label>
                    <span>{{ companyInfo.basic.regcap }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>币种：</label>
                    <span>{{ companyInfo.basic.regcapcur }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>营业期限起：</label>
                    <span>{{ companyInfo.basic.opfrom }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>营业期限止：</label>
                    <span>{{ companyInfo.basic.opto }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>纳税信用评级：</label>
                    <span>{{ invoiceInfo.dsjrJbxx.baseinfoVo.pjjg }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>纳税类型：</label>
                    <span>{{ invoiceInfo.dsjrJbxx.baseinfoVo.nsrzglx }}</span>
                  </el-col>
                  <el-col :span="6">
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
                  row-class-name="table-tr"
                >
                  <el-table-column prop="pername" label="高管姓名"></el-table-column>
                  <el-table-column prop="position" label="高管职务"></el-table-column>
                </el-table>
              </section>
              <section>
                <h5>股东出资情况</h5>
                <el-table
                  :data="companyInfo.shareholders"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr"
                >
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
                  row-class-name="table-tr"
                >
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
              <h3>企业纳税征收基本信息</h3>
            </div>
            <div class="content">
              <section>
                <el-row>
                  <el-col :span="6">
                    <label>最近一次增值税实缴距今月份数：</label>
                    <span>{{ blazeVaris.zZSSJMthLast }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>最近一次企业所得税实缴距今月份数：</label>
                    <span>{{ blazeVaris.qSDSSJMthLast }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>最近一次增值税申报距今月份数：</label>
                    <span>{{ blazeVaris.zZSJJMthLast }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>最近一次企业所得税申报距今月份数：</label>
                    <span>{{ blazeVaris.qSDSJJMthLast }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>最近12个月欠税月份数：</label>
                    <span>{{ blazeVaris.qSNL12 }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>最近12个月违法违规月份数：</label>
                    <span>{{ blazeVaris.wGMthL12 }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>最近12个月税务稽查月份数：</label>
                    <span>{{ blazeVaris.jcMthL12 }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>最近一年下游交易金额：</label>
                    <span>{{ blazeVaris.l1StYLowerAmt }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>最近3个月缴纳所得税金额：</label>
                    <span>{{ blazeVaris.taxSDL3MPayAmtSys }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>最近6个月缴纳所得税金额：</label>
                    <span>{{ blazeVaris.taxSDL6MPayAmtSys }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>最近12个月缴纳所得税金额：</label>
                    <span>{{ blazeVaris.taxSDL12MPayAmtSys }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>最近24个月缴纳所得税金额：</label>
                    <span>{{ blazeVaris.taxSDL24MPayAmtSys }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>最近3个月缴纳增值税金额：</label>
                    <span>{{ blazeVaris.taxZZL3MPayAmtSys }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>最近6个月缴纳增值税金额：</label>
                    <span>{{ blazeVaris.taxZZL6MPayAmtSys }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>最近12个月缴纳增值税金额：</label>
                    <span>{{ blazeVaris.taxZZL12MPayAmtSys }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>最近24个月缴纳增值税金额：</label>
                    <span>{{ blazeVaris.taxZZL24MPayAmtSys }}</span>
                  </el-col>
                </el-row>
              </section>
            </div>
          </el-card>
          <el-card>
            <div slot="header">
              <h3>企业纳税征收明细信息</h3>
            </div>
            <div class="content">
              <section>
                <h5>增值税征收明细</h5>
                <el-table
                  :data="invoiceInfo.dsjrNszsxx.zzsVoList"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr"
                >
                  <el-table-column prop="skssq" label="所属期"></el-table-column>
                  <el-table-column prop="yzfsrq" label="缴款发生日期"></el-table-column>
                  <el-table-column prop="zsxmMc" label="征收项目名称"></el-table-column>
                  <el-table-column prop="zspmMc" label="征收品目名称"></el-table-column>
                  <el-table-column prop="jsyj" label="计税金额（万元）"></el-table-column>
                  <el-table-column prop="ynse" label="应缴金额（万元）"></el-table-column>
                  <el-table-column prop="ybtse" label="实缴金额（万元）"></el-table-column>
                  <el-table-column prop="sl" label="税率"></el-table-column>
                </el-table>
              </section>
              <section>
                <h5>企业所得税征收明细</h5>
                <el-table
                  :data="invoiceInfo.dsjrNszsxx.qysdsVoList"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr"
                >
                  <el-table-column prop="skssq" label="所属期"></el-table-column>
                  <el-table-column prop="yzfsrq" label="缴款发生日期"></el-table-column>
                  <el-table-column prop="zsxmMc" label="征收项目名称"></el-table-column>
                  <el-table-column prop="zspmMc" label="征收品目名称"></el-table-column>
                  <el-table-column prop="jsyj" label="计税金额（万元）"></el-table-column>
                  <el-table-column prop="ynse" label="应缴金额（万元）"></el-table-column>
                  <el-table-column prop="ybtse" label="实缴金额（万元）"></el-table-column>
                  <el-table-column prop="sl" label="税率"></el-table-column>
                </el-table>
              </section>
            </div>
          </el-card>
        </el-main>
      </el-container>
      <el-container>
        <el-header>企业发票明细信息</el-header>
        <el-main>
          <el-card class="base-info">
            <div class="content">
              <section>
                <h5>年度发票汇总数据</h5>
                <el-table
                  :data="invoiceInfo.dsjrQyfpsj.qyfpxxList"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr"
                >
                  <el-table-column prop="nd" label="年度"></el-table-column>
                  <el-table-column prop="xsfSl" label="上游供应商数量（个）"></el-table-column>
                  <el-table-column prop="jyzsSy" label="上游供应商交易次数（次）"></el-table-column>
                  <el-table-column prop="jyjeSy" label="上游供应商交易金额（万元）"></el-table-column>
                  <el-table-column prop="gmfSl" label="下游经销商数量(个)"></el-table-column>
                  <el-table-column prop="jyzsXy" label="下游经销商交易次数(次)"></el-table-column>
                  <el-table-column prop="jyjeXy" label="下游经销商交易金额(万元)"></el-table-column>
                  <el-table-column prop="sfZc" label="水、电、燃、热、运输支出（万元）"></el-table-column>
                </el-table>
              </section>
              <section>
                <h5>最近一年Top10上游供应商</h5>
                <el-table
                  :data="list2top(invoiceInfo.dsjrQyfpsj.ndQyfpsygysList)"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr"
                >
                  <el-table-column prop="nd" label="年度"></el-table-column>
                  <el-table-column prop="xsfMc" label="供应商名称"></el-table-column>
                  <el-table-column prop="jyje" label="交易金额(万元)"></el-table-column>
                  <el-table-column prop="zb" label="占比(%)"></el-table-column>
                  <el-table-column prop="jyzs" label="交易次数(次)"></el-table-column>
                </el-table>
              </section>
              <section>
                <h5>最近一年Top10上游原材料</h5>
                <el-table
                  :data="list2top(invoiceInfo.dsjrQyfpsj.ndQyfpsyyclist)"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr"
                >
                  <el-table-column prop="nd" label="年度"></el-table-column>
                  <el-table-column prop="yclmc" label="原材料名称"></el-table-column>
                  <el-table-column prop="jyje" label="交易金额(万元)"></el-table-column>
                  <el-table-column prop="zb" label="占比(%)"></el-table-column>
                  <el-table-column prop="jyzs" label="交易次数(次)"></el-table-column>
                </el-table>
              </section>
              <section>
                <h5>最近一年Top10下游经销商</h5>
                <el-table
                  :data="list2top(invoiceInfo.dsjrQyfpsj.ndQyfpxyjxsList)"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr"
                >
                  <el-table-column prop="nd" label="年度"></el-table-column>
                  <el-table-column prop="gmfMc" label="供应商名称"></el-table-column>
                  <el-table-column prop="jyje" label="交易金额(万元)"></el-table-column>
                  <el-table-column prop="zb" label="占比(%)"></el-table-column>
                  <el-table-column prop="jyzs" label="交易次数(次)"></el-table-column>
                </el-table>
              </section>
              <section>
                <h5>最近一年Top10下游产品</h5>
                <el-table
                  :data="list2top(invoiceInfo.dsjrQyfpsj.ndQyfpxycpList)"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr"
                >
                  <el-table-column prop="nd" label="年度"></el-table-column>
                  <el-table-column prop="cpMc" label="原材料名称"></el-table-column>
                  <el-table-column prop="jyje" label="交易金额(万元)"></el-table-column>
                  <el-table-column prop="zb" label="占比(%)"></el-table-column>
                  <el-table-column prop="jyzs" label="交易次数(次)"></el-table-column>
                </el-table>
              </section>
            </div>
          </el-card>
          <el-card>
            <div slot="header">
              <h3>企业利润表明细信息</h3>
            </div>
            <div class="content">
              <section>
                <el-table
                  :data="invoiceInfo.qycwbbList"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr"
                >
                  <el-table-column prop="nd" label="年度"></el-table-column>
                  <el-table-column prop="yysr" label="营业收入（万元）"></el-table-column>
                  <el-table-column prop="mlr" label="毛利润（万元）"></el-table-column>
                  <el-table-column prop="mll" label="毛利率"></el-table-column>
                  <el-table-column prop="jlr" label="净利润"></el-table-column>
                  <el-table-column prop="jll" label="净利率"></el-table-column>
                  <el-table-column prop="lrbSbcis" label="利润表申报次数"></el-table-column>
                </el-table>
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
      }, // 基础工商信息
      invoiceInfo: {
        dsjrJbxx: {
          baseinfoVo: {}
        },
        dsjrNszsxx: {},
        dsjrQyfpsj: {}
      }, // 发票汇总信息
      blazeVaris: {}
    };
  },
  methods: {
    list2top(list) {
      if (list && list.length > 0) {
        list = list.slice().sort((a, b) => {
          return b - a;
        });
        list = list[0];
        let records = list.records;
        let nd = list.nd;
        records.forEach((item) => {
          item.nd = nd;
        });
        return records;
      } else {
        return [];
      }
    }
  },
  created() {
    let applicationId = this.$route.query.applicationId;
    if (applicationId) {
      this.$MyFetch
        .post(`${api.channel}/JCOL/invoice/${applicationId}`)
        .then(data => {
          this.blazeVaris = data.blazeVaris;
          data.companyInfo.shareholders = data.companyInfo.shareholders.sort((a, b) => {
            if (a.subconam > b.subconam) {
              return -1;
            } else {
              return 1;
            }
          });
          data.companyInfo.alters = data.companyInfo.alters.sort((a, b) => {
            if (a.altdate > b.altdate) {
              return -1;
            } else {
              return 1;
            }
          });
          this.companyInfo = data.companyInfo;
          data.invoiceInfo.dsjrQyfpsj.qyfpxxList.forEach((item) => {
            for (let key in item.record) {
              item[key] = item.record[key];
            }
          });
          data.invoiceInfo.qycwbbList.forEach((item) => {
            for (let key in item.record) {
              item[key] = item.record[key];
            }
          });
          data.invoiceInfo.qycwbbList = data.invoiceInfo.qycwbbList.sort((a, b) => {
            if (a.nd > b.nd) {
              return -1;
            } else {
              return 1;
            }
          });
          data.invoiceInfo.dsjrNszsxx.zzsVoList = data.invoiceInfo.dsjrNszsxx.zzsVoList.sort((a, b) => {
            if (a.yzfsrq > b.yzfsrq) {
              return -1;
            } else {
              return 1;
            }
          });
          data.invoiceInfo.dsjrNszsxx.qysdsVoList = data.invoiceInfo.dsjrNszsxx.qysdsVoList.sort((a, b) => {
            if (a.yzfsrq > b.yzfsrq) {
              return -1;
            } else {
              return 1;
            }
          });
          data.invoiceInfo.dsjrQyfpsj.qyfpxxList = data.invoiceInfo.dsjrQyfpsj.qyfpxxList.sort((a, b) => {
            if (a.nd > b.nd) {
              return -1;
            } else {
              return 1;
            }
          });
          this.invoiceInfo = data.invoiceInfo;
        })
        .catch(e => {
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
  background: #ffffff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 9;
}
.el-main {
  padding: 15px 15px 60px;
  background: #f9fafb;
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
    border-bottom: 1px solid #e5e5e5;
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
      background: #538bf1;
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
    label,
    span {
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
