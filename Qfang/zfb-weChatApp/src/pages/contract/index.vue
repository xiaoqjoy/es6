<template>
  <div class="container">

    <p>履行中</p>
    <div class="content">
      <b>ZFBSZ8868-A玖龙袭小区6栋4单元605-1室A房间</b>
      <ul>
        <li>
          <span>合同号:</span>ZFBSZ17E017862
        </li>
        <li>
          <span>签约号:</span>2019-10-52
        </li>
        <li>
          <span>合同期:</span>2016-15-45 至 2016-89-78
        </li>
        <li>
          <span>月租金:</span>2019/月
        </li>
      </ul>
      <div class="btn">
        <button>查看合同</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    getUserInfo(e) {}
  },
  onShow() {},
  mounted() {}
};
</script>

<style lang="less">
.container {
  min-height: 100vh;
  background: rgba(248, 248, 248, 1);
  color: #252525;
  p {
    font-size: 36rpx;
    height: 106rpx;
    line-height: 106rpx;
    width: 100%;
    display: inline-block;
    background: #ffffff;
    padding: 0 5%;
    margin-top: 20rpx;
    box-shadow: 0px 1px 0px 0px rgba(215, 215, 215, 1);
  }
  .content {
    padding: 30rpx 5%;
    background: #ffffff;
    b {
      font-size: 34rpx;
    }
    ul {
      margin-top: 10rpx;
      font-size: 28rpx;
      li {
        margin-top: 20rpx;
        span {
          margin-right: 20rpx;
          color: #7f7f7f;
        }
      }
    }
    .btn {
      height: 66rpx;
      width: 100%;
      button {
        width: 138rpx;
        height: 64rpx;
        line-height: 64rpx;
        border-radius: 10px;
        border: 1px solid #008842;
        color: #008842;
        font-size: 28rpx;
        padding-left: 0;
        padding-right: 0;
        background: white;
        box-sizing: inherit;
        float: right;
      }
    }
  }
}
</style>
