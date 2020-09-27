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
                    <span>{{ diffMonth(dealRecordInfo.minInvoiceDate) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>最近一张票距今的月份数(月)：</span>
                    <span>{{ diffMonth(dealRecordInfo.maxInvoiceDate) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>当前连续无交易记录天数(天)：</span>
                    <span>{{ dealRecordInfo.nonDealDays }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近1个月开票张数(张)：</span>
                    <span>{{ nearMonthCount(1, "validNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近1个月开票金额(元)：</span>
                    <span>{{ nearMonthCount(1, "taxSales") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近1个月开票税额(元)：</span>
                    <span>{{ nearMonthCount(1, "taxAmt") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近3个月开票张数(张)：</span>
                    <span>{{ nearMonthCount(3, "validNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近3个月开票金额(元)：</span>
                    <span>{{ nearMonthCount(3, "taxSales") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近3个月开票税额(元)：</span>
                    <span>{{ nearMonthCount(3, "taxAmt") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近6个月开票张数(张)：</span>
                    <span>{{ nearMonthCount(6, "validNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近6个月开票金额(元)：</span>
                    <span>{{ nearMonthCount(6, "taxSales") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近6个月开票税额(元)：</span>
                    <span>{{ nearMonthCount(6, "taxAmt") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近12个月开票张数(张)：</span>
                    <span>{{ nearMonthCount(12, "validNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近12个月开票金额(元)：</span>
                    <span>{{ nearMonthCount(12, "taxSales") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近12个月开票税额(元)：</span>
                    <span>{{ nearMonthCount(12, "taxAmt") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近24个月开票张数(张)：</span>
                    <span>{{ nearMonthCount(24, "validNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近24个月开票金额(元)：</span>
                    <span>{{ nearMonthCount(24, "taxSales") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近24个月开票税额(元)：</span>
                    <span>{{ nearMonthCount(24, "taxAmt") }}</span>
                  </el-col>
                </el-row>
              </section>
              <section>
                <el-row>
                  <el-col :span="6">
                    <span>近1个月红票张数(张)：</span>
                    <span>{{ nearMonthCount(1, "redNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近1个月红票金额(元)：</span>
                    <span>{{ nearMonthCount(1, "redAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近1个月红票数量占比(%)：</span>
                    <span>{{ nearMonthCountRatio(1, "redNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近1个月红票金额占比(%)：</span>
                    <span>{{ nearMonthMoneyRatio(1, "redAmount") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近3个月红票张数(张)：</span>
                    <span>{{ nearMonthCount(3, "redNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近3个月红票金额(元)：</span>
                    <span>{{ nearMonthCount(3, "redAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近3个月红票数量占比(%)：</span>
                    <span>{{ nearMonthCountRatio(3, "redNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近3个月红票金额占比(%)：</span>
                    <span>{{ nearMonthMoneyRatio(3, "redAmount") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近6个月红票张数(张)：</span>
                    <span>{{ nearMonthCount(6, "redNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近6个月红票金额(元)：</span>
                    <span>{{ nearMonthCount(6, "redAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近6个月红票数量占比(%)：</span>
                    <span>{{ nearMonthCountRatio(6, "redNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近6个月红票金额占比(%)：</span>
                    <span>{{ nearMonthMoneyRatio(6, "redAmount") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近12个月红票张数(张)：</span>
                    <span>{{ nearMonthCount(12, "redNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近12个月红票金额(元)：</span>
                    <span>{{ nearMonthCount(12, "redAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近12个月红票数量占比(%)：</span>
                    <span>{{ nearMonthCountRatio(12, "redNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近12个月红票金额占比(%)：</span>
                    <span>{{ nearMonthMoneyRatio(12, "redAmount") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近24个月红票张数(张)：</span>
                    <span>{{ nearMonthCount(24, "redNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近24个月红票金额(元)：</span>
                    <span>{{ nearMonthCount(24, "redAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近24个月红票数量占比(%)：</span>
                    <span>{{ nearMonthCountRatio(24, "redNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近24个月红票金额占比(%)：</span>
                    <span>{{ nearMonthMoneyRatio(24, "redAmount") }}</span>
                  </el-col>
                </el-row>
              </section>
              <section>
                <el-row>
                  <el-col :span="6">
                    <span>近1个月废票张数(张)：</span>
                    <span>{{ nearMonthCount(1, "invalidNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近1个月废票金额(元)：</span>
                    <span>{{ nearMonthCount(1, "devilAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近1个月废票数量占比(%)：</span>
                    <span>{{ nearMonthCountRatio(1, "invalidNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近1个月废票金额占比(%)：</span>
                    <span>{{ nearMonthMoneyRatio(1, "devilAmount") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近3个月废票张数(张)：</span>
                    <span>{{ nearMonthCount(3, "invalidNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近3个月废票金额(元)：</span>
                    <span>{{ nearMonthCount(3, "devilAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近3个月废票数量占比(%)：</span>
                    <span>{{ nearMonthCountRatio(3, "invalidNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近3个月废票金额占比(%)：</span>
                    <span>{{ nearMonthMoneyRatio(3, "devilAmount") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近6个月废票张数(张)：</span>
                    <span>{{ nearMonthCount(6, "invalidNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近6个月废票金额(元)：</span>
                    <span>{{ nearMonthCount(6, "devilAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近6个月废票数量占比(%)：</span>
                    <span>{{ nearMonthCountRatio(6, "invalidNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近6个月废票金额占比(%)：</span>
                    <span>{{ nearMonthMoneyRatio(6, "devilAmount") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近12个月废票张数(张)：</span>
                    <span>{{ nearMonthCount(12, "invalidNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近12个月废票金额(元)：</span>
                    <span>{{ nearMonthCount(12, "devilAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近12个月废票数量占比(%)：</span>
                    <span>{{ nearMonthCountRatio(12, "invalidNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近12个月废票金额占比(%)：</span>
                    <span>{{ nearMonthMoneyRatio(12, "devilAmount") }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <span>近24个月废票张数(张)：</span>
                    <span>{{ nearMonthCount(24, "invalidNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近24个月废票金额(元)：</span>
                    <span>{{ nearMonthCount(24, "devilAmount") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近24个月废票数量占比(%)：</span>
                    <span>{{ nearMonthCountRatio(24, "invalidNum") }}</span>
                  </el-col>
                  <el-col :span="6">
                    <span>近24个月废票金额占比(%)：</span>
                    <span>{{ nearMonthMoneyRatio(24, "devilAmount") }}</span>
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
                  :data="salesInvoiceInfo"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr">
                  <el-table-column prop="month" label="时间"></el-table-column>
                  <el-table-column prop="taxSales" label="应税销售额（元）"></el-table-column>
                  <el-table-column prop="taxSalesYoY" label="应税销售额同比（%）"></el-table-column>
                  <el-table-column prop="taxSalesChain" label="应税销售额环比（%）"></el-table-column>
                  <el-table-column prop="redAmount" label="红票金额（元）"></el-table-column>
                  <el-table-column prop="devilAmount" label="废票金额（元）"></el-table-column>
                  <el-table-column prop="validNum" label="开票数量"></el-table-column>
                  <el-table-column prop="redNum" label="红票数量"></el-table-column>
                  <el-table-column prop="invalidNum" label="废票数量"></el-table-column>
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
                  :data="downCustomerList"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr">
                  <el-table-column prop="season" label="季度"></el-table-column>
                  <el-table-column prop="saleAmount" label="前五客户销售额（万元）"></el-table-column>
                  <el-table-column prop="saleAmountRatio" label="销售占比（%）"></el-table-column>
                  <el-table-column prop="dealNum" label="前五客户销售次数"></el-table-column>
                  <el-table-column prop="dealNumRatio" label="次数占比（%）"></el-table-column>
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
                  :data="saleRegionListToYear"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr">
                  <el-table-column prop="customerProvince" label="省份"></el-table-column>
                  <el-table-column prop="regionDealAmount" label="金额（万元）"></el-table-column>
                  <el-table-column prop="regionDealAmountRatio" label="金额占比（%）"></el-table-column>
                  <el-table-column prop="regionDealNum" label="次数"></el-table-column>
                  <el-table-column prop="regionDealNumRatio" label="次数占比（%）"></el-table-column>
                </el-table>
              </section>
              <section>
                <h5>上一年前5大销售区域分布</h5>
                <el-table
                  :data="saleRegionListLastYear"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr">
                  <el-table-column prop="customerProvince" label="省份"></el-table-column>
                  <el-table-column prop="regionDealAmount" label="金额（万元）"></el-table-column>
                  <el-table-column prop="regionDealAmountRatio" label="金额占比（%）"></el-table-column>
                  <el-table-column prop="regionDealNum" label="次数"></el-table-column>
                  <el-table-column prop="regionDealNumRatio" label="次数占比（%）"></el-table-column>
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
      invoiceInfo: {}, // 发票汇总信息
      relDate: new Date(), // 相对日期
      dealRecordInfo: {}, // 企业开票基本信息
      salesInvoiceInfo: [], // 企业开票明细信息
      downCustomerList: [], // 企业供应商信息
      saleRegionList: [], // 企业销售地区信息
      channels: {
        THJK: '通华金科',
        XWKJ: '小望科技',
        BWGF: '百望股份',
        SFOL: '顺丰金融'
      }
    };
  },
  computed: {
    // 当前前5大销售区域分布
    saleRegionListToYear() {
      let saleRegionList = this.saleRegionList.filter((item) => {
        return (item.year.substring(0, 4) - 0) === (this.relDate.getFullYear() - 0);
      });
      return this.saleRegionFilter(saleRegionList);
    },
    // 上一年前5大销售区域分布
    saleRegionListLastYear() {
      let saleRegionList = this.saleRegionList.filter((item) => {
        return (item.year.substring(0, 4) - 0) === (this.relDate.getFullYear() - 1);
      });
      return this.saleRegionFilter(saleRegionList);
    }
  },
  methods: {
    diffMonth(date) {
      let StartDate = this.$Moment(date);
      let EndDate = this.$Moment(this.relDate);
      let len = 0;
      while (StartDate <= EndDate) {
        len++;
        StartDate = StartDate.add(1, 'months');
      }
      return len;
    },
    nearMonthCount(num, key) {
      let now = this.$Moment(this.relDate);
      let startNow = now.clone().startOf("month");
      let sum = 0;
      this.salesInvoiceInfo.forEach((item) => {
        let last;
        if (item.month.indexOf("-") > -1) {
          last = this.$Moment(item.month);
        } else {
          last = this.$Moment(item.month.substring(0, 4) + "-" + item.month.substring(4, 6));
        }
        let startLast = last.clone().startOf("month");
        let dis = startLast.clone().add(num, "months");
        if (startLast < startNow && dis >= startNow) {
          sum += Math.abs(item[key] - 0);
        }
      });
      return (sum + "").split(".").length > 1 ? sum.toFixed(2) : sum;
    },
    nearMonthCountRatio(num, key) {
      let sum = this.nearMonthCount(num, "validNum");
      if (sum === 0) {
        return -99999;
      }
      let part = this.nearMonthCount(num, key);
      let ratio = Math.abs(part / sum * 100);
      return (ratio + "").split(".").length > 1 ? ratio.toFixed(4) : ratio;
    },
    nearMonthMoneyRatio(num, key) {
      let sum = this.nearMonthCount(num, "taxSales");
      if (sum === 0) {
        return -99999;
      }
      let part = this.nearMonthCount(num, key);
      let ratio = Math.abs(part / sum * 100);
      return (ratio + "").split(".").length > 1 ? ratio.toFixed(4) : ratio;
    },
    saleRegionFilter(list) {
      let regions = [];
      list.forEach((region) => {
        let flag = false;
        for (let i = 0; i < regions.length; i++) {
          if (regions[i].customerProvince === region.customerProvince) {
            flag = true;
            regions[i].regionDealAmount = (parseFloat(regions[i].regionDealAmount) + parseFloat(region.regionDealAmount)).toFixed(4);
            regions[i].regionDealNum = parseInt(regions[i].regionDealNum) + parseInt(region.regionDealNum);
          }
        }
        if (!flag) {
          regions.push(region);
        }
      });
      let sumAmount = 0;
      let numAmount = 0;
      regions.forEach((region, index) => {
        sumAmount += parseFloat(region.regionDealAmount);
        numAmount += parseInt(region.regionDealNum);
      });
      regions.forEach((region) => {
        region.regionDealAmountRatio = (region.regionDealAmount / sumAmount * 100).toFixed(2);
        region.regionDealNumRatio = (region.regionDealNum / numAmount * 100).toFixed(2);
      });
      return regions.sort((a, b) => b.regionDealAmount - a.regionDealAmount).splice(0, 5);
    }
  },
  created() {
    let applicationId = this.$route.query.applicationId;
    let channel = this.$route.query.channel;
    this.$store.dispatch("setSystemName", this.channels[channel] + "发票报告信贷");
    if (applicationId) {
      this.$MyFetch.post(`${api.channel}/${channel}/invoice/${applicationId}`)
      .then((data) => {
        this.companyInfo = data.companyInfo;
        this.invoiceInfo = data.invoiceInfo;
        this.relDate = new Date(data.createdDate.replace(/-/g, "/"));
        if (data.invoiceInfo) {
          if (data.invoiceInfo.busiData) {
            this.dealRecordInfo = data.invoiceInfo.busiData.dealRecordInfo;
            this.salesInvoiceInfo = data.invoiceInfo.busiData.salesInvoiceInfo.reverse();
            this.downCustomerList = data.invoiceInfo.busiData.downCustomerList.reverse();
            this.saleRegionList = data.invoiceInfo.busiData.saleRegionList;
          } else {
            this.dealRecordInfo = data.invoiceInfo.dealRecordInfo;
            this.salesInvoiceInfo = data.invoiceInfo.salesInvoiceInfo.reverse();
            this.downCustomerList = data.invoiceInfo.downCustomerList.reverse();
            this.saleRegionList = data.invoiceInfo.saleRegionList;
          }
        }
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
