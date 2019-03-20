<template>
  <div class="house-list-container">
    <div class="fixed-header">
      <div class="address-div" @click="$navigateTo('changeCity')">
        <span>深圳</span>
        <img src="../../assets/img/arrow-down@2x.png" class="arrow-icon" alt="">
      </div>
      <div class="search-div">
        <img src="../../assets/img/search@2x.png" alt="">
        <input type="search" confirm-type="search" class="search-input" placeholder="搜索工作附近房源">
      </div>
    </div>
    <div class="house-list">
      <HouseItem v-for="(v, k) in 10" :key="k" />
    </div>
  </div>
</template>

<script>
import HouseItem from '../../components/HouseItem';
export default {
  data() {
    return {};
  },
  components: {
    HouseItem
  },
  onShow() { },
  mounted() { }
};
</script>

<style lang="less">
.house-list-container {
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
}
</style>
