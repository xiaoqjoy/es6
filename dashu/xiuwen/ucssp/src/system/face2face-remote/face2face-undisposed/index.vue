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
      <visa :visaVisible="visaVisible" :applicationId="applicationId" :customerName="customerName" :serialId="serialId" @closeDialog="visaVisible = false" @getList="getList"></visa>

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
          <el-table-column prop="productId1" label="产品1"></el-table-column>
          <el-table-column prop="productId2" label="产品2" v-if="!isXiuwen"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button class="button-text" @click="showCheck(scope.row.applicationId,scope.row.customerName)">面签面核</el-button>
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
        <!-- <el-button type="primary" @click="breakPoint">测试录制断点</el-button> -->
        <!-- <el-button type="primary" @click="setCurrentRow">测试取消表格选中高亮</el-button> -->
        <!-- <el-button type="primary" @click="documentSign">测试资料签署</el-button> -->
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
      loading: false, // 加载
      callInfo: {}, // 叫号信息
      sMacAddr: '',
      currentApplicationId: "" // 当前选中业务的申请编号
      // isAgain: false, // 重呼是否置灰
      // isCancel: true // 过号是否置灰
    };
  },
  created() {
    console.log("销毁远程面签getList");
    window.eventBus.$off("getList");
    window.eventBus.$off("setCurrentRow");

    // 查询面签待处理列表
    this.getList();
    window.eventBus.$on("getList", () => {
      this.getList();
    });
    window.eventBus.$on("setCurrentRow", () => {
      this.setCurrentRow();
    });
    // 页面加载后获取mac地址
    this.$getMac(this);
    // this.sMacAddr = localStorage.getItem("sMacAddr");
    // this.getSeatUrl();
  },
  mounted() {
    window.onload = () => {
      // 向子页面发送消息
      // 页面加载完成后再发送消息，否则会因为iframe未加载完成报错
      // document.getElementById('child').contentWindow.postMessage('主页面消息', 'http://localhost:81/test1.html');
      // window.frames[0].postMessage('主页面消息', 'http://localhost:81/test1.html');
    };

    // 接收子页面消息
    // window.addEventListener(
    //   "message",
    //   async (event) => {
    //     // console.log(this);
    //     console.log(event); // 运行了2次
    //     console.log("返回的通知：", event.data.value);

    //     let data = {};

    //     // this.getLogs(event);
    //     // console.log(`before:${this.seatUrl}`);
    //     if (!this.seatUrl) {
    //       this.seatUrl = await this.getSeatUrl();
    //     }
    //     // console.log(`after:${this.seatUrl}`);
    //     if (event.origin === "http://ali6.cloudroom.com") {
    //       switch (event.data.value) {
    //         case "pageReady":
    //           // 页面加载好（叫号不可点击置灰）
    //           this.getLogs("收到 pageReady（页面加载好）");

    //           this.isCallAllow = true;
    //           data = {
    //             type: "toCR",
    //             cmd: "seatNickName",
    //             value: "LIRUIDONG" + new Date().getTime()
    //           };
    //           this.seatNickName = data.value;
    //           setTimeout(() => {
    //             // console.log("发送坐席昵称。。。");
    //             this.getLogs("发送坐席昵称。。。");
    //             window.frames[0].postMessage(
    //               data,
    //               this.seatUrl
    //             );
    //           }, 1000);
    //           break;
    //         case "waiting":
    //           // 已登录，等待中（叫号才能点击取消置灰）
    //           this.getLogs("收到 waiting（已登录，等待中）");
    //           this.isCallAllow = false;
    //           break;
    //         case "remoteControlStart":
    //           // 开启了远程控制(父页面将iframe放大)
    //           this.getLogs("收到 remoteControlStart（开启了远程控制，父页面将iframe放大）");
    //           this.popupWidth = document.body.clientWidth;
    //           this.popupHeight = document.body.clientHeight;

    //           // 通知已经放大iframe 大小
    //           data = {
    //             type: "toCR",
    //             cmd: "ResizeFrameAlready",
    //             value: ""
    //           };
    //           window.frames[0].postMessage(
    //             data,
    //             this.seatUrl
    //           );
    //           break;
    //         case "inMeeting":
    //           // 显示云屋窗口
    //           this.getLogs("收到 inMeeting（显示云屋窗口）");
    //           this.isShowDialog = true;
    //           break;
    //         case "remoteControlEnd":
    //           // 结束了远程控制(父页面将iframe还原)
    //           this.getLogs("收到 remoteControlEnd（开启了远程控制，父页面将iframe还原）");
    //           this.popupWidth = 400;
    //           this.popupHeight = 700;
    //           break;
    //         case "endMeeting":
    //           this.getLogs("收到 endMeeting，挂断视频，iframe关闭");
    //           this.isShowDialog = false;
    //           break;
    //         case "floatShow":
    //           this.getLogs("收到 floatShow，大窗口（展示身份校验）");
    //           this.popupHeight = 700;
    //           break;
    //         case "floatHidden":
    //           this.getLogs("收到 floatHidden，小窗口（不展示下部）");
    //           this.popupHeight = 300;
    //           break;
    //         default:
    //           break;
    //       }
    //     }
    //   },
    //   false
    // );
  },
  watch: {},
  methods: {
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
      this.$refs.tableData.setCurrentRow();
    },

    // getSeatUrl() {
    //   return this.cloudroomAccessInfo()
    //     .then((_data) => {
    //       try {
    //         if (!_data.seatUrl) {
    //           throw new Error('座席地址未配置');
    //         }
    //         this.seatUrl = _data.seatUrl;
    //         return Promise.resolve(this.seatUrl);
    //       } catch (error) {
    //         return Promise.reject(error);
    //       }
    //     }).catch(_error => {
    //       this.confirmFn(_error.message, 'error');
    //     });
    // },
    // // 录制断点
    // async breakPoint(msg) {
    //   this.$emit("getLogs", msg);
    //   let data = {
    //     type: "toCR",
    //     cmd: "recording",
    //     value: "breakPoint"
    //   };
    //   if (!this.seatUrl) {
    //     this.seatUrl = await this.getSeatUrl();
    //   }
    //   window.frames[0].postMessage(
    //     data,
    //     this.seatUrl
    //   );

    //   // 录制视频成功之后
    //   // if (this.videoType === "1") {
    //   //   this.videoFileName = `面核_${this.customerName}_${this.applicationId}_${
    //   //     new Date().normalizeTime().strTime1}_${new Date().getTime()}`;
    //   // } else if (this.videoType === "0") {
    //   //   this.videoFileName = `面签_${this.customerName}_${this.applicationId}_${
    //   //     new Date().normalizeTime().strTime1}_${new Date().getTime()}`;
    //   // }

    //   // // 录制视频结束之后，记录一笔视频录像业务单
    //   // this.recordVideo();
    // },
    //  录制视频结束之后，记录一笔视频录像业务单
    // recordVideo() {
    //   let data = {
    //     applicationId: this.applicationId, // 贷款申请编号
    //     startTime: this.startTime, // 录像开始时间
    //     endTime: this.$Moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), // 录像结束时间
    //     f2FType: "counter", // 面签类型（counter：柜面面签，remote：远程面签）
    //     fileAbsolutePath: window.savePath + `/${this.startTimeDate}/${this.videoFileName}.mp4`, // 服务中心录像文件保存绝对路径，“//10.1.105.174/share1/2018-10-16/RL20160602000138_1464927632735.mp4”
    //     fileRelativePath: `/${this.startTimeDate}/${
    //       this.videoFileName
    //     }.mp4`, // 录像的相对路径
    //     fileName: `${this.videoFileName}.mp4`, // 录像名称
    //     productId: this.productId, // 贷款申请产品编号（面核可以为空，面签必传）
    //     videoType: this.videoType // 视频类型（面核：1，面签：0）
    //   };
    //   this.$MyFetch
    //     .post(baseApi.recordVideo, data)
    //     .then(res => {
    //       console.log("视频录制成功：");
    //       // console.log(res);

    //       window.eventBus.$emit(this.paramsType);
    //     })
    //     .catch(err => {
    //       console.error(err);
    //       this.confirmFn("视频录制失败", "error");
    //     });
    // },

    // 用于调试
    // breakPoint() {
    //   this.$store.dispatch("set_breakPoint", {
    //     isBreakPoint: true,
    //     msg: "面签录像开始断点",
    //     applicationId: "RL20190313057796",
    //     customerName: "静静",
    //     productId: "P20190101000065",
    //     videoType: "0"
    //   });
    // },
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
    // 显示并开始面核面签
    showCheck(applicationId, customerName) {
      console.log("申请编号：" + applicationId);
      this.applicationId = applicationId;
      this.customerName = customerName;
      // 开始处理面签待处理项
      this.pendingStart(applicationId).then(() => {
        this.visaVisible = true;
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
            this.confirmFn(err.message, "error");
          });
      });
    },

    // 选中表格数据
    rowClick(row) {
      this.currentApplicationId = row.applicationId;
      console.log(this.currentApplicationId);
    },

    // 叫号
    getCallInfo: async function() {
       // 是否获取到mac地址
      if (!this.sMacAddr) {
        this.$getMac(this);
        this.confirmFn('获取mac地址失败，请刷新重试或使用IE11浏览器', 'warning');
        return false;
      }

      // 云屋没有收到waiting，isCallAllow就为true，不能进行叫号操作了
      if (this.$store.state.face2face.isCallAllow) {
        this.confirmFn("云屋窗口加载失败");
        return;
      }

      // 音视频加载
      this.loading = this.$loading({
        text: "",
        spinner: "",
        background: "transparent"
      });

      this.callLoading = true;
      const data = {
        macAddress: localStorage.getItem("sMacAddr")
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
      //   associateAccount: "client1",
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

            this.callLoading = false;
            this.loading.close();

            resolve(res);
          })
          .catch(err => {
            console.error(err);
            this.callLoading = false;
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
            this.currentApplicationId = "";

            this.callLoading = false;
            this.loading.close();

            resolve(res);
          })
          .catch(err => {
            console.error(err);
            this.callLoading = false;
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

    // 重呼
    callAgain() {
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
