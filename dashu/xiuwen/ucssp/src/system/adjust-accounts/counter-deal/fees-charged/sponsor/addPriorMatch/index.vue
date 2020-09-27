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
      height: 150px;
      overflow-y: auto;
      .form__block {
        padding: 20px 30px;
        box-shadow: 0 2px 6px 0 #d0d0d0;
      }
      .form__bottom {
        left: 50%;
        padding-bottom: 30px;
        background-color: rgba(255, 255, 255);
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
            <div class="form__block bg__white border__radius-5" >
              <!-- 信息展示 -->
              <div class="info_show">
                <span class="info_item">
                  <i class="info_left">批次号:&nbsp;</i>
                  <b class="info_right">{{ businessCode }}</b>
                </span>
                <span class="info_item">
                  <i class="info_left">登记人:&nbsp;</i>
                  <b class="info_right">{{ userName }}</b>
                </span>
                <span class="info_item">
                  <i class="info_left">登记日期:&nbsp;</i>
                  <b class="info_right">{{ applyDate }}</b>
                </span>
              </div>
            </div>
            <div class="form__bottom">
              <el-button class="add finish button " type="primary" @click="finish()">确认</el-button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { counterDealApi } from "@/system/adjust-accounts/counter-deal/js/server"; // 接口
// import { counterDealApi } from "../../../js/server"; // 接口
export default {
  props: ["refer"],
  data() {
    return {
      businessCode: "", // 业务编码
      userName: "陈周益", // 申请人
      applyDate: "2018-12-11" // 申请时间
    };
  },
  mounted() {
    this.callUserID();
    this.CreateBusinessNumbers({
      "prefix": "PC"
    }); // 生成业务编码
  },
  methods: {
    // 用户名和时间
    callUserID() {
      this.$MyFetch.get(counterDealApi.callUserID)
      .then((data = {}) => {
          this.userName = data.userId;
          this.applyDate = data.bussinessDate;
          })
      .catch((err) => {
          this.$error(err.message);
      });
    },
     // 生成业务编码
    CreateBusinessNumbers(res) {
      this.$MyFetch.post(counterDealApi.CreateBusinessNumbers, res)
      .then((data = {}) => {
          this.businessCode = data.businessCode;
          })
      .catch((err) => {
          console.log(err);
          this.$error(err.message);
      });
    },
    // 批量空单保存
    batchSave() {
      return new Promise((resolve, reject) => {
        console.log(this.businessCode, '批次号');
        this.$MyFetch.post(counterDealApi.batchSave, {
          processName: "feeFlow",
          relatedId: this.businessCode
        })
        .then((data = {}) => {
            // this.$success("保存成功");
            resolve(data);
            })
        .catch((err) => {
            console.log(err);
            this.$error(err.message);
            reject(err);
        });
      });
    },
    close() {
      this.$emit("clsoe_windowAlert");
    },
    // 打开保存修改配置
    finish() {
      // 批量空单保存
      this.batchSave()
      .then((data) => {
        console.log("erload1");
        this.$emit('reload');
        this.$emit('clsoe_windowAlert');
      })
      .catch((err) => {
        console.log(err);
        this.$emit('clsoe_windowAlert');
      });
    },
    // 关闭引入单笔还款
    close_2() {
      this.alert_2 = false;
    },
    // 点击引入按钮
    import_alert() {
      this.alert_2 = true;
    }
  }
};
</script>
