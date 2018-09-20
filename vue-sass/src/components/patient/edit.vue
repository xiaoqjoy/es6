<template>
  <div>
    <!-- 患者编辑页面 -->
    <div class="positionContent" id="editPatient">
      <div>
        <router-link to="/patientManage" class="label-patient-manager">患者管理</router-link>
        <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
        <label class="label-patient-manager" @click="return_">患者详情</label>
        <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
        <label class="label-add-patient"> 编辑档案</label>
        <span class="btn-back" @click="return_">返回</span>
      </div>

      <!-- 基本信息 -->
      <div class="container-base-info contentBorder">
        <label class="label-base-info">基本信息</label>
        <div class="line-divider"></div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top" label-width="110px" class="demo-ruleForm1" onsubmit="return false;">
          <el-form-item label="手机号" prop="phone">
            <el-input v-model.trim="ruleForm.phone" :disabled="true" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="patientName">
            <el-input v-model.trim="ruleForm.patientName" maxlength="50" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="idCard">
            <el-input v-model.trim="ruleForm.idCard" size="medium" clearable :maxlength="18" @blur="handleBirthdayAgeSex"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker v-model="ruleForm.birthday" :disabled="isExistIdCare" type="date" :editable="false" placeholder="选择日期时间" size="medium" :picker-options="pickerOptionsBirth">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model.trim="ruleForm.age" :disabled="isExistIdCare" maxlength="10" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm.sex" :disabled="isExistIdCare" size="medium">
              <el-radio label="1">男</el-radio>
              <el-radio label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="婚姻状态" prop="maritalStatus">
            <el-col>
              <el-select v-model="ruleForm.maritalStatus" placeholder="请选择" size="medium">
                <el-option v-for="item in maritalStatusArr" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">
                  {{item.itemValue}}
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="职业" prop="job">
            <el-col>
              <el-select v-model="ruleForm.job" placeholder="请选择" size="medium">
                <el-option v-for="(item,index) in jobArr" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">
                  {{item.itemValue}}
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="家庭住址" style="width: 65%!important;">
            <el-col class="grid4">
              <el-select v-model="prov" placeholder="省份" size="medium" @change="changeProv">
                <el-option v-for="(item,index) in arr" :key="index" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </el-col>
            <el-col class="gutter">-</el-col>
            <el-col class="grid4">
              <el-select v-model="city" placeholder="市" size="medium" @change="changeCity">
                <el-option v-for="(item,index) in cityArr" :key="index" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </el-col>
            <el-col class="gutter">-</el-col>
            <el-col class="grid4">
              <el-select v-model="district" placeholder="区/县" size="medium">
                <el-option v-for="(item,index) in districtArr" :key="index" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </el-col>
            <el-col class="gutter">-</el-col>
            <el-col class="grid4_">
              <el-input v-model.trim="ruleForm.address" placeholder="详细地址" size="medium"></el-input>
            </el-col>
          </el-form-item>

        </el-form>
      </div>

      <!-- 病例信息 -->
      <div class="container-base-info contentBorder">
        <label class="label-base-info">病例信息</label>
        <div class="line-divider"></div>
        <el-form :model="casesInfo" ref="casesInfo" label-position="top" label-width="110px" class="demo-ruleForm1 casesInfo" onsubmit="return false;">
          <div>
            <el-form-item label="糖尿病类型">
              <el-select v-model="casesInfo.diseaseType" placeholder="请选择" size="medium">
                <el-option v-for="(item,index) in diabetesTypeArr" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">
                  {{item.itemValue}}
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="确诊时间">
              <el-date-picker v-model="casesInfo.timeDiag" type="date" :editable="false" size="medium" placeholder="选择日期时间" :picker-options="pickerOptionsTimeDiag">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="身高（cm）">
              <el-input type="number" v-model="casesInfo.height" size="medium" min="20" max="240" @change="getBMI"></el-input>
            </el-form-item>
            <el-form-item label="体重（kg）">
              <el-input type="number" v-model="casesInfo.weight" size="medium" min="5" max="200" @change="getBMI"></el-input>
            </el-form-item>
            <el-form-item label="BMI指数" style="width: 33%!important;">
              <span :class="{'fonts':!casesInfo.BMI}">{{casesInfo.BMI?casesInfo.BMI:'请完善身高体重'}}</span>
            </el-form-item>
          </div>
          <el-form-item label="并发症" class="width100">
            <el-checkbox-group v-model="casesInfo.complica" class="complicationsArr" @change='handleComplications'>
              
              <el-checkbox v-for="item in complicationsArr" :label="item.itemKey" :key="item.itemKey" 
                :disabled="item.itemKey==1?isNotComplica:isComplica" 
                @change="item.itemKey==0?otherComplicaChange($event):''">
                {{item.itemValue}}
              </el-checkbox>
              <el-input v-model.trim="casesInfo.complicationsRemark" :disabled="!isOtherCompli" maxlength="100" placeholder="请填写其他内容" style="width: 200px;" size="small"></el-input>
            </el-checkbox-group>
            <!--<div style="margin-top: 10px;">其它：-->
            <!--</div>-->
          </el-form-item>
          <el-form-item label="治疗方式" class="width100">
            <el-radio-group v-model="casesInfo.isTreatment" size="medium" @change="isTreatment">
              <el-radio label="true">无</el-radio>
              <el-radio label="false">有</el-radio>
            </el-radio-group>
            <el-input v-model.trim="casesInfo.treatmentTypeStr" :disabled="casesInfo.isTreatment=='true'" maxlength="100" size="medium" class="width100"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <!-- 生活习惯 -->
      <div class="container-base-info contentBorder">
        <label class="label-base-info">生活习惯</label>
        <div class="line-divider"></div>
        <el-form label-position="top" label-width="100px" class="demo-ruleForm1 habits">
          <el-form-item label="劳动强度">
            <el-select v-model="habits.labourIntensity" placeholder="请选择" size="medium">
              <el-option v-for="item in labourIntensityArr" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">{{item.itemValue}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="锻炼情况">
            <el-select v-model="habits.exerciseFrequency" placeholder="请选择" size="medium">
              <el-option v-for="item in exerciseFrequencyArr" :key="item.itemId" :label="item.itemValue" :value="item.itemKey">{{item.itemValue}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="夜间睡眠模式">
            <el-select v-model="habits.sleepStatus" placeholder="请选择" size="medium">
              <el-option v-for="item in sleepStatusArr" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">{{item.itemValue}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="平时情绪">
            <el-select v-model="habits.peacetimeEmotion" placeholder="请选择" size="medium">
              <el-option v-for="item in peacetimeEmotionArr" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">{{item.itemValue}}</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="饮食偏好" style="width: 33%!important;">
            <el-select v-model="habits.foodHabit" :multiple="true" placeholder="请选择" size="medium">
              <el-option v-for="item in foodHabitArr" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">{{item.itemValue}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="饮酒情况（mL/d）" style="width: 49%!important;">
            <el-col class="grid3">
              <el-select v-model="habits.drinkingStatus" placeholder="请选择" size="medium" @change="drinkStatu">
                <el-option v-for="item in drinkingStatusArr" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">{{item.itemValue}}</el-option>
              </el-select>
            </el-col>
            <el-col class="gutter" v-show="habits.drinkingStatus&&habits.drinkingStatus!=1">-</el-col>
            <el-col class="grid3"  v-show="habits.drinkingStatus&&habits.drinkingStatus!=1">
              <el-select v-model="habits.drinkingType" placeholder="请选择酒类" @blur="readV" :disabled="habits.drinkingStatus==1" size="medium">
                <el-option v-for="item in drinkingTypeArr" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">{{item.itemValue}}</el-option>
              </el-select>
            </el-col>
            <el-col class="gutter" v-show="habits.drinkingType">-</el-col>
            <el-col class="grid3" v-show="habits.drinkingType">
              <el-input type="number" v-model.trim="habits.drinkingDaily" min="0" max="9999" @blur="readV" @change="changeDrinkingDaily" :disabled="habits.drinkingStatus==1" placeholder="计量(毫升/天)" size="medium"></el-input>
            </el-col>
          </el-form-item>

          <el-form-item label="吸烟情况" style="width: 49%!important;">
            <el-col class="grid3">
              <el-select v-model="habits.smokingStatus" placeholder="请选择" @change="smokSta" size="medium">
                <el-option v-for="item in smokingStatusArr" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">{{item.itemValue}}</el-option>
              </el-select>
            </el-col>
            <el-col class="gutter" v-show="habits.smokingStatus&&habits.smokingStatus!=1">-</el-col>
            <el-col class="grid2" v-show="habits.smokingStatus==2">
              <el-input v-model.trim="habits.smokingRemark" :disabled="habits.smokingStatus==1" maxlength="100" placeholder="请填写戒烟前抽烟情况" size="medium"></el-input>
            </el-col>
            <el-col class="grid4" v-show="habits.smokingStatus==3">
              <el-input type="number" v-model.trim="habits.smokingDaily" min="0" max="999" @change="changeSmokingDaily" :disabled="habits.smokingStatus==1" size="medium"></el-input>
            </el-col>
            <el-col class="grid4">
              <label class="label-info" v-show="habits.smokingStatus==3">&nbsp;支/每天</label>
            </el-col>
          </el-form-item>

        </el-form>
      </div>
      <!-- 健康综述 -->
      <div class="container-base-info contentBorder">
        <label class="label-base-info">健康综述</label>
        <div class="line-divider"></div>
        <el-input type="textarea" resize="none" v-model.trim="healthReview" :rows="8" size="medium" placeholder="填写详细综述" style="margin: 0 30px; width: calc(100% - 60px)"></el-input>
      </div>
      <!-- 备注 -->
      <div class="container-base-info contentBorder">
        <label class="label-base-info">备注</label>
        <div class="line-divider"></div>
        <el-input type="textarea" resize="none" v-model.trim="remark" :rows="8" size="medium" placeholder="填写备注" style="margin: 0 30px; width: calc(100% - 60px)"></el-input>
      </div>

      <div style="height: 135px;"></div>
      <div class="div-bottom">
        <el-button size="medium " @click="return_">取消</el-button>
        <el-button size="medium " type="primary" @click="submitForm('ruleForm')">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import data from "../common/cityData.js";
  import funBus from '../../assets/js/funBus';

  export default {
    name: "edit",
    data() {
      //判断出生日期是否与身份证号码一致，并以身份证为主
      let ifBir = (rule, value, callback) => {

        if (this.ruleForm.birthday && this.ruleForm.idCard) {
          let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;

          if (reg.test(this.ruleForm.idCard) === true) {
            //18位身份证时
            if (this.ruleForm.idCard.length == 18) {
              let y_1 = new Date(this.ruleForm.birthday).getFullYear() - 0;
              let m_1 = new Date(this.ruleForm.birthday).getMonth() + 1 - 0;
              let d_1 = new Date(this.ruleForm.birthday).getDate() - 0;

              let y_2 = this.ruleForm.idCard.substring(6, 10) - 0;
              let m_2 = this.ruleForm.idCard.substring(10, 12) - 0;
              let d_2 = this.ruleForm.idCard.substring(12, 14) - 0;

              if (y_1 == y_2 && m_1 == m_2 && d_1 == d_2) {
                callback();
              } else {
                callback(new Error('身份证和出生日期不匹配'));
              }
            }
            //15位身份证时
            else if (this.ruleForm.idCard.length == 15) {
              let y_1 = new Date(this.ruleForm.birthday).getYear() - 0;
              if (y_1 > 100) {
                y_1 = y_1 - 100;
              }
              let m_1 = new Date(this.ruleForm.birthday).getMonth() + 1 - 0;
              let d_1 = new Date(this.ruleForm.birthday).getDate() - 0;

              let y_2 = this.ruleForm.idCard.substring(6, 8) - 0;
              let m_2 = this.ruleForm.idCard.substring(8, 10) - 0;
              let d_2 = this.ruleForm.idCard.substring(10, 12) - 0;

              if (y_1 == y_2 && m_1 == m_2 && d_1 == d_2) {
                callback();
              } else {
                callback(new Error('身份证和出生日期不匹配'));
              }
            } else {
              callback();
            }
          } else {
            callback();
          }

        } else {
          callback();
        }
      };
      return {
        pickerOptionsBirth: { //出生日期快捷选项配置
          disabledDate: (time) => {
            if (this.casesInfo.timeDiag != "") {
              return time.getTime() > Date.now() || time.getTime() > this.casesInfo.timeDiag;
            } else {
              return time.getTime() > Date.now();
            }
          }
        },
        pickerOptionsTimeDiag: { //确诊时间快捷选项配置
          disabledDate: (time) => {
            return time.getTime() < this.ruleForm.birthday || time.getTime() > Date.now();
          }
        },
        arr: data, //省市区数据
        prov: '', //省份
        city: '', //市
        district: '', // 区/县
        cityArr: [], //“市”数组
        districtArr: [], // “区/县”数组
        diabetesTypeArr: [], //糖尿病类型,
        drinkingTypeArr: [], //饮酒类型
        exerciseFrequencyArr: [], //锻炼频率
        sleepStatusArr: [], //睡眠情况
        foodHabitArr: [], //饮食偏好数组        
        peacetimeEmotionArr: [], //平时情绪数组
        labourIntensityArr: [], //劳动强度数组
        smokingStatusArr: [], //吸烟情况数组
        drinkingStatusArr: [], //饮酒情况数组
        complicationsArr: [], //并发症数组
        maritalStatusArr: [], //婚姻情况             
        remark: "", // 备注
        healthReview: '', //健康综述
        jobArr: [], // 职业数组
        ruleForm: { //基本信息
          patientName: '',
          sex: "", //性别：1男、2女
          phone: "", //手机号
          idCard: "", //身份证号
          birthday: "", //出生日期
          deviceId: '',
          age: '', //年龄
          maritalStatus: "", //婚姻状况
          job: "", //职业
          address: "", //详细地址
          //GlycatedHemoglobin: '', //糖化血红蛋白
          //bloodSugar: '', //空腹血糖
          //glucoseTest: '', //葡萄糖耐受实验2h血糖
        },
        casesInfo: { //病例信息
          diseaseType: "", //所选糖尿病类型
          height: "", //身高
          weight: "", //体重
          BMI: "",
          complica: [], //并发症
          complicationsRemark: '', //并发症其他项
          isTreatment: 'true', // 有无(过去)治疗方式：true-无；false-有
          treatmentTypeStr: '', //治疗方式
          timeDiag: "", //确诊时间
          //heartRate: '', //心率
          //systolicPressure: '', //收缩压
          //diastolicPressure: '', //舒张压
        },
        habits: { //生活习惯
          labourIntensity: '', //所选劳动强度（0.重度 1.中度 2.轻度 3.非劳动/卧床）
          exerciseFrequency: '', //所选锻炼情况
          sleepStatus: '', //所选夜间睡眠模式
          peacetimeEmotion: '', //所选平时情绪
          foodHabit: [], //所选饮食偏好
          drinkingStatus: '', //所选饮酒情况
          drinkingType: "", //所选酒类
          drinkingDaily: "", //饮酒量
          smokingStatus: '', //所选吸烟情况
          smokingDaily: "", // 吸烟频率
          smokingRemark: "", // 戒烟说明
        },
        rules: {
          birthday: [{
            validator: ifBir,
            trigger: 'blur'
          }],
          idCard: [{
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/,
            message: '证件号码格式有误！',
            trigger: 'blur'
          }],
          patientName: [{
              required: true,
              message: '请输入姓名',
              trigger: 'change'
            },
            {
              validator: funBus.validateIsNull,
              trigger: 'change'
            }
          ]
        },
        height: null, //身高
        weight: null, //体重
        DepartmentList: '', //科室列表
        isAdmin: false, //是否管理员
        doctorList: [], // 医生列表
        nurseList: [], // 护士列表
        restaurants: [],
        customerId: '', //患者id
        //userCustomerId: '', //公众号患者id
        isComplica: false, //有无并发症：true-无；false-有
        isOtherCompli: false,
        isNotComplica: false,
        isExistIdCare: false, //是否存在身份证号
      }
    },
    computed: {
      calcBMI() { // 计算bmi值
        return (this.casesInfo.weight / ((this.casesInfo.height / 100) * (this.casesInfo.height / 100))).toFixed(1);
      }
    },
    created() {
      let vm = this;
      
      funBus.initLoadDictionaryItem(vm); //初始化加载字典项目

      let params = vm.$route.query;
      if (JSON.stringify(params) != "{}") {
        vm.customerId = params.cusTomId;
        //vm.userCustomerId = params.userCusId;
        vm.fileNumber = params.fileNumber;
        vm.patientSugarId = params.patientSugId;
        vm.patientId = params.patientId;

        //获取患者信息
        if (vm.customerId) {
          let data = {
            customerId: vm.customerId,
            //userCustomerId: vm.userCustomerId
          }
          vm.getPatientInfo(data);
        }
      }
    },
    methods: {
      //酒量change事件
      changeDrinkingDaily() {
        let drinkingDaily = this.habits.drinkingDaily;
        drinkingDaily = drinkingDaily > 9999 ? 9999 : drinkingDaily;
        drinkingDaily = drinkingDaily < 0 ? 0 : drinkingDaily;
        this.habits.drinkingDaily = drinkingDaily;
      },
      //吸烟量change事件
      changeSmokingDaily() {
        let smokingDaily = this.habits.smokingDaily;
        smokingDaily = smokingDaily > 999 ? 999 : smokingDaily;
        smokingDaily = smokingDaily < 0 ? 0 : smokingDaily;
        this.habits.smokingDaily = smokingDaily;
      },
      readV(){
        var n = this.habits.drinkingStatus;
        if(!n){
          this.$message('请先选中饮酒情况！');
        }
      },
      //获取出生日期与年龄
      handleBirthdayAgeSex() {
        let pattern = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;
        if (!pattern.test(this.ruleForm.idCard)) { //验证身份证号
          this.ruleForm.birthday = '';
          this.ruleForm.age = '';
          this.ruleForm.sex = '';
          this.isExistIdCare = false;
        } else {
          this.ruleForm.birthday = this.getBirthday(this.ruleForm.idCard);
          this.ruleForm.age = this.ruleForm.birthday ? this.jsGetAge(this.ruleForm.birthday) : '';
          this.isExistIdCare = true;
        }
      },
      //根据身份证号获取出生日期、性别
      getBirthday(idCard) {
        let y = '',
          m = '',
          d = '',
          sex = '';
        if (idCard.length == 18) { //18位身份证号
          y = idCard.substring(6, 10);
          m = idCard.substring(10, 12);
          d = idCard.substring(12, 14);
          sex = idCard.substr(-2, 1);
        } else if (idCard.length == 15) { //15位身份证号
          y = '19' + idCard.substring(6, 8);
          m = idCard.substring(8, 10);
          d = idCard.substring(10, 12);
          sex = idCard.substr(-1);
        } else {
          return ''
        }
        this.ruleForm.sex = sex % 2 == 0 ? '2' : '1'; // 性别：奇数为男,偶数为女
        return y + '-' + m + '-' + d;
      },
      //治疗方式change事件
      isTreatment(val) {
        if (val == 'true') {
          this.casesInfo.treatmentTypeStr = '';
        }
      },
      //并发症 "其他"项的change事件
      otherComplicaChange(val) {
        if (val) {
        	this.isOtherCompli = true;
        }else {
          this.isOtherCompli = false;
          this.casesInfo.complicationsRemark = '';
        }
      },
      //处理并发症名称的显示
      handleComplications() {
        let vm = this;
        let com = vm.casesInfo.complica;
        vm.isComplica = false;
        vm.isOtherCompli = false;
        
        //验证并发症选中值内是否选有“无”
        for(let i=0, len = com.length; i < len; i++) {
          if(com[i] === 1) {
            vm.casesInfo.complica = [1];
            vm.casesInfo.complicationsRemark = '';
            vm.isComplica = true;
            vm.isOtherCompli = false;
            break;
          }
        }
        
        //验证并发症选中值内是否选有“其他”
        for(let i=0, len = com.length; i < len; i++) {
          if(com[i] === 0) {
            vm.isOtherCompli = true;
            break;
          }
        }

      },
      //获取患者信息
      getPatientInfo(data) {
        let that = this;
        that.$api.getPatientInfo(data, res => {
          if (res.status === 200) {

            let patientBaseVo = res.data.data.patientBaseVo;
            let patientSugarVo = res.data.data.patientSugarVo;

            that.ruleForm.patientName = patientBaseVo.patientName !== null ? patientBaseVo.patientName : ""; //姓名
            that.ruleForm.sex = patientBaseVo.sex !== null ? String(patientBaseVo.sex) : ""; //性别
            that.ruleForm.birthday = patientBaseVo.birthday !== null ? patientBaseVo.birthday : ""; //出生日期
            if (patientBaseVo.idCard) {
              that.ruleForm.idCard = patientBaseVo.idCard !== null && patientBaseVo.idCard !== '' ? patientBaseVo.idCard : ""; //身份证
              that.handleBirthdayAgeSex(); //根据身份证号获取出生日期与年龄
            }
            that.ruleForm.phone = patientBaseVo.phone !== null ? patientBaseVo.phone : ""; //手机号

            that.ruleForm.address = patientBaseVo.address != null ? patientBaseVo.address : ''; //详细地址
            that.ruleForm.maritalStatus = patientBaseVo.maritalStatus !== null ? patientBaseVo.maritalStatus : ""; //婚姻状态
            that.ruleForm.job = patientBaseVo.job !== null ? patientBaseVo.job : ""; //职业

            that.casesInfo.height = patientBaseVo.height !== null ? patientBaseVo.height : ""; //身高
            that.casesInfo.weight = patientBaseVo.weight !== null ? patientBaseVo.weight : ""; //体重
            that.getBMI(); //BMI

            //省市区
            that.prov = patientBaseVo.province != null ? patientBaseVo.province : ''; //
            that.city = patientBaseVo.city != null ? patientBaseVo.city : ''; //
            that.district = patientBaseVo.district != null ? patientBaseVo.district : ''; //
            that.updateCity();
            that.updateDistrict();

            that.ruleForm.deviceId = patientSugarVo.deviceId !== null ? patientSugarVo.deviceId : ''; //设备编码
            that.casesInfo.diseaseType = patientSugarVo.diabetesType !== null ? patientSugarVo.diabetesType : ''; //糖尿病类型
            that.casesInfo.timeDiag = patientSugarVo.ensureDate !== null ? patientSugarVo.ensureDate : ''; //确诊时间
            that.casesInfo.complicationsRemark = patientSugarVo.complicationsRemark !== null ? patientSugarVo.complicationsRemark : ''; //其他并发症
            
            //并发症
            let complicaTemp = patientSugarVo.complications !== null && patientSugarVo.complications !== '' ? patientSugarVo.complications.split(",") : [];
            if (complicaTemp.length > 0) { //有并发症
              that.casesInfo.complica = complicaTemp.map(Number); //string数组转int数组
              that.handleComplications(); //处理并发症名称的显示
            } else { //无并发症
              that.casesInfo.complica = [];
            }

            //治疗方式
            let treatmentTypeStr = patientSugarVo.treatmentTypeStr !== null && patientSugarVo.treatmentTypeStr !== '' ? patientSugarVo.treatmentTypeStr : "";
            if (treatmentTypeStr) { //有无 治疗方式
              that.casesInfo.isTreatment = 'false';
              that.casesInfo.treatmentTypeStr = treatmentTypeStr;
            } else {
              that.casesInfo.isTreatment = 'true';
            }

            //劳动强度
            that.habits.labourIntensity = patientBaseVo.labourIntensity !== null ? patientBaseVo.labourIntensity : "";
            //吸烟情况
            that.habits.smokingStatus = patientBaseVo.smokingStatus !== null ? patientBaseVo.smokingStatus : "";
            //吸烟频率
            that.habits.smokingDaily = patientBaseVo.smokingDaily !== null ? patientBaseVo.smokingDaily : "";
            //已戒烟说明
            that.habits.smokingRemark = patientBaseVo.smokingRemark !== null ? patientBaseVo.smokingRemark : "";
            //饮酒
            that.habits.drinkingStatus = patientBaseVo.drinkingStatus !== null ? patientBaseVo.drinkingStatus : "";
            //饮酒类型
            that.habits.drinkingType = patientBaseVo.drinkingType !== null ? patientBaseVo.drinkingType : "";
            //饮酒量
            that.habits.drinkingDaily = patientBaseVo.drinkingDaily !== null ? patientBaseVo.drinkingDaily : "";
            //锻炼情况
            that.habits.exerciseFrequency = patientBaseVo.exerciseFrequency !== null ? patientBaseVo.exerciseFrequency : "";
            //睡眠模式
            that.habits.sleepStatus = patientBaseVo.sleepStatus !== null ? patientBaseVo.sleepStatus : "";
            //饮食偏好
            let foodHabit = patientBaseVo.foodHabit ? patientBaseVo.foodHabit.split(",") : "";
            if (foodHabit) {
              let temp = [];
              foodHabit.forEach(function (item) {
                temp.push(JSON.parse(item))
              });
              that.habits.foodHabit = temp;
            } else {
              that.habits.foodHabit = [];
            }
            //平时情绪
            that.habits.peacetimeEmotion = patientBaseVo.peacetimeEmotion !== null ? patientBaseVo.peacetimeEmotion : "";
            //健康综述
            that.healthReview = patientBaseVo.healthReview ? patientBaseVo.healthReview : "";
            //备注
            that.remark = patientBaseVo.remark !== null ? patientBaseVo.remark : "";
          }
        }, res => {
          that.$message(res.data.errMsg || res.data.data);
        })
      },
      // 省份选择
      changeProv(val) {
        this.cityArr = [];
        this.districtArr = [];
        this.city = '';
        this.district = '';
        this.prov = val;
        if (val != "选择省份") {
          this.updateCity();
          this.updateDistrict();
        }
      },
      // 城市选择
      changeCity(val) {
        this.city = val;
        this.district = '';
        this.updateDistrict();
      },
      //根据省份更新城市
      updateCity() {
        for (let i in this.arr) {
          let obj = this.arr[i];
          if (obj.name == this.prov) {
            this.cityArr = obj.sub;
            break;
          }
        }
        if (!this.city) { //没有加载患者
          if (this.cityArr && this.cityArr.length > 0 && this.cityArr[1].name) {
            this.city = this.cityArr[1].name;
          } else {
            this.city = '';
          }
        }
      },
      // 根据城市更新区域
      updateDistrict() {
        for (let i in this.cityArr) {
          let obj = this.cityArr[i];
          if (obj.name == this.city) {
            this.districtArr = obj.sub;
            break;
          }
        }
        if (!this.district) {
          if (this.districtArr && this.districtArr.length > 0 && this.districtArr[1].name) {
            this.district = this.districtArr[1].name;
          } else {
            this.district = '';
          }
        }
      },
      //饮酒选择
      drinkStatu(n) {
        if (n == 1) { //从不饮酒
          this.habits.drinkingDaily = '';
          this.habits.drinkingType = '';
        }
      },
      // 抽烟选择
      smokSta(n) {
        switch (n) {
          case 1: //从不吸烟
            this.habits.smokingDaily = "";
            this.habits.smokingRemark = "";
            break;
          case 2: //已戒烟
            this.habits.smokingDaily = "";
            break;
          case 3: //吸烟
            this.habits.smokingRemark = "";
            break;
        }
      },
      // 取消
      return_() {
        //this.$router.back(-1);
        this.$router.go(-1)
      },
      //确认提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            this.openLoading();

            let vm = this;

            let data = {
              patientBaseVo: {
                customerId: vm.customerId,
                patientName: vm.ruleForm.patientName,
                sex: vm.ruleForm.sex,
                birthday: vm.ruleForm.birthday,
                height: vm.casesInfo.height,
                weight: vm.casesInfo.weight,
                bmi: vm.casesInfo.BMI,
                idCard: vm.ruleForm.idCard,
                phone: vm.ruleForm.phone,
                maritalStatus: vm.ruleForm.maritalStatus, //婚姻情况
                job: vm.ruleForm.job, //职业
                province: vm.prov, //
                city: vm.city, //
                district: vm.district, //
                address: vm.ruleForm.address, //家庭住址 省 市 区/县 地址,70.

                labourIntensity: vm.habits.labourIntensity, //劳动强度（0.重度 1.中度 2.轻度 3.非劳动/卧床）,
                drinkingStatus: vm.habits.drinkingStatus, //饮酒情况,
                drinkingType: vm.habits.drinkingType, //饮酒类型,
                drinkingDaily: vm.habits.drinkingDaily ? JSON.parse(vm.habits.drinkingDaily) : '', //饮酒量,
                foodHabit: vm.habits.foodHabit ? vm.habits.foodHabit.toString() : '', // 饮食习惯
                peacetimeEmotion: vm.habits.peacetimeEmotion, // 情绪情况
                exerciseFrequency: vm.habits.exerciseFrequency, //锻炼情况
                remark: vm.remark,
                healthReview: vm.healthReview, //健康综述
                smokingStatus: vm.habits.smokingStatus, //吸烟情况
                smokingRemark: vm.habits.smokingRemark, //戒烟说明
                smokingDaily: vm.habits.smokingDaily ? JSON.parse(vm.habits.smokingDaily) : '', //吸烟量
                sleepStatus: vm.habits.sleepStatus, //睡眠模式
                patientId: vm.patientId, //患者ID,
              },
              patientSugarVo: {
                diabetesType: vm.casesInfo.diseaseType, // 糖尿病类型
                ensureDate: vm.casesInfo.timeDiag, // 确诊日期,
                complications: vm.casesInfo.complica.join(','), // 并发症,
                complicationsRemark: vm.casesInfo.complicationsRemark, // 其他并发症,
                treatmentTypeStr: vm.casesInfo.treatmentTypeStr, //治疗方式                
                deviceId: vm.ruleForm.deviceId, // 设备编号
                patientId: vm.patientId, //患者ID,
                patientSugarId: vm.patientSugarId, //患者血糖ID,
              },
              fileNumber: vm.fileNumber,
              customerId: vm.customerId, //saas患者id
              //userCustomerId: vm.userCustomerId, //公众号患者id
            }

            vm.editPatient(data);

          } else {
            this.closeLoading();
            return false;
          }
        });
      },
      getBMI() { // 获取bmi值
        let height = this.casesInfo.height;
        if (height) {
          height = height > 240 ? 240 : height;
          height = height < 20 ? 20 : height;
          this.casesInfo.height = height;
        }
        
        let weight = this.casesInfo.weight;
        if (weight) {
          weight = weight > 200 ? 200 : weight;
          weight = weight < 5 ? 5 : weight;
          this.casesInfo.weight = weight;
        }
        
        this.casesInfo.BMI = height && weight ? this.calcBMI : '';
      },
      //提交编辑患者
      editPatient(data) {
        let vm = this;
        vm.$api.customerEdit(data, res => {
          if (res.status == 200) {
            if (res.data.code == 0) {
              vm.$message.success("更新成功");
              vm.$router.back(-1);
            } else {
              vm.$message(res.data.errMsg || res.data.data)
            }
          }
          vm.closeLoading();
        }, res => {
          vm.$message(res.data.errMsg || res.data.data);
          vm.closeLoading();
        })
      }
    },

  }
