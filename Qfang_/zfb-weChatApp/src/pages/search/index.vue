<template>
  <div class="search-city">
    <div class="search-header">
      <input :focus="true" auto-focus class="search-input" confirm-type="search" placeholder="输入小区/商圈/地铁站等" type="text">
      <span @click="$navigateBack()">取消</span>
    </div>
    <div class="search-list">
      <div class="search-item van-hairline--bottom">大冲商务中心</div>
      <div class="search-item van-hairline--bottom">大冲商务中心</div>
      <div class="search-item van-hairline--bottom">大冲商务中心</div>
      <div class="search-item van-hairline--bottom">大冲商务中心</div>
    </div>
    <div class="title mt30">搜索历史</div>
    <div class="city-list">
      <div class="city-item">深圳</div>
      <div class="city-item">深圳</div>
      <div class="city-item">深圳</div>
      <div class="city-item">深圳</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    count() {
    }
  },
  mounted() {
  },
  methods: {

  }
};
</script>

<style lang="less">
.search-city {
  padding: 50px 15px 15px 15px;
  .search-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 5px 15px;
    z-index: 500;
    background: #fff;
    display: flex;
    align-items: center;
    .search-input {
      flex: 1;
      height: 40px;
      background: #f8f8f8;
      border-radius: 20px;
      font-size: 14px;
      line-height: 40px;
      padding: 0 20px;
    }
    span {
      font-size: 14px;
      margin-left: 15px;
    }
  }
  .search-list {
    padding: 10px 0;
    .search-item {
      padding: 5px 0;
      font-size: 14px;
    }
  }
  .mt30 {
    margin-top: 30px;
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
