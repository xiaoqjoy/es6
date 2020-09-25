<template>
  <div class="complete-customer-info face2face-detail-style">
    <div class="dialog-box__middle-form">
      <!-- {{isCustomerUpdate}} -->
      <div class="form__block bg__white border__radius-5" >
        <div class="dialog-box__middle-top">
          <h5 class="title"><span class="icon icon__gan"></span>基本信息</h5>
        </div>
        <ul class="message__list clearfix">
          <li class="f__left item">
            <h5 class="title">姓名:</h5>
            <p class="content">{{custBasicInfo.custName}}</p>
          </li>
          <li class="f__left item">
            <h5 class="title">手机号:</h5>
            <p class="content">{{ custBasicInfo.mobileNum}}</p>
          </li>
          <li class="f__left item">
            <h5 class="title">身份证号:</h5>
            <p class="content">{{ custBasicInfo.certificateNum }}</p>
          </li>
        </ul>
        <el-form
          :model="custBasicInfo"
          :rules="custBasicRule"
          ref="custBasicForm"
          label-width="100px"
          class="demo-form-inline" label-position="top"
          :disabled="isDetail">
          <div class="dialog-box__form__group">
            <el-form-item label="人物性别">
              <el-radio-group v-model="custBasicInfo.genderCode">
                <el-radio-button
                  v-for="(item, index) in genderCodeLibrary"
                  :key="index"
                  :label="item.itemCode"
                  :disabled="custBasicInfo.genderCode !== item.itemCode">{{item.itemDesc}}</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="婚姻状况" prop="maritalStatusCode" class="width190">
              <el-select v-model="custBasicInfo.maritalStatusCode" placeholder="请选择婚姻状况" @change="maritalStatusChange">
                <el-option v-for="item in maritalStatusCodes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="居住状况" prop="houseConditionCode" class="width190">
              <el-select v-model="custBasicInfo.houseConditionCode" placeholder="请选择居住状况">
                <el-option v-for="item in houseConditionCodes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="有无本地房产" class="width82">
              <el-switch v-model="custBasicInfo.localEstateInd"
                          :width="50"
                          active-text="有"
                          inactive-text="无"
                          :active-value="true"
                          :inactive-value="false"
              ></el-switch>
            </el-form-item>
            <el-form-item label="户籍地址" prop="registeredAddressCode" class="width310">
              <el-cascader
                :options="options"
                v-model="custBasicInfo.registeredAddressCode">
              </el-cascader>
            </el-form-item>
            <el-form-item label="户籍详细地址" prop="registeredAddressDesc" class="width660">
              <el-input v-model="custBasicInfo.registeredAddressDesc" maxlength="100"></el-input>
            </el-form-item>
            <el-form-item label="身份证签发机关" prop="certificateGrantorName" class="width310">
              <el-input v-model="custBasicInfo.certificateGrantorName"></el-input>
            </el-form-item>
            <el-form-item label="居住地址" prop="houseAddressCode" class="width310">
              <el-cascader
                :options="options"
                v-model="custBasicInfo.houseAddressCode">
              </el-cascader>
            </el-form-item>
            <!-- 需求更改，录入汉字，半角英文字母数字符号 -->
            <el-form-item label="居住详细地址" prop="houseAddressDesc" class="width660">
              <el-input v-model="custBasicInfo.houseAddressDesc" maxlength="100"></el-input>
            </el-form-item>
            <!-- 需求更改，录入汉字，半角英文字母数字符号 -->
            <el-form-item label="单位名称" prop="workplaceName" class="width310">
              <el-input v-model="custBasicInfo.workplaceName" maxlength="100"></el-input>
            </el-form-item>
            <el-form-item label="单位地址" prop="workAddressCode" class="width310">
              <el-cascader
                :options="options"
                v-model="custBasicInfo.workAddressCode">
              </el-cascader>
            </el-form-item>
            <el-form-item label="客户类型" class="width310">
              <el-select v-model="custBasicInfo.careerTypeCode" placeholder="请选择客户类型" @change="removeValue" :disabled="true">
                <el-option v-for="item in careerTypeCodes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="占股情况" prop="sharePercent" class="width310">
              <el-select v-model="custBasicInfo.sharePercent" placeholder="请选择占股情况" :disabled="custBasicInfo.careerTypeCode !== dCode.careerTypeCode.boss">
                <el-option v-for="item in sharePercents" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <div class="radio-group">
              <el-form-item label="6个月内是否正常缴纳公积金" prop="houseFund6mInd"  >
                <el-switch v-model="custBasicInfo.houseFund6mInd"
                            :width="50"
                            active-text="是"
                            inactive-text="否"
                            :active-value="true"
                            :inactive-value="false">
                </el-switch>
              </el-form-item>
              <el-form-item label="是否注册" prop="registeredInd">
                <el-switch v-model="custBasicInfo.registeredInd"
                            :width="50"
                            active-text="是"
                            inactive-text="否"
                            :active-value="true"
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
                :editable="false"
                >
              </el-date-picker>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="form__block bg__white border__radius-5" >
        <div class="dialog-box__middle-top">
          <h5 class="title"><span class="icon icon__gan"></span>补充个人信息</h5>
        </div>
        <ul class="message__list clearfix" v-if="false">
          <li class="f__left item">
            <h5 class="title">姓名:</h5>
            <p class="content">{{ custDetailedInfo.custName }}</p>
          </li>
          <li class="f__left item">
            <h5 class="title">手机号:</h5>
            <p class="content">{{custDetailedInfo.mobileNum}}</p>
          </li>
          <li class="f__left item">
            <h5 class="title">身份证号:</h5>
            <p class="content">{{custDetailedInfo.certificateNum}}</p>
          </li>
          <!-- <li class="f__left item">
            <h5 class="title">所在部门:</h5>
            <p class="content">{{custDetailedInfo.departmentName }}</p>
          </li>
          <li class="f__left item">
            <h5 class="title">职务名称:</h5>
            <p class="content">{{custDetailedInfo.jobTitle}}</p>
          </li> -->
        </ul>
        <el-form :model="custDetailedInfo"
                 :rules="custDetailedRule"
                 ref="custDetailedForm"
                 label-width="100px"
                 class="demo-form-inline" label-position="top"
                 :disabled="isDetail"
                 >
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
              <!-- <el-input-number class="input__number" v-model="custDetailedInfo.monthlyIncomeAmt" :min="0" :max="99999999" placeholder="请填写月收入"></el-input-number> -->
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
                  v-for="(item, index) in educationLevelLibrary"
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
                  v-for="(item, index) in registeredAreaLibrary"
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
            <el-form-item label="单位性质" prop="organizationTypeCd" class="width310">
              <el-select
                v-model="custDetailedInfo.organizationTypeCd"
                placeholder="请选择">
                <el-option
                  v-for="(item, index) in organizationTypeLibrary"
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
                  v-for="(item, index) in positionTypeLibrary"
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
                  v-for="(item, index) in personalTypeCdLibrary"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form>
      </div>

      <div class="form__block bg__white border__radius-5" >
          <div class="dialog-box__middle-top">
            <h5 class="title"><span class="icon icon__gan"></span>联系人信息</h5>
            <!-- 婚姻状态：{{custContractInfo.maritalStatusCode}} -->
          </div>
          <div class="dialog-box__form__group margin-top__20">
            <el-form :model="custContractInfo"
                     :rules="custContractRule"
                     ref="custContractForm"
                     label-width="100px"
                     class="demo-form-inline" label-position="top"
                    :disabled="isDetail"
                     >
              <el-form-item label="配偶姓名"
                            prop="spouseName"
                            class="el-form-item__25" >
                <el-input
                  v-model="custContractInfo.spouseName"
                  maxlength="30"
                  :disabled="!(custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.married || custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage)"
                  placeholder="请填写配偶姓名"></el-input>
              </el-form-item>
              <el-form-item label="配偶证件类型" prop="spouseIDTypeCode" class="el-form-item__25">
                <el-select
                  v-model="custContractInfo.spouseIDTypeCode"
                  :disabled="!(custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.married || custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage)"
                  placeholder="请选择证件类型"
                  >
                  <el-option v-for="item in certificateLibrary" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="配偶证件号码" prop="spouseID" class="el-form-item__25" >
                <el-input
                  v-model="custContractInfo.spouseID"
                  :disabled="!(custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.married || custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage)"
                  placeholder="请填写证件号码"></el-input>
              </el-form-item>
              <el-form-item label="配偶手机号" prop="spouseMobile" class="el-form-item__25">
                <el-input v-model="custContractInfo.spouseMobile" placeholder="请填写配偶手机号" :disabled="!(custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.married || custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage)"></el-input>
              </el-form-item>
            </el-form>
            <el-form :model="custContractInfo.relations[0]"
                     :rules="customerRelationRule"
                     ref="customerRelationForm"
                     label-width="100px"
                     class="demo-form-inline" label-position="top"
                    :disabled="isDetail"
                    >
              <el-form-item label="亲属联系人" prop="name" class="el-form-item__25">
                <el-input
                  v-model="custContractInfo.relations[0].name"
                  maxlength="30"
                  :disabled="custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.married || custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage"
                  placeholder="请填写亲属联系人姓名"></el-input>
              </el-form-item>
              <el-form-item label="亲属联系人关系" prop="relationshipCode" class="el-form-item__25">
                <el-select
                  @change="changeRelation(0)"
                  v-model="custContractInfo.relations[0].relationshipCode"
                  :disabled="custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.married || custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage"
                  placeholder="请选择亲属联系人关系">
                  <el-option v-for="item in relationshipCodes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="亲属联系人其他说明" maxlength="10" prop="remark" class="el-form-item__25">
                <el-input
                  :disabled="(custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.married || custBasicInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage) || custContractInfo.relations[0].relationshipCode !== dCode.familyRelationship.other"
                  v-model="custContractInfo.relations[0].remark"
                  placeholder="请填写亲属联系人其他说明"></el-input>
              </el-form-item>
              <el-form-item label="亲属联系方式" prop="mobile" class="el-form-item__25">
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
                     :disabled="isDetail"
                     >
              <el-form-item label="非亲属联系人" prop="name" class="el-form-item__25">
                <el-input maxlength="30" v-model="custContractInfo.relations[1].name" placeholder="请填写亲属联系人姓名"></el-input>
              </el-form-item>

              <el-form-item label="非亲属联系人关系" prop="relationshipCode" class="el-form-item__25">
                <el-select @change="changeRelation(1)" v-model="custContractInfo.relations[1].relationshipCode" placeholder="请选择非亲属联系人关系">
                  <el-option v-for="item in norelationshipCodes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="非亲属联系人其他说明" maxlength="10" prop="remark"  class="el-form-item__25">
                <el-input
                  maxlength="10"
                  v-model="custContractInfo.relations[1].remark"
                  :disabled="custContractInfo.relations[1].relationshipCode !== dCode.relationshipCode.other"
                  placeholder="请填写亲属联系人其他说明"></el-input>
              </el-form-item>
              <el-form-item label="非亲属联系方式" prop="mobile"  class="el-form-item__25">
                <el-input v-model="custContractInfo.relations[1].mobile" placeholder="请填写非亲属联系方式"></el-input>
              </el-form-item>
            </el-form>
          </div>
      </div>
      <div class="form__block bg__white border__radius-5" >
        <el-form :model="custMarketingInfo"
                 :rules="custMarketingInfoRule"
                 ref="custMarketingForm"
                 label-width="100px"
                 class="demo-form-inline" label-position="top"
                 :disabled="isDetail"
                 >
          <div class="dialog-box__middle-top">
            <h5 class="title"><span class="icon icon__gan"></span>营销信息</h5>
          </div>
          <div class="dialog-box__form__group margin-top__20">
            <div class="drop__select-box el-form-item__25">
              <p class="lab">客户经理：</p>
              <button type="button" class="button" @click="dropSelectShow3=!dropSelectShow3;dropSelectShow1=false;dropSelectShow2=false" :class="{isactive:dropSelectShow3, disabled: isDetail}" :disabled="isDetail || custMarketingInfo.custManagerInd">{{selectManagerChannel.userName}}<i class="icon el-select__caret el-input__icon el-icon-arrow-up"></i> </button>
              <transition name="el-zoom-in-top">
                <div class="wrap table__wrap-min" v-show="dropSelectShow3">
                  <el-input placeholder="输入客户经理名称" v-model.trim="queryManagerChannel"></el-input>
                  <el-table
                    :data="ManagerChannelList"
                    height="200px"
                    border
                    style="width: 100%"
                    cell-class-name="dialog__table__td"
                    header-cell-class-name="dialog__table__th"
                    @row-click="selectedManagerChannel"
                    class="dialog__table">
                    <el-table-column
                      prop="userId"
                      label="编号"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="userName"
                      label="名称"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="marketTeamName"
                      label="营销单位"
                      >
                    </el-table-column>
                  </el-table>
                </div>
              </transition>
            </div>
            <el-form-item label="业务助理："  class="el-form-item__25" >
              <el-input v-model="custMarketingInfo.assistantName" placeholder="请填写业务助理" :disabled="true"></el-input>
            </el-form-item>
            <!-- <el-form-item label="授权原因："  class="el-form-item__25" >
              <el-select v-model="custMarketingInfo.authReasonCode" placeholder="请选择亲授权原因" disabled>
                <el-option v-for="item in authReasonCodes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否重签资料："  class="el-form-item__25" >
              <el-select v-model="custMarketingInfo.repeatSignInd" placeholder="请选择是否重签资料" disabled>
                <el-option label="是" :value="true"></el-option>
                <el-option label="否" :value="false"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="业务类型："  class="el-form-item__25" >
              <el-select v-model="custMarketingInfo.businessTypeCode" placeholder="请选择是业务类型" :disabled="true">
                <el-option v-for="item in businessTypeCodes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="营销单位编码："  class="el-form-item__25" >
              <el-input v-model="custMarketingInfo.saleTeamId" placeholder="暂无信息" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="授权状态："  class="el-form-item__25" v-if="!isXiuwen">
              <el-input :value="spiderStatus || '无'" :disabled="true"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div class="form__bottom clearfix fixed-save" v-if="!isDetail">
      <el-button type="primary" @click="submit" class="width100 button-default">保存</el-button>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { baseApi } from "../../js/server.js";
