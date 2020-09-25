<style lang="less" rel="stylesheet/less" scoped>
.drop_loan {
  .dialog-box {
    width: 590px;
    // height: 330px;
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
        .selectionbar {
          width: 245px;
          // height: 40px;
          z-index: 999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          // margin-left: 40px;
          border-radius: 4px;
          .el-select__tags {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
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
        // height: 270px;
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
          height: 344px;
          .el-form-item {
            .el-form-item__label .el-form-item__label {
              padding-bottom: 8px;
            }
            width: 245px;
            // margin-left: 20px;
            margin-right: 30px;
            margin-bottom: 20px;
          }
          /deep/.money {
            width: 117px;
            height: 68px;
            display: inline-block;
            margin-right: 0px;
            .el-input-number {
              display: inline-block;
              width: 117px;
            }
          }
          /deep/.money1 {
            padding-top: 27px;
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
/deep/.form__block .el-select .el-select__tags .el-input__inner {
  height: 40px;
}
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title_type">编辑</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
      </div>
      <div class="complete-product">
        <div class="dialog-box__middle-form">
          <el-form
            :model="edit_data"
            :rules="rules"
            ref="form"
            label-width="100px"
            class="demo-form-inline"
            label-position="top"
          >
            <div class="form__block bg__white border__radius-5">
              <div class="dialog-box__form__group">
                <el-form-item label="模型名称" prop="modelName">
                  <el-input v-model="edit_data.modelName"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="roleId">
                  <el-select class="selectionbar" v-model="edit_data.roleId">
                    <el-option
                      v-for="item in role"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="一级产品" prop="productIds">
                  <el-select multiple class="selectionbar" v-model="edit_data.productIds">
                    <el-option
                      id="product"
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="money" label="申请金额维度" prop="minApplyAmt">
                  <el-input-number
                    :controls="false"
                    v-model.number="edit_data.minApplyAmt"
                    :min="0"
                    autocomplete="off"
                    :max="999999999999999"
                  ></el-input-number>
                </el-form-item>-
                <el-form-item class="money money1" prop="maxApplyAmt">
                  <el-input-number
                    :controls="false"
                    v-model.number="edit_data.maxApplyAmt"
                    :min="0"
                    :max="999999999999999"
                    autocomplete="off"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="业务评分" prop="riskLevels">
                  <el-select
                    multiple
                    class="selectionbar"
                    v-model="edit_data.riskLevels"
                    placeholder="可多选"
                  >
                    <el-option
                      v-for="item in scale"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="电核输出规则" prop="telInvestFlags">
                  <el-select
                    multiple
                    class="selectionbar"
                    v-model="edit_data.telInvestFlags"
                    placeholder="可多选"
                  >
                    <el-option
                      v-for="item in electrical_data"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </div>
          </el-form>
          <div class="form__bottom">
            <el-button
              class="add finish"
              type="primary"
              @click="finish('form',edit_data)"
              :disabled="!compareData"
            >保存</el-button>
          </div>
        </div>
      </div>
    </div>
    <stateOfPreservation1
      v-if="alert_1"
      :save="edit_data"
      :refer="refer"
      @clsoe_windowused="close_2"
      @clsoe_windowused1="close_1"
    />
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import stateOfPreservation1 from "../state-of-preservation1/"; // 是否保存修改配置组件
import { configApi } from "../../../js/server"; // 接口
export default {
  data() {
    return {
      id: "10021",
      // alert_: false, // 保存修改配置
      alert_1: false, // 是否保存修改配置\
      compareData: false,
      role: [], // 模型角色数据
      options: [], // 一级产品数据
      scale: [],
      electrical_data: [
        {
          label: "需要电核",
          value: "1"
        },
        {
          label: "免核",
          value: "0"
        }
      ],
      edit_data: this.lists, // 编辑页数据
      roleId: "",
      rules: {
        modelName: [
          { required: true, message: "请填写模型名称", trigger: "change" }
        ],
        roleId: [{ required: true, message: "请选择角色", trigger: "change" }],
        productIds: [
          { required: true, message: "请选择一级产品", trigger: "change" }
        ],
        minApplyAmt: [{ required: true, message: "请输入金额" }],
        maxApplyAmt: [{ required: true, message: "请输入金额" }],
        telInvestFlags: [
          { required: true, message: "请选择电核输出规则", trigger: "change" }
        ],
        riskLevels: [
          { required: true, message: "请选择业务评分", trigger: "change" }
        ]
      }
    };
  },
  props: ["lists", "refer"],
  methods: {
    close() {
      if (this.compareData) {
        this.alert_1 = true;
      } else {
        this.$emit("clsoe_windowAlert_e");
      }
    },
    // 调取一级产品接口
    first_product() {
      let url = configApi.first_class_product;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              this.options.push({
                value: data[i].codeValue,
                label: data[i].codeText
              });
            }
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    risklevel() {
      let url = configApi.risklevel;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          for (let i = 0; i < data.length; i++) {
            this.scale.push({
              value: data[i].riskLevelCode,
              label: data[i].riskLevelName
            });
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 调取模型角色接口
    role_a() {
      let url = configApi.modeler_rolecpms;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              this.role.push({
                value: data[i].roleId,
                label: data[i].roleName
              });
            }
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 打开保存修改配置
    finish(formName, lists) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (lists.minApplyAmt && lists.maxApplyAmt !== "") {
            if (lists.minApplyAmt <= lists.maxApplyAmt) {
              let url = configApi.aprModelInfo_save;
              // // 编辑数据
              let copyreader = lists;
              console.log(copyreader);
              this.$MyFetch
                .post(url, copyreader)
                .then((data = {}) => {
                  this.$emit("clsoe_windowAlert_e");
                  this.confirmFn("保存成功", "success");
                  this.refer(1);
                  // this.alert_e = true;
                })
                .catch(err => {
                  this.$error(err.message);
                });
              this.$emit("clsoe_windowAlert");
            } else {
              this.confirmFn("上限必须小于等于下限", "error");
            }
          } else {
            this.confirmFn("申请金额维度必输（仅为正整数）");
          }
        } else {
          return false;
        }
      });
    },
    // 关闭保存修改配置
    close_1() {
      this.alert_1 = false;
    },
    // 关闭是否保存修改配置
    close_2() {
      this.alert_1 = false;
      this.$emit("clsoe_windowAlert_e");
    }
  },
  // updated: function() {},
  watch: {
    edit_data: {
      // 这监听对象值的改变 和上面的不一样。
      handler(curVal, curVal1) {
        if (curVal !== curVal1) {
          this.compareData = false;
        } else {
          this.compareData = true;
        }
      },
      deep: true
    }
  },
  components: {
    stateOfPreservation1
  },
  mounted() {
    this.role_a();
    this.first_product();
    this.risklevel();
  }
};
</script>
