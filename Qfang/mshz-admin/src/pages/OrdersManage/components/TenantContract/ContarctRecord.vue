<template>
  <section class="contract-record-dialog">
    <div class="contract-record-body">
      <div class="model-border">
        <header class="model-header">
          <span>待执行合同</span>
        </header>
        <div class="bd-ddd">
          <el-table :data="executedContractList" style="width: 100%" @row-click="pdfDialogShow" height="100%" size="mini">
            <el-table-column label="合同编号" prop="contractId" :min-width="150" align="left">
            </el-table-column>
            <el-table-column label="续签时间" prop="signTimeDesc" :min-width="100" align="center">
            </el-table-column>
            <el-table-column label="签约人" prop="signPerson" :min-width="80" align="center">
            </el-table-column>
            <el-table-column label="租期" align="center" :min-width="150">
              <template slot-scope="time">
                <span>{{time.row.startTimeDesc}}至{{time.row.endTimeDesc}}</span>
              </template>
            </el-table-column>
            <el-table-column label="管家" prop="managerName" align="center" :min-width="100">
            </el-table-column>
            <el-table-column label="操作" align="center" :min-width="150">
              <template slot-scope="scope">
                <el-button size="mini" type="text" @click.stop="pdfDialogShow(scope.row)">查看</el-button>
                <el-button size="mini" type="text" @click.stop="clickDownloadFile(scope.row.leaseContractUrl)">下载</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="model-border">
        <header class="model-header">
          <span>历史合同</span>
        </header>
        <div class="bd-ddd">
          <el-table :data="hisContractRecordModelList" style="width: 100%" @row-click="pdfDialogShow" height="100%" size="mini">
            <el-table-column label="合同编号" prop="contractId" :min-width="150" align="left">
            </el-table-column>
            <el-table-column label="签约时间" prop="signTimeDesc" :min-width="80" align="center">
            </el-table-column>
            <el-table-column label="签约人" prop="signPerson" :min-width="80" align="center">
            </el-table-column>
            <el-table-column label="租期" align="center" :min-width="120">
              <template slot-scope="time">
                <span>{{time.row.startTimeDesc}}至{{time.row.endTimeDesc}}</span>
              </template>
            </el-table-column>
            <el-table-column label="管家" prop="managerName" align="center" :min-width="80">
            </el-table-column>
            <el-table-column label="状态" prop="contractStatusDesc" align="center" :min-width="80">
            </el-table-column>
            <el-table-column label="操作" align="center" :min-width="100">
              <template slot-scope="scope">
                <el-button size="mini" type="text" @click.stop="pdfDialogShow(scope.row)">查看</el-button>
                <el-button size="mini" type="text" v-if="scope.row.leaseContractUrl" @click.stop="clickDownloadFile(scope.row.leaseContractUrl,scope.row.contractStatus === 'DELETE'?scope.row.terminationUrl:'')">下载</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- <el-dialog title="合同预览" :visible.sync='showPdfDialog' append-to-body :close-on-click-modal="false" width="950px">
      <ContractPreview :contractData="contractData" />
    </el-dialog> -->
    <el-dialog title="合同详情" :visible.sync='showPdfDialog' append-to-body :close-on-click-modal="false" width="950px">
      <ContarctInfo :contractData="contractData" :showRecord="false" />
    </el-dialog>
  </section>
</template>
<script>
// import ContractPreview from './ContractPreview';
// import ContarctInfo from './ContarctInfo';
export default {
  name: 'ContarctRecord',
  data() {
    return {
      executedContractList: [], // 待执行合同
      hisContractRecordModelList: [], // 历史行合同
      showPdfDialog: false,
      contractData: {}
    };
  },
  components: {
    // ContractPreview,
    // 循环引用导致需要异步引入组件
    ContarctInfo: () => import('./ContarctInfo.vue')
  },
  props: ['contractId'],
  created() {
    this.requestData();
  },
  inject: ['downloadPdfFile'],
  mounted() {
  },
  methods: {
    // 获取数据
    requestData() {
      this.$axios.get('/security/roomStatus/contract/queryHisAndExecutedContract', {
        params: {
          contractId: this.contractId
        }
      }).then(({ data }) => {
        if (data.result && data.status === 'C0000') {
          this.executedContractList = data.result.executedContractList;
          this.hisContractRecordModelList = data.result.hisContractRecordModelList;
        } else {
          this.$message.error('查询合同失败');
        }
      }).catch((err) => {
        this.$message.error(err.message || '服务器异常');
      });
    },
    pdfDialogShow(row) {
      this.$axios.get('/security/roomStatus/contract/queryContractDetail', {
        params: {
          id: row.contractId
        }
      }).then(({ data }) => {
        if (data.status === 'C0000') {
          this.contractData = data.result;
          this.showPdfDialog = true;
        } else {
          this.$message.error(data.message);
        }
      }).catch((err) => {
        this.$message.error(err.message || '服务器异常');
      });
    },
    clickDownloadFile(...arg) {
      arg.forEach((e, i) => {
        let fileName = '租客合同';
        if (i === 1) {
          fileName = '租客合同终止协议';
        }
        e && this.downloadPdfFile(e, fileName);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.contract-record-dialog {
  padding: 10px;
  .contract-pdf-wrapper {
    .nodata {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
    }
  }
  .model-border {
    padding: 0 10px;
    border: none;
    margin: 0 0 20px 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    .model-header {
      padding: 0;
      text-align: left;
      font-weight: 600;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #dddddd;
      color: #333;
      background: #fff;
      font-size: 14px;
      margin-bottom: 20px;
    }
  }
}
</style>
