<template>
  <div class="import-message">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <span class="title">发起调查</span>
        <span class="el-icon-close button button__close" @click="close_()"></span>
      </div>
      <div class="scrollbar">
      <div class="anti-fraud_dialog-box__middle" v-for="(item, index) in surveyHis" :key="index">
        <div class="anti-fraud_dialog-box__middle_title">调查{{SectionToChinese(index+1)}}
          <button v-if="isReport[index]" class="btn" @click="openSurveyReport(index)">调查报告</button>
        </div>
        <div class="scrollbar__box">
          <div class="clearfix">
            <div class="top_conten"><span class="top_conten_title">发起调查人：</span><span class="top_content_font">{{item.surveyCreatedId}}</span></div>
            <div class="top_conten"><span class="top_conten_title">发起调查时间：</span><span class="top_content_font">{{item.surveyCreatedDate}}</span></div>
            <div class="top_conten"><span class="top_conten_title">调查经理：</span><span class="top_content_font" v-if="isReport[index]">{{item.surveyManagerId}}</span></div>
          </div>
          <div class="clearfix" v-if="isBORF">
            <div class="top_conten"><span class="top_conten_title">调查类型：</span><span class="top_content_font">{{item.surveyTypeCode | transcode(survey_type_code)}}</span></div>
          </div>
          <div class="clearfix">
            <div class="top_conten"><span class="top_conten_title">发起调查原因：</span></div>
          </div>
          <div class="top_conten reson_font" v-for="(i, k) in item.content" :key="k"><p class="top_content_font">{{k+1+'、'+i.configTitle}}</p></div>
          <div class="clearfix">
            <div class="f__left top_conten"><span class="top_conten_title">其他备注：</span><span class="top_content_font">{{item.remarkTxt}}</span></div>
          </div>
        </div>
      </div>
      <div v-if="InitiationShow" class="product-content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top" label-width="100px" class="demo-ruleForm" hide-required-asterisk>
          <el-form-item label="发起调查原因" prop="region">
            <el-select :disabled="disabled" :popper-append-to-body="false" class="form__select" v-model="ruleForm.region" multiple placeholder="请选择">
              <el-option  v-for="item in surveyReasonCode"
            :key="item.configCode"
            :label="item.configTitle"
            :value="item.configCode"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调查类型" prop="surveyType" v-if="isBORF" class="form__select">
            <el-select v-model="ruleForm.surveyType" :popper-append-to-body="false" placeholder="请选择" multiple class="form__select" :disabled="disabled">
              <el-option
                v-for="item in survey_type_code"
                :key="item.configCode"
                :label="item.configTitle"
                :value="item.configCode">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="其他备注" class="el-form__remark" prop="remarkTxt">
            <el-input :disabled="disabled" class="form__textarea" type="textarea" v-model="ruleForm.remarkTxt" resize="none"></el-input>
          </el-form-item>
        </el-form>
      </div>
      </div>
      <el-button :disabled="disabled" type="primary" class="remark_btn" @click="submitForm" v-if="InitiationShow">发起调查</el-button>
    </div>
    <survey-report v-if="reportDialog" @close="close" :notApprovalAudit="showBtn" :isLookOver="isLookOver" :disabled="disabled" :custInfo="custInfo"></survey-report>
  </div>
</template>

<script>
import { aprAudApi } from "../../js/server.js";
import surveyReport from "../../../survey/survey-report/survey-report.vue";

