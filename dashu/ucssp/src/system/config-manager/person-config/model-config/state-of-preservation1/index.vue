<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-mask {
    z-index: 1001;
  }
  .dialog-box {
    width: 340px;
    height: 170px;
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: bold;
      box-shadow: 0 2px 6px 0 #d0d0d0;
    }
    .mgtop {
      margin-top: 20px;
    }
    .el-form-item {
      width: 28%;
      margin-right: 40px;
    }
    .el-form-item .el-select {
      width: 245px;
    }
    .dialog-box__middle {
      height: 495px;
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
      height: 442px;
      overflow-y: auto;
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
      overflow-y: auto;
      padding: 0 20px;
      .form__block {
        padding: 20px 30px;
        margin-bottom: 20px;
        box-shadow: 0 2px 6px 0 #d0d0d0;
        .dialog-box__middle-top {
          padding-bottom: 20px;
          border-bottom: 1px solid #e9e9e9;
          .title {
            font-size: 16px;
            .icon__gan {
              margin-right: 10px;
            }
          }
        }
      }
    }
    .form__button {
      background: #f8f8f8;
      border: 1px solid #dddddd;
      width: 100px;
      height: 40px;
      display: inline-block;
      position: absolute;
      bottom: 30px;
      .el-button {
        width: 100px;
        height: 40px;
      }
    }
    .no {
      left: 60px;
    }
    .yes {
      right: 60px;
    }
    .title_type {
      font-size: 14px;
      color: #333333;
      letter-spacing: 1.07px;
      text-align: center;
    }
  }
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <div class="title_type">是否保存已修改的状态？</div>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="form__button no">
        <el-button type="primary" @click="close">否</el-button>
      </div>
      <div class="form__button yes">
        <el-button type="primary" @click="save_1(save)">是</el-button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { configApi } from "../../../js/server"; // 接口
export default {
  data() {
    return {};
  },
  props: ["save", "refer"], // 新增页面填入的值来判断是否保存
  methods: {
    close() {
      this.$emit("clsoe_windowused");
    },
    save_1(save) {
      console.log(save);
      if (
        save.modelName &&
        // save.certificate_type_code &&
        save.productIds.length &&
        save.roleId &&
        save.maxApplyAmt !== ""
      ) {
        if (save.minApplyAmt <= save.maxApplyAmt) {
          // 调取保存接口
          let url = configApi.aprModelInfo_save;
          // 编辑数据
          let copyreader = {
            id: save.id,
            maxApplyAmt: save.maxApplyAmt,
            minApplyAmt: save.minApplyAmt,
            modelName: save.modelName,
            productIds: save.productIds,
            roleId: save.roleId
          };
          console.log(copyreader);
          // 编辑保存审批模型接口
          this.$MyFetch
            .post(url, copyreader)
            .then((data = {}) => {
              // this.list = data;
              // console.log(data.code);
              this.refer(1);
              this.confirmFn("保存成功", "success");
              this.$emit("clsoe_windowused");
            })
            .catch(err => {
              this.$error(err.message);
            });
        } else {
          this.$emit("clsoe_windowused1");
          this.confirmFn("输入金额前者不能大于后者", "error");
        }
      } else {
        this.$emit("clsoe_windowused1");
        this.confirmFn("资料请填写完整", "error");
      }
    }
  }
};
</script>
