<template>
  <div class="scroll-container" ref="scrollContainer" @mousewheel="handleScroll">
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{top: top + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  const delta = 15;
  export default {
    name: 'scrollBar',
    data() {
      return {
        top: 0
      };
    },
    methods: {
      handleScroll(e) {
        e.preventDefault();
        const $container = this.$refs.scrollContainer;
        const $containerHeight = $container.offsetHeight;
        const $wrapper = this.$refs.scrollWrapper;
        const $wrapperHeight = $wrapper.offsetHeight;
        if ($containerHeight > $wrapperHeight) {
          return false;
        }

        if (e.wheelDelta > 0) {
          // 向上
          if (this.top === 0) {
            return false;
          }
          this.top = Math.min(0, this.top + e.wheelDelta);
        } else {
          if ($containerHeight - delta < $wrapperHeight) {
            if (this.top < -($wrapperHeight - $containerHeight + delta)) {
              this.top = this.top;
            } else {
              if (this.top === ($containerHeight - $wrapperHeight - delta)) {
                return false;
              }
              this.top = Math.max(this.top + e.wheelDelta, $containerHeight - $wrapperHeight - delta);
            }
          } else {
            this.top = 0;
          }
        }
      }
    }
  };

</script>

<style scoped>
  .scroll-container {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }

  .scroll-wrapper {
    position: absolute;
    width: 100% !important;
  }
</style>
