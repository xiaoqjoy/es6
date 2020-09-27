<template>
  <div class="complete-product face2face-detail-style">
    <div class="product_list">
      <div class="product_list_header form__block_header">
        <h5 class="title"><span class="icon icon__gan"></span>详细信息</h5>
        <span style="display:none;">{{isCustomerUpdate}}</span>
      </div>
      <el-form :model="productInfo"
        ref="productInfo" label-width="100px"
        label-position="top" :disabled="isDetail || !openVideo || ydApproveMode2">
        <div class="form__block bg__white border__radius-5">
          <ul class="table__list">
            <li class="item" v-if="!easyLoanFlag">
              <el-form-item label="是否有保单" required>
                <el-radio-group v-model="productInfo.insurancePolicyInd">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <transition name="fade">
                <div class="dialog__table-box" v-if="productInfo.insurancePolicyInd">
                  <div class="table-form-box">
                    <ul class="table__box table_box1">
                      <li class="table__head">
                        <ul class="table__tr">
                          <li class="table__th" v-for="item in policyColList" :key="item.pops">{{item.label}}</li>
                          <li class="table__th" v-if="!isDetail&&!ydApproveMode2">操作</li>
                        </ul>
                      </li>
                      <li class="table__body">
                        <div class="table__tr" v-for="(item, index) in policyList" :key="item.id">
                          <ul class="table__tr__top-list" v-show="!item.showFormEle">
                            <!-- <li class="table__td">xx--{{item.showFormEle}}</li> -->
                            <li class="table__td">{{policyCompanyName(item.insuranceCompanyCode)}}</li>
                            <li class="table__td">{{item.mainRiskName}}</li>
                            <li class="table__td">{{item.policyNum}}</li>
                            <li class="table__td">{{getTime(item.effectiveDate)}}</li>
                            <li class="table__td">{{(item.policyStatusInd)?'有效': (item.policyStatusInd === null ? '' : '其他')}}</li>
                            <li class="table__td">{{insPaymentModeCodeClass[item.paymentModeCode]}}</li>
                            <li class="table__td">{{item.premiumCycleAmt}}元</li>
                            <li class="table__td">{{item.premiumAnnualAmt}}元</li>
                            <li class="table__td">{{item.premiumTermCnt}}</li>
                            <li class="table__td">{{item.premiumTimesCnt}}</li>
                            <li class="table__td">{{item.holderSwitchInd ? '是' : '否'}}</li>
                            <li class="table__td">{{item.availableInd ? '是' : '否'}}</li>
                            <li class="table__td" v-if="!isDetail&&!ydApproveMode2">
                              <div class="operate-box">
                                <i class="icon el-icon-plus cursor__pointer"
                                    v-show="index === (policyList.length-1) && !policyEditDg"
                                  @click="openAddPolicy"></i>
                                <i class="icon el-icon-minus cursor__pointer" @click="deletePolicy(item.id)"></i>
                                <i class="icon icon__edit cursor__pointer" @click="editPolicyELe(item)"></i>
                              </div>
                            </li>
                          </ul>
                          <el-form :model="policyEdit"
                              :rules="policyRule" :ref="'policyEditForm' + index"
                              label-width="100px" class="demo-form-inline"
                              label-position="top" v-if="item.showFormEle"
                              :disabled="isDetail || !openVideo || ydApproveMode2 ">
                            <div class="table__tr__bottom-list" >
                              <el-form-item label="" prop="insuranceCompanyCode" class="table__form-item">
                                <el-select v-model="policyEdit.insuranceCompanyCode" placeholder="请选择">
                                  <el-option v-for="(item) in policyCompanyList"
                                    :label="item.itemDesc" :value="item.itemCode"
                                    :key="item.itemCode"></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label="" prop="mainRiskName" class="table__form-item">
                                <el-input v-model="policyEdit.mainRiskName"></el-input>
                              </el-form-item>
                              <el-form-item label="" prop="policyNum" class="table__form-item">
                                <el-input v-model="policyEdit.policyNum" maxlength="30"></el-input>
                              </el-form-item>
                              <el-form-item label="" prop="effectiveDate" class="table__form-item">
                                <el-date-picker
                                  v-model="policyEdit.effectiveDate"
                                  type="date" format="yyyy/MM/dd"
                                  value-format="timestamp" placeholder="选择日期"
                                  :editable="false">
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
                                  <el-option v-for="item in insPaymentModeCodeLibrary" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label="" prop="premiumCycleAmt" class="table__form-item">
                                <el-input
                                  @blur="formatMoney('policyEdit', 'premiumCycleAmt')"
                                  v-model="policyEdit.premiumCycleAmt">
                                </el-input>
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
                                <el-switch v-model="policyEdit.holderSwitchInd"
                                  :width="50" :active-value="true"
                                  :inactive-value="false"></el-switch>
                              </el-form-item>
                              <el-form-item class="table__form-item text__center">
                                <el-switch v-model="isPolicyEffective"
                                  :width="50" :active-value="true"
                                  :inactive-value="false"
                                  disabled></el-switch>
                              </el-form-item>
                              <div class="operate-box text__center">
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
                              :rules="policyRule" ref="policyAddForm"
                              label-width="100px"
                              class="demo-form-inline" label-position="top"
                              :disabled="!openVideo">
                            <div class="table__tr__bottom-list" >
                              <el-form-item label="" prop="insuranceCompanyCode" class="table__form-item">
                                <el-select v-model="policyEdit.insuranceCompanyCode" placeholder="请选择">
                                  <el-option
                                    v-for="(item) in policyCompanyList"
                                    :label="item.itemDesc" :value="item.itemCode"
                                    :key="item.itemCode"></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label="" prop="mainRiskName" class="table__form-item">
                                <el-input v-model="policyEdit.mainRiskName"></el-input>
                              </el-form-item>
                              <el-form-item label="" prop="policyNum" class="table__form-item">
                                <el-input v-model="policyEdit.policyNum" maxlength="30"></el-input>
                              </el-form-item>
                              <el-form-item label="" prop="effectiveDate" class="table__form-item">
                                <el-date-picker
                                  v-model="policyEdit.effectiveDate"
                                  type="date" format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  :editable="false" placeholder="选择日期">
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
                                  <el-option v-for="item in insPaymentModeCodeLibrary" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label="" prop="premiumCycleAmt" class="table__form-item">
                                <el-input @blur="formatMoney('policyEdit', 'premiumCycleAmt')"
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
                                <el-switch v-model="policyEdit.holderSwitchInd"
                                  :width="50" :active-value="true"
                                  :inactive-value="false"></el-switch>
                              </el-form-item>
                              <el-form-item class="table__form-item text__center">
                                <el-switch v-model="isPolicyEffective"
                                  :width="50" :active-value="true"
                                  :inactive-value="false"
                                  disabled></el-switch>
                              </el-form-item>
                              <div class="operate-box text__center" v-if="!isDetail&&!ydApproveMode2">
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
                <el-radio-group v-model="productInfo.estateInd" :disabled="isDetail || ydApproveMode2 ">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <transition name="fade">
                <div class="dialog__table-box customer-message" v-if="productInfo.estateInd">
                  <el-tabs v-model="TabActiveName" class="tab-box">
                    <el-tab-pane label="房产信息" name="first"></el-tab-pane>
                    <el-tab-pane label="担保人信息" name="second"></el-tab-pane>
                  </el-tabs>
                  <span class="button font__blue add__btn" @click="openMessageBox" v-if="!isDetail&&!ydApproveMode2"><span class="icon icon__add">+</span>新增</span>
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
                        <tr v-for="(item) in houseList" :key="item.id">
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
                              <i class="icon el-icon-minus cursor__pointer" @click="deleteHouseMessage(item.id)" v-if="!isDetail&&!ydApproveMode2"></i>
                              <i class="icon icon__edit cursor__pointer" @click="openMessageBox(item)"></i>
                            </div>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </transition>
                  <transition name="fade">
                    <div class="dialog__table-box">
                      <table v-show="TabActiveName === 'second'">
                        <thead>
                        <tr>
                          <th>担保人编号</th>
                          <th>担保人姓名</th>
                          <th>证件类型</th>
                          <th>证件号码</th>
                          <th>担保人手机号</th>
                          <th>单位联系人姓名</th>
                          <th v-if="!isDetail&&!ydApproveMode2">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(item) in guarantorList" :key="item.id">
                          <td>{{item.id}}</td>
                          <td>{{item.guaranteeName}}</td>
                          <td>{{certificateClass[item.certificateTypeCode]}}</td>
                          <td>{{item.certificateNum}}</td>
                          <td>{{item.contactNum}}</td>
                          <td>{{item.workContractName}}</td>
                          <td v-if="!isDetail&&!ydApproveMode2">
                            <div class="operate-box" v-if="!isDetail&&!ydApproveMode2">
                              <i class="icon el-icon-minus cursor__pointer" @click="deleteGuarantor(item.id)"></i>
                              <i class="icon icon__edit cursor__pointer" @click="openMessageBox(item)"></i>
                            </div>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </transition>
                </div>
              </transition>
            </li>
            <li class="item" v-if="!easyLoanFlag">
              <el-form-item label="是否有信用卡车供" required>
                <el-radio-group v-model="productInfo.carLoanInd">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <transition name="fade">
                <div class="dialog__table-box" v-if="productInfo.carLoanInd">
                  <div class="table-form-box">
                    <ul class="table__box table_box3">
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
                          <li class="table__th" v-if="!isDetail&&!ydApproveMode2">操作</li>
                        </ul>
                      </li>
                      <li class="table__body">
                        <div class="table__tr" v-for="(item, index) in carList" :key="item.id">
                          <ul class="table__tr__top-list" v-show="!item.showFormEle">
                            <li class="table__td">{{item.bankCode}}</li>
                            <li class="table__td">{{item.loanAmt}}元</li>
                            <li class="table__td">{{getTime(item.loanDate)}}</li>
                            <li class="table__td">{{getTime(item.dueDate)}}</li>
                            <li class="table__td">{{getTime(item.firstRepaymentDate)}}</li>
                            <li class="table__td">{{(item.loanStatusCode === dCode.loanStatusCode.normal) ? '正常' : '结清'}}</li>
                            <li class="table__td">{{getTime(item.settlementDate)}}</li>
                            <li class="table__td">{{item.monthlyRepaymentAmt}}元</li>
                            <li class="table__td">{{(item.availableInd === null) ? '/' : (item.availableInd ? '是' : '否')}}</li>
                            <li class="table__td" v-if="!isDetail&&!ydApproveMode2">
                              <div class="operate-box">
                                <i class="icon el-icon-plus cursor__pointer" @click="openAddCar" v-if="index  === (carList.length -1) && !carEditDg"></i>
                                <i class="icon el-icon-minus cursor__pointer" @click="deleteCar(item.id)"></i>
                                <i class="icon icon__edit cursor__pointer" @click="editCarELe(item)"></i>
                              </div>
                            </li>
                          </ul>
                          <el-form :model="carEdit"
                              :rules="carRule" :ref="'carEditForm' + index"
                              class="demo-form-inline" label-position="top" v-show="item.showFormEle"
                              :disabled="isDetail || !openVideo || ydApproveMode2 ">
                            <div class="table__tr__bottom-list" >
                              <el-form-item label="" prop="bankCode" class="table__form-item">
                                <el-input v-model="carEdit.bankCode" maxlength="40"></el-input>
                              </el-form-item>
                              <el-form-item label="" prop="loanAmt" class="table__form-item">
                                <el-input v-model="carEdit.loanAmt" maxlength="20"></el-input>
                              </el-form-item>
                              <el-form-item label="" prop="loanDate" class="table__form-item">
                                <el-date-picker
                                  v-model="carEdit.loanDate"
                                  type="date" format="yyyy/MM/dd"
                                  value-format="timestamp" :editable="false"
                                  placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="" prop="dueDate" class="table__form-item">
                                <el-date-picker
                                  v-model="carEdit.dueDate"
                                  type="date" format="yyyy/MM/dd"
                                  value-format="timestamp" :editable="false"
                                  placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="" prop="firstRepaymentDate" class="table__form-item">
                                <el-date-picker
                                  v-model="carEdit.firstRepaymentDate"
                                  type="date" format="yyyy/MM/dd"
                                  value-format="timestamp" :editable="false"
                                  placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="" prop="loanStatusCode" class="table__form-item">
                                <el-select v-model="carEdit.loanStatusCode" placeholder="请选择" @change="clearCarDate('carEditForm' + index)">
                                  <el-option
                                    v-for="item in carLoanStatusCodeLibrary"
                                    :key="item.itemCode" :label="item.itemDesc"
                                    :value="item.itemCode"></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label="" prop="settlementDate" class="table__form-item">
                                <el-date-picker
                                  v-model="carEdit.settlementDate"
                                  type="date" format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  :disabled="!(carEdit.loanStatusCode === dCode.loanStatusCode.settle)"
                                  :editable="false"
                                  placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="" prop="monthlyRepaymentAmt" class="table__form-item">
                                <el-input v-model="carEdit.monthlyRepaymentAmt" maxlength="8"></el-input>
                                <!-- <el-input-number class="input__number" v-model="carEdit.monthlyRepaymentAmt" :min="0" :max="99999999" placeholder="请填写贷款月还金额"></el-input-number> -->
                              </el-form-item>
                              <el-form-item label="" class="table__form-item">
                                <el-select v-model="carEdit.availableInd" placeholder="请选择" disabled>
                                  <el-option label="是" :value="true"></el-option>
                                  <el-option label="否" :value="false"></el-option>
                                </el-select>
                              </el-form-item>
                              <div class="operate-box text__center" v-if="!isDetail&&!ydApproveMode2">
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
                              :rules="carRule" ref="carAddForm"
                              class="demo-form-inline" label-position="top"
                              :disabled="!openVideo">
                            <div class="table__tr__bottom-list" >
                              <el-form-item  prop="bankCode" class="table__form-item">
                                <el-input v-model="carEdit.bankCode" maxlength="40"></el-input>
                              </el-form-item>
                              <el-form-item  prop="loanAmt" class="table__form-item">
                                <el-input v-model="carEdit.loanAmt" maxlength="20"></el-input>
                              </el-form-item>
                              <el-form-item  prop="loanDate" class="table__form-item">
                                <el-date-picker v-model="carEdit.loanDate"
                                  type="date" format="yyyy/MM/dd"
                                  value-format="timestamp" :editable="false"
                                  placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item  prop="dueDate" class="table__form-item">
                                <el-date-picker v-model="carEdit.dueDate"
                                  type="date" format="yyyy/MM/dd"
                                  value-format="timestamp" :editable="false"
                                  placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item  prop="firstRepaymentDate" class="table__form-item">
                                <el-date-picker v-model="carEdit.firstRepaymentDate"
                                  type="date" format="yyyy/MM/dd"
                                  value-format="timestamp" :editable="false"
                                  placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item  prop="loanStatusCode" class="table__form-item">
                                <el-select v-model="carEdit.loanStatusCode" placeholder="请选择" @change="clearCarDate('carAddForm')">
                                  <el-option v-for="item in carLoanStatusCodeLibrary"
                                    :key="item.itemCode" :label="item.itemDesc"
                                    :value="item.itemCode"></el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label="" prop="settlementDate" class="table__form-item">
                                <el-date-picker v-model="carEdit.settlementDate"
                                  type="date" format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  :disabled="!(carEdit.loanStatusCode === dCode.loanStatusCode.settle)"
                                  :editable="false" placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="" prop="monthlyRepaymentAmt" class="table__form-item">
                                <el-input v-model="carEdit.monthlyRepaymentAmt" maxlength="8"></el-input>
                                <!-- <el-input-number class="input__number" v-model="carEdit.monthlyRepaymentAmt" :min="0" :max="99999999" placeholder="请填写贷款月还金额"></el-input-number> -->
                              </el-form-item>
                              <el-form-item label="" class="table__form-item">
                                <el-select v-model="carEdit.availableInd" placeholder="请选择" disabled>
                                  <el-option label="是" :value="true"></el-option>
                                  <el-option label="否" :value="false"></el-option>
                                </el-select>
                              </el-form-item>
                              <div class="operate-box text__center">
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
            <!-- 添加企业税 -->
            <li class="item" v-if="!easyLoanFlag">
              <el-form-item label="是否有企税信息" required>
                <el-radio-group v-model="productInfo.organizationTaxInd" :disabled="!!isDetail">
                  <el-radio  :label="true">是</el-radio>
                  <el-radio  :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <transition name="fade">
                <div class="dialog__table-box" v-if="productInfo.organizationTaxInd">
                  <el-form :model="organizationTax"
                    :rules="organizationTaxRule"
                    ref="organizationTaxForm"
                    class="demo-form-inline" label-position="top"
                    :disabled="!openVideo">
                      <div class="tax_box">
                        <el-form-item label="税务数据接入机构" class="width245" required prop="tlTaxOrganizationId">
                          <el-select v-model="organizationTax.tlTaxOrganizationId"
                            placeholder="请选择" :disabled="!!isDetail"
                            @change="taxAgencyChange">
                            <el-option
                              v-for="(item) in taxAgencyList"
                              :key="item.tlTaxOrganizationId"
                              :label="item.tlTaxOrganizationName"
                              :value="item.tlTaxOrganizationId">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="纳税人识别码" prop="taxpayerNum" class="width245" required>
                          <el-input v-model="organizationTax.taxpayerNum" disabled></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-button size="small" class="query_btn query_auth" @click="queryAuthorizationInfo" :disabled="queryImpowerBtnStatus || impowerFlag">查询授权结果</el-button>
                          <el-button size="small" type="primary" :disabled="queryTax || queryImpowerBtnStatus || !!isDetail"
                            class="query_btn query_tax" @click="queryTaxInfo">获取税务信息</el-button>
                          <el-button size="small" type="warning" class="query_btn button__yellow" @click="checkTaxInfo">查看税务信息</el-button>
                        </el-form-item>
                        <div class="horizon"></div>
                        <div class="complex_info">
                          <h5 class="title"><span class="icon icon__gan"></span>综合信息</h5>
                        </div>
                        <div>
                          <el-form-item label="近一年企业年缴税额（元）" prop="nearly1YrAnnlPayTaxAmt" class="width250">
                            <el-input v-model="organizationTax.nearly1YrAnnlPayTaxAmt" maxlength="100" :disabled="!!isDetail"></el-input>
                          </el-form-item>
                          <el-form-item label="近一年企业信用评级" class="width245" prop="nearly1YrOrgCrLvlCd">
                            <el-select v-model="organizationTax.nearly1YrOrgCrLvlCd"
                              placeholder="请选择" :disabled="!!isDetail" clearable>
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
                              :disabled="!!isDetail"
                              placeholder="选择日期"
                              :editable='false'>
                            </el-date-picker>
                          </el-form-item>
                          <el-form-item
                            label="当前是否有未缴清税款"
                            prop="notPayUpTaxInd">
                            <el-switch v-model="organizationTax.notPayUpTaxInd" :width=50 :disabled="!!isDetail"></el-switch>
                            <span>{{(organizationTax.notPayUpTaxInd === true) ? '是':'否'}}</span>
                          </el-form-item>
                        </div>
                      </div>
                  </el-form>
                </div>
              </transition>
            </li>
            <!-- 添加企业税 end-->
          </ul>
        </div>
      </el-form>
    </div>
    <div v-if="!easyLoanFlag">
      <house-message
        v-if="openHouseMessageDg"
        :isDetail="isDetail"
        @close="closeHouseMessage"
        :house-id="houseId"
        :house-id-list="houseIdList"
        :areaList="options"
        :application-id="applicationId"
        :estateTypeCodeLibrary="estateTypeCodeLibrary"
        :certificateTypeCodeLibrary="certificate_type_codes">
      </house-message>
    </div>
    <div v-if="easyLoanFlag">
      <easy-loan-house-msg
        v-if="openHouseMessageDg"
        :has-submit="isDetail || ydApproveMode2 "
        @close="closeHouseMessage"
        :house-id="houseId"
        :house-id-list="houseIdList"
        :areaList="options"
        :application-id="applicationId">
      </easy-loan-house-msg>
    </div>
    <!-- <transition name="fade">
    </transition> -->
    <add-guarantor
      v-if="openAddGuarantorDg"
      :isDetail="isDetail || ydApproveMode2 "
      @close="closeGuarantor"
      :application-id="applicationId"
      :house-id-list="enableHouseIdList"
      :house-id="guarantorHouseId"
      :guarantor-id="guarantorId"
      :certificateTypeCodeLibrary="certificate_type_codes">
    </add-guarantor>
    <!-- <transition name="fade">
    </transition> -->
    <customer-tax-info
      v-if="openTaxInfoDg"
      @close="closeCustomerTaxInfo"
      :taxPayerNum="organizationTax.taxpayerNum" class="face2face_tax"></customer-tax-info>
    <!-- <transition name="fade">
    </transition> -->
  </div>
