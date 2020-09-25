<template>
  <div class="import-message2">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <table class="my__table table">
        <thead class="my__table__th">
          <tr>
            <th>校验类型</th>
            <th>未通过条件提示</th>
            <th>条件类型</th>
          </tr>
        </thead>
        <tbody class="my__table__tbody">
          <tr v-for="(val, key , index) in submitOper.conditionPrompt" :key="index">
            <td>{{key}}</td>
            <td>
              <div v-for="(i , d) in val" :key="d" :class="{red: i.red}">{{i.notPassPrompt}}</div>
            </td>
            <td>
              <div v-for="(i , d) in val" :key="d + 'a'" :class="{red: i.red}">{{i.conditionType}}</div>
            </td>
          </tr>
        </tbody>
      </table>
      <h5>是否确认提交{{trueOrF}}</h5>
      <div class="dialog-box-div">
        <el-button plain class="dialog-box-btn" @click="close_()">否</el-button>
        <el-button type="primary" @click="isSubmit">是</el-button>
      </div>
    </div>
    <submitC
      v-if="alertSubmitC"
      :appOrAud="appOrAud"
      @clsoe_windowAlert="close_submitC"
      @close_ABC="close_ABC"
      :submitOper="submitOper"
      :opinionTxt="opinionTxt"
      :rejectReasonCode="rejectReasonCode"
      :money="this.submitOper.highScoreAmt"
    />
    <closeTheTip v-if="isCloseTheTip"></closeTheTip>
  </div>
</template>

<script>
import closeTheTip from "../closeTheTip";
import submitC from "../submitC";
import { aprAudApi } from "../../js/server.js";
export default {
  props: [
    "submitResults",
    "submitOper",
    "opinionTxt",
    "rejectReasonCode",
    "appOrAud",
    "surveyStatusCode",
    "highScoreAmtMoney",
    "isSuper"
  ],
  data() {
    return {
      isCloseTheTip: false,
      url: "",
      alertSubmitC: false,
      centerDialogVisible: false,
      conditionType: []
    };
  },
  computed: {
    trueOrF: function() {
      if (this.submitResults) {
        return "否决"; // 1 true
      } else {
        return "同意"; // 0 false
      }
    }
  },
  methods: {
    open4() {
      this.$error("必要性提示，提交失败");
      this.close_();
    },
    isSubmit() {
      if (!this.submitResults) {
        // 同意
        if (this.isSuper && !this.submitResults) {
          this.$error("必要性提示，提交失败");
          return;
        }
        if (this.submitOper.necessityFlg) {
          // 是否必要性提示
          this.open4();
          return;
        }
        this.realSubmitB(); // 二次提交
      } else {
        // 否决
        if (this.isSuper && !this.submitOper.highScoreSupportFlg) {
          this.$error("必要性提示，提交失败");
          return;
        }
        if (this.isSuper && this.highScoreAmtMoney < 50000) {
          this.$error("必要性提示，提交失败");
          return;
        }
        this.realSubmitB(); // 二次提交
      }
    },
    realSubmit(data) {
      return new Promise((resolve, reject) => {
        if (this.appOrAud) {
          this.url = `${aprAudApi.taskDetail.submitTwiceOper}/${
            this.$route.query.appID
          }`;
        } else if (!this.appOrAud) {
          console.log(this.appOrAud);
          this.url = `${aprAudApi.aud.taskDetail.submitTwiceOper}/${
            this.$route.query.appID
          }`;
        }
        let data = {
          opinionResultCode: this.submitOper.opinionResultCode,
          opinionTxt: this.opinionTxt,
          rejectReasonCode: this.rejectReasonCode
        };
        this.$MyFetch
          .post(this.url, data)
          .then((data = {}) => {
            resolve(data);
          })
          .catch(err => {
            this.$error(err.message);
          });
      });
    },
    realSubmitB() {
      this.realSubmit().then(data => {
        // console.log("二次提交成功");
        if (this.appOrAud) {
          this.$router.push({
            name: "closeTheTipA",
            path: "closeTheTip"
          });
        } else {
          this.$router.push({ name: "closeTheTipB", path: "closeTheTip" });
        }
        // this.isCloseTheTip = true;
      });
    },
    close_() {
      this.$emit("clsoe_windowAlert");
    },
    close_AB() {
      this.$emit("close_AB");
    },
    close_submitC() {
      this.alertSubmitC = false;
    },
    close_ABC() {
      this.alertSubmitC = false;
      this.close_AB();
    },
    getConditionType() {
      return new Promise((resolve, reject) => {
        this.$getDictCode("apraud_condition_prompt")
          .then(res => {
            this.conditionType = res;
            console.log(this.conditionType, "码表");
          })
          .then((data = {}) => {
            var obj = this.submitOper.conditionPrompt;
            console.log(obj, "第一个是什么");
            for (var i in obj) {
              for (var k in obj[i]) {
                if (obj[i][k].conditionType === "Risk") {
                  obj[i][k].red = true;
                } else {
                  obj[i][k].red = false;
                }
                obj[i][k].conditionType = this.changeType(
                  this.conditionType,
                  obj[i][k].conditionType
                )[0].itemDesc;
                console.log(
                  this.submitOper.conditionPrompt.conditionType,
                  "看看是啥"
                );
              }
            }
          });
      });
    },
    changeType(res, i) {
      return res.filter(function(arr) {
        return arr.itemCode === i;
      });
    }
  },
  created() {
    console.log(this.submitOper, "拿来的是什么");
    this.getConditionType();
  },
  components: {
    submitC,
    closeTheTip
  }
};
</script>

<style lang="less" scoped>
.import-message2 {
  .dialog-box {
    width: 796px;
    height: 318px;
    .table {
      margin: 10px;
      font-size: 12px;
    }
    > h5 {
      line-height: 40px;
      font-size: 14px;
      color: #333333;
      letter-spacing: 1.38px;
    }
    .dialog-box-div > button {
      width: 100px;
      height: 40px;
    }
    .dialog-box-btn {
      background: #f8f8f8;
      border: 1px solid #dddddd;
    }
    .my__table {
      line-height: 30px;
      border: 1px solid #d0d0d0;
      width: 750px;
      margin: 20px;
      .my__table__th {
        border-bottom: 1px solid #d0d0d0;
      }
      .my__table__tbody {
        height: 150px;
        > tr {
          border-bottom: 1px solid #d0d0d0;
        }
      }
    }
    .table thead tr {
      display: block;
    }
    .red {
      color: red;
    }
    .table tbody {
      display: block;
      height: 200px;
      overflow: auto;
    }
    .table th {
      width: 250px;
    }
    .table td {
      width: 250px;
    }
  }
}
</style>
