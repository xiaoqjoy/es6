<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title_type">新增降额原因</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <el-form :model="form"
            :rules="rules"
            ref="form"
            label-width="100px"
            class="demo-form-inline" label-position="top">
            <div class="form__block bg__white border__radius-5">
              <div class="dialog-box__form__group">
                <el-form-item class="whether" label="是否新增一级编号" prop="delivery">
                  <el-switch v-model="form.delivery" @change="onSwitch" class='common__switch' :width="50"></el-switch><span class="spanP">{{ form.delivery ? '是' : '否' }}</span>
                </el-form-item>
                <el-form-item v-if="form.delivery" label="一级编号" prop="number_1">
                  <el-input maxlength="10" v-model.trim="form.number_1" placeholder="请输入一级编号"></el-input>
                </el-form-item>
                <el-form-item v-else label="一级编号" prop="number_x">
                  <el-select v-model="form.number_x" @change="onLeveloneChange" placeholder="请选择一级编号">
                    <el-option v-for="item in list_input"
                      :key="item.codeLevelOne"
                      :label="item.codeLevelOne"
                      :value="item.codeLevelOne">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item v-if="form.delivery" class="the-secondary-number" label="一级维度" prop="fill_class">
                  <el-input maxlength="50" v-model.trim="form.fill_class" placeholder="请输入一级维度"></el-input>
                </el-form-item>
                <el-form-item v-else class="user">
                  <label>一级维度：</label><span>{{ form.fill_class_d }}</span>
                </el-form-item>
                <el-form-item label="二级编号" prop="number_2">
                  <el-input maxlength="10" v-model.trim="form.number_2" placeholder="请输入二级编号"></el-input>
                </el-form-item>
                <el-form-item label="二级维度" prop="fill_class_x">
                  <el-input maxlength="50" v-model.trim="form.fill_class_x"  placeholder="请输入二级维度"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div class="form__bottom">
            <el-button class="add finish" type="primary" @click="saveFn">保存</el-button>
          </div>
        </div>
      </div>
    </div>
    <whetherSave :save_s="saveFnCb" v-if="showSavePop" @clsoe_windowused='closeSavePop' @clsoe_windowused_='closeSavePop_' />
  </div>
</template>
<script>
import "@common/css/dialog";
import whetherSave from "../../whetherSave/index"; // 是否保存修改配置组件
import { configApi } from "../../../js/server.js"; // 接口

export default {
  data() {
    return {
      form: {
        delivery: true,
        number_1: "", // // 一级编号输入
        number_2: "",
        fill_class: "",
        fill_class_x: "",
        number_x: "", // 一级编号选择
        fill_class_d: '' // 一级编号选择对应值
      },
      rules: {
        delivery: [{ required: true, message: "请选择", trigger: "blur" }],
        number_1: [
          { required: true, message: "请输入一级编号", trigger: "blur" }
        ],
        number_2: [
          { required: true, message: "请输入二级编号", trigger: "blur" }
        ],
        number_x: [
          { required: true, message: "请选择一级编号", trigger: "blur" }
        ],
        fill_class: [
          // { validator: reportValidator.chineseRule, trigger: "blur" },
          { required: true, message: "请输入一级维度", trigger: "blur" }
        ],
        fill_class_x: [
          // { validator: reportValidator.chineseRule, trigger: "blur" },
          { required: true, message: "请输入二级维度", trigger: "blur" }
        ]
      },
      list_input: [],
      showSavePop: false
    };
  },
  methods: {
    close() {
      if (
        this.form.number_1 === "" &&
        this.form.number_x === "" &&
        this.form.fill_class === "" &&
        this.form.number_2 === "" &&
        this.form.fill_class_x === ""
      ) {
        this.$emit('close', false);
      } else {
        this.showSavePop = true;
      }
    },
    saveFnCb() {
      this.showSavePop = false;
      this.saveFn();
    },
    saveFn() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          const data = {
            codeLevelOne: this.form.delivery ? this.form.number_1 : this.form.number_x,
            codeLevelTwo: this.form.number_2,
            idLevelTwo: '',
            newLevelOne: this.form.delivery,
            titleLevelOne: this.form.delivery ? this.form.fill_class : this.form.fill_class_d,
            titleLevelTwo: this.form.fill_class_x
          };
          const url = `${configApi.derate_base}/derate_reason/twoLevel/save`;
          this.$MyFetch
            .post(url, data)
            .then((data = {}) => {
              console.log(data);
              this.confirmFn("新增成功", "success");
              this.$emit('close', true);
            })
            .catch(err => {
              this.$error(err.message);
            });
        }
      });
    },
    onSwitch(value) {
      this.$refs["form"].clearValidate();
      if (!value) {
        const url = `${configApi.derate_base}/derate_reason/effectiveLevelOne/list`;
        this.$MyFetch
          .get(url)
          .then((data = {}) => {
            console.log(data);
            this.list_input = data;
          })
          .catch(err => {
            this.$error(err.message);
          });
      }
    },
    onLeveloneChange(value) {
      const item = this.list_input.find((item) => item.codeLevelOne === value);
      this.form.fill_class_d = item.titleLevelOne;
    },
    closeSavePop() {
      this.showSavePop = false;
      this.$emit('close', false);
    },
    closeSavePop_() {
      this.showSavePop = false;
    }
  },
  components: {
    whetherSave
  }
};
</script>
<style lang="less" scoped>
.drop_loan {
  .dialog-box {
    width: 590px;
    // height: 406px;
    border-radius: 4px;
    padding: 0px;
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
      // overflow-y: auto;
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
      // overflow-y: auto;
      padding: 0 20px;
      .form__block {
        padding: 20px 30px;
        margin-bottom: 20px;
        // box-shadow: 0 2px 6px 0 #d0d0d0;
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
        // height: 270px;
        .form__bottom {
          text-align: center;
          margin-bottom: 20px;
          // position: absolute;
          // left: 50%;
          // margin-left: -100px;
          // bottom: 22px;
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
          .user {
            margin-bottom: 30px;
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
          .whether {
            display: block;
            .spanP {
              margin-left: 10px;
            }
            .el-switch__core {
              width: 50px !important ;
            }
          }
          .user {
            label {
              font-size: 14px;
              color: #666;
            }
            span {
              font-size: 14px;
              color: #151515;
            }
          }
          padding-left: 30px;
          padding-top: 20px;
          // height: 346px;
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
