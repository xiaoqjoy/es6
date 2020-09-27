
<template>
  <!-- 拖动窗口组件 -->
  <transition name="scale">
    <div class="popup" v-show="isShowDialog" :style="{left: clientX + 'px',top: clientY + 'px',width: width + 'px'}" @mouseenter="enter" @mouseout="out" @mousemove="move" @mousedown.prevent="down" @mouseup.prevent="up">
      <div v-show="iframe">
        <div class="popup-top"></div>
        <iframe :src="url" frameborder="0" scrolling="yes" :width="width" :height="height"></iframe>
      </div>
      <div v-if="!iframe">
        <!-- 有点异常 -->
        <span class="close el-icon-circle-close-outline" @mousedown.stop="$emit('closeDialog')" title="关闭"></span>
        <img :src="url" alt="" >
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "popup",
  props: {
    // 拖动弹框的显示与隐藏
    isShowDialog: {
      type: Boolean,
      default: false
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
      default: function() {
        return "";
      }
    },
    // 拖动弹框的宽度
    width: {
      type: Number,
      default: function() {
        return 400;
      }
    },
    // 拖动弹框的高度
    height: {
      type: Number,
      default: function() {
        return 300;
      }
    }
  },
  components: {},
  data() {
    return {
      isDrag: false, // 是否需要拖动
      clientX: 0, // 左边距离
      clientY: 50, // 顶部距离
      OffsetX: 0, // 离父元素左边距离
      OffsetY: 0 // 离父元素顶部距离
    };
  },
  created() {},
  mounted() {},
  watch: {
    isShowDialog(newVal, oldVal) {
      if (newVal) {
        // 这是默认位置
        if (this.center) {
          // 居中
          this.clientY = 50;
          this.clientX = document.body.clientWidth / 2 - this.width / 2;
          return;
        }
        // 显示右上角
        this.clientX = document.body.clientWidth - this.width - 50;
      }
    },
    // 判断宽度是400还是全屏
    width(newVal, oldVal) {
      if (newVal === 400) {
        // 显示右上角
        this.clientX = document.body.clientWidth - this.width - 50;
      } else {
        this.clientX = 0;
      }
    }
  },
  methods: {
    // window鼠标滑动事件，进行窗口拖动操作
    winFn(e) {
      if (this.isDrag) {
        this.clientX = e.clientX - this.offsetX;
        this.clientY = e.clientY - this.offsetY;
      }
    },
    enter(e) {
      // console.log('鼠标移入时')
    },
    out() {
      // console.log('鼠标移出时')
    },
    move(e) {
      // console.log('鼠标滑动时')
    },
    down(e) {
      // console.log('鼠标点击时');
      e.preventDefault();
      window.addEventListener("mousemove", this.winFn, false); // 鼠标点击窗口时，添加window滑动事件，进行窗口拖动操作

      // 鼠标点击时初始化离父元素左边距离和顶部距离，避免点击窗口时自动跳到左上角（原点）位置上
      this.offsetX = e.offsetX;
      this.offsetY = e.offsetY;

      this.isDrag = true;
    },
    up() {
      // console.log('鼠标释放时')
      this.isDrag = false;
      window.removeEventListener("mousemove", this.winFn, false); // 鼠标释放时，移出window滑动事件，释放mousemove所引起的性能瓶颈问题
    }
  }
};
</script>

<style lang="less" scoped>
// 显示与隐藏，放大与缩小的动画
.scale-enter,
.scale-leave-to {
  transform: scale(0);
  opacity: 0;
}
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s;
}

.popup {
  position: fixed;
  background-color:#fff;
  cursor: move;
  z-index: 10000;
  // overflow: scroll-y;
  .popup-top {
    height: 40px;
    background-color: #f5f5f5;
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
