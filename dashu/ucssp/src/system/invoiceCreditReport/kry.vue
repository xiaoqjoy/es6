<template>
  <div>
    <div class="invoice">
      <el-container>
        <el-header>餐饮经营信息报告</el-header>
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
                    <span>{{ companyInfo.basic.entstatus }}</span>
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
                    <span>{{ companyInfo.basic.dom }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>企业类型：</label>
                    <span>{{ companyInfo.basic.enttype }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>行业：</label>
                    <span>{{ companyInfo.basic.industrycocode }}</span>
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
              <h3>商店基础信息</h3>
            </div>
            <div class="content">
              <section>
                <el-row>
                  <el-col :span="6">
                    <label>店名：</label>
                    <span>{{ invoiceInfo.restaurantName }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>店主名称：</label>
                    <span>{{ invoiceInfo.legalName }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>入网时间 （设备开机时间）：</label>
                    <span>{{ invoiceInfo.esDate }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>开机时长（天）：</label>
                    <span>{{ invoiceInfo.daysFromEst }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>菜系：</label>
                    <span>{{ invoiceInfo.cuisine }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>桌数：</label>
                    <span>{{ invoiceInfo.tableNum }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>门店用户交易起始日：</label>
                    <span>{{ invoiceInfo.tradeEstDate }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>开业时长（天）：</label>
                    <span>{{ invoiceInfo.daysFromTradeEst }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>经营地址：</label>
                    <span>{{ invoiceInfo.address }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>座位数：</label>
                    <span>{{ invoiceInfo.seatNum }}</span>
                  </el-col>
                </el-row>
              </section>
            </div>
          </el-card>
          <el-card>
            <div slot="header">
              <h3>餐饮交易行为汇总</h3>
            </div>
            <div class="content">
              <section>
                <el-row>
                  <el-col :span="6">
                    <label>近1个月交易笔数：</label>
                    <span>{{ invoiceInfo.ttlTradeNumL1Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近1个月异常交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.anTradeNumL1Mth / invoiceInfo.ttlTradeNumL1Mth) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近1个月线上支付占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntPayOLL1Mth / invoiceInfo.ttlTradeNumL1Mth) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近1个月堂食交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntEatInTradeL1Mth / invoiceInfo.ttlTradeNumL1Mth) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近3个月交易笔数：</label>
                    <span>{{ invoiceInfo.ttlTradeNumL3Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近3个月异常交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.anTradeNumL3Mth / invoiceInfo.ttlTradeNumL3Mth) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近3个月线上支付占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntPayOLL3Mth / invoiceInfo.ttlTradeNumL3Mth) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近3个月堂食交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntEatInTradeL3Mth / invoiceInfo.ttlTradeNumL3Mth) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近6个月交易笔数：</label>
                    <span>{{ invoiceInfo.ttlTradeNumL6Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近6个月异常交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.anTradeNumL6Mth / invoiceInfo.ttlTradeNumL6Mth) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近6个月线上支付占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntPayOLL6Mth / invoiceInfo.ttlTradeNumL6Mth) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近6个月堂食交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntEatInTradeL6Mth / invoiceInfo.ttlTradeNumL6Mth) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近9个月交易笔数：</label>
                    <span>{{ invoiceInfo.ttlTradeNumL9Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近9个月异常交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.anTradeNumL9Mth / invoiceInfo.ttlTradeNumL9Mth) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近9个月线上支付占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntPayOLL9Mth / invoiceInfo.ttlTradeNumL9Mth) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近9个月堂食交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntEatInTradeL9Mth / invoiceInfo.ttlTradeNumL9Mth) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近12个月交易笔数：</label>
                    <span>{{ invoiceInfo.ttlTradeNumL12Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近12个月异常交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.anTradeNumL12Mth / invoiceInfo.ttlTradeNumL12Mth) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近12个月线上支付占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntPayOLL12Mth / invoiceInfo.ttlTradeNumL12Mth) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近12个月堂食交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntEatInTradeL12Mth / invoiceInfo.ttlTradeNumL12Mth) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近1个月实付金额（折扣后）：</label>
                    <span>{{ invoiceInfo.ttlTradeAmtAfDiscntL1Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近1个月折扣金额：</label>
                    <span>{{ invoiceInfo.ttlTradeAmtAfDiscntL1Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近1个月现金支付占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntPaybyCashL1Mth / invoiceInfo.ttlTradeNumL1Mth) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近1个月外带交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntCarryOutTradeL1Mth / invoiceInfo.ttlTradeNumL1Mth) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近3个月实付金额（折扣后）：</label>
                    <span>{{ invoiceInfo.ttlTradeAmtAfDiscntL3Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近3个月折扣金额：</label>
                    <span>{{ invoiceInfo.ttlTradeAmtAfDiscntL3Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近3个月现金支付占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntPaybyCashL3Mth / invoiceInfo.ttlTradeNumL3Mth) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近3个月外带交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntCarryOutTradeL3Mth / invoiceInfo.ttlTradeNumL3Mth) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近6个月实付金额（折扣后）：</label>
                    <span>{{ invoiceInfo.ttlTradeAmtAfDiscntL6Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近6个月折扣金额：</label>
                    <span>{{ invoiceInfo.ttlTradeAmtAfDiscntL6Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近6个月现金支付占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntPaybyCashL6Mth / invoiceInfo.ttlTradeNumL6Mth) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近6个月外带交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntCarryOutTradeL6Mth / invoiceInfo.ttlTradeNumL6Mth) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近9个月实付金额（折扣后）：</label>
                    <span>{{ invoiceInfo.ttlTradeAmtAfDiscntL9Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近9个月折扣金额：</label>
                    <span>{{ invoiceInfo.ttlTradeAmtAfDiscntL9Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近9个月现金支付占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntPaybyCashL9Mth / invoiceInfo.ttlTradeNumL9Mth) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近9个月外带交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntCarryOutTradeL9Mth / invoiceInfo.ttlTradeNumL9Mth) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近12个月实付金额（折扣后）：</label>
                    <span>{{ invoiceInfo.ttlTradeAmtAfDiscntL12Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近12个月折扣金额：</label>
                    <span>{{ invoiceInfo.ttlTradeAmtAfDiscntL12Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近12个月现金支付占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntPaybyCashL12Mth / invoiceInfo.ttlTradeNumL12Mth) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近12个月外带交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntCarryOutTradeL12Mth / invoiceInfo.ttlTradeNumL12Mth) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近1个月交易笔均：</label>
                    <span>{{ (invoiceInfo.ttlTradeAmtAfDiscntL1Mth / invoiceInfo.ttlTradeNumL1Mth).toFixed(1) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近1个月折扣比例：</label>
                    <span>{{ num2percent(invoiceInfo.sumDiscountAmtL1Mth / (invoiceInfo.ttlTradeAmtAfDiscntL1Mth + invoiceInfo.sumDiscountAmtL1Mth)) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近1个月深夜交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntNightTradeL1Mth / invoiceInfo.ttlTradeNumL1Mth) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近1个月异常时间交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntOTTradeL1Mth / invoiceInfo.ttlTradeNumL1Mth) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近3个月交易笔均：</label>
                    <span>{{ (invoiceInfo.ttlTradeAmtAfDiscntL3Mth / invoiceInfo.ttlTradeNumL3Mth).toFixed(1) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近3个月折扣比例：</label>
                    <span>{{ num2percent(invoiceInfo.sumDiscountAmtL3Mth / (invoiceInfo.ttlTradeAmtAfDiscntL3Mth + invoiceInfo.sumDiscountAmtL3Mth)) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近3个月深夜交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntNightTradeL3Mth / invoiceInfo.ttlTradeNumL3Mth) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近3个月异常时间交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntOTTradeL3Mth / invoiceInfo.ttlTradeNumL3Mth) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近6个月交易笔均：</label>
                    <span>{{ (invoiceInfo.ttlTradeAmtAfDiscntL6Mth / invoiceInfo.ttlTradeNumL6Mth).toFixed(1) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近6个月折扣比例：</label>
                    <span>{{ num2percent(invoiceInfo.sumDiscountAmtL6Mth / (invoiceInfo.ttlTradeAmtAfDiscntL6Mth + invoiceInfo.sumDiscountAmtL6Mth)) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近6个月深夜交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntNightTradeL6Mth / invoiceInfo.ttlTradeNumL6Mth) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近6个月异常时间交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntOTTradeL6Mth / invoiceInfo.ttlTradeNumL6Mth) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近9个月交易笔均：</label>
                    <span>{{ (invoiceInfo.ttlTradeAmtAfDiscntL9Mth / invoiceInfo.ttlTradeNumL9Mth).toFixed(1) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近9个月折扣比例：</label>
                    <span>{{ num2percent(invoiceInfo.sumDiscountAmtL9Mth / (invoiceInfo.ttlTradeAmtAfDiscntL9Mth + invoiceInfo.sumDiscountAmtL9Mth)) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近9个月深夜交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntNightTradeL9Mth / invoiceInfo.ttlTradeNumL9Mth) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近9个月异常时间交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntOTTradeL9Mth / invoiceInfo.ttlTradeNumL9Mth) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近12个月交易笔均：</label>
                    <span>{{ (invoiceInfo.ttlTradeAmtAfDiscntL12Mth / invoiceInfo.ttlTradeNumL12Mth).toFixed(1) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近12个月折扣比例：</label>
                    <span>{{ num2percent(invoiceInfo.sumDiscountAmtL12Mth / (invoiceInfo.ttlTradeAmtAfDiscntL12Mth + invoiceInfo.sumDiscountAmtL12Mth)) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近12个月深夜交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntNightTradeL12Mth / invoiceInfo.ttlTradeNumL12Mth) }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近12个月异常时间交易占比：</label>
                    <span>{{ num2percent(invoiceInfo.cntOTTradeL12Mth / invoiceInfo.ttlTradeNumL12Mth) }}</span>
                  </el-col>
                </el-row>
              </section>
            </div>
          </el-card>
          <el-card>
            <div slot="header">
              <h3>餐饮交易持续性</h3>
            </div>
            <div class="content">
              <section>
                <el-row>
                  <el-col :span="6">
                    <label>近3个月有交易月份数：</label>
                    <span>{{ invoiceInfo.cntTradeMthL3Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近6个月有交易月份数：</label>
                    <span>{{ invoiceInfo.cntTradeMthL6Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近12个月有交易月份数：</label>
                    <span>{{ invoiceInfo.cntTradeMthL12Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近1个月有交易天数占比：</label>
                    <span>{{ num2percent(invoiceInfo.tradeDaysL1Mth / 30) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近3个月有交易且每月交易天数大于3天的月份数：</label>
                    <span>{{ invoiceInfo.cntTradeGT3DaysL3Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近6个月有交易且每月交易天数大于3天的月份数：</label>
                    <span>{{ invoiceInfo.cntTradeGT3DaysL6Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近12个月有交易且每月交易天数大于3天的月份数：</label>
                    <span>{{ invoiceInfo.cntTradeGT3DaysL12Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近3个月有交易天数占比：</label>
                    <span>{{ num2percent(invoiceInfo.tradeDaysL3Mth / 90) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近3个月有交易且每月交易天数大于7天的月份数：</label>
                    <span>{{ invoiceInfo.cntTradeGT7DaysL3Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近6个月有交易且每月交易天数大于7天的月份数：</label>
                    <span>{{ invoiceInfo.cntTradeGT7DaysL6Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近12个月有交易且每月交易天数大于7天的月份数：</label>
                    <span>{{ invoiceInfo.cntTradeGT7DaysL12Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近6个月有交易天数占比：</label>
                    <span>{{ num2percent(invoiceInfo.tradeDaysL6Mth / 180) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="18">&nbsp;</el-col>
                  <el-col :span="6">
                    <label>近9个月有交易天数占比：</label>
                    <span>{{ num2percent(invoiceInfo.tradeDaysL9Mth / 270) }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="18">&nbsp;</el-col>
                  <el-col :span="6">
                    <label>近12个月有交易天数占比：</label>
                    <span>{{ num2percent(invoiceInfo.tradeDaysL12Mth / 360) }}</span>
                  </el-col>
                </el-row>
              </section>
            </div>
          </el-card>
          <el-card>
            <div slot="header">
              <h3>餐饮交易金额分布</h3>
            </div>
            <div class="content">
              <section>
                <el-row>
                  <el-col :span="6">
                    <label>近1个月最高交易金额：</label>
                    <span>{{ invoiceInfo.maxTradeAmtL1Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近1个月10分位订单价格：</label>
                    <span>{{ invoiceInfo.roder10PercentilePriceL1Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近1个月50分位订单价格：</label>
                    <span>{{ invoiceInfo.roderMedianPriceL1Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近1个月90分位订单价格：</label>
                    <span>{{ invoiceInfo.roder90PercentilePriceL1Mth }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近3个月最高交易金额：</label>
                    <span>{{ invoiceInfo.maxTradeAmtL3Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近3个月10分位订单价格：</label>
                    <span>{{ invoiceInfo.roder10PercentilePriceL3Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近3个月50分位订单价格：</label>
                    <span>{{ invoiceInfo.roderMedianPriceL3Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近3个月90分位订单价格：</label>
                    <span>{{ invoiceInfo.roder90PercentilePriceL3Mth }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近6个月最高交易金额：</label>
                    <span>{{ invoiceInfo.maxTradeAmtL6Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近6个月10分位订单价格：</label>
                    <span>{{ invoiceInfo.roder10PercentilePriceL6Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近6个月50分位订单价格：</label>
                    <span>{{ invoiceInfo.roderMedianPriceL6Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近6个月90分位订单价格：</label>
                    <span>{{ invoiceInfo.roder90PercentilePriceL6Mth }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近9个月最高交易金额：</label>
                    <span>{{ invoiceInfo.maxTradeAmtL9Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近9个月10分位订单价格：</label>
                    <span>{{ invoiceInfo.roder10PercentilePriceL9Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近9个月50分位订单价格：</label>
                    <span>{{ invoiceInfo.roderMedianPriceL9Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近9个月90分位订单价格：</label>
                    <span>{{ invoiceInfo.roder90PercentilePriceL9Mth }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近12个月最高交易金额：</label>
                    <span>{{ invoiceInfo.maxTradeAmtL12Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近12个月10分位订单价格：</label>
                    <span>{{ invoiceInfo.roder10PercentilePriceL12Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近12个月50分位订单价格：</label>
                    <span>{{ invoiceInfo.roderMedianPriceL12Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近12个月90分位订单价格：</label>
                    <span>{{ invoiceInfo.roder90PercentilePriceL12Mth }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近1个月最低交易金额：</label>
                    <span>{{ invoiceInfo.minTradeAmtL1Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近1个月25分位订单价格：</label>
                    <span>{{ invoiceInfo.roder25PercentilePriceL1Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近1个月75分位订单价格：</label>
                    <span>{{ invoiceInfo.roder75PercentilePriceL1Mth }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近3个月最低交易金额：</label>
                    <span>{{ invoiceInfo.minTradeAmtL3Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近3个月25分位订单价格：</label>
                    <span>{{ invoiceInfo.roder25PercentilePriceL3Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近3个月75分位订单价格：</label>
                    <span>{{ invoiceInfo.roder75PercentilePriceL3Mth }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近6个月最低交易金额：</label>
                    <span>{{ invoiceInfo.minTradeAmtL6Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近6个月25分位订单价格：</label>
                    <span>{{ invoiceInfo.roder25PercentilePriceL6Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近6个月75分位订单价格：</label>
                    <span>{{ invoiceInfo.roder75PercentilePriceL6Mth }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近9个月最低交易金额：</label>
                    <span>{{ invoiceInfo.minTradeAmtL9Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近9个月25分位订单价格：</label>
                    <span>{{ invoiceInfo.roder25PercentilePriceL9Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近9个月75分位订单价格：</label>
                    <span>{{ invoiceInfo.roder75PercentilePriceL9Mth }}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6">
                    <label>近12个月最低交易金额：</label>
                    <span>{{ invoiceInfo.minTradeAmtL12Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近12个月25分位订单价格：</label>
                    <span>{{ invoiceInfo.roder25PercentilePriceL12Mth }}</span>
                  </el-col>
                  <el-col :span="6">
                    <label>近12个月75分位订单价格：</label>
                    <span>{{ invoiceInfo.roder75PercentilePriceL12Mth }}</span>
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
        yearReportBasics: [{addr: ''}],
        persons: [],
        shareholders: [],
        alters: []
      },
      invoiceInfo: {}
    };
  },
  methods: {
    num2percent(num) {
      if (isNaN(num)) {
        return num;
      } else {
        return (num * 100).toFixed(2) + "%";
      }
    }
  },
  created() {
    let applicationId = this.$route.query.applicationId;
    if (applicationId) {
      this.$MyFetch.post(`${api.channel}/KRY/invoice/${applicationId}`)
      .then((data) => {
        this.companyInfo = data.companyInfo;
        this.invoiceInfo = data.invoiceInfo;
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
