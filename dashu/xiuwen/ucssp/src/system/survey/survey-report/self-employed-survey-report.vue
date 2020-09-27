<template>
		<div class="report_content">
			<el-form :model="svyBossReport" :rules="rules" ref="svyBossReport" label-width="100px" label-position="top" class="">
        <div class="report-type">
          <div class="self-employed">
            <span class="self-custom" :class="{'active': reportType === '1'}"></span>
            <label for="self_employed">自雇报告</label>
            <input v-model="reportType" type="radio" name="report" value="1" id="self_employed" @change="changeReportType(1)">
          </div>
          <div class="salaried">
            <span class="salaried-custom" :class="{'active': reportType === '2'}"></span>
            <label for="salaried">受薪报告</label>
            <input v-model="reportType" type="radio" name="report" value="2" id="salaried" @change="changeReportType(2)">
          </div>
        </div>
				<div class="card_box">
					<div class="card_title">基本信息</div>
					<div class="card_item_box items_padding10">
						<div class="card_content"><span class="card_content_title">借款申请人姓名：</span><span class="card_content_font">{{svyBossReport.custName}}</span></div>
						<div class="card_content"><span class="card_content_title">调查日期：</span><span class="card_content_font">{{svyBossReport.surveyDate}}</span></div>
						<div class="card_content"><span class="card_content_title">目前调查距离（KM）：</span><span class="card_content_font">{{svyBossReport.initDistance}}</span></div>
						<div class="card_content"><span class="card_content_title">企业名称：</span><span class="card_content_font">{{svyBossReport.enterpriseName}}</span></div>
            <el-form-item label="性别" prop="sexy">
              <el-select v-model="svyBossReport.sexy" placeholder="请选择">
                <el-option
                  v-for="item in sexy"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
					</div>
					<div class="card_item_box">
						<!-- <el-form-item label="修改后调查距离" prop="updatedDistance" class="width245 hidden">
							<el-input v-model="svyBossReport.updatedDistance"  placeholder="请填写"></el-input>
						</el-form-item> -->
						<el-form-item label="调查地址" prop="surveyAddress" class="width530">
							<el-input v-model="svyBossReport.surveyAddress" placeholder="请填写" maxlength="100"></el-input>
						</el-form-item>
						<el-form-item label="办公固话" prop="workPhoneNum" class="width245">
							<el-input v-model="svyBossReport.workPhoneNum" placeholder="请填写" maxlength="12"></el-input>
						</el-form-item>
						<el-form-item label="婚姻状况" prop="maritalStatus" class="width245 margin_right0">
							<el-select v-model="svyBossReport.maritalStatus" placeholder="请选择">
								<el-option v-for="item in fieldConfig.marital_status.children" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="企业类型" prop="enterpriseType" class="width245">
							<el-select v-model="svyBossReport.enterpriseType" placeholder="请选择">
								<!-- <el-option v-for="item in fieldConfig.enterprise_type.children" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option> -->
							</el-select>
						</el-form-item>
						<el-form-item label="一级行业" prop="primaryIndustry" class="width245">
							<el-select v-model="svyBossReport.primaryIndustry" placeholder="请选择" @change="setSecondIndustry">
								<el-option v-for="item in fieldConfig.industrysConfig" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="二级行业" prop="secondIndustry" class="width245">
							<el-select v-model="svyBossReport.secondIndustry" placeholder="请选择">
								<el-option v-for="item in secondIndustrysConfig" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option>
							</el-select>
						</el-form-item>
						<!-- <el-form-item label="商圈" prop="surveyAreaId" class="width245 hidden">
							<el-select v-model="svyBossReport.surveyAreaId" placeholder="请选择">
								<el-option v-for="item in fieldConfig.businessArea" :key="item.surveyAreaId" :label="item.surveyAreaName" :value="item.surveyAreaId"></el-option>
							</el-select>
						</el-form-item> -->
						<el-form-item label="是否暗访" prop="secretInd">
							<el-switch :width="50" v-model="svyBossReport.secretInd" active-text="是" inactive-text="否" :active-value="true" :inactive-value="false"></el-switch>
						</el-form-item>
						<el-form-item label="配偶是否知晓贷款" prop="spouseKnowLoanInd">
							<el-switch :width="50" v-model="svyBossReport.spouseKnowLoanInd" active-text="是" inactive-text="否" :active-value="true" :inactive-value="false"></el-switch>
						</el-form-item>
					</div>
				</div>
				<div class="card_box">
					<div class="card_title">股份信息</div>
					<div class="card_item_box items_padding_top20">
						<el-form-item label="法人代表" prop="legalRepresentative" class="width245">
							<el-input v-model="svyBossReport.legalRepresentative" placeholder="请填写" maxlength="10"></el-input>
						</el-form-item>
						<el-form-item label="法人与申请人关系" prop="legalRelationship" class="width245">
              <el-select v-model="svyBossReport.legalRelationship" placeholder="请选择">
								<el-option v-for="item in fieldConfig.legal_relationship.children" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option>
							</el-select>
						</el-form-item>
            <el-form-item label="实际管理者与申请人关系" prop="legalRelationship" class="width245">
              <el-select v-model="svyBossReport.legalRelationship" placeholder="请选择">
							</el-select>
						</el-form-item>
            <el-form-item label="占股情况" prop="legalRelationship" class="width245">
              <el-select v-model="svyBossReport.legalRelationship" placeholder="请选择">
							</el-select>
						</el-form-item>
						<el-form-item label="申请人实际占股（%）" prop="applicantStocks" class="width245">
							<el-input v-model.number="svyBossReport.applicantStocks" placeholder="请填写"></el-input>
						</el-form-item>
						<el-form-item label="股东人数" prop="shareholderCnt" class="width245 margin_right0">
							<el-input v-model.number="svyBossReport.shareholderCnt" placeholder="请填写"></el-input>
						</el-form-item>
            <el-form-item label="股东对贷款态度" prop="legalRelationship" class="width245">
              <el-select v-model="svyBossReport.legalRelationship" placeholder="请选择">
							</el-select>
						</el-form-item>
            <el-form-item label="是否有法诉案件" prop="legalRelationship" class="width245">
              <el-select placeholder="请选择">
                <el-option
                  v-for="item in judge"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
						</el-form-item>
            <el-form-item label="申请人是否申报主体参与经营/工作" prop="legalRelationship" class="width245">
              <el-select placeholder="请选择">
                <el-option
                  v-for="item in judge"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
						</el-form-item>
            <el-form-item label="申请人在申报主体工作岗位" prop="legalRelationship" class="width245">
              <el-input maxlength="10" placeholder="请填写"></el-input>
						</el-form-item>
            <el-form-item label="配偶是否参与申报主体经营/工作" prop="" class="width245">
              <el-select placeholder="请选择">
                <el-option
                  v-for="item in judge"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
						</el-form-item>
            <el-form-item label="配偶在申报主体工作岗位" prop="" class="width245">
              <el-input maxlength="10" placeholder="请填写"></el-input>
						</el-form-item>
					</div>
				</div>
				<div class="card_box">
					<div class="card_title">经营历史</div>
					<div class="card_item_box items_padding_top20">
						<el-form-item label="从事本行业年限" prop="inThisLife" class="width245">
							<el-input v-model="svyBossReport.inThisLife" placeholder="请填写"></el-input>
						</el-form-item>
            <el-form-item label="本行业经营年限" prop="inThisLife" class="width245">
							<el-input v-model="svyBossReport.inThisLife" placeholder="请填写"></el-input>
						</el-form-item>
            <el-form-item label="申请主体经营年限" prop="inThisLife" class="width245">
							<el-input v-model="svyBossReport.inThisLife" placeholder="请填写"></el-input>
						</el-form-item>

            <el-form-item label="近2年股东变更次数" prop="inThisLife" class="width245">
							<el-input v-model="svyBossReport.inThisLife" placeholder="请填写"></el-input>
						</el-form-item>
            <el-form-item label="近2年主营业务变更次数" prop="inThisLife" class="width245">
							<el-input v-model="svyBossReport.inThisLife" placeholder="请填写"></el-input>
						</el-form-item>
            <el-form-item label="近2年经营场所变更次数" prop="inThisLife" class="width245">
							<el-input v-model="svyBossReport.inThisLife" placeholder="请填写"></el-input>
						</el-form-item>
            <el-form-item label="近3个月是否有搬迁计划" prop="inThisLife" class="width245">
              <el-select placeholder="请选择">
                <el-option
                  v-for="item in judge"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
						</el-form-item>
            <el-form-item label="最近一次股东变更原因" prop="inThisLife" class="width245">
							<el-input v-model="svyBossReport.inThisLife" maxlength="50" placeholder="请填写"></el-input>
						</el-form-item>

            <el-form-item label="最近一次主营业务变更原因" prop="inThisLife" class="width245">
							<el-input v-model="svyBossReport.inThisLife" maxlength="50" placeholder="请填写"></el-input>
						</el-form-item>
            <el-form-item label="最近一次经营场所变更原因" prop="inThisLife" class="width245">
							<el-input v-model="svyBossReport.inThisLife" maxlength="50" placeholder="请填写"></el-input>
						</el-form-item>
            <el-form-item label="搬迁原因" prop="inThisLife" class="width245">
							<el-input v-model="svyBossReport.inThisLife" maxlength="50" placeholder="请填写"></el-input>
						</el-form-item>

						<el-form-item label="此处经营年限" prop="operationYear" class="width245">
							<el-input v-model="svyBossReport.operationYear" placeholder="请填写"></el-input>
						</el-form-item>
						<el-form-item label="面积" prop="businessArea" class="width245">
							<el-input v-model="svyBossReport.businessArea" placeholder="请填写"></el-input>
						</el-form-item>
						<el-form-item label="经营场所" prop="businessPlace" class="width245 margin_right0">
              <el-select v-model="svyBossReport.businessPlace" placeholder="请选择" :disabled="!fieldConfig.business_place.statusInd">
								<el-option v-for="item in fieldConfig.business_place.children" :key="item.id" :label="item.itemDesc" :value="item.itemCode"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="股东是否有变更" prop="shareholdersChangeInd" class="width245">
							<el-select v-model="svyBossReport.shareholdersChangeInd" placeholder="请选择" :disabled="!fieldConfig.shareholders_change_ind.statusInd">
								<el-option v-for="item in fieldConfig.shareholders_change_ind.children" :key="item.id" :label="item.itemDesc" :value="item.itemCode"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item v-if="svyBossReport.shareholdersChangeInd === '1'" label="股东变更原因" prop="shareholdersChangeReason" class="width245">
							<el-input v-model="svyBossReport.shareholdersChangeReason" placeholder="请填写" maxlength="200"></el-input>
						</el-form-item>
						<el-form-item label="行业、主营业务是否有变更" prop="industryChangeInd" class="width245">
							<el-select v-model="svyBossReport.industryChangeInd" placeholder="请选择" :disabled="!fieldConfig.industry_change_ind.statusInd">
                <el-option v-for="item in fieldConfig.industry_change_ind.children" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item v-if="svyBossReport.industryChangeInd === '1' " label="行业、主营业务变更原因" prop="industryChangeReason" class="width245 margin_right0">
							<el-input v-model="svyBossReport.industryChangeReason" placeholder="请填写" maxlength="200"></el-input>
						</el-form-item>
						<el-form-item label="经营历史介绍" prop="businessHistory" class="width815">
							<el-input v-model="svyBossReport.businessHistory" placeholder="请填写" maxlength="500"></el-input>
						</el-form-item>
            <el-form-item label="从事本行业原因" prop="businessHistory" class="width815">
							<el-input v-model="svyBossReport.businessHistory" placeholder="请填写" maxlength="200"></el-input>
						</el-form-item>
					</div>
				</div>
				<div class="card_box">
					<div class="card_title">经营模式</div>
					<div class="card_item_box items_padding_top20">
						<el-form-item label="主营业务描述" prop="mainBusinessDescription" class="width815">
							<el-input v-model="svyBossReport.mainBusinessDescription" placeholder="请填写" maxlength="200"></el-input>
						</el-form-item>
            <el-form-item label="主营性质" prop="legalRelationship" class="width245">
              <el-select v-model="svyBossReport.legalRelationship" placeholder="请选择">
							</el-select>
						</el-form-item>
            <el-form-item label="企业类型" prop="" class="width245">
              <el-select placeholder="请选择">
							</el-select>
						</el-form-item>
            <el-form-item label="员工人数" prop="" class="width245">
							<el-input placeholder="请填写" maxlength="2"></el-input>
						</el-form-item>
            <el-form-item label="是否需要特殊行业资质" prop="" class="width245">
              <el-select placeholder="请选择">
                <el-option
                  v-for="item in judge"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
						</el-form-item>
            <el-form-item label="是否有特殊行业资质" prop="" class="width245">
              <el-select placeholder="请选择">
              </el-select>
						</el-form-item>
					</div>
          <div class="card_item_box">
						<el-form-item label="上游企业" prop="upEnterpriseType" class="width245">
							<el-input v-model="svyBossReport.upEnterpriseType" placeholder="请填写" maxlength="100"></el-input>
						</el-form-item>
						<el-form-item label="结算方式" prop="upEnterprisePaymentMethod" class="width245">
							<el-select v-model="svyBossReport.upEnterprisePaymentMethod" placeholder="请选择" :disabled="!fieldConfig.up_enterprise_payment_method.statusInd">
								<el-option v-for="item in fieldConfig.up_enterprise_payment_method.children" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option>
							</el-select>
						</el-form-item>
            <el-form-item label=" " prop="" class="width245">
							<el-select placeholder="请选择">
							</el-select>
						</el-form-item>
            <el-form-item label=" " prop="" class="width245">
							<el-select placeholder="请选择">
							</el-select>
						</el-form-item>
						<el-form-item label="账期（天）" prop="upEnterprisePaymentDays" class="width245">
							<el-input v-model="svyBossReport.upEnterprisePaymentDays" placeholder="请填写" maxlength="100"></el-input>
						</el-form-item>
            <el-form-item label="上游企业规模" prop="" class="width245">
              <el-select placeholder="请选择">
              </el-select>
						</el-form-item>
          </div>
          <div class="card_item_box">
						<el-form-item label="下游企业" prop="downEnterpriseType" class="width245">
							<el-input v-model="svyBossReport.downEnterpriseType" placeholder="请填写" maxlength="100"></el-input>
						</el-form-item>
						<el-form-item label="结算方式" prop="downEnterprisePaymentMethod" class="width245">
							<el-select v-model="svyBossReport.downEnterprisePaymentMethod" placeholder="请选择" :disabled="!fieldConfig.down_enterprise_payment_method.statusInd">
                <el-option v-for="item in fieldConfig.down_enterprise_payment_method.children" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option>
							</el-select>
						</el-form-item>
             <el-form-item label=" " prop="" class="width245">
							<el-select placeholder="请选择">
							</el-select>
						</el-form-item>
            <el-form-item label=" " prop="" class="width245">
							<el-select placeholder="请选择">
							</el-select>
						</el-form-item>
						<el-form-item label="账期（天）" prop="upEnterprisePaymentDays" class="width245">
							<el-input v-model="svyBossReport.upEnterprisePaymentDays" placeholder="请填写" maxlength="100"></el-input>
						</el-form-item>
            <el-form-item label="上游企业规模" prop="" class="width245">
              <el-select placeholder="请选择">
              </el-select>
						</el-form-item>
					</div>
				</div>

        <div class="card_box">
          <div class="card_title">家庭情况</div>
          <div class="card_item_box items_padding_top20">
            <el-form-item label="配偶居住地" prop="spouseArea">
              <el-select v-model="svyBossReport.spouseArea" placeholder="请选择">
                <el-option
                  v-for="item in area"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="父母居住地" prop="parentsArea">
              <el-select v-model="svyBossReport.parentsArea" placeholder="请选择">
                <el-option
                  v-for="item in area"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="子女居住地" prop="childrenArea">
              <el-select v-model="svyBossReport.childrenArea" placeholder="请选择">
                <el-option
                  v-for="item in area"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="是否愿意让配偶知晓贷款" prop="spouseKonw">
              <el-select v-model="svyBossReport.spouseKonw" placeholder="请选择">
                <el-option
                  v-for="item in judge"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>

          <div class="card_item_box">
            <el-form-item label="目前状态" prop="jobLimit">
              <el-select v-model="svyBossReport.spouseArea" placeholder="请选择">
                <el-option
                  v-for="item in area"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="目前状态" prop="jobLimit">
              <el-input maxlength="2"></el-input>
            </el-form-item>

            <el-form-item label="目前状态" prop="jobLimit">
              <el-input maxlength="2"></el-input>
            </el-form-item>
            <el-form-item label="配偶是否知晓贷款" prop="jobLimit">
              <el-input maxlength="2"></el-input>
            </el-form-item>
          </div>

          <div class="card_item_box">
            <el-form-item label="是否有收入来源" prop="spouseIncome">
              <el-select v-model="svyBossReport.spouseIncome" placeholder="请选择">
                <el-option
                  v-for="item in judge"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否有收入来源" prop="parentsIncome">
              <el-select v-model="svyBossReport.parentsIncome" placeholder="请选择">
                <el-option
                  v-for="item in judge"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否有收入来源" prop="childrenIncome">
              <el-select v-model="svyBossReport.childrenIncome" placeholder="请选择">
                <el-option
                  v-for="item in judge"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="配偶是否在现场" prop="spouse">
              <el-select v-model="svyBossReport.spouse" placeholder="请选择">
                <el-option
                  v-for="item in judge"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

          </div>

          <div class="card_item_box">
            <el-form-item label="是否有重大疾病等情况" prop="spouseDisease">
              <el-select v-model="svyBossReport.spouseDisease" placeholder="请选择">
                <el-option
                  v-for="item in judge"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否有重大疾病等情况" prop="parentsDisease">
              <el-select v-model="svyBossReport.parentsDisease" placeholder="请选择">
                <el-option
                  v-for="item in judge"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否有重大疾病等情况" prop="childrenDisease">
              <el-select v-model="svyBossReport.childrenDisease" placeholder="请选择">
                <el-option
                  v-for="item in judge"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="家庭定居地" prop="familyArea">
              <el-select v-model="svyBossReport.familyArea" placeholder="请选择">
                <el-option
                  v-for="item in area"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>

          </div>
        </div>

        <div class="card_box">
        <div class="card_title">资产信息
          <span class="button add__btn" @click="openAssetsBox">
            <span class="icon icon__add">+</span>新增
          </span>
        </div>
        <div class="card_item_box">
          <div class="dialog__table-box">
            <table>
              <thead>
                <tr>
                  <th>资产类型</th>
                  <th>购买价值</th>
                  <th>资产现值</th>
                  <th>资产权属</th>
                  <th>房产面积</th>
                  <th>本地/外地房产</th>
                  <th>房产地址/车辆品牌</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                <tr class="noList">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>暂无数据</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <el-button type="primary" icon="el-icon-edit" size="small" circle></el-button>
                    <el-button type="danger" icon="el-icon-delete" size="small" circle></el-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <addAssets v-if="showAssets" v-on:closeMessageBox="closeMessageBox" />

      <div class="card_box">
        <div class="card_title">业外投资
          <span class="button add__btn" @click="openInvestBox">
            <span class="icon icon__add">+</span>新增
          </span>
        </div>
        <div class="card_item_box">
           <el-table
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                prop="companyName"
                label="企业名称"
                width="150">
              </el-table-column>
              <el-table-column
                prop="register"
                label="是否注册"
                width="120">
              </el-table-column>
              <el-table-column
                prop="primaryIndustry"
                label="一级行业"
                width="120">
              </el-table-column>
              <el-table-column
                prop="secondIndustry"
                label="二级行业"
                width="120">
              </el-table-column>
              <el-table-column
                prop="businessDetail"
                label="主营业务描述"
                width="300">
              </el-table-column>
              <el-table-column
                prop="jobLimit"
                label="主营性质"
                width="120">
              </el-table-column>
              <el-table-column
                prop="date"
                label="企业名称"
                width="150">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="120">
              </el-table-column>
              <el-table-column
                prop="province"
                label="省份"
                width="120">
              </el-table-column>
              <el-table-column
                prop="city"
                label="市区"
                width="120">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                width="300">
              </el-table-column>
              <el-table-column
                prop="zip"
                label="邮编"
                width="120">
              </el-table-column>
              <el-table-column
                prop="date"
                label="企业名称"
                width="150">
              </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="120">
              </el-table-column>
              <el-table-column
                prop="province"
                label="省份"
                width="120">
              </el-table-column>
              <el-table-column
                prop="city"
                label="市区"
                width="120">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                width="300">
              </el-table-column>
              <el-table-column
                prop="zip"
                label="邮编"
                width="120">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button type="primary" @click="handleEdit(scope.$index, scope.row)" icon="el-icon-edit" size="small" circle></el-button>
                  <el-button type="danger"  @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete" size="small" circle></el-button>
                </template>
              </el-table-column>
            </el-table>
        </div>
      </div>

      <invest v-if="showInvest" v-bind:svyStaffReport="svyBossReport" v-bind:judge="judge"
       v-on:setSecondIndustry="setSecondIndustry" v-on:closeMessageBox="closeMessageBox"/>

				<!-- <div class="card_box">
					<div class="card_title">家庭资产情况</div>
          <div class="card_item_box items_padding_top20">
						<el-table :data="svyBossReport.estateInfoList" style="width:100%" :header-row-class-name="headStyle" :row-class-name="rowStyle">
							<el-table-column label="房产" width="50px">
								<template slot-scope="scope">
									<div>{{scope.$index+1}}</div>
								</template>
							</el-table-column>
							<el-table-column prop="addressCode" label="区域" width="320px">
								<template slot-scope="scope">
									<div v-if="!scope.row.isEdit">
                    {{ scope.row.estateId }}
									</div>
									<div v-if="scope.row.isEdit">
										<city-picker :value="scope.row.addressCode" @change="checkedAddress(scope.$index, scope.row, arguments)"></city-picker>
									</div>
								</template>
							</el-table-column>
							<el-table-column prop="addressDesc" label="详细地址">
								<template slot-scope="scope">
									<div v-if="!scope.row.isEdit">
										{{ scope.row.addressDesc }}
									</div>
									<el-form-item v-if="scope.row.isEdit" class="width128 margin0" :prop="'estateInfoList.'+scope.$index+'.addressDesc'" :rules="rules.addressDesc">
										<el-input v-model="scope.row.addressDesc" maxlength="100"></el-input>
									</el-form-item>
								</template>
							</el-table-column>
							<el-table-column prop="houseSizeMeas" label="面积">
								<template slot-scope="scope">
									<div v-if="!scope.row.isEdit">
										{{ scope.row.houseSizeMeas }}
									</div>
									<el-form-item v-if="scope.row.isEdit" class="width128 margin0" :prop="'estateInfoList.'+scope.$index+'.houseSizeMeas'" :rules="rules.houseSizeMeas">
										<el-input v-model="scope.row.houseSizeMeas"></el-input>
									</el-form-item>
								</template>
							</el-table-column>
							<el-table-column prop="estatePriceAmt" label="价值（万元）">
								<template slot-scope="scope">
									<div v-if="!scope.row.isEdit">
										{{ scope.row.estatePriceAmt }}
									</div>
									<el-form-item v-if="scope.row.isEdit" class="width128 margin0" :prop="'estateInfoList.'+scope.$index+'.estatePriceAmt'" :rules="rules.estatePriceAmt">
										<el-input v-model="scope.row.estatePriceAmt" maxlength="50"></el-input>
									</el-form-item>
								</template>
							</el-table-column>
							<el-table-column prop="estateTypeCode" label="房产性质">
								<template slot-scope="scope">
									<div v-show="!scope.row.isEdit">
										{{ scope.row.estateTypeCode }}
									</div>
									<div v-show="scope.row.isEdit">
                  <el-select v-model="scope.row.estateTypeCode" placeholder="请选择" :disabled="!fieldConfig.estate_type_code.statusInd">
                    <el-option v-for="item in fieldConfig.estate_type_code.children" :key="item.sortNum" :label="item.itemDesc" :value="item.itemDesc"></el-option>
                  </el-select>
									</div>
								</template>
							</el-table-column>
							<el-table-column label="操作">
								<template slot-scope="scope">
									<div class="operation_btn_group" v-show="!scope.row.isEdit">
										<div class="plus" v-if="estateInfoList.length < 5" @click="addHouse(scope.$index, scope.row)"></div>
										<div class="minus" v-if="estateInfoList.length > 1" @click="minusHouse(scope.$index, scope.row)"></div>
										<div class="edit" @click="editHouse(scope.$index, scope.row)"></div>
									</div>
									<div class="operation_btn_group" v-show="scope.row.isEdit">
										<div class="sure" @click="sureHouse(scope.$index, scope.row)"></div>
										<div class="minus" v-if="estateInfoList.length > 1" @click="minusHouse(scope.$index, scope.row)"></div>
									</div>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<div class="card_item_box items_padding_top20 items_padding_bottom20">
						<el-table :data="svyBossReport.carInfoList" style="width:100%" :header-row-class-name="headStyle" :row-class-name="rowStyle">
							<el-table-column label="车辆">
								<template slot-scope="scope">
									<div>{{scope.$index+1}}</div>
								</template>
							</el-table-column>
							<el-table-column prop="carBrand" label="车辆品牌">
								<template slot-scope="scope">
									<div v-if="!scope.row.isEdit">
										{{ scope.row.carBrand }}
									</div>
									<div v-if="scope.row.isEdit">
										<el-input v-model="scope.row.carBrand" maxlength="10"></el-input>
									</div>
								</template>
							</el-table-column>
							<el-table-column prop="carAmt" label="价值（万元）">
								<template slot-scope="scope">
									<div v-if="!scope.row.isEdit">
										{{ scope.row.carAmt }}
									</div>
									<el-form-item v-if="scope.row.isEdit" class="width128 margin0" :prop="'carInfoList.'+scope.$index+'.carAmt'" :rules="rules.carAmt">
										<el-input v-model="scope.row.carAmt" maxlength="50"></el-input>
									</el-form-item>
								</template>
							</el-table-column>
							<el-table-column label="操作">
								<template slot-scope="scope">
									<div class="operation_btn_group" v-show="!scope.row.isEdit">
										<div class="plus" v-if="carInfoList.length < 5" @click="addCar(scope.$index, scope.row)"></div>
										<div class="minus" v-if="carInfoList.length > 1" @click="minusCar(scope.$index, scope.row)"></div>
										<div class="edit" @click="editCar(scope.$index, scope.row)"></div>
									</div>
									<div class="operation_btn_group" v-show="scope.row.isEdit">
										<div class="sure" @click="sureCar(scope.$index, scope.row)"></div>
										<div class="minus" v-if="carInfoList.length > 1" @click="minusCar(scope.$index, scope.row)"></div>
									</div>
								</template>
							</el-table-column>
						</el-table>
					</div>
				</div> -->

				<!-- <div class="card_box">
					<div class="card_title">家庭情况</div>
					<div class="card_item_box items_padding_top20">
						<el-form-item prop="familySituation" class="text_area">
							<el-input type="textarea" resize="none" rows="4" v-model="svyBossReport.familySituation" placeholder="家庭情况描述（限制200字）" maxlength="200"></el-input>
						</el-form-item>
					</div>
				</div> -->

				<div class="card_box padding_bottom20">
					<div class="card_title">财务信息</div>
					<div class="card_panel">
						<div class="card_panel_title">
							<div class="panel_title_text">资产负债情况</div>
							<div class="panel_title_provisos"><span class="gray_font">单位：</span>万元</div>
						</div>
						<div class="card_panel_body">
							<div class="panel_content_left">
								<el-form-item label="现金和存款" prop="cashDeposits" class="width211">
									<el-input v-model.number="svyBossReport.cashDeposits" placeholder="请填写" maxlength="7"></el-input>
								</el-form-item>
								<el-form-item label="应收账款" prop="accountReceivable" class="width211">
									<el-input v-model.number="svyBossReport.accountReceivable" placeholder="请填写" maxlength="7"></el-input>
								</el-form-item>
								<el-form-item label="预付账款" prop="advancePayment" class="width211">
									<el-input v-model.number="svyBossReport.advancePayment" placeholder="请填写" maxlength="7"></el-input>
								</el-form-item>
								<el-form-item label="存货" prop="stock" class="width211">
									<el-input v-model.number="svyBossReport.stock" placeholder="请填写" maxlength="7"></el-input>
								</el-form-item>
								<el-form-item label="固定资产：机器设备" prop="fixedAssetsMachine" class="width211">
									<el-input v-model.number="svyBossReport.fixedAssetsMachine" placeholder="请填写" maxlength="7"></el-input>
								</el-form-item>
								<el-form-item label="固定资产：其他" prop="fixedAssetsOther" class="width211">
									<el-input v-model.number="svyBossReport.fixedAssetsOther" placeholder="请填写" maxlength="7"></el-input>
								</el-form-item>
								<el-form-item label="其他资产" prop="otherAssets" class="width211 margin200">
									<el-input v-model.number="svyBossReport.otherAssets" placeholder="请填写" maxlength="7"></el-input>
								</el-form-item>
								<el-form-item label="总资产" prop="totalAssets" class="width211 margin200 margin_bottom0">
									<el-input v-model.number="totalAssets" placeholder="请填写" :disabled="true"></el-input>
								</el-form-item>
							</div>
							<div class="panel_content_right">
								<el-form-item label="应付账款" prop="accountPayable" class="width211">
									<el-input v-model.number="svyBossReport.accountPayable" placeholder="请填写" maxlength="7"></el-input>
								</el-form-item>
								<el-form-item label="短期贷款" prop="shortLoan" class="width211">
									<el-input v-model.number="svyBossReport.shortLoan" placeholder="请填写" maxlength="7"></el-input>
								</el-form-item>
								<el-form-item label="长期贷款" prop="longLoan" class="width211">
									<el-input v-model.number="svyBossReport.longLoan" placeholder="请填写" maxlength="7"></el-input>
								</el-form-item>
								<el-form-item label="其他负债" prop="otherDebt" class="width211">
									<el-input v-model.number="svyBossReport.otherDebt" placeholder="请填写" maxlength="7"></el-input>
								</el-form-item>
								<el-form-item label="总负债" prop="totalDebt" class="width211 margin200">
									<el-input v-model.number="totalDebt" placeholder="请填写" :disabled="true"></el-input>
								</el-form-item>
								<el-form-item label="权益" prop="rightInterest" class="width211 margin200">
									<el-input v-model.number="rightInterest" placeholder="请填写" :disabled="true"></el-input>
								</el-form-item>
							</div>
						</div>
					</div>
					<div class="card_panel card_panel_reset">
						<div class="card_panel_title">
							<div class="panel_title_text">损益情况</div>
							<div class="panel_title_provisos"><span class="gray_font">单位：</span>万元</div>
						</div>
						<div class="card_item_box panel_body_item">
							<el-form-item label="近一年销售额" prop="yearSales" class="width211">
								<el-input v-model.number="svyBossReport.yearSales" placeholder="请填写" maxlength="7"></el-input>
							</el-form-item>
              <el-form-item label="员工年总工资" prop="employeesTotalWages" class="width211">
								<el-input v-model.number="svyBossReport.employeesTotalWages" placeholder="请填写" maxlength="7"></el-input>
							</el-form-item>
							<el-form-item label="旺季月份与销售" prop="peakSalesSeason" class="width211">
								<el-input v-model.number="svyBossReport.peakSalesSeason" placeholder="请填写" maxlength="7"></el-input>
							</el-form-item>
              <el-form-item label="今年到现在的销售额" prop="salesToNow" class="width211">
								<el-input v-model.number="svyBossReport.salesToNow" placeholder="请填写" maxlength="7"></el-input>
							</el-form-item>
              <el-form-item label="水电费/年" prop="utilitiesYear" class="width211">
								<el-input v-model.number="svyBossReport.utilitiesYear" placeholder="请填写" maxlength="7"></el-input>
							</el-form-item>
              <el-form-item label="淡季月份与销售" prop="offSalesSeason" class="width211">
								<el-input v-model.number="svyBossReport.offSalesSeason" placeholder="请填写" maxlength="7"></el-input>
							</el-form-item>
              <el-form-item label="上个月的销售额" prop="lastMonthSales" class="width211">
								<el-input v-model.number="svyBossReport.lastMonthSales" placeholder="请填写" maxlength="7"></el-input>
							</el-form-item>
              <el-form-item label="租金/年" prop="rentYear" class="width211 margin_right370">
								<el-input v-model.number="svyBossReport.rentYear" placeholder="请填写" maxlength="7"></el-input>
							</el-form-item>
							<el-form-item label="平均毛利润率（%）" prop="averageMargin" class="width211">
								<el-input v-model.number="svyBossReport.averageMargin" placeholder="请填写" maxlength="3"></el-input>
							</el-form-item>
              <el-form-item label="其他大项开支/年" prop="spendPerYear" class="width211 margin_right370">
								<el-input v-model.number="svyBossReport.spendPerYear" placeholder="请填写" maxlength="7"></el-input>
							</el-form-item>
              <el-form-item label="去年一年净利润" prop="netProfitLastYear" class="width211">
								<el-input v-model.number="netProfitLastYear" placeholder="请填写" :disabled="true"></el-input>
							</el-form-item>
              <!-- <div class="width211 total-expenditure">
                <div>年总开支：<span class="orange">{{totalSpend}}</span></div>
              </div>
							<el-form-item label="营业额验证方式" prop="turnoverMode" class="width790">
								<el-input v-model="svyBossReport.turnoverMode" placeholder="请填写" maxlength="200"></el-input>
							</el-form-item>
							<el-form-item label="财务数据异常描述" prop="dataDescription" class="width790">
								<el-input v-model="svyBossReport.dataDescription" placeholder="请填写" maxlength="200"></el-input>
							</el-form-item> -->
						</div>
					</div>
				</div>

        <div class="card_box">
          <div class="card_title">隐藏负债
            <span class="button add__btn" @click="openDebtBox">
              <span class="icon icon__add">+</span>新增
            </span>
          </div>
          <div class="card_item_box">
            <div class="dialog__table-box">
              <table>
                <thead>
                  <tr>
                    <th>债权方性质</th>
                    <th>贷款性质</th>
                    <th>债权方</th>
                    <th>利率%（年化）</th>
                    <th>贷款期数</th>
                    <th>贷款金额</th>
                    <th>余额</th>
                    <th>贷款用途</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="noList">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>暂无数据</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      <debt v-if="showDebt" v-bind:svyStaffReport="svyBossReport" v-on:closeMessageBox="closeMessageBox"
      v-on:limitMoney="limitMoney" v-on:limitNumber="limitNumber" />

      <div class="card_box">
        <div class="card_title">验证方式
          <span class="button add__btn" @click="openVerifyBox">
            <span class="icon icon__add">+</span>新增
          </span>
        </div>
        <div class="card_item_box">
          <div class="dialog__table-box">
            <table>
              <thead>
                <tr>
                  <th>营业额验证</th>
                  <th>计算过程</th>
                  <th>营业额结果</th>
                  <th>财务数据异常描述</th>
                </tr>
              </thead>
              <tbody>
                <tr class="noList">
                  <td>暂无数据</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <verify v-if="showVerify" v-bind:svyBossReport="svyBossReport" v-on:closeMessageBox="closeMessageBox" />

      <div class="card_box">
					<div class="card_title">贷款用途</div>
					<div class="card_item_box items_padding_top20">
						<el-form-item label="贷款用途" prop="purposeType" class="width245">
							<el-select v-model="svyBossReport.purposeType" placeholder="请选择" :disabled="!fieldConfig.purpose_type.statusInd">
                <el-option v-for="item in fieldConfig.purpose_type.children" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option>
							</el-select>
						</el-form-item>

            <el-form-item label="资金使用人" prop="purposeType" class="width245">
							<el-select placeholder="请选择">
                <el-option></el-option>
							</el-select>
						</el-form-item>

            <el-form-item label="具体用途" prop="purposeType" class="width245">
							<el-select placeholder="请选择">
                <el-option></el-option>
							</el-select>
						</el-form-item>

            <el-form-item label="资金短缺原因" prop="purposeType" class="width245">
							<el-select placeholder="请选择">
                <el-option></el-option>
							</el-select>
						</el-form-item>

            <el-form-item label="资金缺口" prop="purposeDesc" class="width245">
							<el-input v-model="svyBossReport.purposeDesc" placeholder="请填写" maxlength="200"></el-input>
						</el-form-item>

						<el-form-item label="用途描述" prop="purposeDesc" class="width815 margin_right0">
							<el-input v-model="svyBossReport.purposeDesc" placeholder="请填写" maxlength="200"></el-input>
						</el-form-item>
					</div>
				</div>

        <div class="card_box">
					<div class="card_title">现场情况</div>
					<div class="card_item_box items_padding_top20">
            <el-form-item label="面积" prop="purposeDesc" class="width245">
							<el-input v-model="svyBossReport.purposeDesc" placeholder="请填写" maxlength="200"></el-input>
						</el-form-item>
            <el-form-item label="现场员工数量" prop="purposeDesc" class="width245">
							<el-input v-model="svyBossReport.purposeDesc" placeholder="请填写" maxlength="200"></el-input>
						</el-form-item>
						<el-form-item label="现场提供资料类型" prop="purposeDesc">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="">营业执照</el-checkbox>
                <el-checkbox label="">房产证</el-checkbox>
                <el-checkbox label="租赁合同"></el-checkbox>
                <el-checkbox label="供销及采购合同"></el-checkbox>
                <el-checkbox label="帐单"></el-checkbox>
                <el-checkbox label="存货清单"></el-checkbox>
                <el-checkbox label="银行存款账户"></el-checkbox>
                <el-checkbox label="现金"></el-checkbox>
                <el-checkbox label="支付宝/微信收款记录"></el-checkbox>
                <el-checkbox label="收银系统"></el-checkbox>
                <el-checkbox label="其它"></el-checkbox>
              </el-checkbox-group>
						</el-form-item>
					</div>
				</div>

        <div class="card_box">
					<div class="card_title">三方信息</div>
					<div class="card_item_box items_padding_top20">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="">申请人口碑好</el-checkbox>
              <el-checkbox label="">申请主体长期关门</el-checkbox>
              <el-checkbox label="">申请主体被查封/限改</el-checkbox>
              <el-checkbox label="">申请人家庭不稳定</el-checkbox>
              <el-checkbox label="">申报主体经营稳定</el-checkbox>
              <el-checkbox label="">申请主体正在转让</el-checkbox>
              <el-checkbox label="">申请人对外欠款</el-checkbox>
              <el-checkbox label="">申请人道德品质差</el-checkbox>
              <el-checkbox label="">申报主体经营时间1年以上</el-checkbox>
              <el-checkbox label="">申请主体违规经营</el-checkbox>
              <el-checkbox label="">申请人涉及黄赌毒</el-checkbox>
              <el-checkbox label="">周边是否有拆迁迹象</el-checkbox>
            </el-checkbox-group>
					</div>
				</div>

				<div class="card_box">
					<div class="card_title">调查结论</div>
					<div class="card_item_box items_padding_top20">
						<!-- <el-form-item label="调查前否决原因" prop="beforeSurveyReject" class="width245">
							<el-select v-model="svyBossReport.beforeSurveyReject" placeholder="请选择" @change="setBeforeSurveyReject" :disabled="!fieldConfig.before_survey_reject.statusInd">
								<el-option v-for="item in fieldConfig.before_survey_reject.children" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option>
							</el-select>
						</el-form-item> -->
            <el-form-item label="备注" prop="beforeSurveyRejectDesc" class="width815 margin_right0">
              <el-input v-model="svyBossReport.beforeSurveyRejectDesc" placeholder="请填写" maxlength="200"></el-input>
            </el-form-item>
            <div v-if="showVeto">
							<el-form-item label="经营真实性" prop="operateTruth" class="width245">
								<el-select v-model="svyBossReport.operateTruth" placeholder="请选择">
									<el-option v-for="item in fieldConfig.operateTruth.children" :key="item.sortNum" :label="item.itemCode+' '+item.itemDesc" :value="item.itemCode"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="经营真实性备注" prop="operateTruthRemark" class="width815 margin_right0">
								<el-input v-model="svyBossReport.operateTruthRemark" placeholder="请填写" maxlength="200"></el-input>
							</el-form-item>
							<el-form-item label="经营情况" prop="operateStatus" class="width245">
								<el-select v-model="svyBossReport.operateStatus" placeholder="请选择">
									<el-option v-for="item in fieldConfig.operateStatus.children" :key="item.sortNum" :label="item.itemCode+' '+item.itemDesc" :value="item.itemCode"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="经营情况备注" prop="operateStatusRemark" class="width815 margin_right0">
								<el-input v-model="svyBossReport.operateStatusRemark" placeholder="请填写" maxlength="200"></el-input>
							</el-form-item>
							<el-form-item label="隐藏风险" prop="hiddenRisk"  class="width245">
								<el-select v-model="svyBossReport.hiddenRisk" multiple placeholder="请选择" @change="setHiddenRisk">
									<el-option v-for="item in fieldConfig.hiddenRisk.children" :key="item.sortNum" :label="item.itemCode+' '+item.itemDesc" :value="item.itemCode"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="隐藏风险备注" prop="hiddenRiskRemark" class="width815 margin_right0">
								<el-input v-model="svyBossReport.hiddenRiskRemark" placeholder="请填写" maxlength="200"></el-input>
							</el-form-item>
							<el-form-item label="业外投资" prop="serviceInvestment" class="width245">
								<el-select v-model="svyBossReport.serviceInvestment" placeholder="请选择">
									<el-option v-for="(item,index) in fieldConfig.serviceInvestment.children" :key="index" :label="item.itemCode+' '+item.itemDesc" :value="item.itemCode"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="业外投资备注" prop="serviceInvestmentRemark" class="width815 margin_right0">
								<el-input v-model="svyBossReport.serviceInvestmentRemark" placeholder="请填写" maxlength="200"></el-input>
							</el-form-item>
							<el-form-item label="现金流" prop="cashFlow" class="width245">
                <el-select v-model="svyBossReport.cashFlow" multiple placeholder="请选择">
                  <el-option v-for="item in fieldConfig.cashFlow.children" :key="item.sortNum" :label="item.itemCode+' '+item.itemDesc" :value="item.itemCode"></el-option>
                </el-select>
							</el-form-item>
							<el-form-item label="现金流备注" prop="cashFlowRemark" class="width815 margin_right0">
								<el-input v-model="svyBossReport.cashFlowRemark" placeholder="请填写" maxlength="200"></el-input>
							</el-form-item>
              <el-form-item label="经营稳定性" prop="operateStability" class="width245">
                <el-select v-model="svyBossReport.operateStability" multiple placeholder="请选择">
                  <el-option v-for="item in fieldConfig.operateStability.children" :key="item.sortNum" :label="item.itemCode+' '+item.itemDesc" :value="item.itemCode"></el-option>
                </el-select>
							</el-form-item>
							<el-form-item label="经营稳定性备注" prop="operateStabilityRemark" class="width815 margin_right0">
								<el-input v-model="svyBossReport.operateStabilityRemark" placeholder="请填写" maxlength="200"></el-input>
							</el-form-item>
							<el-form-item label="其他异常" prop="otherException" class="width245 margin_bottom10">
								<el-select v-model="svyBossReport.otherException" multiple placeholder="请选择">
									<el-option v-for="item in fieldConfig.otherException.children" :key="item.sortNum" :label="item.itemCode+' '+item.itemDesc" :value="item.itemCode"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="其他异常备注" prop="otherExceptionRemark" class="width815 margin_right0 margin_bottom10">
								<el-input v-model="svyBossReport.otherExceptionRemark" placeholder="请填写" maxlength="200"></el-input>
							</el-form-item>
            </div>
					</div>
					<!-- <div class="card_item_box margin_bottom10">
						<div class="card_item"><span class="card_content_title">综合意见：</span><span class="card_itemFont">{{svyBossReport.overallOpinion}}</span></div>
						<div class="card_item"><span class="card_content_title">调查结论：</span><span class="card_itemFont">{{svyBossReport.surveyConclusion}}</span></div>
					</div> -->
					<div class="card_item_box">
						<el-form-item label="详情描述" prop="detailDescribe" class="text_area">
							<el-input type="textarea" resize="none" rows="4" v-model="svyBossReport.detailDescribe" placeholder="详情描述（限500字以内）" maxlength="500"></el-input>
						</el-form-item>
					</div>
				</div>
				<div class="card_box">
					<div class="card_title">家访信息</div>
					<div class="card_item_box items_padding_top20">
						<el-form-item label="居住真实性" prop="residentiAuthenticity" class="width245">
							<el-select v-model="svyBossReport.residentiAuthenticity" placeholder="请选择">
								<el-option v-for="item in fieldConfig.residenti_authenticity.children" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="实际居住状态" prop="livingState" class="width245">
              <el-select v-model="svyBossReport.livingState" placeholder="请选择">
                <el-option v-for="item in fieldConfig.living_house_type.children" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="居住年限（年）" prop="residenceTime" class="width245">
							<el-input v-model="svyBossReport.residenceTime" placeholder="请填写"></el-input>
						</el-form-item>
						<el-form-item label="是否家访" prop="homeVisitInd">
							<el-switch :width="50" v-model="svyBossReport.homeVisitInd" active-text="是" inactive-text="否" :active-value="true" :inactive-value="false" @change="setHomeVisit"></el-switch>
						</el-form-item>
						<el-form-item label="是否与家人同住" prop="withFamilyInd">
							<el-switch :width="50" v-model="svyBossReport.withFamilyInd" active-text="是" inactive-text="否" :active-value="true" :inactive-value="false"></el-switch>
						</el-form-item>
						<el-form-item label="面积（平方米）" prop="livingArea" class="width245">
              <el-input v-model="svyBossReport.livingArea" placeholder="请填写" maxlength="50"></el-input>
						</el-form-item>
						<el-form-item label="租金水平（元/月/平米）" prop="rentMonthSqm" class="width245">
							<el-input v-model="svyBossReport.rentMonthSqm" placeholder="请填写"></el-input>
						</el-form-item>
            <el-form-item label="装修程度" prop="purposeType" class="width245">
							<el-select placeholder="请选择">
                <el-option></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="家访地址" prop="homeVisitAddress" class="width530 margin_right0">
							<el-input v-model="svyBossReport.homeVisitAddress" placeholder="请填写" maxlength="150"></el-input>
						</el-form-item>
						<el-form-item label="异常情况描述" prop="exceptionDescription" class="width815">
							<el-input v-model="svyBossReport.exceptionDescription" placeholder="请填写" maxlength="200"></el-input>
						</el-form-item>
					</div>
				</div>
			</el-form>
		</div>
