<style lang='less' src="../../../approval/approval-pending/approval-pending-start/approval-pending-start.less" scoped></style>
<style lang='less' scoped>
/deep/.el-table__body-wrapper {
  // height: 144px;
  overflow-y: scroll;
}
.jump-hookend {
  margin-top: 0;
  padding-bottom: 600px;
}
.audit_box {
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
    /deep/ .el-tabs__item.is-active {
      font-size: 12px;
    }
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
      border-bottom: 1px solid #e5e5e5;
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
.dialog__table-box.customer-message {
  .tab-box {
    .el-tabs__nav-wrap {
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
.aaa {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 999;
  margin-top: -85px;
  margin-left: -220px;
}
.approval-index .customer-message /deep/.el-tabs__nav-wrap {
  padding: 0;
}
.tobacco_loan .my_table {
  tbody {
    display: block;
    height: 200px;
    overflow-y: scroll;
  }
  thead,
  tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  thead tr {
    background: #f9fafb;
    box-shadow: 0 1px 0 0 #e5e5e5;
    text-align: center;
    th {
      font-size: 12px;
      color: #666;
      letter-spacing: 0;
    }
  }
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
  }
  .submit-control {
    clear: both;
    padding-top: 15px;
  }
}
</style>

<template>
  <div>
    <div v-if="qwer" class="aaa">
      <div class="audit_box">
        <div class="audit_top">
          <div class="backAudit">
            <div v-if="isFromList">
              <router-link to="/system/approvalAudit/audit/audit-pending" class="blue_font bold">待处理</router-link>
              <span class="el-icon-arrow-left"></span>
              <span class="black_font">审计</span>
            </div>
            <!-- 影像资料备注 -->
            <div class="image_blue">
              <el-button
                class="sytCBlue"
                v-if="isEdit"
                type="text"
                @click="$showImage(applicationId, '贷款审计', {ReadOnly: '0'})"
              >影像资料</el-button>
              <el-button
                class="sytCBlue"
                v-else
                type="text"
                @click="$showImage(applicationId, '贷款审计')"
              >影像资料</el-button>
              <el-button type="text" class="sytCBlue" @click="alert_remark()">备注</el-button>
            </div>
          </div>
          <div class="content top_num">
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
              <span class="top_conten_title">产品2：</span>
              <span class="top_content_font">{{promptInfo.productName2 || "-"}}</span>
            </div>
            <div class="contentHr"></div>
            <div class="clearfloat" style="margin-bottom: 10px">
              <div class="grade_all">
                <!-- 业务状态评分 -->
                <div class="grade">
                  <span class="black_font bold">业务状态：</span>
                  <span class="black_font">{{surveyState}}</span>
                  <span v-if="surveyState && surveyStatus">/</span>
                  <span class="black_font">{{surveyStatus}}</span>
                </div>
                <div class="grade">
                  <span class="black_font bold">业务评分：</span>
                  <span class="black_font">{{businessStatus.riskScore}}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- 保存提交按钮 -->
          <div class="clearfloat content_btn">
            <div class="grade">
              <el-button type="text" class="sytCBlue" @click="alert_patchBolt()">补件</el-button>
              <el-button type="text" class="sytCBlue" @click="alert_survey()">调查</el-button>
              <el-button type="text" class="sytCRed" @click="alert_comeback()">退回</el-button>
              <!-- <el-button type="text" class="" @click="alert_self()">自己</el-button> -->
            </div>
            <div class="tail_btn">
              <!-- <el-button
                class="small-btn sytCall"
                @click="alert_phone_check()"
                style="width:140px"
              >拨打电话</el-button> -->
              <el-button
                class="sytBYellow"
                :disabled="isEdit"
                type="warning"
                style="width:140px"
                @click="saveOperAll()"
              >保存</el-button>
              <el-button
                class="sytBBlue"
                :disabled="isEdit"
                type="primary"
                style="width:140px"
                @click="alert_submitA()"
              >提交</el-button>
            </div>
          </div>
        </div>
        <div class="audit_bottom" id="test1">
          <!-- 左侧导航栏 -->
          <div class="grid-content bg-purple">
            <div class="content content_nav">
              <a
                href="javascript:void(0)"
                @click="goAnchor('anchot-' + index, index)"
                v-show="!dynamicColumn(index)"
                v-for="(item, index) in navTitle"
                :key="index"
                :class="{'active' : curIndex === index, 'hide': (index === 12 && !isTaxLoan), 'bukan': (index === 10 && !tbFlag), 'bukan2': (index === 11 && !ftFlag), 'bukan3': (index === 14 && isDadao)}"
              >
                <div
                  :class="{'sytCBlue':curIndex === index,'black_font': true,'bold': true}"
                >{{item}}</div>
              </a>
            </div>
          </div>
          <!-- 主内容 -->
          <div class="audit_bottom_content grid-content bg-purple" style="margin-bottom: 60px">
            <div class="content_right_box">
              <!-- 规则检测 -->
              <div class="content_border jump-hook" id="selfGo-0">
                <div class="content_title_head" :class="{'active__title' : curIndex === 0}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-0">规则检测</span>
                </div>
                <div class="content">
                  <el-table
                    :data="ruleDetection"
                    class="tables tables_width"
                    max-height="200"
                    :header-cell-style="{'font-size':'12px','text-align':'center','height':'38.9px','background':'#F9FAFB'}"
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
                    <el-table-column prop="ruleTriggerReason" label="规则触发原因"></el-table-column>
                  </el-table>
                </div>
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
                      <span class="top_content_font">{{personalInfo.custName}}</span>
                    </div>
                    <div class="top_conten">
                      <span class="top_conten_title">身份证号：</span>
                      <span class="top_content_font">{{personalInfo.certificateNum}}</span>
                    </div>
                    <div class="top_conten">
                      <span class="top_conten_title">性别：</span>
                      <span class="top_content_font">{{ruleForm.genderCode}}</span>
                    </div>
                    <div class="top_conten">
                      <span class="top_conten_title">户籍所在地：</span>
                      <span class="top_content_font">{{Address}}</span>
                    </div>
                    <div class="top_conten">
                      <span class="top_conten_title">户籍详细地址：</span>
                      <span class="top_content_font">{{personalInfo.registeredAddressDesc}}</span>
                    </div>
                    <div class="top_conten">
                      <span class="top_conten_title">居住地区：</span>
                      <span class="top_content_font">{{residential}}</span>
                    </div>
                    <div class="top_conten">
                      <span class="top_conten_title">客户类型：</span>
                      <span class="top_content_font">{{careerTypeCode}}</span>
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
                        <el-input
                          :disabled="!(ruleForm.maritalStatusCode === '20' || ruleForm.maritalStatusCode === '22') || isEdit"
                          maxlength="30"
                          v-model="ruleForm.spouseName"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="配偶证件类型" prop="spouseIdTypeCode" class="is-required">
                        <el-select
                          clearable
                          style="width: 100%"
                          v-model="ruleForm.spouseIdTypeCode"
                          :disabled="!(ruleForm.maritalStatusCode === '20' || ruleForm.maritalStatusCode === '22') || hasSubmit || isEdit"
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
                        <el-input
                          :disabled="!(ruleForm.maritalStatusCode === '20' || ruleForm.maritalStatusCode === '22') || isEdit"
                          maxlength="50"
                          v-model="ruleForm.spouseIdNum"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="居住状况" prop="houseConditionCode" class="is-required">
                        <el-select
                          :disabled="isEdit"
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
                      <el-form-item label="微信号" prop="wechatNum" class="is-required">
                        <el-input :disabled="isEdit" v-model="ruleForm.wechatNum"></el-input>
                      </el-form-item>
                      <el-form-item label="居住详细地址" class="is-required" prop="houseAddressDesc">
                        <el-input
                          :disabled="isEdit"
                          maxlength="100"
                          v-model="ruleForm.houseAddressDesc"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="占股情况" class="is-required" prop="sharePercent">
                        <el-select
                          :disabled="!(ruleForm.careerTypeCode==='060') || isEdit"
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
                      <div :style="{'height':'1px', 'float':'left', 'width': '100%'}"></div>
                      <el-form-item
                        style="margin-left:30px"
                        class="is-required-button"
                        label="是否注册"
                        prop="registeredInd"
                      >
                        <el-switch
                          :disabled="!(ruleForm.careerTypeCode==='060') || isEdit"
                          v-model="ruleForm.registeredInd"
                          active-text="是"
                          inactive-text="否"
                          :width="50"
                        ></el-switch>
                      </el-form-item>
                      <el-form-item
                        class="is-required-button"
                        label="是否有本地房产"
                        prop="localEstateInd"
                        :style="{'width': '100px'}"
                      >
                        <el-switch
                          :disabled="isEdit"
                          v-model="ruleForm.localEstateInd"
                          active-text="是"
                          inactive-text="否"
                          :width="50"
                        ></el-switch>
                      </el-form-item>
                      <el-form-item
                        label="6个月内是否正常缴纳公积金"
                        class="is-required"
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
                <div class="content">
                  <div style="overflow:hidden; margin:0 0 10px 0">
                    <!-- <div class="top_conten">
                      <span class="top_conten_title">单位地区：</span>
                      <span class="top_content_font">{{workplaceName}}</span>
                    </div> -->
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
                        <el-input
                          :disabled="isEdit"
                          maxlength="100"
                          v-model="ruleWorkInfo.workplaceName"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="详细单位地址" class="is-required" prop="workAddressDesc">
                        <el-input
                          :disabled="isEdit"
                          maxlength="100"
                          v-model="ruleWorkInfo.workAddressDesc"
                        ></el-input>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </div>
              <!-- 联系人 -->
              <div class="content_border jump-hook" id="selfGo-3" v-if="!isSourceSurvey">
                <div class="content_title_head" :class="{'active__title' : curIndex === 3}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-3">联系人信息</span>
                </div>
                <div class="content">
                  <!-- 联系人 -->
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
                        <el-col :span="5">
                          <div class="grid-content bg-purple-light">备注信息1</div>
                        </el-col>
                        <el-col :span="5">
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
                                <el-input
                                  :disabled="isEdit || (item.contactRelationCode==='0000')?true:false || item.phoneCheckInd"
                                  maxlength="30"
                                  v-model="item.phoneCheckName"
                                ></el-input>
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
                                <el-input
                                  :disabled="isEdit || (item.contactRelationCode==='0000')?true:false || item.phoneCheckInd"
                                  maxlength="20"
                                  v-model="item.phoneCheckPhoneNum"
                                ></el-input>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="5">
                            <div class="grid-content bg-purple-light">
                              <el-form-item>
                                <!-- <el-input
                                  :disabled="isEdit"
                                  maxlength="200"
                                  v-model="item.phoneCheckRemarkTxt1"
                                ></el-input> -->
                                <span class="CallRemarkTxt" :title="item.approveRemarkTxt">{{item.approveRemarkTxt || "-"}}</span>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="5">
                            <div class="grid-content bg-purple-light">
                              <el-form-item>
                                <el-input
                                  resize="none"
                                  type="textarea"
                                  autosize
                                  class="CallRemarkTxt"
                                  :title="item.auditRemarkTxt"
                                  :disabled="isEdit"
                                  maxlength="500"
                                  v-model="item.auditRemarkTxt"
                                ></el-input>
                                <!-- <span>{{item.phoneCheckRemarkTxt2 || "-"}}</span> -->
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
                          <!-- <textarea v-if="item.phoneCheckInd" class="markMsg"></textarea> -->
                          <el-input
                            resize="none"
                            type="textarea"
                            autosize
                            :title="item.aprPhoneCheckRemark"
                            v-if="item.showTxt1"
                            maxlength="500"
                            :disabled="isEdit || !appOrAud"
                            class="txt"
                            v-model="item.aprPhoneCheckRemark"
                            placeholder="请填写审批备注"
                          ></el-input>
                          <el-input
                            resize="none"
                            type="textarea"
                            autosize
                            :title="item.audPhoneCheckRemark"
                            v-if="item.showTxt2"
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
                  <!-- <div class="list_box" v-else>
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
                        <el-col :span="10">
                          <div class="grid-content bg-purple-light">备注信息1</div>
                        </el-col>
                        <el-col :span="6">
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
                        v-if="aplContactInfo.length > 0"
                        v-for="(item, index) in aplContactInfo"
                        :key="index"
                      >
                        <el-form
                          :model="item"
                          :ref="'aplContactInfo'+index"
                          label-width="100px"
                          :rules="contactRules"
                          label-position="top"
                        >
                          <el-col :span="2">
                            <div class="grid-content bg-purple">
                              <el-form-item prop="contactName">
                                <el-input
                                  :disabled="isEdit || (item.relationshipCode==='0000')?true:false"
                                  maxlength="30"
                                  v-model="item.contactName"
                                ></el-input>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="3">
                            <el-form-item prop="relationshipCode">
                              <el-select
                                :disabled="isEdit || (item.relationshipCode==='0000')?true:false"
                                clearable
                                v-model="item.relationshipCode"
                                @change="changeRelation(index)"
                                placeholder="请选择"
                              >
                                <el-option
                                  v-for="items in contactRelationShip"
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
                              <el-form-item prop="mobileNum">
                                <el-input
                                  :disabled="isEdit || (item.relationshipCode==='0000')?true:false"
                                  maxlength="20"
                                  v-model="item.mobileNum"
                                ></el-input>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="10">
                            <div class="grid-content bg-purple-light">
                              <el-form-item prop="approveRemarkTxt">
                                <el-input
                                  :disabled="isEdit"
                                  maxlength="200"
                                  v-model="item.approveRemarkTxt"
                                ></el-input>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="6">
                            <el-button
                              class="sytCBlue"
                              :disabled="isEdit"
                             @click="makePhone(item, index)"
                              type="text"
                            >拨打</el-button>
                            <el-button
                              class="sytCBlue"
                              :disabled="isEdit"
                              @click="alert_phone_video(item.id, item)"
                              type="text"
                            >查询录音</el-button>
                            <el-button
                              class="sytCBlue"
                              :disabled="isEdit"
                              @click="deleteContact(index)"
                              type="text"
                            >删除</el-button>
                          </el-col>
                          <textarea class="markMsg"></textarea>
                        </el-form>
                      </el-row>
                      <el-button
                        :disabled="isEdit"
                        class="my_table_btn sytCBlue"
                        @click="addContactPerson"
                      >+</el-button>
                      <el-button
                      class="my_table_btn sytCBlue"
                      :disabled="isEdit"
                      type="primary"
                      :style="{width:'100px',height:'30px','margin':'0 0 20px 20px'}"
                      @click="saveContact"
                    >保存</el-button>
                    </div>
                  </div>-->
                  <!-- <div :style="{'text-align':'left'}">
                    <el-button
                      class="my_table_btn sytCBlue"
                      :disabled="isEdit"
                      type="primary"
                      :style="{width:'100px',height:'40px','margin':'0 0 20px 20px'}"
                      @click="saveContact"
                    >保存</el-button>
                  </div>-->
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
                        <el-col :span="5">
                          <div class="grid-content bg-purple-light">备注信息1</div>
                        </el-col>
                        <el-col :span="5">
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
                                @change="changeRelation(index)"
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
                                <el-input
                                  :disabled="isEdit || item.canEdit || item.phoneCheckInd"
                                  maxlength="20"
                                  v-model="item.phoneCheckPhoneNum"
                                ></el-input>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="5">
                            <div class="grid-content bg-purple-light">
                              <el-form-item prop="approveRemarkTxt">
                                <!-- <el-input
                                  :disabled="isEdit"
                                  maxlength="200"
                                  v-model="item.contactRemarkTxt1"
                                ></el-input> -->
                                <span class="approveRemarkTxt" :title="item.approveRemarkTxt">{{item.approveRemarkTxt || "-"}}</span>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="5">
                            <div class="grid-content bg-purple-light">
                              <el-form-item>
                                <!-- <span>{{item.contactRemarkTxt2 || "-"}}</span> -->
                                <span class="approveRemarkTxt" :title="item.auditRemarkTxt">{{item.auditRemarkTxt || "-"}}</span>
                                <!-- <el-input
                                  :disabled="isEdit"
                                  maxlength="500"
                                  v-model="item.auditRemarkTxt"
                                ></el-input> -->
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
                              @click="makePhone('onelist'+index, item, index, 'onelist')"
                              type="text"
                            >拨打</el-button>
                            <el-button
                              class="sytCBlue"
                              @click="alert_phone_video(item.id, item)"
                              type="text"
                            >查询录音</el-button>
                            <!-- <el-button  -->
                          </el-col>
                          <el-input
                            resize="none"
                            type="textarea"
                            autosize
                            :title="item.aprPhoneCheckRemark"
                            v-if="item.showTxt1"
                            maxlength="500"
                            :disabled="isEdit || !appOrAud"
                            class="txt"
                            v-model="item.aprPhoneCheckRemark"
                            placeholder="请填写审批备注"
                          ></el-input>
                          <el-input
                            resize="none"
                            type="textarea"
                            autosize
                            :title="item.audPhoneCheckRemark"
                            v-if="item.showTxt2"
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
                        <el-col :span="5">
                          <div class="grid-content bg-purple-light">备注信息1</div>
                        </el-col>
                        <el-col :span="5">
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
                                <el-input
                                  :disabled="isEdit || item.phoneCheckInd"
                                  maxlength="20"
                                  v-model="item.phoneCheckPhoneNum2"
                                  :change="thirdCall(item)"
                                ></el-input>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="5">
                            <div class="grid-content bg-purple-light">
                              <el-form-item prop="approveRemarkTxt">
                                <!-- <el-input
                                  :disabled="isEdit"
                                  maxlength="200"
                                  v-model="item.contactRemarkTxt1"
                                ></el-input> -->
                                <span class="approveRemarkTxt" :title="item.approveRemarkTxt">{{item.approveRemarkTxt || "-"}}</span>
                              </el-form-item>
                            </div>
                          </el-col>
                          <el-col :span="5">
                            <div class="grid-content bg-purple-light">
                              <el-form-item>
                                <span class="approveRemarkTxt" :title="item.auditRemarkTxt">{{item.auditRemarkTxt || "-"}}</span>
                                <!-- <span>{{item.contactRemarkTxt2 || "-"}}</span> -->
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
                              @click="makePhone('third'+index, item, index, 'third')"
                              type="text"
                            >拨打</el-button>
                            <el-button
                              class="sytCBlue"
                              @click="alert_phone_video(item.id, item)"
                              type="text"
                            >查询录音</el-button>
                            <!-- <el-button
                              class="sytCBlue"
                              :disabled="isEdit"
                              @click="deleteContact(index, 'third')"
                              type="text"
                            >删除</el-button> -->
                          </el-col>
                          <el-input
                            resize="none"
                            type="textarea"
                            autosize
                            :title="item.aprPhoneCheckRemark"
                            v-if="item.showTxt1"
                            maxlength="500"
                            :disabled="isEdit || !appOrAud"
                            class="txt"
                            v-model="item.aprPhoneCheckRemark"
                            placeholder="请填写审批备注"
                          ></el-input>
                          <el-input
                            resize="none"
                            type="textarea"
                            autosize
                            :title="item.audPhoneCheckRemark"
                            v-if="item.showTxt2"
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
              <!-- 产品 信息 -->
              <div class="content_border jump-hook" id="selfGo-4" v-if="!isSourceSurvey">
                <div class="content_title_head" :class="{'active__title' : curIndex === 4}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-4">产品信息</span>
                </div>
                <div class="content">
                  <ul class="table__list">
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
                          </el-tabs>
                          <span class="button add__btn" v-if="!isEdit" @click="openMessageBox">
                            <span class="icon icon__add">+</span>新增
                          </span>
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
                                    <td>{{item.mortgageInd ? '是': '否'}}</td>
                                    <td>{{item.coownersCnt}}</td>
                                    <td>{{item.propertySharePercent}}%</td>
                                    <td>{{item.houseSizeMeas}}平方米</td>
                                    <td>{{item.slAverageAmt}}</td>
                                    <td>{{item.inputAverageAmt}}</td>
                                    <td>{{item.incomeInd ? '是': '否'}}</td>
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
                    <div class="content_mian_title">
                      <span>车贷信息</span>
                    </div>
                    <!-- <p
                          :style="{'padding':'20px 0 0 20px',color:'#538BF1','text-align': 'left', 'font-size': '12px'}"
                    >车贷信息</p>-->
                    <li class="item">
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
                                  <!-- 展示列表 -->
                                  <ul class="table__tr__top-list" v-if="!item.showFormEle">
                                    <li class="table__td" maxlength="40">{{item.bankCode}}</li>
                                    <li class="table__td">{{item.loanAmt}}</li>
                                    <li class="table__td">{{getTime(item.loanDate)}}</li>
                                    <li class="table__td">{{getTime(item.dueDate)}}</li>
                                    <li class="table__td">{{getTime(item.firstRepaymentDate)}}</li>
                                    <li
                                      class="table__td"
                                    >{{(item.loanStatusCode === '10') ? '正常' : '结清'}}</li>
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
                                  <!-- 编辑列表 -->
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
                                        <el-input
                                          :disabled="isEdit"
                                          v-model="carEdit.bankCode"
                                          maxlength="40"
                                        ></el-input>
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
                                          v-model="carEdit.dueDate"
                                          type="date"
                                          :disabled="isEdit"
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
                                          v-model="carEdit.firstRepaymentDate"
                                          type="date"
                                          :disabled="isEdit"
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
                                        <el-input
                                          :disabled="isEdit"
                                          v-model="carEdit.monthlyRepaymentAmt"
                                        ></el-input>
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
                                        <el-input
                                          :disabled="isEdit"
                                          v-model="carEdit.bankCode"
                                          maxlength="40"
                                        ></el-input>
                                      </el-form-item>
                                      <el-form-item prop="loanAmt" class="table__form-item">
                                        <el-input :disabled="isEdit" v-model="carEdit.loanAmt"></el-input>
                                      </el-form-item>
                                      <el-form-item prop="loanDate" class="table__form-item">
                                        <el-date-picker
                                          v-model="carEdit.loanDate"
                                          :disabled="isEdit"
                                          type="date"
                                          format="yyyy/MM/dd"
                                          value-format="timestamp"
                                          placeholder="选择日期"
                                        ></el-date-picker>
                                      </el-form-item>
                                      <el-form-item prop="dueDate" class="table__form-item">
                                        <el-date-picker
                                          v-model="carEdit.dueDate"
                                          :disabled="isEdit"
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
                                          v-model="carEdit.firstRepaymentDate"
                                          :disabled="isEdit"
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
                                        <el-input
                                          :disabled="isEdit"
                                          v-model="carEdit.monthlyRepaymentAmt"
                                        ></el-input>
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
                  </ul>
                </div>
              </div>
              <!-- 面签备注 -->
              <div
                v-if="ftfOpinion && !isSourceSurvey"
                class="content_border jump-hook"
                id="selfGo-5"
              >
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
                        <el-input
                          :disabled="isEdit"
                          placeholder="请输入姓名"
                          maxlength="30"
                          style="width:300px"
                          v-model="threeDataPerson.name"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label prop="cerid">
                        <el-input
                          :disabled="isEdit"
                          placeholder="请输入身份证号码"
                          style="width:300px"
                          v-model="threeDataPerson.cerid"
                        ></el-input>
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
                        <el-table-column label="序号" type="index"></el-table-column>
                        <el-table-column prop="n" label="姓名"></el-table-column>
                        <el-table-column prop="id" label="身份证号码"></el-table-column>
                        <el-table-column prop="totalnumber" label="查询数"></el-table-column>
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
                        <el-input
                          :disabled="isEdit"
                          placeholder="请输入单位名称"
                          style="width:300px"
                          v-model="threeDataCompany.companyName"
                        ></el-input>
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
                        <el-table-column label="序号" type="index"></el-table-column>
                        <el-table-column prop="q" label="公司名称"></el-table-column>
                        <!-- <el-table-column prop="id" label="身份证号码"></el-table-column> -->
                        <el-table-column prop="totalnumber" label="查询数"></el-table-column>
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
                      :isDetail="!!isEdit" :routerPath="'audit-ic-info-detail'" :taskNodeCode="'auditTask'">
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
                          class="sytCBlue"
                          @click="goHistory(scope.row.oldApplicationId, scope.row.reportNum, scope.row.redirectFlag)"
                          type="text"
                          size="small"
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
                <div class="content">
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
                      <!-- <el-table-column prop="badCreditInd" label="是否为信用不良"></el-table-column> -->
                      <el-table-column prop="generatedTime" label="查询时间"></el-table-column>
                      <el-table-column prop="reportSource" label="来源"></el-table-column>
                      <el-table-column prop="creditVersionLabel" label="类型"></el-table-column>
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
                </div>
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
              <div v-if="isTaxLoan" id="selfGo-12">
                <div class="content_border jump-hook">
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
                              v-for="item in taxAgencyList"
                              :key="item.value"
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
                            class="width250"
                          >
                            <el-input
                              v-model="organizationTax.nearly1YrAnnlPayTaxAmt"
                              maxlength="100"
                              :disabled="!!isEdit"
                            ></el-input>
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
              <!-- 风险参数 -->
              <div class="content_border jump-hook" id="selfGo-13" v-if="!isSourceSurvey">
                <div class="content_title_head" :class="{'active__title' : curIndex === 13}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-13">风险参数</span>
                </div>
                <div class="content" v-if="!isDadao">
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
                  </el-row>
                  <el-row>
                    <el-form
                      :inline="true"
                      class="demo-form-inline risk-box"
                      ref="riskRule"
                      :model="aplRiskPara"
                      :rules="riskRule"
                    >
                      <el-col :span="8">
                        <div class="grid-content bg-purple top_conten">
                          <span
                            class="top_content_font"
                            :style="{width:'40%',display:'block',float:'left'}"
                          >所有金融机构无担保授信额度(不含本笔):</span>
                          <el-form-item label prop="allCreditLimitAmt">
                            <el-input
                              :disabled="isEdit"
                              v-model="aplRiskPara.allCreditLimitAmt"
                              @blur="formatMoney('aplRiskPara', 'allCreditLimitAmt')"
                            ></el-input>
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
                            <el-input
                              :disabled="isEdit"
                              v-model="aplRiskPara.unsecuredLoanPaymentAmt"
                              @blur="formatMoney('aplRiskPara', 'unsecuredLoanPaymentAmt')"
                            ></el-input>
                          </el-form-item>
                          <span class="top_conten_title mid-title">元</span>
                        </div>
                      </el-col>
                      <el-col class="top_content_font" :span="8">
                        <div class="grid-content bg-purple top_conten">
                          <span :style="{width:'40%',display:'block',float:'left'}">可调整金额:</span>
                          <el-form-item label prop="adjustmentAmt">
                            <el-input
                              :disabled="isEdit"
                              v-model="aplRiskPara.adjustmentAmt"
                              @blur="formatMoney('aplRiskPara', 'adjustmentAmt')"
                            ></el-input>
                          </el-form-item>
                          <span class="top_conten_title mid-title">元</span>
                        </div>
                      </el-col>
                    </el-form>
                  </el-row>
                  <div class="btns">
                    <el-button
                      :disabled="!riskAble || isEdit"
                      class="small-btn"
                      @click="riskPara('saveOper')"
                    >测算保存</el-button>
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
                </div>
                <div class="content" v-else>
                  <div class="risk-input-control">
                    <div class="input-control">
                      <label>客户申请贷款金额：</label>
                      <el-input v-model="aplRiskPara.applicationSubmitAmt" disabled></el-input>
                      <span>元</span>
                    </div>
                    <div class="input-control">
                      <label>系统计算贷款金额：</label>
                      <el-input v-model="aplRiskPara.sysResultAmt" disabled></el-input>
                      <span>元</span>
                    </div>
                    <div class="input-control">
                      <label>最终可贷金额：</label>
                      <el-input v-model="aplRiskPara.finalResultAmt" disabled></el-input>
                      <span>元</span>
                    </div>
                    <div class="input-control">
                      <label>复议金额：</label>
                      <el-input v-model="aplRiskPara.reconsiderationAmt" disabled></el-input>
                      <span>元</span>
                    </div>
                    <div class="submit-control">
                      <el-button
                        :disabled="!riskAble || isEdit"
                        class="small-btn"
                        @click="riskPara('saveOper')"
                      >测算保存</el-button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 电核结论 -->
              <div
                class="content_border jump-hook"
                id="selfGo-14"
                v-if="!isDadao && !isSourceSurvey"
              >
                <div class="content_title_head" :class="{'active__title' : curIndex === 14}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-14">电核结论</span>
                </div>
                <div class="content">
                  <div class="content_mian">
                    <div style="margin-bottom: 20px">
                      <span class="top_conten_title">电核规则:</span>
                      <span
                        class="black_font"
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
                      >{{item}}</p>
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
                            placeholder="请选择风险标识"
                          >
                            <el-option
                              v-if="riskFlag.length>0"
                              v-for="item in riskFlag"
                              :key="item.itemCode"
                              :label="item.itemDesc"
                              :value="item.itemCode"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item prop="decisionCode" class="multipleSel">
                          <span
                            class="clear-select"
                            style="right: 10px"
                            @click="clearSel"
                            v-if="(aprPhoneCheckInfo.decisionCode && aprPhoneCheckInfo.decisionCode.length>0 )|| !isEdit"
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
                        </el-form-item>
                      </el-form>
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
                    </div>
                    <div class="content_mian_title">
                      <span>审批电核内容</span>
                    </div>
                    <div
                      class="content_mian_table top_content_font"
                      :style="{'min-height': '110px'}"
                    >
                      <p v-for="(item, index) in aprResult" :key="item + index">{{item}}</p>
                    </div>
                    <div class="content_mian_title">
                      <span>审计电核内容</span>
                    </div>
                    <div
                      class="content_mian_table top_content_font"
                      :style="{'min-height': '110px'}"
                    >
                      <p v-for="(item, index) in aduResult" :key="item + index">{{item}}</p>
                      <br v-if="aduResult.length > 0" />
                      <p
                        v-if="phoneCheckConclusion.phoneCheckContentArray&&phoneCheckConclusion.phoneCheckContentArray.length>0"
                        v-for="(item, index) in phoneCheckConclusion.phoneCheckContentArray"
                        :key="item + index + 'i'"
                      >{{item}}</p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 审批结论 -->
              <div class="content_border jump-hook" id="selfGo-15">
                <div class="content_title_head" :class="{'active__title' : curIndex === 15}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-15">审批结论</span>
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
                </div>
              </div>
              <!-- 审计结论 -->
              <div class="content_border jump-hook" id="selfGo-16">
                <div class="content_title_head" :class="{'active__title' : curIndex === 16}">
                  <span class="content_title_headA"></span>
                  <span class="content_title_headB" id="anchot-16">审计结论</span>
                </div>
                <div class="content" style="min-height:50px">
                  <div class="content_mian">
                    <textarea
                      :disabled="isEdit"
                      class="top_content_font"
                      cols="100%"
                      :style="{'resize':'none', 'width': '100%', 'height': '110px', 'outline': 'none', 'border': '1px solid #e5e5e5'}"
                      v-model="audConclusion.decisionTxt"
                      maxlength="1000"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div class="content_border jump-hook jump-hookend">
                <div class="content_title_head"></div>
              </div>
            </div>
          </div>
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
    <transition name="fade">
      <house-message
        v-if="openHouseMessageDg"
        :has-submit="isEdit"
        @close="closeHouseMessage"
        :house-id="houseId"
        :house-id-list="houseIdList"
        :areaList="options"
        :application-id="applicationId"
      ></house-message>
    </transition>
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
      ></house-message2>
    </transition>
    <!-- 组件 -->
    <!-- 担保人 -->
    <!-- <addGuarantor v-if="alertAddGuarantor" @clsoe_windowAlert='close_addGuarantor' /> -->
    <!-- 影像资料 -->
    <videoData v-if="alertVideo" @clsoe_windowAlert="close_video" />
    <!-- 电核勾选 -->
    <phoneCheck v-if="alertPhoneCheck" :disabled="isEdit" @clsoe_windowAlert="close_phonecheck" />
    <!-- 备注 -->
    <remark v-if="alertRemark" @clsoe_windowAlert="close_remark" :disabled="isEdit" />
    <!-- 补件 -->
    <patchBolt
      v-if="alertPatchBolt"
      :disabled="isEdit"
      :imageExistFlg="imageExistFlg"
      @clsoe_windowAlert="close_patchBolt"
      :PatchHisDto="PatchHisDto"
      :patchClassCode="patchClassCode"
      :patchStatusCode="businessStatus.patchStatusCode"
    />
    <!-- 补件二 -->
    <patchBolt2
      v-if="alertPatchBolt2 && PatchHisDto.length"
      :disabled="isEdit"
      :imageExistFlg="imageExistFlg"
      :applicationId="applicationId"
      @reset="reset"
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
      :disabled="isEdit"
      @surveyStatusCodeChange="surveyStatusCodeChange"
      :surveyReasonCode="surveyReasonCode"
      :surveyHis="surveyHis"
      :surveyStatusCode="businessStatus.surveyStatusCode"
    />
    <!-- 调查2 -->
    <survey2
      v-if="alertSurvey2"
      @clsoe_windowAlert="close_survey2"
      :surveyStatus="surveyStatus"
      :showBtn="showBtn"
      :disabled="isEdit"
      @surveyStatusCodeChange="surveyStatusCodeChange"
      :applicationId="applicationId"
      :surveyReasonCode="surveyReasonCode"
      :surveyHis="surveyHis"
      :surveyStatusCode="businessStatus.surveyStatusCode"
    />
    <submitA
      v-if="alertSubmitA"
      :appOrAud="appOrAud"
      @clsoe_windowAlert="close_submitA"
      :isSuper="aplRiskPara.switchHighScoreInd"
      :surveyStatusCode="businessStatus.surveyStatusCode"
      :highScoreAmtMoney="aplRiskPara.highScoreAmt"
    />
    <!-- 关注信息检测 -->
    <detectionMsg
      v-if="alertDetectionMsg"
      :appOrAud="appOrAud"
      :disabled="isEdit"
      @clsoe_windowAlert="close_detectionMsg"
    />
    <!-- 历史贷款记录 -->
    <face2face-detail
      class="history-face"
      :dialogVisible="dialogVisible"
      :applicationId="oldApplicationId"
      :creditReportId="creditReportId"
      @closeDialog="dialogVisible = false"
    ></face2face-detail>
    <!-- 退回 -->
    <comebackA
      :comebackReasonCode="comebackReasonCode"
      :disabled="isEdit"
      :surveyStatusCode="businessStatus.surveyStatusCode"
      v-if="alertComebackA"
      @clsoe_windowAlert="close_comebackA"
    />
    <comebackB
      :comebackReasonCode="comebackReasonCode"
      :disabled="isEdit"
      :comebackHis="comebackHis"
      :surveyStatusCode="businessStatus.surveyStatusCode"
      v-if="alertComebackB"
      @clsoe_windowAlert="close_comebackB"
    />
    <comebackC
      v-if="alertComebackC"
      :comebackHis="comebackHis"
      @clsoe_windowAlert="close_comebackC"
    />
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
  </div>
</template>
<script src="./audit-pending-start.js"></script>
