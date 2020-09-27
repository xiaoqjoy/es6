<template>
  <div class="complete-customer-info face2face-detail-style">
    <div class="basic-info form__block">
      <!-- <el-button @click="saveInfo">xxx</el-button> -->
      <div class="basic-info-header form__block_header">
        <h5 class="title"><span class="icon icon__gan"></span>基本信息</h5>
        <span style="display:none;">{{isCustomerUpdate}}</span>
      </div>
      <div>
        <ul class="message__list clearfix">
          <li class="f__left item">
            <h5 class="title">姓名:</h5>
            <p class="content">{{custBasicInfo.custName}}</p>
          </li>
          <li class="f__left item">
            <h5 class="title">手机号:</h5>
            <p class="content">{{custBasicInfo.mobileNum}}</p>
          </li>
          <li class="f__left item">
            <h5 class="title">身份证号:</h5>
            <p class="content">{{custBasicInfo.certificateNum}}</p>
          </li>
          <li class="f__left item">
            <h5 class="title">授权原因:</h5>
            <p class="content">{{custBasicInfo.authReasonDesc}}</p>
          </li>
          <li class="f__left item" v-if="custBasicInfo.easyLoanInd">
            <h5 class="title">审批模式:</h5>
            <p class="content">{{approveModeCdText}}</p>
          </li>
          <li class="f__left item" v-if="!(custBasicInfo.easyLoanInd&&custBasicInfo.approveModeCd=='2')">
            <h5 class="title">备签提交是否触发调查:</h5>
            <p class="content">{{custBasicInfo.triggerSurvey === undefined ? '' : custBasicInfo.triggerSurvey ? '是':'否'}}</p>
          </li>
          <li class="f__left item" v-if="custBasicInfo.faceTypeCode === '004'">
            <h5 class="title">定位:</h5>
            <p class="content">{{custBasicInfo.locationAddress === null ? '未授权' : custBasicInfo.locationAddress}}</p>
          </li>
          <li class="f__left item" v-if="custBasicInfo.easyLoanInd">
            <h5 class="title">是否经营补件:</h5>
            <p class="content">{{custBasicInfo.isBusinessPatch === true ? '是' : '否'}}</p>
          </li>
        </ul>
        <el-form
          :model="custBasicInfo" :rules="custBasicRule"
          ref="custBasicForm" label-width="100px"
          label-position="top"
          :disabled="isDetail || !openVideo || ydApproveMode2">
            <div>
              <el-form-item label="人物性别">
                <el-radio-group v-model="custBasicInfo.genderCode">
                  <el-radio-button
                    v-for="(item, index) in gender_code"
                    :key="index"
                    :label="item.itemCode"
                    :disabled="custBasicInfo.genderCode !== item.itemCode">{{item.itemDesc}}</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="婚姻状况" prop="maritalStatusCode" class="width190">
                <el-select v-model="custBasicInfo.maritalStatusCode" placeholder="请选择婚姻状况" @change="maritalStatusChange">
                  <el-option v-for="item in marital_status_code" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="居住状况" prop="houseConditionCode" class="width190">
                <el-select v-model="custBasicInfo.houseConditionCode" placeholder="请选择居住状况">
                  <el-option v-for="item in house_condition_code" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="有无本地房产" class="width82">
                <el-switch v-model="custBasicInfo.localEstateInd"
                  :width="50" active-text="有"
                  inactive-text="无" :active-value="true"
                  :inactive-value="false">
                </el-switch>
              </el-form-item>
              <el-form-item label="户籍地址" prop="registeredAddressCode" class="width310">
                <select-cascader v-model="custBasicInfo.registeredAddressCode" :options="options"></select-cascader>
              </el-form-item>
              <el-form-item label="户籍详细地址" prop="registeredAddressDesc" class="width660">
                <el-input v-model="custBasicInfo.registeredAddressDesc" maxlength="100"></el-input>
              </el-form-item>
              <el-form-item label="身份证签发机关" prop="certificateGrantorName" class="width310">
                <el-input v-model="custBasicInfo.certificateGrantorName" maxlength="100"></el-input>
              </el-form-item>
              <el-form-item label="居住地址" prop="houseAddressCode" class="width310">
                <select-cascader v-model="custBasicInfo.houseAddressCode" :options="options"></select-cascader>
              </el-form-item>
              <el-form-item label="居住详细地址" prop="houseAddressDesc" class="width660">
                <el-input v-model="custBasicInfo.houseAddressDesc" maxlength="100"></el-input>
              </el-form-item>
              <el-form-item label="单位名称" prop="workplaceName" class="width310">
                <el-input v-model="custBasicInfo.workplaceName" maxlength="100"></el-input>
              </el-form-item>
              <el-form-item label="单位地址" prop="workAddressCode" class="width310">
                <select-cascader v-model="custBasicInfo.workAddressCode" :options="options"></select-cascader>
              </el-form-item>
              <el-form-item label="客户类型" class="width310">
                <el-select v-model="custBasicInfo.careerTypeCode" placeholder="请选择客户类型" @change="removeValue" :disabled="true">
                  <el-option v-for="item in career_type_code" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="占股情况" prop="sharePercent" class="width310">
                <el-select v-model="custBasicInfo.sharePercent" placeholder="请选择占股情况" :disabled="custBasicInfo.careerTypeCode !== dCode.careerTypeCode.boss">
                  <el-option v-for="item in share_percent" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                </el-select>
              </el-form-item>
              <div class="radio-group">
                <el-form-item label="6个月内是否正常缴纳公积金" prop="houseFund6mInd"  >
                  <el-switch v-model="custBasicInfo.houseFund6mInd"
                    :width="50" active-text="是"
                    inactive-text="否" :active-value="true"
                    :inactive-value="false">
                  </el-switch>
                </el-form-item>
                <el-form-item label="是否注册" prop="registeredInd">
                  <el-switch v-model="custBasicInfo.registeredInd"
                    :width="50" active-text="是"
                    inactive-text="否" :active-value="true"
                    :inactive-value="false"
                    :disabled="custBasicInfo.careerTypeCode !== dCode.careerTypeCode.boss"
                    ></el-switch>
                </el-form-item>
              </div>
              <el-form-item label="成立日期" prop="foundDate" class="width310">
                <el-date-picker
                  v-model="custBasicInfo.foundDate"
                  type="date"
                  value-format="yyyy-MM-dd hh:mm:ss"
                  placeholder="选择日期"
                  :disabled="custBasicInfo.careerTypeCode !== dCode.careerTypeCode.boss || !custBasicInfo.registeredInd"
                  :editable="false">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="定价方案" prop="pricingPlanCode" class="width310">
                <el-select
                  v-model="custBasicInfo.pricingPlanCode"
                  placeholder="请选择" :disabled="true">
                    <el-option
                      v-for="(item, index) in pricingPlanLibrary"
                      :key="index"
                      :label="item.itemDesc"
                      :value="item.itemCode">
                    </el-option>
                </el-select>
              </el-form-item>
            </div>
        </el-form>
      </div>
    </div>
    <div class="custom-info form__block">
      <div class="custom-info-header form__block_header">
        <h5 class="title"><span class="icon icon__gan"></span>补充个人信息</h5>
      </div>
      <div>
        <el-form :model="custDetailedInfo"
          :rules="custDetailedRule"
          ref="custDetailedForm"
          label-width="100px"
          class="demo-form-inline" label-position="top"
          :disabled="isDetail || !openVideo || ydApproveMode2">
          <div class="dialog-box__form__group">
            <el-form-item label="所在部门" prop="departmentName" class="width310" >
              <el-input v-model="custDetailedInfo.departmentName" placeholder="请填写所在部门" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="职务" prop="jobTitle" class="width310" >
              <el-input v-model="custDetailedInfo.jobTitle" placeholder="请填写职务" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="微信号" prop="wechat" class="width310" >
              <el-input v-model="custDetailedInfo.wechat" placeholder="请填写微信号" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="单位详细地址" prop="workAddressDesc" class="width660">
              <el-input v-model="custDetailedInfo.workAddressDesc" placeholder="请填写单位详细地址" maxlength="100"></el-input>
            </el-form-item>
            <el-form-item label="月收入" prop="monthlyIncomeAmt" class="width310">
              <el-input v-model="custDetailedInfo.monthlyIncomeAmt" placeholder="请填写月收入" maxlength="8"></el-input>
            </el-form-item>
            <el-form-item label="工作电话区号" prop="workAreaNum" class="width310">
              <el-input v-model="custDetailedInfo.workAreaNum" placeholder="请填写工作电话区号"></el-input>
            </el-form-item>
            <el-form-item label="单位固话" prop="workPhoneNum" class="width310">
              <el-input v-model="custDetailedInfo.workPhoneNum" placeholder="请填写单位固话"></el-input>
            </el-form-item>
            <el-form-item label="人事部联系人" prop="hrContactName" class="width310">
              <el-input v-model="custDetailedInfo.hrContactName" placeholder="请填写人事部联系人" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="人事部联系人手机号码" prop="hrContactNum" class="width310">
              <el-input v-model="custDetailedInfo.hrContactNum" placeholder="请填写人事部联系人手机号"></el-input>
            </el-form-item>
            <el-form-item label="住宅邮编" prop="houseZipcode" class="width310">
              <el-input v-model="custDetailedInfo.houseZipcode" placeholder="请填写人住宅邮编"></el-input>
            </el-form-item>
            <el-form-item label="单位邮编" prop="workZipcode" class="width310">
              <el-input v-model="custDetailedInfo.workZipcode" placeholder="请填写单位邮邮编"></el-input>
            </el-form-item>
            <el-form-item label="教育程度" prop="educationLevelCd" class="width310">
              <el-select
                v-model="custDetailedInfo.educationLevelCd"
                placeholder="请选择">
                <el-option
                  v-for="(item, index) in education_level_cd"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="户口所在地" prop="registeredAreaCd" class="width310">
              <el-select
                v-model="custDetailedInfo.registeredAreaCd"
                placeholder="请选择">
                <el-option
                  v-for="(item, index) in registered_area_cd"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="有无子女" prop="haveChildInd" class="width310">
              <el-select
                v-model="custDetailedInfo.haveChildInd"
                placeholder="请选择">
                <el-option label="有" :value="true"></el-option>
                <el-option label="无" :value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="个人税收客户类型" prop="customerTaxCd" class="width310">
              <el-select
                v-model="custDetailedInfo.customerTaxCd"
                :disabled="isDetail || ydApproveMode2"
                placeholder="请选择">
                <el-option
                  v-for="(item, index) in customer_tax_cd"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单位性质" prop="organizationTypeCd" class="width310">
              <el-select
                v-model="custDetailedInfo.organizationTypeCd"
                placeholder="请选择">
                <el-option
                  v-for="(item, index) in organization_type_cd"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="现工作单位年限" prop="presentWorkYearCnt" class="width310">
              <el-input v-model="custDetailedInfo.presentWorkYearCnt" placeholder="请填写现工作单位年限"></el-input>
            </el-form-item>
            <el-form-item label="职务类型" prop="positionTypeCd" class="width310">
              <el-select
                v-model="custDetailedInfo.positionTypeCd"
                placeholder="请选择">
                <el-option
                  v-for="(item, index) in position_type_cd"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="个人类型" prop="personalTypeCd" class="width310">
              <el-select
                v-model="custDetailedInfo.personalTypeCd"
                placeholder="请选择">
                <el-option
                  v-for="(item, index) in personal_type_cd"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div class="contact-info form__block">
      <div class="custom-info-header form__block_header" v-if="!isSurvey">
        <h5 class="title"><span class="icon icon__gan"></span>联系人信息</h5>
      </div>
      <div>
        <el-form :model="custContractInfo"
          :rules="custContractRule"
          ref="custContractForm" label-width="100px"
          class="demo-form-inline" label-position="top"
          :disabled="isDetail || !openVideo || ydApproveMode2">
            <el-form-item label="配偶姓名"
              prop="spouseName"
              class="el-form-item__25 width150">
              <el-input
                v-model="custContractInfo.spouseName"
                maxlength="30"
                :disabled="!(custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.married || custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage)"
                placeholder="请填写配偶姓名"></el-input>
            </el-form-item>
            <el-form-item label="配偶证件类型" prop="spouseIDTypeCode" class="el-form-item__25 width150">
              <el-select
                v-model="custContractInfo.spouseIDTypeCode"
                :disabled="!(custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.married || custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage)"
                placeholder="请选择证件类型">
                <el-option v-for="item in certificate_type_code" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="配偶证件号码" prop="spouseID" class="el-form-item__25 width150" >
              <el-input
                v-model="custContractInfo.spouseID"
                :disabled="!(custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.married || custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage)"
                placeholder="请填写证件号码"></el-input>
            </el-form-item>
            <el-form-item label="配偶手机号" prop="spouseMobile" class="el-form-item__25 width150">
              <el-input v-model="custContractInfo.spouseMobile" placeholder="请填写配偶手机号" :disabled="!(custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.married || custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage)"></el-input>
            </el-form-item>
        </el-form>
        <el-form :model="custContractInfo.relations[0]"
          :rules="customerRelationRule"
          ref="customerRelationForm" label-width="100px"
          class="demo-form-inline" label-position="top"
          :disabled="isDetail || !openVideo || ydApproveMode2">
            <el-form-item label="亲属联系人" prop="name" class="el-form-item__25 width150">
              <el-input
                v-model="custContractInfo.relations[0].name"
                maxlength="30"
                :disabled="custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.married || custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage"
                placeholder="请填写亲属联系人姓名"></el-input>
            </el-form-item>
            <el-form-item label="亲属联系人关系" prop="relationshipCode" class="el-form-item__25 width150">
              <el-select @change="changeRelation(0)"
                v-model="custContractInfo.relations[0].relationshipCode"
                :disabled="custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.married || custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage"
                placeholder="请选择亲属联系人关系">
                <el-option v-for="item in family_relationship_code" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="亲属联系人其他说明" maxlength="10" prop="remark" class="el-form-item__25 width150">
              <el-input
                :disabled="(custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.married || custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage) || custContractInfo.relations[0].relationshipCode !== dCode.familyRelationship.other"
                v-model="custContractInfo.relations[0].remark"
                placeholder="请填写亲属联系人其他说明"></el-input>
            </el-form-item>
            <el-form-item label="亲属联系方式" prop="mobile" class="el-form-item__25 width150">
              <el-input
                v-model="custContractInfo.relations[0].mobile"
                :disabled="custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.married || custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage"
                placeholder="请填写亲属联系方式"></el-input>
            </el-form-item>
        </el-form>
        <el-form :model="custContractInfo.relations[1]"
          :rules="customerNonRelationRule"
          ref="customerNonRelationForm"
          label-width="100px"
          class="demo-form-inline" label-position="top"
          :disabled="isDetail || !openVideo || ydApproveMode2">
          <el-form-item label="非亲属联系人" prop="name" class="el-form-item__25 width150">
            <el-input maxlength="30" v-model="custContractInfo.relations[1].name" placeholder="请填写亲属联系人姓名"></el-input>
          </el-form-item>
          <el-form-item label="非亲属联系人关系" prop="relationshipCode" class="el-form-item__25 width150">
            <el-select @change="changeRelation(1)" v-model="custContractInfo.relations[1].relationshipCode" placeholder="请选择非亲属联系人关系">
              <el-option v-for="item in non_family_relationship_code" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="非亲属联系人其他说明" maxlength="10" prop="remark"  class="el-form-item__25 width150">
            <el-input
              maxlength="10"
              v-model="custContractInfo.relations[1].remark"
              :disabled="custContractInfo.relations[1].relationshipCode !== dCode.relationshipCode.other"
              placeholder="请填写亲属联系人其他说明"></el-input>
          </el-form-item>
          <el-form-item label="非亲属联系方式" prop="mobile"  class="el-form-item__25 width150">
            <el-input v-model="custContractInfo.relations[1].mobile" placeholder="请填写非亲属联系方式"></el-input>
          </el-form-item>
        </el-form>
        <ic-info :showSpouse="false"
          :apiUrl="icInfo_url" :applicationId="applicationId" :disabled="isDetail || !openVideo || ydApproveMode2"
          :isDetail="isDetail" :ydApproveMode2="ydApproveMode2" :routerPath="'counter-ic-info-detail'" :taskNodeCode="'faceToFaceTask'">
        </ic-info>
      </div>
    </div>
    <div class="manager-info form__block">
      <div class="manager-info-header form__block_header">
        <h5 class="title"><span class="icon icon__gan"></span>营销信息</h5>
      </div>
      <el-form :model="custMarketingInfo"
        :rules="custMarketingInfoRule"
        ref="custMarketingForm"
        label-width="100px"
        class="demo-form-inline" label-position="top"
        :disabled="isDetail || !openVideo || ydApproveMode2">
          <div class="dialog-box__form__group margin-top__20">
            <div class="drop__select-box el-form-item__25 width220">
              <p class="lab">客户经理：</p>
              <button class="button" type="button"
                :disabled="true"
                :class="{disabled: isDetail || !openVideo || ydApproveMode2}">{{selectManagerChannel.userName}}<i class="icon el-select__caret el-input__icon el-icon-arrow-up"></i>
              </button>
              <!-- 这里的表单是不可修改的，故将下拉选项去掉 -->
              <!-- <button class="button" type="button"
                :disabled="isDetail || custMarketingInfo.custManagerInd || !openVideo"
                @click="dropSelectShow3=!dropSelectShow3;dropSelectShow1=false;dropSelectShow2=false"
                :class="{isactive:dropSelectShow3, disabled: isDetail || !openVideo}">{{selectManagerChannel.userName}}<i class="icon el-select__caret el-input__icon el-icon-arrow-up"></i>
              </button> -->
              <!-- <transition name="el-zoom-in-top">
                <div class="wrap table__wrap-min" v-show="dropSelectShow3">
                  <el-input placeholder="输入客户经理名称" v-model.trim="queryManagerChannel"></el-input>
                  <el-table :data="ManagerChannelList"
                    height="200px" border
                    style="width: 100%"
                    cell-class-name="dialog__table__td"
                    header-cell-class-name="dialog__table__th"
                    @row-click="selectedManagerChannel" class="dialog__table">
                    <el-table-column prop="userId" label="编号"></el-table-column>
                    <el-table-column prop="userName" label="名称"></el-table-column>
                    <el-table-column prop="marketTeamName" label="营销单位"></el-table-column>
                  </el-table>
                </div>
              </transition> -->
            </div>
            <el-form-item label="业务助理："  class="el-form-item__25 width220" >
              <el-input v-model="custMarketingInfo.assistantName" placeholder="请填写业务助理" :disabled="true"></el-input>
            </el-form-item>
            <!-- <el-form-item label="授权原因："  class="el-form-item__25" >
              <el-select v-model="custMarketingInfo.authReasonCode" placeholder="请选择亲授权原因" disabled>
                <el-option v-for="item in auth_reason_code" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否重签资料："  class="el-form-item__25" >
              <el-select v-model="custMarketingInfo.repeatSignInd" placeholder="请选择是否重签资料" disabled>
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="业务类型："  class="el-form-item__25 width220" >
              <el-select v-model="custMarketingInfo.businessTypeCode" placeholder="请选择是业务类型" :disabled="true">
                <el-option v-for="item in business_type_code" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="营销单位编码："  class="el-form-item__25 width220" >
              <el-input v-model="custMarketingInfo.saleTeamId" placeholder="暂无信息" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="授权状态："  class="el-form-item__25 width220" v-if="!isXiuwen">
              <el-input :value="spiderStatus || '无'" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="属地客服：" prop="custServiceId" class="el-form-item__25 width220" >
              <el-select :disabled="localCustemService.length === 0 || isDetail || !openVideo || ydApproveMode2" clearable filterable v-model="custMarketingInfo.custServiceId" placeholder="请选择属地客服">
                <el-option filterable v-for="item in localCustemService" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
          </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { custBasicRule, custDetailedRule, customerInfoSelectArry } from '../../../../js/mind';
