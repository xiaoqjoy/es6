<template>
  <section class="dialog-box">
    <el-row type="flex">
      <div class="left_map">
        <baidu-map class="map-box" :center="coordinate" @ready="mapReady" :zoom="15" :minZoom="13" :scroll-wheel-zoom="true">
          <bm-overlay ref="Overlay" v-if="isLoading" class="sample-red c-red" pane="labelPane" @draw="draw">
            <div class="org_box-red font-12 c-red">
              <div> {{gardenName}}
                <span class="inb count-box">{{roomCount||0}}</span>
              </div>
            </div>
            <span class="org_bot_cor-red c-red">
              <i class="el-icon-caret-bottom font-30-red"></i>
            </span>
            <div>
              <i class="icon iconfont icon-dizhi font-24-red"></i>
            </div>
          </bm-overlay>
          <special-overlay v-for="(v,k) in SpecialpointList" :key="k" :position="v.point" :isActive="v.isActive" :title="v.title" :num="v.num" :showRight="v.showRight" :iconClass="keywordClass[v.keyword]" @checkPoint="checkPoint(v)"></special-overlay>
          <!-- <bm-local-search :keyword="mapKeyword" :panel="false" :nearby="nearby" :auto-viewport="true" @searchcomplete="searchcomplete" @markersset="markersset"></bm-local-search> -->
        </baidu-map>
      </div>
      <div class="right_tabs" :class="{hide:hideTabs}">
        <el-tabs class="map-tabs" v-model="mapTabIndex" @tab-click="tabChange">
          <el-tab-pane label="房源" name="0">
            <point-details v-for="(v,k) in SpecialpointList" v-if="mapTabIndex=='0'" @selectPoint="selectPoint(v)" :isActive="v.isActive" :desc="v.desc" :key="k" :title="v.title" :distance="v.distance"></point-details>
            <div class="nodata" v-if="!SpecialpointList.length">
              <i class="iconfont">&#xea4a;</i>该房源附近没有其他房源
            </div>
          </el-tab-pane>
          <el-tab-pane label="交通" name="1">
            <div class="panel_div_item">
              <div class="panel_div_title">
                <i class="iconfont">&#xeaf3;</i>地铁站
              </div>
              <point-details v-for="(v,k) in SpecialpointList" v-if="v.keyword=='地铁站'" @selectPoint="selectPoint(v)" :isActive="v.isActive" :desc="v.desc" :key="k" :title="v.title" :distance="v.distance"></point-details>
              <div class="nodata" v-if="!SpecialpointList.filter(e=>e.keyword=='地铁站').length">
                <i class="iconfont">&#xea4a;</i>该房源附近没有地铁站
              </div>
            </div>
            <div class="panel_div_item">
              <div class="panel_div_title">
                <i class="iconfont">&#xeaf1;</i>公交站
              </div>
              <point-details v-for="(v,k) in SpecialpointList" v-if="v.keyword=='公交站'" @selectPoint="selectPoint(v)" :isActive="v.isActive" :desc="v.desc" :key="k" :title="v.title" :distance="v.distance"></point-details>
              <div class="nodata" v-if="!SpecialpointList.filter(e=>e.keyword=='公交站').length">
                <i class="iconfont">&#xea4a;</i>该房源附近没有公交站
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="商超" name="2">
            <div class="panel_div_item">
              <div class="panel_div_title">
                <i class="iconfont">&#xeaf7;</i>商场
              </div>
              <point-details v-for="(v,k) in SpecialpointList" v-if="v.keyword=='商场'" @selectPoint="selectPoint(v)" :isActive="v.isActive" :desc="v.desc" :key="k" :title="v.title" :distance="v.distance"></point-details>
              <div class="nodata" v-if="!SpecialpointList.filter(e=>e.keyword=='商场').length">
                <i class="iconfont">&#xea4a;</i>该房源附近没有商场
              </div>
            </div>
            <div class="panel_div_item">
              <div class="panel_div_title">
                <i class="iconfont">&#xeaf8;</i>超市
              </div>
              <point-details v-for="(v,k) in SpecialpointList" v-if="v.keyword=='超市'" @selectPoint="selectPoint(v)" :isActive="v.isActive" :desc="v.desc" :key="k" :title="v.title" :distance="v.distance"></point-details>
              <div class="nodata" v-if="!SpecialpointList.filter(e=>e.keyword=='超市').length">
                <i class="iconfont">&#xea4a;</i>该房源附近没有超市
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="生活" name="3">
            <div class="panel_div_item">
              <div class="panel_div_title">
                <i class="iconfont">&#xeaf5;</i>银行
              </div>
              <point-details v-for="(v,k) in SpecialpointList" v-if="v.keyword=='银行'" @selectPoint="selectPoint(v)" :isActive="v.isActive" :desc="v.desc" :key="k" :title="v.title" :distance="v.distance"></point-details>
              <div class="nodata" v-if="!SpecialpointList.filter(e=>e.keyword=='银行').length">
                <i class="iconfont">&#xea4a;</i>该房源附近没有银行
              </div>
            </div>
            <div class="panel_div_item">
              <div class="panel_div_title">
                <i class="iconfont">&#xeaf6;</i>餐厅
              </div>
              <point-details v-for="(v,k) in SpecialpointList" v-if="v.keyword=='餐厅'" @selectPoint="selectPoint(v)" :isActive="v.isActive" :desc="v.desc" :key="k" :title="v.title" :distance="v.distance"></point-details>
              <div class="nodata" v-if="!SpecialpointList.filter(e=>e.keyword=='餐厅').length">
                <i class="iconfont">&#xea4a;</i>该房源附近没有餐厅
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="医疗" name="4">
            <div class="panel_div_item">
              <div class="panel_div_title">
                <i class="iconfont">&#xeaf9;</i>医院
              </div>
              <point-details v-for="(v,k) in SpecialpointList" v-if="v.keyword=='医院'" @selectPoint="selectPoint(v)" :isActive="v.isActive" :desc="v.desc" :key="k" :title="v.title" :distance="v.distance"></point-details>
              <div class="nodata" v-if="!SpecialpointList.filter(e=>e.keyword=='医院').length">
                <i class="iconfont">&#xea4a;</i>该房源附近没有医院
              </div>
            </div>
            <div class="panel_div_item">
              <div class="panel_div_title">
                <i class="iconfont">&#xeafa;</i>药店
              </div>
              <point-details v-for="(v,k) in SpecialpointList" v-if="v.keyword=='药店'" @selectPoint="selectPoint(v)" :isActive="v.isActive" :desc="v.desc" :key="k" :title="v.title" :distance="v.distance"></point-details>
              <div class="nodata" v-if="!SpecialpointList.filter(e=>e.keyword=='药店').length">
                <i class="iconfont">&#xea4a;</i>该房源附近没有药店
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <aside class="switch_right" @click="hideTabs=!hideTabs">
          <i class="el-icon-arrow-right"></i>
        </aside>
      </div>
    </el-row>
  </section>
