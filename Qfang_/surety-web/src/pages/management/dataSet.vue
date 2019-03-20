<template>
  <div>
    <div class="query-form">
      <el-input v-model="bankName" placeholder="请输入名称" class="width-180"></el-input>
      <el-select v-model="state" placeholder="状态" class="width-180">
        <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="success" @click="addData" class="rf">+新增资料</el-button>
    </div>
    <el-table :data="tableData.itemList" border :max-height="tableHeight">
      <el-table-column prop="code" label="编号" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" width="640" align="center"></el-table-column>
      <el-table-column prop="statusDesc" label="状态" align="center"></el-table-column>
      <el-table-column label="操作" align="center" min-width="160">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">修改</el-button>
          <el-button
            type="text"
            v-if="scope.row.status == 'ENABLED'"
            @click="prohibit(scope.row)"
          >禁用</el-button>
          <el-button
            type="text"
            v-if="scope.row.status == 'DISABLED'"
            @click="prohibit(scope.row)"
          >启用</el-button>
          <el-button type="text" @click="deleteData(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 30, 50,100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.recordCount"
    ></el-pagination>
    <add-data :addDataShow="addDataShow" :row="row" v-if="addDataShow" @hideAddData="showAddData"></add-data>
  </div>
</template>
<script>
import addData from "./components/addData";

export default {
  data() {
    return {
      row: {},
      tableHeight: window.innerHeight - 180,
      pageSize: 20,
      currentPage: 1,
      addDataShow: false,
      bankName: "",
      state: "",
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
      tableData: []
    };
  },
  components: {
    addData
  },
  mounted() {},
  methods: {
    search() {
      this.getData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    edit(row) {
      this.addDataShow = true;
      this.row = row;
    },
    prohibit(row) {
      let _this = this;

      this.confirm("是否确定禁用当前资料", "禁用", function() {
        _this.$interface.materialStatusChange(
          {
            id: row.id,
            status: row.status == "ENABLED" ? "DISABLED" : "ENABLED"
          },
          res => {
            _this.getData();
          }
        );
      });
    },
    deleteData(id) {
      let _this = this;
      this.confirm("是否确定删除当前资料", "删除", function() {
        _this.$interface.materialDeleteById(
          {
            id: id
          },
          res => {
            console.log(res);
            _this.getData();
          }
        );
      });
    },
    //资料设置分页查询
    getData() {
      this.$interface.materialPageQuery(
        {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          name: this.bankName,
          status: this.state
        },
        res => {
          this.tableData = res.data.result;
        }
      );
    },
    addData() {
      this.addDataShow = true;
    },
    showAddData(v) {
      this.addDataShow = v;
      this.getData();
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style scoped>
.width-180 {
  width: 180px;
}
.query-form {
  margin-bottom: 10px;
}
.el-table {
  min-height: 300px;
}
</style>
