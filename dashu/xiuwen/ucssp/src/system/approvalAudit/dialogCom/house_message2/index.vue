<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title">房产基本信息</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="dialog-box__middle">
        <el-form :model="houseEdit"
                 :rules="houseRule"
                 ref="houseForm"
                 label-width="100px"
                 :disabled="hasSubmit"
                 class="demo-form-inline" label-position="top">
          <div class="form__block bg__white border__radius-5">
            <div class="dialog-box__middle-top">
              <h5 class="title"><span class="icon icon__gan"></span>房产信息</h5>
              <div class="isWhether">
                <span class="title font-weight">房贷是否有效</span>
                <el-form-item>
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
              <el-form-item label="房产编号" prop="estateNum">
                <el-input placeholder="请填写" v-model="houseEdit.estateNum" maxlength="50"></el-input>
              </el-form-item>
              <el-form-item label="有无其他房产" prop="otherEstateCd">
                <el-select placeholder="请选择" v-model="houseEdit.otherEstateCd">
                  <el-option
                    v-for="item in select.otherEstateCd"
                    :key="item.itemCode"
                    :value="item.itemCode"
                    :label="item.itemDesc">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="其他房产类型" prop="otherEstateType">
                <el-select placeholder="请选择" v-model="houseEdit.otherEstateType">
                  <el-option
                    v-for="item in select.otherHouseType"
                    :key="item.itemCode"
                    :value="item.itemCode"
                    :label="item.itemDesc">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="房产证地址（省、市、区）" prop="addressCode">
                <el-cascader :options="areaList" v-model="houseEdit.addressCode"></el-cascader>
              </el-form-item>
              <el-form-item label="房产详细地址" prop="addressDesc">
                <el-input placeholder="请填写" v-model="houseEdit.addressDesc" maxlength="100"></el-input>
              </el-form-item>
              <el-form-item label="房产性质" prop="estateTypeCode">
                <el-select v-model="houseEdit.estateTypeCode" placeholder="请选择" :disabled="!!hasSubmit || !!slCaseId">
                  <el-option
                    v-for="(item, index) in estateTypeCodeLibrary"
                    :key="index"
                    :label="item.itemDesc"
                    :value="item.itemCode"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="房产类型" prop="houseType">
                <el-select placeholder="请选择" v-model="houseEdit.houseType">
                  <el-option
                    v-for="item in select.houseType"
                    :key="item.itemCode"
                    :value="item.itemCode"
                    :label="item.itemDesc">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="竣工日期" prop="completedDt">
                <el-date-picker
                  v-model="houseEdit.completedDt"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd hh:mm:ss"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="登记日期" prop="obtainDate">
                <el-date-picker
                  v-model="houseEdit.obtainDate"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd hh:mm:ss"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="房龄" prop="houseYearCnt">
                <el-input placeholder="请填写" v-model="houseEdit.houseYearCnt" maxlength="10"></el-input>
              </el-form-item>
              <el-form-item label="抵押物房屋结构" prop="estateStructure">
                <el-select placeholder="请选择" v-model="houseEdit.estateStructure">
                  <el-option
                    v-for="item in select.estateStructure"
                    :key="item.itemCode"
                    :value="item.itemCode"
                    :label="item.itemDesc">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="抵押状态" prop="mortgageInd">
                <el-select placeholder="请选择" v-model="houseEdit.mortgageInd">
                  <el-option
                    v-for="item in select.mortgageInd"
                    :key="item.itemCode"
                    :value="item.itemCode"
                    :label="item.itemDesc">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="抵押日期" prop="pledgeDt">
                <el-date-picker
                  v-model="houseEdit.pledgeDt"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd hh:mm:ss"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="是否在我司二押" prop="secondMortgageInd">
                <el-switch
                  :width="50"
                  active-text="是"
                  inactive-text="否"
                  :active-value="true"
                  :inactive-value="false" v-model="houseEdit.secondMortgageInd"></el-switch>
              </el-form-item>
              <el-form-item label="共有产权人数" prop="coownersCnt">
                <el-input placeholder="请填写" v-model="houseEdit.coownersCnt" maxlength="10"></el-input>
              </el-form-item>
              <el-form-item label="共有情况" prop="commonCondition">
                <el-select placeholder="请选择" v-model="houseEdit.commonCondition">
                  <el-option
                    v-for="item in select.commonCondition"
                    :key="item.itemCode"
                    :value="item.itemCode"
                    :label="item.itemDesc">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="借款人产权份额（%）" prop="propertySharePercent">
                <el-input placeholder="请填写" v-model="houseEdit.propertySharePercent"></el-input>
              </el-form-item>
              <el-form-item label="出租情况" prop="rentConditionDesc">
                <el-select placeholder="请选择" v-model="houseEdit.rentConditionDesc">
                  <el-option
                    v-for="item in select.rentConditionDesc"
                    :key="item.itemCode"
                    :value="item.itemCode"
                    :label="item.itemDesc">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="楼盘名称" prop="projectName">
                <el-input placeholder="请填写" v-model="houseEdit.projectName" maxlength="50"></el-input>
              </el-form-item>
              <el-form-item label="建筑面积（㎡）" prop="houseSizeMeas">
                <el-input placeholder="请填写" v-model="houseEdit.houseSizeMeas" maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="房讯通均价（元）" prop="fxtAverageAmt">
                <el-input placeholder="请填写" v-model="houseEdit.fxtAverageAmt" maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="房讯通总价（元）" prop="fxtTotalAmt">
                <el-input placeholder="请填写" v-model="houseEdit.fxtTotalAmt" maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="世联均价（元）" prop="slAverageAmt">
                <el-input placeholder="请填写" v-model="houseEdit.slAverageAmt" maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="世联总价（元）" prop="slTotalAmt">
                <el-input placeholder="请填写" v-model="houseEdit.slTotalAmt" maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="云房均价（元）" prop="yfAverageAmt">
                <el-input placeholder="请填写" v-model="houseEdit.yfAverageAmt" maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="云房总价（元）" prop="yfTotalAmt">
                <el-input placeholder="请填写" v-model="houseEdit.yfTotalAmt" maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="综合评估均价（元）" prop="inputAverageAmt">
                <el-input placeholder="请填写" v-model="houseEdit.inputAverageAmt" maxlength="20"></el-input>
              </el-form-item>
              <el-form-item label="综合评估总价" prop="totalPriceAmt">
                <el-input placeholder="请填写" v-model="houseEdit.totalPriceAmt" maxlength="20"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="form__block bg__white border__radius-5">
            <div class="dialog-box__middle-top">
              <h5 class="title"><span class="icon icon__gan"></span>土地信息<strong>（如提供土地证，此项可填）</strong></h5>
            </div>
            <div class="dialog-box__form__group">
              <el-form-item label="地类" prop="landType">
                <el-select placeholder="请选择" v-model="houseEdit.landType">
                  <el-option
                    v-for="item in select.landType"
                    :key="item.itemCode"
                    :value="item.itemCode"
                    :label="item.itemDesc">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="土地使用权取得方式/使用权类型" prop="usUfructType">
                <el-select placeholder="请选择" v-model="houseEdit.usUfructType">
                  <el-option
                    v-for="item in select.usUfructType"
                    :key="item.itemCode"
                    :value="item.itemCode"
                    :label="item.itemDesc">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <div class="form__block bg__white border__radius-5">
          <div class="dialog-box__middle-top">
            <h5 class="title"><span class="icon icon__gan"></span>共有产权人信息</h5>
          </div>
          <div class="dialog__table-box">
            <div class="dialog__table-form-box">
              <ul class="table__box table__box1">
                <li class="table__head">
                  <ul class="table__tr">
                    <li class="table__th">共有产权人姓名</li>
                    <li class="table__th">证件类型</li>
                    <li class="table__th">证件号码</li>
                    <li class="table__th">证件有效期</li>
                    <li class="table__th">产权份额</li>
                    <li class="table__th">联系方式</li>
                    <li class="table__th">通讯地址</li>
                    <li class="table__th">操作</li>
                  </ul>
                </li>
                <li class="table__body" v-for="(item, index) in coownerList" :key="index">
                  <div class="table__tr">
                    <ul class="table__tr__top-list" v-show="!item.showEle">
                      <li class="table__td">{{item.coownerName}}</li>
                      <li class="table__td">{{getLibraryValue(certificateLibrary,item.certificateTypeCode)}}</li>
                      <li class="table__td">{{item.certificateNum}}</li>
                      <li class="table__td">{{formatTime(item.certificateExpiredDt)}}</li>
                      <li class="table__td">{{item.propertySharePercent}}</li>
                      <li class="table__td">{{item.contactNum}}</li>
                      <li class="table__td">{{item.postalAddress}}</li>
                      <li class="table__td">
                        <div class="operate-box" v-if="!hasSubmit">
                          <i class="icon el-icon-plus cursor__pointer" @click="openAddCoowner" v-if="index === (coownerList.length -1)"></i>
                          <i class="icon el-icon-minus cursor__pointer" @click="deleteCoowner(index)"></i>
                          <i class="icon icon__edit cursor__pointer" @click="openEditEle(item)"></i>
                        </div>
                      </li>
                    </ul>
                    <el-form :model="coownerEdit"
                             :rules="coownerRule"
                             :ref="'coownerEditForm' + index"
                             label-width="100px"
                             class="demo-form-inline" label-position="top">
                      <div class="table__tr__bottom-list" v-show="item.showEle">
                        <el-form-item prop="coownerName" class="table__form-item">
                          <el-input v-model="coownerEdit.coownerName" maxlength="40"></el-input>
                        </el-form-item>
                        <el-form-item prop="certificateTypeCode" class="table__form-item">
                          <el-select v-model="coownerEdit.certificateTypeCode" placeholder="请选择">
                            <el-option
                              v-for="(item, index) in certificateTypeCodeLibrary"
                              :key="index"
                              :value="item.itemCode"
                              :label="item.itemDesc"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item
                          :prop="'certificateNum' + ((coownerEdit.certificateTypeCode) ? coownerEdit.certificateTypeCode : '')"
                          class="table__form-item">
                          <el-input v-model="coownerEdit['certificateNum' + ((coownerEdit.certificateTypeCode) ? coownerEdit.certificateTypeCode : '')]" maxlength="40"></el-input>
                        </el-form-item>
                        <el-form-item prop="certificateExpiredDt" class="table__form-item">
                          <el-date-picker
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd hh:mm:ss"
                            v-model="coownerEdit.certificateExpiredDt">
                          </el-date-picker>
                        </el-form-item>
                        <el-form-item prop="propertySharePercent" class="table__form-item">
                          <el-input v-model="coownerEdit.propertySharePercent"></el-input>
                        </el-form-item>
                        <el-form-item prop="contactNum" class="table__form-item">
                          <el-input v-model="coownerEdit.contactNum" maxlength="20"></el-input>
                        </el-form-item>
                        <el-form-item prop="postalAddress" class="table__form-item">
                          <el-input v-model="coownerEdit.postalAddress" maxlength="200"></el-input>
                        </el-form-item>
                        <div class="operate-box text__center" v-if="!hasSubmit">
                          <i class="icon el-icon-check cursor__pointer" @click="saveCoownerEdit('coownerEditForm' + index, index)"></i>
                          <i class="icon el-icon-minus cursor__pointer" @click="closeCoownerEdit(item)"></i>
                        </div>
                      </div>
                    </el-form>
                  </div>
                </li>
                <li class="table__body" v-show="coownerAddDg || (coownerList.length === 0)">
                  <div class="table__tr">
                    <el-form :model="coownerEdit"
                             :rules="coownerRule"
                             ref="coownerAddForm"
                             label-width="100px"
                             class="demo-form-inline" label-position="top" >
                      <div class="table__tr__bottom-list" >
                        <el-form-item prop="coownerName" class="table__form-item">
                          <el-input v-model="coownerEdit.coownerName" maxlength="40"></el-input>
                        </el-form-item>
                        <el-form-item prop="certificateTypeCode" class="table__form-item">
                          <el-select v-model="coownerEdit.certificateTypeCode" placeholder="请选择">
                            <el-option
                              v-for="(item, index) in certificateTypeCodeLibrary"
                              :key="index"
                              :value="item.itemCode"
                              :label="item.itemDesc"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item
                          :prop="'certificateNum' + ((coownerEdit.certificateTypeCode) ? coownerEdit.certificateTypeCode : '')"
                          class="table__form-item">
                          <el-input v-model="coownerEdit['certificateNum' + ((coownerEdit.certificateTypeCode) ? coownerEdit.certificateTypeCode : '')]" maxlength="40"></el-input>
                        </el-form-item>
                        <el-form-item prop="certificateExpiredDt" class="table__form-item">
                          <el-date-picker
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd hh:mm:ss"
                            v-model="coownerEdit.certificateExpiredDt">
                          </el-date-picker>
                        </el-form-item>
                        <el-form-item prop="propertySharePercent" class="table__form-item">
                          <el-input v-model="coownerEdit.propertySharePercent"></el-input>
                        </el-form-item>
                        <el-form-item prop="contactNum" class="table__form-item">
                          <el-input v-model="coownerEdit.contactNum" maxlength="20"></el-input>
                        </el-form-item>
                        <el-form-item prop="postalAddress" class="table__form-item">
                          <el-input v-model="coownerEdit.postalAddress" maxlength="200"></el-input>
                        </el-form-item>
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
        <div class="form__block bg__white border__radius-5">
          <div class="dialog-box__middle-top">
            <h5 class="title"><span class="icon icon__gan"></span>在押机构信息</h5>
          </div>
          <div class="dialog__table-box">
            <div class="dialog__table-form-box">
              <ul class="table__box table__box2">
                <li class="table__head">
                  <ul class="table__tr">
                    <li class="table__th">在押机构</li>
                    <li class="table__th">一押期限（月）</li>
                    <li class="table__th">贷款预计结清日期</li>
                    <li class="table__th">一押抵押方式</li>
                    <li class="table__th">一押还款方式</li>
                    <li class="table__th">是否按揭</li>
                    <li class="table__th">授信金额</li>
                    <li class="table__th">一押贷款余额</li>
                    <li class="table__th">抵押债权金额</li>
                    <li class="table__th">贷款机构名称</li>
                    <li class="table__th">贷款机构类型</li>
                    <li class="table__th">操作</li>
                  </ul>
                </li>
                <li class="table__body" v-for="(item, index) in detaineesList" :key="index">
                  <div class="table__tr">
                    <ul class="table__tr__top-list" v-show="!item.showEle">
                      <li class="table__td">{{item.detainees}}</li>
                      <li class="table__td">{{item.mortgageTerm}}</li>
                      <li class="table__td">{{formatTime(item.loanSettleDt)}}</li>
                      <li class="table__td">{{getDescFromCode(select.pledgeTypeCd, item.pledgeTypeCd)}}</li>
                      <li class="table__td">{{getDescFromCode(select.repaymentCd, item.repaymentCd)}}</li>
                      <li class="table__td">{{getDescFromCode(select.mortgageInd, item.mortgageInd)}}</li>
                      <li class="table__td">{{item.creditAmt}}</li>
                      <li class="table__td">{{item.loanBalanceAmt}}</li>
                      <li class="table__td">{{item.pledgeAmt}}</li>
                      <li class="table__td">{{item.orgName}}</li>
                      <li class="table__td">{{getDescFromCode(select.orgType, item.orgType)}}</li>
                      <li class="table__td">
                        <div class="operate-box" v-if="!hasSubmit">
                          <i class="icon el-icon-plus cursor__pointer" @click="openAddDetainees" v-if="index === (detaineesList.length -1)"></i>
                          <i class="icon el-icon-minus cursor__pointer" @click="deleteDetainees(index)"></i>
                          <i class="icon icon__edit cursor__pointer" @click="openEditDetaineesEle(item)"></i>
                        </div>
                      </li>
                    </ul>
                    <el-form :model="detaineesEdit"
                      :rules="detaineesRule"
                      :ref="'detaineesEditForm' + index"
                      label-width="100px"
                      class="demo-form-inline"
                      label-position="top">
                      <div class="table__tr__bottom-list" v-show="item.showEle">
                        <el-form-item class="table__form-item" prop="detainees">
                          <el-input v-model="detaineesEdit.detainees" maxlength="50"></el-input>
                        </el-form-item>
                        <el-form-item class="table__form-item" prop="mortgageTerm">
                          <el-input v-model="detaineesEdit.mortgageTerm" maxlength="10"></el-input>
                        </el-form-item>
                        <el-form-item class="table__form-item" prop="loanSettleDt">
                          <el-date-picker
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd hh:mm:ss"
                            v-model="detaineesEdit.loanSettleDt">
                          </el-date-picker>
                        </el-form-item>
                        <el-form-item class="table__form-item" prop="pledgeTypeCd">
                          <el-select v-model="detaineesEdit.pledgeTypeCd">
                            <el-option
                              v-for="item in select.pledgeTypeCd"
                              :key="item.itemCode"
                              :value="item.itemCode"
                              :label="item.itemDesc">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item class="table__form-item" prop="repaymentCd">
                          <el-select v-model="detaineesEdit.repaymentCd">
                            <el-option
                              v-for="item in select.repaymentCd"
                              :key="item.itemCode"
                              :value="item.itemCode"
                              :label="item.itemDesc">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item class="table__form-item" prop="mortgageInd">
                          <el-select v-model="detaineesEdit.mortgageInd">
                            <el-option
                              v-for="item in select.mortgageInd"
                              :key="item.itemCode"
                              :value="item.itemCode"
                              :label="item.itemDesc">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item class="table__form-item" prop="creditAmt">
                          <el-input v-model="detaineesEdit.creditAmt" maxlength="20"></el-input>
                        </el-form-item>
                        <el-form-item class="table__form-item" prop="loanBalanceAmt">
                          <el-input v-model="detaineesEdit.loanBalanceAmt" maxlength="20"></el-input>
                        </el-form-item>
                        <el-form-item class="table__form-item" prop="pledgeAmt">
                          <el-input v-model="detaineesEdit.pledgeAmt" maxlength="20"></el-input>
                        </el-form-item>
                        <el-form-item class="table__form-item" prop="orgName">
                          <el-input v-model="detaineesEdit.orgName" maxlength="50"></el-input>
                        </el-form-item>
                        <el-form-item class="table__form-item" prop="orgType">
                          <el-select v-model="detaineesEdit.orgType">
                            <el-option
                              v-for="item in select.orgType"
                              :key="item.itemCode"
                              :value="item.itemCode"
                              :label="item.itemDesc">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <div class="operate-box text__center" v-if="!hasSubmit">
                          <i class="icon el-icon-check cursor__pointer" @click="saveDetaineesEdit('detaineesEditForm' + index, index)"></i>
                          <i class="icon el-icon-minus cursor__pointer" @click="closeDetaineesEdit(item)"></i>
                        </div>
                      </div>
                    </el-form>
                  </div>
                </li>
                <li class="table__body" v-show="detaineesAddDg || (detaineesList.length === 0)">
                  <div class="table__tr">
                    <el-form :model="detaineesEdit"
                             :rules="detaineesRule"
                             ref="detaineesAddForm"
                             label-width="100px"
                             class="demo-form-inline" label-position="top" >
                      <div class="table__tr__bottom-list" >
                        <el-form-item class="table__form-item" prop="detainees">
                          <el-input v-model="detaineesEdit.detainees" maxlength="50"></el-input>
                        </el-form-item>
                        <el-form-item class="table__form-item" prop="mortgageTerm">
                          <el-input v-model="detaineesEdit.mortgageTerm" maxlength="10"></el-input>
                        </el-form-item>
                        <el-form-item class="table__form-item" prop="loanSettleDt">
                          <el-date-picker
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd hh:mm:ss"
                            v-model="detaineesEdit.loanSettleDt">
                          </el-date-picker>
                        </el-form-item>
                        <el-form-item class="table__form-item" prop="pledgeTypeCd">
                          <el-select v-model="detaineesEdit.pledgeTypeCd">
                            <el-option
                              v-for="item in select.pledgeTypeCd"
                              :key="item.itemCode"
                              :value="item.itemCode"
                              :label="item.itemDesc">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item class="table__form-item" prop="repaymentCd">
                          <el-select v-model="detaineesEdit.repaymentCd">
                            <el-option
                              v-for="item in select.repaymentCd"
                              :key="item.itemCode"
                              :value="item.itemCode"
                              :label="item.itemDesc">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item class="table__form-item" prop="mortgageInd">
                          <el-select v-model="detaineesEdit.mortgageInd">
                            <el-option
                              v-for="item in select.mortgageInd"
                              :key="item.itemCode"
                              :value="item.itemCode"
                              :label="item.itemDesc">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item class="table__form-item" prop="creditAmt">
                          <el-input v-model="detaineesEdit.creditAmt" maxlength="20"></el-input>
                        </el-form-item>
                        <el-form-item class="table__form-item" prop="loanBalanceAmt">
                          <el-input v-model="detaineesEdit.loanBalanceAmt" maxlength="20"></el-input>
                        </el-form-item>
                        <el-form-item class="table__form-item" prop="pledgeAmt">
                          <el-input v-model="detaineesEdit.pledgeAmt" maxlength="20"></el-input>
                        </el-form-item>
                        <el-form-item class="table__form-item" prop="orgName">
                          <el-input v-model="detaineesEdit.orgName" maxlength="50"></el-input>
                        </el-form-item>
                        <el-form-item class="table__form-item" prop="orgType">
                          <el-select v-model="detaineesEdit.orgType">
                            <el-option
                              v-for="item in select.orgType"
                              :key="item.itemCode"
                              :value="item.itemCode"
                              :label="item.itemDesc">
                            </el-option>
                          </el-select>
                        </el-form-item>
                        <div class="operate-box text__center" v-if="!hasSubmit">
                          <i class="icon el-icon-check cursor__pointer" @click="saveDetainees"></i>
                          <i class="icon el-icon-minus cursor__pointer" @click="closeAddDetainees"></i>
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
          <el-button type="primary" class="width200" @click="saveHouse" :disabled="!!hasSubmit">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import '@common/css/dialog';
  import myRule from '@common/js/rules';
  import {aprAudApi} from '../../js/server.js';
  export default {
    props: {
      houseId: {
        type: Number
      },
      estateNum: {
        type: String
      },
      areaList: {
        type: Array,
        default: function() {
          return {};
        }
      },
      applicationId: {
        type: String,
        default: () => {
          return '';
        }
      },
      houseIdList: {
        type: Array,
        default: () => {
          return [];
        }
      },
      hasSubmit: {
        default: () => {
          return false;
        }
      }
    },
    data() {
      let checkPrice = (rule, value, callback) => {
        const valReg = /^\d{1,14}(\.\d{1,4})?$/;
        if (!valReg.test(value) && !!value) {
          return callback(new Error('请输入整数部分不超14位，小数部分不超4位的数'));
        }
        callback();
      };
      return {
        select: {
          otherEstateCd: [
            { itemCode: "1", itemDesc: '有-有证明' },
            { itemCode: "2", itemDesc: '有-无证明' },
            { itemCode: "3", itemDesc: '无' }
          ],
          houseType: [
            { itemCode: "1", itemDesc: '商品房' },
            { itemCode: "2", itemDesc: '房改房' },
            { itemCode: "3", itemDesc: '经济适用房' },
            { itemCode: "4", itemDesc: '小产权房' },
            { itemCode: "5", itemDesc: '军产房' },
            { itemCode: "6", itemDesc: '拆迁安置房' }
          ],
          otherHouseType: [
            { itemCode: "1", itemDesc: '商品房' },
            { itemCode: "2", itemDesc: '别墅' },
            { itemCode: "3", itemDesc: '商住两用' },
            { itemCode: "4", itemDesc: '商铺' },
            { itemCode: "5", itemDesc: '写字楼' },
            { itemCode: "6", itemDesc: '特殊房产' },
            { itemCode: "7", itemDesc: '其他' }
          ],
          estateStructure: [
            { itemCode: "1", itemDesc: '钢结构' },
            { itemCode: "2", itemDesc: '钢和钢筋混泥土结构' },
            { itemCode: "3", itemDesc: '钢筋混泥土结构' },
            { itemCode: "4", itemDesc: '混合结构' },
            { itemCode: "5", itemDesc: '砖木结构' },
            { itemCode: "6", itemDesc: '其他结构' }
          ],
          mortgageInd: [
            { itemCode: false, itemDesc: '否' },
            { itemCode: true, itemDesc: '是' }
          ],
          commonCondition: [
            { itemCode: "1", itemDesc: '按份共有' },
            { itemCode: "2", itemDesc: '共同共有' },
            { itemCode: "3", itemDesc: '一人独有' }
          ],
          rentConditionDesc: [
            { itemCode: "1", itemDesc: '自住' },
            { itemCode: "2", itemDesc: '出租-直租' },
            { itemCode: "3", itemDesc: '出租-包租' },
            { itemCode: "4", itemDesc: '空置' }
          ],
          landType: [
            { itemCode: "1", itemDesc: '住宅' },
            { itemCode: "2", itemDesc: '城镇住宅用地' },
            { itemCode: "3", itemDesc: '城镇住宅用地（经济适用房）' },
            { itemCode: "4", itemDesc: '城镇单一住宅用地' },
            { itemCode: "5", itemDesc: '城镇混合住宅用地' },
            { itemCode: "6", itemDesc: '其他' }
          ],
          usUfructType: [
            { itemCode: "1", itemDesc: '出让/市场化商品房' },
            { itemCode: "2", itemDesc: '划拨/市场化商品房' },
            { itemCode: "3", itemDesc: '划拨/动迁房' },
            { itemCode: "4", itemDesc: '划拨/其他' },
            { itemCode: "5", itemDesc: '划拨/经济适用房' },
            { itemCode: "6", itemDesc: '其他' }
          ],
          pledgeTypeCd: [
            { itemCode: "1", itemDesc: '一般抵押' },
            { itemCode: "2", itemDesc: '最高额抵押' }
          ],
          repaymentCd: [
            { itemCode: "0", itemDesc: '先息后本' },
            { itemCode: "1", itemDesc: '等额本息' },
            { itemCode: "2", itemDesc: '等额本金' },
            { itemCode: "3", itemDesc: '气球贷' }
          ],
          orgType: [
            { itemCode: "0", itemDesc: '银行' },
            { itemCode: "1", itemDesc: '非银行' },
            { itemCode: "2", itemDesc: '个人' }
          ]
        },
        // 证件类型字典
        certificateLibrary: {},
        certificateTypeCodeLibrary: [],
        // 住房性质
        estateTypeCodeLibrary: [],
        // 房产共有人字段
        options: [],
        coownerEdit: {},
        coownerList: [],
        coownerRule: {
          coownerName: [
            { required: true, message: '请填写共有产权人姓名', trigger: 'blur' }
          ],
          certificateTypeCode: [
            { required: true, message: '请选择证件类型', trigger: 'change' }
          ],
          certificateNum: [
            { required: true, message: '填写证件号码', trigger: 'blur' }
          ],
          certificateNumInd01: [
            { required: true, message: '请填身份证号', trigger: 'blur' },
            { validator: myRule.identityCardRule, trigger: 'blur' }
          ],
          certificateNumInd04: [
            { required: true, message: '请填写军官证号', trigger: 'blur' },
            { validator: myRule.otherCardRule, trigger: 'blur' }
          ],
          certificateNumInd06: [
            { required: true, message: '请填写港澳居民来往内地通行证号', trigger: 'blur' },
            { validator: myRule.otherCardRule, trigger: 'blur' }
          ],
          certificateNumInd07: [
            { required: true, message: '请填写台湾同胞来往内地通行证号', trigger: 'blur' },
            { validator: myRule.otherCardRule, trigger: 'blur' }
          ],
          certificateNumInd15: [
            { required: true, message: '请填写护照号', trigger: 'blur' },
            { validator: myRule.otherCardRule, trigger: 'blur' }
          ],
          certificateExpiredDt: [
            { required: true, message: '请选择证件有效期', trigger: 'change' }
          ],
          propertySharePercent: [
            { required: true, message: '请填写产权份额', trigger: 'blur' },
            { validator: myRule.percentWithZero, trigger: 'blur' }
          ],
          contactNum: [
            { required: true, message: '填写联系方式', trigger: 'blur' }
          ],
          postalAddress: [
            { required: true, message: '填写通讯地址', trigger: 'blur' }
          ]
        },
        coownerAddDg: false,
        detaineesEdit: {},
        detaineesList: [],
        detaineesRule: {
          detainees: [
            { required: true, message: '请填写在押机构', trigger: 'blur' }
          ],
          mortgageTerm: [
            { required: true, message: '请填写一押期限', trigger: 'blur' },
            { validator: myRule.number, trigger: 'blur' }
          ],
          loanSettleDt: [
            { required: true, message: '请选择贷款预计结清日期', trigger: 'change' }
          ],
          pledgeTypeCd: [
            { required: true, message: '请选择一押抵押方式', trigger: 'change' }
          ],
          repaymentCd: [
            { required: true, message: '请选择一押还款方式', trigger: 'change' }
          ],
          mortgageInd: [
            { required: true, message: '请选择是否按揭', trigger: 'change' }
          ],
          creditAmt: [
            { required: true, message: '请填写授信金额', trigger: 'blur' },
            { validator: checkPrice, trigger: 'blur' }
          ],
          loanBalanceAmt: [
            { required: true, message: '请填写一押贷款余额', trigger: 'blur' },
            { validator: checkPrice, trigger: 'blur' }
          ],
          pledgeAmt: [
            { required: true, message: '请填写抵押债权金额', trigger: 'blur' },
            { validator: checkPrice, trigger: 'blur' }
          ],
          orgName: [
            { required: true, message: '请填写贷款机构名称', trigger: 'blur' }
          ],
          orgType: [
            { required: true, message: '请选择贷款机构类型', trigger: 'change' }
          ]
        },
        detaineesAddDg: false,
        // 房屋信息字段
        houseRule: {
          estateNum: [
            { required: true, message: '请填写房产编号', trigger: 'blur' },
            { validator: this.checkHasExist, trigger: 'blur' }
          ],
          addressCode: [
            { required: true, message: '请选择房产证地址', trigger: 'change' }
          ],
          addressDesc: [
            { required: true, message: '请填写房产详细地址', trigger: 'blur' }
          ],
          estateTypeCode: [
            { required: true, message: '请选择房屋性质', trigger: 'change' }
          ],
          completedDt: [
            { required: true, message: '请选择竣工日期', trigger: 'change' }
          ],
          obtainDate: [
            { required: true, message: '请选择登记日期', trigger: 'change' }
          ],
          houseYearCnt: [
            { validator: myRule.number, trigger: 'blur' }
          ],
          mortgageInd: [
            { required: true, message: '请选择抵押状态', trigger: 'change' }
          ],
          coownersCnt: [
            { required: true, message: '请填写共有产权人数', trigger: 'blur' },
            { validator: myRule.number, trigger: 'blur' }
          ],
          commonCondition: [
            { required: true, message: '请选择共有情况', trigger: 'change' }
          ],
          propertySharePercent: [
            { required: true, message: '请填写共有人产权份额', trigger: 'blur' },
            { validator: myRule.percentWithZero, trigger: 'blur' }
          ],
          rentConditionDesc: [
            { required: true, message: '请选择出租情况', trigger: 'change' }
          ],
          projectName: [
            { required: true, message: '请填写楼盘名称', trigger: 'blur' }
          ],
          houseSizeMeas: [
            { required: true, message: '请填写房屋面积', trigger: 'blur' },
            { validator: checkPrice, trigger: 'blur' }
          ],
          fxtAverageAmt: [
            { validator: checkPrice, trigger: 'blur' }
          ],
          fxtTotalAmt: [
            { validator: checkPrice, trigger: 'blur' }
          ],
          slAverageAmt: [
            { validator: checkPrice, trigger: 'blur' }
          ],
          slTotalAmt: [
            { validator: checkPrice, trigger: 'blur' }
          ],
          yfAverageAmt: [
            { validator: checkPrice, trigger: 'blur' }
          ],
          yfTotalAmt: [
            { validator: checkPrice, trigger: 'blur' }
          ],
          inputAverageAmt: [
            { required: true, message: '请填写综合评估均价', trigger: 'blur' },
            { validator: checkPrice, trigger: 'blur' }
          ],
          totalPriceAmt: [
            { required: true, message: '请填写综合评估总价', trigger: 'blur' },
            { validator: checkPrice, trigger: 'blur' }
          ]
        },
        houseEdit: {
          incomeInd: true
        },
        currentEstateNum: '',
        slCaseId: '', // 估价编号 世联查询没有结果时返回的值
        slLiveness: '' // 房产活跃度 用于传给后端
      };
    },
    created() {
      if (this.houseId) {
        this.houseIdList.splice(this.houseIdList.indexOf(this.houseId), 1);
      }
      if (this.estateNum) {
        this.getHouseMessage(this.estateNum);
      }
      this.$getDictCode('estate_type_code', {getAll: this.hasSubmit})
        .then(data => {
          this.estateTypeCodeLibrary = data;
        });
      this.$getDictCode('certificate_type_code', {getAll: this.hasSubmit})
        .then(data => {
          this.certificateTypeCodeLibrary = data;
          data.forEach((v) => {
            this.$set(this.certificateLibrary, v.itemCode, v.itemDesc);
          });
        });
    },
    methods: {
      close() {
        this.coownerEdit = {};
        this.coownerList = [];
        this.detaineesEdit = {};
        this.detaineesList = [];
        this.$emit('close');
      },
      getDescFromCode(arr, code) {
        let obj = arr.filter((obj) => obj.itemCode.toString() === code.toString());
        if (obj && obj[0]) {
          return obj[0].itemDesc;
        }
      },
      // 共享人信息
      openAddCoowner() {
        let isEditing = false;
        /* if (this.coownerList.length >= 3) {
          this.confirmFn('共有产权人数满三人,无法继续新增！', 'error');
          return;
        } */
        this.coownerList.forEach((v) => {
          if (v.showEle) {
            isEditing = true;
          }
        });
        if (isEditing) {
          this.confirmFn('请先完成正在编辑的表格', 'error');
          return;
        }
        this.coownerEdit = {};
        this.coownerAddDg = true;
      },
      closeAddCoowner() {
        this.coownerEdit = {};
        this.coownerAddDg = false;
      },
      saveCoowner() {
        this.$refs.coownerAddForm.validate((valid) => {
            if (valid) {
              var data = Object.assign(this.coownerEdit);
              data.certificateNum = this.coownerEdit['certificateNum' + this.coownerEdit.certificateTypeCode];
              this.coownerList.push(data);
              this.coownerEdit = {};
              this.coownerAddDg = false;
            } else {
              console.log('不通过');
            }
        });
      },
      // 打开共享人信息编辑窗口
      openEditEle(obj) {
        let isEditing = false;
        this.coownerList.forEach((v) => {
          if (v.showEle) {
            isEditing = true;
          }
        });
        if (this.coownerAddDg || isEditing) {
          this.confirmFn('请先完成正在编辑的表格', 'error');
          return;
        }
        this.$set(obj, 'showEle', true);
        this.coownerEdit = JSON.parse(JSON.stringify(obj));
        this.$set(this.coownerEdit, 'certificateNum' + ((this.coownerEdit.certificateTypeCode) ? this.coownerEdit.certificateTypeCode : ''), this.coownerEdit.certificateNum);
      },
      // 关闭共享人编辑窗口
      closeCoownerEdit(obj) {
        this.$set(obj, 'showEle', false);
        this.coownerEdit = {};
      },
      // 保存编辑
      saveCoownerEdit(formName, index) {
        this.$refs[formName][0].validate((valid) => {
          if (valid) {
            this.$set(this.coownerEdit, 'certificateNum', this.coownerEdit['certificateNum' + this.coownerEdit.certificateTypeCode]);
            this.$set(this.coownerEdit, 'showEle', false);
            this.coownerList[index] = JSON.parse(JSON.stringify(this.coownerEdit));
            this.coownerEdit = {};
          } else {
            console.log('error');
          }
        });
      },
      // 删除共享人信息项
      deleteCoowner(index) {
        this.confirmFn('是否删除该条信息！', 'warning')
          .then(() => {
            if (!this.coownerList[index].id) {
              this.coownerList.splice(index, 1);
              return;
            }
            this.$MyFetch.get(aprAudApi.completeProduct.deletCoowner + this.coownerList[index].id)
              .then(data => {
                this.confirmFn('删除成功', 'success');
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

      // 在押机构信息
      openAddDetainees() {
        let isEditing = false;
        /* if (this.detaineesList.length >= 3) {
          this.confirmFn('在押机构信息满三条,无法继续新增！', 'error');
          return;
        } */
        this.detaineesList.forEach((v) => {
          if (v.showEle) {
            isEditing = true;
          }
        });
        if (isEditing) {
          this.confirmFn('请先完成正在编辑的表格', 'error');
          return;
        }
        this.detaineesEdit = {};
        this.detaineesAddDg = true;
      },
      closeAddDetainees() {
        this.detaineesEdit = {};
        this.detaineesAddDg = false;
      },
      saveDetainees() {
        this.$refs.detaineesAddForm.validate((valid) => {
            if (valid) {
              var data = Object.assign(this.detaineesEdit);
              this.detaineesList.push(data);
              this.detaineesEdit = {};
              this.detaineesAddDg = false;
            } else {
              console.log('不通过');
            }
        });
      },
      // 打开在押机构信息编辑窗口
      openEditDetaineesEle(obj) {
        let isEditing = false;
        this.detaineesList.forEach((v) => {
          if (v.showEle) {
            isEditing = true;
          }
        });
        if (this.detaineesAddDg || isEditing) {
          this.confirmFn('请先完成正在编辑的表格', 'error');
          return;
        }
        this.$set(obj, 'showEle', true);
        this.detaineesEdit = JSON.parse(JSON.stringify(obj));
      },
      // 关闭共享人编辑窗口
      closeDetaineesEdit(obj) {
        this.$set(obj, 'showEle', false);
        this.detaineesEdit = {};
      },
      // 保存在押机构信息编辑
      saveDetaineesEdit(formName, index) {
        this.$refs[formName][0].validate((valid) => {
          if (valid) {
            this.$set(this.detaineesEdit, 'showEle', false);
            this.detaineesList[index] = JSON.parse(JSON.stringify(this.detaineesEdit));
            this.detaineesEdit = {};
          } else {
            console.log('error');
          }
        });
      },
      // 删除在押机构信息项
      deleteDetainees(index) {
        this.confirmFn('是否删除该条信息！', 'warning')
          .then(() => {
            if (!this.detaineesList[index].id) {
              this.detaineesList.splice(index, 1);
              return;
            }
            this.$MyFetch.get(aprAudApi.completeProduct.deletCoowner + this.detaineesList[index].id)
              .then(data => {
                this.confirmFn('删除成功', 'success');
                this.detaineesList.splice(index, 1);
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
      // 保存
      saveHouse() {
        this.$refs.houseForm.validate((valid) => {
          if (valid) {
            if (!this.saveHouseValid()) {
              return;
            }
            let addressCode = this.houseEdit.addressCode;
            let data = {
              aplEstateInfo: {
                incomeInd: this.houseEdit.incomeInd,
                estateNum: this.houseEdit.estateNum,
                applicationId: this.applicationId,
                addressCode: addressCode[addressCode.length - 1],
                addressDesc: this.houseEdit.addressDesc,
                estateTypeCode: this.houseEdit.estateTypeCode,
                obtainDate: this.houseEdit.obtainDate,
                mortgageInd: this.houseEdit.mortgageInd,
                coownersCnt: this.houseEdit.coownersCnt,
                houseSizeMeas: this.houseEdit.houseSizeMeas,
                slAverageAmt: this.houseEdit.slAverageAmt,
                fxtAverageAmt: this.houseEdit.fxtAverageAmt,
                inputAverageAmt: this.houseEdit.inputAverageAmt,
                totalPriceAmt: this.houseEdit.totalPriceAmt,
                propertySharePercent: this.houseEdit.propertySharePercent,
                id: this.houseId
              },
              aplEstateSupplement: {
                estateNum: this.houseEdit.estateNum,
                applicationId: this.applicationId,
                houseYearCnt: this.houseEdit.houseYearCnt,
                houseType: this.houseEdit.houseType,
                rentConditionDesc: this.houseEdit.rentConditionDesc,
                yfAverageAmt: this.houseEdit.yfAverageAmt,
                yfTotalAmt: this.houseEdit.yfTotalAmt,
                slTotalAmt: this.houseEdit.slTotalAmt,
                fxtTotalAmt: this.houseEdit.fxtTotalAmt,
                projectName: this.houseEdit.projectName,
                secondMortgageInd: this.houseEdit.secondMortgageInd,
                landType: this.houseEdit.landType,
                usUfructType: this.houseEdit.usUfructType,
                otherEstateCd: this.houseEdit.otherEstateCd,
                otherEstateType: this.houseEdit.otherEstateType,
                completedDt: this.houseEdit.completedDt,
                estateStructure: this.houseEdit.estateStructure,
                commonCondition: this.houseEdit.commonCondition,
                pledgeDt: this.houseEdit.pledgeDt
              },
              aplEstateCoownerList: this.coownerList,
              aplEstateDetaineesList: this.detaineesList
            };
            if (!this.estateNum) {
              this.saveHouseApi(data);
            } else {
              data.estateNum = this.estateNum;
              this.saveEditHouseApi(data);
            }
          } else {
            this.$error("请完善信息！");
          }
        });
      },
      saveHouseValid() {
        let isEditing = false;
        this.coownerList.forEach((v) => {
          if (v.showEle) {
            isEditing = true;
          }
        });
        if ((this.coownerAddDg && this.houseEdit.coownersCnt !== '0') || isEditing) {
          this.confirmFn('请先完成正在编辑共有人信息表格', 'error');
          return false;
        }
        if (this.coownerList.length !== (this.houseEdit.coownersCnt - 1)) {
          this.confirmFn(`当前房产共有人数为${this.houseEdit.coownersCnt},共有人信息应为${this.houseEdit.coownersCnt - 1}条`, 'error');
          return false;
        }
        let areaPercent = this.houseEdit.propertySharePercent - 0;
        this.coownerList.forEach((v) => {
          areaPercent += v.propertySharePercent - 0;
        });
        if (areaPercent !== 100) {
          console.log(areaPercent);
          this.confirmFn('房产共有人产权份额之和不为100%');
          return false;
        }
        return true;
      },
      saveHouseApi(data) {
        this.$MyFetch.post(aprAudApi.dadao.aplEstateInfo, data)
         .then(() => {
           this.confirmFn('保存成功！', 'success');
           this.close();
         })
         .catch(err => {
           console.log(err);
           this.$error(err.message);
         });
      },
      saveEditHouseApi(data) {
        this.$MyFetch.post(aprAudApi.dadao.aplEstateInfo, data)
          .then(() => {
            this.confirmFn('更新成功！', 'success');
            this.close();
          })
          .catch(err => {
            console.log(err);
            this.$error(err.message);
          });
      },
      // 获取房屋信息
      getHouseMessage(id) {
        this.$MyFetch.get(aprAudApi.dadao.getHourseMessage.replace("{applicationId}", this.applicationId).replace("{estateNum}", id))
          .then((data = {}) => {
            if (data) {
              this.coownerList = data.aplEstateCoownerList;
              this.detaineesList = data.aplEstateDetaineesList;
              data.aplEstateInfo.addressCode = this.getAddressArr(data.aplEstateInfo.addressCode, this.areaList);
              this.houseEdit = Object.assign({}, data.aplEstateSupplement, data.aplEstateInfo);
              if (this.houseEdit.incomeInd === null || this.houseEdit.incomeInd === undefined) {
                this.houseEdit.incomeInd = true;
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      formatTime(time) {
        if (time) {
          return this.$Moment(time).format("YYYY-MM-DD");
        }
      },
      // 获取对应字典项目
      getLibraryValue(library, key) {
        return library[key];
      },
      // 检查房产证编号是否存在
      checkHasExist(rule, value, callback) {
        var hasExist = false;
        if (this.houseId) {
          this.houseIdList.forEach((v) => {
            if (this.currentEstateNum !== v && v === value) { // 如果不为自己的id 同时又与别人的id 相同
              hasExist = true;
            }
          });
        } else {
          this.houseIdList.forEach((v) => {
            if (value === v) {
              hasExist = true;
            }
          });
        }
        if (hasExist) {
          return callback(new Error('房产证编号已存在!'));
        } else {
          callback();
        }
      }
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .el-date-editor.el-input {
    width: 100%;
  }
  .el-table {
    /deep/ .el-table__body-wrapper {
      height: auto;
    }
  }
  .table__box1, .table__box2 {
    /deep/ .el-input__inner {
      padding: 4px;
      font-size: 12px;
    }
  }
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
          box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
          .dialog-box__middle-top {
            padding-bottom: 20px;
            border-bottom: 1px solid #E9E9E9;
            margin-bottom: 20px;
            .title {
              font-size: 16px;
              .icon__gan {
                margin-right: 10px;
              }
            }
            .font-weight{
              font-weight: bold;
              margin-right: 10px;
              font-size: 15px;
            }
            .isWhether{
                  position: absolute;
                  top: 10px;
                  right: 50px;
              /deep/.el-form-item{
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
            .el-form-item {
              width: 32%;
              padding-right: 40px;
              margin-right: 0;
            }
          }
        }
        .form__bottom {
          text-align: center;
          padding-bottom: 20px;
        }
        .dialog__table-form-box{
          font-size: 12px;
          .table__box1 {
            .table__tr {
              .table__th, .table__td {
                width: 12.5%;
              }
            }
          }
          .table__box2 {
            .table__tr {
              .table__th, .table__td {
                width: 8.33%
              }
            }
          }
          .table__box{
            border: 1px solid @line-color;
            border-radius: 4px;
            .table__head{
              .table__tr{
                width: 100%;
                .table__th{
                  // min-width: 120px;
                }
              }
            }
            .table__body{
              .table__tr{
                .table__tr__top-list{
                  .table__td{
                    // min-width: 135px;
                  }
                }
                .table__tr__bottom-list{
                  .table__form-item{
                    padding: 0 10px;
                  }
                  .operate-box{
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
