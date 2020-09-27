<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 400px;
    height: 370px;
    border-radius: 4px;
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
    .dialog-box__top {
      margin: 0px;
    }
    .complete-product {
      .dialog-box__middle-form {
        height: 310px;
        .form__bottom {
          position: absolute;
          left: 50%;
          margin-left: -100px;
          bottom: 30px;
          .add {
            width: 200px;
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
        <h5 class="title_type">调整</h5>
        <span
          class="el-icon-close button button__close"
          @click="close"
        ></span>
      </div>
      <!-- 新增模型配置 -->
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <el-form
            :model="form"
            :rules="rules"
            ref="form"
            label-width="100px"
            class="demo-form-inline"
            label-position="top"
          >
            <div class="form__block bg__white border__radius-5">
              <div class="dialog-box__form__group">
                <div class="record"><span>档案所属个贷服务中心：</span><span>{{compile_data.serviceName}}</span></div>
                <el-form-item
                  label="调整后档案所属个贷服务中心"
                  prop="archivesServiceId"
                >
                  <el-select
                    class="selectionbar"
                    v-model="form.archivesServiceId"
                    placeholder="请选择服务中心"
                  >
                    <el-option
                      v-for="item in pricing_lock"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="调整生效时间"
                  prop="effectiveDate"
                >
                  <el-date-picker
                    v-model="form.effectiveDate"
                    type="datetime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期时间"
                  >
                  </el-date-picker>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div class="form__bottom">
            <el-button
              class="add finish"
              type="primary"
              @click="finish('form')"
            >保存</el-button>
          </div>
        </div>
      </div>
    </div>
    <confirm
      v-if="alert"
      :compile_data="compile_data"
      :form="form"
      :adjust="adjust"
      @clsoe_windowused='close_'
    />
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
import { loanApi } from "../../js/server.js"; // 接口
import confirm from "../confirm";
export default {
  data() {
    return {
      alert: false, // 确认页面默认关闭
      form: {
        archivesServiceId: this.compile_data.archivesServiceId, // 调整后个贷服务中心ID
        effectiveDate: this.compile_data.effectiveDate // 生效时间
      },
      rules: {
        archivesServiceId: [
          {
            required: true,
            message: "请选择调整后档案所属个贷服务中心",
            trigger: "change"
          }
        ],
        effectiveDate: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ]
      },
      pricing_lock: [] // 个贷处理中心下拉框数据
      // pickerOptions1: {
      //     disabledDate(time) {
      //       return time.getTime() < Date.now();
      //     }
      //     }
    };
  },
  methods: {
    // 关闭详情
    close() {
      this.$emit("clsoe_windowAlert");
    },
    close_() {
      this.alert = false;
      this.$emit("clsoe_windowAlert");
    },
    pricing() {
      let data = {
        excludeServiceId: this.compile_data.serviceId
      };
      let url = loanApi.archivesService_exclude;
      this.$MyFetch
        .get(url, data)
        .then((data = {}) => {
          console.log(data);
          if (data !== null) {
            data.forEach(i => {
              this.pricing_lock.push({
                value: i.serviceId,
                label: i.serviceName
              });
            });
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 调整接口
    adjust() {
      let data = {
        archivesServiceId: this.form.archivesServiceId, // 调整后个贷服务中心ID
        effectiveDate: this.form.effectiveDate, // 生效时间
        organizationId: this.compile_data.organizationId, // 分公司编码
        serviceId: this.compile_data.serviceId // 原个贷服务中心ID
      };
      let url = loanApi.archives_config;
      console.log(data);
      this.$MyFetch
        .post(url, data)
        .then((data = {}) => {
          console.log(data);
          this.close_();
          this.refer(1);
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 确定按钮
    finish(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.alert = true;
          let serviceName = this.pricing_lock[this.pricing_lock.findIndex(i => i.value === this.form.archivesServiceId)].label;
          this.$set(this.form, "serviceName", serviceName);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  components: {
    confirm
  },
  mounted() {
    this.pricing();
  },
  props: ["compile_data", "refer"]
};
</script>
