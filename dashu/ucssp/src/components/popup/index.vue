
<template>
  <!-- 拖动窗口组件 -->
  <transition name="scale">
    <div class="popup" v-show="isShowDialog" :style="{left: clientX + 'px',top: clientY + 'px',width: popupWidth + 'px',height: popupHeight + 'px'}" @mousedown.prevent="down" @mouseup.prevent="up">
        <div v-if="!isVideo && !videoIcon">
          <div class="scale-btn top-left" ref="topLeft"></div>
          <div class="scale-btn top-right" ref="topRight"></div>
          <div class="scale-btn bottom-left" ref="bottomLeft"></div>
          <div class="scale-btn bottom-right" ref="bottomRight"></div>
        </div>

        <div v-show="iframe">
          <div v-if="isVideo" class="popup-video">
            <div class="popup-top">
              <!-- <span class="minimum" title="最小化" @click="$emit('minimumFn')" ref="miniIcon">-</span> -->
            </div>
            <!-- <p>{{url}}</p> -->
            <iframe :src="url" frameborder="0" scrolling="yes" :width="width" :height="height"></iframe>
          </div>
          <div v-if="isReport" class="credit-report">
            <!-- <span class="close el-icon-circle-close-outline" @mousedown.stop="$emit('closeDialog')" title="关闭"></span> -->
            <!-- <div class="cover"></div> -->
            <div class="popup-top">
              <span>征信报告</span>
              <div class="dialog-top-right">
                <!-- <i class="iconfont icon-video theme" v-if="applicationId && isAppAud"></i>
                <span class="theme" @click.stop="$showImage(applicationId, menuDesc)" v-if="applicationId && isAppAud">上传影像资料</span> -->
                <i class="el-icon-close" @mousedown.stop="$emit('closeDialog')" title="关闭"></i>
              </div>
            </div>
            <iframe :src="url" frameborder="0" scrolling="yes" :width="popupWidth" :height="popupHeight - 40"></iframe>
          </div>
        </div>
        <div v-if="!iframe">
          <div v-if="videoIcon">
            <img :src="url" alt="" class="video-icon" ref="videoIcon" :style="{width: popupWidth + 'px',height: popupHeight + 'px'}" title="还原">
          </div>
          <div v-else>
            <span class="close el-icon-circle-close-outline" @mousedown.stop="$emit('closeDialog')" title="关闭"></span>
            <img :src="url" alt="" :style="{width: popupWidth + 'px',height: popupHeight + 'px'}">
          </div>
        </div>
      </div>
  </transition>
</template>

