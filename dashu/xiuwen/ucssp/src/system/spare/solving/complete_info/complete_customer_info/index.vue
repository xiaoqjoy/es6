<template>
  <div class="complete-customer-info">
    <div class="dialog-box__middle-form">
      <div class="form__block bg__white border__radius-5" >
        <div class="dialog-box__middle-top">
          <h5 class="title"><span class="icon icon__gan"></span>补充个人信息</h5>
        </div>
        <ul class="message__list clearfix">
          <li class="f__left item">
            <h5 class="title">姓名:</h5>
            <p class="content">{{ customerAddInfo.custName }}</p>
          </li>
          <li class="f__left item">
            <h5 class="title">手机号:</h5>
            <p class="content">{{customerAddInfo.mobileNum}}</p>
          </li>
          <li class="f__left item">
            <h5 class="title">身份证号:</h5>
            <p class="content">{{customerAddInfo.certificateNum}}</p>
          </li>
        </ul>
        <el-form :model="customerAddInfo"
                 :rules="customerAddInfoRule"
                 ref="customerAddInfoForm"
                 label-width="100px"
                 class="demo-form-inline" label-position="top">
          <div class="dialog-box__form__group">
            <el-form-item label="微信号" prop="wechat" class="el-form-item__33" >
              <el-input v-model="customerAddInfo.wechat" placeholder="请填写微信号" maxlength="30" :disabled="hasSubmit"></el-input>
            </el-form-item>
            <el-form-item label="所在部门" prop="departmentName" class="el-form-item__33" >
              <el-input v-model="customerAddInfo.departmentName" placeholder="请填写所在部门" maxlength="30" :disabled="hasSubmit"></el-input>
            </el-form-item>
            <el-form-item label="职务名称" prop="jobTitle" class="el-form-item__33" >
              <el-input v-model="customerAddInfo.jobTitle" placeholder="请填写职务" maxlength="30" :disabled="hasSubmit"></el-input>
            </el-form-item>
            <el-form-item label="单位详细地址" prop="workAddressDesc" class="el-form-item__66" >
              <el-input v-model="customerAddInfo.workAddressDesc" placeholder="请填写单位详细地址" maxlength="100" :disabled="hasSubmit"></el-input>
            </el-form-item>
            <el-form-item label="月收入（元）" prop="monthlyIncomeAmt" class="el-form-item__33" >
              <el-input v-model="customerAddInfo.monthlyIncomeAmt" placeholder="请填写月收入" maxlength="8" :disabled="hasSubmit"></el-input>
            </el-form-item>
            <el-form-item label="工作电话区号" prop="workAreaNum" class="el-form-item__33">
              <el-input v-model="customerAddInfo.workAreaNum" placeholder="请填写工作电话区号" :disabled="hasSubmit"></el-input>
            </el-form-item>
            <el-form-item label="单位固话" prop="workPhoneNum" class="el-form-item__33">
              <el-input v-model="customerAddInfo.workPhoneNum" placeholder="请填写单位固话" :disabled="hasSubmit"></el-input>
            </el-form-item>
            <el-form-item label="人事部联系人" prop="hrContactName" class="el-form-item__33">
              <el-input v-model="customerAddInfo.hrContactName" placeholder="请填写人事部联系人" maxlength="30" :disabled="hasSubmit"></el-input>
            </el-form-item>
            <el-form-item label="人事部联系人手机号码" prop="hrContactNum" class="el-form-item__33">
              <el-input v-model="customerAddInfo.hrContactNum" placeholder="请填写人事部联系人手机号" :disabled="hasSubmit"></el-input>
            </el-form-item>
            <el-form-item label="住宅邮编" prop="houseZipcode" class="el-form-item__33">
              <el-input v-model="customerAddInfo.houseZipcode" placeholder="请填写住宅邮编" :disabled="hasSubmit"></el-input>
            </el-form-item>
            <el-form-item label="单位邮编" prop="zipcode" class="el-form-item__33">
              <el-input v-model="customerAddInfo.zipcode" placeholder="请填写单位邮编" :disabled="hasSubmit"></el-input>
            </el-form-item>
            <el-form-item label="教育程度" prop="educationLevelCd" class="el-form-item__33">
              <el-select
                v-model="customerAddInfo.educationLevelCd"
                :disabled="hasSubmit"
                placeholder="请选择">
                <el-option
                  v-for="(item, index) in educationLevelLibrary"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="户口所在地" prop="registeredAreaCd" class="el-form-item__33">
              <el-select
                v-model="customerAddInfo.registeredAreaCd"
                :disabled="hasSubmit"
                placeholder="请选择">
                <el-option
                  v-for="(item, index) in registeredAreaLibrary"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="有无子女" prop="haveChildInd" class="el-form-item__33">
              <el-select
                v-model="customerAddInfo.haveChildInd"
                :disabled="hasSubmit"
                placeholder="请选择">
                <el-option label="有" :value="true"></el-option>
                <el-option label="无" :value="false"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单位性质" prop="organizationTypeCd" class="el-form-item__33">
              <el-select
                v-model="customerAddInfo.organizationTypeCd"
                :disabled="hasSubmit"
                placeholder="请选择">
                <el-option
                  v-for="(item, index) in organizationTypeLibrary"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="现工作单位年限" prop="presentWorkYearCnt" class="el-form-item__33">
              <el-input v-model="customerAddInfo.presentWorkYearCnt" placeholder="请填写现工作单位年限" :disabled="hasSubmit"></el-input>
            </el-form-item>
            <el-form-item label="职务类型" prop="positionTypeCd" class="el-form-item__33">
              <el-select
                v-model="customerAddInfo.positionTypeCd"
                :disabled="hasSubmit"
                placeholder="请选择">
                <el-option
                  v-for="(item, index) in positionTypeLibrary"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="个人类型" prop="personalTypeCd" class="el-form-item__33">
              <el-select
                v-model="customerAddInfo.personalTypeCd"
                :disabled="hasSubmit"
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
          </div>
          <div class="dialog-box__form__group margin-top__20">
            <el-form :model="customerContactsInfo"
                     :rules="customerContactsInfoRule"
                     ref="customerContactsInfoForm"
                     label-width="100px"
                     class="demo-form-inline" label-position="top" >
              <el-form-item label="配偶姓名"
                            prop="spouseName"
                            class="el-form-item__25" >
                <el-input
                  maxlength="30"
                  v-model="customerContactsInfo.spouseName"
                  :disabled="!(customerContactsInfo.maritalStatusCode === dCode.maritalStatusCode.married || customerContactsInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage) || hasSubmit"
                  placeholder="请填写姓名"></el-input>
              </el-form-item>
              <el-form-item label="证件类型" prop="spouseIDTypeCode" class="el-form-item__25">
                <el-select
                  clearable
                  v-model="customerContactsInfo.spouseIDTypeCode"
                  :disabled="!(customerContactsInfo.maritalStatusCode === dCode.maritalStatusCode.married || customerContactsInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage) || hasSubmit"
                  placeholder="请选择证件类型">
                  <el-option
                    v-for="(item, index) in certificateLibrary"
                    :key="index"
                    :value="item.itemCode"
                    :label="item.itemDesc"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="证件号码" prop="spouseID" class="el-form-item__25" >
                <el-input
                  v-model="customerContactsInfo.spouseID"
                  :disabled="!(customerContactsInfo.maritalStatusCode === dCode.maritalStatusCode.married || customerContactsInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage) || hasSubmit"
                  placeholder="请填写证件号码"></el-input>
              </el-form-item>
              <el-form-item label="配偶联系方式" prop="spouseMobile" class="el-form-item__25">
                <el-input v-model="customerContactsInfo.spouseMobile" placeholder="请填写配偶联系方式" :disabled="!(customerContactsInfo.maritalStatusCode === dCode.maritalStatusCode.married || customerContactsInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage) || hasSubmit"></el-input>
              </el-form-item>
            </el-form>
            <el-form :model="customerRelation"
                     :rules="customerRelationRule"
                     ref="customerRelationForm"
                     label-width="100px"
                     :disabled="hasSubmit"
                     class="demo-form-inline" label-position="top" >
              <el-form-item label="亲属联系人" maxlength="15" prop="name" class="el-form-item__25">
                <el-input
                  maxlength="30"
                  v-model="customerRelation.name"
                  :disabled="(this.customerContactsInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage || this.customerContactsInfo.maritalStatusCode === dCode.maritalStatusCode.married) || hasSubmit"
                  placeholder="请填写姓名"></el-input>
              </el-form-item>
              <el-form-item label="亲属联系人关系" prop="relationshipCode" class="el-form-item__25">
                <el-select
                  @change="$refs.customerRelationForm.validateField('remark');if(customerRelation.relationshipCode !== dCode.familyRelationship.other){customerRelation.remark = ''}"
                  v-model="customerRelation.relationshipCode"
                  :disabled="(this.customerContactsInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage || this.customerContactsInfo.maritalStatusCode === dCode.maritalStatusCode.married) || hasSubmit"
                  placeholder="请选择亲属系人关系">
                  <el-option
                    v-for="(item, index) in relationshipCodeLibrary"
                    :key="index"
                    :value="item.itemCode"
                    :label="item.itemDesc"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item  label="其他说明" prop="remark" class="el-form-item__25">
                <el-input
                  maxlength="10"
                  :disabled="(this.customerContactsInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage || this.customerContactsInfo.maritalStatusCode === dCode.maritalStatusCode.married) || (customerRelation.relationshipCode !== this.dCode.familyRelationship.other) || hasSubmit"
                  v-model="customerRelation.remark"
                  placeholder="请填写其他说明"></el-input>
              </el-form-item>
              <el-form-item label="亲属联系方式" prop="mobile" class="el-form-item__25">
                <el-input
                  v-model="customerRelation.mobile"
                  :disabled="(this.customerContactsInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage || this.customerContactsInfo.maritalStatusCode === dCode.maritalStatusCode.married) || hasSubmit"
                  placeholder="请填写亲属联系人方式"></el-input>
              </el-form-item>
            </el-form>
            <el-form :model="customerNonRelation"
                     :rules="customerNonRelationRule"
                     ref="customerNonRelationForm"
                     label-width="100px"
                     :disabled="hasSubmit"
                     class="demo-form-inline" label-position="top" >
              <el-form-item label="非亲属联系人" prop="name" class="el-form-item__25">
                <el-input maxlength="30" v-model="customerNonRelation.name" placeholder="请填写姓名" :disabled="hasSubmit"></el-input>
              </el-form-item>
              <el-form-item label="非亲属联系人关系" prop="relationshipCode" class="el-form-item__25">
                <el-select
                  @change="$refs.customerNonRelationForm.validateField('remark');if(customerNonRelation.relationshipCode !== dCode.relationshipCode.other){customerNonRelation.remark = ''}"
                  :disabled="hasSubmit"
                  v-model="customerNonRelation.relationshipCode"
                  placeholder="请选择非亲属联系人关系">
                  <el-option
                    v-for="(item, index) in nonRelationshipCodeLibrary"
                    :key="index"
                    :value="item.itemCode"
                    :label="item.itemDesc"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="其他说明" prop="remark" class="el-form-item__25">
                <el-input
                  maxlength="10"
                  v-model="customerNonRelation.remark"
                  :disabled="(customerNonRelation.relationshipCode !== dCode.relationshipCode.other) || hasSubmit"
                  placeholder="请填写其他说明"></el-input>
              </el-form-item>
              <el-form-item label="非亲属联系方式" prop="mobile" class="el-form-item__25">
                <el-input v-model="customerNonRelation.mobile"
                          :disabled="hasSubmit"
                          placeholder="请填写非亲属人联系方式"></el-input>
              </el-form-item>
            </el-form>
          </div>
      </div>
      <div class="form__block bg__white border__radius-5" >
        <el-form :model="creditInfo"
                 :rules="creditInfoRule"
                 ref="creditInfoForm"
                 label-width="100px"
                 class="demo-form-inline" label-position="top" >
          <div class="dialog-box__middle-top">
            <h5 class="title"><span class="icon icon__gan"></span>信用信息</h5>
          </div>
          <ul class="message__list clearfix">
            <li class="f__left item">
              <h5 class="title">最高申请额度:</h5>
              <p class="content font__yellow">{{creditInfo.limitLoanAmt ? creditInfo.limitLoanAmt : 0}}</p>
            </li>
            <li class="f__left item">
              <h5 class="title">信用报告来源:</h5>
              <p class="content">{{getreportSource(creditInfo.reportSourceCode)}}</p>
            </li>
            <li class="f__left item">
              <h5 class="title">意向申请金额:</h5>
              <p class="content font__yellow">{{creditInfo.applicationPurposeAmt ? creditInfo.applicationPurposeAmt : 0}}</p>
            </li>
          </ul>
          <div class="dialog-box__form__group">
            <el-form-item label="产品1" prop="name" class="el-form-item__25" >
              <el-select
                v-model="creditInfo.productOne"
                placeholder="请选择产品1"
                disabled>
                <el-option
                  v-for="(item, index) in selectInfo.products"
                  :label="item.productName"
                  :key="index"
                  :value="item.productId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品2" prop="name" class="el-form-item__25" >
              <el-select
                v-model="creditInfo.productTow"
                placeholder="请选择产品2"
                disabled>
                <el-option
                  v-for="(item, index) in selectInfo.products"
                  :label="item.productName"
                  :key="index"
                  :value="item.productId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="申请金额(元)" prop="applicationSubmitAmt" class="el-form-item__25" >
              <el-input
                v-model="creditInfo.applicationSubmitAmt"
                @blur="changeNum"
                maxlength="8"
                :disabled="hasSubmit"
                placeholder="请填写申请金额"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="form__block bg__white border__radius-5" >
        <el-form :model="marketingInfo"
                 :rules="marketingInfoRule"
                 ref="marketingInfoForm"
                 label-width="100px"
                 class="demo-form-inline" label-position="top" >
          <div class="dialog-box__middle-top">
            <h5 class="title"><span class="icon icon__gan"></span>营销信息</h5>
          </div>
          <div class="dialog-box__form__group margin-top__20">
            <div class="drop__select-box el-form-item__25">
              <p class="lab">渠道名称</p>
              <button class="button"
                      type="button"
                      :disabled="hasSubmit"
                      @click="dropSelectShow1=!dropSelectShow1;dropSelectShow2 = false;dropSelectShow3 = false;"
                      :class="{isactive:dropSelectShow1}">{{selectChannel.channelName}} <i class="icon el-select__caret el-input__icon el-icon-arrow-up"></i> </button>
              <transition name="el-zoom-in-top">
                <div class="wrap" v-show="dropSelectShow1">
                  <el-input placeholder="请输入渠道名称" v-model.trim="queryChannel"></el-input>
                  <ul class="list">
                    <li class="item" v-for="(item, index) in channelList" :key="index" @click="selectedChannel(item)">
                      <h5 class="num">{{item.exclusiveChannelId}}</h5>
                      <p class="content">{{item.channelName}}</p>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>
            <div class="drop__select-box el-form-item__25">
              <p class="lab">其他渠道说明</p>
              <button class="button"
                      type="button"
                      @click="dropSelectShow2=!dropSelectShow2;dropSelectShow1 = false;dropSelectShow3 = false;"
                      :class="{isactive:dropSelectShow2, disabled: !(selectChannel.exclusiveChannelId === '000001') || hasSubmit}"
                      :disabled="!(selectChannel.exclusiveChannelId === '000001')|| hasSubmit"> {{selectOtherChannel.channelName}} <i class="icon el-select__caret el-input__icon el-icon-arrow-up"></i> </button>
              <transition name="el-zoom-in-top">
                <div class="wrap table__wrap-max" v-show="dropSelectShow2">
                  <el-select
                    v-model="queryOtherChannelClass"
                    @change="queryOtherChannel = ''"
                    placeholder="请选择亲其他渠道说明">
                    <el-option label="个人渠道" value="personalChannel"></el-option>
                    <el-option label="公司渠道" value="companyChannel"></el-option>
                  </el-select>
                  <el-input placeholder="输入公司或个人渠道名查询" v-model.trim="queryOtherChannel"></el-input>
                  <el-table
                    v-show="(queryOtherChannelClass === 'personalChannel')"
                    :data="otherChannelPersonalList"
                    height="200"
                    border
                    highlight-current-row
                    style="width: 100%"
                    cell-class-name="dialog__table__td"
                    header-cell-class-name="dialog__table__th"
                    @row-click="selectedOtherChannel"
                    class="dialog__table">
                    <el-table-column
                      prop="personalName"
                      label="渠道名称"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="belongToUserName"
                      label="负责人"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="certificate"
                      label="证件类型">
                    </el-table-column>
                    <el-table-column
                      prop="certificateNum"
                      label="证件号">
                    </el-table-column>
                    <el-table-column
                      prop="mobileTelephoneNum"
                      label="手机">
                    </el-table-column>
                    <el-table-column
                      prop="organizationName"
                      label="所属分公司">
                    </el-table-column>
                  </el-table>
                  <el-table
                    v-show="!(queryOtherChannelClass === 'personalChannel')"
                    :data="otherChannelCompanyList"
                    height="200"
                    border
                    style="width: 100%"
                    highlight-current-row
                    cell-class-name="dialog__table__td"
                    header-cell-class-name="dialog__table__th"
                    @row-click="selectedOtherChannel"
                    class="dialog__table">
                    <el-table-column
                      prop="channelName"
                      label="渠道名称"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="belongToUserName"
                      label="负责人"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="certificate"
                      label="证件类型">
                    </el-table-column>
                    <el-table-column
                      prop="organizationCertificateNum"
                      label="证件号">
                    </el-table-column>
                    <el-table-column
                      prop="contact1MobilePhoneNum"
                      label="手机">
                    </el-table-column>
                    <el-table-column
                      prop="organizationName"
                      label="所属分公司">
                    </el-table-column>
                  </el-table>
                </div>
              </transition>
            </div>
            <div class="drop__select-box el-form-item__25">
              <p class="lab">客户经理</p>
              <button class="button"
                      type="button"
                      :disabled="hasSubmit || marketingInfo.custManagerInd"
                      @click="dropSelectShow3=!dropSelectShow3;dropSelectShow1 = false;dropSelectShow2 = false;"
                      :class="{isactive:dropSelectShow3}">{{selectManagerChannel.userName}}<i class="icon el-select__caret el-input__icon el-icon-arrow-up"></i> </button>
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
                      label="营销团队">
                    </el-table-column>
                    <el-table-column
                      prop="marketTeamId"
                      label="营销团队编号">
                    </el-table-column>
                  </el-table>
                </div>
              </transition>
            </div>
            <el-form-item label="业务助理" class="el-form-item__25" >
              <el-input v-model="marketingInfo.assistantName" disabled></el-input>
            </el-form-item>
            <el-form-item label="业务类型"  class="el-form-item__25" >
              <el-select v-model="marketingInfo.businessTypeCode" placeholder="请选择是业务类型" disabled>
                <el-option
                  v-for="(item, index) in businessLibrary"
                  :label="item.itemDesc"
                  :key="index"
                  :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="营销单位编码" class="el-form-item__25">
              <el-input v-model="marketingInfo.saleTeamId" placeholder="暂无信息" disabled></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="form__block bg__white border__radius-5" >
        <el-tabs v-model="activeName" class="tab-box">
          <el-tab-pane label="特殊字段产品一" name="first"></el-tab-pane>
          <el-tab-pane label="特殊字段产品二" name="second" v-if="!!creditInfo.productTow"></el-tab-pane>
        </el-tabs>
        <div class="dialog-box__form__group margin-top__20" v-show="activeName === 'first'">
          <el-form :model="orgSpecialInfo1"
                   :rules="orgSpecialInfoRule1"
                   ref="orgSpecialInfo1Form"
                   label-width="100px"
                   class="demo-form-inline" label-position="top" >
            <el-form-item label="借款人职业名称" prop="careerCode" class="el-form-item__25" >
              <el-select
                :disabled="changeProduct"
                v-model="orgSpecialInfo1.careerCode"
                placeholder="请选择借款人职业名称">
                <el-option
                  v-for="(item,index) in carrerCodeLibrary"
                  :key="index"
                  :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="借款人行业名称" prop="industryCode" class="el-form-item__25" >
              <el-select
                :disabled="changeProduct"
                v-model="orgSpecialInfo1.industryCode"
                placeholder="请选择借款人行业名称">
                <el-option
                  v-for="(item,index) in industryCodeLibrary[0]"
                  :key="index"
                  :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="贷款期限" prop="loanTerm" class="el-form-item__25" >
              <el-select
                :disabled="changeProduct"
                v-model="orgSpecialInfo1.loanTerm"
                placeholder="请选择贷款期限">
                <el-option
                  v-for="(item,index) in loanTermLibrary[0]"
                  :key="index"
                  :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="贷款用途性质" prop="loanPurposeType" class="el-form-item__25" >
              <el-select
                :disabled="changeProduct"
                v-model="orgSpecialInfo1.loanPurposeType"
                placeholder="请选择贷款用途性质">
                <el-option
                  v-for="(item, index) in loanPurposeTypeLibrary"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="贷款用途" prop="loanPurposeCode" class="el-form-item__25" >
              <el-select
                @change="$refs.orgSpecialInfo1Form.validateField('loanOtherPurpose');if(orgSpecialInfo1.loanPurposeCode !== dCode.loanPurposeCode.other){orgSpecialInfo1.loanOtherPurpose = ''}"
                v-model="orgSpecialInfo1.loanPurposeCode"
                placeholder="请选择贷款用途" :disabled="changeProduct">
                <el-option
                  v-for="(item,index) in loanPurposeCodeLibrary[0]"
                  :key="index"
                  :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="其他贷款用途说明" prop="loanOtherPurpose" class="el-form-item__25"  >
              <el-input
                maxlength="10"
                :disabled="!(orgSpecialInfo1.loanPurposeCode === dCode.loanPurposeCode.other) || changeProduct"
                v-model="orgSpecialInfo1.loanOtherPurpose"
                placeholder="请填写其他贷款用途说明"></el-input>
            </el-form-item>
            <el-form-item label="还款周期" prop="repaymentCycleCode" class="el-form-item__25">
              <el-select
                :disabled="changeProduct"
                v-model="orgSpecialInfo1.repaymentCycleCode"
                placeholder="请选择还款周期">
                <el-option
                  v-for="(item, index) in repaymentCycleCodeLibrary"
                  :key="index"
                  :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="还款方式"
                          prop="repaymentModeCode"
                          class="el-form-item__25">
              <el-select
                :disabled="changeProduct"
                v-model="orgSpecialInfo1.repaymentModeCode" placeholder="请选择还款方式">
                <el-option
                  v-for="(item, index) in repaymentModeCodeLibrary"
                  :key="index"
                  :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialog-box__form__group margin-top__20" v-show="activeName === 'second'">
          <el-form :model="orgSpecialInfo2"
                   :rules="orgSpecialInfoRule2"
                   ref="orgSpecialInfo2Form"
                   label-width="100px"
                   v-if="creditInfo.productTow"
                   class="demo-form-inline" label-position="top" >
            <el-form-item label="借款人职业名称" prop="careerCode" class="el-form-item__25" >
              <el-select
                :disabled="changeProduct"
                v-model="orgSpecialInfo2.careerCode"
                placeholder="请选择借款人职业名称">
                <el-option
                  v-for="(item,index) in carrerCodeLibrary"
                  :key="index"
                  :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="借款人行业名称" prop="industryCode" class="el-form-item__25" >
              <el-select
                :disabled="changeProduct"
                v-model="orgSpecialInfo2.industryCode"
                placeholder="请选择借款人行业名称">
                <el-option
                  v-for="(item,index) in industryCodeLibrary[1]"
                  :key="index"
                  :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="贷款期限" prop="loanTerm" class="el-form-item__25" >
              <el-select
                :disabled="changeProduct"
                v-model="orgSpecialInfo2.loanTerm"
                placeholder="请选择贷款期限">
                <el-option
                  v-for="(item,index) in loanTermLibrary[1]"
                  :key="index"
                  :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="贷款用途性质" prop="loanPurposeType" class="el-form-item__25" >
              <el-select
                :disabled="changeProduct"
                v-model="orgSpecialInfo2.loanPurposeType"
                placeholder="请选择贷款用途性质">
                <el-option
                  v-for="(item, index) in loanPurposeTypeLibrary"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="贷款用途" prop="loanPurposeCode" class="el-form-item__25" >
              <el-select
                @change="$refs.orgSpecialInfo2Form.validateField('loanOtherPurpose');if(orgSpecialInfo2.loanPurposeCode !== dCode.loanPurposeCode.other){orgSpecialInfo2.loanOtherPurpose = ''}"
                v-model="orgSpecialInfo2.loanPurposeCode"
                placeholder="请选择贷款用途" :disabled="changeProduct">
                <el-option
                  v-for="(item,index) in loanPurposeCodeLibrary[1]"
                  :key="index"
                  :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="其他贷款用途说明" prop="loanOtherPurpose" class="el-form-item__25" >
              <el-input
                maxlength="10"
                v-model="orgSpecialInfo2.loanOtherPurpose"
                :disabled="!(orgSpecialInfo2.loanPurposeCode === dCode.loanPurposeCode.other) || changeProduct" placeholder="请填写其他贷款用途说明"></el-input>
            </el-form-item>
            <el-form-item label="还款周期" prop="repaymentCycleCode" class="el-form-item__25">
              <el-select
                :disabled="changeProduct"
                v-model="orgSpecialInfo2.repaymentCycleCode" placeholder="请选择还款周期">
                <el-option
                  v-for="(item, index) in repaymentCycleCodeLibrary"
                  :key="index"
                  :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="还款方式" prop="repaymentModeCode" class="el-form-item__25">
              <el-select
                :disabled="changeProduct"
                v-model="orgSpecialInfo2.repaymentModeCode"
                placeholder="请选择还款方式">
                <el-option
                  v-for="(item, index) in repaymentModeCodeLibrary"
                  :key="index"
                  :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="more-message"></div>
        <special-form
          v-if="specialTemplate1.length > 0"
          v-show="activeName === 'first'"
          :render-arr="specialTemplate1"
          form-name="formMore1"
          class="special-form"
          ref="formMore1"
          :set-value="specialData1"
          :has-submit="changeProduct"
        ></special-form>
        <special-form
          v-if="specialTemplate2.length > 0"
          v-show="activeName === 'second'"
          :render-arr="specialTemplate2"
          form-name="formMore2"
          class="special-form"
          ref="formMore2"
          :set-value="specialData2"
          :has-submit="changeProduct"
        ></special-form>
      </div>
      <div class="form__bottom clearfix">
        <el-button
                   v-if="!isReadonly"
                   type="warning"
                   @click="save"
                   class="f__left button__yellow button button__width-200"
                   :disabled="changeProduct">暂存</el-button>
        <el-button
          type="primary"
          class="f__right button__width-200"
          @click="submit"
          v-if="!isReadonly"
          :disabled="changeProduct">完成</el-button>
        <el-button
          v-if="!isReadonly"
          class="f__right button__width-200 button__border-blue"
          @click="preStep">上一步</el-button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {spareApi} from '../../../js/server.js';
  import myRule from '@common/js/rules';
  import specialForm from './special_form';
  export default{
    props: {
      applicationId: {
        type: String,
        default: () => {
          return '';
        }
      },
      isReadonly: {
        type: Boolean,
        default() {
          return false;
        }
      }
    },
    data() {
      return {
        hasSubmit: false,
        dropSelectShow1: false,
        dropSelectShow2: false,
        dropSelectShow3: false,
        activeName: 'first',
        changeProduct: false,
        // 证件类型
        certificateLibrary: [],
        certificateLibrary2: [],
        certificate2Class: [],
        // 业务类型下拉字典项
        businessLibrary: [],
        // 职业字典
        carrerCodeLibrary: [],
        careerClass: {},
        // 行业字典
        industryCodeLibrary: [],
        industryClass: [],
        // 贷款期限字典
        loanTermLibrary: [],
        // 贷款用途性质字典
        loanPurposeTypeLibrary: [],
        // 贷款用途字典
        loanPurposeCodeLibrary: [],
        // 还款周期
        repaymentCycleCodeLibrary: [],
        // 还款方式字典
        repaymentModeCodeLibrary: [],
        // 信用报告来源字典
        reportSourceCodeLibrary: [],
        // 亲属联系人关系
        relationshipCodeLibrary: [],
        // 非亲属联系人关系
        nonRelationshipCodeLibrary: [],
        // 产品下拉字典
        selectInfo: {},
        // 教育程度字典
        educationLevelLibrary: [],
        // 户口所在地
        registeredAreaLibrary: [],
        // 单位性质
        organizationTypeLibrary: [],
        // 职务类型
        positionTypeLibrary: [],
        // 个人类型
        personalTypeCdLibrary: [],
        customerInfo: {},
        customerAddInfo: {
          departmentName: null,
          jobTitle: null,
          educationLevelCd: null,
          positionTypeCd: null,
          presentWorkYearCnt: '',
          organizationTypeCd: null,
          haveChildInd: null,
          registeredAreaCd: null,
          personalTypeCd: null
        }, // 个人信息
        customerAddInfoRule: {
          wechat: [
            { required: true, message: '请输入微信号', trigger: 'blur' }
          ],
          jobTitle: [
            { required: true, message: '请输入职务名称', trigger: 'blur' },
            { validator: myRule.allChart, trigger: 'blur' }
          ],
          departmentName: [
            { required: true, message: '请输入所在部门', trigger: 'blur' },
            { validator: myRule.allChart, trigger: 'blur' }
          ],
          workAddressDesc: [
            { required: true, message: '请输入详细地址', trigger: 'blur' },
            { validator: myRule.addressRule, trigger: 'blur' }
          ],
          monthlyIncomeAmt: [
            { required: true, message: '请输入月收入', trigger: 'blur' },
            { validator: myRule.positiveRule, trigger: 'blur' }
          ],
          workAreaNum: [
            { validator: myRule.areaNumRule, trigger: 'blur' }
          ],
          workPhoneNum: [
            { validator: myRule.fix_only_phoneRule, trigger: 'blur' }
          ],
          hrContactName: [
            { validator: this.checkHr, trigger: 'blur' },
            { validator: myRule.nameRule, trigger: 'blur' }
          ],
          hrContactNum: [
            { validator: this.checkHrPhone, trigger: 'blur' }
          ],
          houseZipcode: [
            { required: true, message: '请输入邮编', trigger: 'blur' },
            { validator: myRule.postRule, trigger: 'blur' }
          ],
          zipcode: [
            { required: true, message: '请输入邮编', trigger: 'blur' },
            { validator: myRule.postRule, trigger: 'blur' }
          ],
          educationLevelCd: [
            { required: true, message: '请选教育类型', 'trigger': 'change' }
          ],
          registeredAreaCd: [
            { required: true, message: '请选择户口所在地', 'trigger': 'change' }
          ],
          haveChildInd: [
            { required: true, message: '请选择有无子女', 'trigger': 'change' }
          ],
          organizationTypeCd: [
            { required: true, message: '请选择单位性质', 'trigger': 'change' }
          ],
          presentWorkYearCnt: [
            { required: true, message: '请填写现工作单位工作年限', 'trigger': 'blur' },
            {
              validator: (rule, value, callback) => {
                var reg = /(^\d{1,2}$)/;
                if (!reg.test(value) && !!value) {
                  callback(new Error('请填写正确的工作年限(最大99)'));
                } else {
                  callback();
                }
              },
              'trigger': 'blur'
            }
          ],
          positionTypeCd: [
            { required: true, message: '请选择职务类型', 'trigger': 'change' }
          ],
          personalTypeCd: [
            { required: true, message: '请选择个人类型', 'trigger': 'change' }
          ]
        },
        // 联系人信息
        customerContactsInfo: {},
        customerContactsInfoRule: {
          spouseName: [
            { validator: this.checkSpouseName, trigger: 'blur' },
            { validator: myRule.nameRule, trigger: 'blur' }
          ],
          spouseIDTypeCode: [
            { validator: this.checkSpouseIDTypeCode }
          ],
          spouseID: [
            { validator: this.checkSpouseID, trigger: 'blur' }
          ],
          spouseMobile: [
            { validator: this.checkSpouseMobile, trigger: 'blur' }
          ]
        },
        // 亲属关系
        customerRelation: {
          relationshipCode: null,
          remark: null,
          name: null,
          mobile: null
        },
        customerRelationRule: {
          name: [
            { validator: this.checkRelationName, trigger: 'blur' },
            { validator: myRule.nameRule, trigger: 'blur' }
          ],
          relationshipCode: [
            { validator: this.checkRelationshipCode, trigger: 'change' }
          ],
          remark: [
            { validator: this.checkRelationRemark, trigger: 'blur' },
            { validator: myRule.chineseChart, trigger: 'blur' }
          ],
          mobile: [
            { validator: this.checkRelationMobile, trigger: 'blur' }
          ]
        },
        customerNonRelation: {
          name: null,
          relationshipCode: null,
          remark: null,
          mobile: null
        }, // 非亲属关系
        customerNonRelationRule: {
          name: [
            { required: true, message: '请输入非亲属联系人姓名', trigger: 'blur' },
            { validator: myRule.nameRule, trigger: 'blur' }
          ],
          relationshipCode: [
            { required: true, message: '请选择非亲属联系人关系', trigger: 'change' }
          ],
          remark: [
            { validator: this.checkNonRelationRuleRemark, trigger: 'blur' },
            { validator: myRule.chineseChart, trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '请填写非亲属关系人联系号码', trigger: 'blur' },
            { validator: myRule.phoneRule, trigger: 'blur' }
          ]
        },

        creditInfo: {}, // 信用信息
        creditInfoRule: {
          applicationSubmitAmt: [
            { required: true, message: '请输入申请金额', trigger: 'blur' },
            { validator: myRule.nonNegative, trigger: 'blur' },
            { validator: this.checkMostNum, trigger: 'blur' }
          ]
        },

        // 营销信息
        marketingInfo: {},
        marketingInfoRule: {},
        spiderStatus: "", // 爬虫 - 授权状态
        // 渠道查询
        queryChannel: '',
        channelList: [
          {
            exclusiveChannelId: '000000',
            channelName: '自来客户'
          },
          {
            exclusiveChannelId: '000001',
            channelName: '其他渠道'
          }
        ],
        selectChannel: {
          exclusiveChannelId: '000000',
          channelName: '自来客户'
        },
        // 其他渠道
        queryOtherChannelClass: 'personalChannel', // 其他渠道类型
        queryOtherChannel: '', // 其他渠道查询
        otherChannelCompanyList: [],
        otherChannelPersonalList: [],
        currentOtherChannelClass: 'personalChannel',
        selectOtherChannel: {
          channelName: '请选择其他渠道类型'
        },
        // 客户经理
        queryManagerChannel: '',
        selectManagerChannel: {
          userId: '000000',
          userName: '自来客户'
        },
        ManagerChannelList: [
          {
            userId: '000000',
            userName: '自来客户'
          }
        ],

        // 特殊字段
        orgSpecialInfo1: {
          careerCode: null,
          industryCode: null,
          loanTerm: null,
          loanPurposeType: null,
          loanPurposeCode: null,
          repaymentCycleCode: null,
          repaymentModeCode: null,
          loanOtherPurpose: null,
          orgSpecialInfoList: []
        },
        orgSpecialInfo2: {
          careerCode: null,
          industryCode: null,
          loanTerm: null,
          loanPurposeType: null,
          loanPurposeCode: null,
          repaymentCycleCode: null,
          repaymentModeCode: null,
          loanOtherPurpose: null,
          orgSpecialInfoList: []
        },
        orgSpecialInfoRule1: {
          careerCode: [
            { required: true, message: '请选择借款人职业', trigger: 'change' }
          ],
          industryCode: [
            { required: true, message: '请选择借款人行业', trigger: 'change' }
          ],
          loanTerm: [
            { required: true, message: '请选择借款期限', trigger: 'change' }
          ],
          loanPurposeType: [
            { required: true, message: '请选择贷款用途性质', trigger: 'change' }
          ],
          loanPurposeCode: [
            { required: true, message: '请选择贷款用途', trigger: 'change' }
          ],
          repaymentCycleCode: [
            { required: true, message: '请选还款周期', trigger: 'change' }
          ],
          repaymentModeCode: [
            { required: true, message: '请选还款方式', trigger: 'change' }
          ],
          loanOtherPurpose: [
            { validator: this.checkloanOtherPurpose1, trigger: 'blur' }
          ]
        },
        orgSpecialInfoRule2: {
          careerCode: [
            { required: true, message: '请选择借款人职业', trigger: 'change' }
          ],
          industryCode: [
            { required: true, message: '请选择借款人行业', trigger: 'change' }
          ],
          loanTerm: [
            { required: true, message: '请选择借款期限', trigger: 'change' }
          ],
          loanPurposeType: [
            { required: true, message: '请选择贷款用途性质', trigger: 'change' }
          ],
          loanPurposeCode: [
            { required: true, message: '请选择贷款用途', trigger: 'change' }
          ],
          repaymentCycleCode: [
            { required: true, message: '请选择还款周期', trigger: 'change' }
          ],
          repaymentModeCode: [
            { required: true, message: '请选择还款方式', trigger: 'change' }
          ],
          loanOtherPurpose: [
            { validator: this.checkloanOtherPurpose2, trigger: 'blur' }
          ]
        },
        // 动态表单字段
        // 模板
        specialTemplate1: [],
        specialTemplate2: [],
        // 表单字段值
        specialData1: {},
        specialData2: {},
        // 版本号
        templateVersionId1: '',
        templateVersionId2: '',
        // 码值依赖
        dCode: this.$getCodeDependent()
      };
    },
    created() {
      this.getInfo(this.applicationId);

      this.getSelectInfo(this.applicationId);
      this.getQueryChannel(); // 获取所有渠道
      this.modifyFn();
      // 下拉项获取
      let selectArr = ['personal_type_cd', 'certificate_type', 'certificate_type_code', 'position_type_cd', 'organization_type_cd', 'registered_area_cd', 'education_level_cd', 'car_loan_status_code', 'non_family_relationship_code', 'family_relationship_code', 'report_source_code', 'business_type_code', 'career_code', 'loan_purpose_type', 'repayment_cycle_code', 'repayment_mode_code'];
      this.getMultipleLibrary(selectArr, this.isReadonly)
        .then(data => {
          this.businessLibrary = data.business_type_code;
          this.carrerCodeLibrary = data.career_code;
          data.career_code.forEach(v => {
            this.$set(this.careerClass, v.itemCode, v.itemDesc);
          });
          this.loanPurposeTypeLibrary = data.loan_purpose_type;
          this.repaymentCycleCodeLibrary = data.repayment_cycle_code;
          this.repaymentModeCodeLibrary = data.repayment_mode_code;
          this.reportSourceCodeLibrary = data.report_source_code;
          this.relationshipCodeLibrary = data.family_relationship_code;
          this.nonRelationshipCodeLibrary = data.non_family_relationship_code;
          this.carLoanStatusCodeLibrary = data.car_loan_status_code;
          this.educationLevelLibrary = data.education_level_cd;
          this.registeredAreaLibrary = data.registered_area_cd;
          this.organizationTypeLibrary = data.organization_type_cd;
          this.positionTypeLibrary = data.position_type_cd;
          this.certificateLibrary = data.certificate_type_code;
          this.personalTypeCdLibrary = data.personal_type_cd;
          this.certificateLibrary2 = data.certificate_type;
          data.certificate_type.forEach(v => {
            this.$set(this.certificate2Class, v.itemCode, v.itemDesc);
          });
        })
        .catch(err => {
          this.confirmFn(err.message);
        });
    },
    methods: {
      modifyFn() {
        // hasSubmit 是否提交（待处理页面中的提交按钮）
        // isChangeProduct 是否要重选产品
        let status = {};
        this.getHasSubmit()
          .then(data => {
            status.hasSubmit = data;
          })
          .then(() => {
            return this.getReselectIndApi();
          })
          .then(data => {
            status.isChangeProduct = data;
            this.hasSubmit = (parseInt(status.hasSubmit) > 1) || this.isReadonly;
            this.changeProduct = (parseInt(status.hasSubmit) > 1 && !status.isChangeProduct) || this.isReadonly;
            console.log(status);
          });
      },
      // 是否重选产品
      getReselectIndApi() {
        return this.$MyFetch.get(spareApi.solving.completeInfo.selectProduction.getReselectInd + this.applicationId);
      },
      getHasSubmit() {
        return this.$MyFetch.get(spareApi.solving.completeInfo.completeProduct.getSubmitStatus + this.applicationId);
      },
      // 保存
      submit() {
        let hasPass = 0;
        if (this.specialTemplate1.length > 0) {
          this.$refs.formMore1.validate((valid) => {
            if (!valid) {
              hasPass += 1;
            }
          });
        }
        this.$refs.orgSpecialInfo1Form.validate((valid) => {
          if (!valid) {
           hasPass += 1;
          }
        });
        if (this.creditInfo.productTow) {
          this.$refs.orgSpecialInfo2Form.validate((valid) => {
            if (!valid) {
              hasPass += 1;
            }
          });
          if (this.specialTemplate2.length > 0) {
            this.$refs.formMore2.validate((valid) => {
              if (!valid) {
                hasPass += 1;
              }
            });
          }
        }
        this.$refs.customerAddInfoForm.validate((valid) => {
          if (!valid) {
            hasPass += 1;
          }
        });
        this.$refs.customerContactsInfoForm.validate((valid) => {
          if (!valid) {
            hasPass += 1;
          }
        });
        this.$refs.customerRelationForm.validate((valid) => {
          if (!valid) {
            hasPass += 1;
          }
        });
        this.$refs.customerNonRelationForm.validate((valid) => {
          if (!valid) {
            hasPass += 1;
          }
        });
        this.$refs.creditInfoForm.validate((valid) => {
          if (!valid) {
            hasPass += 1;
          }
        });
        this.$refs.marketingInfoForm.validate((valid) => {
          if (!valid) {
            hasPass += 1;
          }
        });
        if ((this.selectChannel.exclusiveChannelId === '000001') && (this.selectOtherChannel.channelName === '请选择其他渠道类型')) {
          this.confirmFn('请选择营销信息中的其他渠道说明！', 'error');
          hasPass += 1;
          return;
        }
        let data = {
          custId: this.customerAddInfo.custId,
          applicationId: this.applicationId,
          customerAddInfo: this.customerAddInfo,
          customerContactsInfo: {
            spouseID: this.customerContactsInfo.spouseID,
            spouseIDTypeCode: this.customerContactsInfo.spouseIDTypeCode,
            spouseMobile: this.customerContactsInfo.spouseMobile,
            spouseName: this.customerContactsInfo.spouseName,
            relations: [
              {
                id: this.customerRelation.id,
                mobile: this.customerRelation.mobile,
                name: this.customerRelation.name,
                relationshipCode: this.customerRelation.relationshipCode,
                remark: this.customerRelation.remark,
                typeCode: this.dCode.typeCode.relative
              },
              {
                id: this.customerNonRelation.id,
                mobile: this.customerNonRelation.mobile,
                name: this.customerNonRelation.name,
                relationshipCode: this.customerNonRelation.relationshipCode,
                remark: this.customerNonRelation.remark,
                typeCode: this.dCode.typeCode.nonRelative
              }
            ]
          },
          creditInfo: {
            applicationSubmitAmt: this.creditInfo.applicationSubmitAmt
          },
          marketingInfo: {
            channelCode: (this.selectChannel.exclusiveChannelId !== '000000' && this.selectChannel.exclusiveChannelId !== '000001') ? this.selectChannel.exclusiveChannelId : null,
            custManagerId: this.selectManagerChannel.userId !== '000000' ? this.selectManagerChannel.userId : null,
            otherChannelCode: this.selectOtherChannel.exclusiveChannelId,
            otherChannelType: this.selectOtherChannel.type,
            saleTeamId: this.marketingInfo.saleTeamId
          },
          orgSpecialInfo: [
            this.orgSpecialInfo1,
            this.orgSpecialInfo2
          ]
        };
        // 添加行业名与职业名给后端用
        data.orgSpecialInfo[0].careerName = this.careerClass[data.orgSpecialInfo[0].careerCode];
        data.orgSpecialInfo[0].industryName = this.industryClass[0][data.orgSpecialInfo[0].industryCode];
        if (this.creditInfo.productTow && data.orgSpecialInfo[1].careerCode) {
          data.orgSpecialInfo[1].careerName = this.careerClass[data.orgSpecialInfo[1].careerCode];
        }
        if (this.creditInfo.productTow && data.orgSpecialInfo[1].industryCode) {
          data.orgSpecialInfo[1].industryName = this.industryClass[1][data.orgSpecialInfo[1].industryCode];
        }
        // 如果未婚或者再婚
        if (this.customerContactsInfo.maritalStatusCode === this.dCode.maritalStatusCode.married || this.customerContactsInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage) {
          data.customerContactsInfo.relations.splice(0, 1);
        }
        // 产品一动态字段
        // 传产品id
        data.orgSpecialInfo[0].productId = this.creditInfo.productOne;
        if (this.specialTemplate1.length > 0) {
          // 版本号
          data.orgSpecialInfo[0].templateVersionId = this.templateVersionId1;
          data.orgSpecialInfo[0].orgSpecialFieldList = [];
          Object.keys(this.$refs.formMore1.formData).forEach(key => {
            if (key.indexOf('_cascader') !== -1) {
              return;
            }
            let obj = {};
            obj.orgItemCode = key;
            obj.orgItemVal = this.$refs.formMore1.formData[key];
            data.orgSpecialInfo[0].orgSpecialFieldList.push(obj);
          });
        }
        // 产品二不一定存在,需要先判断
        if (this.creditInfo.productTow) {
          // 传产品id
          data.orgSpecialInfo[1].productId = this.creditInfo.productTow;
        }
        if (this.specialTemplate2.length > 0) {
          // 版本号
          data.orgSpecialInfo[1].templateVersionId = this.templateVersionId2;
          data.orgSpecialInfo[1].orgSpecialFieldList = [];
          Object.keys(this.$refs.formMore2.formData).forEach(key => {
            if (key.indexOf('_cascader') !== -1) {
              return;
            }
            let obj = {};
            obj.orgItemCode = key;
            obj.orgItemVal = this.$refs.formMore2.formData[key];
            data.orgSpecialInfo[1].orgSpecialFieldList.push(obj);
          });
        }
        if (hasPass === 0) {
          this.submitApi(data)
            .then(() => {
              this.confirmFn('保存成功！', 'success');
              this.close();
            });
        } else {
          this.confirmFn('填写信息有误，请检查！', 'error');
        }
      },
      submitApi(data) {
        return new Promise((resolve, reject) => {
          this.$MyFetch.post(spareApi.solving.completeInfo.completeCustomerInfo.submit, data)
            .then(() => {
              resolve(data);
            })
            .catch(err => {
              this.confirmFn(err.message);
            });
        });
      },
      // 暂存
      save() {
        let data = {
          custId: this.customerAddInfo.custId,
          applicationId: this.applicationId,
          customerAddInfo: this.customerAddInfo,
          customerContactsInfo: {
            spouseID: this.customerContactsInfo.spouseID,
            spouseIDTypeCode: this.customerContactsInfo.spouseIDTypeCode,
            spouseMobile: this.customerContactsInfo.spouseMobile,
            spouseName: this.customerContactsInfo.spouseName,
            relations: [
              {
                id: this.customerRelation.id,
                mobile: this.customerRelation.mobile,
                name: this.customerRelation.name,
                relationshipCode: this.customerRelation.relationshipCode,
                remark: this.customerRelation.remark,
                typeCode: this.dCode.typeCode.relative
              },
              {
                id: this.customerNonRelation.id,
                mobile: this.customerNonRelation.mobile,
                name: this.customerNonRelation.name,
                relationshipCode: this.customerNonRelation.relationshipCode,
                remark: this.customerNonRelation.remark,
                typeCode: this.dCode.typeCode.nonRelative
              }
            ]
          },
          creditInfo: {
            applicationSubmitAmt: this.creditInfo.applicationSubmitAmt
          },
          marketingInfo: {
            channelCode: (this.selectChannel.exclusiveChannelId !== '000000' && this.selectChannel.exclusiveChannelId !== '000001') ? this.selectChannel.exclusiveChannelId : null,
            custManagerId: this.selectManagerChannel.userId !== '000000' ? this.selectManagerChannel.userId : null,
            otherChannelCode: this.selectOtherChannel.exclusiveChannelId,
            otherChannelType: this.selectOtherChannel.type,
            saleTeamId: this.marketingInfo.saleTeamId
          },
          orgSpecialInfo: [
            this.orgSpecialInfo1
          ]
        };
        if (this.creditInfo.productTow) {
          data.orgSpecialInfo[1] = this.orgSpecialInfo2;
        }
        // 如果未婚或者再婚
        if (this.customerContactsInfo.maritalStatusCode === this.dCode.maritalStatusCode.married || this.customerContactsInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage) {
          data.customerContactsInfo.relations.splice(0, 1);
        }
        // 添加行业名与职业名给后端用
        if (data.orgSpecialInfo[0].careerCode) {
          data.orgSpecialInfo[0].careerName = this.careerClass[data.orgSpecialInfo[0].careerCode];
        }
        if (data.orgSpecialInfo[0].industryCode) {
          data.orgSpecialInfo[0].industryName = this.industryClass[0][data.orgSpecialInfo[0].industryCode];
        }
        if (this.creditInfo.productTow && data.orgSpecialInfo[1].careerCode) {
          data.orgSpecialInfo[1].careerName = this.careerClass[data.orgSpecialInfo[1].careerCode];
        }
        if (this.creditInfo.productTow && data.orgSpecialInfo[1].industryName) {
          data.orgSpecialInfo[1].industryName = this.industryClass[1][data.orgSpecialInfo[1].industryCode];
        }
        // 产品一动态字段
        // 传产品id
        data.orgSpecialInfo[0].productId = this.creditInfo.productOne;
        // 特殊字段是否存在
        if (this.specialTemplate1.length > 0) {
          // 版本号
          data.orgSpecialInfo[0].templateVersionId = this.templateVersionId1;
          data.orgSpecialInfo[0].orgSpecialFieldList = [];
          Object.keys(this.$refs.formMore1.formData).forEach(key => {
            if (key.indexOf('_cascader') !== -1) {
              return;
            }
            let obj = {};
            obj.orgItemCode = key;
            obj.orgItemVal = this.$refs.formMore1.formData[key];
            data.orgSpecialInfo[0].orgSpecialFieldList.push(obj);
          });
        }
        // 产品二不一定存在,需要先判断
        if (this.creditInfo.productTow) {
          // 传产品id
          data.orgSpecialInfo[1].productId = this.creditInfo.productTow;
        }
        // 特殊字段是否存在
        if (this.specialTemplate2.length > 0) {
          // 版本号
          data.orgSpecialInfo[1].templateVersionId = this.templateVersionId2;
          data.orgSpecialInfo[1].orgSpecialFieldList = [];
          Object.keys(this.$refs.formMore2.formData).forEach(key => {
            if (key.indexOf('_cascader') !== -1) {
              return;
            }
            let obj = {};
            obj.orgItemCode = key;
            obj.orgItemVal = this.$refs.formMore2.formData[key];
            data.orgSpecialInfo[1].orgSpecialFieldList.push(obj);
          });
        }
        this.saveApi(data)
          .then((data) => {
            this.confirmFn('暂存成功！', 'success');
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
      },
      saveApi(data) {
        return new Promise((resolve, reject) => {
          this.$MyFetch.post(spareApi.solving.completeInfo.completeCustomerInfo.save, data)
            .then((data = {}) => {
              resolve(data);
            })
            .catch(err => {
              reject(err);
            });
        });
      },
      close() {
        this.$emit('close');
      },
      // 上一页
      preStep() {
        this.$emit('pre-step');
      },
      // 下拉项字典api
      getSelectValue(name) {
        return new Promise((resolve) => {
          this.$MyFetch.get(spareApi.commonSelect, {categoryCode: name})
            .then((data = {}) => {
              resolve(data);
            })
            .catch(err => {
              this.confirmFn(err.message, 'error');
            });
        });
      },
      // 下拉项字典api
      getAllSelectValue(name) {
        return new Promise((resolve) => {
          this.$MyFetch.get(spareApi.commonSelectAll, {categoryCode: name})
            .then((data = {}) => {
              resolve(data);
            })
            .catch(err => {
              this.confirmFn(err.message, 'error');
            });
        });
      },
      // 获取多个下拉项
      getMultipleLibrary(arr, isReadonly = false) {
        let data = {
          categoryCodes: arr,
          getAll: isReadonly
        };
        return this.$MyFetch.get(spareApi.multipleSelect, data);
      },
      // 获取特定下拉字段
      getSpecialValue(data) {
        // 行业字典获取
        data.orgSpecialInfo.forEach((v, index) => {
          this.$MyFetch.get(spareApi.solving.completeInfo.completeCustomerInfo.getIndustryCode + this.applicationId + '/' + v.productId + '/')
            .then(data => {
              this.$set(this.industryCodeLibrary, index, data);
              let obj = {};
              data.forEach(v => {
                obj[v.itemCode] = v.itemDesc;
              });
              this.$set(this.industryClass, index, obj);
            })
            .catch(err => {
              this.confirmFn(err.message, 'error');
            });
        });
        // 贷款期限字典获取
        data.orgSpecialInfo.forEach((v, index) => {
          this.$MyFetch.get(spareApi.solving.completeInfo.completeCustomerInfo.getLoanTerm + this.applicationId + '/' + v.productId + '/')
            .then(data => {
              this.$set(this.loanTermLibrary, index, data);
            })
            .catch(err => {
              this.confirmFn(err.message, 'error');
            });
        });
        // 贷款期限字典获取
        data.orgSpecialInfo.forEach((v, index) => {
          this.$MyFetch.get(spareApi.solving.completeInfo.completeCustomerInfo.getLoanPurpose + this.applicationId + '/' + v.productId + '/')
            .then(data => {
              this.$set(this.loanPurposeCodeLibrary, index, data);
            })
            .catch(err => {
              this.confirmFn(err.message, 'error');
            });
        });
      },
      // 获取整个页面的值
      getInfo(id) {
        let url = this.isReadonly ? spareApi.solving.completeInfo.completeCustomerInfo.getInfoHasDone : spareApi.solving.completeInfo.completeCustomerInfo.getInfo;
        this.$MyFetch.get(url + id)
          .then(data => {
            this.customerAddInfo = Object.assign(data.customerAddInfo);
            // 亲属关系不能直接绑上去 只能拆开分三个表单
            data.customerContactsInfo.relations = data.customerContactsInfo.relations ? data.customerContactsInfo.relations : [];
            data.customerContactsInfo.relations.forEach((v) => {
              if (v.typeCode === this.dCode.typeCode.relative) {
                this.customerRelation = Object.assign(v);
              } else {
                this.customerNonRelation = Object.assign(v);
              }
            });
            this.customerContactsInfo = Object.assign(data.customerContactsInfo);

            // 信用信息
              if (data.creditInfo.productCreditList.length > 0 && data.creditInfo.productCreditList[0].sortNum === 1) {
                data.creditInfo.productOne = data.creditInfo.productCreditList[0].productId;
                if (data.creditInfo.productCreditList.length > 1) {
                  data.creditInfo.productTow = data.creditInfo.productCreditList[1].productId;
                }
              } else if (data.creditInfo.productCreditList.length > 0 && data.creditInfo.productCreditList[0].sortNum === 2) {
                if (data.creditInfo.productCreditList.length > 1) {
                  data.creditInfo.productOne = data.creditInfo.productCreditList[1].productId;
                }
                data.creditInfo.productTow = data.creditInfo.productCreditList[0].productId;
              }
              this.creditInfo = Object.assign(data.creditInfo);
            // 营销信息
            this.marketingInfo = Object.assign(data.marketingInfo);
            // 获取专属渠道对应值
            // 专属渠道值为空且其他渠道值为空时 专属渠道显示自定义的自来客户 (初始值为这种情况 这里就不用处理)
            // 专属渠道值为空且其他渠道值存在时 专属渠道显示其他
            // 专属渠道值存在时 就调接口查询
            if (!this.marketingInfo.channelCode && this.marketingInfo.otherChannelCode) {
              this.selectChannel = {
                exclusiveChannelId: '000001',
                channelName: '其他渠道'
              };
            } else if (this.marketingInfo.channelCode) {
              this.getChannelName1(this.marketingInfo.channelCode);
            }
            // 获取其他渠道对应的值
            if (this.marketingInfo.otherChannelCode) {
              this.getChannelName2(this.marketingInfo.otherChannelCode, this.marketingInfo.otherChannelType);
            }
            // 获取客户经理对应值
            if (this.marketingInfo.custManagerId) {
              this.getChannelName3(this.marketingInfo.custManagerId);
            }
            // 特殊字段1
            if (data.orgSpecialInfo[0]) {
              this.orgSpecialInfo1 = Object.assign(data.orgSpecialInfo[0]);
              this.templateVersionId1 = this.orgSpecialInfo1.templateVersionId;
            }
            // 依据所选产品调用对应动态表单模板1
            if (this.creditInfo.productOne) {
              // 回显特殊字段一
              if (this.orgSpecialInfo1.orgSpecialFieldList) {
                this.orgSpecialInfo1.orgSpecialFieldList.forEach(v => {
                  this.$set(this.specialData1, v.orgItemCode, v.orgItemVal);
                });
              }
              this.getSpecialApi(this.creditInfo.productOne)
                .then(res => {
                  this.specialTemplate1 = [...res.orgSpecialColumnList];
                })
                .catch(err => {
                  this.confirmFn(err.message, 'error');
                });
            }
           // 特殊字段2
            if (data.orgSpecialInfo[1]) {
              this.orgSpecialInfo2 = Object.assign(data.orgSpecialInfo[1]);
              this.templateVersionId2 = this.orgSpecialInfo2.templateVersionId;
            }
            // 依据所选产品调用对应动态表单模板2
            if (this.creditInfo.productTow) {
              // 回显特殊字段二
              if (this.orgSpecialInfo2.orgSpecialFieldList) {
                this.orgSpecialInfo2.orgSpecialFieldList.forEach(v => {
                  this.$set(this.specialData2, v.orgItemCode, v.orgItemVal);
                });
              }
              this.getSpecialApi(this.creditInfo.productTow)
                .then(res => {
                  this.specialTemplate2 = [...res.orgSpecialColumnList];
                })
                .catch(err => {
                  this.confirmFn(err.message, 'error');
                });
            }
            // 特定下拉项
            this.getSpecialValue(data);
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
      },
      // 获取产品下拉字典
      getSelectInfo(id) {
        this.$MyFetch.get(spareApi.solving.completeInfo.selectProduction.productSelectList + id)
          .then((data = {}) => {
            this.selectInfo = Object.assign(data);
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
      },
      // 查询渠道
      getQueryChannel() {
        let data = {
          channelName: this.queryChannel
        };
        this.$MyFetch.get(spareApi.solving.completeInfo.completeCustomerInfo.queryChannel, data)
          .then((data) => {
            if (!data) {
              return;
            }
            let arr = [
              {
                exclusiveChannelId: '000000',
                channelName: '自来客户'
              },
              {
                exclusiveChannelId: '000001',
                channelName: '其他渠道'
              }
            ];
            this.channelList = [...arr, ...data.list];
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
      },
      // 选中渠道
      selectedChannel(obj) {
        this.selectChannel = Object.assign(obj);
        this.dropSelectShow1 = false;
        if (obj.channelName !== '000001') {
          this.selectOtherChannel = {
            channelName: '请选择其他渠道类型'
          };
        }
      },
      // 由编码值查询专属渠道对应的渠道名 用于回显
      getChannelName1(channelCode) {
        let url = spareApi.solving.completeInfo.completeCustomerInfo.queryAllChannel;
        this.$MyFetch.get(url + channelCode)
          .then((data) => {
            if (data) {
              this.selectChannel = {
                exclusiveChannelId: data.exclusiveChannelId,
                channelName: data.channelName
              };
            }
          })
          .catch(err => {
            this.confirmFn(err.message);
          });
      },
      // 查询其他渠道
      getQueryOtherChannel() {
        let url = '';
        var data = {};
        if (this.queryOtherChannelClass === 'personalChannel') {
          url = spareApi.solving.completeInfo.completeCustomerInfo.queryPersonalChannel;
          data = {
            personalName: this.queryOtherChannel
          };
        } else {
          url = spareApi.solving.completeInfo.completeCustomerInfo.queryCompanyChannel;
          data = {
            channelName: this.queryOtherChannel
          };
        }
        this.$MyFetch.get(url, data)
          .then((data) => {
            if (!data) {
              return;
            }
            data.list.forEach((v) => {
              if (v.certificateTypeCode) {
                v.certificate = this.certificate2Class[v.certificateTypeCode];
              } else {
                v.certificate = this.certificate2Class[v.organizationCertificateTypeCode];
              }
            });
            if (this.queryOtherChannelClass === 'personalChannel') {
              this.otherChannelPersonalList = [...data.list];
            } else {
              this.otherChannelCompanyList = [...data.list];
            }
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
      },
      // 选中其他渠道
      selectedOtherChannel(obj) {
        this.selectOtherChannel = Object.assign(obj);
        if (obj.personalName) {
          this.selectOtherChannel.type = 'personalChannel';
          this.selectOtherChannel.channelName = this.selectOtherChannel.personalName;
          this.selectOtherChannel.exclusiveChannelId = this.selectOtherChannel.personalChannelId;
        } else {
          this.selectOtherChannel.type = 'companyChannel';
          this.selectOtherChannel.exclusiveChannelId = this.selectOtherChannel.organizationChannelId;
        }
        this.dropSelectShow2 = false;
      },
      // 由编码和类型查询对应的公司渠道及个人渠道, 用于回显
      getChannelName2(channelCode, type) {
        let url = '';
        if (type === 'personalChannel') {
          url = spareApi.solving.completeInfo.completeCustomerInfo.queryAllPersonalChannel;
        } else {
          url = spareApi.solving.completeInfo.completeCustomerInfo.queryAllCompanyChannel;
        }
        this.$MyFetch.get(url + channelCode)
          .then((data = {}) => {
            if (type === 'personalChannel') {
                this.selectOtherChannel.type = 'personalChannel';
                this.selectOtherChannel.channelName = data.personalName;
                this.selectOtherChannel.exclusiveChannelId = data.personalChannelId;
              } else {
                this.selectOtherChannel.type = 'companyChannel';
                this.selectOtherChannel.exclusiveChannelId = data.organizationChannelId;
                this.selectOtherChannel.channelName = data.channelName;
              }
          })
          .catch(err => {
            this.confirmFn(err.message + '其他渠道', 'error');
          });
      },
      // 查询经理渠道
      getQueryManageChannel() {
        var data = {
          userName: this.queryManagerChannel,
          postTypeCodeList: ["CM", 'EC']
        };
        this.$MyFetch.get(spareApi.solving.completeInfo.completeCustomerInfo.queryManangeChannnel, data)
          .then((data) => {
            let arr = [
              {
                userId: '000000',
                userName: '自来客户'
              }
            ];
            if (data) {
              this.ManagerChannelList = [...arr, ...data.list];
            }
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
      },
      // 选中客户经理
      selectedManagerChannel(obj) {
        this.$set(this.marketingInfo, 'saleTeamId', obj.marketTeamId);
        this.selectManagerChannel = Object.assign(obj);
        this.dropSelectShow3 = false;
      },
      // 由编码显示客户经理
      getChannelName3(code) {
        let url = spareApi.solving.completeInfo.completeCustomerInfo.queryAllManangeChannnel;
        this.$MyFetch.get(url + code + "/prepare")
          .then((data) => {
            if (data) {
              this.selectManagerChannel = {
                userId: data.list[0].userId,
                userName: data.list[0].userName
              };
            } else {
              this.selectManagerChannel = {
                userId: code,
                userName: code
              };
            }
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
      },
      // 验证人事部联系人
      checkHr(rule, value, callback) {
        if (this.customerAddInfo.careerTypeCode !== this.dCode.careerTypeCode.boss && !value) {
            callback(new Error('请输入人事部联系人姓名'));
        } else {
          callback();
        }
      },
      // 验证人事部联系人手机
      checkHrPhone(rule, value, callback) {
        const valReg = /^1[3456789]\d{9}$/;
        if (this.customerAddInfo.careerTypeCode !== this.dCode.careerTypeCode.boss && !value) {
          callback(new Error('请输入人事部联系人手机号码！'));
        } else if (value && !valReg.test(value)) {
          callback(new Error('请输入正确的手机号码！'));
        } else {
          callback();
        }
      },
      // 验证配偶姓名
      checkSpouseName(rule, value, callback) {
        if ((this.customerContactsInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage || this.customerContactsInfo.maritalStatusCode === this.dCode.maritalStatusCode.married) && !value) {
          callback(new Error('请输入配偶姓名！'));
        } else {
          callback();
        }
      },
      // 验证配偶证件类型
      checkSpouseIDTypeCode(rule, value, callback) {
        if ((this.customerContactsInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage || this.customerContactsInfo.maritalStatusCode === this.dCode.maritalStatusCode.married) && !value) {
          callback(new Error('请选择配偶证件类型！'));
        } else {
          callback();
        }
      },
      // 验证配偶证件号
      checkSpouseID(rule, value, callback) {
        if ((this.customerContactsInfo.maritalStatusCode === this.dCode.maritalStatusCode.married || this.customerContactsInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage)) {
          if (!this.customerContactsInfo.spouseIDTypeCode) {
            callback(new Error('请先选择配偶证件类型！'));
          } else if (!value) {
            callback(new Error('请填写配偶证件号码！'));
          } else if (this.customerContactsInfo.spouseIDTypeCode === this.dCode.certificateTypeCode.ID) {
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
        if ((this.customerContactsInfo.maritalStatusCode === this.dCode.maritalStatusCode.married || this.customerContactsInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage) && !value) {
          callback(new Error('请填写配偶电话号码！'));
        } else if (!valReg.test(value) && (this.customerContactsInfo.maritalStatusCode === this.dCode.maritalStatusCode.married || this.customerContactsInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage)) {
          callback(new Error('请填写正确的电话号码！'));
        } else {
          callback();
        }
      },
      // 验证亲属联系人姓名
      checkRelationName(rule, value, callback) {
        if ((this.customerContactsInfo.maritalStatusCode !== this.dCode.maritalStatusCode.remarriage && this.customerContactsInfo.maritalStatusCode !== this.dCode.maritalStatusCode.married) && !value) {
          callback(new Error('请输入请输联系人姓名！'));
        } else {
          callback();
        }
      },
      // 验证亲属联系人关系
      checkRelationshipCode(rule, value, callback) {
        if ((this.customerContactsInfo.maritalStatusCode !== this.dCode.maritalStatusCode.remarriage && this.customerContactsInfo.maritalStatusCode !== this.dCode.maritalStatusCode.married) && !value) {
          callback(new Error('请选择亲属联系人关系！'));
        } else {
          callback();
        }
      },
      // 验证亲属关系其他说明
      checkRelationRemark(rule, value, callback) {
        if ((this.customerContactsInfo.maritalStatusCode !== this.dCode.maritalStatusCode.remarriage && this.customerContactsInfo.maritalStatusCode !== this.dCode.maritalStatusCode.married) && (this.customerRelation.relationshipCode === this.dCode.familyRelationship.other) && !value) {
          callback(new Error('请填写其他关系说明！'));
        } else {
          callback();
        }
      },
      // 验证亲属关系联系电话
      checkRelationMobile(rule, value, callback) {
        const valReg = /^1[3456789]\d{9}$/;
        if ((this.customerContactsInfo.maritalStatusCode !== this.dCode.maritalStatusCode.remarriage && this.customerContactsInfo.maritalStatusCode !== this.dCode.maritalStatusCode.married) && !value) {
          callback(new Error('请输入手机号码！'));
        } else if ((this.customerContactsInfo.maritalStatusCode !== this.dCode.maritalStatusCode.remarriage && this.customerContactsInfo.maritalStatusCode !== this.dCode.maritalStatusCode.married) && !valReg.test(value)) {
          callback(new Error('请正确的输入手机号码！'));
        } else {
          callback();
        }
      },
      // 验证非亲属关系其他说明
      checkNonRelationRuleRemark(rule, value, callback) {
        if ((this.customerNonRelation.relationshipCode === this.dCode.relationshipCode.other) && !value) {
          callback(new Error('请输入其他非亲属关系说明！'));
        } else {
          callback();
        }
      },
      // 申请金额 进一法
      changeNum() {
        if (parseInt(this.creditInfo.applicationSubmitAmt)) {
          this.creditInfo.applicationSubmitAmt = (Math.ceil(parseInt(this.creditInfo.applicationSubmitAmt) / 1000)) * 1000;
        }
      },
      // 验证申请请金额是否超过最大额度
      checkMostNum(rule, value, callback) {
        if ((value - 0) < 50000) {
          callback(new Error('申请金额不能低于50000！'));
        } else {
          callback();
        }
      },

      // 验证贷款用途
      checkLoanPurpose1(rule, value, callback) {
        if (!value) {
          callback(new Error('请选择贷款用途'));
        } else {
          callback();
        }
      },
      checkLoanPurpose2(rule, value, callback) {
        if (!value) {
          callback(new Error('请选择贷款用途'));
        } else {
          callback();
        }
      },
      checkloanOtherPurpose1(rule, value, callback) {
        var reg = /^[\u4E00-\u9FA5]+$/;
        if ((this.orgSpecialInfo1.loanPurposeCode === this.dCode.loanPurposeCode.other) && !value) {
          callback(new Error('请填写其他贷款用途说明'));
        } else if ((this.orgSpecialInfo1.loanPurposeCode === this.dCode.loanPurposeCode.other) && !reg.test(value)) {
          callback(new Error('只能输入汉字'));
        } else {
          callback();
        }
      },
      checkloanOtherPurpose2(rule, value, callback) {
        var reg = /^[\u4E00-\u9FA5]+$/;
        if ((this.orgSpecialInfo2.loanPurposeCode === this.dCode.loanPurposeCode.other) && !value) {
          callback(new Error('请填写其他贷款用途说明'));
        } else if ((this.orgSpecialInfo2.loanPurposeCode === this.dCode.loanPurposeCode.other) && !reg.test(value)) {
          callback(new Error('只能输入汉字'));
        } else {
          callback();
        }
      },
      getreportSource(code) {
        let name = '/';
        this.reportSourceCodeLibrary.forEach((v) => {
          if (code === v.itemCode) {
            name = v.itemDesc;
          }
        });
        return name;
      },

      // 特殊字段
      // 获取下拉特殊字段数据
      getSpecialApi(productId) {
        return new Promise(resolve => {
          this.$MyFetch.post(spareApi.solving.completeInfo.completeCustomerInfo.specialInfo, {
              applicationId: this.applicationId,
              productId: productId
            })
            .then(data => {
              resolve(data);
            })
            .catch(err => {
              this.confirmFn(err.message, 'error');
            });
        });
      },

      // 爬虫 - 授权状态
      getSpiderStatus() {
        this.$MyFetch
          .get(spareApi.solving.completeInfo.completeCustomerInfo.getSpiderStatus + this.applicationId)
          .then(data => {
            // console.log(data);
            this.spiderStatus = data;
          })
          .catch(err => {
            console.error(err);
            this.confirmFn(err.message, "error");
          });
      }
    },
    watch: {
      queryChannel(newVal) {
        if (!newVal) {
          return;
        }
        this.getQueryChannel();
      },
      queryOtherChannel(newVal) {
        if (!newVal) {
          return;
        }
        this.getQueryOtherChannel();
      },
      queryManagerChannel(newVal) {
        if (!newVal) {
          return;
        }
        this.getQueryManageChannel();
      }
    },
    components: {
      specialForm
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .complete-customer-info{
    .tab-box{
      margin-bottom: 20px;
      /deep/ .el-tabs__item {

        font-size: 16px;
        letter-spacing: 1px;
      }
    }
    /deep/.el-tabs__nav-wrap{
      border-bottom: 1px solid @line-color;
    }
    .more-message{
      padding-top: 20px;
      text-align: center;
      border-top: 1px solid @line-color;
      font-size: 14px;
      color: @blue-light;
      .el-icon-plus{
        font-weight: 900;
      }
    }
    .drop__select-box{
      vertical-align: top;
      .lab{
        padding: 0 0 10px;
        line-height: 17px;
        font-size: 12px;
        color: @font-gray;
        .icon__star{
          color: @red;
          margin-right: 5px;
        }
      }
    }
    .drop__select-box{
      position: relative;
      .button{
        position: relative;
        min-width: 100%;
        padding: 0 20px;
        line-height: 40px;
        border: 1px solid @line-color;
        text-align: left;
        background: none;
        color: @font-light;
        transition: all 0.3s;
        .icon{
          position:absolute;
          transform: rotateZ(180deg);
          right: 5px;
        }
      }
      .wrap{
        position: absolute;
        top: 70px;
        min-width: 100%;
        padding: 20px;
        border: 1px solid @line-color;
        border-radius: 4px;
        background: #fff;
        z-index: 10;
        font-size: 12px;
        .list{
          max-height: 220px;
          overflow-y: auto;
          .item{
            position: relative;
            padding-left: 60px;
            line-height: 60px;
            text-align: center;
            cursor: pointer;
            .num{
              position: absolute;
              left: 0;
              width: 60px;
              display: inline-block;

            }
          }
          .item:hover{
            background: @blue-hover;
          }
        }
      }
      .wrap /deep/ .el-input{
        max-width: 242px;
        margin-bottom: 20px;
      }
      .wrap /deep/ .el-select{
        width: 242px;
        margin-right: 10px;
      }
      .table__wrap-max{
        width: 710px;
      }
      .table__wrap-min{
        width: 466px;
      }
    }
    .drop__select-box .button.isactive{
      border-color: @blue-light;
      .icon{
        transform: rotateZ(0);
      }
    }
    .drop__select-box .button.disabled{
      background: #f5f7fa;
      cursor: not-allowed;
    }
  }
  .dialog-box__middle-1200{
    height: 442px;
    overflow-y: auto;
    margin: 0 20px;
    padding: 25px 30px;
    box-shadow:  0 1px 10px 0 rgba(0,0,0,0.05);
    .dialog-box__middle-top{
      padding: 20px 0;
      border-bottom: 1px solid  #E5E5E5;
      .title{
        font-size: 16px;
        .icon__gan{
          margin-right: 10px;
        }
      }
    }
  }
  .dialog-box__middle-form{
    height: 542px;
    overflow-y: auto;
    padding: 0 20px;
    .form__block{
      padding: 20px 30px;
      margin-bottom: 20px;
      box-shadow:  0 1px 10px 0 rgba(0,0,0,0.05);
      .dialog-box__middle-top{
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid  #E9E9E9;
        .title{
          font-size: 16px;
          .icon__gan{
            margin-right: 10px;
          }
        }
      }
      .message__list{
        .item{
          margin-right: 60px;
          padding-bottom: 20px;
          font-size: 0;
          .title{
            display: inline-block;
            margin-right: 5px;
            font-size: 14px;
            color: #666;
          }
          .content{
            font-size: 14px;
            display: inline-block;
          }
        }
        .item:last-child{
          margin-right: 0;
        }
      }
      .dialog-box__form__group{
        margin-right: -40px;
        font-size:0;
      }
    }
    .form__bottom{
      text-align: center;
      padding-bottom: 20px;
    }
  }
</style>