</template>

<script>
import { baseApi, easyLoan } from "../../../../js/server";
// import myRule from "@common/js/rules";
import { mapGetters } from 'vuex';
import houseMessage from "./house_message";
import addGuarantor from "./add_guarantor";
import easyLoanHouseMsg from '@system/spare/solving/complete_info/complete-product/house_message/easy_loan_house_message';
import customerTaxInfo from '@system/spare/solving/complete_info/complete-product/customer_tax_info';
import { productListSelectArr, policyRule, carRule, organizationTaxRule } from '../../../../js/mind';
const policyEdit = {
    applicationId: null,
    availableInd: true,
    createdBy: null,
    createdDate: null,
    effectiveDate: null,
    fromCrawlerInd: null,
    holderSwitchInd: false,
    id: null,
    insuranceCompanyCode: null,
    mainRiskName: null,
    maxEffectiveCode: null,
    paymentModeCode: null,
    paymentRecord: null,
    paymentTermCnt: null,
    policyNum: null,
    policyStatusInd: true,
    premiumAnnualAmt: null,
    premiumAnnualCode: null,
    premiumCycleAmt: null,
    premiumTermCnt: null,
    premiumTimesCnt: null,
    reinstatementInfo: null,
    showFormELe: false,
    updatedBy: null,
    updatedDate: null
  };
