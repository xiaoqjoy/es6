<template>
  <div>
    <div class="allMain">
      <h3>
        <router-link to="/patientManage" style="color: black;text-decoration: none;">患者管理</router-link>
        <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
        <label class="label-add-patient">患者详情</label>
      </h3>
      <span class="returns"><span @click="returnPat" style="text-decoration: none;color: white;">返回</span></span>
      <div class="main_fir">
        <div class="mains contentBorder">
          <div class="PatientFile">患者档案
            <div style="float: right;"><!--<span class="setMes">发消息</span>-->
                <span class="m_edits" @click="editss">编辑档案</span></div>
          </div>
          <!--<div style="height: 275px;">-->
          <div style="height: 200px;">
            <div class="usePic">
              <img :src="patientInfo_.sex=='女' ? woman : man" alt=""/>
              <p>{{patientInfo_.patientName}}</p>
            </div>
            <!---->
            <el-form label-width="" style="width:84%;">
              <el-form-item label="性别：">
                {{patientInfo_.sex}}<span style="opacity: 0;">1</span>
              </el-form-item>
              <el-form-item label="年龄：">
                {{age_!=='' ? age_ : ''}}<span style="opacity: 0;">1</span>
              </el-form-item>
              <el-form-item label="身高：">
                {{patientInfo_.height ? patientInfo_.height+'cm' : ""}}<span style="opacity: 0;">1</span>
              </el-form-item>
              <el-form-item label="体重：">
                {{patientInfo_.weight ? patientInfo_.weight+'kg' : ""}}<span style="opacity: 0;">1</span>
              </el-form-item>
              <el-form-item label="BMI指数：">
                {{patientInfo_.bmi}}<span style="opacity: 0;">1</span>
              </el-form-item>
              <el-form-item label="糖龄：">
                {{patientSugarVo.ensureDate !== undefined ? patientSugarVo.ensureDate : ''}}<span
                style="opacity: 0;">1</span>
              </el-form-item>
              <el-form-item label="类型：">
                {{patientSugarVo.diabetesType }}<span style="opacity: 0;">1</span>
              </el-form-item>
              <el-form-item label="并发症：">
                {{patientSugarVo.complications }}<span style="opacity: 0;">1</span>
              </el-form-item>
              <el-form-item label="现在治疗方式：" class="bloc">
                <p class="blic">{{patientInfo_.nowTreatment}}</p>
              </el-form-item>
              <!--
              <el-form-item label="健康综述：" class="bloc">
                <p class="blic">{{patientInfo_.healthReview}}</p>
              </el-form-item>
              -->
              <!--
              <el-form-item label="近期状况：" class="bloc" style='white-space: nowrap;text-overflow: ellipsis;overflow: hidden;'>
                  {{patientInfo_.situation}}
              </el-form-item>
              -->
            </el-form>
          </div>
          <el-collapse-transition>
              <div class="infoMain" v-show="isShowInfo">

                  <!--基本信息-->
                  <div class="infoMainSection">
                    <span class="Essinfor">基本信息</span>
                    <el-form label-width="">
                      <el-form-item label="身份证号：">
                        {{patientInfo_.idCard }}<span style="opacity: 0;">1</span>
                      </el-form-item>
                      <el-form-item label="手机号：">
                        {{patientInfo_.phone }}<span style="opacity: 0;">1</span>
                      </el-form-item>
                      <el-form-item label="出生日期：">
                        {{patientInfo_.birthday}} <span style="opacity: 0;">1</span>
                      </el-form-item>
                      <el-form-item label="婚姻状态：">
                        {{patientInfo_.maritalStatus }}<span style="opacity: 0;">1</span>
                      </el-form-item>
                      <el-form-item label="职业：" style="white-space: nowrap;">
                        {{patientInfo_.job }}<span style="opacity: 0;">1</span>
                      </el-form-item>
                      <el-form-item label="家庭住址：" style="width: 38%;">
                        {{patientInfo_.province}} {{patientInfo_.city}} {{patientInfo_.district}} {{patientInfo_.address}}<span
                        style="opacity: 0;">1</span>
                      </el-form-item>
                      <el-form-item label="紧急联系人：">
                        {{patientInfo_.emergencyContact}}<span style="opacity: 0;">1</span>
                      </el-form-item>
                      <el-form-item label="紧急联系人电话：">
                        {{patientInfo_.emergencyPhone}}<span style="opacity: 0;">1</span>
                      </el-form-item>
                      <!--<el-form-item label="设备编码：">
                                      {{patientInfo_.deviceId }}<span style="opacity: 0;">1</span>
                                  </el-form-item>-->
                      <el-form-item label="标签："
                                    style="width: 100%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
                        {{tags_ }}<span style="opacity: 0;">1</span>
                      </el-form-item>
                    </el-form>
                  </div>
                  <!--健康信息-->
                  <div class="healthInfors infoMainSection">
                    <span class="Essinfor">健康信息</span>
                    <el-form label-width="">
                      <el-form-item label="疾病史：">
                        {{patientInfo_.diseasesHistory }}<span style="opacity: 0;">1</span>
                      </el-form-item>
                      <el-form-item label="过去治疗方式：">
                        {{patientInfo_.pastTreatment }}<span style="opacity: 0;">1</span>
                      </el-form-item>
                      <el-form-item label="现病史：">
                        {{patientInfo_.historyOfPresentIllness }} <span style="opacity: 0;">1</span>
                      </el-form-item>
                      <el-form-item label="过敏史：">
                        {{patientInfo_.allergicHistory }}<span style="opacity: 0;">1</span>
                      </el-form-item>
                      <el-form-item label="家族史：">
                        {{patientInfo_.familyHistory }}<span style="opacity: 0;">1</span>
                      </el-form-item>
                    </el-form>
                  </div>
                  <!--生活习惯-->
                  <div class="healthInfors infoMainSection">
                    <span class="Essinfor">生活习惯</span>
                    <el-form label-width="">
                      <el-form-item label="劳动强度：">
                        {{patientInfo_.labourIntensity}}<span style="opacity: 0;">1</span>
                      </el-form-item>
                      <el-form-item label="抽烟：">
                        {{patientInfo_.smokingStatus }}<span v-if="patientInfo_.smokingDaily>0">：{{patientInfo_.smokingDaily}}根每天</span><span
                        style="opacity: 0;">1</span>
                      </el-form-item>
                      <el-form-item label="饮酒：">
                        {{patientInfo_.drinkingStatus }}<span v-if="patientInfo_.drinkingDaily>0">：{{patientInfo_.drinkingType}}{{patientInfo_.drinkingDaily}}毫升每天</span><span
                        style="opacity: 0;">1</span>
                      </el-form-item>
                      <el-form-item label="锻炼情况：">
                        {{patientInfo_.exerciseFrequency }}<span style="opacity: 0;">1</span>
                      </el-form-item>
                      <el-form-item label="睡眠时间：">
                        {{patientInfo_.sleepStatus }}<span style="opacity: 0;">1</span>
                      </el-form-item>
                      <el-form-item label="平时情绪：">
                        {{patientInfo_.peacetimeEmotion }}<span style="opacity: 0;">1</span>
                      </el-form-item>
                      <el-form-item label="饮食偏好：">
                        {{patientInfo_.foodHabit }}<span style="opacity: 0;">1</span>
                      </el-form-item>
                    </el-form>
                  </div>
                  <!--健康综述-->
                  <div class="healthInfors infoMainSection">
                    <span class="Essinfor">健康综述</span>
                    <el-form label-width="">
                      <el-form-item label="健康综述：" style="width: 100% !important;">
                        <p class="blic" style="margin-left: 0;">{{patientInfo_.healthReview }}</p>
                      </el-form-item>
                    </el-form>
                  </div>
                  <!--备注-->
                  <div class="healthInfors infoMainSection">
                    <span class="Essinfor">备注</span>
                    <el-form label-width="">
                      <el-form-item label="备注：" style="width: 100% !important;">
                        <p class="blic" style="margin-left: 0;">{{patientInfo_.remark }}</p>
                      </el-form-item>
                    </el-form>
                  </div>

              </div>
          </el-collapse-transition>
          <div class="trapezoid" @click="showPatientInfo" ><span v-text="isShowInfo?'收起 ':'展开 '"></span><i :class="isShowInfo?'el-icon-d-arrow-left':'el-icon-d-arrow-right'"></i></div>
        </div>
      </div>
      <div class="main_Sec">
        <div class="topse">
          <ul>
            <li v-for="(it,index) in my_bloods" :class="{'active':nowBlod==index}" @click="bloodSur(index)">{{it}}</li>
          </ul>
        </div>
        <!--血糖-->
        <div class="bloodSurg">
          <div class="timeC">
            <ul>
              <li class="fir">时间选择：</li>
              <li v-for="(a,index) in timeChose" :class="{'actives_':MyTimeChose==index}" @click="timeChoses(index)">
                {{a}}
              </li>
            </ul>
            <el-button class="addBlood" size="mini" @click="printData">打印报告</el-button>
            <el-button class="addBlood" size="mini" @click="addSurgeData">添加血糖</el-button>
            <el-button class="addBlood" v-show="isShowSugarWarningBtn" size="mini" @click="patientSugarWarningSet">血糖预警设置</el-button>
          </div>
          <div class="chartContent">
            <div class="chartLeft">
              <div class="chartOne">
                <dl class="limosis">
                  <dt>{{params.data.dataList.total}}</dt>
                  <dd>空腹</dd>
                </dl>
                <chart :params="params"></chart>
              </div>
              <div class="detail">
                <dl>
                  <dt>{{params.data.dataList.heightCount ? Math.round(params.data.dataList.heightCount/params.data.dataList.total*100):0}}%</dt>
                  <dd>偏高</dd>
                </dl>
                <dl>
                  <dt>{{params.data.dataList.normalCount ? Math.round(params.data.dataList.normalCount/params.data.dataList.total*100):0}}%</dt>
                  <dd>正常</dd>
                </dl>
                <dl>
                  <dt>{{params.data.dataList.lowCount ? Math.round(params.data.dataList.lowCount/params.data.dataList.total*100):0}}%</dt>
                  <dd>偏低</dd>
                </dl>
              </div>
            </div>
            <div class="chartRight">
              <p class="unit">单位：mmol/L</p>
              <div class="chartTwo">
                <chart :params="lineChart"></chart>
              </div>
            </div>
          </div>
          <div class="chartContent">
            <div class="chartLeft">
              <div class="chartOne">
                <dl class="before">
                  <dt>{{beforeBar.data.dataList.total}}</dt>
                  <dd>餐前</dd>
                </dl>
                <chart :params="beforeBar"></chart>
              </div>
              <div class="detail">
                <dl>
                  <dt>{{beforeBar.data.dataList.heightCount ? Math.round(beforeBar.data.dataList.heightCount/beforeBar.data.dataList.total*100):0}}%</dt>
                  <dd>偏高</dd>
                </dl>
                <dl>
                  <dt>{{beforeBar.data.dataList.normalCount ? Math.round(beforeBar.data.dataList.normalCount/beforeBar.data.dataList.total*100):0}}%</dt>
                  <dd>正常</dd>
                </dl>
                <dl>
                  <dt>{{beforeBar.data.dataList.lowCount ? Math.round(beforeBar.data.dataList.lowCount/beforeBar.data.dataList.total*100):0}}%</dt>
                  <dd>偏低</dd>
                </dl>
              </div>
            </div>
            <div class="chartRight">
              <p class="unit">单位：mmol/L</p>
              <div class="chartTwo">
                <chart :params="beforeLine"></chart>
              </div>
            </div>
          </div>
          <div class="chartContent">
            <div class="chartLeft">
              <div class="chartOne">
                <dl class="after">
                  <dt>{{afterBar.data.dataList.total}}</dt>
                  <dd>餐后</dd>
                </dl>
                <chart :params="afterBar"></chart>
              </div>
              <div class="detail">
                <dl>
                  <dt>{{afterBar.data.dataList.heightCount ? Math.round(afterBar.data.dataList.heightCount/afterBar.data.dataList.total*100):0}}%</dt>
                  <dd>偏高</dd>
                </dl>
                <dl>
                  <dt>{{afterBar.data.dataList.normalCount ? Math.round(afterBar.data.dataList.normalCount/afterBar.data.dataList.total*100):0}}%</dt>
                  <dd>正常</dd>
                </dl>
                <dl>
                  <dt>{{afterBar.data.dataList.lowCount ? Math.round(afterBar.data.dataList.lowCount/afterBar.data.dataList.total*100):0}}%</dt>
                  <dd>偏低</dd>
                </dl>
              </div>
            </div>
            <div class="chartRight">
              <p class="unit">单位：mmol/L</p>
              <div class="chartTwo">
                <chart :params="afterLine"></chart>
              </div>
            </div>
          </div>
          <!--血糖测量数据统计表-->
          <div class="surgeStatistics">
            <div class="surgerNumber"><a><span>最高值</span><i>&nbsp;{{judgeMapAll.maxSugar}}</i></a><a><span>最低值</span><em>&nbsp;{{judgeMapAll.minSugar}}</em></a>
            </div>
            <div style="margin: 10px 20px">
              <surgeTable v-on:showDialog="showDialog" :sugerTestList="sugerTestList" :timeFrame="timeFrame"></surgeTable>
              <!--分页-->
              <div class="block">
                <el-pagination
                  @size-change="handleSizeChangeSuger"
                  @current-change="handleCurrentChangeSuger"
                  :current-page="sugerCurrentPage"
                  :page-sizes="[5, 10, 15]"
                  :page-size="sugerPagesize"
                  background
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="pagesizeCurrent.totalNum">
                </el-pagination>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="main_Third">
        <div class="topse">
          <ul>
            <li v-for="(it,index) in my_arr" :class="{'active':nowClick==index}" @click="bow(index)">{{it}}</li>
          </ul>
        </div>

        <!--健康干预表格-->
        <div style="padding: 20px;" v-if="nowClick==0">
          <span class="newAdd" @click="intermeddle()">新增干预</span>
          <el-table
            ref="multipleTable"
            :data="tableData1"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              fixed
              label="操作时间"
              align="center"
            >
              <template slot-scope="scope">{{formatDate(scope.row.updateTime)}}</template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="方案名称"
              key="name_1"
              align="center">
            </el-table-column>
            <el-table-column
              prop="intervertType"
              label="类型"
              key="type_1"
              align="center">
            </el-table-column>
            <el-table-column
              prop="updateTime"
              label="执行时间"
              key="updateTime"
              :formatter="updaT_"
              align="center">
            </el-table-column>
            <el-table-column
              prop="operationUser"
              label="操作人"
              key="updateUserId_1"
              align="center">
            </el-table-column>
            <el-table-column
              prop="content"
              label="执行方式"
              key="content_1"
              align="center">
            </el-table-column>
            <el-table-column
              prop="status"
              key="status_1"
              :formatter="status_"
              label="状态"
              align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button @click="handleClick1(scope.row)" type="text" size="small" :formatter="caoz">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="currentPage1"
              :page-sizes="[5, 10, 15]"
              :page-size="pagesize1"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNum1">
            </el-pagination>
          </div>

        </div>

        <!--健康随访表格-->
        <div style="padding: 20px;" v-if="nowClick==1">
          <span class="newAdd" @click='newFollow'>新增随访</span>
          <el-table
            ref="multipleTable"
            :data="tableData2"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              fixed
              label="随访时间"
              align="center">
              <template slot-scope="scope">{{ formatDate(scope.row.planTime) }}</template>
            </el-table-column>
            <el-table-column
              prop="planUserName"
              label="随访人员"
              key="name_2"
              align="center">
            </el-table-column>
            <el-table-column
              prop="content"
              label="随访内容"
              key="content_2"
              align="center">
            </el-table-column>
            <el-table-column
              prop="result"
              key="result_2"
              label="随访结论"
              align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <!--<el-button @click="handleClick2(scope.row)" type="text" size="small">执行</el-button>-->
                <!--<el-button @click="handleClick2(scope.row)" type="text" size="small" v-if="status==2">执行</el-button>-->
                <el-button @click="handleClick2(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="block">
            <el-pagination
              style="float: right;"
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="currentPage2"
              :page-sizes="[5, 10, 15]"
              :page-size="pagesize2"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNum2">
            </el-pagination>
          </div>

        </div>

        <!--健康提醒表格-->
        <div style="padding: 20px;" v-if="nowClick==2">
          <span class="newAdd" sty @click="newRemind">新增提醒</span>
          <el-table
            ref="multipleTable"
            :data="tableData3"
            tooltip-effect="dark"
            style="width: 100%;"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              fixed
              label="推送时间"
              align="center">
              <template slot-scope="scope">{{ formatDate(scope.row.createTime) }}</template>
            </el-table-column>
            <!-- TO DO 更改createUserId字段 -->
            <el-table-column
              prop="remindUserName"
              key="createUserId_1"
              label="推送人员"
              align="center">
            </el-table-column>
            <el-table-column
              prop="content"
              key="content_1"
              label="建议内容"
              align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button @click="handleClick3(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="block">
            <el-pagination
              style="float: right;"
              @size-change="handleSizeChange3"
              @current-change="handleCurrentChange3"
              :current-page="currentPage3"
              :page-sizes="[5, 10, 15]"
              :page-size="pagesize3"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNum3">
            </el-pagination>
          </div>

        </div>

      </div>

      <!-- 报告展示 -->
      <div class="showReport">
        <div class="topse">
          <ul>
            <li class="active">健康报告</li>
          </ul>
        </div>
        <div class="reportListBox">
          <ul class="clearfix">
            <li class="floatLeft" v-for="(item, index) in reportImgList" @click="showBigReport(item)">
              <img :src="item.pressReportUrl" alt="">
            </li>
            <div class="tac" v-if="reportImgList.length == 0">暂无检测报告</div>
          </ul>
        </div>
      </div>

    </div>

    <!--新增提醒-->
    <div class="newReminds" v-if="ifnewRemind">
      <div class="newRemind">
        <h5>推送提醒</h5>
        <span class="close" @click="addClose('ruleForm')">X</span>
        <ul>
          <li>患者姓名：<span>{{patientInfo.patientName}}</span></li>
          <li>出生年月：<span>{{patientInfo.birthday}}</span></li>
          <li>性别：<span>{{patientInfo.sex}}</span></li>
          <li>手机号：<span>{{patientInfo.phone}}</span></li>
        </ul>
        <ul>
          <li>身 高：<span>{{patientInfo.height ? patientInfo.height + 'cm' : ''}}</span></li>
          <li>体 重：<span>{{patientInfo.weight ? patientInfo.weight + 'kg' : ''}}</span></li>
          <li>类型：<span>{{patientSugarVo1.diabetesType}}</span></li>
          <li>并发症：<span>{{patientSugarVo1.complications }}</span></li>
        </ul>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm"
                style="margin-top:30px;">
          <el-form-item label="提醒方式" prop="typeWay">
            <!--<el-radio-group v-model="ruleForm.typeWay" style="vertical-align: bottom;">-->
            <!--<el-radio :label="it.itemKey" style="margin: 0 7px 10px;" v-for="it in m_typeWays " :key="it.itemValue">{{it.itemValue}}</el-radio>-->
            <!--</el-radio-group>-->
            <el-select v-model="ruleForm.typeWay" placeholder="提醒方式" style="vertical-align: bottom;">
              <el-option style="margin: 0 7px 10px;"
                        v-for="it in m_typeWays"
                        :key="it.itemKey"
                        :label="it.itemValue"
                        :value="it.itemKey">
                {{it.itemValue}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="提醒内容" prop="recont">
            <el-input type="textarea" resize="none" v-model="ruleForm.recont"></el-input>
          </el-form-item>
          <el-form-item label="" prop="">
            <span>快捷回复:</span>
            <span class="edit" @click="edit">编辑</span>
          </el-form-item>
          <el-form-item>
            <!--  -->
            <el-radio-group v-model="radio_" @change="handClick" style="vertical-align: inherit;display: inline;">
              <el-radio fill="#ccc" :label="tag" v-for="(tag,index) in dynamicTags" :key="tag.replyContent">
                <el-tag
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
                  {{tag.replyContent}}
                </el-tag>

              </el-radio>
            </el-radio-group>
            <span v-if="newAdds" style="display: inline-block;">
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
          </span>
          </el-form-item>
          <el-form-item style="text-align: right;">
            <el-button @click="resetRemind('ruleForm')">取消</el-button>
            <el-button type="primary" @click="remSure('ruleForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!--查看干预-->
    <div class="ViewInters" v-if="ifViewInter">
      <div class="ViewInter">
        <h5>查看干预</h5>
        <span class="close" @click="closes_d('ruleForm')">X</span>
        <el-form :label-position="labelPos" :rules="rules" ref="ruleForm" label-width="75px" class="demo-ruleForm"
                style="padding-top: 20px;border-top: 1px solid #e0e0e0;margin-top: 30px;">
          <el-form-item label="患者姓名:" prop="">
            {{patientInfo.patientName}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="出生年月:" prop="">
            {{patientInfo.birthday}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="性别:" prop="">
            {{patientInfo.sex}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="手机号:" prop="">
            {{patientInfo.phone}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="身高:" prop="">
            {{patientInfo.height ? patientInfo.height + 'cm' : ''}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="体重:" prop="">
            {{patientInfo.weight ? patientInfo.weight + 'kg' : ''}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="类型:" prop="">
            {{patientSugarVo.diabetesType}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="并发症:" prop="">
            {{ patientSugarVo.complications}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="干预类型:" prop="" style="width: 100%;">
            {{ healthInter_.intervertType}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="方案名称:" prop="" style="width: 100%;">
            {{ healthInter_.name}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="干预内容:" prop="" style="width: 100%;">
            {{ healthInter_.content}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="发送时间:" prop="" style="width: 100%;">
            {{ healthInter_.planSendTime !==null ? formatDate(healthInter_.planSendTime) : healthInter_.realSendTime
            !==null ? formatDate(healthInter_.realSendTime): ''}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item style="text-align: right;width: 100%;">
            <el-button type="primary" @click="closes_d()">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!--随访明细-->
    <div class="followPlans" v-if="ifFolDetail">
      <div class="followPlan">
        <h5>随访明细</h5>
        <span class="close" @click="closes_s('ruleForm')">X</span>
        <el-form :label-position="labelPos" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                style="padding-top: 20px;border-top: 1px solid #e0e0e0;margin-top: 30px;">
          <el-form-item label="患者姓名:" prop="">
            {{patientInfo.patientName}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="出生年月:" prop="">
            {{patientInfo.birthday}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="性别:" prop="">
            {{patientInfo.sex}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="手机号:" prop="">
            {{patientInfo.phone}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="身份证号:" prop="">
            {{patientInfo.idCard}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="档案号码:" prop="">
            {{fileNumber_}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="身高:" prop="">
            {{patientInfo.height ? patientInfo.height + 'cm' : ''}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="体重:" prop="">
            {{patientInfo.weight ? patientInfo.weight + 'kg' : ''}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="BMI指数:" prop="">
            {{patientInfo.bmi}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="类型:" prop="">
            {{patientSugarVo.diabetesType}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="糖龄:" prop="">
            {{patientSugarVo.ensureDate !== "" ? patientSugarVo.ensureDate : ''}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="并发症:" prop="">
            {{ patientSugarVo.complications}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="创建时间:" prop="">
            {{followPerson.createTime}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="创建人:" prop="">
            {{followPerson.createUserName}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="随访内容:" prop="" style="width: 100%;display: block;">
            {{followPerson.content}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="随访时间:" prop="">
            {{followPerson.realTime}}<span style="opacity: 0;">1</span>
          </el-form-item>

          <el-form-item label="随访人员:" prop="">
            {{followPerson.realUserName}}<span style="opacity: 0;">1</span>
          </el-form-item>

          <el-form-item label="随访方式:" prop="">
            {{followPerson.type}}<span style="opacity: 0;">1</span>
          </el-form-item>

          <el-form-item label="随访结论:" prop="" style="width: 100%;display: block;">
            {{followPerson.result}}<span style="opacity: 0;">1</span>
          </el-form-item>

          <el-form-item style="text-align: right;width: 100%;">
            <el-button type="primary" @click="closes_s()">确定</el-button>
          </el-form-item>
        </el-form>

        <!--微信头像-->
        <div class="weChats" style="right: 80px;">
          <img :src="patientInfo.sex=='女' ? woman : man" alt=""/>
          <span>微信头像</span>
        </div>
      </div>
    </div>

    <!--提醒明细-->
    <div class="RemiDetas" v-if="ifRemiDeta">
      <div class="RemiDeta">
        <h5>提醒明细</h5>
        <span class="close" @click="closes_t('ruleForm')">X</span>
        <el-form :label-position="labelPos" :rules="rules" ref="ruleForm" label-width="75px" class="demo-ruleForm"
                style="padding-top: 20px;border-top: 1px solid #e0e0e0;margin-top: 17px;">
          <el-form-item label="患者姓名:" prop="">
            {{patientInfo.patientName}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="性别:" prop="">
            {{patientInfo.sex}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="出生年月:" prop="">
            {{patientInfo.birthday}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="手机号:" prop="">
            {{patientInfo.phone}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="身高:" prop="">
            {{patientInfo.height ? patientInfo.height + 'cm' : ''}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="体重:" prop="">
            {{patientInfo.weight ? patientInfo.weight + 'kg' : ''}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="提醒内容:" prop="" style="width: 100%;">
            {{remindCont}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item style="text-align: right;width: 100%;">
            <el-button type="primary" @click="closes_t()">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!--手动添加血糖-->
    <el-dialog title="添加血糖" :visible.sync="dialogFormVisible" :append-to-body="true" width="520px" :close-on-click-modal="false">
      <el-form>
        <el-form-item label="血糖值" :label-width="formLabelWidth">
          <el-input v-model="surge.price" auto-complete="off" class="inputWidthCommon"></el-input>
          <span>&nbsp;mmol/L</span>
          <label for="" style="margin-left: 30px;">时段&nbsp;</label>
          <el-select v-model="surge.time" placeholder="请选择时段" class="inputWidthCommon">
            <el-option v-for="(i,index) in timeFrame"
                      :key="index"
                      :label="i.name"
                      :value="i.timeType">{{i.name}}</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="测量时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="surge.value"
            type="datetime"
            format="yyyy-MM-dd HH:mm"
            :picker-options="pickerOptions"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <!--<el-form-item label="备注" :label-width="formLabelWidth">-->
          <!--<el-input-->
            <!--type="textarea"-->
            <!--style="width:90%"-->
            <!--:rows="2"-->
            <!--placeholder="请输入内容"-->
            <!--v-model="surge.remark">-->
          <!--</el-input>-->
        <!--</el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetFormsSurge">取 消</el-button>
        <el-button type="primary" :disabled="clickDisabel" @click="submitFormsSurge">确 定</el-button>
      </div>
    </el-dialog>
    <!--打印-->
    <el-dialog title="血糖记录单" :visible.sync="dialogSurgeVisible" :append-to-body="true" :close-on-click-modal="false" @close='closeDialog'>
      <div class="printSurgeData">
        <div class="surgeDataTime">
          <el-date-picker
            class="floatLeft"
            v-model="startSurgeTime"
            type="date"
            format="yyyy-MM-dd"
            size="small"
            :picker-options="pickerOptions2"
            placeholder="选择日期时间">
          </el-date-picker>
          <span class="floatLeft">&nbsp;至&nbsp;</span>
          <el-date-picker
            class="floatLeft"
            v-model="endSurgeTime"
            type="date"
            format="yyyy-MM-dd"
            :picker-options="pickerOptions1"
            size="small"
            placeholder="选择日期时间">
          </el-date-picker>
          <el-button size="small" class="floatLeft" style="margin-left: 20px" @click="sureTimeData">确定</el-button>
        </div>
        <div class="printContent printOrder-data" id="wrap">
          <p class="titleBottom" v-if="PrintSurgeData.length==0">暂无数据</p>
          <div v-for="b in Math.ceil(PrintSurgeData.length/43)">
            <p class="titleTop">{{orgName}}</p>
            <p class="titleBottom">血糖记录单</p>
            <ul>
              <li><label for="">姓名：</label><span>{{patientInfo_.patientName}}</span></li>
              <li><label for="">年龄：</label><span>{{age_!=='' ? age_ : ''}}</span></li>
              <li><label for="">科室：</label><span>{{orgName}}</span></li>
              <li><label for="">医生：</label><span>{{docName}}</span></li>
              <li><label for="">性别：</label><span>{{patientInfo_.sex}}</span></li>
              <li><label for="">备注：</label><span></span></li>
            </ul>
            <div>
              <table class="printConfig">
                <thead>
                <tr>
                  <th style="width: 20%;max-width:  20%;min-width: 20%;">日期</th>
                  <th style="width:  20%; max-width:  20%;min-width:  20%;">时段</th>
                  <th style="width:  20%; max-width:  20%; min-width:  20%;">测量结果</th>
                  <th>备注</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="i in PrintSurgeData.slice(43*(b-1),b*43)">
                  <td>{{i.createTime}}</td>
                  <td>{{i.name}}</td>
                  <td>{{i.sugar}}</td>
                  <td>&nbsp;</td>
                </tr>
                </tbody>
              </table>
              <p style="font-size: 12px;">第{{b}}页</p>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="print" @click="PrintSure">打印</el-button>
      </div>
    </el-dialog>
    <!-- 打印单个血糖化验单 -->
    <el-dialog title="血糖化验单" :visible.sync="dialogSugarTestVisible" :close-on-click-modal="false" :before-close="closeDialogSugarTest">
      <div class="sugerTestLine"></div>
      <div class="sugarTestPrintArea" id="sugarTestPrintArea">
        <div class="sugerTestContent">
          <h3 class="hospital">{{orgName}}</h3>
          <div class="title">血糖化验单</div>
          <div class="userInfo">
            <div class="clearfix">
              <p class="item1"><span>姓名 : </span><span>{{patientInfo_.patientName}}</span></p>
              <p class="item2"><span>年龄 : </span><span>{{age_!=='' ? age_ : ''}}</span></p>
              <p class="item3"><span>科室 : </span><span>{{orgName}}</span></p>
              <p class="item4"><span>&nbsp;&nbsp;&nbsp;&nbsp;患者ID : </span><span>{{$route.query.fileNumber}}</span></p>
            </div>
            <div class="clearfix">
              <p class="item1"><span>性别 : </span><span>{{patientInfo_.sex}}</span></p>
              <p class="item2"><span>备注 : </span><span></span></p>
              <p class="item3"><span>医生 : </span><span></span>{{docName}}</p>
            </div>
          </div>
          <div class="tableBox">
            <table class="sugarTest" cellspacing="0">
              <thead>
                <tr>
                  <th>测试类型</th>
                  <th>测试名称</th>
                  <th>结果</th>
                  <th>结果单位</th>
                  <th>标识</th>
                  <th>参考范围</th>
                </tr>
                <tr>
                  <th>GLU</th>
                  <th>葡萄糖</th>
                  <th>{{isSugerData}}</th>
                  <th>mmol/L</th>
                  <th>{{sugarStatus}}</th>
                  <th>{{isSugerScoped}}mmol/L</th>
                </tr>
              </thead>
            </table>
          </div>
          <div class="bottom">
            <div class="testInfo clearfix">
              <p class="item1"><span>送检时间 : </span><span>{{inspectTime}}</span></p>
              <p class="item2"><span>报表时间 : </span><span>{{sendTime}}</span></p>
              <p class="item3"><span>检验者 : </span><span>{{docName}}</span></p>
              <p class="last item4"><span>核对者 : </span><span></span></p>
            </div>
            <p class="statement">声明 : 本报告仅对所检测的标本负责 , 仅供临床医生参考</p>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="print" @click="printSugerTest">打印</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import surgeTable from '../common/myTable';
  import man from '../../../images/patientManage/add_suif_pic_man.png';
  import woman from '../../../images/patientManage/add_suif_pic_woman.png';
  import baseMixin from '../mixin/BaseMixin';
  import funBus from '../../assets/js/funBus';
  require('../../assets/js/Print');

  export default {
    mixins: [baseMixin],
    name: 'patientDetail',
    data() {
      return {
        // 血糖数据
        isSugerData:'',
        // 参考范围
        isSugerScoped:'',
        // 血糖状态
        sugarStatus:'',
        // 送检时间
        inspectTime:'',
        // 表时间
        sendTime:'',
        isShowInfo: false, // 是否显示患者详细信息
        sugerPagesize:15,
        sugerCurrentPage:1,
        pagesizeCurrent:{},
        clickDisabel:false,
        //时段
        timeFrame:[],
        //时间限制
        pickerOptions: { // <=今天的日期
          disabledDate: (time) => {
            //return time.getTime() < this.surge.value || time.getTime() > Date.now();
            return time.getTime() > Date.now();
          }
        },
        pickerOptions0: { // >=今天的日期
          disabledDate: (time) => {
            //if (this.endSurgeTime != "") {
            //  return time.getTime() > Date.now() || time.getTime() > this.endSurgeTime;
            //} else {
            //  return time.getTime() > Date.now();
            //}
            return time.getTime() < Date.now() - 8.64e7;

          }
        },
        pickerOptions2:{
          disabledDate:(time) => {
            var curDate = (new Date()).getTime();
            var three = 90 * 24 * 3600 * 1000;
            var threeMonths = curDate - three;
            if (this.endSurgeTime != "") {
              return time.getTime() > Date.now() || time.getTime() > this.endSurgeTime,time.getTime() > Date.now() || time.getTime() < threeMonths || time.getTime() > Date.now();
            } else {
              return time.getTime() > Date.now(),time.getTime() > Date.now() || time.getTime() < threeMonths || time.getTime() > Date.now();
            }
          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            var curDate = (new Date()).getTime();
            var three = 90 * 24 * 3600 * 1000;
            var threeMonths = curDate - three;
            return time.getTime() > Date.now() || time.getTime() < threeMonths || time.getTime() > Date.now(),time.getTime() < this.startSurgeTime || time.getTime() > Date.now();
          }
        },
        //打印数据
        PrintSurgeData:[],
        //医生
        docName:'',
        orgName:'',
        sugerTestList: [],
        judgeMapAll:{},
        //打印
        dialogSurgeVisible: false,
        startSurgeTime:'',
        endSurgeTime:'',
        // 弹窗
        dialogFormVisible: false,
        formLabelWidth: '80px',
        surge: {
          price: '',
          time: '',
          value: '',
          remark: ''
        },
        //图表
        params: {
          name: '',
          data: {dataList:''},
          style: {},
          list: [],
          class: 'limosisBar',
          random: 0
        },
        lineChart: {
          name: '',
          data: {dataList:[]},
          style: {},
          list: [],
          class: 'limosisLine',
          random: 0
        },
        beforeBar: {
          name: '',
          data: {dataList:{}},
          style: {},
          list: [],
          class: 'beforeBar',
          random: 0
        },
        beforeLine: {
          name: '',
          data: {dataList:[]},
          style: {},
          list: [],
          class: 'beforeLine',
          random: 0
        },
        afterBar: {
          name: '',
          data: {dataList:{}},
          style: {},
          list: [],
          class: 'afterBar',
          random: 0
        },
        afterLine: {
          name: '',
          data: {dataList:[]},
          style: {},
          list: [],
          class: 'afterLine',
          random: 0
        },
        dateType:1,
        man: man,
        woman: woman,
        tags_: "", // 患者标签
        followPerson: "",
        m_typeWays: [],
        patientInfo_: "",
        followTemplates: [],
        Executor: [],
        FollowMethod: [],
        FollowPersonnel: [],
        healthInter_: "",
        remindCont: "",
        inputValue: "",
        inputVisible: '',
        newAdds: "",
        radio_: "",
        copy_radio_: '',
        FollowUpData: {},
        ifRemiDeta: false,
        ifViewInter: false,
        patientSugarVo: "",
        fileNumber_: "",
        labelPos: "left",
        checkedss: false,
        radio4: 1,
        dynamicTags: [],
        interTypes: [],
        ifHealthInter: false,
        ifnewRemind: false,
        age_: "",
        myIndex: 1,
        customerId: "", // 患者id
        m_userCusId: "",
        m_fileNumber: "",
        ifFolDetail: false,
        options: [],
        MyTimeChose: 0,
        currentPage1: 1,
        pagesize1: 5,
        currentPage2: 1,
        pagesize2: 5,
        currentPage3: 1,
        pagesize3: 5,
        multipleTable: "",
        tableData1: [],
        tableData2: [],
        tableData3: [],
        totalNum1: 0,
        totalNum2: 0,
        totalNum3: 0,
        nowClick: 0,
        nowBlod: 0,
        timeChose: ['最近一周', '最近1个月', '最近3个月'],
        my_bloods: ['血糖'],
        my_arr: ['健康干预', '健康随访', '健康提醒'],
        // 初始化空对象
        chart: null,
        // 初始化图表配置
        opinion: ['偏高', '正常', '偏低', '喔噢'],
        opinionData: [{
          value: 26,
          name: '偏高'
        }, {
          value: 31,
          name: '正常'
        }, {
          value: 18,
          name: '偏低'
        }, {
          value: 18,
          name: '喔噢'
        }],
        //患者档案
        patientInfo: "",
        patientSugarVo1: "",
        sex: "",
        age: '',
        height: "",
        weight: "",
        BMIS: '',
        OldSugar: '',
        TreatNow: '',
        types: '',
        Review: '',
        situation: '',
        //基本信息
        IDNum: '',
        tel: "",
        birth: "",
        MarStatus: "",
        Occupation: "",
        HomeAddress: "",
        //健康信息
        HistoryDis: "",
        TreatPast: "",
        PresentIll: "",
        Anaphylaxis: "",
        familyHistory: "",
        //生活习惯
        labourInten: "",
        smoking: "",
        DrinkWine: "",
        ExeCond: "",
        SleepTime: "",
        Ordinary: "",
        DietPrefer: "",
        //备注
        Remarks: "",
        // 打印血糖化验单
        dialogSugarTestVisible: false,
        // 报告图片列表
        reportImgList: [],
        isShowSugarWarningBtn: true // 设置是否显示血糖预警按钮
      }
    },
    methods: {
      //健康干预
      healthRe( currentPage, pagesize) {
        this.$api.pagedQuery({currentPage:currentPage, pageSize:pagesize, createUserId:1, customerId:this.customerId},res=> {
          if (res.status == 200) {
            if (res.data.code == 0) {
              this.tableData1 = res.data.data.items;
              this.totalNum1 = res.data.data.totalNum;
            }
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      //健康随访
      healthFol( currentpage, pageSize) {
        this.$api.followPaged({currentPage:currentpage, pageSize:pageSize, customerId:this.customerId},res=> {
          if (res.status == 200) {
            if (res.data.code == 0) {
              this.tableData2 = res.data.data.items;
              this.totalNum2 = res.data.data.totalNum;
            }
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      //健康提醒
      healthRem(currentpage, pageSize) {
        this.$api.remindPaged({currentPage:currentpage, pageSize:pageSize, customerId:this.customerId},res=> {
          if (res.status == 200) {
            if (res.data.code == 0) {
              this.tableData3 = res.data.data.items;
              this.totalNum3 = res.data.data.totalNum;
            }
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      showPatientInfo() { //展开/收起患者详情
          this.isShowInfo = !this.isShowInfo;
      },
      returnPat() {
        this.$router.push("/patientManage");
      },
      //取消
      resetFormsSurge(){
        this.dialogFormVisible = false;
      },
      //时段
      timeAare(){
        this.$api.querySugarDictionaryList({}, res => {
          if(res.data.data){
            this.timeFrame = res.data.data
          }
        })
      },
      // 提交手动添加血糖
      submitFormsSurge() {
        if(!this.surge.price){
          this.$message('请输入0.1-33.3的正确区间数字血糖值')
        }else if(!(/^(?:0|[1-9]\d{0,2})(\.\d)?$/).test(this.surge.price)){
          this.$message('请输入0.1-33.3的正确区间数字血糖值')
        }else if(this.surge.price <=0||this.surge.price>33.3){
          this.$message('请输入0.1-33.3的正确区间数字血糖值')
        }else if(!this.surge.time){
          this.$message('请选择时段')
        } else if(!this.surge.value){
          this.$message('请选择测量时间')
        }else{
          let data = {
            sugar: this.surge.price,
            customerId: this.$route.query.cusTomId,
            organId: JSON.parse(sessionStorage.getItem('user')).organizationId,
            organSysCode: JSON.parse(sessionStorage.getItem('user')).organSysCode,
            timeType: this.surge.time,
            createTime:this.surge.value,
            remark: this.surge.remark
          }
          this.clickDisabel = true
          this.$api.addSugarTest(data, res=>{
            if(res.data.code==0){
              this.dialogFormVisible = false;
              this.$message('新增成功')
              this.allChartList()
              this.surgeTable()
            }
          },res=>{
            this.$message(res.data.errMsg)
          })
        }
      },
      //手动添加血糖
      addSurgeData(){
        this.surge = {}
        this.dialogFormVisible = true
        this.clickDisabel = false
      },
      //数据
      printData(){
        let user = JSON.parse(sessionStorage.getItem('user'))
        this.docName = user.nickname;
        this.orgName = user.organName;
        this.dialogSurgeVisible = true
        this.startSurgeTime = (new Date()).getTime() - 30 * 24 * 3600 * 1000
        this.endSurgeTime = new Date()
        this.unifyPrintData()
      },
      sureTimeData(){
        this.PrintSurgeData = []
        this.unifyPrintData()
      },
      closeDialog(){
        this.PrintSurgeData = []
      },
      //打印列表数据封装
      unifyPrintData(){
        if(!this.startSurgeTime){
          this.$message('输入开始时间不能为空')
        }else if(!this.endSurgeTime){
          this.$message('输入结束时间不能为空')
        }else{
          var data = {
            customerId: this.$route.query.cusTomId,
            createStartTime: this.formatDate(this.startSurgeTime).split(' ')[0],
            createEndTime: this.formatDate(this.endSurgeTime).split(' ')[0]
          };
          this.$api.countCustomerSugerInfoPrint(data, res=>{
            if(res.data.data){
              this.PrintSurgeData=res.data.data
              for(var j=0;j<this.PrintSurgeData.length;j++){
                this.PrintSurgeData[j].createTime=this.formatDate(res.data.data[j].createTime).split(' ')[0]
              }
              if(this.PrintSurgeData.length < Math.ceil(this.PrintSurgeData.length/43)*43){
                let all = Math.ceil(this.PrintSurgeData.length/43)*43-this.PrintSurgeData.length
                for(var i=0;i<all;i++){
                  this.PrintSurgeData.push({"createTime": '', "name": '', "sugar": ''})
                }
              }
            }
            setTimeout(() => {
              if(this.PrintSurgeData){
                this.tabelDataClean()
              }
            },500);
          })
        }
      },
      //打印
      PrintSure(){
        Print('#wrap')
      },
      //打印单个血糖化验单
      printSugerTest(){
        Print('#sugarTestPrintArea')
      },
      //关闭随访明细弹窗
      closes_s() {
        this.ifFolDetail = false;
      },
      //关闭查看干预弹窗
      closes_d() {
        this.ifViewInter = false;
      },
      //关闭提醒明细弹窗
      closes_t() {
        this.ifRemiDeta = false;
      },
      //推送提醒
      newRemind() {
          let remindDialog = this.$parent.$refs.remindDialog;
          remindDialog.ifnewRemind = true;
          remindDialog.customerId = this.customerId;
          funBus.getPatients(remindDialog, this.customerId); // 获取患者信息
      },
      //新增随访
      newFollow() {
          let followUpDialog = this.$parent.$refs.followUpDialog;
          followUpDialog.ifFolPlan = true;
          followUpDialog.customerId = this.customerId;
          funBus.getPatients(followUpDialog, this.customerId); // 获取患者信息
      },
      //健康干预
      intermeddle() {
          let interventionDialog = this.$parent.$refs.interventionDialog;
          interventionDialog.ifHealthInter = true;
          interventionDialog.customerId = this.customerId;
          funBus.getPatients(interventionDialog, this.customerId); // 获取患者信息
      },
      caoz(data) {
        return data.status == 0 ? '已取消' : ''
      },
      updaT_(data) {
        return this.formatDate(data.updateTime)
      },
      status_(data) {
        return data.status == 0 ? '待发送' : data.status == 1 ? '干预成功' : data.status == 2 ? '干预失败' : ''
      },
      handleClick1(row) { // 查看干预
        this.ifViewInter = true;
        //根据ID查询健康干预
        var that = this;
        let data = {
          interventionId:row.interventionId
        }
        this.$api.queryByinte(data, res => {
          if (res.status == 200) {
            if (res.data.data) {
              that.healthInter_ = res.data.data;
            }
          }
        }).catch(function (err) {
          console.log(err)
        })
        //患者信息
        funBus.getPatients(that, row.customerId)
      },
      handleClick2(row) { // 查看随访
        var that = this;
        this.ifFolDetail = true;
        funBus.getPatients(this, row.customerId);
        //随访
        this.$api.queryByfoIds_({followUpId:row.followUpId},res=> {
          if (res.status == 200) {
            if (res.data.data) {
              that.followPerson = res.data.data;
              that.followPerson.createTime = that.formatDate(that.followPerson.createTime);
              that.followPerson.realTime = that.formatDate(that.followPerson.realTime);
              if (that.followPerson.type !== null) {
                that.$api.dictionary_({typeCode:'followWay', itemKey:that.followPerson.type},res=> {
                  if (res.status == 200) {
                    if (res.data.data) {
                      that.followPerson.type = res.data.data[0].itemValue;
                    }
                  }
                }).catch(function (err) {
                  console.log(err)
                })
              }

            }
          }
        }).catch(function (err) {
          console.log(err)
        })

      },
      handleClick3(row) {  // 查看推送提醒
        console.log(row)
        this.ifRemiDeta = true;
        this.remindCont = row.content;
        funBus.getPatients(this, row.customerId)
      },
      editss() { // 进来患者信息编辑页面
        var that = this;
        this.$router.push(
          {
            path: '/patientManage/edit',
            query: {
              cusTomId: that.customerId,
              userCusId: that.m_userCusId,
              fileNumber: that.m_fileNumber,
              patientSugId: that.patientSugarVo1.patientSugarId,
              patientId: that.patientSugarVo1.patientId
            }
          })
      },
      timeChoses(index) {
        this.MyTimeChose = index;
        this.dateType = index+1
        this.allChartList()
        this.surgeTable()
      },
      handleSizeChange1(val) {
        this.pagesize1 = val;
        this.healthRe( this.currentPage1, this.pagesize1);
      },
      handleSizeChange2(val) {
        this.pagesize2 = val;
        this.healthFol( this.currentPage2, this.pagesize2);
      },
      handleSizeChange3(val) {
        this.pagesize3 = val;
        this.healthRem( this.currentPage3, this.pagesize3);
      },
      handleSizeChangeSuger(val){
        this.sugerPagesize = val;
        this.surgeTable()
      },
      //表格
      handleSelectionChange(val) {
        console.log(val)
        // this.AOC = val;
      },
      handleCurrentChange1(val) { // 干预页码跳转
        this.currentPage1 = val;
        this.healthRe( this.currentPage1, this.pagesize1);
      },
      handleCurrentChange2(val) { // 随访页码跳转
        this.currentPage2 = val;
        this.healthFol( this.currentPage2, this.pagesize2);
      },
      handleCurrentChange3(val) { // 提醒页码跳转
        this.currentPage3 = val;
        this.healthRem( this.currentPage3, this.pagesize3);
      },
      handleCurrentChangeSuger(val){ //血糖测量数据统计表页码跳转
        this.sugerCurrentPage = val;
        this.surgeTable()
      },
      bow(index) { // 健康干预(/健康随访/健康提醒)tab切换事件
        var that = this;
        this.nowClick = index;
        if (index == 0) {
          this.healthRe( this.currentPage1, this.pagesize1);
        }
        if (index == 1) {
          this.healthFol( this.currentPage2, this.pagesize2);
        }
        if (index == 2) {
          this.healthRem( this.currentPage3, this.pagesize3);
        }
      },
      bloodSur(index) {
        this.nowBlod = index;
      },
      // 绘图
      drawGraph(id) {
        // 绘图方法
        this.chart = echarts.init(document.getElementById(id))
        // 皮肤添加同一般使用方式
        this.chart.showLoading()
        // 返回到data中
        var that = this
        // ajax 请求数据
        $.ajax({
          // 方式
          type: "GET",
          // 是否异步
          async: true,
          // 路径||API
          url: "xxx",
          //返回数据形式为json
          dataType: "json",
          // 加载成功
          success: function (result) {
            // 更新初始数据
            that.opinionData = result
          },
          // 加载错误
          error: function (errorMsg) {
            // alert("请求数据失败!");
            console.log(errorMsg)
          }
        })
        // set
        this.chart.setOption({
          title: {
            text: '女生喜欢的男生种类',
            subtext: '纯属扯犊子',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            x: 'center',
            y: 'bottom',
            data: this.opinion // 别忘了this
          },
          series: [{
            name: '种类',
            type: 'pie',
            // 内圆半径，外圆半径
            radius: [80, 100],
            avoidLabelOverlap: false,
            // 位置，左右，上下
            center: ['50%', '50%'],
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.opinionData // 别忘了this
          }]
        })
        this.chart.hideLoading()
      },
      //  饼图趋势图接口数据
      allChartList(){
        var data = {
          customerId: this.$route.query.cusTomId,
          dateType: this.dateType
        };
        this.$api.countCustomerSugerInfo(data, res => {
          this.params.data.dataList = res.data.data.judgeMapEmptyStomach
          this.lineChart.data.dataList = res.data.data.sugarTestListEmptyStomach
          this.beforeBar.data.dataList = res.data.data.judgeMapEmptyEatBefore
          this.beforeLine.data.dataList = res.data.data.sugarTestListEatBefore
          this.afterBar.data.dataList = res.data.data.judgeMapEmptyEatAfter
          this.afterLine.data.dataList = res.data.data.sugarTestListEatAfter
        }).catch(err=>{
          console.log(err);
        })
      },
      //  血糖表格
      surgeTable(){
        var data = {
          customerId: this.$route.query.cusTomId,
          dateType: this.dateType,
          currentPage: this.sugerCurrentPage,
          pageSize: this.sugerPagesize
        }
        this.$api.countCustomerSugerTableInfo(data, res => {
          this.intervalValue = res.data.data
          this.pagesizeCurrent = res.data.data.pageBean
          this.sugerTestList = res.data.data.pageBean.items
          this.judgeMapAll = res.data.data.judgeMapAll
        })
      },
      tabelDataClean(){
        var tab = document.querySelectorAll(".printConfig");
        for(let a=0;a<tab.length;a++){
          var maxCol = 1, val, count, start;
          for(var col = maxCol-1; col >= 0 ; col--){
            count = 1;
            val = "";
            for(var i=0; i<tab[a].rows.length; i++){
              if(val == tab[a].rows[i].cells[col].innerHTML){
                count++;
              }else{
                if(count > 1){ //合并
                  start = i - count;
                  tab[a].rows[start].cells[col].rowSpan = count;
                  for(var j=start+1; j<i; j++){
                    tab[a].rows[j].cells[col].style.display = "none";
                  }
                  count = 1;
                }
                val = tab[a].rows[i].cells[col].innerHTML;
              }
            }
            if(count > 1 ){ //合并，最后几行相同的情况下
              start = i - count;
              tab[a].rows[start].cells[col].rowSpan = count;
              for(var j=start+1; j<i; j++){
                tab[a].rows[j].cells[col].style.display = "none";
              }
            }
          }
        }
      },
      // 打印血糖化验单逻辑
      closeDialogSugarTest () {
        this.dialogSugarTestVisible = false;
      },
      // 图片报告
      showBigReport (item) {
        this.$children[0].bigImgShow = true;
        this.$children[0].bigImgUrl = item.reportUrl;
      },
      showDialog (a, b, c, d) {
        this.dialogSugarTestVisible = true;
        this.isSugerData = a
        this.isSugerScoped = b+'~'+c
        this.inspectTime = d
        let today = this.formatDate(Date.parse(new Date()))
        let startTime = today.split(' ')[0]
        this.sendTime = startTime
        this.sugarStatus = a*1<b*1?"↓":(a*1>c*1?"↑":'');
      },
      // 患者个人血糖设置
      patientSugarWarningSet () {
        let _this = this;
        let patientId = this.$route.query.cusTomId;
        let target = _this.$parent.$parent.$children[0].$refs.sugarWarningSetDialog;
        this.$api.getSugarWarningSet({scope:patientId}, res => {
          let dataList = res.data.data;
          // 定义目标弹窗
          if (dataList.length > 0) {
            dataList.forEach(item => {
              target.createUserId = item.createUserId;
              if (item.type == '1') {
                // 根据判断是弹窗数据还是短信数据设置预警弹窗初始值以及开关状态
                target.inputValueList[0] = item.minValue;
                target.inputValueList[1] = item.maxValue;
                target.switchDialog = item.status == '1'? true : false;
                target.dialogInputDisable = item.status == '1'? false : true;
                target.idDialog = item.id;
              } else if (item.type == '2') {
                target.inputValueList[2] = item.minValue;
                target.inputValueList[3] = item.maxValue;
                target.switchShortMessage = item.status == '1'? true : false;
                target.dialogshortMessageDisable = item.status == '1'? false : true;
                target.idShortMessage = item.id;
              }
            });
          } else {
            console.log('默认');
            target.init();
          }
          _this.$parent.$parent.$children[0].showSugarWarningSet();
          target.scopeId = patientId; // 将患者id传递给弹窗
        })
      },
      // 获取患者信息
      initPatient () {
        this.allChartList()
        this.surgeTable()
        this.timeAare()
        let user = JSON.parse(sessionStorage.getItem('user'));
        var that = this;
        this.isShowSugarWarningBtn = user.existDepartment; //是否显示设置血糖预警按钮
        this.docName = user.nickname;
        this.orgName = user.organName;
        //患者信息
        var cusTomId = this.$route.query.cusTomId;
        var userCusId = this.$route.query.userCusId;
        var fileNumber = this.$route.query.fileNumber;
        var data = {
          customerId:cusTomId,
          userCustomerId:userCusId
        }
        this.customerId = cusTomId;
        this.m_userCusId = userCusId;
        this.m_fileNumber = fileNumber;

        this.healthRe( this.currentPage1, this.pagesize1);

        this.$api.cuGetPat(data, res => {
          if (res.status == 200) {
            //患者标签
            var rads = res.data.data.listTags !== null ? res.data.data.listTags : '';
            var arrs_ = [];
            if (rads) {
              rads.forEach(function (it) {
                if (it !== null) {
                  arrs_.push(it.tagName)
                }
              })
            } else {
              arrs_ = [];
            }
            that.tags_ = arrs_.toString();

            if (res.data.data.patientSugarVo !== "null") {
              that.patientSugarVo1 = res.data.data.patientSugarVo;
              that.patientSugarVo1.ensureDate = that.patientSugarVo1.ensureDate !== null ? that.jsGetAge(that.formatDate(that.patientSugarVo1.ensureDate)) : '';
              //糖尿病类型
              if (that.patientSugarVo1.diabetesType !== null) {
                that.$api.dictionary_({typeCode:'diabetes_Type', itemKey:that.patientSugarVo1.diabetesType},res=> {
                  if (res.status == 200) {
                    if (res.data.data) {
                      that.patientSugarVo1.diabetesType = res.data.data[0].itemValue;
                    }
                  }
                }).catch(function (err) {
                  console.log(err)
                })
              }
            }
            if (res.data.data.patientBaseVo !== "null") {
              that.patientInfo_ = res.data.data.patientBaseVo;
              switch (res.data.data.patientBaseVo.drinkingType) {
                case 0:
                  that.patientInfo_.drinkingType = "其他"
                  break;
                case 1:
                  that.patientInfo_.drinkingType = "白酒"
                  break;
                case 2:
                  that.patientInfo_.drinkingType = "红酒"
                  break;
                case 3:
                  that.patientInfo_.drinkingType = "葡萄酒"
                  break;
                case 4:
                  that.patientInfo_.drinkingType = "啤酒"
                  break;
                case 5:
                  that.patientInfo_.drinkingType = "洋酒"
                  break;
              }
              that.patientInfo_.birthday = that.patientInfo_.birthday ? that.formatDate(that.patientInfo_.birthday).replace(/\s[\x00-\xff]*/g, '') : '';//时间戳转出生年月
              that.patientInfo_.sex = that.patientInfo_.sex == 1 ? '男' : that.patientInfo_.sex == 2 ? '女' : that.patientInfo_.sex == 0 ? '未知' : ''
              that.age_ = that.jsGetAge(that.patientInfo_.birthday);

              //根据key婚姻情况
              if (!that.patientInfo_.maritalStatus == "") {
                that.$api.dictionary_({typeCode:'marital_status', itemKey:that.patientInfo_.maritalStatus},res=> {
                  if (res.status == 200) {
                    if (res.data) {
                      that.patientInfo_.maritalStatus = res.data.data[0].itemValue;
                    }
                  }
                }).catch(function (err) {
                  console.log(err)
                })
              }
              //根据key职业
              if (!that.patientInfo_.job == "") {
                that.$api.dictionary_({typeCode:'job', itemKey:that.patientInfo_.job},res=> {
                  if (res.status == 200) {
                    if (res.data) {
                      that.patientInfo_.job = res.data.data[0].itemValue;
                    }
                  }
                }).catch(function (err) {
                  console.log(err)
                })
              }
              //根据key劳动强度
              if (!that.patientInfo_.labourIntensity == "") {
                that.$api.dictionary_({typeCode:'labour_intensity', itemKey:that.patientInfo_.labourIntensity},res=> {
                  if (res.status == 200) {
                    if (res.data) {
                      that.patientInfo_.labourIntensity = res.data.data[0].itemValue;
                    }
                  }
                }).catch(function (err) {
                  console.log(err)
                })
              }
              //根据key吸烟情况
              if (!that.patientInfo_.smokingStatus == "") {
                that.$api.dictionary_({typeCode:'smoking_status', itemKey:that.patientInfo_.smokingStatus},res=> {
                  if (res.status == 200) {
                    if (res.data) {
                      that.patientInfo_.smokingStatus = res.data.data[0].itemValue;
                    }
                  }
                }).catch(function (err) {
                  console.log(err)
                })
              }
              //根据key饮酒情况
              if (!that.patientInfo_.drinkingStatus == "") {
                that.$api.dictionary_({typeCode:'drinking_status', itemKey:that.patientInfo_.drinkingStatus},res=> {
                  if (res.status == 200) {
                    if (res.data) {
                      that.patientInfo_.drinkingStatus = res.data.data[0].itemValue;
                    }
                  }
                }).catch(function (err) {
                  console.log(err)
                })
              }
              //根据key锻炼时长
              if (!that.patientInfo_.exerciseFrequency == "") {
                that.$api.dictionary_({typeCode:'exercise_time', itemKey:that.patientInfo_.exerciseFrequency},res=> {
                  if (res.status == 200) {
                    if (res.data) {
                      that.patientInfo_.exerciseFrequency = res.data.data[0].itemValue;
                    }
                  }
                }).catch(function (err) {
                  console.log(err)
                })
              }
              //根据key睡眠情况
              if (!that.patientInfo_.sleepStatus == "") {
                that.$api.dictionary_({typeCode:'sleep_status', itemKey:that.patientInfo_.sleepStatus},res=> {
                  if (res.status == 200) {
                    if (res.data) {
                      that.patientInfo_.sleepStatus = res.data.data[0].itemValue;
                    }
                  }
                }).catch(function (err) {
                  console.log(err)
                })
              }
              //根据key平时情绪
              if (!that.patientInfo_.peacetimeEmotion == "") {
                that.$api.dictionary_({typeCode:'moodType', itemKey:that.patientInfo_.peacetimeEmotion},res=> {
                  if (res.status == 200) {
                    if (res.data) {
                      that.patientInfo_.peacetimeEmotion = res.data.data[0].itemValue;
                    }
                  }
                }).catch(function (err) {
                  console.log(err)
                })
              }
              //根据key饮食情况
              if (!that.patientInfo_.foodHabit == "") {
                var a = that.patientInfo_.foodHabit.split(",");
                that.patientInfo_.foodHabit = "";
                that.$api.dictionary_all({typeCode:'food_habit'},res=> {
                  if (res.status == 200) {
                    if (res.data) {
                      res.data.data.forEach(function (item) {
                        a.forEach(function (num) {
                          if (item.itemKey == num) {
                            // console.log(item.itemValue)
                            that.patientInfo_.foodHabit += item.itemValue + ";";
                          }

                        })
                      })

                    }
                  }
                }).catch(function (err) {
                  console.log(err)
                })
              }
              // 报告图片列表
              that.reportImgList = res.data.data.listReport ? res.data.data.listReport : [];
            }
          }
        }).catch(function (err) {
          console.log(err)
        })
      }
    },
    // keypoint：执行方法
    // “将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。”
    created() {
      this.initPatient();
    },
    components: {
      surgeTable,
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应...
        this.$children[0].$parent.initPatient();
      }
    }
  }
</script>

<style scoped>
  .lock-content {
    padding: 20px;
    border: 1px solid #f1f1f1;
  }

  .edit[data-v-7cba761a] {
    color: #267bf7;
    cursor: pointer;
    padding-left: 657px;
  }

  .healthInter ul:nth-of-type(1), .newRemind ul:nth-of-type(1) {
    padding-top: 20px;
    border-top: 1px solid #f1f1f1;
  }

  .healthInter ul, .newRemind ul {
    margin-top: 20px;
    width: 100%;
    height: 20px;
    display: block;
  }

  .newRemind .el-radio {
    color: #606266;
    font-weight: 500;
    line-height: 1;
    cursor: pointer;
    white-space: nowrap;
    outline: 0;
    margin: 0 5px 20px 5px;
  }

  .healthInter ul li, .newRemind ul li {
    width: 24%;
    display: inline-block;
    font-size: 12px;
    color: #111111;
  }

  .healthInter ul li span, .newRemind ul li span {
    color: #666666;
  }

  .healthInter table {
    padding: 20px 0;
    margin-top: 20px;
    font-size: 12px;
  }

  .healthInter table tr {
    display: block;
    margin-bottom: 20px;
  }

  .healthInter table tr td:nth-child(1) {
    width: 48px;
    padding-right: 11px;
    color: #111111;
  }

  .healthInter h5, .ViewInter h5, .RemiDeta h5, .followPlan h5, .newRemind h5 {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #111111;
  }

  .healthInter, .ViewInter, .RemiDeta, .followPlan, .newRemind {
    padding: 17px;
    position: fixed;
    /* top: 50%;
        left: 50%; */
    width: 840px;
    /*height: 548px;*/
    background-color: #ffffff;
    border-radius: 8px;
  }

  .RemiDeta {
    width: 640px;
  }

  .ViewInter .el-form-item, .RemiDeta .el-form-item, .followPlan .el-form-item {
    margin-bottom: 0;
  }

  .close {
    position: absolute;
    right: 17px;
    top: 17px;
    cursor: pointer;
  }

  .alls {
    background: #f7f8fa;
  }

  .allMain {
    width: 89.5%;
    position: absolute;
    top: 60px;
    left: 160px;
    padding: 19px 0 19px 20px;
  }

  .main_fir, .main_Sec, .main_Third, .showReport {
    margin-bottom: 20px;
    background: white;
    width: 100%;
  }

  h3 {
    font-size: 14px;
    color: #267bf7;
  }

  .mains {
    box-sizing: border-box;
    width: 100%;
    /*height: 851px;*/
    background-color: #ffffff;
    padding: 20px;
    margin-top: 19px;
    position: relative;
  }

  .returns {
    background-color: #267bf7;
    border-radius: 12px;
    position: absolute;
    right: 2px;
    top: 16px;

    width: 80px;
    height: 24px;
    background-color: #267bf7;
    border-radius: 12px;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 24px;
    letter-spacing: 0px;
    color: #ffffff;
    cursor: pointer;
    text-align: center;
  }

  .PatientFile {
    height: 45px;
    border-bottom: 1px solid #eff2f5;
  }

  .setMes {
    margin-right: 15px;
  }

  .setMes, .m_edits {
    cursor: pointer;
    border-radius: 4px;
    border: solid 1px #cecece;
    font-size: 14px;
    width: 70px;
    text-align: center;
    line-height: 30px;
    height: 30px;
    display: inline-block;
  }

  .main_fir .el-form-item {
    width: 19%;
    display: inline-block;
    margin-bottom: 0px;
  }

  .bloc {
    width: 100% !important;
    display: block;
    margin-bottom: 10px;
  }

  .blic {
    display: block;
    margin-left: 110px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .usePic {
    float: left;
    width: 80px;
    height: 80px;
    padding: 50px;
    display: inline-block;
  }

  .usePic img {
    width: 80px;
    height: 80px;
  }

  .usePic p {
    margin-top: 10px;
    text-align: center;
  }

  .main_fir .el-form {
    padding: 20px 0 0 10px;
    float: left;
    display: inline-block;
    width: 100%;
  }

  .healthInfors .el-form-item {
    width: 49% !important;
  }

  .Essinfor {
    background-color: #eff5f7;
    border-radius: 14px;
    cursor: pointer;
    color: #819cad;
    font-size: 14px;
    width: 70px;
    text-align: center;
    line-height: 30px;
    height: 30px;
    display: block;
  }

  .topse {
    height: 55px;
    border-bottom: 1px solid #eff2f5;
  }

  .topse li {
    cursor: pointer;
    float: left;
    width: 110px;
    height: 52px;
    line-height: 52px;
    text-align: center;
  }

  li {
    list-style: none;
  }

  .weChats {
    position: absolute;
    top: 92px;
    right: 41px;
    width: 48px;
  }

  .weChats img {
    width: 48px;
    height: 48px;
  }

  .weChats span {
    font-size: 12px;
  }

  .ViewInters .el-form .el-form-item, .RemiDeta .el-form .el-form-item {
    min-width: 200px;
    display: inline-block;
  }

  .followPlans .el-form .el-form-item {
    min-width: 250px;
    display: inline-block;
  }

  .active {
    background-color: #f2fafd;
    color: #267bf7;
    border-bottom: 2px solid #267bf7;
  }

  .newAdd {
    cursor: pointer;
    border-radius: 4px;
    border: solid 1px #cecece;
    font-size: 14px;
    width: 70px;
    text-align: center;
    line-height: 30px;
    height: 30px;
    display: inline-block;
    float: right;
    margin-bottom: 20px;
  }

  .el-table {
    border: 1px solid #eff2f5;
    border-bottom: none;
  }

  .block {
    /*float: right;*/
    text-align: right;
    margin-top: 30px;
    height: 90px;
  }

  .bloodSurg ul {
    display: inline-block;
  }

  .actives_ {
    color: white;
    background-color: #267bf7;
    border-radius: 12px;
  }

  .bloodSurg ul li {
    float: left;
    width: 80px;
    height: 24px;
    font-size: 14px;
    text-align: center;
    line-height: 24px;
    cursor: pointer;
    margin-right: 10px;
  }

  .bloodSurg ul .fir {
    cursor: auto;
    border: none;
    background: white;
    color: #000000;
  }

  .timeC {
    padding-top: 20px;
    margin: 0 20px;
  }

  .addBlood {
    cursor: pointer;
    float: right;
    margin-left: 10px;
  }

  .m_left, .m_right {
    float: left;
    width: 49%;
    height: 300px;
  }

  .line {
    float: left;
    width: 2px;
    height: 300px;
    background: #C0C0C0;
  }

  .addBloodSugar {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    overflow: auto;
    left: 0;
    top: 0;
    z-index: 1000;
  }

  .addBloodSugars {
    padding: 17px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -230px;
    margin-top: -274px;
    width: 460px;
    /*height: 548px;*/
    background-color: #ffffff;
    border-radius: 8px;
  }

  .addBloodSugars h5 {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #111111;
  }

  .addBloodSugars .el-form {
    width: 100%;
    border-top: 1px solid #e0e0e0;
  }

  .addBloodSugars .el-form-item {
    margin-bottom: 20px;
    width: 100%;
  }

  .addBloodSugars .close {
    position: absolute;
    right: 17px;
    top: 17px;
    cursor: pointer;
  }

  .newAddFollow .el-form .el-form-item {
    width: 240px;
    display: inline-block;
  }

  .newAddFollow {
    padding: 17px;
    position: fixed;
    top: 50%;
    left: 50%;
    /*height: 548px;*/
    background-color: #ffffff;
    border-radius: 8px;
    margin-left: -420px;
    margin-top: -304px;
    width: 840px;
  }

  .healthInters, .ViewInters, .RemiDetas, .followPlans, .newReminds, .newAddFollows {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    overflow: auto;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

.infoMain {
    clear:both;
    content: '';
    margin-bottom: 60px;
}

.infoMain .infoMainSection{
  height: auto; overflow: hidden; margin-bottom: 30px;
}
.trapezoid {
    position: absolute;
    bottom: 1px;
    left: 50%;
    transform: translateX(-50%);
    border-bottom: 30px solid #f0f0f0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    width: 62px;
    height: 0;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    color: #333;
    cursor: pointer;
}
.trapezoid:hover {
    color: #267bf7;
}
.trapezoid span,
.trapezoid i {
    font-size: 14px;
    font-weight: bold;
}
.trapezoid i {
    transform: rotate(90deg);
}

/* 血糖化验单样式 */
.sugerTestLine {
  width: 100%;
  height: 1px;
  background-color: #E0E0E0;
  position: absolute;
  top: 64px;
  left: 0;
}
.sugarTestPrintArea{
  width: 100%;
  height: 100%;
  border: 1px solid #CECECE;
}
.sugarTestPrintArea .sugerTestContent .hospital{
  color: #000;
  font-size: 18px;
  text-align: center;
  margin-top: 18px;
}
.sugarTestPrintArea .sugerTestContent .title{
  font-size: 22px;
  text-align: center;
  margin: 20px 0 40px;
  font-weight: 700;
  color: #000;
}
.sugarTestPrintArea .userInfo{
  margin-bottom: 10px;
}
.sugarTestPrintArea .userInfo div{
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.sugarTestPrintArea .userInfo p{
  float: left;
  text-align: left;
  color: #000;
}
.sugarTestPrintArea .userInfo p.item1,
.sugarTestPrintArea .userInfo p.item2
{
  width: 15%;
}
.sugarTestPrintArea .userInfo p.item3{
  width: 40%;
}
.sugarTestPrintArea .userInfo p.item4{
  width: 30%;
}
.sugarTestPrintArea .tableBox{
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.sugarTestPrintArea .tableBox table{
  width: 100%;
  border-collapse:collapse;
}
.sugarTestPrintArea .tableBox table th{
  border: 1px solid #999;
  height: 35px;
  font-weight: normal;
}
.sugarTestPrintArea .bottom{
  width: 100%;
  padding: 0 20px;
}
.sugarTestPrintArea .bottom .testInfo{
  margin-top: 10px;
  width: 100%;
}
.sugarTestPrintArea .bottom .testInfo p{
  min-width: 120px;
  padding-right: 48px;
  float: left;
  color: #000;
}
.sugarTestPrintArea .bottom .testInfo p.last{
  padding-right: 0;
}
.sugarTestPrintArea .bottom .statement {
  font-size: 14px;
  color: #999;
  margin-top: 5px;
  margin-bottom: 50px;
}
/* ------------------xwm----------------- */
.showReport .reportListBox ul{
  padding: 40px;
  width: 100%;
}
.showReport .reportListBox li{
  width: 11.11111%;
  height: 300px;
  margin-right: 20px;
  margin-bottom: 30px;
}
.showReport .reportListBox li img{
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
</style>
<style lang="less" scoped>
  @page {
    size: A4;
  }
  @media print {
    .printContent{
      .printConfig{
        margin-top: 10px;
        color: black;
        width: 100%;
        font-size: 16px;
        border-collapse: collapse;
        font-size: 14px;
        th {
          height: 30px;
          border: 1px solid #999;
          width: 2em;
          font-weight: normal;
        }
        td {
          border: 1px solid #999;
          text-align: center;
        }
      }
      p{
        text-align: center;
      }
      p.titleTop{
        font-size: 18px;
      }
      p.titleBottom{
        font-size: 24px;
        margin-top: 10px;
      }
      ul{
        font-size: 12px;
        margin-top: 30px;
        li{
          float: left;
          width: 25%;
        }
      }
    }
    // 打印单条血糖化验单打印样式
    .sugarTestPrintArea{
      display: block;
      height: 380px;
      width: 99.5%;
      position: absolute;
      top: 30px;
      left: 0;
      border: 1px solid #cecece;
      .userInfo p{
        display: inline-block;
        min-width: 30px;
      }
     .bottom .testInfo p{
        padding-right: 20px;
      }
    }
  }
  .main_Sec {
    height: auto;
    overflow: hidden;
    padding-bottom: 20px;
    .bloodSurg {
      .surgeStatistics {
        .surgerNumber {
          padding-top: 20px;
          font-size: 24px;
          a {
            margin-left: 20px;
            i {
              color: #f36868;
            }
            em {
              color: #edb344;
            }
          }
        }
      }
    }
  }
  .chartContent {
    height: auto;
    overflow: hidden;
    .chartLeft {
      width: 20%;
      float: left;
      .chartOne {
        height: 200px;
        margin-top: 56px;
        position: relative;
        dl {
          text-align: center;
          padding: 12px 0;
          display: block;
          height: 36px;
          width: 65px;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          margin: auto;
          font-size: 18px;
        }
      }
      .detail {
        text-align: center;
        width: 50%;
        margin: -20px auto 0;
        dl {
          float: left;
          width: 33.3%;
          dd {
            font-size: 12px;
            text-align: center;
          }
        }
        dl:nth-of-type(1) {
          dt {
            color: #f36868;
          }
        }
        dl:nth-of-type(2) {
          dt {
            color: #2ccca7;
          }
        }
        dl:nth-of-type(3) {
          dt {
            color: #edb344;
          }
        }
      }
    }
    .chartRight {
      float: left;
      width: 80%;
      position: relative;
      .unit {
        position: absolute;
        top: 22px;
        left: 6%;
        font-size: 12PX;
        color: #999;
      }
      .chartTwo {
        height: 300px;
      }
    }
  }
  .printSurgeData{
    height: auto;
    overflow: hidden;
    .surgeDataTime{
      height: auto;
      overflow: hidden;
    }
    .printContent{
      margin-top: 10px;
      border: 1px solid rgb(206,206,206);
      padding: 10px;
      height: 500px;
      overflow-y: scroll;
      p{
        text-align: center;
      }
      p.titleTop{
        font-size: 18px;
      }
      p.titleBottom{
        font-size: 24px;
        margin-top: 10px;
      }
      ul{
        height:auto;
        overflow: hidden;
        font-size: 12px;
        margin-top: 30px;
        li{
          float: left;
          width: 25%;
        }
      }
    }
  }
  .print{
    margin: 0 auto;
    display: block;
  }
  .printConfig{
    color: black;
    width: 100%;
    font-size: 16px;
    border-collapse: collapse;
    font-size: 14px;
    th {
      height: 30px;
      border: 1px solid #999;
      width: 2em;
      font-weight: normal;
    }
    td {
      border: 1px solid #999;
      text-align: center;
    }
  }
</style>
