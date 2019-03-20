<template>
  <div class="parameter">
    <div class="parameterScope">
      <el-table :data="tableData" class="eltable">
        <el-table-column fixed prop="name" align="center" label="时间段">
        </el-table-column>
        <el-table-column prop="scope" align="center" label="正常范围（mmol/L）">
        </el-table-column>
        <el-table-column label="操作" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog width="350px" title="血糖正常范围编辑" :visible.sync="dialogFormVisible" @close="cancelSuger('form')" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form :model="form" label-position="left" :rules="rules" ref="form" class="demo-ruleForm">
        <el-form-item :label="'时段：'+time" :label-width="formLabelWidth">
        </el-form-item>
        <el-form-item label="正常范围最小值" :label-width="formLabelWidth" prop="minV">
          <el-input v-model="form.minV" style="width:50%" auto-complete="off"></el-input> &nbsp;mmol/L
        </el-form-item>
        <el-form-item label="正常范围最大值" :label-width="formLabelWidth" prop="maxV">
          <el-input v-model="form.maxV" style="width:50%" auto-complete="off"></el-input> &nbsp;mmol/L
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelSuger('form')">取 消</el-button>
        <el-button type="primary" :disabled="saveSu" @click="subSuger('form')">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: '',
    data() {
      //输入为空格
      var valiminV = (rule, value, callback) => {
        if (value.toString().replace(/(^\s*)|(\s*$)/g, "") === '') {
          callback(new Error('请输入正常范围最小值(0.1~10.0)'));
        } else if (!(/^(?:0|[1-9]\d{0,2})(\.\d)?$/).test(value)) {
          callback(new Error('请输入正常范围最小值(0.1~10.0)'));
        } else if (value <= 0 || value > 10) {
          callback(new Error('请输入正常范围最小值(0.1~10.0)'));
        } else {
          callback();
        }
      };
      var valimaxV = (rule, value, callback) => {
        if (value.toString().replace(/(^\s*)|(\s*$)/g, "") === '') {
          callback(new Error('请输入正常范围最大值(3.0~20.0)'));
        } else if (!(/^(?:0|[1-9]\d{0,2})(\.\d)?$/).test(value)) {
          callback(new Error('请输入正常范围最小值(3.0~20.0)'));
        } else if (value <= 2.9 || value > 20) {
          callback(new Error('请输入正常范围最小值(3.0~20.0)'));
        } else if (value <= this.form.minV) {
          callback(new Error('正常范围最大值不可小于等于最小值!'));
        } else {
          callback();
        }
      };
      return {
        saveSu: false,
        dialogFormVisible: false,
        tableData: [],
        dictionaryId: '',
        form: {
          minV: '',
          maxV: ''
        },
        time: '',
        rules: {
          minV: [{
              required: true,
              message: '请输入正常范围最小值(0.1~10.0)',
              trigger: 'blur'
            },
            {
              validator: valiminV,
              trigger: 'blur'
            }
          ],
          maxV: [{
              required: true,
              message: '请输入正常范围最大值(3.0~20.0)',
              trigger: 'blur'
            },
            {
              validator: valimaxV,
              trigger: 'blur'
            }
          ]
        },
        formLabelWidth: '130px'
      }
    },
    methods: {
      //血糖数据
      sugerScop() {
        this.$api.sugarQueryList({}, res => {
          if (res.data.code == 0) {
            this.tableData = res.data.data
            for (let i = 0; i < this.tableData.length; i++) {
              if (Number.isInteger(res.data.data[i].minValue)) {
                this.tableData[i].minValue = res.data.data[i].minValue + '.0'
              } else {
                this.tableData[i].minValue = res.data.data[i].minValue
              }
              if (Number.isInteger(res.data.data[i].maxValue)) {
                this.tableData[i].maxValue = res.data.data[i].maxValue + '.0'
              } else {
                this.tableData[i].maxValue = res.data.data[i].maxValue
              }
              this.tableData[i].scope = this.tableData[i].minValue + '~' + this.tableData[i].maxValue
            }
          }
        })
      },
      //编辑
      handleClick(row) {
        this.dialogFormVisible = true
        this.form.minV = row.minValue
        this.form.maxV = row.maxValue
        this.dictionaryId = row.dictionaryId
        this.time = row.name
      },
      //取消
      cancelSuger(formName) {
        this.saveSu = false
        this.dialogFormVisible = false
        this.$refs[formName].resetFields();
        this.form.minV = ''
        this.form.maxV = ''
      },
      //提交
      subSuger(formName) {
        this.saveSu = true
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
              dictionaryId: this.dictionaryId,
              minValue: Number(this.form.minV),
              maxValue: Number(this.form.maxV)
            }
            this.openLoading();
            this.$api.editSugerScope(data, re => {
              this.saveSu = false
              if (re.data.code == 0) {
                this.dialogFormVisible = false
                this.sugerScop()
              }
              this.closeLoading();
            }, res => {
              this.$message(res.data.errMsg)
              this.closeLoading();
            })
          } else {
            this.saveSu = false
          }
        })
      }
    },
    created() {
      this.sugerScop()
    }
  }
</script>
<style scoped>
  .eltable{
    width: 100%;
    border-left:1px solid rgb(235,238,245);
    border-right: 1px solid  rgb(235,238,245);
    border-top:1px solid rgb(235,238,245);
  }
  .parameterScope {
    margin: 30px 20px 20px;
    font-size: 14px;
  }
</style>
