<template>
  <div class="change-city">
    <div class="title">当前定位</div>
    <div class="current-address">
      <div class="city-item active">深圳</div>
      <div class="right-refresh">重新定位</div>
    </div>
    <div class="title mt50">选择城市</div>
    <div class="city-list">
      <div class="city-item">深圳</div>
      <div class="city-item">深圳</div>
      <div class="city-item">深圳</div>
      <div class="city-item">深圳</div>
    </div>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import Dialog from '../../../static/vant/dialog/dialog';
export default {
  computed: {
    count() {
    }
  },
  mounted() {
    this.getLocation();
  },
  methods: {
    getLocation() {
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userLocation']) {
            wx.getLocation({
              success(res) {
                console.log(res);
              }
            });
          } else {
            wx.authorize({
              scope: 'scope.userLocation',
              success() {
                console.log('success');
              },
              fail() {
                console.log('fail');
                Dialog.confirm({
                  title: '获取授权',
                  message: '您如果要使用定位功能，请先授权获取地理信息',
                  confirmButtonText: '去授权',
                  confirmButtonOpenType: 'openSetting'
                }).then(() => {
                  console.log('confirm');
                  wx.openSetting({
                    success(res) {
                      this.getLocation();
                    }
                  });
                }).catch(() => {
                  // on cancel
                });
              }
            });
          }
        }
      });
    }
  }
};
</script>

<style lang="less">
.change-city {
  padding: 15px;
  .title {
    font-size: 15px;
    color: #252525;
    margin: 15px 0;
  }
  .mt50 {
    margin-top: 50px;
  }
  .current-address {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .city-item {
    width: 90px;
    min-width: 90px;
    padding: 0 15px;
    box-sizing: border-box;
    height: 35px;
    line-height: 35px;
    background: #f7f7f7;
    text-align: center;
    font-size: 15px;
    color: #252525;
    border-radius: 2px;
    &.active {
      color: #008842;
      font-weight: bold;
    }
  }
  .right-refresh {
    color: #008842;
    font-size: 12px;
  }
  .city-list {
    display: flex;
    flex-wrap: wrap;
    .city-item {
      margin: 0 15px 15px 0;
    }
  }
}
</style>
