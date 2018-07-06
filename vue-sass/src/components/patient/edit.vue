<template>
  <div>
    <!-- 添加患者页面 -->
    <div class="container-root">
      <div class="breadcrumb">
          <router-link to="/patientManage" class="label-patient-manager">患者管理</router-link>
          <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
        <label class="label-patient-manager" @click="rePatient" >患者详情</label>
        <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
        <label class="label-add-patient"> 编辑档案</label>
        <span class="btn-back" @click="rePatient">返回</span>
      </div>
      <!-- 基本信息 -->
      <div class="container-base-info contentBorder">
        <label class="label-base-info">基本信息</label>
        <div class="line-divider"></div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm"
                 onsubmit="return false;">
          <el-form-item label="姓名" prop="name" style="width: 310px;">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期" prop="birth">
            <!--<input id="date-birth" readonly v-model="ruleForm.birth" class="Wdate" type="text" onfocus="WdatePicker({skin:'whyGreen',maxDate:'%y-%M-%d'})"></input>-->
            <el-date-picker
              v-model="ruleForm.birth"
              type="date"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions0"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="身高">
            <input id="edit-height" @blur="b_height" @input="mins_2" type="number" v-model="ruleForm.height"
                   style="width: 40px;"/> CM
          </el-form-item>
          <el-form-item label="体重">
            <input id="edit-weight" @blur="b_weight" @input="mins_3" type="number" v-model="ruleForm.weight"
                   style="width: 40px"/> KG
          </el-form-item>
          <el-form-item label="身份证号" prop="IDNum" style="width: 310px;">
            <el-input v-model="ruleForm.IDNum" :maxlength="18"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <!--<el-input v-if="ruleForm.phone" v-model="ruleForm.phone" :disabled="true" :maxlength="11"></el-input>-->
            <el-input v-model="ruleForm.phone" :disabled="disPhone" :maxlength="11"></el-input>
          </el-form-item>
          <el-form-item label="婚姻状态">
            <el-radio-group v-model="ruleForm.mar" class="marry">
              <el-radio :label="1">未婚</el-radio>
              <el-radio :label="2">已婚</el-radio>
              <el-radio :label="3">丧偶</el-radio>
              <el-radio :label="4">离婚</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="职业" prop="">
            <el-select v-model="ruleForm.Occupation" placeholder="请选择" @change="OccupaChange">
              <el-option
                v-for="(item,index) in Occpationss"
                :key="item.itemKey"
                :label="item.itemValue"
                :value="item.itemKey">
                {{item.itemValue}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="BMI指数">
            <span :class="{'fonts':ruleForm.BMI=='请完善身高体重'}">{{ruleForm.BMI}}</span>
            <!--<span :style="{color:ruleForm.BMI=='请完善身高体重' ? 'red' : blue}">{{ruleForm.BMI}}</span>-->
          </el-form-item>
          <el-form-item label="家庭住址" prop="" style="width: 39%;">
            <div class="row">
              <!--<div class="col">
                          <select v-model="f.p" @change="selpro" class="province" style="margin: 0;">
                              <option :value="i" v-for="(v,i) in pro" :key="v.id">{{v.name}}</option>
                          </select>
                          </div>-->
              <div class="col">
                <select v-model="prov" style="margin-left: 0;">
                  <option v-for="option in arr" :value="option.name">
                    {{ option.name }}
                  </option>
                </select>
              </div>

              <div class="col">
                <!--<select v-model="f.c" @change="selcity" class="citys">
                                <option :value="i" v-for="(v,i) in city" :key="v.id">{{v.name}}</option>
                            </select>-->
                <select v-model="citys">
                  <option v-for="option in cityArr" :value="option.name">
                    {{ option.name }}
                  </option>
                </select>
              </div>

              <div class="col">
                <!--<select v-model="f.cc" v-show="county.length>0" @change="result" class="area">
                                <option :value="i" v-for="(v,i) in county" :key="v.id">{{v.name}}</option>
                            </select>-->
                <select v-model="district" v-if="district">
                  <option v-for="option in districtArr" :value="option.name">
                    {{ option.name }}
                  </option>
                </select>
              </div>
            </div>
            <input type="text" placeholder="详细地址" v-model="ruleForm.detail"/>
          </el-form-item>
          <el-form-item label="紧急联系人" prop="">
            <el-input v-model="ruleForm.emCont" style="width: 120px;"></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人电话" prop="contactPhone">
            <el-input v-model="ruleForm.contactPhone" ></el-input>
          </el-form-item>
          <el-form-item label="设备编码" prop="" style="opacity: 0	;">
            <el-input v-model="ruleForm.DeviceCod"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="diseaseType" style="width: 310px;">
            <el-select v-model="ruleForm.diseaseType" placeholder="请选择">
              <el-option
                v-for="(item,index) in diabetesType"
                :key="item.itemKey"
                :label="item.itemValue"
                :value="item.itemKey">
                {{item.itemValue}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="并发症" prop="" style="width: 40%;">
            <el-input v-model="ruleForm.Complica" style="width: 457px"></el-input>
          </el-form-item>
          <el-form-item label="确诊时间" prop="">
            <el-date-picker
              v-model="ruleForm.timeDiag"
              type="date"
              placeholder="选择日期时间"
              :picker-options="pickerOptions0"
            >
            </el-date-picker>
            <!--<input id="date-diagnosis" readonly class="Wdate" type="text" v-model="ruleForm.TimeDiag" onfocus="WdatePicker({skin:'whyGreen',maxDate:'%y-%M-%d'})"/>-->
          </el-form-item>
          <el-form-item>
          </el-form-item>
          <el-form-item label="标签" prop="" style="width: 60%;">
            <!--弹框-->
            <el-popover
              ref="popover"
              placement="bottom"
              trigger="click"
              width="745"
            >

              <el-checkbox-group v-model="radio_" @change="handClick" class="radiosTag">
                <el-checkbox fill="#ccc" :label="tag.tagId" v-for="(tag,index) in patientTags" :key="tag.tagId"
                             style="padding: 0 10px;margin: 0 0 10px;">
                  <el-tag
                    closable
                    :key="tag.tagId"
                    :disable-transitions="false"
                    @close="handleClose(tag)">
                    {{tag.tagName}}
                  </el-tag>
                </el-checkbox>
              </el-checkbox-group>

              <el-input
                style="display: inline-block;width: 100px;vertical-align: middle;"
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="medium"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <button class="edits_" v-else size="medium " @click="showInput">+编辑</button>
            </el-popover>
            <el-button v-popover:popover style="width: 772px;padding:0;border:none;height: 38px;">
              <el-input readonly v-model="ruleForm.recont"></el-input>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 健康信息 -->
      <div class="container-base-info contentBorder">
        <label class="label-base-info">健康信息</label>
        <div class="line-divider"></div>
        <el-form :model="healthInfor" :rules="rules" ref="healthInfor" label-width="100px" class="demo-healthInfor">
          <el-form-item label="疾病史" prop="" style="position: relative;">
            <el-radio-group v-model="healthInfor.disease" @change="cDisease(healthInfor.disease)">
              <el-radio label="true">无</el-radio>
              <el-radio label="false">有</el-radio>
            </el-radio-group>
            <!--弹框-->
            <el-popover
              ref="popovers"
              placement="bottom"
              trigger="click"
              width="534">
              <div class="diseases">
                <div class="dise">
                  <el-checkbox-group
                    v-model="hDisease">
                    <el-checkbox v-for="item in HisDisease" :label="item" :key="item">{{item}}</el-checkbox>
                  </el-checkbox-group>
                  <div style="padding:20px 0 0 15px;">其它
                    <el-input @blur="else_S" placeholder="请输入内容" style="width: 240px;padding-left: 8px;"
                              v-model="elses"></el-input>
                  </div>
                </div>
              </div>
            </el-popover>

            <el-button v-popover:popovers :disabled="JSON.parse(healthInfor.disease)">
              <el-input readonly type="textarea" resize="none" :disabled="JSON.parse(healthInfor.disease)"
                        v-model="elses ? hDisease.toString() + ',' + elses : hDisease.toString()"></el-input>
            </el-button>

          </el-form-item>
          <el-form-item label="家族史" prop="">
            <el-radio-group v-model="healthInfor.family" @change="cFamily(healthInfor.family)">
              <el-radio label="true">无</el-radio>
              <el-radio label="false">有</el-radio>
            </el-radio-group>
            <!--弹框-->
            <el-popover
              ref="popoverss"
              placement="bottom"
              trigger="click"
              width="534">
              <div class="diseases">
                <el-checkbox-group
                  v-model="hFamily">
                  <el-checkbox v-for="item in familyHis" :label="item" :key="item">{{item}}</el-checkbox>
                </el-checkbox-group>
                <div style="padding-left: 15px;">其它
                  <el-input @blur="m_elses" placeholder="请输入内容" style="width: 240px;padding-left: 8px;"
                            v-model="m_else"></el-input>
                </div>
              </div>
            </el-popover>
            <el-button v-popover:popoverss :disabled="JSON.parse(healthInfor.family)">
              <el-input readonly type="textarea" resize="none" :disabled="JSON.parse(healthInfor.family)"
                        v-model="m_else ? hFamily.toString() + ',' + m_else : hFamily.toString()"></el-input>
            </el-button>
          </el-form-item>
          <el-form-item label="现病史" prop="">
            <el-radio-group v-model="healthInfor.thisDisease" @change="cThisDisease(healthInfor.thisDisease)">
              <el-radio label="true">无</el-radio>
              <el-radio label="false">有</el-radio>
            </el-radio-group>
            <el-input type="textarea" resize="none" :disabled="JSON.parse(healthInfor.thisDisease)"
                      v-model="hThisDisease"></el-input>
          </el-form-item>
          <el-form-item label="现在治疗方式" prop="">
            <el-radio-group v-model="healthInfor.TreatMethod" @change="cTreatMethod(healthInfor.TreatMethod)">
              <el-radio label="true">无</el-radio>
              <el-radio label="false">有</el-radio>
            </el-radio-group>
            <el-input readonly type="textarea" resize="none" :disabled="JSON.parse(healthInfor.TreatMethod)"
                      v-model="hTreatMethod.toString()" @focus="hasDialog=true"></el-input>
            <el-dialog title="现在治疗方式" :visible.sync="hasDialog">
              <!--弹框-->
              <div class="diseases">
                <div>
                  <el-checkbox v-model="DietControl" label="饮食控制" class="TreatMethod" @change="DControl"></el-checkbox>
                </div>
                <div>
                  <el-checkbox v-model="Oral" label="口服药" class="TreatMethod" @change="DOral"></el-checkbox>
                  <table class="tabs">
                    <tr v-for="(it,index) in OralMedi">
                      <td>药名</td>
                      <td><input type="text" style="width: 100px;" v-model="it.drug"/></td>
                      <td>开始时间</td>
                      <td>
                        <el-date-picker
                          :editable="false"
                          v-model="it.start"
                          type="date"
                          placeholder="选择日期"
                          style="width: 140px;height: 42px; margin-top: 5px;"
                          :picker-options="pickerOptions0"
                        >
                        </el-date-picker>
                        <!--<input class="Wdate laydate-icon" v-model="it.start" readonly onFocus="WdatePicker({})" style="width: 140px;"/>-->
                      </td>
                      <td><img src="../../../images/patientManage/label_add_but.png" alt="" @click="adds()"/></td>
                      <td><img src="../../../images/patientManage/label_del_but_normal.png" alt="" @click="dels(index)"/>
                      </td>
                      <div class="warn" v-show="it.warn">请输入药名或开始时间</div>
                    </tr>
                  </table>
                </div>
                <div>
                  <el-checkbox v-model="Insul" label="胰岛素" class="TreatMethod" @change="DInsul"></el-checkbox>
                  <table class="tabs">
                    <tr v-for="(it,index) in Insulin">
                      <td>药名</td>
                      <td><input type="text" style="width: 100px;" v-model="it.drug"/></td>
                      <td>开始时间</td>
                      <td>
                        <el-date-picker
                          :editable="false"
                          v-model="it.start"
                          type="date"
                          placeholder="选择日期"
                          size='small'
                          style="width: 140px;height: 42px; margin-top: 5px;"
                          :picker-options="pickerOptions0"
                        >
                        </el-date-picker>
                        <!--<input class="Wdate laydate-icon" v-model="it.start" readonly onFocus="WdatePicker({})" style="width: 140px;"/>-->
                      </td>
                      <td><img src="../../../images/patientManage/label_add_but.png" alt="" @click="Insadds()"/></td>
                      <td><img src="../../../images/patientManage/label_del_but_normal.png" alt=""
                              @click="Insdels(index)"/></td>
                      <div class="warn" v-show="it.warn">请输入药名或开始时间</div>
                    </tr>
                  </table>
                  <div class="button" style=" margin-left: 0; background-color: #F56C6C;" @click="cancel">取消</div>
                  <div class="button" @click="sureS">确定</div>
                </div>
              </div>
            </el-dialog>
          </el-form-item>
          <el-form-item label="过敏史" prop="">
            <el-radio-group v-model="healthInfor.allergy" @change="cAllergy(healthInfor.allergy)">
              <el-radio label="true">无</el-radio>
              <el-radio label="false">有</el-radio>
            </el-radio-group>
            <el-input type="textarea" resize="none" :disabled="JSON.parse(healthInfor.allergy)"
                      v-model="hAllergy"></el-input>
          </el-form-item>
          <el-form-item label="过去治疗方式" prop="">
            <el-radio-group v-model="healthInfor.PastTreatment" @change="cPastTreatment(healthInfor.PastTreatment)">
              <el-radio label="true">无</el-radio>
              <el-radio label="false">有</el-radio>
            </el-radio-group>
            <el-input type="textarea" resize="none" :disabled="JSON.parse(healthInfor.PastTreatment)"
                      v-model="hPastTreatment"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <!-- 生活习惯 -->
      <div class="container-base-info contentBorder" style="height:auto;overflow:hidden;">
        <label class="label-base-info">生活习惯</label>
        <div class="line-divider"></div>
        <el-form :model="HabitsCus" :rules="rules" ref="HabitsCus" label-width="100px" class="demo-HabitsCus">
          <el-form-item label="劳动强度">
            <el-radio-group v-model="labourIntensityRadio">
              <el-radio :label="it.itemKey" v-for="it in labIntensity_" :key="it.itemKey">{{it.itemValue}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="抽烟" prop="">
            <el-radio-group v-model="smokingStatusRadio" @change="smokSta">
              <el-radio :label="it.itemKey" v-for="it in smokStatus_" :key="it.itemKey">{{it.itemValue}}</el-radio>
            </el-radio-group>
            <input id="edit-smoking-daily" :disabled="smokingStatusRadio==1 || smokingStatusRadio==2" type="number"
                   style="width: 50px" v-model="SmokVolume" @input="mins_1">
            <label class="label-info">支/每天</label>
          </el-form-item>

          <el-form-item label="饮酒" prop="">
            <el-radio-group v-model="drinkingStatusRadio" @change="drinkStatu">
              <el-radio :label="it.itemKey" v-for="it in drinkStatus_" :key="it.itemKey">{{it.itemValue}}</el-radio>
            </el-radio-group>
            <el-select v-model="drinkTy_" :disabled="drinkingStatusRadio==1" placeholder="请选择"
                       style="width: 120px;margin-left: 40px;" @change="driChange">
              <el-option
                v-for="item in drinkingTypes"
                :key="item.itemKey"
                :label="item.itemValue"
                :value="item.itemKey">
                {{item.itemValue}}
              </el-option>
            </el-select>

            <input id="edit-drinking-daily" type="number" @input="mins" :disabled="drinkingStatusRadio==1"
                   v-model="HabitsCus.drinkVolume" style="width: 50px;height: 39px;"/>
            <label class="label-info">毫升/天</label>
          </el-form-item>

          <el-form-item label="锻炼情况" prop="">
            <el-radio-group v-model="exerciseFrequencyRadio">
              <el-radio :label="item.itemKey" v-for="item in exerciseFrequency" :key="item.itemId">{{item.itemValue}}
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="睡眠时间" prop="">
            <el-radio-group v-model="sleepStatusRadio" @change="sleepChange">
              <el-radio :label="item.itemKey" v-for="item in sleepStatus" :key="item.itemKey">{{item.itemValue}}
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="平时情绪" prop="">
            <el-radio-group v-model="OrdMood">
              <el-radio :label="it.itemKey" v-for="it in moodType_" :key="it.itemKey">{{it.itemValue}}</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="饮食偏好" prop="">
            <el-checkbox-group
              v-model="foodHabitRadio"
            >
              <el-checkbox v-for="city in foodHabit" :label="city.itemKey" :value="city.itemKey" :key="city.itemKey">
                {{city.itemValue}}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <!-- 健康综述 -->
      <div class="container-base-info contentBorder">
        <label class="label-base-info">健康综述</label>
        <div class="line-divider"></div>
        <el-input type="textarea" resize="none" v-model="HealthRevi" :rows="8" id="edit-remark" placeholder="填写详细综述"></el-input>
      </div>
      <!-- 备注 -->
      <div class="container-base-info contentBorder">
        <label class="label-base-info">备注</label>
        <div class="line-divider"></div>
        <el-input type="textarea" resize="none" v-model="Remarks" :rows="8" id="edit-remark" placeholder="填写备注" ></el-input>
      </div>
      <!---->
      <div class="div-bottom">
        <div class="btn-cancel btns" @click="return_">取消</div>
        <div class="btn-confirm btns" @click="submitForm('ruleForm')">确定</div>
      </div>
    </div>
  </div>
</template>


<script>
  import data from "../common/cityData.js";
  import funBus from '../../assets/js/funBus';

  //var toBeClo=true;
  //BMI指数
  function bmi(a, b) {
    var bmi = (b * 1.0 / ((a * 1.0 / 100) * (a * 1.0 / 100))).toFixed(1);
    return bmi;
  }

  //移除数组的指定元素
  function removeByValue(arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val) {
        arr.splice(i, 1);
        break;
      }
    }
  }


  export default {
    name: "addPatient",
    data() {
      //判断出生日期是否与身份证号码一致，并以身份证为主
      var ifBir = (rule, value, callback) => {

        if (this.ruleForm.birth && this.ruleForm.IDNum) {
          var reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/;

          if (reg.test(this.ruleForm.IDNum) === true) {
            //18位身份证时
            if (this.ruleForm.IDNum.length == 18) {
              var y_1 = new Date(this.ruleForm.birth).getFullYear() - 0;
              var m_1 = new Date(this.ruleForm.birth).getMonth() + 1 - 0;
              var d_1 = new Date(this.ruleForm.birth).getDate() - 0;

              var y_2 = this.ruleForm.IDNum.substring(6, 10) - 0;
              var m_2 = this.ruleForm.IDNum.substring(10, 12) - 0;
              var d_2 = this.ruleForm.IDNum.substring(12, 14) - 0;

              if (y_1 == y_2 && m_1 == m_2 && d_1 == d_2) {
                callback();
              } else {
                callback(new Error('身份证和出生日期不匹配'));
              }
            }
            //15位身份证时
            else if (this.ruleForm.IDNum.length == 15) {
              var y_1 = new Date(this.ruleForm.birth).getYear() - 0;
              if (y_1 > 100) {
                y_1 = y_1 - 100;
              }
              var m_1 = new Date(this.ruleForm.birth).getMonth() + 1 - 0;
              var d_1 = new Date(this.ruleForm.birth).getDate() - 0;

              var y_2 = this.ruleForm.IDNum.substring(6, 8) - 0;
              var m_2 = this.ruleForm.IDNum.substring(8, 10) - 0;
              var d_2 = this.ruleForm.IDNum.substring(10, 12) - 0;

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
      }
      return {
        copyhTreatMethod: [],
        hasDialog: false,
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        //手机号是否可编辑
        disPhone:false,
        //省市区三级
        arr: data,
        prov: '北京',
        citys: '北京',
        district: '东城区',
        cityArr: [],
        districtArr: [],
        // prov:"",
        // citys:"",
        // district:"",
        // arr:"",
        // cityArr:'',
        // districtArr:'',
        my_cusTomId: "",
        my_userCusId: "",
        my_fileNumber: "",
        my_patientSugId: "",
        my_patientId: "",
        //
        myIndex: 1,
        Occupa_: "",
        moodType_: "",
        labIntensity_: "",
        smokStatus_: "",
        drinkStatus_: "",
        drinkKey: "",
        SmokVolume: "",
        templateId_: '',
        radio_: [],
        cusID: "",
        keyName: "",
        ifDataShow: false,
        mdatass: [],
        labels: [],
        patientTags: [], // 患者标签
        inputVisible: false,
        inputValue: '',
        Insul: "",
        Oral: "",
        IfTreatMethod: false,
        OralMedi: [
          {
            drug: "",
            start: "",
            warn: false
          }
        ],
        Insulin: [
          {
            drug: "",
            start: "",
            warn: false
          }
        ],
        DietControl: "",
        m_else: "",
        familyHis: ["高血压", "脑中风", "胰脏炎"],
        elses: "",
        hFamily: [],
        checDis: [],
        hDisease: [],
        hThisDisease: "",
        hTreatMethod: [],
        hAllergy: "",
        hPastTreatment: "",
        HisDis: "",
        HisDisease: ["高血压", "脑中风", "胰脏炎", "心脏病", "甲状腺病", "痛风", "肾脏病", "肺脏病", "失明"],
        HealthRevi: "",
        Remarks: "",
        drinkTy_: "",
        Occpationss: ['国家机关、党群组织、企业、事业单位负责人', '专业技术人员', '办事人员和有关人员', '商业、服务业人员', '农、林、牧、渔、水利业生产人员', '生产、运输设备操作人员及有关人员', '军人', '不便分类的其他从业人员'],
        options: ["类型一", "类型2", "类型3", "类型4"],
        //健康综述
        HabitsCus: {
          drinkVolume: ""
        },
        //健康信息
        healthInfor: {
          disease: "true",
          family: "true",
          thisDisease: "true",
          TreatMethod: "true",
          allergy: "true",
          PastTreatment: "true"
        },
        //基本信息
        ruleForm: {
          recont: "",
          name: '',
          sex: 1,
          IDNum: "",
          birth: "",
          height: "",
          weight: "",
          phone: "",
          mar: "",
          Occupation: "",
          BMI: "请完善身高体重",
          detail: "",
          emCont: "",
          contactPhone: "",
          DeviceCod: "",
          diseaseType: "",
          Complica: "",
          TimeDiag: "",
          timeDiag: "",
          myTags: []
        },
        rule: {},
        rules: {
          birth: [
            {validator: ifBir, trigger: 'blur'}
          ],
          IDNum: [
            {
              pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/,
              message: '证件号码格式有误！',
              trigger: 'blur'
            }
          ],
          name: [
            {required: true, message: '请输入姓名', trigger: 'change'},
            {validator: funBus.validateIsNull, trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'},
          ],
          phone: [
            {required: true, message: '请输入手机号', trigger: 'change'},
            {pattern: /^[1][3,4,5,6,7,8][0-9]{9}$/, message: '手机号格式有误！', trigger: 'blur'}
          ],
          contactPhone: [
            {pattern: /^[1][3,4,5,6,7,8][0-9]{9}$/, message: '手机号格式有误！', trigger: 'blur'}
          ],
          diseaseType: [
            {required: true, message: '请选择糖尿病类型', trigger: 'change'}
          ]
        },
        tagsIsShow: false,//标签是否显示
        sexRadio: 1,//性别
        message: "123",
        searchIsShow: false,//是否显示搜索结果框
        searchResult: [],//搜索结果
        maritalRadio: 1, //婚姻状态
        jobs: [
          {"value": 1, "name": "国家机关、党群组织、企业、事业单位负责人", "isSelected": 1},
          {"value": 2, "name": "专业技术人员", "isSelected": 0},
          {"value": 3, "name": "办事人员和有关人员", "isSelected": 0},
          {"value": 4, "name": "商业、服务业人员", "isSelected": 0},
          {"value": 5, "name": "农、林、牧、渔、水利业生产人员", "isSelected": 0},
          {"value": 6, "name": "生产、运输设备操作人员及有关人员", "isSelected": 0},
          {"value": 7, "name": "军人", "isSelected": 0},
          {"value": 8, "name": "不便分类的其他从业人员", "isSelected": 0}
        ],//职业
        jobLastSelectedIndex: 0, //职业当前选中
        height: null, //身高
        weight: null, //体重
        sugarTypes: [], //血糖类型,
        diabetesType: [], // 糖尿病类型
        labourIntensityRadio: '', //劳动强度（0.重度 1.中度 2.轻度 3.非劳动/卧床）
        smokingStatusRadio: '',//吸烟情况
        drinkingStatusRadio: '',//饮酒情况
        OrdMood: '',
        drinkingTypes: [],//饮酒类型
        exerciseFrequency: [],//锻炼频率
        exerciseFrequencyRadio: '',
        sleepStatus: [],//睡眠情况
        sleepStatusRadio: '',
        foodHabit: [],//饮食偏好
        foodHabitRadio: []
      }
    },
    methods: {
      cancel () {

        this.hTreatMethod = this.copyhTreatMethod;
        this.hasDialog = false;
      },
      //select address
      updateCity: function () {
        for (var i in this.arr) {
          var obj = this.arr[i];
          if (obj.name == this.prov) {
            this.cityArr = obj.sub;
            break;
          }
        }
        this.citys = this.cityArr[1].name;
      },
      updateDistrict: function () {
        for (var i in this.cityArr) {
          var obj = this.cityArr[i];
          if (obj.name == this.citys) {
            this.districtArr = obj.sub;
            break;
          }
        }

        if (this.districtArr && this.districtArr.length > 0 && this.districtArr[1].name) {
          this.district = this.districtArr[1].name;
        } else {
          this.district = '';
        }
      },
      smokSta(n) {
        if (n == 1 || n == 2) {
          this.SmokVolume = ""
        }
      },
      mins() {
        var that = this;
        this.HabitsCus.drinkVolume = that.HabitsCus.drinkVolume.replace(/[^\d]/g, '')
      },
      mins_1() {
        var that = this;
        this.SmokVolume = that.SmokVolume.replace(/[^\d]/g, '')
      },
      mins_2() {
        var that = this;
        this.ruleForm.height = that.ruleForm.height.replace(/[^\d]/g, '')
      },
      mins_3() {
        var that = this;
        this.ruleForm.weight = that.ruleForm.weight.replace(/[^\d]/g, '')
      },
      drinkStatu(n) {
        if (n == 1) {
          this.HabitsCus.drinkVolume = '';
          this.drinkTy_ = '';
        }
      },
      rePatient() {
        this.$router.go(-1);
      },
      OccupaChange(n) {
        console.log(n)
        this.Occupa_ = n;
      },
      sleepChange(n) {
        console.log(n)
        console.log(this.sleepStatusRadio)

      },
      driChange(n) {
//  		console.log(n)
        console.log(this.drinkTy_)
        this.drinkKey = n;
      },
      takeSearch(name, customerId) {
        this.keyName = name;
        this.mdatass = [];
        this.ifDataShow = false;
        this.cusID = customerId;
      },
      m_input() {
        var that = this;
        if (that.keyName.trim()) {
//  			var data = {"keyName":that.keyName.trim()}
          that.$api.cuPatient({keyName:that.keyName.trim()},res=> {
            if (res.status == 200) {
              if (res.data.data) {
                that.mdatass = res.data.data;
                if (that.mdatass.length > 0) {
                  that.ifDataShow = true;
                } else {
                  that.mdatass = [];
                  that.ifDataShow = false;
                }
              }
            }
          }).catch(function (err) {
            console.log(err)
          })
        } else {
          that.mdatass = [];
          that.ifDataShow = false;
        }
      },
      handleSend(tag) {
        console.log(tag)
      },
      //点击快捷回复
      handClick(tag) {

        //数据处理
        var arr = [];
        var that = this;
        tag.forEach(function (it) {
          that.patientTags.forEach(function (its) {
            if (it == its.tagId) {
              arr.push(its.tagName)
            }
          })
        })
        this.ruleForm.recont = arr.toString();
      },
      //新增快捷回复
      handleInputConfirm() {
        let inputValue = this.inputValue.replace(/(^\s*)|(\s*$)/g, "");
        if (inputValue) {
          var that = this;
          var seq = this.patientTags.length + 1;
          /*获取session信息*/
          if (sessionStorage.getItem('user')) {
            var useInfo = sessionStorage.getItem('user');
            //获取机构ID
            var organizationId = JSON.parse(useInfo).organizationId;
          }
          var data = {
            tagName: inputValue,
            organId: organizationId,
            seqNum: seq,
            tagType: 0// 0:私有，1:公有——必填,
          }
          //
          this.$api.addUserTag(data,res=> {
            console.log('1111111111')
            if (res.status == 200) {
              if (res.data.data) {
                funBus.getPatientTags(this); //患者标签
              }
            }
          }).catch(function (err) {
            console.log(err)
          })
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      //删除快捷回复标签
      handleClose(tag) {
        var that = this;
        let data = {
          tagId:tag.tagId
        }
        this.$api.delUserTag(data, res => {
          if (res.status == 200) {
            if (res.data.data) {
              funBus.getPatientTags(this); //患者标签
            }
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      showInput() {
        this.inputVisible = true;
        console.log(this.$refs)
//      this.$nextTick(_ => {
//        this.$refs.saveTagInput.$refs.input.focus();
//      });
      },

      b_height() {
        var h = this.ruleForm.height;
        var w = this.ruleForm.weight;
        if (h && w) {
          this.ruleForm.BMI = bmi(h, w);
        } else {
          this.ruleForm.BMI = "请完善身高体重"
        }
      },
      b_weight() {
        var h = this.ruleForm.height;
        var w = this.ruleForm.weight;
        if (h && w) {
          this.ruleForm.BMI = bmi(h, w);
        } else {
          this.ruleForm.BMI = "请完善身高体重"
        }
      },
      sureS() {
        var close = true;
        //判断饮食控制 清空
        if (this.DietControl) {
          this.hTreatMethod = ["饮食控制"];

        } else {
          this.hTreatMethod = [];
        }
        //口服药
        if (this.Oral) {
          for (var i = 0; i < this.OralMedi.length; i++) {
            var d = this.formatDate(this.OralMedi[i].start);
            var c = this.OralMedi[i].drug;
            this.OralMedi[i].warn = true;
            if (d.trim() && c.trim()) {
              this.OralMedi[i].warn = false;
              this.hTreatMethod.push(this.formatDate(d).replace(/\s[\x00-\xff]*/g, '') + "开始服用" + c);
            }
            if (!d.trim() && !c.trim()) {
              this.OralMedi[i].warn = false;
            }
            if (this.OralMedi[i].warn) {
              close = false;
            }
          }
        }
        //胰岛素
        if (this.Insul) {
          for (var i = 0; i < this.Insulin.length; i++) {
            var d = this.Insulin[i].start;
            var c = this.Insulin[i].drug;
            this.Insulin[i].warn = true;
            if (d && c.trim()) {
              this.Insulin[i].warn = false;
              this.hTreatMethod.push(this.formatDate(d).replace(/\s[\x00-\xff]*/g, '') + "开始使用" + c);
            }
            if (!d && !c.trim()) {
              this.Insulin[i].warn = false;
            }
            console.log(this.Insulin[i].warn)
            if (this.Insulin[i].warn) {
              close = false;
            }
          }
        }
        var that = this;
        if (close) {
          setTimeout(function () {
            that.hasDialog = false;
            that.IfTreatMethod = false;
          }, 200)
        }
      },
      DControl(val) {
        // if (val) {
        //   this.foodCtr = '饮食控制';
        //   // this.hTreatMethod.unshift("饮食控制");
        // } else {
        //   this.foodCtr = '';;
        //   // this.hTreatMethod.shift("饮食控制")
        // }
      },
      DOral(val) {
        if (val) {
//  			for(var i=0;i<this.OralMedi.length;i++){
//						console.log(this.OralMedi[i].drug);
//						this.hTreatMethod.push(this.OralMedi[i].start+"开始服用"+this.OralMedi[i].drug);
//					}
        } else {
//  			this.hTreatMethod.pop(this.OralMedi);
//					this.OralMedi = [
//	      		{
//		      		drug:"",
//		      		start:""
//		      	}
//	      	];
        }
      },
      DInsul(val) {
//  		Insul
        if (val) {
//  			for(var i=0;i<this.OralMedi.length;i++){
//						console.log(this.OralMedi[i].drug);
//						this.hTreatMethod.push(this.OralMedi[i].start+"开始服用"+this.OralMedi[i].drug);
//					}
        } else {
//  			this.hTreatMethod.pop(this.OralMedi);
//					this.Insulin = [
//	      		{
//		      		drug:"",
//		      		start:""
//		      	}
//	      	];
        }
      },
      Insadds() {
        if (this.Insulin.length < 20) {
          this.Insulin.push({drug: "", start: ""});
        }
      },
      Insdels(index) {
        console.log(this.Insulin)
        console.log(index)
        if (this.Insulin.length > 1) {
          this.Insulin.splice(index, 1);
        } else {
          this.Insulin = [
            {
              drug: "",
              start: ""
            }
          ]
        }
      },
      adds() {
        if (this.OralMedi.length < 20) {
          this.OralMedi.push({drug: "", start: ""});
        }
      },
      dels(index) {
        console.log(this.OralMedi)
        console.log(index)
        if (this.OralMedi.length > 1) {
          this.OralMedi.splice(index, 1);
        } else {
          this.OralMedi = [{
            drug: "",
            start: ""
          }]
        }
      },
      m_elses() {
//  		if(this.m_else.trim()){
//  			this.hFamily.push(this.m_else);
//  			this.m_else="";
//
//  		}
      },
      else_S() {
//  		if(this.elses.trim()){
//  			this.hDisease.push(this.elses);
//  			this.elses="";
//  		}
      },
      //健康信息 有无
      cDisease(c) {
        if (c) {
          this.hDisease = [];
          this.elses = "";
        }
      },
      cFamily(c) {
        if (c) {
          this.hFamily = [];
          this.m_else = "";
        }
      },
      cThisDisease(c) {
        if (c) {
          this.hThisDisease = "";
        }
      },
      cTreatMethod(c) {
        if (c) {
          //清空
          this.hTreatMethod = [];
          this.DietControl = false;
          this.Oral = false;
          this.Insul = false;
          this.OralMedi = [
            {
              drug: "",
              start: ""
            }
          ];
          this.Insulin = [
            {
              drug: "",
              start: ""
            }
          ];
          this.IfTreatMethod = false;
        }
        if (c === 'false') {
          this.hasDialog = true;
          this.IfTreatMethod = true;
        };
      },
      cAllergy(c) {
        if (c) {
          this.hAllergy = "";
        }
      },
      cPastTreatment(c) {
        if (c) {
          this.hPastTreatment = "";
        }
      },
      //
      return_() {
        this.$router.back(-1)
      },
      submitForm(formName) {

        this.$refs[formName].validate((valid) => {

          if (valid) {

            //编辑患者
            var that = this;
            //标签
            var arr_ = [];
            that.radio_.forEach(function (it) {
              arr_.push(it.tagId);
            })
            var data = {
              patientBaseVo: {
                customerId: that.my_cusTomId,
                patientName: that.ruleForm.name,
                patientId: that.my_patientId,
                sex: that.ruleForm.sex,
                birthday: that.ruleForm.birth,
                height: that.ruleForm.height ? JSON.parse(that.ruleForm.height) : "",
                weight: that.ruleForm.weight ? JSON.parse(that.ruleForm.weight) : "",
                idCard: that.ruleForm.IDNum,
                phone: that.ruleForm.phone,
                maritalStatus: that.ruleForm.mar,//婚姻情况1未婚 2 已婚 3丧偶 4离婚,
                job: that.ruleForm.Occupation,//职业1国家机关、党群组织、企业、事业单位负责人 2专业技术人员 3办事人员和有关人员 4商业、服务业人员 5 农、林、牧、渔、水利业生产人员 6生产、运输设备操作人员及有关人员 7军人 8不便分类的其他从业人员 ，
                bmi: that.ruleForm.BMI == "请完善身高体重" ? "" : JSON.parse(that.ruleForm.BMI),

                province: that.prov,//
                city: that.citys,//
                district: that.district,//
                address: that.ruleForm.detail, //家庭住址 省 市 区/县 地址,
                emergencyContact: that.ruleForm.emCont, //紧急联系人
                emergencyPhone: that.ruleForm.contactPhone,//紧急联系电话

                diseasesHistory: that.elses ? that.hDisease.toString() + ',' + that.elses : that.hDisease.toString(), //疾病史
                historyOfPresentIllness: that.hThisDisease ? that.hThisDisease.toString() : '',//现病史
                pastTreatment: that.hPastTreatment ? that.hPastTreatment.toString() : '', //过去治疗方式
                labourIntensity: that.labourIntensityRadio,//（0.重度 1.中度 2.轻度 3.非劳动/卧床）,
                drinkingStatus: that.drinkingStatusRadio,//饮酒情况,
                drinkingType: that.drinkTy_,//饮酒类型,
                drinkingDaily: that.HabitsCus.drinkVolume ? JSON.parse(that.HabitsCus.drinkVolume) : '',//饮酒量,

                foodHabit: that.foodHabitRadio.toString(),// 饮食习惯
                peacetimeEmotion: that.OrdMood,// 情绪情况
                exerciseFrequency: that.exerciseFrequencyRadio, //锻炼情况
                remark: that.Remarks,
                healthReview: that.HealthRevi,
                familyHistory: that.m_else ? that.hFamily.toString() + ',' + that.m_else : that.hFamily.toString(),
                nowTreatment: that.hTreatMethod ? that.hTreatMethod.toString() : '',
                allergicHistory: that.hAllergy,
                smokingStatus: that.smokingStatusRadio,
                smokingDaily: that.SmokVolume ? JSON.parse(that.SmokVolume) : '',
                sleepStatus: that.sleepStatusRadio
              },
              patientSugarVo: {
                patientId: that.my_patientId,
                patientSugarId: that.my_patientSugId,//患者血糖ID,
                diabetesType: that.ruleForm.diseaseType,
                ensureDate: that.ruleForm.timeDiag,//确诊日期,
                complications: that.ruleForm.Complica,//并发症,
                deviceId: that.ruleForm.DeviceCod// 设备编号
              },
              userCustomerId: that.my_userCusId,// 用户患者ID,
              fileNumber: that.my_fileNumber,
              customerId: that.my_cusTomId,
              tagIds: that.radio_,
              tags: that.ruleForm.recont
            }
            //

            //编辑患者确定
            that.$api.customerEdit(data, res=> {
              if (res.status == 200) {
                if (res.data.data == "更新成功") {
                  that.$message("更新成功")
                  that.$router.back(-1)
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      returnPat() {
        this.$router.push("/patientManage");
      },

      getBMI: function () {
        if (this.height === "" || this.weight === "" || this.height === null || this.weight === null) {
          return -1;
        } else {
          return (this.weight / ((this.height / 100) * (this.height / 100))).toFixed(1);
        }
      },
      hidenSearch() {
        this.searchIsShow = false;
      },
      searchItemMouseEnter(index) {
        this.message = "searchItemMouseEnter";
        document.getElementsByName("div-search-item")[index].style.backgroundColor = "#E9F2FE";
      },
      searchItemMouseLeave(index) {
        this.message = "searchItemMouseLeave";
        document.getElementsByName("div-search-item")[index].style.backgroundColor = "#FFFFFF";
      }
    },
    //初始化回调函数
    mounted: function () {
      var that = this;
      // this.district = '';
      // this.citys = '';
      //对应Id的患者信息
      var cusTomId = this.$route.query.cusTomId;
      var userCusId = this.$route.query.userCusId;
      var fileNumber = this.$route.query.fileNumber;
      var patientSugId = this.$route.query.patientSugId;
      var patientId = this.$route.query.patientId;
      var data = {
        customerId:cusTomId,
        userCustomerId:userCusId
      }
      this.my_cusTomId = cusTomId;
      this.my_userCusId = userCusId;
      this.my_fileNumber = fileNumber;
      this.my_patientSugId = patientSugId;
      this.my_patientId = patientId;

      this.$api.cuGetPat(data, res => {
        if (res.status === 200) {
          that.message = res.data.data;
          var patientBaseVo = res.data.data.patientBaseVo;
          var patientSugarVo = res.data.data.patientSugarVo;
          //标签
          var rads = res.data.data.listTags ? res.data.data.listTags : '';

          //处理数据
          if (rads) {
            that.radio_ = [];
            that.ruleForm.recont = '';
            var arrs_ = [];

            rads.forEach(function (it) {
              if (it !== null) {
                that.radio_.push(it.tagId);
                arrs_.push(it.tagName)
              }
            })
            that.ruleForm.recont = arrs_.toString();
          } else {
            that.ruleForm.recont = '';
            that.radio_ = [];
          }
          that.ruleForm.name = patientBaseVo.patientName ? patientBaseVo.patientName : "";//姓名
          that.ruleForm.sex = patientBaseVo.sex ? patientBaseVo.sex : "";//性别

          that.ruleForm.birth = patientBaseVo.birthday ? patientBaseVo.birthday : "";//出生日期
          that.ruleForm.height = patientBaseVo.height ? patientBaseVo.height : "";//身高
          that.height = patientBaseVo.height ? patientBaseVo.height : "";
          that.ruleForm.weight = patientBaseVo.weight ? patientBaseVo.weight : "";//体重
          that.weight = patientBaseVo.weight ? patientBaseVo.weight : "";
          that.ruleForm.IDNum = patientBaseVo.idCard ? patientBaseVo.idCard : "";//身份证
          that.ruleForm.phone = patientBaseVo.phone ? patientBaseVo.phone : "";//手机号
          that.disPhone = patientBaseVo.phone ? true:false

          //省市区
          that.prov = patientBaseVo.province ? patientBaseVo.province : '';//
          that.citys = patientBaseVo.city ? patientBaseVo.city : '';//
          that.district = patientBaseVo.district ? patientBaseVo.district : '';//

          that.ruleForm.detail = patientBaseVo.address ? patientBaseVo.address : '';
          that.ruleForm.mar = patientBaseVo.maritalStatus ? patientBaseVo.maritalStatus : "";//婚姻状态1未婚  2 已婚  3丧偶  4离婚
          //职业1国家机关、党群组织、企业、事业单位负责人 2专业技术人员 3办事人员和有关人员  4商业、服务业人员  5 农、林、牧、渔、水利业生产人员  6生产、运输设备操作人员及有关人员  7军人  8不便分类的其他从业人员
          that.ruleForm.Occupation = patientBaseVo.job ? patientBaseVo.job : "";
          //that.ruleForm.Occupation = that.Occpationss[occuIndex];
          //BMI
          var bmi = that.getBMI();
          if (bmi === -1) {
            that.ruleForm.BMI = "请完善身高体重";
          } else {
            that.ruleForm.BMI = bmi;
          }
          //TODO:省市区
          //住址

          //紧急联系人
          that.ruleForm.emCont = patientBaseVo.emergencyContact ? patientBaseVo.emergencyContact : "";
          that.ruleForm.contactPhone = patientBaseVo.emergencyPhone ? patientBaseVo.emergencyPhone : "";
          //TODO:设备编码、类型、并发症、确诊时间
          //$("#edit-device-code").val();
          //ruleForm.
          that.ruleForm.diseaseType = patientSugarVo.diabetesType ? patientSugarVo.diabetesType : ''; //类型
          that.ruleForm.DeviceCod = patientSugarVo.deviceId ? patientSugarVo.deviceId : ''; //设备编码
          that.ruleForm.Complica = patientSugarVo.complications ? patientSugarVo.complications : ''; //并发症
          that.ruleForm.timeDiag = patientSugarVo.ensureDate ? patientSugarVo.ensureDate : ''; //确诊时间

          //过敏史
          // that.healthInfor.allergy = patientBaseVo.familyHistory;
          //TODO:疾病史、现病史、现在治疗方式、过去治疗方式
          var _hDisease = patientBaseVo.diseasesHistory ? patientBaseVo.diseasesHistory.split(",") : "";

          if (_hDisease) {
            that.healthInfor.disease = 'false';
            that.hDisease = [];
            that.elses = '';
            //给其他框赋值
            for (var i = 0; i < _hDisease.length; i++) {
              var obj = _hDisease[i];
              var isExist = false;
              for (var j = 0; j < that.HisDisease.length; j++) {
                var aj = that.HisDisease[j];
                if (aj == obj) {
                  isExist = true;
                  that.hDisease.push(obj)
                  break;
                }
              }
              if (!isExist) {
                that.elses += obj;
              }
            }
          } else {
            that.healthInfor.disease = 'true';
            that.hDisease = [];
            that.elses = '';
          }
          //处理数据
          var _hFamily = patientBaseVo.familyHistory ? patientBaseVo.familyHistory.split(",") : "";
          if (_hFamily) {
            that.healthInfor.family = 'false';
            that.hFamily = [];
            that.m_else = '';
            //给其他框赋值
            for (var i = 0; i < _hFamily.length; i++) {
              var obj = _hFamily[i];
              var isExist = false;
              for (var j = 0; j < that.familyHis.length; j++) {
                var aj = that.familyHis[j];
                if (aj == obj) {
                  isExist = true;
                  that.hFamily.push(obj)
                  break;
                }
              }
              if (!isExist) {
                that.m_else += obj;
              }
            }
          } else {
            that.healthInfor.family = 'true';
            that.hFamily = [];
            that.m_else = '';
          }
          //
          that.hThisDisease = patientBaseVo.historyOfPresentIllness ? patientBaseVo.historyOfPresentIllness : "";
          if (that.hThisDisease) {
            that.healthInfor.thisDisease = 'false';
          }
          //
          that.hTreatMethod = patientBaseVo.nowTreatment ? patientBaseVo.nowTreatment.split(",") : "";
          Object.assign(that.copyhTreatMethod, that.hTreatMethod);
          //数据处理
          if (that.hTreatMethod) {
            var arr_1 = [];
            var arr_2 = [];
            var arr_3 = [];
            var arr_4 = [];

            that.hTreatMethod.forEach(function (it) {
              if (it == '饮食控制') {
                that.DietControl = true;
              }
              if (it.indexOf('开始服用') !== -1) {
                arr_1.push(it.slice(0, it.indexOf('开始服用')));
                arr_2.push(it.slice(it.indexOf('开始服用') + 4));
              }
              if (it.indexOf('开始使用') !== -1) {
                arr_3.push(it.slice(0, it.indexOf('开始使用')));
                arr_4.push(it.slice(it.indexOf('开始使用') + 4));
              }
            })
            var OralMedi = [];
            arr_1.map((item, index) => {
              OralMedi.push({'drug': arr_2[index], 'start': item})
            })
            if (OralMedi.length > 0) {
              that.Oral = true;
              that.OralMedi = OralMedi;
            } else {
              that.OralMedi = [{'drug': '', 'start': ''}]
            }
            //
            var Insulin = [];
            arr_3.map((item, index) => {
              Insulin.push({'drug': arr_4[index], 'start': item})
            })
            if (Insulin.length > 0) {
              that.Insul = true;
              that.Insulin = Insulin;
            } else {
              that.Insulin = [{'drug': '', 'start': ''}]
            }
          }

          that.checkList = patientBaseVo.nowTreatment ? patientBaseVo.nowTreatment.split(",") : "";
          if (that.hTreatMethod) {
            that.healthInfor.TreatMethod = 'false';
          }
          //
          that.hAllergy = patientBaseVo.allergicHistory ? patientBaseVo.allergicHistory : "";
          if (that.hAllergy) {
            that.healthInfor.allergy = 'false';
          }
          //
          that.hPastTreatment = patientBaseVo.pastTreatment ? patientBaseVo.pastTreatment : "";
          if (that.hPastTreatment) {
            that.healthInfor.PastTreatment = 'false';
          }
          //劳动强度
          that.labourIntensityRadio = patientBaseVo.labourIntensity ? patientBaseVo.labourIntensity : "";
          //吸烟情况
          that.smokingStatusRadio = patientBaseVo.smokingStatus ? patientBaseVo.smokingStatus : "";
          //吸烟频率
          that.SmokVolume = patientBaseVo.smokingDaily ? patientBaseVo.smokingDaily : "";
          //饮酒
          that.drinkingStatusRadio = patientBaseVo.drinkingStatus ? patientBaseVo.drinkingStatus : "";
          //饮酒类型
          that.drinkTy_ = patientBaseVo.drinkingType ? patientBaseVo.drinkingType : "";
          //饮酒量
          that.HabitsCus.drinkVolume = patientBaseVo.drinkingDaily ? patientBaseVo.drinkingDaily : "";
          //锻炼情况
          that.exerciseFrequencyRadio = patientBaseVo.exerciseFrequency ? patientBaseVo.exerciseFrequency : "";
          //
          that.sleepStatusRadio = patientBaseVo.sleepStatus ? patientBaseVo.sleepStatus : "";
          //
          that.OrdMood = patientBaseVo.peacetimeEmotion ? patientBaseVo.peacetimeEmotion : "";
          //
          that.Remarks = patientBaseVo.remark ? patientBaseVo.remark : "";
          //
          that.HealthRevi = patientBaseVo.healthReview ? patientBaseVo.healthReview : "";
          var foodHabitRadio_ = patientBaseVo.foodHabit ? patientBaseVo.foodHabit.split(",") : "";
          foodHabitRadio_.forEach(function (item) {
            that.foodHabitRadio.push(JSON.parse(item))
          });

        }
      }).catch(function (err) {
        that.message = "error" + err;
      })

      //获取糖尿病类型
      funBus.getDiabetesType(that);
      
      //职业
      that.$api.dictionarys({typeCode:'job'},res=> {
        if (res.status == 200) {
          if (res.data.data) {
            that.Occpationss = res.data.data;
          }

        }
      }).catch(function (err) {
        that.message = err;
      })

      //劳动强度
      that.$api.dictionarys({typeCode:'labour_intensity'},res=> {
        if (res.status == 200) {
          if (res.data.data) {
            that.labIntensity_ = res.data.data;
          }

        }
      }).catch(function (err) {
        that.message = err;
      })

      //吸烟情况
      that.$api.dictionarys({typeCode:'smoking_status'},res=> {
        if (res.status == 200) {
          if (res.data.data) {
            that.smokStatus_ = res.data.data;
          }

        }
      }).catch(function (err) {
        that.message = err;
      })

      //平时情绪
      that.$api.dictionarys({typeCode:'moodType'},res=> {
        if (res.status == 200) {
          if (res.data.data) {
            that.moodType_ = res.data.data;
          }

        }
      }).catch(function (err) {
        that.message = err;
      })

      //饮酒情况
      that.$api.dictionarys({typeCode:'drinking_status'},res=> {
        if (res.status == 200) {
          if (res.data.data) {
            that.drinkStatus_ = res.data.data;
          }

        }
      }).catch(function (err) {
        that.message = err;
      })
      funBus.getPatientTags(this); //患者标签

      //饮酒类型
      that.$api.dictionarys({typeCode:'drinking_type'},res=> {
        if (res.status == 200) {
          if (res.data.data) {
            that.drinkingTypes = res.data.data;
          }

        }
      }).catch(function (err) {
        that.message = err;
      })

      //运动
      that.$api.dictionarys({typeCode:'exercise_frequency'},res=> {
        if (res.status == 200) {
          if (res.data.data) {
            that.exerciseFrequency = res.data.data;
          }

        }
      }).catch(function (err) {
        that.message = err;
      })

      //睡眠
      that.$api.dictionarys({typeCode:'sleep_status'},res=> {
        if (res.status == 200) {
          if (res.data.data) {
            that.sleepStatus = res.data.data;
          }

        }
      }).catch(function (err) {
        that.message = err;
      })

      //饮食偏好
      that.$api.dictionarys({typeCode:'food_habit'},res=> {
        if (res.status == 200) {
          if (res.data.data) {
            that.foodHabit = res.data.data;
          }
        }
      }).catch(function (err) {
        that.message = err;
      })
    },
    beforeMount: function () {
      this.updateCity();
      this.updateDistrict();
    },
    watch: {

      prov: function () {

        this.updateCity();
        this.updateDistrict();
      },
      citys: function () {
        this.updateDistrict();
      }
    }
  }
</script>

<style scoped>
  button.cancel {
     margin: 0;
     background-color: #F56C6C;
  }
  .el-dialog__body {
    line-height: 39px;
  }
  .edits_ {
    vertical-align: top;
    cursor: pointer;
    width: 80px;
    height: 30px;
    outline: none;
    background-color: rgba(64, 158, 255, .1);
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #409EFF;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid rgba(64, 158, 255, .2);
  }

  .radiosTag {
    display: inline !important;
    vertical-align: inherit;
  }

  .radiosTag .el-radio {
    margin: 0 5px 10px !important;
  }

  li {
    list-style: none;
  }

  ol li {
    float: left;
    margin-right: 16px;
    box-sizing: border-box;
    height: 36px;
    line-height: 36px;
    padding: 0 8px;
    cursor: pointer;
    font-size: 14px;
  }

  ol li:nth-child(1) {
    width: 75px;
  }

  ol li:nth-child(2) {
    width: 30px;
  }

  ol li:nth-child(3) {
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
    width: 100%;
    z-index: 1000;
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

  .button {
    float: right;
    margin: 30px 30px 30px 0;
    cursor: pointer;
    text-align: center;
    color: white;
    line-height: 28px;
    width: 60px;
    height: 28px;
    background-color: #267bf7;
    border-radius: 4px;
  }

  .tabs {
    display: inline-block;
    /*width: 454px;*/
    vertical-align: top;
  }

  .tabs tr {
    display: block;
    position: relative;
    height: 60px;
  }

  .tabs tr td {
    padding-right: 5px;
  }

  .tabs tr td img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    cursor: pointer;
  }

  .TreatMethod {
    /*display: block !important;*/
    width: 120px;
  }

  .row .col select {
    width: 107px;
  }

  /**/
  .demo-healthInfor .diseases {
    /* height: 300px; */
    overflow: auto;
    /* width: 560px; */
    /* position: absolute; */
    /* left: 109px; */
    /* top: 55px; */
    background: white;
    box-sizing: border-box;
    z-index: 100;
    /* padding-bottom: 20px; */
    /* box-shadow: 0px 2px 4px 0px rgba(4, 0, 0, 0.06); */
    /* border: solid 1px rgba(206, 206, 206, 0.7); */
  }

  .dise {

  }

  .diseases .el-checkbox {
    box-sizing: border-box;
    padding-left: 15px;
    width: 92px;
    height: 35px;
    margin: 0;
    display: inline-block;
    vertical-align: middle;
    margin-top: 13px;
  }

  .demo-healthInfor .el-form-item .el-button {
    width: 560px;
    border: none;
    vertical-align: top;
    display: inline-block;
    padding: 0;
  }

  .demo-healthInfor .el-form-item .el-textarea {
    width: 560px;
    vertical-align: top;
    display: inline-block;
  }

  .demo-healthInfor .el-form-item, .demo-HabitsCus .el-form-item {
    width: 50%;
    float: left;
    height: 60px;
    display: inline-block;
  }

  .demo-ruleForm, .demo-healthInfor, .demo-HabitsCus {
    display: block;
    width: 100%;
    min-height: 254px;
    height: auto;
  }

  .demo-ruleForm .el-form-item {
    width: 20%;
    display: inline-block;
  }

  /*省·市区*/
  .row {
    display: inline-block;
    vertical-align: middle;
    width: 341px;
  }

  .col {
    float: left;
    width: 33%;
  }

  .container-root {
    position: absolute;
    top: 60px;
    left: 160px;
    padding: 19px 20px;
    background: #F7F8FA;
  }

  .label-patient-manager {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    line-height: 0px;
    letter-spacing: 0px;
    color: #111111;
    text-decoration: none;
    cursor: pointer;
  }

  .label-to {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    line-height: 0px;
    letter-spacing: 0px;
    color: #111111;
    margin-left: 4px;
  }

  .label-add-patient {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 0px;
    letter-spacing: 0px;
    color: #267bf7;
  }

  .btn-back {
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
    float: right;
    text-align: center;
  }

  .container-base-info {
    border: 1px solid #dddddd;
    width: 1661px;
    background-color: #ffffff;
    padding: 20px;
    margin-top: 19px;
    border-radius: 4px;
  }

  .label-base-info {
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 0px;
    letter-spacing: 0px;
    color: #333333;
    margin-top: 12px;
    margin-left: 20px;
    display: inline-block;
    float: bottom;
  }

  .container-search {
    width: 350px;
    height: 28px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px rgba(206, 206, 206, 0.7);
    float: right;
    margin-right: 20px;
  }

  .input-search {
    width: 290px;
    height: 26px;
    font-size: 12px;
    color: #333333;
    background-color: transparent;
    padding-left: 12px;
    padding-right: 12px;
    border: 0px;
    border-right: 1px solid rgba(206, 206, 206, 0.7);
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  .btn-search {
    width: 35px;
    height: 27px;
    background: url(../../../images/patientManage/search_icon.png) no-repeat center;
    cursor: pointer;
    float: right;
  }

  .search-result {
    width: 350px;
    height: 200px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px rgba(206, 206, 206, 0.7);
    float: right;
    margin-right: 20px;
  }

  .item-search-result {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: #ffffff;
  }

  .item-search-result-mouse-enter {
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    background-color: #E9F2FE;
  }

  .line-divider {
    width: 100%;
    height: 1px;
    background-color: #f1f1f1;
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .div-info-0 {
    width: 100%;
    margin-left: 47px;
    margin-bottom: 30px;
    align-items: center;
  }

  .label-required {
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 0px;
    letter-spacing: 0px;
    color: #e95959;
    margin-top: 12px;
    padding-top: 2px;
    float: bottom;
  }

  .edit-120 {
    width: 120px;
  }

  .label-info {
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 0px;
    letter-spacing: 0px;
    color: #333333;
  }

  input {
    cursor: pointer;
    outline: none;
    height: 34px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px rgba(206, 206, 206, 0.7);
    /*margin-left: 10px;*/
  }

  textarea {
    cursor: pointer;
    outline: none;
    height: 24px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px rgba(206, 206, 206, 0.7);
    margin-left: 10px;
  }

  .radio {
    width: 12px;
    height: 12px;
  }

  .div-info-1 {
    width: 100%;
    height: 45px;
    /*margin-left: 32px;
    margin-bottom: 20px;*/
  }

  .div-tags {
    width: 748px;
    height: 38px;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px 0px;
    border: solid 1px rgba(206, 206, 206, 0.7);
    padding-top: 12px;
  }

  select {
    cursor: pointer;
    outline: none;
    height: 35px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #ffffff;
    border-radius: 4px;
    border: solid 1px rgba(206, 206, 206, 0.7);
    margin-left: 10px;
  }

  .label-tag-sel {
    width: 75px;
    background-color: #267bf7;
    border-radius: 13px;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 0px;
    letter-spacing: 0px;
    color: #ffffff;
    display: inline-block;
    text-align: center;
    padding-top: 13px;
    padding-bottom: 13px;
    margin-left: 5px;
    margin-right: 5px;
  }

  .label-tag-nor {
    width: 75px;
    background-color: #f1f5f8;
    border-radius: 12px;
    opacity: 0.1;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 0px;
    letter-spacing: 0px;
    color: #8b9eba;
    display: inline-block;
    text-align: center;
    padding-top: 13px;
    padding-bottom: 13px;
    margin-left: 5px;
    margin-right: 5px;
  }

  .label-tag-edit {
    width: 75px;
    background-color: #F2F6F8;
    border-radius: 13px;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 0px;
    letter-spacing: 0px;
    color: #267bf7;
    display: inline-block;
    text-align: center;
    padding-top: 13px;
    padding-bottom: 13px;
    margin-left: 5px;
    margin-right: 5px;
  }

  .div-bottom {
    margin-top: 30px;
    margin-right: 20px;
    margin-bottom: 110px;
    float: right;
  }

  .btn-confirm {
    background-color: #267bf7;
    border-radius: 4px;
    color: #ffffff;
  }

  .btn-cancel {
    background-color: #ffffff;
    border: solid 1px rgba(206, 206, 206, 0.7);
    color: #111111;
    margin-right: 20px;
  }

  .btns {
    width: 60px;
    height: 28px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
    text-align: center;
    line-height: 28px;
    display: inline-block;
  }

  input[type=radio]:hover {
    border: 2px solid #D0D0D0;
  }

  input[type=radio]:focus {
    border: 2px solid #1BA9D9;
  }


</style>
