<template>
  <div class="face2face-undisposed">
    <div class="table-area">
      <!-- 引入客户信息 -->
      <customer-import :dialogVisible="dialogVisible" @closeDialog="customerImport"></customer-import>

      <!-- 面核面签 -->
      <visa :visaVisible="visaVisible" :applicationId="applicationId" :customerName="customerName" @closeDialog="visaVisible = false" @getList="getList"></visa>

      <el-button class="import-btn width100 button-primary" icon="el-icon-plus" @click="dialogVisible = true">引入</el-button>

      <!-- 叫号弹窗 -->
      <el-dialog class="call-number" title="" :visible="callNumberVisible" width="450px" :show-close="false">
        <div class="call-content">
          <p>号码：<span class="yellow">{{callInfo.queueNo}}</span></p>
          <p>客户姓名：{{callInfo.customerName}}</p>
          <p>第【<span class="yellow">{{callInfo.callTimes}}</span>】次叫号</p>
        </div>
        <div class="call-btn">
          <el-button class="width100 button-green" @click="callAgain">重呼</el-button>
          <el-button class="width100 button-warning" @click="callCancel">过号</el-button>
          <el-button class="width100 button-primary" @click="callNumberVisible = false">确定</el-button>
        </div>
      </el-dialog>

      <el-form class="search" :inline="true" :model="searchInfo" ref="searchInfo">
        <el-form-item prop="applicationId">
          <el-input class="width200" v-model.trim="searchInfo.applicationId" placeholder="申请编号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="customerName">
          <el-input class="width200" v-model.trim="searchInfo.customerName" placeholder="客户姓名" clearable></el-input>
        </el-form-item>
        <el-form-item prop="idCardNo">
          <el-input class="width200" v-model.trim="searchInfo.idCardNo" placeholder="证件号码" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="width100 button-primary" @click="getList(true)">查询</el-button>
          <el-button class="width100 button-default" @click="clearSearch">清空</el-button>
        </el-form-item>
      </el-form>

      <div class="tableHeight">
        <el-table :data="tableData" style="100%" class="common__table">
          <el-table-column prop="applicationId" label="申请编号"></el-table-column>
          <el-table-column prop="customerName" label="客户姓名"></el-table-column>
          <!-- <el-table-column prop="authReasonDesc" label="授权原因"></el-table-column> -->
          <!-- <el-table-column label="是否重签贷款资料">
            <template slot-scope="scope">无</template>
          </el-table-column> -->
          <el-table-column prop="idCardNo" label="身份证号"></el-table-column>
          <el-table-column prop="productId1" label="产品1"></el-table-column>
          <el-table-column prop="productId2" label="产品2" v-if="!isXiuwen"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button class="button-text" @click="showCheck(scope.row.applicationId,scope.row.customerName)">面签面核</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-page">
          <pagination @jump-page='jump' :page="{currentPage: searchInfo.pageNum,account: total,pageSize: searchInfo.pageSize,showJumpButton: true}"></pagination>
        </div>
      </div>

      <div class="bottom-btn" v-if="!isXiuwen">
        <el-button class="width200 button-primary" @click="getCallInfo" :loading="callLoading">叫号</el-button>
      </div>

    </div>
  </div>

</template>

<script>
import customerImport from "./customer-import/index"; // 引入客户信息组件
import visa from "./visa/index"; // 面核面签组件
import pagination from "@components/pagination/index"; // 分页组件
import { baseApi } from "../js/server.js";

