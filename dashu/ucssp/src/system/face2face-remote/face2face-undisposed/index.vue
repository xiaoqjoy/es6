<template>
  <div class="face2face-undisposed">

    <!-- {{$store.state.face2face.seatNickName}} -->

    <!-- 远程面签的日志打印 -->
    <!-- <div class="face2face-log">
      <div v-if="isLogs">
        <el-button size="mini" @click='clearLogs'>清空日志</el-button>
        <el-button size="mini" @click='isLogs = false'>隐藏日志</el-button>
        <div class="log-record">
          <span>mac地址：{{sMacAddr}}</span>
          <span>流水号：{{serialId}}</span>
        </div>
        <ul>
          <li v-for="(item,index) in logs" :key="index">{{index}}: {{item}}</li>
        </ul>
      </div>
      <i v-else class="el-icon-info" @click="isLogs = true" title="显示日志"></i>
    </div> -->

    <!-- <popup v-show="isShowDialog" :url="seatUrl" id="child" :width="popupWidth" :height="popupHeight" :isShowDialog="isShowDialog" :iframe="true" :center="false" :isVideo="true"></popup> -->

    <div class="table-area">
      <!-- 引入客户信息 -->
      <customer-import :dialogVisible="dialogVisible" @closeDialog="customerImport"></customer-import>

      <!-- 面核面签 -->
      <visa :visaVisible="visaVisible" ref="visaComponent" :subCompanyId='subCompanyId' :applicationId="applicationId" :customerName="customerName" :serialId="serialId" :ydApproveMode2="ydApproveMode2" @closeDialog="visaVisible = false" @getList="getList"></visa>

      <el-button class="import-btn width100 button-primary" icon="el-icon-plus" @click="dialogVisible = true">引入</el-button>
      <!-- <a class="el-button button-primary" :href="videoUploadUrl" target="_blank">上传本地视频</a> -->

      <!-- 叫号弹窗 -->
      <el-dialog class="call-number" title="" :visible="callNumberVisible" width="450px" :show-close="false">
        <div class="call-content">
          <p>号码：<span class="yellow">{{callInfo.queueNo}}</span></p>
          <p>客户姓名：{{callInfo.customerName}}</p>
          <p>第【<span class="yellow">{{callInfo.callTimes}}</span>】次叫号</p>
        </div>
        <div class="call-btn">
          <el-button class="width100 button-green" @click="callAgain" :loading="recallLoading">重呼</el-button>
          <el-button class="width100 button-warning" @click="callCancel">过号</el-button>
          <el-button class="width100 button-primary" @click="callConfirm">确定</el-button>
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
        <el-table ref="tableData" :data="tableData" style="100%" @row-click="rowClick" :highlight-current-row="true" class="common__table">
          <el-table-column prop="applicationId" label="申请编号"></el-table-column>
          <el-table-column prop="customerName" label="客户姓名"></el-table-column>
          <!-- <el-table-column prop="authReasonDesc" label="授权原因"></el-table-column>
          <el-table-column label="是否重签贷款资料">
            <template slot-scope="scope">无</template>
          </el-table-column> -->
          <el-table-column prop="idCardNo" label="身份证号"></el-table-column>
          <el-table-column prop="authReasonDesc" label="授权原因"></el-table-column>
          <el-table-column prop="productName1" label="产品1"></el-table-column>
          <el-table-column prop="productName2" label="产品2" v-if="!isXiuwen"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click.stop="showCheck(scope.row.applicationId,scope.row.customerName,scope.row.resignInd,scope.row.easyLoanInd,scope.row.approveModeCd, scope.row)">面签面核</el-button>
              <el-button type="text" @click.stop="handUp(scope.row.applicationId)">挂起</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- <div class="pagination">
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="searchInfo.pageNum"
            :total="total"
            :page-size="searchInfo.pageSize"
            layout="total,prev,pager,next,jumper">
          </el-pagination>
        </div> -->
        <div class="pagination-page">
          <pagination @jump-page='jump' :page="{currentPage: searchInfo.pageNum,account: total,pageSize: searchInfo.pageSize,showJumpButton: true}"></pagination>
        </div>

      </div>

      <div class="bottom-btn" v-if="!isXiuwen">
        <!-- <el-button class="width200 button-primary" @click="getCallInfo" :loading="callLoading" :disabled="$store.state.face2face.isCallAllow">叫号</el-button> -->
        <el-button class="width200 button-primary" @click="getCallInfo" :loading="callLoading">叫号</el-button>
        <!-- <router-link :to="{name: 'face2face-remote-disposed'}">跳转到已处理</router-link> -->
        <!-- <el-button type="primary" @click="toDisposed">跳转到已处理</el-button> -->
        <!-- <el-button type="primary" @click="setCurrentRow">测试取消表格选中高亮</el-button> -->
        <!-- <el-button type="primary" @click="documentSign">测试资料签署</el-button> -->
        <!-- <el-button type="primary" @click="stopVideo">模拟面核结束视频</el-button> -->
      </div>

    </div>
  </div>

