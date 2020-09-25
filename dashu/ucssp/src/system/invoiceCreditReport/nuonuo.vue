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
                    <span>{{ basicInfo.enterpriseName }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>法人姓名：</label>
                    <span>{{ basicInfo.legalName }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>登记状态：</label>
                    <span class="yellow">{{ basicInfo.registrationState }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>纳税人识别号：</label>
                    <span>{{ basicInfo.taxpayerIdentityNum }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>统一社会信用代码：</label>
                    <span>{{ basicInfo.creditCode }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>工商注册号：</label>
                    <span>{{ basicInfo.registNo }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>注册地址：</label>
                    <span>{{ basicInfo.registAddress }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>经营地址：</label>
                    <span>{{ basicInfo.workAddress }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>登记机关：</label>
                    <span>{{ basicInfo.registInstiution }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>注册资金（万元）：</label>
                    <span class="yellow">{{ (basicInfo.registedFound) / 10000 }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>币种：</label>
                    <span>{{ basicInfo.currencyType }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>开业日期：</label>
                    <span>{{ basicInfo.esDate }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>经营期限自：</label>
                    <span>{{ basicInfo.manageTremStart }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>经营期限止：</label>
                    <span>{{ basicInfo.manageTremEnd }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>企业类型：</label>
                    <span>{{ code2type(basicInfo.companyType) || "" }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>行业：</label>
                    <span>{{ basicInfo.mainIndustryName }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <label>经营范围：</label>
                    <span>{{ basicInfo.businessScope }}</span>
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
                    <span>{{ legalUserInfo.legalName }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>身份证号：</label>
                    <span>{{ legalUserInfo.identityNum }}</span>
                  </el-col>
                  <el-col :span="4">
                    <label>手机号码：</label>
                    <span>{{ legalUserInfo.mobilePhoneNum }}</span>
                  </el-col>
                  <el-col :span="4">
                    <label>固定电话：</label>
                    <span>{{ legalUserInfo.telephoneNum }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>邮箱：</label>
                    <span>{{ legalUserInfo.email }}</span>
                  </el-col>
                </el-row>
                <el-table
                  :data="egsManagersList"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr">
                  <el-table-column prop="perName" label="高管姓名"></el-table-column>
                  <el-table-column prop="position" label="职务"></el-table-column>
                  <el-table-column prop="sex" label="性别"></el-table-column>
                </el-table>
              </section>
              <section>
                <h5>股东出资情况</h5>
                <el-table
                  :data="egsShareholdersList"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr">
                  <el-table-column prop="partnerName" label="股东名称"></el-table-column>
                  <el-table-column prop="subConAm" label="认缴出资额（万元）"></el-table-column>
                  <el-table-column prop="shareAmount" label="出资金额（万元）"></el-table-column>
                  <el-table-column prop="currencyType" label="币种"></el-table-column>
                  <el-table-column prop="fundedRatio" label="出资占比（%）"></el-table-column>
                  <el-table-column prop="conDate" label="出资时间"></el-table-column>
                  <el-table-column prop="country" label="国籍"></el-table-column>
                </el-table>
              </section>
              <section>
                <h5>企业变更信息</h5>
                <el-table
                  :data="egsChangeRecordsList"
                  class="common__table"
                  header-cell-class-name="table-head"
                  row-class-name="table-tr">
                  <el-table-column type="index" width="50" label=" "></el-table-column>
                  <el-table-column prop="changeItem" label="变更事项"></el-table-column>
                  <el-table-column prop="beforeChangeInfo" label="变更前内容"></el-table-column>
                  <el-table-column prop="afterChangeInfo" label="变更后内容"></el-table-column>
                  <el-table-column prop="changeDate" label="变更时间"></el-table-column>
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
      relDate: new Date(), // 相对日期
      basicInfo: {}, // 企业基本信息
      legalUserInfo: {}, // 法人信息
      egsManagersList: [], // 股东信息
      egsShareholdersList: [], // 股东出资情况
      egsChangeRecordsList: [], // 企业变更信息
      dealRecordInfo: {}, // 企业开票基本信息
      salesInvoiceInfo: [], // 企业开票明细信息
      downCustomerList: [], // 企业供应商信息
      saleRegionList: [] // 企业销售地区信息
    };
  },
  computed: {
    // 当前前5大销售区域分布
    saleRegionListToYear() {
      let saleRegionList = this.saleRegionList.filter((item) => {
        return (item.year - 0) === this.relDate.getFullYear();
      });
      return saleRegionList.splice(0, 5);
    },
    // 上一年前5大销售区域分布
    saleRegionListLastYear() {
      let saleRegionList = this.saleRegionList.filter((item) => {
        return (item.year - 0) === (this.relDate.getFullYear() - 1);
      });
      return saleRegionList.splice(0, 5);
    }
  },
  methods: {
    code2type(code) {
      let type = {
        '1000': '内资公司',
        '1100': '有限责任公司',
        '1110': '有限责任公司(国有独资)',
        '1120': '有限责任公司(外商投资企业投资)',
        '1121': '有限责任公司(外商投资企业合资)',
        '1122': '有限责任公司(外商投资企业与内资合资)',
        '1123': '有限责任公司(外商投资企业法人独资)',
        '1130': '有限责任公司(自然人投资或控股)',
        '1140': '有限责任公司(国有控股)',
        '1150': '一人有限责任公司',
        '1151': '有限责任公司(自然人独资)',
        '1152': '有限责任公司(自然人投资或控股的法人独资)',
        '1153': '有限责任公司(非自然人投资或控股的法人独资)',
        '1190': '其他有限责任公司',
        '1200': '股份有限公司',
        '1210': '股份有限公司(上市)',
        '1211': '股份有限公司(上市、外商投资企业投资)',
        '1212': '股份有限公司(上市、自然人投资或控股)',
        '1213': '股份有限公司(上市、国有控股)',
        '1219': '其他股份有限公司(上市)',
        '1220': '股份有限公司(非上市)',
        '1221': '股份有限公司(非上市、外商投资企业投资)',
        '1222': '股份有限公司(非上市、自然人投资或控股)',
        '1223': '股份有限公司(非上市、国有控股)',
        '1229': '其他股份有限公司(非上市)',
        '2000': '内资分公司',
        '2100': '有限责任公司分公司',
        '2110': '有限责任公司分公司(国有独资)',
        '2120': '有限责任公司分公司(外商投资企业投资)',
        '2121': '有限责任公司分公司(外商投资企业合资)',
        '2122': '有限责任公司分公司(外商投资企业与内资合资)',
        '2123': '有限责任公司分公司(外商投资企业法人独资)',
        '2130': '有限责任公司分公司(自然人投资或控股)',
        '2140': '有限责任公司分公司(国有控股)',
        '2150': '一人有限责任公司分公司',
        '2151': '有限责任公司分公司(自然人独资)',
        '2152': '有限责任公司分公司(自然人投资或控股的法人独资)',
        '2153': '有限责任公司分公司(非自然人投资或控股的法人独资)',
        '2190': '其他有限责任公司分公司',
        '2200': '股份有限公司分公司',
        '2210': '股份有限公司分公司(上市)',
        '2211': '股份有限公司分公司(上市、外商投资企业投资)',
        '2212': '股份有限公司分公司(上市、自然人投资或控股)',
        '2213': '股份有限公司分公司(上市、国有控股)',
        '2219': '其他股份有限公司分公司(上市)',
        '2220': '股份有限公司分公司(非上市)',
        '2221': '股份有限公司分公司(非上市、外商投资企业投资)',
        '2222': '股份有限公司分公司(非上市、自然人投资或控股)',
        '2223': '股份有限公司分公司(非上市、国有控股)',
        '2229': '其他股份有限公司分公司(非上市)',
        '3000': '内资企业法人',
        '3100': '全民所有制',
        '3200': '集体所有制',
        '3300': '股份制',
        '3400': '股份合作制',
        '3410': '集体所有制（股份合作）',
        '3420': '集体所有制（股份合作）－全资设立',
        '3500': '联营',
        '4000': '内资非法人企业、非公司私营企业及内资非公司企业分支机构',
        '4100': '事业单位营业',
        '4110': '国有事业单位营业',
        '4120': '集体事业单位营业',
        '4200': '社团法人营业',
        '4210': '国有社团法人营业',
        '4220': '集体社团法人营业',
        '4300': '内资企业法人分支机构(非法人)',
        '4310': '全民所有制分支机构(非法人)',
        '4320': '集体分支机构(非法人)',
        '4330': '股份制分支机构',
        '4340': '股份合作制分支机构',
        '4341': '集体所有制（股份合作）分支机构',
        '4342': '集体所有制（股份合作）－全资设立(分支机构)',
        '4400': '经营单位(非法人)',
        '4410': '国有经营单位(非法人)',
        '4420': '集体经营单位(非法人)',
        '4500': '非公司私营企业',
        '4530': '合伙企业',
        '4531': '普通合伙企业',
        '4532': '特殊普通合伙企业',
        '4533': '有限合伙企业',
        '4540': '个人独资企业',
        '4550': '合伙企业分支机构',
        '4551': '普通合伙企业分支机构',
        '4552': '特殊普通合伙企业分支机构',
        '4553': '有限合伙企业分支机构',
        '4560': '个人独资企业分支机构',
        '4600': '联营',
        '4700': '股份制企业(非法人)',
        '5000': '外商投资企业',
        '5100': '有限责任公司（外商投资）',
        '5110': '有限责任公司(中外合资)',
        '5120': '有限责任公司(中外合作)',
        '5130': '有限责任公司(外商合资)',
        '5140': '有限责任公司(外国自然人独资)',
        '5150': '有限责任公司(外国法人独资)',
        '5160': '有限责任公司(外国非法人经济组织独资)',
        '5190': '有限责任公司(其他)',
        '5200': '股份有限公司（外商投资）',
        '5210': '股份有限公司(中外合资、未上市)',
        '5220': '股份有限公司(中外合资、上市)',
        '5230': '股份有限公司(外商合资、未上市)',
        '5240': '股份有限公司(外商合资、上市)',
        '5290': '股份有限公司(其他)',
        '5300': '非公司（外商投资）',
        '5310': '非公司外商投资企业(中外合作)',
        '5320': '非公司外商投资企业(外商合资)',
        '5390': '非公司外商投资企业(其他)',
        '5400': '外商投资合伙企业',
        '5410': '外商投资普通合伙企业',
        '5420': '外商投资特殊普通合伙企业',
        '5430': '外商投资有限合伙企业',
        '5490': '其他',
        '5800': '外商投资企业分支机构',
        '5810': '外商投资企业分公司',
        '5820': '外商投资企业非公司分支机构',
        '5830': '办事处',
        '5840': '外商投资合伙企业分支机构',
        '5890': '外商投资企业其他分支机构',
        '6000': '台、港、澳投资企业',
        '6100': '有限责任公司（台、港、澳资）',
        '6110': '有限责任公司(台港澳与境内合资)',
        '6120': '有限责任公司(台港澳与境内合作)',
        '6130': '有限责任公司(台港澳合资)',
        '6140': '有限责任公司(台港澳自然人独资)',
        '6150': '有限责任公司(台港澳法人独资)',
        '6160': '有限责任公司(台港澳非法人经济组织独资)',
        '6170': '有限责任公司(台港澳与外国投资者合资)',
        '6190': '有限责任公司(其他台港澳有限责任公司)',
        '6200': '股份有限公司(台港澳与境内合资)',
        '6210': '股份有限公司(台港澳与境内合资、未上市)',
        '6220': '股份有限公司(台港澳与境内合资、上市)',
        '6230': '股份有限公司(台港澳合资、未上市)',
        '6240': '股份有限公司(台港澳合资、上市)',
        '6250': '股份有限公司(台港澳与外国投资者合资、未上市)',
        '6260': '股份有限公司(台港澳与外国投资者合资、上市)',
        '6290': '股份有限公司(其他台港澳股份有限公司)',
        '6300': '非公司（台、港、澳资）',
        '6310': '非公司台、港、澳企业(台港澳与境内合作)',
        '6320': '非公司台、港、澳企业(台港澳合资)',
        '6390': '非公司台、港、澳企业(其他)',
        '6400': '港、澳、台投资合伙企业',
        '6410': '普通合伙企业',
        '6420': '特殊普通合伙企业',
        '6430': '有限合伙企业',
        '6490': '其他',
        '6800': '台、港、澳投资企业分支机构',
        '6810': '台、港、澳投资企业分公司',
        '6820': '台、港、澳企业非公司分支机构',
        '6830': '办事处',
        '6840': '港、澳、台投资合伙企业分支机构',
        '6890': '其他台港澳投资企业分支机构',
        '7000': '外国（地区）企业',
        '7100': '外国（地区）公司分支机构',
        '7110': '外国(地区)无限责任公司分支机构',
        '7120': '外国(地区)有限责任公司分支机构',
        '7130': '外国(地区)股份有限责任公司分支机构',
        '7190': '外国(地区)其他形式公司分支机构',
        '7200': '外国(地区)企业常驻代表机构',
        '7300': '外国(地区)企业在中国境内从事经营活动',
        '7310': '分公司',
        '7390': '其他',
        '8000': '集团',
        '8100': '内资集团',
        '8500': '外资集团',
        '9000': '其他类型',
        '9100': '农民专业合作经济组织',
        '9200': '农民专业合作社分支机构',
        '9500': '个体工商户',
        '9600': '自然人',
        '9900': '其他',
        '9999': '个体'
      };
      return type[code + ""];
    },
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
        let last = this.$Moment(item.month);
        let startLast = last.clone().startOf("month");
        let dis = startLast.clone().add(num, "months");
        if (startLast < startNow && dis >= startNow) {
          sum += Math.abs(item[key] - 0) || 0;
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
    }
  },
  created() {
    let applicationId = this.$route.query.applicationId;
    if (applicationId) {
      this.$MyFetch.post(`${api.channel}/NUONUO/invoice/${applicationId}`)
      .then((data) => {
        let invoiceInfo = data.invoiceInfo;
        if (invoiceInfo) {
          this.basicInfo = invoiceInfo.basicInfo;
          this.legalUserInfo = invoiceInfo.legalUserInfo;
          this.egsManagersList = invoiceInfo.egsManagersList;
          this.egsShareholdersList = invoiceInfo.egsShareholdersList;
          this.egsChangeRecordsList = invoiceInfo.egsChangeRecordsList;
          this.dealRecordInfo = invoiceInfo.dealRecordInfo;
          this.salesInvoiceInfo = invoiceInfo.salesInvoiceInfo;
          this.downCustomerList = invoiceInfo.downCustomerList;
          this.saleRegionList = invoiceInfo.saleRegionList;
        }
        let createdDate = data.createdDate;
        if (createdDate) {
          this.relDate = new Date(createdDate.replace(/-/g, "/"));
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
