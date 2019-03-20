<template>
  <bm-overlay ref="customOverlay" :class="{sample: true, 'active': active||isActive}" pane="labelPane" @draw="draw" @mouseover.native="active = true" @click.native="selectPoint" @mouseleave.native="active = false">
    <div :class="{'org_box': true, 'font-12': true}">
      <div class="org_box_title">
        <p>{{title}}</p>
        <span class="count-box" v-if="showRight">{{num}}</span>
      </div>
    </div>
    <span :class="{'org_bot_cor':true}">
      <i class="el-icon-caret-bottom font-30-g"></i>
    </span>
    <div>
      <i class="icon iconfont icon-dizhi font-24-g" :class="iconClass?'icon-radius '+iconClass:''"></i>
    </div>
  </bm-overlay>
</template>

<script>
export default {
  data() {
    return {
      active: false
    };
  },
  props: ['num', 'position', 'title', 'showRight', 'isActive', 'iconClass'],
  watch: {
    position: {
      handler() {
        this.$refs.customOverlay.reload();
      },
      deep: true
    }
  },
  methods: {
    draw({ el, BMap, map }) {
      const { lng, lat } = this.position;
      const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat));
      el.style.left = pixel.x - 20 + 'px';
      el.style.top = pixel.y - 32 + 'px';
    },
    selectPoint() {
      this.$emit('checkPoint');
    }
  }
};
</script>

<style lang="scss">
.sample {
  color: #fff;
  text-align: center;
  padding: 10px;
  position: absolute;
  white-space: nowrap;
  z-index: 99;
  &.active {
    z-index: 999;
    .org_box {
      background: #137ebb;
    }
    i.font-30-g,
    i.font-20-g {
      color: #137ebb;
    }
    .count-box {
      background: #2d6ba7;
    }
    .icon.icon-radius {
      background: #137ebb;
      color: #fff;
    }
  }
}

.org_box {
  height: 24px;
  color: #fff;
  background: #008842;
  position: absolute;
  top: -20px;
  z-index: 999;
  font-size: 12px;
  border-radius: 3px;
  transform: translateX(-50%);
  left: 22px;
  box-shadow: 0px -2px 3px rgba(0, 0, 0, 0.3);
}
.org_box_title {
  display: flex;
  line-height: 24px;
  p {
    padding: 0 5px;
  }
  .count-box {
    height: 24px;
    line-height: 24px;
    padding: 0 5px;
    background-color: #48935f;
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
  }
}
.org_bot_cor {
  font-size: 30;
  color: #008842;
  overflow: hidden;
  position: absolute;
  left: 7px;
  top: -7px;
}
.icon.icon-radius {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #008842;
  color: #fff;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

i.font-24-g {
  font-size: 24px;
  color: #008842;
}
i.font-30-g {
  font-size: 30px;
  color: #008842;
}
</style>
