<template>
  <div class="complete-product">
    <div class="dialog-box__middle-form">
      <el-form :model="customerInfo"
               :rules="customerRule"
               ref="customerInfo"
               label-width="100px"
               class="demo-form-inline" label-position="top" >
        <div class="form__block bg__white border__radius-5" >
          <div class="dialog-box__middle-top">
            <h5 class="title"><span class="icon icon__gan"></span>基本信息</h5>
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
          </ul>
          <div class="dialog-box__form__group">
            <el-form-item label="性别">
              <el-radio-group v-model="customerInfo.genderCode" :disabled="!!hasSubmit">
                <el-radio-button
                  v-for="(item, index) in genderCodeLibrary"
                  :key="index"
                  :label="item.itemCode"
                  :disabled="customerInfo.genderCode !== item.itemCode">{{item.itemDesc}}</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="婚姻状况" prop="maritalStatusCode" class="width355">
              <el-select
                @change="changeRelation"
                v-model="customerInfo.maritalStatusCode"
                placeholder="请选择"
                :disabled="!!hasSubmit">
                <el-option
                  v-for="(item, index) in maritalLibrary"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="户籍地址" prop="registeredAddressCode" class="width355">
              <el-cascader
                :options="options"
                v-model="customerInfo.registeredAddressCode"
                @change="changeHandler"
                :disabled="!!hasSubmit"
                >
              </el-cascader>
            </el-form-item>
            <el-form-item label="户籍详细地址" prop="registeredAddressDesc" class="width355">
              <el-input v-model="customerInfo.registeredAddressDesc" maxlength="100" :disabled="!!hasSubmit"></el-input>
            </el-form-item>
            <el-form-item label="有无本地房产" class="margin__0"  >
              <el-switch v-model="customerInfo.localEstateInd"
                         :width="50"
                         active-text="有"
                         inactive-text="无"
                         :active-value="true"
                         :inactive-value="false"
                         :disabled="!!hasSubmit"
              ></el-switch>
            </el-form-item>
            <el-form-item label="居住状况" prop="houseConditionCode" class="el-form-item__33">
              <el-select v-model="customerInfo.houseConditionCode" placeholder="请选择" :disabled="!!hasSubmit">
                <el-option
                  v-for="(item, index) in houseConditionLibrary"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"></el-option>
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
                @change="changeHandler"
                :disabled="!!hasSubmit"
              >
              </el-cascader>
            </el-form-item>
            <el-form-item label="居住详细地址" prop="houseAddressDesc" class="el-form-item__33">
              <el-input v-model="customerInfo.houseAddressDesc" maxlength="100" :disabled="!!hasSubmit"></el-input>
            </el-form-item>
            <el-form-item label="单位名称" prop="workplaceName" class="el-form-item__33">
              <el-input v-model="customerInfo.workplaceName" maxlength="100" :disabled="!!hasSubmit"></el-input>
            </el-form-item>
            <el-form-item label="单位地址" prop="workAddressCode" class="el-form-item__33">
              <el-cascader
                clearable
                :options="options"
                v-model="customerInfo.workAddressCode"
                :disabled="!!hasSubmit"
                @change="changeHandler">
              </el-cascader>
            </el-form-item>
            <el-form-item label="客户类型" prop="careerTypeCode" class="el-form-item__33">
              <el-select
                @change="removeValue"
                v-model="customerInfo.careerTypeCode"
                placeholder="请选择" :disabled="!!hasSubmit">
                <el-option
                  v-for="(item, index) in careerLibrary"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="占股情况" prop="sharePercent" class="el-form-item__33">
              <el-select
                v-model="customerInfo.sharePercent" placeholder="请选择"
                :disabled="!!hasSubmit || (!customerInfo.registeredInd)">
                <el-option
                  v-for="(item, index) in sharePercentLibrary"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="成立日期" prop="foundDate" class="el-form-item__33">
              <el-date-picker
                v-model="customerInfo.foundDate"
                type="date"
                value-format="timestamp"
                :disabled="!!hasSubmit || (customerInfo.careerTypeCode !== this.dCode.careerTypeCode.boss) || !customerInfo.registeredInd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <div class="el-form-item__33">
              <el-form-item label="6个月内是否正常缴纳公积金" prop="delivery"  >
                <el-switch v-model="customerInfo.houseFund6mInd"
                           :width="50"
                           active-text="是"
                           inactive-text="否"
                           :disabled="!!hasSubmit"
                           :active-value="true"
                           :inactive-value="false"></el-switch>
              </el-form-item>
              <el-form-item label="是否注册" prop="delivery">
                <el-switch v-model="customerInfo.registeredInd"
                           @change="customerInfo.sharePercent = null; customerInfo.foundDate = null"
                           :width="50"
                           active-text="是"
                           inactive-text="否"
                           :disabled="!!hasSubmit || (customerInfo.careerTypeCode !== this.dCode.careerTypeCode.boss)"
                           :active-value="true"
                           :inactive-value="false"></el-switch>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="form__block bg__white border__radius-5" >
          <div class="dialog-box__middle-top">
            <h5 class="title"><span class="icon icon__gan"></span>详细信息</h5>
          </div>
          <ul class="table__list">
            <li class="item">
              <el-form-item label="是否有保单" required>
                <el-radio-group v-model="customerInfo.insurancePolicyInd" :disabled="!!hasSubmit">
                  <el-radio   :label="true">是</el-radio>
                  <el-radio  :label="false">否</el-radio>
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
                            <li class="table__td">{{(item.policyStatusInd)?'有效': (item.policyStatusInd === null ? '' : '其他')}}</li>
                            <li class="table__td">{{paymentModeCodeClass[item.paymentModeCode]}}</li>
                            <li class="table__td">{{item.premiumCycleAmt}}元</li>
                            <li class="table__td">{{item.premiumAnnualAmt}}元</li>
                            <li class="table__td">{{item.premiumTermCnt}}</li>
                            <li class="table__td">{{item.premiumTimesCnt}}</li>
                            <li class="table__td">{{(item.holderSwitchInd === null) ? '/': (item.holderSwitchInd ? '是' : '否') }}</li>
                            <li class="table__td">{{(item.availableInd === null) ? '/': (item.availableInd ? '是' : '否')}}</li>
                            <li class="table__td">
                              <div class="operate-box" v-if="!hasSubmit">
                                <i class="icon el-icon-plus cursor__pointer"
                                   v-show="index === (policyList.length-1) && !policyEditDg"
                                @click="openAddPolicy"></i>
                                <i class="icon el-icon-minus cursor__pointer" @click="deletePolicy(item.id)"></i>
                                <i class="icon icon__edit cursor__pointer" @click="editPolicyELe(item)"></i>
                              </div>
                            </li>
                          </ul>
                          <el-form :model="policyEdit"
                                   :rules="policyRule"
                                   :ref="'policyEditForm' + index"
                                   label-width="100px"
                                   class="demo-form-inline" label-position="top" v-if="item.showFormEle">
                            <div class="table__tr__bottom-list" >
                              <el-form-item label="" prop="insuranceCompanyCode" class="table__form-item">
                                <el-select v-model="policyEdit.insuranceCompanyCode" placeholder="请选择">
                                  <el-option
                                    v-for="(item, index) in policyCompanyList"
                                    :label="item.itemDesc"
                                    :value="item.itemCode"
                                    :key="index"></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label="" prop="mainRiskName" class="table__form-item">
                                <el-input v-model="policyEdit.mainRiskName" maxlength="50"></el-input>
                              </el-form-item>
                              <el-form-item label="" prop="policyNum" class="table__form-item">
                                <el-input v-model="policyEdit.policyNum" maxlength="30"></el-input>
                              </el-form-item>
                              <el-form-item label="" prop="effectiveDate" class="table__form-item">
                                <el-date-picker
                                  v-model="policyEdit.effectiveDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="" prop="policyStatusInd" class="table__form-item">
                                <el-select v-model="policyEdit.policyStatusInd" placeholder="请选择">
                                  <el-option label="有效" :value="true"></el-option>
                                  <el-option label="其他" :value="false"></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label="" prop="paymentModeCode" class="table__form-item">
                                <el-select v-model="policyEdit.paymentModeCode" placeholder="请选择">
                                  <el-option
                                    v-for="(item, index) in paymentModeCodeLibrary"
                                    :key="index"
                                    :label="item.itemDesc"
                                    :value="item.itemCode"></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label="" prop="premiumCycleAmt" class="table__form-item">
                                <el-input
                                  @blur="formatMoney('policyEdit', 'premiumCycleAmt')"
                                  v-model="policyEdit.premiumCycleAmt"
                                  maxlength="8"></el-input>
                              </el-form-item>
                              <el-form-item label="" class="table__form-item">
                                <el-input v-model="premiumAnnualAmt" readonly></el-input>
                              </el-form-item>
                              <el-form-item label="" prop="paymentTermCnt" class="table__form-item">
                                <el-input v-model="premiumTermCnt" readonly></el-input>
                              </el-form-item>
                              <el-form-item label="" prop="premiumTimesCnt" class="table__form-item">
                                <el-input v-model="policyEdit.premiumTimesCnt" maxlength="3"></el-input>
                              </el-form-item>
                              <el-form-item  class="table__form-item text__center">
                                <el-switch
                                  v-model="policyEdit.holderSwitchInd"
                                  :width="50"
                                  :active-value="true"
                                  :inactive-value="false"></el-switch>
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
                                <i class="icon el-icon-check cursor__pointer" @click="saveEditPolicy('policyEditForm' + index, item)"></i>
                                <i class="icon el-icon-minus cursor__pointer" @click="closeEditPolicy(item)"></i>
                              </div>
                            </div>
                          </el-form>
                        </div>
                      </li>
                      <li class="table__body" v-if="policyList.length === 0 || policyEditDg">
                        <div class="table__tr">
                          <el-form :model="policyEdit"
                                   :rules="policyRule"
                                   ref="policyAddForm"
                                   label-width="100px"
                                   class="demo-form-inline" label-position="top">
                            <div class="table__tr__bottom-list" >
                              <el-form-item label="" prop="insuranceCompanyCode" class="table__form-item">
                                <el-select v-model="policyEdit.insuranceCompanyCode" placeholder="请选择">
                                  <el-option
                                    v-for="(item, index) in policyCompanyList"
                                    :label="item.itemDesc"
                                    :value="item.itemCode"
                                  :key="index"></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label="" prop="mainRiskName" class="table__form-item">
                                <el-input v-model="policyEdit.mainRiskName" maxlength="50"></el-input>
                              </el-form-item>
                              <el-form-item label="" prop="policyNum" class="table__form-item">
                                <el-input v-model="policyEdit.policyNum" maxlength="30"></el-input>
                              </el-form-item>
                              <el-form-item label="" prop="effectiveDate" class="table__form-item">
                                <el-date-picker
                                  v-model="policyEdit.effectiveDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="" prop="policyStatusInd" class="table__form-item">
                                <el-select v-model="policyEdit.policyStatusInd" placeholder="请选择">
                                  <el-option label="有效" :value="true"></el-option>
                                  <el-option label="其他" :value="false"></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label="" prop="paymentModeCode" class="table__form-item">
                                <el-select v-model="policyEdit.paymentModeCode" placeholder="请选择">
                                  <el-option
                                    v-for="(item, index) in paymentModeCodeLibrary"
                                    :label="item.itemDesc"
                                    :value="item.itemCode"
                                    :key="index"></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label="" prop="premiumCycleAmt" class="table__form-item">
                                <el-input
                                  @blur="formatMoney('policyEdit', 'premiumCycleAmt')"
                                  v-model="policyEdit.premiumCycleAmt"></el-input>
                              </el-form-item>
                              <el-form-item label="" class="table__form-item">
                                <el-input v-model="premiumAnnualAmt" readonly></el-input>
                              </el-form-item>
                              <el-form-item label="" prop="paymentTermCnt" class="table__form-item">
                                <el-input v-model="premiumTermCnt" readonly></el-input>
                              </el-form-item>
                              <el-form-item label="" prop="premiumTimesCnt" class="table__form-item">
                                <el-input v-model="policyEdit.premiumTimesCnt" maxlength="20"></el-input>
                              </el-form-item>
                              <el-form-item  class="table__form-item text__center">
                                <el-switch
                                  v-model="policyEdit.holderSwitchInd"
                                  :width="50"
                                  :active-value="true"
                                  :inactive-value="false"></el-switch>
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
                                <i class="icon el-icon-minus cursor__pointer" @click="closeAddPolicy"></i>
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
            <li class="item">
              <el-form-item label="是否有房" required>
                <el-radio-group v-model="customerInfo.estateInd" :disabled="!!hasSubmit">
                  <el-radio   :label="true">是</el-radio>
                  <el-radio   :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <transition name="fade">
                <div class="dialog__table-box customer-message" v-if="customerInfo.estateInd">
                  <el-tabs v-model="TabActiveName" class="tab-box">
                    <el-tab-pane label="房产信息" name="first"></el-tab-pane>
                    <el-tab-pane label="担保人信息" name="second"></el-tab-pane>
                  </el-tabs>
                  <span class="button font__blue add__btn" @click="openMessageBox" v-if="!hasSubmit"><span class="icon icon__add">+</span>新增</span>
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
                          <td>{{item.mortgageInd ? '是':(item.mortgageInd === null ? '' : '否')}}</td>
                          <td>{{item.coownersCnt}}</td>
                          <td>{{item.propertySharePercent}}%</td>
                          <td>{{item.houseSizeMeas}}平方米</td>
                          <td>{{item.slAverageAmt}}</td>
                          <td>{{item.inputAverageAmt}}</td>
                          <td>
                            <div class="operate-box">
                              <i class="icon el-icon-minus cursor__pointer" @click="deleteHouseMessage(item.id)" v-if="!hasSubmit"></i>
                              <i class="icon icon__edit cursor__pointer" @click="openMessageBox(item)"></i>
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
                      <table >
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
                              <i class="icon el-icon-minus cursor__pointer" @click="deleteGuarantor(item.id)" v-if="!hasSubmit"></i>
                              <i class="icon icon__edit cursor__pointer" @click="openMessageBox(item)"></i>
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
            <li class="item">
              <el-form-item label="是否有信用卡车供" required>
                <el-radio-group v-model="customerInfo.carloanInd" :disabled="!!hasSubmit">
                  <el-radio   :label="true">是</el-radio>
                  <el-radio  :label="false">否</el-radio>
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
                            <li class="table__td">{{(item.loanStatusCode === dCode.loanStatusCode.normal) ? '正常' : '结清'}}</li>
                            <li class="table__td">{{getTime(item.settlementDate)}}</li>
                            <li class="table__td">{{item.monthlyRepaymentAmt}}元</li>
                            <li class="table__td">{{(item.availableInd === null) ? '/' : (item.availableInd? '是' : '否')}}</li>
                            <li class="table__td">
                              <div class="operate-box" v-if="!hasSubmit">
                                <i class="icon el-icon-plus cursor__pointer" @click="openAddCar" v-if="index  === (carList.length -1) && !carEditDg"></i>
                                <i class="icon el-icon-minus cursor__pointer" @click="deleteCar(item.id)"></i>
                                <i class="icon icon__edit cursor__pointer" @click="editCarELe(item)"></i>
                              </div>
                            </li>
                          </ul>
                          <el-form :model="carEdit"
                                   :rules="carRule"
                                   :ref="'carEditForm' + index"
                                   class="demo-form-inline" label-position="top" v-show="item.showFormEle">
                            <div class="table__tr__bottom-list" >
                              <el-form-item label="" prop="bankCode" class="table__form-item">
                                <el-input v-model="carEdit.bankCode" maxlength="40"></el-input>
                              </el-form-item>
                              <el-form-item label="" prop="loanAmt" class="table__form-item">
                                <el-input v-model="carEdit.loanAmt" maxlength="8"></el-input>
                              </el-form-item>
                              <el-form-item label="" prop="loanDate" class="table__form-item">
                                <el-date-picker
                                  v-model="carEdit.loanDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="" prop="dueDate" class="table__form-item">
                                <el-date-picker
                                  v-model="carEdit.dueDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="" prop="firstRepaymentDate" class="table__form-item">
                                <el-date-picker
                                  v-model="carEdit.firstRepaymentDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="" prop="loanStatusCode" class="table__form-item">
                                <el-select v-model="carEdit.loanStatusCode" placeholder="请选择" @change="clearCarDate('carEditForm' + index)">
                                  <el-option
                                    v-for="(item, index) in carLoanStatusCodeLibrary"
                                    :key="index"
                                    :label="item.itemDesc"
                                    :value="item.itemCode"></el-option>

                                </el-select>
                              </el-form-item>
                              <el-form-item label="" prop="settlementDate" class="table__form-item">
                                <el-date-picker
                                  v-model="carEdit.settlementDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  :disabled="!(carEdit.loanStatusCode === dCode.loanStatusCode.settle)"
                                  placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="" prop="monthlyRepaymentAmt" class="table__form-item">
                                <el-input v-model="carEdit.monthlyRepaymentAmt" maxlength="8"></el-input>
                              </el-form-item>
                              <el-form-item label="" class="table__form-item">
                                <el-select v-model="carEdit.availableInd" placeholder="请选择" disabled>
                                  <el-option label="是" :value="true"></el-option>
                                  <el-option label="否" :value="false"></el-option>
                                </el-select>
                              </el-form-item>
                              <div class="operate-box text__center" v-if="!hasSubmit">
                                <i class="icon el-icon-check cursor__pointer" @click="saveEditCar('carEditForm' + index, item)" ></i>
                                <i class="icon el-icon-minus cursor__pointer" @click="closeCarEle(item)"></i>
                              </div>
                            </div>
                          </el-form>
                        </div>
                      </li>
                      <li class="table__body" v-show="carList.length === 0 || carEditDg">
                        <div class="table__tr">
                          <el-form :model="carEdit"
                                   :rules="carRule"
                                   ref="carAddForm"
                                   class="demo-form-inline" label-position="top">
                            <div class="table__tr__bottom-list" >
                              <el-form-item  prop="bankCode" class="table__form-item">
                                <el-input v-model="carEdit.bankCode" maxlength="40"></el-input>
                              </el-form-item>
                              <el-form-item  prop="loanAmt" class="table__form-item">
                                <el-input v-model="carEdit.loanAmt" maxlength="8"></el-input>
                              </el-form-item>
                              <el-form-item  prop="loanDate" class="table__form-item">
                                <el-date-picker
                                  v-model="carEdit.loanDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item  prop="dueDate" class="table__form-item">
                                <el-date-picker
                                  v-model="carEdit.dueDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item  prop="firstRepaymentDate" class="table__form-item">
                                <el-date-picker
                                  v-model="carEdit.firstRepaymentDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item  prop="loanStatusCode" class="table__form-item">
                                <el-select v-model="carEdit.loanStatusCode" placeholder="请选择" @change="clearCarDate('carAddForm')">
                                  <el-option
                                    v-for="(item, index) in carLoanStatusCodeLibrary"
                                    :key="index"
                                    :label="item.itemDesc"
                                    :value="item.itemCode"></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label="" prop="settlementDate" class="table__form-item">
                                <el-date-picker
                                  v-model="carEdit.settlementDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  :disabled="!(carEdit.loanStatusCode === dCode.loanStatusCode.settle)"
                                  placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="" prop="monthlyRepaymentAmt" class="table__form-item">
                                <el-input v-model="carEdit.monthlyRepaymentAmt" maxlength="8"></el-input>
                              </el-form-item>
                              <el-form-item label="" class="table__form-item">
                                <el-select v-model="carEdit.availableInd" placeholder="请选择" disabled>
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
            <!-- 添加税务贷 -->
            <li class="item">
              <el-form-item label="是否有企税信息" required>
                <el-radio-group v-model="customerInfo.organizationTaxInd" :disabled="!!hasSubmit">
                  <el-radio  :label="true">是</el-radio>
                  <el-radio  :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <transition name="fade">
                <div class="dialog__table-box tax_hack_ie" v-if="customerInfo.organizationTaxInd">
                  <el-form :model="organizationTax"
                    :rules="organizationTaxRule"
                    ref="organizationTaxForm" label-position="top">
                    <div class="tax_box">
                      <el-form-item label="税务数据接入结构" class="width245" prop="tlTaxOrganizationId">
                        <el-select v-model="organizationTax.tlTaxOrganizationId"
                          placeholder="请选择" :disabled="!!hasSubmit"
                          @change="taxAgencyChange">
                          <el-option
                            v-for="(item, index) in taxAgencyList"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="纳税人识别码" prop="taxpayerNum" class="width245">
                        <el-input v-model="organizationTax.taxpayerNum" :disabled="!!hasSubmit"></el-input>
                      </el-form-item>
                      <el-form-item class="btn_inline">
                        <el-button size="small" class="query_btn query_auth" @click="queryAuthorizationInfo" :disabled="queryImpowerBtnStatus || impowerFlag" v-if="!hasSubmit">获取授权结果</el-button>
                        <el-button size="small" type="primary" :disabled="queryTax || queryImpowerBtnStatus"
                          class="query_btn query_tax" @click="queryTaxInfo" v-if="!hasSubmit">获取税务信息</el-button>
                        <el-button size="small" type="warning" class="query_btn" @click="checkTaxInfo">查看税务信息</el-button>
                      </el-form-item>
                      <div class="horizon"></div>
                      <div class="complex_info">
                        <h5 class="title"><span class="icon icon__gan"></span>综合信息</h5>
                      </div>
                      <div>
                        <el-form-item label="近一年企业年缴税额（元）" prop="nearly1YrAnnlPayTaxAmt" class="width250">
                          <el-input v-model="organizationTax.nearly1YrAnnlPayTaxAmt" maxlength="100" :disabled="!!hasSubmit"></el-input>
                        </el-form-item>
                        <el-form-item label="近一年企业信用评级" class="width245" prop="nearly1YrOrgCrLvlCd">
                          <el-select v-model="organizationTax.nearly1YrOrgCrLvlCd"
                            placeholder="请选择" :disabled="!!hasSubmit" clearable>
                            <el-option
                              v-for="item in creditLevelList"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="借款人最早缴税日期" prop="custPayTaxStartDate" class="width245">
                          <el-date-picker
                            v-model="organizationTax.custPayTaxStartDate"
                            type="date"
                            value-format="yyyy-MM-dd hh:mm:ss"
                            :disabled="!!hasSubmit"
                            placeholder="选择日期"
                            :editable='false'>
                          </el-date-picker>
                        </el-form-item>
                        <el-form-item
                          label="当前是否有未缴清税款"
                          prop="notPayUpTaxInd">
                          <el-switch v-model="organizationTax.notPayUpTaxInd" :width=50 :disabled="!!hasSubmit"></el-switch>
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
      </el-form>
      <div class="form__block bg__white border__radius-5" >
        <div class="dialog-box__middle-top">
          <h5 class="title"><span class="icon icon__gan"></span>补充个人信息</h5>
        </div>
        <ul class="message__list clearfix">
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
            <el-form-item label="户籍类型" prop="registerTypeCode" class="el-form-item__33">
              <el-select
                v-model="customerAddInfo.registerTypeCode"
                :disabled="hasSubmit"
                placeholder="请选择">
                <el-option
                  v-for="(item, index) in registerTypeCodeLibrary"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="借款人行业名称" prop="industryCode" class="el-form-item__33">
              <el-select
              v-model="customerAddInfo.industryCode"
              :disabled="hasSubmit"
              placeholder="请选择">
              <el-option
                v-for="(item, index) in industryCodeLibrary"
                :key="index"
                :label="item.itemDesc"
                :value="item.itemCode"></el-option>
              </el-select>
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
            <el-form-item label="个人税收客户类型" prop="customerTaxCd" class="el-form-item__33">
              <el-select
                v-model="customerAddInfo.customerTaxCd"
                :disabled="hasSubmit"
                placeholder="请选择">
                <el-option
                  v-for="(item, index) in customerTaxCdLibrary"
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
        <div class="dialog-box__form__group margin-top__20" style="padding-top: 10px">
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
                :disabled="!(customerInfo.maritalStatusCode === dCode.maritalStatusCode.married || customerInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage) || hasSubmit"
                placeholder="请填写姓名"></el-input>
            </el-form-item>
            <el-form-item label="证件类型" prop="spouseIDTypeCode" class="el-form-item__25">
              <el-select
                v-model="customerContactsInfo.spouseIDTypeCode"
                :disabled="!(customerInfo.maritalStatusCode === dCode.maritalStatusCode.married || customerInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage) || hasSubmit"
                placeholder="请选择证件类型">
                <el-option
                  v-for="(item, index) in certificateTypeLibrary"
                  :key="index"
                  :label="item.itemDesc"
                  :value="item.itemCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="证件号码" prop="spouseID" class="el-form-item__25" >
              <el-input
                v-model="customerContactsInfo.spouseID"
                :disabled="!(customerInfo.maritalStatusCode === dCode.maritalStatusCode.married || customerInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage) || hasSubmit"
                placeholder="请填写证件号码"></el-input>
            </el-form-item>
            <el-form-item label="配偶联系方式" prop="spouseMobile" class="el-form-item__25">
              <el-input v-model="customerContactsInfo.spouseMobile" placeholder="请填写配偶联系方式" :disabled="!(customerInfo.maritalStatusCode === dCode.maritalStatusCode.married || customerInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage) || hasSubmit"></el-input>
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
                :disabled="(customerInfo.maritalStatusCode === dCode.maritalStatusCode.married || customerInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage) || hasSubmit"
                placeholder="请填写姓名"></el-input>
            </el-form-item>
            <el-form-item label="亲属联系人关系" prop="relationshipCode" class="el-form-item__25">
              <el-select
                @change="$refs.customerRelationForm.validateField('remark');if(customerRelation.relationshipCode !== dCode.familyRelationship.other){customerRelation.remark = ''}"
                v-model="customerRelation.relationshipCode"
                :disabled="(customerInfo.maritalStatusCode === dCode.maritalStatusCode.married || customerInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage) || hasSubmit"
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
                :disabled="(customerInfo.maritalStatusCode === dCode.maritalStatusCode.married || customerInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage) || (customerRelation.relationshipCode !== this.dCode.familyRelationship.other) || hasSubmit"
                v-model="customerRelation.remark"
                placeholder="请填写其他说明"></el-input>
            </el-form-item>
            <el-form-item label="亲属联系方式" prop="mobile" class="el-form-item__25">
              <el-input
                v-model="customerRelation.mobile"
                :disabled="(customerInfo.maritalStatusCode === dCode.maritalStatusCode.married || customerInfo.maritalStatusCode === dCode.maritalStatusCode.remarriage) || hasSubmit"
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
                @change="changeRelationship"
                :disabled="hasSubmit"
                v-model="customerNonRelation.relationshipCode"
                placeholder="请选择请非请亲属联系人关系">
                <el-option
                  @change="$refs.customerNonRelationForm.validateField('remark');if(customerNonRelation.relationshipCode !== dCode.relationshipCode.other){customerNonRelation.remark = ''}"
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
            <el-form-item label="非亲属联系人联系方式" prop="mobile" class="el-form-item__25">
              <el-input v-model="customerNonRelation.mobile"
                        :disabled="hasSubmit"
                        placeholder="请填写非亲属联系方式"></el-input>
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
            <el-form-item label="申请金额（元）" prop="applicationSubmitAmt" class="el-form-item__25" >
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
        <el-form
          :model="marketingInfo"
          :rules="marketingInfoRule"
          ref="marketingInfoForm"
          label-width="100px"
          class="demo-form-inline" label-position="top" >
          <div class="dialog-box__middle-top">
            <h5 class="title"><span class="icon icon__gan"></span>营销信息</h5>
          </div>
          <div class="dialog-box__form__group margin-top__20" style="padding-top: 10px">
            <div class="drop__select-box el-form-item__25">
              <p class="lab">渠道名称</p>
              <button class="button"
                      type="button"
                      :disabled="hasSubmit || marketingInfo.channelCodeInd"
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
                      :disabled="!(selectChannel.exclusiveChannelId === '000001')|| hasSubmit || marketingInfo.channelCodeInd"> {{selectOtherChannel.channelName}} <i class="icon el-select__caret el-input__icon el-icon-arrow-up"></i> </button>
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
              <el-input v-model="marketingInfo.assistantName" placeholder="请填写业务助理" disabled></el-input>
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
            <el-form-item label="营销单位编码" class="el-form-item__25" >
              <el-input v-model="marketingInfo.saleTeamId" placeholder="暂无信息" disabled></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <div class="form__bottom text__center">
        <el-button
          @click="saveAll"
          class="button__border-blue  button button__width-200"
          :disabled="hasSubmit">保存</el-button>
        <el-button
          :disabled="hasSubmit || submitStatus || hasTaxInfo"
          type="primary"
          class="button__width-200 "
          @click="submitCustomer">提交</el-button>
      </div>
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
      <house-message
        v-if="openHouseMessageDg"
        :has-submit="hasSubmit"
        @close="closeHouseMessage"
        :house-id="houseId"
        :house-id-list="houseIdList"
        :areaList="options"
        :application-id="applicationId"></house-message>
    </transition>
    <!-- 税务贷 税务信息 弹窗 -->
    <transition name="fade">
      <customer-tax-info
        v-if="openTaxInfoDg"
        @close="closeCustomerTaxInfo"
        :taxPayerNum="organizationTax.taxpayerNum"
        class="solving_tax"></customer-tax-info>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import {spareApi} from '../../../js/server.js';
  import myRules from '@common/js/rules.js';
  import addGuarantor from './add_guarantor';
  import houseMessage from './house_message';
  import customerTaxInfo from './customer_tax_info';
    export default {
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
          submitStatus: false,
          submitFalg: true,
          hasTaxInfo: false,
          visible2: false,
          hasSubmit: false, // 是否提交过
          // 性别
          genderCodeLibrary: [],
          // 证件类型字典
          certificateClass: {},
          certificateTypeLibrary: [],
          certificateLibrary2: [],
          certificate2Class: [],
          // 婚姻状况字典
          maritalLibrary: [],
          // 客户类型字典
          careerLibrary: [],
          // 居住状况字典
          houseConditionLibrary: [],
          // 占股字典
          sharePercentLibrary: [],
          // 户籍类型字段
          registerTypeCodeLibrary: [],
          // 借款人行业字典
          industryCodeLibrary: [],
          // 信用报告来源字典
          reportSourceCodeLibrary: [],
          // 亲属联系人关系
          relationshipCodeLibrary: [],
          // 非亲属联系人关系
          nonRelationshipCodeLibrary: [],
          // 贷款状态字典
          carLoanStatusCodeLibrary: [],
          // 教育程度字典
          educationLevelLibrary: [],
          // 户口所在地
          registeredAreaLibrary: [],
          // 单位性质
          organizationTypeLibrary: [],
          // 个人税收客户类型
          customerTaxCdLibrary: [],
          // 职务类型
          positionTypeLibrary: [],
          currentStep: 1,
          tableData: [],
          // 地区列表
          options: [],
          // 房屋性质字典
          houseClass: {},
          // 缴费方式
          paymentModeCodeLibrary: [],
          paymentModeCodeClass: {},
          // 基本信息
          customerInfo: {
            registeredAddressCode: [],
            houseAddressCode: [],
            workAddressCode: [],
            maritalStatusCode: null,
            houseConditionCode: null,
            sharePercent: null,
            careerTypeCode: null
          },
          customerRule: {
            maritalStatusCode: [
              { required: true, message: '请选择婚姻状况', trigger: 'change' }
            ],
            registeredAddressCode: [
              { required: true, message: '请选择户籍地址', trigger: 'change' }
            ],
            registeredAddressDesc: [
              { required: true, message: '请填写户籍详细地址', trigger: 'blur' },
              { validator: myRules.addressRule, trigger: 'blur' }
            ],
            houseConditionCode: [
              { required: true, message: '请选择居住状况', trigger: 'change' }
            ],
            certificateGrantorName: [
              { required: true, message: '请填写身份证签发机关', trigger: 'blur' }
            ],
            houseAddressCode: [
              { required: true, message: '请选择居住地址', trigger: 'change' }
            ],
            houseAddressDesc: [
              { required: true, message: '请填写居住详细地址', trigger: 'blur' },
              { validator: myRules.addressRule, trigger: 'blur' }
            ],
            workplaceName: [
              { required: true, message: '请填单位名称', trigger: 'blur' },
              { validator: myRules.companyNameRule, trigger: 'blur' }
            ],
            workAddressCode: [
              { required: true, message: '请选择单位地址', trigger: 'change' }
            ],
            careerTypeCode: [
              { required: true, message: '请选择客户类型', trigger: 'change' }
            ],
            sharePercent: [
              { validator: this.sharePercentRule, trigger: 'change' }
            ],
            foundDate: [
              { validator: this.foundDateRule, trigger: 'blur' }
            ]
          },
          openAddGuarantorDg: false,
          TabActiveName: 'first',
          // 保险表格数据
          policyList: [],
          policyEdit: {},
          policyCurrentEdit: {}, // 当前正被编辑保险项
          policyEditDg: false,
          policyRule: {
            insuranceCompanyCode: [
              { required: true, message: '请选择寿险公司', trigger: 'change' }
            ],
            mainRiskName: [
              { required: true, message: '请填写主险名称', trigger: 'blur' },
              { max: 50, message: "长度不超过50个字符", trigger: "blur" }
            ],
            policyNum: [
              { required: true, message: '请填写保单号', trigger: 'blur' },
              { validator: this.checkPolicyNum, trigger: 'blur' }
            ],
            effectiveDate: [
              { required: true, message: '请选择生效日期', trigger: 'blur' }
            ],
            policyStatusInd: [
              { required: true, message: '请选择保单状态', trigger: 'change' }
            ],
            paymentModeCode: [
              { required: true, message: '请选择缴费方式', trigger: 'change' }
            ],
            premiumCycleAmt: [
              { required: true, message: '请填写期缴保费', trigger: 'blur' },
              { validator: myRules.numTwoBit, trigger: 'blur' },
              {validator: this.eightBitRule, trigger: 'blur'}
            ],
            premiumTimesCnt: [
              { required: true, message: '请填写缴费次数', trigger: 'blur' },
              { validator: myRules.nonNegative, trigger: 'blur' }
            ]
          },
          policyCompanyList: [],
          // 车供表格数据
          carList: [],
          carEdit: {
            settlementDate: ''
          },
          carCurrentEdit: {},
          carEditDg: false,
          carRule: {
            bankCode: [
              { required: true, message: '请填写贷款发放银行', trigger: 'blur' },
              { validator: myRules.chineseChart, trigger: 'blur' }
            ],
            loanAmt: [
              { required: true, message: '请填写贷款发放金额', trigger: 'blur' },
              { validator: myRules.nonNegative, trigger: 'blur' }
            ],
            date: [
              { required: true, message: '请选择日期', trigger: 'change' }
            ],
            loanStatusCode: [
              {required: true, message: '请选择贷款状态', trigger: 'change'}
            ],
            monthlyRepaymentAmt: [
              {required: true, message: '请填写贷款月还金额', trigger: 'blur'},
              { validator: myRules.positiveRule, trigger: 'blur' }
            ],
            loanDate: [
              { required: true, message: '请选择日期', trigger: 'change' }
            ],
            dueDate: [
              { required: true, message: '请选择日期', trigger: 'change' }
            ],
            settlementDate: [
              {
                validator: (rule, value, callback) => {
                  if (this.carEdit.loanStatusCode === this.dCode.loanStatusCode.settle && !value) {
                    return callback(new Error('请选择贷款结清日期!'));
                  } else {
                    callback();
                  }
                },
                trigger: 'change'
              }
            ],
            firstRepaymentDate: [
              { required: true, message: '请选择日期', trigger: 'change' }
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
          estateLimitCnt: 0,
          // 担保人信息
          guarantorList: [],
          guarantorId: '', // 被选中编辑的列表
          guarantorHouseId: '', // 被选中的列表 房产证号
          guarantorHouseIdList: [], // 已经有担保人的房产证号
          enableHouseIdList: [], // 可被选中的房产证号
          // 原完善信息页面
          dropSelectShow1: false,
          dropSelectShow2: false,
          dropSelectShow3: false,
          activeName: 'first',
          // 业务类型下拉字典项
          businessLibrary: [],
          // 个人类型
          personalTypeCdLibrary: [],
          // 产品下拉字典
          selectInfo: {},
          customerAddInfo: {
            departmentName: null,
            jobTitle: null,
            industryCode: '',
            registerTypeCode: '',
            educationLevelCd: null,
            positionTypeCd: null,
            presentWorkYearCnt: '',
            organizationTypeCd: null,
            haveChildInd: null,
            registeredAreaCd: null,
            personalTypeCd: null,
            customerTaxCd: null

          }, // 个人信息
          customerAddInfoRule: {
            wechat: [
              { required: true, message: '请输入微信号', trigger: 'blur' }
            ],
            jobTitle: [
              { required: true, message: '请输入职务名称', trigger: 'blur' },
              { validator: myRules.allChart, trigger: 'blur' }
            ],
            departmentName: [
              { required: true, message: '请输入所在部门', trigger: 'blur' },
              { validator: myRules.allChart, trigger: 'blur' }
            ],
            workAddressDesc: [
              { required: true, message: '请输入详细地址', trigger: 'blur' },
              { validator: myRules.addressRule, trigger: 'blur' }
            ],
            monthlyIncomeAmt: [
              { required: true, message: '请输入月收入', trigger: 'blur' },
              { validator: myRules.positiveRule, trigger: 'blur' }
            ],
            workAreaNum: [
              { validator: myRules.areaNumRule, trigger: 'blur' }
            ],
            workPhoneNum: [
              { validator: myRules.fix_only_phoneRule, trigger: 'blur' }
            ],
            hrContactName: [
              { validator: this.checkHr, trigger: 'blur' },
              { validator: myRules.nameRule, trigger: 'blur' }
            ],
            hrContactNum: [
              { validator: this.checkHrPhone, trigger: 'blur' }
            ],
            houseZipcode: [
              { required: true, message: '请输入邮编', trigger: 'blur' },
              { validator: myRules.postRule, trigger: 'blur' }
            ],
            zipcode: [
              { required: true, message: '请输入邮编', trigger: 'blur' },
              { validator: myRules.postRule, trigger: 'blur' }
            ],
            industryCode: [
              { required: true, message: '请选择借款人行业名称', trigger: 'change' }
            ],
            registerTypeCode: [
              { required: true, message: '请选择户籍类型', 'trigger': 'change' }
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
            customerTaxCd: [
              { required: true, message: '请选择个人税收客户类型', 'trigger': 'change' }
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
              { validator: myRules.nameRule, trigger: 'blur' }
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
          customerRelation: {
            name: null,
            relationshipCode: null,
            remark: null,
            mobile: null
          }, // 亲属关系
          customerRelationRule: {
            name: [
              { validator: this.checkRelationName, trigger: 'blur' },
              { validator: myRules.nameRule, trigger: 'blur' }
            ],
            relationshipCode: [
              { validator: this.checkRelationshipCode, trigger: 'change' }
            ],
            remark: [
              { validator: this.checkRelationRemark, trigger: 'blur' },
              { validator: myRules.chineseChart, trigger: 'blur' }
            ],
            mobile: [
              { validator: this.checkRelationMobile, trigger: 'blur' }
            ]
          },
          customerNonRelation: {
            name: null,
            remark: '',
            relationshipCode: null,
            mobile: null
          }, // 非亲属关系
          customerNonRelationRule: {
            name: [
              { required: true, message: '请输入非亲属联系人姓名', trigger: 'blur' },
              { validator: myRules.nameRule, trigger: 'blur' }
            ],
            relationshipCode: [
              { required: true, message: '请选择非亲属联系人关系', trigger: 'change' }
            ],
            remark: [
              { validator: this.checkNonRelationRuleRemark, trigger: 'blur' },
              { validator: myRules.chineseChart, trigger: 'blur' }
            ],
            mobile: [
              { required: true, message: '请填写非亲属关系人联系号码', trigger: 'blur' },
              { validator: myRules.phoneRule, trigger: 'blur' }
            ]
          },

          creditInfo: {}, // 信用信息
          creditInfoRule: {
            applicationSubmitAmt: [
              { required: true, message: '请输入申请金额', trigger: 'blur' },
              { validator: myRules.nonNegative, trigger: 'blur' },
              { validator: this.checkMostNum, trigger: 'blur' }
            ]
          },

          // 营销信息
          marketingInfo: {},
          marketingInfoRule: {},
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
          dCode: this.$getCodeDependent(),
          organizationTax: {
            notPayUpTaxInd: false
          },
          organizationTaxRule: {
            taxpayerNum: [
              { required: true, message: '纳税人识别码 不能为空' }
            ],
            tlTaxOrganizationId: [
              { required: true, message: '税务数据接入机构 不能为空' }
            ],
            nearly1YrAnnlPayTaxAmt: [
              { required: true, message: '近一年企业年缴税额（元） 不能为空' },
              { validator: myRules.numTwoBit, trigger: 'blur', message: '只能输入数字，最多只能输入两位小数' }
            ],
            nearly1YrOrgCrLvlCd: [
              { required: true, message: '近一年企业信用评级 不能为空' }
            ],
            custPayTaxStartDate: [
              { required: true, message: '借款人最早缴税日期 不能为空' }
            ],
            notPayUpTaxInd: [
              { required: true, message: '当前是否有未缴清税款 不能为空' }
            ]
          },
          // 税务数据接入结构下拉列表
          taxAgencyList: [],
          creditLevelList: [],
          // 授权结果数据
          openTaxInfoDg: false,
          // 获取授权按钮 状态
          queryImpowerBtnStatus: false,
          // 获取税务信息 默认为不可点击
          queryTax: true,
          saveStatus: false, // 暂存开关
          // 企业税 授权控制开关
          impowerFlag: false
        };
      },
      created() {
        this.getPolicyList(this.applicationId); // 获取保单列表
        this.getCarList(this.applicationId); // 获取车供列表
        this.getHouseList(); // 获取房产证列表;
        this.getGuarantorList(this.applicationId);
        this.getAreaList();
        this.getHasSubmit();
        this.getSelectInfo(this.applicationId);
        this.getQueryChannel(); // 获取所有渠道
        this.getBusinessLibrary(); // 获取业务类型下拉
        this.getHasSubmit();

        // 下拉项获取
        let selectArr = ['customer_tax_cd', 'insurance_company', 'personal_type_cd', 'certificate_type', 'gender_code', 'position_type_cd', 'organization_type_cd', 'registered_area_cd', 'education_level_cd', 'car_loan_status_code', 'non_family_relationship_code', 'family_relationship_code', 'estate_type_code', 'ins_payment_mode_code', 'report_source_code', 'industry_code', 'register_type_code', 'certificate_type_code', 'share_percent', 'house_condition_code', 'career_type_code', 'marital_status_code'];
        this.getMultipleLibrary(selectArr, this.isReadonly)
          .then(data => {
            this.policyCompanyList = data.insurance_company;
            this.maritalLibrary = data.marital_status_code;
            this.careerLibrary = data.career_type_code;
            this.houseConditionLibrary = data.house_condition_code;
            this.sharePercentLibrary = data.share_percent;
            this.houseConditionLibrary = data.share_percent;
            this.houseConditionLibrary = data.house_condition_code;
            this.certificateTypeLibrary = data.certificate_type_code;
            data.certificate_type_code.forEach((v) => {
              this.$set(this.certificateClass, v.itemCode, v.itemDesc);
            });
            this.registerTypeCodeLibrary = data.register_type_code;
            this.industryCodeLibrary = data.industry_code;
            this.reportSourceCodeLibrary = data.report_source_code;
            this.paymentModeCodeLibrary = data.ins_payment_mode_code;
            data.ins_payment_mode_code.forEach(v => {
              this.$set(this.paymentModeCodeClass, v.itemCode, v.itemDesc);
            });
            this.estateTypeCodeLibrary = data.estate_type_code;
            data.estate_type_code.forEach((v) => {
              this.$set(this.houseClass, v.itemCode, v.itemDesc);
            });
            this.relationshipCodeLibrary = data.family_relationship_code;
            this.nonRelationshipCodeLibrary = data.non_family_relationship_code;
            this.carLoanStatusCodeLibrary = data.car_loan_status_code;
            this.educationLevelLibrary = data.education_level_cd;
            this.registeredAreaLibrary = data.registered_area_cd;
            this.organizationTypeLibrary = data.organization_type_cd;
            this.positionTypeLibrary = data.position_type_cd;
            this.genderCodeLibrary = data.gender_code;
            this.certificateLibrary2 = data.certificate_type;
            data.certificate_type.forEach(v => {
              this.$set(this.certificate2Class, v.itemCode, v.itemDesc);
            });
            this.personalTypeCdLibrary = data.personal_type_cd;
            this.customerTaxCdLibrary = data.customer_tax_cd;
          })
          .catch(err => {
            this.confirmFn(err.message);
          });
        this.getCreditLevelList();
      },
      methods: {
        organizationTaxRuleChange(_bloon) {
          this.organizationTaxRule.nearly1YrAnnlPayTaxAmt[0].required = _bloon;
          this.organizationTaxRule.nearly1YrOrgCrLvlCd[0].required = _bloon;
          this.organizationTaxRule.custPayTaxStartDate[0].required = _bloon;
          this.organizationTaxRule.notPayUpTaxInd[0].required = _bloon;
        },
        queryTaxInfo() {
          // 调用税务信息查询接口、接口及异常的话能重新调用
          // 获取到信息后，综合信息必填信息变成非必填
          // 若无该客户税务信息记录，提示 该客户无查询记录
          this.queryTax = true;
          this.$MyFetch.get(spareApi.taxConfig.queryTaxInfoApi, {
            applicationId: this.applicationId
          }).then((_data) => {
            this.confirmFn('获取税务信息成功');
            this.organizationTaxRuleChange(false);
            this.queryTax = false;
            // 获取税务信息成功可提交
            this.hasTaxInfo = false;
          }).catch(_erro => {
            this.confirmFn(_erro.message);
            this.queryTax = false;
            console.log('error', _erro);
          });
        },
        taxAgencyChange(_data) {
          this.queryImpowerBtnStatus = (_data === 1);
          if (this.queryImpowerBtnStatus) {
            this.organizationTaxRuleChange(true);
            this.hasTaxInfo = false;
            this.submitStatus = false;
          }
        },
        getTaxAgencyList(_taxData) {
          return new Promise((resolve, reject) => {
            this.$MyFetch.get(spareApi.taxConfig.careerworkOrganizationList, {
              applicationId: this.applicationId
            }).then((_data) => {
                if (this.$lodash.isEmpty(_data) && !this.hasSubmit) {
                  this.confirmFn('客户单位地址所在省市无有效税务数据接入机构，请重新配置', 'error');
                }
                this.$lodash.each(_data, (_e, _i) => {
                  _e.value = _e.tlTaxOrganizationId;
                  _e.label = _e.tlTaxOrganizationName;
                });
                resolve(_data);
              }).catch((_erro) => {
                reject(_erro);
                this.$message.error('获取税务数据接入机构失败');
              });
          });
        },
        // 过滤税务数据接入机构
        async filerTaxAgency(_taxData) {
          let tlTaxOrganizationId = _taxData.tlTaxOrganizationId;
          let tlTaxOrganizationName = _taxData.tlTaxOrganizationName;
          let tlTaxOrganizationIdFlag = '';
          this.taxAgencyList = await this.getTaxAgencyList();
          // 修复修改了TaxAgencyList列表的时候，下拉框匹配不上显示为数字的bug
          tlTaxOrganizationIdFlag = this.$lodash.find(this.taxAgencyList, (_e) => {
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
        queryAuthorizationInfo() {
          if (!this.organizationTax.taxpayerNum) {
            this.confirmFn('纳税人识别码不能为空', 'error');
            this.$refs.organizationTaxForm.validateField('taxpayerNum');
            return false;
          }
          if (!this.organizationTax.tlTaxOrganizationId) {
            this.confirmFn('税务接入机构不能为空', 'error');
            this.$refs.organizationTaxForm.validateField('tlTaxOrganizationId');
            return false;
          }
          if (this.saveStatus) {
            // 纳税人识别码变了,提醒用户保存
            this.confirmFn('纳税人识别码或税务接入被更改过，请重新保存后再获取授权信息');
            return false;
          }
          this.impowerFlag = true;
          this.$MyFetch.get(spareApi.taxConfig.queryAuthory, {
            applicationId: this.applicationId
          }).then((_data = {}) => {
            // TP 第三方 DS 大数客户
            this.impowerFlag = false;
            if (!_data.thirdPartyCustomerCd) {
              this.confirmFn('查无数据');
              return false;
            }
            // 获取授权结果成功
            this.submitStatus = false;
            this.submitFalg = false;
            if (_data.thirdPartyCustomerCd === 'TP') {
              this.queryTax = false;
              this.confirmFn('客户授权成功且客户为第三方客户，可获取税务信息');
              // 获取授权成功后，必须重新获取税务信息
              this.hasTaxInfo = true;
            } else if (_data.thirdPartyCustomerCd === 'DS') {
              this.queryTax = true;
              this.hasTaxInfo = false;
              this.confirmFn('客户授权成功，且客户为非第三方客户，请保证综合信息已填');
            }
          }).catch((_erro) => {
            this.impowerFlag = false;
            this.confirmFn(_erro.message);
            console.log(_erro);
          });
        },
        checkTaxInfo() {
          this.openTaxInfoDg = true;
          this.$store.dispatch('setNum', this.applicationId);
        },
        closeCustomerTaxInfo() {
          this.openTaxInfoDg = false;
        },
        getCreditLevelList() {
          this.creditLevelList = [
            { value: 'A', label: 'A' },
            { value: 'B', label: 'B' },
            { value: 'C', label: 'C' },
            { value: 'D', label: 'D' },
            { value: 'M', label: 'M' },
            { value: 'X', label: '暂无评级' }
          ];
        },
        // 检查是否提交过
        getHasSubmit() {
          this.$MyFetch.get(spareApi.solving.completeInfo.completeProduct.getSubmitStatus + this.applicationId)
            .then((data = {}) => {
              this.hasSubmit = (parseInt(data) > 1) || this.isReadonly;
            })
            .catch(err => {
              console.log(err);
            });
        },
        // 上一步
        preStep() {
          this.$emit('pre-step');
        },
        // 获取主表单项值
        getInfo(id) {
          this.$MyFetch.get(spareApi.solving.completeInfo.completeProduct.getInfo + id)
            .then((data = {}) => {
              // 后端姐姐空值都是null 用不了，初始化改下
              data.basicInfoResp.registeredAddressCode = data.basicInfoResp.registeredAddressCode ? this.getAddressArr(data.basicInfoResp.registeredAddressCode, this.options) : this.customerInfo.registeredAddressCode;
              data.basicInfoResp.houseAddressCode = data.basicInfoResp.houseAddressCode ? this.getAddressArr(data.basicInfoResp.houseAddressCode, this.options) : this.customerInfo.houseAddressCode;
              data.basicInfoResp.workAddressCode = data.basicInfoResp.workAddressCode ? this.getAddressArr(data.basicInfoResp.workAddressCode, this.options) : this.customerInfo.workAddressCode;
              data.basicInfoResp.insurancePolicyInd = data.basicInfoResp.insurancePolicyInd ? data.basicInfoResp.insurancePolicyInd : false;
              data.basicInfoResp.estateInd = data.basicInfoResp.estateInd ? data.basicInfoResp.estateInd : false;
              data.basicInfoResp.carloanInd = data.basicInfoResp.carloanInd ? data.basicInfoResp.carloanInd : false;
              data.basicInfoResp.genderCode = data.basicInfoResp.genderCode ? data.basicInfoResp.genderCode : this.dCode.gendeTypeCode.M;
              data.basicInfoResp.localEstateInd = data.basicInfoResp.localEstateInd ? data.basicInfoResp.localEstateInd : false;
              data.organizationTaxInd = data.basicInfoResp.organizationTaxInd || false;
              data.basicInfoResp.houseFund6mInd = data.basicInfoResp.houseFund6mInd ? data.basicInfoResp.houseFund6mInd : false;
              data.basicInfoResp.registeredInd = data.basicInfoResp.registeredInd ? data.basicInfoResp.registeredInd : false;
              this.estateLimitCnt = parseInt(data.estateLimitCnt);
              if (data.basicInfoResp.foundDate) {
                data.basicInfoResp.foundDate = ((new Date(data.basicInfoResp.foundDate.replace(/-/g, '/'))).getTime()) ? (new Date(data.basicInfoResp.foundDate.replace(/-/g, '/'))).getTime() : 1;
              }
               // 由于税务贷后端人员跟备签后端人员不同，数据结构也不同。。。
              if (data.basicInfoResp.organizationTaxInd) {
                this.submitStatus = data.basicInfoResp.taxLoanPrepareDto.authorizeInd;
                this.organizationTax = Object.assign({}, data.basicInfoResp.taxLoanPrepareDto);
                if (this.organizationTax.nearly1YrAnnlPayTaxAmt) {
                  this.organizationTax.nearly1YrAnnlPayTaxAmt = this.$returnFloat(this.organizationTax.nearly1YrAnnlPayTaxAmt, 2, true);
                }
                if (this.organizationTax.checkParameterInd && this.organizationTax.tlTaxOrganizationId !== 1) {
                  // 如果已经获取过税务信息，综合信息不校验
                  this.organizationTaxRuleChange(false);
                  this.hasTaxInfo = false;
                } else if (this.organizationTax.tlTaxOrganizationId !== 1) {
                  // 有税务机构并且未获取税务信息，不能提交
                  this.hasTaxInfo = true;
                }
                this.queryImpowerBtnStatus = this.organizationTax.tlTaxOrganizationId === 1;
                this.filerTaxAgency(this.organizationTax);
              }
              // 保险起见，删掉相关的税务贷的信息
              delete data.basicInfoResp.taxLoanPrepareDto;
              this.customerInfo = data.basicInfoResp;
              // 补充个人信息
              data.additionInfoResp.industryCode = data.additionInfoResp.industryCode ? data.additionInfoResp.industryCode : '';
              data.additionInfoResp.registerTypeCode = data.additionInfoResp.registerTypeCode ? data.additionInfoResp.registerTypeCode : '';
              this.customerAddInfo = JSON.parse(JSON.stringify(data.additionInfoResp));
              // 亲属关系不能直接绑上去 只能拆开分三个表单
              data.contactsInfoResp.relations = data.contactsInfoResp.relations ? data.contactsInfoResp.relations : [];
              data.contactsInfoResp.relations.forEach((v) => {
                if (v.typeCode === this.dCode.typeCode.relative) {
                  this.customerRelation = Object.assign(v);
                } else {
                  this.customerNonRelation = Object.assign(v);
                }
              });
              this.customerContactsInfo = data.contactsInfoResp;

              // 信用信息
              this.creditInfo = data.creditResp;
              // 营销信息
              this.marketingInfo = data.marketingResp;
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
              // 清除初始化时的表单验证
              this.$nextTick(() => {
                this.$refs.customerAddInfoForm.clearValidate();
              });
            })
            .catch((err) => {
              this.confirmFn(err.message, 'error');
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
        submitCustomer() {
          let data = {
            applicationId: this.applicationId,
            custId: this.customerAddInfo.custId
          };
          let hasPass = 0;
          this.$refs.customerInfo.validate((valid) => {
            if (!valid) {
              hasPass += 1;
            }
          });
          // 检查补充信息
          this.$refs.customerAddInfoForm.validate((valid) => {
            if (!valid) {
              hasPass += 1;
            }
          });
          // 检查信用信息
          this.$refs.creditInfoForm.validate((valid) => {
            if (!valid) {
              hasPass += 1;
            }
          });
          // 检查配偶联系人信息
          this.$refs.customerContactsInfoForm.validate((valid) => {
            if (!valid) {
              hasPass += 1;
            }
          });
          // 检查亲属联系人信息
          this.$refs.customerRelationForm.validate((valid) => {
            if (!valid) {
              hasPass += 1;
            }
          });
          // 检查非亲属联系人信息
          this.$refs.customerNonRelationForm.validate((valid) => {
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
            return false;
          }
          if (hasPass === 0) {
            // 拼接基本信息
            data.basicInfoReq = JSON.parse(JSON.stringify(this.customerInfo));
            data.basicInfoReq.registeredAddressCode = this.customerInfo.registeredAddressCode[this.customerInfo.registeredAddressCode.length - 1];
            data.basicInfoReq.houseAddressCode = this.customerInfo.houseAddressCode[this.customerInfo.houseAddressCode.length - 1];
            data.basicInfoReq.workAddressCode = this.customerInfo.workAddressCode[this.customerInfo.workAddressCode.length - 1];
            if (data.basicInfoReq.insurancePolicyInd && (this.policyList.length === 0)) {
              this.confirmFn('请添加保单信息', 'error');
              return;
            }
            if (data.basicInfoReq.estateInd && (this.houseList.length === 0)) {
              this.confirmFn('请添加房产信息', 'error');
              return;
            }
            if (data.basicInfoReq.carloanInd && (this.carList.length === 0)) {
              this.confirmFn('请添加车贷信用卡信息', 'error');
              return;
            }

            if (!this.checkFormValid('organizationTaxForm')) {
              // 企业税信息没填写
              this.confirmFn('请填写税务贷相关信息', 'error');
              return false;
            }
            if (data.organizationTaxInd) {
              data.taxLoanPrepareDto = this.organizationTax;
            }
            // 拼接补充信息
            data.additionInfoReq = this.customerAddInfo;
            // 拼接联系人信息
            data.contactsInfoReq = {
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
            };
            // 如果未婚或者再婚
            if (this.customerInfo.maritalStatusCode === this.dCode.maritalStatusCode.married || this.customerInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage) {
              data.contactsInfoReq.relations.splice(0, 1);
            }
            // 拼接信用信息
            data.creditInfo = {
              applicationSubmitAmt: this.creditInfo.applicationSubmitAmt
            };
            data.marketingInfo = {
              channelCode: (this.selectChannel.exclusiveChannelId !== '000000' && this.selectChannel.exclusiveChannelId !== '000001') ? this.selectChannel.exclusiveChannelId : null,
              custManagerId: this.selectManagerChannel.userId !== '000000' ? this.selectManagerChannel.userId : null,
              otherChannelCode: this.selectOtherChannel.exclusiveChannelId,
              otherChannelType: this.selectOtherChannel.type,
              saleTeamId: this.marketingInfo.saleTeamId
            };
            // taxLoanPrepareDto
            if (this.customerInfo.organizationTaxInd) {
              this.organizationTax.nearly1YrAnnlPayTaxAmt = this.$returnFloat(this.organizationTax.nearly1YrAnnlPayTaxAmt, 2, true);
              data.basicInfoReq.taxLoanPrepareDto = this.organizationTax;
              data.basicInfoReq.taxLoanPrepareDto.applicationId = this.applicationId;
            }
            this.confirmFn('确认提交信息？', 'warning')
              .then(() => {
                this.checkTableList(data)
                  .then(() => {
                    this.submitCustomerApi(data);
                  });
              });
          } else {
            this.confirmFn('填写信息有误，请检查！', 'error');
          }
        },
        // 检测表格中数据是否正确
        checkTableList(data) {
          let list = {};
          if (data.basicInfoReq.insurancePolicyInd) {
            list.insuranceInfoReqList = this.policyList;
          }
          if (data.basicInfoReq.estateInd) {
            list.estateInfoList = this.houseList;
            if (this.guarantorList.length > 0) {
              list.guaranteeInfoList = this.guarantorList;
            }
          }
          if (data.basicInfoReq.carloanInd) {
            list.carLoanInfoList = this.carList;
          }
          return new Promise((resolve) => {
            this.$MyFetch.post(spareApi.solving.completeInfo.completeProduct.checkTableList, list)
              .then(data => {
                resolve(data);
              })
              .catch(err => {
                this.confirmFn(err.message, 'error');
              });
          });
        },
        submitCustomerApi(data) {
          this.$MyFetch.post(spareApi.solving.completeInfo.completeProduct.submitInfo, data)
            .then(() => {
              this.confirmFn('产品收入信息更新，请关注产品特殊字段！', 'success');
              this.getPolicyList(this.applicationId); // 获取保单列表
              this.getCarList(this.applicationId); // 获取车供列表
              this.getHouseList(); // 获取房产证列表;
              this.getGuarantorList(this.applicationId);
              this.policyEdit = {};
              this.carEdit = {settlementDate: ''};
              this.getHasSubmit();
            })
            .catch(err => {
              this.confirmFn(err.message, 'error');
            });
        },
        // 暂存表单
        saveAll() {
          let data = {
            applicationId: this.applicationId,
            custId: this.customerAddInfo.custId ? this.customerAddInfo.custId : '',
            additionInfoReq: {},
            contactsInfoReq: {},
            creditInfo: {},
            marketingInfo: {},
            basicInfoReq: {}
          };
          // 基本信息
          data.basicInfoReq = JSON.parse(JSON.stringify(this.customerInfo));
          data.basicInfoReq.registeredAddressCode = this.customerInfo.registeredAddressCode[this.customerInfo.registeredAddressCode.length - 1] ? this.customerInfo.registeredAddressCode[this.customerInfo.registeredAddressCode.length - 1] : null;
          data.basicInfoReq.houseAddressCode = this.customerInfo.houseAddressCode[this.customerInfo.houseAddressCode.length - 1] ? this.customerInfo.houseAddressCode[this.customerInfo.houseAddressCode.length - 1] : null;
          data.basicInfoReq.workAddressCode = this.customerInfo.workAddressCode[this.customerInfo.workAddressCode.length - 1] ? this.customerInfo.workAddressCode[this.customerInfo.workAddressCode.length - 1] : null;
          // 补充信息
          data.additionInfoReq = this.customerAddInfo;
          // 联系人信息
          data.contactsInfoReq = {
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
          };
          // 如果未婚或者再婚
          if (this.customerInfo.maritalStatusCode === this.dCode.maritalStatusCode.married || this.customerInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage) {
            data.contactsInfoReq.relations.splice(0, 1);
          }
          // 信用信息
          data.creditInfo.applicationSubmitAmt = this.creditInfo.applicationSubmitAmt;
          // 营销信息
          data.marketingInfo = {
            channelCode: (this.selectChannel.exclusiveChannelId !== '000000' && this.selectChannel.exclusiveChannelId !== '000001') ? this.selectChannel.exclusiveChannelId : null,
            custManagerId: this.selectManagerChannel.userId !== '000000' ? this.selectManagerChannel.userId : null,
            otherChannelCode: this.selectOtherChannel.exclusiveChannelId,
            otherChannelType: this.selectOtherChannel.type,
            saleTeamId: this.marketingInfo.saleTeamId
          };
          // taxLoanPrepareDto
          if (this.customerInfo.organizationTaxInd) {
            this.organizationTax.nearly1YrAnnlPayTaxAmt = this.$returnFloat(this.organizationTax.nearly1YrAnnlPayTaxAmt, 2, true);
            data.basicInfoReq.taxLoanPrepareDto = this.organizationTax;
            data.basicInfoReq.taxLoanPrepareDto.applicationId = this.applicationId;
          }
          this.saveCustomerApi(data)
            .then((res) => {
              // 暂存开关关掉
              this.saveStatus = false;
              this.confirmFn('数据暂存成功！', 'success');
            })
            .catch(err => {
              this.confirmFn(err.message, 'error');
            });
        },
        // 暂存主表单api
        saveCustomerApi(data) {
          return new Promise((resolve, reject) => {
            this.$MyFetch.post(spareApi.solving.completeInfo.completeProduct.saveInfo, data)
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
          this.getArea({getAll: this.isReadonly})
            .then(data => {
              this.options = data;
              this.getInfo(this.applicationId);
            });
        },
        // 改变地区列表
        changeAreaList(data, arr) {
          data.forEach((v) => {
            let obj = {};
            for (let key in v) {
              if (key !== 'children') {
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
            this.confirmFn('请先完成正在编辑的表格', 'error');
            return;
          }
          this.policyEdit = {};
          if (this.policyList.length >= 3) {
            this.confirmFn('保单满三份，无法继续新增！', 'error');
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
            this.confirmFn('您已经提交过改表单，所做的更改不再更新到服务器！');
            return;
          }
          this.$refs.policyAddForm.validate((valid) => {
            if (valid) {
              this.policyEdit.premiumTermCnt = this.premiumTermCnt;
              this.policyEdit.availableInd = this.isPolicyEffective;
              this.policyEdit.applicationId = this.applicationId;
              this.policyEdit.premiumAnnualAmt = this.premiumAnnualAmt;
              this.policyEdit.holderSwitchInd = this.policyEdit.holderSwitchInd ? this.policyEdit.holderSwitchInd : false;
              this.addPolicyApi(this.policyEdit)
                .then(() => {
                  this.policyEditDg = false;
                  this.getPolicyList(this.applicationId);
                  this.confirmFn('保单添加成功！', 'success');
                });
            }
          });
        },
        addPolicyApi(data) {
          return new Promise((resolve, reject) => {
            this.$MyFetch.post(spareApi.solving.completeInfo.completeProduct.addPolicy, data)
              .then((data) => {
                resolve(data);
              })
              .catch(err => {
                this.confirmFn(err.message, 'error');
              });
          });
        },
        // 获取保单列表信息
        getPolicyList(id) {
          let query = { applicationId: id };
          this.$MyFetch.post(spareApi.solving.completeInfo.completeProduct.getPolicyList, query)
            .then((data = {}) => {
              this.policyList = [...data.list];
              this.policyList.forEach((v) => {
                if (v.effectiveDate) {
                  v.effectiveDate = (new Date(v.effectiveDate.replace(/-/g, "/"))).getTime(); // 传回来的变成了时间字符串 转成时间搓
                }
                this.policyEdit.availableInd = this.policyEdit.availableInd ? this.policyEdit.availableInd : false;
                this.policyEdit.holderSwitchInd = this.policyEdit.holderSwitchInd ? this.policyEdit.holderSwitchInd : false;
                this.$set(v, 'showFormELe', false);
              });
            })
            .catch(err => {
              this.confirmFn(err.message, 'error');
            });
        },
        // 删除保单信息
        deletePolicy(id) {
          if (this.policyCurrentEdit.id) {
            this.confirmFn('请先完成正在编辑的表格', 'error');
            return;
          };
          this.confirmFn('是否删除该条信息!', 'warning')
            .then(() => {
              return this.deletePolicyApi(id);
            })
            .then(() => {
              this.confirmFn('保单删除成功！', 'success');
              this.policyEdit = {};
              this.getPolicyList(this.applicationId);
            })
            .catch(err => {
              err.message && this.confirmFn(err.message, 'error');
            });
        },
        deletePolicyApi(id) {
          return new Promise((resolve, reject) => {
            this.$MyFetch.get(spareApi.solving.completeInfo.completeProduct.deletePolicy + id)
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
            this.confirmFn('请先完成正在编辑的表格', 'error');
            return;
          };
          this.$set(obj, 'showFormEle', true);
          this.policyEdit = Object.assign({}, obj);
          this.policyCurrentEdit = Object.assign({}, obj);
        },
        // 保存表单编辑
        saveEditPolicy(formName, obj) {
          this.$refs[formName][0].validate((valid) => {
            if (valid) {
              this.policyEdit.premiumTermCnt = this.premiumTermCnt;
              this.policyEdit.availableInd = this.isPolicyEffective;
              this.policyEdit.premiumAnnualAmt = this.premiumAnnualAmt;
              this.policyEdit.holderSwitchInd = this.policyEdit.holderSwitchInd ? this.policyEdit.holderSwitchInd : false;
              this.saveEditPolicyApi(this.policyEdit, obj);
            }
          });
        },
        saveEditPolicyApi(data, obj) {
          this.$MyFetch.post(spareApi.solving.completeInfo.completeProduct.editPolicy, data)
            .then((data = {}) => {
              this.getPolicyList(this.applicationId);
              this.confirmFn('修改成功', 'success');
              this.closeEditPolicy(obj);
            })
            .catch(err => {
              this.confirmFn(err.message, 'error');
            });
        },
        // 关闭表单修改
        closeEditPolicy(obj) {
          this.policyCurrentEdit = {};
          this.policyEdit = {};
          this.$set(obj, 'showFormEle', false);
        },
        // 检查保单号是否存在
        checkPolicyNum(rule, value, callback) {
          var isExist = false;
          this.policyList.forEach((v) => {
            if (v.policyNum === value && this.policyCurrentEdit.policyNum !== value) {
              isExist = true;
            }
          });
          if (isExist) {
            return callback(new Error('该保单号已经存在'));
          } else {
            callback();
          }
        },

        // 车供信息
        // 获取车供信息列表
        getCarList(id) {
          this.$MyFetch.post(spareApi.solving.completeInfo.completeProduct.getCarList, { applicationId: id })
            .then((data = {}) => {
              this.carList = [...data.list];
              this.carList.forEach((v) => {
                if (v.loanDate) {
                  v.loanDate = (new Date(v.loanDate.replace(/-/g, "/"))).getTime();
                }
                if (v.dueDate) {
                  v.dueDate = (new Date(v.dueDate.replace(/-/g, "/"))).getTime();
                }
                if (v.firstRepaymentDate) {
                  v.firstRepaymentDate = (new Date(v.firstRepaymentDate.replace(/-/g, "/"))).getTime();
                }
                if (v.settlementDate) {
                  v.settlementDate = (new Date(v.settlementDate.replace(/-/g, "/"))).getTime();
                }
              });
            })
            .catch((err) => {
              this.confirmFn(err.message, 'error');
            });
        },
        // 删除车供信息
        deleteCar(id) {
          if (this.carCurrentEdit.id) {
            this.confirmFn('请先完成正在编辑的表格', 'error');
            return;
          };
          this.confirmFn('是否删除该条信息!', 'warning')
            .then(() => {
              return this.deleteCarApi(id);
            })
            .then(() => {
              this.getCarList(this.applicationId);
            })
            .catch(err => {
              err.message && this.confirmFn(err.message, 'error');
            });
        },
        deleteCarApi(id) {
          return new Promise((resolve, reject) => {
            this.$MyFetch.get(spareApi.solving.completeInfo.completeProduct.deleteCar + id)
              .then((data = {}) => {
                this.carEdit = {settlementDate: ''};
                resolve(data);
              })
              .catch(err => {
                reject(err);
              });
          });
        },
        // 打开新增
        openAddCar() {
          let isEdit = false;
          this.carList.forEach(v => {
            if (v.showFormEle) isEdit = true;
          });
          if (this.carCurrentEdit.id || isEdit) {
            this.confirmFn('请先完成正在编辑的表格', 'error');
            return;
          };
          this.carEdit = JSON.parse(JSON.stringify({settlementDate: ''}));
          if (this.carList.length >= 3) {
            this.confirmFn('车贷信用卡满三份，无法继续新增！', 'error');
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
          this.$refs.carAddForm.validate((valid) => {
            if (valid) {
              this.carEdit.applicationId = this.applicationId;
              this.addCarApi(this.carEdit)
                .then(() => {
                  this.carEditDg = false;
                  this.getCarList(this.applicationId);
                });
            } else {
              console.log('不通过');
            }
          });
        },
        addCarApi(data) {
          return new Promise((resolve, reject) => {
            this.$MyFetch.post(spareApi.solving.completeInfo.completeProduct.addCar, data)
              .then((data) => {
                resolve(data);
              })
              .catch(err => {
                this.confirmFn(err.message, 'error');
              });
          });
        },
        // 打开编辑车贷表格
        editCarELe(obj) {
          if (this.carEditDg) {
            this.confirmFn('请先完成正在编辑的表格', 'error');
            return;
          }
          this.$set(obj, 'showFormEle', true);
          this.carEdit = Object.assign({}, obj);
          this.carCurrentEdit = Object.assign({}, obj);
        },
        // 关闭编辑车贷表格
        closeCarEle(obj) {
          this.carCurrentEdit = {};
          this.carEdit = {};
          this.$set(obj, 'showFormEle', false);
        },
        // 保存编辑
        saveEditCar(formName, obj) {
          this.$refs[formName][0].validate((valid) => {
            if (valid) {
              this.saveEditCarApi(this.carEdit, obj);
            } else {
              console.log('error');
            }
          });
        },
        saveEditCarApi(data, obj) {
          this.$MyFetch.post(spareApi.solving.completeInfo.completeProduct.editCar, data)
            .then(() => {
              this.getCarList(this.applicationId);
              this.confirmFn('修改成功', 'success');
              this.closeCarEle(obj);
            })
            .catch(err => {
              this.confirmFn(err.message, 'error');
            });
        },
        // 车贷状态为正常时 结清日期清空
        clearCarDate(formName) {
          if (this.carEdit.loanStatusCode === this.dCode.loanStatusCode.normal) {
            this.carEdit.settlementDate = '';
            if (!this.$refs[formName][0]) {
              this.$refs[formName].validateField('settlementDate');
            } else {
              this.$refs[formName][0].validateField('settlementDate');
            }
          }
        },

        // 房产信息
        // 获取房产客户信息列表
        getHouseList() {
          this.$MyFetch.post(spareApi.solving.completeInfo.completeProduct.getHourseList, {applicationId: this.applicationId})
            .then((data = {}) => {
              this.houseList = [...data.estateInfoList];
              this.houseIdList = [];
              data.estateInfoList.forEach((v) => {
                this.houseIdList.push(v.estateNum);
              });
            })
            .catch(err => {
              this.confirmFn(err.message, 'error');
            });
        },
        // 打开房产信息 或担保人信息 新增（编辑窗口）
        openMessageBox(obj = {}) {
          if (this.TabActiveName === 'first') { // 新增房产信息
            if (!obj.id && this.houseList.length >= this.estateLimitCnt) {
              this.confirmFn(`最多添加 ${this.estateLimitCnt} 条房产信息！`, 'error');
              return;
            }
            this.openHouseMessageDg = true;
            this.houseId = obj.id;
          } else {
            if (!obj.id && this.houseIdList.length <= 0) {
              this.confirmFn('请先添加房产信息！', 'error');
              return;
            }
            // 过滤掉已经有担保人的房产
            // 保证每一条房产只有一个担保人
            this.enableHouseIdList = [];
            this.houseIdList.forEach((v) => {
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
          this.confirmFn('是否删除该条信息？', 'warning')
            .then(() => {
              this.$MyFetch.get(spareApi.solving.completeInfo.completeProduct.deleteHouse + id)
                .then((data = {}) => {
                  this.confirmFn('删除成功', 'success');
                  this.getHouseList();
                  this.getGuarantorList(this.applicationId);
                });
            })
            .catch(err => {
              err.message && this.confirmFn(err.message, 'error');
            });
        },
        // 担保人信息
        // 获取担保人信息
        getGuarantorList(id) {
          this.$MyFetch.post(spareApi.solving.completeInfo.completeProduct.getGuaranteeList, { applicationId: id })
            .then(data => {
              this.guarantorList = [...data.list];
              this.guarantorHouseIdList = [];
              data.list.forEach((v) => {
                this.guarantorHouseIdList.push(v.estateNum);
              });
            })
            .catch(err => {
              this.confirmFn(err.message, 'error');
            });
        },
        closeGuarantor() {
          this.getGuarantorList(this.applicationId);
          this.openAddGuarantorDg = false;
        },
        deleteGuarantor(id) {
          this.confirmFn('是否删除该条信息？', 'warning')
            .then(() => {
              this.$MyFetch.get(spareApi.solving.completeInfo.completeProduct.deleteGuarantee + id)
                .then(() => {
                  this.confirmFn('删除成功！', 'success');
                  this.getGuarantorList(this.applicationId);
                });
            })
            .catch(err => {
              err.message && this.confirmFn(err.message, 'error');
            });
        },
        // 杂项
        changeHandler(value) {},
        // 根据code获取保险公司名称
        policyCompanyName(code) {
          let name = '';
          this.policyCompanyList.forEach((v) => {
            if (v.itemCode === code) {
              name = v.itemDesc;
            }
          });
          return name;
        },
        // 根据时间搓返回时间
        getTime(time) {
          var str = '/';
          if (time) {
            time = (typeof time === 'string') ? time.replace(/-/g, "/") : time;
            str = (new Date(time)).normalizeTime().strDate;
          }
          return str;
        },

        // 获取字典下拉
        getLibraryApi(name) {
          return new Promise((resolve, reject) => {
            this.$MyFetch.get(spareApi.commonSelect, {categoryCode: name})
              .then(data => {
                resolve(data);
              })
              .catch(err => {
                this.confirmFn(err.message);
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
            this.customerInfo.foundDate = '';
            this.customerInfo.sharePercent = '';
            this.customerInfo.registeredInd = false;
          }
        },
        sharePercentRule(rule, value, callback) {
          if (this.customerInfo.registeredInd && !value) {
            return callback(new Error('请选择占股情况'));
          } else {
            callback();
          }
        },
        foundDateRule(rule, value, callback) {
          if ((this.customerInfo.careerTypeCode === this.dCode.careerTypeCode.boss) && !value && this.customerInfo.registeredInd) {
            return callback(new Error('请选择成立日期'));
          } else {
            callback();
          }
        },
        // 输入的数字自动补00
        formatMoney(objName, key) {
          if (!isNaN(this[objName][key])) {
            if (this[objName][key] === '') return;
            this[objName][key] = (Math.round(this[objName][key] * 100) / 100).toString();
            let rs = this[objName][key].indexOf('.');
            if (rs < 0) {
              this[objName][key] += '.00';
            } else {
              while (this[objName][key].length <= (rs + 2)) {
                this[objName][key] += '0';
              }
            }
          }
        },
        // 最大小于100000000
        eightBitRule(rule, value, callback) {
          if ((value - 0) >= 100000000 && !!value) {
            return callback(new Error('最多只能输入8位'));
          } else {
            callback();
          }
        },

        // 原完善信息页面函数
        // 下拉项字典api
        getSelectValue(data) {
          return new Promise((resolve, reject) => {
            this.$MyFetch.get(spareApi.commonSelect, data)
              .then((data = {}) => {
                resolve(data);
              })
              .catch(err => {
                this.confirmFn(err.message, 'error');
              });
          });
        },
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
              this.confirmFn(err.message, 'error');
            });
        },
        // 查询经理渠道
        getQueryManageChannel() {
          var data = {
            userName: this.queryManagerChannel,
            postTypeCodeList: ["CM", 'EC']
          };
          this.$MyFetch.get(spareApi.solving.completeInfo.completeCustomerInfo.queryManangeChannnel, data)
            .then((data = {}) => {
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
              this.confirmFn(err.message);
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
          this.$MyFetch.get(url + code + '/prepare')
            .then((data = {}) => {
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
          if (this.customerInfo.careerTypeCode !== this.dCode.careerTypeCode.boss && !value) {
            callback(new Error('请输入人事部联系人姓名'));
          } else {
            callback();
          }
        },
        // 验证人事部联系人手机
        checkHrPhone(rule, value, callback) {
          const valReg = /^1[3456789]\d{9}$/;
          if (this.customerInfo.careerTypeCode !== this.dCode.careerTypeCode.boss && !value) {
            callback(new Error('请输入人事部联系人手机号码！'));
          } else if (value && !valReg.test(value)) {
            callback(new Error('请输入正确的手机号码！'));
          } else {
            callback();
          }
        },
        // 验证配偶姓名
        checkSpouseName(rule, value, callback) {
          if ((this.customerInfo.maritalStatusCode === this.dCode.maritalStatusCode.married || this.customerInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage) && !value) {
            callback(new Error('请输入配偶姓名！'));
          } else {
            callback();
          }
        },
        // 验证配偶证件类型
        checkSpouseIDTypeCode(rule, value, callback) {
          if ((this.customerInfo.maritalStatusCode === this.dCode.maritalStatusCode.married || this.customerInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage) && !value) {
            callback(new Error('请选择配偶证件类型！'));
          } else {
            callback();
          }
        },
        // 验证配偶证件号
        checkSpouseID(rule, value, callback) {
          if ((this.customerInfo.maritalStatusCode === this.dCode.maritalStatusCode.married || this.customerInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage)) {
            if (!this.customerContactsInfo.spouseIDTypeCode) {
              callback(new Error('请先选择配偶证件类型！'));
            } else if (!value) {
              callback(new Error('请填写配偶证件号码！'));
            } else if (this.customerContactsInfo.spouseIDTypeCode === this.dCode.certificateTypeCode.ID) {
              myRules.identityCardRule(rule, value, callback);
            } else {
              myRules.otherCardRule(rule, value, callback);
            }
          } else {
            callback();
          }
        },
        // 验证配偶电话号码
        checkSpouseMobile(rule, value, callback) {
          const valReg = /^1[3456789]\d{9}$/;
          if ((this.customerInfo.maritalStatusCode === this.dCode.maritalStatusCode.married || this.customerInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage) && !value) {
            callback(new Error('请填写配偶电话号码！'));
          } else if (!valReg.test(value) && (this.customerInfo.maritalStatusCode === this.dCode.maritalStatusCode.married || this.customerInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage)) {
            callback(new Error('请填写正确的电话号码！'));
          } else {
            callback();
          }
        },
        // 验证亲属联系人姓名
        checkRelationName(rule, value, callback) {
          if ((this.customerInfo.maritalStatusCode !== this.dCode.maritalStatusCode.married && this.customerInfo.maritalStatusCode !== this.dCode.maritalStatusCode.remarriage) && !value) {
            callback(new Error('请输入请输联系人姓名！'));
          } else {
            callback();
          }
        },
        // 验证亲属联系人关系
        checkRelationshipCode(rule, value, callback) {
          if ((this.customerInfo.maritalStatusCode !== this.dCode.maritalStatusCode.married && this.customerInfo.maritalStatusCode !== this.dCode.maritalStatusCode.remarriage) && !value) {
            callback(new Error('请选择亲属联系人关系！'));
          } else {
            callback();
          }
        },
        // 验证亲属关系其他说明
        checkRelationRemark(rule, value, callback) {
          if ((this.customerInfo.maritalStatusCode !== this.dCode.maritalStatusCode.married && this.customerInfo.maritalStatusCode !== this.dCode.maritalStatusCode.remarriage) && (this.customerRelation.relationshipCode === this.dCode.familyRelationship.other) && !value) {
            callback(new Error('请填写其他关系说明！'));
          } else {
            callback();
          }
        },
        // 验证亲属关系联系电话
        checkRelationMobile(rule, value, callback) {
          const valReg = /^1[3456789]\d{9}$/;
          if ((this.customerInfo.maritalStatusCode !== this.dCode.maritalStatusCode.married && this.customerInfo.maritalStatusCode !== this.dCode.maritalStatusCode.remarriage) && !value) {
            callback(new Error('请输入手机号码！'));
          } else if ((this.customerInfo.maritalStatusCode !== this.dCode.maritalStatusCode.married && this.customerInfo.maritalStatusCode !== this.dCode.maritalStatusCode.remarriage) && !valReg.test(value)) {
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
          if (this.orgSpecialInfo1.loanPurposeType === 'S' && !value) {
            callback(new Error('请选择贷款用途'));
          } else {
            callback();
          }
        },
        checkLoanPurpose2(rule, value, callback) {
          if (this.orgSpecialInfo2.loanPurposeType === 'S' && !value) {
            callback(new Error('请选择贷款用途'));
          } else {
            callback();
          }
        },
        checkloanOtherPurpose1(rule, value, callback) {
          var reg = /[\u4E00-\u9FA5]+/;
          if ((this.orgSpecialInfo1.loanPurposeType === 'S') && (this.orgSpecialInfo1.loanPurposeCode === 'Oth') && !value) {
            callback(new Error('请填写其他贷款用途说明'));
          } else if ((this.orgSpecialInfo1.loanPurposeType === 'S') && (this.orgSpecialInfo1.loanPurposeCode === 'Oth') && !reg.test(value)) {
            callback(new Error('只能输入汉字'));
          } else {
            callback();
          }
        },
        checkloanOtherPurpose2(rule, value, callback) {
          var reg = /[\u4E00-\u9FA5]+/;
          if ((this.orgSpecialInfo2.loanPurposeType === 'S') && (this.orgSpecialInfo2.loanPurposeCode === 'Oth') && !value) {
            callback(new Error('请填写其他贷款用途说明'));
          } else if ((this.orgSpecialInfo2.loanPurposeType === 'S') && (this.orgSpecialInfo2.loanPurposeCode === 'Oth') && !reg.test(value)) {
            callback(new Error('只能输入汉字'));
          } else {
            callback();
          }
        },
        changeRelationship() {
          if (this.customerNonRelation.relationshipCode !== this.dCode.relationshipCode.other) {
            this.customerNonRelation.remark = '';
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
        // 改变婚姻状况时要清空下面不要填的数据
        changeRelation() {
          if (this.customerInfo.maritalStatusCode === this.dCode.maritalStatusCode.married || this.customerInfo.maritalStatusCode === this.dCode.maritalStatusCode.remarriage) {
            for (let k in this.customerRelation) {
              this.customerRelation[k] = '';
            }
            this.$refs.customerRelationForm.validate();
          } else {
            for (let k in this.customerContactsInfo) {
              this.customerContactsInfo[k] = '';
            }
            this.$refs.customerContactsInfoForm.validate();
          }
        }
      },
      components: {
        addGuarantor,
        houseMessage,
        customerTaxInfo
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
        },
        'organizationTax.taxpayerNum': function(_n, _o) {
          if (_o !== undefined && _n !== _o) {
            this.saveStatus = true;
            if (this.organizationTax.tlTaxOrganizationId !== 1) {
              // 税务接入机构不是无需接入的时候，一旦修改，不能提交，必须重新授权
              this.submitStatus = true;
            }
          }
        },
        'organizationTax.tlTaxOrganizationId': function (_n, _o) {
          // 监听税务机构切换
          if (_o !== undefined && _n !== _o) {
            this.saveStatus = true;
            // 一旦修改并且非无需接入，不能提交，必须重新授权
            if (_n !== 1) {
              this.submitStatus = true;
            }
          }
        },
        'customerInfo.organizationTaxInd': function (_n, _o) {
          // TODO: 代码待优化
          if (_n && _o !== undefined) {
            this.getTaxAgencyList().then((_data) => {
              this.taxAgencyList = _data;
            });
            // 授权成功 不再做保存的限制
            if (this.submitFalg) {
              this.submitStatus = _n;
            }
          }
          if (!_n && _o !== undefined) {
            if (!_n) {
              this.submitStatus = _n;
              this.hasTaxInfo = _n;
            }
          }
        }
      },
      computed: {
        // 计算缴费次数
        premiumTermCnt() {
          let num = 0;
          let nowDate = new Date().normalizeTime().objDate;
          let setDate = new Date(this.policyEdit.effectiveDate).normalizeTime().objDate;
          if (this.policyEdit.effectiveDate && this.policyEdit.paymentModeCode) {
            switch (this.policyEdit.paymentModeCode) {
              case '1':
                num = getMonthTimes();
                break;
              case '2':
                num = getQuarterTimes();
                break;
              case '3':
                num = getHalfTimes();
                break;
              case '4':
                num = getFullTimes();
                break;
            }
          }
          if (num <= 0) {
            num = 0;
          }
          function getMonthTimes() {
            return (((nowDate.Y - setDate.Y) * 12) + ((nowDate.M - setDate.M) + (((nowDate.D - setDate.D) >= 0) ? 1 : 0)));
          }
          function getQuarterTimes() {
            return Math.ceil((((nowDate.Y - setDate.Y) * 12) + ((nowDate.M - setDate.M) + (((nowDate.D - setDate.D) >= 0) ? 1 : 0))) / 3);
          }
          function getHalfTimes() {
            return Math.ceil((((nowDate.Y - setDate.Y) * 12) + ((nowDate.M - setDate.M) + (((nowDate.D - setDate.D) >= 0) ? 1 : 0))) / 6);
          }
          function getFullTimes() {
            return Math.ceil((((nowDate.Y - setDate.Y) * 12) + ((nowDate.M - setDate.M) + (((nowDate.D - setDate.D) >= 0) ? 1 : 0))) / 12);
          }
          return num;
        },
        // 判断保单是否有效
        isPolicyEffective() {
          let effect = false;
          let nowDate = new Date().normalizeTime().objDate;
          let setDate = new Date(this.policyEdit.effectiveDate).normalizeTime().objDate;
          let fullTowYears = Math.floor((((nowDate.Y - setDate.Y) * 12) + ((nowDate.M - setDate.M) + (((nowDate.D - setDate.D) >= 0) ? 0 : -1)))) >= 24;
          if (!this.policyEdit.holderSwitchInd && this.premiumTermCnt <= this.policyEdit.premiumTimesCnt && fullTowYears) {
             effect = true;
          }
          return effect;
        },
        // 计算年缴保费
        premiumAnnualAmt() {
          let num = 0;
          if (this.policyEdit.paymentModeCode && this.policyEdit.premiumCycleAmt) {
            switch (this.policyEdit.paymentModeCode) {
              case '1':
                    num = (12 * (this.policyEdit.premiumCycleAmt * 1000000)) / 1000000;
                    break;
              case '2':
                num = (4 * (this.policyEdit.premiumCycleAmt) * 1000000) / 1000000;
                break;
              case '3':
                num = (2 * (this.policyEdit.premiumCycleAmt) * 1000000) / 1000000;
                break;
              case '4':
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
  /*表单区块*/
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
        border-bottom: 1px solid  #E9E9E9;
        .title{
          font-size: 16px;
          .icon__gan{
            margin-right: 10px;
          }
        }
      }
      .message__list{
        padding-top: 20px;
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
    }
    .table__list{
      .item{
        padding-top: 20px;
        .dialog__table-box{
          position: relative;
          .table-guarantor{
            th{
              min-width: 91px;
            }
          }
          /deep/ .el-form-item__error{
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
          border: 1px solid #E9E9E9;
          box-shadow: 0 2px 6px 0 rgba(0,0,0,0.08);
          border-radius: 4px;
          padding: 20px;
          .query_btn {
            width: 120px;
            margin-top: 27px;
            margin-right: 15px;
          }
          .query_auth {
            border: 1px solid #538BF1;
            color: #538BF1;
            background: #fff;
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
            background-color: #E5E5E5;
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
        .dialog__table-box.customer-message{
          .tab-box{
            height: 40px;
            padding-left: 20px;
            border: 1px solid #E9E9E9;
            border-bottom: none;
            /deep/ .el-tabs__item{
              font-size: 12px;
            }
            /deep/ .el-tabs__nav-wrap::after{
              background: none;
            }
          }
          .add__btn{
            position: absolute;
            right: 10px;
            top: 5px;
            padding: 0 12px;
            line-height: 30px;
            font-size: 14px;
            background: @blue-light;
            border-radius: 3px;
            color: #fff;
            .icon__add{
              padding-right:8px;
              font-size: 20px;
              font-weight: 900;
            }
          }
        }
      }
    }
    .form__bottom{
      text-align: center;
      padding-bottom: 20px;
    }
  }
  .dialog-box .dialog__table-box table td {
    max-width: 100px;
  }
  .dialog__table-form-box{
    font-size: 12px;
    .table__box{
      border: 1px solid @line-color;
      border-radius: 4px;
      .table__head{
        .table__tr{
          .table__th{
            min-width: 83px;
          }
        }
      }
      .table__body{
        .table__tr{
          .table__tr__top-list{
            .table__td{
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
  .no-data{
    height: 60px;
    line-height: 60px;
    border: 1px solid #E9E9E9;
    border-top: none;
    font-size: 14px;
  }
  /deep/ .el-form-item__content{
    line-height: 20px;
  }
</style>
