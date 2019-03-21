<template>
  <baidu-map class="map-box" :center="coordinate" :zoom="15" :minZoom="13" :scroll-wheel-zoom="true">
    <!-- <bm-marker :position="coordinate" :dragging="false">
      <bm-label :content="Name" :labelStyle="{color: '#333', fontSize : '12px'}" :offset="{width: -30, height: 30}">11 </bm-label>
    </bm-marker> -->
    <bm-overlay ref="Overlay" class="sample-red c-red" pane="labelPane" @draw="draw">
      <div class="org_box-red font-12 c-red">
        <div> {{Name}}
          <span class="inb count-box">{{roomCount}}</span>
        </div>
      </div>
      <span class="org_bot_cor-red c-red">
        <i class="el-icon-caret-bottom font-30-red"></i>
      </span>
      <div>
        <i class="icon iconfont icon-dizhi font-20-red"></i>
      </div>
    </bm-overlay>
    <my-overlay v-for="(item,index) in pointList" :key="index" :position="{lat: item.address.split(',')[0], lng:item.address.split(',')[1]}" :text="item.roomCount" :title="item.garden">
    </my-overlay>
    <p class="font-c address">详细地址： {{address}}</p>
  </baidu-map>
</template>

<script>
import MyOverlay from './MyOverlay';
export default {
  data() {
    return {
      coordinate: {
        lat: 22.551986,
        lng: 114.037366
      },
      Name: '',
      pointList: []
    };
  },
  props: ['city', 'gardenName', 'roomCount', 'address'],
  created() {
    this.requestData();
  },
  methods: {
    requestData() {
      this.$axios.post(
        '/security/room/returnGardenInfo',
        {
          city: this.city,
          searchName: this.gardenName
        }
      ).then((res) => {
        if (res.data.status === 'C0000') {
          this.coordinate.lat = res.data.result[0].lat;
          this.coordinate.lng = res.data.result[0].lng;
          this.Name = res.data.result[0].gardenName;

          this.$axios.post(
            '/security/room/manage/queryNearGardenInfo',
            {
              address: this.coordinate.lat + ',' + this.coordinate.lng,
              distance: 50
            }
          ).then((data) => {
            if (data.data.status === 'C0000') {
              this.pointList = data.data.result;
            }
          });
        }
      });
    },
    draw({ el, BMap, map }) {
      // const { lng, lat } = this.position;
      const pixel = map.pointToOverlayPixel(new BMap.Point(this.coordinate.lng, this.coordinate.lat));
      el.style.left = pixel.x - 60 + 'px';
      el.style.top = pixel.y - 20 + 'px';
    }
  },
  components: {
    MyOverlay
  },
  watch: {
    position: {
      handler() {
        this.$refs.Overlay.reload();
      },
      deep: true
    }
  }

};
</script>

<style scoped>
.map-box {
  height: 500px;
  /* width: 928px; */
  padding-bottom: 30px;
}

.sample-red {
  color: #fff;
  text-align: center;
  padding: 10px;
  position: absolute;
  white-space: nowrap;
  z-index: 999;
}

.c-red {
  color: #d66666;
}
i.font-20-red {
  font-size: 20px;
  color: #d66666;
}
i.font-30-red {
  font-size: 30px;
  color: #d66666;
}
.org_box-red {
  /* margin-bottom: 30px; */
  padding-left: 5px;
  height: 24px;
  color: #fff;
  background: #d66666;
  position: absolute;
  top: -20px;
  left: -30%;
  z-index: 999;
  font-size: 12px;
  border-radius: 3px;
  /* border-top-left-radius: 3px; */
}
.org_bot_cor-red {
  font-size: 30;
  color: #d66666;
  /* border-width: 10px;
  border-style: solid;
  border-color: #d66666 transparent transparent; */
  overflow: hidden;
  position: absolute;
  left: 5px;
  top: -7px;
}
.count-box {
  width: 20px;
  height: 24px;
  line-height: 24px;
  background-color: #c55151;
  border-bottom-right-radius: 3px;
  border-top-right-radius: 3px;
}
.address {
  height: 30px;
  line-height: 30px;
}
</style>

