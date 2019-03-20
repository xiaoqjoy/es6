<template>
  <div>
    <div class="query-form">
      <el-button type="primary" @click="editSet({operateType: 'add'})">新增设置</el-button>
    </div>
    <el-table :data="tableData.itemList" border row-key="id" :max-height="tableHeight">
      <el-table-column prop="orgName" label="城市" align="center"></el-table-column>
      <el-table-column prop="positionTypeDesc" label="岗位类型" align="center"></el-table-column>
      <el-table-column prop="personName" label="姓名" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.personName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="responsibleOrgNames" label="负责部门" align="center"></el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.statusDesc}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="table-operate-btn" label="操作" align="center" min-width="160">
        <template slot-scope="scope">
          <span type="text" @click="editSet(Object.assign(scope.row,{operateType:'edit'}))">修改</span>
          <span
            type="text"
            @click="intentionStatusChange(Object.assign(scope.row,{statusSurety:scope.row.status==='ENABLED'?'DISABLED':'ENABLED'}))"
          >{{scope.row.status==='ENABLED'?'禁用':'启用'}}</span>
          <span type="text" @click="intentionConfigDeleteById(scope.row)">删除</span>
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
    <add-set :editSetShow="editSetShow" :setInfo="setInfo" @showEditSet="showEditSet"></add-set>
  </div>
</template>
<script>
import addSet from "./components/addSet";
export default {
  data() {
    return {
      tableData: [],
      editSetShow: false,
      setInfo: {},
      tableHeight: window.innerHeight - 180,
      pageSize: 20,
      currentPage: 1
    };
  },
  components: {
    addSet
  },
  created() {
    this.intentionConfigPageQuery();
  },
  methods: {
    intentionConfigPageQuery() {
      // 单据分配设置分页查询
      this.$interface.intentionConfigPageQuery(
        { pageSize: this.pageSize, currentPage: this.currentPage },
        res => {
          this.tableData = res.data.result;
        }
      );
    },
    editSet(row) {
      this.setInfo = row;
      this.editSetShow = true;
    },
    showEditSet(v) {
      this.editSetShow = v;
      this.intentionConfigPageQuery();
    },
    intentionConfigDeleteById(row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$interface.intentionConfigDeleteById(
          {
            id: row.id
          },
          res => {
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.intentionConfigPageQuery();
          }
        );
      });
    },
    intentionStatusChange(row) {
      this.$interface.intentionStatusChange(
        {
          id: row.id,
          status: row.statusSurety
        },
        res => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.intentionConfigPageQuery();
        }
      );
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.intentionConfigPageQuery();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.intentionConfigPageQuery();
    }
  }
};
</script>
<style scoped lang="less">
.query-form {
  min-width: 840px;
  margin-bottom: 10px;
  font-size: 0;

  .el-select,
  .el-input,
  .date {
    margin-right: 10px;
  }
}
</style>