</template>

<script>
import SpecialOverlay from './SpecialOverlay';
import PointDetails from './PointDetails';
export default {
  data() {
    return {
      coordinate: {
        lat: 0,
        lng: 0
      },
      roomCount: 0,
      SpecialpointList: [],
      mapTabIndex: '0',
      mapKeyword: [],
      nearby: {
        center: {},
        radius: 2000
      },
      BMAP: null,
      MAP: null,
      localPoint: null,
      localSearch: null,
      hideTabs: false,
      isLoading: false,
      nearByHouseList: [],
      trafficList: [],
      mallList: [],
      liveList: [],
      medicalList: [],
      positionInfo: '',
      keywordClass: {
        '地铁站': 'icon-ditie',
        '公交站': 'icon-gongjiao',
        '商场': 'icon-shangchang',
        '超市': 'icon-chaoshi',
        '银行': 'icon-yinhang',
        '餐厅': 'icon-canting',
        '医院': 'icon-yiyuan',
        '药店': 'icon-yaodian'
      }
    };
  },
  components: {
    SpecialOverlay, PointDetails
  },
  props: ['city', 'gardenName', 'address', 'id', 'coordinateProp', 'gardenId'],
  created() {
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
          let result = res.data.result || [];
          let garden = result.find(e => {
            return e.id === this.gardenId;
          });
          this.coordinate = {
            lat: garden.lat,
            lng: garden.lng
          };
          this.positionInfo = garden.positionInfo;
          this.isLoading = true;
          this.getNearByHouse();
        }
      });
    },
    draw({ el, BMap, map }) {
      this.localPoint = new BMap.Point(this.coordinate.lng, this.coordinate.lat);
      const pixel = map.pointToOverlayPixel(this.localPoint);
      el.style.left = pixel.x - 60 + 'px';
      el.style.top = pixel.y - 20 + 'px';
      this.mapLocalSearch(['地铁站', '公交站'], (result) => {
        this.trafficList = this.formatResult(result);
      });
      this.mapLocalSearch(['商场', '超市'], (result) => {
        this.mallList = this.formatResult(result);
      });
      this.mapLocalSearch(['银行', '餐厅'], (result) => {
        this.liveList = this.formatResult(result);
      });
      this.mapLocalSearch(['医院', '药店'], (result) => {
        this.medicalList = this.formatResult(result);
      });
    },
    mapLocalSearch(keyword, cb) {
      let localSearch = new this.BMAP.LocalSearch(this.localPoint, {
        onMarkersSet: this.onMarkersSet,
        onSearchComplete: cb
      });
      localSearch.searchNearby(keyword, this.localPoint, 2000);
    },
    // 地图准备就绪
    mapReady({ BMap, map }) {
      this.BMAP = BMap;
      this.MAP = map;
      if (this.coordinateProp) {
        this.coordinate = Object.assign({}, this.coordinateProp);
        this.isLoading = true;
        this.getNearByHouse();
      } else {
        this.requestData();
      }
    },
    // 获取附近房源
    getNearByHouse() {
      this.$axios.post(
        '/security/room/manage/queryGardenProximity',
        {
          lat: this.coordinate.lat,
          lng: this.coordinate.lng,
          roomId: this.id
        }
      ).then((data) => {
        if (data.data.status === 'C0000') {
          let gardenInfo = data.data.result.gardenInfo;
          let nearByHouseList = [];
          for (let i = 0, l = gardenInfo.length; i < l; i++) {
            let e = gardenInfo[i];
            if (e.address === (this.coordinate.lat.toFixed(6) + ',' + this.coordinate.lng.toFixed(6))) {
              this.roomCount = e.roomCount;
            } else {
              e.point = {
                lat: e.address.split(',')[0],
                lng: e.address.split(',')[1]
              };
              e.title = e.garden;
              e.num = e.roomCount;
              e.showRight = true;
              e.desc = '已收购' + e.roomCount + '套房源';
              e.isActive = false;
              e.distance = this.getDistance(new this.BMAP.Point(e.point.lng, e.point.lat));
              nearByHouseList.push(e);
            }
          }
          nearByHouseList.sort((a, b) => {
            return a.distance - b.distance;
          });
          this.nearByHouseList = nearByHouseList;
          this.SpecialpointList = nearByHouseList;
        }
      });
    },
    // tabs切换时搜索关键字切换
    tabChange() {
      switch (this.mapTabIndex) {
        case '0':
          this.SpecialpointList = this.nearByHouseList;
          break;
        case '1':
          this.SpecialpointList = this.trafficList;
          break;
        case '2':
          this.SpecialpointList = this.mallList;
          break;
        case '3':
          this.SpecialpointList = this.liveList;
          break;
        case '4':
          this.SpecialpointList = this.medicalList;
          break;
        default:
          break;
      }
      this.MAP.panTo(this.localPoint);
    },
    // 数据格式化
    formatResult(result) {
      let list = [];
      result && result.forEach(e => {
        let length = e.getCurrentNumPois();
        for (let i = 0; i < length; i++) {
          let v = e.getPoi(i);
          v.showRight = false;
          v.desc = v.address;
          v.isActive = false;
          v.distance = this.getDistance(new this.BMAP.Point(v.point.lng, v.point.lat));
          v.num = v.distance;
          v.keyword = e.keyword;
          list.push(v);
        }
      });
      list.sort((a, b) => {
        return a.distance - b.distance;
      });
      return list;
    },
    // 地图检索完毕后清除所有标记
    markersset() {
      this.clearOverlay();
    },
    // 获取目标点到房源的距离
    getDistance(endPoint) {
      return Math.floor(this.MAP.getDistance(this.localPoint, endPoint));
    },
    // 清楚标记点覆盖物
    clearOverlay() {
      this.MAP.clearOverlays();
      this.$refs.Overlay.reload();
    },
    // 右边栏选中地标时
    selectPoint(v) {
      this.SpecialpointList.forEach(e => {
        e.isActive = false;
      });
      v.isActive = true;
      this.MAP.panTo(new this.BMAP.Point(v.point.lng, v.point.lat));
    },
    // 地图选中地标时
    checkPoint(v) {
      this.selectPoint(v);
      this.$nextTick(() => {
        document.querySelector('.right_tabs .el-tabs__content').scrollTop = document.querySelector('.point_item.active').offsetTop;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.map-box {
  height: 500px;
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
i.font-24-red {
  font-size: 24px;
  color: #d66666;
}
i.font-30-red {
  font-size: 30px;
  color: #d66666;
}
.org_box-red {
  padding-left: 5px;
  height: 24px;
  color: #fff;
  background: #d66666;
  position: absolute;
  top: -20px;
  z-index: 999;
  font-size: 12px;
  border-radius: 3px;
  transform: translateX(-50%);
  left: 22px;
}
.org_bot_cor-red {
  font-size: 30;
  color: #d66666;
  /* border-width: 10px;
  border-style: solid;
  border-color: #d66666 transparent transparent; */
  overflow: hidden;
  position: absolute;
  left: 7px;
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
.right_tabs {
  width: 340px;
  height: 500px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  position: relative;
  z-index: 10;
  transition: all 0.2s;
  &.hide {
    width: 0;
    .switch_right {
      i {
        transform: rotate(-180deg);
      }
    }
  }
  .map-tabs {
    position: relative;
    z-index: 10;
    height: 100%;
    background: #fff;
    box-sizing: border-box;
  }
  .switch_right {
    position: absolute;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    top: 50%;
    margin-top: -40px;
    left: -20px;
    z-index: 5;
    background: #fff;
    display: flex;
    align-items: center;
    cursor: pointer;
    i {
      font-size: 20px;
      color: #333;
      margin-left: 2px;
      transition: all 0.2s;
    }
  }
}

.left_map {
  flex: 1;
}
</style>

<style lang="scss" >
.map-tabs {
  position: relative;
  padding-top: 40px;
  .nodata {
    display: flex;
    padding: 30px 0;
    justify-content: center;
    font-size: 14px;
    align-items: center;
    i {
      margin-right: 5px;
      color: #c55151;
    }
  }
  .panel_div_item {
    .point_item {
      margin-left: 30px;
    }
  }
  .panel_div_title {
    margin: 20px 0 0 0;
    font-size: 18px;
    color: #48935f;
    font-weight: 600;
    display: flex;
    align-items: center;
    i {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      border-radius: 50%;
      background: #008842;
      color: #fff;
      font-size: 12px;
      text-align: center;
      line-height: 20px;
    }
  }
  .el-tabs__header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  .el-tabs__content {
    height: 100%;
    overflow-y: auto;
  }
  .el-tab-pane {
    padding: 0 20px;
  }
}
</style>
