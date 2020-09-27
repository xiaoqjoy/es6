<template>
  <div>
    <!-- 详情 -->
    <!-- <face2face-detail :dialogVisible="dialogVisible" :applicationId="oldApplicationId" @closeDialog="dialogVisible = false"></face2face-detail> -->
    <div>
      <el-table :data="tableData" style="width: 100%" class="common__table">
        <el-table-column type="index" width="60" label="序号"></el-table-column>
        <el-table-column prop="oldApplicationId" label="申请编号" width="200"></el-table-column>
        <el-table-column prop="finalTaskDefKey" label="终审阶段" width="200"></el-table-column>
        <el-table-column prop="finalOpinionResultCode" label="终审结论" width="200"></el-table-column>
        <el-table-column prop="finalRejectReasonCode" label="终审否决原因" width="200"></el-table-column>
        <el-table-column prop="putoutApproveInd1" label="放款状态1" width="200"></el-table-column>
        <el-table-column prop="rejectCode1" label="放款否决原因1" width="200"></el-table-column>
        <el-table-column prop="repaymentStatus1" label="还款状态1" width="200"></el-table-column>
        <el-table-column prop="repaymentTerm1" label="已还期数1" width="200"></el-table-column>
        <el-table-column prop="putoutApproveInd2" label="放款状态2" v-if="!isXiuwen" width="200"></el-table-column>
        <el-table-column prop="rejectCode2" label="放款否决原因2" v-if="!isXiuwen" width="200"></el-table-column>
        <el-table-column prop="repaymentTerm2" label="还款状态2" v-if="!isXiuwen" width="200"></el-table-column>
        <el-table-column prop="repaymentTerm2" label="已还期数2" v-if="!isXiuwen" width="200"></el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="goHistory(scope.row)">申请详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <face2face-detail
      :dialogVisible="dialogVisible"
      :applicationId="oldApplicationId"
      @closeDialog="closeFn"
    ></face2face-detail>
  </div>
</template>

<script>
import {baseApi} from '@system/face2face/js/server.js';
export default {
  props: {
    applicationId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      oldApplicationId: '',
      openNum: window.openNum
    };
  },
  methods: {
    goHistory(_row) {
      const {oldApplicationId, reportNum, redirectFlag, f2fTypeCode} = _row;
      let goto = {
        '2': 'pre-approval',
        '3': 'pre-audit',
        '4': 'approval-pending-start',
        '5': 'audit-pending-start'
      };
      if (redirectFlag === '1') {
        window.openNum = window.openNum || 0;
        window.openNum++;
        this.$store.commit('set_f2fTypeCode', f2fTypeCode);
        this.oldApplicationId = oldApplicationId;
        this.creditReportId = reportNum;
        this.dialogVisible = true;
        return;
      }
      let routeData = this.$router.resolve({
        name: goto[redirectFlag],
        query: {
          appID: oldApplicationId,
          isEdit: true
        }
      });
      window.open(routeData.href, '_blank');
    },
    getLoanHistory(applicationId) {
      let url = baseApi.loanHistoryInfo.replace('{applicationId}', applicationId);
      this.$MyFetch.get(url)
        .then(_data => {
          this.tableData = _data;
        }).catch(_err => {
          this.$error(_err.message);
        });
    },
    closeFn() {
      window.openNum = window.openNum || 0;
      window.openNum--;
      if (window.openNum < 0) {
        window.openNum = 0;
      }
      this.$store.commit('pop_f2fTypeCode');
      this.dialogVisible = false;
    }
  },
  created() {
    this.getLoanHistory(this.applicationId);
  }
};
</script>
