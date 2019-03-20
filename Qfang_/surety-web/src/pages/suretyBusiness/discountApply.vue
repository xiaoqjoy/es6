<template>
  <div>
    <div class="query-form">
      <div class="form">
        <div class="form-item">
          <el-select v-model="queryForm.org" placeholder="请选择" class="width-120">
            <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="queryForm.org" placeholder="请选择" class="width-120">
            <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="queryForm.org" placeholder="请选择" class="width-120">
            <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="queryForm.org" placeholder="请选择" class="width-120">
            <el-option v-for="item in orgLists" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <span class="font-size-12">申请日期：</span>
          <el-date-picker class="date" v-model="queryForm.startDate" type="date" :clearable="false" placeholder="请选择">
          </el-date-picker>
          <el-date-picker class="date" v-model="queryForm.endDate" type="date" :clearable="false" placeholder="请选择">
          </el-date-picker>
        </div>
        <div class="form-item">
          <el-input v-model="queryForm.name" class="width-380" placeholder="打折申请单号/担保单号/物业/买卖双方"></el-input>
          <el-button type="primary">查询</el-button>
          <el-button>清空</el-button>
        </div>
      </div>
    </div>
    <el-table :data="tableData" border tooltip-effect="light" style="width:100%;">
      <el-table-column type="index" label=" " align="center" width="50">
      </el-table-column>
      <el-table-column prop="code" label="申请号" align="center" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="code" label="业务编号" align="center" :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column prop="code" label="担保金额" align="center">
      </el-table-column>
      <el-table-column prop="name" label="申请人" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="审批进度" align="center">
        <template slot-scope="scope">
          <div class="approval">
            <span class="approval-adopt">{{scope.row.name}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="担保天数" align="center">
      </el-table-column>
      <el-table-column prop="code" label="申请折扣" align="center">
        <template slot-scope="scope">
          <span class="apply">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="应收担保费" align="center">
      </el-table-column>
      <el-table-column prop="code" label="实收担保费" align="center">
      </el-table-column>
      <el-table-column prop="code" label="买方姓名" align="center">
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <div class="table-right-btn">
            <span v-show="scope.row.state==1">撤销</span>
            <span v-show="scope.row.state==2" @click="seeDiscount">查看</span>
            <span>重新发布</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <discount :discount="discount" @hideDiscount="showDiscount"></discount>
  </div>
</template>
<script>
import discount from "./components/discount";
  export default {
    data() {
      return {
        discount: false,
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
          endDate: ''
        },
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
    components: {
      discount
    },
    created() {},
    methods: {
      seeDiscount(){
        console.log(11)
        this.discount = true;
      },
      showDiscount(v){
        console.log(v)
        this.discount = v;
      }
    }
  }

</script>
<style scoped lang="less">
  .font-size-12 {
    font-size: 12px;
  }

  .query-form {
    min-width: 840px;
    font-size: 12px;
    color: #333;
  }

  .form {
    .date {
      width: 120px !important;
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
  }

  .width-380 {
    width: 380px;
  }

  .approval {
    font-weight: bold;

    .approval-adopt {
      color: #01b286;
    }

    .approval-no-adopt {
      color: #b2241b;
    }
  }

  .apply {
    color: #d28300;
  }

</style>
