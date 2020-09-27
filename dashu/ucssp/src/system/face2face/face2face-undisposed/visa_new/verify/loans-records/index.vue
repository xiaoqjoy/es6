<template>
  <div class="loans-records">

    <!-- 详情 -->
    <!-- <face2face-detail :dialogVisible="dialogVisible" v-if="f2fTypeCode !== '004'" :applicationId="rowApplicationId" @closeDialog="dialogVisible = false"></face2face-detail> -->
    <div class="dialog-box__middle-top">
      <h5 class="title"><span class="icon icon__gan"></span>历史贷款记录</h5>
    </div>
    <loanHistory :applicationId="applicationId" v-if="f2fTypeCode === '004'"></loanHistory>
    <loanHistoryOffline :tableData='tableData' :applicationId="applicationId" v-if="f2fTypeCode !== '004'"></loanHistoryOffline>
    <!-- <el-table :data="tableData" style="width: 100%" class="common__table" v-if="f2fTypeCode !== '004'">
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
          <el-button type="text" @click="showDetail(scope.row.applicationId,scope.row.finalTaskDefKey,scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table> -->

    <div class="warning">
      <p>异常提示：</p>
      <ul>
        <li v-for="(item,index) in loanHistoryWarnings" :key="index">
          {{item.applicationId}}：{{item.warningMsg}}
        </li>
      </ul>
    </div>
    <div v-if="f2fTypeCode === '004'">
      <div class="dialog-box__middle-top">
        <h5 class="title"><span class="icon icon__gan"></span>关联信息检测</h5>
      </div>
     <detectionMsg :applicationId="applicationId"/>
    </div>
  </div>
</template>

<script>
// import face2faceDetail from '../../face2face-detail/index'; // 详情组件
import detectionMsg from '@system/approvalAudit/dialogCom/detectionMsg/index.vue';
import loanHistory from '@components/businessComponents/loanHistory';
import loanHistoryOffline from '@components/businessComponents/loanHistoryOffline';
import { baseApi } from "../../../../js/server";
export default {
  name: "loans-records",
  props: {
    // 详情传过来的申请编号
    applicationId: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      // 历史贷款记录
      tableData: [],
      rowApplicationId: '',
      f2fTypeCode: '',
      loanHistoryWarnings: "", // 异常提示
      dialogVisible: false // 详情的显示与隐藏
    };
  },
  created() {
    // 新版面签永远取url地址的f2fTypeCode
    this.f2fTypeCode = window.atob(this.$route.query.f2fTypeCode);
    // 获取数据列表
    this.getList();
  },
  methods: {
    // 获取数据列表
    getList() {
      this.$MyFetch.get(baseApi.loanHistory + this.applicationId, {})
        .then(res => {
          this.tableData = res.loanHistoryRecordList;
          this.loanHistoryWarnings = res.loanHistoryWarnings;
        }).catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 显示详情
    showDetail(applicationId, finalTaskDefKey, row) {
      // 根据当前贷款申请所在环节查看详情（faceToFaceTask：面签，approveTask：审批，auditTask：审计）
      this.rowApplicationId = applicationId;
      this.dialogVisible = true;
      this.$store.commit('set_f2fTypeCode', row.f2fTypeCode);
      // this.delvModuleClass();
    },
    delvModuleClass() {
      let timer = setInterval(() => {
        const eleM = document.getElementsByClassName('v-modal')[0];
        if (eleM) {
          eleM.setAttribute('style', 'z-index: 400 !important');
          clearInterval(timer);
        }
      }, 300);
    }
  },
  computed: {
  },
  components: {
    detectionMsg,
    loanHistory,
    loanHistoryOffline
  }
};
</script>

<style lang="less">
</style>

<style lang="less" scoped>
.loans-records {
  padding: 0 10px 20px 0;
  .dialog-box__middle-top {
    padding: 20px 0;
    border-bottom: 1px solid #e9e9e9;
    .title {
      font-size: 16px;
      .icon__gan {
        margin-right: 10px;
      }
    }
  }
  .common__table {
    margin-top: 20px;
  }
  .warning {
    color: #f55f5f;
    margin-top: 21px;
    ul {
      li {
        margin-top: 12px;
      }
    }
  }
}
</style>
