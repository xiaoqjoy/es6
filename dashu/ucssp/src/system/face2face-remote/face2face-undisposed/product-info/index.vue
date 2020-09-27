<template>
  <div class="complete-product face2face-detail-style">
    <div class="dialog-box__middle-form">
      <el-form
        :model="creditInfo"
        ref="creditInfoForm"
        label-width="100px"
        class="demo-form-inline"
        label-position="top"
        :rules="creditInfoRule"
        :disabled="isDetail || !openVideo || ydApproveMode2"
      >
        <div class="form__block bg__white border__radius-5" >
          <div class="dialog-box__middle-top">
            <h5 class="title"><span class="icon icon__gan"></span>信用信息</h5>
          </div>
          <ul class="message__list clearfix">
            <li class="f__left item">
              <h5 class="title">最高申请额度：</h5>
              <p class="content">{{creditInfo.limitLoanAmt || 0}}</p>
            </li>
            <li class="f__left item">
              <h5 class="title">信用报告来源：</h5>
              <p
                class="content"
                v-for="item in reportSourceCodes"
                :key="item.itemCode"
                v-show="item.itemCode === creditInfo.reportSourceCode"
              >
                {{item.itemDesc}}
              </p>
            </li>
            <li class="f__left item">
              <h5 class="title">意向申请金额：</h5>
              <p class="content">{{creditInfo.applicationPurposeAmt || 0}}</p>
            </li>
          </ul>
          <div class="dialog-box__form__group">
            <el-form-item
              v-for="(item, index) in creditInfo.productCreditDetails"
              class="el-form-item__25"
              :key="index"
              :label="'产品'+(index+1)+'：'"
            >
              <el-input :value="item.productId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="申请金额(元)" prop="applicationSubmitAmt" class="el-form-item__25" >
              <el-input
                v-model="creditInfo.applicationSubmitAmt"
                placeholder="请填写申请金额"
                :disabled="isDetail || ydApproveMode2"
                @blur="changeNum"></el-input>
            </el-form-item>
          </div>
          <div class="dialog-box__table">
            <el-table
              :data="pricingList"
              border
              style="width: 100%"
              cell-class-name="dialog__table__td"
              header-cell-class-name="dialog__table__th"
              height="270px"
              highlight-current-row
              class="dialog__table"
            >
              <el-table-column prop="productName" label="" width="200"></el-table-column>
              <el-table-column prop="riskLevelDesc" label="评分等级" width="120"></el-table-column>
              <el-table-column prop="riskRateLevel" label="定价档次" width="200"></el-table-column>
              <el-table-column prop="pricingGrade" label="定价类型" width="200"></el-table-column>
              <el-table-column label="合作机构年化利率%（年）" width="200">
                <template slot-scope="scope">
                  <span v-if="scope.row.partnerAnnualRate !== null">{{scope.row.partnerAnnualRate  | rounding}}</span>
                </template>
              </el-table-column>
              <el-table-column label="担保费率%（月）" width="200">
                <template slot-scope="scope">
                  <span v-if="scope.row.guaranteeRate !== null">{{scope.row.guaranteeRate  | rounding2}}</span>
                </template>
              </el-table-column>
              <el-table-column label="评审费率%（一次性收取）" width="200">
                <template slot-scope="scope">
                  <span v-if="scope.row.reviewRate !== null">{{scope.row.reviewRate  | rounding2}}</span>
                </template>
              </el-table-column>
              <el-table-column label="保费费率%（一次性收取）" width="200">
                <template slot-scope="scope">
                  <span v-if="scope.row.premiumRate !== null">{{scope.row.premiumRate  | rounding2}}</span>
                </template>
              </el-table-column>
              <el-table-column label="咨询费率%（一次性收取）" width="200">
                <template slot-scope="scope">
                  <span v-if="scope.row.consultingRate !== null">{{scope.row.consultingRate  | rounding2}}</span>
                </template>
              </el-table-column>
              <el-table-column label="管理费率%（月）" width="200">
                <template slot-scope="scope">
                  <span v-if="scope.row.managementFeeRate !== null">{{scope.row.managementFeeRate  | rounding2}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-form>
    </div>
    <div class="dialog-box__middle-form">
      <el-form
        ref="productInfo"
        label-width="100px"
        class="demo-form-inline"
        label-position="top"
        :model="productInfo"
        :disabled="isDetail || !openVideo || ydApproveMode2"
      >
        <div v-if="isPro1 || isPro2 || cardInfoList.length > 0" class="dialog-box__middle-form">
          <div v-if="isPro1 || cardInfoList.length > 0" class="form__block bg__white border__radius-5">
            <div class="dialog-box__middle-top" v-if="Object.keys(orgSpecialInfo[0]).length !== 0">
              <h5 class="title"><span class="icon icon__gan"></span>特殊字段产品1</h5>
            </div>
            <div class="dialog-box__form__group margin-top__20">
              <el-form
                v-if="isPro1"
                ref="orgSpecialInfoForm0"
                label-width="100px"
                class="demo-form-inline"
                label-position="top"
                :model="orgSpecialInfo[0]"
                :rules="orgSpecialInfoRule0"
                :disabled="isDetail || !openVideo || ydApproveMode2"
              >
                <el-form-item label="借款人职业名称" prop="careerCode" class="el-form-item__25" >
                  <el-select v-model="orgSpecialInfo[0].careerCode" placeholder="请选择借款人职业名称" @change="orgSpecialInfoChange('careerCode', orgSpecialInfo[0].careerCode)">
                    <el-option v-for="item in carrerCodeLibrary" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <!-- 码表更改 -->
                <el-form-item label="借款人行业名称" prop="industryCode" class="el-form-item__25">
                  <!-- {{info.industryCode}} -->
                  <el-select v-model="orgSpecialInfo[0].industryCode" v-if="orgSpecialInfoArr.length > 0" placeholder="请选择借款人行业名称" @change="orgSpecialInfoChange('industryCode', orgSpecialInfo[0].industryCode)">
                    <el-option v-for="item in orgSpecialInfoArr[0].industryCodeLibrary" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                  <div v-else>没数据，请检查</div>
                </el-form-item>
                <!-- 码表更改 -->
                <el-form-item label="贷款用途" prop="loanPurposeCode" class="el-form-item__25">
                  <el-select v-model="orgSpecialInfo[0].loanPurposeCode" v-if="orgSpecialInfoArr.length > 0" placeholder="请选择贷款用途" @change="orgSpecialInfoChange('loanPurposeCode', orgSpecialInfo[0].loanPurposeCode, 0)">
                    <el-option v-for="item in orgSpecialInfoArr[0].loanPurposeCodes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                  <div v-else>没数据，请检查</div>
                </el-form-item>
                <el-form-item label="其他贷款用途说明" prop="loanOtherPurpose" class="el-form-item__25">
                  <el-input
                    maxlength="10"
                    :disabled="!(orgSpecialInfo[0].loanPurposeCode === dCode.loanPurposeCode.other || orgSpecialInfo[0].loanPurposeCode === dCode.loanPurposeCode.other1)"
                    v-model="orgSpecialInfo[0].loanOtherPurpose"
                    placeholder="请填写其他贷款用途说明" @blur="orgSpecialInfoChange('loanOtherPurpose', orgSpecialInfo[0].loanOtherPurpose)"></el-input>
                </el-form-item>
                <el-form-item label="贷款用途性质" prop="loanPurposeType" class="el-form-item__25" >
                  <el-select v-model="orgSpecialInfo[0].loanPurposeType" placeholder="请选择贷款用途性质" @change="clearValidateName(1)">
                    <el-option v-for="item in loanPurposeTypes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="还款方式" prop="repaymentModeCode" class="el-form-item__25">
                  <!-- <DQuerySelect
                    v-model="orgSpecialInfo[0].repaymentModeCode"
                    placeholder="请选择还款方式"
                    alias="repayment_mode_code"
                    :disabled="isDetail || !openVideo || ydApproveMode2"
                    :filterDict="(item) => repaymentModeFilter(item, orgSpecialInfo[0].productId)"
                    @change="orgSpecialInfoChange('repaymentModeCode', orgSpecialInfo[0].repaymentModeCode);onRepaymentModeCodeChange(0)">
                  </DQuerySelect> -->
                  <el-select
                    v-model="orgSpecialInfo[0].repaymentModeCode"
                    placeholder="请选择还款方式"
                    @change="orgSpecialInfoChange('repaymentModeCode', orgSpecialInfo[0].repaymentModeCode);onRepaymentModeCodeChange(0)">
                    <el-option
                      v-for="(item) in orgSpecialInfo[0].repaymentList"
                      :key="item.itemCode"
                      :label="item.itemDesc"
                      :value="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <!-- 码表更改 -->
                <el-form-item label="贷款期限" prop="loanTerm" class="el-form-item__25">
                  <el-select v-model="orgSpecialInfo[0].loanTerm" v-if="orgSpecialInfoArr.length > 0" placeholder="请选择贷款期限" @change="orgSpecialInfoChange('loanTerm', orgSpecialInfo[0].loanTerm)">
                    <el-option v-for="item in orgSpecialInfoArr[0].loanTerms" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                  <div v-else>没数据，请检查</div>
                </el-form-item>
                <el-form-item
                  v-if="orgSpecialInfo[0].repaymentModeCode === '6'"
                  label="摊还期限（月）"
                  prop="amortizationMonth"
                  class="el-form-item__25"
                >
                  <el-select :disabled="amortizationDisabled" v-model="orgSpecialInfo[0].amortizationMonth">
                    <el-option
                      v-for="item in orgSpecialInfoArr[0].amortizationMonthList"
                      :key="item.itemCode"
                      :label="item.itemDesc"
                      :value="parseInt(item.itemCode)"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="还款周期" prop="repaymentCycleCode" class="el-form-item__25">
                  <el-select v-model="orgSpecialInfo[0].repaymentCycleCode" placeholder="请选择还款周期" @change="orgSpecialInfoChange('repaymentCycleCode', orgSpecialInfo[0].repaymentCycleCode)">
                    <el-option v-for="item in repaymentCycleCodes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div class="more-message"></div>
              <special-form
                v-if="specialTemplate1.length > 0"
                :render-arr="specialTemplate1"
                form-name="formMore1"
                class="special-form"
                ref="formMore1"
                :isDetail="isDetail || !openVideo || ydApproveMode2"
                :set-value="specialData1"
              ></special-form>
              <div class="check-bank face2face-detail-style" v-if="isBank1">
                <div class="info-title-selectorBefore">
                  <span>ID1收款账户信息</span>
                </div>
                <el-form
                  ref="bankInfoForm0"
                  :model="cardInfoList[0]"
                  :rules="bankInfoRule"
                  label-width="100px"
                  class="demo-form-inline"
                  label-position="top"
                  :disabled="(isDetail || !openVideo)"
                  >
                  <div class="dialog-box__form__group">
                    <el-form-item label="支付方式" prop="paymentModeCode" class="el-form-item__33" >
                      <el-select
                        v-model="cardInfoList[0].paymentModeCode"
                        placeholder="请选择支付方式"
                        @change="changePaymentMode(0, cardInfoList[0].paymentModeCode)"
                      >
                        <el-option
                          v-for="(item, index) in paymentModeCodeLibrary"
                          :key="index"
                          :label="item.itemDesc"
                          :value="item.itemCode"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item :label="labelMap[0].accountNameLabel" prop="accountName" class="el-form-item__33" >
                      <el-input
                        maxlength="30"
                        v-model="cardInfoList[0].accountName"
                        placeholder="请填写收款账户户名"
                        :disabled="(cardInfoList[0].paymentModeCode === cardInfoList[0].paymentModeCodeOrigin && cardInfoList[0].validatedInd)&&!ydApproveMode2"
                        ></el-input>
                    </el-form-item>
                    <el-form-item :label="labelMap[0].accountNumLabel" prop="accountNum" class="el-form-item__33" >
                      <el-input
                        @change="changeAccountNum(0)"
                        v-model="cardInfoList[0].accountNum"
                        placeholder="请填写收款卡号/账户"
                        :disabled="(cardInfoList[0].paymentModeCode === cardInfoList[0].paymentModeCodeOrigin && cardInfoList[0].validatedInd)&&!ydApproveMode2"
                        ></el-input>
                    </el-form-item>
                    <div class="drop__select-box el-form-item__33">
                      <p class="lab"><span class="icon icon__star">*</span>{{labelMap[0].subbankNameLabel}}</p>
                      <DBankPicker
                        refName="bankForm0"
                        :disabled="(isDetail || !openVideo)"
                        :title="cardInfoList[0].subbankName"
                        :api="bankPickerApi"
                        :productId="cardInfoList[0].productId"
                        :applicationId="applicationId"
                        @click="currentIndex = 0"
                        @change="data => onRepayBankChange(data, 0)"></DBankPicker>
                    </div>
                    <el-form-item :label="labelMap[0].bankNameLabel" prop="bankName" class="el-form-item__33" >
                      <el-input v-model="cardInfoList[0].bankName" :disabled="true" placeholder="请填写收款行名称"></el-input>
                    </el-form-item>
                    <el-form-item :label="labelMap[0].subbankCodeLabel" prop="subbankCode" class="el-form-item__33">
                      <el-input v-model="cardInfoList[0].subbankCode" :disabled="true" placeholder="请填写开户行行号"></el-input>
                    </el-form-item>
                    <el-form-item :label="labelMap[0].mobileNumLabel" prop="mobileNum" class="el-form-item__33">
                      <el-input
                        v-model="cardInfoList[0].mobileNum"
                        placeholder="请填写预留手机号"
                        :disabled="(cardInfoList[0].paymentModeCode === cardInfoList[0].paymentModeCodeOrigin && cardInfoList[0].validatedInd)&&!ydApproveMode2"
                        ></el-input>
                    </el-form-item>
                    <el-form-item  class="el-form-item__33" style="margin-top: 25px;" v-if="!cardInfoList[0].validatedInd || (cardInfoList[0].paymentModeCode !== cardInfoList[0].paymentModeCodeOrigin && !isDetail) || ydApproveMode2">
                      <el-button class="width100 button-default" :loading="checkLoading" @click="checkBank(0)">验证</el-button>
                    </el-form-item>
                  </div>
                </el-form>
                <template v-if="cardInfoList[0].bindingModeCodeR === 'EP_C'">
                  <receive-account
                    v-if="cardInfoList[0].paymentModeCode === '1'"
                    ref="receiveAccount1"
                    :receiveAccountData="cardInfoList[0]"
                    :productId="cardInfoList[0].productId"
                    :applicationId="applicationId"
                    :disabled="(isDetail || !openVideo)"
                  ></receive-account>
                </template>
                <template v-else>
                  <repay-account
                    v-if="cardInfoList[0].showPayAccountInd"
                    ref="repayAccount1"
                    :repayAccountData="cardInfoList[0]"
                    :businessParms="businessParms1"
                    :disabledInd="(isDetail || !openVideo)">
                  </repay-account>
                </template>
              </div>
            </div>
          </div>
          <div class="form__block bg__white border__radius-5" v-if="(isPro2 || cardInfoList.length > 1) && !isXiuwen">
            <div class="dialog-box__middle-top" v-if="isPro2">
              <h5 class="title"><span class="icon icon__gan"></span>特殊字段产品2</h5>
            </div>
            <div class="dialog-box__form__group margin-top__20">
              <el-form
                :model="orgSpecialInfo[1]"
                v-if="isPro2"
                :rules="orgSpecialInfoRule1"
                ref="orgSpecialInfoForm1"
                label-width="100px"
                class="demo-form-inline" label-position="top"
                :disabled="isDetail || !openVideo || ydApproveMode2">
                <el-form-item label="借款人职业名称" prop="careerCode" class="el-form-item__25" >
                  <el-select v-model="orgSpecialInfo[1].careerCode" placeholder="请选择借款人职业名称" @change="orgSpecialInfoChange('careerCode', orgSpecialInfo[1].careerCode)">
                    <el-option v-for="item in carrerCodeLibrary" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <!-- 码表更改 -->
                <el-form-item label="借款人行业名称" prop="industryCode" class="el-form-item__25">
                  <!-- {{info.industryCode}} -->
                  <el-select v-model="orgSpecialInfo[1].industryCode" v-if="orgSpecialInfoArr.length > 1" placeholder="请选择借款人行业名称" @change="orgSpecialInfoChange('industryCode', orgSpecialInfo[1].industryCode)">
                    <el-option v-for="item in orgSpecialInfoArr[1].industryCodeLibrary" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                  <div v-else>没数据，请检查</div>
                </el-form-item>
                <!-- 码表更改 -->
                <el-form-item label="贷款用途" prop="loanPurposeCode" class="el-form-item__25">
                  <el-select v-model="orgSpecialInfo[1].loanPurposeCode" v-if="orgSpecialInfoArr.length > 1" placeholder="请选择贷款用途" @change="orgSpecialInfoChange('loanPurposeCode', orgSpecialInfo[1].loanPurposeCode, 1)">
                    <el-option v-for="item in orgSpecialInfoArr[1].loanPurposeCodes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                  <div v-else>没数据，请检查</div>
                </el-form-item>
                <el-form-item label="其他贷款用途说明" prop="loanOtherPurpose" class="el-form-item__25">
                  <el-input
                    maxlength="10"
                    :disabled="!(orgSpecialInfo[1].loanPurposeCode === dCode.loanPurposeCode.other || orgSpecialInfo[1].loanPurposeCode === dCode.loanPurposeCode.other1)"
                    v-model="orgSpecialInfo[1].loanOtherPurpose"
                    placeholder="请填写其他贷款用途说明" @blur="orgSpecialInfoChange('loanOtherPurpose', orgSpecialInfo[1].loanOtherPurpose)"></el-input>
                </el-form-item>
                <el-form-item label="贷款用途性质" prop="loanPurposeType" class="el-form-item__25" >
                  <el-select v-model="orgSpecialInfo[1].loanPurposeType" placeholder="请选择贷款用途性质" @change="clearValidateName(1)">
                    <el-option v-for="item in loanPurposeTypes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="还款方式" prop="repaymentModeCode" class="el-form-item__25">
                  <!-- <DQuerySelect
                    v-model="orgSpecialInfo[1].repaymentModeCode"
                    placeholder="请选择还款方式"
                    alias="repayment_mode_code"
                    :disabled="isDetail || !openVideo || ydApproveMode2"
                    :filterDict="(item) => repaymentModeFilter(item, orgSpecialInfo[1].productId)"
                    @change="orgSpecialInfoChange('repaymentModeCode', orgSpecialInfo[1].repaymentModeCode);onRepaymentModeCodeChange(1)">
                  </DQuerySelect> -->
                  <el-select
                    v-model="orgSpecialInfo[1].repaymentModeCode"
                    placeholder="请选择还款方式"
                    @change="orgSpecialInfoChange('repaymentModeCode', orgSpecialInfo[1].repaymentModeCode);onRepaymentModeCodeChange(1)">
                    <el-option
                      v-for="(item) in orgSpecialInfo[1].repaymentList"
                      :key="item.itemCode"
                      :label="item.itemDesc"
                      :value="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <!-- 码表更改 -->
                <el-form-item label="贷款期限" prop="loanTerm" class="el-form-item__25">
                  <el-select v-model="orgSpecialInfo[1].loanTerm" v-if="orgSpecialInfoArr.length > 1" placeholder="请选择贷款期限" @change="orgSpecialInfoChange('loanTerm', orgSpecialInfo[1].loanTerm)">
                    <el-option v-for="item in orgSpecialInfoArr[1].loanTerms" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                  <div v-else>没数据，请检查</div>
                </el-form-item>
                <el-form-item
                  v-if="orgSpecialInfo[1].repaymentModeCode === '6'"
                  label="摊还期限（月）"
                  prop="amortizationMonth"
                  class="el-form-item__25"
                >
                  <el-select :disabled="amortizationDisabled" v-model="orgSpecialInfo[1].amortizationMonth">
                    <el-option
                      v-for="item in orgSpecialInfoArr[1].amortizationMonthList"
                      :key="item.itemCode"
                      :label="item.itemDesc"
                      :value="parseInt(item.itemCode)"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="还款周期" prop="repaymentCycleCode" class="el-form-item__25">
                  <el-select v-model="orgSpecialInfo[1].repaymentCycleCode" placeholder="请选择还款周期" @change="orgSpecialInfoChange('repaymentCycleCode', orgSpecialInfo[1].repaymentCycleCode)">
                    <el-option v-for="item in repaymentCycleCodes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div class="more-message"></div>
              <special-form
                v-if="specialTemplate2.length > 0"
                :render-arr="specialTemplate2"
                form-name="formMore2"
                class="special-form"
                ref="formMore2"
                :isDetail="isDetail || !openVideo || ydApproveMode2"
                :set-value="specialData2"
              ></special-form>
              <div class="check-bank face2face-detail-style" v-if="isBank2">
                <div class="info-title-selectorBefore">
                  <span>ID2收款账户信息</span>
                </div>
                <el-form
                  ref="bankInfoForm1"
                  :model="cardInfoList[1]"
                  :rules="bankInfoRule"
                  label-width="100px"
                  class="demo-form-inline"
                  label-position="top"
                  :disabled="(isDetail || !openVideo)"
                  >
                  <div class="dialog-box__form__group">
                    <el-form-item label="支付方式" prop="paymentModeCode" class="el-form-item__33" >
                      <el-select
                        v-model="cardInfoList[1].paymentModeCode"
                        placeholder="请选择支付方式"
                        @change="changePaymentMode(1, cardInfoList[1].paymentModeCode)"
                        >
                        <el-option
                          v-for="(item, index) in paymentModeCodeLibrary"
                          :key="index"
                          :label="item.itemDesc"
                          :value="item.itemCode"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item :label="labelMap[1].accountNameLabel" prop="accountName" class="el-form-item__33" >
                      <el-input
                        maxlength="30"
                        v-model="cardInfoList[1].accountName"
                        placeholder="请填写收款账户户名"
                        :disabled="(cardInfoList[1].paymentModeCode === cardInfoList[1].paymentModeCodeOrigin && cardInfoList[1].validatedInd)&&!ydApproveMode2"
                        ></el-input>
                    </el-form-item>
                    <el-form-item :label="labelMap[1].accountNumLabel" prop="accountNum" class="el-form-item__33" >
                      <el-input
                        @change="changeAccountNum(1)"
                        v-model="cardInfoList[1].accountNum"
                        placeholder="请填写收款卡号/账户"
                        :disabled="(cardInfoList[1].paymentModeCode === cardInfoList[1].paymentModeCodeOrigin && cardInfoList[1].validatedInd)&&!ydApproveMode2"
                        ></el-input>
                    </el-form-item>
                    <div class="drop__select-box el-form-item__33">
                      <p class="lab"><span class="icon icon__star">*</span>{{labelMap[1].subbankNameLabel}}</p>
                      <DBankPicker
                        refName="bankForm1"
                        :disabled="(isDetail || !openVideo)"
                        :title="cardInfoList[1].subbankName"
                        :api="bankPickerApi"
                        :productId="cardInfoList[1].productId"
                        :applicationId="applicationId"
                        @click="currentIndex = 1"
                        @change="data => onRepayBankChange(data, 1)"></DBankPicker>
                    </div>
                    <el-form-item :label="labelMap[1].bankNameLabel" prop="bankName" class="el-form-item__33" >
                      <el-input v-model="cardInfoList[1].bankName" :disabled="true" placeholder="请填写收款行名称"></el-input>
                    </el-form-item>
                    <el-form-item :label="labelMap[1].subbankCodeLabel" prop="subbankCode" class="el-form-item__33">
                      <el-input v-model="cardInfoList[1].subbankCode" :disabled="true" placeholder="请填写开户行行号"></el-input>
                    </el-form-item>
                    <el-form-item :label="labelMap[1].mobileNumLabel" prop="mobileNum" class="el-form-item__33">
                      <el-input
                        v-model="cardInfoList[1].mobileNum"
                        placeholder="请填写预留手机号"
                        :disabled="(cardInfoList[1].paymentModeCode === cardInfoList[1].paymentModeCodeOrigin && cardInfoList[1].validatedInd)&&!ydApproveMode2"
                        ></el-input>
                    </el-form-item>
                    <el-form-item  class="el-form-item__33" style="margin-top: 25px;" v-if="!cardInfoList[1].validatedInd || (cardInfoList[1].paymentModeCode !== cardInfoList[1].paymentModeCodeOrigin && !isDetail) || ydApproveMode2">
                      <el-button class="width100 button-default" :loading="checkLoading" @click="checkBank(1)">验证</el-button>
                    </el-form-item>
                  </div>
                </el-form>
                <template v-if="cardInfoList[1].bindingModeCodeR === 'EP_C'">
                  <receive-account
                    v-if="cardInfoList[1].paymentModeCode === '1'"
                    ref="receiveAccount2"
                    :receiveAccountData="cardInfoList[1]"
                    :productId="cardInfoList[1].productId"
                    :applicationId="applicationId"
                    :disabled="(isDetail || !openVideo)"
                  ></receive-account>
                </template>
                <template v-else>
                  <repay-account
                    v-if="cardInfoList[1].showPayAccountInd"
                    ref="repayAccount2"
                    :repayAccountData="cardInfoList[1]"
                    :businessParms="businessParms2"
                    :disabledInd="(isDetail || !openVideo)">
                  </repay-account>
                </template>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <div class="form__bottom clearfix fixed-save" v-if="(!isDetail && openVideo) || ydApproveMode2">
      <el-button
        @click="submitCustomer(false)"
        class="width100 button-default">保存</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { baseApi } from "../../js/server.js";
import myRules from "@common/js/rules.js";
import specialForm from "./special_form";
import pagination from "@components/pagination";
import DBankPicker from '@components/DBankPicker';
import DQuerySelect from '@components/DQuerySelect';
import repayAccount from '@components/businessComponents/repayAccount';
import receiveAccount from '@components/businessComponents/receiveAccount';
import { mapGetters } from 'vuex';

export default {
  components: { specialForm, pagination, repayAccount, DBankPicker, receiveAccount, DQuerySelect },
  props: {
    // 详情传过来的申请编号
    applicationIdDetail: {
      type: String,
      default: ""
    },
    // 是否是详情，是的话则所有表单不可编辑
    isDetail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const labelName = {
      accountNameLabel: '收款账户名称',
      accountNumLabel: '收款卡号/账户',
      subbankNameLabel: '开户行',
      bankNameLabel: '收款行名称',
      subbankCodeLabel: '开户行行号',
      mobileNumLabel: '预留手机号'
    };
    return {
      amortizationDisabled: false,
      applicationMobileNum: '',
      businessParms1: {
        applicationId: this.applicationId,
        productId: '',
        paymentModeCode: ''
      },
      businessParms2: {
        applicationId: this.applicationId,
        productId: '',
        paymentModeCode: ''
      },
      // 易贷面核面签（除收款账户信息）不可编辑
      ydApproveMode2: false,
      labelMap: [labelName, labelName],
      bankPickerApi: baseApi.bankInfo.list,
      api: {},

      // 企业税 授权控制开关
      impowerFlag: false,
      // 获取授权按钮 状态
      queryImpowerBtnStatus: false,
      queryTax: true,
      // 授权结果数据
      openTaxInfoDg: false,
      // 税务数据接入机构下拉列表
      taxAgencyList: [],
      // 税务数据接入机构
      tlTaxOrganizationId: '',
      creditLevelList: [],

      productInfo: {
        insurancePolicyInd: false,
        estateInd: false,
        carLoanInd: false,
        organizationTaxInd: false
      },
      productInfoOrigin: "", // 产品信息序列化

      careerClass: {},

      insPaymentModeCodeLibrary: [], // 缴费方式字典
      insPaymentModeCodeClass: {},
      paymentModeCodeLibrary: [], // 支付方式字典
      certificate_type_codes: [], // 证件类型字典
      amortizationMonthList: [], // 摊还期限字典
      certificateClass: {},

      loading: null, // 加载中
      isSubmit: false, // 是否是点击提交面核

      pricingList: [], // 风险定价信息
      // 地区列表
      options: [],
      custId: '',
      reportSourceCodes: [], // 征信报告来源字典
      saveStatus: false,
      // 信用信息
      creditInfoOrigin: "",
      creditInfo: {
        applicationPurposeAmt: null,
        applicationSubmitAmt: null,
        limitLoanAmt: null,
        productCreditDetails: [],
        reportSourceCode: null
      },
      creditInfoRule: {
        applicationSubmitAmt: [
          { required: true, message: "请输入申请金额", trigger: "blur" },
          // { validator: this.checkMostNum, trigger: "blur" }, 0830的需求需要去掉50-70w的限制
          { validator: myRules.nonNegative, trigger: "blur" }
        ]
      },
      // 码值依赖
      dCode: this.$getCodeDependent(),

      carrerCodeLibrary: [], // 借款人职业名称字典
      loanPurposeTypes: [], // 贷款用途性质字典
      repaymentCycleCodes: [], // 还款周期字典
      repaymentModeCodes: [], // 还款方式字典

      // 收款卡信息列表
      cardInfoList: [
        {
          accountName: null, // 收款账户户名
          accountNum: null, // 收款卡号
          bankCode: null, // 收款行行号（没有返回）
          mobileNum: null, // 预留手机号码
          paymentModeCode: null, // 支付方式
          productId: null, // 产品ID
          subbankCode: null, // 开户行行号
          subbankName: null, // 开户行
          bankName: null, // 收款行名称
          showPayAccountInd: false,
          repaymentAccountName: '',
          repaymentAccountNum: '',
          repaymentBankCode: '',
          repaymentBankName: '',
          repaymentSubbankCode: '',
          repaymentMobileNum: '',
          repaymentSubbankName: '',
          repaymentCardInd: true,
          paymentModeCodeOrigin: null, // 初始化支付方式，用于判断支付方式是否修改
          dropSelectShow: false, // 开户行弹框的显示与隐藏
          // 银行查询信息
          bankInfo: {
            bankName: "", // 银行名称
            cityName: "", // 城市名称
            pageNum: 1, // 当前页
            pageSize: 10, // 每页个数
            total: 0, // 总数
            bankList: [] // 银行列表
          }
        },
        {
          accountName: null, // 收款账户户名
          accountNum: null, // 收款卡号
          bankCode: null, // 收款行行号（没有返回）
          mobileNum: null, // 预留手机号码
          paymentModeCode: null, // 支付方式
          productId: null, // 产品ID
          subbankCode: null, // 开户行行号
          subbankName: null, // 开户行
          bankName: null, // 收款行名称
          showPayAccountInd: false,
          repaymentAccountName: '',
          repaymentAccountNum: '',
          repaymentBankCode: '',
          repaymentBankName: '',
          repaymentSubbankCode: '',
          repaymentMobileNum: '',
          repaymentSubbankName: '',
          repaymentCardInd: true,
          paymentModeCodeOrigin: null, // 初始化支付方式，用于判断支付方式是否修改
          dropSelectShow: false, // 开户行弹框的显示与隐藏
          // 银行查询信息
          bankInfo: {
            bankName: "", // 银行名称
            cityName: "", // 城市名称
            pageNum: 1, // 当前页
            pageSize: 10, // 每页个数
            total: 0, // 总数
            bankList: [] // 银行列表
          }
        }
      ],
      cardInfoListOrigin: "",

      // 特殊字段
      orgSpecialInfo: [
        {
          applicationId: null,
          careerCodde: null,
          careerName: null,
          industryCode: null,
          industryName: null,
          loanOtherPurpose: null,
          loanPurposeCode: null,
          loanPurposeType: null,
          loanTerm: null,
          orgSpecialFieldList: [],
          productId: null,
          repaymentCycleCode: null,
          repaymentModeCode: null,
          sortNum: null,
          bankInfo: {
            bankName: "", // 银行名称
            cityName: "", // 城市名称
            pageNum: 1, // 当前页
            pageSize: 10, // 每页个数
            total: 0, // 总数
            bankList: [] // 银行列表
          }
        },
        {
          applicationId: null,
          careerCodde: null,
          careerName: null,
          industryCode: null,
          industryName: null,
          loanOtherPurpose: null,
          loanPurposeCode: null,
          loanPurposeType: null,
          loanTerm: null,
          orgSpecialFieldList: [],
          productId: null,
          repaymentCycleCode: null,
          repaymentModeCode: null,
          sortNum: null,
          bankInfo: {
            bankName: "", // 银行名称
            cityName: "", // 城市名称
            pageNum: 1, // 当前页
            pageSize: 10, // 每页个数
            total: 0, // 总数
            bankList: [] // 银行列表
          }
        }
      ],
      orgSpecialInfoArr: [{}, {}],
      orgSpecialInfoOrigin: "", // 特殊字段，用于记录用户是否修改，切换到别的地方判断是否修改，修改则提示先保存，否则则继续

      orgSpecialInfoRule0: {
        careerCode: [
          { required: true, message: "请选择借款人职业", trigger: "change" }
        ],
        industryCode: [
          { required: true, message: "请选择借款人行业", trigger: "change" }
        ],
        loanTerm: [
          { required: true, message: "请选择借款期限", trigger: "change" }
        ],
        loanPurposeType: [
          { required: true, message: '请选择贷款用途性质', trigger: 'change' }
        ],
        loanPurposeCode: [
          { required: true, message: '请选择贷款用途', trigger: 'change' }
        ],
        loanOtherPurpose: [
          { validator: this.checkloanOtherPurpose0, trigger: "blur" }
        ],
        repaymentCycleCode: [
          { required: true, message: "请选还款周期", trigger: "change" }
        ],
        repaymentModeCode: [
          { required: true, message: "请选还款方式", trigger: "change" }
        ]
      },
      orgSpecialInfoRule1: {
        careerCode: [
          { required: true, message: "请选择借款人职业", trigger: "change" }
        ],
        industryCode: [
          { required: true, message: "请选择借款人行业", trigger: "change" }
        ],
        loanTerm: [
          { required: true, message: "请选择借款期限", trigger: "change" }
        ],
        loanPurposeType: [
          { required: true, message: '请选择贷款用途性质', trigger: 'change' }
        ],
        loanPurposeCode: [
          { required: true, message: '请选择贷款用途', trigger: 'change' }
        ],
        loanOtherPurpose: [
          { validator: this.checkloanOtherPurpose1, trigger: "blur" }
        ],
        repaymentCycleCode: [
          { required: true, message: "请选还款周期", trigger: "change" }
        ],
        repaymentModeCode: [
          { required: true, message: "请选还款方式", trigger: "change" }
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
      templateVersionId1: "",
      templateVersionId2: "",

      bankInfoRule: {
      paymentModeCode: [
        { required: true, message: "请选择支付方式", trigger: "change" }
      ],
      accountName: [
        { required: true, message: "请填写账户名", trigger: "blur" },
        { validator: myRules.nameRule, trigger: 'blur' }
      ],
      accountNum: [
        { required: true, message: "请填写收款卡号/账户", trigger: "blur" },
        { validator: (rule, value, callback) => {
              let val = value.replace(/\s/g, '');
              if (val.length < 10 || val.length > 20) {
                return callback(new Error('长度限制为 10 到 20 位！'));
              } else {
                return callback();
              }
            },
              trigger: 'blur' }
      ],
      bankName: [
        { required: true, message: "选择开户行后自动带出", trigger: 'change' }
      ],
      subbankCode: [
        { required: true, message: "选择开户行后自动带出", trigger: 'change' }
      ],
      mobileNum: [
        { required: true, message: "请填写预留手机号", trigger: "blur" },
        { validator: myRules.phoneRule, trigger: "blur" }
      ]
    },
    bankRule: {
      bankName: [
        { required: true, message: "请输入银行名称", trigger: "blur" }
      ],
      cityName: [{ required: true, message: "请输入城市", trigger: "blur" }]
    },
    checkLoading: false // 验证加载
    };
  },
  filters: {
    // 特殊产品字段返回
    orgSpecialInfoFilter(val) {
      let arr = ["一", "二", "三", "四", "五"];
      return "特殊字段产品" + arr[val];
    },
    rounding (value) {
      return value.toFixed(6);
    },
    rounding2 (value) {
      return value.toFixed(2);
    }
  },
  created() {
    const { applicationId, ydApproveMode2 } = this.$route.query;
    // 获取申请编号。this.applicationIdDetail存在，则说明是从组件过来的，否则是从路由过来的
    this.applicationId = (this.applicationIdDetail ? this.applicationIdDetail : applicationId);
    this.ydApproveMode2 = ydApproveMode2;
    if (typeof ydApproveMode2 === 'string') {
      this.ydApproveMode2 = ydApproveMode2 === 'true';
    }
    this.api = (this.isDetail ? baseApi.processed : baseApi.pending);
    this.loading = this.$loading({ text: "", spinner: "", background: 'transparent' });

    this.getAreaList()
      .then(() => {
        this.getAllInfo();
      })
      .catch((e) => {
        console.log(e);
        this.loading.close();
      });
    // 监听保存事件，由父路由触发
    window.eventBus.$on("productinfo", () => {
      this.submitCustomer(true);
      this.isSubmit = true;
    });
  },
  methods: {
    repaymentModeFilter(item, productId) {
      if (item.itemCode === '6') {
        return productId === 'P20200513000001'; // 只有华夏太保易贷产品有'气球贷'选项
      }
      return true;
    },
    onRepaymentModeCodeChange(index) {
      if (this.orgSpecialInfo[index].repaymentModeCode === '6' &&
          this.orgSpecialInfo[index].productId === 'P20200513000001') {
        this.orgSpecialInfo[index].amortizationMonth = 60;
        this.amortizationDisabled = true;
      } else {
        this.orgSpecialInfo[index].amortizationMonth = null;
        this.amortizationDisabled = false;
      }
    },
    clearValidateName(index) {
      if (this.$refs['formMore' + index]) {
        this.$refs['formMore' + index].$refs['formMore' + index].clearValidate(['jnyh_operator_name', 'jnyh_three_certificate_code']);
      }
    },
    changePaymentMode(type, _val) {
      const {accountName, accountNum, mobileNum, otherMobileNum, ownMobileNum} = JSON.parse(this.cardInfoListOrigin)[type];
        this.cardInfoList[type].accountName = accountName;
        this.cardInfoList[type].accountNum = accountNum;
        this.cardInfoList[type].mobileNum = mobileNum;
        this.$refs['bankInfoForm' + type].clearValidate(['accountName', 'accountNum', 'mobileNum']);
        if (this.cardInfoList[type].repaymentCardInd) {
          this[`businessParms${type + 1}`].paymentModeCode = _val;
          this.cardInfoList[type].showPayAccountInd = _val === '1';
        }
        this.cardInfoList[type].mobileNum = _val === '1' ? otherMobileNum : ownMobileNum;
        // if (this.cardInfoList[type].showPayAccountInd || this.cardInfoList[type].bindingModeCodeR === 'EP_C') {
        // }
    },
    // 获取全部数据
    getAllInfo() {
      this.getCreditInfo(); // 信用信息
      this.getPricingInfo(); // 风险信息
      this.getBankInfo() // 收款账户信息
        .then(() => {
          this.getSpecialInfo(); // 特殊字段产品
        })
        .catch((e) => {
          this.loading.close();
        });

      // 获取信用报告来源字典
      this.$getDictCode("report_source_code", {getAll: this.isDetail}).then(res => {
        this.reportSourceCodes = res;
      });
      // 获取支付方式字典
      this.$getDictCode("payment_mode_code", {getAll: this.isDetail}).then(data => {
        this.paymentModeCodeLibrary = data;
      });
      // 获取摊还期限字典
      // this.$getDictCode("amortization_month", {getAll: this.isDetail}).then(res => {
      //   this.amortizationMonthList = res;
      // });
      // 获取证件类型字典
      this.$getDictCode("certificate_type_code", {getAll: this.isDetail}).then(res => {
        this.certificate_type_codes = res;
        res.forEach((v) => {
          this.$set(this.certificateClass, v.itemCode, v.itemDesc);
        });
      });
      // 获取借款人职业名称字典
      this.$getDictCode("career_code", {getAll: this.isDetail}).then(res => {
        this.carrerCodeLibrary = res;
        res.forEach(v => {
          this.$set(this.careerClass, v.itemCode, v.itemDesc);
        });
      });
      // 获取贷款用途性质字典
      this.$getDictCode("loan_purpose_type", {getAll: this.isDetail}).then(res => {
        this.loanPurposeTypes = res;
      });
      // 获取还款周期字典
      this.$getDictCode("repayment_cycle_code", {getAll: this.isDetail}).then(res => {
        this.repaymentCycleCodes = res;
      });
      // 获取还款方式字典
      this.$getDictCode("repayment_mode_code", {getAll: this.isDetail}).then(res => {
        this.repaymentModeCodes = res;
      });
    },
    getBankInfo() {
      const map = {
        accountNameLabel: '绑定电子户的实体卡户名',
        accountNumLabel: '绑定电子户的实体卡卡号/账号',
        subbankNameLabel: '绑定电子户的实体卡开户行',
        bankNameLabel: '绑定电子户的实体卡银行名称',
        subbankCodeLabel: '绑定电子户的实体卡银行行号',
        mobileNumLabel: '绑定电子户的实体卡预留手机号'
      };
      return this.$MyFetch
        .post(this.api.getBankCards + this.applicationId)
        .then(data => {
          data = data || {};
          let cards = [{}, {}];
          data.bankCardInfoList.forEach((item, index) => {
            let form = `bankInfoForm${item.sortNum}`;
            item.paymentModeCodeOrigin = item.paymentModeCode;
            item.dropSelectShow = false;
            // 银行信息
            item.bankInfo = {
              bankName: "",
              cityName: "",
              pageNum: 1,
              pageSize: 10,
              total: 0,
              bankList: []
            };
            cards[item.sortNum - 1] = item;
            // if (item.repaymentCardInd || item.bindingModeCodeR === 'EP_C') {
            //   }
            item.otherMobileNum = '';
            item.ownMobileNum = item.mobileNum || data.applicationMobileNum;
            if (item.showElectronicAccountDescInd) {
              this.labelMap[index] = map;
              item.otherMobileNum = data.applicationMobileNum;
              item.ownMobileNum = data.applicationMobileNum;
            }
            if (item.paymentModeCode === '0') {
              item.mobileNum = item.mobileNum === '' ? '' : item.mobileNum || data.applicationMobileNum;
              item.ownMobileNum = item.mobileNum === '' ? '' : item.mobileNum;
            }
            if (item.paymentModeCode === '1') {
              item.mobileNum = item.mobileNum || '';
              item.otherMobileNum = item.mobileNum || '';
              item.ownMobileNum = '';
              if (item.showElectronicAccountDescInd) {
                item.ownMobileNum = data.applicationMobileNum;
                item.ownMobileNum = item.mobileNum === '' ? '' : item.mobileNum || data.applicationMobileNum;
              }
            }
            // if (!(item.repaymentCardInd || item.bindingModeCodeR === 'EP_C')) {
            //   item.mobileNum = item.mobileNum || data.applicationMobileNum;
            // }
            // 已处理页面不需要
            if (!this.isDetail) {
              this[`businessParms${item.sortNum}`].productId = item.productId;
              this[`businessParms${item.sortNum}`].applicationId = this.applicationId;
              this[`businessParms${item.sortNum}`].paymentModeCode = item.paymentModeCode;
            }
            if (item.repaymentCardInd && item.paymentModeCode === '1') {
              item.showPayAccountInd = true;
            }
            this.$nextTick(() => {
              this.$refs[form].clearValidate();
            });
          });
          this.cardInfoList = cards;
          // this.cardInfoList.splice(0, data.bankCardInfoList.length, ...data.bankCardInfoList);
          this.applicationMobileNum = data.applicationMobileNum;

          // ========================= 记录是否修改数据 =====================
          this.cardInfoListOrigin = JSON.stringify(this.cardInfoList);

          // 记录收款账户信息管理的修改数据，不为空则初始化
          // if (this.checkTabsInfo.cardInfoList) {
          //   this.cardInfoList = this.checkTabsInfo.cardInfoList;
          // }
        })
        .catch(err => {
          console.log(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 申请金额 进一法
    changeNum() {
      if (parseInt(this.creditInfo.applicationSubmitAmt)) {
        this.creditInfo.applicationSubmitAmt =
          Math.ceil(parseInt(this.creditInfo.applicationSubmitAmt) / 1000) *
          1000;
      }
    },
    // 验证申请请金额是否少于最小额度
    checkMostNum(rule, value, callback) {
      if ((value - 0) < 50000) {
        callback(new Error('申请金额不能低于50000！'));
      } else {
        callback();
      }
    },

    // ====================================================== 特殊字段验证 ======================================================
    checkloanPurposeType0(rule, value, callback) {
      let index = 0;

      // 若不为贷款用途性质不为消费，则清空其他贷款用途说明
      if (this.orgSpecialInfo[index].loanPurposeType !== this.dCode.loanPurposeType.consumption) {
        this.orgSpecialInfo[index].loanOtherPurpose = "";
      }
      this.$refs['orgSpecialInfoForm' + index].validateField('loanOtherPurpose');

      if (!value) {
        callback(new Error("请选择贷款用途性质"));
      } else {
        callback();
      }
    },
    checkloanPurposeType1(rule, value, callback) {
      let index = 1;

      // 若不为贷款用途性质不为消费，则清空其他贷款用途说明
      if (this.orgSpecialInfo[index].loanPurposeType !== this.dCode.loanPurposeType.consumption) {
        this.orgSpecialInfo[index].loanOtherPurpose = "";
      }
      this.$refs['orgSpecialInfoForm' + index].validateField('loanOtherPurpose');

      if (!value) {
        callback(new Error("请选择贷款用途性质"));
      } else {
        callback();
      }
    },
    checkLoanPurpose0(rule, value, callback) {
      let index = 0;

      // 若不为贷款用途不为其他，则清空其他贷款用途说明
      if (this.orgSpecialInfo[index].loanPurposeCode !== this.dCode.loanPurposeCode.other && this.orgSpecialInfo[index].loanPurposeCode !== this.dCode.loanPurposeCode.other1) {
        this.orgSpecialInfo[index].loanOtherPurpose = "";
      }
      this.$refs['orgSpecialInfoForm' + index].validateField('loanOtherPurpose');

      if (!value) {
        callback(new Error("请选择贷款用途"));
      } else {
        callback();
      }
    },
    checkLoanPurpose1(rule, value, callback) {
      let index = 1;

      // 若不为贷款用途不为其他，则清空其他贷款用途说明
      if (this.orgSpecialInfo[index].loanPurposeCode !== this.dCode.loanPurposeCode.other && this.orgSpecialInfo[index].loanPurposeCode !== this.dCode.loanPurposeCode.other1) {
        this.orgSpecialInfo[index].loanOtherPurpose = "";
      }
      this.$refs['orgSpecialInfoForm' + index].validateField('loanOtherPurpose');

      if (!value) {
        callback(new Error("请选择贷款用途"));
      } else {
        callback();
      }
    },
    checkloanOtherPurpose0(rule, value, callback) {
      let index = 0;

      const valReg = /^[\u4e00-\u9fa5]{1,10}$/;
      if (
        (this.orgSpecialInfo[index].loanPurposeCode === this.dCode.loanPurposeCode.other || this.orgSpecialInfo[index].loanPurposeCode === this.dCode.loanPurposeCode.other1) && !value
      ) {
        callback(new Error("请填写其他贷款用途说明"));
      } else if (
        (this.orgSpecialInfo[index].loanPurposeCode === this.dCode.loanPurposeCode.other || this.orgSpecialInfo[index].loanPurposeCode === this.dCode.loanPurposeCode.other1) && !valReg.test(value)
      ) {
        callback(new Error("只能输入汉字"));
      } else {
        callback();
      }
    },
    checkloanOtherPurpose1(rule, value, callback) {
      let index = 1;

      const valReg = /^[\u4e00-\u9fa5]{1,10}$/;
      if (
        (this.orgSpecialInfo[index].loanPurposeCode === this.dCode.loanPurposeCode.other || this.orgSpecialInfo[index].loanPurposeCode === this.dCode.loanPurposeCode.other1) && !value
      ) {
        callback(new Error("请填写其他贷款用途说明"));
      } else if (
        (this.orgSpecialInfo[index].loanPurposeCode === this.dCode.loanPurposeCode.other || this.orgSpecialInfo[index].loanPurposeCode === this.dCode.loanPurposeCode.other1) && !valReg.test(value)
      ) {
        callback(new Error("只能输入汉字"));
      } else {
        callback();
      }
    },
    // 修改产品1，产品2也同步修改，反之亦然
    orgSpecialInfoChange(key, value, index) {
      if (key !== 'loanPurposeCode') {
        return;
      }
      if (key === 'loanPurposeCode' && value !== '020') {
        this.orgSpecialInfo[index].loanOtherPurpose = "";
      }
    },

    // 特殊字段
    // 获取下拉特殊字段数据
    getSpecialApi(productId) {
      return new Promise(resolve => {
        this.$MyFetch
          .post(baseApi.completeCustomerInfo.specialInfo, {
            applicationId: this.applicationId,
            productId: productId
          })
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            this.confirmFn(err.message, "error");
          });
      });
    },
    getPricingInfo() {
      this.$MyFetch
        .get(this.api.getPricingInfo + this.applicationId)
        .then((data) => {
          data = data || [];
          this.pricingList = data;
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    getCreditInfo() {
      this.$MyFetch
        .get(this.api.getCreditInfo + this.applicationId)
        .then((data) => {
          data = data || {};
          this.custId = data.custId;
          this.creditInfo = data;
          this.creditInfoOrigin = JSON.stringify(this.creditInfo);
        });
    },
    getSpecialInfo() {
      this.$MyFetch
        .get(this.api.getSpecialInfo + this.applicationId)
        .then(async (data) => {
          this.loading.close();
          data = data || [];
          let orgs = [{}, {}];
          data.forEach((product) => {
            if (product.sortNum === 1) {
              orgs[0] = product;
            } else {
              orgs[1] = product;
            }
          });
          this.orgSpecialInfo = orgs;
          // 特殊字段1
          if (Object.keys(orgs[0]).length !== 0) {
            this.templateVersionId1 = this.orgSpecialInfo[0].templateVersionId;
            // 依据所选产品调用对应动态表单模板1
            if (this.orgSpecialInfo[0].orgSpecialFieldList) {
              this.orgSpecialInfo[0].orgSpecialFieldList.forEach(v => {
                this.$set(this.specialData1, v.orgItemCode, v.orgItemVal);
              });
            }
            let repaymentList = await this.$getOrgSpecial('repaymentMode', this.applicationId, this.orgSpecialInfo[0].productId);
            // let arry = repaymentList.filter((item) => {
            //   return this.repaymentModeFilter(item, data.orgSpecialInfo[0].productId);
            // });
            this.$set(this.orgSpecialInfo[0], 'repaymentList', repaymentList);
            this.getSpecialApi(this.orgSpecialInfo[0].productId)
              .then(res => {
                this.specialTemplate1 = [...res.orgSpecialColumnList];
              })
              .catch(err => {
                this.confirmFn(err.message, "error");
              });
          }
          // 特殊字段2
          if (Object.keys(orgs[1]).length !== 0) {
            this.templateVersionId2 = this.orgSpecialInfo[1].templateVersionId;
            // 依据所选产品调用对应动态表单模板2
            if (this.orgSpecialInfo[1].orgSpecialFieldList) {
              this.orgSpecialInfo[1].orgSpecialFieldList.forEach(v => {
                this.$set(this.specialData2, v.orgItemCode, v.orgItemVal);
              });
            }
            let repaymentList = await this.$getOrgSpecial('repaymentMode', this.applicationId, this.orgSpecialInfo[1].productId);
            // let arry = repaymentList.filter((item) => {
            //   return this.repaymentModeFilter(item, data.orgSpecialInfo[1].productId);
            // });
            this.$set(this.orgSpecialInfo[1], 'repaymentList', repaymentList);
            this.getSpecialApi(this.orgSpecialInfo[1].productId)
              .then(res => {
                this.specialTemplate2 = [...res.orgSpecialColumnList];
              })
              .catch(err => {
                this.confirmFn(err.message, "error");
              });
          }

          // 获取特殊字段产品字典公共接口
          // 用一个异步函数嵌套多个异步函数，然后添加到一个数组里面进行并行加载
          let fun = async (item, index) => {
            let industryCodeLibrary = await this.$getOrgSpecial("industryCode", this.applicationId, item.productId);
            let industryClass = {};
            industryCodeLibrary.forEach(item => {
              this.$set(industryClass, item.itemCode, item.itemDesc);
            });
            let loanPurposeCodes = await this.$getOrgSpecial("loanPurposeCode", this.applicationId, item.productId);
            let loanTerms = await this.$getOrgSpecial("loanTerm", this.applicationId, item.productId);
            let amortizationMonthList = await this.$getOrgSpecial("amortizationMonth", this.applicationId, item.productId);
            if (!(amortizationMonthList instanceof Array)) {
              this.confirmFn('数据格式不对', 'error');
              return;
            }
            amortizationMonthList.sort((itemA, itemB) => {
              return parseInt(itemB.itemCode) - parseInt(itemA.itemCode);
            });
            this.orgSpecialInfoArr.splice(index, 1, {industryCodeLibrary, loanPurposeCodes, loanTerms, industryClass, amortizationMonthList});
          };

          let arr = [];
          this.orgSpecialInfo.forEach((item, index) => {
            if (item.productId) {
              arr.push(fun(item, index));
            }
          });
          await Promise.all(arr); // 并行处理多个异步请求

          // 特殊字段数据
          this.orgSpecialInfoOrigin = JSON.stringify(this.orgSpecialInfo);
        })
        .catch((err) => {
          console.log(err);
          this.loading.close();
        });
    },
    checkFormValid(_name) {
      let flag = true;
      if (this.$refs[_name]) {
        this.$refs[_name].validate((_valid) => {
          flag = _valid;
        });
      }
      return flag;
    },
    // 提交主表单值
    submitCustomer(_flag) {
      let flag = true;
      // 信用信息检验
      this.$refs.creditInfoForm.validate(valid => {
        if (!valid) {
          flag = false;
        }
      });
      // 特殊字段1校验
      if (this.isPro1) {
        this.$refs.orgSpecialInfoForm0.validate(valid => {
          if (!valid) {
            flag = false;
          }
        });
      }
      if (this.isBank1) {
        this.$refs.bankInfoForm0.validate(valid => {
          if (!valid) {
            flag = false;
          }
        });
        if (this.$refs.repayAccount1 && this.$refs.repayAccount1.$refs.repayAccountForm) {
          this.$refs.repayAccount1.$refs.repayAccountForm.validate(valid => {
            if (!valid) {
              flag = false;
            }
          });
        }
        if (this.$refs.receiveAccount1 && this.$refs.receiveAccount1.$refs.receiveAccountForm) {
          this.$refs.receiveAccount1.$refs.receiveAccountForm.validate(valid => {
            if (!valid) {
              flag = false;
            }
          });
        }
      }
      if (this.$refs.formMore1) {
        this.$refs.formMore1.validate(valid => {
          if (!valid) {
            flag = false;
          }
        });
      }
      // 特殊字段2校验
      if (this.isPro2 && !this.isXiuwen) {
        this.$refs.orgSpecialInfoForm1.validate(valid => {
          if (!valid) {
            flag = false;
          }
        });
      }
      if (this.isBank2 && !this.isXiuwen) {
        this.$refs.bankInfoForm1.validate(valid => {
          if (!valid) {
            flag = false;
          }
        });
        if (this.$refs.repayAccount2 && this.$refs.repayAccount2.$refs.repayAccountForm) {
          this.$refs.repayAccount2.$refs.repayAccountForm.validate(valid => {
            if (!valid) {
              flag = false;
            }
          });
        }
          if (this.$refs.receiveAccount2 && this.$refs.receiveAccount2.$refs.receiveAccountForm) {
            this.$refs.receiveAccount2.$refs.receiveAccountForm.validate(valid => {
              if (!valid) {
                flag = false;
              }
            });
          }
      }
      if (this.$refs.formMore2 && !this.isXiuwen) {
        this.$refs.formMore2.validate(valid => {
          if (!valid) {
            flag = false;
          }
        });
      }
      let orgSpecialInfo = this.$lodash.cloneDeep(this.orgSpecialInfo);
      // 产品一动态字段
      // 传产品id
      if (this.specialTemplate1.length > 0) {
        // 版本号
        orgSpecialInfo[0].templateVersionId = this.templateVersionId1;
        orgSpecialInfo[0].orgSpecialFieldList = [];
        Object.keys(this.$refs.formMore1.formData).forEach(key => {
          if (key.indexOf('_cascader') !== -1) {
            return;
          }
          let obj = {};
          obj.orgItemCode = key;
          obj.orgItemVal = this.$refs.formMore1.formData[key];
          orgSpecialInfo[0].orgSpecialFieldList.push(obj);
        });
      }

      // 产品二不一定存在,需要先判断
      if (this.specialTemplate2.length > 0 && !this.isXiuwen) {
        // 版本号
        orgSpecialInfo[1].templateVersionId = this.templateVersionId2;
        orgSpecialInfo[1].orgSpecialFieldList = [];
        Object.keys(this.$refs.formMore2.formData).forEach(key => {
          if (key.indexOf('_cascader') !== -1) {
            return;
          }
          let obj = {};
          obj.orgItemCode = key;
          obj.orgItemVal = this.$refs.formMore2.formData[key];
          orgSpecialInfo[1].orgSpecialFieldList.push(obj);
        });
      }
      let bankCardInfoList = [...this.cardInfoList];
      if (!this.isBank2) {
        bankCardInfoList.splice(1, 1);
      }
      if (!this.isBank1) {
        bankCardInfoList.splice(0, 1);
      }
      let orgSpecial = [...orgSpecialInfo];

      // 添加行业名与职业名给后端用
      this.orgSpecialInfoArr.forEach((item, index) => {
        if (orgSpecial[index].careerCode) {
          orgSpecial[index].careerName = this.careerClass[orgSpecial[index].careerCode];
          orgSpecial[index].industryName = item.industryClass[orgSpecial[index].industryCode];
        }
      });

      if (!this.isPro2) {
        orgSpecial.splice(1, 1);
      }
      if (!this.isPro1) {
        orgSpecial.splice(0, 1);
      }
      // 获取话术库内容，保存接口不做校验
      let speechOptionMap = Object.assign({}, this.$store.getters.speechOptionMap);
      let data = {
        applicationId: this.applicationId,
        applicationSubmitAmt: this.creditInfo.applicationSubmitAmt,
        bankCardInfoList,
        custId: this.custId,
        orgSpecial,
        faceCheckOpinion: speechOptionMap.remark,
        opinionCheckStateList: speechOptionMap.optionList
      };
      if (flag) {
        this.submitCustomerApi(data, _flag);
      } else {
        this.confirmFn("字段未填写完整", "error");
      }
    },
    submitCustomerApi(data, _flag) {
      let loading = this.$loading({
        text: "",
        spinner: "",
        background: 'transparent'
      });
      this.$MyFetch
        .post(baseApi.saveProductInfo, data)
        .then(() => {
          loading.close();
          // 调用父组件的方法，进行提交面核操作
          if (_flag) { // 判断是否是提交面核操作true或者保存操作false
            window.eventBus.$emit('remote_faceCheck_submitStopVideo');
            this.isSubmit = false;
          } else {
            this.confirmFn("保存成功！", "success");
            this.getBankInfo();
            this.saveStatus = false;
          }

          this.$emit("next-step");

          // 保存之后还原修改数据
          this.creditInfoOrigin = JSON.stringify(this.creditInfo);
          this.productInfoOrigin = JSON.stringify(this.productInfo);
          this.orgSpecialInfoOrigin = JSON.stringify(this.orgSpecialInfo);
          this.cardInfoListOrigin = JSON.stringify(this.cardInfoList);
        })
        .catch(err => {
          loading.close();
          this.confirmFn(err.message, "error");
        });
    },
    // 收款卡号/账户事件
    changeAccountNum(index) {
      this.cardInfoList[index].accountNum = this.cardInfoList[index].accountNum
        .replace(/\s/g, "")
        .replace(/[^\d]/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ");
    },
    // 获取地区列表值
    getAreaList() {
      return this.getArea({getAll: this.isDetail}).then(data => {
        this.options = data;
        // this.getInfo(this.applicationId);
      });
    },
    // 改变地区列表
    changeAreaList(data, arr) {
      data.forEach(v => {
        let obj = {};
        for (let key in v) {
          if (key !== "children") {
            obj.value = key;
            obj.label = v[key];
          }
        }
        arr.push(obj);
        if (v.children) {
          arr[arr.length - 1].children = [];
          this.changeAreaList(v.children, arr[arr.length - 1].children);
        }
      });
    },
    // 选择表格中的开户行
    selectedBank(data) {
      // let reg = /^([\s\S]*银行)/;
      let cardInfoList = this.cardInfoList[this.currentIndex];
      // cardInfoList.bankName = data.parentBankName.match(reg)[1]; // 收款行名称
      cardInfoList.subbankName = data.bankName; // 开户行
      cardInfoList.subbankCode = data.bankCode; // 开户行行号
      cardInfoList.bankName = data.parentBankName; // 收款行名称
      cardInfoList.bankCode = data.parentBankCode; // 收款行行号 页面不展示
      cardInfoList.dropSelectShow = false;
    },
    // 验证银行信息
    checkBank(index) {
      let query = {
        accountName: this.cardInfoList[index].accountName,
        accountNum: this.cardInfoList[index].accountNum,
        applicationId: this.applicationId,
        mobileNum: this.cardInfoList[index].mobileNum,
        productId: this.cardInfoList[index].productId,
        subbankName: this.cardInfoList[index].subbankName, // 开户行
        subbankCode: this.cardInfoList[index].subbankCode, // 开户行行号
        bankName: this.cardInfoList[index].bankName, // 总行名称
        bankCode: this.cardInfoList[index].bankCode, // 总行行号
        paymentModeCode: this.cardInfoList[index].paymentModeCode,
        bindingModeCode: 'C'
      };

      this.$refs["bankInfoForm" + index].validate(valid => {
        if (valid) {
          this.checkBankApi(query).then(data => {
            this.confirmFn('收款卡账户验证通过', 'success');
          });
        }
      });
    },
    checkBankApi(data) {
      return new Promise((resolve, reject) => {
        this.checkLoading = true;
        this.$MyFetch
          .post(baseApi.bankInfo.check, data)
          .then(data => {
            this.checkLoading = false;
            resolve(data);
          })
          .catch(err => {
            console.log(err);
            this.confirmFn(err.message, "error");
            this.checkLoading = false;
            reject(err);
          });
      });
    },
    queryBank(index) {
      let bankInfo = this.cardInfoList[index].bankInfo;
      this.$refs['bankForm' + index].validate(valid => {
        if (valid) {
          let data = {
            bankName: bankInfo.bankName,
            cityName: bankInfo.cityName,
            pageNum: bankInfo.pageNum,
            pageSize: bankInfo.pageSize
          };
          // this[bank.bankFormCurrent] = data;
          this.queryBankApi(data).then(res => {
            bankInfo.bankList = res.list;
            bankInfo.total = res.total;
            bankInfo.pageNum = res.pageNum;
          });
        } else {
          this.confirmFn("请输入银行名称和城市再进行查询", "error");
        }
      });
    },
    // 获取银行信息
    queryBankApi(data) {
      return new Promise(resolve => {
        this.$MyFetch
          .post(baseApi.bankInfo.list, data)
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            console.log(err);
            this.confirmFn(err.message, "error");
          });
      });
    },
    // 分页
    jump(pageNum) {
      this.cardInfoList[this.currentIndex].bankInfo.pageNum = pageNum;
      this.queryBank(this.currentIndex);
    },
    onRepayBankChange({ bankName, bankCode, parentBankName, parentBankCode }, index) {
      this.cardInfoList[index].subbankName = bankName; // 开户行
      this.cardInfoList[index].subbankCode = bankCode; // 开户行行号
      this.cardInfoList[index].bankName = parentBankName; // 收款行名称
      this.cardInfoList[index].bankCode = parentBankCode; // 收款行行号
    }
  },
  computed: {
    ...mapGetters(['openVideo']),
    isPro1() {
      return Object.keys(this.orgSpecialInfo[0]).length > 0;
    },
    isPro2() {
      return Object.keys(this.orgSpecialInfo[1]).length > 0;
    },
    isBank1() {
      return Object.keys(this.cardInfoList[0]).length > 0;
    },
    isBank2() {
      return Object.keys(this.cardInfoList[1]).length > 0;
    },
    // 是否有修改过
    isCustomerUpdate() {
      return (
        JSON.stringify(this.creditInfo) === this.creditInfoOrigin &&
        JSON.stringify(this.orgSpecialInfo) === this.orgSpecialInfoOrigin &&
        JSON.stringify(this.cardInfoList) === this.cardInfoListOrigin
      );
    },
    ydInfoEditable() {
      if (this.isDetail || !this.openVideo) {
        return true;
      }
      return this.ydApproveMode2;
    }
  },
  // 导航离开时，判断数据是否更改，isCustomerUpdate为true则没有更改，反之更改了则不能跳转路由
  beforeRouteLeave(to, from, next) {
    if (this.isCustomerUpdate) {
      next();
    } else {
      window.eventBus.$emit("remote_checkTabsFn", "product-info");
      next(false);
    }
  },
  beforeDestroy() {
    // 销毁checkbank
    window.eventBus.$off("productinfo");
  }
};
</script>

<style lang="less">
  .complete-product.face2face-detail-style {
    .repay_account {
      .el-form .el-form-item{
        margin-right: 0;
      }
    }
  }
</style>

<style lang="less" scoped>
.table__body .el-date-editor--date {
  /deep/ .el-input__inner {
    padding-left: 10px;
    padding-right: 0;
    font-size: 12px;
  }
}
.fixed-save {
  position: absolute;
  z-index: 2;
  margin-left: 1040px;
  margin-top: -692px;
}
.dialog-box__middle-1200 {
  // height: 442px;
  // overflow-y: auto;
  //margin: 0 20px;
  //padding: 25px 30px;
  //box-shadow: 0 2px 6px 0 #d0d0d0;
  .dialog-box__middle-top {
    padding: 20px 0;
    border-bottom: 1px solid #d0d0d0;
    .title {
      font-size: 16px;
      .icon__gan {
        margin-right: 10px;
      }
    }
  }
}
.face2face-detail-style .el-form-item__33 {
  width: 32%;
}
/*表单区块*/
.dialog-box__middle-form {
  height: 542px;
  // overflow-y: auto;
  // padding: 0 20px;
  .margin-top__20 {
    margin-top: 20px;
  }
  .info-title-selectorBefore {
    margin-bottom: 20px;
    padding-left: 10px;
    span {
      font-weight: normal;
    }
  }
  .form__block {
    padding: 20px 0;
    margin-bottom: 20px;
    box-shadow: 0 2px 6px 0 #d0d0d0;
    .dialog-box__middle-top {
      padding-bottom: 20px;
      border-bottom: 1px solid #e9e9e9;
      .title {
        font-size: 16px;
        .icon__gan {
          margin-right: 10px;
        }
      }
    }
    .message__list {
      padding-top: 20px;
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
      margin-right: -40px;
      font-size: 0;
    }
  }
  .table__list {
    .item {
      padding-top: 20px;
      .dialog__table-box {
        position: relative;
        .table-guarantor {
          th {
            min-width: 91px;
          }
        }
        /deep/ .el-form-item__error {
          padding-top: 0;
        }
      }
      .dialog__table-box .tax_box {
        border: 1px solid #E9E9E9;
        box-shadow: 0 2px 6px 0 rgba(0,0,0,0.08);
        border-radius: 4px;
        padding: 20px;
        .query_btn {
          width: 120px;
          margin-top: 31px;
          margin-right: 15px;
          border: none;
          /deep/ span {
            font-size: 14px;
          }
        }
        .query_auth {
          border: 1px solid #538BF1;
          color: #538BF1;
          background: #fff;
          line-height: 0.9;
        }
        .query_auth:disabled {
          border-color: #a0cfff;
          color: #a0cfff;
        }
        .query_tax:disabled {
          background-color: #a0cfff;
          border-color: #a0cfff;
        }
        .check_tax:disabled {
          background-color: #EEB352;
          color: #ffffff;
        }
        // 水平线
        .horizon {
          height: 1px;
          background-color: #d0d0d0;
        }
        .complex_info{
          padding: 20px 0;
          .title{
            font-size: 14px;
            .icon__gan{
              margin-right: 10px;
            }
          }
        }
        .width245 {
          width: 245px;
        }
        /deep/ .el-date-editor .el-input__prefix {
          right: auto;
          left: 5px;
        }
        /deep/ .el-form-item__error{
          padding-top: 4px;
        }
      }
      .dialog__table-box.customer-message {
        .tab-box {
          height: 40px;
          padding-left: 20px;
          border: 1px solid #e9e9e9;
          border-bottom: none;
          /deep/ .el-tabs__item {
            font-size: 12px;
          }
          /deep/ .el-tabs__nav-wrap::after {
            background: none;
          }
        }
        .add__btn {
          position: absolute;
          right: 10px;
          top: 5px;
          padding: 0 12px;
          line-height: 30px;
          font-size: 14px;
          background: @blue-light;
          border-radius: 3px;
          color: #fff;
          .icon__add {
            padding-right: 8px;
            font-size: 20px;
            font-weight: 900;
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
.dialog-box .dialog__table-box table td {
  max-width: 100px;
}
.table-form-box {
  font-size: 12px;
  // overflow-x: scroll;
  // width: 812px;
  // .table_box1 {
  //   width: 150 * 15px;
  // }
  // .table_box3 {
  //   width: 150 * 10px;
  // }

  .table__box {
    border: 1px solid @line-color;
    border-radius: 4px;
    .table__head {
      .table__tr {
        .table__th {
          //width: 75px;
          min-width: 83px;
        }
      }
    }
    .table__body{
      .table__tr{
        .table__tr__top-list{
          .table__td{
            //width: 75px;
            min-width: 83px;
            max-width: 90px;
          }
        }
        .table__tr__bottom-list{
          .table__form-item{
            padding: 0 6px;
          }
          .operate-box{
            padding: 0 10px;
          }
        }
      }
    }
  }
}
.check-bank {

  .noInfo{
    text-align:center;
    height: 200px;
    line-height: 200px;
    font-size: 16px;
  }

  .el-form {
    margin-top: 20px;
    .dialog-box__form__group{
      margin-right: -40px;
      font-size:0;
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
    // position: relative;
    .button__wrap {
      position: relative;
      min-width: 100%;
      height: 42px;
      // overflow-y: auto;
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
    .button {
      vertical-align: top;
    }
    .wrap {
      position: absolute;
      top: 70px;
      min-width: 100%;
      padding: 20px;
      border: 1px solid @line-color;
      border-radius: 4px;
      background: #fff;
      z-index: 10;
      font-size: 12px;
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
      margin-right: 10px;
    }
    .wrap /deep/ .el-select {
      width: 242px;
    }
    .table__wrap-max {
      width: 710px;
    }
    .table__wrap-min {
      width: 466px;
    }
  }
  .drop__select-box .button__wrap.isactive {
    border-color: @blue-light;
    .icon {
      transform: rotateZ(0);
    }
  }
  .drop__select-box .button__wrap.disabled {
    background: #f5f7fa;
    cursor: not-allowed;
  }
}
</style>
