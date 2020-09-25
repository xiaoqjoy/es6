<template>
  <div class="video-component" id="divPluginFather">
    <!-- 面核 -->
    <div id="divPlugin" class="plugin" :style="{width: width + 'px',height: height + 'px'}"></div>
    <!-- {{isVideoSuccess}} -->
    <!-- 录制成功的基础上，录制的视频是否关闭，true为关闭：{{isVideo}} -->

    <!-- <div class="video-btn">
      <el-button type="primary" size="mini" @click="startVideo">开始录像</el-button>
      <el-button type="primary" size="mini" @click="stopVideo">停止录像</el-button>
    </div> -->
  </div>
</template>

<script>
import { baseApi } from "@common/js/server.js";
export default {
  name: "video-component",
  props: {
    // 贷款申请编号
    applicationId: {
      type: String,
      default: ""
    },
    // 贷款申请产品编号（面核可以为空，面签必传）
    productId: {
      type: String,
      default: ""
    },
    // 视频类型（面核：1，面签：0）
    videoType: {
      type: String,
      default: "1"
    },
    // 客户姓名
    customerName: {
      type: String,
      default: ""
    },
    width: {
      type: Number,
      default: 328
    },
    height: {
      type: Number,
      default: 240
    }
  },
  data() {
    return {
      isOpenVideo: true, // 是否开启千里眼

      isVideo: false, // 录制成功的基础上，录制的视频是否关闭，true为关闭

      bizId: "", // 录像业务单号（关闭一个视频录像业务单接口需要）
      videoFileName: "", // 录像文件名称
      startTime: null, // 录像开始时间
      endTime: new Date(), // 录像结束时间
      startTimeDate: null, // 录像开始时间（年月日）
      loading: null, // 加载中
      isVideoSuccess: false, // 是否开启录像成功（开启业务单 - 录像成功）
      paramsType: "", // faceCheck_submit为面核提交，documentsResult为资料签署完成，noRequire为不符合合作机构准入要求
      sMacAddr: ''
      // g_iWndIndex: "",
      // szIP: "",
      // szPort: "",
      // szUsername: "",
      // szPassword: "",
      // localPath: "",
      // savePath: "",
      // fso: null
    };
  },
  created() {
    // 获取mac地址，这里必须将组件实例传入函数
    this.$getMac(this);
    // 录像初始化 - 登录 - 设置本地参数 - 开始预览 -- 开始录像
    this.$on("showVideo", () => {
      this.showVideo();
    });
    // 停止录像 - 停止预览
    this.$on("stopVideo", (params) => {
      this.paramsType = params;
      this.stopVideo();
    });

    this.$on("closeVideo", () => {
      this.closeVideo();
    });

    // let userAgent = navigator.userAgent; // 返回由客户机发送服务器的 user-agent 头部的值。
    // if (userAgent.indexOf(".NET") > -1) {
    //   this.fso = new window.ActiveXObject("Scripting.FileSystemObject");
    // }

    // 全局保存当前选中窗口
    // let g_iWndIndex = ''; // 可以不用设置这个变量，有窗口参数的接口中，不用传值，开发包会默认使用当前选择窗口

    // // 登录详细信息（全部通过远程获取）
    // let szIP = "";
    // let szPort = "";
    // let szUsername = "";
    // let szPassword = "";
    // let localPath = ""; // 本地保存路径
    // let savePath = ""; // 服务中心录像文件保存路径（video组件传参需要）
    // // videoFileName = ""; //录像文件名称

    // console.log(window.WebVideoCtrl);
    // console.log(window.WebVideoCtrl.I_CheckPluginInstall);
  },
  mounted() {},
  methods: {
    // 录像初始化 - 登录 - 设置本地参数 - 开始预览 -- 开始录像
    async showVideo() {
      // 查询处理中心千里眼开关
      this.isOpenVideo = await this.videoSwitch();
      // this.isOpenVideo = true;

      // console.log("是否开启千里眼：" + this.isOpenVideo);
      if (!this.isOpenVideo) {
        return;
      }

      // console.log('录像初始化');
      // 加载
      // this.loading = this.$loading({
      //   text: "",
      //   // spinner: "iconfont icon-loading rotateAnim",
      //   spinner: "",
      //   background: "transparent"
      // });

      setTimeout(() => {
        // 获取网络摄像头配置信息
        this.getVideoInfo()
          .then(res => {
            console.log("获取网络摄像头配置信息成功：");
            console.log(JSON.stringify(res));

            // 录像初始化 - 登录 - 设置本地参数 - 开始预览 -- 开始录像
            // 录像初始化
            // console.log("录像初始化");
            window.videoInit(res, () => {
              // 登录
              // console.log("登录");
              window.clickLogin(() => {
                // 设置本地参数
                // console.log("设置本地参数");
                window.clickSetLocalCfg(() => {
                  // 开始预览 -- 开始录像
                  this.startVideo();
                });
              });
            });

            // this.loading.close();
          })
          .catch(err => {
            // this.loading.close();
            console.error(err);
            this.confirmFn(err.message, "error");
          });
      }, 1000);
    },
    // 获取网络摄像头配置信息
    getVideoInfo() {
      return new Promise((resolve, reject) => {
        const data = {
          bizUserMac: localStorage.getItem("sMacAddr") || this.sMacAddr
        };
        if (!data.bizUserMac) {
          this.$getMac(this);
          this.confirmFn("mac地址获取失败，请使用IE浏览器重新获取", "error");
          console.error('mac地址获取失败，请刷新重新获取----from video component');
          return;
        }
        // if (!data.bizUserIp) {
        //   this.confirmFn("ip地址获取失败，请刷新重新获取", "error");
        //   return;
        // }
        this.$MyFetch
          .get(baseApi.viedelRecording, data)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    // 开始预览 -- （开启一个视频录像业务单） -- 开始录像
    // startVideo() {
    //   // 开始预览
    //   this.clickStartRealPlay(() => {
    //     // 开启一个视频录像业务单
    //     const data = {
    //       applicationId: this.applicationId, // 贷款申请编号
    //       productId: this.productId, // 贷款申请产品编号（面核可以为空，面签必传）
    //       videoType: this.videoType // 视频类型（面核：1，面签：0）
    //     };
    //     // console.log(data);
    //     // 三个参数必传
    //     if (
    //       data.applicationId &&
    //       (data.videoType === "1" ? true : data.productId) &&
    //       data.videoType
    //     ) {
    //       this.$MyFetch
    //         .post(baseApi.viedelRecording_open, data)
    //         .then(res => {
    //           console.log("开启一个视频录像业务单成功：");
    //           console.log(res);
    //           this.bizId = res.bizId;
    //           this.videoFileName = res.videoFileName;

    //           this.startTime = this.$Moment(new Date()).format(
    //             "YYYY-MM-DD HH:mm:ss"
    //           );

    //           // 开始录像
    //           this.clickStartRecord(res, () => {
    //             this.isVideoSuccess = true;
    //           });
    //         })
    //         .catch(err => {
    //           console.error(err);
    //           this.confirmFn("开启视频录像业务单失败，开始录像失败", "error");
    //         });
    //     } else {
    //       console.log("贷款申请编号，贷款申请产品编号，视频类型不能为空，请检查");
    //     }
    //   });
    // },
    // 停止录像 -- （关闭一个视频录像业务单） -- 停止预览
    // stopVideo(info) {
    //   // 停止录像
    //   this.clickStopRecord(() => {
    //     if (!this.startTime) {
    //       this.confirmFn(
    //         "录像开始时间不存在，开启千里眼或开启视频录像业务单失败，请检查"
    //       );
    //       return;
    //     }

    //     this.endTime = this.$Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

    //     // 关闭一个视频录像业务单
    //     const data = {
    //       bizId: this.bizId, // 录像业务单号
    //       endTime: this.endTime, // 录像结束时间
    //       fileRelativePath:
    //         this.$Moment(new Date()).format("YYYY-MM-DD") +
    //         "/" +
    //         this.videoFileName +
    //         ".mp4", // 录像的相对路径
    //       fileAbsolutePath: this.savePath, // 服务中心录像文件保存路径
    //       startTime: this.startTime // 录像开始时间
    //     };
    //     // console.log(data);
    //     if (data.bizId && data.startTime && data.endTime) {
    //       if (data.fileRelativePath || data.fileAbsolutePath) {
    //         this.$MyFetch
    //           .post(baseApi.viedelRecording_close, data)
    //           .then(res => {
    //             console.log("关闭一个视频录像业务单成功：");
    //             console.log(res);

    //             // 停止预览
    //             window.clickStopRealPlay(() => {});
    //           })
    //           .catch(err => {
    //             console.error(err);
    //             this.confirmFn("开启视频录像业务单失败，开始录像失败", "error");
    //           });
    //       } else {
    //         console.log(
    //           "录像的相对路径和服务中心录像文件保存路径，至少有一个不能为空，请检查"
    //         );
    //       }
    //     } else {
    //       console.log(
    //         "录像业务单号，录像开始时间，录像结束时间不能为空，请检查"
    //       );
    //     }
    //   });
    // },
    // 开始预览 -- 开始录像
    startVideo() {
      this.isVideoSuccess = false;
      // console.log(this.isVideoSuccess);
      // 开始预览
      window.clickStartRealPlay(() => {
        // 开始录像
        const data = {
          applicationId: this.applicationId, // 贷款申请编号
          productId: this.productId, // 贷款申请产品编号（面核可以为空，面签必传）
          videoType: this.videoType // 视频类型（面核：1，面签：0）
        };
        // console.log(data);
        // 三个参数必传
        if (
          data.applicationId &&
          (data.videoType === "1" ? true : data.productId) &&
          data.videoType
        ) {
          // 开始录像
          // 面核视频命名规则：applicationId_面核_年月日时分秒（改成：下载视频命名规则：面核+姓名+申请编号+面核提交日期+时间戳）
          // 面签视频命名规则：applicationId_面签_年月日时分秒（改成：下载视频命名规则：面签+姓名+申请编号+面签提交日期+时间戳）
          // if (this.videoType === "1") {
          //   this.videoFileName = `${this.applicationId}_面核_${
          //     new Date().normalizeTime().strTime1
          //   }`;
          // } else if (this.videoType === "0") {
          //   this.videoFileName = `${this.applicationId}_面签_${
          //     new Date().normalizeTime().strTime1
          //   }`;
          // }
          if (this.videoType === "1") {
            this.videoFileName = `面核_${this.customerName}_${this.applicationId}_${
              new Date().normalizeTime().strTime1}_${new Date().getTime()}`;
          } else if (this.videoType === "0") {
            this.videoFileName = `面签_${this.customerName}_${this.applicationId}_${
              new Date().normalizeTime().strTime1}_${new Date().getTime()}`;
          }

          // console.log("录像文件名：", this.videoFileName);

          window.clickStartRecord({ videoFileName: this.videoFileName }, () => {
            this.isVideoSuccess = true;
            this.isVideo = false;

            this.startTime = this.$Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
            this.startTimeDate = this.$Moment(new Date()).format("YYYY-MM-DD");
          });
        } else {
          console.log(
            "贷款申请编号，贷款申请产品编号，视频类型不能为空，请检查"
          );
        }
      });
    },

    // 停止录像 -- 停止预览 - 退出登录 -- （不记录一笔视频录像业务单）
    closeVideo() {
      // 停止录像
      // console.log("停止录像");
      window.clickStopRecord(() => {
        // 停止预览
        // console.log("停止预览");
        window.clickStopRealPlay(() => {
          // 退出登录
          // console.log("退出登录");
          window.clickLogout(() => {

          });
        });
      });
    },

    // 停止录像 -- 停止预览 - 退出登录 -- （记录一笔视频录像业务单）
    stopVideo() {
      if (!this.isOpenVideo) {
        window.eventBus.$emit(this.paramsType);
        return;
      }

      if (!this.isVideoSuccess) {
        this.confirmFn(
            "你还没有录像，请录像后再提交", "error"
          );
      }

      // this.isVideo为true时，说明视频已经产生，再点击则不用停止录像，直接记录一笔视频录像业务单，否则停止录像报错
      if (this.isVideo) {
        // 录制视频结束之后，记录一笔视频录像业务单
        this.recordVideo();
        return;
      }

      // 停止录像
      // console.log("停止录像");
      window.clickStopRecord(() => {
        this.isVideo = true;

        if (!this.startTime) {
          this.confirmFn(
            "录像开始时间不存在，开启千里眼或开启视频录像业务单失败，请检查", "error"
          );
        }

        // 停止预览
        // console.log("停止预览");
        window.clickStopRealPlay(() => {
          // 退出登录
          window.clickLogout(() => {
            // 录制视频结束之后，记录一笔视频录像业务单
            console.log("记录一笔视频录像业务单");
            this.recordVideo();
          });
        });

        // this.endTime = this.$Moment(new Date()).format("YYYY-MM-DD HH:mm:ss");

        // 关闭一个视频录像业务单
        // const data = {
        //   bizId: this.bizId, // 录像业务单号
        //   endTime: this.endTime, // 录像结束时间
        //   fileRelativePath:
        //     this.$Moment(new Date()).format("YYYY-MM-DD") +
        //     "/" +
        //     this.videoFileName +
        //     ".mp4", // 录像的相对路径
        //   fileAbsolutePath: window.savePath, // 服务中心录像文件保存路径
        //   startTime: this.startTime // 录像开始时间
        // };
        // console.log(data);
        //   if (data.bizId && data.startTime && data.endTime) {
        //     if (data.fileRelativePath || data.fileAbsolutePath) {
        //       this.$MyFetch
        //         .post(baseApi.viedelRecording_close, data)
        //         .then(res => {
        //           console.log("关闭一个视频录像业务单成功：");
        //           console.log(res);

        //           // 停止预览
        //           window.clickStopRealPlay(() => {});
        //         })
        //         .catch(err => {
        //           console.error(err);
        //           this.confirmFn("开启视频录像业务单失败，开始录像失败", "error");
        //         });
        //     } else {
        //       console.log(
        //         "录像的相对路径和服务中心录像文件保存路径，至少有一个不能为空，请检查"
        //       );
        //     }
        //   } else {
        //     console.log(
        //       "录像业务单号，录像开始时间，录像结束时间不能为空，请检查"
        //     );
        //   }
      });
    },
    // 录制视频结束之后，记录一笔视频录像业务单
    recordVideo() {
      let data = {
        applicationId: this.applicationId, // 贷款申请编号
        startTime: this.startTime, // 录像开始时间
        endTime: this.$Moment(new Date()).format("YYYY-MM-DD HH:mm:ss"), // 录像结束时间
        f2FType: "counter", // 面签类型（counter：柜面面签，remote：远程面签）
        fileAbsolutePath: window.savePath + `/${this.startTimeDate}/${this.videoFileName}.mp4`, // 服务中心录像文件保存绝对路径，“//10.1.105.174/share1/2018-10-16/RL20160602000138_1464927632735.mp4”
        fileRelativePath: `/${this.startTimeDate}/${
          this.videoFileName
        }.mp4`, // 录像的相对路径
        fileName: `${this.videoFileName}.mp4`, // 录像名称
        productId: this.productId, // 贷款申请产品编号（面核可以为空，面签必传）
        videoType: this.videoType // 视频类型（面核：1，面签：0）
      };
      this.$MyFetch
        .post(baseApi.recordVideo, data)
        .then(res => {
          console.log("视频录制成功");
          // console.log(res);

          window.eventBus.$emit(this.paramsType);
        })
        .catch(err => {
          console.error(err);
          this.confirmFn("视频录制失败", "error");
        });
    },
    // 查询处理中心千里眼开关
    videoSwitch() {
      return new Promise((resolve, reject) => {
        this.$MyFetch
        .get(baseApi.videoSwitch)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          console.error(err);
          this.confirmFn(err.message, "error");
          reject(err);
        });
      });
    }
  },
  beforeDestory() {
    let father = document.getElementById('divPluginFather');
    let child = document.getElementById('divPlugin');
    console.log(child);
    father.removeChild(child);
  }
};
</script>

<style lang="less">
.video-btn {
  height: 40px;
  line-height: 40px;
  text-align: center;
  // position: absolute;
  // z-index: 1000;
  // left: 0;
  // bottom: 0;
}
</style>

<style lang="less" scoped>
.video-component {
  position: relative;
  .plugin {
  }
}
</style>