export default {
  name: 'product_list',
  props: {
    // 是否是详情，是的话则所有表单不可编辑
    isDetail: {
      type: Boolean,
      default: false
    },
    // 易贷面核面签（除收款账户信息）不可编辑
    ydApproveMode2: {
      type: Boolean,
      default: false
    },
    applicationId: {
      type: String,
      default: ''
    }
  },
  data() {
    const policyColList = [
      { label: '寿险公司', prop: 'companyName' },
      { label: '主险名称', prop: 'mainRiskName' },
      { label: '保单号', prop: 'policyNum' },
      { label: '生效日期', prop: 'effectiveDate' },
      { label: '保单状态', prop: 'policyStatusInd' },
      { label: '缴费方式', prop: 'insPaymentModeCodeClass' },
      { label: '期缴保费（元）', prop: 'premiumCycleAmt' },
      { label: '年缴保费（元）', prop: 'premiumAnnualAmt' },
      { label: '应缴次数', prop: 'premiumTermCnt' },
      { label: '缴费次数', prop: 'premiumTimesCnt' },
      { label: '两年内变更投保人', prop: 'holderSwitchInd' },
      { label: '保单是否有效', prop: 'availableInd' }
    ];
    const carMixRule = {
      settlementDate: [
        {
          validator: (rule, value, callback) => {
            if (this.carEdit.loanStatusCode === this.dCode.loanStatusCode.settle && !value) {
              return callback(new Error("请选择贷款结清日期!"));
            } else {
              callback();
            }
          },
          trigger: "blur"
        }
      ]
    };
    const creditLevelList = [
      { value: 'A', label: 'A' },
      { value: 'B', label: 'B' },
      { value: 'C', label: 'C' },
      { value: 'D', label: 'D' },
      { value: 'M', label: 'M' },
      { value: 'X', label: '暂无评级' }
    ];
    return {
      easyLoanFlag: false,
      policyColList,
      api: !this.isDetail ? baseApi.pending : baseApi.processed,
      productInfo: {
        insurancePolicyInd: false,
        estateInd: false,
        carLoanInd: false,
        organizationTaxInd: false
      },
      policyCompanyList: [],
      productInfoOrigin: "", // 产品信息序列化
      organizationTaxOrigin: JSON.stringify({
        notPayUpTaxInd: false
      }), // 税务带信息序列化
      reportSourceCodes: [], // 征信报告来源字典
      insPaymentModeCodeLibrary: [], // 缴费方式字典
      insPaymentModeCodeClass: {},
      paymentModeCodeLibrary: [], // 支付方式字典
      houseClass: {}, // 房屋性质字典
      carLoanStatusCodeLibrary: [], // 贷款状态字典
      certificate_type_codes: [], // 证件类型字典
      policyCurrentEdit: {}, // 当前正被编辑保险项
      estateTypeCodeLibrary: [],
      policyEditDg: false,
      policyRule: policyRule,
      certificateClass: {},
      policyEdit: Object.assign({}, policyEdit),
      policyList: [],
      TabActiveName: "first", // 房产信息数据
      houseList: [],
      houseIdList: [],
      houseEdit: {},
      houseCurrentEdit: {},
      houseEditDg: false,
      openHouseMessageDg: false,
      openAddGuarantorDg: false,
      options: [],
      carList: [],
      carEdit: {settlementDate: ''},
      carCurrentEdit: {},
      carEditDg: false,
      carRule: Object.assign(carRule, carMixRule),
      organizationTaxInd: false,
      organizationTax: {
        notPayUpTaxInd: false
      },
      // 企业税 授权控制开关
      impowerFlag: false,
      // 获取授权按钮 状态
      queryImpowerBtnStatus: false,
      queryTax: true,
      // 授权结果数据
      openTaxInfoDg: false,
      saveStatus: false,
      // 税务数据接入机构下拉列表
      taxAgencyList: [],
      // 税务数据接入机构
      tlTaxOrganizationId: '',
      creditLevelList: creditLevelList,
      organizationTaxRule,
      dCode: this.$getCodeDependent(),
      // 担保人信息
      guarantorList: [],
      guarantorId: "", // 被选中编辑的列表
      guarantorHouseId: "", // 被选中的列表 房产证号
      guarantorHouseIdList: [], // 已经有担保人的房产证号
      enableHouseIdList: [], // 可被选中的房产证号
      bankCardInfoList: []
    };
  },
  methods: {
    getAllInfo() {
      this.getIsEasyLoan().then(_res => {
        this.easyLoanFlag = _res;
        if (_res) {
          this.getHouseList();
          this.getGuarantorList(this.applicationId);
          return;
        }
        this.getGuarantorList(this.applicationId);
        this.getPolicyList(); // 保单信息
        this.getHouseList(); // 房产信息;
        this.getCarList(); // 车供信息
        this.getorganizationTax(); // 税务贷信息
      }).catch(_error => {
        this.$error(_error.message);
      });
    },
    getIsEasyLoan() {
      return this.$MyFetch.get(easyLoan.isEasyLoan + this.applicationId);
    },
    // 获取多个下拉项
    getSelectOptionWather() {
      this.$on('getSelectOption', () => {
        this.getMultipleLibrary(productListSelectArr);
      });
    },
    getMultipleLibrary(_selectArr) {
      const selectOption = this.$store.getters.selectOption;
      this.reportSourceCodes = selectOption.report_source_code;
      this.policyCompanyList = [...selectOption.insurance_company];
      this.insPaymentModeCodeLibrary = selectOption.ins_payment_mode_code;
      selectOption.ins_payment_mode_code.forEach(v => {
        this.$set(this.insPaymentModeCodeClass, v.itemCode, v.itemDesc);
      });
      this.paymentModeCodeLibrary = selectOption.payment_mode_code;
      this.estateTypeCodeLibrary = selectOption.estate_type_code;
      selectOption.estate_type_code.forEach(_v => {
        this.$set(this.houseClass, _v.itemCode, _v.itemDesc);
      });
      this.carLoanStatusCodeLibrary = selectOption.car_loan_status_code;
      this.certificate_type_codes = selectOption.certificate_type_code;
      selectOption.certificate_type_code.forEach((v) => {
        this.$set(this.certificateClass, v.itemCode, v.itemDesc);
      });
    },
    isEditing(_list) {
      let flag = false;
      for (let i = 0; i < _list.length; i++) {
        if (_list[i].showFormEle) {
          flag = true;
          break;
        }
      }
      return flag;
    },
    // 添加保险单
    addPolicy() {
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      // console.log(this.policyEdit);
      this.$refs.policyAddForm.validate(valid => {
        if (valid) {
          this.policyEdit.premiumTermCnt = this.premiumTermCnt;
          this.policyEdit.availableInd = this.isPolicyEffective;
          this.policyEdit.applicationId = this.applicationId;
          this.policyEdit.premiumAnnualAmt = this.premiumAnnualAmt;
          this.addPolicyApi(this.policyEdit).then(() => {
            this.policyEditDg = false;
            this.getPolicyList();
            this.confirmFn('保单添加成功！', 'success');
          });
        }
      });
    },
    addPolicyApi(data) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .post(baseApi.completeProduct.addPolicy, data)
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            console.error(err);
            this.confirmFn(err.message, "error");
          });
      });
    },
    // 删除保单信息
    deletePolicy(id) {
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      if (this.policyCurrentEdit.id) {
        this.confirmFn("请先完成正在编辑的表格", "error");
        return;
      }
      this.confirmFn("是否删除该条信息!", "warning").then(() => {
          return this.deletePolicyApi(id);
        }).then(() => {
          this.getPolicyList();
        });
    },
    deletePolicyApi(id) {
      return new Promise((resolve, reject) => {
        this.$MyFetch.get(baseApi.completeProduct.deletePolicy + id)
          .then((data = {}) => {
            this.confirmFn('删除成功！', 'success');
            this.policyEdit = Object.assign({}, policyEdit);
            resolve(data);
          }).catch(err => {
            this.confirmFn(err.message, "error");
          });
      });
    },
    // 编辑保单表格
    editPolicyELe(obj) {
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      let isEdit = this.isEditing(this.policyList);
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
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      this.$refs[formName][0].validate(valid => {
        if (valid) {
          this.policyEdit.applicationId = this.applicationId;
          this.policyEdit.premiumTermCnt = this.premiumTermCnt;
          this.policyEdit.availableInd = this.isPolicyEffective;
          this.policyEdit.premiumAnnualAmt = this.premiumAnnualAmt;
          this.policyEdit.holderSwitchInd = this.policyEdit.holderSwitchInd ? this.policyEdit.holderSwitchInd : false;
          this.saveEditPolicyApi(this.policyEdit, obj);
        } else {
          console.error("error");
          this.confirmFn('请先完成正在编辑的表格', 'error');
        }
      });
    },
    // 关闭表单修改
    closeEditPolicy(obj) {
      this.policyCurrentEdit = {};
      this.policyEdit = {};
      this.$set(obj, "showFormEle", false);
    },
    saveEditPolicyApi(data, obj) {
      // console.log(data);
      this.$MyFetch
        .post(baseApi.completeProduct.editPolicy, data)
        .then((data = {}) => {
          this.getPolicyList();
          this.confirmFn("修改成功", "success");
          this.closeEditPolicy(obj);
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    openAddPolicy() {
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      if (this.policyCurrentEdit.id) {
        this.confirmFn("请先完成正在编辑的表格", "error");
        return;
      }
      this.policyEdit = Object.assign({}, policyEdit);
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
    getPolicyList() {
      this.$MyFetch
        .get(this.api.getInsuranceInfo + this.applicationId).then((data) => {
          data = data || {};
          this.productInfo.insurancePolicyInd = data.insurancePolicyInd;
          this.productInfoOrigin = JSON.stringify(this.productInfo);
          this.policyList = data.insurances;
          this.policyList.forEach((v) => {
            // 新增
            v.premiumCycleAmt = v.premiumCycleAmt && v.premiumCycleAmt.toFixed(2);
            v.premiumAnnualAmt = v.premiumAnnualAmt && v.premiumAnnualAmt.toFixed(2);
            if (v.effectiveDate) {
              v.effectiveDate = (new Date(v.effectiveDate.replace(/-/g, "/"))).getTime(); // 传回来的变成了时间字符串 转成时间搓
            }
            this.policyEdit.availableInd = this.policyEdit.availableInd ? this.policyEdit.availableInd : false;
            this.policyEdit.holderSwitchInd = this.policyEdit.holderSwitchInd ? this.policyEdit.holderSwitchInd : false;
            this.$set(v, 'showFormELe', false);
            // v.showFormEle = false;
          });
        }).catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
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
    // 房产信息
    // 获取房产客户信息列表
    getHouseList() {
      this.$MyFetch.get(this.api.getEstateInfo + this.applicationId).then((data) => {
        data = data || {};
        this.productInfo.estateInd = data.estateInd;
        this.productInfoOrigin = JSON.stringify(this.productInfo);
        this.houseList = data.estates;
        this.guarantorList = data.estateGuarantees;

        this.houseIdList = [];
          this.houseList.forEach(v => {
            this.houseIdList.push(v.estateNum);
          });
        this.guarantorHouseIdList = [];
          this.guarantorList.forEach(v => {
            this.guarantorHouseIdList.push(v.estateNum);
          });
      }).catch(err => {
        console.error(err);
        this.confirmFn(err.message, "error");
      });
    },
    // 获取地区列表值
    getAreaList() {
      let options = JSON.parse(localStorage.getItem('address'));
      if (!options) {
        return this.getArea({getAll: this.isDetail}).then(data => {
          this.options = data;
          // this.getInfo(this.applicationId);
        });
      }
      this.options = options;
    },
    // 打开房产信息 或担保人信息 新增（编辑窗口）
    openMessageBox(obj = {}) {
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      if (this.TabActiveName === "first") {
        // 新增房产信息
        if (!obj.id && this.houseList.length >= 2) {
          this.confirmFn("最多添加两条房产信息！", "error");
          return;
        }
        let hasHXAndTPY = false;
        this.bankCardInfoList.forEach(item => {
          if (item.productId === 'P20200513000001') {
            hasHXAndTPY = true;
          }
        });
        if (!obj.id && hasHXAndTPY && this.houseList.length >= 1) {
          this.confirmFn("太平洋产险-华夏银行(易贷)不接受两套抵押房产业务，不可新增房产信息", "error");
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
      // console.log("删除房产信息");
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      this.confirmFn("是否删除该条信息？", "warning")
        .then(() => {
          this.$MyFetch
            .get(baseApi.completeProduct.deleteHouse + id)
            .then((data = {}) => {
              this.confirmFn("删除成功", "success");
              this.getHouseList();
              this.getGuarantorList(this.applicationId);
            });
        })
        .catch(err => {
          console.error(err);
        });
    },
    // 担保人信息
    // 获取担保人信息
    getGuarantorList(id) {
      this.$MyFetch
        .post(baseApi.completeProduct.getGuaranteeList, { applicationId: id })
        .then(data => {
          if (data && data.list && data.list.length >= 0) {
            this.guarantorList = [...data.list];
            this.guarantorHouseIdList = [];
            data.list.forEach(v => {
              this.guarantorHouseIdList.push(v.estateNum);
            });
          }
        }).catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    closeGuarantor() {
      this.getGuarantorList(this.applicationId);
      this.openAddGuarantorDg = false;
    },
    deleteGuarantor(id) {
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      this.confirmFn("是否删除该条信息？", "warning")
        .then(() => {
          this.$MyFetch.get(baseApi.completeProduct.deleteGuarantee + id)
            .then(() => {
              this.confirmFn("删除成功！", "success");
              this.getGuarantorList(this.applicationId);
            });
        });
    },
    // 车供信息
    // 获取车供信息列表
    getCarList() {
      this.$MyFetch.get(this.api.getCarLoan + this.applicationId)
        .then((data) => {
          data = data || {};
          this.productInfo.carLoanInd = data.carLoanInd;
          this.productInfoOrigin = JSON.stringify(this.productInfo);
          this.carList = data.f2fCarLoans;
          this.carList.forEach((v) => {
            v.dueDate = v.dueDate ? (new Date(v.dueDate.replace(/-/g, "/"))).getTime() : "";
            v.firstRepaymentDate = v.firstRepaymentDate ? (new Date(v.firstRepaymentDate.replace(/-/g, "/"))).getTime() : "";
            v.loanDate = v.loanDate ? (new Date(v.loanDate.replace(/-/g, "/"))).getTime() : "";
            v.settlementDate = v.settlementDate ? (new Date(v.settlementDate.replace(/-/g, "/"))).getTime() : "";
          });
        }).catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 关闭新增
    closeAddCar() {
      this.carEditDg = false;
    },
    // 新增车贷信息
    addCar() {
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      this.$refs.carAddForm.validate(valid => {
        if (valid) {
          this.carEdit.applicationId = this.applicationId;
          this.addCarApi(this.carEdit).then(() => {
            this.carEditDg = false;
            this.getCarList();
          });
        }
      });
    },
    addCarApi(data) {
      return new Promise((resolve, reject) => {
        this.$MyFetch.post(baseApi.completeProduct.addCar, data)
          .then(data => {
            resolve(data);
          }).catch(err => {
            console.error(err);
            this.confirmFn(err.message, "error");
          });
      });
    },
    // 打开编辑车贷表格
    editCarELe(obj) {
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      let isEdit = this.isEditing(this.carList);
      if (this.carEditDg || isEdit) {
        this.confirmFn('请先完成正在编辑的表格', 'error');
        return;
      };
      this.$set(obj, 'showFormEle', true);
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
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      this.$refs[formName][0].validate(valid => {
        if (valid) {
          console.log(this.carEdit);
          this.carEdit.applicationId = this.applicationId;
          this.saveEditCarApi(this.carEdit, obj);
        } else {
          console.error("error");
          this.confirmFn('请先完成正在编辑的表格', 'error');
        }
      });
    },
    saveEditCarApi(data, obj) {
      this.$MyFetch
        .post(baseApi.completeProduct.editCar, data)
        .then(() => {
          this.getCarList();
          this.confirmFn("修改成功", "success");
          this.closeCarEle(obj);
        }).catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 车贷状态为正常时 结清日期清空
    clearCarDate(formName) {
      if (this.carEdit.loanStatusCode === this.dCode.loanStatusCode.normal) {
        this.carEdit.settlementDate = "";
      }
      if (!this.$refs[formName][0]) {
        this.$refs[formName].validateField(['settlementDate']);
      } else {
        this.$refs[formName][0].validateField(['settlementDate']);
      }
    },
    // 删除车供信息
    deleteCar(id) {
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      if (this.carCurrentEdit.id) {
        this.confirmFn("请先完成正在编辑的表格", "error");
        return;
      }
      this.confirmFn("是否删除该条信息!", "warning")
        .then(async () => {
          await this.deleteCarApi(id);
          this.getCarList();
        });
    },
    deleteCarApi(id) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .get(baseApi.completeProduct.deleteCar + id)
          .then((data = {}) => {
            this.confirmFn('删除成功！', 'success');
            this.carEdit = {settlementDate: ''};
            resolve(data);
          }).catch(err => {
            console.error(err);
            this.confirmFn(err.message, "error");
          });
      });
    },
    // 打开新增
    openAddCar() {
      // 具体看vuex中的face2face.js文件
      if (!this.openVideo) {
        return;
      }
      if (this.carCurrentEdit.id) {
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
    getTaxAgencyList() {
      return new Promise((resolve, reject) => {
        this.$MyFetch.get(baseApi.taxConfig.careerworkOrganizationList, {
          applicationId: this.applicationId
        }).then((_data) => {
            if (this.$lodash.isEmpty(_data) && !this.isSubmit) {
              this.confirmFn('客户单位地址所在省市无有效税务数据接入机构，请重新配置', 'error');
            }
            // this.$lodash.each(_data, (_e, _i) => {
            //   _e.value = _e.tlTaxOrganizationId;
            //   _e.label = _e.tlTaxOrganizationName;
            // });
            resolve(_data);
          }).catch((_erro) => {
            this.$error('获取税务数据接入机构失败');
            reject(_erro);
          });
      });
    },
    queryAuthorizationInfo() {
      if (!this.organizationTax.tlTaxOrganizationId) {
        this.confirmFn('税务接入机构不能为空', 'error');
        this.$refs.organizationTaxForm.validateField('tlTaxOrganizationId');
        return false;
      }
      if (this.saveStatus) {
        // 税务接入机构变了,提醒用户保存
        this.confirmFn('税务接入机构被更改过，请重新保存后再获取授权信息');
        return false;
      }
      this.impowerFlag = true;
      this.$MyFetch.get(baseApi.taxConfig.queryAuthory, {
        applicationId: this.applicationId
      }).then((_data = {}) => {
        // TP 第三方 DS 大数客户
        this.impowerFlag = false;
        if (!_data.thirdPartyCustomerCd) {
          this.confirmFn('查无数据');
          return false;
        }
        if (_data.thirdPartyCustomerCd === 'TP') {
          this.queryTax = false;
          this.confirmFn('客户授权成功且客户为第三方客户，可获取税务信息');
        } else if (_data.thirdPartyCustomerCd === 'DS') {
          this.queryTax = true;
          this.confirmFn('客户授权成功，且客户为非第三方客户，请保证综合信息已填');
        }
      }).catch((_erro) => {
        this.impowerFlag = false;
        console.error(_erro);
        this.confirmFn(_erro.message, "error");
      });
    },
    taxAgencyChange(_data) {
      this.queryImpowerBtnStatus = (_data === 1);
      if (this.queryImpowerBtnStatus) {
        this.organizationTaxRuleChange(true);
      }
    },
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
      this.$MyFetch.get(baseApi.taxConfig.queryTaxInfoApi, {
        applicationId: this.applicationId
      }).then((_data) => {
        this.confirmFn('获取税务信息成功');
        this.queryTax = false;
        this.organizationTaxRuleChange(false);
      }).catch(_erro => {
        this.confirmFn(_erro.message, "error");
        this.queryTax = false;
        console.error(_erro);
      });
    },
    // 获取税务贷数据
    getorganizationTax() {
      this.$MyFetch
        .get(this.api.getTaxLoan + this.applicationId)
        .then((data) => {
          data = data || {};
          // 是否有企业税
          this.productInfo.organizationTaxInd = data.organizationTaxInd;
          this.productInfoOrigin = JSON.stringify(this.productInfo);
          if (data.organizationTaxInd) {
            // 有税务贷信息，并且有授权
            this.organizationTax = data.taxLoan;
            this.organizationTax.nearly1YrAnnlPayTaxAmt = this.$returnFloat(this.organizationTax.nearly1YrAnnlPayTaxAmt, 2);
            if (this.organizationTax.checkParameterInd && this.organizationTax.tlTaxOrganizationId !== 1) {
              // 如果已经获取过税务信息，综合信息不校验
              this.organizationTaxRuleChange(false);
            }
            this.queryImpowerBtnStatus = this.organizationTax.tlTaxOrganizationId === 1;
            this.organizationTaxOrigin = JSON.stringify(this.organizationTax);
            this.filerTaxAgency(this.organizationTax);
          }
        })
        .catch(err => {
          this.confirmFn(err.message, "error");
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
        if (!this.isDetail) {
          // 在可编辑时
          this.organizationTax.tlTaxOrganizationId = null;
          delete this.organizationTax.tlTaxOrganizationName;
        } else {
          this.taxAgencyList.push({
            tlTaxOrganizationId,
            tlTaxOrganizationName
          });
        }
      }
    },
    getBankInfo() {
      return this.$MyFetch.post(this.api.getBankCards + this.applicationId)
        .then(data => {
          data = data || {};
          this.bankCardInfoList = data.bankCardInfoList;
        }).catch(err => {
          console.log(err);
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
    checkTaxInfo() {
      this.openTaxInfoDg = true;
      this.$store.dispatch('setNum', this.applicationId);
    },
    closeCustomerTaxInfo() {
      this.openTaxInfoDg = false;
    },
    // 提交主表单值
    saveInfo(_isSubmit) {
      // 保单校验
      if (this.productInfo.insurancePolicyInd && !this.policyList.length) {
        this.confirmFn('请添加保单信息', 'error');
        return;
      }
      // 房产校验
      if (this.productInfo.estateInd && !this.houseList.length) {
        this.confirmFn('请添加房产信息', 'error');
        return;
      }
      // 车供校验
      if (this.productInfo.carLoanInd && !this.carList.length) {
        this.confirmFn('请添加信用卡车供信息', 'error');
        return;
      }
      // 企业税校验
      if (this.productInfo.organizationTaxInd && !this.checkFormValid('organizationTaxForm')) {
        this.confirmFn('请填写税务贷相关信息', 'error');
        return;
      }
      // 获取话术库内容，保存接口不做校验
      let speechOptionMap = Object.assign({}, this.$store.getters.speechOptionMap);
      let data = {
        applicationId: this.applicationId,
        carLoanInd: this.productInfo.carLoanInd, // 是否有信用卡车供
        estateInd: this.productInfo.estateInd, // 是否有房产
        insurancePolicyInd: this.productInfo.insurancePolicyInd, // 是否有保单
        organizationTaxInd: this.productInfo.organizationTaxInd, // 是否有企业税
        taxLoan: this.organizationTax,
        faceCheckOpinion: speechOptionMap.remark,
        opinionCheckStateList: speechOptionMap.optionList
      };
      this.submitCustomerApi(data, _isSubmit);
    },
    submitCustomerApi(data, _isSubmit) {
      let loading = this.$loading({
        text: "",
        spinner: "",
        background: 'transparent'
      });
      this.$MyFetch
        .post(baseApi.productList.submit, data)
        .then(() => {
          loading.close();
          if (_isSubmit) { // 判断是否是提交面核操作true或者保存操作false
            this.$emit('submitHandle');
            return;
          }
          this.confirmFn(" 产品收入信息更新，请关注产品特殊字段！", "success");
          // 刷新表格
          this.getPolicyList(); // 保单信息
          this.getHouseList(); // 房产信息;
          this.getCarList(); // 车供信息
          this.getorganizationTax(); // 税务贷信息
          this.policyEdit = Object.assign({}, policyEdit);
          this.carEdit = {settlementDate: '', loanStatusCode: ''};
          // 这里不需要将税务贷的信息序列化，在获取税务贷信息的函数里已经做好了
          this.creditInfoOrigin = JSON.stringify(this.creditInfo);
          this.productInfoOrigin = JSON.stringify(this.productInfo);
          this.cardInfoListOrigin = JSON.stringify(this.cardInfoList);
        })
        .catch(err => {
          loading.close();
          this.confirmFn(err.message, "error");
        });
    },
    saveHandeleWath() {
      this.$on('saveHandle', (_isSubmit) => {
        this.saveInfo(_isSubmit);
      });
    },
    // 输入的数字自动补00
    formatMoney(objName, key) {
      this[objName][key] = this.$returnFloat(this[objName][key], 2);
    }
  },
  created() {
    this.getSelectOptionWather();
    this.getAllInfo();
    this.getAreaList();
    this.saveHandeleWath();
    this.getBankInfo();
  },
  computed: {
    ...mapGetters(['openVideo']),
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
      if (num <= 0) { num = 0; }
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
      let map = {
        '1': (12 * (this.policyEdit.premiumCycleAmt * 1000000)) / 1000000,
        '2': (4 * (this.policyEdit.premiumCycleAmt) * 1000000) / 1000000,
        '3': (2 * (this.policyEdit.premiumCycleAmt) * 1000000) / 1000000,
        '4': this.policyEdit.premiumCycleAmt
      };
      if (this.policyEdit.paymentModeCode && this.policyEdit.premiumCycleAmt) {
        // switch (this.policyEdit.paymentModeCode) {
        //   case '1':
        //     num = (12 * (this.policyEdit.premiumCycleAmt * 1000000)) / 1000000;
        //     break;
        //   case '2':
        //     num = (4 * (this.policyEdit.premiumCycleAmt) * 1000000) / 1000000;
        //     break;
        //   case '3':
        //     num = (2 * (this.policyEdit.premiumCycleAmt) * 1000000) / 1000000;
        //     break;
        //   case '4':
        //     num = this.policyEdit.premiumCycleAmt;
        //     break;
        // }
        num = map[this.policyEdit.paymentModeCode];
      }
      return num;
    },
    // 是否有修改过
    isCustomerUpdate() {
      let flag = JSON.stringify(this.productInfo) === this.productInfoOrigin &&
        JSON.stringify(this.organizationTax) === this.organizationTaxOrigin;
      this.$emit('customer_update', flag);
      return flag;
    }
  },
  watch: {
    'organizationTax.tlTaxOrganizationId': function (_n, _o) {
      if (_o !== undefined && _n !== _o) {
        this.saveStatus = true;
      }
    },
    'productInfo.organizationTaxInd': function (_n) {
      if (_n) {
        this.getTaxAgencyList().then((_data) => {
          this.taxAgencyList = _data;
      });
      }
    }
  },
  components: {
    houseMessage,
    addGuarantor,
    customerTaxInfo,
    easyLoanHouseMsg
  }
};
</script>

<style lang="less" scoped>
.product_list {
  .product_list_header.form__block_header {
    padding-bottom: 20px;
    border-bottom: 1px solid #e9e9e9;
    h5 {
      font-weight: 600;
    }
    span.icon {
      margin-right: 10px;
    }
  }
  .form__block {
    .table__list {
      .item {
        padding-top: 20px;
        .dialog__table-box {
          box-shadow: 0 2px 6px 0 rgba(0,0,0,0.08);
          position: relative;
          .table__box {
            .table__head {
              .table__tr {
                .table__th {
                  width: 83px;
                }
              }
            }
            .table__body {
              .table__tr {
                .table__td {
                  width: 83px;
                }
                .table__tr__bottom-list {
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
      }
    }
  }
}
</style>
