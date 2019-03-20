<template>
  <div>
    <div class="query-form">
      <div class="form">
        <div class="form-item">
          <el-select
            v-model="queryForm.orgId"
            placeholder="城市组织"
            class="width-120"
            @change="orgChange"
          >
            <el-option v-for="item in orgs" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-input v-model="queryForm.name" class="width-120" placeholder="节点名称"></el-input>
          <el-select v-model="queryForm.org" placeholder="节点类型" class="width-120">
            <el-option
              v-for="item in orgs"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button type="primary" @click="nodeTemplate">查询</el-button>
          <el-button>清空</el-button>
          <el-button type="success" class="rf" @click="addNode">+ 新增节点</el-button>
        </div>
        <div class="line"></div>
      </div>
    </div>
    <el-table
      :data="tableData.itemList"
      border
      tooltip-effect="light"
      style="width:100%;"
      :max-height="tableHeight"
    >
      <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
      <el-table-column prop="name" label="节点名称" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="type" label="类型" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="code" label="应用数" align="center"></el-table-column>
      <el-table-column class-name="table-operate-btn" label="操作" width="120" align="center">
        <template slot-scope="scope">
          <span @click="editNode(scope.row)">编辑</span>
          <span>删除</span>
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
    <add-node :addNodeShow="addNodeShow" v-if="addNodeShow" @hideAddNode="showAddNode"></add-node>
    <edit-node
      :editNodeShow="editNodeShow"
      :warningSetShow="warningSetShow"
      v-if="editNodeShow"
      @hideEditNode="showEditNode"
      @showWarningSet="showWarningSet"
    ></edit-node>
    <warning-set :warningSetShow="warningSetShow" v-if="warningSetShow" @showForm="showForm"></warning-set>
  </div>
</template>

<script>
import addNode from './components/addNode'
import editNode from './components/editNode'
import warningSet from './components/warningSet'
export default {
  components: {
    addNode,
    editNode,
    warningSet
  },
  data() {
    return {
      tableHeight: window.innerHeight - 180,
      addNodeShow: false,
      editNodeShow: false,
      warningSetShow: false,
      orgs: [],
      queryForm: {
        orgId: '3fcf0a57-89eb-42a7-892b-937db349d8d6'
      },
      tableData: [
        {
          id: "1",
          code: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 100 弄",
          state: 1
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
      ],
      pageSize: 20,
      currentPage: 1,
    }
  },
  created() {
    this.nodeTemplate()
    this.queryOrgTreeByPosition()
  },
  methods: {
    orgChange() {
      this.nodeTemplate()
    },
    reset() {
      for (var key in this.queryForm) {
        this.queryForm[key] = ''
      }
    },
    nodeTemplate() {
      var queryForm = this.queryForm;
      queryForm.currentPage = this.currentPage;
      queryForm.pageSize = this.pageSize;
      this.$interface.nodeTemplate(queryForm, res => {
        this.tableData = res.data.result
      })
    },
    addNode() {
      this.addNodeShow = true
    },
    editNode() {
      this.editNodeShow = true
    },
    showAddNode(v) {
      this.addNodeShow = v
    },
    showEditNode(v) {
      this.editNodeShow = v
    },
    showWarningSet(v) {
      console.log(132, v)
      this.warningSetShow = v
    },
    showForm(v) {
      this.warningSetShow = v;
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
          orgs.forEach(function (item) {
            item.children = [];
          });
          this.orgs = orgs;
        }
      );
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.nodeTemplate();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.nodeTemplate();
    }
  }
}
</script>

<style scope lang="less">
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
  .line {
    min-width: 840px;
    height: 2px;
    background: #0958a5;
    margin-bottom: 10px;
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


