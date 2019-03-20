<template>
  <div class="intention-centent">
    <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="formInline.region" placeholder="默认团队">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-select v-model="formInline.region" placeholder="业务部门">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-select v-model="formInline.region" placeholder="客户经理">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-select v-model="formInline.region" placeholder="业务类别">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-select v-model="formInline.region" placeholder="接受状态">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-select v-model="formInline.region" placeholder="查征信状态">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-select v-model="formInline.region" placeholder="还款申请进度">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <div class="query-date">
        <el-form-item>
          <el-date-picker type="date" placeholder="创建开始日期"></el-date-picker>
          <el-date-picker type="date" placeholder="创建结束日期"></el-date-picker>
          <el-form-item>
            <el-input class="intertion-id" placeholder="单据号/物业/买卖双方/房产证号" width="450"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="info">清空</el-button>
          </el-form-item>
        </el-form-item>
        <el-form-item class="add-intention">
          <el-button type="success">新增意向单</el-button>
        </el-form-item>
      </div>
    </el-form>-->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first">
        <First-Table></First-Table>
      </el-tab-pane>
      <el-tab-pane label="跟单" name="second">
        <Second-Table>aa</Second-Table>
      </el-tab-pane>
      <el-tab-pane label="查征信" name="third">
        <Third-Table @showAddFlow="showAddFlow"></Third-Table>
      </el-tab-pane>
      <el-tab-pane label="还款申请" name="fourth">
        <Third-Table @showAddFlow="showAddFlow"></Third-Table>
      </el-tab-pane>
    </el-tabs>
    <Intention-Handle v-if="addFlowShow" :intentInfo="IntentInfo" @hideAddFlow="hideAddFlow"></Intention-Handle>
  </div>
</template>
<script>
import discount from "./components/discount";
import FirstTable from "./components/firstTable";
import SecondTable from "./components/secondTable";
import ThirdTable from "./components/thirdTable";
import IntentionHandle from "./components/IntentionHandle";
export default {
  data() {
    return {
      formInline: {
        user: '',
        region: ''
      },
      addFlowShow: false,
      IntentInfo: {},
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
        startDate: "2018-10-01",
        endDate: "2018-10-31"
      },

    };
  },
  components: {
    FirstTable,
    SecondTable,
    ThirdTable,
    IntentionHandle // 办理弹窗
  },
  methods: {
    showAddFlow(row) {
      this.IntentInfo = row;
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
}

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

.el-form {
  min-width: 840px;
  .el-select {
    width: 120px;
  }
  .query-date {
    .el-date-editor {
      width: 120px;
    }
    .intertion-id {
      width: 370px;
    }
    .add-intention {
      .el-button {
        width: 100px;
      }
    }
  }
}
</style>
