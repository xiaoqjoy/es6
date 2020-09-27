<template>
  <div class="drop_loan">
    <div class="dialog-mask"></div>
    <div class="dialog-box">
      <div class="dialog-box__top">
        <h5 class="title_type">{{title}}</h5>
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
                  label="省-市"
                  prop="regionType"
                >
                  <ele-multi-cascader
                    v-if="show"
                    class=""
                    :options="regionOptions"
                    v-model="form.regionType"
                    placeholder="选择地区,可多选"
                    @change="regionChange"
                    showId="path"
                    >
                  </ele-multi-cascader>
                  <div v-if="!show">
                    <el-cascader class="select_245"
                    :options="regionOptions"
                    v-model="form.regionType"
                    :disabled="!show"
                    @change="regionChange"></el-cascader>
                  </div>
                </el-form-item>
                <el-form-item
                  label="税务数据接入机构"
                  prop="tlTaxOrganizationId"
                >
                  <el-select
                    class="selectionbar"
                    v-model="form.tlTaxOrganizationId"
                    placeholder="税务机构"
                    @change="test">
                    <el-option
                      v-for="item in taxOrganizationIdList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item
                  label="是否有效"
                  prop="switch"
                >
                  <!-- <el-input v-model="form.update"></el-input> -->
                  <el-switch
                    v-model="form.switch"
                    :width=50
                    @change="statusCdChange"
                  ></el-switch>
                  <span>{{(form.switch === true) ? '是':'否'}}</span>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="form__bottom">
        <el-button
          class="add finish"
          type="primary"
          @click="save('form')"
        >确认</el-button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import "@common/css/dialog";
import EleMultiCascader from '@components/eleMultiCascader';
import { accountApi } from "../../js/server.js"; // 接口
// import reportRules from "../../js/reportRules.js"; // 规则验证
export default {
  props: ["refer", 'regOption', 'taxOrganizationIdList', 'title', 'rowData', 'show'],
  data() {
    return {
      id: "10021",
      parent: '',
      regionOptions: this.regOption,
      url: accountApi.taxConfig.tax_loan_area_save, // 默认为新增的api
      outputs: {
        values: [],
        items: []
      },
      editFlag: this.$lodash.isEmpty(this.rowData), // true 为新增，false 为编辑
      form: {
        regionType: [],
        statusCd: 'N',
        tlTaxOrganizationId: []
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > this.date_interval();
        }
      },
      rules: {
        regionType: [
          { required: true, message: "区域 不能为空", trigger: "change" }
        ],
        tlTaxOrganizationId: [{ required: true, message: '税务数据接入机构 不能为空', trigger: 'blur' }]
      }
    };
  },
  methods: {
    test(_val) {
      console.log(_val);
    },
    // 关闭新增页面
    close() {
      this.$emit("clsoe_windowAlert");
      // this.refer(1);
    },
    statusCdChange(_val) {
      this.form.statusCd = _val ? 'N' : 'U';
    },
    // 新增保存
    save(formName) {
      // console.log(this.form);
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        }
        let data = {
          areaId: this.editFlag ? this.form.regionType : this.form.areaId, // 新增的时候传给后台为一个list，编辑的时候为string
          tlTaxOrganizationId: this.form.tlTaxOrganizationId,
          tlAreaTaxOrganizationId: this.rowData ? this.rowData.tlAreaTaxOrganizationId : undefined,
          statusCd: this.form.switch ? 'N' : 'U'
        };
        // 调取接口
        /**
         * TODO:
         * 调用保存接口。保存相关信息,
         * 因为新增和编辑的逻辑不同，可能需要调不同的接口
         */
        console.log(data);
        if (!this.editFlag) {
          this.editUpdate(data);
        } else {
          this.insert(data);
        }
      });
    },
    isEdit() {
      if (!this.editFlag) {
        // 如果是编辑，修改下API接口
        this.url = accountApi.taxConfig.tax_loan_area_update;
        this.rowData.switch = this.rowData.statusCd === 'N';
        this.form = JSON.parse(JSON.stringify(this.rowData));
      }
    },
    regionChange(_values, _items) {
      this.outputs.values = _values;
      this.outputs.items = _items;
    },
    insert(_data) {
      console.log(this.url);
      this.$MyFetch.post(this.url, _data)
        .then((data = {}) => {
          this.confirmFn(data, 'success');
          this.$emit("clsoe_windowAlert");
          this.refer(1);
          // this.$confirm(data, {
          //   type: 'success'
          // }).then((_data) => {
          //   console.log(_data);
          // });
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    editUpdate(_data) {
      this.$MyFetch.post(this.url, _data)
        .then((data = {}) => {
          // TODO: 这里需要根据后端返回来的数据提示用户是否重复数据
          this.confirmFn("编辑成功", "success");
          this.refer(1);
          this.$emit("clsoe_windowAlert");
        })
        .catch(err => {
          this.$error(err.message);
        });
    }
  },
  mounted() {
    // this.regionOptions = this.regOption;
    this.isEdit();
    console.log(this.rowData);
  },
  components: {
    EleMultiCascader
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .drop_loan {
    .dialog-box {
      overflow: visible;
      width: 565px;
      box-sizing: border-box;
      min-height: 320px;
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
      // save button style
      .form__bottom {
        margin: 7px auto 0;
        text-align: center;
        .add {
          width: 200px;
        }
      }
      // 内容输入框整体样式
      .complete-product {
        .dialog-box__middle-form {
          width: 100%;
          min-height: 185px;
          padding: 0px;
          .dialog-box__form__group {
            padding-left: 30px;
            padding-top: 20px;
            min-height: 185px;
            // 下拉框样式
            .el-form-item {
              width: 232px;
              margin-right: 30px;
              margin-bottom: 20px;
            }
          }
        }
        .el-form-item.is-success {
          vertical-align: bottom;
        }
      }
      /deep/ .el-select__tags {
        max-height: 80px;
        overflow-y: scroll;
      }
      /deep/ input.el-el-input__inner {
        max-height: 80px;
      }
    }
  }
</style>
