<template>
  <div>
    <div class="query-form">
      <el-button type="success" @click="editCompany({operateType: 'add'})">新增公司</el-button>
    </div>
    <div>
      <el-table :data="tableData.itemList" border :max-height="tableHeight">
        <el-table-column prop="companyType" label="公司类型" align="center"></el-table-column>
        <el-table-column prop="companyName" label="公司名称" align="center"></el-table-column>
        <el-table-column prop="rebateAccountName" label="返佣户名" align="center"></el-table-column>
        <el-table-column prop="rebateAccountNumber" label="返佣账户" align="center"></el-table-column>
        <el-table-column prop="rebateAccountBank" label="返佣开户行" align="center"></el-table-column>
        <el-table-column prop="agreementEndDate" label="协议到期日" align="center"></el-table-column>
        <el-table-column prop="statusDesc" label="状态" align="center"></el-table-column>
        <el-table-column label="操作" align="center" min-width="160">
          <template slot-scope="scope">
            <el-button type="text" @click="editCompany(scope.row)">修改</el-button>
            <el-button
              type="text"
              @click="partnerStatusChange(Object.assign(scope.row,{statusSurety:scope.row.status==='ENABLED'?'DISABLED':'ENABLED'}))"
            >{{scope.row.status==='ENABLED'?'禁用':'启用'}}</el-button>
            <el-button type="text" @click="partnerDeleteById(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <add-company
        :companyInfo="companyInfo"
        :addCompanyShow="addCompanyShow"
        @hideAddCompany="showAddCompany"
      ></add-company>
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
    </div>
  </div>
</template>
<script>
import addCompany from "./components/addCompany";
export default {
  data() {
    return {
      tableHeight: window.innerHeight - 180,
      pageSize: 20,
      currentPage: 1,
      addCompanyShow: false,
      companyInfo: {},
      tableData: []
    };
  },
  components: {
    addCompany
  },
  created() {
    this.getData();
  },
  methods: {
    editCompany(row) {
      this.addCompanyShow = true;
      this.companyInfo = row;
    },
    showAddCompany(v) {
      console.log(789, v);
      this.addCompanyShow = v;
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
    //合作方管理分页查询
    getData() {
      this.$interface.partnerPageQuery(
        {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        },
        res => {
          this.tableData = res.data.result;
        }
      );
    },
    partnerStatusChange(row) {
      this.$interface.partnerStatusChange(
        {
          id: row.id,
          status: row.statusSurety
        },
        res => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          this.getData();
        }
      );
    },
    partnerDeleteById(row) {
      this.confirm("此操作将永久删除, 是否继续?", "删除", function() {
        this.$interface.partnerDeleteById(
          {
            id: row.id
          },
          res => {
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.getData();
          }
        );
      });
    }
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
</style>
