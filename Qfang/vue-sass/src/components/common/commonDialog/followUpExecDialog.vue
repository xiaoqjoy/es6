<template>
  <div class="commonDialog">

    <!-- 执行随访弹窗 -->
    <div class="followPlans" v-if="plans">
      <div class="followPlan">
        <h5>随访执行</h5>
        <span class="close" @click="closes_u('ruleForm1')">X</span>
        <!---->
        <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm" style="padding-top: 20px;border-top: 1px solid #e0e0e0;margin-top: 30px;">
          <el-form-item label="患者姓名">
            <el-input v-model="patientInfo.patientName" disabled></el-input>
          </el-form-item>
          <el-form-item label="出生年月">
            <el-input v-model="patientInfo.birthday" disabled></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="patientInfo.sex" disabled></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="patientInfo.phone" disabled></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="patientInfo.idCard" disabled></el-input>
          </el-form-item>
          <el-form-item label="档案号码">
            <el-input v-model="fileNumber" disabled></el-input>
          </el-form-item>
          <el-form-item label="身高">
            <el-input v-model="patientInfo.height" disabled></el-input>
          </el-form-item>
          <el-form-item label="体重">
            <el-input v-model="patientInfo.weight" disabled></el-input>
          </el-form-item>
          <el-form-item label="BMI指数">
            <el-input v-model="patientInfo.bmi" disabled></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="diabetesTypeName" disabled></el-input>
          </el-form-item>
          <el-form-item label="糖龄">
            <el-input v-model="patientSugarVo.ensureDate" disabled></el-input>
          </el-form-item>
          <el-form-item label="并发症" style="width: 730px;display: block;">
            <el-input v-model="patientSugarVo.complications" disabled></el-input>
          </el-form-item>
          <el-form-item label="计划人员">
            <el-select v-model="foldet.planUserName" placeholder="请选择" disabled>
              <el-option v-for="(item,index) in Executor" :key="item.userId" :label="item.nickname" :value="item.userId">
                {{item.nickname}}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="计划时间">
            <el-date-picker disabled v-model="foldet.planTime" type="datetime" style="width: 140px;" placeholder="计划时间">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="随访内容" style="width: 730px;display: block;">
            <el-input disabled type="textarea" resize="none" :rows="3" v-model="foldet.content">
            </el-input>
          </el-form-item>

          <el-form-item label="随访时间" prop="FollowTime">
            <el-date-picker v-model="ruleForm1.FollowTime" type="datetime" style="width: 140px;" placeholder="请选择" :picker-options="pickerOptions2">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="随访人员" prop="FollowPer">
            <el-select v-model="ruleForm1.FollowPer" placeholder="请选择">
              <el-option v-for="item in Executor" :key="item.userId" :label="item.nickname" :value="item.userId">
                {{item.nickname}}
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="随访方式" prop="followWay">
            <el-select v-model="ruleForm1.followWay" placeholder="请选择">
              <el-option v-for="item in followWayArr" :key="item.itemKey" :label="item.itemValue" :value="item.itemKey">
                {{item.itemValue}}
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="随访结论" prop="FollowCon" class="width100">
            <el-input type="textarea" maxlength="400" :rows="3" resize="none" placeholder="请输入内容" v-model.trim="ruleForm1.FollowCon">
            </el-input>
            <!--字数提示-->
            <span class="wordsNum">{{contentWords}}/400</span>
          </el-form-item>

          <el-form-item style="text-align: right;width: 100%;">
            <el-button @click="closes_u('ruleForm1')">取消</el-button>
            <el-button type="primary" @click="submitForm_u('ruleForm1')">确定</el-button>
          </el-form-item>
        </el-form>

        <!--微信头像-->
        <div class="weChats">
          <div class="bgImg" :class="[patientInfo.sex=='女' ? 'womanHeadImg' : 'manHeadImg']"></div>
          <span>微信头像</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import funBus from '../../../assets/js/funBus'
  import eventBus from '../../../assets/js/eventBus';

  export default {
    name: 'followUpExecDialog',
    data() {
      return {
        plans: false,
        rules: {
          FollowTime: [{
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }],
          FollowPer: [{
            required: true,
            message: '请选择随访人员',
            trigger: 'change'
          }],
          followWay: [{
            required: true,
            message: '请选择随访方式',
            trigger: 'change'
          }],
          FollowCon: [{
              required: true,
              message: '请输入内容',
              trigger: 'change'
            },
            {
              validator: funBus.validateIsNull,
              trigger: 'blur'
            }
          ],
        },
        pickerOptions2: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        foldet: {}, // 随访计划
        ruleForm1: {
          FollowTime: '',
          FollowPer: '',
          followWay: '',
          FollowCon: ''
        },
        diabetesTypeName: '',
        followWayArr: [], //随访方式
        fileNumber: "", //档案号码
        Executor: "", //随访人员列表
        patientInfo: {},
        patientSugarVo: {},
        followUpId: '', // 随访id
        complicationsArr: [],
        contentWordsNums: 400, //随访结论限制字数
      }
    },
    created: function () {
      funBus.getDictionarysByTypeCode(this, 'followWay'); //随访方式
      funBus.getDictionarysByTypeCode(this, 'complications'); //并发症列表
      funBus.getDictionarysByTypeCode(this, 'diabetes_type'); //糖尿病类型列表
      //if(!!sessionStorage.getItem('user')){
      //  let user = JSON.parse(sessionStorage.getItem('user'));
      //  funBus.geFollowplaners(this, {organizationId: user.organizationId}); //获取随访计划人员
      //}        
    },
    computed: {
      contentWords() {
        return this.contentWordsNums - this.ruleForm1.FollowCon.length;
      }
    },      
    methods: {
      //获取随访计划人员
      geFollowplaners() {
        let user = JSON.parse(sessionStorage.getItem('user'));
        funBus.geFollowplaners(this, {
          organizationId: user.organizationId
        });
      },
      //关闭随访执行
      closes_u(formName) {
        this.$refs[formName].resetFields();
        this.plans = false;
      },
      //确定随访执行
      submitForm_u(formName) {
        let that = this;

        that.$refs[formName].validate((valid) => {
          if (valid) {
            that.openLoading();
            let data = {
              'followUpId': that.followUpId,
              'result': that.ruleForm1.FollowCon,
              'realTime': that.ruleForm1.FollowTime,
              'realUserId': that.ruleForm1.FollowPer,
              'type': that.ruleForm1.followWay
            }

            that.$api.followExecute(data, res => {
              if (res.status == 200) {
                if (res.data.code == 0) {
                  that.plans = false;
                  that.$refs[formName].resetFields();
                  that.$message.success('随访执行成功！');
                  //数据传回到homePage的随访表
                  eventBus.$emit('updateFollowUpTable');
                }
              }
              that.closeLoading();
            }, res => {
              that.$message(res.data.errMsg || res.data.data);
              that.closeLoading();
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }
</script>

