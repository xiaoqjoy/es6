<template>
  <div class="loans-records">

    <!-- 详情 -->
    <face2face-detail :dialogVisible="dialogVisible" :applicationId="applicationId" @closeDialog="dialogVisible = false"></face2face-detail>

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
          <el-button type="text" @click="showDetail(scope.row.applicationId,scope.row.finalTaskDefKey)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="warning">
      <p>异常提示：</p>
      <ul>
        <li v-for="(item,index) in loanHistoryWarnings" :key="index">
          {{item.applicationId}}：{{item.warningMsg}}
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
// import face2faceDetail from '../../face2face-detail/index'; // 详情组件
import { baseApi } from "../../js/server.js";
export default {
  name: "loans-records",
  props: {
    // 详情传过来的申请编号
    applicationIdDetail: {
      type: String,
      default: ""
    }
  },
  components: {
    // face2faceDetail
  },
  data() {
    return {
      // 历史贷款记录
      tableData: [],
      loanHistoryWarnings: "", // 异常提示

      dialogVisible: false, // 详情的显示与隐藏
      applicationId: "" // 记录申请编号
    };
  },
  created() {
    // console.log(this.applicationIdDetail);
    // 获取申请编号。this.applicationIdDetail存在，则说明是从组件过来的，否则是从路由过来的
    if (this.applicationIdDetail) {
      this.applicationId = this.applicationIdDetail;
    } else {
      this.applicationId = this.$route.query.applicationId;
    }

    // print();
    // 获取数据列表
    this.getList();

    // setTimeout(() => {
    //   this.dialogVisible = true;
    // }, 2000);
  },
  methods: {
    // 获取数据列表
    getList() {
      this.$MyFetch
        .get(baseApi.loanHistory + this.applicationId, {})
        .then(res => {
          this.tableData = res.loanHistoryRecordList;
          this.loanHistoryWarnings = res.loanHistoryWarnings;
          // this.total = res.total;
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 显示详情
    showDetail(applicationId, finalTaskDefKey) {
      // 根据当前贷款申请所在环节查看详情（faceToFaceTask：面签，approveTask：审批，auditTask：审计）
      // if (finalTaskDefKey === "faceToFaceTask") {
        this.applicationId = applicationId;
        this.dialogVisible = true;
      // } else {
      //   this.$router.push({name: 'approval-pending-start', query: { appID: applicationId, isEdit: true }});
      // }
    }
  }
};
</script>

<style lang="less">
</style>

<style lang="less" scoped>
.loans-records {
  .warning {
    color: #f55f5f;
    margin-top: 21px;
    p {
    }
    ul {
      li {
        margin-top: 12px;
      }
    }
  }
}
</style>
