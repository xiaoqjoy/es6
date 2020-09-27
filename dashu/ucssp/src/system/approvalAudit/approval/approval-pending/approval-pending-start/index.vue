
<style lang='less' src="./approval-pending-start.less" scoped></style>
<style lang='less' scoped>
/deep/.el-table__body-wrapper {
  overflow-y: scroll;
}
.jump-hookend {
  margin-top: 0;
  padding-bottom: 600px;
}
.tab-box {
  height: 40px;
  padding-left: 20px;
  border: 1px solid #e9e9e9;
  border-bottom: none;
  /deep/ .el-tabs__item {
    font-size: 12px;
  }
  /deep/ .el-tabs__nav-wrap {
    padding: 0;
    background: none;
  }
  /deep/ .el-tabs__item.is-active {
    font-size: 12px;
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
.dialog__table-box {
  table {
    width: 100%;
    border: 1px solid #e9e9e9;
    text-align: center;
    th {
      height: 60px;
      background: @bg-gray;
      line-height: 20px;
      color: #666;
      min-width: 80px;
      border-bottom: 1px solid #d0d0d0;
      font-size: 12px;
      vertical-align: middle;
    }
    td {
      font-size: 14px;
      vertical-align: middle;
      text-align: center;
      .operate-box {
        .icon {
          line-height: 60px;
          color: #538bf1;
          font-weight: 900;
          padding: 0 1px;
        }
        .icon__edit:after {
          height: 60px;
        }
      }
    }
  }
}
.customer-message {
  .tab-box {
    /deep/ .el-tabs__content {
      overflow: visible;
    }
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
    right: 2%;
    top: -59px;
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
.aaa {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 999;
  margin-top: -95px;
  margin-left: -220px;
}
.risk-input-control {
  padding: 15px 0 25px 25px;
  text-align: left;
  overflow: hidden;
  .input-control {
    float: left;
    margin-right: 10%;
    margin-bottom: 20px;
    label,
    span {
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      color: #2b2826;
    }
    .el-input {
      width: 160px;
      vertical-align: middle;
    }
    span {
      color: #666;
    }
    .is-required {
      margin: 0;
    }
  }
  .width700 {
    /deep/.el-input__inner{
      width: 700px;
    }
  }
  .input-control-left50 {
    margin-left: 50px;
  }
  .submit-control {
    clear: both;
    padding-top: 15px;
  }
  .dadaoNum{
    /deep/.el-form-item__error{
      left: 87px;
    }
  }
}
</style>

<template>
  <div>
    <div class="aaa">
      <div class="audit_box">
        <div class="audit_top">
          <div class="backAudit">
            <!-- <div v-if="isFromList">
              <router-link
                to="/system/approvalAudit/approval/approval-pending"
                class="blue_font bold"
              >待处理</router-link>
              <span class="el-icon-arrow-left"></span>
              <span class="black_font">审批</span>
            </div> -->
            <!-- 影像资料备注 -->
            <div class="image_blue">
              <!-- <el-button
                class="sytCBlue"
                v-if="isEdit"
                type="text"
                @click="openImagePlatform('approval', isEdit, '贷款审批')"
              >影像资料</el-button>
              <el-button
                class="sytCBlue"
                v-else
                type="text"
                @click="$showImage(applicationId, '贷款审批')"
              >影像资料</el-button> -->
              <el-button
                class="sytCBlue"
                v-if="!isPlusLoan"
                type="text"
                @click="openImagePlatform('approval', isEdit, '贷款审批')"
              >影像资料</el-button>
              <el-button
                class="sytCBlue"
                v-if="isPlusLoan"
                type="text"
                @click="$showImage(applicationId, '贷款审批', {ReadOnly: comeFrom !== 'pending' ? '0': undefined, menuId: 'approvalAudit/approval/pulsLoan'})"
              >影像资料</el-button>
              <el-button type="text" class="sytCBlue" @click="alert_remark()">备注</el-button>
              <el-button type="text" class="sytCBlue" @click="alert_patchBolt()" :disabled="showBORF">补件</el-button>
              <el-button type="text" class="sytCBlue" @click="alert_survey()">调查</el-button>
            </div>
          </div>
          <div class="content top_num clearfloat">
            <div class="top_conten">
              <span class="top_conten_title">申请编号：</span>
              <span class="top_content_font">{{promptInfo.applicationId}}</span>
            </div>
            <div class="top_conten">
              <span class="top_conten_title">主借款人：</span>
              <span class="top_content_font">{{promptInfo.custName}}</span>
            </div>
            <div class="top_conten">
              <span class="top_conten_title">所属个贷服务中心：</span>
              <span class="top_content_font">{{promptInfo.serviceName}}</span>
            </div>
            <div class="top_conten">
              <span class="top_conten_title">申请金额：</span>
              <span class="top_content_money">{{promptInfo.applicationSubmitAmt}}</span>
            </div>
            <div class="top_conten">
              <span class="top_conten_title">面签类型：</span>
              <span class="top_content_font">{{promptInfo.f2fTypeCode}}</span>
            </div>
            <div class="top_conten">
              <span class="top_conten_title">产品1：</span>
              <span class="top_content_font">{{promptInfo.productName1}}</span>
            </div>
            <div class="top_conten">
              <span class="top_conten_title">业务评分1：</span>
              <span class="top_content_font">{{promptInfo.riskLevel1}}</span>
            </div>
            <div class="top_conten">
              <span class="top_conten_title">产品2：</span>
              <span class="top_content_font">{{promptInfo.productName2 || "-"}}</span>
            </div>
            <div class="top_conten">
              <span class="top_conten_title">业务评分2：</span>
              <span class="top_content_font">{{promptInfo.riskLevel2 || "-"}}</span>
            </div>
            <div class="top_conten">
              <span class="top_conten_title">授权原因：</span>
              <span class="top_content_font" v-if="promptInfo.authReasonCode">{{getDescFromCode(authReasonArr, promptInfo.authReasonCode)}}</span>
            </div>
            <div class="top_conten">
              <span class="top_conten_title">审批模式：</span>
              <span class="top_content_font">{{getDescFromCode(dictLib.approve_mode, promptInfo.approveModeCd)}}</span>
            </div>
            <div class="top_conten">
              <span class="top_conten_title">当前阶段：</span>
              <span class="top_content_font">{{getDescFromCode(dictLib.task_def_key, promptInfo.taskNodeCode)}}</span>
            </div>
            <!-- <div class="contentHr"></div>
            <div class="clearfloat" style="margin-bottom: 10px">
              <div class="grade_all">
                <div class="grade">
                </div>
              </div>
            </div> -->
          </div>
          <!-- 保存提交按钮 -->
          <div class="clearfloat content_btn">
            <div class="grade">
              <span class="black_font bold">业务状态：</span>
              <span class="black_font">{{surveyState}}</span>
              <span v-if="surveyState && surveyStatus">/</span>
              <span class="black_font">{{surveyStatus}}</span>
            </div>
            <div class="tail_btn" v-if="!isSourceSurvey">
              <!-- <el-button
                class="small-btn sytCall"
                style="width:140px"
                @click="alert_phone_check()"
              >拨打电话</el-button> -->
              <el-button
                class="sytBYellow"
                :disabled="(isEdit && plusEmailStatus !== 'send_success') || comeFrom !== 'pending'"
                type="warning"
                style="width:140px"
                @click="saveOperAll()"
              >保存</el-button>
              <el-button
                :disabled="!riskAble || (isEdit && plusEmailStatus !== 'send_success') || comeFrom !== 'pending'"
                type="success"
                style="width:140px"
                @click="riskPara('saveOper')">测算保存</el-button>
              <el-button
                class="sytBBlue"
                :disabled="(isEdit && plusEmailStatus !== 'send_success') || comeFrom !== 'pending'"
                type="primary"
                style="width:140px"
                @click="alert_submitA()"
              >提交</el-button>
            </div>
          </div>
        </div>
        <div class="audit_bottom" id="test1">
          <!-- <el-row style="margin-right:0" :gutter="10"> -->
          <!-- 左侧导航栏 -->
          <!-- <el-col :span="3"> -->
          <div class="grid-content bg-purple">
            <div class="content content_nav">
              <a
                href="javascript:void(0)"
                @click="goAnchor('anchot-' + index, index)"
                v-for="(item, index) in navTitle"
                :key="index"
                v-if="!dynamicColumn(index)"
                :class="{'active' : curIndex === index}"
              >
                <div
                  :class="{'sytCBlue':curIndex === index,'black_font': true,'bold': true}"
                >{{item}}</div>
              </a>
            </div>
          </div>
          <!-- </el-col> -->
          <!-- 主内容 -->
          <!-- <el-col class="content_box"> -->
          <div class="audit_bottom_content grid-content bg-purple" style="margin-bottom: 60px">
            <div class="content_right_box">
              <!-- 规则检测 -->
              <div class="content_border jump-hook" id="selfGo-0" v-if="!isSourceSurvey">
                <div class="content_title_head" :class="{'active__title' : curIndex === 0}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-0">规则检测</span>
                </div>
                <!-- <div class="content"> -->
                <!-- 规则检测 -->
                <div class="content">
                  <el-table
                    :data="ruleDetection"
                    class="tables tables_width"
                    max-height="200"
                    :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#ececec'}"
                  >
                    <el-table-column label="序号" type="index"></el-table-column>
                    <!-- <el-table-column prop="ruleDecisionResult" label="决策结果"></el-table-column> -->
                    <el-table-column width="100" label="决策结果">
                      <template slot-scope="scope">
                        <span
                          :class="{sytCRed: (scope.row.ruleDecisionResult === '拒绝')}"
                        >{{ scope.row.ruleDecisionResult }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column width="300" prop="rulesetName" label="规则集名称"></el-table-column>
                    <el-table-column width="300" prop="ruleName" label="规则名称"></el-table-column>
                    <el-table-column label="规则触发原因">
                      <template slot-scope="scope">
                        <span :style="getFontColor(scope.row.newInd, scope.row.veto) && ('color:' + getFontColor(scope.row.newInd, scope.row.veto))">{{ scope.row.ruleTriggerReason }}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <!-- </div> -->
              </div>
              <!-- 个人信息 -->
              <div class="content_border jump-hook" id="selfGo-1">
                <div class="content_title_head" :class="{'active__title' : curIndex === 1}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-1">个人信息</span>
                </div>
                <div class="content">
                  <div class="clearfloat">
                    <div class="top_conten">
                      <span class="top_conten_title">姓名：</span>
                      <span class="top_content_font">{{ruleForm.custName}}</span>
                    </div>
                    <div class="top_conten">
                      <span class="top_conten_title">身份证号：</span>
                      <span class="top_content_font">{{ruleForm.certificateNum}}</span>
                    </div>
                    <div class="top_conten">
                      <span class="top_conten_title">性别：</span>
                      <span class="top_content_font">{{ruleForm.genderCode}}</span>
                    </div>
                    <!-- <div class="top_conten">
                      <span class="top_conten_title">户籍详细地址：</span>
                      <span class="top_content_font">{{ruleForm.registeredAddressDesc}}</span>
                    </div> -->
                    <div class="top_conten" v-if="!isCX">
                      <span class="top_conten_title">居住地区：</span>
                      <span class="top_content_font">{{residential}}</span>
                    </div>
                    <div class="top_conten">
                      <span class="top_conten_title">客户类型：</span>
                      <span class="top_content_font">{{careerTypeCode}}</span>
                    </div>
                    <div class="top_conten" v-if="!isCX">
                      <span class="top_conten_title">户籍所在地：</span>
                      <span class="top_content_font">{{Address}}</span>
                    </div>
                  </div>
                  <div class="input_box">
                    <el-form
                      :model="ruleForm"
                      :rules="infoRules"
                      ref="ruleForm"
                      label-width="100px"
                      class="demo-ruleForm text_left"
                      label-position="top"
                    >
                      <el-form-item label="居住地区：" prop="houseAddressCode" v-if="isCX" class="is-required">
                        <el-cascader
                          clearable
                          :options="options"
                          v-model="ruleForm.houseAddressCode"
                        ></el-cascader>
                      </el-form-item>
                      <el-form-item label="户籍所在地：" prop="registeredAddressCode" v-if="isCBHB || isCX" class="is-required">
                        <el-cascader
                          clearable
                          :options="options"
                          v-model="ruleForm.registeredAddressCode"
                        ></el-cascader>
                      </el-form-item>
                      <el-form-item label="婚姻状况" prop="maritalStatusCode">
                        <el-select
                          :disabled="isEdit"
                          clearable
                          @change="changeMarrie"
                          style="width: 100%"
                          v-model="ruleForm.maritalStatusCode"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="items in maritalStatus"
                            :key="items.itemCode"
                            :label="items.itemDesc"
                            :value="items.itemCode"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="配偶姓名" prop="spouseName" class="is-required">
                        <input
                          type="text"
                          maxlength="30"
                          v-model.lazy="ruleForm.spouseName"
                          :disabled="!(ruleForm.maritalStatusCode === '20' || ruleForm.maritalStatusCode === '22')||isEdit"
                          autocomplete="off"
                          :class="{'self-is-disabled': !(ruleForm.maritalStatusCode === '20' || ruleForm.maritalStatusCode === '22')||isEdit, 'el-input__inner': true}"
                          @blur="verify('ruleForm', 'spouseName')"
                        />
                      </el-form-item>
                      <el-form-item label="配偶证件类型" prop="spouseIdTypeCode" class="is-required">
                        <el-select
                          clearable
                          style="width: 100%"
                          v-model="ruleForm.spouseIdTypeCode"
                          :disabled="!(ruleForm.maritalStatusCode === '20' || ruleForm.maritalStatusCode === '22') || hasSubmit||isEdit"
                        >
                          <el-option
                            v-for="items in certificateType"
                            :key="items.itemCode"
                            :label="items.itemDesc"
                            :value="items.itemCode"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="配偶证件号码" prop="spouseIdNum" class="is-required">
                        <input
                          type="text"
                          maxlength="50"
                          v-model.lazy="ruleForm.spouseIdNum"
                          :disabled="!(ruleForm.maritalStatusCode === '20' || ruleForm.maritalStatusCode === '22') || isEdit"
                          autocomplete="off"
                          :class="{'el-input__inner': true, 'self-is-disabled': !(ruleForm.maritalStatusCode === '20' || ruleForm.maritalStatusCode === '22') || isEdit}"
                          @blur="verify('ruleForm', 'spouseIdNum')"
                        />
                      </el-form-item>
                      <el-form-item label="居住状况" prop="houseConditionCode" v-if="!isPlusLoan">
                        <el-select
                          :disabled="isEdit || isCBHB"
                          clearable
                          style="width: 100%"
                          v-model="ruleForm.houseConditionCode"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="items in houseCondition"
                            :key="items.itemCode"
                            :label="items.itemDesc"
                            :value="items.itemCode"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="微信号" prop="wechatNum" v-if="!isPlusLoan">
                        <input
                          type="text"
                          v-model.lazy="ruleForm.wechatNum"
                          :disabled="isEdit"
                          autocomplete="off"
                          :class="{'el-input__inner': true, 'self-is-disabled': isEdit}"
                          @blur="verify('ruleForm', 'wechatNum')"
                        />
                      </el-form-item>
                      <el-form-item label="户籍详细地址" class="is-required" prop="registeredAddressDesc">
                        <input
                          type="text"
                          maxlength="100"
                          v-model.lazy="ruleForm.registeredAddressDesc"
                          :disabled="isEdit"
                          autocomplete="off"
                          :class="{'el-input__inner': true, 'self-is-disabled': isEdit}"
                          @blur="verify('ruleForm', 'registeredAddressDesc')"
                        />
                      </el-form-item>
                      <el-form-item label="居住详细地址" class="is-required" prop="houseAddressDesc">
                        <input
                          type="text"
                          maxlength="100"
                          v-model.lazy="ruleForm.houseAddressDesc"
                          :disabled="isEdit || isCBHB"
                          autocomplete="off"
                          :class="{'el-input__inner': true, 'self-is-disabled': isEdit}"
                          @blur="verify('ruleForm', 'houseAddressDesc')"
                        />
                      </el-form-item>
                      <el-form-item label="占股情况" class="marginL30" prop="sharePercent">
                        <el-select
                          :disabled="!(ruleForm.careerTypeCode==='060')||isEdit"
                          clearable
                          style="width: 100%"
                          v-model="ruleForm.sharePercent"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="items in percentCondition"
                            :key="items.itemCode"
                            :label="items.itemDesc"
                            :value="items.itemCode"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item
                        :style="{'margin-left':'30px', 'width': '100px'}"
                        :class="{'is-required': !showBORF}"
                        label="是否注册"
                        prop="registeredInd"
                      >
                        <el-switch
                          :disabled="!(ruleForm.careerTypeCode==='060')||isEdit"
                          v-model="ruleForm.registeredInd"
                          active-text="是"
                          inactive-text="否"
                          :width="50"
                        ></el-switch>
                      </el-form-item>
                      <el-form-item
                        label="是否有本地房产"
                        :class="{'is-required': !showBORF}"
                        prop="localEstateInd"
                        :style="{'width': '100px'}"
                      >
                        <el-switch
                          :disabled="isEdit || isCBHB"
                          v-model="ruleForm.localEstateInd"
                          active-text="是"
                          inactive-text="否"
                          :width="50"
                        ></el-switch>
                      </el-form-item>
                      <el-form-item
                        label="6个月内是否正常缴纳公积金"
                        :class="{'is-required': !showBORF}"
                        prop="houseFund6mInd"
                        :style="{'width': '300px'}"
                      >
                        <el-switch
                          :disabled="isEdit"
                          v-model="ruleForm.houseFund6mInd"
                          active-text="是"
                          inactive-text="否"
                          :width="50"
                        ></el-switch>
                      </el-form-item>
                      <el-form-item
                        label="大道定价类型"
                        :required="true"
                        prop="dadaoPricingGrade"
                        v-if="isDadao"
                      >
                        <el-select
                          :disabled="isEdit"
                          clearable
                          style="width: 100%"
                          v-model="ruleForm.dadaoPricingGrade"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="items in dadaoPricingGrade"
                            :key="items.itemCode"
                            :label="items.itemDesc"
                            :value="items.itemCode"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </div>
              <!-- 单位信息 -->
              <div class="content_border jump-hook" id="selfGo-2">
                <div class="content_title_head" :class="{'active__title' : curIndex === 2}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-2">单位信息</span>
                </div>
                <div class="content" style="padding:10px 0 0 0">
                  <div class="clearfix" v-if="!isPlusLoan">
                    <!-- <div class="top_conten">
                          <span class="top_conten_title">单位地区：</span>
                          <span class="top_content_font">{{workplaceName}}</span>
                    </div>-->
                    <div class="top_conten">
                      <span class="top_conten_title">行业名称1：</span>
                      <span class="top_content_font">{{workInfo.industryName1}}</span>
                    </div>
                    <div class="top_conten">
                      <span class="top_conten_title">行业名称2：</span>
                      <span class="top_content_font">{{workInfo.industryName2}}</span>
                    </div>
                    <div class="top_conten">
                      <span class="top_conten_title">所在部门：</span>
                      <span class="top_content_font">{{workInfo.departmentName}}</span>
                    </div>
                    <div class="top_conten">
                      <span class="top_conten_title">职务名称：</span>
                      <span class="top_content_font">{{workInfo.jobTitle}}</span>
                    </div>
                  </div>
                  <div class="input_box">
                    <el-form
                      :model="ruleWorkInfo"
                      :rules="workRules"
                      ref="ruleWorkInfo"
                      label-width="100px"
                      class="demo-ruleWorkInfo text_left"
                      label-position="top"
                    >
                      <el-form-item label="单位地区" class="is-required" prop="workAddressCode">
                        <el-cascader
                          clearable
                          :options="options"
                          v-model="ruleWorkInfo.workAddressCode"
                        ></el-cascader>
                      </el-form-item>
                      <el-form-item label="单位名称" class="is-required" prop="workplaceName">
                        <input
                          type="text"
                          maxlength="100"
                          v-model.lazy="ruleWorkInfo.workplaceName"
                          :disabled="isEdit"
                          autocomplete="off"
                          :class="{'el-input__inner': true, 'self-is-disabled': isEdit}"
                          @blur="verify('ruleWorkInfo', 'workplaceName')"
                        />
                      </el-form-item>
                      <el-form-item label="详细单位地址" class="is-required" prop="workAddressDesc">
                        <input
                          type="text"
                          maxlength="100"
                          v-model.lazy="ruleWorkInfo.workAddressDesc"
                          :disabled="isEdit"
                          autocomplete="off"
                          :class="{'el-input__inner': true, 'self-is-disabled': isEdit}"
                          @blur="verify('ruleWorkInfo', 'workAddressDesc')"
                        />
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </div>
              <!-- 联系人信息 -->
              <div class="content_border jump-hook" id="selfGo-3" v-if="!isSourceSurvey">
                <div class="content_title_head" :class="{'active__title' : curIndex === 3}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-3">联系人信息</span>
                </div>
                <div class="content">
                  <div class="list_box">
                    <div class="list list_title">
                      <el-row class="line">
                        <el-col :span="2">
                          <div class="grid-content bg-purple">姓名</div>
                        </el-col>
                        <el-col :span="3">
                          <div class="grid-content bg-purple-light">与借款人关系</div>
                        </el-col>
                        <el-col :span="3">
                          <div class="grid-content bg-purple">联系电话</div>
                        </el-col>
                        <el-col :span="remarkRatio">
                          <div class="grid-content bg-purple-light">备注信息1</div>
                        </el-col>
                        <el-col :span="remarkRatio2">
                          <div class="grid-content bg-purple-light">备注信息2</div>
                        </el-col>
                        <el-col :span="2">
                          <div class="grid-content bg-purple-light">是否手动添加</div>
                        </el-col>
                        <el-col :span="4">
                          <div class="grid-content bg-purple">操作</div>
                        </el-col>
                      </el-row>
                    </div>
                    <div
                      class="list"
                      :style="{'max-height': '300px', 'overflow-y': 'scroll', 'padding-top': '20px'}"
                    >
                      <el-row
                        class="line item"
                        v-if="list.length > 0"
                        v-for="(item, index) in list"
                        :key="index"
                      >
                        <el-form
                          :model="item"
                          :ref="'list'+index"
                          label-width="100px"
                          :rules="contactRules"
                          label-position="top"
                        >
                          <el-col :span="2">
                            <div class="grid-content bg-purple">
                              <el-form-item prop="phoneCheckName">
                                <input
                                  type="text"
                                  maxlength="30"
                                  v-model.lazy="item.phoneCheckName"
                                  :disabled="isEdit || (item.contactRelationCode==='0000')?true:false || item.phoneCheckInd"
                                  autocomplete="off"
                                  :class="{'el-input__inner': true, 'self-is-disabled': isEdit || (item.contactRelationCode==='0000')?true:false || item.phoneCheckInd}"
                                  @blur="verifyArray('list', index, 'phoneCheckName')"
                                />
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="3">
                            <el-form-item prop="contactRelationCode">
                              <el-select
                                :disabled="isEdit || (item.contactRelationCode==='0000')?true:false || item.phoneCheckInd"
                                clearable
                                v-model="item.contactRelationCode"
                                @change="changeRelation(index)"
                                placeholder="请选择"
                              >
                                <el-option
                                  v-for="items in contactRelationShip"
                                  :key="items.itemCode"
                                  :label="items.itemDesc"
                                  :value="items.itemCode"
                                  :disabled="items.disabled || (items.itemCode==='0000')?true:false"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="3">
                            <div class="grid-content bg-purple">
                              <el-form-item prop="phoneCheckPhoneNum">
                                <input
                                  type="text"
                                  maxlength="20"
                                  v-model.lazy="item.phoneCheckPhoneNum"
                                  :disabled="isEdit || (item.contactRelationCode==='0000')?true:false || item.phoneCheckInd || item.disabled"
                                  autocomplete="off"
                                  :class="{'el-input__inner': true, 'self-is-disabled': isEdit || (item.contactRelationCode==='0000')?true:false || item.phoneCheckInd || item.disabled}"
                                  @blur="verifyArray('list', index, 'phoneCheckPhoneNum')"
                                />
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="remarkRatio">
                            <div class="grid-content bg-purple-light">
                              <el-form-item prop="approveRemarkTxt">
                                <input
                                  v-if="!isEdit"
                                  maxlength="500"
                                  v-model.lazy="item.approveRemarkTxt"
                                  :disabled="isEdit"
                                  autocomplete="off"
                                  class="el-input__inner CallRemarkTxt"
                                  :class="{'el-input__inner': true, 'self-is-disabled': isEdit, 'CallRemarkTxt': true}"
                                  @blur="verifyArray('list', index, 'approveRemarkTxt')"
                                />
                                <el-input
                                  v-else
                                  resize="none"
                                  type="textarea"
                                  autosize
                                  class="CallRemarkTxt"
                                  :disabled="isEdit"
                                  maxlength="500"
                                  v-model="item.approveRemarkTxt"
                                />
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="remarkRatio2">
                            <div class="grid-content bg-purple-light">
                              <el-form-item prop="auditRemarkTxt">
                                <p class="CallRemarkTxt">{{item.auditRemarkTxt || "-"}}</p>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="2">
                            <div class="grid-content bg-purple-light">
                              <el-form-item>
                                <p class="text__center">{{item.apraudAddedInd ? '是' : '否'}}</p>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="4">
                            <el-button
                              class="sytCBlue"
                              :disabled="isEdit"
                              @click="makePhone('list' + index, item, index, 'list')"
                              type="text"
                            >拨打</el-button>
                            <el-button
                              class="sytCBlue"
                              @click="alert_phone_video(item.id)"
                              type="text"
                            >查询录音</el-button>
                            <el-button
                              class="sytCBlue"
                              :disabled="isEdit || item.phoneCheckInd"
                              @click="deleteContact(index, 'list')"
                              type="text"
                            >删除</el-button>
                          </el-col>
                          <input
                            v-if="(item.showTxt1 && !(isEdit || !appOrAud))"
                            maxlength="500"
                            :disabled="isEdit || !appOrAud"
                            :class="{'txt': true,'el-input__inner': true, 'self-is-disabled': isEdit || !appOrAud}"
                            v-model.lazy="item.aprPhoneCheckRemark"
                            placeholder="请填写审批备注"
                          >
                          <el-input
                            resize="none"
                            type="textarea"
                            autosize
                            v-if="(item.showTxt1 && (isEdit || !appOrAud))"
                            :title="item.aprPhoneCheckRemark"
                            maxlength="500"
                            :disabled="isEdit || !appOrAud"
                            class="txt"
                            v-model="item.aprPhoneCheckRemark"
                            placeholder="请填写审批备注"
                          ></el-input>
                          <input
                            v-if="item.showTxt2 && !(isEdit  || appOrAud)"
                            maxlength="500"
                            :disabled="isEdit || appOrAud"
                            :class="{'txt': true, 'el-input__inner': true, 'self-is-disabled': isEdit || appOrAud}"
                            v-model.lazy="item.audPhoneCheckRemark"
                            placeholder="请填写审计备注"
                          >
                          <el-input
                            resize="none"
                            type="textarea"
                            autosize
                            :title="item.audPhoneCheckRemark"
                            v-if="item.showTxt2 && (isEdit  || appOrAud)"
                            maxlength="500"
                            :disabled="isEdit  || appOrAud"
                            class="txt"
                            v-model="item.audPhoneCheckRemark"
                            placeholder="请填写审计备注"
                          ></el-input>
                        </el-form>
                      </el-row>
                      <el-button
                        :disabled="isEdit"
                        class="my_table_btn sytCBlue"
                        @click="addContactPerson('list')"
                      >+</el-button>
                      <el-button
                        class="my_table_btn sytCBlue"
                        :disabled="isEdit"
                        type="primary"
                        :style="{width:'100px',height:'30px','margin':'0 0 20px 20px'}"
                        @click="saveContact('list')"
                      >保存</el-button>
                    </div>
                  </div>
                  <!-- 人行手机 -->
                  <div class="list_box">
                    <div class="list list_title">
                      <el-row class="line">
                        <el-col :span="2">
                          <div class="grid-content bg-purple">姓名</div>
                        </el-col>
                        <el-col :span="3">
                          <div class="grid-content bg-purple-light">与借款人关系</div>
                        </el-col>
                        <el-col :span="3">
                          <div class="grid-content bg-purple">联系电话</div>
                        </el-col>
                        <el-col :span="remarkRatio">
                          <div class="grid-content bg-purple-light">备注信息1</div>
                        </el-col>
                        <el-col :span="remarkRatio2">
                          <div class="grid-content bg-purple-light">备注信息2</div>
                        </el-col>
                        <el-col :span="2">
                          <div class="grid-content bg-purple-light">是否手动添加</div>
                        </el-col>
                        <el-col :span="4">
                          <div class="grid-content bg-purple">操作</div>
                        </el-col>
                      </el-row>
                    </div>
                    <div
                      class="list"
                      :style="{'max-height': '300px', 'overflow-y': 'scroll', 'padding-top': '20px'}"
                    >
                      <el-row
                        class="line item"
                        v-if="onelist.length > 0"
                        v-for="(item, index) in onelist"
                        :key="index"
                      >
                        <el-form
                          :model="item"
                          :ref="'onelist'+index"
                          label-width="100px"
                          :rules="contactRules"
                          label-position="top"
                        >
                          <el-col :span="2">
                            <div class="grid-content bg-purple">
                              <el-form-item prop="contactName">
                                <span>人行电话</span>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="3">
                            <el-form-item prop="contactRelationCode">
                              <el-select
                                :disabled="true"
                                clearable
                                v-model="item.contactRelationCode"
                                placeholder="请选择"
                              >
                                <el-option
                                  v-for="items in relationShip"
                                  :key="items.itemCode"
                                  :label="items.itemDesc"
                                  :value="items.itemCode"
                                  :disabled="items.disabled"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="3">
                            <div class="grid-content bg-purple">
                              <el-form-item prop="phoneCheckPhoneNum">
                                <input
                                  type="text"
                                  maxlength="20"
                                  v-model.lazy="item.phoneCheckPhoneNum"
                                  :disabled="isEdit || item.phoneCheckInd || item.canEdit"
                                  autocomplete="off"
                                  :class="{'el-input__inner': true, 'self-is-disabled': isEdit || item.phoneCheckInd || item.canEdit}"
                                  @blur="verifyArray('onelist', index, 'phoneCheckPhoneNum')"
                                />
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="remarkRatio">
                            <div class="grid-content bg-purple-light">
                              <el-form-item prop="approveRemarkTxt">
                                <p class="CallRemarkTxt">{{item.approveRemarkTxt || "-"}}</p>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="remarkRatio2">
                            <div class="grid-content bg-purple-light">
                              <el-form-item prop="auditRemarkTxt">
                                <p class="CallRemarkTxt">{{item.auditRemarkTxt || "-"}}</p>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="2">
                            <div class="grid-content bg-purple-light">
                              <el-form-item>
                                <p class="text__center">{{item.apraudAddedInd ? '是' : '否'}}</p>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="4">
                            <el-button
                              class="sytCBlue"
                              :disabled="isEdit"
                              @click="makePhone('onelist' + index, item, index, 'onelist')"
                              type="text"
                            >拨打</el-button>
                            <el-button
                              class="sytCBlue"
                              @click="alert_phone_video(item.id, item)"
                              type="text"
                            >查询录音</el-button>
                            <!-- <el-button  -->
                          </el-col>
                          <input
                            v-if="(item.showTxt1 && !(isEdit || !appOrAud))"
                            maxlength="500"
                            :disabled="isEdit || !appOrAud"
                            :class="{'txt': true, 'el-input__inner': true, 'self-is-disabled': isEdit || !appOrAud}"
                            v-model.lazy="item.aprPhoneCheckRemark"
                            placeholder="请填写审批备注"
                          >
                          <el-input
                            resize="none"
                            type="textarea"
                            autosize
                            v-if="(item.showTxt1 && (isEdit || !appOrAud))"
                            :title="item.aprPhoneCheckRemark"
                            maxlength="500"
                            :disabled="isEdit || !appOrAud"
                            class="txt"
                            v-model="item.aprPhoneCheckRemark"
                            placeholder="请填写审批备注"
                          ></el-input>
                          <input
                            v-if="item.showTxt2 && !(isEdit  || appOrAud)"
                            maxlength="500"
                            :disabled="isEdit || appOrAud"
                            class="txt"
                            :class="{'txt': true, 'self-is-disabled': isEdit || appOrAud}"
                            v-model.lazy="item.audPhoneCheckRemark"
                            placeholder="请填写审计备注"
                          >
                          <el-input
                            resize="none"
                            type="textarea"
                            autosize
                            :title="item.audPhoneCheckRemark"
                            v-if="item.showTxt2 && (isEdit  || appOrAud)"
                            maxlength="500"
                            :disabled="isEdit  || appOrAud"
                            class="txt"
                            v-model="item.audPhoneCheckRemark"
                            placeholder="请填写审计备注"
                          ></el-input>
                        </el-form>
                      </el-row>
                    </div>
                  </div>
                  <!-- 第三方 -->
                  <div class="list_box">
                    <div class="list list_title">
                      <el-row class="line">
                        <el-col :span="2">
                          <div class="grid-content bg-purple">姓名</div>
                        </el-col>
                        <el-col :span="3">
                          <div class="grid-content bg-purple-light">与借款人关系</div>
                        </el-col>
                        <el-col :span="3">
                          <div class="grid-content bg-purple">联系电话</div>
                        </el-col>
                        <el-col :span="remarkRatio">
                          <div class="grid-content bg-purple-light">备注信息1</div>
                        </el-col>
                        <el-col :span="remarkRatio2">
                          <div class="grid-content bg-purple-light">备注信息2</div>
                        </el-col>
                        <el-col :span="2">
                          <div class="grid-content bg-purple-light">是否手动添加</div>
                        </el-col>
                        <el-col :span="4">
                          <div class="grid-content bg-purple">操作</div>
                        </el-col>
                      </el-row>
                    </div>
                    <div
                      class="list"
                      :style="{'max-height': '300px', 'overflow-y': 'scroll', 'padding-top': '20px'}"
                    >
                      <el-row
                        class="line item"
                        v-if="third.length > 0"
                        v-for="(item, index) in third"
                        :key="index"
                      >
                        <el-form
                          :model="item"
                          :ref="'third'+index"
                          label-width="100px"
                          :rules="contactRules"
                          label-position="top"
                        >
                          <el-col :span="2">
                            <div class="grid-content bg-purple">
                              <el-form-item prop="contactName">
                                <span>第三方</span>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="3">
                            <el-form-item prop="contactRelationCode">
                              <el-select
                                :disabled="isEdit || item.phoneCheckInd"
                                clearable
                                v-model="item.contactRelationCode"
                                @change="changeRelation(index)"
                                placeholder="请选择"
                              >
                                <el-option
                                  v-for="items in relationShip2"
                                  :key="items.itemCode"
                                  :label="items.itemDesc"
                                  :value="items.itemCode"
                                  :disabled="items.disabled"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="3">
                            <div class="grid-content bg-purple">
                              <el-form-item prop="phoneCheckPhoneNum2">
                                <input
                                  type="text"
                                  maxlength="20"
                                  v-model.lazy="item.phoneCheckPhoneNum2"
                                  :disabled="isEdit || item.phoneCheckInd"
                                  autocomplete="off"
                                  :change="thirdCall(item)"
                                  :class="{'el-input__inner': true, 'self-is-disabled': isEdit || item.phoneCheckInd}"
                                  @blur="verifyArray('third', index, 'phoneCheckPhoneNum2')"
                                />
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="remarkRatio">
                            <div class="grid-content bg-purple-light">
                              <el-form-item prop="approveRemarkTxt">
                                <p class="CallRemarkTxt">{{item.approveRemarkTxt || "-"}}</p>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="remarkRatio2">
                            <div class="grid-content bg-purple-light">
                              <el-form-item prop="auditRemarkTxt">
                                <p class="CallRemarkTxt">{{item.auditRemarkTxt || "-"}}</p>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="2">
                            <div class="grid-content bg-purple-light">
                              <el-form-item>
                                <p class="text__center">{{item.apraudAddedInd ? '是' : '否'}}</p>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="4">
                            <el-button
                              class="sytCBlue"
                              :disabled="isEdit"
                              @click="makePhone('third' + index, item, index, 'third')"
                              type="text"
                            >拨打</el-button>
                            <el-button
                              class="sytCBlue"
                              @click="alert_phone_video(item.id, item)"
                              type="text"
                            >查询录音</el-button>
                            <el-button
                              class="sytCBlue"
                              :disabled="isEdit || item.phoneCheckInd"
                              @click="deleteContact(index, 'third')"
                              type="text"
                            >删除</el-button>
                          </el-col>
                          <input
                            v-if="(item.showTxt1 && !(isEdit || !appOrAud))"
                            maxlength="500"
                            :disabled="isEdit || !appOrAud"
                            :class="{'txt': true, 'el-input__inner': true, 'self-is-disabled': isEdit || !appOrAud}"
                            v-model.lazy="item.aprPhoneCheckRemark"
                            placeholder="请填写审批备注"
                          >
                          <el-input
                            resize="none"
                            type="textarea"
                            autosize
                            v-if="(item.showTxt1 && (isEdit || !appOrAud))"
                            :title="item.aprPhoneCheckRemark"
                            maxlength="500"
                            :disabled="isEdit || !appOrAud"
                            class="txt"
                            v-model="item.aprPhoneCheckRemark"
                            placeholder="请填写审批备注"
                          ></el-input>
                          <input
                            v-if="item.showTxt2 && !(isEdit  || appOrAud)"
                            maxlength="500"
                            :disabled="isEdit || appOrAud"
                            class="txt"
                            :class="{'txt': true, 'self-is-disabled': isEdit || appOrAud}"
                            v-model.lazy="item.audPhoneCheckRemark"
                            placeholder="请填写审计备注"
                          >
                          <el-input
                            resize="none"
                            type="textarea"
                            autosize
                            :title="item.audPhoneCheckRemark"
                            v-if="item.showTxt2 && (isEdit  || appOrAud)"
                            maxlength="500"
                            :disabled="isEdit  || appOrAud"
                            class="txt"
                            v-model="item.audPhoneCheckRemark"
                            placeholder="请填写审计备注"
                          ></el-input>
                        </el-form>
                      </el-row>
                      <el-button
                        :disabled="isEdit"
                        class="my_table_btn sytCBlue"
                        @click="addContactPerson('third')"
                      >+</el-button>
                      <el-button
                        class="my_table_btn sytCBlue"
                        :disabled="isEdit"
                        type="primary"
                        :style="{width:'100px',height:'30px','margin':'0 0 20px 20px'}"
                        @click="saveContact('third')"
                      >保存</el-button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 产品信息 -->
              <div class="content_border jump-hook" id="selfGo-4" v-if="!isSourceSurvey">
                <div class="content_title_head" :class="{'active__title' : curIndex === 4}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-4">产品信息</span>
                </div>
                <div class="content">
                  <ul class="table__list">
                    <span></span>
                    <div v-if="showBORF">
                      <div class="content_mian_title">
                        <span>保单信息</span>
                      </div>
                      <li class="item">
                        <insurance-table :dictLib="dictLib" :applicationId="applicationId"></insurance-table>
                      </li>
                    </div>
                    <div class="content_mian_title">
                      <span>房产信息</span>
                    </div>
                    <li class="item">
                      <transition name="fade">
                        <div class="customer-message">
                          <el-tabs v-model="TabActiveName" class="tab-box">
                            <el-tab-pane label="房产信息" name="first"></el-tab-pane>
                            <el-tab-pane label="担保人信息" name="second"></el-tab-pane>
                            <el-tab-pane label="共借人信息" name="third" v-if="isDadao"></el-tab-pane>
                            <span class="button add__btn" v-if="!isEdit" @click="openMessageBox">
                              <span class="icon icon__add">+</span>新增
                            </span>
                          </el-tabs>
                          <transition name="fade">
                            <div class="dialog__table-box" v-if="TabActiveName === 'first'">
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
                                    <th>房贷是否有效</th>
                                    <th>操作</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr class="noList" v-if="houseList.length === 0">
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>暂无数据</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                  <tr v-for="(item, index) in houseList" :key="index">
                                    <td>{{item.estateNum}}</td>
                                    <td>{{getAddressStr(item.addressCode, options)}}</td>
                                    <td>{{item.addressDesc}}</td>
                                    <td>{{houseClass[item.estateTypeCode]}}</td>
                                    <td>{{getTime(item.obtainDate)}}</td>
                                    <td>{{item.mortgageInd === null ? '' : item.mortgageInd ? '是': '否'}}</td>
                                    <td>{{item.coownersCnt}}</td>
                                    <td>{{item.propertySharePercent}}%</td>
                                    <td>{{item.houseSizeMeas}}平方米</td>
                                    <td>{{item.slAverageAmt}}</td>
                                    <td>{{item.inputAverageAmt}}</td>
                                    <!-- arr code -->
                                    <td>{{item.incomeInd === null ? '' : item.incomeInd ? '是': '否'}}</td>
                                    <td>
                                      <div class="operate-box">
                                        <i
                                          v-if="!isEdit"
                                          class="icon el-icon-minus cursor__pointer"
                                          @click="deleteHouseMessage(item.id, item.estateNum)"
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
                                    <th>操作</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr class="noList" v-if="guarantorList.length ===0">
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>暂无数据</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                  </tr>
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
                            </div>
                          </transition>
                          <transition name="fade">
                            <div class="dialog__table-box" v-if="TabActiveName === 'third'">
                              <table>
                                <thead>
                                  <th>共有借款人姓名</th>
                                  <th>身份证类型</th>
                                  <th>身份证号码</th>
                                  <th>联系方式</th>
                                  <th>工作单位</th>
                                  <th>单位详细地址</th>
                                  <th>居住详细地址</th>
                                  <th>操作</th>
                                </thead>
                                <tbody>
                                  <tr v-for="(item, index) in loanList" :key="index">
                                    <td>{{item.coborrowerName}}</td>
                                    <td>{{getCertificateFromCode(item.certificateTypeCode)}}</td>
                                    <td>{{item.certificateNum}}</td>
                                    <td>{{item.mobileNum}}</td>
                                    <td>{{item.workplaceName}}</td>
                                    <td>{{item.workAddressDesc}}</td>
                                    <td>{{item.houseAddressDesc}}</td>
                                    <td>
                                      <div class="operate-box">
                                        <i
                                          class="icon el-icon-minus cursor__pointer"
                                          @click="deleteLoanMessage(item.id)"
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
                            </div>
                          </transition>
                        </div>
                      </transition>
                    </li>
                    <div class="content_mian_title" v-if="!isEasyLoan && !isPlusLoan">
                      <span v-if="!isDadao">车贷信息</span>
                      <span v-else>在押机构信息</span>
                    </div>
                    <!-- <span class="table__list_blue"></span>
                        <p
                          :style="{'padding':'20px 0 0 20px',color:'#538BF1','text-align': 'left', 'font-size': '12px'}"
                    >车贷信息</p>-->
                    <li class="item" v-if="!isDadao && !isEasyLoan && !isPlusLoan">
                      <transition name="fade">
                        <div class="dialog__table-box">
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
                                  <li class="table__th" v-if="!isEdit">操作</li>
                                </ul>
                              </li>
                              <li class="table__body">
                                <div
                                  class="table__tr"
                                  v-for="(item, index) in carList"
                                  :key="index"
                                >
                                  <ul class="table__tr__top-list" v-if="!item.showFormEle">
                                    <li class="table__td" maxlength="40">{{item.bankCode}}</li>
                                    <li class="table__td">{{item.loanAmt}}</li>
                                    <li class="table__td">{{getTime(item.loanDate)}}</li>
                                    <li class="table__td">{{getTime(item.dueDate)}}</li>
                                    <li class="table__td">{{getTime(item.firstRepaymentDate)}}</li>
                                    <li
                                      class="table__td"
                                    >{{item.loanStatusCode === null ? '/' : (item.loanStatusCode === '10') ? '正常' : '结清'}}</li>
                                    <!-- (item.loanStatusCode === '10') ? '正常' : '结清' -->
                                    <li class="table__td">{{getTime(item.settlementDate)}}</li>
                                    <li class="table__td">{{item.monthlyRepaymentAmt}}</li>
                                    <li class="table__td">{{item.availableInd ? '是' : '否'}}</li>
                                    <li v-if="!isEdit" class="table__td">
                                      <div class="operate-box operate-box2" v-if="!isEdit">
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
                                    v-if="item.showFormEle"
                                  >
                                    <div class="table__tr__bottom-list">
                                      <el-form-item label prop="bankCode" class="table__form-item">
                                        <input
                                          type="text"
                                          maxlength="40"
                                          v-model.lazy="carEdit.bankCode"
                                          :disabled="isEdit"
                                          autocomplete="off"
                                          :class="{'el-input__inner': true, 'self-is-disabled': isEdit}"
                                          @blur="verify('carEditForm', 'bankCode')"
                                        />
                                      </el-form-item>
                                      <el-form-item label prop="loanAmt" class="table__form-item">
                                        <el-input :disabled="isEdit" v-model="carEdit.loanAmt"></el-input>
                                      </el-form-item>
                                      <el-form-item label prop="loanDate" class="table__form-item">
                                        <el-date-picker
                                          :disabled="isEdit"
                                          v-model="carEdit.loanDate"
                                          type="date"
                                          format="yyyy/MM/dd"
                                          value-format="timestamp"
                                          placeholder="选择日期"
                                        ></el-date-picker>
                                      </el-form-item>
                                      <el-form-item label prop="dueDate" class="table__form-item">
                                        <el-date-picker
                                          :disabled="isEdit"
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
                                          :disabled="isEdit"
                                          v-model="carEdit.firstRepaymentDate"
                                          type="date"
                                          format="yyyy/MM/dd"
                                          value-format="timestamp"
                                          placeholder="选择日期"
                                        ></el-date-picker>
                                      </el-form-item>
                                      <el-form-item
                                        label
                                        prop="loanStatusCode"
                                        class="table__form-item"
                                      >
                                        <el-select
                                          :disabled="isEdit"
                                          v-model="carEdit.loanStatusCode"
                                          placeholder="请选择"
                                          @change="clearCarDate"
                                        >
                                          <el-option
                                            v-for="(item, index) in carLoanStatusCodeLibrary"
                                            :key="index"
                                            :label="item.itemDesc"
                                            :value="item.itemCode"
                                          ></el-option>
                                        </el-select>
                                      </el-form-item>
                                      <el-form-item
                                        label
                                        prop="settlementDate"
                                        class="table__form-item"
                                      >
                                        <el-date-picker
                                          v-model="carEdit.settlementDate"
                                          type="date"
                                          format="yyyy/MM/dd"
                                          value-format="timestamp"
                                          :disabled="!(carEdit.loanStatusCode === '20') || isEdit"
                                          placeholder="选择日期"
                                        ></el-date-picker>
                                      </el-form-item>
                                      <el-form-item
                                        label
                                        prop="monthlyRepaymentAmt"
                                        class="table__form-item"
                                      >
                                        <input
                                          type="text"
                                          v-model.lazy="carEdit.monthlyRepaymentAmt"
                                          :disabled="isEdit"
                                          autocomplete="off"
                                          :class="{'el-input__inner': true, 'self-is-disabled': isEdit}"
                                          @blur="verify('carEditForm', 'monthlyRepaymentAmt')"
                                        />
                                      </el-form-item>
                                      <el-form-item label class="table__form-item">
                                        <el-select
                                          disabled
                                          v-model="carEdit.availableInd"
                                          placeholder="请选择"
                                        >
                                          <el-option label="是" :value="true"></el-option>
                                          <el-option label="否" :value="false"></el-option>
                                        </el-select>
                                      </el-form-item>
                                      <div class="operate-box text__center" v-if="!isEdit">
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
                                        <input
                                          type="text"
                                          maxlength="40"
                                          v-model.lazy="carEdit.bankCode"
                                          :disabled="isEdit"
                                          autocomplete="off"
                                          :class="{'el-input__inner': true, 'self-is-disabled': isEdit}"
                                          @blur="verify('carAddForm', 'bankCode')"
                                        />
                                      </el-form-item>
                                      <el-form-item prop="loanAmt" class="table__form-item">
                                        <input
                                          type="text"
                                          maxlength="40"
                                          v-model.lazy="carEdit.loanAmt"
                                          :disabled="isEdit"
                                          autocomplete="off"
                                          :class="{'el-input__inner': true, 'self-is-disabled': isEdit}"
                                          @blur="verify('carAddForm', 'loanAmt')"
                                        />
                                      </el-form-item>
                                      <el-form-item prop="loanDate" class="table__form-item">
                                        <el-date-picker
                                          :disabled="isEdit"
                                          v-model="carEdit.loanDate"
                                          type="date"
                                          format="yyyy/MM/dd"
                                          value-format="timestamp"
                                          placeholder="选择日期"
                                        ></el-date-picker>
                                      </el-form-item>
                                      <el-form-item prop="dueDate" class="table__form-item">
                                        <el-date-picker
                                          :disabled="isEdit"
                                          v-model="carEdit.dueDate"
                                          type="date"
                                          format="yyyy/MM/dd"
                                          value-format="timestamp"
                                          placeholder="选择日期"
                                        ></el-date-picker>
                                      </el-form-item>
                                      <el-form-item
                                        prop="firstRepaymentDate"
                                        class="table__form-item"
                                      >
                                        <el-date-picker
                                          :disabled="isEdit"
                                          v-model="carEdit.firstRepaymentDate"
                                          type="date"
                                          format="yyyy/MM/dd"
                                          value-format="timestamp"
                                          placeholder="选择日期"
                                        ></el-date-picker>
                                      </el-form-item>
                                      <el-form-item prop="loanStatusCode" class="table__form-item">
                                        <el-select
                                          :disabled="isEdit"
                                          v-model="carEdit.loanStatusCode"
                                          placeholder="请选择"
                                          @change="clearCarDate"
                                        >
                                          <el-option
                                            v-for="(item, index) in carLoanStatusCodeLibrary"
                                            :key="index"
                                            :label="item.itemDesc"
                                            :value="item.itemCode"
                                          ></el-option>
                                        </el-select>
                                      </el-form-item>
                                      <el-form-item
                                        label
                                        prop="settlementDate"
                                        class="table__form-item"
                                      >
                                        <el-date-picker
                                          v-model="carEdit.settlementDate"
                                          type="date"
                                          format="yyyy/MM/dd"
                                          value-format="timestamp"
                                          :disabled="!(carEdit.loanStatusCode === '20') || isEdit"
                                          placeholder="选择日期"
                                        ></el-date-picker>
                                      </el-form-item>
                                      <el-form-item
                                        label
                                        prop="monthlyRepaymentAmt"
                                        class="table__form-item"
                                      >
                                        <input
                                          type="text"
                                          v-model.lazy="carEdit.monthlyRepaymentAmt"
                                          :disabled="isEdit"
                                          autocomplete="off"
                                          :class="{'el-input__inner': true, 'self-is-disabled': isEdit}"
                                          @blur="verify('carAddForm', 'monthlyRepaymentAmt')"
                                        />
                                      </el-form-item>
                                      <el-form-item label class="table__form-item">
                                        <el-select
                                          disabled
                                          v-model="carEdit.availableInd"
                                          placeholder="请选择"
                                        >
                                          <el-option label="是" :value="true"></el-option>
                                          <el-option label="否" :value="false"></el-option>
                                        </el-select>
                                      </el-form-item>
                                      <div class="operate-box text__center" v-if="!isEdit">
                                        <i
                                          class="icon el-icon-check cursor__pointer"
                                          @click="addCar"
                                        ></i>
                                        <i
                                          class="icon el-icon-minus cursor__pointer"
                                          @click="closeAddCar"
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
                    <div class="form__block bg__white border__radius-5" v-if="isDadao">
                      <div class="dialog-box__middle-top">
                        <h5 class="title">
                          <!-- <span class="icon icon__gan"></span>在押机构信息 -->
                        </h5>
                      </div>
                      <div class="dialog__table-box" style="margin-top: 20px">
                        <div class="dialog__table-form-box">
                          <ul class="table__box table__box2">
                            <li class="table__head">
                              <ul class="table__tr">
                                <li class="table__th">房产证号</li>
                                <li class="table__th">在押机构</li>
                                <li class="table__th">一押放款机构</li>
                                <li class="table__th">一押放款日期</li>
                                <li class="table__th">一押期限（月）</li>
                                <li class="table__th">贷款预计结清日期</li>
                                <li class="table__th">一押抵押方式</li>
                                <li class="table__th">一押还款方式</li>
                                <li class="table__th">一押是否按揭</li>
                                <li class="table__th">一押授信金额</li>
                                <li class="table__th">一押贷款余额</li>
                                <li class="table__th">一押抵押债权金额</li>
                                <li class="table__th">一押抵押机构名称</li>
                                <li class="table__th">一押机构类型</li>
                                <li class="table__th">操作</li>
                              </ul>
                            </li>
                            <li
                              class="table__body"
                              v-for="(item, index) in detaineesList"
                              :key="index"
                            >
                              <div class="table__tr">
                                <ul class="table__tr__top-list" v-show="!item.showEle">
                                  <li class="table__td">{{item.estateNum}}</li>
                                  <li class="table__td">{{item.detainees}}</li>
                                  <li class="table__td">{{item.preLoanAgency}}</li>
                                  <li class="table__td">{{item.preStartedDt}}</li>
                                  <li class="table__td">{{item.mortgageTerm}}</li>
                                  <li class="table__td">{{formatTime(item.loanSettleDt)}}</li>
                                  <li
                                    class="table__td"
                                  >{{getDescFromCode(select.pledgeTypeCd, item.pledgeTypeCd)}}</li>
                                  <li
                                    class="table__td"
                                  >{{getDescFromCode(select.repaymentCd, item.repaymentCd)}}</li>
                                  <li
                                    class="table__td"
                                  >{{getDescFromCode(select.mortgageInd, item.mortgageInd)}}</li>
                                  <li class="table__td">{{item.creditAmt}}</li>
                                  <li class="table__td">{{item.loanBalanceAmt}}</li>
                                  <li class="table__td">{{item.pledgeAmt}}</li>
                                  <li class="table__td">{{item.orgName}}</li>
                                  <li
                                    class="table__td"
                                  >{{getDescFromCode(select.orgType, item.orgType)}}</li>
                                  <li class="table__td">
                                    <div class="operate-box" v-if="!hasSubmit">
                                      <i
                                        class="icon el-icon-plus cursor__pointer"
                                        @click="openAddDetainees"
                                        v-if="index === (detaineesList.length -1)"
                                      ></i>
                                      <i
                                        class="icon el-icon-minus cursor__pointer"
                                        @click="deleteDetainees(index)"
                                      ></i>
                                      <i
                                        class="icon icon__edit cursor__pointer"
                                        @click="openEditDetaineesEle(item)"
                                      ></i>
                                    </div>
                                  </li>
                                </ul>
                                <el-form
                                  :model="detaineesEdit"
                                  :rules="detaineesRule"
                                  :ref="'detaineesEditForm' + index"
                                  label-width="100px"
                                  class="demo-form-inline"
                                  label-position="top"
                                >
                                  <div class="table__tr__bottom-list" v-show="item.showEle">
                                    <el-form-item class="table__form-item" prop="estateNum">
                                      <el-select v-model="detaineesEdit.estateNum">
                                        <el-option
                                          v-for="item in houseIdList.estateNum"
                                          :key="item.itemCode"
                                          :value="item.itemCode"
                                          :label="item.itemDesc"
                                        ></el-option>
                                      </el-select>
                                    </el-form-item>
                                    <el-form-item class="table__form-item" prop="detainees">
                                      <input
                                          type="text"
                                          maxlength="50"
                                          v-model.lazy="detaineesEdit.detainees"
                                          :disabled="isEdit"
                                          autocomplete="off"
                                          :class="{'el-input__inner': true, 'self-is-disabled': isEdit}"
                                          @blur="verify('detaineesEditForm', 'detainees')"
                                        />
                                    </el-form-item>
                                    <el-form-item class="table__form-item">
                                      <input
                                          type="text"
                                          maxlength="100"
                                          v-model.lazy="detaineesEdit.preLoanAgency"
                                          :disabled="isEdit"
                                          autocomplete="off"
                                          :class="{'el-input__inner': true, 'self-is-disabled': isEdit}"
                                          @blur="verify('detaineesEditForm', 'preLoanAgency')"
                                        />
                                    </el-form-item>
                                    <el-form-item class="table__form-item" prop="preStartedDt">
                                      <el-date-picker
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd hh:mm:ss"
                                        v-model="detaineesEdit.preStartedDt">
                                      </el-date-picker>
                                    </el-form-item>
                                    <el-form-item class="table__form-item" prop="mortgageTerm">
                                      <el-input v-model="detaineesEdit.mortgageTerm" maxlength="10"></el-input>
                                    </el-form-item>
                                    <el-form-item class="table__form-item" prop="loanSettleDt">
                                      <el-date-picker
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd hh:mm:ss"
                                        v-model="detaineesEdit.loanSettleDt"
                                      ></el-date-picker>
                                    </el-form-item>
                                    <el-form-item class="table__form-item" prop="pledgeTypeCd">
                                      <el-select v-model="detaineesEdit.pledgeTypeCd">
                                        <el-option
                                          v-for="item in select.pledgeTypeCd"
                                          :key="item.itemCode"
                                          :value="item.itemCode"
                                          :label="item.itemDesc"
                                        ></el-option>
                                      </el-select>
                                    </el-form-item>
                                    <el-form-item class="table__form-item" prop="repaymentCd">
                                      <el-select v-model="detaineesEdit.repaymentCd">
                                        <el-option
                                          v-for="item in select.repaymentCd"
                                          :key="item.itemCode"
                                          :value="item.itemCode"
                                          :label="item.itemDesc"
                                        ></el-option>
                                      </el-select>
                                    </el-form-item>
                                    <el-form-item class="table__form-item" prop="mortgageInd">
                                      <el-select v-model="detaineesEdit.mortgageInd">
                                        <el-option
                                          v-for="item in select.mortgageInd"
                                          :key="item.itemCode"
                                          :value="item.itemCode"
                                          :label="item.itemDesc"
                                        ></el-option>
                                      </el-select>
                                    </el-form-item>
                                    <el-form-item class="table__form-item" prop="creditAmt">
                                      <input
                                          type="text"
                                          maxlength="20"
                                          v-model.lazy="detaineesEdit.creditAmt"
                                          autocomplete="off"
                                          :class="{'el-input__inner': true}"
                                          @blur="verify('detaineesEditForm', 'creditAmt')"
                                        />
                                    </el-form-item>
                                    <el-form-item class="table__form-item" prop="loanBalanceAmt">
                                      <input
                                          type="text"
                                          maxlength="20"
                                          v-model.lazy="detaineesEdit.loanBalanceAmt"
                                          autocomplete="off"
                                          :class="{'el-input__inner': true}"
                                          @blur="verify('detaineesEditForm', 'loanBalanceAmt')"
                                        />
                                    </el-form-item>
                                    <el-form-item class="table__form-item" prop="pledgeAmt">
                                      <input
                                          type="text"
                                          maxlength="20"
                                          v-model.lazy="detaineesEdit.pledgeAmt"
                                          autocomplete="off"
                                          :class="{'el-input__inner': true}"
                                          @blur="verify('detaineesEditForm', 'pledgeAmt')"
                                        />
                                    </el-form-item>
                                    <el-form-item class="table__form-item" prop="orgName">
                                      <input
                                          type="text"
                                          maxlength="50"
                                          v-model.lazy="detaineesEdit.orgName"
                                          autocomplete="off"
                                          :class="{'el-input__inner': true}"
                                          @blur="verify('detaineesEditForm', 'orgName')"
                                        />
                                    </el-form-item>
                                    <el-form-item class="table__form-item" prop="orgType">
                                      <el-select v-model="detaineesEdit.orgType">
                                        <el-option
                                          v-for="item in select.orgType"
                                          :key="item.itemCode"
                                          :value="item.itemCode"
                                          :label="item.itemDesc"
                                        ></el-option>
                                      </el-select>
                                    </el-form-item>
                                    <div class="operate-box text__center" v-if="!hasSubmit">
                                      <i
                                        class="icon el-icon-check cursor__pointer"
                                        @click="saveDetaineesEdit('detaineesEditForm' + index, index)"
                                      ></i>
                                      <i
                                        class="icon el-icon-minus cursor__pointer"
                                        @click="closeDetaineesEdit(item)"
                                      ></i>
                                    </div>
                                  </div>
                                </el-form>
                              </div>
                            </li>
                            <li
                              class="table__body"
                              v-show="detaineesAddDg || (detaineesList.length === 0)"
                            >
                              <div class="table__tr">
                                <!-- 新增 -->
                                <el-form
                                  :model="detaineesEdit"
                                  :rules="detaineesRule"
                                  ref="detaineesAddForm"
                                  label-width="100px"
                                  class="demo-form-inline"
                                  label-position="top"
                                >
                                  <div class="table__tr__bottom-list">
                                    <el-form-item class="table__form-item" prop="estateNum">
                                      <el-select v-model="detaineesEdit.estateNum">
                                        <el-option
                                          v-for="item in houseIdList"
                                          :key="item"
                                          :value="item"
                                          :label="item"
                                        ></el-option>
                                      </el-select>
                                    </el-form-item>
                                    <el-form-item class="table__form-item" prop="detainees">
                                      <input
                                          type="text"
                                          maxlength="50"
                                          v-model.lazy="detaineesEdit.detainees"
                                          autocomplete="off"
                                          :class="{'el-input__inner': true}"
                                          @blur="verify('detaineesAddForm', 'detainees')"
                                        />
                                    </el-form-item>
                                    <el-form-item class="table__form-item">
                                      <input
                                          type="text"
                                          maxlength="100"
                                          v-model.lazy="detaineesEdit.preLoanAgency"
                                          autocomplete="off"
                                          :class="{'el-input__inner': true}"
                                          @blur="verify('detaineesAddForm', 'preLoanAgency')"
                                        />
                                    </el-form-item>
                                    <el-form-item class="table__form-item" prop="preStartedDt">
                                      <el-date-picker
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd hh:mm:ss"
                                        v-model="detaineesEdit.preStartedDt">
                                      </el-date-picker>
                                    </el-form-item>
                                    <el-form-item class="table__form-item" prop="mortgageTerm">
                                      <input
                                          type="text"
                                          maxlength="10"
                                          v-model.lazy="detaineesEdit.mortgageTerm"
                                          autocomplete="off"
                                          :class="{'el-input__inner': true}"
                                          @blur="verify('detaineesAddForm', 'mortgageTerm')"
                                        />
                                    </el-form-item>
                                    <el-form-item class="table__form-item" prop="loanSettleDt">
                                      <el-date-picker
                                        format="yyyy-MM-dd"
                                        value-format="yyyy-MM-dd hh:mm:ss"
                                        v-model="detaineesEdit.loanSettleDt"
                                      ></el-date-picker>
                                    </el-form-item>
                                    <el-form-item class="table__form-item" prop="pledgeTypeCd">
                                      <el-select v-model="detaineesEdit.pledgeTypeCd">
                                        <el-option
                                          v-for="item in select.pledgeTypeCd"
                                          :key="item.itemCode"
                                          :value="item.itemCode"
                                          :label="item.itemDesc"
                                        ></el-option>
                                      </el-select>
                                    </el-form-item>
                                    <el-form-item class="table__form-item" prop="repaymentCd">
                                      <el-select v-model="detaineesEdit.repaymentCd">
                                        <el-option
                                          v-for="item in select.repaymentCd"
                                          :key="item.itemCode"
                                          :value="item.itemCode"
                                          :label="item.itemDesc"
                                        ></el-option>
                                      </el-select>
                                    </el-form-item>
                                    <el-form-item class="table__form-item" prop="mortgageInd">
                                      <el-select v-model="detaineesEdit.mortgageInd">
                                        <el-option
                                          v-for="item in select.mortgageInd"
                                          :key="item.itemCode"
                                          :value="item.itemCode"
                                          :label="item.itemDesc"
                                        ></el-option>
                                      </el-select>
                                    </el-form-item>
                                    <el-form-item class="table__form-item" prop="creditAmt">
                                      <input
                                          type="text"
                                          maxlength="20"
                                          v-model.lazy="detaineesEdit.creditAmt"
                                          autocomplete="off"
                                          :class="{'el-input__inner': true}"
                                          @blur="verify('detaineesAddForm', 'creditAmt')"
                                        />
                                    </el-form-item>
                                    <el-form-item class="table__form-item" prop="loanBalanceAmt">
                                      <input
                                          type="text"
                                          maxlength="20"
                                          v-model.lazy="detaineesEdit.loanBalanceAmt"
                                          autocomplete="off"
                                          :class="{'el-input__inner': true}"
                                          @blur="verify('detaineesAddForm', 'loanBalanceAmt')"
                                        />
                                    </el-form-item>
                                    <el-form-item class="table__form-item" prop="pledgeAmt">
                                      <input
                                          type="text"
                                          maxlength="20"
                                          v-model.lazy="detaineesEdit.pledgeAmt"
                                          autocomplete="off"
                                          :class="{'el-input__inner': true}"
                                          @blur="verify('detaineesAddForm', 'pledgeAmt')"
                                        />
                                    </el-form-item>
                                    <el-form-item class="table__form-item" prop="orgName">
                                      <input
                                          type="text"
                                          maxlength="50"
                                          v-model.lazy="detaineesEdit.orgName"
                                          autocomplete="off"
                                          :class="{'el-input__inner': true}"
                                          @blur="verify('detaineesAddForm', 'orgName')"
                                        />
                                    </el-form-item>
                                    <el-form-item class="table__form-item" prop="orgType">
                                      <el-select v-model="detaineesEdit.orgType">
                                        <el-option
                                          v-for="item in select.orgType"
                                          :key="item.itemCode"
                                          :value="item.itemCode"
                                          :label="item.itemDesc"
                                        ></el-option>
                                      </el-select>
                                    </el-form-item>
                                    <div class="operate-box text__center" v-if="!hasSubmit">
                                      <i
                                        class="icon el-icon-check cursor__pointer"
                                        @click="saveDetainees"
                                      ></i>
                                      <i
                                        class="icon el-icon-minus cursor__pointer"
                                        @click="closeAddDetainees"
                                      ></i>
                                    </div>
                                  </div>
                                </el-form>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
              <!-- 面签备注 -->
              <div class="content_border jump-hook" id="selfGo-5">
                <div v-if="showBORF">
                  <div class="content_title_head" :class="{'active__title' : curIndex === 5}">
                    <span class="content_title_headA"></span>
                    <span class="content_title_headB" id="anchot-5">调查产品备注</span>
                  </div>
                  <div class="content">
                    <div class="content_mian">
                      <!-- placeholder，surveyRemarkList长度为0时使用 -->
                      <div class="faceCheckOpinionCode2" v-show="surveyRemarkList.length === 0">
                        <span class="top_conten_title">产品备注意见：</span>
                        <span class="top_content_font"></span>
                      </div>
                      <div class="faceCheckOpinionCode2" v-for="(item, index) in surveyRemarkList" :key="index">
                        <span class="top_conten_title">产品备注意见{{index + 1}}：</span>
                        <p class="top_content_font" v-for="(str, i) in item" :key="i">{{str}}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="ftfOpinion && !isSourceSurvey && !showBORF">
                  <div class="content_title_head" :class="{'active__title' : curIndex === 5}">
                    <span class="content_title_headA"></span>
                    <span class="content_title_headB" id="anchot-5">面签备注</span>
                  </div>
                  <div class="content">
                    <div class="content_mian">
                      <div class="faceCheckOpinionCode2">
                        <span class="top_conten_title">面核面签处理人：</span>
                        <span class="top_content_font">{{ftfOpinion.ftfDealBy}}</span>
                      </div>
                      <div
                        class="faceCheckOpinionCode1"
                        v-if="ftfOpinion.faceCheckOpinionCode.length"
                        v-for="(item, index) in ftfOpinion.faceCheckOpinionCode"
                        :key="index"
                      >
                        <div class="content_mian_title" v-if="item.levelDesc.length>0">
                          <span>{{item.level1}}</span>
                        </div>
                        <div
                          class="content_mian_table"
                          v-if="item.levelDesc.length>0"
                          v-for="(items, indexx) in item.levelDesc"
                          :key="indexx"
                        >
                          <div>
                            <span class="top_conten_title">编号：</span>
                            <span class="top_content_font">{{items.level2}}</span>
                          </div>
                          <div>
                            <span class="top_conten_title">信息：</span>
                            <span class="top_content_font">{{items.desc}}</span>
                          </div>
                        </div>
                      </div>
                      <div class="content_mian_title beizhu" v-if="ftfOpinion.faceCheckOpinion">
                        <span>备注</span>
                      </div>
                      <div
                        class="content_mian_table top_content_font"
                        style="min-height:50px"
                        v-if="ftfOpinion.faceCheckOpinion"
                      >
                        <div>{{ftfOpinion.faceCheckOpinion}}</div>
                      </div>
                      <p
                        :style="{padding:'5px',color:'#538BF1'}"
                      >核身意见：共验核{{ftfOpinion.remoteCheckCnt}}次，第一次相似度:{{ftfOpinion.faceMatchPercent}}</p>
                      <br>
                      <div class="faceCheckOpinionCode2">
                        <span class="top_conten_title">外网查询结论：</span>
                        <span class="top_content_font">{{getExtranetStatus(ftfOpinion.f2fExtranetStatusCode)}}</span>
                      </div>
                      <div class="faceCheckOpinionCode2">
                        <span class="top_conten_title">外网查询备注：</span>
                        <span class="top_content_font">{{ftfOpinion.f2fExtranetRemark}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 三方数据 -->
              <div class="content_border jump-hook" id="selfGo-6">
                <div class="content_title_head" :class="{'active__title' : curIndex === 6}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-6">三方数据</span>
                </div>
                <div class="content">
                  <div class="content_mian" v-if="comeFrom !== 'pending'">
                    <div class="content_mian_title">
                      <span>汇法网</span>
                    </div>
                    <el-form
                      :inline="true"
                      class="demo-form-inline threedata"
                      ref="threeDataPerson"
                      :model="threeDataPerson"
                      :rules="threeDataRuleP"
                    >
                      <el-form-item label prop="name">
                        <input
                          type="text"
                          maxlength="30"
                          v-model.lazy="threeDataPerson.name"
                          :disabled="isEdit"
                          placeholder="请输入姓名"
                          autocomplete="off"
                          :class="{'self-is-disabled': isEdit, 'el-input__inner': true}"
                          @blur="verify('threeDataPerson', 'name')"
                        />
                      </el-form-item>
                      <el-form-item label prop="cerid">
                        <input
                          type="text"
                          v-model.lazy="threeDataPerson.cerid"
                          :disabled="isEdit"
                          style="width:300px"
                          placeholder="请输入身份证号码"
                          autocomplete="off"
                          :class="{'self-is-disabled': isEdit, 'el-input__inner': true}"
                          @blur="verify('threeDataPerson', 'cerid')"
                        />
                      </el-form-item>
                      <el-button
                        :disabled="isEdit || threePerson"
                        type="primary"
                        class="small-btn"
                        @click="searchPersonList"
                      >查询</el-button>
                    </el-form>
                    <div class="herBox">
                      <el-table
                        class="tables_width"
                        max-height="340"
                        :data="personList"
                        style="width:100%"
                      >
                        <el-table-column label="序号" type="index" width="80"></el-table-column>
                        <el-table-column prop="n" label="姓名" width="200"></el-table-column>
                        <el-table-column prop="id" label="身份证号码"></el-table-column>
                        <el-table-column prop="totalnumber" label="查询数" width="200"></el-table-column>
                        <el-table-column prop="search_time" label="查询时间"></el-table-column>
                        <el-table-column fixed="right" label="操作">
                          <template slot-scope="scope">
                            <el-button
                              @click="threedataNowday(scope.$index)"
                              type="text"
                              size="small"
                              class="sytCBlue"
                            >详情</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                    <el-form
                      :inline="true"
                      class="demo-form-inline threedata"
                      ref="threeDataCompany"
                      :model="threeDataCompany"
                      :rules="threeDataRuleC"
                    >
                      <el-form-item label prop="companyName">
                        <input
                          type="text"
                          v-model.lazy="threeDataCompany.companyName"
                          :disabled="isEdit"
                          style="width:300px"
                          placeholder="请输入单位名称"
                          autocomplete="off"
                          :class="{'self-is-disabled': isEdit, 'el-input__inner': true}"
                          @blur="verify('threeDataCompany', 'companyName')"
                        />
                      </el-form-item>
                      <el-button
                        :disabled="isEdit || threeCompany"
                        type="primary"
                        class="small-btn"
                        @click="searchCompanyList"
                      >查询</el-button>
                    </el-form>
                    <div class="herBox">
                      <el-table
                        class="tables_width"
                        max-height="340"
                        :data="companyList"
                        style="width:100%"
                      >
                        <el-table-column label="序号" type="index" width="80"></el-table-column>
                        <el-table-column prop="q" label="公司名称"></el-table-column>
                        <!-- <el-table-column prop="id" label="身份证号码"></el-table-column> -->
                        <el-table-column prop="totalnumber" label="查询数" width="200"></el-table-column>
                        <el-table-column prop="search_time" label="查询时间"></el-table-column>
                        <el-table-column fixed="right" label="操作">
                          <template slot-scope="scope">
                            <el-button
                              @click="openCompanyList(scope.$index)"
                              type="text"
                              size="small"
                              class="sytCBlue"
                            >详情</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                  <div class="content_mian">
                    <thirdPartFaHai :disabled="isEdit" :applicationId="applicationId"></thirdPartFaHai>
                  </div>
                </div>
                <div class="content">
                  <div class="content_mian">
                    <ic-info :showSpouse="true" :disabled="!!isEdit"
                      :apiUrl="icInfo_url" :applicationId="applicationId" :certId="ruleForm.spouseIdNum"
                      :isDetail="!!isEdit" :routerPath="'approval-ic-info-detail'" :taskNodeCode="'approveTask'">
                    </ic-info>
                  </div>
                </div>
              </div>
              <!-- 历史贷款记录 -->
              <div class="content_border jump-hook" id="selfGo-7">
                <div class="content_title_head" :class="{'active__title' : curIndex === 7}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-7">历史贷款记录</span>
                </div>
                <div class="content history-table">
                  <el-table :data="aprLoanRecord" style="width:97.5%">
                    <el-table-column label="序号" type="index"></el-table-column>
                    <el-table-column prop="oldApplicationId" label="申请编号" width="170"></el-table-column>
                    <el-table-column prop="finalTaskDefKey" label="终审阶段" width="120"></el-table-column>
                    <el-table-column prop="finalOpinionResultCode" label="终审结论" width="120"></el-table-column>
                    <el-table-column prop="finalRejectReasonCode" label="终审否决原因" width="130"></el-table-column>
                    <el-table-column prop="putoutApproveInd1" label="放款状态1" width="130"></el-table-column>
                    <el-table-column prop="rejectCode1" label="放款否决原因1" width="130"></el-table-column>
                    <el-table-column prop="repaymentStatus1" label="还款状态1" width="130"></el-table-column>
                    <el-table-column prop="repaymentTerm1" label="已还期数1" width="130"></el-table-column>
                    <el-table-column prop="putoutApproveInd2" label="放款状态2" width="130"></el-table-column>
                    <el-table-column prop="rejectCode2" label="放款否决原因2" width="130"></el-table-column>
                    <el-table-column prop="repaymentStatus2" label="还款状态2" width="130"></el-table-column>
                    <el-table-column prop="repaymentTerm2" label="已还期数2" width="130"></el-table-column>
                    <el-table-column fixed="right" width="130" label="操作">
                      <template slot-scope="scope">
                        <el-button
                          @click="goHistory(scope.row.oldApplicationId, scope.row.reportNum, scope.row.redirectFlag, scope.row)"
                          type="text"
                          size="small"
                          class="sytCBlue"
                        >申请详情</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <p
                    :style="{'margin':'5px','font-size':'14px','color':'#F55F5F','text-align':'left','margin-left':'30px'}"
                    v-if="hisRiskTxt.length>0"
                  >异常提示：</p>
                  <p
                    :style="{'margin':'5px','font-size':'14px','color':'#F55F5F','text-align':'left','margin-left':'30px'}"
                    v-if="hisRiskTxt.length>0"
                    v-for="(item, index) in hisRiskTxt"
                    :key="index"
                  >{{ item }}</p>
                </div>
              </div>
              <!-- 关联信息 -->
              <div class="content_border jump-hook" id="selfGo-8">
                <div class="content_title_head" :class="{'active__title' : curIndex === 8}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-8">关联信息</span>
                </div>
                <div class="content">
                  <div class="content_mian">
                    <span>相关联信息：</span>
                    <span>{{attentionNum}}</span>
                    <span>条</span>
                    <el-button class="sytCBlue" type="text" @click="alert_detectionMsg()">查看详情</el-button>
                  </div>
                </div>
              </div>
              <!-- 信用报告 -->
              <div class="content_border jump-hook" id="selfGo-9" v-if="!isSourceSurvey">
                <div class="content_title_head" :class="{'active__title' : curIndex === 9}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-9">信用报告</span>
                </div>
                <!-- <div class="content">
                  <el-row class="content_mian">
                    <el-button
                      :disabled="isEdit"
                      class="small-btn"
                      @click="getCreditReport(true)"
                    >刷新</el-button>
                  </el-row>
                  <div class="herBox">
                    <el-table
                      class="tables_width"
                      max-height="340"
                      :data="aprRelatedCredit"
                      style="margin:0 0 20px 20px"
                    >
                      <el-table-column label="序号" type="index"></el-table-column>
                      <el-table-column prop="creditQueryName" label="姓名"></el-table-column>
                      <el-table-column prop="certificateNum" label="身份证号码"></el-table-column>
                      <el-table-column prop="contactRelationCode" label="与借款人关系"></el-table-column>
                      <el-table-column prop="generatedTime" label="查询时间"></el-table-column>
                      <el-table-column prop="reportSource" label="来源"></el-table-column>
                      <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                          <el-button
                            @click="checkCreditReport(scope.row.reportNum)"
                            type="text"
                            size="small"
                            class="sytCBlue"
                          >信用报告明细</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div> -->
                <credit-report :isEdit="(isEdit && plusEmailStatus !== 'send_success') || comeFrom !== 'pending'" :taskNode="'approval'" :applicationId="applicationId" :moduleCode="'apraud'"></credit-report>
              </div>
              <!-- 运营商报告 -->
              <div v-if="false" class="content_border jump-hook tobacco_loan" id="selfGo-10">
                <div class="content_title_head" :class="{'active__title' : curIndex === 10}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-10">运营商报告</span>
                </div>
                <div class="content">
                  <el-row class="content_mian">
                    <el-button class="small-btn" @click="getCreditReport(true)">刷新</el-button>
                  </el-row>
                  <div class="herBox">
                    <table class="my_table">
                      <thead class="my_table_head">
                        <tr>
                          <th style="width: 100px;">序号</th>
                          <th style="width: 200px;">姓名</th>
                          <th>身份证号码</th>
                          <th>与借款人关系</th>
                          <th>查询时间</th>
                          <th>来源</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody class="black_font table_herBody">
                        <tr>
                          <td style="width: 100px;">1</td>
                          <td style="width: 200px;">韩梅梅</td>
                          <td>35752345234523463456</td>
                          <td>借款人</td>
                          <td>2018/6/1 00:23:20</td>
                          <td>第三方</td>
                          <td style="color: #538BF1;cursor: pointer;">运营商报告明细</td>
                        </tr>
                        <tr>
                          <td style="width: 100px;">1</td>
                          <td style="width: 200px;">韩梅梅</td>
                          <td>35752345234523463456</td>
                          <td>借款人</td>
                          <td>2018/6/1 00:23:20</td>
                          <td>第三方</td>
                          <td style="color: #538BF1;cursor: pointer;">运营商报告明细</td>
                        </tr>
                        <tr>
                          <td style="width: 100px;">1</td>
                          <td style="width: 200px;">韩梅梅</td>
                          <td>35752345234523463456</td>
                          <td>借款人</td>
                          <td>2018/6/1 00:23:20</td>
                          <td>第三方</td>
                          <td style="color: #538BF1;cursor: pointer;">运营商报告明细</td>
                        </tr>
                        <tr>
                          <td style="width: 100px;">1</td>
                          <td style="width: 200px;">韩梅梅</td>
                          <td>35752345234523463456</td>
                          <td>借款人</td>
                          <td>2018/6/1 00:23:20</td>
                          <td>第三方</td>
                          <td style="color: #538BF1;cursor: pointer;">运营商报告明细</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <!-- 烟草贷信息 -->
              <div v-if="tbFlag" class="content_border jump-hook tobacco_loan" id="selfGo-10">
                <div class="content_title_head" :class="{'active__title' : curIndex === 10}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-10">烟草贷信息</span>
                </div>
                <div class="content">
                  <el-row class="content_mian">
                    <el-button class="small-btn" @click="getCreditReport(true)">刷新</el-button>
                  </el-row>
                  <div class="herBox">
                    <table class="my_table">
                      <thead class="my_table_head">
                        <tr>
                          <th style="width: 100px;">序号</th>
                          <th style="width: 200px;">客户名称</th>
                          <th style="width: 200px;">负责人</th>
                          <th>负责人电话</th>
                          <th>地址</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody class="black_font table_herBody">
                        <tr v-for="(i,key) in tobaccoLoanList" :key="key">
                          <td style="width: 100px;">{{key+1}}</td>
                          <td style="width: 200px;">{{i.abbreviationName}}</td>
                          <td style="width: 200px;">{{i.responsiblePerson}}</td>
                          <td>{{i.responsiblePersonPhone }}</td>
                          <td>{{i.customerAddress}}</td>
                          <td @click="tobaccoPopup(i)" style="color: #538BF1;cursor: pointer;">烟草贷详情</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <!-- 税务贷信息 -->
              <div v-if="ftFlag" class="content_border jump-hook tobacco_loan" id="selfGo-11">
                <div class="content_title_head" :class="{'active__title' : curIndex === 11}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-11">税务贷信息</span>
                </div>
                <div class="content">
                  <el-row class="content_mian">
                    <el-button class="small-btn" @click="getCreditReport(true)">刷新</el-button>
                  </el-row>
                  <div class="herBox">
                    <table class="my_table">
                      <thead class="my_table_head">
                        <tr>
                          <th style="width: 100px;">序号</th>
                          <th>姓名</th>
                          <th>证件号码</th>
                          <th>与借款人关系</th>
                          <th>企业名称</th>
                          <th>纳税人识别号</th>
                          <th>与企业关系</th>
                          <th>查询时间</th>
                          <th>查询来源</th>
                          <th>操作</th>
                        </tr>
                      </thead>
                      <tbody class="black_font table_herBody">
                        <tr v-if="taxInfoTableList.applicationId">
                          <td style="width: 100px;">1</td>
                          <td>{{taxInfoTableList.taxPayerName}}</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>{{taxInfoTableList.taxPayerId}}</td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td @click="getTaxPopup" style="color: #538BF1;cursor: pointer;">税务贷详情</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <!-- 税务贷信息 -->
              <div v-if="isTaxLoan">
                <div class="content_border jump-hook" id="selfGo-12">
                  <div class="content_title_head" :class="{'active__title' : curIndex === 12}">
                    <span class="content_title_headA"></span>
                    <span class="content_title_headB" id="anchot-12">税务贷信息</span>
                  </div>
                  <div class="content firm_tax">
                    <el-form
                      ref="organizationTaxForm"
                      :model="organizationTax"
                      :rules="organizationTaxRule"
                    >
                      <div class="tax_box">
                        <el-form-item label="税务数据接入机构" class="width245" prop="tlTaxOrganizationId">
                          <el-select
                            v-model="organizationTax.tlTaxOrganizationId"
                            placeholder="请选择"
                            :disabled="!!isEdit"
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
                          <el-input v-model="organizationTax.taxpayerNum" disabled></el-input>
                        </el-form-item>
                        <el-form-item class="btn_tax">
                          <el-button
                            size="small"
                            class="query_btn query_auth"
                            @click="queryAuthorizationInfo"
                            :disabled="queryImpowerBtnStatus || impowerFlag"
                          >查询授权结果</el-button>
                          <el-button
                            size="small"
                            type="primary"
                            :disabled="queryTax || queryImpowerBtnStatus"
                            class="query_btn query_tax"
                            @click="queryTaxInfo"
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
                            class="width245"
                          >
                            <input
                              type="text"
                              v-model.lazy="organizationTax.nearly1YrAnnlPayTaxAmt"
                              :disabled="!!isEdit"
                              autocomplete="off"
                              :class="{'self-is-disabled': !!isEdit, 'el-input__inner': true}"
                              @blur="verify('organizationTax', 'nearly1YrAnnlPayTaxAmt')"
                            />
                          </el-form-item>
                          <el-form-item
                            label="近一年企业信用评级"
                            class="width245"
                            prop="nearly1YrOrgCrLvlCd"
                          >
                            <el-select
                              v-model="organizationTax.nearly1YrOrgCrLvlCd"
                              placeholder="请选择"
                              :disabled="!!isEdit"
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
                          <el-form-item
                            label="借款人最早缴税日期"
                            prop="custPayTaxStartDate"
                            class="width245"
                          >
                            <el-date-picker
                              v-model="organizationTax.custPayTaxStartDate"
                              type="date"
                              value-format="yyyy-MM-dd hh:mm:ss"
                              :disabled="!!isEdit"
                              :editable="false"
                            ></el-date-picker>
                          </el-form-item>
                          <el-form-item label="当前是否有未缴清税款" prop="notPayUpTaxInd" class="tax-switch">
                            <el-switch
                              v-model="organizationTax.notPayUpTaxInd"
                              :width="50"
                              :disabled="!!isEdit"
                            ></el-switch>
                            <span>{{(organizationTax.notPayUpTaxInd === true) ? '是':'否'}}</span>
                          </el-form-item>
                        </div>
                      </div>
                    </el-form>
                  </div>
                </div>
              </div>
              <!-- 企业发票数据 -->
              <div
                v-if="(isDCG || isDCGX) && !isSourceSurvey"
                class="content_border jump-hook"
                id="selfGo-13">
                <div class="content_title_head" :class="{'active__title' : curIndex === 13}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-13">企业税务数据</span>
                </div>
                <div class="content">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">企业名称：</span>
                          <span class="top_conten_title">{{nuonuoMsg.enterpriseName}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">法人姓名：</span>
                          <span class="top_conten_title">{{nuonuoMsg.legalName}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">纳税人状态：</span>
                          <span class="top_content_money">{{nuonuoMsg.registrationState}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">纳税人识别号：</span>
                          <span class="top_conten_title">{{nuonuoMsg.taxpayerIdentityNum}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月企业所得税缴纳税额：</span>
                          <span class="top_content_money">{{nuonuoMsg.taxSDL12MPayAmtSys}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月增值税缴纳税额：</span>
                          <span class="top_content_money">{{nuonuoMsg.taxZZL12MPayAmtSys}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月销售额：</span>
                          <span class="top_content_money">{{nuonuoMsg.l12MLowerAmt}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">纳税信用等级：</span>
                          <span class="top_content_money">{{ nuonuoMsg.tax1YearCreditLevelSys }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近1年毛利润：</span>
                          <span class="top_content_money">{{ nuonuoMsg.l1stYProfit }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近1年毛利率：</span>
                          <span class="top_content_money">{{ nuonuoMsg.taxFinance12L1Y }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近1年净利润：</span>
                          <span
                            class="top_content_money"
                          >{{ nuonuoMsg.l1stYNetProfit }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近1年净利率：</span>
                          <span
                            class="top_content_money"
                          >{{ nuonuoMsg.taxFinance13L1Y }}</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <div class="nuonuoBtn">
                    <el-button class="sytBYellow nuonuo" type="warning" @click="goNuonuo">查看发票征信报告</el-button>
                  </div>
                </div>
              </div>
              <!-- 企业发票数据 -->
              <div
                v-if="(isNuonuo || isChanjet || hasInvoice) && !isSourceSurvey"
                class="content_border jump-hook"
                id="selfGo-13">
                <div class="content_title_head" :class="{'active__title' : curIndex === 13}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-13">企业发票数据</span>
                </div>
                <div class="content">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">企业名称：</span>
                          <span class="top_conten_title">{{nuonuoMsg.enterpriseName}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">法人姓名：</span>
                          <span class="top_conten_title">{{nuonuoMsg.legalName}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">登记状态：</span>
                          <span class="top_content_money">{{nuonuoMsg.registrationState}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">纳税人识别号：</span>
                          <span class="top_conten_title">{{nuonuoMsg.taxpayerIdentityNum}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">最早一张票距今月份数：</span>
                          <span class="top_content_money">{{diffMonth(nuonuoMsg.minInvoiceDate)}}</span>
                          <span class="top_content_gray">个月</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">最近一张票距今月份数：</span>
                          <span class="top_content_money">{{diffMonth(nuonuoMsg.maxInvoiceDate)}}</span>
                          <span class="top_content_gray">个月</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">当前连续无交易记录天数：</span>
                          <span class="top_content_money">{{nuonuoMsg.nonDealDays}}</span>
                          <span class="top_content_gray">天</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月开票张数：</span>
                          <span class="top_content_money">{{ nearMonthCount(12, "validNum") }}</span>
                          <span class="top_content_gray">张</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月开票金额：</span>
                          <span class="top_content_money">{{ nearMonthCount(12, "taxSales") }}</span>
                          <span class="top_content_gray">元</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月开票税额：</span>
                          <span class="top_content_money">{{ nearMonthCount(12, "taxAmt") }}</span>
                          <span class="top_content_gray">元</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月红票金额占比：</span>
                          <span class="top_content_money">{{ nearMonthMoneyRatio(12, "redAmount") }}</span>
                          <span class="top_content_gray">%</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月废票金额占比：</span>
                          <span
                            class="top_content_money"
                          >{{ nearMonthMoneyRatio(12, "devilAmount") }}</span>
                          <span class="top_content_gray">%</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <div class="nuonuoBtn">
                    <el-button class="sytBYellow nuonuo" type="warning" @click="goNuonuo">查看发票征信报告</el-button>
                  </div>
                </div>
              </div>
              <div
                v-if="(isKingDee || isSFOL || hasKingDee) && !isSourceSurvey"
                class="content_border jump-hook"
                id="selfGo-13"
                >
                <div class="content_title_head" :class="{'active__title' : curIndex === 13}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-13">企业发票数据</span>
                </div>
                <div class="content">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">企业名称：</span>
                          <span class="top_conten_title">{{nuonuoMsg.enterpriseName}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">法人姓名：</span>
                          <span class="top_conten_title">{{nuonuoMsg.legalName}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">登记状态：</span>
                          <span class="top_content_money">{{nuonuoMsg.registrationState}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">纳税人识别号：</span>
                          <span class="top_conten_title">{{nuonuoMsg.taxpayerIdentityNum}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">最早一张票距今月份数：</span>
                          <span class="top_content_money">{{nuonuoMsg.minInvoiceDate}}</span>
                          <span class="top_content_gray">个月</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">最近一张票距今月份数：</span>
                          <span class="top_content_money">{{nuonuoMsg.maxInvoiceDate}}</span>
                          <span class="top_content_gray">个月</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">当前连续无交易记录天数：</span>
                          <span class="top_content_money">{{nuonuoMsg.nonDealDays}}</span>
                          <span class="top_content_gray">天</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月开票张数：</span>
                          <span class="top_content_money">{{ nearMonthCount(12, "totalCount") }}</span>
                          <span class="top_content_gray">张</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月开票金额：</span>
                          <span class="top_content_money">{{ nearMonthCount(12, "normalAmount") }}</span>
                          <span class="top_content_gray">元</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月开票税额：</span>
                          <span class="top_content_money">{{ nearMonthCount(12, "normalTaxAmount") }}</span>
                          <span class="top_content_gray">元</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月红票金额占比：</span>
                          <span class="top_content_money">{{ nearMonthMoneyRatio(12, "negativeAmount") }}</span>
                          <span class="top_content_gray">%</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月废票金额占比：</span>
                          <span
                            class="top_content_money"
                          >{{ nearMonthMoneyRatio(12, "voidedAmount") }}</span>
                          <span class="top_content_gray">%</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <div class="nuonuoBtn">
                    <el-button class="sytBYellow nuonuo" type="warning" @click="goNuonuo">查看发票征信报告</el-button>
                  </div>
                </div>
              </div>
              <!-- 企业税务征信报告 -->
              <div
                v-if="isCBHB"
                class="content_border jump-hook"
                id="selfGo-13"
               >
                <div class="content_title_head" :class="{'active__title' : curIndex === 13}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-13">企业税务征信报告</span>
                </div>
                <div class="content">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">企业名称：</span>
                          <span class="top_conten_title">{{taxDetail.entname}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">法人姓名：</span>
                          <span class="top_conten_title">{{taxDetail.frname}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">登记状态：</span>
                          <span class="top_content_money">{{taxDetail.entstatus}}</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <div class="nuonuoBtn">
                    <el-button class="sytBYellow taxBtn" type="warning" @click="goTaxDetail">查看企业税务征信报告</el-button>
                  </div>
                </div>
              </div>
              <!-- 企业财务信息报告 -->
              <div
                v-if="isHXD"
                class="content_border jump-hook"
                id="selfGo-13"
               >
                <div class="content_title_head" :class="{'active__title' : curIndex === 13}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-13">企业财务信息报告</span>
                </div>
                <div class="content">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">企业名称：</span>
                          <span class="top_conten_title">{{taxDetail.entname}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">法人姓名：</span>
                          <span class="top_conten_title">{{taxDetail.frname}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">登记状态：</span>
                          <span class="top_content_money">{{taxDetail.entstatus}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">纳税人识别号：</span>
                          <span class="top_content_money">{{taxDetail.creditcode}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">账务申请模型得分：</span>
                          <span class="top_content_money">{{taxDetail.applyScore}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">记账合作时长：</span>
                          <span class="top_content_money">{{taxDetail.coopTime}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近3个月有进项交易的月份数：</span>
                          <span class="top_content_money">{{taxDetail.threeMonJxMCount}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近3个月有销项交易的月份数：</span>
                          <span class="top_content_money">{{taxDetail.threeMonXxMCount}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">账务完整性模型得分：</span>
                          <span class="top_content_money">{{taxDetail.integralityScore}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">内部账务额度：</span>
                          <span class="top_content_money">{{taxDetail.innerAccQuota}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月进项交易额环比增长月份数：</span>
                          <span class="top_content_money">{{taxDetail.twMonJxAmtHbMCount}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月最大连续有销项交易月份数：</span>
                          <span class="top_content_money">{{taxDetail.twMonHasXxConsecMCount}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">合作方审批备注：</span>
                          <span class="top_content_money">{{taxDetail.remark}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月最大连续进项交易月份数：</span>
                          <span class="top_content_money">{{taxDetail.twMonMaxJxConsecMCount}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月最大连续无销项交易月份数：</span>
                          <span class="top_content_money">{{taxDetail.twMonNotXxConsecMCount}}</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <div class="nuonuoBtn">
                    <el-button class="sytBYellow taxBtn" type="warning" @click="goHxd">查看企业财务信息报告</el-button>
                  </div>
                </div>
              </div>
              <!-- 世纪中税企业税务数据 -->
              <div
                v-if="isSJZS"
                class="content_border jump-hook"
                id="selfGo-13"
               >
                <div class="content_title_head" :class="{'active__title' : curIndex === 13}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-13">企业财务信息报告</span>
                </div>
                <div class="content">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">企业名称：</span>
                          <span class="top_conten_title">{{taxDetail.nsrmc}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">法人姓名：</span>
                          <span class="top_conten_title">{{taxDetail.frname}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">纳税人状态：</span>
                          <span class="top_content_money">{{getTdm(taxDetail.nsrztdm)}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">纳税人识别号：</span>
                          <span class="top_content_money">{{taxDetail.sh}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月企业所得税缴纳税额：</span>
                          <span class="top_content_money">{{ lastSDS(12) }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月增值税缴纳税额：</span>
                          <span class="top_content_money">{{ lastZZS(12) }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月销售额：</span>
                          <span class="top_content_money">{{ lastXSE(12) }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">纳税信用等级：</span>
                          <span class="top_content_money">{{taxDetail.xydj}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近1年毛利润：</span>
                          <span class="top_content_money">{{ qylr('mlr') }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近1年毛利率：</span>
                          <span class="top_content_money">{{ qylr('mll') }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近1年净利润：</span>
                          <span class="top_content_money">{{ qylr('jlr') }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近1年净利率：</span>
                          <span class="top_content_money">{{ qylr('jll') }}</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <div class="nuonuoBtn">
                    <el-button class="sytBYellow taxBtn" type="warning" @click="goSJZS">查看税务征信报告</el-button>
                  </div>
                </div>
              </div>
              <!-- 客如云餐饮经营信息报告 -->
              <div
                v-if="isKRY"
                class="content_border jump-hook"
                id="selfGo-13"
               >
                <div class="content_title_head" :class="{'active__title' : curIndex === 13}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-13">餐饮经营信息报告</span>
                </div>
                <div class="content">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">企业名称：</span>
                          <span class="top_conten_title">{{companyInfo.basic.entname}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">法人姓名：</span>
                          <span class="top_conten_title">{{companyInfo.basic.frname}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">登记状态：</span>
                          <span class="top_content_money">{{companyInfo.basic.entstatus}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">纳税人识别号：</span>
                          <span class="top_content_money">{{companyInfo.basic.creditcode}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">开机时长（天）：</span>
                          <span class="top_content_money">{{ invoiceInfo.daysFromEst }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">累计开机时长（天）：</span>
                          <span class="top_content_money">{{ invoiceInfo.cumWorkDays }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近6个月有交易且每月交易天数大于3天的月份数：</span>
                          <span class="top_content_money">{{ invoiceInfo.cntTradeGT3DaysL6Mth }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月有交易且每月交易天数大于3天的月份数：</span>
                          <span class="top_content_money">{{invoiceInfo.cntTradeGT3DaysL12Mth}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">开业时长（天）：</span>
                          <span class="top_content_money">{{invoiceInfo.daysFromTradeEst}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近6个月异常交易占比：</span>
                          <span class="top_content_money">{{ num2percent(invoiceInfo.anTradeNumL6Mth / invoiceInfo.ttlTradeNumL6Mth) }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近6个月有交易且每月交易天数大于7天的月份数：</span>
                          <span class="top_content_money">{{ invoiceInfo.cntTradeGT7DaysL6Mth }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月有交易且每月交易天数大于7天的月份数：</span>
                          <span class="top_content_money">{{ invoiceInfo.cntTradeGT7DaysL12Mth }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近6个月交易天数占比：</span>
                          <span class="top_content_money">{{ num2percent(invoiceInfo.tradeDaysL6Mth / 180) }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近6个月交易笔均：</span>
                          <span class="top_content_money">{{ (invoiceInfo.ttlTradeAmtAfDiscntL6Mth / invoiceInfo.ttlTradeNumL6Mth).toFixed(1) }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近6个月交易笔数：</span>
                          <span class="top_content_money">{{ invoiceInfo.ttlTradeNumL6Mth }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近6个月实付金额（折扣后）：</span>
                          <span class="top_content_money">{{ invoiceInfo.ttlTradeAmtAfDiscntL6Mth }}</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <div class="nuonuoBtn">
                    <el-button class="sytBYellow taxBtn" type="warning" @click="goNuonuo">查看餐饮经营信息报告</el-button>
                  </div>
                </div>
              </div>
              <!-- 金财线上企业税务数据 -->
              <div
                v-if="isJCOL"
                class="content_border jump-hook"
                id="selfGo-13"
               >
                <div class="content_title_head" :class="{'active__title' : curIndex === 13}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-13">企业税务数据</span>
                </div>
                <div class="content">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">企业名称：</span>
                          <span class="top_conten_title">{{taxDetail.nsrmc}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">法人姓名：</span>
                          <span class="top_conten_title">{{taxDetail.frname}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">纳税人状态：</span>
                          <span class="top_content_money">{{taxDetail.nsrzt}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">纳税人识别号：</span>
                          <span class="top_content_money">{{taxDetail.nsrsbh}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月企业所得税缴纳税额：</span>
                          <span class="top_content_money">{{ taxDetail.qysdsVo }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月增值税缴纳税额：</span>
                          <span class="top_content_money">{{ taxDetail.zzsVo }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近一年开票金额：</span>
                          <span class="top_content_money">{{ taxDetail.qyfpxx }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">纳税信用等级：</span>
                          <span class="top_content_money">{{taxDetail.pjjg}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近1年毛利润：</span>
                          <span class="top_content_money">{{ taxDetail.mlr }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近1年毛利率：</span>
                          <span class="top_content_money">{{ taxDetail.mll }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近1年净利润：</span>
                          <span class="top_content_money">{{ taxDetail.jlr }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近1年净利率：</span>
                          <span class="top_content_money">{{ taxDetail.jll }}</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <div class="nuonuoBtn">
                    <el-button class="sytBYellow taxBtn" type="warning" @click="goJCOL">查看税务征信报告</el-button>
                  </div>
                </div>
              </div>
              <!-- 易代账企业税务数据 -->
              <div
                v-if="isYDZ || isZWY || isKYKOL"
                class="content_border jump-hook"
                id="selfGo-13"
               >
                <div class="content_title_head" :class="{'active__title' : curIndex === 13}">
                  <span class="content_title_headA"></span>
                  <span v-if="isYDZ" class="content_title_headB" id="anchot-13">易代账企业税务数据</span>
                  <span v-if="isZWY" class="content_title_headB" id="anchot-13">金蝶账无忧企业税务数据</span>
                  <span v-if="isKYKOL" class="content_title_headB" id="anchot-13">客一客企业税务数据</span>
                </div>
                <div class="content">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">企业名称：</span>
                          <span class="top_conten_title">{{taxDetail.nsrmc}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">法人姓名：</span>
                          <span class="top_conten_title">{{taxDetail.frname}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">纳税人状态：</span>
                          <span class="top_content_money">{{getTdm(taxDetail.nsrztdm)}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">纳税人识别号：</span>
                          <span class="top_content_money">{{taxDetail.sh}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月企业所得税缴纳税额：</span>
                          <span class="top_content_money">{{ taxDetail.taxSDL12MPayAmtSys }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月增值税缴纳税额：</span>
                          <span class="top_content_money">{{ taxDetail.taxZZL12MPayAmtSys }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月销售额：</span>
                          <span class="top_content_money">{{ taxDetail.l12MLowerAmt }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">纳税信用等级：</span>
                          <span class="top_content_money">{{taxDetail.tax1YearCreditLevelSys }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近1年毛利润：</span>
                          <span class="top_content_money">{{ taxDetail.l1StYProfit }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近1年毛利率：</span>
                          <span class="top_content_money">{{ taxDetail.taxFinance12L1Y }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近1年净利润：</span>
                          <span class="top_content_money">{{ taxDetail.l1StYNetProfit }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近1年净利率：</span>
                          <span class="top_content_money">{{ taxDetail.taxFinance13L1Y }}</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <div class="nuonuoBtn">
                    <el-button class="sytBYellow taxBtn" type="warning" @click="goNuonuo">查看税务征信报告</el-button>
                  </div>
                </div>
              </div>
              <!-- 哗啦啦餐饮经营信息报告 -->
              <div
                v-if="isHLL"
                class="content_border jump-hook"
                id="selfGo-13"
               >
                <div class="content_title_head" :class="{'active__title' : curIndex === 13}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-13">哗啦啦餐饮经营信息报告</span>
                </div>
                <div class="content">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">企业名称：</span>
                          <span class="top_conten_title">{{companyInfo.basic.entname}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">法人姓名：</span>
                          <span class="top_conten_title">{{companyInfo.basic.frname}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">登记状态：</span>
                          <span class="top_content_money">{{companyInfo.basic.entstatus}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">纳税人识别号：</span>
                          <span class="top_content_money">{{companyInfo.basic.creditcode}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">渠道：</span>
                          <span class="top_content_money">哗啦啦</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">开业时长（天）：</span>
                          <span class="top_content_money">{{ blazeVaris.daysFromTradeEst }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近6个月有交易且每月交易天数大于3天的月份数：</span>
                          <span class="top_content_money">{{ blazeVaris.cntTradeGT3DaysL6Mth }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月有交易且每月交易天数大于3天的月份数：</span>
                          <span class="top_content_money">{{blazeVaris.cntTradeGT3DaysL12Mth}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">开机时长（天）：</span>
                          <span class="top_content_money">{{blazeVaris.daysFromEst}}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近6个月异常交易占比：</span>
                          <span class="top_content_money">{{ num2percent(blazeVaris.anTradeNumL6Mth / blazeVaris.ttlTradeNumL6Mth) }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近6个月有交易且每月交易天数大于7天的月份数：</span>
                          <span class="top_content_money">{{ blazeVaris.cntTradeGT7DaysL6Mth }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近12个月有交易且每月交易天数大于7天的月份数：</span>
                          <span class="top_content_money">{{ blazeVaris.cntTradeGT7DaysL12Mth }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近6个月交易天数占比：</span>
                          <span class="top_content_money">{{ num2percent(blazeVaris.tradeDaysL6Mth / 180) }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近6个月交易笔均：</span>
                          <span class="top_content_money">{{ (blazeVaris.ttlTradeAmtAfDiscntL6Mth / blazeVaris.ttlTradeNumL6Mth).toFixed(1) }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近6个月交易笔数：</span>
                          <span class="top_content_money">{{ blazeVaris.ttlTradeNumL6Mth }}</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_gray">近6个月实付金额（折扣后）：</span>
                          <span class="top_content_money">{{ blazeVaris.ttlTradeAmtAfDiscntL6Mth }}</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <div class="nuonuoBtn">
                    <el-button class="sytBYellow taxBtn" type="warning" @click="goNuonuo">查看餐饮经营信息报告</el-button>
                  </div>
                </div>
              </div>
              <!-- 费用信息 -->
              <div
                v-if="isCBHB"
                class="content_border jump-hook"
                id="selfGo-14"
               >
                <div class="content_title_head" :class="{'active__title' : curIndex === 14}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-14">费用信息</span>
                </div>
                <div class="content">
                  <div class="content_mian">
                    <div class="herBox">
                      <el-table
                        class="tables_width"
                        max-height="340"
                        :data="guaranteeFee"
                        style="margin:0 0 20px 20px"
                      >
                        <el-table-column prop="loanTerm" label="期限"></el-table-column>
                        <el-table-column prop="riskRateLevel" label="风险定价"></el-table-column>
                        <el-table-column prop="guaranteeFee" label="担保费"></el-table-column>
                        <el-table-column prop="payCount" label="担保费收取次数"></el-table-column>
                      </el-table>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 风险参数 -->
              <div class="content_border jump-hook" id="selfGo-15" v-if="!isSourceSurvey">
                <div class="content_title_head" :class="{'active__title' : curIndex === 15}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-15">风险参数</span>
                </div>
                <div class="content" v-if="!isDadao">
                  <el-form
                    :inline="true"
                    class="demo-form-inline risk-box"
                    ref="riskRule"
                    :model="aplRiskPara"
                    :rules="riskRule"
                  >
                  <div class="bg-purple">
                    <div class="top_conten text_left" style="float: none">
                      <span class="top_content_font">是否要转超分：</span>
                      <el-switch
                        :disabled="isEdit || ishighScoreSupportFlg"
                        v-model="aplRiskPara.switchHighScoreInd"
                        active-text="是"
                        inactive-text="否"
                        :width="50"
                      ></el-switch>
                    </div>
                    <div class="top_conten text_left" style="float: none" v-if="aplRiskPara.showSwitchProductInd">
                      <span class="top_content_font">是否转一级产品：</span>
                      <el-switch
                        :disabled="isEdit || !aplRiskPara.switchProductSupportFlg"
                        v-model="aplRiskPara.switchProductInd"
                        active-text="是"
                        inactive-text="否"
                        @change="changeProductInd"
                        :width="50"
                      ></el-switch>
                      <span  class="top_content_font" style="padding-left: 50px">一级产品名称：</span>
                      <el-form-item label prop="switchProductCode">
                        <el-select
                          :disabled="isEdit || !aplRiskPara.switchProductSupportFlg || !aplRiskPara.switchProductInd"
                          clearable
                          v-model="aplRiskPara.switchProductCode"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="items in switchProdutctItems"
                            :key="items.switchProducCode"
                            :label="items.switchProductDesc"
                            :value="items.switchProductCode"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_font">大数已授信贷款余额：</span>
                          <span class="top_content_money">{{aplRiskPara.dsfLimitAmt}}</span>
                          <span class="top_conten_title">元</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_font">总收入负债比：</span>
                          <span class="top_content_money">{{aplRiskPara.debtRatio}}</span>
                          <span class="top_conten_title">%</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_font">客户申请贷款金额：</span>
                          <span class="top_content_money">{{aplRiskPara.applicationSubmitAmt}}</span>
                          <span class="top_conten_title">元</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_font">最终可贷金额：</span>
                          <span class="top_content_money">{{aplRiskPara.finalResultAmt}}</span>
                          <span class="top_conten_title">元</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8" v-if="aplRiskPara.switchHighScoreInd">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_font">转超分贷金额：</span>
                          <span class="top_content_money">{{aplRiskPara.highScoreAmt}}</span>
                          <span class="top_conten_title">元</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_font">系统计算贷款金额：</span>
                          <span class="top_content_money">{{aplRiskPara.sysResultAmt}}</span>
                          <span class="top_conten_title">元</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8" v-show="isEasyLoan">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_font">核准成数：</span>
                          <span class="top_content_money">{{aplRiskPara.mortgageCreditRatio}}</span>
                          <!-- <span class="top_conten_title">元</span> -->
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="8">
                        <div class="grid-content bg-purple top_conten">
                          <span
                            class="top_content_font"
                            :style="{width:'40%',display:'block',float:'left'}"
                          >所有金融机构无担保授信额度(不含本笔):</span>
                          <el-form-item label prop="allCreditLimitAmt">
                            <input
                              type="text"
                              v-model.lazy="aplRiskPara.allCreditLimitAmt"
                              :disabled="isEdit"
                              autocomplete="off"
                              :class="{'el-input__inner': true, 'self-is-disabled': isEdit}"
                              @blur="formatMoney('aplRiskPara', 'allCreditLimitAmt'), verify('riskRule', 'allCreditLimitAmt')"
                            />
                          </el-form-item>
                          <span class="top_conten_title mid-title">元</span>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple top_conten">
                          <span
                            class="top_content_font"
                            :style="{width:'40%',display:'block',float:'left'}"
                          >已有无担保贷款月付额(含信用卡):</span>
                          <el-form-item label prop="unsecuredLoanPaymentAmt">
                            <input
                              type="text"
                              v-model.lazy="aplRiskPara.unsecuredLoanPaymentAmt"
                              :disabled="isEdit"
                              autocomplete="off"
                              :class="{'el-input__inner': true, 'self-is-disabled': isEdit}"
                              @blur="formatMoney('aplRiskPara', 'unsecuredLoanPaymentAmt'), verify('riskRule', 'unsecuredLoanPaymentAmt')"
                            />
                          </el-form-item>
                          <span class="top_conten_title mid-title">元</span>
                        </div>
                      </el-col>
                      <el-col class="top_content_font" :span="8">
                        <div class="grid-content bg-purple top_conten">
                          <span :style="{width:'40%',display:'block',float:'left'}">可调整金额:</span>
                          <el-form-item label prop="adjustmentAmt">
                            <input
                              type="text"
                              v-model.lazy="aplRiskPara.adjustmentAmt"
                              :disabled="isEdit"
                              autocomplete="off"
                              :class="{'el-input__inner': true, 'self-is-disabled': isEdit}"
                              @blur="formatMoney('aplRiskPara', 'adjustmentAmt'), verify('riskRule', 'adjustmentAmt')"
                            />
                          </el-form-item>
                          <span class="top_conten_title mid-title">元</span>
                        </div>
                      </el-col>

                  </el-row>
                  <!-- 加成贷 -->
                  <el-row :gutter="10" v-show="isPlusLoan">
                    <el-col :span="8">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_font">房产认定总值：</span>
                          <span class="top_content_money">{{aplRiskPara.estateTotalAmt}}</span>
                          <span class="top_conten_title">元</span>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple">
                        <div class="top_conten">
                          <span class="top_content_font">抵押物最高借款金额上限：</span>
                          <span class="top_content_money">{{aplRiskPara.collateralMaxLoanAmt}}</span>
                          <span class="top_conten_title">元</span>
                        </div>
                      </div>
                    </el-col>
                  </el-row>
                  <div class="btns">
                    <!-- <el-button
                      :disabled="!riskAble || isEdit"
                      class="small-btn"
                      @click="riskPara('saveOper')"
                    >测算保存</el-button> -->
                    <el-button
                      :disabled="!riskAble || aplRiskPara.combineDebtInd || isEdit"
                      class="small-btn"
                      @click="riskPara('combineOper')"
                    >{{combinLabel}}</el-button>
                    <el-button
                      :disabled="!riskAble || !aplRiskPara.combineDebtInd || isEdit"
                      class="small-btn_restore"
                      @click="riskPara('restoreOper')"
                    >还原</el-button>
                  </div>
                  </el-form>
                  <!-- 加成贷 -->
                  <plus-loan-com
                    ref="plusLoanCom"
                    v-if="showPlusLoanInd"
                    :plusLoanType="promptInfo.plusLoanType"
                    :comeFrom="comeFrom"
                    @plusEmailStatusFn="capturePlusEmailStatus"
                    :applicationId="applicationId"
                    :aplRiskPara="aplRiskPara"
                    :externalDisabled="isEdit">
                  </plus-loan-com>
                </div>
                <div class="content" v-else>
                  <!-- 大道 -->
                  <div class="risk-input-control">
                    <el-form ref="riskRule" :model="aplRiskPara" :rules="riskRule">
                      <el-row :gutter="20">
                        <el-col :span="8">
                          <div class="input-control">
                            <label>客户申请贷款金额：</label>
                            <el-input v-model="aplRiskPara.applicationSubmitAmt" disabled></el-input>
                            <span>元</span>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="input-control">
                            <label>系统计算贷款金额：</label>
                            <el-input v-model="aplRiskPara.sysResultAmt" disabled></el-input>
                            <span>元</span>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="input-control">
                            <label>最终可贷金额：</label>
                            <el-input v-model="aplRiskPara.finalResultAmt" disabled></el-input>
                            <span>元</span>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="input-control">
                            <label>复议金额：</label>
                            <el-input v-model="aplRiskPara.reconsiderationAmount" disabled></el-input>
                            <span>元</span>
                          </div>
                        </el-col>
                        <el-col :span="16">
                          <div class="input-control width700">
                            <label>抵押授权原因：</label>
                            <el-form-item label prop="autReason">
                              <!-- <el-input v-model="aplRiskPara.autReason" disabled></el-input> -->
                              <el-select disabled clearable v-model="aplRiskPara.autReason">
                                <el-option
                                  v-for="item in select.autReason"
                                  :key="item.itemCode"
                                  :value="item.itemCode"
                                  :label="item.itemDesc"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="input-control dadaoNum">
                            <el-form-item label prop="adjustmentAmt">
                              <label>可调整金额：</label>
                              <input
                                type="text"
                                v-model.lazy="aplRiskPara.adjustmentAmt"
                                :disabled="isEdit"
                                autocomplete="off"
                                :class="{'el-input__inner': true, 'self-is-disabled': isEdit}"
                                @blur="formatMoney('aplRiskPara', 'adjustmentAmt'), verify('riskRule', 'adjustmentAmt')"
                              />
                              <span>元</span>
                            </el-form-item>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="input-control dadaoNum">
                            <el-form-item label prop="adjustmentLtv">
                              <label>可调整成数：</label>
                              <!-- <el-input-number
                                v-model="aplRiskPara.adjustmentLtv"
                                :precision="2"
                                :controls="false"
                                :disabled="isEdit"
                              ></el-input-number> -->
                              <input
                                type="text"
                                v-model.lazy="aplRiskPara.adjustmentLtv"
                                :disabled="isEdit"
                                autocomplete="off"
                                :class="{'el-input__inner': true, 'self-is-disabled': isEdit}"
                                @blur="formatMoney('aplRiskPara', 'adjustmentLtv'), verify('riskRule', 'adjustmentLtv')"
                              />
                              <!-- <span>元</span> -->
                            </el-form-item>
                          </div>
                        </el-col>
                      </el-row>
                      <div class="submit-control">
                        <!-- <el-button
                          :disabled="!riskAble || isEdit"
                          class="small-btn"
                          @click="riskPara('saveOper')"
                        >测算保存</el-button> -->
                      </div>
                    </el-form>
                  </div>
                </div>
              </div>
              <!-- 电核结论 -->
              <div
                class="content_border jump-hook"
                id="selfGo-16"
                v-if="!isDadao && !isSourceSurvey"
               >
                <div class="content_title_head" :class="{'active__title' : curIndex === 16}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-16">电核结论</span>
                </div>
                <div class="content">
                  <div class="content_mian">
                    <div style="margin-bottom: 20px">
                      <span class="top_conten_title">电核规则:</span>
                      <span
                        class="black_font"
                        :style="getFontColor(phoneCheckConclusion.telInvestFlagNewInd) && ('color: ' + getFontColor(phoneCheckConclusion.telInvestFlagNewInd))"
                      >{{(phoneCheckConclusion.telInvestFlag === "1")?"需要电核": "免核"}}</span>
                      <div :style="{float:'right'}"></div>
                    </div>
                    <div
                      class="content_mian_table top_content_font"
                      :style="{'min-height': '110px'}"
                    >
                      <p
                        v-for="(item, index) in phoneCheckConclusion.ruleActionList"
                        :key="index"
                      >
                        <span :style="getFontColor(item.newInd) && ('color: ' + getFontColor(item.newInd))">{{ item.ruleAction }}</span>
                      </p>
                    </div>
                    <div class="check-phone-box" style="margin: 30px 0">
                      <el-form
                        :model="aprPhoneCheckInfo"
                        ref="aprPhoneCheck"
                        :rules="aprPhoneCheckInfoRule"
                      >
                        <el-form-item class="riskMarkCode" prop="riskMarkCode">
                          <el-select
                            :disabled="isEdit"
                            clearable
                            v-model="aprPhoneCheckInfo.riskMarkCode"
                            multiple
                            placeholder="请选择风险标识"
                          >
                            <el-option
                              v-if="riskFlag.length>0"
                              v-for="(item, index) in riskFlag"
                              :key="index"
                              :label="item.itemDesc"
                              :value="item.itemCode"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <!-- <el-form-item prop="decisionCode" class="multipleSel">
                          <span
                            class="clear-select"
                            style="right: 10px"
                            @click="clearSel"
                            v-if="(aprPhoneCheckInfo.decisionCode && aprPhoneCheckInfo.decisionCode.length>0) || !isEdit"
                          >X</span>
                          <div
                            class="mask"
                            style="width: 650px"
                            v-if="aprPhoneCheckInfo.decisionCode&&aprPhoneCheckInfo.decisionCode.length > 0"
                          >{{selectSpan.join(",")}}</div>
                          <el-select
                            popper-class="phoneSelect"
                            :disabled="isEdit"
                            multiple
                            v-model="aprPhoneCheckInfo.decisionCode"
                            placeholder="请选择电核结论"
                            @change="changePhoneCheck"
                          >
                            <el-option
                              v-for="item in riskResult"
                              :key="item.level2Code"
                              :label="item.level1Desc + '+' + item.level2Desc"
                              :value="item.level2Code"
                            ></el-option>
                          </el-select>
                        </el-form-item> -->
                        <el-form-item prop="decisionCode">
                          <el-cascader
                            class="custom-cascader"
                            v-model="aprPhoneCheckInfo.decisionCode"
                            placeholder="请选择电核结论"
                            :options="riskResult"
                            :props="{ multiple: true, value: 'code', label: 'name' }"
                            style="width: 650px;"
                            filterable @change="changePhoneCheck"
                            popper-class="custom-cascader__popper"></el-cascader>
                        </el-form-item>
                        <div style="display:inline-block">
                          <el-button
                            :disabled="isEdit"
                            class="small-btn vertical-align-top"
                            plain
                            @click="saveAprPhoneCheckInfo"
                          >保存</el-button>
                          <span
                            class="vertical-align-sup"
                            :style="{'color':'#F55F5F','padding-left':'10px'}"
                          >结论：{{opnionCode}}</span>
                        </div>
                      </el-form>
                      <div style="margin-top: 20px;">
                        <el-cascader
                          class="custom-cascader"
                          v-model="aprPhoneCheckInfo.derateReason"
                          placeholder="请选择降额原因"
                          :options="derateOptions"
                          :props="{ multiple: true, value: 'code', label: 'name' }"
                          style="width: 650px;"
                          filterable
                          popper-class="custom-cascader__popper"></el-cascader>
                      </div>
                    </div>
                    <div class="content_mian_title">
                      <span>审批电核内容</span>
                    </div>
                    <div
                      class="content_mian_table top_content_font"
                      :style="{'min-height': '110px'}"
                    >
                      <p v-for="(item, index) in aprResult" :key="item + index">{{item}}</p>
                      <br v-if="aprResult.length > 0">
                      <p
                        v-if="phoneCheckConclusion.taskNodeCode === 'approveTask'"
                        v-for="(item, index) in phoneCheckConclusion.phoneCheckContentArray"
                        :key="item + index + 'i'"
                      >{{item}}</p>
                    </div>
                    <div v-if="sendBackFlg" class="content_mian_title">
                      <span>审计电核内容</span>
                    </div>
                    <div
                      v-if="sendBackFlg"
                      class="content_mian_table top_content_font"
                      :style="{'min-height': '110px'}"
                    >
                      <p v-for="(item, index) in aduResult" :key="item + index">{{item}}</p>
                      <br v-if="aduResult.length > 0">
                      <p
                        v-if="phoneCheckConclusion.taskNodeCode === 'auditTask'"
                        v-for="(item, index) in phoneCheckConclusion.phoneCheckContentArray"
                        :key="item + index + 'i'"
                      >{{item}}</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 预审批结论 -->
              <div class="content_border jump-hook" id="selfGo-17" v-if="ydApproveMode2">
                <div class="content_title_head" :class="{'active__title' : curIndex === 17}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-17">预审批结论</span>
                </div>
                <div class="content">
                  <div
                    class="content_mian"
                    v-if="preAprConclusion.conclusionList.length > 0"
                    v-for="(item, index) in preAprConclusion.conclusionList"
                    :key="index"
                  >
                    <div class="content_mian_title">
                      <span>第{{index + 1}}次预审批结论</span>
                    </div>
                    <div class="top_content_font">{{ item.decisionTxt }}</div>
                  </div>
                  <div class="content_mian">
                    <!-- <div class="extrane">
                      <label>外网查询结论：</label>
                      <el-select placeholder="请选择" v-model="preAprConclusion.aprExtranetStatusCode" :disabled="true">
                        <el-option v-for="item in extranetStatusCodes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                      </el-select>
                    </div>
                    <textarea
                      :disabled="true"
                      class="top_content_font"
                      maxlength="500"
                      cols="100%"
                      rows="10%"
                      :style="{'resize':'none', 'width': '100%', 'height': '110px', 'outline': 'none', 'border': '1px solid #d0d0d0', 'margin': '10px 0'}"
                      v-model.lazy="preAprConclusion.aprExtranetRemark"
                      placeholder="请输入外网查询备注"
                    ></textarea> -->
                    <textarea
                      :disabled="true"
                      class="top_content_font"
                      maxlength="1000"
                      cols="100%"
                      rows="10%"
                      :style="{'resize':'none', 'width': '100%', 'height': '110px', 'outline': 'none', 'border': '1px solid #d0d0d0'}"
                      v-model.lazy="preAprConclusion.decisionTxt"
                      placeholder="请输入预审批结论"
                    ></textarea>
                  </div>
                </div>
              </div>
               <!-- 预审计结论 -->
              <div class="content_border jump-hook" id="selfGo-18" v-if="ydApproveMode2">
                <div class="content_title_head" :class="{'active__title' : curIndex === 18}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-18">预审计结论</span>
                </div>
                <div class="content" style="min-height:50px">
                  <div class="content_mian">
                    <!-- <div class="extrane">
                      <label>外网查询结论：</label>
                      <el-select placeholder="请选择" v-model="preAudConclusion.audExtranetStatusCode" :disabled="true">
                        <el-option v-for="item in extranetStatusCodes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                      </el-select>
                    </div>
                    <textarea
                      :disabled="true"
                      class="top_content_font"
                      maxlength="500"
                      cols="100%"
                      rows="10%"
                      :style="{'resize':'none', 'width': '100%', 'height': '110px', 'outline': 'none', 'border': '1px solid #d0d0d0', 'margin': '10px 0'}"
                      v-model.lazy="preAudConclusion.audExtranetRemark"
                      placeholder="请输入外网查询备注"
                    ></textarea> -->
                    <textarea
                      :disabled="true"
                      class="top_content_font"
                      cols="100%"
                      :style="{'resize':'none', 'width': '100%', 'height': '110px', 'outline': 'none', 'border': '1px solid #d0d0d0'}"
                      v-model.lazy="preAudConclusion.decisionTxt"
                      maxlength="1000"
                      placeholder="请输入预审计结论"
                    ></textarea>
                  </div>
                </div>
              </div>
              <!-- 审批结论 -->
              <div class="content_border jump-hook" id="selfGo-19" v-if="!isSourceSurvey">
                <div class="content_title_head" :class="{'active__title' : curIndex === 19}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-19">审批结论</span>
                </div>
                <div class="content">
                  <div
                    class="content_mian"
                    v-if="aprConclusion.conclusionList.length > 0"
                    v-for="(item, index) in aprConclusion.conclusionList"
                    :key="index"
                   >
                    <div class="content_mian_title">
                      <span>第{{index + 1}}次审批结论</span>
                    </div>
                    <div class="top_content_font">{{ item.decisionTxt }}</div>
                  </div>
                  <div class="content_mian">
                    <!-- <div class="content_mian_title"><span>身份真实性</span></div> -->
                    <div class="extrane">
                      <label>外网查询结论：</label>
                      <el-select placeholder="请选择" v-model="aprConclusion.aprExtranetStatusCode" :disabled="isEdit">
                        <el-option v-for="item in extranetStatusCodes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
                      </el-select>
                    </div>
                    <textarea
                      :disabled="isEdit"
                      class="top_content_font"
                      maxlength="500"
                      cols="100%"
                      rows="10%"
                      :style="{'resize':'none', 'width': '100%', 'height': '110px', 'outline': 'none', 'border': '1px solid #d0d0d0', 'margin': '10px 0'}"
                      v-model.lazy="aprConclusion.aprExtranetRemark"
                      placeholder="请输入外网查询备注"
                    ></textarea>
                    <textarea
                      :disabled="isEdit"
                      class="top_content_font"
                      maxlength="1000"
                      cols="100%"
                      rows="10%"
                      :style="{'resize':'none', 'width': '100%', 'height': '110px', 'outline': 'none', 'border': '1px solid #d0d0d0'}"
                      v-model.lazy="aprConclusion.decisionTxt"
                      placeholder="请输入审批结论"
                    ></textarea>
                  </div>
                </div>
              </div>
              <!-- 审批退回原因 -->
              <div class="content_border jump-hook" v-if="sendBackFlg" id="selfGo-20">
                <div class="content_title_head" :class="{'active__title' : curIndex === 20}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-20">审计退回原因</span>
                </div>
                <div class="content" style="min-height:50px">
                  <div
                    class="content_mian"
                    v-if="audConclusion.conclusionList.length > 0"
                    v-for="(items, index) in audConclusion.conclusionList"
                    :key="index"
                  >
                    <span class="top_conten_title">审计人员：</span>
                    <span class="top_content_font" style="margin-right:10px">{{items.createdBy}}</span>
                    <span class="top_conten_title">退回时间：</span>
                    <span class="top_content_font" style="margin-right:10px">{{items.createdDate}}</span>
                    <p v-if="items.rejectReasonTxt">{{items.rejectReasonTxt.split("|").join(",")}}</p>
                    <p>{{items.opinionTxt}}</p>
                  </div>
                </div>
              </div>
              <!-- <div class="jump-hookend">
              </div>-->
              <div class="content_border jump-hook jump-hookend">
                <div class="content_title_head">
                  <!-- <span class="content_title_headA"></span> -->
                </div>
              </div>
            </div>
          </div>
          <!-- </el-col> -->
          <!-- </el-row> -->
        </div>
      </div>
    </div>
    <transition name="fade">
      <add-loan
        v-if="openAddLoanDg"
        :application-id="applicationId"
        :row="loanRow"
        @close="closeLoan"
      ></add-loan>
    </transition>
    <transition name="fade">
      <add-guarantor
        v-if="openAddGuarantorDg"
        @close="closeGuarantor"
        :application-id="applicationId"
        :house-id-list="enableHouseIdList"
        :house-id="guarantorHouseId"
        :guarantor-id="guarantorId"
        :has-submit="isEdit"
      ></add-guarantor>
    </transition>
    <div name="fade">
      <house-message
        v-if="openHouseMessageDg && !isEasyLoan && !isPlusLoan"
        :has-submit="isEdit"
        @close="closeHouseMessage"
        :house-id="houseId"
        :house-id-list="houseIdList"
        :areaList="options"
        :application-id="applicationId"
      ></house-message>
      <easy-loan-houseMsg
        v-if="openHouseMessageDg && isEasyLoan"
        :has-submit="isEdit"
        @close="closeHouseMessage"
        :house-id="houseId" :isValid="true"
        :house-id-list="houseIdList"
        :areaList="options"
        :isPlusLoan="isPlusLoan"
        :application-id="applicationId"
      ></easy-loan-houseMsg>
      <easy-loan-houseMsg
        v-if="openHouseMessageDg && isPlusLoan"
        :has-submit="isEdit"
        @close="closeHouseMessage"
        :house-id="houseId" :isValid="true"
        :house-id-list="houseIdList"
        :areaList="options"
        :plusLoanType="promptInfo.plusLoanType"
        :isPlusLoan="isPlusLoan"
        :application-id="applicationId"
      ></easy-loan-houseMsg>
    </div>
    <transition name="fade">
      <customer-tax-info
        v-if="openTaxInfoDg"
        @close="closeCustomerTaxInfo"
        :taxPayerNum="organizationTax.taxpayerNum"
        class="audit_and_approval_tax"
      ></customer-tax-info>
      <house-message2
        v-if="openHouseMessageDg2"
        :has-submit="isEdit"
        @close="closeHouseMessage2"
        :estateNum="estateNum"
        :house-id="houseId"
        :house-id-list="houseIdList"
        :areaList="options"
        :application-id="applicationId"
        :is-dadao="isDadao"
      ></house-message2>
    </transition>
    <!-- 组件 -->
    <!-- 担保人 -->
    <!-- <addGuarantor v-if="alertAddGuarantor" @clsoe_windowAlert='close_addGuarantor' /> -->
    <!-- 影像资料 -->
    <videoData v-if="alertVideo" @clsoe_windowAlert="close_video"/>
    <!-- 电核勾选 -->
    <phoneCheck
      v-if="alertPhoneCheck"
      :disabled="isEdit"
      @clsoe_windowAlert="close_phonecheck"
      :appOrAud="appOrAud"
      :sendBackFlg="sendBackFlg"
    />
    <!-- 备注 -->
    <remark
      v-if="alertRemark"
      @clsoe_windowAlert="close_remark"
      :appOrAud="appOrAud"
      :disabled="isEdit && plusEmailStatus !== 'send_success'"
    />
    <!-- 补件 -->
    <patchBolt
      v-if="alertPatchBolt"
      :disabled="(isEdit && plusEmailStatus !== 'send_success' && !isCBHB) || comeFrom !== 'pending'"
      :imageExistFlg="imageExistFlg"
      @clsoe_windowAlert="close_patchBolt"
      :appOrAud="appOrAud"
      :isCxPatch='isCxPatch'
      :PatchHisDto="PatchHisDto"
      :patchClassCode="patchClassCode"
      :patchStatusCode="businessStatus.patchStatusCode"
    />
    <!-- 补件二 -->
    <patchBolt2
      v-if="alertPatchBolt2 && PatchHisDto.length"
      :disabled="(isEdit && plusEmailStatus !== 'send_success' && !isCBHB) || comeFrom !== 'pending'"
      :imageExistFlg="imageExistFlg"
      :applicationId="applicationId"
      @reset="reset"
      :appOrAud="appOrAud"
      @alertPatchBolt="addPatch"
      @clsoe_windowAlert="close_patchBolt2"
      :PatchHisDto="PatchHisDto"
      :patchClassCode="patchClassCode"
      :patchStatusCode="businessStatus.patchStatusCode"
    />
    <!-- 调查1 -->
    <survey
      v-if="alertSurvey"
      @clsoe_windowAlert="close_survey"
      :disabled="(isEdit && plusEmailStatus !== 'send_success') || comeFrom !== 'pending'"
      :appOrAud="appOrAud"
      :isBORF="showBORF"
      :survey_type_code='survey_type_code'
      @surveyStatusCodeChange="surveyCodeChange"
      :surveyReasonCode="surveyReasonCode"
      :surveyHis="surveyHis"
      :surveyStatusCode="businessStatus.surveyStatusCode"
    />
    <!-- 调查2 -->
    <survey2
      v-if="alertSurvey2"
      :surveyStatus="surveyStatus"
      :showBtn="showBtn"
      :applicationId="applicationId"
      :disabled="(isEdit && plusEmailStatus !== 'send_success') || comeFrom !== 'pending'"
      :survey_type_code='survey_type_code'
      :isBORF="showBORF"
      @clsoe_windowAlert="close_survey2"
      :appOrAud="appOrAud"
      @surveyStatusCodeChange="surveyCodeChange"
      :surveyReasonCode="surveyReasonCode"
      :surveyHis="surveyHis"
      :surveyStatusCode="businessStatus.surveyStatusCode"
    />
    <submitA
      v-if="alertSubmitA"
      @clsoe_windowAlert="close_submitA"
      :appOrAud="appOrAud"
      :isSuper="aplRiskPara.switchHighScoreInd"
      :surveyStatusCode="businessStatus.surveyStatusCode"
      :highScoreAmtMoney="aplRiskPara.highScoreAmt"
    />
    <!-- 历史贷款记录 -->
    <face2face-detail
      class="history-face"
      :dialogVisible="dialogVisible"
      :applicationId="oldApplicationId"
      :creditReportId="creditReportId"
      @closeDialog="closeFn"
    ></face2face-detail>
    <!-- 关注信息检测 -->
    <!-- <detectionMsg
      v-if="alertDetectionMsg"
      @clsoe_windowAlert="close_detectionMsg"
      :appOrAud="appOrAud"
      :disabled="isEdit"
    /> -->
    <!-- 汇法网弹窗 -->
    <threedataNowday
      :personMsgFun="this.personMsgFun"
      v-if="alertThreedataNowday"
      :appOrAud="appOrAud"
      @close_windowAlert="close_threedataNowday"
      :pOrCalert="this.pOrCalert"
    />
    <threedataNowdayB
      v-if="alertThreedataNowdayB"
      :appOrAud="appOrAud"
      @close_windowAlert="close_threedataNowdayB"
    />
    <popup
      :isShowDialog="isShowCredit"
      :isAppAud="false"
      :applicationId="applicationId"
      :url="creditReport"
      :isReport="true"
      :iframe="true"
      :center="true"
      :width="800"
      :height="700"
      @closeDialog="isShowCredit = false"
    ></popup>
    <tobaccoLoan @popup="tobaccoPopup" :tobaccoLoanValue="tobaccoLoanValue" v-if="tobaccoLoanFlag"></tobaccoLoan>
    <taxcredit @popup="getTaxPopup" :taxInfoList="taxInfoList" v-if="getTaxFlag"></taxcredit>
    <phoneVideo
      v-if="alertPhoneVideo"
      :id="id"
      @clsoe_videoList="close_phonevideo"
      :appOrAud="appOrAud"
    />
  </div>
</template>
<script src="./approval-pending-start.js"></script>
