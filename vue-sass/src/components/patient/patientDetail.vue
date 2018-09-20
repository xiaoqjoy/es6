<template>
  <div class="positionContent">
    <div class="allMain">
      <div>
        <router-link to="/patientManage" class="label-patient-manager">患者管理</router-link>
        <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
        <label class="label-add-patient">患者详情</label>
        <span class="btn-back" @click="returnPat">返回</span>
      </div>

      <div class="main_fir">
        <div class="mains contentBorder">
          <div class="PatientFile">患者档案
            <div style="float: right;">
              <!--<span class="setMes">发消息</span>-->
              <span class="m_edits" @click="editPatientInfo">编辑档案</span>
            </div>
          </div>
          <div class="topInfo">
            <!--
            <el-form label-position="top" label-width="110px">
              <el-row :gutter="20">
                <el-col :span="4">
                  <el-form-item>
                    <div class="usePic">
                      <div class="bgImg" :class="[patientInfo.sex=='女' ? 'womanHeadImg' : 'manHeadImg']"></div>
                      <p>{{patientInfo.patientName}}</p>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="糖尿病类型">
                    {{patientSugarVo.diabetesType }}
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="出生日期">
                    {{patientInfo.birthday}}
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item label="性别">
                    {{patientInfo.sex}}
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="并发症">
                    {{patientSugarVo.complications }}
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="治疗方式">
                    {{patientInfo.treatment}}
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            -->
            
            <el-form label-position="top" label-width="110px">
              <el-row :gutter="20">
                <el-col :span="4">
                  <el-form-item>
                    <div class="usePic">
                      <div class="bgImg" :class="[patientInfo.sex=='女' ? 'womanHeadImg' : 'manHeadImg']"></div>
                      <p>{{patientInfo.patientName}}</p>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="20">
                  <el-row :gutter="20">
                    <el-col :span="5">
                      <el-form-item label="糖尿病类型">
                        {{diabetesTypeName }}
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="出生日期">
                        {{patientInfo.birthday}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">
                      <el-form-item label="性别">
                        {{patientInfo.sex}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="并发症">
                        {{patientSugarVo.complications }}
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="治疗方式">
                        {{patientInfo.treatment}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="5">
                      <el-form-item label="建档时间">
                        {{createFileDate}}
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>

            </el-form>
          </div>
          <el-collapse-transition>
            <div class="infoMain" v-show="isShowInfo">

              <!--基本信息-->
              <div class="infoMainSection">
                <span class="Essinfor">基本信息</span>
                <el-form label-position="top" label-width="110px">
                  <el-row :gutter="20">
                    <el-col :span="4">
                      <el-form-item label="身份证号">
                        {{patientInfo.idCard }}
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="手机号：">
                        {{patientInfo.phone }}
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="职业" style="white-space: nowrap;">
                        {{patientInfo.job }}
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">
                      <el-form-item label="婚姻状态">
                        {{patientInfo.maritalStatus }}
                      </el-form-item>
                    </el-col>
                    <el-col :span="9">
                      <el-form-item label="家庭住址">
                        <span v-html="patientInfo.province+'&nbsp;&nbsp;&nbsp;'+patientInfo.city+'&nbsp;&nbsp;&nbsp;'+patientInfo.district+'&nbsp;&nbsp;&nbsp;'+patientInfo.address"></span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
              <!--病例信息-->
              <div class="healthInfors infoMainSection">
                <span class="Essinfor">病例信息</span>
                <el-form label-position="top" label-width="210px">
                  <el-row :gutter="20">
                    <el-col :span="4">
                      <el-form-item label="确诊日期">
                        {{patientSugarVo.ensureDate}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="身高">
                        {{patientInfo.height ? patientInfo.height+'cm' : ""}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="体重">
                        {{patientInfo.weight ? patientInfo.weight+'kg' : ""}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">
                      <el-form-item label="BMI指数">
                        {{patientInfo.bmi}}
                      </el-form-item>
                    </el-col>

                    <!--
                        <el-col :span="5">
                          <el-form-item label="最近一次血压(mmHg)">
                            {{patientInfo.systolicPressure}}
                            {{patientInfo.diastolicPressure ? patientInfo.diastolicPressure+'/' : '' }}
                          </el-form-item>
                        </el-col>
                        <el-col :span="4">
                          <el-form-item label="心率(p/min)">
                            {{patientInfo.heartRate }}
                          </el-form-item>
                        </el-col>
                        -->
                  </el-row>
                </el-form>
              </div>
              <!--生活习惯-->
              <div class="healthInfors infoMainSection">
                <span class="Essinfor">生活习惯</span>
                <el-form label-position="top" label-width="110px">
                  <el-row :gutter="24">
                    <el-col :span="4">
                      <el-form-item label="劳动强度">
                        {{patientInfo.labourIntensity}}
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="锻炼情况">
                        {{patientInfo.exerciseFrequency }}
                      </el-form-item>
                    </el-col>
                    <el-col :span="4">
                      <el-form-item label="夜间睡眠">
                        {{patientInfo.sleepStatus }}
                      </el-form-item>
                    </el-col>
                    <el-col :span="3">
                      <el-form-item label="平时情绪">
                        {{patientInfo.peacetimeEmotion }}
                      </el-form-item>
                    </el-col>
                    <el-col :span="9">
                      <el-form-item label="饮食偏好">
                        {{patientInfo.foodHabit }}
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="24">
                    <el-col :span="4">
                      <el-form-item label="饮酒情况(ml/d)">
                        {{patientInfo.drinkingStatusName }}
                        <span v-if="patientInfo.drinkingStatus!=1">&nbsp;&nbsp;&nbsp;{{patientInfo.drinkingType}}&nbsp;&nbsp;&nbsp;{{patientInfo.drinkingDaily}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="20">
                      <el-form-item label="抽烟情况">
                        {{patientInfo.smokingStatusName }}
                        <span v-if="patientInfo.smokingStatus == 2">&nbsp;&nbsp;&nbsp;{{patientInfo.smokingRemark}}</span>
                        <span v-else-if="patientInfo.smokingStatus == 3">&nbsp;&nbsp;&nbsp;{{patientInfo.smokingDaily}}根每天</span>
                      </el-form-item>
                    </el-col>
                  </el-row>

                </el-form>
              </div>
              <!--实验检测-->
              <!--
                  <div class="healthInfors infoMainSection">
                    <span class="Essinfor">实验检测</span>
                    <el-form label-position="top" label-width="240px" >
                      <el-row :gutter="20">
                        <el-col :span="6">
                          <el-form-item label="糖化血红蛋白（%）">
                            <span v-if="patientInfo.GlycatedHemoglobin" :class="patientInfo.GlycatedHemoglobin < 4 ? 'low' : patientInfo.GlycatedHemoglobin > 6 ? 'high' : 'normol'">
                              {{patientInfo.GlycatedHemoglobin}}&nbsp;&nbsp;&nbsp;
                            </span>
                            <span class="note">正常范围：4~6</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="空腹血糖（mmol/L）">
                            <span v-if="patientInfo.bloodSugar" :class="patientInfo.bloodSugar < 3.9 ? 'low' : patientInfo.bloodSugar > 6.1 ? 'high' : 'normol'">
                              {{patientInfo.bloodSugar}}&nbsp;&nbsp;&nbsp;
                            </span>
                            <span class="note">正常范围：3.9~6.1</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="葡萄糖耐受实验2h血糖（mmol/L）">
                            <span v-if="patientInfo.glucoseTest" :class="patientInfo.glucoseTest < 3.9 ? 'low' : patientInfo.glucoseTest > 7.8 ? 'high' : 'normol'">
                              {{patientInfo.glucoseTest}}&nbsp;&nbsp;&nbsp;
                            </span>
                            <span class="note">正常范围：3.9~7.8</span>
                          </el-form-item>
                        </el-col>
                      </el-row>

                    </el-form>
                  </div>
                  -->

              <!--健康综述-->
              <div class="healthInfors infoMainSection">
                <span class="Essinfor">健康综述</span>
                <el-form label-width="">
                  <el-form-item class="width100">
                    <p class="blic" style="margin-left: 0;">{{patientInfo.healthReview?patientInfo.healthReview:'无'}}</p>
                  </el-form-item>
                </el-form>
              </div>

              <!--备注-->
              <div class="healthInfors infoMainSection">
                <span class="Essinfor">备注</span>
                <el-form>
                  <el-form-item class="width100">
                    <p class="blic" style="margin-left: 0;">{{patientInfo.remark?patientInfo.remark:'无'}}</p>
                  </el-form-item>
                </el-form>
              </div>

            </div>
          </el-collapse-transition>
          <div class="trapezoid" @click="showPatientInfo"><span v-text="isShowInfo?'收起 ':'展开 '"></span><i :class="isShowInfo?'el-icon-d-arrow-left':'el-icon-d-arrow-right'"></i></div>
        </div>
      </div>
      <div class="main_Sec">
        <div class="topse">
          <ul>
            <li v-for="(it,index) in my_bloods" :class="{'actives':nowBlod==index}" @click="bloodSur(index)">{{it}}</li>
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
            <div class="surgerNumber">
              <a><span>最高值</span><i>&nbsp;{{judgeMapAll.maxSugar}}</i></a>
              <a><span>最低值</span><em>&nbsp;{{judgeMapAll.minSugar}}</em></a>
            </div>
            <div style="margin: 10px 20px">
              <surgeTable v-on:showDialog="showDialog" :sugerTestList="sugerTestList" :timeFrame="timeFrame"></surgeTable>
              <!--分页-->
              <div class="block">
                <el-pagination @size-change="handleSizeChangeSuger" @current-change="handleCurrentChangeSuger" :current-page="sugerCurrentPage" :page-sizes="[5, 10, 15]" :page-size="sugerPagesize" background layout="total, sizes, prev, pager, next, jumper" :total="pagesizeCurrent.totalNum">
                </el-pagination>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="main_Third">
        <div class="topse">
          <ul>
            <li v-for="(it,index) in my_arr" :class="{'actives':nowClick==index}" @click="bow(index)">{{it}}</li>
          </ul>
        </div>

        <!--健康干预表格-->
        <div style="padding: 20px;" v-if="nowClick==0">
          <span class="newAdd" @click="intermeddle()">新增干预</span>
          <el-table ref="multipleTable" :data="tableData1" tooltip-effect="dark">
            <el-table-column fixed label="操作时间" width="160" align="center">
              <template slot-scope="scope">{{formatDate(scope.row.updateTime)}}</template>
            </el-table-column>
            <el-table-column prop="name" label="方案名称" key="name_1" align="center">
            </el-table-column>
            <el-table-column prop="intervertType" label="类型" key="type_1" align="center">
            </el-table-column>
            <el-table-column prop="updateTime" label="执行时间" key="updateTime" :formatter="updaT_" width="160" align="center">
            </el-table-column>
            <el-table-column prop="operationUser" label="操作人" key="updateUserId_1" align="center">
            </el-table-column>
            <el-table-column label="干预内容" key="content_1" align="center">
              <template slot-scope="scope">
                <div class="remindContent">
                  {{scope.row.content}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="status" key="status_1" :formatter="status_" label="状态" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button @click="showInterventionDetail(scope.row)" type="text" size="small" :formatter="caoz">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="block">
            <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="currentPage1" :page-sizes="[5, 10, 15]" :page-size="pagesize1" background layout="total, sizes, prev, pager, next, jumper" :total="totalNum1">
            </el-pagination>
          </div>

        </div>

        <!--健康随访表格-->
        <div style="padding: 20px;" v-if="nowClick==1">
          <span class="newAdd" @click='newFollow'>新增随访</span>
          <el-table ref="multipleTable" :data="tableData2" tooltip-effect="dark">
            <el-table-column fixed label="随访时间" align="center">
              <template slot-scope="scope">{{ formatDate(scope.row.planTime) }}</template>
            </el-table-column>
            <el-table-column prop="planUserName" label="随访人员" key="name_2" align="center">
            </el-table-column>
            <el-table-column label="随访内容" key="content_2" align="center">
              <template slot-scope="scope">
                <div class="remindContent">
                  {{scope.row.content}}
                </div>
              </template>
            </el-table-column>
            <el-table-column key="result_2" label="随访结论" align="center">
              <template slot-scope="scope">
                <div class="remindContent">
                  {{scope.row.result}}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <!--<el-button @click="showFollowUpDetail(scope.row)" type="text" size="small">执行</el-button>-->
                <!--<el-button @click="showFollowUpDetail(scope.row)" type="text" size="small" v-if="status==2">执行</el-button>-->
                <el-button @click="showFollowUpDetail(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="block">
            <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="currentPage2" :page-sizes="[5, 10, 15]" :page-size="pagesize2" background layout="total, sizes, prev, pager, next, jumper" :total="totalNum2">
            </el-pagination>
          </div>

        </div>

        <!--健康提醒表格-->
        <div style="padding: 20px;" v-if="nowClick==2">
          <span class="newAdd" sty @click="newRemind">新增提醒</span>
          <el-table ref="multipleTable" :data="tableData3" tooltip-effect="dark">
            <el-table-column fixed label="推送时间" align="center">
              <template slot-scope="scope">{{ formatDate(scope.row.createTime) }}</template>
            </el-table-column>
            <el-table-column prop="remindUserName" key="createUserId_1" label="推送人员" align="center">
            </el-table-column>
            <el-table-column key="content_1" label="建议内容" align="center">
              <template slot-scope="scope">
                <div class="remindContent">
                	{{scope.row.content}}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-button @click="showRemindDetail(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <div class="block">
            <el-pagination @size-change="handleSizeChange3" @current-change="handleCurrentChange3" :current-page="currentPage3" :page-sizes="[5, 10, 15]" :page-size="pagesize3" background layout="total, sizes, prev, pager, next, jumper" :total="totalNum3">
            </el-pagination>
          </div>

        </div>

      </div>

      <!-- 报告展示 -->
      <div class="showReport">
        <div class="topse">
          <ul>
            <li class="actives">健康报告</li>
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

    <!-- 报告图片大图显示窗口 -->
    <div class="bigReportShow" v-show="bigImgShow">
      <div class="imgContainer">
        <img class="bigReportImg" :src="bigImgUrl" alt="">
      </div>
      <div class="closeReportShow tac" @click="hideBigImg">×</div>
      <div class="controlContainer tac">
        <span class="bgImg smallerSize" v-clicksmaller></span>
        <span class="scaleText">{{bigImgPercent}}%</span>
        <span class="bgImg bigerSize" v-clickbiger></span>
        <span class="bgImg clickRotate" v-clickrotate></span>
      </div>
    </div>

    <!--提醒明细-->
    <div class="RemiDetas" v-if="ifRemiDeta">
      <div class="RemiDeta">
        <h5>提醒明细</h5>
        <span class="close" @click="closes_t">X</span>
        <el-form :label-position="labelPos" ref="ruleForm" label-width="75px" class="demo-ruleForm">
          <el-form-item label="患者姓名:" prop="">
            {{patientInfo.patientName}}&nbsp;
          </el-form-item>
          <el-form-item label="性别:" prop="">
            {{patientInfo.sex}}&nbsp;
          </el-form-item>
          <el-form-item label="出生年月:" prop="">
            {{patientInfo.birthday}}&nbsp;
          </el-form-item>
          <el-form-item label="手机号:" prop="">
            {{patientInfo.phone}}&nbsp;
          </el-form-item>
          <el-form-item label="身高:" prop="">
            {{patientInfo.height ? patientInfo.height + 'cm' : ''}}&nbsp;
          </el-form-item>
          <el-form-item label="体重:" prop="">
            {{patientInfo.weight ? patientInfo.weight + 'kg' : ''}}&nbsp;
          </el-form-item>
          <el-form-item label="提醒内容:" prop="" class="width100">
            <p class="formDetail">{{remindCont}}&nbsp;</p>
          </el-form-item>
          <el-form-item style="text-align: right;width: 100%;">
            <el-button type="primary" @click="closes_t">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!--手动添加血糖-->
    <div v-if="dialogFormVisible">
      <el-dialog title="添加血糖" :visible.sync="dialogFormVisible" :append-to-body="true" width="600px" :close-on-click-modal="false" :before-close="handleClose">
        <el-form :model="surge" :rules="surgeRules" ref="surge" label-width="80px" onsubmit="return false;">
          <el-form-item label="血糖值" prop="price" class="addSuger">
            <el-input v-model.number="surge.price" auto-complete="off" class="inputWidthCommon" style="width: calc(100% - 70px)"></el-input>
            <span>&nbsp;mmol/L</span>
          </el-form-item>
          <el-form-item label="时段" prop="time" class="addSuger">
            <el-select v-model="surge.time" placeholder="请选择时段" class="inputWidthCommon">
              <el-option v-for="(i,index) in timeFrame" :key="index" :label="i.name" :value="i.timeType">
                {{i.name}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="测量时间" prop="value" class="addSuger">
            <el-date-picker v-model="surge.value" type="datetime" format="yyyy-MM-dd HH:mm" :picker-options="pickerOptions" placeholder="选择日期时间" style="width: 180px;">
            </el-date-picker>
          </el-form-item>
          <!--<el-form-item label="备注">-->
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
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="submitFormsSurge('surge')">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!--打印-->
    <div v-if="dialogSurgeVisible">
      <el-dialog title="血糖记录单" :visible.sync="dialogSurgeVisible" :append-to-body="true" :close-on-click-modal="false" width="900px" @close='closeDialog'>
        <div class="printSurgeData">
          <div class="surgeDataTime">
            <el-date-picker class="floatLeft" v-model="startSurgeTime" type="date" format="yyyy-MM-dd" size="small" :picker-options="pickerOptions2" placeholder="选择日期时间">
            </el-date-picker>
            <span class="floatLeft blank">至</span>
            <el-date-picker class="floatLeft" v-model="endSurgeTime" type="date" format="yyyy-MM-dd" :picker-options="pickerOptions1" size="small" placeholder="选择日期时间">
            </el-date-picker>
            <el-button size="small" class="floatLeft" style="margin-left: 20px" @click="sureTimeData">确定</el-button>
          </div>
          <div class="printContent printOrder-data" id="wrap">
            <p class="titleBottom" v-if="PrintSurgeData.length==0">暂无数据</p>
            <div v-for="b in Math.ceil(PrintSurgeData.length/43)">
              <p class="titleTop">{{orgName}}</p>
              <p class="titleBottom">血糖记录单</p>
              <ul>
                <li><label for="">姓名：</label><span>{{patientInfo.patientName}}</span></li>
                <li><label for="">年龄：</label><span>{{age!=='' ? age : ''}}</span></li>
                <li><label for="">科室：</label><span>{{orgName}}</span></li>
                <li><label for="">医生：</label><span>{{docName}}</span></li>
                <li><label for="">性别：</label><span>{{patientInfo.sex}}</span></li>
                <li><label for="">备注：</label><span></span></li>
              </ul>
              <div>
                <table class="printConfig">
                  <thead>
                    <tr>
                      <th style="width:20%;max-width:20%;min-width:20%;">日期</th>
                      <th style="width:20%; max-width:20%;min-width:20%;">时段</th>
                      <th style="width:20%; max-width:20%; min-width:20%;">测量结果</th>
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
    </div>

    <!-- 打印单个血糖化验单 -->
    <div v-if="dialogSugarTestVisible">
      <el-dialog title="血糖化验单" :visible.sync="dialogSugarTestVisible" :close-on-click-modal="false" :before-close="closeDialogSugarTest" width="900px">
        <div class="sugerTestLine"></div>
        <div class="sugarTestPrintArea" id="sugarTestPrintArea">
          <div class="sugerTestContent">
            <h3 class="hospital">{{orgName}}</h3>
            <div class="title">血糖化验单</div>
            <div class="userInfo">
              <div class="clearfix">
                <p class="item1"><span>姓名 : </span><span>{{patientInfo.patientName}}</span></p>
                <p class="item2"><span>年龄 : </span><span>{{age!=='' ? age : ''}}</span></p>
                <p class="item3"><span>科室 : </span><span>{{orgName}}</span></p>
                <p class="item4"><span>患者ID : </span><span>{{fileNumber}}</span></p>
              </div>
              <div class="clearfix">
                <p class="item1"><span>性别 : </span><span>{{patientInfo.sex}}</span></p>
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
                    <th>{{sugarType}}</th>
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
  </div>
</template>

<script>
  import surgeTable from '../common/myTable';
  import baseMixin from '../mixin/BaseMixin';
  import funBus from '../../assets/js/funBus';
  import eventBus from '../../assets/js/eventBus';
  require('../../assets/js/Print');

  export default {
    mixins: [baseMixin],
    name: 'patientDetail',
    data() {
      return {
        isSugerData: '', // 血糖数据
        isSugerScoped: '', // 参考范围
        sugarType: '', // 血糖状态
        inspectTime: '', // 送检时间
        sendTime: '', // 表时间
        isShowInfo: false, // 是否显示患者详细信息
        sugerPagesize: 15,
        sugerCurrentPage: 1,
        pagesizeCurrent: {},
        timeFrame: [], //时段
        pickerOptions: { // <=今天的日期
          disabledDate: (time) => {
            return time.getTime() > Date.now();
          }
        },
        pickerOptions0: { // >=今天的日期
          disabledDate: (time) => {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        pickerOptions2: {
          disabledDate: (time) => {
            var curDate = (new Date()).getTime();
            var three = 90 * 24 * 3600 * 1000;
            var threeMonths = curDate - three;
            if (this.endSurgeTime != "") {
              return time.getTime() > Date.now() || time.getTime() > this.endSurgeTime, time.getTime() > Date.now() || time.getTime() < threeMonths || time.getTime() > Date.now();
            } else {
              return time.getTime() > Date.now(), time.getTime() > Date.now() || time.getTime() < threeMonths || time.getTime() > Date.now();
            }
          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            var curDate = (new Date()).getTime();
            var three = 90 * 24 * 3600 * 1000;
            var threeMonths = curDate - three;
            return time.getTime() > Date.now() || time.getTime() < threeMonths || time.getTime() > Date.now(), time.getTime() < this.startSurgeTime || time.getTime() > Date.now();
          }
        },
        PrintSurgeData: [], //打印数据
        docName: '',
        orgName: '',
        sugerTestList: [],
        judgeMapAll: {},
        dialogSurgeVisible: false, //打印
        startSurgeTime: '',
        endSurgeTime: '',
        dialogFormVisible: false, // 弹窗
        surge: {
          price: '',
          time: '',
          value: '',
          remark: ''
        },
        surgeRules: {
          price: [{
              required: true,
              message: '请输入0.1-33.3数字区间的血糖值',
              trigger: 'change'
            },
            {
              type: 'number',
              min: 0.1,
              max: 33.3,
              message: '请输入0.1-33.3数字区间的血糖值',
              trigger: 'change'
            },
            {
              pattern: /^(?:0|[1-9]\d{0,2})(\.\d)?$/,
              message: '请输入0.1-33.3数字区间的血糖值',
              trigger: 'change'
            },
          ],
          time: [{
            required: true,
            message: '请选择时段',
            trigger: 'change'
          }, ],
          value: [{
            required: true,
            message: '请选择测量时间',
            trigger: 'change'
          }, ],
        },
        params: { //图表
          name: '',
          data: {
            dataList: ''
          },
          style: {},
          list: [],
          className: 'limosisBar',
          random: 0
        },
        lineChart: {
          name: '',
          data: {
            dataList: []
          },
          style: {},
          list: [],
          className: 'limosisLine',
          random: 0
        },
        beforeBar: {
          name: '',
          data: {
            dataList: {}
          },
          style: {},
          list: [],
          className: 'beforeBar',
          random: 0
        },
        beforeLine: {
          name: '',
          data: {
            dataList: []
          },
          style: {},
          list: [],
          className: 'beforeLine',
          random: 0
        },
        afterBar: {
          name: '',
          data: {
            dataList: {}
          },
          style: {},
          list: [],
          className: 'afterBar',
          random: 0
        },
        afterLine: {
          name: '',
          data: {
            dataList: []
          },
          style: {},
          list: [],
          className: 'afterLine',
          random: 0
        },
        dateType: 1,
        remindCont: "",
        inputValue: "",
        inputVisible: '',
        newAdds: "",
        radio_: "",
        copy_radio_: '',
        FollowUpData: {},
        ifRemiDeta: false,
        labelPos: "left",
        checkedss: false,
        radio4: 1,
        ifHealthInter: false,
        customerId: "", // 患者id
        m_userCusId: "",
        fileNumber: "", //档案号
        createFileDate: '', //建档时间
        diabetesTypeName: '', //糖尿病类型名称
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
        chart: null, // 初始化空对象
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
        patientInfo: {}, //患者信息
        patientSugarVo: {},
        age: '',
        dialogSugarTestVisible: false, // 打印血糖化验单
        reportImgList: [], // 报告图片列表
        isShowSugarWarningBtn: true, // 设置是否显示血糖预警按钮
        bigImgShow: false, //是否大图片显示报告
        bigImgUrl: '', // 报告图片路径
        bigImgPercent: 100, // 控制大图百分比
        bigImgRotate: 90, // 控制大图旋转角度
        complicationsArr: [], //并发症
        diabetesTypeArr: [], //糖尿病类型
        jobArr: [], //职业
        labourIntensityArr: [], //劳动强度
        smokingStatusArr: [], //吸烟情况
        peacetimeEmotionArr: [], //平时情绪
        drinkingStatusArr: [], //饮酒情况
        drinkingTypeArr: [], //饮酒类型
        exerciseFrequencyArr: [], //运动 锻炼情况
        sleepStatusArr: [], //睡眠
        foodHabitArr: [], //饮食偏好
        maritalStatusArr: [], //婚姻情况
      }
    },
    methods: {
      //健康干预
      healthRe(currentPage, pagesize) {
        this.$api.pagedQuery({
          currentPage: currentPage,
          pageSize: pagesize,
          createUserId: 1,
          customerId: this.customerId
        }, res => {
          if (res.status == 200) {
            if (res.data.code == 0) {
              this.tableData1 = res.data.data.items;
              this.totalNum1 = res.data.data.totalNum;
            }
          }
        }, res => {
          this.$message(res.data.errMsg || res.data.data);
        })
      },
      //健康随访
      healthFol(currentpage, pageSize) {
        this.$api.followPaged({
          currentPage: currentpage,
          pageSize: pageSize,
          customerId: this.customerId
        }, res => {
          if (res.status == 200) {
            if (res.data.code == 0) {
              this.tableData2 = res.data.data.items;
              this.totalNum2 = res.data.data.totalNum;
            }
          }
        }, res => {
          this.$message(res.data.errMsg || res.data.data);
        })
      },
      //健康提醒
      healthRem(currentpage, pageSize) {
        this.$api.remindPaged({
          currentPage: currentpage,
          pageSize: pageSize,
          customerId: this.customerId
        }, res => {
          if (res.status == 200) {
            if (res.data.code == 0) {
              this.tableData3 = res.data.data.items;
              this.totalNum3 = res.data.data.totalNum;
            }
          }
        }, res => {
          this.$message(res.data.errMsg || res.data.data);
        })
      },
      //展开/收起患者详情
      showPatientInfo() {
        this.isShowInfo = !this.isShowInfo;
      },
      returnPat() {
        //this.$router.push("/patientManage");
        this.$router.go(-1);
      },
      //时段
      timeAare() {
        this.$api.querySugarDictionaryList({}, res => {
          if (res.data.data) {
            this.timeFrame = res.data.data
          }
        })
      },
      //关闭血糖添加弹窗
      handleClose() {
        this.$refs['surge'].resetFields();
        this.dialogFormVisible = false;
      },
      // 提交手动添加血糖
      submitFormsSurge(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let user = JSON.parse(sessionStorage.getItem('user'));
            this.openLoading();
            let data = {
              sugar: this.surge.price,
              customerId: this.customerId,
              organId: user.organizationId,
              organSysCode: user.organSysCode,
              timeType: this.surge.time,
              createTime: this.surge.value,
              remark: this.surge.remark
            }
            this.$api.addSugarTest(data, res => {
              if (res.data.code == 0) {
                this.dialogFormVisible = false;
                this.$refs[formName].resetFields();
                this.$message('新增成功');
                this.allChartList();
                this.surgeTable();
              } else {
                this.$message(res.data.errMsg || res.data.data);
              }
              this.closeLoading();
            }, res => {
              this.$message(res.data.errMsg);
              this.closeLoading();
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });

      },
      //手动添加血糖
      addSurgeData() {
        this.surge = {}
        this.dialogFormVisible = true
      },
      //数据
      printData() {
        let user = JSON.parse(sessionStorage.getItem('user'))
        this.docName = user.nickname;
        this.orgName = user.departmentName;
        this.dialogSurgeVisible = true;
        this.startSurgeTime = (new Date()).getTime() - 30 * 24 * 3600 * 1000;
        this.endSurgeTime = new Date();
        this.unifyPrintData()
      },
      sureTimeData() {
        this.PrintSurgeData = [];
        this.unifyPrintData()
      },
      closeDialog() {
        this.PrintSurgeData = []
      },
      //打印列表数据封装
      unifyPrintData() {
        if (!this.startSurgeTime) {
          this.$message('输入开始时间不能为空')
        } else if (!this.endSurgeTime) {
          this.$message('输入结束时间不能为空')
        } else {
          var data = {
            customerId: this.customerId,
            createStartTime: this.formatDate(this.startSurgeTime).split(' ')[0],
            createEndTime: this.formatDate(this.endSurgeTime).split(' ')[0]
          };
          this.$api.countCustomerSugerInfoPrint(data, res => {
            if (!!res.data.data) {
              this.PrintSurgeData = res.data.data;
              for (var j = 0; j < this.PrintSurgeData.length; j++) {
                //this.PrintSurgeData[j].createTime = (res.data.data[j].createTime).split(' ')[0].replace(/-/g ,"/");

                //this.PrintSurgeData[j].createTime=(res.data.data[j].createTime).split(' ')[0].replace(/-/g,"-");
                this.PrintSurgeData[j].createTime = res.data.data[j].createTime.split(' ')[0]
              }
              if (this.PrintSurgeData.length < Math.ceil(this.PrintSurgeData.length / 43) * 43) {
                let all = Math.ceil(this.PrintSurgeData.length / 43) * 43 - this.PrintSurgeData.length
                for (var i = 0; i < all; i++) {
                  this.PrintSurgeData.push({
                    "createTime": '',
                    "name": '',
                    "sugar": ''
                  })
                }
              }
            }
            setTimeout(() => {
              if (this.PrintSurgeData) {
                this.tabelDataClean()
              }
            }, 500);
          })
        }
      },
      //打印
      PrintSure() {
        Print('#wrap')
      },
      //打印单个血糖化验单
      printSugerTest() {
        Print('#sugarTestPrintArea')
      },
      //新增提醒
      newRemind() {
        let target = this.$parent.$refs.remindDialog;
        target.ifnewRemind = true;
        target.customerId = this.customerId;
        funBus.dynamic(target); //快捷回复
        funBus.getPatients(target, this.customerId); // 获取患者信息
      },
      //新增干预
      intermeddle() {
        let target = this.$parent.$refs.interventionDialog;
        target.ifHealthInter = true;
        target.customerId = this.customerId;
        funBus.getPatients(target, this.customerId); // 获取患者信息
      },
      //新增随访
      newFollow() {
        let target = this.$parent.$refs.followUpDialog;
        target.ifFolPlan = true;
        target.customerId = this.customerId;
        target.geFollowplaners(); //获取随访计划人员
        target.getFollowTemplate({});
        target.diabetesTypeArr = this.diabetesTypeArr; //糖尿病类型列表
        target.$nextTick(function () {
          funBus.getPatients(target, this.customerId); // 获取患者信息
        })
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
      // 查看干预
      showInterventionDetail(row) {
        let target = this.$parent.$refs.interventionDetailDialog;
        target.ifViewInter = true;
        target.interventionId = row.interventionId;
        target.getInterventionDetail(row.interventionId);
        funBus.getPatients(target, row.customerId); //患者信息
      },
      //查看随访明细
      showFollowUpDetail(row) {
        let target = this.$parent.$refs.followUpDetailDialog;
        target.ifFolDetail = true;
        funBus.getPatients(target, row.customerId); // 获取患者信息
        funBus.queryFollowInfoById(target, row.followUpId); // 获取随访信息
      },
      //查看提醒内容
      showRemindDetail(row) {
        this.ifRemiDeta = true;
        this.remindCont = row.content;
      },
      //关闭提醒明细弹窗
      closes_t() {
        this.ifRemiDeta = false;
        this.remindCont = '';
      },      
      editPatientInfo() { // 跳转到患者信息编辑页面
        var vm = this;
        vm.$router.push({
          path: '/patientManage/edit',
          query: {
            cusTomId: vm.customerId,
            userCusId: vm.m_userCusId,
            fileNumber: vm.fileNumber,
            patientSugId: vm.patientSugarVo.patientSugarId,
            patientId: vm.patientSugarVo.patientId
          }
        })
      },
      timeChoses(index) {
        this.MyTimeChose = index;
        this.dateType = index + 1
        this.allChartList()
        this.surgeTable()
      },
      handleSizeChange1(val) {
        this.pagesize1 = val;
        this.healthRe(this.currentPage1, this.pagesize1);
      },
      handleSizeChange2(val) {
        this.pagesize2 = val;
        this.healthFol(this.currentPage2, this.pagesize2);
      },
      handleSizeChange3(val) {
        this.pagesize3 = val;
        this.healthRem(this.currentPage3, this.pagesize3);
      },
      handleSizeChangeSuger(val) {
        this.sugerPagesize = val;
        this.surgeTable()
      },
      handleCurrentChange1(val) { // 干预页码跳转
        this.currentPage1 = val;
        this.healthRe(this.currentPage1, this.pagesize1);
      },
      handleCurrentChange2(val) { // 随访页码跳转
        this.currentPage2 = val;
        this.healthFol(this.currentPage2, this.pagesize2);
      },
      handleCurrentChange3(val) { // 提醒页码跳转
        this.currentPage3 = val;
        this.healthRem(this.currentPage3, this.pagesize3);
      },
      handleCurrentChangeSuger(val) { //血糖测量数据统计表页码跳转
        this.sugerCurrentPage = val;
        this.surgeTable()
      },
      bow(index) { // 健康干预(/健康随访/健康提醒)tab切换事件
        var that = this;
        this.nowClick = index;
        if (index == 0) {
          this.healthRe(this.currentPage1, this.pagesize1);
        }
        if (index == 1) {
          this.healthFol(this.currentPage2, this.pagesize2);
        }
        if (index == 2) {
          this.healthRem(this.currentPage3, this.pagesize3);
        }
      },
      bloodSur(index) {
        this.nowBlod = index;
      },
      //  饼图趋势图接口数据
      allChartList() {
        var data = {
          customerId: this.customerId,
          dateType: this.dateType
        };
        this.$api.countCustomerSugerInfo(data, res => {
          this.params.data.dataList = res.data.data.judgeMapEmptyStomach;
          this.lineChart.data.dataList = res.data.data.sugarTestListEmptyStomach;
          this.beforeBar.data.dataList = res.data.data.judgeMapEmptyEatBefore;
          this.beforeLine.data.dataList = res.data.data.sugarTestListEatBefore;
          this.afterBar.data.dataList = res.data.data.judgeMapEmptyEatAfter;
          this.afterLine.data.dataList = res.data.data.sugarTestListEatAfter;
        }, res => {
          this.$message(res.data.errMsg || res.data.data);
        })
      },
      //  血糖表格
      surgeTable() {
        var data = {
          customerId: this.customerId,
          dateType: this.dateType,
          currentPage: this.sugerCurrentPage,
          pageSize: this.sugerPagesize
        }
        this.$api.countCustomerSugerTableInfo(data, res => {
          let datas = res.data.data;
          this.intervalValue = res.data.data;
          this.pagesizeCurrent = datas.pageBean;
          this.sugerTestList = datas.pageBean.items;
          this.judgeMapAll = datas.judgeMapAll ? datas.judgeMapAll : [];
        })
      },
      tabelDataClean() {
        var tab = document.querySelectorAll(".printConfig");
        for (let a = 0; a < tab.length; a++) {
          var maxCol = 1,
            val, count, start;
          for (var col = maxCol - 1; col >= 0; col--) {
            count = 1;
            val = "";
            for (var i = 0; i < tab[a].rows.length; i++) {
              if (val == tab[a].rows[i].cells[col].innerHTML) {
                count++;
              } else {
                if (count > 1) { //合并
                  start = i - count;
                  tab[a].rows[start].cells[col].rowSpan = count;
                  for (var j = start + 1; j < i; j++) {
                    tab[a].rows[j].cells[col].style.display = "none";
                  }
                  count = 1;
                }
                val = tab[a].rows[i].cells[col].innerHTML;
              }
            }
            if (count > 1) { //合并，最后几行相同的情况下
              start = i - count;
              tab[a].rows[start].cells[col].rowSpan = count;
              for (var j = start + 1; j < i; j++) {
                tab[a].rows[j].cells[col].style.display = "none";
              }
            }
          }
        }
      },
      // 打印血糖化验单逻辑
      closeDialogSugarTest() {
        this.dialogSugarTestVisible = false;
      },
      // 图片报告
      showBigReport(item) {
        this.bigImgShow = true;
        this.bigImgUrl = item.reportUrl;
      },
      showDialog(a, b, c, d) {
        this.dialogSugarTestVisible = true;
        this.isSugerData = a
        this.isSugerScoped = b + '~' + c
        this.inspectTime = d
        let today = this.formatDate(Date.parse(new Date()))
        let startTime = today.split(' ')[0]
        this.sendTime = startTime
        this.sugarType = a * 1 < b * 1 ? "↓" : (a * 1 > c * 1 ? "↑" : '');
      },
      // 患者个人血糖设置
      patientSugarWarningSet() {
        let _this = this;
        let customerId = this.customerId;
        let target = _this.$parent.$parent.$children[0].$refs.sugarWarningSetDialog;
        this.$api.getSugarWarningSet({
          scope: customerId
        }, res => {
          let dataList = res.data.data;
          // 定义目标弹窗
          if (dataList.length > 0) {
            dataList.forEach(item => {
              target.createUserId = item.createUserId;
              if (item.type == '1') {
                // 根据判断是弹窗数据还是短信数据设置预警弹窗初始值以及开关状态
                target.inputValueList[0] = item.minValue;
                target.inputValueList[1] = item.maxValue;
                target.switchDialog = item.status == '1' ? true : false;
                target.dialogInputDisable = item.status == '1' ? false : true;
                target.idDialog = item.id;
              } else if (item.type == '2') {
                target.inputValueList[2] = item.minValue;
                target.inputValueList[3] = item.maxValue;
                target.switchShortMessage = item.status == '1' ? true : false;
                target.dialogshortMessageDisable = item.status == '1' ? false : true;
                target.idShortMessage = item.id;
              }
            });
          } else {
            console.log('默认');
            target.init();
          }
          _this.$parent.$parent.$children[0].showSugarWarningSet();
          target.scopeId = customerId; // 将患者id传递给弹窗
        })
      },
      // 获取患者信息
      initPatient(cusTomId, userCusId) {
        let that = this;

        that.customerId = cusTomId || that.$route.query.cusTomId;
        that.m_userCusId = userCusId || that.$route.query.userCusId;

        that.allChartList()
        that.surgeTable()
        that.timeAare()
        let user = JSON.parse(sessionStorage.getItem('user'));
        if (user.roleType == 3) { //管理员
          this.isShowSugarWarningBtn = false; //是否显示设置血糖预警按钮
        }
        that.docName = user.nickname;
        that.orgName = user.departmentName;

        that.healthRe(that.currentPage1, that.pagesize1);

        let data = {
          customerId: that.customerId
        }

        that.$api.getPatientInfo(data, res => {

          if (res.status == 200) {

            that.fileNumber = res.data.data.fileNumber;
            let createFileDate = res.data.data.createFileDate; //建档时间
            that.createFileDate = createFileDate ? that.formatDate(createFileDate).slice(0, 16) : '无';
            
            that.patientInfo = res.data.data.patientBaseVo;
            that.patientSugarVo = res.data.data.patientSugarVo;

            if (that.patientSugarVo) {
              
              that.patientInfo.birthday = that.patientInfo.birthday ? that.formatDate(that.patientInfo.birthday).replace(/\s[\x00-\xff]*/g, '') : ''; //时间戳转出生年月
              let sex = that.patientInfo.sex;
              that.patientInfo.sex = sex == 1 ? '男' : sex == 2 ? '女' : '未知';
              that.age = that.jsGetAge(that.patientInfo.birthday);
              
              //确诊日期
              that.patientSugarVo.ensureDate = !!that.patientSugarVo.ensureDate ? that.jsGetAge(that.formatDate(that.patientSugarVo.ensureDate)) : '';
              
              //并发症
              let complicationsRemark = that.patientSugarVo.complicationsRemark !== null ? that.patientSugarVo.complicationsRemark : '';
              let complications = that.patientSugarVo.complications;
              let complicaTemp = complications !== null && complications !== '' ? complications.split(",") : []; //并发症
              complicaTemp = complicaTemp.map(Number); //string数组转int数组
              if (complicaTemp.length > 0) {
                if (complicaTemp.length == 1 && complicaTemp[0] == 0) { //并发症仅选中了其他项
                  that.patientSugarVo.complications = complicationsRemark ? complicationsRemark : '无';
                } else{
                  let temp = [];
                  let isNotComplica = false;
                  for (let i = 0, len = complicaTemp.length; i < len; i++) {
                    if (complicaTemp[i] == 1) { //无并发症
                      isNotComplica = true;
                      that.isOtherCompli = false;
                      break;
                    } else if (complicaTemp[i] == 0) { //其他并发症
                      if(complicationsRemark) {
                        temp.push(complicationsRemark);
                      }
                      that.isOtherCompli = true;
                    } else {
                      let arr = that.complicationsArr;
                      for (let j = 0, le = arr.length; j < le; j++) {
                        if (complicaTemp[i] == 0) {
                          continue;
                        }else if (complicaTemp[i] == arr[j].itemKey) {
                          temp.push(arr[j].itemValue);
                          break;
                        }
                      }
                    }
                  }
                  that.patientSugarVo.complications = isNotComplica ? '无' : temp.join(',');
                }
              } else {
                that.patientSugarVo.complications = '无';
              }
              
              //糖尿病类型
              let diabetesType = that.patientSugarVo.diabetesType;
              if (diabetesType != null) {
                let arr = that.diabetesTypeArr;
                for (let j = 0, le = arr.length; j < le; j++) {
                  if (diabetesType == arr[j].itemKey) {
                    //that.patientSugarVo.diabetesType = arr[j].itemValue;
                    that.diabetesTypeName = arr[j].itemValue;
                    break;
                  }
                }
              }
              
            }
            
            if (that.patientInfo) {
              
              //治疗方式
              let treatment = that.patientSugarVo.treatmentTypeStr;
              that.patientInfo.treatment = treatment != '' && treatment != null ? treatment : '无';              
              
              //饮酒情况
              if (that.patientInfo.drinkingStatus) {
                let drinkingStatus = that.patientInfo.drinkingStatus;
                let arr = that.drinkingStatusArr;
                for (let j = 0, le = arr.length; j < le; j++) {
                  if (drinkingStatus == arr[j].itemKey) {
                    that.patientInfo.drinkingStatusName = arr[j].itemValue;
                    break;
                  }
                }
              }
              
              //饮酒类型
              if (that.patientInfo.drinkingType) {
                let drinkingType = that.patientInfo.drinkingType;
                let arr = that.drinkingTypeArr;
                for (let j = 0, le = arr.length; j < le; j++) {
                  if (drinkingType == arr[j].itemKey) {
                    that.patientInfo.drinkingType = arr[j].itemValue;
                    break;
                  }
                }
              }

              //婚姻情况
              if (that.patientInfo.maritalStatus) {
                let maritalStatus = that.patientInfo.maritalStatus;
                let arr = that.maritalStatusArr;
                for (let j = 0, le = arr.length; j < le; j++) {
                  if (maritalStatus == arr[j].itemKey) {
                    that.patientInfo.maritalStatus = arr[j].itemValue;
                    break;
                  }
                }
              }
              
              //职业
              if (that.patientInfo.job) {
                let job = that.patientInfo.job;
                let arr = that.jobArr;
                for (let j = 0, le = arr.length; j < le; j++) {
                  if (job == arr[j].itemKey) {
                    that.patientInfo.job = arr[j].itemValue;
                    break;
                  }
                }
              }
              
              //劳动强度
              if (that.patientInfo.labourIntensity) {
                let labourIntensity = that.patientInfo.labourIntensity;
                let arr = that.labourIntensityArr;
                for (let j = 0, le = arr.length; j < le; j++) {
                  if (labourIntensity == arr[j].itemKey) {
                    that.patientInfo.labourIntensity = arr[j].itemValue;
                    break;
                  }
                }
              }
              
              //吸烟情况
              if (that.patientInfo.smokingStatus) {
                let smokingStatus = that.patientInfo.smokingStatus;
                let arr = that.smokingStatusArr;
                for (let j = 0, le = arr.length; j < le; j++) {
                  if (smokingStatus == arr[j].itemKey) {
                    that.patientInfo.smokingStatusName = arr[j].itemValue;
                    break;
                  }
                }
              }
              
              //锻炼情况
              if (that.patientInfo.exerciseFrequency) {
                let exerciseFrequency = that.patientInfo.exerciseFrequency;
                let arr = that.exerciseFrequencyArr;
                for (let j = 0, le = arr.length; j < le; j++) {
                  if (exerciseFrequency == arr[j].itemKey) {
                    that.patientInfo.exerciseFrequency = arr[j].itemValue;
                    break;
                  }
                }
              }
              
              //睡眠情况
              if (that.patientInfo.sleepStatus) {
                let sleepStatus = that.patientInfo.sleepStatus;
                let arr = that.sleepStatusArr;
                for (let j = 0, le = arr.length; j < le; j++) {
                  if (sleepStatus == arr[j].itemKey) {
                    that.patientInfo.sleepStatus = arr[j].itemValue;
                    break;
                  }
                }
              }
              
              //平时情绪
              if (that.patientInfo.peacetimeEmotion) {
                let peacetimeEmotion = that.patientInfo.peacetimeEmotion;
                let arr = that.peacetimeEmotionArr;
                for (let j = 0, le = arr.length; j < le; j++) {
                  if (peacetimeEmotion == arr[j].itemKey) {
                    that.patientInfo.peacetimeEmotion = arr[j].itemValue;
                    break;
                  }
                }
              }
              
              //饮食情况
              if (that.patientInfo.foodHabit) {
                let foodHabits = that.patientInfo.foodHabit.split(",");
                let arr = that.foodHabitArr;
                let newArr = [];
                for (let j = 0, le = arr.length; j < le; j++) {
                  
                  for (let i = 0 , leng = foodHabits.length; i < leng; i++) {
                    if (foodHabits[i] == arr[j].itemKey) {
                      newArr.push(arr[j].itemValue);
                      break;
                    }
                  }
                }
                that.patientInfo.foodHabit = newArr.join('、');
              }
              
              // 报告图片列表
              that.reportImgList = res.data.data.listReport ? res.data.data.listReport : [];

            }
          }
        }, res => {
          this.$message(res.data.errMsg || res.data.data);
        })
      },
      // 隐藏大图片报告
      hideBigImg() {
        this.bigImgShow = false;
        this.bigImgPercent = 100;
        this.bigImgRotate = 90;
        let bigImg = document.getElementsByClassName('bigReportImg')[0];
        bigImg.style.transform = 'scale(1, 1)';
      }
    },
    created() {

      funBus.initLoadDictionaryItem(this); //初始化加载字典项目

      this.initPatient();

      //监听updatePatientDetailInterventionTable，更新干预表数据
      eventBus.$on('updatePatientDetailInterventionTable', () => {
        this.healthRe(this.currentPage1, this.pagesize1)
      });

      //监听updateFollowUpTable，更新随访表数据
      eventBus.$on('updateFollowUpTable', () => {
        this.healthFol(this.currentPage2, this.pagesize2)
      });

      //监听updatePatientDetailRemindTable，更新提醒表数据
      eventBus.$on('updatePatientDetailRemindTable', () => {
        this.healthRem(this.currentPage3, this.pagesize3)
      });
    },
    components: {
      surgeTable,
    },
    // 组件复用，仅路由参数变更时
    beforeRouteUpdate(to, from, next) {
      this.initPatient(to.query.cusTomId, to.query.userCusId);
      next();
    },
    //watch: {
    //  '$route' (to, from) {
    //    if(to.path.indexOf('patientDetail') > -1){
    //      // 对路由变化作出响应...
    //      this.$children[0].$parent.initPatient();
    //    }
    //  }
    //},
    directives: {
      clickrotate: {
        bind(el, binding, vnode, oldvnode) {
          el.addEventListener('click', () => {
            let sum = vnode.context.bigImgRotate / 90 - 1;
            sum++;
            let bigImg = document.getElementsByClassName('bigReportImg')[0];
            let styleStr = bigImg.style.transform;
            if (!!styleStr && styleStr.indexOf('rotate') !== -1) {
              // 如果有了rotate属性 , 分割字符串再组装
              let tempArr = styleStr.split('rotate');
              let str = '(' + 90 * sum + 'deg)';
              let newStr = tempArr[0] + 'rotate' + tempArr[1].replace(/^\(.*\)$/, str);
              bigImg.style.transform = newStr;
            } else {
              bigImg.style.transform = styleStr + 'rotate(' + 90 * sum + 'deg)';
            }
            vnode.context.bigImgRotate = (sum + 1) * 90;
          })
        }
      },
      clickbiger: {
        bind(el, binding, vnode, oldvnode) {
          el.addEventListener('click', () => {
            let bigImg = document.getElementsByClassName('bigReportImg')[0];
            let sum = vnode.context.bigImgPercent / 100;
            let styleStr = bigImg.style.transform;
            if (sum < 2) {
              sum += 0.5;
              if (!!styleStr && styleStr.indexOf('scale') !== -1) {
                let tempArr = styleStr.split('scale');
                let str = '(' + 1 * sum + ',' + 1 * sum + ')';
                let newStr;
                if (tempArr[1].indexOf('rotate') !== -1) {
                  // 如果有rotate和scale属性分割两次再组装
                  let tempArr2 = tempArr[1].split('rotate');
                  newStr = tempArr[0] + 'scale' + tempArr2[0].trim().replace(/^\(.*\)$/, str) + 'rotate' + tempArr2[1];
                } else {
                  newStr = tempArr[0] + 'scale' + tempArr[1].replace(/^\(.*\)$/, str);
                }
                bigImg.style.transform = newStr;
              } else {
                bigImg.style.transform = styleStr + 'scale(' + 1 * sum + ',' + 1 * sum + ')';
              }
              vnode.context.bigImgPercent = 100 * sum;
            }
          })
        }
      },
      clicksmaller: {
        bind(el, binding, vnode, oldvnode) {
          el.addEventListener('click', () => {
            let bigImg = document.getElementsByClassName('bigReportImg')[0];
            let sum = vnode.context.bigImgPercent / 100;
            let styleStr = bigImg.style.transform;
            if (sum > 1) {
              sum -= 0.5;
              if (!!styleStr && styleStr.indexOf('scale') !== -1) {
                let tempArr = styleStr.split('scale');
                let str = '(' + 1 * sum + ',' + 1 * sum + ')';
                let newStr;
                if (tempArr[1].indexOf('rotate') !== -1) {
                  // 如果有rotate和scale属性分割两次再组装
                  let tempArr2 = tempArr[1].split('rotate');
                  newStr = tempArr[0] + 'scale' + tempArr2[0].trim().replace(/^\(.*\)$/, str) + 'rotate' + tempArr2[1];
                } else {
                  newStr = tempArr[0] + 'scale' + tempArr[1].replace(/^\(.*\)$/, str);
                }
                bigImg.style.transform = newStr;
              } else {
                bigImg.style.transform = styleStr + 'scale(' + 1 * sum + ',' + 1 * sum + ')';
              }
              vnode.context.bigImgPercent = 100 * sum;
            }
            // if (sum > 1) {
            //     sum -=0.5 ;
            //     vnode.context.bigImgPercent = 100 * sum;
            //     bigImg.style.transform = 'scale('+1*sum+','+1*sum+')';
            // }
          })
        }
      }
    }

  }
</script>

<style>
  .main_fir .el-form-item .el-form-item__label {
    line-height: 30px!important;
    padding: 0;
  }
  .main_fir .el-form-item .el-form-item__content {
    line-height: 20px;
    font-weight: bold;
    white-space: normal;
    word-break: break-all;
  }
</style>
<style scoped>
  .demo-ruleForm{
    padding-top: 20px;
    border-top: 1px solid #e0e0e0;
    margin-top: 17px;
  }
  .addSuger{
    width: 48%;
    display: inline-block;
  }
  .blank{
    margin: 0 10px;
  }
  .main_fir .el-form {
    padding: 20px 0 0 10px;
    width: 100%;
  }
  .usePic {
    width: 80px;
    height: 120px;
  }
  .usePic img {
    width: 80px;
    height: 80px;
  }
  .usePic p {
    margin-top: 10px;
    text-align: center;
  }
  .healthInfors .note {
    color: #999;
    font-weight: normal;
  }
  .healthInfors .normol {
    color: #00c2b1;
  }
  .healthInfors .high {
    color: #e95959;
  }
  .healthInfors .low {
    color: #e98559;
  }
  .main_fir,
  .main_Sec,
  .main_Third,
  .showReport {
    margin-bottom: 20px;
    background: white;
    width: 100%;
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
  .PatientFile {
    height: 45px;
    border-bottom: 1px solid #eff2f5;
  }
  .setMes {
    margin-right: 15px;
  }
  .setMes,
  .m_edits {
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
  .blic {
    display: block;
    margin-left: 110px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-weight: normal;
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
    padding: 0 15px;
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
  .el-table {
    border: 1px solid #eff2f5;
    border-bottom: none;
  }
  .bloodSurg ul {
    display: inline-block;
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
  .m_left,
  .m_right {
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
  .RemiDetas {
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
  .RemiDeta {
    width: 640px;
    padding: 17px;
    position: fixed;
    width: 840px;
    background-color: #ffffff;
    border-radius: 8px;
  }
  .RemiDeta h5 {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #111111;
  }
  .RemiDeta .el-form-item {
    margin-bottom: 0;
  }
  .RemiDeta .el-form .el-form-item {
    min-width: 200px;
    display: inline-block;
  }
  .infoMain {
    clear: both;
    content: '';
    margin-bottom: 60px;
    margin-top: 30px;
  }
  .infoMain .infoMainSection {
    height: auto;
    overflow: hidden;
    margin-bottom: 30px;
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
  .sugarTestPrintArea {
    width: 100%;
    height: 100%;
    border: 1px solid #CECECE;
  }
  .sugarTestPrintArea .sugerTestContent .hospital {
    color: #000;
    font-size: 18px;
    text-align: center;
    margin-top: 18px;
  }
  .sugarTestPrintArea .sugerTestContent .title {
    font-size: 22px;
    text-align: center;
    margin: 20px 0 40px;
    font-weight: 700;
    color: #000;
  }
  .sugarTestPrintArea .userInfo {
    margin-bottom: 10px;
  }
  .sugarTestPrintArea .userInfo div {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .sugarTestPrintArea .userInfo p {
    float: left;
    text-align: left;
    color: #000;
  }
  .sugarTestPrintArea .userInfo p.item1,
  .sugarTestPrintArea .userInfo p.item2 {
    width: 15%;
  }
  .sugarTestPrintArea .userInfo p.item3 {
    width: 40%;
  }
  .sugarTestPrintArea .userInfo p.item4 {
    width: 30%;
  }
  .sugarTestPrintArea .tableBox {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  .sugarTestPrintArea .tableBox table {
    width: 100%;
    border-collapse: collapse;
  }
  .sugarTestPrintArea .tableBox table th {
    border: 1px solid #999;
    height: 35px;
    font-weight: normal;
  }
  .sugarTestPrintArea .bottom {
    width: 100%;
    padding: 0 20px;
  }
  .sugarTestPrintArea .bottom .testInfo {
    margin-top: 10px;
    width: 100%;
  }
  .sugarTestPrintArea .bottom .testInfo p {
    min-width: 120px;
    padding-right: 48px;
    float: left;
    color: #000;
  }
  .sugarTestPrintArea .bottom .testInfo p.last {
    padding-right: 0;
  }
  .sugarTestPrintArea .bottom .statement {
    font-size: 14px;
    color: #999;
    margin-top: 5px;
    margin-bottom: 50px;
  }
  /* ------------------xwm----------------- */

  .showReport .reportListBox {
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
  }
  .showReport .reportListBox li {
    width: calc(100% / 6 - 20px);
    height: 300px;
    margin-right: 20px;
    margin-bottom: 30px;
    cursor: pointer;
  }
  .showReport .reportListBox li img {
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
    .printContent {
      .printConfig {
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
      p {
        text-align: center;
      }
      p.titleTop {
        font-size: 18px;
      }
      p.titleBottom {
        font-size: 24px;
        margin-top: 10px;
      }
      ul {
        font-size: 12px;
        margin-top: 30px;
        li {
          float: left;
          width: 25%;
        }
      }
    }
    // 打印单条血糖化验单打印样式
    .sugarTestPrintArea {
      display: block;
      height: 380px;
      width: 99.5%;
      position: absolute;
      top: 30px;
      left: 0;
      border: 1px solid #cecece;
      .userInfo p {
        display: inline-block;
        min-width: 30px;
      }
      .bottom .testInfo p {
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
  .printSurgeData {
    height: auto;
    overflow: hidden;
    .surgeDataTime {
      height: auto;
      overflow: hidden;
    }
    .printContent {
      margin-top: 10px;
      border: 1px solid rgb(206, 206, 206);
      padding: 10px;
      height: 500px;
      overflow-y: scroll;
      p {
        text-align: center;
      }
      p.titleTop {
        font-size: 18px;
      }
      p.titleBottom {
        font-size: 24px;
        margin-top: 10px;
      }
      ul {
        height: auto;
        overflow: hidden;
        font-size: 12px;
        margin-top: 30px;
        li {
          float: left;
          width: 25%;
        }
      }
    }
  }
  .print {
    margin: 0 auto;
    display: block;
  }
  .printConfig {
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
  .bigReportShow {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }
  .bigReportShow .imgContainer {
    width: 100%;
    height: 80%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%)
  }
  .bigReportShow .imgContainer img {
    display: block;
    width: auto;
    max-width: 100%;
    min-height: 100%;
    margin: auto auto;
  }
  .closeReportShow {
    position: fixed;
    right: 0;
    top: 0;
    width: 50px;
    height: 50px;
    background-color: #666;
    color: #fff;
    font-size: 40px;
    line-height: 50px;
    cursor: pointer;
  }
  .controlContainer {
    width: 200px;
    height: 44px;
    padding-left: 39px;
    box-sizing: border-box;
    line-height: 44px;
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
  }
  .clickRotate,
  .bigerSize,
  .smallerSize {
    display: block;
    float: left;
    width: 22px;
    height: 22px;
    margin-top: 11px;
    margin-right: 5px;
  }
  .scaleText {
    float: left;
    width: 44px;
    margin-right: 5px;
  }
  .bigerSize {
    background-position: 0 -192px ;
  }
  .smallerSize {
    background-position: -24px -193px ;
  }
  .clickRotate {
    margin-right: 0;
    background-position: 0 -217px ;
  }
  .remindContent {
    width: 100%;
    max-height: 45px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
