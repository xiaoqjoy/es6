<template>
  <div class="content_table_box">
    <div class="bottom-content" v-if="workNameAttention.length > 0">
      <div class="clearfix">
        <div class="content__title">
          <span class="font_gray">匹配方式:</span>
          <span v-if="workNameAttention.length > 0">{{workNameAttention[0].matchModeCode}}</span>
        </div>
        <div class="content__title">
          <span class="font_gray">匹配信息:</span>
          <span v-if="workNameAttention.length > 0">{{workNameAttention[0].matchInfoTxt}}</span>
        </div>
        <div class="content__title">
          <span class="font_gray">单位名称:</span>
          <span v-if="workNameAttention.length > 0" :style="'color:'+workName+';'">{{workNameAttention[0].workplaceName}}</span>
        </div>
      </div>

      <div class="eltables">
        <el-table :data="workNameAttentionList" style="width:100%">
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column prop="relatedName" label="关联人" width="170"></el-table-column>
            <el-table-column label="单位名称" width="120">
              <template slot-scope="scope">
                <p :style="'color:'+(scope.row.relatedWorkplaceName===workNameAttention[0].workplaceName?'':'red')+';'">
                  {{scope.row.relatedWorkplaceName}}
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="finalTaskDefKey" label="终审阶段" width="120"></el-table-column>
            <el-table-column prop="finalOpinionResultCode" label="终审结论" width="130"></el-table-column>
            <el-table-column prop="finalRejectReasonCode" label="终审否决原因" width="130"></el-table-column>
            <el-table-column prop="putoutApproveInd1" label="放款状态1" width="130"></el-table-column>
            <el-table-column prop="rejectCode1" label="放款否决原因1" width="130"></el-table-column>
            <el-table-column prop="repaymentStatus1" label="还款状态1" width="130"></el-table-column>
            <el-table-column prop="repaymentTerm1" label="已还期数1" width="130"></el-table-column>
            <el-table-column prop="putoutApproveInd2" label="放款状态2" width="130"></el-table-column>
            <el-table-column prop="rejectCode2" label="放款否决原因2" width="130"></el-table-column>
            <el-table-column prop="repaymentStatus2" label="还款状态2" width="130"></el-table-column>
            <el-table-column prop="repaymentTerm2" label="已还期数2" width="130"></el-table-column>
            <el-table-column prop="oldApplicationId" label="申请编号" width="130"></el-table-column>
            <el-table-column prop="custManagerTxt" label="客户经理是否一致" width="140"></el-table-column>
            <el-table-column fixed="right" width="130" label="操作">
              <template slot-scope="scope">
                <el-button @click="goHistory(scope.row.oldApplicationId, scope.row.reportNum, scope.row.finalTaskDefKey)" type="text">查看详情</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="bottom-content" v-if="workFixedPhoneAttention.length > 0">
      <div class="clearfix">
        <div class="content__title">
          <span class="font_gray">匹配方式:</span>
          <span v-if="workFixedPhoneAttention.length > 0">{{workFixedPhoneAttention[0].matchModeCode}}</span>
        </div>
        <div class="content__title">
          <span class="font_gray">匹配信息:</span>
          <span v-if="workFixedPhoneAttention.length > 0">{{workFixedPhoneAttention[0].matchInfoTxt}}</span>
        </div>
        <div class="content__title">
          <span class="font_gray">单位名称:</span>
          <span v-if="workFixedPhoneAttention.length > 0" :style="'color:'+workFixed+';'">{{workFixedPhoneAttention[0].workplaceName}}</span>
        </div>
      </div>
      <div class="eltables">
        <el-table :data="workFixedPhoneAttentionList" style="width:100%">
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column prop="relatedName" label="关联人" width="170"></el-table-column>
            <el-table-column prop="relatedRelation" label="与关联人关系" width="170"></el-table-column>
            <el-table-column label="单位名称" width="120">
              <template slot-scope="scope">
                <p :style="'color:'+(scope.row.relatedWorkplaceName===workFixedPhoneAttention[0].workplaceName?'':'red')+';'">
                  {{scope.row.relatedWorkplaceName}}
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="finalTaskDefKey" label="终审阶段" width="120"></el-table-column>
            <el-table-column prop="finalOpinionResultCode" label="终审结论" width="130"></el-table-column>
            <el-table-column prop="finalRejectReasonCode" label="终审否决原因" width="130"></el-table-column>
            <el-table-column prop="putoutApproveInd1" label="放款状态1" width="130"></el-table-column>
            <el-table-column prop="rejectCode1" label="放款否决原因1" width="130"></el-table-column>
            <el-table-column prop="repaymentStatus1" label="还款状态1" width="130"></el-table-column>
            <el-table-column prop="repaymentTerm1" label="已还期数1" width="130"></el-table-column>
            <el-table-column prop="putoutApproveInd2" label="放款状态2" width="130"></el-table-column>
            <el-table-column prop="rejectCode2" label="放款否决原因2" width="130"></el-table-column>
            <el-table-column prop="repaymentStatus2" label="还款状态2" width="130"></el-table-column>
            <el-table-column prop="repaymentTerm2" label="已还期数2" width="130"></el-table-column>
            <el-table-column prop="oldApplicationId" label="申请编号" width="130"></el-table-column>
            <el-table-column prop="custManagerTxt" label="客户经理是否一致" width="140"></el-table-column>
            <el-table-column fixed="right" width="130" label="操作">
              <template slot-scope="scope">
                <el-button @click="goHistory(scope.row.oldApplicationId, scope.row.reportNum, scope.row.finalTaskDefKey)" type="text">查看详情</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="bottom-content" v-if="workAddressAttention.length > 0">
      <div class="clearfix">
        <div class="content__title">
          <span class="font_gray">匹配方式:</span>
          <span v-if="workAddressAttention.length > 0">{{workAddressAttention[0].matchModeCode}}</span>
        </div>
        <div class="content__title">
          <span class="font_gray">匹配信息:</span>
          <span v-if="workAddressAttention.length > 0">{{workAddressAttention[0].matchInfoTxt}}</span>
        </div>
        <div class="content__title">
          <span class="font_gray">单位名称:</span>
          <span v-if="workAddressAttention.length > 0" :style="'color:'+workAddress+';'">{{workAddressAttention[0].workplaceName}}</span>
        </div>
      </div>
      <div class="eltables">
        <el-table :data="workAddressAttentionList" style="width:100%">
          <el-table-column label="序号" type="index"></el-table-column>
          <el-table-column prop="relatedName" label="关联人" width="170"></el-table-column>
          <el-table-column label="单位名称" width="120">
            <template slot-scope="scope">
              <p :style="'color:'+(scope.row.relatedWorkplaceName===workAddressAttention[0].workplaceName?'':'red')+';'">
                {{scope.row.relatedWorkplaceName}}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="matchByInfoTxt" label="被匹配信息" width="170"></el-table-column>
          <el-table-column prop="relatedRelation" label="与关联人关系" width="170"></el-table-column>
          <el-table-column prop="finalTaskDefKey" label="终审阶段" width="120"></el-table-column>
          <el-table-column prop="finalOpinionResultCode" label="终审结论" width="130"></el-table-column>
          <el-table-column prop="finalRejectReasonCode" label="终审否决原因" width="130"></el-table-column>
          <el-table-column prop="putoutApproveInd1" label="放款状态1" width="130"></el-table-column>
          <el-table-column prop="rejectCode1" label="放款否决原因1" width="130"></el-table-column>
          <el-table-column prop="repaymentStatus1" label="还款状态1" width="130"></el-table-column>
          <el-table-column prop="repaymentTerm1" label="已还期数1" width="130"></el-table-column>
          <el-table-column prop="putoutApproveInd2" label="放款状态2" width="130"></el-table-column>
          <el-table-column prop="rejectCode2" label="放款否决原因2" width="130"></el-table-column>
          <el-table-column prop="repaymentStatus2" label="还款状态2" width="130"></el-table-column>
          <el-table-column prop="repaymentTerm2" label="已还期数2" width="130"></el-table-column>
          <el-table-column prop="oldApplicationId" label="申请编号" width="130"></el-table-column>
          <el-table-column prop="custManagerTxt" label="客户经理是否一致" width="140"></el-table-column>
          <el-table-column fixed="right" width="130" label="操作">
            <template slot-scope="scope">
              <el-button @click="goHistory(scope.row.oldApplicationId, scope.row.reportNum, scope.row.finalTaskDefKey)" type="text">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="bottom-content" v-if="phoneAttention.length > 0" v-for="(item, index) in phoneAttention" :key="index">
      <div class="clearfix">
        <div class="content__title">
          <span class="font_gray">匹配方式:</span>
          <span v-if="phoneAttention.length > 0">{{phoneAttention[index].matchModeCode}}</span>
        </div>
        <div class="content__title">
          <span class="font_gray">匹配信息:</span>
          <span v-if="phoneAttention.length > 0">{{phoneAttention[index].matchInfoTxt}}</span>
        </div>
        <div class="content__title">
          <span class="font_gray">匹配人:</span>
          <span v-if="phoneAttention.length > 0" :style="'color:'+phone[index]+';'">{{phoneAttention[index].matchContactTxt}}</span>
        </div>
        <div class="content__title">
          <span class="font_gray">与借款人的关系:</span>
          <span v-if="phoneAttention.length > 0">{{phoneAttention[index].relationshipCode}}</span>
        </div>
      </div>
      <div class="eltables">
        <el-table :data="item.attentionMatchArray" style="width:100%">
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column prop="relatedName" label="关联人" width="170"></el-table-column>
            <el-table-column label="被匹配对象" width="170">
              <template slot-scope="scope">
                <p :style="'color:'+(scope.row.matchObjectTxt===phoneAttention[index].matchContactTxt?'':'red')+';'">
                  {{scope.row.matchObjectTxt}}
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="relatedRelation" label="与关联人关系" width="170"></el-table-column>
            <el-table-column prop="finalTaskDefKey" label="终审阶段" width="120"></el-table-column>
            <el-table-column prop="finalOpinionResultCode" label="终审结论" width="130"></el-table-column>
            <el-table-column prop="finalRejectReasonCode" label="终审否决原因" width="130"></el-table-column>
            <el-table-column prop="putoutApproveInd1" label="放款状态1" width="130"></el-table-column>
            <el-table-column prop="rejectCode1" label="放款否决原因1" width="130"></el-table-column>
            <el-table-column prop="repaymentStatus1" label="还款状态1" width="130"></el-table-column>
            <el-table-column prop="repaymentTerm1" label="已还期数1" width="130"></el-table-column>
            <el-table-column prop="putoutApproveInd2" label="放款状态2" width="130"></el-table-column>
            <el-table-column prop="rejectCode2" label="放款否决原因2" width="130"></el-table-column>
            <el-table-column prop="repaymentStatus2" label="还款状态2" width="130"></el-table-column>
            <el-table-column prop="repaymentTerm2" label="已还期数2" width="130"></el-table-column>
            <el-table-column prop="oldApplicationId" label="申请编号" width="130"></el-table-column>
            <el-table-column prop="custManagerTxt" label="客户经理是否一致" width="140"></el-table-column>
            <el-table-column fixed="right" width="130" label="操作">
              <template slot-scope="scope">
                <el-button @click="goHistory(scope.row.oldApplicationId, scope.row.reportNum, scope.row.finalTaskDefKey)" type="text">查看详情</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="bottom-content" v-if="houseAddressAttention.length > 0">
      <div class="clearfix">
        <div class="content__title">
          <span class="font_gray">匹配方式:</span>
          <span v-if="houseAddressAttention.length > 0">{{houseAddressAttention[0].matchModeCode}}</span>
        </div>
        <div class="content__title">
          <span class="font_gray">匹配信息:</span>
          <span v-if="houseAddressAttention.length > 0" :style="'color:'+houseAdd+';'">{{houseAddressAttention[0].matchInfoTxt}}</span>
        </div>
      </div>
      <div class="eltables">
        <el-table :data="houseAddressAttentionList" style="width:100%">
            <el-table-column label="序号" type="index"></el-table-column>
            <el-table-column prop="relatedName" label="关联人" width="170"></el-table-column>
            <el-table-column label="被匹配信息" width="170">
              <template slot-scope="scope">
                <p :style="'color:'+(scope.row.matchByInfoTxt===houseAddressAttention[0].matchInfoTxt?'':'red')+';'">
                  {{scope.row.matchByInfoTxt}}
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="relatedRelation" label="与关联人关系" width="170"></el-table-column>
            <el-table-column prop="finalTaskDefKey" label="终审阶段" width="120"></el-table-column>
            <el-table-column prop="finalOpinionResultCode" label="终审结论" width="130"></el-table-column>
            <el-table-column prop="finalRejectReasonCode" label="终审否决原因" width="130"></el-table-column>
            <el-table-column prop="putoutApproveInd1" label="放款状态1" width="130"></el-table-column>
            <el-table-column prop="rejectCode1" label="放款否决原因1" width="130"></el-table-column>
            <el-table-column prop="repaymentStatus1" label="还款状态1" width="130"></el-table-column>
            <el-table-column prop="repaymentTerm1" label="已还期数1" width="130"></el-table-column>
            <el-table-column prop="putoutApproveInd2" label="放款状态2" width="130"></el-table-column>
            <el-table-column prop="rejectCode2" label="放款否决原因2" width="130"></el-table-column>
            <el-table-column prop="repaymentStatus2" label="还款状态2" width="130"></el-table-column>
            <el-table-column prop="repaymentTerm2" label="已还期数2" width="130"></el-table-column>
            <el-table-column prop="oldApplicationId" label="申请编号" width="130"></el-table-column>
            <el-table-column prop="custManagerTxt" label="客户经理是否一致" width="140"></el-table-column>
            <el-table-column fixed="right" width="130" label="操作">
              <template slot-scope="scope">
                <el-button @click="goHistory(scope.row.oldApplicationId, scope.row.reportNum, scope.row.finalTaskDefKey)" type="text">查看详情</el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 历史贷款记录 -->
    <div v-if="dialogVisible">
      <div class="dialog-mask"></div>
      <face2face-detail class="history-face" :dialogVisible="dialogVisible" :applicationId="oldApplicationId" :creditReportId="creditReportId" @closeDialog="dialogVisible = false" :width="dilogWidth" :isSurvey="true"></face2face-detail>
    </div>
  </div>
