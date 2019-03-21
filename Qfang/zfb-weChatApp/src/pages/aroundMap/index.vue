<template>
  <div class="around-container">
    <div class="around-info">
      <van-tabs :active="active" color="#008842" @change="tabChange" swipeable custom-class="house-tabs-style">
        <van-tab :title="v.title" v-for="(v,k) in tabMap" :key="k"></van-tab>
      </van-tabs>
      <div class="around-div-map">
        <map id="map" :markers="mapMarkers" :longitude="mapConfig.longitude" :latitude="mapConfig.latitude" show-location class="around-map"></map>
      </div>
    </div>
  </div>
</template>

<script>
import BMapWX from '@/assets/js/bmap-wx';
let WxMap;
let BMap;
export default {
  data() {
    return {
      active: 0,
      mapMarkers: [],
      mapConfig: {
        longitude: 0,
        latitude: 0
      },
      tabMap: [{
        title: '交通',
        keyword: '地铁公交'
      }, {
        title: '超市',
        keyword: '超市'
      }, {
        title: '餐厅',
        keyword: '餐厅'
      }, {
        title: '医疗',
        keyword: '医院药店'
      }],
      searchCache: {}
    };
  },
  onShow() { },
  mounted() {
    WxMap = wx.createMapContext('map');
    this.mapInit();
    this.getLocation();
  },
  methods: {
    mapInit() {
      BMap = new BMapWX({
        ak: this.bmapWxAk
      });
      this.handleChange();
    },
    mapSearch(keyword) {
      return new Promise((resolve, reject) => {
        if (keyword) {
          // 从缓存中获取数据，避免不必要的请求
          if (this.searchCache[keyword]) {
            resolve(this.searchCache[keyword]);
          } else {
            BMap.search({
              query: keyword,
              iconPath: '/static/img/user-select@2x.png',
              success: (res) => {
                res.wxMarkerData.forEach(e => {
                  e.width = 20;
                  e.height = 20;
                });
                this.searchCache[keyword] = res;
                resolve(res);
              }
            });
          }
        }
      });
    },
    tabChange(e) {
      let { index } = e.mp.detail;
      this.handleChange(index);
    },
    handleChange(index = 0) {
      let keyword = this.tabMap[index].keyword;
      this.mapSearch(keyword).then(res => {
        this.mapMarkers = res.wxMarkerData;
        WxMap.moveToLocation();
      });
    },
    getLocation() {
      wx.getLocation({
        success: (res) => {
          console.log(res);
          Object.assign(this.mapConfig, res);
        }
      });
    }
  }
};
</script>

<style lang="less">
.around-container {
  .around-info {
    height: 100vh;
  }
  .around-div-map {
    height: 100%;
    .around-map {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
