<template>
  <div class="import-message" >
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 头部 -->
      <div class="dialog-box__top">
        <h5 class="title bg__white">核查信息</h5>
        <span class="el-icon-close button button__close" @click="close_()"></span>
      </div>
      <!-- 主体部分 -->
      <div class="dialog-box__body" v-loading='tableLoading'>
        <div class="anti-fraud_dialog-box__middle clearfix">
          <div class="center f__left">
            <span class="center_title">合作方：</span>
            <span class="center_font">{{org.partnerName}}</span>
          </div>
          <div class="center f__left">
            <span class="center_title">日期：</span>
            <span class="center_font">{{sendTime}}</span>
          </div>
          <div class="center f__left">
            <span class="center_title">待放款客户资料：</span>
            <span class="center_font">共<span class="warning">{{tableNum}}</span>位</span>
          </div>
          <div class="center f__left">
            <span class="center_title">合计金额：</span>
            <span class="center_font"><span class="warning">{{tableTotal}}</span>元</span>
          </div>
        </div>
      </div>
      <div class="delete_submit">
        <div>
          <el-button class="width100" style="border: 1px solid #DDDDDD;" @click="close_()">返回</el-button>
          <el-button class="width100" type="primary" @click="submit">确定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { accountApi } from "../../../account/js/server.js"; // 接口
export default {
  data() {
    return {
      tableNum: "",
      tableTotal: "",
      sendTime: "",
      tableLoading: false
    };
  },
  props: {
    org: {
      type: Object,
      default: function() {
        return {};
      }
    },
    tableData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  created() {
    // console.log(this.org);
    // console.log(this.tableData);
    this.sendTime = new Date().normalizeTime({ format: "-" }).strTime;
    this.tableNum = this.tableData.length;
    let money = 0;
    this.tableData.forEach((item, index) => {
      var temp = Number(item.approveAmt);
      // console.log(temp);
      money += temp;
    });
    this.tableTotal = money.toFixed(4);
  },
  methods: {
    // 关闭弹窗
    close_() {
      this.$emit("clsoe_windowAlert_send");
    },
    submit() {
      // console.log(this.tableData);
      let accountAllotIds = this.tableData
        .map(item => item.accountAllotId)
        .toString(",");
      let accountAllotIdList = accountAllotIds.split(",");
      // console.log(accountAllotIdList);
      this.tableLoading = true;
      this.$MyFetch
        .post(
          accountApi.expenditure_manage.sendPutoutApprove,
          accountAllotIdList
        )
        .then((data = {}) => {
          this.tableLoading = false;
          this.close_();
          // console.log(data);
          let msg = "";
          if (data && data.length > 0) {
            msg = data.join("。");
          } else {
            msg = "发送合作方审批成功";
          }
          this.confirmFn(msg, "success");
          this.$parent.refer(1);
        })
        .catch(err => {
          this.tableLoading = false;
          this.close_();
          this.$parent.refer(1);
          this.$error(err.message);
        });
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
.import-message {
  .dialog-box {
    width: 570px;
    background-color: #ffffff;
    .el-form-item {
      margin-right: 0;
    }
    .dialog-box__body {
      overflow-y: auto;
      overflow-x: hidden;
      height: 120px;
      .anti-fraud_dialog-box__middle {
        width: 100%;
        padding: 20px 0px;
        .center {
          width: calc(50% - 30px);
          height: 20px;
          line-height: 20px;
          margin-bottom: 20px;
          margin-left: 30px;
          span {
            font-family: PingFangSC-Regular;
            font-size: 14px;
          }
          .center_title {
            color: #666;
          }
          .center_font {
            color: #151515;
          }
        }
      }
    }
  }
  // 底部按钮
  .delete_submit {
    width: 100%;
    display: flex;
    justify-content: center;
    // 删除提交公共样式
    .t_button {
      width: 200px;
      height: 40px;
    }
    .export_t {
      background: #538bf1;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 1.07px;
      text-align: center;
    }
  }
}
</style>
