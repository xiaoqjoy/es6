<template>
  <div class="house-details-container">
    <div class="swiper-wrap">
      <swiper class="swiper" @change="swiperChange">
        <swiper-item v-for="(v,k) in imgList" :key="k">
          <img :src="v" lazy-load class="swiper-img" @click="previewImg(k)" alt="">
        </swiper-item>
      </swiper>
      <div class="swiper-info">
        <div class="desc">卧室{{current}}</div>
        <div class="number"><span>{{current+1}}</span>/{{imgList.length}}</div>
      </div>
    </div>
    <div class="house-detail">
      <h3 class="title">星河银湖谷 星河银湖谷 星河银湖谷 星河银</h3>
      <p class="rent-money">¥2690/月</p>
      <div class="good-list">
        <span class="good-tag">独卫</span>
        <span class="good-tag">独卫</span>
        <span class="good-tag">独卫</span>
      </div>
      <div class="address">
        <van-icon name="location" color="#7F7F7F" size="12px" />
        <p class="overflow-ellipsis">距1号线（罗宝线）科技园站100米</p>
      </div>
      <div class="other-desc van-hairline--top">
        <div class="desc-item">
          <span>入住日期：</span>
          <p>可立即入住</p>
        </div>
        <div class="desc-item">
          <span>签约时长：</span>
          <p>可月租/可签半年/可签1年/可签2年</p>
        </div>
      </div>
    </div>
    <div class="cut-line"></div>
    <div class="house-introduction">
      <h4 class="border-title van-hairline--bottom">房源简介</h4>
      <div class="info-div">
        <p>1.地段优势</p>
        <p>地铁1号线高新园地铁站D出口，紧挨着中科大厦与软件园、临近深圳大学</p>
      </div>
      <div class="see-more">查看更多</div>
    </div>
    <div class="cut-line"></div>
    <div class="house-config">
      <van-tabs :active="active" color="#008842" swipeable custom-class="house-tabs-style">
        <van-tab title="卧室配置">
          <div class="config-list">
            <div class="config-item">
              <div class="img-div">
                <img mode="aspectFit" src="../../assets/img/icon-config-1.png" alt="">
              </div>
              <span>床</span>
            </div>
            <div class="config-item">
              <div class="img-div">
                <img mode="aspectFit" src="../../assets/img/icon-config-1.png" alt="">
              </div>
              <span>床</span>
            </div>
            <div class="config-item">
              <div class="img-div">
                <img mode="aspectFit" src="../../assets/img/icon-config-1.png" alt="">
              </div>
              <span>床</span>
            </div>
            <div class="config-item">
              <div class="img-div">
                <img mode="aspectFit" src="../../assets/img/icon-config-1.png" alt="">
              </div>
              <span>床</span>
            </div>
            <div class="config-item">
              <div class="img-div">
                <img mode="aspectFit" src="../../assets/img/icon-config-1.png" alt="">
              </div>
              <span>床</span>
            </div>
            <div class="config-item">
              <div class="img-div">
                <img mode="aspectFit" src="../../assets/img/icon-config-1.png" alt="">
              </div>
              <span>床</span>
            </div>
          </div>
        </van-tab>
        <van-tab title="公共区域">内容 2</van-tab>
      </van-tabs>
    </div>
    <div class="cut-line"></div>
    <div class="house-info">
      <h4 class="border-title van-hairline--bottom">房屋信息</h4>
      <div class="room-list">
        <div class="room-item">
          <div class="room-title">A室</div>
          <div class="room-info">
            <div class="room-info-item">9.6m²/朝南</div>
            <div class="room-info-item">9.6m²/朝南</div>
            <div class="room-info-item">9.6m²/朝南</div>
          </div>
        </div>
        <div class="room-item">
          <div class="room-title">A室</div>
          <div class="room-info">
            <div class="room-info-item">9.6m²/朝南</div>
            <div class="room-info-item">9.6m²/朝南</div>
            <div class="room-info-item">9.6m²/朝南</div>
          </div>
        </div>
      </div>
    </div>
    <div class="cut-line"></div>
    <h4 class="border-title van-hairline--bottom">周边信息</h4>
    <div class="around-info">
      <div class="around-div-map">
        <map id="map" @click="$navigateTo('aroundMap')" :longitude="mapConfig.longitude" :latitude="mapConfig.latitude" :enable-zoom="false" :enable-scroll="false" :enable-rotate="false" show-location class="around-map"></map>
      </div>
    </div>
    <div class="fixed-foot-shadow">
      <cover-view class="fixed-foot">
        <cover-view @click="$switchTab('index')" class="left-div">
          <cover-image class="img" src="/static/img/home@2x.png" alt="" />
          <cover-view class="span">首页</cover-view>
        </cover-view>
        <button class="foot-btn" hover-class="btn-hover" @click="callPhone">电话预约</button>
        <button class="foot-btn green" hover-class="btn-hover">预约看房</button>
        <!-- <van-button custom-class="foot-btn" @click="callPhone">电话预约</van-button>
      <van-button custom-class="foot-btn green">预约看房</van-button> -->
      </cover-view>
    </div>
  </div>
