<template>
  <div>
    <div class="query-form">
      <div class="form">
        <div class="form-item">
          <el-select v-model="queryForm.org" placeholder="请选择" class="width-80">
            <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="queryForm.org" placeholder="请选择" class="width-90">
            <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="queryForm.org" placeholder="请选择" class="width-90">
            <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="queryForm.org" placeholder="请选择" class="width-80">
            <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="queryForm.org" placeholder="请选择" class="width-80">
            <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="queryForm.arr" multiple placeholder="请选择" class="width-80">
            <el-option-group v-for="group in options3" :key="group.label" :label="group.label">
              <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-option-group>
          </el-select>
          <el-select v-model="queryForm.org" placeholder="请选择" class="width-90">
            <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="queryForm.org" placeholder="请选择" class="width-90">
            <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="queryForm.org" placeholder="请选择" class="width-130">
            <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="form-item">
          <el-select v-model="queryForm.org" placeholder="请选择" class="width-80">
            <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="queryForm.org" placeholder="请选择" class="width-90">
            <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="queryForm.org" placeholder="请选择" class="width-90">
            <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="queryForm.org" placeholder="请选择" class="width-80">
            <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker class="date" v-model="queryForm.startDate" type="date" :clearable="false" placeholder="请选择">
          </el-date-picker>
          <el-date-picker class="date" v-model="queryForm.endDate" type="date" :clearable="false" placeholder="请选择">
          </el-date-picker>
          <el-input v-model="queryForm.name" class="width-190" placeholder="单据号/物业/买卖双方/房产证号"></el-input>
          <el-button type="primary">查询</el-button>
          <el-button>清空</el-button>
          <span class="shrink" @click="shrink=!shrink">&nbsp;&nbsp;高级 <i class="el-icon-arrow-down" :class="{'shrink-rotate':shrink}"></i></span>
          <el-button type="success" @click='applyForm' class="rf">+ 报单</el-button>
        </div>
      </div>
      <transition name="fade" mode="out-in" appear>
        <div class="form-shrink" v-show="shrink">
          <div class="form-item">
            <el-select v-model="queryForm.org" placeholder="请选择" class="width-80">
              <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="queryForm.org" placeholder="请选择" class="width-90">
              <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="queryForm.org" placeholder="请选择" class="width-90">
              <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="queryForm.org" placeholder="请选择" class="width-80">
              <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="queryForm.org" placeholder="请选择" class="width-80">
              <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="queryForm.org" placeholder="请选择" class="width-280">
              <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="form-item">
            <el-select v-model="queryForm.org" placeholder="请选择" class="width-80">
              <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="queryForm.org" placeholder="请选择" class="width-90">
              <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="queryForm.org" placeholder="请选择" class="width-90">
              <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="queryForm.org" placeholder="请选择" class="width-80">
              <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="queryForm.org" placeholder="请选择" class="width-80">
              <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-date-picker class="date" v-model="queryForm.startDate" type="date" :clearable="false" placeholder="请选择">
            </el-date-picker>
            <el-date-picker class="date" v-model="queryForm.endDate" type="date" :clearable="false" placeholder="请选择">
            </el-date-picker>
            <el-select v-model="queryForm.org" placeholder="请选择" class="width-80">
              <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </transition>

    </div>
    <el-table :data="tableData" border row-key="id" :highlight-current-row="true" tooltip-effect="light" style="width:100%;">
      <el-table-column prop="code" label="编号" align="center" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="code" label="业务类型" align="center">
      </el-table-column>
      <el-table-column prop="name" label="房产证名称" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="卖方" align="center" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="code" label="买方" align="center">
      </el-table-column>
      <el-table-column prop="code" label="担保金额" align="center">
      </el-table-column>
      <el-table-column prop="code" label="实收担保费" align="center">
      </el-table-column>
      <el-table-column prop="code" label="当前节点" align="center">
      </el-table-column>
      <el-table-column prop="code" label="已办节点" align="center">
      </el-table-column>
      <el-table-column prop="code" label="收费情况" align="center">
      </el-table-column>
      <el-table-column prop="code" label="出赎楼银行" align="center">
      </el-table-column>
      <el-table-column prop="code" label="客户经理" align="center">
      </el-table-column>
      <el-table-column prop="code" label="房产证号" align="center">
      </el-table-column>
      <el-table-column prop="code" label="操作天数" align="center">
      </el-table-column>
      <el-table-column prop="code" label="差异" align="center">
      </el-table-column>
      <el-table-column prop="code" label="汇款逾期" align="center">
      </el-table-column>
      <el-table-column prop="code" label="来源" align="center">
      </el-table-column>
      <el-table-column prop="code" label="中介公司" align="center">
      </el-table-column>
      <el-table-column prop="code" label="接收日期" align="center">
      </el-table-column>
      <el-table-column label="操作" width="120" align="center" fixed="right">
        <template slot-scope="scope">
          <div class="table-right-btn">
            <span v-show="scope.row.state==1">编辑</span>
            <span v-show="scope.row.state==2">撤</span>
            <span v-show="scope.row.state==3">驳</span>
            <span v-show="scope.row.state==4">录入</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default {
    
    data() {
      return {
         options3: [{
          label: '热门城市',
          options: [{
            value: 'Shanghai',
            label: '上海'
          }, {
            value: 'Beijing',
            label: '北京'
          }]
        }, {
          label: '城市名',
          options: [{
            value: 'Chengdu',
            label: '成都'
          }, {
            value: 'Shenzhen',
            label: '深圳深圳深圳深圳深圳深圳深圳深圳深圳深圳'
          }, {
            value: 'Guangzhou',
            label: '广州'
          }, {
            value: 'Dalian',
            label: '大连'
          }]
        }],
        checked: '',
        orgLists: [{
          label: '深圳万通',
          value: '1',
        }, {
          label: '珠海万通',
          value: '2',
        }, {
          label: '中山万通',
          value: '3',
        }],
        queryForm: {
          org: '1',
          startDate: '',
          endDate: '',
          arr: []
        },
        shrink: false,
        suretyNav: [{
          value: 1,
          label: '额度',
          child: [{
            value: '1',
            label: '交易额度赎楼'
          }, {
            value: ',',
            label: '非交易现金赎楼'
          }]
        }, {
          value: 1,
          label: '额度',
          child: [{
            value: '1',
            label: '交易额度赎楼'
          }, {
            value: ',',
            label: '非交易现金赎楼'
          }]
        }],
        tableData: [{
            id: '1',
            code: '2016-05-02',
            name: '王小虎1',
            address: '上海市普陀区金沙江路 100 弄',
            state: 1,
          },
          {
            id: '2',
            code: '2016-05-04',
            name: '王小虎2',
            address: '上海市普陀区金沙江路 200 弄',
            state: 2,
          },
          {
            id: '3',
            code: '2016-05-01',
            name: '王小虎3',
            address: '上海市普陀区金沙江路 300 弄',
            state: 3,
          },
          {
            id: '4',
            code: '2016-05-03',
            name: '王小虎4',
            address: '上海市普陀区金沙江路 400 弄',
            state: 4,
          }
        ]
      }
    },
    components: {},
    created() {},
    methods: {
      applyForm() {
        var newWindow = window.open('#/applyForm', '_blank',
          'toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no')
        //对弹出窗口进行操作
        newWindow.moveTo(-3, -3);
        newWindow.resizeTo(screen.availWidth + 10, screen.availHeight + 10);
        newWindow.focus();
        window.close();
      }
    }
  }

</script>
<style scoped lang="less">
  .query-form {
    min-width: 1016px;
    font-size: 12px;
    color: #333;
  }

  .form {
    .date {
      width: 80px !important;
    }
  }

  .form-item {
    font-size: 0px;
    margin-bottom: 10px;

    .el-select,
    .el-input,
    .date {
      margin-right: 10px;
    }

    .el-button {
      padding: 7px 15px;
    }

    .shrink {
      font-size: 12px;
      color: #333;
      margin-right: 10px;
      cursor: pointer;
    }
  }

  .form-shrink {
    .date {
      width: 90px;
    }
  }

  .el-icon-arrow-down {
    color: #333;
    transition: transform 0.2s linear 0s;
  }

  .shrink-rotate {
    transform: rotate(-180deg);
    transition: transform 0.2s linear 0s;
  }

  .select-checkbox {
    display: inline-block;
    margin-right: 10px;
  }

</style>
