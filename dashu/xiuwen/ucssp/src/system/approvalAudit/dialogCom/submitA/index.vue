<template>
  <div class="submit">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title">提交</h5>
        <span class="el-icon-close button button__close" @click="close_()"></span>
      </div>
      <div class="dialog-box__content">
        <div
          class="dialog-box__content_title clearfix"
          v-for="(item, index) in lastAprOpinion"
          :key="index"
        >
          <div>
            <span class="gray_font">审批处理人：</span>
            <span class="black_font">{{item.createdBy}}</span>
          </div>
          <div>
            <span class="gray_font">审批结论：</span>
            <span class="black_font">{{item.opinionResultCode}}</span>
          </div>
          <div v-if="!(item.opinionResultCode === '同意')">
            <span class="gray_font">否决原因：</span>
            <span class="black_font" v-for="(i, k) in item.rejectReasonCode" :key="k">{{i.configTitle}}</span>
          </div>
          <div v-else>
            <span class="gray_font">否决原因：</span>
          </div>
          <div>
            <span class="gray_font">备注：</span>
            <span class="black_font">{{item.opinionTxt}}</span>
          </div>
          <div>
            <span class="gray_font">提交时间：</span>
            <span class="black_font margin_right">{{item.createdDate}}</span>
          </div>
        </div>
        <div class="product-content-title">
          <div>
            <span class="blue_boder"></span>审批结果
          </div>
          <div>
            <el-radio-group @change="changeRadio" v-model="submitResults">
              <el-radio :label="0">同意</el-radio>
              <el-radio :label="1">否决</el-radio>
            </el-radio-group>
          </div>
          <div class="product-content-title_deny" v-show="submitResults">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-position="top"
              label-width="100px"
              class="demo-ruleForm"
              hide-required-asterisk
            >
              <el-form-item label="否决原因" prop="desc" class="cause">
                <el-select
                  class="form__select"
                  v-model="ruleForm.desc"
                  placeholder="请选择"
                  @change="getRejectReasonCode"
                  multiple
                >
                  <el-option
                    v-for="item in rejectReasonNew"
                    :key="item.level2Code"
                    :label="item.level2Desc"
                    :value="item.level2Code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <span class="blue_boder"></span>
          备注
        </div>
        <textarea
          v-model="lastAprOpinion.opinionTxt"
          maxlength="200"
        ></textarea>
      </div>
      <el-button type="primary" @click="alert_submitB()">提交</el-button>
    </div>
    <!-- 提交否决弹窗 -->
    <submitB
      v-if="alertSubmitB"
      :appOrAud="appOrAud"
      @clsoe_windowAlert="close_submitB"
      @close_AB="close_AB"
      :submitResults="submitResults"
      :submitOper="submitOper"
      :opinionTxt="lastAprOpinion.opinionTxt"
      :rejectReasonCode="rejectReasonCode"
      :surveyStatusCode="surveyStatusCode"
      :isSuper="isSuper"
      :highScoreAmtMoney="highScoreAmtMoney"
    />
  </div>
</template>

