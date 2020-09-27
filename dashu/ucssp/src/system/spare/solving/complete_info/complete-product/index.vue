<template>
  <div class="complete-product">
    <div class="dialog-box__middle-form">
      <el-form
        :model="customerInfo"
        :rules="customerRule"
        ref="customerInfo"
        label-width="100px"
        class="demo-form-inline"
        label-position="top"
      >
        <div class="form__block bg__white border__radius-5">
          <div class="dialog-box__middle-top">
            <h5 class="title">
              <span class="icon icon__gan"></span>基本信息
            </h5>
          </div>
          <ul class="message__list clearfix">
            <li class="f__left item">
              <h5 class="title">姓名:</h5>
              <p class="content">{{customerInfo.custName}}</p>
            </li>
            <li class="f__left item">
              <h5 class="title">手机号:</h5>
              <p class="content">{{ customerInfo.mobileNum}}</p>
            </li>
            <li class="f__left item">
              <h5 class="title">身份证号:</h5>
              <p class="content">{{ customerInfo.certificateNum }}</p>
            </li>
            <li class="f__left item">
              <h5 class="title">授权原因:</h5>
              <p class="content">{{ customerInfo.authReasonName }}</p>
            </li>
            <li class="f__left item" v-if="easyLoanFlag">
              <h5 class="title">审批模式:</h5>
              <p class="content">
                <el-select v-model="customerInfo.approveModeCd" placeholder="请选择" :disabled="isReadonly||!!hasSubmit">
                  <el-option
                    v-for="(item, index) in approalArr"
                    :key="index"
                    :label="item.itemDesc"
                    :value="item.itemCode"
                  ></el-option>
                </el-select>
              </p>
            </li>
            <li class="f__left item" v-if="easyLoanFlag">
              <h5 class="title">是否经营补件:</h5>
              <p class="content">
                <el-select v-model="customerInfo.isBusinessPatch" style="width: 90px" placeholder="请选择" :disabled="isReadonly||!!hasSubmit">
                  <el-option label="是" :value="true"></el-option>
                  <el-option label="否" :value="false"></el-option>
                </el-select>
              </p>
            </li>
          </ul>
          <div class="dialog-box__form__group">
            <el-form-item label="人物性别">
              <el-radio-group v-model="customerInfo.genderCode" :disabled="!!hasSubmit">
                <el-radio-button
                  v-for="(item, index) in genderCodeLibrary"
                  :key="index"
                  :label="item.itemCode"
                  :disabled="customerInfo.genderCode !== item.itemCode"
                >{{item.itemDesc}}</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="婚姻状况" prop="maritalStatusCode" class="width355">
              <el-select
                v-model="customerInfo.maritalStatusCode"
                placeholder="请选择"
                :disabled="!!hasSubmit"
              >
                <el-option
                  v-for="(item, index) in maritalLibrary"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="户籍地址" prop="registeredAddressCode" class="width355">
              <el-cascader
                :options="options"
                v-model="customerInfo.registeredAddressCode"
                :disabled="!!hasSubmit"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="户籍详细地址" prop="registeredAddressDesc" class="width355">
              <el-input
                v-model="customerInfo.registeredAddressDesc"
                maxlength="100"
                :disabled="!!hasSubmit"
              ></el-input>
            </el-form-item>
            <el-form-item label="有无本地房产" class="margin__0">
              <el-switch
                v-model="customerInfo.localEstateInd"
                :width="50"
                active-text="有"
                inactive-text="无"
                :active-value="true"
                :inactive-value="false"
                :disabled="!!hasSubmit"
              ></el-switch>
            </el-form-item>
            <el-form-item label="居住状况" prop="houseConditionCode" class="el-form-item__33">
              <el-select
                v-model="customerInfo.houseConditionCode"
                placeholder="请选择"
                :disabled="!!hasSubmit"
              >
                <el-option
                  v-for="(item, index) in houseConditionLibrary"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="身份证签发机关" prop="certificateGrantorName" class="el-form-item__33">
              <el-input v-model="customerInfo.certificateGrantorName" :disabled="!!hasSubmit"></el-input>
            </el-form-item>
            <el-form-item label="居住地址" prop="houseAddressCode" class="el-form-item__33">
              <el-cascader
                clearable
                :options="options"
                v-model="customerInfo.houseAddressCode"
                :disabled="!!hasSubmit"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="居住详细地址" prop="houseAddressDesc" class="el-form-item__33">
              <el-input
                v-model="customerInfo.houseAddressDesc"
                maxlength="100"
                :disabled="!!hasSubmit"
              ></el-input>
            </el-form-item>
            <el-form-item label="单位名称" prop="workplaceName" class="el-form-item__33">
              <el-input
                v-model="customerInfo.workplaceName"
                maxlength="100"
                :disabled="!!hasSubmit"
              ></el-input>
            </el-form-item>
            <el-form-item label="单位地址" prop="workAddressCode" class="el-form-item__33">
              <el-cascader
                :options="options"
                v-model="customerInfo.workAddressCode"
                :disabled="!!hasSubmit"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="客户类型" prop="careerTypeCode" class="el-form-item__33">
              <el-select
                @change="removeValue"
                v-model="customerInfo.careerTypeCode"
                placeholder="请选择"
                :disabled="!!hasSubmit"
              >
                <el-option
                  v-for="(item, index) in careerLibrary"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="占股情况" prop="sharePercent" class="el-form-item__33">
              <el-select
                clearable
                v-model="customerInfo.sharePercent"
                placeholder="请选择"
                :disabled="!!hasSubmit || (!customerInfo.registeredInd)"
              >
                <el-option
                  v-for="(item, index) in sharePercentLibrary"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="成立日期" prop="foundDate" class="el-form-item__33">
              <el-date-picker
                :editable="false"
                v-model="customerInfo.foundDate"
                type="date"
                value-format="timestamp"
                :disabled="!!hasSubmit || (customerInfo.careerTypeCode !== dCode.careerTypeCode.boss) || !customerInfo.registeredInd"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
            <div class="el-form-item__33">
              <el-form-item label="6个月内是否正常缴纳公积金" prop="delivery">
                <el-switch
                  v-model="customerInfo.houseFund6mInd"
                  :width="50"
                  active-text="是"
                  inactive-text="否"
                  :disabled="!!hasSubmit"
                  :active-value="true"
                  :inactive-value="false"
                ></el-switch>
              </el-form-item>
              <el-form-item label="是否注册" prop="delivery">
                <el-switch
                  v-model="customerInfo.registeredInd"
                  @change="customerInfo.sharePercent = null; customerInfo.foundDate = null"
                  :width="50"
                  active-text="是"
                  inactive-text="否"
                  :disabled="!!hasSubmit || (customerInfo.careerTypeCode !== this.dCode.careerTypeCode.boss)"
                  :active-value="true"
                  :inactive-value="false"
                ></el-switch>
              </el-form-item>
            </div>
            <el-form-item label="定价方案" prop="pricingPlanCode" class="el-form-item__33">
              <el-select
                v-model="customerInfo.pricingPlanCode"
                placeholder="请选择"
                :disabled="!!hasSubmit"
              >
                <el-option
                  v-for="(item, index) in pricingPlanLibrary"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
        <div class="form__block bg__white border__radius-5">
          <div class="dialog-box__middle-top">
            <h5 class="title">
              <span class="icon icon__gan"></span>详细信息
            </h5>
          </div>
          <ul class="table__list">
            <!-- 保单模块 -->
            <li class="item" v-if="!easyLoanFlag">
              <el-form-item label="是否有保单" required>
                <el-radio-group v-model="customerInfo.insurancePolicyInd" :disabled="!!hasSubmit">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <transition name="fade">
                <div class="dialog__table-box" v-if="customerInfo.insurancePolicyInd">
                  <div class="dialog__table-form-box">
                    <ul class="table__box">
                      <li class="table__head">
                        <ul class="table__tr">
                          <li class="table__th">寿险公司</li>
                          <li class="table__th">主险名称</li>
                          <li class="table__th">保单号</li>
                          <li class="table__th">生效日期</li>
                          <li class="table__th">保单状态</li>
                          <li class="table__th">缴费方式</li>
                          <li class="table__th">期缴保费</li>
                          <li class="table__th">年缴保费</li>
                          <li class="table__th">应缴次数</li>
                          <li class="table__th">缴费次数</li>
                          <li class="table__th">两年内变更投保人</li>
                          <li class="table__th">保单是否有效</li>
                          <li class="table__th">操作</li>
                        </ul>
                      </li>
                      <li class="table__body">
                        <div class="table__tr" v-for="(item, index) in policyList" :key="index">
                          <ul class="table__tr__top-list" v-show="!item.showFormEle">
                            <li class="table__td">{{policyCompanyName(item.insuranceCompanyCode)}}</li>
                            <li class="table__td">{{item.mainRiskName}}</li>
                            <li class="table__td">{{item.policyNum}}</li>
                            <li class="table__td">{{getTime(item.effectiveDate)}}</li>
                            <li
                              class="table__td"
                            >{{(item.policyStatusInd)?'有效': (item.policyStatusInd === null ? '' : '其他')}}</li>
                            <li class="table__td">{{paymentModeCodeClass[item.paymentModeCode]}}</li>
                            <li class="table__td">{{item.premiumCycleAmt}}元</li>
                            <li class="table__td">{{item.premiumAnnualAmt}}元</li>
                            <li class="table__td">{{item.premiumTermCnt}}</li>
                            <li class="table__td">{{item.premiumTimesCnt}}</li>
                            <li class="table__td">{{item.holderSwitchInd ? '是' : '否'}}</li>
                            <li class="table__td">{{item.availableInd ? '是' : '否'}}</li>
                            <li class="table__td">
                              <div class="operate-box" v-if="!hasSubmit">
                                <i
                                  class="icon el-icon-plus cursor__pointer"
                                  v-show="index === (policyList.length-1) && !policyEditDg"
                                  @click="openAddPolicy"
                                ></i>
                                <i
                                  class="icon el-icon-minus cursor__pointer"
                                  @click="deletePolicy(item.id)"
                                ></i>
                                <i
                                  class="icon icon__edit cursor__pointer"
                                  @click="editPolicyELe(item)"
                                ></i>
                              </div>
                            </li>
                          </ul>
                          <el-form
                            :model="policyEdit"
                            :rules="policyRule"
                            :ref="'policyEditForm' + index"
                            label-width="100px"
                            class="demo-form-inline"
                            label-position="top"
                            v-if="item.showFormEle"
                          >
                            <div class="table__tr__bottom-list">
                              <el-form-item
                                label
                                prop="insuranceCompanyCode"
                                class="table__form-item"
                              >
                                <el-select
                                  v-model="policyEdit.insuranceCompanyCode"
                                  placeholder="请选择"
                                >
                                  <el-option
                                    v-for="(item, index) in policyCompanyList"
                                    :label="item.itemDesc"
                                    :value="item.itemCode"
                                    :key="index"
                                  ></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label prop="mainRiskName" class="table__form-item">
                                <el-input v-model="policyEdit.mainRiskName" maxlength="50"></el-input>
                              </el-form-item>
                              <el-form-item label prop="policyNum" class="table__form-item">
                                <el-input v-model="policyEdit.policyNum" maxlength="30"></el-input>
                              </el-form-item>
                              <el-form-item label prop="effectiveDate" class="table__form-item">
                                <el-date-picker
                                  :editable="false"
                                  v-model="policyEdit.effectiveDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  placeholder="选择日期"
                                ></el-date-picker>
                              </el-form-item>
                              <el-form-item label prop="policyStatusInd" class="table__form-item">
                                <el-select v-model="policyEdit.policyStatusInd" placeholder="请选择">
                                  <el-option label="有效" :value="true"></el-option>
                                  <el-option label="其他" :value="false"></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label prop="paymentModeCode" class="table__form-item">
                                <el-select v-model="policyEdit.paymentModeCode" placeholder="请选择">
                                  <el-option
                                    v-for="(item, index) in paymentModeCodeLibrary"
                                    :key="index"
                                    :label="item.itemDesc"
                                    :value="item.itemCode"
                                  ></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label prop="premiumCycleAmt" class="table__form-item">
                                <el-input
                                  @blur="formatMoney('policyEdit', 'premiumCycleAmt')"
                                  v-model="policyEdit.premiumCycleAmt"
                                  maxlength="8"
                                ></el-input>
                              </el-form-item>
                              <el-form-item label class="table__form-item">
                                <el-input v-model="premiumAnnualAmt" readonly></el-input>
                              </el-form-item>
                              <el-form-item label prop="paymentTermCnt" class="table__form-item">
                                <el-input v-model="premiumTermCnt" readonly></el-input>
                              </el-form-item>
                              <el-form-item label prop="premiumTimesCnt" class="table__form-item">
                                <el-input v-model="policyEdit.premiumTimesCnt" maxlength="3"></el-input>
                              </el-form-item>
                              <el-form-item class="table__form-item text__center">
                                <el-switch
                                  v-model="policyEdit.holderSwitchInd"
                                  :width="50"
                                  :active-value="true"
                                  :inactive-value="false"
                                ></el-switch>
                              </el-form-item>
                              <el-form-item class="table__form-item text__center">
                                <el-switch
                                  v-model="isPolicyEffective"
                                  :width="50"
                                  :active-value="true"
                                  :inactive-value="false"
                                  disabled
                                ></el-switch>
                              </el-form-item>
                              <div class="operate-box text__center" v-if="!hasSubmit">
                                <i
                                  class="icon el-icon-check cursor__pointer"
                                  @click="saveEditPolicy('policyEditForm' + index, item)"
                                ></i>
                                <i
                                  class="icon el-icon-minus cursor__pointer"
                                  @click="closeEditPolicy(item)"
                                ></i>
                              </div>
                            </div>
                          </el-form>
                        </div>
                      </li>
                      <li class="table__body" v-if="policyList.length === 0 || policyEditDg">
                        <div class="table__tr">
                          <el-form
                            :model="policyEdit"
                            :rules="policyRule"
                            ref="policyAddForm"
                            label-width="100px"
                            class="demo-form-inline"
                            label-position="top"
                          >
                            <div class="table__tr__bottom-list">
                              <el-form-item
                                label
                                prop="insuranceCompanyCode"
                                class="table__form-item"
                              >
                                <el-select
                                  v-model="policyEdit.insuranceCompanyCode"
                                  placeholder="请选择"
                                >
                                  <el-option
                                    v-for="(item, index) in policyCompanyList"
                                    :label="item.itemDesc"
                                    :value="item.itemCode"
                                    :key="index"
                                  ></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label prop="mainRiskName" class="table__form-item">
                                <el-input v-model="policyEdit.mainRiskName" maxlength="50"></el-input>
                              </el-form-item>
                              <el-form-item label prop="policyNum" class="table__form-item">
                                <el-input v-model="policyEdit.policyNum" maxlength="30"></el-input>
                              </el-form-item>
                              <el-form-item label prop="effectiveDate" class="table__form-item">
                                <el-date-picker
                                  :editable="false"
                                  v-model="policyEdit.effectiveDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  placeholder="选择日期"
                                ></el-date-picker>
                              </el-form-item>
                              <el-form-item label prop="policyStatusInd" class="table__form-item">
                                <el-select v-model="policyEdit.policyStatusInd" placeholder="请选择">
                                  <el-option label="有效" :value="true"></el-option>
                                  <el-option label="其他" :value="false"></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label prop="paymentModeCode" class="table__form-item">
                                <el-select v-model="policyEdit.paymentModeCode" placeholder="请选择">
                                  <el-option
                                    v-for="(item, index) in paymentModeCodeLibrary"
                                    :key="index"
                                    :label="item.itemDesc"
                                    :value="item.itemCode"
                                  ></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label prop="premiumCycleAmt" class="table__form-item">
                                <el-input
                                  @blur="formatMoney('policyEdit', 'premiumCycleAmt')"
                                  v-model="policyEdit.premiumCycleAmt"
                                ></el-input>
                              </el-form-item>
                              <el-form-item label class="table__form-item">
                                <el-input v-model="premiumAnnualAmt" readonly></el-input>
                              </el-form-item>
                              <el-form-item label prop="paymentTermCnt" class="table__form-item">
                                <el-input v-model="premiumTermCnt" readonly></el-input>
                              </el-form-item>
                              <el-form-item label prop="premiumTimesCnt" class="table__form-item">
                                <el-input v-model="policyEdit.premiumTimesCnt" maxlength="3"></el-input>
                              </el-form-item>
                              <el-form-item class="table__form-item text__center">
                                <el-switch
                                  v-model="policyEdit.holderSwitchInd"
                                  :width="50"
                                  :active-value="true"
                                  :inactive-value="false"
                                ></el-switch>
                              </el-form-item>
                              <el-form-item class="table__form-item text__center">
                                <el-switch
                                  v-model="isPolicyEffective"
                                  :width="50"
                                  :active-value="true"
                                  :inactive-value="false"
                                  disabled
                                ></el-switch>
                              </el-form-item>
                              <div class="operate-box text__center" v-if="!hasSubmit">
                                <i class="icon el-icon-check cursor__pointer" @click="addPolicy"></i>
                                <i
                                  class="icon el-icon-minus cursor__pointer"
                                  @click="closeAddPolicy"
                                ></i>
                              </div>
                            </div>
                          </el-form>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </transition>
            </li>
            <!-- 房产模块 -->
            <li class="item">
              <el-form-item label="是否有房" required>
                <el-radio-group v-model="customerInfo.estateInd" :disabled="!!hasSubmit">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <transition name="fade">
                <div class="dialog__table-box customer-message" v-if="customerInfo.estateInd">
                  <el-tabs v-model="TabActiveName" class="tab-box">
                    <el-tab-pane label="房产信息" name="first"></el-tab-pane>
                    <el-tab-pane label="担保人信息" name="second"></el-tab-pane>
                  </el-tabs>
                  <span
                    class="button font__blue add__btn"
                    @click="openMessageBox"
                    v-if="!hasSubmit"
                  >
                    <span class="icon icon__add">+</span>新增
                  </span>
                  <transition name="fade">
                    <div class="dialog__table-box" v-show="TabActiveName === 'first'">
                      <table>
                        <thead>
                          <tr>
                            <th>房产证号</th>
                            <th>房产证地址</th>
                            <th>房产详细地址</th>
                            <th>房屋性质</th>
                            <th>持有房产日期</th>
                            <th>是否抵押</th>
                            <th>共有产权人数</th>
                            <th>借款人产权份额</th>
                            <th>面积</th>
                            <th>均价</th>
                            <th>人工录入均价</th>
                            <th>操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in houseList" :key="index">
                            <td>{{item.estateNum}}</td>
                            <td>{{getAddressStr(item.addressCode, options)}}</td>
                            <td>{{item.addressDesc}}</td>
                            <td>{{houseClass[item.estateTypeCode]}}</td>
                            <td>{{getTime(item.obtainDate)}}</td>
                            <td>{{item.mortgageInd ? '是': '否'}}</td>
                            <td>{{item.coownersCnt}}</td>
                            <td>{{item.propertySharePercent}}%</td>
                            <td>{{item.houseSizeMeas}}平方米</td>
                            <td>{{item.slAverageAmt}}</td>
                            <td>{{item.inputAverageAmt}}</td>
                            <td>
                              <div class="operate-box">
                                <i
                                  class="icon el-icon-minus cursor__pointer"
                                  @click="deleteHouseMessage(item.id)"
                                  v-if="!hasSubmit"
                                ></i>
                                <i
                                  class="icon icon__edit cursor__pointer"
                                  @click="openMessageBox(item)"
                                ></i>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="no-data" v-if="houseList.length === 0">
                        <p class="text__center">~暂无数据</p>
                      </div>
                    </div>
                  </transition>
                  <transition name="fade">
                    <div class="dialog__table-box" v-show="TabActiveName === 'second'">
                      <table>
                        <thead>
                          <tr>
                            <th>担保人编号</th>
                            <th>担保人姓名</th>
                            <th>证件类型</th>
                            <th>证件号码</th>
                            <th>担保人手机号</th>
                            <th>单位联系人姓名</th>
                            <th>操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item, index) in guarantorList" :key="index">
                            <td>{{item.id}}</td>
                            <td>{{item.guaranteeName}}</td>
                            <td>{{certificateClass[item.certificateTypeCode]}}</td>
                            <td>{{item.certificateNum}}</td>
                            <td>{{item.contactNum}}</td>
                            <td>{{item.workContractName}}</td>
                            <td>
                              <div class="operate-box">
                                <i
                                  class="icon el-icon-minus cursor__pointer"
                                  @click="deleteGuarantor(item.id)"
                                  v-if="!hasSubmit"
                                ></i>
                                <i
                                  class="icon icon__edit cursor__pointer"
                                  @click="openMessageBox(item)"
                                ></i>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div class="no-data" v-if="guarantorList.length === 0">
                        <p class="text__center">~暂无数据</p>
                      </div>
                    </div>
                  </transition>
                </div>
              </transition>
            </li>
            <!-- 车贷模块 -->
            <li class="item" v-if="!easyLoanFlag">
              <el-form-item label="是否有信用卡车供" required>
                <el-radio-group v-model="customerInfo.carloanInd" :disabled="!!hasSubmit">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <transition name="fade">
                <div class="dialog__table-box" v-if="customerInfo.carloanInd">
                  <div class="dialog__table-form-box">
                    <ul class="table__box">
                      <li class="table__head">
                        <ul class="table__tr">
                          <li class="table__th">贷款发放银行</li>
                          <li class="table__th">贷款发放金额</li>
                          <li class="table__th">贷款发放日期</li>
                          <li class="table__th">贷款到期日期</li>
                          <li class="table__th">第一期还款日期</li>
                          <li class="table__th">贷款状态</li>
                          <li class="table__th">贷款结清日期</li>
                          <li class="table__th">贷款月还金额</li>
                          <li class="table__th">车贷是否有效</li>
                          <li class="table__th">操作</li>
                        </ul>
                      </li>
                      <li class="table__body">
                        <div class="table__tr" v-for="(item, index) in carList" :key="index">
                          <ul class="table__tr__top-list" v-show="!item.showFormEle">
                            <li class="table__td">{{item.bankCode}}</li>
                            <li class="table__td">{{item.loanAmt}}元</li>
                            <li class="table__td">{{getTime(item.loanDate)}}</li>
                            <li class="table__td">{{getTime(item.dueDate)}}</li>
                            <li class="table__td">{{getTime(item.firstRepaymentDate)}}</li>
                            <li
                              class="table__td"
                            >{{(item.loanStatusCode === dCode.loanStatusCode.normal) ? '正常' : '结清'}}</li>
                            <li class="table__td">{{getTime(item.settlementDate)}}</li>
                            <li class="table__td">{{item.monthlyRepaymentAmt}}元</li>
                            <li
                              class="table__td"
                            >{{(item.availableInd === null) ? '/' : (item.availableInd ? '是' : '否')}}</li>
                            <li class="table__td">
                              <div class="operate-box" v-if="!hasSubmit">
                                <i
                                  class="icon el-icon-plus cursor__pointer"
                                  @click="openAddCar"
                                  v-if="index  === (carList.length -1) && !carEditDg"
                                ></i>
                                <i
                                  class="icon el-icon-minus cursor__pointer"
                                  @click="deleteCar(item.id)"
                                ></i>
                                <i
                                  class="icon icon__edit cursor__pointer"
                                  @click="editCarELe(item)"
                                ></i>
                              </div>
                            </li>
                          </ul>
                          <el-form
                            :model="carEdit"
                            :rules="carRule"
                            :ref="'carEditForm' + index"
                            class="demo-form-inline"
                            label-position="top"
                            v-show="item.showFormEle"
                          >
                            <div class="table__tr__bottom-list">
                              <el-form-item label prop="bankCode" class="table__form-item">
                                <el-input v-model="carEdit.bankCode" maxlength="40"></el-input>
                              </el-form-item>
                              <el-form-item label prop="loanAmt" class="table__form-item">
                                <el-input v-model="carEdit.loanAmt" maxlength="8"></el-input>
                              </el-form-item>
                              <el-form-item label prop="loanDate" class="table__form-item">
                                <el-date-picker
                                  :editable="false"
                                  v-model="carEdit.loanDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  placeholder="选择日期"
                                ></el-date-picker>
                              </el-form-item>
                              <el-form-item label prop="dueDate" class="table__form-item">
                                <el-date-picker
                                  :editable="false"
                                  v-model="carEdit.dueDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  placeholder="选择日期"
                                ></el-date-picker>
                              </el-form-item>
                              <el-form-item
                                label
                                prop="firstRepaymentDate"
                                class="table__form-item"
                              >
                                <el-date-picker
                                  :editable="false"
                                  v-model="carEdit.firstRepaymentDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  placeholder="选择日期"
                                ></el-date-picker>
                              </el-form-item>
                              <el-form-item label prop="loanStatusCode" class="table__form-item">
                                <el-select
                                  v-model="carEdit.loanStatusCode"
                                  placeholder="请选择"
                                  @change="clearCarDate('carEditForm' + index)"
                                >
                                  <el-option
                                    v-for="(item, index) in carLoanStatusCodeLibrary"
                                    :key="index"
                                    :label="item.itemDesc"
                                    :value="item.itemCode"
                                  ></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label prop="settlementDate" class="table__form-item">
                                <el-date-picker
                                  :editable="false"
                                  v-model="carEdit.settlementDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  :disabled="!(carEdit.loanStatusCode === dCode.loanStatusCode.settle)"
                                  placeholder="选择日期"
                                ></el-date-picker>
                              </el-form-item>
                              <el-form-item
                                label
                                prop="monthlyRepaymentAmt"
                                class="table__form-item"
                              >
                                <el-input v-model="carEdit.monthlyRepaymentAmt" maxlength="8"></el-input>
                              </el-form-item>
                              <el-form-item label class="table__form-item">
                                <el-select
                                  v-model="carEdit.availableInd"
                                  placeholder="请选择"
                                  disabled
                                >
                                  <el-option label="是" :value="true"></el-option>
                                  <el-option label="否" :value="false"></el-option>
                                </el-select>
                              </el-form-item>
                              <div class="operate-box text__center" v-if="!hasSubmit">
                                <i
                                  class="icon el-icon-check cursor__pointer"
                                  @click="saveEditCar('carEditForm' + index, item)"
                                ></i>
                                <i
                                  class="icon el-icon-minus cursor__pointer"
                                  @click="closeCarEle(item)"
                                ></i>
                              </div>
                            </div>
                          </el-form>
                        </div>
                      </li>
                      <li class="table__body" v-show="carList.length === 0 || carEditDg">
                        <div class="table__tr">
                          <el-form
                            :model="carEdit"
                            :rules="carRule"
                            ref="carAddForm"
                            class="demo-form-inline"
                            label-position="top"
                          >
                            <div class="table__tr__bottom-list">
                              <el-form-item prop="bankCode" class="table__form-item">
                                <el-input v-model="carEdit.bankCode" maxlength="40"></el-input>
                              </el-form-item>
                              <el-form-item prop="loanAmt" class="table__form-item">
                                <el-input v-model="carEdit.loanAmt" maxlength="8"></el-input>
                              </el-form-item>
                              <el-form-item prop="loanDate" class="table__form-item">
                                <el-date-picker
                                  :editable="false"
                                  v-model="carEdit.loanDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  placeholder="选择日期"
                                ></el-date-picker>
                              </el-form-item>
                              <el-form-item prop="dueDate" class="table__form-item">
                                <el-date-picker
                                  :editable="false"
                                  v-model="carEdit.dueDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  placeholder="选择日期"
                                ></el-date-picker>
                              </el-form-item>
                              <el-form-item prop="firstRepaymentDate" class="table__form-item">
                                <el-date-picker
                                  :editable="false"
                                  v-model="carEdit.firstRepaymentDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  placeholder="选择日期"
                                ></el-date-picker>
                              </el-form-item>
                              <el-form-item prop="loanStatusCode" class="table__form-item">
                                <el-select
                                  v-model="carEdit.loanStatusCode"
                                  placeholder="请选择"
                                  @change="clearCarDate('carAddForm')"
                                >
                                  <el-option
                                    v-for="(item, index) in carLoanStatusCodeLibrary"
                                    :key="index"
                                    :label="item.itemDesc"
                                    :value="item.itemCode"
                                  ></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label prop="settlementDate" class="table__form-item">
                                <el-date-picker
                                  :editable="false"
                                  v-model="carEdit.settlementDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  :disabled="!(carEdit.loanStatusCode === dCode.loanStatusCode.settle)"
                                  placeholder="选择日期"
                                ></el-date-picker>
                              </el-form-item>
                              <el-form-item
                                label
                                prop="monthlyRepaymentAmt"
                                class="table__form-item"
                              >
                                <el-input v-model="carEdit.monthlyRepaymentAmt" maxlength="8"></el-input>
                              </el-form-item>
                              <el-form-item label class="table__form-item">
                                <el-select
                                  v-model="carEdit.availableInd"
                                  placeholder="请选择"
                                  disabled
                                >
                                  <el-option label="是" :value="true"></el-option>
                                  <el-option label="否" :value="false"></el-option>
                                </el-select>
                              </el-form-item>
                              <div class="operate-box text__center" v-if="!hasSubmit">
                                <i class="icon el-icon-check cursor__pointer" @click="addCar"></i>
                                <i class="icon el-icon-minus cursor__pointer" @click="closeAddCar"></i>
                              </div>
                            </div>
                          </el-form>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </transition>
            </li>
            <!-- 企业税模块 -->
            <li class="item" v-if="!easyLoanFlag">
              <el-form-item label="是否有企税信息" required>
                <el-radio-group v-model="customerInfo.organizationTaxInd" :disabled="!!hasSubmit">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <transition name="fade">
                <div class="dialog__table-box tax_hack_ie" v-if="customerInfo.organizationTaxInd">
                  <el-form
                    :model="organizationTax"
                    :rules="organizationTaxRule"
                    ref="organizationTaxForm"
                    label-position="top"
                  >
                    <div class="tax_box">
                      <el-form-item label="税务数据接入结构" class="width245" prop="tlTaxOrganizationId">
                        <el-select
                          v-model="organizationTax.tlTaxOrganizationId"
                          placeholder="请选择"
                          :disabled="!!hasSubmit"
                          @change="taxAgencyChange"
                        >
                          <el-option
                            v-for="(item, index) in taxAgencyList"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="纳税人识别码" prop="taxpayerNum" class="width245">
                        <el-input
                          v-model="organizationTax.taxpayerNum"
                          :disabled="!!hasSubmit"
                          @blur="checkTaxpayerNum(organizationTax.taxpayerNum)"
                        ></el-input>
                      </el-form-item>
                      <el-form-item class="btn_inline">
                        <el-button
                          size="small"
                          class="query_btn query_auth"
                          @click="queryAuthorizationInfo"
                          :disabled="queryImpowerBtnStatus || impowerFlag"
                          v-if="!hasSubmit"
                        >查询授权结果</el-button>
                        <el-button
                          size="small"
                          type="primary"
                          :disabled="queryTax || queryImpowerBtnStatus"
                          class="query_btn query_tax"
                          @click="queryTaxInfo"
                          v-if="!hasSubmit"
                        >获取税务信息</el-button>
                        <el-button
                          size="small"
                          type="warning"
                          class="query_btn button__yellow"
                          @click="checkTaxInfo"
                        >查看税务信息</el-button>
                      </el-form-item>
                      <div class="horizon"></div>
                      <div class="complex_info">
                        <h5 class="title">
                          <span class="icon icon__gan"></span>综合信息
                        </h5>
                      </div>
                      <div>
                        <el-form-item
                          label="近一年企业年缴税额（元）"
                          prop="nearly1YrAnnlPayTaxAmt"
                          class="width250"
                        >
                          <el-input
                            v-model="organizationTax.nearly1YrAnnlPayTaxAmt"
                            maxlength="100"
                            :disabled="!!hasSubmit"
                          ></el-input>
                        </el-form-item>
                        <el-form-item label="近一年企业信用评级" class="width245" prop="nearly1YrOrgCrLvlCd">
                          <el-select
                            v-model="organizationTax.nearly1YrOrgCrLvlCd"
                            placeholder="请选择"
                            :disabled="!!hasSubmit"
                            clearable
                          >
                            <el-option
                              v-for="item in creditLevelList"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="借款人最早缴税日期" prop="custPayTaxStartDate" class="width245">
                          <el-date-picker
                            :editable="false"
                            v-model="organizationTax.custPayTaxStartDate"
                            type="date"
                            value-format="yyyy-MM-dd hh:mm:ss"
                            :disabled="!!hasSubmit"
                            placeholder="选择日期"
                          ></el-date-picker>
                        </el-form-item>
                        <el-form-item label="当前是否有未缴清税款" prop="notPayUpTaxInd">
                          <el-switch
                            v-model="organizationTax.notPayUpTaxInd"
                            :width="50"
                            :disabled="!!hasSubmit"
                          ></el-switch>
                          <span>{{(organizationTax.notPayUpTaxInd === true) ? '是':'否'}}</span>
                        </el-form-item>
                      </div>
                    </div>
                  </el-form>
                </div>
              </transition>
            </li>
          </ul>
        </div>
        <div class="form__bottom clearfix">
          <el-button
            v-if="!isReadonly"
            @click="saveAll"
            type="warning"
            class="f__left button__yellow button button__width-200"
            :disabled="hasSubmit"
          >暂存</el-button>
          <el-button
            :loading="isSubmit"
            v-if="!isReadonly"
            type="primary"
            class="f__right button__width-200"
            @click="submitCustomer"
          >下一步</el-button>
          <el-button
            @click="preStep"
            class="f__right button__width-200 button__border-blue"
            v-if="!isReadonly"
          >上一步</el-button>
        </div>
      </el-form>
    </div>
    <transition name="fade">
      <add-guarantor
        v-if="openAddGuarantorDg"
        @close="closeGuarantor"
        :application-id="applicationId"
        :house-id-list="enableHouseIdList"
        :house-id="guarantorHouseId"
        :guarantor-id="guarantorId"
        :has-submit="hasSubmit"
      ></add-guarantor>
    </transition>
    <transition name="fade">
      <div v-if="!easyLoanFlag">
        <house-message
          v-if="openHouseMessageDg"
          :has-submit="hasSubmit"
          @close="closeHouseMessage"
          :house-id="houseId"
          :house-id-list="houseIdList"
          :areaList="options"
          :application-id="applicationId"
        ></house-message>
      </div>
      <div v-if="easyLoanFlag">
        <easy-loan-house-msg
          v-if="openHouseMessageDg"
          :has-submit="hasSubmit"
          @close="closeHouseMessage"
          :house-id="houseId"
          :house-id-list="houseIdList"
          :areaList="options"
          :application-id="applicationId"
          :processFinish="processFinish"
        ></easy-loan-house-msg>
      </div>
      <!-- <div v-if="isPlusLoan">
        <easy-loan-house-msg
          v-if="openHouseMessageDg"
          :has-submit="hasSubmit"
          @close="closeHouseMessage"
          :house-id="houseId"
          :house-id-list="houseIdList"
          :areaList="options"
          :application-id="applicationId"
        ></easy-loan-house-msg>
      </div> -->
    </transition>
    <transition name="fade">
      <customer-tax-info
        v-if="openTaxInfoDg"
        @close="closeCustomerTaxInfo"
        :taxPayerNum="organizationTax.taxpayerNum"
        class="solving_tax"
      ></customer-tax-info>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
