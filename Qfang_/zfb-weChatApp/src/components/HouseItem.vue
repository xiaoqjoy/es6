<template>
  <div class="house-item">
    <div class="item-container van-hairline--bottom" @click="$navigateTo('houseDetails')">
      <img :src="banner" class="left-img" alt="">
      <div class="right-div">
        <h4 class="overflow-ellipsis"> 星河银湖谷 星河银湖谷 星河银湖谷 星河银湖谷二</h4>
        <div class="desc-div">
          <p>20㎡ 18/36</p>
          <span>¥2690/月</span>
        </div>
        <div class="address">
          <van-icon name="location" color="#7F7F7F" size="12px" />
          <p class="overflow-ellipsis">距1号线（罗宝线）科技园站100米</p>
        </div>
        <div class="good-list">
          <span class="good-tag">独卫</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    houseInfo: () => { }
  }
};
</script>

<style lang="less">
.house-item {
  padding: 0 0 0 15px;
  .item-container {
    padding: 15px 15px 15px 0;
    // border-bottom: 1px solid #d7d7d7;
    display: flex;
    .left-img {
      width: 110px;
      height: 90px;
      border-radius: 4px;
      background: #252525;
      margin-right: 10px;
    }
    .right-div {
      flex: 1;
      h4 {
        font-size: 17px;
        color: #252525;
        font-weight: bold;
        width: 220px;
      }
      .desc-div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        line-height: 26px;
        p {
          font-size: 14px;
          color: #7f7f7f;
        }
        span {
          font-size: 17px;
          color: #008842;
          font-weight: bold;
        }
      }
      .address {
        display: flex;
        align-items: center;
        line-height: 26px;
        p {
          font-size: 12px;
          color: #7f7f7f;
          display: block;
          width: 200px;
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
        }
      }
    }
  }
}
</style>
