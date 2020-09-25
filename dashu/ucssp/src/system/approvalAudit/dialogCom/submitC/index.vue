<template>
  <div>
    <div class="import-message3">
      <div class="dialog-mask"></div>
      <div class="dialog-box">
        <div class="dialog-box__top">
          <h5 class="title">转超分贷</h5>
          <span class="el-icon-close button button__close" @click="close_()"></span>
        </div>
        <div>是否同意转超分贷?</div>
        <div class="dialog-box-div">
          <el-button plain class="dialog-box-btn" @click="turnBorrow(false)">否决</el-button>
          <el-button type="primary" @click="turnBorrow(true)">是</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { aprAudApi } from "../../js/server.js";
export default {
  props: ["money", "submitOper", "opinionTxt", "rejectReasonCode", "appOrAud"],
  data() {
    return {
      url: ""
    };
  },
  methods: {
    turnBorrow(tOrF) {
      if (this.appOrAud) {
        this.url = `${aprAudApi.taskDetail.submitTwiceOper}/${
          this.$route.query.appID
        }`;
      } else {
        this.url = `${aprAudApi.aud.taskDetail.submitTwiceOper}/${
          this.$route.query.appID
        }`;
      }
      let data = {
        highScoreSupportFlg: tOrF,
        opinionResultCode: this.submitOper.opinionResultCode,
        opinionTxt: this.opinionTxt,
        rejectReasonCode: this.rejectReasonCode
      };
      this.$MyFetch
        .post(this.url, data)
        .then((data = {}) => {
          console.log("提交C");
          if (data.submitTwiceOperResult === "0") {
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
          }
          if (data.submitTwiceOperResult === "1") {
            this.confirmFn("转超分贷额度不足，不可转超分贷", "error");
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
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
      this.close_ABC();
    },
    close_ABC() {
      this.$emit("close_ABC");
    },
    close_() {
      this.$emit("clsoe_windowAlert");
    }
  },
  created() {
    console.log(
      this.submitOper.opinionResultCode,
      this.opinionTxt,
      this.rejectReasonCode
    );
  }
};
</script>

<style lang="less" scoped>
.import-message3 {
  .dialog-mask {
    z-index: 1004;
  }
  .dialog-box {
    z-index: 1005;
    width: 340px;
    height: 210px;
    .dialog-box__top {
      box-shadow: none;
      .title {
        font-weight: bold;
      }
    }
    .money {
      margin: 5px;
      color: @yellow;
    }
    .dialog-box-div {
      margin-top: 20px;
    }
    .dialog-box-div > button {
      width: 100px;
      height: 40px;
    }
    .dialog-box-btn {
      background: #f8f8f8;
      border: 1px solid #dddddd;
    }
  }
}
</style>
