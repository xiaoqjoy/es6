<template>
    <div class="special_form-page">
      <el-form
        :model="formData"
        :rules="formRule"
        :ref="formName"
        label-width="100px"
        class="demo-form-inline" label-position="top" :disabled="isDetail">
        <el-form-item
          v-for="(item, index) in renderArr"
          v-if="!(item.fieldType === 'hidden')"
          :prop="item.orgItemCode"
          :key="index"
          :label="item.orgItemDesc"
          class="el-form-item__25" >
          <el-select
            :disabled="relativeFn(relativeData[item.orgItemCode], item.orgItemCode)"
            v-if="item.fieldType === 'select'"
            clearable
            v-model="formData[item.orgItemCode]"
            :placeholder="item.placeholder">
            <el-option
              v-for="(item, index) in library[item.orgItemCode]"
              :key="index"
              :label="item.itemDesc"
              :value="item.itemCode"
            ></el-option>
          </el-select>
          <el-input
            :disabled="relativeFn(relativeData[item.orgItemCode], item.orgItemCode)"
            v-if="item.fieldType === 'input'"
            v-model="formData[item.orgItemCode]"
            :placeholder="item.placeholder"></el-input>
          <el-date-picker
            v-if="item.fieldType === 'date'"
            v-model="formData[item.orgItemCode]"
            type="date"
            format="yyyy/MM/dd"
            value-format="yyyy-MM-dd"
            :disabled="relativeFn(relativeData[item.orgItemCode], item.orgItemCode)"
            placeholder="选择日期">
          </el-date-picker>
          <el-switch
            v-if="item.fieldType === 'switch'"
            v-model="formData[item.orgItemCode]"
            :width="50"
            active-text="是"
            inactive-text="否"
            :active-value="true"
            :inactive-value="false"
            :disabled="relativeFn(relativeData[item.orgItemCode], item.orgItemCode)"></el-switch>
          <el-select
            :editable="false"
            clearable
            multiple
            v-if="item.fieldType === 'multiSelect'"
            v-model="formData[item.orgItemCode]"
            :disabled="relativeFn(relativeData[item.orgItemCode], item.orgItemCode)"
            :placeholder="item.placeholder">
            <el-option
              v-for="(item, index) in library[item.orgItemCode]"
              :key="index"
              :label="item.itemDesc"
              :value="item.itemCode"></el-option>
          </el-select>
          <el-cascader
            clearable
            v-model="formData[item.orgItemCode + '_cascader']"
            v-if="item.fieldType === 'cascader' && library[item.orgItemCode]"
            :options="library[item.orgItemCode]"
            :props="cascaderConfig"
            @change="cascaderChange(item.orgItemCode)"
          ></el-cascader>
        </el-form-item>
      </el-form>
    </div>