export default {
  props: ['isBORF', 'surveyHis', 'surveyStatusCode', "disabled", 'appOrAud', 'applicationId', 'surveyReasonCode', 'showBtn', 'surveyStatus', 'survey_type_code'],
  data() {
    return {
      isDouble: true,
      disabledB: this.disabled,
      content0: [],
      content1: [],
      reasonCN: [],
      isReport: [], // 是否展示调查报告
      reportDialog: false, // 调查报告弹窗
      isLookOver: true,
      custInfo: {
        custName: '', // 客户姓名
        careerTypeCode: '', // 客户类型
        initDistance: '', // 目前调查距离
        workplaceName: '' // 单位名称
      },
      url: '',
      InitiationShow: false,
      isShowEg: true,
      surveyReason: '',
      configTitle: [],
      label: '',
      value: '',
      InitiationSend: false,
      ruleForm: {
        region: [],
        remarkTxt: '',
        surveyType: []
      },
      rules: {
        region: [
          { required: true, message: '分类内容不能为空', trigger: 'change' }
        ],
        surveyType: [
          { required: true, message: '调查类型', trigger: 'change' }
        ],
        remarkTxt: [
          { validator: (rule, value, callback) => {
              const valReg = /^.{0,200}$/;
              if (!valReg.test(value) && !!value) {
                return callback(new Error('请填写 0 - 200 个字符'));
              } else {
                callback();
              }
            },
            trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    // this.getDict();
    this.$store.dispatch('getSurveyFieldConfig');
    this.init();
    // if (this.surveyHis.length === 2) {
    //   this.InitiationShow = false;
    //   this.isDouble = true;
    //   this.isReport[0] = 1;
    //   this.isReport[1] = (this.surveyStatus === '调查完成') ? 1 : 0;
    // } else {
    //   this.InitiationShow = true;
    //   this.isDouble = false;
    //   this.isReport[0] = (this.surveyStatus === '调查完成') ? 1 : 0;
    // }
    // console.log(this.isReport, 'kankanp');
    for (let i = 0; i < this.surveyHis.length; i++) {
      // debugger;
      let msg = [
        {configTitle: '系统自动发起'}
      ];
      if (this.surveyHis[i].triggerFlag === 'f2f') {
        this.$set(this.surveyHis[i], "content", msg);
        this.$set(this.surveyHis[i], "surveyCreatedId", '系统');
      } else {
        this.getValue(this.surveyHis[i].surveyReasonCode, i);
      }
    }
    console.log(this.surveyHis, '历史2');
  },
  computed: {
    isShowBtn() {
      if (this.surveyStatusCode === 'survey') {
          return false;
        } else {
          return true;
        }
    }
  },
  filters: {
    transcode(code, dict) {
      code = code.split('|');
      let list = dict.map(_v => {
        for (let i = 0; i < code.length; i++) {
          if (code[i] === _v.configCode) {
            return _v.configTitle;
          }
        }
      });
      list = list.filter(e => e);
      return list.join('，');
    }
  },
  methods: {
    init() {
      if (this.isBORF) {
        this.InitiationShow = true;
        this.surveyHis.forEach((_v, _index) => {
          this.isReport[_index] = 1;
        });
        this.isReport[this.isReport.length - 1] = (this.surveyStatus === '调查完成');
        return;
      }
      if (this.surveyHis.length === 2) {
        this.InitiationShow = false;
        this.isDouble = true;
        this.isReport[0] = 1;
        this.isReport[1] = (this.surveyStatus === '调查完成') ? 1 : 0;
      } else {
        this.InitiationShow = true;
        this.isDouble = false;
        this.isReport[0] = (this.surveyStatus === '调查完成') ? 1 : 0;
      }
    },
    // 关闭调查报告
    close() {
      this.reportDialog = false;
    },
    // 打开调查报告
    openSurveyReport(index) {
      this.$store.commit('set_applicationId', this.applicationId);
      this.$store.commit('set_surveyId', this.surveyHis[index].surveyReportId);
      let routeData = null;
      if (this.appOrAud) {
        routeData = this.$router.resolve({
          name: "surveyReportA",
          query: {
            disabled: this.disabled,
            notApprovalAudit: this.showBtn
          }
        });
      } else {
        routeData = this.$router.resolve({
          name: "surveyReportB",
          query: {
            disabled: this.disabled,
            notApprovalAudit: this.showBtn
          }
        });
      }
      window.open(routeData.href, "_blank");
      // this.reportDialog = true;
    },
    // 转个码
    getValue(item, index) {
        var data = {
        configType: "investigation_reason",
        configValue: item
      };
      this.$MyFetch.get(aprAudApi.taskDetail.OperationTranConfig, data)
      .then(data => {
        this.$set(this.surveyHis[index], "content", data);
      })
      .catch(err => {
        this.$error(err.message);
      });
    },
    // 修改调查状态
    sendCode() {
      this.$emit("surveyStatusCodeChange");
    },
    submitForm() {
      this.disabledB = !this.disabledB;
      if (this.surveyStatusCode === 'reserve') {
        this.$message({
          message: '本次申请已经正在调查中,无需重复发起',
          type: 'warning'
        });
        this.disabledB = !this.disabledB;
      } else {
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            let data = {
            remarkTxt: this.ruleForm.remarkTxt,
            surveyReasonCode: this.ruleForm.region,
            surveyTypeCode: this.ruleForm.surveyType
          };
          if (this.appOrAud) {
            this.url = `${aprAudApi.taskDetail.surveyOper}/${this.$route.query.appID}`;
          } else {
            this.url = `${aprAudApi.aud.taskDetail.surveyOper}/${this.$route.query.appID}`;
          };
          this.$MyFetch.post(this.url, data)
          .then((data = {}) => {
            this.disabledB = !this.disabledB;
            console.log('发起调查成功');
            this.sendCode();
            this.close_();
            if (this.appOrAud) {
              this.$router.push({
                name: "approval-pending",
                path: "/approval-pending"
              });
            } else {
              this.$router.push({
                name: "audit-pending",
                path: "/audit-pending"
              });
            }
          })
          .catch(err => {
            this.disabledB = !this.disabledB;
           this.$error(err.message);
          });
          } else {
            this.disabledB = !this.disabledB;
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    InitiationTo() {
      this.isShowEg = false;
      this.InitiationShow = true;
      this.InitiationSend = true;
    },
    getDict() {
      let arr = ['survey_type_code'];
      this.getMultipleLibrary(arr, this.disabled).then(_data => {
        this.survey_type_code = _data.survey_type_code;
      }).catch(_err => {
        this.confirmFn(_err.message, 'error');
      });
    },
    // 获取多个下拉项
    getMultipleLibrary(arr, isReadonly = false) {
      let data = {
        categoryCodes: arr,
        getAll: isReadonly
      };
      return this.$MyFetch.get(aprAudApi.multipleSelect, data);
    },
    getReason(data) {
      return new Promise((resolve, reject) => {
        this.url = aprAudApi.taskDetail.OperationConfig;
        this.$MyFetch
          .get(this.url, data)
          .then((data = {}) => {
            resolve(data);
          })
          .catch(err => {
            this.$error(err.message);
          });
      });
    },
    close_() {
      this.$emit("clsoe_windowAlert");
    },
    SectionToChinese(section) {
      let chnNumChar = [
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九"
      ];
      let chnUnitChar = ["", "十", "百", "千"];
      let strIns = "";
      let chnStr = "";
      let unitPos = 0;
      let zero = true;
      while (section > 0) {
        let v = section % 10;
        if (v === 0) {
          if (!zero) {
            zero = true;
            chnStr = chnNumChar[v] + chnStr;
          }
        } else {
          zero = false;
          strIns = chnNumChar[v];
          strIns += chnUnitChar[unitPos];
          chnStr = strIns + chnStr;
        }
        unitPos++;
        section = Math.floor(section / 10);
      }
      return chnStr;
    }
  },
  components: {
    surveyReport
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
.dialog-box {
  width: 946px;
  max-height: 600px;
  .scrollbar{
    max-height: 480px;
    overflow-y: auto;
    .scrollbar__box{
      height: 126px;;
      overflow-y: scroll;
      .reson_font{
        width: 666px;
        text-align: left;
      }
    }
  }
  .product-title-img {
    > img {
      width: 20px;
      height: 20px;
      position: absolute;
      right: 100px;
      top: 20px;
    }
  }
  .dialog-box-group {
    position: absolute;
    right: 40px;
  }
  .anti-fraud_dialog-box__middle {
    width: 886px;
    // height: 100%;
    padding: 0 0 10px 0;
    background: #fff;
    border-radius: 4px;
    margin: 10px auto 20px auto;
    border: 1px solid #e9e9e9;
    .anti-fraud_dialog-box__middle_title {
      border-bottom: 1px solid #e9e9e9;
      line-height: 40px;
      position: relative;
      .btn{
        background: #FFFFFF;
        border: 1px solid #538BF1;
        border-radius: 4px;
        color: #538BF1;
        width: 80px;
        height: 30px;
        position: absolute;
        right: 20px;
        top: 5px;
        line-height: 0;
      }
    }
  }
  /* 标题 */
  .product-content{
    margin: 9px;
    width: 886px;
    margin: 20px auto;
    > p {
      text-align: left;
      line-height: 40px;
      font-size: 12px;
      color: #BBBBBB;
      letter-spacing: 1.09px;
    }
    > .select {
      width: 886px;
      text-align: left;
    }
    .textareaRemak {
      border: 1px solid #d0d0d0;
      border-radius: 4px;
      resize: none;
      width: 886px;
      height: 102px;
    }
    .product-content-title{
      font-size: 14px;
      color: #333333;
      text-align: left;
      > span {
        border: 1px solid #538BF1;
        margin-right: 10px;
      }
      line-height: 50px;
    }
    .el-scrollbar__viewOPT{
      width: 500px;
      .el-scrollbar__view .el-select-dropdown__list{
        > li {
          overflow: hidden;
          width: 500px;
        }
      }
    }
  }
  .el-form{
      text-align: left;
        .form__select{
      width: 886px;
    }
    .form__textarea{
      width: 886px;
    }
    .text__center{
      text-align: center;
    }
    .el-form__remark{
      /deep/  .el-form-item__label{
        border-left: 2px solid #538BF1;
        font-size: 14px;
        color: #333333;
        margin-bottom: 10px;
        padding: 0 0 0 5px;
    }
    }
    }
  /deep/.el-form-item{
    margin-right: 0;
  }
  .remark_btn{
    width: 200px;
  }
}
.top_conten {
  float: left;
  margin-left: 20px;
  margin-right: 50px;
  padding-top: 10px;
}
.top_conten_title {
  font-size: 14px;
  color: #666;
  text-align: center;
  line-height: 20px;
}
.top_content_font {
  font-size: 14px;
  color: #000000;
  letter-spacing: 0.86px;
  line-height: 20px;
}
/deep/ .dialog-box .el-select .el-select__tags {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 30px;
  }
/deep/ .report_content .card_box .card_title{
   text-align: left;
 }
/deep/ .el-select-dropdown__item span{
  display: inline-block;
  width: 524px;
}
/deep/.el-popper .del-scrollbar .el-select-dropdown__wrap .el-select-dropdown__list {
  max-width: 524px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
