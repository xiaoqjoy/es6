<template>
  <div>
    <div class="followUps">
      <h3>健康随访</h3>
      <div class="followUpss contentBorder">
        <div class="tops">
          <el-input size="small" v-model="input_" placeholder="输入姓名/手机号查询" class="searc_med"></el-input>
          <el-select size="small" v-model="ruleForm.status_" placeholder="执行状态" style="width: 120px;">
            <el-option
              v-for="(item,index) in status_z"
              :key="item.itemKey"
              :label="item.itemValue"
              :value="item.itemKey">
              {{item.itemValue}}
            </el-option>
          </el-select>
          <el-select size="small" v-model="ruleForm.types_" placeholder="选择类型" @change="strTypes_"
                    style="width: 120px;">
            <el-option
              v-for="(item,index) in m_typeWays"
              :key="item.itemKey"
              :label="item.itemValue"
              :value="item.itemKey">
              {{item.itemValue}}
            </el-option>
          </el-select>
          <el-select size="small" v-model="ruleForm.Execut_" placeholder="选择执行人" style="width: 120px;">
            <el-option
              v-for="(item,index) in Executor"
              :key="item.userId"
              :label="item.nickname"
              :value="item.userId">
              {{item.nickname}}
            </el-option>
          </el-select>
          创建时间：
          <el-date-picker
            size="small"
            style="width:184px;"
            class="datetime_med"
            v-model="time_start"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
          至&nbsp
          <el-date-picker
            size="small"
            style="width:184px;"
            class="datetime_med"
            v-model="time_end"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
          <div class="search" style="" @click="searches_">搜索</div>
          <div class="clear" @click="clear">清空</div>
          <div class="addPlane" @click="addPlane">新增计划</div>
        </div>
        <div class="main">
          <div>
            <div class="nodata" v-if="arr.length==0">暂无数据</div>
            <div class="items" v-for="(it,index) in arr" :key="index">
              <div class="left">
                <ol>
                  <li><img :src="it.sex==2 ? woman : man"/></li>
                  <li>
                    <span>{{it.patientName ? it.patientName : ''}}</span>
                    <span>{{it.sex==0 ? '保密' : it.sex==1 ? '男' : it.sex==2 ? '女' : ''}}</span>
                    <span>{{it.birthday ? jsGetAge(formatDate(it.birthday)) : ''}}</span>
                  </li>
                  <li>{{it.diabetesType==null ? '' : it.diabetesType}}</li>
                </ol>
              </div>
              <div class="right">
                <ul class="ul_1">
                  <li
                    :class="it.status === 0 ? '' : it.status === 1 ? 'executeds_2' : it.status === 2 ? 'unexecuteds_2':''">
                    <b style="display: inline-block;width: 16px;height: 16px;vertical-align: middle;margin-right: 10px;"
                      :class="it.status === 0 ? 'cancels_' : it.status === 1 ? 'executeds_' : it.status === 2 ? 'unexecuteds_':''"></b><em>{{it.status
                    === 0 ? '已取消' : it.status === 1 ? '已执行': it.status === 2 ? '未执行' : ''}}</em></li>
                  <li>
                    <span @click="See(it)" v-if="it.status == 0 || it.status == 1">查看</span>
                    <b style="margin-left: 25px;font-weight: normal;" v-if="it.status == 0">取消原因:{{it.cancelReason}}</b>
                    <span @click="implement(it)" v-if="it.status == 2">执行</span>
                    <span @click="change(it)" v-if="it.status == 2 && it.flagEdit == true">修改</span>
                    <span @click="delc(it.followUpId)" v-if="it.status == 2">取消</span>
                  </li>
                </ul>
                <ul class="ul_2">
                  <li>创建时间：{{formatDate(it.createTime)}}</li>
                  <li>创建人员：{{it.createUserName}}</li>
                  <li>计划时间：{{formatDate(it.planTime)}}</li>
                  <li>计划人员：{{it.planUserName}}</li>
                </ul>
                <p class="p_1">
                  随访内容：
                  {{it.content ? it.content : ""}}
                </p>
              </div>
            </div>
          </div>
          <!--分页-->
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10, 15,20]"
              :page-size="pagesize"
              background
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNum">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!--随访计划-->
    <div class="followPlans" v-if="ifFolPlan">
      <div class="followPlan">
        <h5>随访计划</h5>
        <span class="close" @click="closes('ruleForm')">X</span>
        <!---->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                style="padding-top: 20px;border-top: 1px solid #e0e0e0;margin-top: 30px;">
          <el-form-item label="患者姓名" prop="name" style="position: relative;">
            <el-autocomplete
              class="inline-input"
              v-model="ruleForm.name"
              :fetch-suggestions="querySearch"
              placeholder="姓名/手机号"
              @input="m_input"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
            <div class="abouts" v-if="ifDataShow">
              <ul>
                <li v-for="a in mdatass" style="height: 36px;" class="hovers"
                    @click="takeSearch(a.patientName,a.customerId)">
                  <ol>
                    <li>{{a.patientName}}</li>
                    <li>{{a.sex}}</li>
                    <li>{{a.birthday ? jsGetAge(formatDate(a.birthday)) : ''}}</li>
                    <li>{{a.phone}}</li>
                    <li>{{a.idCard}}</li>
                  </ol>
                </li>
              </ul>
            </div>
          </el-form-item>

          <el-form-item label="出生年月" prop="birth">
            <el-date-picker
              v-model="ruleForm.birth"
              type="date"
              align="right"
              style="width: 140px;"
              disabled
            >
            </el-date-picker>

          </el-form-item>
          <el-form-item label="性别" prop="">
            <el-input v-model="ruleForm.sex" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="">
            <el-input v-model="ruleForm.tel" disabled></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="">
            <el-input v-model="ruleForm.IDNum" disabled></el-input>
          </el-form-item>
          <el-form-item label="档案号码" prop="">
            <el-input v-model="ruleForm.FileNum" disabled></el-input>
          </el-form-item>
          <el-form-item label="身高" prop="">
            <el-input v-model="ruleForm.height" disabled></el-input>
          </el-form-item>
          <el-form-item label="体重" prop="">
            <el-input v-model="ruleForm.weight" disabled></el-input>
          </el-form-item>
          <el-form-item label="BMI指数" prop="">
            <el-input v-model="ruleForm.BMI" disabled></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="">
            <el-input v-model="ruleForm.types" disabled></el-input>
          </el-form-item>
          <el-form-item label="糖龄" prop="">
            <el-input v-model="ruleForm.OldSugar" disabled></el-input>
          </el-form-item>
          <el-form-item label="并发症" prop="">
            <el-input v-model="ruleForm.Complicat" disabled></el-input>
          </el-form-item>
          <el-form-item label="计划人员" prop="values">
            <el-select v-model="ruleForm.values" placeholder="请选择">
              <el-option
                v-for="(item,index) in Executor"
                :key="item.userId"
                :label="item.nickname"
                :value="item.userId">
                {{item.nickname}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计划时间" prop="planeTime">
            <el-date-picker
              v-model="ruleForm.planeTime"
              type="datetime"
              style="width: 140px;"
              placeholder="计划时间"
              :picker-options="pickerOptions3"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="选择模板" prop="Templates" style="width: 100%;display: block;">
            <el-select v-model="ruleForm.Templates" placeholder="请选择模板" @change="followTem_">
              <el-option
                v-for="item in followTemplates"
                :key="item.templateId"
                :label="item.name"
                :value="item.templateId">
                {{item.name}}
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="随访内容" prop="Fcontent" style="width: 100%;display: block;">
            <el-input
              type="textarea"
              resize="none"
              :rows="4"
              placeholder="请输入内容"
              v-model="ruleForm.Fcontent">
            </el-input>
          </el-form-item>

          <el-form-item style="text-align: right;width: 100%;">
            <el-button @click="resetForm('ruleForm')">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          </el-form-item>
        </el-form>

        <!--微信头像-->
        <div class="weChats">
          <img :src=" chatImg ? man : woman" alt=""/>
          <span>微信头像</span>
        </div>
      </div>
    </div>
    <!--取消随访-->
    <div class="CanFollows" v-if="ifCanFollows">
      <div class="CanFollow">
        <h5>取消随访</h5>
        <span class="close" @click="closes_c('ruleForm')">X</span>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                style="padding-top: 20px;border-top: 1px solid #e0e0e0;margin-top: 30px;">
          <el-form-item label="取消原因" prop="cause">
            <el-input type='textarea' resize="none" v-model="ruleForm.cause" :rows="4"></el-input>
          </el-form-item>
          <el-form-item style="text-align: right;width: 100%;">
            <el-button @click="resetForm_c('ruleForm')">取消</el-button>
            <el-button type="primary" @click="submitForm_c('ruleForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--随访执行-->
    <div class="followPlans" v-if="ifFollowUp">
      <div class="followPlan">
        <h5>随访执行</h5>
        <span class="close" @click="closes_u('ruleForm')">X</span>
        <!---->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                style="padding-top: 20px;border-top: 1px solid #e0e0e0;margin-top: 30px;">
          <el-form-item label="患者姓名" prop="">
            <el-autocomplete
              disabled
              class="inline-input"
              v-model="patientInfo==null ? '' : patientInfo.patientName"
              :fetch-suggestions="querySearch"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
            <!--<el-input v-model="ruleForm.name" placeholder="姓名/手机号"></el-input>-->
          </el-form-item>
          <el-form-item label="出生年月" prop="">
            <el-input v-model="patientInfo==null ? '' : patientInfo.birthday" disabled></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="">
            <el-input
              v-model="patientInfo==null ? '' : patientInfo.sex==1 ? '男' : patientInfo.sex==2 ? '女' :  patientInfo.sex==0 ? '未知' : ''"
              disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="">
            <el-input v-model="patientInfo==null ? '' : patientInfo.phone" disabled></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="">
            <el-input v-model="patientInfo==null ? '' : patientInfo.idCard" disabled></el-input>
          </el-form-item>
          <el-form-item label="档案号码" prop="">
            <el-input v-model="fileNumber_" disabled></el-input>
          </el-form-item>
          <el-form-item label="身高" prop="">
            <el-input v-model="patientInfo==null ? '' : patientInfo.height" disabled></el-input>
          </el-form-item>
          <el-form-item label="体重" prop="">
            <el-input v-model="patientInfo==null ? '' : patientInfo.weight" disabled></el-input>
          </el-form-item>
          <el-form-item label="BMI指数" prop="">
            <el-input v-model="patientInfo==null ? '' : patientInfo.bmi" disabled></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="">
            <el-input v-model="patientSugarVo == null ? '' : patientSugarVo.diabetesType" disabled></el-input>
          </el-form-item>
          <el-form-item label="糖龄" prop="">
            <el-input v-model="patientSugarVo == null ? '' : patientSugarVo.ensureDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="并发症" prop="">
            <el-input v-model="patientSugarVo == null ? '' : patientSugarVo.complications" disabled></el-input>
          </el-form-item>
          <el-form-item label="计划人员" prop="">
            <el-select v-model="foldet.planUserName" placeholder="请选择" disabled>
              <el-option
                v-for="(item,index) in Executor"
                :key="item.userId"
                :label="item.nickname"
                :value="item.userId">
                {{item.nickname}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计划时间" prop="">
            <el-date-picker
              disabled
              v-model="foldet.planTime"
              type="datetime"
              style="width: 140px;"
              placeholder="计划时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="随访内容" prop="" style="width: 100%;display: block;">
            <el-input
              disabled
              type="textarea"
              resize="none"
              :rows="4"
              placeholder="请输入内容"
              v-model="foldet.content">
            </el-input>
          </el-form-item>

          <el-form-item label="随访时间" prop="FollowTime">
            <el-date-picker
              v-model="ruleForm.FollowTime"
              type="datetime"
              style="width: 140px;"
              placeholder="请选择"
              :picker-options="pickerOptions2"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="随访人员" prop="FollowPer">
            <el-select v-model="ruleForm.FollowPer" placeholder="请选择">
              <el-option
                v-for="item in FollowPersonnel"
                :key="item.userId"
                :label="item.nickname"
                :value="item.userId">
                {{item.nickname}}
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="随访方式" prop="FollowWay">
            <el-select v-model="ruleForm.FollowWay" placeholder="请选择">
              <el-option
                v-for="item in FollowMethod"
                :key="item.itemKey"
                :label="item.itemValue"
                :value="item.itemKey">
                {{item.itemValue}}
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="随访结论" prop="FollowCon" style="width: 100%;display: block;">
            <el-input
              type="textarea"
              resize="none"
              :rows="4"
              placeholder="请输入内容"
              v-model="ruleForm.FollowCon">
            </el-input>
          </el-form-item>

          <el-form-item style="text-align: right;width: 100%;">
            <el-button @click="resetForm_u('ruleForm')">取消</el-button>
            <el-button type="primary" @click="submitForm_u('ruleForm')">确定</el-button>
          </el-form-item>
        </el-form>

        <!--微信头像-->
        <div class="weChats">
          <img :src="patientInfo.sex==2 ? woman : man" alt=""/>
          <span>微信头像</span>
        </div>
      </div>
    </div>
    <!--随访明细-->
    <div class="followPlans form_d" v-if="ifFolDetail">
      <div class="followPlan details_">
        <h5>随访明细</h5>
        <span class="close" @click="closes_d('ruleForm')">X</span>
        <el-form :label-position="labelPos" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                style="padding-top: 20px;border-top: 1px solid #e0e0e0;margin-top: 30px;">
          <el-form-item label="患者姓名:" prop="">
            {{patientInfo==null ? '' : patientInfo.patientName}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="出生年月:" prop="">
            {{patientInfo==null ? '' : patientInfo.birthday}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="性别:" prop="">
            {{patientInfo==null ? '' : patientInfo.sex==1 ? '男' : patientInfo.sex==2 ? '女' : patientInfo.sex==0 ? '未知' :
            ''}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="手机号:" prop="">
            {{patientInfo==null ? '' : patientInfo.phone}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="身份证号:" prop="">
            {{patientInfo==null ? '' : patientInfo.idCard}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="档案号码:" prop="">
            {{fileNumber_}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="身高:" prop="">
            {{patientInfo==null ? '' : patientInfo.height ? patientInfo.height + 'cm' : ''}}<span
            style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="体重:" prop="">
            {{patientInfo==null ? '' : patientInfo.weight ? patientInfo.weight + 'kg' : ''}}<span
            style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="BMI指数:" prop="">
            {{patientInfo==null ? '' : patientInfo.bmi}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="类型:" prop="">
            {{foldet==null ? '' : foldet.diabetesType}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="糖龄:" prop="">
            {{patientSugarVo==null ? '' : patientSugarVo.ensureDate}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="并发症:" prop="">
            {{ patientSugarVo==null ? '' : patientSugarVo.complications}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="计划人员:" prop="">
            {{foldet.planUserName}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="计划时间:" prop="">
            {{foldet.planTime}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="随访内容:" prop="" style="width: 100%;display: block;">
            {{foldet.content}}<span style="opacity: 0;">1</span>
          </el-form-item>
          <el-form-item label="随访时间:" prop="">
            {{foldet.realTime}}<span style="opacity: 0;">1</span>
          </el-form-item>

          <el-form-item label="随访人员:" prop="">
            {{foldet.realUserName}}<span style="opacity: 0;">1</span>
          </el-form-item>

          <el-form-item label="随访方式:" prop="">
            {{foldet.type}}<span style="opacity: 0;">1</span>
          </el-form-item>

          <el-form-item label="随访结论:" prop="" style="width: 100%;display: block;">
            {{foldet.result}}<span style="opacity: 0;">1</span>
          </el-form-item>

          <el-form-item style="text-align: right;width: 100%;">
            <el-button type="primary" @click="submitForm_d()">确定</el-button>
          </el-form-item>
        </el-form>

        <!--微信头像-->
        <div class="weChats" style="right: 80px;">
          <img :src="patientInfo.sex==2 ? woman : man" alt=""/>
          <span>微信头像</span>
        </div>
      </div>
    </div>
    <!--取消随访明细-->
    <div class="followPlans" v-if="ifCanfollow">
      <div class="followPlan">
        <h5>随访明细</h5>
        <span class="close" @click="closes_canDet('ruleForm')">X</span>
        <!---->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                style="padding-top: 20px;border-top: 1px solid #e0e0e0;margin-top: 30px;">
          <el-form-item label="患者姓名" prop="">
            <el-autocomplete
              disabled
              class="inline-input"
              v-model="ruleForm.name"
              :fetch-suggestions="querySearch"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
            <!--<el-input v-model="ruleForm.name" placeholder="姓名/手机号"></el-input>-->
          </el-form-item>
          <el-form-item label="出生年月" prop="">
            <el-input v-model="ruleForm.birth" disabled></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="">
            <el-input v-model="ruleForm.sex" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="">
            <el-input v-model="ruleForm.tel" disabled></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="">
            <el-input v-model="ruleForm.IDNum" disabled></el-input>
          </el-form-item>
          <el-form-item label="档案号码" prop="">
            <el-input v-model="ruleForm.FileNum" disabled></el-input>
          </el-form-item>
          <el-form-item label="身高" prop="">
            <el-input v-model="ruleForm.height" disabled></el-input>
          </el-form-item>
          <el-form-item label="体重" prop="">
            <el-input v-model="ruleForm.weight" disabled></el-input>
          </el-form-item>
          <el-form-item label="BMI指数" prop="">
            <el-input v-model="ruleForm.BMI" disabled></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="">
            <el-input v-model="ruleForm.styless" disabled></el-input>
          </el-form-item>
          <el-form-item label="糖龄" prop="">
            <el-input v-model="ruleForm.OldSugar" disabled></el-input>
          </el-form-item>
          <el-form-item label="并发症" prop="">
            <el-input v-model="ruleForm.Complicat" disabled></el-input>
          </el-form-item>
          <el-form-item label="计划人员" prop="">
            <el-select v-model="ruleForm.values" placeholder="请选择" disabled>
              <el-option
                v-for="(item,index) in Executor"
                :key="item.userId"
                :label="item.nickname"
                :value="item.userId">
                {{item.nickname}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计划时间" prop="">
            <el-date-picker
              disabled
              v-model="ruleForm.planeTime"
              type="date"
              style="width: 140px;"
              placeholder="计划时间"
              :picker-options="pickerOptions3"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="随访内容" prop="" style="width: 100%;display: block;">
            <el-input
              disabled
              type="textarea"
              resize="none"
              :rows="4"
              placeholder="请输入内容"
              v-model="ruleForm.Fcontent">
            </el-input>
          </el-form-item>

          <el-form-item label="取消原因" prop="CanCause" style="width: 100%;display: block;">
            <el-input
              type="textarea"
              resize="none"
              :rows="4"
              placeholder="请输入内容"
              v-model="ruleForm.CanCause">
            </el-input>
          </el-form-item>

          <el-form-item style="text-align: right;width: 100%;">
            <el-button @click="resetForm_canDet('ruleForm')">取消</el-button>
            <el-button type="primary" @click="submitForm_canDet('ruleForm')">确定</el-button>
          </el-form-item>
        </el-form>

        <!--微信头像-->
        <div class="weChats">
          <img src="../../../images/weChatLogo/weChatLogo.jpg" alt=""/>
          <span>微信头像</span>
        </div>
      </div>
    </div>
    <!--修改执行-->
    <div class="followPlans" v-if="ifMoExe">
      <div class="followPlan">
        <h5>修改计划</h5>
        <span class="close" @click="closes_change('ruleForm')">X</span>
        <!---->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                style="padding-top: 20px;border-top: 1px solid #e0e0e0;margin-top: 30px;">
          <el-form-item label="患者姓名" prop="">
            <el-autocomplete
              disabled
              class="inline-input"
              v-model="patientInfo==null ? '' : patientInfo.patientName"
              :fetch-suggestions="querySearch"
              :trigger-on-focus="false"
              @select="handleSelect"
            ></el-autocomplete>
            <!--<el-input v-model="ruleForm.name" placeholder="姓名/手机号"></el-input>-->
          </el-form-item>
          <el-form-item label="出生年月" prop="">
            <el-input v-model="patientInfo==null ? '' : patientInfo.birthday" disabled></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="">
            <el-input
              v-model="patientInfo==null ? '' : patientInfo.sex==1 ? '男' : patientInfo.sex==2 ? '女' :  patientInfo.sex==0 ? '未知' : ''"
              disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="">
            <el-input v-model="patientInfo==null ? '' : patientInfo.phone" disabled></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="">
            <el-input v-model="patientInfo==null ? '' : patientInfo.idCard" disabled></el-input>
          </el-form-item>
          <el-form-item label="档案号码" prop="">
            <el-input v-model="fileNumber_" disabled></el-input>
          </el-form-item>
          <el-form-item label="身高" prop="">
            <el-input v-model="patientInfo==null ? '' : patientInfo.height" disabled></el-input>
          </el-form-item>
          <el-form-item label="体重" prop="">
            <el-input v-model="patientInfo==null ? '' : patientInfo.weight" disabled></el-input>
          </el-form-item>
          <el-form-item label="BMI指数" prop="">
            <el-input v-model="patientInfo==null ? '' : patientInfo.bmi" disabled></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="">
            <el-input v-model="patientSugarVo==null ? '' : patientSugarVo.diabetesType" disabled></el-input>
          </el-form-item>
          <el-form-item label="糖龄" prop="">
            <el-input v-model="patientSugarVo==null ? '' : patientSugarVo.ensureDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="并发症" prop="">
            <el-input v-model="patientSugarVo==null ? '' : patientSugarVo.complications " disabled></el-input>
          </el-form-item>
          <el-form-item label="计划人员" prop="values">
            <el-select v-model="ruleForm.values" placeholder="请选择">
              <el-option
                v-for="(item,index) in Executor"
                :key="item.userId"
                :label="item.nickname"
                :value="item.userId">
                {{item.nickname}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计划时间" prop="planeTime">
            <el-date-picker
              v-model="ruleForm.planeTime"
              type="datetime"
              style="width: 140px;"
              placeholder="计划时间"
              :picker-options="pickerOptions3"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="随访内容" prop="content" style="width: 100%;display: block;">
            <el-input
              type="textarea"
              resize="none"
              :rows="4"
              placeholder="请输入内容"
              v-model="ruleForm.content">
            </el-input>
          </el-form-item>

          <!--<el-form-item label="随访时间" prop="FollowTime">
                    <el-date-picker
                      v-model="ruleForm.FollowTime"
                      type="datetime"
                      style="width: 140px;"
                      placeholder="请选择"
                    :picker-options="pickerOptions2"
                      >
                    </el-date-picker>
                  </el-form-item>

                  <el-form-item label="随访人员" prop="FollowPer">
                    <el-select v-model="ruleForm.FollowPer" placeholder="请选择">
                        <el-option
                          v-for="item in FollowPersonnel"
                          :key="item.userId"
                          :label="item.nickname"
                          :value="item.userId">
                          {{item.nickname}}
                        </el-option>
                      </el-select>
                  </el-form-item>

                  <el-form-item label="随访方式" prop="FollowWay" >
                    <el-select v-model="ruleForm.FollowWay" placeholder="请选择">
                        <el-option
                          v-for="item in FollowMethod"
                          :key="item.itemKey"
                          :label="item.itemValue"
                          :value="item.itemKey">
                          {{item.itemValue}}
                        </el-option>
                      </el-select>
                  </el-form-item>

                  <el-form-item label="随访结论" prop="FollowCon" style="width: 100%;display: block;">
                      <el-input
                      type="textarea"
                      :rows="4"
                      placeholder="请输入内容"
                      v-model="ruleForm.FollowCon">
                    </el-input>
                  </el-form-item>-->

          <el-form-item style="text-align: right;width: 100%;">
            <el-button @click="resetForm_change('ruleForm')">取消</el-button>
            <el-button type="primary" @click="submitForm_change('ruleForm')">确定</el-button>
          </el-form-item>
        </el-form>

        <!--微信头像-->
        <div class="weChats">
          <img :src="patientInfo.sex==2 ? woman : man"/>
          <span>微信头像</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  //初始化页面
  var reload = function (t, currentPage4, pagesize, keyName, status, typeWay, realUserId, createStartTime, createEndTime) {
    // var customId = '';
    if (keyName === undefined) {
      keyName = '';
    }
    if (status === undefined) {
      status = '';
    }
    if (typeWay === undefined) {
      typeWay = '';
    }
    if (realUserId === undefined) {
      realUserId = '';
    }
    if (createStartTime === undefined) {
      createStartTime = '';
    }
    if (createEndTime === undefined) {
      createEndTime = '';
    }
    createStartTime = createStartTime ? t.formatDate(createStartTime) : '';
    createEndTime = createEndTime ? t.formatDate(createEndTime) : '';

    let args = {currentPage:currentPage4, pageSize:pagesize, keyName:keyName, status:status, type:typeWay, realUserId:realUserId, createStartTime, createEndTime:  realUserId, createStartTime:createStartTime, createEndTime:createEndTime};
    t.$api.followPaged_search(args ,res=> {
      if (res.status == 200) {
        if (res.data.data) {
          t.arr = res.data.data.items;
          t.totalNum = res.data.data.totalNum;

        }
      }
    }).catch(function (err) {
      console.log(err)
    })
  }

  import man from '../../../images/patientManage/add_suif_pic_man.png'
  import woman from '../../../images/patientManage/add_suif_pic_woman.png'
  import funBus from '../../assets/js/funBus'

  export default {
    data() {
      return {
        chatImg: true,
        man: man,
        woman: woman,
        totalNum: 0,
        pickerOptions2: {
          disabledDate(time) {
            //if (time) {
            //  return time.getTime() > Date.now();
            //}
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        pickerOptions3: {
          disabledDate(time) {
            if (time) {
              return time.getTime() < Date.now() - 8.64e7;
            }
          }
        },
        foldet: "",
        ifNull: "",
        fileNumber_: "",
        patientInfo: "",
        followUpId_: "",
        customerId_: "",
        Executor: "",
        time_end: "",
        time_start: "",
        status_z: [
          {itemKey: 0, itemValue: "已取消"},
          {itemKey: 1, itemValue: "已执行"},
          {itemKey: 2, itemValue: "未执行"}
        ],
        m_typeWays: "",
        strTypes: "",
        input_: "",
        patientBaseVo: "",
        patientSugarVo: {},
        tempId_: "",
        cusID: "",
        mdatass: "",
        ifDataShow: false,
        planeP: "",
        followPep: "",
        followTemplates: '',
        myIndex: 2,
        FollowUpData: {},
        ifMoExe: false,
        ifCanfollow: false,
        ifFolDetail: false,
        labelPos: "left",
        ifFollowUp: false,
        ifCanFollows: false,
        restaurants: [],
        ifFolPlan: false,
        arr: [],
        currentPage4: 1,
        pagesize: 15,
        search: false,
        ruleForm: {
          Execut_: "",
          content: "",
          status_: "",
          types_: "",
          types: "",
          CanCause: '',
          Fcontent: '',
          planeTime: '',
          name: '',
          birth: '',
          sex: '',
          tel: '',
          IDNum: '',
          FileNum: '',
          height: '',
          OldSugar: '',
          Complicat: '',
          styless: '',
          BMI: '',
          weight: '',
          values: '',
          Templates: '',
          cause: '',
          FollowTime: '',
          FollowPer: '',
          FollowWay: '',
          FollowCon: ''
        },
        rules: {
          content: [
            {required: true, message: '请输入内容', trigger: 'change'}
          ],
          name: [
            {required: true, message: '请输入患者姓名', trigger: 'change'},
            {validator: funBus.validateIsNull, trigger: 'blur'}
          ],
          values: [
            {required: true, message: '请选择计划人员', trigger: 'change'}
          ],
          planeTime: [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ],
          Templates: [
            {required: true, message: '请选择模板', trigger: 'change'}
          ],
          Fcontent: [
            {required: true, message: '请输入内容', trigger: 'change'},
            {validator: funBus.validateIsNull, trigger: 'blur'}
          ],
          cause: [
            {required: true, message: '请输入内容', trigger: 'change'},
            {validator: funBus.validateIsNull, trigger: 'blur'}
          ],
          FollowTime: [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ],
          FollowPer: [
            {required: true, message: '请选择随访人员', trigger: 'change'}
          ],
          FollowWay: [
            {required: true, message: '请选择随访方式', trigger: 'change'}
          ],
          FollowCon: [
            {required: true, message: '请输入内容', trigger: 'change'},
            {validator: funBus.validateIsNull, trigger: 'blur'}
          ],
          CanCause: [
            {required: true, message: '请输入取消原因', trigger: 'blur'},
            {validator: funBus.validateIsNull, trigger: 'blur'}
          ]
        },
        //随访人员
        FollowPersonnel: [],
        //随访方式
        FollowMethod: [
          {
            value: '1',
            label: '电话'
          },
          {
            value: '2',
            label: '微信'
          },
          {
            value: '3',
            label: 'QQ'
          }
        ]
      }
    },
    mounted() {
      var that = this;
      /*获取session信息*/
      var useInfo = sessionStorage.getItem('user');
      //获取机构ID
      var organizationId = JSON.parse(useInfo).organizationId;

      var data = {
        organizationId:organizationId
      }
      that.$api.queByOrganId(data,res => {
        if (res.status == 200) {
          if (res.data.data) {
            that.Executor = res.data.data;
          }
        }
      }).catch(function (err) {
        that.message = err;
      })
      //类型方式 微信、电话、qq
      funBus.getTypeWays(this);
      //字符检索
      this.restaurants = this.loadAll();
      //初始化页面
      reload(this, this.currentPage4, this.pagesize);
    },
    methods: {
      searches_() {
        //搜索
        var that = this;
        //默认
        this.currentPage4 = 1;
        reload(this, this.currentPage4, this.pagesize, this.input_, this.ruleForm.status_, this.ruleForm.types_, this.ruleForm.Execut_, this.time_start, this.time_end);
      },
      strTypes_(n) {
        this.strTypes = n;
      },
      takeSearch(name, customerId) {
        var that = this;
        this.ruleForm.name = name;
        this.mdatass = [];
        this.ifDataShow = false;
        this.cusID = customerId;
        let data = {
          customerId:customerId
        }
        //获取患者信息
        this.$api.patientInfo(data, res => {
          if (res.status == 200) {
            if (res.data.data) {
              var patientBaseVo = res.data.data.patientBaseVo;
              var patientSugarVo = res.data.data.patientSugarVo;
              that.ruleForm.sex = patientBaseVo.sex == 1 ? '男' : patientBaseVo.sex == 2 ? '女' : patientBaseVo.sex == 0 ? '未知' : '';//性别
              if (patientBaseVo.sex == 2) {
                that.chatImg = false
              } else {
                that.chatImg = true
              }
              that.ruleForm.birth = patientBaseVo.birthday ? that.formatDate(patientBaseVo.birthday) : "";//出生日期
              that.ruleForm.height = patientBaseVo.height ? patientBaseVo.height + 'cm' : "";//身高
              that.ruleForm.weight = patientBaseVo.weight ? patientBaseVo.weight + 'kg' : "";//体重
              that.ruleForm.IDNum = patientBaseVo.idCard ? patientBaseVo.idCard : "";//身份证
              that.ruleForm.FileNum = res.data.data.fileNumber !== null ? res.data.data.fileNumber : "";//档案号码
              that.ruleForm.BMI = patientBaseVo.bmi;
              that.ruleForm.tel = patientBaseVo.phone ? patientBaseVo.phone : "";//手机号
              //类型
              if (patientSugarVo.diabetesType !== null) {
                //健康随访模板
                that.$api.queryUsers_({diabetesType:patientSugarVo.diabetesType},res=> {
                  if (res.status == 200) {
                    if (res.data.data) {
                      that.followTemplates = res.data.data;
                    }
                  }
                }).catch(function (err) {
                  console.log(err)
                })
                // 根据key查询糖尿病类型
                that.$api.dictionary_({typeCode:'diabetes_Type', itemKey:patientSugarVo.diabetesType},res=> {
                  if (res.status == 200) {
                    if (res.data.data.length > 0) {
                      that.ruleForm.types = res.data.data[0].itemValue;
                    }
                  }
                }).catch(function (err) {
                  console.log(err)
                })
              } else {
                that.ruleForm.types = "无";
                that.followTemplates = "";
              }
              that.ruleForm.OldSugar = patientSugarVo.ensureDate ? that.jsGetAge(that.formatDate(patientSugarVo.ensureDate)) : '';
              that.ruleForm.Complicat = patientSugarVo.complications ? patientSugarVo.complications : ''; //并发症
            }
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      m_input() {
        var that = this;
        var data = {
          keyName:that.ruleForm.name
        }
        if (that.ruleForm.name !== "") {
          this.$api.cuPatient(data, res => {
            if (res.status == 200) {
              if (res.data.data.length > 0) {
                that.mdatass = res.data.data;
                that.ifDataShow = true;
              } else {
                that.ifDataShow = false;
              }
            }
          }).catch(function (err) {
            console.log(err)
          })
        } else {
          that.ifDataShow = false;
        }

      },
      followTem_(n) {
        var that = this;
        var content;
        that.tempId_ = n;
        this.$api.queryByIds_({templateId:n},res=>{
          if (res.status == 200) {
            if (res.data.data) {
              content = res.data.data.followUpContent;
              that.ruleForm.Fcontent = content;
            }
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      //查看随访明细
      See(it) {
        var that = this;
        this.ifFolDetail = true;
        //获取患者信息
        funBus.getPatients(this, it.customerId);
        //获取随访明细
        this.$api.queryByfoIds_({followUpId:it.followUpId},res=> {
          if (res.status == 200) {
            if (res.data.data) {
              that.foldet = res.data.data;
              that.foldet.planTime = that.foldet.planTime ? that.formatDate(that.foldet.planTime) : '';
              that.foldet.realTime = that.foldet.realTime ? that.formatDate(that.foldet.realTime) : '';
              if (that.foldet.type !== null) {
                //根据Id查询随访方式
                that.$api.dictionary_({typeCode:'followWay', itemKey:that.foldet.type},res=> {
                  if (res.status == 200) {
                    if (res.data.data.length) {
                      that.foldet.type = res.data.data[0].itemValue;
                    } else {
                      that.foldet.type = '';
                    }
                  }
                }).catch(function (err) {
                  that.message = err;
                })
              }
            }
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      //执行
      implement(it) {
        this.ifFollowUp = true;
        var that = this;
        //获取followUpId
        that.followUpId_ = it.followUpId;

        //获取患者信息
        funBus.getPatients(this, it.customerId);

        //根据id随访内容
        funBus.queByFol(this, it.followUpId);

        //随访人员
        funBus.getFollowPer(this, pageSize);

        //随访方式
        funBus.getFollowWays(this);
      },
      //修改
      change(it) {
        this.ifMoExe = true;
        var that = this;
        //获取followUpId
        that.followUpId_ = it.followUpId;
        that.customerId_ = it.customerId;
        //随访人员
        funBus.getFollowPer(this, pageSize);

        //根据id随访内容
        this.$api.queryByfoIds_({followUpId:it.followUpId},res=> {
          if (res.data.data) {
            that.ruleForm.values = res.data.data.planUserId;
          }
        }).catch(function (err) {
          console.log(err)
        })
        that.ruleForm.planeTime = new Date(it.planTime);
        that.ruleForm.content = it.content;
        //获取患者信息
        funBus.getPatients(this, it.customerId);
        /*获取session信息*/
        var useInfo = sessionStorage.getItem('user');
        //获取机构ID
        var organizationId = JSON.parse(useInfo).organizationId;
        //计划人员
        funBus.getPlanePer(this, organizationId);

        //随访人员
        funBus.getFollowPer(this, pageSize);

        //随访方式
        funBus.getFollowWays(this);

        //清空
        that.ruleForm.FollowTime = '';
        that.ruleForm.FollowPer = '';
        that.ruleForm.FollowWay = '';
        that.ruleForm.FollowCon = '';
      },
      //取消
      delc(followUpId) {
        this.ifCanFollows = true;
        //获取followId
        this.followUpId_ = followUpId;
      },
      //字符检索
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [];
      },
      handleSelect(item) {
        console.log(item);
      },
      //关闭随访计划
      closes(formName) {
        this.ifFolPlan = false;
        this.$refs[formName].resetFields();
      },
      //关闭取消随访计划
      closes_c(formName) {
        this.ifCanFollows = false;
        this.$refs[formName].resetFields();
      },
      //关闭随访执行
      closes_u(formName) {
        this.ifFollowUp = false;
        this.$refs[formName].resetFields();
      },
      //关闭随访明细
      closes_d(formName) {
        this.ifFolDetail = false;
      },
      //取消随访明细
      closes_canDet(formName) {
        this.ifCanfollow = false;
      },
      //取消随访明细
      closes_change(formName) {
        this.ifMoExe = false;
      },
      //新建计划取消
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.ifFolPlan = false;
      },
      //取消随访
      resetForm_c(formName) {
        this.$refs[formName].resetFields();
        this.ifCanFollows = false;
      },
      //取消随访执行
      resetForm_u(formName) {
        this.$refs[formName].resetFields();
        this.ifFollowUp = false;
      },
      //取消随访明细
      resetForm_canDet(formName) {
        this.$refs[formName].resetFields();
        this.ifCanfollow = false;
      },
      //取消随访明细
      resetForm_change(formName) {
        this.$refs[formName].resetFields();
        this.ifMoExe = false;
        this.ruleForm.planeTime = "";
        this.ruleForm.values = "";
        this.ruleForm.content = "";
      },
      //新建计划确定
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          var that = this;
          // console.log(that.ruleForm.values)
          // console.log(that.ruleForm.Templates)
          if (valid) {
            var data = {
              customerId: that.cusID,
              content: that.ruleForm.Fcontent,
              templateId: that.tempId_,
              planTime: that.ruleForm.planeTime,
              planUserId: that.ruleForm.values,
              remark: ""
            }
            this.$api.followAdd(data, res=> {
              if (res.status == 200) {
                if (res.data.data == "新增成功") {
                  that.ifFolPlan = false;
                  //初始化页面
                  reload(that, that.currentPage4, that.pagesize, that.input_, that.ruleForm.status_, that.ruleForm.types_, that.ruleForm.Execut_, that.time_start, that.time_end);
                  that.$refs[formName].resetFields();
                }
              }
            }).catch(function (err) {
              console.log(err)
            })
          } else {
            //console.log('error submit!!');
            return false;
          }
        });
      },
      //确定取消随访
      submitForm_c(formName) {
        var that = this;
        //console.log(that.followUpId_);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var that = this;
            var data = {
              followUpId: that.followUpId_,
              cancelReason: that.ruleForm.cause
            }
            //取消随访
            this.$api.followCancel(data, res=> {
              // console.log(res);
              if (res.status == 200) {
                if (res.data.code == 0) {
                  that.ifCanFollows = false;
                  that.$refs[formName].resetFields();
                  reload(that, that.currentPage4, that.pagesize, that.input_, that.ruleForm.status_, that.ruleForm.types_, that.ruleForm.Execut_, that.time_start, that.time_end);
                }
              }
            }).catch(function (err) {
              console.log(err)
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //确定随访执行
      submitForm_u(formName) {
        var that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var result = that.ruleForm.Fcontent;
            var planTime = that.ruleForm.FollowTime;
//		          	var result = that.ruleForm.Fcontent;
//		          	var result = that.ruleForm.Fcontent;
            var data = {
              'followUpId': that.followUpId_,
              'result': that.ruleForm.FollowCon,
              'realTime': that.ruleForm.FollowTime,
              'realUserId': that.ruleForm.FollowPer,
              'type': that.ruleForm.FollowWay
            }

            this.$api.followExecute(data, res=> {
              if (res.status == 200) {
                if (res.data.code == 0) {
                  that.ifFollowUp = false;
                  that.$refs[formName].resetFields();
                  //初始化页面
                  reload(that, that.currentPage4, that.pagesize, that.input_, that.ruleForm.status_, that.ruleForm.types_, that.ruleForm.Execut_, that.time_start, that.time_end);
                }
              }
            }).catch(function (err) {
              console.log(err)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //确定随访明细
      submitForm_d(formName) {
        this.ifFolDetail = false;
      },
      //确定取消随访明细
      submitForm_canDet(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$message('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
//	  	  		this.ifCanfollow = false;
      },
      //修改随访执行
      submitForm_change(formName) {
        this.$refs[formName].validate((valid) => {
          var that = this;
          if (valid) {
            var data = {
              followUpId: that.followUpId_,
              content: that.ruleForm.content,
//		          	result:that.ruleForm.FollowCon,
//								realUserId:that.ruleForm.FollowPer,
//								realTime:that.ruleForm.FollowTime,
              planTime: that.ruleForm.planeTime,
              planUserId: that.ruleForm.values,
//		          	type:3,//that.ruleForm.FollowWay,
              customerId: that.customerId_
            }
            // console.log(that.ruleForm.values)
            //修改随访执行
            this.$api.followUpdate(data,res => {
              if (res.status == 200) {
                if (res.data.code == 0) {
                  that.ifMoExe = false;
                  that.$refs[formName].resetFields();
                  //
                  reload(that, that.currentPage4, that.pagesize, that.input_, that.ruleForm.status_, that.ruleForm.types_, that.ruleForm.Execut_, that.time_start, that.time_end);
                }
              }
            }).catch(function (err) {
              console.log(err)
            })
          } else {
            //console.log('error submit!!');
            return false;
          }
        });
//	  	  	this.ifMoExe = false;
      },
      //表格
      handleSelectionChange(val) {
        //this.arr = val;
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
        this.pagesize = val;
        var that = this;
        reload(that, that.currentPage4, that.pagesize, that.input_, that.ruleForm.status_, that.ruleForm.types_, that.ruleForm.Execut_, that.time_start, that.time_end);
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
        this.currentPage4 = val;
        var that = this;
        reload(that, that.currentPage4, that.pagesize, that.input_, that.ruleForm.status_, that.ruleForm.types_, that.ruleForm.Execut_, that.time_start, that.time_end);
//	      this.arr.slice((currentPage4-1)*pagesize,currentPage4*pagesize)"
      },
      addPlane() {
        this.ifFolPlan = true;
        var that = this;
        //随访人员
        funBus.getFollowPer(this, pageSize);

        if (sessionStorage.getItem('user')) {
          var useInfo = sessionStorage.getItem('user');
          var userId = JSON.parse(useInfo).userId;
        }
        //关闭abouts
        that.ifDataShow = false;
        //清空
        that.followTemplates = "";
        that.ruleForm.OldSugar = '';
        that.ruleForm.Complicat = '';
        that.ruleForm.sex = '';//性别
        that.ruleForm.birth = '';//出生日期
        that.ruleForm.height = '';//身高
        that.ruleForm.weight = '';//体重
        that.ruleForm.types = '';//类型
        that.ruleForm.IDNum = '';//身份证
        that.ruleForm.FileNum = '';
        //that.ruleForm.FileNum = patientBaseVo.idCard ? patientBaseVo.idCard : "";//档案号码
        that.ruleForm.BMI = '';
        that.ruleForm.tel = '';
      },
      selected() {
        //console.log('select');
      },
      //清空
      clear() {
        this.ruleForm.status_ = "",
          this.ruleForm.types_ = "",
          this.ruleForm.Execut_ = "",
          this.time_start = "",
          this.time_end = "",
          this.input_ = "";
        var that = this;
        // 清空时默认页数为第一页开始
        this.currentPage4 = 1;
        reload(this, this.currentPage4, this.pagesize);
      }
    }
  }

</script>

<style scoped>
  .searc_med {
    width: 250px;
  }

  .cancels_ {
    background-image: url(../../../images/follow/suif_icon_cancel.png);
  }

  .executeds_ {
    background-image: url(../../../images/follow/suif_icon_done.png);
  }

  .unexecuteds_ {
    background-image: url(../../../images/follow/suif_icon_unrun.png);
  }

  .executeds_2 {
    color: #13BB8E;
  }

  .unexecuteds_2 {
    color: #E95959;
  }

  .abouts ol li {
    float: left;
    margin-right: 8px;
    box-sizing: border-box;
    height: 36px;
    line-height: 36px;
    padding: 0 8px;
    cursor: pointer;
    font-size: 14px;
  }

  .abouts ol li:nth-child(1) {
    width: 80px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .abouts ol li:nth-child(2) {
    width: 60px;
  }

  .abouts ol li:nth-child(3) {
    width: 70px;
  }

  .abouts ol li:nth-child(4) {
    width: 120px;
  }

  .abouts ol li:nth-child(5) {
    width: 180px;
    margin-right: 0;
    padding: 0;
  }

  .marry .el-radio {
    margin-left: 2px;
  }

  .hovers:hover {
    background: #E9F2FE;
  }

  .abouts {
    max-height: 200px;
    overflow-y: auto;
    margin-top: 4px;
    box-shadow: 0px 2px 4px 0px rgba(4, 0, 0, 0.06);
    border: solid 1px rgba(206, 206, 206, 0.7);
    background: white;
    position: absolute;
    width: 560px;
    z-index: 1000;
  }

  .form_d .el-form-item {
    margin-bottom: 0;
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

  .followPlan .el-form .el-form-item {
    width: 240px;
    display: inline-block;
  }

  .details_ .el-form .el-form-item {
    text-overflow: ellipsis;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
  }

  .followPlans, .CanFollows {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    overflow: auto;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .followPlan, .CanFollow {
    padding: 17px;
    position: fixed;
    /* top: 50%;
        left: 50%;
        transform:translate(-50%,-55%); */
    background-color: #ffffff;
    border-radius: 8px;
  }

  .followPlan {
    width: 30%;
    min-width: 840px;
  }

  .CanFollow {
    width: 698px;
  }

  .items {
    width: 100%;
    height: 160px;
    padding: 20px 0;
    cursor: pointer;
    box-sizing: border-box;
    border-bottom: 1px solid #f1f1f1;
  }

  .items:hover {
    background: #ecf5ff;
  }

  .left {
    display: inline-block;
    width: 8%;
    min-width: 120px;
    height: 100%;
    float: left;
    text-align: center;
  }

  .left li {
    padding-bottom: 6px;
    font-size: 14px;
  }

  .left li img {
    width: 60px;
    height: 60px;

  }

  .right {
    /* width: 92%; */
    height: 100%;
    min-width: 800px;
    float: left;
    display: inline-block;
  }

  .right p {
    display: block;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 18px;
    letter-spacing: 0px;
    color: #333333;
  }

  .right ul {
    width: 100%;
    height: 30px;
    display: block;
  }

  .right .ul_1 li {
    margin-right: 46px;
  }

  .right .ul_2 {
    height: 40px;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #666666;
  }

  .right .ul_2 li {
    margin-right: 43px;
  }

  .right ul li {
    float: left;
  }

  .right ul li span {
    width: 44px;
    height: 24px;
    display: inline-block;
    text-align: center;
    line-height: 24px;
    cursor: pointer;
    font-size: 14px;
    border-radius: 4px;
    border: solid 1px #cecece;
  }

  .right ul li em {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .edit {
    color: #267bf7;
    cursor: pointer;
    padding-left: 657px;
  }

  .patName {
    width: 743px;
    height: 55px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #e0e0e0;
  }

  .reminding {
    width: 742px;
    height: 150px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #e0e0e0;
  }

  .healthInter ul:nth-of-type(1), .newRemind ul:nth-of-type(1) {
    padding-top: 20px;
    border-top: 1px solid #e0e0e0;
  }

  .healthInter ul, .newRemind ul {
    margin-top: 20px;
    width: 100%;
    height: 20px;
    display: block;
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

  li {
    list-style: none;
  }

  .templateName {
    width: 195px;
    height: 26px;
    background-color: #ffffff;
    border-radius: 4px;
    /*border: solid 1px #e0e0e0;*/
  }

  .butt {
    cursor: pointer;
    box-sizing: border-box;
    line-height: 28px;
    text-align: center;
    font-size: 14px;
    width: 60px;
    height: 28px;
    position: absolute;
    border-radius: 4px;
  }

  .cancels {
    color: #111111;
    background-color: #ffffff;
    border: solid 1px rgba(206, 206, 206, 0.7);
    right: 100px;
    bottom: 30px;
  }

  .sures {
    color: #ffffff;
    background-color: #267bf7;
    right: 20px;
    bottom: 30px;
  }

  .setTimess {
    width: 128px;
    height: 26px;
    margin-left: 10px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px rgba(224, 224, 224, 0.7);
  }

  .set {
    margin-left: 20px;
  }

  .mid {
    vertical-align: middle;
  }

  .interCont {
    width: 742px;
    height: 150px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #e0e0e0;
  }

  .radios, .radios_h {
    margin-left: 20px;
  }

  .batchInter table, .batchRemind table {
    border-top: 1px solid #e0e0e0;
    padding: 20px 0;
    margin-top: 20px;
    font-size: 12px;
  }

  .healthInter table, .newRemind table, .batchRemind table {
    padding: 20px 0;
    margin-top: 20px;
    font-size: 12px;
  }

  .patientName {
    width: 743px;
    height: 61px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #e0e0e0;
  }

  .batchInter table tr, .healthInter table tr, .newRemind table tr, .batchRemind table tr {
    display: block;
    margin-bottom: 20px;
  }

  .newRemind table tr td input:active, .batchRemind table tr td input:active {
    color: white;
    background-color: #267bf7;
  }

  .newRemind table tr td p:nth-child(1), .batchRemind table tr td p:nth-child(1) {
    margin: 0 15px 0 0;
  }

  .newRemind table tr td p, .batchRemind table tr td p {
    cursor: pointer;
    display: inline-block;
    position: relative;
    width: 361px;
    height: 33px;
    background-color: #ffffff;
  }

  .newRemind table tr td img, .batchRemind table tr td img {
    position: absolute;
    right: 8px;
    top: 10px;
  }

  .newRemind table tr td input, .batchRemind table tr td input {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    text-align: center;
    border: solid 1px #e0e0e0;
  }

  .batchInter table tr td:nth-child(1), .healthInter table tr td:nth-child(1), .newRemind table tr td:nth-child(1), .batchRemind table tr td:nth-child(1) {
    width: 48px;
    padding-right: 11px;
    color: #111111;
  }

  .packageName, .packageName_h {
    width: 200px;
    height: 26px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px #e0e0e0;
  }

  .batchInter h5, .healthInter h5 {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #111111;
  }

  .close {
    position: absolute;
    right: 17px;
    top: 17px;
    cursor: pointer;
  }

  .batchInters, .healthInters, .newReminds, .batchReminds, .pushNotifications {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    overflow: auto;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .batchInter, .healthInter, .newRemind, .batchRemind {
    padding: 17px;
    position: fixed;
    /* top: 50%;
        left: 50%; */
    width: 840px;
    background-color: #ffffff;
    border-radius: 8px;
  }

  .followUps {
    position: absolute;
    top: 60px;
    left: 160px;
    width: 89.5%;
  }

  .block {
    text-align: right;
    margin-top: 20px;
  }

  .batch {
    width: 80px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
    border: solid 1px rgba(206, 206, 206, 0.7);
    display: inline-block;
  }

  .intervention {
    margin-left: 30px;
    display: inline-block;
  }

  .labelling {
    padding: 20px 0;
  }

  .labelling dl dt, .labelling dl dd {
    font-size: 12px;
    float: left;
    margin-right: 10px;
  }

  .labelling dl dt {
    line-height: 28px;
  }

  .labelling dl dd {
    text-align: center;
    line-height: 28px;
    color: #8b9eba;
    width: 80px;
    height: 28px;
    background-color: #e9f2fe;
    border-radius: 14px;
  }

  .sex {
    width: 110px;
    height: 28px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px rgba(206, 206, 206, 0.7);
    vertical-align: middle;
    margin-right: 30px;
  }

  .age, .ages {
    text-align: center;
    width: 60px;
    height: 28px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px rgba(206, 206, 206, 0.7);
  }

  .age {
    margin: 0 4px 0 10px;
  }

  .ages {
    margin: 0 4px 0;
  }

  .AdvanSearch {
    margin-top: 20px;
  }

  .tops {
    width: 100%;
    padding: 2px 0 21px 0;
    font-size: 14px;
    border-bottom: 1px solid #f1f1f1;
  }

  .addPlane {
    float: right;
    right: 20px;
    color: white;
    cursor: pointer;
    line-height: 32px;
    text-align: center;
    width: 80px;
    height: 32px;
    background-color: #24bdaf;
    border-radius: 4px;
  }

  .advanced {
    color: #267bf7;
    cursor: pointer;

  }

  .ipt {
    text-align: center;
    width: 112px;
    height: 28px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px rgba(206, 206, 206, 0.7);
  }

  input {
    cursor: pointer;
    outline: none;
  }

  select {
    cursor: pointer;
    outline: none;

  }

  .followUps {
    padding: 19px 0 19px 20px;
  }

  .followUpss {
    background-color: #ffffff;
    padding: 20px;
    margin-top: 19px;
    min-height: 775px;
  }

  .name {
    width: 200px;
    height: 28px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px rgba(206, 206, 206, 0.7);
    vertical-align: middle;
    margin-right: 10px;
  }

  .name-placeholder {
    color: #999999;
  }

  .styles {
    width: 110px;
    height: 28px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px rgba(206, 206, 206, 0.7);
    vertical-align: middle;
    margin-right: 20px;
  }

  .styles option {
    text-align: center;
  }

  /**/
  .boot-select {
    float: right;
    width: 80px;
  }

  .boot-nav {
    float: right;
  }

  .boot-page {
    display: inline-block;
    margin: 2px 10px 0 20px;
    vertical-align: middle;
  }

  .page-total {
    display: inline-block;
    vertical-align: middle;
  }
  .nodata{
    color: #2c3e50;
    font-size: 16px;
    line-height: 90px;
    text-align: center;
  }
</style>