import { baseApi, autoIc } from "../../../../js/server";
import myRule from "@common/js/rules";
import icInfo from '@components/businessComponents/ICInfo';
export default {
  name: 'customer-info',
  props: {
    applicationId: {
      type: String,
      default: ''
    },
    isDetail: {
      type: Boolean,
      default: false
    },
    // 易贷面核面签（除收款账户信息）不可编辑
    ydApproveMode2: {
      type: Boolean,
      default: false
    },
    isSurvey: {
      type: Boolean,
      default: false
    },
    applicationIdDetail: {
      type: String,
      default: ''
    }
  },
  data() {
    const custBasicMixRule = {
      sharePercent: [{ validator: this.sharePercentRule, trigger: 'visible-change' }],
      foundDate: [{ validator: this.foundDateRule, trigger: 'blur' }]
    };
    const custDetailedMixRule = {
      hrContactName: [{ validator: this.checkHr, trigger: "blur" }],
      hrContactNum: [{ validator: this.checkHrPhone, trigger: "blur" }]
    };
    const custContractMixRule = {
      spouseName: [{ validator: this.checkSpouseName, trigger: "blur" }],
      spouseIDTypeCode: [{ validator: this.checkSpouseIDTypeCode, trigger: "change" }],
      spouseID: [{ validator: this.checkSpouseID, trigger: "blur" }],
      spouseMobile: [{ validator: this.checkSpouseMobile, trigger: "blur" }]
    };
    const customerRelationMixRule = {
      name: [{ validator: this.checkRelationName, trigger: "blur" }],
      relationshipCode: [{ validator: this.checkRelationshipCode, trigger: "change" }],
      remark: [{ validator: this.checkRelationRemark, trigger: "blur" }],
      mobile: [{ validator: this.checkRelationMobile, trigger: "blur" }]
    };
    const customerNonRelationMixRule = {
      name: [{ validator: this.checkNonRelationName, trigger: "blur" }],
      relationshipCode: [{ validator: this.checkNonRelationshipCode, trigger: "change" }],
      remark: [{ validator: this.checkNonRelationRuleRemark, trigger: "blur" }],
      mobile: [
        { validator: this.checkNonRelationMobile, trigger: "blur" },
        { validator: myRule.phoneRule, trigger: "blur" }
      ]
    };
    return {
      approveModeCdText: '', // 审批模式
      icInfo_url: autoIc,
      api: !this.isDetail ? baseApi.pending : baseApi.processed,
      loading: null,
      // 码值依赖
      dCode: this.$getCodeDependent(),
      custBasicInfo: {},
      custBasicRule: Object.assign(custBasicRule(), custBasicMixRule),
      options: [], // 地区列表
      gender_code: [], // 性别字典
      marital_status_code: [], // 婚姻状况字典
      house_condition_code: [], // 居住状况字典
      career_type_code: [], // 客户类型字典
      share_percent: [], // 占股情况字典
      education_level_cd: [], // 教育程度字典
      registered_area_cd: [], // 户口所在地字典
      organization_type_cd: [], // 单位性质字典
      position_type_cd: [], // 职务类型字典
      personal_type_cd: [], // 个人类型字典
      certificate_type_code: [], // 证件类型字典
      family_relationship_code: [], // 亲属联系人关系字典
      non_family_relationship_code: [], // 非亲属联系人关系字典
      business_type_code: [], // 业务类型字典
      customer_tax_cd: [], // 客户下拉类型
      localCustemService: [],
      pricingPlanLibrary: [], // 定价方式，0614项目
      spiderStatus: "", // 爬虫 - 授权状态
      custDetailedInfo: {},
      custDetailedRule: Object.assign(custDetailedRule(), custDetailedMixRule),
      custDetailedInfoOrigin: "", // 个人信息序列化
      custBasicInfoOrigin: '', // 序列化
      custContractInfoOrigin: "", // 联系人信息序列化
      custContractInfo: {
        relations: [
          {
            id: null,
            mobile: null,
            name: null,
            relationshipCode: null,
            remark: null,
            typeCode: "01"
          },
          {
            id: null,
            mobile: null,
            name: null,
            relationshipCode: null,
            remark: null,
            typeCode: "02"
          }
        ]
      },
      custContractRule: custContractMixRule,
      // customerRelation: {}, // 亲属关系
      customerRelationRule: customerRelationMixRule,
      // customerNonRelation: {}, // 非亲属关系
      customerNonRelationRule: customerNonRelationMixRule,
      marketingInfoOrigin: "", // 营销信息序列化
      custMarketingInfo: {},
      custMarketingInfoRule: {
        custServiceId: [
          { required: true, message: "请选择属地客服", trigger: "change" }
        ]
      },
      // 客户经理
      queryManagerChannel: "",
      selectManagerChannel: { userId: "000000", userName: "自来客户" },
      ManagerChannelList: [{ userId: "000000", userName: "自来客户" }]
    };
  },
  methods: {
    // 获取属地客服
    getUserList(roles = [], subCompanyId) {
      subCompanyId = subCompanyId === 'undefined' ? undefined : subCompanyId;
      this.$MyFetch.post(baseApi.userInfoList, {roles, subCompanyId}).then(_data => {
        this.localCustemService = _data;
        // 当属地客服列表为空的时候，非必填
        this.custMarketingInfoRule.custServiceId[0].required = this.localCustemService.length !== 0;
      }).catch(_err => {
        this.confirmFn(_err.message);
      });
    },
    // 获取多个下拉项
    getSelectOptionWather() {
      this.$on('getSelectOption', () => {
        this.getMultipleLibrary(customerInfoSelectArry);
      });
    },
    getMultipleLibrary(_selectArr) {
      const selectOption = this.$store.getters.selectOption;
        _selectArr.forEach(_v => {
        this[_v] = selectOption[_v];
      });
    },
    maritalStatusChange() {
      if (this.custBasicInfo.maritalStatusCode === this.dCode.maritalStatusCode.married || this.custBasicInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage) {
        this.custContractInfo.spouseName = JSON.parse(this.custContractInfoOrigin).spouseName;
        this.custContractInfo.spouseIDTypeCode = JSON.parse(this.custContractInfoOrigin).spouseIDTypeCode;
        this.custContractInfo.spouseID = JSON.parse(this.custContractInfoOrigin).spouseID;
        this.custContractInfo.spouseMobile = JSON.parse(this.custContractInfoOrigin).spouseMobile;
        this.$refs.customerRelationForm.clearValidate(['name', 'relationshipCode', 'remark', 'mobile']);
      } else {
        this.custContractInfo.spouseName = "";
        this.custContractInfo.spouseIDTypeCode = "";
        this.custContractInfo.spouseID = "";
        this.custContractInfo.spouseMobile = "";
        this.$refs.custContractForm.clearValidate(['spouseName', 'spouseIDTypeCode', 'spouseID', 'spouseMobile']);
      }
    },
    getAllInfo() {
      this.loading = this.$loading({
        text: "",
        spinner: "",
        background: "transparent"
      });
    },
    getInfo() {
      this.loading = this.$loading({
        text: "",
        spinner: "",
        background: "transparent"
      });
      this.$MyFetch
        .get(this.api.getCustomerInfo + this.applicationId).then(async (_data) => {
          _data = _data || {};
          this.options = await this.getAreaList();
          this.loading.close();
          // _data.custBasicInfo = this.addressHandler(_data.custBasicInfo); // 地址转换
          this.custId = _data.custId;
          this.custBasicInfo = _data.custBasicInfo; // 基本信息
          if (this.custBasicInfo.easyLoanInd) {
            this.$getDictCode("approve_mode").then(res => {
              res.map(fontTxt => {
                if (this.custBasicInfo.approveModeCd === fontTxt.itemCode) {
                  this.approveModeCdText = fontTxt.itemDesc;
                }
              });
            })
            .catch(err => {
              this.$error(err.message);
            });
          }
          this.custDetailedInfo = _data.custDetailedInfo; // 补充个人信息
          this.relationsHandler(_data.custContractInfo); // 联系人亲属处理
          this.custContractInfo = _data.custContractInfo; // 联系人信息
          if (_data.custMarketingInfo.custManagerId === "半刻客户经理") {
            this.selectManagerChannel = {
              userName: _data.custMarketingInfo.custManagerId
            };
          }
          if (_data.custMarketingInfo.custManagerId) {
            this.getChannelName3(_data.custMarketingInfo.custManagerId); // 客户经理转换
          }
          this.custMarketingInfo = _data.custMarketingInfo; // 营销信息
          this.$nextTick(() => {
            this.$refs.custMarketingForm.clearValidate();
          });
          this.custBasicInfoOrigin = JSON.stringify(this.custBasicInfo);
          this.custDetailedInfoOrigin = JSON.stringify(this.custDetailedInfo);
          this.custContractInfoOrigin = JSON.stringify(this.custContractInfo);
          this.custMarketingInfoOrigin = JSON.stringify(this.custMarketingInfo);
        }).catch(_error => {
          this.loading.close();
          this.confirmFn(_error.message, "error");
        });
    },
    // 省市区地址转换，用于element-ui的级联下拉框
    // addressHandler(_info) {
    //   const addressToArr = (_code, _opitions) => {
    //     return _code ? this.getAddressArr(_code, _opitions) : [];
    //   };
    //   let info = Object.assign({}, _info);
    //   info.registeredAddressCode = addressToArr(info.registeredAddressCode, this.options);
    //   info.houseAddressCode = addressToArr(info.houseAddressCode, this.options);
    //   info.workAddressCode = addressToArr(info.workAddressCode, this.options);
    //   return info;
    // },
    relationsHandler(custContractInfo) {
      let info = [
        {
          id: null,
          mobile: null,
          name: null,
          relationshipCode: null,
          remark: null,
          typeCode: this.dCode.typeCode.relative
        },
        {
          id: null,
          mobile: null,
          name: null,
          relationshipCode: null,
          remark: null,
          typeCode: this.dCode.typeCode.nonRelative
        }
      ];
      let relations = custContractInfo.relations;
      if (relations && relations.length === 1) {
        if (relations[0].typeCode === this.dCode.typeCode.relative) {
          info[0] = relations[0];
          info[1] = {
            id: null,
            mobile: null,
            name: null,
            relationshipCode: null,
            remark: null,
            typeCode: this.dCode.typeCode.nonRelative
          };
        }
        if (relations[0].typeCode === this.dCode.typeCode.nonRelative) {
          info[0] = {
            id: null,
            mobile: null,
            name: null,
            relationshipCode: null,
            remark: null,
            typeCode: this.dCode.typeCode.relative
          };
          info[1] = relations[0];
        }
      }
      if (relations && relations.length >= 2) {
        relations.forEach((v) => {
          if (v.typeCode === this.dCode.typeCode.relative) {
            info[0] = v;
          } else if (v.typeCode === this.dCode.typeCode.nonRelative) {
            info[1] = v;
          }
        });
      }
      custContractInfo.relations = info;
    },
    saveHandeleWath() {
      this.$on('saveHandle', (_isSubmit) => {
        this.saveInfo(_isSubmit);
      });
    },
    saveInfo(_isSubmit) {
      let forms = ['custBasicForm', 'custDetailedForm', 'custContractForm', 'customerRelationForm', 'customerNonRelationForm', 'custMarketingForm'];
      for (let i = 0; i < forms.length; i++) {
        if (!this.checkFormValid(forms[i])) {
          this.confirmFn("字段未填写完整", "error");
          return false;
        }
      }
      let basicInfo = {
        // registeredAddressCode: this.custBasicInfo.registeredAddressCode[this.custBasicInfo.registeredAddressCode.length - 1],
        // houseAddressCode: this.custBasicInfo.houseAddressCode[this.custBasicInfo.houseAddressCode.length - 1],
        // workAddressCode: this.custBasicInfo.workAddressCode[this.custBasicInfo.workAddressCode.length - 1]
        registeredAddressCode: this.custBasicInfo.registeredAddressCode,
        houseAddressCode: this.custBasicInfo.houseAddressCode,
        workAddressCode: this.custBasicInfo.workAddressCode
      };
      let custBasicInfo = Object.assign({}, this.custBasicInfo, basicInfo);
      let custContractInfo = this.$lodash.cloneDeep(this.custContractInfo);
      if (custBasicInfo.maritalStatusCode === this.dCode.maritalStatusCode.married || custBasicInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage) {
        custContractInfo.relations.splice(0, 1);
      }
      // 获取话术库内容，保存接口不做校验
      let speechOptionMap = Object.assign({}, this.$store.getters.speechOptionMap);
      let data = {
        custId: this.custId,
        applicationId: this.applicationId,
        custBasicInfo: custBasicInfo,
        custContractInfo: custContractInfo,
        custDetailedInfo: this.custDetailedInfo,
        custMarketingInfo: JSON.parse(JSON.stringify(this.custMarketingInfo)),
        faceCheckOpinion: speechOptionMap.remark,
        opinionCheckStateList: speechOptionMap.optionList
      };
      // if (data.custMarketingInfo.custServiceId === '00000') {
      //   this.confirmFn('确定属地客服为其他吗？').then(_data => {
      //     data.custMarketingInfo.custServiceId = '';
      //     this.saveCustomerHandle(data, _isSubmit);
      //   });
      //   return;
      // }
      this.saveCustomerHandle(data, _isSubmit);
    },
    saveCustomerHandle(data, _isSubmit) {
      let loading = this.$loading({
        text: "",
        spinner: "",
        background: 'transparent'
      });
      this.$MyFetch.post(baseApi.saveCustomerInfo, data).then(_data => {
        loading.close();
        // 保存之后还原修改数据
        this.custBasicInfoOrigin = JSON.stringify(this.custBasicInfo);
        this.custDetailedInfoOrigin = JSON.stringify(this.custDetailedInfo);
        this.custContractInfoOrigin = JSON.stringify(this.custContractInfo);
        this.custMarketingInfoOrigin = JSON.stringify(this.custMarketingInfo);
        // 重置切换标签页开关，只是单纯的上发，实际计算属性isCustomerUpdate并未改变
        this.$emit('customer_update', true);
        if (_isSubmit) {
          this.$emit('submitHandle');
          return;
        }
        this.confirmFn("保存成功！", "success");
      }).catch(_error => {
        loading.close();
        this.confirmFn(_error.message, 'error');
      });
    },
    checkFormValid(_formName) {
      let v = true;
      this.$refs[_formName].validate(valid => {
        if (!valid) {
          v = false;
        }
      });
      return v;
    },
    // 查询经理渠道
    getQueryManageChannel() {
      var data = {
        userName: this.queryManagerChannel,
        postTypeCodeList: ["CM", "EC"]
      };
      this.$MyFetch
        .get(baseApi.completeCustomerInfo.queryManangeChannnel, data)
        .then((data) => {
          let arr = [{ userId: "000000", userName: "自来客户" }];
          if (data) {
            this.ManagerChannelList = [...arr, ...data.list];
          }
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 由编码显示客户经理
    getChannelName3(code) {
      let url = baseApi.completeCustomerInfo.queryAllManangeChannnel;
      this.$MyFetch
        .get(url + code + '/prepare').then((data) => {
          if (data) {
            this.selectManagerChannel = {
              userId: data.list[0].userId,
              userName: data.list[0].userName
            };
          } else {
            this.selectManagerChannel = {userId: code, userName: code};
          }
        }).catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 获取地区列表值
    getAreaList() {
      return this.getArea({getAll: this.isDetail}).then(data => {
        localStorage.setItem('address', JSON.stringify(data));
        return Promise.resolve(data);
      });
    },
    getPricingPlanApi() {
      this.$MyFetch.get(baseApi.pending.getPricingPlanCode + this.applicationId)
        .then(data => {
          this.pricingPlanLibrary = data;
        }).catch((err) => {
          !!err.message && this.confirmFn(err.message, 'error');
        });
    },
    // 爬虫 - 授权状态
    getSpiderStatus() {
      this.$MyFetch
        .get(baseApi.completeCustomerInfo.getSpiderStatus + this.applicationId)
        .then(data => {
          this.spiderStatus = data;
        }).catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 选择标准授薪时应该去掉 占股情况， 成立日期， 是否注册
    removeValue(value) {
      if (value === this.dCode.careerTypeCode.boss) {
        this.custBasicInfo.foundDate = '';
        this.custBasicInfo.sharePercent = '';
        this.custBasicInfo.registeredInd = false;
      }
    },
    sharePercentRule(rule, value, callback) {
      if (this.custBasicInfo.registeredInd && !value) {
        return callback(new Error('请选择占股情况'));
      } else {
        callback();
      }
    },
    foundDateRule(rule, value, callback) {
      if ((this.custBasicInfo.careerTypeCode === this.dCode.careerTypeCode.boss) && !value && this.custBasicInfo.registeredInd) {
        return callback(new Error('请选择成立日期'));
      } else {
        callback();
      }
    },
    // 验证人事部联系人
    checkHr(rule, value, callback) {
      if (this.custBasicInfo.careerTypeCode !== this.dCode.careerTypeCode.boss) {
        if (value) {
          myRule.nameRule(rule, value, callback);
        } else {
          callback(new Error('请输入人事部联系人姓名'));
        }
      } else {
        callback();
      }
    },
    // 验证人事部联系人手机
    checkHrPhone(rule, value, callback) {
      const valReg = /^1[3456789]\d{9}$/;
      if (this.custBasicInfo.careerTypeCode !== this.dCode.careerTypeCode.boss && !value) {
        callback(new Error("请输入人事部联系人手机号码！"));
      } else if (value && !valReg.test(value)) {
        callback(new Error("请输入正确的手机号码！"));
      } else {
        callback();
      }
    },
    // 验证配偶姓名
    checkSpouseName(rule, value, callback) {
      // 若是已婚，再婚
      if (this.custBasicInfo.maritalStatusCode === this.dCode.maritalStatusCode.married || this.custBasicInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage) {
        if (!value) {
          callback(new Error("请填写配偶姓名！"));
        } else {
          myRule.nameRule(rule, value, callback);
          if (this.custContractInfo.spouseName === this.custContractInfo.relations[1].name) {
            // this.confirmFn('联系人姓名重复添加', 'error');
            callback();
          }
        }
      } else {
        callback();
      }
    },
    // 验证配偶证件类型
    checkSpouseIDTypeCode(rule, value, callback) {
      if (
        (this.custBasicInfo.maritalStatusCode === this.dCode.maritalStatusCode.married ||
          this.custBasicInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage) &&
        !value
      ) {
        callback(new Error("请选择配偶证件类型！"));
      } else {
        callback();
      }
    },
    // 验证配偶证件号码
    checkSpouseID(rule, value, callback) {
      if ((this.custBasicInfo.maritalStatusCode === this.dCode.maritalStatusCode.married || this.custBasicInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage)) {
        if (!this.custContractInfo.spouseIDTypeCode) {
          callback(new Error('请先选择配偶证件类型！'));
        } else if (!value) {
          callback(new Error('请填写配偶证件号码！'));
        } else if (this.custContractInfo.spouseIDTypeCode === this.dCode.certificateTypeCode.ID) {
          myRule.identityCardRule(rule, value, callback);
        } else {
          myRule.otherCardRule(rule, value, callback);
        }
      } else {
        callback();
      }
    },
    // 验证配偶电话号码
    checkSpouseMobile(rule, value, callback) {
      const valReg = /^1[3456789]\d{9}$/;
      // 若是已婚，再婚
      if (this.custBasicInfo.maritalStatusCode === this.dCode.maritalStatusCode.married || this.custBasicInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage) {
        if (!value) {
          callback(new Error("请填写配偶手机号码！"));
        } else if (!valReg.test(value)) {
          callback(new Error("请填写正确的手机号码！"));
        } else if (this.custContractInfo.spouseMobile === this.custContractInfo.relations[1].mobile) {
          // this.confirmFn('联系人手机号码重复添加', 'error');
          callback();
        } else {
          callback();
        }
      } else {
        callback();
      }
    },
    // 验证亲属联系人姓名
    checkRelationName(rule, value, callback) {
      // 若非已婚，再婚
      if (this.custBasicInfo.maritalStatusCode !== this.dCode.maritalStatusCode.married && this.custBasicInfo.maritalStatusCode !== this.dCode.maritalStatusCode.remarriage) {
        if (!value) {
          callback(new Error("请填写亲属联系人姓名！"));
        } else {
          myRule.nameRule(rule, value, callback);
          if (this.custContractInfo.relations[0].name === this.custContractInfo.relations[1].name) {
            // this.confirmFn('联系人姓名重复添加', 'error');
            callback();
          }
        }
      } else {
        callback();
      }
    },
    // 验证亲属联系人关系
    checkRelationshipCode(rule, value, callback) {
      if (
        this.custBasicInfo.maritalStatusCode !== this.dCode.maritalStatusCode.married &&
        this.custBasicInfo.maritalStatusCode !== this.dCode.maritalStatusCode.remarriage &&
        !value
      ) {
        callback(new Error("请选择亲属联系人关系！"));
      } else {
        callback();
      }
    },
    // 验证亲属关系其他说明
    checkRelationRemark(rule, value, callback) {
      const valReg = /^[\u4e00-\u9fa5]{1,10}$/;
      if (
        this.custBasicInfo.maritalStatusCode !== this.dCode.maritalStatusCode.married &&
        this.custBasicInfo.maritalStatusCode !== this.dCode.maritalStatusCode.remarriage &&
        this.custContractInfo.relations[0].relationshipCode === this.dCode.familyRelationship.other
      ) {
        if (!value) {
          callback(new Error("请填写其他亲属关系说明！"));
        } else if (!valReg.test(value)) {
          callback(new Error("请输入10个字符以内的汉字"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    },
    // 验证亲属关系联系电话
    checkRelationMobile(rule, value, callback) {
      const valReg = /^1[3456789]\d{9}$/;
      // 若非已婚，再婚
      if (this.custBasicInfo.maritalStatusCode !== this.dCode.maritalStatusCode.married && this.custBasicInfo.maritalStatusCode !== this.dCode.maritalStatusCode.remarriage) {
        if (!value) {
          callback(new Error("请输入手机号码！"));
        } else if (!valReg.test(value)) {
          callback(new Error("请填写正确的手机号码！"));
        } else if (this.custContractInfo.relations[0].mobile === this.custContractInfo.relations[1].mobile) {
          // this.confirmFn('联系人手机号码重复添加', 'error');
          callback();
        } else {
          callback();
        }
      } else {
        callback();
      }
    },
    // 验证非亲属联系人姓名
    checkNonRelationName(rule, value, callback) {
      // console.log(this.custContractInfo);
      if (!value) {
        callback(new Error("请输入非亲属联系人姓名！"));
      } else {
        myRule.nameRule(rule, value, callback);
        // 若是已婚，再婚
        if (this.custBasicInfo.maritalStatusCode === this.dCode.maritalStatusCode.married || this.custBasicInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage) {
          if (this.custContractInfo.spouseName === this.custContractInfo.relations[1].name) {
            this.confirmFn('联系人姓名重复添加', 'error');
          }
          callback();
        } else {
          if (this.custContractInfo.relations[0].name === this.custContractInfo.relations[1].name) {
            this.confirmFn('联系人姓名重复添加', 'error');
          }
          callback();
        }
      }
    },
    // 验证非亲属联系人关系
    checkNonRelationshipCode(rule, value, callback) {
      if (!value) {
        callback(new Error("请选择非亲属联系人关系！"));
      } else {
        callback();
      }
    },
    // 验证非亲属关系其他说明
    checkNonRelationRuleRemark(rule, value, callback) {
      const valReg = /^[\u4e00-\u9fa5]{1,10}$/;
      if (this.custContractInfo.relations[1].relationshipCode === this.dCode.relationshipCode.other) {
        if (!value) {
          callback(new Error("请填写其他非亲属关系说明！"));
        } else if (!valReg.test(value)) {
          callback(new Error("请输入10个字符以内的汉字"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    },
    checkNonRelationMobile(rule, value, callback) {
      const valReg = /^1[3456789]\d{9}$/;

      if (!value) {
        callback(new Error("请输入手机号码！"));
      } else if (!valReg.test(value)) {
        callback(new Error("请填写正确的手机号码！"));
      } else {
        // 若是已婚，再婚
        if (this.custBasicInfo.maritalStatusCode === this.dCode.maritalStatusCode.married || this.custBasicInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage) {
          if (this.custContractInfo.spouseMobile === this.custContractInfo.relations[1].mobile) {
            this.confirmFn('联系人手机号码重复添加', 'error');
          }
          callback();
        } else {
          if (this.custContractInfo.relations[0].mobile === this.custContractInfo.relations[1].mobile) {
            this.confirmFn('联系人手机号码重复添加', 'error');
          }
          callback();
        }
      }
    }
  },
  created() {
    this.getInfo();
    this.getPricingPlanApi();
    // this.getAreaList();
    this.getSelectOptionWather();
    // 监听从祖父组件传下来的命令
    this.saveHandeleWath();
    let rolesList = ['cpms_r_cc_0001'];
    let subCompanyId = window.atob(this.$route.query.subCompanyId);
    this.getUserList(rolesList, subCompanyId);
  },
  computed: {
    // 是否有修改过
    isCustomerUpdate() {
      let flag = JSON.stringify(this.custBasicInfo) === this.custBasicInfoOrigin &&
        JSON.stringify(this.custDetailedInfo) === this.custDetailedInfoOrigin &&
        JSON.stringify(this.custContractInfo) === this.custContractInfoOrigin &&
        JSON.stringify(this.custMarketingInfo) === this.custMarketingInfoOrigin;
      this.$emit('customer_update', flag);
      return flag;
    },
    ...mapGetters(['openVideo'])
  },
  components: {
    icInfo
  }
};
</script>

<style lang="less" scoped>
  .complete-customer-info.face2face-detail-style {
    .width82 {
      width: 82px;
    }
    .width150 {
      width: 24%;
    }
    .width190 {
      // width: 190px;
      width: 13.2%;
    }
    .width220 {
      width: 220px;
    }
    .width310 {
      // width: 310px;
      width: 21.5%;
    }
    .width660 {
      // width: 660px;
      width: 46.3%;
    }
    @media (max-width: 1500px) {
      .width82 {
        width: 82px;
      }
      .width190 {
        width: 190px;
      }
      .width220 {
        width: 220px;
      }
      .width310 {
        width: 310px;
      }
      .width660 {
        width: 660px;
      }
      .basic-info, .custom-info {
        .el-form-item {
          margin-right: 34px;
        }
      }
    }
    .radio-group {
      display: inline-block;
      width: 310px;
      margin-right: 40px;
    }.margin__200 {
      margin-right: 200px;
    }
    .fixed-save {
      position: absolute;
      z-index: 2;
      margin-left: 1040px;
      margin-top: -150px;
    }
    .form__block {
      padding:20px 0;
      .form__block_header {
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #e9e9e9;
        .title {
          font-size: 16px;
          .icon__gan {
            margin-right: 10px;
          }
        }
      }
      .message__list {
        .item {
          margin-right: 60px;
          padding-bottom: 20px;
        }
        .title {
          margin-right: 5px;
          color: #666;
        }
        .content, .title {
          display: inline-block;
        }
        .item:last-child {
          margin-right: 0;
        }
      }
      .dialog-box__form__group.margin-top__20 {
        .drop__select-box {
          position: relative;
          vertical-align: top;
          .lab {
            padding: 0 0 10px;
            line-height: 17px;
            font-size: 12px;
            color: @font-gray;
            .icon__star {
              color: @red;
              margin-right: 5px;
            }
          }
          .button {
            position: relative;
            min-width: 100%;
            padding: 0 20px;
            line-height: 40px;
            border: 1px solid @line-color;
            text-align: left;
            background: none;
            color: @font-light;
            transition: all 0.3s;
            .icon {
              position: absolute;
              transform: rotateZ(180deg);
              right: 5px;
            }
          }
        }
      }
    }
  }
</style>
