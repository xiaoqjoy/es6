<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 590px;
    height: 446px;
    padding: 0px;
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
      width: 28%;
      margin-right: 40px;
      /deep/ .el-input-number .el-input__inner {
        text-align: left;
      }
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
    .dialog-box__middle-form {
      overflow-y: auto;
      padding: 0 20px;
      .form__block {
        padding: 20px 30px;
        margin-bottom: 20px;
        box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.05);
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
    .dialog-box__top {
      margin: 0px;
    }
    .complete-product {
      .dialog-box__middle-form {
        height: 395px;
        .form__bottom {
          position: absolute;
          left: 50%;
          margin-left: -100px;
          bottom: 18px;
          .add {
            width: 200px;
          }
        }
        width: 590px;
        // height: 200px;
        padding: 0px;
        .form__block {
          width: 590px;
          padding: 0px;
          margin: 0px;
        }
        .dialog-box__form__group {
          padding-left: 30px;
          padding-top: 20px;
          height: 395px;
          .el-form-item {
            .el-form-item__label .el-form-item__label {
              padding-bottom: 8px;
            }
            .el-form-item__content {
              border: 1px solid #e5e5e5;
              border-radius: 4px;
            }
            .el-input-number {
              width: 245px;
              text-align: left;
            }
            width: 245px;
            // margin-left: 20px;
            margin-right: 30px;
            margin-bottom: 20px;
          }
          .finally {
            width: 530px;
            margin: 0px;
          }
          .user {
            margin-bottom: 20px;
            label {
              font-size: 14px;
              color: #666;
            }
            span {
              font-size: 14px;
              color: #151515;
              line-height: 20px;
            }
            .username {
              margin-left: 40px;
            }
          }
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
      <div class="dialog-box__top">
        <h5 class="title_type">编辑</h5>
        <span class="el-icon-close button button__close" @click="close(compareData)"></span>
      </div>
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <el-form
            :model="list_"
            :rules="rules"
            ref="list_"
            label-width="100px"
            class="demo-form-inline"
            label-position="top"
          >
            <div class="form__block bg__white border__radius-5">
              <div class="dialog-box__form__group">
                <div class="user">
                  <label>用户编号：</label>
                  <span v-html="list_.userId"></span>
                  <label class="username">用户名称：</label>
                  <span v-html="list_.userName"></span>
                </div>
                <el-form-item class="left_l" label="日峰值" prop="dailyPeakVal">
                  <el-input
                    align="left"
                    :controls="false"
                    v-model="list_.dailyPeakVal"
                    placeholder="请输入"
                  ></el-input>
                </el-form-item>
                <el-form-item label="状态">
                  <el-select @change="condition" v-model="list_.onlineStatus" placeholder="请选择">
                    <el-option label="在职" :value="true"></el-option>
                    <el-option label="休假" :value="false"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="对接人编号">
                  <el-input v-model="list_.takeOverUserId" disabled></el-input>
                </el-form-item>
                <el-form-item label="对接人姓名" prop="takeOverUserName">
                  <el-select
                    @change="dockName"
                    v-model="list_.takeOverUserName"
                    :disabled="list_.onlineStatus === true"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in contactName"
                      :key="item.id"
                      :label="item.takeOverUserName"
                      :value="item.takeOverUserId"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="开始生效日期" prop="effectiveStartDate">
                  <el-date-picker
                    v-model="list_.effectiveStartDate"
                    :disabled="list_.onlineStatus === true"
                    type="date"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期">
                  <el-date-picker
                    v-model="list_.effectiveEndDate"
                    :disabled="list_.onlineStatus === true"
                    type="date"
                    value-format="yyyy-MM-dd"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div class="form__bottom">
            <el-button class="add finish" type="primary" @click="edit" :disabled="!compareData">保存</el-button>
          </div>
        </div>
      </div>
    </div>
    <stateOfPreservation :refer="refer" :fn="edit" v-if="alert_1" @close_window="close_3" @clsoe_windowused="close_2"/>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import rules from "@common/js/rules"; // 引入校验规则
import stateOfPreservation from "../../../rule-config/state-of-preservation/"; // 是否保存修改配置组件
import { configApi } from "../../../js/server"; // 接口
export default {
  data() {
    return {
      alert_1: false, // 是否保存修改配置
      list_qz: [], // 对接人姓名下拉框
      rules: {
        dailyPeakVal: [
          { validator: rules.nonNegative4, trigger: "blur" }
        ],
        takeOverUserName: [
          { required: true, message: "请选择对接人姓名", trigger: "change" }
        ],
        effectiveStartDate: [
          { required: true, message: "请选择开始生效日期", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    condition() {
      if (this.list_.onlineStatus) {
        this.list_.takeOverUserId = "";
        this.list_.takeOverUserName = "";
        this.list_.effectiveStartDate = "";
        this.list_.effectiveEndDate = "";
        this.rules.takeOverUserName[0].required = false;
        this.rules.effectiveStartDate[0].required = false;
      } else {
        this.rules.takeOverUserName[0].required = true;
        this.rules.effectiveStartDate[0].required = true;
      }
      this.$refs["list_"].clearValidate();
    },
    // 对接人姓名带出对接人编号
    dockName() {
      for (var i = 0; i < this.contactName.length; i++) {
        if (
          this.list_.takeOverUserName === this.contactName[i].takeOverUserId
        ) {
          this.list_.takeOverUserId = this.contactName[i].takeOverUserId;
        }
      }
    },
    // 点击关闭判断页面是否有修改
    close(compareData) {
      console.log(this.list_);
      if (compareData) {
        this.alert_1 = true;
      } else {
        this.$emit("clsoe_windowAlert_e");
      }
    },
    // 进页面根据状态来处理对接人姓名和开始生效日期是否必输
    editPeak() {
      if (this.list_.onlineStatus) {
        this.rules.takeOverUserName[0].required = false;
        this.rules.effectiveStartDate[0].required = false;
      }
    },
    // 编辑接口
    edit() {
      this.$refs["list_"].validate(valid => {
        if (valid) {
          this.editData();
        }
      });
    },
    editData() {
      if (this.list_.takeOverUserId === "") {
        this.list_.takeOverUserId = null;
      }
      let data = {
        dailyPeakVal: this.list_.dailyPeakVal,
        effectiveEndDate: this.list_.effectiveEndDate,
        effectiveStartDate: this.list_.effectiveStartDate,
        id: this.current_data,
        onlineStatus: this.list_.onlineStatus,
        roleId: this.list_.roleId,
        takeOverUserId: this.list_.takeOverUserId,
        userId: this.list_.userId
      };
      let url = configApi.approver_save;
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.$emit("clsoe_windowAlert_e");
          this.confirmFn("保存成功", "success");
          this.refer();
          this.alert_1 = false;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 单独关闭是否保存修改配置
    close_3() {
      this.alert_1 = false;
    },
    // 关闭是否保存修改配置
    close_2() {
      this.alert_1 = false;
      this.$emit("clsoe_windowAlert_e");
    }
  },
  components: {
    stateOfPreservation
  },
  computed: {
    compareData() {
      var isChange = false;
      if (JSON.stringify(this.list_) !== JSON.stringify(this.current_list)) {
        isChange = true;
      }
      return isChange;
    }
  },
  props: ["list_", "current_list", "current_data", "refer", "contactName"],
  created() {
    this.editPeak();
  }
};
</script>