</script>

<style lang="less">
  .demo-ruleForm1 {
    .el-form-item {
      box-sizing: border-box;
      padding-right: 20px;
      .el-autocomplete,
      .el-select {
        width: 100%;
      }
      input[type="number"] {
        padding: 0 0 0 15px!important;
      }
      .el-date-editor.el-input {
        width: 100%!important;
      }
      .el-form-item__label {
        padding: 0!important;
      }
      .grid2 {
        width: calc(~'(100% - 25px) / 2')!important;
      }
      .grid4 {
        width: calc(~'(100% - 60px) / 4')!important;
      }
      .grid4_ {
        width: calc(~'(100% - 65px) / 4')!important;
      }
      .gutter {
        text-align: center;
        width: 20px;
      }
    }
  }
  /*病例信息*/

  .casesInfo,
  .habits {
    .el-form-item {
      input[type="number"] {
        padding: 0 0 0 15px!important;
      }
      .el-radio-group {
        display: block;
      }
      .grid2 {
        width: calc(~'(100% - 30px) / 2')!important;
      }
      .grid3 {
        width: calc(~'(100% - 50px) / 3')!important;
      }
      .grid4 {
        width: calc(~'(100% - 50px) / 4')!important;
      }
      .gutter {
        text-align: center;
        width: 25px;
      }
      .el-button {
        border: none;
        vertical-align: top;
        display: inline-block;
        padding: 0;
      }
      
      .el-checkbox {
        margin-left: 0!important;
        padding-right: 30px;
      }
    }
  }
  /*生活习惯*/

  .habits {}
  /*并发症popover弹出窗*/

  .complicationPopover {
    box-sizing: border-box;
    .complicationsArr {
      .diseases {
        left: 109px;
        top: 55px;
        background: white;
        box-sizing: border-box;
        z-index: 100;
        padding-bottom: 20px;
        span {
          line-height: 40px!important;
        }
        .el-checkbox {
          margin-left: 0!important;
          padding-right: 30px;
        }
      }
      span {
        line-height: 40px!important;
      }
      .el-checkbox {
        margin-left: 0!important;
        padding-right: 30px;
      }
    }
  }
  /*实验检测*/

  .detection {
    .el-form-item {
      width: 27%!important;
      .el-input {
        display: inline-block!important;
        width: calc(~'100% - 140px')!important;
      }
      .note {
        color: #999;
      }
    }
  }
</style>
<style scoped>
  .demo-ruleForm1 {
    display: block;
    margin: 0 30px;
  }
  .demo-ruleForm1 .el-form-item {
    width: 16%;
    display: inline-block;
  }
  .el-input {
    resize: none !important;
  }
  .fonts {
    color: #ccc;
  }
  .warn {
    position: absolute;
    width: 100%;
    color: red;
    line-height: 12px;
    font-size: 12px;
  }
  .row .col select {
    width: 107px;
  }
</style>
