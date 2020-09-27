<template>
  <div>

    <!-- 资料签署 -->
    <el-dialog class="documents" title="资料签署" :visible.sync="documentsVisible" @close="clickLogout" width="1200px" center :close-on-click-modal="false">
      <div class="dialog-top-right theme">
        <i class="iconfont icon-video"></i>
        <span @click="$showImage(applicationId, '柜面面签',{selectProductId:productId})">上传影像资料</span>
      </div>
      <div class="documents-home">
        <div class="documents-left">
          <div class="info-title">合同打印</div>
          <div class="info-table">
            <div class="info-table-header">
              <p>材料名称</p>
              <p v-if="isSupportOnlinePrint">份数</p>
            </div>
            <div class="info-table-body">
              <table>
                <tbody>
                  <tr v-for="item in documentsData" :key="item.name">
                    <td>
                      <el-checkbox v-model="item.is_select" @change="documentsChange">{{item.contractName}}</el-checkbox>
                    </td>
                    <td v-if="isSupportOnlinePrint">
                      <el-input-number v-model="item.printCopies" controls-position="right" :min="0" :max="1000" size="mini"></el-input-number>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="all-choose">
            <el-checkbox v-model="is_all_choose" @change="allChoose">全选</el-checkbox>
          </div>

          <div class="printer" v-if="isSupportOnlinePrint">
            <span>服务中心打印机</span>
            <el-select v-model="printerId" placeholder="请选择">
              <el-option v-for="item in printers" :key="item.id" :value="item.id" :label="item.name"></el-option>
            </el-select>
            <el-button class="width100 button-default" @click="printCompact">打印</el-button>
          </div>
          <div class="download-wrap" v-else>
            <el-button class="width100 button-default btn-download" @click="downloadCompact">下载</el-button>
          </div>
        </div>
        <div class="documents-right">
          <video-component v-if="documentsVisible" :width="388" :height="500" :applicationId="applicationId" :customerName="customerName" :productId="productId" videoType="0" ref="video" name="video"></video-component>
        </div>
      </div>

      <div class="submit-btn no-require">
        <el-button class="button-warning" @click="noRequireStopVideo">不符合合作机构准入要求</el-button>
        <el-button class="width200 button-primary" @click="documentsResultStopVideo">完成</el-button>
      </div>
    </el-dialog>

    <!-- 拖动弹框组件 -->
    <popup :isShowDialog="isShowCredit" :url="creditReport" :isReport="true" :applicationId="applicationId" menuDesc="柜面面签" :iframe="true" :center="true" :width="800" :height="700" @closeDialog="isShowCredit = false"></popup>

    <!-- 面核面签 -->
    <el-dialog class="visa" title="面核面签" :visible="visaVisible" width="1600px" @open="getProgressNode" @close="closeDialog" center :show-close="true" :close-on-click-modal="false">
      <div class="visa-home" v-if="visaVisible">
        <steps :stepArr="stepArr" :currentStep="currentStep"></steps>
        <!-- 身份认证 -->
        <div class="face identity" v-if="currentStep === 1">

          <div class="identity-left">
            <ul>
              <li><label>申请编号：</label><span>{{idcardInfo.applicationId}}</span></li>
              <li><label>出生年月：</label><span>{{idcardInfo.BornL}}</span></li>
              <li><label>客户姓名：</label><span>{{idcardInfo.NameS}}</span></li>
              <li><label>户籍地址：</label><span>{{idcardInfo.Address}}</span></li>
              <li><label>证件号码：</label><span>{{idcardInfo.CardNo}}</span></li>
              <li><label>签发机关：</label><span>{{idcardInfo.Police}}</span></li>
              <li><label>性别：</label><span>{{idcardInfo.SexL}}</span></li>
              <li><label>有效期限：</label><span>{{idcardInfo.ActivityL}}</span></li>
              <li><label>民族：</label><span>{{idcardInfo.NationL}}</span></li>
            </ul>

            <div class="oper-btn">
              <el-button class="width200 button-default" v-if="!isIdentity" @click="identityFn">读卡认证</el-button>
              <p v-else>
                <i class="el-icon-success"></i>
                <span>认证成功</span>
              </p>
            </div>
          </div>

          <div class="identity-right">
            <div class="identity-img">
              <img :src="identityImg.idcardFront" alt="">
              <img :src="identityImg.idcardBack" alt="">
            </div>
            <div class="identity-rate">
              图片匹配度<span class="theme">{{identityImg.faceMatchPercent}}%</span>
            </div>
          </div>
        </div>

        <!-- 面核 -->
        <div class="face check" v-if="currentStep === 2">
          <div class="check-left">
            <div class="check-tabs">
              <el-tabs v-model="checkTabs" @tab-click="checkTabsClick">
                <el-tab-pane label="客户信息" name="customers-info"></el-tab-pane>
                <el-tab-pane label="产品收入信息" name="product-list"></el-tab-pane>
                <el-tab-pane label="产品信息" name="product-info"></el-tab-pane>
                <el-tab-pane label="历史贷款记录" name="loans-records"></el-tab-pane>
                <!-- <el-tab-pane label="收款账户信息管理" name="check-bank"></el-tab-pane> -->
                <!-- <el-tab-pane label="影像资料" name="video-data"></el-tab-pane>  -->
              </el-tabs>
              <div class="check-tabs-btn">
                <span class="button-text" @click="$showImage(applicationId, '柜面面签')">影像资料</span>
                <span class="button-text" @click="showCredit">查看征信报告</span>
              </div>
            </div>
            <div class="check-component">
              <!-- 动态组件做是否修改数据有点困难，改用路由 -->
              <!-- <component :is="checkTabs" :applicationId="applicationId" :ref="checkTabs" @checkTabsFn="checkTabsFn" @faceCheck_submit="faceCheck_submit" :checkTabsInfo="checkTabsInfo"></component> -->
              <router-view></router-view>
            </div>
          </div>
          <div class="check-right">
            <div class="check-video">
              <video-component v-if="visaVisible" :width="328" :height="240" :applicationId="applicationId" :customerName="customerName" videoType="1" ref="video" name="video"></video-component>
            </div>
            <div class="check-note">
              <!-- <el-collapse>
                <el-collapse-item v-for="item in checkDimens" :key="item.labelCode">
                  <template slot="title">
                    <div class="check-note-title">{{item.labelName}}</div>
                  </template>
                  <div class="check-note-content">
                    <div v-for="item1 in item.opinionItemList" :key="item1.code"><el-checkbox v-model="item1.state" :label="item1.desc"></el-checkbox></div>
                  </div>
                </el-collapse-item>
              </el-collapse> -->
              <el-tabs v-model="activeName">
                <el-tab-pane v-for="(items, index) in checkDimens" :key="index" :label="items.tabName" :name="index + ''">
                  <el-collapse>
                    <el-collapse-item v-for="item in items.labels" :key="item.labelCode">
                      <template slot="title">
                        <div class="check-note-title">{{item.labelName}}</div>
                      </template>
                      <div class="check-note-content">
                        <div v-for="e in item.opinionItemList" :key="e.code"><el-checkbox v-model="e.state" :label="e.desc" @change="optionChange(e)"></el-checkbox></div>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </el-tab-pane>
              </el-tabs>

              <div class="check-note-remark">
                <div class="check-note-title">备注</div>
                <el-input type="textarea" :rows="4" v-model="remark" @blur="saveSpeechRemark"></el-input>
                <!-- <p class="danger">备注意见不能为空</p> -->
              </div>
            </div>
          </div>
        </div>

        <!-- 面签 -->
        <div class="face check-result" v-if="currentStep === 3">
          <div>
            <!-- <div style="position:fixed;left:100%;top:0;">
              <video-component :width="328" :height="240" :applicationId="applicationId" :customerName="customerName" videoType="1" ref="video" name="video"></video-component>
            </div> -->
            <div class="check-resultData">
              <el-table class="common__table" v-for="(item,index) in check_interviewData" :key="item.productId" :data="item" style="width: 100%">
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
                    <el-button class="button-text" @click="documentSign(scope.row.productId,scope.row.productVersion,scope.row.productName)" :disabled="scope.row.interviewStatus !== 'waitting_interview'">资料签署</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>

        <!-- 结果确认 -->
        <div class="face check-result" v-show="currentStep === 4">
          <div>
            <div class="check-resultData">
              <el-table class="common__table" v-for="(item,index) in check_resultData.productInterviewList" :key="item.productId" :data="item" style="width: 100%">
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
        </div>

        <div class="submit-btn">
          <el-button class="width200" :class="isIdentity ? 'button-primary' : 'button-info'" @click="startIdentity" v-if="currentStep === 1">开始面核</el-button>

          <el-button class="width200 button-default" @click="lastStep" v-if="/2|3|4/.test(currentStep) && !(faceCheckTime === 2 && currentStep === 3)">上一步</el-button>
          <el-button class="width200 button-primary" @click="faceCheck_submitSave" v-if="currentStep === 2">提交面核</el-button>
          <el-button class="width200 button-primary" @click="faceCheck_last" v-if="currentStep === 3">下一步</el-button>
          <el-button class="width200 button-primary" @click="checkFinish" v-if="currentStep === 4">完成</el-button>
          <el-button type="success" class="width200" @click="preview" v-if="currentStep === 4">预览</el-button>
          <!-- 用于测试，后面删除：{{applicationId}} -->
          <!-- <router-link :to="{name: 'face2face-disposed'}">跳转到已处理</router-link> -->
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import steps from "@components/steps"; // 步骤条组件
// import productInfo from "../product-info/index"; // 产品信息组件
// import customersInfo from "../customers-info/index"; // 客户信息组件
// import loansRecords from "../loans-records/index"; // 历史贷款记录组件
// import checkBank from "../check-bank/index"; // 收款账户信息管理组件
import videoComponent from "@components/video/index"; // 影像组件
import popup from "@components/popup/index"; // 拖动弹框组件
// import tabJson from './test';
import { baseApi } from "../../js/server.js";
import { filterOH1 } from '../../js/mind';
export default {
  name: "visa",
  components: {
    steps,
    // productInfo,
    // customersInfo,
    // loansRecords,
    // checkBank,
    videoComponent,
    popup
  },
  props: ["visaVisible", "applicationId", "customerName"],
  data() {
    return {
      activeName: '0',
      stepArr: [
        // 面签步骤信息
        { title: "身份认证" },
        { title: "面核" },
        { title: "面签" },
        { title: "结果确认" }
      ],
      currentStep: 1, // 面签当前步骤
      // 身份认证
      isIdentity: false, // 是否通过读卡认证
      idLoading: null, // （读卡认证）加载中...
      idcardInfo: {
        // 身份详细信息
        applicationId: "", // 申请编号
        BornL: "", // 出生年月
        NameS: "", // 姓名
        Address: "", // 地址
        CardNo: "", // 证件号码
        Police: "", // 签发机关
        SexL: "", // 性别
        ActivityL: "", // 有效期限
        NationL: "" // 民族
      },
      identityImg: {
        // 身份证图片信息
        idcardFront: require("@/assets/img/identity1.png"),
        idcardBack: require("@/assets/img/identity2.png"),
        faceMatchPercent: 0
      },
      isShowCredit: false, // 查看征信报告弹框的显示与隐藏
      creditReport: "", // 征信报告url

      // 面核
      checkTabs: "customers-info", // 面核当前的tab, 面核当前的组件["customers-info","product-info","loans-records","check-bank"]
      // checkTabsInfo: {}, // 记录客户信息和产品信息的修改数据
      checkDimens: [], // 面签意见话术库
      remark: "", // 备注
      faceCheckTime: 0, // 查询面核次数
      // 面签 - 产品面签列表
      check_interviewData: [],
      documentsVisible: false, // 资料签署的显示与隐藏
      documentsData: [], // 资料签署的数据列表
      is_all_choose: false, // 是否全选资料签署的数据列表
      productId: "", // 点击资料签署记录的当前productId
      productVersion: "", // 点击资料签署记录的当前productVersion
      productName: "", // 点击资料签署记录的当前productName
      printerId: "", // 选中的打印机id
      printers: [], // 打印机列表
      isSupportOnlinePrint: false, // 是否支持一键打印
      // 结果确认，产品1，2列表数据
      check_resultData: {
        productInterviewList: [],
        opnionDetail: [],
        opnionRemark: "",
        aplExtranetInfo: {}
      },
      extranetStatusCodes: [],
      openVideo: true
    };
  },
  created() {
    // 跳转子路由，传递参数，测试，后面删除
    // this.checkTabs = "customers-info";
    // this.toRouter("customers-info");

    // 查看身份证图片和人脸识别结果
    // this.getIdentity();

    // 录像初始化，测试，后面删除
    // this.$nextTick(() => {
    //   this.$refs["video"].$emit("showVideo");
    // });
    // 查询面签意见话术库，测试，后面删除
    // this.faceCheckOpinionLibrary();

    // 查询面核面签页面当前进度条节点
    // this.getProgressNode();

    // 查询产品面签列表
    // this.getProductInterview(); // 测试，后面删除
    this.$getDictCode("extranet_status_code")
      .then(data => {
        this.extranetStatusCodes = data;
      })
      .catch(e => {
        this.$error(e.message);
      });
  },
  mounted() {},
  computed: {},
  beforeDestroy() {
    window.eventBus.$off('identityInfo');
  },
  watch: {
    // applicationId(newVal, oldVal) {
    //   console.log(newVal, oldVal);
    //   debugger;
    // },
  },
  methods: {
    preview() {
      let route = this.$router.resolve({
        name: 'face2face-preview',
        query: {
          applicationId: this.applicationId
        }
      });
      window.open(route.href);
    },
    // 上一步操作
    lastStep() {
      this.currentStep--;

       // 停止录像
      if (this.currentStep === 1) {
        this.$refs["video"].$emit("closeVideo");
      }

      this.lastStepFn();
    },
    // 弹出面核面签弹框和返回上一步的触发的事件
    lastStepFn() {
      console.log(this.currentStep);
      this.openVideo = this.$store.getters.openVideo;
      switch (this.currentStep) {
        case 1:
          // 查看身份证图片和人脸识别结果
          this.getIdentity();
          break;
        case 2:
          // 跳转子路由，传递参数
          this.checkTabs = "customers-info";
          this.toRouter("customers-info");

          this.$nextTick(() => {
            // 获取产品信息或客户信息数据
            // 录像初始化
            // 具体看vuex中的face2face.js文件
            if (this.openVideo) {
              this.$refs["video"].$emit("showVideo");
            }
          });
          // 查询面签意见话术库
          this.faceCheckOpinionLibrary();
          break;
        case 3:
          // 查询面核次数
          this.getCheckTime().then(res => {
            this.faceCheckTime = res;
          });
          // 查询产品面签列表
          this.getProductInterview();
          break;
        case 4:
          // 查询面核面签确认页面信息
          this.getf2fConfirmInfo();
          break;
        default:
          break;
      }
    },
    // bug_fix 获取备注信息
    /**
     * @param {String} _applicationId
     */
    getRemark(_applicationId) {
      this.$MyFetch.get(`${baseApi.f2fConfirmInfo}/${_applicationId}`)
        .then(_data => {
          if (_data && typeof _data.opnionRemark === 'string') {
            this.remark = JSON.parse(JSON.stringify(_data)).opnionRemark;
            return;
          }
          this.remark = '';
        }).catch(_err => {
          this.confirmFn(_err.message, 'error');
        });
    },
    // 查询面核面签页面当前进度条节点
    getProgressNode() {
      this.checkDimens = [];
      this.remark = "";
      this.printerId = "";
      this.check_resultData = {
        productInterviewList: [],
        opnionDetail: [],
        opnionRemark: ""
      };
      // this.getRemark(this.applicationId);
      // 跳转子路由，传递参数
      this.checkTabs = "customers-info";
      this.toRouter("customers-info");

      // console.log("销毁柜面面签eventBus");
      window.eventBus.$off("checkTabsFn");
      window.eventBus.$off("faceCheck_submitStopVideo");
      window.eventBus.$off("faceCheck_submit");
      window.eventBus.$off("noRequire");
      window.eventBus.$off("documentsResult");

      // if (!window.eventBus._events.faceCheck_submitStopVideo) {
        // 监听重置tabs，并且弹出已修改过提示事件，子路由触发
        window.eventBus.$on("checkTabsFn", msg => {
          let msgVal = "";
          if (msg === "product-info") {
            msgVal = "产品信息";
          } else if (msg === "customers-info") {
            msgVal = "客户信息";
          } else if (msg === "check-bank") {
            msgVal = "收款账户信息管理";
          } else if (msg === "product-list") {
            msgVal = "产品收入信息";
          }
          this.confirmFn(`您已修改过${msgVal}，请保存后再离开`, "error", false);

          setTimeout(() => {
            this.checkTabs = msg;
          }, 500);
        });

        // 监听停止录像事件，子路由触发（参数params：faceCheck_submit为提交面核，）
        window.eventBus.$on("faceCheck_submitStopVideo", () => {
          this.faceCheck_submitStopVideo();
        });
        // 监听提交面核事件，录像成功后触发
        window.eventBus.$on("faceCheck_submit", () => {
          this.faceCheck_submit();
        });
        // 监听不符合合作机构准入要求 - 拒绝产品申请，录像成功后触发
        window.eventBus.$on("noRequire", () => {
          this.noRequire();
        });
        // 监听不符合合作机构准入要求 - 拒绝产品申请，录像成功后触发
        window.eventBus.$on("documentsResult", () => {
          this.documentsResult();
        });
        // console.log(window.eventBus._events);
      // }

      this.$MyFetch
        .get(baseApi.f2fProgressNode + this.applicationId)
        .then(res => {
           console.log(res);
          //  res = "f2fConfirm"; // 测试，后面删除
          // this.currentStep = res; // IdAuth-身份验证，faceCheck-面核，faceInterview-面签，f2fConfirm-结果确认
          switch (res) {
            case "IdAuth":
              this.currentStep = 1;
              break;
            case "faceCheck":
              this.currentStep = 2;
              break;
            case "faceInterview":
              this.currentStep = 3;
              break;
            case "f2fConfirm":
              this.currentStep = 4;
              break;
            default:
              break;
          }
          // this.currentStep = 2; // 测试

          this.lastStepFn();
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 查看身份证图片和人脸识别结果
    getIdentity() {
      this.$MyFetch
        .get(baseApi.queryIDCardAndfaceRecognition + this.applicationId, {})
        .then(res => {
          // console.log(res);
          this.identityImg = res;

          if (this.identityImg.faceMatchPercent < 70) {
            this.confirmFn("照片匹配度不足70%，请关注身份真实性", "error");
          }
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 点击读卡认证
    identityFn() {
      // 加载
      this.idLoading = this.$loading({
        text: "",
        // spinner: "iconfont icon-loading rotateAnim",
        spinner: "",
        background: "transparent"
      });

      // 读卡并获取身份详细信息
      window.myopen_onclick(1);
      window.eventBus.$off('identityInfo');
      window.eventBus.$on('identityInfo', (_data) => {
        // this.idLoading.close();
        this.idcardInfo = _data;
        this.idcardInfo.applicationId = this.applicationId;
        this.checkIdentity(this.idcardInfo);
      });
    },
    checkIdentity(_info) {
      if (this.applicationId && _info.ActivityL && _info.CardNo && _info.NameS) {
        const data = {
          applicationId: this.applicationId,
          idCardExpiryTime: _info.ActivityL.split("-")[1],
          idCardNumber: _info.CardNo,
          name: _info.NameS.trim()
        };
        this.$MyFetch.post(baseApi.IDAuth, data)
          .then(res => {
            console.log("~~身份识别认证成功~~");
            this.isIdentity = true; // 身份识别认证通过
            this.idLoading.close();
          })
          .catch(err => {
            console.error(err);
            // 身份识别认证不通过
            this.confirmFn(err.message, "error");

            this.idLoading.close();

            // code为CPMS000401时，身份认证不通过，此笔业务已否决，跳转到已处理页面，改成统一用CPMS000499判断
            // if (err.code === "CPMS000401") {
            if (err.code === "CPMS000401" || err.code === "CPMS000499") {
              this.$router.push({ name: "face2face-disposed" });
            }
        });
      } else {
        this.idLoading.close();
        this.confirmFn('身份证识别错误', "error");
      }
    },
    // 身份证认证通过后，可点击开始面核
    startIdentity() {
      // 判断读卡认证是否通过
      if (this.isIdentity) {
        this.currentStep++;

        this.lastStepFn();
      } else {
        this.confirmFn(
          "您还没有进行读卡认证，请进行读卡认证，再开始面核操作",
          "error"
        );
      }
    },
    // 录像退出登录
    clickLogout() {
      // 停止录像

      this.$refs["video"].$emit("closeVideo");
    },
    // 查询面核次数
    getCheckTime() {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .get(baseApi.faceCheckTime + this.applicationId, {})
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 查询面签意见话术库
    faceCheckOpinionLibrary() {
      this.$MyFetch
        .get(
          baseApi.faceCheckOpinionLibrary +
            this.applicationId +
            "/faceCheckOpinionLibrary"
        )
        .then(res => {
          // console.log(res);
          this.checkDimens = res.faceCheckOpinionTabs;
          this.remark = res.faceCheckOpinion;
          this.saveSpeechRemark();
          this.optionChange();
          // this.checkDimens = JSON.parse(JSON.stringify(tabJson.data.faceCheckOpinionTabs));
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },

    // 离开产品信息或客户信息时，已修改过则需要触发的事件
    // checkTabsFn(msg, obj) {
    //   // console.log(msg);
    //   // console.log(obj);

    //   // obj为空对象是就是保存，不用弹出提示框
    //   if (JSON.stringify(obj) === "{}") {
    //     this.checkTabsInfo = {};
    //   } else {
    //     let tabs = "";
    //     if (msg === "product-info") {
    //       tabs = "产品信息";
    //     } else if (msg === "customers-info") {
    //       tabs = "客户信息";
    //     } else if (msg === "check-bank") {
    //       tabs = "收款账户信息管理";
    //     }
    //     this.confirmFn(`您已修改过${tabs}，请保存后再离开`, "warning", false)
    //       .then(() => {
    //         this.checkTabs = msg;
    //         this.checkTabsInfo = obj;
    //       })
    //       .catch(() => {
    //         this.checkTabs = msg;
    //         this.checkTabsInfo = obj;
    //       });
    //   }
    // },

    // 跳转子路由，传递参数
    toRouter(name) {
      let query = { applicationId: this.applicationId };
      this.$router.push({ name, query });
    },
    // 面核的tab切换事件
    checkTabsClick(tab, event) {
      this.checkTabs = tab.name;
      this.toRouter(tab.name);
    },

    // 先保存产品信息，客户信息或收款账户信息管理，才能进行录像，才能进行面核提交
    faceCheck_submitSave() {
      // console.log(this.checkTabs);
      // 判断是否需要录像，我司否决复议不需要保存，直接提交
      if (!this.openVideo) {
        this.faceCheck_submitStopVideo();
        return;
      }
      switch (this.checkTabs) {
        case "customers-info":
          window.eventBus.$emit("customersinfo");
          break;
        case "product-list":
          window.eventBus.$emit("productlist");
          break;
        case "product-info":
          window.eventBus.$emit("productinfo");
          break;
        case "loans-records":
          this.faceCheck_submitStopVideo();
          break;
        case "check-bank":
          window.eventBus.$emit("checkbank");
          break;
      }
    },
    // 停止录像成功之后，再进行面核提交
    faceCheck_submitStopVideo() {
      this.confirmFn("请确认面核是否完成", "warning", true).then(() => {
        let speechOptionMap = this.$store.getters.speechOptionMap;
        // 若勾选了话术库维度，备注意见必填
        if (filterOH1(speechOptionMap.optionList) && !this.remark.length) {
          this.confirmFn("备注意见不能为空", "error");
          return false;
        }
        // 停止录像
        if (this.openVideo) {
          this.$refs["video"].$emit("stopVideo", "faceCheck_submit");
        } else {
          // 面核提交
          this.faceCheck_submit();
        }
      });
    },
    optionChange() {
      // 处理面签意见话术库数据
      let opinionCheckStateList = [];
      let arr = [];
      let speechOptionMap = {};
      // let target = { "code": "OH1", "desc": "否决-其他", "state": true };
      this.checkDimens.forEach(x => {
        x.labels.forEach(_v => {
          arr = _v.opinionItemList.filter(_y => {
            return _y.state;
          });
          opinionCheckStateList.push(...arr);
        });
      });
      speechOptionMap = {
        optionList: opinionCheckStateList,
        target: 'updateSpeechOption' // 通知vuex更新勾选话术库
      };
      this.$store.dispatch('updateSpeechHandler', speechOptionMap);
    },
    saveSpeechRemark() {
      let speechOptionMap = {
        target: 'updateSpeechRemark',
        remark: this.remark
      };
      this.$store.dispatch('updateSpeechHandler', speechOptionMap);
    },
    // 面核提交
    faceCheck_submit() {
      console.log("面核提交，申请编号：", this.applicationId);

      let loading = this.$loading({
        text: "",
        spinner: "",
        background: "transparent"
      });
      let speechOptionMap = this.$store.getters.speechOptionMap;
      const data = {
        applicationId: this.applicationId,
        faceCheckOpinion: speechOptionMap.remark,
        opinionCheckStateList: speechOptionMap.optionList
      };
      this.$MyFetch
        .post(baseApi.faceCheck_submit, data)
        .then(res => {
          // console.log(res);
          loading.close();
          this.confirmFn("面核成功，已进入面签阶段", "success");
          this.currentStep++;
          this.lastStepFn();
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
          loading.close();

          /**
           * code为CPMS000422时，产品不符合定价策略，此笔业务已否决
           * code为CPMS000404时，面核话术库不通过，贷款申请已否决
           * code为CPMS000405时，面核话术库不通过，贷款申请已否决
           * 改成统一用CPMS000499判断
           */
          // 跳转到已处理页面
          // if (
          //   err.code === "CPMS000422" ||
          //   err.code === "CPMS000404" ||
          //   err.code === "CPMS000405"
          // ) {
          if (err.code === "CPMS000499" || err.code === "CPMS000422" || err.code === "CPMS000404" || err.code === "CPMS000405") {
            this.$router.push({ name: "face2face-disposed" });
          }
        });
    },

    // 查看征信报告
    showCredit() {
      // this.creditReport = 'http://pic1.win4000.com/wallpaper/f/51c3bb99a21ea.jpg';
      // this.isShowCredit = true;

      this.$getCreditReport("counterF2F", this.applicationId).then(res => {
        this.creditReport = res;
        this.isShowCredit = true;
      });
    },

    // 查询产品面签列表
    getProductInterview() {
      this.check_interviewData = [];
      this.$MyFetch
        .get(baseApi.productInterview + this.applicationId + "/list", {})
        .then(res => {
          // console.log('查询产品面签列表：');
          // console.log(res);

          res.forEach((item, index) => {
            this.check_interviewData.push([item]);
          });
          // console.log(this.check_interviewData);
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 显示资料签署
    documentSign(productId, productVersion, productName) {
      this.productId = productId;
      this.productVersion = productVersion;
      this.productName = productName;

      // 查询产品需打印的合同列表
      // let data = `${baseApi.getContractList}${this.productId}/${
      //   this.productVersion
      // }`;
      // 726需求，查询产品需打印的合同列表
      this.$MyFetch.post(baseApi.getContractList, {
        applicationId: this.applicationId,
        productId,
        productVersion
      }).then(res => {
        res = res || {};
        this.isSupportOnlinePrint = res.supportOnlinePrint;
        let data = res.contracts;
        data.forEach((item, index) => {
          item.is_select = false;
        });
        this.documentsData = data;

        // 是否全选
        this.documentsChange();

        // 查询处理中心打印机列表
        if (this.isSupportOnlinePrint) {
          this.getPrinters();
        }

        this.documentsVisible = true;
        // 录像初始化
        this.$nextTick(() => {
          // 具体看vuex中的face2face模块
          if (this.openVideo) {
            this.$refs["video"].$emit("showVideo");
          }
        });
      }).catch(err => {
        console.error(err);
        this.confirmFn(err.message, "error");
      });
      // this.$MyFetch
      //   .get(data)
      //   .then(res => {
      //     res = res || {};
      //     this.isSupportOnlinePrint = res.supportOnlinePrint;
      //     let data = res.contracts;
      //     data.forEach((item, index) => {
      //       item.is_select = false;
      //     });
      //     this.documentsData = data;

      //     // 是否全选
      //     this.documentsChange();

      //     // 查询处理中心打印机列表
      //     if (this.isSupportOnlinePrint) {
      //       this.getPrinters();
      //     }

      //     this.documentsVisible = true;
      //     // 录像初始化
      //     this.$nextTick(() => {
      //       this.$refs["video"].$emit("showVideo");
      //     });
      //   })
      //   .catch(err => {
      //     console.error(err);
      //     this.confirmFn(err.message, "error");
      //   });
    },
    // 查询处理中心打印机列表
    getPrinters() {
      this.$MyFetch
        .get(baseApi.centerPrinters + this.applicationId + "/centerPrinters")
        .then(res => {
          // console.log(res);
          this.printers = res;
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 全选资料签署的数据列表
    allChoose(val) {
      if (val) {
        for (let item of this.documentsData) {
          item.is_select = true;
        }
      } else {
        for (let item of this.documentsData) {
          item.is_select = false;
        }
      }
    },
    // 选中资料签署的数据，是否全选
    documentsChange() {
      this.is_all_choose = this.documentsData.every((item, index) => {
        return item.is_select;
      });
    },
    // 下载合同
    downloadCompact() {
      let printFiles = JSON.parse(
        JSON.stringify(this.documentsData.filter(item => item.is_select))
      );
      printFiles.forEach(item => {
        delete item.contractId;
        delete item.is_select;
        delete item.printCopies;
      });
      if (printFiles.length === 0) {
        this.confirmFn("请先选择下载资料", "error");
        return;
      }
      let loading = this.$loading({
        text: "",
        spinner: "",
        background: "transparent"
      });
      this.$MyFetch.post(baseApi.contractDownload, {
        applicationId: this.applicationId,
        printFiles,
        productId: this.productId,
        productVersion: this.productVersion
      }, 'blob')
      .then((res) => {
        this.$download(res);
        loading.close();
      })
      .catch((e) => {
        console.log(e);
        this.confirmFn(e.message, "error");
        loading.close();
      });
    },
    // 打印合同
    printCompact() {
      let printFiles = JSON.parse(
        JSON.stringify(this.documentsData.filter(item => item.is_select))
      );
      printFiles.forEach(item => {
        delete item.contractId;
        delete item.is_select;
      });
      // console.log(printFiles);

      if (printFiles.length === 0) {
        this.confirmFn("请选择产品需打印的合同列表", "error");
        return;
      }
      if (!this.printerId) {
        this.confirmFn("请选择处理中心打印机", "error");
        return;
      }

      let loading = this.$loading({
        text: "",
        spinner: "",
        background: "transparent"
      });

      const data = {
        applicationId: this.applicationId, // 贷款申请编号
        printFiles, // 打印文件列表（查询产品需打印的合同列表传过来）
        printerId: this.printerId, // 打印机ID（查询处理中心打印机列表传过来）
        productId: this.productId, // 产品编号（产品面签列表传过来）
        productVersion: this.productVersion // 产品版本号（产品面签列表传过来）
      };
      console.log(data);
      this.$MyFetch
        .post(baseApi.productContract_print, data)
        .then(res => {
          // console.log(res);
          this.confirmFn("打印合同成功", "success");
          loading.close();
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
          loading.close();
        });
    },

    // 停止录像成功后，不符合合作机构准入要求 - 拒绝产品申请
    noRequireStopVideo() {
      let openVideo = this.$store.getters.openVideo;
      this.confirmFn("确认不符合合作机构准入要求？", "warning").then(() => {
        if (openVideo) {
          this.$refs["video"].$emit("stopVideo", "noRequire");
        } else {
          this.noRequire();
        }
      });
    },
    noRequire() {
      console.log("--------不符合合作机构准入要求---------");
      const data = {
        applicationId: this.applicationId,
        productId: this.productId
      };

      this.$MyFetch
        .post(baseApi.loanProductDeny, data)
        .then(res => {
          // 不符合合作机构准入要求，贷款申请已否决
          // console.log(res);
          this.confirmFn(
            `产品${this.productId}【${this.productName}】已否决`,
            "warning",
            false
          ).then(() => {
            this.documentsVisible = false;

            this.getProductInterview();
          });
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");

          // code为CPMS000424时，不符合合作机构准入要求，贷款申请已否决，跳转到已处理页面，改成统一用CPMS000499判断
          if (err.code === "CPMS000424" || err.code === "CPMS000499") {
            this.$router.push({ name: "face2face-disposed" });
          }
        });
    },
    // 停止录像成功后，才能进行资料签署完成
    documentsResultStopVideo() {
      let openVideo = this.$store.getters.openVideo;
       this.confirmFn("产品资料签署是否完成", "warning").then(() => {
         if (openVideo) {
           this.$refs["video"].$emit("stopVideo", "documentsResult");
         } else {
           this.documentsResult();
         }
       });
    },
    documentsResult() {
      console.log("---------点击资料签署完成--------");
      let url = `${baseApi.faceInterview}/${this.applicationId}/${
        this.productId
      }/submit`;

      this.$MyFetch
        .post(url)
        .then(res => {
          // console.log(res);
          this.documentsVisible = false;

          // 查询产品面签列表
          this.getProductInterview();
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },

    // 面签点击下一步
    faceCheck_last() {
      // interviewStatus都不为待面签资料，则通过
      let isPass = this.check_interviewData.every(v => {
        return v[0].interviewStatus !== "waitting_interview";
      });
      if (!isPass) {
        this.confirmFn("产品资料签署还未完成", "error");
        return;
      }

      // not_meet_pricing_strategy 都不符合定价策略，说明业务否决，跳转到已处理界面
      let isPass1 = this.check_interviewData.every(v => {
        return v[0].interviewStatus === "not_meet_pricing_strategy";
      });
      if (isPass1) {
        this.confirmFn("产品不符合定价策略，此笔业务已否决", "error");
        this.$router.push({ name: "face2face-disposed" });
        return;
      }
      this.currentStep++;
      // 查询面核面签确认页面信息
      this.getf2fConfirmInfo();
    },
    // 查询面核面签确认页面信息
    getf2fConfirmInfo() {
      this.$MyFetch
        .get(baseApi.f2fConfirmInfo + this.applicationId)
        .then(res => {
          // console.log(res);

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
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },

    // 面核面签提交，面核面签完成
    checkFinish() {
      // 判断是否录像成功，不成功则不进行面核面签提交
      // if (!this.$refs["video"].isVideoSuccess) {
      //   this.confirmFn("您还没有录像，请进行录像再进行面核面签提交操作", "error");
      //   return;
      // }

      if (!this.check_resultData.extraNetStatusCode) {
        this.confirmFn("请先选择外网查询结论", "error");
        return;
      }

      this.confirmFn("确认提交", "warning").then(() => {
        let loading = this.$loading({
          text: "",
          spinner: "",
          background: "transparent"
        });

        this.$MyFetch
          .post(baseApi.face_submit + this.applicationId + "/submit", {
            opnionRemark: this.check_resultData.opnionRemark,
            extraNetStatusCode: this.check_resultData.extraNetStatusCode,
            remark: this.check_resultData.remark,
            taskNodeCode: 'faceToFaceTask'
          })
          .then(res => {
            // 查询面签待处理列表
            this.$emit("getList");

            // 关闭dialog对话框，触发父组件closeDialog事件
            this.closeDialog();

            loading.close();

            // if (res === "贷款申请被否决") {
            //   this.confirmFn(res, "error");
            //   this.$router.push({ name: "face2face-disposed" });
            //   return;
            // }

            this.confirmFn("面核面签已完成", "success");
          })
          .catch(err => {
            console.error(err);
            this.confirmFn(err.message, "error");
            loading.close();

            /**
             * code为CPMS000422时，产品不符合定价策略，此笔业务已否决
             * code为CPMS000404时，面核话术库不通过，贷款申请已否决
             * code为CPMS000405时，面核话术库不通过，贷款申请已否决
             * 改成统一用CPMS000499判断
             */
            // 跳转到已处理页面
            // if (
            //   err.code === "CPMS000422" ||
            //   err.code === "CPMS000404" ||
            //   err.code === "CPMS000405"
            // ) {
            if (err.code === "CPMS000499" || err.code === "CPMS000422" || err.code === "CPMS000404" || err.code === "CPMS000405") {
              this.$router.push({ name: "face2face-disposed" });
            }
          });
      });
    },

    // 关闭dialog对话框，触发父组件closeDialog事件
    closeDialog() {
      this.$emit("closeDialog");

      // 停止录像
      // console.log(this.$refs["video"]);
      // console.log(this.$refs["video"].$data);
      if (this.$refs["video"]) {
        this.$refs["video"].$emit("closeVideo");
      }
      // 初始化身份认证的flag
      this.isIdentity = false;
      // 身份信息初始化
      this.idcardInfo = {
        // 身份详细信息
        applicationId: "", // 申请编号
        BornL: "", // 出生年月
        NameS: "", // 姓名
        Address: "", // 地址
        CardNo: "", // 证件号码
        Police: "", // 签发机关
        SexL: "", // 性别
        ActivityL: "", // 有效期限
        NationL: "" // 民族
      };
      // 关闭弹窗初始化话术库
      this.$store.dispatch('clearSpeechHandler', { optionList: [], remark: '' });
      // 初始化是否开启录像
      this.$store.dispatch('updateOpenVideoHandler', true);
    }
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
  destroyed() {
    console.log("销毁柜面面签eventBus");
    window.eventBus.$off("checkTabsFn");
    window.eventBus.$off("faceCheck_submitStopVideo");
    window.eventBus.$off("faceCheck_submit");
    window.eventBus.$off("noRequire");
    window.eventBus.$off("documentsResult");
  }
};
</script>

<style lang="less">
.visa {
  .el-checkbox__label,
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #666;
  }
}
.documents {
  //多选框样式
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #000;
  }

  //计数器样式
  .el-input-number--mini {
    width: 80px;
  }
  .el-input-number {
    .el-input__inner {
      color: #666;
      padding-left: 0;
      padding-right: 30px;
    }
  }
}
.download-wrap {
  position: relative;
  .btn-download {
    position: absolute;
    top: 0;
    right: 0;
  }
}

//处理面签意见话术库中collapse和el-checkbox样式
.check-note {
  .el-tabs__header.is-top {
    margin: 0;
  }
  .el-tabs__nav.is-top > div{
    font-size: 12px;
    padding:0 6px;
  }
  .el-collapse-item__header {
    height: auto;
    line-height: normal;
    padding: 10px 0;
    .el-collapse-item__arrow {
      line-height: 20px;
    }
  }

  .el-checkbox,
  .el-checkbox__input {
    white-space: normal;
  }
  .el-checkbox {
    display: flex;
    padding: 5px 0;
  }
  .el-checkbox__input {
    margin-top: 2px;
  }
}
</style>

<style lang="less" scoped>
//面核面签
.visa {
  .visa-home {
    .face {
      display: flex;
      // border:1px solid #f00;
      //身份认证
      &.identity {
        .identity-left {
          //flex: 2;
          //width: 730px;
          // 1030+510+60=1600
          width: 1030px;
          .boxShadow();
          ul {
            display: flex;
            flex-wrap: wrap;
            margin: 30px 0 44px 0;
            li {
              &:nth-child(odd) {
                width: 40%;
              }
              &:nth-child(even) {
                width: 60%;
              }
              //width: 50%;
              margin-bottom: 40px;
              label {
                color: #666;
              }
            }
          }

          .oper-btn {
            padding: 20px 0;
            text-align: center;
            .border(top, @gray);
            p {
              height: 40px;
              line-height: 40px;
              font-weight: bold;
              color: @green;
            }
          }
        }
        .identity-right {
          //flex:1;
          //width: 410px;
          width: 510px;
          margin-left: 20px;
          text-align: center;
          .boxShadow();
          .identity-img {
            padding: 20px 0;
            img {
              width: 260px;
              height: 168px;
              &:nth-child(2) {
                margin-top: 18px;
              }
            }
          }
          .identity-rate {
            .border(top, @gray);
            padding: 10px 0;
          }
        }
      }

      //面核
      &.check {
        .check-left {
          //width: 812px;
          width: 1200px;
          .boxShadow(0, 20px);
          .check-tabs {
            position: relative;
            .check-tabs-btn {
              position: absolute;
              top: 0;
              right: 0;
              height: 40px;
              line-height: 40px;
              span {
                display: inline-block;
                margin-right: 20px;
                cursor: pointer;
              }
            }
          }
          .check-component {
            .scroll(430px);
            // border:1px solid #f00;
            > div {
              width: 100%;
            }
          }
        }
        .check-right {
          width: 328px;
          margin-left: 20px;
          padding: 0;

          .check-video {
            .boxShadow(0, 0);
            // position: fixed;
            // z-index: 5000;
            // top: 0;
            // right: 0;
            // margin: 200px 40px;
          }
          .check-note {
            .boxShadow(0, 20px);
            .scroll(230px);
            // border:1px solid #f00;
            //.scroll(554px);
            margin-top: 20px;

            .check-note-title {
              .selectorBefore(14px, 3px);
            }
            .check-note-content {
              // span {
              //   margin-left: 10px;
              //   color: #666;
              // }
              .el-checkbox__label {
                color: #f00;
              }
            }

            .check-note-remark {
              margin-top: 17px;
              .check-note-title {
                .selectorBefore(14px);
              }
              .el-textarea {
                margin-top: 10px;
              }
              p {
                margin: 10px 0;
              }
            }
          }
        }
      }

      //结果确认
      &.check-result {
        > div {
          width: 100%;
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
              margin-top: 20px;
            }
          }
          .check-idea {
            ul {
              li {
                padding: 20px;
                span {
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
  }
}

.documents {
  .documents-home {
    display: flex;
    height: 482px;

    .documents-left {
      width: 752px;
      height: 500px;
      text-align: left; //el-dialog的内容在IE11中默认居中，需要设置
      .boxShadow(20px, 30px);
      .info-title {
        padding: 15px 0;
        .border(bottom, @gray);
        .selectorBefore(16px);
      }
      .info-table {
        .info-table-header {
          background-color: #ececec;
          height: 40px;
          line-height: 40px;
          display: flex;
          text-align: center;
          p {
            &:nth-child(1) {
              width: 552px;
            }
            &:nth-child(2) {
              flex: 1;
            }
          }
        }
        .info-table-body {
          width: 100%;
          text-align: center;
          margin: 20px 0;
          max-height: 190px;
          overflow-y: auto;
          table {
            width: 100%;
            tr {
              border: 1px solid #d0d0d0;
              td {
                height: 60px;
                line-height: 60px;
                &:first-child {
                  width: 552px;
                  text-align: left;
                  .el-checkbox {
                    margin-left: 20px;
                  }
                }
              }
            }
          }
        }
      }

      .all-choose {
        .border(bottom, #e9e9e9);
        padding-bottom: 20px;
        margin-bottom: 20px;
      }
      .printer {
        display: flex;
        align-items: center;
        .el-select {
          margin-left: 10px;
        }
        .el-button {
          margin-left: auto;
        }
      }
    }
    .documents-right {
      width: 388px;
      height: 500px;
      margin-left: 20px;
      .boxShadow(0, 0);
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .no-require{
    margin-top: 20px;
  }
}
</style>
