<template>
  <div class="container">
    <p>
      <span class="hover">未缴账单</span>
      <span>已缴账单</span>
    </p>
    <div class="content">
      <b>2018年12月未缴租金账单</b>
      <ul>
        <li>
          <span>关联房间:</span>A玖龙袭小区6栋4单元605-1室A房间
        </li>
        <li>
          <span>账单周期:</span>2019-02-01 至 2019-02-28
        </li>
        <li>
          <span>应缴日期:</span>2019-02-23
        </li>
        <li>
          <span>支付金额:</span><span class="money">￥2019</span>
        </li>
      </ul>
      <div class="btn">
        <button>详情</button>
        <button>缴费</button>
      </div>
    </div>

    <div class="content">
      <b>2018年12月未缴租金账单</b>
      <ul>
        <li>
          <span>关联房间:</span>A玖龙袭小区6栋4单元605-1室A房间
        </li>
        <li>
          <span>账单周期:</span>2019-02-01 至 2019-02-28
        </li>
        <li>
          <span>应缴日期:</span>2019-02-23
        </li>
        <li>
          <span>支付金额:</span><span class="money">￥2019</span>
        </li>
      </ul>
      <div class="btn">
        <button>详情</button>
        <button>缴费</button>
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
    color: #999999;
    span:last-child{
      margin-left: 40rpx;
    }
    span.hover{
      font-size: 36rpx;
      color: #252525;
      border-bottom: 2px solid #008842;
      display: inline-block;
      height: 105rpx;
    }
  }
  .content {
    padding: 30rpx 5%;
    background: #ffffff;
    margin-bottom: 20rpx;
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
        span.money{
          color: #008842;
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
        margin: 0 10rpx;
      }
    }
  }
}
</style>
