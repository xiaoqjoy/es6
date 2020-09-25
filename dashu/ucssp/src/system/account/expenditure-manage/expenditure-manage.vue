<template>
  <div class="expenditure-manage">
    <div class="tab-home">
      <el-tabs v-model="collaborateCode" @tab-click="handleClick" class="ata">
        <el-tab-pane v-for="(item, key) in dictionaryList" :key="key" :label='item.codeText' :name="item.codeValue"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="table-area">
      <div class="side-bar" v-loading='orgLoading'>
        <ul class="side-list">
          <li
            v-for="(item, index) in collaborateList"
            :key="index"
            :class="{active:index == active}"
            class="list-item"
            @click="tabSelect(index, item)"
          >
            <span>{{item.partnerName}}</span>
          </li>
        </ul>
      </div>
      <div class="view-con">
        <!-- 查询表单 -->
        <el-form class="search" :inline="true" :model="searchInfo" ref="searchInfo">
          <el-form-item prop="orgId">
            <el-select
              v-model="searchInfo.orgId"
              placeholder="请选择合作机构"
              disabled
              clearable
              filterable>
                <el-option
                  v-for="item in collaborateList"
                  :key="item.partnerId"
                  :value="item.partnerId"
                  :label="item.partnerName">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="subcompanyId">
            <el-select v-model="searchInfo.subcompanyId" placeholder="分公司" clearable filterable>
              <el-option
                v-for="item in subcompanyIds"
                :key="item.organizationId"
                :value="item.organizationId"
                :label="item.organizationName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="sendStatus">
            <el-select v-model="searchInfo.sendStatus" placeholder="发送状态" clearable filterable>
              <el-option
                v-for="item in sendStatuss"
                :key="item.value"
                :value="item.value"
                :label="item.desc"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="applicationId">
            <el-input v-model="searchInfo.applicationId" placeholder="申请编号" clearable></el-input>
          </el-form-item>
          <el-form-item prop="accountAllotId">
            <el-input v-model="searchInfo.accountAllotId" placeholder="出账编号" clearable></el-input>
          </el-form-item>
          <el-form-item prop="cusName">
            <el-input v-model="searchInfo.cusName" placeholder="客户姓名" clearable></el-input>
          </el-form-item>
          <el-form-item prop="primaryProductCode">
            <el-select v-model="searchInfo.primaryProductCode" placeholder="一级产品" clearable filterable>
              <el-option
                v-for="item in primaryProductCodeList"
                :key="item.codeValue"
                :value="item.codeValue"
                :label="item.codeText"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="el-form-item-btn">
            <el-button class="width100" type="primary" @click="search()">查询</el-button>
            <el-button class="width100 claer_btn" type="primary" plain @click="clearSearch">清空</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格数据 -->
        <!-- 太保光大银行、太保上海银行新增保单号(policyNum)字段 20190304 -->
        <el-table
          class="common__table"
          :data="tableData"
          header-cell-class-name="table-head"
          row-class-name="table-tr"
          style="100%"
          ref="multipleTable"
          v-loading='tableLoading'
          @row-click="rowClick"
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="48"></el-table-column>
          <el-table-column prop="putoutApproveStatus" width="120" label="放款状态"></el-table-column>
          <el-table-column prop="mortgageStateDesc" width="120" label="抵押状态"></el-table-column>
          <el-table-column width="120" label="是否自动发送">
            <template slot-scope="scope">
              {{ scope.row.autoPutoutInd ? '是' : '否' }}
            </template>
          </el-table-column>
          <el-table-column prop="startTime" width="160" label="任务到达时间"></el-table-column>
          <el-table-column width="160" label="补件状态">
            <template slot-scope="scope">
              {{ scope.row.patchStatusCode ? (scope.row.patchStatusCode === "Finish" ? '补件完成' : '补件中') : '' }}
            </template>
          </el-table-column>
          <el-table-column prop="primaryProductName" label="一级产品"></el-table-column>
          <el-table-column prop="sendTime" width="160" label="发送时间"></el-table-column>
          <el-table-column prop="sendStatus" width="120" label="发送状态">
            <template slot-scope="scope">
              <span :style="{color: scope.row.sendStatus === '待放款审批' ? 'red' : 'black'}">{{scope.row.sendStatus}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="cusName" width="98" label="客户姓名"></el-table-column>
          <el-table-column prop="applicationId" width="160" label="申请编号"></el-table-column>
          <el-table-column prop="accountAllotId" width="160" label="出账编号"></el-table-column>
          <el-table-column
            v-if="activeOrg.partnerId==='RL20180327975118' || activeOrg.partnerId==='RL20180723291307'"
            prop="policyNum"
            width="170"
            label="保单号">
          </el-table-column>
          <el-table-column prop="certificateNum" width="160" label="身份证号" >
            <template slot-scope="scope">
              <span>{{scope.row.certificateNum.slice(0,4)}}*********{{scope.row.certificateNum.slice(14)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="subcompanyName" width="160" label="分公司"></el-table-column>
          <el-table-column prop="sendBatchNum" width="160" label="发送资料批次号"></el-table-column>
          <el-table-column prop="loanPurposeCode" label="贷款用途"></el-table-column>
          <el-table-column prop="careerTypeCode" label="客户类型"></el-table-column>
          <el-table-column prop="approveAmt" width="120" label="审批金额"></el-table-column>
          <el-table-column prop="loanTerm" width="60" label="期限"></el-table-column>
          <el-table-column prop="mobileNum" width='160' label="手机号">
            <template slot-scope="scope">
              <span>{{scope.row.mobileNum.slice(0,4)}}***{{scope.row.mobileNum.slice(7)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="receiveBank" width="220" label="收款行"></el-table-column>
          <el-table-column prop="accountNum" width="180" label="收款卡号"></el-table-column>
          <el-table-column prop="cusManager" label="客户经理"></el-table-column>
          <el-table-column prop="returnedMessages" width="200" label="平台返回信息">
            <template slot-scope="scope">
              <el-tooltip effect="dark" :content="scope.row.returnedMessages" placement="top">
                <div class="ellipsis">{{scope.row.returnedMessages}}</div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <template slot-scope="slot">
              <el-button
              type="text"
              @click.stop="$showImage(slot.row.applicationId, '出账系统', {selectProductId: slot.row.productId, menuId: 'account/expenditure-manage'})">影像查看</el-button>
              <!-- <div class="video_btn_wrapper">
              </div> -->
              <el-dropdown trigger="click"
                v-show="slot.row.primaryProductName === '大数易贷' && slot.row.hasVideo">
                <el-button type="text">视频查看</el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(ele, index) in slot.row.videoList" :key="ele">
                    <a :href="ele" target="_blank">视频{{index + 1}}</a>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-button type="text"
                v-show="slot.row.primaryProductName === '大数易贷' && !slot.row.hasVideo"
                @click="easyloanVideo">视频查看</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 合计 -->
        <div class="page_box">
          <div class="moneyInfo f__left">
            <span>合计笔数：</span>
            <span class="warning">{{tableNum}}</span>
            <span>笔</span>
            <span class="total-money">合计金额：</span>
            <span class="warning">{{tableTotal}}</span>
            <span>元</span>
          </div>
          <!-- 分页条 -->
          <pagination @jump-page='jump' :page='pageConfig' class="pagination"></pagination>
        </div>
        <!-- 批量回执录入 -->
        <batchEntry v-if="batchEntryDialogVisible" :tableData='multipleSelection' :org='activeOrg' @clsoe_batchEntry_s='clsoe_batchEntry'></batchEntry>
        <!-- 上传其他资料 -->
        <introductionList v-if="uploadOtherVisible" :title='title' :multiple='multiple' @getFileId='getFileId' :accept="accept" @clsoe_upload_s='clsoe_uploadOther'></introductionList>
        <!-- 校验复核人权限 -->
        <checkPermission v-if="checkDialogVisible" :tableData='multipleSelection' @clsoe_windowImport_s='clsoe_check_permission'></checkPermission>
        <!-- 核查信息 -->
        <sendPutoutApprove v-if="repaymentDialogVisible" :org='activeOrg' :tableData='multipleSelection' @clsoe_windowAlert_send='clsoe_windowAlert_send'></sendPutoutApprove>
        <!-- 底部按钮 -->
        <div class="delete_submit">
          <div>
            <el-button type="primary" @click='sendApprove' class='t_button send_t button'>发送合作方审批</el-button>
            <el-button type="primary" @click="openBatchEntry" class='t_button entry_t button'>批量回执录入</el-button>
            <el-button type="primary" @click="exportPutoutFile" class='t_button export_t button'>导出放款文件</el-button>
            <el-button type="primary" @click="uploadOther" class='t_button upload_t button'>上传其他资料</el-button>
            <el-button
              v-if="activeOrg.partnerId ==='RL20200427000001' && collaborateCode === 'DSRD'"
              type="primary"
              :disabled="!sendLoanCommandClickable"
              @click="sendLoanCommand"
              class='t_button entry_t button'>发送放款指令</el-button>
            <el-button
              v-if="activeOrg.partnerId ==='RL20180809774977'"
              type="primary"
              @click='sendPutoutLoanApprove'
              class='t_button sendBank_t button'>发送银行放款</el-button>
            <el-button
              v-if="sendPutoutFlag"
              type="primary"
              @click="sendPutoutApprove"
              class='t_button approve_t button'>发送补件</el-button>
            <el-button v-if="emailSendButtonInd"
              type="primary"
              @click="sendEmailFn"
              :disabled="sendEmailMark"
              class='t_button approve_t button'>发送邮件</el-button>
          </div>
        </div>
        <a id="exportLog" style="display:none;"></a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import "@common/css/dialog";
import { accountApi } from "../../account/js/server";
import batchEntry from "./batchEntry"; // 批量回执录入
import introductionList from "./introductionList"; // 上传组件
import checkPermission from "./check-permission"; // 校验复核人权限组件
import sendPutoutApprove from "./sendPutoutApprove"; // 核查信息组件
import pagination from "@components/pagination"; // 分页组件

export default {
  components: {
    batchEntry, // 批量回执录入
    introductionList, // 上传组件
    checkPermission, // 校验复核人权限组件
    sendPutoutApprove, // 核查信息组件
    pagination // 分页组件
  },
  name: "expenditure-manage",
  data() {
    return {
      primaryProductCodeList: [],
      sendTime: "",
      // 查询信息
      searchInfo: {
        orgId: "",
        subcompanyId: "",
        sendStatus: "",
        applicationId: "",
        accountAllotId: "",
        cusName: "",
        collaborateModeCode: ""
      },
      // 发送状态
      sendStatuss: [],
      // 合作机构
      orgNames: [],
      // 分公司
      subcompanyIds: [],
      // 表格加载状态
      tableLoading: false,
      // 机构栏加载状态
      orgLoading: false,
      // 表格信息
      tableData: [],
      // 分页
      pageConfig: {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      },
      multipleSelection: [], // 选中的列表
      tableNum: 0, // 合计笔数
      tableTotal: 0, // 合计金额
      batchEntryDialogVisible: false, // 批量回执录入信息显示/隐藏
      repaymentDialogVisible: false, // 核查信息显示/隐藏
      uploadOtherVisible: false, // 上传其他资料显示/隐藏
      title: "", // 上传组件标题
      accept: [], // 上传文件格式
      multiple: true, // 上传组件是否可以多选
      relativeFileIds: "",
      // 合作模式
      dictionaryList: [],
      // 合作机构
      active: 0,
      collaborateList: [],
      collaborateCode: "",
      cLoading: false,
      // 当前机构
      activeOrg: {},
      // 当前合作模式
      collaborateModeCode: "",
      emailSendButtonInd: false, // 发送邮件是否展示
      sendEmailMark: true, // 发送邮件是否可点击
      sendPutoutFlag: false, // 发送补件按钮是否显示
      checkDialogVisible: false // 校验复核人权限组件的显示与隐藏
    };
  },
  computed: {
    sendLoanCommandClickable() {
      if (!this.multipleSelection.length) {
        return false;
      }
      return this.multipleSelection.every(item => item.sendStatus === '待放款审批');
    }
  },
  created() {
    // 获取合作模式
    this.getDictionary();
    // 获取分公司
    this.getOrganizations();
    // 获取发送状态
    this.getSendStatus();
    // 查询一级产品项
    this.getPrimaryProductCode();
  },
  methods: {
    ...mapActions('account', ['sendPutoutOrderApprove', 'fetchSendStatus', 'fetchCollaborateCompanyList']),
    easyloanVideo() {
      this.confirmFn('该笔业务未上传抵押视频');
    },
    // 切换合作模式
    handleClick(tab, event) {
      this.active = 0;
      this.collaborateCode = tab.name;
      this.getCollaborateList();
      this.tableData = [];
    },
    // 查询一级产品项
    getPrimaryProductCode() {
      this.$MyFetch.get(accountApi.productList)
        .then(data => {
          this.primaryProductCodeList = data;
        }).catch(err => {
          this.confirmFn(err.message, 'error');
        });
    },
    // 切换合作机构
    tabSelect(index, item) {
      console.log(item);
      if (!this.tableLoading) {
        const { imageButtonInd, partnerId, partnerName, patchButtonInd, emailSendButtonInd } = item;
        this.menuId = imageButtonInd
          ? `account/expenditure-manage/${partnerId}`
          : "account/expenditure-manage";
        this.activeOrg = { partnerName, partnerId, imageButtonInd };
        this.active = index;
        this.searchInfo.orgName = partnerName;
        this.searchInfo.orgId = partnerId;
        this.sendPutoutFlag = patchButtonInd;
        this.emailSendButtonInd = emailSendButtonInd;
        this.searchInfo.primaryProductCode = '';
        this.tableData = [];
        this.refer(1);
      }
    },
    // 获取合作模式
    getDictionary() {
      var flag = JSON.parse(window.sessionStorage.getItem("expenditureBusinessModel"));
      if (flag) {
        this.dictionaryList = flag;
        this.collaborateCode = this.dictionaryList[0].codeValue;
        this.getCollaborateList();
      } else {
        this.$MyFetch
          .get(accountApi.expenditure_manage.dictionary)
          .then((data = {}) => {
            this.dictionaryList = data;
            this.collaborateCode = this.dictionaryList[0].codeValue;
            window.sessionStorage.setItem(
              "expenditureBusinessModel",
              JSON.stringify(this.dictionaryList)
            );
            this.getCollaborateList();
          })
          .catch(err => {
            this.$error(err.message);
          });
      }
    },
    // 获取合作机构
    async getCollaborateList() {
      this.collaborateList = [];
      this.orgLoading = true;
      const { result = [], success, errorMsg } = await this.fetchCollaborateCompanyList(this.collaborateCode);
      this.orgLoading = false;
      if (success) {
        if (result && result.length > 0) {
          this.collaborateList = result;
          const { partnerName, partnerId, imageButtonInd, patchButtonInd } = this.collaborateList[0];
          this.searchInfo.orgName = partnerName;
          this.searchInfo.orgId = partnerId;
          this.sendPutoutFlag = patchButtonInd;
          this.searchInfo.primaryProductCode = '';
          this.activeOrg = { partnerName, partnerId, imageButtonInd };
        } else {
          this.searchInfo.orgName = "";
          this.searchInfo.orgId = "";
          this.searchInfo.primaryProductCode = '';
          this.activeOrg = {};
          this.sendPutoutFlag = false;
        }
        this.refer(1);
      } else {
        this.$error(errorMsg);
      }
    },
    // 获取数据列表
    refer(pageNum) {
      let { orgId, applicationId, accountAllotId, cusName, subcompanyId, sendStatus, primaryProductCode } = this.searchInfo;
      if (orgId || applicationId || accountAllotId || cusName || subcompanyId || sendStatus || primaryProductCode) {
        let para = {
          orgId,
          applicationId,
          accountAllotId,
          cusName,
          subcompanyId,
          sendStatus,
          primaryProductCode,
          collaborateModeCode: this.collaborateCode,
          pageNum: pageNum,
          pageSize: this.pageConfig.pageSize
        };
        this.tableLoading = true;
        this.$MyFetch
          .post(accountApi.expenditure_manage.queryPutoutPendingInfo, para)
          .then(async (data = {}) => {
            this.tableLoading = false;
            this.pageConfig.account = data.total;
            this.pageConfig.currentPage = data.pageNum;
            this.tableData = data.list;
          })
          .catch(err => {
            this.tableLoading = false;
            this.$error(err.message);
          });
      } else {
        this.$error("请至少输入一个查询条件");
      }
    },
    getMultiSelection(arr, isReadonly = false) {
      let data = {
        categoryCodes: arr,
        getAll: isReadonly
      };
      return this.$MyFetch.get(accountApi.multipleSelect, data);
    },
    rowClick(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    // 选中触发事件
    handleSelectionChange(val) {
      this.tableNum = val.length;
      let money = 0;
      val.forEach((item, index) => {
        var temp = Number(item.approveAmt);
        money += temp;
      });
      this.tableTotal = money.toFixed(4);
      this.multipleSelection = val;
      console.log(val);
      // 未选择的时候，不可操作
      this.sendEmailMark = val.length === 0;
      // 抵押状态“复核通过”可操作【发送邮件】
      for (let i = 0; i < val.length; i++) {
        if (val[i].mortgageState === 'PASSED') {
          this.sendEmailMark = false;
          break;
        }
        this.sendEmailMark = true;
      }
    },
    /**
     * @param {Array} 表格中的行数据
     * @returns {Boolean} false notBan, true Ban
     */
    banSendEmail(rowList) {
      if (rowList.length !== 1) return false;
      return rowList[0].emailSendState === '01' || rowList[0].emailSendState === '00';
    },
    search() {
      this.refer(1);
    },
    // 清空查询信息
    clearSearch() {
      this.searchInfo.subcompanyId = null;
      this.searchInfo.sendStatus = null;
      this.searchInfo.applicationId = null;
      this.searchInfo.cusName = null;
      this.searchInfo.primaryProductCode = '';
      this.tableData = [];
      this.pageConfig = {
        account: 0, // 总条数
        pageSize: 10, // 当前多少条数据
        currentPage: 1, // 当前页
        showJumpButton: true // 显示跳转按钮
      };
    },
    // 分页
    jump(pageNum) {
      this.pageConfig.currentPage = pageNum;
      this.refer(this.pageConfig.currentPage);
    },
    // 发送补件
    sendPutoutApprove() {
      if (this.multipleSelection.length === 0) {
        this.$error("您还没有选中业务");
      } else {
        // 校验权限
        this.checkDialogVisible = true;
      }
    },
    sendEmailFn() {
      if (!this.multipleSelection.length) {
        this.$error("您还没有选中业务");
        return;
      }
      // 01：成功，00：发送中，99：发送失败，null：未操作
      if (this.multipleSelection[0].emailSendState === '01') {
        this.$message('该笔业务邮件已发送成功，不可重复操作');
        return;
      }
      if (this.multipleSelection[0].emailSendState === '00') {
        this.$message('该笔业务邮件发送中，不可重复操作');
        return;
      }
      let data = this.multipleSelection.map(_item => _item.accountAllotId);
      this.$MyFetch.post(accountApi.sendEmail, data)
        .then(_data => {
          let msg = "";
          if (_data && _data.length > 0) {
            msg = _data.join("。");
          } else {
            msg = "发送邮件成功";
          }
          this.$message({
            message: msg,
            type: "success"
          });
          this.refer(1);
        }).catch(_err => {
          this.$error(_err.message);
        });
    },
    // 关闭校验权限
    clsoe_check_permission() {
      this.checkDialogVisible = false;
    },
    send() {
      var sendDay = new Date(new Date());
      var sendTime =
      sendDay.toLocaleDateString().replace(/\//g, "-") +
      " " +
      sendDay.toTimeString().substr(0, 8);
      this.sendTime = sendTime;
      this.confirmFn(`请确认是否已上传相关资料？`, "warning")
      .then(() => {
        this.repaymentDialogVisible = true;
      })
      .catch(() => {
        this.repaymentDialogVisible = false;
      });
    },
    // easyLoanApprove(partnerId) {

    // },
    // 发送合作方审批
    sendApprove() {
      if (this.multipleSelection.length === 0) {
        this.$error("您还没有选中业务");
        return;
      }
      // 单选的情况
      if (this.multipleSelection.length === 1) {
        // 大数易贷+抵押状态为“办押中”+东营银行
        if (
          (this.multipleSelection[0].primaryProductName === '大数易贷' &&
          this.searchInfo.orgId === 'RL20170901000001') &&
          (this.multipleSelection[0].mortgageState === 'INIT' ||
          this.multipleSelection[0].mortgageState === 'SUBMIT' ||
          this.multipleSelection[0].mortgageState === 'BACK')
        ) {
          this.$error('该笔业务在办押中，不可操作发送');
          return;
        }
        // 大数易贷+抵押状态为“复核否决“时
        if (
          this.multipleSelection[0].primaryProductName === '大数易贷' &&
          this.multipleSelection[0].mortgageState === 'REJECT'
        ) {
          this.$error('该笔业务办押复核否决，不可操作发送');
          return;
        }
      }
      this.send();
      // let text = "";
      // for (var i = 0; i < this.multipleSelection.length; i++) {
      //   if (this.multipleSelection[i].primaryProductName === "大数易贷") {
      //     text += "出账编号" + this.multipleSelection[i].accountAllotId + ",";
      //   }
      // }
      // if (text !== "") {
      //   this.confirmFn(`<p style="color: red;font-weight: bold;">${text} 为大数易贷业务，请确认是否发送？</p>`, "warning")
      //   .then(() => {
      //     this.send();
      //   })
      //   .catch(() => {});
      // } else {
      //   this.send();
      // }
    },
    clsoe_windowAlert_send() {
      this.repaymentDialogVisible = false;
    },
    sendPutoutLoanApprove() { // 发送银行放款
      if (this.multipleSelection.length === 0) {
        this.$error("您还没有选中业务");
      } else {
        let accountAllotIds = this.multipleSelection
          .map(item => item.accountAllotId)
          .toString(",");
        let accountAllotIdList = accountAllotIds.split(",");
        this.$MyFetch
          .post(
            accountApi.expenditure_manage.sendPutoutLoanApprove,
            accountAllotIdList
          )
          .then((data = {}) => {
            let msg = "";
            if (data && data.length > 0) {
              msg = data.join("。");
            } else {
              msg = "发送银行放款成功";
            }
            this.$message({
              message: msg,
              type: "success"
            });
            this.refer(1);
          })
          .catch(err => {
            this.refer(1);
            this.$error(err.message);
          });
      }
    },
    // 确认核查
    submit() {
      let accountAllotIds = this.multipleSelection
        .map(item => item.accountAllotId)
        .toString(",");
      let accountAllotIdList = accountAllotIds.split(",");
      this.cLoading = true;
      this.$MyFetch
        .post(
          accountApi.expenditure_manage.sendPutoutApprove,
          accountAllotIdList
        )
        .then((data = {}) => {
          this.cLoading = false;
          this.repaymentDialogVisible = false;
          let msg = "";
          if (data && data.length > 0) {
            msg = data.join("。");
          } else {
            msg = "发送合作方审批成功";
          }
          this.$message({
            message: msg,
            type: "success"
          });
          this.refer(1);
        })
        .catch(err => {
          this.cLoading = false;
          this.repaymentDialogVisible = false;
          this.refer(1);
          this.$error(err.message);
        });
    },
    openBatchEntry() { // 批量回执录入
      if (this.multipleSelection.length === 0) {
        this.$error("您还没有选中业务");
      } else {
        let arr = [];
        this.multipleSelection.map(item => {
          if (arr.indexOf(item.putoutApproveStatus) < 0) {
            arr.push(item.putoutApproveStatus);
          }
        });
        if (arr.length > 1) {
          this.$error("批量回执录只能操作是一种放款状态");
        } else {
          this.batchEntryDialogVisible = true;
        }
      }
    },
    clsoe_batchEntry() { // 关闭批量回执录入
      this.batchEntryDialogVisible = false;
    },
    // 打开上传其他资料组件
    /**
     * 20190304
     * 上传其他资料组件新增PNG和EML两种格式
     */
    /**
     * 20190408
     * 特殊影像要求的机构，其影像调用方式是传机构信息给到影像平台，再由影像平台传对应的影像类型在出账页面展示。
     * 即：上传其他调用影像平台上传其他资料。
     */
    uploadOther() {
      if (this.activeOrg.imageButtonInd) {
        if (this.multipleSelection.length > 1) {
          this.confirmFn("仅支持单笔操作", "error");
        } else if (this.multipleSelection.length === 0) {
          this.confirmFn("您还没有选中业务", "error");
        } else {
          this.$showImage(this.multipleSelection[0].applicationId, "出账系统", {
            productId: this.multipleSelection[0].productId,
            menuId: "account/expenditure-manage/" + this.activeOrg.partnerId,
            selectProductId: this.multipleSelection[0].productId
          });
        }
      } else {
        if (this.multipleSelection.length < 1) {
          this.confirmFn("您还没有选中业务", "error");
        } else {
          this.title = "上传其他资料";
          this.accept = ["JPG", "PDF", "ZIP", "7Z", "PNG", "EML"];
          this.uploadOtherVisible = true;
        }
      }
    },
    // 获取fileId
    getFileId(val) {
      this.relativeFileIds = val;
      if (this.multipleSelection.length > 0) {
        let para = {
          accountAllotId: this.multipleSelection[0].accountAllotId,
          applicationId: this.multipleSelection[0].applicationId,
          fileIds: val.split(","),
          uploadMethod: "ar2"
        };
        this.$MyFetch
          .post(accountApi.getFileToImage, para)
          .then((data = {}) => {
            if (data === "success") {
              this.$message({
                message: "上传文件成功",
                type: "success"
              });
            } else {
              this.$error("上传失败");
            }
          })
          .catch(err => {
            this.$error(err.message);
          });
      }
    },
    // 关闭上传其他资料组件
    clsoe_uploadOther() {
      this.uploadOtherVisible = false;
    },
    // 导出放款文件
    exportPutoutFile() {
      if (this.searchInfo.orgId && this.collaborateCode) {
        const { orgId, accountAllotId, applicationId, cusName, subcompanyId, sendStatus } = this.searchInfo;
        let para = {
          orgId,
          accountAllotId,
          applicationId,
          cusName,
          subcompanyId,
          sendStatus,
          collaborateModeCode: this.collaborateCode
        };
        let url = accountApi.expenditure_manage.exportPutoutFile;
        this.$MyFetch.post(url, para, "blob")
          .then((res = {}) => {
            var card = res.filename.replace(/"/g, ""); // 正则去掉字符串中所多余的引号
            res.filename = card;
            this.$download(res);
          })
          .catch(err => {
            this.$error(err.message);
          });
      } else {
        this.$error("合作模式、合作机构id必填");
      }
    },
    // 获取发送状态
    async getSendStatus() {
      const { result = {}, success, errorMsg } = await this.fetchSendStatus();
      if (success) {
        this.sendStatuss = result;
      } else {
        this.$error(errorMsg);
      }
    },
    // 获取分公司
    getOrganizations() {
      this.$MyFetch
        .get(accountApi.Organizations)
        .then((data = {}) => {
          this.subcompanyIds = data.list;
        })
        .catch(err => {
          this.$error(err.message);
        });
    },
    async sendLoanCommand() {
      console.log('发送放款指令');
      if (this.multipleSelection.length === 0) {
        this.$error("您还没有选中业务");
        return;
      }
      /**
       * 5.放款操作界面-华夏银行（易贷）资金方界面：
       * 仅当业务的抵押状态为“复核通过”+发送状态为“待放款审批”时，
       * 可操作【发送放款指令】按钮；否则点击时提示“该笔业务未完成抵押登记，不可发送放款指令”；
       */
      if (
        this.searchInfo.orgId === "RL20200427000001" &&
        this.multipleSelection.length === 1 &&
        !(this.multipleSelection[0].sendStatus === '待放款审批' &&
        this.multipleSelection[0].mortgageState === 'PASSED')
      ) {
        this.$error('该笔业务未完成抵押登记，不可发送放款指令');
        return;
      }
      let accountAllotIdList = this.multipleSelection.map(item => item.accountAllotId);
      const data = await this.sendPutoutOrderApprove(accountAllotIdList);
      let msg = "";
      if (data && data.length > 0) {
        msg = data.join("。");
      } else {
        msg = "发送银行放款成功";
      }
      this.$message({ message: msg, type: "success" });
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less">
.expenditure-manage {
  .content {
    margin-bottom: 20px;
    .top_conten {
      width: 50%;
      // margin-left: 50px;
      height: 30px;
    }
    .top_conten_title {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #666;
    }
    .top_content_font {
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #151515;
      line-height: 20px;
    }
    .top_content_money {
      color: orange;
    }
  }
  .dialog {
    .el-dialog {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      margin: 0 !important;
    }
    &.el-dialog250 {
      .el-dialog {
        height: 250px;
        border-radius: 4px;
        box-shadow: 0 1px 34px 0 rgba(0, 0, 0, 0.05);
        .el-dialog__header {
          box-shadow: 0 2px 6px 0 #d0d0d0;
          padding-bottom: 0;
          margin-bottom: 10px;
        }
      }
    }
    .dialog-footer {
      text-align: center;
    }
  }
  .tab-home .el-tabs__item.is-active {
    font-size: 14px;
  }
  .tab-home .el-tabs__item {
    font-size: 14px;
  }
}
</style>
<style lang="less" scoped>
.expenditure-manage {
  height: 100%;
  min-height: 100%;
  .tab-home {
    .el-tabs__item {
      padding: 0 20px;
    }
  }
  .table-area {
    padding: 0;
    width: 100%;
    // height: calc(100% - 74px);
    min-height: calc(100% - 74px);
    background-color: #ffffff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
    border-radius: 0 4px 4px 0;
    // display: flex;
    position: relative;
    margin-bottom: 20px;
    .upload-export-t {
      top: -60px;
      right: 190px;
    }
    .upload-export-other {
      top: -60px;
    }
    .side-bar {
      width: 128px;
      // float: left;
      position: absolute;
      left: 0;
      min-height: 100%;
      height: 100%;
      background: #ffffff;
      box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.08);
      border-radius: 4px 0 0 4px;
      // overflow: auto;
      .side-list {
        width: 100%;
        .list-item {
          cursor: pointer;
          width: 128px;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          text-align: center;
          background: #ffffff;
          white-space: nowrap;
          width: auto;
          border-left: 3.2px solid #ffffff;
          padding-left: 10px;
          span {
            display: block;
            text-align: left;
            font-size: 12px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          &.active {
            background: #f0f8fc;
            border-color: #538bf1;
            position: relative;
            span {
              position: absolute;
              overflow: auto;
              width: auto;
              z-index: 1;
              background: #f0f8fc;
            }
          }
        }
      }
    }
    .view-con {
      width: calc(100% - 128px);
      // height: 100%;
      // overflow-y: auto;
      // flex: 1;
      margin-left: 128px;
      padding: 20px;
      // min-width: 1030px;
      .search {
        .el-form-item {
          width: 190px;
          margin-right: 15px;
        }
        .el-form-item.el-form-item-btn {
          width: auto;
          margin-right: 0px;
        }
      }
      .width100 {
        width: 100px;
      }
    }
  }
}
//分页样式
.pagination {
  margin-top: 20px;
  margin-right: 20px;
}
// 统计金额
.moneyInfo {
  margin-top: 4px;
  span {
    font-size: 12px;
  }
  .total-money {
    margin-left: 30px;
  }
}
// 表格中视频查看样式
.video_btn_wrapper {
  display: inline;
}
a, a:active, a:hover, a:visited {
  text-decoration: none;
  color: #409eff;
}
// 只对IE11生效
_:-ms-fullscreen, .el-dropdown {
  top: -1px;
}
// 按钮颜色
.el-button--primary {
  background: #538bf1;
  color: #fff;
}
// 清空按钮
.claer_btn {
  border: 1px solid #538bf1;
  background-color: #ffffff;
  color: #538bf1;
}
// 底部按钮
.delete_submit {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
  // 删除提交公共样式
  .t_button {
    width: 180px;
    height: 40px;
    font-size: 14px;
    letter-spacing: 1.07px;
    text-align: center;
    margin-bottom: 10px;
    margin-left: 10px;
  }
  .send_t {
    background: #05838e;
    border: 1px solid #05838e;
  }
  .entry_t {
    background: #eeb352;
    border: 1px solid #eeb352;
  }
  .export_t {
    background: #538bf1;
    border: 1px solid #538bf1;
  }
  .upload_t {
    color: #538bf1;
    background: #ffffff;
    border: 1px solid #538bf1;
  }
  .sendBank_t {
    background: #eeb352;
    border: 1px solid #eeb352;
  }
  .approve_t {
    background: #05838e;
    border: 1px solid #05838e;
  }
}
/* 表头部分样式 */
/deep/ .el-tabs__nav-wrap {
  -webkit-box-shadow: 1px 2px 20px #ccc;
  padding-left: 30px;
  padding-top: 10px;
  border-radius: 4px;
  background: #ffffff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
}
/deep/ .el-tabs__nav-wrap .el-tabs__item {
  height: 50px;
}
/deep/ .el-tabs__nav-wrap .el-tabs__item.is-active {
  font-size: 18px;
  color: #538bf1;
  letter-spacing: 1.38px;
}
/deep/ .el-tabs__nav-wrap .el-tabs__item.is-active .el-tabs__item {
  font-size: 16px;
  color: #333333;
  letter-spacing: 1.22px;
  text-align: center;
}
/deep/ .el-tabs__nav-wrap .el-tabs__active-bar {
  bottom: 2px;
}
</style>
