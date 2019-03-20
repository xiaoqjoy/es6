<template>
  <div class="container">
    <div class="fixed-header">
      <div class="address-div" @click="$navigateTo('changeCity')">
        <span>深圳</span>
        <img src="../../assets/img/arrow-down@2x.png" class="arrow-icon" alt="">
      </div>
      <div class="search-div" @click="$navigateTo('search')">
        <img src="../../assets/img/search@2x.png" alt="">
        <input type="search" confirm-type="search" disabled class="search-input" placeholder="搜索工作附近房源">
      </div>
    </div>
    <div class="wrap-container">
      <div class="swiper-wrap">
        <swiper class="swiper" indicator-dots indicator-color="#D7D7D7" circular indicator-active-color="#008842" autoplay :interval="5000">
          <swiper-item v-for="(v,k) in imgList" :key="k">
            <img :src="v" class="swiper-img" alt="">
          </swiper-item>
        </swiper>
      </div>
      <div class="rent-div">
        <div class="rent-item first">
          <img src="../../assets/img/zhengzu@2x.png" alt="">
          <div class="right-info">
            <h4>整租</h4>
            <span>空间自主</span>
          </div>
        </div>
        <div class="rent-item">
          <img src="../../assets/img/hezu@2x.png" alt="">
          <div class="right-info">
            <h4>合租</h4>
            <span>人多热闹</span>
          </div>
        </div>
      </div>
      <div class="house-div">
        <div class="house-title">
          <h4>房源列表</h4>
          <img src="../../assets/img/more-icon@2x.png" alt="">
        </div>
        <div class="house-list">
          <HouseItem v-for="(v, k) in 10" :key="k" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import banner from '../../assets/img/banner@2x.png';
import HouseItem from '../../components/HouseItem';
export default {
  data() {
    return {
      imgList: [banner, banner, banner]
    };
  },
  components: {
    HouseItem
  },
  methods: {
    getLocation() {
      wx.getSetting({
        success(res) {
          console.log(res.authSetting);
          if (res.authSetting) {

          }
        }
      });
    }
  },
  onReachBottom() {
    console.log(1);
  },
  onShow() {

  },
  mounted() {
  }
};
</script>

<style lang="less">
.container {
  padding-top: 60px;
  .fixed-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    padding: 10px 15px;
    background: #fff;
    z-index: 1000;
    .address-div {
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
        color: #252525;
        margin: 0 5px 0 0;
      }
      .arrow-icon {
        width: 7.5px;
        height: 5px;
      }
    }
    .search-div {
      display: flex;
      flex: 1;
      align-items: center;
      height: 40px;
      border-radius: 20px;
      background: #f8f8f8;
      padding: 0 15px;
      margin-left: 15px;
      img {
        width: 13px;
        height: 13px;
      }
      .search-input {
        font-size: 14px;
        color: #252525;
        padding: 0 10px;
        height: 20px;
        line-height: 20px;
        flex: 1;
      }
    }
  }
  .swiper-wrap {
    padding: 0 15px;
    .swiper {
      height: 170px;
    }
    .swiper-img {
      display: block;
      width: 100%;
      height: 140px;
      border-radius: 4px;
    }
  }
  .rent-div {
    display: flex;
    padding: 15px;
    .rent-item {
      flex: 1;
      display: flex;
      align-items: center;
      padding: 12px 15px;
      box-shadow: 0px 1px 5px 0px rgba(183, 183, 183, 0.4);
      border-radius: 4px;
      &.first {
        margin-right: 15px;
      }
      img {
        width: 45px;
        height: 45px;
        margin-right: 15px;
      }
      .right-info {
        h4 {
          font-size: 17px;
          color: #252525;
        }
        span {
          font-size: 14px;
          color: #7f7f7f;
        }
      }
    }
  }
  .house-div {
    .house-title {
      padding: 5px 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      h4 {
        font-size: 18px;
        color: #252525;
        font-weight: bold;
      }
      img {
        width: 8px;
        height: 15px;
      }
    }
  }
}
</style>
