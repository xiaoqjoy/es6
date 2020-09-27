<template>
  <div class="import-message">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <span class="title">发起调查</span>
        <span class="el-icon-close button button__close" @click="close_()"></span>
      </div>
      <div class="product-content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="top" label-width="100px" class="demo-ruleForm" hide-required-asterisk>
          <el-form-item label="发起调查原因" prop="region">
            <el-select :popper-append-to-body="false" :disabled="disabled" class="form__select" v-model="ruleForm.region" multiple placeholder="请选择">
              <el-option  v-for="(item,index) in surveyReasonCode"
            :key="index"
            :label="item.configTitle"
            :value='item.configCode'
            width="886px"
            ></el-option>
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
          <el-form-item label="其他备注" class="el-form__remark" prop="desc">
            <el-input :disabled="disabled" class="form__textarea" type="textarea" v-model="ruleForm.desc" resize="none"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-button :disabled="disabledB" type="primary" class="remark_btn" @click="submitForm">发起调查</el-button>
    </div>
  </div>
</template>

<script>
import { aprAudApi } from "../../js/server.js";

export default {
  props: ['isBORF', "surveyStatusCode", "surveyReasonCode", "disabled", 'appOrAud', 'survey_type_code'],
  data() {
    return {
      url: '',
      disabledB: this.disabled,
      label: [],
      remarkTxt: "",
      ruleForm: {
        region: [],
        surveyType: [],
        desc: ""
      },
      rules: {
        region: [
          { required: true, message: "分类内容不能为空", trigger: "change" }
        ],
        surveyType: [
          { required: true, message: '调查类型', trigger: 'change' }
        ],
        desc: [
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
  methods: {
    // 发起调查
    submitForm() {
      this.disabledB = !this.disabledB;
      if (this.surveyStatusCode === 'reserve') {
        this.disabledB = !this.disabledB;
        this.$message({
          message: '本次申请已经正在调查中,无需重复发起',
          type: 'warning'
        });
      } else {
        this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          console.log('跑');
          if (this.appOrAud) {
            this.url = `${aprAudApi.taskDetail.surveyOper}/${this.$route.query.appID}`;
          } else {
            this.url = `${aprAudApi.aud.taskDetail.surveyOper}/${this.$route.query.appID}`;
          };
          let data = {
            remarkTxt: this.ruleForm.desc,
            surveyReasonCode: this.ruleForm.region,
            surveyTypeCode: this.ruleForm.surveyType
          };
          this.$MyFetch
            .post(
              this.url,
              data
            )
            .then((data = {}) => {
              this.disabledB = !this.disabledB;
              this.sendCode();
              console.log("发起调查成功");
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
              this.$error(err.message);
              this.disabledB = !this.disabledB;
            });
        } else {
          this.disabledB = !this.disabledB;
          console.log("error submit!!");
          return false;
        }
      });
      }
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
    sendCode() {
      this.$emit("surveyStatusCodeChange");
    },
    close_() {
      this.$emit("clsoe_windowAlert");
    }
  },
  created() {
    // this.getDict();
    console.log(this.surveyStatusCode, 999);
  }
};
</script>

<style lang="less" scoped>
.import-message {
  .dialog-box {
    width: 946px;
    // height: 406px;
    background: #fff;
    /deep/.el-button--primary{
      height: 40px;
      width: 200px;
    }
    .product-title {
      height: 60px;
    }
    .product_title_head {
      line-height: 80px;
      font-weight: bold;
    }
    .product-content {
      margin: 9px;
      width: 886px;
      margin: 20px 20px 10px 30px;
      > p {
        text-align: left;
        line-height: 40px;
        font-size: 12px;
        color: #bbbbbb;
        letter-spacing: 1.09px;
      }
      > .select {
        width: 886px;
        text-align: left;
      }
      > textarea {
        border: 1px solid #d0d0d0;
        border-radius: 4px;
        resize: none;
        width: 886px;
        height: 102px;
      }
      .product-content-title {
        font-size: 14px;
        color: #333333;
        text-align: left;
        > span {
          border: 1px solid #538bf1;
          margin-right: 10px;
        }
        line-height: 50px;
      }
      .el-form {
        text-align: left;
        .form__select {
          width: 886px;
        }
        .form__textarea {
          width: 886px;
        }
        .text__center {
          text-align: center;
        }
        .el-form__remark {
          /deep/ .el-form-item__label {
            border-left: 2px solid #538bf1;
            font-size: 14px;
            color: #333333;
            margin-bottom: 10px;
            padding: 0 0 0 5px;
          }
        }
      }
    }
  }
  .blue__border {
    border: 1px solid #538bf1;
  }
  /deep/ .dialog-box .el-select .el-select__tags {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 30px;
  }
 /deep/ .el-scrollbar .el-select-dropdown__wrap{
    max-height: 240px;
  }
}
</style>
<style lang="less" scoped>
/deep/ .el-select-dropdown__item span{
  display: inline-block;
  width: 800px;
}
/deep/.el-popper .del-scrollbar .el-select-dropdown__wrap .el-select-dropdown__list {
  max-width: 850px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/deep/.el-textarea__inner {
    width: 886px;
    height: 102px;
}
</style>
