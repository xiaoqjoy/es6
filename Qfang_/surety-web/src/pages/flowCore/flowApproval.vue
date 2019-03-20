<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="我的审批" name="first">
        <div class="first-form">
          <div class="form">
            <div class="form-item">
              <el-input class="width-180" placeholder="流程名称"></el-input>
              <el-input class="width-120" placeholder="发起开始日期"></el-input>
              <el-input class="width-120" placeholder="发起结束日期"></el-input>
              <el-select v-model="queryForm.org" placeholder="请选择" class="width-120">
                <el-option
                  v-for="item in orgLists"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-button class="query" type="success">查询</el-button>

              <flow-Table :tableData="tableData" @showAddFlow="showAddFlow"></flow-Table>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我已审批在办" name="second">
        <div class="form">
          <div class="form-item">
            <el-input class="width-180" placeholder="流程名称"></el-input>
            <el-input class="width-120" placeholder="发起开始日期"></el-input>
            <el-input class="width-120" placeholder="发起结束日期"></el-input>
            <el-select v-model="queryForm.org" placeholder="请选择" class="width-120">
              <el-option
                v-for="item in orgLists"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button class="query" type="success">查询</el-button>

            <flow-Table :tableData="tableData" @showAddFlow="showAddFlow"></flow-Table>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我已审批已办" name="third">
        <div class="form">
          <div class="form-item">
            <el-input class="width-180" placeholder="流程名称"></el-input>
            <el-input class="width-120" placeholder="发起开始日期"></el-input>
            <el-input class="width-120" placeholder="发起结束日期"></el-input>
            <el-select v-model="queryForm.org" placeholder="请选择" class="width-120">
              <el-option
                v-for="item in orgLists"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-button class="query" type="success">查询</el-button>

            <flow-Table :tableData="tableData" @showAddFlow="showAddFlow"></flow-Table>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <flow-Handle v-if="addFlowShow" :flowInfo="flowInfo" @hideAddFlow="hideAddFlow"></flow-Handle>
  </div>
</template>
<script>
import flowHandle from "./components/flowHandle";
import flowTable from "./components/flowTable";
export default {
  data() {
    return {
      addFlowShow: false,
      flowInfo: {},
      pageSize: 20,//页容量参数，默认20
      currentPage: 1,//当前页，默认1
      activeName: 'first', //标签页选项
      orgLists: [
        {
          label: "流程分组",
          value: "1"
        }
      ],
      queryForm: {
        org: "1",
        startDate: "",
        endDate: ""
      },
      tableData: [
        {
          id: "1",
          processName: "",//流程标题
          processGroupe: "", //流程分组
          code: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 100 弄",
          processStatus: 1 //流程状态
        },
        {
          id: "2",
          code: "2016-05-04",
          name: "王小虎2",
          address: "上海市普陀区金沙江路 200 弄",
          state: 2
        },
        {
          id: "3",
          code: "2016-05-01",
          name: "王小虎3",
          address: "上海市普陀区金沙江路 300 弄",
          state: 3
        },
        {
          id: "4",
          code: "2016-05-03",
          name: "王小虎4",
          address: "上海市普陀区金沙江路 400 弄",
          state: 4
        }
      ]
    };
  },
  components: {
    flowHandle,
    flowTable
  },
  methods: {
    showAddFlow(row) {
      this.flowInfo = row;
      this.addFlowShow = true;
    },
    hideAddFlow(v) {
      this.addFlowShow = v;
    },
    reset() {
      console.log(123);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang="less">
.el-tab-pane {
  min-width: 840px;
  .query {
    margin-left: 10px;
    width: 90px;
    height: 30px;
    background-color: #409eff;
    border: 0;
  }
  .query:hover {
    background-color: #77b6f5;
  }
}

.el-tabs {
  .el-table {
    margin-top: 20px;
  }
  .el-tabs__nav-wrap::after {
    background-color: #0958a5;
  }
  .el-tabs__item {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
  .el-tabs__item:hover {
    color: #0958a5;
  }
  .el-tabs__item.is-active {
    color: #fff;
    background-color: #0958a5;
  }
  .el-tabs__active-bar {
    display: none;
  }
}
</style>