</template>

<script>
import banner from '../../assets/img/banner@2x.png';
export default {
  data() {
    return {
      imgList: [banner, banner, banner],
      current: 0,
      active: 0,
      mapConfig: {
        longitude: 0,
        latitude: 0
      }
    };
  },
  onShow() { },
  mounted() {
    this.getLocation();
  },
  methods: {
    swiperChange(e) {
      this.current = e.mp.detail.current;
    },
    getLocation() {
      wx.getLocation({
        success: (res) => {
          console.log(res);
          Object.assign(this.mapConfig, res);
        }
      });
    },
    previewImg(k) {
      console.log(this.imgList);
      wx.previewImage({
        urls: this.imgList,
        current: this.imgList[k]
      });
    },
    callPhone() {
      wx.makePhoneCall({
        phoneNumber: '10010'
      });
    }
  }
};
</script>

<style lang="less">
.house-details-container {
  padding-bottom: 64px;
  .cut-line {
    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 10px;
      background: #f8f8f8;
    }
  }
  .border-title {
    font-weight: bold;
    font-size: 18px;
    padding: 15px;
  }
  .swiper-wrap {
    position: relative;
    .swiper {
      height: 230px;
    }
    .swiper-img {
      display: block;
      width: 100%;
      height: 230px;
    }
    .swiper-info {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
      div {
        height: 22px;
        background: rgba(37, 37, 37, 0.4);
        border-radius: 11px;
        text-align: center;
        font-size: 14px;
        line-height: 22px;
        color: #fff;
        padding: 0 10px;
      }
      .number {
        font-size: 12px;
        span {
          font-size: 14px;
        }
      }
    }
  }
  .house-detail {
    padding: 15px;
    .title {
      font-size: 24px;
      color: #252525;
      font-weight: bold;
    }
    .rent-money {
      font-size: 17px;
      color: #008842;
      font-weight: bold;
      margin-bottom: 6px;
    }
    .address {
      display: flex;
      align-items: center;
      p {
        font-size: 12px;
        color: #7f7f7f;
        display: block;
        width: 300px;
      }
    }
    .good-list {
      display: flex;
      .good-tag {
        padding: 0 5px;
        font-size: 10px;
        color: #7f7f7f;
        background: #f7f7f7;
        border-radius: 3px;
        height: 15px;
        line-height: 15px;
        margin: 0 10px 10px 0;
      }
    }
    .other-desc {
      padding-top: 15px;
      margin-top: 15px;
      .desc-item {
        display: flex;
        font-size: 14px;
        color: #252525;
        margin-bottom: 6px;
        span {
          color: #7f7f7f;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  .house-introduction {
    .info-div {
      padding: 15px;
      line-height: 1.5;
      p {
        font-size: 14px;
      }
    }
    .see-more {
      height: 53px;
      line-height: 53px;
      text-align: center;
      font-size: 14px;
      font-weight: 500;
      color: #008842;
    }
  }
  .config-list {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    .config-item {
      width: 20%;
      padding: 10px 0;
      .img-div {
        height: 35px;
        width: 35px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
      }
      img {
        width: 90%;
        height: inherit;
      }
      span {
        text-align: center;
        font-size: 12px;
        color: #999;
        display: block;
      }
    }
  }
  .room-list {
    padding: 15px 0;
    .room-item {
      padding: 0 15px;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      &:last-child {
        margin: 0;
      }
    }
    .room-title {
      width: 65px;
      font-size: 17px;
      font-weight: bold;
    }
    .room-info {
      display: flex;
      flex: 1;
      .room-info-item {
        flex: 1;
        text-align: center;
        color: #7f7f7f;
        font-size: 14px;
      }
    }
  }
  .around-div-map {
    padding: 15px;
    .around-map {
      display: block;
      width: 100%;
      height: 180px;
    }
  }
  // 为了加个阴影
  .fixed-foot-shadow {
    // padding: 7px 15px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    height: 64px;
    z-index: 100;
    box-shadow: 0px -2px 10px 0px rgba(183, 183, 183, 0.4);
  }
  .fixed-foot {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 7px 15px;
    background: #ffffff;
    box-shadow: 0px -2px 10px 0px rgba(183, 183, 183, 0.4);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left-div {
      display: flex;
      align-items: center;
      flex-direction: column;
      .img {
        width: 20px;
        height: 20px;
      }
      .span {
        font-size: 10px;
        color: #999;
      }
    }
  }
}
.fixed-foot {
  .foot-btn {
    width: 145px;
    height: 50px;
    line-height: 50px;
    font-size: 17px;
    color: #fff;
    border-radius: 4px;
    background: #fabe00;
    margin: 0;
    &.green {
      background: #008842;
    }
  }
}
</style>
