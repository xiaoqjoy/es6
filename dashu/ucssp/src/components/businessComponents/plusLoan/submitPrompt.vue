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
      <h5>是否确认发送邮件</h5>
      <div class="dialog-box-div">
        <el-button plain class="dialog-box-btn" @click="$emit('clsoe_windowAlert')">否</el-button>
        <el-button type="primary" @click="confirm">是</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { plusLoanApi } from "@system/approvalAudit/js/server.js";
export default {
  props: {
    submitOper: {
      type: Object,
      default: () => ({})
    },
    applicationId: {
      type: String,
      default: ''
    },
    // 初审结论
    firstApproveResultCode: {
      type: String,
      default: ''
    },
    isSuper: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      alertSubmitC: false,
      centerDialogVisible: false,
      conditionType: []
    };
  },
  methods: {
    confirm() {
      if ((this.submitOper.necessityFlg && this.submitOper.firstApproveResultCode === 'P') ||
          this.isSuper) {
        this.$error("必要性提示，提交失败");
        return;
      }
      this.realSubmit();
    },
    realSubmit() {
      let data = {
        applicationId: this.applicationId,
        firstApproveResultCode: this.firstApproveResultCode
      };
      this.$MyFetch
        .post(plusLoanApi.sendEmailSubmitTwice, data)
        .then((data = {}) => {
          // this.$parent.$emit('plusEmailStatusFn', data.sendEmailSuccess);
          let status = data.sendEmailSuccess;
          this.$emit('sendStatusFn', {status: status, sendEmailStatusCode: status ? 'send_success' : 'send_fail'});
          this.$emit("clsoe_windowAlert");
        })
        .catch(err => {
          this.$emit('sendStatusFn', {status: false, sendEmailStatusCode: 'send_fail'});
          this.$error(err.message);
        });
        // this.$parent.$emit('plusEmailStatusFn', !true);
        // this.$emit('showMainFn', true);
        // this.$emit("clsoe_windowAlert");
    },
    getConditionType() {
      return this.$getDictCode("apraud_condition_prompt")
        .then(res => {
          this.conditionType = res;
        })
        .then((data = {}) => {
          var obj = this.submitOper.conditionPrompt;
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
            }
          }
        });
    },
    changeType(res, i) {
      return res.filter(function(arr) {
        return arr.itemCode === i;
      });
    }
  },
  created() {
    this.getConditionType();
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
