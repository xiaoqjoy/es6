<template>
  <bm-overlay ref="customOverlay" :class="{sample: true, 'active': active}" pane="labelPane" @draw="draw" @mouseover.native="active = true" @mouseleave.native="active = false">
    <!-- <div>
      <span class="map-point">
        <span class="map-point-top" v-text="text"></span>
        <span class="map-point-bottom"></span>
      </span>
      <p class="font-l c-green font-12">{{title}}</p>
    </div> -->
    <div :class="{'org_box': true, 'font-12': true, 'active': active}">
      <div> {{title}}
        <span class="inb count-box">{{text}}</span>
      </div>
    </div>
    <span :class="{'org_bot_cor':true, 'active': active}">
      <i class="el-icon-caret-bottom font-30-g"></i>
    </span>
    <div :class="{'active': active}">
      <i class="icon iconfont icon-dizhi font-20-g"></i>
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
  props: ['text', 'position', 'title'],
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
      el.style.left = pixel.x - 60 + 'px';
      el.style.top = pixel.y - 20 + 'px';
    }
  }
};
</script>

<style>
.sample {
  /* width: 120px; */
  /* height: 40px; */
  /* line-height: 40px; */
  /* background: rgba(0, 0, 0, 0.5); */
  /* overflow: hidden; */
  /* box-shadow: 0 0 5px #000; */
  color: #fff;
  text-align: center;
  padding: 10px;
  position: absolute;
  white-space: nowrap;
  z-index: 99;
}

.org_box {
  /* margin-bottom: 30px; */
  padding-left: 5px;
  height: 24px;
  color: #fff;
  background: #008842;
  position: absolute;
  top: -20px;
  left: -30%;
  z-index: 999;
  font-size: 12px;
  border-radius: 3px;
  /* border-top-left-radius: 3px; */
}
.org_bot_cor {
  font-size: 30;
  color: #008842;
  /* border-width: 10px;
  border-style: solid;
  border-color: #008842 transparent transparent; */
  /* _border-color: #008842 #008842 #008842; */
  overflow: hidden;
  position: absolute;
  left: 5px;
  top: -7px;
}
.count-box {
  width: 20px;
  height: 24px;
  line-height: 24px;
  background-color: #48935f;
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
}
i.font-20-g {
  font-size: 20px;
  color: #008842;
}
i.font-30-g {
  font-size: 30px;
  color: #008842;
}
.active {
  z-index: 999;
}
.sample.active {
  z-index: 999;
  /* background-color: #fff; */
}
.org_box.active {
  background: #4c9c65;
  box-shadow: 0px 2px 5px rgb(71, 69, 69);
}
.active > i.font-30-g,
.active > i.font-20-g {
  color: #4c9c65;
}
/* org_bot_cor.active {
  border-color: #4c9c65 transparent transparent;
} */
</style>
