<template>
  <div class="commonDialog">

    <!--查看干预弹窗-->
    <div class="ViewInters" v-if="ifViewInter">
      <div class="ViewInter">
        <h5>查看干预</h5>
        <span class="close" @click="closes_d">X</span>
        <el-form :label-position="labelPos" label-width="75px" class="demo-ruleForm" style="padding-top: 20px;border-top: 1px solid #e0e0e0;margin-top: 30px;">
          <el-form-item label="患者姓名:">
            {{patientInfo.patientName}}&nbsp;
          </el-form-item>
          <el-form-item label="出生年月:">
            {{patientInfo.birthday}}&nbsp;
          </el-form-item>
          <el-form-item label="性别:">
            {{patientInfo.sex}}&nbsp;
          </el-form-item>
          <el-form-item label="手机号:">
            {{patientInfo.phone}}&nbsp;
          </el-form-item>
          <el-form-item label="身高:">
            {{patientInfo.height ? patientInfo.height + 'cm' : ''}}&nbsp;
          </el-form-item>
          <el-form-item label="体重:">
            {{patientInfo.weight ? patientInfo.weight + 'kg' : ''}}&nbsp;
          </el-form-item>
          <el-form-item label="类型:">
            {{diabetesTypeName}}&nbsp;
          </el-form-item>
          <el-form-item label="并发症:">
            {{ patientSugarVo.complications}}&nbsp;
          </el-form-item>
          <el-form-item label="干预类型:" class="width100">
            {{ healthInter_.intervertType}}&nbsp;
          </el-form-item>
          <el-form-item label="方案名称:" class="width100">
            {{ healthInter_.name}}&nbsp;
          </el-form-item>
          <el-form-item label="干预内容:" class="width100">
            <p class="formDetail">{{healthInter_.content}}&nbsp;</p>
          </el-form-item>
          <el-form-item label="发送时间:" class="width100">
            {{ healthInter_.planSendTime !==null ? formatDate(healthInter_.planSendTime) : healthInter_.realSendTime !==null ? formatDate(healthInter_.realSendTime): ''}}&nbsp;
          </el-form-item>
          <el-form-item style="text-align: right;width: 100%;">
            <el-button type="primary" @click="closes_d">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
  import funBus from '../../../assets/js/funBus';
  export default {
    name: 'interventionDetailDialog',
    data: function () {
      return {
        ifViewInter: false,
        patientInfo: {},
        patientSugarVo: {},
        diabetesTypeName: '',
        healthInter_: {},
        interventionId: '', // 干预id
        labelPos: "left",
        complicationsArr: [],
        diabetesTypeArr: [], // 糖尿病类型
      }
    },
    created(){
      funBus.getDictionarysByTypeCode(this, 'complications'); //并发症列表
      funBus.getDictionarysByTypeCode(this, 'diabetes_type'); //糖尿病类型列表
    },
    methods: {
      //关闭查看干预弹窗
      closes_d() {
        this.ifViewInter = false;
        this.patientInfo = {};
        this.patientSugarVo = {};
        this.healthInter_ = {};
        this.diabetesTypeName = '';
      },
      // 获取干预数据(用于其他组件引用)
      getInterventionDetail(interventionId) {

        this.$api.queryByinte({
          interventionId: interventionId
        }, res => {
          if (res.status == 200) {
            if (res.data.code == 0) {
              this.healthInter_ = res.data.data;
            }
          }
        }, res => {
          this.$message(res.data.errMsg || res.data.data);
        })
      }
    }
  }
</script>