</template>

<script>
import { aprAudApi } from "../../js/server.js";
import { getSystemName } from "../../js/utils.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      creditReportId: "",
      oldApplicationId: "",
      dialogVisible: false, // 面签详情
      url: "",
      // 居住地址
      houseAddressAttention: [],
      houseAddressAttentionList: [],
      houseAdd: "",
      // 单位名称
      workNameAttention: [],
      workNameAttentionList: [],
      workName: "",
      // 单位电话
      workFixedPhoneAttention: [],
      workFixedPhoneAttentionList: [],
      workFixed: "",
      // 单位地址
      workAddressAttention: [],
      workAddressAttentionList: [],
      workAddress: "",
      // 人事联系人
      phoneAttention: [],
      phoneAttentionList: [],
      phone: [],
      dilogWidth: 1200
    };
  },
  computed: {
    ...mapGetters(["applicationId"])
  },
  created() {
    this.getAttentionInfo();
  },
  methods: {
    goHistory(id, certificateId, type) {
      let query = { appID: id, isEdit: true, sourceSystem: getSystemName(), comeFrom: 'noPending' };
      if (type === "贷款审计") {
        this.$router.push({
          name: "audit-pending-start",
          query: query
        });
      } else if (type === "贷款审批") {
        this.$router.push({
          name: "approval-pending-start",
          query: query
        });
      } else {
        this.oldApplicationId = id;
        this.creditReportId = certificateId;
        if (window.screen.width > 1280) {
          this.dilogWidth = 1200;
        } else {
          this.dilogWidth = 964;
        }
        this.dialogVisible = true;
        var timer = setInterval(function() {
          if (document.getElementsByClassName("v-modal")[0]) {
            document
              .getElementsByClassName("v-modal")[0]
              .setAttribute("style", "z-index: 400!important");
            clearInterval(timer);
          }
        }, 500);
      }
    },
    getAttentionInfo() {
      this.url = `${aprAudApi.attentionInfo}/${this.applicationId}`;
      let data = {
        readonlyFlg: true
      };
      this.$MyFetch.get(this.url, data).then((data = {}) => {
        if (data.houseAddressAttention.length > 0) {
          this.houseAddressAttention = data.houseAddressAttention;
          this.houseAddressAttentionList =
            data.houseAddressAttention[0].attentionMatchArray;
          this.houseAddressAttentionList.splice(10, 100);
          for (let i = 0; i < this.houseAddressAttentionList.length; i++) {
            if (
              this.houseAddressAttentionList[i].matchByInfoTxt !==
              this.houseAddressAttention.matchInfoTxt
            ) {
              this.houseAdd = "red";
            }
          }
        }
        if (data.workNameAttention.length > 0) {
          this.workNameAttention = data.workNameAttention;
          this.workNameAttentionList =
            data.workNameAttention[0].attentionMatchArray;
          this.workNameAttentionList.splice(10, 100);
          for (let i = 0; i < this.workNameAttentionList.length; i++) {
            if (
              this.workNameAttentionList[i].relatedWorkplaceName !==
              this.workNameAttention.workplaceName
            ) {
              this.workName = "red";
            }
          }
        }
        if (data.workFixedPhoneAttention.length > 0) {
          this.workFixedPhoneAttention = data.workFixedPhoneAttention;
          this.workFixedPhoneAttentionList =
            data.workFixedPhoneAttention[0].attentionMatchArray;
          this.workFixedPhoneAttentionList.splice(10, 100);
          for (let i = 0; i < this.workFixedPhoneAttentionList.length; i++) {
            if (
              this.workFixedPhoneAttentionList[i].relatedWorkplaceName !==
              this.workFixedPhoneAttention.workplaceName
            ) {
              this.workFixed = "red";
            }
          }
        }
        if (data.workAddressAttention.length > 0) {
          this.workAddressAttention = data.workAddressAttention;
          this.workAddressAttentionList =
            data.workAddressAttention[0].attentionMatchArray;
          this.workAddressAttentionList.splice(10, 100);
          for (let i = 0; i < this.workAddressAttentionList.length; i++) {
            if (
              this.workAddressAttentionList[i].relatedWorkplaceName !==
              this.workAddressAttention.workplaceName
            ) {
              this.workAddress = "red";
            }
          }
        }
        if (data.phoneAttention.length > 0) {
          this.phoneAttention = data.phoneAttention;
          for (let i = 0; i < this.phoneAttention.length; i++) {
            this.phoneAttention[i].attentionMatchArray.splice(10, 100);
            for (
              let k = 0;
              k < this.phoneAttention[i].attentionMatchArray.length;
              k++
            ) {
              if (
                this.phoneAttention[i].attentionMatchArray[k].matchObjectTxt !==
                this.phoneAttention[i].matchContactTxt
              ) {
                this.phone.push("red");
                break;
              }
              if (
                this.phoneAttention[i].attentionMatchArray.length >
                this.phone.length
              ) {
                this.phone.push("");
                break;
              }
            }
          }
        }
      }).catch((err) => {
        this.$error(err.message);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.strong {
  font-weight: bold;
}
.content_table_box {
  .bottom-content {
    .content__title {
      font-size: 14px;
      float: left;
      margin-right: 57px;
    }
    .font_gray {
      color: #666;
      line-height: 20px;
    }
    .my__table {
      margin-top: 20px;
      line-height: 30px;
      border: 1px solid #d0d0d0;
      min-width: 100%;
      .my__table__th {
        border-bottom: 1px solid #d0d0d0;
        font-size: 12px;
        color: #666;
      }
      .my__table__tbody {
        height: 150px;
        > tr {
          border-bottom: 1px solid #d0d0d0;
        }
      }
    }
    .table thead tr {
      display: block;
    }
    .table tbody {
      font-size: 14px;
      display: block;
      height: 200px;
    }
    .table th {
      min-width: 100px;
    }
    .table td {
      min-width: 100px;
    }
    .table__box {
      overflow: auto;
      display: block;
    }
  }
}
.clearfix{
  padding: 20px 0;
}
</style>
