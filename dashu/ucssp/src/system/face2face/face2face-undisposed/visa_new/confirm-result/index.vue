<template>
  <div class="face confirm-result">
    <div class="confirm-resultData">
      <el-table class="common__table" v-for="(item,index) in check_resultData.productInterviewList"
      :key="item.productId" :data="item" style="width: 100%">
        <el-table-column prop="productId" :label="`产品ID${(index + 1)}`" width="200"></el-table-column>
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
        <el-table-column prop="interviewStatusDesc" :label="`产品ID${(index + 1)}面签结论`" width="200"></el-table-column>
        <el-table-column prop="riskRateLevel" label="定价档次" width="200"></el-table-column>
        <el-table-column prop="pricingGrade" label="定价类型" width="200"></el-table-column>
        <el-table-column label="合作机构年化利率%（年）" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.partnerAnnualRate !== null">{{scope.row.partnerAnnualRate  | rounding}}</span>
          </template>
        </el-table-column>
        <el-table-column label="担保费率%（月）" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.guaranteeRate !== null">{{scope.row.guaranteeRate  | rounding2}}</span>
          </template>
        </el-table-column>
        <el-table-column label="评审费率%（一次性收取）" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.reviewRate !== null">{{scope.row.reviewRate  | rounding2}}</span>
          </template>
        </el-table-column>
        <el-table-column label="保费费率%（一次性收取）" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.premiumRate !== null">{{scope.row.premiumRate  | rounding2}}</span>
          </template>
        </el-table-column>
        <el-table-column label="咨询费率%（一次性收取）" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.consultingRate !== null">{{scope.row.consultingRate  | rounding2}}</span>
          </template>
        </el-table-column>
        <el-table-column label="管理费率%（月）" width="200">
          <template slot-scope="scope">
            <span v-if="scope.row.managementFeeRate !== null">{{scope.row.managementFeeRate  | rounding2}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="confirm-idea">
      <div class="info-title">面核意见</div>
        <ul>
          <li v-for="(item,index) in check_resultData.opnionDetail" :key="index">
            <span>{{item}}</span>
          </li>
        </ul>
    </div>
    <div class="confirm-remark">
      <div class="info-title">备注</div>
      <el-input type="textarea" :rows="5" v-model="check_resultData.opnionRemark"></el-input>
    </div>
    <div class="check-remark">
      <div class="conclusion" style="padding: 20px 0">
        <label>外网查询结论：</label>
        <el-select placeholder="请选择" v-model="check_resultData.extraNetStatusCode">
          <el-option v-for="item in extranetStatusCodes" :key="item.itemCode" :label="item.itemDesc" :value="item.itemCode"></el-option>
        </el-select>
      </div>
      <div class="remark">
        <el-input type="textarea" maxlength="500" placeholder="请输入外网查询备注" :rows="5" v-model="check_resultData.remark"></el-input>
      </div>
    </div>
  </div>
</template>

<script>
import { baseApi } from "../../../js/server";
export default {
  name: 'sign',
  props: {
    applicationId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 结果确认，产品1，2列表数据
      check_resultData: {
        productInterviewList: [],
        opnionDetail: [],
        opnionRemark: "",
        aplExtranetInfo: {}
      },
      extranetStatusCodes: []
    };
  },
  methods: {
    // 查询面核面签确认页面信息
    getf2fConfirmInfo() {
      this.$MyFetch.get(baseApi.f2fConfirmInfo + this.applicationId)
        .then(res => {
          this.check_resultData = JSON.parse(JSON.stringify(res));
          if (!this.check_resultData.aplExtranetInfo) {
            this.check_resultData.aplExtranetInfo = {};
          } else {
            this.$set(this.check_resultData, 'extraNetStatusCode', this.check_resultData.aplExtranetInfo.extranetStatusCode);
            this.$set(this.check_resultData, 'remark', this.check_resultData.aplExtranetInfo.remark);
          }
          this.check_resultData.productInterviewList = [];
          res.productInterviewList.forEach((item, index) => {
            this.check_resultData.productInterviewList.push([item]);
          });
        }).catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    confirmHandleWather() {
      this.$on('confirmHandle', () => {
        this.confirmFinfsh();
      });
    },
    confirmFinfsh() {
      if (!this.check_resultData.extraNetStatusCode) {
        this.confirmFn("请先选择外网查询结论", "error");
        return;
      }
      this.confirmFn("确认提交", "warning").then(() => {
        const loading = this.$loading({
          text: "",
          spinner: "",
          background: "transparent"
        });
        this.$MyFetch.post(baseApi.face_submit + this.applicationId + "/submit", {
            opnionRemark: this.check_resultData.opnionRemark,
            extraNetStatusCode: this.check_resultData.extraNetStatusCode,
            remark: this.check_resultData.remark,
            taskNodeCode: 'faceToFaceTask'
          }).then(res => {
            loading.close();
            this.confirmFn("面核面签已完成", "success");
            this.$router.push({ name: "face2face-undisposed" });
          }).catch(err => {
            console.error(err);
            this.confirmFn(err.message, "error");
            loading.close();
            /**
             * code为CPMS000422时，产品不符合定价策略，此笔业务已否决
             * code为CPMS000404时，面核话术库不通过，贷款申请已否决
             * code为CPMS000405时，面核话术库不通过，贷款申请已否决
             * 改成统一用CPMS000499判断
             */
            if (err.code === "CPMS000499" || err.code === "CPMS000422" || err.code === "CPMS000404" || err.code === "CPMS000405") {
              this.$router.push({ name: "face2face-disposed" });
            }
          });
      });
    }
  },
  created() {
    this.getf2fConfirmInfo();
    this.confirmHandleWather();
    this.$getDictCode("extranet_status_code")
      .then(data => {
        this.extranetStatusCodes = data;
      })
      .catch(e => {
        this.$error(e.message);
      });
  },
  filters: {
    // 特殊产品字段返回
    rounding(value) {
      return value.toFixed(6);
    },
    rounding2(value) {
      return value.toFixed(2);
    }
  }
};
</script>
<style lang="less" scoped>
.face.confirm-result {
  .confirm-resultData {
    padding: 20px;
    height: 100%;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(0,0,0,0.08);
    .el-table {
      margin-top: 26px;
      border: 1px solid #e9e9e9;
    }
  }
  .confirm-idea, .confirm-remark {
    .boxShadow(0, 30px);
    margin-top: 20px;
    .info-title {
      padding: 15px 0;
      .selectorBefore(16px);
    }
  }
  .confirm-idea {
    ul > li {
      padding: 20px;
      span {
        &:nth-child(2) {
          color: #3f3f3f;
        }
      }
    }
  }
  .confirm-remark {
    padding-bottom: 30px;
  }
}
</style>
