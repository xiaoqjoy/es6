<template>
<!-- 本组件用于易贷受薪自雇化 -->
  <div class="easy_loan_self">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 v-if="isDispose && !isReadonly" class="title bg__white strong">补件处理</h5>
        <h5 v-if="!isDispose && !isReadonly" class="title bg__white strong">补件复核</h5>
        <h5 v-if="isReadonly" class="title bg__white strong">补件查看</h5>
        <span class="product-title-img">
          <img src="../../../../../assets/img/Group10.png" alt>
        </span>
        <span class="dialog-box-group">
          <el-button v-if="isDispose && !isReadonly" type="text" @click="showimg()">上传影像</el-button>
          <el-button v-else type="text" @click="showimg()">查看影像</el-button>
        </span>
        <span class="el-icon-close button button__close" @click="close_()"></span>
        <a
          v-if="!isDispose && !isReadonly"
          href="javascript:;"
          class="product-printer"
          @click="showPrinterPop = true"><i class="el-icon-printer"></i>打印</a>
      </div>
      <div class="dialog-box__bottom">
        <div class="dialog-box__content">
          <div class="content">
            <div class="content-head">
              <span class="blue-title"></span>
              <span class="title-font">补件信息</span>
            </div>
            <div class="content__title clearfix">
              <div class="f__left" v-for="item in renderList" :key="item.code" v-show="item.show">
                <span class="font-gray">{{item.des}}:</span>
                <span class="font-black">{{patchMsg[item.code]}}</span>
              </div>
            </div>
            <div class="product_class clearfix">
              <div class="f__left"><span class="font-gray">产品1： </span><span class="font-black">{{patchMsg.productName1}}</span></div>
              <div class="f__left"><span class="font-gray">产品2： </span><span class="font-black">{{patchMsg.productName2}}</span></div>
            </div>
            <div class="font-black margin-top">
              补件原因:
              <p>易贷客户补充经营信息</p>
            </div>
          </div>
          <div class="content">
            <div class="content-head">
              <span class="blue-title"></span>
              <span class="title-font">补件退回原因</span>
            </div>
            <p class="font-black remark">{{patchMsg.siReturnDesc}}</p>
          </div>
          <div class="content" v-if="!isDispose">
            <div class="content-head">
              <span class="blue-title"></span>
              <span class="title-font">补件处理备注</span>
            </div>
            <p class="font-black remark">{{patchMsg.handlerRemarkDesc}}</p>
          </div>
          <div class="content">
            <div class="content-head">
              <span class="blue-title"></span>
              <span class="title-font">备注</span>
            </div>
            <div v-if="showRemarkForm">
              <el-form :model="ruleForm" :disabled="disabled" v-if="showPending" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="handlerRemarkDesc">
                  <el-input type="textarea" v-model="ruleForm.handlerRemarkDesc"></el-input>
                </el-form-item>
              </el-form>
              <el-form :model="ruleForm" :disabled="disabled && isDisabled" v-if="showReview" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item prop="inspectorRemarkDesc">
                  <el-input type="textarea" v-model="ruleForm.inspectorRemarkDesc"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="content">
            <div class="content-head">
              <span class="blue-title"></span>
              <span class="title-font">补充信息</span>
            </div>
            <div class="dialog-box__form__group">
              <el-form ref="additionalInfoForm" :model="additionalInfo" class="additional_info_form" :rules="additionalInfoRule" :disabled="disabled">
                <el-form-item label="客户类型" prop="careerTypeCode">
                  <el-select v-model="additionalInfo.careerTypeCode" disabled>
                    <el-option :label="item.itemDesc" :value="item.itemCode" v-for="item in customerTypeList" :key="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <!-- 91440300311801489F -->
                <el-form-item label="个人类型" prop="personalTypeCode">
                  <el-select v-model="additionalInfo.personalTypeCode" placeholder="请选择">
                    <el-option :label="item.itemDesc" :value="item.itemCode" v-for="item in personalTypeCdList" :key="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="单位名称" prop="workplaceName">
                  <el-input v-model="additionalInfo.workplaceName"></el-input>
                </el-form-item>
                <el-form-item label="所在部门" prop="departmentName">
                  <el-input v-model="additionalInfo.departmentName"></el-input>
                </el-form-item>
                <el-form-item label="单位性质" prop="organizationTypeCd">
                  <el-select v-model="additionalInfo.organizationTypeCd" placeholder="请选择">
                    <el-option :label="item.itemDesc" :value="item.itemCode" v-for="item in organizationTypeCdList" :key="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="现单位工作年限" prop="presentWorkYearCnt">
                  <el-input v-model="additionalInfo.presentWorkYearCnt"></el-input>
                </el-form-item>
                <el-form-item label="成立日期" prop="foundDate">
                  <el-date-picker
                    v-model="additionalInfo.foundDate"
                    type="date"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="是否注册" prop="registeredInd">
                  <el-switch v-model="additionalInfo.registeredInd"
                      :width="50"
                      active-text="是"
                      inactive-text="否"
                      :active-value="true"
                      :inactive-value="false"
                      :disabled="true"
                      ></el-switch>
                </el-form-item>
                <el-form-item label="占股情况" prop="sharePercent">
                  <el-select v-model="additionalInfo.sharePercent" placeholder="请选择">
                    <el-option :label="item.itemDesc" :value="item.itemCode" v-for="item in sharePercentList" :key="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="职务名称" prop="jobTitle">
                  <el-input v-model="additionalInfo.jobTitle"></el-input>
                </el-form-item>
                <el-form-item label="职务类型" prop="positionTypeCd">
                  <el-select v-model="additionalInfo.positionTypeCd" placeholder="请选择职务类型">
                    <el-option :label="item.itemDesc" :value="item.itemCode" v-for="item in positionTypeCdList" :key="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="工作单位区号" prop="workAreaNum">
                  <el-input v-model="additionalInfo.workAreaNum"></el-input>
                </el-form-item>
                <el-form-item label="单位固话" prop="workPhoneNum">
                  <el-input v-model="additionalInfo.workPhoneNum"></el-input>
                </el-form-item>
                <el-form-item label="单位地址" prop="workAddressCode">
                  <select-cascader v-model="additionalInfo.workAddressCode" :options="regionOptions"></select-cascader>
                </el-form-item>
                <el-form-item label="单位详细地址" prop="workAddressDesc">
                  <el-input v-model="additionalInfo.workAddressDesc"></el-input>
                </el-form-item>
                <el-form-item label="单位邮编" prop="zipcode">
                  <el-input v-model="additionalInfo.zipcode"></el-input>
                </el-form-item>
                <el-form-item label="人事部联系人" prop="hrContactName">
                  <el-input v-model="additionalInfo.hrContactName"></el-input>
                </el-form-item>
                <el-form-item label="人事部联系手机号码" prop="hrContactNum">
                  <el-input v-model="additionalInfo.hrContactNum"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="content form__block bg__white border__radius-5" >
            <el-tabs v-model="activeName" class="tab-box">
              <el-tab-pane v-for="item in patchMsg.orgSpecialInfo" :key="item.sortNum"
                :label="'特殊字段产品' + transformNum(item.sortNum)" :name="transformNum(item.sortNum)">
              </el-tab-pane>
              <!-- <el-tab-pane label="特殊字段产品一" name="first"></el-tab-pane>
              <el-tab-pane label="特殊字段产品二" name="second" v-if="!!creditInfo.productTow"></el-tab-pane> -->
            </el-tabs>
            <!-- <div>{{industryCodeLibrary}}</div> -->
            <div class="dialog-box__form__group margin-top__20" v-show="activeName === transformNum(item.sortNum)"
              v-for="item in patchMsg.orgSpecialInfo" :key="item.sortNum">
              <el-form :model="sliceStr('orgSpecialInfo', item.sortNum)"
                  :rules="sliceStr('orgSpecialInfoRule', item.sortNum)"
                  :ref="`orgSpecialInfo${item.sortNum}Form`"
                  label-width="100px" :disabled="disabled"
                  class="demo-form-inline" label-position="top" >
                  <!-- orgSpecialInfo1Form -->
                <el-form-item label="借款人职业名称" prop="careerCode" class="el-form-item__25" >
                  <el-select
                    :disabled="disabled"
                    v-model="sliceStr('orgSpecialInfo', item.sortNum)['careerCode']"
                    placeholder="请选择借款人职业名称">
                    <el-option
                      v-for="(item,index) in carrerCodeLibrary"
                      :key="index"
                      :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="借款人行业名称" prop="industryCode" class="el-form-item__25" >
                  <el-select
                    :disabled="disabled"
                    v-model="sliceStr('orgSpecialInfo', item.sortNum)['industryCode']"
                    placeholder="请选择借款人行业名称">
                    <el-option
                      v-for="(item,index) in industryCodeLibrary[item.sortNum - 1]"
                      :key="index"
                      :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="贷款用途性质" prop="loanPurposeType" class="el-form-item__25" >
                  <el-select
                    @change="clearValidateName(1)"
                    :disabled="true"
                    v-model="sliceStr('orgSpecialInfo', item.sortNum)['loanPurposeType']"
                    placeholder="请选择贷款用途性质">
                    <el-option
                      v-for="(item) in loanPurposeTypeLibrary"
                      :key="item.itemCode"
                      :label="item.itemDesc"
                      :value="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="贷款用途" prop="loanPurposeCode" class="el-form-item__25" >
                  <el-select
                    @change="loanPurposeCodeChange(sliceStr('orgSpecialInfo', item.sortNum)['loanPurposeCode'], item.sortNum)"
                    v-model="sliceStr('orgSpecialInfo', item.sortNum)['loanPurposeCode']"
                    placeholder="请选择贷款用途" :disabled="true">
                    <el-option
                      v-for="(item,index) in loanPurposeCodeLibrary[item.sortNum - 1]"
                      :key="index"
                      :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="其他贷款用途说明" prop="loanOtherPurpose" class="el-form-item__25"  >
                  <!-- <el-input
                    maxlength="10"
                    :disabled="!(orgSpecialInfo1.loanPurposeCode === dCode.loanPurposeCode.other || orgSpecialInfo1.loanPurposeCode === dCode.loanPurposeCode.other1) || disabled"
                    v-model="sliceStr('orgSpecialInfo', item.sortNum)['loanOtherPurpose']"
                    placeholder="请填写其他贷款用途说明"></el-input> -->
                    <el-input
                    maxlength="10"
                    :disabled="true"
                    v-model="sliceStr('orgSpecialInfo', item.sortNum)['loanOtherPurpose']"
                    placeholder="请填写其他贷款用途说明"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <!-- <div class="dialog-box__form__group margin-top__20" v-show="activeName === 'second'">
              <el-form :model="orgSpecialInfo2"
                      :rules="orgSpecialInfoRule2"
                      ref="orgSpecialInfo2Form"
                      label-width="100px"
                      v-if="creditInfo.productTow"
                      class="demo-form-inline" label-position="top" >
                <el-form-item label="借款人职业名称" prop="careerCode" class="el-form-item__25" >
                  <el-select
                    :disabled="disabled"
                    v-model="orgSpecialInfo2.careerCode"
                    placeholder="请选择借款人职业名称">
                    <el-option
                      v-for="(item) in carrerCodeLibrary"
                      :key="item.itemCode"
                      :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="借款人行业名称" prop="industryCode" class="el-form-item__25" >
                  <el-select
                    :disabled="disabled"
                    v-model="orgSpecialInfo2.industryCode"
                    placeholder="请选择借款人行业名称">
                    <el-option
                      v-for="(item) in industryCodeLibrary[1]"
                      :key="item.itemCode"
                      :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="贷款用途性质" prop="loanPurposeType" class="el-form-item__25" >
                  <el-select
                    @change="clearValidateName(2)"
                    :disabled="disabled"
                    v-model="orgSpecialInfo2.loanPurposeType"
                    placeholder="请选择贷款用途性质">
                    <el-option
                      v-for="(item) in loanPurposeTypeLibrary"
                      :key="item.itemCode"
                      :label="item.itemDesc"
                      :value="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="贷款用途" prop="loanPurposeCode" class="el-form-item__25" >
                  <el-select
                    @change="$refs.orgSpecialInfo2Form.validateField('loanOtherPurpose');if(orgSpecialInfo2.loanPurposeCode !== dCode.loanPurposeCode.other || orgSpecialInfo2.loanPurposeCode !== dCode.loanPurposeCode.other1){orgSpecialInfo2.loanOtherPurpose = ''}"
                    v-model="orgSpecialInfo2.loanPurposeCode"
                    placeholder="请选择贷款用途" :disabled="disabled">
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
                    :disabled="!(orgSpecialInfo2.loanPurposeCode === dCode.loanPurposeCode.other || orgSpecialInfo2.loanPurposeCode === dCode.loanPurposeCode.other1) || disabled" placeholder="请填写其他贷款用途说明"></el-input>
                </el-form-item>
              </el-form>
            </div> -->
            <div class="more-message"></div>
            <special-form
              v-if="specialTemplate1.length > 0"
              v-show="activeName === '一'"
              :render-arr="specialTemplate1"
              form-name="formMore1"
              class="special-form"
              ref="formMore1"
              :set-value="specialData1"
              :has-submit="disabled"
            ></special-form>
            <special-form
              v-if="specialTemplate2.length > 0"
              v-show="activeName === '二'"
              :render-arr="specialTemplate2"
              form-name="formMore2"
              class="special-form"
              ref="formMore2"
              :set-value="specialData2"
              :has-submit="disabled"
            ></special-form>
          </div>
        </div>
        <button class="button__yellow button width200 button__width-200" v-if="!isDispose" :disabled="isDisableBack" @click="alertRT()">退回</button>
        <button class="button__blue button button__width-200" v-if="!isReadonly" @click="submitForm('ruleForm')">提交</button>
      </div>
    </div>
    <commit :applicationId="applicationId" :refresh="refresh" v-if="alertCommit" @clsoe_windowAlert="closeCommit"
     :isDispose="isDispose" :siTaskId="siTaskId" :siBusinessId="siBusinessIdA" :remark="ruleForm.remark" @close_ABC="close_ABC"
     @openPrint="openPrint" />
    <returnA :refresh="refresh" v-if="alertReturn" @clsoe_windowAlert="closeReturn" :siBusinessId="siBusinessId"
     :isDispose="isDispose" :siTaskId="siTaskId" :remark="patchMsg.inspectorRemarkDesc" @close_AB="close_AB"/>
    <printer-pop v-if="showPrinterPop" :applicationId="applicationId" @close="showPrinterPop = false" />
    <printer-commit
      v-if="showPrinterCommit"
      :refresh="refresh"
      :postData="submitData"
      :postCb="postSubmit"
      @close_ABC="close_ABC"
      @close="showPrinterCommit = false"
       />
  </div>
