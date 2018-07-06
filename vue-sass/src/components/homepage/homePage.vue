<template>
  <div>
    <div class="homePage">
      <a class="special">{{dataTime}}好， <span>{{doctor}}</span> 美好的一天开始了，我是您的智能健康管理平台，祝您工作愉快！</a>
      <div class="homePage-top pr">
        <p>今日患者</p>
        <ul>
          <li>
            <dl @click="goToPatient">
              <dt><span class="one">{{customerCount.createUserCount}}</span>人</dt>
              <dd>建档数量</dd>
            </dl>
          </li>
          <!--<li>-->
            <!--<dl>-->
              <!--<dt><span class="two">{{customerCount.interventionCount}}</span>次</dt>-->
              <!--<dd>干预次数</dd>-->
            <!--</dl>-->
          <!--</li>-->
          <!--<li>-->
            <!--<dl>-->
              <!--<dt><span class="three">{{customerCount.followUpCount}}</span>次</dt>-->
              <!--<dd>随访次数</dd>-->
            <!--</dl>-->
          <!--</li>-->
          <li>
            <dl @click="goToInfo">
              <dt><span class="four">{{customerCount.sugarTestCount}}</span>次</dt>
              <dd>血糖测量</dd>
            </dl>
          </li>
          <li>
            <dl @click="goToSugarHighLow(1)">
              <dt><span class="five">{{customerCount.sugarTestHighCount}}</span>人</dt>
              <dd>血糖偏高</dd>
            </dl>
          </li>
          <li>
            <dl @click="goToSugarHighLow(2)">
              <dt><span class="six">{{customerCount.sugarTestLowCount}}</span>人</dt>
              <dd>血糖偏低</dd>
            </dl>
          </li>
          <li>
            <dl @click="weekNoGauged()">
              <dt><span class="seven">{{customerNoTestCount}}</span>人</dt>
              <dd>7天未测量</dd>
            </dl>
          </li>
        </ul>
        <div class="addPatientBox par" v-if="isShowAddBtn">
          <div class="addPatient par"  @click="addPatient"></div>
        </div>
      </div>
      <div class="homePage-center">
        <div class="center-left">
          <p class="title">今日干预<span v-if="interventionCount>0">（{{interventionCount}}次）</span></p>
          <div class="tableContent">
          <el-table
            :data="tableData3"
            height="500"
            border>
            <el-table-column
              fixed
              label="姓名"
              align="center">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text">{{ scope.row.patientName }}</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="sex"
              label="性别"
              align="center">
            </el-table-column>
            <el-table-column
              prop="birthday"
              label="年龄"
              align="center">
            </el-table-column>
            <el-table-column
              prop="diabetesType"
              label="类型"
              align="center">
            </el-table-column>
            <el-table-column
              prop="interventionName"
              label="干预方案"
              align="center">
            </el-table-column>
            <el-table-column
              prop="address"
              label="操作"
              align="center">
              <template slot-scope="scope">
                <el-button @click="intersMethod(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        </div>
        <div class="center-right">
          <p class="title">今日随访<span v-if="followUpCount>0">（{{followUpCount}}次）</span></p>
          <div class="tableContent">
            <el-table :data="tableData4" height="500" border>
              <el-table-column fixed label="姓名" align="center">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text">{{ scope.row.patientName }}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="sex" label="性别" align="center">
              </el-table-column>
              <el-table-column prop="birthday" label="年龄" align="center">
              </el-table-column>
              <el-table-column prop="diabetesType" label="类型" align="center">
              </el-table-column>
              <el-table-column prop="followUpName" label="随访模板" align="center">
              </el-table-column>
              <el-table-column prop="address" label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="followAction(scope.row)" type="text" size="small">{{scope.row.followStatus == 0 ? '已取消' : (scope.row.followStatus == 1 ? '查看' : '执行') }}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <!--干预(可多次干预)-->
    <div class="healthInters" v-if="inters">
      <div class="healthInter">
        <h5>新增干预</h5>
        <span class="close" @click="beClose('ruleForm')">X</span>
        <ul>
          <li>患者姓名：<span>{{patientInfo.patientName}}</span></li>
          <li>出生年月：<span>{{patientInfo.birthday}}</span></li>
          <li>性别：<span>{{patientInfo.sex}}</span></li>
          <li>手机号：<span>{{patientInfo.phone}}</span></li>
        </ul>
        <ul>
          <li>身 高：<span>{{patientInfo.height ? patientInfo.height + 'cm' : ''}}</span></li>
          <li>体 重：<span>{{patientInfo.weight ? patientInfo.weight + 'kg': ''}}</span></li>
          <li>类型：<span>{{patientSugarVo.diabetesType}}</span></li>
          <li>并发症：<span>{{patientSugarVo.complications }}</span></li>
        </ul>
        <!---->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm"
                style="margin-top: 30px;">
          <el-form-item label="干预类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="干预类型" @change="Radio(ruleForm.type)"
                      style="vertical-align: bottom;height:40px;">
              <el-option style="margin: 0 7px 10px;"
                        v-for="it in interTypes"
                        :key="it.itemKey"
                        :label="it.itemValue"
                        :value="it.itemKey">
                {{it.itemValue}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="干预方式" prop="typeWay">
            <!--<el-radio-group v-model="ruleForm.typeWay" style="vertical-align: bottom;">-->
            <!--<el-radio :label="it.itemKey" style="margin: 0 7px 10px;" v-for="it in m_typeWays " :key="it.itemValue">{{it.itemValue}}</el-radio>-->
            <!--</el-radio-group>-->
            <el-select v-model="ruleForm.typeWay" placeholder="干预方式" style="vertical-align: bottom;height:40px;">
              <el-option style="margin: 0 7px 10px;"
                        v-for="it in m_typeWays"
                        :key="it.itemKey"
                        :label="it.itemValue"
                        :value="it.itemKey">
                {{it.itemValue}}
              </el-option>
            </el-select>

          </el-form-item>
          <el-form-item label="方案名称" prop="index">
            <el-select v-model="ruleForm.index" filterable :disabled="checkedss" placeholder="请选择"
                      @change="uiui(ruleForm.index)">
              <el-option
                v-for="(item,index) in options"
                :key="item.name"
                :label="item.name"
                :value="index"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="干预内容" prop="content">
            <el-input type="textarea" v-model="ruleForm.content"></el-input>
          </el-form-item>
          <el-form-item style="display: inline-block;">
            <el-checkbox v-model="checkedss">保存为模板</el-checkbox>
          </el-form-item>
          <el-form-item label="" prop="temName" style="display: inline-block;margin-left: -50px;" v-if="checkedss">
            <el-input type="text" placeholder="请填写模板名称" class="templateName" v-model="ruleForm.temName">
            </el-input>
          </el-form-item>
          <el-form-item label="发送时间" prop="">
            <el-radio-group v-model="radio4">
              <el-radio :label="1">立即发送</el-radio>
              <el-radio :label="2" style="margin-left: 20px;">定时发送</el-radio>
            </el-radio-group>
            <!--<input id="d4502" v-if="radio4 == 2" @blur="dateBlurs" class="Wdate laydate-icon setTimess" type="datetime" readonly="readonly" onFocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm', autoPickDate:false, minDate:'%y-%M-%d #{%H}:#{%m+1}'})"/>-->
            <!--代替判断-->
            <el-form-item label="" prop="setTime" v-if="radio4 == 2" style="display: inline-block;">
              <el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.setTime"
                              :picker-options="pickerOptions0"></el-date-picker>
            </el-form-item>
            <!--代替判断-->
          </el-form-item>
          <el-form-item style="text-align: right;">
            <el-button @click="resetForm('ruleForm')">取消</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--查看干预-->
    <div class="ViewInters" v-if="ifViewInter">
      <div class="ViewInter">
        <h5>查看干预</h5>
        <span class="close" @click="closeGan">X</span>
        <el-form label-width="75px" label-position="left" class="demo-ruleForm"
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
            <el-button type="primary" @click="closeGan">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--执行(显示未执行的)-->
    <div class="followPlans" v-if="plans">
      <div class="followPlan">
        <h5>随访执行</h5>
        <span class="close" @click="closes_u('ruleForm1')">X</span>
        <!---->
        <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm"
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
            <el-input v-model="patientInfo.sex" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="">
            <el-input v-model="patientInfo==null ? '' : patientInfo.phone" disabled></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="">
            <el-input v-model="patientInfo==null ? '' : patientInfo.idCard" disabled></el-input>
          </el-form-item>
          <el-form-item label="档案号码" prop="">
            <el-input v-model="fileNumber" disabled></el-input>
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
              :rows="4"
              placeholder="请输入内容"
              v-model="foldet.content">
            </el-input>
          </el-form-item>

          <el-form-item label="随访时间" prop="FollowTime">
            <el-date-picker
              v-model="ruleForm1.FollowTime"
              type="datetime"
              style="width: 140px;"
              placeholder="请选择"
              :picker-options="pickerOptions2"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="随访人员" prop="FollowPer">
            <el-select v-model="ruleForm1.FollowPer" placeholder="请选择">
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
            <el-select v-model="ruleForm1.FollowWay" placeholder="请选择">
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
              v-model="ruleForm1.FollowCon">
            </el-input>
          </el-form-item>

          <el-form-item style="text-align: right;width: 100%;">
            <el-button @click="resetForm_u('ruleForm1')">取消</el-button>
            <el-button type="primary" @click="submitForm_u('ruleForm1')">确定</el-button>
          </el-form-item>
        </el-form>

        <!--微信头像-->
        <div class="weChats">
          <img :src="patientInfo.sex=='女'? woman : man" alt=""/>
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
            {{fileNumber}}<span style="opacity: 0;">1</span>
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
  </div>
</template>

<script>

  import man from '../../../images/patientManage/add_suif_pic_man.png'
  import woman from '../../../images/patientManage/add_suif_pic_woman.png'
  import funBus from '../../assets/js/funBus'

  export default {
    data() {
      return {
        interventionCount:0,
        followUpCount:0,
        //查看干預
        ifViewInter: false,
        healthInter_: "",
        man: man,
        woman: woman,
        foldet: "",
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        pickerOptions2: {
          disabledDate(time) {
            //return time.getTime() > Date.now();
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        m_typeWays: [],
        myIndex: 0,
        dataTime: "上午",
        doctor: "黄医生",
        customerCount: {},
        tableData3: [],
        tableData4: [],
        //是否干预
        inters: false,
        //是否执行
        plans: false,
        options: [],
        radio4: 1,
        checkedss: false,
        interTypes: [],
        patientInfo: {},
        patientSugarVo: {},
        //干预
        ruleForm: {
          typeWay: "",
          index: '',
          content: "",
          type: "",
          multi: [],
          recont: "",
          temName: "",
          setTime: ""
        },
        rules: {
          //干预
          type: [
            {required: true, message: '请选择干预类型', trigger: 'change'}
          ],
          typeWay: [
            {required: true, message: '请选择干预方式', trigger: 'change'}
          ],
          content: [
            {required: true, message: '请输入干预内容', trigger: 'blur'},
            {validator: funBus.validateIsNull, trigger: 'blur'}
          ],
          index: [
            {required: true, message: '请选择方案名称', trigger: 'change'}
          ],
          multi: [
            {type: 'array', required: true, message: '请重新选择患者', trigger: 'change'}
          ],
          recont: [
            {required: true, message: '请输入提醒内容', trigger: 'blur'},
            {validator: funBus.validateIsNull, trigger: 'blur'}
          ],
          temName: [
            {required: true, message: '请填写模板名称', trigger: 'blur'},
            {validator: funBus.validateIsNull, trigger: 'blur'}
          ],
          setTime: [
            {required: true, message: '请选择发送时间', trigger: 'blur'}
          ],
          //  随访
          name: [
            {required: true, message: '请输入患者姓名', trigger: 'blur'},
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
            {required: true, message: '请输入内容', trigger: 'blur'},
            {validator: funBus.validateIsNull, trigger: 'blur'}
          ],
          cause: [
            {required: true, message: '请输入内容', trigger: 'blur'},
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
        //随访
        ruleForm1: {
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
        templateType_: 0,//类别（0:私有，1:公有）
        fileNumber: "", //档案号码
        Executor: "",
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
        ],
        patientInfo1: "",
        isShowAddBtn: true, //是否显示添加患者按钮
        customerNoTestCount: '', // 7天未测量数目
        // 查看随访明细
        ifFolDetail: false,
        labelPos: "left",
      }
    },
    methods: {
      addPatient() { //新增患者
          this.$router.push("/patientManage/addPatient");
      },
      // 测量次数
      goToInfo(){
        // let startTime = today.split(' ')[0]+' 00:00:00'
        // let endTime = today.split(' ')[0]+' 23:59:59'
        this.$router.push({path:'/information'})
      },
      //建档人数跳转患者
      goToPatient(){
        let today = this.formatDate(Date.parse(new Date()))
        let startTime = today.split(' ')[0]+' 00:00:00'
        let endTime = today.split(' ')[0]+' 23:59:59'
        this.$router.push({path:'/patientManage',query:{startTime:startTime,endTime:endTime}})
      },
      //血糖偏向跳转 countType=1偏高，countType=2偏低
      goToSugarHighLow(countType){
        this.$router.push({path:'/sugerHighLow',query:{countType:countType}})
      },
      closeGan(){
        this.ifViewInter = false
      },
      /*--------------干预-----------------*/
      uiui(index) {
        this.tempId = this.options[index].templateId;
        var that = this;
        that.$api.queryById({userInterventionId:that.tempId},res=> {
          if (res.status == 200) {
            if (res.data.data) {
              that.ruleForm.content = res.data.data.content;
            }

          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      //干预
      intersMethod(row) {
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
        funBus.getPatients(that, row.customerId);

      },
      //关闭健康干预窗口
      beClose(formName) {
        this.$refs[formName].resetFields();
        this.inters = false;
      },
      //新建干预取消
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.inters = false;
      },
      //新建干预确定
      submitForm(formName) {
        var that = this;
        var name;
        var index;
        var temId;
        var realSendTime;
        //保存为模板否
        if (that.checkedss) {
          that.rules.index[0].required = false;
          name = that.ruleForm.temName;
          temId = "";
        } else {
          that.rules.index[0].required = true;
          index = that.ruleForm.index;
          if (that.options) {
            if (index !== '') {
              name = that.options[index].name;
            }
          }
          temId = that.tempId;
        }
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //立即发送还是定时发送
            if (that.radio4 == 1) {
              that.ruleForm.setTime = "";
              realSendTime = new Date();
            } else if (that.radio4 == 2) {
              realSendTime = '';
            }
            /*获取session信息*/
            var useInfo = sessionStorage.getItem('user');
            //获取机构ID
            var organizationId = JSON.parse(useInfo).organizationId
            var content = that.ruleForm.content;
        //		      var type = this.ruleForm.type;
            var seqNum = that.options.length + 1;
            var interType = that.mTypes;
            //新增干预
            var data = {
              "customerId": that.customerId_,
              "templateId": temId,
              "type": that.ruleForm.typeWay,//短信
              "name": name,
              "content": content,
              "planSendTime": that.ruleForm.setTime,
              "realSendTime": realSendTime,
              "interventionType": interType,
              "templateType": that.templateType_,//干预类型(0.待建议，1.成功 2.失败),
              "organId": organizationId,
              "seqNum": seqNum
            }
            //新增干预
            that.$api.intervenAdd(data, res=> {
              if (res.status == 200) {
                if (res.data.data) {
                  that.inters = false;
                  that.$refs[formName].resetFields();
                }
              }
            }).catch(function (err) {
              console.log(err)
            })
          }
        });
      },
      Radio(n) { // 干预类型改变事件
        this.mTypes = n;
        //获取干预方案名称
        funBus.getInterven(this,n);
        //清空选择的值
        this.ruleForm.index = "";
        this.ruleForm.content = "";
      },
      /*-------------end----------------*/
      /*--------------随访执行------------------*/
      //执行
      plansMethod(it) {
        this.plans = true
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
      //确定随访执行
      submitForm_u(formName) {
        var that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var result = that.ruleForm1.Fcontent;
            var planTime = that.ruleForm1.FollowTime;
            var data = {
              'followUpId': that.followUpId_,
              'result': that.ruleForm1.FollowCon,
              'realTime': that.ruleForm1.FollowTime,
              'realUserId': that.ruleForm1.FollowPer,
              'type': that.ruleForm1.FollowWay
            }

            this.$api.followExecute(data, res=> {
              if (res.status == 200) {
                if (res.data.code == 0) {
                  that.plans = false;
                  that.$refs[formName].resetFields();
                  //  初始化列表
                  let user = JSON.parse(sessionStorage.getItem('user'))
                  that.$api.followUp({userId:user.userId},result => {
                    let that_ = that
                    that_.tableData4 = [];
                    for (let i = 0; i < result.data.data.length; i++) {
                      //只展示未执行的列表
                      // if (result.data.data[i].followStatus == 2) {
                        let obj = {}
                        obj.patientName = result.data.data[i].patientName
                        obj.sex = result.data.data[i].sex;
                        obj.birthday = that_.jsGetAge(that_.formatDate(result.data.data[i].birthday))
                        obj.diabetesType = result.data.data[i].diabetesType
                        obj.followUpName = result.data.data[i].followUpName
                        obj.followUpId = result.data.data[i].followUpId
                        obj.customerId = result.data.data[i].customerId
                        obj.userCustomerId = result.data.data[i].userCustomerId
                        obj.fileNumber = result.data.data[i].fileNumber
                        obj.followStatus = result.data.data[i].followStatus;
                        that_.tableData4.push(obj)
                      // }
                    }
                  })
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
      //关闭随访执行
      closes_u(formName) {
        this.$refs[formName].resetFields();
        this.plans = false;
      },
      //取消随访执行
      resetForm_u(formName) {
        this.$refs[formName].resetFields();
        this.plans = false;
      },
      //字符检索
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      handleSelect(item) {
      },
      handleClick(row) {
        if (row.customerId) {
            this.$router.push({
                name: 'patientDetail',
                query: {
                    cusTomId: row.customerId,
                    userCusId: row.userCustomerId,
                    fileNumber: row.fileNumber
                }
            })
        }
      },
      /*------------------end-------------------*/
      /*------------------xwm-------------------*/
      /*------------------7天未测量-------------------*/
      // 获取7天未测量数目
      getWeekNoGaugedCount () {
        let _this = this;
        this.$api.getWeekNoGaugedCount({}, (res) => {
          _this.customerNoTestCount = res.data.data.customerNoTestCount;
        });
      },
      weekNoGauged () {
        console.log(123);
        this.$router.push({path:'/patientManage', query: {from: 'weekNoGauged'}});
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
      followAction (it) {
        if (it.followStatus == 2) {
          this.plansMethod(it)
        } else {
          this.See(it);
        }
      },
      //关闭随访明细
      closes_d(formName) {
        this.ifFolDetail = false;
      },
       //确定随访明细
      submitForm_d(formName) {
        this.ifFolDetail = false;
      }
    },
    created: function () {
      let user = JSON.parse(sessionStorage.getItem('user'));
      //刷新侧边栏和头部登录信息
      if(this.$parent.$refs.baseModel){
        this.$parent.$refs.baseModel.$refs.top.reloadTop();
        this.$parent.$refs.baseModel.$refs.leftNav.reloadNav();
      }
      this.isShowAddBtn = user.existDepartment; //是否显示添加患者按钮
      this.doctor = user.nickname;
      let _this = this;
      let dataUserId = {
        userId:user.userId
      }
      this.$api.customerCount(dataUserId, res =>{
        _this.customerCount = res.data.data
      })
      //干预
      this.$api.intervention(dataUserId, res => {
        this.tableData3 = res.data.data
        for (let i = 0; i < res.data.data.length; i++) {
          this.tableData3[i].birthday = res.data.data[i].birthday ? this.jsGetAge(this.formatDate(res.data.data[i].birthday)) : "无"
          this.tableData3[i].diabetesType = res.data.data[i].diabetesType != null ? res.data.data[i].diabetesType : "无"
          this.tableData3[i].patientName = res.data.data[i].patientName != null ? res.data.data[i].patientName : "无"
          this.tableData3[i].interventionName = res.data.data[i].interventionName != null ? res.data.data[i].interventionName : "无"
          this.tableData3[i].sex = res.data.data[i].sex != null ? res.data.data[i].sex : "无"
        }
        this.interventionCount = res.data.data.length
      })
      //随访
      this.$api.followUp(dataUserId, result => {
        let that = this
        for (let i = 0; i < result.data.data.length; i++) {
          //只展示未执行的列表
          // if (result.data.data[i].followStatus == 2) {
            let obj = {}
            obj.patientName = result.data.data[i].patientName != null ? result.data.data[i].patientName : "无"
            obj.sex = result.data.data[i].sex != null ? result.data.data[i].sex : "无"
            obj.birthday = result.data.data[i].birthday != null ? that.jsGetAge(that.formatDate(result.data.data[i].birthday)) : "无"
            obj.diabetesType = result.data.data[i].diabetesType != null ? result.data.data[i].diabetesType : "无"
            obj.followUpName = result.data.data[i].followUpName != null ? result.data.data[i].followUpName : "无"
            obj.followUpId = result.data.data[i].followUpId
            obj.customerId = result.data.data[i].customerId
            obj.userCustomerId = result.data.data[i].userCustomerId
            obj.fileNumber = result.data.data[i].fileNumber
            obj.followStatus = result.data.data[i].followStatus;
            that.tableData4.push(obj)
          // }
        }
        this.followUpCount = result.data.data.length
      })
      // 获取7天未测量总数
      this.getWeekNoGaugedCount();
    }
  }
</script>
<style lang="less" scoped>
  .homePage {
    position: absolute;
    top: 60px;
    width: 89.5%;
    left: 160px;
    padding: 19px 0 19px 20px;
    background: #f7f8fa;
    .special {
      font-size: 14px;
      span {
        color: #267BF7;
      }
    }
    .homePage-top {
      border: 1px solid #eff2f5;
      width: 100%;
      box-sizing: border-box;
      height: 180px;
      background-color: #ffffff;
      padding: 20px;
      margin-top: 19px;
      p {
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 24px;
      }
      ul {
        margin-top: 14px;
        height: auto;
        overflow: hidden;
        width: 70%;
        padding-left: 11%;
        li {
          float: left;
          width: 20%;
          list-style: none;
          text-align: center;
          dl {
            font-size: 18px;
            display: inline-block;
            cursor: pointer;
            dt {
              line-height: 60px;
              span {
                font-size: 30px;
              }
              .one {
                color: #267bf7;
              }
              .two {
                color: #00c2b1;
              }
              .three {
                color: #ac76e4;
              }
              .four {
                color: #44a3df;
              }
              .five {
                color: #e95959;
              }
              .six {
                color: #e98559;
              }
              .seven {
                color: #99D200;
              }
            }
          }
        }
      }
    }
    .homePage-center, .homePage-bottom {
      height: 610px;
      width: 100%;
      margin-top: 19px;
      .center-left, .bottom-left {
        width: 49.5%;
        float: left;
        background-color: #ffffff;
        height: 100%;
        border: 1px solid #eff2f5;
      }
      .center-right, .bottom-right {
        width: 49.5%;
        float: right;
        background-color: #ffffff;
        height: 100%;
        border: 1px solid #eff2f5;
      }
      .title {
        line-height: 52px;
        border-bottom: 1px solid #f1f1f1;
        padding-left: 20px;
        font-size: 15px;
        font-weight: bold;
      }
    }
  }
</style>
<!--干预-->
<style>
  .el-table--border td, .el-table--border th {
    border-right: 0 !important;
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
    left: 50%;
    margin-left: -420px;
    margin-top: -274px; */
    width: 840px;
    /*height: 548px;*/
    background-color: #ffffff;
    border-radius: 8px;
  }

  .manage {
    position: absolute;
    top: 60px;
    left: 160px;
  }

  .block {
    /*height: 90px;*/
    text-align: right;
    margin-top: 20px;
  }

  .main {
    padding: 20px 0;
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
    padding: 21px 0;
    border-bottom: 1px solid #f1f1f1;
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

  .manage {
    padding: 19px 20px;
    background: #f7f8fa;
  }

  h3 {
    font-size: 14px;
    color: #267bf7;
  }

  .manages {
    border: 1px solid #dddddd;
    width: 1661px;
    height: 851px;
    background-color: #ffffff;
    padding: 20px;
    margin-top: 19px;
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
</style>
<!--随访-->
<style scoped>
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
    width: 30px;
  }

  .abouts ol li:nth-child(3) {
    width: 80px;
  }

  .abouts ol li:nth-child(4) {
    width: 140px;
  }

  .abouts ol li:nth-child(5) {
    width: 190px;
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
    left: 50%; */
    /*height: 548px;*/
    background-color: #ffffff;
    border-radius: 8px;
  }

  .followPlan {
    width: 840px;
  }

  .CanFollow {
    /* transform:translate(-50%,-55%); */
    width: 698px;
  }

  .items {
    width: 100%;
    height: 160px;
    padding: 20px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #C4C4C4;
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

  /* .right{
    height: 100%;
    float: left;
    display: inline-block;
  }
  .right p{
    display: block;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 18px;
    letter-spacing: 0px;
    color: #333333;
  }
  .right ul{
    width: 100%;
    height: 30px;
    display: block;
  }
  .right .ul_1 li{
    margin-right: 46px;
  }
  .right .ul_2{
    height: 40px;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #666666;
  }
  .right .ul_2 li{
    margin-right: 43px;
  }
  .right ul li{
    float: left;
  }
  .right ul li span{
    width: 44px;
    height: 24px;
    display: inline-block;
    text-align: center;
    line-height: 24px;
    cursor:pointer;
    font-size: 14px;
    border-radius: 4px;
    border: solid 1px #cecece;
  } */
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
    /* margin-left: -420px;
    margin-top: -274px; */
    width: 840px;
    /*height: 548px;*/
    background-color: #ffffff;
    border-radius: 8px;
  }

  .followUps {
    position: absolute;
    top: 60px;
    left: 160px;
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
    padding: 21px 0;
    border-bottom: 1px solid #f1f1f1;
  }

  .addPlane {
    float: right;
    right: 20px;
    color: white;
    cursor: pointer;
    line-height: 28px;
    text-align: center;
    width: 80px;
    height: 28px;
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
    padding: 19px 20px;
    background: #f7f8fa;
  }

  h3 {
    font-size: 14px;
    color: #267bf7;
  }

  .followUpss {
    border: 1px solid #dddddd;
    width: 1661px;
    background-color: #ffffff;
    padding: 20px;
    margin-top: 19px;
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

  .tableContent {
    padding: 20px;
  }
  .ViewInters .el-form .el-form-item, .RemiDeta .el-form .el-form-item {
    min-width: 200px;
    display: inline-block;
  }
  .ViewInter h5 {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #111111;
  }
  .ViewInter {
    padding: 17px;
    position: fixed;
    /* top: 50%;
        left: 50%; */
    width: 840px;
    /*height: 548px;*/
    background-color: #ffffff;
    border-radius: 8px;
  }
  .ViewInters {
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
  .addPatientBox {
    height: 180px;
    width:210px;
    background-color: #f7f8fa;
  }
  .addPatient {
    float: right;
    color: #fff;
    cursor: pointer;
    text-align: center;
    width: 180px;
    height: 180px;
    line-height: 180px;
    font-size: 14px;
    border-radius: 4px;
    background: url('../../../images/homePage/home_xzhz.png') no-repeat;
    background-size: cover;
  }
</style>