<script>
import submitB from "../submitB"; // 提交否决弹窗
import { aprAudApi } from "../../js/server.js";
export default {
  // props: ["appOrAud", 'surveyStatusCode', 'isSuper'],
  props: {
    appOrAud: {
      type: Boolean,
      default: true
    },
    surveyStatusCode: {
      type: String,
      default: ''
    },
    isSuper: {
      type: Boolean,
      default: false
    },
    highScoreAmtMoney: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      reasonValue: [],
      rejectReason: [],
      rejectReasonNew: [],
      conclusionCode: [],
      lastAprOpinion: [],
      patchClassCode: [],
      patchClassCodeB: [],
      rejectReasonCode: [],
      valueA: "",
      valueB: "",
      indexNum: 0,
      submitResults: 0,
      alertSubmitB: false,
      submitOper: [],
      ruleForm: {
        region: [],
        desc: []
      },
      rules: {
        region: [
          { required: true, message: "否定类型不能为空", trigger: "change" }
        ],
        desc: [
          { required: true, message: "否决原因不能为空", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    sendOpinionResultCode() {
      if (this.submitResults) {
        return "D";
      } else {
        return "P";
      }
    }
  },
  methods: {
    changeRadio() {
      if (!this.submitResults) {
        this.rejectReasonCode = [];
        this.ruleForm.desc = [];
        console.log(this.submitResults);
      }
    },
    getRejectReasonCode() {
      this.rejectReasonCode = this.ruleForm.desc;
      console.log(this.rejectReasonCode);
    },
    getReason(data) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .get(aprAudApi.taskDetail.RejectReasonConfig, data)
          .then((data = {}) => {
            resolve(data);
          })
          .catch(err => {
            this.$error(err.message);
          });
      });
    },
    getTreeValue() {
      var query = {
        configType: "reject_reason"
      };
      this.getReason(query)
        .then(data => {
          this.rejectReason = data;
          for (let i = 0; i < this.rejectReason.length; i++) {
            if (this.rejectReason[i].level2Desc === null || this.rejectReason[i].level2Desc === '') {
              let obj = {
                level2Desc: this.rejectReason[i].level1Desc,
                level2Code: this.rejectReason[i].level1Code
              };
              this.rejectReasonNew.push(obj);
            } else {
              let obj = {
                level2Desc: this.rejectReason[i].level1Desc + '+' + this.rejectReason[i].level2Desc,
                level2Code: this.rejectReason[i].level2Code
              };
              this.rejectReasonNew.push(obj);
            }
          }
        })
        .catch(err => {
         this.$error(err.message);
        });
    },
    submitdata() {
      return new Promise((resolve, reject) => {
        console.log(this.ruleForm.desc);
        console.log(this.rejectReasonCode);
        if (this.surveyStatusCode === 'reserve' && !(this.submitResults)) {
            this.$message({
              message: '调查中的业务不能提交同意',
              type: 'warning'
            });
            return;
        }
        if (this.appOrAud) {
        this.url = `${aprAudApi.taskDetail.submitOper}/${
          this.$route.query.appID
        }`;
      } else {
        this.url = `${aprAudApi.aud.taskDetail.submitOper}/${
          this.$route.query.appID
        }`;
      }
      let data = {
        opinionResultCode: this.sendOpinionResultCode,
        opinionTxt: this.lastAprOpinion.opinionTxt,
        rejectReasonCode: (this.sendOpinionResultCode === "P") ? [] : this.rejectReasonCode
      };
      this.$MyFetch
        .post(this.url, data)
        .then((data = {}) => {
          this.submitOper = data;
          this.alertSubmitB = true;
        })
        .catch(err => {
          this.$error(err.message);
        });
      });
    },
    close_AB() {
      this.close_();
      this.alertSubmitB = false;
    },
    close_() {
      this.$emit("clsoe_windowAlert");
    },
    alert_submitB() {
      if (this.submitResults) {
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            this.submitdata();
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        this.submitdata();
      }
      // console.log(this.alertSubmitB);
    },
    close_submitB() {
      this.alertSubmitB = false;
    },
    getHistSubmit() {
      return new Promise((resolve, reject) => {
        if (this.appOrAud) {
          this.url = `${aprAudApi.taskDetail.submitPage}/${
            this.$route.query.appID
          }`;
        } else {
          this.url = `${aprAudApi.aud.taskDetail.submitPage}/${
            this.$route.query.appID
          }`;
        }
        this.$MyFetch
          .get(this.url)
          .then((data = {}) => {
            this.lastAprOpinion = data.lastAprOpinion;
            console.log(this.lastAprOpinion, "进来就有");
            resolve(data);
          })
          .catch(err => {
            this.$error(err.message);
          });
      });
    },
          // 转个码
    getValue(item, index) {
      console.log(item, '码码');
        var data = {
        configType: "reject_reason",
        configValue: item
      };
      this.$MyFetch.get(aprAudApi.taskDetail.OperationTranConfig, data)
      .then(data => {
        this.$set(this.lastAprOpinion[index], "rejectReasonCode", data);
        console.log(this.lastAprOpinion, '结棍');
      })
      .catch(err => {
        this.$error(err.message);
      });
    }
  },
  created() {
    this.getHistSubmit()
      .then((data = {}) => {
        for (let i = 0; i < this.lastAprOpinion.length; i++) {
          if (this.lastAprOpinion[i].opinionResultCode === 'D') {
             this.$set(this.lastAprOpinion[i], 'opinionResultCode', '否决');
          }
          if (this.lastAprOpinion[i].opinionResultCode === 'P') {
            this.$set(this.lastAprOpinion[i], 'opinionResultCode', '同意');
          }
          if (this.lastAprOpinion[i].opinionResultCode === 'H') {
            this.$set(this.lastAprOpinion[i], 'opinionResultCode', '转超分贷');
          }
          this.getValue(this.lastAprOpinion[i].rejectReasonCode, i);
        }
      })
      .then((data = {}) => {
        this.getTreeValue();
      })
      .catch(err => {
        this.$error(err.message);
      })
      .then((data = {}) => {
        for (let i = 0; i < this.lastAprOpinion.length; i++) {
          for (let k = 0; k < this.rejectReason.length; k++) {
            if (this.lastAprOpinion[i].rejectReasonCode === this.rejectReason[k].configCode) {
              this.lastAprOpinion[i].rejectReasonCode = this.rejectReason[k].configTitle;
            }
          }
        }
      })
      .catch((err = {}) => {
        this.$error(err.message);
      });
  },
  components: {
    submitB
  }
};
</script>

<style lang="less" scoped>
.submit {
  .dialog-box {
    font-size: 14px;
    line-height: 20px;
    width: 946px;
    height: 706px;
    .el-button {
      margin-bottom: 20px;
      width: 200px;
      height: 40px;
    }
    .black_font {
      color: #151515;
    }
    .gray_font {
      color: #666;
    }
    .dialog-box__top {
      box-shadow: 0 1px 6px 0 rgba(239, 239, 239, 0.74);
      .title {
        font-weight: bold;
      }
    }
    .dialog-box__content {
      max-height: 470px;
      overflow: auto;
      margin: 30px;
      .dialog-box__content_title {
        border-bottom: 1px solid #e5e5e5;
        > div {
          float: left;
          margin: 0 80px 20px 0;
          .margin_right {
            margin-right: 10px;
          }
        }
      }
      .blue_boder {
        border: 1px solid #538bf1;
        margin-right: 10px;
      }
      .product-content-title {
        font-size: 14px;
        color: #333333;
        text-align: left;
        line-height: 50px;
        .product-content-title_deny {
          border: 1px solid #e9e9e9;
          box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
          border-radius: 4px;
          padding: 10px;
          .negation {
            margin-right: 500px;
          }
          .cause {
            .form__select {
              width: 834px;
            }
          }
        }
      }
      > textarea {
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        resize: none;
        width: 850px;
        height: 102px;
      }
    }
  }
}
</style>