</template>

<script>
import "@common/css/dialog";
import returnA from "../return/index";
import myRules from "@common/js/rules.js";
import { patchApi } from "../../../js/server.js";
import commit from "../commit/index";
import specialForm from "@system/spare/solving/complete_info/complete_customer_info/special_form";
import printerPop from '../../printer-pop';
import printerCommit from '../../printer-commit';
const yearLimit = (rule, value, callback) => {
  const reg = /(^\d{1,2}$)/;
  if (!reg.test(value) && !!value) {
    callback(new Error('请填写正确的工作年限(最大99)'));
  } else {
    callback();
  }
};
const nameLimit = (rule, value, callback) => {
  if (value.length > 15) {
    callback(new Error('最多可输入15个字符'));
  } else {
    callback();
  }
};
export default {
  props: [ 'isReadonly', 'isDispose', 'siTaskId', 'siBusinessId', 'applicationId', 'refresh', 'disabled', 'isDisabled', 'showRemarkForm', 'showPending', 'showReview', 'item' ],
  data() {
    return {
      creditInfo: {},
      changeProduct: false,
      activeName: '一',
      certificateTypeCodeLibrary: [],
      isRedact: true,
      guarantorIndex: '',
      siBusinessIdA: '',
      estate: [], // 房产证下拉
      estateNum: '', // 房产证
      siDetailTxt: [], // 补件内容
      alertReturn: false,
      alertCommit: false,
      showPrinterPop: false,
      showPrinterCommit: false,
      hasSubmit: this.isReadonly,
      ruleForm: {
        remark: ""
      },
      patchMsg: {},
      url: "",
      TabActiveName: "first",
      rules: {
        handlerRemarkDesc: [
          { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
        ],
        inspectorRemarkDesc: [
          { min: 0, max: 200, message: '长度在 0 到 200 个字符', trigger: 'blur' }
        ]
      },
      personalTypeCdList: [],
      organizationTypeCdList: [],
      customerTypeList: [],
      sharePercentList: [],
      positionTypeCdList: [],
      carrerCodeLibrary: [],
      loanPurposeCodeLibrary: [],
      loanPurposeTypeLibrary: [],
      industryCodeLibrary: [],
      industryClass: [],
      regionOptions: [],
      productIdOne: '',
      productIdTwo: '',
      // 证件类型字典
      certificateLibrary: [],
      certificateClass: {},
      renderList: [
        {code: 'applicationId', des: "申请任务号", show: true},
        {code: 'primaryProductName', des: "贷款品种", show: true},
        {code: 'custName', des: "主借款人姓名", show: true},
        {code: 'certificateNum', des: "主借款人证件号码", show: true},
        {code: 'mobileNum', des: "主借款人联系电话", show: true},
        {code: 'subcompanyId', des: "经办机构", show: true},
        {code: 'custManagerName', des: "客户经理姓名", show: false},
        {code: 'assistantName', des: "业务助理姓名", show: true},
        {code: 'custManagerPhoneNum', des: "客户经理联系电话", show: false},
        {code: 'assistantPhoneNum', des: "业务助理联系电话", show: true},
        {code: 'createdDate', des: "下发时间", show: true}
      ],
      additionalInfo: {
        careerTypeCode: '', // 自雇人士
        personalTypeCode: '',
        workplaceName: '',
        departmentName: '',
        organizationTypeCd: '',
        presentWorkYearCnt: '',
        foundDate: '',
        registeredInd: true,
        sharePercent: '',
        jobTitle: '',
        positionTypeCd: '',
        workAreaNum: '',
        workPhoneNum: '',
        workAddressCode: '',
        workAddressDesc: '',
        zipcode: '',
        hrContactName: '',
        hrContactNum: ''
      },
      additionalInfoRule: {
        personalTypeCode: [
          { required: true, message: "请选择个人类型", trigger: "change" }
        ],
        workplaceName: [
          { required: true, message: "请填写单位名称", trigger: "blur" },
          { validator: myRules.nameRule4, trigger: "blur" }
        ],
        departmentName: [
          { required: true, message: "请填写所在部门", trigger: "blur" },
          { validator: myRules.nameRule4, trigger: "blur" }
        ],
        organizationTypeCd: [
          { required: true, message: "请选择单位性质", trigger: "change" }
        ],
        presentWorkYearCnt: [
          { required: true, message: '请填写现工作单位工作年限', 'trigger': 'blur' },
          { validator: yearLimit, trigger: "blur" }
        ],
        foundDate: [
          { required: true, message: '请选择成立日期', 'trigger': 'blur' }
        ],
        sharePercent: [
          { required: true, message: "请选择占股情况", trigger: "change" }
        ],
        jobTitle: [
          { required: true, message: "请填写职务名称", trigger: "blur" },
          { validator: myRules.nameRule4, trigger: "blur" }
        ],
        positionTypeCd: [
          { required: true, message: "请选择职务类型", trigger: "change" }
        ],
        workAreaNum: [
          { required: false, message: '请填写现工作单位区号', 'trigger': 'blur' },
          { validator: myRules.areaNumRule2, trigger: "blur" }
        ],
        workPhoneNum: [
          { required: false, message: '请填写单位固话', 'trigger': 'blur' },
          { validator: myRules.fix_only_phoneRule, trigger: "blur" }
        ],
        workAddressCode: [
          { required: true, message: "请选择单位地址", trigger: "change" }
        ],
        workAddressDesc: [
          { required: true, message: '请填写单位详细地址', 'trigger': 'blur' },
          { validator: myRules.nameRule4, trigger: "blur" }
        ],
        zipcode: [
          { required: true, message: '请填写单位邮编', 'trigger': 'blur' },
          { validator: myRules.postRule, trigger: "blur" }
        ],
        hrContactName: [
          { required: true, message: '请填写人事部联系人', 'trigger': 'blur' },
          { validator: myRules.chineseName, trigger: "blur" },
          { validator: nameLimit, trigger: 'blur' }
        ],
        hrContactNum: [
          { required: true, message: '请填写人事部联系手机号码', 'trigger': 'blur' },
          { validator: myRules.phoneRule, trigger: "blur" }
        ]
      },
      // 特殊字段
      orgSpecialInfo1: {
        careerCode: null,
        industryCode: null,
        loanPurposeType: null,
        loanPurposeCode: null,
        loanOtherPurpose: null,
        orgSpecialFieldList: []
      },
      orgSpecialInfo2: {
        careerCode: null,
        industryCode: null,
        loanPurposeType: null,
        loanPurposeCode: null,
        loanOtherPurpose: null,
        orgSpecialFieldList: []
      },
      orgSpecialInfoRule1: {
        careerCode: [
          { required: true, message: '请选择借款人职业', trigger: 'change' }
        ],
        industryCode: [
          { required: true, message: '请选择借款人行业', trigger: 'change' }
        ],
        loanPurposeType: [
          { required: true, message: '请选择贷款用途性质', trigger: 'change' }
        ],
        loanPurposeCode: [
          { required: true, message: '请选择贷款用途', trigger: 'change' }
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
        loanPurposeType: [
          { required: true, message: '请选择贷款用途性质', trigger: 'change' }
        ],
        loanPurposeCode: [
          { required: true, message: '请选择贷款用途', trigger: 'change' }
        ],
        loanOtherPurpose: [
          { validator: this.checkloanOtherPurpose2, trigger: 'blur' }
        ]
      },
      // 模板
      specialTemplate1: [],
      specialTemplate2: [],
      // 表单字段值
      specialData1: {},
      specialData2: {},
      dCode: this.$getCodeDependent(),
      submitData: {} // 打印提交弹窗待使用数据
    };
  },
  computed: {
    isDisableBack() {
      return !this.item.handlerUserId || this.item.handlerUserId === 'SYS';
    }
  },
  methods: {
    sliceStr(_str, num, _strform) {
      if (_strform) {
        return this[`${_str}${num}${_strform}`];
      }
      return this[`${_str}${num}`];
    },
    loanPurposeCodeChange(_val, formNum) {
      this.$refs[`orgSpecialInfo${formNum}Form`][0].validateField('loanOtherPurpose');
      if (_val !== this.dCode.loanPurposeCode.other || _val !== this.dCode.loanPurposeCode.other1) {
        _val = '';
        this[`orgSpecialInfo${formNum}`].loanOtherPurpose = '';
      }
    },
    checkloanOtherPurpose1(rule, value, callback) {
      const reg = /^[\u4E00-\u9FA5]+$/;
      if ((this.orgSpecialInfo1.loanPurposeCode === this.dCode.loanPurposeCode.other || this.orgSpecialInfo1.loanPurposeCode === this.dCode.loanPurposeCode.other1) && !value) {
        callback(new Error('请填写其他贷款用途说明'));
      } else if ((this.orgSpecialInfo1.loanPurposeCode === this.dCode.loanPurposeCode.other || this.orgSpecialInfo1.loanPurposeCode === this.dCode.loanPurposeCode.other1) && !reg.test(value)) {
        callback(new Error('只能输入汉字'));
      } else {
        callback();
      }
    },
    checkloanOtherPurpose2(rule, value, callback) {
      const reg = /^[\u4E00-\u9FA5]+$/;
      if ((this.orgSpecialInfo2.loanPurposeCode === this.dCode.loanPurposeCode.other || this.orgSpecialInfo2.loanPurposeCode === this.dCode.loanPurposeCode.other1) && !value) {
        callback(new Error('请填写其他贷款用途说明'));
      } else if ((this.orgSpecialInfo2.loanPurposeCode === this.dCode.loanPurposeCode.other || this.orgSpecialInfo2.loanPurposeCode === this.dCode.loanPurposeCode.other1) && !reg.test(value)) {
        callback(new Error('只能输入汉字'));
      } else {
        callback();
      }
    },
    showOrHide(_num1, _num2) {
      this.renderList[_num1].show = true;
      this.renderList[_num2].show = false;
    },
    // 赋值函数
    assignment(_list, _data, _form) {
      _list.forEach(_v => {
        if (_data[_v] === null || _data[_v] === undefined) {
          this[_form][_v] = '';
          return;
        }
        this[_form][_v] = _data[_v];
      });
    },
    // 获取信息
    getPatchReview() {
      return new Promise((resolve, reject) => {
        this.$MyFetch.get(patchApi.selfEmployed.query + this.siTaskId)
          .then(data => {
            let additionalInfoList = Object.keys(this.additionalInfo);
            this.applicationId = data.applicationId;
            this.patchMsg = data;
            this.patchMsg.custManagerName && this.showOrHide(6, 7);
            this.patchMsg.custManagerPhoneNum && this.showOrHide(8, 9);
            this.siDetailTxt = this.patchMsg.siDetailTxt.split('|');
            for (let i = 0; i < this.siDetailTxt.length; i++) {
              this.siDetailTxt[i] = this.siDetailTxt[i].replace(/\n/g, "<br/>");
            }
            // 赋值给additionalInfo
            this.assignment(additionalInfoList, data, 'additionalInfo');
            this.$refs.additionalInfoForm.clearValidate();
            this.getSpecialValue(data);
            if (data.orgSpecialInfo[0]) {
              let sortNum = data.orgSpecialInfo[0].sortNum;
              // this.orgSpecialInfo1 = data.orgSpecialInfo[0];
              this[`orgSpecialInfo${sortNum}`] = data.orgSpecialInfo[0];
              this.productIdOne = data.orgSpecialInfo[0].productId;
              // orgSpecialFieldList1 = this.orgSpecialInfo1.orgSpecialFieldList;
              this.activeName = this.transformNum(sortNum);
              this.$nextTick(() => {
                // this.$refs.orgSpecialInfo1Form[0].clearValidate();
                this.$refs[`orgSpecialInfo${sortNum}Form`][0].clearValidate();
              });
              // 依据所选产品调用对应动态表单模板1
              this.getSpecialApi(this[`orgSpecialInfo${sortNum}`], `specialTemplate${sortNum}`, `specialData${sortNum}`);
            }
            if (data.orgSpecialInfo[1]) {
              this.orgSpecialInfo2 = data.orgSpecialInfo[1];
              this.productIdTwo = data.orgSpecialInfo[1].productId;
              // orgSpecialFieldList2 = this.orgSpecialInfo2.orgSpecialFieldList;
              this.$nextTick(() => {
                this.$refs.orgSpecialInfo2Form[0].clearValidate();
              });
              // 依据所选产品调用对应动态表单模板1
              this.getSpecialApi(this.orgSpecialInfo2, 'specialTemplate2', 'specialData2');
            }
          }).catch(err => {
            this.$error(err.message);
          });
      });
    },
    // 获取下拉菜单
    getLibraryApi(name) {
      let list = ['self_employed_personal_type_cd', 'career_type_code', 'organization_type_cd', 'share_percent', 'position_type_cd', 'career_code', 'loan_purpose_type', 'loan_purpose_code'];
      let data = { categoryCodes: list, getAll: this.isRedact };
      this.$MyFetch.get(patchApi.multipleSelect, data)
        .then(data => {
          this.customerTypeList = data.career_type_code;
          this.personalTypeCdList = data.self_employed_personal_type_cd;
          this.carrerCodeLibrary = data.career_code;
          this.loanPurposeTypeLibrary = data.loan_purpose_type;
          this.organizationTypeCdList = data.organization_type_cd;
          this.positionTypeCdList = data.position_type_cd;
          this.sharePercentList = data.share_percent;
        }).catch(err => {
          console.log(err);
        });
    },
    // 获取特定下拉字段
    getSpecialValue(data) {
      // 行业字典获取
      data.orgSpecialInfo.forEach((v, index) => {
        this.$MyFetch.get(patchApi.selfEmployed.getIndustryCode + this.applicationId + '/' + v.productId + '/')
          .then(data => {
            console.log(v);
            this.$set(this.industryCodeLibrary, v.sortNum - 1, data);
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
      // 贷款用途字典获取
      data.orgSpecialInfo.forEach((v, index) => {
        this.$MyFetch.get(patchApi.selfEmployed.getLoanPurpose + this.applicationId + '/' + v.productId + '/')
          .then(data => {
            console.log(data, '贷款用途');
            this.$set(this.loanPurposeCodeLibrary, v.sortNum - 1, data);
          })
          .catch(err => {
            this.confirmFn(err.message, 'error');
          });
      });
    },
    transformNum(_num) {
      let list = ['', '一', '二'];
      return list[_num];
    },
    checkForm(_name) {
      let flag = true;
      let formEle = this.$refs[_name];
      if (formEle) {
        if (formEle instanceof Array) {
          formEle = this.$refs[_name][0];
        }
        formEle.validate((_valid) => {
          flag = _valid;
        });
      }
      return flag;
    },
    // 获取renderList里的code
    mapRenderList(list) {
      return this[list].map(_item => {
        return _item.code;
      });
    },
    /**
     * @param {Number} 第几个特殊字段的表单
     * @returns {Array} 获取特殊字段动态表单里的值
     */
    getSpecialFormData(num) {
      let str = 'formMore' + num;
      let list = [];
      Object.keys(this.$refs[str].formData).forEach(_v => {
        if (_v.indexOf('_cascader') !== -1) {
          return;
        }
        list.push({
          orgItemCode: _v,
          orgItemVal: this.$refs[str].formData[_v]
        });
      });
      return list;
    },
    submitForm(formName) {
      let submitData = {
        orgSpecialInfo: [],
        siBusinessId: this.siBusinessId,
        siTaskId: this.siTaskId,
        handlerRemarkDesc: this.ruleForm.handlerRemarkDesc,
        inspectorRemarkDesc: this.ruleForm.inspectorRemarkDesc
      };
      let list = this.mapRenderList('renderList');
      let formList = ['additionalInfoForm', 'orgSpecialInfo1Form', 'orgSpecialInfo2Form', 'ruleForm'];
      // 赋值
      list.forEach(_item => { submitData[_item] = this.patchMsg[_item]; });
      Object.assign(submitData, this.additionalInfo);
      if (this.$refs['orgSpecialInfo1Form']) {
        // 特殊字段里的动态表单
        if (this.specialTemplate1.length > 0) {
          formList.push('formMore1');
          this.orgSpecialInfo1.orgSpecialFieldList = this.getSpecialFormData(1);
        }
        submitData.orgSpecialInfo.push(this.orgSpecialInfo1);
      }
      if (this.$refs['orgSpecialInfo2Form']) {
        if (this.specialTemplate2.length > 0) {
          formList.push('formMore2');
          this.orgSpecialInfo2.orgSpecialFieldList = this.getSpecialFormData(2);
        }
        submitData.orgSpecialInfo.push(this.orgSpecialInfo2);
      }
      console.log(submitData);
      // 表单校验
      for (let i = 0; i <= formList.length; i++) {
        if (!this.checkForm(formList[i])) {
          return;
        }
      }
      this.$confirm('是否确认提交该笔数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.postSubmitPrinter(submitData);
      }).catch(() => {
        // this.confirmFn(error.message, 'error');
      });
    },
    postSubmitPrinter(_data) {
      if (this.showReview) { // 补件复核提交
        this.$MyFetch.post(patchApi.print.queryPrintStatus, {
          applicationId: this.applicationId
        }).then((sdata) => {
          if (sdata === true) { // 已打印
            this.postSubmit(_data);
          } else {
            this.submitData = _data;
            this.openPrint();
          }
        }).catch(err => {
          this.$error(err.message, 'error');
        });
      } else {
        this.postSubmit(_data);
      }
    },
    postSubmit(_data) {
      let url = this.showReview ? patchApi.review.submit : patchApi.selfEmployed.submit;
      if (this.showReview) {
        let param = {
          siTaskId: this.siTaskId,
          inspectorRemarkDesc: this.ruleForm.inspectorRemarkDesc,
          siBusinessId: this.siBusinessId
          // siTaskId: this.siTaskId
        };
        this.$MyFetch.get(url, param)
          .then(data => {
            this.refresh(1, 10);
            this.close_();
          })
          .catch(err => {
            this.$error(err.message, 'error');
          });
      } else {
        this.$MyFetch.post(url, _data).then(_res => {
          this.close_();
          this.refresh(1, 10);
        }).catch(_err => {
          this.confirmFn(_err.message, 'error');
          console.log(_err);
        });
      }
    },
    // 影像
    showimg() {
      let selectProductId;
      if (!(this.productIdOne && this.productIdTwo)) {
        // 只有一个的时候
        selectProductId = this.productIdOne;
      }
      if (this.isDispose) {
        if (this.isReadonly) {
           this.$showImage(this.applicationId, "补件处理", {ReadOnly: '0', selectProductId});
          // this.$showImage(this.applicationId, "补件处理");
        } else {
          this.$showImage(this.applicationId, "补件处理", {selectProductId});
        }
      } else {
        this.$showImage(this.applicationId, "补件复核", {selectProductId});
      }
    },
    // 退回
    close_AB() {
      this.closeReturn();
      this.close_();
    },
    alertRT() {
      this.alertReturn = true;
    },
    closeReturn() {
      this.alertReturn = false;
    },
    close_ABC() {
      this.close_();
    },
    // 提交
    commit() {
      this.alertCommit = true;
    },
    closeCommit() {
      this.alertCommit = false;
    },
    // 获取下拉特殊字段数据
    getSpecialApi(orgSpecialInfo, templateName, specialDataName) {
      let orgSpecialFieldList = orgSpecialInfo.orgSpecialFieldList;
      // 回显特殊字段
      if (orgSpecialFieldList instanceof Array && orgSpecialFieldList.length > 0) {
        orgSpecialFieldList.forEach(v => {
          this.$set(this[specialDataName], v.orgItemCode, v.orgItemVal);
        });
      }
      // 获取动态表单模板
      this.$MyFetch.post(patchApi.selfEmployed.specialInfo, {
          applicationId: this.applicationId,
          productId: orgSpecialInfo.productId
        }).then(res => {
          // 动态表单里需要渲染的项
          this[templateName] = [...res.orgSpecialColumnList];
        }).catch(err => {
          this.confirmFn(err.message, 'error');
        });
    },
    // 获取房产证号
    getEstate() {
      let data = {
        applicationId: this.applicationId
      };
      this.$MyFetch.get(patchApi.dispose.estate, data)
      .then(data => {
        // console.log(data);
        if (data) {
          this.estate = JSON.parse(JSON.stringify(data.list));
          console.log(data.list, 'aaa');
        }
        // console.log(data.list);
      })
      .catch(err => {
        this.$error(err.message);
      });
    },
    // 获取对应字典项目
    getLibraryValue(library, key) {
      return library[key];
    },
    close_() {
      this.$emit("clsoe_windowAlert");
    },
    SectionToChinese(section) {
      let chnNumChar = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九"
      ];
      // let chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
      let chnUnitChar = ["", "十", "百", "千"];
      let strIns = "";
      let chnStr = "";
      let unitPos = 0;
      let zero = true;
      while (section > 0) {
        let v = section % 10;
        if (v === 0) {
          if (!zero) {
            zero = true;
            chnStr = chnNumChar[v] + chnStr;
          }
        } else {
          zero = false;
          strIns = chnNumChar[v];
          strIns += chnUnitChar[unitPos];
          chnStr = strIns + chnStr;
        }
        unitPos++;
        section = Math.floor(section / 10);
      }
      return chnStr;
    },
    openPrint() {
      this.closeCommit();
      this.showPrinterCommit = true;
    }
  },
  created() {
    this.isRedact = !(!this.isReadonly && this.isDispose);
    this.siBusinessIdA = this.siBusinessId;
    this.getEstate();
    this.getPatchReview();
    this.getLibraryApi();
    this.getArea().then(res => {
      this.regionOptions = res;
    });
  },
  components: {
    commit,
    returnA,
    specialForm,
    printerPop,
    printerCommit
  }
};
</script>
<style lang="less">
  .content {
    > .dialog-box__form__group {
      > .el-form.additional_info_form > .el-form-item > label{
        float: none;
      }
    }
  }
</style>

<style lang="less" scoped>
.easy_loan_self {
  .height50{
    height: 50px;
  }
  .dialog-box {
    width: 1200px;
    height: 650px;
    .dialog-box__top {
      .product-title-img {
        > img {
          width: 20px;
          height: 20px;
          // margin: 10px auto;
          position: absolute;
          right: 100px;
          top: 20px;
        }
      }
      .dialog-box-group {
        position: absolute;
        right: 40px;
        top: 0;
      }
      .product-printer {
        position: absolute;
        top: 3px;
        right: 140px;
        font-size: 14px;
        color: #409eff;
        text-decoration: none;
      }
    }
    .dialog-box__bottom {
      height: 580px;
      .dialog-box__content {
        text-align: left;
        overflow: scroll;
        height: 90%;
        .content {
          // width: 100%;
          .margin-top {
            margin-top: 20px;
          }
          background: #ffffff;
          .boxShadow(20px, 30px);
          border-radius: 4px;
          margin: 20px 30px;
          .content-head {
            border-bottom: 1px solid #d0d0d0;
            padding-bottom: 20px;
            .blue-title {
              display: inline-block;
              background: #538bf1;
              width: 2px;
              height: 16px;
              // border: 1px solid #538bf1;
            }
            .title-font {
              font-weight: bold;
              font-size: 16px;
              color: #333333;
            }
          }
          .el-form.additional_info_form {
            margin-top: 10px;
            > .el-form-item {
              width: 20%;
            }
          }
          .content__title {
            width: 1072px;
            font-size: 0;
          }
          .content__title > div, .product_class > div {
            width: 268px;
            margin-top: 20px;
          }
          .product_class > div {
            width: 50%;
          }
          .head-title {
            font-size: 12px;
            color: #333333;
            letter-spacing: 0;
          }
          .font____{
              font-size: 14px;
              margin-top: 10px;
            }
          .dialog__table-box .customer-message {
            position: relative;
          }
          .dialog__table-box {
            /deep/.table__form-item {
              margin: 0 10px;
            }
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
              /deep/ .el-tabs__nav-wrap {
                padding: 0;
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
          /deep/.el-textarea__inner {
            background: #ececec;
            border: 1px solid #d0d0d0;
            border-radius: 4px;
            width: 1068px;
            height: 120px;
            resize: none;
            margin: 20px 0;
          }
          .remark{
            margin-top: 10px;
          }
        }
      }
      .button__blue {
        color: white;
        height: 40px;
      }
    }
    .strong {
      font-weight: bold;
    }
    .font-gray {
      font-size: 14px;
      color: #666;
    }
    .font-black {
      font-size: 14px;
      color: #151515;
      line-height: 20px;
    }
  }
}
/deep/ .table__th {
  width: 14.3%;
}
/deep/ .table__td {
  width: 14.3%;
}
/deep/ .dialog-mask {
  z-index: 1001;
}
/deep/ .el-form {
  text-align: left;
}
.easy_loan_self /deep/ .button__yellow:disabled {
  background-color: #c39850;
  cursor: not-allowed;
}
</style>
