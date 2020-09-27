<template>
  <div class="complete-product face2face-detail-style">
    <!-- {{isCustomerUpdate}} -->
    <div class="dialog-box__middle-form">
      <el-form :model="creditInfo"
                :rules="creditInfoRule"
                ref="creditInfoForm"
                label-width="100px"
                class="demo-form-inline" label-position="top"
              :disabled="isDetail"
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
              <p class="content" v-for="item in reportSourceCodes" :key="item.itemCode" v-show="item.itemCode === creditInfo.reportSourceCode">{{item.itemDesc}}</p>
            </li>
            <li class="f__left item">
              <h5 class="title">意向申请金额：</h5>
              <p class="content">{{creditInfo.applicationPurposeAmt || 0}}</p>
            </li>
          </ul>
          <div class="dialog-box__form__group">
            <el-form-item v-for="(item, index) in creditInfo.productCreditDetails" :key="index" :label="'产品'+(index+1)+'：'"  class="el-form-item__25" >
              <!-- <p>{{item.productId}}</p> -->
              <el-input :value="item.productId" :disabled="true"></el-input>
            </el-form-item>
            <!-- <el-form-item label="申请金额："  class="el-form-item__25" >
              <el-input :value="creditInfo.applicationSubmitAmt || 0" :disabled="true"></el-input>
            </el-form-item> -->
            <el-form-item label="申请金额(元)" prop="applicationSubmitAmt" class="el-form-item__25" >
              <el-input
                v-model="creditInfo.applicationSubmitAmt"
                @blur="changeNum"
                maxlength="8"
                :disabled="isDetail"
                placeholder="请填写申请金额"></el-input>
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
              class="dialog__table">
              <el-table-column
                prop="productName"
                label=""
                width="158"
              >
              </el-table-column>
              <el-table-column
                prop="riskRateLevel"
                label="定价档次"
                width="120">
              </el-table-column>
              <el-table-column
                prop="pricingGrade"
                label="定价类型"
                width="120">
              </el-table-column>
              <el-table-column
              label="合作机构年化利率%（年）"
              width="130">
              <template slot-scope="scope">
              <span v-if="scope.row.partnerAnnualRate !== null">{{scope.row.partnerAnnualRate  | rounding}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="担保费率%（月）"
              width="130"
              >
              <template slot-scope="scope">
              <span v-if="scope.row.guaranteeRate !== null">{{scope.row.guaranteeRate  | rounding2}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="评审费率%（一次性收取）"
              width="200">
              <template slot-scope="scope">
              <span v-if="scope.row.reviewRate !== null">{{scope.row.reviewRate  | rounding2}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="保费费率%（一次性收取）"
              width="200">
              <template slot-scope="scope">
              <span v-if="scope.row.premiumRate !== null">{{scope.row.premiumRate  | rounding2}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="咨询费率%（一次性收取）"
              width="200">
              <template slot-scope="scope">
              <span v-if="scope.row.consultingRate !== null">{{scope.row.consultingRate  | rounding2}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="管理费率%（月）"
              width="130">
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
      <el-form :model="productInfo"
        ref="productInfo"
        label-width="100px"
        class="demo-form-inline" label-position="top"
        :disabled="isDetail">
        <div class="form__block bg__white border__radius-5" >
          <div class="dialog-box__middle-top">
            <h5 class="title"><span class="icon icon__gan"></span>详细信息</h5>
          </div>
          <ul class="table__list">
            <li class="item">
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
                          <li class="table__th">寿险公司</li>
                          <li class="table__th">主险名称</li>
                          <li class="table__th">保单号</li>
                          <li class="table__th">生效日期</li>
                          <li class="table__th">保单状态</li>
                          <li class="table__th">缴费方式</li>
                          <li class="table__th">期缴保费（元）</li>
                          <li class="table__th">年缴保费（元）</li>
                          <li class="table__th">应缴次数</li>
                          <li class="table__th">缴费次数</li>
                          <li class="table__th">两年内变更投保人</li>
                          <li class="table__th">保单是否有效</li>
                          <li class="table__th" v-if="!isDetail">操作</li>
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
                            <li class="table__td">{{insPaymentModeCodeClass[item.paymentModeCode]}}</li>
                            <li class="table__td">{{item.premiumCycleAmt}}元</li>
                            <li class="table__td">{{item.premiumAnnualAmt}}元</li>
                            <li class="table__td">{{item.premiumTermCnt}}</li>
                            <li class="table__td">{{item.premiumTimesCnt}}</li>
                            <li class="table__td">{{item.holderSwitchInd ? '是' : '否'}}</li>
                            <li class="table__td">{{item.availableInd ? '是' : '否'}}</li>
                            <li class="table__td" v-if="!isDetail">
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
                                   :rules="policyRule"
                                   :ref="'policyEditForm' + index"
                                   label-width="100px"
                                   class="demo-form-inline" label-position="top" v-if="item.showFormEle"
                                   :disabled="isDetail"
                                   >
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
                                <el-input v-model="policyEdit.mainRiskName"></el-input>
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
                                  placeholder="选择日期"
                                  :editable="false"
                                  >
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
                                <el-input v-model="policyEdit.mainRiskName"></el-input>
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
                                  :editable="false"
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
                                  <el-option v-for="item in insPaymentModeCodeLibrary" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
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
                              <div class="operate-box text__center" v-if="!isDetail">
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
                <el-radio-group v-model="productInfo.estateInd" :disabled="isDetail">
                  <el-radio   :label="true">是</el-radio>
                  <el-radio   :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <transition name="fade">
                <div class="dialog__table-box customer-message" v-if="productInfo.estateInd">
                  <el-tabs v-model="TabActiveName" class="tab-box">
                    <el-tab-pane label="房产信息" name="first"></el-tab-pane>
                    <el-tab-pane label="担保人信息" name="second"></el-tab-pane>
                  </el-tabs>
                  <span class="button font__blue add__btn" @click="openMessageBox" v-if="!isDetail"><span class="icon icon__add">+</span>新增</span>
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
                              <i class="icon el-icon-minus cursor__pointer" @click="deleteHouseMessage(item.id)" v-if="!isDetail"></i>
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
                          <th v-if="!isDetail">操作</th>
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
                          <td v-if="!isDetail">
                            <div class="operate-box" v-if="!isDetail">
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
            <li class="item">
              <el-form-item label="是否有信用卡车供" required>
                <el-radio-group v-model="productInfo.carLoanInd">
                  <el-radio   :label="true">是</el-radio>
                  <el-radio  :label="false">否</el-radio>
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
                          <li class="table__th" v-if="!isDetail">操作</li>
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
                            <li class="table__td">{{(item.loanStatusCode === '10') ? '正常' : '结清'}}</li>
                            <li class="table__td">{{getTime(item.settlementDate)}}</li>
                            <li class="table__td">{{item.monthlyRepaymentAmt}}元</li>
                            <li class="table__td">{{(item.availableInd === null) ? '/' : (item.availableInd ? '是' : '否')}}</li>
                            <li class="table__td" v-if="!isDetail">
                              <div class="operate-box">
                                <i class="icon el-icon-plus cursor__pointer" @click="openAddCar" v-if="index  === (carList.length -1) && !carEditDg"></i>
                                <i class="icon el-icon-minus cursor__pointer" @click="deleteCar(item.id)"></i>
                                <i class="icon icon__edit cursor__pointer" @click="editCarELe(item)"></i>
                              </div>
                            </li>
                          </ul>
                          <el-form :model="carEdit"
                                   :rules="carRule"
                                   :ref="'carEditForm' + index"
                                   class="demo-form-inline" label-position="top" v-show="item.showFormEle"
                                   :disabled="isDetail"
                                   >
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
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  :editable="false"
                                  placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="" prop="dueDate" class="table__form-item">
                                <el-date-picker
                                  v-model="carEdit.dueDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  :editable="false"
                                  placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="" prop="firstRepaymentDate" class="table__form-item">
                                <el-date-picker
                                  v-model="carEdit.firstRepaymentDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  :editable="false"
                                  placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item label="" prop="loanStatusCode" class="table__form-item">
                                <el-select v-model="carEdit.loanStatusCode" placeholder="请选择" @change="clearCarDate">
                                  <el-option
                                    v-for="item in carLoanStatusCodeLibrary"
                                    :key="item.itemCode"
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
                                  :disabled="!(carEdit.loanStatusCode === '20')"
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
                              <div class="operate-box text__center" v-if="!isDetail">
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
                                <el-input v-model="carEdit.loanAmt" maxlength="20"></el-input>
                              </el-form-item>
                              <el-form-item  prop="loanDate" class="table__form-item">
                                <el-date-picker
                                  v-model="carEdit.loanDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  :editable="false"
                                  placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item  prop="dueDate" class="table__form-item">
                                <el-date-picker
                                  v-model="carEdit.dueDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  :editable="false"
                                  placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item  prop="firstRepaymentDate" class="table__form-item">
                                <el-date-picker
                                  v-model="carEdit.firstRepaymentDate"
                                  type="date"
                                  format="yyyy/MM/dd"
                                  value-format="timestamp"
                                  :editable="false"
                                  placeholder="选择日期">
                                </el-date-picker>
                              </el-form-item>
                              <el-form-item  prop="loanStatusCode" class="table__form-item">
                                <el-select v-model="carEdit.loanStatusCode" placeholder="请选择" @change="clearCarDate">
                                  <el-option
                                    v-for="item in carLoanStatusCodeLibrary"
                                    :key="item.itemCode"
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
                                  :disabled="!(carEdit.loanStatusCode === '20')"
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
            <li class="item">
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
                    class="demo-form-inline" label-position="top">
                      <div class="tax_box">
                        <el-form-item label="税务数据接入机构" class="width245" required prop="tlTaxOrganizationId">
                          <el-select v-model="organizationTax.tlTaxOrganizationId"
                            placeholder="请选择" :disabled="!!isDetail"
                            @change="taxAgencyChange">
                            <el-option
                              v-for="(item, index) in taxAgencyList"
                              :key="index"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="纳税人识别码" prop="taxpayerNum" class="width245" required>
                          <el-input v-model="organizationTax.taxpayerNum" disabled></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-button size="small" class="query_btn query_auth" @click="queryAuthorizationInfo" :disabled="queryImpowerBtnStatus || impowerFlag">查询授权结果</el-button>
                          <el-button size="small" type="primary" :disabled="queryTax || queryImpowerBtnStatus"
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
                            <el-switch v-model="organizationTax.notPayUpTaxInd" :width=50></el-switch>
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
        <div class="dialog-box__middle-form" v-if="isPro1 || isPro2 || cardInfoList.length > 0">
          <div class="form__block bg__white border__radius-5" v-if="isPro1 || cardInfoList.length > 0">
            <div class="dialog-box__middle-top" v-if="Object.keys(orgSpecialInfo[0]).length !== 0">
              <h5 class="title"><span class="icon icon__gan"></span>特殊字段产品1</h5>
            </div>
            <div class="dialog-box__form__group margin-top__20">
              <el-form :model="orgSpecialInfo[0]"
                v-if="isPro1"
                :rules="orgSpecialInfoRule0"
                ref="orgSpecialInfoForm0"
                label-width="100px"
                class="demo-form-inline" label-position="top"
                :disabled="isDetail">
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
                <el-form-item label="贷款期限" prop="loanTerm" class="el-form-item__25">
                  <el-select v-model="orgSpecialInfo[0].loanTerm" v-if="orgSpecialInfoArr.length > 0" placeholder="请选择贷款期限" @change="orgSpecialInfoChange('loanTerm', orgSpecialInfo[0].loanTerm)">
                    <el-option v-for="item in orgSpecialInfoArr[0].loanTerms" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                  <div v-else>没数据，请检查</div>
                </el-form-item>
                <el-form-item label="贷款用途性质" prop="loanPurposeType" class="el-form-item__25" >
                  <el-select v-model="orgSpecialInfo[0].loanPurposeType" placeholder="请选择贷款用途性质" @change="orgSpecialInfoChange('loanPurposeType', orgSpecialInfo[0].loanPurposeType)">
                    <el-option v-for="item in loanPurposeTypes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <!-- 码表更改 -->
                <el-form-item label="贷款用途" prop="loanPurposeCode" class="el-form-item__25">
                  <el-select v-model="orgSpecialInfo[0].loanPurposeCode" v-if="orgSpecialInfoArr.length > 0" placeholder="请选择贷款用途" @change="orgSpecialInfoChange('loanPurposeCode', orgSpecialInfo[0].loanPurposeCode)">
                    <el-option v-for="item in orgSpecialInfoArr[0].loanPurposeCodes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                  <div v-else>没数据，请检查</div>
                </el-form-item>
                <el-form-item label="其他贷款用途说明" prop="loanOtherPurpose" class="el-form-item__25">
                  <el-input
                    maxlength="10"
                    :disabled="orgSpecialInfo[0].loanPurposeCode !== dCode.loanPurposeCode.other || orgSpecialInfo[0].loanPurposeType !== dCode.loanPurposeType.consumption"
                    v-model="orgSpecialInfo[0].loanOtherPurpose"
                    placeholder="请填写其他贷款用途说明" @blur="orgSpecialInfoChange('loanOtherPurpose', orgSpecialInfo[0].loanOtherPurpose)"></el-input>
                </el-form-item>
                <el-form-item label="还款周期" prop="repaymentCycleCode" class="el-form-item__25">
                  <el-select v-model="orgSpecialInfo[0].repaymentCycleCode" placeholder="请选择还款周期" @change="orgSpecialInfoChange('repaymentCycleCode', orgSpecialInfo[0].repaymentCycleCode)">
                    <el-option v-for="item in repaymentCycleCodes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="还款方式" prop="repaymentModeCode" class="el-form-item__25">
                  <el-select v-model="orgSpecialInfo[0].repaymentModeCode" placeholder="请选择还款方式" @change="orgSpecialInfoChange('repaymentModeCode', orgSpecialInfo[0].repaymentModeCode)">
                    <el-option v-for="item in repaymentModeCodes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
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
                :isDetail="isDetail"
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
                  :disabled="isDetail"
                  >
                  <div class="dialog-box__form__group">
                    <el-form-item label="支付方式" prop="paymentModeCode" class="el-form-item__33" >
                      <el-select
                        v-model="cardInfoList[0].paymentModeCode"
                        placeholder="请选择支付方式"
                        @change="changePaymentMode(0)"
                        >
                        <el-option
                          v-for="(item, index) in paymentModeCodeLibrary"
                          :key="index"
                          :label="item.itemDesc"
                          :value="item.itemCode"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="收款账户名称" prop="accountName" class="el-form-item__33" >
                      <el-input
                        maxlength="30"
                        v-model="cardInfoList[0].accountName"
                        placeholder="请填写收款账户户名"
                        :disabled="cardInfoList[0].paymentModeCode === cardInfoList[0].paymentModeCodeOrigin && cardInfoList[0].validatedInd"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="收款卡号/账户" prop="accountNum" class="el-form-item__33" >
                      <el-input
                        maxlength="20"
                        @change="changeAccountNum(0)"
                        v-model="cardInfoList[0].accountNum"
                        placeholder="请填写收款卡号/账户"
                        :disabled="cardInfoList[0].paymentModeCode === cardInfoList[0].paymentModeCodeOrigin && cardInfoList[0].validatedInd"
                        ></el-input>
                    </el-form-item>
                    <div class="drop__select-box el-form-item__33">
                      <p class="lab"><span class="icon icon__star">*</span>开户行</p>
                      <button class="button__wrap"
                              type="button"
                              @click="cardInfoList[0].dropSelectShow = !cardInfoList[0].dropSelectShow"
                              :disabled="isDetail"
                              :class="{isactive: cardInfoList[0].dropSelectShow}"> {{cardInfoList[0].subbankName? cardInfoList[0].subbankName: '请选择开户行'}} <i class="icon el-select__caret el-input__icon el-icon-arrow-up"></i> </button>
                      <transition name="el-zoom-in-top">
                        <div class="wrap table__wrap-max" v-show="cardInfoList[0].dropSelectShow" @click="currentIndex = 0">
                          <el-form :model="cardInfoList[0].bankInfo"
                                    ref="bankForm0"
                                    :rules="bankRule"
                                    label-width="100px"
                                    class="demo-form-inline" label-position="top" >
                            <el-form-item
                              prop="bankName"
                              style="margin-right:10px">
                              <el-input placeholder="输入银行名称" v-model.trim="cardInfoList[0].bankInfo.bankName"></el-input>
                            </el-form-item>
                            <el-form-item
                              prop="cityName"
                              style="margin-right:10px">
                              <el-input placeholder="输入城市" v-model.trim="cardInfoList[0].bankInfo.cityName"></el-input>
                            </el-form-item>
                            <el-button type="primary" class="button button__blue width100" @click="queryBank(0)">查询</el-button>
                          </el-form>
                          <el-table
                            :data="cardInfoList[0].bankInfo.bankList"
                            height="200"
                            border
                            highlight-current-row
                            style="width: 100%"
                            cell-class-name="dialog__table__td"
                            header-cell-class-name="dialog__table__th"
                            @row-click="selectedBank"
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
                          <pagination :page="{currentPage: cardInfoList[0].bankInfo.pageNum,account:  cardInfoList[0].bankInfo.total,pageSize: cardInfoList[0].bankInfo.pageSize,showJumpButton: false}" style="margin-top: 10px" @jump-page="jump"></pagination>
                        </div>
                      </transition>
                    </div>
                    <el-form-item label="收款行名称" prop="bankName" class="el-form-item__33" >
                      <el-input
                        readonly
                        v-model="cardInfoList[0].bankName"
                        placeholder="请填写收款行名称"></el-input>
                    </el-form-item>
                    <el-form-item label="开户行行号" prop="subbankCode" class="el-form-item__33">
                      <el-input
                        readonly
                        v-model="cardInfoList[0].subbankCode"
                        placeholder="请填写开户行行号"></el-input>
                    </el-form-item>
                    <el-form-item label="预留手机号" prop="mobileNum" class="el-form-item__33">
                      <el-input
                        v-model="cardInfoList[0].mobileNum"
                        placeholder="请填写预留手机号"
                        :disabled="cardInfoList[0].paymentModeCode === cardInfoList[0].paymentModeCodeOrigin && cardInfoList[0].validatedInd"
                        ></el-input>
                    </el-form-item>
                    <el-form-item  class="el-form-item__33" style="margin-top: 25px;" v-if="!cardInfoList[0].validatedInd || (cardInfoList[0].paymentModeCode !== cardInfoList[0].paymentModeCodeOrigin && !isDetail)">
                      <el-button class="width100 button-default" :loading="checkLoading" @click="checkBank(0)">验证</el-button>
                    </el-form-item>
                  </div>
                </el-form>
              </div>
            </div>
          </div>
          <div class="form__block bg__white border__radius-5" v-if="(isPro2 || cardInfoList.length > 1) && !isXiuwen">
            <div class="dialog-box__middle-top" v-if="isPro2">
              <h5 class="title"><span class="icon icon__gan"></span>特殊字段产品2</h5>
            </div>
            <div class="dialog-box__form__group margin-top__20">
              <el-form :model="orgSpecialInfo[1]"
                v-if="isPro2"
                :rules="orgSpecialInfoRule1"
                ref="orgSpecialInfoForm1"
                label-width="100px"
                class="demo-form-inline" label-position="top"
                :disabled="isDetail">
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
                <el-form-item label="贷款期限" prop="loanTerm" class="el-form-item__25">
                  <el-select v-model="orgSpecialInfo[1].loanTerm" v-if="orgSpecialInfoArr.length > 1" placeholder="请选择贷款期限" @change="orgSpecialInfoChange('loanTerm', orgSpecialInfo[1].loanTerm)">
                    <el-option v-for="item in orgSpecialInfoArr[1].loanTerms" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                  <div v-else>没数据，请检查</div>
                </el-form-item>
                <el-form-item label="贷款用途性质" prop="loanPurposeType" class="el-form-item__25" >
                  <el-select v-model="orgSpecialInfo[1].loanPurposeType" placeholder="请选择贷款用途性质" @change="orgSpecialInfoChange('loanPurposeType', orgSpecialInfo[1].loanPurposeType)">
                    <el-option v-for="item in loanPurposeTypes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <!-- 码表更改 -->
                <el-form-item label="贷款用途" prop="loanPurposeCode" class="el-form-item__25">
                  <el-select v-model="orgSpecialInfo[1].loanPurposeCode" v-if="orgSpecialInfoArr.length > 1" placeholder="请选择贷款用途" @change="orgSpecialInfoChange('loanPurposeCode', orgSpecialInfo[1].loanPurposeCode)">
                    <el-option v-for="item in orgSpecialInfoArr[1].loanPurposeCodes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                  <div v-else>没数据，请检查</div>
                </el-form-item>
                <el-form-item label="其他贷款用途说明" prop="loanOtherPurpose" class="el-form-item__25">
                  <el-input
                    maxlength="10"
                    :disabled="orgSpecialInfo[1].loanPurposeCode !== dCode.loanPurposeCode.other || orgSpecialInfo[1].loanPurposeType !== dCode.loanPurposeType.consumption"
                    v-model="orgSpecialInfo[1].loanOtherPurpose"
                    placeholder="请填写其他贷款用途说明" @blur="orgSpecialInfoChange('loanOtherPurpose', orgSpecialInfo[1].loanOtherPurpose)"></el-input>
                </el-form-item>
                <el-form-item label="还款周期" prop="repaymentCycleCode" class="el-form-item__25">
                  <el-select v-model="orgSpecialInfo[1].repaymentCycleCode" placeholder="请选择还款周期" @change="orgSpecialInfoChange('repaymentCycleCode', orgSpecialInfo[1].repaymentCycleCode)">
                    <el-option v-for="item in repaymentCycleCodes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="还款方式" prop="repaymentModeCode" class="el-form-item__25">
                  <el-select v-model="orgSpecialInfo[1].repaymentModeCode" placeholder="请选择还款方式" @change="orgSpecialInfoChange('repaymentModeCode', orgSpecialInfo[1].repaymentModeCode)">
                    <el-option v-for="item in repaymentModeCodes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
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
                :isDetail="isDetail"
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
                  :disabled="isDetail"
                  >
                  <div class="dialog-box__form__group">
                    <el-form-item label="支付方式" prop="paymentModeCode" class="el-form-item__33" >
                      <el-select
                        v-model="cardInfoList[1].paymentModeCode"
                        placeholder="请选择支付方式"
                        @change="changePaymentMode(1)"
                        >
                        <el-option
                          v-for="(item, index) in paymentModeCodeLibrary"
                          :key="index"
                          :label="item.itemDesc"
                          :value="item.itemCode"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="收款账户名称" prop="accountName" class="el-form-item__33" >
                      <el-input
                        maxlength="30"
                        v-model="cardInfoList[1].accountName"
                        placeholder="请填写收款账户户名"
                        :disabled="cardInfoList[1].paymentModeCode === cardInfoList[1].paymentModeCodeOrigin && cardInfoList[1].validatedInd"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="收款卡号/账户" prop="accountNum" class="el-form-item__33" >
                      <el-input
                        maxlength="20"
                        @change="changeAccountNum(1)"
                        v-model="cardInfoList[1].accountNum"
                        placeholder="请填写收款卡号/账户"
                        :disabled="cardInfoList[1].paymentModeCode === cardInfoList[1].paymentModeCodeOrigin && cardInfoList[1].validatedInd"
                        ></el-input>
                    </el-form-item>
                    <div class="drop__select-box el-form-item__33">
                      <p class="lab"><span class="icon icon__star">*</span>开户行</p>
                      <button class="button__wrap"
                              type="button"
                              @click="cardInfoList[1].dropSelectShow = !cardInfoList[1].dropSelectShow"
                              :disabled="isDetail"
                              :class="{isactive: cardInfoList[1].dropSelectShow}"> {{cardInfoList[1].subbankName? cardInfoList[1].subbankName: '请选择开户行'}} <i class="icon el-select__caret el-input__icon el-icon-arrow-up"></i> </button>
                      <transition name="el-zoom-in-top">
                        <div class="wrap table__wrap-max" v-show="cardInfoList[1].dropSelectShow" @click="currentIndex = 1">
                          <el-form :model="cardInfoList[1].bankInfo"
                                    ref="bankForm1"
                                    :rules="bankRule"
                                    label-width="100px"
                                    class="demo-form-inline" label-position="top" >
                            <el-form-item
                              prop="bankName"
                              style="margin-right:10px">
                              <el-input placeholder="输入银行名称" v-model.trim="cardInfoList[1].bankInfo.bankName"></el-input>
                            </el-form-item>
                            <el-form-item
                              prop="cityName"
                              style="margin-right:10px">
                              <el-input placeholder="输入城市" v-model.trim="cardInfoList[1].bankInfo.cityName"></el-input>
                            </el-form-item>
                            <el-button type="primary" class="button button__blue width100" @click="queryBank(1)">查询</el-button>
                          </el-form>
                          <el-table
                            :data="cardInfoList[1].bankInfo.bankList"
                            height="200"
                            border
                            highlight-current-row
                            style="width: 100%"
                            cell-class-name="dialog__table__td"
                            header-cell-class-name="dialog__table__th"
                            @row-click="selectedBank"
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
                          <pagination :page="{currentPage: cardInfoList[1].bankInfo.pageNum,account:  cardInfoList[1].bankInfo.total,pageSize: cardInfoList[1].bankInfo.pageSize,showJumpButton: false}" style="margin-top: 10px" @jump-page="jump"></pagination>
                        </div>
                      </transition>
                    </div>
                    <el-form-item label="收款行名称" prop="bankName" class="el-form-item__33" >
                      <el-input
                        readonly
                        v-model="cardInfoList[1].bankName"
                        placeholder="请填写收款行名称"></el-input>
                    </el-form-item>
                    <el-form-item label="开户行行号" prop="subbankCode" class="el-form-item__33">
                      <el-input
                        readonly
                        v-model="cardInfoList[1].subbankCode"
                        placeholder="请填写开户行行号"></el-input>
                    </el-form-item>
                    <el-form-item label="预留手机号" prop="mobileNum" class="el-form-item__33">
                      <el-input
                        v-model="cardInfoList[1].mobileNum"
                        placeholder="请填写预留手机号"
                        :disabled="cardInfoList[1].paymentModeCode === cardInfoList[1].paymentModeCodeOrigin && cardInfoList[1].validatedInd"
                        ></el-input>
                    </el-form-item>
                    <el-form-item  class="el-form-item__33" style="margin-top: 25px;" v-if="!cardInfoList[1].validatedInd || (cardInfoList[1].paymentModeCode !== cardInfoList[1].paymentModeCodeOrigin && !isDetail)">
                      <el-button class="width100 button-default" :loading="checkLoading" @click="checkBank(1)">验证</el-button>
                    </el-form-item>
                  </div>
                </el-form>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    <div class="form__bottom clearfix fixed-save" v-if="!isDetail">
      <el-button
        @click="submitCustomer"
        class="width100 button-default">保存</el-button>
    </div>
    <transition name="fade">
      <add-guarantor
        v-if="openAddGuarantorDg"
        :isDetail="isDetail"
        @close="closeGuarantor"
        :application-id="applicationId"
        :house-id-list="enableHouseIdList"
        :house-id="guarantorHouseId"
        :guarantor-id="guarantorId"
      ></add-guarantor>
    </transition>
    <transition name="fade">
      <house-message
        v-if="openHouseMessageDg"
        :isDetail="isDetail"
        @close="closeHouseMessage"
        :house-id="houseId"
        :house-id-list="houseIdList"
        :areaList="options"
        :application-id="applicationId"></house-message>
    </transition>
    <transition name="fade">
      <customer-tax-info
        v-if="openTaxInfoDg"
        @close="closeCustomerTaxInfo"
        :taxPayerNum="organizationTax.taxpayerNum" class="face2face_tax"></customer-tax-info>
    </transition>
  </div>
</template>

<script>
import { baseApi } from "../../js/server.js";
import myRules from "@common/js/rules.js";
import addGuarantor from "./add_guarantor";
import houseMessage from "./house_message";
import customerTaxInfo from '@system/spare/solving/complete_info/complete-product/customer_tax_info';
import specialForm from "./special_form";
import pagination from "@components/pagination";
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
      houseClass: {}, // 房屋性质字典
      carLoanStatusCodeLibrary: [], // 贷款状态字典
      certificate_type_codes: [], // 证件类型字典
      certificateClass: {},

      loading: null, // 加载中
      isSubmit: false, // 是否是点击提交面核

      pricingList: [], // 风险定价信息
      // 地区列表
      options: [],
      custId: '',
      reportSourceCodes: [], // 征信报告来源字典
      organizationTaxInd: false,
      organizationTax: {
        notPayUpTaxInd: false
      },
      saveStatus: false,
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
      openAddGuarantorDg: false,
      TabActiveName: "first",
      // 保险表格数据
      policyList: [],
      policyEdit: {
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
      },
      policyCurrentEdit: {}, // 当前正被编辑保险项
      policyEditDg: false,
      policyRule: {
        insuranceCompanyCode: [
          { required: true, message: "请填写寿险公司名称", trigger: "change" }
        ],
        mainRiskName: [
          { required: true, message: "请填写主险名称", trigger: "blur" },
          { max: 20, message: "长度不超过20个字符", trigger: "blur" }
        ],
        policyNum: [
          { required: true, message: "请填写保单号", trigger: "blur" },
          { validator: this.checkPolicyNum, trigger: "blur" }
        ],
        effectiveDate: [
          { required: true, message: "请选择生效日期", trigger: "blur" }
        ],
        policyStatusInd: [
          { required: true, message: "请选择保单状态", trigger: "change" }
        ],
        paymentModeCode: [
          { required: true, message: "请选择缴费方式", trigger: "change" }
        ],
        premiumCycleAmt: [
          { required: true, message: '请填写期缴保费', trigger: 'blur' },
          { validator: myRules.numTwoBit, trigger: 'blur' },
          {validator: this.eightBitRule, trigger: 'blur'}
        ],
        premiumTimesCnt: [
          { required: true, message: "请填写缴费次数", trigger: "blur" },
          { validator: myRules.nonNegative4, trigger: 'blur' }
        ]
      },
      policyCompanyList: [],

      // 车供表格数据
      carList: [],
      carEdit: {},
      carCurrentEdit: {},
      carEditDg: false,
      carRule: {
        bankCode: [
          { required: true, message: '请填写贷款发放银行', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            const valReg = /^[\u4E00-\u9FA5\uf900-\ufa2d]+$/gi;
            if (!valReg.test(value) && !!value) {
              return callback(new Error('只能输入中文'));
            } else {
              callback();
            }
          },
            trigger: 'blur' }
        ],
        loanAmt: [
          { required: true, message: "请填写贷款发放金额", trigger: "blur" },
          { validator: myRules.nonNegative, trigger: "blur" }
        ],
        date: [{ required: true, message: "请选择日期", trigger: "blur" }],
        loanStatusCode: [
          { required: true, message: "请选择贷款状态", trigger: "blur" }
        ],
        monthlyRepaymentAmt: [
          { required: true, message: "请填写贷款月还金额", trigger: "blur" },
          { validator: myRules.nonNegative, trigger: 'blur' }
        ],
        loanDate: [{ required: true, message: "请选择日期", trigger: "blur" }],
        dueDate: [{ required: true, message: "请选择日期", trigger: "blur" }],
        settlementDate: [
          {
            validator: (rule, value, callback) => {
              if (this.carEdit.loanStatusCode === "20" && !value) {
                return callback(new Error("请选择贷款结清日期!"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        firstRepaymentDate: [
          { required: true, message: "请选择日期", trigger: "blur" }
        ]
      },

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
          { validator: this.checkMostNum, trigger: "blur" },
          { validator: myRules.nonNegative, trigger: "blur" }
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
      enableHouseIdList: [], // 可被选中的房产证号
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
          { validator: this.checkloanPurposeType0, trigger: "change" }
        ],
        loanPurposeCode: [
          { validator: this.checkLoanPurpose0, trigger: "change" }
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
          { validator: this.checkloanPurposeType1, trigger: "change" }
        ],
        loanPurposeCode: [
          { validator: this.checkLoanPurpose1, trigger: "change" }
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
        { required: true, message: "请填写账户名", trigger: "blur" }
      ],
      accountNum: [
        { required: true, message: "请填写收款卡号/账户", trigger: "blur" }
      ],
      bankName: [
        { required: true, message: "选择开户行后自动带出", trigger: "blur" }
      ],
      subbankCode: [
        { required: true, message: "选择开户行后自动带出", trigger: "blur" }
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

    this.getCreditLevelList();

    this.loading = this.$loading({
      text: "",
      spinner: "",
      background: 'transparent'
    });

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
      this.submitCustomer();
      this.isSubmit = true;
    });
  },
  methods: {
    changePaymentMode(type) {
        this.cardInfoList[type].accountName = JSON.parse(this.cardInfoListOrigin)[type].accountName;
        this.cardInfoList[type].accountNum = JSON.parse(this.cardInfoListOrigin)[type].accountNum;
        this.cardInfoList[type].mobileNum = JSON.parse(this.cardInfoListOrigin)[type].mobileNum;
        this.$refs['bankInfoForm' + type].clearValidate(['accountName', 'accountNum', 'mobileNum']);
    },
    getTaxAgencyList() {
      return new Promise((resolve, reject) => {
        this.$MyFetch.get(baseApi.taxConfig.careerworkOrganizationList, {
          applicationId: this.applicationId
        }).then((_data) => {
            if (this.$lodash.isEmpty(_data) && !this.isSubmit) {
              this.confirmFn('客户单位地址所在省市无有效税务数据接入机构，请重新配置', 'error');
            }
            this.$lodash.each(_data, (_e, _i) => {
              _e.value = _e.tlTaxOrganizationId;
              _e.label = _e.tlTaxOrganizationName;
            });
            resolve(_data);
          }).catch((_erro) => {
            reject(_erro);
            this.$error('获取税务数据接入机构失败');
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
        if (!this.isDetail) {
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
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' },
        { value: 'C', label: 'C' },
        { value: 'D', label: 'D' },
        { value: 'M', label: 'M' },
        { value: 'N/A', label: '暂无评级' }
      ];
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
    checkTaxInfo() {
      this.openTaxInfoDg = true;
      this.$store.dispatch('setNum', this.applicationId);
    },
    closeCustomerTaxInfo() {
      this.openTaxInfoDg = false;
    },
    // 获取全部数据
    getAllInfo() {
      // this.applicationId = "RL20190227000053";

      this.getCreditInfo(); // 信用信息
      this.getPricingInfo(); // 风险信息
      this.getPolicyList(); // 保单信息
      this.getHouseList(); // 房产信息;
      this.getCarList(); // 车供信息
      this.getorganizationTax(); // 税务贷信息
      this.getBankInfo() // 收款账户信息
        .then(() => {
          this.getSpecialInfo(); // 特殊字段产品
        })
        .catch((e) => {
          console.log(e);
          this.loading.close();
        });

      // 获取信用报告来源字典
      this.$getDictCode("report_source_code", {getAll: this.isDetail}).then(res => {
        this.reportSourceCodes = res;
      });

      // 获取保险公司字典
      this.$getDictCode('insurance_company', {getAll: this.isDetail})
        .then(data => {
          this.policyCompanyList = [...data];
        }).catch(err => {
          this.confirmFn(err.message, 'error');
        });

      // 获取缴费方式字典
      this.$getDictCode("ins_payment_mode_code", {getAll: this.isDetail}).then(res => {
        this.insPaymentModeCodeLibrary = res;
        res.forEach(v => {
          this.$set(this.insPaymentModeCodeClass, v.itemCode, v.itemDesc);
        });
      });
      // 获取支付方式字典
      this.$getDictCode("payment_mode_code", {getAll: this.isDetail}).then(data => {
        this.paymentModeCodeLibrary = data;
      });
      // 获取房屋性质字典
      this.$getDictCode("estate_type_code", {getAll: this.isDetail}).then(res => {
        // this.houseClass = res;
        res.forEach((v) => {
          this.$set(this.houseClass, v.itemCode, v.itemDesc);
        });
      });
      // 获取贷款状态字典
      this.$getDictCode("car_loan_status_code", {getAll: this.isDetail}).then(res => {
        this.carLoanStatusCodeLibrary = res;
      });
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
      return this.$MyFetch
        .post(this.api.getBankCards + this.applicationId)
        .then(data => {
          data = data || {};
          let cards = [{}, {}];
          data.bankCardInfoList.forEach((item, index) => {
            item.paymentModeCodeOrigin = item.paymentModeCode;
            item.mobileNum = item.mobileNum || data.applicationMobileNum;
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
            if (item.sortNum === 1) {
              cards[0] = item;
            } else {
              cards[1] = item;
            }
          });
          this.cardInfoList = cards;
          // this.cardInfoList.splice(0, data.bankCardInfoList.length, ...data.bankCardInfoList);
          this.applicationMobileNum = data.applicationMobileNum;
          // console.log(this.cardInfoList);

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
      if (this.orgSpecialInfo[index].loanPurposeCode !== this.dCode.loanPurposeCode.other) {
        this.orgSpecialInfo[index].loanOtherPurpose = "";
      }
      this.$refs['orgSpecialInfoForm' + index].validateField('loanOtherPurpose');

      // if (this.orgSpecialInfo[index].loanPurposeType === this.dCode.loanPurposeType.consumption && !value) {
      if (!value) {
        callback(new Error("请选择贷款用途"));
      } else {
        callback();
      }
    },
    checkLoanPurpose1(rule, value, callback) {
      let index = 1;

      // 若不为贷款用途不为其他，则清空其他贷款用途说明
      if (this.orgSpecialInfo[index].loanPurposeCode !== this.dCode.loanPurposeCode.other) {
        this.orgSpecialInfo[index].loanOtherPurpose = "";
      }
      this.$refs['orgSpecialInfoForm' + index].validateField('loanOtherPurpose');

      // if (this.orgSpecialInfo[index].loanPurposeType === this.dCode.loanPurposeType.consumption && !value) {
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
        this.orgSpecialInfo[index].loanPurposeCode === this.dCode.loanPurposeCode.other && this.orgSpecialInfo[index].loanPurposeType === this.dCode.loanPurposeType.consumption && !value
      ) {
        callback(new Error("请填写其他贷款用途说明"));
      } else if (
        this.orgSpecialInfo[index].loanPurposeCode === this.dCode.loanPurposeCode.other && this.orgSpecialInfo[index].loanPurposeType === this.dCode.loanPurposeType.consumption && !valReg.test(value)
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
        this.orgSpecialInfo[index].loanPurposeCode === this.dCode.loanPurposeCode.other && this.orgSpecialInfo[index].loanPurposeType === this.dCode.loanPurposeType.consumption && !value
      ) {
        callback(new Error("请填写其他贷款用途说明"));
      } else if (
        this.orgSpecialInfo[index].loanPurposeCode === this.dCode.loanPurposeCode.other && this.orgSpecialInfo[index].loanPurposeType === this.dCode.loanPurposeType.consumption && !valReg.test(value)
      ) {
        callback(new Error("只能输入汉字"));
      } else {
        callback();
      }
    },
    // 修改产品1，产品2也同步修改，反之亦然
    orgSpecialInfoChange(key, value) {
      // console.log(key, value);
      // if (this.orgSpecialInfo.length > 1) {
      //   this.orgSpecialInfo[this.activeIndex === 0 ? 1 : 0][key] = value;
      // }
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
            this.filerTaxAgency(this.organizationTax);
          }
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    getSpecialInfo() {
      this.$MyFetch
        .get(this.api.getSpecialInfo + this.applicationId)
        .then(async (data) => {
          this.loading.close();
          data = data || [];
          /* if (data.length === 1) {
            this.cardInfoList = [{
              bankInfo: {}
            }];
          }
          if (data.length === 2) {
            this.cardInfoList = [{
              bankInfo: {}
            }, {
              bankInfo: {}
            }];
          } */
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
            this.orgSpecialInfoArr.splice(index, 1, {industryCodeLibrary, loanPurposeCodes, loanTerms, industryClass});
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
    submitCustomer() {
      let flag = true;

      // 信用信息检验
      this.$refs.creditInfoForm.validate(valid => {
        if (!valid) {
          flag = false;
        }
      });
      // 保单校验
      if (this.productInfo.insurancePolicyInd && this.policyList.length === 0) {
        this.confirmFn('请添加保单信息', 'error');
        return;
      }
      // 房产校验
      if (this.productInfo.estateInd && this.houseList.length === 0) {
        this.confirmFn('请添加房产信息', 'error');
        return;
      }
      // 车供校验
      if (this.productInfo.carLoanInd && (this.carList.length === 0)) {
        this.confirmFn('请添加信用卡车供信息', 'error');
        return;
      }
      // 企业税校验
      if (this.productInfo.organizationTaxInd && !this.checkFormValid('organizationTaxForm')) {
        this.confirmFn('请填写税务贷相关信息', 'error');
        return;
      }
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
      let orgSpecial = [...this.orgSpecialInfo];
      if (!this.isPro2) {
        orgSpecial.splice(1, 1);
      }
      if (!this.isPro1) {
        orgSpecial.splice(0, 1);
      }
      let data = {
        applicationId: this.applicationId,
        applicationSubmitAmt: this.creditInfo.applicationSubmitAmt,
        bankCardInfoList,
        carLoanInd: this.productInfo.carLoanInd,
        custId: this.custId,
        estateInd: this.productInfo.estateInd,
        insurancePolicyInd: this.productInfo.insurancePolicyInd,
        orgSpecial,
        organizationTaxInd: this.productInfo.organizationTaxInd,
        taxLoan: this.organizationTax
      };
      if (flag) {
        this.submitCustomerApi(data);
      } else {
        this.confirmFn("字段未填写完整", "error");
      }
    },
    submitCustomerApi(data) {
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
          if (this.isSubmit) {
            window.eventBus.$emit('remote_faceCheck_submitStopVideo');
            this.isSubmit = false;
          } else {
            this.confirmFn("保存成功！", "success");
            this.saveStatus = false;
          }

          this.$emit("next-step");

          // 保存之后还原修改数据
          this.creditInfoOrigin = JSON.stringify(this.creditInfo);
          this.productInfoOrigin = JSON.stringify(this.productInfo);
          this.orgSpecialInfoOrigin = JSON.stringify(this.orgSpecialInfo);
          this.cardInfoListOrigin = JSON.stringify(this.cardInfoList);
          // this.$emit("checkTabsFn", "product-info", {});
        })
        .catch(err => {
          loading.close();
          this.confirmFn(err.message, "error");
        });
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
    // 保单信息
    // 打开保险单新增
    openAddPolicy() {
      if (this.policyCurrentEdit.id) {
        this.confirmFn("请先完成正在编辑的表格", "error");
        return;
      }
      this.policyEdit = {
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
    getPolicyList() {
      this.$MyFetch
        .get(this.api.getInsuranceInfo + this.applicationId)
        .then((data) => {
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
          });
        })
        .catch(err => {
          console.error(err);
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
          this.getPolicyList();
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    deletePolicyApi(id) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .get(baseApi.completeProduct.deletePolicy + id)
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
    getCarList() {
      this.$MyFetch
        .get(this.api.getCarLoan + this.applicationId)
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
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
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
          this.getCarList();
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    deleteCarApi(id) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .get(baseApi.completeProduct.deleteCar + id)
          .then((data = {}) => {
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
      this.$refs.carAddForm.validate(valid => {
        if (valid) {
          this.carEdit.applicationId = this.applicationId;
          this.addCarApi(this.carEdit).then(() => {
            this.carEditDg = false;
            this.getCarList();
          });
        } else {
          console.error("不通过");
        }
      });
    },
    addCarApi(data) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .post(baseApi.completeProduct.addCar, data)
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            console.error(err);
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
      this.$refs[formName][0].validate(valid => {
        if (valid) {
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
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 车贷状态为正常时 结清日期清空
    clearCarDate() {
      if (this.carEdit.loanStatusCode === "10") {
        this.carEdit.settlementDate = "";
      }
    },
    // 房产信息
    // 获取房产客户信息列表
    getHouseList() {
      this.$MyFetch
        .get(this.api.getEstateInfo + this.applicationId)
        .then((data) => {
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
        })
        .catch(err => {
          console.error(err);
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
      // console.log("删除房产信息");
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
        })
        .catch(err => {
          console.error(err);
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
            .get(baseApi.completeProduct.deleteGuarantee + id)
            .then(() => {
              this.confirmFn("删除成功！", "success");
              this.getGuarantorList(this.applicationId);
            });
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 杂项
    changeHandler(value) {},

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
    // 选择表格中的开户行
    selectedBank(data) {
      let reg = /^([\s\S]*银行)/;
      let cardInfoList = this.cardInfoList[this.currentIndex];
      // console.log(cardInfoList);
      cardInfoList.bankName = data.parentBankName.match(reg)[1]; // 收款行名称
      cardInfoList.subbankName = data.bankName; // 开户行
      cardInfoList.subbankCode = data.bankCode; // 开户行行号
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
        productId: this.cardInfoList[index].productId
      };

      // console.log(this.$refs['bankInfoForm' + index]);
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
      // console.log(this.$refs[formName]);
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
      // console.log(this.currentIndex, pageNum);
      this.cardInfoList[this.currentIndex].bankInfo.pageNum = pageNum;
      this.queryBank(this.currentIndex);
    }
  },
  components: {
    addGuarantor,
    houseMessage,
    customerTaxInfo,
    specialForm,
    pagination
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
  computed: {
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
    },
    // 是否有修改过
    isCustomerUpdate() {
      return (
        JSON.stringify(this.creditInfo) === this.creditInfoOrigin &&
        JSON.stringify(this.productInfo) === this.productInfoOrigin &&
        JSON.stringify(this.orgSpecialInfo) === this.orgSpecialInfoOrigin &&
        JSON.stringify(this.cardInfoList) === this.cardInfoListOrigin
      );
    }
  },
  // 组件销毁时触发
 /*  destroyed() {
    // 离开组件时判断是否修改过，修改过就提醒需要保存才能离开，true为没有修改过，false为已修改过
    if (!this.isCustomerUpdate) {
      this.$emit("remote_checkTabsFn", "product-info", {
        customerInfo: this.customerInfo
      });
    }
  }, */
  // 导航离开时，判断数据是否更改，isCustomerUpdate为true则没有更改，反之更改了则不能跳转路由
  beforeRouteLeave(to, from, next) {
    // console.log(this.isCustomerUpdate);
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
  //box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
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
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
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
    position: relative;
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
