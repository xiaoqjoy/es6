<style lang="less">
  .tips__save .el-message-box__header .el-message-box__title {
    display: flex;
  }
</style>
<style lang="less" rel="stylesheet/less" scoped>
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
          display: flex;
          flex-wrap: wrap;
          padding: 20px;
          > div {
            flex-basis: 45%;
            margin-right: 20px;
          }
          > div:last-child, > div:first-child {
            flex-basis: 100%;
            margin-right: 0px;
          }
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
          // height: 346px;
          .el-form-item {
            .el-form-item__label .el-form-item__label {
              padding-bottom: 8px;
            }
            width: 245px;
            // margin-left: 20px;
            margin-bottom: 20px;
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
        <h5 class="title_type">新增电核勾选</h5>
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
                  <el-form-item class="whether" label="是否新增编号" prop="delivery">
                    <el-select v-model="form.delivery" @change="whetherNew">
                      <el-option
                        v-for="item in deliveryList"
                        :key="item.itemCode"
                        :label="item.itemDesc"
                        :value="item.itemCode">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="一级编号" :prop="form.delivery === '1' ? 'codeLevelOneInput' : 'codeLevelOneSelect'">
                    <el-input v-if="form.delivery === '1'" maxlength="10" show-word-limit v-model.trim="form.codeLevelOneInput" placeholder="请输入一级编号"></el-input>
                    <el-select v-if="form.delivery !== '1'" @change="matchingComp"  v-model="form.codeLevelOneSelect" placeholder="请选择一级编号">
                      <el-option v-for="item in listForOne"
                        :key="item.code"
                        :label="item.code"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item class="the-secondary-number" label="一级维度" prop="titleLevelOne">
                    <el-input maxlength="20" show-word-limit v-model.trim="form.titleLevelOne" placeholder="请输入一级维度" :disabled="form.delivery !== '1'"></el-input>
                  </el-form-item>
                  <el-form-item label="二级编号" :prop="form.delivery !== '0' ? 'codeLevelTwoInput' : 'codeLevelTwoSelect'">
                    <el-input show-word-limit v-if="form.delivery !== '0'" maxlength="10" v-model.trim="form.codeLevelTwoInput" placeholder="请输入二级编号"></el-input>
                    <el-select @change="matchCompLevelTwo" v-model="form.codeLevelTwoSelect" v-if="form.delivery === '0'" placeholder="请选择二级编号">
                      <el-option
                        v-for="item in listForTwo"
                        :key="item.code"
                        :label="item.code"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="二级维度" prop="titleLevelTwo">
                    <el-input maxlength="20" v-model.trim="form.titleLevelTwo" :disabled="form.delivery === '0'" placeholder="请输入二级维度"></el-input>
                  </el-form-item>
                  <el-form-item label="三级编码" prop="codeLevelThree">
                    <el-input v-model="form.codeLevelThree" maxlength="10" show-word-limit placeholder="请输入三级编号"></el-input>
                  </el-form-item>
                  <el-form-item label="三级维度" prop="titleLevelThree">
                    <el-input type="textarea" rows="5" v-model="form.titleLevelThree" maxlength="100" show-word-limit placeholder="请输入三级编号"></el-input>
                  </el-form-item>
                </div>
              </div>
            </el-form>
            <div class="form__bottom">
              <el-button class="add finish" type="primary" @click="finish">保存</el-button>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import { configApi } from "../../../js/server"; // 接口
// import reportValidator from "../../../js/reportRules";
export default {
  data() {
    return {
      deliveryList: [
        {itemCode: '0', itemDesc: '不新增'},
        {itemCode: '1', itemDesc: '新增一级编号'},
        {itemCode: '2', itemDesc: '新增二级编号'}
      ],
      whetherAdd: "是", // 提醒是否新增一级编号
      aa: "", // 当一级编号为下拉框的时候，补件分类自动代入
      listForOne: [], // 一级编号下拉框
      listForTwo: [], // 二级维度下拉
      form: {
        delivery: '0',
        codeLevelOneInput: "",
        codeLevelTwoInput: "",
        titleLevelOne: "",
        titleLevelTwo: "",
        codeLevelOneSelect: "",
        codeLevelTwoSelect: '',
        codeLevelThree: '',
        titleLevelThree: ''
      },
      rules: {
        delivery: [{ required: true, message: "请选择", trigger: "blur" }],
        codeLevelOneInput: [
          { required: true, message: "请输入一级编号", trigger: "blur" }
        ],
        codeLevelTwoInput: [
          { required: true, message: "请输入二级编号", trigger: "blur" }
        ],
        codeLevelOneSelect: [
          { required: true, message: "请选择一级编号", trigger: "change" }
        ],
        codeLevelTwoSelect: [
          { required: true, message: "请选择二级编号", trigger: "change" }
        ],
        codeLevelThree: [
          { required: true, message: "请输入三级编号", trigger: "blur" }
        ],
        titleLevelThree: [
          { required: true, message: "请输入三级维度", trigger: "blur" }
        ],
        titleLevelOne: [
          // { validator: reportValidator.chineseRule, trigger: "blur" },
          { required: true, message: "请输入一级维度", trigger: "blur" }
        ],
        titleLevelTwo: [
          // { validator: reportValidator.chineseRule, trigger: "blur" },
          { required: true, message: "请输入二级维度", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getLevelList({level = 'One', parentCode} = {}) {
      let url = configApi.getOptionList.replace('{configType}', 'phone_check_code');
      this.$MyFetch.get(url, parentCode ? {parentCode} : undefined).then(_data => {
        this[`listFor${level}`] = _data;
      }).catch(_err => {
        this.$message.error(_err.message);
      });
    },
    // 根据是否新增一级编号来判断一级编号是输入框还是下拉框
    whetherNew(_val) {
      this.form = Object.assign(this.form, {
        codeLevelOneInput: "",
        codeLevelTwoInput: "",
        titleLevelOne: "",
        titleLevelTwo: "",
        codeLevelOneSelect: ""
      });
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    // 根据一级编号自动带入一级维度
    matchingComp(_val) {
      this.filterDimension(this.listForOne, 'One');
      this.getLevelList({level: 'Two', parentCode: _val});
    },
    matchCompLevelTwo(_val) {
      this.filterDimension(this.listForTwo, 'Two');
    },
    filterDimension(_list, _level) {
      for (let i = 0; i < _list.length; i++) {
        if (this.form[`codeLevel${_level}Select`] === _list[i].code) {
          this.form[`titleLevel${_level}`] = _list[i].name;
          break;
        }
      }
    },
    close() {
      if (
        this.form.codeLevelOneInput === "" &&
        this.form.codeLevelOneSelect === "" &&
        this.form.titleLevelOne === "" &&
        this.form.codeLevelTwoInput === "" &&
        this.form.titleLevelTwo === "" &&
        this.form.codeLevelThree === '' &&
        this.form.titleLevelThree === ''
      ) {
        this.$emit("clsoe_windowAlert");
      } else {
        // this.alert_1 = true;
        this.$confirm('', '是否保存已修改的状态？', {
          distinguishCancelAndClose: true,
          confirmButtonText: '是',
          cancelButtonText: '否',
          center: true,
          customClass: 'tips__save'
        }).then(() => {
          this.finish();
        }).catch(() => {
          this.$emit("clsoe_windowAlert");
        });
      }
    },
    // 新增接口
    finish() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // /apr/config/operationConfig/phone_check_code/threeLevel/save
          let url = configApi.configSave.replace('{configType}', 'phone_check_code');
          let isNew = {
            newLevelOne: this.form.delivery === '1',
            newLevelTwo: this.form.delivery === '2',
            codeLevelOne: this.form.codeLevelOneInput || this.form.codeLevelOneSelect,
            codeLevelTwo: this.form.codeLevelTwoInput || this.form.codeLevelTwoSelect
          };
          let data = Object.assign(isNew, this.form);
          this.$MyFetch.post(url, data).then(_data => {
            this.cause_x(1);
            this.confirmFn("新增成功", "success");
            this.$emit("clsoe_windowAlert");
          }).catch(_err => {
            this.$error(_err.message);
          });
        }
      });
    }
  },
  mounted() {
    this.getLevelList({level: 'One'});
    this.whetherNew('1');
  },
  props: ["cause_x"]
};
</script>
