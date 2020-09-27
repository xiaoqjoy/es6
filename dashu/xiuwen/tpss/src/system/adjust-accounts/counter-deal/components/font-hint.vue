<template>
  <div>
    <!-- 提示窗 == 删除 -->
    <div class="font-hint">
      <div class="import-message">
        <div class="dialog-mask" style="z-index: 1001"></div>
        <div class="dialog-box" ref="dialogRef">
          <div class="dialog-msgbox__top" @mousedown="dialogMousedown" @mouseup="dialogMouseup">
            <span class="el-icon-close button button__close" @click="close"></span>
          </div>
          <div class="text-center">{{ massage }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    massage: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isDown: false,
      boxX: 0,
      boxY: 0,
      boxL: 0,
      boxT: 0
    };
  },
  mounted() {
    let _this = this;
    // 鼠标移动
    window.onmousemove = function(e) {
      e = e || event;
        if (!_this.isDown) {
            return;
        }
        // 获取x和y
        var nx = e.clientX;
        var ny = e.clientY;
        // 计算移动后的左偏移量和顶部的偏移量
        var nl = nx - (_this.boxX - _this.boxL);
        var nt = ny - (_this.boxY - _this.boxT);

        // 边界处理
        // nl = nl < _this.$refs.dialogRef.clientWidth/2 ? _this.$refs.dialogRef.clientWidth/2 : nl;
        // nt = nt < _this.$refs.dialogRef.clientHeight/2 ? _this.$refs.dialogRef.clientHeight/2 : nt;
        _this.$refs.dialogRef.style.left = nl + 'px';
        _this.$refs.dialogRef.style.top = nt + 'px';
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    dialogMousedown(e) {
      e = e || event;
      let _that = this;

      // 获取x坐标和y坐标
      _that.boxX = e.clientX;
      _that.boxY = e.clientY;

      // 获取左部和顶部的偏移量
      _that.boxL = this.$refs.dialogRef.offsetLeft;
      _that.boxT = this.$refs.dialogRef.offsetTop;

      // 开关打开
      _that.isDown = true;
    },
    dialogMouseup() {
      // 开关关闭
      this.isDown = false;
    }
  }
};
</script>
<style lang="less" scoped>
// 提示窗
.font-hint {
  .import-message {
    .dialog-box {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      // overflow: auto;
      box-shadow: 0 0 2px #999;
      width: 340px;
      .dialog-msgbox__top {
        cursor: move;
        height: 40px;
        .button__close {
          position: absolute;
          top: 0;
          right: 0;
          width: 42px;
          height: 42px;
          line-height: 42px;
          border-radius: 50%;
          font-size: 16px;
          text-align: center;
          color: #666;
          font-weight: 600;
        }
      }
      .text-center {
        max-height: 500px;
        overflow: auto;
        font-family: PingFangSC-Regular;
        position: relative;
        top: -7px;
        font-size: 14px;
        line-height: 30px;
        color: #333333;
        letter-spacing: 1.07px;
        text-align: center;
        padding: 0 50px;
      }
    }
  }
}
</style>
