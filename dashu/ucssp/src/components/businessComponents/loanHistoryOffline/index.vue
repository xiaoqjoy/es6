<template>
  <div>
    <!-- 详情 -->
    <face2face-detail :dialogVisible="dialogVisible" :applicationId="oldApplicationId" @closeDialog="closeFn"></face2face-detail>
    <el-table :data="tableData" style="width: 100%" class="common__table">
      <el-table-column type="index" width="60" label="序号"></el-table-column>
      <el-table-column prop="applicationId" label="申请编号" width="200"></el-table-column>
      <el-table-column prop="f2fConclusion1" label="面签结论1" width="200"></el-table-column>
      <el-table-column prop="f2fConclusion2" label="面签结论2" v-if="!isXiuwen" width="200"></el-table-column>
      <el-table-column prop="reasonsForFinalRejection" label="终审否决原因" width="200"></el-table-column>
      <el-table-column prop="finalConclusion" label="终审结论" width="200"></el-table-column>
      <el-table-column prop="loanState1" label="放款状态1" width="200"></el-table-column>
      <el-table-column prop="loanState2" label="放款状态2" v-if="!isXiuwen" width="200"></el-table-column>
      <el-table-column prop="reasonsForRejectionOfLoan1" label="放款否决原因1" width="200"></el-table-column>
      <el-table-column prop="reasonsForRejectionOfLoan2" label="放款否决原因2" v-if="!isXiuwen" width="200"></el-table-column>
      <el-table-column prop="repaymentState1" label="还款状态1" width="200"></el-table-column>
      <el-table-column prop="repaymentState2" label="还款状态2" v-if="!isXiuwen" width="200"></el-table-column>
      <el-table-column prop="numberOfReturns1" label="已还期数1" width="200"></el-table-column>
      <el-table-column prop="numberOfReturns2" label="已还期数2" v-if="!isXiuwen" width="200"></el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="goHistory(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      oldApplicationId: '',
      tableData: [],
      /**
     * 用于记录历史贷款记录俄罗斯套娃的层数,
     * 需要跟src\store\modules\face2face.js 的f2fTypeCodeList配合使用
     */
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
    // 获取数据列表
    getList() {
      this.$MyFetch
        .get(baseApi.loanHistory + this.applicationId, {})
        .then(res => {
          this.tableData = res.loanHistoryRecordList;
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
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
    this.getList();
  }
};
</script>