<script>
export default {
  name: "popup",
  props: {
    // 审批审计页面跳转时 是否展示查看影像按钮
    isAppAud: {
      type: Boolean,
      default: true
    },
    // 拖动弹框的显示与隐藏
    isShowDialog: {
      type: Boolean,
      default: false
    },
    // 云屋是否打开了
    // isOpenVideo: {
    //   type: Boolean,
    //   default: false
    // },
    // 申请编号 - 查看影像资料
    applicationId: {
      type: String,
      defualt: ""
    },
    // 菜单编码 - 查看影像资料
    menuDesc: {
      type: String,
      defualt: ""
    },
    // 是否是iframe
    iframe: {
      type: Boolean,
      default: true
    },
    // 是否水平居中，图片路径是水平居中
    center: {
      type: Boolean,
      default: true
    },
    // iframe或图片路径
    url: {
      type: String,
      default: ""
    },
    // 拖动弹框的宽度
    width: {
      type: Number,
      default: 400
    },
    // 拖动弹框的高度
    height: {
      type: Number,
      default: 300
    },
    // 判断是否是征信报告
    isReport: {
      type: Boolean,
      defualt: false
    },
    // 判断是否是云屋音视频
    isVideo: {
      type: Boolean,
      default: false
    },
    // 是否是视频图标
    videoIcon: {
      type: Boolean,
      default: false
    },
    // 名字
    name: {
      type: String,
      default: ""
    }
  },
  components: {},
  data() {
    return {
      isDrag: false, // 是否需要拖动
      // isOpenVideo: false, // 云屋是否打开了
      clientX: document.body.clientWidth - this.width - 50, // 左边距离（原点横坐标）
      clientY: 50, // 顶部距离（原点纵坐标）
      OffsetX: 0, // 离父元素左边距离（离左上角原点的水平距离）
      OffsetY: 0, // 离父元素顶部距离（离左上角原点的垂直距离）

      isScale: false, // 是否需要放大缩小
      scaleArrow: 'top-left', // 缩放的方向，top-left：左上角，top-right：右上角，bottom-left：左下角，bottom-right：右下角
      popupWidth: 400, // 整个popup宽度，通过width赋值
      popupHeight: 300, // 整个popup高度，通过height赋值
      clientXClick: 0, // 鼠标点击时的左边距离
      clientYClick: 0 // 鼠标点击时的顶部距离

    };
  },
  created() {},
  mounted() {},
  watch: {
    // isOpenVideo(newVal, oldVal) {
    //   if (newVal) {
    //     this.popupWidth = this.width;
    //     this.popupHeight = this.height;
    //   } else {
    //     this.popupWidth = 50;
    //     this.popupHeight = 50;
    //   }
    // },
    // popup的显示与隐藏
    isShowDialog(newVal, oldVal) {
      // if (this.isVideo) {
      //    return;
      // }

      // 初始化宽高
      this.popupWidth = this.width;
      this.popupHeight = this.height;

      if (newVal) {
        // 这是默认位置
        if (this.center) {
          // 居中
          this.clientX = document.body.clientWidth / 2 - this.width / 2;

          if (this.isVideo) {
            this.clientY = 50;
          } else {
            this.clientY = document.body.clientHeight / 2 - this.height / 2;
          }
        }

        // 判断是否是云屋视频窗口，云屋视频图标
        let originX = this.$store.state.face2face.originX;
        let originY = this.$store.state.face2face.originY;
        // console.log(`模块名：${this.name}，isShowDialog改变了：${newVal}，originX：${originX}，originY：${originY}`);
        if (this.isVideo || this.videoIcon) {
          if (originX && originY) {
            // console.log(originX, originY);
            this.clientX = originX;
            this.clientY = originY;

            if (this.isVideo) {
               this.clientX = originX - this.popupWidth;
              //  this.clientY = originY - this.popupHeight;
            }
          }
        }
      }
    },
    // 判断宽度是400还是全屏
    width(newVal, oldVal) {
      if (newVal === 400) {
        // 显示右上角
        this.clientX = document.body.clientWidth - this.width - 50;
        this.clientY = 50;
      } else {
        this.clientX = 0;
        this.clientY = -40;
      }
    },
    // 判断高度是300还是700
    height(newVal, oldVal) {
      this.popupHeight = this.height;
    }
  },
  methods: {
    // 阻止默认行为
    preventDefault(e) {
      if (e && e.preventDefault) {
        e.preventDefault();
      } else {
        window.event.returnValue = false;
      }
    },
    // window鼠标滑动事件，进行窗口拖动操作
    winFn(e) {
      this.preventDefault(e);

      if (this.isDrag) {
        // 鼠标滑动时窗口左边距离 小于 离父元素左边距离（固定），则左边距离为0，不能超过浏览器左边
        if (e.clientX - this.offsetX <= 0) {
          this.clientX = 0;
        } else {
          this.clientX = e.clientX - this.offsetX; // 左边距离 = 鼠标滑动时窗口左边距离 - 离父元素左边距离（固定）
        }

        // 鼠标滑动时窗口顶部距离 小于 离父元素顶部距离（固定），则左边距离为0，不能超过浏览器顶部
        if (e.clientY - this.offsetY <= 0) {
          this.clientY = 0;
        } else {
          this.clientY = e.clientY - this.offsetY; // 顶部距离 = 鼠标滑动时窗口顶部距离 - 离父元素顶部距离（固定）
        }

        // 不能超过浏览器右边
        if ((document.body.clientWidth - e.clientX) - (this.popupWidth - this.offsetX) <= 0) {
          this.clientX = document.body.clientWidth - this.popupWidth;
        }

        // 不能超过浏览器底部
        if ((document.body.clientHeight - e.clientY) - (this.popupHeight - this.offsetY) <= 0) {
          this.clientY = document.body.clientHeight - this.popupHeight;
        }
      }
    },

    // window鼠标滑动事件，进行放大缩小
    scaleFn (e) {
      // console.log(e)
      // console.log(this.clientX)

      if (this.isScale) {
        switch (this.scaleArrow) {
          case 'top-left':
            this.popupWidth = this.popupWidth + (this.clientX - e.clientX); // 宽度 + （左边距离 - 鼠标滑动时窗口左边距离）
            this.popupHeight = this.popupHeight + (this.clientY - e.clientY); // 高度 + （顶部距离 - 鼠标滑动时窗口顶部距离）

            this.clientX = e.clientX;
            this.clientY = e.clientY;
            break;
          case 'top-right':
            this.popupWidth = this.popupWidth - (this.clientXClick - e.clientX);
            this.popupHeight = this.popupHeight + (this.clientY - e.clientY);

            this.clientXClick = e.clientX;
            this.clientY = e.clientY;
            break;
          case 'bottom-left':
            this.popupWidth = this.popupWidth + (this.clientX - e.clientX);
            this.popupHeight = this.popupHeight - (this.clientYClick - e.clientY);

            this.clientX = e.clientX;
            this.clientYClick = e.clientY;
            break;
          case 'bottom-right':
            this.popupWidth = this.popupWidth - (this.clientXClick - e.clientX);
            this.popupHeight = this.popupHeight - (this.clientYClick - e.clientY);

            this.clientXClick = e.clientX;
            this.clientYClick = e.clientY;
            break;
          default:
            break;
        }
      }
    },

    down(e) {
      this.preventDefault(e);

      // console.log('鼠标点击时');
      // console.log(e);
      // console.log(e.offsetX);
      // console.log(e.offsetY);

      this.clientXClick = e.clientX;
      this.clientYClick = e.clientY;

      // 放大缩小的方向
      switch (e.target) {
        case this.$refs.topLeft:
          this.scaleArrow = 'top-left';
          break;
        case this.$refs.topRight:
          this.scaleArrow = 'top-right';
          break;
        case this.$refs.bottomLeft:
          this.scaleArrow = 'bottom-left';
          break;
        case this.$refs.bottomRight:
          this.scaleArrow = 'bottom-right';
          break;
        default:
          break;
      }
      if (this.$refs.topLeft === e.target || this.$refs.topRight === e.target || this.$refs.bottomLeft === e.target || this.$refs.bottomRight === e.target) {
        this.isScale = true;
        window.addEventListener('mousemove', this.scaleFn, false); // 鼠标点击窗口时，添加window滑动事件scaleFn，进行放大缩小操作
      } else {
        // 鼠标点击时初始化，离父元素左边距离和顶部距离，避免点击窗口时自动跳到左上角（原点）位置上
        // this.offsetX = e.offsetX;
        // this.offsetY = e.offsetY;

        // 优化上面使用offset计算离左边和顶部距离，因为offset是获取当前元素的事件对象坐标，offset计算存在问题，改使用client计算
        this.offsetX = e.clientX - this.clientX; // 离父元素左边距离 = 左边距离 - 原点横坐标
        this.offsetY = e.clientY - this.clientY; // 离父元素顶部距离 = 顶部距离 - 原点纵坐标

        this.isDrag = true;
        window.addEventListener('mousemove', this.winFn, false); // 鼠标点击窗口时，添加window滑动事件winFn，进行窗口拖动操作
      }
    },
    up(e) {
      // console.log('鼠标释放时')
      if (this.isScale) {
        this.isScale = false;
        window.removeEventListener('mousemove', this.scaleFn, false); // 鼠标释放时，移出window滑动事件scaleFn，释放mousemove所引起的性能瓶颈问题
      } else if (this.isDrag) {
        this.isDrag = false;
        window.removeEventListener('mousemove', this.winFn, false);

        // 判断是否是云屋视频图标，判断是否是移动操作，是则不执行任何操作
        if (this.videoIcon && this.$refs.videoIcon === e.target) {
          if (this.clientXClick === e.clientX && this.clientYClick === e.clientY) {
            this.$emit('maxmumFn');
          }
        }

        // 判断是否是最小图标，云屋视频图标，是则记录横坐标和纵坐标
        if (this.$refs.miniIcon === e.target || (this.videoIcon && this.$refs.videoIcon === e.target)) {
          this.$store.dispatch("set_originX", e.clientX);
          this.$store.dispatch("set_originY", e.clientY);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.popup {
  position: fixed;
  // background-color:#fff;
  cursor: move;
  z-index: 10000;
  // overflow: scroll-y;
  // border: 1px solid #ccc;

  .scale-btn{
    position: absolute;
    width: 30px;
    height: 30px;
    background-color: transparent;
  }
  .top-left {
    top: -10px;
    left: -10px;
    cursor: nw-resize;
  }
  .top-right {
    top: -10px;
    right: -10px;
    cursor: ne-resize;
  }
  .bottom-left{
    bottom: -10px;
    left: -10px;
    cursor: sw-resize;
  }
  .bottom-right{
    bottom: -10px;
    right: -10px;
    cursor: se-resize;
  }

  .cover{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }

  .popup-video{
    position: relative;
    border: 1px solid #ccc;
  }

  .credit-report {
    background: #fff;
  }

  .video-icon:hover{
    opacity: 0.8;
  }

  .popup-top {
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    text-align:center;
    background-color: #f5f5f5;

    .minimum{
      position: absolute;
      top: 0;
      right: 15px;
      font-size: 40px;
      cursor: pointer;
      // font-weight: bold;
    }

    .dialog-top-right {
      position: absolute;
      top: 0;
      right: 0;
      height: 40px;
      display: flex;
      align-items:center;
      .icon-video{
        margin-right: 5px;
        font-size: 14px;
      }
      span{
        cursor: pointer;
      }
      .el-icon-close{
        cursor: pointer;
        margin: 0 10px 0 20px;
      }
    }
  }
  img {
    width: 100%;
    display: block;
  }
  .close {
    position: absolute;
    right: 0;
    margin: 15px;
    font-size: 26px;
    color: #ccc;
    cursor: pointer;
  }
}
</style>
