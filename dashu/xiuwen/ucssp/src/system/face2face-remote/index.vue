<template>
  <div class="face2face common-style">

    <!-- 远程面签的日志打印 -->
    <div class="face2face-log">
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
    </div>

    <!-- {{isShowDialog}} -- {{isOpenVideo}} -->

    <!-- 云屋最小化图标 -->
    <!-- <img src="@common/img/video.png" alt="" class="minimum-icon" v-show="!isShowDialog && isOpenVideo" @click="isShowDialog = true" title="还原"> -->
    <div v-show="!isShowDialog && isOpenVideo">
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
    </div>

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
        this.breakPoint(newVal);
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
  },
  mounted() {
    window.onload = () => {
      // 向子页面发送消息
      // 页面加载完成后再发送消息，否则会因为iframe未加载完成报错
      // document.getElementById('child').contentWindow.postMessage('主页面消息', 'http://localhost:81/test1.html');
      // window.frames[0].postMessage('主页面消息', 'http://localhost:81/test1.html');
    };

    // 接收子页面消息
    window.addEventListener(
      "message",
      async event => {
        // console.log(this);

        let data = {};
        this.sMacAddr = localStorage.getItem("sMacAddr");
        // console.log(`before:${this.seatUrl}`);
        if (!this.seatUrl) {
          this.seatUrl = await this.getSeatUrl();
        }

        // console.log(`after:${this.seatUrl}`);
        if (event.origin === "http://ali6.cloudroom.com") {
          console.log("云屋返回的消息：" + event.data + " 地址：", this.seatUrl);
          console.log("云屋返回的通知：", event.data.value);

          switch (event.data.value) {
            case "pageReady":
              // 页面加载好（叫号不可点击置灰）
              this.getLogs("收到 pageReady（页面加载好）");

              // this.isCallAllow = true;
              this.$store.dispatch("set_isCallAllow", true);
              data = {
                type: "toCR",
                cmd: "seatNickName",
                value: "LIRUIDONG" + new Date().getTime()
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
              // 已登录，等待中（叫号才能点击取消置灰）
              this.getLogs("收到 waiting（已登录，等待中）");
              // this.isCallAllow = false;
              this.$store.dispatch("set_isCallAllow", false);
              break;
            case "inMeeting":
              // 显示云屋窗口

              // 进入到面核时 -- 开始断点
              let customerName = this.$store.getters.selectRowInfo.customerName;
              let applicationId = this.$store.getters.selectRowInfo.applicationId;
              this.$store.dispatch("set_breakPoint", {
                isBreakPoint: true,
                msg: "面核录像开始断点",
                applicationId,
                customerName,
                productId: "",
                videoType: "1"
              });

              window.frames[0].postMessage(data, this.seatUrl);
              this.getLogs("收到 inMeeting（显示云屋窗口）");
              this.isShowDialog = true;
              // this.isOpenVideo = false;
              break;
            case "recording success":
              // 录制视频成功，录制视频结束之后，记录一笔视频录像业务单
              this.recordVideo(this.videoData);
              break;
            case "recording faile":
              // 录制视频失败，就会提示云屋录制视频失败，请到待处理列表进行叫号重连，并且挂断云屋视频窗口，并且释放房间
              console.log(event.data.msg);
              this.confirmFn("云屋视频录制失败", "error");
              // data = {
              //   type: "toCR",
              //   cmd: "call",
              //   value: "hangUpCall"
              // };
              // window.frames[0].postMessage(data, this.seatUrl);
              // // 释放房间
              // this.faceSignCommit();
              break;
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
            return Promise.resolve(this.seatUrl);
          } catch (error) {
            return Promise.reject(error);
          }
        })
        .catch(_error => {
          this.confirmFn(_error.message, "error");
        });
    },
    // 录制断点
    async breakPoint(params) {
      this.videoData = params;
      if (!this.seatUrl) {
        this.seatUrl = await this.getSeatUrl();
      }

      // 录制视频成功之后
      console.log("是否是面签还是面核：", params.videoType);
      if (params.videoType === "1") {
        this.videoFileName = `面核_${params.customerName}_${
          params.applicationId
        }_${new Date().normalizeTime().strTime1}_${new Date().getTime()}`;
      } else if (params.videoType === "0") {
        this.videoFileName = `面签_${params.customerName}_${
          params.applicationId
        }_${new Date().normalizeTime().strTime1}_${new Date().getTime()}`;
      }
       this.getLogs(`${params.msg}，文件名为：${this.videoFileName}`);

      let data = {
        type: "toCR",
        cmd: "recording",
        value: params.videoType === "1" ? {firstRecordName: `${this.videoFileName}.mp4`} : {newRecordName: `${this.videoFileName}.mp4`}
        // value: {name: `${this.videoFileName}.mp4`}
      };
      console.log("地址：", this.seatUrl);

      window.frames[0].postMessage(data, this.seatUrl);

      // 录制视频结束之后，记录一笔视频录像业务单
      // this.recordVideo(params);

      this.$store.dispatch("set_breakPoint", {
        isBreakPoint: false,
        msg: "",
        applicationId: "",
        customerName: "",
        productId: "",
        videoType: "1"
      });
    },
    //  录制视频结束之后，记录一笔视频录像业务单
    recordVideo(params) {
      console.log("记录一笔视频录像业务单，", params.msg);
      this.startTime = this.$Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
      let data = {
        applicationId: params.applicationId, // 贷款申请编号
        startTime: this.startTime, // 录像开始时间
        endTime: this.startTime, // 录像结束时间
        f2FType: "remote", // 面签类型（counter：柜面面签，remote：远程面签）
        fileAbsolutePath: "", // 服务中心录像文件保存绝对路径
        fileRelativePath: "", // 录像的相对路径
        fileName: `${this.videoFileName}.mp4`, // 录像名称
        productId: params.productId, // 贷款申请产品编号（面核可以为空，面签必传）
        videoType: params.videoType // 视频类型（面核：1，面签：0）
      };
      console.log(data);
      this.$MyFetch
        .post(baseApi.recordVideo, data)
        .then(res => {
          console.log("记录一笔视频录像业务单成功");
          // console.log(res);

          // window.eventBus.$emit(this.paramsType);
        })
        .catch(err => {
          console.error(err);
          this.confirmFn("记录一笔视频录像业务单失败", "error");
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
      this.logs.push(value);
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
  z-index: 2000 !important;
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
