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
        .selectionbar {
          width: 245px;
          z-index: 999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          border-radius: 4px;
          .el-select__tags {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
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
</style>
<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title_type">新增模型配置</h5>
        <span class="el-icon-close button button__close" @click="close"></span>
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
                <el-form-item label="模型名称" prop="guarantee_name">
                  <el-input v-model="form.guarantee_name" placeholder="模型名称"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="certificate_type_code">
                  <el-select
                    class="selectionbar"
                    v-model="form.certificate_type_code"
                    placeholder="审核岗"
                  >
                    <el-option
                      v-for="item in role"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="一级产品" prop="contact_num">
                  <el-select
                    multiple
                    class="selectionbar"
                    v-model="form.contact_num"
                    placeholder="可多选"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item class="money" label="申请金额维度" prop="mun1">
                  <el-input-number
                    type="mun1"
                    :controls="false"
                    v-model.number="form.mun1"
                    :min="1"
                    autocomplete="off"
                    :max="999999999999999"
                  ></el-input-number>
                </el-form-item>-
                <el-form-item class="money money1" prop="mun2">
                  <el-input-number
                    type="mun2"
                    :controls="false"
                    v-model.number="form.mun2"
                    :min="1"
                    :max="999999999999999"
                    autocomplete="off"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="业务评分" prop="riskLevels">
                  <el-select
                    multiple
                    class="selectionbar"
                    v-model="form.riskLevels"
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
                    v-model="form.telInvestFlags"
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
            <el-button class="add finish" type="primary" @click="finish('form',form)">保存</el-button>
          </div>
        </div>
      </div>
    </div>
    <stateOfPreservation
      :savea="form"
      :finish="finish"
      v-if="alert_1"
      @clsoe_windowused="close_2"
      @clsoe_windowused_a="close_3"
    />
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import stateOfPreservation from "../state-of-preservation"; // 是否保存修改配置组件
import { configApi } from "../../../js/server"; // 接口
export default {
  props: ["refer"],
  data() {
    return {
      id: "10021",
      alert_: false, // 保存修改配置
      alert_1: false, // 是否保存修改配置
      form: {
        guarantee_name: "",
        certificate_type_code: "",
        contact_num: [],
        house_area_num: "",
        house_branch_num: "",
        house_address: "",
        mun1: "",
        mun2: "",
        Amount: "",
        telInvestFlags: [],
        riskLevels: []
      },
      role: [],
      // 产品多选数据
      options: [],
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
      rules: {
        guarantee_name: [
          { required: true, message: "请填写模型名称", trigger: "blur" }
        ],
        certificate_type_code: [
          { required: true, message: "请选择角色", trigger: "change" }
        ],
        contact_num: [
          { required: true, message: "请选择一级产品", trigger: "change" }
        ],
        mun1: [{ required: true, message: "请输入金额", trigger: "blur" }],
        mun2: [{ required: true, message: "请输入金额", trigger: "blur" }],
        telInvestFlags: [
          { required: true, message: "请选择电核输出规则", trigger: "change" }
        ],
        riskLevels: [
          { required: true, message: "请选择业务评分", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    close() {
      if (
        this.form.guarantee_name ||
        this.form.certificate_type_code ||
        this.form.mun1 ||
        this.form.mun2 !== "" ||
        this.form.contact_num.length !== 0
      ) {
        this.alert_1 = true;
        console.log(this.form);
      } else {
        this.$emit("clsoe_windowAlert");
      }
    },
    empty() {
      this.form = {
        contact_num: [],
        certificate_type_code: "",
        telInvestFlags: [],
        riskLevels: []
      };
    },
    // 调取一级产品接口
    first_product() {
      let url = configApi.first_class_product;
      this.$MyFetch
        .get(url)
        .then((data = {}) => {
          for (let i = 0; i < data.length; i++) {
            this.options.push({
              value: data[i].codeValue,
              label: data[i].codeText
            });
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
          for (let i = 0; i < data.length; i++) {
            this.role.push({
              value: data[i].roleId,
              label: data[i].roleName
            });
          }
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    // 打开保存修改配置
    finish(formName, data) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.form.mun1 && this.form.mun2 !== "") {
            if (this.form.mun1 <= this.form.mun2) {
              this.alert_ = true;
              this.form.Amount = true;
              // 调取保存接口;
              let url = configApi.aprModelInfo_save;
              let save = {
                // id: 0,
                maxApplyAmt: data.mun2,
                minApplyAmt: data.mun1,
                modelName: data.guarantee_name,
                productIds: data.contact_num,
                roleId: data.certificate_type_code,
                riskLevels: data.riskLevels,
                telInvestFlags: data.telInvestFlags
              };
              console.log(save);
              // 新增保存接口;
              this.$MyFetch
                .post(url, save)
                .then((data = {}) => {
                  this.confirmFn("保存成功", "success");
                  this.refer(1);
                  this.alert_1 = false;
                })
                .catch(err => {
                  this.$error(err.message);
                });
              this.$emit("clsoe_windowAlert");
            } else {
              this.confirmFn("上限必须小于等于下限");
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
      this.alert_ = false;
    },
    // 关闭是否保存修改配置
    close_2() {
      this.alert_1 = false;
      this.$emit("clsoe_windowAlert");
    },
    close_3() {
      this.alert_1 = false;
    }
  },
  components: {
    stateOfPreservation
  },
  mounted() {
    this.role_a();
    this.first_product();
    this.empty();
    this.risklevel();
  }
};
</script>