</template>
<script type="text/ecmascript-6">
  export default{
    props: {
      isDetail: {
        type: Boolean,
        default: false
      },
      renderArr: {
        type: Array,
        default() {
          return [];
        }
      },
      formName: {
        type: String
      },
      // hasSubmit: {
      //   type: Boolean,
      //   default: false
      // },
      setValue: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    data() {
      return {
        formData: {}, // 内部使用
        formRule: {},
        library: {},
        relativeData: {},
        cascaderConfig: {
          value: "itemCode",
          label: "itemDesc"
        }
      };
    },
    created() {
      this.dellArr();
    },
    methods: {
      dellArr() {
        this.renderArr.forEach((v) => {
          // 设置各个表单值
          this.$set(this.formData, v.orgItemCode, v.defaultValue);
          // 设置表单规则
          // console.log(v);
          try {
            v.ruleJson = typeof v.ruleJson === "string" ? JSON.parse(v.ruleJson) : v.ruleJson;
          } catch (e) {
            console.log(v.ruleJson);
          }
          this.$set(this.formRule, v.orgItemCode, v.ruleJson['rules']);
          if (v.ruleJson.funs.length > 0) {
            // eslint-disable-next-line
            v.ruleJson.funs.forEach(k => {
              let obj = {};
              // 需要改变this的指向
              // eslint-disable-next-line
              let validator = new Function('rule', 'value', 'callback', k.fun);
              obj.validator = validator.bind(this);
              obj.trigger = k.trigger;
              this.formRule[v.orgItemCode].push(obj);
            });
          }
          // 获取下拉项码值
          if (v.fieldType === 'select' || v.fieldType === 'multiSelect') {
            // let code = this.toLowerLine(v.orgItemCode);
            this.$getDictCode(v.orgItemCode, {getAll: this.isDetail})
              .then(data => {
                this.$set(this.library, v.orgItemCode, data);
              });
          }
          // 级联
          // 后端给的数据只给级联最后一位且为字符串
          // 但这里组件需要数据为数组并且是各位的数据都要
          // 这里用一个v.orgItemCode + '_cascader'代替原字段绑定到页面
          // 但用户选择时更新新 v.orgItemCode字段值
          // 回显时 有v.orgItemCode 计算出 v.orgItemCode + '_cascader' 字段值
          if (v.fieldType === 'cascader') {
            // 设置规则
            this.$set(this.formRule, v.orgItemCode + '_cascader', this.formRule[v.orgItemCode]);
            this.$set(this.formData, v.orgItemCode + '_cascader', []);
            this.$getDictCode(v.orgItemCode, {getAll: this.isDetail})
              .then(data => {
                this.$set(this.library, v.orgItemCode, data);
                if (this.setValue[v.orgItemCode]) {
                  this.formData[v.orgItemCode + '_cascader'] = this.getAllCode(this.setValue[v.orgItemCode], data);
                }
              });
          }
          // 设置控制 a字段选某些值 其他字段禁用的情况
          this.$set(this.relativeData, v.orgItemCode, JSON.parse(v.controlJson));
        });
        this.formData = Object.assign(this.formData, this.setValue);
      },
      toLowerLine(str) {
        let tem = str.replace(/[A-Z]/g, (match) => {
          return '_' + match.toLowerCase();
        });
        if (tem.slice(0, 1) === '_') {
          tem = tem.slice(1);
        }
        return tem;
      },
      validate(callback) {
        let hasPass = false;
        this.$refs[this.formName].validate((valid) => {
          if (valid) {
            hasPass = true;
          }
        });
        callback(hasPass);
      },
      relativeFn(arr = [], selfCode) {
        let isDisabled = false;
        arr.forEach(v => {
          v.disabledArr.forEach(k => {
            if (this.formData[v.relativeCode] === k) {
              isDisabled = true;
              this.formData[selfCode] = null;
            }
          });
        });
        return isDisabled;
      },
      cascaderChange(code) {
        if (this.formData[code + '_cascader'].length > 0) {
          this.formData[code] = this.formData[code + '_cascader'][this.formData[code + '_cascader'].length - 1];
        } else {
          this.formData[code] = '';
        }
      },
      // 根据最后一位编码 区级联数组
      getAllCode(code, library) {
        let arr = [];
        let hasFind = false;
        let findFn = function(code, data) {
          if (hasFind) return;
          arr.push(data.itemCode);
          if (code === data.itemCode) {
            hasFind = true;
          } else if (!data.children) {
            arr.splice(arr.length - 1, 1);
          } else {
            data.children.forEach((v, index) => {
              findFn(code, v);
              if (index === (data.children.length - 1) && !hasFind) {
                arr.splice(arr.length - 1, 1);
              }
            });
          }
        };
        library.forEach(v => {
          if (hasFind) return;
          findFn(code, v);
        });
        return arr;
      }
    },
    components: {}
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .special_form-page{
    font-size: 0;
    // margin-right: -40px;
    .el-form-item__25{
      font-size: 14px;
    }
  }
</style>
