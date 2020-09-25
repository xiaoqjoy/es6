<template>
  <div>
    <div class="report_content" v-if="svyBossReport">
      <div class="card_box">
        <div class="card_title">基本信息</div>
        <div class="card_item_box items_padding10">
          <div class="card_content"><span class="card_content_title">借款申请人姓名：</span><span class="card_content_font">{{svyBossReport.custName}}</span></div>
          <div class="card_content"><span class="card_content_title">调查日期：</span><span class="card_content_font">{{svyBossReport.surveyDate}}</span></div>
          <div class="card_content"><span class="card_content_title">目前调查距离（KM）：</span><span class="card_content_font">{{svyBossReport.initDistance}}</span></div>
          <div class="card_content"><span class="card_content_title">企业名称：</span><span class="card_content_font">{{svyBossReport.enterpriseName}}</span></div>

          <div class="card_content"><span class="card_content_title">修改后调查距离：</span><span class="card_content_font">{{svyBossReport.updatedDistance}}</span></div>
          <div class="card_content"><span class="card_content_title">调查地址：</span><span class="card_content_font">{{svyBossReport.surveyAddress}}</span></div>
          <div class="card_content"><span class="card_content_title">办公固话：</span><span class="card_content_font">{{svyBossReport.workPhoneNum}}</span></div>
          <div class="card_content"><span class="card_content_title">婚姻状况：</span><span class="card_content_font">{{setReportContent(svyBossReport.maritalStatus, marital_status)}}</span></div>
          <div class="card_content"><span class="card_content_title">企业类型：</span><span class="card_content_font">{{setReportContent(svyBossReport.enterpriseType, enterprise_type)}}</span></div>
          <div class="card_content"><span class="card_content_title">一级行业：</span><span class="card_content_font">{{setReportContent(svyBossReport.primaryIndustry, industrysConfig)}}</span></div>
          <div class="card_content"><span class="card_content_title">二级行业：</span><span class="card_content_font">{{setReportContent(svyBossReport.secondIndustry, secondIndustrysConfig)}}</span></div>
          <div class="card_content"><span class="card_content_title">商圈：</span><span class="card_content_font">{{setBusinessArea(svyBossReport.surveyAreaId, businessArea)}}</span></div>
          <div class="card_content"><span class="card_content_title">是否暗访：</span><span class="card_content_font">{{svyBossReport.secretInd ? '是' : '否'}}</span></div>
          <div class="card_content"><span class="card_content_title">配偶是否知晓贷款：</span><span class="card_content_font">{{svyBossReport.spouseKnowLoanInd ? '是' : '否'}}</span></div>
        </div>
      </div>

      <div class="card_box">
        <div class="card_title">企业情况</div>
        <div class="card_item_box items_padding10">
          <div class="card_content"><span class="card_content_title">法人代表：</span><span class="card_content_font">{{svyBossReport.legalRepresentative}}</span></div>
          <div class="card_content"><span class="card_content_title">法人与申请人关系：</span><span class="card_content_font">{{setReportContent(svyBossReport.legalRelationship, legal_relationship)}}</span></div>
          <div class="card_content"><span class="card_content_title">申请人占股（%）：</span><span class="card_content_font">{{svyBossReport.applicantStocks}}</span></div>
          <div class="card_content"><span class="card_content_title">股东人数：</span><span class="card_content_font">{{svyBossReport.shareholderCnt}}</span></div>
        </div>
      </div>

      <div class="card_box">
        <div class="card_title">经营历史</div>
        <div class="card_item_box items_padding10">
          <div class="card_content"><span class="card_content_title">从事本行业年限：</span><span class="card_content_font">{{svyBossReport.inThisLife}}</span></div>
          <div class="card_content"><span class="card_content_title">此处经营年限：</span><span class="card_content_font">{{svyBossReport.operationYear}}</span></div>
          <div class="card_content"><span class="card_content_title">面积：</span><span class="card_content_font">{{svyBossReport.businessArea}}</span></div>
          <div class="card_content"><span class="card_content_title">经营场所：</span><span class="card_content_font">{{setReportContent(svyBossReport.businessPlace, business_place)}}</span></div>
          <div class="card_content"><span class="card_content_title">股东是否有变更：</span><span class="card_content_font">{{setReportContent(svyBossReport.shareholdersChangeInd, shareholders_change_ind)}}</span></div>
          <div class="card_content"><span class="card_content_title">股东变更原因：</span><span class="card_content_font">{{svyBossReport.shareholdersChangeReason}}</span></div>
          <div class="card_content"><span class="card_content_title">行业、主营业务是否有变更：</span><span class="card_content_font">{{setReportContent(svyBossReport.industryChangeInd, industry_change_ind)}}</span></div>
          <div class="card_content"><span class="card_content_title">行业、主营业务变更原因：</span><span class="card_content_font">{{svyBossReport.industryChangeReason}}</span></div>
          <div class="card_content"><span class="card_content_title">经营历史介绍：</span><span class="card_content_font">{{svyBossReport.businessHistory}}</span></div>
        </div>
      </div>

      <div class="card_box">
        <div class="card_title">经营模式</div>
        <div class="card_item_box items_padding10">
          <div class="card_content"><span class="card_content_title">主营业务描述：</span><span class="card_content_font">{{svyBossReport.mainBusinessDescription}}</span></div>
          <div class="card_content"><span class="card_content_title">上游企业类型：</span><span class="card_content_font">{{svyBossReport.upEnterpriseType}}</span></div>
          <div class="card_content"><span class="card_content_title">结算方式：</span><span class="card_content_font">{{setReportContent(svyBossReport.upEnterprisePaymentMethod, up_enterprise_payment_method)}}</span></div>
          <div class="card_content"><span class="card_content_title">账期（天）：</span><span class="card_content_font">{{svyBossReport.upEnterprisePaymentDays}}</span></div>
          <div class="card_content"><span class="card_content_title">下游企业类型：</span><span class="card_content_font">{{svyBossReport.downEnterpriseType}}</span></div>
          <div class="card_content"><span class="card_content_title">结算方式：</span><span class="card_content_font">{{setReportContent(svyBossReport.downEnterprisePaymentMethod, down_enterprise_payment_method)}}</span></div>
          <div class="card_content"><span class="card_content_title">账期（天）：</span><span class="card_content_font">{{svyBossReport.downEnterprisePaymentDays}}</span></div>
        </div>
      </div>
      <div class="card_box">
        <div class="card_title">贷款用途</div>
        <div class="card_item_box items_padding10">
          <div class="card_content"><span class="card_content_title">贷款用途：</span><span class="card_content_font">{{setReportContent(svyBossReport.purposeType, purpose_type)}}</span></div>
          <div class="card_content"><span class="card_content_title">详细内容：</span><span class="card_content_font">{{svyBossReport.purposeDesc}}</span></div>
        </div>
      </div>

      <div class="card_box">
        <div class="card_title">家庭资产情况</div>
        <div class="card_item_box items_padding10">
          <el-table :data="estateInfoList" style="width:100%" :header-row-class-name="headStyle" :row-class-name="rowStyle">
            <el-table-column label="房产" width="50px">
              <template slot-scope="scope">
                <div>{{scope.$index+1}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="addressCode" label="区域" width="320px">
              <template slot-scope="scope">
                <div>{{ scope.row.estateId }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="addressDesc" label="详细地址"></el-table-column>
            <el-table-column prop="houseSizeMeas" label="面积"></el-table-column>
            <el-table-column prop="estatePriceAmt" label="价值（万元）"></el-table-column>
            <el-table-column prop="estateTypeCode" label="房产性质"></el-table-column>
          </el-table>
        </div>
        <div class="card_item_box items_padding10 items_padding_bottom20">
          <el-table :data="carInfoList" style="width:100%" :header-row-class-name="headStyle" :row-class-name="rowStyle">
            <el-table-column label="车辆">
              <template slot-scope="scope">
                <div>{{scope.$index+1}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="carBrand" label="车辆品牌"></el-table-column>
            <el-table-column prop="carAmt" label="价值（万元）"></el-table-column>
          </el-table>
        </div>
      </div>

      <div class="card_box">
        <div class="card_title">家庭情况</div>
        <div class="card_item_box items_padding10">
          <div class="card_content"><span class="card_content_title">详细内容：</span><span class="card_content_font">{{svyBossReport.familySituation}}</span></div>
        </div>
      </div>

      <div class="card_box">
        <div class="card_title">财务信息</div>
        <div class="card_panel">
          <div class="card_panel_title">
            <div class="panel_title_text">资产负债情况</div>
            <div class="panel_title_provisos"><span class="gray_font">单位：</span>万元</div>
          </div>
          <div class="card_panel_body card_item_box assets_and_liabilities">
            <div class="panel_content_left">
              <div class="card_content"><span class="card_content_title">现金和存款：</span><span class="card_content_font">{{svyBossReport.cashDeposits}}</span></div>
              <div class="card_content"><span class="card_content_title">应收账款：</span><span class="card_content_font">{{svyBossReport.accountReceivable}}</span></div>
              <div class="card_content"><span class="card_content_title">预付账款：</span><span class="card_content_font">{{svyBossReport.advancePayment}}</span></div>
              <div class="card_content"><span class="card_content_title">存货：</span><span class="card_content_font">{{svyBossReport.stock}}</span></div>
              <div class="card_content"><span class="card_content_title">固定资产(机器设备)：</span><span class="card_content_font">{{svyBossReport.fixedAssetsMachine}}</span></div>
              <div class="card_content"><span class="card_content_title">固定资产(其他)：</span><span class="card_content_font">{{svyBossReport.fixedAssetsOther}}</span></div>
              <div class="card_content"><span class="card_content_title">其他资产：</span><span class="card_content_font">{{svyBossReport.otherAssets}}</span></div>
              <div class="card_content"><span class="card_content_title">总资产：</span><span class="card_content_font">{{svyBossReport.totalAssets}}</span></div>
            </div>
            <div class="panel_content_right">
              <div class="card_content"><span class="card_content_title">应付账款：</span><span class="card_content_font">{{svyBossReport.accountPayable}}</span></div>
              <div class="card_content"><span class="card_content_title">短期贷款：</span><span class="card_content_font">{{svyBossReport.shortLoan}}</span></div>
              <div class="card_content"><span class="card_content_title">长期贷款：</span><span class="card_content_font">{{svyBossReport.longLoan}}</span></div>
              <div class="card_content"><span class="card_content_title">其他负债：</span><span class="card_content_font">{{svyBossReport.otherDebt}}</span></div>
              <div class="card_content"><span class="card_content_title">总负债：</span><span class="card_content_font">{{svyBossReport.totalDebt}}</span></div>
              <div class="card_content"><span class="card_content_title">权益：</span><span class="card_content_font">{{svyBossReport.rightInterest}}</span></div>
            </div>
          </div>
        </div>
        <div class="card_panel">
          <div class="card_panel_title">
            <div class="panel_title_text">损益情况</div>
            <div class="panel_title_provisos"><span class="gray_font">单位：</span>万元</div>
          </div>
          <div class="card_item_box panel_body_item">
            <div class="card_content"><span class="card_content_title">近一年销售额：</span><span class="card_content_font">{{svyBossReport.yearSales}}</span></div>
            <div class="card_content"><span class="card_content_title">旺季月份与销售：</span><span class="card_content_font">{{svyBossReport.peakSalesSeason}}</span></div>
            <div class="card_content"><span class="card_content_title">平均毛利润率：</span><span class="card_content_font">{{svyBossReport.averageMargin ? svyBossReport.averageMargin + "%" : ''}}</span></div>
            <div class="card_content"><span class="card_content_title">淡季月份与销售：</span><span class="card_content_font">{{svyBossReport.offSalesSeason}}</span></div>
            <div class="card_content"><span class="card_content_title">年总开支：</span><span class="card_content_font">{{svyBossReport.totalSpend}}</span></div>
            <div class="card_content"><span class="card_content_title">今年到现在的销售额：</span><span class="card_content_font">{{svyBossReport.salesToNow}}</span></div>
            <div class="card_content"><span class="card_content_title">去年一年净利润：</span><span class="card_content_font">{{svyBossReport.netProfitLastYear}}</span></div>
            <div class="card_content"><span class="card_content_title">上个月的销售额：</span><span class="card_content_font">{{svyBossReport.lastMonthSales}}</span></div>
            <div class="card_content"><span class="card_content_title">员工年总工资：</span><span class="card_content_font">{{svyBossReport.employeesTotalWages}}</span></div>
            <div class="card_content"><span class="card_content_title">水电费/年：</span><span class="card_content_font">{{svyBossReport.utilitiesYear}}</span></div>
            <div class="card_content"><span class="card_content_title">租金/年：</span><span class="card_content_font">{{svyBossReport.rentYear}}</span></div>
            <div class="card_content"><span class="card_content_title">其他大项开支/年：</span><span class="card_content_font">{{svyBossReport.spendPerYear}}</span></div>
            <div class="card_content"><span class="card_content_title">营业额验证方式：</span><span class="card_content_font">{{svyBossReport.turnoverMode}}</span></div>
            <div class="card_content"><span class="card_content_title">财务数据异常描述：</span><span class="card_content_font">{{svyBossReport.dataDescription}}</span></div>
          </div>
        </div>
      </div>

      <div class="card_box">
        <div class="card_title">调查结论</div>
        <ul class="card_item_box items_padding10 text_left">
          <li class="card_item">
            <div class="card_item_content"><span class="card_content_title">调查前否决原因：</span><span class="card_content_font">{{setReportContent(svyBossReport.beforeSurveyReject, before_survey_reject)}}</span></div>
            <div class="card_item_content"><span class="card_content_title">备注：</span><span class="card_content_font">{{svyBossReport.beforeSurveyRejectDesc}}</span></div>
          </li>
          <li class="card_item">
            <div class="card_item_content"><span class="card_content_title">经营真实性：</span><span class="card_content_font">{{svyBossReport.operateTruth + '-' + setReportContent(svyBossReport.operateTruth, operateTruth)}}</span></div>
            <div class="card_item_content"><span class="card_content_title">经营真实性备注：</span><span class="card_content_font">{{svyBossReport.operateTruthRemark}}</span></div>
          </li>
          <li class="card_item">
            <div class="card_item_content"><span class="card_content_title">经营情况：</span><span class="card_content_font">{{svyBossReport.operateStatus ? svyBossReport.operateStatus + '-' + setReportContent(svyBossReport.operateStatus, operateStatus) : ''}}</span></div>
            <div class="card_item_content"><span class="card_content_title">经营情况备注：</span><span class="card_content_font">{{svyBossReport.operateStatusRemark}}</span></div>
          </li>
          <li class="card_item">
            <div class="card_item_content"><span class="card_content_title">隐藏风险：</span><span class="card_content_font">{{setReportMultipleChoice(svyBossReport.hiddenRisk, hiddenRisk)}}</span></div>
            <div class="card_item_content"><span class="card_content_title">隐藏风险备注：</span><span class="card_content_font">{{svyBossReport.hiddenRiskRemark}}</span></div>
          </li>
          <li class="card_item">
            <div class="card_item_content"><span class="card_content_title">业外投资：</span><span class="card_content_font">{{svyBossReport.serviceInvestment ? svyBossReport.serviceInvestment + '-' + setReportContent(svyBossReport.serviceInvestment, serviceInvestment) : ''}}</span></div>
            <div class="card_item_content"><span class="card_content_title">业外投资备注：</span><span class="card_content_font">{{svyBossReport.serviceInvestmentRemark}}</span></div>
          </li>
          <li class="card_item">
            <div class="card_item_content"><span class="card_content_title">现金流：</span><span class="card_content_font">{{setReportMultipleChoice(svyBossReport.cashFlow, cashFlow)}}</span></div>
            <div class="card_item_content"><span class="card_content_title">现金流备注：</span><span class="card_content_font">{{svyBossReport.cashFlowRemark}}</span></div>
          </li>
          <li class="card_item">
            <div class="card_item_content"><span class="card_content_title">经营稳定性：</span><span class="card_content_font">{{setReportMultipleChoice(svyBossReport.operateStability, operateStability)}}</span></div>
            <div class="card_item_content"><span class="card_content_title">经营稳定性备注：</span><span class="card_content_font">{{svyBossReport.operateStabilityRemark}}</span></div>
          </li>
          <li class="card_item">
            <div class="card_item_content"><span class="card_content_title">其他异常：</span><span class="card_content_font">{{setReportMultipleChoice(svyBossReport.otherException, otherException)}}</span></div>
            <div class="card_item_content"><span class="card_content_title">其他异常备注：</span><span class="card_content_font">{{svyBossReport.otherExceptionRemark}}</span></div>
          </li>
          <li class="card_item">
            <div class="card_item_content margin_right0">
              <span class="card_content_title">综合意见：</span>
              <span class="card_content_font orange">{{svyBossReport.overallOpinionCode}}</span>
              <span class="card_content_font" v-if="svyBossReport.overallOpinion">-</span>
              <span class="card_content_font">{{svyBossReport.overallOpinion}}</span>
            </div>
            <div class="card_item_content margin_right0">
              <span class="card_content_title">调查结论：</span>
              <span class="card_content_font orange">{{svyBossReport.surveyConclusionCode}}</span>
              <span class="card_content_font" v-if="svyBossReport.surveyConclusion">-</span>
              <span class="card_content_font">{{reserveConclusion(svyBossReport.surveyConclusion)}}</span>
            </div>
            <div class="card_item_content"><span class="card_content_title">详情描述：</span><span class="card_content_font">{{svyBossReport.detailDescribe}}</span></div>
          </li>
        </ul>
      </div>

      <div class="card_box">
        <div class="card_title">家访信息</div>
        <div class="card_item_box items_padding10">
          <div class="card_content"><span class="card_content_title">居住真实性：</span><span class="card_content_font">{{setReportContent(svyBossReport.residentiAuthenticity, residenti_authenticity)}}</span></div>
          <div class="card_content"><span class="card_content_title">实际居住状态：</span><span class="card_content_font">{{setReportContent(svyBossReport.livingState, living_house_type)}}</span></div>
          <div class="card_content"><span class="card_content_title">居住年限（年）：</span><span class="card_content_font">{{svyBossReport.residenceTime}}</span></div>
          <div class="card_content"><span class="card_content_title">是否家访：</span><span class="card_content_font">{{svyBossReport.homeVisitInd ? '是' : '否'}}</span></div>
          <div class="card_content"><span class="card_content_title">是否与家人同住：</span><span class="card_content_font">{{svyBossReport.withFamilyInd ? '是' : '否'}}</span></div>
          <div class="card_content"><span class="card_content_title">面积（平方米）：</span><span class="card_content_font">{{svyBossReport.livingArea}}</span></div>
          <div class="card_content"><span class="card_content_title">租金水平（元/月/平米）：</span><span class="card_content_font">{{svyBossReport.rentMonthSqm}}</span></div>
          <div class="card_content"><span class="card_content_title">家访地址：</span><span class="card_content_font">{{svyBossReport.homeVisitAddress}}</span></div>
          <div class="card_content"><span class="card_content_title">异常情况描述：</span><span class="card_content_font">{{svyBossReport.exceptionDescription}}</span></div>
        </div>
      </div>
    </div>
    <div class="report_content" v-if="svyStaffReport">
      <div class="card_box">
        <div class="card_title">基本信息</div>
        <div class="card_item_box items_padding10">
          <div class="card_content"><span class="card_content_title">借款申请人姓名：</span><span class="card_content_font">{{svyStaffReport.custName}}</span></div>
          <div class="card_content"><span class="card_content_title">职务名称：</span><span class="card_content_font">{{svyStaffReport.headship}}</span></div>
          <div class="card_content"><span class="card_content_title">目前调查距离（KM）：</span><span class="card_content_font">{{svyStaffReport.initDistance}}</span></div>
          <div class="card_content"><span class="card_content_title">调查日期：</span><span class="card_content_font">{{svyStaffReport.surveyDate}}</span></div>
          <div class="card_content"><span class="card_content_title">企业名称：</span><span class="card_content_font">{{svyStaffReport.enterpriseName}}</span></div>

          <div class="card_content"><span class="card_content_title">修改后调查距离：</span><span class="card_content_font">{{svyStaffReport.updatedDistance}}</span></div>
          <div class="card_content"><span class="card_content_title">调查地址：</span><span class="card_content_font">{{svyStaffReport.surveyAddress}}</span></div>
          <div class="card_content"><span class="card_content_title">是否暗访：</span><span class="card_content_font">{{svyStaffReport.secretInd ? '是' : '否'}}</span></div>
        </div>
      </div>

      <div class="card_box">
        <div class="card_title">企业及工作情况</div>
        <div class="card_item_box items_padding10">
          <div class="card_content"><span class="card_content_title">企业类型：</span><span class="card_content_font">{{setReportContent(svyStaffReport.enterpriseType, enterprise_type)}}</span></div>
          <div class="card_content"><span class="card_content_title">一级行业：</span><span class="card_content_font">{{setReportContent(svyStaffReport.primaryIndustry, industrysConfig)}}</span></div>
          <div class="card_content"><span class="card_content_title">二级行业：</span><span class="card_content_font">{{setReportContent(svyStaffReport.secondIndustry, secondIndustrysConfig)}}</span></div>
          <div class="card_content"><span class="card_content_title">企业规模：</span><span class="card_content_font">{{setReportContent(svyStaffReport.enterpriseScale, enterprise_scale)}}</span></div>

          <div class="card_content"><span class="card_content_title">企业人数：</span><span class="card_content_font">{{svyStaffReport.enterprisesNum}}</span></div>
          <div class="card_content"><span class="card_content_title">企业办公面积：</span><span class="card_content_font">{{svyStaffReport.enterpriseArea}}</span></div>
          <div class="card_content"><span class="card_content_title">本行业工作年限：</span><span class="card_content_font">{{svyStaffReport.industryWorkingLife}}</span></div>
          <div class="card_content"><span class="card_content_title">工作年限：</span><span class="card_content_font">{{svyStaffReport.workingLife}}</span></div>
          <div class="card_content"><span class="card_content_title">工作变更次数：</span><span class="card_content_font">{{svyStaffReport.changeWorkNum}}</span></div>
          <div class="card_content"><span class="card_content_title">平均工作年限：</span><span class="card_content_font">{{svyStaffReport.averageWorkingTime}}</span></div>
          <div class="card_content"><span class="card_content_title">商圈：</span><span class="card_content_font">{{setBusinessArea(svyStaffReport.surveyAreaId, businessArea)}}</span></div>
          <div class="card_content"><span class="card_content_title">工作固话：</span><span class="card_content_font">{{svyStaffReport.workPhoneNum}}</span></div>
          <div class="card_content"><span class="card_content_title">工作历史岗位变更描述：</span><span class="card_content_font">{{svyStaffReport.workHistory}}</span></div>

        </div>
      </div>

      <div class="card_box">
        <div class="card_title">贷款用途</div>
        <div class="card_item_box items_padding10">
          <div class="card_content"><span class="card_content_title">贷款用途：</span><span class="card_content_font">{{setReportContent(svyStaffReport.purposeType, purpose_type)}}</span></div>
          <div class="card_content"><span class="card_content_title">详细内容：</span><span class="card_content_font">{{svyStaffReport.purposeDesc}}</span></div>
        </div>
      </div>

      <div class="card_box">
        <div class="card_title">家庭资产情况</div>
        <div class="card_item_box items_padding10">
          <el-table :data="estateInfoList" style="width:100%" :header-row-class-name="headStyle" :row-class-name="rowStyle">
            <el-table-column label="房产" width="50px">
              <template slot-scope="scope">
                <div>{{scope.$index+1}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="addressCode" label="区域" width="320px">
              <template slot-scope="scope">
                <div>{{ scope.row.estateId }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="addressDesc" label="详细地址"></el-table-column>
            <el-table-column prop="houseSizeMeas" label="面积"></el-table-column>
            <el-table-column prop="estatePriceAmt" label="价值（万元）"></el-table-column>
            <el-table-column prop="estateTypeCode" label="房产性质"></el-table-column>
          </el-table>
        </div>
        <div class="card_item_box items_padding10 items_padding_bottom20">
          <el-table :data="carInfoList" style="width:100%" :header-row-class-name="headStyle" :row-class-name="rowStyle">
            <el-table-column label="车辆">
              <template slot-scope="scope">
                <div>{{scope.$index+1}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="carBrand" label="车辆品牌"></el-table-column>
            <el-table-column prop="carAmt" label="价值（万元）"></el-table-column>
          </el-table>
        </div>
      </div>

      <div class="card_box">
        <div class="card_title">调查结论</div>
        <ul class="card_item_box items_padding10 text_left">
          <li class="card_item">
            <div class="card_item_content"><span class="card_content_title">调查前否决原因：</span><span class="card_content_font">{{setReportContent(svyStaffReport.beforeSurveyReject, before_survey_reject)}}</span></div>
            <div class="card_item_content"><span class="card_content_title">否决原因描述：</span><span class="card_content_font">{{svyStaffReport.beforeSurveyRejectDesc}}</span></div>
          </li>
          <li class="card_item">
            <div class="card_item_content"><span class="card_content_title">工作真实性：</span><span class="card_content_font">{{svyStaffReport.jobTruth + '-' + setReportContent(svyStaffReport.jobTruth, jobTruth)}}</span></div>
            <div class="card_item_content"><span class="card_content_title">工作真实性描述：</span><span class="card_content_font">{{svyStaffReport.jobTruthRemark}}</span></div>
          </li>
          <li class="card_item">
            <div class="card_item_content"><span class="card_content_title">隐藏风险：</span><span class="card_content_font">{{setReportMultipleChoice(svyStaffReport.hiddenRisk, hiddenRiskStaff)}}</span></div>
            <div class="card_item_content"><span class="card_content_title">隐藏风险备注：</span><span class="card_content_font">{{svyStaffReport.hiddenRiskRemark}}</span></div>
          </li>
          <li class="card_item">
            <div class="card_item_content"><span class="card_content_title">工作稳定性：</span><span class="card_content_font">{{setReportMultipleChoice(svyStaffReport.jobStability, jobStability)}}</span></div>
            <div class="card_item_content"><span class="card_content_title">工作稳定性描述：</span><span class="card_content_font">{{svyStaffReport.jobStabilityRemark}}</span></div>
          </li>
          <li class="card_item">
            <div class="card_item_content"><span class="card_content_title">对外投资：</span><span class="card_content_font">{{svyStaffReport.serviceInvestment ? svyStaffReport.serviceInvestment + '-' + setReportContent(svyStaffReport.serviceInvestment, serviceInvestmentStaff) : ''}}</span></div>
            <div class="card_item_content"><span class="card_content_title">对外投资描述：</span><span class="card_content_font">{{svyStaffReport.serviceInvestmentRemark}}</span></div>
          </li>
          <li class="card_item">
            <div class="card_item_content"><span class="card_content_title">其他异常：</span><span class="card_content_font">{{setReportMultipleChoice(svyStaffReport.otherException, otherExceptionStaff)}}</span></div>
            <div class="card_item_content"><span class="card_content_title">其他异常描述：</span><span class="card_content_font">{{svyStaffReport.otherExceptionRemark}}</span></div>
          </li>
          <li class="card_item">
            <div class="card_item_content margin_right0">
              <span class="card_content_title">综合意见：</span>
              <span class="card_content_font orange">{{svyStaffReport.overallOpinionCode}}</span>
              <span class="card_content_font" v-if="svyStaffReport.overallOpinion">-</span>
              <span class="card_content_font">{{svyStaffReport.overallOpinion}}</span>
            </div>
            <div class="card_item_content margin_right0">
              <span class="card_content_title">调查结论：</span>
              <span class="card_content_font orange">{{svyStaffReport.surveyConclusionCode}}</span>
              <span class="card_content_font" v-if="svyStaffReport.surveyConclusion">-</span>
              <span class="card_content_font">{{reserveConclusion(svyStaffReport.surveyConclusion)}}</span>
            </div>
            <div class="card_item_content"><span class="card_content_title">详情描述：</span><span class="card_content_font">{{svyStaffReport.detailDescribe}}</span></div>
          </li>
        </ul>
      </div>

      <div class="card_box">
        <div class="card_title">家访信息</div>
        <div class="card_item_box items_padding10">
          <div class="card_content"><span class="card_content_title">居住真实性：</span><span class="card_content_font">{{setReportContent(svyStaffReport.residentiAuthenticity, residenti_authenticity)}}</span></div>
          <div class="card_content"><span class="card_content_title">实际居住状态：</span><span class="card_content_font">{{setReportContent(svyStaffReport.livingHouseType, living_house_type)}}</span></div>
          <div class="card_content"><span class="card_content_title">是否家访：</span><span class="card_content_font">{{svyStaffReport.homeVisitInd ? '是' : '否'}}</span></div>
          <div class="card_content"><span class="card_content_title">是否与家人同住：</span><span class="card_content_font">{{svyStaffReport.withFamilyInd ? '是' : '否'}}</span></div>
          <div class="card_content"><span class="card_content_title">住所面积（平方米）：</span><span class="card_content_font">{{svyStaffReport.livingArea}}</span></div>
          <div class="card_content"><span class="card_content_title">居住年限（年）：</span><span class="card_content_font">{{svyStaffReport.residenceTime}}</span></div>
          <div class="card_content"><span class="card_content_title">租金水平（元/月/平米）：</span><span class="card_content_font">{{svyStaffReport.rentMonthSqm}}</span></div>
          <div class="card_content"><span class="card_content_title">调查地址：</span><span class="card_content_font">{{svyStaffReport.homeVisitAddress}}</span></div>
          <div class="card_content"><span class="card_content_title">真实性描述：</span><span class="card_content_font">{{svyStaffReport.authenticityDescription}}</span></div>
          <div class="card_content"><span class="card_content_title">异常情况描述：</span><span class="card_content_font">{{svyStaffReport.exceptionDescription}}</span></div>

        </div>
      </div>

      <div class="card_box">
        <div class="card_title">家庭情况</div>
        <div class="card_item_box items_padding10">
          <div class="card_content"><span class="card_content_title">详细内容：</span><span class="card_content_font">{{svyStaffReport.familySituation}}</span></div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex';
import { reserveConclusion } from '../js/utils.js';
export default {
  props: {
    // custInfo: {
    //   type: Object,
    //   default: function() {
    //     return {
    //       custName: '',
    //       careerTypeCode: '',
    //       initDistance: '',
    //       workplaceName: ''
    //     };
    //   }
    // },
    reportData: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      applicationId: 'string',
      flag: false, // false 保存| true 提交
      carInfoList: [],
      estateInfoList: [],
      svyBossReport: null,
      svyStaffReport: null,
      secondIndustrysConfig: [] // 二级行业列表
    };
  },
  computed: {
    ...mapGetters([
      'fieldConfig'
    ]),
    // 婚姻状况
    marital_status() {
      return this.fieldConfig.marital_status.children;
    },
    // 法人与申请人关系
    legal_relationship() {
      return this.fieldConfig.legal_relationship.children;
    },
    // 经营场所
    business_place() {
      return this.fieldConfig.business_place.children;
    },
    // 股东是否变更
    shareholders_change_ind() {
      return this.fieldConfig.shareholders_change_ind.children;
    },
    // 行业，主营业务是否变更
    industry_change_ind() {
      return this.fieldConfig.industry_change_ind.children;
    },
    // 上游企业结算方式
    up_enterprise_payment_method() {
      return this.fieldConfig.up_enterprise_payment_method.children;
    },
    // 下游企业结算方式
    down_enterprise_payment_method() {
      return this.fieldConfig.down_enterprise_payment_method.children;
    },
    // 企业类型
    enterprise_type() {
      // return this.fieldConfig.enterprise_type.children;
      return [];
    },
    // 一级行业
    industrysConfig() {
      return this.fieldConfig.industrysConfig;
    },
    // 企业规模
    enterprise_scale() {
      // return this.fieldConfig.enterprise_scale.children;
      return [];
    },
    // 商圈
    businessArea() {
      return this.fieldConfig.businessArea;
    },
    // 货款用途
    purpose_type() {
      return this.fieldConfig.purpose_type.children;
    },
    // 调查前否决原因
    before_survey_reject() {
      return this.fieldConfig.before_survey_reject.children;
    },
    // 经营真实性
    operateTruth() {
      return this.fieldConfig.operateTruth.children;
    },
    // 经营情况
    operateStatus() {
      return this.fieldConfig.operateStatus.children;
    },
    // 隐藏风险
    hiddenRisk() {
      return this.fieldConfig.hiddenRisk.children;
    },
    // 影藏风险受薪
    hiddenRiskStaff() {
      return this.fieldConfig.hiddenRiskStaff.children;
    },
    // 现金流
    cashFlow() {
      return this.fieldConfig.cashFlow.children;
    },
    operateStability() {
      return this.fieldConfig.operateStability.children;
    },
    // 其他异常
    otherException() {
      return this.fieldConfig.otherException.children;
    },
    otherExceptionStaff() {
      return this.fieldConfig.otherExceptionStaff.children;
    },
    // 业外投资
    serviceInvestment() {
      return this.fieldConfig.serviceInvestment.children;
    },
    // 对外投资(受薪)
    serviceInvestmentStaff() {
      return this.fieldConfig.serviceInvestmentStaff.children;
    },
    // 工作真实性
    jobTruth() {
      return this.fieldConfig.jobTruth.children;
    },
    // 工作稳定性
    jobStability() {
      return this.fieldConfig.jobStability.children;
    },
    // 居住真实性
    residenti_authenticity() {
      return this.fieldConfig.residenti_authenticity.children;
    },
    // 房屋住所真实性
    living_house_type() {
      return this.fieldConfig.living_house_type.children;
    }
  },
  created() {
    this.carInfoList = this.reportData.carInfoList;
    this.estateInfoList = this.reportData.estateInfoList;
    this.svyBossReport = this.reportData.svyBossReport;
    this.svyStaffReport = this.reportData.svyStaffReport;
    this.getSecondIndustrysConfig();
  },
  methods: {
    reserveConclusion,
    // 标准字段设置报告内容
    setReportContent(val, list) {
      let outVal = '';
      for (let x of list) {
        if (val === x.itemCode) {
          outVal = x.itemDesc;
        }
      }
      if (outVal === '') {
        outVal = val;
      }
      return outVal;
    },
    setBusinessArea(val, list) {
      let outVal = '';
      for (let x of list) {
        if (val === x.surveyAreaId) {
          outVal = x.surveyAreaName;
        }
      }
      return outVal;
    },
    // 标准字段设置报告多选内容
    setReportMultipleChoice(val, list) {
      let outVal = [];
      for (let v of val) {
        for (let x of list) {
          if (v === x.itemCode) {
            outVal.push(v + '-' + x.itemDesc);
          }
        }
      }
      return outVal.join('，');
    },
    getSecondIndustrysConfig() {
      let primaryIndustry = '';
      if (this.svyBossReport) {
        primaryIndustry = this.svyBossReport.primaryIndustry;
      } else if (this.svyStaffReport) {
        primaryIndustry = this.svyStaffReport.primaryIndustry;
      } else {
        return;
      }
      this.$store.dispatch('getSecIndustrysConfig', primaryIndustry).then(data => {
        this.secondIndustrysConfig = data.list;
      }).catch(err => {
        this.$error(err.message);
      });
    },
    headStyle({ row, rowIndex }) {
      return "my_table_head";
    },
    rowStyle({ row, rowIndex }) {
      return "my_table_body";
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.card_item{
  padding: 10px 0;
  border-bottom: 1px dashed rgba(151, 151, 151, 0.2);

  &:first-child{
    padding-top: 0;
  }
  &:last-child{
    padding-bottom: 0;
    border: none;
  }
}
</style>
