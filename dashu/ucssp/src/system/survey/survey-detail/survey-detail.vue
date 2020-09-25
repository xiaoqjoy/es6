<template>
  <div class="audit_bottom survey_detail" :style="{marginTop:auditTopHeight}" v-if="pageData">
  <!-- 左侧导航栏 -->
    <div class="content_nav">
      <div class="nav-button" v-for="(item,index) in navArr" :key="index" :class="{clickNav : activeBtn == index}" @click="goAnchor('#anchor-'+index,index)">{{item}}</div>
    </div>
  <!-- 主内容 -->
    <div class="content_right_box">
      <div v-for="(item,index) in navArr" :key="index">
        <div class="content_border" :id="'#anchor-' + index" v-if="item === '业务详情'">
          <!-- 业务信息 -->
          <div class="content_title_head" :class="{ content_title_on : !activeBtn }">
            <span class="content_title_headA"></span>
            <span class="content_title_headB">业务详情</span>
          </div>
          <div class="content">
            <div class="content_bottom_border" v-for="(item,index) in pageData.businessDetailInfo.creditList" :key="index">
              <div class="content_title" v-if="index === 0">信用信息</div>
              <div class="clearfloat topology_margin">
                <div class="top_conten"><span class="top_conten_title">产品{{item.sortNum != 2 ? "一" : "二"}}：</span><span class="top_content_font">{{item.productName}}</span></div>
                <div class="top_conten"><span class="top_conten_title">额度：</span><span class="top_content_font orange">{{item.limitLoanAmt}}</span></div>
                <div class="top_conten"><span class="top_conten_title">信用报告来源：</span><span class="top_content_font">{{item.reportSourceCode}}</span></div>
                <div class="top_conten"><span class="top_conten_title">意向申请金额：</span><span class="top_content_font orange">{{item.applicationPurposeAmt}}</span></div>
                <div class="top_conten"><span class="top_conten_title">申请金额：</span><span class="top_content_font orange">{{item.applicationSubmitAmt}}</span></div>
                <div class="top_conten"><span class="top_conten_title">还款周期：</span><span class="top_content_font">{{item.repaymentCycleCode}}</span></div>
                <div class="top_conten"><span class="top_conten_title">还款方式：</span><span class="top_content_font">{{item.repaymentModeCode}}</span></div>
              </div>
            </div>

            <div>
              <div class="content_title">营销信息</div>
              <div class="clearfloat">
                <div class="top_conten"><span class="top_conten_title">渠道名称：</span><span class="top_content_font">{{pageData.businessDetailInfo.otherChannelType}}</span></div>
                <div class="top_conten"><span class="top_conten_title">其他渠道说明：</span><span class="top_content_font">{{pageData.businessDetailInfo.otherChannelCode}}</span></div>
                <div class="top_conten"><span class="top_conten_title">客户经理：</span><span class="top_content_font">{{pageData.businessDetailInfo.custManagerId}}</span></div>
                <div class="top_conten"><span class="top_conten_title">业务助理：</span><span class="top_content_font">{{pageData.businessDetailInfo.assistantId}}</span></div>
                <div class="top_conten"><span class="top_conten_title">授权原因：</span><span class="top_content_font">{{pageData.businessDetailInfo.authReasonCode}}</span></div>
                <div class="top_conten"><span class="top_conten_title">是否重签资料：</span><span class="top_content_font">{{pageData.businessDetailInfo.repeatSignInd}}</span></div>
                <div class="top_conten"><span class="top_conten_title">业务类型：</span><span class="top_content_font">{{pageData.businessDetailInfo.businessTypeCode}}</span></div>
                <div class="top_conten"><span class="top_conten_title">登记人：</span><span class="top_content_font">{{pageData.businessDetailInfo.registerName}}</span></div>
                <div class="top_conten"><span class="top_conten_title">登记时间：</span><span class="top_content_font">{{pageData.businessDetailInfo.registerTime}}</span></div>
                <div class="top_conten"><span class="top_conten_title">面签类型：</span><span class="top_content_font">{{pageData.businessDetailInfo.f2fTypeDesc}}</span></div>
              </div>
            </div>
          </div>
        </div>
        <!-- 客户信息 -->
        <div class="content_border" :id="'#anchor-' + index" v-if="item === '客户信息'">
          <div class="content_title_head" :class="{ content_title_on : activeBtn === index }">
            <span class="content_title_headA"></span>
            <span class="content_title_headB">客户信息</span>
          </div>
          <div class="content">
            <div class="content_bottom_border">
              <div class="content_title">客户个人信息</div>
              <div class="clearfloat topology_margin">
                <div class="top_conten"><span class="top_conten_title">申请编号：</span><span class="top_content_font">{{pageData.personalInfo.applicationId}}</span></div>
                <div class="top_conten"><span class="top_conten_title">姓名：</span><span class="top_content_font">{{pageData.personalInfo.custName}}</span></div>
                <div class="top_conten"><span class="top_conten_title">手机号码：</span><span class="top_content_font">{{pageData.personalInfo.mobileNum}}</span></div>
                <div class="top_conten"><span class="top_conten_title">性别：</span><span class="top_content_font">{{pageData.personalInfo.genderCode}}</span></div>
                <div class="top_conten"><span class="top_conten_title">身份证号码：</span><span class="top_content_font">{{pageData.personalInfo.certificateNum}}</span></div>
                <div class="top_conten"><span class="top_conten_title">户籍地区：</span><span class="top_content_font">{{formatAddress(pageData.personalInfo.registeredAddressCode)}}</span></div>
                <div class="top_conten"><span class="top_conten_title">户籍详细地址：</span><span class="top_content_font">{{pageData.personalInfo.registeredAddressDesc}}</span></div>
                <div class="top_conten"><span class="top_conten_title">身份证发证机关：</span><span class="top_content_font">{{pageData.personalInfo.certificateGrantorName}}</span></div>
                <div class="top_conten"><span class="top_conten_title">居住情况：</span><span class="top_content_font">{{pageData.personalInfo.houseConditionCode}}</span></div>
                <div class="top_conten"><span class="top_conten_title">居住地区：</span><span class="top_content_font">{{formatAddress(pageData.personalInfo.houseAddressCode)}}</span></div>
                <div class="top_conten"><span class="top_conten_title">居住详细地址：</span><span class="top_content_font">{{pageData.personalInfo.houseAddressDesc}}</span></div>
                <div class="top_conten"><span class="top_conten_title">有无本地房产：</span><span class="top_content_font">{{pageData.personalInfo.localEstateInd}}</span></div>
                <div class="top_conten"><span class="top_conten_title">婚姻情况：</span><span class="top_content_font">{{pageData.personalInfo.maritalStatusCode}}</span></div>
                <div class="top_conten"><span class="top_conten_title">单位名称：</span><span class="top_content_font">{{pageData.personalInfo.workplaceName}}</span></div>
                <div class="top_conten"><span class="top_conten_title">单位地址：</span><span class="top_content_font">{{formatAddress(pageData.personalInfo.workAddressCode)}}</span></div>
                <div class="top_conten"><span class="top_conten_title">单位详细地址：</span><span class="top_content_font">{{pageData.personalInfo.workAddressDesc}}</span></div>
                <div class="top_conten"><span class="top_conten_title">客户类型：</span><span class="top_content_font">{{pageData.personalInfo.careerTypeCode}}</span></div>
                <div class="top_conten"><span class="top_conten_title">是否注册：</span><span class="top_content_font">{{pageData.personalInfo.registeredInd}}</span></div>
                <div class="top_conten"><span class="top_conten_title">占股情况：</span><span class="top_content_font">{{pageData.personalInfo.sharePercent}}</span></div>
                <div class="top_conten"><span class="top_conten_title">成立日期：</span><span class="top_content_font">{{pageData.personalInfo.foundDate}}</span></div>
                <div class="top_conten"><span class="top_conten_title">六个月内是否正常缴纳公积金：</span><span class="top_content_font">{{pageData.personalInfo.houseFund6mInd}}</span></div>
                <div class="top_conten"><span class="top_conten_title">是否有保单：</span><span class="top_content_font">{{pageData.personalInfo.insurancePolicyInd}}</span></div>
                <div class="top_conten"><span class="top_conten_title">是否有房产：</span><span class="top_content_font">{{pageData.personalInfo.estateInd}}</span></div>
                <div class="top_conten"><span class="top_conten_title">是否有信用卡车供：</span><span class="top_content_font">{{pageData.personalInfo.carloanInd}}</span></div>
              </div>
            </div>

            <div class="content_bottom_border">
              <div class="content_title">补充个人信息</div>
              <div class="clearfloat topology_margin">
                <div class="top_conten"><span class="top_conten_title">微信号：</span><span class="top_content_font">{{pageData.personalInfo.wechatNum}}</span></div>
                <div class="top_conten"><span class="top_conten_title">单位详细地址：</span><span class="top_content_font">{{pageData.personalInfo.workAddressDesc}}</span></div>
                <div class="top_conten"><span class="top_conten_title">所在部门：</span><span class="top_content_font">{{pageData.personalInfo.departmentName}}</span></div>
                <div class="top_conten"><span class="top_conten_title">职务名称：</span><span class="top_content_font">{{pageData.personalInfo.jobTitle}}</span></div>
                <div class="top_conten"><span class="top_conten_title">工作电话区号：</span><span class="top_content_font">{{pageData.personalInfo.workAreNum}}</span></div>
                <div class="top_conten"><span class="top_conten_title">单位固话：</span><span class="top_content_font">{{pageData.personalInfo.workPhoneNum}}</span></div>
                <div class="top_conten"><span class="top_conten_title">人事部联系人：</span><span class="top_content_font">{{pageData.personalInfo.hrContactName}}</span></div>
                <div class="top_conten"><span class="top_conten_title">人事部联系手机号：</span><span class="top_content_font">{{pageData.personalInfo.hrContactNum}}</span></div>
                <div class="top_conten"><span class="top_conten_title">月收入：</span><span class="top_content_font">{{pageData.personalInfo.monthlyIncomeAmt}}</span></div>
                <div class="top_conten"><span class="top_conten_title">住宅邮编：</span><span class="top_content_font">{{pageData.personalInfo.houseZipcode}}</span></div>
                <div class="top_conten"><span class="top_conten_title">单位邮编：</span><span class="top_content_font">{{pageData.personalInfo.zipCode}}</span></div>
              </div>
            </div>

            <div>
              <div class="content_title">联系人信息</div>
              <div class="clearfloat">
                <div class="top_conten"><span class="top_conten_title">配偶姓名：</span><span class="top_content_font">{{pageData.personalInfo.spouseName}}</span></div>
                <div class="top_conten"><span class="top_conten_title">证件类型：</span><span class="top_content_font">{{pageData.personalInfo.spouseIdTypeCode}}</span></div>
                <div class="top_conten"><span class="top_conten_title">证件号码：</span><span class="top_content_font">{{pageData.personalInfo.spouseIdNum}}</span></div>
                <div class="top_conten"><span class="top_conten_title">联系方式：</span><span class="top_content_font">{{pageData.personalInfo.spouseMobileNum}}</span></div>
                <div v-for="(item,index) in pageData.personalInfo.aplContactInfo" :key="index">
                  <div class="top_conten"><span class="top_conten_title">{{item.typeCode === "01" ? "" : "非"}}亲属联系人：</span><span class="top_content_font">{{item.contactName}}</span></div>
                  <div class="top_conten"><span class="top_conten_title">{{item.typeCode === "01" ? "" : "非"}}亲属联系人关系：</span><span class="top_content_font">{{item.relationshipCode}}</span></div>
                  <div class="top_conten"><span class="top_conten_title">联系方式：</span><span class="top_content_font">{{item.mobileNum}}</span></div>
                  <div class="top_conten"><span class="top_conten_title">其他说明：</span><span class="top_content_font">{{item.approveRemarkTxt}}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content_border" :id="'#anchor-' + index" v-if="item === '产品收入信息'">
          <div class="content_title_head" :class="{ content_title_on : activeBtn === index }">
            <span class="content_title_headA"></span>
            <span class="content_title_headB">产品收入信息</span>
          </div>
          <div class="content">
            <div class="content_bottom_border">
              <div class="content_title">保单信息</div>
            </div>
            <insurance-table :dictLib="dictLib" :isDetail="true" :applicationId="applicationId" class="insurance_table"></insurance-table>
            <div class="content_bottom_border">
              <div class="content_title">房产信息</div>
            </div>
            <house-table :dictLib="dictLib" :isDetail="true" :options="arealist" :applicationId="applicationId" class="house_table"></house-table>
            <div class="content_bottom_border">
              <div class="content_title">信用卡车供</div>
            </div>
            <credit-card-table :dictLib="dictLib" :isDetail="true" :options="arealist" :applicationId="applicationId" class="house_table"></credit-card-table>
          </div>
        </div>
        <!-- 贷款信息 -->
        <div class="content_border" :id="'#anchor-' + index" v-if="item === '贷款信息'">
          <div class="content_title_head" :class="{ content_title_on : activeBtn === index }">
            <span class="content_title_headA"></span>
            <span class="content_title_headB">贷款信息</span>
          </div>
          <div class="content">
            <div class="content_bottom_border" :class="{ no_border: pageData.loanInfo.aplProductInfoList.length-1 === index}" v-for="(item,index) in pageData.loanInfo.aplProductInfoList" :key="index">
              <div class="content_title">产品{{item.sortNum != 2 ? "一" : "二"}}特殊字段</div>
              <div class="clearfloat" :class="{ topology_margin: !index }">
                <div class="top_conten"><span class="top_conten_title">借款人职业名称：</span><span class="top_content_font">{{item.careerName}}</span></div>
                <div class="top_conten"><span class="top_conten_title">借款人行业名称：</span><span class="top_content_font">{{item.industryName}}</span></div>
                <div class="top_conten"><span class="top_conten_title">贷款期限：</span><span class="top_content_font">{{item.loanTerm}}</span></div>
                <div class="top_conten"><span class="top_conten_title">贷款用途：</span><span class="top_content_font">{{item.loanPurposeCode}}</span></div>
                <div class="top_conten"><span class="top_conten_title">贷款用途性质：</span><span class="top_content_font">{{item.loanPurposeType}}</span></div>
                <div class="top_conten"><span class="top_conten_title">其他贷款说明：</span><span class="top_content_font">{{item.loanOtherPurpose}}</span></div>
              </div>
            </div>
          </div>
        </div>
        <!-- 信用报告信息 -->
        <div class="content_border credit-card" :id="'#anchor-' + index" v-if="item === '信用报告信息'">
          <div class="content_title_head" :class="{ content_title_on : activeBtn === index }">
            <span class="content_title_headA"></span>
            <span class="content_title_headB">信用报告信息</span>
          </div>
          <div class="content content_table_wrap">
            <el-table :data="pageData.creditReportInfo" style="width:100%" :header-row-class-name="headStyle" :row-class-name="rowStyle">
              <el-table-column prop="custName" label="客户姓名"></el-table-column>
              <el-table-column prop="certificateNum" label="证件号码"></el-table-column>
              <el-table-column prop="certificateTypeCode" label="证件类型"></el-table-column>
              <el-table-column prop="reportSourceCode" label="征信报告来源"></el-table-column>
              <el-table-column prop="generatedTime" label="报告导入日期"></el-table-column>
              <el-table-column prop="reportNum" label="报告编号"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="showCredit(scope.row)"> 查看详情 </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <popup :isShowDialog="isShowCredit" :url="creditReport"  :isReport="true" :applicationId="applicationId" menuDesc="调查" :iframe="true" :center="true" :width="800" :height="creaditHeight" @closeDialog="closeCredit"></popup>
        </div>
        <!-- 关联检测信息 -->
        <div class="content_border" :id="'#anchor-' + index" v-if="item === '关联检测信息'">
          <div class="content_title_head" :class="{ content_title_on : activeBtn === index }">
            <span class="content_title_headA"></span>
            <span class="content_title_headB">关联信息检测</span>
          </div>
          <div class="content">
            <detection-msg></detection-msg>
          </div>
        </div>
        <!-- 历史贷款信息 -->
        <div class="content_border"  :id="'#anchor-' + index" v-if="item === '历史贷款信息'">
          <div class="content_title_head" :class="{ content_title_on : activeBtn === index }">
            <span class="content_title_headA"></span>
            <span class="content_title_headB">历史贷款信息</span>
          </div>

          <div class="content content_table_wrap">
            <el-table :data="pageData.aprLoanRecord" style="width:100%" :header-row-class-name="headStyle" :row-class-name="rowStyle">
              <el-table-column label="序号" type="index"></el-table-column>
              <el-table-column prop="oldApplicationId" label="申请编码" width="170"></el-table-column>
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
                  <el-button @click="goHistory(scope.row.oldApplicationId, scope.row.reportNum, scope.row.taskDefKey)" type="text" size="small">
                    申请详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 备注汇总 -->
        <div class="content_border" :id="'#anchor-' + index" v-if="item === '备注汇总'" :class="{last_padding300 : navArr.length === 8}">
          <div class="content_title_head" :class="{ content_title_on : activeBtn === index }">
            <span class="content_title_headA"></span>
            <span class="content_title_headB" id="noteTheSummary">备注汇总</span>
          </div>
          <div class="content">
            <div class="content_bottom_border content_text_wrap">
              <div class="content_title">面签面核意见备注</div>
              <p class="black_font content_text" v-for="(item, index) of pageData.summaryNoteInfo.signRemark" :key="index">{{item}}</p>
            </div>

            <div class="content_bottom_border content_text_wrap">
              <div v-if="showBORF">
                <div class="content_title">调查类型</div>
                <p class="black_font content_text">{{pageData.summaryNoteInfo.surveyTypeDesc}}</p>
              </div>
              <div class="content_title">审批意见备注</div>
              <p class="black_font content_text" v-for="(item, index) of pageData.summaryNoteInfo.examineRemark" :key="index">{{item}}</p>
            </div>

            <div class="content_bottom_border content_text_wrap">
              <div class="content_title">客户经理意见</div>
              <p class="black_font content_text">{{pageData.summaryNoteInfo.managerRemark}}</p>
            </div>

            <div class="content_bottom_border content_text_wrap">
              <div class="content_title">调查主管复核意见</div>
              <p class="black_font content_text" v-for="(item, key) in pageData.summaryNoteInfo.checkOpinion" :key="item.id">
                意见签署{{pageData.summaryNoteInfo.checkOpinion.length - key}}: {{item}}
              </p>
            </div>

            <div class="content_bottom_border content_text_wrap">
              <div class="content_title">调查主管分配意见</div>
              <p class="black_font content_text">{{pageData.summaryNoteInfo.allotRemark}}</p>
            </div>

            <div class="content_bottom_border content_text_wrap">
              <div class="content_title">终审结论</div>
              <p class="black_font content_text">{{pageData.summaryNoteInfo.finalRemark}}</p>
            </div>

            <!-- <slot name="product-remark" :productRemarkList="pageData.historyProductRemark"></slot> -->
            <div v-if="showBORF" class="content_bottom_border content_text_wrap">
              <div class="content_title">调查产品备注</div>
              <div class="black_font content_text" v-for="(item, index) in pageData.summaryNoteInfo.historyProductRemark" :key="index">
                调查产品备注{{index + 1}}：<p v-for="(str, i) in item" :key="i">{{str}}</p>
              </div>
              <div style="margin-top: 10px">
                <el-form ref="sveryProdutRemarkForm" label-position="top" :disabled="surveyStatus !== 'surveying'" :model="sveryProdutRemark" label-width="80px">
                  <el-form-item prop="remark">
                    <el-input type="textarea" maxlength="500" v-model="sveryProdutRemark.remark" rows="5"></el-input>
                  </el-form-item>
                  <div class="product-remark-warp">
                    <el-button type="warning" size="small" @click="saveProductRemark">保存</el-button>
                  </div>
                </el-form>
              </div>
            </div>
          </div>
        </div>
        <!-- 调查预约 -->
        <slot name="survey-booking" :surveyReserveInfo="{info:pageData.surveyReserveInfo, 'index':index, title: item}" v-if="item === '调查预约'"></slot>
        <!-- 调查报告复核 -->
        <slot name="recheck-report" :reportCheckInfo="{info: pageData.reportCheckInfo, 'index':index, title: item}" v-if="item === '调查报告复核'"></slot>
      </div>
      <!-- <div class="content_border" id="#anchor-0">
      </div> -->
      <!-- 爬虫界面 -->
      <!-- <div class="content_border" id="#anchor-6">
        <div class="content_title_head" :class="{ content_title_on : activeBtn === 6 }">
          <span class="content_title_headA"></span>
          <span class="content_title_headB">爬虫界面</span>
        </div>
        <div class="content">
          <div class="content_table_box">
            <div class="content_title">其他网核信息</div>
            <ul  class="conntent_list">
              <li class="content_item" v-for="(item,index) of pageData.pythonData" :key="index"  v-if = "item.list_url">
                <div class="content_item_left">{{item.platform_name}}</div>
                <div class="content_item_center">{{item.search_key_name}}</div>
                <div class="content_item_right">
                  <span class="new_window" @click="openNewWindow(item.list_url)">{{item.list_url}}</span>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div> -->

      <!-- 调查预约 -->
      <!-- <slot name="survey-booking" :surveyReserveInfo="pageData.surveyReserveInfo"></slot> -->

      <!-- 调查报告复核 -->
      <!-- <slot name="recheck-report" :reportCheckInfo="pageData.reportCheckInfo"></slot> -->
    </div>
    <div v-if="dialogVisible">
      <div class="dialog-mask"></div>
      <face2face-detail class="history-face" :dialogVisible="dialogVisible" :applicationId="oldApplicationId" :creditReportId="creditReportId" @closeDialog="dialogVisible = false" :width="dilogWidth" :isSurvey="true"></face2face-detail>
    </div>
  </div>
