<template>
  <div class="face2face common-style">

    <!-- <iframe src="http://ali6.cloudroom.com/pages/dashu/seat.html" frameborder="0" scrolling="yes" width="400" height="700"></iframe> -->

    <!-- 远程面签的日志打印 -->
    <div class="face2face-log">
      <div v-if="isLogs">
        <el-button size="mini" @click='clearLogs'>清空日志</el-button>
        <el-button size="mini" @click='isLogs = false'>隐藏日志</el-button>
        <div class="log-record">
          <span>mac地址：{{sMacAddr}}</span>
          <!-- <span>流水号：{{serialId}}</span> -->
        </div>
        <ul>
          <li v-for="(item,index) in logs" :key="index">{{logs.length - index}}: {{item}}</li>
        </ul>
      </div>
      <i v-else class="el-icon-info" @click="isLogs = true" title="显示日志"></i>
    </div>

    <!-- {{isShowDialog}} -- {{isOpenVideo}} -->

    <!-- 云屋最小化图标 -->
    <!-- <img src="@common/img/video.png" alt="" class="minimum-icon" v-show="!isShowDialog && isOpenVideo" @click="isShowDialog = true" title="还原"> -->
    <!-- <div v-show="!isShowDialog && isOpenVideo">
      <popup
        :isShowDialog="isOpenVideo"
        :url="require('@common/img/video1.png')"
        :width="50"
        :height="50"
        :iframe="false"
        :videoIcon="true"
        :center="false"
        @maxmumFn="maxmumFn"
        name="云屋视频图标"
        >
      </popup>
    </div> -->

    <!-- 云屋窗口 -->
    <popup
    :url="seatUrl"
    id="child"
    :width="popupWidth"
    :height="popupHeight"
    :isShowDialog="isShowDialog"
    :iframe="true"
    :center="false"
    :isVideo="true"
     @minimumFn="minimumFn"
     name="云屋视频窗口"
     >
    </popup>

    <div class="tab-home">
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tab">
        <el-tab-pane label="待处理" name="face2face-remote-undisposed"></el-tab-pane>
        <el-tab-pane label="已处理" name="face2face-remote-disposed"></el-tab-pane>
      </el-tabs>

      <p v-if="activeName === 'face2face-remote-undisposed' && !isCpms_r_manager_0003">
        剩余面签数量：
        <span class="theme">{{total}}</span>
        <i class="el-icon-refresh theme" :class="{rotateAnim: isRefresh}" @click="refresh" title="刷新数量"></i>
      </p>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { baseApi } from "./js/server.js";
