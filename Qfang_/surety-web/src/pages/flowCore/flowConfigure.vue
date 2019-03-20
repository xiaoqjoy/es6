<template>
  <div>
    <div class="query-form">
      <div class="form">
        <div class="form-item">
          <el-select v-model="queryForm.orgId" placeholder="请选择" class="width-120">
            <el-option v-for="item in orgs" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-input v-model="queryForm.name" class="width-120" placeholder="流程名称"></el-input>
          <el-select v-model="queryForm.processGroupe" placeholder="请选择" class="width-120">
            <el-option
              v-for="item in groups"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="queryForm.status" placeholder="请选择" class="width-120">
            <el-option
              v-for="item in states"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button type="primary" @click="processPage">查询</el-button>
          <el-button @click="reset">清空</el-button>
          <el-button type="success" class="rf" @click="showEditFlow({operateType:'add'})">+ 新建流程</el-button>
        </div>
      </div>
    </div>
    <el-table :data="tableData.itemList" border tooltip-effect="light" :max-height="tableHeight">
      <el-table-column type="index" label=" " align="center" width="50"></el-table-column>
      <el-table-column prop="name" label="流程名称" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="code" label="分组" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="nodeCount" label="节点数" align="center"></el-table-column>
      <el-table-column prop="name" label="应用状态" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="code" label="创建人" align="center"></el-table-column>
      <el-table-column class-name="table-operate-btn" label="操作" width="120" align="center">
        <template slot-scope="scope">
          <span @click="showEditFlow(scope.row)">修改</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="surety-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 30, 50,100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.recordCount"
    ></el-pagination>
    <flow-nodes v-if="addFlowShow" :flowInfo="flowInfo" @hideAddFlow="hideAddFlow"></flow-nodes>
  </div>
</template>
<script>
import flowNodes from "./components/flowNodes";
export default {
  data() {
    return {
      tableHeight: window.innerHeight - 180,
      addFlowShow: false,
      flowInfo: {},
      orgs: [],
      groups: [],
      states: [
        {
          label: "启用",
          value: "ENABLED"
        },
        {
          label: "禁用",
          value: "DISABLED"
        }
      ],
      queryForm: {},
      tableData: [],
      currentPage: 1,
      pageSize: 20
    };
  },
  components: {
    flowNodes
  },
  created() {
    this.processPage();
    this.queryOrgTreeByPosition();
  },
  methods: {
    processPage() {
      var queryForm = JSON.parse(JSON.stringify(this.queryForm));
      queryForm.currentPage = this.currentPage;
      queryForm.pageSize = this.pageSize;
      this.$interface.processPage(queryForm, res => {
        this.tableData = res.data.result;
      });
    },
    showEditFlow(row) {
      this.flowInfo = row;
      this.addFlowShow = true;
    },
    hideAddFlow(v) {
      this.addFlowShow = v;
      this.processPage();
    },
    reset() {
      for (var key in this.queryForm) {
        this.queryForm[key] = "";
      }
    },
    queryOrgTreeByPosition() {
      this.$interface.queryOrgTreeByPosition(
        {
          positionLinkId: this.$store.state.userInfo.positionLinkId,
          orgTypes: "CITY"
        },
        res => {
          var org = res.data.result;
          var orgs = org.concat(org[0].children);
          orgs.forEach(function(item) {
            item.children = [];
          });
          this.orgs = orgs;
        }
      );
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.processPage();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.processPage();
    }
  }
};
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
}
</style>