export default {
  name: "face2face-undisposed",
  components: {
    customerImport,
    visa,
    pagination
  },
  data() {
    return {
      // 查询信息
      searchInfo: {
        applicationId: "",
        customerName: "",
        idCardNo: "",
        pageNum: 1,
        pageSize: 10
      },
      tableData: [], // 表格信息
      total: 0, // 面签待处理总数
      // applicationId: "RL20190306009852", // 记录申请编号
      applicationId: "", // 当前申请编号
      customerName: "", // 客户姓名

      dialogVisible: false, // 引入客户信息的显示与隐藏
      visaVisible: false, // 面核面签的显示与隐藏

      // 叫号
      callNumberVisible: false, // 叫号弹框的显示与隐藏
      callLoading: false, // 点击叫号加载中
      callInfo: {}, // 叫号信息
      sMacAddr: ''
      // isAgain: false, // 重呼是否置灰
      // isCancel: true // 过号是否置灰
    };
  },
  created() {
    // 查询面签待处理列表
    this.getList();
    this.$getMac(this);
    // console.log(new Date().normalizeTime().strTime1);

    // this.getCallInfo();
  },
  beforeDestroy() {
    window.eventBus.$off('getMac');
  },
  watch: {
    // 身份详细信息获取后，进行身份识别认证
    idcardInfo(newVal, oldVal) {
      // console.log("身份识别认证");
      const data = {
        applicationId: this.applicationId,
        idCardExpiryTime: this.idcardInfo.ActivityL,
        idCardNumber: this.idcardInfo.CardNo,
        name: this.idcardInfo.NameS
      };
      this.$MyFetch
        .post(baseApi.IDAuth, data)
        .then(res => {
          // console.log("身份识别认证成功");
          // console.log(res);

          this.isIdentity = true; // 身份识别认证通过
          this.idCardLoading.close();
        })
        .catch(err => {
          console.error(err);
          // 身份识别认证不通过
          this.confirmFn("身份识别认证不通过，此笔业务已否决", "error");
        });
    }
  },
  methods: {
    // 引入面签成功事件
    customerImport(flag) {
      this.dialogVisible = false;

      // flag存在为true，则表示引入客户信息成功
      if (flag) {
        this.getList(true);

        // 获取剩余面签数量
        window.eventBus.$emit("getTotal");
      }
    },

    // 清空查询信息
    clearSearch() {
      this.$refs["searchInfo"].resetFields();
      this.getList();
    },
    // 查询面签待处理列表（flag存在，则代表进行点击查询操作）
    getList(flag) {
      // console.log(this.searchInfo);
      this.$MyFetch
        .get(baseApi.pending_list, this.searchInfo)
        .then(res => {
          // console.log(res);
          this.tableData = res.list;
          this.total = res.total;

          if (flag && this.total === 0) {
            this.confirmFn("无查询结果", "error");
          }
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 分页
    jump(pageNum) {
      this.searchInfo.pageNum = pageNum;
      this.getList();
    },
    handleCurrentChange(val) {
      this.searchInfo.pageNum = val;
      this.getList();
    },
    // 显示并开始面核面签
    showCheck(applicationId, customerName) {
      console.log("申请编号：" + applicationId);
      this.applicationId = applicationId;
      this.customerName = customerName;
      // 开始处理面签待处理项
      this.pendingStart(applicationId).then(() => {
        this.visaVisible = true;
      }).catch(_err => {
        this.$error(_err.message);
      });
    },
    // 开始处理面签待处理项
    pendingStart(applicationId) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .get(baseApi.pending_start + applicationId + "/start")
          .then(res => {
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 叫号
    getCallInfo() {
      // 是否获取到mac地址
      if (!this.sMacAddr) {
        this.$getMac(this);
        this.confirmFn('获取mac地址失败，请刷新重试或使用IE11浏览器', 'warning');
        return false;
      }

      this.callLoading = true;
      // console.log(this.sMacAddr + 'from 柜面面签');
      // console.log(window.componentThis);
      const data = {
        macAddress: localStorage.getItem("sMacAddr") || this.sMacAddr
      };
      this.$MyFetch
        .post(baseApi.callQueueNoForF2F, data)
        .then(res => {
          // console.log(res);
          this.callNumberVisible = true;
          this.callLoading = false;
          this.callInfo = res;

          // this.callOper(this.callInfo.callTimes);
        })
        .catch(err => {
          console.error(err);
          this.callLoading = false;
          this.confirmFn(err.message, "error");
        });
      // window.eventBus.$on('getMac', (_mac) => {
      //   console.log(`${window.sMacAddr}---from face2face component`);
      // });
    },
    // 重呼
    callAgain() {
      this.$MyFetch
        .post(baseApi.callRepeat, { serialId: this.callInfo.serialId })
        .then(res => {
          // console.log(res);

          this.callInfo = res;

          // this.callOper(this.callInfo.callTimes);
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    // 过号
    callCancel() {
      this.confirmFn("是否确认客户已过号？", "warning")
        .then(() => {
          this.$MyFetch
            .post(baseApi.crossQueueNo, { serialId: this.callInfo.serialId })
            .then(res => {
              // console.log(res);

              this.callNumberVisible = false;
            })
            .catch(err => {
              console.error(err);
              this.confirmFn(err.message, "error");
            });
        })
        .catch(() => {
          // this.callNumberVisible = false;
        });
    },
    // 叫号逻辑
    callOper(callTimes) {
      // 重呼次数（2次未到即过号，重呼置灰，过号取消置灰可点击）（需求更改为不需要）
      // if (callTimes > 2) {
      //   this.isAgain = true; // 重呼置灰
      //   this.isCancel = false; // 过号取消置灰可点击
      //   return false;
      // }
      // 系统应控制两秒后才能重呼，快速重复点击【重呼】只响应一次（需求更改为不需要）
      // this.isAgain = true;
      // setTimeout(() => {
      //   this.isAgain = false;
      // }, 2000);
    }
  }
};
</script>

<style lang="less" scoped>
.face2face-undisposed {
  .call-number {
    text-align: center;
    .call-content {
      p {
        margin-bottom: 25px;
        &:nth-child(2) {
          border-bottom: 1px solid #eee;
          padding-bottom: 25px;
        }
      }
    }
  }
}
</style>