import myRule from "@common/js/rules";
export default {
  props: {
    // 详情传过来的申请编号
    applicationIdDetail: {
      type: String,
      default: ""
    },
    // applicationId: {
    //   type: String,
    //   default: ""
    // },
    // 是否是详情，是的话则所有表单不可编辑
    isDetail: {
      type: Boolean,
      default: false
    }
    // 记录客户信息和产品信息的修改数据
    // checkTabsInfo: {
    //   type: Object,
    //   default: function() {
    //     return {};
    //   }
    // }
  },
  data() {
    return {
      api: {},
      // isDetail: false, // 是否编辑
      options: [], // 地区列表
      genderCodeLibrary: [], // 性别字典
      maritalStatusCodes: [], // 婚姻状况字典
      houseConditionCodes: [], // 居住状况字典
      careerTypeCodes: [], // 客户类型字典
      sharePercents: [], // 占股情况字典

      educationLevelLibrary: [], // 教育程度字典
      registeredAreaLibrary: [], // 户口所在地字典
      organizationTypeLibrary: [], // 单位性质字典
      positionTypeLibrary: [], // 职务类型字典
      personalTypeCdLibrary: [], // 个人类型字典

      certificateLibrary: [], // 证件类型字典
      relationshipCodes: [], // 亲属联系人关系字典
      norelationshipCodes: [], // 非亲属联系人关系字典

      businessTypeCodes: [], // 业务类型字典

      loading: null, // 加载
      loadingTime: 0, // 加载完毕次数
      isSubmit: false, // 是否是点击提交面核
      isSave: false, // 判断是否是保存操作，是的话则改变特殊字段产品验证索引

      dropSelectShow1: false,
      dropSelectShow2: false,
      dropSelectShow3: false,

      custId: '',

      custBasicInfoOrigin: "", // 基本信息序列化
      custBasicInfo: {},
      custBasicRule: {
        maritalStatusCode: [
          { required: true, message: "请选择婚姻状况", trigger: "change" }
        ],
        registeredAddressCode: [
          {
            required: true,
            message: "请选择户籍地址",
            trigger: "visible-change"
          }
        ],
        registeredAddressDesc: [
          { required: true, message: "请选填写户籍详细地址", trigger: "blur" },
          { validator: myRule.addressRule, trigger: "blur" }
        ],
        houseConditionCode: [
          { required: true, message: "请选择居住状况", trigger: "change" }
        ],
        certificateGrantorName: [
          { required: true, message: "请填写身份证签发机关", trigger: "blur" }
        ],
        houseAddressCode: [
          { required: true, message: "请填选择居住地址", trigger: "change" }
        ],
        houseAddressDesc: [
          { required: true, message: "请填写居住详细地址", trigger: "blur" },
          { validator: myRule.addressRule, trigger: "blur" }
        ],
        workplaceName: [
          { required: true, message: "请填单位名称", trigger: "blur" },
          { validator: myRule.companyNameRule, trigger: "blur" }
        ],
        workAddressCode: [
          {
            required: true,
            message: "请选择单位地址",
            trigger: "visible-change"
          }
        ],
        sharePercent: [
          { validator: this.sharePercentRule, trigger: 'visible-change' }
        ],
        foundDate: [
          { validator: this.foundDateRule, trigger: 'blur' }
        ]
      },

      custDetailedInfoOrigin: "", // 个人信息序列化
      custDetailedInfo: {},
      custDetailedRule: {
        jobTitle: [
          { required: true, message: '请输入职务名称', trigger: 'blur' },
          { validator: myRule.allChart, trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '请输入所在部门', trigger: 'blur' },
          { validator: myRule.allChart, trigger: 'blur' }
        ],
        wechat: [{ required: true, message: "请输入微信号", trigger: "blur" }],
        workAddressDesc: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
          { validator: myRule.addressRule, trigger: "blur" }
        ],
        monthlyIncomeAmt: [
          { required: true, message: "请输入月收入", trigger: "blur" },
          { validator: myRule.positiveRule, trigger: "blur" }
        ],
        workAreaNum: [{ validator: myRule.areaNumRule, trigger: "blur" }],
        workPhoneNum: [{ validator: myRule.fix_only_phoneRule, trigger: "blur" }],
        hrContactName: [{ validator: this.checkHr, trigger: "blur" }],
        hrContactNum: [{ validator: this.checkHrPhone, trigger: "blur" }],
        houseZipcode: [
          { required: true, message: "请输入邮编", trigger: "blur" },
          { validator: myRule.postRule, trigger: "blur" }
        ],
        workZipcode: [
          { required: true, message: "请输入邮编", trigger: "blur" },
          { validator: myRule.postRule, trigger: "blur" }
        ],
        educationLevelCd: [
          { required: true, message: "请选教育类型", trigger: "change" }
        ],
        registeredAreaCd: [
          { required: true, message: "请选择户口所在地", trigger: "change" }
        ],
        haveChildInd: [
          { required: true, message: "请选择有无子女", trigger: "change" }
        ],
        organizationTypeCd: [
          { required: true, message: "请选择单位性质", trigger: "change" }
        ],
        presentWorkYearCnt: [
          {
            required: true,
            message: "请填写现工作单位工作年限",
            trigger: "blur"
          },
          {
            validator: (rule, value, callback) => {
              var reg = /(^\d{1,2}$)/;
              if (!reg.test(value) && !!value) {
                callback(new Error("请填写正确的工作年限(最大99)"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        positionTypeCd: [
          { required: true, message: "请选择职务类型", trigger: "change" }
        ],
        personalTypeCd: [
          { required: true, message: '请选择个人类型', 'trigger': 'change' }
        ]
      },

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
      custContractRule: {
        spouseName: [
          { validator: this.checkSpouseName, trigger: "blur" }
          ],
        spouseIDTypeCode: [
          { validator: this.checkSpouseIDTypeCode, trigger: "change" }
        ],
        spouseID: [{ validator: this.checkSpouseID, trigger: "blur" }],
        spouseMobile: [{ validator: this.checkSpouseMobile, trigger: "blur" }]
      },
      // customerRelation: {}, // 亲属关系
      customerRelationRule: {
        name: [
          { validator: this.checkRelationName, trigger: "blur" }
          ],
        relationshipCode: [
          { validator: this.checkRelationshipCode, trigger: "change" }
        ],
        remark: [{ validator: this.checkRelationRemark, trigger: "blur" }],
        mobile: [{ validator: this.checkRelationMobile, trigger: "blur" }]
      },
      // customerNonRelation: {}, // 非亲属关系
      customerNonRelationRule: {
        name: [
          { validator: this.checkNonRelationName, trigger: "blur" }
        ],
        relationshipCode: [
          { validator: this.checkNonRelationshipCode, trigger: "change" }
        ],
        remark: [
          { validator: this.checkNonRelationRuleRemark, trigger: "blur" }
        ],
        mobile: [
          {
            validator: this.checkNonRelationMobile,
            trigger: "blur"
          },
          { validator: myRule.phoneRule, trigger: "blur" }
        ]
      },

      marketingInfoOrigin: "", // 营销信息序列化
      custMarketingInfo: {},
      custMarketingInfoRule: {},

      spiderStatus: "", // 爬虫 - 授权状态

      // 客户经理
      queryManagerChannel: "",
      selectManagerChannel: {
        userId: "000000",
        userName: "自来客户"
      },
      ManagerChannelList: [
        {
          userId: "000000",
          userName: "自来客户"
        }
      ],
      // 码值依赖
      dCode: this.$getCodeDependent()
    };
  },
  computed: {
    // 是否有修改过
    isCustomerUpdate() {
      return (
        JSON.stringify(this.custBasicInfo) === this.custBasicInfoOrigin &&
        JSON.stringify(this.custDetailedInfo) === this.custDetailedInfoOrigin &&
        JSON.stringify(this.custContractInfo) === this.custContractInfoOrigin &&
        JSON.stringify(this.custMarketingInfo) === this.custMarketingInfoOrigin
      );
    }
  },
  created() {
    // console.log(this.$route.query.applicationId);
    // console.log(this.applicationIdDetail);
    // 获取申请编号。this.applicationIdDetail存在，则说明是从组件过来的，否则是从路由过来的
    if (this.applicationIdDetail) {
      this.applicationId = this.applicationIdDetail;
    } else {
      this.applicationId = this.$route.query.applicationId;
    }

    if (!this.isDetail) {
      this.api = baseApi.pending;
    } else {
      this.api = baseApi.processed;
    }

    // 获取全部数据
    this.getAllInfo();
    // 监听保存事件，由父路由触发
    window.eventBus.$on("customersinfo", () => {
      this.submit();
      this.isSubmit = true;
    });
  },
  methods: {
    changeRelation(type) {
      if (type === 0 && this.custContractInfo.relations[0].relationshipCode !== this.dCode.familyRelationship.other) {
        this.custContractInfo.relations[0].remark = "";
        this.$refs.customerRelationForm.clearValidate(['remark']);
      }
      if (type === 1 && this.custContractInfo.relations[1].relationshipCode !== this.dCode.relationshipCode.other) {
        this.custContractInfo.relations[1].remark = "";
        this.$refs.customerNonRelationForm.clearValidate(['remark']);
      }
    },
    compare(newVal, oldVal) {
      if (newVal === oldVal) {
        return true;
      } else {
        if (typeof oldVal === "string") {
          oldVal = JSON.parse(oldVal);
        }
        for (var k1 in newVal) {
          if (!isNaN(newVal[k1])) {
            newVal[k1] += "";
          }
        }
        for (var k2 in oldVal) {
          if (!isNaN(oldVal[k2])) {
            oldVal[k2] += "";
          }
        }
        console.log(JSON.stringify(newVal));
        console.log(JSON.stringify(oldVal));
        if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
          return true;
        }
        return false;
      }
    },
    // 获取全部数据
    getAllInfo() {
      this.loading = this.$loading({
        text: "",
        spinner: "",
        background: "transparent"
      });
      // this.applicationId = "RL20190227000053";
      // this.getInfo(this.applicationId);
      this.getAreaList()
        .then(() => {
          this.getInfo();
        })
        .catch((e) => {
          console.log(e);
          this.loading.close();
        });

      if (!this.isXiuwen) {
        this.getSpiderStatus(); // 爬虫 - 授权状态
      }

      // 获取人物性别字典
      this.$getDictCode("gender_code", {getAll: this.isDetail}).then(res => {
        this.genderCodeLibrary = res;
      });
      // 获取婚姻状况字典
      this.$getDictCode("marital_status_code", {getAll: this.isDetail}).then(res => {
        this.maritalStatusCodes = res;
      });
      // 获取居住状况字典
      this.$getDictCode("house_condition_code", {getAll: this.isDetail}).then(res => {
        this.houseConditionCodes = res;
      });
      // 获取客户类型字典
      this.$getDictCode("career_type_code", {getAll: this.isDetail}).then(res => {
        this.careerTypeCodes = res;
      });
      // 获取占股情况字典
      this.$getDictCode("share_percent", {getAll: this.isDetail}).then(res => {
        this.sharePercents = res;
      });

      // 获取教育程度
      this.$getDictCode("education_level_cd", {getAll: this.isDetail}).then(res => {
        this.educationLevelLibrary = res;
      });
      // 户口所在地程度
      this.$getDictCode("registered_area_cd", {getAll: this.isDetail}).then(res => {
        this.registeredAreaLibrary = res;
      });
      // 单位性质程度
      this.$getDictCode("organization_type_cd", {getAll: this.isDetail}).then(res => {
        this.organizationTypeLibrary = res;
      });
      // 单位性质程度
      this.$getDictCode("position_type_cd", {getAll: this.isDetail}).then(res => {
        this.positionTypeLibrary = res;
      });

      // 获取证件类型字典
      this.$getDictCode("certificate_type_code", {getAll: this.isDetail}).then(res => {
        this.certificateLibrary = res;
      });

      this.$getDictCode('personal_type_cd', {getAll: this.isDetail}).then(res => {
        this.personalTypeCdLibrary = res;
      });

      // 获取亲属联系人关系字典
      this.$getDictCode("family_relationship_code", {getAll: this.isDetail}).then(res => {
        this.relationshipCodes = res;
      });
      // 获取非亲属联系人关系字典
      this.$getDictCode("non_family_relationship_code", {getAll: this.isDetail}).then(res => {
        this.norelationshipCodes = res;
      });

      // 获取信用报告来源字典
      this.$getDictCode("report_source_code", {getAll: this.isDetail}).then(res => {
        this.reportSourceCodes = res;
      });
      // 获取授权原因字典
      this.$getDictCode("auth_reason_code", {getAll: this.isDetail}).then(res => {
        this.authReasonCodes = res;
      });
      // 获取业务类型字典
      this.$getDictCode("business_type_code", {getAll: this.isDetail}).then(res => {
        this.businessTypeCodes = res;
      });
    },

    // 爬虫 - 授权状态
    getSpiderStatus() {
      this.$MyFetch
        .get(baseApi.completeCustomerInfo.getSpiderStatus + this.applicationId)
        .then(data => {
          this.spiderStatus = data;
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },

    // 获取地区列表值
    getAreaList() {
      return this.getArea({getAll: this.isDetail}).then(data => {
        this.options = data;
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
    // 保存
    submit() {
      let hasPass = 0;
      this.isSave = true;
      this.$refs.custBasicForm.validate(valid => {
        if (!valid) {
          hasPass += 1;
        }
      });
      this.$refs.custDetailedForm.validate(valid => {
        if (!valid) {
          hasPass += 1;
        }
      });
      this.$refs.custContractForm.validate(valid => {
        if (!valid) {
          hasPass += 1;
        }
      });
      this.$refs.customerRelationForm.validate(valid => {
        if (!valid) {
          hasPass += 1;
        }
      });
      this.$refs.customerNonRelationForm.validate(valid => {
        if (!valid) {
          hasPass += 1;
        }
      });
      this.$refs.custMarketingForm.validate(valid => {
        if (!valid) {
          hasPass += 1;
        }
      });
      let custBasicInfo = Object.assign({}, this.custBasicInfo, {
        registeredAddressCode: this.custBasicInfo.registeredAddressCode[this.custBasicInfo.registeredAddressCode.length - 1]
      }, {
        houseAddressCode: this.custBasicInfo.houseAddressCode[this.custBasicInfo.houseAddressCode.length - 1]
      }, {
        workAddressCode: this.custBasicInfo.workAddressCode[this.custBasicInfo.workAddressCode.length - 1]
      });
      let custContractInfo = this.$lodash.cloneDeep(this.custContractInfo);
      if (custBasicInfo.maritalStatusCode === this.dCode.maritalStatusCode.married || custBasicInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage) {
        custContractInfo.relations.splice(0, 1);
      }
      let data = {
        custId: this.custId,
        applicationId: this.applicationId,
        custBasicInfo: custBasicInfo,
        custContractInfo: custContractInfo,
        custDetailedInfo: this.custDetailedInfo,
        custMarketingInfo: this.custMarketingInfo
      };
      if (hasPass === 0) {
        let loading = this.$loading({
          text: "",
          spinner: "",
          background: 'transparent'
        });
        this.basicInfo_saveApi(data).then(() => {
          loading.close();
          // 保存之后还原修改数据
          this.custBasicInfoOrigin = JSON.stringify(this.custBasicInfo);
          this.custDetailedInfoOrigin = JSON.stringify(this.custDetailedInfo);
          this.custContractInfoOrigin = JSON.stringify(this.custContractInfo);
          this.custMarketingInfoOrigin = JSON.stringify(this.custMarketingInfo);

          // 调用父组件的方法，进行提交面核操作
          if (this.isSubmit) {
            // this.$emit("faceCheck_submit");
            // window.eventBus.$emit("remote_faceCheck_submitStopVideo");
            this.$parent.$parent.faceCheck_submit();
            this.isSubmit = false;
          } else {
            this.confirmFn("保存成功！", "success");
          }
        });
      } else {
        this.confirmFn("字段未填写完整", "error");
      }
    },
    // 保存客户基本信息
    basicInfo_saveApi(data) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .post(baseApi.saveCustomerInfo, data)
          .then(() => {
            resolve(data);
          })
          .catch(err => {
            console.error(err);
            this.confirmFn(err.message, "error");
          });
      });
    },
    address2Arr(code) {
      return code ? this.getAddressArr(code, this.options) : [];
    },
    addressHandler(info) {
      info.registeredAddressCode = this.address2Arr(info.registeredAddressCode);
      info.houseAddressCode = this.address2Arr(info.houseAddressCode);
      info.workAddressCode = this.address2Arr(info.workAddressCode);
    },
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
    getInfo() {
      this.$MyFetch
        .get(this.api.getCustomerInfo + this.applicationId)
        .then((data) => {
          data = data || {};
          this.loading.close();
          this.addressHandler(data.custBasicInfo); // 地址转换

          this.custId = data.custId;
          this.custBasicInfo = data.custBasicInfo; // 基本信息
          this.custDetailedInfo = data.custDetailedInfo; // 补充个人信息

          this.relationsHandler(data.custContractInfo); // 联系人亲属处理
          this.custContractInfo = data.custContractInfo; // 联系人信息
          if (data.custMarketingInfo.custManagerId === "半刻客户经理") {
            this.selectManagerChannel = {
              userName: data.custMarketingInfo.custManagerId
            };
          }
          this.getChannelName3(data.custMarketingInfo.custManagerId); // 客户经理转换
          this.custMarketingInfo = data.custMarketingInfo; // 营销信息

          this.custBasicInfoOrigin = JSON.stringify(this.custBasicInfo);
          this.custDetailedInfoOrigin = JSON.stringify(this.custDetailedInfo);
          this.custContractInfoOrigin = JSON.stringify(this.custContractInfo);
          this.custMarketingInfoOrigin = JSON.stringify(this.custMarketingInfo);

          // console.log(this.custContractInfo.relations);
        })
        .catch((e) => {
          this.loading.close();
          this.confirmFn(e.message, "error");
        });
    },
    // 查询经理渠道
    getQueryManageChannel() {
      var data = {
        userName: this.queryManagerChannel,
        postTypeCodeList: ["CM", "EC"]
      };
      this.$MyFetch
        .get(baseApi.completeCustomerInfo.queryManangeChannnel, data)
        .then((data = {}) => {
          // console.log(data);
          let arr = [
            {
              userId: "000000",
              userName: "自来客户"
            }
          ];
          if (data && data.list && data.list.length >= 0) {
            this.ManagerChannelList = [...arr, ...data.list];
          }
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 选中客户经理
    selectedManagerChannel(obj) {
      this.$set(this.custMarketingInfo, "custManagerId", obj.userId);
      this.$set(this.custMarketingInfo, "saleTeamId", obj.marketTeamId);
      this.selectManagerChannel = Object.assign(obj);
      this.dropSelectShow3 = false;
    },
    // 由编码显示客户经理
    getChannelName3(code) {
      var data = {
        userId: code,
        postTypeCodeList: ["CM", "EC"]
      };
      this.$MyFetch
        .get(baseApi.completeCustomerInfo.queryManangeChannnel, data)
        .then((data = {}) => {
          if (data && data.list && data.list.length >= 0) {
            this.selectManagerChannel = {
              userId: data.list[0].userId,
              userName: data.list[0].userName
            };
            /* this.$set(
              this.custMarketingInfo,
              "saleTeamId",
              data.list[0].marketTeamId
            ); */
          }
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
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
          } else {
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
          } else {
            callback();
          }
        }
      } else {
        callback();
      }
    },
    // 验证亲属联系人关系
    checkRelationshipCode(rule, value, callback) {
      // 若非其他，则清空其他说明
      /* if (value !== "0310") {
        this.custContractInfo.relations[0].remark = "";
      } */
      // this.$refs.customerRelationForm.validateField('remark');

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
      // 若非其他，则清空其他说明
      // console.log(value);
      /* if (value !== "0") {
        this.custContractInfo.relations[1].remark = "";
      } */
      // this.$refs.customerNonRelationForm.validateField('remark');

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
    // 验证非亲属关系联系电话
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
  watch: {
    queryManagerChannel(newVal) {
      if (!newVal) {
        return;
      }
      this.getQueryManageChannel();
    }
  },

  // 组件销毁时触发
  // destroyed() {
  //   // 离开组件时判断是否修改过，修改过就提醒需要保存才能离开，true为没有修改过，false为已修改过
  //   let data = {
  //     custDetailedInfo: this.custDetailedInfo,
  //     custContractInfo: this.custContractInfo,
  //     marketingInfo: this.marketingInfo,
  //     orgSpecialInfo: this.orgSpecialInfo
  //   };
  //   if (!this.isCustomerUpdate) {
  //     this.$emit("remote_checkTabsFn", "customers-info", data);
  //   }
  // },

  // 导航离开时，判断数据是否更改，isCustomerUpdate为true则没有更改，反之更改了则不能跳转路由
  beforeRouteLeave(to, from, next) {
    // console.log(this.isCustomerUpdate);
    if (this.isCustomerUpdate) {
      next();
    } else {
      window.eventBus.$emit("remote_checkTabsFn", "customers-info");
      next(false);
    }
  },
  beforeDestroy() {
    // 销毁checkbank
    window.eventBus.$off("customersinfo");
  }
};
</script>

<style lang="less">
</style>

<style lang="less" scoped>
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
.radio-group {
  display: inline-block;
  width: 310px;
  margin-right: 40px;
}
.margin__200 {
  margin-right: 200px;
}
.fixed-save {
  position: absolute;
  z-index: 2;
  margin-left: 1040px;
  margin-top: -150px;
}
.complete-customer-info {
  .tab-box {
    margin-bottom: 20px;
    /deep/ .el-tabs__item {
      font-size: 16px;
      letter-spacing: 1px;
    }
  }
  /deep/.el-tabs__nav-wrap {
    border-bottom: 1px solid @line-color;
  }
  .more-message {
    padding-top: 20px;
    text-align: center;
    border-top: 1px solid @line-color;
    font-size: 14px;
    color: @blue-light;
    cursor: pointer;
    .el-icon-plus {
      font-weight: 900;
    }
  }
  .drop__select-box {
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
  }
  .drop__select-box {
    position: relative;
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
    .wrap {
      position: absolute;
      top: 80px;
      min-width: 100%;
      padding: 20px;
      border: 1px solid @line-color;
      border-radius: 4px;
      background: #fff;
      z-index: 10;
      font-size: 12px;
      &.table__wrap-max {
        left: -250px;
      }
      &.table__wrap-min {
        left: 0;
      }

      .list {
        max-height: 220px;
        overflow-y: auto;
        .item {
          position: relative;
          padding-left: 60px;
          line-height: 60px;
          text-align: center;
          cursor: pointer;
          .num {
            position: absolute;
            left: 0;
            width: 60px;
            display: inline-block;
          }
        }
        .item:hover {
          background: @blue-hover;
        }
      }
    }
    .wrap /deep/ .el-input {
      max-width: 242px;
      margin-bottom: 20px;
    }
    .wrap /deep/ .el-select {
      width: 242px;
      margin-right: 10px;
    }
    .table__wrap-max {
      width: 710px;
    }
    .table__wrap-min {
      width: 466px;
    }
  }
  .drop__select-box .button.isactive {
    border-color: @blue-light;
    .icon {
      transform: rotateZ(0);
    }
  }
  .drop__select-box .button.disabled, .drop__select-box .button[disabled] {
    background: #f5f7fa;
    cursor: not-allowed;
  }
}
.dialog-box__middle-1200 {
  height: 442px;
  overflow-y: auto;
  margin: 0 20px;
  padding: 25px 30px;
  box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
  .dialog-box__middle-top {
    padding: 20px 0;
    border-bottom: 1px solid #e5e5e5;
    .title {
      font-size: 16px;
      .icon__gan {
        margin-right: 10px;
      }
    }
  }
}
.dialog-box__middle-form {
  height: 542px;
  //overflow-y: auto;
  //padding: 0 20px;
  .form__block {
    padding: 20px 0;
    margin-bottom: 20px;
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
    .dialog-box__middle-top {
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
        font-size: 0;
        .title {
          display: inline-block;
          margin-right: 5px;
          font-size: 14px;
          color: #666;
        }
        .content {
          font-size: 14px;
          display: inline-block;
        }
      }
      .item:last-child {
        margin-right: 0;
      }
    }
    .dialog-box__form__group {
      // margin-right: -40px;
      font-size: 0;
    }
    /deep/ .dialog-box__table {
      .dialog__table {
        .el-table__header-wrapper {
          .el-table__header {
            .has-gutter {
              height: 40px;
              /deep/ .dialog__table__th {
                border-bottom: 0px;
                border-right: 0px;
                padding: 0px;
              }
            }
          }
        }
      }
    }
  }
  .form__bottom {
    text-align: center;
    padding-bottom: 20px;
  }
}
</style>