import { spareApi } from "../../../js/server.js";
import myRules from "@common/js/rules.js";
import addGuarantor from "./add_guarantor";
import houseMessage from "./house_message";
import easyLoanHouseMsg from "./house_message/easy_loan_house_message";
import customerTaxInfo from "./customer_tax_info";
export default {
  props: {
    applicationId: {
      type: String,
      default: () => {
        return "";
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
      normalStatus: "easyLoan",
      easyLoanFlag: false,

      processFinish: false,

      submitFalg: false,
      // 是否正提交
      isSubmit: false,
      // 是否第三方
      isThirdParty: false,
      // 企业税 授权控制开关
      impowerFlag: false,
      // 获取授权按钮 状态
      queryImpowerBtnStatus: false,
      // 获取税务信息 默认为不可点击
      queryTax: true,
      special: false, // 用来控制是否提交
      saveStatus: false, // 暂存开关
      hasSubmit: "", // 特殊业务流转过来的数据
      dropSelectShow1: false,
      // 性别
      genderCodeLibrary: [],
      // 证件类型字典
      certificateLibrary: [],
      certificateClass: {},
      // 婚姻状况字典
      maritalLibrary: [],
      // 客户类型字典
      careerLibrary: [],
      // 居住状况字典
      houseConditionLibrary: [],
      // 占股情况
      sharePercentLibrary: [],
      currentStep: 1,
      tableData: [],
      // 定价方案下拉字典
      pricingPlanLibrary: [],
      // 地区列表
      options: [],
      // 缴费方式下拉
      paymentModeCodeLibrary: [],
      paymentModeCodeClass: {},
      // 贷款状态字典
      carLoanStatusCodeLibrary: [],
      // 基本信息
      // 房屋性质字典
      houseClass: {},
      // 税务数据接入结构下拉列表
      taxAgencyList: [],
      creditLevelList: [],
      customerInfo: {
        registeredAddressCode: [],
        houseAddressCode: [],
        workAddressCode: [],
        maritalStatusCode: null,
        houseConditionCode: null,
        sharePercent: null,
        careerTypeCode: null,
        pricingPlanCode: null,
        approveModeCd: '',
        isBusinessPatch: false
      },
      approalArr: [], // 审批模式
      organizationTax: {
        notPayUpTaxInd: false
      },
      organizationTaxRule: {
        taxpayerNum: [{ required: true, message: "纳税人识别码 不能为空" }],
        tlTaxOrganizationId: [
          { required: true, message: "税务数据接入机构 不能为空" }
        ],
        nearly1YrAnnlPayTaxAmt: [
          { required: true, message: "近一年企业年缴税额（元） 不能为空" },
          {
            validator: myRules.numTwoBit,
            trigger: "blur",
            message: "只能输入数字，最多只能输入两位小数"
          }
        ],
        nearly1YrOrgCrLvlCd: [
          { required: true, message: "近一年企业信用评级 不能为空" }
        ],
        custPayTaxStartDate: [
          { required: true, message: "借款人最早缴税日期 不能为空" }
        ],
        notPayUpTaxInd: [
          { required: true, message: "当前是否有未缴清税款 不能为空" }
        ]
      },
      customerRule: {
        approveModeCd: [
          { required: true, message: "请选择审批模式", trigger: "change" }
        ],
        maritalStatusCode: [
          { required: true, message: "请选择婚姻状况", trigger: "change" }
        ],
        registeredAddressCode: [
          { required: true, message: "请选择户籍地址", trigger: "change" }
        ],
        registeredAddressDesc: [
          { required: true, message: "请填写户籍详细地址", trigger: "blur" },
          { validator: myRules.addressRule, trigger: "blur" }
        ],
        houseConditionCode: [
          { required: true, message: "请选择居住状况", trigger: "change" }
        ],
        certificateGrantorName: [
          { required: true, message: "请填写身份证签发机关", trigger: "blur" }
        ],
        houseAddressCode: [
          { required: true, message: "请选择居住地址", trigger: "change" }
        ],
        houseAddressDesc: [
          { required: true, message: "请填写居住详细地址", trigger: "blur" },
          { validator: myRules.addressRule, trigger: "blur" }
        ],
        workplaceName: [
          { required: true, message: "请填单位名称", trigger: "blur" },
          { validator: myRules.companyNameRule, trigger: "blur" }
        ],
        workAddressCode: [
          { required: true, message: "请选择单位地址", trigger: "change" }
        ],
        careerTypeCode: [
          { required: true, message: "请选择客户类型", trigger: "change" }
        ],
        sharePercent: [{ validator: this.sharePercentRule, trigger: "change" }],
        foundDate: [{ validator: this.foundDateRule, trigger: "change" }],
        pricingPlanCode: [
          { required: true, message: "请选择定价方案", trigger: "change" }
        ]
      },
      openAddGuarantorDg: false,
      TabActiveName: "first",
      // 保险表格数据
      policyList: [],
      policyEdit: {},
      policyCurrentEdit: {}, // 当前正被编辑保险项
      policyEditDg: false,
      policyRule: {
        insuranceCompanyCode: [
          { required: true, message: "请选择寿险公司名称", trigger: "change" }
        ],
        mainRiskName: [
          { required: true, message: "请填写主险名称", trigger: "blur" },
          { max: 50, message: "长度不超过50个字符", trigger: "blur" }
        ],
        policyNum: [
          { required: true, message: "请填写保单号", trigger: "blur" },
          { validator: this.checkPolicyNum, trigger: "blur" }
        ],
        effectiveDate: [
          { required: true, message: "请选择生效日期", trigger: "change" }
        ],
        policyStatusInd: [
          { required: true, message: "请选择保单状态", trigger: "change" }
        ],
        paymentModeCode: [
          { required: true, message: "请选择缴费方式", trigger: "change" }
        ],
        premiumCycleAmt: [
          { required: true, message: "请填写期缴保费", trigger: "blur" },
          { validator: myRules.numTwoBit, trigger: "blur" },
          { validator: this.eightBitRule, trigger: "blur" }
        ],
        premiumTimesCnt: [
          { required: true, message: "请填写缴费次数", trigger: "blur" },
          { validator: myRules.number, trigger: "blur" }
        ]
      },
      policyCompanyList: [],
      // 车供表格数据
      carList: [],
      carEdit: {
        settlementDate: ""
      },
      carCurrentEdit: {},
      carEditDg: false,
      carRule: {
        bankCode: [
          { required: true, message: "请填写贷款发放银行", trigger: "blur" },
          { validator: myRules.chineseChart, trigger: "blur" }
        ],
        loanAmt: [
          { required: true, message: "请填写贷款发放金额", trigger: "blur" },
          { validator: myRules.nonNegative, trigger: "blur" }
        ],
        date: [{ required: true, message: "请选择日期", trigger: "change" }],
        loanStatusCode: [
          { required: true, message: "请选择贷款状态", trigger: "change" }
        ],
        monthlyRepaymentAmt: [
          { required: true, message: "请填写贷款月还金额", trigger: "blur" },
          { validator: myRules.positiveRule, trigger: "blur" }
        ],
        loanDate: [
          { required: true, message: "请选择日期", trigger: "change" }
        ],
        dueDate: [{ required: true, message: "请选择日期", trigger: "change" }],
        settlementDate: [
          {
            validator: (rule, value, callback) => {
              if (
                this.carEdit.loanStatusCode ===
                  this.dCode.loanStatusCode.settle &&
                !value
              ) {
                return callback(new Error("请选择贷款结清日期!"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ],
        firstRepaymentDate: [
          { required: true, message: "请选择日期", trigger: "change" }
        ]
      },

      // 房产信息数据
      houseList: [],
      houseIdList: [],
      houseEdit: {},
      houseCurrentEdit: {},
      houseEditDg: false,
      openHouseMessageDg: false,
      houseId: null,

      // 担保人信息
      guarantorList: [],
      guarantorId: "", // 被选中编辑的列表
      guarantorHouseId: "", // 被选中的列表 房产证号
      guarantorHouseIdList: [], // 已经有担保人的房产证号
      enableHouseIdList: [], // 可被选中的房产证号,
      dCode: this.$getCodeDependent(),
      // 授权结果数据
      openTaxInfoDg: false,
      taxPayerCode: "123456"
    };
  },
  created() {
    this.getPolicyList(this.applicationId); // 获取保单列表
    this.getCarList(this.applicationId); // 获取车供列表
    this.getHouseList(); // 获取房产证列表;
    this.getGuarantorList(this.applicationId);
    this.getAreaList();
    this.getHasSubmit();
    let selectArr = [
      "insurance_company",
      "marital_status_code",
      "career_type_code",
      "house_condition_code",
      "share_percent",
      "ins_payment_mode_code",
      "estate_type_code",
      "certificate_type_code",
      "car_loan_status_code",
      "gender_code",
      "yd_approve_mode_cd"
    ];
    this.getMultipleLibrary(selectArr, this.isReadonly)
      .then(data => {
        this.policyCompanyList = data.insurance_company;
        this.maritalLibrary = data.marital_status_code;
        this.careerLibrary = data.career_type_code;
        this.houseConditionLibrary = data.house_condition_code;
        this.sharePercentLibrary = data.share_percent;
        this.paymentModeCodeLibrary = data.ins_payment_mode_code;
        data.ins_payment_mode_code.forEach(v => {
          this.$set(this.paymentModeCodeClass, v.itemCode, v.itemDesc);
        });
        data.estate_type_code.forEach(v => {
          this.$set(this.houseClass, v.itemCode, v.itemDesc);
        });
        this.certificateLibrary = data.certificate_type_code;
        data.certificate_type_code.forEach(v => {
          this.$set(this.certificateClass, v.itemCode, v.itemDesc);
        });
        this.carLoanStatusCodeLibrary = data.car_loan_status_code;
        this.genderCodeLibrary = data.gender_code;
        this.approalArr = data.yd_approve_mode_cd;
      })
      .catch(err => {
        this.confirmFn(err.message);
      });
    this.getCreditLevelList();
    this.getPricingPlanApi(); // 获取定价方案字典
  },
  mounted() {},
  methods: {
    organizationTaxRuleChange(_bloon) {
      this.organizationTaxRule.nearly1YrAnnlPayTaxAmt[0].required = _bloon;
      this.organizationTaxRule.nearly1YrOrgCrLvlCd[0].required = _bloon;
      this.organizationTaxRule.custPayTaxStartDate[0].required = _bloon;
      this.organizationTaxRule.notPayUpTaxInd[0].required = _bloon;
    },
    // 去掉识别码的空格
    checkTaxpayerNum(_val) {
      if (!_val) {
        return false;
      }
      this.organizationTax.taxpayerNum = _val.trim();
    },
    queryTaxInfo() {
      // 调用税务信息查询接口、接口及异常的话能重新调用
      // 获取到信息后，综合信息必填信息变成非必填
      // 若无该客户税务信息记录，提示 该客户无查询记录
      this.queryTax = true;
      this.$MyFetch
        .get(spareApi.taxConfig.queryTaxInfoApi, {
          applicationId: this.applicationId
        })
        .then(_data => {
          this.confirmFn("获取税务信息成功");
          this.queryTax = false;
          this.organizationTaxRuleChange(false);
        })
        .catch(_erro => {
          this.confirmFn(_erro.message);
          this.queryTax = false;
          console.log("error", _erro);
        });
    },
    getApprovalModel(data) {
      this.customerInfo.approveModeCd = data.itemCode;
      console.log("getApprovalModel", data);
    },
    taxAgencyChange(_data) {
      this.queryImpowerBtnStatus = _data === 1;
      if (this.queryImpowerBtnStatus) {
        this.organizationTaxRuleChange(true);
      }
    },
    // 检查是否提交过
    getHasSubmit() {
      this.$MyFetch
        .get(
          spareApi.solving.completeInfo.completeProduct.getSubmitStatus +
            this.applicationId
        )
        .then((data = {}) => {
          this.hasSubmit = !!data || this.isReadonly;
          this.special = !!data || this.isReadonly;
          console.log(data);
        })
        .catch(err => {
          this.confirmFn(err.message, "error");
        });
    },
    // 上一步
    preStep() {
      this.$emit("pre-step");
    },
    // 获取主表单项值
    getInfo(id) {
      this.$MyFetch
        .get(spareApi.solving.completeInfo.completeProduct.getInfo + id)
        .then((data = {}) => {
          // 后端姐姐空值都是null 用不了，初始化改下
          data.registeredAddressCode = data.registeredAddressCode
            ? this.getAddressArr(data.registeredAddressCode, this.options)
            : this.customerInfo.registeredAddressCode;
          data.houseAddressCode = data.houseAddressCode
            ? this.getAddressArr(data.houseAddressCode, this.options)
            : this.customerInfo.houseAddressCode;
          data.workAddressCode = data.workAddressCode
            ? this.getAddressArr(data.workAddressCode, this.options)
            : this.customerInfo.workAddressCode;
          data.pricingPlanLibrary = data.pricingPlanLibrary
            ? data.pricingPlanLibrary
            : this.customerInfo.pricingPlanLibrary;
          data.insurancePolicyInd = data.insurancePolicyInd
            ? data.insurancePolicyInd
            : false;
          data.isBusinessPatch = data.isBusinessPatch === true ? true : this.customerInfo.isBusinessPatch;
          data.estateInd = data.estateInd ? data.estateInd : false;
          data.carloanInd = data.carloanInd ? data.carloanInd : false;
          data.genderCode = data.genderCode
            ? data.genderCode
            : this.dCode.gendeTypeCode.M;
          data.organizationTaxInd = data.organizationTaxInd || false;
          data.localEstateInd = data.localEstateInd
            ? data.localEstateInd
            : false;
          data.houseFund6mInd = data.houseFund6mInd
            ? data.houseFund6mInd
            : false;
          data.registeredInd = data.registeredInd ? data.registeredInd : false;
          if (data.foundDate) {
            data.foundDate = new Date(
              data.foundDate.replace(/-/g, "/")
            ).getTime()
              ? new Date(data.foundDate.replace(/-/g, "/")).getTime()
              : 1;
          }
          // 判断是否易贷
          this.easyLoanFlag = data.easyLoanInd;

          // 流程是否完结（true-已完结，false-未完结）用于展示公众号录入的“房产总价”
          this.processFinish = data.processFinishedInd;

          // 由于税务贷后端人员跟备签后端人员不同，数据结构也不同。。。
          if (data.organizationTaxInd) {
            // 有税务贷信息，并且有授权
            this.organizationTax = Object.assign({}, data.taxLoanPrepareDto);
            if (this.organizationTax.nearly1YrAnnlPayTaxAmt) {
              this.organizationTax.nearly1YrAnnlPayTaxAmt = this.$returnFloat(
                this.organizationTax.nearly1YrAnnlPayTaxAmt,
                2,
                true
              );
            }
            if (
              this.organizationTax.checkParameterInd &&
              this.organizationTax.tlTaxOrganizationId !== 1
            ) {
              // 如果已经获取过税务信息并且无需接入，综合信息不校验
              this.organizationTaxRuleChange(false);
            }
            this.queryImpowerBtnStatus =
              this.organizationTax.tlTaxOrganizationId === 1;
            this.filerTaxAgency(this.organizationTax);
          }
          // 保险起见，删掉相关的税务贷的信息
          delete data.taxLoanPrepareDto;
          this.customerInfo = Object.assign({}, data);
          if (this.customerInfo.authReasonCode === "020") {
            this.hasSubmit = true;
          }
        })
        .catch(err => {
          this.confirmFn(err.message, "error");
        });
    },
    checkFormValid(_name) {
      let flag = true;
      if (this.$refs[_name]) {
        this.$refs[_name].validate(_valid => {
          flag = _valid;
        });
      }
      return flag;
    },
    // 提交主表单值
    submitCustomer() {
      if (this.hasSubmit && this.special) {
        this.$emit("next-step");
        return;
      }
      if (this.isSubmit) return;
      this.$refs.customerInfo.validate(valid => {
        if (valid) {
          var data = JSON.parse(JSON.stringify(this.customerInfo));
          data.registeredAddressCode = this.customerInfo.registeredAddressCode[this.customerInfo.registeredAddressCode.length - 1];
          data.houseAddressCode = this.customerInfo.houseAddressCode[this.customerInfo.houseAddressCode.length - 1];
          data.workAddressCode = this.customerInfo.workAddressCode[this.customerInfo.workAddressCode.length - 1];
          if (data.insurancePolicyInd && this.policyList.length === 0) {
            this.confirmFn("请添加保单信息", "error");
            return;
          }
          if (data.estateInd && this.houseList.length === 0) {
            this.confirmFn("请添加房产信息", "error");
            return;
          }
          if (data.carloanInd && this.carList.length === 0) {
            this.confirmFn("请添加车贷信用卡信息", "error");
            return;
          }
          if (!this.checkFormValid("organizationTaxForm")) {
            // 企业税信息没填写
            this.confirmFn("请填写税务贷相关信息", "error");
            return false;
          }
          if (data.organizationTaxInd) {
            this.organizationTax.applicationId = this.applicationId;
            // 自动保存两位小数
            this.organizationTax.nearly1YrAnnlPayTaxAmt = this.$returnFloat(
              this.organizationTax.nearly1YrAnnlPayTaxAmt,
              2,
              true
            );
            data.taxLoanPrepareDto = this.organizationTax;
          }
          this.confirmFn("确认提交信息？提交后将无法更改！", "warning")
            .then(() => {
              // 打开loading
              this.isSubmit = true;
              this.checkTableList(data).then(() => {
                this.submitCustomerApi(data);
              });
            })
            .catch(err => {
              console.log(err);
              this.isSubmit = false;
            });
        } else {
          this.confirmFn("填写信息有误，请检查！", "error");
        }
      });
    },
    // 检测表格中数据是否正确
    checkTableList(data) {
      let list = {};
      if (data.insurancePolicyInd) {
        list.insuranceInfoReqList = this.policyList;
      }
      if (data.estateInd) {
        list.estateInfoList = this.houseList;
        if (this.guarantorList.length > 0) {
          list.guaranteeInfoList = this.guarantorList;
        }
      }
      if (data.carloanInd) {
        list.carLoanInfoList = this.carList;
      }
      return new Promise(resolve => {
        this.$MyFetch
          .post(
            spareApi.solving.completeInfo.completeProduct.checkTableList,
            list
          )
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            this.confirmFn(err.message, "error");
            this.isSubmit = false;
          });
      });
    },
    submitCustomerApi(data) {
      this.$MyFetch
        .post(spareApi.solving.completeInfo.completeProduct.submitInfo, data, {
          timeout: 30000
        })
        .then(() => {
          this.confirmFn("保存成功！", "success");
          this.$emit("next-step");
          this.isSubmit = false;
        })
        .catch(err => {
          this.confirmFn(err.message, "error");
          this.isSubmit = false;
        });
    },
    // 暂存表单
    saveAll() {
      let customerInfo = JSON.parse(JSON.stringify(this.customerInfo));
      customerInfo.registeredAddressCode = this.customerInfo
        .registeredAddressCode[this.customerInfo.registeredAddressCode.length - 1]
        ? this.customerInfo.registeredAddressCode[this.customerInfo.registeredAddressCode.length - 1]
        : null;
      customerInfo.houseAddressCode = this.customerInfo.houseAddressCode[this.customerInfo.houseAddressCode.length - 1]
        ? this.customerInfo.houseAddressCode[this.customerInfo.houseAddressCode.length - 1]
        : null;
      customerInfo.workAddressCode = this.customerInfo.workAddressCode[this.customerInfo.workAddressCode.length - 1]
        ? this.customerInfo.workAddressCode[this.customerInfo.workAddressCode.length - 1]
        : null;
      // taxLoanPrepareDto
      if (customerInfo.organizationTaxInd) {
        let num = this.organizationTax.nearly1YrAnnlPayTaxAmt;
        if (isNaN(Number(num)) && num !== undefined) {
          this.confirmFn(`${num} 不是数字`, "error");
          return false;
        }
        if (num) {
          this.organizationTax.nearly1YrAnnlPayTaxAmt = this.$returnFloat(
            this.organizationTax.nearly1YrAnnlPayTaxAmt,
            2,
            true
          );
        }
        customerInfo.taxLoanPrepareDto = this.organizationTax;
        customerInfo.taxLoanPrepareDto.applicationId = this.applicationId;
      }
      this.saveCustomerApi(customerInfo)
        .then(res => {
          // 暂存开关关掉
          this.saveStatus = false;
          this.confirmFn("数据暂存成功！", "success");
        })
        .catch(err => {
          this.confirmFn(err.message, "error");
        });
    },
    // 暂存主表单api
    saveCustomerApi(data) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .post(spareApi.solving.completeInfo.completeProduct.saveInfo, data)
          .then((data = {}) => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 获取地区列表值
    getAreaList() {
      this.getArea({ getAll: this.isReadonly }).then(data => {
        this.options = data;
        this.getInfo(this.applicationId);
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
    // 保单信息
    // 打开保险单新增
    openAddPolicy() {
      if (this.policyCurrentEdit.id) {
        this.confirmFn("请先完成正在编辑的表格", "error");
        return;
      }
      this.policyEdit = {};
      if (this.policyList.length >= 3) {
        this.confirmFn("保单满三份，无法继续新增！", "error");
        return;
      }
      this.policyEditDg = true;
    },
    // 关闭保单新增
    closeAddPolicy() {
      this.policyEditDg = false;
    },
    // 添加保险单
    addPolicy() {
      if (this.hasSubmit) {
        this.confirmFn("您已经提交过改表单，所做的更改不再更新到服务器！");
        return;
      }
      this.$refs.policyAddForm.validate(valid => {
        if (valid) {
          this.policyEdit.premiumTermCnt = this.premiumTermCnt;
          this.policyEdit.availableInd = this.isPolicyEffective;
          this.policyEdit.applicationId = this.applicationId;
          this.policyEdit.premiumAnnualAmt = this.premiumAnnualAmt;
          this.$set(
            this.policyEdit,
            "holderSwitchInd",
            this.policyEdit.holderSwitchInd
              ? this.policyEdit.holderSwitchInd
              : false
          );
          this.addPolicyApi(this.policyEdit).then(() => {
            this.policyEditDg = false;
            this.getPolicyList(this.applicationId);
            this.confirmFn("保单添加成功！", "success");
          });
        }
      });
    },
    addPolicyApi(data) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .post(spareApi.solving.completeInfo.completeProduct.addPolicy, data)
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            this.confirmFn(err.message, "error");
          });
      });
    },
    // 获取保单列表信息
    getPolicyList(id) {
      let query = { applicationId: id };
      this.$MyFetch
        .post(
          spareApi.solving.completeInfo.completeProduct.getPolicyList,
          query
        )
        .then((data = {}) => {
          this.policyList = [...data.list];
          this.policyList.forEach(v => {
            if (v.effectiveDate) {
              v.effectiveDate = new Date(
                v.effectiveDate.replace(/-/g, "/")
              ).getTime(); // 传回来的变成了时间字符串 转成时间搓
            }
            this.policyEdit.availableInd = this.policyEdit.availableInd
              ? this.policyEdit.availableInd
              : false;
            this.policyEdit.holderSwitchInd = this.policyEdit.holderSwitchInd
              ? this.policyEdit.holderSwitchInd
              : false;
            this.$set(v, "showFormELe", false);
          });
        })
        .catch(err => {
          this.confirmFn(err.message, "error");
        });
    },
    // 删除保单信息
    deletePolicy(id) {
      if (this.policyCurrentEdit.id) {
        this.confirmFn("请先完成正在编辑的表格", "error");
        return;
      }
      this.confirmFn("是否删除该条信息!", "warning")
        .then(() => {
          return this.deletePolicyApi(id);
        })
        .then(() => {
          this.confirmFn("保单删除成功！", "success");
          this.policyEdit = {};
          return this.getPolicyList(this.applicationId);
        })
        .catch(err => {
          err.message && this.confirmFn(err.message, "error");
        });
    },
    deletePolicyApi(id) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .get(spareApi.solving.completeInfo.completeProduct.deletePolicy + id)
          .then((data = {}) => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 编辑保单表格
    editPolicyELe(obj) {
      let isEdit = false;
      this.policyList.forEach(v => {
        if (v.showFormEle) isEdit = true;
      });
      if (this.policyEditDg || isEdit) {
        this.confirmFn("请先完成正在编辑的表格", "error");
        return;
      }
      this.$set(obj, "showFormEle", true);
      this.policyEdit = Object.assign({}, obj);
      this.policyCurrentEdit = Object.assign({}, obj);
    },
    // 保存表单编辑
    saveEditPolicy(formName, obj) {
      this.$refs[formName][0].validate(valid => {
        if (valid) {
          this.policyEdit.premiumTermCnt = this.premiumTermCnt;
          this.policyEdit.availableInd = this.isPolicyEffective;
          this.policyEdit.premiumAnnualAmt = this.premiumAnnualAmt;
          this.policyEdit.holderSwitchInd = this.policyEdit.holderSwitchInd
            ? this.policyEdit.holderSwitchInd
            : false;
          this.saveEditPolicyApi(this.policyEdit, obj);
        }
      });
    },
    saveEditPolicyApi(data, obj) {
      this.$MyFetch
        .post(spareApi.solving.completeInfo.completeProduct.editPolicy, data)
        .then((data = {}) => {
          this.getPolicyList(this.applicationId);
          this.closeEditPolicy(obj);
          this.confirmFn("修改成功", "success");
        })
        .catch(err => {
          this.confirmFn(err.message, "error");
        });
    },
    // 关闭表单修改
    closeEditPolicy(obj) {
      this.policyCurrentEdit = {};
      this.policyEdit = {};
      this.$set(obj, "showFormEle", false);
    },
    // 检查保单号是否存在
    checkPolicyNum(rule, value, callback) {
      var isExist = false;
      this.policyList.forEach(v => {
        if (
          v.policyNum === value &&
          this.policyCurrentEdit.policyNum !== value
        ) {
          isExist = true;
        }
      });
      if (isExist) {
        return callback(new Error("该保单号已经存在"));
      } else {
        callback();
      }
    },

    // 车供信息
    // 获取车供信息列表
    getCarList(id) {
      this.$MyFetch
        .post(spareApi.solving.completeInfo.completeProduct.getCarList, {
          applicationId: id
        })
        .then((data = {}) => {
          this.carList = [...data.list];
          this.carList.forEach(v => {
            if (v.loanDate) {
              v.loanDate = new Date(v.loanDate.replace(/-/g, "/")).getTime();
            }
            if (v.dueDate) {
              v.dueDate = new Date(v.dueDate.replace(/-/g, "/")).getTime();
            }
            if (v.firstRepaymentDate) {
              v.firstRepaymentDate = new Date(
                v.firstRepaymentDate.replace(/-/g, "/")
              ).getTime();
            }
            if (v.settlementDate) {
              v.settlementDate = new Date(
                v.settlementDate.replace(/-/g, "/")
              ).getTime();
            }
          });
        })
        .catch(err => {
          this.confirmFn(err.message);
        });
    },
    // 删除车供信息
    deleteCar(id) {
      if (this.carCurrentEdit.id) {
        this.confirmFn("请先完成正在编辑的表格", "error");
        return;
      }
      this.confirmFn("是否删除该条信息!", "warning")
        .then(() => {
          return this.deleteCarApi(id);
        })
        .then(() => {
          this.getCarList(this.applicationId);
        })
        .catch(err => {
          err.message && this.confirmFn(err.message, "error");
        });
    },
    deleteCarApi(id) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .get(spareApi.solving.completeInfo.completeProduct.deleteCar + id)
          .then((data = {}) => {
            this.confirmFn("删除成功！", "success");
            this.carEdit = { settlementDate: "" };
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 打开新增
    openAddCar() {
      if (this.carCurrentEdit.id) {
        this.confirmFn("请先完成正在编辑的表格", "error");
        return;
      }
      this.carEdit = JSON.parse(JSON.stringify({ settlementDate: "" }));
      if (this.carList.length >= 3) {
        this.confirmFn("车贷信用卡满三份，无法继续新增！", "error");
        return;
      }
      this.carEditDg = true;
    },
    // 关闭新增
    closeAddCar() {
      this.carEditDg = false;
    },
    // 新增车贷信息
    addCar() {
      this.$refs.carAddForm.validate(valid => {
        if (valid) {
          this.carEdit.applicationId = this.applicationId;
          this.addCarApi(this.carEdit).then(() => {
            this.carEditDg = false;
            this.getCarList(this.applicationId);
          });
        } else {
          console.log("不通过");
        }
      });
    },
    addCarApi(data) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .post(spareApi.solving.completeInfo.completeProduct.addCar, data)
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            this.confirmFn(err.message, "error");
          });
      });
    },
    // 打开编辑车贷表格
    editCarELe(obj) {
      let isEdit = false;
      this.carList.forEach(v => {
        if (v.showFormEle) isEdit = true;
      });
      if (this.carEditDg || isEdit) {
        this.confirmFn("请先完成正在编辑的表格", "error");
        return;
      }
      this.$set(obj, "showFormEle", true);
      this.carEdit = Object.assign({}, obj);
      this.carCurrentEdit = Object.assign({}, obj);
    },
    // 关闭编辑车贷表格
    closeCarEle(obj) {
      this.carCurrentEdit = {};
      this.carEdit = {};
      this.$set(obj, "showFormEle", false);
    },
    // 保存编辑
    saveEditCar(formName, obj) {
      this.$refs[formName][0].validate(valid => {
        if (valid) {
          this.saveEditCarApi(this.carEdit, obj);
        } else {
          console.log("error");
        }
      });
    },
    saveEditCarApi(data, obj) {
      this.$MyFetch
        .post(spareApi.solving.completeInfo.completeProduct.editCar, data)
        .then(() => {
          this.getCarList(this.applicationId);
          this.confirmFn("修改成功", "success");
          this.closeCarEle(obj);
        })
        .catch(err => {
          this.confirmFn(err.message, "error");
        });
    },
    // 车贷状态为正常时 结清日期清空
    clearCarDate(formName) {
      if (this.carEdit.loanStatusCode === this.dCode.loanStatusCode.normal) {
        this.carEdit.settlementDate = "";
        if (!this.$refs[formName][0]) {
          this.$refs[formName].validateField(["settlementDate"]);
        } else {
          this.$refs[formName][0].validateField(["settlementDate"]);
        }
      }
    },

    // 房产信息
    // 获取房产客户信息列表
    getHouseList() {
      this.$MyFetch
        .post(spareApi.solving.completeInfo.completeProduct.getHourseList, {
          applicationId: this.applicationId
        })
        .then((data = {}) => {
          this.houseList = [...data.estateInfoList];
          this.houseIdList = [];
          data.estateInfoList.forEach(v => {
            this.houseIdList.push(v.estateNum);
          });
        })
        .catch(err => {
          this.confirmFn(err.message, "error");
        });
    },
    // 打开房产信息 或担保人信息 新增（编辑窗口）
    openMessageBox(obj = {}) {
      if (this.TabActiveName === "first") {
        // 新增房产信息
        if (!obj.id && this.houseList.length >= 2) {
          this.confirmFn("最多添加两条房产信息！", "error");
          return;
        }
        this.openHouseMessageDg = true;
        this.houseId = obj.id;
      } else {
        if (!obj.id && this.guarantorList.length >= 2) {
          this.confirmFn("最多添加两条担保人信息！", "error");
          return;
        } else if (this.houseIdList.length <= 0) {
          this.confirmFn("请先添加房产信息！", "error");
          return;
        }
        // 过滤掉已经有担保人的房产
        // 保证每一条房产只有一个担保人
        this.enableHouseIdList = [];
        this.houseIdList.forEach(v => {
          this.enableHouseIdList.push(v);
        });
        this.guarantorId = obj.id;
        this.guarantorHouseId = obj.estateNum;
        this.openAddGuarantorDg = true;
      }
    },
    // 关闭房产信息弹出层
    closeHouseMessage() {
      this.openHouseMessageDg = false;
      this.houseEdit = {};
      this.getHouseList();
      this.getGuarantorList(this.applicationId);
    },
    // 删除房产信息
    deleteHouseMessage(id) {
      this.confirmFn("是否删除该条信息？", "warning")
        .then(() => {
          this.$MyFetch
            .get(spareApi.solving.completeInfo.completeProduct.deleteHouse + id)
            .then((data = {}) => {
              this.confirmFn("删除成功", "success");
              this.getHouseList();
              this.getGuarantorList(this.applicationId);
            });
        })
        .catch(err => {
          err.message && this.confirmFn(err.message, "error");
        });
    },
    // 担保人信息
    // 获取担保人信息
    getGuarantorList(id) {
      this.$MyFetch
        .post(spareApi.solving.completeInfo.completeProduct.getGuaranteeList, {
          applicationId: id
        })
        .then(data => {
          this.guarantorList = [...data.list];
          this.guarantorHouseIdList = [];
          data.list.forEach(v => {
            this.guarantorHouseIdList.push(v.estateNum);
          });
        })
        .catch(err => {
          this.confirmFn(err.message, "error");
        });
    },
    closeGuarantor() {
      this.getGuarantorList(this.applicationId);
      this.openAddGuarantorDg = false;
    },
    deleteGuarantor(id) {
      this.confirmFn("是否删除该条信息？", "warning")
        .then(() => {
          this.$MyFetch
            .get(
              spareApi.solving.completeInfo.completeProduct.deleteGuarantee + id
            )
            .then(() => {
              this.confirmFn("删除成功！", "success");
              this.getGuarantorList(this.applicationId);
            });
        })
        .catch(err => {
          err.message && this.confirmFn(err.message, "error");
        });
    },
    // 杂项
    // 获取定价方案下拉
    getPricingPlanApi() {
      this.$MyFetch
        .get(
          spareApi.solving.completeInfo.completeProduct.getPricingPlanCode +
            this.applicationId
        )
        .then(data => {
          this.pricingPlanLibrary = data;
        })
        .catch(err => {
          !!err.message && this.confirmFn(err.message, "error");
        });
    },
    // 根据缴费编码获取缴费方式
    setPayMode(code) {
      let payWay = "";
      switch (code) {
        case "M":
          payWay = "月缴";
          break;
        case "S":
          payWay = "季缴";
          break;
        case "H":
          payWay = "半年缴";
          break;
        case "Y":
          payWay = "年缴";
          break;
        default:
          payWay = "年缴";
          break;
      }
      return payWay;
    },
    // 根据code获取保险公司名称
    policyCompanyName(code) {
      let name = "";
      this.policyCompanyList.forEach(v => {
        if (v.itemCode === code) {
          name = v.itemDesc;
        }
      });
      return name;
    },
    // 根据时间搓返回时间
    getTime(time) {
      var str = "/";
      if (time) {
        time = typeof time === "string" ? time.replace(/-/g, "/") : time;
        str = new Date(time).normalizeTime().strDate;
      }
      return str;
    },

    // 获取下拉菜单
    getLibraryApi(name) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .get(spareApi.commonSelect, { categoryCode: name })
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
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
    // 选择标准授薪时应该去掉 占股情况， 成立日期， 是否注册
    removeValue(value) {
      if (value !== this.dCode.careerTypeCode.boss) {
        this.customerInfo.foundDate = "";
        this.customerInfo.sharePercent = "";
        this.customerInfo.registeredInd = false;
      }
    },
    sharePercentRule(rule, value, callback) {
      if (this.customerInfo.registeredInd && !value) {
        return callback(new Error("请选择占股情况"));
      } else {
        callback();
      }
    },
    foundDateRule(rule, value, callback) {
      if (
        this.customerInfo.careerTypeCode === this.dCode.careerTypeCode.boss &&
        !value &&
        this.customerInfo.registeredInd
      ) {
        return callback(new Error("请选择成立日期"));
      } else {
        callback();
      }
    },
    // 输入的数字自动补00
    formatMoney(objName, key) {
      if (!isNaN(this[objName][key])) {
        if (this[objName][key] === "") return;
        this[objName][key] = (
          Math.round(this[objName][key] * 100) / 100
        ).toString();
        let rs = this[objName][key].indexOf(".");
        if (rs < 0) {
          this[objName][key] += ".00";
        } else {
          while (this[objName][key].length <= rs + 2) {
            this[objName][key] += "0";
          }
        }
      }
    },
    // 最大小于100000000
    eightBitRule(rule, value, callback) {
      if (value - 0 >= 100000000 && !!value) {
        return callback(new Error("最多只能输入8位"));
      } else {
        callback();
      }
    },
    getTaxAgencyList() {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .get(spareApi.taxConfig.careerworkOrganizationList, {
            applicationId: this.applicationId
          })
          .then(_data => {
            if (this.$lodash.isEmpty(_data) && !this.hasSubmit) {
              this.confirmFn(
                "客户单位地址所在省市无有效税务数据接入机构，请重新配置",
                "error"
              );
            }
            this.$lodash.each(_data, (_e, _i) => {
              _e.value = _e.tlTaxOrganizationId;
              _e.label = _e.tlTaxOrganizationName;
            });
            resolve(_data);
          })
          .catch(_erro => {
            reject(_erro);
            this.$error("获取税务数据接入机构失败");
          });
      });
    },
    // 过滤税务数据接入机构
    async filerTaxAgency(_taxData) {
      let tlTaxOrganizationId = _taxData.tlTaxOrganizationId;
      let tlTaxOrganizationName = _taxData.tlTaxOrganizationName;
      let tlTaxOrganizationIdFlag = "";
      this.taxAgencyList = await this.getTaxAgencyList();
      // 修复修改了TaxAgencyList列表的时候，下拉框匹配不上显示为数字的bug
      tlTaxOrganizationIdFlag = this.$lodash.find(this.taxAgencyList, _e => {
        return tlTaxOrganizationId === _e.tlTaxOrganizationId;
      });
      if (!tlTaxOrganizationIdFlag && tlTaxOrganizationId) {
        // 如果税务接入机构与历史数据匹配不到，那想历史数据添加到税务接入机构下拉框
        if (!this.hasSubmit) {
          // 在可编辑时
          this.organizationTax.tlTaxOrganizationId = null;
          delete this.organizationTax.tlTaxOrganizationName;
        } else {
          this.taxAgencyList.push({
            value: tlTaxOrganizationId,
            label: tlTaxOrganizationName
          });
        }
      }
    },
    getCreditLevelList() {
      this.creditLevelList = [
        { value: "A", label: "A" },
        { value: "B", label: "B" },
        { value: "C", label: "C" },
        { value: "D", label: "D" },
        { value: "M", label: "M" },
        { value: "X", label: "暂无评级" }
      ];
    },
    queryAuthorizationInfo() {
      if (!this.organizationTax.taxpayerNum) {
        this.confirmFn("纳税人识别码不能为空", "error");
        this.$refs.organizationTaxForm.validateField("taxpayerNum");
        return false;
      }
      if (!this.organizationTax.tlTaxOrganizationId) {
        this.confirmFn("税务接入机构不能为空", "error");
        this.$refs.organizationTaxForm.validateField("tlTaxOrganizationId");
        return false;
      }
      if (this.saveStatus) {
        // 纳税人识别码变了,提醒用户保存
        this.confirmFn(
          "纳税人识别码或税务接入机构被更改过，请重新保存后再获取授权信息"
        );
        return false;
      }
      this.impowerFlag = true;
      this.$MyFetch
        .get(spareApi.taxConfig.queryAuthory, {
          applicationId: this.applicationId
        })
        .then((_data = {}) => {
          // TP 第三方 DS 大数客户
          this.impowerFlag = false;
          if (!_data.thirdPartyCustomerCd) {
            this.confirmFn("查无数据");
            return false;
          }
          // 获取授权结果成功，可以进行下一步；
          this.submitFalg = false;
          if (_data.thirdPartyCustomerCd === "TP") {
            this.queryTax = false;
            this.confirmFn("客户授权成功且客户为第三方客户，可获取税务信息");
          } else if (_data.thirdPartyCustomerCd === "DS") {
            this.queryTax = true;
            this.confirmFn(
              "客户授权成功，且客户为非第三方客户，请保证综合信息已填"
            );
          }
        })
        .catch(_erro => {
          this.impowerFlag = false;
          this.confirmFn(_erro.message);
        });
    },
    checkTaxInfo() {
      this.openTaxInfoDg = true;
      this.$store.dispatch("setNum", this.applicationId);
    },
    closeCustomerTaxInfo() {
      this.openTaxInfoDg = false;
    }
  },
  components: {
    addGuarantor,
    houseMessage,
    customerTaxInfo,
    easyLoanHouseMsg
  },
  watch: {
    "organizationTax.taxpayerNum": function(_n, _o) {
      if (_o !== undefined && _n !== _o) {
        this.saveStatus = true;
      }
    },
    "organizationTax.tlTaxOrganizationId": function(_n, _o) {
      if (_o !== undefined && _n !== _o) {
        this.saveStatus = true;
      }
    },
    "customerInfo.organizationTaxInd": function(_n, _o) {
      if (_n && _o !== undefined) {
        this.getTaxAgencyList().then(_data => {
          this.taxAgencyList = _data;
        });
      }
    }
  },
  computed: {
    // 计算缴费次数
    premiumTermCnt() {
      let num = 0;
      let nowDate = new Date().normalizeTime().objDate;
      let setDate = new Date(this.policyEdit.effectiveDate).normalizeTime()
        .objDate;
      if (this.policyEdit.effectiveDate && this.policyEdit.paymentModeCode) {
        switch (this.policyEdit.paymentModeCode) {
          case "1":
            num = getMonthTimes();
            break;
          case "2":
            num = getQuarterTimes();
            break;
          case "3":
            num = getHalfTimes();
            break;
          case "4":
            num = getFullTimes();
            break;
        }
      }
      if (num <= 0) {
        num = 0;
      }
      function getMonthTimes() {
        return (
          (nowDate.Y - setDate.Y) * 12 +
          (nowDate.M - setDate.M + (nowDate.D - setDate.D >= 0 ? 1 : 0))
        );
      }
      function getQuarterTimes() {
        return Math.ceil(
          ((nowDate.Y - setDate.Y) * 12 +
            (nowDate.M - setDate.M + (nowDate.D - setDate.D >= 0 ? 1 : 0))) /
            3
        );
      }
      function getHalfTimes() {
        return Math.ceil(
          ((nowDate.Y - setDate.Y) * 12 +
            (nowDate.M - setDate.M + (nowDate.D - setDate.D >= 0 ? 1 : 0))) /
            6
        );
      }
      function getFullTimes() {
        return Math.ceil(
          ((nowDate.Y - setDate.Y) * 12 +
            (nowDate.M - setDate.M + (nowDate.D - setDate.D >= 0 ? 1 : 0))) /
            12
        );
      }
      return num;
    },
    // 判断保单是否有效
    isPolicyEffective() {
      let effect = false;
      let nowDate = new Date().normalizeTime().objDate;
      let setDate = new Date(this.policyEdit.effectiveDate).normalizeTime()
        .objDate;
      let fullTowYears =
        Math.floor(
          (nowDate.Y - setDate.Y) * 12 +
            (nowDate.M - setDate.M + (nowDate.D - setDate.D >= 0 ? 0 : -1))
        ) >= 24;
      if (
        !this.policyEdit.holderSwitchInd &&
        this.premiumTermCnt <= this.policyEdit.premiumTimesCnt &&
        fullTowYears
      ) {
        effect = true;
      }
      return effect;
    },
    // 计算年缴保费
    premiumAnnualAmt() {
      let num = 0;
      if (this.policyEdit.paymentModeCode && this.policyEdit.premiumCycleAmt) {
        switch (this.policyEdit.paymentModeCode) {
          case "1":
            num = (12 * (this.policyEdit.premiumCycleAmt * 1000000)) / 1000000;
            break;
          case "2":
            num = (4 * this.policyEdit.premiumCycleAmt * 1000000) / 1000000;
            break;
          case "3":
            num = (2 * this.policyEdit.premiumCycleAmt * 1000000) / 1000000;
            break;
          case "4":
            num = this.policyEdit.premiumCycleAmt;
            break;
        }
      }
      return num;
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.dialog-box__middle-1200 {
  height: 442px;
  overflow-y: auto;
  margin: 0 20px;
  padding: 25px 30px;
  box-shadow: 0 2px 6px 0 #d0d0d0;
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
/*表单区块*/
.dialog-box__middle-form {
  height: 542px;
  overflow-y: auto;
  padding: 0 20px;
  .form__block {
    padding: 20px 30px;
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
      display: flex;
      align-items: center;
      padding: 20px 0;
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
      // 修复IE11 三个button 换行的样式问题
      .dialog__table-box.tax_hack_ie {
        .el-form-item.btn_inline {
          margin-right: 0;
        }
      }
      .dialog__table-box .tax_box {
        border: 1px solid #e9e9e9;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
        border-radius: 4px;
        padding: 20px;
        .query_btn {
          width: 120px;
          margin-top: 31px;
          margin-right: 15px;
          height: 30px;
          border: none;
          /deep/ span {
            font-size: 14px;
          }
        }
        .query_auth {
          border: 1px solid #538bf1;
          color: #538bf1;
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
          background-color: #eeb352;
          color: #ffffff;
        }
        // 水平线
        .horizon {
          height: 1px;
          background-color: #d0d0d0;
        }
        .complex_info {
          padding: 20px 0;
          .title {
            font-size: 14px;
            .icon__gan {
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
        /deep/ .el-form-item__error {
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
.dialog-box .el-form-item {
  // margin-right: 30px;
}
.el-button--primary.is-disabled {
  background-color: #a0cfff;
}
.dialog__table-form-box {
  font-size: 12px;
  .table__box {
    border: 1px solid @line-color;
    border-radius: 4px;
    .table__head {
      .table__tr {
        .table__th {
          min-width: 83px;
        }
      }
    }
    .table__body {
      .table__tr {
        .table__tr__top-list {
          .table__td {
            min-width: 83px;
            max-width: 90px;
          }
        }
        .table__tr__bottom-list {
          .table__form-item {
            padding: 0 6px;
          }
          .operate-box {
            padding: 0 10px;
          }
        }
      }
    }
  }
}
.no-data {
  height: 60px;
  line-height: 60px;
  border: 1px solid #e9e9e9;
  border-top: none;
  font-size: 14px;
}
/deep/ .el-form-item__content {
  line-height: 20px;
}

</style>
<style scoped>
.with245 > div.el-form-item__content > div.el-date-editor > .el-input__prefix {
  right: auto;
  left: 5px;
}

</style>
