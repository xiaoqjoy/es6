<template>
  <el-dialog title="业务参数" :visible.sync='visible' :close-on-click-modal="false" width="680px">
    <section class="add-dialog-section">
      <div class="dialog-box">
        <div class="dialog-body">
          <el-form size="mini" :model="addForm" :rules="addFormRule" ref="addForm" label-position="right">
            <el-row>
              <el-col :offset="2" :span="6">
                <div class="div-jusity">
                  <span>参数编码</span>：</div>
              </el-col>
              <el-col :span="14">
                <el-form-item>
                  <el-input disabled v-model="addForm.code" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="2" :span="6">
                <div class="div-jusity">
                  <span>参数类型</span>：</div>
              </el-col>
              <el-col :span="14">
                <el-form-item prop="codeType">
                  <el-select :disabled="type=='EDIT'" v-model="addForm.codeType" placeholder="请选择参数类型">
                    <el-option v-for="(v, k) in baseData" :key="k" :label="v.type" :value="v.type">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="2" :span="6">
                <div class="div-jusity">
                  <span>参数名称</span>：</div>
              </el-col>
              <el-col :span="14">
                <el-form-item prop="codeName">
                  <el-select :disabled="!addForm.codeType||type=='EDIT'" v-model="addForm.codeName" placeholder="请选择参数名称">
                    <el-option v-for="(v, k) in codeNameList" :key="k" :label="v.name" :value="v.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="cityList.length">
              <el-col :offset="2" :span="6">
                <div class="div-jusity">
                  <span>应用城市</span>：</div>
              </el-col>
              <el-col :span="16">
                <el-form-item>
                  <el-checkbox-group v-model="addForm.orgIds">
                    <el-checkbox v-for="(v, k) in cityList" :disabled="v.select==='BAN'" :checked="v.select==='SELECTED'||v.select==='BAN'" :label="v.orgId" :key="k">{{v.orgName}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="2" :span="6">
                <div class="div-jusity">
                  <span>参数状态</span>：</div>
              </el-col>
              <el-col :span="14">
                <el-form-item>
                  <el-radio-group v-model="addForm.status">
                    <el-radio label="ENABLED">开启</el-radio>
                    <el-radio label="DISABLED">关闭</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-for="(v, k) in metaList" :key="k">
              <el-col :offset="2" :span="6">
                <div class="div-jusity">
                  <span>{{v.title}}</span>：</div>
              </el-col>
              <el-col :span="14">
                <el-form-item>
                  <slot v-if="addForm.code === 'C003001' && addForm.codeType ==='出房参数'">
                    <el-input-number v-model="createdForm[v.type]" :precision="1" :step="0.1" :min="0" :max="1" controls-position="right">
                    </el-input-number>
                  </slot>
                  <slot v-else>
                    <el-input :placeholder="'请填写'+v.title" v-model="createdForm[v.type]" />
                  </slot>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="2" :span="6">
                <div class="div-jusity">
                  <span>备注</span>：</div>
              </el-col>
              <el-col :span="14">
                <el-form-item>
                  <el-input type="textarea" disabled v-model="addForm.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <div class="dialog-footer">
        <el-button type="primary" size="mini" :loading="saveLoading" @click="saveForm">保存</el-button>
        <el-button size="mini" @click="visible=false">取消</el-button>
      </div>
    </section>
  </el-dialog>
</template>
<script>
export default {
  name: 'AddBusinessParams',
  data() {
    return {
      // 表单校验规则
      addFormRule: {
        codeType: [{ required: true, message: '请选择参数类型', trigger: 'change' }],
        codeName: [{ required: true, message: '请选择参数名称', trigger: 'change' }]
      },
      saveLoading: false,
      // 新增表单
      addForm: {
        code: '', // 参数编码
        codeName: '',
        codeType: '',
        orgIds: [],
        status: 'ENABLED',
        value: '',
        remark: ''
      },
      // 动态生成的表单
      createdForm: {},
      cityList: [],
      editMetaList: {}
    };
  },
  props: {
    value: Boolean,
    // 'ADD'or'EDIT'
    type: {
      type: String,
      default: 'ADD'
    },
    id: String,
    baseData: Array
  },
  computed: {
    visible: {
      set(val) {
        this.$emit('input', val);
      },
      get() {
        return this.value;
      }
    },
    // 参数名称
    codeNameList() {
      let findObj = this.baseData.find(e => {
        return this.addForm.codeType === e.type;
      });
      return findObj ? findObj.configs || [] : [];
    },
    // 动态参数
    metaList() {
      this.createdForm = {};
      let findObj = this.codeNameList.find(e => {
        return e.name === this.addForm.codeName;
      });
      let meta = findObj ? findObj.meta || [] : [];
      let newList = [];
      meta.forEach(e => {
        // this.createdForm[e] = this.editMetaList[e] || 0;
        let key = Object.keys(e)[0];
        // console.log(key);
        newList.push({
          type: key,
          title: e[key]
        });
        this.$set(this.createdForm, key, this.editMetaList[key] || '');
      });
      return newList;
    }
  },
  watch: {
    value(val) {
      if (val && this.type === 'EDIT') {
        this.getBusinessInfo();
      }
      if (!val) {
        this.clearData();
      }
    },
    'addForm.codeType'(val) {
      if (this.type === 'ADD') {
        this.addForm.codeName = '';
      }
    },
    'addForm.codeName'(val) {
      if (this.type === 'ADD') {
        if (val) {
          let findObj = this.codeNameList.find(e => {
            return e.name === val;
          });
          this.addForm.remark = findObj ? findObj.remark || '' : '';
          this.addForm.code = findObj ? findObj.code || '' : '';
          this.addForm.orgIds = [];
          this.getCityData();
        } else {
          this.addForm.remark = '';
          this.addForm.code = '';
          this.addForm.orgIds = [];
          this.cityList = [];
        }
      }
    }
  },
  created() {
    // this.getBaseData();
  },
  methods: {
    // 获取基础数据
    // getBaseData() {
    //   this.$axios.get('/security/oms/systemConfig/queryMeta').then(({ data }) => {
    //     if (data.status === 'C0000') {
    //       this.baseData = data.result;
    //     } else {
    //       this.baseData = [];
    //       this.$message.error(data.message);
    //     }
    //   });
    // },
    // 获取城市数据
    getCityData() {
      this.cityList = [];
      this.$axios.get('/security/oms/systemConfig/queryAllOrg', {
        params: {
          code: this.addForm.code
        }
      }).then(({ data }) => {
        if (data.status === 'C0000') {
          this.cityList = data.result;
        } else {
          this.cityList = [];
          this.$message.error(data.message);
        }
      });
    },
    // 清空数据
    clearData() {
      this.$refs.addForm.resetFields();
      this.cityList = [];
      this.createdForm = {};
      this.addForm = {
        code: '',
        codeName: '',
        codeType: '',
        orgIds: [],
        status: 'ENABLED',
        value: '',
        remark: ''
      };
    },
    // 保存
    saveForm() {
      this.$refs.addForm.validate((valid) => {
        if (valid) {
          this.submitForm((status) => {
            if (status) {
              this.visible = false;
              this.$emit('refreshData');
            }
          });
        }
      });
    },
    // 提交表单
    submitForm(cb) {
      let orgIds = [];
      orgIds = this.addForm.orgIds.filter(e => {
        return !!this.cityList.find(v => {
          return v.orgId === e && v.select !== 'BAN';
        });
      });
      if (!orgIds.length) {
        this.$message.error('请至少选择一个应用城市');
        return;
      }
      if (this.saveLoading) return;
      this.saveLoading = true;
      let status = false;
      let url = '/security/oms/systemConfig/addConfig';
      let id;
      if (this.type === 'EDIT') {
        url = '/security/oms/systemConfig/editConfig';
        id = this.id;
      }
      // 把number 转为 string ，否接口不支持
      if (this.addForm.code === 'C003001' && this.addForm.codeType === '出房参数') {
        Object.keys(this.createdForm).forEach(e => {
          this.createdForm[e] = this.createdForm[e] + '';
        });
      }
      this.$axios.post(url, {
        code: this.addForm.code,
        orgIds: orgIds,
        value: JSON.stringify(this.createdForm),
        id: id,
        status: this.addForm.status
      }).then(res => {
        this.saveLoading = false;
        if (res.data.status === 'C0000') {
          status = true;
          this.$message.success('保存成功');
        } else {
          this.$message.error(res.data.message);
        }
        cb && cb(status);
      }).catch(err => {
        this.saveLoading = false;
        this.$message.error(err.message || '保存失败');
        cb && cb(status);
      });
    },
    // 编辑时获取业务参数信息
    getBusinessInfo() {
      this.$axios.get('/security/oms/systemConfig/selectEditingSystemConfigById', {
        params: {
          id: this.id
        }
      }).then(({ data }) => {
        if (data.status === 'C0000') {
          let result = data.result;
          this.cityList = result.allOrgList;
          this.addForm.code = result.code;
          this.addForm.codeName = result.codeName;
          this.addForm.codeType = result.codeType;
          this.addForm.status = result.status;
          this.addForm.remark = result.codeRemark;
          try {
            this.editMetaList = JSON.parse(result.value);
          } catch (error) {
            this.editMetaList = {};
          }
        } else {
          this.$message.error(data.message);
        }
      });
    }
  }
};
</script>
<style lang="scss">
.add-dialog-section {
  .dialog-box {
    background: #eee;
  }
  .dialog-header {
    padding: 20px;
    background: #fff;
    line-height: 18px;
    .c-red {
      i {
        margin-right: 10px;
      }
    }
  }
  .dialog-body {
    margin: 10px;
    background: #fff;
    padding: 20px 0;
  }
  .div-jusity {
    display: flex;
    align-items: center;
    height: 30px;
    font-size: 12px;
    justify-content: flex-end;
    // span {
    //   // width: 50px;
    //   // text-align: justify;
    //   // text-align-last: justify;
    // }
  }
  .el-input__inner {
    padding-right: 25px;
  }
  .el-checkbox {
    margin-left: 0;
    min-width: 70px;
    padding-right: 10px;
  }
  .el-radio__label {
    font-size: 12px;
  }
  .el-checkbox__label {
    width: auto;
    font-size: 12px;
  }
}
</style>

