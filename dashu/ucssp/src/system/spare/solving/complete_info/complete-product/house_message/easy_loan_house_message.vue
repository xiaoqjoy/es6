<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title bg__white">房产基本信息</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="dialog-box__middle">
        <el-form
          :model="houseEdit"
          :rules="houseRule"
          ref="houseForm"
          label-width="100px"
          :disabled="!!hasSubmit"
          class="demo-form-inline"
          label-position="top"
        >
          <div class="form__block bg__white border__radius-5">
            <div class="dialog-box__middle-top">
              <h5 class="title">
                <span class="icon icon__gan"></span>房产基本信息
              </h5>
              <div class="isWhether" v-if="isValid">
                <span class="title font-weight">房贷是否有效</span>
                <el-form-item prop="incomeInd">
                  <el-switch
                    :width="50"
                    label-position="left"
                    v-model="houseEdit.incomeInd"
                    :disabled="!!hasSubmit"
                  ></el-switch>
                </el-form-item>
              </div>
            </div>
            <div class="dialog-box__form__group">
              <!-- 房产证号 -->
              <el-form-item :label="controlLabel.estateNum" prop="estateNum">
                <el-input @input="inputChange" v-model="houseEdit.estateNum" maxlength="50"></el-input>
              </el-form-item>
              <el-form-item :label="controlLabel.addressCode" prop="addressCode">
                <!-- <el-cascader
                  @change="inputChange"
                  :options="areaList"
                  v-model="houseEdit.addressCode">
                </el-cascader>-->
                <select-cascader
                  v-model="houseEdit.addressCode"
                  :options="areaList"
                  :disabled="!!hasSubmit"
                  @change="inputChange"
                ></select-cascader>
              </el-form-item>
              <el-form-item :label="controlLabel.addressDesc" prop="addressDesc">
                <el-input @input="inputChange" v-model="houseEdit.addressDesc" maxlength="100"></el-input>
              </el-form-item>
              <el-form-item :label="controlLabel.estateTypeCode" prop="estateTypeCode">
                <el-select
                  @change="inputChange"
                  v-model="houseEdit.estateTypeCode"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(item, index) in estateTypeCodeLibrary"
                    :key="index"
                    :label="item.itemDesc"
                    :value="item.itemCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="controlLabel.rentConditionCode" prop="rentConditionCode">
                <el-select
                  clearable
                  style="width: 100%"
                  v-model="houseEdit.rentConditionCode"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="items in rentCondition"
                    :key="items.itemCode"
                    :label="items.itemDesc"
                    :value="items.itemCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="controlLabel.obtainDate" prop="obtainDate">
                <el-date-picker
                  :editable="false"
                  v-model="houseEdit.obtainDate"
                  type="date"
                  format="yyyy/MM/dd"
                  value-format="timestamp"
                ></el-date-picker>
              </el-form-item>
              <el-form-item :label="controlLabel.completedDt" prop="completedDt">
                <el-date-picker
                  :editable="false"
                  v-model="houseEdit.completedDt"
                  type="year"
                  format="yyyy"
                  value-format="timestamp"
                ></el-date-picker>
              </el-form-item>
              <el-form-item :label="controlLabel.floor" prop="floor">
                <el-input v-model="houseEdit.floor" maxlength="4" show-word-limit></el-input>
              </el-form-item>
              <el-form-item :label="controlLabel.totalFloor" prop="totalFloor">
                <el-input v-model="houseEdit.totalFloor" maxlength="4" show-word-limit></el-input>
              </el-form-item>
              <el-form-item :label="controlLabel.coownersCnt" prop="coownersCnt">
                <el-select
                  @change="changeCoowner"
                  v-model="houseEdit.coownersCnt"
                  placeholder="请选择"
                >
                  <el-option :label="1" value="1"></el-option>
                  <el-option :label="2" value="2"></el-option>
                  <el-option :label="3" value="3"></el-option>
                  <el-option :label="4" value="4"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="controlLabel.propertySharePercent" prop="propertySharePercent">
                <el-input
                  v-model="houseEdit.propertySharePercent"
                  :readonly="houseEdit.coownersCnt === '1' || houseEdit.coownersCnt === 1"
                ></el-input>
              </el-form-item>
              <el-form-item :label="controlLabel.houseSizeMeas" prop="houseSizeMeas">
                <el-input
                  v-model="houseEdit.houseSizeMeas"
                  @blur="formatMoney('houseEdit', 'houseSizeMeas')"
                  maxlength="10"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="controlLabel.communityName"
                prop="communityName"
                v-if="isPlusLoan"
              >
                <el-input v-model="houseEdit.communityName" maxlength="100" show-word-limit></el-input>
              </el-form-item>
              <el-form-item :label="controlLabel.inputAverageAmt" prop="inputAverageAmt">
                <el-input v-model="houseEdit.inputAverageAmt"></el-input>
              </el-form-item>
              <el-form-item :label="controlLabel.slAverageAmt" prop="slAverageAmt">
                <el-input v-model="houseEdit.slAverageAmt" readonly></el-input>
              </el-form-item>
              <el-form-item
                :label="controlLabel.estateSourceCode"
                prop="estateSourceCode"
                v-if="isPlusLoan"
              >
                <el-select v-model="houseEdit.estateSourceCode">
                  <el-option
                    v-for="item in estateSourceCodeList"
                    :key="item.itemCode"
                    :label="item.itemDesc"
                    :value="item.itemCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- 加成贷新增内容 -->
              <el-form-item
                :label="controlLabel.bankEvaluationAmt"
                prop="bankEvaluationAmt"
                v-if="isPlusLoan"
              >
                <el-input v-model="houseEdit.bankEvaluationAmt"></el-input>
              </el-form-item>
              <el-form-item :label="controlLabel.incomeBase" prop="incomeBase" v-show="!isPlusLoan">
                <el-input v-model="houseEdit.incomeBase" readonly></el-input>
              </el-form-item>
              <!-- 房产总价 processFinishedInd-流程是否完结（true-已完结，false-未完结）  easyLoanInd，true就代表是东营优房贷及易贷业务 -->
              <el-form-item
                :label="controlLabel.totalPriceAmt"
                prop="totalPriceAmt"
                v-show="processFinish"
              >
                <el-input v-model="houseEdit.totalPriceAmt" readonly></el-input>
              </el-form-item>
            </div>
            <div class="dialog-box__form__group">
              <el-form-item :label="controlLabel.mortgageInd" prop="mortgageInd">
                <el-switch
                  v-model="houseEdit.mortgageInd"
                  :width="50"
                  active-text="是"
                  inactive-text="否"
                  :active-value="true"
                  :inactive-value="false"
                  @change="mortgageChange"
                ></el-switch>
              </el-form-item>
              <el-form-item :label="controlLabel.mortgageTypeCd" prop="mortgageTypeCd">
                <el-select
                  v-model="houseEdit.mortgageTypeCd"
                  placeholder="请选择"
                  :disabled="!houseEdit.mortgageInd"
                >
                  <el-option
                    v-for="item in mortgageTypeList"
                    :key="item.itemCode"
                    :label="item.itemDesc"
                    :value="item.itemCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!--  -->
              <el-form-item
                :label="controlLabel.pledgeTypeCd"
                prop="pledgeTypeCd"
                v-if="isPlusLoan"
              >
                <el-select
                  v-model="houseEdit.pledgeTypeCd"
                  :disabled="!houseEdit.mortgageInd"
                  @change="changePledgeType"
                >
                  <el-option
                    v-for="item in pledgeTypeCdList"
                    :key="item.itemCode"
                    :label="item.itemDesc"
                    :value="item.itemCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="controlLabel.orgType" prop="orgType">
                <el-select
                  v-model="houseEdit.orgType"
                  placeholder="请选择"
                  :disabled="!houseEdit.mortgageInd"
                >
                  <el-option
                    v-for="item in orgTypeList"
                    :key="item.itemCode"
                    :label="item.itemDesc"
                    :value="item.itemCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                :label="controlLabel.orgCode"
                prop="orgCode"
                v-if="!isPlusLoan || plusLoanType === '2'"
              >
                <el-select
                  filterable
                  v-model="houseEdit.orgCode"
                  placeholder="请选择"
                  :disabled="!houseEdit.mortgageInd"
                >
                  <el-option
                    v-for="item in jgcode_mortgage"
                    :key="item.itemCode"
                    :label="item.itemDesc"
                    :value="item.itemCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="controlLabel.repaymentCd" prop="repaymentCd">
                <el-select
                  clearable
                  style="width: 100%"
                  v-model="houseEdit.repaymentCd"
                  :disabled="!houseEdit.mortgageInd"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="items in repaymentCdList"
                    :key="items.itemCode"
                    :label="items.itemDesc"
                    :value="items.itemCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="controlLabel.mortgageBorrowerCd" prop="mortgageBorrowerCd">
                <el-select
                  v-model="houseEdit.mortgageBorrowerCd"
                  placeholder="请选择"
                  :disabled="!houseEdit.mortgageInd"
                >
                  <el-option
                    v-for="item in mortgageBorrowerList"
                    :key="item.itemCode"
                    :label="item.itemDesc"
                    :value="item.itemCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="controlLabel.creditAmt" prop="creditAmt">
                <el-input
                  v-model="houseEdit.creditAmt"
                  maxlength="8"
                  :disabled="!houseEdit.mortgageInd"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <div class="el-form-item el-form-item_wrap" v-if="isPlusLoan && plusLoanType === '2'">
                <el-form-item
                  :label="controlLabel.pledgeAmt"
                  prop="pledgeAmt"
                  v-if="isPlusLoan && plusLoanType === '2' && showPledgeAmt"
                >
                  <el-input v-model="houseEdit.pledgeAmt" maxlength="8" show-word-limit></el-input>
                </el-form-item>
              </div>
              <el-form-item :label="controlLabel.loanBalanceAmt" prop="loanBalanceAmt">
                <el-input
                  v-model="houseEdit.loanBalanceAmt"
                  maxlength="8"
                  :disabled="!houseEdit.mortgageInd"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="controlLabel.maxAmtMortgageInd"
                prop="maxAmtMortgageInd"
                v-if="!isPlusLoan"
              >
                <el-switch
                  v-model="houseEdit.maxAmtMortgageInd"
                  :width="50"
                  active-text="是"
                  inactive-text="否"
                  :active-value="true"
                  :inactive-value="false"
                  :disabled="!houseEdit.mortgageInd"
                  @change="maxAmtMortgageChange"
                ></el-switch>
              </el-form-item>
              <el-form-item
                :label="controlLabel.loanUtilizeTypeCd"
                prop="loanUtilizeTypeCd"
                v-if="!isPlusLoan"
              >
                <el-select
                  clearable
                  style="width: 100%"
                  v-model="houseEdit.loanUtilizeTypeCd"
                  :disabled="!houseEdit.maxAmtMortgageInd"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="items in loanUtilizeTypeCdList"
                    :key="items.itemCode"
                    :label="items.itemDesc"
                    :value="items.itemCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="controlLabel.pledgeAmt" prop="pledgeAmt" v-if="!isPlusLoan">
                <el-input
                  v-model="houseEdit.pledgeAmt"
                  maxlength="8"
                  :disabled="!houseEdit.mortgageInd || !houseEdit.maxAmtMortgageInd"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item :label="controlLabel.preStartedDt" prop="preStartedDt">
                <el-date-picker
                  :editable="false"
                  v-model="houseEdit.preStartedDt"
                  type="date"
                  :pickerOptions="year90ToToday"
                  @change="getTimeStart"
                  format="yyyy/MM/dd"
                  :disabled="!houseEdit.mortgageInd"
                  value-format="timestamp"
                ></el-date-picker>
              </el-form-item>
              <el-form-item :label="controlLabel.preEndDt" prop="preEndDt">
                <el-date-picker
                  :editable="false"
                  v-model="houseEdit.preEndDt"
                  type="date"
                  @change="getTimeEnd"
                  :pickerOptions="year90ToYear2100"
                  format="yyyy/MM/dd"
                  :disabled="!houseEdit.mortgageInd"
                  value-format="timestamp"
                ></el-date-picker>
              </el-form-item>
              <el-form-item
                :label="controlLabel.houseEvaluationAmt"
                prop="houseEvaluationAmt"
                v-if="!isPlusLoan"
              >
                <el-input
                  v-model="houseEdit.houseEvaluationAmt"
                  maxlength="8"
                  :disabled="!houseEdit.mortgageInd"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="controlLabel.houseEvaluationAmt"
                prop="houseEvaluationAmt"
                v-if="isPlusLoan && plusLoanType === '2'"
              >
                <el-input v-model="houseEdit.houseEvaluationAmt" maxlength="11" show-word-limit></el-input>
              </el-form-item>
            </div>
            <div class="dialog-box__form__group">
              <el-form-item :label="controlLabel.secondMortgageInd" prop="secondMortgageInd">
                <el-switch
                  v-model="houseEdit.secondMortgageInd"
                  :width="50"
                  active-text="是"
                  inactive-text="否"
                  :active-value="true"
                  :inactive-value="false"
                  @change="secondMortgageChange"
                ></el-switch>
              </el-form-item>
              <el-form-item
                :label="controlLabel.secondMortgageTypeCd"
                prop="secondMortgageTypeCd"
                v-if="plusLoanType !== '2'"
              >
                <el-select
                  v-model="houseEdit.secondMortgageTypeCd"
                  placeholder="请选择"
                  :disabled="!houseEdit.secondMortgageInd"
                >
                  <el-option
                    v-for="item in mortgageTypeList"
                    :key="item.itemCode"
                    :label="item.itemDesc"
                    :value="item.itemCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                :label="controlLabel.secondPledgeTypeCd"
                prop="secondPledgeTypeCd"
                v-if="plusLoanType !== '2'"
              >
                <el-select
                  v-model="houseEdit.secondPledgeTypeCd"
                  placeholder="请选择"
                  :disabled="!houseEdit.secondMortgageInd"
                >
                  <el-option
                    v-for="item in pledgeTypeCdList"
                    :key="item.itemCode"
                    :label="item.itemDesc"
                    :value="item.itemCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="controlLabel.secondOrgType" prop="secondOrgType">
                <el-select
                  v-model="houseEdit.secondOrgType"
                  placeholder="请选择"
                  :disabled="!houseEdit.secondMortgageInd"
                >
                  <el-option
                    v-for="item in secondeOrgTypeList"
                    :key="item.itemCode"
                    :label="item.itemDesc"
                    :value="item.itemCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                :label="controlLabel.secondOrgName"
                prop="secondOrgName"
                v-if="!isPlusLoan || plusLoanType === '2'"
              >
                <el-input
                  v-model="houseEdit.secondOrgName"
                  maxlength="50"
                  :disabled="!houseEdit.secondMortgageInd"
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="controlLabel.secondRepaymentCd"
                prop="secondRepaymentCd"
                v-if="isPlusLoan"
              >
                <el-select
                  v-model="houseEdit.secondRepaymentCd"
                  placeholder="请选择"
                  :disabled="!houseEdit.secondMortgageInd"
                >
                  <el-option
                    v-for="item in repaymentCdList"
                    :key="item.itemCode"
                    :label="item.itemDesc"
                    :value="item.itemCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                :label="controlLabel.secondMortgageBorrowerCd"
                prop="secondMortgageBorrowerCd"
                v-if="plusLoanType !== '2'"
              >
                <el-select
                  v-model="houseEdit.secondMortgageBorrowerCd"
                  placeholder="请选择"
                  :disabled="!houseEdit.secondMortgageInd"
                >
                  <el-option
                    v-for="item in mortgageBorrowerList"
                    :key="item.itemCode"
                    :label="item.itemDesc"
                    :value="item.itemCode"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item
                :label="controlLabel.secondCreditAmt"
                prop="secondCreditAmt"
                v-if="!isPlusLoan || plusLoanType === '2'"
              >
                <el-input
                  v-model="houseEdit.secondCreditAmt"
                  maxlength="8"
                  :disabled="!houseEdit.secondMortgageInd"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item
                :label="controlLabel.secondLoanBalanceAmt"
                prop="secondLoanBalanceAmt"
                v-if="!isPlusLoan || plusLoanType === '2'"
              >
                <el-input
                  v-model="houseEdit.secondLoanBalanceAmt"
                  maxlength="8"
                  :disabled="!houseEdit.secondMortgageInd"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <div class="form__block bg__white border__radius-5">
          <div class="dialog-box__middle-top">
            <h5 class="title">
              <span class="icon icon__gan"></span>共有人信息
            </h5>
          </div>
          <div class="dialog__table-box">
            <div class="dialog__table-form-box">
              <ul class="table__box">
                <li class="table__head">
                  <ul class="table__tr">
                    <li class="table__th">共有人产权姓名</li>
                    <li class="table__th">证件类型</li>
                    <li class="table__th width200">证件号</li>
                    <li class="table__th">共有人产权份额</li>
                    <li class="table__th" v-if="isPlusLoan">与借款人关系</li>
                    <li class="table__th">共有产权人联系方式</li>
                    <li class="table__th" v-if="!hasSubmit">操作</li>
                  </ul>
                </li>
                <li class="table__body" v-for="(item, index) in coownerList" :key="index">
                  <div class="table__tr">
                    <ul class="table__tr__top-list" v-show="!item.showEle">
                      <li class="table__td">{{item.coownerName}}</li>
                      <li
                        class="table__td"
                      >{{getLibraryValue(certificateLibrary, item.certificateTypeCode)}}</li>
                      <li class="table__td">{{item.certificateNum}}</li>
                      <li class="table__td">{{item.propertySharePercent}}%</li>
                      <li
                        class="table__td"
                        v-if="isPlusLoan"
                      >{{getLibValList(borrowerRelationshipCodeList, item.borrowerRelationshipCode)}}</li>
                      <li class="table__td">{{item.contactNum}}</li>
                      <li class="table__td" v-if="!hasSubmit">
                        <div class="operate-box">
                          <i
                            class="icon el-icon-plus cursor__pointer"
                            @click="openAddCoowner"
                            v-if="index === (coownerList.length -1)"
                          ></i>
                          <i
                            class="icon el-icon-minus cursor__pointer"
                            @click="deleteCoowner(index)"
                          ></i>
                          <i class="icon icon__edit cursor__pointer" @click="openEditEle(item)"></i>
                        </div>
                      </li>
                    </ul>
                    <el-form
                      :model="coownerEdit"
                      :rules="coownerRule"
                      :ref="'coownerEditForm' + index"
                      label-width="100px"
                      class="demo-form-inline"
                      label-position="top"
                    >
                      <div class="table__tr__bottom-list" v-show="item.showEle">
                        <!-- 共有人产权姓名 -->
                        <el-form-item prop="coownerName" class="table__form-item">
                          <el-input v-model="coownerEdit.coownerName" maxlength="30"></el-input>
                        </el-form-item>
                        <!-- 证件类型 -->
                        <el-form-item prop="certificateTypeCode" class="table__form-item">
                          <el-select v-model="coownerEdit.certificateTypeCode" placeholder="请选择">
                            <el-option
                              v-for="(item) in certificateTypeCodeLibrary"
                              :key="item.itemCode"
                              :value="item.itemCode"
                              :label="item.itemDesc"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <!-- 证件号 -->
                        <el-form-item
                          style="flex: 1 1 90px;"
                          prop="certificateNum"
                          class="table__form-item"
                        >
                          <el-input v-model="coownerEdit.certificateNum"></el-input>
                        </el-form-item>
                        <!-- 共有人产权份额 -->
                        <el-form-item prop="propertySharePercent" class="table__form-item">
                          <el-input v-model="coownerEdit.propertySharePercent"></el-input>
                        </el-form-item>
                        <!-- 与借款人关系 -->
                        <el-form-item
                          prop="borrowerRelationshipCode"
                          class="table__form-item"
                          v-if="isPlusLoan"
                        >
                          <el-select
                            v-model="coownerEdit.borrowerRelationshipCode"
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="(item) in borrowerRelationshipCodeList"
                              :key="item.itemCode"
                              :value="item.itemCode"
                              :label="item.itemDesc"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <!-- 共有产权人联系方式	 -->
                        <el-form-item prop="contactNum" class="table__form-item">
                          <el-input v-model="coownerEdit.contactNum"></el-input>
                        </el-form-item>
                        <!-- 操作 -->
                        <div class="operate-box text__center" v-if="!hasSubmit">
                          <i
                            class="icon el-icon-check cursor__pointer"
                            @click="saveCoownerEdit('coownerEditForm' + index, index)"
                          ></i>
                          <i
                            class="icon el-icon-minus cursor__pointer"
                            @click="closeCoownerEdit(item)"
                          ></i>
                        </div>
                      </div>
                    </el-form>
                  </div>
                </li>
                <li class="table__body" v-if="coownerAddDg || (coownerList.length === 0)">
                  <div class="table__tr">
                    <el-form
                      :model="coownerEdit"
                      :rules="coownerRule"
                      ref="coownerAddForm"
                      label-width="100px"
                      class="demo-form-inline"
                      label-position="top"
                    >
                      <div class="table__tr__bottom-list">
                        <!-- 共有人产权姓名 -->
                        <el-form-item prop="coownerName" class="table__form-item">
                          <el-input v-model="coownerEdit.coownerName" maxlength="30"></el-input>
                        </el-form-item>
                        <!-- 证件类型 -->
                        <el-form-item prop="certificateTypeCode" class="table__form-item">
                          <el-select v-model="coownerEdit.certificateTypeCode" placeholder="请选择">
                            <el-option
                              v-for="(item) in certificateTypeCodeLibrary"
                              :key="item.itemCode"
                              :value="item.itemCode"
                              :label="item.itemDesc"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <!-- 证件号 -->
                        <el-form-item
                          style="flex: 1 1 90px;"
                          prop="certificateNum"
                          class="table__form-item"
                        >
                          <el-input v-model="coownerEdit.certificateNum"></el-input>
                        </el-form-item>
                        <!-- 共有人产权份额 -->
                        <el-form-item prop="propertySharePercent" class="table__form-item">
                          <el-input v-model="coownerEdit.propertySharePercent"></el-input>
                        </el-form-item>
                        <!-- 与借款人关系 -->
                        <el-form-item
                          prop="borrowerRelationshipCode"
                          class="table__form-item"
                          v-if="isPlusLoan"
                        >
                          <el-select
                            v-model="coownerEdit.borrowerRelationshipCode"
                            placeholder="请选择"
                          >
                            <el-option
                              v-for="(item) in borrowerRelationshipCodeList"
                              :key="item.itemCode"
                              :value="item.itemCode"
                              :label="item.itemDesc"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <!-- 共有产权人联系方式	 -->
                        <el-form-item prop="contactNum" class="table__form-item">
                          <el-input v-model="coownerEdit.contactNum"></el-input>
                        </el-form-item>
                        <!-- 操作 -->
                        <div class="operate-box text__center" v-if="!hasSubmit">
                          <i class="icon el-icon-check cursor__pointer" @click="saveCoowner"></i>
                          <i class="icon el-icon-minus cursor__pointer" @click="closeAddCoowner"></i>
                        </div>
                      </div>
                    </el-form>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="form__bottom">
          <button
            type="button"
            @click="saveHouse(true)"
            class="width200 button__border-blue button"
            :disabled="!!hasSubmit"
          >保存</button>
          <button
            type="button"
            @click="querySl"
            class="width200 button__yellow button"
            :disabled="!!hasSubmit"
          >世联查询</button>
          <button
            type="button"
            @click="queryResultSl"
            class="width200 button__green button"
            :disabled="!!hasSubmit"
          >世联结果查询</button>
          <el-button
            type="primary"
            class="width200"
            @click="saveHouse(false)"
            :disabled="!!hasSubmit"
          >确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
