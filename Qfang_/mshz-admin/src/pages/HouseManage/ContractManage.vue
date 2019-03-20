<template>
  <section class="houseing">
    <header class="header">
      <div class="search-box pdl-20">
        <el-row :gutter="10">
          <el-col :span="3">
            <el-select v-model="filtrateForm.state"
              placeholder="合同状态"
              size="mini"
              @change="handlePageChange(1)">
              <el-option label="全部状态"
                :value="null"></el-option>
              <el-option label="合同待审核"
                value="WAIT_AUDIT"></el-option>
              <el-option label="审核未通过"
                value="AUDIT_FAIL"></el-option>
              <el-option label="审核已通过"
                value="AUDIT_SUCCESS"></el-option>
              <el-option label="即将过期"
                value="TO_EXPIRED"></el-option>
              <el-option label="合同过期"
                value="OVERTIME"></el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-input v-model="filtrateForm.bdName"
              placeholder="输入BD姓名搜索"
              size="mini"
              clearable></el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="filtrateForm.ownerName"
              placeholder="输入业主姓名搜索"
              size="mini"
              clearable></el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="filtrateForm.keyword"
              placeholder="输入小区/楼栋/房号搜索"
              size="mini"
              clearable></el-input>
          </el-col>
          <el-col :span="3">
            <p class="font-l">
              <el-button type="primary"
                size="mini"
                @click="handlePageChange(1)">搜索</el-button>
            </p>
          </el-col>
          <el-col :span="3"
            :offset="4">
            <p class="pdr-20 font-r">
              <el-button v-if="checkPermission('CONTRACT_EDIT')"
                type="success"
                size="mini"
                @click="dialogVisible = true, DialogType = '',roomId = ''">添加合同</el-button>
            </p>
          </el-col>
        </el-row>
      </div>
    </header>
    <div class="houseing-table">
      <el-table :data="contractData"
        header-align="center"
        ref="multipleTable"
        size="small"
        height="100%"
        cell-class-name="default-color"
        class="talbe-box"
        @row-click="handleRow"
        v-loading="loading">
        <el-table-column prop="contractNumber"
          label="合同编号"
          :min-width="80"
          align="center">
        </el-table-column>
        <el-table-column label="房源"
          :min-width="150"
          align="center">
          <template slot-scope="gardenInfo">
            <span>{{gardenInfo.row.roomQueryForm.gardenName}}-{{gardenInfo.row.roomQueryForm.buildingName}}-{{gardenInfo.row.roomQueryForm.number}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="roomQueryForm.ownerName"
          label="业主"
          :min-width="80"
          align="center">
        </el-table-column>
        <el-table-column label="租期"
          :min-width="150"
          align="center">
          <template slot-scope="time">
            <span>{{time.row.roomQueryForm.leaseCreateTimeDesc}}至{{time.row.roomQueryForm.leaseFinalTimeDesc}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="signupTimeDesc"
          label="签约时间"
          :min-width="80"
          align="center">
        </el-table-column>
        <el-table-column prop="roomQueryForm.bdName"
          label="BD"
          :min-width="100"
          align="center">
        </el-table-column>
        <el-table-column prop="contractStateDesc"
          label="状态"
          :min-width="100"
          align="center">
          <template slot-scope="scope">
            <span class="state-green">{{ scope.row.contractStateDesc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作"
          :min-width="100"
          align="center">
          <template slot-scope="scope">
            <el-button v-if="checkPermission('CONTRACT_EDIT') && (scope.row.contractState === 'WAIT_AUDIT' || scope.row.contractState === 'AUDIT_FAIL')"
              type="text"
              size="small"
              @click.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button v-else-if="checkPermission('CONTRACT_T_EDIT') && scope.row.contractState === 'AUDIT_SUCCESS'"
              type="text"
              size="small"
              @click.stop="handleReviseContract(scope.$index, scope.row)">特改</el-button>
            <el-button v-if="checkPermission('CONTRACT_AUDIT') && scope.row.contractState === 'WAIT_AUDIT' "
              type="text"
              size="small"
              @click.stop="handleAudit(scope.$index, scope.row)">审核</el-button>
            <el-button v-if="checkPermission('CONTRACT_RENEW') && (scope.row.contractState === 'OVERTIME' || scope.row.contractState === 'TO_EXPIRED')"
              type="text"
              size="small"
              @click.stop="handleRenew(scope.$index, scope.row)">续签</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination class="page"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
          :current-page="currentPage"
          :page-sizes="[20, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="recordCount">
        </el-pagination>
      </div>
    </div>
    <!-- 弹框 -->
    <add-contract v-if="dialogVisible"
      :dialogVisible="dialogVisible"
      :contractId="contractId"
      :roomId="roomId"
      :DialogType="DialogType"
      v-on:changeDialog="getChange"
      v-on:refreshData="requestData"></add-contract>

    <el-dialog title="合同详情"
      :visible.sync='detailsDialog'
      :close-on-click-modal="false"
      width="950px">
      <contarct-detail :roomId="roomId"
        :contractId="contractId"
        v-if="detailsDialog"
        :readOnly="readOnly"
        v-on:refreshData="requestData"></contarct-detail>
    </el-dialog>
  </section>
</template>

<script>
import AddContract from './components/ContractManage/AddContarct';
import ContarctDetail from './components/ContractManage/ContarctDetail';
export default {
  name: 'ContractManage',
  data() {
    return {
      pageSize: 20,
      pageCount: 1,
      recordCount: 0,
      currentPage: 1,
      loading: false,
      // Contract
      // 后台返回的数据结构
      'result': {
        'currentPage': 1,
        'currentPageStartIndex': 0,
        'items': [
          {
            'contractState': 'WAIT_AUDIT',
            'createOperatorId': '',
            'createTime': null,
            'id': '708a8873-1f28-42a3-9062-9e85c0ebf778',
            'roomQueryForm': {
              'bdName': '柚子',
              'buildingName': '12栋2单元',
              'createTime': '',
              'currentPage': 1,
              'floor': 0,
              'gardenName': '桃园花园',
              'id': '4f95bbd0-cbbc-4a49-b669-afffc0bf83a2',
              'leaseCreateTime': 737078400000,
              'leaseFinalTime': 1450656000000,
              'number': '1002',
              'ownerName': 'wadad',
              'pageSize': 20,
              'process': '',
              'state': null,
              'updateTime': 1512889057000
            },
            'updateOperatorId': '',
            'updateTime': null
          }
        ],
        'nextPage': 2,
        'pageCount': 7,
        'pageSize': 1,
        'pageTemplate': '',
        'previousPage': 1,
        'queryRecordCount': true,
        'queryString': '',
        'recordCount': 7,
        'sort': 'DESC',
        'sortField': '',
        'uri': ''
      },
      id: '',
      readOnly: '',
      contractId: '',
      roomId: '',
      DialogType: '', // 弹框类型

      currentPage4: 1,
      dialogVisible: false, // 弹框
      detailsDialog: false, //
      contractData: [],
      filtrateForm: {
        'currentPage': 1,
        'pageSize': 4,
        'state': null,
        'ownerName': null,
        'bdName': null,
        'keyword': null
      }
    };
  },
  created() {
    this.requestData();
  },
  methods: {
    // 获取列表数据
    requestData() {
      this.filtrateForm.currentPage = this.currentPage;
      this.filtrateForm.pageSize = this.pageSize;
      this.loading = true;
      this.$axios.post('/security/room/contract/queryContractCondition',
        this.filtrateForm
      ).then((res) => {
        this.loading = false;
        if (res.data.status === 'C0000') {
          let { result } = res.data;
          this.currentPage = result.currentPage;
          this.pageCount = result.pageCount;
          this.recordCount = result.recordCount;
          this.contractData = result.items;
        } else {
          this.$message.error(res.data.message);
        }
      }).catch((err) => {
        this.loading = false;
        this.$message.error(err.message || '服务器异常');
        console.log(err);
      });
    },

    // 子组件传来的
    getChange(data) {
      this.dialogVisible = data;
    },

    // 点击当前行
    handleRow(row, event, column) {
      this.contractId = row.id;
      this.roomId = row.roomQueryForm.id;
      this.readOnly = true;
      this.detailsDialog = true;
    },

    // 编辑
    handleEdit(index, row) {
      this.contractId = row.id;
      this.roomId = row.roomQueryForm.id;
      this.DialogType = 'Editor';
      this.dialogVisible = true;
    },

    handleReviseContract(index, row) {
      this.contractId = row.id;
      this.roomId = row.roomQueryForm.id;
      this.DialogType = 'Revise';
      this.dialogVisible = true;
    },

    // 审核
    handleAudit(index, row) {
      this.contractId = row.id;
      this.roomId = row.roomQueryForm.id;
      this.readOnly = false;
      this.detailsDialog = true;
    },

    // 续签
    handleRenew(index, row) {
      this.DialogType = 'Renew';
      this.contractId = row.id;
      this.roomId = row.roomQueryForm.id;
      this.dialogVisible = true;
    },

    // 分页每页几条
    handleSizeChange(val) {
      this.pageSize = val;
      this.requestData();
    },
    handlePageChange(val) {
      this.currentPage = val;
      this.requestData();
    }
    // 筛选
    // handleFiltrate() {
    //   this.filtrateForm.currentPage = this.currentPage;
    //   this.filtrateForm.pageSize = this.pageSize;
    //   this.loading = true;
    //   this.$axios.post(
    //     '/security/room/contract/queryContractCondition',
    //     this.filtrateForm
    //   ).then((res) => {
    //     this.loading = false;
    //     if (res.data.status === 'C0000') {
    //       this.currentPage = res.data.result.currentPage;
    //       this.pageCount = res.data.result.pageCount;
    //       this.contractData = res.data.result.items;
    //       this.recordCount = res.data.result.recordCount;
    //     } else {
    //       this.contractData = [];
    //     }
    //   }).catch((res) => {
    //     console.log(res);
    //   });
    // }
  },
  components: {
    AddContract,
    ContarctDetail
  }
};
</script>


<style scoped>
.houseing {
  padding-top: 80px;
  padding-bottom: 20px;
  box-sizing: border-box;
  height: 100%;
  position: relative;
}
.header {
  display: block;
  margin-top: -80px;
  height: 60px;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  background-color: #fff;
}
.search-box {
  padding-top: 14px;
}
.el-menu-demo {
  padding: 0 170px 0 20px;
}
.hd-buttom {
  width: 170px;
  height: 60px;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.houseing-table {
  position: relative;
  margin: 20px 20px 0 20px;
  padding-bottom: 50px;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #cccccc;
  background-color: #eeeeee;
}
.talbe-box {
  width: 100%;
  height: 100%;
}
.default-color {
  background-color: #333;
}
/* 类型 */
.type-item {
  border-width: 1px;
  border-style: solid;
  border-color: #008842;
  border-radius: 3px;
  color: #008842;
}
.state-green {
  color: #008842;
}
.state-black {
  color: #000;
}
.room-number {
  font-size: 14px;
  font-weight: 600;
  color: #008842;
}

.filtrate-box {
  padding: 8px;
}
.filtrate-button {
  height: 50px;
  margin: 0;
  text-align: right;
  line-height: 50px;
  border-top: 1px solid #ccc;
}
</style>
