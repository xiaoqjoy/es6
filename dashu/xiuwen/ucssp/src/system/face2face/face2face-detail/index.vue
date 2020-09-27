<template>
  <el-dialog class="face2face-detail" title="详情" :visible="dialogVisible" width="1200px" @open="openFn" @close="closeDialog" :close-on-click-modal="false" center>

    <!-- 拖动弹框组件 -->
    <popup :isShowDialog="isShowCredit" :url="creditReport" :isReport="true" :iframe="true" :center="true" :width="800" :height="700" @closeDialog="isShowCredit = false"></popup>

    <div class="nav">
      <ul>
        <li :class="{active: currentTab === 0}" @click="currentTab = 0">面核信息</li>
        <li :class="{active: currentTab === 1}" @click="getf2fConfirmInfo" v-if="isSubmit">面核结论</li>
      </ul>
    </div>

    <div class="nav-content" v-if="dialogVisible">
      <div class="nav-content1" v-if="currentTab === 0">
        <div class="check-tabs">
          <el-tabs v-model="checkTabs" @tab-click="checkTabsClick">
            <el-tab-pane label="客户信息" name="customers-info"></el-tab-pane>
            <el-tab-pane label="产品信息" name="product-info"></el-tab-pane>
            <el-tab-pane label="历史贷款记录" name="loans-records"></el-tab-pane>
            <!-- <el-tab-pane label="收款账户信息管理" name="check-bank"></el-tab-pane> -->
          </el-tabs>
          <div class="check-tabs-btn">
            <el-button type="text" @click="$showImage(applicationId, '柜面面签', {ReadOnly: '0'})">影像资料</el-button>
            <el-button type="text" @click="showCredit">查看征信报告</el-button>
          </div>
        </div>
        <div class="check-component">
          <component :is="checkTabs" :applicationIdDetail="applicationId" :isDetail="true"></component>
          <!-- <router-view></router-view> -->
        </div>
      </div>
      <div class="nav-content2" v-if="currentTab === 1 && isSubmit">
        <div class="check-resultData">
          <el-table v-for="(item,index) in check_resultData.productInterviewList" :key="item.productId" :data="item" style="width: 100%">
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
          </el-table>
        </div>

        <div class="check-idea">
          <div class="info-title">面核意见</div>
          <ul>
            <li v-for="(item,index) in check_resultData.opnionDetail" :key="index">
              <span>{{item}}</span>
            </li>
          </ul>
        </div>

        <div class="check-remark">
          <div class="info-title">备注</div>
          <el-input type="textarea" :rows="5" v-model="check_resultData.opnionRemark" :disabled="true"></el-input>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import productInfo from "../face2face-undisposed/product-info/index"; // 产品信息组件
import customersInfo from "../face2face-undisposed/customers-info/index"; // 客户信息组件
import loansRecords from "../face2face-undisposed/loans-records/index"; // 历史贷款记录组件
import checkBank from "../face2face-undisposed/check-bank/index"; // 历史贷款记录组件
import popup from "@components/popup/index"; // 拖动弹框组件
import { baseApi } from "../js/server.js";

export default {
  name: "face2face-detail",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    applicationId: {
      type: String,
      default: ""
    }
  },
  components: {
    productInfo,
    customersInfo,
    loansRecords,
    checkBank,
    popup
  },
  data() {
    return {
      currentTab: 0, // 当前tab
      isSubmit: false, // 面签是否已经提交，为true则有面核结论

      isShowCredit: false, // 查看征信报告弹框的显示与隐藏
      creditReport: "", // 征信报告url

      // 面核
      checkTabs: "customers-info", // 面核当前的tab, 面核当前的组件["customers-info","product-info","loans-records","check-bank"]
      checkDimens: [], // 面签意见话术库
      remark: "",

      // 结果确认，产品1，2列表数据
      check_resultData: {
        productInterviewList: [],
        opnionDetail: [],
        opnionRemark: ""
      }
    };
  },
  created() {},
  methods: {
    // 显示详情组件触发的事件
    openFn() {
      // 跳转子路由，传递参数
      this.checkTabs = "customers-info";
      // this.toRouter("disposed-customers-info");

      // 获取产品信息数据
      // this.$refs['product-info'].$emit("getAllInfo");

      // 查看面签是否已经提交
      this.isSubmitFn();
    },

    // 跳转子路由，传递参数
    // toRouter(name) {
    //   let query = { applicationId: this.applicationId, isDetail: true };

    //   // console.log(this.$route.name); // 判断"counter-f2f"和"face2face-disposed"
    //   if (this.$route.name.indexOf("counter-f2f") > -1) {
    //     name = "counter-f2f-" + name;
    //   }

    //   this.$router.push({ name, query });
    // },
    // 面核的tab切换事件
    checkTabsClick(tab, event) {
      // this.toRouter(tab.name);
    },

    // 查看征信报告
    showCredit() {
      this.$getCreditReport('counterF2F', this.applicationId).then(res => {
        this.creditReport = res;
        this.isShowCredit = true;
      });
    },
    // 查询面核面签确认页面信息
    getf2fConfirmInfo() {
      this.currentTab = 1;
      this.$MyFetch
        .get(baseApi.f2fConfirmInfo + this.applicationId)
        .then(res => {
          // console.log(res);

          this.check_resultData = JSON.parse(JSON.stringify(res));

          this.check_resultData.productInterviewList = [];
          res.productInterviewList.forEach((item, index) => {
            this.check_resultData.productInterviewList.push([item]);
          });
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 查看面签是否已经提交
    isSubmitFn() {
      this.$MyFetch
        .get(baseApi.is_submit + this.applicationId)
        .then(res => {
          // console.log(res);
          this.isSubmit = res;
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },

    // 关闭dialog对话框，触发父组件closeDialog事件
    closeDialog() {
      this.currentTab = 0;
      this.$emit("closeDialog");
    }
  },
  filters: {
          rounding (value) {
          return value.toFixed(6);
          },
          rounding2 (value) {
          return value.toFixed(2);
          }
      }
};
</script>

<style lang="less">
</style>

<style lang="less" scoped>
.face2face-detail {
  .nav {
    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80px;
      li {
        font-size: 18px;
        margin: 0 20px;
        padding: 10px 0;
        cursor: pointer;
        &.active,
        &:hover {
          color: @blue-light;
          border-bottom: 2px solid @blue-light;
        }
      }
    }
  }

  .nav-content {
    .nav-content1 {
      // width: 812px;
      .boxShadow(0, 20px);
      .check-tabs {
        position: relative;
        .check-tabs-btn {
          position: absolute;
          top: 0;
          right: 20px;
          .el-button {
          }
        }
      }
      .check-component {
        .scroll(500px);
        > div {
          width: 100%;
        }
      }
    }

    .nav-content2 {
      > div {
        .boxShadow(0, 30px);
        margin-top: 20px;
        .info-title {
          padding: 15px 0;
          //.border(bottom,@gray);
          .selectorBefore(16px);
        }
      }

      .check-resultData {
        .boxShadow(20px, 30px);
        .el-table {
          border: 1px solid #eee;
          //&:last-child {
          margin-top: 20px;
          //}
        }
      }
      .check-idea {
        ul {
          li {
            padding: 20px;
            span {
              &:nth-child(1) {
              }
              &:nth-child(2) {
                color: #3f3f3f;
              }
            }
          }
        }
      }
      .check-remark {
        padding-bottom: 30px;
      }
    }
  }
}
</style>