</template>

<script>
import customerImport from "./customer-import/index"; // 引入客户信息组件
import visa from "./visa/index"; // 面核面签组件
import pagination from "@components/pagination/index"; // 分页组件
import { baseApi } from "../js/server.js";
import popup from "@components/popup";
export default {
  name: "face2face-undisposed",
  components: {
    popup,
    customerImport,
    visa,
    pagination
  },
  data() {
    return {
      // 打印日志
      // logs: [],
      // isLogs: false, // 是否隐藏日志
      // sMacAddr: "", // mac地址

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
      applicationId: "", // 当前申请编号
      customerName: "", // 客户姓名

      serialId: "", // 记录当前叫号的流水号

      // isShowDialog: false, // 云屋远程音视频的显示与隐藏
      // seatNickName: "", // 坐席昵称
      // popupWidth: 400, // 云屋远程音视频的宽度
      // popupHeight: 300, // 云屋远程音视频的高度
      // seatUrl: '', // 云屋坐席地址

      dialogVisible: false, // 引入客户信息的显示与隐藏
      visaVisible: false, // 面核面签的显示与隐藏
      // 叫号
      // isCallAllow: true, // 是否允许叫号（云屋返回pageReady则不允许，返回waiting则允许）
      callNumberVisible: false, // 叫号弹框的显示与隐藏
      callLoading: false, // 点击叫号加载中
      recallLoading: false,
      loading: false, // 加载
      callInfo: {}, // 叫号信息
      currentApplicationId: "", // 当前选中业务的申请编号
      sMacAddr: '',
      ydApproveMode2: false,
      subCompanyId: '',
      videoUploadUrl: 'https://www.bilibili.com'
      // isAgain: false, // 重呼是否置灰
      // isCancel: true // 过号是否置灰
    };
  },
  created() {
    console.log("销毁远程面签getList");
    window.eventBus.$off("getList");
    window.eventBus.$off("setCurrentRow");
    window.eventBus.$off("getSeatUrl");
    // 查询面签待处理列表
    this.getList();
    window.eventBus.$on("getList", () => {
      this.getList();
    });
    window.eventBus.$on("setCurrentRow", () => {
      this.setCurrentRow();
    });
    // window.eventBus.$on('getSeatUrl', (_url) => {
    //   this.setVideoUploadUrl(_url);
    // });
    // 页面加载后获取mac地址
    this.$getMac(this);
    // this.sMacAddr = localStorage.getItem("sMacAddr");
    // this.getSeatUrl();
  },
  mounted() {},
  watch: {},
  methods: {
    // 上传视频地址
    setVideoUploadUrl(_url) {
      this.videoUploadUrl = _url.replace(/seat/, 'upload');
    },
    // 测试资料签署
    documentSign() {
      this.$store.dispatch("set_breakPoint", {
        isBreakPoint: true,
        msg: "面签录像开始断点",
        applicationId: "RL10000000000",
        customerName: "1111",
        productId: "2222",
        videoType: "0"
      });
    },

    // 取消表格选中高亮，并且把当前选中申请编号初始化
    setCurrentRow() {
      this.currentApplicationId = "";
      this.$refs.tableData.setCurrentRow([]);
    },

    // 用于调试
    stopVideo() {
      this.$store.dispatch("set_isSubmitOperate", true);
      this.$store.dispatch("set_breakPoint", {
        isBreakPoint: true,
        msg: "面核结束录像 - 面核",
        applicationId: "",
        customerName: "",
        productId: "",
        videoType: "1",
        oper: 1,
        isStart: false
      });
    },
    // 用于调试
    toDisposed() {
      this.$router.push({ name: "face2face-remote-disposed" });
    },

    // 引入面签成功事件
    customerImport(flag) {
      this.dialogVisible = false;

      // flag存在为true，则表示引入客户信息成功
      if (flag) {
        this.getList(true);

        // 获取剩余面签数量
        window.eventBus.$emit("remote_getTotal");
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
    // 跳转页面
    jump(pageNum) {
      this.searchInfo.pageNum = pageNum;
      this.getList();
    },
    handleCurrentChange(val) {
      this.searchInfo.pageNum = val;
      this.getList();
    },
    handUp(_applicationId) {
      this.confirmFn('是否确定挂起？', 'warning').then(() => {
        const loading = this.$loading({
          text: '',
          spinner: "",
          background: "transparent"
        });
        this.currentApplicationId = ''; // 清空最近点击的单
        this.$MyFetch.post(baseApi.hangUp + _applicationId)
          .then(() => {
            loading.close();
            this.confirmFn('挂起成功！', 'success');
            this.getList();
          })
          .catch(err => {
            console.log(err);
            loading.close();
            this.confirmFn(err.message, 'error');
          });
      });
    },
    // 显示并开始面核面签
    showCheck(applicationId, customerName, resignInd, easyLoanInd, approveModeCd, row) {
      console.log("申请编号：" + applicationId);
      this.applicationId = applicationId;
      this.customerName = customerName;
      this.ydApproveMode2 = easyLoanInd && approveModeCd === '2';
      this.subCompanyId = row.subCompanyId;
      this.$store.dispatch('updateOpenVideoHandler', resignInd);
      // 开始处理面签待处理项
      this.pendingStart(applicationId).then((res) => {
        if (res) {
          this.confirmFn(res, 'success').then(() => {
            this.visaVisible = true;
          });
        } else {
          this.visaVisible = true;
        }
      });
    },
    // 开始处理面签待处理项
    pendingStart(applicationId) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .get(baseApi.pending_start + applicationId + "/start")
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
            this.confirmFn(err.message, "error");
          });
      });
    },

    // 选中表格数据
    rowClick(row) {
      if (this.currentApplicationId) {
        this.setCurrentRow();
        return;
      }
      this.currentApplicationId = row.applicationId;
      console.log(this.currentApplicationId);
    },

    // 叫号
    getCallInfo: async function() {
      this.$refs.visaComponent.isStartFlag = true;
      // 叫号的时候对资料签署视频开关初始化
      this.$refs.visaComponent.documentFlag = true;
      // 获取mac地址，这里必须将组件实例传入函数
      if (!this.sMacAddr) {
        this.$getMac(this);
        this.confirmFn('获取mac地址失败，请刷新重试或使用IE11浏览器', 'warning');
        return false;
      }

      // 云屋没有收到waiting，isCallAllow就为false，不能进行叫号操作了
      console.log("----", this.$store.state.face2face.currentState, this.$store.state.face2face.isCallAllow);
      if (!(this.$store.state.face2face.currentState === "waiting" && this.$store.state.face2face.isCallAllow)) {
        this.confirmFn("云屋窗口正在加载中，请稍等几秒钟再点击...");
        return;
      }

      // 音视频加载
      this.loading = this.$loading({
        text: "",
        spinner: "",
        background: "transparent"
      });

      // this.callLoading = true;
      this.callLoadingFn(['callLoading', 'recallLoading']);
      const data = {
        macAddress: this.sMacAddr
      };

      // 判断当前是否有选中业务申请编号，未选中表示进行叫号操作，选中则表示进行重连操作
      let callData;
      if (!this.currentApplicationId) {
        // 叫号接口
        console.log("叫号接口");
        callData = await this.callQueueNoForF2F(data);
      } else {
        // 重连接口
        console.log("重连接口");
        callData = await this.reconnect();
      }

      // 用于测试，需要删除
      // let callData = {
      //   applicationId: "RL10000000000",
      //   serialId: "serialId",
      //   associateAccount: "client23",
      //   customerIdNo: "2222",
      //   customerName: "1111"
      // };

      this.$store.dispatch("set_selectCustomInfo", callData);
      // 判断申请编号是否为null，不为null则继续
      if (!callData.applicationId) {
        this.confirmFn("申请编号不能为空", "error");
        return;
      }

      window.eventBus.$emit(
        "getLogs",
        `正在叫号的流水号，并把它保存在缓存中：${callData.serialId}`
      );
      localStorage.setItem("serialId", callData.serialId);

      this.callInfo = callData;
      this.serialId = callData.serialId;
      this.callNumberVisible = true;
      // 查询云屋远程面签视频用户名和密码
      let cloudroomData = await this.cloudroomAccessInfo();
      // console.log(cloudroomData);
      let data1 = {
        UserName: cloudroomData.userName, // 账户名
        UserPswd: cloudroomData.password, // 32位小写Md5(密码)
        cloudUrl: cloudroomData.apiUrl, // 云屋接口地址
        OptID: callData.applicationId, // 业务申请编号
        // CallerID: this.seatNickName, // 坐席ID
        CallerID: this.$store.state.face2face.seatNickName, // 坐席ID
        CustomerID: callData.associateAccount, // 客户ID（associateAccount窗口关联账户）
        CustomerIdCard: callData.customerIdNo, // 用户身份证号
        CustomerName: callData.customerName, // 客户姓名
        Cooperation: "null", // 合作机构
        Product: "null", // 产品信息
        Reason: "null" // 授权原因
      };

      // 云屋接口
      this.QueueAssignCall(data1);
    },
    // 叫号接口
    callQueueNoForF2F(data) {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .post(baseApi.callQueueNoForF2F, data)
          .then(res => {
            // console.log(res);

            // this.callLoading = false;
            this.loading.close();

            resolve(res);
          })
          .catch(err => {
            console.error(err);
            // this.callLoading = false;
            this.loading.close();
            this.confirmFn(err.message, "error");
            reject(err);
          });
      });
    },
    // 远程面签视频重连时使用
    reconnect() {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .post(baseApi.reconnect, { applicationId: this.currentApplicationId })
          .then(res => {
            // console.log(res);

            // 若重连成功，当前选中业务的申请编号重置
            // this.currentApplicationId = "";
            this.setCurrentRow();

            // this.callLoading = false;
            this.loading.close();

            resolve(res);
          })
          .catch(err => {
            console.error(err);
            // this.callLoading = false;
            this.loading.close();
            this.confirmFn(err.message, "error");
            reject(err);
          });
      });
    },
    // 查询云屋远程面签视频用户名和密码
    cloudroomAccessInfo() {
      return new Promise((resolve, reject) => {
        this.$MyFetch
          .get(baseApi.cloudroomAccessInfo)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
            this.confirmFn(err.message, "error");
          });
      });
    },
    // 云屋接口
    QueueAssignCall(data) {
      console.log("-------调用云屋接口-------");
      this.$MyFetch
        .post(data.cloudUrl, data)
        .then(res => {
          // console.log(res);
          console.log("请求成功");
          console.log(res);

          // res.RspCode为0是成功，否则失败
          if (res.RspCode === 0) {
            // this.isShowDialog = true; // 改成以inMeeting这个状态来显示云屋窗口
          } else {
            this.confirmFn(res.RspDesc, "error");
          }
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
        });
    },
    callLoadingFn(keyList) {
      keyList.forEach(key => {
        this[key] = true;
      });
      let timer = setTimeout(() => {
        clearTimeout(timer);
        keyList.forEach(key => {
          this[key] = false;
        });
      }, 3000);
    },
    // 重呼
    callAgain() {
      this.callLoadingFn(['recallLoading']);
      this.$MyFetch
        .post(baseApi.callRepeat, { serialId: this.callInfo.serialId })
        .then(res => {
          // console.log(res);

          this.callInfo = res;
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
    // 叫号点击确定
    callConfirm() {
      this.confirmFn("是否确认使用房间？", "warning")
        .then(() => {
          this.callNumberVisible = false;
          console.log(this.loading);
          this.loading.close(); // 防止转圈圈
        })
        .catch(() => {});
    },
    // 打印日志
    getLogs(value) {
      this.logs.push(value);
      console.log(value);
    },
    // 清空日志
    clearLogs() {
      this.logs = [];
    }
  },
  destroyed() {
    window.eventBus.$off('getMac');
  }
};
</script>

<style lang="less">
.face2face-undisposed {
  .el-table {
    .el-table__row {
      cursor: pointer;
      &.current-row {
        color: @green;
      }
    }
  }
}
</style>

<style lang="less" scoped>
.face2face-undisposed {
  // .face2face-log {
  //   background: #fff;
  //   border: 1px solid #666;
  //   position: fixed;
  //   right: 0;
  //   bottom: 0;
  //   z-index: 5000;
  //   font-size: 12px;
  //   margin: 10px;
  //   .log-record {
  //     padding: 10px;
  //     border-top: 1px solid #ccc;
  //     border-bottom: 1px solid #ccc;
  //     // border: {
  //     //   top:1px solid #ccc;
  //     //   bottom:1px solid #ccc;
  //     // }
  //     span {
  //       &:last-child {
  //         margin-left: 10px;
  //       }
  //     }
  //   }
  //   ul {
  //     margin: 10px;
  //     margin-top: 5px;
  //     width: 350px;
  //     height: 150px;
  //     overflow-y: scroll;
  //     li {
  //       margin-bottom: 8px;
  //     }
  //   }
  //   .el-icon-info {
  //     cursor: pointer;
  //     font-size: 20px;
  //   }
  // }
  a {
    text-decoration: none;
  }
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
    .call-btn {
      .el-button {
        &:first-child {
          background-color: @green;
        }
      }
    }
  }
}
</style>