</template>

<script>
import "@common/css/dialog";
import reportValidator from "../js/reportRules.js";
import ruleValidators from "@common/js/rules.js";
import {surveyApi} from "../js/server.js";
import {multipleChoice, yesNo} from "../js/utils.js";
import CityPicker from "@/components/cityPicker/CityPicker";
import { mapGetters } from 'vuex';
import addAssets from "./addAssets"; // 增加资产信息
import invest from "./invest"; // 增加业外投资
import debt from "./debt"; // 增加隐藏负债
import verify from "./verify"; // 增加验证方式

export default {
  props: {
    applicationId: {
      type: String
    },
    custInfo: {
      type: Object,
      default: function() {
        return {
          custName: '',
          surveyDate: '', // 调查时间............数据源未知
          careerTypeCode: '',
          initDistance: '',
          workplaceName: ''
        };
      }
    },
    reportData: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      checkList: [], // 现场提供资料类型
      tableData: [],
      showInvest: false, // 显示业外投资弹窗
      showAssets: false, // 显示新增资产信息弹窗
      showDebt: false, // 显示隐藏负债弹窗
      showVerify: false, // 显示验证方式弹窗

      reportType: "1", // 自雇报告
      reportRequest: {
        applicationId: '',
        flag: false
      },
      initFlag: false, // 报告数据初始化状态，用于区别初始二级行业和切换一级行业
      showVeto: true,
      // 查验是否上传了图片
      searchInfo: {
        applyNo: '',
        fileType: 'picture'
      },
      // 性别
      sexy: [{
        value: '1',
        label: '男'
      }, {
        value: '0',
        label: '女'
      }],
      // 是否
      judge: [{
        value: '1',
        label: '是'
      }, {
        value: '0',
        label: '否'
      }],
      // 本地、外地
      area: [{
        value: '1',
        label: '本地'
      }, {
        value: '0',
        label: '外地'
      }],
      secondIndustrysConfig: [], // 二级行业列表
      // 车辆信息
      carInfoList: [{
        isEdit: true,
        carAmt: '', // 价值（万元）
        carBrand: '', // 车辆品牌
        reportId: ''
      }],
      // 房产信息
      estateInfoList: [{
        isEdit: true,
        addressChecked: '',
        addressCode: '', // 区域编码
        addressDesc: '', // 详细地址
        estatePriceAmt: '', // 价值(万元)
        estateTypeCode: '', // 房产性质
        houseSizeMeas: '', // 面积（m^3）
        reportId: ''
      }],

      svyBossReport: {
        sexy: "", // 性别
        updatedDistance: "", // 修改后调查距离
        surveyAddress: "", // 调查地址
        workPhoneNum: "", // 办公固话、、
        maritalStatus: "", // 婚姻状况
        enterpriseType: "", // 企业类型
        primaryIndustry: "", // 一级行业
        secondIndustry: "", // 二级行业
        surveyAreaId: "", // 商圈
        secretInd: false, // 是否暗访
        spouseKnowLoanInd: false, // 配偶是否知晓贷款

        legalRepresentative: "", // 法人代表
        legalRelationship: "", // 法人与申请人关系
        applicantStocks: "", // 申请人占股
        shareholderCnt: "", // 股东人数 。。。。。。。。。。。。。接口请求无此字段

        inThisLife: "", // 从事本行业年限
        operationYear: "", // 此处经营年限
        businessArea: "", // 经营场所面积
        businessPlace: "", // 经营场所
        shareholdersChangeInd: "", // 股东是否有变更
        shareholdersChangeReason: "", // 股东变更原因
        industryChangeInd: "", // 行业、主营业务是否有变更
        industryChangeReason: "", // 行业、主营业务变更原因
        businessHistory: "", // 经营历史介绍

        familyArea: "", // 家庭定居地
        spouse: "", // 配偶是否在现场
        childrenArea: "", // 子女居住地
        parentsArea: "", // 父母居住地
        spouseArea: "", // 配偶居住地
        spouseKonw: "", // 是否愿意让配偶知晓贷款
        spouseIncome: "", // 是否有收入来源-配偶
        parentsIncome: "", // 是否有收入来源-父母
        childrenIncome: "", // 是否有收入来源-子女
        spouseDisease: "", // 是否有重大疾病等情况-配偶
        parentsDisease: "", // 是否有重大疾病等情况-父母
        childrenDisease: "", // 是否有重大疾病等情况-子女

        mainBusinessDescription: "", // 主营业务描述
        upEnterpriseType: "", // 上游企业类型
        upEnterprisePaymentMethod: "", // 上游企业结算方式
        upEnterprisePaymentDays: "", // 上游企业账期
        downEnterpriseType: "", // 下游企业类型
        downEnterprisePaymentMethod: "", // 下游企业结算方式
        downEnterprisePaymentDays: "", // 下游企业账期

        purposeType: "", // 贷款用途
        purposeDesc: "", // 详细内容

        familySituation: "", // 家庭情况

        cashDeposits: "", // 现金和存款
        accountReceivable: "", // 应收账款
        advancePayment: "", // 预付账款
        stock: "", // 存货
        fixedAssetsMachine: "", // 固定资产：机器设备
        fixedAssetsOther: "", // 固定资产：其他
        otherAssets: "", // 其他资产
        totalAssets: "", // 总资产

        accountPayable: "", // 应付账款
        shortLoan: "", // 短期贷款
        longLoan: "", // 长期贷款
        otherDebt: "", // 其他负债
        totalDebt: "", // 总负债
        rightInterest: "", // 权益

        yearSales: "", // 近一年销售额
        peakSalesSeason: "", // 旺季月份与销售
        averageMargin: "", // 平均毛利润率
        offSalesSeason: "", // 淡季月份与销售
        totalSpend: "", // 年总开支
        salesToNow: "", // 今年到现在的销售额
        netProfitLastYear: "", // 去年一年净利润
        lastMonthSales: "", // 上个月的销售额
        employeesTotalWages: "", // 员工年总工资
        utilitiesYear: "", // 水电费/年
        rentYear: "", // 租金/年
        spendPerYear: "", // 其他大项开支/年
        turnoverMode: "", // 营业额验证方式
        dataDescription: "", // 财务数据异常描述

        beforeSurveyReject: "", // 调查前否决原因
        beforeSurveyRejectDesc: "", // 调查前否决原因备注
        operateTruth: "", // 经营真实性
        operateTruthRemark: "", // 经营真实性备注
        operateStatus: "", // 经营情况
        operateStatusRemark: "", // 经营情况备注
        hiddenRisk: [], // 隐藏风险
        hiddenRiskRemark: "", // 隐藏风险备注
        serviceInvestment: "", // 业外投资
        serviceInvestmentRemark: "", // 业外投资备注
        cashFlow: [], // 现金流
        cashFlowRemark: "", // 现金流备注
        operateStability: [], // 经营稳定性
        operateStabilityRemark: "", // 经营稳定性备注
        otherException: [], // 其他异常
        otherExceptionRemark: "", // 其他异常备注
        overallOpinion: "", // 综合意见
        surveyConclusion: "", // 调查结论
        detailDescribe: "", // 详情描述

        residentiAuthenticity: "", // 居住真实性
        livingState: "", // 实际居住状态
        residenceTime: "", // 居住年限
        homeVisitInd: "", // 是否家访
        withFamilyInd: "", // 是否与家人同住
        livingArea: "", // 面积（平方米）
        rentMonthSqm: "", // 租金水平（元/月/平米）
        homeVisitAddress: "", // 家访地址
        exceptionDescription: "" // 异常情况描述
      },
      rules: {
        addressDesc: [
          {trigger: 'blur', message: '填写错误', validator: reportValidator.noLengthSpecial}
        ],
        houseSizeMeas: [
          { trigger: 'blur', message: '填写错误', validator: reportValidator.numberValid(0, NaN, '面积') }
        ],
        estatePriceAmt: [
          { trigger: 'blur', message: '填写错误', validator: reportValidator.numberValid(0, NaN, '价值') }
        ],
        carAmt: [
          { trigger: 'blur', message: '填写错误', validator: reportValidator.numberValid(0, NaN, '价值') }
        ],
        updatedDistance: [
          { trigger: "blur", validator: reportValidator.numberValid(0, NaN, '调查距离') }
        ],
        surveyAddress: [
          { required: true, trigger: 'blur', message: '请填写' },
          { max: 100, trigger: 'blur', message: '字数超限' }
        ],
        workPhoneNum: [
          { trigger: 'blur', validator: ruleValidators.number },
          { min: 11, trigger: 'blur', message: '长度不足' },
          { max: 12, trigger: 'blur', message: '超出长度' }
        ],
        maritalStatus: [
          { required: true, trigger: 'change', message: '请选择' }
        ],
        enterpriseType: [],
        primaryIndustry: [],
        secondIndustry: [],
        legalRepresentative: [
          { max: 10, trigger: 'blur', message: '字数超限' }
        ],
        legalRelationship: [],
        applicantStocks: [
          { trigger: 'blur', validator: reportValidator.numberValid(0, 100, '占股') }
        ],
        shareholderCnt: [
          { trigger: 'blur', validator: reportValidator.numberValid(0, 100, '股东人数') }

        ],
        inThisLife: [
          { trigger: 'blur', validator: reportValidator.numberValid(0, 50, '从事行业年限') }
        ],
        operationYear: [
          { trigger: 'blur', validator: reportValidator.numberValid(0, 50, '此处经营年限') }
        ],
        businessArea: [
          { trigger: 'blur', validator: reportValidator.numberValid(0, NaN, '经营面积') }
        ],
        shareholdersChangeReason: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ],
        industryChangeReason: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ],
        businessHistory: [
          { max: 500, trigger: 'blur', message: '字数超限' }
        ],
        mainBusinessDescription: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ],
        upEnterpriseType: [
          { max: 100, trigger: 'blur', message: '字数超限' }
        ],
        upEnterprisePaymentDays: [
          { max: 100, trigger: 'blur', message: '字数超限' } // 长度限制修改
        ],
        downEnterpriseType: [
          { max: 100, trigger: 'blur', message: '字数超限' }
        ],
        downEnterprisePaymentDays: [
          { max: 100, trigger: 'blur', message: '字数超限' } // 长度限制修改
        ],
        purposeDesc: [
          { max: 200, trigger: 'blur', message: '字数超限' } // 长度限制修改
        ],
        familySituation: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ],
        cashDeposits: [
          { trigger: 'blur', message: '数值超限', validator: reportValidator.numBit }
        ],
        accountReceivable: [
          { trigger: 'blur', message: '数值超限', validator: reportValidator.numBit }
        ],
        advancePayment: [
          { trigger: 'blur', message: '数值超限', validator: reportValidator.numBit }
        ],
        stock: [
          { trigger: 'blur', message: '数值超限', validator: reportValidator.numBit }
        ],
        fixedAssetsMachine: [
          { trigger: 'blur', message: '数值超限', validator: reportValidator.numBit }
        ],
        fixedAssetsOther: [
          { trigger: 'blur', message: '数值超限', validator: reportValidator.numBit }
        ],
        otherAssets: [
          { trigger: 'blur', message: '数值超限', validator: reportValidator.numBit }
        ],
        totalAssets: [],
        accountPayable: [
          { trigger: 'blur', message: '数值超限', validator: reportValidator.numBit }
        ],
        shortLoan: [
          { trigger: 'blur', message: '数值超限', validator: reportValidator.numBit }
        ],
        longLoan: [
          { trigger: 'blur', message: '数值超限', validator: reportValidator.numBit }
        ],
        otherDebt: [
          { trigger: 'blur', message: '数值超限', validator: reportValidator.numBit }
        ],
        totalDebt: [],
        rightInterest: [],
        yearSales: [
          { trigger: 'blur', message: '数值超限', validator: reportValidator.numBit }
        ],
        peakSalesSeason: [
          { trigger: 'blur', message: '数值超限', validator: reportValidator.numBit }
        ],
        averageMargin: [
          { trigger: 'blur', message: '数值超限', validator: reportValidator.numberValid(0, 100, '毛利润') }
        ],
        offSalesSeason: [
          { trigger: 'blur', message: '数值超限', validator: reportValidator.numBit }
        ],
        totalSpend: [],
        salesToNow: [
          { trigger: 'blur', message: '数值超限', validator: reportValidator.numBit }
        ],
        netProfitLastYear: [],
        lastMonthSales: [
          { trigger: 'blur', message: '数值超限', validator: reportValidator.numBit }
        ],
        employeesTotalWages: [
          { trigger: 'blur', message: '数值超限', validator: reportValidator.numBit }
        ],
        utilitiesYear: [
          { trigger: 'blur', message: '数值超限', validator: reportValidator.numBit }
        ],
        rentYear: [
          { trigger: 'blur', message: '数值超限', validator: reportValidator.numBit }
        ],
        spendPerYear: [
          { trigger: 'blur', message: '数值超限', validator: reportValidator.numBit }
        ],
        turnoverMode: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ],
        dataDescription: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ],
        beforeSurveyRejectDesc: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ],
        operateTruth: [
          { required: true, trigger: 'change', message: '请选择' }
        ],
        operateTruthRemark: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ],
        operateStatus: [],
        operateStatusRemark: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ],
        hiddenRisk: [],
        hiddenRiskRemark: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ],
        serviceInvestment: [],
        serviceInvestmentRemark: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ],
        cashFlow: [],
        cashFlowRemark: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ],
        operateStability: [],
        operateStabilityRemark: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ],
        otherException: [],
        otherExceptionRemark: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ],
        detailDescribe: [
          { max: 500, trigger: 'blur', message: '字数超限' }
        ],
        residentiAuthenticity: [],
        livingState: [],
        residenceTime: [
          { trigger: 'blur', validator: reportValidator.numberValid(0, 50, '年限') }
        ],
        homeVisitInd: [],
        withFamilyInd: [],
        livingArea: [
          { trigger: 'blur', validator: reportValidator.numberValid(0, NaN, '面积') }
        ],
        rentMonthSqm: [
          { trigger: 'blur', validator: reportValidator.numberValid(0, NaN, '租金') }
        ],
        homeVisitAddress: [
          { max: 150, trigger: 'blur', message: '请输入150字符以内' } // 修改字数限制
        ],
        exceptionDescription: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ]
      },
      operateTruth: [
        { required: true, trigger: 'change', message: '请选择' }
      ],
      needChoice: [
        { required: true, trigger: 'change', message: '请选择' }
      ],
      needWrite: { required: true, trigger: 'blur', message: '请填写' }
    };
  },
  computed: {
    ...mapGetters([
      'surveyId', // vuex 传参
      'fieldConfig'
    ]),
    totalAssets: { // 总资产
      get() {
        return Number(this.svyBossReport.cashDeposits) + // 现金和存款
        Number(this.svyBossReport.accountReceivable) +
        Number(this.svyBossReport.advancePayment) +
        Number(this.svyBossReport.stock) +
        Number(this.svyBossReport.fixedAssetsMachine) +
        Number(this.svyBossReport.fixedAssetsOther) +
        Number(this.svyBossReport.otherAssets);
      },
      set() {
        return this.svyBossReport.totalAssets;
      }
    },
    totalDebt: { // 总负债
      get() {
        return Number(this.svyBossReport.accountPayable) +
          Number(this.svyBossReport.shortLoan) +
          Number(this.svyBossReport.longLoan) +
          Number(this.svyBossReport.otherDebt);
      },
      set() {
        return this.svyBossReport.totalDebt;
      }
    },
    rightInterest: { // 权益计算
      get() {
        return this.totalAssets - this.totalDebt;
      },
      set() {
        return this.svyBossReport.rightInterest;
      }
    },
    totalSpend: { // 年总开支
      get() {
        return Number(this.svyBossReport.employeesTotalWages) +
          Number(this.svyBossReport.utilitiesYear) +
          Number(this.svyBossReport.rentYear) +
          Number(this.svyBossReport.spendPerYear);
      },
      set() {
        return this.svyBossReport.totalSpend;
      }
    },
    netProfitLastYear: { // 近一年近利润
      get() {
        return Number(this.svyBossReport.yearSales) * Number(this.svyBossReport.averageMargin) / 100 - this.totalSpend;
      },
      set() {
        return this.svyBossReport.netProfitLastYear;
      }
    }
  },
  watch: {
    totalAssets: function (newValue, oldValue) {
      this.svyBossReport.totalAssets = this.totalAssets;
    },
    totalDebt: function (newValue, oldValue) {
      this.svyBossReport.totalDebt = this.totalDebt;
    },
    rightInterest: function (newValue, oldValue) {
      this.svyBossReport.rightInterest = this.rightInterest;
    },
    totalSpend: function (newValue, oldValue) {
      this.svyBossReport.totalSpend = this.totalSpend;
    },
    netProfitLastYear: function (newValue, oldValue) {
      this.svyBossReport.netProfitLastYear = this.netProfitLastYear;
    }
  },
  created() {
    this.initData();
    this.svyBossReport.surveyId = this.surveyId;
    this.searchInfo.applyNo = this.surveyId;
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 新增资产信息
    openAssetsBox() {
      this.showAssets = true;
    },
    openInvestBox() {
      this.showInvest = true;
    },
    openDebtBox() {
      this.showDebt = true;
    },
    openVerifyBox() {
      this.showVerify = true;
    },
    closeMessageBox() {
      this.showAssets = false;
      this.showInvest = false;
      this.showDebt = false;
      this.showVerify = false;
    },

    close() {
      this.$emit("close");
    },
    // 切换报告类型
    changeReportType(value) {
      this.$emit("changeReportType", value);
    },
    headStyle({ row, rowIndex }) {
      return "my_table_head";
    },
    rowStyle({ row, rowIndex }) {
      return "my_table_body";
    },
    // 选中一级行业切换二级行业列表
    setSecondIndustry(value) {
      if (this.initFlag) {
        this.svyBossReport.secondIndustry = '';
        this.$nextTick(() => {
          this.$refs.svyBossReport.clearValidate('secondIndustry');
        });
      }
      this.$store.dispatch('getSecIndustrysConfig', value).then(data => {
        this.secondIndustrysConfig = data.list;
        this.initFlag = true;
      }).catch(err => {
        this.$error(err.message);
      });
    },
		// 设置家访信息动态校验 有家访则必填否则非必填
		setHomeVisit(flag) {
			if (flag) {
				this.$set(this.rules, 'residentiAuthenticity', this.needChoice);
				this.$set(this.rules, 'livingState', this.needChoice);
        this.rules.residenceTime.push(this.needWrite);
				this.$set(this.rules, 'homeVisitInd', this.needChoice);
				this.$set(this.rules, 'withFamilyInd', this.needChoice);
				this.rules.livingArea.push(this.needWrite);
				this.rules.rentMonthSqm.push(this.needWrite);
				this.rules.homeVisitAddress.push(this.needWrite);
				this.rules.exceptionDescription.push(this.needWrite);
			} else {
				this.$set(this.rules, 'residentiAuthenticity', []);
				this.$set(this.rules, 'livingState', []);
        this.rules.residenceTime.pop();
				this.$set(this.rules, 'homeVisitInd', []);
				this.$set(this.rules, 'withFamilyInd', []);
				this.rules.livingArea.pop();
				this.rules.rentMonthSqm.pop();
				this.rules.homeVisitAddress.pop();
				this.rules.exceptionDescription.pop();
				this.$refs.svyBossReport.clearValidate(['residentiAuthenticity', 'livingState', 'residenceTime', 'homeVisitInd', 'withFamilyInd', 'livingArea', 'rentMonthSqm', 'homeVisitAddress', 'exceptionDescription']);
			}
		},
    // 报告数据初始化
    initData() {
			// 车产数据
      if (this.reportData && this.reportData.carInfoList.length > 0) {
        this.carInfoList = this.reportData.carInfoList;
        for (let x of this.carInfoList) {
          if (x.carBrand || x.carAmt) {
            x.isEdit = false;
          } else {
            x.isEdit = true;
          }
        }
      }
			// 房产数据
      if (this.reportData && this.reportData.estateInfoList.length > 0) {
        this.estateInfoList = this.reportData.estateInfoList;
        for (let x of this.estateInfoList) {
          if (x.addressCode || x.addressDesc || x.estatePriceAmt || x.estateTypeCode || x.houseSizeMeas) {
            x.isEdit = false;
          } else {
            x.isEdit = true;
          }
        }
      }
			// 报告数据
      if (this.reportData && this.reportData.svyBossReport) {
        this.svyBossReport = this.reportData.svyBossReport;
        this.svyBossReport.carInfoList = this.carInfoList;
        this.svyBossReport.estateInfoList = this.estateInfoList;
      } else {
        // 报告与详情关联数据 客户名称、调查距离、企业名称
        this.svyBossReport.custName = this.custInfo.custName;
        this.svyBossReport.initDistance = this.custInfo.initDistance;
        this.svyBossReport.enterpriseName = this.custInfo.workplaceName;
      }
      // 初始二级行业
			if (this.svyBossReport.primaryIndustry) {
        this.setSecondIndustry(this.svyBossReport.primaryIndustry);
			} else {
        this.initFlag = true;
      }
			// 是否调查前否决
			if (this.svyBossReport.beforeSurveyReject) {
        this.showVeto = false;
      }
    },
    setHiddenRisk(val) {
      for (let x of val) {
        if (x === 'F') {
          this.svyBossReport.hiddenRisk = ['F'];
        }
      }
    },
    // 添加一条房产信息
    addHouse() {
      let newHouse = {
        isEdit: true,
        addressChecked: '',
        addressCode: '', // 区域编码
        addressDesc: '', // 详细地址
        estateId: '', // 房产编号
        estatePriceAmt: '', // 价值(万元)
        estateTypeCode: '', // 房产性质
        houseSizeMeas: '', // 面积（m^3）
        reportId: ''
      };
      this.estateInfoList.push(newHouse);
    },
    // 地址选择器
    checkedAddress(index, row, arg) {
      row.addressCode = arg[0].areaCode;
      if (arg[0].province === arg[0].city) {
        row.addressChecked = arg[0].city + arg[0].area;
      } else {
        row.addressChecked = arg[0].province + arg[0].city + arg[0].area;
      }
      row.estateId = row.addressChecked;
    },
    // 删除一条房产信息
    minusHouse(index, row) {
      this.estateInfoList.splice(index, 1);
    },
    // 修改房产信息
    editHouse(index, row) {
      row.isEdit = true;
      this.$set(this.estateInfoList, index, row);
    },
    // 确定已填好的信息
    sureHouse(index, row) {
      this.validHouse(index).then(flag => {
        row.isEdit = false;
        this.$set(this.estateInfoList, index, row);
      });
    },
    // 添加一条车辆信息
    addCar(index, row) {
      let newCar = {
        isEdit: true,
        carAmt: '', // 价值（万元）
        carBrand: '', // 车辆品牌
        carId: '', // 车辆编号
        reportId: ''
      };
      this.carInfoList.push(newCar);
    },
    // 删除一条车辆信息
    minusCar(index, row) {
      this.carInfoList.splice(index, 1);
    },
    // 编辑车辆信息
    editCar(index, row) {
      row.isEdit = true;
      this.$set(this.carInfoList, index, row);
    },
    // 确定已填好的车辆信息
    sureCar(index, row) {
      this.validCar(index).then(flag => {
        row.isEdit = false;
        this.$set(this.carInfoList, index, row);
      });
    },
    // 验证是否有上传图片
    validImage() {
      return new Promise((resolve, reject) => {
        this.$MyFetch.post(surveyApi.fileList, this.searchInfo).then(data => {
          if (data.length > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }).catch((err) => {
          reject(err);
        });
      });
    },
		// 房产校验
		validHouse(index) {
			return new Promise((resolve, reject) => {
				let isValid1 = false;
				let isValid2 = false;
				let isValid3 = false;
				this.$refs.svyBossReport.validateField('estateInfoList.' + index + '.addressDesc', valid => {
					if (!valid) {
						isValid1 = true;
					}
				});
				this.$refs.svyBossReport.validateField('estateInfoList.' + index + '.houseSizeMeas', valid => {
					if (!valid) {
						isValid2 = true;
					}
				});
				this.$refs.svyBossReport.validateField('estateInfoList.' + index + '.estatePriceAmt', valid => {
					if (!valid) {
						isValid3 = true;
					}
				});
				if (isValid1 && isValid2 && isValid3) {
					resolve();
				} else {
					reject(Error);
				}
			});
		},
		// 车产校验
		validCar(index) {
			return new Promise((resolve, reject) => {
				this.$refs.svyBossReport.validateField('carInfoList.' + index + '.carAmt', valid => {
					if (!valid) {
						resolve();
					} else {
						reject(Error);
					}
				});
			});
		},
    // 表单校验
    validReport() {
      return new Promise((resolve, reject) => {
        this.$refs.svyBossReport.validate(valid => {
          if (valid) {
            resolve();
          } else {
            reject(Error);
          }
        });
      });
    },
    // 房产与车辆信息加surveyId参数
    setHouseAndCar() {
      for (let x of this.estateInfoList) {
        x.reportId = this.surveyId;
      }
      for (let y of this.carInfoList) {
        y.reportId = this.surveyId;
      }
    },
    // 是否调查前否决  // 以下注释代码不删 后期优化需求有需要
    setBeforeSurveyReject(value) {
      this.svyBossReport.operateTruth = "";
      this.svyBossReport.operateStatus = "";
      this.svyBossReport.hiddenRisk = [];
      this.svyBossReport.serviceInvestment = "";
      this.svyBossReport.cashFlow = [];
      this.svyBossReport.operateStability = [];
      this.svyBossReport.otherException = [];
      this.svyBossReport.beforeSurveyRejectDesc = "";
      this.svyBossReport.operateTruthRemark = "";
      this.svyBossReport.operateStatusRemark = "";
      this.svyBossReport.hiddenRiskRemark = "";
      this.svyBossReport.serviceInvestmentRemark = "";
      this.svyBossReport.cashFlowRemark = "";
      this.svyBossReport.operateStabilityRemark = "";
      this.svyBossReport.otherExceptionRemark = "";
      if (this.svyBossReport.beforeSurveyReject && this.svyBossReport.beforeSurveyReject !== '0') {
        this.showVeto = false;
        this.rules.operateTruth = [];
      } else {
        this.$set(this.rules, 'operateTruth', this.operateTruth);
				this.showVeto = true;
			}
    },
    setBeforeSurveyRejectStatus() {
      if (this.reportRequest.svyBossReport.beforeSurveyReject === '0') {
        this.reportRequest.svyBossReport.beforeSurveyReject = '';
      }
    },
    setRequestData() {
      this.reportRequest.svyBossReport.hiddenRisk = multipleChoice(this.reportRequest.svyBossReport.hiddenRisk);
      this.reportRequest.svyBossReport.cashFlow = multipleChoice(this.reportRequest.svyBossReport.cashFlow);
      this.reportRequest.svyBossReport.operateStability = multipleChoice(this.reportRequest.svyBossReport.operateStability);
      this.reportRequest.svyBossReport.otherException = multipleChoice(this.reportRequest.svyBossReport.otherException);
      this.reportRequest.svyBossReport.shareholdersChangeInd = yesNo(this.reportRequest.svyBossReport.shareholdersChangeInd);
      this.reportRequest.svyBossReport.industryChangeInd = yesNo(this.reportRequest.svyBossReport.industryChangeInd);
      this.setBeforeSurveyRejectStatus();
    },
    // 预览报告
    previewReport() {
      this.validReport().then(() => {
        this.reportRequest.carInfoList = this.carInfoList;
        this.reportRequest.estateInfoList = this.estateInfoList;
        this.reportRequest.svyBossReport = this.svyBossReport;
        this.setBeforeSurveyRejectStatus();
        this.$emit('viewToPreview', this.reportRequest);
      });
		},
		// 保存报告
		saveReport() {
      this.validReport().then(() => {
        this.setHouseAndCar();
        this.reportRequest.carInfoList = this.carInfoList;
        this.reportRequest.estateInfoList = this.estateInfoList;
        this.reportRequest.svyBossReport = {...this.svyBossReport};
        this.reportRequest.flag = false;
        this.setRequestData();
        this.$MyFetch.post(surveyApi.bossReportSave, this.reportRequest).then(data => {
          if (data) {
            if (this.svyBossReport.beforeSurveyReject === '0') {
              this.svyBossReport.beforeSurveyReject = '';
            }
            this.$message({
              showClose: true,
              message: '报告保存成功',
              type: 'success'
            });
          }
        }).catch(err => {
          this.$error(err.message);
        });
      });
		},
    // 提交报告
		submitReport() {
      if (this.showVeto) {
        this.validImage().then((flag) => {
          if (flag) {
            this.validAndsend();
          } else {
            this.$message({
              showClose: true,
              message: '请上传图片',
              type: 'warning'
            });
          }
        }).catch((err) => {
          this.$error(err.message);
        });
      } else {
        this.validAndsend();
      }
		},
    // 校验报告并发送
    validAndsend() {
      this.validReport().then(() => {
        this.setHouseAndCar();
        this.reportRequest.carInfoList = this.carInfoList;
        this.reportRequest.estateInfoList = this.estateInfoList;
        this.reportRequest.svyBossReport = {...this.svyBossReport};
        this.reportRequest.flag = true;
        this.setRequestData();
        this.$MyFetch.post(surveyApi.bossReportSave, this.reportRequest).then(data => {
          if (data) {
            this.$message({
              showClose: true,
              message: '报告提交成功',
              type: 'success'
            });
            this.$router.back(-1);
          }
        }).catch(err => {
          this.$error(err.message);
        });
      });
    }
  },
  components: {
    CityPicker,
    addAssets,
    invest,
    debt,
    verify
  }
};
</script>
