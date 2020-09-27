<template>
  <div>
    <div class="dialog-box__bottom">
      <!-- v-if="workNameAttention.length > 0" -->
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
                  @click="goHistory(scope.row.oldApplicationId, scope.row.reportNum, scope.row.redirectFlag, scope.row)"
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
                  @click="goHistory(scope.row.oldApplicationId, scope.row.reportNum, scope.row.redirectFlag, scope.row)"
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
                  @click="goHistory(scope.row.oldApplicationId, scope.row.reportNum, scope.row.redirectFlag, scope.row)"
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
                    @click="goHistory(scope.row.oldApplicationId, scope.row.reportNum, scope.row.redirectFlag, scope.row)"
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
                  @click="goHistory(scope.row.oldApplicationId, scope.row.reportNum, scope.row.redirectFlag, scope.row)"
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
                  @click="goHistory(scope.row.oldApplicationId, scope.row.reportNum, scope.row.redirectFlag, scope.row)"
                  type="text"
                >查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 历史贷款记录 -->
    <face2face-detail
      class="history-face"
      :dialogVisible="dialogVisible"
      :applicationId="oldApplicationId"
      :creditReportId="creditReportId"
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
    },
    isDetail: {
      type: Boolean,
      default: false
    }
  },
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
    closeFn() {
      window.openNum = window.openNum || 0;
      window.openNum--;
      if (window.openNum < 0) {
        window.openNum = 0;
      }
      this.$store.commit('pop_f2fTypeCode');
      this.dialogVisible = false;
    },
    goHistory(id, certificateId, type, row) {
      let goto = {
        '2': 'pre-approval',
        '3': 'pre-audit',
        '4': 'approval-pending-start',
        '5': 'audit-pending-start'
      };
      if (type === '1') {
        window.openNum = window.openNum || 0;
        window.openNum++;
        this.oldApplicationId = id;
        this.creditReportId = certificateId;
        this.$store.commit('set_f2fTypeCode', row.f2fTypeCode);
        this.dialogVisible = true;
        return;
      }
      let routeData = this.$router.resolve({
        name: goto[type],
        query: {
          appID: id,
          isEdit: true
        }
      });
      window.open(routeData.href, '_blank');
    },
    getAttentionInfo() {
      let url = baseApi.loanAttention.replace('{applicationId}', this.applicationId);
      this.$MyFetch.get(`${url}/${this.isDetail}`).then((data = {}) => {
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
        if (data.workNameAttention.length > 0) {
          this.workNameAttention = data.workNameAttention;
          this.workNameAttentionList =
            data.workNameAttention[0].attentionMatchArray;
          this.workNameAttentionList.splice(20, 100);
          for (let i = 0; i < this.workNameAttentionList.length; i++) {
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
      }).catch(_err => {
        this.$error(_err.message);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.dialog-box__bottom {
  .bottom-content {
    .bottom-content_title {
      .content__title {
        float: left;
        margin-right: 57px;
      }
      .font_gray {
        color: #666;
        line-height: 46px;
      }
    }
  }
}
</style>
