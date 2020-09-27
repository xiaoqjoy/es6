<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-mask {
    z-index: 1001;
  }
  .dialog-box {
    width: 340px;
    height: 236px;
    border-radius: 4px;
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: bold;
    }
    .mgtop {
      margin-top: 20px;
    }
    .el-form-item {
      // width: 28%;
      margin-right: 40px;
    }
    .el-form-item .el-select {
      width: 340px;
    }
    .dialog-box__middle {
      height: 495px;
      .middle {
        .el-select {
          display: block;
        }
        .el-textarea__inner {
          background: #e5e5e5;
        }
      }
    }
    .dialog-box__middle-1200 {
      height: 442px;
      overflow-y: auto;
      margin: 0 20px;
      padding: 25px 30px;
      box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
      .dialog-box__middle-top {
        padding: 20px 0;
        border-bottom: 1px solid #e5e5e5;
        .title {
          font-size: 16px;
          .icon__gan {
            margin-right: 10px;
          }
        }
      }
    }
    .dialog-box__top {
      margin: 0px;
      box-shadow: 0;
    }
    .complete-product {
      .dialog-box__middle-form {
        height: 176px;
        padding-top: 20px;
        background: #ffffff;
        .form__bottom {
          width: 100px;
          display: inline-block;
          height: 40px;
          margin-top: 20px;
          margin-left: 60px;
          .finish {
            width: 100px;
            display: inline-block;
            border-radius: 4px;
          }
          .cancel {
            background: #f8f8f8;
            border: 1px solid #dddddd;
            // margin-left: 60px;
            // margin-top: 30px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            letter-spacing: 1.07px;
            text-align: center;
          }
        }
        .add {
          margin-left: 20px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #ffffff;
          letter-spacing: 1.07px;
          text-align: center;
          .el-button {
            border: 1px solid #538bf1;
          }
        }
        .form__block {
          width: 400px;
          padding: 0px;
          margin: 0px;
        }
        .dialog-box__form__group {
          padding-left: 30px;
          padding-top: 20px;
          height: 310px;
          .el-form-item {
            .el-form-item__label .el-form-item__label {
              padding-bottom: 8px;
            }
            width: 340px;
            // margin-left: 20px;
            margin-right: 30px;
            margin-bottom: 20px;
          }
          .money {
            .el-input {
              display: inline-block;
              width: 117px;
            }
          }
          .record {
            margin-bottom: 20px;
            span:nth-child(1) {
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #666;
            }
            span:nth-child(2) {
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #151515;
              line-height: 20px;
            }
          }
        }
        .hint {
          width: 288px;
          height: 60px;
          // margin-top: 20px;
          margin-left: 26px;
          text-align: center;
          span {
            height: 16px;
            text-align: center;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            letter-spacing: 1.38px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
<style lang="less" scoped>
/deep/ .form__block .el-select .el-select__tags {
  height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title_type">提示</h5>
        <span
          class="el-icon-close button button__close"
          @click="close"
        ></span>
      </div>
      <!-- 新增模型配置 -->
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <div class="hint"><span>是否确认将“</span><span>{{compile_data.organizationName}}</span><span>档案归属”调整到“远程面签中心”并即刻生效？</span></div>
          <div class="form__bottom">
            <el-button
              class="cancel finish"
              type="primary"
              @click="close()"
            >取消</el-button>
          </div>
          <div class="form__bottom add">
            <el-button
              class="finish"
              type="primary"
              @click="finish()"
            >确认</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- <saveChanges v-if="alert_" @clsoe_windowused='close_1' /> -->
    <!-- <stateOfPreservation
      :savea="form"
      :finish="finish"
      v-if="alert_1"
      @clsoe_windowused='close_2'
      @clsoe_windowused_a='close_3'
    /> -->
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
// import { loanApi } from "../../js/server.js"; // 接口
export default {
  data() {
    return {
      pricing_lock: [] // 个贷处理中心下拉框数据
    };
  },
  methods: {
    // 关闭详情
    close() {
      this.$emit("clsoe_windowAlert_t");
    },
    // pricing() {
    //   let url = loanApi.archives_service;
    //   this.$MyFetch
    //     .get(url)
    //     .then((data = {}) => {
    //       console.log(data);
    //       if (data !== null) {
    //         data.forEach(i => {
    //           this.pricing_lock.push({
    //             value: i.serviceId,
    //             label: i.serviceName
    //           });
    //         });
    //       }
    //     })
    //     .catch(err => {
    //       this.$error(err.message);
    //     });
    // },
    finish() {
      this.recover(this.compile_data.id);
    }
  },
  mounted() {
    // this.pricing();
  },
  props: ["recover", "compile_data"]
};
</script>