import popup from "@components/popup";
export default {
  name: "face2face",
  components: {
    popup
  },
  data() {
    return {
      // 打印日志
      logs: [],
      isLogs: false, // 是否隐藏日志
      sMacAddr: "", // mac地址

      activeName: "face2face-remote-undisposed",
      isRefresh: false, // 是否需要刷新
      total: 0, // 剩余面签数量

      isOpenVideo: false, // 云屋是否打开了
      isShowDialog: false, // 云屋远程音视频的显示与隐藏
      // seatNickName: "", // 坐席昵称
      popupWidth: 400, // 云屋远程音视频的宽度
      popupHeight: 300, // 云屋远程音视频的高度
      seatUrl: "", // 云屋坐席地址
      videoFileName: "", // 视频名称
      videoData: {}, // 录制断点的参数
      startTime: null, // 录制开始时间
      endTime: null // 录像结束时间
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.activeName = to.name;
    next();
  },
  computed: {
    breakPointVal() {
      return this.$store.getters.breakPoint;
    }
  },
  watch: {
    "$route.name"() {
      this.activeName = this.$route.name;
    },
    breakPointVal(newVal, oldVal) {
      // console.log(newVal);
      if (newVal.isBreakPoint) {
        if (newVal.isStart) {
          this.breakPoint(newVal);
          console.log('觸發breakPoint');
        } else {
          this.stopBreakPoint(newVal);
          console.log('觸發stopBreakPoint');
        }
      }
    }
  },
  beforeCreate() {
    // 获取mac地址
    this.$getMac();
  },
  created() {
    // 显示云屋窗口，测试
    // setTimeout(() => {
    //   this.isShowDialog = true;
    // }, 2000);

    // 提示需要使用IE11浏览器
    // this.$useIE11Fn();

    // this.videoLoading = this.$loading({
    //   text: "视频上传中，稍等片刻...",
    //   spinner: "",
    //   background: "transparent"
    // });

    this.activeName = this.$route.name;

    console.log("销毁远程面签remote_getTotal");
    window.eventBus.$off("remote_getTotal");
    window.eventBus.$off("getLogs");

    // 获取剩余面签数量
    this.getTotal();
    window.eventBus.$on("remote_getTotal", () => {
      // 获取剩余面签数量
      this.getTotal();
    });
    window.eventBus.$on("getLogs", value => {
      // 打印日志
      this.getLogs(value);
    });
    this.getSeatUrl();

    // let videoData = JSON.parse(sessionStorage.getItem('videoData'));
    // let videoName = JSON.parse(sessionStorage.getItem('videoName'));
    // this.getLogs(videoName + 'from record api');
    // this.getLogs(videoData, 'form record api');
  },
  mounted() {
    // 接收子页面消息
    window.addEventListener(
      "message",
      // 使用具名函数，方便移除监听事件
      async event => {
      // console.log(this);

        let data = {};
        this.sMacAddr = localStorage.getItem("sMacAddr");
        // console.log(`before:${this.seatUrl}`);

        if (!this.seatUrl) {
          this.seatUrl = await this.getSeatUrl();
        }
        // console.log(this.seatUrl);
        // console.log(`after:${this.seatUrl}`);
        if (this.seatUrl.includes(event.origin)) {
          let state = event.data.value;

          // console.log("云屋返回的消息：" + event.data);
          console.log("云屋返回的通知：", state);

          switch (state) {
            case "pageReady":
              // 页面加载好（叫号不可点击置灰）
              this.getLogs("收到 pageReady（页面加载好）");

              let DSFUserInfo = localStorage.getItem("DSFUserInfo");
              let userId = "";
              if (DSFUserInfo) {
                userId = JSON.parse(DSFUserInfo).userId;
              }

              // this.isCallAllow = true;
              this.$store.dispatch("set_isCallAllow", false);
              data = { // 座席端
                type: "toCR",
                cmd: "seatNickName",
                // value: "LIRUIDONG" + new Date().getTime()
                value: userId
              };
              // this.seatNickName = data.value;
              this.$store.dispatch("set_seatNickName", data.value);
              setTimeout(() => {
                this.getLogs(`发送坐席昵称：${JSON.stringify(data)}`);
                // console.log(this.seatUrl);
                window.frames[0].postMessage(data, this.seatUrl);
              }, 1000);
              break;
            case "waiting":
              this.$store.dispatch("set_currentState", state);
              // 已登录，等待中（叫号才能点击取消置灰）
              this.getLogs("收到 waiting（已登录，等待中）");
              // this.isCallAllow = false;
              this.$store.dispatch("set_isCallAllow", true);
              break;
            case "inMeeting":
              this.$store.dispatch("set_currentState", state);
              // 显示云屋窗口

              // 进入到面核时 -- 开始断点
              // let customerName = this.$store.getters.selectRowInfo.customerName;
              // let applicationId = this.$store.getters.selectRowInfo.applicationId;
              // this.$store.dispatch("set_breakPoint", {
              //   isBreakPoint: true,
              //   msg: "面核开始录像",
              //   applicationId,
              //   customerName,
              //   productId: "",
              //   videoType: "1",
              //   oper: null,
              //   isStart: true
              // });

              // window.frames[0].postMessage(data, this.seatUrl);
              this.getLogs("收到 inMeeting（显示云屋窗口）");
              this.isShowDialog = true;
              // this.isOpenVideo = false;
              break;
            case "success":
              // 判断是否是提交操作
              console.log("是否是提交操作：", this.$store.state.face2face.isSubmitOperate);
              if (this.$store.state.face2face.isSubmitOperate) {
                console.log("===========提交操作===========");
                // 录制视频成功，录制视频结束之后，记录一笔视频录像业务单
                // console.log(this.videoData);
                console.log("===========success===========");
                this.recordVideo(this.videoData);
                // this.$store.dispatch("set_isSubmitOperate", false);
              }
              break;
            case "fail":
              this.$store.dispatch("set_currentState", state);
              // 录制视频失败，就会提示云屋录制视频失败
              this.confirmFn("云屋视频录制失败", "error");
              break;
            // case "recording success":
            //   // 录制视频成功，录制视频结束之后，记录一笔视频录像业务单
            //   // this.recordVideo(this.videoData);
            //   break;
            // case "recording faile":
            //   // 录制视频失败，就会提示云屋录制视频失败
            //   console.log(event.data.msg);
            //   this.confirmFn("云屋视频录制失败", "error");
            //   break;
            case "remoteControlStart":
              // 开启了远程控制(remoteControlStart父页面将iframe放大)
              this.getLogs(
                "收到 remoteControlStart（开启了远程控制，父页面将iframe放大）"
              );
              this.popupWidth = document.body.clientWidth;
              this.popupHeight = document.body.clientHeight;

              // 通知已经放大iframe 大小
              data = {
                type: "toCR",
                cmd: "ResizeFrameAlready",
                value: ""
              };
              window.frames[0].postMessage(data, this.seatUrl);
              break;
            case "remoteControlEnd":
              // 结束了远程控制(父页面将iframe还原)
              this.getLogs(
                "收到 remoteControlEnd（开启了远程控制，父页面将iframe还原）"
              );
              this.popupWidth = 400;
              this.popupHeight = 700;
              break;
            case "endMeeting":
              this.$store.dispatch("set_currentState", state);
              this.getLogs("收到 endMeeting，挂断视频，iframe关闭");
              this.isShowDialog = false;
              window.eventBus.$emit("setCurrentRow");
              break;
            case "floatShow":
              this.getLogs("收到 floatShow，大窗口（展示身份校验）");
              this.popupHeight = 700;
              break;
            case "floatHidden":
              this.getLogs("收到 floatHidden，小窗口（不展示下部）");
              this.popupHeight = 300;
              break;
            default:
              break;
          }
        }
      },
      false
    );
  },
  // beforeDestroy() {
  //   // 移除监听事件；
  //   window.removeEventListener('message', this.watchHandler);
  // },
  methods: {
    // 云屋视频窗口还原
    maxmumFn() {
      this.isShowDialog = true;
      this.isOpenVideo = false;
    },
    // 云屋视频窗口最小化
    minimumFn() {
      this.isShowDialog = false;
      this.isOpenVideo = true;
    },

    // 切换tabs
    handleClick(tab, event) {
      this.$router.push({ name: tab.name });

      // 获取剩余面签数量
      this.getTotal();
    },

    // 获取剩余面签数量
    getTotal() {
      if (!this.isCpms_r_manager_0003) {
        this.$MyFetch
          .get(baseApi.pending_amount)
          .then(res => {
            // console.log(res);
            this.total = res;
          })
          .catch(err => {
            // console.log('请求失败');
            console.error(err);
            this.confirmFn(err.message, "error");
          });
      }
    },

    // 刷新剩余面签数量
    refresh() {
      this.isRefresh = true;
      setTimeout(() => {
        this.getTotal();
        this.isRefresh = false;
      }, 500);
    },

    // ==================================== 云屋音视频 =======================================
    getSeatUrl() {
      return this.cloudroomAccessInfo()
        .then(_data => {
          try {
            if (!_data.seatUrl) {
              throw new Error("座席地址未配置");
            }
            this.seatUrl = _data.seatUrl;
            sessionStorage.setItem('seatUrl', this.seatUrl);
            return Promise.resolve(this.seatUrl);
          } catch (error) {
            return Promise.reject(error);
          }
        })
        .catch(_error => {
          this.confirmFn(_error.message, "error");
        });
    },
    // 开始录制
    async breakPoint(params) {
      if (!this.seatUrl) {
        this.seatUrl = await this.getSeatUrl();
      }
      // console.log(params, '打印params');
      this.videoData = params;
      // console.log(this.videoData, '打印videoData');
      let data = {};

      if (params.videoType === "1") {
        this.videoFileName = `面核_${params.customerName}_${
          params.applicationId
        }_${new Date().normalizeTime().strTime1}_${new Date().getTime()}`;
      } else if (params.videoType === "0") {
        this.videoFileName = `面签_${params.customerName}_${
          params.applicationId
        }_${new Date().normalizeTime().strTime1}_${new Date().getTime()}`;
      }
      // this.getLogs(`文件名为：${this.videoFileName}`);
      data = {
        type: "toCR",
        cmd: "startRecording",
        videoName: this.videoFileName + ".flv"
      };

      this.getLogs(`${params.msg}`);
      sessionStorage.setItem('videoName', this.videoFileName);
      sessionStorage.setItem('videoData', JSON.stringify(this.videoData));
      // console.log("地址：", this.seatUrl);
      // 通知云屋开始录制
      window.frames[0].postMessage(data, this.seatUrl);

      // 录制视频结束之后，记录一笔视频录像业务单
      // this.recordVideo(params);
      this.$store.dispatch("set_breakPoint", {
        isBreakPoint: false,
        msg: "",
        applicationId: "",
        customerName: "",
        productId: "",
        videoType: "1",
        oper: null,
        isStart: false
      });
    },
    // 结束录像
    async stopBreakPoint(params) {
      if (!this.seatUrl) {
        this.seatUrl = await this.getSeatUrl();
      }

      this.videoData.msg = params.msg;
      this.videoData.oper = params.oper;
      sessionStorage.setItem('videoData', JSON.stringify(this.videoData));
      let data = {
        type: "toCR",
        cmd: "stopRecording"
      };
      window.frames[0].postMessage(data, this.seatUrl);

      this.getLogs(`${params.msg}`);

      this.$store.dispatch("set_breakPoint", {
        isBreakPoint: false,
        msg: "",
        applicationId: "",
        customerName: "",
        productId: "",
        videoType: "1",
        oper: null,
        isStart: false
      });
    },
    //  录制视频结束之后，记录一笔视频录像业务单
    recordVideo(params) {
      // console.log("记录一笔视频录像业务单，", params.msg);
      console.log(params + 'FROM RECORD API');
      this.getLogs(`记录一笔视频录像业务单，${params.msg}`);
      this.startTime = this.$Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      let videoData = JSON.parse(sessionStorage.getItem('videoData'));
      let videoName = sessionStorage.getItem('videoName');
      this.getLogs(`${videoName} from record api`);
      this.getLogs(`${videoData} form record api`);
      let data = {
        applicationId: videoData.applicationId, // 贷款申请编号
        startTime: this.startTime, // 录像开始时间
        endTime: this.startTime, // 录像结束时间
        f2FType: "remote", // 面签类型（counter：柜面面签，remote：远程面签）
        fileAbsolutePath: "", // 服务中心录像文件保存绝对路径
        fileRelativePath: "", // 录像的相对路径
        fileName: `${videoName}.flv`, // 录像名称
        productId: videoData.productId, // 贷款申请产品编号（面核可以为空，面签必传）
        videoType: videoData.videoType // 视频类型（面核：1，面签：0）
      };
      // let data1 = {
      //   applicationId: params.applicationId, // 贷款申请编号
      //   startTime: this.startTime, // 录像开始时间
      //   endTime: this.startTime, // 录像结束时间
      //   f2FType: "remote", // 面签类型（counter：柜面面签，remote：远程面签）
      //   fileAbsolutePath: "", // 服务中心录像文件保存绝对路径
      //   fileRelativePath: "", // 录像的相对路径
      //   fileName: `${this.videoFileName}.flv`, // 录像名称
      //   productId: params.productId, // 贷款申请产品编号（面核可以为空，面签必传）
      //   videoType: params.videoType // 视频类型（面核：1，面签：0）
      // };
      // console.log(data1, 'data1 FROM RECORD API');
      console.log('文件名FROM RECORD API ', this.videoFileName);
      this.$MyFetch
        .post(baseApi.recordVideo, data)
        .then(res => {
          console.log("记录一笔视频录像业务单成功");
          // console.log(res);
          this.$store.dispatch("set_isSubmitOperate", false);

          let operate = "";
          let oper = videoData.oper;
          switch (true) {
            case oper === 0:
              operate = "endIdentity1";
              break;
            case oper === 1:
              operate = "faceCheck_submit1";
              break;
            case oper === 2:
              operate = "noRequire1";
              break;
            case oper === 3:
              operate = "documentsResult1";
              break;
            default:
              break;
          }
          window.eventBus.$emit(operate);
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
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
    // 释放房间 - 远程面签成功提交时调用（远程面签调用）
    faceSignCommit() {
      let serialId = localStorage.getItem("serialId");
      if (serialId) {
        this.$MyFetch
          .post(baseApi.faceSignCommit, { serialId })
          .then(res => {
            this.$emit("getLogs", `释放流水号成功：${serialId}`);
            // 清除流水号serialId的缓存
            localStorage.removeItem("serialId");
            this.$emit(
              "getLogs",
              `清除流水号的缓存成功serialId：${localStorage.removeItem(
                "serialId"
              ) || "无"}`
            );
          })
          .catch(err => {
            console.error(err);
            this.confirmFn(err.message, "error");
            // 清除流水号serialId的缓存
            localStorage.removeItem("serialId");
          });
      }
    },

    // 打印日志
    getLogs(value) {
      this.logs.unshift(value); // 修改成倒置类型
      console.log(value);
    },
    // 清空日志
    clearLogs() {
      this.logs = [];
    }
  }
};
</script>

<style lang="less">
.v-modal {
  z-index: 400 !important;
}
</style>

<style lang="less" scoped>
.face2face {
  .minimum-icon{
      position: absolute;
      top: 0;
      right: 0;
      z-index: 3000;
      width: 50px;
      height: 50px;
      // cursor: pointer;
    }

  .face2face-log {
    background: #fff;
    border: 1px solid #666;
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 5000;
    font-size: 12px;
    margin: 10px;
    .log-record {
      padding: 10px;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      // border: {
      //   top:1px solid #ccc;
      //   bottom:1px solid #ccc;
      // }
      span {
        &:last-child {
          margin-left: 10px;
        }
      }
    }
    ul {
      margin: 10px;
      margin-top: 5px;
      width: 350px;
      height: 150px;
      overflow-y: scroll;
      li {
        margin-bottom: 8px;
      }
    }
    .el-icon-info {
      cursor: pointer;
      font-size: 20px;
    }
  }

  .tab-home {
    .el-icon-refresh {
      margin-left: 20px;
      cursor: pointer;
    }
  }

}
</style>
