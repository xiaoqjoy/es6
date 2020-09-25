<template>
  <div class="complete-customer-info">
    <div class="dialog-box__middle-form">
      <el-form :model="pricingPlan"
               :rules="pricingPlanRule"
               ref="pricingPlanForm"
               label-width="100px"
               class="demo-form-inline" label-position="top" >
        <el-form-item label="定价方案（变更产品特殊字段将清空页面中的数据！）" prop="pricingPlanCode" class="el-form-item__25" >
          <el-select
                  @change="changePricingPlan"
                  :disabled="hasSubmit"
                  v-model="pricingPlan.pricingPlanCode"
                  placeholder="请选择">
            <el-option
                    v-for="(item,index) in pricingPlanLibrary"
                    :key="index"
                    :label="item.itemDesc"
                    :value="item.itemCode"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :model="orgSpecialInfo1"
               :rules="orgSpecialInfoRule1"
               ref="productForm1"
               label-width="100px"
               class="demo-form-inline" label-position="top" >
        <el-form-item label="产品一" prop="productIdOne" class="el-form-item__25" >
          <el-select
            @change="changeProduct1"
            :disabled="!!selectInfo.selectedProduct || hasSubmit"
            v-model="orgSpecialInfo1.productIdOne"
            placeholder="请选择产品">
            <el-option
              v-for="(item,index) in selectInfo.products"
              :key="index"
              :label="item.productName"
              :value="item.productId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="form__block bg__white border__radius-5" >
        <div class="dialog-box__middle-top">
          <h5 class="title"><span class="icon icon__gan"></span>产品一特殊字段</h5>
        </div>
        <div class="dialog-box__form__group margin-top__20" >
          <el-form :model="orgSpecialInfo1"
                   :rules="orgSpecialInfoRule1"
                   ref="orgSpecialInfo1Form"
                   label-width="100px"
                   class="demo-form-inline" label-position="top" >
            <el-form-item label="借款人职业名称" prop="careerCode" class="el-form-item__25" >
              <el-select
                :disabled="hasSubmit"
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
                :disabled="hasSubmit"
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
                :disabled="hasSubmit"
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
                :disabled="hasSubmit"
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
                @change="$refs.orgSpecialInfo1Form.validateField('loanOtherPurpose');if(orgSpecialInfo1.loanPurposeCode !== dCode.loanPurposeCode.other || orgSpecialInfo1.loanPurposeCode !== dCode.loanPurposeCode.other1){orgSpecialInfo1.loanOtherPurpose = ''}"
                v-model="orgSpecialInfo1.loanPurposeCode"
                placeholder="请选择贷款用途" :disabled="hasSubmit">
                <el-option
                  v-for="(item,index) in loanPurposeCodeLibrary[0]"
                  :key="index"
                  :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="其他贷款用途说明" prop="loanOtherPurpose" class="el-form-item__25"  >
              <el-input
                maxlength="10"
                :disabled="!(orgSpecialInfo1.loanPurposeCode === this.dCode.loanPurposeCode.other || orgSpecialInfo1.loanPurposeCode === this.dCode.loanPurposeCode.other1) || hasSubmit"
                v-model="orgSpecialInfo1.loanOtherPurpose"
                placeholder="请填写其他贷款用途说明"></el-input>
            </el-form-item>
            <el-form-item label="还款周期" prop="repaymentCycleCode" class="el-form-item__25">
              <el-select
                :disabled="hasSubmit"
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
                :disabled="hasSubmit"
                v-model="orgSpecialInfo1.repaymentModeCode" placeholder="请选择还款方式">
                <el-option
                  v-for="(item, index) in repaymentModeCodeLibrary"
                  :key="index"
                  :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <h5 class="line1px" v-if="showBank1">
          <span class="button" @click="checkBank1"  >验证</span>
        </h5>
        <div class="dialog-box__form__group margin-top__20" v-if="showBank1" >
          <el-form :model="bankInfo1"
                   :rules="bankInfoRule1"
                   ref="bankInfo1Form"
                   label-width="100px"
                   class="demo-form-inline" label-position="top" >
            <el-form-item label="支付方式" prop="paymentModeCode" class="el-form-item__25" >
              <el-select
                :disabled="hasSubmit"
                v-model="bankInfo1.paymentModeCode"
                placeholder="请选择支付方式">
                <el-option
                  v-for="(item, index) in paymentModeCodeLibrary"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收款账户户名" prop="accountName" class="el-form-item__25" >
              <el-input
                maxlength="30"
                :disabled="hasSubmit"
                v-model="bankInfo1.accountName"
                placeholder="请填写收款账户户名"></el-input>
            </el-form-item>
            <el-form-item label="收款卡号/账户" prop="accountNum" class="el-form-item__25" >
              <el-input
                :disabled="hasSubmit"
                @change="changeAccountNum1"
                v-model="bankInfo1.accountNum"
                placeholder="请填写收款卡号/账户"></el-input>
            </el-form-item>
            <el-form-item label="收款行名称" prop="bankName" class="el-form-item__25" >
              <el-input
                readonly
                :disabled="hasSubmit"
                v-model="bankInfo1.bankName"
                placeholder="请填写收款行名称"></el-input>
            </el-form-item>
            <div class="drop__select-box el-form-item__25">
              <p class="lab"><span class="icon icon__star">*</span>开户行</p>
              <button class="button__wrap"
                      type="button"
                      @click="dropSelectShow=!dropSelectShow;"
                      :class="{isactive:dropSelectShow, disabled: hasSubmit}"
                      :disabled="hasSubmit"> {{bankInfo1.subbankName? bankInfo1.subbankName: '请选择开户行'}} <i class="icon el-select__caret el-input__icon el-icon-arrow-up"></i> </button>
              <transition name="el-zoom-in-top">
                <div class="wrap table__wrap-max" v-show="dropSelectShow">
                  <el-form :model="bank1"
                           ref="bank1Form"
                           label-width="100px"
                           class="demo-form-inline" label-position="top" >
                    <el-form-item
                      :rules="[
                           { required: true, message: '请输入银行名称', trigger: 'blur' }
                      ]"
                      prop="bankName"
                      style="margin-right:10px">
                      <el-input placeholder="输入银行名称" v-model.trim="bank1.bankName"></el-input>
                    </el-form-item>
                    <el-form-item
                      :rules="[
                           { required: true, message: '请输入城市', trigger: 'blur' }
                      ]"
                      prop="cityName"
                      style="margin-right:10px">
                      <el-input placeholder="输入城市" v-model.trim="bank1.cityName"></el-input>
                    </el-form-item>
                    <el-button type="primary" class="button button__blue width100" @click="queryBank('bank1Form', bank1)">查询</el-button>
                  </el-form>
                  <el-table
                    :data="bank1.bankList"
                    height="200"
                    border
                    highlight-current-row
                    style="width: 100%"
                    cell-class-name="dialog__table__td"
                    header-cell-class-name="dialog__table__th"
                    @row-click="selectedBank1"
                    class="dialog__table">
                    <el-table-column
                      prop="bankName"
                      label="银行名称"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="bankCode"
                      label="银行编号"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="parentBankName"
                      label="总行名称">
                    </el-table-column>
                    <el-table-column
                      prop="parentBankCode"
                      label="总行编号">
                    </el-table-column>
                  </el-table>
                  <pagination :page="bank1FormPageConfig" style="margin-top: 10px" @jump-page="jump1"></pagination>
                </div>
              </transition>
            </div>
            <el-form-item label="开户行行号" prop="subbankCode" class="el-form-item__25"  >
              <el-input
                :disabled="hasSubmit"
                maxlength="10"
                readonly
                v-model="bankInfo1.subbankCode"
                placeholder="请填写开户行行号"></el-input>
            </el-form-item>
            <el-form-item label="预留手机号" prop="mobileNum" class="el-form-item__25">
              <el-input
                :disabled="hasSubmit"
                v-model="bankInfo1.mobileNum"
                placeholder="请填写预留手机号"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="more-message"></div>
        <special-form
          v-if="specialTemplate1.length > 0 && orgSpecialInfo1.productIdOne"
          :render-arr="specialTemplate1"
          form-name="formMore1"
          class="special-form"
          ref="formMore1"
          :set-value="specialData1"
          :has-submit="hasSubmit"
        ></special-form>
      </div>
      <el-form :model="orgSpecialInfo2"
               :rules="orgSpecialInfoRule2"
               ref="productForm2"
               label-width="100px"
               class="demo-form-inline" label-position="top" >
        <el-form-item label="产品二" class="el-form-item__25" prop="productIdTwo">
          <el-select
            clearable
            @change="changeProduct2"
            :disabled="hasSubmit"
            v-model="orgSpecialInfo2.productIdTwo"
            placeholder="请选择产品">
            <el-option
              v-for="(item,index) in selectInfo.products"
              :key="index"
              clearable
              :label="item.productName"
              :value="item.productId"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="form__block bg__white border__radius-5" v-if="orgSpecialInfo2.productIdTwo">
        <div class="dialog-box__middle-top">
          <h5 class="title"><span class="icon icon__gan"></span>产品二特殊字段</h5>
        </div>
        <div class="dialog-box__form__group margin-top__20" >
          <el-form :model="orgSpecialInfo2"
                   :rules="orgSpecialInfoRule2"
                   ref="orgSpecialInfo2Form"
                   label-width="100px"
                   class="demo-form-inline" label-position="top" >
            <el-form-item label="借款人职业名称" prop="careerCode" class="el-form-item__25" >
              <el-select
                :disabled="hasSubmit"
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
                :disabled="hasSubmit"
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
                :disabled="hasSubmit"
                v-model="orgSpecialInfo2.loanTerm"
                placeholder="请选择亲贷款期限">
                <el-option
                  v-for="(item,index) in loanTermLibrary[1]"
                  :key="index"
                  :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="贷款用途性质" prop="loanPurposeType" class="el-form-item__25" >
              <el-select
                :disabled="hasSubmit"
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
                @change="$refs.orgSpecialInfo2Form.validateField('loanOtherPurpose');if(orgSpecialInfo2.loanPurposeCode !== dCode.loanPurposeCode.other && orgSpecialInfo2.loanPurposeCode !== dCode.loanPurposeCode.other1){orgSpecialInfo2.loanOtherPurpose = ''}"
                v-model="orgSpecialInfo2.loanPurposeCode"
                placeholder="请选择贷款用途" :disabled="hasSubmit">
                <el-option
                  v-for="(item,index) in loanPurposeCodeLibrary[1]"
                  :key="index"
                  :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="其他贷款用途说明" prop="loanOtherPurpose" class="el-form-item__25"  >
              <el-input
                maxlength="10"
                :disabled="!(orgSpecialInfo2.loanPurposeCode === dCode.loanPurposeCode.other || orgSpecialInfo2.loanPurposeCode === dCode.loanPurposeCode.other1) || hasSubmit"
                v-model="orgSpecialInfo2.loanOtherPurpose"
                placeholder="请填写其他贷款用途说明"></el-input>
            </el-form-item>
            <el-form-item label="还款周期" prop="repaymentCycleCode" class="el-form-item__25">
              <el-select
                :disabled="hasSubmit"
                v-model="orgSpecialInfo2.repaymentCycleCode"
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
                :disabled="hasSubmit"
                v-model="orgSpecialInfo2.repaymentModeCode" placeholder="请选择还款方式">
                <el-option
                  v-for="(item, index) in repaymentModeCodeLibrary"
                  :key="index"
                  :label="item.itemDesc" :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <h5 class="line1px" v-if="showBank2">
          <span class="button" @click="checkBank2">验证</span>
        </h5>
        <div class="dialog-box__form__group margin-top__20" v-if="showBank2">
          <el-form :model="bankInfo2"
                   :rules="bankInfoRule2"
                   ref="bankInfo2Form"
                   label-width="100px"
                   class="demo-form-inline" label-position="top" >
            <el-form-item label="支付方式" prop="paymentModeCode" class="el-form-item__25" >
              <el-select
                :disabled="hasSubmit"
                v-model="bankInfo2.paymentModeCode"
                placeholder="请选择支付方式">
                <el-option
                  v-for="(item, index) in paymentModeCodeLibrary"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收款账户户名" prop="accountName" class="el-form-item__25" >
              <el-input
                maxlength="30"
                :disabled="hasSubmit"
                v-model="bankInfo2.accountName"
                placeholder="请填写收款账户户名"></el-input>
            </el-form-item>
            <el-form-item label="收款卡号/账户" prop="accountNum" class="el-form-item__25" >
              <el-input
                :disabled="hasSubmit"
                v-model="bankInfo2.accountNum"
                @change="changeAccountNum2"
                placeholder="请填写收款卡号/账户"></el-input>
            </el-form-item>
            <el-form-item label="收款行名称" prop="bankName" class="el-form-item__25" >
              <el-input
                readonly
                v-model="bankInfo2.bankName"
                placeholder="请填写收款行名称"></el-input>
            </el-form-item>
            <div class="drop__select-box el-form-item__25">
              <p class="lab"><span class="icon icon__star">*</span>开户行</p>
              <button class="button__wrap"
                      type="button"
                      @click="dropSelectShow2=!dropSelectShow2;"
                      :class="{isactive:dropSelectShow2, disabled: hasSubmit}"
                      :disabled="hasSubmit"> {{bankInfo2.subbankName? bankInfo2.subbankName: '请选择开户行'}} <i class="icon el-select__caret el-input__icon el-icon-arrow-up"></i> </button>
              <transition name="el-zoom-in-top">
                <div class="wrap table__wrap-max" v-show="dropSelectShow2">
                  <el-form :model="bank2"
                           ref="bank2Form"
                           label-width="100px"
                           class="demo-form-inline" label-position="top" >
                    <el-form-item
                      :rules="[
                           { required: true, message: '请输入银行名称', trigger: 'blur' }
                      ]"
                      prop="bankName"
                      style="margin-right:10px">
                      <el-input placeholder="输入银行名称" v-model.trim="bank2.bankName"></el-input>
                    </el-form-item>
                    <el-form-item
                      :rules="[
                           { required: true, message: '请输入城市', trigger: 'blur' }
                      ]"
                      prop="cityName"
                      style="margin-right:10px">
                      <el-input placeholder="输入城市" v-model.trim="bank2.cityName"></el-input>
                    </el-form-item>
                    <el-button type="primary" class="button button__blue width100" @click="queryBank('bank2Form', bank2)">查询</el-button>
                  </el-form>
                  <el-table
                    :data="bank2.bankList"
                    height="200"
                    border
                    highlight-current-row
                    style="width: 100%"
                    cell-class-name="dialog__table__td"
                    header-cell-class-name="dialog__table__th"
                    @row-click="selectedBank2"
                    class="dialog__table">
                    <el-table-column
                      prop="bankName"
                      label="银行名称"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="bankCode"
                      label="银行编号"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="parentBankName"
                      label="总行名称">
                    </el-table-column>
                    <el-table-column
                      prop="parentBankCode"
                      label="总行编号">
                    </el-table-column>
                  </el-table>
                  <pagination :page="bank2FormPageConfig" style="margin-top: 10px" @jump-page="jump2"></pagination>
                </div>
              </transition>
            </div>
            <el-form-item label="开户行行号" prop="subbankCode" class="el-form-item__25"  >
              <el-input
                :disabled="hasSubmit"
                maxlength="10"
                readonly
                v-model="bankInfo2.subbankCode"
                placeholder="请填写开户行行号"></el-input>
            </el-form-item>
            <el-form-item label="预留手机号" prop="mobileNum" class="el-form-item__25">
              <el-input
                :disabled="hasSubmit"
                v-model="bankInfo2.mobileNum"
                placeholder="请填写预留手机号"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="more-message cursor__pointer"></div>
        <special-form
          v-if="specialTemplate2.length > 0"
          :render-arr="specialTemplate2"
          form-name="formMore2"
          class="special-form"
          ref="formMore2"
          :set-value="specialData2"
          :has-submit="hasSubmit"
        ></special-form>
      </div>
      <div class="form__bottom text__center">
        <el-button type="warning"
                   @click="save"
                   class="button__border-blue  button button__width-200"
                   :disabled="hasSubmit">保存</el-button>
        <el-button type="primary" class="button__width-200" @click="submit" :disabled="hasSubmit">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {spareApi} from '../../../js/server.js';
  import myRules from '@common/js/rules.js';
  import pagination from '@components/pagination';
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
        dropSelectShow: false,
        dropSelectShow2: false,
        activeName: 'first',
        // 业务类型下拉字典项
        businessLibrary: [],
        // 产品下拉字典
        selectInfo: {
          products: [],
          selectedProduct: ''
        },
        // 支付方式下拉
        paymentModeCodeLibrary: [],
        // 职业字典
        carrerCodeLibrary: [],
        careerClass: {},
        // 行业字典
        industryCodeLibrary: [[], []],
        industryClass: [],
        // 贷款期限字典
        loanTermLibrary: [[], []],
        // 贷款用途性质字典
        loanPurposeTypeLibrary: [],
        // 贷款用途字典
        loanPurposeCodeLibrary: [[], []],
        // 还款周期
        repaymentCycleCodeLibrary: [],
        // 还款方式字典
        repaymentModeCodeLibrary: [],
        // 定价方案下拉字典
        pricingPlanLibrary: [],
        pricingPlan: {
          pricingPlanCode: null
        },
        pricingPlanRule: {
          pricingPlanCode: [
            { required: true, message: '请选择定价方案', trigger: 'change' }
          ]
        },
        // 特殊字段
        orgSpecialInfo1: {
          careerCode: null,
          industryCode: null,
          loanTerm: null,
          loanPurposeType: null,
          loanPurposeCode: '',
          repaymentCycleCode: null,
          repaymentModeCode: null,
          loanOtherPurpose: null,
          orgSpecialInfoList: [],
          productId: null,
          productIdOne: '',
          sortNum: 1
        },
        orgSpecialInfo2: {
          careerCode: null,
          industryCode: null,
          loanTerm: null,
          loanPurposeType: null,
          loanPurposeCode: '',
          repaymentCycleCode: null,
          repaymentModeCode: null,
          loanOtherPurpose: null,
          orgSpecialInfoList: [],
          productId: null,
          productIdTwo: '',
          sortNum: 2
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
            { validator: this.checkloanOtherPurpose1, trigger: 'change' }
          ],
          productIdOne: [
            {
              required: true, message: '请选择产品', trigger: 'change'
            }
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
        bankInfo1: {
          accountName: null,
          accountNum: null,
          bankCode: null,
          mobileNum: null,
          paymentModeCode: null,
          productId: null,
          subbankCode: null,
          subbankName: null,
          bankName: null
        },
        bankInfoRule1: {
          paymentModeCode: [
            { required: true, message: '请选择支付方式', trigger: 'change' }
          ],
          accountName: [
            { required: true, message: '请填写账户名', trigger: 'blur' },
            { validator: myRules.nameRule, trigger: 'blur' }
          ],
          accountNum: [
            { required: true, message: '请填写收款卡号/账户', trigger: 'blur' },
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
            { required: true, message: '选择开户行后自动带出', trigger: 'blur' }
          ],
          subbankCode: [
            { required: true, message: '选择开户行后自动带出', trigger: 'blur' }
          ],
          mobileNum: [
            { required: true, message: '请填写预留手机号', trigger: 'blur' },
            { validator: myRules.phoneRule, trigger: 'blur' }
          ]
        },
        bankInfo2: {
          accountName: null,
          accountNum: null,
          bankCode: null,
          mobileNum: null,
          paymentModeCode: null,
          productId: null,
          subbankCode: null,
          subbankName: null,
          bankName: null
        },
        bankInfoRule2: {
          paymentModeCode: [
            { required: true, message: '请选择支付方式', trigger: 'change' }
          ],
          accountName: [
            { required: true, message: '请填写账户名', trigger: 'blur' },
            { validator: myRules.nameRule, trigger: 'blur' }
          ],
          accountNum: [
            { required: true, message: '请填写收款卡号/账户', trigger: 'blur' },
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
            { required: true, message: '选择开户行后自动带出', trigger: 'blur' }
          ],
          subbankCode: [
            { required: true, message: '选择开户行后自动带出', trigger: 'blur' }
          ],
          mobileNum: [
            { required: true, message: '请填写预留手机号', trigger: 'blur' },
            { validator: myRules.phoneRule, trigger: 'blur' }
          ]
        },
        bank1: {
          bankName: '', // 银行名称
          cityName: '', // 城市名称
          bankList: [] // 搜索列表,
        },
        bank1FormCurrent: {},
        bank1FormPageConfig: {
          currentPage: 1,
          account: 0,
          pageSize: 10,
          showJumpButton: false
        },
        bank2FormCurrent: {},
        bank2: {
          bankName: '', // 银行名称
          cityName: '', // 城市名称
          bankList: [] // 搜索列表,
        },
        bank2FormPageConfig: {
          currentPage: 1,
          account: 0,
          pageSize: 10,
          showJumpButton: false
        },
        specialTemplate1: [],
        specialTemplate2: [],
        specialData1: {},
        specialData2: {},
        // 版本号
        templateVersionId1: '',
        templateVersionId2: '',
        dCode: this.$getCodeDependent()
      };
    },
    created() {
      this.getInfo(this.applicationId);
      this.getBusinessLibrary(); // 获取业务类型下拉
      this.getPricingPlanApi(); // 获取定价方案
      this.modifyFn();
      let selectArr = ['payment_mode_code', 'career_code', 'loan_purpose_type', 'repayment_cycle_code', 'repayment_mode_code'];
      this.getMultipleLibrary(selectArr, this.isReadonly)
        .then(data => {
          this.paymentModeCodeLibrary = data.payment_mode_code;
          this.carrerCodeLibrary = data.career_code;
          data.career_code.forEach(v => {
            this.$set(this.careerClass, v.itemCode, v.itemDesc);
          });
          this.loanPurposeTypeLibrary = data.loan_purpose_type;
          this.repaymentCycleCodeLibrary = data.repayment_cycle_code;
          this.repaymentModeCodeLibrary = data.repayment_mode_code;
        })
        .catch(err => {
          this.confirmFn(err.message);
        });
    },
    methods: {
      // 获取是否提交过
      modifyFn() {
        // hasSubmit 是否提交（待处理页面中的提交按钮）
        // isChangeProduct 是否重选要重选产品
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
            this.hasSubmit = (parseInt(status.hasSubmit) > 1 && !status.isChangeProduct) || this.isReadonly;
          });
      },
      // 是否重选产品
      getReselectIndApi() {
        return this.$MyFetch.get(spareApi.solving.completeInfo.completeCustomerInfo.getHasSubmit + this.applicationId);
      },
      // 外部是否提交过
      getHasSubmit() {
        return this.$MyFetch.get(spareApi.solving.completeInfo.completeProduct.getSubmitStatus + this.applicationId);
      },
      // 保存
      submit() {
        // 验证
        let hasPass = 0;
        if (this.specialTemplate1.length > 0) {
          this.$refs.formMore1.validate((valid) => {
            if (!valid) {
              hasPass += 1;
            }
          });
        }
        this.$refs.productForm1.validate((valid) => {
          if (!valid) {
            hasPass += 1;
          }
        });
        this.$refs.orgSpecialInfo1Form.validate((valid) => {
          if (!valid) {
            hasPass += 1;
          }
        });
        this.$refs.pricingPlanForm.validate((valid) => {
          if (!valid) {
            hasPass += 1;
          }
        });
        // 验证不通过且需要填写银行卡时
        if (this.showBank1) {
          this.$refs.bankInfo1Form.validate((valid) => {
            if (!valid) {
              hasPass += 1;
            }
          });
        }
        if (this.orgSpecialInfo2.productIdTwo) {
          this.$refs.orgSpecialInfo2Form.validate((valid) => {
            if (!valid) {
              hasPass += 1;
            }
          });
          // 验证不通过且需要填写银行卡时
          if (this.showBank2) {
            this.$refs.bankInfo2Form.validate((valid) => {
              if (!valid) {
                hasPass += 1;
              }
            });
          }

          if (this.specialTemplate2.length > 0) {
            this.$refs.formMore2.validate((valid) => {
              if (!valid) {
                hasPass += 1;
              }
            });
          }
        }
        if (!this.orgSpecialInfo1.productIdOne) {
          this.confirmFn('产品一必填!');
          return;
        }
        if (this.orgSpecialInfo1.productIdOne === this.orgSpecialInfo2.productIdTwo) {
          this.confirmFn('产品一与产品二不能相同!');
          return;
        }
        // 拼接产品数据一
        let data = {
          applicationId: this.applicationId,
          bankInfoList: [],
          productSpecialList: [
            this.orgSpecialInfo1
          ],
          pricingPlanCode: this.pricingPlan.pricingPlanCode
        };
        // 如果银行卡字段需要填就有该对象
        if (this.showBank1) {
          this.bankInfo1.productId = this.orgSpecialInfo1.productIdOne;
          data.bankInfoList.push(this.bankInfo1);
        }
        // 传产品一id
        data.productSpecialList[0].productId = this.orgSpecialInfo1.productIdOne;

        // 拼接产品数据二
        if (this.orgSpecialInfo2.productIdTwo) {
          data.productSpecialList[1] = this.orgSpecialInfo2;
          // 传产品二id
          data.productSpecialList[1].productId = this.orgSpecialInfo2.productIdTwo;
          // 如果银行卡字段需要填就有该对象
          if (this.showBank2) {
            this.bankInfo2.productId = this.orgSpecialInfo2.productIdTwo;
            data.bankInfoList.push(this.bankInfo2);
          }
        }
        data = JSON.parse(JSON.stringify(data));
        // 产品一动态字段
        if (this.specialTemplate1.length > 0) {
          // 版本号
          data.productSpecialList[0].templateVersionId = this.templateVersionId1;
          data.productSpecialList[0].orgSpecialInfoList = [];
          Object.keys(this.$refs.formMore1.formData).forEach(key => {
            if (key.indexOf('_cascader') !== -1) {
              return;
            }
            let obj = {};
            obj.orgItemCode = key;
            obj.orgItemVal = this.$refs.formMore1.formData[key];
            data.productSpecialList[0].orgSpecialInfoList.push(obj);
          });
        } else if (data.productSpecialList[0]) {
          data.productSpecialList[0].orgSpecialInfoList = [];
        }
        // 产品二动态字段
        if (this.specialTemplate2.length > 0) {
          data.productSpecialList[1].templateVersionId = this.templateVersionId2;
          data.productSpecialList[1].orgSpecialInfoList = [];
          Object.keys(this.$refs.formMore2.formData).forEach(key => {
            if (key.indexOf('_cascader') !== -1) {
              return;
            }
            let obj = {};
            obj.orgItemCode = key;
            obj.orgItemVal = this.$refs.formMore2.formData[key];
            data.productSpecialList[1].orgSpecialInfoList.push(obj);
          });
        } else if (data.productSpecialList[1]) {
           data.productSpecialList[1].orgSpecialInfoList = [];
        }
        // 添加行业名与职业名给后端用
        data.productSpecialList[0].careerName = this.careerClass[data.productSpecialList[0].careerCode];
        data.productSpecialList[0].industryName = this.industryClass[0][data.productSpecialList[0].industryCode];
        if (this.orgSpecialInfo2.productIdTwo && data.productSpecialList[1].careerCode) {
          data.productSpecialList[1].careerName = this.careerClass[data.productSpecialList[1].careerCode];
        }
        if (this.orgSpecialInfo2.productIdTwo && data.productSpecialList[1].industryName) {
          data.productSpecialList[1].industryName = this.industryClass[1][data.productSpecialList[1].industryCode];
        }
        if (hasPass === 0) {
          this.confirmFn('确认提交信息？', 'warning')
            .then(() => {
              this.submitApi(data)
                .then(() => {
                  this.confirmFn('提交成功！', 'success');
                });
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
              this.confirmFn(err.message, 'error');
            });
        });
      },
      // 暂存
      save() {
        let data = {
          applicationId: this.applicationId,
          bankInfoList: [],
          productSpecialList: [
            this.orgSpecialInfo1
          ],
          pricingPlanCode: this.pricingPlan.pricingPlanCode
        };
        // 如果银行卡字段需要填就有该对象
        if (this.showBank1) {
          this.bankInfo1.productId = this.orgSpecialInfo1.productIdOne;
          data.bankInfoList.push(this.bankInfo1);
        }
        // 传产品一id
        data.productSpecialList[0].productId = this.orgSpecialInfo1.productIdOne;
        if (!this.orgSpecialInfo1.productIdOne) {
          this.confirmFn('产品一必填!');
          return;
        }
        if (this.orgSpecialInfo1.productIdOne === this.orgSpecialInfo2.productIdTwo) {
          this.confirmFn('产品一与产品二不能相同!');
          return;
        }
        // 产品2
        if (this.orgSpecialInfo2.productIdTwo) {
          data.productSpecialList[1] = this.orgSpecialInfo2;
          // 传产品二id
          data.productSpecialList[1].productId = this.orgSpecialInfo2.productIdTwo;
          // 如果银行卡字段需要填就有该对象
          if (this.showBank2) {
            this.bankInfo2.productId = this.orgSpecialInfo2.productIdTwo;
            data.bankInfoList.push(this.bankInfo2);
          }
        }
        data = JSON.parse(JSON.stringify(data));
        // 动态字段一
        if (this.specialTemplate1.length > 0) {
          // 版本号
          data.productSpecialList[0].templateVersionId = this.templateVersionId1;
          data.productSpecialList[0].orgSpecialInfoList = [];
          Object.keys(this.$refs.formMore1.formData).forEach(key => {
            if (key.indexOf('_cascader') !== -1) {
              return;
            }
            let obj = {};
            obj.orgItemCode = key;
            obj.orgItemVal = this.$refs.formMore1.formData[key];
            data.productSpecialList[0].orgSpecialInfoList.push(obj);
          });
        }
        // 动态字段二
        if (this.specialTemplate2.length > 0) {
          data.productSpecialList[1].templateVersionId = this.templateVersionId2;
          data.productSpecialList[1].orgSpecialInfoList = [];
          Object.keys(this.$refs.formMore2.formData).forEach(key => {
            if (key.indexOf('_cascader') !== -1) {
              return;
            }
            let obj = {};
            obj.orgItemCode = key;
            obj.orgItemVal = this.$refs.formMore2.formData[key];
            data.productSpecialList[1].orgSpecialInfoList.push(obj);
          });
        }
        // 添加行业名与职业名给后端用
        data.productSpecialList[0].careerName = this.careerClass[data.productSpecialList[0].careerCode];
        data.productSpecialList[0].industryName = this.industryClass[0][data.productSpecialList[0].industryCode];
        if (this.orgSpecialInfo2.productIdTwo && data.productSpecialList[1].careerCode) {
          data.productSpecialList[1].careerName = this.careerClass[data.productSpecialList[1].careerCode];
        }
        if (this.orgSpecialInfo2.productIdTwo && data.productSpecialList[1].industryCode) {
          data.productSpecialList[1].industryName = this.industryClass[1][data.productSpecialList[1].industryCode];
        }
        this.saveApi(data)
          .then((data) => {
            this.confirmFn('暂存成功！', 'success');
          })
          .catch(err => {
            this.confirmFn(err.message);
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
      // 下拉项字典api
      getSelectValue(name) {
        return new Promise((resolve, reject) => {
          this.$MyFetch.get(spareApi.commonSelect, {categoryCode: name})
            .then((data = {}) => {
              resolve(data);
            })
            .catch(err => {
              console.log(err);
            });
        });
      },
      // 获取业务类型
      getBusinessLibrary() {
        var query = {
          categoryCode: 'business_type_code'
        };
        this.getSelectValue(query)
          .then((data) => {
            this.businessLibrary = [...data];
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 获取整个页面的值
      getInfo(id) {
        let url = this.isReadonly ? spareApi.solving.completeInfo.completeCustomerInfo.getInfoHasDone : spareApi.solving.completeInfo.completeCustomerInfo.getInfo;
        this.$MyFetch.get(url + id)
          .then(data => {
            this.pricingPlan.pricingPlanCode = data.pricingPlanCode ? data.pricingPlanCode : this.pricingPlan.pricingPlanCode;
            if (data.productSpecialList.length > 0) {
              if (data.productSpecialList[0].sortNum === 1) {
                this.orgSpecialInfo1 = Object.assign(this.orgSpecialInfo1, data.productSpecialList[0]);
                this.orgSpecialInfo2 = Object.assign(this.orgSpecialInfo2, data.productSpecialList[1]);
              } else {
                this.orgSpecialInfo2 = Object.assign(this.orgSpecialInfo2, data.productSpecialList[0]);
                this.orgSpecialInfo1 = Object.assign(this.orgSpecialInfo1, data.productSpecialList[1]);
              }
              this.templateVersionId1 = this.orgSpecialInfo1.templateVersionId;
              if (this.orgSpecialInfo2) {
                this.templateVersionId2 = this.orgSpecialInfo2.templateVersionId;
              }
            }
            if (data.bankInfoList.length > 0) {
              if (data.bankInfoList[0].productId === this.orgSpecialInfo1.productId) {
                this.bankInfo1 = Object.assign(this.bankInfo1, data.bankInfoList[0]);
                this.bankInfo2 = Object.assign(this.bankInfo2, data.bankInfoList[1]);
              } else {
                this.bankInfo1 = Object.assign(this.bankInfo1, data.bankInfoList[1]);
                this.bankInfo2 = Object.assign(this.bankInfo2, data.bankInfoList[0]);
              }
              this.$set(this.bankInfo1, 'mobileNum', (this.bankInfo1.mobileNum ? this.bankInfo1.mobileNum : data.aplMobileNum));
              this.$set(this.bankInfo2, 'mobileNum', (this.bankInfo2.mobileNum ? this.bankInfo1.mobileNum : data.aplMobileNum));
            }
            // 回显产品一特殊字段，调用模板
            if (this.orgSpecialInfo1.productId) {
              this.specialData1 = {};
              this.orgSpecialInfo1.orgSpecialInfoList.forEach(v => {
                this.$set(this.specialData1, v.orgItemCode, v.orgItemVal);
              });
              this.getSpecialApi(this.orgSpecialInfo1.productId)
                .then(data => {
                  this.specialTemplate1 = [...data.orgSpecialColumnList];
                })
                .catch(err => {
                  this.confirmFn(err.message, 'error');
                });
            }
            // 回显产品二特殊字段，调用模板
            if (this.orgSpecialInfo2.productId) {
              this.specialData2 = {};
              this.orgSpecialInfo2.orgSpecialInfoList.forEach(v => {
                this.$set(this.specialData2, v.orgItemCode, v.orgItemVal);
              });
              this.getSpecialApi(this.orgSpecialInfo2.productId)
                .then(data => {
                  this.specialTemplate2 = [...data.orgSpecialColumnList];
                })
                .catch(err => {
                  this.confirmFn(err.message, 'error');
                });
            }
            // this.getSpecialValue([this.orgSpecialInfo1, this.orgSpecialInfo2]);
            // 获取产品下拉列表
            this.getSelectInfo(this.applicationId);
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
      },
      // 获取特定下拉字段
      getSpecialValue(data) {
        // 行业字典获取
        data.forEach((v, index) => {
          if (v.productId) {
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
          }
        });
        // 贷款期限字典获取
        data.forEach((v, index) => {
          if (v.productId) {
            this.$MyFetch.get(spareApi.solving.completeInfo.completeCustomerInfo.getLoanTerm + this.applicationId + '/' + v.productId + '/')
              .then(data => {
                this.$set(this.loanTermLibrary, index, data);
              })
              .catch(err => {
                this.confirmFn(err.message, 'error');
              });
          }
        });
        // 贷款期限字典获取
        data.forEach((v, index) => {
          if (v.productId) {
            this.$MyFetch.get(spareApi.solving.completeInfo.completeCustomerInfo.getLoanPurpose + this.applicationId + '/' + v.productId + '/')
              .then(data => {
                this.$set(this.loanPurposeCodeLibrary, index, data);
              })
              .catch(err => {
                this.confirmFn(err.message, 'error');
              });
          }
        });
      },
      // 获取产品下拉字典
      getSelectInfo(id) {
        if (!this.pricingPlan.pricingPlanCode) return;
        let url = this.isReadonly ? (spareApi.solving.completeInfo.selectProduction.productSelectListHasDone + id) : (spareApi.solving.completeInfo.selectProduction.productSelectList + id + '/' + this.pricingPlan.pricingPlanCode);
        this.$MyFetch.get(url)
          .then((data = {}) => {
            if (data.productCheckeds.length !== 0) {
              data.productCheckeds.forEach((v) => {
                if (v.sortNum === 1) {
                  this.orgSpecialInfo1.productIdOne = v.productId;
                } else if (v.sortNum === 2) {
                  this.orgSpecialInfo2.productIdTwo = v.productId;
                }
              });
            }
            if (data.selectedProduct) {
              this.orgSpecialInfo1.productIdOne = data.selectedProduct;
            }
            this.selectInfo = data;
            // 特定产品字段
            this.getSpecialValue([this.orgSpecialInfo1, this.orgSpecialInfo2]);
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
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
        if ((this.orgSpecialInfo1.loanPurposeCode === this.dCode.loanPurposeCode.other || this.orgSpecialInfo1.loanPurposeCode === this.dCode.loanPurposeCode.other1) && !value) {
          callback(new Error('请填写其他贷款用途说明'));
        } else if ((this.orgSpecialInfo1.loanPurposeCode === this.dCode.loanPurposeCode.other || this.orgSpecialInfo1.loanPurposeCode === this.dCode.loanPurposeCode.other1) && !reg.test(value)) {
          callback(new Error('只能输入汉字'));
        } else {
          callback();
        }
      },
      checkloanOtherPurpose2(rule, value, callback) {
        var reg = /^[\u4E00-\u9FA5]+$/;
        if ((this.orgSpecialInfo2.loanPurposeCode === this.dCode.loanPurposeCode.other || this.orgSpecialInfo2.loanPurposeCode === this.dCode.loanPurposeCode.other1) && !value) {
          callback(new Error('请填写其他贷款用途说明'));
        } else if ((this.orgSpecialInfo2.loanPurposeCode === this.dCode.loanPurposeCode.other || this.orgSpecialInfo2.loanPurposeCode === this.dCode.loanPurposeCode.other1) && !reg.test(value)) {
          callback(new Error('只能输入汉字'));
        } else {
          callback();
        }
      },
      changeAccountNum1() {
        this.bankInfo1.accountNum = this.bankInfo1.accountNum.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
      },
      changeAccountNum2() {
        this.bankInfo2.accountNum = this.bankInfo2.accountNum.replace(/\s/g, '').replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
      },
      // 查询银行信息
      queryBank(formName, query) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              bankName: query.bankName,
              cityName: query.cityName,
              pageNum: 1,
              pageSize: 10
            };
            this[formName + 'Current'] = JSON.parse(JSON.stringify(data));
            this.queryBankApi(data)
              .then((res) => {
                query.bankList = res.list;
                this[(formName + 'PageConfig')].account = res.total;
                this[(formName + 'PageConfig')].currentPage = res.pageNum;
              });
          } else {
            console.log('error');
          }
        });
      },
      queryBankApi(data) {
        return new Promise((resolve) => {
          this.$MyFetch.post(spareApi.solving.completeInfo.completeCustomerInfo.getBankList, data)
            .then((data) => {
              resolve(data);
            })
            .catch((err) => {
              this.confirmFn(err.message, 'error');
            });
        });
      },
      jump1(index) {
        this.bank1FormCurrent.pageNum = index;
        this.queryBankApi(this.bank1FormCurrent)
          .then((res) => {
            this.bank1.bankList = res.list;
            this.bank1FormPageConfig.account = res.total;
            this.bank1FormPageConfig.currentPage = res.pageNum;
          });
      },
      selectedBank1(data) {
        // let reg = /^([\s\S]*银行)/;
        // this.bankInfo1.bankName = data.parentBankName.match(reg)[1]; // 收款行名称
        this.bankInfo1.bankName = data.parentBankName;
        this.bankInfo1.subbankName = data.bankName; // 开户行
        this.bankInfo1.subbankCode = data.bankCode; // 开户行行号
        this.bankInfo1.bankCode = data.parentBankCode; // 收款行行号 页面不展示
        this.dropSelectShow = false;
      },
      jump2(index) {
        this.bank2FormCurrent.pageNum = index;
        this.queryBankApi(this.bank2FormCurrent)
          .then((res) => {
            this.bank2.bankList = res.list;
            this.bank2FormPageConfig.account = res.total;
            this.bank2FormPageConfig.currentPage = res.pageNum;
          });
      },
      selectedBank2(data) {
        // let reg = /^([\s\S]*银行)/;
        // this.bankInfo2.bankName = data.parentBankName.match(reg)[1]; // 收款行名称
        this.bankInfo2.bankName = data.parentBankName;
        this.bankInfo2.subbankName = data.bankName; // 开户行
        this.bankInfo2.subbankCode = data.bankCode; // 开户行行号
        this.bankInfo2.bankCode = data.parentBankCode;
        this.dropSelectShow2 = false;
      },

      // 验证银行信息
      checkBank1() {
        if (this.hasSubmit) return;
        let query = {
          accountName: this.bankInfo1.accountName,
          accountNum: this.bankInfo1.accountNum,
          applicationId: this.applicationId,
          mobileNum: this.bankInfo1.mobileNum,
          productId: this.orgSpecialInfo1.productIdOne,
          subbankName: this.bankInfo1.subbankName, // 开户行
          subbankCode: this.bankInfo1.subbankCode, // 开户行行号
          bankName: this.bankInfo1.bankName, // 总行名称
          bankCode: this.bankInfo1.bankCode, // 总行行号
          paymentModeCode: this.bankInfo1.paymentModeCode
        };
        this.$refs.bankInfo1Form.validate((valid) => {
          if (valid) {
            this.checkBankApi(query)
              .then(data => {
                this.confirmFn('验证成功！', 'success');
              });
          }
        });
      },
      checkBank2() {
        if (this.hasSubmit) return;
        let query = {
          accountName: this.bankInfo2.accountName,
          accountNum: this.bankInfo2.accountNum,
          applicationId: this.applicationId,
          mobileNum: this.bankInfo2.mobileNum,
          productId: this.orgSpecialInfo2.productIdTwo,
          subbankName: this.bankInfo2.subbankName, // 开户行
          subbankCode: this.bankInfo2.subbankCode, // 开户行行号
          bankName: this.bankInfo2.bankName, // 总行名称
          bankCode: this.bankInfo2.bankCode, // 总行行号
          paymentModeCode: this.bankInfo2.paymentModeCode
        };
        this.$refs.bankInfo2Form.validate((valid) => {
          if (valid) {
            this.checkBankApi(query)
              .then(data => {
                this.confirmFn('验证成功！', 'success');
              });
          }
        });
      },
      checkBankApi(data) {
        return new Promise((resolve) => {
          this.$MyFetch.post(spareApi.solving.completeInfo.completeCustomerInfo.checkBank, data)
            .then(data => {
              resolve(data);
            })
            .catch(err => {
              this.confirmFn(err.message);
            });
        });
      },
      // 改变产品时调用新模板
      changeProduct1() {
        this.specialData1 = {};
        this.specialTemplate1 = [];
        if (!this.orgSpecialInfo1.productIdOne) { return; }
        // 先获取初始化模板值 再取模板
        this.getSpecialTemplateValue(this.applicationId, this.orgSpecialInfo1.productIdOne)
          .then(data => {
            this.specialData1 = {};
            data.forEach(v => {
              this.$set(this.specialData1, v.orgItemCode, v.orgItemVal);
            });
            return this.getSpecialApi(this.orgSpecialInfo1.productIdOne);
          })
          .then(data => {
            this.specialTemplate1 = [...data.orgSpecialColumnList];
            this.templateVersionId1 = data.templateVersionId;
          })
          .catch(err => {
          this.confirmFn(err.message, 'error');
        });
        // 特定产品字段
        this.orgSpecialInfo1.productId = this.orgSpecialInfo1.productIdOne;
        this.orgSpecialInfo2.productId = this.orgSpecialInfo2.productIdTwo;
        this.getSpecialValue([this.orgSpecialInfo1, this.orgSpecialInfo2]);
        // 清空选项
        this.orgSpecialInfo1.industryCode = '';
        this.orgSpecialInfo1.loanTerm = '';
        this.orgSpecialInfo1.loanPurposeCode = '';
      },
      changeProduct2() {
        this.specialData2 = {};
        this.specialTemplate2 = [];
        if (!this.orgSpecialInfo2.productIdTwo) { return; }
        // 先获取初始化模板值 再取模板
        this.getSpecialTemplateValue(this.applicationId, this.orgSpecialInfo2.productIdTwo)
          .then(data => {
            this.specialData2 = {};
            data.forEach(v => {
              this.$set(this.specialData2, v.orgItemCode, v.orgItemVal);
            });
            return this.getSpecialApi(this.orgSpecialInfo2.productIdTwo);
          })
          .then(data => {
            this.specialTemplate2 = [...data.orgSpecialColumnList];
            this.templateVersionId2 = data.templateVersionId;
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
        // 特定产品字段
        this.orgSpecialInfo1.productId = this.orgSpecialInfo1.productIdOne;
        this.orgSpecialInfo2.productId = this.orgSpecialInfo2.productIdTwo;
        this.getSpecialValue([this.orgSpecialInfo1, this.orgSpecialInfo2]);
        // 清空选项
        this.orgSpecialInfo2.industryCode = '';
        this.orgSpecialInfo2.loanTerm = '';
        this.orgSpecialInfo2.loanPurposeCode = '';
      },
      // 切换产品时获取对应模板的值
      getSpecialTemplateValue(applicationId, productId) {
        return this.$MyFetch.post(spareApi.solving.completeInfo.completeCustomerInfo.getSpecialVal, {applicationId, productId});
      },
      // 获取定价方案下拉
      getPricingPlanApi() {
        this.$MyFetch.get(spareApi.solving.completeInfo.completeCustomerInfo.getPricingPlanCode + this.applicationId)
                .then(data => {
                  this.pricingPlanLibrary = data;
                })
                .catch((err) => {
                  !!err.message && this.confirmFn(err.message, 'error');
                });
      },
      // 改变定价方案
      // 重置所有表单选项
      changePricingPlan() {
        // !this.selectInfo.selectedProduct 有值时 产品一不可变更
        this.$refs.productForm1.resetFields();
        this.$refs.productForm2.resetFields();
        this.$refs.orgSpecialInfo1Form.resetFields();
        this.orgSpecialInfo2 = {
          careerCode: null,
          industryCode: null,
          loanTerm: null,
          loanPurposeType: null,
          loanPurposeCode: '',
          repaymentCycleCode: null,
          repaymentModeCode: null,
          loanOtherPurpose: null,
          orgSpecialInfoList: [],
          productId: null,
          productIdTwo: '',
          sortNum: 2
        };
        this.$refs.bankInfo1Form.resetFields();
        this.bankInfo2 = {
                  accountName: null,
                  accountNum: null,
                  bankCode: null,
                  mobileNum: null,
                  paymentModeCode: null,
                  productId: null,
                  subbankCode: null,
                  subbankName: null,
                  bankName: null
        };
        this.getSelectInfo(this.applicationId);
        this.deleteSepcialValueApi();
      },
      deleteSepcialValueApi() {
        this.$MyFetch.get(spareApi.solving.completeInfo.completeCustomerInfo.deleteSpecialValue + this.applicationId)
                .catch(err => {
                  !!err.message && this.confirmFn(err.message);
                });
      }
    },
    components: {
      pagination,
      specialForm
    },
    computed: {
      showBank1() {
        let show = true;
        this.selectInfo.products.forEach(v => {
          if (v.hiddenBankCardInd && (v.productId === this.orgSpecialInfo1.productIdOne)) {
            show = false;
          }
        });
        return show;
      },
      showBank2() {
        let show = true;
        this.selectInfo.products.forEach(v => {
          if (v.hiddenBankCardInd && (v.productId === this.orgSpecialInfo2.productIdTwo)) {
            show = false;
          }
        });
        return show;
      }
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
      .button__wrap{
        position: relative;
        min-width: 100%;
        height: 42px;
        overflow-y:auto;
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
      .button{
        vertical-align: top;
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
        margin-right: 10px;
      }
      .wrap /deep/ .el-select{
        width: 242px;

      }
      .table__wrap-max{
        width: 710px;
      }
      .table__wrap-min{
        width: 466px;
      }
    }
    .drop__select-box .button__wrap.isactive{
      border-color: @blue-light;
      .icon{
        transform: rotateZ(0);
      }
    }
    .drop__select-box .button__wrap.disabled{
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
            color: #999;
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
      .line1px{
        padding: 15px 0;
        border-top: 1px solid @border-line;
        font-size: 14px;
        color: @blue-light;
        span{
          text-align:center;
          display: inline-block;
          line-height: 35px;
          width: 35px;
          border-radius: 50%;
          cursor: pointer;
        }
      }
    }
    .form__bottom{
      text-align: center;
      padding-bottom: 20px;
    }
  }
  .special-form{
    margin-right: -40px;
  }
</style>
