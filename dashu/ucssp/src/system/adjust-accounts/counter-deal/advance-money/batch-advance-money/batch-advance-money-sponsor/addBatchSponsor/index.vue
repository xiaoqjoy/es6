<style lang="less" rel="stylesheet/less" scoped>
// 公共样式
.margin_r_60 {
  margin-right: 60px;
}
.drop_loan {
  .dialog-mask {
    z-index: 1000;
  }
  .dialog-box {
    .dialog-box__top {
      margin: 0px;
    }
    width: 945px;
    padding: 0px;
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      color: #000;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: normal;
      font-family: PingFangSC-Regular;
    }
    .mgtop {
      margin-top: 21px;
    }
    .el-form-item {
      width: 28%;
      margin-right: 40px;
    }
    .el-form-item .el-select {
      width: 245px;
    }
    .dialog-box__middle {
      .middle {
        .el-select {
          display: block;
        }
        .el-textarea__inner {
          background: #d0d0d0;
        }
      }
    }
    .dialog-box__middle-1200 {
      margin: 0 20px;
      padding: 25px 30px;
      box-shadow: 0 2px 6px 0 #d0d0d0;
      .dialog-box__middle-top {
        padding: 20px 0;
        border-bottom: 1px solid #d0d0d0;
        .title {
          font-size: 16px;
          .icon__gan {
            margin-right: 10px;
          }
        }
      }
    }
    .dialog-box__middle-form {
      height: 152px;
      overflow-y: auto;
      .form__block {
        padding: 20px 30px;
        box-shadow: 0 2px 6px 0 #d0d0d0;
      }
      .form__bottom {
        left: 50%;
        padding-bottom: 30px;
        background-color: #fff;
        .add {
          width: 200px;
        }
      }
    }
  }
  /*表单区块*/
  .dialog-box__middle-form {
    .form__bottom {
      text-align: center;
      padding-bottom: 20px;
    }
  }
  // 弹窗下部分
  .complete-product {
    width: 100%;
    // 信息展示
    .info_show {
      display: flex;
      justify-content: space-around;
      .info_item {
        display: inline-block;
        white-space: nowrap;
        margin-bottom: 20px;
        .info_left {
          font-style: normal;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #666;
        }
        .info_right {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #151515;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <!-- 弹窗上部分 -->
      <div class="dialog-box__top">
        <h5 class="title_type">新增</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <!-- 弹窗下部分 -->
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <div class="form__block bg__white border__radius-5">
            <!-- 信息展示 -->
            <div class="info_show">
              <span class="info_item">
                <i class="info_left">交易号:&nbsp;</i>
                <b class="info_right">{{ businessCode }}</b>
              </span>
              <span class="info_item">
                <i class="info_left">申请人:&nbsp;</i>
                <b class="info_right">{{ userName }}</b>
              </span>
              <span class="info_item">
                <i class="info_left">申请日期:&nbsp;</i>
                <b class="info_right">{{ applyDate }}</b>
              </span>
            </div>
          </div>
          <div class="form__bottom">
            <el-button class="add finish button" type="primary" @click="finish">确认</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { checkingApi } from "../../../../../js/server"; // 接口
export default {
  props: ["refer"],
  data() {
    return {
      businessCode: "", // 交易号
      userName: "", // 申请人
      applyDate: "" // 申请时间
    };
  },
  mounted() {
    this.dateFormatter(new Date());
    this.userLogin();
    this.CreateBusinessNumbers({
      prefix: "PC"
    }); // 生成交易号
  },
  methods: {
    // 手动改变默认的时间格式
    dateFormatter(str) {
      // 默认返回yyyy-MM-dd HH-mm-ss
      var hasTime = arguments[1] !== false ? "true" : "false"; // 可传第二个参数false，返回yyyy-MM-dd
      var d = new Date(str);
      var year = d.getFullYear();
      var month =
        d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
      var day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
      var hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
      var minute = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
      var second = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
      if (hasTime) {
        this.applyDate = [year, month, day].join("-");
        console.log(this.applyDate);
      } else {
        this.applyDate =
          [year, month, day].join("-") + " " + [hour, minute, second].join(":");
      }
    },
    // 获取用户登陆id
    userLogin() {
      this.$MyFetch
        .get(checkingApi.RepayPlanListb)
        .then((data = {}) => {
          this.userName = data.userId;
          this.applyDate = data.bussinessDate;
          console.log(data, "获取用户ID");
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 生成业务编码
    CreateBusinessNumbers(res) {
      this.$MyFetch
        .post(checkingApi.PlanDetails, res)
        .then((data = {}) => {
          this.businessCode = data.businessCode;
        })
        .catch(err => {
          console.log(err);
          this.$error(err.message);
        });
    },
    // 批量空单保存
    batchSave() {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .post(checkingApi.RepayPlanLista, {
            processName: "batchAdvancePayFlow",
            relatedId: this.businessCode
          })
          .then((data = {}) => {
            console.log(data, "新增接口返回数据");
            resolve(data);
          })
          .catch(err => {
            console.log(err);
            this.$error(err.message);
            reject(err);
          });
      });
    },
    // 关闭新增组件
    close() {
      this.$emit("click_");
    },
    // 打开保存修改配置
    finish() {
      // 批量空单保存
      this.batchSave()
        .then(data => {
          this.refer();
          this.$emit("click_");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
