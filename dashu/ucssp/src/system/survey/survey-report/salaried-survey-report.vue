<template>
		<div class="report_content">
			<el-form :model="svyStaffReport" :rules="rules" ref="svyStaffReport" label-width="100px" label-position="top" class="">
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
						<div class="card_content"><span class="card_content_title">借款申请人姓名：</span><span class="card_content_font">{{svyStaffReport.custName}}</span></div>
						<div class="card_content"><span class="card_content_title">目前调查距离（KM）：</span><span class="card_content_font">{{svyStaffReport.initDistance}}</span></div>
            <div class="card_content"><span class="card_content_title">调查日期：</span><span class="card_content_font">{{svyStaffReport.surveyDate}}</span></div>
						<div class="card_content"><span class="card_content_title">企业名称：</span><span class="card_content_font">{{svyStaffReport.enterpriseName}}</span></div>
					</div>
					<div class="card_item_box">
            <el-form-item label="职务名称" prop="jobTitle" class="width245">
							<el-input v-model="svyStaffReport.headship" placeholder="请填写"></el-input>
						</el-form-item>
						<el-form-item label="修改后调查距离" prop="updatedDistance" class="width245 hidden">
							<el-input v-model="svyStaffReport.updatedDistance" placeholder="请填写"></el-input>
						</el-form-item>
						<el-form-item label="调查地址" prop="surveyAddress" class="width530">
							<el-input v-model="svyStaffReport.surveyAddress" placeholder="请填写" maxlength="100"></el-input>
						</el-form-item>
            <el-form-item label="婚姻状况" prop="maritalStatus" class="width245 margin_right0">
							<el-select v-model="svyStaffReport.maritalStatus" placeholder="请选择">
								<el-option v-for="item in fieldConfig.marital_status.children" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option>
							</el-select>
						</el-form-item>
            <el-form-item label="是否暗访" prop="secretInd">
							<el-switch :width="50" v-model="svyStaffReport.secretInd" active-text="是" inactive-text="否" :active-value="true" :inactive-value="false"></el-switch>
						</el-form-item>
            <el-form-item label="配偶是否知晓贷款" prop="spouseKnowLoanInd">
							<el-switch :width="50" v-model="svyStaffReport.spouseKnowLoanInd" active-text="是" inactive-text="否" :active-value="true" :inactive-value="false"></el-switch>
						</el-form-item>
					</div>
				</div>
				<div class="card_box">
					<div class="card_title">企业及工作情况</div>
					<div class="card_item_box items_padding_top20">
						<el-form-item label="企业类型" prop="enterpriseType" class="width245">
              <el-select v-model="svyStaffReport.enterpriseType" placeholder="请选择" :disabled="!fieldConfig.enterprise_type.statusInd">
                <el-option v-for="item in fieldConfig.enterprise_type.children" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
						</el-form-item>
						<el-form-item label="一级行业" prop="primaryIndustry" class="width245">
              <el-select v-model="svyStaffReport.primaryIndustry" placeholder="请选择" @change="setSecondIndustry">
                <el-option v-for="item in fieldConfig.industrysConfig" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
						</el-form-item>
						<el-form-item label="二级行业" prop="secondIndustry" class="width245">
              <el-select v-model="svyStaffReport.secondIndustry" placeholder="请选择">
                <el-option v-for="item in secondIndustrysConfig" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
						</el-form-item>
						<el-form-item label="企业规模" prop="enterpriseScale" class="width245 margin_right0">
              <el-select v-model="svyStaffReport.enterpriseScale" placeholder="请选择" :disabled="!fieldConfig.enterprise_scale.statusInd">
                <el-option v-for="item in fieldConfig.enterprise_scale.children" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
						</el-form-item>
            <el-form-item label="企业人数" prop="enterprisesNum" class="width245">
              <el-input v-model="svyStaffReport.enterprisesNum" placeholder="请填写"></el-input>
						</el-form-item>
            <el-form-item label="企业办公面积" prop="enterpriseArea" class="width245">
              <el-input v-model="svyStaffReport.enterpriseArea" placeholder="请填写"></el-input>
						</el-form-item>
            <el-form-item label="本行业工作年限" prop="industryWorkingLife" class="width245">
              <el-input v-model="svyStaffReport.industryWorkingLife" placeholder="请填写"></el-input>
						</el-form-item>
            <el-form-item label="工作年限" prop="workingLife" class="width245 margin_right0">
              <el-input v-model="svyStaffReport.workingLife" placeholder="请填写"></el-input>
						</el-form-item>
            <el-form-item label="工作变更次数" prop="changeWorkNum" class="width245">
              <el-input v-model="svyStaffReport.changeWorkNum" placeholder="请填写"></el-input>
						</el-form-item>
            <el-form-item label="平均工作年限" prop="averageWorkingTime" class="width245">
              <el-input v-model.number="svyStaffReport.averageWorkingTime" placeholder="请填写" :disabled="true"></el-input>
						</el-form-item>
            <el-form-item label="商圈" prop="surveyAreaId" class="width245 hidden">
              <el-select v-model="svyStaffReport.surveyAreaId" placeholder="请选择">
								<el-option v-for="item in fieldConfig.businessArea" :key="item.surveyAreaId" :label="item.surveyAreaName" :value="item.surveyAreaId"></el-option>
							</el-select>
						</el-form-item>
            <el-form-item label="工作固话" prop="workPhoneNum" class="width245 margin_right0">
              <el-input v-model="svyStaffReport.workPhoneNum" placeholder="请填写" maxlength="12"></el-input>
						</el-form-item>
            <el-form-item label="工作历史岗位变更描述" prop="workHistory" class="width815">
              <el-input v-model="svyStaffReport.workHistory" placeholder="请填写" maxlength="200"></el-input>
						</el-form-item>
					</div>
				</div>
				<div class="card_box">
					<div class="card_title">贷款用途</div>
					<div class="card_item_box items_padding_top20">
						<el-form-item label="贷款用途" prop="purposeType" class="width245">
							<el-select v-model="svyStaffReport.purposeType" placeholder="请选择" :disabled="!fieldConfig.purpose_type.statusInd">
								<el-option v-for="item in fieldConfig.purpose_type.children" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="详细内容" prop="purposeDesc" class="width815 margin_right0">
							<el-input v-model="svyStaffReport.purposeDesc" placeholder="请填写" maxlength="200"></el-input>
						</el-form-item>
					</div>
				</div>
        <div class="card_box">
					<div class="card_title">家庭资产情况</div>
					<div class="card_item_box items_padding_top20">
						<el-table :data="svyStaffReport.estateInfoList" style="width:100%" :header-row-class-name="headStyle" :row-class-name="rowStyle">
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
						<el-table :data="svyStaffReport.carInfoList" style="width:100%" :header-row-class-name="headStyle" :row-class-name="rowStyle">
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
				</div>
				<div class="card_box">
					<div class="card_title">调查结论</div>
					<div class="card_item_box items_padding_top20">
						<el-form-item label="调查前否决原因" prop="beforeSurveyReject" class="width245">
							<el-select v-model="svyStaffReport.beforeSurveyReject" placeholder="请选择" @change="setBeforeSurveyReject" :disabled="!fieldConfig.before_survey_reject.statusInd">
								<el-option v-for="item in fieldConfig.before_survey_reject.children" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="否决原因描述" prop="beforeSurveyRejectDesc" class="width815 margin_right0">
							<el-input v-model="svyStaffReport.beforeSurveyRejectDesc" placeholder="请填写" maxlength="200"></el-input> <!-- 长度限制未说明 据以下备注规律添加-->
						</el-form-item>
						<div v-if="showVeto">
              <el-form-item label="工作真实性" prop="jobTruth" class="width245">
                <el-select v-model="svyStaffReport.jobTruth" placeholder="请选择">
                  <el-option v-for="item in fieldConfig.jobTruth.children" :key="item.sortNum" :label="item.itemCode+' '+item.itemDesc" :value="item.itemCode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工作真实性描述" prop="jobTruthRemark" class="width815 margin_right0">
                <el-input v-model="svyStaffReport.jobTruthRemark" placeholder="请填写" maxlength="200"></el-input>
              </el-form-item>
              <el-form-item label="隐藏风险" prop="hiddenRisk" class="width245">
                <el-select v-model="svyStaffReport.hiddenRisk" multiple placeholder="请选择" @change="setHiddenRisk">
                  <el-option v-for="item in fieldConfig.hiddenRiskStaff.children" :key="item.sortNum" :label="item.itemCode+' '+item.itemDesc" :value="item.itemCode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="隐藏风险描述" prop="hiddenRiskRemark" class="width815 margin_right0">
                <el-input v-model="svyStaffReport.hiddenRiskRemark" placeholder="请填写" maxlength="200"></el-input>
              </el-form-item>
              <el-form-item label="工作稳定性" prop="jobStability" class="width245">
                <el-select v-model="svyStaffReport.jobStability" multiple placeholder="请选择">
                  <el-option v-for="item in fieldConfig.jobStability.children" :key="item.sortNum" :label="item.itemCode+' '+item.itemDesc" :value="item.itemCode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="工作稳定性描述" prop="jobStabilityRemark" class="width815 margin_right0">
                <el-input v-model="svyStaffReport.jobStabilityRemark" placeholder="请填写" maxlength="200"></el-input>
              </el-form-item>
              <el-form-item label="对外投资" prop="serviceInvestment" class="width245">
                <el-select v-model="svyStaffReport.serviceInvestment" placeholder="请选择">
                  <el-option v-for="(item,index) in fieldConfig.serviceInvestmentStaff.children" :key="index" :label="item.itemCode+' '+item.itemDesc" :value="item.itemCode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="对外投资描述" prop="serviceInvestmentRemark" class="width815 margin_right0">
                <el-input v-model="svyStaffReport.serviceInvestmentRemark" placeholder="请填写" maxlength="200"></el-input>
              </el-form-item>
              <el-form-item label="其他异常" prop="otherException" class="width245 margin_bottom10">
                <el-select v-model="svyStaffReport.otherException" multiple placeholder="请选择">
                  <el-option v-for="item in fieldConfig.otherExceptionStaff.children" :key="item.sortNum" :label="item.itemCode+' '+item.itemDesc" :value="item.itemCode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="其他异常描述" prop="otherExceptionRemark" class="width815 margin_right0 margin_bottom10">
                <el-input v-model="svyStaffReport.otherExceptionRemark" placeholder="请填写" maxlength="200"></el-input>
              </el-form-item>
						</div>
					</div>
					<div class="card_item_box margin_bottom10">
						<div class="card_item"><span class="card_content_title">综合意见：</span><span class="card_item_font">{{svyStaffReport.overallOpinion}}</span></div>
						<div class="card_item"><span class="card_content_title">调查结论：</span><span class="card_item_font">{{svyStaffReport.surveyConclusion}}</span></div>
					</div>
					<div class="card_item_box">
						<el-form-item label="详情描述" prop="detailDescribe" class="text_area">
							<el-input type="textarea" resize="none" rows="4" v-model="svyStaffReport.detailDescribe" placeholder="详情描述（限500字以内）" maxlength="500"></el-input>
						</el-form-item>
					</div>
				</div>
				<div class="card_box">
					<div class="card_title">家访信息</div>
					<div class="card_item_box items_padding_top20">
						<el-form-item label="居住真实性" prop="residentiAuthenticity" class="width245">
							<el-select v-model="svyStaffReport.residentiAuthenticity" placeholder="请选择">
								<el-option v-for="item in fieldConfig.residenti_authenticity.children" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="实际居住状态" prop="livingHouseType" class="width245">
              <el-select v-model="svyStaffReport.livingHouseType" placeholder="请选择">
								<el-option v-for="item in fieldConfig.living_house_type.children" :key="item.sortNum" :label="item.itemDesc" :value="item.itemCode"></el-option>
							</el-select>
						</el-form-item>
            <el-form-item label="是否家访" prop="homeVisitInd" class="margin_right80">
              <el-switch :width="50" v-model="svyStaffReport.homeVisitInd" active-text="是" inactive-text="否" :active-value="true" :inactive-value="false" @change="setHomeVisit"></el-switch>
            </el-form-item>
            <el-form-item label="是否与家人同住" prop="withFamilyInd">
              <el-switch :width="50" v-model="svyStaffReport.withFamilyInd" active-text="是" inactive-text="否" :active-value="true" :inactive-value="false"></el-switch>
            </el-form-item>
            <el-form-item label="住所面积（平方米）" prop="livingArea" class="width245 margin_right0">
              <el-input v-model="svyStaffReport.livingArea" placeholder="请填写" maxlength="50"></el-input>
            </el-form-item>
						<el-form-item label="居住年限（年）" prop="residenceTime" class="width245">
							<el-input v-model="svyStaffReport.residenceTime" placeholder="请填写"></el-input>
						</el-form-item>
						<el-form-item label="租金水平（元/月/平米）" prop="rentMonthSqm" class="width245">
							<el-input v-model="svyStaffReport.rentMonthSqm" placeholder="请填写"></el-input>
						</el-form-item>
						<el-form-item label="调查地址" prop="homeVisitAddress" class="width530 margin_right0">
							<el-input v-model="svyStaffReport.homeVisitAddress" placeholder="请填写" maxlength="100"></el-input>
						</el-form-item>
            <el-form-item label="真实性描述" prop="authenticityDescription" class="width815">
							<el-input v-model="svyStaffReport.authenticityDescription" placeholder="请填写" maxlength="200"></el-input>
						</el-form-item>
						<el-form-item label="异常情况描述" prop="exceptionDescription" class="width815">
							<el-input v-model="svyStaffReport.exceptionDescription" placeholder="请填写" maxlength="200"></el-input>
						</el-form-item>
					</div>
				</div>
        <div class="card_box">
					<div class="card_title">家庭情况</div>
					<div class="card_item_box items_padding_top20">
						<el-form-item prop="familySituation" class="text_area">
							<el-input type="textarea" resize="none" rows="4" v-model="svyStaffReport.familySituation" placeholder="家庭情况描述" maxlength="200"></el-input>
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
import {multipleChoice} from "../js/utils.js";
import CityPicker from "@/components/cityPicker/CityPicker";
import { mapGetters } from 'vuex';
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
			reportType: "2", // 受薪报告、、
      secondIndustrysConfig: [], // 二级行业
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
      svyStaffReport: {
        updatedDistance: "", // 修改后调查距离
        surveyAddress: "", // 调查地址
        maritalStatus: "", // 婚姻状况
        secretInd: false, // 是否暗访
        spouseKnowLoanInd: false, // 配偶是否知晓贷款

        enterpriseType: "", // 企业类型
        primaryIndustry: "", // 一级行业
        secondIndustry: "", // 二级行业
        enterpriseScale: "", // 企业规模
        enterprisesNum: "", // 企业人数
        enterpriseArea: "", // 企业办公面积
        industryWorkingLife: "", // 本行业工作年限
        workingLife: "", // 工作年限
        changeWorkNum: "", // 工作变更次数
        averageWorkingTime: "", // 平均工作年限
        surveyAreaId: "", // 商圈
        workPhoneNum: "", // 工作固话
        workHistory: "", // 工作历史岗位变更描述

        purposeType: "", // 贷款用途
        purposeDesc: "", // 详细内容

        beforeSurveyReject: "", // 调查前否决原因
        beforeSurveyRejectDesc: "", // 调查前否决原因描述
        jobTruth: "", // 工作真实性
        jobTruthRemark: "", // 工作真实性描述
        hiddenRisk: [], // 隐藏风险
        hiddenRiskRemark: "", // 隐藏风险描述
        jobStability: [], // 工作稳定性
        jobStabilityRemark: "", // 工作稳定性描述
        serviceInvestment: "", // 业外投资
        serviceInvestmentRemark: "", // 业外投资描述
        otherException: [], // 其他异常
        otherExceptionRemark: "", // 其他异常描述
        overallOpinion: "", // 综合意见
        surveyConclusion: "", // 调查结论
        detailDescribe: "", // 详情描述

        residentiAuthenticity: "", // 居住真实性
        livingHouseType: "", // 住所房屋性质 2019/01/30 变更字段名称为 实际居住状态
        homeVisitInd: "", // 是否家访
        withFamilyInd: "", // 是否与家人同住
        livingArea: "", // 住所面积（平方米）
        residenceTime: "", // 居住年限
        rentMonthSqm: "", // 租金水平（元/月/平米）
        homeVisitAddress: "", // 调查地址
        authenticityDescription: "", // 真实性描述
        exceptionDescription: "", // 异常情况描述

        familySituation: "" // 家庭情况
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
          { max: 100, trigger: 'blur', message: '请输入100字符以内' }
        ],
        maritalStatus: [
          { required: true, trigger: 'change', message: '请选择' }
        ],
        enterprisesNum: [
          { trigger: "blur", validator: reportValidator.numberValid(0, NaN, '人数') }
        ],
        enterpriseArea: [
          { trigger: 'blur', validator: reportValidator.numberValid(0, NaN, '面积') }
        ],
        industryWorkingLife: [
          { trigger: 'blur', validator: reportValidator.numberValid(0, NaN, '年数') }
        ],
        workingLife: [
          { trigger: "blur", validator: reportValidator.numberValid(0, NaN, '年数') }
        ],
        changeWorkNum: [
          { trigger: "blur", validator: reportValidator.numberValid(0, NaN, '次数') }
        ],
        workPhoneNum: [
					{ trigger: 'blur', validator: ruleValidators.number },
          { min: 11, trigger: 'blur', message: '长度不足' },
          { max: 12, trigger: 'blur', message: '超出长度' }
        ],
        workHistory: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ],
        purposeDesc: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ],
        beforeSurveyRejectDesc: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ],
        jobTruth: [
          { required: true, trigger: 'change', message: '请选择' }
        ],
        jobTruthRemark: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ],
        hiddenRiskRemark: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ],
        jobStabilityRemark: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ],
        serviceInvestmentRemark: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ],
        otherExceptionRemark: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ],
        detailDescribe: [
          { max: 500, trigger: 'blur', message: '字数超限' }
        ],
        residentiAuthenticity: [],
        livingHouseType: [],
        homeVisitInd: [],
        withFamilyInd: [],
        livingArea: [
          { trigger: 'blur', validator: reportValidator.numberValid(0, NaN, '面积') }
        ],
        residenceTime: [
          { trigger: 'blur', validator: reportValidator.numberValid(0, 50, '年限') }
        ],
        rentMonthSqm: [
          { trigger: 'blur', validator: reportValidator.numberValid(0, NaN, '租金') }
        ],
        homeVisitAddress: [
          { max: 100, trigger: 'blur', message: '字数超限' }
        ],
        authenticityDescription: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ],
        exceptionDescription: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ],
        familySituation: [
          { max: 200, trigger: 'blur', message: '字数超限' }
        ]
      },
      jobTruth: [
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
    averageWorkingTime: { // 近一年近利润
      get() {
        if (this.svyStaffReport.changeWorkNum > 0) {
          return Number(this.svyStaffReport.workingLife) / Number(this.svyStaffReport.changeWorkNum);
        } else {
          return Number(this.svyStaffReport.workingLife);
        }
      },
      set() {
        return this.svyStaffReport.averageWorkingTime;
      }
    }
  },
  watch: {
    averageWorkingTime: function (newValue, oldValue) {
      this.svyStaffReport.averageWorkingTime = this.averageWorkingTime;
    }
  },
  created() {
    this.initData();
    this.svyStaffReport.surveyId = this.surveyId;
    this.searchInfo.applyNo = this.surveyId;
  },
  methods: {
    close() {
      this.$emit("close");
    },
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
        this.svyStaffReport.secondIndustry = '';
        this.$nextTick(() => {
          this.$refs.svyStaffReport.clearValidate('secondIndustry');
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
        this.$set(this.rules, 'livingHouseType', this.needChoice);
        this.$set(this.rules, 'homeVisitInd', this.needChoice);
        this.$set(this.rules, 'withFamilyInd', this.needChoice);
        this.rules.livingArea.push(this.needWrite);
        this.rules.residenceTime.push(this.needWrite);
        this.rules.rentMonthSqm.push(this.needWrite);
        this.rules.homeVisitAddress.push(this.needWrite);
        this.rules.authenticityDescription.push(this.needWrite);
        this.rules.exceptionDescription.push(this.needWrite);
			} else {
        this.$set(this.rules, 'residentiAuthenticity', []);
        this.$set(this.rules, 'livingHouseType', []);
        this.$set(this.rules, 'homeVisitInd', []);
        this.$set(this.rules, 'withFamilyInd', []);
        this.rules.livingArea.pop();
        this.rules.residenceTime.pop();
        this.rules.rentMonthSqm.pop();
        this.rules.homeVisitAddress.pop();
        this.rules.authenticityDescription.pop();
        this.rules.exceptionDescription.pop();
        this.$refs.svyStaffReport.clearValidate(['residentiAuthenticity', 'livingHouseType', 'homeVisitInd', 'withFamilyInd', 'livingArea', 'residenceTime', 'rentMonthSqm', 'homeVisitAddress', 'authenticityDescription', 'exceptionDescription']);
      }
		},
    // 报告数据初始化
    initData() {
      // 车产数据
      // && this.this.reportData.carInfoList !== undefined
      if (this.reportData !== null) {
        if (this.reportData.svyBossReport === null) {
          this.reportData.svyBossReport = {};
          this.reportData.svyBossReport.carInfoList = [];
          this.reportData.svyBossReport.estateInfoList = [];
        }
        if (this.reportData.svyStaffReport === null) {
          this.reportData.svyStaffReport = {};
          this.reportData.svyStaffReport.carInfoList = [];
          this.reportData.svyStaffReport.estateInfoList = [];
        }
      }
      if (this.reportData && this.reportData.carInfoList !== null) {
        if (this.reportData && this.reportData.carInfoList.length > 0) {
          if (!this.custInfo.careerTypeCode || this.custInfo.careerTypeCode.indexOf('自雇') !== -1) {
            this.carInfoList = [];
          } else {
            this.carInfoList = this.reportData.carInfoList;
          }
        for (let x of this.carInfoList) {
          if (x.carBrand || x.carAmt) {
            x.isEdit = false;
          } else {
            x.isEdit = true;
          }
        }
      }
      }
      if (this.reportData && this.reportData.estateInfoList !== null) {
        // 房产数据
        if (this.reportData && this.reportData.estateInfoList.length > 0) {
          if (!this.custInfo.careerTypeCode || this.custInfo.careerTypeCode.indexOf('自雇') !== -1) {
            this.estateInfoList = [];
          } else {
            this.estateInfoList = this.reportData.estateInfoList;
          }
          for (let x of this.estateInfoList) {
            if (x.addressCode || x.addressDesc || x.estatePriceAmt || x.estateTypeCode || x.houseSizeMeas) {
              x.isEdit = false;
            } else {
              x.isEdit = true;
            }
          }
        }
      }
      // 报告数据
      if (this.reportData && this.reportData.svyStaffReport) {
        this.svyStaffReport = this.reportData.svyStaffReport;
        this.svyStaffReport.carInfoList = this.carInfoList;
        this.svyStaffReport.estateInfoList = this.estateInfoList;
      } else {
        // 报告与详情关联数据 客户名称、职务名称、调查距离、企业名称
        this.svyStaffReport.custName = this.custInfo.custName;
        this.svyStaffReport.headship = this.custInfo.jobTitle;
        this.svyStaffReport.initDistance = this.custInfo.initDistance;
        this.svyStaffReport.enterpriseName = this.custInfo.workplaceName;
      }
      // 初始二级行业
			if (this.svyStaffReport.primaryIndustry) {
        this.setSecondIndustry(this.svyStaffReport.primaryIndustry);
			} else {
        this.initFlag = true;
      }
      if (this.svyStaffReport.beforeSurveyReject) {
        this.showVeto = false;
      }
      if (!this.custInfo.surveyTypeST01) {
        this.$set(this.rules, 'jobTruth', []);
      }
    },
    setHiddenRisk(val) {
      for (let x of val) {
        if (x === 'F') {
          this.svyStaffReport.hiddenRisk = ['F'];
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
        this.$refs.svyStaffReport.validateField('estateInfoList.' + index + '.addressDesc', valid => {
          if (!valid) {
            isValid1 = true;
          }
        });
        this.$refs.svyStaffReport.validateField('estateInfoList.' + index + '.houseSizeMeas', valid => {
          if (!valid) {
            isValid2 = true;
          }
        });
        this.$refs.svyStaffReport.validateField('estateInfoList.' + index + '.estatePriceAmt', valid => {
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
        this.$refs.svyStaffReport.validateField('carInfoList.' + index + '.carAmt', valid => {
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
        this.$refs.svyStaffReport.validate(valid => {
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
    // 是否调查前否决
    setBeforeSurveyReject(value) {
      this.svyStaffReport.jobTruth = "";
      this.svyStaffReport.hiddenRisk = [];
      this.svyStaffReport.jobStability = [];
      this.svyStaffReport.serviceInvestment = "";
      this.svyStaffReport.otherException = [];
      this.svyStaffReport.beforeSurveyRejectDesc = "";
      this.svyStaffReport.jobTruthRemark = "";
      this.svyStaffReport.hiddenRiskRemark = "";
      this.svyStaffReport.jobStabilityRemark = "";
      this.svyStaffReport.serviceInvestmentRemark = "";
      this.svyStaffReport.otherExceptionRemark = "";
      if (this.svyStaffReport.beforeSurveyReject && this.svyStaffReport.beforeSurveyReject !== '0') {
        this.showVeto = false;
        this.rules.jobTruth = [];
      } else {
        this.$set(this.rules, 'jobTruth', this.jobTruth);
				this.showVeto = true;
      }
      if (!this.custInfo.surveyTypeST01) {
        this.$set(this.rules, 'jobTruth', []);
      }
    },
    setBeforeSurveyRejectStatus() {
      if (this.reportRequest.svyStaffReport.beforeSurveyReject === '0') {
        this.reportRequest.svyStaffReport.beforeSurveyReject = '';
      }
    },
		// 请求参数
    setRequestData() {
      this.reportRequest.svyStaffReport.hiddenRisk = multipleChoice(this.reportRequest.svyStaffReport.hiddenRisk);
      this.reportRequest.svyStaffReport.jobStability = multipleChoice(this.reportRequest.svyStaffReport.jobStability);
      this.reportRequest.svyStaffReport.otherException = multipleChoice(this.reportRequest.svyStaffReport.otherException);
      this.setBeforeSurveyRejectStatus();
    },
    // 预览报告
    previewReport() {
			this.validReport().then(() => {
				this.reportRequest.carInfoList = this.carInfoList;
				this.reportRequest.estateInfoList = this.estateInfoList;
				this.reportRequest.svyStaffReport = this.svyStaffReport;
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
        this.reportRequest.svyStaffReport = {...this.svyStaffReport};
        this.reportRequest.flag = false;
        this.setRequestData();
        this.$MyFetch.post(surveyApi.staffReportSave, this.reportRequest).then(data => {
          if (data) {
            if (this.svyStaffReport.beforeSurveyReject === '0') {
              this.svyStaffReport.beforeSurveyReject = '';
            }
            this.$message({
              showClose: true,
              message: '报告保存成功',
              type: 'success'
            });
          }
        }).catch((err) => {
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
        this.reportRequest.svyStaffReport = {...this.svyStaffReport};
        this.reportRequest.flag = true;
        this.setRequestData();
        this.$MyFetch.post(surveyApi.staffReportSave, this.reportRequest).then(data => {
          if (data) {
            this.$message({
              showClose: true,
              message: '报告提交成功',
              type: 'success'
            });
            this.$router.back(-1);
          }
        }).catch((err) => {
          this.$error(err.message);
        });
      });
    }
  },
  components: {
    CityPicker
  }
};
</script>
