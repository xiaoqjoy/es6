<template>
  <div class="commonDialog">

    <!-- 随访明细弹窗 -->
    <div class="followPlans form_d" v-if="ifFolDetail">
      <div class="followPlan details_">
        <h5>随访明细</h5>
        <span class="close" @click="closes_d">X</span>
        <el-form :label-position="labelPos" label-width="75px" class="demo-ruleForm" style="padding-top: 20px;border-top: 1px solid #e0e0e0;margin-top: 30px;">
          <el-form-item label="患者姓名:">
            {{patientInfo==null ? '' : patientInfo.patientName}}&nbsp;
          </el-form-item>
          <el-form-item label="出生年月:">
            {{patientInfo==null ? '' : patientInfo.birthday}}&nbsp;
          </el-form-item>
          <el-form-item label="性别:">
            {{patientInfo.sex}}&nbsp;
          </el-form-item>
          <el-form-item label="手机号:">
            {{patientInfo==null ? '' : patientInfo.phone}}&nbsp;
          </el-form-item>
          <el-form-item label="身份证号:">
            {{patientInfo==null ? '' : patientInfo.idCard}}&nbsp;
          </el-form-item>
          <el-form-item label="档案号码:">
            {{fileNumber}}&nbsp;
          </el-form-item>
          <el-form-item label="身高:">
            {{patientInfo==null ? '' : patientInfo.height ? patientInfo.height + 'cm' : ''}}&nbsp;
          </el-form-item>
          <el-form-item label="体重:">
            {{patientInfo==null ? '' : patientInfo.weight ? patientInfo.weight + 'kg' : ''}}&nbsp;
          </el-form-item>
          <el-form-item label="BMI指数:">
            {{patientInfo==null ? '' : patientInfo.bmi}}&nbsp;
          </el-form-item>
          <el-form-item label="类型:">
            {{diabetesTypeName}}&nbsp;
          </el-form-item>
          <el-form-item label="糖龄:">
            {{patientSugarVo.ensureDate}}&nbsp;
          </el-form-item>
          <el-form-item label="并发症:" class="width100">
            {{patientSugarVo.complications}}&nbsp;
          </el-form-item>
          <el-form-item label="计划人员:">
            {{foldet.planUserName}}&nbsp;
          </el-form-item>
          <el-form-item label="计划时间:">
            {{foldet.planTime}}&nbsp;
          </el-form-item>
          <el-form-item label="随访内容:" class="width100">
            <p class="formDetail">{{foldet.content}}&nbsp;</p>
          </el-form-item>
          <el-form-item label="随访时间:">
            {{foldet.realTime}}&nbsp;
          </el-form-item>
          <el-form-item label="随访人员:">
            {{foldet.realUserName}}&nbsp;
          </el-form-item>
          <el-form-item label="随访方式:">
            {{foldet.type}}&nbsp;
          </el-form-item>
          <el-form-item label="随访结论:" class="width100">
            <p class="formDetail">{{foldet.result}}&nbsp;</p>
          </el-form-item>
          <el-form-item style="text-align: right;width: 100%;">
            <el-button type="primary" @click="closes_d">确定</el-button>
          </el-form-item>
        </el-form>

        <!--微信头像-->
        <div class="weChats" style="right: 80px;">
          <div class="bgImg" :class="[patientInfo.sex=='女' ? 'womanHeadImg' : 'manHeadImg']"></div>
          <span>微信头像</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import funBus from '../../../assets/js/funBus';
  export default {
    name: 'followUpDetailDialog',
    data() {
      return {
        ifFolDetail: false, // 是否显示随访明细
        foldet: {}, // 随访明细对象
        fileNumber: '', // 档案号
        diabetesTypeName: '',
        patientInfo: {},
        patientSugarVo: {},
        labelPos: "left", //form内label标签内容对齐方式
        complicationsArr: [],
        diabetesTypeArr: [],
        followWayArr: [],
      }
    },
    created(){
      funBus.getDictionarysByTypeCode(this, 'followWay'); //随访方式列表
      funBus.getDictionarysByTypeCode(this, 'complications'); //并发症列表
      funBus.getDictionarysByTypeCode(this, 'diabetes_type'); //糖尿病类型列表
    },    
    methods: {
      //关闭随访明细
      closes_d() {
        this.ifFolDetail = false;
        this.patientInfo = {};
        this.patientSugarVo = {};
        this.foldet = {};
        this.fileNumber = '';
        this.diabetesTypeName = '';
      },
    }
  }
</script>

