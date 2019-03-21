<template>
  <section class="house-box">
    <header class="house-header">
      <div class="search-box filter-form-box">
        <el-row :gutter="10">
          <el-col :span="3">
            <el-select v-model="filtrateForm.contractStatus" placeholder="合同状态" size="mini" @change="handlePageChange(1)">
              <el-option label="合同状态" :value="null">
              </el-option>
              <el-option label="已签约" value="EFFECT">
              </el-option>
              <el-option label="即将到期" value="DUE">
              </el-option>
              <el-option label="已到期" value="EXPIRED">
              </el-option>
              <el-option label="已废除" value="DELETE">
              </el-option>
              <el-option label="中途退租" value="MIDWAY_RETIRING">
              </el-option>
              <el-option label="已退租" value="RETIRING">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-input v-model="filtrateForm.managerName" @keyup.enter.native="handlePageChange(1)" placeholder="输入管家姓名搜索" size="mini" clearable></el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="filtrateForm.renterName" @keyup.enter.native="handlePageChange(1)" placeholder="输入租客姓名搜索" size="mini" clearable></el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="filtrateForm.searchKey" @keyup.enter.native="handlePageChange(1)" placeholder="输入小区/楼栋/房号搜索" size="mini" clearable></el-input>
          </el-col>
          <el-col :span="3">
            <p class="font-l">
              <el-button type="primary" size="mini" @click="handlePageChange(1)">搜索</el-button>
            </p>
          </el-col>
          <el-col :span="3" :offset="4">
            <p class="pdr-20 font-r">
              <el-button v-if="checkPermission('LONG_CONTRACT_EDIT')" type="success" size="mini" @click="AddContDialog = true">添加合同</el-button>
            </p>
          </el-col>
        </el-row>
      </div>
    </header>
    <div class="house-list">
      <el-table :data="contractData"
        header-align="center"
        border
        stripe
        ref="multipleTable"
        size="small"
        height="100%"
        cell-class-name="default-color"
        @row-click="handleRow"
        v-loading="loading">
        <el-table-column prop="id"
          label="合同编号"
          :min-width="100"
          align="center">
        </el-table-column>
        <el-table-column label="房源" :min-width="200" align="center">
          <template slot-scope="gardenInfo">
            <span>{{gardenInfo.row.gardenName+'，'+gardenInfo.row.buildingName+'，'+gardenInfo.row.roomNo}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="renterName" label="签约人" :min-width="80" align="center">
        </el-table-column>
        <el-table-column label="租期" :min-width="150" align="center">
          <template slot-scope="time">
            <span>{{time.row.startTime}}至{{time.row.endTime}}</span>
          </template>
        </el-table-column>

        <el-table-column prop="signTime" label="签约时间" :min-width="90" align="center">
        </el-table-column>
        <el-table-column prop="managerName" label="管家" :min-width="80" align="center">
        </el-table-column>
        <el-table-column prop="contractStatusDesc" label="状态" :min-width="80" align="center">
          <template slot-scope="scope">
            <span class="state-green">{{ scope.row.contractStatusDesc }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" :min-width="100" align="center">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="mini" v-if="(scope.row.contractStatus === 'NO_EFFECT' || !scope.row.contractStatus) && checkPermission('LONG_CONTRACT_EDIT')" @click.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="text" v-else-if="scope.row.contractStatus === 'EFFECT' && checkPermission('LONG_CONTRACT_T_EDIT')" @click.stop="handleReviseContract(scope.$index, scope.row)">特改</el-button> -->
            <el-button type="text" size="mini" v-if="checkPermission('LONG_CONTRACT_RENEW') && scope.row.remarkFlag" @click.stop="handleRenew(scope.$index, scope.row)">重签</el-button>
            <el-button type="text" size="mini" v-if="checkPermission('LONG_CONTRACT_RENEW') && scope.row.contractStatus === 'DUE' && scope.row.renew === 0" @click.stop="handleRenew(scope.$index, scope.row)">续签</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="house-pagination">
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
    <add-contract v-if="AddContDialog" title="App下载二维码" v-model="AddContDialog">
    </add-contract>

    <el-dialog :title="'租客合同'+contractId" :visible.sync='detailsDialog' :close-on-click-modal="false" width="950px">
      <contarct-detail :contractId="contractId" v-if="detailsDialog">
      </contarct-detail>
    </el-dialog>
  </section>
</template>

<script>
import AddContract from './components/TenantContract/AddContarct';
import ContarctDetail from './components/TenantContract/ContarctDetail';
import { handlePages } from '@/components/common/mixin';
export default {
  name: 'TenantContract',
  mixins: [handlePages],
  data() {
    return {
      loading: false,
      contractId: '',
      roomId: '',
      AddContDialog: false, // 弹框
      detailsDialog: false, //
      contractData: [],
      filtrateForm: {
        currentPage: 1,
        pageSize: 4,
        contractStatus: null,
        managerName: null,
        renterName: null,
        searchKey: null
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
      this.$axios.get('/security/roomStatus/contract/queryContractPage', {
        params: this.filtrateForm
      }
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
    // 点击当前行
    handleRow(row, event, column) {
      this.contractId = row.id;
      // this.contractDetailsData = row;
      this.detailsDialog = true;
    },
    handleRenew(index, row) {
      // this.DialogType = 'Renew';
      // this.contractId = row.id;
      this.AddContDialog = true;
    }

  },
  components: {
    AddContract,
    ContarctDetail
  }
};
</script>


<style scoped>
.search-box {
  line-height: 50px;
}
.el-menu-demo {
  padding: 0 170px 0 20px;
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

</style>
