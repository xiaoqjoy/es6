<template>
  <div class="check-resultData">
    <el-table class="commom__table"
      v-for="(item, index) in check_interviewData"
      :key="item.productId" :data="item" style="width: 100%">
      <el-table-column prop="productId" :label="'产品ID' + (index + 1)" width="200"></el-table-column>
      <el-table-column prop="productName" label="产品名称" width="200">
        <template slot-scope="scope">
          <el-tooltip effect="dark" :content="scope.row.productName" placement="top">
            <div class="ellipsis">
              {{scope.row.productName}}
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="documentId" label="档案编号" width="200">
        <template slot-scope="scope">
          <el-tooltip effect="dark" :content="scope.row.documentId" placement="top">
            <div class="ellipsis">
              {{scope.row.documentId}}
            </div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="applicationSubmitAmt" label="申请金额" width="200"></el-table-column>
      <el-table-column prop="interviewStatusDesc" label="状态" width="200"></el-table-column>
      <el-table-column
        prop="riskRateLevel"
        label="定价档次"
        width="200">
      </el-table-column>
      <el-table-column
        prop="pricingGrade"
        label="定价类型"
        width="200">
      </el-table-column>
      <el-table-column
        label="合作机构年化利率%（年）"
        width="200">
        <template slot-scope="scope">
        <span v-if="scope.row.partnerAnnualRate !== null">{{scope.row.partnerAnnualRate  | rounding}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="担保费率%（月）"
        width="200"
        >
        <template slot-scope="scope">
        <span v-if="scope.row.guaranteeRate !== null">{{scope.row.guaranteeRate  | rounding2}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="评审费率%（一次性收取）"
        width="200">
        <template slot-scope="scope">
        <span v-if="scope.row.reviewRate !== null">{{scope.row.reviewRate  | rounding2}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="保费费率%（一次性收取）"
        width="200">
        <template slot-scope="scope">
        <span v-if="scope.row.premiumRate !== null">{{scope.row.premiumRate  | rounding2}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="咨询费率%（一次性收取）"
        width="200">
        <template slot-scope="scope">
        <span v-if="scope.row.consultingRate !== null">{{scope.row.consultingRate  | rounding2}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="管理费率%（月）"
        width="200">
        <template slot-scope="scope">
        <span v-if="scope.row.managementFeeRate !== null">{{scope.row.managementFeeRate  | rounding2}}</span>
        </template>
      </el-table-column>
      <el-table-column width="180" label="操作" fixed="right">
        <template slot-scope="scope">
          <!-- waitting_interview：待面签资料（可点击资料签署），signature_completed：面签资料签署完成，not_meet：不符合合作机构准入，not_meet_pricing_strategy：不符合定价策略，product_entry_deny：风险不可准入 -->
          <el-button class="button-text" @click="documentSign(scope.row)" :disabled="scope.row.interviewStatus !== 'waitting_interview'">资料签署</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <undersign v-if="documentsVisible"
        :documentsVisible="documentsVisible"
        @closeDocDialog='closeDocDialog'
        :selectData="selectData"
        :applicationId="applicationId"
        :customerName="customerName">
      </undersign>
    </div>
  </div>
</template>

<script>
import { baseApi } from "../../../js/server";
import undersign from './undersign';
export default {
  name: 'sign',
  props: {
    applicationId: {
      type: String,
      default: ''
    },
    customerName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 面签 - 产品面签列表
      check_interviewData: [],
      selectData: [],
      faceCheckTime: 0, // 查询面核次数
      documentsVisible: false // 资料签署的显示与隐藏
    };
  },
  methods: {
    // 查询产品面签列表
    getProductInterview() {
      this.check_interviewData = [];
      this.$MyFetch.get(baseApi.productInterview + this.applicationId + "/list", {})
        .then(res => {
          res.forEach((item, index) => {
            this.check_interviewData.push([item]);
          });
          // console.log(this.check_interviewData);
        }).catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    documentSign(_selectData) {
      this.selectData = _selectData;
      this.documentsVisible = true;
    },
    // 面签点击下一步
    faceCheck_last() {
      // interviewStatus都不为待面签资料，则通过
      let isPass = this.check_interviewData.find(v => {
        return v[0].interviewStatus !== "waitting_interview";
      });
      if (!isPass) {
        this.confirmFn("产品资料签署还未完成", "error");
        return;
      }
      // not_meet_pricing_strategy 都不符合定价策略，说明业务否决，跳转到已处理界面
      let isPass1 = this.check_interviewData.find(v => {
        return v[0].interviewStatus === "not_meet_pricing_strategy";
      });
      if (isPass1) {
        this.confirmFn("产品不符合定价策略，此笔业务已否决", "error");
        this.$router.push({ name: "face2face-disposed" });
        // return;
      }
      // 进入下一步
      this.$emit('currentStepAdd');
    },
    faceCheckHandleWatcher() {
      this.$on('faceCheckHandle', () => {
        this.faceCheck_last();
      });
    },
    closeDocDialog(_clickClose) {
      this.documentsVisible = false;
      if (!_clickClose) {
        this.getProductInterview();
      }
    }
  },
  created() {
    this.getProductInterview();
    this.faceCheckHandleWatcher();
  },
  filters: {
    // 特殊产品字段返回
    rounding(value) {
      return value.toFixed(6);
    },
    rounding2(value) {
      return value.toFixed(2);
    }
  },
  components: {
    undersign
  }
};
</script>
<style lang="less" scoped>
 .check-resultData {
   padding: 20px;
   height: 100%;
   background-color: #fff;
   box-shadow: 0 2px 6px 0 rgba(0,0,0,0.08);
   .el-table {
     margin-top: 26px;
     border: 1px solid #e9e9e9;
   }
 }
</style>