// WARN: 易贷房产信息，和加成贷共用这个组件
import "@common/css/dialog";
import {
  controlLabel,
  PlusLoanLabelList,
  MulLibDefault,
  MulLibPlusLoan
} from "../../../../js/spareConfig.js";
import myRule from "@common/js/rules";
import { spareApi, easyLoan, pulsLoan } from "../../../../js/server.js";
export default {
  props: {
    houseId: {
      type: Number
    },
    areaList: {
      type: Array,
      default: () => []
    },
    applicationId: {
      type: String,
      default: () => ""
    },
    houseIdList: {
      type: Array,
      default: () => []
    },
    hasSubmit: {
      default: () => false
    },
    isValid: {
      type: Boolean,
      default: () => false
    },
    isPlusLoan: {
      type: Boolean,
      default: false // 调试用true，默认是false
    },
    processFinish: {
      type: Boolean,
      default: false
    },
    plusLoanType: {
      type: [String, Object],
      default: ""
    }
  },
  data() {
    return {
      // controlLabel: JSON.parse(JSON.stringify(controlLabel)),
      // controlLabel,
      // 默认是易贷接口
      totalAPI: easyLoan,
      borrowerRelationshipCodeList: [],
      loanUtilizeTypeCdList: [],
      secondMortgageTypeCdList: [],
      estateSourceCodeList: [],
      pledgeTypeCdList: [],
      orgTypeList: [],
      mortgageBorrowerList: [],
      mortgageTypeList: [],
      secondeOrgTypeList: [],
      // 证件类型字典
      certificateLibrary: {},
      houseCondition: [],
      rentCondition: [],
      repaymentCdList: [],
      certificateTypeCodeLibrary: [],
      // 住房性质
      estateTypeCodeLibrary: [],
      // 房产共有人字段
      options: [],
      jgcode_mortgage: [],
      coownerEdit: {
        certificateNum: null,
        certificateTypeCode: null
      },
      coownerList: [],
      coownerRule: {
        coownerName: [
          { required: true, message: "请填写共有人产权姓名", trigger: "blur" },
          { validator: myRule.nameRule, trigger: "blur" }
        ],
        certificateTypeCode: [
          { required: true, message: "请填选择证件类型", trigger: "change" }
        ],
        certificateNum: [{ validator: this.checkCard, trigger: "blur" }],
        propertySharePercent: [
          { required: true, message: "请填写共有人产权份额", trigger: "blur" },
          { validator: myRule.percentTwoBitRule, trigger: "blur" }
        ],
        borrowerRelationshipCode: [
          { required: true, message: "请与借款人关系", trigger: "blur" }
        ],
        contactNum: [
          {
            required: true,
            message: "请填写共有人产权联系方式",
            trigger: "blur"
          },
          { validator: myRule.phoneRule, trigger: "blur" }
        ]
      },
      coownerAddDg: false,
      // 房屋信息字段
      houseRule: {
        estateNum: [
          { required: true, message: "请填写房产证号", trigger: "blur" },
          { validator: this.checkHasExist, trigger: "blur" }
        ],
        addressCode: [
          { required: true, message: "请选择房产证地址", trigger: "change" }
        ],
        addressDesc: [
          { required: true, message: "请填写房产证详细地址", trigger: "blur" },
          { validator: myRule.addressRule, trigger: "blur" }
        ],
        estateTypeCode: [
          { required: true, message: "请选择房屋性质", trigger: "change" }
        ],
        obtainDate: [
          { required: true, message: "请选择房屋持有时间", trigger: "change" }
        ],
        propertySharePercent: [
          { required: true, message: "请填写共有人产权份额", trigger: "blur" },
          { validator: myRule.percentTwoBitRule, trigger: "blur" }
        ],
        houseSizeMeas: [
          { required: true, message: "请填写房屋面积", trigger: "blur" },
          { validator: myRule.numTwoBit, trigger: "blur" }
        ],
        coownersCnt: [
          { required: true, message: "请选择共有产权人数", trigger: "change" }
        ],
        inputAverageAmt: [
          /**
           * 加成贷新增内容 默认非必填
           */
          { required: false, message: "请填写人工录入均价", trigger: "blur" },
          { validator: myRule.numTwoBit, trigger: "blur" }
        ],
        completedDt: [
          { required: true, message: "请选择建成年代", trigger: "blur" }
        ],
        mortgageInd: [
          { required: true, message: "请选择是否在押", trigger: "blur" }
        ],
        mortgageTypeCd: [
          { required: false, message: "请选择一押类型", trigger: "change" }
        ],
        orgCode: [
          {
            required: false,
            message: "请选择一押抵押机构名称",
            trigger: "change"
          }
        ],
        orgType: [
          { required: false, message: "请选择一押机构类型", trigger: "change" }
        ],
        creditAmt: [
          { required: false, message: "请填写一押授信金额", trigger: "blur" },
          { validator: myRule.nonNegative2, trigger: "blur" }
        ],
        loanBalanceAmt: [
          { required: false, message: "请填写一押贷款余额", trigger: "blur" },
          { validator: myRule.nonNegative2, trigger: "blur" }
        ],
        maxAmtMortgageInd: [
          { required: false, message: "请选择是否最高额抵押", trigger: "blur" }
        ],
        pledgeAmt: [
          { required: false, message: "请填写一押抵押金额", trigger: "blur" },
          { validator: myRule.nonNegative2, trigger: "blur" }
        ],
        loanUtilizeTypeCd: [
          { required: false, message: "请选择贷款发放方式", trigger: "change" }
        ],
        mortgageBorrowerCd: [
          { required: false, message: "请选择一押借款人", trigger: "change" }
        ],
        preStartedDt: [
          { required: false, message: "请选择一押放款日期", trigger: "blur" }
        ],
        preEndDt: [
          {
            required: false,
            message: "请选择一押贷款到期日期",
            trigger: "blur"
          }
        ],
        repaymentCd: [
          { required: false, message: "请选择一押还款方式", trigger: "change" }
        ],
        houseEvaluationAmt: [
          { required: false, message: "请填写一押房产评估值", trigger: "blur" },
          { validator: myRule.nonNegative2, trigger: "blur" }
        ],
        secondOrgName: [
          { required: false, message: "请填写二押机构名称", trigger: "blur" }
        ],
        secondOrgType: [
          { required: false, message: "请选择二押机构类型", trigger: "change" }
        ],
        secondCreditAmt: [
          { required: false, message: "请填写二押授信金额", trigger: "blur" },
          { validator: myRule.nonNegative2, trigger: "blur" }
        ],
        rentConditionCode: [
          { required: true, message: "请选择房屋居住情况", trigger: "change" }
        ],
        secondLoanBalanceAmt: [
          { required: false, message: "请填写二押贷款余额", trigger: "blur" },
          { validator: myRule.nonNegative2, trigger: "blur" }
        ],
        // 加成贷校验
        estateSourceCode: [
          { required: true, message: "请选择房产来源", trigger: "change" }
        ],
        communityName: [
          { required: true, message: "请填写小区名称", trigger: "blur" }
        ],
        floor: [
          { required: true, message: "请填写所在楼层（层）", trigger: "blur" },
          { validator: myRule.nonNegative2, trigger: "blur" },
          { validator: this.floorValidate, trigger: "blur" }
        ],
        totalFloor: [
          {
            required: true,
            message: "请填写总楼层数（层））",
            trigger: "blur"
          },
          { validator: myRule.nonNegative2, trigger: "blur" },
          { validator: this.totalFloorValidate, trigger: "blur" }
        ],
        bankEvaluationAmt: [
          { required: true, message: "请填写银行评估价", trigger: "blur" },
          { validator: myRule.numTwoBitLengthLimit, trigger: "blur" }
        ],
        pledgeTypeCd: [
          { required: false, message: "请选择一押抵押方式", trigger: "change" }
        ],
        secondMortgageTypeCd: [
          { required: false, message: "请选择二押类型", trigger: "change" }
        ],
        secondPledgeTypeCd: [
          { required: false, message: "请选择二押抵押方式", trigger: "change" }
        ],
        secondRepaymentCd: [
          { required: false, message: "请选择二押还款方式", trigger: "change" }
        ],
        secondMortgageBorrowerCd: [
          { required: false, message: "请选择二押借款人", trigger: "change" }
        ]
      },
      houseEdit: {
        estateNum: "",
        addressCode: [],
        addressDesc: "",
        estateTypeCode: "",
        mortgageInd: false, // 是否在押
        incomeInd: true,
        propertySharePercent: "",
        coownersCnt: "",
        houseSizeMeas: "",
        inputAverageAmt: "",
        obtainDate: "",
        slAverageAmt: "",
        completedDt: "",
        mortgageTypeCd: "",
        orgCode: "",
        orgType: "",
        creditAmt: "",
        loanBalanceAmt: "",
        maxAmtMortgageInd: false,
        pledgeAmt: "",
        mortgageBorrowerCd: "",
        preStartedDt: "",
        preEndDt: "",
        houseEvaluationAmt: "",
        secondMortgageInd: false, // 是否二押
        secondOrgName: "",
        secondOrgType: "",
        secondCreditAmt: "",
        rentConditionCode: "",
        repaymentCd: "",
        secondLoanBalanceAmt: "",
        secondMortgageTypeCd: "",
        secondPledgeTypeCd: "",
        secondRepaymentCd: "",
        secondMortgageBorrowerCd: "",
        loanUtilizeTypeCd: ""
      },
      showPledgeAmt: false,
      currentEstateNum: "",
      dCode: this.$getCodeDependent(),
      currentHouseId: this.houseId,
      year90ToToday: {
        disabledDate(time) {
          let year90 = new Date("1990-01-01").getTime();
          let addOneYear = new Date().getTime() + 365 * 1 * 24 * 3600 * 1000;
          let timer = time.getTime();
          return timer < year90 - 8.64e7 || timer > addOneYear;
        }
      },
      year90ToYear2100: {
        disabledDate(time) {
          let year90 = new Date("1990-01-01").getTime();
          let year2100 = new Date("2100-01-01").getTime();
          let timer = time.getTime();
          return timer < year90 - 8.64e7 || timer > year2100 - 8.64e7;
        }
      }
    };
  },
  created() {
    if (this.isPlusLoan) {
      let form = { form: "houseForm", rule: "houseRule", model: "houseEdit" };
      this.totalAPI = pulsLoan;
      this.changeRequire(true, form, ["inputAverageAmt"]);
    }
    if (this.isPlusLoan && this.plusLoanType === "2") {
      this.modifyYouRule();
    }
    if (this.currentHouseId) {
      this.getHouseMessage(this.currentHouseId);
    }
    this.getMultipleLibrary(this.hasSubmit);
    // this.getLibraryApi('estate_type_code')
    //   .then(data => {
    //     this.estateTypeCodeLibrary = data;
    //   });
    // this.getLibraryApi('certificate_type_code')
    //   .then(data => {
    //     this.certificateTypeCodeLibrary = data;
    //     data.forEach((v) => {
    //       this.$set(this.certificateLibrary, v.itemCode, v.itemDesc);
    //     });
    //   });
  },
  methods: {
    getTimeStart(time) {
      this.houseEdit.preStartedDt = time;
      if (this.houseEdit.preEndDt && this.houseEdit.preEndDt < time) {
        this.$message.error("一押贷款到期日期不可早于一押贷款放款日期！");
      }
    },
    getTimeEnd(time) {
      this.houseEdit.preEndDt = time;
      if (this.houseEdit.preStartedDt && this.houseEdit.preStartedDt > time) {
        this.$message.error("一押贷款到期日期不可早于一押贷款放款日期！");
      }
    },
    changePledgeType(val) {
      this.showPledgeAmt = val === "2";
      this.maxAmtMortgageChange(this.showPledgeAmt);
    },
    modifyYouRule() {
      this.houseRule.houseEvaluationAmt.splice(
        1,
        1,
        { validator: myRule.numTwoBit, trigger: "blur" },
        {
          validator: (rule, value, callback) => {
            if (!!value && value.length < 6) {
              return callback(new Error("一押房产评估总值不可低于10万元"));
            } else {
              callback();
            }
          },
          trigger: "blur"
        }
      );
    },
    // 楼层检测
    floorValidate(rule, value, callback) {
      if (!this.houseEdit.totalFloor) {
        callback();
      } else if (
        !!value &&
        parseInt(value) > parseInt(this.houseEdit.totalFloor)
      ) {
        return callback(new Error("所在楼层不可大于总楼层数"));
      } else {
        callback();
      }
    },
    totalFloorValidate(rule, value, callback) {
      if (!this.houseEdit.floor) {
        callback();
      } else if (!!value && parseInt(value) < parseInt(this.houseEdit.floor)) {
        return callback(new Error("总楼层数不可小于所在楼层"));
      } else {
        callback();
      }
    },
    // 获取多个下拉项
    getMultipleLibrary(isReadonly = false) {
      let defaultArr = MulLibDefault;
      let esayLoanArr = ["house_condition_code"];
      let plusLoanArr = MulLibPlusLoan;
      let targetArr = [];
      if (!this.isPlusLoan) {
        targetArr = esayLoanArr.concat(defaultArr);
      }
      if (this.isPlusLoan) {
        targetArr = plusLoanArr.concat(defaultArr);
      }
      let data = {
        categoryCodes: targetArr,
        getAll: isReadonly
      };
      this.$MyFetch
        .get(spareApi.multipleSelect, data)
        .then(_data => {
          this.certificateTypeCodeLibrary = _data.certificate_type_code;
          _data.certificate_type_code.forEach(v => {
            this.$set(this.certificateLibrary, v.itemCode, v.itemDesc);
          });
          this.loanUtilizeTypeCdList = _data.loan_utilize_type_cd;
          this.jgcode_mortgage = _data.jgcode_mortgage;
          this.houseCondition = _data.house_condition_code;
          this.rentCondition = _data.rent_condition_code;
          this.repaymentCdList = _data.repayment_cd;
          this.estateTypeCodeLibrary = _data.estate_type_code;
          this.orgTypeList = _data.org_type;
          this.mortgageBorrowerList = _data.mortgage_borrower_cd;
          this.mortgageTypeList = _data.mortgage_type_cd;
          this.secondeOrgTypeList = _data.second_org_type;
          this.secondMortgageTypeCdList = _data.second_mortgage_type_cd;
          this.pledgeTypeCdList = _data.pledge_type_cd;
          this.estateSourceCodeList = _data.estate_source_code;
          this.borrowerRelationshipCodeList = _data.borrower_relationship_code;
        })
        .catch(_error => {
          console.log(_error);
          this.$message.error(_error.message);
        });
    },
    close() {
      this.coownerEdit = {
        certificateNum: null,
        certificateTypeCode: null
      };
      this.coownerList = [];
      this.$emit("close");
    },
    // 共享人信息
    openAddCoowner() {
      let isEditing = false;
      if (this.coownerList.length >= 3) {
        this.confirmFn("共有产权人数满三人,无法继续新增！", "error");
        return;
      }
      this.coownerList.forEach(v => {
        if (v.showEle) {
          isEditing = true;
        }
      });
      if (isEditing) {
        this.confirmFn("请先完成正在编辑的表格", "error");
        return;
      }
      // this.$refs.coownerAddForm.resetFields();
      // this.coownerEdit = {};
      this.coownerAddDg = true;
    },
    closeAddCoowner() {
      this.coownerEdit = {
        certificateNum: null,
        certificateTypeCode: null
      };
      this.coownerAddDg = false;
    },
    saveCoowner() {
      this.$refs.coownerAddForm.validate(valid => {
        if (valid) {
          var data = Object.assign(this.coownerEdit);
          this.coownerList.push(data);
          this.coownerEdit = {
            certificateNum: null,
            certificateTypeCode: null
          };
          this.coownerAddDg = false;
        } else {
          console.log("不通过");
        }
      });
    },
    // 打开共享人信息编辑窗口
    openEditEle(obj) {
      let isEditing = false;
      this.coownerList.forEach(v => {
        if (v.showEle) {
          isEditing = true;
        }
      });
      if (this.coownerAddDg || isEditing) {
        this.confirmFn("请先完成正在编辑的表格", "error");
        return;
      }
      this.$set(obj, "showEle", true);
      this.coownerEdit = JSON.parse(JSON.stringify(obj));
    },
    // 关闭共享人编辑窗口
    closeCoownerEdit(obj) {
      this.$set(obj, "showEle", false);
      this.coownerEdit = {
        certificateNum: null,
        certificateTypeCode: null
      };
    },
    // 保存编辑
    saveCoownerEdit(formName, index) {
      this.$refs[formName][0].validate(valid => {
        if (valid) {
          this.$set(this.coownerEdit, "showEle", false);
          this.coownerList[index] = JSON.parse(
            JSON.stringify(this.coownerEdit)
          );
          this.coownerEdit = {
            certificateNum: null,
            certificateTypeCode: null
          };
        } else {
          console.log("error");
        }
      });
    },
    // 删除共享人信息项
    deleteCoowner(index) {
      this.confirmFn("是否删除该条信息！", "warning")
        .then(() => {
          if (!this.coownerList[index].id) {
            this.coownerList.splice(index, 1);
            return;
          }
          this.$MyFetch
            .get(
              spareApi.solving.completeInfo.completeProduct.deletCoowner +
                this.coownerList[index].id
            )
            .then(data => {
              this.confirmFn("删除成功", "success");
              this.coownerList.splice(index, 1);
            })
            .catch(err => {
              this.confirmFn(err.message);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 房屋信息
    // 提交 temporary 用于暂存
    saveHouse(temporary = false) {
      this.$refs.houseForm.validate(valid => {
        if (valid) {
          if (!this.saveHouseValid()) {
            return;
          }
          if (
            !this.houseEdit.inputAverageAmt &&
            !this.houseEdit.slAverageAmt &&
            !temporary
          ) {
            this.confirmFn("请输入均价,或查询世联均价", "error");
            return;
          }
          if (this.houseEdit.preStartedDt > this.houseEdit.preEndDt) {
            this.$message.error("一押贷款到期日期不可早于一押贷款放款日期！");
            return;
          }
          let data = Object.assign({}, this.houseEdit);
          data.mortgageInd = data.mortgageInd ? data.mortgageInd : false;
          if (this.isPlusLoan && this.plusLoanType === "1") {
            PlusLoanLabelList.forEach(item => {
              let key = item.replace(/^\S/, s => s.toUpperCase());
              // console.log(key);
              data[`orig${key}`] = data[item];
              delete data[item];
            });
            data.origLoanSettleDt = data.origPreEndDt;
            data.origMortgageInd = data.mortgageInd;
            data.origSecondMortgageInd = data.secondMortgageInd;
            delete data.origPreEndDt;
            delete data.mortgageInd;
            delete data.secondMortgageInd;
            delete data.maxAmtMortgageInd;
          }
          data.coownerList = Object.assign(this.coownerList);
          data.applicationId = this.applicationId;
          // this.$set(data, 'addressCode', data.addressCode[data.addressCode.length - 1]);
          this.$set(data, "addressCode", data.addressCode);
          if (!this.currentHouseId) {
            this.saveHouseApi(data, temporary);
          } else {
            data.id = this.currentHouseId;
            this.saveEditHouseApi(data, temporary);
          }
        } else {
          if (
            this.isPlusLoan &&
            this.houseRule.inputAverageAmt[0].required &&
            !this.houseEdit.inputAverageAmt
          ) {
            this.$error("请填写人工录入均价");
          }
          this.$error("请填写完表单");
          console.log("error!");
        }
      });
    },
    saveHouseValid() {
      let isEditing = false;
      this.coownerList.forEach(v => {
        if (v.showEle) {
          isEditing = true;
        }
      });
      if (
        (this.coownerAddDg && this.houseEdit.coownersCnt !== "0") ||
        isEditing
      ) {
        this.confirmFn("请先完成正在编辑共有人信息表格", "error");
        return false;
      }
      if (this.coownerList.length !== this.houseEdit.coownersCnt - 1) {
        this.confirmFn(
          `当前房产共有人数为${this.houseEdit.coownersCnt},共有人信息应为${this
            .houseEdit.coownersCnt - 1}条`,
          "error"
        );
        return false;
      }
      let areaPercent = this.houseEdit.propertySharePercent - 0;
      this.coownerList.forEach(v => {
        areaPercent += v.propertySharePercent - 0;
      });
      if (areaPercent !== 100) {
        this.confirmFn("房产共有人产权份额之和不为100%");
        return false;
      }
      return true;
    },
    saveHouseApi(data, temporary = false) {
      this.$MyFetch
        .post(this.totalAPI.save, data)
        .then(data => {
          this.confirmFn("保存成功！", "success");
          this.currentHouseId = data;
          !temporary && this.close();
        })
        .catch(err => {
          this.confirmFn(err.message, "error");
        });
    },
    saveEditHouseApi(data, temporary = false) {
      this.$MyFetch
        .post(this.totalAPI.update, data)
        .then(() => {
          this.confirmFn(temporary ? "保存成功" : "更新成功！", "success");
          !temporary && this.close();
        })
        .catch(err => {
          this.confirmFn(err.message, "error");
        });
    },
    // 获取房屋信息
    getHouseMessage(id) {
      this.$MyFetch
        .get(this.totalAPI.query + id)
        .then((data = {}) => {
          if (this.isPlusLoan && this.plusLoanType === "1") {
            PlusLoanLabelList.forEach(item => {
              let key = item.replace(/^\S/, s => s.toUpperCase());
              data[item] = data[`orig${key}`];
            });
            data.preEndDt = data.origLoanSettleDt;
            data.mortgageInd = data.origMortgageInd;
            data.secondMortgageInd = data.origSecondMortgageInd;
          }
          // let arr = this.getAddressArr(data.addressCode, this.areaList);
          if (data.obtainDate) {
            data.obtainDate = new Date(
              data.obtainDate.replace(/-/g, "/")
            ).getTime();
          }
          if (data.completedDt) {
            data.completedDt = new Date(
              data.completedDt.replace(/-/g, "/")
            ).getTime();
          }
          if (data.preStartedDt) {
            data.preStartedDt = new Date(
              data.preStartedDt.replace(/-/g, "/")
            ).getTime();
          }
          if (data.preEndDt) {
            data.preEndDt = new Date(
              data.preEndDt.replace(/-/g, "/")
            ).getTime();
          }
          // 根据后台数据修改表单是否必填;
          data.mortgageInd = data.mortgageInd || false;
          data.maxAmtMortgageInd = data.maxAmtMortgageInd || false;
          data.secondMortgageInd = data.secondMortgageInd || false;
          this.houseEdit = Object.assign({}, this.houseEdit, data);
          this.mortgageChange(data.mortgageInd);
          this.secondMortgageChange(data.secondMortgageInd);
          this.maxAmtMortgageChange(
            data.maxAmtMortgageInd || data.pledgeTypeCd === "2"
          );
          if (this.isPlusLoan) {
            let form = {
              form: "houseForm",
              rule: "houseRule",
              model: "houseEdit"
            };
            this.changeRequire(true, form, ["inputAverageAmt"]);
          }
          this.showPledgeAmt =
            this.isPlusLoan &&
            this.plusLoanType === "2" &&
            this.houseEdit.pledgeTypeCd === "2";
          // data.addressCode = arr;
          if (this.isValid && typeof this.houseEdit.incomeInd !== "boolean") {
            this.houseEdit.incomeInd = true;
          }
          this.coownerList = data.coownerList;
          this.currentEstateNum = this.houseEdit.estateNum;
          this.$nextTick(() => {
            this.$refs.houseForm.clearValidate();
            this.isPlusLoan && this.$refs.houseForm.validate(); // 加成贷一打开就标红提示
          });
        })
        .catch(err => {
          this.$error(err.message);
          console.log(err);
        });
    },
    // 获取对应字典项目
    getLibraryValue(library, key) {
      return library[key];
    },
    getLibValList(list, key) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].itemCode === key) {
          return list[i].itemDesc;
        }
      }
    },
    // 检查房产证编号是否存在
    checkHasExist(rule, value, callback) {
      var hasExist = false;
      if (this.currentHouseId) {
        this.houseIdList.forEach(v => {
          if (this.currentEstateNum !== v && v === value) {
            // 如果不为自己的id 同时又与别人的id 相同
            hasExist = true;
          }
        });
      } else {
        this.houseIdList.forEach(v => {
          if (value === v) {
            hasExist = true;
          }
        });
      }
      if (hasExist) {
        return callback(new Error("房产证编号已存在!"));
      } else {
        callback();
      }
    },
    querySl() {
      let data = {
        // addressCode: this.houseEdit.addressCode[this.houseEdit.addressCode.length - 1],
        addressCode: this.houseEdit.addressCode,
        addressDesc: this.houseEdit.addressDesc,
        applicationId: this.applicationId,
        estateNum: this.houseEdit.estateNum,
        houseSizeMeas: this.houseEdit.houseSizeMeas - 0,
        number: this.houseEdit.number,
        id: this.currentHouseId
      };
      this.$refs.houseForm.validate(valid => {
        if (valid) {
          this.$MyFetch
            .post(spareApi.solving.completeInfo.completeProduct.getSl, data)
            .then(data => {
              if (data.isSuccess) {
                this.confirmFn("查询成功!", "success");
              } else {
                this.confirmFn(data.remark);
              }
              this.houseEdit.slAverageAmt = data.unitPrice;
            })
            .catch(err => {
              this.confirmFn(err.message);
            });
        } else {
          this.confirmFn("请完成房产基本信息表单！");
        }
      });
    },
    queryResultSl() {
      let data = {
        // addressCode: this.houseEdit.addressCode[this.houseEdit.addressCode.length - 1],
        addressCode: this.houseEdit.addressCode,
        addressDesc: this.houseEdit.addressDesc,
        applicationId: this.applicationId,
        estateNum: this.houseEdit.estateNum,
        houseSizeMeas: this.houseEdit.houseSizeMeas - 0,
        number: this.houseEdit.number,
        id: this.currentHouseId
      };
      this.$MyFetch
        .post(spareApi.solving.completeInfo.completeProduct.getManual, data)
        .then(data => {
          if (data.isSuccess) {
            this.confirmFn("查询成功！", "success");
            this.houseEdit.slAverageAmt = data.unitPrice;
          } else {
            this.confirmFn(data.remark);
          }
        })
        .catch(err => {
          this.confirmFn(err.message);
        });
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
    changeCoowner() {
      if (this.houseEdit.coownersCnt === "1") {
        this.$set(this.houseEdit, "propertySharePercent", 100);
      }
    },
    // 获取字典下拉
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
    // 验证件号
    checkCard(rule, value, callback) {
      if (!this.coownerEdit.certificateTypeCode) {
        callback(new Error("请先选择证件类型！"));
      } else if (!value) {
        callback(new Error("请填写证件号码！"));
      } else if (
        this.coownerEdit.certificateTypeCode ===
        this.dCode.certificateTypeCode.ID
      ) {
        myRule.identityCardRule(rule, value, callback);
      } else {
        myRule.otherCardRule(rule, value, callback);
      }
    },
    inputChange() {
      this.houseEdit.slAverageAmt = "";
    },
    mortgageChange(_new) {
      // pledgeTypeCd
      let list = [
        "mortgageTypeCd",
        "repaymentCd",
        "preEndDt",
        "orgCode",
        "orgType",
        "creditAmt",
        "loanBalanceAmt",
        "maxAmtMortgageInd",
        "mortgageBorrowerCd",
        "preStartedDt",
        "pledgeTypeCd"
      ]; // 加成贷添加 pledgeTypeCd
      let list2 = ["pledgeAmt"]; // 一押抵押金额 由 是否最高额抵押控制;
      let form = { form: "houseForm", rule: "houseRule", model: "houseEdit" };
      this.changeRequire(_new, form, list);
      if (!_new) {
        this.houseEdit.houseEvaluationAmt = "";
        this.changeRequire(_new, form, list2);
      }
    },
    maxAmtMortgageChange(_new) {
      let list = ["pledgeAmt", "loanUtilizeTypeCd"];
      let form = { form: "houseForm", rule: "houseRule", model: "houseEdit" };
      this.changeRequire(_new, form, list);
    },
    secondMortgageChange(_new) {
      let list = [
        "secondOrgName",
        "secondOrgType",
        "secondCreditAmt",
        "secondLoanBalanceAmt",
        "secondMortgageTypeCd",
        "secondPledgeTypeCd",
        "secondRepaymentCd",
        "secondMortgageBorrowerCd"
      ]; // 加成贷添加secondPledgeTypeCd secondRepaymentCd secondMortgageBorrowerCd
      let form = { form: "houseForm", rule: "houseRule", model: "houseEdit" };
      this.changeRequire(_new, form, list);
    },
    changeRequire(_flag, formConfig, keyList = []) {
      let rule = formConfig.rule;
      let form = formConfig.form;
      let model = formConfig.model;
      if (keyList instanceof Array && keyList.length > 0) {
        for (let i = 0; i < keyList.length; i++) {
          this[rule][keyList[i]][0].required = _flag;
          if (!_flag) {
            // 去掉校验提示
            this.$refs[form].clearValidate(keyList[i]);
            // 重置值
            if (keyList[i] === "maxAmtMortgageInd") {
              this[model][keyList[i]] = false;
              continue;
            }
            this[model][keyList[i]] = "";
          }
        }
      }
    }
  },
  computed: {
    controlLabel() {
      if (this.plusLoanType === "1") {
        let obj = {
          bankEvaluationAmt: "银行评估总价"
        };
        PlusLoanLabelList.forEach(item => {
          obj[item] = `原${controlLabel[item]}`;
        });
        obj.secondOrgType = "原二押抵押机构类型";
        obj.orgType = "原一押抵押机构类型";
        return Object.assign(JSON.parse(JSON.stringify(controlLabel)), obj);
      }
      if (this.plusLoanType === "2") {
        let obj = {
          orgType: "一押抵押机构类型",
          bankEvaluationAmt: "银行评估总价",
          secondOrgType: "二押抵押机构类型",
          secondOrgName: "二押抵押机构名称",
          houseEvaluationAmt: "一押房产评估总值"
        };
        return Object.assign(JSON.parse(JSON.stringify(controlLabel)), obj);
      }
      return JSON.parse(JSON.stringify(controlLabel));
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 1200px;
    .mgtop {
      margin-top: 20px;
    }
    .dialog-box__middle {
      height: 542px;
      overflow-y: auto;
      padding: 0 20px;
      text-align: left;
      .form__block {
        padding: 20px 30px;
        margin-bottom: 20px;
        box-shadow: 0 2px 6px 0 #d0d0d0;
        .dialog-box__middle-top {
          padding-bottom: 20px;
          border-bottom: 1px solid #e9e9e9;
          margin-bottom: 20px;
          .title {
            font-size: 16px;
            .icon__gan {
              margin-right: 10px;
            }
          }
          .isWhether {
            position: absolute;
            top: 10px;
            right: 50px;
            /deep/.el-form-item {
              margin: 0;
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
          .switch_together {
            width: 32.9%;
            display: inline-block;
            > .el-form-item {
              width: 48%;
            }
          }
          .el-form-item {
            width: 32.9%;
            padding-right: 40px;
            margin-right: 0;
          }
          .el-form-item_wrap.el-form-item {
            .el-form-item {
              width: 100%;
              padding-right: 0px;
              margin-right: 0;
            }
          }
        }
      }
      .form__bottom {
        text-align: center;
        padding-bottom: 20px;
        .button {
          width: 199px;
          margin-right: 15px;
        }
        .button:disabled {
          cursor: not-allowed;
        }
      }
      .dialog__table-form-box {
        font-size: 12px;
        .table__box {
          border: 1px solid @line-color;
          border-radius: 4px;
          .table__head {
            .table__tr {
              .table__th {
                min-width: 120px;
              }
            }
          }
          .table__body {
            .table__tr {
              .table__tr__top-list {
                .table__td {
                  min-width: 135px;
                }
              }
              .table__tr__bottom-list {
                .table__form-item {
                  padding: 0 10px;
                }
                .operate-box {
                  padding: 0 10px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
