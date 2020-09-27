<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 566px;
    height: 246px;
    border-radius: 4px;
    .dialog-box__top {
      margin-bottom: 0px;
    }
    // 顶部新增样式
    .title_type {
      text-align: center;
      background: #fff;
      font-size: 18px;
      letter-spacing: 1.3px;
      padding-left: 20px;
      font-weight: bold;
    }
    // 内容输入框整体样式
    .complete-product {
      .dialog-box__middle-form {
        // 保存按钮样式
        .form__bottom {
          position: absolute;
          left: 50%;
          margin-left: -100px;
          bottom: 30px;
          .add {
            width: 200px;
          }
        }
        width: 100%;
        height: 185px;
        padding: 0px;
        .dialog-box__form__group {
          padding-left: 30px;
          padding-top: 20px;
          height: 185px;
          // 下拉框样式
          .el-form-item {
            width: 232px;
            margin-right: 30px;
            margin-bottom: 20px;
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
        <h5 class="title_type">编辑</h5>
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
                <el-form-item
                  label="分公司"
                  prop="subcompanyId"
                >
                  <el-select
                    class="selectionbar"
                    v-model="form.subcompanyId"
                    disabled
                  >
                    <el-option
                      v-for="item in role"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="定价锁开关"
                  prop="switch"
                >
                  <!-- <el-input v-model="form.update"></el-input> -->
                  <el-switch
                    v-model="form.pricingSwitch"
                    :width=50
                  ></el-switch>
                  <span>{{form.pricingSwitch  ? '开':'关'}}</span>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div class="form__bottom">
            <el-button
              class="add finish"
              type="primary"
              :disabled="!compareData"
              @click="finish('form')"
            >保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { accountApi } from "../../js/server.js"; // 接口
// import reportRules from "../../js/reportRules.js"; // 规则验证
export default {
  props: ["refer", "compile_data"],
  data() {
    return {
      id: "10021",
      alert_: false, // 保存修改配置
      alert_1: false, // 是否保存修改配置
      role: [], // 消息类型下拉内容
      messageOperate: [], // 消息操作下拉内容
      pushObject: [], // 推送对象下拉内容
      compareData: false, // 保存按钮默认置灰
      form: this.compile_data,
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > this.date_interval();
        }
      },
      rules: {
        subcompanyId: [
          { required: true, message: "请选择消息类型", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    // 关闭新增页面
    close() {
      this.$emit("clsoe_windowAlert");
      // this.refer(1);
      console.log(this.form);
    },
    // 下拉框数据查询
    drop_down() {
      let url = accountApi.pricing_lock_controller.common_subcompanies;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          console.log(data);
          // 消息类型下拉内容
          for (let i = 0; i < data.length; i++) {
            this.role.push({
              value: data[i].subcompanyId,
              label: data[i].subcompanyName
            });
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 新增保存
    finish(formName) {
      console.log(this.form);
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = {
            id: this.form.id,
            pricingSwitch: this.form.pricingSwitch,
            subcompanyId: this.form.subcompanyId
          };
          // 调取接口
          let url = accountApi.pricing_lock_controller.pricingLock_update;
          console.log(data);
          this.$MyFetch
            .post(url, data)
            .then((data = {}) => {
              this.confirmFn("修改成功", "success");
              this.refer(1);
              this.$emit("clsoe_windowAlert");
            })
            .catch(err => {
              this.$error(err.message);
            });
        } else {
          return false;
        }
      });
    }
  },
  watch: {
    form: {
      // 这监听对象值的改变 和上面的不一样。
      handler(curVal, curVal1) {
        if (curVal !== curVal1) {
          this.compareData = false;
          // this.alert_1 = false;
        } else {
          this.compareData = true;
          // console.log("失败");
        }
      },
      deep: true
    }
  },
  mounted() {
    this.drop_down();
  }
};
</script>
