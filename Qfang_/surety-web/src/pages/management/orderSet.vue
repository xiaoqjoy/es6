<template>
  <div>
    <div class="query-form">
      <el-select v-model="queryForm.orgId" @change="orgChange" placeholder="城市" class="width-180">
        <el-option v-for="item in orgs" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
      <el-select
        v-model="queryForm.businessTypeId"
        :disabled="businessTypes.length===0"
        placeholder="业务类型"
        class="width-180"
      >
        <el-option
          v-for="item in businessTypes"
          :key="item.id"
          :label="item.businessName"
          :value="item.id"
        ></el-option>
      </el-select>
      <el-input v-model="queryForm.redeemFundProviderName" placeholder="出赎楼款银行" class="width-180"></el-input>
      <el-input v-model="queryForm.previousFundProviderName" placeholder="原贷款银行" class="width-180"></el-input>
      <el-select v-model="queryForm.status" placeholder="状态" class="width-80">
        <el-option v-for="item in states" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button @click="empty">清空</el-button>
      <el-button type="success" @click="edit({operateType:'add'})" class="rf">新增指令配置</el-button>
    </div>
    <el-table :data="tableData.itemList" border :max-height="tableHeight">
      <el-table-column prop="businessTypeName" label="业务类型" align="center"></el-table-column>
      <el-table-column prop="redeemFundProviderName" label="出赎楼款银行" align="center"></el-table-column>
      <el-table-column prop="previousFundProviderName" label="原贷款银行" align="center"></el-table-column>
      <el-table-column prop="validityTypeDesc" label="有效期" align="center"></el-table-column>
      <el-table-column prop="statusDesc" label="状态" align="center"></el-table-column>
      <el-table-column label="操作" align="center" min-width="160">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">修改</el-button>
          <el-button
            type="text"
            @click="prohibit(scope.row)"
          >{{scope.row.status == 'ENABLED'?'禁用': '启用'}}</el-button>
          <el-button type="text" @click="deleteData(scope.row.id)">删除</el-button>
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
    <add-order
      :addOrderShow="addOrderShow"
      :orderInfo="orderInfo"
      v-if="addOrderShow"
      @hideAddOrder="showAddOrder"
    ></add-order>
  </div>
</template>
<script>
import addOrder from "./components/addOrder";

export default {
  data() {
    return {
      queryForm: {
        orgId: "",
        businessTypeId: "",
        redeemFundProviderName: "",
        previousFundProviderName: "",
        status: ""
      },
      orderInfo: {},
      tableHeight: window.innerHeight - 180,
      pageSize: 20,
      currentPage: 1,
      addOrderShow: false,
      orgs: [],
      businessTypes: [],
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
    addOrder
  },
  created() {
    this.queryOrgTreeByPosition();
    this.getData();
  },
  mounted() {},
  methods: {
    orgChange() {
      this.queryBusinessTypeAllName(this.queryForm.orgId);
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
    queryBusinessTypeAllName(orgId) {
      this.$interface.queryBusinessTypeAllName({ orgId: orgId }, res => {
        this.businessTypes = res.data.result || [];
      });
    },
    search() {
      this.getData();
    },
    empty() {
      this.queryForm.orgId = "";
      this.queryForm.businessTypeId = "";
      this.queryForm.redeemFundProviderName = "";
      this.queryForm.previousFundProviderName = "";
      this.queryForm.status = "";
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
      this.addOrderShow = true;
      this.orderInfo = row;
    },
    prohibit(row) {
      let that = this;
      that.$interface.commandStatusChange(
        {
          id: row.id,
          status: row.status == "ENABLED" ? "DISABLED" : "ENABLED"
        },
        res => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          that.getData();
        }
      );
    },
    deleteData(id) {
      let _this = this;
      this.confirm("是否确定删除当前资料", "删除", function() {
        _this.$interface.commandDeleteById(
          {
            id: id
          },
          res => {
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            _this.getData();
          }
        );
      });
    },
    //资料设置分页查询
    getData() {
      var queryForm = JSON.parse(JSON.stringify(this.queryForm));
      queryForm.currentPage = this.currentPage;
      queryForm.pageSize = this.pageSize;
      this.$interface.commandPageQuery(queryForm, res => {
        this.tableData = res.data.result;
      });
    },
    showAddOrder(v) {
      this.addOrderShow = v;
      this.getData();
    }
  }
};
</script>
<style scoped>
.query-form {
  min-width: 1074px;
}
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
