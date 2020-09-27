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
                    <span>{{ companyInfo.basic.entname }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>法人姓名：</label>
                    <span>{{ companyInfo.basic.frname }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>登记状态：</label>
                    <span class="yellow">{{ companyInfo.basic.entstatus }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>统一社会信用代码：</label>
                    <span>{{ companyInfo.basic.creditcode }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>注册地址：</label>
                    <span>{{ companyInfo.basic.dom }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>经营地址：</label>
                    <span>{{ companyInfo.basic.workAddress }}</span>
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
                    <label>注册资金（万元）：</label>
                    <span class="yellow">{{ companyInfo.basic.regcap }}</span>
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
                  <el-table-column prop="position" label="高管职务"></el-table-column>
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
          <el-card class="base-info">
            <div slot="header">
              <h3>企业财务信用报告</h3>
            </div>
            <div class="content">
              <section>
                <el-row>
                  <el-col :span="6">
                    <span>账务申请模型得分：</span>
                    <span>{{ invoiceInfo.applyScore }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>记账合作时长：</span>
                    <span>{{ invoiceInfo.coopTime }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>账务完整性模型得分：</span>
                    <span>{{ invoiceInfo.integralityScore }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>内部账务额度：</span>
                    <span>{{ invoiceInfo.innerAccQuota }}</span>
                  </el-col>
                </el-row>
              </section>
            </div>
          </el-card>
          <el-card class="base-info">
            <div slot="header">
              <h3>企业财务报表信息</h3>
            </div>
            <div class="content">
              <section>
                <el-row>
                  <el-col :span="6">
                    <span>近一个月营业收入（万）：</span>
                    <span>{{ yysr(invoiceInfo.yysrOneM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近一个月毛利润（万）：</span>
                    <span>{{ grossProfit(invoiceInfo.grossProfitOneM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近一个月净利润（万）：</span>
                    <span>{{ netProfit(invoiceInfo.netProfitOneM) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近三个月营业收入（万）：</span>
                    <span>{{ yysr(invoiceInfo.yysrThreeM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近三个月毛利润（万）：</span>
                    <span>{{ grossProfit(invoiceInfo.grossProfitThreeM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近三个月净利润（万）：</span>
                    <span>{{ netProfit(invoiceInfo.netProfitThreeM) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近六个月营业收入（万）：</span>
                    <span>{{ yysr(invoiceInfo.yysrSixM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近六个月毛利润（万）：</span>
                    <span>{{ grossProfit(invoiceInfo.grossProfitSixM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近六个月净利润（万）：</span>
                    <span>{{ netProfit(invoiceInfo.netProfitSixM) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近九个月营业收入（万）：</span>
                    <span>{{ yysr(invoiceInfo.yysrNineM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近九个月毛利润（万）：</span>
                    <span>{{ grossProfit(invoiceInfo.grossProfitNineM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近九个月净利润（万）：</span>
                    <span>{{ netProfit(invoiceInfo.netProfitNineM) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近十二个月营业收入（万）：</span>
                    <span>{{ yysr(invoiceInfo.yysrTwM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近十二个月毛利润（万）：</span>
                    <span>{{ grossProfit(invoiceInfo.grossProfitTwM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近十二个月净利润（万）：</span>
                    <span>{{ netProfit(invoiceInfo.netProfitTwM) }}</span>
                  </el-col>
                </el-row>
              </section>
              <section>
                <el-row>
                  <el-col :span="6">
                    <span>近一个月短期借款（万）：</span>
                    <span>{{ shortLoan(invoiceInfo.shortLoanOneM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近一个月长期借款（万）：</span>
                    <span>{{ LongLoan(invoiceInfo.longLoanOneM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近一个月应收账款（万）：</span>
                    <span>{{ receivables(invoiceInfo.receivablesOneM) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近三个月短期借款（万）：</span>
                    <span>{{ shortLoan(invoiceInfo.shortLoanThreeM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近三个月长期借款（万）：</span>
                    <span>{{ LongLoan(invoiceInfo.longLoanThreeM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近三个月应收账款（万）：</span>
                    <span>{{ receivables(invoiceInfo.receivablesThreeM) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近六个月短期借款（万）：</span>
                    <span>{{ shortLoan(invoiceInfo.shortLoanSixM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近六个月长期借款（万）：</span>
                    <span>{{ LongLoan(invoiceInfo.longLoanSixM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近六个月应收账款（万）：</span>
                    <span>{{ receivables(invoiceInfo.receivablesSixM) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近九个月短期借款（万）：</span>
                    <span>{{ shortLoan(invoiceInfo.shortLoanNineM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近九个月长期借款（万）：</span>
                    <span>{{ LongLoan(invoiceInfo.longLoanNineM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近九个月应收账款（万）：</span>
                    <span>{{ receivables(invoiceInfo.receivablesNineM) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近十二个月短期借款（万）：</span>
                    <span>{{ shortLoan(invoiceInfo.shortLoanTwM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近十二个月长期借款（万）：</span>
                    <span>{{ LongLoan(invoiceInfo.longLoanTwM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近十二个月应收账款（万）：</span>
                    <span>{{ receivables(invoiceInfo.receivablesTwM) }}</span>
                  </el-col>
                </el-row>
              </section>
              <section>
                <el-row>
                  <el-col :span="6">
                    <span>近一个月资产总额（万）：</span>
                    <span>{{ totalAssets(invoiceInfo.totalAssetsOneM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近一个月负债总额（万）：</span>
                    <span>{{ totalDebt(invoiceInfo.totalDebtOneM) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近三个月资产总额（万）：</span>
                    <span>{{ totalAssets(invoiceInfo.totalAssetsThreeM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近三个月负债总额（万）：</span>
                    <span>{{ totalDebt(invoiceInfo.totalDebtThreeM) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近六个月资产总额（万）：</span>
                    <span>{{ totalAssets(invoiceInfo.totalAssetsSixM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近六个月负债总额（万）：</span>
                    <span>{{ totalDebt(invoiceInfo.totalDebtSixM) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近九个月资产总额（万）：</span>
                    <span>{{ totalAssets(invoiceInfo.totalAssetsNineM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近九个月负债总额（万）：</span>
                    <span>{{ totalDebt(invoiceInfo.totalDebtNineM) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近十二个月资产总额（万）：</span>
                    <span>{{ totalAssets(invoiceInfo.totalAssetsTwM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近十二个月负债总额（万）：</span>
                    <span>{{ totalDebt(invoiceInfo.totalDebtTwM) }}</span>
                  </el-col>
                </el-row>
              </section>
            </div>
          </el-card>
          <el-card class="base-info">
            <div slot="header">
              <h3>企业上下游信息</h3>
            </div>
            <div class="content">
              <section>
                <el-row>
                  <el-col :span="6">
                    <span>近一个月经销商数量：</span>
                    <span>{{ invoiceInfo.dealerOneMCount }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近一个月进项交易次数：</span>
                    <span>{{ invoiceInfo.jxOneMCount }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近一个月销项交易额（万）：</span>
                    <span>{{ xxAmt(invoiceInfo.xxOneMAmt) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近三个月经销商数量：</span>
                    <span>{{ invoiceInfo.dealerThreeMCount }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近三个月进项交易次数：</span>
                    <span>{{ invoiceInfo.jxThreeMCount }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近三个月销项交易额（万）：</span>
                    <span>{{ xxAmt(invoiceInfo.xxThreeMAmt) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近六个月经销商数量：</span>
                    <span>{{ invoiceInfo.dealerSixMCount }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近六个月进项交易次数：</span>
                    <span>{{ invoiceInfo.jxSixMCount }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近六个月销项交易额（万）：</span>
                    <span>{{ xxAmt(invoiceInfo.xxSixMAmt) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近九个月经销商数量：</span>
                    <span>{{ invoiceInfo.dealerNineMCount }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近九个月进项交易次数：</span>
                    <span>{{ invoiceInfo.jxNineMCount }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近九个月销项交易额（万）：</span>
                    <span>{{ xxAmt(invoiceInfo.xxNineMAmt) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近十二个月经销商数量：</span>
                    <span>{{ invoiceInfo.dealerTwMCount }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近十二个月进项交易次数：</span>
                    <span>{{ invoiceInfo.jxTwMCount }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近十二个月销项交易额（万）：</span>
                    <span>{{ xxAmt(invoiceInfo.xxTwMAmt) }}</span>
                  </el-col>
                </el-row>
              </section>
              <section>
                <el-row>
                  <el-col :span="6">
                    <span>近3个月经销商平均合作时长：</span>
                    <span>{{ jxsAvgTime(invoiceInfo.threeMonJxsAvgTime) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近12个月供应商数量：</span>
                    <span>{{ invoiceInfo.twMonSupCount }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近一个月销项交易次数：</span>
                    <span>{{ invoiceInfo.xxOneMCount }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近3个月有销项交易的月份数：</span>
                    <span>{{ invoiceInfo.threeMonXxMCount }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近一个月进项交易额（万）：</span>
                    <span>{{ jxAmt(invoiceInfo.jxOneMAmt) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近三个月销项交易次数：</span>
                    <span>{{ invoiceInfo.xxThreeMCount }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近6个月经销商数量环比增长率：</span>
                    <span>{{ invoiceInfo.sixMonJxsHbRate }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近三个月进项交易额（万）：</span>
                    <span>{{ jxAmt(invoiceInfo.jxThreeMAmt) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近六个月销项交易次数：</span>
                    <span>{{ invoiceInfo.xxSixMCount }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近12个月最大连续有销项交易月份数：</span>
                    <span>{{ invoiceInfo.twMonHasXxConsecMCount }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近六个月进项交易额（万）：</span>
                    <span>{{ jxAmt(invoiceInfo.jxSixMAmt) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近九个月销项交易次数：</span>
                    <span>{{ invoiceInfo.xxNineMCount }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近12个月最大连续无销项交易月份数：</span>
                    <span>{{ invoiceInfo.twMonNotXxConsecMCount }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近九个月进项交易额（万）：</span>
                    <span>{{ jxAmt(invoiceInfo.jxNineMAmt) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近十二个月销项交易次数：</span>
                    <span>{{ invoiceInfo.xxTwMCount }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近12个月前三大经销商收入占比：</span>
                    <span>{{ threeJxsRate(invoiceInfo.twMonTopThreeJxsRate) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近十二个月进项交易额（万）：</span>
                    <span>{{ jxAmt(invoiceInfo.jxTwMAmt) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近12个月销项交易额环比增长月份数：</span>
                    <span>{{ invoiceInfo.twMonXxAmtHbMCount }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                  </el-col>
                  <el-col :span="6">
                    <span>近3个月有进项交易的月份数：</span>
                    <span>{{ invoiceInfo.threeMonJxMCount }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近6个月销项交易额环比比率：</span>
                    <span>{{ invoiceInfo.sixMonXxHbRate }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                  </el-col>
                  <el-col :span="6">
                    <span>近12个月进项交易额环比增长月份数：</span>
                    <span>{{ invoiceInfo.twMonJxAmtHbMCount }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近6个月销项交易额/进项交易额：</span>
                    <span>{{ XxJxRate(invoiceInfo.sixMonXxJxRate) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                  </el-col>
                  <el-col :span="6">
                    <span>近12个月最大连续进项交易月份数：</span>
                    <span>{{ invoiceInfo.twMonMaxJxConsecMCount }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近12个月销项交易额/进项交易额：</span>
                    <span>{{ XxJxRate(invoiceInfo.twMonXxJxRate) }}</span>
                  </el-col>
                </el-row>
              </section>
            </div>
          </el-card>
          <el-card class="base-info">
            <div slot="header">
              <h3>企业税票工资信息</h3>
            </div>
            <div class="content">
              <section>
                <el-row>
                  <el-col :span="6">
                    <span>近一个月开票收入（万）：</span>
                    <span>{{ billLoad(invoiceInfo.billLoadOneM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近一个月工资支出（万）：</span>
                    <span>{{ payLoad(invoiceInfo.payLoadOneM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近一个月税费支出（万）：</span>
                    <span>{{ taxLoad(invoiceInfo.taxLoadOneM) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近三个月开票收入（万）：</span>
                    <span>{{ billLoad(invoiceInfo.billLoadThreeM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近三个月工资支出（万）：</span>
                    <span>{{ payLoad(invoiceInfo.payLoadThreeM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近三个月税费支出（万）：</span>
                    <span>{{ taxLoad(invoiceInfo.taxLoadThreeM) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近六个月开票收入（万）：</span>
                    <span>{{ billLoad(invoiceInfo.billLoadSixM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近六个月工资支出（万）：</span>
                    <span>{{ payLoad(invoiceInfo.payLoadSixM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近六个月税费支出（万）：</span>
                    <span>{{ taxLoad(invoiceInfo.taxLoadSixM) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近九个月开票收入（万）：</span>
                    <span>{{ billLoad(invoiceInfo.billLoadNineM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近九个月工资支出（万）：</span>
                    <span>{{ payLoad(invoiceInfo.payLoadNineM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近九个月税费支出（万）：</span>
                    <span>{{ taxLoad(invoiceInfo.taxLoadNineM) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近十二个月开票收入（万）：</span>
                    <span>{{ billLoad(invoiceInfo.billLoadTwM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近十二个月工资支出（万）：</span>
                    <span>{{ payLoad(invoiceInfo.payLoadTwM) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近十二个月税费支出（万）：</span>
                    <span>{{ taxLoad(invoiceInfo.taxLoadTwM) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>最早一次交税距今月份数：</span>
                    <span>{{ invoiceInfo.zzsFirst }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>最近一次交税距今月份数：</span>
                    <span>{{ invoiceInfo.zzsLast }}</span>
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
      }, // 基础工商信息
      invoiceInfo: {} // 财务汇总信息
    };
  },
  methods: {
    jxAmt(str) {
      let dict = {
        A: 0,
        B: 5000,
        C: 30000,
        D: 75000,
        E: 150000,
        F: 250000,
        G: 400000,
        H: 750000,
        I: 1500000,
        J: 2000000,
        N: -9999
      };
      return dict[str] || str;
    },
    xxAmt(str) {
      let dict = {
        A: 0,
        B: 5000,
        C: 30000,
        D: 75000,
        E: 150000,
        F: 250000,
        G: 400000,
        H: 750000,
        I: 1500000,
        J: 2000000,
        N: -9999
      };
      return dict[str] || str;
    },
    jxsAvgTime(str) {
      let dict = {
        A: 0,
        B: 2,
        C: 4,
        D: 6.5,
        E: 9,
        F: 11,
        G: 13.5,
        H: 15
      };
      return dict[str] || str;
    },
    XxJxRate(str) {
      let dict = {
        A: 0.25,
        B: 0.65,
        C: 0.9,
        D: 1.25,
        E: 1.75,
        F: 3.5,
        G: 7.5,
        H: 10,
        N: -9999,
        MN: -9998
      };
      return dict[str] || str;
    },
    dealerCount(str) {
      let dict = {
        A: 0,
        B: 1,
        C: 4,
        D: 8,
        E: 13,
        F: 18,
        G: 25,
        H: 30
      };
      return dict[str] || str;
    },
    threeJxsRate(str) {
      let dict = {
        A: 0.1,
        B: 0.3,
        C: 0.45,
        D: 0.55,
        E: 0.65,
        F: 0.75,
        G: 0.85,
        H: 0.9
      };
      return dict[str] || str;
    },
    yysr(str) {
      let dict = {
        A: 0,
        B: 5000,
        C: 30000,
        D: 75000,
        E: 150000,
        F: 250000,
        G: 400000,
        H: 750000,
        I: 1500000,
        J: 2000000,
        N: -9999,
        MN: -9998
      };
      return dict[str] || str;
    },
    grossProfit(str) {
      let dict = {
        A: -20000,
        B: -5000,
        C: 5000,
        D: 20000,
        E: 55000,
        F: 90000,
        G: 150000,
        H: 350000,
        I: 750000,
        J: 1000000,
        N: -9999
      };
      return dict[str] || str;
    },
    netProfit(str) {
      let dict = {
        A: -20000,
        B: -5000,
        C: 5000,
        D: 20000,
        E: 55000,
        F: 90000,
        G: 150000,
        H: 350000,
        I: 750000,
        J: 1000000,
        N: -9999
      };
      return dict[str] || str;
    },
    totalAssets(str) {
      let dict = {
        A: 0,
        B: 5000,
        C: 30000,
        D: 75000,
        E: 150000,
        F: 250000,
        G: 400000,
        H: 750000,
        I: 1500000,
        J: 2000000,
        N: -9999
      };
      return dict[str] || str;
    },
    totalDebt(str) {
      let dict = {
        A: 0,
        B: 5000,
        C: 30000,
        D: 75000,
        E: 150000,
        F: 250000,
        G: 400000,
        H: 750000,
        I: 1500000,
        J: 2000000,
        N: -9999
      };
      return dict[str] || str;
    },
    shortLoan(str) {
      let dict = {
        A: 0,
        B: 5000,
        C: 30000,
        D: 75000,
        E: 150000,
        F: 250000,
        G: 400000,
        H: 750000,
        I: 1500000,
        J: 2000000,
        N: -9999
      };
      return dict[str] || str;
    },
    LongLoan(str) {
      let dict = {
        A: 0,
        B: 5000,
        C: 30000,
        D: 75000,
        E: 150000,
        F: 250000,
        G: 400000,
        H: 750000,
        I: 1500000,
        J: 2000000,
        N: -9999
      };
      return dict[str] || str;
    },
    receivables(str) {
      let dict = {
        A: 0,
        B: 5000,
        C: 30000,
        D: 75000,
        E: 150000,
        F: 250000,
        G: 400000,
        H: 750000,
        I: 1500000,
        J: 2000000,
        N: -9999
      };
      return dict[str] || str;
    },
    billLoad(str) {
      let dict = {
        A: 0,
        B: 5000,
        C: 30000,
        D: 75000,
        E: 150000,
        F: 250000,
        G: 400000,
        H: 750000,
        I: 1500000,
        J: 2000000,
        N: -9999
      };
      return dict[str] || str;
    },
    payLoad(str) {
      let dict = {
        A: 0,
        B: 5000,
        C: 15000,
        D: 40000,
        E: 65000,
        F: 90000,
        G: 150000,
        H: 250000,
        I: 400000,
        J: 500000,
        N: -9999
      };
      return dict[str] || str;
    },
    taxLoad(str) {
      let dict = {
        A: 0,
        B: 5,
        C: 30,
        D: 75,
        E: 300,
        F: 750,
        G: 3000,
        H: 7500,
        I: 10000,
        N: -9999
      };
      return dict[str] || str;
    }
  },
  created() {
    let applicationId = this.$route.query.applicationId;
    this.$MyFetch.post(`${api.channel}/HXD/invoice/${applicationId}`)
    .then((data) => {
      this.companyInfo = data.companyInfo;
      this.invoiceInfo = data.invoiceInfo;
    })
    .catch((e) => {
      this.$error(e.message);
    });
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
  }
  .el-container {
    height: 100%;
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
    background: #ececec;
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
      border-bottom: 1px solid #d0d0d0;
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
      color: #000;
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
      color: #000;
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