</template>

<script>
import popup from "@components/popup/index"; // 拖动弹框组件
import detectionMsg from "./detectionMsg/detectionMsg.vue"; // 关注信息检测
import insuranceTable from '@components/businessComponents/insuranceTable'; // 保单表
import houseTable from '@components/businessComponents/houseTable'; // 房产表
import creditCardTable from '@components/businessComponents/creditCardTable'; // 房产表
import {surveyApi} from '../js/server.js';
import { reserveStatusConversion, checkResultConversion, parseAddress, getSystemName } from '../js/utils.js';
import { mapGetters } from 'vuex';

export default {
  props: {
    insertNavBar: {
      type: Array,
      default: () => ([])
    },
    surveyStatus: {
      type: String,
      default: ''
    },
    navBardian: Array,
    auditTop: Number,
    showProduct: Boolean
  },
  data() {
    return {
      navArr: ["业务详情", "客户信息", "贷款信息", "信用报告信息", "关联检测信息", "历史贷款信息", "备注汇总"],
      dictLib: {},
      sveryProdutRemark: {
        remark: ''
      },
      showBORF: false,
      activeBtn: 0,
      auditTopHeight: 0,
      creditReport: "", // 征信报告url
      isShowCredit: false, // 查看征信报告弹框的显示与隐藏
      dialogVisible: false, // 面签详情
      oldApplicationId: "", // 历史贷款申请ID
      creditReportId: "", // 征信报告id
      pageData: {
        businessDetailInfo: { // 业务详情
          applicationId: "",
          assistantId: "", // 业务助理
          authReasonCode: "", // 授权原因
          businessTypeCode: "", // 业务类型
          registerName: "", // 登记人
          registerTime: "", // 登记时间
          creditList: [
            {
              applicationPurposeAmt: 0, // 意向申请金额
              applicationSubmitAmt: 0, // 申请金额
              limitLoanAmt: 0, // 额度
              productName: "", // 产品名称
              repaymentCycleCode: "", // 还款周期
              repaymentModeCode: "", // 还款方式
              reportSourceCode: "", // 信用报告来源
              sortNum: 0 // 序号1 2 用于区分产品一二
            }
          ],
          custManagerId: "", // 客户经理
          otherChannelCode: "", // 其他渠道说明
          otherChannelType: "", // 渠道名称
          repeatSignInd: true, // 是否重签资料
          saleTeamId: "" // 营销单位编码
        },
        creditReportInfo: [ // 信用报告信息
          {
            certificateNum: "", // 证件号码
            certificateTypeCode: "", // 证件号码
            creditReportNum: "", // 征信报告流水
            custName: "", // 客户姓名
            generatedTime: "", // 报告导入日期
            htmlUrl: "",
            reportNum: "", // 报告编号
            reportSourceCode: "" // 征信报告来源
          }
        ],
        loanInfo: { // 贷款信息
          aplProductInfoList: [
            {
              careerName: "", // 借款人职业名称
              industryName: "", // 借款人行业名称
              loanOtherPurpose: "", // 其他贷款说明
              loanPurposeCode: "", // 贷款用途（Des-装修|Edu-教育|Hou-家用电器|Wed-婚庆|Tur-旅游|Car-购车|Oth-其他）
              loanPurposeType: "", // 贷款用途性质（S-消费|M-经营）
              loanTerm: "", // 贷款期限
              sortNum: 1
            },
            {
              careerName: "", // 借款人职业名称
              industryName: "", // 借款人行业名称
              loanOtherPurpose: "", // 其他贷款说明
              loanPurposeCode: "", // 贷款用途（Des-装修|Edu-教育|Hou-家用电器|Wed-婚庆|Tur-旅游|Car-购车|Oth-其他）
              loanPurposeType: "", // 贷款用途性质（S-消费|M-经营）
              loanTerm: "", // 贷款期限
              sortNum: 2
            }
          ]
        },
        personalInfo: { // 客户信息
          aplContactInfo: [
            {
              applicationId: "",
              approveRemarkTxt: "", // 描述文本
              areaNum: "",
              contactName: "", // 联系人
              createdBy: "",
              createdDate: "",
              id: 0,
              mobileNum: "", // 联系人电话
              phoneNum: "",
              relationshipCode: "", // 人物关系
              remarkTxt: "",
              typeCode: "", // 关系类型 01亲属 02非亲属字符串类型
              updatedBy: "",
              updatedDate: "",
              wechatNum: "",
              wechatTxt: ""
            }
          ],
          careerTypeCode: "", // 客户类型
          carloanInd: true, // 是否有信用卡车供
          certificateGrantorName: "", // 身份证发证机关
          certificateNum: "", // 身份证号码
          custName: "", // 姓名
          departmentName: "", // 所在部门
          estateInd: true, // 是否有房产
          foundDate: "", // 成立日期
          genderCode: "", // 性别
          houseAddressCode: "", // 居住地区
          houseAddressDesc: "", // 居住详细地址
          houseConditionCode: "", // 居住情况
          houseFund6mInd: true, // 六个月内是否正常缴纳公积金
          houseZipcode: "", // 住宅邮编
          hrContactName: "", // 人事部联系人
          hrContactNum: "", // 人事部联系手机号
          insurancePolicyInd: true, // 是否有保单
          jobTitle: "", // 职务名称
          localEstateInd: true, // 有无本地房产
          maritalStatusCode: "", // 婚姻情况
          mobileNum: "", // 手机号
          monthlyIncomeAmt: 0, // 月收入
          registeredAddressCode: "", // 户籍地区
          registeredAddressDesc: "", // 户籍详细地址
          registeredInd: true, // 是否注册
          sharePercent: "", // 占股情况
          spouseIdNum: "", // 证件号码
          spouseIdTypeCode: "", // 证件类型
          spouseMobileNum: "", // 联系方式
          spouseName: "", // 配偶姓名
          wechatNum: "", // 微信号
          workAddressCode: "", // 单位地址
          workAddressDesc: "", // 单位详细地址
          workAreNum: "", // 工作电话区号
          workPhoneNum: "", // 单位固话
          workplaceName: "", // 单位名称
          zipCode: "" // 单位邮编
        },
        // pythonData: "",
        reportCheckInfo: { // 调查报告复核
          checkOpinion: "", // 意见签署
          checkResult: "", // 复核结果
          initDistance: "", // 目前调查距离
          updatedDistance: "" // 修改后距离
        },
        summaryNoteInfo: { // 备注汇总
          checkOpinion: "", // 调查主管复核意见
          examineRemark: "", // 审批意见备注
          finalRemark: "", // 终审结论
          managerRemark: "", // 客户经理意见
          signRemark: "" // 面签面核意见备注
        },
        surveyReserveInfo: { // 调查预约
          plannedSurveyTime: "", // 计划调查时间
          reserveInfo: [
            {
              availableInd: "", // 是否有效
              createdBy: "", // 创建者
              createdDate: "", // 创建时间
              exceptionDesc: "", // 异常情况说明
              id: 0,
              reserveStatus: "", // 预约状态
              reserveTime: "", // 预约时间
              sort: 0,
              surveyId: "", // 调查编号
              updatedBy: "", // 更新者
              updatedDate: "" // 更新时间
            }
          ]
        },
        aprLoanRecord: [] // 历史贷款信息
      },
      custInfo: {},
      address: [],
      arealist: [],
      municipalitiesArr: ['110000', '120000', '310000', '500000'],
      creaditHeight: 700,
      dilogWidth: 1200
    };
  },
  computed: {
    ...mapGetters([
      'surveyId', // vuex 传参
      'applicationId',
      'fieldConfig',
      'surveySource'
    ]),
    exception_desc() {
      return this.fieldConfig.exception_desc;
    }
  },
  watch: {
    auditTop() {
      this.auditTopHeight = this.auditTop + 'px';
    },
    insertNavBar: {
      deep: true,
      immediate: true,
      handler(_new) {
          if (_new instanceof Array && _new.length > 0) {
          this.insertNavBar.forEach(_v => {
            this.navArr.splice(_v.index, 0, _v.navBar);
          });
        }
      }
    }
  },
  created() {
    this.getMultiDict(['ins_payment_mode_code', 'insurance_company']);
    this.showBORF = this.surveySource === 'BORF';
    // 动态导航栏
    if (this.navBardian) {
      this.navArr = this.navArr.concat(this.navBardian);
    }
    // 获取地址数据
    this.getAddressData();
  },
  mounted() {
    this.$nextTick(() => {
      if (this.auditTop) {
        this.auditTopHeight = this.auditTop + 'px';
      } else {
        this.auditTopHeight = document.getElementById('audit_top').offsetHeight + 'px';
      }
    });
  },
  methods: {
    saveProductRemark() {
      if (!this.sveryProdutRemark.remark) {
        return;
      }
      let data = {
        applicationId: this.applicationId,
        surveyId: this.surveyId,
        productRemark: this.sveryProdutRemark.remark
      };
      this.$MyFetch.post(surveyApi.saveProductRemark, data).then(_data => {
        this.confirmFn('保存成功');
      }).catch(_err => {
        this.confirmFn(_err.message);
      });
    },
    getMultiDict(arr, isReadOnly = true) {
      let data = {
        categoryCodes: arr,
        getAll: isReadOnly
      };
      this.$MyFetch.get(surveyApi.multipleSelect, data).then(res => {
        this.dictLib = res;
      });
    },
    getData() {
      // // surveyId根据列表页点击的详情按钮所在行取相应的Id
      // this.$MyFetch.get(surveyApi.surveyTaskDetails + this.surveyId)
      //   .then((data = {}) => {
      //     this.pageData = data;
      //     this.pageData.pythonData = JSON.parse(data.pythonData);
      //     // // 历史贷款信息
      //     this.emitData();
      //   })
      //   .catch((err) => {
      //     this.$error(err.message);
      //   });

      // 1--历史贷款记录
      // 2--业务详情
      // 3--信用报告信息
      // 4--贷款信息
      // 5--客户信息
      // 6--爬虫界面
      // 7--调查报告复核
      // 8--备注汇总
      // 9--调查预约
      //
      // /details1-9/{surveyId}
      let queryList = [
        this.$MyFetch.get(surveyApi.surveyTaskDetails1 + this.surveyId),
        this.$MyFetch.get(surveyApi.surveyTaskDetails2 + this.surveyId),
        this.$MyFetch.get(surveyApi.surveyTaskDetails3 + this.surveyId),
        this.$MyFetch.get(surveyApi.surveyTaskDetails4 + this.surveyId),
        this.$MyFetch.get(surveyApi.surveyTaskDetails5 + this.surveyId),
        this.$MyFetch.get(surveyApi.surveyTaskDetails8 + this.surveyId),
        this.$MyFetch.get(surveyApi.surveyTaskDetails9 + this.surveyId),
        this.$MyFetch.get(surveyApi.queryAbnormal)
      ];
      Promise.all(queryList).then(_data => {
        this.pageData.aprLoanRecord = _data[0].aprLoanRecord; // 1
        this.pageData.businessDetailInfo = _data[1].businessDetailInfo; // 2
        if (!this.pageData.businessDetailInfo.otherChannelType && !this.pageData.businessDetailInfo.otherChannelCode) {
          this.$set(this.pageData.businessDetailInfo, 'otherChannelType', '自来客户');
        }
        this.pageData.creditReportInfo = _data[2].creditReportInfo; // 3
        this.pageData.loanInfo = _data[3].loanInfo; // 4
        this.pageData.personalInfo = _data[4].personalInfo; // 5
        // this.pageData.summaryNoteInfo = _data[5].summaryNoteInfo; // 8
        let list = _data[5].summaryNoteInfo.historyProductRemark;
        let tempList = [];
        list.forEach(item => {
          let strList = item ? item.split('\n') : [];
          tempList.push(strList);
        });
        this.pageData.summaryNoteInfo = _data[5].summaryNoteInfo;
        this.pageData.summaryNoteInfo.historyProductRemark = tempList;
        this.sveryProdutRemark.remark = _data[5].summaryNoteInfo.productRemark || '';
        this.pageData.surveyReserveInfo = _data[6].surveyReserveInfo; // 9
        this.abnormalReasonList = _data[7].list; // 异常原因
        this.getRecheck();
        this.emitReserveData();
      }).catch(_err => {
        this.$error(_err.message);
      });
      // this.$MyFetch.get(surveyApi.surveyTaskDetails2 + this.surveyId).then((data = {}) => {
      //   this.pageData.businessDetailInfo = data.businessDetailInfo;
      //   if (!this.pageData.businessDetailInfo.otherChannelType && !this.pageData.businessDetailInfo.otherChannelCode) {
      //     this.$set(this.pageData.businessDetailInfo, 'otherChannelType', '自来客户');
      //   }
      // }).catch((err) => {
      //   this.$error(err.message);
      // });
      // this.$MyFetch.get(surveyApi.surveyTaskDetails5 + this.surveyId).then((data = {}) => {
      //   this.pageData.personalInfo = data.personalInfo;
      //   this.getRecheck();
      // }).catch((err) => {
      //   this.$error(err.message);
      // });
      // this.$MyFetch.get(surveyApi.surveyTaskDetails4 + this.surveyId).then((data = {}) => {
      //   this.pageData.loanInfo = data.loanInfo;
      // }).catch((err) => {
      //   this.$error(err.message);
      // });
      // this.$MyFetch.get(surveyApi.surveyTaskDetails3 + this.surveyId).then((data = {}) => {
      //   this.pageData.creditReportInfo = data.creditReportInfo;
      // }).catch((err) => {
      //   this.$error(err.message);
      // });
      // this.$MyFetch.get(surveyApi.surveyTaskDetails1 + this.surveyId).then((data = {}) => {
      //   this.pageData.aprLoanRecord = data.aprLoanRecord;
      // }).catch((err) => {
      //   this.$error(err.message);
      // });
      // // this.$MyFetch.get(surveyApi.surveyTaskDetails6 + this.surveyId).then((data = {}) => {
      // //   this.pageData.pythonData = JSON.parse(data.pythonData);
      // // }).catch((err) => {
      // //   this.$error(err.message);
      // // });
      // this.$MyFetch.get(surveyApi.surveyTaskDetails8 + this.surveyId).then((data = {}) => {
      //   this.pageData.summaryNoteInfo = data.summaryNoteInfo;
      // }).catch((err) => {
      //   this.$error(err.message);
      // });
      // this.$MyFetch.get(surveyApi.surveyTaskDetails9 + this.surveyId).then((data = {}) => {
      //   this.pageData.surveyReserveInfo = data.surveyReserveInfo;
      //   this.emitReserveData();
      // }).catch((err) => {
      //   this.$error(err.message);
      // });
      this.$MyFetch.get(surveyApi.surveyTaskDetails8 + this.surveyId).then((data = {}) => {
        let list = data.summaryNoteInfo.historyProductRemark;
        let tempList = [];
        list.forEach(item => {
          let strList = item ? item.split('\n') : [];
          tempList.push(strList);
        });
        this.pageData.summaryNoteInfo = data.summaryNoteInfo;
        this.pageData.summaryNoteInfo.historyProductRemark = tempList;
        this.sveryProdutRemark.remark = data.summaryNoteInfo.productRemark || '';
      }).catch((err) => {
        this.$error(err.message);
      });
      this.$MyFetch.get(surveyApi.surveyTaskDetails9 + this.surveyId).then((data = {}) => {
        this.pageData.surveyReserveInfo = data.surveyReserveInfo;
        this.emitReserveData();
      }).catch((err) => {
        this.$error(err.message);
      });
    },
    getRecheck() { // 客戶信息返回后才请求复核信息
      this.$MyFetch.get(surveyApi.surveyTaskDetails7 + this.surveyId).then((data = {}) => {
        // 转码
        data.reportCheckInfo.forEach(_o => {
          _o.abnormalReasonDesc = [];
          _o.abnormalReason.forEach(_v => {
            let index = this.abnormalReasonList.findIndex(item => {
              return _v === item.itemCode;
            });
            if (index > -1) {
              _o.abnormalReasonDesc.push(this.abnormalReasonList[index].itemDesc);
            }
          });
          _o.abnormalReasonDesc = _o.abnormalReasonDesc.join("|");
        });
        this.pageData.reportCheckInfo = data.reportCheckInfo;
        this.emitRecheckData();
      }).catch((err) => {
        this.$error(err.message);
      });
    },
    emitReserveData() {
      let routerNow = this.$route.name;
      if (routerNow.indexOf('pending') !== -1) {
        this.$emit("setReserveInfo", this.pageData.surveyReserveInfo);
      } else {
        for (let x of this.pageData.surveyReserveInfo.reserveInfo) {
          if (x.reserveStatus === '0' || x.reserveStatus === '正常') {
            x.isAbnormal = false;
            if (this.pageData.surveyReserveInfo.plannedSurveyTime) {
              x.plannedSurveyTime = this.pageData.surveyReserveInfo.plannedSurveyTime;
            }
          } else {
            x.isAbnormal = true;
            if (x.exceptionDesc === '6' || x.exceptionDesc === '其他') {
              x.hasRemark = true;
            } else {
              x.hasRemark = false;
            }
          }
          x.reserveStatus = reserveStatusConversion(x.reserveStatus);
          x.exceptionDesc = this.exceptionDescConversion(x.exceptionDesc);
        }
      }
    },
    emitRecheckData() {
      let routerNow = this.$route.name;
      if (routerNow.indexOf('recheck') !== -1) {
        let custInfo = Object.assign(
          {},
          this.pageData.reportCheckInfo,
          {checkOpinion: this.pageData.summaryNoteInfo.checkOpinion}
        );
        this.$emit("setRecheckModel", custInfo);
      } else {
        this.pageData.reportCheckInfo.forEach(v => {
          v.checkResult = checkResultConversion(v.checkResult);
          // let index = this.abnormalReasonList.findIndex(_item => {
          //   return _item.itemCode === v.itemCode;
          // });
          v.abnormalReason = v.abnormalReason[0];
        });
        // this.pageData.reportCheckInfo.checkResult = checkResultConversion(this.pageData.reportCheckInfo.checkResult);
      }
      this.custInfo = {
        custName: this.pageData.personalInfo.custName, // 客户姓名
        jobTitle: this.pageData.personalInfo.jobTitle, // 职务名称
        checkOpinion: this.pageData.summaryNoteInfo.checkOpinion,
        careerTypeCode: this.pageData.personalInfo.careerTypeCode, // 客户类型
        initDistance: this.pageData.reportCheckInfo.initDistance, // 目前调查距离
        workplaceName: this.pageData.personalInfo.workplaceName // 单位名称
      };
      this.$emit("setCustInfo", this.custInfo);
    },
    // 获取地址数据
    getAddressData() {
      this.getArea().then(res => {
        this.arealist = res;
        this.address = this.initAddress(res);
        // 获取详情数据
        this.getData();
      }).catch(err => {
        // 获取详情数据
        this.getData();
        this.$message({
          showClose: true,
          message: '获取地址数据失败',
          type: 'error'
        });
        this.$error(err.message);
      });
    },
    // 改写地址数据格式，处理直辖市级别不一致的问题
    initAddress(res) {
      let address = [];
      for (let p of res) {
        if (this.municipalitiesArr.indexOf(p.value) !== -1) {
          let c = {
            label: p.label,
            value: p.value,
            children: []
          };
          c.children.push(p);
          address.push(c);
        } else {
          address.push(p);
        }
      }
      return address;
    },
    // 解析地址数据
    formatAddress(areaId) {
      if (!areaId) {
        return;
      }
      let place = '';
      let stepObj = parseAddress(areaId, this.address);
      if (!stepObj) {
        place = areaId;
      } else {
        if (stepObj.province === stepObj.city) {
          place = stepObj.province + stepObj.area;
        } else {
          place = stepObj.province + stepObj.city + stepObj.area;
        }
      }
      return place;
    },
    // 固定锚链接导航
    goAnchor(selector, index) {
      this.activeBtn = index;
      document.getElementById("audit_box").scrollTop = document.getElementById(selector).offsetTop - 10;
      this.$emit("anchor", index);
    },
    // 查看征信报告
    showCredit() {
      this.$getCreditReport('survey', this.applicationId).then(res => {
        this.creditReport = res;
        if (window.screen.width > 1280) {
          this.creaditHeight = 700;
        } else {
          this.creaditHeight = 600;
        }
        this.isShowCredit = true;
      });
    },
    // 关闭征信报告
    closeCredit() {
      this.isShowCredit = false;
    },
    // 异常信息编码与展示转换
    exceptionDescConversion(value) {
      if (parseInt(value) % 1 === 0) {
        return this.exception_desc.children[parseInt(value) - 1].itemDesc;
      } else {
        for (let i in this.exception_desc.children) {
          if (this.exception_desc.children[i].itemDesc === value) {
            return (Number(i) + 1).toString();
          }
        }
      }
    },
    // 历史贷款记录详情
    goHistory(id, certificateId, type) {
      let query = { appID: id, isEdit: true, sourceSystem: getSystemName(), comeFrom: 'noPending' };
      if (type === "faceToFaceTask") {
        this.oldApplicationId = id;
        this.creditReportId = certificateId;
        if (window.screen.width > 1280) {
          this.dilogWidth = 1200;
        } else {
          this.dilogWidth = 964;
        }
        this.dialogVisible = true;
        var timer = setInterval(function() {
          if (document.getElementsByClassName("v-modal")[0]) {
            document
              .getElementsByClassName("v-modal")[0]
              .setAttribute("style", "z-index: 400!important");
            clearInterval(timer);
          }
        }, 500);
      } else if (type === "approveTask") {
        this.$router.push({
          name: 'approval-pending-start',
          query: query
        });
      } else {
        this.$router.push({
          name: 'audit-pending-start',
          query: query
        });
      }
    },
    openNewWindow(url) {
      window.open(url);
    },
    headStyle({row, rowIndex}) {
      return 'my_table_head';
    },
    rowStyle({row, rowIndex}) {
      return 'my_table_body';
    }
  },
  components: {
    popup,
    detectionMsg,
    insuranceTable,
    houseTable,
    creditCardTable
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
/* 下内容 */
.audit_box{
  .product-remark-warp {
    text-align: right;
  }
  .audit_bottom {
    background: #ececec;
    position: relative;
    overflow: hidden;
  }

  /* 下方布局 */
  .content_right_box {
    margin: 30px 0px 100px 174px;
    // margin-top: 30px;
    // margin-left: 174px;
    /deep/ .content_border.credit-card {
      .content_table_wrap {
        .el-table__header-wrapper, .el-table__body-wrapper {
          table {
            width: 100% !important;
          }
        }
      }
    }
  }
  .content {
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.08);
    overflow: hidden;
    margin: 10px 30px 0 30px;
    padding-bottom: 6px;
  }
  .content_border {
    border-left: 2px solid #cfd7e6; // 左侧分界线
    padding-top: 10px;
    padding-bottom: 10px;
    margin-top: 10px;
    position: relative;

    // &.last_padding300{
    //   padding-bottom:300px;
    // }
    .insurance_table, .house_table {
      padding: 20px 30px;
    }
  }

  .content_title_head {
    display:flex;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    top: -10px;
    left: -10px;
  }
  .content_title_headA {
    border-radius: 50px;
    display: -moz-inline-box;
    display: inline-block;
    width: 17px;
    height: 17px;
    background: #cfd7e6;
    border: 4px solid #fff;
  }
  .content_title_headB {
    padding-left: 9px;
    font-weight: bold;
    font-size: 14px;
    color: #000;
  }
  .content_title_on {
    .content_title_headA{
      background: #ffffff;
      border: 4px solid #538bf1;
    }
    .content_title_headB{
      color: #538BF1;
    }
  }

  .content_bottom_border{
    margin: 0 30px;
    padding-bottom: 10px;
    border-bottom:1px solid #d0d0d0;

    &.no_border {
      border: none;
    }
    .content_title{
      margin-left: 0;
    }
  }

  /* 清浮动 */
  .clearfloat:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0;
  }
  .clearfloat {
    zoom: 1;
  }
  .topology_margin{
    margin: 0 -30px;
  }
  .svy_report_check.topology_margin {
    .top_conten:nth-child(1),.top_conten:nth-child(2) {
      width: 13%;
    }
    .top_conten:nth-child(3) {
      width: 31%;
    }
    .top_conten:nth-child(4) {
      width: 27%;
    }
  }
  .content_title {
    margin: 20px 0 10px 30px;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    text-indent: 6px;
    border-left: 2px solid #538bf1;
  }
  .content_table_wrap{
    padding:30px;
  }
  .content_table_box{
    padding:0 30px 0 30px;

    &:last-child{
      padding-bottom:25px;
    }

    .content_title{
      margin-left: 0;
    }
  }

  /* 爬虫界面列表 */
  .conntent_list{
    margin-top: 20px;
    border:1px solid #d0d0d0;
    border-bottom: none;

    .content_item{
      height:60px;
      border-bottom: 1px solid #d0d0d0;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;

      .content_item_left{
        width:100px;
        min-width:100px;
        line-height:60px;
        text-align: center;
        border-right:1px solid #d0d0d0;
      }
      .content_item_center{
        min-width:200px;
        height:60px;
        line-height:60px;
        text-align: center;
        border-right:1px solid #d0d0d0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .content_item_right{
        padding-left:30px;
        align-self: stretch;
        height:60px;
        line-height:60px;
        /* Firefox */
        display:-moz-box;
        -moz-box-pack:center;
        -moz-box-align:center;

        /* Safari、Opera 以及 Chrome */
        display:-webkit-box;
        -webkit-box-pack:center;
        -webkit-box-align:center;

        /* W3C */
        display:box;
        box-pack:center;
        box-align:center;
      }
    }
  }
  /* 蓝色字体 */
  .blue_font {
    font-size: 14px;
    color: #538bf1;
    letter-spacing: -0.34px;
  }
  .new_window {
    color: #538BF1;
    cursor: pointer;
  }
  /* 黑色字体 */
  .black_font {
    font-size: 14px;
    color: #333333;
    letter-spacing: -0.34px;
  }
  .orange {
    font-size: 14px;
    color: orange;
  }

  /* 联系人信息表格 */
  .my_table {
    width: 1186px;
    border: 1px solid #d0d0d0;
    margin: 20px;
  }

  .my_table_head {
    font-size: 12px;
    color: #666;
    letter-spacing: 0;
    text-align: center;
    border-bottom: 1px solid #d0d0d0;
    line-height: 30px;
    height:30px;
  }
  .my_table_body > td > div {
    background: #000;
    border: 1px solid #dddddd;
    border-radius: 3px;
    height: 30px;
    line-height: 30px;
    width: 70%;
    margin: 15px auto;
  }

  /* 备注汇总 */
  .content_text_wrap{
    padding-bottom:20px;
    &:last-child{
      border:none;
    }
  }
  .content_text{
    line-height:20px;
  }
  /*调查预约*/
  .content_top_padding{
    padding-top: 10px
  }
  .red{
    color:#f00;
  }
}
.popup-wrap {
  width:100vw;
  position:relative;
}
@media screen and (max-width:1280px){
  /deep/.face2face-detail .el-dialog__body .nav-content .nav-content1 .check-component{
    height:400px;
  }
}
</style>
