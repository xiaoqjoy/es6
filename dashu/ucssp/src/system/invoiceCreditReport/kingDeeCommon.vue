<template>
  <div>
    <div class="invoice">
      <el-container>
        <el-header>企业发票征信报告</el-header>
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
                    <label>纳税人识别号：</label>
                    <span>{{ companyInfo.basic.creditcode }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>统一社会信用代码：</label>
                    <span>{{ companyInfo.basic.creditcode }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>工商注册号：</label>
                    <span>{{ companyInfo.basic.regno }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>注册地址：</label>
                    <span>{{ companyInfo.basic.dom }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>经营地址：</label>
                    <span>{{ companyInfo.basic.workAddress }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>登记机关：</label>
                    <span>{{ companyInfo.basic.regorg }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>注册资金（万元）：</label>
                    <span class="yellow">{{ companyInfo.basic.regcap }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>币种：</label>
                    <span>{{ companyInfo.basic.regcapcur }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>开业日期：</label>
                    <span>{{ companyInfo.basic.esdate }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>经营期限自：</label>
                    <span>{{ companyInfo.basic.opfrom }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>经营期限止：</label>
                    <span>{{ companyInfo.basic.opto }}</span>
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
                <el-row>
                  <el-col :span="4">
                    <label>法人姓名：</label>
                    <span>{{ companyInfo.basic.frname }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>身份证号：</label>
                    <span>{{ companyInfo.basic.identityNum }}</span>
                  </el-col>
                  <el-col :span="4">
                    <label>手机号码：</label>
                    <span>{{ companyInfo.basic.telephoneNum }}</span>
                  </el-col>
                  <el-col :span="4">
                    <label>固定电话：</label>
                    <span>{{ companyInfo.basic.tel }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>邮箱：</label>
                    <span>{{ companyInfo.basic.email }}</span>
                  </el-col>
                </el-row>
                <el-table
                  :data="companyInfo.persons"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr">
                  <el-table-column prop="pername" label="高管姓名"></el-table-column>
                  <el-table-column prop="position" label="职务"></el-table-column>
                  <el-table-column prop="sex" label="性别">
                    <template>
                      <div>
                        -
                      </div>
                    </template>
                  </el-table-column>
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
                  <el-table-column prop="subconam" label="认缴出资额（万元）"></el-table-column>
                  <el-table-column prop="subconam" label="出资金额（万元）"></el-table-column>
                  <el-table-column prop="regcapcur" label="币种"></el-table-column>
                  <el-table-column prop="fundedratio" label="出资占比（%）"></el-table-column>
                  <el-table-column prop="condate" label="出资时间"></el-table-column>
                  <el-table-column prop="country" label="国籍"></el-table-column>
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
                  <el-table-column prop="altdate" label="变更时间"></el-table-column>
                </el-table>
              </section>
            </div>
          </el-card>
          <el-card class="base-info">
            <div slot="header">
              <h3>企业开票基本信息</h3>
            </div>
            <div class="content">
              <section>
                <el-row>
                  <el-col :span="6">
                    <span>最早一张票距今的月份数(月)：</span>
                    <span>{{ invoiceInfo.basicStatistics[0].smaxMonths }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>最近一张票距今的月份数(月)：</span>
                    <span>{{ Math.ceil(invoiceInfo.basicStatistics[0].sminDays / 30) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>当前连续无交易记录天数(天)：</span>
                    <span>{{ invoiceInfo.basicStatistics[0].sminDays }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近1个月开票张数(张)：</span>
                    <span>{{ nearMonthCount(1, "totalCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近1个月开票金额(元)：</span>
                    <span>{{ nearMonthCount(1, "normalAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近1个月开票税额(元)：</span>
                    <span>{{ nearMonthCount(1, "normalTaxAmount") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近3个月开票张数(张)：</span>
                    <span>{{ nearMonthCount(3, "totalCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近3个月开票金额(元)：</span>
                    <span>{{ nearMonthCount(3, "normalAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近3个月开票税额(元)：</span>
                    <span>{{ nearMonthCount(3, "normalTaxAmount") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近6个月开票张数(张)：</span>
                    <span>{{ nearMonthCount(6, "totalCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近6个月开票金额(元)：</span>
                    <span>{{ nearMonthCount(6, "normalAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近6个月开票税额(元)：</span>
                    <span>{{ nearMonthCount(6, "normalTaxAmount") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近12个月开票张数(张)：</span>
                    <span>{{ nearMonthCount(12, "totalCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近12个月开票金额(元)：</span>
                    <span>{{ nearMonthCount(12, "normalAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近12个月开票税额(元)：</span>
                    <span>{{ nearMonthCount(12, "normalTaxAmount") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近24个月开票张数(张)：</span>
                    <span>{{ nearMonthCount(24, "totalCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近24个月开票金额(元)：</span>
                    <span>{{ nearMonthCount(24, "normalAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近24个月开票税额(元)：</span>
                    <span>{{ nearMonthCount(24, "normalTaxAmount") }}</span>
                  </el-col>
                </el-row>
              </section>
              <section>
                <el-row>
                  <el-col :span="6">
                    <span>近1个月红票张数(张)：</span>
                    <span>{{ nearMonthCount(1, "negativeCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近1个月红票金额(元)：</span>
                    <span>{{ nearMonthCount(1, "negativeAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近1个月红票数量占比(%)：</span>
                    <span>{{ nearMonthCountRatio(1, "negativeCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近1个月红票金额占比(%)：</span>
                    <span>{{ nearMonthMoneyRatio(1, "negativeAmount") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近3个月红票张数(张)：</span>
                    <span>{{ nearMonthCount(3, "negativeCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近3个月红票金额(元)：</span>
                    <span>{{ nearMonthCount(3, "negativeAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近3个月红票数量占比(%)：</span>
                    <span>{{ nearMonthCountRatio(3, "negativeCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近3个月红票金额占比(%)：</span>
                    <span>{{ nearMonthMoneyRatio(3, "negativeAmount") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近6个月红票张数(张)：</span>
                    <span>{{ nearMonthCount(6, "negativeCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近6个月红票金额(元)：</span>
                    <span>{{ nearMonthCount(6, "negativeAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近6个月红票数量占比(%)：</span>
                    <span>{{ nearMonthCountRatio(6, "negativeCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近6个月红票金额占比(%)：</span>
                    <span>{{ nearMonthMoneyRatio(6, "negativeAmount") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近12个月红票张数(张)：</span>
                    <span>{{ nearMonthCount(12, "negativeCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近12个月红票金额(元)：</span>
                    <span>{{ nearMonthCount(12, "negativeAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近12个月红票数量占比(%)：</span>
                    <span>{{ nearMonthCountRatio(12, "negativeCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近12个月红票金额占比(%)：</span>
                    <span>{{ nearMonthMoneyRatio(12, "negativeAmount") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近24个月红票张数(张)：</span>
                    <span>{{ nearMonthCount(24, "negativeCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近24个月红票金额(元)：</span>
                    <span>{{ nearMonthCount(24, "negativeAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近24个月红票数量占比(%)：</span>
                    <span>{{ nearMonthCountRatio(24, "negativeCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近24个月红票金额占比(%)：</span>
                    <span>{{ nearMonthMoneyRatio(24, "negativeAmount") }}</span>
                  </el-col>
                </el-row>
              </section>
              <section>
                <el-row>
                  <el-col :span="6">
                    <span>近1个月废票张数(张)：</span>
                    <span>{{ nearMonthCount(1, "voidedCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近1个月废票金额(元)：</span>
                    <span>{{ nearMonthCount(1, "voidedAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近1个月废票数量占比(%)：</span>
                    <span>{{ nearMonthCountRatio(1, "voidedCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近1个月废票金额占比(%)：</span>
                    <span>{{ nearMonthMoneyRatio(1, "voidedAmount") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近3个月废票张数(张)：</span>
                    <span>{{ nearMonthCount(3, "voidedCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近3个月废票金额(元)：</span>
                    <span>{{ nearMonthCount(3, "voidedAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近3个月废票数量占比(%)：</span>
                    <span>{{ nearMonthCountRatio(3, "voidedCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近3个月废票金额占比(%)：</span>
                    <span>{{ nearMonthMoneyRatio(3, "voidedAmount") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近6个月废票张数(张)：</span>
                    <span>{{ nearMonthCount(6, "voidedCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近6个月废票金额(元)：</span>
                    <span>{{ nearMonthCount(6, "voidedAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近6个月废票数量占比(%)：</span>
                    <span>{{ nearMonthCountRatio(6, "voidedCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近6个月废票金额占比(%)：</span>
                    <span>{{ nearMonthMoneyRatio(6, "voidedAmount") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近12个月废票张数(张)：</span>
                    <span>{{ nearMonthCount(12, "voidedCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近12个月废票金额(元)：</span>
                    <span>{{ nearMonthCount(12, "voidedAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近12个月废票数量占比(%)：</span>
                    <span>{{ nearMonthCountRatio(12, "voidedCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近12个月废票金额占比(%)：</span>
                    <span>{{ nearMonthMoneyRatio(12, "voidedAmount") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近24个月废票张数(张)：</span>
                    <span>{{ nearMonthCount(24, "voidedCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近24个月废票金额(元)：</span>
                    <span>{{ nearMonthCount(24, "voidedAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近24个月废票数量占比(%)：</span>
                    <span>{{ nearMonthCountRatio(24, "voidedCount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近24个月废票金额占比(%)：</span>
                    <span>{{ nearMonthMoneyRatio(24, "voidedAmount") }}</span>
                  </el-col>
                </el-row>
              </section>
            </div>
          </el-card>
          <el-card>
            <div slot="header">
              <h3>企业开票明细信息</h3>
            </div>
            <div class="content">
              <section>
                <el-table
                  :data="salesTypes"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr">
                  <el-table-column prop="yearMonth" label="时间"></el-table-column>
                  <el-table-column prop="normalAmount" label="应税销售额（元）"></el-table-column>
                  <el-table-column prop="taxSalesYoY" label="应税销售额同比（%）">
                    <template slot-scope="scope">
                      <div>
                        {{ yearCompare(scope.row.yearMonth) }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="taxSalesChain" label="应税销售额环比（%）">
                    <template slot-scope="scope">
                      <div>
                        {{ monthCompare(scope.row.yearMonth) }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="negativeAmount" label="红票金额（元）">
                    <template slot-scope="scope">
                      <div>
                        {{ Math.abs(scope.row.negativeAmount) }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="voidedAmount" label="废票金额（元）"></el-table-column>
                  <el-table-column prop="totalCount" label="开票数量"></el-table-column>
                  <el-table-column prop="negativeCount" label="红票数量"></el-table-column>
                  <el-table-column prop="voidedCount" label="废票数量"></el-table-column>
                </el-table>
              </section>
            </div>
          </el-card>
          <el-card>
            <div slot="header">
              <h3>企业供应商信息</h3>
            </div>
            <div class="content">
              <section>
                <el-table
                  :data="customerTrade"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr">
                  <el-table-column prop="yearMonth" label="月份"></el-table-column>
                  <el-table-column label="前五客户销售额（万元）">
                    <template slot-scope="scope">
                      <div>{{ (scope.row.sumTop5Amount / 10000).toFixed(2) }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="rateTop5Amount" label="销售占比（%）">
                    <template slot-scope="scope">
                      <div>
                        {{ (scope.row.rateTop5Amount * 100).toFixed(2) }}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="sumTop5Count" label="前五客户销售次数"></el-table-column>
                  <el-table-column prop="rateTop5Count" label="次数占比（%）">
                    <template slot-scope="scope">
                      <div>
                        {{ (scope.row.rateTop5Count * 100).toFixed(2) }}
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </section>
            </div>
          </el-card>
          <el-card>
            <div slot="header">
              <h3>企业销售地区信息</h3>
            </div>
            <div class="content">
              <section>
                <h5>当年前5大销售区域分布</h5>
                <el-table
                  :data="customerArea"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr">
                  <el-table-column prop="area" label="省份"></el-table-column>
                  <el-table-column label="金额（万元）">
                    <template slot-scope="scope">
                      <div>{{ (scope.row.amount / 10000).toFixed(2) }}</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="rate" label="金额占比（%）"></el-table-column>
                  <el-table-column prop="regionDealNum" label="次数">
                    <template>
                      <div>
                        -
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="regionDealNumRatio" label="次数占比（%）">
                    <template>
                      <div>
                        -
                      </div>
                    </template>
                  </el-table-column>
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
      invoiceInfo: {
        basicStatistics: [{}]
      },
      companyInfo: {
        basic: {},
        persons: []
      },
      relDate: new Date(), // 相对日期
      saleBasic: [], // 企业开票基本信息
      salesTypes: [], // 企业开票明细信息
      customerTrade: [], // 企业供应商信息
      customerArea: [], // 企业销售地区信息
      channels: {
        DBOL: '德邦线上',
        WZXK: '微众信科'
      }
    };
  },
  methods: {
    yearCompare(toYear) {
      let tmp = toYear.split("-");
      let lastYear = tmp[0] - 1 + "-" + tmp[1];
      let toYearAmount, lastYearAmount;
      this.salesTypes.forEach((type) => {
        if (type.yearMonth === toYear) {
          toYearAmount = type.normalAmount;
        }
        if (type.yearMonth === lastYear) {
          lastYearAmount = type.normalAmount;
        }
      });
      if (!lastYearAmount) {
        return "0.0";
      }
      return (((toYearAmount / lastYearAmount) - 1) * 100).toFixed(2);
    },
    monthCompare(toMonth) {
      let tmp = toMonth.split("-");
      let month = tmp[1] - 1;
      let year = tmp[0];
      if (month === 0) {
        month = 12;
        year--;
      }
      if (month < 10) {
        month = "0" + month;
      }
      let lastMonth = year + "-" + month;
      let toMonthAmount, lastMonthAmount;
      this.salesTypes.forEach((type) => {
        if (type.yearMonth === toMonth) {
          toMonthAmount = type.normalAmount;
        }
        if (type.yearMonth === lastMonth) {
          lastMonthAmount = type.normalAmount;
        }
      });
      if (!lastMonthAmount) {
        return "0.0";
      }
      return (((toMonthAmount / lastMonthAmount) - 1) * 100).toFixed(2);
    },
    nearMonthCount(num, key) {
      let now = this.$Moment(this.relDate);
      let startNow = now.clone().startOf("month");
      let sum = 0;
      let sales = this.salesTypes;
      if (key === "totalCount" || key === "totalAmount") {
        sales = this.saleBasic;
      }
      sales.forEach((item) => {
        let last = this.$Moment(item.yearMonth);
        let startLast = last.clone().startOf("month");
        let dis = startLast.clone().add(num, "months");
        if (startLast < startNow && dis >= startNow) {
          sum += Math.abs(item[key] - 0);
        }
      });
      return (sum + "").split(".").length > 1 ? sum.toFixed(2) : sum;
    },
    nearMonthCountRatio(num, key) {
      let sum;
      if (key === "negativeCount") {
        sum = this.nearMonthCount(num, "normalCount");
      } else {
        sum = this.nearMonthCount(num, "totalCount");
      }
      if (sum === 0) {
        return -99999;
      }
      let part = this.nearMonthCount(num, key);
      let ratio = Math.abs(part / sum * 100);
      return (ratio + "").split(".").length > 1 ? ratio.toFixed(2) : ratio;
    },
    nearMonthMoneyRatio(num, key) {
      let sum;
      if (key === "negativeAmount") {
        sum = this.nearMonthCount(num, "normalAmount");
      } else {
        sum = this.nearMonthCount(num, "totalAmount");
      }
      if (sum === 0) {
        return -99999;
      }
      let part = this.nearMonthCount(num, key);
      let ratio = Math.abs(part / sum * 100);
      return (ratio + "").split(".").length > 1 ? ratio.toFixed(2) : ratio;
    }
  },
  created() {
    let applicationId = this.$route.query.applicationId;
    let channel = this.$route.query.channel;
    this.$store.dispatch("setSystemName", this.channels[channel] + "发票报告信贷");
    if (applicationId) {
      this.$MyFetch.post(`${api.channel}/${channel}/invoice/${applicationId}`)
      .then((data) => {
        if (data.invoiceInfo) {
          this.invoiceInfo = data.invoiceInfo;
          this.relDate = data.createdDate;
          let relDate = this.relDate.replace(/-/g, "/");
          let relYear = new Date(relDate).getFullYear() - 2;
          let relMonth = new Date(relDate).getMonth();
          let salesTypes = data.invoiceInfo.salesTypes;
          salesTypes.forEach((type) => {
            data.invoiceInfo.saleBasic.forEach((basic) => {
              if (type.yearMonth === basic.yearMonth) {
                type.totalCount = basic.totalCount;
              }
            });
          });
          salesTypes.sort((a, b) => {
            return a.yearMonth > b.yearMonth ? -1 : 1;
          });
          this.salesTypes = salesTypes.filter((type) => {
            let year = type.yearMonth.split("-")[0];
            let month = type.yearMonth.split("-")[1];
            if (year <= relYear && month < relMonth) {
              return false;
            }
            return true;
          });
          this.saleBasic = data.invoiceInfo.saleBasic;
          let customerTrade = data.invoiceInfo.customerTrade;
          customerTrade.sort((a, b) => {
            return a.yearMonth > b.yearMonth ? -1 : 1;
          });
          this.customerTrade = customerTrade.filter((type) => {
            let year = type.yearMonth.split("-")[0];
            let month = type.yearMonth.split("-")[1];
            if (year <= relYear && month < relMonth) {
              return false;
            }
            return true;
          });
          let customerArea = data.invoiceInfo.customerArea;
          customerArea.sort((a, b) => {
            return b.amount - a.amount;
          });
          this.customerArea = customerArea.slice(0, 5);
        }
        if (data.companyInfo) {
          this.companyInfo = data.companyInfo;
        }
        // console.log(this.companyInfo);
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
