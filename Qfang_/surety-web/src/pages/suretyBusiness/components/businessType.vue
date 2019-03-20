<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      custom-class="add-flow"
      :visible.sync="dialogVisible"
      width="1000px"
      @close="close"
    >
      <el-tabs v-model="activeName" @click="handleClick">
        <el-tab-pane label="1.基本信息" name="first">
          <div class="flow-node">
            <div class="content">
              <div class="form">
                <el-form
                  :model="ruleForm"
                  :rules="rules"
                  ref="ruleForm"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="业务名称:" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="交易类额度赎楼"></el-input>
                  </el-form-item>
                  <el-form-item label="城市:" prop="region">
                    <el-select v-model="ruleForm.region" placeholder="万通融资集团">
                      <el-option
                        v-for="item in cityLists"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="交易类型:" prop="transaction">
                    <el-radio-group v-model="ruleForm.transaction">
                      <el-radio label="交易类"></el-radio>
                      <el-radio label="非交易类"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="资金分类:" prop="capital">
                    <el-radio-group v-model="ruleForm.capital">
                      <el-radio label="额度"></el-radio>
                      <el-radio label="现金"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="特殊业务:" prop="type">
                    <el-checkbox-group>
                      <el-checkbox label="自赎业务" name="type"></el-checkbox>
                      <el-checkbox label="需二次还款" name="type"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="监管要求:" prop="resource">
                    <el-checkbox-group>
                      <el-radio label="符合"></el-radio>
                    </el-checkbox-group>
                  </el-form-item>
                  <el-form-item label="状态:" prop="resource">
                    <el-radio-group v-model="ruleForm.resource">
                      <el-radio label="启用"></el-radio>
                      <el-radio label="禁用"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="2.费率设置" name="second">
          <div class="flow-node">
            <div class="content">
              <div class="form1">
                <el-form
                  :model="ruleForm"
                  :rules="rules"
                  ref="ruleForm"
                  label-width="120px"
                  class="demo-ruleForm"
                  :inline="true"
                >
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="最低应收费用:" prop="name">
                        <el-input v-model="ruleForm.name" class="width-170"></el-input>元
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="最低对外费率:" prop="name">
                        <el-input v-model="ruleForm.name" class="width-170"></el-input>%
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="最低实收费率:" prop="name">
                        <el-input v-model="ruleForm.name" class="width-170"></el-input>%
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="最低实收费用:" prop="name">
                        <el-input v-model="ruleForm.name" class="width-170"></el-input>元
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="逾期标准费率:" prop="name">
                        <span>新增</span>
                        <!-- <el-table
                          :data="tableData"
                          border
                          tooltip-effect="light"
                          style="width:100%;"
                        >
                          <el-table-column type="index" label=" " align="center" width="50"></el-table-column>
                          <el-table-column
                            prop="code"
                            label="最小天数"
                            align="center"
                            :show-overflow-tooltip="true"
                          ></el-table-column>
                          <el-table-column
                            prop="code"
                            label="费率%"
                            align="center"
                            :show-overflow-tooltip="true"
                          ></el-table-column>
                          <el-table-column
                            class-name="table-operate-btn"
                            label="操作"
                            width="120"
                            align="center"
                          ></el-table-column>
                        </el-table> -->
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="3.资料设置" name="third">
          <div class="flow-node">
            <div class="content">
              <div class="table">
                <el-table
                  ref="multipleTable"
                  :data="tableData3"
                  border
                  tooltip-effect="dark"
                  style="width: 100%"
                >
                  <el-table-column type="selection" width="55" label="选择"></el-table-column>
                  <el-table-column label="资料名称" width="780" align="center">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                  </el-table-column>
                  <el-table-column prop="name" label="份数" width="120" align="center">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.id"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="4.流程配置" name="fourth"></el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary">下一步</el-button>
        <el-button>取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      dialogTitle: "业务配置",
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData3: [{
        date: '2016-05-03',
        id: '1',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        id: '1',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        id: '1',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        id: '1',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        id: '1',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        id: '1',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        id: '1',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      cityLists: [
        {
          label: "万通融资集团",
          value: "1"
        },
        {
          label: "深圳万通",
          value: "2"
        },
        {
          label: "珠海万通",
          value: "3"
        },
        {
          label: "广州中安",
          value: "4"
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入业务名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请输入城市', trigger: 'change' }
        ],
        transaction: [
          { type: 'array', required: true, message: '请选择交易类型', trigger: 'change' }
        ],
        capital: [
          { required: true, message: '请选择交易类型', trigger: 'change' }
        ]
      }
    }
  },
  props: {
    businessTypeShow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dialogVisible: {
      get: function () {
        return this.businessTypeShow
      },
      set: function () { }
    },
  },
  methods: {
    close() {
      this.$emit("hideBusinessType", false)
    },
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped lang="less">
.content {
  position: relative;
  height: 400px;
  border: 1px solid #e5e5e5;
}
.el-tabs__item.is-active {
  background-color: #0958a5;
  color: #ffffff !important;
}
.form {
  width: 385px;
  height: 400px;
}
.form1 {
  width: 660px;
  height: 400px;
}
.table {
  margin: 20px auto;
}
</style>


