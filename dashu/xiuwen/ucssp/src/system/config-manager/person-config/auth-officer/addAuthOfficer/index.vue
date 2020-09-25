<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 590px;
    height: 330px;
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
        height: 270px;
        .form__bottom {
          position: absolute;
          left: 50%;
          margin-left: -100px;
          bottom: 30px;
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
          height: 270px;
          .el-form-item {
            .el-form-item__label .el-form-item__label {
              padding-bottom: 8px;
            }
            width: 245px;
            // margin-left: 20px;
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
        <h5 class="title_type">新增授权人员</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="complete-product">
        <div class="dialog-box__middle-form">
            <el-form :model="form"
              :rules="rules"
              ref="form"
              label-width="100px"
              class="demo-form-inline" label-position="top" >
              <div class="form__block bg__white border__radius-5">
                <div class="dialog-box__form__group">
                  <el-form-item  label="用户编号" prop="userId">
                    <!-- <el-tooltip v-model="value" content="Top center" placement="top">
                    </el-tooltip> -->
                    <el-input  @blur="username_a('form')" v-model="form.userId" placeholder="请填写用户编号"></el-input>
                  </el-form-item>
                  <el-form-item label="用户姓名">
                    <el-input v-model="form.username" :disabled="compareData" placeholder="*************"></el-input>
                  </el-form-item>
                  <el-form-item  label="模型名称" prop="modelIds">
                    <el-select multiple class="selectionbar" v-model="form.modelIds" placeholder="请选择模型名称">
                      <el-option v-for="item in role" :key="item.value" :label="item.label" :value="item.value">
                      </el-option>
                      </el-select>
                  </el-form-item>
                </div>
              </div>
            </el-form>
            <div class="form__bottom">
              <el-button class="add finish" type="primary" @click="finish('form')">保存</el-button>
            </div>
          </div>
      </div>
    </div>
    <saveChanges :warranty="form" :refer="refer" v-if="alert_" @clsoe_windowused='close_1' @clsoe_windowused2='close_4'/>
    <stateOfPreservation v-if="alert_1" @clsoe_windowused='close_2'  @clsoe_windowused_a='close_3'/>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import saveChanges from "../save-changes"; // 保存修改配置组件
import stateOfPreservation from "../state-of-preservation"; // 是否保存修改配置组件
import { configApi } from "../../../js/server"; // 接口
export default {
  props: ["refer"],
  data() {
    return {
      id: "10001",
      alert_: false, // 保存修改配置
      alert_1: false, // 是否保存修改配置
      compareData: true,
      // value:true,
      form: {
        modelIds: [], // 模型名称
        userId: "", // 用户编码
        username: "" // 用户名
      },
      role: [],
      rules: {
        modelIds: [
          { required: true, message: "请选择模型名称", trigger: "change" }
        ],
        userId: [
          { required: true, message: "请填写正确的用户编号", trigger: "blur" }
        ],
        username: [
          { required: true, message: "请选择用户姓名", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    username_a(formName) {
      this.role = [];
      this.form.modelIds = [];
      this.form.username = "";
      let data = {
        userId: this.form.userId
      };
      console.log(data);
      if (data.userId !== "") {
        let url = configApi.modeler_username;
        this.$MyFetch
          .get(url, data)
          .then((data = {}) => {
            console.log(data);
            if (data !== null) {
              this.form.username = data.userName;
              for (let i = 0; i < data.models.length; i++) {
              this.role.push({
                value: data.models[i].modelId,
                label: data.models[i].modelName
              });
            }
            } else {
              // this.$message.error('错了哦，这是一条错误消息');
              this.$error("UM号不存在，请输入正确的UM号");
            }
          })
          .catch(err => {
            this.$error(err.message);
          });
      }
    },
    close() {
      this.alert_1 = true;
    },
    // 打开保存修改配置
    finish(formName) {
      let data = [];
      for (let index = 0; index < this.form.modelIds.length; index++) {
        data.push(this.role[this.role.findIndex(i => i.value === this.form.modelIds[index])].label);
      };
      this.$set(this.form, 'modelName', data.join(","));
      // this.$emit("clsoe_windowAlert");
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.alert_ = true;
          // console.log(data);
          // 调取保存接口;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 关闭保存修改配置
    close_1() {
      this.alert_ = false;
      // this.$emit("clsoe_windowAlert");
    },
    close_4() {
      this.alert_ = false;
      this.$emit("clsoe_windowAlert");
    },
    close_3() {
      this.alert_1 = false;
    },
    // 关闭是否保存修改配置
    close_2() {
      this.alert_1 = false;
      this.$emit("clsoe_windowAlert");
    }
  },
  components: {
    saveChanges,
    stateOfPreservation
  }
};
</script>
