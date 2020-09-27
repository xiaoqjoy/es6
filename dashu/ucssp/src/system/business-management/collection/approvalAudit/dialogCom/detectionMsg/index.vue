<template>
  <div>
    <div class="detection-msg">
      <div class="dialog-mask"></div>
      <div class="dialog-box">
        <div class="dialog-box__top">
          <h5 class="title">关注信息检测</h5>
          <!-- <span class="el-icon-close button button__close" @click="close_()"></span> -->
        </div>
        <div class="dialog-box__bottom">
          <div class="bottom-content" v-if="workNameAttention.length > 0">
            <div class="clearfix bottom-content_title">
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
                <span
                  v-if="workNameAttention.length > 0"
                  :style="'color:'+workName+';'"
                >{{workNameAttention[0].workplaceName}}</span>
              </div>
            </div>
            <div class="eltables">
              <el-table :data="workNameAttentionList" style="width:100%">
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column prop="relatedName" label="关联人" width="170"></el-table-column>
                <el-table-column label="单位名称" width="200">
                  <template slot-scope="scope">
                    <p
                      :style="'color:'+(scope.row.relatedWorkplaceName===workNameAttention[0].workplaceName?'':'red')+';'"
                    >{{scope.row.relatedWorkplaceName}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="finalTaskDefKey" label="终审阶段" width="120"></el-table-column>
                <el-table-column prop="finalOpinionResultCode" label="终审结论" width="130"></el-table-column>
                <el-table-column prop="finalRejectReasonCode" label="终审否决原因" width="200"></el-table-column>
                <el-table-column prop="putoutApproveInd1" label="放款状态1" width="130"></el-table-column>
                <el-table-column prop="rejectCode1" label="放款否决原因1" width="200"></el-table-column>
                <el-table-column prop="repaymentStatus1" label="还款状态1" width="130"></el-table-column>
                <el-table-column prop="repaymentTerm1" label="已还期数1" width="130"></el-table-column>
                <el-table-column prop="putoutApproveInd2" label="放款状态2" width="130"></el-table-column>
                <el-table-column prop="rejectCode2" label="放款否决原因2" width="200"></el-table-column>
                <el-table-column prop="repaymentStatus2" label="还款状态2" width="130"></el-table-column>
                <el-table-column prop="repaymentTerm2" label="已还期数2" width="130"></el-table-column>
                <el-table-column prop="oldApplicationId" label="申请编号" width="160"></el-table-column>
                <el-table-column prop="custManagerTxt" label="客户经理是否一致" width="150"></el-table-column>
                <el-table-column fixed="right" width="130" label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="goHistory(scope.row.oldApplicationId, scope.row.reportNum, scope.row.finalTaskDefKey)"
                      type="text"
                    >查看详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="bottom-content" v-if="workFixedPhoneAttention.length > 0">
            <div class="clearfix bottom-content_title">
              <div class="content__title">
                <span class="font_gray">匹配方式:</span>
                <span
                  v-if="workFixedPhoneAttention.length > 0"
                >{{workFixedPhoneAttention[0].matchModeCode}}</span>
              </div>
              <div class="content__title">
                <span class="font_gray">匹配信息:</span>
                <span
                  v-if="workFixedPhoneAttention.length > 0"
                >{{workFixedPhoneAttention[0].matchInfoTxt}}</span>
              </div>
              <div class="content__title">
                <span class="font_gray">单位名称:</span>
                <span
                  v-if="workFixedPhoneAttention.length > 0"
                  :style="'color:'+workFixed+';'"
                >{{workFixedPhoneAttention[0].workplaceName}}</span>
              </div>
            </div>
            <div class="eltables">
              <el-table :data="workFixedPhoneAttentionList" style="width:100%">
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column prop="relatedName" label="关联人" width="170"></el-table-column>
                <el-table-column prop="relatedRelation" label="与关联人关系" width="170"></el-table-column>
                <el-table-column label="单位名称" width="200">
                  <template slot-scope="scope">
                    <p
                      :style="'color:'+(scope.row.relatedWorkplaceName===workFixedPhoneAttention[0].workplaceName?'':'red')+';'"
                    >{{scope.row.relatedWorkplaceName}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="finalTaskDefKey" label="终审阶段" width="120"></el-table-column>
                <el-table-column prop="finalOpinionResultCode" label="终审结论" width="130"></el-table-column>
                <el-table-column prop="finalRejectReasonCode" label="终审否决原因" width="200"></el-table-column>
                <el-table-column prop="putoutApproveInd1" label="放款状态1" width="130"></el-table-column>
                <el-table-column prop="rejectCode1" label="放款否决原因1" width="200"></el-table-column>
                <el-table-column prop="repaymentStatus1" label="还款状态1" width="130"></el-table-column>
                <el-table-column prop="repaymentTerm1" label="已还期数1" width="130"></el-table-column>
                <el-table-column prop="putoutApproveInd2" label="放款状态2" width="130"></el-table-column>
                <el-table-column prop="rejectCode2" label="放款否决原因2" width="200"></el-table-column>
                <el-table-column prop="repaymentStatus2" label="还款状态2" width="130"></el-table-column>
                <el-table-column prop="repaymentTerm2" label="已还期数2" width="130"></el-table-column>
                <el-table-column prop="oldApplicationId" label="申请编号" width="160"></el-table-column>
                <el-table-column prop="custManagerTxt" label="客户经理是否一致" width="150"></el-table-column>
                <el-table-column fixed="right" width="130" label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="goHistory(scope.row.oldApplicationId, scope.row.reportNum, scope.row.finalTaskDefKey)"
                      type="text"
                    >查看详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="bottom-content" v-if="workAddressAttention.length > 0">
            <div class="clearfix bottom-content_title">
              <div class="content__title">
                <span class="font_gray">匹配方式:</span>
                <span
                  v-if="workAddressAttention.length > 0"
                >{{workAddressAttention[0].matchModeCode}}</span>
              </div>
              <div class="content__title">
                <span class="font_gray">匹配信息:</span>
                <span
                  v-if="workAddressAttention.length > 0"
                >{{workAddressAttention[0].matchInfoTxt}}</span>
              </div>
              <div class="content__title">
                <span class="font_gray">单位名称:</span>
                <span
                  v-if="workAddressAttention.length > 0"
                  :style="'color:'+workAddress+';'"
                >{{workAddressAttention[0].workplaceName}}</span>
              </div>
            </div>
            <div class="eltables">
              <el-table :data="workAddressAttentionList" style="width:100%">
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column prop="relatedName" label="关联人" width="170"></el-table-column>
                <el-table-column label="单位名称" width="200">
                  <template slot-scope="scope">
                    <p
                      :style="'color:'+(scope.row.relatedWorkplaceName===workAddressAttention[0].workplaceName?'':'red')+';'"
                    >{{scope.row.relatedWorkplaceName}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="matchByInfoTxt" label="被匹配信息" width="170"></el-table-column>
                <el-table-column prop="relatedRelation" label="与关联人关系" width="170"></el-table-column>
                <el-table-column prop="finalTaskDefKey" label="终审阶段" width="120"></el-table-column>
                <el-table-column prop="finalOpinionResultCode" label="终审结论" width="130"></el-table-column>
                <el-table-column prop="finalRejectReasonCode" label="终审否决原因" width="200"></el-table-column>
                <el-table-column prop="putoutApproveInd1" label="放款状态1" width="130"></el-table-column>
                <el-table-column prop="rejectCode1" label="放款否决原因1" width="200"></el-table-column>
                <el-table-column prop="repaymentStatus1" label="还款状态1" width="130"></el-table-column>
                <el-table-column prop="repaymentTerm1" label="已还期数1" width="130"></el-table-column>
                <el-table-column prop="putoutApproveInd2" label="放款状态2" width="130"></el-table-column>
                <el-table-column prop="rejectCode2" label="放款否决原因2" width="200"></el-table-column>
                <el-table-column prop="repaymentStatus2" label="还款状态2" width="130"></el-table-column>
                <el-table-column prop="repaymentTerm2" label="已还期数2" width="130"></el-table-column>
                <el-table-column prop="oldApplicationId" label="申请编号" width="160"></el-table-column>
                <el-table-column prop="custManagerTxt" label="客户经理是否一致" width="150"></el-table-column>
                <el-table-column fixed="right" width="130" label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="goHistory(scope.row.oldApplicationId, scope.row.reportNum, scope.row.finalTaskDefKey)"
                      type="text"
                    >查看详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div v-if="phoneAttention.length > 0">
            <div class="bottom-content" v-for="(item, index) in phoneAttention" :key="index">
              <div class="clearfix bottom-content_title">
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
                  <span
                    v-if="phoneAttention.length > 0"
                    :style="'color:'+phone[index]+';'"
                  >{{phoneAttention[index].matchContactTxt}}</span>
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
                      <p
                        :style="'color:'+(scope.row.matchObjectTxt===phoneAttention[index].matchContactTxt?'':'red')+';'"
                      >{{scope.row.matchObjectTxt}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column prop="relatedRelation" label="与关联人关系" width="170"></el-table-column>
                  <el-table-column prop="finalTaskDefKey" label="终审阶段" width="120"></el-table-column>
                  <el-table-column prop="finalOpinionResultCode" label="终审结论" width="130"></el-table-column>
                  <el-table-column prop="finalRejectReasonCode" label="终审否决原因" width="200"></el-table-column>
                  <el-table-column prop="putoutApproveInd1" label="放款状态1" width="130"></el-table-column>
                  <el-table-column prop="rejectCode1" label="放款否决原因1" width="200"></el-table-column>
                  <el-table-column prop="repaymentStatus1" label="还款状态1" width="130"></el-table-column>
                  <el-table-column prop="repaymentTerm1" label="已还期数1" width="130"></el-table-column>
                  <el-table-column prop="putoutApproveInd2" label="放款状态2" width="130"></el-table-column>
                  <el-table-column prop="rejectCode2" label="放款否决原因2" width="200"></el-table-column>
                  <el-table-column prop="repaymentStatus2" label="还款状态2" width="130"></el-table-column>
                  <el-table-column prop="repaymentTerm2" label="已还期数2" width="130"></el-table-column>
                  <el-table-column prop="oldApplicationId" label="申请编号" width="160"></el-table-column>
                  <el-table-column prop="custManagerTxt" label="客户经理是否一致" width="150"></el-table-column>
                  <el-table-column fixed="right" width="130" label="操作">
                    <template slot-scope="scope">
                      <el-button
                        @click="goHistory(scope.row.oldApplicationId, scope.row.reportNum, scope.row.finalTaskDefKey)"
                        type="text"
                      >查看详情</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <div class="bottom-content" v-if="houseAddressAttention.length > 0">
            <div class="clearfix bottom-content_title">
              <div class="content__title">
                <span class="font_gray">匹配方式:</span>
                <span
                  v-if="houseAddressAttention.length > 0"
                >{{houseAddressAttention[0].matchModeCode}}</span>
              </div>
              <div class="content__title">
                <span class="font_gray">匹配信息:</span>
                <span
                  v-if="houseAddressAttention.length > 0"
                  :style="'color:'+houseAdd+';'"
                >{{houseAddressAttention[0].matchInfoTxt}}</span>
              </div>
            </div>
            <div class="eltables">
              <el-table :data="houseAddressAttentionList" style="width:100%">
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column prop="relatedName" label="关联人" width="170"></el-table-column>
                <el-table-column label="被匹配信息" width="170">
                  <template slot-scope="scope">
                    <p
                      :style="'color:'+(scope.row.matchByInfoTxt===houseAddressAttention[0].matchInfoTxt?'':'red')+';'"
                    >{{scope.row.matchByInfoTxt}}</p>
                  </template>
                </el-table-column>
                <el-table-column prop="relatedRelation" label="与关联人关系" width="170"></el-table-column>
                <el-table-column prop="finalTaskDefKey" label="终审阶段" width="120"></el-table-column>
                <el-table-column prop="finalOpinionResultCode" label="终审结论" width="130"></el-table-column>
                <el-table-column prop="finalRejectReasonCode" label="终审否决原因" width="200"></el-table-column>
                <el-table-column prop="putoutApproveInd1" label="放款状态1" width="130"></el-table-column>
                <el-table-column prop="rejectCode1" label="放款否决原因1" width="200"></el-table-column>
                <el-table-column prop="repaymentStatus1" label="还款状态1" width="130"></el-table-column>
                <el-table-column prop="repaymentTerm1" label="已还期数1" width="130"></el-table-column>
                <el-table-column prop="putoutApproveInd2" label="放款状态2" width="130"></el-table-column>
                <el-table-column prop="rejectCode2" label="放款否决原因2" width="200"></el-table-column>
                <el-table-column prop="repaymentStatus2" label="还款状态2" width="130"></el-table-column>
                <el-table-column prop="repaymentTerm2" label="已还期数2" width="130"></el-table-column>
                <el-table-column prop="oldApplicationId" label="申请编号" width="160"></el-table-column>
                <el-table-column prop="custManagerTxt" label="客户经理是否一致" width="150"></el-table-column>
                <el-table-column fixed="right" width="130" label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="goHistory(scope.row.oldApplicationId, scope.row.reportNum, scope.row.finalTaskDefKey)"
                      type="text"
                    >查看详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <!-- 726新增匹配方式：身份证号码 -->
          <div class="bottom-content" v-if="certificateNumAttention.length > 0">
            <div class="clearfix bottom-content_title">
              <div class="content__title">
                <span class="font_gray">匹配方式:</span>
                <span
                  v-if="certificateNumAttention.length > 0"
                >{{certificateNumAttention[0].matchModeCode}}</span>
              </div>
              <div class="content__title">
                <span class="font_gray">匹配信息:</span>
                <span
                  v-if="certificateNumAttention.length > 0"
                  :style="'color:'+houseAdd+';'"
                >{{certificateNumAttention[0].matchInfoTxt}}</span>
              </div>
              <div class="content__title">
                <span class="font_gray">匹配人:</span>
                <span
                  v-if="certificateNumAttention.length > 0"
                >{{certificateNumAttention[0].matchModeCode}}</span>
              </div>
              <div class="content__title">
                <span class="font_gray">与借款人的关系:</span>
                <span
                  v-if="certificateNumAttention.length > 0"
                >{{certificateNumAttention[0].matchModeCode}}</span>
              </div>
            </div>
            <div class="eltables">
              <el-table :data="certificateNumAttentionList" style="width:100%">
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column prop="relatedName" label="关联人" width="170"></el-table-column>
                <el-table-column prop="relatedRelation" label="与关联人关系" width="170"></el-table-column>
                <el-table-column prop="finalTaskDefKey" label="终审阶段" width="120"></el-table-column>
                <el-table-column prop="finalOpinionResultCode" label="终审结论" width="130"></el-table-column>
                <el-table-column prop="finalRejectReasonCode" label="终审否决原因" width="200"></el-table-column>
                <el-table-column prop="putoutApproveInd1" label="放款状态1" width="130"></el-table-column>
                <el-table-column prop="rejectCode1" label="放款否决原因1" width="200"></el-table-column>
                <el-table-column prop="repaymentStatus1" label="还款状态1" width="130"></el-table-column>
                <el-table-column prop="repaymentTerm1" label="已还期数1" width="130"></el-table-column>
                <el-table-column prop="putoutApproveInd2" label="放款状态2" width="130"></el-table-column>
                <el-table-column prop="rejectCode2" label="放款否决原因2" width="200"></el-table-column>
                <el-table-column prop="repaymentStatus2" label="还款状态2" width="130"></el-table-column>
                <el-table-column prop="repaymentTerm2" label="已还期数2" width="130"></el-table-column>
                <el-table-column prop="oldApplicationId" label="申请编号" width="160"></el-table-column>
                <el-table-column prop="custManagerTxt" label="客户经理是否一致" width="150"></el-table-column>
                <el-table-column fixed="right" width="130" label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="goHistory(scope.row.oldApplicationId, scope.row.reportNum, scope.row.finalTaskDefKey)"
                      type="text"
                    >查看详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 历史贷款记录 -->
    <face2face-detail
      class="history-face"
      :dialogVisible="dialogVisible"
      :applicationId="oldApplicationId"
      :creditReportId="creditReportId"
      @closeDialog="dialogVisible = false"
    ></face2face-detail>
  </div>
</template>

<script>
import { aprAudApi } from "../../../../js/server";
export default {
  props: ["appOrAud", "disabled", 'isPre'],
  data() {
    return {
      creditReportId: "",
      oldApplicationId: "",
      dialogVisible: false, // 面签详情
      url: "",
      // 身份证号码
      certificateNumAttention: [],
      certificateNumAttentionList: [],
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
      phone: []
    };
  },
  created() {
    this.getAttentionInfo();
  },
  methods: {
    goHistory(id, certificateId, type) {
      let query = { appID: id, isEdit: true, comeFrom: 'noPending' };
      if (type === "面核面签") {
        this.oldApplicationId = id;
        this.creditReportId = certificateId;
        this.dialogVisible = true;
      } else if (type === "贷款审计") {
        let routeData = this.$router.resolve({
          name: "audit-pending-start",
          query: query
        });
        window.open(routeData.href, "_blank");
      } else {
        let routeData = this.$router.resolve({
          name: "approval-pending-start",
          query: query
        });
        window.open(routeData.href, "_blank");
      }
    },
    getAttentionInfo() {
      let data = {
        readonlyFlg: false
      };
      if (this.disabled) {
        data.readonlyFlg = true;
      } else {
        data.readonlyFlg = false;
      }
      let isPre = this.isPre ? 'pre' : '';
      if (this.appOrAud) {
        this.url = `${aprAudApi.taskDetail[`${isPre}attentionInfo`]}/${
          this.$route.query.appID
        }`;
      } else {
        this.url = `${aprAudApi.aud.taskDetail[`${isPre}attentionInfo`]}/${
          this.$route.query.appID
        }`;
      }
      this.$MyFetch.get(this.url, data).then((data = {}) => {
        if (data.houseAddressAttention.length > 0) {
          this.houseAddressAttention = data.houseAddressAttention;
          this.houseAddressAttentionList =
            data.houseAddressAttention[0].attentionMatchArray;
          this.houseAddressAttentionList.splice(20, 100);
          for (let i = 0; i < this.houseAddressAttentionList.length; i++) {
            if (
              this.houseAddressAttentionList[i].matchByInfoTxt !==
              this.houseAddressAttention[0].matchInfoTxt
            ) {
              this.houseAdd = "red";
            }
          }
        }
        // if (data.Attention.length > 0) {
        //   this.Attention = data.Attention;
        //   this.AttentionList =
        //     data.Attention[0].attentionMatchArray;
        //   this.AttentionList.splice(20, 100);
        //   for (let i = 0; i < this.AttentionList.length; i++) {
        //     if (
        //       this.AttentionList[i].matchByInfoTxt !==
        //       this.Attention[0].matchInfoTxt
        //     ) {
        //       this.houseAdd = "red";
        //     }
        //   }
        // }
        if (data.workNameAttention.length > 0) {
          this.workNameAttention = data.workNameAttention;
          this.workNameAttentionList =
            data.workNameAttention[0].attentionMatchArray;
          this.workNameAttentionList.splice(20, 100);
          for (let i = 0; i < this.workNameAttentionList.length; i++) {
            console.log(
              this.workNameAttentionList[i].relatedWorkplaceName,
              "单位名称会等于",
              this.workNameAttention[0].workplaceName
            );
            if (
              this.workNameAttentionList[i].relatedWorkplaceName !==
              this.workNameAttention[0].workplaceName
            ) {
              this.workName = "red";
            }
          }
        }
        if (data.workFixedPhoneAttention.length > 0) {
          this.workFixedPhoneAttention = data.workFixedPhoneAttention;
          this.workFixedPhoneAttentionList =
            data.workFixedPhoneAttention[0].attentionMatchArray;
          this.workFixedPhoneAttentionList.splice(20, 100);
          for (let i = 0; i < this.workFixedPhoneAttentionList.length; i++) {
            if (
              this.workFixedPhoneAttentionList[i].relatedWorkplaceName !==
              this.workFixedPhoneAttention[0].workplaceName
            ) {
              this.workFixed = "red";
            }
          }
        }
        if (data.workAddressAttention.length > 0) {
          this.workAddressAttention = data.workAddressAttention;
          this.workAddressAttentionList =
            data.workAddressAttention[0].attentionMatchArray;
          this.workAddressAttentionList.splice(20, 100);
          for (let i = 0; i < this.workAddressAttentionList.length; i++) {
            if (
              this.workAddressAttentionList[i].relatedWorkplaceName !==
              this.workAddressAttention[0].workplaceName
            ) {
              this.workAddress = "red";
            }
          }
        }
        if (data.phoneAttention.length > 0) {
          this.phoneAttention = data.phoneAttention;
          for (let i = 0; i < this.phoneAttention.length; i++) {
            this.phoneAttention[i].attentionMatchArray.splice(20, 100);
            console.log(this.phoneAttention[i].attentionMatchArray, "这是啥");
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
              console.log(this.phoneAttention[i].attentionMatchArray.length);
              console.log(this.phone.length);
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
        console.log(this.phone, "数据啊");
      });
    },
    close_() {
      console.log("sss");
      this.$emit("clsoe_windowAlert");
    }
  }
};
</script>

<style lang="less" scoped>
.detection-msg {
  .dialog-box {
    width: 1200px;
    height: 808px;
    background: #ffffff;
    /deep/.dialog-box__top {
      margin: 0;
    }
    .el-table {
      th {
        padding: 0;
      }
      /deep/thead tr {
        background: #ececec;
        height: 38px;
      }
      /deep/.el-table__body {
        td {
          padding: 0;
          height: 60px;
        }
      }
    }
    .eltables {
      border: 1px solid #e9e9e9;
      /deep/.el-table__body-wrapper {
        height: auto;
      }
      /deep/ .el-table thead tr th {
        padding: 0;
        background: #ececec;
      }
    }
    .strong {
      font-weight: bold;
    }
    .dialog-box__bottom {
      margin: 0px 20px 20px 20px;
      height: 708px;
      width: 1160px;
      overflow: auto;
      .bottom-content {
        width: 100%;
        // padding-bottom: 10px;
        .bottom-content_title {
          margin: 30px 0 20px 0;
        }
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
            > tr {
              border-bottom: 1px solid #d0d0d0;
            }
          }
        }
      }
    }
  }
}
</style>
